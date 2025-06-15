# 虚幻引擎DemoNetDriver和流送器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/demonetdriver-and-streamers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:57:37.266Z

---

目录

![DemoNetDriver和流送器](https://dev.epicgames.com/community/api/documentation/image/2c949e79-7a9f-4569-bc3d-f2b715384608?resizing_type=fill&width=1920&height=335)

`DemoNetDriver` 使用 **流送器（Streamer）** 来提取和记录创建回放所需的信息。引擎中包含了几个不同的流送器，可以根据回放数据的显示方式将它们附加到 `DemoNetDriver` 。**本地文件流送器（Local File Streamer）**, 为默认流送器，它将主机上的事件直接记录到磁盘上，这使得它最适合单人游戏以及在主机玩家自己的机器上回放的游戏。**保存游戏流送器（Save Game Streamer）** 是本地文件流送器的一个变体，它将回放记录到保存游戏插槽中，这在游戏机上特别有用，它还支持播放和管理这些回放的补充功能。**内存流送器（Memory Streamer）** 在客户端机器上运行，它将数据存储在内存中，这使得它非常适用于体育类游戏中的"即时回放"功能或射击类游戏中的"死亡回放"。最后，**HTTP流送器（HTTP Streamer）** 用于通过局域网或互联网将回放数据发送到另一台机器上，这使得它非常适用于专用服务器游戏，以及那些可能需要向众多观众进行实时流送同时又保持对玩家的响应的游戏。

## DemoNetDriver功能

-   DemoNetDriver默认使用本地文件流送器，但是可以通过接收设置为不同流送器工厂模组名称的URL "ReplayStreamerOverride" 选项来覆盖，比如 "InMemoryNetworkReplayStreaming" 或者 "HttpNetworkReplayStreaming"。默认值 "LocalFileNetworkReplayStreaming" 可以通过修改项目的 `DefaultEngine.Ini` 文件中 "NetworkReplayStreaming" 区块里的 "DefaultFactoryName" 变量来更改。也可以通过调用 `InitBase` 并提供正确的URL参数来达到同样的效果。
    
-   DemoNetDriver可以将 "demo.CheckpointSaveMaxMSPerFrame" CVar设置为启用来节省记录回放数据的时间。在每帧时间限制之内没有记录进回放的Actors会进入下一帧的记录队列。该功能可以限制检查点存档记录时所消耗的时间，减少游戏中的卡顿。但是会对回放造成显示上的错误，因为一些检查点包含了来自其它帧的Actor数据。只有在记录检查点时所耗费时间超出指定时间限制的情况下该功能才会启动，也就意味着它主要用于低端设备或者对性能要求很高的游戏。
    
-   如果 `bPrioritizeActors` 设置为true，保存到回放中的Actors会被按照记录顺序的优先级提前排序，基于虚拟函数 `GetReplayPriority`。这可以和通过 `MaxDesiredRecordTimeMS` 进行的缓和保存搭配使用。
    
-   检查点记录频率可以通过修改 `demo.CVarCheckpointUploadDelayInSeconds` CVar来调整。默认值为30秒。增加检查点之间的间隔时间会让快退或者跳转播放变慢，但是可以减小回放大小。
    
-   变量 `bPauseRecording` 可以在记录时设为true来临时挂起记录。将其设回false可以继续记录。
    
-   **游戏模式（Game Mode）** 会在查看回放时使用不同的 **播放器控制器（Player Controller）** 类 (指定为 `ReplaySpectatorPlayerControllerClass`)。
    
-   使用 `SetViewerOverride`，`DemoNetDriver` 可以改变创建不同的用于记录的 **播放器控制器（Player Controller）** 如何决定Actor的网络关联性、剔除以及优先化。这对于有着大型地图的游戏尤其有用，玩家往往在游玩时不会注意远处的物体（既利于优化性能也利于反作弊），但是在查看回放时会希望看到所有物体。
    
-   DemoNetDriver可以与Slate同时运行。要做到这样，需要将 "tick.DoAsyncEndOfFrameTasks" 和 "demo.ClientRecordAsyncEndOfFrame" CVar全部调为非零值。
    

由回放生成的Actor会像游戏中的Actor一样调用函数。这让它们有着和游戏内Actor一样的表现，只带有很少量的回放数据，但是这也意味着一些影响到 `GameInstance` 、 `GameState` 或者 `GameMode` 这样的共用物体的函数调用仍然可以被回放Actor使用，并且以意想不到的方式影响游戏的状态。这种问题对于内存流送器尤为突出，因为它可以在游戏还在运行时查看回放。要解决这样的问题，建议在运行前先检查Actor属于运行的关卡还是回放关卡，然后在根据情况运行。这种问题在不同的游戏中都会出现不同的情况，必须根据单个项目具体解决；比如，一个游戏在回放中想要更改玩家的健康条或者受伤的全屏特效，但是不能改变玩家的分数。

## 回放数据格式

关于数据，一个回放包含三种游戏状态信息，以及一些文本信息。首先是基础信息，描述游戏世界的初始状态。检查点会按照用户的定义规律出现，并且对世界变动拍下快照。检查点之间的间隔由世界中每个物体递增的变化来填充。引擎可以将世界初始化至起始状态、根据选定的时间使用检查点对世界进行变动、最后从最近的检查点直到指定的时间点开始进行递增的更改，以此来快速重建游戏中的任何一个瞬间。回放中的文本数据包括显示名称，用于制作面对玩家的列表，以及用户定义的文本标签（仅限HTTP流送器），用于在游戏列表中查找或筛选。

## 本地文件流送器

本地文件流送器将回放数据异步记录到本地存储（如硬盘）上的单个文件中。自引擎4.20版本中引入以来，它作为默认流送器，替代了空流送器。本地文件流送器的单文件输出使得保存回放的分发和管理变得更加轻松，同时它的异步记录还提高了硬盘速度较低的系统的性能，例如游戏主机。回放数据文件保存在项目中的"Saved/Demos/"文件夹下，其扩展名为".replay"。

本地文件流送器与由空流送器记录的回放不兼容。如果您的项目使用的是本地文件流送器，但您希望与由空流送器记录的回放保持向后兼容性，则需要包含空流送器。这并不妨碍项目继续使用本地文件流送器。

## 保存游戏回放流送器

保存游戏回放流送器是本地文件流送器的一个专门版本，它增加了将回放传输到 **保存游戏** 插槽的能力。它在游戏机上尤其有用，使得客户端回放可以使用平台的常规接口进行保存和加载，从而加载保存的游戏。虽然此流送器保留了无需保存游戏系统即可存储、保存和加载回放的功能，但其主要用途在于其补充API，可以识别尚未复制到保存游戏插槽的回放，执行复制，以及从本地文件和从保存游戏插槽中播放或删除回放。

## 空流送器

空流送器直接将回放数据写入磁盘，比如本地硬盘。这样有利于进行本地录制，尤其是对于单机游戏。这些录制可以有多种用途，比如制作游戏实机宣传片和游戏内过场动画，或者让用户在游戏中查看并分享快速通关或者教程视频。回放数据会保存至项目的 "Saved/Demos/(Replay Name)" 文件夹。

空流送器是4.20引擎版本之前的默认回放录制方式。它已经被弃用，但是仍然可以播放旧的回放，支持反向兼容。

## 内存流送器

内存流送器在本地设备的内存上保存一段可以由用户自定义时长的回放数据。这种流送最适合用于快速播放最近的关键时刻，比如体育游戏中的得分瞬间、射击游戏中的死亡瞬间或者动作游戏中Boss战的最后一刻。

### 内存流送器使用细节

内存流送器比较特别，它通常在单个会话中录制、播放并返回游戏。玩家在观看回放时，实时的游戏仍然继续，但是不显示也没有声音，这样可以在回放结束时无缝地返回游戏。在加载时，引擎会将关卡收集为三组：静态关卡、动态源关卡以及动态复制关卡。这些组会决定关卡如何与实时游戏和回放系统互动，如下：

  

关卡组

添加至该组的关卡

行为

**静态关卡（Static Levels）**

非持续关卡并且带有 `IsStatic` 布尔值标记的关卡。

不受游戏影响，并且在实时游戏和回放中都会显示。

**动态源关卡（Dynamic Source Levels）**

持续关卡以及任何 `IsStatic` 布尔值变量设为false的子关卡。

受游戏影响。在回放时会被隐藏，但是游戏仍然正常运行。

**动态复制关卡（Dynamic Duplicate Levels）**

加载时由动态源关卡生成的复制。不存在于专门的服务器或者编辑器模式中。

在游戏时隐藏。回访会在这些关卡中播放，然后关卡便清空。

从窗口菜单中激活关卡视图，高光选中你的子关卡后点击关卡详情按钮便可以找到 "Is Static" 设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9915445-39e3-4f27-8f21-7f3f24ab3b4c/sublevel.png)

