# 虚幻引擎蓝图可视化脚本介绍 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:06.682Z

---

目录

![蓝图简介](https://dev.epicgames.com/community/api/documentation/image/333c5981-3114-43f7-94f0-2a46944d32f4?resizing_type=fill&width=1920&height=335)

虚幻引擎中的 **蓝图可视化脚本（Blueprint Visual Scripting）** 系统是使用基于节点的接口创建Gameplay元素的可视化编程语言。基于节点的工作流程为设计师提供了通常只有程序员才能使用的广泛脚本概念和工具。此外，在虚幻引擎的C++实现方案中，可用的蓝图特有标记可以让程序员创建基线系统，并让设计师扩展这些系统。

就像许多常用的脚本语言，你可以使用该系统在引擎中定义面向对象（OO）的类或对象。系统连同你定义的对象常常直接称为"蓝图"。

### 必备知识

我们推荐先了解以下主题，然后再继续阅读该页面：

-   [虚幻引擎术语](/documentation/zh-cn/unreal-engine/unreal-engine-terminology)
-   [虚幻引擎中的关卡](/documentation/zh-cn/unreal-engine/levels-in-unreal-engine)

## 蓝图的用法

蓝图的工作方式是将节点图表用于各种用途，例如对象构造、单独的函数和通用Gameplay事件。你可以使用引线连接事件、函数、变量的节点来创建Gameplay元素。

## 常用蓝图类型

最常使用的蓝图类型是 **关卡蓝图** 和 **蓝图类**。

完整类型列表请参见[蓝图类型](/documentation/zh-cn/unreal-engine/types-of-blueprints-in-unreal-engine).

## 关卡蓝图

关卡蓝图包含地图中关卡特有事件的逻辑。每个关卡都有一个关卡蓝图，它可以：

-   引用和操控关卡中的Actor
-   使用[关卡序列Actor](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)控制过场动画
-   管理关卡流送

关卡蓝图还可以与关卡中放置的蓝图类交互，例如读取变量和触发自定义事件。更多信息请参阅[关卡蓝图](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine)。

## 蓝图类

蓝图类定义了可以作为实例放入地图中的新类或Actor类型。编辑整个项目中使用的蓝图类将更新其所有实例。

蓝图类是创建门、开关、可收集物品、可摧毁场景等交互资源的理想类型。更多详情请参见[蓝图类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine)。

## 蓝图的其他作用

以下主题是你可以使用蓝图系统实现的一些示例。

## 使用构造脚本创建可自定义的预设

![构造脚本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a97b47e-8c62-44be-8ca0-1301b5fcdf4c/construction-script-ue5.png)

[构造脚本](/documentation/zh-cn/unreal-engine/construction-script-in-unreal-engine)是蓝图类中的一类图表，在编辑器中放置或更新Actor时该蓝图类将执行（不会在游戏进程中执行）。利用此脚本可十分容易地创建可自定义的道具，以改进环境美术师的工作流程。例如，自动更新材质来匹配自身点光源组件颜色与亮度的光照设备；或是将植物网格体在区域中随机散射的蓝图。

在[内容示例](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine) 地图中，包含所有例子（以上图标所示）的演示房间是由多个组件组合而成的单个蓝图。蓝图的构造脚本会根据蓝图 **细节** 面板中公开的参数创建不同静态网格体和光源。使用内容示例地图，我们可进入演示房间蓝图中，设置长度、高度和生成的房间数（以及另一些选项），片刻后便能创建出完整的房间组合。

## 创建可操作角色

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/294f7534-a244-4cd6-a688-4f4c4c4c60ec/game_characters.png)

[Pawns](/documentation/zh-cn/unreal-engine/pawn-in-unreal-engine)同样也是蓝图类的其中一种，是玩家可控制的Actor的物理表示。使用Pawn类，你可以需要的所有元素组合起来，创建一个可操作的[角色](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine)，从而操纵[摄像机](/documentation/zh-cn/unreal-engine/cameras-in-unreal-engine)行为，设置鼠标、控制器和触摸屏的输入事件，并创建用于处理骨架网格体动画的动画蓝图资源。

角色蓝图内置了移动、跳跃、游泳和坠落所需行为的角色组件。要完成设置，你必须依照玩家控制角色的方式添加输入事件。

详情请参见[设置角色动作](/documentation/zh-cn/unreal-engine/setting-up-character-movement)。

