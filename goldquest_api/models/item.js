'use strict';
module.exports = (sequelize, DataTypes) => {
  var Item = sequelize.define('Item', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    store_id: DataTypes.INTEGER,
    transaction_id: DataTypes.INTEGER,
    description: DataTypes.STRING,
    weight: DataTypes.INTEGER,
    value: DataTypes.INTEGER,   
    payout: DataTypes.INTEGER,
    metal_id: DataTypes.INTEGER,
    purity_id: DataTypes.INTEGER,
    date_transaction: DataTypes.INTEGER,
    date_hold_expire: DataTypes.INTEGER
  }, {});
  Item.associate = function (models) {
    models.Item.belongsTo(models.Transaction, {
      foreignKey: 'transaction_id',
      onDelete: 'CASCADE'
    });
    models.Item.belongsTo(models.Store, {
      foreignKey: 'store_id',
      onDelete: 'CASCADE'
    });
    models.Item.belongsToMany(models.Shipment, {
      through: models.ShipmentItem
    });
  };

  return Item;
};