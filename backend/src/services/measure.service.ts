import { ModelStatic } from "sequelize";
import Measures from "../database/models/Measures";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
import resp from "../utils/resp";
import { v4 as uuid } from 'uuid';
import 'dotenv/config';


class MeasureServices {
  private model: ModelStatic<Measures> = Measures;

  async getAllMeasures(){
    try {
      const measures = await this.model.findAll();
      return resp(200, measures);
    } catch (error) {
      console.error('Error fetching measures:', error);
      return resp(500, { error: { error_code: 'INTERNAL_ERROR', error_description: 'An error occurred while fetching measures' } });
    }
  }


  async uploadMeasure(image: Blob, customer_code:string, measure_type: string){
    try {
      const existingMeasure = await this.model.findOne({
        where: {
          customerCode: customer_code,
        }
      });

      // if (existingMeasure) {
      //   return {
      //       status: 409,
      //       error_code: 'DOUBLE_REPORT',
      //       error_description: 'Leitura do mês já realizada'
      //   };
      // }

      // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      // const result = await model.generateContent([
      // "Quais numeros estao na imagem?",
      // {inlineData: {data: image, mimeType: 'image/jpeg'}}]
      // );
      
      // const measureCreate = await this.model.create({
      //   customerCode: customer_code,
      //   measureUuid: uuid(),
      //   measureDatetime: new DATE,
      //   measureValue: Math.round(result.text),
      //   measureType: measure_type,
      //   hasConfirmed: false,
      //   imageUrl: result.url
      
      return existingMeasure;
    } catch (error) {
      return {
        status: 500,
          error_code: 'INTERNAL_ERROR',
          error_description: 'Ocorreu um erro ao processar a medida.'
        }
      };
    }
  }

export default MeasureServices;