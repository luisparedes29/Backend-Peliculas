const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv')
const connectDB = require('../src/conexionDB')
const fs = require('fs');


connectDB();

//const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const { connect } = require('http2')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

//app.use('/', indexRouter)
app.use('/users', usersRouter)

module.exports = app
