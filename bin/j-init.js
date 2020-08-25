#!/usr/bin/env node
const commander = require('commander')
const chalk = require('chalk')
const ora = require('ora')
const download = require('download-git-repo')
const tplObj = require(`${__dirname}/../template`)

commander.usage('<template-name> [project-name]')
commander.parse(process.argv)

if(commander.args.length<1){
    return commander.help()
}

let templateName = commander.args[0]
let projectName = commander.args[1]

if(!tplObj[templateName]){
    console.log(chalk.red('\n Template does not exit! \n'))
    return
}

if(!projectName){
    console.log(chalk.red('\n Project should not be empty'))
    return
}

let url = tplObj[templateName]

console.log(chalk.white('\n Start generating... \n'))

const spinner = ora('Downloading...')
spinner.start()

download(url,projectName,err=>{
    if(err){
        spinner.fail();
        console.log(chalk.red(`Generation failed. ${err}`))
        return
    }

    spinner.succeed()
    console.log(chalk.green('\n Generation completed!'))
    console.log('\n To get started')
    console.log(`\n    cd ${projectName} \n`)
})