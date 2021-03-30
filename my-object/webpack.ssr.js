'use strict'

const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

const setMap = () => {
    const entry = {}
    const htmlWebpackPlugin = []
    const entryFiles = glob.sync(path.resolve(__dirname, 'src/*/index-server.js'))
    Object.keys(entryFiles).map(index => {
        const entryFile = entryFiles[index]
        const match = entryFile.match(/src\/(.+)\/index-server.js/)

        if (match === null) return
        const filename = match[1]
        entry[filename] = entryFile
        htmlWebpackPlugin.push(new HtmlWebpackPlugin({
            template: path.resolve(__dirname, `src/${filename}/index.html`),
            filename: `${filename}.html`,
            chunks: ['commons', filename],
            inject: 'body'
        }))
    })
    return { entry, htmlWebpackPlugin }
}
const { entry, htmlWebpackPlugin } = setMap()

module.exports = {
    mode: 'production',
    entry,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name]-server.js',
        libraryTarget: 'umd'
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /.js$/,
                loader: 'babel-loader'
            },
            {
                test: /.css$/,
                use: [
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
                            remUnit: 75,
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
        splitChunks: {
            minSize: 0,
            cacheGroups: {
                commons: {
                    name: 'commons',
                    chunks: 'all',
                    minChunks: 2
                },
            }
        }
    }
}
