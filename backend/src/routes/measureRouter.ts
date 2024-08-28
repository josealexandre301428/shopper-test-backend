import { Router } from "express";
import MeasureController from "../controller/measures.controller";
const control = new MeasureController();

const measureRouter = Router();

measureRouter.get('/measures', control.getAllMeasures.bind(control));

export default measureRouter;