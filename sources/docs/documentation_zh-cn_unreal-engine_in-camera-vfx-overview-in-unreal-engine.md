# 虚幻引擎镜头内视效概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:11.622Z

---

目录

![镜头内视效概述](https://dev.epicgames.com/community/api/documentation/image/5b28756b-ea4d-4416-931e-599f04fd0db2?resizing_type=fill&width=1920&height=335)

**镜头内视效**（In-Camera VFX）是一种令人激动的全新理念，用于在实时拍摄中直接拍摄实时视效。此技术依靠LED光照、实时摄像机追踪和实时渲染离轴投影这三者的结合，实现前台演员和虚拟后台之间的无缝整合。其主目标是消除对绿幕合成的需求，以便让摄像机直接拍摄最终成像。对于制作高品质实时视效来说，其中一个最大的挑战就是如何同步所有技术，以便同时推进所有内容。

**虚幻引擎（Unreal Engine）** 通过多种系统（如nDisplay、Live Link、Multi-User Editing和Web Remote Control）支持此技术。此文档涵盖了该工作流程所需的功能，以及在为镜头内视效创建拍摄场景时需要考虑的事情。

![在LED摄影棚中使用镜头内视效的场地](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cf135be-502e-4004-9323-5b78cf07c202/image_0.png)

一个在LED摄影棚内、采用镜头内视效的拍摄场地。箭头标记了摄像机的内视锥，并从摄像机视角进行渲染。

上图显示了在沉浸式 **LED摄影棚**（LED volume） 中采用in-camera VFX的场景。主LED墙上所示的画中画将显示摄像机视图，其被称为摄像机的 **内视锥（inner frustum）** 渲染。此内视锥代表从摄像机视角的视场(FOV)（基于当前镜头焦距）。内视锥中所示的图像随摄像机在场景内的移动，而通过实体摄像机进行追踪，并始终显示摄像机的虚拟对等物在虚幻引擎环境中看到的内容。当通过真实世界的摄像机进行查看时，系统会形成一个视差效应，并利用完整的虚拟3D世界而非扁平的背景板形成在真实世界位置中拍摄出来的感觉。

在摄像机视场外的LED摄影棚中显示的内容被称为 **外视锥（outer frustum）**。此外视锥可将LED面板转变为物理组的动态光源和反射光源，因为这些面板以虚拟世界包围组集，并还原光线照射在真实世界位置上的效果。摄像机移动时，外视锥保持静态。这模仿了光照和反射在真实世界中不随摄像机移动的原理。 每个拍摄点可架设于虚幻引擎环境中的预期位置，并指示用哪种外视锥渲染照亮当前场景。

## LED面板

LED舞台设计及其预期用途是in-camera VFX设置不可或缺的部分。所需的LED摄影棚内面板数量，及其布局方式推动实现剩余的硬件设置。LED面板可置于环绕actor的弧形图案中，以提供更好的环境光照和反射。它也有利于提供LED天花板，为整个场景的环境光照和反射做贡献。旨在创建完全虚拟的环境的制片过程可能需要至少270度的封闭体积，以实现精确的组集光照和反射。如果组集的主体部分为实体构建，且该组集仅一部分需要虚拟世界，如组集窗口，那么可以考虑单面或曲面墙。其他因素，包括制片预算、实体空间限制以及某些情况下，生产商面板的可用性，都会影响LED舞台的设计。

![LED摄影棚后方柜体视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c88e9be2-5def-4eeb-a0f1-3ea866c0c523/image_1.png)

LED摄影棚由箱体数组组成，这些箱体能够以任何配置排列。此图像显示了LED摄影棚的背面。

LED摄影棚由 **箱体（cabinets）** 群集构成。每个箱体都有一个固定的分辨率，范围可低至92x92像素（作为户外标识），也可达到400x450像素的超高分辨率（用于室内显示器）。每个箱体的实体尺寸随制造商的不同而异。

**LED处理器（LED processor）** 是将多个箱体组合成数组，以显示单一图像的硬件及软件。你可以在LED处理器驱动的画布内，以任意配置排列箱体。在大型LED舞台上，可能会有十个或更多的LED处理器为无缝LED墙提供驱动力。

**像素间距（Pixel pitch）** 描述了箱体内的像素密度，以及与整体分辨率的关系。像素间距通常以毫米为单位表示，代表各LED灯之间的距离。LED距离越近，间距越小，像素密度也就越高。更高的像素密度意味着更高的分辨率和图像质量，也意味着每个箱体的成本更高。

低像素间距的箱体并不一定适合你制片，因为还必须考虑其他许多因素，如视角、颜色偏移、颜色一致性，以及散热情况等。你可以咨询专业的LED系统整合商，以确定最适合你的产品。

![LED墙上的云纹图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3880c15-e7f5-4433-8973-4a19df69bb66/image_2.png)

你可以看到光学瑕疵、云纹图出现在此图像左侧的LED墙上。

页面、像素间距和摄像机传感器尺寸距离的组合有助于你确定应该距离LED墙多远，以在拍摄墙上物体时不会看到任何视觉瑕疵。在LED上进行拍摄时的一个视觉瑕疵是 **云纹图（moiré pattern）**。云纹图是一种常见的光学瑕疵，当显示系统和摄像机传感器像素发生轻微偏移时出现。当摄像机对焦平面与LED面板在3D空间中对齐时，可能出现云纹图。建议将摄像机焦点置于LED正面或背面，以便让图像略微失焦。当与LED表面呈现出严重倾角时，也经常出现云纹图。尽量让摄像机与LED表面呈直角。

## 硬件

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85a11d20-fa26-4391-b069-13edea44c56d/image_3.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85a11d20-fa26-4391-b069-13edea44c56d/image_3.jpg)

