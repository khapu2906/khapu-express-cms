'use strict'
const chalk = require('chalk')

class CORE
{

    static _instance = null;

    tableName = ''

    dataTypes = {}

    Op = false

    freezeTableName = true

    timestamps = false

    createdAt = false

    updatedAt = 'updatedAt'

    attributes = {

    }

    association = {}

    use = null

    static db = null

    constructor() {
        this.dataTypes = CORE.db.DataTypes
        this.Op = CORE.db.Op
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
            try {
                CORE.db.Sequelize.define(modelName, this.attributes, {
                    tableName: this.tableName,
                    freezeTableName: this.freezeTableName,
                    timestamps: this.timestamps,
                    createdAt: this.createdAt,
                    updatedAt: this.updatedAt
                });
                this.use = CORE.db.Sequelize.models[modelName]
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

const init = function (db) {
    CORE.db = db
    return CORE
}

module.exports = { init }