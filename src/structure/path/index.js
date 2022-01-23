const configJson = require('./index.json')
const fs = require('fs')
const pathCore = require('path');
const __PATH = './../../SampleContent/';


// list sample-content
const demo_controller_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'controllers/demo' ), 'utf8')
const config_index_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'configs/index' ), 'utf8')
const config_app_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'configs/app' ), 'utf8')
const config_cache_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'configs/cache' ), 'utf8')
const config_database_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'configs/database' ), 'utf8')
const route_index_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'routes/index'), 'utf8')
const route_web_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'routes/web'), 'utf8')
const route_api_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'routes/api'), 'utf8')
const view_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'views/demo' ), 'utf8')
const bootstrap_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'bootstrap' ), 'utf8')
const provider_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'provider' ), 'utf8')
const server_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'server' ), 'utf8')
const env_sample_file = fs.readFileSync(pathCore.join(__dirname, __PATH + 'env' ), 'utf8')


//dir-tree
const dirTree = {
    app: {
        http: {
            controllers: {
                "demo-file": {
                    name: "DemoController.js",
                    content: demo_controller_sample_file
                }    
            },
            middleware: {
                "auth-file": {
                    name: "AuthMiddleware.js",
                    content: ""
                }
            }
        },
        models: {
            "users-file": {
                name: "Users.js",
                content: ""
            }
        },
        providers: {
            "index-file": {
                name: "index.js",
                content: provider_sample_file
            }
        }
    },
    bootstrap: {
        "index-file": {
            name: "index.js",
            content: bootstrap_sample_file
        }
    },
    configs: {
        "app-file": {
            name: "app.js",
            content: config_app_sample_file
        },
        "database-file": {
            name: "database.js",
            content: config_database_sample_file
        },
        "cache-file": {
            name: "cache.js",
            content: config_cache_sample_file
        },
        "index-file": {
            name: "index.js",
            content: config_index_sample_file
        }
    },
    database: {
        migrations: {
            "index-file": {
                name: "index.js",
                content: ""
            }  
        },
        seeders: {
            "index-file": {
                name: "index.js",
                content: ""
            }  
        }
    },
    resource: {
        views: {
            layouts: {},
            "index-file": {
                name: "index.hbs",
                content: view_sample_file
            }    
        }
    },
    public: {
        storage: {}
    },
    routes: {
        "api-file": {
            name: "api.js",
            content: route_api_sample_file
        },
        "index-file": {
            name: "index.js",
            content: route_index_sample_file
        },
        "web-file": {
            name: "web.js",
            content: route_web_sample_file
        }
    },
    storage: {
        logs: {}
    },
    "server-file": {
        name: "server.js",
        content: server_sample_file
    },
    "env-file": {
        name: ".env",
        content: env_sample_file
    }
}

module.exports = dirTree