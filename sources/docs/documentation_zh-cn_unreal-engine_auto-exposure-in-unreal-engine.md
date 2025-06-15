# 虚幻引擎中的自动曝光 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:28.104Z

---

目录

![自动曝光](https://dev.epicgames.com/community/api/documentation/image/c4527344-750e-4005-bcfc-522a279a747a?resizing_type=fill&width=1920&height=335)

**后期处理体积（Post Process Volume）** 提供 **自动曝光（Automatic Exposure）** （通常称为眼部适应）控制选项，可自动调整当前场景视图的明暗。此效果可再现人眼适应不同光照条件的体验，例如从昏暗的室内走到明亮的室外，或从室外走到室内。

## 曝光测光模式

在场景中设置自动曝光时，引擎提供几种测光模式选项。此类不同测光模式提供可精确模拟实际摄像机的设置，可在后期处理过程中控制场景中的曝光。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac910109-afd7-4765-8a94-92e048dda96c/exposuremeteringmodes.png)

-   **自动曝光直方图（Auto Exposure Histogram）** 模式通过由64bin直方图构成的高级设置更好地控制自动曝光。这是虚幻引擎中的默认曝光测光模式。
-   **基本自动曝光（Auto Exposure Basic）** 模式提供的设置较少，但这是通过下采样曝光计算单个值的更快速方法。
-   **手动（Manual）** 模式支持使用后期处理和摄像机设置中的 **摄像机（Camera）** 设置控制曝光，而非仅使用 **曝光（Exposure）** 类别中的设置。

### 直方图和基本算法

**基本自动曝光（Auto Exposure Basic）** 和 **自动曝光直方图（Auto Exposure Histogram）** 测光模式均可计算场景的整体亮度，并使场景变亮或变暗到期望值，但两者计算场景亮度的方式有所不同。

-   **基本自动曝光（Auto Exposure Basic）** 算法使用场景的对数亮度平均值确定目标曝光值。
-   **自动曝光直方图（Auto Exposure Histogram）** 模式首先计算对数亮度场景的直方图。然后，分析直方图，确定平均亮度值。

基本模式和直方图模式使用不同算法计算场景的平均亮度。但确定平均亮度值后，两种算法都将该亮度视为中灰。在摄影中，此中灰点有时称为"18%灰"或"18%中灰"，指灰卡反射的光量。

### 手动算法

**手动（Manual）** 测光模式允许用户选择不受场景亮度影响的单个固定曝光值。若后期处理设置中禁用 **应用物理摄像机曝光（Apply Physical Camera Exposure）**，则曝光值为线性亮度：

```cpp
	曝光 = 1/（2^（EV100 + 曝光补偿））

```

若应用 **应用物理摄像机曝光（Apply Physical Camera Exposure）**，则EV100按如下公式计算。否则，值为0。

```cpp
	EV100 = log2（孔径^2/快门速度 * 100/ISO）

```

下述公式中的曝光定义在应用色调映射器和曝光补偿之前，场景表面亮度（L，以cd/m2为单位）与像素亮度（B）之间的关系。

```cpp
	B = 曝光*L

```

可通过视口显示标记（**显示（Show）> 后期处理（Post Processing）**）禁用色调映射器，验证此公式的结果，并使用像素检视器检查场景亮度。另请注意，[编辑器EV100覆盖设置](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E8%A7%86%E5%8F%A3%E8%A6%86%E7%9B%96)直接设置此公式中使用的EV100曝光。

除从 当前测光模式计算的曝光外，**曝光补偿** （也简称为 **ExpComp**）还额外定义2^ExpComp比例，使用EV100编辑器覆盖时除外。

## 局部曝光

**局部曝光（Local Exposure）** 是一种自动对曝光应用局部调整的技术，它位于美术师控制的参数内，可以在现有全局曝光系统的基础上保留高光和阴影细节。这对于拥有使用动态光照的、颇具挑战性的高动态范围场景的项目尤其有用。在此类项目中，单独应用全局光照调整不足以避免过分渲染高光，以及全黑阴影的问题。

使用动态天时系统的项目可能会遇到最终图像中存在曝光不足或过度曝光区域的问题，例如可通过门窗看到非常明亮的室外景象的室内场景。这可能会对游戏玩法造成问题。例如，下面的示例场景就显示了曝光不足和过度曝光的区域。

