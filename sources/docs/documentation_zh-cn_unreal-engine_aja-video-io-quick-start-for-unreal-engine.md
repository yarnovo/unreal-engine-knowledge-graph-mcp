# 虚幻引擎AJA视频输入/输出快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:12.623Z

---

目录

![AJA视频输入/输出快速入门](https://dev.epicgames.com/community/api/documentation/image/5f3f0123-a2bc-443e-aee1-8b6bfb424633?resizing_type=fill&width=1920&height=335)

在这个快速入门指南中，我们将介绍如何设置一个虚幻引擎项目来使用AJA Video Systems中的专业视频卡。在本指南的最后：

-   你将在你的虚幻引擎项目内播放来自你的AJA卡的视频输入。
-   你将能够从编辑器和运行时应用程序捕获摄像机视点，并将它们发送到AJA卡上的SDI端口。
-   当你想进行设置以对视频输入进行更高级的调整时（比如校正镜头变形和应用色度抠像效果），你知道该怎么做。

有关展示下述许多元素付诸实践的工作示例，请参阅Epic Games启动器的学习（Learn）选项卡所提供的 **[虚拟工作室](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine)** 展示。

**先决条件：**

-   确保你拥有AJA Video Systems支持的显卡硬件，并安装了必要的驱动程序和软件。详情请参阅[AJA媒体引用](/documentation/zh-cn/unreal-engine/aja-media-reference-for-unreal-engine)页面。
-   确保你的显卡正常工作，并且你有一些视频输入传递到该卡的至少一个SDI端口。
-   打开要与视频源集成的虚幻引擎项目。此页面显示了 **第三人称** 蓝图模板中的步骤，但是相同的步骤在任何项目中都同样适用。

本指南中使用的AJA媒体组件构建在[媒体框架](/documentation/zh-cn/unreal-engine/media-framework-in-unreal-engine)之上，我们将使用[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)在运行时编写视频捕获过程的脚本。建议你对这些主题有一定的了解，但这不是必需的。

## 1 - 设置项目

在你从AJA卡获取视频输入，放入到虚幻引擎关卡中，并通过AJA卡的某个SDI端口发送来自虚幻引擎的输出之前，你需要做一些基本设置来为项目启用AJA媒体播放器插件。

如果你的虚幻引擎项目使用了 **影视与实况活动** 分类下的模板，可能已经启用了必要的插件。如果没有，请按以下步骤启用它们。

### 步骤

1.  在虚幻编辑器中打开你想要使用AJA视频输入/输出的项目。
    
2.  在主菜单中选择 **编辑（Edit）> 插件（Plugins）**。
    
3.  在 **插件（Plugins）** 窗口的 **媒体播放器（Media Players）** 分类中找到 **AJA媒体播放器（AJA Media Player）** 插件。勾选 **启用（Enabled）** 复选框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce457452-7619-49e8-9b0e-e4b2b478bc52/01-aja-media-plugin_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce457452-7619-49e8-9b0e-e4b2b478bc52/01-aja-media-plugin_ue5.png)
    
    点击查看大图。
    
4.  在 **媒体播放器（Media Players）** 类别下找到 **媒体框架工具（Media Framework Utilities）** 插件。选中其 **启用（Enabled）** 复选框（如果尚未选中）。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a63f40d-2677-4676-9dfd-9423774ba11e/02-media-utilities-plugin_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a63f40d-2677-4676-9dfd-9423774ba11e/02-media-utilities-plugin_ue5.png)
    
    点击查看大图。
    
5.  单击 **立即重启（Restart Now）** 重新启动虚幻编辑器并重新打开项目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/584c9312-3f1e-406e-a6bc-604c59258ae9/03-restart-engine_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/584c9312-3f1e-406e-a6bc-604c59258ae9/03-restart-engine_ue5.png)
    
    点击查看大图。
    

### 最终结果

你的项目现在已经准备好接受来自AJA卡的视频，并将渲染的输出发送到该卡。在接下来的章节中，我们将准备好并开始播放视频。

## 2 - 在虚幻引擎中渲染视频输入

在这个过程中，我们将使来自AJA卡的视频输入在虚幻编辑器的当前关卡中可见。此过程会用到媒体束，这是一种资源，它将媒体框架中涉及的几种不同类型的资源打包在一起，并提供对一些高级特性的控制，如镜头变形、色度抠像、颜色校正等。 

### 步骤

