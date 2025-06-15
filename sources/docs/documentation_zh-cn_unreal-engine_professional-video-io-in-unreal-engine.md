# 虚幻引擎专业视频I/O | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/professional-video-io-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:10.840Z

---

目录

![专业视频I/O](https://dev.epicgames.com/community/api/documentation/image/41f6df68-17c9-401f-a049-e31292aa8996?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ce0119e-59a5-4ed6-a2d6-c62ff96fb968/01-page-image_ue5.png "01-page-image_ue5.png")

增强现实体验将传统2D视频与实时3D环境相结合，电影和广播媒体对这种体验的需求正日益旺盛。本节页面说明您可以如何使虚幻引擎充当视频制作管道的无缝部分工作：

-   在虚幻引擎中实时播放专业级别的视频和音频，动态合成到虚拟3D场景中。
-   将各种效果直接应用于虚幻引擎中的导入视频，如色度抠像、镜头不失真、色彩校正等。
-   将虚幻引擎与您输入视频的时间码和帧率同步，以消除计时问题。
-   将视频源从虚幻编辑器或从运行的游戏项目返回到Studio的视频管道。

## 新手入门

[

![AJA视频输入/输出快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c41161b-c780-418a-8f0f-0acfa08fcffa/00-topic-image.png)

AJA视频输入/输出快速入门

从支持的AJA媒体卡获取视频放入到虚幻引擎，并将捕获的视频输出从虚幻引擎发送到AJA卡上的端口的详细指南。





](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine)[

![Blackmagic Video输入/输出快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e26d7f9-8e60-4d57-9d2e-2169a3356e04/00-topic-image.png)

Blackmagic Video输入/输出快速入门

从支持的Blackmagic媒体卡获取视频放入到虚幻引擎，并将捕获的视频输出从虚幻引擎发送到Blackmagic卡端口上的详细指南。





](/documentation/zh-cn/unreal-engine/blackmagic-video-io-quick-start-for-unreal-engine)

## 指南

[

![时间码和同步锁定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e874e9b-4480-463e-9847-bbf00d4cc54b/topic-image.png)

时间码和同步锁定

说明如何使虚幻引擎采用来自AJA视频输入的时间码，以及如何锁定引擎的帧率以匹配源视频。





](/documentation/zh-cn/unreal-engine/timecode-and-genlock-in-unreal-engine)[

![支持多种媒体配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4f8f5a3-9676-4209-9003-407cb0b73092/00-topic-image_ue5.png)

支持多种媒体配置

媒体配置文件将输入、输出、时间码和集中同步设置收集到一个地方，以便进行配置。代理帮助路由输入和输出。





](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine)

## 参考

[

![AJA媒体框架参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e190180-5302-4068-9034-92758eab5850/00-topic-image_ue5.png)

AJA媒体框架参考

介绍AJA媒体框架组件公开的选项和设置。





](/documentation/zh-cn/unreal-engine/aja-media-reference-for-unreal-engine)[

![Blackmagic媒体框架参考指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f874ed7d-e9e0-4130-9c53-8e6a0028d8d5/00-topic-image.png)

Blackmagic媒体框架参考指南

介绍Blackmagic Design媒体框架组件公开的选项和设置。





](/documentation/zh-cn/unreal-engine/blackmagic-media-reference-for-unreal-engine)

## 示例项目

[](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine)

[![虚拟工作室](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6df49142-b0dd-41a0-8fdf-773d2d658b43/virtual-studio-topic.png)](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine)

[虚拟工作室](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine)

[虚拟工作室展示了虚幻引擎与专业级SDI卡和设备交换视频源的能力。](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [新手入门](/documentation/zh-cn/unreal-engine/professional-video-io-in-unreal-engine#%E6%96%B0%E6%89%8B%E5%85%A5%E9%97%A8)
-   [指南](/documentation/zh-cn/unreal-engine/professional-video-io-in-unreal-engine#%E6%8C%87%E5%8D%97)
-   [参考](/documentation/zh-cn/unreal-engine/professional-video-io-in-unreal-engine#%E5%8F%82%E8%80%83)
-   [示例项目](/documentation/zh-cn/unreal-engine/professional-video-io-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E9%A1%B9%E7%9B%AE)