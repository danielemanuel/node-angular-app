var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/messages/:msg', function(req, res, next) {
  res.render('messages', {message: req.params.msg});
});

router.post('/messages', function(req, res, next) {
  var message = req.body.message;
  res.redirect('/messages/' + message)
});


module.exports = router;
