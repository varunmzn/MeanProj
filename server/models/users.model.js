const mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'Full name can\'t be empty'
    },
    lastName: {
        type: String,
        required: 'Last name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    password: {
        type: String,
        required: 'Password can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    mobile: {
        type: String,
        required: 'Mobile can\'t be empty',
        minlength: [4, 'Password must be atleast 4 character long']
    },
    gender: {
        type: String,
        required: 'Gender can\'t be empty',
    },
    age: {
        type: Number,
        required: 'Age can\'t be empty',
    },
});

// Custom validation for email
usersSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');



mongoose.model('Users', usersSchema);