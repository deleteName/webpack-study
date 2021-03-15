'use strict'
/* 
    -- 文件指纹的三种hash模式 -- 

    hash：文件变动hash就会更新
    chunkhash：根据入口变动hash，当一个文件变动后改文件的hash就会改变，包括其引用资源
    contenthash：根据内容变动hash，文件内容变动和hash改变
*/

const path = require('path')
// 使用style-loader会把样式内容放入style标签中，mini-css-extract-plugin是把样式打包成文件进行引用
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

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
        filename: '[name]_[chunkhash:8].js'
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
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /.(png|jpg|jpeg|svg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                },
            },
            {
                test: /.(woff|woff2|ttf|otf|eot)/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                },
            }
        ]
    },
    // 可以引入很多webpack或者第三方的依赖资源，plugins作用于整个构建过程，从开始到结束
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsWebpackPlugin({
            assertsNameRegExp: /.css$/g,
            cssProcessor: require('cssnano')
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            chunks: ['index'],
            inject: 'body',
            minify: true
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/search.html'),
            filename: 'search.html',
            chunks: ['search'],
            inject: 'body',
            minify: true
        }),
    ],
}