带有三个渲染节点的硬件布局示例。点击查看大图。

In-Camera VFX可能要求在影片现场准备有带各种功能的连接设备网络。图中所示为带有三个LED面板的组集硬件布局示例。下表解释了设置中各种机器设备的作用。有关镜头内视效相关的具体硬件信息，请查阅[镜头内视效推荐的硬件](/documentation/zh-cn/unreal-engine/recommended-hardware-for-in-camera-vfx-in-unreal-engine)。

设备

说明

主时钟

主时钟是系统的讯号核心。其确保所有接收或记录数据的设备在拍摄过程中保持同步。

网络

强烈建议为所有设备配备带有高吞吐量的受保护LAN网络。

nDisplay渲染节点

每个渲染节点驱动LED摄影棚的一部分。这表示每个节点都需要一个 NVIDIA GPU以及一张 NVIDIA Quadro II Sync 卡。

虚幻引擎主站

这是通常用于配置舞台布景的主要运算工作站。其还运行其他应用程序，用于启动nDisplay群集、远程控制网页应用程序以及多用户服务器。

虚幻引擎编辑器—(Tech Art)

此工作站位于多用户会话中，供艺术家进行实时场景调整，更多以舞台表演为中心的运算符则保持主设备上内容的正常运行。

虚幻引擎记录

此工作站通过Take Recorder，记录拍摄期间摄像机、光源和道具的更改。

虚幻引擎合成

此工作站在Composure中渲染实时合成。这是设置中的可选项。

虚幻引擎VR探查

此工作站带有VR头戴设备，可在拍摄过程中探查环境。这在拍摄影片和单独使用时都作用明显。

Perforce代理

Perforce代理是一种现场快速连接外部Perforce服务器的选项。

远程控制网页应用程序

这是一种使用HTML、CSS和JavaScript框架编写的网页应用程序，可通过带有网页浏览器的平板电脑或设备远程控制场景。

摄像机追踪

摄像机追踪可能涉及光学、功能或机械追踪，以派生出摄像机的3D位置。此设置可能包括由追踪公司提供的小型PC或服务器。

摄像机

这是现场的数字电影摄像机，并可以与摄像机追踪系统配对。

Video Village

这是视频播放和回看中心。

## 摄像机追踪

