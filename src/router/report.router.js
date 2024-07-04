const express = require('express');
const router = express.Router();
const reportController = require('../controller/report.controller');

router.get('/reports/customer/:customerId/orders', reportController.findOrdersByCustomer);
router.get('/ordersByStatus', reportController.findOrdersByStatus);

module.exports = router;
