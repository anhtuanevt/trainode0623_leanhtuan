const express                           = require('express')
const router                            = express.Router()

const { body }                          = require('express-validator');
const multer                            = require('multer');
const mainController                    = require('../../controllers/article_controller');

const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
});

router
    .route('/form(/:id)?')
    .get(mainController.getForm)
    .post(
        upload.single('image'),
        body('title').notEmpty().withMessage('Title is not empty'),
        body('status').isIn(['inactive', 'active']).withMessage('status is only active or inactive'),
        body('ordering').isInt({ min: 1 }).withMessage('Ordering should >= 1'),
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