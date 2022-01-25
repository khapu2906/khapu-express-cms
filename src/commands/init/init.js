const fs = require('fs');
const pathCore = require('path');
const __PATH = './../../../../../';

console.log(__dirname);
const structure = require('./../../structure/path');

console.log(`\x1b[5m\x1b[33m******************************************************************************************************\x1b[0m`);
console.log(`*\x1b[5m\                                       LET'S PREPARE FOR THE MISSION                                \x1b[0m*`);
console.log(`\x1b[5m\x1b[33m******************************************************************************************************\x1b[0m`);
console.log('')
console.log('                                                   ,.,.,.,')
console.log("                                                  ( 3 _ 3 )");    
console.log("                                                  ( _ Y _ )");  

const command = {
    init: async (list, parent = '') => {
        for(const[key, value] of Object.entries(list)) {
            if (key.includes('file')) {
                const path = parent + '/' + value.name;
                const file = await fs.writeFile(pathCore.join(__dirname, __PATH + path), value.content, err => {
                    if (err) {
                        console.error(err)
                        return
                    } else {
                        console.log('** ', value.name, 'was equipped!',' **');
                    }
                })
            } else {
                const path = parent + '/' + key;
                const folder = await fs.mkdir(pathCore.join(__dirname, __PATH + path), (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    if (value) {
                        command.init(value, path);
                    }
                    console.log('** ', key, 'was equipped!',' **');
                })
            }
        }
    }
}

command.init(structure)
