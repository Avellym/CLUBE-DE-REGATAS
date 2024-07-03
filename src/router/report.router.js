const router = require('express-promise-router')();
const reportController = require('../controller/report.controller');


router.get('/reports/customer/:customerId', reportController.findOrdersByCustomer);


router.get('/reports/open', reportController.findOpenOrders);

module.exports = router;
