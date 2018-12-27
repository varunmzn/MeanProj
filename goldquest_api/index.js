const express = require('express');
const app = express();
const cors = require('cors');
const jose = require('node-jose');
const bearerToken = require('express-bearer-token');

const config = require('./config/config.json');
const jwks = require('./config/jwks.json');
const customers = require('./routes/customers');
const items = require('./routes/items');
const shipments = require('./routes/shipments');
const stores = require('./routes/stores');
const transactions = require('./routes/transactions');
const metals = require('./routes/metals');



require('./config/config1');
require('./models/db');
require('./config/passportConfig');

const bodyParser = require('body-parser');
const passport = require('passport');
const rtsIndex = require('./routes/index.router');


app.use(cors());
app.use(express.json());

app.use('/version', (req, res, next) => {
    let version;
    try {
        require.resolve('./config/version.json');
        version = require('./config/version.json');
    } catch (err) {
        version = require('./config/version.example.json');
    }
    res.json(version);
    res.end();
});

// app.use(bearerToken());
// app.use((req, res, next) => {
//     if (req.app.get('env') === 'test') {
//       next();
//       return;
//     }
//     const token = req.token;
//     if (!token) {
//       const error = new Error('Unauthorized');
//       error.status = 401;
//       next(error);
//       return;
//     }
//     const sections = token.split('.');
//     const header = jose.util.base64url.decode(sections[0]);
//     const parsed = JSON.parse(header);
//     const kid = parsed.kid;
//     const keys = jwks.keys;
//     const key = keys.find(k => k.kid === kid);
//     if (!key) {
//       const error = new Error('Unauthorized');
//       error.status = 401;
//       next(error);
//       return;
//     }
//     jose.JWK.asKey(key).then(result => {
//       return jose.JWS.createVerify(result)
//         .verify(token);
//     }).then(result => {
//       const claims = JSON.parse(result.payload);
//       const now = Math.floor(new Date() / 1000);
//       if (now > claims.exp) {
//         const error = new Error('Unauthorized');
//         error.status = 401;
//         next(error);
//         return;
//       }
//       res.locals.auth = claims;
//       next();
//     }).catch(err => {
//       err.status = 401;
//       next(err);
//     });
//   });


// middleware
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/api', rtsIndex);

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
    else{
        console.log(err);
    }
});


app.use('/customers', customers);
app.use('/items', items);
app.use('/shipments', shipments);
app.use('/stores', stores);
app.use('/metals', metals);
app.use('/transactions', transactions);

app.listen(3000, () => console.log('GoldQuest API listening on port 3000!'));