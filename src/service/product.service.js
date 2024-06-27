const db = require('../model');
const Product = db.product;

exports.findAll = async () => {
    try {
        const products = await Product.findAll({
            attributes: ['id', 'name', 'description', 'unitValue'],
        });
        return products;
    } catch (e) {
        console.error(`Erro em findAll: ${e.message}`);
        throw new Error('Erro ao buscar produtos');
    }
};

exports.findById = async (id) => {
    try {
        const product = await Product.findByPk(id, {
            attributes: ['id', 'name', 'description', 'unitValue'],
        });
        return product;
    } catch (e) {
        console.error(`Erro em findById: ${e.message}`);
        throw new Error(`Erro ao buscar produto com ID ${id}`);
    }
};

exports.create = async (name, description, unitValue) => {
    try {
        const product = await Product.create({
            name,
            description,
            unitValue,
        });
        return product;
    } catch (e) {
        console.error(`Erro em create: ${e.message}`);
        throw new Error('Erro ao criar produto');
    }
};

exports.update = async (id, name, description, unitValue) => {
    try {
        await Product.update(
            { name, description, unitValue },
            { where: { id } }
        );
        return { id, name, description, unitValue };
    } catch (e) {
        console.error(`Erro em update: ${e.message}`);
        throw new Error(`Erro ao atualizar produto com ID ${id}`);
    }
};

exports.delete = async (id) => {
    try {
        await Product.destroy({ where: { id } });
    } catch (e) {
        console.error(`Erro em delete: ${e.message}`);
        throw new Error(`Erro ao deletar produto com ID ${id}`);
    }
};
