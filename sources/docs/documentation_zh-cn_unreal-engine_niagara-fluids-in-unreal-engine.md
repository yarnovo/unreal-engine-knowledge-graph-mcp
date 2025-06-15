# 虚幻引擎中的Niagara流体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/niagara-fluids-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:30:14.276Z

---

目录

![虚幻引擎中的Niagara流体](https://dev.epicgames.com/community/api/documentation/image/d4a7555f-48d9-44df-96a6-5a8442629c1c?resizing_type=fill&width=1920&height=335)

**Niagara流体** 为虚幻引擎带来了实时流体特效。启用Niagara流体插件后，你将获得可以制作火焰和烟雾等特效的流体模板。尽情使用专为游戏优化的2D模板，或者为电影设计的3D模板。

流体模拟比简单的基于粒子的方法更加自然真实。这些流体构建在Niagara架构上。进阶用户不需要自行编写代码、插件或者数据接口便可以修改。

## Niagara流体入门

入门Niagara流体，可以先阅读[流体模拟概览](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview) 文档。然后根据[Niagara流体快速指南](/documentation/zh-cn/unreal-engine/niagara-fluids-quick-start-guide-for-unreal-engine) 学习如果在你的项目中加入模板。

[](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview)

[![流体模拟概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5e805a8-9d5a-4cdf-b714-c1df5781efea/fluid-simulation-topic-image.png)](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview)

[流体模拟概述](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview)

[介绍虚幻引擎中的流体模拟。](/documentation/zh-cn/unreal-engine/fluid-simulation-in-unreal-engine---overview)

[

![Niagara流体快速入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88316227-d3b3-4dbc-b5a0-2d1cd53ca1ea/niagara-fluids-quick-start-topic.png)

Niagara流体快速入门指南

关于使用Niagara流体插件创建实时流体模拟的快速入门指南。





](/documentation/zh-cn/unreal-engine/niagara-fluids-quick-start-guide-for-unreal-engine)

## 延伸阅读

Niagara流体基于现有的Niagara框架而构建。流体模拟需要大量的算力。你可以先创建一个流体发射器，将结果烘焙至一个Flipbook，然后便可以在任何材质上使用这些流体。具体操作方法参考[Niagara Flipbook烘焙器快速指南](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine)。

流体场景需要大量的图形运算，可能导致GPU崩溃。若出现这种情况，可以参考以下的解决方案。

[](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine)

[![Niagara图像序列视图烘焙器快速入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09575ac5-ded0-4963-a6f1-c114599beb01/flipbook-baker-topic.png)](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine)

[Niagara图像序列视图烘焙器快速入门指南](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine)

[在虚幻引擎中创建Niagara图像序列视图的快速入门指南。](/documentation/zh-cn/unreal-engine/niagara-flipbook-baker-quick-start-guide-in-unreal-engine)

[

![如何修复GPU驱动程序崩溃](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/189c3958-d728-47f6-8b42-dbb7d9b95d64/fix-a-gpu-crash-topic.png)

如何修复GPU驱动程序崩溃

了解如何在Windows中编辑注册表项来修复GPU驱动程序崩溃。





](/documentation/zh-cn/unreal-engine/dealing-with-a-gpu-crash-when-using-unreal-engine)

## 参考指南

了解Niagara流体模板中各个可调试的参数，参阅[Niagara流体参考指南](/documentation/zh-cn/unreal-engine/niagara-fluids-reference-in-unreal-engine)。

[](/documentation/zh-cn/unreal-engine/niagara-fluids-reference-in-unreal-engine)

[![Niagara流体参考指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02aa7918-3f9e-4076-904e-d0265fe227c4/fluids-reference-topic.png)](/documentation/zh-cn/unreal-engine/niagara-fluids-reference-in-unreal-engine)

[Niagara流体参考指南](/documentation/zh-cn/unreal-engine/niagara-fluids-reference-in-unreal-engine)

[Niagara流体插件的参考指南。](/documentation/zh-cn/unreal-engine/niagara-fluids-reference-in-unreal-engine)

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Niagara流体入门](/documentation/zh-cn/unreal-engine/niagara-fluids-in-unreal-engine#niagara%E6%B5%81%E4%BD%93%E5%85%A5%E9%97%A8)
-   [延伸阅读](/documentation/zh-cn/unreal-engine/niagara-fluids-in-unreal-engine#%E5%BB%B6%E4%BC%B8%E9%98%85%E8%AF%BB)
-   [参考指南](/documentation/zh-cn/unreal-engine/niagara-fluids-in-unreal-engine#%E5%8F%82%E8%80%83%E6%8C%87%E5%8D%97)