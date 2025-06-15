# 虚幻引擎地形平滑工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-smooth-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:13:00.073Z

---

目录

![地形平滑工具](https://dev.epicgames.com/community/api/documentation/image/695580d1-bec5-4189-a9c4-67d3726f94f3?resizing_type=fill&width=1920&height=335)

**平滑（Smooth）** 工具能够柔化高度图绘制值，消除使用造型或侵蚀工具后有时会出现的锯齿穿帮，使地形的外观平滑流畅。

## 使用平滑工具

在此例中，平滑工具将用于柔化使用诸多地形工具时可能出现的硬边穿帮。

可使用以下功能键打造地形高度图：

**功能键**

**操作**

**鼠标左键**

平滑并柔化高度图或所选图层的权重。

![平滑前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/002b9f74-c847-4fbd-a1dc-cae36571607a/01-before-smoothing.png "Before Smoothing")

![平滑后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2af208b6-1c5c-4808-9624-8c5195aa84a2/02-after-smoothing.png "After Smoothing")

平滑前

平滑后

笔刷强度决定使用平滑工具时执行平滑的强度。

## 工具设置

![Landscape Smooth Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74e6e503-d8bd-4c7e-bf9a-a9c52814c29b/03-landscape-smooth-button.png "Landscape Smooth Button")

![Smooth Tool Properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c92a5b4-e998-4911-958f-336ec0ad0336/04-smooth-tool-properties.png "Smooth Tool Properties")

 

 

**属性**

**描述**

**Tool Strength**

设定每次笔刷笔划的平滑量。

**Filter Kernel Scale**

设置执行平滑的半径中平滑过滤核的标度乘数。数值越高，平滑掉的细节越大；数值越低，平滑掉的细节越小。

**Detail Smooth**

勾选后，使用指定的细节平滑值进行保留细节的平滑操作。细节平滑值越大，更多细节将被移除；而数值越小，更多细节将被保留。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用平滑工具](/documentation/zh-cn/unreal-engine/landscape-smooth-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%B9%B3%E6%BB%91%E5%B7%A5%E5%85%B7)
-   [工具设置](/documentation/zh-cn/unreal-engine/landscape-smooth-tool-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)