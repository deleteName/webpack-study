'use strict'
/* 
    -- 文件指纹的三种hash模式 -- 

    hash：文件变动hash就会更新
    chunkhash：根据入口变动hash，当一个文件变动后改文件的hash就会改变，包括其引用资源
    contenthash：根据内容变动hash，文件内容变动和hash改变
*/
const path = require('path')
const glob = require('glob')
// 使用style-loader会把样式内容放入style标签中，mini-css-extract-plugin是把样式打包成文件进行引用
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const setMap = () => {
    const entry = {}
    const htmlWebpackPlugin = []
    const entryFiles = glob.sync(path.resolve(__dirname, 'src/*/index.js'))
    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.+)\/index.js/)

        if (match === null) return
        const filename = match[1]
        entry[filename] = entryFile
        htmlWebpackPlugin.push(new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `src/${filename}/index.html`),
            filename: `${filename}.html`,
            chunks: ['vendors', filename],
            inject: 'body'
        }))
    })
    return { entry, htmlWebpackPlugin }
}
const { entry, htmlWebpackPlugin } = setMap()

module.exports = {
    // 运行环境 - 'production' | 'development' | 'none' - 默认：production
    mode: 'production',
    // 入口
    entry,
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
                    'postcss-loader',
                    {
                        loader: 'px2rem-loader',
                        options: {
                            // rem转换率 75 => 1rem
                            remUnit: 75,
                            // 转换rem后小数点位数 /\d.\d{8}/
                            remPrecision: 8
                        }
                    },
                    'less-loader',
                ]
            },
            {
                test: /.(png|jpg|jpeg|svg|gif)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash:8].[ext]'
                    }
                    // url-loader 把指定大小文件以下的进行base64转换，内联至代码中
                    // loader: 'url-loader',
                    // options: {
                    //     limit: 10240,
                    // }
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
    ].concat(htmlWebpackPlugin),
    optimization: {
        // splitChunks 可以将指定包提取至公用库中进行引用，防止同一包多次引用导致多次打包, 详情见[https://webpack.docschina.org/plugins/split-chunks-plugin/]
        splitChunks: {
            // 引用模块大小，当引用模块大于该大小是才会进入后续操作
            minSize: 0,
            cacheGroups: {
                commons: {
                    // 详情[https://webpack.docschina.org/plugins/split-chunks-plugin/#split-chunks-example-2]
                    test: /(react|react-dom)/,
                    name: 'vendors',
                    chunks: 'all',
                },
            }
        }
    }
}
