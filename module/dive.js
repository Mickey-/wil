/**
* @file dive.js
* @brief 下钻一个目录，遍历每个文件并进行一些操作
* @author banbian, itaofe@gmail.com
* @param dir       {string} 入口目录
* @param fileAction    {function} 对每个文件的回调函数
* @param dirAction {function} 对每个目录的回调函数
* @param slAction  {function} 对每个软链的回调函数
* @param allDoneAction  {function} 所有目录和文件扫描完毕后，执行的回调
*
* 如果第二个参数是对象，则可以选择性的使用某个回调{dirAction: fn1, slAction: fn2}
* @version 1.0.0
* @date 2016-06-26
*/

'use strict'
const path = require("path")
const fs = require("fs")
const log = require("./log")
const child_process = require("child_process")


let shouldBreak = false
const dive = (dir, fileAction, dirAction, slAction, allDoneAction) => {

  // 收集针对文件、目录、软链 对象的回调
  let cb = {}
  if (typeof fileAction == "object") {
    cb = fileAction
  } else if (typeof fileAction == "function") {
    cb = {fileAction, dirAction, slAction, allDoneAction}
  }

  // IO操作，返回布尔值，表示是否要退出目录循环
  const doOpe = (action, fullPath) => {
    if (typeof action == 'function') {
      return action(fullPath)
    }
    return false
  }

  // 特殊情况！如果dir路径是一个文件
  if (fs.lstatSync(dir).isFile()) {
    doOpe(cb.fileAction, dir)
    doOpe(cb.allDoneAction, dir)
    return
  }

  // 正常情况
  // 获得指定目录下子目录和文件的总数; 最后 -1 为了去掉根目录自身
  const TOTAL = +child_process.execSync(`find ${dir} -name "*"| wc -l`, {encoding: 'utf8'}).replace(/\D/g, '') - 1
  let count = 0
  // 扫描、处理每个目录
  const diveDir = (dir) => {

    // Read the directory
    fs.readdir(dir, function (err, list) {
      if (shouldBreak) return false
      if (err) {
        log.error(err, {exit: true})
      }

      list.forEach(function (file) {

        let fullPath = path.join(dir, file)

        fs.lstat(fullPath, function (err, stat) {
          if (shouldBreak && !stat) return false
          // 已扫描的文件或目录数+1
          count++

          // 是目录
          if (stat.isDirectory()) {
            shouldBreak = doOpe(cb.dirAction, fullPath)
            // dive into the directory
            !shouldBreak && diveDir(fullPath)
          // 是软链
          } else if (stat.isSymbolicLink()) {
            shouldBreak = doOpe(cb.slAction, fullPath)
          // 是文件
          } else {
            shouldBreak = doOpe(cb.fileAction, fullPath)
            // all done
            if (count >= TOTAL)
              doOpe(cb.allDoneAction, fullPath)
          }
        })
      })
    })
  }

  diveDir(dir)
}

module.exports = dive