![只用曝光](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c5fbd9a-ffbb-4bd2-9200-e3b6f44484a1/local-exposure-disabled.png)

![使用局部曝光](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a474a5e-fd70-4bc6-bf7a-5930e01e93c1/local-exposure-enabled.png)

只用曝光

使用局部曝光

当为每个场景精心设计光照不可行时，局部曝光有助于实现更一致的最终图像。在使用[Lumen全局光照](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)应始终将其开启。

[局部曝光设置](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E5%B1%80%E9%83%A8%E6%9B%9D%E5%85%89%E8%AE%BE%E7%BD%AE)可以在后期处理体积设置中的 **镜头（Lens）> 局部曝光（Local Exposure）** 类别下的找到。

![后期处理体积局部光照设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a4ab756-374d-4d0f-ab94-062f3560a98a/local-exposure-settings.png)

使用 **局部曝光（Local Exposure）** 可视化模式可以查看它是如何被应用于场景的。你可以在关卡视口的 **显示（Show） > 可视化（Visualization）** 菜单中开启该可视化模式。

![局部曝光可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae164c14-f834-4a16-9640-7c2cb8631417/local-exposure-visualization.png)

## 重要概念与功能

在项目关卡中设置和使用自动曝光时，应考虑以下重要概念、功能和最佳实践。

### 曝光补偿曲线

借助 **曝光补偿曲线（Exposure Compensation Curve）** 资产槽，美术师可更好地控制场景中的曝光补偿。此曲线资产可直接控制X和Y轴。使用高动态范围可视化模式 **HDR（眼部适应）** 时，可从屏幕上显示的信息中提取此类值。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1586e643-d767-4762-90c9-ac8d7d1f8421/ppv_expcompassetcurve.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cecea298-a7e5-4379-8b1b-049128977480/expcompcurveasset.png)

后期处理设置

曲线资产图表

使用内容浏览器选择 **新增（Add New）** 按钮并导航到 **其他（Miscellaneous）** 类别，选择 **曲线（Curve）** 资产类型，添加自己的曲线。在选择曲线类（Pick Curve Class） 窗口中，选择 **曲线浮点（Curve Float）** 类型。

在启用"HDR（眼部适应）"可视化模式的关卡视口中，X轴在直方图上由 **平均场景EV100** 值（1）和 **实际** （紫色）线（1）表示。Y轴由 **曝光补偿（曲线）** 值（2）表示。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d220b8a-2dac-4330-b2f7-00a13354eb29/expcompcurve.png)

上面的示例场景显示 **平均场景EV100** 为0.548，将转换为曲线资产X轴的插入值（如下所示）。还将返回 **曝光补偿（曲线）（Exposure Compensation（Curve））** 值0.864。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4d61496-f7bd-42a7-90f6-7a3818ccab32/expcompcurveasset2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4d61496-f7bd-42a7-90f6-7a3818ccab32/expcompcurveasset2.png)

点击查看大图。

曝光补偿值分为各自的 *设置* 值和 *曲线* 值，可更精确地控制调整方式。同时解释了通过分离此类值以特定方式进行曝光补偿的原因。

相关值为：

-   **平均EV100** 是计算的目标EV100值，在直方图中用目标（蓝色）线表示。
-   **曝光补偿（设置）** 是后期处理设置中设置的曝光补偿值。
-   **曝光补偿（曲线）** 是后期处理中指定给曝光补偿曲线槽的曲线资产中生成的Y轴值。
-   **曝光补偿（全部）** 是生成最终曝光补偿值的 *设置* 和 *曲线* 曝光补偿值之和。

### 曝光测光遮罩

**曝光测光遮罩（Exposure Metering Mask）** 为美术师提供可选纹理槽来控制自动曝光的全屏影响，其中每个像素由指定纹理遮罩进行重要性加权。注重屏幕中心而非边缘的像素有助于稳定自动曝光（参见下例）。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68bbd111-c0a3-4095-961b-e9c991562c22/ppv_expcompmeteringmask.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/276413f6-e032-4c3c-ab21-44a225432384/expmeteringmaskexample.png)

后期处理设置

曝光测光遮罩示例纹理

通过朝屏幕中心对遮罩中的像素加权，沿屏幕边缘出现的明亮对象不太可能引起预期曝光突然发生变化。

![没有曝光测光遮罩](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a69ffb4b-8d56-44ef-9c1f-cea9ec57ddb9/expmetmask_disabled.png)

