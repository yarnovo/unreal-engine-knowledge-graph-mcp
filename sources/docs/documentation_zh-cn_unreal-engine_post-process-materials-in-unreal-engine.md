# 虚幻引擎中的后期处理材质 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:28.795Z

---

目录

![后期处理材质](https://dev.epicgames.com/community/api/documentation/image/3017a3ae-7bef-4abb-b54e-4bb95b33dad4?resizing_type=fill&width=1920&height=335)

后期处理材质是能够用于后期处理的材质，旨在创建破坏的视觉屏幕效果、区域类型效果或 只能通过后期处理材质才能实现的游戏整体外观。

以下几个小节将介绍如何设置后期处理材质，你可以使用的一些设置，并提供了一些示例说明如何使用不同的缓冲区来设置你自己的一些后期处理材质， 混合各种后期处理材质，等等。

## 后期处理图表

该引擎已经具有基于后期处理节点图表的复杂后期处理功能。 **后期处理材质（Post Processing Materials）** 可以额外插入到某些特定位置。 请参阅["常见问题"小节](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94)中关于 **r.CompositionGraphDebug** 的内容，获取完整图表的转储。 这张图表实际上不仅进行后期处理，还涉及部分光照工作。

大多数时候，图表会自动创建中间渲染目标。 这意味着，如果你想与前一种颜色混合， 你需要在着色器中进行混合（使用来自PostProcessInput0的输入）。

你可以使用[用户场景纹理](/documentation/zh-cn/unreal-engine/post-process-material-user-scene-textures-in-unreal-engine)创建自己的中间渲染目标。

后期处理材质应该谨慎使用，仅在真正需要时使用。 在可能的情况下，如颜色校正或调整、泛光、景深和各种其他效果，应该使用后期处理体积中固有的设置，这些设置已经过优化，而且更有效。

## 使用后期处理材质

通过后期处理设置（通常用后期处理体积或摄像机设置进行定义），可以混合（所谓的）可混合资产。 目前，只有 **材质（Materials）** 和 **材质实例（Material Instances）** 是可混合资产。 该引擎提供了一些后期处理材质，但使用该功能， 你可以创建自己的 **自定义后期处理**，无需任何程序员的帮助。

只需将一个或多个后期处理材质指定给 **可混合（Blendables）** 分段中的后期处理体积。 首先按 **+** 添加新插槽， 在 **内容浏览器（Content Browser）** 中选择一个材质，然后按左箭头进行指定。具有相同可混合位置（Blendable Location）和可混合优先级（Blendable Priority）（详见下文）的材质将按顺序处理，未使用的插槽将被忽略。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/073bf822-adc1-410a-999d-a3d457de5ff2/postprocesssettings.png)

## 后期处理材质的关键设置

后期处理材质需要指定材质域 **后期处理**：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85a46315-1428-4e40-9dd6-7b9e6277cea2/domainpostprocess.png)

材质只能使用 **自发光颜色（Emissive Color）** 来输出新颜色。 此外，还可以定义在后期处理过程中应在何处应用此通道， 如果有多个通道，则应按什么顺序处理（优先级）：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1deef75c-b4d6-4a93-be99-463b0e339b43/postprocessmaterialprops.png)

可混合位置

描述

**色调映射前（Before Tonemapping）**

当使用SceneTexture表达式的PostProcessInput0时，所有光照均采用HDR场景颜色。 此选项可以修复时间抗锯齿（TAA）和GBuffer查找的问题， 如使用深度和法线时可能发生的问题。

**色调映射后（After Tonemapping）**

此选项表示将在色调映射和颜色分级完成之后进行后期处理。 这是可提高性能的首选位置，因为颜色是LDR，因此需要的精度和带宽较低。 选择此选项后，使用SceneTexture表达式的PostProcessInput2和PostProcessInput3来控制在管线中应用场景颜色的位置。 Input2在色调映射之前应用场景颜色。 Input3在色调映射之后应用场景颜色。

