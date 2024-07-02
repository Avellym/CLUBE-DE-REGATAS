const Order = require('../models/Order');
const OrderItem = require('../models/OrderItem');

module.exports = {
  async getOrdersByCustomer(customerId) {
    try {
      const orders = await Order.find({ customer: customerId });
      return orders;
    } catch (error) {
      throw new Error(`Erro ao buscar pedidos do cliente ${customerId}: ${error.message}`);
    }
  },

  async getOpenOrders() {
    try {
      const openOrders = await Order.find({ status: 'open' });
      return openOrders;
    } catch (error) {
      throw new Error(`Erro ao buscar pedidos em aberto: ${error.message}`);
    }
  },

  async getOrderDetails(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error(`Pedido com ID ${orderId} não encontrado.`);
      }
      const orderItems = await OrderItem.find({ order: orderId });
      return { order, orderItems };
    } catch (error) {
      throw new Error(`Erro ao buscar detalhes do pedido ${orderId}: ${error.message}`);
    }
  }
};
