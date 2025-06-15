# 如何在虚幻引擎Niagara中创建光束效果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-create-a-beam-effect-in-niagara-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:32:21.911Z

---

目录

![光束效果](https://dev.epicgames.com/community/api/documentation/image/9c0b97a2-25c9-4c9c-a8cd-b839389acfca?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [启用Niagara插件](/documentation/zh-cn/unreal-engine/how-to-enable-the-niagara-effects-plugin-in-unreal-engine)

操作前提：本指南会用到Niagara插件资源中的默认条带材质（DefaultRibbonMaterial）。但是，假如你已经完成了[创建网格体气球效果](/documentation/zh-cn/unreal-engine/how-to-use-a-solid-mesh-to-create-a-balloon-effect-in-niagara-for-unreal-engine)教程，你可以使用其中的M\_Balloon材质。

在Niagara中，你需要结合使用条带渲染器以及特定模块（该模块用于指示条带为光束）。在本指南中，你将学习如何创建能够模拟光照的光束。

## 创建系统和发射器

在Niagara中，发射器和系统相互独立。目前推荐的工作流程是从现有发射器或发射器模板创建系统。

1.  首先，在内容浏览器（Content Browser）中右键点击，创建Niagara系统（Niagara System），并选择 **FX > Niagara系统（Niagara System）**。之后将显示Niagara发射器（Niagara Emitter）向导。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75a9c222-0015-4cb3-bc09-e11e0a83d62b/01-create-niagara-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75a9c222-0015-4cb3-bc09-e11e0a83d62b/01-create-niagara-system.png)
    
    点击查看大图。
    
2.  选择 **从选定发射器新建系统（New system from selected emitters）**。然后点击 **下一步（Next）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f315b65f-04ec-40c6-bb8e-9957a8c75025/02-new-system-from-selected-emitters.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f315b65f-04ec-40c6-bb8e-9957a8c75025/02-new-system-from-selected-emitters.png)
    
    点击查看大图。
    
3.  在 **模板（Templates）** 中，选择 **静态光束（Static Beam）**。点击加号按钮添加模板 (**+**)，然后点击 **完成（Finish）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a6923e4-64e6-4525-b722-bfde3c551266/03-select-static-beam-template.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a6923e4-64e6-4525-b722-bfde3c551266/03-select-static-beam-template.png)
    
    点击查看大图。
    
4.  将新系统命名为 **BeamSystem**。双击它，在Niagara编辑器中打开它。
    
    ![命名系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d30c8d7-7c07-4953-a2ce-6f415e542ee8/04-rename-system.png "Name System")
5.  将 **BeamSystem** 拖入关卡。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/816b33cc-59d4-41f4-9f9f-8d84d4bda08c/05-drag-system-into-level.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/816b33cc-59d4-41f4-9f9f-8d84d4bda08c/05-drag-system-into-level.png)
    
    点击查看大图。
    
    创建完粒子效果后，建议你将它拖入关卡中。这样你可以观察完整变化，并在环境中编辑效果。你对粒子系统做的任何改变，都会自动扩展给关卡中的其他系统实例。
    
6.  新系统中发射器实例的默认名称是 **静态光束（StaticBeam）**，但可以被重命名。在"系统概览"中点击发射器实例的名称，该字段将变为可编辑状态。将发射器命名为 **FX\_Beam**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac80019d-e11c-4081-ac83-72f1421230df/06-rename-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac80019d-e11c-4081-ac83-72f1421230df/06-rename-emitter.png)
    
    点击查看大图。
    

## 更改渲染器设置

**渲染组** 位于堆栈的最后，但是你需更改一些内容，以便效果按照预期的方式显示。

1.  在 **系统概述（System Overview）** 中，点击 **渲染器（Render）**，在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9e53e2b-b122-49c7-976d-28272ba4c58f/07-select-render-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9e53e2b-b122-49c7-976d-28272ba4c58f/07-select-render-group.png)
    
    点击查看大图。
    
    此系统中的发射器模板已经包含条带渲染器。在本指南的后面部分，你将添加特定模块，以便将指示条带作为光束使用。
    
