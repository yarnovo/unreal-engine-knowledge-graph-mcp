# 在虚幻引擎中的虚拟制片阶段使用媒体板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-media-plate-on-virtual-production-stage-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:24:12.482Z

---

目录

![在虚拟制片中使用媒体板](https://dev.epicgames.com/community/api/documentation/image/c9b50107-de67-4a86-a6c8-98c2b729c08e?resizing_type=fill&width=1920&height=335)

[媒体板Actor](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine)在具有大型LED显示屏的群集渲染设置中特别有用，在这种设置中，Actor可以最大限度提升2D板或360经纬度EXR播放性能和质量。媒体板Actor可以使用EXR平铺和mipmap来平衡渲染节点上的负载，并改善每台PC的带宽限制。

## VP细节

-   为了利用这一最大化功能，我们建议你使用EXR媒体格式，并在[网格体设置（Mesh settings）](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93)下选择一个 **球体（Sphere）** 或 **平面（Plane）** 网格体。这两个网格体使用优化过的流送，因此媒体板只会流送对摄像机视锥体可见的图块。
-   如果你启用了虚拟制片工具（Virtual Production Utilities）插件，\[媒体板的设置\]（working-with-media\\integrating-media\\media-plate#一般设置）中会出现一个额外的属性：
    -   材质（Materials） > 创建动态材质（Create Dynamic Material） 你可以创建一个动态材质，其会公开根材质中所有可的用参数，以便你可以配置各项参数。
-   在播LED舞台上播放使用大型latlong图块的 `.exr` 文件时，可能会在两级遭遇图块请求增多的情况。图块请求增多通常发生在顶层nDisplay节点，此处的IO需求可能会超过硬件能力，从而导致停顿或播放卡顿。
    -   要防止停顿或播放卡顿，你可以将媒体板Actor设置为自动增加请求的MIP级别（低分辨率），或限制EXR图块可请求的媒体板带宽。你可以在[EXR图块与Mip设置](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine#exr%E5%9B%BE%E5%9D%97%E4%B8%8E%E8%B4%B4%E5%9B%BE)中修改这些设置。

在使用nDisplay的群集渲染设置中，我们建议你尝试使用多台PC来帮助满足带宽要求。PC数量越多，每个渲染节点的可见EXR图块就越少。这种方法利用了对图块和mip的支持，应该可以降低对每台PC的输入/输出（IO）要求。对于高分辨率EXR播放，例如同步8K+经纬度，我们还建议你采用在所有nDisplay PC上的吞吐量至少为7-10 GB/秒的SSD/NVMe Raid配置。

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [media plate](https://dev.epicgames.com/community/search?query=media%20plate)
-   [playing media](https://dev.epicgames.com/community/search?query=playing%20media)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [VP细节](/documentation/zh-cn/unreal-engine/using-media-plate-on-virtual-production-stage-in-unreal-engine#vp%E7%BB%86%E8%8A%82)