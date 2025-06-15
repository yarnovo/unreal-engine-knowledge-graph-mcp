# 虚幻引擎中的地形侵蚀工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-erosion-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:12:29.989Z

---

目录

![地形侵蚀工具](https://dev.epicgames.com/community/api/documentation/image/c6e469cf-a6f0-4bec-815c-c3730900323a?resizing_type=fill&width=1920&height=335)

**侵蚀（Erosion）** 工具利用热力侵蚀模拟调整地形高度图的高度。它模拟土壤被自然力量从高处移动向低处的效果。 高低落差越大，产生的侵蚀效果越强。该工具还可在侵蚀上应用 noise 效果，呈现出自然真实的随机外貌。

## 使用侵蚀工具

在此例中，侵蚀工具将用于山峰面的前面和背面。正面的坡度不够陡峭，因此所用的设置不会对表面形成快速的侵蚀。 然而背面的坡度较为陡峭，侵蚀效果则更为迅速。

可使用以下功能键为地形高度图打造侵蚀效果：

**功能键**

**操作**

**Left Mouse Button**

将升高、降低、或两者皆有的侵蚀值应用到高度图。

![使用前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5eb601f-d1c7-46f5-9518-2c7b58792ee8/01-before-erosion.png "Before")

![使用后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13338e0e-319e-4145-9d38-8314edb39c4a/02-after-erosion.png "After")

使用前

使用后

在此例中，侵蚀使用绘制到山坡上的 noise 来升高或降低表面，基于用于驱动所应用侵蚀的强度和诸多属性值 在不同的个高度形成效果的变化。

## 工具设置

 

 

![Erosion Tool](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b776728-dc05-48b8-b241-1cb7ad745dcc/03-erosion-tool.png)

![Erosion Tool Properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1000bbd-8d82-48dd-b402-842fd904d17a/04-erosion-tool-properties.png)

**属性**

**描述**

**Tool Strength**

设定每次笔刷笔划效果的量。

**Threshold**

产生侵蚀效果的最低高度差。数值越小，侵蚀效果越强。

**Surface Thickness**

设置图层权重侵蚀效果的地表厚度。

**Iterations**

执行的迭代次数。数值越大，生成的侵蚀层数越多。

**Noise Mode**

确定是否应用 noise 提升或降低（或执行两项操作）高度图。

-   **Both**：升高和降低应用到高度图的所有侵蚀效果的数值。
-   **Raise**：应用升高高度图的侵蚀效果。
-   **Lower**：应用降低高度图的侵蚀效果。

**Noise Scale**

使用的 noise 过滤器尺寸。Noise 过滤器与位置和比例有关，如不改变 **Noise Scale**，同一 noise 过滤器将多次应用到相同位置。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用侵蚀工具](/documentation/zh-cn/unreal-engine/landscape-erosion-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%BE%B5%E8%9A%80%E5%B7%A5%E5%85%B7)
-   [工具设置](/documentation/zh-cn/unreal-engine/landscape-erosion-tool-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)