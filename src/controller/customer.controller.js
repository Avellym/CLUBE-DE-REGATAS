const customerService = require('../service/customer.service');

exports.create = async (req, res) => {
    const { fullname, email, phone } = req.body;

    try {
        const customer = await customerService.createCustomer(fullname, email, phone);
        res.status(201).json({
            message: 'Cliente cadastrado com sucesso',
            body: { customer }
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error.message || 'Ocorreu um erro ao cadastrar o cliente.'
        });
    }
};

exports.findAll = async (req, res) => {
    try {
        const customers = await customerService.findAllCustomers();
        res.status(200).json(customers);
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || 'Ocorreu um erro ao buscar os clientes.'
        });
    }
};

exports.findById = async (req, res) => {
    const { id } = req.params;

    try {
        const customer = await customerService.findCustomerById(id);
        if (!customer) {
            res.status(404).json({
                status: 404,
                message: `Cliente com o ID ${id} não encontrado.`
            });
        } else {
            res.status(200).json(customer);
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || 'Ocorreu um erro ao buscar o cliente.'
        });
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { fullname, email, phone } = req.body;

    try {
        const updatedCustomer = await customerService.updateCustomer(id, fullname, email, phone);
        res.status(200).json({
            message: 'Cliente atualizado com sucesso',
            body: { updatedCustomer }
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || `Erro ao atualizar o cliente com o ID ${id}.`
        });
    }
};

exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        await customerService.deleteCustomer(id);
        res.status(200).json({
            message: `Cliente com o ID ${id} deletado com sucesso.`
        });
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message || `Erro ao deletar o cliente com o ID ${id}.`
        });
    }
};