![带有曝光测光遮罩](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b147630-28d1-4aae-a71a-070c01cc0360/expmetmask_enabled.png)

没有曝光测光遮罩

带有曝光测光遮罩

虚幻引擎4.25发布后，控制台命令 **r.EyeAdaptation.Focus** 已删除。此命令在整个屏幕均匀应用加权值，提供现在通过创建自己的测光遮罩处理的类似功能。另外，此命令仅支持基本自动曝光测光模式，而曝光测光遮罩同时支持直方图和基本测光模式。

### 曝光更改速度和移动

曝光补偿适应当前场景的速率以对数步长计算，曲线以恒速上下感知移动。曝光补偿沿曲线朝其目标值以每秒F值移动。

为处理这种感知移动，自适应算法以线性和指数移动遍历曲线。使用两种遍历方法可改善仅使用指数移动的两种副作用：

-   可减少快速适应亮度小幅波动的抖动行为。
-   可实现从黑暗区域到明亮区域的缓慢过渡。

在下例中，远离目标曝光值时，沿曲线的遍历以线性方式开始（2）。一旦接近，遍历过渡为指数移动（1），保持一阶导数的连续性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ee818aa-8856-46f5-9a8d-b1a2be8cbdba/curvemovement.png)

接近目标曝光值时，存在设定的过渡距离，这时曲线从线性移动转换为指数移动。默认情况下，此过渡出现在距目标值的1.5 F值处。可使用命令 **r.EyeAdaptation.ExponentialTransitionDistance** 设置过渡距离（以每秒F值为单位）。

#### 使用加速和减速参数

后期处理中的 **加速（Speed Up）** 和 **减速（Speed Down）** 属性可控制曝光从实际值（紫色）调整为目标值（蓝色）的速度。此类设置可设置时间范围（以每秒F值为单位），以便在不同亮度范围（例如从黑暗环境移动到明亮环境）之间移动时让眼睛适应。

设置此类值时，请考虑眼睛需要多长时间才能适应光照变化。设置此类属性时，请采纳以下建议：

-   模仿眼部适应行为时，**加速（Speed Up）** 参数应采用更高的值。这样可实现从黑暗区域到明亮区域的快速过渡。此外，还通过 *收缩* 虹膜模仿自然的眼部行为，从而减少进入瞳孔的光。较长的过渡时间会保持较高曝光，图像会过亮。
-   模仿眼部适应行为时，**减速（Speed Down）** 参数应采用更低的值。这样可实现从明亮区域到更暗区域的缓慢过渡。此外，还通过 *扩张* 虹膜模仿自然的眼部行为，从而增加进入瞳孔的光。较长的过渡时间会保持较低曝光，图像会过暗。

### 扩展EV100的默认亮度范围

默认情况下，引擎利用像素亮度（cd/m2）来设置后期处理体积中的 **最大亮度（Max Brightness）** 和 **最小亮度（Min Brightness）** 设置。尝试设置[物理精确光照范围](/documentation/zh-cn/unreal-engine/using-physical-lighting-units-in-unreal-engine)时，可扩大自动曝光的默认亮度范围，以EV100（也称为ISO 100）表示亮度。这意味着可对场景中的光源使用合适的勒克斯值，并通过自动曝光遵循该值，而不会导致图像过度曝光。

可在 **渲染（Rendering）> 默认设置（Default Settings）** 部分的项目设置（Project Settings）中启用该选项，方法是选中 **扩大自动曝光设置中的默认亮度范围** 旁的复选框。

启用此设置会更改后期处理体积的 **最小亮度（Min Brightness）** 和 **最大亮度（Max Brightness）** 默认值，以及 **直方图对数最小值（Histogram Log Min）** 和 **直方图对数最大值（Histogram Log Max）** 名称，以反映EV100。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e79b0475-1b1a-4f7c-bbcb-f78c91a64a28/ppvsettings_default.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c89f635-ceef-47dd-9e8d-e56ab0be2c79/ppvsettings_extendedluminance.png)

引擎默认设置

启用扩大亮度范围

### 预曝光

着色器中应用的曝光量称为 **预曝光**。写入场景颜色前，在着色器中应用前一帧的场景曝光。这使引擎能重新映射摄像机曝光的场景颜色范围，从而在与最终颜色之一（曝光后）相似的范围内渲染场景。限制支持HDR照明值所需的渲染目标范围，可降低使用非常明亮的光源时低精度渲染目标格式出现算术溢出的风险。启用后，还具有提高基本自动曝光测光模式质量的效果。

