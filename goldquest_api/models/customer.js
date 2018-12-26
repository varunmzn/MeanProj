'use strict';
module.exports = (sequelize, DataTypes) => {
  var Customer = sequelize.define('Customer', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    ident_num: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ident_type: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ident_expire: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ident_issuer: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    date_birth: {
      type: DataTypes.DATE,
      allowNull: true
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address_1: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    address_2: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    state: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    postal_code: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    phone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    hair: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    eyes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ethnicity: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {});
  
  Customer.associate = function (models) {

    models.Store.hasMany(models.Transaction, {
      foreignKey: 'customer_id',
      onDelete: 'CASCADE'
    });

    models.Customer.belongsTo(models.Store, {
      foreignKey: 'store_id',
      onDelete: 'CASCADE',
      as: 'Store'
    });
  };
  return Customer;
};