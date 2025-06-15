# 虚幻引擎中的虚拟堪景 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-scouting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:21.918Z

---

目录

![虚拟堪景](https://dev.epicgames.com/community/api/documentation/image/890ca6b9-932d-43c3-b525-f9422d0a9fb9?resizing_type=fill&width=1920&height=335)

## 概述

电影人能利用 **虚拟堪景工具** 在虚拟制片环境中导航和交互。导演和摄影指导（DOP）可轻松找到拍摄位置、设计镜头、设置场景布局，并获得拍摄位置的准确展示。美术师和布景师可在虚拟现实（VR）中一边体验拍摄位置，一边搭建布景，使用测量和交互工具检查距离并修改场景。你也可在虚拟场景中采集图像，帮助制片团队追踪在VR会话中做出的决定。你还可以直接利用蓝图自定义控制器和设置项，无需使用C++，也无需重新编译引擎。

虚幻引擎的虚拟堪景工具基于XR创意框架设计，该框架为开发者提供了一套[工具包](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine)，可使用蓝图创建基于头显设备的增强现实（XR）工具。

未来的引擎版本将逐步减少使用并最终弃用[旧版虚拟堪景工具](/documentation/zh-cn/unreal-engine/virtual-scouting-legacy-tools)。推荐用户使用新版虚拟堪景工具。未来的引擎版本将彻底废弃未使用的VREditor代码和模块。

## 先决条件

新版工具要求使用虚幻引擎5.4或更高版本，需要使用Windows计算机，硬件配置必须支持VR，以及任意一种下列头显设备：

-   Meta Quest 2
-   Meta Quest 3
-   Meta Quest Pro
-   Oculus Rift S
-   Valve Index

## 设置

如果你满足这些先决条件且希望开始使用虚拟堪景，请参阅[设置虚拟堪景](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine)文档。

-   [virtual scouting](https://dev.epicgames.com/community/search?query=virtual%20scouting)
-   [concept](https://dev.epicgames.com/community/search?query=concept)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/virtual-scouting-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [先决条件](/documentation/zh-cn/unreal-engine/virtual-scouting-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [设置](/documentation/zh-cn/unreal-engine/virtual-scouting-in-unreal-engine#%E8%AE%BE%E7%BD%AE)