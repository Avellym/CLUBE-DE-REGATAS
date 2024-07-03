const reportService = require('../service/report.service');

exports.findOrdersByCustomer = async (req, res) => {
    const customerId = req.params.customerId;

    try {
        const orders = await reportService.findOrdersByCustomer(customerId);
        res.send(orders);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocorreu um erro ao recuperar os pedidos do cliente."
        });
    }
};

exports.findOpenOrders = async (req, res) => {
    try {
        const orders = await reportService.findOpenOrders();
        res.send(orders);
    } catch (error) {
        res.status(500).send({
            message: error.message || "Ocorreu um erro ao recuperar os pedidos em aberto."
        });
    }
};
