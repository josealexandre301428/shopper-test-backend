import { ModelStatic } from "sequelize";
import 'dotenv/config';
import Measures from "../database/models/Measures";
import resp from "../utils/resp";
import { v4 as uuid } from 'uuid';
import { VisionClient } from '@google-cloud/vision';

const client = new VisionClient();

async function extractNumbersFromImage(base64Image: string) {
    const image = {
        content: base64Image,
    };

    const [result] = await client.textDetection(image);
    const detections = result.textAnnotations;

    const numbers = detections.map(text => {
        return text.description.replace(/\D/g, '');
    });

    return numbers;
}


class MeasureServices {
  private model: ModelStatic<Measures> = Measures;

  async getAllMeasures(){
    try {
      const measures: Measures[] = await this.model.findAll();
      return resp(200, {measures: measures});
    } catch (error) {
      console.error('Error fetching measures:', error);
      return resp(500, { error: { error_code: 'INTERNAL_ERROR', error_description: 'An error occurred while fetching measures' } });
    }
  }


  async uploadMeasure(image: Blob, customer_code:string, measure_type: string){
    try {
      const existingMeasure = await this.getAllMeasures()
      const { message } = existingMeasure;
      if (message.measures.length > 0 ) {
        return {
            status: 409,
            error_code: 'DOUBLE_REPORT',
            error_description: 'Leitura do mês já realizada'
        };
      }

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      const result = await model.generateContent([
      "Quais numeros estao na imagem?",
      {inlineData: {data: image, mimeType: 'image/jpeg'}}]
      );
      
      const measureCreate = await this.model.create({
        customerCode: customer_code,
        measureUuid: uuid(),
        measureDatetime: new Date(),
        measureValue: Math.round(result.text),
        measureType: measure_type,
        hasConfirmed: false,
        imageUrl: result.url
    });


      return resp(201, measureCreate);
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