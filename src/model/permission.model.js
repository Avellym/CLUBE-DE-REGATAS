const sequelize = require('sequelize')
const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    const Permission = sequelize.define('permission',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            notNull: true,
            
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
              model: 'users',
              key: 'id'
            }
        }
    },
    {
            timestamps: false
    })
    return Permission
}