2.  该渲染器使用的材质是 **默认条带材质（DefaultRibbonMaterial）**。如果你想使用其他材质，你可以点击下拉菜单，搜索并选择其他材质。
    
3.  如果你滚动到 **条带渲染（Ribbon Rendering）** 分段中的设置，你会找到一个名为 **曲面细分（Tessellation）** 的分段。在该分段中，将 **曲线张力（Curve Tension）** 设置为 **0.5**。这将影响光照效果的尖锐程度。你可以提高或降低该值，改变效果。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/671393d1-a311-4ea9-973c-322a987d4c48/08-set-curve-tension.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/671393d1-a311-4ea9-973c-322a987d4c48/08-set-curve-tension.png)
    
    点击查看大图。
    

## 编辑发射器更新组设置

首先，你在 **发射器更新（Emitter Update）** 组中编辑模块。这些是应用于发射器并更新每帧的行为。

1.  在 **系统概述（System Overview）** 中，点击 **发射器更新（Emitter Update）** 组，在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c81e512-1eba-4731-a339-9d2ec408910d/09-select-emitter-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c81e512-1eba-4731-a339-9d2ec408910d/09-select-emitter-update-group.png)
    
    点击查看大图。
    
2.  **静态光束** 发射器模板默认将 **生命周期模式（Life Cycle Mode）** 设置为 **自身（Self）** 。这意味着直接设置发射器的生命周期和循环行为，而不是由系统处理。对于此效果，你可以向值添加浮点，为 **循环时长（Loop Duration）** 添加一些随机性。点击 **循环时长（Loop Duration）** 下拉箭头，然后选择 **动态输入（Dynamic Inputs）> 随机范围浮点（Random Ranged Float）**。此操作将在循环时长（Loop Duration）中添加 **最小值（Minimum）** 和 **最大值（Maximum）** 字段。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb9b30d0-4174-41ca-8957-55f3d1bab484/10-set-loop-duration-to-random-range-float.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb9b30d0-4174-41ca-8957-55f3d1bab484/10-set-loop-duration-to-random-range-float.png)
    
    点击查看大图。
    
3.  将循环时长（Loop Duration）的最小值（Minimum）和最大值（Maximum）设置如下。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aca42c3-2ac9-43c0-ad4f-3143ff0d61c8/11-loop-duration-min-and-max.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aca42c3-2ac9-43c0-ad4f-3143ff0d61c8/11-loop-duration-min-and-max.png)
    
    点击查看大图。
    
    设置
    
    数值
    
    **最小值（Minimum）**
    
    0.1
    
    **最大值（Maximum）**
    
    0.2
    
4.  指示此效果使用光束的第一个模块是 **光束发射器设置（Beam Emitter Setup）** 模块。由于你从静态光束模板开始，因此已经包含此模块。对于 **光束开始（Beam Start）** 和 **光束结束（Beam End）**，保留默认值。选中复选框，启用 **绝对开始（Absolute Start）** 和 **绝对结束（Absolute End）**。
    
    光束的起始位置由场景中Niagara系统的位置决定。结束位置由"光束结束位置（Beam End）"中设置的静态坐标定义，可以通过直接修改数值来更改。在这篇教程的末尾，你将学习如何将光束的结束点连接至Actor。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07d1217a-cce5-4fca-8799-54dd652c0599/12-set-absolute-beam-start-and-end.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07d1217a-cce5-4fca-8799-54dd652c0599/12-set-absolute-beam-start-and-end.png)
    
    点击查看大图。
    
