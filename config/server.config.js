const express = require('express')
const app = express()
const helmet = require('helmet')
const routes = require('./routes.config')
const PATH = '/' // http://localhost:3001/

app.use(helmet())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(PATH, routes) // http://localhost:3001/routes

module.exports = app;