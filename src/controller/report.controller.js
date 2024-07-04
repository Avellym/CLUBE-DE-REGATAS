const reportService = require('../service/report.service');

exports.findOrdersByCustomer = async (req, res) => {
    const { customerId } = req.params;

    try {
        const orders = await reportService.findOrdersByCustomer(customerId);
        if (orders.length === 0) {
            return res.status(404).json({
                message: `Nenhum pedido encontrado para o cliente com o ID ${customerId}.`
            });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Ocorreu um erro ao recuperar os pedidos do cliente."
        });
    }
};

exports.findOrdersByStatus = async (req, res) => {
    const status = req.query.status;

    if (!['Em aberto', 'Entregue', 'Cancelado'].includes(status)) {
        return res.status(400).json({
            message: "Status inválido. Os status válidos são: 'Em aberto', 'Entregue', 'Cancelado'."
        });
    }

    try {
        const orders = await reportService.findOrdersByStatus(status);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({
            message: error.message || "Ocorreu um erro ao recuperar os pedidos pelo status."
        });
    }
};
