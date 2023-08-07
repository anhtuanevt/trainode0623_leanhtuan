const express = require('express')

const router = express.Router()
const categoryController = require('../../controllers/category_controller')

router
    .route('/')
    .get(categoryController.list)

router
    .route('/form(/:id)?')
    .get(categoryController.getForm)
    .post(categoryController.updateForm)

router
    .route('/delete/:id')
    .get(categoryController.deleteByID)
// get all list


module.exports = router;