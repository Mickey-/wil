/**
* @file dive.js
* @brief 下钻一个目录，遍历每个文件并进行一些操作
* @author banbian, itaofe@gmail.com
* @param dir       {string} 入口目录
* @param action    {function} 对每个文件的回调函数
* @param dirAction {function} 对每个目录的回调函数(可选)
* @version 1.0.0
* @date 2016-06-16
*/

'use strict'
const path = require("path")
const fs = require("fs")
const dive = function (dir, action, dirAction) {
  if (typeof action !== "function")
    action = function (error, file) {
      console.dir('-----------')
      console.dir(file)
      console.dir('-----------')
    }

  // Read the directory
  fs.readdir(dir, function (err, list) {
    if (err) return action(err);
    let shouldBreak = false

    list.forEach(function (file) {
      if (shouldBreak) return false

      let fullPath = path.join(dir, file)

      fs.lstat(fullPath, function (err, stat) {
        if (stat && stat.isDirectory()) {
          if (typeof dirAction == 'function') {
            shouldBreak = dirAction(fullPath, stat)
          }
          // dive into the directory
          dive(fullPath, action)
        }
        else
          action(null, fullPath)
      })
    })
  })
}

module.exports = dive
