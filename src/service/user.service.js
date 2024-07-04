const db = require('../model');
const User = db.users;
const Permission = db.permission;

exports.findAll = async () => {
    try {
        const users = await User.findAll({
            include: [{
                model: Permission,
                as: 'permissions'
            }]
        });
        return users;
    } catch (e) {
        console.error(`Error findAll Users: ${e.message}`);
        throw Error('Erro ao consultar os usuários');
    }
};

exports.findById = async (id) => {
    try {
        const user = await User.findByPk(id, {
            include: [{
                model: Permission,
                as: 'permissions'
            }]
        });
        return user;
    } catch (e) {
        console.error(`Error findById User: ${e.message}`);
        throw Error(`Erro ao consultar o usuário com ID ${id}`);
    }
};

exports.create = async (username, email, password, permissions) => {
    let transaction;
    try {
        transaction = await db.sequelize.transaction();

        const newUser = await User.create({
            username,
            email,
            password
        }, { transaction });

        if (permissions && permissions.length > 0) {
            await newUser.setPermissions(permissions, { transaction });
        }

        await transaction.commit();
        return newUser;
    } catch (e) {
        if (transaction) await transaction.rollback();
        console.error(`Error createUser: ${e.message}`);
        throw Error(`Erro ao criar o usuário com username ${username}`);
    }
};

exports.update = async (id, username, email, password, permissions) => {
    let transaction;
    try {
        transaction = await db.sequelize.transaction();

        await User.update({
            username,
            email,
            password
        }, {
            where: { id },
            transaction
        });

        const user = await User.findByPk(id);

        if (permissions && permissions.length > 0) {
            await user.setPermissions(permissions, { transaction });
        }

        await transaction.commit();
        return { id, username, email };
    } catch (e) {
        if (transaction) await transaction.rollback();
        console.error(`Error updateUser: ${e.message}`);
        throw Error(`Erro ao atualizar o usuário com ID ${id}`);
    }
};

exports.delete = async (id) => {
    try {
        await User.destroy({ where: { id } });
    } catch (e) {
        console.error(`Error deleteUser: ${e.message}`);
        throw Error(`Erro ao deletar o usuário com ID ${id}`);
    }
};
