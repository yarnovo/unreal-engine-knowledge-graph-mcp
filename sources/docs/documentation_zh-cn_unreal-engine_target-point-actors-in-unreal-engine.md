# 虚幻引擎中的目标点Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/target-point-actors-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:15.406Z

---

目录

![目标点Actor](https://dev.epicgames.com/community/api/documentation/image/e006977e-7b84-41e9-abd5-fa1e39f91d7e?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88fc477f-307c-46b4-964d-2e09c54d4e98/target_point_actors.png)

在为游戏创建场景时，有时你需要在其中放置和生成各种物体，以便玩家与之互动。**目标点 Actor（Target Point Actor）** 的作用正在于此，在世界场景中设定一个一般点，作为物体生成的点。如你对其他 3D 软件（如 3Ds Max 或 Maya）有所了解，便会发现目标点 Actor 与这些软件中的虚拟 Actor 十分相似。

## 放置目标点 Actor

可在 **All Classes（所有类）** 类目下的 **Modes（模式）** 面板中找到目标点 Actor。它的添加方法极其简单，在 **Modes（模式）** 面板中选定，然后拖入场景即可。

## 使用目标点

目标点 Actor 在虚幻引擎 4 中的用途十分广泛。下面是它的部分用途：

-   设定动画序列中摄像机对准的目标。
-   设定 AI 路径点。
-   设定 VFX（视觉特效）生成点。
-   设定可拾取道具（如回复品和物品）生成点。
-   设定世界场景中道具所在点/应放置点的视觉提示。

下述蓝图示例介绍了如何使用目标点 Actor 来指定生成点的位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0404513-d250-45bf-98ec-a79dbac187ad/target_point_as_spawn.png)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [放置目标点 Actor](/documentation/zh-cn/unreal-engine/target-point-actors-in-unreal-engine#%E6%94%BE%E7%BD%AE%E7%9B%AE%E6%A0%87%E7%82%B9actor)
-   [使用目标点](/documentation/zh-cn/unreal-engine/target-point-actors-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%9B%AE%E6%A0%87%E7%82%B9)