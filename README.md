# miniprogram preview

将 miniprogram-ci 包装成一个服务, 让浏览小程序开发码更方便

## 快速开始

需先配置好[project.config.js](#projectconfigjs)

```shell
$: yarn
$: yarn start
```

访问 domain:port/preview 即可获取最新的小程序码

## 先决条件

使用本 demo 请先阅读 https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html 相关章节

1. 需要获取小程序 privateKey 并填写进 project.config.js
2. 配置 ip 白名单, 否则无法上传, 具体细节阅读上面链接
3. 扫码的微信号必须拥有开发者权限, 否则页面空白

第三方平台下
除了需要满足以上条件, 还需要满足

1. 正确的 ext.json
2. appid 的小程序需要为该第三方平台的开发小程序, 否则读取 ext.json 失败

## project.config.js

```javascript
module.exports = {
  domain: "172.17.1.188", // 暂时没用, 保留为项目发布域名
  port: 80, // 项目运行端口
  // 这部分配置请参考 https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html 项目对象一节
  miniProgram: {
    appid: "你的小程序appid",
    type: "miniProgram",
    projectPath: "你的小程序项目根目录",
    privateKeyPath: "你的privateKey路径",
  },
};
```

## preview 接口逻辑

由于构建小程序码是非常耗费系统资源的, 所以本项目采用的是监听构建的模式, 具体和 webpack 差不多. 只有目录内有文件变化才会重新构建, 不用担心重复构建的问题. 另外在目录文件没变化时延迟每 25 分钟重新构建一次, 防止小程序开发码过期. 每次访问接口只会获取到最新的小程序码的链接, 并不会影响构建, 所以大可放心给所有的人访问. 浏览器端则以 30 秒轮询接口, 并没有使用 websocket 通过服务器通知, 个人感觉够用了, 不喜欢可以降低轮询频率, 代码在 views/preview.hdbs

## 如何在局域网内访问

虽然这个不应该属于本项目的内容, 但是属于强相关内容, 毕竟这个小程序码生成一个目的就是让被人实时获取到小程序开发码, 所以也一并介绍.
首先, 在不设置的情况下, 本项目是运行在 80 端口上, 即通用的 http 端口. 在浏览器上访问域名`localhost`即可访问到此项目. 但是, 一般的电脑有防火墙, 局域网内其他机器并不能访问到本机的 80 端口. 需要先开放本机的 80 端口, 关于这一点, 可以参考[https://blog.csdn.net/zzq900503/article/details/11936379]. 然后获取本机的局域网 ip, 别的局域网内机器即可通过此 ip 访问到你的本地机器的该项目.
