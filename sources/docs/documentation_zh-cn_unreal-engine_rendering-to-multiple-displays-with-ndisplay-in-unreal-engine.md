# 在虚幻引擎中使用nDisplay在多显示屏上进行渲染 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:34.240Z

---

目录

![使用nDisplay在多显示屏上进行渲染](https://dev.epicgames.com/community/api/documentation/image/7560f930-6d69-4696-b451-b62f6c8cafd1?resizing_type=fill&width=1920&height=335)

互动式内容不仅限于显示在一个屏幕上，或者像VR头显这样的双屏设备上。越来越多的视觉化系统想要通过多个同步显示屏实时渲染内容，更高效地让观众沉浸在游戏世界中。这些系统可能由多个相邻的物理显示屏组成，如[Powerwall](https://en.wikipedia.org/wiki/Powerwall)显示屏；或者可能使用多个投影仪将3D环境投影到穹顶、倾斜幕墙、曲面屏等物理表面，如[Cave](https://en.wikipedia.org/wiki/Cave_automatic_virtual_environment)虚拟环境。

虚幻引擎通过一个名为 **nDisplay** 的系统为这些使用场景提供支持。该系统可以解决将3D内容同时渲染到多个显示屏的一些最重要的挑战：

-   它有助于完成在网络中的不同计算机上部署和启动多个项目实例的过程，并且这些计算机各自可以渲染到一个或多个显示设备。
    
-   它根据显示硬件的空间布局，管理每一帧下每个屏幕的视锥体所涉及的所有计算工作。
    
-   它确保各个屏幕上显示的内容保持"完全"同步，将确定性内容分发到所有引擎实例。
    
-   它提供无源和有源立体声渲染。
    
-   它可以受VR跟踪系统输入的驱动，这样显示屏中的视点就可以准确地实时跟随移动观众的视点。
    
-   它足够灵活，可以支持任意相对方向的任意数量的屏幕，并可以在任意数量的项目中轻松复用。
    

如需进一步了解有关nDisplay的背景信息，更深入地了解它所支持的实际应用和显示系统以及该技术的未来前景，请在这里[下载白皮书](https://www.unrealengine.com/en-US/tech-blog/explore-ndisplay-technology-limitless-scaling-of-real-time-content)。

nDisplay是[Childish Gambino备受赞誉的2018 Pharo演出](https://www.unrealengine.com/en-US/spotlights/childish-gambino-mesmerizes-fans-with-real-time-animation)的视觉效果的重要组成部分。请参阅下面的项目聚光灯视频！

### 入门

[

![nDisplay概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d24c2040-e7c7-4bbe-9246-2c8cd21545d3/overview-topic.png)

nDisplay概述

介绍在nDisplay渲染网络中多台计算机协同工作的方法。





](/documentation/zh-cn/unreal-engine/ndisplay-overview-for-unreal-engine)[

![nDisplay快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2583f04e-47b0-41f5-b02d-1197c3d16a18/00-topic-image_ue5.png)

nDisplay快速入门

介绍nDisplay的首次设置和运行方法。





](/documentation/zh-cn/unreal-engine/ndisplay-quick-start-for-unreal-engine)[

![Unreal Stage应用程序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d4904e4-2fc1-4ac2-b7cc-81a2d51f90e1/placeholder_topic.png)

Unreal Stage应用程序

一个旨在将平板电脑用作无线控制面板，用于在物理空间中操作特定虚幻引擎功能的应用程序。





](/documentation/zh-cn/unreal-engine/unreal-stage-app-for-unreal-engine)[

![为nDisplay创建次级UV](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac9ed855-bfd4-46f3-809d-b27f4bd1462f/placeholder_topic.png)

为nDisplay创建次级UV

本指南将介绍如何为nDisplay投影网格体创建二级UV信道，从而让摄像机内视效编辑器充分利用其所有功能。





](/documentation/zh-cn/unreal-engine/creating-secondary-uvs-for-ndisplay-for-unreal-engine)[

![nDisplay配置文件参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b565612c-96dd-4687-a169-e4969aa9ed06/configuration-topic.png)

nDisplay配置文件参考

nDisplay配置文件中所有可用设置的参考指南。





](/documentation/zh-cn/unreal-engine/ndisplay-configuration-file-reference-for-unreal-engine)[

![nDisplay快速启动本地工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/260a7af6-4b23-4854-bb36-a645e6da4da5/topicimage.png)

nDisplay快速启动本地工具

如何设置并使用nDisplay Launch插件用于本地nDisplay项目渲染。





](/documentation/zh-cn/unreal-engine/ndisplay-quick-launch-local-tool-in-unreal-engine)

### 指南

[

![为现有项目添加nDisplay](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/911fd5b5-a100-40e7-9292-93beec09b008/addtoexisting-topic.png)

为现有项目添加nDisplay

介绍设置供nDisplay使用的现有项目的方法。





](/documentation/zh-cn/unreal-engine/adding-ndisplay-to-an-existing-project-in-unreal-engine)

### 参考

[

![更改nDisplay通信端口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d54213f1-cfe2-411e-be02-eb067e54e313/topic-image_ue5.png)

更改nDisplay通信端口

介绍每台计算机上nDisplay用于与群集中其他计算机通信的不同通信端口。





](/documentation/zh-cn/unreal-engine/changing-ndisplay-communication-ports-in-unreal-engine)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [graphics](https://dev.epicgames.com/community/search?query=graphics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine#%E5%85%A5%E9%97%A8)
-   [指南](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine#%E6%8C%87%E5%8D%97)
-   [参考](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine#%E5%8F%82%E8%80%83)