// require('dotenv').load()
const path = require('path');
const { response } = require('express')
const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const app = express();
const view = require('./core/resource/view/index').handle(app, engine);
const route = require('./core/route/index').handle(app);

module.exports = {
    express,
    morgan,
    bodyParser,
    methodOverride,
    app,
    route,
    view
}