5.  要向效果中添加弧或者曲线，勾选复选框来启用 **使用光束切线（Use Beam Tangents）**。这样会显示 **光束开始切线（Beam Start Tangent）** 和 **光束结束切线（Beam End Tangent）** 设置。点击 **光束开始切线（Beam Start Tangent）** 的 **恢复默认设置（Reset to Default）** （黄色小箭头）图标来将数值更改为 **矢量使用浮点乘法（Multiply Vector by Float）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f1da4db-69e8-423a-b349-6ede5e503fc7/13-reset-beam-start-vector.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f1da4db-69e8-423a-b349-6ede5e503fc7/13-reset-beam-start-vector.png)
    
    点击查看大图。
    
6.  将光束开始切线（Beam Start Tangent） **矢量（Vector）** 和 **浮点（Float）** 设为以下数值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/646b4dd8-6858-400c-a37c-0917f7760513/14-set-beam-start-vector-and-float.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/646b4dd8-6858-400c-a37c-0917f7760513/14-set-beam-start-vector-and-float.png)
    
    点击查看大图。
    
    设置
    
    数值
    
    **矢量（Vector）**
    
    **X**：0，**Y**：0，**Z**：1
    
    **浮点（Float）**
    
    0.5
    
     
    
     
    
7.  将光束结束切线（Beam End Tangent）矢量（Vector）和浮点（Float）设置为以下数值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b05a947-0ded-479b-8cce-d7bc03679f60/15-set-beam-end-vector-and-float.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b05a947-0ded-479b-8cce-d7bc03679f60/15-set-beam-end-vector-and-float.png)
    
    点击查看大图。
    
    设置
    
    数值
    
    **矢量（Vector）**
    
    **X**：0，**Y**：0，**Z**：1
    
    **浮点（Float）**
    
    1
    
     
    
     
    
8.  在 **即时生成迸发（Spawn Burst Instantaneous）** 模块中，将 **生成计数（Spawn Count）** 值设置为 **35**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4776339-6ad8-49ca-aedc-ea229e4713ea/16-set-spawn-count.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b4776339-6ad8-49ca-aedc-ea229e4713ea/16-set-spawn-count.png)
    
    点击查看大图。
    

## 编辑粒子生成组设置

然后，你将在 **粒子生成（Particle Spawn）** 组中编辑模块。此为首次生成粒子时应用于粒子的行为。

1.  在 **系统概述（System Overview）** 中，点击 **粒子生成（Particle Spawn）** 组，在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/225b234e-46ca-46a6-9d50-a0cb298c0a65/17-select-particle-spawn-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/225b234e-46ca-46a6-9d50-a0cb298c0a65/17-select-particle-spawn-group.png)
    
    点击查看大图。
    
2.  在 **初始化粒子（Initialize Particle）** 模块中，找到 **生命周期（Lifetime）** 参数。生命周期参数确定粒子消失之前的显示时长。将 **生命周期（Lifetime）** 设置为 **0.2**。此短生命周期将导致光束闪烁，从而使光照显得更真实。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b07d169-5313-441a-8b0f-5275b8350f0d/18-set-lifetime.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b07d169-5313-441a-8b0f-5275b8350f0d/18-set-lifetime.png)
    
    点击查看大图。
    
3.  **生成光束（Spawn Beam）** 模块是第二个光束特定模块。你无需为此模块设置任何内容，只需保持当前状态。
    
4.  第三个光束特定模块为 **光束宽度（Beam Width）** 模块。光束宽度（Beam Width）设置为 **曲线中浮点（Float from Curve）**。点击第二个曲线键可显示时间（Time）和值（Value）字段。将 **时间（Time）** 设置为 **0.5**，将 **值（Value）** 设置为 **1**。要使形状看起来合适，请右键点击每个曲线键，并确保将其设置为 **自动（Auto）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c0c82c4-0bf3-4f30-adfe-3ab7832b0bf8/19-set-beam-width-template.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c0c82c4-0bf3-4f30-adfe-3ab7832b0bf8/19-set-beam-width-template.png)
    
    点击查看大图。
    
