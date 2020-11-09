# miniprogram preview

将 miniprogram-ci 包装成一个网页， 让浏览小程序开发码更方便

## 快速开始

需先配置好[project.config.js](#project.config.js)

```shell
$: yarn
$: yarn start
```

## 先决条件

使用本 demo 请先阅读 https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html 相关章节

1. 需要获取小程序 privateKey 并填写进 project.config.js
2. 配置ip白名单, 否则无法上传, 具体细节阅读上面链接

第三方平台下
除了需要满足以上条件， 还需要满足

1. 正确的 ext.json
2. appid 的小程序需要为该第三方平台的开发小程序, 否则读取ext.json失败

## project.config.js

```javascript
module.exports = {
  domain: "172.17.1.188", // 暂时没用, 保留为项目发布域名
  port: 80,  // 项目运行端口
  // 这部分配置请参考 https://developers.weixin.qq.com/miniprogram/dev/devtools/ci.html 项目对象一节
  miniProgram: {
    appid: "wxe0550f87e4277615",
    type: "miniProgram",
    projectPath: "C:/Users/faisco/Desktop/wxmallapp",
    privateKeyPath: "C:/Users/faisco/Desktop/private.wxe0550f87e4277615.key",
  },
};
```
