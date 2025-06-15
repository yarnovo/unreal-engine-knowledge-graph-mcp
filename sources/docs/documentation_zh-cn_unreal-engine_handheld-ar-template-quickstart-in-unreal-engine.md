# 虚幻引擎手持类AR项目模板快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:30.054Z

---

目录

![手持类AR项目模板快速入门](https://dev.epicgames.com/community/api/documentation/image/70ad8c30-30c2-4d95-9d0f-e6a341fe9add?resizing_type=fill&width=1920&height=335)

手持类AR模板适用于使用UE 4.27或更高版本创建的虚幻引擎项目。此模板为基于Android和iOS设备的增强现实项目提供了一个简易模板，允许你在此基础上进行修改。

本指南将介绍AR模板中的功能，如何在移动设备上打开和操作模板项目，以及如何在虚幻编辑器中找到各项功能，从而创建你自己的手持类AR应用。

## 1\. 用户体验旅程和功能概述

AR模板是一款简单的手持AR应用程序，其中包含的用户体验旅程涵盖以下步骤：

1.  用户打开应用程序。
    
2.  应用程序会提示需要扫描环境。用户必须提供摄像机权限才能继续。
    
3.  用户在提示中点击确认之后，应用程序就会通过用户的摄像机扫描环境，然后将平面添加到环境中来定义虚拟场景。
    
4.  应用程序将提示用户选择要进行交互的平面。
    
5.  用户选择平面之后，就可以在平面上放置虚拟对象。
    
6.  放置虚拟对象之后，用户就可以使用多种平移工具来操控对象。HUD提供多种配置选项，允许获取AR场景快照，并提供重置选项，允许重新选择平面。
    

此模板展示了以下功能：

-   通过简单的状态机来控制应用程序流。
    
-   扫描环境，收集数据，以进行如下操作：
    
    -   定义虚拟场景中的交互式平面。
        
    -   提供光照和场景深度信息。
        
-   使用UMG控件来显示从摄像机捕获的环境。
    
-   在虚拟场景中进行基于触摸屏的交互。
    
    -   操控虚拟对象。
        
    -   选择由用户环境定义的平面。
        
-   使用基于手势的触摸输入来执行不同类型的交互。
    
-   提供基本UI，其中包含针对不同类型应用程序的不同样式选项。
    
-   从充分复合的AR场景中捕获图像，并保存到摄像机图库中。
    

## 2\. 兼容性

设备满足以下要求，手持AR模板即可工作：

-   设备必须受到虚幻引擎的支持。
    
-   设备必须支持ARKit (iOS)或ARCore (Android)。
    

如需当前版本虚幻引擎支持的设备列表，请参阅[iOS设备兼容性](/documentation/404)和[Android设备兼容性](/documentation/404)页面。

如需了解哪些iOS设备支持ARKit，请参阅[Apple开发者ARKit文档](https://developer.apple.com/documentation/arkit/verifying_device_support_and_user_permission)

如需了解哪些Android设备支持ARCore，请参阅[Google开发者AR文档](https://developers.google.com/ar/devices)。

## 3\. 设置模板

要使用AR模板，你首先要以模板为基础创建项目，然后对项目进行设置，以便安装到所需的移动设备上。本小节将引导你完成所需的步骤。

1.  打开 **虚幻编辑器（Unreal Editor）**。在 **选择或创建新项目（Select or Create New Project）** 菜单中，向下滚动到 **新项目类别（New Project Categories）**，然后选择 **游戏（Games）**，然后点击 **下一步（Next）**。

![使用游戏类别创建新项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06b7430f-894c-4b2c-b138-edd3e64c1139/newprojectcategory.png)

AR模板也可以在建筑、工程、施工、汽车、产品设计和制造业中使用。

1.  在 **选择模板（Select Template）** 菜单中，选择 **手持AR（Handheld AR）** 模板。为你的项目选择 **名称（Name）** 和 **位置（Location）**。在此示例中，项目名为 **ARTemplateGame**。完成设置之后，点击 **创建项目（Create Project）**。

![选择手持AR模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49435863-94c0-4160-88a5-ea466a96c354/newprojectartemplate.png)

完成这些步骤之后，项目将在虚幻编辑器中打开，并将 **HandheldARBlankMap** 作为默认地图。

## 4\. 打包并部署到你的设备

要完成项目设置，你需要对项目进行准备，以便打包到你的移动设备。Android和iOS在你的项目设置中均需要不同的设置步骤。

### Android设置

要为Android准备你的手持AR项目，请完成以下步骤：

1.  在你的计算机上安装所需的 **Android Studio** 版本。
    
2.  在你的引擎文件夹中运行 **AndroidSetup** 脚本，确保你的计算机上安装了所需的SDK和NDK组件。根据你的操作系统，你可能需要重新启动计算机才能使更改生效。
    
3.  在你的 **项目设置（Project Settings）** 中，找到Android设置并点击APK打包下的 **立即配置（Configure Now）** 按钮，以便针对Android平台配置你的项目。如果你尚未接受Android SDK许可证，那么还需要点击 **接受SDK许可证（Accept SDK License）** 按钮。
    
4.  将你的设备设置为 **开发人员模式（Developer Mode）**，并且接受与你的计算机进行USB连接。
    

你可以在[Android设置小节](/documentation/zh-cn/unreal-engine/getting-started-and-setup-for-android-projects-in-unreal-engine)中找到这些步骤的详细信息。

### iOS设置

要为iOS准备你的手持AR项目，请完成以下步骤：

1.  在你的Mac上安装最新版本的 **Xcode**。
    
2.  从Apple开发人员门户上获取适用于项目的 **预配配置文件（provisioning profile）** 和 **签名证书（signing certificate）**。
    
    -   该预配配置文件应该有权使用你设备的摄像机。
3.  打开你的 **项目设置（Project Settings）** 并导入预配配置文件和签名证书。
    

你可以在[iOS设置小节](/documentation/zh-cn/unreal-engine/building-packaging-and-publishing-unreal-engine-projects-for-ios-tvos-and-ipados)中找到这些步骤的详细信息。

### 打包和启动

在执行必要的设置来支持你的移动设备之后，你可以点击 **文件（File） > 打包项目（Package Project）** 并为相应的设备选择打包选项来打包你的项目。这将创建一个打包版本，稍后你可以将它部署在设备上。

你还可以点击主工具栏中的 **启动（Launch）** 下拉菜单，然后从显示的设备列表中选择你的设备，从而直接在设备上启动。你可以在 **设备管理器（Device Manager）** 菜单中检查设备的状态，验证设备已经连接。引擎然后会将项目自动打包，并自动推送到你的设备，然后启动。

## 5\. 在应用程序中导航

本小节将为手持AR模板开箱即用的配置提供用户体验旅程详细介绍。

### 扫描和对象放置

手持AR模板启动时将使用设备的摄像机来显示周围的环境。此时系统将出现提示，要求你扫描周围的环境。

![AR模板中的](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea23ae97-fe67-4474-92a6-bceb9082c7aa/beginscanprompt.png)

点击 **开始扫描（Begin Scan）** 按钮开始扫描。这将收集为虚拟对象构建3D场景所需的数据。

应用程序将要求你授予拍摄照片和录制视频的权限。摄像机需要这些权限才能扫描和显示环境。

移动设备完成扫描之后，应用程序将显示若干 **平面** 并提示你点击屏幕来选择一个平面。平面在显示时表面会有彩色波纹。为减少视觉效果噪点，应用程序每次仅显示一个平面，并且会将距离最近的平面设置为可见。

![在扫描平面时显示的内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67d27185-e514-43b6-bf41-e3662af0249b/scanningplanes.png)

在选择平面之后，底部工具栏UI将会出现，而你可以放置虚拟对象。

![底部工具栏UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98e6d648-7765-4a94-a417-f2ee8ffea0f0/uibottomtoolbar.png)

模板一次可以放置一个虚拟对象，但是用来放置此对象对象的工作流也可以用来在你自己的应用程序中放置其他平面。

### 操控对象

在手持AR模板中，你可以使用触摸屏 **平移**、**缩放** 或 **旋转** 虚拟对象。

要平移对象，请点击它并沿着你要放置对象的地面拖动。单指触摸即可显示平移HUD。对象只能它所在平面的边界内移动。开始平移对象时，HUD上将显示边界。

要缩放对象，可以使用拇指和食指缩小或放大对象。模板可以识别与屏幕的水平方向垂直的大部分缩小操作。在缩放对象时，UI将以毫米为单位来显示对象的新大小。

要旋转对象，请将两根手指放在屏幕上并向左或向右滑动。系统可以识别在要旋转的屏幕上处于水平方向的大部分滑动和拖动操作。这将显示旋转HUD，其中包含对象底部周围的圆圈及其当前世界旋转刻度（以度数表示）。

### 导航UI和菜单

默认情况下，手持AR模板的UI显示在屏幕的底部。这包括工具栏以及左下角的浮动 **信息（Info）** 按钮。

#### 快照

**快照（Snapshot）** 按钮将获取一张包含屏幕上显示的虚拟对象的图片，并将其保存到你的摄像机图库。一条显示 **快照已保存（Snapshot Saved）** 字样的提示将确认快照已成功获取。

从4.27开始，手持AR模板会将截屏保存到Android上的摄像机图库，但在iOS上不会保存。

#### 重置

**重置（Reset）** 按钮将会移除虚拟对象，并重新提示用户选择平面。

#### 选项菜单

**选项（Options）** 按钮将会打开用于提供配置选项的菜单。

![选项菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dea509c-9583-428e-bca2-3cb73f466a6c/uioptionsmenu.png)

在平移或缩放时，切换 **对齐（Snapping）** 将会使虚拟对象以1厘米的增量离散。旋转将会对齐到5度角。

在与屏幕交互之前，切换 **交互HUD（Interact HUD）** 将会关闭HUD。这就提供了一种方式来制作清晰的截屏。

**UI样式（UI Style）** 选择器提供了三种UI样式。明亮（Light）和黑暗（Dark）样式将显示默认UI，工具栏在屏幕底部。**游戏（Game）** 样式则显示更具特色的HUD，所有工具排成一圈，而不是横向排列。游戏（Game）样式支持与明亮（Light）和黑暗（Dark）样式完全相同的函数和流程，但使用时展示不同的布局。

![显示游戏样式的HUD](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/586494ec-0d73-4b2d-aacf-f453145296a1/uigamestyle.png)

#### 信息菜单

**信息菜单（Info Menu）** 将显示简单的视觉指南，列明用于操控虚拟对象的手势。

![显示认可手势有关教程的信息菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cda53df2-14ce-4780-820c-e8de57f89bff/uiinfomenu.png)

## 6\. 模板快速参考

手持AT模板的所有资产都位于内容浏览器中的 **手持AR（Handheld AR）** 文件夹中。手持AR模板主要依赖于以下资产：

资产名称

路径

摘要

BP\_ARGameMode

HandheldAR/Blueprints/GameFramework/BP\_ARGameMode

手持AR模板中使用的游戏模式。初始化AR Pawn。

BP\_ARPawn

HandheldAR/Blueprints/GameFramework/BP\_ARPawn

手持AR模板的Pawn类。初始化HUD，处理虚拟场景的设置以及用户的输入。

BP\_MainMenu

HandheldAR/Blueprints/UI/BP\_MainMenu

手持AR模板的主UI。控制其他菜单，以及初始化摄像机中的AR场景。

BP\_Plane

HandheldAR/Blueprints/Placeable/BP\_Plane

可以在其中放置可放置对象的平面。这些平面在扫描环境之后由AR Pawn设置。

BP\_Placeable

HandheldAR/Blueprints/Placeable/BP\_Placeable

用户可以与其交互的可放置对象的基础蓝图类。

如需这些Actor以及在何处查找关键功能的更多信息，请参阅[手持AR模板参考](/documentation/zh-cn/unreal-engine/handheld-ar-template-technical-reference)页面。

## 7\. 自行尝试

现在你已经设置了手持AR模板，而且可以在你的移动设备上探索模板。你可以将此模板作为起点，开发你自己的手持AR应用了。如需了解此模板中的类以及如何修改这些类，请查阅手持AR模板参考页面。

-   [template](https://dev.epicgames.com/community/search?query=template)
-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [ar](https://dev.epicgames.com/community/search?query=ar)
-   [handheld ar](https://dev.epicgames.com/community/search?query=handheld%20ar)
-   [arkit](https://dev.epicgames.com/community/search?query=arkit)
-   [arcore](https://dev.epicgames.com/community/search?query=arcore)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 用户体验旅程和功能概述](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#1%E7%94%A8%E6%88%B7%E4%BD%93%E9%AA%8C%E6%97%85%E7%A8%8B%E5%92%8C%E5%8A%9F%E8%83%BD%E6%A6%82%E8%BF%B0)
-   [2\. 兼容性](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#2%E5%85%BC%E5%AE%B9%E6%80%A7)
-   [3\. 设置模板](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#3%E8%AE%BE%E7%BD%AE%E6%A8%A1%E6%9D%BF)
-   [4\. 打包并部署到你的设备](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#4%E6%89%93%E5%8C%85%E5%B9%B6%E9%83%A8%E7%BD%B2%E5%88%B0%E4%BD%A0%E7%9A%84%E8%AE%BE%E5%A4%87)
-   [Android设置](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#android%E8%AE%BE%E7%BD%AE)
-   [iOS设置](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#ios%E8%AE%BE%E7%BD%AE)
-   [打包和启动](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#%E6%89%93%E5%8C%85%E5%92%8C%E5%90%AF%E5%8A%A8)
-   [5\. 在应用程序中导航](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#5%E5%9C%A8%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E4%B8%AD%E5%AF%BC%E8%88%AA)
-   [扫描和对象放置](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#%E6%89%AB%E6%8F%8F%E5%92%8C%E5%AF%B9%E8%B1%A1%E6%94%BE%E7%BD%AE)
-   [操控对象](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#%E6%93%8D%E6%8E%A7%E5%AF%B9%E8%B1%A1)
-   [导航UI和菜单](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#%E5%AF%BC%E8%88%AAui%E5%92%8C%E8%8F%9C%E5%8D%95)
-   [快照](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#%E5%BF%AB%E7%85%A7)
-   [重置](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#%E9%87%8D%E7%BD%AE)
-   [选项菜单](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#%E9%80%89%E9%A1%B9%E8%8F%9C%E5%8D%95)
-   [信息菜单](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#%E4%BF%A1%E6%81%AF%E8%8F%9C%E5%8D%95)
-   [6\. 模板快速参考](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#6%E6%A8%A1%E6%9D%BF%E5%BF%AB%E9%80%9F%E5%8F%82%E8%80%83)
-   [7\. 自行尝试](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine#7%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95)