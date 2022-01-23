const __PATH_VIEW = "/../../../../../../resource/views"
const path = require('path');

async function handle (app, handlebars) {
    // Template engine
    app.engine('hbs', handlebars({
        extname: '.hbs'
    }));
    app.set('view engine', 'handlebars');
    app.set('views', path.join(__dirname, __PATH_VIEW));
}

module.exports = { handle };