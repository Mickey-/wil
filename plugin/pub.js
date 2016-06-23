'use strict';
const program = require('commander')
const chalk = require("chalk")
program.command('pub [tag_name]', '发布dist目录下文件到CDN(若指定tag_name，将打一个git tag并推送)')
  .action(function() {
    console.log(chalk.cyan('[INFO] ') + '读取项目根目录配置文件.wilrc，自动化发布开始...\n');
  })


