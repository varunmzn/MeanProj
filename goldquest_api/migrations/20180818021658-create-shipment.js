'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Shipments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      shipment_id: {
        type: Sequelize.STRING
      },
      carrier_name: {
        type: Sequelize.STRING
      },
      tracking_id: {
        type: Sequelize.STRING
      },
      store_id: {
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      date_created: {
        type: Sequelize.INTEGER
      },
      insured_value: {
        type: Sequelize.DECIMAL(10,2)
      },
      handling_fee: {
        type: Sequelize.DECIMAL(10,2)
      },
      insurance_cost: {
        type: Sequelize.DECIMAL(10,2)
      },
      shipping_cost: {
        type: Sequelize.DECIMAL(10,2)
      },
      purchaser:{
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 'pending'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Shipments');
  }
};