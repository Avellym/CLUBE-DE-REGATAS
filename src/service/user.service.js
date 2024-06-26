const db = require('../model')
const User = db.users

exports.findAll = async () => {
    try {

        const users = await User.findAll({
            attributes:['id','username','email']
        })
        return users

    } catch(e){
        console.log('error findAll: ${e.message');
        throw Error('erro ao consultar os usuarios')

    }
}

exports.findById = async(id) => {
    try{
        const user = User.findByPk(id, {
            attributes: ['id','username','email']
        })
        return user
    
    }  catch(e){
         console.log('error findById: ${e.message}');
         throw Error ('ta errado : ${id}')

    }
    
}

exports.create = async (username, email, password) => {
    try {
       const user = await User.create({
        username: username,
        email: email,
        password: password
       })
       return user 
    } catch(e) {
        console.log(`Error CRETE USER: ${e.message}`);
        throw Error(`Erro ao criar o usuário com username ${username}`)
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