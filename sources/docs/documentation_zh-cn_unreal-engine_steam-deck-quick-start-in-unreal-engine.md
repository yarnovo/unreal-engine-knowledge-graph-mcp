# 用虚幻引擎为Steam Deck开发的快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/steam-deck-quick-start-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:41:59.073Z

---

目录

![Steam Deck快速入门指南](https://dev.epicgames.com/community/api/documentation/image/df224893-c6fd-4892-8905-ac0b0296e9e4?resizing_type=fill&width=1920&height=335)

本快速入门指南介绍如何构建并在Valve Steam Deck上运行一个虚幻引擎项目。

完成本指南后，你将学会：

-   将Steam Deck匹配至你的开发系统。
    
-   将Steam Deck设备添加至虚幻引擎。
    
-   在Steam Deck上运行一个虚幻引擎项目。
    

虚幻引擎目前支持从Windows编辑器部署至Steam Deck。

需求：

为Steam deck构建虚幻引擎项目需要：

-   一部Steam Deck
    
-   [SteamOS开发者套件客户端](https://partner.steamgames.com/doc/steamdeck/loadgames)
    

## 初始Steam Deck设置

配对你的Steam Deck之前，确保其系统软件已经是最新，在Steam Deck上找到 **Steam > 设置（Settings）> 系统（System） > 软件更新（Software Updates）**。

## 初始配对设置

在部署你的项目之前，你需要将你的Steam Deck和开发设备进行配对。

1.  安装[SteamOS开发者套件客户端](https://partner.steamgames.com/doc/steamdeck/loadgames)并在开发设备上打开。
    
2.  确保你的Steam Deck和开发设备连接至同一个网络。
    
3.  连接后，在你的Steam Deck上找到 **Steam > 系统（System） > 网络设置（Network Settings）** 然后记下Steam Deck的IP地址。
    
4.  在Steam Deck上，找到 **设置（Settings） > 系统（System）** 并在系统设置部分选择 **启用开发（Enable Development）** **模式（Mode）**。
    
5.  在你的Steam Deck上，找到 **设置（Settings） > 开发者（Developer）** 然后在 **开发套件（Development Kit）** 部分下选择 **配对新主机（Pair New Host）** 来开始配对。
    
6.  在SteamOS开发者套件客户端中，找到 **开发者套件（Devkit）** 选项卡，在 **通过IP连接至Steam Deck（Connect to Steam Deck by IP）** 中输入Steam Deck的IP，然后点击 **连接（Connect）**。 ![SteamOS开发者套件界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08614339-2309-4ade-87b5-d4230e040707/steam-deck-quick-start-connect-by-ip.png)
    
7.  在你的Steam Deck上，通过来自你的电脑的配对请求，完成配对。
    

## 将Steam Deck设备添加至虚幻编辑器

完成配对你的设备之后，你需要更新一个Engine.ini文件来将Steam Deck添加至虚幻编辑器。

1.  在文本编辑器中打开任意 `Engine.ini` 文件，（比如 `Engine/Config/BaseEngine.ini`）。
    
2.  打开 `Engine.ini` 文件后，每连接一个Steam Deck就添加一行，如下面格式：
    

Engine.ini示例

```cpp
	[SteamDeck]
	+SteamDeckDevice=(IpAddr=192.168.0.10,Name=MySteamDeck,UserName=deck)
```

-   **IpAddr （必需）** - 你的Steam Deck的IP地址
-   **Name （可选）** - 为该Steam Deck命名，用于在虚幻引擎中显示
-   **Username （必需）** - 对于连接至虚幻引擎的Steam Deck，Username必须为 'deck' 。

编辑好 `Engine.ini` 文件后，重启虚幻编辑器。你可以在 **平台（Platforms）** 菜单中找到你的Steam Deck。

![虚幻编辑器的平台选择菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d4450e5-53b5-4ff9-8564-61cac85f2e82/steam-deck-quick-start-platform-selection.png)

要在Steam Deck上启动你的虚幻引擎项目，前往 **平台（Platforms）** 菜单，找到并选择你的Steam Deck。然后虚幻引擎会在Steam Deck上启动你的项目。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [steamdeck](https://dev.epicgames.com/community/search?query=steamdeck)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [初始Steam Deck设置](/documentation/zh-cn/unreal-engine/steam-deck-quick-start-in-unreal-engine#%E5%88%9D%E5%A7%8Bsteamdeck%E8%AE%BE%E7%BD%AE)
-   [初始配对设置](/documentation/zh-cn/unreal-engine/steam-deck-quick-start-in-unreal-engine#%E5%88%9D%E5%A7%8B%E9%85%8D%E5%AF%B9%E8%AE%BE%E7%BD%AE)
-   [将Steam Deck设备添加至虚幻编辑器](/documentation/zh-cn/unreal-engine/steam-deck-quick-start-in-unreal-engine#%E5%B0%86steamdeck%E8%AE%BE%E5%A4%87%E6%B7%BB%E5%8A%A0%E8%87%B3%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8)