1.  在你的 **内容浏览器（Content Browser）** 中，展开 **源（Sources）** 面板(1)。右键单击并从上下文菜单(2)中选择 **新建文件夹（New Folder）**。
    
    ![新文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da5095c2-16a7-43dc-bc17-bd5845e04893/04-new-folder_ue5.png "New Folder") 将你的新文件夹重命名为 **AJA**。
    
2.  打开你的新文件夹，右键单击 **内容浏览器（Content Browser）** 并选择 **媒体（Media）> 媒体束（Media Bundle）**。
    
    ![新媒体束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1df51b70-e14a-476d-a0bd-1099ec59f1ca/05-media-bundle_ue5.png "New Media Bundle")
3.  将在内容浏览器中自动选择新资源的名称，因此可以为其提供描述性名称：
    
    ![为媒体束命名](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb460f53-a065-4962-a008-77d871d7eca1/06-rename-media-bundle_ue5.png "Name the Media Bundle")
    
    键入一个新名称，例如 **AjaMediaBundle**，然后按 **Enter**。媒体框架资源的新文件夹将自动创建在媒体束旁边，使用后缀 **\_InnerAssets** 命名。
    
4.  单击 **内容浏览器（Content Browser）** 中的 **保存所有（Save All）** 按钮保存新资源。
    
    ![保存所有资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca0bc347-8c0e-4c25-87e7-309482755931/07-save-all_ue5.png "Save All Assets")
5.  双击新媒体束以编辑其属性。媒体束能够播放来自引擎支持的任何媒体源的视频，因此你需要告诉它你想从AJA卡获取视频。
    
    在 **媒体源（Media Source）** 属性中，从下拉列表中选择 **Aja媒体源（Aja Media Source）**：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4b1faad-d131-4ec9-89b6-8240d3d1c91b/08-aja-media-source_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4b1faad-d131-4ec9-89b6-8240d3d1c91b/08-aja-media-source_ue5.png)
    
    点击查看大图。
    
6.  一旦确定你希望媒体束处理的媒体源类型，你就可以设置该类型的源提供的任何配置属性。
    
    你可以让虚幻引擎自动匹配输入视频信号的格式和帧率。要启用自动匹配检测，请点击 **配置（Configuration）** 下拉菜单，启用 **自动（Auto）**，然后点击 **应用（Apply）**。这样，引擎就能在临时丢失信号时自动无缝处理修改和重启。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/036a5270-676a-410a-9f8f-3c19ccbf7a74/format-auto-detect.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/036a5270-676a-410a-9f8f-3c19ccbf7a74/format-auto-detect.png)
    
    点击查看大图。
    
    根据所安装的设备，你看到的选项可能有所不同。有关你可以为AJA媒体源设置的所有属性的详细信息，请参阅[AJA媒体引用](/documentation/zh-cn/unreal-engine/aja-media-reference-for-unreal-engine)页面。
    
7.  如果想对传入的视频应用任何补偿以解决镜头失真的问题，你可以在 **镜头参数（Lens Parameters）** 部分设置镜头的物理属性。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a92f5b5-83ef-419f-b8b6-ac31272b4774/10-lens-parameters_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a92f5b5-83ef-419f-b8b6-ac31272b4774/10-lens-parameters_ue5.png)
    
    点击查看大图。
    
    这些 **镜头参数（Lens Parameters）** 只是设置了镜头的物理属性。稍后编辑媒体束使用的材质实例时，你将实际激活镜头补偿。 设置完媒体束的属性后，保存媒体束，并返回到内容浏览器中的 **AJA** 文件夹。
    
8.  将你的 **AjaMediaBundle** 资源从内容浏览器拖到关卡视口中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/936a3135-c0b2-454b-b1f6-14687451319e/11-add-aja-viewport_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/936a3135-c0b2-454b-b1f6-14687451319e/11-add-aja-viewport_ue5.png)
    
    点击查看大图。
    
    你将看到一个新的平面出现，显示当前在为你的媒体束配置的端口上播放的视频。使用视口（Viewport）工具栏中的变形工具来移动、旋转和调整它的大小。 如果你的媒体束没有自动开始播放，选择它，然后单击 **详细信息（Details）** 面板中的 **媒体束（Media Bundle）> 请求播放媒体（Request Play Media）** 按钮。
    
    ![请求播放媒体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/119a46dd-3895-42e3-bfab-f779bb5c2924/12-request-play-media_ue5.png "Request Play Media")
