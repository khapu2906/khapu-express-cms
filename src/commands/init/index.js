#!/usr/bin/env node

const args = process.argv.slice(2)
const chalk = require('chalk')
const fs = require('fs')
const typeAndName = args[0] ?? null;
const path = require('path');
const APP_PATH = '../../../../../'
const CORE_PATH = '../../SampleContent/'
const tagAndPath = args[1] ?? null;

let subPath = null;

if (!typeAndName) {
    require('./init')
    return
}

//tag path
if (tagAndPath) {
    if (tagAndPath.includes('=')) {
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

//tag element and create element
if (typeAndName) {
    if (typeAndName.includes('=')) {
        const arr = typeAndName.split('=')
        const type = arr[0]
        const name = arr[1]
        if (!name) {
            console.log('Name is require')
            return
        }
        switch(type) {
            case '--model': 
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
            case '--controller':
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
                console.error(chalk.red('Tag invalid!'))
                return
        }
    } else {
        console.error(chalk.red('Tag invalid!'))
        return
    }
}
