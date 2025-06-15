# 在虚幻引擎中使用Unreal Stage应用程序的舞台选项卡 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-stage-tab-with-the-unreal-stage-app-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:59.795Z

---

目录

![使用Unreal Stage应用程序的舞台选项卡](https://dev.epicgames.com/community/api/documentation/image/3de2438b-9434-4f97-a78d-b9c9c3878255?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 编辑器预览

"舞台（Stage）"选项卡通过触碰式、交互式的ICVFX内容，在LED墙上显示nDisplay输出的实时预览。 这与虚幻引擎的nDisplay编辑器预览和桌面端的ICVFX编辑器中显示的预览相同。

### 视图选项

你可以通过下拉菜单开关nDisplay编辑器预览的视图。 视图有四个选项：

-   **圆顶（Dome）**
    -   针对带天花板的半球形LED体积最常用视图选项
-   **正交（Orthographic）** 针对半球形舞台的另一种常用投影选项
-   **透视（Perspective）**
    -   通常最适用于平面LED墙的配置
-   **UV**
    -   LED体积的扁平化表示，可以更轻松地同时显示墙壁和天花板，并且需要为nDisplay配置网格体设置次级UV

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e31aba5d-31cf-436d-bab5-1a2934a40df3/stagetab-1.gif)

### 寻路

你可以在预览中寻路以准确查看所需内容。 与预览的交互如下：

-   **捏合缩放（Pinch Zoom）**
    -   放大或缩小预览
-   **单指（One Finger）**
    -   滚动预览
-   **双指（Two Fingers）**
    -   平移预览

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f01bf8c-8f19-4174-b4da-fd6a8f7941b1/stagetab-2.gif)

## 内容控制

虚幻引擎ICVFX编辑器中可放置的ICVFX内容，也可以通过Unreal Stage进行放置：

-   发光板
-   标记
-   色彩校正窗口
-   色键卡
-   模板

### 放置Actor

使用右上角的"添加（Add）"按钮即可在默认位置（可以是在屏幕外）添加新内容。 按住"舞台（Stage）"选项卡中的特定位置，也可以在该位置精确添加内容。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75d9dfad-87f4-43bb-900a-4a451b8980e2/stagetab-3.gif)

### 定位和重新定位内容

可以使用单根手指按住对象直到选中，从而重新定位场景中放置的ICVFX内容。这时你就可以通过触碰将其自由拖动，并放置在想要的位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cebab5d-a2ea-4f26-809b-a13d7c81c1b0/stagetab-4.gif)

### 对象模式

对象模式（Object Mode）让你能对对象进行除放置之外的进一步修改。使用先前提过的按住操作，选择内容并切换到对象模式。在对象模式下，功能按钮将仅关注所选的内容，让你可以快速轻松地进行更改，而不会意外地修改场景中的其他内容。捏合缩放将缩放所选对象的大小。在对象模式下，你还可以快速重新定位所选的内容，方法是点击屏幕上的任意位置以将其抓取，然后将其拖动到所需位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbbf982c-79d5-4c4f-b2c0-962f3a376d03/stagetab-5.gif)

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

-   [编辑器预览](/documentation/zh-cn/unreal-engine/using-the-stage-tab-with-the-unreal-stage-app-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E9%A2%84%E8%A7%88)
-   [视图选项](/documentation/zh-cn/unreal-engine/using-the-stage-tab-with-the-unreal-stage-app-in-unreal-engine#%E8%A7%86%E5%9B%BE%E9%80%89%E9%A1%B9)
-   [寻路](/documentation/zh-cn/unreal-engine/using-the-stage-tab-with-the-unreal-stage-app-in-unreal-engine#%E5%AF%BB%E8%B7%AF)
-   [内容控制](/documentation/zh-cn/unreal-engine/using-the-stage-tab-with-the-unreal-stage-app-in-unreal-engine#%E5%86%85%E5%AE%B9%E6%8E%A7%E5%88%B6)
-   [放置Actor](/documentation/zh-cn/unreal-engine/using-the-stage-tab-with-the-unreal-stage-app-in-unreal-engine#%E6%94%BE%E7%BD%AEactor)
-   [定位和重新定位内容](/documentation/zh-cn/unreal-engine/using-the-stage-tab-with-the-unreal-stage-app-in-unreal-engine#%E5%AE%9A%E4%BD%8D%E5%92%8C%E9%87%8D%E6%96%B0%E5%AE%9A%E4%BD%8D%E5%86%85%E5%AE%B9)
-   [对象模式](/documentation/zh-cn/unreal-engine/using-the-stage-tab-with-the-unreal-stage-app-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E6%A8%A1%E5%BC%8F)