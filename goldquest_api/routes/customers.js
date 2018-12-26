const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    models.Customer.findAll().then(customers => {
        res.json(customers);
    }).catch(next);
});

router.get('/:cust_id', (req, res, next) => {
    models.Customer.findById(req.params.cust_id)
        .then(customer => {
            res.json(customer);
        })
        .catch(next);
});

router.post('/', (req, res, next) => {
    var newCustomer = req.body;
    models.Customer.create(newCustomer).then(customer => {
        res.json(customer);
    }).catch(next);
});

router.put('/:cust_id', (req, res, next) => {
    var putCustomer = req.body;
    models.Customer.update(putCustomer, {
            where: {
                id: req.params.cust_id
            },
            returning: true
        }).then(Update => {
            models.Customer.findById(req.params.cust_id)
                .then(customer => {
                    res.json(customer);
                })
        })
        .catch(next);
});

/* const setCustomerModel = (req, res, next) => {
    models.Customer.findById(req.params.custID).then(customer => {
        req.Customer = customer;
        next();
    });
};

router.use('/:custID([0-9]+)/transactions', [
    setCustomerModel
    , transactionRouter
]); */

module.exports = router;