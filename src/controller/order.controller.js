const orderService = require('../service/order.service');

exports.findAll = async (req, res) => {
    try {
        const orders = await orderService.findAll();
        return res.status(200).json({
            status: 200,
            data: orders,
            message: 'Lista de pedidos.',
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
        const order = await orderService.findById(id);
        return res.status(200).json({
            status: 200,
            data: order,
            message: 'Pedido encontrado.',
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
        const { description, order_date, status, customerId, amount } = req.body;
        const order = await orderService.create(description, order_date, status, customerId, amount);
        return res.status(201).json({
            message: 'Pedido cadastrado com sucesso',
            body: {
                order,
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
        const { description, order_date, status, customerId, amount } = req.body;
        const order = await orderService.update(id, description, order_date, status, customerId, amount);
        return res.status(200).json({
            message: 'Pedido atualizado com sucesso',
            body: {
                order,
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
        await orderService.delete(id);
        return res.status(200).json({
            status: 200,
            message: 'Pedido deletado com sucesso.',
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
};
