const axios = require('axios');
const config = require('../config/config.json');

module.exports = function xignite() {

    return (req, res, next) => {
        axios.all([
            axios.get(config.xigniteUrl + '?Symbol=XPT&Currency=USD&_token=' + config.xigniteToken),
            axios.get(config.xigniteUrl + '?Symbol=XAU&Currency=USD&_token=' + config.xigniteToken),
            axios.get(config.xigniteUrl + '?Symbol=XAG&Currency=USD&_token=' + config.xigniteToken)
        ]).then(axios.spread((xpt, xau, xag) => {

            res.spotData = {
                platinum: xpt.data,
                gold: xau.data,
                silver: xag.data
            };
            next();

        })).catch(error => {
            console.log(error);
        });
        
    }
    
}