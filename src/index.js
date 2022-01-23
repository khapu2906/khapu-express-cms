const dotenv = require('dotenv')
const path = require('path')
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const configs = require('./core/config')
const app = express()
const view = require('./core/resource/view').handle(app, engine)
const route = require('./core/route').handle(app)
const provider = require('./../../../app/providers').register(app)

module.exports = {
    dotenv,
    express,
    morgan,
    bodyParser,
    methodOverride,
    app,
    configs,
    route,
    view,
    provider
}