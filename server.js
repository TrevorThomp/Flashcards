'use strict';

// Application Dependencies 
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose')

const app = express();

// mongoDB Connection
mongoose.connect('mongodb://localhost:27017/flashcards', {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const db = mongoose.connection;

// mongoDB error
db.on('err', console.error.bind(console, 'connection error:'))

// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');

app.use(mainRoutes);
app.use('/cards', cardRoutes);

// Error Handler
app.use((req,res,next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use((err,req,res,next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
})

app.listen(3000, console.log(`Listening on Port: 3000`));
