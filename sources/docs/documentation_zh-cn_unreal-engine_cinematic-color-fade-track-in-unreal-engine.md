# 虚幻引擎中的过场动画颜色淡入淡出轨道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-color-fade-track-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:42.014Z

---

目录

![淡入淡出轨道](https://dev.epicgames.com/community/api/documentation/image/dece93dc-2fbb-44bb-852d-5975e896616a?resizing_type=fill&width=1920&height=335)

有时，你可能希望关卡序列能够淡入或淡出。你可以使用淡入淡出轨道实现此目的。本页面概述淡入淡出轨道以及过场动画淡入淡出时的其他注意事项。

#### 先决条件

-   你了解[Sequencer](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)。
-   如果你要在Gameplay和过场动画之间淡入淡出，则应了解[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)。

## 淡入淡出轨道概述

### 创建和用法

要创建淡入淡出轨道，请点击 **添加轨道（+）** 并选择 **淡入淡出轨道（Fade Track）** 。

![创建淡入淡出轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08951d5d-99c1-4942-9665-b7633f2d1787/create1.png)

淡入淡出轨道是一种[浮点属性轨道](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E6%B5%AE%E7%82%B9)，你可以在数值 **0** （无淡入淡出）和 **1** （完全淡入淡出）之间对其制作动画。

选择淡入淡出轨道（Fade Track）并按 **Enter** （即设置默认值 **0** 的关键帧），在轨道上设置关键帧。接下来，将播放头移动到新时间，并将轨道数值更改为 **1** ，这会在播放头时间设置一个具有该数值的新关键帧。

![关键帧淡入淡出轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4fe8e91-a92e-417a-9b18-7c9a92dc86af/create2.gif)

现在，播放序列时，你应该会看到淡入淡出逐渐发生。

![淡入淡出轨道播放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bab334bf-b11e-4491-b41c-44df5163aee6/create3.gif)

### 淡入淡出颜色和设置

右键点击淡入淡出分段并找到 **属性（Properties）** 菜单，可更改淡入淡出的颜色和调整其他淡入淡出设置。

![淡入淡出轨道属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6901f6e3-20c0-47b6-b77f-1a4d6167d6a9/properties1.png)

以下属性与 **淡入淡出轨道（Fade Track）** 有特殊交互：

名称

说明

**完成时（When Finished）**

确定该属性在分段完成时该执行的操作。你可以选择以下任一项：

-   **保持状态（Keep State）** ，可用于让淡入淡出在序列结束后于淡入淡出分段的时长内继续存在。
-   **恢复状态（Restore State）** ，会使淡入淡出恢复到对其制作动画之前的状态。
-   **项目默认值（Project Default）** ，它使用在你的 `DefaultEngine.ini` 项目文件中定义的设置。默认设为 **恢复状态（Restore State）** 。

**淡入淡出颜色（Fade Color）**

你可以将淡入淡出效果的颜色更改为所需的颜色。在某些情况下，你可能希望淡入淡出为白色而不是黑色。轨道分段将继承此处指定的颜色，以指示淡入淡出轨道将淡入淡出的颜色。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d626ec9d-9424-47b4-88fd-8813f49de5ba/properties2.gif)

**淡入淡出音频（Fade Audio）**

启用此项会使淡入淡出效果在运行时也减少所有正在播放的音效的音频，包括来自[音轨](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine)的音效。

