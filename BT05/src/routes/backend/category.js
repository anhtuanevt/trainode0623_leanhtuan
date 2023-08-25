const express                           = require('express')
const { body }                          = require('express-validator');
const router                            = express.Router()

const mainController                = require('../../controllers/category_controller');


router
    .route('/form(/:id)?')
    .get(mainController.getForm)
    .post(
        body('name').notEmpty().withMessage('Name is not empty'),
        body('status').isIn(['inactive', 'active']).withMessage('status is only active or inactive'),
        body('ordering').isInt({min: 1}).withMessage('Ordering should >= 1'),
        mainController.updateForm)

router
    .route('/status(/:status)?')
    .get(mainController.list)

router
    .route('/delete/:id')
    .get(mainController.deleteByID)

router
    .route('/change-status/:id/:status')
    .get(mainController.changeStatus)

router
    .route('/change-ordering/:id/:ordering')
    .get(mainController.changeOrdering)

router
    .route('/change-multi-status/:status')
    .post(mainController.changeMultipleStatus)

router
    .route('/delete-multi')
    .post(mainController.deleteMulti)

module.exports = router;