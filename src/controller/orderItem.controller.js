const orderItemService = require('../service/orderItem.service');

exports.findAll = async (req, res) => {
    try {
        const orderItems = await orderItemService.findAll();
        return res.status(200).json({
            status: 200,
            data: orderItems,
            message: 'Order items list.',
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
};

exports.findById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const orderItem = await orderItemService.findById(id);
        return res.status(200).json({
            status: 200,
            data: orderItem,
            message: 'Order item found.',
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
};

exports.create = async (req, res) => {
    try {
        const { orderId, productId, quantity, valueItem } = req.body;
        const orderItem = await orderItemService.create(orderId, productId, quantity, valueItem);
        return res.status(201).json({
            message: 'Order item created successfully',
            body: {
                orderItem,
            },
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { orderId, productId, quantity, valueItem } = req.body;
        const orderItem = await orderItemService.update(id, orderId, productId, quantity, valueItem);
        return res.status(200).json({
            message: 'Order item updated successfully',
            body: {
                orderItem,
            },
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await orderItemService.delete(id);
        return res.status(200).json({
            status: 200,
            message: 'Order item deleted successfully.',
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
};