## 创建HUD

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c19264a3-d037-4c77-b2dc-25a3d9155ee9/create_huds.png)

蓝图脚本同样可用于创建游戏的HUD（抬头显示）。与蓝图类的设置相似，蓝图脚本包含事件序列与变量，但其被指定至项目的GameMode资源，而非直接添加至关卡。

可设置HUD来读取其他蓝图中的变量，以显示生命条、更新分数、显示任务标志等。HUD还可用于添加元素的命中框，如可以点击的按钮。

虽然蓝图充满了可能性，但[虚幻运动图形](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)系统在UI布局方面对于设计师更加友好。该系统同样基于蓝图可视化脚本。

## 蓝图编辑器和图表

**蓝图编辑器（Blueprint Editor）** 是用于构造蓝图元素以构建可视化脚本的用户界面。

![蓝图编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cc55103-94f0-4b46-b703-07aabc452a18/blueprint-editor-ue5.png)

蓝图编辑器的UI会因选择的蓝图类型而异。大部分 **蓝图编辑器** 的核心功能是用于布置蓝图网络的 **事件图表（Event Graph）** 选项卡。

如需详细了解界面，请参阅[蓝图编辑器](/documentation/zh-cn/unreal-engine/user-interface-reference-for-the-blueprints-visual-scripting-editor-in-unreal-engine)。

## 入门指南

若要继续了解虚幻引擎中可视化脚本的基础知识，请参阅以下页面。

[

![蓝图脚本编写基础](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a33c08b-62b8-4cab-8e14-63e279a83adb/using_interface_topic.png)

蓝图脚本编写基础

介绍蓝图可视化脚本中的变量和执行流程。





](/documentation/zh-cn/unreal-engine/basic-scripting-with-blueprints-in-unreal-engine)[

![蓝图可视化脚本概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94126244-4abf-40f8-ba6f-bfdf30ab540b/blueprint_topic.png)

蓝图可视化脚本概述

蓝图总览页面包含蓝图剖析和可用的不同蓝图类型。





](/documentation/zh-cn/unreal-engine/overview-of-blueprints-visual-scripting-in-unreal-engine)[

![蓝图快速入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16d156a3-a246-4d9f-9572-455df1238d0a/quickstart.png)

蓝图快速入门指南

创建并运行你的第一个蓝图。





](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine)

## 蓝图示例和教程

这些实践资源可供你详细了解蓝图系统。

-   [示例项目](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)
-   [蓝图教程](/documentation/zh-cn/unreal-engine/blueprint-workflows-in-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [visual scripting](https://dev.epicgames.com/community/search?query=visual%20scripting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [必备知识](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E5%BF%85%E5%A4%87%E7%9F%A5%E8%AF%86)
-   [蓝图的用法](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E8%93%9D%E5%9B%BE%E7%9A%84%E7%94%A8%E6%B3%95)
-   [常用蓝图类型](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E5%B8%B8%E7%94%A8%E8%93%9D%E5%9B%BE%E7%B1%BB%E5%9E%8B)
-   [关卡蓝图](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BE)
-   [蓝图类](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E8%93%9D%E5%9B%BE%E7%B1%BB)
-   [蓝图的其他作用](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E8%93%9D%E5%9B%BE%E7%9A%84%E5%85%B6%E4%BB%96%E4%BD%9C%E7%94%A8)
-   [使用构造脚本创建可自定义的预设](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%9E%84%E9%80%A0%E8%84%9A%E6%9C%AC%E5%88%9B%E5%BB%BA%E5%8F%AF%E8%87%AA%E5%AE%9A%E4%B9%89%E7%9A%84%E9%A2%84%E8%AE%BE)
-   [创建可操作角色](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8F%AF%E6%93%8D%E4%BD%9C%E8%A7%92%E8%89%B2)
-   [创建HUD](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E5%88%9B%E5%BB%BAhud)
-   [蓝图编辑器和图表](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E8%93%9D%E5%9B%BE%E7%BC%96%E8%BE%91%E5%99%A8%E5%92%8C%E5%9B%BE%E8%A1%A8)
-   [入门指南](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [蓝图示例和教程](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine#%E8%93%9D%E5%9B%BE%E7%A4%BA%E4%BE%8B%E5%92%8C%E6%95%99%E7%A8%8B)