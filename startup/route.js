const express = require('express');
const helmet = require('helmet');
const items = require('../routes/items');
const comments = require('../routes/comment');
const user = require('../routes/user');
const error = require('../middleware/error');

module.exports = function(app){
    //Midddleware
    app.use(express.json())
    app.use(helmet())
    app.use('/api/items', items)
    app.use('/api/comments', comments)
    app.use('/api/user', user)
    app.use('/api/user', likes)
    app.use(error)
}