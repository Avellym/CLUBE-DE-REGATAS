const db = require('../model')
const Permission = db.permission

exports.findAll = async () => {
    try {
        const permissions = await Permission.findAll()
        return permissions
    } catch(e) {
        console.log(`Error FINDALL PERMISSIONS: ${e.message}`)
        throw Error('Erro ao consultar as permissões')
    }
}

exports.findById = async (id) => {
    try {
        const permission = await Permission.findByPk(id)
        return permission
    } catch(e) {
        console.log(`Error FIND PERMISSION BY ID: ${e.message}`)
        throw Error(`Erro ao consultar a permissão com ID ${id}`)
    }
}

exports.create = async (name) => {
    try {
        const permission = await Permission.create({ name })
        return permission
    } catch(e) {
        console.log(`Error CREATE PERMISSION: ${e.message}`)
        throw Error(`Erro ao criar a permissão com nome ${name}`)
    }
}

exports.update = async (id, name) => {
    try {
        await Permission.update(
            { name },
            { where: { id } }
        )
        return { id, name }
    } catch(e) {
        console.log(`Error UPDATE PERMISSION: ${e.message}`)
        throw Error(`Erro ao atualizar a permissão com ID ${id}`)
    }
}

exports.delete = async (id) => {
    try {
        await Permission.destroy({ where: { id } })
    } catch(e) {
        console.log(`Error DELETE PERMISSION: ${e.message}`)
        throw Error(`Erro ao deletar a permissão com ID ${id}`)
    }
}