# 虚幻引擎中的ML变形器框架 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:04.650Z

---

目录

**机器学习** （ **ML** ） **变形器** 是 **虚幻引擎** 中的一个框架，可用于在运行时获取角色和对象的高保真度网格体变形。它使用Alembic文件（ `.abc` ），其中包含一组所需的网格体变形数据，你可以训练虚幻引擎的某个ML变形器模型，在运行时以高性能近似模拟此高质量网格体变形。

ML变形器训练过程依赖三个输入：

1.  **骨骼网格体** 资产。
2.  角色的 **动画序列** 资产，角色在涵盖各种动作的不同位置中摆出姿势。
3.  **几何体缓存** 资产，其中包含这些姿势中所需的网格体变形。

使用这三个输入，ML变形器框架会输出一个经过训练的 **ML变形器（ML Deformer）** 资产，它可与角色的蓝图中的 **ML变形器组件（ML Deformer Component）** 组合使用，在运行时选择网格体变形。

ML变形器编辑器包含一套工具和设置，可用于微调和测试训练过程，在运行时实现高质量网格体变形。

以下文档概述了虚幻引擎中的ML变形器框架，包括ML变形器资产、ML变形器编辑器和ML变形器组件的参考资料。此文档还介绍了用于训练ML变形器系统的不同ML变形器模型，例如 **神经变形模型** 和 **最近邻模型** 。

#### 先决条件

-   **ML变形器框架（ML Deformer Framework）** 是一种[插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)，必须先启用才能使用。在虚幻引擎菜单中找到 **编辑（Edit）> 插件（Plugins）** ，找到 **动画（Animation）** 分段中的 **ML变形器框架（ML Deformer Framework）** 并将其启用。启用该插件后，你将需要重启编辑器。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ba776ac-1a1c-44bc-82d3-41477f476a73/image_0.png)

-   你还需要有一个可以同时在虚幻引擎和Autodesk Maya中使用的角色模型，其中包含一个网格体和一个骨架。

## ML变形器设置指南

要参考关于使用ML变形器框架在运行时选择高质量网格体变形的综合设置指南，请参阅 **使用ML变形器** 文档。

[](/documentation/zh-cn/unreal-engine/how-to-use-the-machine-learning-deformer-in-unreal-engine)

[![如何使用机器学习变形器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0a27ba1-186a-462c-a4ab-a5d1aabdc7ea/topicimage.png)](/documentation/zh-cn/unreal-engine/how-to-use-the-machine-learning-deformer-in-unreal-engine)

[如何使用机器学习变形器](/documentation/zh-cn/unreal-engine/how-to-use-the-machine-learning-deformer-in-unreal-engine)

[使用ML变形器为蒙皮角色训练机器学习网格体变形模型。](/documentation/zh-cn/unreal-engine/how-to-use-the-machine-learning-deformer-in-unreal-engine)

## ML变形器编辑器

你可以参考下面的ML变形器编辑器概述，以及面板和工具的详细说明。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/413d906a-70bb-4ff6-81fe-d90b69d0092d/image_1.png)

1.  [编辑器工具栏](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
    
2.  [可视化面板](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E9%9D%A2%E6%9D%BF)，用于检查数据。此面板中的设置不影响训练的模型，纯粹用于可视化和检查。
    
3.  [视口](/documentation/zh-cn/unreal-engine/editor-viewports-in-unreal-engine)
    
4.  [Sequencer时间轴](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%97%B6%E9%97%B4%E8%BD%B4)，用于控制和拖动训练，或测试动画序列播放。
    
5.  [细节面板](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)，其中包含ML变形器的所有训练相关设置。
    

### 工具栏

你可以参考下面的列表，了解ML变形器编辑器的工具栏及每个工具的功能说明：

名称

工具

说明

**训练模型（Train Model）**

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5dd8aa4-9276-422f-8065-b73966209665/trainmodel.png)

选择后，此按钮将开始使用ML变形器编辑器的 **细节（Details）** 面板中的属性训练模型，以生成角色的网格体变形的变形目标。

由于缺少输入或其他错误而无法执行训练时，此按钮将被禁用。确切的错误也将在UI中报告。

**模型选择（Model Selection）**

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50eaf349-71c9-45ff-a7af-c73b7aab54a3/models.png)

你可以在这里选择想使用的ML变形器模型。你可以在下拉菜单中的可用选项中选择你想用于训练ML变形器的模型。更改所选模型将擦除你的当前会话，因此推荐仅在创建新ML变形器资产之后立即更改此项。

可用的ML变形器模型取决于你启用的模型插件。每个模型类型都有其自己的插件。

**编辑器模式（Editor Mode）**

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06ca8fc7-aced-461d-ac6a-a67abb0f66f3/training.png)

你可以在这里将ML变形器切换为 **训练（Training）** 模式或 **测试（Testing）** 模式。

-   **训练（Training）** 模式允许你检查训练数据。你将在 **细节（Details）** 面板中找到所有与训练相关的设置。
-   **测试（Testing）** 模式用于查看经训练的模型所生成的变形。你可以在测试期间在 **可视化（Visualization）** 面板中访问测试和调试设置。

**工具（Tools）**

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e2dfde6-837a-4998-a495-b1e806efeb90/tools.png)

你可以在这里访问ML变形器编辑器的工具。使用下拉菜单，选择工具以打开每个工具的选项，你可以在其中调整其属性并运行操作。你可以使用工具菜单按钮访问以下工具：

-   [关键姿势提取工具](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E5%85%B3%E9%94%AE%E5%A7%BF%E5%8A%BF%E6%8F%90%E5%8F%96%E5%B7%A5%E5%85%B7)
-   [获取相邻统计数据](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E8%8E%B7%E5%8F%96%E7%9B%B8%E9%82%BB%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)

此菜单中包含的工具当前在使用 **最近邻** ML变形器模型时最适用。

如需详细了解单独的工具及其属性和功能说明的列表，请参阅下面的相应小节。

**调试Actor（Debug Actor）**

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4bdaad2-e11e-42fb-ac2e-533f2245b6cb/debugactor.png)

你可以在这里选择想调试的Actor。通过使用下拉菜单选择Actor，你可以在活动的"在编辑器中运行（PIE）"会话中查看Actor上的变形。选择Actor和世界之后，ML变形器编辑器的视口中的Actor将显示与PIE会话中相同的姿势。只有使用当前打开的ML变形器资产的Actor，才能进行调试。

项目经常会将多个动画混合在一起，并执行IK等程序化修改，调试可能很有用，因为在不调试时，你在ML变形器编辑器中只能使用单个动画序列进行测试。

你可以使用工具栏中的刷新按钮刷新可用于调试的Actor的列表。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a90f59d4-e38f-4b29-893d-213530f82b45/refresh.png)

#### 关键姿势提取工具

使用最近邻ML变形器模型时，你可以使用关键姿势提取工具，从你的角色的训练动画序列提取关键姿势数据，以及生成几何体缓存数据。做出属性调整后，使用窗口底部的 **提取（Extract）** 按钮开始操作。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95a20978-4f68-4e9d-89ca-1802b06cca46/image_2.png)

