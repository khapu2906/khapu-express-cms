const args = process.argv.slice(2)
const chalk = require('chalk')
const fs = require('fs')
const command = args[0] ?? null
const typeAndName = args[1] ?? null;
const path = require('path');
const APP_PATH = '../../../../../'
const CORE_PATH = '../../SampleContent/'
const tagAndPath = args[2] ?? null;

let subPath = null
let type = null

switch (command) {
    case 'prepare':
        require('./init')
        return
    default:
        if (command.includes('prepare:')) {
            type = command.split(':')[1]
            if (!type) {
                console.error(chalk.red('Command invalid!'))
                return
            }
        } else {
            console.error(chalk.red('Command invalid!'))
            return
        }
        break;
}

//tag path
if (tagAndPath) {
    if (tagAndPath.includes('--path=')) {
        const arrTagAndPath = tagAndPath.split('=')
        const tag = arrTagAndPath[0]
        switch (tag) {
            case '--path':
                break
            default:
                console.error(chalk.red('Tag invalid!'))
                return
        }
        subPath = arrTagAndPath[1] ?? null
    } else {
        console.error(chalk.red('Tag invalid!'))
        return
    }
}

// tag element and create element
if (typeAndName) {
    if (typeAndName.includes('--name=')) {
        const arr = typeAndName.split('=')
        const tag = arr[0]
        const name = arr[1]
        
        if (!name) {
            console.log(chalk.red('Name is required!'))
            return
        }
        switch(type) {
            // create model
            case 'model': 
                const modelPath = (!subPath) ? path.join(__dirname, APP_PATH, '/app/models/', `${name}.js`) : 
                    path.join(__dirname, APP_PATH, subPath, `${name}.js`)
                let contentModelSample = fs.readFileSync(path.join(__dirname, CORE_PATH + 'models/sample' ), 'utf-8')
                contentModelSample = contentModelSample.replace(/__NAME__/g, name)
                fs.writeFileSync(modelPath, contentModelSample, err => {
                    if (err) {
                        console.error(chalk.red(`Unsuccessfully create model: ${name}!`))
                        return
                    } 
                })
                console.log(chalk.green(`Successfully create model: ${name}!`))
                break
            // create controller
            case 'controller':
                const controllerPath = (!subPath) ? path.join(__dirname, APP_PATH, '/app/http/controllers', `${name}.js`) : 
                    path.join(__dirname, APP_PATH, subPath, `${name}.js`)
                let contentControllerSample = fs.readFileSync(path.join(__dirname, CORE_PATH + 'controllers/sample' ), 'utf-8')
                contentControllerSample = contentControllerSample.replace(/__NAME__/g, name)
                fs.writeFileSync(controllerPath, contentControllerSample, err => {
                    if (err) {
                        console.error(chalk.red(`Unsuccessfully create controller: ${name}!`))
                        return
                    } 
                })
                console.log(chalk.green(`Successfully create controller: ${name}!`))
                break
            default:
                console.error(chalk.red('Command invalid!'))
                return
        }
    } else {
        console.error(chalk.red('Tag invalid!'))
        return
    }
}
