'use strict'

const path = require('path')
const webpack = require('webpack')

module.exports = {
    // 运行环境 - 'production' | 'development' | 'none' - 默认：production
    mode: 'development', 
    // 入口
    entry: {
        index: './src/index.js',
        search: './src/search.js'
    },
    // 输出
    output: {   
        path: path.resolve(__dirname, 'dist'),
        // 因为没有多出口设置，这里采用占位符的方式设置
        filename: '[name].js'
    },
    // 是否监听文件变动自动build，默认为false。缺点是仍然需要手动刷新页面
    watch: false,
    // 原理是每隔一段时间判断文件最后的修改时间，如果修改时间有变动则代表修改过了，这时候会把文件缓存下来，过一段时间后进行更新
    watchOptions: {
        // 忽略监听文件，可以使用正则
        ignored: /node_modules/,
        // 延迟更新等待时间
        aggregateTimeout: 300,
        // 每秒查询次数
        poll: 1000
    },
    // loader 资源进行处理
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
                    // css执行是从右到左，loader也是一样。这里先执行css-然后执行style
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|jpeg|svg|gif)$/,
                use: 'file-loader',
            },
            {
                test: /.(woff|woff2|ttf)/,
                use: 'file-loader'
            }
        ]
    },
    // 可以引入很多webpack或者第三方的依赖资源，plugins作用于整个构建过程，从开始到结束
    plugins: [
        // webpack5.x 在运行时无法与webpack-dev-server进行兼容，需要用(yarn webpack serve|webpack serve) --open 运行服务，缺点是无法自动打开
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
}