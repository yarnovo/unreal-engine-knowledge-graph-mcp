# 虚幻引擎中的动画蓝图Modify Curve节点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-modify-curve-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:13.247Z

---

目录

![Modify Curve](https://dev.epicgames.com/community/api/documentation/image/6ec95e33-f836-4b9d-877e-58ebad5f12f6?resizing_type=fill&width=1920&height=335)

借助 [动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)的 **Modify Curve** 节点，你可以在运行时混合、缩放并重新映射[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)。

![modify animation curve animation blueprint node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9449290e-7b14-4000-86fa-fe5c3e4dd28e/modifycurve.png)

在 **AnimGraph** 中右键点击Modify Curve节点，在上下文菜单的 **添加曲线引脚（Add Curve Pin）** 中选择角色的[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)，添加对应的[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)。

![right click the modify curve node to create a new curve input pin add curve pin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07bd3ad3-a765-4ffa-bb04-f35e0377f758/addcurve.png)

这里，我们在Modify Curve节点 添加了 **色调偏移（Hue Shift）** 曲线，以便改变角色材质的色调。

说明

图表

结果

此处，**色调偏移（Hue Shift）** 曲线已在 **AnimGraph** 中的Modify Curve节点上设置为静态值 **1.0** 。这会从曲线返回一个静态值，从而使角色显示单一颜色材质。

![modify cuuve animaiton blueprint node disabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a01c8a3-210d-4d45-8a23-ac30326e16d1/graphoff.gif)

![modify curve animation blueprint node bot demo disabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/168affc6-5299-49f5-aba1-35be9f62eaa3/botoff.gif)

此处设置了 **正弦波**，用于控制 **AnimGraph** 中Modify Curve节点上的 **色调偏移（Hue Shift）** 曲线值。这会返回一个动态值，从而使角色材质重复显示几种颜色。

![modify cuuve animaiton blueprint node disabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd270050-ff24-423c-814b-3af7c896c681/graphon.gif)

![modify curve animation blueprint node bot demo enabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ced25cc1-175b-4da5-8658-9a51aaf115dd/boton.gif)

## 属性参考

![modify curve animation blueprint node details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/335e559c-9154-4045-8282-e2ad2736794b/details.png)

你可以在此处参考Modify Curve节点的属性列表。

属性

说明

**曲线映射（Curve Map）**

此处你可以设置曲线映射。曲线映射是关联式无序容器，它将一组键与一组值关联起来。映射中的每个键都必须唯一，但值可以重复。

**曲线值（Curve Values）**

曲线值是用于驱动曲线修改行为的值。右键点击 **AnimGraph** 中的Modify Curve节点，并从上下文菜单的添加曲线引脚（Add Curve Pin）选项中选择角色的一个动画曲线，你可以添加新曲线。然后，这些添加的曲线引脚可以用值驱动它们各自的曲线。

**Alpha**

设置alpha值可控制修改后曲线姿势和源动画姿势的混合。默认情况下，此属性显示为 **AnimGraph** 中节点上的引脚。

**应用模式（Apply Mode）**

设置将修改应用于[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)的方法。应用修改选项包括：

**添加（Add）** ：将新值添加到输入曲线值。 **缩放（Scale）** ：按新值缩放输入值。 **混合（Blend）** ：使用节点上的alpha设置将输入与新曲线值混合。 **加权移动平均线（Weighted Moving Average）** ：使用Alpha将新曲线值与上一个曲线值混合，确定eht权重。例如，0.5为移动平均值，值越高，对新值的响应越快，值越低，响应越慢。 **重新映射曲线（Remap Curve）** ：重新映射曲线值条目和1.0之间的新曲线值。例如，例如，曲线值0.5使0.51映射到0.02。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blending](https://dev.epicgames.com/community/search?query=animation%20blending)
-   [curves](https://dev.epicgames.com/community/search?query=curves)
-   [animation curves](https://dev.epicgames.com/community/search?query=animation%20curves)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性参考](/documentation/zh-cn/unreal-engine/animation-blueprint-modify-curve-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)