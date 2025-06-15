# 虚幻引擎中的基本组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/basic-components-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:57:56.661Z

---

目录

![基础组件](https://dev.epicgames.com/community/api/documentation/image/30ec9c5b-4c61-4e97-8fe2-cfe994e2b2f3?resizing_type=fill&width=1920&height=335)

**组件（Component）** 是可以添加给Actor的一项功能。

当你为Actor添加组件后，Actor就可以使用组件提供的功能。例如：

-   "聚光源（Spot Light）组件"将使Actor像聚光源一样发光。
-   "旋转运动（Rotating Movement）组件"将使Actor旋转。
-   "音频（Audio）组件"将使Actor能够播放声音。

与Actor不同，组件不能单独存在。它们只能绑定在Actor身上。

为Actor添加组件的过程，相当于为Actor添加各个零件。例如，一辆汽车（Actor）由车轮、方向盘、车身、车灯等（组件）组成。再例如，玩家角色Actor通常包含一个单独的"骨骼网格体（Skeletal Mesh）"组件（表示角色外观）、跟随角色移动的摄像机，以及接收玩家输入的控制器。

添加完构成Actor的不同组件后，即使不提供指示Actor应如何运行的任何 **蓝图（Blueprint）** 脚本（或C++代码），也可以将Actor放置在关卡中。在上面的示例中，汽车（Actor）可以作为对象存在于世界（关卡）中，无需任何驱动程序（蓝图或C++代码）告诉它要执行什么操作。然后，可以使用蓝图或C++代码单独访问汽车的每个组件（例如，如果按下油门组件，蓝图逻辑可以使汽车加速）。

## 组件实例化

与一般子对象的默认行为不同，Actor中充当子对象的各种组件都是实例化的，所有某个类的Actor实例都有着单独的组件实例。

为了理解这点，想象一下上面的汽车示例。一个"汽车（Car）"类使用组件来表示汽车的车轮。四个"车轮（Wheel）"组件是该类的默认属性中的四个子对象，并指定给了"车轮（Wheels）"数组。当创建新的汽车实例时，会专门为该汽车实例新建"车轮（Wheel）"组件实例。否则，当世界中一辆汽车移动时，所有汽车的车轮都会转动；这显然不是预期的行为。让组件默认进行实例化，免去了为Actor添加唯一子对象的麻烦。

如果没有组件实例化，所有组件变量都需要用 `Instanced` [属性说明符](/documentation/404)进行声明。

-   [components](https://dev.epicgames.com/community/search?query=components)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [组件实例化](/documentation/zh-cn/unreal-engine/basic-components-in-unreal-engine#%E7%BB%84%E4%BB%B6%E5%AE%9E%E4%BE%8B%E5%8C%96)