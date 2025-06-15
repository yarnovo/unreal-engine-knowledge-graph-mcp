# 虚幻引擎中的蓝图类型 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/types-of-blueprints-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:36:38.618Z

---

目录

![蓝图类型](https://dev.epicgames.com/community/api/documentation/image/26c36c32-89cd-47b4-857c-ae04183755ea?resizing_type=fill&width=1920&height=335)

有时候很难看一眼就决定应该使用哪种类型的 **蓝图**，特别是 在涉及 **蓝图宏库** 和 **蓝图类** 的时候。有一条很管用的经验法则，就是问你自己：

-   *是不是有多个实例？*

如果你的实例不止一两个（例如一台电视机，可以用枪打爆，也可以打开/关闭）， 那么也许合理做法是创建一个蓝图类，并在其中设置相关代码。 如果没有那么多，而且你只需要一些帮助程序函数（例如查找X单位中的所有Actor），那么 在蓝图宏库中设置是最理想的。

## 关卡蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0bfbcbf-5e41-4fd9-bf46-8954df41d6f9/level_blueprint_test_image.png)

**关卡蓝图（Level Blueprint）** 是一种专业类型的 **蓝图（Blueprint）**，用作关卡范围的全局事件图。 在默认情况下，项目中的每个关卡都创建了自己的关卡蓝图，您可以在虚幻编辑器中编辑这些关卡蓝图， 但是不能通过编辑器接口创建新的关卡蓝图。

与整个级别相关的事件，或关卡内Actor的特定实例， 用于以函数调用或流控制操作的形式触发操作序列。 熟悉虚幻引擎3的人应该非常熟悉这个概念， 因为它与Kismet在虚幻引擎3中的工作原理非常相似。

关卡蓝图还提供了关卡流送和[Sequencer](/documentation/zh-cn/unreal-engine/real-time-compositing-with-sequencer-in-unreal-engine)的控制机制， 以及将事件绑定到关卡内的Actor的控制机制。

要了解关于这部分的更多信息，请参见[关卡蓝图](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine)。

## 蓝图类

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca55bf3f-f768-46c4-a385-5ca51ea33fd2/class_blueprint_test_image.png)

***Blueprint Class（蓝图类）***, 一般缩写为 ***Blueprint(蓝图)***,是一种允许内容创建者轻松地基于现有游戏性类添加功能的资源。 *蓝图* 是在虚幻编辑器中可视化地创建的，不需要书写代码，会被作为类保存在内容包中。 实际上，这些类蓝图定义了一种新类别或类型的Actor，这些Actor可以作为实例放置到地图中， 就和其他类型的Actor的行为一样。

要了解关于这部分的更多信息，请参见[蓝图类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine)。

## 仅数据蓝图

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92ab5e56-49b9-4df7-a46b-a1db13326991/data_blueprint.png)

**Data-Only Blueprint（仅包含数据的蓝图）** 是指仅包含代码(以节点图表的形式)、变量及从其父类继承的组件  
的类蓝图。仅包含数据的蓝图允许您调整及修改继承的属性，但是不能添加新元素。 从本质上讲，这些蓝图是原型的替代物，设计人员可以使用它们来调整属性或者设置具有变种的项目。

Data-Only Blueprints(仅包含数据的蓝图) 是在合并的属性编辑器中进行编辑的，但是也可以通过使用完整的 **蓝图编辑器** 来添加代码、 变量或组件，来将其转换为完整的蓝图 。

要了解关于这部分的更多信息，请参见[仅数据蓝图](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine#data-onlyblueprint)。

## 蓝图接口

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65512bde-3495-47b5-8a39-d452ce497d05/blueprint_interface.png)

**蓝图接口（Blueprint Interface）** 是一个或多个函数的集合 - 只有名称，没有实施 -  
可以添加到其他蓝图中。任何添加了该接口的蓝图都保证拥有这些函数。接口的函数 可以在添加它的每个蓝图中提供功能。在本质上，这类似于一般编程中的接口概念， 它允许多个不同类型的对象通过一个公共接口 共享和被访问。简单地说，蓝图接口允许不同的蓝图相互共享和发送数据。

内容创建者可以通过编辑器以与其他蓝图类似的方式创建蓝图接口， 但它们仍有一定的局限性，原因在于以下操作不可执行：

-   添加新变量
-   编辑图表
-   添加组件

要了解关于这部分的更多信息，请参见[蓝图接口](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine)。

## 蓝图宏库

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7546f01c-8ddf-4099-abc5-89d28be00337/macro_blueprint.png)

**蓝图宏库（Blueprint Macro Library）** 是一个容器，它包含一组 **宏** 或自包含的图表，这些图表可以 作为节点放置在其他蓝图中。它们可以节省时间，因为它们可以存储常用的节点序列， 包括执行和数据传输所需的输入和输出。

宏在引用它们的所有图表之间共享，但是它们会自动扩展到图表中， 就像它们在编译期间是一个折叠节点那样。这意味着蓝图宏库不需要编译。但是， 对宏的更改仅反映在重新编译包含这些图表的蓝图时 引用该宏的图表中。

要了解关于这部分的更多信息，请参见[蓝图宏库](/documentation/zh-cn/unreal-engine/blueprint-macro-library-in-unreal-engine)。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [关卡蓝图](/documentation/zh-cn/unreal-engine/types-of-blueprints-in-unreal-engine#%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BE)
-   [蓝图类](/documentation/zh-cn/unreal-engine/types-of-blueprints-in-unreal-engine#%E8%93%9D%E5%9B%BE%E7%B1%BB)
-   [仅数据蓝图](/documentation/zh-cn/unreal-engine/types-of-blueprints-in-unreal-engine#%E4%BB%85%E6%95%B0%E6%8D%AE%E8%93%9D%E5%9B%BE)
-   [蓝图接口](/documentation/zh-cn/unreal-engine/types-of-blueprints-in-unreal-engine#%E8%93%9D%E5%9B%BE%E6%8E%A5%E5%8F%A3)
-   [蓝图宏库](/documentation/zh-cn/unreal-engine/types-of-blueprints-in-unreal-engine#%E8%93%9D%E5%9B%BE%E5%AE%8F%E5%BA%93)