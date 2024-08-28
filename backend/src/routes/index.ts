import { Router } from "express";
import measureRouter from "./measureRouter";
import customersRouter from "./customersRouter";

const router = Router();
router.use(measureRouter);
router.use(customersRouter)

export default router;