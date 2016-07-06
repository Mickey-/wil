# wil [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

frontend workflow integration solution    
59前端工作流集成解决方案

## Installation

```bash
npm install -g wil
```

## Config

配置文件名为```.wilrc``` ，内容为json格式，放置在项目仓库的根目录（和package.json一个目录）

```
{
  "mediaDir": "dist/res/",      // 媒体目录，用以存放的图片、音频、pdf等等的媒体静态资源。默认不发布，需要--media参数触发发布：wil pub --media
  "deployDir": "dist/"          // 发布目录的路径，相对于项目仓库根路径
}
```

## Usage


| command line  | usage |
| ------------- | ------------- |
| wil pub [path] [options]  | 部署发布目录(默认dist/)下文件到CDN。若指定[path]，将只发布指定文件(夹)  |
| others  | others  |

详细参数见命令的帮助界面,如 ``` wil pub -h ```

[npm-image]: https://badge.fury.io/js/wil.svg
[npm-url]: https://npmjs.org/package/wil
[travis-image]: https://travis-ci.org/Mickey-/wil.svg?branch=master
[travis-url]: https://travis-ci.org/Mickey-/wil
[daviddm-image]: https://david-dm.org/Mickey-/wil.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/Mickey-/wil
