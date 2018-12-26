'use strict';
module.exports = (sequelize, DataTypes) => {
  var Shipment = sequelize.define('Shipment', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    shipment_id: DataTypes.STRING,
    carrier_name: DataTypes.STRING,
    tracking_id: DataTypes.STRING,
    store_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    date_created: DataTypes.INTEGER,
    insured_value: DataTypes.DECIMAL,
    handling_fee: DataTypes.DECIMAL,
    insurance_cost: DataTypes.DECIMAL,
    shipping_cost: DataTypes.DECIMAL,
    purchaser: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    getterMethods: {
      purchaser: function () {
        return JSON.parse(this.getDataValue('purchaser'));
      }
    }
  });
  Shipment.associate = function (models) {
    models.Shipment.belongsTo(models.Store, {
      foreignKey: 'store_id',
      onDelete: 'CASCADE'
    });
    models.Shipment.belongsTo(models.User, {
      foreignKey: 'user_id'
    });
    models.Shipment.belongsToMany(models.Item, {
      through: models.ShipmentItem
    });
  };
  return Shipment;
};