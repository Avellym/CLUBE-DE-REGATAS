const dbConfig = require('../config/db.config')

const {Sequelize} = require('sequelize')
const sequelize =   new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
         host: dbConfig.HOST,
         port: dbConfig.PORT,
         dialect: dbConfig.DIALECT,
         pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle,
         }

    }
)

const db = {}

db.sequelize = sequelize
db.users = require('../model/user.model')((db.sequelize))
db.users.sync()

module.exports = db