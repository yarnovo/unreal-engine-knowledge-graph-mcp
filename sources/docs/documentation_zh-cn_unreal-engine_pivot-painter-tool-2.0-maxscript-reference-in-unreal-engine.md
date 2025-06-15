# 虚幻引擎枢轴点绘制器工具2.0 MAXScript参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pivot-painter-tool-2.0-maxscript-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:21:27.392Z

---

目录

![枢轴点绘制器工具2.0 MAXScript参考](https://dev.epicgames.com/community/api/documentation/image/78db5b7c-072c-443b-b905-c5f8266f4916?resizing_type=fill&width=1920&height=335)

本文将介绍枢轴点绘制器工具2 3DS MAXScript的各种属性。此工具通过在纹理中存储模型的轴和旋转信息来创建非常复杂的动画。使用MAXScript可以创建层级复杂的动画，所有这些动画都可以使用UE4中的材质处理。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0269e4d8-a92e-4105-a88a-45dd4ea0adc9/pivotpainter2.png)

## 准备工具

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/356809b1-c530-426e-b883-2e41e61c0b41/preptools.png)

属性

说明

**分离选中模型的元素（Detach Selected Model's Elements）**

将对象的所有元素分离为单独的对象。

**保留自定义法线（慢速）（Preserve Custom Normals (Slow)）**

按照现有模型元素的数量复制模型，然后将每个副本中除一个元素之外的所有元素删除。这是为了保留网格体自定义法线。

此方法可能非常耗时，具体取决于要分离的元素数量，因为模型将按现有元素的数量复制。我们建议仅在绝对必要时使用此方法。

\]

基于渗透分离元素（Detach Elements Based on Penetration）

 

**选择所选对象（Pick Selected Obj）**

选择可编辑的多边形对象，不应用任何修饰符。请勿为"选择对象"和"要处理的模型"选项选择相同的对象。（注意：不应选择有孔的网格体。）

**选择要处理的模型（Pick Model to Proc）**

选择可编辑的多边形对象，不应用任何修饰符。请勿为"选择对象"和"要处理的模型"选项选择相同的对象。（注意：不应选择有孔的网格体。）

**分离接触的模型元素（Detach Model Elements That Touch）**

将接触或穿透所选对象几何体的元素分离为单独的对象。（注意：如果所选对象有孔，此工具将不起作用。）

生成新的枢轴点（Generate New Pivot Points）

 

**选择模型选择集（Pick Your Model Selection Set）**

使用此下拉列表来选择模型选择集。

-   **更新（Update）**：按下此按钮可从3DS Max获取最新的选择集。
-   **管理（Manage）**：按下此按钮可管理选择集。

**选择叶子枢轴点对象（Pick Leaf Pivot Obj）**

选择是基于样条的结点还是基于可编辑多边形对象的顶点构建枢轴点。这将启用 **选择样条（Pick Spline）** 或 **选择网格体（Pick Mesh）** 按钮选择

-   **选择样条（Pick Spline）**：使用此按钮在场景视口中选择样条。该脚本将找到每个模型与样条的每个结点之间的最近顶点对。然后，将对象的枢轴点移至该顶点的位置，并根据模型为轴定向。X轴从所需顶点指向模型的中心。Z轴指向表面法线的方向。顶点数量越多，处理时间越长。（警告：请勿使用H列表热键。必须从视口中选择对象。）（提示：对于草，在草下方放置使用一个或两个结点的样条可以加快计算速度）。
-   **选择网格体（Pick Mesh）**：使用此按钮在场景视口中选择网格体。该脚本将找到模型的枢轴点和模型的顶点之间最接近的匹配顶点。然后，将叶子的轴向与多边形方向和顶点位置对齐。警告：请勿使用H列表热键。必须从视口中选择对象。）（提示：对于草，在草下方放置使用一个或两个结点的样条可以加快计算速度）。

