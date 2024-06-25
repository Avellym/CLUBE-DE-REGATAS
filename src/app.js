const express = require('express')
const cors = require('cors')
const app = express()

const index = require('./router/index')
const userRouter = require('./router/user.router')
const permissionRouter = require('./router/permission.router')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.json({ type: 'application/vnd.api+json' }))
app.use(cors())

app.use(index)
app.use('/api/', userRouter)
app.use('/api/', permissionRouter)

module.exports = app
