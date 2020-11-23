require('express-async-errors')
const winston = require('winston')
const error = require('./middleware/error')
require('express-async-errors')
const mongoose = require('mongoose');
const helmet = require('helmet')
const items = require('./routes/items')
const express = require("express");
const app = express();

winston.add(winston.transports.File, { filename: 'logfile.log' })
//Connected to MongoDB
mongoose.connect('mongodb://localhost/lib-shelter')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB..', err))
//Midddleware
app.use(express.json())
app.use(helmet())
app.use('/api/items', items)
app.use(error)

console.log(app.get('env'))

//Environment Variable
const port = process.env.PORT || 4040;
app.listen(port, winston.info(`Listening on port ${port}...`))