可通过项目设置（Project Settings）中 **渲染（Rendering）> 默认设置（Default Settings）** 部分的 **在写入场景颜色前应用预曝光（Apply Pre-exposure before writing to the scene color）** 启用预曝光。

## 移动设备用法

在支持功能级别ES3.1或更高版本的移动设备上，自动曝光功能与台式机和控制台平台相同。对于移动设备，内存开销可忽略，性能开销低，具体视场景而定。

对于任何项目设置中启用 **移动HDR（Mobile HDR）** 的虚幻引擎项目，默认情况下均启用自动曝光（Auto Exposure）。若没有，可进行如下设置：

-   在项目设置中的 **引擎（Engine）- 渲染（Rendering）-** 部分下启用 **移动HDR（Mobile HDR）**。
-   将控制台变量 **r.Mobile.EyeAdaptation** 设为 **1**。此选项应默认启用。
-   控制台变量 **r.EyeAdaptationQuality** 应设为大于0的值。

在 `BaseScalability.ini` 配置文件的 **\[PostProcessQuality\]** 部分 下配置此类控制台变量。对特定设备使用定义的配置文件时，在 `BaseDeviceProfiles.ini` 中设置控制台变量 **sg.PostProcessQuality**。请注意，除 **Android\_Low** 外，所有设备均默认启用。

## 游戏设置

默认的自动曝光后期处理和后期处体积控制 *游戏中* 的自动曝光设置。自动曝光默认为开启，可用于关卡视口和资产编辑器视口。

可从 **镜头（Lens）** 类别中的 **曝光（Exposure）** 下拉菜单下访问自动曝光（Auto Exposure）设置。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34b3a860-b5ab-4126-8bde-5ff12ae84eb9/gamesettings_detailspanel.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6608aca5-b6b4-49ee-b8df-3393d088712e/gamesettings_previewscenesettings.png)

后期处理体积设置

资产编辑器预览场景设置

关卡视口 **细节（Details）** 面板中提供后期处理设置，资产编辑器 **预览场景设置（Preview Scene Settings）** 面板包含调整场景自动曝光所需的相关设置。可通过所选 **测量模式** 访问后期处理中的不同属性集。每种模式均设置用于自动曝光的亮度计算方法。

从以下测光模式中选择：

-   **自动曝光直方图（Auto Exposure Histogram）** 构造64bin直方图，可通过高级设置更好地控制自动曝光。
-   **基本自动曝光（Auto Exposure Basic）** 是一种通过下采样计算单个值的更快速方法。
-   **手动（Manual）** 可使用内部的 **摄像机** 后期处理设置而不是曝光（Exposure）属性控制曝光。

### 自动曝光直方图设置

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ea43a78-c7dd-41a8-9ff7-82edbeba1b38/autoexp_histogram.png)

属性

说明

**曝光补偿（Exposure Compensation）**

曝光的对数调整，仅在指定色调映射器的情况下使用。设为0时，没有调整；设为-1时，为两倍暗，设为-2时，为四倍暗，设为1时，为两倍亮，设为2时，为四倍亮。

**应用物理摄像机曝光（Apply Physical Camera Exposure）**

该选项仅影响 **手动（Manual）** 测光模式。启用后，场景亮度会受到 **摄像机（Camera）** 设置（ISO、快门速度、孔径）的影响。禁用后，摄像机会默认将 ISO 设置为 100，将孔径设置为 1.0，将快门速度设置为 1.0。启用该选项后，大部分场景都会明显变暗。

**曝光补偿曲线（Exposure Compensation Curve）**

该槽取用曲线资产，用于更好地控制场景中的曝光补偿。曲线图表中的X和Y轴值转换为 **平均场景EV100** 和 **曝光补偿（曲线）** 值。

**曝光测光遮罩（Exposure Metering Mask）**

使用自己的纹理遮罩测量曝光。遮罩上的亮点将对自动曝光测光产生很大影响，而暗点的影响较小。

**最小亮度（Min Brightness）**

自动曝光的最小亮度，用于限定眼部可适应的最低亮度。值必须小于0，并且必须大于或等于 **最大亮度（Max Brightness）**。合适的值应为接近0的正值，并应在黑暗的光照条件下调整。例如，若该值过小，则图像会显得太亮。若值过大，则图像会显得太暗。实际值取决于所使用内容的HDR范围。若最小亮度（Min Brightness）等于最大亮度（Max Brightness），自动曝光将禁用。

