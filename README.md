
## 开发教程
Hello World，[点这里](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world?hl=zh-cn)

## manifest.json
manifest.json 有哪些属性，[点这里](https://developer.chrome.com/docs/extensions/reference/manifest?hl=zh-cn#minimal-manifest)

有几个重点属性的要看下：  
### action  
点击图标弹出的页面，如果要操作页面上dom，需要使用通信的方式，可以参考[这里](https://developer.chrome.com/docs/extensions/mv3/messaging/?hl=zh-cn)
### content_scripts  
注入到页面中的js等
### homepage_url 
点击图标直达页面，可以用来广告 
### options_page  
右键图标中的“选项”
### permissions  
需要浏览器授权的一些权限
### background  
指定包含扩展程序 Service Worker 的 JavaScript 文件，该 Service Worker 充当事件处理脚本。

## 源码目录
### /action  
定义扩展程序图标在 Google 工具栏中的外观和行为。如需了解详情，请参阅 [chrome.action](https://developer.chrome.com/docs/extensions/reference/api/action?hl=zh-cn)。

### /background  
指定包含扩展程序 Service Worker 的 JavaScript 文件，该 Service Worker 充当事件处理脚本。如需了解详情，请参阅扩展程序 [Service Worker](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers?hl=zh-cn) 简介。

### /option  
指定包含扩展程序 Service Worker 的 JavaScript 文件，该 Service Worker 充当事件处理脚本。如需了解详情，请参阅扩展程序 [Service Worker](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers?hl=zh-cn) 简介。