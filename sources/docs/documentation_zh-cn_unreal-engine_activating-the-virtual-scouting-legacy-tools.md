# 启动旧版虚拟堪景工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/activating-the-virtual-scouting-legacy-tools
> 
> 生成时间: 2025-06-14T19:21:04.834Z

---

目录

![启动旧版虚拟堪景工具](https://dev.epicgames.com/community/api/documentation/image/f46b9666-4294-4ef9-99b1-0ca0956a0940?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

本文中提到的旧版虚拟堪景工具将在未来的引擎版本中废弃。我们建议改用[新版虚拟堪景工具](/documentation/zh-cn/unreal-engine/virtual-scouting-in-unreal-engine)。 未使用的VREditor代码和模块将在未来的引擎版本中彻底废弃。

虚拟堪景兼容的头显包括HTC Vive、HTC Vive Pro、Oculus Rift和Oculus Rift S VR。请参阅[SteamVR先决条件](/documentation/zh-cn/unreal-engine/steamvr-prerequisites-in-unreal-engine)和[Oculus先决条件](/documentation/zh-cn/unreal-engine/oculus-prerequisites-in-unreal-engine)，了解如何将头显连接上虚幻引擎。

本操作指南将介绍如何配置项目，以启用虚拟堪景工具。

## 步骤

1.  打开项目后，在主菜单中选择 **编辑（Edit）** > **插件（Plugins）**。
    
2.  在 **插件（Plugins）** 菜单的 **虚拟制片（Virtual Production）** 下，启用 **虚拟制片工具（Virtual Production Utilities）** 插件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42e16753-49d5-45f8-aba7-bdc0ed1251bd/virtualproductionutilities_enable.png)
3.  出现提示后，重启 **编辑器**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e969910-16bf-4916-b08c-cd778b8ad5c0/virtualproductionutilities_restart.png)
4.  在主菜单中选择 **编辑（Edit）** > **项目设置（Project Settings）**。
    
5.  在 **项目设置（Project Settings）** > **插件（Plugins）** > **虚拟制片编辑器（Virtual Production Editor）** > **虚拟制片（Virtual Production）** 中，将 **虚拟堪景用户界面（Virtual Scouting User Interface）** 设为 **虚拟堪景控件（Virtual Scouting Widget）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/975c66d6-5286-4aaa-b72e-05ae75e5d072/virtualscoutingwidget.png)
    
    如启用 **虚拟制片实用工具** 插件，但 **VirtualScoutingWidget** 未设为 **虚拟堪景控件**，则可能会影响 **VR编辑器** 的行为。这一问题将在未来版本中得到解决。
    
6.  在主菜单中选择 **编辑（Edit）** > **编辑器首选项（Editor Preferences）**。
    
7.  在 **通用（General）** > **VR模式（VR Mode）** > **运动控制器（Motion Controllers）** 中，将 **交互件类（Interactor Class）** 设为 **VirtualScoutingInteractor**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1630a843-e3c9-4d86-9cba-1fe76005add3/vrmode_interactorclass.png)
8.  在主菜单中选择 **编辑（Edit）** > **编辑器首选项（Editor Preferences）**。
    
9.  在 **编辑器偏好（Editor Preferences）** > **通用（General）** > **VR模式（VR Mode）** > **运动控制器（Motion Controllers）** 中，将 **传送器类** 设为 **VirtualScoutingTeleporter**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d8fafe7-3d61-4565-bf04-fa16e996ba6e/vrmode_teleporterclass.png)
10.  在主菜单中选择 **编辑（Edit）** > **编辑器偏好（Editor Preferences）**。
    
11.  在 **编辑器偏好（Editor Preferences）** > **通用（General）** > **VR模式（VR Mode）** > **场景移动（World Movement）** 中，不勾选 **显示场景移动网格（Show World Movement Grid）** 和 **显示场景移动后期处理（Show World Movement Post Process）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/563f9222-e303-4425-bf81-34a7ce751896/worldmovement_before.png "worldmovement_before.png")
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65745077-a159-4a18-98fd-2f89cd3c35b3/worldmovement_after.png "worldmovement_after.png")
    
12.  在主菜单中选择 **编辑（Edit）** > **编辑器偏好（Editor Preferences）**。
    
13.  在 **编辑器偏好（Editor Preferences）** > **关卡编辑器（Level Editor）** > **视口（Viewports）** > **网格快照（Grid Snapping）**，不勾选 **启用网格快照（Enable Grid Snapping）**、**启用旋转快照（Enable Rotation Snapping）** 和 **启用比例快照（Enable Scale Snapping）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83427c66-37fc-4287-bbb3-f8399f62d8c1/gridsnapping_before.png "gridsnapping_before.png")
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7884927-1d82-482c-8850-02645f4d14d5/gridsnapping_after.png "gridsnapping_after.png")
    
14.  进入 **VR模式**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca09c41b-7392-487e-9a24-719815450de1/vrmode.png)

## 最终结果

进入 **VR模式** 后，按下VR控制器上的菜单按钮就能呼出虚拟堪景面板，访问各种虚拟堪景工具。关于每个工具的详细信息，请参阅[虚拟堪景概述](/documentation/zh-cn/unreal-engine/virtual-scouting-legacy-overview)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb8b2835-a894-4d84-b171-fc224f3fbed7/menus.png)

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [virtual scouting](https://dev.epicgames.com/community/search?query=virtual%20scouting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/activating-the-virtual-scouting-legacy-tools#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/activating-the-virtual-scouting-legacy-tools#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)