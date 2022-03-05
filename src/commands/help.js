const Table = require('cli-table')
const terminalSize = require('term-size')

const teSi = terminalSize();
const singleColumn = Math.floor(teSi.columns / 12);

const table = new Table({
    head: ['COMMAND', 'TAG', 'DESCRIPTION'],
    chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
         , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
         , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
         , 'right': '║' , 'right-mid': '╢' , 'middle': '│' },
    colWidths: [singleColumn * 2, singleColumn * 2.5, singleColumn * 4],
    rows: [
        ['spy go', '', 'Be used to start your app'],
        ['spy prepare', '', 'Be used to generate a structure'],
        ['spy prepare:model', '--name=<required>, --path=<path>', 'Be used to generate a model'],
        ['spy prepare:controller', '--name=<required>, --path=<path>', 'Be used to generate a controller'],
        ['spy clear:cache', '', 'Be used to remove full cache'],
        ['spy help', '', 'Be used to show list command of SPY84']
    ]
})

console.log()
console.log(table.toString());