9.  现在，我们将了解如何将抠像和合成效果应用到视频流。 回到媒体束编辑器中，单击工具栏中的 **打开材质编辑器（Open Material Editor）** 按钮，编辑这个媒体束用于将其传入视频源绘制到关卡中对象上的材质实例。
    
    ![打开材质编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fca5c1df-9596-4972-96d0-98f65b863b5b/13-open-material-editor_ue5.png "Open Material Editor")
    
    此材质实例保存在 **AjaMediaBundle\_InnerAssets** 文件夹中，该文件夹是用你的媒体束自动创建的。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4f7761f-3afa-4377-bc76-0f640d1d85b4/14-aja-inner-assets_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4f7761f-3afa-4377-bc76-0f640d1d85b4/14-aja-inner-assets_ue5.png)
    
    点击查看大图。
    
10.  在材质实例编辑器中，你将看到为供你配置抠像、剪辑和颜色校正以及激活你在媒体束中设置的镜头失真校正而公开的许多属性。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b64e883e-2cee-4809-8954-8f9db1b35ccc/15-open-aja-asset_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b64e883e-2cee-4809-8954-8f9db1b35ccc/15-open-aja-asset_ue5.png)
    
    点击查看大图。
    
    当你在材质实例编辑器中调整设置时，你可以看到你的更改对在主关卡视口中播放的视频源的影响。
    
    你可能会发现在材质实例编辑器的预览面板中查看所做更改的效果更为方便。为此，临时启用 **IsValid** 设置，并将其值设置为"1.0"。
    
    ![IsValid](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a6846a4-d80e-4851-b769-2e6576c57bd5/16-global-scalar-parametr_ue5.png)
    
    单击视口工具栏左上角的箭头，并在菜单中启用 **实时（Realtime）** 选项。
    
    ![实时视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2d1e640-cac3-4d0f-a8c7-27d4ae5f6b4a/17-expose-realtime_ue5.png "Realtime viewport")
    
    通过将预览网格体更改为平面或立方体，你将能够更容易地判断更改的效果。使用视口底部的控件：
    
    ![预览网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7299c1d3-af46-40db-ab7b-6dc12b5a3fc4/18-change-shape-form_ue5.png "Preview mesh")
    
    完成后，将 **IsValid** 设置返回到它的前一个值。
    
11.  更改完材质实例属性后，单击工具栏中的 **保存（Save）** 按钮。
    

### 最终结果

此时，你应该正在虚幻引擎关卡内的SDI端口上播放视频，并且应该了解如何设置更高级的功能，如镜头变形和色度抠像。

如果你已经熟悉媒体框架，那么另一种将视频引入你的关卡的方法是在你的项目中创建一个新的 **AjaMediaSource** 资源，并使用你在上述过程中在媒体束中设置的相同源属性对其进行设置。然后，创建你自己的 **MediaPlayer** 和 **MediaTexture** 资源，以便在你的关卡上处理该源的播放。详情请参阅[媒体框架](/documentation/zh-cn/unreal-engine/media-framework-in-unreal-engine)文档。但是，我们建议使用上述媒体束，以在易用性和专业高质视频特性之间取得最佳平衡。

## 3 - 从虚幻编辑器输出采集

在此过程中，你将设置一个AJA媒体输出对象，并使用虚幻编辑器中的 **媒体采集（Media Captures）** 面板将关卡中所选摄像机的视图输出到你的AJA卡。

### 步骤

1.  在内容浏览器中右键单击，选择 **媒体（Media）> Aja媒体输出（Aja Media Output）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb227a96-239f-4e7e-ab4e-d38fecb8b1aa/19-create-aja-media-output_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb227a96-239f-4e7e-ab4e-d38fecb8b1aa/19-create-aja-media-output_ue5.png)
    
    点击查看大图。
    
    将你的新资源命名为 **AjaMediaOutput**。
    
2.  双击你的新资源打开它进行编辑。就像创建Aja媒体源一样，你必须设置 **配置（Configuration）** 属性来控制虚幻引擎发送到AJA卡的视频源属性。单击箭头以打开子菜单，选择与你的视频设置匹配的选项，然后单击子菜单中的 **应用（Apply）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b679209-f328-4822-80a7-d147d4cd2bab/20-output-properties_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b679209-f328-4822-80a7-d147d4cd2bab/20-output-properties_ue5.png)
    
    点击查看大图。
    
    有关你可以在AJA媒体输出中设置的所有属性的详细信息，请参阅[AJA媒体引用](/documentation/zh-cn/unreal-engine/aja-media-reference-for-unreal-engine)页面。完成后，保存并关闭你的媒体输出。
    
