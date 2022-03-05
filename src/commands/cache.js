'use strict'
const provider = require('./../../../../app/providers');
const path = require('path');
const configs = provider.register.configs;
const { exec } = require("child_process")
const fs = require('fs')

const PATH = path.join(__dirname, './../../../../', configs.cache.storages.file.path)

new Promise((resolve, reject) => {
    const a = exec(`rm -rf ${PATH}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        } else {
            fs.mkdirSync(PATH)
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    })
})