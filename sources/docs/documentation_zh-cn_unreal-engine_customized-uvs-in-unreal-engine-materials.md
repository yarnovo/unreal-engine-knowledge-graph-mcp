# 虚幻引擎中的自定义UV | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/customized-uvs-in-unreal-engine-materials
> 
> 生成时间: 2025-06-14T19:29:39.807Z

---

目录

![自定义UV](https://dev.epicgames.com/community/api/documentation/image/6bcf5f84-e9d7-4a6c-aebb-39d71fd47026?resizing_type=fill&width=1920&height=335)

在 GPU 上，顶点着色器针对每个顶点运行，而像素着色器针对每个像素运行。在虚幻引擎 4 中，几乎所有材质节点都针对每个像素来运行。虽然 **UV 坐标（UV Coordinate）**节点可以是顶点或像素着色器的一部分，但是 **定制 UV** 功能仅在顶点着色器中运行，与在像素着色器中运行相同计算相比，这可以提高性能。这是一种提高速度的绝佳方法，即使是仅仅平铺纹理也是如此。虽然系统并未限制可以对 UV 运行的数学运算，但是结果将依赖于网格的铺嵌。

注：目前，仅针对特定的元件类型实现了定制 UV：静态网格、骨骼网格、BSP、景观和网格粒子。尤其是，精灵粒子尚不支持定制 UV。

## 属性

在 **材质编辑器** 中，您可通过以下方法来设置 **定制 UV（CustomizedUVs）**输入引脚的数目：选中主材质节点，然后编辑 **材质（Material）**类别中的 **定制 UV 数目（Num Customized UVs）**属性。如果 **定制 UV 数目（Num Customized UVs）**设置为大于 0 的数目，那么主材质节点上会显示"定制 UV"（CustomizedUVs）引脚。

![Customized UVs Properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e08a06b-2663-4a9d-9674-875a40478e2b/customized-uv-properties.png)

## 非线性数学运算

一般规则是，如果要执行的计算使用了常量（摄像机位置、时间、矢量参数，等等）或者随每个顶点的属性而线性变化，那么在顶点着色器中执行该工作的结果与在像素着色器中执行该工作相同。线性变化表示仅限将会产生直线（而非曲线）的运算，例如乘法和加法。使用正弦、余弦或 `长度（length）` 之类的运算对变量进行开方将产生非线性方程式。

非线性数学运算是否会产生期望的结果将取决于其所应用于的网格的细节：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad49d409-cbe0-4715-81c2-98513116fc73/cuvs_highvslowdetailmesh.png)

*左侧的网格是 9x9 多边形栅格，而右侧的网格是 4x4 多边形栅格。*

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5927f1f8-5e4b-42e6-99eb-d7bb1626a4a1/customized-uv-graph-01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5927f1f8-5e4b-42e6-99eb-d7bb1626a4a1/customized-uv-graph-01.png)

点击查看大图。

相反，如果此数学运算直接输入到纹理中，那么它将在像素着色器中进行求值，从而产生相同的结果，而与网格细节无关。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3859a3ea-6b6b-499a-85b5-f452cf6aa5a8/cuvs_perpixel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3859a3ea-6b6b-499a-85b5-f452cf6aa5a8/cuvs_perpixel.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83432236-ded4-4a07-bf7d-e50fb7f2d2bc/customized-uv-graph-02.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83432236-ded4-4a07-bf7d-e50fb7f2d2bc/customized-uv-graph-02.png)

点击查看大图。

## 线性数学运算

按某个参数来调整 UV 比例（将 UV 与该参数相乘）在这两种数学运算中以相同方式工作。UV 是依赖于每个顶点的属性，而比例调整是线性运算。下列各图显示执行线性运算时，在顶点着色器中计算的"定制 UV"（CustomizedUV）将产生与在像素着色器中执行同一计算相同的效果。

 ![**在这个例子中，不管是在顶点着色器中（使用自定义UV）还是在像素着色器中，UV平铺的计算结果都是一样的。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad999414-afcc-4bc6-8663-5911edc4e46b/linear-math-01.png) ![**在这个例子中，不管是在顶点着色器中（使用自定义UV）还是在像素着色器中，UV平铺的计算结果都是一样的。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb23b008-9608-4fab-8747-da0c28ce663a/linear-math-02.png)

\*\*在这个例子中，不管是在顶点着色器中（使用自定义UV）还是在像素着色器中，UV平铺的计算结果都是一样的。

## 工作方式

在默认情况下，"定制 UV"（CustomizedUV）引脚传递网格中的纹理坐标 (UV)。然后，当您将"纹理坐标"（Texcoord）节点放入"底色"（BaseColor）等像素着色器输入时，您仍将获得网格的纹理坐标。但是，如果您在"定制 UV 0"（CustomizedUV0）中执行某些操作，然后在"底色"（BaseColor）输入中使用"纹理坐标 0"（Texcoord 0）时，您将获得修改后的 UV 值。请注意，在默认情况下，纹理取样（Texture Sample）节点使用"纹理坐标 0"（Texcoord 0）。

PC 上的 **Shader Model 5** 可以使用 8 个定制 UV，而移动设备上的 **OpenGL ES2** 只能使用 3 个。

在以下示例中，原始材质使用全局空间 Y 和 Z 来映射纹理。

![Texture mapped in world space](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a041304e-203d-4a81-90bd-6a834d96f7b7/customized-uvs-example-01.png)

此材质完成相同的任务，"定制 UV 0"（Customized UV 0）中的逻辑作为"纹理坐标 0"（Texcoord0）传递到"底色"（BaseColor）像素着色器输入。但是，"纹理坐标 0"（Texcoord0）的计算是在顶点着色器中执行的。

![Customized UVs](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/753c7d61-d18b-455f-9b57-fb79e3e1d426/customized-uvs-example-02.png)

*"纹理取样"（Texture Sample）节点中包含隐式的"纹理坐标 0"（TexCoord0）节点。*

## 一般性能

在大多数情况下，顶点数目显著少于像素数目，因此将数学运算移至顶点着色器可大幅提高性能。请注意，如果您要建立多边形数目非常高的网格，或者不将 LOD 用于多边形数目较高的网格，那么额外的顶点着色器工作可能会成为瓶颈。这是因为，无论网格是在 4 个像素的距离之外，还是填满屏幕，顶点着色器工作都相同。

## 特定于移动设备

在移动设备上，**任何以任意方式处理纹理坐标的纹理取样都采用慢速路径**。这称为 *从属* 纹理提取。通过使用定制 UV 输入，您仍可实现平铺或全局空间纹理贴图，同时保持所有的纹理提取 *独立*，这是快速路径。

另外，移动设备上像素着色器中的所有内容都是使用半精度浮点值进行求值。这会导致对纹理坐标执行像素着色器数学运算时，产生块状纹理及其他一些失真。但是，定制 UV 输入使用全精度，因此避免了此问题。

以下洞穴材质设置以两种不同的速率进行平铺，但仍使用独立的纹理取样。

![Customized UVs independent tiling](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f185961f-d772-4c9e-8a97-c649e577a49a/cuvs-independent-tiling.png)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [属性](/documentation/zh-cn/unreal-engine/customized-uvs-in-unreal-engine-materials#%E5%B1%9E%E6%80%A7)
-   [非线性数学运算](/documentation/zh-cn/unreal-engine/customized-uvs-in-unreal-engine-materials#%E9%9D%9E%E7%BA%BF%E6%80%A7%E6%95%B0%E5%AD%A6%E8%BF%90%E7%AE%97)
-   [线性数学运算](/documentation/zh-cn/unreal-engine/customized-uvs-in-unreal-engine-materials#%E7%BA%BF%E6%80%A7%E6%95%B0%E5%AD%A6%E8%BF%90%E7%AE%97)
-   [工作方式](/documentation/zh-cn/unreal-engine/customized-uvs-in-unreal-engine-materials#%E5%B7%A5%E4%BD%9C%E6%96%B9%E5%BC%8F)
-   [一般性能](/documentation/zh-cn/unreal-engine/customized-uvs-in-unreal-engine-materials#%E4%B8%80%E8%88%AC%E6%80%A7%E8%83%BD)
-   [特定于移动设备](/documentation/zh-cn/unreal-engine/customized-uvs-in-unreal-engine-materials#%E7%89%B9%E5%AE%9A%E4%BA%8E%E7%A7%BB%E5%8A%A8%E8%AE%BE%E5%A4%87)