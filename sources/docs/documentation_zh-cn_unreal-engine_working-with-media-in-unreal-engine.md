# 在虚幻引擎中使用媒体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/working-with-media-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:24:08.484Z

---

目录

![使用媒体](https://dev.epicgames.com/community/api/documentation/image/e51d213b-eea7-4480-91d6-0c271e9626c8?resizing_type=fill&width=1920&height=335)

借助虚幻引擎，你可以将预先录制的媒体无缝集成到你的项目，并共享你的实时或录制好的渲染帧。可以使用虚幻引擎的实时渲染功能拍摄实时视觉效果，进行无线或磁带广播，以及在复杂的物理显示器排列上进行渲染来提供实时表演。由于具备端到端的色彩管理和同步多种媒体源的能力，虚幻适用于任何虚拟制作或实时活动的技术通道。

下面的部分包含各种工具和工作流的信息，这些工具和工作流可以针对你的项目和受众充分利用媒体和渲染帧。

## 媒体集成

[

![虚幻引擎中的Bink Video](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/166b4335-ead8-485d-9ebd-6d032b30f17f/00-topic-bink.png)

虚幻引擎中的Bink Video

关于使用Bink Video播放视频的简短概述。





](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine)[

![媒体板Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4ce9ac7-ae84-4c6a-b858-82143da27c1b/media_plate_actor.png)

媒体板Actor

使用虚幻引擎中的媒体板Actor





](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine)[

![媒体框架](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b588d7be-1d85-419a-98ae-c0f2aa220bd5/topicimage_mediaframework.png)

媒体框架

在虚幻引擎中使用媒体播放功能。





](/documentation/zh-cn/unreal-engine/media-framework-in-unreal-engine)[

![专业视频I/O](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ab25962-7f17-4528-96f5-6194c1b7a844/placeholder_topic.png)

专业视频I/O

包含有关在虚幻引擎中增加和移除专业高质量视频的信息。





](/documentation/zh-cn/unreal-engine/professional-video-io-in-unreal-engine)[

![摄像机镜头校对](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e23e3e2-7b70-4871-ad51-c0353f363825/placeholder_topic.png)

摄像机镜头校对

摄像机校对插件为用户提供了简易工具和流程，以便在编辑器中校对摄像机和镜头。





](/documentation/zh-cn/unreal-engine/camera-lens-calibration-in-unreal-engine)[

![ICVFX](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58299844-774b-44b4-bf7c-22175d0c0fb1/topicimage_incameravfx.png)

ICVFX

借助镜头内视效，你可以在沉浸式LED摄影棚中，一边拍摄实景表演，一边拍摄实时视觉特效。





](/documentation/zh-cn/unreal-engine/in-camera-vfx-in-unreal-engine)[

![使用nDisplay在多显示屏上进行渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f3e62d8-e413-44b2-ac6a-29ef33b05843/ndisplay_topic.png)

使用nDisplay在多显示屏上进行渲染

nDisplay系统可以在多个显示屏上同时渲染您的虚幻引擎项目。





](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine)[

![使用Composure进行实时合成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c6d87cf-98bc-415e-85dc-303da93a15e0/compositingoverview_layered.png)

使用Composure进行实时合成

在虚幻引擎提供的图形工具插件Composure中，我们添加了一组新工具以便大幅简化合成工作。





](/documentation/zh-cn/unreal-engine/real-time-compositing-with-composure-in-unreal-engine)[

![纹理共享](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f866a77-979a-482d-8359-a4dce31616bb/texture_share_topic_image.png)

纹理共享

跨虚幻引擎实例、nDisplay设备和其他图形应用程序共享GPU数据并绕过CPU。





](/documentation/zh-cn/unreal-engine/texture-share-in-unreal-engine)[

![混合现实捕获](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/369f14af-6f4f-4428-83d9-851b676d5b48/mrdevelopment_topic.png)

混合现实捕获

借助混合现实捕获（MRC）将用户合成进虚拟空间中。





](/documentation/zh-cn/unreal-engine/mixed-reality-capture-in-unreal-engine)

## 与媒体组件通信

[

![DMX](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ccf6d52-8411-4a54-816a-58546819ab2b/dmx-topicimg.png)

DMX

DMX插件使虚幻引擎能够用于现场活动和永久性数字安装设备。





](/documentation/zh-cn/unreal-engine/dmx-in-unreal-engine)[

![Switchboard概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d7378ec-6f8a-4ecb-b0c1-aa9d263d10f9/topic-image-switchboard.png)

Switchboard概述

借助Switchboard从一个应用程序控制多个远程机器。





](/documentation/zh-cn/unreal-engine/switchboard-in-unreal-engine)[

![舞台监视器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14c66158-cef4-491f-9531-dc5c1fea9c0f/placeholder_topic.png)

舞台监视器

舞台监视器报告多个虚幻引擎实例中的事件





](/documentation/zh-cn/unreal-engine/stage-monitor-with-unreal-engine)[

![计时数据监控](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d1b4c27-8d64-406d-853e-e42aa90a25d7/image_0.png)

计时数据监控

通过Live Link或SDI监控、校准和查看从多个源传入的计时数据。





](/documentation/zh-cn/unreal-engine/timed-data-monitor-in-unreal-engine)

## 管理颜色

[

![工作颜色空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d4f8404-43d6-40ac-a639-543a84136ec0/placeholder_topic.png)

工作颜色空间

虚幻引擎中工作颜色空间的概述





](/documentation/zh-cn/unreal-engine/working-color-space-in-unreal-engine)[

![OpenColorIO颜色管理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec77892c-b4d0-4eb5-a24c-8a8a9abdd66f/ocio_heroimage.png)

OpenColorIO颜色管理

使用OpenColorIO确保项目间的颜色一致性。





](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine)[

![色彩校正区域](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a7fad11-ec5f-4698-aee1-83cc915cbf1d/topicimage_ccr.png)

色彩校正区域

有关将使用体积的色彩分级应用于具有色彩校正区域的关卡环境的细节。





](/documentation/zh-cn/unreal-engine/color-correct-regions-in-unreal-engine)

## 捕获媒体

[

![Taking Screenshots](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec33036f-0c08-4848-99d3-b696b2f5d5e1/00-topic-image-taking.png)

Taking Screenshots

Guide to taking in-game screenshots of environments and gameplay.





](/documentation/en-us/unreal-engine/taking-screenshots-in-unreal-engine)[

![全景采集工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63817c9c-e737-4969-b894-a01d4655bf86/spe_topic_image_00.png)

全景采集工具

了解如何使用立体全景插件采集 VR 图像。





](/documentation/zh-cn/unreal-engine/panoramic-capture-tool-in-unreal-engine)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [媒体集成](/documentation/zh-cn/unreal-engine/working-with-media-in-unreal-engine#%E5%AA%92%E4%BD%93%E9%9B%86%E6%88%90)
-   [与媒体组件通信](/documentation/zh-cn/unreal-engine/working-with-media-in-unreal-engine#%E4%B8%8E%E5%AA%92%E4%BD%93%E7%BB%84%E4%BB%B6%E9%80%9A%E4%BF%A1)
-   [管理颜色](/documentation/zh-cn/unreal-engine/working-with-media-in-unreal-engine#%E7%AE%A1%E7%90%86%E9%A2%9C%E8%89%B2)
-   [捕获媒体](/documentation/zh-cn/unreal-engine/working-with-media-in-unreal-engine#%E6%8D%95%E8%8E%B7%E5%AA%92%E4%BD%93)