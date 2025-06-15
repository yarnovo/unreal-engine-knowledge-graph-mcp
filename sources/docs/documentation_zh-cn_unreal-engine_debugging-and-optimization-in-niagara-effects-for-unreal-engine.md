# 在虚幻引擎中调试和优化Niagara效果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/debugging-and-optimization-in-niagara-effects-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:30:42.370Z

---

目录

![调试和优化Niagara](https://dev.epicgames.com/community/api/documentation/image/083de4b4-3751-4d35-960f-6e02f5b9d4e1?resizing_type=fill&width=1920&height=335)

虚幻引擎提供了若干种工具来帮助你调试模拟效果。

## 优化Niagara系统

[](/documentation/zh-cn/unreal-engine/optimizing-niagara)

[![优化Niagara](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5bb9779-c447-445f-9730-b2e95a2cf6c2/niagara-measure-perf-topic.png)](/documentation/zh-cn/unreal-engine/optimizing-niagara)

[优化Niagara](/documentation/zh-cn/unreal-engine/optimizing-niagara)

[了解如何优化虚幻引擎中的Niagara系统。](/documentation/zh-cn/unreal-engine/optimizing-niagara)

## Niagara调试器

将Niagara模拟效果添加到关卡后，如果你需要进一步调试，你可以使用 **Niagara调试器**。它允许你打开一个平显界面（HUD）并显示关卡中模拟的详细信息，例如正在生成的粒子数量、内存占用量等。你还可以捕捉信息快照，然后分析该输出。

[](/documentation/zh-cn/unreal-engine/niagara-debugger-for-unreal-engine)

[![Niagara调试器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39a8c719-5df8-4c9d-9e5b-10807e831461/topic-image.png)](/documentation/zh-cn/unreal-engine/niagara-debugger-for-unreal-engine)

[Niagara调试器](/documentation/zh-cn/unreal-engine/niagara-debugger-for-unreal-engine)

[使用Niagara调试器分析关卡中的Niagara系统。](/documentation/zh-cn/unreal-engine/niagara-debugger-for-unreal-engine)

## 使用效果类型管理性能预算

你可以新建一个"Niagara效果类型"资产，以便设置各种参数，帮助你在关卡中管理预算。任何使用该效果类型的Niagara系统都会继承你设置的规则。这样，你设置一套规则来提高性能，比如剔除一定距离外的粒子系统。

[](/documentation/zh-cn/unreal-engine/performance-budgeting-using-effect-types-in-niagara-for-unreal-engine)

[![使用效果类型管理性能预算](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45b32ac4-d08a-407e-9170-3b68ebab379a/performance-budgeting-topic-image.png)](/documentation/zh-cn/unreal-engine/performance-budgeting-using-effect-types-in-niagara-for-unreal-engine)

[使用效果类型管理性能预算](/documentation/zh-cn/unreal-engine/performance-budgeting-using-effect-types-in-niagara-for-unreal-engine)

[介绍如何使用效果类型来设置提高Niagara系统性能。](/documentation/zh-cn/unreal-engine/performance-budgeting-using-effect-types-in-niagara-for-unreal-engine)

## 如何修复GPU崩溃

某些Niagara效果包含大量图形效果，在Windows系统中渲染这些场景可能会导致GPU崩溃。请访问此页面，了解如何修复该问题。

[](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)

[![如何修复GPU驱动程序崩溃](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/189c3958-d728-47f6-8b42-dbb7d9b95d64/fix-a-gpu-crash-topic.png)](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)

[如何修复GPU驱动程序崩溃](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)

[了解如何在Windows中编辑注册表项来修复GPU驱动程序崩溃。](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [优化Niagara系统](/documentation/zh-cn/unreal-engine/debugging-and-optimization-in-niagara-effects-for-unreal-engine#%E4%BC%98%E5%8C%96niagara%E7%B3%BB%E7%BB%9F)
-   [Niagara调试器](/documentation/zh-cn/unreal-engine/debugging-and-optimization-in-niagara-effects-for-unreal-engine#niagara%E8%B0%83%E8%AF%95%E5%99%A8)
-   [使用效果类型管理性能预算](/documentation/zh-cn/unreal-engine/debugging-and-optimization-in-niagara-effects-for-unreal-engine#%E4%BD%BF%E7%94%A8%E6%95%88%E6%9E%9C%E7%B1%BB%E5%9E%8B%E7%AE%A1%E7%90%86%E6%80%A7%E8%83%BD%E9%A2%84%E7%AE%97)
-   [如何修复GPU崩溃](/documentation/zh-cn/unreal-engine/debugging-and-optimization-in-niagara-effects-for-unreal-engine#%E5%A6%82%E4%BD%95%E4%BF%AE%E5%A4%8Dgpu%E5%B4%A9%E6%BA%83)