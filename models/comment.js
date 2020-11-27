const mongoose = require('mongoose');
const Joi = require('joi');

const Comments = mongoose.model('Comments', new mongoose.Schema({
    comment:{
        type: String,
        minlength: 5,
        maxlength: 50
    },
    likes:{
        type: Number
    }
}))

//Modelling
function validateComment(comment) { 
    //Validate
    const schema = {
        comment: Joi.string().min(10).max(200),
        likes: Joi.number()
    }
    return Joi.validate(comment, schema)
}

exports.Comments = Comments;
exports.validate = validateComment;