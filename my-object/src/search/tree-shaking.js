'use strict'

/**
 * tree-shaking  
 * DCE（elimination）会帮你过滤调无用的代码
 * 1. 不会执行的代码
 *      if (false) console.log('a')
 * 2. 执行结果不会被用到的代码
 *      const a = (num=1) => num + 1
 *      a()
 * 3. 改变却不被用到
 *      let a = 1
 *      a = 2
 * 
 * webpack2.x 开始的tree-shaking模式，4.x开始默认开启
 */


export function a () {
    return 'this is a function'
}

export function b () {
    return 'this is b function'
}