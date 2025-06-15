# 虚幻引擎毛发渲染与模拟 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/hair-rendering-and-simulation-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:00:18.950Z

---

目录

![毛发渲染与模拟](https://dev.epicgames.com/community/api/documentation/image/293f3233-1150-4218-8086-4fdccf1f06c8?resizing_type=fill&width=1920&height=335)

虚幻引擎的毛发造型（Groom）渲染与模拟系统利用基于发束的工作流来渲染每束毛发，让毛发在移动时准确地遵循物理原则。它可以让美术师实时模拟并渲染出成百上千（甚至更多）照片级逼真的毛发。在过去，在实时项目中常见的毛发都使用基于发片的技术，或其他近似方法创建。虚幻引擎中的Groom系统同样可以管理并使用这些方法。

![Example of Groom using Strands and Cards](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99421dfb-7c30-43d7-85ba-8f27c7013d7b/groom-card-strands-example.png)

展示了发束（左）和发片（右）的MetaHuman Groom角色示例。

## 入门指南

[](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine)

[![毛发渲染和模拟快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f1a2851-4692-4d60-9a10-69fc8392348e/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine)

[毛发渲染和模拟快速入门](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine)

[在项目中对角色使用毛发渲染和模拟的指南。](/documentation/zh-cn/unreal-engine/hair-simulation-and-rendering-quick-start-guide-in-unreal-engine)

[

![设置项目以使用Groom](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c672fd3-5ae9-4a08-b275-cc7a4aad2181/placeholder_topic.png)

设置项目以使用Groom

设置项目以导入和渲染Groom资产。





](/documentation/zh-cn/unreal-engine/setting-up-a-project-for-grooms-in-unreal-engine)[

![Groom平台支持](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/978479da-a8d0-455f-af39-6c8ac76322f7/placeholder_topic.png)

Groom平台支持

各平台支持的Groom功能汇总





](/documentation/zh-cn/unreal-engine/groom-platform-support-in-unreal-engine)[

![导入Groom](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3dac473-3013-426c-af48-d92d8b58bfbc/placeholder_topic.png)

导入Groom

了解如何将Groom导入到你的项目中以及Groom导入器的设置。





](/documentation/zh-cn/unreal-engine/importing-grooms-into-unreal-engine)[

![Groom组件和资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cde40ba5-038c-4570-b9d9-1f3bf485088c/placeholder_topic.png)

Groom组件和资产

使用和渲染Groom的资产和组件。





](/documentation/zh-cn/unreal-engine/groom-components-and-assets-in-unreal-engine)[

![Groom资产编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47f3ecc6-7edc-43bc-8daa-6521a739888d/groom-editor-topic-image.png)

Groom资产编辑器

关于如何管理属性以及编辑毛发资产的用户参考指南。





](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine)[

![发片生成器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24913f76-1e2b-41a8-b9b8-965badc329e4/groom-card-strands-example.png)

发片生成器

介绍如何使用发片生成器创建发片Groom。





](/documentation/zh-cn/unreal-engine/hair-card-generator-for-grooms-in-unreal-engine)

## 其他主题

[](/documentation/zh-cn/unreal-engine/groom-strands-in-unreal-engine)

[![Groom发束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15648913-e3d3-493f-b2b1-ce5744fd6a44/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/groom-strands-in-unreal-engine)

[Groom发束](/documentation/zh-cn/unreal-engine/groom-strands-in-unreal-engine)

[为发束几何体配置设置。](/documentation/zh-cn/unreal-engine/groom-strands-in-unreal-engine)

[

![为Groom设置绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bee720bc-862a-4b6f-9bfc-8806ab103f1e/placeholder_topic.png)

为Groom设置绑定

了解如何将Groom组件绑定到骨骼网格体。





](/documentation/zh-cn/unreal-engine/setting-up-bindings-for-grooms-in-unreal-engine)[

![Groom插值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/859fdd0f-77fd-41c7-a9b0-9666bd744666/placeholder_topic.png)

Groom插值

定义Groom的曲线应如何基于蒙皮网格体和物理模拟移动。





](/documentation/zh-cn/unreal-engine/groom-interpolation-in-unreal-engine)[

![对Groom启用物理模拟](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0034eba2-e0b8-44f8-ad15-576b95391e7e/placeholder_topic.png)

对Groom启用物理模拟

了解如何对Groom启用和配置物理。





](/documentation/zh-cn/unreal-engine/enabling-physics-simulation-on-grooms-in-unreal-engine)[

![为Groom设置细节级别](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b945a66-0ba6-42a1-980d-7c230aeb1e64/placeholder_topic.png)

为Groom设置细节级别

了解如何为你的Groom设置并管理细节级别组。





](/documentation/zh-cn/unreal-engine/setting-up-level-of-detail-for-grooms-in-unreal-engine)[

![为Groom设置发片和网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb570ce9-9101-4f38-be5f-52e1b3cc1e0b/placeholder_topic.png)

为Groom设置发片和网格体

为Groom设置发片和网格体，并指定细节级别。





](/documentation/zh-cn/unreal-engine/setting-up-cards-and-meshes-for-grooms-in-unreal-engine)[

![Groom材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73f204ce-dbd5-404d-9830-a1c24f0eeb7e/placeholder_topic.png)

Groom材质

管理Groom的材质。





](/documentation/zh-cn/unreal-engine/groom-materials-in-unreal-engine)[

![生成Groom纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ec5865e-aafa-40c4-84ad-99e233940d59/placeholder_topic.png)

生成Groom纹理

关于使用Groom资产创建毛发毛囊遮罩纹理和发束纹理的参考指南。





](/documentation/zh-cn/unreal-engine/generating-groom-textures-in-unreal-engine)[

![设置Groom变形器图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49060ce0-e575-4c23-8809-e12954e47193/placeholder_topic.png)

设置Groom变形器图表

使用变形器图表来定义具有网格体变形的Groom行为。





](/documentation/zh-cn/unreal-engine/setting-up-a-groom-deformer-graph-in-unreal-engine)[

![Groom缓存](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d8f74b0-2a74-4b08-81c4-0e23f67fea26/placeholder_topic.png)

Groom缓存

介绍如何将导入的Groom缓存用于Groom。





](/documentation/zh-cn/unreal-engine/using-groom-caches-with-hair-in-unreal-engine)[

![Groom的可伸缩性和性能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fa784d3-dc5b-4f7e-a7ae-42e72401b518/placeholder_topic.png)

Groom的可伸缩性和性能

了解如何使用Groom的可伸缩性选项，并为项目优化这些选项。





](/documentation/zh-cn/unreal-engine/groom-scalability-and-performance-with-unreal-engine)[

![调试Groom](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ff77464-e9fa-4b00-8384-c42df307909d/placeholder_topic.png)

调试Groom

Groom调试方法概述。





](/documentation/zh-cn/unreal-engine/debugging-grooms-in-unreal-engine)[

![Alembic for Grooms规范](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/486f1f76-ef30-46d7-bb34-b4c60abbe0c1/placeholder_topic.png)

Alembic for Grooms规范

介绍如何将Grooms导出为Alembic文件，以便在虚幻引擎中使用。





](/documentation/zh-cn/unreal-engine/using-alembic-for-grooms-in-unreal-engine)[

![XGen Groom创建指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb26435b-2508-442e-8e59-a005d036c7c9/placeholder_topic.png)

XGen Groom创建指南

介绍如何将Groom导出为Alembic文件并在虚幻引擎中使用





](/documentation/zh-cn/unreal-engine/xgen-guidelines-for-hair-creation-in-unreal-engine)

## 其他资源

-   [MetaHuman Creator](https://www.unrealengine.com/metahuman)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [hair](https://dev.epicgames.com/community/search?query=hair)
-   [metahumans](https://dev.epicgames.com/community/search?query=metahumans)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/hair-rendering-and-simulation-in-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [其他主题](/documentation/zh-cn/unreal-engine/hair-rendering-and-simulation-in-unreal-engine#%E5%85%B6%E4%BB%96%E4%B8%BB%E9%A2%98)
-   [其他资源](/documentation/zh-cn/unreal-engine/hair-rendering-and-simulation-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)