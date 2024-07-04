//SERVIÇO DE RELATÓRIOS - interaje com o banco de dados e possibilita realizar consultas

const db = require('../model');  // Importa o módulo db (que contém os modelos Sequelize)
const Order = db.order;  // Obtém o modelo 'order' do Sequelize

// Função para encontrar pedidos de um cliente específico
exports.findOrdersByCustomer = async (customerId) => {
    try {
        const orders = await Order.findAll({
            where: { customerId },  // Filtra os pedidos pelo customerId fornecido
            include: [
                {
                    model: db.customer,  // Inclui o modelo 'customer' como relacionamento
                    as: 'customer',  // Define o alias 'customer' para o modelo de cliente
                    attributes: ['fullname', 'email']  // Seleciona apenas os atributos fullname e email do cliente
                },
                {
                    model: db.orderItem,  // Inclui o modelo 'orderItem' como relacionamento
                    as: 'orderItems',  // Define o alias 'orderItems' para o modelo de itens de pedido
                    include: [
                        {
                            model: db.product,  // Inclui o modelo 'product' como relacionamento
                            as: 'product',  // Define o alias 'product' para o modelo de produto
                            attributes: ['name', 'description', 'unitValue']  // Seleciona apenas os atributos name, description e unitValue do produto
                        }
                    ]
                }
            ]
        });
        return orders;  // Retorna os pedidos encontrados, incluindo clientes e itens de pedido associados
    } catch (error) {
        throw new Error('Erro ao buscar pedidos do cliente: ' + error.message);  // Lança um erro se ocorrer um problema na busca
    }
};

// Função para encontrar pedidos por status
exports.findOrdersByStatus = async (status) => {
    try {
        const orders = await Order.findAll({
            where: { status },  // Filtra os pedidos pelo status fornecido
            include: [
                {
                    model: db.customer,  // Inclui o modelo 'customer' como relacionamento
                    as: 'customer',  // Define o alias 'customer' para o modelo de cliente
                    attributes: ['fullname', 'email']  // Seleciona apenas os atributos fullname e email do cliente
                },
                {
                    model: db.orderItem,  // Inclui o modelo 'orderItem' como relacionamento
                    as: 'orderItems',  // Define o alias 'orderItems' para o modelo de itens de pedido
                    include: [
                        {
                            model: db.product,  // Inclui o modelo 'product' como relacionamento
                            as: 'product',  // Define o alias 'product' para o modelo de produto
                            attributes: ['name', 'description', 'unitValue']  // Seleciona apenas os atributos name, description e unitValue do produto
                        }
                    ]
                }
            ]
        });
        return orders;  // Retorna os pedidos encontrados, incluindo clientes e itens de pedido associados
    } catch (error) {
        throw new Error('Erro ao buscar pedidos em aberto: ' + error.message);  // Lança um erro se ocorrer um problema na busca
    }
};
