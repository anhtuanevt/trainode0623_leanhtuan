var express = require('express');
var router = express.Router();

const dashboardRouter = require('./dashboard')
const listRouter = require('./list')

router.use('/',dashboardRouter)
router.use('/list',listRouter)


module.exports = router;
