const models = require('../models');
const express = require('express');
const auth = require('../middleware/store-auth');
const router = express.Router();

router.get('/', auth(), (req, res, next) => {
    models.Store.findAll({
        where: res.clientFilter
    }).then(stores => {
        res.json(stores);
    }).catch(next);
});

router.get('/:store_id', (req, res, next) => {
    models.Store.findOne({
        where: {
            id: req.params.store_id
        }
    }).then(store => {
        res.json(store);
    }).catch(next);
});

router.post('/', (req, res, next) => {
    var newStore = req.body;
    models.Store.create(newStore).then(store => {
        res.json(store);
    }).catch(next);
});

router.put('/:store_id', (req, res, next) => {
    var putStore = req.body;
    models.Store.update(putStore, {
            where: {
                id: req.params.store_id
            },
            returning: true
        }).then(Update => {
            models.Store.findById(req.params.store_id)
                .then(store => {
                    res.json(store);
                })
        })
        .catch(next);
});

module.exports = router;