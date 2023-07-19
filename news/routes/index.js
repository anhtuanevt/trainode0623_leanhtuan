var express = require('express');
var router = express.Router();
const routerBackend = require('./backend');
const routerFrontend = require('./frontend');

router.use('/admin', routerBackend);
router.use('/', routerFrontend);

module.exports = router;
