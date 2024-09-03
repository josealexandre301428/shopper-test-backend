import { ModelStatic } from "sequelize";
require('dotenv/config');
import Measures from "../database/models/Measures";
import { GoogleGenerativeAI } from "@google/generative-ai";
import resp from "../utils/resp";
import { v4 as uuid } from 'uuid';
import validarLeitura from "../utils/validateMeasure";


interface requisition {
  image: string;
  customer_code: string;
  measure_type: string;
}

class MeasureServices {
  private model: ModelStatic<Measures> = Measures;
  async extractNumbers(base64Image: string, key: any) {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });
    const result = await model.generateContent([
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg"
        }
      },
      { text: "Describe what numbers are in the image" },
    ]);
    return result.response.text()
  }

  async getAllMeasures(){
    try {
      const measures: Measures[] = await this.model.findAll();
      return resp(200, {measures: measures});
    } catch (error) {
      console.error('Error fetching measures:', error);
      return resp(500, { error: { error_code: 'INTERNAL_ERROR', error_description: 'An error occurred while fetching measures' } });
    }
  }


  async uploadMeasure(req: requisition){
    const { image, customer_code, measure_type } = req;
    try {
      const measures: Measures[] = await this.model.findAll({where: {customer_code}});
      const existMeasure = await validarLeitura(measure_type, measures);
      if(existMeasure){
        return resp(409,
          { error: { error_code: "DOUBLE_REPORT", error_description: "Leitura do mês já realizada"}}
        );
      }
      const Extract = await this.extractNumbers(image, process.env.GOOGLE_CLOUD_PROJECT);
      const measureValue =  Number(Extract.match(/\d+/));


      const measureCreate = await this.model.create({
        customerCode: customer_code,
        measureUuid: uuid(),
        measureDate: new Date(),
        measureValue: measureValue,
        measureType: measure_type,
        hasCofirmed: false,
        imageUrl: image
    });

    return resp(201, measureCreate);
    } catch (error) {
        return (`Erro ao realizar o upload da medida:${error}`)
    }
  }
}

export default MeasureServices;