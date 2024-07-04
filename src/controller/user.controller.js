const userService = require('../service/user.service')

exports.findAll = async (req, res) => {
    try {
        const users = await userService.findAll();
        res.status(200).json({
            status: 200,
            data: users,
            message: "Listando usuários com permissões."
        });
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

exports.findById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const user = await userService.findById(id);
        res.status(200).json({
            status: 200,
            data: user,
            message: "Usuário encontrado com permissões."
        });
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

exports.create = async (req, res) => {
    try {
        const { username, email, password, permissions } = req.body;
        const user = await userService.create(username, email, password, permissions);
        res.status(201).json({
            status: 201,
            data: user,
            message: "Usuário criado com permissões."
        });
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

exports.update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { username, email, password, permissions } = req.body;
        const user = await userService.update(id, username, email, password, permissions);
        res.status(200).json({
            status: 200,
            data: user,
            message: "Usuário atualizado com permissões."
        });
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};

exports.delete = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        await userService.delete(id);
        res.status(200).json({
            status: 200,
            message: "Usuário deletado."
        });
    } catch (e) {
        res.status(400).json({
            status: 400,
            message: e.message
        });
    }
};
