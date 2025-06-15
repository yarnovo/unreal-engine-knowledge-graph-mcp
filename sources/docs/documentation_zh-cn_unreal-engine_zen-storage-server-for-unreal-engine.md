# 虚幻引擎的Zen存储服务器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/zen-storage-server-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:31:15.176Z

---

目录

![Zen存储服务器](https://dev.epicgames.com/community/api/documentation/image/cf81c505-1026-4c66-b377-cd4f1f732486?resizing_type=fill&width=1920&height=335)

Zen存储服务器（Zenserver）通过以下方式支持任意规模的项目：

-   支持本地存储、共享存储或云存储
    
-   提供更快的暂存和部署
    
-   通过减少文件系统的开销来提高烘焙时间效率。
    

以下情况适合使用Zen流送：

-   在家庭或办公室等可信网络中。
    
-   使用非发布构建的配置（调试、开发、测试等）。
    
-   在Zenserver（工作站上）与目标平台（游戏主机或移动设备）之间的距离较短时。
    

如需详细了解如何实现这些目标，请参阅下方链接的页面。

[

![将Zenserver作为共享DDC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b00e0c3-e35a-4869-8a55-5355f588e475/placeholder_topic.png)

将Zenserver作为共享DDC

本指南介绍如何将虚幻Zen存储服务器设置为派生数据缓存（DDC）的共享存储服务器。





](/documentation/zh-cn/unreal-engine/set-up-zen-storage-server-as-shared-ddc-for-unreal-engine)[

![将Zenserver作为烘焙输出存储](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffecfb02-3c68-436f-84b3-c3da861b5cbe/placeholder_topic.png)

将Zenserver作为烘焙输出存储

本指南介绍如何将Zenserver作为烘焙输出存储





](/documentation/zh-cn/unreal-engine/using-zen-storage-server-as-cooked-output-store-for-unreal-engine)[

![Zenserver流送](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ae46a92-00ef-4104-a96e-2274a2377334/placeholder_topic.png)

Zenserver流送

使用Zen存储服务器将数据流送至目标设备。





](/documentation/zh-cn/unreal-engine/how-to-use-zenserver-streaming-to-play-on-target-in-unreal-engine)[

![Zenserver烘焙数据快照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84c7abcc-be9f-4076-a670-4bb838eeab29/placeholder_topic.png)

Zenserver烘焙数据快照

导出项目的烘焙输出，然后将其导入至目标位置。





](/documentation/zh-cn/unreal-engine/cooked-data-snapshots-with-zen-storage-server-for-unreal-engine)

-   [build operations](https://dev.epicgames.com/community/search?query=build%20operations)
-   [ddc](https://dev.epicgames.com/community/search?query=ddc)
-   [zenserver](https://dev.epicgames.com/community/search?query=zenserver)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)