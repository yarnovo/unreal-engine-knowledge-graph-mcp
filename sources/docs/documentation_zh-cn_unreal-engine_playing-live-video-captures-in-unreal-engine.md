# 在虚幻引擎中播放实时视频采集画面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/playing-live-video-captures-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:09.717Z

---

目录

![播放实时视频采集画面](https://dev.epicgames.com/community/api/documentation/image/3ca78b79-b298-4021-9e0c-622561acb728?resizing_type=fill&width=1920&height=335)

虚幻引擎（UE）中的媒体框架以能够在引擎中播放的媒体格式支持视频和音频采集设备。 例如，你可以从网络摄像头获取实时视频，然后在UE4的静态网格体上或作为HUD的一部分直接播放。 或者，你可以将项目部署到移动设备，并检索前置或后置摄像头视频，并在应用程序中播放。

在本示例中，你将从网络摄像头获取视频采集馈送，在游戏期间作为HUD的一部分播放这个视频。

![最终结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61d7eafe-689b-4db2-835b-fc2332d6977f/01-final-result.png)

Electra媒体播放器目前不支持实时视频捕获（Live Video Capture）的播放。

## 步骤

本教程使用启用了 **初学者内容包** 的 **蓝图第三人称模板（Blueprint Third Person Template）** 项目。 你还必须在电脑上连接网络摄像头。

1.  展开 **源（Sources）** 面板，创建名为 **电影（Movies）** 的文件夹，然后在该文件夹中，创建 **媒体播放器（Media Player）** 并链接名为 **MediaPlayer** 的 **媒体纹理（Media Texture）** 资源。
    
    ![新建文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54f68252-4830-4f99-b929-75fbc88edfe9/02-select-media-player.png "Create a New Folder")
2.  打开 **MediaPlayer** 资源，然后在 **媒体URL（Media URL）** 字段旁边，单击并展开 **采集设备（Capture Devices）**，在 **视频（Video）** 下找到你的摄像头。
    
    ![找到摄像头](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c673976f-6490-48bc-a329-83309939a27f/03-select-camera-path.png "Find Your Camera")
    
    根据你的电脑设置，显示的采集设备数量和名称可能与截图不同。
    
    在选择你的视频采集设备时，来自摄像头的视频将显示在媒体播放编辑器内部。
    
3.  高亮显示并单击右键，复制"媒体URL（Media URL）"字段中显示的 **媒体URL** 字符串。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24f9f56d-9744-4425-941b-2ea5d57168cc/04-copy-media-ulr.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24f9f56d-9744-4425-941b-2ea5d57168cc/04-copy-media-ulr.png)
    
    点击查看大图
    
    根据你的电脑设置，显示的URL字符串可能与截图不同。
    
4.  在 **内容浏览器** 单击右键，在 **用户界面（User Interface）** 下面，选择 **控件蓝图（Widget Blueprint）** 并命名为 **HUD**。
    
    ![创建控件蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1006e74-38bb-4ad1-9ac3-6d0fcd018437/05-create-widget-blueprint.png "Create Widget Blueprint")
    
    你将在该用户界面内部使用 **媒体纹理（Media Texture）** 来显示从网络摄像头获取视频的画中画风格HUD。
    
5.  打开 **HUD** 控件蓝图，然后在 **内容侧边栏** 中，将 **MediaPlayer\_Video** 纹理拖入HUD图表。你会发现视频填充了 **外观（Appearance）** 下面的 **图像（Image）** 字段。
    
    ![拖入媒体纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf0b90cd-90dd-48ad-9526-83c997d59ea5/06-add-media-texture.png "Drop the Media Texture")
6.  关闭 **HUD** 控件蓝图，然后从主编辑器工具栏中，单击 **蓝图（Blueprints）**，并选择 **打开关卡蓝图（Open Level Blueprint）**。
    
    ![打开关卡蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ce55814-9024-415a-8d05-cfb6b60f3f8a/07-open-level-blueprint.png "Open Level Blueprint")
    
    虽然你并没有直接打开媒体源，而是复制媒体URL，但仍需要将其打开以便在运行时播放。
    
7.  在 **我的蓝图（My Blueprint）** 面板中，创建一个 **媒体播放器对象引用（Media Player Object Reference）** 类型的变量并命名为 **媒体播放器（Media Player）**，然后分配 **媒体播放器（Media Player）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/320cab31-8500-4ad5-9606-d96bb638694f/08-media-player-compile_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/320cab31-8500-4ad5-9606-d96bb638694f/08-media-player-compile_ue5.png)
    
    点击查看大图
    
    你可能需要单击 **编译（Compile）** 按钮来编译蓝图，然后再分配"媒体播放器（Media Player）"变量的 **默认值（Default Value）**。
    
