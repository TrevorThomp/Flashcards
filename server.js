'use strict';


// Application Dependencies 
const express = require('express')
const bodyParser = require('body-parser')

const app = express();

// Middleware
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'pug');

app.get('/', (req,res) => {
  res.render('index')
})

app.get('/hello', (req,res) => {
  res.render('hello')
})

app.post('/hello', (req,res) => {
  res.render('hello', { name:req.body.username})
})

app.get('/card', (req,res) => {
  res.locals.prompt = 'Who is buried in Grants Tomb';
  res.locals.hint = 'Think about the tomb?';
  res.render('card')
});

app.listen(3000, console.log(`Listening on Port: 3000`));
