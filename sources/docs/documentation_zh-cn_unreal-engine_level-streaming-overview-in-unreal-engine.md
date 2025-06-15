# 虚幻引擎关卡流送概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/level-streaming-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:20.526Z

---

目录

![关卡流送概述](https://dev.epicgames.com/community/api/documentation/image/60e13417-52fb-4fff-8470-7eff50428a67?resizing_type=fill&width=1920&height=335)

关卡流送功能可以将地图文件加载到内存中，或者从内存中卸载，并在游戏过程中切换地图的可视性。 这样一来，场景便能拆分为较小的地图块，并且只有相关部分才会占用资源并被渲染。 正确设置后，开发者便能创建大型、无缝衔接的游戏场景，让玩家仿佛置身于"大世界"之中。

## 持久关卡

实现关卡无缝衔接的第一步是创建持久关卡（Persistent Level）。 你可以把它看作一个主关卡，用来管理加载或卸载哪些其他关卡。

## 流送关卡

流送关卡通过 [**Levels** 窗口](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine) 进行管理。它可与持久关卡重叠，或偏移创建更大的世界场景。 使用流送关卡的流送类型可设为 **Always Loaded** 或 **Blueprint**。右键单击关卡分段即可在 **Levels** 窗口中开启此设置。

流送关卡被设为 **Always Loaded**，它将与持久关卡一同加载。也将和持久关卡同时变为可见状态。 它将无视指定的流送体积域，以及来自蓝图或 C++ 的所有加载/卸载请求。 这类关卡分段常用于将持久关卡中的常见内容拆分为多个"层"，以便美术师同时协作工作而不会相互阻碍。如需了解此工作流程的更多内容， 请查阅 [管理多个关卡](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine)。游戏中，设为 **Always Loaded** 的关卡分段不会流出，除非游戏变更持久关卡。

![Persistent Level Alone](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48ec9c98-a68e-4410-8143-a6c97004d95f/persistentlevel.png)

![After Streaming In Levels](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfd8e02e-f32a-45c3-beba-828414230778/streamedinlevels.png)

Persistent Level Alone

After Streaming In Levels

### 动态流送方法

**Blueprint** 流送类型的流送关卡实际上会受到关卡流送体积域、蓝图或 C++ 代码的控制。 这些关卡可被动态加载或卸载。

### 关卡流送体积域

通过 **关卡流送体积域** 可轻松控制关卡流送。 原理十分简单：流送关卡的加载/卸载请求基于视点是否处于关卡相关的关卡流送体积域中而发出。

具体而言，关卡流送体积域可以两种方式使用：

-   **游戏** 中，玩家视点处于体积域中时，关卡流送体积域将使关卡加载；玩家视点处于体积域外时，关卡将卸载。
-   **编辑器** 中，关卡流送体积域可基于透视视口摄像机的位置自动隐藏/取消隐藏关卡，用于预览关卡流送。

基于体积域的关卡流送易于使用，不要求脚本编写，是控制关卡流送的理想方式。 此外，基于体积域的关卡流送和基于脚本的流送相比更易于维护：加载系统的需求发生变化时，调整体积域的大小即可对关卡加载/卸载行为进行修改。

-   [关卡流送体积参考](/documentation/zh-cn/unreal-engine/level-streaming-volumes-reference-in-unreal-engine)
-   [关卡流送指南](/documentation/zh-cn/unreal-engine/level-streaming-using-volumes-in-unreal-engine)

### 基于脚本的关卡流送

如需设置更复杂的关卡载入和卸载行为（与上例中的门解锁相似），也可设置关卡载入和卸载的蓝图或 C++ 逻辑。 关键函数为 **Load Stream Level** 和 **Unload Stream Level**，并指定关卡按命名加载。

在 **Load Stream Level** 和 **Unload Stream Level** 之外，**Get Streaming Level** 函数可实现更为动态的流送行为。 利用它访问实际的关卡流送对象后，即可修改和查询其状态。结合 **Create Instance** 使用此函数，也可创建并流入特定关卡分段的副本。 对这些副本应用变形和发送参数，即可创建程序化的世界场景。

-   [使用蓝图加载和卸载关卡](/documentation/zh-cn/unreal-engine/loading-and-unloading-levels-using-blueprints-in-unreal-engine)
-   [Loading and Unloading Levels using C++](/documentation/zh-cn/unreal-engine/loading-and-unloading-levels-using-cplusplus-in-unreal-engine)

-   [level streaming](https://dev.epicgames.com/community/search?query=level%20streaming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [持久关卡](/documentation/zh-cn/unreal-engine/level-streaming-overview-in-unreal-engine#%E6%8C%81%E4%B9%85%E5%85%B3%E5%8D%A1)
-   [流送关卡](/documentation/zh-cn/unreal-engine/level-streaming-overview-in-unreal-engine#%E6%B5%81%E9%80%81%E5%85%B3%E5%8D%A1)
-   [动态流送方法](/documentation/zh-cn/unreal-engine/level-streaming-overview-in-unreal-engine#%E5%8A%A8%E6%80%81%E6%B5%81%E9%80%81%E6%96%B9%E6%B3%95)
-   [关卡流送体积域](/documentation/zh-cn/unreal-engine/level-streaming-overview-in-unreal-engine#%E5%85%B3%E5%8D%A1%E6%B5%81%E9%80%81%E4%BD%93%E7%A7%AF%E5%9F%9F)
-   [基于脚本的关卡流送](/documentation/zh-cn/unreal-engine/level-streaming-overview-in-unreal-engine#%E5%9F%BA%E4%BA%8E%E8%84%9A%E6%9C%AC%E7%9A%84%E5%85%B3%E5%8D%A1%E6%B5%81%E9%80%81)