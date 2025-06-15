# 设置预滚 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-pre-roll
> 
> 生成时间: 2025-06-14T19:31:39.115Z

---

目录

![设置预滚](https://dev.epicgames.com/community/api/documentation/image/369603d3-20cb-405e-b03c-0df36b37b630?resizing_type=fill&width=1920&height=335)

## 预滚

使用 **预滚预热** 确保模拟在序列开始之前模拟准备就绪。

很多时候，特效元素要在镜头第一帧就可见。它也许是上一个镜头中爆炸的延续，也许是导弹尾迹，也许是从岩石上倾泻而下的瀑布。

我们可以使用几种方法处理Niagara系统预滚。每种方法各有优缺点。

## Niagara系统预热

每个系统都可以定义一个 **预热时间** 。它将告知Niagara在进行渲染之前刷新一段时间。因此，在Sequencer开始播放之前，系统就已执行预滚。

你可以在 **Niagara系统** 中或关卡中的 **Niagara系统实例** 上定义预热。在组件上搜索"warmup（预热）"：

![预热设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a7c0599-1d65-48ea-bc9a-dab9092f219a/warmupcomponentsettings.png)

## 系统生命周期轨道

有一个方法与预热时间类似，即在镜头开始之前使用 **系统生命周期轨迹** 偏移系统。这种方法可能更直观，因为可以从Sequencer中清楚地看到系统的开始和结束时间。

## Niagara预滚与引擎预滚

预热时间和系统生命周期轨道的预滚方法都受以下情况的影响：只有Niagara系统在执行预滚。如果世界中有任何东西在影响系统，比如碰撞或父变换等，预滚将不会将其考虑在内。

在以下视频中，你会发现在镜头开始之前，"滚动球"不会与立方体发生碰撞。

## MRQ：使用镜头切换进行预热

影片渲染队列（MRQ）在准备渲染镜头的同时还支持预热。这些设置在 **抗锯齿** 分段内。你需要激活的设置称为 **使用镜头切换进行预热（Use Camera Cut for Warm Up）** 。这种模式的好处是，它会刷新包括骨骼网格体在内的引擎，为Niagara提供更准确的互动环境。

![MRQ预热](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b48c7af6-d5dd-40fa-8961-21457675ad73/mrqwarmuptooltip.png)

## 影片渲染队列：渲染预热帧

MRQ认为有两种预热：仅引擎预热和渲染预热。仅刷新引擎是开销较低的选项，它不会把时间浪费在渲染不需要的帧上。但有几种情况需要渲染预热帧，以便Niagara系统能够正常工作。

最为显著的例子是使用 **深度图碰撞（Depth Map collisions）** 时。因为必须先渲染深度图，才会存在深度图。如果不激活"渲染预热帧（Render Warm Up Frames）"选项，则将无法正常运行GPU深度图碰撞。

其他用例包括针对场景颜色等查询 **Gbuffer** 时。

在抗锯齿设置分段中，激活"渲染预热帧（Render Warm Up Frames）"选项。

MRQ预热是一个功能强大的工具，但无法在编辑器中预览。但在许多情况下，这可能是最可靠的方法。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [预滚](/documentation/zh-cn/unreal-engine/setting-up-pre-roll#%E9%A2%84%E6%BB%9A)
-   [Niagara系统预热](/documentation/zh-cn/unreal-engine/setting-up-pre-roll#niagara%E7%B3%BB%E7%BB%9F%E9%A2%84%E7%83%AD)
-   [系统生命周期轨道](/documentation/zh-cn/unreal-engine/setting-up-pre-roll#%E7%B3%BB%E7%BB%9F%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%BD%A8%E9%81%93)
-   [Niagara预滚与引擎预滚](/documentation/zh-cn/unreal-engine/setting-up-pre-roll#niagara%E9%A2%84%E6%BB%9A%E4%B8%8E%E5%BC%95%E6%93%8E%E9%A2%84%E6%BB%9A)
-   [MRQ：使用镜头切换进行预热](/documentation/zh-cn/unreal-engine/setting-up-pre-roll#mrq%EF%BC%9A%E4%BD%BF%E7%94%A8%E9%95%9C%E5%A4%B4%E5%88%87%E6%8D%A2%E8%BF%9B%E8%A1%8C%E9%A2%84%E7%83%AD)
-   [影片渲染队列：渲染预热帧](/documentation/zh-cn/unreal-engine/setting-up-pre-roll#%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E9%98%9F%E5%88%97%EF%BC%9A%E6%B8%B2%E6%9F%93%E9%A2%84%E7%83%AD%E5%B8%A7)