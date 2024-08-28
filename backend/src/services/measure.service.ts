import { ModelStatic } from "sequelize";
import Measures from "../database/models/Measures";
import resp from "../utils/resp";

class MeasureServices{
    private model: ModelStatic<Measures> = Measures;

    async getAllMeasures(){
        const measures = await this.model.findAll();
        return resp(200, measures);
    }
}

export default MeasureServices;