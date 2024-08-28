import { NextFunction, Request, Response } from "express";
import MeasureServices from "../services/measure.service";

class MeasureController {
    private service = new MeasureServices();

    async getAllMeasures(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message} = await this.service.getAllMeasures();
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }
};

export default MeasureController;