require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

// Routes
const Routes = require('./routes');

// Middlewares
app.use(bodyParser.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(morgan('combined')); // for logging
app.use(cors()); // for cors
app.use(helmet()); // for security

// Set routes
app.use(Routes);

// Listen port
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = app;