import { Router } from "express";
import customerController from "../controller/customers.controller";
const control = new customerController();

const customersRouter = Router();

customersRouter.get('/customers', control.getAllMeasures.bind(control));

export default customersRouter;