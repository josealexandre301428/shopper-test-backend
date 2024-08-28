import { ModelStatic } from "sequelize";
import Customers from "../database/models/Customers";
import resp from "../utils/resp";

class CustomerServices{
    private model: ModelStatic<Customers> = Customers;

    async getAllCustomers(){
        const customers = await this.model.findAll();
        return resp(200, customers);
    }
}

export default CustomerServices;