然后，关卡详情窗口中可以找到 "Is Static" 选项。若选中持续关卡，该窗口将会是空白，所以确保要选中子关卡。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e914c0b5-6fd8-45ec-b012-2af0034a24cd/isstatic.png)

这些关卡分组是关卡流送过程的一部分，与回放系统并无特定的联系。

考虑到这个系统，我们可以为动态源关卡和动态复制关卡各自创建一个 `DemoNetDriver` 。这样我们可以在动态源关卡录制游戏回放然后在动态复制关卡播放录制的数据。 在播放回放时隐藏动态源关卡显示动态复制关卡，游戏可以继续运行并且接收网络更新，不受回放影响。第三个组，静态关卡，可以在任何时候保持激活并可视；这些关卡包括静态的世界几何体或者不受游戏影响的背景环境音效、粒子和动画，所以不需要参与回放过程。回放结束时，动态复制关卡中的内容将会被摧毁并清理，而动态源关卡会重新激活。由于动态源关卡永远不会被摧毁或挂起，只会被隐藏，游戏自然会在播放回放的时候正常运行，并且可以立即没有卡顿地显示出来。而且，该系统让开发者可以将关卡标记为静态，从而将其从回放录制和播放中排除，节约了内存和时间，更加的高效。

## HTTP流送器

