import { Router } from "express";
import MeasureController from "../controller/measures.controller";

const measureRouter = Router();
const control = new MeasureController();

measureRouter.get('/measures', control.getAllMeasures.bind(control));
measureRouter.post('/upload', control.uploadMeasure);

export default measureRouter;