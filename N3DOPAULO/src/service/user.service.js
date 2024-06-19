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