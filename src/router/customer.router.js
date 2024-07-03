const router = require('express-promise-router')();
const customerController = require('../controller/customer.controller');

router.post('/customer', customerController.create);
router.get('/customer', customerController.findAll);
router.get('/customer/:id', customerController.findById);
router.put('/customer/:id', customerController.update);
router.delete('/customer/:id', customerController.delete);

module.exports = router;
