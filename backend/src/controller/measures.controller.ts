import { Request, Response } from "express";
import MeasureService from '../services/measure.service';
import validateUpload from "../utils/validateUpload";




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
      const { image, customer_code, measure_type } = req.body;
  
      try {
        const validationErrors = validateUpload.validateUpload({ image, customer_code, measure_type });
        if (validationErrors.status == 400) {
          return res.status(400).json({ errors: validationErrors.error_description });
        }
          const uploadResponse = await this.service.uploadMeasure(image, customer_code, measure_type);
          const response = await Promise.race([uploadResponse]);
          res.status(201).json({response});
      } catch (error) {
          return (`Erro ao realizar o upload da medida:${error}`)
      }
    }
};

export default MeasureController;