const express = require('express')
const app = express()
const endpoint = require('../routes/routes')

const GLOBAL_PATH = '/api/v1/extremeco'

app.use(GLOBAL_PATH, endpoint)

module.exports = app