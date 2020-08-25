#!/usr/bin/env node
// 交互式命令行
const inquirer = require('inquirer')
// 修改控制台字符串的样式
const chalk = require('chalk')
// node 内置文件模块
const fs = require('fs')
// 读取根目录下的 template.json
const tplObj = require(`${__dirname}/../template`)

/*
    inquirer为每个问题提供很多参数：
    type：表示提问的类型，包括：input, confirm, list, rawlist, expand, checkbox, password, editor；
    name: 存储当前问题回答的变量；
    message：问题的描述；
    default：默认值；
    choices：列表选项，在某些type下可用，并且包含一个分隔符(separator)；
    validate：对用户的回答进行校验；
    filter：对用户的回答进行过滤处理，返回处理后的值；
    transformer：对用户回答的显示效果进行处理(如：修改回答的字体或背景颜色)，但不会影响最终的答案的内容；
    when：根据前面问题的回答，判断当前问题是否需要被回答；
    pageSize：修改某些type类型下的渲染行数；
    prefix：修改message默认前缀；
    suffix：修改message默认后缀
*/

let questions = [
    {
        name: 'name',
        type: 'input',
        message: 'Please inpute template name',
        validate(val) {
            if (val === '') {
                return 'Name is required'
            } else if (tplObj[val]) {
                return 'Template has already existed!'
            } else {
                return true
            }
        }
    },
    {
        name: 'url',
        type: 'input',
        message: 'Please input template url',
        validate(val) {
            if (val === '') {
                return 'The url is required'
            }
            return true
        }
    }
]

inquirer.prompt(questions).then(answers => {
    let { name, url } = answers
    tplObj[name] = url.replace(/[\u0000-\u0019]/g, '')
    fs.writeFile(`${__dirname}/../template.json`, JSON.stringify(tplObj), 'utf-8', err => {
        if (err) {
            console.log(err)
        }
        console.log('\n')
        console.log(chalk.green('Added successfully!\n'))
        console.log(chalk.grey('The latest template list is:\n'))
        console.log(tplObj)
        console.log('\n')
    })
})