const fs = require('fs')
const chalk = require('chalk')

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
    paths.forEach((p) => {
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

module.exports = {
    deleteFolder,
    copyFolder
}