你可以参考下面的关键姿势提取工具属性及功能说明列表：

属性

说明

**最近邻模型资产（Nearest Neighbor Model Asset）**

查看用于群集的ML变形器资产。

**分段索引（Section Index）**

设置要用于生成群集姿势的经训练数据的分段。

**群集数量（Num Clusters）**

设置要生成的姿势群集的数量。

**提取几何体缓存（Extract Geometry Cache）**

启用后，关键姿势提取工具还将提取几何体缓存数据。

**输入（Inputs）**

设置数据，从以下选项提取关键姿势：

-   **姿势（Poses）**：设置要群集的姿势。
-   **缓存（Cache）**：设置每个姿势的几何体缓存。勾选"提取几何体缓存（Extract Geometry Cache）"时才需要此项。

缓存中的帧数必须匹配姿势中的关键帧数量

-   **必须包含帧（Must Include Frames）**：设置必须包含在最终输出中的帧。

**提取的姿势（Extracted Poses）**

你也可以在这里分配动画序列资产，以提取姿势群集。虽然你可以覆盖项目中的现有资产，但你还可以使用 **新姿势（New Poses）** 按钮创建新资产，以便保存你提取的姿势群集。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/245509dd-ae7b-4fd3-afff-7ec99d302cdb/newposes.png)

**提取的缓存（Extracted Cache）**

启用 **提取几何体缓存（Extract Geometry Cache）** 属性后，你可以在这里分配用于保存提取的几何体缓存数据保存到资产。虽然你可以覆盖项目中的现有资产，但你还可以使用 **新几何体缓存（New Geometry Cache）** 按钮创建新资产，以便保存你提取的几何体缓存数据。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a98306c-b448-4952-bc58-c1df69f9a700/newgeomcache.png)

#### 获取相邻统计数据

你可以使用"获取相邻统计数据（Get Neighbor Stats）"在角色的最近邻经训练ML变形器资产上生成数据。做出属性调整后，使用窗口底部的 **获取统计数据（Get Stats）** 按钮开始操作。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/588cd9ad-bc35-42da-b366-8e643c79ee9e/image_3.png)

你可以参考下面的获取相邻统计数据工具属性及功能说明列表：

属性

说明

**最近邻模型资产（Nearest Neighbor Model Asset）**

查看用于计算统计数据的ML变形器资产。

**测试动画（Test Anim）**

你可以在这里选择想为其生成相邻统计数据的动画序列资产。你可以使用资产选择下拉菜单从项目选择资产。

**分段索引（Section Index）**

为你想取样的动画序列资产分段设置分段索引值。

### 可视化面板

你可以参考下面的ML变形器编辑器可视化面板属性及功能说明列表：

属性

说明

**绘制标签（Draw Labels）**

启用后，将在ML变形器编辑器的视口中渲染一个标签，其文本为线性蒙皮网格体、动画序列（ **绿色** ）、ML变形网格体（ **红色** ）、比较Actor（ **黄色** ）和基准网格体或几何体缓存资产（ **蓝色** ）。

**标签高度（Label Height）**

设置调试标签的绘制高度，以 **厘米** （ **cm** ）为单位。

**标签比例（Label Scale）**

设置调试标签的绘制比例。

**网格体间距（Mesh Spacing）**

设置视口中网格体之间的间距，以 **虚幻单位** 计。

**测试动画序列（Test Anim Sequence）**

设置将在视口中的骨架网格体上播放的动画序列资产。使用此属性设置不同于你的训练动画序列的动画序列，了解ML变形器在播放期间的表现情况。

此属性仅在ML变形器编辑器设置为 **测试（Testing）** 模式时影响视口网格体。

**变形器图表（Deformer Graph）**

设置要在ML变形器编辑器的变形测试Actor上使用的变形器图表资产。变形器图表资产在基于图表的系统中定义变形器，可以在运行时执行的操作包括执行蒙皮、变形以及重新计算法线。你可以在这里设置你打算在运行时用于角色以观察结果的变形器图表资产。如果想在运行时在你的项目中将变形器图表与此ML变形器资产组合使用，你还需要在骨骼网格体组件的"网格体变形器（Mesh Deformer）"属性中指定变形器图表资产。在ML变形器资产可视化设置中，若更改变形器资产，不会自动将其添加到你的骨骼网格体组件。

使用神经变形ML变形器模型时，将使用变形器图表的 **Morph Target** 节点输出模型的增量。如需详细了解变形器图表和变形器图表节点，请参阅[变形器图表](/documentation/zh-cn/unreal-engine/deformer-graph-in-unreal-engine)文档。

**基准（Ground Truth）**

设置将用于显示 **测试动画序列** 的 **基准** 网格体的几何体缓存资产。请务必确保你的测试动画序列和基准有相同的动画、帧数和帧率。

**比较Actor（Compare Actors）**

你可以在这里将比较Actor添加到视口中ML变形器编辑器的调试绘图。要添加比较Actor，请使用（ **+** ） **添加（Add）** ，然后从资产选择下拉菜单选择ML变形器资产。默认情况下，名称属性将填入分配的ML变形器资产的名称，但你可以在属性的字段中手动分配名称。

**权重（Weight）**

设置视口中ML变形网格体上应用的网格体变形增量的比例系数。值为 `0.0` 时会渲染与线性蒙皮网格体相同的网格体变形，而值为 `1.0` 时会渲染完整ML变形器网格体变形校正。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2a16810-6f2a-41ac-b406-47cae04f3bac/weight.gif)

**动画播放速度（Anim Play Speed）**

设置视口中测试动画序列的播放速度。使用值 `1.0` 可使用动画的默认播放速度。

**训练帧数（Training Frame Number）**

你可以在这里手动设置 **训练动画序列（Training Anim Sequence）** 的播放帧数。在序列播放功能按钮中播放或拖曳动画时，此值将自动更新。

只有当ML变形器编辑器的模式为 **训练（Training）** 时，才能访问此值。

**测试帧数（Testing Frame Number）**

你可以在这里手动设置测试动画序列的播放帧数。在序列播放功能按钮中播放或拖动动画时，此值将自动更新。

**绘制增量（Draw Deltas）**

启用后，将在视口中渲染线性蒙皮网格体和基准网格体之间的顶点增量值的调试视图。

此属性仅在ML变形器编辑器的模式为 **训练（Training）** 时可访问。

**X光增量（XRay Deltas）**

启用 **绘制增量（Draw Deltas）** 属性后，你可以切换顶点增量调试绘图是否还应该显示通常被网格体遮挡的增量。

此属性仅在ML变形器编辑器的模式为 **训练（Training）** 时可访问。

**显示热图（Show Heat Map）**

启用后，将在视口中的ML变形网格体上渲染线性蒙皮网格体与ML变形器校正结果之间的更改增量。颜色越冷表示值越小，而颜色越暖表示值越大。灰色表示不存在值。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e49efea5-0f24-44a7-91d3-75f1c74b1f1e/heat.png)

**热图模式（Heat Map Mode）**

你可以在这里设置热图的模式，以观察不同的数据。你可以在下拉菜单中选择以下模式：

