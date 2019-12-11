const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
  res.locals.prompt = 'Who is buried in Grants Tomb';
  res.locals.hint = 'Think about the tomb?';
  res.render('card')
});

module.exports = router;
