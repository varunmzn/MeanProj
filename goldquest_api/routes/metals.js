const models = require('../models');
const express = require('express');
const xignite = require('../handlers/xignite');
const router = express.Router();

router.get('/spot', (req, res, next) => {
    models.MetalSpot.findOne({
        order: [
            ['date_created', 'DESC']
        ]
    }).then(spot => {     
        res.json(spot);
    }).catch(next);
});

router.get('/update', xignite(), (req, res, next) => {
    var date = Date.now() / 1000;
    var spot = {
        payload: res.spotData || {},
        date_created: date
    }
    models.MetalSpot.create(spot).then(spot => {
        res.json({ id: spot.id });
    }).catch(next);
});

module.exports = router;