**最大亮度（Max Brightness）**

自动曝光的最大亮度，用于限定眼部可适应的最高亮度。值必须大于0，并且必须大于或等于 **最小亮度（Min Brightness）**。合适的值应为正值（2是不错的起始值），并将在明亮的光照条件调整。例如，若该值过小，则图像会显得太亮。若值过大，则图像会显得太暗。实际值取决于所使用内容的HDR范围。若最大亮度（Max Brightness）等于最小亮度（Min Brightness），自动曝光将禁用。

**最小EV100（Min EV100）**

启用项目设置 **扩大自动曝光设置中的默认亮度范围（Extend default luminance range in Auto Exposure settings）** 时，用于代替 **最小亮度（Min Brightness）**。

最小自动曝光适应，实现方式是选择曝光值，平均亮度将根据此值生成与常量校准值相等的像素亮度。此值以像素亮度（cd/m2）表示。若最小EV100（Min EV100）等于最大EV100（Max EV100），自动曝光将禁用。

**最大EV100（Max EV100）**

启用项目设置 **扩大自动曝光设置中的默认亮度范围（Extend default luminance range in Auto Exposure settings）** 时，用于代替 **最小亮度（Min Brightness）**。

最大自动曝光适应，实现方式是选择曝光值，平均亮度将根据此值生成与常量校准值相等的像素亮度。此值以像素亮度（cd/m2）表示。若最大EV100（Max EV100）等于最小EV100（Min EV100），自动曝光将禁用。

**加速（Speed Up）**

从黑暗环境到明亮环境的适应速度。

**减速（Speed Down）**

从明亮环境到黑暗环境的适应速度。

高级（Advanced）

 

**低百分比（Low Percent）**

自动曝光适应从场景颜色亮度直方图中提取的值。该值定义为比此亮度低X%。较高的值给予屏幕上的亮点更高优先级，但可能导致结果的稳定性降低。较低的值给予中值和暗值更高优先级，但可能会导致亮点耗尽。值应大于0且小于100。合适的起始范围为70至80。

**高百分比（High Percent）**

自动曝光适应从场景颜色亮度直方图中提取的值。该值定义为比此亮度低X%。较高的值给予屏幕上的亮点更高优先级，但可能导致结果的稳定性降低。较低的值给予中值和暗值更高优先级，但可能会导致亮点耗尽。值应大于0且小于100。合适的起始范围为80至95。

**直方图对数最小值（Histogram Log Min）**

定义使用 **HDR（眼部适应）** 可视化模式时所生成直方图的亮度范围下限。

**直方图对数最大值（Histogram Log Max）**

定义使用 **HDR（眼部适应）** 可视化模式时所生成直方图的亮度范围上限。

**直方图最小EV100（Histogram Min EV100）**

启用项目设置 **扩大自动曝光设置中的默认亮度范围（Extend default luminance range in Auto Exposure settings）** 时，用于代替 **最小亮度（Min Brightness）**。

定义使用 **HDR（眼部适应）** 可视化模式时所生成直方图的亮度范围下限。

**直方图最小EV100（Histogram Min EV100）**

启用项目设置 **扩大自动曝光设置中的默认亮度范围（Extend default luminance range in Auto Exposure settings）** 时，用于代替 **最小亮度（Min Brightness）**。

定义使用 **HDR（眼部适应）** 可视化模式时所生成直方图的亮度范围上限。

### 基本自动曝光设置

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0bf4893-f97f-4cce-b7e1-2b6a3584d868/autoexp_basic.png)

属性

说明

**应用物理摄像机曝光（Apply Physical Camera Exposure）**

该选项仅影响 **手动（Manual）** 测光模式。启用后，场景亮度会受到 **摄像机（Camera）** 设置（ISO、快门速度、孔径）的影响。禁用后，摄像机会默认将 ISO 设置为 100，将孔径设置为 1.0，将快门速度设置为 1.0。启用该选项后，大部分场景都会明显变暗。

**曝光补偿（Exposure Compensation）**

曝光对数调整，仅在指定色调映射器的情况下使用。设为0时，没有调整；设为-1时，为两倍暗，设为-2时，为四倍暗，设为1时，为两倍亮，设为2时，为四倍亮。

