import { Router } from "express";
import measureRouter from "./measureRouter";

const router = Router();
router.use(measureRouter)

export default router;