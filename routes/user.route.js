var express = require('express')
var router = express.Router()

const controller = require('../controllers/user-controller')



router.get('/', controller.index)

//search-user
router.get('/search', controller.search)

//add-new-user
router.get('/create', controller.getCreate)
router.post('/create', controller.postCreate)

//view dynamic router
router.get('/:id', controller.viewUser)

module.exports = router
