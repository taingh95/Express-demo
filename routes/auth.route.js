var express = require('express')
var router = express.Router()
var multer  = require('multer')

var upload = multer({ dest: './public/uploads/' })
const authController = require('../controllers/auth-controller')
const authValidator = require('../validate/register-validation')

router.get('/login', authController.index);
router.post('/login', authController.authLogin)


router.get('/create', authController.create )
router.post('/create', upload.single('avatar') ,authValidator.validation , authController.postCreate)
module.exports = router