var express = require('express');
var router = express.Router();

const dashboardRouter = require('./dashboard')
const listRouter = require('./list')
const itemRouter = require('./item')

router.use('/',dashboardRouter)
router.use('/list', listRouter)
router.use('/item',itemRouter)


module.exports = router;
