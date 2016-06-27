'use strict';
const program = require('commander')
const chalk = require("chalk")
const log = require('../module/log')
program.command('pub [tag_name]', '发布dist目录下文件到CDN(若指定tag_name，将打一个git tag并推送)')
  .action(function() {
    log.info('解析项目根目录的可选配置文件.wilrc, 启动自动化部署...')
  })


