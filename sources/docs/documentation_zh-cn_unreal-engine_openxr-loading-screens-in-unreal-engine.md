# 虚化引擎中的OpenXR加载界面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/openxr-loading-screens-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:06.146Z

---

目录

![OpenXR加载界面](https://dev.epicgames.com/community/api/documentation/image/e73daca9-3420-422f-9367-c29bf8ced361?resizing_type=fill&width=1920&height=335)

在为头戴式显示设备（HMD）开发应用时，你可以在关卡之间添加基于纹理的加载界面作为过渡效果。完成本指南后，你将了解哪些蓝图节点可用于实现加载界面以及它们的用法。

## Set Loading Screen节点

你必须先指定要加载的内容，然后才能在HMD中显示它。

在 **Set Loading Screen** 节点上，你可以从 **纹理（Texture）** 引脚的选择资产（Select Asset）下拉菜单中，选择你要用于加载屏幕的纹理。

然后，调整 **偏移（Offset）** 向量来指定纹理相对于HMD位置的位置。

![Set Loading Screen Blueprint Node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d74948cd-0009-45d5-98dd-b7f8195caf41/01-set-loading-screen_ue5.png)

XR中的加载屏幕目前不支持通过[媒体框架](/documentation/zh-cn/unreal-engine/media-framework-in-unreal-engine)播放媒体。

## Show Loading Screen和Hide Loading Screen节点

创建Set Loading Screen节点后，将其输出引脚连接到 **Show Loading Screen** 节点的执行引脚，以便在HMD中显示它。

如果要隐藏加载屏幕，可以将其连接到 **Hide Loading Screen** 节点的执行引脚。

![Show Loading Screen and Hide Loading Screen Blueprint Nodes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07911bcf-c388-4ba0-9ebe-2fa501b5089f/02-show-hide-screen_ue5.png)

有时，你可能需要在Show Loading Screen节点后使用Delay节点，增加一些延迟感，确保在进入下一阶段或关卡时加载屏幕仍然可见。

## Using Loading Screen节点

在下例中，我们使用[关卡流送](/documentation/zh-cn/unreal-engine/level-streaming-in-unreal-engine)加载一个张新地图。

一般而言，你可以参照下述步骤为项目添加加载屏幕：

1.  在虚幻编辑器（Unreal Editor）中，在关卡编辑器中打开你的地图。
    
2.  点击 **蓝图（Blueprints）>打开关卡蓝图（Open Level)** **Blueprint**。
    
    ![Open Level Blueprint in the Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6008707-87b7-44ef-8026-77d35ac5eaf0/03-open-level-blueprint_ue5.png)
3.  在事件图表（Event Graph）中，添加以下节点：
    
    -   Delay
    -   Set Loading Screen
    -   Show Loading Screen
    -   Load Stream Level
    -   Hide Loading Screen
    
    ![Level Blueprint with all the listed nodes added](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35e97a35-127b-44a5-b9b8-1111d0ff946f/04-event-begin-play_ue5.png)
4.  将 **Event BeginPlay** 节点的输出引脚连接到 **Set Loading Screen** 节点的输入。
    
5.  在 **Set Loading Screen** 节点上：
    
    1.  从 **纹理（Texture）** 下拉列表中选择纹理。
    2.  将 **缩放（Scale）** 2D向量设为 **(1.0, 1.0)** （非零值），以查看该纹理。
    3.  将加载屏幕的 **偏移（Offset）** 3D向量设为 **(1.0, 0.0, 0.5)** 。加载屏幕应在HMD中显示在你面前，但具体位置会随头戴式设备而异。
    
    ![Level Blueprint where the Event BeginPlay node is connected as an input to the Set Loading Screen node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d43c54f-9db3-49f0-af43-a32462dcdcb2/05-scale-offset_ue5.png)
6.  将 **Set Loading Screen** 节点的输出引脚连接到 **Show Loading Screen** 节点的输入。
    
    ![Level Blueprint where the Set Loading Screen node is connected as an input to the Show Loading Screen node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4aff0bc-8eca-43a3-b692-98c0f5b88a80/06-connect-loading-screen_ue5.png)
7.  将 **Show Loading Screen** 节点的输出连接到 **Delay** 节点的输入。Delay节点将设置显示加载屏幕的特定时长。
    
8.  将 **Delay** 节点的 **时长（Duration）** 参数设置为 **3.0** 秒，这样你启动应用程序时加载屏幕至少会显示三秒。
    
    ![Level Blueprint where the Show Loading Screen node is connected as an input to the Delay node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caf3f43b-68e7-4127-a07e-2c64eeb3d418/07-add-delay_ue5.png)
9.  将 **Delay** 节点的输出引脚连接到 **Load Stream Level** 节点的输入。
    
10.  在 **Load Stream Level** 节点上：
    
    1.  在 **关卡名称（Level Name）** 中输入项目中另一个关卡的名称。
    2.  启用 **加载后可见（Make Visible After Load）** 。
    3.  启用 **加载时应阻止（Should Block on Load）** 。
    
    ![Level Blueprint where the Delay node is connected as an input to the Load Stream Level node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66a8dc33-68bc-494d-862a-02bc360dbd7b/08-enable-load_ue5.png)
11.  将 **Load Stream Level** 节点连到 **Hide Loading Screen** 节点。将Hide Loading Screen节点放置在Load Stream Level节点之后，确保关卡在可见前已加载完成。
    
    ![Level Blueprint where the Load Stream Level node is connected as an input to the Hide Loading Screen node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c332026-c033-4673-9fa3-084edb0cf051/09-add-hide-loading_ue5.png)
12.  在你的HMD上启动关卡，当关卡变化时会显示加载屏幕。

你也可以在下一张关卡的关卡蓝图中的Event BeginPlay后面调用Hide Loading Screen，以确保下一张关卡完成加载后才隐藏加载屏幕。如果这样做，你就无需在Load Stream Level节点中启用加载时应阻止（Should Block on Load）。|

-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [openxr](https://dev.epicgames.com/community/search?query=openxr)
-   [splash screens](https://dev.epicgames.com/community/search?query=splash%20screens)
-   [loading screens](https://dev.epicgames.com/community/search?query=loading%20screens)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Set Loading Screen节点](/documentation/zh-cn/unreal-engine/openxr-loading-screens-in-unreal-engine#setloadingscreen%E8%8A%82%E7%82%B9)
-   [Show Loading Screen和Hide Loading Screen节点](/documentation/zh-cn/unreal-engine/openxr-loading-screens-in-unreal-engine#showloadingscreen%E5%92%8Chideloadingscreen%E8%8A%82%E7%82%B9)
-   [Using Loading Screen节点](/documentation/zh-cn/unreal-engine/openxr-loading-screens-in-unreal-engine#usingloadingscreen%E8%8A%82%E7%82%B9)

相关文档

[

使用OpenXR进行头戴式体验开发

![使用OpenXR进行头戴式体验开发](https://dev.epicgames.com/community/api/documentation/image/c709b1d5-6c44-499f-83d4-c69963f59568?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/developing-for-head-mounted-experiences-with-openxr-in-unreal-engine)