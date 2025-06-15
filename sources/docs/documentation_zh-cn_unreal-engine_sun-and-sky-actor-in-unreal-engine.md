# 虚幻引擎中的太阳和天空Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:15:59.780Z

---

目录

![太阳和天空Actor](https://dev.epicgames.com/community/api/documentation/image/3f5ed74d-4224-47d0-835a-96f26679a52f?resizing_type=fill&width=1920&height=335)

**太阳位置计算器（Sun Position Calculator）** 插件包括[地理位置准确的太阳定位器](/documentation/zh-cn/unreal-engine/geographically-accurate-sun-positioning-tool-in-unreal-engine)，可根据地理位置和日期时间精确控制太阳的位置。**SunSky** Actor是此插件的一部分。它利用相同的数学方程控制太阳在天空中的位置，还包括 **定向光源**、**天空光照**、**SkyAtmosphere** 多个组件，用于产生逼真的渲染，呈现真实形态的阳光和阴影。

借助 **SunSky** Actor，无论怎样的审美选择，都可使用夏令时(DST)、日期、时间的设置简单快捷地设置场景。设计用于游戏和其他行业，例如建筑、工程和施工(AEC)或汽车、产品设计和制造。

## 项目模板和设置

[创建新项目](/documentation/zh-cn/unreal-engine/working-with-projects-and-templates-in-unreal-engine)时，你可以根据需要选择各种行业类型和模板。

根据所选模板，会默认禁用/启用某些属性。这些属性会影响SunSky Actor的外观和功能。

选择 **模板类别（Template Category）** 和 **模板（Template）** 时，记住以下两点：

-   需对 **在自动曝光设置中延伸默认亮度范围（Extend default luminance range in Auto Exposure settings）** 进行项目设置，以便正确显示此SunSKy Actor，无需编辑属性。
-   每个模板类别的某些模板默认启用太阳位置计算器。可转到 **主菜单**，选择 **编辑（Edit）> 插件（Plugins）** 并搜索此插件，或在打开新项目时搜索此插件来验证这一点。

本文演示了如何在虚幻引擎（UE）的建筑可视化模板钟使用太阳和天空Actor。如需使用该模板，只需新建一个项目，然后选择 **建筑、工程和施工** 新项目类型，然后选择建筑可视化模板。

## 启用太阳位置计算器插件

1.  从主菜单选择 **编辑（Edit）> 插件（Plugins）**。
    
2.  在 **杂项（Misc）** 类别下找到 **太阳位置计算器（Sun Position Calculator）** 插件，并选中 **启用（Enabled）** 复选框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fbafb43-9f95-4d5e-bcd7-4191c7c0e640/01-sunsky-plugin-enable-plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fbafb43-9f95-4d5e-bcd7-4191c7c0e640/01-sunsky-plugin-enable-plugin.png)
    
    点击查看大图
    
3.  单击 **立即重启（Restart Now）** 按钮以应用更改并重新打开虚幻编辑器。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47c2267c-13c3-4be8-aae3-fcf663fe72c2/02-sunsky-plugin-rerun-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47c2267c-13c3-4be8-aae3-fcf663fe72c2/02-sunsky-plugin-rerun-editor.png)
    
    点击查看大图
    

## 使用Sun and Sky Actor

启用太阳位置计算器插件后，将在编辑器 **放置Actor（Place Actors）** 面板中的 **光源（Lights）** 选项卡中找到名为 **Sun and Sky** 的新Actor。

![名为Sun And Sky的新Actor出现在放置Actor面板中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53c489b9-c067-4712-b732-143ea7ddd521/03-sunsky-plugin-available-actor.png)

拖放到关卡视口中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1bc27f9b-1011-48a4-8d48-bda80f4f2a5c/04-sunsky-plugin-place-actor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1bc27f9b-1011-48a4-8d48-bda80f4f2a5c/04-sunsky-plugin-place-actor.png)

Click image for full size.

将SunSky Actor添加到场景时，最好删除任何已有的定向光源、天空光照和SkyAtmosphere组件。否则，若从头开始，最好从全新的空白关卡开始。

