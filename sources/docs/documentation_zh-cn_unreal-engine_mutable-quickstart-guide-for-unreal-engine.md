# 面向虚幻引擎的Mutable快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mutable-quickstart-guide-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:08.344Z

---

目录

![Mutable快速入门指南](https://dev.epicgames.com/community/api/documentation/image/68c9bd72-9e46-481c-a0b6-208307ef9464?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

## 概述

本页将介绍并对比使用 **Mutable** 为项目 **生成角色** 的不同方式。每个项目都有不同的需求，针对不同的资产，你可以将Mutable用于其中一种方式，也可以组合使用多种方式。

## 1\. 玩家自定义

这是最常见的场景，游戏允许玩家更改其角色或其他游戏对象（宠物、武器、房屋内的家具）的参数。这种情况会在游戏中的Gameplay特定场景（例如自定义大厅）中 **实时** 发生，或者仅在 **运行时** 发生，例如在加载到某个关卡时，或者当另一个玩家自定义的对象变得相关时。

**步骤：**

-   在编辑器中：创建一个玩家能够更改参数的可自定义对象资产。
-   在编辑器中：在可自定义对象中为每个参数设置默认值， **或者** 创建具有多个示例默认值的可自定义对象实例，作为玩家的起点。
-   在编辑器中：为玩家将会修改参数的每个场景创建[对象状态](/documentation/zh-cn/unreal-engine/using-customizable-states-in-mutable-with-unreal-engine)，并为角色的游戏内版本创建一个额外的状态。
-   在Gameplay代码中：为自定义场景添加Gameplay状态和UI。可以选择使用 **数据驱动的UI** 以实现可扩展性并减少开发迭代。
-   打包时，可自定义对象资产和可自定义对象实例资产将被烘焙。

## 2\. Gameplay效果

这与前一种情况类似，但不是玩家，而是 **Gameplay代码** 来更改对象参数。这种情况可能会发生在游戏中，例如当角色戴上在游戏中找到的头盔强化道具时，或者当角色走进泥坑从而变得很脏时等等。

**步骤：**

-   在编辑器中：创建一个游戏代码能够更改参数的可自定义对象资产。
-   在编辑器中：为Gameplay代码将会修改参数的每个场景创建[对象状态](/documentation/zh-cn/unreal-engine/using-customizable-states-in-mutable-with-unreal-engine)。
-   在Gameplay代码中：在运行时创建不同的可自定义对象实例，并管理其状态以根据需要更改参数。
-   打包时，可自定义对象资产将被烘焙。

## 3\. 预定义实例

在此场景中，我们希望美术师或设计人员创建不同的实例，这些实例的参数在游戏中不会更改。这种方式可用于创建NPC，或者当你不希望玩家对角色进行微调控制时，用于创建玩家角色的各种不同版本。这些实例仍会在运行时根据Mutable数据生成。

**步骤：**

-   在编辑器中：创建一个玩家能够更改参数的可自定义对象资产。
-   在编辑器中：美术师可以创建可自定义对象实例资产，为每个NPC等自定义对象。
-   在Gameplay代码中：根据需要加载和生成可自定义对象实例。
-   打包时，可自定义对象资产和可自定义对象实例资产将被烘焙。

## 4\. 烘焙后的实例

这是一个与#3类似的场景，但在这种情况下，实例在编辑器中被烘焙为标准的虚幻引擎资产。这消除了Mutable带来的所有性能影响，但可能会导致数据重复（实例之间不会共享网格体数据）。

**步骤：**

-   在编辑器中：创建一个玩家能够更改参数的可自定义对象资产。
-   在编辑器中：美术师可以创建可自定义对象实例资产，为每个NPC等自定义对象。
-   在编辑器中：将每个可自定义对象实例资产[烘焙](/documentation/zh-cn/unreal-engine/baking-instances-using-mutable-in-unreal-engine)为标准的虚幻引擎资产。
-   在Gameplay代码中：根据需要使用烘焙后的资产。
-   打包时，烘焙后的骨骼网格体、材质和纹理资产将被烘焙。

## 对比

在此表中， **对象** 指可自定义对象资产， **实例** 指 **可自定义对象实例** 资产。

 

1\. 玩家自定义

2.Gameplay效果

3.预定义实例

4.烘焙实例

**由谁自定义**

玩家

Gameplay代码

美术师/设计师

美术师/设计师

**何时设置参数**

游戏中

Gameplay编程时

编辑器中

编辑器中

*\*Mutable何时运行*

游戏中

游戏中

游戏中

编辑器中

**游戏内资产类型**

对象、材质

对象、材质

对象、实例、材质

骨骼网格体、材质、纹理

**游戏内影响**

实例生成

实例生成

实例生成

无

**烘焙影响**

对象编译

对象编译

对象编译

无

**编辑器影响**

无

无

无

手动烘焙实例

**质量**

正常

正常

正常

高

表格中的 *游戏内资产类型* 一行未包括使用可自定义对象时始终包括在游戏数据中的直通纹理、物理资产、布料资产和参考网格体。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/mutable-quickstart-guide-for-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [1\. 玩家自定义](/documentation/zh-cn/unreal-engine/mutable-quickstart-guide-for-unreal-engine#1%E7%8E%A9%E5%AE%B6%E8%87%AA%E5%AE%9A%E4%B9%89)
-   [2\. Gameplay效果](/documentation/zh-cn/unreal-engine/mutable-quickstart-guide-for-unreal-engine#2gameplay%E6%95%88%E6%9E%9C)
-   [3\. 预定义实例](/documentation/zh-cn/unreal-engine/mutable-quickstart-guide-for-unreal-engine#3%E9%A2%84%E5%AE%9A%E4%B9%89%E5%AE%9E%E4%BE%8B)
-   [4\. 烘焙后的实例](/documentation/zh-cn/unreal-engine/mutable-quickstart-guide-for-unreal-engine#4%E7%83%98%E7%84%99%E5%90%8E%E7%9A%84%E5%AE%9E%E4%BE%8B)
-   [对比](/documentation/zh-cn/unreal-engine/mutable-quickstart-guide-for-unreal-engine#%E5%AF%B9%E6%AF%94)