/**
 * @file checkDistProd.js
 * @brief 检测发布目录（默认dist/）里是否已经编译成生产环境代码
 * @author banbian, itaofe@gmail.com
 * @version 1.0.0
 * @date 2016-06-24
 */

'use strict'
const dive = require("./dive")
const checkDistProd = (deployPath) => {
  return new Promise (
    (resolve) => {
      dive(deployPath, {
        slAction: () => {
          resolve(false)

          // 中止dive foreach循环的函数体执行
          return true
        },
        allDoneAction : () => {
          resolve(true)
        }
      })
    }
  )
}

module.exports = checkDistProd