var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('backend/pages/dashboard/index.ejs', { page: 'admin page' });
});

module.exports = router;
