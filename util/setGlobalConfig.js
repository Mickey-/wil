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
//default config
global.G_CONFIG = {
  //"mediaPubType": "",
  //"mediaDir": "dist/res/",
  "deployDir": "dist/"
}

try {
  let wilrcContent = JSON.parse(fs.readFileSync(path.resolve(repoPath, '.wilrc'), 'utf8'))
  //合入用户配置文件
  Object.assign(global.G_CONFIG, wilrcContent)
} catch (e) {
  if (/SyntaxError/.test(e.toString())) {
    //json 非法
    console.log(chalk.red('[ERROR]') + ' 配置文件' + chalk.yellow('.wilrc') + '的JSON格式不合法，请检查')
  }
}

module.exports = global.G_CONFIG
