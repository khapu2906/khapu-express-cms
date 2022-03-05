'use strict'
const Memcached = require('memcached')

class CacheMemcached {
    /**
     * @var {CacheMemcached} _instance
     */
    static #_instance = null

    host = ''

    port = ''
    
    auth = ''

    options = {}

    /**
     * The prefix of cache
     * 
     * @var {string} prefix
     */
    prefix = null

    memcached = null

    constructor(config, prefix) {
        this.prefix = prefix
        this.host = config.host
        this.port = config.port
        this.auth = config.auth
        this.options = config.options
    }

    static getInstance(config, prefix) {
        if (CacheMemcached.#_instance === null) {
            CacheMemcached.#_instance = new CacheMemcached(config, prefix)
        }
        return CacheMemcached.#_instance
    }

    async create() {
        this.memcached = (Object.keys(this.options).length == 0) ? await new Memcached(`${this.host}:${this.port}`) 
            : await new Memcached(`${this.host}:${this.port}`, this.options);
        return this.memcached
    }

}

module.exports = CacheMemcached.getInstance