import { NextFunction, Request, Response } from "express";
import MeasureService from '../services/measure.service';
import validateUpload from "../utils/validateUpload";


class MeasureController {
  constructor(private readonly measureService: MeasureService) {}
    async getAllMeasures(req: Request, res: Response, next: NextFunction) {
      try {
        const measures = await this.measureService.getAllMeasures();
        res.status(200).json({ measures });
      } catch (error) {
        next(error);
      }
    }
    async uploadMeasure(req: Request, res: Response, next: NextFunction) {
        try {
          const { image, customer_code, measure_type } = req.body;
          const measures = await this.measureService.getAllMeasures();
          const validationErrors = validateUpload.validateUpload({ image, customer_code, measure_datetime: new Date(), measure_type }, measures);
          if (validationErrors.status === 400 || 409) {
            return res.status(400).json({ errors: validationErrors });
          }
          
      const uploadResponse = await this.measureService.uploadMeasure({
        image,
        customer_code,
        measure_datetime: new Date(),
        measure_type
      });

      res.status(201).json({
        message: 'Measure uploaded successfully',
        data: uploadResponse
      });
    } catch (error) {
      console.error('Error during upload:', error);
      next(error);
    }
  }
};

export default MeasureController;