-   **激活（Activations）** 将直观地显示ML变形器应用校正的区域，颜色 **越冷** 表示校正越少，而的颜色 **越暖** 表示网格体的更改更多。灰色表示没有做出更改。
-   **基准（Ground Truth）** 可直观地显示基准网格体和ML变形网格体之间的误差。此模式需要在 **基准（Ground Truth）** 属性中设置几何体缓存资产。颜色 **越冷** 表示误差越小，而颜色 **越暖** 表示误差越大。**灰色** 表示没有误差。

**热图最大值（Heat Map Max）**

你可以在这里设置将表示热图中最暖颜色的值，以厘米为单位。这将取决于你的项目为何要使用ML变形器，以及你打算向骨骼网格体角色应用多少误差或校正。例如，使用激活热图模式时，值 `3.0` 会导致热图上的红色表示向ML变形网格体应用 `3.0` cm或更高的校正。使用基准热图模式时，值 `3.0` 会导致红色表示基准网格体和ML变形网格体之间的误差为3cm或更高。

**基准插值（Ground Truth Lerp）**

设置使用热图时来自ML变形网格体或基准网格体的插值因子或影响力。例如，值 `0.0` 将完全偏向ML变形网格体，而值 `1.0` 将完全偏向基准网格体。使用介于中间的值时，你可以设置热图以考虑两者的影响。

**绘制变形目标（Draw Morph Targets）**

训练你的ML变形器模型之后，你可以启用此属性，在视口中查看骨骼网格体的变形目标的调试绘图。此属性有助于观察生成的变形目标有多稀疏。

此属性只能在训练ML变形器模型后使用，训练之后直接在同一个编辑器会话中使用，或在你打开了已经训练的ML变形器资产时使用。

**变形目标数量（Morph Target Number）**

你可以在这里设置将在视口中渲染的已生成变形目标的索引值。

此属性只能在训练ML变形器模型之后使用，训练之后直接在同一个编辑器会话中使用。

**活动变形数量（Num Active Morphs）**

你可以在此参考每个ML变形器LOD针对你的角色生成的活动变形目标数量。

**在PIE中高亮显示调试Actor（Highlight Debug Actors in PIE）** （ **在编辑器中运行（Play in Editor）** ）

启用后，将在视口中渲染Actor的边界的调试绘图。即使启用，此调试绘图也仅会在活动PIE会话期间渲染。

**调试边界颜色（Debug Bounds Color）**

启用"在PIE中高亮显示调试Actor"属性后，你可以在这里设置调试绘图的颜色。

**绘制线性蒙皮Actor（Draw Linear Skinned Actor）**

启用后，线性蒙皮网格体将在视口中可见。

**绘制ML变形Actor（Draw ML Deformed Actor）**

启用后，ML变形网格体将在视口中可见。

**绘制基准Actor（Draw Ground Truth Actor）**

启用后，基准网格体将在视口中可见。

**绘制ML比较Actor（Draw ML Compare Actors）**

启用后，所有ML比较网格体将在视口中可见。

此属性只有在 **比较Actor（Compare Actors）** 属性中添加和设置了ML变形器资产之后才能访问。

**遮罩可视化模式（Mask Viz Mode）**

你可以在这里为你的网格体遮罩设置可视化模式。每个骨骼、曲线、骨骼组和曲线组在网格体上都有特定遮罩区域。此遮罩定义了可以激活生成的变形目标的区域。它们可用于在不适合的区域中筛选掉变形。例如，如果你旋转左臂，又不希望右臂变形，可以相应设置左臂的遮罩，使其仅包括左臂区域周围的顶点，以强制实施这一点。

你可以使用属性的下拉菜单选择遮罩可视化模式。可选的模式有：

-   **关闭（Off）** ：完全禁用遮罩可视化。
-   **聚焦时（When in Focus）** ：仅当UI右侧的输入控件被聚焦时才在视口内显示遮罩。此时将显示所选项目（骨骼、曲线、骨骼组、曲线组）的遮罩。
-   **始终（Always）** ：始终显示选定遮罩。选定的遮罩由UI右侧的输入控件中选定的内容定义。

**CPU性能（CPU Performance）**

你可以在此参考可以参考CPU上ML Deformer组件更新花费的平均、最小和最大时间，时间在过去100帧内对你的模型测量，以微秒（µs）为单位。

**估算内存使用量（Estimated Memory Usage）**

你可以在此参考模型的主系统内存和特定于GPU的内存使用量，以 **兆字节** （ **mb** ）为单位。

使用神经变形模型时，主系统内存使用量主要包含神经网络。**每层的神经元数量（Num Neurons Per Layer）** 、 **隐藏的层数（Num Hidden Layers）** 和 **变形目标数量（Num Morph Targets）** 之类的属性会影响此值。将模型的 **模式（Mode）** 设置为 **全局（Global）** 还将使用更多系统内存。

GPU内存主要由系统生成的压缩变形目标使用。**变形目标数量（Num Morph Targets）** 、 **增量零阈值（Delta Zero Threshold）** 、 **压缩级别（Compression Level）** 、 **迭代次数（Num Iterations）** 和 **最大LOD数量（Max Number of LODs）** 之类的属性将影响此值。

**估算资产大小（Estimated Asset Sizes）**

你可以在此参考模型的估算烘焙和未烘焙大小，以 **兆字节** （ **mb** ）为单位。

模型的估算未烘焙大小将比烘焙模型大得多，因为此估算包括未压缩的顶点增量。

### 细节面板

下表列出了各个ML变形器模型中显示的通用ML变形器编辑器 **细节（Details）** 面板属性及功能说明。细节面板包含在运行时影响模型的设置。这包括输入、训练设置和压缩设置。

属性

说明

骨骼网格体（Skeletal Mesh）

为你所训练的角色设置线性蒙皮骨骼网格体资产。

更改此属性后，模型就需要重新训练。

训练输入动画（Training Input Anims）

设置将用于训练所选ML变形器模型的训练输入列表。每个列表应该包含一对包含网格体姿势的动画序列，以及包含网格体变形数据的几何体缓存资产。每对资产都应该按相同帧率运行，并包含相同帧数，其中每个资产的每个帧包含相同姿势。每个资产的网格体还应该包含相同数量的顶点。

可以使用仅包含一部分骨骼网格体的几何体缓存来训练模型，例如，你可能只想针对躯干而不是头部训练网格体变形。

要创建新的输入索引，请使用（ **+** ） **添加（Add）** 。创建 **输入（Input）** 索引后，你可以扩展每个索引的设置以访问以下属性：

