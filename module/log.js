/**
 * @file error.js
 * @brief 打印错误信息，并决定是否退出程序
 * @param msg{string} 错误信息
 * @param opt.exit{boolean} 报错后是否强行退出程序
 * @author banbian, itaofe@gmail.com
 * @version 1.0.0
 * @date 2016-06-27
 */

'use strict'
const chalk = require("chalk")
const error = (msg, opt) => {

  !opt && (opt = {})
  if (typeof msg === 'object') {
    console.log(chalk.red('[ERROR] (/= _ =)/~┴┴ ) ↓ '))
    console.dir(msg)
  } else {
    console.log(chalk.red('[ERROR] ') + msg)
  }
  if (opt.exit) process.exit(1)
}
const info = (msg) => {
  console.log(chalk.cyan('[INFO] ') + msg)
}
const success = (msg) => {
  console.log(chalk.green('[SUCCESS] ') + msg)
}
module.exports = {error, info, success}
