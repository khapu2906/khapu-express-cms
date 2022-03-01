#!/usr/bin/env node
const args = process.argv.slice(2)
const action = args[0] ?? null
const chalk = require('chalk')


switch (action) {
    case 'go':
        require('./go')
        break;
    case 'help':
        require('./help')
        break;
    default:
        if (action.includes('prepare')) {
            require('./init/index')
        } else {
            console.log(chalk.red('Command not exist!'))
        }
        return
}

