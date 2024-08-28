import { NextFunction, Request, Response } from "express";
import CustomerServices from "../services/customer.services";

class CustomerController {
    private service = new CustomerServices();

    async getAllMeasures(req: Request, res: Response, next: NextFunction) {
        try {
            const { status, message} = await this.service.getAllCustomers();
            res.status(status).json(message);
        } catch (error) {
            next(error);
        }
    }
};

export default CustomerController;