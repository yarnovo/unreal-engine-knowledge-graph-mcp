# 虚幻引擎中的Groom平台支持 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/groom-platform-support-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:01:19.640Z

---

目录

![Groom平台支持](https://dev.epicgames.com/community/api/documentation/image/949c5717-a0bd-43c7-8c4c-878be4f4ea62?resizing_type=fill&width=1920&height=335)

本页面介绍了支持不同Groom功能的各种平台的相关信息。

## Groom几何体类型

所有平台都支持Groom **发片** 和Groom **网格体** 几何体。然而，由于渲染开销高昂，Groom **发束** 渲染只能在某些平台上运行。

发束渲染仅在以下平台受支持：

-   使用DirectX 11、DirectX 12或Vulkan的Microsoft Windows。
-   Apple macOS
-   Linux
-   当前世代的主机，例如PlayStation 5和Xbox Series S/X。

有关虚幻引擎支持的硬件和软件的更多常规信息，请参阅虚幻引擎的[硬件与软件规格](/documentation/404)。

## Groom绑定

你可以使用Groom绑定将Groom附加到骨架网格几何体上。绑定附件有两种类型：刚性和蒙皮。

这些绑定附件支持以下平台：

-   所有平台均支持 **刚性附件** 。
-   所有平台均支持 **蒙皮附件** ，但Nintendo Switch和移动端除外，因为性能开销太高，并且缺少支持附件的实现方案。

与蒙皮附件类似，除了Nintendo Switch和移动设备外，所有平台均支持 **全局插值** （也称为RBF）。

要详细了解Groom绑定及其使用方法，请参阅[为Groom设置绑定](/documentation/zh-cn/unreal-engine/setting-up-bindings-for-grooms-in-unreal-engine)。

## 模拟

所有平台均支持Groom模拟。

要详细了解如何将模拟用于Groom，请参阅[在Groom上启用物理模拟](/documentation/zh-cn/unreal-engine/enabling-physics-simulation-on-grooms-in-unreal-engine)。

## Groom缓存

使用Groom缓存可以进行预先计算模拟/动画。这是在导线级别或发束级别实现的。

-   **发束缓存** 仅在支持发束渲染的平台上可用（请参阅上文的["Groom几何体类型"](/documentation/zh-cn/unreal-engine/groom-platform-support-in-unreal-engine#groom%E5%87%A0%E4%BD%95%E4%BD%93%E7%B1%BB%E5%9E%8B)）。
-   所有平台都支持 **导线缓存（Guides Cache）** 。

要详细了解Groom缓存及其功能，请参阅[Groom缓存](/documentation/zh-cn/unreal-engine/using-groom-caches-with-hair-in-unreal-engine)。

## 已知平台限制

-   帧率取决于多个因素，如Groom的大小、Groom的分辨率以及运行Groom的硬件。
    -   例如，对于以1080p渲染的类人Groom，你应通过NVIDIA RTX-2090Ti GPU达到30Hz或更高帧率。质量更高的设置会导致性能显著下降。
-   支持景深，但可能会产生一些瑕疵。
-   使用[路径追踪器](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)渲染的Groom与光栅化器输出的外观不同。
-   Groom尚不支持适当的预计算光照（静态或固定）。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [hair](https://dev.epicgames.com/community/search?query=hair)
-   [metahumans](https://dev.epicgames.com/community/search?query=metahumans)
-   [grooms](https://dev.epicgames.com/community/search?query=grooms)
-   [platforms](https://dev.epicgames.com/community/search?query=platforms)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Groom几何体类型](/documentation/zh-cn/unreal-engine/groom-platform-support-in-unreal-engine#groom%E5%87%A0%E4%BD%95%E4%BD%93%E7%B1%BB%E5%9E%8B)
-   [Groom绑定](/documentation/zh-cn/unreal-engine/groom-platform-support-in-unreal-engine#groom%E7%BB%91%E5%AE%9A)
-   [模拟](/documentation/zh-cn/unreal-engine/groom-platform-support-in-unreal-engine#%E6%A8%A1%E6%8B%9F)
-   [Groom缓存](/documentation/zh-cn/unreal-engine/groom-platform-support-in-unreal-engine#groom%E7%BC%93%E5%AD%98)
-   [已知平台限制](/documentation/zh-cn/unreal-engine/groom-platform-support-in-unreal-engine#%E5%B7%B2%E7%9F%A5%E5%B9%B3%E5%8F%B0%E9%99%90%E5%88%B6)