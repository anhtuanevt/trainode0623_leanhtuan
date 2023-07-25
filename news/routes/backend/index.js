var express = require('express');
var router = express.Router();

const dashboardRouter = require('./dashboard')
const itemRouter = require('./item')
const userRouter = require('./user')

router.use('/',dashboardRouter)
router.use('/user',userRouter)
router.use('/item',itemRouter)


module.exports = router;
