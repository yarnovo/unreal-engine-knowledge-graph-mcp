# 虚幻引擎材质中的曲线图集 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/curve-atlases-in-unreal-engine-materials
> 
> 生成时间: 2025-06-14T19:29:36.860Z

---

目录

![材质曲线图集](https://dev.epicgames.com/community/api/documentation/image/baf0a80e-cae5-40e5-bad1-ee1c7e9a5cd8?resizing_type=fill&width=1920&height=335)

![Gradient Curves Banner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1e7df50-67fb-4beb-a5e9-d8ca122953d3/materialgradientcurvesbanner.png "MaterialGradientCurvesBanner.png")

曲线图集保存了[曲线](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)资源组合，让你可以通过材质访问曲线线性颜色数据。曲线图集保存可以与[材质](/documentation/zh-cn/unreal-engine/unreal-engine-materials)搭配使用的纹理中任意数量的曲线。在通过蓝图创建[材质实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)和更改[动态材质实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine#%E5%8A%A8%E6%80%81%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B)（MID）时，你能够将曲线设置为覆盖，这样就可以快速迭代和更改RGBA曲线值，而不更改基本材质。

## 曲线线性颜色资源

**曲线线性颜色（Curve Linear Color）** 用于存储插值RGBA点，在给定范围内将评估这些点以产生能够与材质搭配使用的颜色渐变。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b52e52e2-17e4-4670-b570-341adbc6b65c/curvegradient.png)

用曲线线性颜色资源创建的曲线梯度示例

使用 **内容浏览器**，选择 **新增（Add New）>其他（Miscellaneous）>曲线（Curve）** 来创建曲线资源。

![Create Curve Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03e91ffc-dd95-4964-a265-d5cb4a6388fd/create-curve-asset.png)

然后从 **选取曲线类（Pick Curve Class）** 窗口中选择 **CurveLinearColor**。

![Pick Curve Class dialog](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3dbf8e2-c121-43fe-b012-d0727ac8f695/pick-curve-class.png)

内容浏览器中添加了一个新的曲线线性颜色资源，显示其当前颜色梯度预览。当你打开曲线资源编辑器时，可以在图形中添加、调整和删除各个RGBA曲线的键。

![Curve Asset in Content Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/423f95bb-0363-4eb1-8898-635349d453d0/curve-in-content-browser.png)

当你在资源编辑器中打开曲线时，你将能够设置各个RGBA曲线，调整曲线的颜色值和预览曲线梯度结果。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc3c7a50-4d80-4057-8eae-a2f40614db50/curve-editor-interface.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc3c7a50-4d80-4057-8eae-a2f40614db50/curve-editor-interface.png)

点击查看大图。

曲线图形（Curve Graph） 用于调整、添加和删除各个RGBA曲线的任意键。 颜色（Color） 面板用于调整影响所有键的颜色值。 曲线梯度结果（Curve Gradient Result） 向你显示所产生的梯度。 你可以按住SHIFT键并单击单个曲线来添加一个键，以向曲线添加键。如果单击空图形，会在你单击的位置处向所有曲线添加一个新键。

## 曲线图集资源

**曲线图集** 资源用于存储和访问多个曲线资源，使你能够管理梯度查找表（LUT）。曲线图集资源编辑器类似于纹理编辑器，你可以用来调整亮度、饱和度、色调等设置。

![Curve Atlas Example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aee1d592-933e-4cec-bc58-fb1486e3f875/curve-atlas-example.png)

曲线图集LUT示例

作为 **梯度曲线** 分配给曲线图集的曲线即构成图集。材质图形使用所创建的纹理对应用于Actor的材质执行查找。

使用 **内容浏览器**，选择 **新增（Add New）>其他（Miscellaneous）>曲线图集（Curve Atlas）** 来创建曲线图集资源。

![Create Curve Atlas Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07176938-2afe-49b3-ac26-3b921ac51885/create-curve-atlas.png)

当你在资源编辑器中打开曲线图集时，你可以设置它能够存储的曲线数量，分配曲线和调整所有分配曲线的颜色值——类似于纹理编辑器的功能。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a54d0da0-17f6-48a7-b176-b9312b845ce6/curve-atlas-interface.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a54d0da0-17f6-48a7-b176-b9312b845ce6/curve-atlas-interface.png)

点击查看大图。

1.  主视口显示 **曲线图集** LUT，其中显示了为所应用 **纹理大小** 分配的所有 **梯度曲线**。
2.  在 **曲线（Curves）** 面板中，你可以针对所需数量的 **渐变曲线** 设置 **纹理大小**。默认值为 256。
3.  **调整（Adjustments）** 面板用于对分配给曲线图集的所有 **梯度曲线** 进行调整。

