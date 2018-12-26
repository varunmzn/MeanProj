const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/MEANStackDB", { useNewUrlParser: true }, (err) => {
    if (!err) { console.log('MongoDB connection succeeded.'); }
    else { console.log('Error in MongoDB connection : ' + JSON.stringify(err, undefined, 2)); }
});

require('./user.model');