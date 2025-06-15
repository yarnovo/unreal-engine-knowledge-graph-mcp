# 测试和调试虚幻引擎网络游戏 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/testing-and-debugging-networked-games-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:57:55.986Z

---

目录

![测试和调试网络游戏](https://dev.epicgames.com/community/api/documentation/image/9b76d17d-4864-49b7-88f6-3a43cd53fcfd?resizing_type=fill&width=1920&height=335)

## 在虚幻编辑器中测试网络选项

**虚幻编辑器** 包含可调整的设置，有助于测试多人游戏项目。这些选项包括设置 **玩家数量（Number Of Players）**、运行多个 **运行窗口（Play windows）** 和运行 **专用服务器（Dedicated Server）**。

要查看这些设置，请启动 **编辑器（Editor）** 并找到 **工具栏（Toolbar）**，然后选择 **运行（Play）** 按钮旁边的 **模式（Modes）** 下拉箭头。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c86f88a-6032-4384-941e-2b2718986f3f/image_0.png)

有关在编辑器中调整多人游戏设置的更多详细信息，请参阅[测试多人游戏](/documentation/zh-cn/unreal-engine/testing-multiplayer-in-unreal-engine)

## 启动专用服务器

你还可以使用其他方法启动多人游戏。按照以下步骤启动单独的专用服务器实例。

1.  你可以从 **模式（Modes）** 下拉箭头中选择 **高级设置（Advanced Settings）**，或者找到 **编辑器偏好设置（Editor Preferences）** > **关卡编辑器（Level Editor）** > **运行（Play）> 多人游戏选项（Multiplayer Options）**。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0f66fb4-0eb6-4635-b2c9-24c74e02740b/image_1.png)

1.  从 **多人游戏选项（Multiplayer Options）类别**，找到 **启动独立服务器（Launch Independent Server）** 变量，然后点击该框，将其布尔值设为 **true**。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc1c6582-b569-405a-b75c-ec693eb16878/image_2.png)

1.  点击 **运行网络模式（Play Net Mode）** 变量旁边的下拉菜单，然后选择 **单机游戏（Play Standalone）**。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be368e86-4284-420f-9dc6-b1ad946067e1/image_3.png)

这样将创建新的服务器实例，但是，其他实例不会自动与它连接。

## 连接到独立服务器实例

你可以使用以下命令将 **独立实例** 连接到 **服务器**：

```cpp
open 127.0.0.1:<port number>
```

你也可以使用[会话接口](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine)。这样会创建在服务器上运行的游戏实例，其他客户端可以发现并加入该实例。这对于测试项目的连接流很有用。

如果 **运行网络模式（Play Net Mode）** 变量设置为 **作为客户端运行（Play as Client）**，则不需要启用 **启动独立服务器（Launch Independent Server）** 变量，因为启动专用服务器实例不需要它。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c37c664-434c-4400-a1cb-ea4f4b32c2e1/image_4.png)

在编辑器的 **网络模式选项（Net Mode options）** 中使用 **作为客户端运行（Play as Client）** 或 **作为侦听服务器运行（Play As Listen Server）** 时，这些实例会自动通过IP地址直接相互连接。这相当于在 **客户端** 上运行 `open 127.0.0.1:17777` 命令，以便连接到 **服务器**。

此连接过程不 使用 **会话接口**，因此，服务器不会创建在线多人会话，客户端不会搜索并加入此会话。对于大多数Gameplay测试目的，这不会有很大区别。但是，某些依赖会话接口的在线功能（例如语音聊天）将不可用。

如果启用 **在一个进程下运行（Run Under One Process）** 变量旁边的方框，则所有客户端和服务器实例将作为编辑器共享相同的 **函数更新率**。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be403bef-58d5-436d-afec-5e7bfc9b3020/image_5.png)

这与单独运行这些实例不同。例如，在 **独立模式** 中，你可以使用BaseEngine.ini文件中的NetServerMaxTickRate config配置值来控制服务器的函数更新率。

```cpp
[/Script/OnlineSubsystemUtils.IpNetDriver]
NetServerMaxTickRate=30
```

这可能会影响某些使用函数更新率的行为，例如计算单个网络更新的带宽限制。

使用在编辑器中运行（PIE）时，[服务器/客户端移动](/documentation/zh-cn/unreal-engine/travelling-in-multiplayer-in-unreal-engine)等功能存在限制。你的项目需要在独立模式下作为编辑器之外的单独进程运行，以便测试这些功能。

如果你在单独的进程下运行实例，一个实例将被视为在编辑器中运行，而其他实例将被视为独立运行。与统一运行实例相比，不论是统一在编辑器中运行还是统一独立运行，单独运行可能会导致不同的行为。例如，需要调用UEditorEngine::NetworkRemapPath函数，以便在其路径通过网络发送的静态Actor上添加或删除PIE前缀。

## 调试多个客户端和服务器实例

运行多个客户端和服务器实例具有独特的挑战，尤其是不容易知道要附加到哪个实例。你可以使用断点来帮助调试PIE实例，从而缓解这些挑战。

在你的代码编辑器中，你可以将以下变量添加到你的 **观察（Watch）** 窗口。

观察变量

用途

UE4Editor-Engine!GPlayInEditorContextString

确定你当前正在逐步执行的实例。

NetDriver's ServerConnection

