"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
const _1 = __importDefault(require("."));
const Measures_1 = __importDefault(require("./Measures"));
class Customer extends sequelize_1.Model {
}
Customer.init({
    customerCode: {
        type: sequelize_2.default.STRING,
        defaultValue: sequelize_2.default.DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    customerName: {
        type: sequelize_2.default.STRING,
        allowNull: false
    }
}, {
    sequelize: _1.default,
    tableName: 'customers',
    timestamps: false,
    underscored: true
});
Customer.hasMany(Measures_1.default, {
    foreignKey: 'customerCode',
    as: 'measures'
});
exports.default = Customer;