-   **动画序列（Anim Sequence）** ：设置将用于对网格体姿势取样，以训练所选ML变形器模型的动画序列资产。此序列可以包含随机姿势，或特定训练序列。如果动画序列包含动画曲线，并且这些曲线作为网络输入提供，则会在训练期间提取它们。
-   **几何体缓存** ：设置包含目标高质量网格体变形的几何体缓存资产，这些变形将用于训练所选ML变形器模型。几何体缓存资产应该在每个帧上包含与此训练输入索引中定义的动画序列相同的帧率、帧数和姿势。几何体缓存资产可以包含比骨骼网格体更少的网格体，例如，你可能只想训练角色的躯干变形而不是头部变形。
-   **使用自定义范围（Use Custom Range）** ：启用后，你可以从分配的动画序列和几何体缓存资产设置自定义帧范围。
-   **开始帧（Start Frame）** ：启用"使用自定义范围"属性时，为所需自定义范围设置开始帧。
-   **结束帧（End Frame）** ：启用"使用自定义范围"属性时，为所需自定义范围设置结束帧。
-   **启用（Enabled）** ：启用后，此属性将在训练过程中包含此索引。使用此属性，你可以添加多个训练输入动画索引，并切换将哪些用于特定用例或使用不同数据测试结果。

需要至少一个训练输入索引才能训练ML变形器模型。当你注意到特定姿势未恰当变形时，你可以添加额外的训练输入，进一步改进你的网格体变形结果。额外的数据，包含这些姿势的针对性数据，可以改善你的结果。

更改此属性后，模型就需要重新训练。

目标对齐变换（Target Alignment Transform）

你可以在这里设置变形值，使用骨骼网格体调整几何体缓存的定位。如果你注意到几何体缓存资产未与你的动画序列姿势正确对齐，请使用此属性。如果你的几何体缓存网格体的顶点未与你的动画序列网格体的顶点重叠，推荐使用此属性应用缩放和旋转调整。训练过程的目标是在发生变形时计算网格体上每个顶点之间的距离，因此要获得良好的结果，正确对齐顶点至关重要。请记住，可视化细节面板中的网格体间距设置仍会将线性蒙皮网格体与你的几何体缓存分开。确保在网格体间距设置为 `0` 时，网格体重叠并具有相同的比例和方向。

更改此属性后，模型就需要重新训练。

网络输入（Network Inputs）

你可以在这里设置在训练ML变形器模型时将考虑的骨骼和曲线。要从你的角色的骨骼网格体资产添加骨骼或曲线，请使用（ **+** ） **添加（Add）** 并选择 **添加骨骼（Add Bone）** 或 **添加曲线（Add Curve）**，以添加单个骨骼或曲线，或选择 **添加所有动画骨骼（Add All Animated Bones）** 或 **添加所有动画曲线（Add All Animated Curves）**，以导入你的角色的所有可用动画骨骼或曲线。最好首先添加所有动画骨骼或曲线，然后通过删除辅助骨骼等方式进行修剪。

添加的骨骼将用于定义角色的姿势。模型会在每个姿势期间将骨骼的方向与模型将输出的校正性变形关联起来。推荐设置尽可能少的骨骼，同时仍捕获角色的所有必要移动，以实现最佳结果，例如，你应该排除所有辅助骨骼。使用 **Add All Animated Bones** 函数时，编辑器会自动将所有骨骼添加到包含动画数据的列表。此过程可以向你之后很可能想删除的骨骼添加扭转。

如果你使用神经变形模型并将模式设置为局部，在将骨骼添加到列表之后，你可以右键点击所选骨骼并选择 **编辑骨骼遮罩（Edit Bone Mask）** 选项以打开一个窗口，你可以在其中编辑该骨骼是否应该包含在骨骼遮罩中。默认情况下，所有蒙皮到骨骼遮罩内的骨骼的顶点都包含在骨骼遮罩中。编辑骨骼遮罩中的骨骼后，你可以在骨骼列表中右键点击，选择 **重置所有骨骼遮罩（Reset All Bone Masks）** 选项，将所有骨骼遮罩恢复为其默认设置。

添加的曲线可以用于影响使用Alpha值的模型，因为这类值可以表示许多事项（例如权重、Alpha、面部控制或肌肉激活）。使用 **添加所有动画曲线（Add All Animated Curves）** 选项将添加动画序列资产中包含的具有动画值变化的所有曲线。

要从列表删除单独的骨骼或曲线，你可以选择相应项目，右键点击并选择 **删除选定项（Delete Selected）** 。你还可以右键点击列表，选择 **清除列表（Clear List）** 选项，从而完全清除骨骼列表或曲线列表。

更改此属性后，模型就需要重新训练。

最大训练帧数（Max Training Frames）

设置在训练模型时输入属性中分配的资产中要使用的最大帧数。通过减少此数量，你可以使用更小的训练数据片段来训练模型。将在输入动画之间交替取样。它将对第一个启用的帧取样，然后是下一个，以此类推，直至达到最大训练帧数或没有剩余可取样的帧为止。

更改此属性后，模型就需要重新训练。

增量截止长度（Delta Cutoff Lengths）

设置在训练期间将考虑的增量值的最大长度。所有超过指定数量的增量值将被忽略，并设置为零长度。此属性有助于减少非常长的增量值带来的问题。当ML变形器编辑器的模式设置为 **训练（Training）** 时，你可以启用可视化面板的 **绘制增量（Draw Deltas）** 属性，在视口中查看增量长度的调试渲染。

更改此属性后，模型就需要重新训练。

批处理大小（Batch Size）

设置在训练ML变形器模型时每个批处理的帧数。值越高，在训练期间使用的GPU内存就越多，但训练过程所用的时间会减少。批处理大小也可能会影响结果的质量。迭代数量与批处理大小相结合会影响质量。如果你将批处理大小减半，就需要将迭代次数加倍，才能获得相同的质量。

更改此属性后，模型就需要重新训练。

学习速率（Learning Rate）

在ML变形器模型训练期间设置优化过程中的初始步进大小。值越大，在训练期间交付结果的速度就越快，但可能会忽视关键数据，使得结果欠佳。值越小，交付的结果质量就越高，但训练所需的时间可能无限长。所以要找到一个最优值，既能在训练过程中捕获足够多的数据，又无需超长的训练时间。推荐从较大的值开始，然后逐渐将值降低，直至根据项目的需要达到可接受的损失级别。每个ML变形器模型将交付不同的结果，即使使用相同的值也是如此，因此推荐以不同的方式处理每个模型。

更改此属性后，模型就需要重新训练。

最大LOD数量（Max Number of LODs）

设置应该用于生成ML变形器LOD的最大骨骼网格体LOD级别数量。值为 `1` 时，将仅在最高质量（LOD0）的骨骼网格体上允许ML变形器。

ML变形器将仅为可用的骨骼网格体LOD生成ML变形器LOD，因此，如果此属性的值为 `100` ，但骨骼网格体资产仅包含4个LOD，则只会创建4个ML变形器LOD。

## ML变形器模型

ML变形器框架依赖经过训练的ML变形器模型在运行时驱动蒙皮网格体变形选择。每个模型适合特定的用例。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0043afa4-a6a2-41d9-b477-f13d2e07ab75/image_4.png)

### 最近邻模型

最近邻值模型最适合服装等复杂网格体和对象的变形。此模型还被视为处于开发的试验性阶段，因此我们建议你不要将其用于依赖其功能和稳定性的生产中。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7f193a2-1f3e-46b6-9ea1-3b6342b2fac3/image_5.png)

#### 参考

你可以参考下面的最近邻模型的特定属性及功能说明列表：

属性

说明

**导入维度（Import Dim）**

设置网络输入维度。

