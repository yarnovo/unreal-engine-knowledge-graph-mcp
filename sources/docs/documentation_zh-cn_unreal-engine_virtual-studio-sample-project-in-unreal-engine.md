# 虚幻引擎虚拟工作室示例项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:49:15.226Z

---

目录

![虚拟工作室](https://dev.epicgames.com/community/api/documentation/image/b46fd126-db32-4a1f-b962-48dcef6f15de?resizing_type=fill&width=1920&height=335)

虚拟工作室展示了虚幻引擎与来自AJA Video Systems和Blackmagic Design的专业质量视频卡集成的能力。如果你有受支持的卡，可以使用该项目开始将虚幻引擎集成到视频制作管道。

本案例展示设置为使用真实的主持人，在虚拟音乐舞台内部的虚拟主持台背后动态合成。你可以利用相同的概念和布景来支持其他用例，将实时视频引入到虚幻引擎关卡，并将渲染的结果采集到输出源。

有关该案例展示中的视频配置设置的背景信息，请参阅[AJA Video](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine)和[Blackmagic Design](/documentation/zh-cn/unreal-engine/blackmagic-video-io-quick-start-for-unreal-engine)的快速入门指南，以及[支持多个媒体配置](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine)页面。

## 视频I/O设置入门

虚拟工作室案例展示是使用三个不同的媒体配置设置的，每种配置由一个单独的媒体描述资源定义。

-   **AJAMediaProfile\_24fps\_10bit** 将SDI输入视频源和输出采集与来自AJA Video Systems的设备交换。  
    默认设置为从Corvid 44卡的端口1和2获取输入，以24帧/秒的速度，使用10位流。
-   **BlackmagicMediaProfile\_24fps\_10bit** 将SDI输入视频源和输出采集与来自Blackmagic Design的设备交换。  
    默认设置为从DeckLink Duo 2卡的端口1和2获取输入，以24帧/秒的速度，使用10位流。
-   **FileMediaProfile** 默认设置为从磁盘上的 *.mp4* 文件获取输入。 这是你启动项目时将会激活的默认配置，因此即使你没有安装受支持的AJA或Blackmagic卡，也可以立即看到一些视频播放。 该配置没有设置为从虚幻引擎或虚幻编辑器采集任何视频——完全没有配置媒体输出。因此，该配置处于活跃状态时，会有一些视频源进入关卡，但不会输出。

要在这些不同配置之间切换，按下工具栏中当前"媒体描述"（Media Profile）旁边的向下箭头，从下拉菜单中选择 **选择描述（Select Profile）**，然后选择想要激活的媒体描述。

![切换到其他媒体描述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc37979e-57e5-402c-bc68-7e7847bd8c8f/virtual-studio-media-profile-select.png "Switch to a different Media Profile")

如果你需要更改默认端口分配或媒体设置（例如每秒帧数、图像分辨率或色深）以匹配你在计算机上使用的媒体设置，可以双击任意媒体描述资源以打开并编辑其属性。你可以在 *VirtualSet/MediaProfiles* 文件夹下面找到媒体描述资源：

![媒体描述资源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d05f3d78-fe20-48d3-a39f-025e16a5ec58/virtual-studio-media-profiles.png "Media Profile Assets")

有关媒体描述工作方式的更多信息，请参阅[支持多个媒体配置](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine)。

## 媒体源和播放

虚拟工作室案例展示使用了两个媒体包来引入视频源，并让它们出现在关卡视口中。

-   默认情况下，只会将一个设置为可见。该视频源以合成状态出现在场景中的演示者主持台后面。
    
    ![视频源1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8cdcc1a0-1263-4287-a0b1-e53a1ac94384/virtual-studio-video-feed-1.png "Video feed 1")
-   第二个视频源隐藏在虚幻编辑器中，因此默认是看不到的，直到切换摄像机才能看到——在"媒体采集"（Media Capture）面板或在运行时使用屏幕上采集控件。有关详细信息，请参阅以下[屏幕上采集控件](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#%E5%B1%8F%E5%B9%95%E4%B8%8A%E9%87%87%E9%9B%86%E6%8E%A7%E4%BB%B6)。要强制第二个视频源出现在虚幻编辑器中的视口中：
    
    1.  在 **世界大纲视图** 中选择 **VirtualSetMediaInput2** Actor。
        
        ![选择VirtualSetMediaInput2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5ded5a4-fd88-4df8-8d5a-83165ac36ebf/virtual-studio-select-virtualsetinput.png "Select VirtualSetMediaInput2")
    2.  在 **细节（Details）** 面板中，启用 **板（Plate）>在编辑器中显示板（Show Plate in Editor）** 选项。
        
        ![在编辑器中显示板（Show Plate in Editor）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b2c2b70-5dca-40cd-b151-149f2d36204a/virtual-studio-show-plate.png "Show Plate in Editor")
    
    第二个视频源也是合成在主持人主持台后面，但角度设计为从摄像机看向主持人右侧。
    
    ![视频源2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50f732b9-a098-4a05-97a6-0349a6d43495/virtual-studio-video-feed-2.png "Video feed 2")

### 媒体包设置

主持人主持台背后的两个视频输入平面都是使用媒体包设置的：**VirtualSet/Media/VideoBundle\_01** 和 **VirtualSet/Media/VideoBundle\_02**。每个包都有对应的文件夹，保存其媒体框架资源，以 *\_InnerAssets* 后缀命名。

![媒体包资源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19131e76-b207-4c5d-b656-b101d8e354f9/virtual-studio-bundle-assets.png "Media Bundle Assets")

要了解如何从头设置媒体包，请参阅[AJA媒体I/O快速入门指南](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine)或[Blackmagic媒体I/O快速入门指南](/documentation/zh-cn/unreal-engine/blackmagic-video-io-quick-start-for-unreal-engine)。

关于虚拟工作室案例展示中的媒体包需要注意的一点是，它们不使用大多数媒体包资源使用的默认蓝图类。

通常，在将媒体包资源放入关卡中时，会自动产生新的 **BP\_MediaBundle\_Plane\_16-9** Actor 在关卡的3D空间中表示视频。该默认蓝图包含Plane组件，这个组件自动设置为包 *\_InnerAssets* 文件夹中创建的媒体纹理。它还包含用于处理从关联媒体源播放音频的MediaSound组件。

在虚拟工作室中，媒体包资源在关卡中通过BP\_MediaBundle\_Plane\_16-9蓝图Actor的自定义子类表示：**VirtualSet/Blueprints/VirtualSetMediaInput**。该子类与其父代一样，唯一的区别是应该在 **世界大纲视图** 中作为子代为其分配一个特定的摄像机Actor。你将注意到关卡中的两个视频平面各自有一个摄像机子代：

![媒体包和子代摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1fab572-f796-465a-93f0-c81e76f27eec/virtual-studio-camera-children.png "Media Bundles and child cameras")

该自定义 **VirtualSetMediaInput** 子类添加了在编辑器视口中显示和隐藏平面的功能，以及配置平面及其指定摄像机之间的距离。选择 **VirtualSetMediaInput1** 或 **VirtualSetMediaInput2** Actor 时，可以在 **细节（Details）** 面板的 **板（Plate）** 类别中设置这些选项：

![板距离](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99269d9e-ecb4-400f-a059-ca603bbe8534/virtual-studio-plate-settings.png "Plate Distance")

如果想要查看如何实现这些设置，可以双击蓝图类以查看其构造脚本和其他函数。

### 代理媒体源

关卡中的两个媒体包均配置为从不同的代理媒体源资源拾取视频源。例如，如果双击 **VideoBundle\_01**，你会看到它设置为使用 **MediaProxySource\_01** 资源作为其源：

![媒体包源代理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/459d0a46-3bc4-42b8-8b98-4c1539f354f7/virtual-studio-bundle-proxy-config.png "Media Bundle source proxy")

同样，**VideoBundle\_02** 设置为使用 **MediaProxySource\_02** 资源作为其源。

如果打开 **项目设置（Project Settings）** 面板（从主菜单选择 **编辑（Edit）>项目设置（ Project Settings）**），找到 **插件（Plugins）>媒体描述（Media Profile）** 部分，你会看到这两个代理媒体源资源也在 **媒体源代理（Media Source Proxy）** 列表中被引用：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/071edab1-336d-4279-9762-ae20d9e91423/virtual-studio-settings-proxy-config.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/071edab1-336d-4279-9762-ae20d9e91423/virtual-studio-settings-proxy-config.png)

该列表中的插槽顺序对应于当前媒体描述中的插槽顺序。例如，**BlackmagicMediaProfile\_24fps\_10bit** 是使用两个输入媒体源设置的。插槽0从卡上的端口1读取输入源，插槽1从卡上的端口2读取输入源：

![媒体描述源配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ca84e4e-e6cc-49dd-a322-0ca012135d6a/virtual-studio-mediaprofile-proxies.png "Media Profile source configuration")

该配置结果是，当Blackmagic媒体描述激活时，**VideoBundle\_01** 通过代理从卡上的端口1抽取输入源，而 **VideoBundle\_02** 通过另一个代理从卡上的端口2抽取输入源。当你更改媒体描述时，这些代理会自动将输入源重新映射到新媒体描述中定义的前两个输入源，立即改变你在关卡中看到的视频源。

有关媒体代理工作方式的更多信息，请参阅[支持多个媒体配置](/documentation/zh-cn/unreal-engine/supporting-multiple-media-configurations-in-unreal-engine)。

### 监控与合成

媒体包放在中央主持台背后，其目的是将坐姿状态的主持人放在虚拟3D关卡中。为了让这种效果发挥作用，你需要在输入视频流中将背景移到主持人背后。为此，通常需要主持人坐在绿屏（或蓝屏）前面进行录制，然后使用色度键控或亮度滤波来剔除背景。

类似该案例展示中使用的媒体包自动设置为使用特定材质实例，这种实例能够在虚幻引擎中实时执行该色度键控和亮度滤波。

要进行这项设置：

1.  在 **内容浏览器** 中，找到并打开你想要设置的媒体包。
2.  在媒体包编辑器的工具栏中，单击 **打开材质编辑器（Open Material Editor）** 按钮以编辑媒体包用来将视频源抽取到关卡中的对象所用的材质实例。
    
    ![打开材质编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/204cf186-eb48-4717-867f-8f2cec644d99/open-material-editor-videobundle01.png "Open Material Editor")
3.  在材质实例编辑器的 **细节（Details）** 面板中，找到 **键控器\_00——设置（Keyer\_00 - Setup）** 部分，启用 **启用键控器（EnableKeyer）** 属性。
    
    ![启用键控器（Enable the Keyer）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4986042c-cf72-4682-bb0f-4afd1c1cfc60/virtual-studio-enable-keyer.png "Enable the Keyer")
4.  激活 **启用键控器（EnableKeyer）** 属性后，材质实例会在 **细节（Details）** 面板的 **键控器（Keyer）** 部分中显示新属性。你可以使用这些属性来配置想要从视频流中移除的颜色，根据像素亮度过滤流，并对流进行裁切和颜色校正。
    
    ![键控属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44295e59-0b94-44df-bd3f-7954fb903259/virtual-studio-keying-active.png "Keying properties")

## 采集输出视频

为了使用本部分中的说明从虚幻引擎采集视频，你需要有AJA Video Systems或Blackmagic Design的受支持SDI卡。

要开始从虚幻编辑器向AJA或Blackmagic卡发送视频：

1.  从主菜单，选择 **窗口（Window）>媒体采集（Media Capture）**。你可以使用该窗口中的工具来标识想要哪些媒体输出从虚幻引擎接收输出。你还可以指定你希望关卡中的哪些摄像机或哪些渲染目标向各个输出发送视频。 在下图中，**媒体采集（Media Capture）** 窗口设置为从关卡中的两个摄像机向 **MediaOutput\_01** 代理媒体输出资源广播。
    
    ![媒体采集（MediaCapture）面板配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3329761c-f26b-4873-9396-b827409c2a40/virtual-studio-mediacapture-config.png "MediaCapture panel configuration")
    
    虚拟工作室样本的项目设置设定为将发送到 **MediaOutput\_01** 的视频重定向到活跃媒体描述中配置的第一个输出源。如果你使用 **AjaMediaProfile\_24fps\_10bit** 或 **BlackmagicMediaProfile\_24fps\_10bit** 媒体描述，最终会将输出发送到卡上的第四个端口。
    
2.  单击窗口顶部的 **采集（Capture）** 图标以开始采集。
    
    ![采集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd13667d-d9c7-44f7-b6f6-110899bf8f43/virtual-studio-capture-icon.png "Capture")
3.  在窗口底部，你会看到预览，显示的是 **锁定摄像机Actor（Locked Camera Actors）** 列表中的第一个摄像机的视点。如果你的视频设备连接到卡上的第四个端口，应看到同一个视频发送到该端口。
    
    ![媒体采集摄像机预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42dae820-a68b-4920-ae93-367338254dea/virtual-studio-mediacapture-switch.png "Media Capture camera preview")
    
    **媒体采集（Media Capture）** 窗口在 **锁定摄像机Actor（Locked Camera Actors）** 列表中出现的每个摄像机预览上方放置一个按钮。使用这些按钮来切换不同视点的输出。
    

该案例展示还设置为在运行时使用屏幕上控件UI将采集发送到视频卡。要开始使用：

1.  单击工具栏"播放"（Play）按钮旁边的箭头，选择 **新建编辑器窗口（在编辑器中运行）（New Editor Window (PIE)）** 或 **独立游戏（Standalone Game）** 选项。
    
    来自编辑器的视频采集仅在你使用 **新建编辑器窗口（在编辑器中运行）（New Editor Window (PIE)）** 或 **独立游戏（Standalone Game）** 选项运行项目时有用。在默认的 **所选视口（Selected Viewport）** 模式或 **模拟（Simulate）** 模式下无效。  
    此外，项目的视口分辨率（即虚幻引擎生成每一帧的渲染图像尺寸）必须与活跃媒体描述中设置的输出分辨率相匹配，这样才能是输出视频源的合适大小。
    
2.  首先看到的是主持人主持台的正面视图，左上角有一些控件，关卡中的每个摄像机有一个缩略图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfd69241-c313-41ad-a329-21291967d23b/virtual-studio-runtime-capture-ui.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfd69241-c313-41ad-a329-21291967d23b/virtual-studio-runtime-capture-ui.png)
    
    -   要更改当前摄像机视图，可以单击任意摄像机缩略图，也可以单击 **下一个摄像机（Next Camera）** 按钮（1）来循环切换摄像机。
    -   切换 **启用视频输出（Enable Video Output）** 复选框（2）以开始和停止向视频卡发送当前视口。

