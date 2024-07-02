const router = require('express-promise-router')()
const userController = require('../controller/user.controller')

router.get('/user', userController.findAll)
router.get('/user/:id', userController.findById)
router.post('/user', userController.create)
router.put('/user/:id', userController.update)
router.delete('/user/:id', userController.delete)

module.exports = router 
