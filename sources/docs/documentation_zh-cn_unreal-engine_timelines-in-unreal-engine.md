# 虚幻引擎中的时间轴 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/timelines-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:09.948Z

---

目录

![时间轴](https://dev.epicgames.com/community/api/documentation/image/60317b9b-225c-493e-9999-72dc14655094?resizing_type=fill&width=1920&height=335)

编程语言

×C++

从下拉菜单中选择一个选项以查看与之相关的内容

## 概览（C++）

**UTimelineComponent**包含一系列的**事件**、**浮点数**、**向量**或**颜色**以及和各项所关联的**关键帧**。 以上项目均继承自UActorComponents

如需了解更多文档，请参阅关于[Actor组件](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/components-in-unreal-engine)的概述

时间轴可以实现从事件中播放基于时间的动画，这些事件可以沿着时间轴在关键帧处触发。 可以使用时间轴来处理简单的非动画任务，例如开门、更改光源或对场景中的Actor执行其他以时间为中心的操纵。 这种方式与[关卡序列](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)相似，因为它们都提供要在时间轴上的关键帧之间内插的值，例如浮点、向量和颜色。

## 输入和输出

UTimelineComponents具有可以在原生代码中扩展的可靠方法，详情请参阅UTimelineComponentAPI参考文档。 如果要查看有关如何在引擎中使用时间轴组件的示例，请点击下方的时间轴示例链接之一。

ExampleTimeline.h

```
/** Start playback of timeline */
	UFUNCTION(BlueprintCallable, Category="Components|Timeline")
	ENGINE_API void Play();

	/** Start playback of timeline from the start */
	UFUNCTION(BlueprintCallable, Category="Components|Timeline")
	ENGINE_API void PlayFromStart();

	/** Start playback of timeline in reverse */
	UFUNCTION(BlueprintCallable, Category="Components|Timeline")
```

展开代码复制完整片段(37行长度)

## 时间轴示例

[

![关键帧和曲线](https://dev.epicgames.com/community/api/documentation/image/05f90a5a-0fb3-49d9-a807-d70d1c39c8f7?resizing_type=fit&width=640&height=640)

关键帧和曲线

文本档概述如何在蓝图中使用时间轴编辑器内的关键帧和曲线。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/keys-and-curves-in-unreal-engine)[

![实现灯光闪烁](https://dev.epicgames.com/community/api/documentation/image/07d2bedf-db92-49da-bcbd-a72215dd3e8a?resizing_type=fit&width=640&height=640)

实现灯光闪烁

本文是一篇关于时间轴的示例。在这里示例中，我们将实现一盏可随时间闪烁并改变颜色的灯光。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fading-lights-in-unreal-engine)[

![开门](https://dev.epicgames.com/community/api/documentation/image/2241631b-370e-480b-9ceb-5720a2783a8c?resizing_type=fit&width=640&height=640)

开门

一个关于时间轴（Timeline）的案例。介绍了如何用时间轴以及蓝图和C++来实现玩家靠近门后，门会自动打开的效果。





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/opening-doors-in-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [蓝图](https://dev.epicgames.com/community/search?query=%E8%93%9D%E5%9B%BE)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概览（C++）](/documentation/zh-cn/unreal-engine/timelines-in-unreal-engine#%E6%A6%82%E8%A7%88%EF%BC%88c++%EF%BC%89)
-   [输入和输出](/documentation/zh-cn/unreal-engine/timelines-in-unreal-engine#%E8%BE%93%E5%85%A5%E5%92%8C%E8%BE%93%E5%87%BA)
-   [时间轴示例](/documentation/zh-cn/unreal-engine/timelines-in-unreal-engine#timeline-examples)