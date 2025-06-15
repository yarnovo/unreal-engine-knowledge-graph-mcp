# 虚幻引擎中的蓝图类 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:44.437Z

---

目录

![蓝图类](https://dev.epicgames.com/community/api/documentation/image/db3c5d47-2104-48c8-8a34-36c59b55631e?resizing_type=fill&width=1920&height=335)

***Blueprint Class（蓝图类）***, 一般缩写为 ***Blueprint(蓝图)***,是一种允许内容创建者轻松地基于现有游戏性类添加功能的资源。 *蓝图* 是在虚幻编辑器中可视化地创建的，不需要书写代码，会被作为类保存在内容包中。 实际上，这些类蓝图定义了一种新类别或类型的Actor，这些Actor可以作为实例放置到地图中， 就和其他类型的Actor的行为一样。

## 父类

你可以创建多种不同类型的蓝图，当然在你做这些之前，你需要指定该蓝图的**Parent Class(父类)** 选择继承父类，允许你在自己的蓝图里面调用父类创建的属性。

下面是你创建蓝图是最常见的父类：

类型

描述

**Actor**

一个可以在世界中摆放，或者生成的Actor。

**Pawn**

Pawn是一个可以从控制器获得输入信息处理的Actor。

**Character**

角色是一个包含了行走，跑步，跳跃以及更多动作的Pawn。

**PlayerController**

PlayerController一种的Actor，负责控制玩家所使用的Pawn。

**Game Mode**

一个Game Mode 定义了游戏是如何被执行的，游戏规则，如何的分以及其他方面的内容。

上面的是最常用的内容，所有的类都可以为一个新建的蓝图用作父类 (甚至其他的蓝图类).

例如, 你创建了一个叫做 *Animals* 的 **Actor Blueprint** 在它里面实现了所有动物的共享属性，例如 *Hunger*, *Thirst*, *Energy*, 或者是其他你想实现的脚本。然后你从 *Animals* 作为父类，创建了另外一个叫做 *Dog* 的蓝图 ; 你在这个 *Dogs* 里定义了例如 *Play Fetch* 或 *Roll Over* 之类特别的功能，那么这个 *Dogs* 除了独享自己的功能之外，还继承了 *Animals* 里定义的其他功能.

根据所用的方法 [创建一个蓝图类](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine), 一个父类将在被创建时分配。

## 用蓝图类工作

参考下面的信息 **蓝图类**:

[](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-user-interface-for-blueprint-classes-in-unreal-engine)

[![蓝图编辑器中的蓝图类UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a51dd41-47c3-4f2d-9e69-cdef81e7420b/class_blueprint_test_image.png)](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-user-interface-for-blueprint-classes-in-unreal-engine)

[蓝图编辑器中的蓝图类UI](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-user-interface-for-blueprint-classes-in-unreal-engine)

[当蓝图编辑器处理类蓝图时所包含的UI元素的详细介绍。](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-user-interface-for-blueprint-classes-in-unreal-engine)

[

![创建蓝图类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83febcbb-f1db-4bd8-a62b-ccdadf213f87/placeholder_topic.png)

创建蓝图类

新建蓝图类的指南。





](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine)[

![蓝图编辑器参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/330b0cb5-6d09-4fc8-a1c8-d7f570f4fe74/macro_blueprint.png)

蓝图编辑器参考

本页包含蓝图编辑器的界面元素和基础使用说明。





](/documentation/zh-cn/unreal-engine/user-interface-reference-for-the-blueprints-visual-scripting-editor-in-unreal-engine)

## 仅包含数据的蓝图

**Data-Only Blueprint（仅包含数据的蓝图）** 是指仅包含代码(以节点图表的形式)、变量及从其父类继承的组件  
的类蓝图。仅包含数据的蓝图允许您调整及修改继承的属性，但是不能添加新元素。 从本质上讲，这些蓝图是原型的替代物，设计人员可以使用它们来调整属性或者设置具有变种的项目。

Data-Only Blueprints(仅包含数据的蓝图) 是在合并的属性编辑器中进行编辑的，但是也可以通过使用完整的 **蓝图编辑器** 来添加代码、 变量或组件，来将其转换为完整的蓝图 。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [class blueprints](https://dev.epicgames.com/community/search?query=class%20blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [父类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine#%E7%88%B6%E7%B1%BB)
-   [用蓝图类工作](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine#%E7%94%A8%E8%93%9D%E5%9B%BE%E7%B1%BB%E5%B7%A5%E4%BD%9C)
-   [仅包含数据的蓝图](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine#%E4%BB%85%E5%8C%85%E5%90%AB%E6%95%B0%E6%8D%AE%E7%9A%84%E8%93%9D%E5%9B%BE)