**曝光补偿曲线（Exposure Compensation Curve）**

该槽取用曲线资产，用于更好地控制场景中的曝光补偿。曲线图表中的X和Y轴值转换为 **平均场景EV100** 和 **曝光补偿（曲线）** 值。

**曝光测光遮罩（Exposure Metering Mask）**

使用自己的纹理遮罩测量曝光。遮罩上的亮点将对自动曝光测光产生很大影响，而暗点的影响较小。

**最小亮度（Min Brightness）**

自动曝光的最小亮度，用于限定眼部可适应的最低亮度。值必须小于0，并且必须大于或等于 **最大亮度（Max Brightness）**。合适的值应为接近0的正值，并应在黑暗的光照条件下调整。例如，若该值过小，则图像会显得太亮。若值过大，则图像会显得太暗。实际值取决于所使用内容的HDR范围。若最小亮度（Min Brightness）等于最大亮度（Max Brightness），自动曝光将禁用。

**最大亮度（Max Brightness）**

自动曝光的最大亮度，用于限定眼部可适应的最高亮度。值必须大于0，并且必须大于或等于 **最小亮度（Min Brightness）**。合适的值应为正值（2是不错的起始值），并将在明亮的光照条件调整。例如，若该值过小，则图像会显得太亮。若值过大，则图像会显得太暗。实际值取决于所使用内容的HDR范围。若最大亮度（Max Brightness）等于最小亮度（Min Brightness），自动曝光将禁用。

**最小EV100（Min EV100）**

启用项目设置 **扩大自动曝光设置中的默认亮度范围（Extend default luminance range in Auto Exposure settings）** 时，用于代替 **最小亮度（Min Brightness）**。

最小自动曝光适应，它的实现方式是选择曝光值，平均亮度将根据此值生成与常量校准值相等的像素亮度。此值以像素亮度（cd/m2）表示。若最小EV100（Min EV100）等于最大EV100（Max EV100），自动曝光将禁用。

**最大EV100（Max EV100）**

启用项目设置 **扩大自动曝光设置中的默认亮度范围（Extend default luminance range in Auto Exposure settings）** 时，用于代替 **最小亮度（Min Brightness）**。

最大自动曝光适应，实现方式是选择曝光值，平均亮度将根据此值生成与常量校准值相等的像素亮度。此值以像素亮度（cd/m2）表示。若最大EV100（Max EV100）等于最小EV100（Min EV100），自动曝光将禁用。

**加速（Speed Up）**

从黑暗环境到明亮环境的适应速度。

**减速（Speed Down）**

从明亮环境到黑暗环境的适应速度。

### 手动设置

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81beba09-ddff-44ef-a452-363c5788347f/autoexp_manual.png)

属性

说明

曝光（Exposure）

 

**曝光补偿（Exposure Compensation）**

曝光对数调整，仅在指定色调映射器的情况下使用。设为0时，没有调整；设为-1时，为两倍暗，设为-2时，为四倍暗，设为1时，为两倍亮，设为2时，为四倍亮。

**应用物理摄像机曝光（Apply Physical Camera Exposure）**

此切换仅影响 **手动** 测光模式。启用后，场景亮度会受到 **摄像机** 设置（ISO、快门速度和光圈）的影响。禁用时，摄像机使用默认值ISO 100、孔径1.0和快速速度1.0。启用此标记后，大多数场景将明显变暗。

**曝光测光遮罩（Exposure Metering Mask）**

使用自己的纹理遮罩测量曝光。遮罩上的亮点将对自动曝光测光产生很大影响，而暗点的影响较小。

摄像机（Camera）

 

**快门速度（1/s）（Shutter Speed (1/s)）**

定义摄像机快门速度，以秒为单位。

**ISO**

该值表示摄像机传感器的灵敏度。

**孔径（F值）（Aperture (F-stop)）**

定义摄像机镜头开口的大小。较大的值会降低景深（DOF）效果。

## 局部曝光设置

![局部曝光设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86300423-18ed-4456-9750-6425557d06cc/local-exposure-settings.png)

属性

描述

**高光对比度缩放（Highlight Contrast Scale）**

控制高光的对比度。局部曝光可将画面的亮度分解为一个基础层和一个细节层。基础层的对比度会在此值的基础上降低。合适的数值通常在0.6到1之间。

**阴影对比度降低（Shadow Contrast Reduction）**

