# 虚幻引擎地形噪点工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-noise-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:12:23.243Z

---

目录

![地形噪点工具](https://dev.epicgames.com/community/api/documentation/image/88dad8df-465b-4001-ba4e-4c209b0d1c67?resizing_type=fill&width=1920&height=335)

**噪点** 工具将应用一个 噪点过滤器，在地形高度图表面生成各种变化效果。

## 使用噪点工具

在此例中，噪点工具用于在地形上进行绘制，与造型工具的使用方法相似。这样便能基于工具设置升高和降低高度图，在区域上绘制出多样性。 用户能够利用这个工具在地形上绘制出明显或微妙的多样性。

可使用以下功能键为地形高度图打造噪点效果：

**功能键**

**操作**

**鼠标左键**

增加高度图或所选图层的权重。

![之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe9176c8-9286-40c3-b2b0-79ece3c29563/01-before-noise.png "Before")

![之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd6ac311-d9a6-4c15-b381-0484b52449d9/02-after-noise.png "After")

之前

之后

在此例中，噪点被绘制到平滑的地形表面上，基于使用的强度和属性值形成不同高度上的多样性。

## 工具设置

 

 

![Noise Tool](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07b6c477-042a-445c-b069-7f16abf786f6/03-noise-tool.png "Noise Tool")

![Noise Tool Properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1c0abc2-b47b-4c9d-8d27-63a0f0edb420/04-noise-tool-properties.png "Noise Tool Properties")

**属性**

**描述**

**Tool Strength**

设定每次笔刷笔划效果的量。

**Use Target Value**

勾选后，将对应用至目标值的噪点值进行混合。

**Noise Mode**

确定是否应用所有噪点效果、确定噪点效果只使高度图上升，或只使高度图下降。

-   **Both**：点击鼠标时此项将升高和降低 噪点 在高度图上的绘制值。
-   **Raise**：点击鼠标时此项将升高 噪点 在高度图上的绘制值。
-   **Lower**：点击鼠标时此项将降低 噪点 在高度图上的绘制值。

**Noise Scale**

使用的柏林噪点过滤器尺寸。噪点过滤器与位置和比例有关，如不改变 **Noise Scale**，同一噪点过滤器将多次应用到相同位置。

笔刷强度决定使用噪点工具时升高或降低的量。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用噪点工具](/documentation/zh-cn/unreal-engine/landscape-noise-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%99%AA%E7%82%B9%E5%B7%A5%E5%85%B7)
-   [工具设置](/documentation/zh-cn/unreal-engine/landscape-noise-tool-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)