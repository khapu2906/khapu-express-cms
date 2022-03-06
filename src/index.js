'use strict'
const path = require('path')
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const sequelize = require('sequelize')
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const to = express.Router()

let provider = ''
let configs = {}
let route = null
let database = null
let db = null
let view = null
let Model = {}
let Cache = {}

try {
    provider = require('./../../../app/providers')
    provider.boot(app)

    configs = provider.register.configs ?? {}
    view = require('./core/resource/view').handle(app, engine, configs.view)
    route = require('./core/route').handle(app, configs.route)

    database = require('./core/database')

    db = database(sequelize, configs.database).dataValues
    Model = require('./core/model').init(db)

    Cache = require('./core/cache')(configs.cache)
} catch(e) {
    console.error(e)
}
app.use(morgan('combined'))

module.exports = {
    express,
    morgan,
    bodyParser,
    methodOverride,
    app,
    configs,
    route,
    view,
    provider,
    configs,
    db,
    Model,
    Cache,
    to
}