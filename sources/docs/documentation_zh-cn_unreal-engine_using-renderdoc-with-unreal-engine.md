# 使用RenderDoc分析虚幻引擎画面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine
> 
> 生成时间: 2025-06-14T19:23:12.077Z

---

目录

![使用RenderDoc分析虚幻引擎画面](https://dev.epicgames.com/community/api/documentation/image/b138a976-11e3-42ba-a6b2-6df2d4b29c94?resizing_type=fill&width=1920&height=335)

RenderDoc是一款免费开源的图形调试程序，可以逐帧捕捉虚幻引擎等应用的画面。捕捉内容将被载入到RenderDoc中，并解释各个事件、API等内容对GPU的影响。

## 安装RenderDoc

RenderDoc是一款开源图形调试器，可从[RenderDoc.org](https://renderdoc.org/)免费下载和安装。

以下列表指明了RenderDoc当前支持的操作系统和API，它们与虚幻引擎的支持可能有所不同。欲知最新更新，请参阅[RenderDoc的FAQ](https://renderdoc.org/docs/getting_started/faq.html?highlight=support#what-apis-does-renderdoc-support)页面。

RenderDoc支持以下操作系统：

-   Windows 7、10和11
-   Linux
-   Android
-   Nintendo Switch

RenderDoc支持以下API：

-   Vulkan
-   D3D11
-   D3D12
-   OpenGL 3.2+
-   OpenGL ES 2.0 — 3.2

## 在你的项目中启用RenderDoc

**RenderDoc** 插件随附在引擎中并默认启用。你可以通过两种方式对项目运行RenderDoc：使用命令行参数或项目设置。

若RenderDoc在启动时附加，你会在关卡视口右上角看到RenderDoc图标。

![RenderDoc关卡视口图标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b348aad-6f60-4e0a-8f43-3292a6a74406/renderdoc-icon.png)

执行下面的步骤，查看每一项的启用方式。

### 使用插件项目设置启用

在项目设置的 **高级设置（Advanced Settings）** 下的 **插件（Plugins）> RenderDoc** 中，启用 **启动时自动附加（Auto attach on startup）** 。如果你希望不论项目在何时加载均在启动时运行RenderDoc，那么此方法非常适合。

![RenderDoc插件设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73808a95-bc35-45e1-8bb9-f68dbcf29ee2/enable-auto-attach-projectsettings.png)

### 通过命令行启用

使用编辑器快捷方式启用命令行参数。在 **快捷方式（Shortcut）** 选项卡中，将以下内容添加到 **目标（Target）** 行：`-AttachRenderDoc` 。如果你只希望在某些时候运行RenderDoc，此方法非常适合。

![RenderDoc项目快捷方式示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6aac9beb-71b1-403b-8235-0c6bdc8526ef/attachrenderdoc-commandline.png)

## 执行帧采集

以下步骤详细介绍如何使用集成的RenderDoc插件或直接在RenderDoc应用程序中对虚幻引擎项目执行单帧采集。

欲知RenderDoc功能和使用的详细信息，请参阅[RenderDoc文档](https://renderdoc.org/docs)。

### RenderDoc插件

以下是使用虚幻引擎的RenderDoc插件进行帧采集的步骤：

1.  为你的项目启用RenderDoc插件。
2.  打开需要执行采集的项目和场景。
3.  在关卡视口中点击 **RenderDoc采集（RenderDoc Capture）** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/931782b1-5e7f-4b09-9702-99f8210dfcb4/enablingrenderdoc_2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/931782b1-5e7f-4b09-9702-99f8210dfcb4/enablingrenderdoc_2.png)
    
    点击查看大图。
    

### RenderDoc应用程序

以下是使用虚幻引擎以及独立版RenderDoc进行帧采集的步骤（进阶版）：

1.  使用对应的命令行参数来配置RenderDoc启动游戏或UEEditor.exe。
    
    启动UEEditor.exe时启用 **采集子进程（Capture Child Processes）** 。
    
2.  启动可执行文件。
3.  按下 **F12** 热键执行帧采集。

欲知设置RenderDoc、启动应用程序和执行帧采集的详细信息，请参阅[RenderDoc入门指南](https://renderdoc.org/docs/getting_started/quick_start.html)。

## 项目设置

在项目设置（Project Settings）窗口中设置RenderDoc插件的其他选项。在主菜单中，选择 **编辑（Edit）** > **项目设置（Project Settings）** ，然后在 **插件（Plugins）** 类目下选择 **RenderDoc** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07e52228-d1db-4fd7-8610-842ff8c9ed9e/renderdoc_projectsettings.png)

属性

描述

帧采集设置（Frame Capture Settings）

 

**采集所有活动（Capture all activity）**

启用后，RenderDoc将采集整个帧过程中所有视口和编辑器窗口中的所有活动，而不仅是当前视口中的活动。

**采集所有调用堆栈（Capture all call stacks）**

启用后，RenderDoc将采集所有API调用的调用堆栈。

**引用所有资源（Reference all resources）**

启用后，RenderDoc将包括采集中的所有渲染资源，甚至包括帧过程期间未使用的资源。

启用此属性会极大增加采集内容的容量。

**保存所有初始状态（Save all initial states）**

启用后，RenderDoc将始终采集所有渲染资源的初始状态，即使这些渲染资源不大可能在帧过程中使用也同样如此。

启用此属性会极大增加采集内容的容量。

高级设置（Advanced Settings）

 

**启动时显示帮助（Show help on startup）**

启用后，RenderDoc的帮助窗口将在编辑器启动时显示。

**使用RenderDoc崩溃处理器（Use the RenderDoc crash handler）**

启用后，发生崩溃时将使用RenderDoc崩溃处理器。

建议在你了解RenderDoc应用程序存在问题并想要通知RenderDoc开发人员时才使用此设置。

**RenderDoc可执行文件路径（RenderDoc executable path）**

设置要使用的RenderDoc可执行文件的路径。

安装RenderDoc时，它应自动填写正确路径。

## 其他注释和资源

-   欲知有关RenderDoc使用和帧采集分析的更多内容，请参阅[RenderDoc文档](https://renderdoc.org/docs)。
-   RenderDoc插件由Fredrik Lindh（"Temaran"）为虚幻引擎独家开发。欲知更多信息，请参阅RenderDoc的[GitHub仓库](https://github.com/Temaran/UE4RenderDocPlugin)。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [安装RenderDoc](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine#%E5%AE%89%E8%A3%85renderdoc)
-   [在你的项目中启用RenderDoc](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine#%E5%9C%A8%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%90%AF%E7%94%A8renderdoc)
-   [使用插件项目设置启用](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine#%E4%BD%BF%E7%94%A8%E6%8F%92%E4%BB%B6%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE%E5%90%AF%E7%94%A8)
-   [通过命令行启用](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine#%E9%80%9A%E8%BF%87%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%90%AF%E7%94%A8)
-   [执行帧采集](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine#%E6%89%A7%E8%A1%8C%E5%B8%A7%E9%87%87%E9%9B%86)
-   [RenderDoc插件](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine#renderdoc%E6%8F%92%E4%BB%B6)
-   [RenderDoc应用程序](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine#renderdoc%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F)
-   [项目设置](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine#%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [其他注释和资源](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine#%E5%85%B6%E4%BB%96%E6%B3%A8%E9%87%8A%E5%92%8C%E8%B5%84%E6%BA%90)