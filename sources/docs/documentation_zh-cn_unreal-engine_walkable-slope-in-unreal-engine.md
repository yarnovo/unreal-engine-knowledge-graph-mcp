# 虚幻引擎中的可行走斜面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/walkable-slope-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:52:07.018Z

---

目录

![可行走斜面](https://dev.epicgames.com/community/api/documentation/image/7edd30d3-1345-47e7-ab75-64f1b283b579?resizing_type=fill&width=1920&height=335)

利用 **物理形体** 上的 **可行走斜面重写（Walkable Slope Override）** 可对 **角色** 能行走的表面进行调整。楼梯可能过于陡峭，或需要设置"禁止践踏青草"标示时，以下设置将助您实现功能。

## 用法

**Character Movement 组件** 拥有一个名为 **Walkable Floor Angle** 的属性。它默认约 45 度。因此当角色尝试向大于此角度的表面移动时，角色将无法爬上斜坡，或将失足滑落。

基于所在的编辑器（或者在查看关卡中的一个 Actor），将找到一个以 **Override Walkable Slope** 为前缀的属性或可扩展属性组。在此可对 **Walkable Slope Behavior** 和 **Walkable Slope Angle** 进行设置。

![Override Walkable Slope](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0962a4b8-dc20-46b5-bcd7-ab14cfc58d95/walkable-properties.png)

### 增加可行走斜面

此设置将把 **物理形体** 的可行走斜面增加到 **Walkable Slope Angle** 属性中列出的数值。如 **Walkable Slope Angle** 设为 75，则 **物理形体** 的表面角度为 65，角色将可以走上这个斜面（无视 **Walkable Floor Angle**）。

**Walkable Slope Behavior** 被设为 "Increase Walkable Slope"时：

-   **Walkable Slope Angle** 的 0.0 数值和 **Walkable Slope Behavior** 属性中的 **No Change** 本质相同。
-   如 **Walkable Slope Angle** 的数值为 90.0，角色可以走过物理形体上小于 90 度的任何角度（不包括 90 度）。

### 减小可行走斜面

此设置将把 **物理形体** 的可行走斜面"限定"到 **Walkable Slope Angle** 属性中列出的数值。如 **Walkable Slope Angle** 设为 25，则 **物理形体** 的表面角度为 35，角色将无法走上这个斜面（无视 **Walkable Floor Angle**）。

**Walkable Slope Behavior** 被设为 "Decrease Walkable Slope"时：

-   如 **Walkable Slope Angle** 的数值为 0.0，角色将无法走过 **物理形体** 表面。此设置可能会在接近于平面的表面上形成一些奇怪的行为，角色将滑过这些表面但无法改变方向。
-   **Walkable Slope Angle** 的 90.0 数值和 **Walkable Slope Behavior** 属性中的 **No Change** 本质相同。

## 范例

![The blue angle is the default Character Movement Component Walkable Floor Angle and the green represents the new Increased Walkable Slope angle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/496c9429-b532-4408-a2ff-48d0cf92e078/increased-1.png)

![The blue angle is the default Character Movement Component Walkable Floor Angle and the red represents the new Decreased Walkable Slope angle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/374ab3cc-8b25-4aec-b9fa-39fb927b4c0e/decreased-1.png)

蓝色角度为默认 **Character Movement 组件可行走地面角度**，而绿色代表新 **增加的可行走斜面** 角度。

蓝色角度为默认 **Character Movement 组件可行走地面角度**，而红色代表新 **减小的可行走斜面** 角度。

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [slope](https://dev.epicgames.com/community/search?query=slope)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [用法](/documentation/zh-cn/unreal-engine/walkable-slope-in-unreal-engine#%E7%94%A8%E6%B3%95)
-   [增加可行走斜面](/documentation/zh-cn/unreal-engine/walkable-slope-in-unreal-engine#%E5%A2%9E%E5%8A%A0%E5%8F%AF%E8%A1%8C%E8%B5%B0%E6%96%9C%E9%9D%A2)
-   [减小可行走斜面](/documentation/zh-cn/unreal-engine/walkable-slope-in-unreal-engine#%E5%87%8F%E5%B0%8F%E5%8F%AF%E8%A1%8C%E8%B5%B0%E6%96%9C%E9%9D%A2)
-   [范例](/documentation/zh-cn/unreal-engine/walkable-slope-in-unreal-engine#%E8%8C%83%E4%BE%8B)