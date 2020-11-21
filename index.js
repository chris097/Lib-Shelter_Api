const mongoose = require('mongoose');
const helmet = require('helmet')
const items = require('./routes/items')
const express = require("express");
const app = express();
app.use(express.json())
app.use(helmet())
app.use('/api/items', items)

mongoose.connect('mongodb://localhost/lib-shelter')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB..', err))

console.log(app.get('env'))

//Environment Variable
const port = process.env.PORT || 4040;
app.listen(port, console.log(`Listening on port ${port}...`))