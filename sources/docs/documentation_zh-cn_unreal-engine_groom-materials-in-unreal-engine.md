# 虚幻引擎中的Groom材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/groom-materials-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:00:54.589Z

---

目录

![Groom材质](https://dev.epicgames.com/community/api/documentation/image/ff0ed536-de0d-42c9-857c-928b2bd32d42?resizing_type=fill&width=1920&height=335)

[Groom资产编辑器](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine)中的 **材质（Material）** 面板重新组合了Groom所使用的所有材质。你可以使用 **添加（+）** 图标添加材质插槽，并使用 **删除（垃圾箱）** 图标将其删除。每种材质都有唯一名称，以下拉菜单的形式出现在 **发片（Cards）** 、 **网格体（Meshes）** 和 **发束（Strands）** 面板中。在每个Groom组件上，材质插槽可以重载Groom资产编辑器中设置的材质插槽。

![Groom资产编辑器材质插槽](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0669e539-7f0e-41fd-b158-5b318d534f08/groom-asset-editor-material-slots.png)

为了使材质能够有效地用于Groom，该材质必须使用 **毛发（Hair）** 着色模型。

![将材质着色器模型选择设置为毛发](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1aa62e42-3303-4142-a400-4a22cd21be95/hair-shading-model-setting.png)

还必须在材质编辑器的 **用法（Usage）** 分段中启用标记 **与发束结合使用（Use with Hair Strands）** 。当你第一次将材质应用于Groom时，会自动设置此标记，但如果没有，你可以手动启用。

在材质图表中，你可以使用 **毛发属性（Hair Attributes）** 表达式访问毛发属性。

![毛发属性材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a34e1a9-2bb4-4af0-b055-da775fac4ca8/hair-attributes-material-expression.png)

属性

说明

**U / V**

毛发的UV坐标。U坐标始终 *沿着* 毛发，其中0表示根部，而1表示梢部。

**长度（Length）**

当前曲线的长度。

**半径（Radius）**

当前位置的曲线半径。

**种子（Seed）**

0到1之间的随机值，且沿曲线均匀分布。

**切线（Tangent）**

与曲线方向一致的切线向量。

**根部UV（Root UV）**

曲线根部位置处底层网格体的UV。

**BaseColor**

每条曲线的点颜色。

**粗糙度（Roughness）**

每条曲线的点粗糙度。

**深度（Depth）**

深度偏移。仅用于发片和网格体几何体。

**覆盖（Coverage）**

覆盖遮罩值。仅用于发片和网格体几何体。

**AuxiliaryData**

仅用于发片和网格体几何体的辅助数据。

**AtlasUVs**

仅用于发片和网格体几何体的发片UV。

**组索引（Group Index）**

曲线的组索引。

**AO**

每条曲线的环境光遮蔽。

**发簇ID（Clump ID）**

曲线的发簇ID。

下面是使用"毛发"材质中毛发属性（Hair Attributes）表达式的示例：

![用于毛发的材质设置示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9880c6ef-29ee-4064-b46f-bbc41c517a21/hair-material-example.png)

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [hair](https://dev.epicgames.com/community/search?query=hair)
-   [metahumans](https://dev.epicgames.com/community/search?query=metahumans)
-   [grooms](https://dev.epicgames.com/community/search?query=grooms)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)