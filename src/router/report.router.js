// ROTA DE RELATÓRIOS

const express = require('express');
const router = express.Router();
const reportController = require('../controller/report.controller');

router.get('/reports/customer/:customerId/orders', reportController.findOrdersByCustomer); //Chama o controlador para buscar pedidos de um cliente especifico
router.get('/ordersByStatus', reportController.findOrdersByStatus); // Chama o controlador para buscar pedidos em aberto

module.exports = router;
