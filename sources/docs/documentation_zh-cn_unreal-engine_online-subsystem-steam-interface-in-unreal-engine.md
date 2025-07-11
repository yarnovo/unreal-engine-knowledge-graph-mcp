# 虚幻引擎Steam在线子系统接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:21.203Z

---

目录

![Steam在线子系统](https://dev.epicgames.com/community/api/documentation/image/978c521f-cb99-4d25-8af0-cff0859fab66?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

贡献来源：Valve

**Steam在线子系统API** 使你可以将虚幻引擎（UE）应用程序发布到[Valve的Steam平台](https://partner.steamgames.com/)。 **Steam** 模块的主要目的是帮助你通过一组功能（如媒介和通栏广告）将应用程序分发给Steam用户。 此外，Steam模块实现多个由[Online Subsystem](/documentation/zh-cn/unreal-engine/online-subsystem-in-unreal-engine)公开的接口，支持Steamworks Software Development Kit（SDK）提供的大多数功能。

部分可用的Steam接口包括：

-   Matchmaking（Lobbies和GameServer API）
-   Leaderboards
-   Achievements
-   Voice
-   UserCloud
-   SharedCloud
-   External UI

请参考[Steam在线子系统API参考](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystemSteam/FOnlineSubsystemSteam)以了解当前可用的Steam接口的更完整列表。

## 满足Valve的要求

Steam子系统需要通过[Valve Steamworks](https://partner.steamgames.com/?goto=%2Fhome)进行额外设置。 请联系[Valve](http://www.valvesoftware.com/contact/)并参考[Steamworks SDK文档](https://partner.steamgames.com/doc/home)以确保你的应用程序满足Valve的要求，然后再尝试将Steam与UE一起使用。

## 下载Steamworks

如果你的应用程序满足Valve的要求，请继续并下载最新版[Steamworks SDK](https://partner.steamgames.com/)。 下载完需要的SDK后，将其解压并复制到`../Engine/Source/ThirdParty/Steamworks/Steam<VERSION>/sdk`， 其中的 `<VERSION>` 为SDK的版本号。例如，如果你使用的是Steamworks Version 1.53，则 `<VERSION>` 为 `v153`。

如果要更新项目的Steamworks SDK，请确保更新项目目录的 `Steamworks.build.cs` 文件中的 `SteamVersionNumber`。更新此值还将更新Steamworks SDK的路径，以便虚幻引擎使用正确的SDK版本。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7ea5324-778d-499d-ae23-2a983d3ee176/steamworks-build.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7ea5324-778d-499d-ae23-2a983d3ee176/steamworks-build.png)

点击查看大图

## 设置Steamworks SDK

对预编译版本引擎使用Steam应只需要将部分动态链接库从Valve SDK复制到相应的文件夹。如果你想要根据源代码重新编译引擎，还需要将SDK放在合适的位置。现在，将相关的可重新分发文件从SDK `istributable_bin/`目录复制到以下位置：

部分64位库位于Steam客户端目录中（在编写本文时，Valve没有将所有库包含在SDK中）。

`/YourUnrealEnginePath/Engine/Binaries/ThirdParty/Steamworks/Steam[Current Version]/Win64` *`steam_api64.dll`* `steamclient64.dll` *`tier0_s64.dll`* `vstdlib_s64.dll`

`/YourUnrealEnginePath/Engine/Binaries/ThirdParty/Steamworks/Steam[Current Version]/Win32` *`steam_api.dll`* `steamclient.dll` *`tier0_s.dll`* `vstdlib_s.dll`

只有在显式链接不允许为专用服务器版本使用 "-force\_steamclient\_link" 标签时，才会需要 `tier0_s.dll` 和 `vstdlib_s.dll` 文件。客户端版本永远不会需要这些文件。

在UE 4.22及更早版本中： `/YourUnrealEnginePath/EngineOrGameFolder/Binaries/Mac/YourGame.app/Contents/MacOS` *`libsteam_api.dylib` (from `/redistributable_bin/osx32` - the [dynamic library](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/DynamicLibraries/000-Introduction/Introduction.html#//apple_ref/doc/uid/TP40001908-SW1) (*.dylib) has both 32 and 64 bit support)

从UE 4.23版本开始，Mac用户还必须运行以下命令： `/YourUnrealEnginePath/Engine/Binaries/ThirdParty/Steamworks/Steam[Current Version]/Mac/` \* `libsteam_api.dylib`, generated by running the following command:

install\_name\_tool -id @rpath/libsteam\_api.dylib /redistributable\_bin/osx32/libsteam\_api.dylib

Linux用户必须随可执行文件一起链接并分发以下文件。

`/YourUnrealEnginePath/Engine/Binaries/ThirdParty/Steamworks/Steam[Current Version]/i686-unknown-linux-gnu/libsteam_api.so` \* redistibutable\_bin/linux32/libsteam\_api.so

`/YourUnrealEnginePath/Engine/Binaries/ThirdParty/Steamworks/Steam[Current Version]/x86_64-unknown-linux-gnu/libsteam_api.so` \* redistibutable\_bin/linux64/libsteam\_api.so

## Steam应用ID

所有使用Steam在线子系统的游戏都必须有有效的应用程序ID，因为如果Steamworks API不知道你应用程序的Steam应用ID，就无法初始化。 在初始化Steam之前，UE将生成 `steam_appid.txt`（在正常关闭引擎时，UE会删除这个文件）。 需要注意的是， `steam_appid.txt` 必须位于应用程序可执行文件所在的目录，因为Steam将在当前工作目录寻找这个文本文件。 此外，该文件不应包含在任何Steam映像中。

如果你打开 `steam_appid.txt`，将会看到 **SteamDevAppId** 条目，这个字段向Steam暗示应用程序ID。 这样就无需使用Steam客户端（尽管它必须运行）启动游戏。

如果想要测试应用程序，可以使用 **SteamDevAppId** `480`，这是所有开发者共享的测试应用ID。 虽然你可以使用之前提到的测试应用ID来测试大都数Steam接口，但应用程序需要有Steam应用ID才能发布。

### 发布构建版

在发布构建版时，引擎会检查以确保登录用户正确订阅了游戏，如果引擎测试返回false，则会关闭（这是帮助保护游戏的一种方式）。 此外，使用Steam DRM（请参阅Steamworks SDK）应进一步保护游戏不被篡改。

## 配置应用程序设置

如果你使用 **虚幻项目浏览器** 创建新项目，那么 `DefaultEngine.ini` 中应该没有 **Online Subsystem** 设置；但如果你要修改我们的某个样本项目，则 **Online Subsystem** 设置可能已经存在。

现在，你已经为应用程序设置了Steamworks SDK（同时设置Steam应用ID），便已准备好了配置应用程序设置以使用Steam在线子系统。

### 步骤

1.  打开项目的 `DefaultEngine.ini` 文件，并添加以下设置：
    
    ```cpp
            [/Script/Engine.GameEngine]
            +NetDriverDefinitions=(DefName="GameNetDriver",DriverClassName="OnlineSubsystemSteam.SteamNetDriver",DriverClassNameFallback="OnlineSubsystemUtils.IpNetDriver")
    ```
    
    **NetDriverDefinitions** 描述了可供UE使用的网络驱动器，并添加了以下属性：
    
    -   **DefName** 是该网络驱动器定义的唯一名称。
    -   **DriverClassName** 是主网络驱动器的类名称。
    -   **DriverClassNameFallBack** 是退却网络驱动器的类名（如果主网络驱动器类初始化失败）。
2.  为了告诉UE使用Online Subsystem Steam，添加以下设置：
    
    ```cpp
          [OnlineSubsystem]
          DefaultPlatformService=Steam
    ```
    
3.  现在，你已经告诉UE，你希望应用程序使用SSteam在线子系统，接下来需要添加以下设置来配置 **OnlineSubsystemSteam** 模块：
    
    ```cpp
          [OnlineSubsystemSteam]
          bEnabled=true
          SteamDevAppId=480
    ```
    
4.  最后，需要为应用程序连接在网络驱动器中指定Steam类：
    
    ```cpp
          [/Script/OnlineSubsystemSteam.SteamNetDriver]
          NetConnectionClassName="OnlineSubsystemSteam.SteamNetConnection"
    ```
    

之后，接下来的步骤取决于你的游戏使用的是 **会话（Sessions）** 还是 **大厅（Lobbies）**。

### 使用会话

如果你在游戏中使用会话，请在 `OnlineSubsystemSteam` 添加以下内容：

```cpp
	bInitServerOnClient=true
```

如果你使用的是大厅，则无需设置该值：

你需要启用 `bInitServerOnClient` 设置，以便用户能够创建和加入会话。如果不启用该设置，Steam的在线子系统将无法成功初始化。创建会话（Create Session）蓝图节点和相应的C++函数将无法工作，导致你无法加入会话。

### 最终结果

在本简短指南结束后，你的应用程序 `DefaultEngine.ini` 文件应类似于以下设置块。如果你想查看其他项目是如何设置的并使用在线子系统，请参考我们的样本项目库。

#### 完成的设置

**DefaultEngine.ini**

```cpp
	[/Script/Engine.GameEngine]
	+NetDriverDefinitions=(DefName="GameNetDriver",DriverClassName="OnlineSubsystemSteam.SteamNetDriver",DriverClassNameFallback="OnlineSubsystemUtils.IpNetDriver")

	[OnlineSubsystem]
	DefaultPlatformService=Steam

	[OnlineSubsystemSteam]
	bEnabled=true
	SteamDevAppId=480

	; If using Sessions
	; bInitServerOnClient=true

	[/Script/OnlineSubsystemSteam.SteamNetDriver]
	NetConnectionClassName="OnlineSubsystemSteam.SteamNetConnection"
```

## 服务器和大厅

Steam支持利用大厅进行点对点匹配（专用和聆听服务器游戏），并提供运行专用服务器的功能。利用大厅，用户可获悉游戏服务器的相关信息，且大厅常用于传达聆听服务器游戏的相关游戏特定信息（如正在游玩的地图或模式等）。通过匹配系统，用户还可在无需加入游戏时看到连接到大厅的用户数量。专用服务器是与大厅不同的的二进制，其任务是运行并主持游戏的服务器端部分。欲了解Steam的功能、实现或开发者界面的更多相关信息，请参阅Steam网站上的[合作伙伴文档](https://partner.steamgames.com/doc/home)。

### 大厅细节

大厅实质上是Steam的后端服务上的聊天室，作为点对点实例存在。与服务器不同，在加入前无法获得如ping时或当前其他用户数等大厅相关信息。其通常用于聆听服务器。要设置大厅，将 `bUsesPresence` 和 `bUseLobbiesIfAvailable` 标志设为 `true`。 你可以在传递给 `IOnlineSession::CreateSession` 方法的 `FOnlineSessionSettings` 对象中设置。

### 服务器细节

要设置服务器实例，将 `bUsesPresence` 标为 `false`。专用服务器需要以下三种宏，均须与合作伙伴面板（位于Steam专用服务器工具页面）上的值匹配。如此类值不匹配，Steam网络将不显示专用服务器：

UE宏

Steam命名

说明

`UE_PROJECT_STEAMPRODUCTNAME`

`STEAMPRODUCTNAME`

Valve建议将此设为版本ID，通常使用AppID（字符串形式）或无额外符号的简略产品名。

更改此字段（如更新版本ID）将导致Steam在匹配时忽略使用旧命名的所有活跃服务器，且需在合作伙伴后端修改工具信息。

`UE_PROJECT_STEAMGAMEDIR`

`STEAMGAMEDIR`

此通常为游戏的文件夹命名，且无可包含空格或符号。若该命名未包含空格或符号，则无需将其设为文件夹命名。

`UE_PROJECT_STEAMGAMEDESC`

`STEAMGAMEDESC`

Valve建议将此宏设为产品全名。

`UE_PROJECT_STEAMSHIPPINGID`

N/A

要以UE 4.22和以上版本，在在Steam以外启动，此宏须包含产品的Steam ID。

在UE 4.22版中，可在游戏的 `Target.cs` 文件中指定此类值。同时还可通过定义 `UE_PROJECT_STEAMSHIPPINGID`，将Steam ID写入版本。所有版本配置均需进行此操作，否则将无法在Steam外启动。

对于4.22之前的版本，编辑 `OnlineSessionAsyncServerSteam.cpp`，以便其包含游戏的值。

欲了解分发专用服务器版本的相关信息，参阅[Steam的合作伙伴文档](https://partner.steamgames.com/doc/sdk/uploading/distributing_gs)。

## Steam在线验证

Steam使用一种特殊的验证系统，用于控制对平台提供的部分独特服务器相关功能的访问，如广告服务器和玩家计数、检索禁令列表和做出反应（发行商和Valve反作弊禁令）和执行许可证检查。 虚幻引擎允许通过 `FOnlineAuthSteam` 类与这个功能连接。 应用程序设置为使用Steam在线子系统后，就可以启用 **SteamAuth** 包处理程序组件来利用这些功能。

### 启用SteamAuth

要启用SteamAuth，并将以下内容添加到"DefaultEngine.ini"或者针对每一个打算支持Steam在线验证的平台，添加到特定于平台的引擎.ini文件（如"WindowsEngine.ini"、"LinuxEngine.ini"或"MacEngine.ini"）：

```cpp
	[PacketHandlerComponents]
	+Components=OnlineSubsystemSteam.SteamAuthComponentModuleInterface
```

启用后，就可以使用Steam Online Subsystem接口（SteamOSS）功能 `GetAuthInterface` 来访问SteamAuth功能。

启用SteamAuth将会使应用程序对所有加入的玩家运行验证程序（针对Steam服务）。默认情况下，SteamAuth将没有通过这项检查的玩家踢出游戏，但这个行为可以被覆盖。

### SteamAuth委托

SteamAuth系统中有两个开发者可能希望覆盖的委托：`OverrideFailureDelegate` 和 `OnAuthenticationResultDelegate`。

当玩家尝试加入服务器而没有通过Steam验证时，或者玩家在会话期间失去了Steam验证，通过玩家的 `FUniqueNetId` 调用 `OverrideFailureDelegate`。 默认情况下，SteamAuth会将玩家踢出游戏。 但是，如果该委托受到约束，则默认行为将被暂停，因此开发者必须在仍需要这个行为时手动将玩家踢出。

`OnAuthenticationResultDelegate` 处理来自Steam验证服务的响应，提供玩家的 `FUniqueNetId` 和一个指示验证尝试是否成功的布尔值。

## 附加提示

### 使用IPNetDriver

UE的Steam OSS默认将Steam网络用作默认套接字子系统。在4.22版中，可通过将 `OnlineSubsystemSteam.bUseSteamNetworking` 设为 `false` 禁用此行为。要进行此操作，请将以下代码添加到"DefaultEngine.ini"，或者各支持平台的平台特定引擎.ini文件（如"WindowsEngine.ini"、"LinuxEngine.ini"或"MacEngine.ini"）：

```cpp
	[OnlineSubsystemSteam]
	bUseSteamNetworking=false
```

在4.22之前的版本中，修改调用 `RegisterSocketSubsystem` 函数的 `SocketSubsystemSteam.cpp`，将 `布尔` 参数改为 `false`。同时还需在项目配置文件中修改网络驱动。

### 模块设置

确保将虚幻引擎Steam模块作为项目的一部分包含进去（请参阅[UnrealBuildTool目标文件](/documentation/zh-cn/unreal-engine/unreal-engine-build-tool-target-reference)以获取更多帮助）。 具体而言，在`mygame.build.cs`的构造函数中添加以下行应足以确保随着游戏构建Steam模块。

```cpp
	DynamicallyLoadedModuleNames.Add("OnlineSubsystemSteam");
```

### Mac上的Steam覆层

Mac上的Steam覆层要求通过Steam客户端启动游戏。为此，需要先使用Steam"游戏"菜单中的"将非Steam游戏添加到我的库"选项来将游戏添加到库。

-   [steam](https://dev.epicgames.com/community/search?query=steam)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online subsystem](https://dev.epicgames.com/community/search?query=online%20subsystem)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [满足Valve的要求](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E6%BB%A1%E8%B6%B3valve%E7%9A%84%E8%A6%81%E6%B1%82)
-   [下载Steamworks](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E4%B8%8B%E8%BD%BDsteamworks)
-   [设置Steamworks SDK](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E8%AE%BE%E7%BD%AEsteamworkssdk)
-   [Steam应用ID](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#steam%E5%BA%94%E7%94%A8id)
-   [发布构建版](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E5%8F%91%E5%B8%83%E6%9E%84%E5%BB%BA%E7%89%88)
-   [配置应用程序设置](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E9%85%8D%E7%BD%AE%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E8%AE%BE%E7%BD%AE)
-   [步骤](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [使用会话](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%BC%9A%E8%AF%9D)
-   [最终结果](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [完成的设置](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E5%AE%8C%E6%88%90%E7%9A%84%E8%AE%BE%E7%BD%AE)
-   [服务器和大厅](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%92%8C%E5%A4%A7%E5%8E%85)
-   [大厅细节](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E5%A4%A7%E5%8E%85%E7%BB%86%E8%8A%82)
-   [服务器细节](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E6%9C%8D%E5%8A%A1%E5%99%A8%E7%BB%86%E8%8A%82)
-   [Steam在线验证](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#steam%E5%9C%A8%E7%BA%BF%E9%AA%8C%E8%AF%81)
-   [启用SteamAuth](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E5%90%AF%E7%94%A8steamauth)
-   [SteamAuth委托](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#steamauth%E5%A7%94%E6%89%98)
-   [附加提示](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E9%99%84%E5%8A%A0%E6%8F%90%E7%A4%BA)
-   [使用IPNetDriver](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E4%BD%BF%E7%94%A8ipnetdriver)
-   [模块设置](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#%E6%A8%A1%E5%9D%97%E8%AE%BE%E7%BD%AE)
-   [Mac上的Steam覆层](/documentation/zh-cn/unreal-engine/online-subsystem-steam-interface-in-unreal-engine#mac%E4%B8%8A%E7%9A%84steam%E8%A6%86%E5%B1%82)