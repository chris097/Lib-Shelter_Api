const mongoose = require('mongoose');

const Item = mongoose.model('Item', new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}))

module.exports = Item;