为实现最大纹理效率，最好使用 **2的幂次方** 值（如 32、64、128）。这里的纹理大小仅用于演示目的，主要是为了包含整个编辑器界面。

所用 **纹理大小** 会影响梯度的保真度，因此最好不要对复杂曲线使用较小图集大小。但是，你可以对一组简单曲线使用较小图集来节约纹理大小。

要向曲线图集添加新的梯度曲线，单击 **加号**（**+**）图标以添加数组元素，单击 **垃圾桶** 图标可删除元素。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93dbf9a2-fc30-4bc5-bdb7-3f7699973012/add-curve-element.png)

## 将曲线图集与材质搭配使用

在创建曲线并应用于曲线图集后，你可以创建一个材质来引用该曲线图集和分配到该图集的曲线。

要对图集中的曲线采样，创建一个新材质，并在图形中单击右键，然后添加 **曲线图集行参数（Curve Atlas Row Parameter）** 节点。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/816e1735-42b7-42cc-b1cc-559d5d2767bb/curve-atlas-row-parameter.png)

该节点就像标量参数一样，让你可以使用[动态材质实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine#%E5%8A%A8%E6%80%81%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B)（MID），通过蓝图将这些实例用于图集UV的V轴，但该节点会为你执行采样任务，并返回矢量3和R、G、B和A遮罩。

当你选择该节点时，在 **细节（Details）** 面板中，你可以指定 **图集** 和该图集中的默认 **曲线** 以用于该材质。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed7f8177-e42f-4e9b-8046-4cd44d9203b7/curve-atlas-properties.png)

曲线图集会在编译时分解，这意味着目前没有可用于更改图集内容的运行时支持，也不能在运行时更改图集中存储的曲线数据。但是，你可以在一个曲线图集中存储大量数据，并使用蓝图覆盖从材质实例取样的曲线。

例如，下面是一个"岩石"材质，它使用了分配到某曲线图集的多个曲线。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10a72ba4-6e3d-4927-b40a-df39a025f258/curve-atlas-rock-example.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10a72ba4-6e3d-4927-b40a-df39a025f258/curve-atlas-rock-example.png)

点击查看大图。

然后，在创建任何 **材质实例** 时，可以更改标量参数以选择应用于网格体的 **曲线图集** 所引用的 **曲线** 资源。

下面的示例显示了所应用的材质和从曲线图集引用的曲线。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1717db98-92dd-4275-9614-f800d870f2e2/curve_base.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4982433d-6075-4c4f-9a97-54f89da8c3b7/curve_1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc53be1b-7957-4699-959b-df96472002bc/curve_2.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdd95f70-97aa-4022-a437-479806e4a101/curve_3.png)

基础

曲线1

曲线2

曲线3

### 通过蓝图访问曲线图集

在蓝图中，你可以使用 **获取曲线位置（Get Curve Position）** 节点在动态材质实例上设置标量参数值。获取曲线位置（Get Curve Position）以曲线图集为输入，将标量值传递到 **设置标量参数值（Set Scalar Parameter Value）**，然后返回一个布尔值来指示是否在图集中找到了曲线。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e712ee1-aa03-493d-b5e3-385ffdb15aa9/blueprint-example.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e712ee1-aa03-493d-b5e3-385ffdb15aa9/blueprint-example.png)

点击查看大图。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [曲线线性颜色资源](/documentation/zh-cn/unreal-engine/curve-atlases-in-unreal-engine-materials#%E6%9B%B2%E7%BA%BF%E7%BA%BF%E6%80%A7%E9%A2%9C%E8%89%B2%E8%B5%84%E6%BA%90)
-   [曲线图集资源](/documentation/zh-cn/unreal-engine/curve-atlases-in-unreal-engine-materials#%E6%9B%B2%E7%BA%BF%E5%9B%BE%E9%9B%86%E8%B5%84%E6%BA%90)
-   [将曲线图集与材质搭配使用](/documentation/zh-cn/unreal-engine/curve-atlases-in-unreal-engine-materials#%E5%B0%86%E6%9B%B2%E7%BA%BF%E5%9B%BE%E9%9B%86%E4%B8%8E%E6%9D%90%E8%B4%A8%E6%90%AD%E9%85%8D%E4%BD%BF%E7%94%A8)
-   [通过蓝图访问曲线图集](/documentation/zh-cn/unreal-engine/curve-atlases-in-unreal-engine-materials#%E9%80%9A%E8%BF%87%E8%93%9D%E5%9B%BE%E8%AE%BF%E9%97%AE%E6%9B%B2%E7%BA%BF%E5%9B%BE%E9%9B%86)