# 虚幻引擎ICVFX颜色校准 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:31.386Z

---

目录

![ICVFX颜色校准](https://dev.epicgames.com/community/api/documentation/image/20d13d34-263e-455e-9acc-9268caca0971?resizing_type=fill&width=1920&height=335)

## 概述

本文介绍了校准LED墙上内容的步骤，以便用特定摄像机进行拍摄。下文详细介绍了步骤：

-   在场景中显示一张RGB图，需要用自发光无光照纹理显示。
    -   关闭所有摄像机相关参数，并确保OpenColorIO (OCIO)仅使用PQ编码。
    -   把Brompton设置成接收PQ编码的RGB信号，并将其解释为"PQ可实现（PQ Achievable）"，此外，将墙壁复制设置为"可实现（Achievable）"。
-   用摄像机拍摄LED墙的画面。
    -   在校准期间，将摄像机的白平衡设置为6500，曝光设置成能自然舒适地拍摄墙上的明亮白色色块。
-   使用标准方法将摄像机画面线性化，然后从摄像机编码颜色空间转换为UE摄像机验证颜色空间（在下面使用）。
-   找一个从已知RGB到线性化验证空间RGB的矩阵。反转该矩阵，生成 **摄像机校准矩阵**。
-   在UE中重新显示该图表。请注意，现在它假定处于工作颜色空间中。
    -   将OCIO源设置为工作颜色空间，并将目标设置为包含以下三个步骤的空间：
        -   从参考到摄像机验证空间的矩阵转换。
        -   计算的摄像机校准矩阵应用。
        -   线性到PQ编码。
-   重新拍摄该图，然后将画面线性化到工作颜色空间。将图表与线性化画面比较。这最好是通过线性内容的分析来完成，但也可以肉眼完成，将相同的LUT应用于两者。

## ICVFX的颜色管线

上述内容简要描述了为摄像机/LED墙进行校准的步骤。提供该内容主要是为了介绍如何设置从UE到LED处理器的颜色管线。

虚幻引擎的 **工作颜色空间（Working Color Space）** 不是显式的。它是隐式 *线性Rec709*（也称为 *线性sRGB*）。这意味着编码是线性的，颜色空间是Rec709原色和白点。有可能会提供其他颜色空间中的纹理和材质，这会向引擎暗示，工作颜色空间是Rec709之外的内容。常见的替代空间是 *ACEScg*，许多视觉特效处理工作室都在使用它。

要点是，虚拟场景是线性的，并且目标是让这些线性值显示在LED墙上。为此，应该禁用后处理链中的一部分内容（或设置为0），确保常规UE"摄像机特效"均未应用于虚拟内容。

**泛光强度（Bloom Intensity）** 和 **暗角效果强度（Vignette Intensity）** 应该设置为 **0.0**，因为这些特效在LED墙的输出上通常不太适用。此外，你应该将 **扩展色域（Expand Gamut）** 数量以及 **色调曲线（Tone Curve）** 数量设置为 **0.0**。应当注意，OCIO处于活动状态时，"色调曲线（Tone Curve）"数量将自动设置为0，但"扩展色域（Expand Gamut）"受用户控制。

OCIO转换需要用到一个OCIO配置资产，后者会引用你的本地OCIO配置文件。此外，此资产有一个来自OCIO配置的颜色空间白名单，可供UE使用。请参阅[此页面](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine)，详细了解如何将特定源和目标颜色空间与nDisplay输出视口相关联。

-   从线性到信号值的OCIO转换。
    -   源颜色空间：线性工作颜色空间
        -   它会从源空间转换为OCIO参考空间。
    -   目标颜色空间：PQ编码的信号颜色空间
        -   它会从OCIO参考空间转换为目标空间。
    -   从OCIO参考转换为线性摄像机校准颜色空间。
        -   摄像机校准矩阵
        -   线性到PQ转换

在OCIO激活时，虽然可以在色调映射后使用 **后期处理材质(PPM)（Post Process Materials (PPMs)）**，但它们将采用编码的数据进行操作。这可能会产生非预期结果，因为可用于PPM的所有值都在输出信号颜色空间和颜色编码中。

如果你需要使用PPM改变场景，最好在色调映射前用。这能确保材质是对线性值进行操作。例如，假如你想提供颜色校正控制选项，可以在这里实现。

## OCIO转换详情

OCIO转换的目的是将UE的工作颜色空间转换为LED处理器的输出信号。

下面的摄像机校准步骤假设特定颜色空间会确定校准与目标匹配。我们称之为 **摄像机校准颜色空间（Camera Calibration Color Space）**。它有可能与 **工作颜色空间（Working Color Space）** 相同，但考虑到灵活性，这里会单独称呼。

在config.ocio文件中，PQ编码的信号颜色空间的目标空间涉及三个具体步骤：

1.  首先，需要从OCIO参考空间转换为线性摄像机校准颜色空间。
    
2.  其次，应用摄像机校准矩阵，从线性摄像机校准颜色空间转换为线性信号颜色空间。应当注意，信号颜色空间不是使用原色定义的，而是通过校准过程定义的。
    
3.  第三个步是从线性编码为PQ。
    

要设置这些步骤，需要先定义几个单独的OCIO颜色空间。一个是线性摄像机校准颜色空间，这在下面的示例中是线性sRGB（也称为线性Rec709），并直接命名为"Gamut sRGB"。另一个必需的转换是从线性到PQ的简单直接的转换。此转换假设线性值1.0的尼特值为100，然后是0-10000到0-1编码值的标准转换。

```cpp
	 - !<ColorSpace>
		name: Gamut - sRGB
		family: Gamut
		equalitygroup: ""
		bitdepth: 32f
		description: |
		  "BT.709 / sRGB"颜色空间原色和"D65"白点，根据"IEC 61966-2-1:1999"。
		isdata: false
		allocation: lg2
		allocationvars: [-8, 7, 0.00390625]
		
	 - !<ColorSpace>
		name: CCTF - PQ
		family: CCTF
		equalitygroup: ""
		bitdepth: 32f
		description: |
		  "PQ"颜色组件传输函数，根据"SMPTE ST 2084"。假设场景值1.0对应于100尼特。
		isdata: false
		allocation: uniform
		allocationvars: [0, 1]
		to_reference: !<GroupTransform>
		  children:
			- !<FileTransform> {src: Dolby_PQ_10000_to_linear.spi1d, interpolation: linear}
			- !<CDLTransform> {slope: [100, 100, 100], direction: inverse}
```

在本示例中，OCIO线性参考空间与线性摄像机校准空间相同，因此在色域sRGB空间中不需要颜色转换。

实际目标颜色空间是转换为编码的信号颜色空间，如下所示。转换包括颜色矩阵，然后是从线性到PQ的编码。此颜色矩阵的派生会在后面加以说明。下面的矩阵变换中的值仅显示为示例；这些值必须替换为针对你的特定LED和摄像机完成的校准。

```cpp
	 - !<ColorSpace>
		name: View - Camera on LED Walls - PQ
		family: View
		equalitygroup: ""
		bitdepth: 32f
		description: |
		  LED墙上内容的视图（提供摄像机校准计算），采用OCIO参考中的输入，然后编码为PQ"ST 2084"HDR颜色组件 \ 传输函数。假设场景值1.0对应于100尼特。
		isdata: false
		allocation: uniform
		allocationvars: [0, 1]
		from_reference: !<GroupTransform>
		  children:
			- !<MatrixTransform> {matrix: [0.80252942, 0.12102891, 0.07644168, 0, 0.05176983, 0.89236679, 0.05488673, 0, 0.01495024, 0.07238952, 0.88267732, 0, 0, 0, 0, 1]}
			- !<ColorSpaceTransform> {src: Gamut - sRGB, dst: CCTF - PQ}
```

## 场景曝光

由于线性值编码为PQ，并且数值会按照标准的 0 - 10000 尼特范围解释，因此场景曝光必须在OCIO转换之前调整。可以用"电影摄像机（CineCamera）"或"后期处理体积"中的"曝光（Exposure）"选项来完成。这里应特别注意，要在虚拟场景亮度和LED墙上的最终亮度之间建立对应关系。

通常，线性场景包含HDR值。虽然大部分场景在 100尼特 亮度左右，但某些部分可能明亮得多，其中一些像素可能会高达 2000或3000 尼特。对大部分LED墙来说，这些亮度都超出了其显示能力。因此，墙上亮度相同的像素，在场景中却可能亮度不同，因为LED上的亮度峰值可能只有 1500-1800 尼特。例如，LED的峰值亮度为1600尼特，曝光补偿后对应的场景线性值是16.0。

## 摄像机校准矩阵

摄像机校准矩阵旨在确保虚拟场景线性颜色与从摄像机画面线性化生成的颜色之间存在匹配。

对于背景，应当注意，摄像机有一组唯一的频谱响应，并且这些响应因摄像机品牌而异，也不同于肉眼看到的情况。由于LED的频谱分布相当狭窄，摄像机响应中的细微差别可能导致照片中的LED在不同摄像机所生成的画面中显示为不同。为减少此问题，我们需要略微更改LED墙上的像素，以便来自特定摄像机的线性化画面都将匹配场景中表示的值。

要创建矩阵，UE必须显示至少四个颜色值。这四个值是红色、绿色、蓝色和白色色块，其中墙上生成的像素由摄像机捕获。为使这种情况正常运作，LED处理器应设置为在墙上生成原生颜色。对于Brompton处理器的情况，这称为"可实现"。其他供应商可能称其为"原生"。使用此颜色空间的目标是，校准尝试使用墙壁的完整功能，而不裁剪颜色值。此外，颜色编码应设置为将用于最终拍摄的相同颜色编码。对于我们的Brompton设置，我们使用了PQ编码。

在实际实践中，我们使用了更多色块来确认总体行为符合预期。但校准计算仅需要四个色块。

下面是创建摄像机校准矩阵的基本方法。请注意，存在一些关切点和可能的问题，后面会进行讨论。

### 显示场景线性图表

使用几何平面对象在UE中显示场景线性图表，还有一个着色器，以无光照模式显示色块值。值可以从已知纹理文件中拉取，或从平面的着色器材质中的数学运算中拉取。

图表应包含具有已知场景亮度值的红色、绿色、蓝色和白色色块。最简单的示例将是表示红色的(1.0, 0.0, 0.0)，以及表示其他色块的类似值。通调整UE曝光，图表应显示为在LED墙上有特定目标亮度。亮度应接近墙壁的峰值，但应略低于峰值，以避免由于裁剪导致颜色移位。

图表应足够大，可以舒适地在生成的画面中对每个色块取样，但也应居中并足够小，避免由于镜头渐晕导致的衰减区域。

显示图表时，应启用OCIO转换。使用的转换应类似于最终目标转换，但仅会是从线性到PQ的转换（没有校准矩阵，因为我们要通过此步骤创建该矩阵）。

### 线性化供应商的画面

应使用特定供应商的标准方法将画面线性化。例如，对于Sony Venice，应使用Sony XOCN F55 ST编码解码器将画面线性化。数据在SGamut3-Cine颜色空间中进行SLog3编码。对于我们的简单示例，我们使用Nuke12中的Read节点线性化为Rec709色域。

请务必注意使用了哪种方法将画面线性化，并验证结果是否确实为线性。在我们的示例中，我们线性化为Rec709。但是，这个词可能会误导人，因为许多用户都提到过Rec709摄像机输出，它通常会对内容应用外观LUT。出于校准目的，我们的目标是在不应用外观的情况下，以原生摄像机格式进行拍摄，并使用标准方法将该内容转换为线性。

白色色块的色温应该比较中性（假设摄像机设置为 6500K 白平衡）。如果白色色块的色温比较极端，可能存在有问题，需要解决才能继续。

### 矩阵创建数学运算

下一节内容是关于如何从R、G、B、W的示例数据创建矩阵的数学运算。

首先，从红色、绿色和蓝色色块示例创建3x3矩阵：

RR

GR

BR

F

\=

RG

GG

BG

RB

GB

BB

I = F\-1

使用该矩阵的逆矩阵，将其乘以白色示例，其中最高值已标准化为1.0：

S = I × W/max(WRGB)

使用计算好的缩放系数来缩放F矩阵，然后计算其逆矩阵。

SR

0

0

F

\=

0

SG

0

x

F

0

0

SB

CalibrationMX = F\-1

### 将校准矩阵放在OCIO转换中

生成的校准矩阵应放在墙/摄像机组合的OCIO转换中，如前所示。注意，该矩阵表示为特定顺序的九个数字，先给出矩阵的第一行，然后是第二行，接着是第三行。

在上述示例中，OCIO参考颜色空间是Rec709。这点符合校准期间用于线性化的颜色空间。如果你选择使用不同的OCIO参考颜色空间，校准矩阵必须包含从参考颜色空间到Rec709空间的转换（后者用于摄像机画面线性化）。这在上述概述中称为"从参考到摄像机验证空间的矩阵转换"。

## 校准验证

确认摄像机校准矩阵处于活动状态并且表现正常，会很有用。为此，请使用用于初始捕获的相同方法显示已知色块，但颜色空间目标应包含新创建的校准矩阵。

目标是，在线性化回到相同工作空间之后，场景线性空间中的已知色块值匹配画面中的值。

之前，必需的色块只有R、G、B和W。对于验证，将位于0到1之间的已知位置的值包括在内会很有用。此图像显示按0.25分隔的 5x5x5 色块集合，其导致线性空间中的样本的均匀间隔。

![完整验证的校准色块](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f299bbf-9fd6-48da-a9c2-c4baa356c1aa/camera-calibration-patches.png)

包含RGBW以外的其他示例的原因是，此图像的线性化画面将有助于你确认是否因为亮度（或其他问题）而造成了裁剪。

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [in-camera vfx](https://dev.epicgames.com/community/search?query=in-camera%20vfx)
-   [opencolorio](https://dev.epicgames.com/community/search?query=opencolorio)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [ICVFX的颜色管线](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine#icvfx%E7%9A%84%E9%A2%9C%E8%89%B2%E7%AE%A1%E7%BA%BF)
-   [OCIO转换详情](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine#ocio%E8%BD%AC%E6%8D%A2%E8%AF%A6%E6%83%85)
-   [场景曝光](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine#%E5%9C%BA%E6%99%AF%E6%9B%9D%E5%85%89)
-   [摄像机校准矩阵](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA%E6%A0%A1%E5%87%86%E7%9F%A9%E9%98%B5)
-   [显示场景线性图表](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine#%E6%98%BE%E7%A4%BA%E5%9C%BA%E6%99%AF%E7%BA%BF%E6%80%A7%E5%9B%BE%E8%A1%A8)
-   [线性化供应商的画面](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine#%E7%BA%BF%E6%80%A7%E5%8C%96%E4%BE%9B%E5%BA%94%E5%95%86%E7%9A%84%E7%94%BB%E9%9D%A2)
-   [矩阵创建数学运算](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine#%E7%9F%A9%E9%98%B5%E5%88%9B%E5%BB%BA%E6%95%B0%E5%AD%A6%E8%BF%90%E7%AE%97)
-   [将校准矩阵放在OCIO转换中](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine#%E5%B0%86%E6%A0%A1%E5%87%86%E7%9F%A9%E9%98%B5%E6%94%BE%E5%9C%A8ocio%E8%BD%AC%E6%8D%A2%E4%B8%AD)
-   [校准验证](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine#%E6%A0%A1%E5%87%86%E9%AA%8C%E8%AF%81)