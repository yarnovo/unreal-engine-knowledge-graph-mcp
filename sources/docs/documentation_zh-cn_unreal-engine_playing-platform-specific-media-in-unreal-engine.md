# 在虚幻引擎支持的各平台上播放媒体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/playing-platform-specific-media-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:24:43.411Z

---

目录

![在平台上播放媒体](https://dev.epicgames.com/community/api/documentation/image/393c4fd3-7cf1-485a-8d5e-466e47ecf1dd?resizing_type=fill&width=1920&height=335)

如果您在处理多平台项目，可能在某些情况下，需要播放特定于平台的媒体。 例如，您可能想要在PlayStation 4（PS4）上游戏时播放一段特定的影片，而在Xbox One上播放另一段影片。 或者，可能使用同类型的媒体，但由于性能原因而采用了不同的编码方式，您想要在不同的平台上播放不同的格式。

通过 **平台媒体源（Platform Media Source）** 资源，您可以确定根据运行平台应播放哪个媒体源资源。 在打开/播放平台媒体源（Platform Media Source）时，它将检查您当前所在的平台，并自动播放指定的媒体源。

在本操作指南中，我们将创建平台媒体源（Platform Media Source），并针对Android和Windows平台指定两个不同的媒体源。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e3496b3-ed27-4a22-a62f-274a0f0e8513/00-hero-image_ue5.png)

## 步骤

在本操作指南中，我们使用启用了 **初学者内容包** 的 **蓝图第三人称模板（Blueprint Third Person Template）** 项目。 我们还将使用两个样本视频，您可以右键单击该[平台视频](/documentation/404)链接进行下载，然后将内容解压到您的电脑上。

1.  在 **内容浏览器** 中，展开 **源（Sources）** 面板，并添加名为 **电影（Movies）** 的新文件夹，然后在该文件夹上单击右键并选择 **在资源管理器中显示（Show in Explorer）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c1bf5cb-0064-4b4d-bfb7-b6320c11438d/01-show-in-explorer_ue5.png)
2.  将样本示例或所需媒体文件拖到项目的 **Content/Movies** 文件夹。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8429b0c1-23a3-40b4-bdb1-c9a76195704a/02-video-in-folder_ue5.png)
    
    如果您想要打包并部署包含任意媒体文件的项目，需要将它们放置在项目的 **Content/Movies** 文件夹中。
    
3.  在 **内容浏览器** 中，在项目的 **Content/Movies** 文件夹下，单击右键并在 **媒体（Media）** 下选择 **文件媒体源（File Media Source）**，将其命名为 **Android\_Movie**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23aef52e-0759-4de6-b013-e72101c89af1/03-file-media-source_ue5.png)
    
    这里我们创建 **平台媒体源（Platform Media Source）** 资源能够指向的媒体源资源，并在Android设备上运行时加以使用。
    
4.  再创建一个 **文件媒体源（File Media Source）** 资源，并命名为 **Windows\_Movie**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0a2ec76-2675-4cf0-8828-868ffb42adaa/04-file-media-android-windows_ue5.png)
5.  打开 **Android\_Movie** 媒体源，然后对于 **文件路径（File Path）**，使用 **Gideon\_720x480**（或者您所需的视频），并选择 **打开（Open）**。
    
    ![](05-open-gideon-video_ue5.png.)
    
    对于Android影片，我们使用 **.3GP** 视频文件，这类文件更适合于在Android设备上播放，而Windows影片则为 **.MP4** 文件。
    
6.  打开 **Windows\_Movie** 媒体源，将 **文件路径（File Path）** 指向 **Infiltrator Demo**（或者您所需的视频），并选择 **打开（Open）**。
    
7.  右键单击 **Content/Movies** 文件夹，然后在 **媒体（Media）** 下面，选择 **平台媒体源（Platform Media Source）**，并命名为 **Platform\_Source**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a94db77f-8609-465e-b309-a6ffb9ab7144/06-platform-media-source_ue5.png)
    
    现在，我们已经有了多个媒体源资源，我们可以通过 **平台媒体源（Platform Media Source）** 资源定义要在哪个平台上播放哪个媒体源。
    
8.  打开 **Platform\_Source**，在 **Android** 下面选择 **Android\_Movie**，在 **Windows** 下面选择 **Windows\_Movie**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/569b97f8-f490-4fb7-9b74-c4071e2d3858/07-media-sources-android_ue5.png)
    
    在我们的示例中，我们使用两个不同的视频。但是，您可以使用具有不同编码或不同格式的同一个视频以便用于不同的设备。 您还可以使用不同的媒体源类型，例如，在Windows上，您可以选择使用[媒体流](/documentation/zh-cn/unreal-engine/play-a-video-stream-in-unreal-engine)从网站拉取内容，代替使用磁盘上的文件。
    
