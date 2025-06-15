# 虚幻引擎Electric Dreams场景 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/electric-dreams-environment-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:49:10.527Z

---

目录

![Electric Dreams场景](https://dev.epicgames.com/community/api/documentation/image/3e17f190-3fd0-4cf4-9a1c-457147aa18b7?resizing_type=fill&width=1920&height=335)

在 **Electric Dreams场景** 示例项目中，你可以探索我们在2023年GDC大会上State of Unreal主题演讲中展示的场景。在该场景中，我们展示了虚幻引擎5.2中的一些全新试验性功能，包括：

-   [程序化内容生成框架](/documentation/zh-cn/unreal-engine/procedural-content-generation--framework-in-unreal-engine) (PCG)
-   [Substrate材质编写系统](https://dev.epicgames.com/community/learning/courses/92D/unreal-engine-substrate-materials)
-   虚幻引擎物理系统的最新进展

![Electric Dreams Environment](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/311b4305-a69e-498d-bf87-fa7259ca4a83/river-bed.png "Electric Dreams Enviroment")

场景还展示了虚幻引擎5的多个已有功能，包括：

-   [Lumen](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)
-   [Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)
-   [Soundscape](/documentation/zh-cn/unreal-engine/soundscape-in-unreal-engine)

本示例场景属于学习资源，旨在展示"Electric Dreams "虚拟世界是如何同时利用传统流程以及PCG流程构建的；整个场景都在虚幻引擎内直接搭建，并采用了PCG框架。另外，你还可以探索其他功能，例如通过Opal材质示例了解Substrate功能、音频、流体模拟等等。

## 下载项目

要安装Electric Dreams环境示例项目，请按以下步骤操作：

1.  通过 **Fab** 访问Electric Dreams环境示例\](https://fab.com/s/7ee8c5704aaa)，点击 **添加到我的库（Add to My Library）**，让项目文件出现在 **Epic Games启动程序** 中。
    1.  或者，你也可以在UE的Fab插件中搜索该示例项目。
2.  在 **Epic Games启动程序** 中，找到 **虚幻引擎 > 库 > Fab库** 以访问项目。
    
    只有在你安装了兼容的引擎版本时，示例项目才会出现在 **Fab库** 中。
    
3.  点击 **创建项目（Create Project）** 并按照屏幕上的提示下载示例并启动新项目。

关于访问示例内容及虚幻引擎的Fab插件，详见[示例与教程](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)。

## 推荐硬件配置

Electric Dreams场景包含大量图形内容，因此需要高性能显卡以确保帧率稳定。我们推荐将该项目安装在固态硬盘（SSD）上。[Nanite](/documentation/zh-cn/unreal-engine/nanite-virtualized-geometry-in-unreal-engine)和[虚拟纹理](/documentation/zh-cn/unreal-engine/virtual-texturing-in-unreal-engine)需要高速读取才能实现最佳效果。

推荐的硬件配置如下所示：

**推荐硬件配置**

**最低硬件配置**

-   12核CPU，3.4 GHz
-   64 GB的系统RAM
-   GeForce RTX 3080（相同性能或更高性能显卡）
-   至少10 GB的VRAM

-   8核CPU，3.6 GHz
-   32 GB的系统RAM
-   GeForce RTX 2080（相同性能或更高性能显卡）
-   至少8 GB的VRAM

Electric Dreams场景示例要求显卡支持DirectX 12，并将显卡驱动程序更新到最新。

使用较低配置的电脑时，你可以降低分辨率和视口屏幕百分比，从而提升性能和效果。例如使用最低硬件配置时，我们推荐在显示较大场景时，采用1080p的分辨率和50%的屏幕百分比。你可以在编辑器视口左上角的 **视口选项菜单（Viewport Options Menu）** 中使用 **屏幕百分比** 滑块来调整。

![更改视口选项菜单中的屏幕百分比。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de95b140-1e2d-4097-b6d1-34b3b991686b/viewport.png "Viewport Options Menu")

你也可以使用控制台命令 `r.ScreenPercentage` 在运行时设置该值。例如， `r.ScreenPercentage 50` 将屏幕百分比设置为50%。

## 漫游示例场景

打开Electric Dreams项目后，首先会打开启动（Startup）关卡。启动关卡包含一张图片，显示了此示例的使用方法以及推荐硬件配置。

Electric Dreams场景包含多个关卡。要打开其他关卡，请在 **内容浏览器（Content Browser）** 中找到 **内容（Content）> 关卡（Levels）** 。

### 关卡

Electric Dreams场景示例中可用的关卡在下表中如下列示：

**关卡名称**

**说明**

**ElectricDreams\_Env**

该关卡包含完整的Electric Dreams场景。它包含人工创建区域以及用PCG框架以程序化方式创建的区域。此外还包含：

-   Soundscape程序化环境音效
-   流体模拟水坑
-   Substrate材质球
-   Demo序列

**资源开销** ：该关卡是一个禁用了流送功能的世界分区关卡，面积为4 x 4 千米，并含有大量场景内容。

**内容文件路径** ： `/Game/Levels/ElectricDreams_Env`

**ElectricDreams\_PCG**

该关卡相当于一个仅包含程序化内容的Electric Dreams场景。

**资源开销** ：该关卡是一个禁用了流送功能的世界分区关卡，面积为4 x 4 千米，并含有大量场景内容。

**内容文件路径** ： `/Game/Levels/PCG/ElectricDreams_PCG`

**ElectricDreams\_PCGCloseRange**

该关卡是从 ElectricDreams\_PCG 提取的一张较小地图。仅包含程序化生成的河床、溪流，以及大型峭壁结构。

**资源开销** ：该关卡的资源开销较少。

**内容文件路径** ： `/Game/Levels/PCG/ElectricDreams_PCGCloseRange`

**ElectricDreams\_PCGLargeAssembly**

该关卡包含我们在GDC演示中添加的大型峭壁结构，以及构建峭壁所需的所有组件。

**内容文件路径** ： `/Game/Levels/PCG/Breakdown_Levels/ElectricDreams_PCGLargeAssembly`

**ElectricDreams\_PCGDitchAssembly**

该关卡包含基于Spline的沟堑，以及构建沟堑的相关组件。

**内容文件路径** ： `/Game/Levels/PCG/Breakdown_Levels/ElectricDreams_PCGDitchAssembly`

**ElectricDreams\_PCGForest**

该关卡包含一小块地面，以及地面上的参数化PCG森林。

**内容文件路径** ： `/Game/Levels/PCG/Breakdown_Levels/ElectricDreams_PCGForest`

**ElectricDreams\_PCGSplineExample**

该示例演示了如何利用单个Assembly并将其应用于程序化生成的路径上 - 通过PCG图表逻辑来强化原始Assembly。

**内容文件路径** ： `/Game/Levels/PCG/Breakdown_Levels/ElectricDreams_PCGSplineExample`

你可以通过以下方式，在上文所有关卡中操控PCG工具：

-   在 **虚幻编辑器** 中实时交互。
-   **在编辑器中运行（Play-in-Editor）** （PIE）期间交互。
-   通过 **内容浏览器（Content Browser）** 的 **内容（Content）> PCG > 图表（Graphs）** 单独交互。

场景的主区域中还散布着一些说明用的文本Actor，用于介绍各个功能。

![世界中的文本说明Actor。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0cd365b6-96c8-46f2-acf2-1fadc00d70cd/text-actor.png "Text Description Actor")

## Electric Dreams内置操作

### 无人机操控

在此示例的所有关卡中，无论是编辑器PIE模式还是编译好的可执行版本中，你都可以使用操控无人机漫游场景。下表介绍了无人机的操控选项：

**无人机操作**

**手柄**

**键鼠**

**向前移动（Move Forward）**

左摇杆

W

**向后移动（Move Backward）**

左摇杆

S

**向左移动（Move Left）**

左摇杆

A

**向右移动（Move Right）**

左摇杆

D

**察看（Look）**

右摇杆

鼠标移动

**增加海拔（上升）（Altitude Up (Ascend)）**

右扳机

E

**降低海拔（下降）（Altitude Down (Descend)）**

左扳机

Q

**加速（Speed Up）**

右肩键

F

**减速（Speed Down）**

左肩键

R

### 序列快捷方式

在漫游ElectricDreams\_Env关卡时，你可以体验我们在GDC中演示的Electric Dreams影片序列。这些序列可以通过以下键盘快捷键触发：

**序列操作**

**键盘**

**飞过（Fly-Through）**

Shift + C

**PCG中距离（PCG Mid Range）**

Shift + V

**PCG长距离（PCG Long Range）**

Shift + B

**停止播放序列（Stop Playing Sequence）**

空格键

## Electric Dreams中的程序化内容生成

进一步了解Electric Dreams场景示例如何在虚幻引擎中将传统流程和PCG流程相结合。

[](/documentation/zh-cn/unreal-engine/procedural-content-generation-in-electric-dreams)

[![Electric Dreams中的程序化内容生成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aab642b-56b8-4944-849f-a7b1b0f84318/topic-image.png)](/documentation/zh-cn/unreal-engine/procedural-content-generation-in-electric-dreams)

[Electric Dreams中的程序化内容生成](/documentation/zh-cn/unreal-engine/procedural-content-generation-in-electric-dreams)

-   [lumen](https://dev.epicgames.com/community/search?query=lumen)
-   [soundscape](https://dev.epicgames.com/community/search?query=soundscape)
-   [procedural content generation](https://dev.epicgames.com/community/search?query=procedural%20content%20generation)
-   [pcg](https://dev.epicgames.com/community/search?query=pcg)
-   [substrate](https://dev.epicgames.com/community/search?query=substrate)
-   [electric dreams](https://dev.epicgames.com/community/search?query=electric%20dreams)
-   [nanite](https://dev.epicgames.com/community/search?query=nanite)
-   [fab](https://dev.epicgames.com/community/search?query=fab)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [下载项目](/documentation/zh-cn/unreal-engine/electric-dreams-environment-in-unreal-engine#%E4%B8%8B%E8%BD%BD%E9%A1%B9%E7%9B%AE)
-   [推荐硬件配置](/documentation/zh-cn/unreal-engine/electric-dreams-environment-in-unreal-engine#%E6%8E%A8%E8%8D%90%E7%A1%AC%E4%BB%B6%E9%85%8D%E7%BD%AE)
-   [漫游示例场景](/documentation/zh-cn/unreal-engine/electric-dreams-environment-in-unreal-engine#%E6%BC%AB%E6%B8%B8%E7%A4%BA%E4%BE%8B%E5%9C%BA%E6%99%AF)
-   [关卡](/documentation/zh-cn/unreal-engine/electric-dreams-environment-in-unreal-engine#%E5%85%B3%E5%8D%A1)
-   [Electric Dreams内置操作](/documentation/zh-cn/unreal-engine/electric-dreams-environment-in-unreal-engine#electricdreams%E5%86%85%E7%BD%AE%E6%93%8D%E4%BD%9C)
-   [无人机操控](/documentation/zh-cn/unreal-engine/electric-dreams-environment-in-unreal-engine#%E6%97%A0%E4%BA%BA%E6%9C%BA%E6%93%8D%E6%8E%A7)
-   [序列快捷方式](/documentation/zh-cn/unreal-engine/electric-dreams-environment-in-unreal-engine#%E5%BA%8F%E5%88%97%E5%BF%AB%E6%8D%B7%E6%96%B9%E5%BC%8F)
-   [Electric Dreams中的程序化内容生成](/documentation/zh-cn/unreal-engine/electric-dreams-environment-in-unreal-engine#electricdreams%E4%B8%AD%E7%9A%84%E7%A8%8B%E5%BA%8F%E5%8C%96%E5%86%85%E5%AE%B9%E7%94%9F%E6%88%90)