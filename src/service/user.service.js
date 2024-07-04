const db = require('../model');  // Importa o módulo db (que contém os modelos Sequelize)
const User = db.users;  // Obtém o modelo 'users' do Sequelize
const Permission = db.permission;  // Obtém o modelo 'permission' do Sequelize

// Função para encontrar todos os usuários com suas permissões associadas
exports.findAll = async () => {
    try {
        const users = await User.findAll({
            include: [{
                model: Permission,
                as: 'permissions'  // Define o alias 'permissions' para o modelo de permissão
            }]
        });
        return users;  // Retorna todos os usuários com suas permissões associadas
    } catch (e) {
        console.error(`Error findAll Users: ${e.message}`);
        throw Error('Erro ao consultar os usuários');  // Lança um erro se ocorrer um problema na busca
    }
};

// Função para encontrar um usuário por ID com suas permissões associadas
exports.findById = async (id) => {
    try {
        const user = await User.findByPk(id, {
            include: [{
                model: Permission,
                as: 'permissions'  // Define o alias 'permissions' para o modelo de permissão
            }]
        });
        return user;  // Retorna o usuário encontrado pelo ID com suas permissões associadas
    } catch (e) {
        console.error(`Error findById User: ${e.message}`);
        throw Error(`Erro ao consultar o usuário com ID ${id}`);  // Lança um erro se ocorrer um problema na busca
    }
};

// Função para criar um novo usuário
exports.create = async (username, email, password, permissions) => {
    let transaction;
    try {
        transaction = await db.sequelize.transaction();  // Inicia uma transação Sequelize

        // Cria um novo usuário na transação
        const newUser = await User.create({
            username,
            email,
            password
        }, { transaction });

        // Associa permissões ao novo usuário, se houver
        if (permissions && permissions.length > 0) {
            await newUser.setPermissions(permissions, { transaction });
        }

        await transaction.commit();  // Confirma a transação
        return newUser;  // Retorna o novo usuário criado
    } catch (e) {
        if (transaction) await transaction.rollback();  // Desfaz a transação em caso de erro
        console.error(`Error createUser: ${e.message}`);
        throw Error(`Erro ao criar o usuário com username ${username}`);  // Lança um erro se ocorrer um problema na criação
    }
};

// Função para atualizar um usuário existente
exports.update = async (id, username, email, password, permissions) => {
    let transaction;
    try {
        transaction = await db.sequelize.transaction();  // Inicia uma transação Sequelize

        // Atualiza os dados do usuário na transação
        await User.update({
            username,
            email,
            password
        }, {
            where: { id },
            transaction
        });

        // Encontra o usuário atualizado
        const user = await User.findByPk(id);

        // Associa novas permissões ao usuário atualizado, se houver
        if (permissions && permissions.length > 0) {
            await user.setPermissions(permissions, { transaction });
        }

        await transaction.commit();  // Confirma a transação
        return { id, username, email };  // Retorna os dados atualizados do usuário
    } catch (e) {
        if (transaction) await transaction.rollback();  // Desfaz a transação em caso de erro
        console.error(`Error updateUser: ${e.message}`);
        throw Error(`Erro ao atualizar o usuário com ID ${id}`);  // Lança um erro se ocorrer um problema na atualização
    }
};

// Função para deletar um usuário pelo ID
exports.delete = async (id) => {
    try {
        await User.destroy({ where: { id } });  // Deleta o usuário com base no ID fornecido
    } catch (e) {
        console.error(`Error deleteUser: ${e.message}`);
        throw Error(`Erro ao deletar o usuário com ID ${id}`);  // Lança um erro se ocorrer um problema na exclusão
    }
};
