# 虚幻引擎中的混合空间 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:27.423Z

---

目录

![混合空间](https://dev.epicgames.com/community/api/documentation/image/63354113-ec6f-496b-8845-1e9a9e5141fd?resizing_type=fill&width=1920&height=335)

混合空间是一种资产，允许混合多个动画或姿势，方法是将其绘制到一维或二维图表中。然后，该图表可以在[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中进行引用，其中混合通过Gameplay输入或其他变量进行控制。通过使用混合空间，几乎所有类型的混合布局都可以用于你的动画。

本文档概述了混合空间、其不同类型及其设置。

#### 先决条件

-   你的项目有一个 **骨骼网格体（Skeletal Mesh）** ，其中导入了各种方向性或类似 **动画序列（Animation Sequences）** 。

## 混合空间概述

混合空间是一种资产，你可以在其中沿图表上的各个点指定动画，称为 **示例（samples）** 。总体动画通过基于每个轴的输入值在图表上的点之间混合来计算。例如，可以创建一个在方向性移动和空闲动画之间混合的移动系统。

![混合空间概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7506bfa6-2bcb-4aee-832c-842d99b34dd6/overview.gif)

## 混合空间创建和类型

有不同类型的混合空间，它们在资产编辑器中或针对它们在[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中的使用方式提供了不同的功能。

以下混合空间类型可以通过点击"内容浏览器（Content Browser）"中的 **添加(+)（Add (+)）** 按钮并从 **动画（Animation）** 菜单进行选择来创建：

-   **瞄准偏移（Aim Offset）**
-   **瞄准偏移1D（Aim Offset 1D）**
-   **混合空间（Blend Space）**
-   **混合空间1D（Blend Space 1D）**

![创建混合空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77fd3eac-16f4-41f2-9fc3-5e295a47331c/creation.png)

### 混合空间

常规混合空间是混合空间的基本种类，用于提供沿图表混合动画的所有主要功能。它们旨在作为基础层在动画蓝图中进行引用，次要动画将从中延续。

![混合空间类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ae8b386-d8de-42cb-9e83-abf16d145b75/typeblend.png)

### 瞄准偏移

瞄准偏移是混合控件，旨在包含网格体空间叠加动画作为其示例。通常，这些用于创建武器或其他"看向"瞄准混合空间。瞄准偏移动画蓝图节点旨在随法线轴输入一起接收输入姿势

![瞄准偏移类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37ceb703-0365-4293-a389-be98612e1f60/typeaim.png)

请参阅[瞄准偏移](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine)页面，了解有关如何使用它们的更多信息。

[](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine)

[![瞄准偏移](images/static/document_list/empty_thumbnail.svg)](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine)

[瞄准偏移](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine)

[瞄准偏移是一种使用叠加姿势的混合空间，通常用于创建瞄准空间。](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine)

### 1D

混合空间和瞄准偏移都还支持单轴（1D）变体。通常，这些混合空间在你只需要单个轴混合时使用。对于混合空间1D或瞄准偏移1D的情况，图表仅提供水平轴。

![混合空间1D](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/018a65a9-0bb0-4f5e-8e1e-4043df0671ce/1danim.png)

尽管1D混合空间可用，但普通2D图表也可用于一维方式，方法是仅将单个轴用于你的示例放置。这样一来，你可以根据需要将混合空间从1D扩展到2D。

## 混合空间设置

创建并打开你的混合空间类型后，请继续进行以下设置。

### 定义轴名称和范围

在大部分情况下，你需要定义混合空间中使用的轴的名称和值范围。为此，请导航至 **资产细节（Asset Details）** 面板，并更改位于 **轴设置（Axis Settings）** 类别中的以下属性：

-   **名称（Name）**
-   **最小轴值（Minimum Axis Value）**
-   **最大轴值（Maximum Axis Value）**

![混合空间轴值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db00eef5-87d0-4f9d-9a6d-d3c36ea8d5c7/axis.png)

根据混合空间的类型，如果你要创建瞄准偏移，并且希望网格匹配旋转值，那么你可能需要使用不同的值比例，例如 **\-90** 到 **90** 或 **\-180** 到 **180**。

### 将动画添加到图表

你可以将动画从 **资产浏览器（Asset Browser）** 或 **内容浏览器（Content Browser）** 拖到图表中，以向图表填充动画。按住 **Shift** 键将使动画对齐到网格点，这对于对齐很有用。根据你要创建的混合空间种类，这些可以是循环动画或静态姿势。

![混合空间添加动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d033d99-a514-49d3-b7aa-12be2e88dda6/addanims.gif)

由于1D混合空间只有一个轴用于输入，你只能沿该单个轴应用动画。

![混合空间1D图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5b33430-ac51-4ac5-8dd4-95867962a795/1danim.png)

在这个例子中，垂直和水平轴分别映射到方向和速度。然后，将设置多个基于周期的动画以基于这些输入的值进行相应混合，生成你在游戏内看到的最终姿势。

![混合空间图表轴](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05f3f453-4cdf-4b72-b374-889ada17f998/axis2.png)

### 在动画蓝图中引用

完成图表后，你可以引用和操控[动画蓝图中的混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-animation-blueprints-in-unreal-engine)。要添加混合空间，请右键点击 **AnimGraph** 并找到你的混合空间。你还可以从 **内容浏览器（Content Browser）** 将其拖入图表中。这样做会创建引用该资产的 **混合空间播放器**

![混合空间动画蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a0ac5d8-915d-4859-ac66-606d1714cd74/animbp1.png)

请参阅[在动画蓝图中使用混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-animation-blueprints-in-unreal-engine)页面，了解有关使用[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中的混合空间的更多信息。

[](/documentation/zh-cn/unreal-engine/blend-spaces-in-animation-blueprints-in-unreal-engine)

[![在动画蓝图中使用混合空间](images/static/document_list/empty_thumbnail.svg)](/documentation/zh-cn/unreal-engine/blend-spaces-in-animation-blueprints-in-unreal-engine)

[在动画蓝图中使用混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-animation-blueprints-in-unreal-engine)

[在虚幻引擎动画蓝图中引用或创建混合空间的入门指南。](/documentation/zh-cn/unreal-engine/blend-spaces-in-animation-blueprints-in-unreal-engine)

## 编辑器概述

无论使用哪种混合空间类型，打开其中某个资产时都将显示以下编辑器：

![混合空间编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d821580-b7be-4c14-8af1-498c50c30f98/editoroverview.png)

1.  [**资产细节（Asset Details）**](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E8%B5%84%E4%BA%A7%E7%BB%86%E8%8A%82)，其中你可以设置该混合空间的属性和其他设置。
2.  **视口（Viewport）** ，其中根据图表显示骨骼网格体和当前播放的动画。
3.  **资产浏览器（Asset Browser）** ，可用作方便的位置来将动画拖入图表中。
4.  [**混合图表（Blend Graph）**](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E6%B7%B7%E5%90%88%E5%9B%BE%E8%A1%A8)，其中你可沿一维或二维图表绘制动画，并预览混合功能。

### 资产细节

"资产细节（Asset Details）"面板包含此混合空间资产的属性和其他设置。

![资产细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aae1c395-29cd-4bf8-87ee-96ef3b03d18d/assetdetails.png)

名称

说明

**使用网格（Use Grid）**

启用此项将使用旧版网格模式进行混合，而不是默认三角剖分方法。通常，你只会在执行特定混合布局（例如，使用封装输入）时才会使用网格。否则，在大部分情况下，你应该将此项保持禁用状态，而改为使用三角剖分，以获得更准确的混合结果。

**首选三角剖分方向（Preferred Triangulation Direction）**

控制示例之间的三角剖分混合角度。这仅会影响以均匀方式放置的示例，并且仅在禁用 **使用网格（Use Grid）** 时才会影响。

-   **无（None）** 将使三角形在整个图表中都有相同的角度。通常，如果你要创建对称混合空间，则不应该选择此选项，因为混合结果在每一边都不同。
    
    ![三角剖分方向无](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d000a47-2131-4fc1-9fd2-edb1fe732976/trianglenone.png)
    
-   **切线（Tangential）** 将使三角形从图表原点朝外。
    
    ![三角剖分方向切线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fef41411-d471-4e48-9b88-9ec32244048a/triangletangential.png)
    
-   **径向（Radial）** 将使三角形朝内指向图表原点。
    
    ![三角剖分方向径向](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bbe37b7-0e54-4896-a271-f3419b16d800/triangleradial.png)
    

**要缩放动画的轴（Axis to Scale Animation）**

如果使用了 **平滑时间（Smoothing Time）**，则此项指定要在其上缩放动画播放速度的轴。在大部分情况下，这将用于你会在其中指定速度的轴的移动动画。

**名称（Name）**

要在混合图表中以及混合空间动画蓝图节点上显示的轴的名称。

**最小轴值（Minimum Axis Value）**

此轴的最小显示值。

**最大轴值（Maximum Axis Value）**

此轴的最大显示值。

**网格划分（Grid Divisions）**

此轴上的划分数。此处的值越高，生成的混合结果就越精确。奇数带来的混合结果也会不同于偶数的结果。如果禁用 **使用网格（Use Grid）**，则此项将仅导致网格的外观更改。

**对齐到网格（Snap to Grid）**

在沿此轴移动动画点时启用到 **网格划分（Grid Divisions）** 的对齐。按住 **Shift** 键还会临时启用所有轴的对齐。

**封装输入（Wrap Input）**

启用此项时，此轴的输入值可以超出 **最小（Minimum）** 和 **最大轴值（Maximum Axis Values）** 。发生此情况时，混合空间会将该轴视为循环，并将输入转换为另一端的逆值。如果启用此属性，请确保该轴任一端的动画都类似，以防止停顿。

**平滑时间（Smoothing Time）**

此轴在不同输入之间混合的时间，以秒为单位。值为 **0** 将导致发生无时间混合。你可以观察辅助十字准星独立于预览点的移动过程来预览图表中的混合。

![平滑时间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fd74c69-fe56-4719-aa53-e277ed0d726a/smoothingtime.gif)

**平滑类型（Smoothing Type）**

确定在使用平滑时间时会使用哪个缓动函数。你可以从以下选项中进行选择：

-   平均（Averaged）
-   线性（Linear）
-   立方体（Cubic）
-   慢入/慢出（Ease In/Out）
-   指数波
-   弹簧阻尼系统（Spring Damper）

**阻尼比（Damping Ratio）**

使用 **弹簧阻尼系统（Spring Damper）** 作为 **平滑类型（Smoothing Type）** 时，这将确定有多少阻尼。值小于 **1** 会导致过冲，这可能会使一些动作看起来更自然。

![混合空间阻尼比](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68764317-de69-4a47-a9e1-748b8ca32e29/damping.gif)

**最大速度（Max Speed）**

平滑时此轴值的最大变化速度。仅在 **平滑类型（Smoothing Type）** 设置为 **弹簧阻尼系统（Spring Damper）** 或 **指数波（Exponential）** 时使用。如果设置为 **0** ，则混合速度可以是无限的。

**分析（Analysis）**

你可以指定要针对每个轴用于分析示例并自动将其放置在混合空间中的函数。请参阅[混合空间分析](/documentation/zh-cn/unreal-engine/automatic-blend-space-creation-in-unreal-engine)页面，了解更多信息。

[](/documentation/zh-cn/unreal-engine/automatic-blend-space-creation-in-unreal-engine)

[![混合空间分析](images/static/document_list/empty_thumbnail.svg)](/documentation/zh-cn/unreal-engine/automatic-blend-space-creation-in-unreal-engine)

[混合空间分析](/documentation/zh-cn/unreal-engine/automatic-blend-space-creation-in-unreal-engine)

[使用混合空间分析准确计算并放置你的混合空间示例。](/documentation/zh-cn/unreal-engine/automatic-blend-space-creation-in-unreal-engine)

**混合示例（Blend Samples）**

此分段列示混合空间中涉及的所有示例，允许修改或删除其细节。你还可以右键点击混合图表中的示例来预览这些相同属性。

**权重速度（Weight Speed）**

这将控制单独的示例权重可以变化的速度。值为 **2.0** 表示示例的权重可以在半秒内从0变化到1。值为 **0.0** 会禁用该功能，除非你使用 **每个骨骼覆盖（Per Bone Overrides）** 。一般来说，不要将此项与 **平滑时间（Smoothing Time）** 或 **平滑类型（Smoothing Type）** 一起使用。

**平滑（Smoothing）**

启用权重速度的慢入和慢出。一般来说，不要将此项与 **平滑时间（Smoothing Time）** 或 **平滑类型（Smoothing Type）** 一起使用。

**每个骨骼覆盖（Per Bone Overrides）**

这是一个数组，你可以在其中指定骨骼按不同速度混合的不同权重速度。此处指定的骨骼还将包括所有后代。

**预览基本姿势（Preview Base Pose）**

如果你要在混合空间或瞄准偏移中使用叠加动画，则可以在此处指定基本动画以从中预览叠加动画。

**通知触发器模式（Notify Trigger Mode）**

此混合空间用于控制[动画通知](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine)如何在多个示例之间混合时触发的当前模式。你可以从以下选项中进行选择：

-   **所有动画（All Animations）** ，这将触发所有通知。
-   **最高权重动画（Highest Weighted Animation）** ，这将仅触发来自权重最高的示例的通知。
-   **无（None）** ，这将导致不触发通知。

### 混合图表

混合图表是混合空间中的主要交互面板。你将在此处放置和操控动画示例，预览混合行为，并调试混合问题。

![混合空间图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e1d2bd0-476a-41f7-9ec4-4da72432bd2e/blendgraph.png)

#### 工具栏

点击 **显示三角剖分（Show Triangulation）** 会启用或禁用三角剖分视图。仅当在 **资产细节（Asset Details）** 面板中禁用 **使用网格（Use Grid）** 时才会显示此按钮，它会启用三角剖分作为混合方法。

![混合空间三角剖分](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff15b421-b299-4b6d-9ae0-29109363d22f/showtriangulation.gif)

点击 **显示示例（Show Samples）** 将使每个示例显示其名称。

![混合空间示例名称](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70743913-92be-4a9d-94b6-a338ea945e78/showsamples.png)

你可以点击 **拉伸网格以适应（Stretch Grid to Fit）** 来拉伸图表以适应面板。禁用此项将使图表基于每个轴范围维持相对比例。

![混合空间图表拉伸](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af618821-774b-4e5e-b920-08ac3a0e89c9/stretch.gif)

如果选择示例，它将在工具栏中显示其轴坐标，并可以对其进行操控。

![混合空间示例值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfb4f668-2a2c-4cc4-95ae-ee3ed34c47c1/sampletoolbar.png)

这些工具栏设置还可通过右键点击图表，在上下文菜单中访问。

![混合空间图表上下文菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13761512-815e-4857-8b03-7b7dc3dbe950/toolbarcontext.png)

#### 交互

可以在图表中拖动示例来移动示例。按住 **Shift** 键会将它们对齐到该轴的 **网格划分（Grid Divisions）** 属性中定义的网格增量。

![混合空间移动示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e276206c-d8e4-4d5f-a7dd-3dff653eecd3/interaction1.gif)

右键点击示例将显示上下文菜单，你可以在其中编辑其 **混合示例（Blend Sample）** 属性。

![混合空间示例上下文菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/847e2854-8b97-440f-a36a-90b183553938/toolbarcontext2.png)

#### 预览

按住 **CTRL** 键并在图表中移动光标将在该位置（由绿色十字准星标记）预览混合。如果你要使用 **平滑时间（Smoothing Time）** 属性，则还将显示辅助绿色十字准星，以允许同时预览目标位置和平滑。

![预览混合空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/808098ee-e822-450e-ba13-3c8236518a34/previewing1.gif)

按住 **CTRL + ALT** 键还将启用影响显示，你可以在其中看到相对于预览点的不同示例权重。

![混合空间预览影响](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7996c2c-3db6-410a-baa2-fb3b9f21dc8b/previewing2.gif)

#### 调试

如果示例的放置方式使其导致点之间的三角剖分非常细，则该三角形将显示为红色，表示应该对其进行调整。通常，在执行[混合空间分析](/documentation/zh-cn/unreal-engine/automatic-blend-space-creation-in-unreal-engine)时可能会发生此情况。

![混合空间调试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/925cd41c-b99a-4d30-97ac-ea15e51c085b/error1.png)

如果启用 **使用网格（Use Grid）** ，则放置不妥的示例将在示例点周围显示红色高亮来指示该错误。这还指示高亮显示的示例将不会对混合空间正确做出贡献。

![混合空间调试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a09bd79-1452-47b7-bca8-51f60956877c/error2.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [混合空间概述](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E6%B7%B7%E5%90%88%E7%A9%BA%E9%97%B4%E6%A6%82%E8%BF%B0)
-   [混合空间创建和类型](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E6%B7%B7%E5%90%88%E7%A9%BA%E9%97%B4%E5%88%9B%E5%BB%BA%E5%92%8C%E7%B1%BB%E5%9E%8B)
-   [混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E6%B7%B7%E5%90%88%E7%A9%BA%E9%97%B4)
-   [瞄准偏移](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E7%9E%84%E5%87%86%E5%81%8F%E7%A7%BB)
-   [1D](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#1d)
-   [混合空间设置](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E6%B7%B7%E5%90%88%E7%A9%BA%E9%97%B4%E8%AE%BE%E7%BD%AE)
-   [定义轴名称和范围](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E5%AE%9A%E4%B9%89%E8%BD%B4%E5%90%8D%E7%A7%B0%E5%92%8C%E8%8C%83%E5%9B%B4)
-   [将动画添加到图表](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E5%B0%86%E5%8A%A8%E7%94%BB%E6%B7%BB%E5%8A%A0%E5%88%B0%E5%9B%BE%E8%A1%A8)
-   [在动画蓝图中引用](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E5%9C%A8%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE%E4%B8%AD%E5%BC%95%E7%94%A8)
-   [编辑器概述](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E6%A6%82%E8%BF%B0)
-   [资产细节](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E8%B5%84%E4%BA%A7%E7%BB%86%E8%8A%82)
-   [混合图表](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E6%B7%B7%E5%90%88%E5%9B%BE%E8%A1%A8)
-   [工具栏](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [交互](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E4%BA%A4%E4%BA%92)
-   [预览](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E9%A2%84%E8%A7%88)
-   [调试](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E8%B0%83%E8%AF%95)