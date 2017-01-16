# wil [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]

frontend workflow integration solution    
骑迹前端工作流集成解决方案

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

使用前 __务必如``` wil pub -h ``` 了解详细参数__


| command line  | usage |
| ------------- | ------------- |
| wil pub [path] [options]  | 只部署发布目录(默认dist/)下文件到CDN。若指定[path]，将只发布指定文件(夹)  |
| wil init | 初始化一个 [react全家桶](https://github.com/59fe/generator-rrrw)的项目框架 |
| others  | others  |

使用前 __务必如``` wil pub -h ``` 了解详细参数__

[npm-image]: https://badge.fury.io/js/wil.svg
[npm-url]: https://npmjs.org/package/wil
[travis-image]: https://travis-ci.org/59fe/wil.svg?branch=master
[travis-url]: https://travis-ci.org/59fe/wil
[daviddm-image]: https://david-dm.org/59fe/wil.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/59fe/wil
