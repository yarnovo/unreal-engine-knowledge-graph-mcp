# 虚幻引擎协作查看器（Collab Viewer）模板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/collab-viewer-templates-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:00.863Z

---

目录

![协作查看器（Collab Viewer）模板](https://dev.epicgames.com/community/api/documentation/image/d416ab9b-5d84-4b90-afb3-1b1b35062297?resizing_type=fill&width=1920&height=335)

协作查看器（Collab Viewer）模板能让多个用户同时体验同一个3D内容。团队可以使用此模板更轻松快捷地对设计进行实时查阅和交流，提高发现问题和迭代内容的效率。

## 行业模板

虚幻引擎提供了两种协作查看器模板，分别为不同用户定制。

-   OEM/制造业：该模板为汽车设计而定制。它包括中的不同类型的场景灯光，可以演示不同条件的汽车表面效果。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f32beaba-d2d6-4040-adff-a661b1215d2b/oem-manufacturing-template.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f32beaba-d2d6-4040-adff-a661b1215d2b/oem-manufacturing-template.png)
    
    点击查看大图。
    
-   AEC：该模板有为建筑、工程和施工准备的定制内容，包括一个示范建筑的样本，以演示如何设置建筑模型。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fb751fc-050c-4b44-8e19-26cb09de499a/aec-template.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fb751fc-050c-4b44-8e19-26cb09de499a/aec-template.png)
    
    点击查看大图。
    

在协作查看器（Collab Viewer）会话中，每个参与者都可以使用配备标准鼠标和键盘的计算机，或使用配备VR头戴显示器和运动控制器的计算机。该模板拥有多种内置工具，可以在运行时与场景内容进行交互。每个参与者都可以执行以下操作：移动对象，将对象改为X射线透明材质，播放动画来演示将内容"炸"成不同的空间排列，等等。每个人都可以在会话中看到彼此的化身，还可以用激光笔工具指出场景的特征：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8381be64-1515-4fb0-a359-2216151951ad/collabviewer-overview.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8381be64-1515-4fb0-a359-2216151951ad/collabviewer-overview.png)

点击查看大图。

协作查看器（Collab Viewer）模板能够处理多查看者体验固有的大多数疑难问题，其中包括在多台计算机之间建立连接和复制状况信息。从该模块开始体验设计查阅，在联网设置上少花时间，将更多时间投入到设计构思上。在团队协作中，它非常适用于评估和交流设计。此外它还拥有充足的交互和导航控制，即使对3D内容单人体验而言也是一个很好的起点。

