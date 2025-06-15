# 虚幻引擎关卡流送 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/level-streaming-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:53.089Z

---

目录

![关卡流送](https://dev.epicgames.com/community/api/documentation/image/7518d8b6-0db6-4ebe-bcac-64c96d1f59ed?resizing_type=fill&width=1920&height=335)

关卡流送功能可以将地图文件加载到内存中，或者从内存中卸载，并在游戏过程中切换地图的可视性。 这样一来，场景便能拆分为较小的地图块，并且只有相关部分才会占用资源并被渲染。 正确设置后，开发者便能创建大型、无缝衔接的游戏场景，让玩家仿佛置身于"大世界"之中。

[

![关卡流送概述](images/static/document_list/empty_thumbnail.svg)

关卡流送概述





](/documentation/zh-cn/unreal-engine/level-streaming-overview-in-unreal-engine)[

![关卡流送体积参考](images/static/document_list/empty_thumbnail.svg)

关卡流送体积参考





](/documentation/zh-cn/unreal-engine/level-streaming-volumes-reference-in-unreal-engine)[

![使用蓝图加载和卸载关卡](images/static/document_list/empty_thumbnail.svg)

使用蓝图加载和卸载关卡





](/documentation/zh-cn/unreal-engine/loading-and-unloading-levels-using-blueprints-in-unreal-engine)[

![Loading and Unloading Levels using C++](images/static/document_list/empty_thumbnail.svg)

Loading and Unloading Levels using C++





](/documentation/zh-cn/unreal-engine/loading-and-unloading-levels-using-cplusplus-in-unreal-engine)[

![World Composition](images/static/document_list/empty_thumbnail.svg)

World Composition





](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine)[

![关卡流送指南](images/static/document_list/empty_thumbnail.svg)

关卡流送指南





](/documentation/zh-cn/unreal-engine/level-streaming-using-volumes-in-unreal-engine)

## 世界场景构成

世界场景构成用于创建大型场景的特定关卡流送形式。关卡分布在平面网格中，并在玩家靠近时流入。

[

![World Composition](images/static/document_list/empty_thumbnail.svg)

World Composition





](/documentation/zh-cn/unreal-engine/world-composition-in-unreal-engine)

World Composition是此前用于关卡流送的旧版系统。现在我们推荐使用虚幻引擎5.0或更高版本中的[世界分区（World Partition）](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)来实现项目的关卡流送。

-   [level streaming](https://dev.epicgames.com/community/search?query=level%20streaming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [世界场景构成](/documentation/zh-cn/unreal-engine/level-streaming-in-unreal-engine#%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF%E6%9E%84%E6%88%90)