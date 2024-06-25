const router = require('express-promise-router')()
const permissionController = require('../controller/permission.controller')

router.get('/permissions', permissionController.findAll)
router.get('/permissions/:id', permissionController.findById)
router.post('/permissions', permissionController.create)
router.put('/permissions/:id', permissionController.update)
router.delete('/permissions/:id', permissionController.delete)

module.exports = router