**半透明前（Before Translucency）**

此位置在管线中甚至比半透明与场景颜色结合之前的"色调映射前（Before Tonemapping）"还要早。 注意SeparateTranslucency的复合比法线半透明要晚。

**替换色调映射器（Replacing the Tonemapper）**

PostProcessInput0提供HDR场景颜色，PostProcessInput1具有SeparateTranslucency（Alpha是遮罩），PostprocessInput2具有低分辨率泛光输入。

典型的后期处理输入来自前面的通道。 当使用 **PostProcessInput0** 时，可以通过SceneTexture材质表达式访问该颜色。 使用SceneColor可能不会得到正确的结果。

## 混合不同的材质实例

[使用后期处理材质](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E6%9D%90%E8%B4%A8)

使用后期处理体积，很容易在多个后期处理材质之间设置软过渡。 这里我们使用一个标记为未绑定的体积和一个具有更大混合半径（例如，1000）的体积：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71b87d43-9218-4143-afa1-8461c21d98dd/blendingavolume.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ec0f60f-10a9-44a2-ae77-59c968f70fae/blendingavolume1.png)

后期处理设置为未绑定

后期处理绑定体积

对于同一个可混合材质的多个实例，后期处理体积上的优先级将影响 *混合顺序*，而材质上的可混合优先级会影响不同可混合材质的 *渲染顺序*。将材质属性中的 **是否可混合（Is Blendable）** 设置为 **fasle** 可禁用混合，这将独立渲染该材质的每一个实例（这样的开销可能会很大）。写入[用户场景纹理](/documentation/zh-cn/unreal-engine/post-process-material-user-scene-textures-in-unreal-engine)的材质不可混合。

我们为每个体积指定了相同材质的不同材质实例。 颜色被指定为一个材质参数，允许对两个材质实例进行不同的设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f933cf3-d49f-4658-a825-564e24c1b8f0/pp_blendedmaterial.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f933cf3-d49f-4658-a825-564e24c1b8f0/pp_blendedmaterial.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1eb2dca0-91d5-49a0-8057-dd9cda32efd6/blendmatinst1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c0c358c-df5e-454a-a00a-12183db43d03/blendmatinst2.png)

材质实例 - 红色

材质实例 - 绿色

根据摄像机位置，在混合半径范围内使用和混合一个体积的设置：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d74b45a-0762-4832-80cd-ff4323f88ae6/blend1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9c085c7-5a76-4354-996f-cdbcc9471355/blend2.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04cc3829-a6f9-4dba-a61d-4d9251c6a2bc/blend3.png)

未绑定后期处理体积材质实例（红色）设置为0.75

混合半径为1000

后期处理体积材质实例（绿色）设置为0.75

随着摄像机的移动，可以感知到两个效果设置之间的软线性过渡。

下面显示了一个关卡的自上而下视图，其中有两个体积。 大的未绑定体积有一个红色的材质实例，小的体积有一个指定为"可混合"的绿色材质实例。 较小的体积具有较高的优先级。 材质参数根据摄像机位置进行混合。 模糊边界由体积中指定的"混合半径（Blend Radius）"属性定义，并扩展体积形状。

进行正确设置后，所有的混合都按预期进行。

![不良设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6eddd2d1-b5db-4403-ba71-c1776bd94b5f/volumeblendbad.png)

![良好设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db353c80-7765-4a35-b9d6-0bd641763c22/volumeblendgood.png)

不良设置

良好设置

这两种设置之间的区别是在材质（标量或向量）参数上指定的默认值。 良好设置有一些值使通道看似没有任何效果（例如，乘以白色或使用插值0）。

**这两种设置中，我们都能看到**：当摄像机不受任一体积的影响时，后期处理通道不会被渲染（用灰色网格表示）。 如果我们完全在任一体积内，我们也会看到正确的混合。

**不良设置**：当摄像机进入影响半径时，我们看到一个硬过渡，因为使用了错误指定的默认参数。

