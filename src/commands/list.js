#!/usr/bin/env node
const figlet = require('figlet')
const Table = require('cli-table')
const program = require('commander')
const terminalSize = require('term-size')

const teSi = terminalSize();
const singleColumn = Math.floor(teSi.columns / 12);
const table = new Table({
    head: ['COMMAND', 'TAG 1', 'TAG 2', 'DESCRIPTION'],
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    colWidths: [singleColumn * 1.5, singleColumn * 3.5, singleColumn * 2, singleColumn * 3.5],
    rows: [
        ['spy@go', 'null', 'null', 'Be used to start your app'],
        ['spy@prepare', 'null | --model=<name> | --controller=<name>', 'null | --path=<path>', 'Be used to generate a structure or a element'],
        ['spy@list-command', 'null', 'null', 'Be used to show list command of SPY84'],


    ]
})

console.log()
console.log(table.toString());