# wil

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
  "deployDir": "dist/"          // 发布目录的路径，相对于项目仓库根路径
}
```

## Usage


| command line  | usage |
| ------------- | ------------- |
| wil pub [tagname]  | 发布dist目录下文件到CDN(若指定tag_name，将打一个git tag并推送)  |
| others  | others  |
