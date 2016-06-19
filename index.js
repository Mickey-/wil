'use strict';
const program = require('commander')

program
  .version('0.0.2')
  //.option('pub', 'enable some bar')
  .option('-B, --baz', 'enable some baz')


// require ./module/xx.js
let normalizedPath = require("path").join(__dirname, "module")
require("fs").readdirSync(normalizedPath).forEach(function(file) {
  if (/\.js$/.test(file)) {
    require("./module/" + file)
  }
})

program.parse(process.argv)
if (!program.args.length) program.help()

