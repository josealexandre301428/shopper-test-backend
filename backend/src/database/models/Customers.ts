import { Model } from "sequelize";
import sequelize  from 'sequelize';
import db from ".";
import Measures from "./Measures";

class Customer extends Model {
    declare customer_code: string;
}

Customer.init({
    customerCode: {
        type: sequelize.STRING,
        defaultValue: sequelize.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
      },
      customerName: {
        type: sequelize.STRING,
        allowNull: false
      }
}, {
    sequelize: db,
    tableName: 'customers',
    timestamps: false,
    underscored: true
}
);

Customer.hasMany(Measures, {
    foreignKey: 'customerCode',
    as: 'measures'
});

export default Customer;