![in-camera VFX制片所用摄像机的现场拍摄](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c9f94e1-f64d-446d-853f-5e6d1e6cfe44/image_4.png)

需要通过摄像机追踪，将摄像机的位置和移动从真实世界转发到虚拟世界。通过此技术，可将摄像机的正确视角渲染至相对的虚拟环境中。有若干种通过in-camera VFX进行摄像机追踪的不同方法。

摄像机追踪的最常见方法包括：

-   **光学追踪（Optical Tracking）：**光学追踪系统利用专门的红外感应摄像机来追踪反射或主动红外标记，以确定拍摄摄像机的位置。
    
-   **功能追踪（Feature Tracking）：**与追踪光学追踪系统所使用的自定义标记不同，功能追踪涉及对真实世界对象特定图形的识别，并将其作为追踪源。
    
-   **惯性追踪（Inertial Tracking）：** 惯性测量单元(IMU)包含陀螺仪和加速度计，以确定摄像机的位置和方向。IMU通常配合光学和功能追踪系统使用。
    

建议为in-camera VFX使用测量摄像机位置和方向的多个源头，如集合了惯性追踪的光学追踪。多源头与任何单一技术相比，可获得更好的整体摄像机追踪数据。

### Live Link

Live Link是虚幻引擎内摄取实时数据的框架，这些实时数据包括摄像机、光源、变形和基本属性。对于in-camera VFX，Live Link在分发被追踪的摄像机信息方便具有至关重要的作用，并可将其启用以配合nDisplay将追踪信息送至每个群集节点。虚幻引擎通过Live Link实现了对多种摄像机追踪合作伙伴的支持，其中包括Vicon、Stype、Mo-Sys和Ncam，以及多种其他专业追踪解决方案。请参阅[Live Link Plugin](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)了解更多信息。

### 摄像机校准

如果要精准地合成CG画面和拍摄现场画面，你需要在虚幻引擎中创建一台虚拟摄像机，并让它与负责拍摄现场画面的物理摄像机保持精准同步。虚拟摄像机的位置和朝向必须与物理摄像机的位置朝向精准同步，而且它的跟踪信息必须精确匹配视频信号的计时，确保每一帧视频画面都与摄像机位置持续精确同步。

摄像机校准插件为用户提供了简化的工具和工作流程，用于在编辑器中校准摄像机与镜头。校准过程会产生必要的数据，以便虚拟摄像机与物理摄像机在空间中对齐位置，并对物理摄像机的镜头畸变进行建模。该插件引入了镜头文件（Lens File）资产类型，它封装了所有用于摄像机和镜头的校准数据。

摄像机校准插件还包含一个健壮的镜头畸变管线。它会获取校准后的畸变数据，然后在CG画面上添加一层精准的后期处理效果。畸变效果可以直接应用到[电影摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)上，它可以在[影片渲染队列](/documentation/404)中使用，或应用到[Composure](/documentation/zh-cn/unreal-engine/real-time-compositing-with-composure-in-unreal-engine) 的CG层。

该插件的工具和框架具有可扩展性和灵活性，可以支持各种镜头和工作流程。

更多信息，请参考[摄像机校准](/documentation/zh-cn/unreal-engine/camera-lens-calibration-in-unreal-engine)。

## 镜头内视效的时间码和同步锁定

在in-camera VFX影片现场，务必保证所有设备之间的高精度同步。每台设备，如摄像机、计算机和追踪系统都带有一个内部时钟。即便两台设备完全一致，其内部时钟仍可能互不同步。如果未统一，会导致出现显示方面的问题，如画面撕裂。通过nDisplay进行Genlock以防止出现此类问题。请参阅[nDisplay中的同步](/documentation/zh-cn/unreal-engine/synchronization-in-ndisplay-in-unreal-engine)，获取关于nDisplay中同步和同步锁定的更多信息。

除了同步显示外，引擎的时间码和帧生成需要匹配来自摄像机的输入。如何在所有设备之间同步时间码以及genlock引擎的步骤，请参见[时间码和同步锁定](/documentation/zh-cn/unreal-engine/timecode-and-genlock-in-unreal-engine)。

