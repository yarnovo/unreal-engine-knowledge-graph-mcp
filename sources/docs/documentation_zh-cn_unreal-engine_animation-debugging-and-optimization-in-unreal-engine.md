# 虚幻引擎中的动画调试和优化 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-debugging-and-optimization-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:47.373Z

---

目录

![动画调试和优化](https://dev.epicgames.com/community/api/documentation/image/0466618a-b5c1-41c3-bb89-375dbf1dbcf2?resizing_type=fill&width=1920&height=335)

**虚幻引擎** 提供了一套调试和优化工具和技术，可用于简化项目的动画系统，从而提高性能并减小文件大小。以下文档将介绍可用于在虚幻引擎中完善和优化动画系统的工具和功能。

## 调试工具

虚幻引擎提供了一些调试工具，可用于在受控环境中分析动画系统，以便进行调整并找到问题的解决方案。

### 倒回调试器

使用[倒回调试器（Rewind Debugger）](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine)可以录制项目 **在编辑器中运行**（**Play In Editor，简称PIE**）Gameplay的片段，然后使用基于时间轴的可视化界面实时浏览录制的内容以观察过渡行为、变量值、姿势混合等。录制的Gameplay提供了比传统模拟更稳定的工作过程，并且可以保留不正确的动画行为以便于协作和调试。

如需了解关于使用 **倒回调试器** 来调试动画系统的更多信息，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine)

[![Rewind调试器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d775aaa-74b2-43c2-87c9-dacd4c7eb84a/topicimage.png)](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine)

[Rewind调试器](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine)

[通过Rewind调试器，你可以录制项目的实时片段并保留数据用于调试工作流程。](/documentation/zh-cn/unreal-engine/animation-rewind-debugger-in-unreal-engine)

### Animation Insights

可以使用[Animation Insights](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine) [插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)来分析项目的动画系统，以查看一段时间内所有操作的可视化图表。此图表可用来确定正在评估的动画进程、这些进程使用的性能预算以及时间，以便做出明智的优化选择，实现项目所需的性能质量。

如需了解关于使用 **Animation Insights** 来分析动画系统的更多信息，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine)

[![Animation Insights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/235e25e9-f0c1-49d2-8daa-b6ccbd789ab5/topicimage.png)](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine)

[Animation Insights](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine)

[使用Animation Insights来观察和分析你的项目在运行期间的游戏和动画性能。](/documentation/zh-cn/unreal-engine/animation-insights-in-unreal-engine)

### 姿势观察

在使用复杂的动画蓝图和分层动画系统时，可以在个体动画数据源项目模拟期间使用[姿势观察（Pose Watching）](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine#%E5%A7%BF%E5%8A%BF%E8%A7%82%E5%AF%9F)在视口中切换动态可视化调试渲染。渲染个体动画源时，可以直观地隔离每个节点或层对最终输出姿势的影响，从而确定动画系统中错误或不规则动画行为的来源。

如需了解关于使用 **姿势观察** 来调试动画系统的更多信息，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine)

[![动画生产率提示与技巧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea35322b-e892-4e1f-a928-196f52bfdfb5/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine)

[动画生产率提示与技巧](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine)

[面向动画师和动画程序员的工作流提示和技巧。](/documentation/zh-cn/unreal-engine/animation-shortcuts-and-tips-unreal-engine)

## 动画优化

可以使用[动画优化](/documentation/zh-cn/unreal-engine/animation-optimization-in-unreal-engine)技术和功能来提高动画系统的性能和质量并减小文件大小。

如需了解关于虚幻引擎中的 **动画优化** 的更多信息，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/animation-optimization-in-unreal-engine)

[![动画优化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7570a0d-7223-4bf9-9291-f93e82df2314/topicimage.png)](/documentation/zh-cn/unreal-engine/animation-optimization-in-unreal-engine)

[动画优化](/documentation/zh-cn/unreal-engine/animation-optimization-in-unreal-engine)

[使用各种方法和技术优化动画蓝图的性能和稳定性。](/documentation/zh-cn/unreal-engine/animation-optimization-in-unreal-engine)

### 动画预算分配器

[动画预算分配器（Animation Budget Allocator）](/documentation/zh-cn/unreal-engine/animation-budget-allocator-in-unreal-engine)是虚幻引擎的一个[插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)，可用于限制多个角色的动画评估和质量，以降低项目整个动画系统的性能成本。

如需了解关于使用 **动画预算分配器** 来优化动画系统的更多信息，请参阅以下文档：

[](/documentation/zh-cn/unreal-engine/animation-budget-allocator-in-unreal-engine)

[![动画预算分配器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0eb9e5fd-8669-419b-87c0-63b6088cd433/topicimage.png)](/documentation/zh-cn/unreal-engine/animation-budget-allocator-in-unreal-engine)

[动画预算分配器](/documentation/zh-cn/unreal-engine/animation-budget-allocator-in-unreal-engine)

[该系统用于通过动态限制骨骼网格体组件更新，约束动画数据所用时间。](/documentation/zh-cn/unreal-engine/animation-budget-allocator-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [调试工具](/documentation/zh-cn/unreal-engine/animation-debugging-and-optimization-in-unreal-engine#%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7)
-   [倒回调试器](/documentation/zh-cn/unreal-engine/animation-debugging-and-optimization-in-unreal-engine#%E5%80%92%E5%9B%9E%E8%B0%83%E8%AF%95%E5%99%A8)
-   [Animation Insights](/documentation/zh-cn/unreal-engine/animation-debugging-and-optimization-in-unreal-engine#animationinsights)
-   [姿势观察](/documentation/zh-cn/unreal-engine/animation-debugging-and-optimization-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E8%A7%82%E5%AF%9F)
-   [动画优化](/documentation/zh-cn/unreal-engine/animation-debugging-and-optimization-in-unreal-engine#%E5%8A%A8%E7%94%BB%E4%BC%98%E5%8C%96)
-   [动画预算分配器](/documentation/zh-cn/unreal-engine/animation-debugging-and-optimization-in-unreal-engine#%E5%8A%A8%E7%94%BB%E9%A2%84%E7%AE%97%E5%88%86%E9%85%8D%E5%99%A8)

相关文档

[

Unreal Insights

![Unreal Insights](https://dev.epicgames.com/community/api/documentation/image/f3818740-1216-4fbb-bff6-249ed0ed43ef?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)