
const db = require('../model');
const OrderItem = db.orderItem;

exports.findAll = async () => {
    try {
        const orderItems = await OrderItem.findAll({
            include: [
                { model: db.product, as: 'product' },
                { model: db.order, as: 'order' } 
            ]
        });
        return orderItems;
    } catch (e) {
        console.error(`Error in findAll: ${e.message}`);
        throw new Error('Error fetching order items');
    }
};

exports.findById = async (id) => {
    try {
        const orderItem = await OrderItem.findByPk(id);
        return orderItem;
    } catch (e) {
        console.error(`Error in findById: ${e.message}`);
        throw new Error(`Error fetching order item with ID ${id}`);
    }
};

exports.create = async (orderId, productId, quantity, valueItem) => {
    try {
        const orderItem = await OrderItem.create({
            orderId,
            productId,
            quantity,
            valueItem
        });
        return orderItem;
    } catch (e) {
        console.error(`Error in create: ${e.message}`);
        throw new Error('Error creating order item');
    }
};

exports.update = async (id, orderId, productId, quantity, valueItem) => {
    try {
        await OrderItem.update(
            { orderId, productId, quantity, valueItem },
            { where: { id } }
        );
        return { id, orderId, productId, quantity, valueItem };
    } catch (e) {
        console.error(`Error in update: ${e.message}`);
        throw new Error(`Error updating order item with ID ${id}`);
    }
};

exports.delete = async (id) => {
    try {
        await OrderItem.destroy({ where: { id } });
    } catch (e) {
        console.error(`Error in delete: ${e.message}`);
        throw new Error(`Error deleting order item with ID ${id}`);
    }
};
