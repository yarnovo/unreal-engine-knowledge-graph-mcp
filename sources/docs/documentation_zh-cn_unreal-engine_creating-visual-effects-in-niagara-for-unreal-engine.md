# 在虚幻引擎中创建视觉效果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:29:43.260Z

---

目录

![创建视觉效果](https://dev.epicgames.com/community/api/documentation/image/92c75b7d-eafe-41fb-afab-644db48c51d5?resizing_type=fill&width=1920&height=335)

![Niagara VFX Fluids](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40e4c66b-01c3-4d1c-a51b-9cad1e6d6998/physics-fluids-1.gif)

**Niagara VFX系统** 是虚幻引擎5（UE5）中创建和调整视觉效果（VFX）的主要工具。

在本页包含了有关Niagara VFX系统的文档链接，其中包括一篇概述以及一篇快速入门指南，它们将有助于你快速上手。如果你是Niagara的新用户，建议你先查看 **入门** 部分，其中包含Niagara编辑器的高级概述、快速入门指南、以及一篇阐述Niagara核心概念和设计理念的文档。

你也可以查看 **指南** 部分，其中包含针对各种任务的指南。

**参考（Reference）** 部分包含"系统和发射器模块参考"、"Niagara编辑器UI参考"、以及"Niagara脚本编辑器UI参考"。

## 入门教程

初次学习Niagara时，入门页面能起到很大帮助。页面内容包含Niagara的概述、涉及Niagara架构的关键概念，以及一个帮助你快速上手的简单教程。

如果你想更进一步，请学习这些教程，它们将一步步指导你创建一些新项目。通过练习一些不同的效果，你将很快掌握如何创建Niagara系统。

[](/documentation/zh-cn/unreal-engine/getting-started-in-niagara-effects-for-unreal-engine)

[![Niagara入门介绍](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2bcd556-507f-4279-8029-c91ac5b69c1f/topic-image.png)](/documentation/zh-cn/unreal-engine/getting-started-in-niagara-effects-for-unreal-engine)

[Niagara入门介绍](/documentation/zh-cn/unreal-engine/getting-started-in-niagara-effects-for-unreal-engine)

[本文收集了与Niagara相关的所有学习材料。](/documentation/zh-cn/unreal-engine/getting-started-in-niagara-effects-for-unreal-engine)

[

![Niagara教程](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/490dc916-f797-445f-ac47-a47df1ed146e/topic-image.png)

Niagara教程

使用Niagara视觉效果系统创作视觉效果的相关指南。





](/documentation/zh-cn/unreal-engine/tutorials-for-niagara-effects-in-unreal-engine)

## Niagara功能

请进一步探索Niagara的功能，了解系统的各种作用、流体，以及实验性的GPU光线追踪碰撞模块。

对于高级用户来说，Niagara提供的初始模块可能无法满足其期望的效果。你可以使用Niagara脚本编辑器来调整现有模块，或创建自己的模块。

[](/documentation/zh-cn/unreal-engine/niagara-fluids-in-unreal-engine)

[![虚幻引擎中的Niagara流体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8faabd3d-e0c1-4abe-8767-78b4f902a6ae/niagara-fluids-topic.png)](/documentation/zh-cn/unreal-engine/niagara-fluids-in-unreal-engine)

[虚幻引擎中的Niagara流体](/documentation/zh-cn/unreal-engine/niagara-fluids-in-unreal-engine)

[学习制作火焰和烟雾等实时动态流体效果。](/documentation/zh-cn/unreal-engine/niagara-fluids-in-unreal-engine)

[

![Niagara中的碰撞](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12ee5c4b-77c7-48ec-95ba-86cf666d7eb9/collisions-topic.png)

Niagara中的碰撞

学习Niagara中的碰撞机制。





](/documentation/zh-cn/unreal-engine/collisions-in-niagara-for-unreal-engine)[

![创建自定义模块](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27aab86f-8cf9-40ce-859b-4d00c73dccd8/topic-image.png)

创建自定义模块

本文收集了所有关于如何在Niagara中创建自定义模块的教程页面。





](/documentation/zh-cn/unreal-engine/creating-custom-modules-in-niagara-effects-for-unreal-engine)[

![Niagara数据通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5336fe0-cad4-4d98-b7a2-c8e6712b38b8/niagara-landing-topic.png)

Niagara数据通道

关于Niagara数据通道功能的文档。





](/documentation/zh-cn/unreal-engine/data-channels-in-niagara-for-unreal-engine)[

![Niagara轻量级发射器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b364af05-ccf4-4d19-a8c8-592c87ff9b78/niagara-landing-topic.png)

Niagara轻量级发射器

Niagara轻量级发射器文档。





](/documentation/zh-cn/unreal-engine/niagara-lightweight-emitters)

## 在Niagara中进行调试和优化

随着你逐渐熟悉这些工具，你可能会想了解如何完善Niagara效果。调试绘制工具有助于将部分模块的组件可视化。Niagara调试器能够对关卡中的模拟进行实时的性能分析。

[](/documentation/zh-cn/unreal-engine/debugging-and-optimization-in-niagara-effects-for-unreal-engine)

[![调试和优化Niagara](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9541ff41-1bda-4944-a347-eecfae360d73/topic-image.png)](/documentation/zh-cn/unreal-engine/debugging-and-optimization-in-niagara-effects-for-unreal-engine)

[调试和优化Niagara](/documentation/zh-cn/unreal-engine/debugging-and-optimization-in-niagara-effects-for-unreal-engine)

[学习如何调试并优化你的Niagara模拟效果。](/documentation/zh-cn/unreal-engine/debugging-and-optimization-in-niagara-effects-for-unreal-engine)

## 参考

最后，如果你对用户界面、特定按钮或模块的详细功能有任何疑问，请查看参考页面。

[](/documentation/zh-cn/unreal-engine/reference-for-niagara-effects-in-unreal-engine)

[![Niagara参考页面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d60a2af2-3e68-4af2-b28a-ec4ee0e3fb48/topic-image.png)](/documentation/zh-cn/unreal-engine/reference-for-niagara-effects-in-unreal-engine)

[Niagara参考页面](/documentation/zh-cn/unreal-engine/reference-for-niagara-effects-in-unreal-engine)

[本文收集了Niagara相关的所有参考页面。](/documentation/zh-cn/unreal-engine/reference-for-niagara-effects-in-unreal-engine)

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门教程](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine#%E5%85%A5%E9%97%A8%E6%95%99%E7%A8%8B)
-   [Niagara功能](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine#niagara%E5%8A%9F%E8%83%BD)
-   [在Niagara中进行调试和优化](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine#%E5%9C%A8niagara%E4%B8%AD%E8%BF%9B%E8%A1%8C%E8%B0%83%E8%AF%95%E5%92%8C%E4%BC%98%E5%8C%96)
-   [参考](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine#%E5%8F%82%E8%80%83)