const db = require('../model');
const Order = db.order;

const findOrdersByCustomer = async (customerId) => {
    try {
        const orders = await Order.findAll({ where: { customer: customerId } });
        return orders;
    } catch (error) {
        throw error;
    }
};

const findOpenOrders = async () => {
    try {
        const orders = await Order.findAll({ where: { status: 'open' } });
        return orders;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findOrdersByCustomer,
    findOpenOrders
};
