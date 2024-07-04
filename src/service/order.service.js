const db = require('../model');
const Order = db.order;

exports.findAll = async () => {
    try {
        const orders = await Order.findAll({
            include: { model: db.customer, as: 'customer' }
        });
        return orders;
    } catch (e) {
        console.error(`Erro em findAll: ${e.message}`);
        throw new Error('Erro ao buscar pedidos');
    }
};

exports.findById = async (id) => {
    try {
        const order = await Order.findByPk(id, {
            include: { model: db.customer, as: 'customer' }
        });
        return order;
    } catch (e) {
        console.error(`Erro em findById: ${e.message}`);
        throw new Error(`Erro ao buscar pedido com ID ${id}`);
    }
};

exports.create = async (description, order_date, status, customerId, amount) => {
    try {
        const order = await Order.create({
            description,
            order_date,
            status,
            customerId,
            amount
        });
        return order;
    } catch (e) {
        console.error(`Erro em create: ${e.message}`);
        throw new Error('Erro ao criar pedido');
    }
};

exports.update = async (id, description, order_date, status, customerId, amount) => {
    try {
        await Order.update(
            { description, order_date, status, customerId, amount },
            { where: { id } }
        );
        return { id, description, order_date, status, customerId, amount };
    } catch (e) {
        console.error(`Erro em update: ${e.message}`);
        throw new Error(`Erro ao atualizar pedido com ID ${id}`);
    }
};

exports.delete = async (id) => {
    try {
        await Order.destroy({ where: { id } });
    } catch (e) {
        console.error(`Erro em delete: ${e.message}`);
        throw new Error(`Erro ao deletar pedido com ID ${id}`);
    }
};
