const __BASE_PATH_ROUTE = "./../../../../"

/**
 * 
 * @param {*} app 
 * @param {Object} config 
 */
async function handle (app, config) {
    const listRoute = config.elements;
    const pathRoute = __BASE_PATH_ROUTE + config.basePath;
    for(const [key, value] of Object.entries(listRoute)) {
        const r = await require(pathRoute + '/' + value.pathFile);
        r.go();
        app.use(value.prefix, r.to)
    }
}

module.exports = { handle };