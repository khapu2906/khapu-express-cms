const __BASE_PATH_VIEW = "./../../../../../"
const path = require('path')

/**
 * 
 * @param {*} app 
 * @param {*} handlebars 
 * @param {object} config 
 */
async function handle (app, handlebars, config) {
    // Template engine
    app.engine('.uniform', handlebars({
        extname: '.uniform'
    }));
    app.set('view engine', '.uniform');
    app.set('views', path.join(__dirname, __BASE_PATH_VIEW + config.basePath));
}

module.exports = { handle };