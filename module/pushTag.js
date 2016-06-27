'use strict';
const exec = require('child-process-promise').exec
const chalk = require("chalk")
const log = require('./log')

module.exports = (tagName) => {
  exec(`git tag ${tagName} && git push origin ${tagName}`)
    .then((ret) => {
      const stdout = ret.stdout
      console.log(stdout)
      log.success(chalk.cyan(`Tag 【${tagName}】 推送成功！`))
    })
    .catch((err) => {
      log.error(err)
      log.error('打tag操作失败！ 静态文件发布继续...\n')
    })
}
