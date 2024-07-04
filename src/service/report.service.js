const db = require('../model');
const Order = db.order;

exports.findOrdersByCustomer = async (customerId) => {
    try {
        const orders = await Order.findAll({
            where: { customerId },
            include: [
                {
                    model: db.customer,
                    as: 'customer',
                    attributes: ['fullname', 'email']
                },
                {
                    model: db.orderItem,
                    as: 'orderItems',
                    include: [
                        {
                            model: db.product,
                            as: 'product',
                            attributes: ['name', 'description', 'unitValue']
                        }
                    ]
                }
            ]
        });
        return orders;
    } catch (error) {
        throw new Error('Erro ao buscar pedidos do cliente: ' + error.message);
    }
};

exports.findOrdersByStatus = async (status) => {
    try {
        const orders = await Order.findAll({
            where: { status }, 
            include: [
                {
                    model: db.customer,
                    as: 'customer',
                    attributes: ['fullname', 'email']
                },
                {
                    model: db.orderItem,
                    as: 'orderItems',
                    include: [
                        {
                            model: db.product,
                            as: 'product',
                            attributes: ['name', 'description', 'unitValue']
                        }
                    ]
                }
            ]
        });
        return orders;
    } catch (error) {
        throw new Error('Erro ao buscar pedidos em aberto: ' + error.message);
    }
};
