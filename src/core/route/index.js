const __PATH_ROUTE = "./../../../../../routes"
const listRoute = require(__PATH_ROUTE)

async function handle (app) {
    for(const [key, value] of Object.entries(listRoute)) {
        const r = require(__PATH_ROUTE + '/' + value.pathFile);
        r.go();
        app.use(value.slug, r.to)
    }
}

module.exports = { handle };