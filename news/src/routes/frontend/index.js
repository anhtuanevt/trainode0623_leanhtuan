var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('frontend/index.ejs', { title: 'Frontend' });
});

module.exports = router;
