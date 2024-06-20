const userService = require('../service/user.service')

exports.findAll = async (request,response) => {
    try {

        const users =  await userService.findAll()
        return response
        .status(200)
        .json({
            status: 200,
            data: users,
            message: "listando usuarios"

        })
        
    } catch (e) {

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
        response.status(200)
        .json({
            status: 200,
            data: user,
            message: "usuario encntrado"
        })
        
    } catch (e) {
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
        const {username, password, email} = request.body
    const user = await userService.create(username, email, password)
    response 
       .status(201)
       .send({
        message: 'usuario cadastrado',
        body: {
            user: user
        }
       })
        
    } catch (e) {
        
    }
    
}

exports.update = async (id, username, email, password) => {
    try {
       const user = await User.update(
            {
                username: username,
                email: email,
                password: password
            },
            { where: { id: id }}
        )
       return {username: username, email: email} 
    } catch(e) {
        console.log(`Error UPDATE USER: ${e.message}`);
        throw Error(`Erro ao alterar o usuário com username ${username}`)
    }
}

exports.delete = async (id) => {
    try {
        await User.destroy({ where: { id: id }})

    } catch(e) {
        console.log(`Error DELETE USER: ${e.message}`);
        throw Error(`Erro deletar o usuário com ID: ${id}`)
    }
}