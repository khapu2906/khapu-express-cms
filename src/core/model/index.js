'use strict'
const chalk = require('chalk')

class CORE
{

    static _instance = null;

    /**
     * @var {string} tableName
     */
    tableName = ''

    /**
     * @var {Object} dataTypes
     */
    dataTypes = {}

    /**
     * @var {boolean} freezeTableName
     */
    freezeTableName = true

    /**
     * @var {boolean} timestamps
     */
    timestamps = false

    /**
     * @var {boolean} createdAt
     */
    createdAt = false

    /**
     * @var {string} updatedAt
     */
    updatedAt = 'updatedAt'

    /**
     * @var {object} attributes
     */
    attributes = {}

    /**
     * @var {object} association
     */
    association = {}

    /**
     * 
     * @var {Sequelize.model} use
     */
    use = null

    /**
     * @static {Sequelize.db} db
     */
    static db = null

    constructor() {
        this.dataTypes = CORE.db.DataTypes
    }

    static getInstance() {
        if (this._instance === null) {
            this._instance = new this
            this._instance.up()
        }
        return this._instance.use
    }

    up() {
        const modelName = this.constructor.name

        if (modelName !== 'CORE') {
            /**
             * @link (https://sequelize.org/master/manual/model-basics.html)
             */
            try {
                CORE.db.Sequelize.define(modelName, this.attributes, {
                    tableName: this.tableName,
                    freezeTableName: this.freezeTableName,
                    timestamps: this.timestamps,
                    createdAt: this.createdAt,
                    updatedAt: this.updatedAt
                });
                this.use = CORE.db.Sequelize.models[modelName]
                this.use.Op = CORE.db.Op
                try {
                    for(const value of Object.values(this.association)) {
                        value()
                    }
                } catch (error) {
                    console.error(error)
                }
            } catch (error) {
                console.error(chalk.red('Database config error !!!'));
            }
        }
    }
}


/**
 * 
 * @param {*} db 
 * @returns {CORE}
 */
const init = function (db) {
    CORE.db = db
    return CORE
}

module.exports = { init }