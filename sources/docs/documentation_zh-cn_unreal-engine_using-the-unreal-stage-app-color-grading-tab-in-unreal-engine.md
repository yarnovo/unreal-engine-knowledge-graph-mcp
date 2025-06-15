# 在虚幻引擎中使用Unreal Stage应用程序的色彩分级选项卡 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-unreal-stage-app-color-grading-tab-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:27:01.690Z

---

目录

![使用Unreal Stage应用程序的色彩分级选项卡](https://dev.epicgames.com/community/api/documentation/image/fbe50e76-6f98-41d8-a0c1-0e79e400fc3e?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 色彩分级

nDisplay的色彩分级（Color Grading）选项卡让你能够像在ICVFX编辑器中那样对整个nDisplay群集进行色彩分级操作。 你既可以对整个群集或单个视口进行色彩分级，也可以根据需求对任何ICVFX摄像机（复数）按节点粒度进行色彩分级。

## 大纲视图

在nDisplay色彩分级选项卡上，修改后的大纲视图将显示两个窗格，而非一个窗格：

-   色彩分级大纲视图
    -   此处将显示关卡中所有可进行色彩分级的内容，包括nDisplay根Actor和后期处理体积等。
    -   ICVFX摄像机组件位于相应的nDisplay根Actor下方。选择根Actor即可对视口和摄像机进行色彩分级。
-   逐视口/逐节点的色彩分级
    -   逐视口（针对外视口）和逐节点（针对内视锥体）的色彩分级都可以在虚幻引擎中定义，并在此处显示为选项，从而对LED体积的特定区域（如天花板等）进行色彩分级。
    -   目前还无法在Unreal Stage中直接创建或修改逐视口和逐节点的配置，但我们计划在未来版本中加入此功能。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93509c2f-7437-4cb4-be91-760c3b64040c/colorgrading-1.gif)

## 预览缩略图

色彩分级（Color Grading）选项卡提供了预览缩略图，供用户在修改属性时在应用程序内预览视觉效果。 你可以将预览缩略图移动到Unreal Stage UI的任意角落或将其收起/最小化。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e68e0e2-ab57-4879-861d-d3cd253bee76/colorgrading-2.gif)

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [色彩分级](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-app-color-grading-tab-in-unreal-engine#%E8%89%B2%E5%BD%A9%E5%88%86%E7%BA%A7)
-   [大纲视图](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-app-color-grading-tab-in-unreal-engine#%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE)
-   [预览缩略图](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-app-color-grading-tab-in-unreal-engine#%E9%A2%84%E8%A7%88%E7%BC%A9%E7%95%A5%E5%9B%BE)