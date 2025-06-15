# 虚幻引擎Steam VR快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:45:28.292Z

---

目录

![SteamVR快速入门](https://dev.epicgames.com/community/api/documentation/image/c52481e1-08f9-4f54-8096-03d290be8a31?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17af551d-df36-4e37-b14b-f64b1fa253da/steamvrht_bannerimage_00.png "SteamVRHT_BannerImage_00.png")

## 目标

SteamVR快速入门将带领您了解如何设置虚幻引擎4(UE4)项目，以便与SteamVR和Vive头戴式显示器(HMD)头戴设备一起使用。

## 目的

-   创建一个新的UE4项目，专门针对SteamVR开发。
    
-   进行必要的项目设置，以便您的项目可以与SteamVR一起使用。
    

## 1 - SteamVR初始设置

在下面部分，我们将介绍如何设置SteamVR，以便它可以与虚幻引擎4（UE4）一起使用。

### 步骤

对于每个SteamVR开发工具包，Valve都提供了[详细说明](http://media.steampowered.com/apps/steamvr/vr_setup.pdf)，向您展示如何正确设置所有内容。如果您还没有阅读此文档，请在进行任何进一步操作之前先阅读此文档，因为下面的信息不能替代Valve创建文档中包含的信息。

1.  确保头戴式显示器（HMD）、Steam控制器、接线盒和Lighthouse基站均已按照Valve提供的[说明](http://media.steampowered.com/apps/steamvr/vr_setup.pdf)拆包、通电、连接和设置。
    
2.  如果您还没有这样做，请确保在您的开发PC上下载并安装[Steam客户端](http://store.steampowered.com/about/)。
    
3.  要安装 **SteamVR** 工具，请使用鼠标悬停在 Steam **库（Library）** 选项上，并从显示的菜单中，选择 **工具（Tools）** 选项。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c5e3d3a-6163-4c4c-8620-d86257b4d36d/t_launch_steamvr_tools.png)
    
4.  进入"工具（Tools）"部分后，使用顶部的搜索栏搜索 **SteamVR**。找到SteamVR后，双击它以下载并安装。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b460dae-406d-4267-9e21-1a89ae1a8024/t_steamtools_software.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b460dae-406d-4267-9e21-1a89ae1a8024/t_steamtools_software.png)
    
    单击显示全图。
    
    您还可以单击位于Steam客户端右上角的 **VR** 图标并按照提供的说明操作，来安装SteamVR。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d22dd666-23bd-4bfa-9dc7-782bb5e85035/t_steamvr_icon_install.png)
    
5.  双击工具（Tools）菜单中的 **SteamVR** 选项，将启动SteamVR工具，如下图所示。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8dc522a-1989-4b7f-850f-665e9cf69df3/t_steam_vr_ready.png)
    
    当SteamVR显示所有设备为绿色时（如上图所示），表示一切都正常运行。如果某个设备显示为灰色，则此设备存在问题。如果您将鼠标悬停在显示为灰色的设备上，SteamVR将告诉您它有什么问题。
    
6.  您必须先设置SteamVR交互区域，之后方可将SteamVR与UE4一起使用。为此，右键单击SteamVR窗口，选择 **运行空间设置（Run Room Setup）**，并按照屏幕上的指示设置SteamVR交互区域。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/586344cb-0fbf-4b7c-a21b-9ec190d0e147/t_steam_vr_app.png)
    

### 最终结果

完成后，即表示您已设置好SteamVR，可以与UE4一起使用了。

## 2 - 设置UE4以配合SteamVR一起使用

在下面部分，我们将介绍如何设置一个新的虚幻引擎4（UE4）项目来与SteamVR一起使用。

### 步骤

如果您尚未进行此操作，请确保运行SteamVR **空间设置（Room Setup）** 来建立和校准VR跟踪区域。否则，可能会导致SteamVR和UE4不能正常配合工作。

1.  使用 **游戏（Games）> 空白（Blank）** 模板新建一个项目，并使用以下设置：

*启用 **蓝图（Blueprint）*** 启用 **可缩放的3D或2D（Scalable 3D or 2D）** *启用 **移动/平板设备（Mobile / Tablet）*** 启用 **不含初学者内容（No Starter Content）**

1.  加载项目后，单击 **运行（Play）** 按钮旁边的小三角形，然后从显示的菜单中选择 **虚拟现实预览（VR Preview）** 选项。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/504218c7-20eb-4dae-8ad0-c9cdfbf18e95/check_vr_working_00.png)

### 最终结果

当虚拟现实预览（VR Preview）启动时，戴上您的HMD，您现在应该看到显示的基本关卡。您应该还能够朝任何方向旋转您的头部，如下方视频中所示。

## 3 - 看你的了！

现在您可以使用SteamVR和HTC Vive查看UE4项目，请尝试将以下项目添加到您的项目中。

-   使用[迁移工具](/documentation/zh-cn/unreal-engine/migrating-assets-in-unreal-engine)将内容从其中一个移动内容示例移到您的项目中以使用。
    
-   添加对[运动控制器](/documentation/zh-cn/unreal-engine/motion-controller-component-setup-in-unreal-engine)的支持，以便用户可以像在现实中一样在VR中移动对象。
    
-   使用[GPU分析器](/documentation/404)帮助您在构建项目时追踪项目的性能。
    

下面有一些额外的资源，它们可以为在虚幻引擎4中开发VR项目提供有用的信息。

### 文档

-   [虚拟现实开发](/documentation/zh-cn/unreal-engine/developing-for-xr-experiences-in-unreal-engine)
    -   [VR速查表](/documentation/zh-cn/unreal-engine/xr-best-practices-in-unreal-engine)
        
    -   [SteamVR最佳实践](/documentation/zh-cn/unreal-engine/xr-best-practices-in-unreal-engine)
        
-   [SteamVR文档](https://support.steampowered.com/kb_article.php)
    -   [用户指南](https://steamcommunity.com/steamvr)
        
    -   [开发者指南](https://steamcommunity.com/steamvr)
        

### 可尝试内容

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47e9db2e-217c-4a56-82c4-cc809c8d402c/store_couchknights_screenshot_3.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a176cf43-cafa-4095-b2cc-694f8a4ee3e4/store_showdown_screenshot_5.png)

CouchKnights

Showdown

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01ba91bd-8c9e-49f1-94fa-70d04e918cfd/store_vreditor_screenshot_5.png)

 

VR模式 

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [steamvr](https://dev.epicgames.com/community/search?query=steamvr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [1 - SteamVR初始设置](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#1-steamvr%E5%88%9D%E5%A7%8B%E8%AE%BE%E7%BD%AE)
-   [步骤](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [2 - 设置UE4以配合SteamVR一起使用](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#2-%E8%AE%BE%E7%BD%AEue4%E4%BB%A5%E9%85%8D%E5%90%88steamvr%E4%B8%80%E8%B5%B7%E4%BD%BF%E7%94%A8)
-   [步骤](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#%E6%AD%A5%E9%AA%A4-2)
-   [最终结果](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-2)
-   [3 - 看你的了！](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#3-%E7%9C%8B%E4%BD%A0%E7%9A%84%E4%BA%86%EF%BC%81)
-   [文档](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#%E6%96%87%E6%A1%A3)
-   [可尝试内容](/documentation/zh-cn/unreal-engine/steamvr-quick-start-in-unreal-engine#%E5%8F%AF%E5%B0%9D%E8%AF%95%E5%86%85%E5%AE%B9)