屏幕上运行时采集控件也设置为将所选摄像机源发送到 **MediaOutputProxy\_01** 资源，然后项目设置将它转发到当前媒体描述中配置的第一个输出。有关该设置方式的详细信息，请参阅下文的[屏幕上采集控件](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#%E5%B1%8F%E5%B9%95%E4%B8%8A%E9%87%87%E9%9B%86%E6%8E%A7%E4%BB%B6)部分。

### 屏幕上采集控件

你将在 *Virtual Set/Blueprints* 文件夹中找到屏幕上摄像机控件UI的资源：

![屏幕上采集控件资源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a84ab35-ca5e-4a1f-9e41-ab362ca824d8/virtual-studio-ui-assets.png "On-screen capture control Assets")

-   **CameraSwitcherUI** UMG 控件包含主要的屏幕上元素，包括"下一个摄像机"（Next Camera）按钮和用于切换当前视图采集的复选框。
-   在场景背后，单击UI时发生的所有操作都由 **CameraSwitcher** 蓝图类处理。你可以观察其事件图表，以查看所有摄像机切换逻辑的实现。与启动和停止视频采集有关的逻辑位于两个主要部分：
    
    -   在事件图表中，**创建媒体采集（Create Media Capture）** 节点从 **VideoOutputSettings** 变量中设置的 **MediaOutputProxy\_01** 资源创建新的媒体采集对象，并将其存储在名为 **媒体采集** 的变量中。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c29d4ebc-691e-4697-b221-ea15ed99897d/virtual-studio-create-capture.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c29d4ebc-691e-4697-b221-ea15ed99897d/virtual-studio-create-capture.png)
        
    -   在 **启用视频输出（Enable Video Output）** 函数中，使用该 **媒体采集** 变量来启动和停止采集视口。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b6e2f40-c46f-4678-a947-113691754a08/virtual-studio-enablecapture.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b6e2f40-c46f-4678-a947-113691754a08/virtual-studio-enablecapture.png)
        
