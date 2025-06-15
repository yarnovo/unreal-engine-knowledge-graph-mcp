# 虚幻引擎中的Mutable实时变形 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mutable-real-time-morphs-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:39.868Z

---

目录

![实时变形](https://dev.epicgames.com/community/api/documentation/image/89f88683-71f8-41a0-853e-1139bc4087f0?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

除了支持烘焙变形（请参阅[变形节点](https://github.com/anticto/Mutable-Documentation/wiki/Node-Mesh-Morph)），Mutable还可以向生成的网格体添加实时变形目标。

## 启用实时变形目标

需要在每个可自定义对象的编译选项中启用此功能。转到 **对象属性（Object Properties）** 选项卡并点击 **编译选项（Compile Options）** > **启用实时变形目标（Enable Real Time Morph Targets）** 。

![启用实时变形目标选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a27a06a4-06f2-4f9d-a244-7b493f6ea3b1/enable-real-time-morph-targets.png)

启用后，参与生成的Mutable骨骼网格体的任何骨骼网格体中存在的选定变形目标都将被添加到该网格体中。如果在构成生成网格体的多个网格体中存在相同名称的变形目标，则这些变形目标将进行合并，以便所有受影响的顶点都由同一曲线驱动。

### 变形目标选择

你可以使用三种方法选择需要考虑的变形目标。

#### SkeletalMesh节点

选择变形目标的一种方法是在SkeletalMesh节点中。在该节点的属性视图中，会显示在骨骼网格体中找到的所有变形目标的列表。可以选择单个或所有变形目标。

![骨骼网格体中的变形目标列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00c433ed-fbcc-45b1-8d2c-6ed1fd48c442/list-of-morph-targets.png)

#### 表格

在使用数据表时，没有可供选择变形目标的列表。在这种情况下，使用数据表结构体中设置的默认骨骼网格体来确定将选择哪些变形。如果变形目标名称存在于默认骨骼网格体的变形目标列表中，则将为表中的所有骨骼网格体选择该变形目标。

#### 全局选择

有时，为图表中的所有网格体选择具有特定名称的所有变形目标会很有用。如果图表非常大或者有很多子图表，则前往可自定义对象中的所有骨骼网格体节点并手动选择特定变形目标可能会很繁琐，而且容易出错。为了解决这些情况，可以在图表根基础对象的 **节点属性（Node Properties）** 面板中编辑重载所选变形的列表。在 **节点属性（Node Properties）** 面板中，点击 **实时变形目标（Real Time Morph Targets）** > **实时变形重载选择（Real Time Morph Override Selection）** 。

此列表允许你全局重载SkeletalMesh节点中的变形目标选择。每个条目由一个变形目标名称和一个具有三个值的选择重载项组成：**无重载（No Override）** 、 **启用（Enable）** 或 **禁用（Disable）** 。**无重载（No Override）** 是默认选项，表示将使用节点选择。**启用（Enable）** 和 **禁用（Disable）** 会强制启用或禁用具有该名称的所有变形目标，而不管节点的选择如何。如果每个骨骼网格体重载需要更精细的设置，可以指定每个骨骼网格体的重载列表。骨骼网格体重载值始终优先于变形目标重载，因此如果某个网格体不需要重载变形目标，则该网格体名称不应在列表中。

![实时变形重载选择列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f43d826-6ea2-4fdd-8cd2-303f1d5856c3/global-selection.png)

### 其他注意事项

最终出现在Mutable生成的网格体中的实时变形目标是常规的骨骼网格体变形目标，因此适用相同的工作流程。例如，要检查哪些变形用于特定的可自定义对象实例，请使用骨骼网格体查看器的"变形目标预览（Morph Target Preview）"选项卡检查生成的骨骼网格体。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [skeletal mesh](https://dev.epicgames.com/community/search?query=skeletal%20mesh)
-   [mutable](https://dev.epicgames.com/community/search?query=mutable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用实时变形目标](/documentation/zh-cn/unreal-engine/mutable-real-time-morphs-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%AE%9E%E6%97%B6%E5%8F%98%E5%BD%A2%E7%9B%AE%E6%A0%87)
-   [变形目标选择](/documentation/zh-cn/unreal-engine/mutable-real-time-morphs-in-unreal-engine#%E5%8F%98%E5%BD%A2%E7%9B%AE%E6%A0%87%E9%80%89%E6%8B%A9)
-   [SkeletalMesh节点](/documentation/zh-cn/unreal-engine/mutable-real-time-morphs-in-unreal-engine#skeletalmesh%E8%8A%82%E7%82%B9)
-   [表格](/documentation/zh-cn/unreal-engine/mutable-real-time-morphs-in-unreal-engine#%E8%A1%A8%E6%A0%BC)
-   [全局选择](/documentation/zh-cn/unreal-engine/mutable-real-time-morphs-in-unreal-engine#%E5%85%A8%E5%B1%80%E9%80%89%E6%8B%A9)
-   [其他注意事项](/documentation/zh-cn/unreal-engine/mutable-real-time-morphs-in-unreal-engine#%E5%85%B6%E4%BB%96%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)