9.  在 **Content/Movies** 文件夹中单击右键，然后在 **媒体（Media）** 下面选择 **媒体播放器（Media Player）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0a64513-a649-4095-88dd-1427c5acaa1e/08-media-player_ue5.png)
    
    我们仍需要使用 **媒体播放器（Media Player）** 来打开和播放 **平台媒体源（Platform Media Source）** 资源。
    
10.  在 **创建媒体播放器（Create Media Player）** 窗口中，启用 **视频输出媒体纹理资源（Video output Media Texture asset）** 选项，然后单击 **确定（OK）** 并调用资源 **媒体播放器（Media Player）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9e93a90-c652-4b5b-8b47-f521f375becb/09-video-output-asset_ue5.png)
    
    这样会自动创建与这个媒体播放器关联的 **媒体纹理（Media Texture）**，然后我们可以在[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)中加以使用。 我们可以使用这个材质，并将其应用于关卡中的网格体来播放我们的内容。
    
11.  在 **媒体播放器（Media Player）** 资源内部，双击 **媒体库（Media Library）** 窗口中的 **Platform\_Media** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/457cdcd0-24c0-436a-86f9-bcfbba5cf172/10-video-media-player_ue5.png)
    
    双击 **Platform\_Source** 资源将开始播放仅指定到 **Windows** 的平台媒体源（因为我们是在Windows平台上运行）。 通过蓝图或C++，我们可以打开 **Android\_Movie** 媒体源进行播放，但是，当打开Platform\_Source时，仅播放指定到Windows的媒体源。 此外，**打开时播放（Play on Open）** 选项默认是启用的，从而允许媒体播放器开始播放所打开的媒体源。
    
12.  在主编辑器窗口中，从 **模式（Modes）** 面板中的 **基本（Basic）** 下面，将 **平面（Plane）** 拖到关卡，根据需要调整大小，然后将 **MediaPlayer\_Video** 纹理拖到它上面。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f08dcae0-989d-4b14-942a-f0159b21ad47/11-add-media-player_ue5.png)
    
    通过将 **媒体纹理（Media Texture）** 资源拖到关卡中的静态网格体上，会创建并应用材质，材质将播放我们的媒体。
    
    假如你需要在使用 **Electra媒体播放器** 时使用纹理取样或纹理对象，请将 **取样器类型（Sampler Type）** 设置为 **颜色（Color）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bc987c6-5dda-4999-8caf-9b7de93b641e/12-samler-type-color_ue5.png)
    
13.  选中 **平面（Plane）**，在 **细节（Details）** 面板中，添加 **媒体声音（Media Sound）** 组件，并将 **媒体播放器（Media Player）** 选项设置为使用您的 **MediaPlayer** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79a9cabf-32e1-49b1-812f-548b9c8b1ad7/13-connect-media-player_ue5.png)
14.  从主工具栏，单击 **蓝图（Blueprints）** 选项，然后选择 **打开关卡蓝图（Open Level Blueprint）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fef31e2b-306a-4f58-94b8-25bde079451e/14-open-level-blueprint_ue5.png)
15.  在 **我的蓝图（My Blueprint）** 面板中，创建一个 **媒体播放器对象引用（Media Player Object Reference）** 类型的变量并命名为 **媒体播放器（MediaPlayer）**，然后将您的 **媒体播放器（MediaPlayer）** 指定为要使用的 **媒体播放器**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7eae1c45-bc44-4ece-a824-4e18286ec102/15-media-player-compile_ue5.png)
    
    这样会创建对您的媒体播放器资源的引用，然后您可以在蓝图中使用并对其调用操作。
    
    为了设置变量的 **默认值（Default Value）**，需要先单击 **编译（Compile）** 来编译蓝图。
    
16.  按住 **Ctrl** 键并将 **媒体播放器（MediaPlayer）** 变量拖到图形上，单击右键并添加 **1** 键盘事件，然后连接到指向 **Platform\_Source** 的 **打开源（Open Source）** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d34e1b2-ffc9-4342-9096-39f677bdcfa5/16-blueprint-keybord_ue5.png)
    
    这里我们告诉媒体播放器打开指定的 **平台媒体源（Platform Media Source）** 资源，这个资源设置为根据所运行的平台打开其他媒体源资源。
    
17.  关闭 **关卡蓝图（Level Blueprint）**，然后单击 **播放（Play）** 按钮来在编辑器中播放。
    

## 最终结果

在编辑器中播放时，按 **1** 键将在平台媒体源中打开Windows定义的媒体源。

如果要将该项目部署到Android设备，则将播放指定到Android的媒体源资源。

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [media framework](https://dev.epicgames.com/community/search?query=media%20framework)
-   [video playback](https://dev.epicgames.com/community/search?query=video%20playback)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/playing-platform-specific-media-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/playing-platform-specific-media-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)