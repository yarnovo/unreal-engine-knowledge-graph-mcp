# 虚幻引擎中的动画蓝图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:03:12.838Z

---

目录

![动画蓝图](https://dev.epicgames.com/community/api/documentation/image/f57beaa3-f149-4518-9a80-d20ebd3fc349?resizing_type=fill&width=1920&height=335)

**动画蓝图** 是一种特殊的 **蓝图**，它用于在游戏中控制 **骨骼网格体** 的动画效果。**动画蓝图编辑器（Animation Blueprint Editor）** 中的 **图表（Graphs）** 可以效果动画，允许你直接控制骨架的骨骼，或设置骨骼网格体逐帧逻辑，以便创建最终动画姿势。

该文档介绍了如何创建动画蓝图、使用动画编辑器及其主要功能。

#### 先决条件

-   你的项目中包含一个[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine).

## 动画蓝图创建

你可以通过以下方式来创建动画蓝图：

在 **内容浏览器（Content Browser）** 中，点击 **添加（+）（Add (+)）** 然后选择 **动画（Animation） > 动画蓝图（Animation Blueprint）**。然后，你需要指定动画蓝图的目标 **骨骼**。选中一个骨骼后点击 **创建（Create）**.

![创建动画蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8db2e86c-3a5f-43fc-9f7e-7e6991f5545e/create1.png)

对于这种创建方式，你可以选择指定一个 **模板动画蓝图（Template Animation Blueprint）**，也可以在想要创建子蓝图的情况下指定 **父蓝图（Parent Class）**。关于模板的更多信息，访问[动画蓝图链接](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine)页面。

在 **内容浏览器（Content Browser）** 中右键点击 **骨骼网格体资产（Skeletal Mesh Asset）**，然后选择 **创建（Create） > 动画蓝图（Anim Blueprint）**。这样也可以创建动画蓝图。

![创建动画蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ec3325c-1278-4eb7-b7c1-e6716f35b899/create2.png)

创建后，双击新建的 **动画蓝图（Animation Blueprint）** 来在 **动画蓝图编辑器（Animation Blueprint Editor）** 中打开。要了解该编辑器的界面、工具栏以及分区，参考[动画蓝图编辑器](/documentation/zh-cn/unreal-engine/animation-blueprint-editor-in-unreal-engine)页面。

[](/documentation/zh-cn/unreal-engine/animation-blueprint-editor-in-unreal-engine)

[![动画蓝图编辑器](images/static/document_list/empty_thumbnail.svg)](/documentation/zh-cn/unreal-engine/animation-blueprint-editor-in-unreal-engine)

[动画蓝图编辑器](/documentation/zh-cn/unreal-engine/animation-blueprint-editor-in-unreal-engine)

[动画蓝图编辑器及其界面概览](/documentation/zh-cn/unreal-engine/animation-blueprint-editor-in-unreal-engine)

### 指定给角色

动画蓝图本身并不会影响角色，除非你将它指定给某个角色。通常，你需要将它分配给角色的骨骼网格体（不论其是否在关卡中或者作为蓝图中的一个组件被引用）。

要分配动画蓝图，请选中你的骨骼网格体，然后设置以下属性：

-   将 **动画模式（Animation Mode）** 设为 **使用动画蓝图（Use Animation Blueprint）**。
-   将 **动画类（Anim Class）** 设为你的动画蓝图资产。

![将动画蓝图分配至角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37b2d0f3-1d0a-43f4-aaad-8668b3f16287/assign1.png)

## 使用动画蓝图

使用动画蓝图时，有几种功能和工作流程。从使用 **动画图表（AnimGraph）** 创建动画逻辑，再到使用 **链接动画实例（Linked Anim Instances）**, 动画蓝图为你提供了一整套强大的工具。

请参考以下页面，了解如何为你的角色创建强大的动画逻辑。

[

![动画蓝图编辑器](images/static/document_list/empty_thumbnail.svg)

动画蓝图编辑器

动画蓝图编辑器及其界面概览





](/documentation/zh-cn/unreal-engine/animation-blueprint-editor-in-unreal-engine)[

![在动画蓝图中使用图表功能](images/static/document_list/empty_thumbnail.svg)

在动画蓝图中使用图表功能

使用动画蓝图中的各种图表在骨骼网格体上编辑、混合和操控姿势。





](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine)[

![状态机](images/static/document_list/empty_thumbnail.svg)

状态机

使用状态机创建基于逻辑的分支动画。





](/documentation/zh-cn/unreal-engine/state-machines-in-unreal-engine)[

![动画节点参考](images/static/document_list/empty_thumbnail.svg)

动画节点参考

介绍动画蓝图中的各种动画节点





](/documentation/zh-cn/unreal-engine/animation-blueprint-nodes-in-unreal-engine)[

![动画插槽](images/static/document_list/empty_thumbnail.svg)

动画插槽

在动画图表中添加插入点来使用插槽播放动画。





](/documentation/zh-cn/unreal-engine/animation-slots-in-unreal-engine)[

![同步组](images/static/document_list/empty_thumbnail.svg)

同步组

使用同步组同步不同长度的动画周期。





](/documentation/zh-cn/unreal-engine/animation-sync-groups-in-unreal-engine)[

![动画蓝图链接](images/static/document_list/empty_thumbnail.svg)

动画蓝图链接

使用动画蓝图链接和模板将你的动画蓝图逻辑模块化。





](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [动画蓝图创建](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE%E5%88%9B%E5%BB%BA)
-   [指定给角色](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine#%E6%8C%87%E5%AE%9A%E7%BB%99%E8%A7%92%E8%89%B2)
-   [使用动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE)