"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize_2 = __importDefault(require("sequelize"));
const _1 = __importDefault(require("."));
const Customers_1 = __importDefault(require("./Customers"));
class Measures extends sequelize_1.Model {
}
Measures.init({
    customerCode: {
        type: sequelize_2.default.STRING,
        allowNull: false,
        references: {
            model: 'customers',
            key: 'customer_code'
        }
    },
    measureUuid: {
        type: sequelize_2.default.STRING,
        defaultValue: sequelize_2.default.DataTypes.UUIDV4,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
    },
    measureDate: {
        type: sequelize_2.default.DATE,
        allowNull: false,
    },
    measureType: {
        type: sequelize_2.default.STRING,
        allowNull: false
    },
    hasCofirmed: {
        type: sequelize_2.default.BOOLEAN,
        allowNull: false
    },
    imageUrl: {
        type: sequelize_2.default.STRING,
        allowNull: true
    }
}, {
    sequelize: _1.default,
    tableName: 'measures',
    timestamps: false,
    underscored: true
});
Measures.belongsTo(Customers_1.default, {
    foreignKey: 'customerCode',
    as: 'Customer'
});
exports.default = Measures;
