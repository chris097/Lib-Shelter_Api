require('express-async-errors')
const express = require("express");
const winston = require('winston')
const app = express();

require('./startup/logging')()
require('./startup/route')(app)
require('./startup/db')();
require('./startup/prod')(app)

//Environment Variable
const port = process.env.PORT || 4040;
app.listen(port, winston.info(`Listening on port ${port}...`))