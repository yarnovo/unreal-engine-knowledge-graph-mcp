# 虚幻引擎中的关卡切换 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/travelling-in-multiplayer-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:56:21.561Z

---

目录

![多人游戏中的关卡切换](https://dev.epicgames.com/community/api/documentation/image/57f7357a-23cc-4918-a595-b137a8e61af8?resizing_type=fill&width=1920&height=335)

## 无缝与非无缝切换

**虚幻引擎（UE）** 中主要有两种转移方式：**无缝** 和 **非无缝方式**。两者的主要区别在于，**无缝** 转移是一种非阻塞（non-blocking）操作，而 **非无缝** 转移则是一种阻塞（blocking）操作。

当客户端执行非无缝转移时，客户端将与服务器断开连接，然后重新连接到同一服务器，而服务器将准备新的地图以供加载。

我们建议虚幻引擎多人模式游戏尽量采用无缝转移。这样做通常可以提供更流畅的体验，同时避免重新连接过程中可能出现的问题。

有三种情形中必然产生非无缝转移：

-   初次加载地图时
-   初次作为客户端连接服务器时
-   想要终止一个多人模式游戏并启动新游戏时

有三个用来驱动转移的主要函数：`UEngine::Browse`、`UWorld::ServerTravel` 和 `APlayerController::ClientTravel`。在确定使用哪个函数时，您可能会感到有些困惑，所以请遵循下面的准则：

### `UEngine::Browse`

-   就像是加载新地图时的硬重置。
-   将始终导致非无缝切换。
    
-   将导致服务器在切换到目标地图前与当前客户端断开连接。
    
-   客户端将与当前服务器断开连接。
    
-   专用服务器无法切换至其他服务器，因此地图必须存储在本地（不能是 URL）。

### `UWorld::ServerTravel`

-   仅适用于服务器。
    
-   会将服务器跳转到新的世界/场景。
    
-   所有连接的客户端都会跟随。
    
-   这就是多人游戏在地图之间转移时所用的方法，而服务器将负责调用此函数。
    
-   服务器将为所有已连接的客户端玩家调用 `APlayerController::ClientTravel`。
    

### `APlayerController::ClientTravel`

-   如果从客户端调用，则转移到新的服务器
    
-   如果从服务器调用，则要求特定客户端转移到新地图（但仍然连接到当前服务器）
    

## 启用无缝切换

要启用无缝切换，您需要设置一个过渡地图。这需要通过 `UGameMapsSettings::TransitionMap` 属性进行配置。该属性默认为空，如果您的游戏保持这一默认状态，就会为过渡地图创建一个空地图。

之所以存在过渡地图，是因为必须始终有一个被加载的世界（用于存放地图），所以在加载新地图之前，我们不能释放原有的地图。由于地图可能会非常大，因此让新旧地图同时存放在存储器内绝对是个坏主意，这时就需要过渡地图来帮忙了。

现在，我们可以从当前地图转移到过渡地图，然后可以从那里转移到最终的地图。由于过渡地图非常小，因此在"中转"当前地图和最终地图时不会造成太大的资源消耗。

设置好过渡地图后，您需要将 `AGameModeBase::bUseSeamlessTravel` 设置为 true，这样就可以实现无缝切换了！

## 无缝切换流程

下面是执行无缝切换时的一般流程：

1.  标记出要在过渡关卡中存留的 actor（更多信息请见下面）
2.  转移到过渡关卡
3.  标记出要在最终关卡中存留的 actor（更多信息请见下面）
4.  转移到最终关卡

## 无缝切换中的存留 Actor

在使用无缝切换时，可以将（存留） actor 从当前关卡带到新的关卡。这适用于一些特定的 actor，如道具栏物品和玩家等。

默认情况下，这些 actor 将自动存留：

-   `GameMode` actor（仅限服务器）
    -   通过 `AGameModeBase::GetSeamlessTravelActorList` 额外添加的任何 actor
-   拥有一个有效的 `PlayerState` （仅限服务器）的所有控制器
-   所有 `PlayerControllers` （仅限服务器）
-   所有本地 `PlayerControllers` （服务器和客户端）
    -   通过 `APlayerController::GetSeamlessTravelActorList` （在本地`PlayerControllers`上调用）额外添加的任何 actor

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [multiplayer](https://dev.epicgames.com/community/search?query=multiplayer)
-   [network](https://dev.epicgames.com/community/search?query=network)
-   [advanced](https://dev.epicgames.com/community/search?query=advanced)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [无缝与非无缝切换](/documentation/zh-cn/unreal-engine/travelling-in-multiplayer-in-unreal-engine#%E6%97%A0%E7%BC%9D%E4%B8%8E%E9%9D%9E%E6%97%A0%E7%BC%9D%E5%88%87%E6%8D%A2)
-   [UEngine::Browse](/documentation/zh-cn/unreal-engine/travelling-in-multiplayer-in-unreal-engine#uengine::browse)
-   [UWorld::ServerTravel](/documentation/zh-cn/unreal-engine/travelling-in-multiplayer-in-unreal-engine#uworld::servertravel)
-   [APlayerController::ClientTravel](/documentation/zh-cn/unreal-engine/travelling-in-multiplayer-in-unreal-engine#aplayercontroller::clienttravel)
-   [启用无缝切换](/documentation/zh-cn/unreal-engine/travelling-in-multiplayer-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%97%A0%E7%BC%9D%E5%88%87%E6%8D%A2)
-   [无缝切换流程](/documentation/zh-cn/unreal-engine/travelling-in-multiplayer-in-unreal-engine#%E6%97%A0%E7%BC%9D%E5%88%87%E6%8D%A2%E6%B5%81%E7%A8%8B)
-   [无缝切换中的存留 Actor](/documentation/zh-cn/unreal-engine/travelling-in-multiplayer-in-unreal-engine#%E6%97%A0%E7%BC%9D%E5%88%87%E6%8D%A2%E4%B8%AD%E7%9A%84%E5%AD%98%E7%95%99actor)

相关文档

[

网络多人游戏基础

![网络多人游戏基础](https://dev.epicgames.com/community/api/documentation/image/ae24446f-9825-4216-b80b-c0edc0287023?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/basics-of-network-multiplayer-in-unreal-engine)

[

Gameplay框架

![Gameplay框架](https://dev.epicgames.com/community/api/documentation/image/ec81a3a1-348f-406d-8475-49f72f933f0f?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine)