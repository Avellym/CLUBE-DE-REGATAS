const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');

router.get('/orders/customer/:customerId', reportController.getOrdersByCustomer);

router.get('/orders/open', reportController.getOpenOrders);

router.get('/orders/:orderId', reportController.getOrderDetails);

module.exports = router;