**隐藏的层维度（Hidden Layers Dim）**

设置网络中隐藏的层的维度。要设置隐藏的层，请使用"（+）添加"，然后将索引的值设置为你想隐藏的层的值。

此属性不能留空。

**输出维度（Output Dim）**

设置网络输出维度。

**时期数（Num Epochs）**

设置在训练集内迭代的最大周期数。

**提早停止时期（Early Stop Epochs）**

设置在准确性没有提高时停止训练的时期数。

**包括法线（Include Normals）**

启用后，模型将在训练过程中包括变形目标中的法线。若启用此属性，实现的性能有可能比重新计算法线更高，但对于已存储的变形目标而言，网格体变形质量可能变低，而且内存开销可能增加。

**增量零阈值（Delta Zero Threshold）**

你可以在这里设置一个值，从而确定变形目标增量值的截止。小于或等于此阈值的增量值将被忽略，并设置为 `0.0` 。此属性适合用于从变形目标删除较小的增量，这将降低运行时的内存使用量。但是，如果将此值设置得太高，也可能为你的结果带来视觉瑕疵。值 `0.0` 将导致生成最高质量的变形目标，代价是更高的运行时内存使用量。

在使用ML Deformer assets时，为这个属性设置一个函数值将对项目的运行时性能和内存产生十分显著的影响。

**压缩级别（Compression Level）**

