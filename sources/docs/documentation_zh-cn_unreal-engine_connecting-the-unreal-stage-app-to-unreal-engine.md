# 将Unreal Stage应用程序连接到虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/connecting-the-unreal-stage-app-to-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:57.640Z

---

目录

![将Unreal Stage应用程序连接到虚幻引擎](https://dev.epicgames.com/community/api/documentation/image/dc8ed3ee-a75c-4da6-b061-7fc9790b26ed?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 连接屏幕

在平板电脑上启动Unreal Stage后，它会要求你根据IP地址连接到虚幻引擎编辑器的实例。 随后它会扫描网络，如果发现任何启用了远程控制的虚幻引擎实例，那么这些实例会被自动列为可选项。应用程序会记住你上次连接的IP地址。如果没有检测到任何IP地址，你也可以手动输入一个地址。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0474b655-1e5c-41eb-8328-24a83da4b2c5/stage-2.png)

## 场景中存在多个nDisplay根Actor

如果场景中存在多个nDisplay根Actor，Unreal Stage会提示你选择一个来进行控制。 当存在多个nDisplay根Actor时，此设置会在按场景在各个会话中被记住，且可通过设置（Settings）进行修改。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b641dfff-6c1f-43bb-9e4b-b850a4b104d6/stage-3.png)

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [连接屏幕](/documentation/zh-cn/unreal-engine/connecting-the-unreal-stage-app-to-unreal-engine#%E8%BF%9E%E6%8E%A5%E5%B1%8F%E5%B9%95)
-   [场景中存在多个nDisplay根Actor](/documentation/zh-cn/unreal-engine/connecting-the-unreal-stage-app-to-unreal-engine#%E5%9C%BA%E6%99%AF%E4%B8%AD%E5%AD%98%E5%9C%A8%E5%A4%9A%E4%B8%AAndisplay%E6%A0%B9actor)