var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  const {number, page} = req.query;
  res.render('backend/index.ejs', { page: 'user page' });
});


module.exports = router;
