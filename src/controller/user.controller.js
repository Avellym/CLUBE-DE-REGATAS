const userService = require('../service/user.service')

exports.findAll = async (request, response) => {
    try {
        const users = await userService.findAll()
        return response
            .status(200)
            .json({
                status: 200,
                data: users,
                message: "Listando usuários."
            })

    } catch(e) {
        response
            .send(400)
            .json({
                status: 400,
                message: e    
            })
    }
}

exports.findById = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const user = await userService.findById(id)
        response
            .status(200)
            .json({
                status: 200,
                data: user,
                message: "Usuário encontrado."
            })
    } catch(e) {
        response
            .send(400)
            .json({
                status: 400,
                message: e
            })
    }
}

exports.create = async (request, response) => {
    try {
        const { username, email, password } = request.body
        const user = await userService.create(username, email, password)
        response    
            .status(201)
            .send({
                message: 'Usuário cadastrado com sucesso',
                body: {
                    user: user
                }
            })
    } catch(e) {
        response
            .send(400)
            .json({
                status: 400,
                message: e
            })
    }
}

exports.update = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const { username, email, password } = request.body
        const user = await userService.update(id, username, email, password)
        response    
            .status(200)
            .send({
                message: 'Usuário cadastrado com sucesso',
                body: {
                    user: user
                }
            })
    } catch(e) {
        response
            .send(400)
            .json({
                status: 400,
                message: e
            })
    }
}

exports.delete = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        await userService.delete(id)
        response
            .status(200)
            .json({
                status: 200,
                message: "Usuário deletado."
            })
    } catch(e) {
        response
            .send(400)
            .json({
                status: 400,
                message: e
            })
    }
}