**枢轴点附近要平均的面法线数（Num of Face Norms to Avg Near Pivot）**

输入一个值来指定要在枢轴点附近平均的面法线数。这样你就可以控制受影响的法线数量；或者你也可以直接启用 **全部平均（Average All）** 复选框，将枢轴点附近所有可用面的法线都包含在内。

**创建新枢轴点（Create New Pivots）**

为选择集中的每个可编辑多边形对象创建新的枢轴点。枢轴点放置在最接近选中样条中结点的模型顶点或者所选可编辑多边形对象的顶点。枢轴点的X轴指向网格体的平均中心。网格体的边界也会重建并与新的枢轴点对齐。

重建边界框（Recreate Bounding Boxes）

 

**处理选中对象（Process Selected Objects）**

通过子对象操作更改模型时，边界框会扩展以适合模型元素的大小，但不会自动与模型的枢轴点重新对齐。此函数可以重新生成与模型的基矢量对齐的对象边界框。要在处理部分成功地结合使用轴工具与顶点alpha绘制工具，必须正确构建边界框。

属性

说明

**更新（Update）**

按下此按钮可从3DS Max获取最新的选择集。

**管理（Manage）**

按下此按钮可管理选择集。

属性

说明

**选择样条（Pick Spline）**

使用此按钮在场景视口中选择样条。该脚本将找到每个模型与样条的每个结点之间的最近顶点对。然后，将对象的枢轴点移至该顶点的位置，并根据模型为轴定向。X轴从所需顶点指向模型的中心。Z轴指向表面法线的方向。顶点数量越多，处理时间越长。（警告：请勿使用H列表热键。必须从视口中选择对象。）（提示：对于草，在草下方放置使用一个或两个结点的样条可以加快计算速度）。

**选择网格体（Pick Mesh）**

使用此按钮在场景视口中选择网格体。该脚本将找到模型的枢轴点和模型的顶点之间最接近的匹配顶点。然后，将叶子的轴向与多边形方向和顶点位置对齐。警告：请勿使用H列表热键。必须从视口中选择对象。）（提示：对于草，在草下方放置使用一个或两个结点的样条可以加快计算速度）。

## 渲染选项

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15a9d477-4ea2-41e2-82ef-632065091bae/renderoptions.png)

属性

说明

**处理选中对象层级（Process The Selected Object Hierarchy）**

选择网格体并单击"绘制"。此脚本将通过共享层级查找连接到选中网格体的所有可编辑多边形网格体。（可以使用3DS Max Link工具将一个对象连接到另一个对象）。找到这些网格体后，脚本会更改选定的UV信道，使其成为要生成的后续纹理的基础。默认纹理包含图像RGB信道中的枢轴点位置和alpha索引等模型信息。使用该索引可以查找当前网格体的父网格体。这在虚幻引擎4中已被制作为简单的枢轴点绘制器2.0材质功能。

**UVs**

 

**纹理坐标位置（Texture Coordinate Location）**

枢轴点绘制器2创建纹理来存储模型信息。这些纹理然后可在虚幻引擎中被引用。这些模型要求UV坐标将每个元素与数据纹理的一个像素相关联。在此下拉列表中，你可以指定坐标的位置。

任何引用枢轴点绘制器2纹理的着色器都必须使用坐标索引，并且选择资源的顺序决定着UV和纹理的创建方式。如果要烘焙多组枢轴点绘制器2纹理，可以创建一个选择集，重复使用它来选择模型，然后再次按 **绘制（Paint）** 按钮。

**Custom Textures**

 

**Texture 1 RGB**

选项：

