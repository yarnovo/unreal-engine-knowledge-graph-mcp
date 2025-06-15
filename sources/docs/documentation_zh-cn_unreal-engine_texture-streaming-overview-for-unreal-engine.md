# 虚幻引擎纹理流送概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/texture-streaming-overview-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:23:36.271Z

---

目录

![纹理流送概述](https://dev.epicgames.com/community/api/documentation/image/9c81c483-99b7-4891-81a8-a4a1a40bc7a9?resizing_type=fill&width=1920&height=335)

纹理流送系统或流送器是引擎的一部分，负责增大和减小每个纹理的分辨率。该系统使您可以拥有良好的视觉质量， 同时有效地管理可用内存。这在一定程度上是通过Mip或Mipmap实现的，Mip或Mipmap是为您的纹理分辨率预先计算的图像序列。您可以将它们视为纹理的LOD。 有关Mip的更多信息，您可以在我们的[纹理支持和设置](/documentation/zh-cn/unreal-engine/texture-format-support-and-settings-in-unreal-engine)页面上加以了解。

流送器有自己的场景视图，它的更新周期包括

1.  更新场景视图
2.  计算每个纹理的理想分辨率
3.  根据流送池大小选择哪个分辨率实际上是可行的
4.  选择要更新的纹理
5.  生成加载/卸载请求

为完成这些任务，流送器使用异步工作线程来降低游戏线程上的工作负载，这样上述只有第一个和最后一个任务需要在游戏更新循环中完成。 场景视图包含每个Primitive组件使用的所有纹理列表以及每个纹理的场景边界和纹素场景大小。根据该信息和给定视点，可以计算出 获得良好的逐像素比率纹素所必需的分辨率。然后还会考虑一些额外的信息，例如该组件实际上是否可以在屏幕上看到。 这最终会定义每个纹理的理想分辨率。然后流送器会计算流送内存池是不是足够大，能容纳这些分辨率。如果不够，流送器会降低所选纹理的计划质量， 一次降低一个mip，直到计划的分辨率降低到预算之下。

降低mip时处理纹理的顺序由保留时间优先级来定义，请按以下顺序遵循这些规则：

1.  保留地形纹理、强制加载纹理和已经缺失分辨率的纹理
2.  保留在屏幕上可见的mip
3.  保留角色纹理和不占用过多内存的纹理
4.  删掉不可见的mip，先删掉最新看到的mip

流送器确定针对每个纹理加载的分辨率后，就会根据加载顺序优先级计算先更新哪个纹理。优先级根据按照以下顺序评估的多个条件定义：

1.  先加载可见mip
2.  先加载强制加载纹理、地形纹理和角色纹理
3.  先加载远离目标分辨率的纹理
4.  对于不可见的纹理，先加载最新看到的

最后一步是为了生成一批更新请求，每个请求增大或降低当前纹理分辨率。针对一批更新的内存量 受到内存池大小的限制，以便保持较低的动态请求数量。

## 4.15中的改进

纹理流送系统经过优化，可降低CPU使用量、内存使用量并缩短加载时间，同时消除了低分辨率瑕疵，自动处理不同平台的 各种内存预算的限制。

-   纹理内存使用量改进
-   纹理加载时间改进
-   CPU时间缩短：
    -   游戏线程更新时间缩短50%
    -   流送关卡的纹理处理停滞最高减少98%
-   低分辨率缺陷减少
-   自动内存预算
-   纹理流送调试可视化视图模式
    -   Primitive距离准确度
    -   网格体UV密度准确性
    -   材质纹理缩放准确性
    -   所需纹理分辨率

要进一步了解适用于您的游戏的这些最新改进和调试方法，请继续阅读[构建纹理流送数据](/documentation/zh-cn/unreal-engine/building-texture-streaming-data-in-unreal-engine)和 [报告纹理流送指标](/documentation/zh-cn/unreal-engine/texture-streaming-metrics-in-unreal-engine)页面。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [textures](https://dev.epicgames.com/community/search?query=textures)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [4.15中的改进](/documentation/zh-cn/unreal-engine/texture-streaming-overview-for-unreal-engine#415%E4%B8%AD%E7%9A%84%E6%94%B9%E8%BF%9B)