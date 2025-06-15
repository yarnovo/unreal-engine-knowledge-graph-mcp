# 虚幻引擎中采用动态图形的虚拟演播室展台示例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/broadcast-esports-hype-chamber-sample-with-motion-graphics-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:48:29.574Z

---

目录

![虚拟演播室展台示例](https://dev.epicgames.com/community/api/documentation/image/535a0cf3-2b39-4fee-a452-0ca7576a533f?resizing_type=fill&width=1920&height=335)

在动态图形设计和体育竞技领域中，实时渲染技术正变得日益重要。Epic Games与Capacity Studios合作推出了一个高品质的虚拟演播室展台示例，介绍了如何为电子竞技节目设计、开发和播放包含丰富动画元素的内容。

进入演播室，了解如何通过高级蓝图和数据表工作流来驱动一个体育类动态图形资产包。

通过学习本示例和文本，你将了解：

-   如何在实时节目和预渲染动画中运用动态图形动画。此示例中包含10个动态图形示例。
    
-   如何构建一个可高度自定义的图形资产包，让美术师可以自由切换其中的3D模型、纹理、材质和光照效果（全部均由单个蓝图控制器驱动）。当你更改战队名称时，场景中的所有元素都会相应替换。
    
-   如何通过向数据表添加新战队来扩展工作流。
    

## 入门指南

用虚拟演播室展台示例设置项目的步骤如下：

1.  通过 **Fab** 访问[虚拟演播室展台示例](https://fab.com/s/0d3553fc0080)，点击 **添加到我的库（Add to My Library）**，让项目文件出现在 **Epic Games启动程序** 中。
    1.  或者，你也可以在UE的Fab插件中搜索该示例项目。
2.  在 **Epic Games启动程序** 中，找到 **虚幻引擎 > 库 > Fab库** 以访问项目。
    
    只有在你安装了兼容的引擎版本时，示例项目才会出现在 **Fab库** 中。
    
3.  点击 **创建项目（Create Project）** 并按照屏幕上的提示下载示例并启动新项目。

关于访问示例内容及虚幻引擎的Fab插件，详见[示例与教程](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)。

## 播放图形和动画

在虚幻编辑器的 **工具栏（Toolbar）** 中，点击 **运行（Play）** 可运行关卡。

在 **世界大纲视图（World Outliner）** 中，选择 **BP\_HypeChamber\_Controller** ，打开其 **细节（Details）** 面板，其中就是你可以在 **在编辑器中运行（Play in Editor）** 模式下更改的选项。

### 演播室控件

![演播室控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cdb73e6-a3c6-41ab-9708-9f387ba70d7c/hype-chamber-control.png)

点击 **播放图形（Play Graphic）** 可播放3D图形和动画。

![在演播室中播放图形](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/489b2d13-6d72-439d-a480-56bc6a34efcd/control-play-graphic.gif)

点击 **重置图形（Reset Graphic）** 将所有内容重置到初始状态。

![在演播室中重置图形](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bc880d1-8bcd-444a-a58e-1a4590989191/control-reset-graphic.gif)

更改 **战队Aselect（Team Aselect）** 可调整关卡中的战队。如果你的设计包含两个战队，那么战队ASelect（Team Aselect）会显示在左侧， **战队 Bselect（Team Bselect）** 显示在右侧。

![在演播室中选择战队](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a70feffb-d822-4488-95b5-6749c72ab9ba/control-team-select.gif)

**模式选择（Mode Select）** 可以更改关卡中显示的内容。每种模式关联不同的运态图形和动画。以下选项可供你选择：

-   INT Matchup
    
-   INT Matchup Infinite
    
-   INT Team Hype Chamber
    
-   INT Player Name
    
-   INT Text
    
-   INT\_Logo
    
-   FS Open
    
-   FS Team Hype Chamber Wide
    
-   FS Team Hype Chamber Close
    
-   FS Backgrounds
    
-   BUMP Team Victory
    

### 演播室高级选项

演播室控制台（Hype Chamber Controller）提供了以下设置，用于定制播放动态图形和动画时的媒体输出和后期处理效果。

![演播室的高级控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9816f6ad-68ad-43ee-9fe9-3551edd9c272/hype-chamber-advanced-control.png)

参数

说明

禁用SDI（Disable SDI）

禁用激活媒体捕获输出。

启用SDI（Enable SDI）

启用基于通用媒体输出的媒体捕获输出。

更新高级设置（Update Advanced）

将质量和光线追踪设置更新为演播室控制台（Hype Chamber Controller）设置的值。

更新徽标（Update Logos）

更新屏幕墙中的背景徽标和颜色。

使用模式选择（Use Mode Select）

启用后，你可以用演播室控制台控制要使用的场景。在使用动画渲染队列之前，你需要禁用此功能。

屏幕模式（Screen Mode）

填充演播室屏幕的内容类型。默认为动态图形场景的渲染目标。

主后期处理（Master Post Process）

对具有最高优先级的场景后期处理体积的引用。

通用媒体输出（Media Output Generic）

定义内容的媒体捕获输出。默认使用Blackmagic SDI配置。

分辨率（Resolution）

媒体捕获的输出分辨率大小。

质量（Quality）

即 `sg.resolution` 质量命令输入。

最大粗糙度（Max Roughness）

后期处理体积光线追踪的最大粗糙度。

最大反弹次数（Max Bounces）

后期处理体积光线追踪的最大反弹次数。

逐像素采样（Samples Per Pixel）

后期处理体积光线追踪的逐像素样次数。

### 使用远程控制播放图形和动画内容

在 **EsportsSample/\_ArtistElements/Blueprints** 中，双击远程控制面板中的 **RC\_Esports** 远程控制预设（RC\_Esports Remote Control Preset）。BP\_Esports\_Controller的细节（Details）面板中的参数与RC\_Esports预设中公开的参数相同。

![演播室远程控制预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1bb5e9f-e157-4a48-9dfc-c938bff90695/hype-chamber-remote-control-preset.png)

在本地计算机上输入URL **127.0.0.1:7000** ，或在第二台设备上输入使用7000端口的计算机的IP地址，启动远程控制Web应用程序，以便远程控制战队图形和文本。有关该网络应用程序的更多使用信息，请参阅[远程控制Web应用程序](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine)。

![演播室远程控制Web应用程序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d9ff126-2759-4012-84bc-f04fee6aafc4/hype-chamber-remote-control-web-application.png)

## 编辑战队主题

要编辑当前战队主题，请在 **内容浏览器（Content Browser）** 中，找到 **EsportsSample/\_ArtistElements/Blueprints/Data** ，并双击 **DT\_Esport\_Themes** ，在数据表资产编辑器（Data Table Asset Editor）中打开它。

每一行包含一个战队的所有数据，从战队名称到战队的颜色控制板，一应俱全。点击任意一行并在 **行编辑器（Row Editor）** 中编辑其数据，即可更改战队主题。

![演播室团队数据表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/425cdb82-c75f-4773-8d38-08bd38f605a6/hype-chamber-team-data-table.jpg)

要更改定义战队主题的参数，请找到 **EsportsSample/\_ArtistElements/Blueprints/Structures** ，并双击 **ST\_RL\_Design** ，在结构资产编辑器（Structure Asset Editor）中打开它。

![演播室团队结构资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fc42d94-1526-4f6e-be78-6f2e335e3faf/hype-chamber-team-structure-asset.jpg)

在 **Esports/\_ArtistElements/Blueprints** 中，双击 **BP\_Esport\_Controller**， 在蓝图编辑器（Blueprint Editor）中打开它。在 **UpdateData** 分段中，按行名查找 **DT\_Esport\_Themes** 数据表，以便在关卡中填充战队数据。添加参数时，请确保将参数连接到 **TeamAValues** 和 **TeamBValues** 节点定义过的资产上。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72dca6d3-9d91-47c3-887f-18c8d5e2317d/hype-chamber-controller-data-table-assignment.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72dca6d3-9d91-47c3-887f-18c8d5e2317d/hype-chamber-controller-data-table-assignment.png)

点击查看大图。

## 创建自己的战队

按照以下步骤将新战队添加到选项中。

1.  在内容浏览器（Content Browser）中，找到 **EsportsSample/\_ArtistElements/Blueprints/Enums** ，并双击 **EN\_Teams** ，在枚举资产编辑器中打开它。
    
    ![演播室团队枚举](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6c5775a-e488-4310-b082-5fe694e8fb04/hype-chamber-team-enum.png)
2.  点击 **新增（New）** ，添加一个枚举值。
    
3.  将新枚举值的 **显示名称（Display Name）** 设置为战队简称，将 **说明（Description）** 设置为战全称。在此示例中，新战队的显示名称为 **WIP** ，其说明为 **Work in Progress** 。
    
4.  找到 **EsportsSample/\_ArtistElements/Blueprints/Data** ，并点击 **(+)添加（(+) Add）** 添加新行。
    
5.  将新行的名称设置为战队的简称，将战队名称（Team Name）设置为战队的全称。在此示例中，行的名称为 **WIP** ，战队名称为 **Work in Progress** 。
    
    ![演播室团队数据表新条目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/574fd932-ec56-46f7-b963-b525277faaa2/hype-chamber-team-data-table-new-entry.png)
6.  现在你可以修改关卡的BP\_HypeChamber\_Controller中的演播室控件（Hypechamber Controls）来选择你的新战队了。
    

## 使用动画渲染队列进行批量渲染

在内容浏览器（Content Browser）中，找到 **EsportsSample/\_ArtistElements/Blueprints** 。右键点击 **EUW\_VersioningUtility** [编辑器工具控件](/documentation/zh-cn/unreal-engine/creating-widgets-in-unreal-engine)资产，并选择 **运行编辑器工具控件（Run Editor Utility Widget）** 。

在新窗口中打开编辑器工具控件（Editor Utility Widget）。

![演播室编辑器工具控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be3ed2c7-1121-453a-9cbc-ca800a2e49e7/hype-chamber-editor-utility-widget.png)

此控件将使用\[影片渲染队列\]animating-characters-and-objects/Sequencer/movie-render-pipeline#影片渲染队列)为具有各种战队配置的批量渲染序列提供控制方法。以下参数会影响渲染作业。

参数

说明

模式选择（Mode Select）

选择渲染时应配置和播放的图形动画。

目标序列（Target Sequence）

模式选择的目标关卡序列。可以在编辑器中打开以便预览图形。

战队AList（Team AList）

要使用所选图形进行渲染的战队列表。在有两个战队的图形或模式中，这可以控制左侧的战队。

团队BList（Team BList）

要使用所选图形进行渲染的第二个战队列表。在有两个战队的图形或模式中，这可以控制右侧的战队。

文本版本（Text Ver）

选择要在渲染中使用的文本模式动画的版本。输入文本默认为当前设置为文本行1和文本行2输入的内容。

背景版本（Background Ver）

选择渲染中的背景模式动画版本。

演播室控制器（Hype Chamber Con）

对场景中BP\_Hypechamber\_Controller的调试引用。

渲染预设（Render Preset）

用于渲染作业的影片渲染队列渲染预设资产。

输出文件夹（Output Folder）

渲染资产的输出目录。

管线执行器作业（Pipeline Executor Job）

显示有效执行器作业的调试视图。

下一个渲染执行器（Next Render Executor）

显示下一个执行器作业的调试视图。

队列索引（Queue Index）

战队A和战队B列表中当前正在进行的渲染作业的调试状态

作业数量（Job Count）

列出的要进行的渲染作业的总数。这由战队A列表中的战队数量决定。

点击 **(+) 开始渲染（(+) Start Render）** 可以启动渲染作业。

![演播室批量渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/297e4123-02e1-41c8-9c34-96079351fcfe/hype-chamber-batch-render.jpg) ![演播室批量渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1783122-c793-4b0f-80e6-8cd9d982e025/hype-chamber-batch-render.jpg) 

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/broadcast-esports-hype-chamber-sample-with-motion-graphics-in-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [播放图形和动画](/documentation/zh-cn/unreal-engine/broadcast-esports-hype-chamber-sample-with-motion-graphics-in-unreal-engine#%E6%92%AD%E6%94%BE%E5%9B%BE%E5%BD%A2%E5%92%8C%E5%8A%A8%E7%94%BB)
-   [演播室控件](/documentation/zh-cn/unreal-engine/broadcast-esports-hype-chamber-sample-with-motion-graphics-in-unreal-engine#%E6%BC%94%E6%92%AD%E5%AE%A4%E6%8E%A7%E4%BB%B6)
-   [演播室高级选项](/documentation/zh-cn/unreal-engine/broadcast-esports-hype-chamber-sample-with-motion-graphics-in-unreal-engine#%E6%BC%94%E6%92%AD%E5%AE%A4%E9%AB%98%E7%BA%A7%E9%80%89%E9%A1%B9)
-   [使用远程控制播放图形和动画内容](/documentation/zh-cn/unreal-engine/broadcast-esports-hype-chamber-sample-with-motion-graphics-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E6%92%AD%E6%94%BE%E5%9B%BE%E5%BD%A2%E5%92%8C%E5%8A%A8%E7%94%BB%E5%86%85%E5%AE%B9)
-   [编辑战队主题](/documentation/zh-cn/unreal-engine/broadcast-esports-hype-chamber-sample-with-motion-graphics-in-unreal-engine#%E7%BC%96%E8%BE%91%E6%88%98%E9%98%9F%E4%B8%BB%E9%A2%98)
-   [创建自己的战队](/documentation/zh-cn/unreal-engine/broadcast-esports-hype-chamber-sample-with-motion-graphics-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%87%AA%E5%B7%B1%E7%9A%84%E6%88%98%E9%98%9F)
-   [使用动画渲染队列进行批量渲染](/documentation/zh-cn/unreal-engine/broadcast-esports-hype-chamber-sample-with-motion-graphics-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8A%A8%E7%94%BB%E6%B8%B2%E6%9F%93%E9%98%9F%E5%88%97%E8%BF%9B%E8%A1%8C%E6%89%B9%E9%87%8F%E6%B8%B2%E6%9F%93)