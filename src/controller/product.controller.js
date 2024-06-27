const productService = require('../service/product.service');

exports.findAll = async (req, res) => {
    try {
        const products = await productService.findAll();
        return res.status(200).json({
            status: 200,
            data: products,
            message: 'Lista de produtos.',
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
        const product = await productService.findById(id);
        return res.status(200).json({
            status: 200,
            data: product,
            message: 'Produto encontrado.',
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
        const { name, description, unitValue } = req.body;
        const product = await productService.create(name, description, unitValue);
        return res.status(201).json({
            message: 'Produto cadastrado com sucesso',
            body: {
                product,
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
        const { name, description, unitValue } = req.body;
        const product = await productService.update(id, name, description, unitValue);
        return res.status(200).json({
            message: 'Produto atualizado com sucesso',
            body: {
                product,
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
        await productService.delete(id);
        return res.status(200).json({
            status: 200,
            message: 'Produto deletado com sucesso.',
        });
    } catch (e) {
        return res.status(400).json({
            status: 400,
            message: e.message,
        });
    }
};
