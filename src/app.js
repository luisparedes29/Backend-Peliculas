const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
require('dotenv')
const connectDB = require('../src/conexionDB')
const fs = require('fs')

connectDB()

//const indexRouter = require('./routes/index')
const usersRouter = require('./routes/users')
const moviesRouter = require('./routes/movies')
const { connect } = require('http2')

const app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/movies', moviesRouter)

module.exports = app
