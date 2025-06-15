# 从虚幻引擎中的Sequencer触发关卡蓝图事件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/trigger-level-blueprint-events-from-sequencer-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:08.110Z

---

目录

![从Sequencer触发关卡蓝图事件](https://dev.epicgames.com/community/api/documentation/image/75943d1c-4ee6-4bda-aceb-91e69cadb1e5?resizing_type=fill&width=1920&height=335)

[事件轨道](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine)主要用于在Sequencer的 **导演蓝图（Director Blueprint）** 中触发[蓝图脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。在你的项目中，可能在一些情况下，你需要Sequencer中的事件在其他蓝图中触发，例如 **关卡蓝图（Level Blueprint）** 。你可以使用[蓝图接口](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine)执行此操作，并在导演蓝图中执行额外的设置步骤。

本文档介绍如何从Sequencer的事件轨道触发关卡蓝图事件。

#### 先决条件

-   你已经基本理解如何创建和打开[关卡序列](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)。
-   你已经理解如何创建和使用[事件轨道](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine)。
-   你已经基本理解[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。

## 创建蓝图接口

首先，创建蓝图接口。在 **内容浏览器（Content Browser）** 中，点击 **添加（Add (+)）** ，然后选择 **蓝图（Blueprints）> 蓝图接口（Blueprint Interface）** 。命名你的资产，并将其打开。

![创建蓝图接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ce0faaa-e6ce-4505-aab2-57bb88302fce/createbpi1.png)

在 **蓝图接口编辑器（Blueprint Interface Editor）** 中，为默认函数提供唯一名称，方便稍后在本指南中查找。

![命名蓝图接口函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6c9827f-d310-48ad-8d5a-13f7255a1935/createbpi2.png)

蓝图接口的用途是提供Sequencer导演蓝图和关卡蓝图之间的通信。

## 在关卡中实现接口

接下来，在 **关卡工具栏（Level Toolbar）** 中点击 **关卡蓝图（Level Blueprint）** 并选择 **打开关卡蓝图（Open Level Blueprint）** 以打开关卡蓝图。

![打开关卡蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87f3028a-3969-411b-9c3a-c4e8316f3f1f/level1.png)

启用 **类设置（Class Settings）** ，并在 **细节（Details）** 面板中点击 **继承的接口（Inherited Interfaces）** 的 **添加（Add）** 下拉菜单。找到并选择你的蓝图接口，将其添加到关卡蓝图。

![实现关卡蓝图中的蓝图接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4909627-7093-4716-ba68-27dca62c7a09/level2.png)

右键点击 **事件图表（Event Graph）** 并从蓝图接口添加 **事件（Event）** 。事件名称与你之前在本指南中命名的函数名称匹配。添加该事件，并将其连接到你想触发的关卡蓝图逻辑。由于蓝图具有任意性，本指南将假定你的关卡蓝图逻辑已经创建。在本示例中，该逻辑会激活[Niagara系统](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)。

![参考关卡蓝图逻辑中的蓝图接口事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e6f11eb-da63-4570-9845-7f84fa694443/level3.png)

## 设置事件轨道

现在逻辑的关卡蓝图端已设置好，你可以在Sequencer的事件轨道中实现逻辑的其余部分。

打开 **关卡序列（Level Sequence）** ，然后创建 **事件轨道（Event Track）** ，方法是点击 **添加轨道（Add Track (+)）> 事件轨道（Event Track）> 触发器（Trigger）** 。

![创建事件轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddf90c62-cc62-470a-8f01-806872f47ff9/eventtrack1.png)

选择 **事件轨道（Event Track）** 并按 **Enter** 键在播放头创建 **事件关键帧（Event keyframe）** 。双击此关键帧，打开 **导演蓝图（Director Blueprint）** 并将该关键帧绑定到新的 **事件（Event）** 。

![创建事件关键帧](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9b1bfe9-81d0-4de1-a6e8-930079201f64/eventtrack2.gif)

### 实现接口

按照你之前在关卡蓝图中的操作，在 **导演蓝图（Director Blueprint）** 中启用 **类设置（Class Settings）** ，然后在 **细节（Details）** 面板中点击 **继承的接口（Inherited Interfaces）** 的 **添加（Add）** 下拉菜单。找到并选择你的 **蓝图接口（Blueprint Interface）** ，将其添加到关卡蓝图。

![实现导演蓝图中的蓝图接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12f981bf-65c4-4720-97a3-73750bf22ad9/level2.png)

### 创建逻辑

右键点击 **导演蓝图图表（Director Blueprint Graph）** ，在 **调用函数（Call Function）** 类别下，从你的蓝图接口添加 **函数（Function）** 。函数名称与你之前在本指南中命名的函数名称匹配。

![参考蓝图接口函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e45efe3-f81f-4d14-9fb9-17b751fd9ebf/eventtrack3.png)

确保你使用的是以你的序列导演蓝图为目标的蓝图接口函数。其他函数目标将不起作用。

![确保函数以序列导演为目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de832cc9-3100-451b-af0a-1cc7c58832fc/eventtrack4.png)

将 **执行（execution）** 和 **目标（target）** 引脚连接到 **事件（Event）** 。

![将函数连接到事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51611448-365e-4596-b6e6-93d9cb6de93d/eventtrack5.gif)

### 将关键帧绑定到目标

最后，返回到 **事件轨道（Event Track）** 并右键点击 **关键帧（keyframe）** 。在 **属性（Properties）** 菜单下，将 **将边界对象传递到（Pass Bound Object To）** 设置为 **目标（Target）** 。

![将](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f7350c8-d63a-4798-a4ce-5b9c624ab7ba/eventtrack6.png)

尽管没有实际目标，但连接和绑定 **目标（Target）** 是必要步骤。这是因为，没有指定目标时，蓝图接口系统会回退到关卡蓝图，然后正确地链接到其中的接口。

## 结果

完成上述步骤后，现在你可以运行或模拟你的关卡。运行序列时，关卡事件应该会触发。

![sequencer事件触发关卡事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a1ae8a9-0e8f-4fa2-b717-23c60615c9fc/final.gif)

-   [trigger](https://dev.epicgames.com/community/search?query=trigger)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/trigger-level-blueprint-events-from-sequencer-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建蓝图接口](/documentation/zh-cn/unreal-engine/trigger-level-blueprint-events-from-sequencer-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BE%E6%8E%A5%E5%8F%A3)
-   [在关卡中实现接口](/documentation/zh-cn/unreal-engine/trigger-level-blueprint-events-from-sequencer-in-unreal-engine#%E5%9C%A8%E5%85%B3%E5%8D%A1%E4%B8%AD%E5%AE%9E%E7%8E%B0%E6%8E%A5%E5%8F%A3)
-   [设置事件轨道](/documentation/zh-cn/unreal-engine/trigger-level-blueprint-events-from-sequencer-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E4%BA%8B%E4%BB%B6%E8%BD%A8%E9%81%93)
-   [实现接口](/documentation/zh-cn/unreal-engine/trigger-level-blueprint-events-from-sequencer-in-unreal-engine#%E5%AE%9E%E7%8E%B0%E6%8E%A5%E5%8F%A3)
-   [创建逻辑](/documentation/zh-cn/unreal-engine/trigger-level-blueprint-events-from-sequencer-in-unreal-engine#%E5%88%9B%E5%BB%BA%E9%80%BB%E8%BE%91)
-   [将关键帧绑定到目标](/documentation/zh-cn/unreal-engine/trigger-level-blueprint-events-from-sequencer-in-unreal-engine#%E5%B0%86%E5%85%B3%E9%94%AE%E5%B8%A7%E7%BB%91%E5%AE%9A%E5%88%B0%E7%9B%AE%E6%A0%87)
-   [结果](/documentation/zh-cn/unreal-engine/trigger-level-blueprint-events-from-sequencer-in-unreal-engine#%E7%BB%93%E6%9E%9C)