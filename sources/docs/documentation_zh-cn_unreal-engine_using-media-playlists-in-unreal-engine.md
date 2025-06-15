# 使用虚幻引擎媒体播放列表 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-media-playlists-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:24:43.906Z

---

目录

![使用媒体播放列表](https://dev.epicgames.com/community/api/documentation/image/1b364904-03f8-4c0a-8b0f-7cc13e3747bb?resizing_type=fill&width=1920&height=335)

在虚幻引擎5(UE5)中使用媒体资源时，可能会出现这样的情况：您希望以特定顺序播放一系列视频，或者希望允许玩家访问特定系列视频中的视频。 这可以通过使用 **媒体播放列表（Media Playlist）** 资源来实现，该资源指向按预定义顺序指定的 **媒体源（Media Source）** 资源。

在本教程中，我们创建了一个媒体播放列表，并允许玩家按顺序播放每个资源或通过按键访问播放列表中的特定视频。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19771be8-be45-4800-ac21-d0323234811f/0-hero_ue5.png)

## 步骤

对于本教程，我们使用的是已启用 **初学者内容包（Starter Content）** 的 **蓝图第三人称模板（Blueprint Third Person Template）** 项目。 我们还在播放列表中使用了三个示例视频，您可以通过右键单击此[示例视频](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/b1d344d8-2e8f-45fe-b8bc-efca6d613e3f/video.zip)链接并提取计算机上的内容来下载它们。

1.  在 **内容浏览器（Content Browser）** 中，展开 **源面板（Sources Panel）**，并创建一个名为 **电影（Movies）** 的文件夹，然后右键单击它和 **在资源管理器中显示（Show in Explorer）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb176e03-9097-445d-8c9e-3ecc554a5ec5/01-show-in-explorer_ue5.png)
    
    为了成功将视频文件与项目一起打包和部署，内容必须位于项目的 **内容/电影（Content/Movies）** 文件夹中。
    
2.  将提供的示例视频拖至项目的 **内容/电影（Content/Movies）** 文件夹中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfbaaff7-3228-439b-a2e2-91a58dadc78b/02-video-in-folder_ue5.png)
3.  在项目中，右键单击 **内容/电影（Content/Movies）** 文件夹，然后在 **媒体（Media）** 下选择 **文件媒体源（File Media Source）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b03fb902-0e19-4c02-ae2c-96447441b83a/03-file-media-source_ue5.png)
4.  创建三个名称分别为 **视频\_01（Video\_01）**、**视频\_02（Video\_02）** 和 **视频\_03（Video\_03）的** 文件媒体源（File Media Source） **资源**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/561dff53-25de-438a-9fa1-d4daaaef50ca/04-file-media-source_ue5.png)
5.  在 **视频\_01（Video\_01）** 中，将 **文件路径（File Path）** 指向 **Gideon\_720x480** 文件（或需要的视频文件），然后单击 **打开（Open）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1898bdf-b632-4744-8f5a-498fb8c6d298/05-open-file_ue5.png)
6.  重复上一步骤，为 **视频\_02（Video\_02）** 和 **视频\_03（Video\_03）** 资源指定视频。
    
7.  创建一个名为 **媒体播放器（MediaPlayer）** 的 **媒体播放器** 资源，并创建一个相关的 **媒体纹理（Media Texture）**，然后打开该 **媒体播放器** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf4edaac-7b70-438d-831f-89872028059b/06-add-media-player_ue5.png)
    
    双击 **媒体库（Media Library）** 窗口中的视频将播放选中文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae6e03d0-6a6e-41f7-9cac-c39f59528ae9/07-media-player-video-1_ue5.png)
    
    您还可以通过启用 **详细信息（Details）** 面板中的 **随机播放（Shuffle）** 选项，设置播放器随机播放播放列表中的视频。 **循环（Loop）** 选项将循环播放整个播放列表（如果媒体播放列表中只有单个源，则一直播放单个源）。 我们的媒体播放器还被设置为 **打开即播放（Play on Open）**，这意味着，当我们打开与此媒体播放器相关的媒体源（Media Source）时，它会自动开始播放。
    
    在 **播放列表（Playlist）** 窗口中，你可以保存新的播放列表资源。
    
8.  在 **内容浏览器（Content Browser）** 的 **内容/电影（Content/Movies）** 文件夹中，单击右键并在 **媒体（Media）** 下选择 **媒体播放列表（Media Playlist）**，并将其命名为 **我的播放列表（MyPlaylist）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fae5d26f-b8c2-4d88-9538-08d61046d5db/08-add-media-playlist_ue5.png)
9.  打开 **我的播放列表（MyPlaylist）** 资源，然后在 **媒体库（Media Library）** 窗口中，双击视频并将每个视频添加到播放列表中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0b83b77-44cb-4daa-87e6-dda01890adf1/09-add-file_ue5.png)
    
    您还可以使用 **+** 按钮向播放列表添加新项目，并使用下拉菜单选择要添加的媒体源类型。 在 **播放列表（Playlist）** 窗口，您可以插入、复制或删除播放列表中的项目，也可以单击左键并拖动行，通过单击每行左侧的选项卡来重新排列播放顺序。 如果您想要循环整个播放列表，可以使用位于媒体播放列表（Media Playlist）窗口顶部的 **循环（Loop）** 选项。
    
10.  在主编辑器（Main Editor）窗口的 **放置Actor（Place Actors）** 面板中的 **形状（Shapes）** 选项卡中，将一个 **平面（Plane）** 拖至关卡中，并使用 **变换工具（Transform Tools）** 调整其大小。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/395a7bfc-59ca-477f-9f80-465b3b47160c/10-shapes-plane_ue5.png)
    
    使用[变换工具](/documentation/zh-cn/unreal-engine/transforming-actors-in-unreal-engine)，您可以根据需要移动（**W键**）、旋转（**E键**）或缩放（**R键**）此平面，就像我们将在此静态网格体上播放视频那样。
    
