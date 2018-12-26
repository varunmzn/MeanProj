const models = require('../models');
const express = require('express');
const auth = require('../middleware/store-auth');
const router = express.Router();

router.get('/', auth(), (req, res, next) => {
    models.Transaction.findAll({
        where: res.storeFilter,
        include: [{
                model: models.Store,
                attributes: ['id', 'name']
            },
            {
                model: models.Customer,
                attributes: ['first_name', 'last_name']
            }
        ]
    }).then(transactions => {
        res.json(transactions);
    }).catch(next);
});

router.get('/:trans_id', (req, res, next) => {
    models.Transaction.findOne({
        where: {
            trans_id: req.params.trans_id
        },
        include: [{
                model: models.Item
            },
            {
                model: models.Store
            },
            {
                model: models.Customer
            }
        ]
    }).then(transaction => {
        res.json(transaction);
    }).catch(next);
});

router.post('/', (req, res, next) => {
    var newTransaction = req.body;
    models.Transaction.create(newTransaction).then(transaction => {
        newTransaction.items.forEach(item => {
            item.transaction_id = transaction.id;
            item.store_id = transaction.store_id;
            item.date_transaction = transaction.date_created;
            item.date_hold_expire = transaction.date_hold_expire;
            models.Item.create(item);
        });
        res.json(transaction);
    }).catch(next);
});

module.exports = router;