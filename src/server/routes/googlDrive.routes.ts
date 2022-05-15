//@ts-nocheck
const { Router } = require('express')
const multerMiddleware = require('../middlewares/multer.middleware')
const googlDriveControllers = require('../controllers/googlDrive.controllers')

const router = Router()

router.post('/', multerMiddleware.single('image'), googlDriveControllers.uploadFile)
router.get('/:fileId', googlDriveControllers.getFileLink)

module.exports = router