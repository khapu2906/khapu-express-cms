'use strict'
const redis = require('redis')

class CacheRedis {
    /**
     * @var {CacheRedis} _instance
     */
    static #_instance = null

    /**
     * @var {string} host
     */
    host = ''

    /**
     * @var {string} port
     */
    port = ''
    
    /**
     * @var {string} auth
     */
    auth = ''

    /**
     * @var {string} db
     */
    db = ''

    /**
     * The prefix of cache
     * 
     * @var {string} prefix
     */
    prefix = null

    client = null

    constructor(config, prefix) {
        this.prefix = prefix
        this.host = config.host
        this.port = config.port
        this.auth = config.auth
        this.db = config.db
    }

    static getInstance(config, prefix) {
        if (CacheRedis.#_instance === null) {
            CacheRedis.#_instance = new CacheRedis(config, prefix)
        }
        return CacheRedis.#_instance
    }

    async create() {
        const url = (this.auth == '') ? `redis://${this.host}:${this.port}` : `redis://${this.auth}@${this.host}:${this.port}/${this.db}`
        this.client = await redis.createClient({
            url
        })
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        await this.client.connect()
        return await this.client
    }

}

module.exports = CacheRedis.getInstance