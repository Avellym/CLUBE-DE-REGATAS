const express = require('express')
const cors = require('cors')
const app = express()

const index = require('./router/index')
const userRouter = require('./router/user.router')

app.use(express.urlencoded({extends: true}))
app.use(express.json())
app.use(express.json({type: 'application/vnd.api+json'}))
app.use(cors())

app.use(index)
app.use('/api/', userRouter)

module.exports = app