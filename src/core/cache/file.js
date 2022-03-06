'use strict'
const fs = require('fs')
const path = require('path')
const PATH_SYSTEM = './../../../../../'
const chalk = require('chalk')
const { exec } = require("child_process")
const crypto = require('crypto')

class CacheFile
{
    /**
     * @var {CacheFile} _instance
     */
    static #_instance = null

    /**
     * The path to save file cache
     * 
     * @var {string} path
     */
    path = null

    /**
     * The prefix of cache
     * 
     * @var {string} prefix
     */
    prefix = null
    
    /**
     * 
     * @var {string} extension
     */
    extension = '.bag'

    /**
     * @var {boolean} encode = false
     */
    encode = false

     /**
     * @var {string} keyCrypto
     */
    keyCrypto = 'spy84WillImprove'

    /**
     * @var {string} algorithm
     */
    algorithm = 'aes256'

    constructor(config, prefix) {
        this.path = path.join(__dirname, PATH_SYSTEM, config.path)
        this.encode = config.encode
        this.prefix = prefix
        this.clear()
    }

    static getInstance(config, prefix) {
        if (CacheFile.#_instance === null) {
            CacheFile.#_instance = new CacheFile(config, prefix)
        }
        return CacheFile.#_instance
    }

    /**
     * 
     * @param {object} content 
     * @returns 
     */
    #encode(content) {
        const cipher = crypto.createCipher(this.algorithm, this.keyCrypto)
        return cipher.update(content, 'utf8', 'hex') + cipher.final('hex')
    }

    /**
     * @param {string} content
     * @returns 
     */
    #decode(content) {
        const decipher = crypto.createDecipher(this.algorithm, this.keyCrypto);
        return decipher.update(content, 'hex', 'utf8') + decipher.final('utf8')
    }

    /**
     * @param {array} key
     * @returns 
     */
    get(...key) {
        try {
            const rs = []
            for(const k of key) {
                const fileName = this.#encode(`${this.prefix}-${k}`) + this.extension
                // Create cache file if it not exist 
                if (!fs.existsSync(path.join(this.path, `${fileName}`))) {
                    console.error(chalk.red(`The key`), k, chalk.red(`not exist!`))
                    return false
                }
                // Read file and encode
                let data = fs.readFileSync(path.join(this.path, `${fileName}`), 'utf8')
                data = (this.encode) ? this.#decode(data) : data
                data = JSON.parse(data) ?? {}
                rs.push(data.value)
            }
            
            return rs
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * @param {string} key
     * @param {*} value
     * @param {object} option
     * @returns 
     */
    put(key, value, option) {
        const timestamp = Date.now()
        const fileName = this.#encode(`${this.prefix}-${key}`) + this.extension
        try {
            let input = {
                updateAt: timestamp,
            }
            input.value = value
            // Create cache file if it not exist 
            if (!fs.existsSync(path.join(this.path, `${fileName}`))) {
                input.createAt = timestamp
                const inputCrypto = (this.encode) ? this.#encode(JSON.stringify(input)) : JSON.stringify(input);
                return fs.writeFileSync(path.join(this.path, `${fileName}`), inputCrypto)
            } else {
                // Update file 
                let data = fs.readFileSync(path.join(this.path, `${fileName}`), 'utf8')
                data = (this.encode) ? this.#decode(data) : data
                data = JSON.parse(data)
                data.value = value
                data.updateAt = timestamp
                data = JSON.stringify(data)
                data = (this.encode) ? this.#encode(data) : data
                return fs.writeFileSync(path.join(this.path, `${fileName}`), data)
            }
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * @param {array} key
     * @returns 
     */
    delete(...key) {
        try {
            for(const k of key) {
                const fileName = this.#encode(`${this.prefix}-${k}`) + this.extension
                // Create cache file if it not exist 
                if (!fs.existsSync(path.join(this.path, `${fileName}`))) {
                    console.error(chalk.red(`The key ${k} not exist!`))
                } else {
                    fs.unlinkSync(path.join(this.path, `${fileName}`))
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    /**
     * Clear full data
     */
    async clear() {
        await exec(`rm -rf ${this.path}/`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
        })
        return await fs.mkdirSync(this.path)
    }

}

module.exports = CacheFile.getInstance
