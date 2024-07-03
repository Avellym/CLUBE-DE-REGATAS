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
db.permission = require('../model/permission.model')((db.sequelize))
db.product = require('../model/product.model')((sequelize))
db.customer = require('../model/customer.model')((sequelize))
db.order = require('../model/order.model')((db.sequelize))
db.orderItem = require('../model/orderItem.model')((db.sequelize))

db.permission.hasMany(db.users)
db.users.belongsTo(db.permission)

db.order.belongsToMany(db.product, { through: db.orderItem });
db.product.belongsToMany(db.order, { through: db.orderItem });

db.order.hasMany(db.orderItem);
db.orderItem.belongsTo(db.order);

db.product.hasMany(db.orderItem);
db.orderItem.belongsTo(db.product);

db.permission.sync()
db.users.sync()
db.product.sync()
db.customer.sync()
db.order.sync()
db.orderItem.sync()

module.exports = db