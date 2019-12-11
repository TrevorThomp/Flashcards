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

app.get('/', (req,res) => {
  const name = req.cookies.username;
  name ? res.render('index', { name }) : res.redirect('hello')
})

app.get('/hello', (req,res) => {
  res.render('hello')
})

app.post('/goodbye', (req,res) => {
  res.clearCookie('username')
  res.redirect('hello')
})

app.post('/hello', (req,res) => {
  res.cookie('username', req.body.username);
  res.redirect('/')
})

app.get('/card', (req,res) => {
  res.locals.prompt = 'Who is buried in Grants Tomb';
  res.locals.hint = 'Think about the tomb?';
  res.render('card')
});

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
