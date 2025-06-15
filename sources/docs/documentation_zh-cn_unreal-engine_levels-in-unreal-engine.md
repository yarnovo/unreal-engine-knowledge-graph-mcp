# 虚幻引擎中的关卡 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/levels-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:57:17.412Z

---

目录

![关卡](https://dev.epicgames.com/community/api/documentation/image/b3b81d2a-3030-453d-843a-3c03dfbcbc4f?resizing_type=fill&width=1920&height=335)

**关卡（Level）** 是游戏的"世界"的全部或一部分。关卡包含玩家可以看到并与之交互的所有内容，例如环境、可用对象、其他角色，等等。在电子游戏中，常常有多个关卡，彼此之间有划分明确的过渡（例如，在你打败一个关卡中的终极boss之后，你就会继续到下一个关卡）。对于虚幻引擎中进行的其他类型的交互式体验，你可以使用不同的关卡在不同种类的展柜或环境之间过渡。

虚幻引擎将每个关卡保存为单独的 `.umap` 文件，这就是为什么你有时会看到关卡被称为 **贴图（Maps）** 。

下面是组合起来创建关卡至少所需的元素列表：

-   一个 `.umap` 文件，即关卡本身。可将其视为保存其他所有内容的容器。
-   一个由 **静态网格体Actor（Static Mesh Actors）** 组成的环境。这些可以是树木、岩石、墙壁或其他环境Fixture。某些场景还使用其他类型的Actor，例如地形Actor或者水体Actor。
-   一个由 **骨骼网格体Actor（Skeletal Mesh Actor）** 表示的玩家角色。
-   一个或多个不同类型的 **光源（lights）** 。
-   环境声音和音效（例如，脚步声）。

复杂的关卡可能包含其他功能，如粒子效果、视效后期处理、关卡流送，等等。

如果你想看看高级虚幻项目是什么样子的，请查看Fab上的[Stack O Bot](https://www.fab.com/listings/b4dfff49-0e7d-4c4b-a6c5-8a0315831c9c)示例游戏。

下面的页面可以详细教你如何在虚幻引擎5中创建和处理关卡资产。

[

![使用关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26c3a383-532c-4ca4-82f0-339134d7ebdf/level_topic.png)

使用关卡

如何创建、保存和打开关卡资产。





](/documentation/zh-cn/unreal-engine/working-with-levels-in-unreal-engine)[

![管理多个关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19c8502d-f739-4c2a-ad65-e00771ccac97/ue5-social.png)

管理多个关卡

使用关卡窗口管理持久关卡和子关卡





](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine)[

![World Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b35e3dfc-ce35-4313-bfdb-5e46fe6e8263/world-settings-topic.png)

World Settings

The World Settings panel is where you set and override Level-specific settings.





](/documentation/en-us/unreal-engine/world-settings-in-unreal-engine)[

![更改默认关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10e70ee0-8deb-4459-a1fe-87e89c019846/placeholder_topic.png)

更改默认关卡

介绍如何设置项目的默认游戏关卡。





](/documentation/zh-cn/unreal-engine/changing-the-default-level-of-an-unreal-engine-project)

-   [levels](https://dev.epicgames.com/community/search?query=levels)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

相关文档

[

静态网格体Actor

![静态网格体Actor](https://dev.epicgames.com/community/api/documentation/image/1f2f01df-58da-49ba-9596-1380aab3b9d2?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/static-mesh-actors-in-unreal-engine)

[

骨骼网格体Actor

![骨骼网格体Actor](https://dev.epicgames.com/community/api/documentation/image/6aa43e29-f3b2-4b7a-95bc-39fd627d5ab6?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine)

[

为场景设置光照

![为场景设置光照](https://dev.epicgames.com/community/api/documentation/image/efa8f2d1-22c0-4c0f-b235-1330c6d5a663?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/lighting-the-environment-in-unreal-engine)

[

Sound Source

![Sound Source](https://dev.epicgames.com/community/api/documentation/image/b8af0818-6768-40b8-bad2-edbb34354551?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/sound-sources-in-unreal-engine)