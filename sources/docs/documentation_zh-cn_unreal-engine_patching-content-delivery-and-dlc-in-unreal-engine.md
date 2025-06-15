# 虚幻引擎中的补丁、内容分发和DLC | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/patching-content-delivery-and-dlc-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:48:01.497Z

---

目录

![补丁和DLC](https://dev.epicgames.com/community/api/documentation/image/02e26df7-a7a4-47ee-bcfa-d8c040412cec?resizing_type=fill&width=1920&height=335)

**虚幻引擎** 可以将内容分割成 **.pak** 文件并将其与主要可执行文件分开交付给用户。此功能支持DCL和修补，以提供实时服务。

## 一般信息

以下页面包含有关 **虚幻引擎** 烘焙和分块过程、如何准备.pak文件以便发布的通用信息，以及有关安装文件块的参考信息。

[

![准备资产进行分块](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73762415-dcd1-40a9-b5a8-52aba2607ffa/placeholder_topic.png)

准备资产进行分块

如何将资产分成块并将其烘焙成打包文件





](/documentation/zh-cn/unreal-engine/preparing-assets-for-chunking-in-unreal-engine)[

![打补丁概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7d25e26-3f4b-4a9c-a6c2-415658245565/placeholder_topic.png)

打补丁概述

创建更新的内容包，允许您在发布后更新项目。





](/documentation/zh-cn/unreal-engine/updating-unreal-engine-projects-with-patches-after-release)[

![如何创建补丁（与平台无关）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b54d805b-2386-4a9d-b2ca-d5ea9e54b6f3/create-patch-topic.png)

如何创建补丁（与平台无关）

本页面介绍如何为现有项目创建补丁。





](/documentation/zh-cn/unreal-engine/how-to-create-a-patch-in-unreal-engine)

## 文件块下载程序插件

**ChunkDownloader** 插件一种通用修补解决方案，适用于需要交付大量小文件的游戏。

[

![设置ChunkDownloader插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25ee8471-58a6-4452-bbe6-c46f26935f55/placeholder_topic.png)

设置ChunkDownloader插件

介绍如何设置项目设置以便使用ChunkDownloader





](/documentation/zh-cn/unreal-engine/setting-up-the-chunkdownloader-plugin-in-unreal-engine)[

![托管ChunkDownloader的清单和资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d76d349-7534-4b99-804f-84078c58e22e/placeholder_topic.png)

托管ChunkDownloader的清单和资产

设置本地主机网站





](/documentation/zh-cn/unreal-engine/hosting-a-manifest-and-assets-for-chunkdownloader-in-unreal-engine)[

![在游戏中实现ChunkDownloader](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ebf76195-d18a-4ed3-b33a-e623807c91d4/placeholder_topic.png)

在游戏中实现ChunkDownloader

如何使用Visual Studio和蓝图将ChunkDownloader集成到你的项目中，以及如何在本地机器上测试该系统。





](/documentation/zh-cn/unreal-engine/implementing-chunkdownloader-in-your-gameplay-in-unreal-engine)

## Google Play资产交付 (GooglePAD)

**GooglePAD** 插件使用Google Play商店中的Google **Play资产交付（Play Asset Delivery）** 系统。此修补解决方案是 **Android App束（Android App Bundle）** 系统的配套工具，可以交付专为用户个人设备进行优化的自定义APK。

你可以在[Google Play资产交付参考](/documentation/zh-cn/unreal-engine/using-google-play-asset-delivery-in-unreal-engine)中阅读更多关于GooglePAD的文章。

-   [patching](https://dev.epicgames.com/community/search?query=patching)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [一般信息](/documentation/zh-cn/unreal-engine/patching-content-delivery-and-dlc-in-unreal-engine#%E4%B8%80%E8%88%AC%E4%BF%A1%E6%81%AF)
-   [文件块下载程序插件](/documentation/zh-cn/unreal-engine/patching-content-delivery-and-dlc-in-unreal-engine#%E6%96%87%E4%BB%B6%E5%9D%97%E4%B8%8B%E8%BD%BD%E7%A8%8B%E5%BA%8F%E6%8F%92%E4%BB%B6)
-   [Google Play资产交付 (GooglePAD)](/documentation/zh-cn/unreal-engine/patching-content-delivery-and-dlc-in-unreal-engine#googleplay%E8%B5%84%E4%BA%A7%E4%BA%A4%E4%BB%98\(googlepad\))