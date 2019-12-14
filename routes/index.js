const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', (req,res) => {
  const name = req.cookies.username;
  name ? res.render('index', { name }) : res.redirect('hello')
})

router.get('/hello', (req,res) => {
  res.render('hello')
})

router.get('/register', (req,res) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  if (req.body.name &&
      req.body.email &&
      req.body.password &&
      req.body.confirmPassword) {

    // confirm passwords match
    if (req.body.password !== req.body.confirmPassword) {
      const err = new Error('Passwords do not match');
      err.status = 400;
      return next(err)
    }

    let userData = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };

    User.create(userData, function(error, user) {
      if (error) {
        return next(error)
      } else {
        return res.redirect('/hello')
      }
    })
  } else {
    const err = new Error('All fields are required');
    err.status = 400;
    return next(err)
  }
})

router.post('/goodbye', (req,res) => {
  res.clearCookie('username')
  res.redirect('hello')
})

router.post('/hello', (req,res) => {
  res.cookie('username', req.body.username);
  res.redirect('/')
})

module.exports = router;
