# 在虚幻引擎中设置虚拟堪景 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:27.936Z

---

目录

本指南介绍如何设置头显设备以使用虚拟堪景工具。如需了解虚拟堪景的概述，请参阅[虚拟堪景](/documentation/zh-cn/unreal-engine/virtual-scouting-in-unreal-engine)。

要使用虚拟堪景，你必须设置好兼容的VR头显设备以及OpenXR运行时供应商。然后创建虚幻引擎项目，并启用虚拟堪景插件。

## 设置VR头显设备

虚拟堪景支持下列VR头显设备：

-   Oculus Rift S
-   Meta Quest 2
-   Meta Quest Pro
-   Meta Quest 3
-   Valve Index

### Oculus和Meta头显设备

要设置Oculus或Meta头显设备，你必须先安装并启动Oculus桌面应用程序。如需安装说明，请参阅Meta的[为电脑安装Meta Quest Link应用](https://www.meta.com/zh-cn/help/quest/articles/headsets-and-accessories/oculus-rift-s/install-app-for-link/)文档。

启动Oculus桌面应用程序并戴上头显设备后，你应该会看到泛型控制器模型。

![泛型控制器模型。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe735451-cace-4965-8cd5-88aa3308a3a0/generic-controllers.png)

对于Oculus和Meta设备，不同的头显和对应的控制器之间共用一套相同的按钮映射。按钮映射即绑定控制器按钮和操作的输入。

#### Meta Quest Link - 有线

如果使用USB-C连接线，那么你必须使用Meta Quest Link连接到Meta头显。如需详细信息，请参阅Meta的[设置Meta Quest Link](https://www.meta.com/en-gb/help/quest/articles/headsets-and-accessories/oculus-link/set-up-link/)文档。

#### Meta Quest Link - 无线

必须使用Meta Quest AirLink才能将Meta头显无线连接到电脑。 如需详细信息，请参阅Meta的[使用Air Link通过Wi-Fi将Meta Quest连接到电脑](https://www.meta.com/en-gb/help/quest/articles/headsets-and-accessories/oculus-link/connect-with-air-link/)文档。

#### SteamLink和Quest

你可以用SteamLink应用程序将Meta头显连接到SteamVR电脑桌面软件。如需详细了解该应用程序及其用法，请参阅Meta商城的[Steam流式应用](https://www.meta.com/zh-cn/experiences/5841245619310585/)文档。

为获得最佳效果，请设置专用的无线路由器，通过以太网连接到你的电脑，并确保头显设备和路由器位于同一房间。VR的无线数据流质量和效果受无线网络连接质量的影响。

### Valve Index

虚拟堪景支持Valve Index头显设备以及Index Knuckle控制器。

![Valve Index Knuckle控制器。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4447c7a-6f40-4a43-b418-2f3a1330c565/knuckle-controllers.png)

要设置Valve Index头显，请在电脑上打开Steam客户端并启动SteamVR应用程序。

检查SteamVR窗口，确认头显和控制器已连接到用户界面。这时你应该能看到以下各组件的图标：

-   头显设备
-   左控制器
-   右控制器
-   （如果有）系统中的追踪摄像机

![SteamVR窗口显示已连接的头显、左右控制器和两个摄像机。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fddbcd5c-075d-42a2-88eb-7df450bd2785/steamvr-window.png)

### 设置OpenXR运行时供应商

如果你使用的是Meta或Oculus头显，请务必将Meta Quest Link桌面软件设置为OpenXR供应商。

要将Meta Quest Link桌面软件设置为OpenXR供应商，请执行以下步骤：

1.  打开Meta Quest Link桌面软件。
2.  点击 **设置（Settings）** > **通用（General）** > **OpenXR运行时（OpenXR Runtime）** > **将Meta Quest Link设置为...（Set Meta Quest Link as act…）**

![Meta Quest桌面设置对话框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/522a1eb5-cc6a-4481-b115-164fdf0b9652/meta-quest-link.png)

如果你用的是搭载SteamLink应用程序的Valve Index头或Meta头显，请务必将SteamVR设置为OpenXR提供商。

要将SteamVR设置为OpenXR提供商，请执行以下步骤：

1.  打开SteamVR。
2.  点击系统托盘的 **设置（Settings）** 。
3.  在打开的设置对话框中，点击 **OpenXR** > **将SteamVR设为OpenXR运行时（Set SteamVR as OpenXR Runtime）** 。

![SteamVR的OpenXR设置对话框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/957d727f-3de2-4ed2-a8f9-374fe5543b40/steamvr-runtime.png)

### 确认VR渲染和流送

要确认虚幻编辑器是否会渲染并流送到你的头显，请检查VR头显中是否可以看到到以下任一场景。

![Meta Link电脑桌面视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77eaa55d-d7a0-4960-80f4-471b1c196ad8/meta-link-view.png)

Meta Link电脑桌面视图

![SteamVR电脑桌面视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cb09e26-7e6c-4989-9a30-4d7765e09cfc/steamvr-view.png)

SteamVR桌面视图

## 在虚幻引擎项目中设置虚拟堪景

### 启用虚拟堪景插件

要启用虚拟堪景插件，请执行以下步骤：

1.  在虚幻引擎中创建一个空白项目。
2.  点击顶部工具栏的 **编辑（Edit）** > **插件（Plugins）** 。
3.  在 **插件（Plugins）** 菜单窗口中，搜索"虚拟堪景（Virtual Scouting）"并启用该插件。
    
    ![虚拟堪景插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b383c76b-42b1-4da6-a87c-584b7eab4d31/vscout-plugin.png)
4.  在弹出的对话框中点击 **是（Yes）** ，然后重新启动虚幻引擎。

#### VR注意事项

##### 移除VR游戏输入映射

如果你使用的项目已经预设了VR增强输入操作（如VR游戏模板），那么你必须移除这些预设才能保证虚拟堪景正常工作。

要移除VR游戏输入的映射，请执行以下步骤：

1.  点击 **编辑（Edit）** > **项目设置（Project Settings）** > **引擎（Engine）** 。
2.  展开 **增强输入（Enhanced Input）** 类别。
3.  点击 **默认映射上下文（Default Map Contexts）** 标题旁的删除图标。

![增强输入项目输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0fab2fe-be91-4aff-81e6-da89b44843aa/enhanced-input.png)

##### 渲染注意事项

VR不支持实例剔除。如果项目启用了实例剔除（如[城市示例](https://www.fab.com/listings/4898e707-7855-404b-af0e-a505ee690e68)项目），那么你必须用控制台变量 `r.InstanceCulling.OcclusionCull=0` 将其禁用。如需详细了解剔除，请参阅[可视性和遮挡剔除参考](/documentation/zh-cn/unreal-engine/visibility-and-occlusion-culling-reference-in-unreal-engine)。

**Lumen** 和 **Nanite** 可在VR中生效，但从虚幻引擎5.4开始，使用Lumen对性能有很高的要求。你可能需要降低项目的伸缩性设置以提高性能。你可以通过降低屏幕百分比来提高性能，但代价是将出现渲染瑕疵，尤其是在VR控制板菜单等文本元素上。

##### 后期处理Alpha通道支持

要启动虚拟勘景，必须禁用后处理的Alpha通道支持。请转到 **项目设置（Project Settings）** > **引擎（Engine）** > **渲染（Rendering）** > **默认设置（Default Settings）** ，然后将 **Alpha输出（Alpha Output）** 设为 **False** 。

##### 轮廓模板支持

虚拟堪景工具使用模板材质在对象上绘制轮廓（详见[内容放置工具](/documentation/zh-cn/unreal-engine/using-the-virtual-scouting-tools-in-unreal-engine#%E5%86%85%E5%AE%B9%E6%94%BE%E7%BD%AE%E5%B7%A5%E5%85%B7)）。要启用轮廓丝网模板，请依次点击 **项目设置（Project Settings）** > **引擎（Engine）** > **渲染（Rendering）** 并将 **自定义深度模板通道（Custom Depth-Stencil Pass）** 设置为 **启用模板（Enabled with Stencil）**。

### 项目和用户设置

虚拟堪景插件有自己的项目和用户设置以及插件设置。你还可以在XRCreative编辑器设置中更改VR控制器的惯用手。

#### 项目设置

打开 **项目设置（Project Settings）** > **插件（Plugins）** > **虚拟堪景（Virtual Scouting Settings）** 即可访问插件的设置。如果将这些设置检入到版本控制系统中，那么这些设置将影响所有用户的项目。

![项目设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74c899cc-fa7e-4398-85fd-66b8f1898261/project-settings.png)

这些设置项包括控制虚拟堪景工具集的参数，例如用于测距的单位系统和取景器的曝光参数。

如果修改了单位系统，现有的测距结果将沿用之前的测距系统中存储的数值，直到更新。新的测距结果则会自动遵循当前的项目设置。

#### 用户设置

转到 **项目设置（Project Settings）** > **插件（Plugins）** > **虚拟制片编辑器（Virtual Production Editor）** > **旧版虚拟堪景（Legacy Virtual Scouting）** 即可访问用户设置。这些设置将与项目数据一起按用户进行保存。它们将决定用户对移动速度和提示文本可见性的偏好设置。你既可以在编辑器中修改这些设置，也可以在VR中进行修改。

![用户设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ac24e04-4088-47d1-b553-65a20204a6a9/user-settings.png)

#### XRCreative编辑器设置

要访问XRCreative编辑器设置项，请转到 **编辑（Edit）** > **编辑器偏好设置（Editor Preferences）** > **XRCreative编辑器设置（XRCreative Editor Settings）** 。

![XRCreative编辑器设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2f0816e-dbac-4ab0-b1da-afbb6989ceed/xrcreative-settings.png)

XRCreative编辑器设置项 **惯用手（Handedness）** 决定了工具将在哪只手上出现。在VR中无法更改此设置。

**惯用手（Handedness）** 默认设置为 **右（Right）** 。左手模式就是一套单纯的功能按钮镜像，将功能切换到了另一只手。

### 设置VR模式

要设置虚拟堪景的VR模式，请在主工具栏中找到VREditor按钮，点击旁边的 **省略号（...）** 下拉菜单。

![VREditor按钮和模式选择下拉菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33dd956c-73f5-469d-81c9-066d9d5d7279/vreditor-mode.png)

确保选择堪景默认值（Scouting Default）模式。如需详细了解自定义VREditor模式，请参阅[创建新的XR创意模式和工具集](/documentation/404)。

### 进入VR

要启动虚拟堪景工具集并在VR中查看关卡，点击VREditor按钮即可。

![VREditor主工具栏按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e409a4d6-3fc6-44da-9ab8-5ad2b51d920a/vreditor-launch.png)

如需详细了解虚拟堪景工具集的使用，请参阅[使用VR工具](/documentation/zh-cn/unreal-engine/using-the-virtual-scouting-tools-in-unreal-engine)。

-   [virtual scouting](https://dev.epicgames.com/community/search?query=virtual%20scouting)
-   [instruction](https://dev.epicgames.com/community/search?query=instruction)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置VR头显设备](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E8%AE%BE%E7%BD%AEvr%E5%A4%B4%E6%98%BE%E8%AE%BE%E5%A4%87)
-   [Oculus和Meta头显设备](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#oculus%E5%92%8Cmeta%E5%A4%B4%E6%98%BE%E8%AE%BE%E5%A4%87)
-   [Meta Quest Link - 有线](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#metaquestlink-%E6%9C%89%E7%BA%BF)
-   [Meta Quest Link - 无线](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#metaquestlink-%E6%97%A0%E7%BA%BF)
-   [SteamLink和Quest](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#steamlink%E5%92%8Cquest)
-   [Valve Index](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#valveindex)
-   [设置OpenXR运行时供应商](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E8%AE%BE%E7%BD%AEopenxr%E8%BF%90%E8%A1%8C%E6%97%B6%E4%BE%9B%E5%BA%94%E5%95%86)
-   [确认VR渲染和流送](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E7%A1%AE%E8%AE%A4vr%E6%B8%B2%E6%9F%93%E5%92%8C%E6%B5%81%E9%80%81)
-   [在虚幻引擎项目中设置虚拟堪景](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E5%9C%A8%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E9%A1%B9%E7%9B%AE%E4%B8%AD%E8%AE%BE%E7%BD%AE%E8%99%9A%E6%8B%9F%E5%A0%AA%E6%99%AF)
-   [启用虚拟堪景插件](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E5%90%AF%E7%94%A8%E8%99%9A%E6%8B%9F%E5%A0%AA%E6%99%AF%E6%8F%92%E4%BB%B6)
-   [VR注意事项](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#vr%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [移除VR游戏输入映射](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E7%A7%BB%E9%99%A4vr%E6%B8%B8%E6%88%8F%E8%BE%93%E5%85%A5%E6%98%A0%E5%B0%84)
-   [渲染注意事项](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E6%B8%B2%E6%9F%93%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)
-   [后期处理Alpha通道支持](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86alpha%E9%80%9A%E9%81%93%E6%94%AF%E6%8C%81)
-   [轮廓模板支持](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E8%BD%AE%E5%BB%93%E6%A8%A1%E6%9D%BF%E6%94%AF%E6%8C%81)
-   [项目和用户设置](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E9%A1%B9%E7%9B%AE%E5%92%8C%E7%94%A8%E6%88%B7%E8%AE%BE%E7%BD%AE)
-   [项目设置](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [用户设置](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E7%94%A8%E6%88%B7%E8%AE%BE%E7%BD%AE)
-   [XRCreative编辑器设置](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#xrcreative%E7%BC%96%E8%BE%91%E5%99%A8%E8%AE%BE%E7%BD%AE)
-   [设置VR模式](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E8%AE%BE%E7%BD%AEvr%E6%A8%A1%E5%BC%8F)
-   [进入VR](/documentation/zh-cn/unreal-engine/setting-up-virtual-scouting-in-unreal-engine#%E8%BF%9B%E5%85%A5vr)