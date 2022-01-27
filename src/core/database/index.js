'use strict'
class DB 
{
    dataValues = {};

    static _instance = null;

    constructor() {
    
    }

    static getInstance() {
        if (DB._instance === null) {
            DB._instance = new DB;
        }
        return DB._instance;
    }

    handle(sequelize, config) {
        this.dataValues = {
            sequelize,
            Model: sequelize.Model,
            Op: sequelize.Op,
            DataTypes: sequelize.DataTypes
        }
        if(config && typeof config === 'object' && Object.keys(config).length > 0) {
            for(const [key, value] of Object.entries(config)) {
                if (value.use) {
                    try {
                        this.dataValues.Sequelize = new sequelize.Sequelize(value.database, value.username, value.password, {
                            host: value.host,
                            port: value.port,
                            dialect: key
                        });
                        this.dataValues.Sequelize.authenticate();
                        console.log('Connection has been established successfully.');
                    } catch (error) {
                        console.error('Unable to connect to the database:', error);
                    }
                    break;
                }
            }
        }
    }
}

module.exports = DB.getInstance();
