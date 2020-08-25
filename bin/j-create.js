#!/usr/bin/env node
const inquirer = require('inquirer');
const commander = require('commander');
const chalk = require('chalk');
const ora = require('ora')
const fs = require('fs');
const path = require('path');

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
    message: 'please select template:',
    choices: [
        'basicTemplate',
    ]
}]

inquirer.prompt(questions).then(async answer => {
    let spinner = ora()
    let templatePath = path.resolve(__dirname, '..', `./project/${answer.templateName}`)
    let targetPath = path.join(path.resolve('./'), `/${projectName}`)
    let isDelete = false;

    if (!fs.existsSync(templatePath)) {
        spinner.fail(chalk.red('\n Generation failed \n'))
        console.log(chalk.red(`the template is not exists,please check path '${templatePath}' is correct`));
        return;
    }

    try {
        if (fs.existsSync(targetPath)) {
            isDelete = await inquirer.prompt([{
                type:'confirm',
                message:`the folder '${projectName}' already exsits,did you want to remove it and create a new folder ?`,
                name:'isDelete'
            }])
            if(isDelete){
                await deleteFolder(targetPath)
                console.log(chalk.white(`warn:the folder '${projectName}' already exsits,now already remove old folder,and create a new folder`));
            }else{
                return;
            }
        }
        spinner.start(chalk.white('\n Start generating... \n'))
        fs.mkdirSync(targetPath)
        await copyFolder(templatePath, path.resolve(targetPath))
    } catch (error) {
        spinner.fail(chalk.red('\n Generation failed \n'))
        console.log(chalk.red(`error message:${error}`));
        return;
    }

    spinner.succeed(chalk.green(`\n Generation success`))
    console.log('\n To get started')
    console.log(`\n    cd ${projectName} \n`)
})

function deleteFolder(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(file => {
            let curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolder(curPath);
            } else {
                try {
                    fs.unlinkSync(curPath);
                } catch (error) {
                    console.log(chalk.red(`error:delete file fail`));
                    console.log(chalk.red(`error:${error}`));
                }
            }
        });
        fs.rmdirSync(path);
    }
}

function copyFolder(src, dst) {
    let paths = fs.readdirSync(src)
    paths.forEach(p => {
        let _src = src + '/' + p;
        let _dst = dst + '/' + p;
        let readable;
        let writable;

        if (fs.statSync(_src).isFile()) {
            readable = fs.createReadStream(_src);//创建读取流
            writable = fs.createWriteStream(_dst);//创建写入流
            readable.pipe(writable);
        } else if (fs.statSync(_src).isDirectory()) {
            fs.mkdirSync(_dst)
            copyFolder(_src, _dst)
        }
    })
}