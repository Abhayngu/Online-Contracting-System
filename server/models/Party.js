const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

let partyScheme = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        select : false
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    description: {
        type: String,
        required : true
    },

    resetPasswordToken : String,
    resetPasswordExpires : Date
});

partyScheme.plugin(passportLocalMongoose, {usernameField : 'email'});
module.exports = mongoose.model('User', partyScheme);