HTTP流送器将回放数据发送至另一个服务器，可以是LAN也可以是互联网上的其它地方。这对于实时流送的匹配或者保留随时可以观看的匹配录制非常有用。该流送器尤其适用于使用专用服务器的游戏，只有服务器随时都知道游戏中任何地点发生的任何事情，减轻处理回放数据的工作负荷可以让单个服务器上运行更多的游戏。它还可以用作监视或者作弊检测工具，因为可以从运行游戏的一方完全控制的电脑上获取数据。

### HTTP流送器使用详情

HTTP流送器会通过[HTTP流送REST API](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine)与自定义编写的回放服务器沟通，使用GET和POST方法来将数据作为二进制文件或者JSON格式的字符串发送。要设立你自己的回放服务器，需要先建立你的URL。你的项目DefaultEngine.Ini文件包含了回放服务器的URL，位于 `[HttpNetworkReplayStreaming]` 分段，变量为 `ServerURL` 。 `ServerURL` 的格式应该为 "http://replay.yourgame.com/"。末尾的 "/" 非常重要，因为HTTP流送器不会认为它应该更改URL的格式。

-   [replays](https://dev.epicgames.com/community/search?query=replays)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [DemoNetDriver功能](/documentation/zh-cn/unreal-engine/demonetdriver-and-streamers-in-unreal-engine#demonetdriver%E5%8A%9F%E8%83%BD)
-   [回放数据格式](/documentation/zh-cn/unreal-engine/demonetdriver-and-streamers-in-unreal-engine#%E5%9B%9E%E6%94%BE%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F)
-   [本地文件流送器](/documentation/zh-cn/unreal-engine/demonetdriver-and-streamers-in-unreal-engine#%E6%9C%AC%E5%9C%B0%E6%96%87%E4%BB%B6%E6%B5%81%E9%80%81%E5%99%A8)
-   [保存游戏回放流送器](/documentation/zh-cn/unreal-engine/demonetdriver-and-streamers-in-unreal-engine#%E4%BF%9D%E5%AD%98%E6%B8%B8%E6%88%8F%E5%9B%9E%E6%94%BE%E6%B5%81%E9%80%81%E5%99%A8)
-   [空流送器](/documentation/zh-cn/unreal-engine/demonetdriver-and-streamers-in-unreal-engine#%E7%A9%BA%E6%B5%81%E9%80%81%E5%99%A8)
-   [内存流送器](/documentation/zh-cn/unreal-engine/demonetdriver-and-streamers-in-unreal-engine#%E5%86%85%E5%AD%98%E6%B5%81%E9%80%81%E5%99%A8)
-   [内存流送器使用细节](/documentation/zh-cn/unreal-engine/demonetdriver-and-streamers-in-unreal-engine#%E5%86%85%E5%AD%98%E6%B5%81%E9%80%81%E5%99%A8%E4%BD%BF%E7%94%A8%E7%BB%86%E8%8A%82)
-   [HTTP流送器](/documentation/zh-cn/unreal-engine/demonetdriver-and-streamers-in-unreal-engine#http%E6%B5%81%E9%80%81%E5%99%A8)
-   [HTTP流送器使用详情](/documentation/zh-cn/unreal-engine/demonetdriver-and-streamers-in-unreal-engine#http%E6%B5%81%E9%80%81%E5%99%A8%E4%BD%BF%E7%94%A8%E8%AF%A6%E6%83%85)