将SunSky Actor拖至关卡时，将显示为亮白色，可执行以下操作之一：

-   在项目设置（Project Settings）中的渲染（Rendering）类别下（位于默认分段下）启用 **在自动曝光设置中延伸默认亮度范围（Extend default luminance range in Auto Exposure settings）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/894eca82-76db-445c-97cc-fc2eb706b820/05-sunsky-plugin-project-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/894eca82-76db-445c-97cc-fc2eb706b820/05-sunsky-plugin-project-settings.png)
    
    Click image for full size.
    
-   或者，若不希望此项目设置影响项目外观，可选择SunSky Actor的定向光源并使用较低光照强度（打开SunSky Actor，在"组件"下选择"定向光源"，找到"细节"面板中的"光源"分段，降低"强度"直至满意为止）。
    
    ![设置定向光源强度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3da6c8e9-7445-422a-abee-a2fac4390d6f/06-sunsky-plugin-intensity.png)

SunSky Actor包含定向光源、天空光照和SkyAtmosphere组件的可移动Actor，作为蓝图的一部分。选择场景组件 **SunSky(Self)** 后，将显示公开的蓝图属性，例如日期、时间、纬度、经度的属性，这些属性可进行设置。选择单个组件，例如定向光源或SkyAtmosphere组件，将显示自身属性。这些属性，如移动性和强度，也可以进行设置。

![SunSky Actor组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/586bb045-8e93-4e74-89f7-81901c527082/07-sunsky-plugin-sunsky-details.png)

## 属性和设置

可在SunSky Actor的 **详细信息（Details）** 面板中找到以下可调节属性。

![SunSky Actor组件属性集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8902e7ae-e2b3-4b14-bc93-831408fd8ac8/08-sunsky-plugin-sunsky-properties.png)

由于 **（变换）Transformation** 属性是Actor的标准属性，所以我们在下表中省略了它们。

属性

说明

位置（Location）

 

**纬度（Latitude）**

赤道以北或以南的度数。

**经度（Longitude）**

本初子午线以东或以西的度数。

**\*时区（Time Zone）**

世界上特定地区的特定时间。时区使用GMT作为基准。

**北偏移（North Offset）**

为SunSky Actor及其组件设置北方方向位置。

日期（Date）

 

**月（Month）**

设置当前月份。

**日（Day）**

设置当前日期。

**使用夏令时（Use Daylight Saving Time）**

启用夏令时(DST)。

**DST起始月份（DST Start Month）**

设置当前年度DST起始的月份。

**DST起始日期（DST Start Day）**

设置当前年度DST起始的日期。

**DST终止月份（DST End Month）**

设置当前年度DST终止的月份。

**DST终止日期（DST End Month）**

设置当前年度DST终止的日期。

**DST Switch Hour**

设置DST的起始时间和终止时间。

时间（Time）

 

**太阳时（Solar Time）**

设置一天当中的时间。

输入此值，作为军用时间的浮点。例如，上午12:30为00.5，下午12:30为12.5。

## ArchVis模板关卡示例

创建项目时，**建筑、工程和施工（Architecture, Engineering, and Construction）** 的模板类别包括名为 **ArchVis** 的模板。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a5ecb23-c0fa-46b7-9218-0cfff6e3d696/09-sunsky-plugin-archvis-template.png)

此模板项目专门用于架构可视化工作流，包括太阳研究、室内渲染和非真实感风格渲染的示例。包括以下已设置使用的资源：

-   多个包含场景设置的关卡，此类设置用于利用SunSky Actor演示物理准确光照的可视化。
-   光照配置和后期处理体积，已为启用光线追踪的项目设置光线追踪功能。
-   用于渲染场景的示例摄像机和Sequencer。这些还包括动态时间转换。

此模板还支持[Datasmith插件](/documentation/zh-cn/unreal-engine/datasmith-import-process-in-unreal-engine)，它是一组用于将3ds Max、CAD软件等离线渲染应用程序中创建的场景和资源导入实时引擎的工具和插件。

