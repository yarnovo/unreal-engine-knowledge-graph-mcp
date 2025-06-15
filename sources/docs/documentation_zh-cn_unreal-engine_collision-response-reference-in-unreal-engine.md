# 虚幻引擎中的碰撞响应参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:49:41.302Z

---

目录

![碰撞响应参考](https://dev.epicgames.com/community/api/documentation/image/5c946b43-6c85-47c4-a646-e39e77c9c3b6?resizing_type=fill&width=1920&height=335)

"碰撞（Collision）"属性类别中的"碰撞预设值（Collision Presets）"/"碰撞响应（Collision Response）"部分中包含大量属性和设置，我们在此对它们进行了分类介绍。

## 属性

以下是物理形体（BodyInstance）上的"碰撞（Collision）"属性中的"碰撞预设值（Collision Presets）"子类别中包含的属性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f598b05-5474-4cfd-bb59-0dded9319d8e/collprop.png)

### 碰撞预设值（Collision Presets）

-   [**碰撞预设默认值（Collision Presets）**](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E7%A2%B0%E6%92%9E%E9%A2%84%E8%AE%BE%E9%BB%98%E8%AE%A4%E5%80%BC)
-   [**启用碰撞（Collision Enabled）**](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E5%90%AF%E7%94%A8%E7%A2%B0%E6%92%9E)
-   [**对象类型（Object Type）**](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E7%B1%BB%E5%9E%8B)
-   [**碰撞响应（Collision Responses）**](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E7%A2%B0%E6%92%9E%E5%93%8D%E5%BA%94)
-   [**追踪响应（Trace Responses）**](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E8%BF%BD%E8%B8%AA%E5%93%8D%E5%BA%94)
-   [**对象响应（Object Responses）**](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E5%93%8D%E5%BA%94)

#### 碰撞预设默认值

默认碰撞配置文件以及已在 **项目设置（Project Settings）** -> **引擎（Engine）** -> **碰撞（Collision）** -> **预设值（Preset）** （请参阅[为项目添加自定义物体类型](/documentation/zh-cn/unreal-engine/add-a-custom-object-type-to-your-project-in-unreal-engine)了解详情）中创建的碰撞配置文件将在此处显示。

属性

说明

**默认（Default）**

使用已在静态网格体编辑器中应用给静态网格体的设置。

**自定义...（Custom...）**

为此实例设置所有自定义碰撞设置。

**NoCollision**

无碰撞。

**BlockAll**

在默认情况下阻挡所有Actor的WorldStatic对象。所有新自定义信道都将使用其本身的默认响应。

**OverlapAll**

在默认情况下与所有Actor重叠的WorldStatic对象。所有新自定义信道都将使用其本身的默认响应。

**BlockAllDynamic**

在默认情况下阻挡所有Actor的WorldDynamic对象。所有新自定义信道都将使用其本身的默认响应。

**OverlapAllDynamic**

在默认情况下与所有Actor重叠的WorldDynamic对象。所有新自定义信道都将使用其本身的默认响应。

**IngoreOnlyPawn**

忽略Pawn和载具的WorldDynamic对象。所有其他信道都将设置为默认值。

**OverlapOnlyPawn**

与Pawn、摄像机和载具重叠的WorldDynamic对象。所有其他信道都将设置为默认值。

**Pawn**

Pawn对象。可用于任意可操作角色或AI的胶囊体。

**Spectator**

忽略除WorldStatic以外的所有其他Actor的Pawn对象。

**CharacterMesh**

用于角色网格体的Pawn对象。所有其他信道都将设置为默认值。

**PhysicsActor**

模拟Actor。

**Destructible**

可破坏物Actor。

**InvisibleWall**

不可见的WorldStatic对象。

**InvisibleWallDynamic**

不可见的WorldDynamic对象。

**Trigger**

用于触发器的WorldDynamic对象。所有其他信道都将设置为默认值。

**Ragdoll**

模拟骨架网格体组件。所有其他信道都将设置为默认值。

**Vehicle**

阻挡载具（Vehicle）、WorldStatic和WorldDynamic的载具对象。所有其他信道都将设置为默认值。

**UI**

在默认情况下与所有Actor重叠的WorldStatic对象。所有新自定义信道都将使用其本身的默认响应。

#### 启用碰撞

"启用碰撞（Collision Enabled）"可具有如下所示的4种状态。

属性

说明

**无碰撞（No Collision）**

