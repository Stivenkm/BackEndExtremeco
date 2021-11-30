const express = require('express')
const app = express()
const endpoint = require('../routes/routes')

const GLOBAL_PATH = '/api/extremeco'

app.use(GLOBAL_PATH, endpoint)

module.exports = app