# 管理内容 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-content-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:18.552Z

---

目录

![管理内容](https://dev.epicgames.com/community/api/documentation/image/eae1984b-97ab-4ea3-a314-289bd49ff85b?resizing_type=fill&width=1920&height=335)

并不是所有的游戏内容都是在编辑器中创建的。大部分的美术素材都应该在外部的工具中制作，比如 3ds Max，Maya，Photoshop，ZBrush 等。下表中罗列了一些典型的应该在编辑器内部制作的素材，以及哪些应该在外部工具中创建。

资产创建的位置

 

由虚幻编辑器中创建

由外部应用程序中创建

-   游戏关卡
-   材质
-   粒子系统
-   过场动画序列
-   蓝图脚本
-   给人工智能用的导航网格（AI Navigation Meshes）
-   预计算光照信息（Light Maps）
-   场景（光卡）光照

-   静态网格物体（Static Meshes）
-   骨架网格物体（Skeletal Meshes）
-   骨架动画（Skeletal Animation）
-   材质（Textures）
-   声音（WAVs）
-   IES 灯光信息
-   Nvidia APEX 文件（APB 及 APX）

## 开始

[

![美术师快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b92f58c0-454e-4807-a7fe-9bbcf061c9de/topic-image.png)

美术师快速入门

了解作为内容创建者如何开始使用虚幻引擎5。





](/documentation/zh-cn/unreal-engine/artist-quick-start-in-unreal-engine)

## 内容指南

[

![骨骼网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ea5a5cb-33f1-4dea-a1c2-70d3793516af/topicimage.png)

骨骼网格体

在虚幻引擎中使用骨骼网格体资产创建角色。





](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)[

![Alembic文件导入器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4f85f95-7b87-45be-b140-ca4b237fd65d/alembictopicimage.png)

Alembic文件导入器

介绍Alembic文件导入过程以及导入选项。





](/documentation/zh-cn/unreal-engine/alembic-file-importer-in-unreal-engine)[

![FBX内容管线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0ea1256-4c41-4e1e-aade-bb4e14c39037/topic-image.png)

FBX内容管线

有关将FBX内容导入通道用于网格体、动画、材质和纹理的信息。





](/documentation/zh-cn/unreal-engine/fbx-content-pipeline)[

![毛发渲染与模拟](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6aeb625b-2e64-4286-83f3-a1cba76f33b8/placeholder_topic.png)

毛发渲染与模拟

关于在虚幻引擎中渲染、模拟、创建和编辑毛发造型的信息。





](/documentation/zh-cn/unreal-engine/hair-rendering-and-simulation-in-unreal-engine)[

![交换框架](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3986b10c-e505-4c81-9089-99368be6a448/topic-image.png)

交换框架

有关使用交换框架导入和导出内容的信息





](/documentation/zh-cn/unreal-engine/interchange-framework-in-unreal-engine)[

![静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38f8cd93-613a-482e-a362-543889fa0f0c/topic-image.png)

静态网格体

关于在虚幻引擎中导入和操作静态网格体的信息。





](/documentation/zh-cn/unreal-engine/static-meshes)[

![Mutable骨骼网格体生成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/200a48dc-0c71-4a70-bee0-b2b44232658a/topic-image.png)

Mutable骨骼网格体生成

介绍Mutable，它是一个用于在运行时生成动态骨骼网格体、材质和纹理的工具集。





](/documentation/zh-cn/unreal-engine/mutable-skeletal-mesh-generation-in-unreal-engine)[

![Datasmith](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e65371e-ade5-4867-a6af-6d103ba882bb/datasmith_hfb_topic-1.png)

Datasmith

Datasmith能将你的设计数据轻松快捷地导入虚幻引擎。





](/documentation/zh-cn/unreal-engine/datasmith-plugins-for-unreal-engine)[

![GL传输格式（glTF）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62073dfb-da18-49d7-bb9f-8325a1095f6e/placeholder_topic.png)

GL传输格式（glTF）

使用glTF文件格式导入和导出虚幻引擎内容





](/documentation/zh-cn/unreal-engine/the-gl-transmission-format-gltf-in-unreal-engine)[

![通用场景描述（USD）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/945a2d9e-1918-4314-a739-4535420169d3/5-0-usd-landing-page-topic.png)

通用场景描述（USD）

使用虚幻引擎通用场景描述（USD）导入和编辑内容





](/documentation/zh-cn/unreal-engine/universal-scene-description-usd-in-unreal-engine)[

![LiDAR点云插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e73674e1-3848-4803-a7ec-ca05e7f1b0d1/topic-image.png)

LiDAR点云插件

使用LiDAR点云插件，将LiDAR点云导入虚幻引擎





](/documentation/zh-cn/unreal-engine/lidar-point-cloud-plugin-for-unreal-engine)[

![建模和几何体脚本编写](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd8be15f-f664-41a6-8b0e-a8c8668bd696/topic-image.png)

建模和几何体脚本编写

引擎内的建模工具。





](/documentation/zh-cn/unreal-engine/modeling-and-geometry-scripting-in-unreal-engine)[

![使用场景变体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f85647b-721b-4c24-9de8-6a0a4c6810cb/variants-topic.png)

使用场景变体

变体管理器可协助不同场景代表间的切换。





](/documentation/zh-cn/unreal-engine/working-with-scene-variants-in-unreal-engine)[

![SpeedTree](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4a791e3-ef37-4a9a-b108-2221598554cd/placeholder_topic.png)

SpeedTree

在虚幻引擎 4 中使用 SpeedTree 的着陆页面。





](/documentation/zh-cn/unreal-engine/using-speedtree-in-unreal-engine)[

![本地化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b57586dd-8e42-42fb-91c2-a43292bec923/placeholder_topic.png)

本地化

关于如何为不同地区本地化项目内容的信息。





](/documentation/zh-cn/unreal-engine/localizing-content-in-unreal-engine)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始](/documentation/zh-cn/unreal-engine/working-with-content-in-unreal-engine#%E5%BC%80%E5%A7%8B)
-   [内容指南](/documentation/zh-cn/unreal-engine/working-with-content-in-unreal-engine#%E5%86%85%E5%AE%B9%E6%8C%87%E5%8D%97)