-   **勿渲染（Do not render）**：此选项可防止纹理1被写入。
-   **枢轴点位置（16位）（Pivot Position (16-bit)）**：将HDR枢轴点的位置信息写入纹理的RGB信道。在着色器中引用时，需要使用 **ms\_PivotPainter2\_DecodePosition** 函数对此信息进行解码。
-   **原点位置（16位）（Origin Position (16-bit)）**：将HDR对象边界的中心点信息写入纹理的RGB信道。在着色器中引用时，需要使用 **ms\_PivotPainter2** 函数对此信息进行解码。
-   **原点范围（16位）（Origin Extents (16-bit)）**：在模型原点的每个基矢量位置存储模型的最大长度，并将其存储为三个浮点。你可以直接引用局部值，但在着色器中引用时应使用 **ms\_PP2\_DecodeOriginExtent**。
-   **X矢量（8位）（X Vector (8-bit)）**：存储模型的X轴基矢量。在材质中引用时，需使用 **ms\_PivotPainter2\_DecodeAxisVector** 对其进行解码。
-   **Y矢量（8位）（X Vector (8-bit)）**：存储模型的Y轴基矢量。在材质中引用时，需使用 **ms\_PivotPainter2\_DecodeAxisVector** 对其进行解码。
-   **Z矢量（8位）（X Vector (8-bit)）**：存储模型的Z轴基矢量。在材质中引用时，需使用 **ms\_PivotPainter2\_DecodeAxisVector** 对其进行解码。

**Texture 1 Alpha**

选项：

可用的16位选择选项：

-   **父索引（整数作为浮点）（Parent Index (Int as float)）**：使用枢轴点绘制器2，用户可以在虚幻引擎的材质系统中重新创建复杂的层级。它的工作原理是对纹理中的点进行反复采样，并使用在此过程中收集的信息重新构建层级。使用"父索引"选项，我们可以读取像素并确定其父对象的枢轴点信息在同一纹理中的位置。直接引用此数据被视为一项高级任务。在大多数情况下，我们将使用默认纹理设置来处理模型，然后将其结合 **PivotPainter2FoliageShader** 函数使用。此函数最多可重建4个级别的层级深度，并提供处理植物叶子动画所需的许多动画功能按钮。如果你想自己创建一个复杂的网络，由于该信道的数据是整数，应将其解码为浮点形式后再通过 **ms\_PivotPainter2\_UnpackIntegerAsFloat** 引用。然后将在 **ms\_PivotPainter2\_ReturnParentTextureInfo** 中使用此信息，以返回对象的父对象的UV位置。**是否子代？（Is Child?）**（参见下面的"注意"部分）输出引脚返回的黑色或白色值表示像素是指向作为其父代的其他像素还是指向自身（即它就是根对象）。有关更多信息，请参考 **PivotPainter2FoliageShader** 函数。
    
    纹理1和纹理2的渲染选项是相同的。如果选择16位RGB选项，会显示16位Alpha选项，隐藏8位Alpha选项。相反，如果选择8位RGB选项，则会显示8位Alpha选项，隐藏16位选项。
    
-   **从根开始的步骤数（Number of Steps From Root）**：无需另外执行解码步骤即可引用此浮点值。它表示从根到当前对象的步骤数。
-   **每元素随机0-1值（Random 0-1 Value Per Element）**：存储为每个项目随机生成的0-1范围随机数，并可在不另外使用解码材质函数的情况下引用。
-   **边界框直径（Bounding Box Diameter）**：将正在处理的对象的局部空间直径存储为浮点值。通过将输出乘以 **ObjectScale** 材质函数的输出，可以将其转换为全局空间比例。
-   **选择顺序（整数作为浮点）（Selection Order (Int as float)）**：选择此选项时，在3DS Max中选择对象的顺序将存储为整数。要引用此信息，请使用 **ms\_PivotPainter\_UnpackIntegerAsFloat**。
    
    有关示例用例，请参阅内容示例 **PivotPainter2** 映射。
    
