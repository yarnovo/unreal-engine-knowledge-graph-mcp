# 在虚幻引擎中使用Unreal Stage应用程序的细节选项卡 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-unreal-stage-app-details-tab-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:59.263Z

---

目录

![使用Unreal Stage应用程序的细节选项卡](https://dev.epicgames.com/community/api/documentation/image/6906ebb6-fdab-4f97-859d-71c8d9dbdd1b?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 细节选项卡的属性

细节选项卡的可用属性与桌面端虚幻引擎场景中的对应属性一致，并会根据所选内容的类型而有所不同。

### 发光板和标记

针对发光板（Light Card）和标记（Flag），可用的属性如下：

-   **颜色（Color）**
    -   RGB或HSV值。
-   **方向（Orientation）：**
-   **遮罩（Mask）**
    -   针对发光板切换圆形或方形遮罩
-   **X轴缩放和Y轴缩放（Scale X and Scale Y）**
    -   与使用捏合缩放调整大小相比，滑块可以提供更精确的控制
-   **经度和纬度（Latitude and Longitude）**
-   **经度（Longitude）**
    -   与纯触碰相比，滑块可提供精确的放置和定位控制
-   **旋转（Spin）**
    -   与纯触碰相比，滑块可提供更精确的旋转控制
-   **外观（Appearance）：**
    -   **温度（Temperature）**
    -   **色调（Tint）**
    -   **增益（Gain）**
    -   **不透明度（Opacity）**
    -   **羽化（Feathering）**
    -   **曝光（Exposure）**
        -   曝光的控制由方便的按钮提供，包括四分之一档、半档和全档增量。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bde39cfd-0570-49c1-9ffa-c772757f637d/details-1.gif)

### \* 颜色校正区域和窗口

颜色校正窗口的可用属性如下：

-   色彩分级（Color Grading）
-   RGB或HSV值
-   色彩分级模式（Color Grading Modes）：
    -   **全局（Global）**
    -   **阴影（Shadows）**
    -   **中间色调（Midtones）**
    -   **高光（Highlights）**
-   色彩分级属性（每种模式均可用）：
    -   **饱和度（Saturation）**
    -   **对比度（Contrast）**
    -   **伽马（Gamma）**
    -   **增益（Gain）**
    -   **偏移（Offset）**
-   方向（Orientation）：
    -   遮罩（Mask）
        -   针对颜色校正窗口切换圆形或方形遮罩
    -   X轴缩放和Y轴缩放（Scale X and Scale Y）\*\*
        -   与捏合缩放相比，滑块可以提供更精细的控制，实现精确的大小调整
    -   经度和纬度（Latitude and Longitude）
        -   滑块可以提供更精细的控制，实现精确的放置和位置调整
    -   **旋转（Spin）**
        -   与纯触碰相比，滑块可以提供更精细的控制，实现精确的旋转。
    -   **径向偏移（Radial Offset）** 沿nDisplay根Actor的原点轴将色彩校正窗口推离/拉离LED体积的演示。这适合用于对场景中处于某些内容之后但同时在其他内容之前（而不是在nDisplay可见场景中所有内容之前）的位置应用色彩分级。
-   外观（Appearance）：
    -   色温（Color Temperature）
    -   色调（Tint）
    -   强度（Intensity）
    -   向内（Inner）
    -   向外（Outer）
    -   衰减（Falloff）

**\*\*颜色校正区域（Color Correct Regions）** 不提供外观功能按钮，因为在Unreal Stage中不存在3D放置工具。 在该应用程序中只能修改色彩分级和外观属性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b85b68a-2f46-43a2-917e-79cc99eb5ace/details-2.gif)

### 预览缩略图

细节（Details）选项卡提供了预览缩略图，供用户边修改属性边在应用程序内预览视觉效果。 你可以将预览缩略图移动到Unreal Stage UI的任意角落或将其收起/最小化。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/331d9e22-4c83-48d6-aea3-8cfcc2ab52d9/details-3.gif)

### 将属性设为具体的值

除滑块外，你还可以双击属性，使用弹出的输入对话框和键盘来修改属性并将其设为具体的值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2265d6f4-731e-465c-a98e-4278f693b5ab/details-4.gif)

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

-   [细节选项卡的属性](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-app-details-tab-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%80%89%E9%A1%B9%E5%8D%A1%E7%9A%84%E5%B1%9E%E6%80%A7)
-   [发光板和标记](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-app-details-tab-in-unreal-engine#%E5%8F%91%E5%85%89%E6%9D%BF%E5%92%8C%E6%A0%87%E8%AE%B0)
-   [\* 颜色校正区域和窗口](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-app-details-tab-in-unreal-engine#*%E9%A2%9C%E8%89%B2%E6%A0%A1%E6%AD%A3%E5%8C%BA%E5%9F%9F%E5%92%8C%E7%AA%97%E5%8F%A3)
-   [预览缩略图](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-app-details-tab-in-unreal-engine#%E9%A2%84%E8%A7%88%E7%BC%A9%E7%95%A5%E5%9B%BE)
-   [将属性设为具体的值](/documentation/zh-cn/unreal-engine/using-the-unreal-stage-app-details-tab-in-unreal-engine#%E5%B0%86%E5%B1%9E%E6%80%A7%E8%AE%BE%E4%B8%BA%E5%85%B7%E4%BD%93%E7%9A%84%E5%80%BC)