3.  现在我们将在关卡中放置两个摄像机，为我们将发送到AJA卡的输出提供视点。在 **放置Actor（Place Actors）** 面板中，打开 **过场动画（Cinematic）** 选项卡，并将 **过场动画摄像机Actor（Cine Camera Actor）** 的两个实例拖放到视口中。
    
    ![拖放过场动画摄像机Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5decda4-e971-46d1-aaf0-acb3620845a6/21-add-cinema-camera-actor_ue5.png "Drag and drop Cine Camera Actors")
    
    将摄像机放置在关卡中你想要的位置，这样它们就能显示场景上的不同视点。
    
    **导航** 摄像机是一种完全按照你想要的方式来设置摄像机视点的快速而简便的方法。请参阅[在视口中导航Actor](/documentation/zh-cn/unreal-engine/using-editor-viewports-in-unreal-engine)。
    
4.  从主菜单选择 **窗口（Window）> 虚拟制片（Virtual Production） > 媒体采集（Media Capture）**。你将使用 **媒体采集（Media Capture）** 窗口来控制编辑器何时向你的AJA端口发送输出，以及它在关卡中应该使用什么摄像机。
    
    ![媒体采集窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29b26bca-f88d-48a6-b56e-396439549baa/22-media-capture_ue5.png "Media Capture window")
5.  在 **媒体视口采集（Media Viewport Capture）** 区域下，找到 **视口采集（Viewport Captures）** 控件。单击 **Add（+）** 按钮将新的采集添加到此列表。
    
    ![添加视口采集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48341851-af03-43fa-ab36-c425235167cd/23-add-viewport-capture_ue5.png "Add a viewport capture")
6.  展开新条目。首先，我们将添加想要从中进行采集的摄像机。在 **锁定的摄像机Actor（Locked Camera Actors）** 控件中，单击 **Add（+）** 按钮添加新条目。
    
    ![添加摄像机Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2a7781d-1f86-4a91-92b7-697e084aa859/24-add-cameras_ue5.png "Add a camera actor")
    
    然后，使用下拉列表选择你放置在关卡中的摄像机之一。
    
    ![选择摄像机Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f81039dc-6274-41f0-84cb-bfa70ca9edfe/25-select-cinema-actor_ue5.png "Select the camera actor")
    
    重复相同的步骤将另一个摄像机添加到列表中。
    
7.  现在，设置要采集这些摄像机的输出。将 **媒体输出（Media Output）** 控件设置为指向你在上面创建的新AJA媒体输出资源。为此，你可以在下拉列表中选择它，或者从内容浏览器中拖动AJA媒体输出资源并将其放入此槽中。
    
    ![Set the AJA Media Output](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c4c9d8c-c08c-4c6e-9c62-de8c918f0cc8/26-select-aja-output_ue5.png "Set the AJA Media Output")
8.  在窗口顶部，单击 **采集（Capture）** 按钮。
    
    ![开始采集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e0a1977-0586-47a0-b6ec-9ae955d84264/27-capture-button_ue5.png "Start capturing")
    
    你将在窗口底部看到一个新框架，该框架显示要发送到AJA卡的输出的预览。如果你已经将这个端口连接到另一个下游设备，你应该会开始看到输出。
    
    ![激活媒体采集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e088a17-8d43-41b7-8930-ab219fb22ef0/28-viewport-cinema-actor_ue5.png "Active Media Capture")
9.  为此视口采集而添加到锁定的摄像机Actor（Locked Camera Actors）列表中的各个摄像机由视频预览上方的相应按钮表示。单击这些按钮在两个视图之间来回切换采集。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7e96170-21b5-4786-833f-9cb16f2ad03b/29-cinema-actors_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7e96170-21b5-4786-833f-9cb16f2ad03b/29-cinema-actors_ue5.png)
    
    点击查看大图。
    

### 最终结果

现在你已经设置虚幻编辑器，以将你关卡中的摄像机输出流送到AJA卡上的端口。接下来，我们将看到如何在正在运行的虚幻引擎项目中使用蓝图脚本执行相同的操作。

## 4 - 在运行时输出采集

