const express                           = require('express')
const { body }                          = require('express-validator');
const router                            = express.Router()

const categoryController                = require('../../controllers/category_controller');


router
    .route('(/:status)?')
    .get(categoryController.list)

router
    .route('/item/form(/:id)?')
    .get(categoryController.getForm)
    .post(
        body('name').notEmpty().withMessage('Name is not empty'),
        body('status').isIn(['inactive', 'active']).withMessage('status is only active or inactive'),
        body('ordering').isInt({min: 1}).withMessage('Ordering should >= 1'),
        categoryController.updateForm)

router
    .route('/delete/:id')
    .get(categoryController.deleteByID)
// get all list


module.exports = router;