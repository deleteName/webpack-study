'use strict'

const path = require('path')

module.exports = {
    // 运行环境 - 'production' | 'development' | 'none' - 默认：production
    mode: 'production', 
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
    plugins: []
}