在物理引擎中此形体将不具有任何表示。不可用于空间查询（光线投射、Sweep、重叠）或模拟（刚体、约束）。此设置可提供最佳性能，尤其是对于移动对象。

**仅查询（Query Only）**

此形体仅可用于空间查询（光线投射、Sweep和重叠）。不可用于模拟（刚体、约束）。对于角色运动和不需要物理模拟的对象，此设置非常有用。通过缩小物理模拟树中的数据来实现一些性能提升。

**仅物理（Physics Only）**

此形体仅可用于物理模拟（刚体、约束）。不可用于空间查询（光线投射、Sweep、重叠）。对于角色上不需要按骨骼进行检测的模拟次级运动，此设置非常有用。通过缩小查询树中的数据来实现一些性能提升。

**启用碰撞（Collision Enabled）**

此形体可用于空间查询（光线投射、Sweep、重叠）和模拟（刚体、约束）。

#### 对象类型

属性

说明

**WorldStatic**

应用于不移动的任意Actor。静态网格体Actor是类型可能为"WorldStatic"的Actor的良好示例。

**WorldDynamic**

WorldDynamic用于受到动画或代码的影响而移动的Actor类型；运动学。电梯和门是WorldDynamic Actor的典型例子。

**Pawn**

任何由玩家控制的实体的类型都应为Pawn。玩家角色是"对象类型（Object Type）"应为"Pawn"的Actor的典型例子。

**PhysicsBody**

由于物理模拟而移动的任意Actor。

**载具（Vehicle）**

此为载具的默认类型。

**可破坏物（Destructible）**

此为可破坏物网格体的默认类型。

#### 碰撞响应

这些属性定义了此物理形体与所有其他类型的追踪和对象类型交互的方式。请记住，后续操作是由两个物理形体之间的交互定义的，因此两个物理形体的"对象类型（Object Type）"和"碰撞响应（Collision Responses）"都很重要。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8322c1d2-5bfe-46df-85a6-e824959881c0/iob.png)

响应

说明

**忽略（Ignore）**

无论另一个物理形体的"碰撞响应（Collision Responses）"为何，此物理形体都将忽略交互。

**重叠（Overlap）**

如果已将另一个物理形体设置为"重叠（Overlap）"或"阻挡（Block）"此物理形体的"对象类型（Object Type）"，将发生重叠事件。

**阻挡（Block）**

如果已将另一个物理形体设置为"阻挡（Block）"此物理形体的"对象类型（Object Type）"，将发生撞击事件。

#### 追踪响应

追踪响应用于追踪（光线投射），例如蓝图节点 **按信道进行线迹追踪（Line Trace by Channel）**。

属性

说明

**可视性（Visibility）**

泛型可视性测试信道。

**摄像机（Camera）**

通常用于从摄像机到某个对象的追踪。

#### 对象响应

属性

说明

**WorldStatic**

当与WorldStatic物理形体对象类型交互时，此物理形体应如何做出反应。

**WorldDynamic**

当与WorldDynamic物理形体对象类型交互时，此物理形体应如何做出反应。

**Pawn**

当与Pawn物理形体对象类型交互时，此物理形体应如何做出反应。

**PhysicsBody**

当与PhysicsBody物理形体对象类型交互时，此物理形体应如何做出反应。

**载具（Vehicle）**

当与"载具（Vehicle）"物理形体对象类型交互时，此物理形体应如何做出反应。

**可破坏物（Destructible）**

当与"可破坏物（Destructible）"物理形体对象类型交互时，此物理形体应如何做出反应。

-   [collision](https://dev.epicgames.com/community/search?query=collision)
-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E5%B1%9E%E6%80%A7)
-   [碰撞预设值（Collision Presets）](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E7%A2%B0%E6%92%9E%E9%A2%84%E8%AE%BE%E5%80%BC%EF%BC%88collisionpresets%EF%BC%89)
-   [碰撞预设默认值](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E7%A2%B0%E6%92%9E%E9%A2%84%E8%AE%BE%E9%BB%98%E8%AE%A4%E5%80%BC)
-   [启用碰撞](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E5%90%AF%E7%94%A8%E7%A2%B0%E6%92%9E)
-   [对象类型](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E7%B1%BB%E5%9E%8B)
-   [碰撞响应](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E7%A2%B0%E6%92%9E%E5%93%8D%E5%BA%94)
-   [追踪响应](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E8%BF%BD%E8%B8%AA%E5%93%8D%E5%BA%94)
-   [对象响应](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E5%93%8D%E5%BA%94)