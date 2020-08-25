export const source = {
    lib: [{
        name: 'webpack-merge',
        command: 'npm install --save-dev webpack-merge'
    },{
        name:'cross-env',
        command:'npm i -D cross-env'
    } ,{
        name: 'vue',
        command: 'npm i -S vue vue-router vuex'
    }
    ],
    plugin: [
        {
            //生成一个HTML文件，然后将打包好的js文件自动引入到这个html文件中。
            name: 'html-webpack-plugin',
            command: 'npm i -D html-webpack-plugin'
        }, {
            //帮你删除某个目录的文件,是在打包前删除所有上一次打包好的文件
            name: 'clean-webpack-plugin',
            command: 'npm i -D clear-webpack-plugin'
        }, {
            //把css样式从js文件中提取到单独的css文件中
            name: 'mini-css-extract-plugin',
            command: 'npm i -D mini-css-extract-plugin'
        },{
            name:'copy-webpack-plugin',
            command:'npm install --save-dev copy-webpack-plugin'
        },{
            name:'optimize-css-assets-webpack-plugin',
            command:'npm install --save-dev optimize-css-assets-webpack-plugin'
        },{
            name:'uglifyjs-webpack-plugin',
            command:'npm i -D uglifyjs-webpack-plugin'
        },{
            name:'babelrc',
            command:'npm install --save-dev @babel/plugin-syntax-dynamic-import'
        },{
            name:'happypack',
            command:'npm i -D happypack'
        },{
            name:'webpack-bundle-analyzer',
            command:'npm i -D webpack-bundle-analyzer'
        }
    ],
    loader: [
        {
            name: 'css-loader',
            command: 'npm i -D css-loader style-loader'
        }, {
            name: 'less-loader',
            command: 'npm i -D less less-loader'
        }, {
            name: 'scss-loader',
            command: 'npm i sass-loader node-sass --save-dev'
        }, {
            //为css加上厂商前缀
            name: 'postcss-loader',
            command: 'npm i -D postcss-loader autoprefixer'
        }, {
            //打包 图片、字体、媒体、等文件
            name: 'file-loader',
            command: 'npm install --save-dev file-loader'
        }, {
            //url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
            name: 'url-loader',
            command: 'npm install --save-dev url-loader'
        }, {
            //处理es6语法
            // @babel/core 是babel中的一个核心库
            // preset-env 这个模块就是将语法翻译成es5语法,这个模块包括了所有翻译成es5语法规则
            // 将Promise,map等低版本中没有实现的语法,用polyfill来实现.
            name: 'babel',
            command: 'npm i --save-dev babel-loader @babel/core @babel/preset-env @babel/polyfill'
        }, {
            //解析 .vue 文件
            name: 'vue-loader',
            command: 'npm i -D vue-loader vue-template-compiler vue-style-loader'
        }
    ]
}
