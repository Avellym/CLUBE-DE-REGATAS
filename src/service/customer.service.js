const db = require('../model');
const Customer = db.customer;

exports.createCustomer = async (fullname, email, phone) => {
    try {
        const customer = await Customer.create({ fullname, email, phone });
        return customer;
    } catch (error) {
        throw new Error('Erro ao criar o cliente: ' + error.message);
    }
};

exports.findAllCustomers = async () => {
    try {
        const customers = await Customer.findAll();
        return customers;
    } catch (error) {
        throw new Error('Erro ao buscar os clientes: ' + error.message);
    }
};

exports.findCustomerById = async (id) => {
    try {
        const customer = await Customer.findByPk(id);
        return customer;
    } catch (error) {
        throw new Error(`Erro ao buscar o cliente com o ID ${id}: ` + error.message);
    }
};

exports.updateCustomer = async (id, fullname, email, phone) => {
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            throw new Error(`Cliente com o ID ${id} não encontrado.`);
        }
        await customer.update({ fullname, email, phone });
        return customer;
    } catch (error) {
        throw new Error(`Erro ao atualizar o cliente com o ID ${id}: ` + error.message);
    }
};

exports.deleteCustomer = async (id) => {
    try {
        const customer = await Customer.findByPk(id);
        if (!customer) {
            throw new Error(`Cliente com o ID ${id} não encontrado.`);
        }
        await customer.destroy();
    } catch (error) {
        throw new Error(`Erro ao deletar o cliente com o ID ${id}: ` + error.message);
    }
};