### 外部

**外部** 关卡演示SunSky Actor的使用，其中使用多个摄像机和Sequencer来演示在场景各个位置之间移动时的时间序列。可在 `Content/ArchVisProject` 文件夹中找到。

它还使用SunSky Actor组件，此类组件正用于[动态照亮场景](/documentation/zh-cn/unreal-engine/movable-light-mobility-in-unreal-engine)。为项目启用各种实时[光线追踪](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)功能后，它还将演示此类功能。

### 内部

**内部** 关卡演示SunSky Actor组件的使用，此类组件正用于使用[预计算静态照明](/documentation/zh-cn/unreal-engine/static-light-mobility-in-unreal-engine)照亮场景。可在 `Content/ArchVisProject` 文件夹中找到。

这包括：

-   使用[全局照明](/documentation/zh-cn/unreal-engine/global-illumination-in-unreal-engine)生成场景的烘焙全局照明和光照。
-   使用[全局光照重要体积](/documentation/zh-cn/unreal-engine/lightmass-basics-in-unreal-engine)和[全局光照门户](/documentation/zh-cn/unreal-engine/lightmass-portals-in-unreal-engine)来控制和聚焦全局光照发出光子的区域。

## 其他说明

-   在SunSky Actor上，默认为定向光源和天空光照默认启用[光线追踪](/documentation/zh-cn/unreal-engine/hardware-ray-tracing-in-unreal-engine)功能，以便两者都支持光线追踪阴影的投射。
-   可手动更改SunSky Actor中的定向光源旋转值。但更改会影响SunSky Actor其他部分的其他设置时，手动调整的旋转值将重置为默认位置。这可防止值与地理位置计算思路相冲突。
-   天光Actor（SkyLight）现在会默认启用"实时采集"模式。这应该有助于你更好地捕获SkyAtmosphere组件、体积云、高度雾等。请注意，该模式只有在使用动态或固定模式才可用。如果你希望禁用实时采集模式，只需选中天光Actor，找到细节面板，然后取消勾选"光照"分段顶部的"实时采集"复选框。

## 其他资源

-   在网站[LatLong.net](http://www.LatLong.net)中输入位置名称，它将返回地图视图及其纬经度坐标。
-   网站[TimeAndDate.com](http://www.TimeAndDate.com)具有专门用于[时区地图](https://www.timeanddate.com/time/map/)的区域，这对于确定设置SunSky Actor使用的时区非常有用。默认使用-5 GMT。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [artist tool](https://dev.epicgames.com/community/search?query=artist%20tool)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [visualization](https://dev.epicgames.com/community/search?query=visualization)
-   [environmental lighting](https://dev.epicgames.com/community/search?query=environmental%20lighting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [项目模板和设置](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine#%E9%A1%B9%E7%9B%AE%E6%A8%A1%E6%9D%BF%E5%92%8C%E8%AE%BE%E7%BD%AE)
-   [启用太阳位置计算器插件](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%A4%AA%E9%98%B3%E4%BD%8D%E7%BD%AE%E8%AE%A1%E7%AE%97%E5%99%A8%E6%8F%92%E4%BB%B6)
-   [使用Sun and Sky Actor](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine#%E4%BD%BF%E7%94%A8sunandskyactor)
-   [属性和设置](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%92%8C%E8%AE%BE%E7%BD%AE)
-   [ArchVis模板关卡示例](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine#archvis%E6%A8%A1%E6%9D%BF%E5%85%B3%E5%8D%A1%E7%A4%BA%E4%BE%8B)
-   [外部](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine#%E5%A4%96%E9%83%A8)
-   [内部](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine#%E5%86%85%E9%83%A8)
-   [其他说明](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%AF%B4%E6%98%8E)
-   [其他资源](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)

相关文档

[

天空大气组件

![天空大气组件](https://dev.epicgames.com/community/api/documentation/image/7e09f97c-fad2-4d77-9cd1-55a4e79e8ce5?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/sky-atmosphere-component-in-unreal-engine)