设置生成的变形目标的压缩级别。值越高，应用的压缩就更多，但可能导致网格体上的视觉瑕疵。值越低，应用的压缩就越少，这会带来高质量的结果，但需要更多内存使用量。推荐使用介于 `20.0` 到 200.0\` 之间的值，以获得最优结果。

建议先为你的项目设置充足的 **增量零阈值（Delta Zero Threshold）** 属性，然后再调整 **压缩级别（Compression Level）** 属性。

**遮罩通道（Mask Channel）**

设置表示增量遮罩乘数的通道数据。你可以使用此属性在特定区域中细分并分发对ML变形器的影响，例如定位高动作关节接缝，例如角色的颈部或肩部。绘制的顶点颜色值将像应用于该顶点的ML变形器增量上的权重乘数那样使用。你可以使用属性的下拉菜单选择遮罩通道。你可以在以下通道中选择：

-   **顶点颜色红色（Vertex Color Red）** ：使用红色顶点颜色遮罩通道。
-   **顶点颜色蓝色（Vertex Color Blue）** ：使用蓝色顶点颜色遮罩通道。
-   **顶点颜色绿色（Vertex Color Green）** ：使用绿色顶点颜色遮罩通道。
-   **顶点颜色Alpha（Vertex Color Alpha）** ：使用Alpha顶点颜色遮罩通道。

此属性适合定位网格体的特定区域的训练过程，以便你使用特别设置改进其变形，不适用于使用相同设置训练整个网格体的情况。

**反转遮罩通道（Invert Mask Channel）**

**遮罩通道（Mask Channel）** 属性设置为使用特定顶点颜色遮罩通道时，你可以启用此属性以反转影响。例如，如果你使用红色顶点颜色遮罩绘制网格体的区域，然后将 **遮罩通道（Mask Channel）** 设置为使用 **顶点颜色红色（Vertex Color Red）** ，并启用此属性，则绘制的区域不会移动。

**使用双四元数增量（Use Dual Quaternion Deltas）**

启用后，ML变形器模型将使用双四元数增量值。默认情况下，模型将使用LBS增量值。

**衰减因子（Decay Factors）**

设置之前帧的增量中添加到当前帧的增量中的比率。值越大，网格体中的褶皱粘在一起的时间会更久。

**最近邻偏移权重（Nearest Neighbor Offset Weight）**

设置乘到最近邻增量的权重。值为 `0.0` 时将完全删除最近邻增量，而值为 `1.0` 时将完全对最近邻增量加权。

**使用RBF（Use RBF）**

启用后，ML变形器将使用径向基函数混合多个最近邻，生成更平滑的结果。

**RBFSigma**

启用 **使用RBF（Use RBF）** 属性后，设置要混合的最近邻的范围，以点为单位。值越大，结果越平滑，但可能导致你的项目的性能降低。

**分段（Sections）**

你可以在这里添加分段，为你的角色的单独网格体组件细分最近邻模型的训练过程。每个分段包含一组原始骨骼网格体中的顶点。接着会在每个分段上单独执行最近邻搜索。例如，如果一个角色资产同时有衬衫和裤子网格体，你可以将每个网格体定义为单独的分段，以便在每个网格体上单独执行最近邻训练。你可以使用（ **+** ） **添加（Add）** 添加分段索引，然后展开分段属性，访问以下设置：

-   **PCA系数数量（Num PCACoeffs）** ：设置此分段的 **PCA** （主成分分析）系数的数量。
-   **权重贴图创建方法（Weight Map Creation Method）** ：设置为此分段创建权重贴图的方法。你可以选择 **从文本（From Text）** ，以使用 **顶点索引（Vertex Indices）** 属性包括权重为 `1` 的文本中的所有顶点，选择 **选定骨骼（Selected Bones）** ，以使用选定骨骼属性使用选定骨骼中的蒙皮权重，或选择顶点属性，以使用 **属性名称（Attribute Name）** 属性来使用顶点属性集中的权重。
-   **顶点索引（Vertex Indices）** ：**权重贴图创建方法（Weight Map Creation Method）** 设置为 **从文本（From Text）** 时，你可以使用下拉菜单选择你想用于创建权重贴图的、表示顶点索引的字符串值。
-   **选定骨骼（Selected Bones）** ：**权重贴图创建方法（Weight Map Creation Method）** 设置为 **选定骨骼（Selected Bones）** 时，你可以使用 **选择骨骼（Select Bones）** 按钮，从你的角色骨架中选择要用于创建权重贴图的骨骼。你还可以使用 **创建属性（Create Attributes）** 按钮打开对话框，你在其中命名并创建将在创建新权重贴图时用于选定骨骼的新 **顶点属性（Vertex Attribute）** 。
-   **相邻姿势（Neighbor Poses）** ：使用资产选择下拉菜单，设置包含最近邻ROM的姿势的动画序列资产。
-   **相邻网格体（Neighbor Meshes）** ：使用资产选择下拉菜单，设置包含最近邻ROM的几何体缓存资产。
-   **排除的帧（Excluded Frames）** ：使用（ **+** ） **添加（Add）** 设置要从最近邻ROM排除的帧的数组。

**网络状态（Network State）**

你可以在此参考网络状态。

**网络架构（Network Architecture）**

你可以在此参考网络架构状态。

**变形目标状态（Morph Target State）**

你可以在此参考变形目标状态。

**推断状态（Inference State）**

你可以在此参考推断状态。

**使用文件缓存（Use File Cache）** （ **高级（Advanced）** ）

启用后，ML变形器将在计算机的硬盘上缓存中间结果。

如果不手动清除缓存，可能导致意外结果。

**文件缓存目录（File Cache Directory）**

设置文件路径，以便在计算机硬盘上保存中间缓存结果。要刷新保存的数据的列表，请使用此属性分段底部的"刷新（Refresh）"按钮。

**缓存增量（Cached Deltas）**

你可以在此参考保存的中间缓存增量。你可以使用 **删除（Delete）** 按钮清除此数据。

**缓存PCA（Cached PCA）**

你可以在此参考保存的中间缓存PCA（主成分分析）数据。你可以使用 **删除（Delete）** 按钮清除此数据。

**缓存网络（Cached Network）**

你可以在此参考保存的中间缓存网络数据。你可以使用 **删除（Delete）** 按钮清除此数据。

**使用输入乘数（Use Input Multipliers）**

启用后，ML变形器将使用输入乘数。此属性适合用于调试不良网络输入。

**输入乘数（Input Multipliers）**

启用 **使用输入乘数（Use Input Multipliers）** 属性后，你可以设置要应用的输入乘数。要创建新的输入乘数，请使用（ **+** ） **添加（Add）** ，然后设置修饰符值。

### 神经变形模型

神经变形模型是一种通用ML变形器模型，其最适合角色模型的变形，例如针对皮肤和肌肉移动带动肢体和更大形体动作进行计算。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5470cf2b-72c4-494c-acc6-627a7deea44c/image_6.png)

#### 属性参考

你可以参考下面的神经变形模型特定属性及功能说明列表：

属性

说明

**模式（Mode）**

设置ML变形器的神经网络运行时将采用的模式。可用的选项有：

-   **局部（Local）** ：对每个骨骼使用一个局部神经网络来运行。此模式在运行时的性能更高，但变形质量可能更低。

此模式经过优化，可学习单独关节周围的变形，并且需要的训练数据量最少。此模式还会生成更稀疏的变形目标，这会减少内存使用量，并可以在GPU上更快处理。使用局部模式，CPU性能也会更快，因为对骨骼的求值被细分为多个更小的部分，而不是同时对整个骨架求值。

除非你在重新构造训练数据时遇到困难，否则应该默认使用此选项。每根骨骼或曲线将在此模型中创建一组变形目标。生成的变形目标总数将为：

`(num_bones + num_bone_groups) * num_morphs_per_bone_or_curve + (num_curves + num_curve_groups) * num_morphs_per_bone_or_curve + 1`

结尾的 `+ 1` 就是一个始终会创建的变形目标，并用于数据规格化。它始终是生成的变形目标列表中的第一个变形目标。 局部模式处理结构化数据（例如结构化ROM）的效果比 **全局（Global）** 模式更好。

-   **全局（Global）** ：使用将所有骨骼一起考虑的全局网络运行。此模式在运行时的性能更低，但可以提供更高质量的网格体变形。

此模式从多个关节的协调移动中学习变形，但需要更多训练数据。此模式的行为类似于局部模式，但将所有骨骼视为一个大的骨骼组来处理。这在以随机化姿势为训练数据时效果最佳。

更改此属性后，模型就需要重新训练。

**变形目标数量（Num Morph Targets）**

此值表示在训练数据期间将为你的网格体生成多少变形目标。值越高，生成的结果质量就越高，但需要更多的内存和更高的性能。推荐你尽量将此值设置为可能的最低值，同时仍保留变形的质量。

模式设置为 **局部（Local）** 时，此值表示将为每个骨骼、曲线、骨骼组和曲线组生成的变形目标的数量。使用局部模式时，推荐输入尽可能最低的值，同时仍保留你的预期质量。推荐将此值设为介于 `4` 到 `12` 之间，但可以根据项目需要而定。

模式设置为 **全局（Global）** 时，此值表示将为你的网格体生成的变形目标的总数。推荐将此值设为介于 `64` 到 `256` 之间，但可以根据项目需要而定。

更改此属性后，模型就需要重新训练。

**迭代数量（Num Iterations）**

设置要用来训练模型的迭代次数。对于测试用途和开发中的项目，低值（例如 `1000` - `3000` ）将带来可用的结果。对于最终资产生成，高值（例如 `100000` - `1000000` ）将生成更高质量的结果。

当你观察到损失不继续降低时，更多迭代很可能不会继续改进结果。

更改此属性后，模型就需要重新训练。

**隐藏层数量（Num Hidden Layers）**

设置神经网络模型将拥有的隐藏层数。值越高，项目的性能就越低，但可用于更复杂的网格体变形。使用局部模式时，值 `1` 通常已足够。使用全局模式时， `1` 到 `3` 之间的值通常可在性能和优质结果之间取得最佳平衡。

更改此属性后，模型就需要重新训练。

**每层神经元数量（Num Neurons Per Layer）**

设置每个隐藏层每个神经元的单位数量。数量越多，性能就越低，但可实现更复杂的网格体变形。

更改此属性后，模型就需要重新训练。

**正则化因子（Regularization Factor）**

设置训练数据的正则化因子，其有助于使模型更通用。值越高，还会导致变形目标越稀疏，这可能降低GPU内存使用量并提高GPU性能。此属性的默认值是 `1.0` ，如果这不能带来良好的结果，请尝试使用 `0.0` 禁用此属性，然后逐渐将值调高，直至找到可带来良好结果的最小值。

此属性及其效果取决于模型的比例。

更改此属性后，模型就需要重新训练。

**平滑损失Beta（Smoothing Loss Beta）**

在平滑L1损失函数中设置Beta参数。此属性根据网格体的比例，使生成的变形的结果更平滑。值越低，应用的平滑就越少。对于正常大小的角色网格体，值 `1.0` 比较典型，而在较小的网格体上，较低的值将提供更好的结果。值为 `0.0` 时将完全禁用平滑损失。

如果误差高于或等于此Beta值，它将改用L1损失函数。

更改此属性后，模型就需要重新训练。

**启用骨骼遮罩（Enable Bone Masks）**

模式属性设置为局部时，若启用此属性，将通过基于蒙皮信息生成每个骨骼的影响遮罩，允许使用每个骨骼和骨骼组遮罩。这将强制使变形局部化到关节周围的区域。启用此属性可提高局部化关节变形质量，并可以降低GPU内存使用量，提高GPU性能。

更改此属性后，模型就需要重新训练。

**限制变形权重（Clamp Morph Weights）**

启用后，生成的变形目标权重将被限制为训练期间可见的范围。当角色摆出在训练期间不可见的姿势，并且在训练数据中没有近似参考姿势时，此属性可以强制变形目标权重保持在训练期间可见的值范围内，防止怪异变形，改进变形结果。

**包括法线（Include Normals）**

启用后，模型将在训练过程中包括变形目标中的法线。若启用此属性，实现的性能有可能比重新计算法线更高，但对于已存储的变形目标而言，网格体变形质量可能变低，而且内存开销可能增加。

**增量零阈值（Delta Zero Threshold）**

你可以在这里设置一个值，从而确定变形目标增量值的截止。小于或等于此阈值的增量值将被忽略，并设置为 `0.0` 。此属性适合用于从变形目标删除较小的增量，这将降低运行时的内存使用量。但是，如果将此值设置得太高，也可能为你的结果带来视觉瑕疵。值 `0.0` 将导致生成最高质量的变形目标，代价是更高的运行时内存使用量。

在使用ML Deformer assets时，为这个属性设置一个函数值将对项目的运行时性能和内存产生十分显著的影响。

**压缩级别（Compression Level）**

设置生成的变形目标的压缩级别。值越高，应用的压缩就更多，但可能导致网格体上的视觉瑕疵。值越低，应用的压缩就越少，这会带来高质量的结果，但需要更多内存使用量。推荐使用介于 `20.0` 到 200.0\` 之间的值，以获得最优结果。

建议先为你的项目设置充足的 **增量零阈值（Delta Zero Threshold）** 属性，然后再调整 **压缩级别（Compression Level）** 属性。

**遮罩通道（Mask Channel）**

设置表示增量遮罩乘数的通道数据。你可以使用此属性在特定区域中细分并分发对ML变形器的影响，例如定位高动作关节接缝，例如角色的颈部或肩部。绘制的顶点颜色值将像应用于该顶点的ML变形器增量上的权重乘数那样使用。你可以使用属性的下拉菜单选择遮罩通道。你可以在以下通道中选择：

-   **顶点颜色红色（Vertex Color Red）** ：使用红色顶点颜色遮罩通道。
-   **顶点颜色蓝色（Vertex Color Blue）** ：使用蓝色顶点颜色遮罩通道。
-   **顶点颜色绿色（Vertex Color Green）** ：使用绿色顶点颜色遮罩通道。
-   **顶点颜色Alpha（Vertex Color Alpha）** ：使用Alpha顶点颜色遮罩通道。

此属性适合定位网格体的特定区域的训练过程，以便你使用特别设置改进其变形，不适用于使用相同设置训练整个网格体的情况。

**反转遮罩通道（Invert Mask Channel）**

**遮罩通道（Mask Channel）** 属性设置为使用特定顶点颜色遮罩通道时，你可以启用此属性以反转影响。例如，如果你使用红色顶点颜色遮罩绘制网格体的区域，然后将 **遮罩通道（Mask Channel）** 设置为使用 **顶点颜色红色（Vertex Color Red）** ，并启用此属性，则绘制的区域不会移动。

### 顶点增量

顶点增量模型是完全基于GPU的变形器示例。它是全局模式中神经变形模型的简化实现，但完全在GPU上运行。它不使用引擎变形目标，但因此也不使用压缩和其他优化，所以更缓慢、耗费更多内存。它不应该在生产中使用，只能作为在GPU上运行其神经网络的模型的参考。

注意：顶点增量ML变形器模型是基于GPU的示例模型，不应该用于生产。使用将 **模式（Mode）** 属性设置为 `全局（Global）` 的神经变形模型，可在生产中实现类似的更稳定的结果。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59f4e775-562d-4a5c-8c5b-5321bca688a8/image_7.png)

## 调试ML变形器

你可以参考下面关于对虚幻引擎中的ML变形器结果和性能进行调试和故障排除的信息。

### 调试Actor

训练之后，你可以在角色上播放动画序列来测试模型。这样你可以测试变形在可能与训练数据稍有不同的姿势上的外观。

当指定的输入与训练期间使用的值截然不同时，ML变形器可能会生成很差的结果。正因为如此，你的训练数据需要涵盖广泛的姿势。

在实际项目中，姿势通常会使用多个源混合，而不是播放单个动画。在姿势混合的基础上，你可以使用程序化修改，并执行逆向运动学（IK）等操作。因此，除非你捕获了一些游戏输出，否则使用单个动画测试可能效果不会太好。

使用ML变形器编辑器中的Actor调试工具，你可以在项目的完整动画系统上查看你的ML变形器结果。通过连接到实时"在编辑器中运行（PIE）"会话，选取具有ML变形器组件的角色，且该组件使用了你当前打开的ML变形器资产，ML变形器编辑器将在PIE会话内复制角色的姿势，并在ML变形器编辑器的视口内应用变形。

要开始在ML变形器编辑器中调试PIE Actor，请在内容浏览器中双击打开你想调试的角色正在使用的ML变形器资产。然后点击PIE功能按钮中的播放按钮，开始你的PIE会话。

会话开始后，点击你的ML变形器编辑器选项卡。然后，你应该就能在PIE视口内看到所有可调试的Actor，其周围渲染了边界框。默认情况下，此边界框是紫色的，Actor的名称显示为白色。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de83dfd0-db3c-492e-844d-b4d70d17f6fb/image_8.png)

现在，在ML变形器资产编辑器内，使用工具栏中的 **调试Actor（Debug Actor）** 工具下拉菜单选择Actor组合。这将显示一系列使用此ML变形器资产的Actor。如果你的Actor不在该列表中，请使用下拉菜单旁边的右侧 **刷新（Refresh）** 按钮。然后选取你想调试的Actor。或者，你也可以按 **F8** 键刷新列表。所选Actor将在项目的关卡视口中高亮显示，默认带有绿色框和黄色名称。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54b81cab-a19c-488c-a56b-a32ed1577830/image_9.png) ![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b968d481-4923-49f3-95e5-cc083670f59f/image_10.png)

现在你可以在PIE期间使用可视化面板中的属性（例如热图），通过角色的完整动画系统调试你的ML变形器的结果。

只有 **激活（Activations）** 的热图模式才会起作用，因为游戏内没有实时基准。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2e9b073-eefc-4289-ba5e-bf33415c4a34/image_11.png)

要结束调试会话，请停止你的PIE会话，或使用下拉菜单选择ML变形器 **调试Actor（Debug Actor）** 工具中的 **禁用调试（Disable Debugging）** 。

### Unreal Insights

你可以通过[Unreal Insights](https://docs.unrealengine.com/5.3/zh-CN/unreal-insights-in-unreal-engine/)使用录制的会话的GPU分段中的 **变形目标（Morph Target）** 项目检查你的ML变形器资产性能。要查看和调试CPU性能，请使用CPU分析器的 **MLDeformerComponent** 分段。你可以使用GPU信息中的 **变形目标（Morph Target）** 分段来查看GPU性能。

### 故障排除

在虚幻引擎中使用ML变形器时，你可能遇到性能问题，请阅读下文以了解故障排除方法。

#### 神经变形模型

问题

潜在解决方案

**变形结果不理想** ：

-   考虑增加训练数据的帧数。推荐至少将3000帧的训练数据用于普通角色，但帧越多变形结果越好。为获得良好的结果，推荐至少使用7500帧的训练数据。
-   对于你的项目而言，你的训练数据姿势覆盖的动作范围可能不够。推荐扩展训练数据中的角色动作，以覆盖你希望变形覆盖的所有动作。
-   确保你的训练数据动画序列和几何体缓存资产共有的网格体具有匹配的帧数、帧率播放、顶点数量，以及匹配的每帧姿势。
-   确保你的动画序列和几何体缓存资产网格体恰当对齐到准确捕获的顶点增量。通过多个帧在 **训练模式（Training Mode）** 中验证你的顶点增量。启用 **绘制增量（Draw Deltas）** 。
-   将 **权重（Weight）** 属性设置为 `1.0` ，并将 **基准插值（Ground Truth Lerp）** 设置为 `0.0`。
-   确保你的变形目标的法线是在运行时计算。要修复此问题，请使用变形器图表，或启用骨骼网格体资产的 **重新计算切线（Recompute Tangents）** 属性。
-   确保 **最大训练帧数（Max Num Training Frames）** 属性没有限制你的可用训练数据。
-   将 **迭代次数（Num Iterations）** 属性设置为较高的值，例如 `5000`。稍后可以根据需要降低此值。
-   你的ML变形器输入可能包含太多骨骼引用。将此值降低到不超过在训练期间捕获角色动作所需的最大动画骨骼数量。
-   使用 **局部（Local）** 模式时，你可能生成了太多变形目标或隐藏层，尝试降低这些值。
-   将 **批处理大小（Batch Size）** 属性设置为 `64` 或 `128` 。
-   设置值 `0.0` ，从而禁用 **平滑损失Beta（Smooth Loss Beta）** 或 **正则化因子（Regularization Factor）** 属性。如果这能解决问题，尝试使用比之前更小的值。推荐找出尽可能小的值，同时仍保留你的项目需要的质量级别。
-   将 **学习速率（Learning Rate）** 设置为 `0.001` 、 `0.0001` 或 `0.01` 。如果你要处理比普通角色网格体更小的网格体，例如面部，请尝试组合使用这些值来调整 **平滑损失Beta（Smooth Loss Beta）** 和 **正则化（Regularization）** 属性。

运行时内存或性能不理想：

如果你的GPU性能很低，尝试减少变形目标数量。推荐将整个角色的生成的变形目标总数保持在 `64` 到 `256` 之间。

使用 **局部（Local）** 模式时， **变形目标数量（Num Morph Targets）** 值是你设置的每个骨骼/曲线/组的值。

-   降低 **增量零阈值（Delta Zero Threshold）** 的值，从生成的变形目标挽救小增量值的数量。
-   增大 **迭代次数（Num Iterations）** 属性，创建更稀疏的变形目标。
-   增大 **正则化因子（Regularization Factor）** 属性。
-   使用 **全局（Global）** 模式时，尝试减小 **隐藏层数量（Num of Hidden Layers）** 属性。

## 更多信息

你可以参考下面的额外ML变形器资源（例如示例内容项目和开发者讲座），详细了解如何在虚幻引擎中使用ML变形器。

### ML变形器设置指南

要了解如何使用神经变形模型设置ML变形器，包括如何在Autodesk Maya中生成随机化姿势和几何体变形数据的Alembic文件，请参阅以下操作指南：

[](/documentation/zh-cn/unreal-engine/how-to-use-the-machine-learning-deformer-in-unreal-engine)

[![如何使用机器学习变形器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0a27ba1-186a-462c-a4ab-a5d1aabdc7ea/topicimage.png)](/documentation/zh-cn/unreal-engine/how-to-use-the-machine-learning-deformer-in-unreal-engine)

[如何使用机器学习变形器](/documentation/zh-cn/unreal-engine/how-to-use-the-machine-learning-deformer-in-unreal-engine)

[使用ML变形器为蒙皮角色训练机器学习网格体变形模型。](/documentation/zh-cn/unreal-engine/how-to-use-the-machine-learning-deformer-in-unreal-engine)

### ML变形器示例内容

此外，你还可以下载 **机器学习（Machine Learning）** （ **ML** ） **变形器示例项目（Deformer Sample Project）** ，其中使用ML变形器系统展示了全身角色网格体变形。示例项目包含[控制绑定](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)驱动的动画角色的交互式过场动画，你可以针对ML变形器生成的变形来观察和比较线性蒙皮网格体播放。此外，你还可以使用替代动画、 **控制绑定** 编辑以及通过切换服装和皮肤可视性来操控角色，并观察不同ML变形器模型的效果，以便观察对网格体的更改，并详细了解ML变形器系统和功能。

你可以从Fab下载[ML变形器示例项目](https://www.fab.com/listings/4c1f2eee-3004-4466-8c86-796e2e94d562)。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8567b19e-8be0-4d46-b49a-425eb584d24c/image_12.png)

### 游戏开发者大会ML变形器演示

要详细了解ML变形器系统并查看实时演示，展示ML变形器的能力和功能，请参阅[虚幻现状 | GDC 2023](https://www.youtube.com/live/teTroOAGZjM?feature=share&t=19000)谈话。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [machine learning](https://dev.epicgames.com/community/search?query=machine%20learning)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [ML变形器设置指南](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#ml%E5%8F%98%E5%BD%A2%E5%99%A8%E8%AE%BE%E7%BD%AE%E6%8C%87%E5%8D%97)
-   [ML变形器编辑器](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#ml%E5%8F%98%E5%BD%A2%E5%99%A8%E7%BC%96%E8%BE%91%E5%99%A8)
-   [工具栏](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [关键姿势提取工具](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E5%85%B3%E9%94%AE%E5%A7%BF%E5%8A%BF%E6%8F%90%E5%8F%96%E5%B7%A5%E5%85%B7)
-   [获取相邻统计数据](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E8%8E%B7%E5%8F%96%E7%9B%B8%E9%82%BB%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [可视化面板](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E5%8F%AF%E8%A7%86%E5%8C%96%E9%9D%A2%E6%9D%BF)
-   [细节面板](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)
-   [ML变形器模型](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#ml%E5%8F%98%E5%BD%A2%E5%99%A8%E6%A8%A1%E5%9E%8B)
-   [最近邻模型](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E6%9C%80%E8%BF%91%E9%82%BB%E6%A8%A1%E5%9E%8B)
-   [参考](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E5%8F%82%E8%80%83)
-   [神经变形模型](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E7%A5%9E%E7%BB%8F%E5%8F%98%E5%BD%A2%E6%A8%A1%E5%9E%8B)
-   [属性参考](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
-   [顶点增量](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E9%A1%B6%E7%82%B9%E5%A2%9E%E9%87%8F)
-   [调试ML变形器](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E8%B0%83%E8%AF%95ml%E5%8F%98%E5%BD%A2%E5%99%A8)
-   [调试Actor](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E8%B0%83%E8%AF%95actor)
-   [Unreal Insights](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#unrealinsights)
-   [故障排除](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)
-   [神经变形模型](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E7%A5%9E%E7%BB%8F%E5%8F%98%E5%BD%A2%E6%A8%A1%E5%9E%8B-2)
-   [更多信息](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [ML变形器设置指南](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#ml%E5%8F%98%E5%BD%A2%E5%99%A8%E8%AE%BE%E7%BD%AE%E6%8C%87%E5%8D%97-2)
-   [ML变形器示例内容](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#ml%E5%8F%98%E5%BD%A2%E5%99%A8%E7%A4%BA%E4%BE%8B%E5%86%85%E5%AE%B9)
-   [游戏开发者大会ML变形器演示](/documentation/zh-cn/unreal-engine/ml-deformer-framework-in-unreal-engine#%E6%B8%B8%E6%88%8F%E5%BC%80%E5%8F%91%E8%80%85%E5%A4%A7%E4%BC%9Aml%E5%8F%98%E5%BD%A2%E5%99%A8%E6%BC%94%E7%A4%BA)