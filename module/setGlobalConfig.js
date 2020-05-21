/**
 * @file setGlobalConfig.js
 * @brief 设置全局配置对象到global里
 * @author banbian, zangtao.zt@alibaba-inc.com
 * @version 1.0.0
 * @date 2016-06-14
 */

'use strict';
const fs = require('fs')
const path = require('path')
const chalk = require("chalk")
const repoPath = require('./getRepoPath')()
const log = require('./log')
//default config
global.G_CONFIG = {
  "repoPath": repoPath,
  //"mediaPubType": "",
  "mediaDir": "dist/res/",
  "deployDir": "dist/",
  // 对象存储上的空间名
  "bucket": "fecdn",
  // 公钥私钥的存放地址
  "AKSK": "http://code.dbike.co/snippets/2/raw",
  // cdn域名
  "cdnHost": "http://fecdn.qeebike.com/",
  // 项目仓库白名单，在白名单里的项目仓库可以不压缩直接发布资源
  "whiteList": ["qiji-gala"]
}

try {
  let wilrcContent = JSON.parse(fs.readFileSync(path.resolve(repoPath, '.wilrc'), 'utf8'))
  //合入用户配置文件
  Object.assign(global.G_CONFIG, wilrcContent)
} catch (e) {
  if (/SyntaxError/.test(e.toString())) {
    //json 非法
    log.error(`配置文件${chalk.yellow('.wilrc')}的JSON格式不合法，请检查`)
  }
}

module.exports = global.G_CONFIG
