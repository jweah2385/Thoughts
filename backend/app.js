
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const HttpError = require('./models/http-error');
require('dotenv').config();

const thoughtsRoutes = require('./routes/thoughts-routs');

const app = express();

app.use(bodyParser.json());

app.use('/api/thoughts', thoughtsRoutes);


app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
  });
  
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  });
  

  mongoose
    .connect(mongoURL)
    .then(() => {
      app.listen(5000);
      console.log('Connected to server')
    })
    .catch((err) => {
      console.log(err);
    });
  