由于淡入淡出颜色（Fade Color）在[分段](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#%E5%88%86%E6%AE%B5)上设置，因此如果你要在单个序列中具有不同颜色的淡入淡出，则需要创建两个不同的淡入淡出分段。

![为每个淡入淡出颜色创建不同的分段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0562544e-2f7b-44ff-ad66-df8ae9cab112/colornote.png)

## 在Gameplay和过场动画之间淡入淡出

淡入淡出轨道本质上是 **Set Manual Camera Fade** 蓝图函数的轨道版本。因此，编写淡入淡出行为的脚本时，使用淡入淡出轨道和摄影机淡入淡出函数皆可。如果项目要求你在Gameplay和过场动画之间创建淡入淡出过渡，这可能会有帮助。

![摄像机淡入淡出函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9047de44-3855-4326-8d71-55d243e88a57/transition1.png)

若使用这些蓝图函数进行淡入淡出，需要以 **玩家摄像机管理器（Player Camera Manager）** 为目标。你可以右键点击图表，选择 **Get Player Camera Manager** 来获取对该对象的引用。

![get player camera manager函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f2b3dac-2860-43f9-9f23-7ece99de5fb2/transition2.png)

在序列中，你还必须将淡入淡出分段属性 **完成时（When Finished）** 设置为 **保持状态（Keep State）** 。默认情况下，当序列结束时，淡入淡出会恢复到Sequencer开始播放前的上一个状态。保持状态（Keep State）会使用来自淡入淡出轨道的最终数值覆盖此值。在某些情况下可能必须如此，以确保淡入淡出轨道在序列结束之后传播。

![将完成时设置为保持状态](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5627e2b6-2bed-4fa1-abe1-9054a16330f3/transition4.png)

### Gameplay到过场动画的过渡

如果你需要使用淡入淡出覆盖从Gameplay到过场动画的过渡，请执行以下操作：

![从Gameplay淡入淡出到过场动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af5bac15-a16d-419f-8558-c19e3a4ce203/transition3.png)

1.  创建一个 **Start Camera Fade** 节点并在其上设置以下参数：
    
    -   将 **Get Player Camera Manager** 连接到 **目标（Target）** 。
    -   将 **至Alpha（To Alpha）** 设置为 **1** 。
    -   将 **时长（Duration）** 设置为大于 **0** 的任意数字，表示混合的长度（以秒为单位）。如果时长（Duration）为0，淡入淡出将不起作用。
    -   启用 **完成时保持（Hold when Finished）** ，它会保持淡入淡出，直到Sequencer使用淡入淡出轨道（Fade Track）淡入。
    
2.  添加一个在Start Camera Fade之后执行的 **Delay** 节点，并将 **时长（Duration）** 设置为与Start Camera Fade的时长相同的数字。Start Camera Fade的淡出执行不会在淡入淡出完成时发生，因此你需要一段延迟，等待淡入淡出完成后再继续。
3.  播放你的序列（其中包含一个 **淡入淡出轨道（Fade Track）** 淡入，并且 **完成时（When Finished）** 设置为 **保持状态（Keep State）** ，以确保在序列结束后不会恢复淡入淡出。

### 过场动画到Gameplay的过渡

如果你需要使用淡入淡出覆盖从过场动画到Gameplay的过渡，请执行以下操作：

![从过场动画淡入淡出到Gameplay](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff836e3e-85e2-433b-828e-93c3d52e6fa7/transition5.png)

1.  创建一个绑定到序列的 **完成时（On Finished）** 事件，其中包含一个 **淡入淡出轨道（Fade Track）** 淡出，并且 **完成时（When Finished）** 设置为 **保持状态（Keep State）** 。
2.  创建一个 **Start Camera Fade** 节点并在其上设置以下参数：
    
    -   将 **Get Player Camera Manager** 连接到 **目标（Target）** 。
    -   将 **自Alpha（From Alpha）** 设置为 **1** 。
    -   将 **时长（Duration）** 设置为大于 **0** 的任意数字，表示混合的长度（以秒为单位）。如果时长（Duration）为0，淡入淡出将不起作用。
    -   启用 **完成时保持（Hold when Finished）** ，它会保持淡入，不会恢复到淡出，因为Sequencer保持了淡入淡出轨道（Fade Track）状态。
    

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/cinematic-color-fade-track-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [淡入淡出轨道概述](/documentation/zh-cn/unreal-engine/cinematic-color-fade-track-in-unreal-engine#%E6%B7%A1%E5%85%A5%E6%B7%A1%E5%87%BA%E8%BD%A8%E9%81%93%E6%A6%82%E8%BF%B0)
-   [创建和用法](/documentation/zh-cn/unreal-engine/cinematic-color-fade-track-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E7%94%A8%E6%B3%95)
-   [淡入淡出颜色和设置](/documentation/zh-cn/unreal-engine/cinematic-color-fade-track-in-unreal-engine#%E6%B7%A1%E5%85%A5%E6%B7%A1%E5%87%BA%E9%A2%9C%E8%89%B2%E5%92%8C%E8%AE%BE%E7%BD%AE)
-   [在Gameplay和过场动画之间淡入淡出](/documentation/zh-cn/unreal-engine/cinematic-color-fade-track-in-unreal-engine#%E5%9C%A8gameplay%E5%92%8C%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E4%B9%8B%E9%97%B4%E6%B7%A1%E5%85%A5%E6%B7%A1%E5%87%BA)
-   [Gameplay到过场动画的过渡](/documentation/zh-cn/unreal-engine/cinematic-color-fade-track-in-unreal-engine#gameplay%E5%88%B0%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E7%9A%84%E8%BF%87%E6%B8%A1)
-   [过场动画到Gameplay的过渡](/documentation/zh-cn/unreal-engine/cinematic-color-fade-track-in-unreal-engine#%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E5%88%B0gameplay%E7%9A%84%E8%BF%87%E6%B8%A1)