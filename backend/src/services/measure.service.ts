import { ModelStatic } from "sequelize";
import Measures from "../database/models/Measures";
import resp from "../utils/resp";
import { v4 as uuid } from 'uuid';


interface upload{
    image: string;
    customer_code: string;
    measure_datetime: Date;
    measure_type: 'WATER' | 'GAS';
}

interface GeminiResponse{
    status: number;
    image_url: string,
    measure_value: number
}


class MeasureServices{
    private model: ModelStatic<Measures> = Measures;
    

    async getAllMeasures(){
        const measures = await this.model.findAll();
        return resp(200, measures);
    }
    async uploadMeasure(body: upload){
        try {
            const response = await fetch('https://api.geminivision.com/analyze', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
                body: JSON.stringify({
                  image: body.image,
                  task: 'OCR_NUMBERS'
                })
            });
        
            if (!response.ok) {
              throw new Error(`Falha ao enviar dados para o Gemini Vision: ${response.statusText}`);
            }
            
            const data: GeminiResponse = await response.json();

            if (isNaN(data.measure_value)) {
                throw new Error(`Extracted value is not a number: ${data.measure_value}`);
              }
            const measuresCreate = await this.model.create({
                customer_code: body.customer_code,
                measure_uuid: uuid(),
                measure_datetime: body.measure_datetime,
                measure_value: Math.round(data.measure_value),
                has_confirmed: false,
                image_url: data.image_url
            } );


            resp(200, {
                message: 'Operação realizada com sucesso',
                data: {
                  image_url: measuresCreate.dataValues.image_url,
                  measure_value: measuresCreate.dataValues.measure_value,
                  measure_uuid: measuresCreate.dataValues.measure_uuid
                }
            });

          } catch (error) {
            console.error('Erro ao enviar medida para o Gemini Vision:', error);
            throw new Error('Ocorreu um erro ao processar a medida.');
          }
    }
}

export default MeasureServices;