-   **CameraSwitcher** 需要使用应该由UI管理的所有 **VirtualSetMediaInput** 对象列表进行设置。加载关卡时，**CameraSwitcherUI** 自动为该列表中的每个输入创建一个新的缩略图。

系统会向关卡添加一个 **CameraSwitcher** 蓝图类实例。如果在视口或 **世界大纲视图** 中选择该Actor，你可以使用 **细节（Details）** 面板中的设置来控制其行为。

![摄像机切换器详细信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01704f51-f092-4282-a40c-3336657d59ca/virtual-studio-camera-switcher-details.png "Camera Switcher Details")

**属性**

**描述**

**视频输出**

 

**默认启用输出（Enable Output by Default）**

启用该设置以让CameraSwitcher在你运行项目时立即开始采集视频输出，并将它发送到 **视频输出设置（Video Output Settings）** 中设置的媒体输出。

**视频输出设置（Video Output Settings）**

设置CameraSwitcher用来创建媒体采集并将视频输出发送到SDI设备的媒体输出资源。该资源设置决定了哪个设备以及该设备上的哪个端口接收采集的视频流。默认情况下，使用项目设置中设置的*VirtualSet/Media/MediaOutputProxy\_01*资源，以将其输出发送到活跃媒体描述（如果有）中定义的第一个输出端口。

