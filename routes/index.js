const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  const name = req.cookies.username;
  name ? res.render('index', { name }) : res.redirect('hello')
})

router.get('/hello', (req,res) => {
  res.render('hello')
})

router.post('/goodbye', (req,res) => {
  res.clearCookie('username')
  res.redirect('hello')
})

router.post('/hello', (req,res) => {
  res.cookie('username', req.body.username);
  res.redirect('/')
})

router.get('/card', (req,res) => {
  res.locals.prompt = 'Who is buried in Grants Tomb';
  res.locals.hint = 'Think about the tomb?';
  res.render('card')
});

module.exports = router;