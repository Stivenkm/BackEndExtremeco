const express = require('express')
const app = express()
const helmet = require('helmet')
const routes = require('./routes.config')
//global.sha256 = require('sha256')
const PATH = '/' 

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.use(PATH, routes) 

module.exports = app;