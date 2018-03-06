const express = require('express');
const path = require('path');
const cors = require('cors');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const comics = require('./routes/comics');
const users = require('./routes/users');

//Initialize Express
const app = express();

// Connect Mongoose database
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost/mern-backend', {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useMongoClient: true
});

// Setup CORS
app.use(cors({
  credentials: true,
  origin: [process.env.CLIENT_URL]
  })
);

// Standard Boilerplate
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/comics', comics);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  res.json({error: 'error.not-found'});
});

// error handler
app.use(function (err, req, res, next) {
  console.log('ERROR', req.method, req.path, err);

  if (!res.headersSent) {
    res.status(500);
    res.json({error: 'error.unexpected'});
  }
});

module.exports = app;
