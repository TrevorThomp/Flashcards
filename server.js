'use strict';


// Application Dependencies 
const express = require('express')
const app = express();

app.set('view engine', 'pug');

app.get('/', (req,res) => {
  res.render('index')
})

app.get('/card', (req,res) => {
  res.locals.prompt = 'Who is buried in Grants Tomb';
  res.locals.hint = 'Think about the tomb?';
  res.render('card')
});

app.listen(3000, console.log(`Listening on Port: 3000`));

