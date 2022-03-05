'use strict'
const chalk = require('chalk')
class DB 
{
    dataValues = {};

    static #_instance = null;

    static getInstance(sequelize, config) {
        if (DB.#_instance === null) {
            DB.#_instance = new DB(sequelize, config);
        }
        return DB.#_instance;
    }

    constructor(sequelize, config) {
        this.#handle(sequelize, config)
    }
    /**
     * 
     * @param {*} sequelize 
     * @param {Object} config 
     */
    #handle(sequelize, config) {
        try {
            this.dataValues = {
                sequelize,
                Model: sequelize.Model,
                Op: sequelize.Op,
                DataTypes: sequelize.DataTypes
            }
            if(config && typeof config === 'object' && Object.keys(config).length > 0) {
                try {
                    for(const [key, value] of Object.entries(config)) {
                        if (value.enable) {
                            if (value.host === 'xxx' || value.port === 'xxx' || value.username === 'xxx' || value.database === 'xxx') {
                                return
                            }
                            if (value.password === 'xxx') {
                                value.password = ''
                            } 
                            try {
                                /**
                                 * @link (https://sequelize.org/master/manual/getting-started.html)
                                 */
                                this.dataValues.Sequelize = new sequelize.Sequelize(value.database, value.username, value.password, {
                                    host: value.host,
                                    port: value.port,
                                    dialect: key
                                });
                                this.dataValues.Sequelize.authenticate();
                                console.log(chalk.green('Connection has been established successfully.'));
                            } catch (error) {
                                console.error(chalk.red('Unable to connect to the database:'), error);
                            }
                            break;
                        }
                    }
                } catch (error) {
                    console.error(chalk.red('Database config error'))
                }
            }
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = DB.getInstance;
