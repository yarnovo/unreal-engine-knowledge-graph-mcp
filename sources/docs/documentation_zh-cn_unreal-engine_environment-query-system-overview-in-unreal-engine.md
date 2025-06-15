# 场景查询系统概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/environment-query-system-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:44:19.369Z

---

目录

![场景查询系统概述](https://dev.epicgames.com/community/api/documentation/image/cd010288-2b43-4913-9260-7b4b429d1e67?resizing_type=fill&width=1920&height=335)

**场景查询系统**（简称EQS）是虚幻引擎5（UE）AI工具中的一种功能，可用于收集场景相关的数据。然后该系统可以使用[生成器](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine)，通过各种用户定义的[测试](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine)就这些数据提问，返回符合所提问题类型的最佳 **项目（Item）**。EQS的一些使用范例包括：找到最近的回复剂或弹药、判断出威胁最大的敌人，或者找到能看到玩家的视线（下面就会显示这样的一个示例）。 

![Find line of sight to the Player](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdc742e5-027b-4880-84a0-32a889f31786/environment-query-system-overview-find-player.png)

EQS背后的概念和理论来自虚幻引擎3的 **场景战术查询**（ETQ）系统，可在以下文章中读到关于该系统的更多内容：[询问场景智能问题](https://epicgames.box.com/s/b5vbufy1pp58k638wkrdp6xeht53k1zb)。

## EQS基础

EQS查询资源可以在 **内容浏览器** 中创建，并可在特殊的 **场景查询编辑器** 中编辑。场景查询编辑器是一个基于节点的编辑器，可以在其中添加生成器节点来生成项目（Item），添加需要在这些项目上运行的测试，以及运行它们的[情境](/documentation/zh-cn/unreal-engine/eqs-node-reference-contexts-in-unreal-engine)。虚幻引擎默认提供了多种生成器类型，但用户可以通过蓝图创建自己的自定义生成器（还可通过C++创建，这样执行更快）。 

![Add a Distance Test to our existing Generator](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23764af9-c593-4ea5-a494-577b79832af0/environment-query-system-adding-a-test.png)

*在上面我们对现有的生成器添加了一个 **距离** 测试。*

与生成器类似，可以运行多种不同类型的测试来过滤返回的项目（Item）和（或）对其计分。与生成器不同的是，自定义测试只能通过C++创建。可以将多个测试添加到一个生成器，这是缩小返回项目（Item）结果范围的常见做法。对生成器添加测试的顺序并不重要，因为过滤测试都会在计分测试之前执行。这是为了减少返回且需要计分的项目（Item）。请参见下表了解测试类型。 

节点类型

描述

**生成器**

生成统称为 **项目（Item）** 的位置或Actor，系统将对它们进行测试和加权。

**情景**

这是各种测试和生成器的参考框架。

**测试**

这是场景查询系统确定来自生成器的项目（Item）是否为"最佳"选项的方式。

请参见[EQS节点参考](/documentation/zh-cn/unreal-engine/environment-query-system-node-reference-in-unreal-engine)页面，了解每种类型节点的更多信息。

设置EQS查询后，就可以使用 **运行EQS查询（Run EQS Query）** 任务节点通过[行为树](/documentation/zh-cn/unreal-engine/behavior-trees-in-unreal-engine)来运行。 

![Run EQS Query Task node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d6ce770-f66e-4ec7-ad32-4308dd8dc824/environment-query-system-overview-run-environment-query-system-1.png)

欲知创建和使用EQS查询的完整介绍，请参见[EQS快速入门指南](/documentation/zh-cn/unreal-engine/environment-query-system-quick-start-in-unreal-engine)。

## 启用EQS

在使用EQS之前，需要从 **项目设置（Project Settings）** 菜单将其启用。

-   如有需要，在 **设置（Settings）> 插件（Plugins）** 部分，启用 **场景查询系统（Environmental Query System）** 选项。
    
    ![Enable the Environment Query Editor option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3de4336f-3b52-4d26-8f3e-c1a868f127af/environment-query-system-user-guide-enable-environment-query-system.png)

## 预览EQS查询

可以在编辑器中预览EQS查询的结果，会以调试球体显示加权/过滤后的结果。 

![Debug Spheres](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f89353fc-8362-4b55-bccf-639bdcbf07ad/environment-query-system-user-guide-preview.png)

在上图中，我们调试了一个EQS查询，它返回了能看到关卡中角色的一个位置。 

欲知更多信息，请参见[AI调试](/documentation/zh-cn/unreal-engine/ai-debugging-in-unreal-engine)或[EQS测试Pawn](/documentation/zh-cn/unreal-engine/environment-query-testing-pawn-in-unreal-engine)。

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [eqs](https://dev.epicgames.com/community/search?query=eqs)
-   [environment query system](https://dev.epicgames.com/community/search?query=environment%20query%20system)
-   [eqs essentials](https://dev.epicgames.com/community/search?query=eqs%20essentials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [EQS基础](/documentation/zh-cn/unreal-engine/environment-query-system-overview-in-unreal-engine#eqs%E5%9F%BA%E7%A1%80)
-   [启用EQS](/documentation/zh-cn/unreal-engine/environment-query-system-overview-in-unreal-engine#%E5%90%AF%E7%94%A8eqs)
-   [预览EQS查询](/documentation/zh-cn/unreal-engine/environment-query-system-overview-in-unreal-engine#%E9%A2%84%E8%A7%88eqs%E6%9F%A5%E8%AF%A2)