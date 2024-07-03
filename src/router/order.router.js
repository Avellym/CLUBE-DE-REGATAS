
const router = require('express-promise-router')();
const orderController = require('../controller/order.controller');


router.get('/order', orderController.findAll);
router.get('/order/:id', orderController.findById);
router.post('/order', orderController.create);
router.put('/order/:id', orderController.update);
router.delete('/order/:id', orderController.delete);

module.exports = router;
