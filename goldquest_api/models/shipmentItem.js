'use strict';
module.exports = (sequelize, DataTypes) => {
    var ShipmentItem = sequelize.define('ShipmentItem', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        shipmentId: DataTypes.INTEGER,
        itemId: DataTypes.INTEGER,
    }, {});
    ShipmentItem.associate = function (models) {

    };
    return ShipmentItem;
};