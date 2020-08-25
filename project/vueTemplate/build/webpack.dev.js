const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')

module.exports = WebpackMerge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),   // dist目录开启服务器
        compress: true,    // 是否使用gzip压缩
        port: 3000,    // 端口号
        open: true,   // 自动打开网页
        hot: true,   // 开启热更新
    },
    plugins: [
        new webpack.NamedModulesPlugin(),  // 热更新 可配置也可不配置
        new webpack.HotModuleReplacementPlugin(), // 热更新 这个是必须配置的插件
    ],
    optimization: {
        usedExports: true
    },
})

