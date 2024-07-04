const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const User = sequelize.define('users',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    });


    return User;
};