控制阴影的对比度。局部曝光可将画面的亮度分解为一个基础层和一个细节层。基础层的对比度会在这个值的基础上被降低。小于1的值可以实现局部曝光。合适的数值通常在0.6和1之间。

**细节强度（Detail Strength）**

控制应用于场景的细节强度。局部曝光可将画面的亮度分解为一个基础层和一个细节层。1之外的值将启用局部曝光。此值在大部分情况下都应被设置为1。

**模糊亮度混合（Blurred Luminance Blend）**

将双边过滤亮度和模糊亮度混合为一个基础层。模糊亮度有助于保留图像外观和镜面高光，并减少振铃效应。合适的数值通常在0.4到0.6之间。

**模糊亮度内核尺寸百分比（Blurred Luminance Kernel Size Percent）**

用于模糊画面亮度的屏幕（或内核尺寸）的百分比。

**中间灰度偏差（Middle Grey Bias）**

被局部曝光认定为中间灰度（感觉上介于黑白之间的色调）的对数调整。0等于不调整。-1表示2倍暗。-2表示4倍暗，1表示2倍亮，2表示4倍亮。

## 编辑器视口覆盖

每个编辑器视口提供一个选项，用于覆盖默认的自动曝光设置或后期处理体积中的设置。

从关卡视口或资产编辑器视口的 **查看模式（View Mode）** 下拉列表中访问曝光覆盖，并禁用 **游戏设置（Game Settings）** 或 **自动（Auto）** 旁边的复选框以使用EV100滑块。

 

 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cdd0e87d-7a16-4945-acf6-0ad47cf9e59f/override_levelviewport.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/389a85c7-b7d9-4191-943f-5c104ffe44e4/override_asseteditor.png)

关卡视口覆盖

资产编辑器覆盖

## 可视化和调试

**HDR（眼部适应）** 可视化模式提供当前场景视图中测得曝光值的直方图表示，并快速引用后期处理体积和曲线资产中设置的值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0120b338-30ea-4949-84b5-c78a66a2d85d/hdr_vismode.png)

1.  后期处理体积和曲线资产中设置的曝光和曲线值列表。
2.  提供NIT（以cd/m2为单位）和勒克斯值的焦点计。
3.  设置最小和最大范围的直方图。

使用关卡视口启用此可视化模式，选择 **显示（Show）** > **可视化（Visualize）** > **HDR（眼部适应）（HDR（Eye Adaptation））**。

### 直方图

直方图提供当前视图中测得的一系列曝光值。图表中的彩色线表示目标曝光值、实际曝光值和最终曝光值，始终适应当前摄像机视图的测量曝光。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ef18227-b81c-477a-8a2b-d2c71ca15752/histogramchart.png)

-   **蓝** 线表示当前视图的 *目标* EV100曝光。
    -   这是直方图中平均场景曝光的所在位置。
-   **紫** 线表示当前视图的 *实际* EV100曝光。
    -   这是此视图中存在的当前曝光。实际曝光值随着视图变化，将始终朝着目标曝光值移动。
-   **白** 线是后期处理设置中调整曝光补偿后的 *最终* EV100曝光值。
    -   这是曝光补偿后当前视图中的实际曝光值。白线和紫线将保持曝光补偿设定的距离。上例中，曝光补偿为2，其中白线和紫线之间保持该距离。

在此示例场景中，若在后期处理体积 **曝光（Exposure）** 设置中更改曝光补偿（Exposure Compensation），则该值将在关卡视口中的曝光设置列表中体现。在图中，实际曝光线（紫色）和最终曝光线（白色）的分离反映了曝光补偿的差异偏移。

在图表中，较远的边缘表示自动曝光适应范围，该范围由 **直方图对数最小值（Histogram Log Min）** 和 **直方图对数最大值（Histogram Log Max）** （启用项目设置 **扩大自动曝光设置中的默认亮度范围（Extend default luminance range in Auto Exposure settings）** 时，则为 **直方图最小EV100（Histogram Min EV100）和** 直方图最大EV100（Histogram Max EV100）\*\*）设置。

### 直方图调试可视化模式

此模式提供不同像素值的可视化，确保自动曝光的HDR计算中不涉及非常亮的像素（如太阳）和非常暗的像素（如深阴影）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/30115b1f-a545-410a-a0b3-76e0a1f9520a/histogramdebugvis.png)