-   **规格化0-1层级位置（Normalized 0-1 Hierarchy Position）**：选中后，3DS MAXScript将查找所选对象层级的总深度，再查找层级中对象的深度，然后将对象的当前深度除以总深度以进行规格化。该信息存储为0-1浮点值，不需要解码。
-   **对象X宽度（Object X Width）**：返回一个浮点值，该值等于在3DS Max中处理的对象沿其局部X矢量测量的总长度。
-   **对象Y深度（Object Y Depth）**：返回一个浮点值，该值等于在3DS Max中处理的对象沿其局部Y矢量测量的总长度。
-   **对象Z高度（Object Z Height）**：返回一个浮点值，该值等于在3DS Max中处理的对象沿其局部Z矢量测量的总长度。

可用的8位选择选项：

-   **规格化0-1层级位置（Normalized 0-1 Hierarchy Position）**：选中后，3DS MAXScript将查找所选对象层级的总深度，再查找层级中对象的深度，然后将对象的当前深度除以总深度以进行规格化。该信息存储为0-1浮点值，不需要解码。
-   **每元素随机0-1值（Random 0-1 Value Per Element）**：存储为每个项目随机生成的0-1范围随机数，并可在不另外使用解码材质函数的情况下引用。
-   **X范围除以2048 – 2048最大值（X Extent Divided by 2048 - 2048 Max）**：返回一个8位浮点值，该值等于在3DS Max中处理的对象沿其局部X矢量测量的总长度。这些值使用 **ms\_PivotPainter2\_Decode8BitAlphaAxisExtent** 对值进行解码。
    
    此格式以8为增量来表示介于8和2048之间的值。
    
-   **Y范围除以2048 – 2048最大值（X Extent Divided by 2048 - 2048 Max）**：返回一个8位浮点值，该值等于在3DS Max中处理的对象沿其局部Y矢量测量的总长度。这些值使用 **ms\_PivotPainter2\_Decode8BitAlphaAxisExtent** 对值进行解码。
    
    此格式以8为增量来表示介于8和2048之间的值。
    
-   **Z范围除以2048 – 2048最大值（X Extent Divided by 2048 - 2048 Max）**：返回一个8位浮点值，该值等于在3DS Max中处理的对象沿其局部Z矢量测量的总长度。这些值使用 **ms\_PivotPainter2\_Decode8BitAlphaAxisExtent** 对值进行解码。
    
    此格式以8为增量来表示介于8和2048之间的值。
    

**Texture 2 RGB**

选项：

-   **勿渲染（Do not render）**：此选项可防止纹理1被写入。
-   **枢轴点位置（16位）（Pivot Position (16-bit)）**：将HDR枢轴点的位置信息写入纹理的RGB信道。在着色器中引用时，需要使用 **ms\_PivotPainter2\_DecodePosition** 函数对此信息进行解码。
-   **原点位置（16位）（Origin Position (16-bit)）**：将HDR对象边界的中心点信息写入纹理的RGB信道。在着色器中引用时，需要使用 **ms\_PivotPainter2** 函数对此信息进行解码。
-   **原点范围（16位）（Origin Extents (16-bit)）**：在模型原点的每个基矢量位置存储模型的最大长度，并将其存储为三个浮点。你可以直接引用局部值，但在着色器中引用时应使用 **ms\_PP2\_DecodeOriginExtent**。
-   **X矢量（8位）（X Vector (8-bit)）**：存储模型的X轴基矢量。在材质中引用时，需使用 **ms\_PivotPainter2\_DecodeAxisVector** 对其进行解码。
-   **Y矢量（8位）（X Vector (8-bit)）**：存储模型的Y轴基矢量。在材质中引用时，需使用 **ms\_PivotPainter2\_DecodeAxisVector** 对其进行解码。
-   **Z矢量（8位）（X Vector (8-bit)）**：存储模型的Z轴基矢量。在材质中引用时，需使用 **ms\_PivotPainter2\_DecodeAxisVector** 对其进行解码。

**Texture 2 Alpha**

选项：

可用的16位选择选项 ：

