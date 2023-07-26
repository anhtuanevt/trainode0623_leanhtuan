var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('backend/pages/list/index.ejs', { page: 'list page' });
});

router.get('/addform', function(req, res, next) {
  res.render('backend/pages/list/addForm.ejs', { page: 'add form page' });
});


module.exports = router;
