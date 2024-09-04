import { Model } from "sequelize";
import sequelize  from 'sequelize';
import db from ".";
import Customers from "./Customers";

class Measures extends Model {
    declare customerCode: string;
    declare measureUuid: string;
    declare measureDate: Date;
    declare measureType: string;
    declare hasCofirmed: boolean;
    declare imageUrl: string;
}

Measures.init({
    customerCode: {
        type: sequelize.STRING,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'customer_code'
        }
      },
      measureUuid: {
        type: sequelize.STRING,
        defaultValue: sequelize.DataTypes.UUIDV4,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      },
      measureDate: {
        type: sequelize.DATE,
        allowNull: false,
      },

      measureValue: {
        type: sequelize.INTEGER,
        allowNull: false,
      },

      measureType: {
        type: sequelize.STRING,
        allowNull: false
      },

      hasCofirmed: {
        type: sequelize.BOOLEAN,
        allowNull: false
      },

      imageUrl: {
        type: sequelize.BLOB,
        allowNull: true
      }
}, {
    sequelize: db,
    tableName: 'measures',
    timestamps: false,
    underscored: true
}
);

Measures.belongsTo(Customers, {
    foreignKey: 'customerCode',
    as: 'Customer'
});

export default Measures;