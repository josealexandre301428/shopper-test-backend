import { Request, Response } from "express";
import MeasureService from '../services/measure.service';
import validateUpload from "../utils/validateUpload";
import resp from "../utils/resp";




class MeasureController {
  private service = new MeasureService();
    async getAllMeasures(req: Request, res: Response) {
      try {
        const measures = await this.service.getAllMeasures();
        res.status(200).json({ measures });
      } catch (error) {
        res.status(500).json({
          message: 'An error occurred during the search for measures',
          error: error
        });
      }
    }
    async uploadMeasure(req: Request, res: Response) {
      try {
        const { image, customer_code, measure_type } = req.body;
        const validationErrors = validateUpload.validateUpload({ image, customer_code, measure_type });
        if (validationErrors.status == 400) {
          return resp(400, { errors: validationErrors.error_description });
        }
          const uploadResponse = await this.service.uploadMeasure(req.body);
          const result: string | { status: number; message: any; } = await Promise.race([uploadResponse]);
          if (typeof result === 'object' && result !== null && 'status' in result) {
           return res.status(409).json({result});
        }
        res.status(201).json({result});
      } catch (error) {
          return (`Erro ao realizar o upload da medida:${error}`)
      }
    }
};

export default MeasureController;