红色像素表示 *低于* **直方图对数最小值（Histogram Log Min）** （或 **直方图最小EV100（Histogram Min EV100）**）设置的自动曝光适应范围。蓝色像素表示 *高于* **直方图对数最大值（Histogram Log Max）** （或 **直方图最大EV100（Histogram Max EV100）**）设置的自动曝光适应范围。此类像素范围可确保设置的 **低百分比（Low Percent）** 和 **高百分比（High Percent）** 值从计算中删除这些不需要的像素。

此调试可视化模式要求首先启用 **HDR（眼部适应）（HDR（Eye Adaptation））** 可视化模式。

使用命令 **r.EyeAdaptation.VisualizeDebugType 1** 启用此可视化模式。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [post process](https://dev.epicgames.com/community/search?query=post%20process)
-   [auto exposure](https://dev.epicgames.com/community/search?query=auto%20exposure)
-   [exposure](https://dev.epicgames.com/community/search?query=exposure)
-   [eye adaptation](https://dev.epicgames.com/community/search?query=eye%20adaptation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [曝光测光模式](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E6%9B%9D%E5%85%89%E6%B5%8B%E5%85%89%E6%A8%A1%E5%BC%8F)
-   [直方图和基本算法](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E7%9B%B4%E6%96%B9%E5%9B%BE%E5%92%8C%E5%9F%BA%E6%9C%AC%E7%AE%97%E6%B3%95)
-   [手动算法](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E6%89%8B%E5%8A%A8%E7%AE%97%E6%B3%95)
-   [局部曝光](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E5%B1%80%E9%83%A8%E6%9B%9D%E5%85%89)
-   [重要概念与功能](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E9%87%8D%E8%A6%81%E6%A6%82%E5%BF%B5%E4%B8%8E%E5%8A%9F%E8%83%BD)
-   [曝光补偿曲线](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E6%9B%9D%E5%85%89%E8%A1%A5%E5%81%BF%E6%9B%B2%E7%BA%BF)
-   [曝光测光遮罩](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E6%9B%9D%E5%85%89%E6%B5%8B%E5%85%89%E9%81%AE%E7%BD%A9)
-   [曝光更改速度和移动](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E6%9B%9D%E5%85%89%E6%9B%B4%E6%94%B9%E9%80%9F%E5%BA%A6%E5%92%8C%E7%A7%BB%E5%8A%A8)
-   [使用加速和减速参数](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8A%A0%E9%80%9F%E5%92%8C%E5%87%8F%E9%80%9F%E5%8F%82%E6%95%B0)
-   [扩展EV100的默认亮度范围](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E6%89%A9%E5%B1%95ev100%E7%9A%84%E9%BB%98%E8%AE%A4%E4%BA%AE%E5%BA%A6%E8%8C%83%E5%9B%B4)
-   [预曝光](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E9%A2%84%E6%9B%9D%E5%85%89)
-   [移动设备用法](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E8%AE%BE%E5%A4%87%E7%94%A8%E6%B3%95)
-   [游戏设置](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E6%B8%B8%E6%88%8F%E8%AE%BE%E7%BD%AE)
-   [自动曝光直方图设置](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E8%87%AA%E5%8A%A8%E6%9B%9D%E5%85%89%E7%9B%B4%E6%96%B9%E5%9B%BE%E8%AE%BE%E7%BD%AE)
-   [基本自动曝光设置](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E5%9F%BA%E6%9C%AC%E8%87%AA%E5%8A%A8%E6%9B%9D%E5%85%89%E8%AE%BE%E7%BD%AE)
-   [手动设置](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE)
-   [局部曝光设置](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E5%B1%80%E9%83%A8%E6%9B%9D%E5%85%89%E8%AE%BE%E7%BD%AE)
-   [编辑器视口覆盖](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E8%A7%86%E5%8F%A3%E8%A6%86%E7%9B%96)
-   [可视化和调试](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E5%92%8C%E8%B0%83%E8%AF%95)
-   [直方图](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E7%9B%B4%E6%96%B9%E5%9B%BE)
-   [直方图调试可视化模式](/documentation/zh-cn/unreal-engine/auto-exposure-in-unreal-engine#%E7%9B%B4%E6%96%B9%E5%9B%BE%E8%B0%83%E8%AF%95%E5%8F%AF%E8%A7%86%E5%8C%96%E6%A8%A1%E5%BC%8F)