所有交互和导航控制均由项目中的蓝图类提供，所以可自定义、参考借鉴，甚至可以复制到自己的项目中。欲详细了解蓝图用法，请参阅[蓝图可视化脚本编写](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。

本页全面介绍协作查看器（Collab Viewer）模板入门指南，以及如何将其用于自己的内容。

我们准备了一段视频来演示文中所述的协作查看器模板的相关概念和操作流程。具体内容，请参阅下方的网络研讨会录制视频：

## 工作流程

协作查看器（Collab Viewer）模板的常规使用模式如下：

1.  使用模板创建新项目，或将模板内容引入自己的现有项目。
2.  在项目中设置要与其他人共享的内容。  
    这通常涉及数据导入和查看开发任务，在其他虚幻引擎项目中也需要执行这类操作。欲详细了解设置内容时要牢记的具体注意事项（如碰撞和导航网格体），请参阅[向协作查看器（Collab Viewer）添加自己的内容](/documentation/zh-cn/unreal-engine/adding-your-own-content-to-the-collab-viewer-in-unreal-engine)。
3.  用虚幻编辑器内置的工具将项目打包到可执行文件。
4.  将此文件共享给参与协同查阅的人员。
5.  一位用户启动虚幻引擎打包应用程序并以服务器模式启动。
6.  要参与此查阅会话的所有其他用户在各自计算机上启动此应用程序，并加入服务器会话。

欲了解用模板默认内容完成上述步骤的详细教程，请参阅[快速入门](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine)。

## VR支持

协作查看器模板默认使用OpenXR插件来支持VR头盔的交互功能。各平台（如Oculus VR和Steam VR）的自定义插件仍会受到支持，并且在必要时可以重新启用。

## 入门指南

[

![协作查看器（Collab Viewer）模板快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95944ee2-8107-4d67-b8b2-8647ac813c70/topic-image.png)

协作查看器（Collab Viewer）模板快速入门

设置和运行协作查看器（Collab Viewer）模板的详细分步指南。





](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine)

## 操作指南

[

![在协作查看器（Collab Viewer）中进行注释](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0598b456-7e06-4fa6-aecf-6c7cb1d50ba1/annotating-banner.png)

在协作查看器（Collab Viewer）中进行注释

介绍如何在运行时在协作查看器（Collab Viewer）模板中快速做记录。





](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine)[

![在Collab Viewer中进行测量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd65e54a-69f6-4a44-b765-74a7993e9c19/adding-measurements-banner.png)

在Collab Viewer中进行测量

介绍运行时如何在Collab Viewer模板中添加测量。





](/documentation/zh-cn/unreal-engine/measuring-in-the-collab-viewer-in-unreal-engine)[

![保存和加载会话](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39f67133-479d-46ca-9b24-3606e661f6fb/topic-image.png)

保存和加载会话

介绍如何保存（然后重新加载）会话，包括注解、测量值和透明度





](/documentation/zh-cn/unreal-engine/saving-and-loading-a-session-in-unreal-engine)[

![向协作查看器（Collab Viewer）添加自己的内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96394e14-4a43-4cd2-8e45-51adc2dc3758/00-topic-image.png)

向协作查看器（Collab Viewer）添加自己的内容

介绍如何将自己的模型添加到协作查看器（Collab Viewer）模板中。





](/documentation/zh-cn/unreal-engine/adding-your-own-content-to-the-collab-viewer-in-unreal-engine)[

![在协作查看器（Collab Viewer）模板中使用书签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5301b0b2-3a0f-4887-a58a-32d04781c773/00-topic-image_ue5.png)

在协作查看器（Collab Viewer）模板中使用书签

介绍如何在关卡中放置书签提供预设视点，以及如何将此类书签指定到热键。





](/documentation/zh-cn/unreal-engine/working-with-bookmark-in-the-collab-viewer-template-in-unreal-engine)[

![设置爆炸动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d33eb94-f110-42d0-9837-45ee7a11bfb4/placeholder_topic.png)

设置爆炸动画

介绍如何设置某个总成或一组对象的





](/documentation/zh-cn/unreal-engine/setting-up-xr-explode-animations-in-unreal-engine)[

![在协作查看器（Collab Viewer）中进行注释](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0598b456-7e06-4fa6-aecf-6c7cb1d50ba1/annotating-banner.png)

在协作查看器（Collab Viewer）中进行注释

介绍如何在运行时在协作查看器（Collab Viewer）模板中快速做记录。





](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine)[

![在Collab Viewer中进行测量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd65e54a-69f6-4a44-b765-74a7993e9c19/adding-measurements-banner.png)

在Collab Viewer中进行测量

介绍运行时如何在Collab Viewer模板中添加测量。





](/documentation/zh-cn/unreal-engine/measuring-in-the-collab-viewer-in-unreal-engine)[

![保存和加载会话](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39f67133-479d-46ca-9b24-3606e661f6fb/topic-image.png)

保存和加载会话

介绍如何保存（然后重新加载）会话，包括注解、测量值和透明度





](/documentation/zh-cn/unreal-engine/saving-and-loading-a-session-in-unreal-engine)[

![向协作查看器（Collab Viewer）添加自己的内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96394e14-4a43-4cd2-8e45-51adc2dc3758/00-topic-image.png)

向协作查看器（Collab Viewer）添加自己的内容

介绍如何将自己的模型添加到协作查看器（Collab Viewer）模板中。





](/documentation/zh-cn/unreal-engine/adding-your-own-content-to-the-collab-viewer-in-unreal-engine)[

![在协作查看器（Collab Viewer）模板中使用书签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5301b0b2-3a0f-4887-a58a-32d04781c773/00-topic-image_ue5.png)

在协作查看器（Collab Viewer）模板中使用书签

介绍如何在关卡中放置书签提供预设视点，以及如何将此类书签指定到热键。





](/documentation/zh-cn/unreal-engine/working-with-bookmark-in-the-collab-viewer-template-in-unreal-engine)[

![设置爆炸动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d33eb94-f110-42d0-9837-45ee7a11bfb4/placeholder_topic.png)

设置爆炸动画

介绍如何设置某个总成或一组对象的





](/documentation/zh-cn/unreal-engine/setting-up-xr-explode-animations-in-unreal-engine)[

![在协作查看器（Collab Viewer）中进行注释](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0598b456-7e06-4fa6-aecf-6c7cb1d50ba1/annotating-banner.png)

在协作查看器（Collab Viewer）中进行注释

介绍如何在运行时在协作查看器（Collab Viewer）模板中快速做记录。





](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine)[

![在Collab Viewer中进行测量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd65e54a-69f6-4a44-b765-74a7993e9c19/adding-measurements-banner.png)

在Collab Viewer中进行测量

介绍运行时如何在Collab Viewer模板中添加测量。





](/documentation/zh-cn/unreal-engine/measuring-in-the-collab-viewer-in-unreal-engine)[

![保存和加载会话](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39f67133-479d-46ca-9b24-3606e661f6fb/topic-image.png)

保存和加载会话

介绍如何保存（然后重新加载）会话，包括注解、测量值和透明度





](/documentation/zh-cn/unreal-engine/saving-and-loading-a-session-in-unreal-engine)[

![向协作查看器（Collab Viewer）添加自己的内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96394e14-4a43-4cd2-8e45-51adc2dc3758/00-topic-image.png)

向协作查看器（Collab Viewer）添加自己的内容

介绍如何将自己的模型添加到协作查看器（Collab Viewer）模板中。





](/documentation/zh-cn/unreal-engine/adding-your-own-content-to-the-collab-viewer-in-unreal-engine)[

![在协作查看器（Collab Viewer）模板中使用书签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5301b0b2-3a0f-4887-a58a-32d04781c773/00-topic-image_ue5.png)

在协作查看器（Collab Viewer）模板中使用书签

介绍如何在关卡中放置书签提供预设视点，以及如何将此类书签指定到热键。





](/documentation/zh-cn/unreal-engine/working-with-bookmark-in-the-collab-viewer-template-in-unreal-engine)[

![设置爆炸动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d33eb94-f110-42d0-9837-45ee7a11bfb4/placeholder_topic.png)

设置爆炸动画

介绍如何设置某个总成或一组对象的





](/documentation/zh-cn/unreal-engine/setting-up-xr-explode-animations-in-unreal-engine)

## 参考

[

![与协作查看器进行交互](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dde736a4-cc4d-48f0-a1b5-08def26c8183/collabviewer-controls-topic.png)

与协作查看器进行交互

介绍在运行时如何在协作查看器（Collab Viewer）模板中控制摄像机并与内容交互。





](/documentation/zh-cn/unreal-engine/interacting-with-the-collab-viewer-in-unreal-engine)[

![协作查看器（Collab Viewer）联网要求](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f993846b-114d-43c1-b3dc-440618fa9742/collabviewer-networking-topic.png)

协作查看器（Collab Viewer）联网要求

介绍将多台计算机接入设计查阅体验时应考虑的要求和注意事项。





](/documentation/zh-cn/unreal-engine/networking-requirements-for-the-collab-viewer-in-unreal-engine)

-   [collaboration](https://dev.epicgames.com/community/search?query=collaboration)
-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [collab viewer](https://dev.epicgames.com/community/search?query=collab%20viewer)
-   [design review](https://dev.epicgames.com/community/search?query=design%20review)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [行业模板](/documentation/zh-cn/unreal-engine/collab-viewer-templates-in-unreal-engine#%E8%A1%8C%E4%B8%9A%E6%A8%A1%E6%9D%BF)
-   [工作流程](/documentation/zh-cn/unreal-engine/collab-viewer-templates-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [VR支持](/documentation/zh-cn/unreal-engine/collab-viewer-templates-in-unreal-engine#vr%E6%94%AF%E6%8C%81)
-   [入门指南](/documentation/zh-cn/unreal-engine/collab-viewer-templates-in-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [操作指南](/documentation/zh-cn/unreal-engine/collab-viewer-templates-in-unreal-engine#%E6%93%8D%E4%BD%9C%E6%8C%87%E5%8D%97)
-   [参考](/documentation/zh-cn/unreal-engine/collab-viewer-templates-in-unreal-engine#%E5%8F%82%E8%80%83)