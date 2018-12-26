const models = require('../models');
const express = require('express');
const auth = require('../middleware/store-auth');
const router = express.Router();
const sequelize = require('sequelize');

router.get('/', auth(), (req, res, next) => {
    models.Item.findAll({
        where: res.storeFilter
    }).then(items => {
        res.json(items);
    }).catch(next);
});

router.get('/sell', (req, res, next) => {
    const date = Date.now() / 1000;
    const storeId = res.locals.auth['custom:store_id'];
    const storeAccess = (res.locals.auth['custom:store_access']) ? res.locals.auth['custom:store_access'].split(',') : [];
    storeAccess.push(storeId);
    res.storeFilter = {};
    res.storeFilter.where = sequelize.literal(`date_hold_expire <= ${date} AND Shipments.id IS NULL AND Item.store_id IN (${storeAccess})`);
    res.storeFilter.include = [{
        model: models.Shipment
    }]
    models.Item.findAll(res.storeFilter).then(items => {
        res.json(items);
    }).catch(next);
});

router.get('/:item_id', (req, res, next) => {
    models.Transaction.findOne({
        where: {
            id: req.params.item_id
        }
    }).then(item => {
        res.json(item);
    }).catch(next);
});

router.post('/', (req, res, next) => {
    var newItem = req.body;
    models.Item.create(newItem).then(item => {
        res.json(item);
    }).catch(next);
});


module.exports = router;