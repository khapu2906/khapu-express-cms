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
const to = express.Router();

const provider = require('./../../../app/providers');
provider.boot(app)  

const configs = provider.register.configs;
const view = require('./core/resource/view').handle(app, engine, configs.view)
const route = require('./core/route').handle(app, configs.route)

const database = require('./core/database')

database.handle(sequelize, configs.database)

const db = database.dataValues;
const Model = require('./core/model').init(db)

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
    to
}