-   **父索引（整数作为浮点）（Parent Index (Int as float)）**：使用枢轴点绘制器2，用户可以在虚幻引擎的材质系统中重新创建复杂的层级。它的工作原理是对纹理中的点进行反复采样，并使用在此过程中收集的信息重新构建层级。使用"父索引"选项，我们可以读取像素并确定其父对象的枢轴点信息在同一纹理中的位置。直接引用此数据被视为一项高级任务。在大多数情况下，我们将使用默认纹理设置来处理模型，然后将其结合 **PivotPainter2FoliageShader** 函数使用。此函数最多可重建4个级别的层级深度，并提供处理植物叶子动画所需的许多动画功能按钮。如果你想自己创建一个复杂的网络，由于该信道的数据是整数，应将其解码为浮点形式后再通过 **ms\_PivotPainter2\_UnpackIntegerAsFloat** 引用。然后将在 **ms\_PivotPainter2\_ReturnParentTextureInfo** 中使用此信息，以返回对象的父对象的UV位置。**是否子代？（Is Child?）**（参见下面的"注意"部分）输出引脚返回的黑色或白色值表示像素是指向作为其父代的其他像素还是指向自身（即它就是根对象）。有关更多信息，请参考 **PivotPainter2FoliageShader** 函数。
    
    纹理1和纹理2的渲染选项是相同的。如果选择16位RGB选项，会显示16位Alpha选项，隐藏8位Alpha选项。相反，如果选择8位RGB选项，则会显示8位Alpha选项，隐藏16位选项。
    
-   **从根开始的步骤数（Number of Steps From Root）**：无需另外执行解码步骤即可引用此浮点值。它表示从根到当前对象的步骤数。
-   **每元素随机0-1值（Random 0-1 Value Per Element）**：存储为每个项目随机生成的0-1范围随机数，并可在不另外使用解码材质函数的情况下引用。
-   **边界框直径（Bounding Box Diameter）**：将正在处理的对象的局部空间直径存储为浮点值。通过将输出乘以 **ObjectScale** 材质函数的输出，可以将其转换为全局空间比例。
-   **选择顺序（整数作为浮点）（Selection Order (Int as float)）**：选择此选项时，在3DS Max中选择对象的顺序将存储为整数。要引用此信息，请使用 **ms\_PivotPainter\_UnpackIntegerAsFloat**。
    
    有关示例用例，请参阅内容示例 **PivotPainter2** 映射。
    
-   **规格化0-1层级位置（Normalized 0-1 Hierarchy Position）**：选中后，3DS MAXScript将查找所选对象层级的总深度，再查找层级中对象的深度，然后将对象的当前深度除以总深度以进行规格化。该信息存储为0-1浮点值，不需要解码。
-   **对象X宽度（Object X Width）**：返回一个浮点值，该值等于在3DS Max中处理的对象沿其局部X矢量测量的总长度。
-   **对象Y深度（Object Y Depth）**：返回一个浮点值，该值等于在3DS Max中处理的对象沿其局部Y矢量测量的总长度。
-   **对象Z高度（Object Z Height）**：返回一个浮点值，该值等于在3DS Max中处理的对象沿其局部Z矢量测量的总长度。

可用的8位选择选项

-   **规格化0-1层级位置（Normalized 0-1 Hierarchy Position）**：选中后，3DS MAXScript将查找所选对象层级的总深度，再查找层级中对象的深度，然后将对象的当前深度除以总深度以进行规格化。该信息存储为0-1浮点值，不需要解码。
-   **每元素随机0-1值（Random 0-1 Value Per Element）**：存储为每个项目随机生成的0-1范围随机数，并可在不另外使用解码材质函数的情况下引用。
-   **X范围除以2048 – 2048最大值（X Extent Divided by 2048 - 2048 Max）**：返回一个8位浮点值，该值等于在3DS Max中处理的对象沿其局部X矢量测量的总长度。这些值使用 **ms\_PivotPainter2\_Decode8BitAlphaAxisExtent** 对值进行解码。
    
    此格式以8为增量来表示介于8和2048之间的值。
    
