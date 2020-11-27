const mongoose = require('mongoose');
const Joi = require('joi');

const UserInfo = mongoose.model('UserInfo', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 20
    },
    userImage:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
}))

function validateUser(user) { 
    //Validate
    const schema = {
        name: Joi.string().min(5).max(20).required(),
        userImage: Joi.string()
    }
    return Joi.validate(user, schema)
}

exports.UserInfo = UserInfo;
exports.validate = validateUser;

