# 在虚幻引擎中使用射线进行命中判定 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/traces-with-raycasts-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:52:09.767Z

---

目录

![使用射线进行命中判定](https://dev.epicgames.com/community/api/documentation/image/c095f4a7-7977-4907-bd28-762a58fa1266?resizing_type=fill&width=1920&height=335)

游戏中可能存在这样的情况：需要确定玩家角色是否在看着某件物体；如是，则以某种方式调整游戏状态（例如在玩家看着某件物体时将其高亮显示）。或者需要确定敌人是否能看到玩家角色；如是，则开始射击或以其他方式攻击。使用 **追踪** (or **光线投射**)可实现这两种情况——"发射"一道不可见的光线检测两点之间的几何体；如命中几何体，返回被击中的内容，以便对其进行操作。

运行追踪时有数个不同的可用选项。您可运行追踪，检查和任意目标发生的碰撞（命中的对象将被返回）；或者按追踪通道运行追踪，只有在对象被设为响应特定的追踪通道时（可通过 Collision Settings 进行设置）命中的对象才返回命中信息。

除按对象或追踪通道运行追踪外，您还可运行追踪检测单次命中或多次命中，单次追踪只返回单次命中结果，多次追踪返回追踪造成的多次命中。也可通过追踪指定使用的光线类型：直线、方块、胶囊体或球体。

## 话题

通过下方链接了解更多使用蓝图的射线命中判定。

[](/documentation/zh-cn/unreal-engine/traces-in-unreal-engine---overview)

[![追踪概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e2fa587-ae9c-41de-a2d1-b7158ea086a2/trace-overview-topic.png)](/documentation/zh-cn/unreal-engine/traces-in-unreal-engine---overview)

[追踪概述](/documentation/zh-cn/unreal-engine/traces-in-unreal-engine---overview)

[虚幻引擎5追踪系统概述。](/documentation/zh-cn/unreal-engine/traces-in-unreal-engine---overview)

[

![追踪指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32902c13-43a9-4a67-8e5f-49293b446181/trace_topic.png)

追踪指南

虚幻引擎追踪（光线投射）相关的指南。





](/documentation/zh-cn/unreal-engine/traces-tutorials-in-unreal-engine)

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [tracing](https://dev.epicgames.com/community/search?query=tracing)
-   [raycast](https://dev.epicgames.com/community/search?query=raycast)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [话题](/documentation/zh-cn/unreal-engine/traces-with-raycasts-in-unreal-engine#%E8%AF%9D%E9%A2%98)