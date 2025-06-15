# glTF导出器如何处理虚幻引擎内容 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content
> 
> 生成时间: 2025-06-14T19:07:03.666Z

---

目录

![glTF导出器如何处理虚幻引擎内容](https://dev.epicgames.com/community/api/documentation/image/3cdd1cb5-c3e8-4aab-aa06-93ce027afd17?resizing_type=fill&width=1920&height=335)

**glTF** 是一种数据驱动的格式，并不支持虚幻引擎中的所有功能。本页面介绍了你可以使用glTF导出哪种内容，以及glTF导出器如何处理每种类型的内容。

## 概述：可以导出的内容

glTF导出器可以从虚幻引擎导出多种类型的资产。导出引用了其他内容的资产时，导出器还可以导出该内容的一部分。

你可以直接导出的资产包括以下内容：

-   [材质](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%9D%90%E8%B4%A8)
-   [静态网格体](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [骨骼网格体](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [动画序列](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%8A%A8%E7%94%BB%E5%BA%8F%E5%88%97)
-   [关卡序列](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%85%B3%E5%8D%A1%E5%BA%8F%E5%88%97)
-   [关卡变体集](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%85%B3%E5%8D%A1%E5%8F%98%E4%BD%93%E9%9B%86)
-   关卡（请参阅[导出当前关卡](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E5%AF%BC%E5%87%BA%E5%BD%93%E5%89%8D%E5%85%B3%E5%8D%A1)）

支持的资产引用了某个内容时，你可以间接导出以下内容：

-   [Actor](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#actor)
-   [组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%BB%84%E4%BB%B6)
-   [纹理](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%BA%B9%E7%90%86)

## 材质

glTF格式使用可生成逼真材质的金属感/粗糙度基于物理的渲染（PBR）工作流程。glTF工作流程类似于虚幻引擎的工作流程，但不支持任意材质表达式。相反，它针对每个材质输入允许单个纹理或常量。

在glTF格式中，一些输入拥有相同的纹理（例如， **金属感（Metallic）** / **粗糙度（Roughness）** 和 **基础颜色（Base Color）** / **不透明度（遮罩）（Opacity (Mask)）** ）。为了将虚幻引擎材质转换为glTF，导出器会按以下顺序使用以下方法：

-   [材质表达式匹配](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%8C%B9%E9%85%8D)：更快速、更准确，但仅支持简单的材质表达式模式。
-   [材质烘焙](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99)：支持大部分材质表达式模式，但更缓慢，并且需要配置。

导出材质时，导出器会首先尝试表达式匹配。如果表达式匹配失败，将回退为材质烘焙。这可能频繁发生，因为大部分虚幻引擎材质输入使用的表达式都比表达式匹配所支持的表达式更高级。

你可以将材质烘焙设置配置为仅使用表达式匹配。详情请参阅"禁用材质烘焙（Disable Material Baking）"。

### 材质表达式匹配

材质表达式匹配会检查每个材质输入表达式，确定它是否匹配有限范围的表达式节点模式之一。如果匹配，glTF导出器会从该材质表达式提取值，并进行转换。

表达式匹配比材质烘焙更快速、更准确，但只能处理非常简单而严格的表达式模式。每当有材质表达式满足必要条件时，导出器都会使用它。

#### 材质表达式匹配的支持模式示例

-   常量和向量参数节点
    
    ![常量和向量参数材质节点示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e0b2da7-cc16-43e8-ba47-50c5a74391e7/gltf-expression-match-constant.png)
    
    常量和向量参数材质节点示例
    
    由于glTF存在局限性，常量和向量参数模式不支持用于法线或环境光遮蔽输入。
    
-   纹理取样和纹理参数节点，带有或不带纹理坐标节点
    
    ![纹理取样和纹理参数材质节点示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21f3ab4d-0653-479e-b9c6-553e36056025/gltf-expression-match-texture.png)
    
    纹理取样和纹理参数材质节点示例
    
    表达式匹配不支持将纹理取样节点乘以常量。
    

### 材质烘焙

材质烘焙会将特定材质输入的完整表达式渲染为2D纹理。它可以处理大部分材质表达式，但比表达式匹配更缓慢，并且需要你配置一些设置。

-   你可在 **材质（Material）** 分段中的glTF导出选项对话框中设置全局默认值。请参阅[配置全局默认材质烘焙设置](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E5%85%A8%E5%B1%80%E9%BB%98%E8%AE%A4%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E8%AE%BE%E7%BD%AE)。
-   你可以使用逐个输入的默认设置来覆盖全局默认设置。请参阅[配置特定输入的全局材质烘焙设置](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E7%89%B9%E5%AE%9A%E8%BE%93%E5%85%A5%E7%9A%84%E5%85%A8%E5%B1%80%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E8%AE%BE%E7%BD%AE)。
-   你还可以针对个别资产，甚至是该资产上的特定材质输入，创建默认材质烘焙设置。请参阅[配置特定于资产的材质烘焙选项](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E7%89%B9%E5%AE%9A%E4%BA%8E%E8%B5%84%E4%BA%A7%E7%9A%84%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E9%80%89%E9%A1%B9)。

对于不依赖查看时间或查看方式（例如，时间或查看角度）的材质，材质烘焙效果最好，也最准确。当glTF导出器烘焙材质时，它会逐个像素对该时刻的每个输入表达式求值。**Time** 、 **Camera Position** 和 **Reflection Vector** 等动态节点将变为静态节点。在导出材质时，建议不要使用依赖于视图的表达式。

#### glTF导出器如何应用材质烘焙设置

glTF导出器会使用它能找到的最具体设置。对于给定材质资产上的给定输入，导出器按以下顺序安排设置的优先级。

1.  特定材质资产上的特定输入的设置。
2.  特定材质资产的默认设置。
3.  特定类型的材质输入的全局默认设置。
4.  全局默认设置。

#### 配置全局默认材质烘焙设置

在 **材质（Material）** 分段中的glTF导出选项对话框中，配置全局默认材质烘焙设置。

全局默认设置是最终的回退设置。如果导出器针对给定材质资产上的给定输入找不到更具体的设置，将使用全局默认值。

你可以设置以下选项：

选项

说明

**烘焙材质输入（Bake Material Inputs）**

指定是否将材质烘焙到纹理中，如是，如何烘焙。

-   **已禁用（Disabled）** ：从不使用材质烘焙，而仅依赖材质表达式匹配。
-   **简单（Simple）** ：如果材质输入需要烘焙，则仅使用简单平面作为网格体数据。
-   **使用网格体数据（Use Mesh Data）** ：如果材质输入使用特定于网格体的数据，比如顶点颜色、世界位置、向量变换节点，此设置会在材质烘焙过程中以及生成的纹理中包含该数据。若材质没有使用特定于网格体的数据，导出器将使用简单平面。

导出器仅会将烘焙用于复杂的材质输入。对于简单纹理或常量表达式，它会使用材质表达式匹配。

**默认材质烘焙大小（Default Material Bake Size）**

启用 **烘焙材质输入（Bake Material Inputs）** 后，此设置将指定包含材质输入的烘焙纹理的默认大小。

你以使用特定于材质和特定于输入的烘焙设置覆盖此默认设置。如需更多信息，请参阅以下小节：

-   [配置特定输入的全局材质烘焙设置](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E7%89%B9%E5%AE%9A%E8%BE%93%E5%85%A5%E7%9A%84%E5%85%A8%E5%B1%80%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E8%AE%BE%E7%BD%AE)。
-   [配置特定于资产的材质烘焙选项](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E7%89%B9%E5%AE%9A%E4%BA%8E%E8%B5%84%E4%BA%A7%E7%9A%84%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E9%80%89%E9%A1%B9)。

**默认材质烘焙筛选器（Default Material Bake Filter）**

启用 **烘焙材质输入（Bake Material Inputs）** 后，此设置将指定默认筛选模式，用于对烘焙纹理取样。

你以使用特定于材质和特定于输入的烘焙设置覆盖此默认设置。如需更多信息，请参阅以下小节：

-   [配置特定输入的全局材质烘焙设置](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E7%89%B9%E5%AE%9A%E8%BE%93%E5%85%A5%E7%9A%84%E5%85%A8%E5%B1%80%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E8%AE%BE%E7%BD%AE)。
-   [配置特定于资产的材质烘焙选项](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E7%89%B9%E5%AE%9A%E4%BA%8E%E8%B5%84%E4%BA%A7%E7%9A%84%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E9%80%89%E9%A1%B9)。

**默认材质烘焙平铺（Default Material Bake Tiling）**

启用烘焙材质输入后，此设置将指定默认寻址模式，用于对烘焙纹理取样。

你以使用特定于材质和特定于输入的烘焙设置覆盖此默认设置。如需更多信息，请参阅以下小节：

-   [配置特定输入的全局材质烘焙设置](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E7%89%B9%E5%AE%9A%E8%BE%93%E5%85%A5%E7%9A%84%E5%85%A8%E5%B1%80%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E8%AE%BE%E7%BD%AE)。
-   [配置特定于资产的材质烘焙选项](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E7%89%B9%E5%AE%9A%E4%BA%8E%E8%B5%84%E4%BA%A7%E7%9A%84%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E9%80%89%E9%A1%B9)。

##### 选择材质烘焙模式

一般来说，建议将 **使用网格体数据（Use Mesh Data）** 模式用于材质烘焙。 **使用网格体数据（Use Mesh Data）** 模式会导出唯一、逐个网格体的glTF材质，但仅适用于依赖特定于网格体的数据的材质。这包括使用以下表达式或节点的材质：

-   [顶点颜色](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#%E9%A1%B6%E7%82%B9%E9%A2%9C%E8%89%B2)
-   [VertexNormalWS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#vertexnormalws)
-   [PixelNormalWS](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#pixelnormalws)
-   本地位置
-   [世界位置](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#%E4%B8%96%E7%95%8C%E4%BD%8D%E7%BD%AE)
-   [Actor位置](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#actor%E4%BD%8D%E7%BD%AE)
-   [对象位置](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E4%BD%8D%E7%BD%AE)
-   [对象方向](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E6%96%B9%E5%90%91)
-   [对象半径](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E5%8D%8A%E5%BE%84)
-   [对象边界](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E8%BE%B9%E7%95%8C)
-   对象本地边界
-   预蒙皮本地边界
-   [变换](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine#%E5%8F%98%E6%8D%A2)和[变换位置](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine#%E5%8F%98%E6%8D%A2%E4%BD%8D%E7%BD%AE)
-   [预计算AO遮罩](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#%E9%A2%84%E8%AE%A1%E7%AE%97ao%E9%81%AE%E7%BD%A9)
-   [光照贴图UV](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#%E5%85%89%E7%85%A7%E8%B4%B4%E5%9B%BEuv)
-   [自定义图元数据](/documentation/zh-cn/unreal-engine/storing-custom-data-in-unreal-engine-materials-per-primitive#%E6%9D%90%E8%B4%A8%E8%AE%BE%E7%BD%AE)

如果材质不需要特定于网格体的数据，导出器将回退到该材质的 **简单（Simple）** 模式。

**简单（Simple）** 烘焙模式会生成不是特定网格体所特有的材质。它可以使用整个纹理区域，因为用于烘焙材质的网格体数据是四边形。它更适合平铺或重复纹理。

当你使用特定于网格体的数据烘焙材质时，glTF导出器会假定网格体的光照贴图UV能覆盖整个网格体并且不重叠，实际情况有时并非如此。如果 **使用网格体数据（Use Mesh Data）** 模式生成的材质不同于你预期的外观，建议将烘焙模式更改为 **简单（Simple）** 。

#### 配置特定输入的全局材质烘焙设置

全局、逐个输入的默认材质烘焙设置会覆盖全局默认设置，并被逐个资产的设置覆盖。

你可为 **glTF导出选项（glTF Export Options）** 对话框中的特定输入设置全局默认材质烘焙选项。

执行以下操作：

1.  在 **材质（Material）** 分段中，找到 **默认输入烘焙设置（Default Input Bake Settings）** 行，并点击 **添加元素（Add Element (+)）** 。将显示新的子选项。
2.  从新的子选项行中的下拉列表，选择材质输入。
3.  展开子选项以显示所选输入的 **大小（Size）** 、 **筛选器（Filter）** 和 **平铺（Tiling）** 材质烘焙设置。每个设置都可以打开和关闭，你可以酌情设置。

对你想为其创建全局默认设置的每个材质输入重复该过程。

#### 配置特定于资产的材质烘焙选项

你可以为个别资产设置材质烘焙选项。材质资产可以有默认材质烘焙选项，以及特定于输入的材质烘焙选项。

-   资产的默认设置会覆盖逐个输入的全局默认设置和总体全局默认设置。
-   资产的特定于输入的设置会覆盖所有其他材质烘焙设置。

特定于资产的设置由资产的子项继承。如果材质资产有自己的烘焙设置，作为该资产的子项（直接或间接）的材质实例将继承这些设置。如果实例有自己的设置，它们将覆盖资产的设置。

要为材质资产配置材质烘焙设置，请将 **GLTF材质导出选项（GLTF Material Export Options）** 添加到其 **资产用户数据（Asset User Data）** 数组。

##### 步骤1：添加资产的glTF材质导出选项

1.  在 **内容浏览器（Content Browser）** 中，选择资产。
2.  在 **细节（Details）** 面板中，展开 **资产用户数据（Asset User Data）** 分段。
3.  找到 **资产用户数据（Asset User Data）** 行，并点击 **添加元素（Add Element (+)）** 。将显示新的 **索引（Index）** 行。
4.  从新的索引行中的下拉列表，选择 **GLTF材质导出选项（GLTF Material Export Options）** 。
5.  执行以下两个操作之一或全部：
    -   设置资产的默认材质烘焙选项。
    -   设置材质资产上的特定输入的材质烘焙选项。

##### 步骤2a：设置资产的默认材质烘焙选项

-   展开 **索引（Index）> 覆盖烘焙设置（Override bake Settings）> 默认值（Default）** 分段，以显示资产的 **大小（Size）** 、 **筛选器（Filter）** 和 **平铺（Tiling）** 。每个设置都可以打开和关闭，你可以酌情设置。

##### 步骤2b：设置特定输入的材质烘焙选项

1.  展开 **索引（Index）> 覆盖烘焙设置（Override bake Settings）** 分段。
2.  找到 **输入（Inputs）** 行，并点击 **添加元素（Add Element (+)）** 。将显示新的子选项。
3.  从新的子选项行中的下拉列表，选择材质输入。
4.  展开子选项以显示所选输入的 **大小（Size）** 、 **筛选器（Filter）** 和 **平铺（Tiling）** 材质烘焙设置。每个设置都可以打开和关闭，你可以酌情设置。

对你想为其创建设置的每个材质输入重复该过程。

#### 禁用材质烘焙

你可以完全禁用材质烘焙，并强制glTF导出器使用材质表达式匹配。

在glTF导出选项对话框中，转至"材质（Materials）"分段，并将 **烘焙材质输入（Bake Material Inputs）** 设置为 **禁用（Disabled）** 。

禁用材质烘焙后，导出器会跳过无法恰当导出的材质输入，并在输出日志中记录警告。跳过的输入会获得glTF规范中指定的默认值。

### 着色模型支持

glTF格式支持以下虚幻引擎着色模型：

-   [默认光照](/documentation/zh-cn/unreal-engine/shading-models-in-unreal-engine#%E9%BB%98%E8%AE%A4%E5%85%89%E7%85%A7)
-   [透明涂层](/documentation/zh-cn/unreal-engine/shading-models-in-unreal-engine#%E9%80%8F%E6%98%8E%E6%B6%82%E5%B1%82)
-   [无光照](/documentation/zh-cn/unreal-engine/shading-models-in-unreal-engine#%E6%97%A0%E5%85%89%E7%85%A7)

它会将不受支持的着色模型视为默认光照。

如果材质表达式图表指定了着色模型，导出器会尝试使用静态分析对其求值。静态分析器只能处理特定类型的表达式。例如，下图所示的表达式：

![静态分析器可以求值的着色模型表达式示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/957e3ee1-2bad-478a-8885-df07545e58d6/gltf-static-analysis-yes.png)

静态分析器可以求值的着色模型表达式示例

使用非静态变量的表达式更加复杂，静态分析器可能无法解析此类表达式。如果分析器无法将求值解析为单个静态着色模型，导出器会选择剩余模型中支持最丰富、最复杂的着色的任意一个模型。

它将按优先顺序选择：

1.  透明涂层
2.  默认光照
3.  无光照

如果静态分析器已经排除了其中某个模型，导出器会选择优先级第二高的模型。

![静态分析器无法求值的着色模型表达式示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac5f1874-aff7-495a-8263-477241a63ec7/gltf-static-analysis-no.png)

静态分析器无法求值的着色模型表达式示例

#### 默认光照

虚幻引擎的 **默认光照（Default Lit）** 着色模型具有与默认glTF着色模型几乎完全一样的材质输入。有关默认光照材质输入的列表，请参阅[着色模型](/documentation/zh-cn/unreal-engine/shading-models-in-unreal-engine)。

虚幻引擎模型与glTF模型之间存在一些重要差异。在默认glTF着色模型中：

-   一些输入会共享纹理插槽（请参阅[共享纹理插槽](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#dl%E5%85%B1%E4%BA%AB%E7%BA%B9%E7%90%86%E6%8F%92%E6%A7%BD)）。
-   一些输入只能接受纹理（请参阅[仅限纹理的输入](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#dl%E4%BB%85%E9%99%90%E7%BA%B9%E7%90%86%E7%9A%84%E8%BE%93%E5%85%A5)）。
-   glTF金属感/粗糙度PBR工作流程不支持 **高光度（Specular）** 。

##### 共享纹理插槽

在默认glTF着色模型中，一些输入会配对，并共享纹理插槽。

-   **基础颜色（Base Color）** 与 **半透明度（遮罩）（Opacity (Mask)）** 共享插槽
-   **金属感（Metallic）** 与 **粗糙度（Roughness）** 共享插槽

配对输入使用相同的纹理，这意味着它们总是采用相同的纹理分辨率和坐标。但是，每个输入由不同的颜色通道表示。例如，在金属感/粗糙度配对中，金属感输入使用蓝色通道，而粗糙度输入使用绿色通道。

##### 仅限纹理的输入

在默认glTF着色模型中，以下输入只能接受纹理：

-   **法线（Normal）**
-   **环境光遮蔽（Ambient Occlusion）**

不同于其他输入，这些不能采用常量非默认值，除非你使用1x1像素纹理来模拟常量。如果导出器发现任一输入采用了常量值，它会执行以下操作：

-   对于 **环境光遮蔽（Ambient Occlusion）** ，导出器会自动生成1x1像素纹理来模拟常量值。
-   对于 **法线（Normal）** ，导出器会废弃常量，并假定法线向量应该与表面对齐。

#### 透明涂层

虚幻引擎的透明涂层着色模型扩展了默认光照模型。

-   **透明涂层（强度）（Clear Coat (intensity)）**
-   **透明涂层粗糙度（Clear Coat Roughness）**
-   **透明涂层底部法线（Clear Coat Bottom Normal）**

**透明涂层底部法线（Clear Coat Bottom Normal）** 输入不是常规的材质输入引脚。它是单独的自定义输出节点。要使用它，你必须在虚幻引擎项目设置中启用 **材质（Materials）> 透明涂层启用第二法线（Clear Coat Enable Second Normal）** 选项。

为了支持透明涂层着色模型，glTF导出器会使用[KHR\_materials\_clearcoat](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_clearcoat)扩展。你可以在[glTF导出选项](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E6%9D%90%E8%B4%A8%E9%80%89%E9%A1%B9)对话框中打开和关闭透明涂层着色。使用 **材质（Material）> 导出透明涂层材质（Export Clear Coat materials）** 选项。

虚幻引擎与glTF支持透明涂层着色模型的方式之间存在一些重要差异。

-   一些输入会共享纹理插槽（请参阅[共享纹理插槽](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#cc%E5%85%B1%E4%BA%AB%E7%BA%B9%E7%90%86%E6%8F%92%E6%A7%BD)）。
-   一些输入只能接受纹理（请参阅[仅限纹理的输入](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#cc%E4%BB%85%E9%99%90%E7%BA%B9%E7%90%86%E7%9A%84%E8%BE%93%E5%85%A5)）。

##### 共享纹理插槽

在glTF透明涂层着色模型中， **透明涂层（Clear Coat）** 和 **透明涂层粗糙度（Clear Coat Roughness）** 输入是配对的。配对输入使用相同的纹理，这意味着它们总是采用相同的纹理分辨率和坐标。但是，每个输入由不同的颜色通道表示。**透明涂层（Clear Coat）** 输入使用红色通道，而 **透明涂层粗糙度（Clear Coat Roughness）** 输入使用绿色通道。

##### 仅限纹理的输入

在glTF透明涂层着色模型中， **透明涂层底部法线（Clear Coat Bottom Normal）** 输入只能接受纹理。不同于其他输入，它不能采用常量非默认值，除非你使用1x1像素纹理来模拟常量。

#### 无光照

虚幻引擎的无光照着色模型是独立的模型，带有两个材质输入：

-   **自发光颜色（Emissive Color）**
-   **不透明度/不透明度遮罩（Opacity / Opacity Mask）** （取决于混合模式）

在glTF无光照着色模型中，这两个输入是配对的。配对输入使用相同的纹理，这意味着它们总是采用相同的纹理分辨率和坐标。但是，每个输入由不同的颜色通道表示。 **自发光颜色（Emissive Color）** 输入使用蓝色通道，而 **不透明度/不透明度遮罩（Opacity / Opacity Mask）** 输入使用绿色通道。

为了支持无光照着色模型，glTF导出器使用[KHR\_materials\_unlit](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_unlit)扩展，你可以在[glTF导出选项](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E6%9D%90%E8%B4%A8%E9%80%89%E9%A1%B9)对话框中将其打开和关闭。使用 **材质（Material）> 导出无光照材质（Export Unlit materials）** 选项。

### 混合模式支持

glTF导出器支持以下材质混合模式：

-   [不透明](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E4%B8%8D%E9%80%8F%E6%98%8E)
-   [遮罩](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E9%81%AE%E7%BD%A9)
-   [半透明](/documentation/zh-cn/unreal-engine/material-blend-modes-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E)

## 静态网格体

glTF能够很好地支持静态网格体，但有一些注意事项。本小节介绍了将静态网格体从虚幻引擎导出到glTF的特殊注意事项。

#### 顶点颜色

在glTF中，顶点颜色总是充当基础颜色的乘数，与材质无关。这可能造成意外结果。在大部分情况下，建议按如下所示设置glTF导出选项：

-   在 [**网格体（Mesh）**](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E7%BD%91%E6%A0%BC%E4%BD%93%E9%80%89%E9%A1%B9) 分段中，禁用 **导出顶点颜色（Export Vertex Colors）** 。
-   在 [**材质（Material）**](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E6%9D%90%E8%B4%A8%E9%80%89%E9%A1%B9) 分段中，将 **烘焙材质输入（Bake Material Inputs）** 设置为 **使用网格体数据（Use Mesh Data）** 。

#### UV

-   glTF不支持半精度（16位）UV。建议将全精度（32位）UV用于静态网格体资产。编辑资产，在细节面板中，启用 **LOD\[NUMBER\] > 构建设置（Build Settings）> 使用全精度UV（Use Full Precision Uvs）** 选项。
-   glTF导出器将导出静态网格体的所有UV通道。但是，包括虚幻引擎的glTF查看器在内，大部分glTF应用程序仅支持两个UV纹理坐标通道。如果你计划导出到glTF，请确保你的材质仅使用前两个UV通道中的纹理坐标。

#### 碰撞几何体

glTF文件格式不支持碰撞几何体。glTF导出器会将其忽略。

#### 细节级别（LOD）

glTF不支持多个细节级别。导出器会使用单个LOD导出静态网格体。它将使用以下规则来决定要导出哪个LOD。

设置

位置

范围

优先级

**默认细节级别（Default Level Of Detail）**

**网格体（Mesh）** 分段中的[glTF导出选项](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#gltf%E5%AF%BC%E5%87%BA%E9%80%89%E9%A1%B9%E5%8F%82%E8%80%83)对话框。

全局

最低这是全局回退。如果没有其他设置覆盖它，glTF导出器将使用此处指定的LOD。

**最低LOD（Minimum LOD）**

**LOD设置（LOD Settings）** 分段中的静态网格体资产属性。要访问，请在[静态网格体编辑器](/documentation/zh-cn/unreal-engine/static-mesh-editor-ui-in-unreal-engine)中打开静态网格体资产，并在 **细节（Details）** 面板中找到该设置。

逐个静态网格体资产

如果为某个静态网格体资产配置了此LOD，并且它设置为比 **默认细节级别（Default Level of Detail）** 设置更高的LOD级别，则glTF导出器会使用此LOD导出静态网格体。

**覆盖最低LOD（Override Min LOD）**

LOD分段中的静态网格体Actor属性或静态网格体组件属性。要访问，请选择静态网格体Actor，并在 **细节（Details）** 面板中找到Actor或组件的设置。

逐个网格体组件或Actor

如果为静态网格体Actor或组件启用了此选项， **最低LOD（Min LOD）** 设置会覆盖资产级别的 **最低LOD（Minimum LOD）** 设置。

**强制LOD模型（Forced Lod Model）**

**LOD** 分段中的静态网格体Actor属性或静态网格体组件属性。要访问，请选择静态网格体Actor，并在 **细节（Details）** 面板中找到Actor或组件的设置。

逐个网格体组件或Actor

如果你为静态网格体Actor或组件配置了此LOD，它会覆盖所有其他LOD设置，并且glTF导出器会使用它导出Actor。

#### 高质量光照和反射的网格体量化

*量化（Quantization）* 是指变换通常以浮点精度存储的向量属性，以将这些属性改为以8位或16位精度存储。量化可节省磁盘空间和内存。

虚幻引擎和glTF中量化了以下顶点属性：

-   顶点颜色（每个组件8位）。
-   顶点法线（每个组件8位或16位）。
-   顶点切线（每个组件8位或16位）。

如果你需要高质量反射和光照，建议为静态网格体资产启用 **使用高精度切线基础（Use High Precision Tangent Basis）** 选项。启用此选项后，虚幻引擎将以16位精度而不是8位精度存储量化的顶点法线和顶点切线。

你可以在每个静态网格体资产的属性中找到 **使用高精度切线基础（Use High Precision Tangent Basis）** 选项。

1.  在[静态网格体编辑器](/documentation/zh-cn/unreal-engine/static-mesh-editor-ui-in-unreal-engine)中打开静态网格体资产。
2.  在 **细节（Details）** 面板的 **LOD \[LEVEL\] > 构建设置（Build Settings）** 分段中查找该选项，其中\[LEVEL\]是你计划使用glTF导出器导出的LOD级别。

为了量化顶点法线和顶点切线，glTF导出器使用KHR\_mesh\_quantization扩展，你可以在glTF导出选项对话框中将其打开和关闭 在[网格体](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E7%BD%91%E6%A0%BC%E4%BD%93%E9%80%89%E9%A1%B9)分段中，启用或禁用 **使用网格体量化（Use Mesh Quantization）** 选项。

## 骨骼网格体

适用于静态网格体（请参阅[静态网格体](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)）的导出注意事项也适用于骨骼网格体。glTF导出器针对骨骼网格体还存在一些额外的局限性。

glTF不支持以下内容：

-   网格体服装资产。
-   变形目标动画。

## 动画序列

虚幻动画序列在glTF中完全受支持，只要你同时导出顶点皮肤权重即可。glTF导出器还会考虑到虚幻引擎动画重定向。

**导出顶点皮肤权重（Export Vertex Skin Weights）** 选项位于 **网格体（Mesh）** 分段中的 **glTF导出选项（glTF Export Options）** 对话框中。详情请参阅[glTF导出选项参考](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E7%BD%91%E6%A0%BC%E4%BD%93%E9%80%89%E9%A1%B9)。

## 关卡序列

要让glTF导出器在场景导出中包含关卡序列资产，该资产需要分配到场景中的关卡序列Actor。

对关卡序列的支持仅限于变换绝对空间中的轨道。glTF导出器不支持混合多个轨道。

glTF导出器将按所选序列显示速率导出每个关卡序列：关卡序列资产中的每秒帧数(FPS)设置。

## 关卡变体集

在虚幻引擎中，你几乎可以使用变体集配置场景中的任意属性。要让在glTF场景导出中包含关卡变体，该资产需要分配到场景中的关卡变体集Actor。

为了导出关卡变体集，glTF导出程序会使用Khronos扩展[KHR\_materials\_variants](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_variants)。此扩展适用于多种glTF查看器，但存在以下限制：

-   它仅支持材质变体。
-   它一次仅支持一个活动变体
-   它会将所有变体捆绑到同一个集内。

虚幻引擎则不同，可以同时有来自不同集的多个变体处于活动状态。

如果你计划导出到glTF，你可以使用材质变体更改静态网格体或骨骼网格体组件上的任意材质资产。导出程序不支持其他变体类型。

## Actor

glTF导出器支持关卡中某些类型的Actor，并可以导出每种类型的特定属性。详情请参阅以下小节：

-   [关卡序列Actor](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%85%B3%E5%8D%A1%E5%BA%8F%E5%88%97actor)
-   [关卡变体集Actor](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%85%B3%E5%8D%A1%E5%8F%98%E4%BD%93%E9%9B%86actor)

导出器还支持某些类型的足迹，并可以导出其类型不受支持，但分配有一个或多个受支持组件的Actor。如果某个Actor分配了支持的组件，导出器会导出该组件的特定属性。如需更多信息，请参阅"组件"。

### 关卡序列Actor

关卡序列Actor是一种引擎Actor，用于播放场景中的关卡序列。glTF导出器支持以下关卡序列Actor属性：

属性

说明

**关卡序列（Level Sequence）**

创建后自动播放序列。

### 关卡变体集Actor

关卡变体集Actor会在运行时查询并激活关卡变体集内的变体。它由随虚幻引擎发布的变体管理器插件提供。

**关卡变体集（Level Variant Sets）** 属性是glTF导出器支持的唯一关卡变体集Actor属性。

glTF导出器将使用[KHR\_materials\_variants](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_materials_variants)扩展导出关卡变体集。你可以在[glTF导出选项](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#gltf%E5%AF%BC%E5%87%BA%E9%80%89%E9%A1%B9%E5%8F%82%E8%80%83)中打开和关闭关卡变体集导出。

## 组件

如果某个导出的Actor分配了支持的组件，glTF导出器会导出该组件的特定属性。以下小节介绍了它会为每种支持的组件类型导出哪些属性。

**图元（Primitives）：**

-   [场景组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%9C%BA%E6%99%AF%E7%BB%84%E4%BB%B6)
-   [静态网格体组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%84%E4%BB%B6)
-   [骨骼网格体组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%84%E4%BB%B6)

**摄像机（Cameras）：**

-   [摄像机组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%84%E4%BB%B6)

**光源（Lights）：**

-   [定向光源](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%AE%9A%E5%90%91%E5%85%89%E6%BA%90%E7%BB%84%E4%BB%B6)
-   [点光源](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%82%B9%E5%85%89%E6%BA%90%E7%BB%84%E4%BB%B6)
-   [聚光源](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E8%81%9A%E5%85%89%E6%BA%90%E7%BB%84%E4%BB%B6)

### 场景组件

glTF导出器支持以下场景组件属性：

变换属性：**位置（Location）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 。

由于虚幻引擎在应用缩放时存在方式上的差异，非均匀缩放可能在glTF中以不同的方式表示。

### 静态网格体组件

glTF导出器支持静态网格体组件从场景组件继承的以下属性：

变换属性：**位置（Location）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 。

由于虚幻引擎在应用缩放时存在方式上的差异，非均匀缩放可能在glTF中以不同的方式表示。

它还支持以下静态网格体属性。

属性

说明

**静态网格体（Static Mesh）**

此组件使用的静态网格体。

**材质（Materials）**

此组件使用的材质。

glTF导出器在导出静态网格体时，会使用以下设置：

-   你在组件的LOD设置中使用 **强制LOD模型（Forced Lod Model）** 、 **最低LOD（Min LOD）** 和 **覆盖最低LOD（Override Min LOD）** 选项配置的细节级别。
-   资产的 **最低LOD（Minimum LOD）** 设置。
-   glTF导出选项中指定的 **默认细节级别（Default Level Of Detail）** 。

详情请参阅[细节级别（LOD）](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%BB%86%E8%8A%82%E7%BA%A7%E5%88%AB%EF%BC%88lod%EF%BC%89)。

### 骨骼网格体组件

glTF导出器支持骨骼网格体组件从场景组件继承的以下属性：

变换属性：**位置（Location）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 。

由于虚幻引擎在应用缩放时存在方式上的差异，非均匀缩放可能在glTF中以不同的方式表示。

它还支持以下骨骼网格体属性。

属性

说明

**骨骼网格体（Skeletal Mesh）**

此组件使用的骨骼网格体。

**材质（Materials）**

此组件使用的材质。

**要播放的动画（Anim to Play）**

此骨骼网格体上要播放的序列。

glTF导出器在导出骨骼网格体时，会使用以下设置：

你在组件的LOD设置中使用 **强制LOD模型（Forced Lod Model）** 、 **最低LOD（Min LOD）** 和 **覆盖最低LOD（Override Min LOD）** 选项配置的LOD。

-   资产的 **最低LOD（Minimum LOD）** 设置。
-   glTF导出选项中指定的 **默认细节级别（Default Level Of Detail）** 。

详情请参阅[细节级别（LOD）](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%BB%86%E8%8A%82%E7%BA%A7%E5%88%AB%EF%BC%88lod%EF%BC%89)。

### 摄像机组件

glTF导出器支持摄像机组件从场景组件继承的以下属性：

变换属性：**位置（Location）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 。

由于虚幻引擎在应用缩放时存在方式上的差异，非均匀缩放可能在glTF中以不同的方式表示。

它还支持以下摄像机属性：

属性

说明

**投影模式（Projection Mode）**

指定摄像机的类型。选择"视角（Perspective）"或"正交（Orthographic）"。

**视野（Field Of View）**

视角模式下的水平视野（以度数为单位，在正交模式下将忽略）。

**正交宽度（Ortho Width）**

正交视图的所需宽度（以世界单位计，在视角模式下将忽略）。

**正交近裁剪平面（Ortho Near Clip Plane）**

正交视图的近平面距离（以世界单位计）。

**正交远裁剪平面（Ortho Far Clip Plane）**

正交视图的远平面距离（以世界单位计）。

**长宽比（Aspect Ratio）**

宽度与高度的比率。

**约束长宽比（Constrain Aspect Ratio）**

启用后，若目标视图的长宽比不同于此摄像机请求的值，将添加黑色条形。

### 定向光源组件

glTF导出器将使用[KHR\_lights\_punctual](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_lights_punctual)扩展导出定向光源。它支持定向光源组件从场景组件继承的以下属性。

变换属性：**位置（Location）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 。

由于虚幻引擎在应用缩放时存在方式上的差异，非均匀缩放可能在glTF中以不同的方式表示。

它还支持以下定向光源属性：

属性

说明

**强度（Intensity）**

光源发射的总能量。

**光源颜色（Light Color）**

光源的滤波器颜色。

**温度（Temperature）**

黑体光源的色温，以开氏度为单位。

**使用温度（Use Temperature）**

禁用后，使用白色（D65）作为光源。

你可以在glTF导出选项对话框的 **场景（Scene）** 分段中打开和关闭定向光源。详情请参阅[glTF导出选项参考](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E5%9C%BA%E6%99%AF%E9%80%89%E9%A1%B9)。

### 点光源组件

glTF导出器将使用[KHR\_lights\_punctual](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_lights_punctual)扩展导出点光源。它支持点光源组件从场景组件继承的以下属性：

变换属性：**位置（Location）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 。

由于虚幻引擎在应用缩放时存在方式上的差异，非均匀缩放可能在glTF中以不同的方式表示。

它还支持以下点光源属性：

属性

说明

**强度（Intensity）**

光源发射的总能量。

**光源颜色（Light Color）**

光源的滤波器颜色。

**温度（Temperature）**

黑体光源的色温，以开氏度为单位。

**使用温度（Use Temperature）**

禁用后，使用白色（D65）作为光源。

**衰减半径（Attenuation Radius）**

限定光源的可见影响范围。

你可以在glTF导出选项对话框的 **场景（Scene）** 分段中打开和关闭点光源。详情请参阅[glTF导出选项参考](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E5%9C%BA%E6%99%AF%E9%80%89%E9%A1%B9)。

### 聚光源组件

glTF导出器将使用[KHR\_lights\_punctual](https://github.com/KhronosGroup/glTF/tree/main/extensions/2.0/Khronos/KHR_lights_punctual)扩展导出聚光源。它支持聚光源组件从场景组件继承的以下属性。

变换属性：**位置（Location）** 、 **旋转（Rotation）** 和 **缩放（Scale）** 。

由于虚幻引擎在应用缩放时存在方式上的差异，非均匀缩放可能在glTF中以不同的方式表示。

它还支持以下聚光源属性：

属性

说明

**强度（Intensity）**

光源发射的总能量。

**光源颜色（Light Color）**

光源的滤波器颜色。

**温度（Temperature）**

黑体光源的色温，以开氏度为单位。

**使用温度（Use Temperature）**

禁用后，使用白色（D65）作为光源。

**衰减半径（Attenuation Radius）**

限定光源的可见影响范围。

**内锥角（Inner Cone Angle）**

与聚光源中心相距此角度时开始衰减，以度数为单位。

**外锥角（Outer Cone Angle）**

与聚光源中心相距此角度时结束衰减，以度数为单位。

你可以在glTF导出选项对话框的 **场景（Scene）** 分段中打开和关闭聚光源。详情请参阅[glTF导出选项参考](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E5%9C%BA%E6%99%AF%E9%80%89%E9%A1%B9)。

## 纹理

glTF使用EPIC\_lightmap\_textures扩展导出纹理。它支持以下纹理类型：

-   纹理2D
-   纹理立方体
-   光照贴图纹理2D

你可以从glTF导出选项对话框配置导出器如何导出纹理。使用 **纹理（Texture）** 分段中的选项。详情请参阅[glTF导出选项参考](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#%E7%BA%B9%E7%90%86%E9%80%89%E9%A1%B9)。

为了支持颜色调整等纹理设置，导出器会使用虚幻引擎存储在内部的渲染数据（平台数据），而不是源数据。

此方法的优势在于，你导出的纹理看起来与虚幻编辑器中或游戏中的渲染效果一样。

劣势在于，如果虚幻引擎的压缩设置为纹理带来瑕疵，就会显示在导出的纹理中。要最大限度减少瑕疵，请尽可能使用用户界面2D和HDR压缩设置。

-   [gltf](https://dev.epicgames.com/community/search?query=gltf)
-   [gl transmission format](https://dev.epicgames.com/community/search?query=gl%20transmission%20format)
-   [import / export](https://dev.epicgames.com/community/search?query=import%20%2F%20export)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述：可以导出的内容](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%A6%82%E8%BF%B0%EF%BC%9A%E5%8F%AF%E4%BB%A5%E5%AF%BC%E5%87%BA%E7%9A%84%E5%86%85%E5%AE%B9)
-   [材质](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%9D%90%E8%B4%A8)
-   [材质表达式匹配](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%8C%B9%E9%85%8D)
-   [材质表达式匹配的支持模式示例](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%8C%B9%E9%85%8D%E7%9A%84%E6%94%AF%E6%8C%81%E6%A8%A1%E5%BC%8F%E7%A4%BA%E4%BE%8B)
-   [材质烘焙](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99)
-   [glTF导出器如何应用材质烘焙设置](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#gltf%E5%AF%BC%E5%87%BA%E5%99%A8%E5%A6%82%E4%BD%95%E5%BA%94%E7%94%A8%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E8%AE%BE%E7%BD%AE)
-   [配置全局默认材质烘焙设置](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E5%85%A8%E5%B1%80%E9%BB%98%E8%AE%A4%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E8%AE%BE%E7%BD%AE)
-   [选择材质烘焙模式](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%80%89%E6%8B%A9%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E6%A8%A1%E5%BC%8F)
-   [配置特定输入的全局材质烘焙设置](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E7%89%B9%E5%AE%9A%E8%BE%93%E5%85%A5%E7%9A%84%E5%85%A8%E5%B1%80%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E8%AE%BE%E7%BD%AE)
-   [配置特定于资产的材质烘焙选项](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%85%8D%E7%BD%AE%E7%89%B9%E5%AE%9A%E4%BA%8E%E8%B5%84%E4%BA%A7%E7%9A%84%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E9%80%89%E9%A1%B9)
-   [步骤1：添加资产的glTF材质导出选项](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%AD%A5%E9%AA%A41%EF%BC%9A%E6%B7%BB%E5%8A%A0%E8%B5%84%E4%BA%A7%E7%9A%84gltf%E6%9D%90%E8%B4%A8%E5%AF%BC%E5%87%BA%E9%80%89%E9%A1%B9)
-   [步骤2a：设置资产的默认材质烘焙选项](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%AD%A5%E9%AA%A42a%EF%BC%9A%E8%AE%BE%E7%BD%AE%E8%B5%84%E4%BA%A7%E7%9A%84%E9%BB%98%E8%AE%A4%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E9%80%89%E9%A1%B9)
-   [步骤2b：设置特定输入的材质烘焙选项](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%AD%A5%E9%AA%A42b%EF%BC%9A%E8%AE%BE%E7%BD%AE%E7%89%B9%E5%AE%9A%E8%BE%93%E5%85%A5%E7%9A%84%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99%E9%80%89%E9%A1%B9)
-   [禁用材质烘焙](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%A6%81%E7%94%A8%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99)
-   [着色模型支持](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%9D%80%E8%89%B2%E6%A8%A1%E5%9E%8B%E6%94%AF%E6%8C%81)
-   [默认光照](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%BB%98%E8%AE%A4%E5%85%89%E7%85%A7)
-   [共享纹理插槽](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%85%B1%E4%BA%AB%E7%BA%B9%E7%90%86%E6%8F%92%E6%A7%BD)
-   [仅限纹理的输入](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E4%BB%85%E9%99%90%E7%BA%B9%E7%90%86%E7%9A%84%E8%BE%93%E5%85%A5)
-   [透明涂层](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%80%8F%E6%98%8E%E6%B6%82%E5%B1%82)
-   [共享纹理插槽](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%85%B1%E4%BA%AB%E7%BA%B9%E7%90%86%E6%8F%92%E6%A7%BD-2)
-   [仅限纹理的输入](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E4%BB%85%E9%99%90%E7%BA%B9%E7%90%86%E7%9A%84%E8%BE%93%E5%85%A5-2)
-   [无光照](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%97%A0%E5%85%89%E7%85%A7)
-   [混合模式支持](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F%E6%94%AF%E6%8C%81)
-   [静态网格体](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [顶点颜色](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%A1%B6%E7%82%B9%E9%A2%9C%E8%89%B2)
-   [UV](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#uv)
-   [碰撞几何体](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%A2%B0%E6%92%9E%E5%87%A0%E4%BD%95%E4%BD%93)
-   [细节级别（LOD）](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%BB%86%E8%8A%82%E7%BA%A7%E5%88%AB%EF%BC%88lod%EF%BC%89)
-   [高质量光照和反射的网格体量化](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%AB%98%E8%B4%A8%E9%87%8F%E5%85%89%E7%85%A7%E5%92%8C%E5%8F%8D%E5%B0%84%E7%9A%84%E7%BD%91%E6%A0%BC%E4%BD%93%E9%87%8F%E5%8C%96)
-   [骨骼网格体](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [动画序列](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%8A%A8%E7%94%BB%E5%BA%8F%E5%88%97)
-   [关卡序列](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%85%B3%E5%8D%A1%E5%BA%8F%E5%88%97)
-   [关卡变体集](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%85%B3%E5%8D%A1%E5%8F%98%E4%BD%93%E9%9B%86)
-   [Actor](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#actor)
-   [关卡序列Actor](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%85%B3%E5%8D%A1%E5%BA%8F%E5%88%97actor)
-   [关卡变体集Actor](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%85%B3%E5%8D%A1%E5%8F%98%E4%BD%93%E9%9B%86actor)
-   [组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%BB%84%E4%BB%B6)
-   [场景组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%9C%BA%E6%99%AF%E7%BB%84%E4%BB%B6)
-   [静态网格体组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%84%E4%BB%B6)
-   [骨骼网格体组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%84%E4%BB%B6)
-   [摄像机组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%91%84%E5%83%8F%E6%9C%BA%E7%BB%84%E4%BB%B6)
-   [定向光源组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E5%AE%9A%E5%90%91%E5%85%89%E6%BA%90%E7%BB%84%E4%BB%B6)
-   [点光源组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%82%B9%E5%85%89%E6%BA%90%E7%BB%84%E4%BB%B6)
-   [聚光源组件](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E8%81%9A%E5%85%89%E6%BA%90%E7%BB%84%E4%BB%B6)
-   [纹理](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E7%BA%B9%E7%90%86)