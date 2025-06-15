# 虚幻引擎中的Substrate材质概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:28:44.195Z

---

目录

![Substrate材质概述](https://dev.epicgames.com/community/api/documentation/image/52164c17-5f73-4033-8f45-d7701995e504?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

Substrate是虚幻引擎5中的材质编辑途径；它摒弃了原有固定着色模型和混合模式的思路（例如默认光照和透明涂层），替换为表现力更强、更为模块化的框架。

Substrate材质消除了非Substrate（或旧版）材质系统的特定抽象性，而改用有度量的物质属性。这扩大了可以工作的参数空间，可以更准确地呈现混合金属、玻璃、塑料等复杂的材质表面。Substrate还简化了材质分层过程，可以更轻松地表示诸如金属上有液体或次表面散射上有透明涂层之类的表面。

Substrate中的材质依赖"物质Slab（slab of matter）"概念。这些Slab是一种由具有明确单位的物理量参数化的原则性BSDF表示。材质表示为执行各种运算（例如混合与分层）的Slab图。由于其原则性表示，Substrate材质可以根据平台的容量进行简化，放弃视觉质量，以换取性能的提升。

## 启用Substrate

要在项目中启用Substrate材质，请执行以下操作：

![启用Substrate材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b04b7cb-4e01-4172-b9c1-f56f8f827aec/enable-substrate.png)

1.  打开 **项目设置（Project Settings）**，找到 **引擎（Engine）> 渲染（Rendering）** 。
2.  在 **Substrate（Substrate）** 分段下，启用 **Substrate材质（试验性）（Substrate materials (Experimental)）** 。
3.  按照提示和消息操作， **重启（Restart）** 项目。
    
    ![重启引擎](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff08ee80-4be1-439a-97fd-ba2b7717e2b9/restart-engine.png)
    
    我们推荐在Windows上使用 **DirectX 12 (DX12)** 。Substrate适用于DirectX 11 (DX11)，但存在几个问题，需要进一步测试。如需了解更多信息，请参阅本页面的[局限性和已知问题](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%B1%80%E9%99%90%E6%80%A7%E5%92%8C%E5%B7%B2%E7%9F%A5%E9%97%AE%E9%A2%98)小节。
    

### 可选项目设置和控制台变量

Substrate包括这些可选项目设置和控制台变量：

![Substrate可选设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84679da5-917b-4d55-9315-d11b498b99c1/substrate-optional-project-settings.png)

属性

说明

项目设置

 

**Substrate不透明材质粗糙折射（Substrate opaque material rough reflection）**

启用后，覆盖在其他材质上的粗糙表面能够以物理上可行的方式模糊较低层。

这是试验性功能。

**Substrate高级可视化着色器（Substrate advanced visualization shaders）**

启用此选项后，将生成高级调试视图模式所需的着色器。这些着色器会影响性能，应仅在需要调试Substrate材质拓扑时启用。如需了解更多信息，请参阅[Substrate调试视图模式](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E8%B0%83%E8%AF%95%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%BC%8F)。

控制台变量

 

\`r.Substrate.BytesPerPixel

用于指定Substrate材质自动简化前的逐像素存储字节数。此变量默认设置为每个像素80字节。你可以增大该值，材质越复杂，存储要求越高。值越高，使用的内存越多，并且 **可能会影响内存带宽和其他性能特征** 。此变量与性能的关系高度依赖内容和平台。你可以根据需要在platform.ini配置文件中逐平台指定此值。

### 转换旧版材质

Substrate材质 **不能** 恢复为非Substrate材质。打开并保存后，不可取消转换。因此，建议在启用Substrate之前将项目备份。

在启用了Substrate的项目中打开现有材质进行编辑时，这些材质会自动转换为Substrate材质。系统会使用 **Substrate Shading Models** 节点将这些材质转换为Substrate样式的着色网络。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aae228a-0701-40f3-b1e9-55583b430b5c/material-legacy-to-substrate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aae228a-0701-40f3-b1e9-55583b430b5c/material-legacy-to-substrate.png)

上面的示例展示了在项目启用Substrate的情况下打开一个 "旧版" 材质，在最终的材质图表中，节点被连接到了Substrate Shading Models节点。

在现有项目中启用Substrate时，应该按照这些准则操作。

-   在启用了Substrate的项目中打开现有非Substrate材质，会在保存材质时自动将其转换为旧版Substrate材质。转换是永久性的，不能恢复为非Substrate材质。
-   如果为项目禁用了Substrate，Substrate材质将渲染为黑色。这包括利用转换后的材质创建的旧版Substrate材质。你可以手动将Substrate材质转换为旧版材质，但这不会去除目前材质图表中存在的Substrate节点。

## Substrate与材质层的关系

虚幻引擎中的 **传统材质层**（包括[基于图表](/documentation/zh-cn/unreal-engine/layered-materials-in-unreal-engine)的层和[自定义层GUI](/documentation/zh-cn/unreal-engine/using-material-layers-in-unreal-engine)中的层）都基于参数混合的概念。每一层都定义了一个模式图表，其中的参数经混合后送入最终的着色模型。

材质层驱动的参数在送入Substrate定义的着色模型时不会受到阻碍。但你必须使用父材质中[材质属性](/documentation/zh-cn/unreal-engine/material-attributes-expressions-in-unreal-engine)节点的输出手动设置此逻辑。此方法有一个局限性，材质属性系统有一个固定的参数列表，但可能没有足够的插槽用于送入多slab Substrate设置——它可能需要使用与其真正含义无关的引脚属性。

Substrate可以原生使用下文所述的[参数混合](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%90%E7%AE%97%E7%AC%A6%E7%9A%84%E5%8F%82%E6%95%B0%E6%B7%B7%E5%90%88)，但无法从材质层接口访问该功能。**将Substrate和材质层统一起来是未来开发中很受关注的一个领域。**

## 处理Substrate材质

Substrate材质以类似于旧版材质的方式创作。本小节介绍了构成Substrate材质的关键元素，包括其节点、混合模式以及有关你可以创建的材质类型的详情。

### SubstrateMaterial Root节点

类似于旧版材质， **Material Root** 节点是Substrate slab和其他Substrate节点（例如运算符和构建块）送入的地方。

![SubstrateMaterial Root节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0836bc3f-50cc-44f0-b061-d1664e92332d/material-root-node.png)

和旧版材质一样，你将在选择Material Root节点时使用 **细节（Details）** 面板设置 **混合模式（Blend Mode）** 和其他属性，以定义材质的外观。

![设置Substrate混合模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12dde7fb-72fd-4288-ac15-3a3dd7bff52f/substrate-blend-modes.png)

所有Substrate材质图表必须连接到Material Root节点上的 **正面材质（Front Material）** 输入。此输入是每个Substrate图表的端点。

![Material Root节点正面材质输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d1d424c-2a06-48bd-8ee2-34a3d4bfd8d3/material-root-front-material-input.png)

#### Substrate混合模式

Substrate使用自有的一组[混合模式](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)来定义材质颜色如何与背景混合。旧版材质混合模式在彼此混合方面效果有限，所以能够创建的材质类型受限。Substrate的混合模式选择更多，可将材质混合到一起，形成各种各样的材质。这对于实现物理上正确的半透明表面着色尤其重要。

Substrate包括以下混合模式：

![选择Substrate混合模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a78ab0b-250a-4e85-90a7-beab3fda9462/substrate-blend-mode-selection.png)

混合模式

说明

**半透明（Opaque）**

定义了光线既不能通过也不能穿透的表面。覆盖范围是1的不透明表面。这与旧版不透明混合模式相同。

**遮罩（Masked）**

用于需要以二元（开/关）方式选择性控制可视性的材质。覆盖范围是1或0的不透明表面。这与旧版遮罩混合模式相同。

**半透明灰色透射率（TranslucentGreyTransmittance）**

一种具有彩色表面和覆盖范围，但透射率减少为灰阶的半透明材质。这可以加快速度，因为它可以防止将后景深半透明额外渲染成调制通道。 这是退却混合模式，适合不支持硬件彩色半透明度（称为双源颜色混合）的平台。[这类似于旧版半透明混合模式。](/documentation/zh-cn/unreal-engine/lit-translucency-in-unreal-engine#%E8%96%84%E5%8D%8A%E9%80%8F%E6%98%8E)。

**叠加（Additive）**

将材质颜色添加到背景颜色，其中最终颜色 = 源颜色 + 目标颜色。

**仅限彩色半透明（ColoredTranslucencyOnly）**

仅使用材质的透射率。表面相互作用减少到0。这与旧版乘混合模式相同。

**Alpha复合（预乘的Alpha）（AlphaComposite (Premultiplied Alpha)）**

此混合模式用于更精细地控制材质的哪些部分以叠加方式混合，哪些部分使用不透明度输入以半透明方式混合。工作方式与旧版Alpha复合（预乘的Alpha）混合模式相同。

**Alpha维持（AlphaHoldout）**

此混合模式将维持Alpha，以便给对象打孔，露出后面的对象。工作方式与旧版AlphaHoldout混合模式相同。

**半透明彩色透射率（TranslucentColoredTransmittance）**

一种具有彩色表面、覆盖范围和彩色透射率的全功能半透明材质。在景深后期处理时使用单独半透明的开销更大，因为必须在单独的缓冲区中渲染透射率分量，类似于旧版薄半透明（ThinTranslucent）着色模型。

利用Substrate处理半透明比传统材质更简单，半透明混合模式的意图更明确。这两者都有一个方面没有发生变化，即所有半透明混合模式还必须设置 **光照模式（Lighting Mode）** 来定义如何计算表面的光照。这对于实现半透明材质的正确外观很重要。

你创建的绝大部分半透明材质都将使用 **表面半透明体积（Surface Translucency Volume）** 或 **表面正向着色（Surface Forward Shading）** 。

以下光照模式可供选择：

光照模式

说明

**体积非定向（Volumetric NonDirectional）**

针对体积计算照明，且照明没有方向性。此设置用于烟雾和灰尘等粒子特效。这是最经济实惠的逐像素光照方法。但是，没有考虑材质法线。

**体积定向（Volumetric Directional）**

针对体积计算照明，且照明具有方向性，因此材质法线也被纳入考虑范围。请注意，默认粒子切线空间面向摄像机，因此，启用"生成球体粒子（Generate Spherical Particles）"可获得更有用的切线空间。

**体积逐顶点非定向（Volumetric PerVertex NonDirectional）**

与体积非定向相同，但光照仅在顶点处求值，因此像素着色器开销低得多。请注意，光照仍然来自体积纹理，因此范围有限。定向光源在远处无阴影。

**体积逐顶点定向（Volumetric PerVertex Directional）**

与体积定向相同，但光照仅在顶点处求值，因此像素着色器开销低得多。请注意，光照仍然来自体积纹理，因此范围有限。定向光源在远处无阴影。

**表面半透明体积（Surface Translucency Volume）**

为表面计算光照。光线会在体积中累积，因此结果比较模糊，距离也有限，但逐像素开销非常低。可在半透明表面（如玻璃和水）上使用。仅支持漫反射光照。

**表面前向着色（Surface ForwardShading）**

为表面计算光照。可在半透明表面（如玻璃和水）上使用。这使用前向着色来实现，因此支持来自局部光源的高光度高光，但不支持许多纯延迟功能。这是开销最大的半透明光照方法，因为每个光源的贡献量逐像素计算。

如需在Substrate材质中设置和使用半透明的一些示例，请参阅本页面的[半透明](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E%E4%B8%8E%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)小节。

### Substrate Slab

**Substrate Slab** 是用来组装Substrate材质的基本构建模块。它是最小必要参数集，可用于实现绝大部分材质外观。因此，可在它的基础上创作表现力强得多的外观。

Slab是物质Slab的原则性表示，由 **界面** 和 **介质** 组成。

![Substrate Slab的构成](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e813c6f0-941b-490d-92b9-cd0b03da2f15/substrate-slab-composition.png)

Substrate Slab的构成：界面(1)和介质(2)。

1.  **界面** 是光线与材质表面交互的边界。界面的属性主要由送入其中的粗糙度、法线、散射反照率（Diffused Albedo）、F0和F90值定义。
2.  **介质** 是界面之下光线被散射、透射和吸收的物质体积。介质的属性主要由[平均自由程](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E6%AC%A1%E8%A1%A8%E9%9D%A2%E6%95%A3%E5%B0%84%E5%92%8C%E5%8F%82%E4%B8%8E%E4%BB%8B%E8%B4%A8)（即MFP）输入定义。

Substrate Slab是非Substrate材质中单块Material Root节点的模块化替代品。它由多个表面属性构成，例如漫反射、高光度、粗糙度、自发光、布料、各向异性，等等。所有[SubstrateBSDF节点](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substratebsdf%E8%8A%82%E7%82%B9)都包含对其所生成的材质类型具名输出相关的属性，例如眼睛、毛发、简单透明涂层，等等。

传统材质依赖混合模式来表示可以使用的输入。Substrate使用不同BSDF Slab来定义材质类型。由于这些材质不再直接绑定到混合模式，因此可以层层叠加和混合，生成不同类型的材质。

![旧版Material Root节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ba1a204-d4cd-4aea-a044-aa647fa2eeb8/legacy-material-root-node.png)

![带有Material Root节点的Substrate Slab](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc85fee3-4f96-4c52-bf26-c5cd5348c6ab/substrate-material-root-node.png)

旧版Material Root节点

Substrate Slab和Material Root节点

使用的 **Substrate Slab BSDF** 主节点包括以下输入：

Substrate Slab输入

定义

**漫反射反照率（Diffuse Albedo）**

定义从表面进行漫反射的光线百分比。这类似于介质的局部基础颜色。默认值为0.18。

**F0**

定义表面与摄像机垂直的高光度高光的颜色和亮度。对于非传导性材质（塑料和其他非金属材质），这个数值通常在0到0.08的范围内。对于金属材质，它的范围最高可以达到1。宝石的范围最高可以达到0.16左右。

**F90**

定义表面法线与摄像机成90度夹角的高光度高光的颜色。 换言之，在相对于摄像机视图的切线角。仅会感知到色调和饱和度，因为亮度固定为1.0。随着F0降至0.02以下，这会淡入淡出为黑色。

**粗糙度（Roughness）**

控制材质的粗糙程度。表面粗糙度的范围是从0到1。为0（光滑）时，粗糙度是镜面反射。为1（完全粗糙）时，粗糙度是完全哑光或漫反射。使用各向异性时，会使用切线轴上的粗糙度值。

**各向异性（Anisotropy）**

控制材质的各向异性方向（-1：高光与双切线对齐，1：高光与切线对齐）。

**法线（Normal）**

取表面法线为输入。法线根据Material Root节点上的空间属性被视为切线或世界空间。此输入逐像素定义着色法线。

**切线（Tangent）**

取表面切线为输入。法线根据Material Root节点上的空间属性被视为切线或世界空间。此输入逐像素定义着色切线。

**SSS MFP**

次表面散射平均自由程（MFP）。这控制材质的密度，并影响材质对光线的吸收和散射。更准确地说，它定义光子与物质粒子相互作用的平均距离。这个距离由每个颜色通道控制。

此输入仅在没有向Material Root节点指定次表面轮廓资产时使用。

**SSS MFP缩放（SSS MFP Scale）**

此输入将次表面轮廓资产中的次表面散射平均自由程半径缩放为0到1之间的值。

此输入仅在没有向Material Root节点指定次表面轮廓资产时使用。

**SSS相位各向异性（SSS Phase Anisotropy）**

正值沿光线方向延长相位函数，导致前向散射。负值沿光线方向的反方向延长函数，导致后向散射。

**自发光颜色（Emissive Color）**

控制材质表面上的自发光颜色。

**第二粗糙度（Second Roughness）**

控制次要高光度波瓣的粗糙度。为0（光滑）时，粗糙度是镜面反射。为1（完全粗糙）时，粗糙度是完全哑光或漫反射。

此输入不影响漫反射粗糙度。

**第二粗糙度权重（Second Roughness Weight）**

主要和次要高光度波瓣之间的混合因子。使用粗糙度的第一高光度的权重为(1 - SecondRoughnessWeight)。值等于0时，仅渲染主要波瓣。值为0.5时，主次各占50%，值为1.0时，仅渲染次要波瓣。

**绒毛粗糙度（Fuzz Roughness）**

控制绒毛层的粗糙程度。粗糙度为0的绒毛为光滑（更有光泽），粗糙度为1的绒毛为完全粗糙（哑光）。

如果没有值连接到此输入，将改用粗糙度输入。

**绒毛量（Fuzz Amount）**

在界面上添加类似绒毛的层，从而引发彩色逆反射。这控制应用于表面层上的绒毛量。通常用于创建织物材质。

**绒毛颜色（Fuzz Color）**

定义绒毛层的颜色。

**闪光密度（Glint Density）**

材质表面上的微面片密度的对数表示。

需要在ConsoleVariables.ini配置文件中设置 `r.Substrate.Glints=1` 。

**闪光UV（Glint UVs）**

控制材质表面上闪光的位置和比例。

需要在ConsoleVariables.ini配置文件中设置 `r.Substrate.Glints=1` 。

### Substrate材质节点

以下类型的节点可用于创作Substrate材质：

节点类型

说明

[BSDF](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substratebsdf%E8%8A%82%E7%82%B9)

这些节点表示大部分类型的表面，从简单材质到更复杂的材质，如毛发、眼睛和水。

[运算符](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E8%BF%90%E7%AE%97%E7%AC%A6%E8%8A%82%E7%82%B9)

这些节点可混合与分层多个Substrate Slab BSDF，创建复杂的不同表面。

[构建块](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E6%9E%84%E5%BB%BA%E5%9D%97%E8%8A%82%E7%82%B9)

这些节点转换常见材质类型，以用于Substrate，如创建涂层或虚幻引擎的默认旧版材质着色模型。

[额外](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E9%A2%9D%E5%A4%96%E8%8A%82%E7%82%B9)

这些节点定义Substrate材质的材质域，直接类似于其旧版材质域同名项。

[辅助](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E8%BE%85%E5%8A%A9%E8%8A%82%E7%82%B9)

这些节点用于在材质中执行一些转换，例如将透射率映射到Substrate Slab 的平均自由程。

#### SubstrateBSDF节点

Substrate **BSDF** （双向散射分布函数）节点用于表示大部分类型的表面。它们控制你所创作材质的视效效果，并相应自动设置其域和着色模型。我们的目标移除通过Material Root节点的细节面板手动设置这些方面的做法。

Substrate包括以下BSDF：

![SubstrateBSDF节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f998810e-000f-47c7-905b-2e4ef3e072a2/substrate-bsdf-nodes.png)

Slab BSDF是用于在Substrate中进行创作的主节点，可以使用其他Slab叠层。其他BSDF用于专门用例，必须单独使用，不与其他BSDF混合。

SubstrateBSDF节点

说明

**Substrate Slab BSDF**

一个聚合了以下多个分量的物质Slab的原则性表示：漫反射、高光度、浑浊度、布料绒毛和各向异性。它可以渲染不透明次表面或半透明散射和半透明透射率次表面散射等效果。

**Substrate Eye BSDF**

用于使用Substrate渲染眼睛材质的BSDFS。这包括角膜和虹膜的特定输入。

**Substrate Hair BSDF**

用于使用Substrate渲染毛发材质的BSDF。

**Substrate Simple Clear Coat**

简单又快速地渲染顶部有透明涂层的材质。此节点在后台使用Substrate Slab BSDF，但简化了透明涂层的渲染工作流程。它经过优化，用于渲染旧版透明涂层材质。

**Substrate SingleLayerWater BSDF**

用于渲染主要用于[水](/documentation/zh-cn/unreal-engine/water-system-in-unreal-engine)系统的[单层水](/documentation/zh-cn/unreal-engine/single-layer-water-shading-model-in-unreal-engine)材质的BSDF。

**Substrate Unlit BSDF**

用于使用彩色自发光亮度渲染无光照元素的BSDF。此Substrate节点将旧版灰阶不透明度替换为了彩色透射。

如果需要混合无光照Slab，需要使用只有自发光颜色输入的常规Substrate Slab。

**Substrate Volumetric-Fog-Cloud BSDF**

用于表示参与介质的BSDF。此节点用于渲染[体积雾](/documentation/zh-cn/unreal-engine/volumetric-fog-in-unreal-engine)和[体积云](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)。

#### Substrate运算符节点

**Substrate运算符（Substrate Operator）** 节点可混合或叠加多个[Substrate Slab](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%20slab)，形成各种复杂的表面。如果Substrate Slab表示一块物质，运算符则表示将这些块组合在一起的方式。

以下Substrate运算符可供选择：

![Substrate运算符节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f02d47a-1d6a-40e2-9475-615759e363d2/substrate-operator-nodes.png)

Substrate运算符并不适用于所有[SubstrateBSDF](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substratebsdf%E8%8A%82%E7%82%B9)。只有 **Substrate Slab BSDF** 和 **Substrate Simple Clear Coat** 可以使用这些运算符节点。

Substrate运算符节点

说明

**Substrate Coverage Weight**

此运算符从Slab获取输入，并控制它具有的覆盖量，其中权重是覆盖量。降低权重会降低Slab的物质覆盖范围，意味着你能透视下面的物质。此节点应该与Substrate Vertical Layer运算符一起使用，使不透明物质彼此重叠，例如灰尘和尘土，以便控制其下覆盖的表面范围。

**Substrate Horizontal Blend**

此运算符从两块Slab获取输入：背景和前景。混合输入使用线性插值控制这两块Slab混合在一起的程度。

**Substrate Vertical Layer**

此运算符从两块Slab获取输入：顶层和底层。顶部Slab覆盖了底部Slab，底层的外观受顶层属性的影响。使用顶部厚度输入可控制顶层在底部上有多厚。此运算符非常适合用于创建车漆、涂漆木材和潮湿表面。

**Substrate Add**

此运算符从两块Slab获取输入并将其相加。创建的材质在物理上缺乏可行性，因为它会导致从表面传出的能量比传入的能量更多。

应尽量避免使用此节点。

在启用 **使用参数混合（Use Parameter Blending）** 时，运算符节点包含一个将其前景和背景混合为一个材质的运算。由于Substrate运算符可以通过将几块Slab一起混合和层层叠加来形成复杂的材质外观。在运行时执行此操作的开销可能很高，主要原因在于光照求值。参数混合是一项优化，它放弃了开销较高的光照求值，以换取运行时性能的提升，以及更经济实惠的光照求值。

如需详细了解此参数混合优化，请参阅本页面的[参数混合](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%90%E7%AE%97%E7%AC%A6%E7%9A%84%E5%8F%82%E6%95%B0%E6%B7%B7%E5%90%88)小节。

##### Substrate Coverage Weight

**Substrate Coverage Weight** 运算符控制垂直分层操作中两块Slab的比率。**权重（Weight）** 输入驱动此材质在与[Substrate Vertical Layer运算符](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate-vertical-layer)叠加到一起时的覆盖范围（如以下示例所示）。在使用作为覆盖范围的Alpha或作为不透明度的Alpha时（类似于半透明混合模式使用不透明的情况），你还可以用该运算符实现半透明表面。

![Substrate Coverage Weight](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/250a509d-dfdb-498a-b852-11e1a0211a39/substrate-coverage-weight.png)

以上图表使用 **Substrate Coverage Weight** 运算符，其中 **权重（Weight）** 驱动应用于底部Slab上的覆盖量。权重为1时，为完全不透明，屏蔽绿色纹理图案。权重为0.5时，为50%透明，混合两种材质颜色，并显示纹理图案。权重为0时，为完全透明，仅显示绿色纹理图案。

![Substrate Coverage Weight示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f00a91d8-1725-48de-b6b5-c8e632dc260a/substrate-coverage-weight-examples.png)

由于 **权重（Weight）** 输入采用Float3值，你还可以使用纹理驱动在层层叠加材质时应用于Slab的覆盖量。

##### Substrate Horizontal Layer

**Substrate Horizontal Layer** 运算符将两块Slab混合在一起，一个表示背景，另一个表示前景。**混合（Mix）** 输入使用线性插值控制其混合比率。

![Substrate Horizontal Blend节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/961a0685-19a0-4fca-8037-cbaff214d60c/substrate-horizontal-blend-node.png)

**背景（Background）** 输入在它为 **0** 时完全可见， **前景（Foreground）** 在它等于 **1** 时完全可见。混合比率为 **0.5** 时，这些Slab混合在一起，然后逐像素对混合求值。混合输入可以使用纹理控制混合比率，如以下示例所示。

![Substrate Horizontal Blend示例材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad120535-e26a-49ee-b0c9-65c90690304d/substrate-horizontal-blend-material-example.png)

##### Substrate Vertical Layer

**Substrate Vertical Layer** 运算符取其 **顶部（Top）** 和 **底部（Bottom）** 输入上的Slab，将其叠加在一起。此节点还会考虑顶层的厚度，以应用物理上正确的透射率和散射。这类似于涂层运算，顶层覆盖底层。底部Slab的外观依赖顶部Slab的属性。如果传递到顶部输入的BSDF完全不透明，则根本看不到底部Slab。

![Substrate Vertical Layer节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddac1d12-3bde-4ae1-a7a4-db0f30acae21/substrate-vertical-layer-node.png)

在不透明底部层上需要透明或半透明顶部涂层的情况下，垂直分层尤其很有用。例如，车漆、涂漆木材或水坑等潮湿表面。

##### Substrate Add

**Substrate Add** 运算符将两块Slab相加，并输出其结果。此运算符在物理上缺乏可行性，因为它生成的材质从表面传出的能量会超出传入的能量。在美术设计比物理可行性更重要的情况下，这很有用。但是，如要维持物理上准确的表面，应避免使用此运算符。

![Substrate Add Node示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2688a1c7-9509-4f11-85e3-047fa4478005/substrate-add-node-example.png)

#### Substrate构建块节点

**Substrate构建块（Substrate Building Block）** 节点是一组[材质函数](/documentation/zh-cn/unreal-engine/material-functions-in-unreal-engine)，为一些常见用例提供了转换。由于这些是材质函数，因此可以直接打开和检查。

以下Substrate构建块可供选择：

![Substrate构建块节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8bc7e974-96f3-4e17-abe3-91378e227751/substrate-building-block-nodes.png)

Substrate构建块节点

说明

**Substrate Coated Layer**

该材质函数会创建由彼此叠加的两块Slab构成的涂层材质。它会公开用户友好的参数，用于控制涂层界面和吸收率。

**Substrate Standard Surface Opaque**

该材质函数使用不透明表面的用户友好参数化来创建类似于Uber着色器的Substrate材质。参数化使用行业的标准词汇和概念。

**Substrate Standard Surface Translucent**

该材质函数使用半透明表面的用户友好参数化来创建类似于Uber着色器的Substrate材质。参数化使用行业的标准词汇和概念。

**Substrate UE4 Default Shading**

该材质函数复制Substrate的默认着色模型，用于非Substrate材质中使用的漫反射、金属感和高光度参数化。

**Substrate UE5 Unlit Shading**

该材质函数会重新创建带Substrate的UE4无光照着色模型。

#### Substrate额外节点

**Substrate额外（Substrate Extras）** 节点将指定它提供的材质和函数类型，例如设置Substrate材质要用作贴花或光源函数。这些节点正好类似于非Substrate材质，后者被指定为材质域的一部分。

以下Substrate额外可供选择：

![Substrate额外节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/856639b6-5695-408e-9c2d-f1167e5df0ce/substrate-extras-nodes.png)

这些节点是单块的，必须单独使用。它们不兼容[Substrate运算符](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E8%BF%90%E7%AE%97%E7%AC%A6%E8%8A%82%E7%82%B9)。

作为一种良好习惯，推荐将这些节点放在材质图表的末尾，插入 **Front Material**输入之前。

Substrate额外节点

说明

**Substrate Convert To Decal**

所有材质图表都可以用作贴花。此节点可指定材质将进行转换，并仅用作贴花材质。

**Substrate Light Function**

此节点可指定材质将仅用作[光源函数](/documentation/zh-cn/unreal-engine/using-light-functions-in-unreal-engine)。它必须单独使用。

**Substrate Post Process**

此节点指定材质将仅用作[后期处理材质](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine)。它必须单独使用。

**Substrate UI**

此节点指定材质将仅用作用户界面元素，例如设计为用于[UMG UI设计器](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)的元素。它必须单独使用。

例如，使用 **Substrate Convert To Decal** 节点时，所有Substrate材质都可以当作贴花材质，应用于场景中的网格体贴花和贴花Actor。

额外节点在连接到 **Material Root** 节点的 **正面材质（Front Material）** 输入时，自动设置 **材质域（Material Domain）** 。一些额外节点需要更改[混合模式](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)以支持输出。

![Substrate Convert-to-Decal示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6c69aec-624f-49bb-a7c5-e5b90dd104cf/substrate-convert-to-decal-node.png)

在使用 **Substrate Convert To Decal** 时，你必须将混合模式设置为 **TranslucentGrey Transmittance**、**Colored Transmittance**、**TranslucentColorTransmittance** 或 **AlphaComposite (Premultiplied Alpha)**，否则材质编辑器的 **统计数据（Stats）** 面板中会显示错误。

#### Substrate辅助节点

**Substrate辅助（Substrate Helper）** 节点是一组节点和材质函数，用于执行一些转换，或实现旧版材质能够执行的一些功能。

![Substrate辅助节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59e06ba5-3b74-416c-86f6-a1f77127c5d5/substrate-helper-nodes.png)

Substrate辅助节点

说明

**Substrate Flip Flop**

基于入射视角控制表面反射率。它允许基于视角将面向法线的颜色（F0）插入切线角颜色（F90），并使用衰减参数控制插值速度。

**Substrate Haziness-To-Secondary-Roughness**

根据基础表面粗糙度和浑浊度计算次要高光度波瓣粗糙度。此参数化可确保浑浊度在物理上具备合理性，并且在感知上更容易创作。

**Substrate IOR-To-F0**

将非传导性IOR转换为F0值。

**Substrate Metalness-To-DiffuseColorF0**

将金属度参数化（基础颜色/高光度/金属感）转换为散射反照率（DiffuseAlbedo）/F0参数化。

**Substrate Rotation-To-Tangent**

将旋转角度转换为切线向量。

**Substrate Thin-Film**

根据输入表面属性以及薄膜参数，计算生成的材质高光度参数F0和F90。

**Substrate Transmittance-To-MeanFreePath**

根据参与介质的Slab（垂直于表面查看）转换透射率颜色。此节点直接映射到Slab BSDF输入。

**Substrate View-Dependent-Coverage**

基于入射视角调整覆盖范围。此节点适合用于混合足够厚的层，厚到效果会随视角发生变化。例如，在切线角的遮挡程度相较于入射角更大的大颗粒灰尘。

### 关于Substrate节点的其他节点

-   **Substrate贴花材质（Substrate Decal Materials）**
    -   Substrate贴花当前使用与旧版路贴花混合模式径相同的功能。
    -   Substrate贴花的未来版本将设法提供与Substrate的其他已退出功能相似但更强大的功能集，例如水、血液、粘性物等的层半透明Slab。此外还会考虑引入可以根据厚度侵蚀的层，例如车漆划痕、地面台阶和轮胎痕迹。
-   **Substrate Shading Models Node**
    
    -   在项目启用了Substrate的后打开之前创建的材质，会将其自动转换为使用Substrate Slab。所有现有输入都会送入 **Substrate Shading Model** 节点。
    
    ![Substrate Shading Models节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c142a96b-a5df-4410-82d8-0289fca91ddb/substrate-shading-models-node.png)
    
    在创建新Substrate材质时，应避免手动添加或使用此节点。
    

### Substrate统计数据面板

**Substrate（Substrate）** 统计数据面板在材质编辑器的材质图表下可用。

![Substrate统计数据面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a806a345-fe61-4c20-99aa-23ad5dd7b412/substrate-stats-panel-1.png)

Substrate面板显示有关材质、简化和拓扑的统计数据。

![Substrate统计数据面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb8e5adf-85c1-4592-831e-322e9c5264c1/substrate-stats-panel-2.png)

### 使用运算符进行参数混合

若逐像素使用多个BSDF（双向散射分布函数），渲染速度会根据其在材质图表中的数量等比例减慢。对两个BSDF的光照求值时，速度比对一个BSDF的光照求值慢一倍。对于不透明和半透明表面也是如此。

运算符节点包括 **使用参数混合（Use Parameter Blending）** 复选框，可用来优化材质的性能和内存占用量，同时维持图表中所有混合与分层操作的外观。只有Material Root节点之前最右侧的运算符节点需要启用该设置。图表中的其他所有节点都会自动应用参数混合。

需要考虑材质中多块Slab的性能时，参数混合是一个不错的回退选项。启用后，两块Slab会合并为单块Slab，只需要单次光照求值。合并后使用的内存也比两块单独的Slab少得多。

![Substrate运算符](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76289c95-c59a-4f11-a8a0-2e6e0aabd773/substrate-use-parameter-blending.png)

下面的示例材质取自未启用和启用了 **使用参数混合（Use Parameter Blending）** 的[内容示例Substrate级别](https://www.fab.com/listings/4d251261-d98c-48e2-baee-8f4e47c67091)。

此材质（M\_Substrate\_ShaderBall\_IceRocks)使用了两个BSDF。左边没有混合，右边使用了参数混合。

![Substrate参数混合示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddbf1320-ef22-499f-84e5-a6ec8e19f38d/parameter-blending-example-1.png)

此材质（M\_Substrate\_ShaderBall\_AnisoOverSSS）更加复杂，它使用两个垂直层运算符和单个覆盖范围权重运算符混合四块Slab。该材质的内存开销为每像素108字节。启用"使用参数混合（Use Parameter Blending）"后，所有运算符的混合开销会降至每像素28字节。左边的材质没有混合，右边使用了参数混合。

![Substrate参数混合示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e455f94e-c203-4fe5-8f0e-59c3c44ae0ae/parameter-blending-example-2.png)

除了"运算符上的参数混合"节点之外，你还可以使用以下某个工作流程来实现类似结果：

-   在图表中手动混合散射反照率（DiffuseAlbedo）、F0、F90、粗糙度和其他属性。将所有属性传入已连接到正面材质输入的单块Slab。此方法很适合孤立的材质，但对于一大堆复杂的材质，可能会变得难以管理。
-   使用基于图表的[分层材质](/documentation/zh-cn/unreal-engine/layered-materials-in-unreal-engine)工作流程。由于它利用材质函数来复用工作，其扩展效果优于第一个选项。

在移动平台等更低端的平台上，为了提高性能，编译器会自动启用参数混合。在中端平台上，材质的底层将渐进式使用参数混合，以保持在目标性能和内存约束范围之内。

### 金属度和高光度响应

Substrate使用的参数化不同于非Substrate（或旧版）材质中的DefaultLit着色模型，金属感输入没有了。此参数化试图放弃抽象值（例如金属感和高光度），而转向有现实世界单位的物理属性。

Substrate材质的反光属性和高光度响应使用三个属性定义：散射反照率（DiffuseAlbedo）、F0和F90。Substrate会自动强制节能，确保高光度界面和介质不会增加能量。因此，F0越高，漫反射贡献量的可见度就越低。

金属度使用 **Substrate Metalness-To-DiffuseAlbedo-F0** 辅助节点进行模拟。它取基础颜色值、高光度值、金属感值作为输入，并将其转换为映射到Substrate Slab上的 **Diffuse Alebdo** 和 **F0** 的值。

![Substrate Metalness-To-DiffuseAlbedo-F0。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/816fcf64-9cd1-480d-9933-192ae5761a85/substrate-metalness-example.png)

可以使用 **EdgeColor** 或 **F90** 输入实现对光源的各种各样的复杂材质漫反射和高光度响应。例如，带有青色到黄色、垂直于切线的高光度反射的红色球体。

![Substrate Metalness-to-DiffuseAlbedo-F0示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8071a580-42e5-4951-ad2a-a527ca74f49f/substrate-metalness-example-sphere.png)

**Substrate FlipFlop** 辅助节点适合用于实现基于法线的高光度着色。通过可调衰减过渡控制高光度颜色随NoV发生的F0和F90的变化。

### 粗糙折射

Substrate支持透过半透明对象的粗糙折射，在带有半透明顶层的分层不透明材质上也支持粗糙折射。场景背景的模糊度以及与被折射对象的距离根据使用扭曲/折射时的主材质粗糙度来计算。

#### 半透明粗糙折射

要创建带有粗糙折射的半透明材质，请在 **细节** 面板中设置以下属性。

-   **混合模式：**TranslucentColoredTransmittance、TranslucentGreyTransmittance或ColoredTransmittanceOnly。
-   **折射方法（Refraction Method）：**折射率（IOR）、像素法线偏移或2D偏移。

将值传递到 **折射（Refraction）** 、 **粗糙度（Roughness）** 和 **次表面散射平均自由程（SSS MFP）** 。下面的图表在粗糙度大于0时生成了简单的磨砂玻璃效果。使用了很高的次表面散射平均自由程（SSS MFP）值来创建完全透明的材质，而IOR值1.514则近似表示玻璃的相应值。

![Substrate半透明粗糙折射示例图表。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48bb9f53-aac2-4295-81e1-a3162e76c542/substrate-translucent-rough-refraction-graph.png)

在下面的示例中，随着粗糙度值的增加（从左到右为0、0.2、0.6），玻璃背后的对象越来越模糊。

![Substrate半透明粗糙折射示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97ea1501-8578-4a63-b8b6-f21ed25eed8c/substrate-rough-refraction-examples.png)

粗糙折射中的模糊效果使用近似值来表示场景中半透明元素背后的深度。

#### 不透明粗糙折射

Substrate涂层可以基于顶部涂层的粗糙度和厚度来模糊下方的层。此折射类型对于性能的消耗更大，必须在项目设置的 **引擎（Engine）> 渲染（Rendering）** 类别下为项目启用。勾选 **Substrate不透明材质粗糙折射（Substrate opaque material rough refraction）** 框可启用此功能。

![Substrate不透明粗糙折射的项目设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a264110-08ba-4dec-9047-21d5bee34eb8/substrate-opaque-rough-refraction-project-setting.png)

下面的图表展示了一个使用不透明材质粗糙折射的示例，在不透明棋盘格上使用带有透明涂层的垂直分层材质。

![使用带有Substrate的不透明材质粗糙折射的示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46f96030-80b0-4a14-aa4b-12899133c1ea/substrate-rough-refraction-graph-inputs.png)

**粗糙度（Roughness）** 和 **厚度（Thickness）** 参数将确定应用于底部材质层的模糊程度。增加任一值会增加折射的模糊程度。

你可以在下面的示例中看到这一点，其中左侧的透明涂层顶层的粗糙度和厚度为0.1。右侧示例的粗糙度为0.8，厚度为6，从而导致底层变模糊。

![Substrate粗糙折射厚度示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fe016ac-9beb-41dc-b8be-e8ae48db315b/substrate-rough-refractioin-thickness-example.png)

### 次表面散射和参与介质

Substrate Slab包含参与介质，可以用于模拟各种体积外观。

如果仅渲染不透明材质，当Slab位于材质拓扑底部时，会考虑将其用于次表面散射。此时将考虑两种情况：

-   如果将[次表面轮廓](/documentation/zh-cn/unreal-engine/subsurface-profile-shading-model-in-unreal-engine)指定给材质细节面板中的某个Slab，每个像素将只考虑一个轮廓。请记住，次表面轮廓 **不可** 混合。
-   如果没有指定次表面轮廓，散射将由Slab的散射反照率（DiffuseAlbedo）和次表面轮廓平均自由程（SSS MPF）属性决定。这些属性可以混合。

次表面散射的 **MFP** （即平均自由程）是不同光波长在遇到碰撞之前将穿透介质的距离（以厘米为单位）。下方示例从左到右显示了散射反照率（DiffuseAlbedo）（白色）和 **次表面散射平均自由程（SSS MFP）** （红色）从0到1进行缩放。

![Substrate MFP从0到1进行缩放。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21135cf6-d9ae-4013-b3d5-0880be29cb3e/substrate-mfp-values.png)

所有不在不透明材质底部（或在在半透明材质中使用）的Slab，都将考虑用于体积表示，同样要依靠散射反照率（DiffuseAlbedo）和次表面散射平均自由程（SSS MFP）属性。散射反照率（DiffuseAlbed）表示将单次和多次散射都考虑在内的介质基础颜色

**次表面散射平均自由程（SSS MFP）** 属性可用于控制介质垂直于表面视图的透射率，它表示下方表面的可见度。

![示例的SubstrateSSS MFP网格。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b990f71e-6439-48cc-b01a-6e40f1752765/substrate-sss-mfp-grid-examples-1.png)

透射率颜色从左到右从黑色过渡到蓝色，散射反照率（DiffuseAlbedo）从下到上从黑色过渡到白色的材质示例。

将Slab彼此垂直叠加类似于一种涂层运算。底Slab的可视性取决于顶Slab的透射率。可以降低顶Slab的覆盖范围（例如在小水坑的边缘），使其逐渐消失。这可以使用 **Coverage Weight** 运算符节点实现的，类似于Alpha混合。

![示例的SubstrateSSS MFP网格。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90e95280-3f11-4cee-b331-9ffb3de18d23/substrate-sss-mfp-grid-examples-2.png)

透射率范围从左到右从黑色向蓝色变化，覆盖范围从下到上从0过渡到1的材质示例。

要实现特定透射率或散射颜色，你应该使用 **Substrate Transmittance-To-MeanFreePath** 辅助节点。派生MFP是为了在沿法线的垂直方向查看表面时，使 **透射率颜色（TransmittanceColor）** 在法线入射处匹配。

下方示例显示了粉色不透明材质上的蓝色次表面散射，其中次表面散射平均自由程（SSS MFP）从透射率颜色派生。

![使用Substrate Transmittance-To-MeanFreePath次表面散射的示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a92dfea-b560-4645-ac07-f8551439b5cc/substrate-transmittance-to-mfp.png)

为了实现特定透射率颜色，不建议直接控制MFP，因为MFP不是一种颜色，而是对光传播的测量。从美术师的角度来看，MFP与次表面散射颜色之间的关系是非直观、非线性的。

### 半透明与混合模式

Substrate提供了更强大的半透明表面着色选择，优于传统非Substrate材质。在考虑由物质（Substrate Slab）构成的表面时，[Substrate混合模式](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)列表更具合理性。

要创建半透明材质，请执行以下操作：

1.  选择支持半透明的 **混合模式（Blend Mode）** 。
    -   不透明
    -   遮罩
    -   半透明彩色透射率
    -   半透明灰色透射率
    -   仅彩色透射率
    -   Alpha维持
2.  选择Material Root节点后，使用 **细节（Details）** 面板选择 **光照模式（Lighting Mode）** 。从以下选项中选择：
    -   表面前向着色
    -   表面半透明体积 — 此选项支持表面上的反射。
    -   体积非定向 — 使用起来更经济实惠，但不反射光线。

下面是半透明Substrate材质的示例设置。其混合模式设置为 **TranslucentColoredTransmittance** ，并使用 **表面前向着色（Surface ForwardShading）** 光照模式。它使用传递到Material Root节点的正面材质（Front Material）引脚的单一Slab，生成具有不透明外观的半透明材质。

![不透明的半透明Substrate材质示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87237f3c-310c-421f-912e-713c3ee96e3d/substrate-translucent-opaque-example.png)

在Slab和正面材质输入之间使用 **Substrate Coverage Weight** 运算符可控制材质的透射率。使用Substrate Coverage Weight节点上的 **权重（Weight）** 输入可控制材质的透明程度。

![透明的半透明Substrate材质示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf7e1017-9087-44e6-86b1-f212122061bb/substrate-translucent-material-example.png)

你可以使用0到1的常量值来控制整个材质的不透明度（如上所示），或使用纹理（如下所示）控制部分材质。

![遮罩的半透明Substrate材质示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a3b3657-4e55-4de9-be45-bb67ebaeda5a/substrate-translucent-masked-example.png)

如果想创造类似彩色玻璃的物质Slab，则需要进一步指定参与介质的自由程。这需要使用 **Transmittance-To-MeanFreePath** 辅助节点设置，如以下示例所示，使用连接到次表面散射平均自由程（SSS MFP）的透射率颜色（TransmittanceColor），仅在透光的区域将材质着色为橙色。指定的透射率颜色（TransmittanceColor）是"目标"颜色，它在提供的厚度输入处达到（默认值为0.01厘米）

![用于遮罩的半透明Substrate材质的彩色透射率示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1499fc2e-11c0-4fb7-a1b5-9d5896dd81e3/substrate-colored-transmittance-to-mfp.png)

#### 关于Substrate半透明的其他说明

-   虽然Slab被视为参与介质的体积，但半透明材质不支持屏幕空间次表面散射。

## Substrate调试视图模式

使用Substrate时，查看其材质的性能如何以及哪些值得更多关注，会很有用。Substrate的调试可视化模式位于 **视图模式（View Modes）** 下拉列表中的 **Substrate（Substrate）** 类别下。

![在关卡编辑器中选择Substrate调试视图模式。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2145b48-da30-4881-9e5e-bd38370a951c/substrate-view-modes-menu.png)

Substrate包括用于调试的以下可视化模式：

在表中点击查看大图。

调试可视化

调试可视化名称

说明

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f490197-3df6-45d8-ad0a-46aba8ddd4ee/substrate-vm-material-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f490197-3df6-45d8-ad0a-46aba8ddd4ee/substrate-vm-material-properties.png)

**材质属性（Material Properties）**

可视化鼠标光标下的Substrate属性。将鼠标悬停在你想检查的像素上，将能够看到用于光照的最终封装材质闭包，例如属性、彩色权重、启用的材质特性、使用的字节等。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f32ce59d-0814-45a2-ad56-924fd7240a37/substrate-vm-material-count.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f32ce59d-0814-45a2-ad56-924fd7240a37/substrate-vm-material-count.png)

**材质数量（Material Count）**

可视化每像素的Substrate材质数量，并根据它们正在使用的BSDF Slab节点数量给像素着色。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/043a56c6-b372-4d8a-9651-12bf6abe9833/substrate-vm-material-bytes-count.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/043a56c6-b372-4d8a-9651-12bf6abe9833/substrate-vm-material-bytes-count.png)

**材质字节数量（Material Bytes Count）**

可视化每像素的Substrate材质占用量。材质按它们正在使用的字节数量进行颜色编码。你还可以将鼠标悬停在材质上，查看材质的逐像素字节数。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dedac009-2725-4b7a-9037-cd60275fd3ff/substrate-vm-substrate-info.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dedac009-2725-4b7a-9037-cd60275fd3ff/substrate-vm-substrate-info.png)

**Substrate信息（Substrate Info）**

此模式汇总了有关项目中Substrate使用情况的信息，包括有关最大内存使用情况、逐像素最大字节数（适合用于设置简化阈值）和启用的Substrate特性的信息。

Substrate高级视图模式

 

 

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95fd183c-62a7-4aba-a2e5-c1d486fa0ebe/substrate-vm-advanced-material-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95fd183c-62a7-4aba-a2e5-c1d486fa0ebe/substrate-vm-advanced-material-properties.png)

**高级材质属性（Advanced Material Properties）**

报告当前光标下的材质所含不同Substrate Slab的信息。 每块Slab在屏幕上单独表示。

此视图模式必须在"项目设置（Project Settings）"的 **引擎（Engine）> 渲染（Rendering）** 类别下通过复选框 **Substrate高级可视化着色器（Substrate advanced visualization shaders）** 启用。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6aac691a-0a60-4594-abba-1c8481cbf103/substrate-vm-material-classification.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6aac691a-0a60-4594-abba-1c8481cbf103/substrate-vm-material-classification.png)

**材质分类（Material Classification）**

此模式按图块显示材质复杂度，并返回颜色编码的结果：

-   **绿色** 表示简单的Slab旧版Disney式材质。
-   **黄色** 表示具有特性但不使用各向异性的单一Slab材质。
-   **红色** 表示在图块中已混合或已分层，或具有各向异性的多Slab材质。

你可以查看Slab节点，看看它是 **简单（Simple）** 、 **单个（Single）** 还是 **复杂（Complex）** ，大致了解Substrate材质的复杂度。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1a2154f-5ec8-4b6a-a1bc-332fa0299e3d/substrate-classification-on-slabs.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1a2154f-5ec8-4b6a-a1bc-332fa0299e3d/substrate-classification-on-slabs.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/842b4638-727c-4432-b4f9-6c88ece36687/substrate-vm-rough-reference-classification.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/842b4638-727c-4432-b4f9-6c88ece36687/substrate-vm-rough-reference-classification.png)

**粗糙折射分类（Rough Refraction Classification）**

此模式显示使用不透明粗糙折射属性的材质。此模式还区分启用或禁用了次表面散射的Substrate材质。

其中一些可视化模式中显示的图块用于稍后运行优化的后期光照通道。这些适合用于优化Substrate材质，可减少使用的Slab数、启用的特性数量，以及[在运算符上使用参数混合](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%90%E7%AE%97%E7%AC%A6%E7%9A%84%E5%8F%82%E6%95%B0%E6%B7%B7%E5%90%88)。

如果一种材质由多种材质混合和层层叠加，但对于给定像素只有一个Slab可见（由于动态遮罩或低透射率值），则不可见的Slab在可视化中不会显示（或被优化掉）。

## 局限性和已知问题

-   Substrate是实验功能，因此不建议将其用于生产工作。
-   平台支持和测试目前不完整。随着它依次转入测试版和可投入使用状态，将扩大测试覆盖范围。
-   功能和UX可能会发生改变，现有资产可能会表现出不同的行为，或完全失效。
-   使用 **移动前向着色（Mobile Forward Shading）** 时支持移动平台。
-   对路径追踪器的试验性支持。
-   一些平台和渲染路径会出现问题，甚至可能完全不工作，例如DirectX 11 (DX11)和Mac。

## 其他资源

-   [虚幻引擎中材质的未来 - GDC 2023](https://www.youtube.com/watch?v=joOIBteSo1w)
-   [虚幻直播的状态](https://www.youtube.com/watch?v=teTroOAGZjM&t=8982s) — Timestamp: 02:29:42
-   [内容示例](https://www.fab.com/listings/4d251261-d98c-48e2-baee-8f4e47c67091)项目包括名为"SubstrateMaterials"的关卡，其中你可以浏览关于Substrate材质运作方式的不同示例和演示。
    
    将Substrate用于内容示例项目时，需要为项目启用Substrate。只有此地图经验证可在启用Substrate的情况下使用。如果你仅使用内容示例项目的单个实例，建议仅为此关卡启用Substrate，而在使用项目其余部分时一律禁用。
    

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [shaders](https://dev.epicgames.com/community/search?query=shaders)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用Substrate](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%90%AF%E7%94%A8substrate)
-   [可选项目设置和控制台变量](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%8F%AF%E9%80%89%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE%E5%92%8C%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
-   [转换旧版材质](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E6%97%A7%E7%89%88%E6%9D%90%E8%B4%A8)
-   [Substrate与材质层的关系](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E4%B8%8E%E6%9D%90%E8%B4%A8%E5%B1%82%E7%9A%84%E5%85%B3%E7%B3%BB)
-   [处理Substrate材质](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%A4%84%E7%90%86substrate%E6%9D%90%E8%B4%A8)
-   [SubstrateMaterial Root节点](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substratematerialroot%E8%8A%82%E7%82%B9)
-   [Substrate混合模式](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)
-   [Substrate Slab](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrateslab)
-   [Substrate材质节点](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E6%9D%90%E8%B4%A8%E8%8A%82%E7%82%B9)
-   [SubstrateBSDF节点](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substratebsdf%E8%8A%82%E7%82%B9)
-   [Substrate运算符节点](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E8%BF%90%E7%AE%97%E7%AC%A6%E8%8A%82%E7%82%B9)
-   [Substrate Coverage Weight](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substratecoverageweight)
-   [Substrate Horizontal Layer](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substratehorizontallayer)
-   [Substrate Vertical Layer](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrateverticallayer)
-   [Substrate Add](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrateadd)
-   [Substrate构建块节点](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E6%9E%84%E5%BB%BA%E5%9D%97%E8%8A%82%E7%82%B9)
-   [Substrate额外节点](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E9%A2%9D%E5%A4%96%E8%8A%82%E7%82%B9)
-   [Substrate辅助节点](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E8%BE%85%E5%8A%A9%E8%8A%82%E7%82%B9)
-   [关于Substrate节点的其他节点](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%85%B3%E4%BA%8Esubstrate%E8%8A%82%E7%82%B9%E7%9A%84%E5%85%B6%E4%BB%96%E8%8A%82%E7%82%B9)
-   [Substrate统计数据面板](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE%E9%9D%A2%E6%9D%BF)
-   [使用运算符进行参数混合](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%90%E7%AE%97%E7%AC%A6%E8%BF%9B%E8%A1%8C%E5%8F%82%E6%95%B0%E6%B7%B7%E5%90%88)
-   [金属度和高光度响应](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E9%87%91%E5%B1%9E%E5%BA%A6%E5%92%8C%E9%AB%98%E5%85%89%E5%BA%A6%E5%93%8D%E5%BA%94)
-   [粗糙折射](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E7%B2%97%E7%B3%99%E6%8A%98%E5%B0%84)
-   [半透明粗糙折射](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E%E7%B2%97%E7%B3%99%E6%8A%98%E5%B0%84)
-   [不透明粗糙折射](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E4%B8%8D%E9%80%8F%E6%98%8E%E7%B2%97%E7%B3%99%E6%8A%98%E5%B0%84)
-   [次表面散射和参与介质](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E6%AC%A1%E8%A1%A8%E9%9D%A2%E6%95%A3%E5%B0%84%E5%92%8C%E5%8F%82%E4%B8%8E%E4%BB%8B%E8%B4%A8)
-   [半透明与混合模式](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%8D%8A%E9%80%8F%E6%98%8E%E4%B8%8E%E6%B7%B7%E5%90%88%E6%A8%A1%E5%BC%8F)
-   [关于Substrate半透明的其他说明](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%85%B3%E4%BA%8Esubstrate%E5%8D%8A%E9%80%8F%E6%98%8E%E7%9A%84%E5%85%B6%E4%BB%96%E8%AF%B4%E6%98%8E)
-   [Substrate调试视图模式](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#substrate%E8%B0%83%E8%AF%95%E8%A7%86%E5%9B%BE%E6%A8%A1%E5%BC%8F)
-   [局限性和已知问题](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%B1%80%E9%99%90%E6%80%A7%E5%92%8C%E5%B7%B2%E7%9F%A5%E9%97%AE%E9%A2%98)
-   [其他资源](/documentation/zh-cn/unreal-engine/overview-of-substrate-materials-in-unreal-engine#%E5%85%B6%E4%BB%96%E8%B5%84%E6%BA%90)