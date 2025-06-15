# 从影片渲染队列过渡到影片渲染图表 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:42.242Z

---

目录

![从影片渲染队列过渡到影片渲染图表](https://dev.epicgames.com/community/api/documentation/image/cc792778-1994-42b3-b866-92f509029132?resizing_type=fill&width=1920&height=335)

## 简介

虚幻引擎的影片渲染图表是一种基于节点的工具，可以创建高品质的渲染输出。相比影片渲染队列，它更加强大、灵活和易用。本指南将概述如何在已熟悉了MRQ的前提下过渡到使用MRG。

## 示例内容

[Meerkat示例项目](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine)提供了简单的影片渲染图表示例。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dca1851-bfda-4cf3-9118-86ee513cd78b/image_0.png) ![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4226f4ab-8733-4bef-9295-fc6469c51130/image_1.png)

## MRQ配置到图表的过渡

默认的影片渲染图表与默认的MRQ配置几乎一致。主要区别在于，图表内置的设置节点更有助于按图层渲染。

### 导出

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f76a457-72c1-460b-8415-d093a9f36484/image_2.png)

#### 文件名格式

文件名格式被移动到了File Type Output节点。这让用户能够逐渲染图层控制文件的命名设置。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b49adecb-002a-4103-9466-32fba2a76cc7/image_3.png)

#### 命令行编码

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6a5a8fe-0199-4aa1-96b4-f17d78c03043/image_4.png)

### 设置

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be5f67b2-3dc7-4562-8ecb-16a934aa4453/image_5.png)

#### 抗锯齿

由于时间取样需要在全局层面进行设置，而空间取样可以逐渲染图层进行设置，因此图表将时间和空间取样设置分离了。

时间取样在Sampling Method节点中设置。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91d4b91e-9919-4de0-988d-d752f9438ca6/image_6.png)

而空间取样则在Renderer节点中设置。抗锯齿方法可以逐渲染图层进行设置，且也位于Renderer节点。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6bc350f7-de91-4e21-b59d-3f453b83e963/image_7.png)

#### 预热设置

预热设置得到了简化，且拥有了自己的节点：

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/839efe49-b845-48da-b814-abe2909cdf74/image_8.png)

#### 烧入

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa0afb0c-d623-479f-b4e2-680e2143d1f4/image_9.png)

#### 摄像机设置

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6fa082b-8fca-4e17-b378-3eeb99da425f/image_10.png)

#### 颜色输出

**OCIO** 也被移到了 **File Type Output** 节点，从而实现了渲染图层级别的控制，而非作业级别。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6fed2e3-77e5-452d-9a55-17a8b5ca2559/image_11.png)

色调曲线（Tone Curve）现通过Renderer节点控制。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d8a37c0-2a74-4f30-be55-3192df80f6ab/image_12.png)

#### 控制台变量

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89514818-d249-45e3-8295-2c0876d5f240/image_13.png)

#### 调试选项

写入所有样本（Write All Samples）已被移至Renderer节点

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cec77b30-4944-400c-b2f7-f48c2605d244/image_14.png)

Render Dock的Insights追踪或捕捉帧功能现位于Debug Settings节点

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/818e4b5c-7f63-4fa3-967b-b526e18a6dc1/image_15.png)

#### 游戏重载项

Game Overrides节点默认位于图表内，删除或断开连接后将失去对渲染的控制，这点与配置文件的行为相反。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd29c976-1e37-43e0-aefe-fab90ffc172f/image_16.png)

### 渲染

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73e9fd20-fd9c-45a1-9392-3a7325fc8526/image_17.png)

#### 渲染路径

用户可以将对应的节点连接到渲染链，从而在路径追踪器和延迟渲染路径之间进行选择。这可以逐渲染图层进行选择。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5248144-52ae-45fb-858e-c2b36ba4d281/image_18.png)

#### 视图模式索引

视图模式渲染现在位于Renderer节点。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7d5ff4b-6543-4246-87bd-992482d44fe3/image_19.png)

#### 额外后期处理材质

额外后期处理材质位于Renderer节点，可逐渲染图层进行设置。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e94e2971-9765-477e-89b3-81ad4decec6b/image_20.png)

#### 用户界面渲染器

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3f1e424-91ca-4e69-85d3-3c44473b77ee/image_21.png)

### 影片渲染图表暂不支持的功能

MRQ现在支持，但使用MRG时尚不支持的功能如下：

-   **nDisplay渲染**
    
-   **高分辨率渲染**
    
-   **Apple Pro Res插件**
    
-   **Final Cut Pro XML**
    
-   **预流送录制器**
    
-   **32位后期处理材质渲染**
    

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [movie render queue](https://dev.epicgames.com/community/search?query=movie%20render%20queue)
-   [render](https://dev.epicgames.com/community/search?query=render)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E7%AE%80%E4%BB%8B)
-   [示例内容](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E5%86%85%E5%AE%B9)
-   [MRQ配置到图表的过渡](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#mrq%E9%85%8D%E7%BD%AE%E5%88%B0%E5%9B%BE%E8%A1%A8%E7%9A%84%E8%BF%87%E6%B8%A1)
-   [导出](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E5%AF%BC%E5%87%BA)
-   [文件名格式](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E6%96%87%E4%BB%B6%E5%90%8D%E6%A0%BC%E5%BC%8F)
-   [命令行编码](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%BC%96%E7%A0%81)
-   [设置](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [抗锯齿](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF)
-   [预热设置](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E9%A2%84%E7%83%AD%E8%AE%BE%E7%BD%AE)
-   [烧入](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E7%83%A7%E5%85%A5)
-   [摄像机设置](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E8%AE%BE%E7%BD%AE)
-   [颜色输出](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E9%A2%9C%E8%89%B2%E8%BE%93%E5%87%BA)
-   [控制台变量](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
-   [调试选项](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E8%B0%83%E8%AF%95%E9%80%89%E9%A1%B9)
-   [游戏重载项](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E6%B8%B8%E6%88%8F%E9%87%8D%E8%BD%BD%E9%A1%B9)
-   [渲染](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E6%B8%B2%E6%9F%93)
-   [渲染路径](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E6%B8%B2%E6%9F%93%E8%B7%AF%E5%BE%84)
-   [视图模式索引](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%BC%8F%E7%B4%A2%E5%BC%95)
-   [额外后期处理材质](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E9%A2%9D%E5%A4%96%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E6%9D%90%E8%B4%A8)
-   [用户界面渲染器](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2%E6%B8%B2%E6%9F%93%E5%99%A8)
-   [影片渲染图表暂不支持的功能](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine#%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E5%9B%BE%E8%A1%A8%E6%9A%82%E4%B8%8D%E6%94%AF%E6%8C%81%E7%9A%84%E5%8A%9F%E8%83%BD)