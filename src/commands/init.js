const fs = require('fs');
const pathCore = require('path');
const __PATH = './../../../../';

console.log(__dirname);
const structure = require('../structure/path');

const command = {
    init: async (list, parent = '') => {
        for(const[key, value] of Object.entries(list)) {
            if (key.includes('file')) {
                const path = parent + '/' + value.name;
                fs.writeFile(pathCore.join(__dirname, __PATH + path), value.content, err => {
                    if (err) {
                        console.error(err)
                        return
                    }
                })
            } else {
                const path = parent + '/' + key;
                fs.mkdir(pathCore.join(__dirname, __PATH + path), (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully!');
                })
                if (value) {
                    command.init(value, path);
                }
            }
        }
    }
}

command.init(structure)