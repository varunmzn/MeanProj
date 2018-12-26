'use strict';
module.exports = (sequelize, DataTypes) => {
  var MetalSpot = sequelize.define('MetalSpot', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },    
    date_created: DataTypes.INTEGER,
    payload: DataTypes.JSON
  },  {
    getterMethods: {
      payload:  function() {
        return JSON.parse(this.getDataValue('payload'));
      }
    }
  });

  MetalSpot.associate = function (models) {};
  return MetalSpot;
};