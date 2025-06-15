# 虚幻引擎中的伤害施加体积Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pain-causing-volume-actor-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:58:51.148Z

---

目录

![伤害施加体积Actor](https://dev.epicgames.com/community/api/documentation/image/3f40c040-00df-45dd-a145-7443fb09671e?resizing_type=fill&width=1920&height=335)

对象除了可以承受物理体积的属性影响，还能受到伤害施加体积的影响，具体属性如下：

属性

说明

**施加伤害（Pain Causing）**

体积当前是否施加伤害。

**每秒钟伤害量（Damage Per Sec）**

启用"施加伤害"时，体积对进入其内部的Actor每秒钟施加的伤害量。

**伤害类型（Damage Type）**

决定了给该Actor施加的伤害类型。

**伤害时间间隔（Pain Interval）**

当启用"施加伤害"时，应用伤害的时间间隔量，以秒为单位。

**进入时伤害（Entry Pain）**

如果启用了 **施加伤害（Pain Causing）**，此属性决定了是否在进入体积时立即施加伤害。它是基于 **伤害时间间隔（Pain Interval）** 所施加的伤害之外的伤害。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)