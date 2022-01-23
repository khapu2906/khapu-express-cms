const __PATH_VIEW = "/../../../../../../resource/views"
const path = require('path');

async function handle (app, handlebars) {
    // Template engine
    app.engine('.uniform', handlebars({
        extname: '.uniform'
    }));
    app.set('view engine', '.uniform');
    app.set('views', path.join(__dirname, __PATH_VIEW));
}

module.exports = { handle };