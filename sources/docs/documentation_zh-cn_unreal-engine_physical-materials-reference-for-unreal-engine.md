# 虚幻引擎物理材质参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physical-materials-reference-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:50:12.777Z

---

目录

![物理材质参考](https://dev.epicgames.com/community/api/documentation/image/5f56a7f9-f47f-461e-abf1-3486ea2b92c0?resizing_type=fill&width=1920&height=335)

**物理材质（Physical Materials）** 用于定义物理对象与场景动态交互时的方式。物理材质非常容易使用。创建一个物理材质后，它会提供一组默认值，与应用于所有物理对象的默认物理材质相同。物理材质的例子包括角色尸体（布娃娃）、可移动的木箱等。

## 属性

以下是按主要类别划分的物理材质属性。

## 物理材质

这一类别包含物理材质的核心属性：摩擦力（Friction）、恢复力（Restitution）和密度（Density）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3c661cd-c324-4727-b19c-464b6c5d50f6/p1.png)

属性

说明

**摩擦力（Friction）**

这是表面的摩擦力值，控制物体在该表面上滑动的容易程度。

**摩擦力合并模式（Friction Combine Mode）**

此属性允许您调整物理材质摩擦力的组合方式。默认情况下此属性设置为平均值（Average），但是可以使用 **覆盖摩擦力合并模式（Override Friction Combine Mode）** 属性来覆盖。

-   **平均值（Average）**：使用接触的材质的平均值：(a+b)/2
-   **最小值（Min）**：使用接触的材质的下限值：min(a,b)
-   **乘（Multiply）**：将接触的材质的值相乘：a\*b
-   **最大值（Max）**：使用接触的材质的上限值：max(a,b)

**覆盖摩擦力合并模式（Override Friction Combine Mode）**

默认情况下，摩擦力合并模式（Friction Combine Mode）设置为 **平均值（Average）**，通过启用此属性，可以更改接触的物理材质之间摩擦力的组合方式。

**恢复力（Restitution）**

它指的是表面的"弹性"，或者说该表面与另一个表面碰撞时能保留多少能量。

**恢复力合并模式（Restitution Combine Mode）**

此属性允许您调整物理材质恢复力的组合方式。默认情况下此属性设置为平均值（Average），但是可以使用 **覆盖恢复力合并模式（Override Restitution Combine Mode）** 属性来覆盖。

-   **平均值（Average）**：使用接触的材质的平均值：(a+b)/2
-   **最小值（Min）**：使用接触的材质的下限值：min(a,b)
-   **乘（Multiply）**：将接触的材质的值相乘：a\*b
-   **最大值（Max）**：使用接触的材质的上限值：max(a,b)

**覆盖恢复力合并模式（Override Restitution Combine Mode）**

默认情况下，恢复力合并模式（Restitution Combine Mode）设置为 **平均值（Average）**，通过启用此属性，可以更改接触的物理材质之间恢复力的组合方式。

**密度（Density）**

用于与物体形状一起计算其质量属性。数值越高，物体越重。单位为每立方 **厘米** 的 **克** 数。

### 高级

此类别包含一个属性，用于更改比例如何影响应用该物理材质的Actor的质量。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d707a53-e60b-4adc-b17e-40c0c617b7ec/p2.png)

属性

说明

**根据力提升质量（Raise Mass To Power）**

用于调整在物体变大时质量增加的方式。这适用于基于"固体"物体计算出的质量。事实上，较大的物体往往不是实心的，而变得更像"贝壳"（例如，汽车就不是实心金属块）。值限制为1或更小。

## 破坏

特定于虚幻引擎4中的破坏系统的属性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7633f801-8ce3-484d-9fdd-ef9d5d9f0302/p3.png)

属性

说明

**可破坏物伤害阈值比例（Destructible Damage Threshold Scale）**

在应用此物理材质的任何可破坏物上衡量伤害阈值的比例。

## 物理属性

物理材质的游戏进程相关属性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a54fdb0-c82f-4b4c-b567-f644df74ea63/p4.png)

属性

说明

**表面类型（Surface Type）**

在"DefaultEngine.ini"文件中为您的项目设置表面类型（Surface Type）。它们定义了一个枚举，在引擎中用于定义任何数量的东西，从角色走过某个表面时播放的声音，到爆炸应该在不同表面留下的贴花类型。

您可以使用项目设置（ProjectSetting）/物理（Physics）/物理表面（Physical Surfaces）

您可以在代码或蓝图中提取这些数据：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e1edd7a-ea2e-45d8-b047-3aa424513c02/surfacetype.png)

根据默认设置，在不编辑源代码的情况下，您只能使用30种表面类型，其标记为SurfaceType1到SurfaceType30。

## 载具

这些属性特定于虚幻引擎4中的载具。虽然它们可能会表示它们处理的是轮胎，但它们只在应用于载具时才这样做（例如轮胎数据类型（Tire Data Type）和车轮蓝图（Wheel Blueprint），不直接引用物理材质）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc876f50-a728-4ccd-858b-b5254783e131/p5.png)

属性

说明

**轮胎摩擦力比例（Tire Friction Scale）**

当该物理材质应用于载具时，轮胎的总摩擦力标量。此值与车轮的特定摩擦力比例（Friction Scale）值相乘。

**轮胎摩擦力比例（Tire Friction Scales）**

当这种物理材质应用于载具时，特定车轮的轮胎摩擦力标量。这些值与车轮的特定摩擦力比例（Friction Scale）值相乘。

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [physical materials](https://dev.epicgames.com/community/search?query=physical%20materials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性](/documentation/zh-cn/unreal-engine/physical-materials-reference-for-unreal-engine#%E5%B1%9E%E6%80%A7)
-   [物理材质](/documentation/zh-cn/unreal-engine/physical-materials-reference-for-unreal-engine#%E7%89%A9%E7%90%86%E6%9D%90%E8%B4%A8)
-   [高级](/documentation/zh-cn/unreal-engine/physical-materials-reference-for-unreal-engine#%E9%AB%98%E7%BA%A7)
-   [破坏](/documentation/zh-cn/unreal-engine/physical-materials-reference-for-unreal-engine#%E7%A0%B4%E5%9D%8F)
-   [物理属性](/documentation/zh-cn/unreal-engine/physical-materials-reference-for-unreal-engine#%E7%89%A9%E7%90%86%E5%B1%9E%E6%80%A7)
-   [载具](/documentation/zh-cn/unreal-engine/physical-materials-reference-for-unreal-engine#%E8%BD%BD%E5%85%B7)