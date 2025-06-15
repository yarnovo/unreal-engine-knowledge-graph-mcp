# 虚幻引擎中的虚拟摄像机 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-cameras-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:13:10.087Z

---

目录

![虚拟摄像机](https://dev.epicgames.com/community/api/documentation/image/e448dbdb-9fa9-4e9b-b7ad-9dec8a2ac0f3?resizing_type=fill&width=1920&height=335)

**虚拟摄像机（Virtual Camera）** 在 **虚幻引擎** 中驱动 **电影摄像机（Cine Camera）**，它使用模块化组件系统来操控摄像机数据，并将结果输出到各种外部输出提供程序中。

**虚拟摄像机组件(VCamComponent)（Virtual Camera Component (VCamComponent)）** 是基本组件，支持在虚幻引擎中构建自定义虚拟摄像机。利用VCamComponent，用户可以通过添加自定义 **修饰符（Modifiers）** 和 **输出提供程序（Output Providers）** 在虚拟引擎中驱动电影摄像机。修饰符利用自定义效果来操控摄像机数据，例如过滤、追踪和自动聚焦。输出提供程序将虚拟摄像机的输出传送至 **Composure**、**媒体框架（Media Framework）**、编辑器视口或任何运行 **Unreal Remote** 应用的设备。

此外，这个新架构还包括以下功能：

-   适用于所有功能的多**[用户编辑器支持](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)**。
-   能够将自定义UMG功能按钮覆盖在输出上，并在编辑器中或设备上与其进行交互。
-   除了触摸屏，还可以对控制器和其他硬件输入提供内置支持。
-   能够使用 **实时链接（Live Link）** 切换到任何自定义追踪系统。
-   更新后的 Unreal Remote 应用具有全新UI，并提升了流送性能。

此页面链接到与虚拟摄像机系统有关的文档，包括有关如何使用虚拟摄像机组件来构建自定义摄像机的《快速入门》，以及引擎随附的内置虚拟摄像机的概览。

[](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine)

[![使用Live Link控制虚拟摄像机Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7f86028-f0e8-4601-a625-ece7e93670cf/virtualcamera_topic.png)](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine)

[使用Live Link控制虚拟摄像机Actor](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine)

[使用Live Link驱动的示例虚拟摄像机Actor控制过场动画摄像机Actor。](/documentation/zh-cn/unreal-engine/controlling-a-virtual-camera-actor-using-live-link-in-unreal-engine)

[

![虚幻虚拟摄像机（VCam）工具和配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1e60e4b-ba79-438e-a27f-9854522c8f30/placeholder_topic.png)

虚幻虚拟摄像机（VCam）工具和配置

虚幻虚拟摄像机（VCam）应用程序的工具和配置选项





](/documentation/zh-cn/unreal-engine/unreal-vcam-tools-and-configuration-in-unreal-engine)[

![虚幻虚拟摄像机（VCam）虚拟摄像机设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91bfc47a-3f0c-4288-ab0d-e0e8db7e4dd9/placeholder_topic.png)

虚幻虚拟摄像机（VCam）虚拟摄像机设置

虚幻虚拟摄像机（VCam）应用程序的设置和配置信息





](/documentation/zh-cn/unreal-engine/unreal-vcam-virtual-camera-settings)

[](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine)

[![虚拟摄像机多用户快速入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3df8bd48-0de7-4383-a8d9-4c98d64c3ad2/topicimage.png)](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine)

[虚拟摄像机多用户快速入门指南](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine)

[使用Switchboard连接多个用户以同时操作多台虚拟摄像机。](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine)

[

![配置虚拟摄像机组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ede03860-7cfa-4d71-a4b5-fea4da234434/virtualcamera_topic.png)

配置虚拟摄像机组件

用于了解和配置自定义虚拟摄像机的指南。





](/documentation/zh-cn/unreal-engine/configuring-a-virtual-camera-component-in-unreal-engine)[

![控制虚拟摄像机功能按钮的输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4177c33-b256-4b06-89c1-d6ecb9951bd4/virtualcamera_topic.png)

控制虚拟摄像机功能按钮的输入

如何管理、编辑和配置虚拟摄像机功能按钮的输入。





](/documentation/zh-cn/unreal-engine/controlling-inputs-to-virtual-camera-controls-in-unreal-engine)[

![使用多个虚拟摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f76d9531-71a0-4d10-8278-807d6e3ec88e/virtualcamera_topic.png)

使用多个虚拟摄像机

如何在虚拟制片环境中设置多个虚拟摄像机。





](/documentation/zh-cn/unreal-engine/using-multiple-virtual-cameras-in-unreal-engine)

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [camera](https://dev.epicgames.com/community/search?query=camera)
-   [live link](https://dev.epicgames.com/community/search?query=live%20link)
-   [take recorder](https://dev.epicgames.com/community/search?query=take%20recorder)
-   [virtual camera](https://dev.epicgames.com/community/search?query=virtual%20camera)
-   [ar](https://dev.epicgames.com/community/search?query=ar)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)