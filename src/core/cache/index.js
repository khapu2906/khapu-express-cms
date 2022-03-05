'use strict'
const memcached = require('./memcached')
const redis = require('./redis')
const file = require('./file')

class Cache
{
    static #_instance = null

    prefix = null

    default = null

    storages = {}

    static getInstance(cacheConfig) {
        if (Cache.#_instance === null) {
            Cache.#_instance = new Cache(cacheConfig)
        }
        return Cache.#_instance
    }

    constructor(cacheConfig) {
        this.#handle(cacheConfig)
    }

    async #handle(cacheConfig) {
        try {
            this.default = cacheConfig.default.driver
            this.prefix = cacheConfig.prefix
            for(const [key, value] of Object.entries(cacheConfig.storages)) {
                if (value.enable) {
                    switch (key) {
                        case 'file': 
                            this.storages[key] = file(value, this.prefix)
                            break
                        case 'memcached':
                            const memcachedCache = memcached(value, this.prefix)
                            this.storages[key] = memcachedCache
                            break
                        case 'redis':
                            const redisCache = redis(value, this.prefix)
                            this.storages[key] = redisCache.create()
                            break
                        default:
                            break    
                    }
                }
            }
        } catch (err) {
            console.error(err)
        }
    }

    get(...key) {
        return this.storages[this.default].get(...key)
    }

    put(key, value, option) {
        return  this.storages[this.default].put(key, value, option)
    }

    delete(...key) {
        return this.storages[this.default].delete(...key)
    }

    clear() {
        return this.storages[this.default].clear()
    }

    use(key) {
        return this.storages[key]
    }
}

module.exports = Cache.getInstance;