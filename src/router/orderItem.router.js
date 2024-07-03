
const express = require('express');
const router = express.Router();
const orderItemController = require('../controller/orderItem.controller');

// Rotas para OrderItem
router.get('/orderItem', orderItemController.findAll);
router.get('/orderItem/:id', orderItemController.findById);
router.post('/orderItem', orderItemController.create);
router.put('/orderItem/:id', orderItemController.update);
router.delete('/orderItem/:id', orderItemController.delete);

module.exports = router;
