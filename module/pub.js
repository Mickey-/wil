'use strict';
let program = require('commander')
program.command('pub [tag_name]', '发布dist目录下文件到CDN(若指定tag_name，将打一个git tag并推送)')
  .action(function() {
    console.log('pub start');
  })


