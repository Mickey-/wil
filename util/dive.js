/**
* @file dive.js
* @brief 下钻一个目录，遍历每个文件并进行一些操作
* @author banbian, itaofe@gmail.com
* @version 1.0.0
* @date 2016-06-16
*/

'use strict'
const path = require("path")
const fs = require("fs")
const dive = function (dir, action) {
  if (typeof action !== "function")
    action = function (error, file) {
      console.dir('-----------')
      console.dir(file)
      console.dir('-----------')
    }

  // Read the directory
  fs.readdir(dir, function (err, list) {
    if (err) return action(err);

    list.forEach(function (file) {
      let fullPath = path.join(dir, file)

      fs.stat(fullPath, function (err, stat) {
        if (stat && stat.isDirectory())
          // dive into the directory
          dive(fullPath, action)
        else
          action(null, fullPath)
      })
    })
  })
}

module.exports = dive
