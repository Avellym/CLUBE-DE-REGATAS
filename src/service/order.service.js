const db = require('../model');  // Importa o módulo db (que contém os modelos Sequelize)
const Order = db.order;  // Obtém o modelo 'order' do Sequelize

// Função para encontrar todos os pedidos com seus clientes associados
exports.findAll = async () => {
    try {
        const orders = await Order.findAll({
            include: { model: db.customer, as: 'customer' }  // Inclui o modelo 'customer' como relacionamento
        });
        return orders;  // Retorna todos os pedidos com os clientes associados
    } catch (e) {
        console.error(`Erro em findAll: ${e.message}`);
        throw new Error('Erro ao buscar pedidos');  // Lança um erro se ocorrer um problema
    }
};

// Função para encontrar um pedido por ID com seu cliente associado
exports.findById = async (id) => {
    try {
        const order = await Order.findByPk(id, {
            include: { model: db.customer, as: 'customer' }  // Inclui o modelo 'customer' como relacionamento
        });
        return order;  // Retorna o pedido encontrado pelo ID com o cliente associado
    } catch (e) {
        console.error(`Erro em findById: ${e.message}`);
        throw new Error(`Erro ao buscar pedido com ID ${id}`);  // Lança um erro se ocorrer um problema
    }
};

// Função para criar um novo pedido
exports.create = async (description, order_date, status, customerId, amount) => {
    try {
        const order = await Order.create({
            description,
            order_date,
            status,
            customerId,
            amount
        });
        return order;  // Retorna o pedido recém-criado
    } catch (e) {
        console.error(`Erro em create: ${e.message}`);
        throw new Error('Erro ao criar pedido');  // Lança um erro se ocorrer um problema na criação
    }
};

// Função para atualizar um pedido existente
exports.update = async (id, description, order_date, status, customerId, amount) => {
    try {
        await Order.update(
            { description, order_date, status, customerId, amount },  // Dados a serem atualizados
            { where: { id } }  // Condição para selecionar o pedido a ser atualizado
        );
        return { id, description, order_date, status, customerId, amount };  // Retorna os dados atualizados
    } catch (e) {
        console.error(`Erro em update: ${e.message}`);
        throw new Error(`Erro ao atualizar pedido com ID ${id}`);  // Lança um erro se ocorrer um problema na atualização
    }
};

// Função para deletar um pedido pelo ID
exports.delete = async (id) => {
    try {
        await Order.destroy({ where: { id } });  // Deleta o pedido com base no ID fornecido
    } catch (e) {
        console.error(`Erro em delete: ${e.message}`);
        throw new Error(`Erro ao deletar pedido com ID ${id}`);  // Lança um erro se ocorrer um problema na exclusão
    }
};
