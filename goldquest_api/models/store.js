'use strict';
module.exports = (sequelize, DataTypes) => {
  var Store = sequelize.define('Store', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
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
    contact_name: {
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
    police_hold: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    police_frequency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    police_fax: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    police_email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    leads_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    leads_username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    leads_password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    weight_unit: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    timezone: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    license: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    group: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    points_system: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    payout_max: {
      type: DataTypes.DECIMAL(2,2),
      allowNull: true
    },
    payout: {
      type: DataTypes.DECIMAL(2,2),
      allowNull: true
    }
  }, {});
  Store.associate = function (models) {

    models.Store.hasMany(models.Transaction, {
      foreignKey: 'store_id',
      onDelete: 'CASCADE'
    });

    models.Store.hasMany(models.Item, {
      foreignKey: 'store_id',
      onDelete: 'CASCADE'
    });


  };
  return Store;
};