**良好设置**：使摄像机进入影响半径的过渡隐藏得很好，我们会看到向体积颜色的平滑过渡。

所有材质实例属性都将混合，无论是否选中属性复选框（在这种情况下， 会混合来自父项的属性）。 这与未选中属性没有任何效果的后期处理设置不同。 这意味着如果混合一个材质实例，所有属性都将被混合。

## 材质表达式"SceneTexture"

你可以将 **SceneTexture** 材质表达式添加到材质中，并在表达式属性中选择要引用的纹理：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9449221-b365-4330-807b-f8939d166d21/scenetextureprops.png)

节点有一个可选输入和多个输出：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09ce6097-0b49-4261-8cfb-7dfee036db14/scenetextureexpression.png)

**UV** 输入允许你指定要进行纹理查找的位置（仅用于颜色输出）。 颜色输出是4通道输出（实际的通道分配取决于场景纹理ID）。 **大小（Size）** 是一个包含纹理宽度 和高度的两分量向量。 在 **InvSize** 输出中可获得这个两分量向量的倒数（1/宽度、1/高度）。 在引用如下例所示的邻近样本时， 这会很方便：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d436397-3305-433f-98ea-dea055fae5af/depthnextto.png)

材质表达式计算当前像素与相邻像素的深度差（例如In = 0,1会将下面像素的增量值）。

## 使用GBuffer属性

GBuffer包含多个存储材质的纹理（例如次表面颜色/高光颜色、粗糙度……）和对象属性（例如法线、深度）， 没有光照可用于计算着色（光源如何与材质相互作用）。 在延迟渲染器中，我们首先渲染GBuffer，然后使用GBuffer属性计算所有的光照 （延迟）。 如果使用延迟着色路径（例如DirectX 11或高端OpenGL），我们可以在后期处理期间访问这些缓冲区。

抗锯齿通常会使这一操作稍加困难，因为GBuffer像素/纹素不再是与输出像素呈1:1关联（请参阅下面的小节）。

## 自定义深度

这项单独的功能通过将某些对象渲染到另一个深度缓冲区（称为自定义深度缓冲区）中来启用对这些对象的遮罩。 这增加了额外的绘制调用，但不使用更多材质。 渲染的成本相当低，因为我们只输出深度。 该功能可以在网格体上激活 （例如静态网格体属性/渲染自定义深度）：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/834a5575-b0c1-4840-b77e-df62639ae2cd/customdepth.png)

在这个场景中，我们在两个对象上激活了该功能，但是如果没有后期处理通道对内容进行可视化处理，该功能仍然是不可见的：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb9b901b-30de-40c9-a4b2-8264b30098ab/scene.png)

这里我们可以看到自定义深度的可视化效果，如下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7bc5b41-ec4a-4ef3-97bf-eb475659a762/scenecustomdepth.png)

这是我们用来对其进行可视化的材质：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40fd31db-0bf2-45f3-a7bd-295096e05f3f/customdepthmat.png)

## 自定义深度模具

自定义深度模具（Custom Depth Stencil）是自定义深度（Custom Depth）的扩展，你可以在其中使用渲染对象的模具或挖剪，然后做一些视觉效果上比较有趣的东西（如下例所示）， 使你能够可视化遮挡对象，绘制对象轮廓，或仅从特定视角可见。 通过访问场景中Actor的模具， 你可以做很多事情。 使用以下设置可启用并指定模具值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4cb2d9b-98db-43ae-bf13-4f5db62c07b6/customstencilsettings.png)

在这个场景中，在三个对象上启用了自定义深度（Custom Depth），并且为每个对象设置了 **自定义深度模具值（Custom Depth Stencil Value）**，但是如果没有任何后期处理通道来可视化内容，该功能仍然是不可见的。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e610226e-832c-4f24-b732-f3fab683dddc/customdepthstencilscene.png)