你在上一部分中使用的 **媒体采集（Media Capture）** 窗口是一种向AJA卡发送采集的实用且简单的方法。然而，它仅可在虚幻编辑器中使用。要在将项目作为独立应用程序运行时执行相同的操作，需要使用媒体输出提供的蓝图API。在这个过程中，我们将在关卡蓝图中设置一个简单的切换开关，在玩家按下键盘上的某个键时，该开关会启动或停止采集。

Epic Games启动器的 **示例（Samples）** 选项卡所提供的 **[Virtual Studio](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine)** 演示项目包含一个UMG界面控件，演示了如何通过屏幕用户界面来控制采集过程。

### 步骤

1.  从虚幻编辑器中的主工具栏中，选择 **蓝图（Blueprints）> 打开关卡蓝图（Open Level Blueprint）**。
    
    ![打开关卡蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d69f84a-d6b2-4a8f-9ffe-89d77225fbec/30-open-level-blueprint_ue5.png "Open Level Blueprint")
2.  我们需要从你创建的AJA媒体输出资源开始，你将在该资源中标识要输出到的端口。在 **我的蓝图（My Blueprint）** 面板的 **变量（Variables）** 列表中，单击 **Add（+）** 按钮添加新变量。
    
    ![新变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3842a626-56a8-4c78-9190-d4f73fae71e3/31-add-variables_ue5.png "New Variable")
3.  在 **详细信息（Details）** 面板中，将 **变量名（Variable Name）** 设置为 **AjaMediaOutput**，并使用 **变量类型（Variable Type）** 下拉列表使其成为 **Aja媒体输出对象引用（Aja Media Output Object Reference）**。
    
    ![Aja媒体输出对象引用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f7e777a-7ed6-45f6-ae47-dd6994ac916a/32-select-variable-type_ue5.png "Aja Media Output Object Reference")
4.  启用 **可编辑实例（Instance Editable）** 设置(1)，并编译蓝图。然后，在 **默认值（Default Value）** 部分中，将变量设置为指向你在内容浏览器(2)中创建的AJA媒体输出资源。
    
    ![设置默认值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1db1400-9a36-4aed-85a5-ed3734093775/33-details-panel-properties_ue5.png "Set the default value")
5.  按 **Ctrl**，将 **AjaMediaOutput** 从 **我的蓝图（My Blueprint）** 面板中的变量列表拖放到 **事件图表（Event Graph）** 中。
    
    ![按Control并拖放AjaMediaOutput](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ecd07d3c-c662-490f-ab93-9a4eff07e64c/34-add-aja-output-blueprint_ue5.png "Control+drag the AjaMediaOutput")
6.  单击并从 **AjaMediaOutput** 变量节点的输出端口拖动，选择 **媒体（Media）> 输出（Output）> 创建媒体采集（Create Media Capture）**。
    
    ![创建媒体赛季](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf7d334f-0c1a-4090-9171-294be1b83a90/35-create-media-capture_ue5.png "Create Media Capture")
    
    将你的节点连接到 **事件BeginPlay（Event BeginPlay）** 节点，如下所示：
    
    ![时间开始播放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65a300cb-5555-4871-9e79-ce259b0146a1/36-add-event-begin-play_ue5.png "Event Begin Play")
    
    这将从Aja媒体输出创建一个新的媒体采集对象。媒体采集提供了两个主要的蓝图函数，我们将使用它们来控制采集：**采集活动场景视口（Capture Active Scene Viewport）** 和 **停止采集（Stop Capture）**。
    
7.  首先，我们将把新媒体采集对象保存到它自己的变量中，这样我们就可以在其他地方再次访问它。单击并从 **创建媒体采集（Create Media Capture）** 节点的输出端口拖动，选择 **提升到变量（Promote to Variable）**。
    
    ![提升变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3aa67419-40f5-45c3-9bd2-0e35a3ae27e2/37-promote-to-variable_ue5.png "Promote to variable")
    
    在 **我的蓝图（My Blueprint）** 面板的变量列表中将新变量重命名为 **MediaCapture**。
    
    务必在这里将媒体采集保存为变量。如果不这样做，虚幻引擎的垃圾回收器可能会在你用完它之前自动销毁它。
    
8.  按 **Ctrl** 并将 **MediaCapture** 变量拖动到 **事件图表（Event Graph）** 中。
    
    ![按Control并拖放MediaCapture](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2359236-52bb-4762-8a81-88585a682cd2/38-add-media-capture_ue5.png "Control+drag the MediaCapture")
