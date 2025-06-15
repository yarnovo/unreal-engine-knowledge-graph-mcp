# 虚幻引擎过场动画的变换和属性轨道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:11.572Z

---

目录

![变换和属性轨道](https://dev.epicgames.com/community/api/documentation/image/5f3811e0-046b-4cf3-8a9c-fbeaefa3c587?resizing_type=fill&width=1920&height=335)

Sequencer包含各种 **属性轨道**，可以用来为Actor的常见属性类型制作动画。你可以使用这些轨道为变换、颜色或布尔值等属性制作动画。本指南概述了Sequencer中存在的各种属性轨道类型。

#### 先决条件

-   你已了解[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)及其[界面](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)。

## 变换轨道

Sequencer中最常用的轨道之一是 **变换轨道**。你可以使用此轨道为场景中的对象、摄像机和角色的运动制作动画。

![Sequencer变换轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d700961-ba9e-471a-859a-4a1c0a13a967/transformtrack.png)

### 创建

默认情况下，每当[静态网格体](/documentation/zh-cn/unreal-engine/static-meshes)、[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)或[摄像机](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)添加到Sequencer时，它们下面就会自动添加一个变换轨道。

要手动添加变换轨道，请点击[Actor轨道](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine) **上的** 添加轨道（+）**，然后选择** 变换（Transform）\*\*。

![添加变换轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f20ac3b-be37-4349-94f8-82bda944ea7d/addtransform.png)

要想自动添加某些轨道下的变换轨道，需要从 **项目设置（Project Settings）** 启用，并且可以在[轨道设置项目设置](/documentation/zh-cn/unreal-engine/cinematic-editor-and-project-settings-in-unreal-engine#%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)下自定义为对其他Actor类型生效。

### 用途

变换轨道可以展开，用于查看单个通道或轴。选中这些通道或轴轨道后按 **Enter**，可以在这些特定轨道上放置关键帧。

![展开变换轨道通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68c34ff5-7bb3-4330-bc80-69778154551d/expandtransform.gif)

如果不需要通道和轴，也可以禁用它们，将其从视图中删除。右键点击变换分段并启用或禁用 **活动通道（Active Channels）** 类别下的通道即可。移除任何通道或轴将导致这些轨道不被Sequencer求值并且不响应[自动键入](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#autokey)。

![变换轨道通道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a7bcf4c-88c7-4b79-928d-b35dfb24e31c/channels.png)

### 属性

变换轨道分段包含了一些属性，可以用来加强你对变换的控制。右键点击变换轨道（Transform track）分段，选择属性（Properties）以查看。

![变换轨道属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4dd780e-014c-4428-b378-83d27ee236d8/transformproperties.png)

**使用四元数插值（Use Quaternion Interpolation）** 选项可以启用变换关键帧之间的四元数线性插值。四元数插值有助于减少 **环架锁定** 和其他基于欧拉的旋转问题。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3998bae7-f45c-4d22-969f-54bf54311533/quat1.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e23aa98-f8a8-49af-bb12-9ef5f10e01fe/quat2.gif)

禁用"用四元数插值"

启用"用四元数插值"

**显示 3D 轨迹（Show 3D Trajectory）** 包含为变换轨道绘制轨迹路径的选项。

![显示 3D 轨迹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a1a419f-0fca-4c13-8a69-962c1004a97b/trajectory.png)

这些选项包括：

-   **仅选择时（Only When Selected）**，表示仅在选择对象或轨道时绘制轨迹。
-   **始终（Always）**，表示无论选择如何，将始终绘制轨迹。
-   **从不（Never）**，表示从不绘制轨迹。

无论选择何种轨迹设置，当启用 [**游戏视图**](/documentation/zh-cn/unreal-engine/using-editor-viewports-in-unreal-engine#gameview) 时，轨迹将始终隐藏。

## 属性轨道

Sequencer支持各种属性的动画制作。点击Actor上的 **添加轨道（+）** 并从 **属性（Properties）** 类别中选择一个，可以将属性添加到Sequencer中的[Actor轨道](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine)。

![Sequencer属性轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96055133-b59a-4ac0-905b-134853ebb7f4/addproperties.png)

### 布尔

布尔轨道用于为布尔属性制作动画。布尔轨道只能设置为启用或禁用，并且不插值。设置为禁用时，时间轴将显示为 **红色**，启用时为 **绿色**。

![Sequencer布尔轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9f4ece9-0431-4f84-89cb-6a26901ee9e6/bool.png)

布尔值也在曲线编辑器中用 **0**（禁用）和 **1**（启用）表示。

### 整型

整型轨道用于为整型属性制作动画并且不插值。

![Sequencer整型轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7999757a-c418-4796-bfe2-3126b721deed/integer.png)

### 浮点

浮点轨道用于为标量浮点属性制作动画。浮点关键帧可以插值并可以使用自定义切线和曲线。

![Sequencer浮点轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6fbf9dc-290a-42c0-b7f1-4b86526fe8c8/float.png)

为了显示浮点值的变化，你可以在一个浮点值轨道内显示浮点曲线。

![float track curve display](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17538cf6-c358-479a-810d-b02e3b5fce14/floatcurve1.png)

要启用浮点轨道曲线，请在浮点轨道部分上单击鼠标右键，选择 **显示 > 显示曲线（Display > Show Curve）**。

![float track curve display](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40b8a5b8-b05c-4429-8432-be5e6a45320d/floatcurve2.png)

### 向量

Sequencer支持使用各自的轨道为向量2、3、4属性制作动画。所有向量轨道都可以插值，并且可以有自定义切线和曲线。

![Sequencer向量轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f37f95e-2004-40ae-badb-4d61d37c3c3e/vectors.png)

### 颜色

颜色轨道用于为Sequencer中的特定颜色属性制作动画，例如光源或材质。颜色轨道支持插值，并且还会沿时间轴显示每个关键帧处设置的颜色，因此你可以一目了然地预览颜色。

![Sequencer颜色轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9192bec8-2f1a-4612-b5c8-3c390ed88ec6/color.png)

为方便选择颜色，你可以双击颜色轨道关键帧，以便显示 **颜色拾取器**。选择颜色后，点击 **确定（OK）** 按钮，关键帧现在将设置为该颜色。

![Sequencer取色器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89ffb81b-b013-4641-817f-80d31c014ee0/colorpicker.gif)

颜色轨道支持 **颜色（Color）** 和 **线性颜色（Linear Color）** 空间的动画制作。

### 字符串

字符串轨道用于为不同的字符串值制作动画。字符串值不会在关键帧之间插值。

![Sequencer字符串轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a53a19c-279a-4469-9fe4-ecfdf831720b/string.png)

### 枚举

枚举轨道用于为不同的枚举值制作动画。枚举值不会在关键帧之间插值。

![Sequencer枚举轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2c740b4-12ea-4522-8b9a-fc5741e53975/enum.png)

### 对象

对象轨道用于为不同的对象和资产值制作动画。对象值不会在关键帧之间插值。

![Sequencer对象轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb1705e1-e710-4d15-bc63-8215005d7c89/object.png)

### UMG属性

Sequencer支持[创建用户界面](/documentation/zh-cn/unreal-engine/creating-user-interfaces-with-umg-and-slate-in-unreal-engine)中UI元素属性的动画制作。用于UMG的两个主要轨道是 **边界（Margin）** 和 **控件变换轨道（Widget Transform Tracks）**。

![Sequencer umg ui属性轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80ae752c-68b0-401d-a194-56d84cfcd380/umg.png)

## 重载轨道

有些属性可以被重载，从而输出与普通关键帧或曲线不同的动画数据。例如，你可以重载变换轴上的浮点通道或单独的X/Y/Z通道，输出随机的Perlin早点。这对于创建基于噪点的程序性动画非常有用，无需手动制作噪点动画。

![sequencer animate noise](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/737cc75e-c709-44f6-819f-2369a8997590/override4.gif)

目前只有浮点/双浮点和变换轨道支持重载通道。

要重载通道，你可以找到[浮点轨道](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E6%B5%AE%E7%82%B9) 或[变换轨道](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%8F%98%E6%8D%A2%E8%BD%A8%E9%81%93)的单个轴通道，右键点进轨道并选择 **使用双Perlin噪点重载（Override with Double Perlin Noise）**。

![override with double perlin noise](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5f40cfa-e69a-465d-96ba-1400e2892a59/override1.png)

如需修改噪点参数，你可以右键点击轨道，找到 **双Perlin噪点参数（Double Perlin Noise Parameters）**，其中的 **频率（Frequency）** 和 **振幅（Amplitude）** 都可以编辑。

![double perlin noise parameters](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d249af99-1208-4c94-9ab5-6489b6b89d0c/override2.png)

噪点通道的动画与值 **0** 相关。如果你希望噪点在特定的值范围内运动，例如 **100 - 200**，可以创建额外的叠加[分段](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#sections)，再将这些通道转换为噪点。这样，你就能获得一个使用特定值的基础分段，再将噪点叠加到该基础上。

![layer additive noise](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96eb7b7d-2def-432e-8a39-5fb2b6e333e2/override3.png)

如果你的分段中有重载过的通道，可以右键点击该分段并在 **Perlin噪点通道（Perlin Noise Channels）** 菜单下同时编辑所有噪点参数。

![change multiple noise properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e8af678-f0ea-4b5e-8d38-a65e8398c94d/override5.png)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [track](https://dev.epicgames.com/community/search?query=track)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [变换轨道](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%8F%98%E6%8D%A2%E8%BD%A8%E9%81%93)
-   [创建](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [用途](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E7%94%A8%E9%80%94)
-   [属性](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%B1%9E%E6%80%A7)
-   [属性轨道](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%B1%9E%E6%80%A7%E8%BD%A8%E9%81%93)
-   [布尔](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%B8%83%E5%B0%94)
-   [整型](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E6%95%B4%E5%9E%8B)
-   [浮点](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E6%B5%AE%E7%82%B9)
-   [向量](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%90%91%E9%87%8F)
-   [颜色](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E9%A2%9C%E8%89%B2)
-   [字符串](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%AD%97%E7%AC%A6%E4%B8%B2)
-   [枚举](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E6%9E%9A%E4%B8%BE)
-   [对象](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E5%AF%B9%E8%B1%A1)
-   [UMG属性](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#umg%E5%B1%9E%E6%80%A7)
-   [重载轨道](/documentation/zh-cn/unreal-engine/cinematic-transform-and-property-tracks-in-unreal-engine#%E9%87%8D%E8%BD%BD%E8%BD%A8%E9%81%93)