5.  在曲线图下方，你可以看到一些其他设置。将 **缩放曲线（Scale Curve）** 设置为 **5**。
    

## 编辑粒子更新组设置

现在，你将在 **粒子更新（Particle Update）** 组中编辑模块。此类行为将应用于发射器的粒子并更新每个帧。

1.  在 **系统概述（System Overview）** 中，点击 **粒子更新（Particle Update）** 组，在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd7f4481-6290-4bf6-befd-0d8cbe1b989f/20-select-particle-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd7f4481-6290-4bf6-befd-0d8cbe1b989f/20-select-particle-update-group.png)
    
    点击查看大图。
    
2.  对于 **颜色（Color）** 模块，将 **RGB** 值设置如下。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad99743d-62b9-4f20-bc12-2553e44ac99c/21-set-particle-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad99743d-62b9-4f20-bc12-2553e44ac99c/21-set-particle-color.png)
    
    点击查看大图。
    
3.  要断开曲线并使光束像闪电一样裂开跳跃，请点击 **粒子更新（Particle Update）** 的 **加号** （**+**）图标并选择 **位置（Location）> 抖动位置（Jitter Position）**，添加 **抖动位置（Jitter Position）** 模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79f3418c-fc2f-4f01-87a0-8735e5723afc/22-add-jitter-position-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79f3418c-fc2f-4f01-87a0-8735e5723afc/22-add-jitter-position-module.png)
    
    点击查看大图。
    
4.  为了使 **抖动位置（Jitter Position）** 模块正常运行，你需要更新光束（Update Beam）模块。点击 **粒子更新（Particle Update）** 的 **加号** （**+**）图标并选择 **光束（Beam）> 更新光束（Update Beam）**，添加 **更新光束（Update Beam）** 模块。在 **系统概述（System Overview）**中，将 **更新光束（Update Beam）** 模块拖到堆栈中 **抖动位置（Jitter Position）** 模块上方的位置。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa0a042c-472a-47c0-bc9c-076c94fac17c/23-add-update-beam-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa0a042c-472a-47c0-bc9c-076c94fac17c/23-add-update-beam-module.png)
    
    点击查看大图。
    
5.  现在回到 **抖动位置（Jitter Position）** 模块。**抖动量（Jitter Amount）** 的默认设置为 **10**，**抖动延迟（Jitter Delay）** 的默认设置为 **0.25**。但是，如果将 **抖动延迟（Jitter Delay）** 减小到 **0.1**，你将开始看到光束弯曲并呈角度锯齿状运动。如果值为 **0.1**，你仍然可以看到锯齿状光束下的原始弧形，这并非理想效果。要修复此问题，你必须将抖动延迟（Jitter Delay）设置为负数。将 **抖动延迟（Jitter Delay）** 设置为 **\-0.01**。将 **抖动量（Jitter Amount）** 设置为 **15**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe82742b-c696-43ae-9144-6745d75462a6/24-set-jitter-amount-and-delay.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe82742b-c696-43ae-9144-6745d75462a6/24-set-jitter-amount-and-delay.png)
    
    点击查看大图。
    

## 调整光束结束位置

你可以在 **光束发射器设置（Beam Emitter Setup）**模块中的 **发射器更新（Emitter Update）** 组里设置光束的开始和结束位置。默认情况下，光束的结束位置设为一个静止的世界位置数值，可以手动进行调整。

然而，很多时候我们需要将结束位置链接至场景中的一个Actor，这样我们就可以通过移动Actor来编辑光束的结束位置。可以使用蓝图来达到这样的目的，另一个更简单的办法是用暂存区（Scratch Pad）设置一个动态输入。

1.  点击 **光束发射器设置（Beam Emitter Setup）** 模块来在 **选择（Selection）** 面板中选择它。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/486bf4f2-9e8c-4b73-8468-4ba1825db3a4/25-select-beam-emitter-setup-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/486bf4f2-9e8c-4b73-8468-4ba1825db3a4/25-select-beam-emitter-setup-module.png)
    
    点击查看大图。
    
