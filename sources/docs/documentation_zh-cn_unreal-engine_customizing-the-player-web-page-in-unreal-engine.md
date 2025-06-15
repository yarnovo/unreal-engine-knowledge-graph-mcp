# 在虚幻引擎中自定义播放器网页 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/customizing-the-player-web-page-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:47:02.304Z

---

目录

![自定义播放器网页](https://dev.epicgames.com/community/api/documentation/image/9ab07003-493c-4c30-aa1b-82ec11304dcc?resizing_type=fill&width=1920&height=335)

有关自定义前端的信息已移至[像素流送基础设施](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/tree/master/Frontend)

## 前端

前端指的是在Web浏览器中运行并可以连接到虚幻引擎像素流送应用程序以及与之交互的HTML、CSS、图像和JavaScript/TypeScript代码。开发人员可以根据自己的像素流送体验需求，在前端库的基础之上修改和扩展。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8ea6282-a55c-47de-aba8-48907897ef77/frontendblank.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8ea6282-a55c-47de-aba8-48907897ef77/frontendblank.jpg)

默认前端。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/766d2298-ff50-4372-9acf-68a727e7ff2b/frontendsettings.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/766d2298-ff50-4372-9acf-68a727e7ff2b/frontendsettings.jpg)

前端设置面板。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c42f2eb-a0c2-40bf-9042-a2cd1c4168c3/frontendlight.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c42f2eb-a0c2-40bf-9042-a2cd1c4168c3/frontendlight.jpg)

带有设置面板的前端光源模式。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5aa821e1-1029-4456-9eba-ed197e023a9f/frontendconnected.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5aa821e1-1029-4456-9eba-ed197e023a9f/frontendconnected.jpg)

带有活动流连接的前端。

## 位置

我们推出了新的像素流送基础设施仓库，其中包含了像素流送前端元素的所有最新信息。 如果你想自定义像素流送前端，请前往[自定义播放器网页](https://github.com/EpicGamesExt/PixelStreamingInfrastructure/tree/master/Frontend)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acf8cbb4-3bd9-4cf5-9b3c-b4072820d2ec/infragit.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acf8cbb4-3bd9-4cf5-9b3c-b4072820d2ec/infragit.jpg)

## 理由

将"自定义播放器网页"文档移至像素流送基础设施，意味着我们可以独立于虚幻引擎的发行更频繁地动态更新。随着像素流送前端的演变，我们将相应更新相关信息。 请务必经常回来检查基础设施，了解有关前端的新信息。

## 相对于之前版本的更改

过去，像素流送前端依赖两个庞大的Javascript文件： `app.js` 和 `webrtcplayer.js` 。用户很难将其扩展，并且对于试图修改前端的用户来说，它们的参考价值不大。此外，我们的维护难度很大。

从虚幻引擎5.2开始，这些文件现已移至一个TypeScript库，前端在其中已模块化，可轻松扩展。

对于使用虚幻引擎5.2之前的版本的用户，过渡很重要，但对于所有后续版本，我们打算为我们的版本提供稳定的API表面并利用语义版本管理。

-   [guide](https://dev.epicgames.com/community/search?query=guide)
-   [pixel streaming](https://dev.epicgames.com/community/search?query=pixel%20streaming)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [前端](/documentation/zh-cn/unreal-engine/customizing-the-player-web-page-in-unreal-engine#%E5%89%8D%E7%AB%AF)
-   [位置](/documentation/zh-cn/unreal-engine/customizing-the-player-web-page-in-unreal-engine#%E4%BD%8D%E7%BD%AE)
-   [理由](/documentation/zh-cn/unreal-engine/customizing-the-player-web-page-in-unreal-engine#%E7%90%86%E7%94%B1)
-   [相对于之前版本的更改](/documentation/zh-cn/unreal-engine/customizing-the-player-web-page-in-unreal-engine#%E7%9B%B8%E5%AF%B9%E4%BA%8E%E4%B9%8B%E5%89%8D%E7%89%88%E6%9C%AC%E7%9A%84%E6%9B%B4%E6%94%B9)