'use strict'

class CORE
{
    tableName = ''

    dataTypes 

    Op = false

    freezeTableName = true

    timestamps = false

    createdAt = false

    updatedAt = 'updatedAt'

    attributes = {

    }

    use = null

    db = null

    constructor(db) {
        this.dataTypes = db.DataTypes
        this.Op = db.Op
        this.db = db;
    }

    up() {
        const modelName = this.constructor.name;
        if (modelName !== 'CORE') {
            this.db.Sequelize.define(modelName, this.attributes, {
                tableName: this.tableName,
                freezeTableName: this.freezeTableName,
                timestamps: this.timestamps,
                createdAt: this.createdAt,
                updatedAt: this.updatedAt
            });
            this.use = this.db.Sequelize.models[modelName]
        }
    }

}

module.exports = CORE