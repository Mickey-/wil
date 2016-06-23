'use strict';
const program = require('commander')

program
  .version('0.0.6')
  .description('59前端工作流集成解决方案')
  //.option('pub', 'enable some bar')
  .option('-B, --baz', 'enable some baz')


// require ./module/xx.js
let normalizedPath = require("path").join(__dirname, "plugin")
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  if (/\.js$/.test(file)) {
    require("./plugin/" + file)
  }
})

program.parse(process.argv)
if (!program.args.length) program.help()

