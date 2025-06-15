# 在虚幻引擎中使用像素法线偏移实现折射 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/refraction-using-pixel-normal-offset-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:29:42.782Z

---

目录

![使用像素法线偏移实现折射](https://dev.epicgames.com/community/api/documentation/image/305f2115-c55e-4025-a99d-8058d7f3ad9e?resizing_type=fill&width=1920&height=335)

默认情况下，虚幻引擎会使用基于物理的折射模型，此模型衍生自 **折射率（Index of Refraction）** 值。物理 **折射率（Index of Refraction）** 模型模拟了光线在介质之间传播时的折射方式。这非常适合小物体，例如罐子、玻璃杯和其他曲面。 但是，用于较大的平面时，可能会产生不可预测的结果和瑕疵，因为场景颜色是从屏幕之外读取的。

**像素法线偏移（Pixel Normal Offset）** 是[材质编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)中提供的另一种折射模式。它使用顶点法线作为参考，然后通过计算每个像素的法线与顶点法线的差异程度，从而算出折射偏移。这很适合较大的平面，比如水面，因为你不需要用常量偏移来从屏幕之外读取数据。

## 物理和非物理折射模型

你可以在细节（Details）面板中更改材质的 **折射模式（Refraction Mode）** 。 向下滚动并展开 **折射（Refraction）** 分段，然后从折射模式下拉菜单的两个选项中选择。 所有材质默认使用 **折射率（Index of Refraction）** 。

你可以阅读[使用折射](/documentation/zh-cn/unreal-engine/using-refraction-in-unreal-engine)页面，了解折射物理模型的更多内容，以及如何结合材质使用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3876862-438a-4bdf-a2ac-6afa68703dd6/refraction-mode-ior.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6db0ef15-f5b8-4f40-b060-8e1353246969/refraction-mode-pno.png)

折射设置物理模型：折射率

折射设置的非物理模型：像素法线偏移

下面的比较演示了在折射模式从 **折射率（Index of Refraction）** 更改为 **像素法线偏移（Pixel Normal Offset）** 时材质中读取法线的方式有何不同。

![折射模式：折射率，无法线贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae0a43ed-fa56-45a0-ad03-2a2584870f7a/ior_withoutnormals.png)

![折射模式：像素法线偏移，无法线贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5095ed54-9124-4fc7-bc90-4acc07e32eb1/pno_withoutnormals.png)

折射模式：折射率，无法线贴图

折射模式：像素法线偏移，无法线贴图

在这里你会法线，与 **像素法线偏移（Pixel Normal Offset）** 模式相比，使用 **折射率（Index of Refraction）** 模式时，图像会发生偏移，因为你不会从屏幕外读取那么多内容。 \*折射率（Index of Refraction） **模式在没有法线贴图插入材质的情况下也能工作，而在** 像素法线偏移（Pixel Normal Offset）\*\* 模式下，如果没有法线贴图，你将不会得到任何折射。

![折射模式： 折射率带法线贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d38f1175-3716-4dcb-b763-3c609709dfeb/ior_withnormals.png)

![折射模式： 像素法线偏移带带法线贴图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a4918aa-350a-414b-8236-01494fe4acdd/pno_withnormals.png)

折射模式： 折射率带法线贴图

折射模式： 像素法线偏移带带法线贴图

为材质添加法线贴图时，如果折射参数的值大于 1，使用 **像素法线偏移（Pixel Normal Offset）** 后法线将沿表面平移。 然而，你会注意到，使用 **折射率（Index of Refraction）** 后，仍然会从屏幕外读取偏移，对使用折射的平面而言并非理想效果。

## 最终结果

在此示例中，折射量在值 1.0（完全无折射）到 2.0 之间调整， 使用 **像素法线偏移（Pixel Normal Offset）** 时沿表面形成一些折射而不使图像发生移位。

## 像素法线偏移和玻璃

像素法线偏移也很适合较大的扁平玻璃表面，例如下面的咖啡馆场景中的窗户。 幻灯片中的第一张图使用了默认的 **折射率（Index of Refraction）** 设置。 窗户折射很混乱，并且右下角有一个瑕疵。 折射率更改为 **像素法线偏移（Pixel Normal Offset）** 时，窗户看起来逼真得多，瑕疵也消失了。

 ![移动幻灯片，查看当折射模式从折射率（图1）更改为像素法线偏移（图2）时玻璃会发生怎样的变化。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62e98b95-31ae-40dc-932b-c8bc7adea150/bistro-glass-ior.png) ![移动幻灯片，查看当折射模式从折射率（图1）更改为像素法线偏移（图2）时玻璃会发生怎样的变化。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd590538-43b3-47ed-a3b2-4b89d1457541/bistro-glass-pixel-normal-offset.png)

**移动幻灯片，查看当折射模式从折射率（图1）更改为像素法线偏移（图2）时玻璃会发生怎样的变化。**

在 **像素法线偏移（Pixel Normal Offset）** 模式中，此示例的折射极其轻微，因为此玻璃的法线贴图仅包含微小的磨损和轻微的表面瑕疵。 这是干净的建筑玻璃的预期结果。

但是，如果你想要带纹理或图案的玻璃效果，可以使用更有代表性的法线贴图，并将 **折射（Refraction）** 值提高到 **1.52** 左右。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/864c4a60-e7b8-4a49-8365-275640088cb4/textured-glass-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/864c4a60-e7b8-4a49-8365-275640088cb4/textured-glass-graph.png)

这就是法线贴图对玻璃窗户中光线折射的影响。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f0f39d4-895c-4a8a-8e61-498e70161232/textured-glass.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f0f39d4-895c-4a8a-8e61-498e70161232/textured-glass.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [物理和非物理折射模型](/documentation/zh-cn/unreal-engine/refraction-using-pixel-normal-offset-in-unreal-engine#%E7%89%A9%E7%90%86%E5%92%8C%E9%9D%9E%E7%89%A9%E7%90%86%E6%8A%98%E5%B0%84%E6%A8%A1%E5%9E%8B)
-   [最终结果](/documentation/zh-cn/unreal-engine/refraction-using-pixel-normal-offset-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [像素法线偏移和玻璃](/documentation/zh-cn/unreal-engine/refraction-using-pixel-normal-offset-in-unreal-engine#%E5%83%8F%E7%B4%A0%E6%B3%95%E7%BA%BF%E5%81%8F%E7%A7%BB%E5%92%8C%E7%8E%BB%E7%92%83)

相关文档

[

材质

![材质](https://dev.epicgames.com/community/api/documentation/image/cdeef2f5-00ad-4403-bbd3-ee8f0b14330e?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-materials)

[

使用折射

![使用折射](https://dev.epicgames.com/community/api/documentation/image/b5d47419-8883-420b-8920-5cebd3bb0150?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/using-refraction-in-unreal-engine)