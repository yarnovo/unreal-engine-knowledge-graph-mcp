# 使用虚幻引擎中的OpenColorIO对关卡视口和PIE模式应用颜色转换。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/apply-color-conversion-to-the-level-viewport-and-play-in-editor-with-opencolorio-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:30:21.754Z

---

目录

![在视口和PIE模式中转换颜色](https://dev.epicgames.com/community/api/documentation/image/669bc676-3eff-412c-a1fa-c90fdce2328b?resizing_type=fill&width=1920&height=335)

你可以通过调整 **视口视图模式（Viewport View Modes）** 直接对 **视口** 应用OCIO配置。你也可以通过创建和配置 **Create In-Game OpenColorIO Display Extension** 蓝图节点，对 **PIE模式（Play in Editor Mode）** 应用OCIO配置。

本文介绍了如何将 **OpenColorIO配置资产（OpenColorIO Configuration Asset）** 应用到视口，以及如何在PIE模式中将其应用到项目。

## 先决条件

你必须在项目中设置以下内容才能完成后续小节：

-   一个OpenColorIO配置资产。请参阅[OpenColorIO快速入门](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine)了解创建此资产的步骤。

## 转换关卡视口的颜色

按照下列步骤，将颜色转换应用到关卡视口。

1.  在 **视口（Viewport）** 中，点击 **视图模式（View Modes）** 按钮以打开其下拉菜单。选择 **OCIO显示（OCIO Display）** 以打开 **显示配置（Display Configuration）** 设置。
    
    ![The Viewport color management display configuration menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3818e54-8e02-429b-97d9-bfe9333f6a5e/viewport-color-management-display-configuration.png)
2.  在 **显示配置（Display Configuration）** 设置中，选择 **Select an OCIO Asset（选择OCIO资产）** ，然后选择 **OCIO配置资产**，以将其添加到视口视图设置。
    
    ![Select an OCIO configuration asset from the display configuration menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da7e238d-e073-4431-bcc0-05fcf00174a0/viewport-display-configuration-ocio-asset.png)
3.  以下两个设置是源颜色配置文件和颜色变化的目标文件。在此示例中，源颜色是 **Utility - Linear - sRGB**，目标是 **Output - sRGB Monitor**。
    
    ![An empty display configuration menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29c1b85c-e965-4109-8dac-b919c032057f/empty-ocio-conversion-settings-in-viewport.png)
4.  点击 **启用显示（Enable Display）** ，将OCIO颜色变换应用到视口。
    
    ![The display configuration menu after changing the settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8351ff2d-a5ab-4a37-84cc-4b26f504be0a/ocio-color-conversion-filled-out-in-viewport.png)
5.  启用这些设置后，视口将禁用色调曲线（Tone Curve），并将颜色转换插入到渲染的后期处理阶段。此操作会在UE应用色调映射之后且在其他所有操作之前执行。
    

以下图像显示了视口的颜色将如何根据OpenColorIO配置发生变化。

![禁用OpenColorIO](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95ea254a-7b34-4789-9bc9-91330abf517a/viewport-color-conversion-before.png)

![启用OpenColorIO](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84b6e37a-6207-4661-9684-bcd4b77cf3ca/viewport-color-conversion-after.png)

禁用OpenColorIO

启用OpenColorIO

在视口视图模式中启用/禁用OpenColorIO。

## 在游戏内视口中转换颜色

要在游戏内视口中转换颜色，必须向摄像机Actor的蓝图类添加一个 **Create In-Game OpenColorIO Display Extension** 蓝图节点，并将其与OCIO配置相连。

具体步骤如下：

1.  打开摄像机Actors的 **蓝图类**。如果没有附加到摄像机的现成蓝图类，也可以新建一个摄像机组件蓝图类。
    
2.  点击 **In Display Configuration** 引脚并拖出引线，然后新建一个 **OpenColor IODIsplay Configuration** 变量。或在 **我的蓝图（My Blueprint）** 选项卡中新建一个变量。
    
    ![The Blueprint editor window with the OpenColor IODisplay Configuration variable visible ](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2eb7dfd8-3ee4-47d5-a39e-c1d80ec1b888/pie-color-conversion-variable.png)
3.  在 **细节** 面板中编辑此变量，方法是添加 **OCIO配置资产**，并调整其他设置以匹配所需的颜色配置。
    
    ![The Blueprint editor showing a completed Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4feafb61-7608-4210-97ff-79326c0bfc78/pie-color-conversion-blueprint-overview.png)
4.  新建一个 **Create In-Game OpenColorIO Display Extension** 节点，将其附加到 **EventBeginPlay** 节点，此时OCIO配置变量应如下图所示。
    
5.  **编译（Compile）** 并 **保存（Save）** 蓝图。
    
6.  在 **关卡编辑器视口** 中点击 **运行**，在PIE模式中打开项目以测试蓝图。
    

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/apply-color-conversion-to-the-level-viewport-and-play-in-editor-with-opencolorio-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [转换关卡视口的颜色](/documentation/zh-cn/unreal-engine/apply-color-conversion-to-the-level-viewport-and-play-in-editor-with-opencolorio-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E5%85%B3%E5%8D%A1%E8%A7%86%E5%8F%A3%E7%9A%84%E9%A2%9C%E8%89%B2)
-   [在游戏内视口中转换颜色](/documentation/zh-cn/unreal-engine/apply-color-conversion-to-the-level-viewport-and-play-in-editor-with-opencolorio-in-unreal-engine#%E5%9C%A8%E6%B8%B8%E6%88%8F%E5%86%85%E8%A7%86%E5%8F%A3%E4%B8%AD%E8%BD%AC%E6%8D%A2%E9%A2%9C%E8%89%B2)