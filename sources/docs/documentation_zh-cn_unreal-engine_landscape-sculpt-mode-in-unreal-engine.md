# 虚幻引擎中的地形雕刻模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-sculpt-mode-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:12:24.295Z

---

目录

![雕刻模式](https://dev.epicgames.com/community/api/documentation/image/5cb2e831-6386-4943-945c-58713a1f2139?resizing_type=fill&width=1920&height=335)

地形雕刻本质上是修改高度图，而这涉及到许多工具。在这些工具中，既有一些最简单的雕刻工具（例如借助笔刷和强度刻度来绘制高度值），也有一些通过复杂算法来实现效果的工具（比如侵蚀效果）。每种工具有提供了一组参数，用于调整它们对地形的影响效果。

![Tools available in Landscape Sculpt Mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5b84c5e-7f36-4c0b-8cb5-85cc3dadfe7a/sculpt-mode-tools.png)

## 工具使用流程

在[创建完地形](/documentation/zh-cn/unreal-engine/creating-landscapes-in-unreal-engine)后，地形工具将显示剩余功能选项。点击 **雕刻（Sculpt）** 模式选项卡，开始雕刻。

选中后，选项卡下方的各种雕刻工具以及[笔刷类型和衰减类型](/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine)将变为可用；你可以通过笔刷将它们的效果添加到地形上。

![Sculpt Mode tab](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d4b233d-8822-4507-96e2-f26ee8444f96/sculpt-mode-tab.png)

选中雕刻工具后，可以用以下控制选项来雕刻地形：

**常见操控**

**作用**

**鼠标左键**

执行一次笔刷操作，将所选工具的效果以叠加方式添加到高度图上并提升地形。

**鼠标左键 + Shift**

执行一次笔刷操作，将所选工具的效果以减法方式添加到高度图上并降低地形。

**Ctrl + Z**

撤销最后一次操作。

**Ctrl + Y**

恢复上一次撤销的操作。

## 雕刻工具

**雕刻工具** 用于以多种方式修改地形的形状。查看下文，了解各种雕刻选项：

## 区域工具

**区域工具** 用于对地形的特定区域执行操作。查看下文，了解各种区域选项：

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工具使用流程](/documentation/zh-cn/unreal-engine/landscape-sculpt-mode-in-unreal-engine#%E5%B7%A5%E5%85%B7%E4%BD%BF%E7%94%A8%E6%B5%81%E7%A8%8B)
-   [雕刻工具](/documentation/zh-cn/unreal-engine/landscape-sculpt-mode-in-unreal-engine#%E9%9B%95%E5%88%BB%E5%B7%A5%E5%85%B7)
-   [区域工具](/documentation/zh-cn/unreal-engine/landscape-sculpt-mode-in-unreal-engine#%E5%8C%BA%E5%9F%9F%E5%B7%A5%E5%85%B7)

相关文档

[

地形笔刷

![地形笔刷](https://dev.epicgames.com/community/api/documentation/image/f4a3a09c-410e-4b1a-ba4b-e7d427de16c7?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/landscape-brushes-in-unreal-engine)