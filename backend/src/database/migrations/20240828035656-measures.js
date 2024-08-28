'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('measures', {

      customer_code: {
        type: Sequelize.STRING,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'customer_code'
        }
      },
      measure_uuid: {
        type: Sequelize.STRING,
        defaultValue: Sequelize.DataTypes.UUIDV4,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        primaryKey: true
      },
      measure_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      measure_type: {
        type: Sequelize.STRING,
        allowNull: false
      },

      has_cofirmed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },

      image_url: {
        type: Sequelize.STRING,
        allowNull: true
      }

    })
  },

  async down (queryInterface, Sequelize) {
      await queryInterface.dropTable('measures');
    
  }
};