2.  点击 **光束结束位置（Beam End）** 旁边的下拉箭头，找到 **暂存（Scratch）** 然后选择 **新动态暂存输入（New Dynamic Scratch Input）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/844bf34d-25af-4101-a496-af5dc7c3e95a/26-set-beam-end-to-scratch-dynamic.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/844bf34d-25af-4101-a496-af5dc7c3e95a/26-set-beam-end-to-scratch-dynamic.png)
    
    点击查看大图。
    
3.  这样会打开一个初始的暂存区，包括一个输入和一个可以用来抓取数据的映射抓取（Map Get），还有一个输出。右键点击默认输入，选择 **移除引脚（Remove Pin）** ，我们不需要这个输入。
    
4.  点击加号按钮 (**+**) 来添加新的引脚。找到 **Actor** 然后选择 **新Actor组件界面（New Actor Component Interface）**。 这样会在选择你的Niagara物体时在 **关卡编辑器（Level Editor）** 的细节面板（Details Panel）\*\* 中添加一个区，用于选择你想要链接的物体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8020a27-6e8e-41e9-975b-3f3416cf60ad/27-add-actor-component-interface.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8020a27-6e8e-41e9-975b-3f3416cf60ad/27-add-actor-component-interface.png)
    
    点击查看大图。
    
5.  从**新Actor组件界面（New Actor Component Interface）** 拖出引脚。选择 **获取变换（Get Transform）**，这样会显示其链接物体的变换信息。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba105dc8-ba46-4771-bf75-2263f4545b72/28-add-get-transform.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba105dc8-ba46-4771-bf75-2263f4545b72/28-add-get-transform.png)
    
    点击查看大图。
    
6.  将位置数值连接至输出。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1ebe826-994a-48bd-89bb-ab7ec39503b3/29-connect-position-to-output.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1ebe826-994a-48bd-89bb-ab7ec39503b3/29-connect-position-to-output.png)
    
    点击查看大图。
    
7.  系统自动添加一个 **位置（Position） -> Vector3f** 节点。这样会将矢量变换为适用于大世界的坐标。你可以在画板上确保它们不重叠。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13be8369-40a4-4e8d-98c5-79269dbdf5ee/30-vector-3f.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13be8369-40a4-4e8d-98c5-79269dbdf5ee/30-vector-3f.png)
    
    点击查看大图。
    
8.  现在暂存已经完成了，要将变动传递回Niagara系统，需要点击 **应用（Apply）**.
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/109a08af-8c37-4942-8cf6-d2c66ee0fbce/31-apply-the-scratch.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/109a08af-8c37-4942-8cf6-d2c66ee0fbce/31-apply-the-scratch.png)
    
    点击查看大图。
    
9.  在Niagara编辑器中，再次选择 **光束发射器设置（Beam Emitter Setup）** 模块，会出现一个 **新Actor组件界面（New Actor Component Interface）** 并已经链接至 **光束结束位置（Beam End）** 。点击下拉箭头，选择 **制作（Make）** > **从新用户参数读取（Read from new User parameter）** 。 这样会创建一个新的可以在Niagara系统之外设置的用户参数。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba3a2a0d-4ab3-4888-8042-838e9077ca6a/32-set-component-interface-to-user-parameter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba3a2a0d-4ab3-4888-8042-838e9077ca6a/32-set-component-interface-to-user-parameter.png)
    
    点击查看大图。
    
10.  默认情况下，系统在创建用户参数时会用物体名称和参数名称命名，最终命名会比较长。前往参数（Parameters）面板可以重命名。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0bce4f3-6adb-4177-8b17-5712f533f4af/33-new-actor-component-user-parameter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0bce4f3-6adb-4177-8b17-5712f533f4af/33-new-actor-component-user-parameter.png)
    
    点击查看大图。
    
