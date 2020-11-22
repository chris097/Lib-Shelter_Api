const mongoose = require('mongoose');
const Joi = require('joi');

const Item = mongoose.model('Item', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}))

//Modelling
function validateCourse(item) { 
    //Validate
    const schema = {
        name: Joi.string().min(5).max(50).required()
    }
    return Joi.validate(item, schema)
}

exports.Item = Item;
exports.validate = validateCourse
