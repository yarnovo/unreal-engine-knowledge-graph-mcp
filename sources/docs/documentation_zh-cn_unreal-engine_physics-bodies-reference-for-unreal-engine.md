# 虚幻引擎物理形体参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:37.987Z

---

目录

![物理形体参考](https://dev.epicgames.com/community/api/documentation/image/3901a8e6-c098-4376-9c25-b997a02daf48?resizing_type=fill&width=1920&height=335)

本文介绍了"物理和碰撞"分类中各个属性的用法。如需了解"碰撞响应（Collision Respons）"或"碰撞预设（Collision Preset）"的使用方法，请参阅：[碰撞响应参考](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine)。

## 属性

以下是"物理形体（形体实例）"的属性介绍，按大类区分。

## 物理

![显示物理属性的物理形体细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db4c9067-29cc-41b3-a9c0-3d391a6bd414/details_physics.png)

属性

说明

**双面几何体（Double Sided Geometry）**

如果启用，物理三角网格体在执行场景查询时将使用双面。这对于需要追踪以便在两个面上工作的平面和单面网格体非常有用。

**简单碰撞物理材质（Simple Collision Physical Material）**

在此形体上进行简单碰撞时使用的物理材质。对密度、摩擦力等信息进行编码。

**物理类型（Physics Type）**

-   模拟：物体将使用物理模拟。
-   运动学：物体将不会受到物理影响，但可以与以物理方式模拟的形体进行交互。
-   默认值：物体将从OwnerComponent的行为进行继承。

**质量（以KG为单位）（Mass in KG）**

形体的质量，以KG为单位。

**线性阻尼（Linear Damping）**

为减弱线性移动而附加的"拖拽"力

**角阻尼（Angular Damping）**

为减弱角运动而附加的"拖拽"力

**启用重力（Enable Gravity）**

物体是否受到重力作用

### 高级

![用于显示高级物理属性的物理形体细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e8480d9-5183-4643-9be5-d166dd75f344/details_physics_advanced.png)

属性

说明

**初始状态为苏醒（Start Awake）**

物体的初始状态为苏醒，或为休眠

**质量中心偏移（Center Of Mass Offset）**

用户为此物体质量中心指定的距离计算位置的偏移

**质量缩放（Mass Scale）**

质量的逐实例缩放

**最大角速度（Max Angular Velocity）**

实例的最大角速度

**休眠集（Sleep Family）**

将此形体设置为休眠时考虑使用的值集。普通、警觉、自定义

**惯性张量缩放（Inertia Tensor Scale）**

根据每个实例来缩放惯性（值越大表示越难旋转）

**可行走斜面覆盖（Walkable Slope Override）**

此形体的自定义可行走斜面设置。请参阅 **[可行走斜面](/documentation/zh-cn/unreal-engine/walkable-slope-in-unreal-engine)** 文档了解使用信息。

**可行走斜面行为（Walkable Slope Behavior）**

此表面的行为（是否影响可行走斜面）。

**可行走斜面角度（Walkable Slope Angle）**

.覆盖可行走斜面，应用可行走斜面行为的规则。

**自定义休眠阈值乘数（Custom Sleep Threshold Multiplier）**

如果休眠集设置为 **自定义（Custom）**，则用此数量乘以自然睡眠阈值。数越大，形体休眠速度越快。

**稳定性阈值乘数（Stabilization Threshold Multiplier）**

如果启用了物理稳定性，则表示此形体的稳定性系数。数越大，稳定性将越激进，但存在以较低速度流失扩散性的风险。值为0将禁用此形体的稳定性。

**缩放更改时更新质量（Update Mass when Scale Changes）**

如为true，缩放发生变化时其将更新质量。

**生成苏醒事件（Generate Wake Events）**

确定当此物体被物理模拟设置为唤醒或进入休眠时，是否应该触发"苏醒/休眠"事件。

## 碰撞

![用于显示碰撞属性的物理形体细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1702142f-a75c-4c03-a809-0a1d481714fd/details_collision.png)

属性

说明

**始终不需要已烘焙的碰撞数据（Never Needs Cooked Collision Data）**

为了实现Chaos，可使用此属性对某些网格体排除CreatePhysicsMesh。 除非确认有某个网格体实例需要CreatePhysicsMesh，否则最好不要让长期网格体调用CreatePhysicsMesh。

**碰撞复杂度（Collision Complexity）**

碰撞追踪行为——默认情况下将区分简单（凸包）和复杂（按多边形）。

**碰撞响应（Collision Responses）**

请参阅[碰撞响应参考](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine)文档以了解更多信息。

**模拟生成命中事件（Simulation Generates Hit Events）**

当此物体在物理模拟中发生碰撞时是否发射"命中"事件。

**物理材质覆盖（Phys Material Override）**

允许覆盖用于此形体上简单碰撞的PhysicalMaterial。

### 高级

![用于显示高级碰撞属性的物理形体细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7542cd2c-3638-45b7-afdd-5085ebdef272/details_collision_advanced.png)

属性

说明

**使用CCD（Use CCD）**

如为true，连续碰撞检测（CCD）将用于此组件

**忽略分析碰撞（Ignore Analytic Collisions）**

如果设置为"真"，则忽略分析碰撞并将物体处理为通用隐式表面。

**平滑边缘碰撞（Smooth Edge Collisions）**

删除不必要的边缘碰撞，从而在由多个Actor/组件组成的表面上平滑滑动。

## 形体设置

![用于显示形体设置属性的物理形体细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ba76fd7-6ef2-4690-875c-894c12db6106/details_body_setup.png)

属性

说明

**跳过来自动画的缩放（Skip Scale from Animation）**

如果设置为"真"，则忽略来自动画的缩放变化。这对于细微的缩放动画非常有用，例如在呼吸时，物理碰撞应该保持不变。

**图元（Primitives）**

此物体的简化碰撞表示。

**球体（Spheres）**

球体元素

**盒体（Boxes）**

盒体元素

**胶囊体（Capsules）**

长菱形元素

**凸包元素（Convex Elements）**

凸包元素

**锥形胶囊体（Tapered Capsules）**

锥形胶囊体元素

**考虑边界（Consider for Bounds）**

确定是否应该为PhysicsAsset（以及SkeletalMeshComponent）的边界框考虑此BodySetup。在更新边界时，每帧处理的BodySetup越少，越可以提升速度。

**骨骼名称（Bone Name）**

在PhysicsAsset情况中使用。将此形体与骨骼网格体中的骨骼关联。

如需了解每个图元类型的细节属性，请参见下文。

## 图元类型

#### 球体

![Body setup details for sphere primitives](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43f09eaa-e44c-440f-80b7-571569e7cb9a/details-body-setup-primitives-spheres.png)

属性

说明

**中心（Center）**

球体的起点位置。

**半径（Radius）**

球体的半径。

**剩余偏移（Rest Offset）**

在生成接触点时使用的偏移。这样你可以按照半径R来平滑明氏总和（Minkowski sum）。对于让物体在不规则表面上的平滑运动很有用。

**名称（Name）**

此形状的用户定义名称。

**提升质量（Contribute to Mass）**

控制此形状是否应该提升它所属的形体的总质量。这可以让你创建不会影响物体质量属性的额外碰撞体积。

**启用碰撞（Collision Enabled）**

逐个设置图元的碰撞过滤。允许你在模拟中开关单个图元，并在不更改过滤细节的情况下查询碰撞。

#### 盒体

![Body setup details for box primitives](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac386f31-80e3-491a-a2c9-2536817a68ff/details-body-setup-primitives-boxes.png)

属性

说明

**中心（Center）**

盒体的起点位置。

**旋转（Rotation）**

盒体的旋转，以围绕每个轴的度数表示。

**X范围（X Extent）**

盒体沿着X轴的范围。

**Y范围（Y Extent）**

盒体沿着Y轴的范围。

**Z范围（Z Extent）**

盒体沿着Z轴的范围。

**剩余偏移（Rest Offset）**

在生成接触点时使用的偏移。这样你可以按照半径R来平滑明氏总和（Minkowski sum）。对于让物体在不规则表面上的平滑运动很有用。

**名称（Name）**

此形状的用户定义名称。

**提升质量（Contribute to Mass）**

控制此形状是否应该提升它所属的形体的总质量。这可以让你创建不会影响物体质量属性的额外碰撞体积。

**启用碰撞（Collision Enabled）**

逐个设置图元的碰撞过滤。允许你在模拟中开关单个图元，并在不更改过滤细节的情况下查询碰撞。

#### 胶囊体

![Body setup details for capsule primitives](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/412a4ee2-c815-4624-9196-29b721bacca5/details-body-setup-primitives-capsules.png)

属性

说明

**中心（Center）**

胶囊体的起点位置。

**旋转（Rotation）**

胶囊体的旋转，以围绕每个轴的度数表示。

半径

胶囊体的半径

长度

线段的长度。将半径添加到两端，获知总长度。

**剩余偏移（Rest Offset）**

在生成接触点时使用的偏移。这样你可以按照半径R来平滑明氏总和（Minkowski sum）。对于让物体在不规则表面上的平滑运动很有用。

**名称（Name）**

此形状的用户定义名称。

**提升质量（Contribute to Mass）**

控制此形状是否应该提升它所属的形体的总质量。这可以让你创建不会影响物体质量属性的额外碰撞体积。

**启用碰撞（Collision Enabled）**

逐个设置图元的碰撞过滤。允许你在模拟中开关单个图元，并在不更改过滤细节的情况下查询碰撞。

#### 凸包元素

![Body setup details for convex element primitives](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a425481-c799-4ead-9405-acb480bf2f87/details-body-setup-primitives-convex.png)

属性

说明

**剩余偏移（Rest Offset）**

在生成接触点时使用的偏移。这样你可以按照半径R来平滑明氏总和（Minkowski sum）。对于让物体在不规则表面上的平滑运动很有用。

**名称（Name）**

此形状的用户定义名称。

**提升质量（Contribute to Mass）**

控制此形状是否应该提升它所属的形体的总质量。这可以让你创建不会影响物体质量属性的额外碰撞体积。

**启用碰撞（Collision Enabled）**

逐个设置图元的碰撞过滤。允许你在模拟中开关单个图元，并在不更改过滤细节的情况下查询碰撞。

#### 锥形胶囊体

![Body setup details for tapered capsule primitives](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1886a3e-7ba4-4e04-953d-050f2f4cbfe9/details-body-setup-primitives-tapered.png)

属性

说明

 

**中心（Center）**

胶囊体的起点位置。

 

**旋转（Rotation）**

胶囊体的旋转，以围绕每个轴的度数表示。

 

**半径0（Radius 0）**

胶囊体起点的半径

 

**半径1（Radius 1）**

胶囊体末端的半径

 

**长度（Length）**

线段的长度。添加半径0和半径1，获知总长度。

 

**剩余偏移（Rest Offset）**

在生成接触点时使用的偏移。这样你可以按照半径R来平滑明氏总和（Minkowski sum）。对于让物体在不规则表面上的平滑运动很有用。

 

**名称（Name）**

此形状的用户定义名称。

 

**提升质量（Contribute to Mass）**

控制此形状是否应该提升它所属的形体的总质量。这可以让你创建不会影响物体质量属性的额外碰撞体积。

 

**启用碰撞（Collision Enabled）**

逐个设置图元的碰撞过滤。允许你在模拟中开关单个图元，并在不更改过滤细节的情况下查询碰撞。 

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [physics bodies](https://dev.epicgames.com/community/search?query=physics%20bodies)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E5%B1%9E%E6%80%A7)
-   [物理](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E7%89%A9%E7%90%86)
-   [高级](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E9%AB%98%E7%BA%A7)
-   [碰撞](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E7%A2%B0%E6%92%9E)
-   [高级](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E9%AB%98%E7%BA%A7-2)
-   [形体设置](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E5%BD%A2%E4%BD%93%E8%AE%BE%E7%BD%AE)
-   [图元类型](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E5%9B%BE%E5%85%83%E7%B1%BB%E5%9E%8B)
-   [球体](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E7%90%83%E4%BD%93)
-   [盒体](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E7%9B%92%E4%BD%93)
-   [胶囊体](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E8%83%B6%E5%9B%8A%E4%BD%93)
-   [凸包元素](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E5%87%B8%E5%8C%85%E5%85%83%E7%B4%A0)
-   [锥形胶囊体](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine#%E9%94%A5%E5%BD%A2%E8%83%B6%E5%9B%8A%E4%BD%93)