8.  按住 **Ctrl** 键并将 **媒体播放器（MediaPlayer）** 变量拖到图形上，然后单击右键并添加 **事件开始播放（Event BeginPlay）** 节点。
    
    ![拖动媒体播放器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1498318-477f-448c-af1b-ea2b57f71732/09-add-player-to-graph.png "Drag the Media Player")
    
    你已经创建了想要对其执行操作的媒体播放器的引用和用于指示游戏开始的[事件](/documentation/zh-cn/unreal-engine/events-in-unreal-engine)。
    
9.  单击右键并添加 **创建控件（Create Widget）** 节点（以 **HUD** 作为 **类（Class）**），然后拖出 **返回值（Return Value）** 引脚，使用 **添加到视口（Add to Viewport）** 并按图所示进行连接。
    
    ![创建控件节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eeb48104-ffa7-4acf-9e2e-be57d86d9175/10-create-hud-wiget.png "Create the Widget Node")
    
    我们在这里要表达的是，当游戏开始时，创建HUD控件蓝图，然后将其添加到玩家视口。
    
10.  拖出图形中 **媒体播放器（Media Player）** 节点引脚，使用 **打开URL（Open URL）** 并粘贴在 **第3步** 复制的URL，并按图所示进行连接。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19bad1a9-635a-4f61-bb82-54cd11b2551d/11-add-open-url.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19bad1a9-635a-4f61-bb82-54cd11b2551d/11-add-open-url.png)
    
    点击查看大图
    
    如果你现在在编辑器中播放，来自网络摄像头的视频将会出现在你在所需位置放置的HUD图像上。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d09e79b-23dd-4f1f-bbd0-fa55655ad768/12-final-result.png)
    
    在此示例中，要打开的媒体URL是指定好的，但需要知道的是，实际情况并非总是如此。 你可能会将项目打包并通过这种功能分发给其他人，然后想要获取最终用户连接的采集设备并使用其中的一个设备。 或者，你可能想将项目部署到移动设备，并需要前置或后置摄像头视频来用作媒体源。 你可以使用 **列举采集设备（Enumerate Capture Devices）** 功能来返回所有连接的采集设备，并获取有关这些设备的信息。
    
11.  在图形中单击右键，搜索并添加 **列举视频采集设备（Enumerate Video Capture Devices）** 函数。
    
    ![例举视频采集设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c13ed232-ebe9-40fa-88a7-e4078c1cd7ee/13-add-enumerate-video-capture-function.png "Enumerate Video Capture Devices")
    
    有一些用于音频、视频和网络摄像头采集设备的列举元素（网络摄像头用于移动设备，因为你可以获取前置或后置摄像头）。
    
12.  拖出 **过滤器（Filter）** 引脚并使用 **创建位掩码（Make Bitmask）** 节点。
    
    ![添加创建位掩码节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/255e87f4-5db3-480b-9c17-edbf229cf75f/14-use-make-bitmask.png "Add Make Bitmask Node")
    
    使用"创建位掩码（Make Bitmask）"将使你能够筛选出一组特定的设备子集。
    
13.  选中 **创建位掩码（Make Bitmask）** 节点，在 **细节（Details）** 面板中，将 **位掩码列举（Bitmask Enum）** 更改为 **EMediaVideoCaptureDeviceFilter**，然后在过滤器中启用它们。
    
    ![启用每个过滤器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b96d6d90-2c67-442d-832d-9a5a6f79508d/15-enable-each-filter.png "Enable Each Filter")
    
    这里你将筛选每一个启用的选项来返回采集设备（你可以排除想要省略的设备，缩小返回设备列表）。
    
14.  从 **输出设备（Out Devices）**，使用 **获取副本（Get Copy）** 节点并拖出其输出引脚，使用 **Break MediaCpatureDevice** 节点并连接到 **打开URL（Open URL）**，如图所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5b2e2c6-6427-46e9-af3c-d16e57dc3594/16-use-break-media-capture-function.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5b2e2c6-6427-46e9-af3c-d16e57dc3594/16-use-break-media-capture-function.png)
    
    点击查看大图
    
    该过程将查找第一个可用采集设备，并返回其URL，之后将通过"打开URL（Open URL）"使用这个URL来打开视频源进行播放。
    
15.  **编译（Compile）** 并关闭关卡蓝图，然后单击主工具栏中的 **播放（Play）** 按钮来在编辑器中播放。
    

## 最终结果

当你在编辑器中播放时，来自你的摄像头的视频将会通过引擎推送并显示在你的HUD上。

要获取移动设备上的前置或后置摄像头：

-   使用 **列举视频采集设备（Enumerate Video Capture Devices）** 节点，然后将 **位掩码列举（Bitmask Enum）** 设置为 **EMediaWebcamCaptureDeviceFilter** 选项。
-   在 **创建位掩码（Make Bitmask）** 节点上，标出你想要获取的摄像头。

![标记摄像头](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd102fe4-ab01-41ed-bace-ce595cfc7bff/17-flag-needed-camera.png "Flag Camera")

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [media framework](https://dev.epicgames.com/community/search?query=media%20framework)
-   [video playback](https://dev.epicgames.com/community/search?query=video%20playback)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/playing-live-video-captures-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/playing-live-video-captures-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)