/**
 * @file getRepoPath.js
 * @brief 获得本地的项目仓库根路径
 * @author banbian, itaofe@gmail.com
 * @version 1.0.0
 * @date 2016-06-14
 */

'use strict';
const path = require("path")
const fs = require("fs")
const chalk = require("chalk")
module.exports = () => {
  let ret = ''
  let pathArr = ['./', '.git']

  const statGit = () => {
    let repoPath = path.resolve(...pathArr)
    if ('/.git' == repoPath) {
      console.log(chalk.cyan('[INFO]') + ' 没有检测到 ' + chalk.dim.underline('.git') + ' ，将以当前目录作为项目根目录')
      // 如果已经递归到根目录了仍没有.git目录，则将当前目录作为repo目录，用户可能需要执行init或其他工作
      return path.resolve('./')
    }
    try {
      if (fs.statSync(repoPath)) return repoPath
    } catch (e) {
      pathArr.unshift('../')
      // 尾递归优化
      return statGit()
    }
  }
  //只需要项目根目录的路径即可
  return statGit().replace('.git', '')
}