-   **Y范围除以2048 – 2048最大值（X Extent Divided by 2048 - 2048 Max）**：返回一个8位浮点值，该值等于在3DS Max中处理的对象沿其局部Y矢量测量的总长度。这些值使用 **ms\_PivotPainter2\_Decode8BitAlphaAxisExtent** 对值进行解码。
    
    此格式以8为增量来表示介于8和2048之间的值。
    
-   **Z范围除以2048 – 2048最大值（X Extent Divided by 2048 - 2048 Max）**：返回一个8位浮点值，该值等于在3DS Max中处理的对象沿其局部Z矢量测量的总长度。这些值使用 **ms\_PivotPainter2\_Decode8BitAlphaAxisExtent** 对值进行解码。
    
    此格式以8为增量来表示介于8和2048之间的值。
    

## 顶点Alpha描画器

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0471d879-fdd9-44e4-81b5-285f3611ebe1/vertexalphapainter.png)

属性

说明

**Alpha信道衰减功能按钮**

 

**到枢轴点3D距离乘数（3D dist to piv multiplier）**

此值将与从枢轴点到当前顶点的距离计算结果相乘。

**到枢轴点3D距离对比度（3D dist to piv contrast）**

使用"对比度"选项作为基于对象枢轴点和当前顶点位置之间的梯度应用于距离的幂函数的指数。

**XYZ乘数（XYZ Multiplier）**

有选择地增加和减少局部空间梯度对X、Y和Z的影响。梯度根据顶点与由对象的枢轴点和轴向所定义的对象中心线之间的距离形成。

**XYZ对比度（XYZ Contrast）**

应用于XYZ梯度结果的幂函数的指数。

**绘制当前选择（Paint Current Selection）**

这将使用上述参数在选择集中绘制可编辑的多边形对象。除折叠可编辑多边形对象之外的对象将被忽略。

**绘制纯色值（Solid Value Painting）**

 

**值（Value）**

使用0到1之间的任何值，将选定网格体绘制为纯色。0是黑色，1是纯白色。

**为选定网格体绘制纯色值（Paint Selected Meshes a Solid Value）**

使用零值填充顶点alpha。在虚幻着色器中可引用此值来隔离或删除某些元素中的动画。

预览选中对象（Preview on Selected Objects）

 

**漫反射（Diffuse）**

单击活动视口来查看此新信道。

**Alpha**

单击活动视口来查看此新信道。

**色彩（Color）**

单击活动视口来查看此新信道。

## 打包模式

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c4c335a-dce8-4d34-8e11-97532aedd0a1/packagemodel.png)

属性

说明

**合并选定模型的法线（Merge Selected Model's Normals）**

选择包含触碰、开放边缘的多个模型。此功能将平均其法线以形成连续曲面。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [artist tool](https://dev.epicgames.com/community/search?query=artist%20tool)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [准备工具](/documentation/zh-cn/unreal-engine/pivot-painter-tool-2.0-maxscript-reference-in-unreal-engine#%E5%87%86%E5%A4%87%E5%B7%A5%E5%85%B7)
-   [渲染选项](/documentation/zh-cn/unreal-engine/pivot-painter-tool-2.0-maxscript-reference-in-unreal-engine#%E6%B8%B2%E6%9F%93%E9%80%89%E9%A1%B9)
-   [顶点Alpha描画器](/documentation/zh-cn/unreal-engine/pivot-painter-tool-2.0-maxscript-reference-in-unreal-engine#%E9%A1%B6%E7%82%B9alpha%E6%8F%8F%E7%94%BB%E5%99%A8)
-   [打包模式](/documentation/zh-cn/unreal-engine/pivot-painter-tool-2.0-maxscript-reference-in-unreal-engine#%E6%89%93%E5%8C%85%E6%A8%A1%E5%BC%8F)