一旦设置好后期处理材质，就可以可视化自定义深度模具的外观，根据使用的 **自定义深度模具值（Custom Depth Stencil Value）**，使用随机指定的颜色渲染被遮挡的对象。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7179178-739a-48ac-8aa4-b208871bb622/customdepthstencilvisualization.png)

这是我们用来对其进行可视化的材质设置：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/156f07c8-bb4e-4f29-b335-1681684e3b40/customdepthstencilmaterial.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/156f07c8-bb4e-4f29-b335-1681684e3b40/customdepthstencilmaterial.png)

点击图片查看大图。

这绝不是使用自定义深度模具（Custom Depth Stencil）的唯一方法，在这个特殊的材质设置中，对该模具进行了划分，使其使用1到255之间的值，对介于这些值之间的任何值使用一个遮罩， 并为这些值创建一个随机颜色，以便当自定义深度模具值（Custom Depth Stencil Value）更改时，颜色也随之更改， 最后，所创建的遮罩仅在对象被遮挡时才对模具进行着色。

## 时间抗锯齿或为何GBuffer抖动

时间抗锯齿是一个独特的虚幻引擎功能，可以大幅提高图像质量，而性能成本非常适中。

默认情况下，后期处理材质被插入到后期处理图表的末尾（在色调映射器之后）。 这意味着在色调映射、颜色分级和应用时间抗锯齿之后， 你将得到最终的LDR颜色。 这是许多简单的后期处理效果的最佳位置，可以提高性能和易用性。

这里可以看到我们如何使用自定义深度输入来可视化特定对象周围的轮廓：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e38e2b98-6deb-4506-9ca3-69c909ac5f11/sceneaftertonemapper.png)

注意，之前的图像中，轮廓上没有抗锯齿效果，但在运动中，你也会看到轮廓抖动约1像素。 这是因为时间抗锯齿将整个场景的渲染每帧移动一个亚像素。 将多个帧组合在一起生成最终的抗锯齿图像。 不过，我们可以将材质移到后期处理图表中较早的位置来解决这个问题。

结果如下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72475472-5abd-4657-81d1-0ed19c8b8776/scenebeforetonemapper.png)

我们得到一个稳定的抗锯齿图像。 在运动中，我们可能会看到时间抗锯齿的一些瑕疵。 这项功能使用深度缓冲区来替换旧图像。 在对象内部渲染了边框时， 这项功能可以正常工作，但在对象外部，我们还需要调整深度缓冲区（尚未完成，需要额外的性能成本）， 但理想情况下不应该这样做。

## UV和ScreenPosition

使用后期处理材质，你可以查看屏幕对齐的缓冲区，但你需要知道正确的UV。 将映射选项设置为 **ViewportUV** 时，**ScreenPosition** 材质表达式会输出UV，其中0,0位于视口的左上角，1,1位于右下角。 相反，在这个材质表达式中使用 **SceneTextureUV** 映射可能会得到不同的结果。 这是因为实际的纹理（更准确地说是渲染目标）可能比视口更大。 纹理在编辑器中可以更大，因为我们为多个视口共享这个纹理，并为所有视口使用最大的范围。 即使在游戏中，在某些情况下也可能更大（例如SceneCaptureActor可能拥有更小的视口、Matinee黑边框、分屏、VR等等）。 **SceneTextureUV** 选项为这个较大的纹理提供UV。 如果你只需要一个相对偏移（如像素大小的边缘检测），你需要用正确的大小缩放。 **SceneTexture** 材质表达式可输出大小和大小的倒数（对于像素偏移非常有效且有用）。 要对所有这些进行测试，可以使用控制台变量 **r.ViewPortTest** 来测试各种视口配置。

## 过滤纹理查找

SceneTexture材质表达式有一个复选框用于获取\[双线性\]过滤查找。 使用此选项会导致渲染较慢，因此应仅在需要时使用。 许多屏幕空间纹理不支持过滤（例如GBuffer）。 不公开此属性允许引擎在需要时压缩数据（打包会阻止过滤）。

