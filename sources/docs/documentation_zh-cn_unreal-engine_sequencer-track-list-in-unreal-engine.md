# 虚幻引擎Sequencer轨道列表 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:39.230Z

---

目录

![轨道](https://dev.epicgames.com/community/api/documentation/image/42dd16d6-e395-4e3a-8e6c-0a961882da44?resizing_type=fill&width=1920&height=335)

在Sequencer中，Actor属性和其他元素是通过向时间轴添加轨道来访问的。根据轨道类型，它们可用于组织轨道、创建关键帧或启用其他辅助函数。

#### 先决条件

-   你已了解[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)及其[界面](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)。

## 轨道列表

下表列出了你可以在Sequencer中添加的主要轨道。

[

![Object绑定轨道](images/static/document_list/empty_thumbnail.svg)

Object绑定轨道

Object绑定轨道将Actor和Object绑定到Sequencer，并提供控制方法来操纵其专用属性或组件。





](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine)[

![动画轨道](images/static/document_list/empty_thumbnail.svg)

动画轨道

借助动画轨道，可以将动画序列添加到你的骨骼网格体轨道。





](/documentation/zh-cn/unreal-engine/cinematic-animation-track-in-unreal-engine)[

![音轨](images/static/document_list/empty_thumbnail.svg)

音轨

非线性动画的动画混合工具概述。





](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine)[

![事件轨道](images/static/document_list/empty_thumbnail.svg)

事件轨道

事件轨道支持创建在专用Sequencer蓝图层中编写脚本的自定义事件。





](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine)[

![几何体缓存轨道](images/static/document_list/empty_thumbnail.svg)

几何体缓存轨道

说明如何添加和使用几何体缓存轨迹在Sequencer中拉动播放和利用几何体轨迹资源。





](/documentation/zh-cn/unreal-engine/cinematic-geometry-cache-track-in-unreal-engine)[

![淡入淡出轨道](images/static/document_list/empty_thumbnail.svg)

淡入淡出轨道

Sequencer中的淡入淡出轨道用于将整个画面淡入淡出为纯色。你可以通过它淡入淡出为黑色、白色或其他颜色。





](/documentation/zh-cn/unreal-engine/cinematic-color-fade-track-in-unreal-engine)[

![关卡可视性轨道](images/static/document_list/empty_thumbnail.svg)

关卡可视性轨道

如何控制关卡可见性的示例。





](/documentation/zh-cn/unreal-engine/cinematic-level-visibility-track-in-unreal-engine)[

![材质轨道](images/static/document_list/empty_thumbnail.svg)

材质轨道

将材质轨道用于不同的功能，以各种方式在Sequencer中为材质制作动画。





](/documentation/zh-cn/unreal-engine/animate-materials-in-unreal-engine-cinematic)[

![时间膨胀轨道](images/static/document_list/empty_thumbnail.svg)

时间膨胀轨道

使用时间膨胀轨道加快或放慢过场动画的播放速度。





](/documentation/zh-cn/unreal-engine/cinematic-playback-rate-in-unreal-engine)[

![子序列轨道](images/static/document_list/empty_thumbnail.svg)

子序列轨道

使用Subsequence轨道进行整理，使多个美术师能处理同一序列的工作。





](/documentation/zh-cn/unreal-engine/cinematic-subscequences-track-in-unreal-engine)[

![媒体轨道](images/static/document_list/empty_thumbnail.svg)

媒体轨道

媒体轨道可以使用虚幻引擎的媒体框架功能控制Sequencer中的影片和图像的播放。





](/documentation/zh-cn/unreal-engine/cinematic-movie-media-track-in-unreal-engine)[

![镜头切换轨道](images/static/document_list/empty_thumbnail.svg)

镜头切换轨道

在Sequencer中可以使用镜头切换轨道控制在播放期间当前激活的电影摄像机Actor。





](/documentation/zh-cn/unreal-engine/cinematic-camera-cut-track-in-unreal-engine)[

![文件夹轨道](images/static/document_list/empty_thumbnail.svg)

文件夹轨道

文件夹轨道可用于整理Sequencer大纲视图中的轨道。





](/documentation/zh-cn/unreal-engine/organize-cinematic-tracks-in-unreal-engine)[

![变换和属性轨道](images/static/document_list/empty_thumbnail.svg)

变换和属性轨道

Sequencer的属性轨道用于为Actor的常见变量或属性（例如变换、浮点或颜色）制作动画。





](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine)[

![控制台变量轨道](images/static/document_list/empty_thumbnail.svg)

控制台变量轨道

使用控制台变量轨道在实时动画中调整渲染设置和其它控制台变量





](/documentation/zh-cn/unreal-engine/cinematic-console-variable-track-in-unreal-engine)[

![可自定义的Sequencer轨道](images/static/document_list/empty_thumbnail.svg)

可自定义的Sequencer轨道

通过蓝图和可自定义Sequencer轨道功能创建你自己的轨道来在Sequencer中使用





](/documentation/zh-cn/unreal-engine/customizable-sequencer-track-in-unreal-engine)

## 添加轨道

Sequencer提供了多种将轨道添加到时间轴的方法。

点击Sequencer的大纲视图中的 **添加轨道（+）** 按钮，界面上将显示可添加到序列中的轨道列表。在此处选择一个轨道，添加到Sequencer。

![Sequencer轨道列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3feeb44-b5b3-4e13-9328-88d347f74fbd/addtrack1.png)

右键点击大纲视图的空白区域也会显示轨道列表。

![Sequencer轨道列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7de83b06-c027-46aa-a441-4ab35859badf/addtrack2.png)

### 添加Actor

Sequencer中最常用的轨道之一是[对象绑定归档](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine)。这些轨道绑定到关卡中的 **骨架网格体**、**静态网格体**、**效果**、**蓝图**、**组件** 和其他对象。

打开 **添加轨道（+）** 菜单的 **Actor到Sequencer子菜单（Actor To Sequencer）** 子菜单，将Actor添加到你的序列中。你可以在此将关卡中当前已有的任何Actor添加到序列中，也可以使用搜索栏搜索特定Actor。

![Actor到Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de731df4-dc56-4563-a279-beb41cb450f6/addactor1.png)

如果你选择了关卡中一个Actor，为了方便起见，它将列在 **Actor到Sequencer（Actor To Sequencer）** 列表的顶部。

你还可以从其他窗口拖动Actor，例如[大纲视图](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine)，将其添加到Sequencer。

![Actor到Sequencer拖放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b44c58dd-31a7-4dad-bbe6-08ebaca3d9d7/addactor2.png)

也可将Actor从[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)或[Place Actors](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)面板拖放，将其作为[可生成物](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics)添加。

![Actor至Sequencer内容浏览器放置Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f84feb38-7761-49b6-a3c5-7fc6a7c954cb/addactor3.png)

### 添加组件

某些轨道允许将组件和其他轨道类型添加在其主标题轨道下。这样做是为了访问特定的轨道功能，例如变换、组件、属性和其他类似功能。

要添加组件轨道，请将鼠标悬停在轨道上，点击 **添加轨道（+）**，查看可用于所选轨道的轨道列表。通常，该轨道或该Actor支持哪些类型的轨道和组件，决定了列表中将显示的内容。

![添加子轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf743a56-7ba5-43af-adec-a5243839e261/subtrack.png)

和虚幻引擎中的大部分菜单一样，你可以在 **添加轨道（+）** 中输入关键词以筛选结果，从而更轻松地找到要添加的特定属性、组件或其他轨道。t

![输入关键词筛选轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09c89ea0-c88c-4145-ab2b-4b35cfd4da34/subtrack2.gif)

## 组织

大多数轨道具有属性，属性的存在让轨道能够以不同方式编辑和显示。这些属性保存在Sequencer中，可以分享给项目组的其他人。

### 重命名

为了便于整理，所有最高层级的轨道和组件都可以在Sequencer中重命名。要重命名轨道，可三击轨道文本，也可右键点击后选择 **重命名（Rename）** 或按 **F2**。

![重命名轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b93bd125-6bbe-4ae1-acd0-c1148eb03a54/rename1.png)

在重命名绑定到关卡中某个Actor的轨道时，关卡中的Actor也会被重命名。

![重命名轨道将重命名Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9714f04-5dff-4c41-841d-4e49cf2a29e9/rename3.gif)

大部分轨道都可以被重命名，但不是全部。通常，属性轨道不能被重命名。但某些属性轨道可以，例如变换（Transform）。

![重命名轨道限制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fad7e64-8083-4b41-b811-86368f7cd87b/rename2.png)

绿色的轨道可以被重命名，红色的不行。

### 锁定

轨道可以锁定，以防轨道上的关键帧及其子轨道被编辑。右键点击轨道后选择 **锁定（Locked）**，即可锁定该轨道。轨道锁定后，它下面的所有可键入轨道将显示红色边框，表示锁定状态。

![锁定轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fd4170f-ea5f-4c6d-b0ce-6b2b73d02a40/locking.png)

### 固定

轨道可以 **固定（Pin）** ，固定后的轨道会出现在Sequencer大纲顶部的单独大纲视图分段中。右键点击轨道后选择 **固定（Pinned）**，即可固定该轨道。

![固定轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ad49d03-bd96-4e61-a80d-c17d403d43c3/pinning.png)

每个序列中只能固定一个轨道。

### 禁用

将轨道禁用会导致轨道变为非活动状态，并且不显示此轨道的任何属性或来自Sequencer的关键帧结果。右键点击轨道后选择 **禁用（Mute）**，即可将该轨道禁用。

![将轨道禁用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b8743b8-4518-4470-898a-5b6c4023c9f3/mute.png)

如果 **[Object绑定轨道](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine)** 被禁用，它还会在视口中隐藏Actor。

### 单独启用

**单独启用** 某个轨道时，其他轨道都将禁用，从而可以单独查看处于单独启用状态的轨道。右键点击轨道后选择 **单独启用（Solo）**，即可单独启用该轨道。

![单独启用轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14f954d8-55e5-44f1-8914-1802e105711d/solo.png)

单独启用和禁用是仅限编辑器的操作，除非你通过 **[在编辑器中运行](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine)**\*\* 进行预览，否则不会在运行时影响关卡。

### 重新排序

你可以在大纲视图中上下拖动轨道，对其进行重新排序。在拖动时出现的Cue将指示轨道的最终落位。

![对轨道重新排序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e87fcbfb-8bde-4027-9a6a-82c1fec7ab96/dragdrop.gif)

## 搜索和筛选

你可以使用Sequencer的搜索字段搜索和筛选特定轨道名称。输入轨道的全称或部分名称，将筛选掉与该名称不匹配的轨道，但是会包括符合部分搜索词的子轨道。

![搜索轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a235bc6a-4743-41e8-b272-dc8a02b8b7f5/search.png)

点击 **筛选器（Filters）** 按钮还将显示你可以筛选的常见轨道类型列表。

![筛选轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcc105fc-4f86-4ca9-84a9-fa6b7cd535e2/filter.png)

对于使用中的筛选器，其 **筛选器** 按钮上将出现红点指示。

![筛选器指示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/310ccbe2-d123-4254-a51a-ce1d5774bf7b/filter2.png)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [tracks](https://dev.epicgames.com/community/search?query=tracks)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [轨道列表](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E8%BD%A8%E9%81%93%E5%88%97%E8%A1%A8)
-   [添加轨道](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E8%BD%A8%E9%81%93)
-   [添加Actor](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E6%B7%BB%E5%8A%A0actor)
-   [添加组件](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E7%BB%84%E4%BB%B6)
-   [组织](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E7%BB%84%E7%BB%87)
-   [重命名](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E9%87%8D%E5%91%BD%E5%90%8D)
-   [锁定](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E9%94%81%E5%AE%9A)
-   [固定](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E5%9B%BA%E5%AE%9A)
-   [禁用](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E7%A6%81%E7%94%A8)
-   [单独启用](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E5%8D%95%E7%8B%AC%E5%90%AF%E7%94%A8)
-   [重新排序](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E9%87%8D%E6%96%B0%E6%8E%92%E5%BA%8F)
-   [搜索和筛选](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine#%E6%90%9C%E7%B4%A2%E5%92%8C%E7%AD%9B%E9%80%89)