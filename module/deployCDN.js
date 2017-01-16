'use strict';
const qiniu = require("qiniu")
const chalk = require("chalk")
const path = require("path")
const co = require("co")
const exec = require('child-process-promise').exec
const getAkSk = require("./getAkSk")
const log = require("./log")
const dive = require("./dive")
const GC = global.G_CONFIG

module.exports = (deployPath, deployDirPath, program) => {
  const gen = function* () {

    const execRet = yield exec('git remote show origin -n | grep "Fetch URL:"')
    // 得到项目git仓库名
    const repoName = path.basename(execRet.stdout).replace(/.git.*\n/, '')
    const AkSk = yield getAkSk()
    qiniu.conf.ACCESS_KEY = AkSk.ak
    qiniu.conf.SECRET_KEY = AkSk.sk

    function uptoken(bucket, key) {
      let putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
      return putPolicy.token();
    }
    function uploadFile(uptoken, key, localFile) {
      let extra = new qiniu.io.PutExtra()
      qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
        if(!err) {
          let cdnUrl = GC.cdnHost + ret.key
          // 上传成功， 处理返回值
          log.success(chalk.cyan.underline(cdnUrl) + ' 发布成功！')
          //console.dir(ret.hash, ret.key, ret.persistentId);
        } else {
          // 上传失败， 处理返回代码
          log.error(err)
        }
      });
    }


    // 迭代处理
    dive(deployPath, {
      fileAction: (fullPath) => {
        // 跳过各个[.]开头的文件（通常是不同系统的系统隐藏文件，比如.DS_Store等）
        if (path.basename(fullPath)[0] == '.') return
        const pathAfterDeployDir = fullPath.split(deployDirPath)[1]
        // 七牛 key
        const key = path.join('repo', repoName, pathAfterDeployDir).replace(/\\/g, '/')

        let token = uptoken(GC.bucket, key)
        //调用uploadFile上传
        uploadFile(token, key, fullPath)
      },
      dirAction: (fullPath) => {
        // 根据入参判断是否需要发布媒体目录（默认是dist/res/）
        if (path.basename(GC.mediaDir) != path.basename(fullPath)) {
          return false
        }
        return program.media ? false : undefined
      },
      allDoneAction: () => {
        log.info('可以按住[Command]键，单击(iTerm2)或双击(原生Terminal)下面的链接直接查看CDN资源')
      }
    })
  }

  co(gen).then((val) => {
    val && log.info(val)
  }, (err) => {
    console.error(err.stack);
  })
}
