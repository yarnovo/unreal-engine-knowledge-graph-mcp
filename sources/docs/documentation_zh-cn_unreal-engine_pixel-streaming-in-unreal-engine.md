# 虚幻引擎像素流送 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:46:25.339Z

---

目录

![像素流送](https://dev.epicgames.com/community/api/documentation/image/9651115c-7307-40ab-8f09-3ea091a00d08?resizing_type=fill&width=1920&height=335)

虚幻引擎（UE）中的像素流送的工作原理类似于使用在线流送服务流送视频，只是用户可以通过流送界面于与应用程序互动。UE的像素流送系统可以在一台台式个人电脑或云服务器上运行打包的UE应用程序，同时还能运行少量网络服务。用户可以使用台式机或移动设备的网页浏览器连接到通过像素流送的应用程序前端。

连接后，用户可以从远程UE应用程序流送渲染的帧和音频，并通过前端与其交互。它支持以下类型的输入：

-   键盘
-   鼠标
-   触屏输入
-   为玩家的网页创建的自定义HTML5用户界面

由于前端是嵌入网页的，用户无需安装或下载任何外的软件以支持像素流送。

本分段中的页面将提供使用UE自行部署和管理像素流送应用程序的指南和参考。

## 入门

[

![像素流送概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29086168-d91b-4e4c-99cf-b17f9e59e3d9/pixelstreaming-overview-topic.png)

像素流送概述

简要介绍构成像素流送系统的组件及组件的协作方式。





](/documentation/zh-cn/unreal-engine/overview-of-pixel-streaming-in-unreal-engine)[

![虚幻引擎中的像素流送入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0180f07a-4fa9-49f9-aca0-846ea9104203/cloud-gs-topic.png)

虚幻引擎中的像素流送入门

启动并运行将虚幻引擎应用程序从一台计算机流送到同一网络上其他计算机和移动设备的过程。





](/documentation/zh-cn/unreal-engine/getting-started-with-pixel-streaming-in-unreal-engine)

## 指南

[

![创建主机和网络连接指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79510379-2ee0-4fb8-b4d4-698ddd6579ea/hosting-topic.png)

创建主机和网络连接指南

高级网络配置和创建像素流送系统的其他注意事项。





](/documentation/zh-cn/unreal-engine/hosting-and-networking-guide-for-pixel-streaming-in-unreal-engine)[

![编辑器中的像素流送](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d7469a0-d58f-4f4e-af89-d18a49a5ccfa/editorstreamingbanner.png)

编辑器中的像素流送

编辑器流送是一项试验性的功能，利用像素流送的强大能力，让用户能够流送并与虚幻引擎编辑器远程交互。此外，现在推出了一个新工具栏，专门用于编辑器中的像素流送功能。





](/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor)[

![流送优化指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c686823-3b35-45f4-8788-01487f7e61f5/streamtunebanner.png)

流送优化指南

介绍在像素流送中如何实现不同的质量、延迟和弹性，并且用示例说明有时优化图像质量、延迟或者弹性其中之一比平衡流送更重要。





](/documentation/zh-cn/unreal-engine/stream-tuning-guide)[

![与像素流送系统交互](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b3e4eb3-2e4a-431c-9db0-3549f8a84778/interactions-topic.png)

与像素流送系统交互

在运行时虚幻引擎应用程序可与像素流送系统交互的方式。





](/documentation/zh-cn/unreal-engine/interacting-with-the-pixel-streaming-system-in-unreal-engine)[

![试验性的像素流送功能](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ede7f9b-2bea-4070-ac55-b9cf9c80eb3d/experimentalbanner.png)

试验性的像素流送功能

像素流送中令人激动的新功能，仍在开发之中，但可以运行！





](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features)[

![像素流送2概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/172484c1-0804-4bda-8453-7998c0068091/placeholder_topic.png)

像素流送2概述

了解关于次世代像素流送的信息。





](/documentation/zh-cn/unreal-engine/pixel-streaming-2-overview-in-unreal-engine)

## 参考

[

![像素流参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f27d99ce-af9a-45bc-8de5-e929a2983b5e/pixelstreaming-reference-topic.png)

像素流参考

介绍像素流系统组件支持的浏览器、联网端口和配置选项。





](/documentation/zh-cn/unreal-engine/unreal-engine-pixel-streaming-reference)

## 像素流送基础硬件

[

![像素流送基础设施](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e584316-c7e6-4ad7-b1f0-d5fe614275b3/infrastructurebanner.png)

像素流送基础设施

现在像素流送服务器和Web前端在GitHub上进行外部托管，由信令服务器、配对器和SFU组成。这常常称为





](/documentation/zh-cn/unreal-engine/pixel-streaming-infrastructure)[

![自定义播放器网页](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d00ce91-280b-4241-aae1-04d3644cdab7/pixelstreaming-custom-topic.png)

自定义播放器网页

如何自定义播放流送视频和音频的网页，以及如何在页面与UE5应用程序之间交换事件。





](/documentation/zh-cn/unreal-engine/customizing-the-player-web-page-in-unreal-engine)

## 示例内容

[](/documentation/zh-cn/unreal-engine/pixel-streaming-sample-project-for-unreal-engine)

[![像素流送示例项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2f44724-e47a-4e6e-bb96-c264b4202217/topic-banner.jpg)](/documentation/zh-cn/unreal-engine/pixel-streaming-sample-project-for-unreal-engine)

[像素流送示例项目](/documentation/zh-cn/unreal-engine/pixel-streaming-sample-project-for-unreal-engine)

[像素流送演示展示演示了如何设计虚幻引擎内容，以便让观看者在Web浏览器或移动设备中体验实时流送。](/documentation/zh-cn/unreal-engine/pixel-streaming-sample-project-for-unreal-engine)

-   [pixel streaming](https://dev.epicgames.com/community/search?query=pixel%20streaming)
-   [cloud platform](https://dev.epicgames.com/community/search?query=cloud%20platform)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门](/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine#%E5%85%A5%E9%97%A8)
-   [指南](/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine#%E6%8C%87%E5%8D%97)
-   [参考](/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine#%E5%8F%82%E8%80%83)
-   [像素流送基础硬件](/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine#%E5%83%8F%E7%B4%A0%E6%B5%81%E9%80%81%E5%9F%BA%E7%A1%80%E7%A1%AC%E4%BB%B6)
-   [示例内容](/documentation/zh-cn/unreal-engine/pixel-streaming-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E5%86%85%E5%AE%B9)