在客户端上，这将保存对服务器的NetConnection的引用。在服务器上，该值将为Null，允许你在调试复制系统时快速检查你所在的实例。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc6d3029-963c-4957-8968-f8d44067cff7/image_6.png)

此外，你可以调用观察中的GetLocalRole()函数或者直接在代码中调用它，从而检查Actor的[角色](/documentation/zh-cn/unreal-engine/actor-role-and-remote-role-in-unreal-engine)属性。GetLocalRole函数将返回实例对该Actor的控制程度。如果你在复制Actor中调试问题，那么它将返回三个角色之一：

角色

说明

ROLE\_Authority

存在于服务器实例上的Actor。

ROLE\_AutonomousProxy

此Actor是此客户端实例上的本地PlayerController拥有的角色或Pawn。

ROLE\_SimulatedProxy

存在于客户端实例上的Actor。

## 分析网络游戏

你可以使用[Networking Insights](/documentation/zh-cn/unreal-engine/networking-insights-in-unreal-engine)分析联网游戏。这是 **Unreal Insights** 分析工具的组件，可提供详细信息，帮助分析、调试和优化项目的网络流量。

该工具的 **数据包概述面板（Packet Overview Panel）** 中的每一列将对应一个数据包，**数据包内容面板（Packet Content Panel）** 将提供对所选数据包中每个元素的全面信息，包括有关内容、偏移量、大小等的数据。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47827df9-9cb9-4fe3-a68e-b5e9a244ab21/image_7.jpg)

将鼠标悬停在数据包上会显示信息

**网络统计数据（Net Stats）** 面板将提供有关网络追踪事件的信息，例如事件的计数和总计/最大包含大小（以位为单位），并且这些事件会根据事件起源的位置形成级别。你可以找到有关如何设置和使用[Networking Insights](/documentation/zh-cn/unreal-engine/networking-insights-in-unreal-engine)的更多信息。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3ab3a5b-c365-4128-b5f7-b7f1728bc6f1/image_8.jpg)

事件按级别分组的网络统计数据面板

虚幻引擎还包括[Network Profiler](/documentation/zh-cn/unreal-engine/using-the-network-profiler-in-unreal-engine)，这是一个传统工具，可提供项目网络流量的不同视图。虽然Network Profiler提供的信息不如Networking Insights提供的信息详细，但它仍然可以提供有关游戏带宽使用情况的简要概览以及单个Actor、属性或RPC的统计数据。

## Gauntlet自动化框架

[Gauntlet自动化框架](/documentation/zh-cn/unreal-engine/gauntlet-automation-framework-in-unreal-engine)支持启动多个会话，例如服务器和客户端，它可以成为测试和验证多人游戏项目的宝贵工具。

ShooterGame项目中有使用Gauntlet进行多人游戏的自动化脚本的示例实现。它包含ShooterGame自动化C#（用于驱动测试，位于 `/Build/Scripts` 文件夹）以及项目的本机测试控制器代码（位于 `/Source/ShooterGame/Private` 和 `Public/Tests` 目录）。

## 功能测试

UE具有通过[关卡蓝图](/documentation/404)设置和运行[功能测试](/documentation/404)的能力。 你的功能测试最初需要在项目的单个实例上运行。之后，你可以在多人游戏项目中运行这些测试。你可以在客户端实例、专用服务器或侦听服务器实例中启动包含测试的关卡。

当前不支持设置跨多个实例（例如客户端和服务器同时）运行的功能测试。所需功能 **不会** 运行的示例场景：如果服务器将复制属性设置为新值，则客户端会检查是否收到了这个新的复制值。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在虚幻编辑器中测试网络选项](/documentation/zh-cn/unreal-engine/testing-and-debugging-networked-games-in-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%B5%8B%E8%AF%95%E7%BD%91%E7%BB%9C%E9%80%89%E9%A1%B9)
-   [启动专用服务器](/documentation/zh-cn/unreal-engine/testing-and-debugging-networked-games-in-unreal-engine#%E5%90%AF%E5%8A%A8%E4%B8%93%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [连接到独立服务器实例](/documentation/zh-cn/unreal-engine/testing-and-debugging-networked-games-in-unreal-engine#%E8%BF%9E%E6%8E%A5%E5%88%B0%E7%8B%AC%E7%AB%8B%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%9E%E4%BE%8B)
-   [调试多个客户端和服务器实例](/documentation/zh-cn/unreal-engine/testing-and-debugging-networked-games-in-unreal-engine#%E8%B0%83%E8%AF%95%E5%A4%9A%E4%B8%AA%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%92%8C%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%AE%9E%E4%BE%8B)
-   [分析网络游戏](/documentation/zh-cn/unreal-engine/testing-and-debugging-networked-games-in-unreal-engine#%E5%88%86%E6%9E%90%E7%BD%91%E7%BB%9C%E6%B8%B8%E6%88%8F)
-   [Gauntlet自动化框架](/documentation/zh-cn/unreal-engine/testing-and-debugging-networked-games-in-unreal-engine#gauntlet%E8%87%AA%E5%8A%A8%E5%8C%96%E6%A1%86%E6%9E%B6)
-   [功能测试](/documentation/zh-cn/unreal-engine/testing-and-debugging-networked-games-in-unreal-engine#%E5%8A%9F%E8%83%BD%E6%B5%8B%E8%AF%95)