当为in-camera VFX搭建环境时，务必注意nDisplay带有一些需要考虑的特定限制。应避免如SSGI、SSAO、SSR、晕映、眼部适应和泛光之类在页面上间隔排列的效果。由于这些效果的性质在页面上间隔排列，在nDisplay系统内的两个集群节点之间会出现边框问题。

## In-Camera VFX多用户编辑

![展示VR探查中某人视角的两张图，来自多用户会话内的摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ac5b22a-b91b-482c-b7f8-d18cb334b3a4/image_5.png)

左图是多用户会话中VR探查专用设备的视图。右图表示显示摄像机视角和用户VR探查表现形式的LED墙。

**多用户编辑** 系统实现了可靠的协作，以支持任何类型的更改。主运算符设备负责场景修改，和对nDisplay渲染设备的实时更新。你可以在相同的多用户会话中拥有多个运算符设备，实时执行不同的任务并修改场景。示例中的设备专用于VR探查，并可通过Composure进行实时合成。由一台设备运行多用户服务器，然后其他所有设备均连接至该服务器。来自这些设备的任何场景变更，都将在之后以操作的形式从服务器发送至所有其他设备。从概念上讲，引擎内任何可被 *撤销（undone）* 的操作都可以被处理，并通过多用户服务器发送。

如需了解如何在项目中添加多用户编辑，请参阅[多用户编辑入门](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine)。当无法在你的网络中进行服务器自动发现时，请执行[高级多用户网络](/documentation/zh-cn/unreal-engine/advanced-multi-user-networking-in-unreal-engine)中的步骤。

## 实时合成

![一个采用镜头内视效的场景，展示摄像机视图内的绿幕，但仍使用LED墙制作光照和反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7950ee02-12f9-4381-938b-c4e91e2df266/image_6.png)

带有绿幕的组集仅在摄像机视图内可见。外视锥仍将显示来自虚幻引擎环境的渲染，以便制作光照和反射。

对于无法在in-camera最终步骤中实现的拍摄部分，系统提供了回退选项。内视锥可通过可调的追踪标记轻松更改为绿幕。外视锥可继续显示来自虚幻引擎环境的渲染。

![通过绿幕拍摄和后期合成的两张图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7eae2dc-1095-4323-bccf-344285d0f405/image_7.png)

由于此组集在外视锥中使用了LED墙制作环境光照和反射，你可以看到摩托和actor眼镜的真实世界反射，即使最终拍摄中的背景已经被合成。

仅在摄像机视场内使用绿幕可最小化特定拍摄中所需的绿幕数量。更少的绿幕意味着更少的绿幕溢出到actor和场景上。继续显示来自外视锥上虚幻引擎环境的渲染，可以让制片过程仍利用到真实世界光照和in-camera VFX的反射能力。 二者都对合成用绿幕元素的改良做了贡献。

绿幕拍摄也从实时合成中获益，其允许电影拍摄人员和执行人员更全面地了解在经典的绿幕环境下，最终拍摄效果将如何。 这些合成在编辑预览镜头时也非常有价值。

**Composure** 是用于实时合成的虚幻引擎框架。通过这一组功能，你可以将实时视频源、AR合成、绿幕镶迭、垃圾遮罩、颜色校正和镜头畸变加入你的镜头中。Composure是一种灵活的系统，你可以在其中扩展和创建你自己的材料效果。请参见[Composure](/documentation/zh-cn/unreal-engine/real-time-compositing-with-composure-in-unreal-engine)了解更多。

## In-Camera VFX的远程控制

由于在in-camera VFX拍摄中涉及如此多的设备，通过网页应用程序实时控制场景会非常有用。例如，你可以从网页应用程序更改颜色校正、光照和虚拟actor位置。在ICVFX示例项目包含一个远程控制预设示例以及一个网页应用，以便演示如何将此技术整合到你的制片流程中。除了使用远程控制预设，你还可以使用UI生成器来自定义控制选项，以便满腹项目需求。请参见[Web Remote Control](/documentation/zh-cn/unreal-engine/remote-control-for-unreal-engine)，了解远程控制的更多信息。

