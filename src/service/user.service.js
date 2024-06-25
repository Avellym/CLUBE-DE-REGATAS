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

const updateUser = async (id, username, email, password) => {
    try {
      const updatedUser = await User.update(
        {
          username: username,
          email: email,
          password: password
        },
        {
          where: { id: id },
          returning: true // Retorna o objeto atualizado
        }
      );
  
      if (updatedUser[0] === 1) {
        const [affectedRows, [updatedUserData]] = updatedUser;
        return updatedUserData.toJSON(); // Retorna os dados do usuário atualizados em formato JSON
      } else {
        throw new Error(`Não foi possível encontrar o usuário com ID: ${id}`);
      }
    } catch (error) {
      console.error(`Erro ao atualizar usuário: ${error.message}`);
      throw new Error(`Erro ao alterar o usuário com ID: ${id}`);
    }
  };
  
  module.exports = {
    updateUser
  };

const deleteUser = async (id) => {
    try {
      const deletedUser = await User.destroy({
        where: { id: id }
      });
  
      if (deletedUser === 1) {
        return { message: 'Usuário deletado com sucesso' };
      } else {
        throw new Error(`Não foi possível encontrar o usuário com ID: ${id}`);
      }
    } catch (error) {
      console.error(`Erro ao deletar usuário: ${error.message}`);
      throw new Error(`Erro ao deletar o usuário com ID: ${id}`);
    }
  };
  
  module.exports = {
    deleteUser
  };