**摄像机**

 

**摄像机列表（Camera List）**

列出CameraSwitcher在运行时可以管理的所有VirtualSetMediaInput Actor。 在运行项目时，CameraSwitcher UI会为该列表中的每个Actor创建一个摄像机缩略图，显示由该Actor管理的视频输入流。

**用户界面**

 

**显示UI（Show UI）**

确定运行项目时屏幕上CameraSwitcher UI是否可见。

## 视频墙

主持人左侧的大视频墙不依赖于任何媒体描述中的任何输入.它主要是使用媒体框架提供的基本构建块构建的。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b40a022-8dca-4482-a92d-30a2dbb58507/virtual-studio-video-wall.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b40a022-8dca-4482-a92d-30a2dbb58507/virtual-studio-video-wall.png)

你可以在 *Virtual\_Studio\_Kit/Textures/Video* 文件夹内找到用于该视频墙的媒体框架资源。

![视频墙资源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5fc6a9c-0cbb-4a6b-86fb-eac1b45b1e82/video-wall-assets.png "Video Wall Assets")

-   **EngineFeatures** 是设置为从 *.mp4* 文件读取视频的文件媒体源，你可以在项目的 *Movies* 文件夹找到它。**WallMediaPlayer** 控制来自该 **EngineFeatures** 文件源的视频播放。当创建该WallMediaPlayer资源时，它会自动创建一个对应的媒体纹理资源 **T\_WallMediaPlayer**，用来接收从视频源读取的帧。 关于创建这类资源以播放自己的视频文件的逐步指南，请参阅[播放视频文件](/documentation/zh-cn/unreal-engine/play-a-video-file-in-unreal-engine)操作页面。
-   **M\_WallVideoPlayer** 材质从 **T\_WallMediaPlayer** 媒体纹理采样像素，并发送到 **Emissive** 输出。这样在屏幕上渲染时，会给视频增加一些光亮。
    
    ![视频墙材质图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffa65315-e5fa-4b4b-9948-4edc8cb6af4c/virtual-studio-video-wall-material.png "Video Wall Material Graph")