![拍摄过程中通过网页应用程序远程控制场景以更改背景](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a456c29-a93e-49d2-a7a9-decff925b781/image_8.png)

在为镜头调整场景时，远程控制会非常有用。在此组集中，网页应用程序被用于在拍摄过程中变换天空效果。

## 颜色校正

in-camera VFX拍摄过程中，确保拍摄的几组镜头之间颜色一致至关重要。通过查看实时动作摄像机来确认最终画面是一种很好的做法，还可通过（将外视锥显示为光源的）LED面板进行测试。

执行以下最佳实践确保几组镜头之间的一致性：

-   所有摄像机输出的效果不一致。如果几组镜头的拍摄使用不同的摄像机，可能让截取的颜色也不一致。在使用LED摄影棚拍摄影片时，使用同一部摄像机可以避免这种情况的发生。
    
-   使用LED摄影棚上的视觉效果测试作为光源的现场实时操作资产。来自LED面板的光源在与其他光源的作用下，对舞台元素会产生不同的效果。
    
-   确保色调映射器已禁用，从而让来自引擎的内容不带有色调曲线，并位于线性sRGB色彩空间中，作为LED面板的输入。可通过控制台命令 **ShowFlag.Tonemapper 0** 禁用色调映射器。
    

### OpenColorIO

[OpenColorIO](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine)，简称OCIO，是一个主要用于电影和虚拟制片的颜色管理系统。OCIO能确保拍摄到的视频颜色在整个制片管线中保持一致。这个管线包括最初的摄像机拍摄，特效合成期间的所有合成应用，以及最终的渲染画面。

OCIO是虚幻引擎中的一个插件。启用插件后，你可以将OCIO配置文件应用到编辑器中，或应用于nDisplay的各个显示器上。请参考[nDisplay中的颜色管理](/documentation/zh-cn/unreal-engine/color-management-in-ndisplay-in-unreal-engine)以了解更多信息。

## 舞台监视器

在片场操作舞台时，会有多台电脑运行 **虚幻引擎4** 实例并相互协同。操作者可以然让部分实例渲染LED墙上的画面，让另一部分在编辑器中修改场景，还有一些可以用来进行合成。借助 **舞台监视器**，你可接收来自这些UE4实例的所有事件报告，并对设置中的问题进行故障排除。

更多信息请参考[Stage Monitor](/documentation/zh-cn/unreal-engine/stage-monitor-with-unreal-engine)。

## 定时数据监视器

虚幻引擎可以同时从多个来源读取各种数据类型。例如，在虚拟制片中，引擎可以从SDI上接收摄像机拍摄的画面，同时通过Live Link和跟踪系统接收摄像机的位置和朝向。**定时数据监视器（Timed Data Monitor）** 可用于配置和显示这类时间数据的相互关系，以及它们与引擎本地时间的关系。

更多信息，请参阅[定时数据监视器](/documentation/zh-cn/unreal-engine/timed-data-monitor-in-unreal-engine)。

## 关卡快照

**关卡快照（Level Snapshots）** 使你能够在关卡的 **世界大纲视图** 中保存Actor的状态信息，然后将场景恢复到该状态。这能为你省去很多场景设置麻烦，免去因为管理、复制场景不同状态而产生的麻烦。关卡快照对虚拟制片很有用，因为它允许用户将虚拟场景恢复成初始模样，跟踪拍摄期间发生的变化，记录关卡的初始状态。

你要结合使用源控制和关卡快照来对项目中的资产和演员进行版本管理。关于如何使用关卡快照的更多细节，请参见[关卡快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine)。

## 镜头内视效示例项目

