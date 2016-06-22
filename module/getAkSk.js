/**
 * @file getAkSk.js
 * @brief 公钥私钥获取方法
 * @author banbian, itaofe@gmail.com
 * @version 1.0.0
 * @date 2016-06-21
 */

'use strict';
const http = require("http")

const getAkSk = () => {
  return new Promise (
    (resolve, reject) => {
      http.get(global.G_CONFIG.AKSK, (res) => {
        let str = ''

        res.on('data', (chunk) => {
          str += chunk
        })

        res.on('end', () => {
          const AkSk = JSON.parse(str)
          resolve(AkSk)
        })
      }).on('error', (e) => {
        reject(e)
      })
    }
  )
}
module.exports = getAkSk