11.  在 **内容浏览器（Content Browser）** 中，将 **MediaPlayer\_Video** 媒体纹理资源拖至关卡中的此平面上，以创建并应用一个新材质。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77d5abc4-8b3b-4b6b-9d85-9738fa52dbdb/11-add-media-player-video_ue5.png)
    
    当您将 **媒体纹理（Media Texture）** 拖至关卡中的静态网格体上时，**材质（Material）** 将自动创建并应用到此网格体上，从而使我们可以播放视频。
    
12.  在关卡中选择此 **平面** 后，在 **详细信息（Details）** 面板中单击 **添加组件（Add Component）** 按钮并添加 **媒体声音（Media Sound）** 组件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72365081-43b2-43cf-b97a-4b6bf359daeb/12-add-media-sound_ue5.png)
    
    **媒体声音（Media Sound）** 组件使我们能够将音频与媒体播放器相关联，并提供了一种将音频与视频一起播放的方法。
    
13.  选择 **媒体声音（Media Sound）**组件，然后在 **媒体（Media）** 部分下指定 **MediaPlayer** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07e52e57-fb67-4f22-b1d9-880f56aec6ad/13-connect-media-player_ue5.png)
14.  在主工具栏（Main Toolbar）中，单击 **蓝图（Blueprints）** 按钮并选择 **打开关卡蓝图（Open Level Blueprint）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff1bd95d-dd0c-4b9d-a84a-58d2a908e9bc/14-open-level-blueprint_ue5.png)
    
    虽然我们的视频会在媒体编辑器中播放，但为了在游戏进程中播放它，我们需要打开播放列表，这样它便能够开始播放。
    
15.  在 **我的蓝图（MyBlueprint）** 窗口中，创建一个名为 **媒体播放器（MediaPlayer）**，类型为 **媒体播放器对象参考（Media Player Object Reference）** 的变量，并将 **默认值（Default Value）** 设置为 **媒体播放器（Media Player）** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8973a7e-40f9-40b0-be2d-226aa395e2e1/15-media-player-compile_ue5.png)
    
    若要设置 **默认值（Default Value）**，您可能需要 **编译（Compile）** 您的蓝图。
    
16.  在图中，单击右键并添加一个 **1** 键盘事件，然后按住 **Ctrl** 并将 **MediaPlayer** 变量拖至图中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f8ee0e0-7433-4323-a5a5-a70414fc8b36/16-media-player-blueprint_ue5.png)
17.  拖出 **MediaPlayer** 变量，使用 **Open Playlist Index（打开播放列表索引）**（将 **在播放列表中（In Playlist）** 设置为 **我的播放列表（MyPlaylist）**）并连接到 **1** 键盘事件的 **Pressed**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70891bb3-3b1a-4b8d-a709-96c46c00f95f/17-blueprint-open-playlist_ue5.png)
    
    此处，当玩家按下键盘上的 **1** 键时，播放列表将打开（并开始播放）播放列表中的第一个视频。 此索引引用媒体播放列表资源中指定的播放列表索引顺序（如下图所示）并从零开始，零为播放列表中的第一个视频。 使用 **打开播放列表索引（Open Playlist Index）** 节点，您可以通过输入文件的索引值来指定希望在播放列表中打开的文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/463df492-1696-4aeb-a138-fc0572396ea8/18-array-elements_ue5.png)
18.  单击右键并将 **2** 和 **3** 键盘事件分别添加到 **打开播放列表索引（Open Playlist Index）** 分别作为 **索引1（Index 1）** 和 **索引2（Index 2）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db1fea1d-6a79-4168-b543-a3a8f94cd32e/19-index-playlist_ue5.png)
    
    执行此设置后，当您按1时，您将打开播放列表中的第一个文件，当您按2时，将打开第二个文件，当您按3时，将打开第三个文件。
    
19.  单击右键，添加 **左（Left）** 和 **右（Right）** 键盘事件以调用 **上一个（Previous）** 和 **下一个（Next）** 节点，并添加 **0** 以调用 **打开播放列表（Open Playlist）** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d160d583-490d-432e-9fa9-73d0b0af81c4/20-target-in-playlist_ue5.png)
    
    **上一个（Previous）** 和 **下一个（Next）** 节点将分别跳至播放列表中的上一个和下一个视频，而 **打开播放列表（Open Playlist）** 节点执行的功能与在索引为0（或播放列表的开头部分）时打开播放列表时的功能相同。 凭借这些节点，我们可以使用键盘 **左（Left）** 和 **右（Right）** 箭头键循环播放整个播放列表，按下 **0** 键将在播放列表开始处打开播放列表。
    
20.  关闭 **关卡蓝图（Level Blueprint）**，然后单击 **播放（Play）** 按钮以在编辑器中播放。
    

## 最终结果

当您在编辑器中播放时，按 **1**、**2**、**3** 或 **0** 键将在指定索引处开始播放（如果适用）。

当一个视频结束时，它会自动跳转至播放列表中的下一个视频。如果您启用了 **循环（Loop）**，则一旦播放完播放列表中的最后一个视频，它会跳转至播放列表的起始处。 播放视频时，可以按 **左（Left）** 或 **右（Right）** 箭头键跳至播放列表中的上一个或下一个视频，也可以按 **1**、**2** 或 **3** 键直接跳转至播放列表中的特定视频。

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [media framework](https://dev.epicgames.com/community/search?query=media%20framework)
-   [video playback](https://dev.epicgames.com/community/search?query=video%20playback)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-media-playlists-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-media-playlists-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)