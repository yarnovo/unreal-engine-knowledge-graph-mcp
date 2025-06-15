# 虚幻引擎工具类材质表达式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:28:25.046Z

---

目录

![工具类材质表达式](https://dev.epicgames.com/community/api/documentation/image/12a99642-1f6d-4ba6-b74a-ffec2310eb2c?resizing_type=fill&width=1920&height=335)

**实用材质表达式**是会对材质造成多种不同影响的节点，或许跟以往有很大不同。 例如，**GIReplace**节点会使用你输入的给定值取代对象间接反射颜色，而Linear Interpolate节点能帮你根据Alpha输入混合两个纹理。 下文将详细介绍材质编辑器中提供的所有实用表达式节点。

## 抗锯齿纹理遮罩

**AntialiasedTextureMask**表达式让你可以使用软（抗锯齿）过渡遮罩来创建材质。 此遮罩可用来在两个复杂材质属性之间混合，或者使alpha混合材质淡出（适合与"软屏蔽"配合使用）。 您只需指定在其中一个通道（红色、绿色、蓝色或alpha）中指定了遮罩的材质，在此表达式中设置所使用的通道，并指定比较值。 假设该通道存储0（黑色）到1（白色）范围内的灰阶值，比较函数将定义产生的遮罩是应该为0还是1。 此表达式是一个参数，让**纹理（Texture）**属性可以由子材质实例重载。

项目

说明

属性

 

**阈值（Threshold）**

指定用作像素范围中的分界点的值。 小于此值的像素范围值将变为黑色，大于此值的像素范围值将变为白色。

**通道（Channel）**

指定要用作遮罩的纹理通道。

**纹理（Texture）**

指定要使用的遮罩纹理。

输入

 

**UVs**

接收要应用于纹理遮罩的纹理坐标。

**伪代码：**

`   Result = 1      if TextureLookup < Threshold then Result = 0         `

Result = 1 if TextureLookup &lt; Threshold then Result = 0

复制完整片段(2行长度)

实际实现要复杂得多，因为系统会尝试根据实际像素范围来返回介于0与1之间的值，以消除锯齿。

示例（为确保质量最佳，这个128x128的小纹理并未被压缩）：

[![ULogoLowBlurred.png](https://dev.epicgames.com/community/api/documentation/image/4fb9d991-cfa9-4dbd-a4cd-4231b0793755?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4fb9d991-cfa9-4dbd-a4cd-4231b0793755?resizing_type=fit)

被用作正常纹理（左上角），以及与上文所述的材质表达式配合使用（右下角）：

[![AAMasked_Demo.png](https://dev.epicgames.com/community/api/documentation/image/a9e3f26c-55bf-4108-801b-914bd6b35a9d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a9e3f26c-55bf-4108-801b-914bd6b35a9d?resizing_type=fit)

这种技术最适合在进行放大时使用，或者对模糊的输入内容应用。 压缩会导致质量大幅下降，因此，请尝试使用未经压缩的低分辨率纹理。

## BlackBody

**BlackBody**表达式会模拟材质中的[黑体辐射](http://en.wikipedia.org/wiki/Black-body_radiation)效果。 用户需要输入开氏温度，将得出的颜色和强度用来驱动基础颜色（Base Color）和自发光（Emissive）的值，以获得在物理上准确的结果。

[![Blackbody表达式](https://dev.epicgames.com/community/api/documentation/image/dd3ff166-a676-4672-9bed-07ad1dec86aa?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/dd3ff166-a676-4672-9bed-07ad1dec86aa?resizing_type=fit)

## BumpOffset

**凹凸贴图偏移（BumpOffset）**是虚幻引擎4的术语，就是通常所说的"视差映射"。 Bump Offset表达式可以使材质产生深度错觉，而不需要额外的几何体。 BumpOffset材质使用灰阶*高度图*来给出深度信息。 高度图中的值越亮，材质的"凸出"效果越明显；当摄像机在表面上移动时，这些区域将产生视差（移位）。 高度图中较暗的区域将显得"距离较远"，其移位程度也最小。

项目

说明

属性

 

**高度比（HeightRatio）**

从*高度图*中取得的深度的乘数。 值越大，深度越极端。 典型的取值范围是0.02到0.1。

**参考平面（ReferencePlane）**

指定纹理空间中要应用相关效果的近似高度。 值为0将使纹理完全离开表面，而值0.5（默认值）表示部分表面凸起，同时部分区域凹陷。

输入

 

**坐标（Coordinate）**

接收此表达式所要修改的基本纹理坐标。

**高度（Height）**

接收要用作高度图的纹理（或值）。

**高度比输入（HeightRatioInput）**

从*高度图*中取得的深度的乘数。 值越大，深度越极端。 典型的取值范围是0.02到0.1。 如果使用此输入，那么它将取代"高度比"（Height Ratio）属性中的所有值。

[![Bump Offset表达式](https://dev.epicgames.com/community/api/documentation/image/6688bfbc-deed-4fcd-b833-a83a4ce1889e?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6688bfbc-deed-4fcd-b833-a83a4ce1889e?resizing_type=fit)

## ConstantBiasScale

**ConstantBiasScale**表达式会接收输入值，加上偏差值，然后乘以比例因子并输出结果。 例如，要将输入数据从\[-1,1\]转换到\[0,1\]，请使用偏差值1.0以及比例缩放系数0.5。

属性

说明

**偏差（Bias）**

指定要与输入相加的值。

**缩放（Scale）**

指定偏差结果的乘数。

[![Constant Bias Scale表达式](https://dev.epicgames.com/community/api/documentation/image/4ca935e2-4462-4a5d-92a8-402610102178?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4ca935e2-4462-4a5d-92a8-402610102178?resizing_type=fit)

## DDX

**DDX**表达式会公开DDX导数计算，即在像素着色器计算中会使用的一种GPU硬件功能。

## DDY

**DDY**表达式会公开DDY导数计算，即在像素着色器计算中会使用的一种GPU硬件功能。

## DepthFade

**DepthFade**表达式用来隐藏半透明对象与不透明对象相交时出现的不美观接缝。

项目

说明

属性

 

**淡化距离（Fade Distance）**

这是应该发生消退的全局空间距离。 未连接 FadeDistance（FadeDistance）输入时，将使用此距离。

输入

 

**不透明度（Opacity）**

接收深度消退前对象的现有不透明度。

**淡化距离（FadeDistance）**

这是应该发生消退的全局空间距离。

![无深度淡化](https://dev.epicgames.com/community/api/documentation/image/7aa8ae52-c7c6-4766-bd1b-7cd96803b9a9?resizing_type=fit&width=1920&height=1080)

![有深度淡化](https://dev.epicgames.com/community/api/documentation/image/299602f9-0f4e-4be9-a629-a640fa691446?resizing_type=fit&width=1920&height=1080)

无深度淡化

有深度淡化

本示例的材质网络如下图所示。

[![深度淡化材质图表](https://dev.epicgames.com/community/api/documentation/image/365ac371-f390-4734-a529-3eca7b466613?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/365ac371-f390-4734-a529-3eca7b466613?resizing_type=fit)

## DepthOfFieldFunction

**Depth Of Field Function**表达式旨在让美术师能控制当材质因景深而模糊时材质所发生的情况。 表达式会输出介于0与1之间的值，其中0代表"清晰"，而1代表"完全模糊"。举例说明，这对于在纹理的清晰版本与模糊版本之间进行插值非常有用。 "深度"（Depth）输入让你可以使用其他计算结果来重载场景的景深计算所产生的现有结果。

![混合后的颜色](https://dev.epicgames.com/community/api/documentation/image/94f43c30-4e9b-49fa-a474-8304e4d2942c?resizing_type=fit&width=1920&height=1080)

![混合常规纹理与模糊纹理](https://dev.epicgames.com/community/api/documentation/image/c2b73716-86c7-4b07-a0ff-3fe2c3fb18c8?resizing_type=fit&width=1920&height=1080)

混合后的颜色

混合常规纹理与模糊纹理

[![景深函数](https://dev.epicgames.com/community/api/documentation/image/193dcfee-3bae-46f2-a864-ce8a386bf4b2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/193dcfee-3bae-46f2-a864-ce8a386bf4b2?resizing_type=fit)

点击查看大图。

## 去饱和度

**Desaturation**表达式会对其输入进行去饱和度，即根据特定百分比将其输入的颜色转换为灰阶。

项目

说明

属性

 

**亮度因子（Luminance Factors）**

指定每个通道对去饱和颜色的影响量。 此属性确保在去饱和度之后，绿色比红色亮，而红色比蓝色亮。

输入

 

**小数（Fraction）**

指定要应用于输入的去饱和量。 百分比的范围为0.0（完全原始颜色，不去饱和度）到1.0（完全去饱和度）。

[![去饱和度示例](https://dev.epicgames.com/community/api/documentation/image/af630735-58c6-403c-ac7d-69634bdacd40?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/af630735-58c6-403c-ac7d-69634bdacd40?resizing_type=fit)

**程序员需知：**定义去饱和颜色`D`、输入颜色`I`和亮度因子`L`。 输出将为`O = (1 - 百分比)*( D.dot( I )) + 百分比 * I`

## 距离（Distance）

**Distance**表达式会计算两个点/颜色/位置/向量之间的欧氏距离，并输出结果值。 此表达式可作用于单分量、双分量、三分量和四分量向量，但此表达式的两个输入均必须具有相同数目的通道。

项目

说明

输入

 

**A**

接受一个值或任意长度的向量。

**B**

接受一个值或任意长度的向量。

![注意颜色如何随着摄像机距离的增加而变化。](https://dev.epicgames.com/community/api/documentation/image/eadb1aab-793e-4679-8322-810f58327789?resizing_type=fit&width=1920&height=1080)![注意颜色如何随着摄像机距离的增加而变化。](https://dev.epicgames.com/community/api/documentation/image/b9040fdf-61e3-4eac-bf9e-a5da1e52a423?resizing_type=fit&width=1920&height=1080)

**注意颜色如何随着摄像机距离的增加而变化。**

**伪代码：**

`Result = length (A - B)`

Result = length (A - B)

复制完整片段(1行长度)

**低级别HLSL代码：**

`float Result = sqrt (dot (A-B, A-B))`

float Result = sqrt (dot (A-B, A-B))

复制完整片段(1行长度)

## DistanceFieldGradient

**DistanceFieldGradient**材质表达式节点在被规格化后会输出对象在距离场中的XYZ移动方向。 这让Distance Field Gradient材质表达式节点非常适合用于需要模拟液体流动效果的材质。

要让此表达式生效，必须在**项目设置（Project Settings）**的**渲染（Rendering）**中启用**生成网格体距离场（Generate Mesh Distance Fields）**。

项目

说明

**位置（Position）**

如果未输入内容，那么默认为当前世界位置。

下图是在材质中使用**DistanceFieldGradient**材质表达式的示例。 在此示例中，请务必注意，必须先将DistanceFieldGradient规格化，然后再将其输入到Mask Channel节点中。 这样做的原因是，不先将DistanceFieldGradient规格化就无法获得方向性数据。 为方便在材质实例中切换RGB通道，我们添加了"遮罩通道"（Mask Channel）参数。

[![距离场梯度](https://dev.epicgames.com/community/api/documentation/image/1c1a07ee-2e1a-46f6-bb53-06c36ff58f15?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1c1a07ee-2e1a-46f6-bb53-06c36ff58f15?resizing_type=fit)

点击查看大图。

下图是DistanceFieldGradient的实际使用示例。 下图显示了启用各种RGB后DistanceFieldGradient将会使用的数据。

[![](https://dev.epicgames.com/community/api/documentation/image/b114c16e-c153-4d28-9631-0b3f7b8179ee?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b114c16e-c153-4d28-9631-0b3f7b8179ee?resizing_type=fit)

点击查看大图。

编号

说明

**1**

启用R通道并禁用所有其他通道。

**2**

启用G通道并禁用所有其他通道。

**3**

启用B通道并禁用所有其他通道。

## DistanceToNearestSurface

**Distance To Nearest Surface**材质表达式节点让材质可以对"全局距离场"关卡中的任意点进行取样。 该材质表达式会输出从距离场到场景中最近遮挡物的有向距离（以世界空间单位计）。

要让此表达式生效，必须在**项目设置（Project Settings）**的**渲染（Rendering）**中启用**生成网格体距离场（Generate Mesh Distance Fields）**。

项目

说明

**位置（Position）**

如果未输入内容，那么默认为当前世界位置。

以下是**Distance To Nearest Surface**材质表达式的实际应用示例。

[![到表面的距离](https://dev.epicgames.com/community/api/documentation/image/6c7a7f39-dfcf-408a-bb21-980a98b6e11c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6c7a7f39-dfcf-408a-bb21-980a98b6e11c?resizing_type=fit)

点击查看大图。

[![](https://dev.epicgames.com/community/api/documentation/image/7fac695f-8ab2-41bb-8fb7-51a233617857?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7fac695f-8ab2-41bb-8fb7-51a233617857?resizing_type=fit)

在示例中，Distance To Nearest Surface被输送到材质上的"不透明度"（Opacity）输入，而该材质被应用于放在关卡地板正上方的"静态网格体"平面。 Distance To Nearest Surface的作用是向材质表明，仅在静态网格体平面与场景中放置的其他静态网格体开始相交的区域呈现红色。

## FeatureLevelSwitch

**Feature Level Switch**节点让你可以制作简化的材质，以供性能不足的设备使用。

**示例用法**：你可以让材质使用10个重叠纹理及复杂的数学运算，但同时针对移动端设备仅使用单个静态纹理（功能级别ES2）。

输入

说明

**默认值（Default）**

默认功能级别。

**ES2**

由OpenGL ES2的核心功能定义的功能级别。

**ES3.1**

由Metal级设备的功能定义的功能级别。

**SM4**

由DX10 Shader Model 4的核心功能定义的功能级别。

**SM5**

由DX11 Shader Model 5的核心功能定义的功能级别。

## 菲涅尔

**Fresnel**表达式会根据表面法线与摄像机方向的点积来计算衰减。 当表面法线正对摄像机时，输出值为0。 当表面法线垂直于摄像机时，输出值为1。 结果会限制在\[0,1\]范围内，这样就不会在中心看到负值颜色。

项目

说明

属性

 

**指数（Exponent）**

指定输出值的衰减速度。 值越大，意味着衰减越紧或越快。

**基本反射率（Base Reflect Fraction）**

指定从正对表面的方向查看表面时，高光度反射率。 值为1时事实上会禁用菲涅尔效果。

输入

 

**指数输入（ExponentIn）**

指定输出值的衰减速度。 值越大，意味着衰减越紧或越快。 如果使用此输入，那么值将始终取代"指数"（Exponent）属性的值。

**基本反射率（Base Reflect Fraction）**

指定从正对表面的方向查看表面时，高光度反射率。 值为1时事实上会禁用菲涅尔效果。 如果使用此输入，那么值将始终取代"指数"（Exponent）属性的值。

**法线（Normal）**

接收三通道向量值，该值表示表面在世界空间中的法线。 要查看应用于菲涅尔对象表面的法线贴图的结果，请将该法线贴图连接到材质的"法线"（Normal）输入，然后连接一个[PixelNormalWS](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine)表达式到此菲涅耳上的输入。 如果未指定任何法线，则使用网格体的切线法线。

[![菲涅尔示例](https://dev.epicgames.com/community/api/documentation/image/de9ed0c9-3dac-4ca9-9a81-6b7a28a342eb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/de9ed0c9-3dac-4ca9-9a81-6b7a28a342eb?resizing_type=fit)

## GIReplace

**GIReplace**让美术师可以指定另一个表达式链（通常更为简单），以便在材质用于GI时使用。

**示例用法**：Lightmass静态GI和LPV动态GI使用此表达式。

输入

说明

**默认值（Default）**

默认GI。

**静态间接（StaticIndirect）**

用于烘焙后的间接光照。

**动态间接（DynamicIndirect）**

用于动态间接光照。

## LightmassReplace

**LightmassReplace**表达式会在为法线渲染而编译材质时传递"实时"（Realtime）输入，并在为全局光照导出材质到Lightmass时传递Lightmass输入。 这能用来处理那些在导出版本中无法正确处理的材质表达式，例如WorldPosition。

输入

说明

**实时（Realtime）**

接收针对法线渲染传递的值。

**Lightmass**

接收在将材质导出至Lightmass时要传递的值。

## 线性插值

**LinearInterpolate**表达式会以第三个输入值为遮罩参数，然后在两个输入值之间进行混合。 可以想象成两张纹理根据一张遮罩进行过渡，类似Photoshop中的图层遮罩。 遮罩Alpha的强度决定了两个输入值贡献的权重。 如果Alpha为0.0，则使用第一个输入。 如果Alpha为1.0，则使用第二个输入。 如果Alpha在0.0和1.0之间，输出是两个输入之间的插值。 注意，混合是按通道进行的。 因此，如果Alpha为RGB颜色，那么Alpha的红色通道值定义A与B的红色通道之间的混合，而与Alpha的绿色通道**无关**，该通道定义A与B的绿色通道之间的混合。

项目

说明

属性

 

**常量A（Const A）**

映射到0.0的值。 仅当未连接A输入时才使用。

**常量B（Const B）**

映射到1.0的值。 仅当未连接B输入时才使用。

**常量Alpha（Const Alpha）**

该输入值会被用作遮罩Alpha值。 仅当未连接Alpha输入时才使用。

输入

 

**A**

该输入值会被映射成0.0。

**B**

接收映射到1.0的值。

**Alpha**

该输入值会被用作遮罩Alpha值。

**程序员需知：**LinearInterpolate会根据参数值Alpha在A与B之间执行逐通道插值。

[![插值示例](https://dev.epicgames.com/community/api/documentation/image/e3aa59b6-f554-4e88-adb4-f09d30ea793d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e3aa59b6-f554-4e88-adb4-f09d30ea793d?resizing_type=fit)

## 噪点

**Noise**表达式会建立程序化噪点场，从而让你得以控制其生成方式。

项目

说明

属性

 

**缩放（Scale）**

更改噪点单元格的整体大小。 数字越小，噪点越大。

**质量（Quality）**

外观/性能设置。 值越小，速度越快，但可能外观越差；值越大，速度越慢，但可能外观越好。

**函数（Function）**

-   **Simplex**（基于纹理）：高质量，可直接使用并用于凹凸，每个等级约77个指令，4个纹理查找，不能平铺。
    
-   **Gradient**（基于纹理）：高质量，可直接使用并用于凹凸。 无平铺（Non-tiled）：每个等级约61个指令，8个纹理查找。 平铺（Tiling）：每个等级约74个指令，8个纹理查找。 即使"无平铺"模式的重复也可以达到128。 适用的重复大小范围<=128。 之前被标记为Perlin噪点。
    
-   **Fast Gradient**（3D纹理）：高质量，可直接使用，**不适用于**凹凸。 每个等级约16个指令，1个纹理查找。 固定以16重复进行平铺，Fast Gradient噪点不可选择"平铺"模式。
    
-   **Gradient**（计算）：高质量，可直接使用并用于凹凸。 无平铺（Non-tiled）：每个等级约80个指令，无纹理。 平铺（Tiling）：每个等级约143个指令，无纹理。
    
-   **Value**（计算）：低质量，但为纯计算。 无平铺（Non-tiled）：每个等级约53个指令，无纹理。 平铺（Tiling）：每个等级约118个指令，无纹理。 之前被错误标记为Gradient噪点。
    
-   **Voronoi**：亦称Worley或Cellular噪点。 质量为1则搜索8个单元格，质量为2则搜索16个单元格，质量为3则搜索27个单元格，质量为4则搜索32个单元格。 每个单元格总共搜索约20个指令。
    

**干扰（Turbulence）**

启用干扰后，每个噪点倍频只会为结果增加绝对值。 会改变视觉特征，并能形成类似陡峭山脊的复杂形状

**级别（Levels）**

不同范围的待合并噪点级别数量，乘以级别数量的计算开销。

**最小输出（Output Min）**

噪点计算的最低值输出。

**最大输出（Output Max）**

噪点计算的最高值输出。

**级别范围（Level Scale）**

级别范围始终为活动状态，将决定各新倍频的范围变化量。

**平铺（Tiling）**

对于支持该属性的噪点函数，允许噪点平铺。 此函数使用成本较高，但在将噪点烘焙到无缝缠绕纹理时很有用。

**重复大小（Repeat Size）**

平铺时噪点应多久重复一次。

输入

**位置（Position）**

允许通过三维向量来调整纹理大小。

**过滤宽度（FilterWidth）**

实际上控制着应用于噪点纹理的模糊程度。

[![噪点示例](https://dev.epicgames.com/community/api/documentation/image/64afaeb1-6327-44e4-b7cf-d037158c2da0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/64afaeb1-6327-44e4-b7cf-d037158c2da0?resizing_type=fit)

## Previous Frame Switch

**Previous Frame Switch**材质表达式可被用于生成正确的运动向量，以正确地配合时间抗锯齿和动态模糊，从而协助实现材质中的复杂[顶点动画](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/vertex-animation-tool-in-unreal-engine)。

仅随时间而变的材质已经可以不加修改直接使用，但是，它们无法考虑可能在运行时影响动画的其他变量，例如材质参数。 Previous Frame Switch材质表达式可用于跟踪这些参数如何变化，从而手动解决这些问题。 例如，在蓝图中，它们可以手动提供表达式，用于帧之间的世界位置偏移变化所导致的动态向量生成。

要让此表达式生效，必须在**项目设置（Project Settings）**的**渲染（Rendering）**中启用来自顶点变形的速度（Velocities from vertex deformation）。

-   4.24及之前版本使用**来自顶点变形的精准速度（Accurate Velocities from Vertex Deformation）**
    
-   4.25及之后的版本使用**顶点变形决定的输出速度（Output velocities due to vertex deformation）**
    

项目

说明

当前帧（Current Frame）

作为起点参考的方向向量。

上一帧（Previous Frame）

作为待添加模糊量的XYZ参考的方向向量。

下图是在材质中使用**Previous Frame Switch**材质表达式的示例。

[![Previous Frame Switch](https://dev.epicgames.com/community/api/documentation/image/549f32d6-abcf-42e7-8c38-3ba93a7f1add?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/549f32d6-abcf-42e7-8c38-3ba93a7f1add?resizing_type=fit)

在示例中，Previous Frame Switch使用了常量值，通过Multiply节点控制方向模糊。

在示例中，你可以看到该函数在Epic自家游戏（如《堡垒之夜》）中的使用效果，通过在屏幕上聚集的顶点动画控制动态模糊。 右侧的动画使用Previous Frame Switch来添加动态模糊，而左侧的动画则没有。

#### 视口显示标记

编辑器视口的**显示（Show）** > **可视化（Visualize）** > **上一帧的重新投影（Previous Frame's Reprojection）**下有一个显示标记，可以与**上一帧开关（Previous Frame Switch）**一起使用，从而诊断并更正当前帧和上一帧的方向性向量中的差异。

[![上一帧重新投影显示标记](https://dev.epicgames.com/community/api/documentation/image/89c8d620-6c79-490e-bc4d-758b4c98d3eb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/89c8d620-6c79-490e-bc4d-758b4c98d3eb?resizing_type=fit)

启用后，此可视化器会将当前帧颜色与上一帧比较，并返回两个帧之间的差异。 如果没有差异，材质会在视口中显示为灰色（如左图）。 如果定向向量不匹配，材质会显示彩色覆层（如右图）。

[![上一帧重新投影示例](https://dev.epicgames.com/community/api/documentation/image/633eb843-6b1f-4597-8771-968000ec52c6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/633eb843-6b1f-4597-8771-968000ec52c6?resizing_type=fit)

## 质量开关

**QualitySwitch**表达式让你可以根据引擎在不同质量级别之间的切换使用不同的表达式网络，例如在较低端的设备上使用较低的质量。

输入

说明

默认（Default）

此输入用于针对默认视觉质量而设计的网络。

低（Low）

此输入用于针对较低视觉质量而设计的网络。

高

此输入用于针对较高视觉质量而设计的网络。

## 绕轴旋转

**RotateAboutAxis**表达式在给定旋转轴、该轴上的某个点以及旋转角度的情况下，旋转三通道向量输入。 此节点输出的是旋转后的位置的偏移量，而非完全旋转后的位置本身。 这使得它成为一种简便且实用的方式，用于将旋转结果输入到世界位置偏移（World Position Offset）输入中，以实现简单的旋转操作。

输入

说明

**规范化旋转轴（NormalizedRotationAxis）**

接收一个规范化 (0-1) 向量，它代表对象的旋转轴。

**旋转角度（RotationAngle）**

旋转角度。 值1表示完全360度旋转。

**枢轴点（PivotPoint）**

接收代表枢轴点的三通道向量，对象将绕着该枢轴点旋转。

**位置（Position）**

接收代表对象位置的三通道向量。

[![绕轴旋转](https://dev.epicgames.com/community/api/documentation/image/e80fa71a-80e7-4748-9e90-57336f502dce?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e80fa71a-80e7-4748-9e90-57336f502dce?resizing_type=fit)

在以上示例中，预览平面将显示为绕着它的垂直轴旋转。

## 球体遮罩

**SphereMask**表达式会根据距离计算结果来输出遮罩值。 如果某一个输出是某个点的位置，而另一输入是具有某半径的球体的中心，那么遮罩值将是0（位于球体外部）和1（位于球体内部），并存在一定的过渡区域。 此表达式可作用于单分量、双分量、三分量和四分量向量。

项目

说明

属性

 

**衰减半径（Attenuation Radius）**

指定用于距离计算的半径。

**硬度百分比（Hardness Percent）**

指定过渡区域大小。 此项目类似于Photoshop的笔刷硬度值。 0表示硬过渡，100表示最大化过渡区域（软过渡）。

输入

 

**A**

接收一个值，该值代表要检查的点的位置。

**B**

接收一个值，该值代表球体中心。

![节点将输出值1，直至摄像机超过特定距离，此后将输出0。](https://dev.epicgames.com/community/api/documentation/image/68f8c8a9-6e78-40ce-88f5-2c38f16a5dea?resizing_type=fit&width=1920&height=1080)![节点将输出值1，直至摄像机超过特定距离，此后将输出0。](https://dev.epicgames.com/community/api/documentation/image/35b5bef9-ef5f-44b1-92cb-b997a3c9819a?resizing_type=fit&width=1920&height=1080)

**节点将输出值1，直至摄像机超过特定距离，此后将输出0。**

## 薄半透明

**Thin Translucent Material Output**表达式会在单通道中精准再现基于物理的透明材质。 你可以将其用于创建*真正的*染色或彩色透明材质，并对光照和着色做出精准的响应。

[![薄半透明图表](https://dev.epicgames.com/community/api/documentation/image/c491d475-fd84-489d-a465-050300bbbcc0?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c491d475-fd84-489d-a465-050300bbbcc0?resizing_type=fit)

点击查看大图。

在创建染色玻璃材质时，需要白色的高光和染色的背景。 它们都由基于物理的着色器在单通道中渲染，并能够表现从空气中反弹到玻璃内的光线，以及从玻璃内反弹到空气中的光线。

![标准半透明着色模型](https://dev.epicgames.com/community/api/documentation/image/676af9e6-bda5-47fa-b525-e97c0c159d37?resizing_type=fit&width=1920&height=1080)

![薄半透明着色模型](https://dev.epicgames.com/community/api/documentation/image/c4e64236-c04c-48be-a3b2-645a2d659c50?resizing_type=fit&width=1920&height=1080)

标准半透明着色模型

薄半透明着色模型

在材质细节面板中进行以下设置即可启用薄半透明材质输出：

-   **混合模式（Blend Mode）：**半透明
    
-   **着色模型（Shading Model）：**薄半透明
    
-   **光照模式（Lighting Mode）：**表面前向着色
    

## 向量噪点

[![](https://dev.epicgames.com/community/api/documentation/image/fec85742-1e63-45c8-8303-d877fb631f48?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/fec85742-1e63-45c8-8303-d877fb631f48?resizing_type=fit)

向量噪点材质（Vector Noise Material）表达式添加了更多的三维或四维向量噪点结果以在材质中使用。 由于这些函数会产生运行时间开销，建议在使用它们开发外观之后，使用虚幻引擎及其后续版本中引入的渲染目标功能，将所有或部分计算烘焙到纹理中。

这些材质表达式允许在最终资源的引擎中开发程序外观，从而提供了一种使用外部工具创建程序生成的纹理以应用于虚幻引擎中的资源的替代方法。 在向量噪点材质表达式（Vector Noise Material Expression）中，你将看到以下向量噪点类型。

图像

项目

说明

[![单元格噪点](https://dev.epicgames.com/community/api/documentation/image/9d1f0cc2-6f57-4320-bd71-09c318ca1220?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9d1f0cc2-6f57-4320-bd71-09c318ca1220?resizing_type=fit)

**单元格噪点（Cellnoise）**

为3D网格中的每个对象返回随机颜色（即 从应用于节点输入的数学向下取整运算）。 对于给定位置，结果始终保持一致，因此可以提供一种可靠的方法来将随机性添加到材质中。 该向量噪点（Vector Noise）函数的计算非常便宜，因此没有必要为了性能而将它烘焙到纹理中。

[![Perlin三维噪点](https://dev.epicgames.com/community/api/documentation/image/6ccc2afe-2001-4f5d-a27d-bfb69492ef9b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/6ccc2afe-2001-4f5d-a27d-bfb69492ef9b?resizing_type=fit)

**Perlin三维噪点（Perlin 3D Noise）**

为3D网格中的每个对象返回随机颜色（即 从应用于节点输入的数学向下取整运算）。 对于给定位置，结果始终保持一致，因此可以提供一种可靠的方法来将随机性添加到材质中。 该向量噪点（Vector Noise）函数的计算非常便宜，因此没有必要为了性能而将它烘焙到纹理中。

[![Perlin梯度](https://dev.epicgames.com/community/api/documentation/image/4cd05edc-0d2d-4233-906b-6d4e64e6b92a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4cd05edc-0d2d-4233-906b-6d4e64e6b92a?resizing_type=fit)

**Perlin梯度（Perlin Gradient）**

计算标量Perlin Simplex噪点的分析三维梯度。 输出为四个通道，其中前三个(RGB)为梯度噪点，第四个(A)为标量噪点。 该噪点类型对于表面上的凹凸或者流动贴图很有用。

[![Perlin旋度](https://dev.epicgames.com/community/api/documentation/image/b5468809-5f18-4af2-b9fe-3611f05e3a4b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b5468809-5f18-4af2-b9fe-3611f05e3a4b?resizing_type=fit)

**Perlin旋度（Perlin Curl）**

计算向量Perlin Simplex噪点（又名旋度噪点）的分析三维旋度。 输出为一个三维有向旋度向量，它对流体或粒子流动很有用。

[![Voronoi噪点](https://dev.epicgames.com/community/api/documentation/image/5bebc058-bd43-4e1f-ad14-ac9ccfe7c3f1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/5bebc058-bd43-4e1f-ad14-ac9ccfe7c3f1?resizing_type=fit)

**Voronoi**

计算与标量噪点材质节点相同的Voronoi噪点。 标量Voronoi噪点在三维空间中散射种子点，并返回与相隔最近的一个种子点的距离。 向量噪点变体会返回RGB中最近的种子点的位置，以及A中与它相隔的距离。 特别是与单元格噪点结合使用时，这可以让各Voronoi单元格执行一些随机行为。

下面是一个简单的石床材质，使用Voronoi向量噪点的距离分量调整表面凹凸，并在缝隙中混合苔藓。 种子位置结合向量噪点 > 单元格噪点的功能，可为每块岩石逐个改变颜色和隆起高度。

[![岩石混合示例](https://dev.epicgames.com/community/api/documentation/image/4506c7b2-bdf2-4870-a95d-41716bda91f6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4506c7b2-bdf2-4870-a95d-41716bda91f6?resizing_type=fit)

正如普通的Perlin噪点一样，基于导数的**Perlin旋度**和**Perlin梯度**运算也可以按倍频添加在一起。 对于更复杂表达式的导数，有必要计算表达式结果的梯度。 为了帮助实现这一点，可以将要计算的表达式放入一个材质函数中，并将其与以下辅助节点一起使用。

项目

说明

**Prepare3DDeriv**

利用四面体图形中的位置偏移计算三维导数。 在该函数产生的每个偏移位置计算同一个三维函数，然后将结果值输入Compute3DDeriv。

**Compute3DDeriv**

利用四面体图形中的位置偏移计算三维导数。 与Prepare3DDeriv一起使用。

**GradFrom3DDeriv**

根据Prepare3DDeriv/Compute3DDeriv的结果计算三维梯度向量。

**CurlFrom3DDeriv**

根据Prepare3DDeriv/Compute3DDeriv的结果计算三维向量场的旋度。

这些辅助材质函数使用四面体图形中间隔的基本表达式的四个求值来近似计算这些基于导数的运算。

你将在下面看到各种噪点函数的相关说明，这些函数可以在向量噪点材质表达式（Vector Noise Material Expression）中找到。

项目

说明

属性

 

**函数（Function）**

-   **Cellnoise**：为3D空间中的所有整型网格单元格提供随机颜色。 约10个指令。
    
-   **Perlin 3D Noise**：具有3D输出的计算Perlin噪点，每个通道输出范围是-1到1。 仅在使用红色通道时约有83个指令，三个通道全部使用时有125个指令
    
-   **Perlin Gradient**：计算Perlin噪点函数的梯度。 RGB输出包含梯度向量，A为标量噪点。 约106个指令。
    
-   **Perlin Curl**：计算3D旋度噪点。 输出为Perlin三维噪点的数学旋度。 约162个指令。
    
-   **Voronoi**：与*Noise*表达式中的Voronoi函数的算法和指令数相同，但RGB取各Voronoi单元格中最近的种子点的位置，A取与该种子点相隔的距离。
    

**质量（Quality）**

外观/性能设置。 值越小，速度越快，但可能外观越差；值越大，速度越慢，但可能外观越好。

**平铺（Tiling）**

对于支持它的噪点函数，它允许平铺噪点。 此函数使用成本较高，但在将噪点烘焙到无缝缠绕纹理时很有用。

**平铺大小（Tile Size）**

平铺时噪点应多久重复一次。 对于Perlin噪点变体，平铺大小（Tile Size）必须是三的倍数。

输入

**位置（Position）**

允许通过三维向量来调整纹理大小。

-   **单元格噪点（Cell Noise）**材质示例：
    
    [![单元格噪点](https://dev.epicgames.com/community/api/documentation/image/0f567495-10a2-45ba-8826-b28185c524d8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/0f567495-10a2-45ba-8826-b28185c524d8?resizing_type=fit)
    
    点击查看大图。
    
-   **Perlin梯度（Perlin Gradient）**材质示例：
    
    [![Perlin梯度](https://dev.epicgames.com/community/api/documentation/image/a3ce3a79-6c6b-4c78-98d7-de6b71c1d611?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a3ce3a79-6c6b-4c78-98d7-de6b71c1d611?resizing_type=fit)
    
    点击查看大图。
    
-   **Voronoi**材质示例：
    
    [![Voronoi噪点](https://dev.epicgames.com/community/api/documentation/image/3561ee77-1826-410a-9413-99a9fd43a115?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/3561ee77-1826-410a-9413-99a9fd43a115?resizing_type=fit)
    
    点击查看大图。
    

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [抗锯齿纹理遮罩](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF%E7%BA%B9%E7%90%86%E9%81%AE%E7%BD%A9)
-   [BlackBody](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#black-body)
-   [BumpOffset](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#bump-offset)
-   [ConstantBiasScale](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#constant-bias-scale)
-   [DDX](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#ddx)
-   [DDY](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#ddy)
-   [DepthFade](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#depth-fade)
-   [DepthOfFieldFunction](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#depth-of-field-function)
-   [去饱和度](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#%E5%8E%BB%E9%A5%B1%E5%92%8C%E5%BA%A6)
-   [距离（Distance）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#%E8%B7%9D%E7%A6%BB%EF%BC%88distance%EF%BC%89)
-   [DistanceFieldGradient](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#distance-field-gradient)
-   [DistanceToNearestSurface](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#distance-to-nearest-surface)
-   [FeatureLevelSwitch](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#featurelevelswitch)
-   [菲涅尔](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#fresnel)
-   [GIReplace](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#gireplace)
-   [LightmassReplace](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#lightmass-replace)
-   [线性插值](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#%E7%BA%BF%E6%80%A7%E6%8F%92%E5%80%BC)
-   [噪点](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#noise)
-   [Previous Frame Switch](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#previous-frame-switch)
-   [视口显示标记](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#viewport-show-flag)
-   [质量开关](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#quality-switch)
-   [绕轴旋转](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#%E7%BB%95%E8%BD%B4%E6%97%8B%E8%BD%AC)
-   [球体遮罩](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#sphere-mask)
-   [薄半透明](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#thin-translucent)
-   [向量噪点](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#vector-noise)