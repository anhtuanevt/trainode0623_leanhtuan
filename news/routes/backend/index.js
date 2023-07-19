var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('backend/index.ejs', { title: 'backend' });
});

router.get('/user', function(req, res, next) {
  const {number, page} = req.query;
  res.render('index', { title: 'backend ' + number });
});

router.get('/user/login/:username/:password', function(req, res, next) {
  const {username, password} = req.params;
  res.render('index', { title: 'backend ' + "username: " + username  });
});


module.exports = router;