## 替换色调映射器

通过使用"替换色调映射器（Replacing the Tonemapper）"可混合位置，可以用你自己的色调映射器覆盖引擎中的色调映射器。 这是一个正在开发的功能，意味着它可能会发生变化，而且还不是完整的功能。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb5a76d5-e206-45ff-bead-52d1752a94c4/replacingthetonemapper.png)

我们开始向色调映射器公开了一些后期处理设置参数，但是这部分可能会发生很大的变化。 这些值作为材质参数公开，需要有确切的名称。

向量参数：

```cpp
	Engine.FilmWhitePoint
```

标量参数：

```cpp
	Engine.FilmSaturation
	Engine.FilmContrast
```

为了获得这些参数，你需要根据后期处理材质创建一个材质实例。

你仍然可以使用自己的参数，并让它们像其他后期处理材质设置那样混合。

## 已知的问题

-   **材质表达式SceneTexture（Material Expression SceneTexture）**
    -   独立半透明度（Separate Translucency）无法正常工作。
    -   某些查找在某些通道中不起作用
    -   材质函数可能会报告错误，但仍然可以用于具有后期处理域的材质中。
-   **材质（Material）**
    -   后期处理材质（Post Process Material）中的UV可能不在0-1范围内（例如，在编辑器中减小视口大小时），这与查找一致，但会导致难以实现类似于暗角效果的东西。
    -   还不支持输出Alpha。 应改用不透明度（Opacity）。
    -   将世界位置（World Position）与[时间抗锯齿上采样（Temporal Anti-Aliasing Upsampling）](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine#%E6%97%B6%E9%97%B4%E6%8A%97%E9%94%AF%E9%BD%BF%E4%B8%8A%E9%87%87%E6%A0%B7)结合使用需要在时间放大（TAAU、DLSS和时序超级分辨率）后对深度缓冲区进行采样，这将导致输出中出现锯齿，因为使用它无法实现抗锯齿。 因此，我们建议在时间放大之前使效果生效。
-   **混合（Blending）**
    -   当使用混合半径混合两个后期处理体积时，可能会看到非软过渡。 可以通过使用未绑定体积和表示默认值的材质实例设置来避免这种情况。

## 常见问题解答

\* **我可以用"仅光照模式"纹理作为输入吗？**

不可以，我们没有这个数据作为中间步骤。 对于这个视图模式，我们通过忽略材质颜色 来生成它。 要使其成为一个快速选项，需要重建大部分渲染代码。

\* **为什么SceneColor查找显示条带，但当使用PostProcessInput0时，却没有显示这种条带？**

使用SceneColor时，我们创建一个较低质量的场景副本，以允许对我们当前写入的纹理进行查找 （通常情况是在不可能的位置进行网格体渲染）。 在后期处理中，应使用PostProcessInput0。

\* **后期处理要消耗多少内存？**

内存消耗取决于屏幕分辨率。 在色调映射之前，我们使用HDR（每个像素8字节），之后我们使用LDR（每个像素4字节）。

\* **如何降低后期处理的渲染成本？**

在目标平台上进行测量，保持纹理查找计数较低，执行较少的数学运算，减少依赖性纹理查找， 避免随机纹理查找（会由于纹理缓存未命中而变得更慢）。

\* **我可以使用多少通道？**

每条通道都会增加性能成本。 尝试仅在需要时组合通道和激活通道。 可以将一般游戏功能 （例如噪点）增加到引擎通道以获得更好的性能。

\* **每个后期处理和混合需要多少CPU性能？**

混合材质所需的性能成本很低。 所有的材质实例属性都会混合，只需渲染一个使用这些设置的后期处理材质通道。

\* **我需要使用"色调映射器前（Before Tonemapper）"来获取适当的时间抗锯齿（TemporalAA）。 当我使用一种颜色，它会经过色调映射，因此看起来不同。 如何避免出现该情况？**

没有简单的解决办法。 你需要做一个逆向色调映射运算（高成本）。 根据眼部适应情况， 颜色也可能看起来不同。 你可以向SceneTexture公开眼部适应水平以弥补这一点。

\* **我如何得到后期处理图表的完整转储？**

**r.CompositionGraphDebug** 可将图表记录到控制台。 示例：

```cpp
		FRenderingCompositePassContext:Debug 'PostProcessing' ---------
		Node#1 'SceneColor'
			ePId_Output0 (2D 1136x768 PF_FloatRGBA RT) SceneColor Dep: 2
		Node#4 'Velocity'
			ePId_Output0 (2D 1136x768 PF_G16R16 RT) Velocity Dep: 1
		Node#2 'SceneDepthZ'
			ePId_Output0 (2D 1136x768 PF_DepthStencil) SceneDepthZ Dep: 1
		Node#5 'MotionBlurSetup0MotionBlurSetup1'
			ePId_Input0: Node#4 @ ePId_Output0 'Velocity'
			ePId_Input1: Node#1 @ ePId_Output0 'SceneColor'
			ePId_Input2: Node#2 @ ePId_Output0 'SceneDepthZ'
			ePId_Output0 (2D 568x384 PF_FloatRGBA RT) MotionBlurSetup0 Dep: 2
			ePId_Output1 (2D 568x384 PF_FloatRGBA RT) MotionBlurSetup1 Dep: 1
		Node#6 'QuarterResVelocity'
			ePId_Input0: Node#5 @ ePId_Output0 'MotionBlurSetup0MotionBlurSetup1'
			ePId_Input1:
			ePId_Output0 (2D 284x192 PF_FloatRGBA RT) QuarterResVelocity Dep: 1
		Node#7 'VelocityBlurX'
			ePId_Input0: Node#6 @ ePId_Output0 'QuarterResVelocity'
			ePId_Input1:
			ePId_Output0 (2D 284x192 PF_FloatRGBA RT) VelocityBlurX Dep: 1
		...
```

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [post process](https://dev.epicgames.com/community/search?query=post%20process)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [后期处理图表](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E5%9B%BE%E8%A1%A8)
-   [使用后期处理材质](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E6%9D%90%E8%B4%A8)
-   [后期处理材质的关键设置](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86%E6%9D%90%E8%B4%A8%E7%9A%84%E5%85%B3%E9%94%AE%E8%AE%BE%E7%BD%AE)
-   [混合不同的材质实例](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E6%B7%B7%E5%90%88%E4%B8%8D%E5%90%8C%E7%9A%84%E6%9D%90%E8%B4%A8%E5%AE%9E%E4%BE%8B)
-   [材质表达式"SceneTexture"](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F%22scenetexture%22)
-   [使用GBuffer属性](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E4%BD%BF%E7%94%A8gbuffer%E5%B1%9E%E6%80%A7)
-   [自定义深度](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B7%B1%E5%BA%A6)
-   [自定义深度模具](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B7%B1%E5%BA%A6%E6%A8%A1%E5%85%B7)
-   [时间抗锯齿或为何GBuffer抖动](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E6%97%B6%E9%97%B4%E6%8A%97%E9%94%AF%E9%BD%BF%E6%88%96%E4%B8%BA%E4%BD%95gbuffer%E6%8A%96%E5%8A%A8)
-   [UV和ScreenPosition](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#uv%E5%92%8Cscreenposition)
-   [过滤纹理查找](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E8%BF%87%E6%BB%A4%E7%BA%B9%E7%90%86%E6%9F%A5%E6%89%BE)
-   [替换色调映射器](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E6%9B%BF%E6%8D%A2%E8%89%B2%E8%B0%83%E6%98%A0%E5%B0%84%E5%99%A8)
-   [已知的问题](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E5%B7%B2%E7%9F%A5%E7%9A%84%E9%97%AE%E9%A2%98)
-   [常见问题解答](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine#%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E8%A7%A3%E7%AD%94)