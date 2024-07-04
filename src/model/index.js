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
db.users = require('../model/user.model')((sequelize))
db.permission = require('../model/permission.model')((sequelize))
db.product = require('../model/product.model')((sequelize))
db.customer = require('../model/customer.model')((sequelize))
db.order = require('../model/order.model')((sequelize))
db.orderItem = require('../model/orderItem.model')((sequelize))

// Relação um para muitos entre User e Permission
db.users.hasMany(db.permission, { as: 'permissions', foreignKey: 'userId' });
db.permission.belongsTo(db.users, { as: 'user', foreignKey: 'userId' });

// Relação entre Customer e Order (Um para Muitos)
db.customer.hasMany(db.order, { as: 'order', foreignKey: 'customerId' });
db.order.belongsTo(db.customer, { as: 'customer', foreignKey: 'customerId' });

// Relação entre Order e OrderItem (Um para Muitos)
db.order.hasMany(db.orderItem, { as: 'orderItems', foreignKey: 'orderId' });
db.orderItem.belongsTo(db.order, { as: 'order', foreignKey: 'orderId' });

// Relação entre Product e OrderItem (Um para Muitos)
db.product.hasMany(db.orderItem, { as: 'orderItems', foreignKey: 'productId' });
db.orderItem.belongsTo(db.product, { as: 'product', foreignKey: 'productId' });

sequelize.sync({ force: false }) // Set force to true to drop tables before syncing
  .then(() => {
    console.log('Modelos sincronizados com o banco de dados.');
  })
  .catch(err => {
    console.error('Erro ao sincronizar modelos com o banco de dados:', err);
  });

db.permission.sync()
db.users.sync()
db.product.sync()
db.customer.sync()
db.order.sync()
db.orderItem.sync()



module.exports = db