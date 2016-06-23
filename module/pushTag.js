'use strict';
const exec = require('child-process-promise').exec
const chalk = require("chalk")

module.exports = (tagName) => {
  exec(`git tag ${tagName} && git push origin ${tagName}`)
    .then((ret) => {
      const stdout = ret.stdout
      console.log(stdout)
      console.log(chalk.green('[SUCCESS] ') + chalk.cyan(`tag 【${tagName}】 推送成功！`))
    })
    .catch((err) => {
      console.log(chalk.red('[ERROR] '), err);
      console.log(chalk.red('[ERROR] 打tag操作失败！ ') + '静态文件发布继续...\n')
    })
}