9.  从 **MediaCapture** 变量节点的输出端口点击拖动，选择 **媒体（Media）> 输出（Output）> 采集活动场景视口（Capture Active Scene Viewport）**。再做一次，选择 **媒体（Media）> 输出（Output）> 停止采集（Stop Capture）**。
    
    ![开始和停止采集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49cb64bd-0958-47c2-a250-16eed2035ab2/39-add-stop-capture_ue5.png "Start and stop the capture")
10.  右键单击 **事件图表（Event Graph）**，选择 **输入（Input）> 键盘事件（Keyboard Events）> P**。单击并拖动 **P** 节点的 **已按下（Pressed）** 输出，选择 **流程控制（Flow Control）> FlipFlop**。 
    
    ![FlipFlop](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1df2be8f-3313-4859-a2e3-39f18bbfb137/40-add-flipflop_ue5.png "FlipFlop")
11.  将 **FlipFlop** 节点的 **A** 输出连接到 **采集活动场景视口（Capture Active Scene Viewport）** 节点的输入事件，将 **FlipFlop** 节点的 **B** 输出连接到 **停止采集（Stop Capture）** 节点的输入事件，如下图所示：
    
    ![连接节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9de0fe2f-6b88-4ecb-bbf5-dcac8afb3790/41-add-p-button_ue5.png "Connect the nodes")
12.  编译并保存蓝图，并尝试运行你的项目。单击主工具栏运行（Play）按钮旁边的箭头，选择 **新建编辑器窗口（在编辑器中运行）（New Editor Window (PIE)）** 或 **独立窗口运行（Standalone Game）** 选项。
    
    ![启动项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/813b7c0f-e05b-45bd-8460-74c22cebd141/42-new-editor-window_ue5.png "Launch the Project")
    
    只有当你在 **新建编辑器窗口（在编辑器中运行）（New Editor Window (PIE)）** 或 **独立窗口运行（Standalone Game）** 中运行项目时，来自编辑器的视频采集才会工作。它不能在默认的 **选中的视口（Selected Viewport）** 模式或 **模拟（Simulate）** 模式下工作。 此外，项目的视口分辨率（即虚幻引擎生成的每个帧的渲染图像大小）必须与活动媒体配置文件中的输出分辨率集匹配，使它是输出视频源的正确大小。
    
    项目启动后，你应该能够按键盘上的 **P** 按钮来切换将输出从引擎发送到AJA卡。
    

### 最终结果

至此，你应该对如何使用Aja媒体源、媒体束和媒体采集系统有了基本的了解，并且应该了解所有这些元素如何协力工作，以在虚幻引擎中输入和输出专业视频。

## 自学

现在你已经了解了使用AJA卡交换视频输入和输出的新项目的基本知识，你可以继续自学：

-   在你的媒体束创建的材质实例中探索引擎内抠像解决方案。尝试将一些绿屏视频传递到卡的输入端口，并使用材质实例中的抠像控件来移除背景。
-   浏览 **[Virtual Studio](/documentation/zh-cn/unreal-engine/virtual-studio-sample-project-in-unreal-engine)** 展示，看看它为这个基本设置添加了什么，比如它的屏幕上的UI，此UI可以在运行时切换摄像机和控制视频采集。

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [professional video](https://dev.epicgames.com/community/search?query=professional%20video)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 设置项目](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#1-%E8%AE%BE%E7%BD%AE%E9%A1%B9%E7%9B%AE)
-   [步骤](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [2 - 在虚幻引擎中渲染视频输入](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#2-%E5%9C%A8%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E6%B8%B2%E6%9F%93%E8%A7%86%E9%A2%91%E8%BE%93%E5%85%A5)
-   [步骤](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#%E6%AD%A5%E9%AA%A4-2)
-   [最终结果](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-2)
-   [3 - 从虚幻编辑器输出采集](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#3-%E4%BB%8E%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E8%BE%93%E5%87%BA%E9%87%87%E9%9B%86)
-   [步骤](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#%E6%AD%A5%E9%AA%A4-3)
-   [最终结果](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-3)
-   [4 - 在运行时输出采集](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#4-%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E8%BE%93%E5%87%BA%E9%87%87%E9%9B%86)
-   [步骤](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#%E6%AD%A5%E9%AA%A4-4)
-   [最终结果](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-4)
-   [自学](/documentation/zh-cn/unreal-engine/aja-video-io-quick-start-for-unreal-engine#%E8%87%AA%E5%AD%A6)