-   最后，**WallPlayerSetup** 蓝图的构造脚本启动视频墙并循环播放。关卡中已经放置了该类的一个实例，因此每次加载关卡并产生类时，都会在墙壁上开始播放视频。这样，视频墙始终在后台播放，无论你是在虚幻编辑器中还是正在运行项目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e609a9f6-5212-4282-8e49-09e6d29995f5/virtual-studio-video-wall-bp.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e609a9f6-5212-4282-8e49-09e6d29995f5/virtual-studio-video-wall-bp.png)
    
    点击查看大图。
    

## Studio模块化工具

Virtual Stidio范例包含模块化资源库，其中包括静态网格体、材质、纹理等。可用此类资源创建自己的studio布局，类似上文中默认关卡内描述的布局。

可在内容浏览器的 *Virtual\_Studio\_Kit* 文件夹下找到此资源库：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4d2f36d-d77d-4f2b-9b89-fc16f088f847/virtual-studio-kit.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4d2f36d-d77d-4f2b-9b89-fc16f088f847/virtual-studio-kit.png)

*Maps* 文件夹中还有多个关卡包含预制studio：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9512e964-c714-44ec-b1d3-dee32c7570d5/virtual-studio-maps.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9512e964-c714-44ec-b1d3-dee32c7570d5/virtual-studio-maps.png)

