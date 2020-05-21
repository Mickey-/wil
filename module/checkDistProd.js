/**
 * @file checkDistProd.js
 * @brief 检测发布目录（默认dist/）里是否已经编译成生产环境代码
 * @author banbian, itaofe@gmail.com
 * @version 1.0.0
 * @date 2016-06-24
 */

'use strict'
const path = require('path')
const child_process = require('child_process')
const dive = require('./dive')
const checkDistProd = (deployPath) => {
  return new Promise (
    (resolve) => {
      dive(deployPath, {
        fileAction: (fullPath) => {
          // 获得仓库名，检查是不是在压缩检测白名单里
          const repoName = child_process.execSync('git config --get remote.origin.url', {encoding:'utf8'}).match(/[^\/]+(?=\.git)/)[0]
          const ext = path.extname(fullPath)
          // 对于非白名单里的项目仓库，检查发布目录下的js文件，如果有行数大于100的js文件，那么认为没有进行生产环境编译
          if (global.G_CONFIG.whiteList.indexOf(repoName) == -1 && ext == '.js') {
            const wcRet = child_process.execSync(`wc -l ${fullPath}`, {encoding: 'utf8'})
            const lines = +wcRet.match(/\d+/)[0]
            if (lines > 100) {
              resolve(false)
              // 中止dive foreach循环的函数体执行
              return true
            }
          }
        },
        slAction: () => {
          // 如果发现有文件的类型是软链，那肯定不是生产环境编译后的产物
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
