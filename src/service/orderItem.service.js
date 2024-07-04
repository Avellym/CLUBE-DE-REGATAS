const db = require('../model');  // Importa o módulo db (que contém os modelos Sequelize)
const OrderItem = db.orderItem;  // Obtém o modelo 'orderItem' do Sequelize

// Função para encontrar todos os itens de pedido com informações de produto e pedido associados
exports.findAll = async () => {
    try {
        const orderItems = await OrderItem.findAll({
            include: [
                { model: db.product, as: 'product' },  // Inclui o modelo 'product' como relacionamento
                { model: db.order, as: 'order' }  // Inclui o modelo 'order' como relacionamento
            ]
        });
        return orderItems;  // Retorna todos os itens de pedido com produtos e pedidos associados
    } catch (e) {
        console.error(`Error in findAll: ${e.message}`);
        throw new Error('Error fetching order items');  // Lança um erro se ocorrer um problema na busca
    }
};

// Função para encontrar um item de pedido por ID
exports.findById = async (id) => {
    try {
        const orderItem = await OrderItem.findByPk(id);  // Encontra o item de pedido pelo ID
        return orderItem;  // Retorna o item de pedido encontrado
    } catch (e) {
        console.error(`Error in findById: ${e.message}`);
        throw new Error(`Error fetching order item with ID ${id}`);  // Lança um erro se ocorrer um problema na busca
    }
};

// Função para criar um novo item de pedido
exports.create = async (orderId, productId, quantity, valueItem) => {
    try {
        const orderItem = await OrderItem.create({
            orderId,
            productId,
            quantity,
            valueItem
        });
        return orderItem;  // Retorna o novo item de pedido criado
    } catch (e) {
        console.error(`Error in create: ${e.message}`);
        throw new Error('Error creating order item');  // Lança um erro se ocorrer um problema na criação
    }
};

// Função para atualizar um item de pedido existente
exports.update = async (id, orderId, productId, quantity, valueItem) => {
    try {
        await OrderItem.update(
            { orderId, productId, quantity, valueItem },  // Dados a serem atualizados
            { where: { id } }  // Condição para selecionar o item de pedido a ser atualizado
        );
        return { id, orderId, productId, quantity, valueItem };  // Retorna os dados atualizados do item de pedido
    } catch (e) {
        console.error(`Error in update: ${e.message}`);
        throw new Error(`Error updating order item with ID ${id}`);  // Lança um erro se ocorrer um problema na atualização
    }
};

// Função para deletar um item de pedido pelo ID
exports.delete = async (id) => {
    try {
        await OrderItem.destroy({ where: { id } });  // Deleta o item de pedido com base no ID fornecido
    } catch (e) {
        console.error(`Error in delete: ${e.message}`);
        throw new Error(`Error deleting order item with ID ${id}`);  // Lança um erro se ocorrer um problema na exclusão
    }
};
