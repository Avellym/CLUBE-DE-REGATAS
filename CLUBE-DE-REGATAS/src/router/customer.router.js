const router = require('express-promise-router')();
const customerController = require('../controller/customer.controller');

router.post('/customer', customerController.create);

module.exports = router;
