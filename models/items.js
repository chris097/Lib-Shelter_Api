const mongoose = require('mongoose');
const Joi = require('joi');

const Item = mongoose.model('Item', new mongoose.Schema({
    author:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    title:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    description:{
        type: String,
        required: true,
        minlength: 50,
        maxlength: 500
    },
    bookUrl: {
        type: String
    },
    isPublished:{
        type: Number,
        required: true,
        minlength: 4
    },
    imageUrl:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }
}))

//Modelling
function validateCourse(item) { 
    //Validate
    const schema = {
        author: Joi.string().min(5).max(50).required(),
        title: Joi.string().min(5).max(50).required(),
        description: Joi.string().min(50).max(500).required(),
        bookUrl: Joi.string(),
        isPublished: Joi.number().required().min(4),
        imageUrl: Joi.string()
    }
    return Joi.validate(item, schema)
}

exports.Item = Item;
exports.validate = validateCourse
