const { DataTypes } = require('sequelize');
const { sequelize } = require('sequelize');

module.exports = (sequelize) => {
    const Customer = sequelize.define('Customer', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, // Garante que o campo email seja um email válido
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isNumeric: true, // Garante que o campo phone seja numérico
            },
        },
    }, {
        timestamps: false, // Desativa timestamps padrões (createdAt e updatedAt)
        tableName: 'Customers' // Define o nome da tabela no banco de dados
    });

    return Customer;
};
