# 虚幻引擎材质表达式参考页面 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference
> 
> 生成时间: 2025-06-14T19:27:49.225Z

---

目录

![材质表达式参考](https://dev.epicgames.com/community/api/documentation/image/f08fead8-80d7-4636-9251-e48aff7fa2b5?resizing_type=fill&width=1920&height=335)

本文列出了[材质编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide)中所有可用 **材质表达式** 节点的参考页面。材质表达式是材质编辑器的基本构建单元，用于在虚幻引擎中构建完整功能的材质。

每个材质表达式都是一个自含式黑盒，输出一套一个或多个特定值；或是在一个或多个输入上执行单个运算，然后输出运算的结果。

## 参数

部分材质表达式是参数类表达式，意味你可以在[材质实例](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)中修改数值（这些实例的父材质包含这些参数）。

你应通过 **参数命名** 属性，为所有参数指定一个唯一名称。 当你在[材质实例编辑器](/documentation/404)中编辑实例时，这个名称会被用来识别每个特定参数。

如果在一个材质中，两个相同类型的参数有相同的名称，它们就被当作同一个参数。改变材质实例中的一个参数的值将改变材质中两个参数表达的值。你可以在细节面板中为你的参数设置一个默认值。这个默认值会在材质实例中使用，除非它被覆盖和修改。

## 材质表达式属性

所有材质表达式节点都包含提供不同类型信息的同一种属性。在下文中，将使用Texture Sample节点来重点解释这些 常用属性。

![Material Expression breakdown](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a496b3d5-17f5-45e7-8496-9ef68b54cad9/multiply-node.png)

编号

属性名称

描述

1

描述

所有材质表达式均拥有一个通用的 **Desc**（描述）属性，可通过细节面板访问。在此属性中输入的文本将显示在材质编辑器中工作区表达式的上方。其用途广泛，主要作用是简单介绍表达式的作用或函数。

2

标题栏

显示材质表达式的命名和/或相关信息。

3

输入

材质表达式所用值的链接。

4

输出

输出材质表达式运算结果。

5

预览

显示材质表达式所输出值的预览。实时更新启用时自动进行更新。可使用空格键手动更新。

### 材质表达式类型

这些参考页面根据材质编辑器参数面板中的类别来组织。

[

![大气表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bb178e8-cce8-42d4-b857-6cf7b08dfa18/atmosphere-expressions-topic.png)

大气表达式

影响雾和其他大气级效果的表达式。





](/documentation/zh-cn/unreal-engine/atmosphere-material-expressions-in-unreal-engine)[

![颜色材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a38063df-9c49-4a90-af37-a04b7b371621/color-expressions-topic.png)

颜色材质表达式

对颜色输入执行操作的表达式。





](/documentation/zh-cn/unreal-engine/color-material-expressions-in-unreal-engine)[

![常量材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ea849ff-b61b-4ada-bef7-3763a10e00f2/exp_constant.png)

常量材质表达式

一旦在编辑器中设置后，或在游戏开始时设置后，输出值通常保持不变的表达式。





](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine)[

![坐标材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9f9bdf4-7f1f-4731-bcdb-45c966fc3376/exp_coordinate.png)

坐标材质表达式

坐标表达式可用于对纹理坐标执行操作，或用于输出特定数值（用作纹理坐标或修改纹理坐标）。





](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine)[

![自定义材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec59aec4-5930-44d4-960d-7ef4364e9a19/exp_custom.png)

自定义材质表达式

允许使用自定义着色器代码的表达式。





](/documentation/zh-cn/unreal-engine/custom-material-expressions-in-unreal-engine)[

![深度材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45dd7fa4-9fde-4af8-93a1-0fb5776d8d48/exp_depth.png)

深度材质表达式

处理所渲染像素的深度的材质表达式。





](/documentation/zh-cn/unreal-engine/depth-material-expressions-in-unreal-engine)[

![字体材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14568f15-0f20-44d7-9501-21943c79972a/exp_font.png)

字体材质表达式

对字体资产进行取样和输出的表达式。





](/documentation/zh-cn/unreal-engine/font-material-expressions-in-unreal-engine)[

![材质函数表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/624b9e11-6f01-4d8d-998a-d0c39ae20258/exp_functions.png)

材质函数表达式

用来创建或执行材质函数的表达式。





](/documentation/zh-cn/unreal-engine/material-function-expressions-in-unreal-engine)[

![材质属性表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0118140-8931-48fa-ab10-a6495c5d28c7/material-attribute-expressions-topic.png)

材质属性表达式

这些表达式节点使您能够分隔或组合各种材质属性，这在创建分层材质时特别有用。





](/documentation/zh-cn/unreal-engine/material-attributes-expressions-in-unreal-engine)[

![粒子材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d1f10df-2759-498c-8b90-51bd5bb7a8b3/exp_particles.png)

粒子材质表达式

用于创建要应用于粒子系统中的发射器的材质表达式。





](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine)[

![纹理材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/594faf1d-9d21-4eb9-913c-9439b55a620b/exp_texture.png)

纹理材质表达式

对纹理进行取样和输出的表达式。





](/documentation/zh-cn/unreal-engine/texture-material-expressions-in-unreal-engine)[

![向量类材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/041cd57f-2711-43e8-908e-a1be51efe5d8/exp_ref_topic.png)

向量类材质表达式

用于输出位置、法线等向量值的材质表达式。





](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine)[

![向量操作类材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b45c1e1-1440-4cf7-ae16-8f5464250dc7/exp_vectorops.png)

向量操作类材质表达式

对向量输入值执行操作的材质表达式。





](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine)[

![地形材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5406239-5c97-4b41-9941-c8d451de512d/exp_landscape.png)

地形材质表达式

可创建应用于地形地貌的材质的表达式。





](/documentation/zh-cn/unreal-engine/landscape-material-expressions-in-unreal-engine)[

![材质参数表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92fdf9ff-6d49-4c09-8556-77fc78c3ff7c/exp_parameter.png)

材质参数表达式

这类表达式向材质实例公开属性，以便在子实例中重载或在运行时修改。





](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine)[

![工具类材质表达式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ba5c9ed-2600-4b81-97fb-54f49f7c075b/utility_topic.png)

工具类材质表达式

对一个或多个输入执行各种运算的表达式。





](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine)

## 表达式索引

下面列出了大量材质表达式，但并不完整。此处显示的所有链接也可以通过下方的表达类页面来访问。 此外，也可以使用 **Ctrl+F** 查找所需的表达式节点，并跟随链接到其描述。

[**大气**](/documentation/zh-cn/unreal-engine/atmosphere-material-expressions-in-unreal-engine)

-   [AtmosphericFogColor（大气雾颜色）](/documentation/zh-cn/unreal-engine/atmosphere-material-expressions-in-unreal-engine#atmosphericfogcolor)

[**Color（颜色）**](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine)

-   [Desaturation（去饱和度）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#desaturation)

[**常量**](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine)

-   [Constant](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#constant)
-   [Constant2Vector](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#constant2vector)
-   [Constant3Vector](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#constant3vector)
-   [Constant4Vector](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#constant4vector)
-   [DistanceCullFade](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#distancecullfade)
-   [PerInstanceFadeAmount](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#perinstancefadeamount)
-   [PerInstanceRandom](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#perinstancerandom)
-   [Time](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#time)
-   [TwoSidedSign](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#twosidedsign)
-   [VertexColor](/documentation/zh-cn/unreal-engine/constant-material-expressions-in-unreal-engine#vertexcolor)

[**坐标**](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine)

-   [ActorPositionWS](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#actorpositionws)
-   [CameraPositionWS](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#camerapositionws)
-   [LightmapUVs](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#lightmapuvs)
-   [ObjectOrientation](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#objectorientation)
-   [ObjectPositionWS](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#objectpositionws)
-   [ObjectRadius](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#objectradius)
-   [Panner](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#panner)
-   [ParticlePositionWS](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#particlepositionws)
-   [PixelNormalWS](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#pixelnormalws)
-   [Rotator](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#rotator)
-   [SceneTexelSize](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#scenetexelsize)
-   [ScreenPosition](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#screenposition)
-   [TextureCoordinate](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#texturecoordinate)
-   [VertexNormalWS](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#vertexnormalws)
-   [ViewSize](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#viewsize)
-   [WorldPosition](/documentation/zh-cn/unreal-engine/coordinates-material-expressions-in-unreal-engine#worldposition)

[**自定义**](/documentation/zh-cn/unreal-engine/custom-material-expressions-in-unreal-engine)

-   [自定义](/documentation/zh-cn/unreal-engine/custom-material-expressions-in-unreal-engine)

[**深度**](/documentation/zh-cn/unreal-engine/depth-material-expressions-in-unreal-engine)

-   [DepthFade（深度消退）](/documentation/zh-cn/unreal-engine/depth-material-expressions-in-unreal-engine#depthfade)
-   [PixelDepth（像素深度）](/documentation/zh-cn/unreal-engine/depth-material-expressions-in-unreal-engine#pixeldepth)
-   [SceneDepth（场景深度）](/documentation/zh-cn/unreal-engine/depth-material-expressions-in-unreal-engine#scenedepth)

[**字体**](/documentation/zh-cn/unreal-engine/font-material-expressions-in-unreal-engine)

-   [FontSample（字体取样）](/documentation/zh-cn/unreal-engine/font-material-expressions-in-unreal-engine#fontsample)
-   [FontSampleParameter（字体取样参数）](/documentation/zh-cn/unreal-engine/font-material-expressions-in-unreal-engine#fontsampleparameter)

[**函数**](/documentation/zh-cn/unreal-engine/material-function-expressions-in-unreal-engine)

-   [FunctionInput](/documentation/zh-cn/unreal-engine/material-function-expressions-in-unreal-engine#functioninput)
-   [FunctionOutput](/documentation/zh-cn/unreal-engine/material-function-expressions-in-unreal-engine#functionoutput)
-   [MaterialFunctionCall](/documentation/zh-cn/unreal-engine/material-function-expressions-in-unreal-engine#materialfunctioncall)
-   [StaticBool](/documentation/zh-cn/unreal-engine/material-function-expressions-in-unreal-engine#staticbool)
-   [StaticSwitch](/documentation/zh-cn/unreal-engine/material-function-expressions-in-unreal-engine#staticswitch)
-   [TextureObject](/documentation/zh-cn/unreal-engine/material-function-expressions-in-unreal-engine#textureobject)

[**MaterialAttributes（材质属性）**](/documentation/zh-cn/unreal-engine/material-attributes-expressions-in-unreal-engine)

-   [BreakMaterialAttributes（拆分材质属性）](/documentation/zh-cn/unreal-engine/material-attributes-expressions-in-unreal-engine#breakmaterialattributes)
-   [MakeMaterialAttributes（创建材质属性）](/documentation/zh-cn/unreal-engine/material-attributes-expressions-in-unreal-engine#makematerialattributes)

[**数学**](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine)

-   [Abs（绝对值）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#abs)
-   [Add（加）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#add)
-   [AppendVector（追加向量）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#appendvector)
-   [Ceil（加一取整）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#ceil)
-   [Clamp（限制）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#clamp)
-   [ComponentMask（分量蒙版）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#componentmask)
-   [Cosine（余弦）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#cosine)
-   [CrossProduct（向量积）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#crossproduct)
-   [Divide（除）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#divide)
-   [DotProduct（标量积）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#dotproduct)
-   [Floor（减一取整）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#floor)
-   [Fmod（浮点余数）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#fmod)
-   [Frac（小数）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#frac)
-   [If](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#if)
-   [LinearInterpolate（线性插值）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#linearinterpolate)
-   [Multiply（乘）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#multiply)
-   [Normalize（规范化）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#normalize)
-   [OneMinus（一减）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#oneminus)
-   [Power（幂）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#power)
-   [Sine（正弦）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#sine)
-   [SquareRoot（平方根）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#squareroot)
-   [Subtract（减）](/documentation/zh-cn/unreal-engine/math-material-expressions-in-unreal-engine#subtract)

[**参数**](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine)

-   [CollectionParameters（集合参数）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#collectionparameters)
-   [DynamicParameter（动态参数）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#dynamicparameter)
-   [FontSampleParameter（字体取样参数）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#fontsampleparameter)
-   [ScalarParameter（标量参数）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#scalarparameter)
-   [StaticBoolParameter（静态布尔参数）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#staticboolparameter)
-   [StaticSwitchParameter（静态开关参数）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#staticswitchparameter)
-   [StaticComponentMaskParameter（静态分量蒙版参数）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#staticcomponentmaskparameter)
-   [VectorParameter（向量参数）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#vectorparameter)
-   [TextureObjectParameter（纹理对象参数）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#textureobjectparameter)
-   [TextureSampleParameter2D（纹理取样参数2D）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#texturesampleparameter2d)
-   [TextureSampleParameterSubUV（纹理取样参数子UV）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#texturesampleparametersubuv)
-   [TextureSampleParameterCube（纹理取样参数立方体）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#texturesampleparametercube)
-   [TextureSampleParameterMovie（纹理取样参数影片）](/documentation/zh-cn/unreal-engine/material-parameter-expressions-in-unreal-engine#texturesampleparametermovie)

[**粒子**](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine)

-   [DynamicParameter（动态参数）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#dynamicparameter)
-   [ParticleColor（粒子颜色）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#particlecolor)
-   [ParticleDirection（粒子方向）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#particledirection)
-   [ParticleMacroUV（粒子宏UV）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#particlemacrouv)
-   [ParticleMotionBlurFade（粒子运动模糊消退）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#particlemotionblurfade)
-   [ParticlePositionWS（粒子全局空间位置）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#particlepositionws)
-   [ParticleRadius（粒子半径）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#particleradius)
-   [ParticleRelativeTime（粒子相对时间）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#particlerelativetime)
-   [ParticleSize（粒子大小）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#particlesize)
-   [ParticleSpeed（粒子速度）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#particlespeed)
-   [SphericalParticleOpacity（球形粒子不透明度）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#sphericalparticleopacity)
-   [ParticleSubUV（粒子子 UV）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#particlesubuv)
-   [TextureSampleParameterSubUV（纹理取样参数子UV）](/documentation/zh-cn/unreal-engine/particle-material-expressions-in-unreal-engine#texturesampleparametersubuv)

[**地形**](/documentation/zh-cn/unreal-engine/landscape-material-expressions-in-unreal-engine)

-   [LandscapeLayerBlend（地形层混合）](/documentation/zh-cn/unreal-engine/landscape-material-expressions-in-unreal-engine#landscapelayerblend)
-   [LandscapeLayerCoords（地形层坐标）](/documentation/zh-cn/unreal-engine/landscape-material-expressions-in-unreal-engine#landscapelayercoords)
-   [LandscapeLayerSwitch（地形层开关）](/documentation/zh-cn/unreal-engine/landscape-material-expressions-in-unreal-engine#landscapelayerswitch)

[**纹理**](/documentation/zh-cn/unreal-engine/texture-material-expressions-in-unreal-engine)

-   [FontSample（字体取样）](/documentation/zh-cn/unreal-engine/texture-material-expressions-in-unreal-engine#fontsample)
-   [FontSampleParameter（字体取样参数）](/documentation/zh-cn/unreal-engine/texture-material-expressions-in-unreal-engine#fontsampleparameter)
-   [SceneColor（场景颜色）](/documentation/zh-cn/unreal-engine/texture-material-expressions-in-unreal-engine#scenecolor)
-   [TextureObject（纹理对象）](/documentation/zh-cn/unreal-engine/texture-material-expressions-in-unreal-engine#textureobject)
-   [TextureSample（纹理取样）](/documentation/zh-cn/unreal-engine/texture-material-expressions-in-unreal-engine#texturesample)

[**实用程序**](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine)

-   [BlackBody（黑体）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#blackbody)
-   [BumpOffset（凹凸贴图偏移）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#bumpoffset)
-   [ConstantBiasScale（常量偏差比例）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#constantbiasscale)
-   [DDX](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#ddx)
-   [DDY](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#ddy)
-   [DepthFade（深度消退）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#depthfade)
-   [DepthOfFieldFunction（视野深度函数）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#depthoffieldfunction)
-   [Desaturation（去饱和度）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#desaturation)
-   [Distance（距离）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#distance)
-   [Fresnel（菲涅尔）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#fresnel)
-   [LightmassReplace（Lightmass替换）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#lightmassreplace)
-   [LinearInterpolate（线性插值）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#linearinterpolate)
-   [Noise（噪点）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#noise)
-   [QualitySwitch（质量开关）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#qualityswitch)
-   [RotateAboutAxis（绕轴旋转）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#rotateaboutaxis)
-   [SphereMask（球体蒙版）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#spheremask) \*[薄半透明（Thin Translucent）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#thintranslucent)
-   [AntialiasedTextureMask（抗锯齿纹理蒙版）](/documentation/zh-cn/unreal-engine/utility-material-expressions-in-unreal-engine#antialiasedtexturemask)

[**VectorOps**](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine)

-   [AppendVector](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine#appendvector)
-   [ComponentMask](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine#componentmask)
-   [CrossProduct](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine#crossproduct)
-   [DeriveNormalZ](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine#derivenormalz)
-   [DotProduct](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine#dotproduct)
-   [Normalize](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine#normalize)
-   [Transform](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine#transform)
-   [TransformPosition](/documentation/zh-cn/unreal-engine/vector-operation-material-expressions-in-unreal-engine#transformposition)

[**向量**](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine)

-   [ActorPositionWS（Actor全局空间位置）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#actorpositionws)
-   [CameraPositionWS（摄像机全局空间位置）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#camerapositionws)
-   [CameraVectorWS（摄像机全局空间向量）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#cameravectorws)
-   [Constant2Vector（常量2向量）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#constant2vector)
-   [Constant3Vector（常量3向量）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#constant3vector)
-   [Constant4Vector（常量4向量）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#constant4vector)
-   [LightVector（光照向量）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#lightvector)
-   [ObjectBounds（对象绑定）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#objectbounds)
-   [ObjectOrientation（对象朝向）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#objectorientation)
-   [ObjectPositionWS（对象全局空间位置）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#objectpositionws)
-   [ParticlePositionWS（粒子全局空间位置）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#particlepositionws)
-   [PixelNormalWS（像素全局空间法线）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#pixelnormalws)
-   [ReflectionVectorWS（反射全局空间向量）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#reflectionvectorws)
-   [VertexNormalWS（顶点全局空间法线）](/documentation/zh-cn/unreal-engine/vector-material-expressions-in-unreal-engine#vertexnormalws)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)
-   [material expressions](https://dev.epicgames.com/community/search?query=material%20expressions)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [参数](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference#%E5%8F%82%E6%95%B0)
-   [材质表达式属性](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference#%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%B1%9E%E6%80%A7)
-   [材质表达式类型](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference#%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F%E7%B1%BB%E5%9E%8B)
-   [表达式索引](/documentation/zh-cn/unreal-engine/unreal-engine-material-expressions-reference#%E8%A1%A8%E8%BE%BE%E5%BC%8F%E7%B4%A2%E5%BC%95)