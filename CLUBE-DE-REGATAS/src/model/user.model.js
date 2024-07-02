const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const User = sequelize.define('users',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            notNull: true,
            is: /^[a-zA-Z0-9\.]{4, 32}%/,
            unique: true
            
        },
        email: {
            type: DataTypes.STRING,
            notNull: true,
            unique: true,

        },
        password: {
            type:DataTypes.STRING,
            notNull: true
        },
        


    },
    {
            timestamps: false
    })
    return User
}