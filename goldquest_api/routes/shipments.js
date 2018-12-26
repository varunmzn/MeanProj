const models = require('../models');
const express = require('express');
const auth = require('../middleware/store-auth');
const router = express.Router();

router.get('/', auth(), (req, res, next) => {
    models.Shipment.findAll({
        where: res.storeFilter,
        include: [{
            model: models.Item
        }, {
            model: models.Store,
            attributes: ['id', 'name']
        }]
    }).then(shipments => {
        res.json(shipments);
    }).catch(next);
});

router.get('/:ship_id', (req, res, next) => {
    models.Shipment.findOne({
        where: {
            shipment_id: req.params.ship_id
        },
        include: [{
                model: models.Item
            },
            {
                model: models.Store
            }
        ]
    }).then(shipment => {
        res.json(shipment);
    }).catch(next);
});

router.post('/', (req, res, next) => {
    var newShipment = req.body;
    models.Shipment.create(newShipment).then(shipment => {
        newShipment.items.forEach(item => {
            item.shipmentId = shipment.id;
            item.itemId = item.id;
            models.ShipmentItem.create(item);
        });
        res.json(shipment);
    }).catch(next);
});

module.exports = router;