可在虚幻编辑器中打开，查看此类Virtual Stidio布局范例，此类布局仅能使用工具中的资源进行构建。

  ![拖动滑块查看studio布局示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19c601e4-8859-495d-b80d-2dee77b1b55a/studio-a.png) ![拖动滑块查看studio布局示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edea7bd9-11c8-4f29-abfd-683ec30990dc/studio-c.png) ![拖动滑块查看studio布局示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf7febab-4ee5-4b9a-8b46-7d7058563b20/studio-d.png)

**拖动滑块查看studio布局示例**

与开始使用Virtual Stidio范例时打开的默认 **TrackerlessStudio** 关卡不同，Maps文件夹中的其他studio关卡范例默认未设置摄像机和媒体板。要将SDI视频源引入此类关卡范例，须使用新的CineCamera Actor和VirtualSetMediaInput Actor对其进行设置。通读上文，了解默认关卡的设置方式并将其用作关卡中应用的模型。

-   [professional video](https://dev.epicgames.com/community/search?query=professional%20video)
-   [showcases](https://dev.epicgames.com/community/search?query=showcases)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [视频I/O设置入门](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#%E8%A7%86%E9%A2%91i/o%E8%AE%BE%E7%BD%AE%E5%85%A5%E9%97%A8)
-   [媒体源和播放](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#%E5%AA%92%E4%BD%93%E6%BA%90%E5%92%8C%E6%92%AD%E6%94%BE)
-   [媒体包设置](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#%E5%AA%92%E4%BD%93%E5%8C%85%E8%AE%BE%E7%BD%AE)
-   [代理媒体源](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#%E4%BB%A3%E7%90%86%E5%AA%92%E4%BD%93%E6%BA%90)
-   [监控与合成](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#%E7%9B%91%E6%8E%A7%E4%B8%8E%E5%90%88%E6%88%90)
-   [采集输出视频](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#%E9%87%87%E9%9B%86%E8%BE%93%E5%87%BA%E8%A7%86%E9%A2%91)
-   [屏幕上采集控件](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#%E5%B1%8F%E5%B9%95%E4%B8%8A%E9%87%87%E9%9B%86%E6%8E%A7%E4%BB%B6)
-   [视频墙](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#%E8%A7%86%E9%A2%91%E5%A2%99)
-   [Studio模块化工具](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine#studio%E6%A8%A1%E5%9D%97%E5%8C%96%E5%B7%A5%E5%85%B7)