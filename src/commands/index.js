#!/usr/bin/env node
const args = process.argv.slice(2)
const action = args[0] ?? null
const chalk = require('chalk')

switch (action) {
    case 'go':
        require('./go')
        break
    case 'help':
        require('./help')
        break
    case 'clear:cache':
        require('./cache')
        break
    default:
        if (action && action.includes('prepare')) {
            require('./init')
        } else {
            console.log(chalk.red('Command not exist!'))
        }
        break
}

