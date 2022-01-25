'use strict'
const fs = require('fs');
const path = require('path');
let db = {};


async function handle(Sequelize, config) {
    db = {
        Sequelize
    }
    if(config && typeof config === 'object' && Object.keys(config).length > 0) {
        for(const [key, value] of Object.entries(config)) {
            if (value.use) {
                try {
                    db[key] = new Sequelize(value.database, value.username, value.password, {
                        host: value.host,
                        port: value.port,
                        dialect: key
                    });
                    await db[key].authenticate();
                    console.log('Connection has been established successfully.');
                } catch (error) {
                    console.error('Unable to connect to the database:', error);
                }
            }
        }
    }
}


module.exports = { handle, db};
