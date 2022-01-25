'use strict'
const path = require('path')
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express()
const provider = require('./../../../app/providers');

provider.register(app)
const configs = provider.boot.configs;

const view = require('./core/resource/view').handle(app, engine, configs.view)
const route = require('./core/route').handle(app, configs.route)
const database = require('./core/database').handle(Sequelize, configs.database)

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
    database
}