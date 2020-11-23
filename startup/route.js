const express = require('express')
const helmet = require('helmet')
const items = require('../routes/items')
const error = require('../middleware/error')

module.exports = function(app){
    //Midddleware
    app.use(express.json())
    app.use(helmet())
    app.use('/api/items', items)
    app.use(error)
}