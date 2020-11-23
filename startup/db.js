const winston = require('winston')
const mongoose = require('mongoose')

module.exports = function() {
    //Connected to MongoDB
    mongoose.connect('mongodb://localhost/lib-shelter')
    .then(() => winston.info('Connected to MongoDB...'))
    // .catch(err => console.error('Could not connect to MongoDB..', err))
}