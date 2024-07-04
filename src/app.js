const express = require('express')
const cors = require('cors')
const app = express()

const index = require('./router/index')
const userRouter = require('./router/user.router')
const permissionRouter = require('./router/permission.router')
const productRouter = require('./router/product.router')
const customerRouter = require('./router/customer.router')
const orderRouter = require('./router/order.router')
const orderItem = require('./router/orderItem.router')
const reportRouter = require('./router/report.router');


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.json({ type: 'application/vnd.api+json' }))
app.use(cors())

app.use(index)
app.use('/api/', userRouter)
app.use('/api/', permissionRouter)
app.use('/api/', productRouter)
app.use('/api/', customerRouter)
app.use('/api/', orderRouter)
app.use('/api/', orderItem)
app.use('/api/', reportRouter);


module.exports = app
