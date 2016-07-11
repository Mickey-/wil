'use strict';
const program = require('commander')

program
  .version('0.0.12')
  .description('59前端工作流集成解决方案')
  .usage('<command> [options]')
  .option('-B, --baz', 'enable some baz')


program.command('pub [path] [options]', '部署发布目录(默认dist/)下文件到CDN。若指定path(默认./)，将只发布指定文件(夹)')

program.parse(process.argv)
if (!program.args.length) program.help()

