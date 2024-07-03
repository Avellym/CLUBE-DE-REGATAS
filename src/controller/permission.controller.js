const permissionService = require('../service/permission.service')

exports.findAll = async (request, response) => {
    try {
        const permissions = await permissionService.findAll()
        return response.status(200).json({
            status: 200,
            data: permissions,
            message: "Listando permissões."
        })
    } catch(e) {
        response.status(400).json({
            status: 400,
            message: e.message
        })
    }
}

exports.findById = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const permission = await permissionService.findById(id)
        response.status(200).json({
            status: 200,
            data: permission,
            message: "Permissão encontrada."
        })
    } catch(e) {
        response.status(400).json({
            status: 400,
            message: e.message
        })
    }
}

exports.create = async (request, response) => {
    try {
        const { name } = request.body
        const permission = await permissionService.create(name)
        response.status(201).send({
            message: 'Permissão criada com sucesso',
            body: { permission }
        })
    } catch(e) {
        response.status(400).json({
            status: 400,
            message: e.message
        })
    }
}

exports.update = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        const { name } = request.body
        const permission = await permissionService.update(id, name)
        response.status(200).send({
            message: 'Permissão atualizada com sucesso',
            body: { permission }
        })
    } catch(e) {
        response.status(400).json({
            status: 400,
            message: e.message
        })
    }
}

exports.delete = async (request, response) => {
    try {
        const id = parseInt(request.params.id)
        await permissionService.delete(id)
        response.status(200).json({
            status: 200,
            message: "Permissão deletada."
        })
    } catch(e) {
        response.status(400).json({
            status: 400,
            message: e.message
        })
    }
}