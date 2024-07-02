const reportService = require('../services/reportService');

module.exports = {
  async getOrdersByCustomer(req, res) {
    const { customerId } = req.params;
    try {
      const orders = await reportService.getOrdersByCustomer(customerId);
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar pedidos do cliente ${customerId}: ${error.message}` });
    }
  },

  async getOpenOrders(req, res) {
    try {
      const openOrders = await reportService.getOpenOrders();
      res.json(openOrders);
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar pedidos em aberto: ${error.message}` });
    }
  },

  async getOrderDetails(req, res) {
    const { orderId } = req.params;
    try {
      const orderDetails = await reportService.getOrderDetails(orderId);
      if (!orderDetails) {
        return res.status(404).json({ message: `Pedido com ID ${orderId} não encontrado.` });
      }
      res.json(orderDetails);
    } catch (error) {
      res.status(500).json({ error: `Erro ao buscar detalhes do pedido ${orderId}: ${error.message}` });
    }
  }
};