11.  Double-click to rename **New Actor Component Interface\_Beam End** to something shorter, such as **Beam\_End**.
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0c4ef64-33da-4bd5-ba5a-ce875ff96ff6/34-rename-user-parameter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0c4ef64-33da-4bd5-ba5a-ce875ff96ff6/34-rename-user-parameter.png)
    
    Click image for full size.
    
12.  保存你的Niagara系统，关闭编辑器便能返回至 **关卡编辑器（Level Editor）** 。你可以看到之前拖进关卡的光束系统。现在你可以拖动Niagara系统的起始点来移动光束的起始点，但是结束点是固定的。接下来我们要将其对接到场景中的一个物体上。
    
13.  首先，创建一个用于链接结束点的球体。在 **创建（Create）** 菜单，选择 **形状（Shapes） > 球体（Sphere）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c798342d-d878-40b7-a52a-12ce4ec8da00/35-create-new-sphere.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c798342d-d878-40b7-a52a-12ce4ec8da00/35-create-new-sphere.png)
    
    点击查看大图。
    
14.  在 **大纲（Outliner）** 中，选择你的球体并双击将其重命名为 **Sphere\_BeamEnd** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4eca1af8-9aed-4132-b461-02359da13f1e/36-rename-sphere.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4eca1af8-9aed-4132-b461-02359da13f1e/36-rename-sphere.png)
    
    点击查看大图。
    
15.  在 **大纲（Outliner）** 中，选择你的Niagara系统 **BeamSystem** 。在 **细节（Details）** 面板中，向下滚动至 **覆盖参数（Override Parameters）** 部分。在这里可以看到之前创建暂存模块时设置的用户参数 **Beam\_End** 。打开 **源Actor（Source Actor）** 下拉菜单，然后选择 **Sphere\_BeamEnd**。或者你也可以使用滴管工具在你的关卡中选择任何物体。现在你再去移动那个物体时，光束结束位置会跟随它移动。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1e891ca-7513-4f3a-af11-644f559a130a/37-set-sphere-in-override-parameters.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1e891ca-7513-4f3a-af11-644f559a130a/37-set-sphere-in-override-parameters.png)
    
    点击查看大图。
    

## 最终结果

恭喜！你已经创建了模拟光照的光束效果。在下面的视频中，你可以看到光照光束效果的示例。你可以将光束用于各种视觉效果：激光、武器射线、特斯拉线圈等。

![Beam Effect Final Result](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5018106a-ca87-4537-8b95-3a970f13e88a/beam-effect-final.gif)

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建系统和发射器](/documentation/zh-cn/unreal-engine/how-to-create-a-beam-effect-in-niagara-for-unreal-engine#%E5%88%9B%E5%BB%BA%E7%B3%BB%E7%BB%9F%E5%92%8C%E5%8F%91%E5%B0%84%E5%99%A8)
-   [更改渲染器设置](/documentation/zh-cn/unreal-engine/how-to-create-a-beam-effect-in-niagara-for-unreal-engine#%E6%9B%B4%E6%94%B9%E6%B8%B2%E6%9F%93%E5%99%A8%E8%AE%BE%E7%BD%AE)
-   [编辑发射器更新组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-beam-effect-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E5%8F%91%E5%B0%84%E5%99%A8%E6%9B%B4%E6%96%B0%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [编辑粒子生成组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-beam-effect-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E7%94%9F%E6%88%90%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [编辑粒子更新组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-beam-effect-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E6%9B%B4%E6%96%B0%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [调整光束结束位置](/documentation/zh-cn/unreal-engine/how-to-create-a-beam-effect-in-niagara-for-unreal-engine#%E8%B0%83%E6%95%B4%E5%85%89%E6%9D%9F%E7%BB%93%E6%9D%9F%E4%BD%8D%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/how-to-create-a-beam-effect-in-niagara-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)