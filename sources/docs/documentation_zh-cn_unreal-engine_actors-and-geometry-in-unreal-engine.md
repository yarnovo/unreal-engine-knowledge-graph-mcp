# 虚幻引擎中的Actor和几何体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:58:00.130Z

---

目录

![Actor和几何体](https://dev.epicgames.com/community/api/documentation/image/df65585b-038f-4422-8a84-b514b2096c1a?resizing_type=fill&width=1920&height=335)

**Actor** 是可以放置在关卡中的任意对象，如摄像机、静态网格体或玩家出生点。Actor支持3D变换，如平移、旋转和缩放。你可以通过gameplay代码（C++或蓝图）来创建和销毁Actor。

在C++中，`AActor` 是所有Actor的基类。

要创建关卡，你可以将Actor放置到关卡（地图）中，然后移动和缩放它们以创建环境，并添加脚本，使其行为符合你的需求。本分段的文档将介绍使用Actor的基本技巧，如放置、选择和变换Actor。它们还将介绍一些最常用的Actor类型。

## 使用Actors

[](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)

[![放置Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e80ec1d-34ba-4f46-a632-64972c170605/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)

[放置Actor](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)

[展示如何在关卡中放置道具、光源和摄像机等Actor](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)

[

![选择Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5f211d0-6f00-41d8-9015-f0633a39a553/placeholder_topic.png)

选择Actor

概述用于在关卡编辑器视口中选择Actor的方法。





](/documentation/zh-cn/unreal-engine/selecting-actors-in-unreal-engine)[

![变换Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9353ad5a-0f97-48dd-b50a-1a4cc8756a30/placeholder_topic.png)

变换Actor

如何调整关卡中Actor的位置、旋转和缩放。





](/documentation/zh-cn/unreal-engine/transforming-actors-in-unreal-engine)[

![Actor对齐](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90eff11d-9215-47b9-a35d-41365e409a3c/topic-image.png)

Actor对齐

介绍虚幻引擎中的Actor对齐。





](/documentation/zh-cn/unreal-engine/actor-snapping-in-unreal-engine)[

![Actor移动性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f26fb8d0-1132-4e6b-aeac-532ad6e22d32/placeholder_topic.png)

Actor移动性

该设置可控制Actor在Gameplay期间是否能够以某种方式移动或变化。





](/documentation/zh-cn/unreal-engine/actor-mobility-in-unreal-engine)[

![Actor分组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20164be9-adf6-4157-bc7c-eb8a31bdd8c6/actorgrouping_topic.png)

Actor分组

如何在虚幻引擎中创建和处理Actor组。





](/documentation/zh-cn/unreal-engine/grouping-actors-in-unreal-engine)[

![合并Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c84c560-458c-47dd-9c70-4de3c4effbf4/placeholder_topic.png)

合并Actor

如何在虚幻引擎中将两个或更多静态网格体Actor合并为单个Actor。





](/documentation/zh-cn/unreal-engine/merging-actors-in-unreal-engine)

## 常用Actor类型

本列表并未涵盖虚幻引擎中所有的可用Actor类型。有些插件和项目模板会添加其特有的Actor，而某些Actor也并非在所有项目中可用。

[

![物理体积Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a7c75d1-88dd-4d5d-873c-b6286c6b476b/placeholder_topic.png)

物理体积Actor

介绍虚幻引擎中物理体积的属性。





](/documentation/zh-cn/unreal-engine/physics-volume-actor-in-unreal-engine)[

![玩家出生点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ac001a4-97dd-48bc-9095-938c55bd509b/topic-player-start-actor.png)

玩家出生点

玩家出生点使用指南。





](/documentation/zh-cn/unreal-engine/player-start-actor-in-unreal-engine)[

![静态网格体Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f2f01df-58da-49ba-9596-1380aab3b9d2/topic-static-mesh-actors.png)

静态网格体Actor

将静态网格体Actor放在关卡中，创建你的游戏世界。





](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine)[

![骨骼网格体Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6aa43e29-f3b2-4b7a-95bc-39fd627d5ab6/topic-skeletal-mesh-actors.png)

骨骼网格体Actor

使用骨骼网格体Actor创建玩家头像并填充你的游戏世界。





](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine)[

![几何体笔刷Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80c74a46-15ef-45db-9576-2631311f42e1/topic-image.png)

几何体笔刷Actor

使用BSP笔刷在虚幻引擎中创建关卡几何体的指南。





](/documentation/zh-cn/unreal-engine/geometry-brush-actors-in-unreal-engine)[

![摄像机Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e238bf40-5b30-4020-92b7-859640fcaee8/placeholder_topic.png)

摄像机Actor

了解虚幻引擎中摄像机的运用





](/documentation/zh-cn/unreal-engine/camera-actors-in-unreal-engine)[

![音频体积Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2d64dc9-73ab-46c1-992e-46328d37d2f7/placeholder_topic.png)

音频体积Actor

音频体积参数详情





](/documentation/zh-cn/unreal-engine/audio-volume-actor-in-unreal-engine)[

![触发器体积Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dadc1ef5-430b-409b-b21b-bdb29b8346f2/placeholder_topic.png)

触发器体积Actor

可用于激活并触发关卡事件的Actor。





](/documentation/zh-cn/unreal-engine/trigger-volume-actors-in-unreal-engine)[

![体积Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89ad3761-017f-443f-9412-99fde6746545/placeholder_topic.png)

体积Actor

虚幻引擎中不同类型体积Actor的参考。





](/documentation/zh-cn/unreal-engine/volume-actors-in-unreal-engine)[

![伤害施加体积Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/506cc506-8b34-4c97-a789-046da2226f5c/placeholder_topic.png)

伤害施加体积Actor

Pain-Causing Volume reference details





](/documentation/zh-cn/unreal-engine/pain-causing-volume-actor-in-unreal-engine)[

![贴花Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d699d3f-7da9-4fdf-9d47-49df5daf2442/decal_topic.png)

贴花Actor

介绍如何使用延迟贴花Actor。





](/documentation/zh-cn/unreal-engine/decal-actors-in-unreal-engine)[

![3D文本Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94765533-085e-4d06-b59b-7748b943dfe2/text3d-topic.png)

3D文本Actor

介绍如何在虚幻引擎中放置3D文本并用它创建动态图形。





](/documentation/zh-cn/unreal-engine/3d-text-actor-in-unreal-engine)[

![目标点Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b09f5d40-3471-4fdc-96fa-837d9b342f57/placeholder_topic.png)

目标点Actor

目标点 Actor 的创建和使用指南。





](/documentation/zh-cn/unreal-engine/target-point-actors-in-unreal-engine)

-   [actors](https://dev.epicgames.com/community/search?query=actors)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用Actors](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine#%E4%BD%BF%E7%94%A8actors)
-   [常用Actor类型](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine#%E5%B8%B8%E7%94%A8actor%E7%B1%BB%E5%9E%8B)