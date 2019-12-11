'use strict';


// Application Dependencies 
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

app.set('view engine', 'pug');

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
