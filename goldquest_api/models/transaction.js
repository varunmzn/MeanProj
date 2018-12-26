'use strict';
module.exports = (sequelize, DataTypes) => {
  var Transaction = sequelize.define('Transaction', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    trans_id: DataTypes.STRING,
    store_id: DataTypes.INTEGER,
    customer_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    payout: DataTypes.INTEGER,
    date_created: DataTypes.INTEGER,
    date_hold_expire: DataTypes.INTEGER
  }, {});

  Transaction.associate = function (models) {

    models.Transaction.belongsTo(models.Store, {
      foreignKey: 'store_id',
      onDelete: 'CASCADE'
    });

    models.Transaction.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      onDelete: 'CASCADE'
    });
    
    models.Transaction.hasMany(models.Item, {
      foreignKey: 'transaction_id',
      onDelete: 'CASCADE'
    });
  };
  return Transaction;
};