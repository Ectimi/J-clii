#!/usr/bin/env node
const inquirer = require('inquirer');
const commander = require('commander');
const chalk = require('chalk');
const ora = require('ora')
const fs = require('fs');
const path = require('path');
const shell = require('shelljs');
const source = require('../config/webpackSource')

let { copyFolder } = require('../utils/utils')
let spinner = ora()

commander.usage('<project-name>');
commander.parse(process.argv);

if (commander.args.length < 1) {
    return commander.help()
}

let projectName = commander.args[0]
let reg = /^[-_a-zA-Z0-9]+$/

if (!reg.test(projectName)) {
    console.log(chalk.red('\n Project name cannot contain Chinese and special symbols '));
    return;
}

let questions = [{
    name: 'templateName',
    type: 'rawlist',
    message: 'please select a template:',
    choices: [
        'basicTemplate',
        'vueTemplate'
    ]
}]

inquirer.prompt(questions).then(async answer => {
    let templatePath = path.resolve(__dirname, '..', `./project/${answer.templateName}`)
    let targetPath = path.join(path.resolve('./'), `/${projectName}`)
    let isDelete = false;

    if (!fs.existsSync(templatePath)) {
        spinner.fail(chalk.red('\n Generation failed \n'))
        console.log(chalk.red(`the template is not exists,please check path '${templatePath}' is correct`));
        return;
    }

    try {
        //如果项目名称已经存在，则提示是否删除已存在的，再创建,如果选择否，则退出
        if (fs.existsSync(targetPath)) {
            isDelete = await inquirer.prompt([{
                type: 'confirm',
                message: `the folder '${projectName}' already exsits,did you want to remove it and create a new folder ?`,
                name: 'isDelete'
            }])
            if (isDelete) {
                shell.rm('-rf', targetPath)
                console.log(chalk.white(`warn:the folder '${projectName}' already exsits,now already remove old folder,and create a new folder`));
            } else {
                return;
            }
        }

        spinner.start(chalk.white('\n Start generating... \n'))

        fs.mkdirSync(targetPath)
        await copyFolder(templatePath, targetPath)
        if (answer.templateName === 'vueTemplate') {
            generateVueTemplate(targetPath)
        }
    } catch (error) {
        spinner.fail(chalk.red('\n Generation failed \n'))
        console.log(chalk.red(`error message:\n ${error}`));
        return;
    }
})

function generateVueTemplate(targetPath) {
    let sources = []
    for (let key in source) {
        sources = [...sources, ...source[key]]
    }

    shell.cd(targetPath)
    shell.exec('npm init -y')

    try {
        sources.map(s => {
            shell.exec(s.command)
        })

        let configData, packageData, newPackageData;

        fs.readFile(path.resolve(targetPath, './config.json'), (err, data) => {
            if (err) {
                throw new Error(err)
            } else {
                configData = JSON.parse(data)
                fs.readFile(path.resolve(targetPath, './package.json'), (err, data) => {
                    if (err) {
                        throw new Error(err)
                    } else {
                        packageData = JSON.parse(data)
                        newPackageData = Object.assign(
                            {},
                            packageData,
                            //选择所需合并的属性，构造合并的对象
                            {
                                "scripts": configData.scripts,
                                "slideEffects": configData.slideEffects
                            }
                        )
                        fs.writeFile(path.resolve(targetPath, './package.json'), JSON.stringify(newPackageData, null, "\t"), (err) => {
                            if (err) {
                                throw new Error(err)
                            } else { //写入成功
                                shell.rm('-rf', path.resolve(targetPath, './config.json'))

                                spinner.succeed(chalk.green(`\n Generation success`))
                                console.log('\n To get started')
                                console.log(`\n    cd ${projectName}   `)
                                console.log(`\n      npm run dev     \n`)
                            }
                        })
                    }
                })
            }
        })
    } catch (error) {
        throw new Error(error)
    }
}