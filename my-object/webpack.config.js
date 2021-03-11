'use strict'

const path = require('path')

module.exports = {
    // 运行环境
    mode: 'production', 
    // 入口
    entry: './src/index.js',
    // 输出
    output: {   
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}