本文介绍了ICVFX所需的技术和硬件规格。如需进一步了解该流程，请查看[镜头内视效示例](https://www.unrealengine.com/marketplace/en-US/product/in-camera-vfx-example)，它包含示例场景和基本关卡，能供你快速搭建镜头内视效项目。请参见[ICVFX快速入门](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine)，了解如何为不同的LED摄影棚修改示例项目，以及如何在各种设备上运行必要程序。假如你已经对ICVFX比较熟悉了，你可以继续查看[ICVFX模板](/documentation/zh-cn/unreal-engine/in-camera-vfx-template-in-unreal-engine)。它为你提供了一个基本场景，并包含了所有需要用到的工具和资产，能让你从头开始创建一个项目。

## ICVFX制片示例

[ICVFX制片测试](https://www.fab.com/listings/17ce3d9c-0843-48ff-96d6-3f49a7163dbd)是一个可通过Fab获取的虚拟制片示例。它用到了虚幻引擎、LED摄影棚、移动的车辆镜头、多镜头设置、以及用于在镜头间快速更改的多用户设置。该示例项目由我们与影人团体[Bullitt](https://bullittbranded.com/)合力制作。该团队在洛杉矶[NantStudios](https://www.nantstudios.com/)的一个LED摄影棚中用四天时间就拍摄出了最终画面。

有关该示例中的制片详情和技术亮点，请参考[ICVFX制片测试](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine)。

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [virtual scouting](https://dev.epicgames.com/community/search?query=virtual%20scouting)
-   [live link](https://dev.epicgames.com/community/search?query=live%20link)
-   [in-camera vfx](https://dev.epicgames.com/community/search?query=in-camera%20vfx)
-   [composure](https://dev.epicgames.com/community/search?query=composure)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)
-   [multi-user editing](https://dev.epicgames.com/community/search?query=multi-user%20editing)
-   [synchronization](https://dev.epicgames.com/community/search?query=synchronization)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [LED面板](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#led%E9%9D%A2%E6%9D%BF)
-   [硬件](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#%E7%A1%AC%E4%BB%B6)
-   [摄像机追踪](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E8%BF%BD%E8%B8%AA)
-   [Live Link](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#livelink)
-   [摄像机校准](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E6%A0%A1%E5%87%86)
-   [镜头内视效的时间码和同步锁定](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#%E9%95%9C%E5%A4%B4%E5%86%85%E8%A7%86%E6%95%88%E7%9A%84%E6%97%B6%E9%97%B4%E7%A0%81%E5%92%8C%E5%90%8C%E6%AD%A5%E9%94%81%E5%AE%9A)
-   [In-Camera VFX多用户编辑](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#in-cameravfx%E5%A4%9A%E7%94%A8%E6%88%B7%E7%BC%96%E8%BE%91)
-   [实时合成](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#%E5%AE%9E%E6%97%B6%E5%90%88%E6%88%90)
-   [In-Camera VFX的远程控制](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#in-cameravfx%E7%9A%84%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6)
-   [颜色校正](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#%E9%A2%9C%E8%89%B2%E6%A0%A1%E6%AD%A3)
-   [OpenColorIO](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#opencolorio)
-   [舞台监视器](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#%E8%88%9E%E5%8F%B0%E7%9B%91%E8%A7%86%E5%99%A8)
-   [定时数据监视器](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#%E5%AE%9A%E6%97%B6%E6%95%B0%E6%8D%AE%E7%9B%91%E8%A7%86%E5%99%A8)
-   [关卡快照](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#%E5%85%B3%E5%8D%A1%E5%BF%AB%E7%85%A7)
-   [镜头内视效示例项目](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#%E9%95%9C%E5%A4%B4%E5%86%85%E8%A7%86%E6%95%88%E7%A4%BA%E4%BE%8B%E9%A1%B9%E7%9B%AE)
-   [ICVFX制片示例](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine#icvfx%E5%88%B6%E7%89%87%E7%A4%BA%E4%BE%8B)

相关文档

[

虚幻引擎多用户编辑

![虚幻引擎多用户编辑](https://dev.epicgames.com/community/api/documentation/image/d972b58a-d8bc-4407-a8d1-f7f34989690b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)

[

ICVFX制片测试

![ICVFX制片测试](https://dev.epicgames.com/community/api/documentation/image/693904d1-d3bf-445e-98cc-3d2d67eed6ef?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine)