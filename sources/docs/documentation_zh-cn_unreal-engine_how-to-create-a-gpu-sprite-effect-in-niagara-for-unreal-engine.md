# 如何在虚幻引擎的Niagara中创建GPU Sprite效果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-create-a-gpu-sprite-effect-in-niagara-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:31:44.284Z

---

目录

![GPU Sprite效果](https://dev.epicgames.com/community/api/documentation/image/5c766346-68a3-42e9-a85a-633beb0a727a?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [启用Niagara插件](/documentation/zh-cn/unreal-engine/how-to-enable-the-niagara-effects-plugin-in-unreal-engine)

为了实现某些效果，你可能需要生成数万个粒子。但是，使用标准CPU生成这么多粒子可能会造成性能问题。在本指南中，我们将展示如何创建使用GPU而不是CPU来运行模拟的Sprite粒子效果。

## 创建系统和发射器

Niagara发射器和系统是独立的。目前推荐的工作流程是基于现有发射器或发射器模板创建系统。

1.  首先，右键点击内容浏览器（Content Browser），从显示的菜单选择 **FX > Niagara系统（Niagara System）** ，从而创建 Niagara系统。界面上将显示Niagara系统向导。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a9c4209-a335-41f4-9372-b5ab3c29f543/ue5_01-create-niagara-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a9c4209-a335-41f4-9372-b5ab3c29f543/ue5_01-create-niagara-system.png)
    
    点击查看大图。
    
2.  选择 **基于所选发射器的新系统（New system from selected emitters）** 。然后点击 **下一步（Next）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cce7f7af-8dae-4f9d-8bb8-c11a127061a3/ue5_02-system-wizard.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cce7f7af-8dae-4f9d-8bb8-c11a127061a3/ue5_02-system-wizard.png)
    
    点击查看大图。
    
3.  在 **模板（Templates）** 下，选择 **简单Sprite迸发（Simple Sprite Burst）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1c22ddd-a82e-4302-a820-7bd3a64d0d4c/ue5_03-select-the-sprite-burst-template.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1c22ddd-a82e-4302-a820-7bd3a64d0d4c/ue5_03-select-the-sprite-burst-template.png)
    
    点击查看大图。
    
4.  点击 **加号图标** ( **+** )，将发射器添加到要添加到系统的发射器列表中。然后点击 **完成（Finish）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22fe4c86-2407-4d2c-8288-107c75af3a09/ue5_04-add-emitter-and-finish.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22fe4c86-2407-4d2c-8288-107c75af3a09/ue5_04-add-emitter-and-finish.png)
    
    点击查看大图。
    
5.  将新系统命名为 **GPUSprite** 。双击以在Niagara编辑器中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d22c8519-12be-4ea4-a76a-c5c91f40118e/ue5_05-name-new-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d22c8519-12be-4ea4-a76a-c5c91f40118e/ue5_05-name-new-system.png)
    
    点击查看大图。
    
6.  新系统中的发射器实例采用默认名称 **SimpleSpriteBurst** ，但你可以重命名。在 **系统概述（System Overview）** 中点击发射器实例的名称，相应字段将变为可编辑。将发射器命名为 **FX\_GPUSprite** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5aa964bf-1641-4ba4-90b5-7b4d48f5805f/ue5_06-open-emitter-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5aa964bf-1641-4ba4-90b5-7b4d48f5805f/ue5_06-open-emitter-properties.png)
    
    点击查看大图。
    
7.  将 **GPUSprite** 系统拖入你的关卡中。
    

制作粒子效果时，最好将系统拖入关卡。这样可查看每项更改并在上下文中编辑。 你对系统所做的所有更改会自动传播到关卡中系统的实例。

## 发射器设置 - 发射器属性

首先，你需要在 **发射器属性（Emitter Properties）** 中更改一些设置。你会在这里从CPU模拟切换为GPU模拟。

1.  在 **系统概述（System Overview）** 中，点击 **发射器设置（Emitter Settings）** ，在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c196866e-8bbb-4248-bb90-384d51fbb1d5/ue5_07-open-emitter-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c196866e-8bbb-4248-bb90-384d51fbb1d5/ue5_07-open-emitter-settings.png)
    
    点击查看大图。
    
2.  扩展 **发射器属性（Emitter Properties）** 。找到 **模拟目标（Sim Target）** 字段。你将在此字段指示虚幻引擎使用GPU进行模拟。点击下拉菜单并选择 **GPUComputeSim** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2962e45-d31f-4644-9c21-63c529f08252/ue5_08-change-emitter-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2962e45-d31f-4644-9c21-63c529f08252/ue5_08-change-emitter-properties.png)
    
    点击查看大图。
    
3.  你可能触发关于固定边界未设置的警告。点击 **固定边界（Fixed Bounds）** 的复选框。这将解决该错误。将 **最小值（Minimum）** 和 **最大值（Maximum）** 保留为默认值。
    
    由于粒子模拟是在GPU上完成的，系统无法获知效果的范围有多大。正因为如此，需要设置固定边界。你可以按此步骤所示进行设置，也可以在 **系统属性（System Properties）** 项目中为整个系统设置固定边界。
    

## 发射器更新组设置

接下来，你将在 **发射器更新（Emitter Update）** 组中编辑模块。这些行为应用于发射器并会更新每个帧。

1.  在 **系统概述（System Overview）** 中，点击 **发射器更新（Emitter Update）** ，在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3151b542-17c8-4c96-a614-01b3532688c6/ue5_09-open-emitter-update.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3151b542-17c8-4c96-a614-01b3532688c6/ue5_09-open-emitter-update.png)
    
    点击查看大图。
    
2.  展开 **发射器状态（Emitter State）** 模块。此模块控制此发射器的时间和可扩展性。因为你使用了简单的Sprite迸发（Simple Sprite Burst）模板，所以 **生命周期模式（Life Cycle Mode）** 设为 **自身（Self）** 。通常，这用于完全自定义此专有发射器的发射器生命周期逻辑，但此效果不需要它。点击下拉菜单，并将 **生命周期模式（Life Cycle Mode）** 设为 **系统（System）** 。这样你的系统可以计算生命周期设置，这通常会优化性能。默认情况下，系统以5秒的间隔无限循环。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9079ad3b-ca47-489a-969c-9d5976e5236e/ue5_10-change-life-cycle-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9079ad3b-ca47-489a-969c-9d5976e5236e/ue5_10-change-life-cycle-mode.png)
    
    点击查看大图。
    
3.  **生成即时迸发（Spawn Burst Instantaneous）** 模块会在发射器生成时创建大量迸发的粒子。该模块包含在简单Sprite迸发模板中。将 **生成计数（Spawn Count）** 设为 **2500** 。由于 **生成时间（Spawn Time）** 设为 **0** ，迸发会在启动后立即发生。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c02557ef-a553-44c6-9ee2-21d3d5b14d71/ue5_11-set-burst-spawn-count.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c02557ef-a553-44c6-9ee2-21d3d5b14d71/ue5_11-set-burst-spawn-count.png)
    
    点击查看大图。
    
4.  为实现此效果，你在发射器生成时需要的不仅仅是粒子迸发。**生成速率（Spawn Rate）** 模块会在发射器处于活动状态时创建连续粒子流。点击发射器更新的 **加号** 图标( **+** )并选择 **生成（Spawning）> 生成速率（Spawn Rate）** ，从而添加 **生成速率（Spawn Rate）** 模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b07de85-783b-4c8f-824b-9421bb759af5/ue5_12-add-spawn-rate-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b07de85-783b-4c8f-824b-9421bb759af5/ue5_12-add-spawn-rate-module.png)
    
    点击查看大图。
    
5.  将 **生成速率（Spawn Rate）** 设为 **500** 。这将以500/秒的速率生成粒子，在初始迸发之后会提供连续的粒子流。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da487b61-e27b-440f-af41-61ac7f9d98d8/ue5_13-set-continuous-spawn-rate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da487b61-e27b-440f-af41-61ac7f9d98d8/ue5_13-set-continuous-spawn-rate.png)
    
    点击查看大图。
    

## 粒子生成组设置

接下来，你需要编辑 **粒子生成（Particle Spawn）** 组中的模块。这些是在粒子首次生成时应用于粒子的行为。

1.  在 **系统概述（System Overview）** 中，点击 **粒子生成（Particle Spawn）** ，在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8fc657d-adf7-41df-8df0-4390f8ff6a1f/ue5_14-open-particle-spawn.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8fc657d-adf7-41df-8df0-4390f8ff6a1f/ue5_14-open-particle-spawn.png)
    
    点击查看大图。
    
2.  展开 **初始化粒子（Initialize Particle）** 模块。该模块会将多个相关参数收集到一个模块中，最大限度减少堆栈凌乱。在 **点属性（Point Attributes）** 下，找到 **生命周期（Lifetime）** 参数。
    
3.  生命周期（Lifetime）参数将决定粒子会在显示多久后消失。为实现此效果，你需要一个常量值，这样粒子将在效果的整个时长内显示。将 **生命周期（Lifetime）** 设为 **5** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66a18521-c41e-434e-bf12-d239f7c186fa/ue5_15-set-lifetime-parameter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66a18521-c41e-434e-bf12-d239f7c186fa/ue5_15-set-lifetime-parameter.png)
    
    点击查看大图。
    
4.  你将在本指南的其他部分将Sprite大小随机化，但这里我们会设置Sprite的基础大小。在 **Sprite属性（Sprite Attributes）** 下，找到 **Sprite大小（Sprite Size）** 参数并确保它已启用。将 **Sprite大小（Sprite Size）** 设为以下值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eed46d28-eaff-43df-9843-0e81e5e48c98/ue5_16-set-base-sprite-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eed46d28-eaff-43df-9843-0e81e5e48c98/ue5_16-set-base-sprite-size.png)
    
    点击查看大图。
    
    大小向量
    
    值
    
    **X**
    
    5
    
    **Y**
    
    5
    
5.  球体位置将控制Sprite生成的位置的形状。点击发射器生成的 **加号** 图标( **+** )并选择 **位置（Location）> 球体位置（Sphere Location）** ，从而添加 **球体位置（Sphere Location）** 模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/933b18d4-5f4e-40dd-a103-2ba9747d575b/ue5_17-shape-location.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/933b18d4-5f4e-40dd-a103-2ba9747d575b/ue5_17-shape-location.png)
    
    点击查看大图。
    
6.  你可以添加 **球体位置（Sphere Location）** 模块，从而采用球体形状生成Sprite，而且你可以指定半径来设置球体形状的大小。从下拉菜单 **形状图元（Shape Primitive）> 球体（Sphere）** 选择 **球体（Sphere）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f58f3a11-b10a-4373-998b-329ee55c1500/ue5_18-add-sphere-location-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f58f3a11-b10a-4373-998b-329ee55c1500/ue5_18-add-sphere-location-module.png)
    
    点击查看大图。
    

## 粒子更新组设置

首先，你需要编辑 **粒子更新（Particle Update）** 组中的模块。这些行为适用于发射器的粒子，并更新每个帧。

1.  在 **系统概述（System Overview）** 中，点击 **粒子更新（Particle Update）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d960494-b109-4f76-a302-80bd7da22549/ue5_19-open-particle-update.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d960494-b109-4f76-a302-80bd7da22549/ue5_19-open-particle-update.png)
    
    点击查看大图。
    
2.  在粒子生成组的"初始化粒子（Initialize Particle）"模块中，你选择了Sprite的基础大小。你可以添加"缩放Sprite大小（Scale Sprite Size）"模块，随机化Sprite的大小。这会将比例因子应用于基础大小。单击 **加号** 图标( **+** )并选择 **大小（Size）> 缩放Sprite大小（Scale Sprite Size）** ，从而添加 **缩放Sprite大小（Scale Sprite Size）** 模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a37669ec-1bd3-476f-9039-2a1176c8763b/ue5_20-add-scale-sprite-size-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a37669ec-1bd3-476f-9039-2a1176c8763b/ue5_20-add-scale-sprite-size-module.png)
    
    点击查看大图。
    
3.  从下拉菜单 **缩放Sprite（Scale Sprite）> 非均匀（Non-Uniform）** 选择 **非均匀（Non-Uniform）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1a55e5b-1a55-424c-9527-ff827f5003a8/ue5_21-scale-sprite-parameter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1a55e5b-1a55-424c-9527-ff827f5003a8/ue5_21-scale-sprite-parameter.png)
    
    点击查看大图。
    
4.  "缩放Sprite大小"的默认值是 **X：1** 和 **Y：1** 。若更改这些默认值，将使所有粒子均匀地变大或变小。但是，在视觉效果上，随机大小变化比静态大小更有趣。点击 **比例因子（Scale Factor）** 字段旁边的向下箭头，并选择 **动态输入（Dynamic Inputs）> 来自浮点的Vector2D（Vector2D from Float）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/063220c5-e32f-46ee-a7b9-a2053f691fc7/ue5_22-add-vector2d-from-float.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/063220c5-e32f-46ee-a7b9-a2053f691fc7/ue5_22-add-vector2d-from-float.png)
    
    点击查看大图。
    
5.  请注意， **比例因子（Scale Factor）** 的值已更改为一个静态值。添加浮点值的方式有很多种，具体取决于你希望粒子呈现什么样的外观。若你希望粒子流动且大小逐渐变化，则曲线比较理想。点击 **值（Value）** 旁边的向下箭头，并选择 **动态输入（Dynamic Inputs）> 来自曲线的浮点（Float from Curve）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d394a5c-cbb6-474b-882d-46f0e3a51af5/ue5_23-add-float-from-curve.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d394a5c-cbb6-474b-882d-46f0e3a51af5/ue5_23-add-float-from-curve.png)
    
    点击查看大图。
    
6.  打开 **缩放Sprite大小（Scale Sprite Size）** 模块。点击 **增减（Ramp Up Down）** 曲线模板，将该形状应用于曲线。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9275576d-5368-4312-9f4b-178823a52533/ue5_24-curve-templates.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9275576d-5368-4312-9f4b-178823a52533/ue5_24-curve-templates.png)
    
    点击查看大图。
    
7.  直接点击匹配该曲线的模板。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/635bc357-d8b4-466e-8ca7-c12a47a9e9e3/ue5_25-curve-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/635bc357-d8b4-466e-8ca7-c12a47a9e9e3/ue5_25-curve-settings.png)
    
    点击查看大图。
    
8.  目前，你的当前设置只会创建不太有趣的粒子球。你可以添加一些额外的元素，增加粒子的变化和运动。点击粒子更新的 **加号** 图标( **+** )，并选择 **力（Forces）> 旋度噪点力（Curl Noise Force）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25e1afb9-52f2-4c91-af4e-612ccb73adc3/ue5_26-add-curl-noise-force-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25e1afb9-52f2-4c91-af4e-612ccb73adc3/ue5_26-add-curl-noise-force-module.png)
    
    点击查看大图。
    
9.  你可以使用旋度噪点力做很多事情。**噪点强度（Noise Strength）** 将控制总体噪点场的范围（即，有多少噪点干扰粒子的原始球体）。**噪点频率（Noise Frequency）** 将控制旋度噪点应用于粒子的频率：该数字越小，粒子的球体位置的扭曲程度越大。目前使用下面的设置，但稍后你可以对这些进行试验，获得不同的外观。 
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efd748ad-971e-4d6e-a0f1-efd31ca964b2/ue5_27-curl-noise-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efd748ad-971e-4d6e-a0f1-efd31ca964b2/ue5_27-curl-noise-settings.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **噪点强度（Noise Strength）**
    
    72
    
    **噪点频率（Noise Frequency）**
    
    .02
    
     
    
     
    
10.  现在你将看到粒子首先起旋涡，然后直接连续向外移动，直至消失。为实现此效果，粒子应该向外移动，然后朝其原点移回，形成一堆旋涡。**点吸引力（Point Attraction Force）** 模块会使粒子朝单个点移动（默认情况下，该点是发射器的位置）。点击粒子更新的 **加号** 图标( **+** )，并选择 **力（Forces）> 点吸引力（Point Attraction Force）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d618eb18-5aad-412f-91e5-17759ea80d93/ue5_28-add-point-attraction-force-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d618eb18-5aad-412f-91e5-17759ea80d93/ue5_28-add-point-attraction-force-module.png)
    
    点击查看大图。
    
11.  **吸引强度（Attraction Strength）** 是将粒子拉向吸引器点的力度。**吸引半径（Attraction Radius）** 将划定点吸引力应用于粒子的场的大小。**衰减指数（Falloff Exponent）** 将控制球体扩散的程度，该数字越小，粒子球体向外扩散的程度越大。**杀死半径（Kill Radius）** 将设置粒子在其生命周期结束时消失的区域的大小。将 **吸引强度（Attraction Strength）** 、 **吸引半径（Attraction Radius）** 、 **衰减指数（Falloff Exponent）** 和 **杀死半径（Kill Radius）** 设为以下值。
    
    点击模块底部的三角形，显示 **杀死半径（Kill Radius）** 参数。如果相应复选框尚未选中，请选中以将其启用。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f473dd0d-800c-4a99-826d-9d7a0ef261c5/ue5_29-point-attraction-force-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f473dd0d-800c-4a99-826d-9d7a0ef261c5/ue5_29-point-attraction-force-settings.png)
    
    点击查看大图。
    
    参数
    
    值
    
    **吸引强度（Attraction Strength）**
    
    5.5
    
    **吸引半径（Attraction Radius）**
    
    300.0
    
    **衰减指数（Falloff Exponent）**
    
    0.6
    
    **杀死半径（Kill Radius）**
    
    4.0
    
     
    
     
    
12.  现在来更改颜色。点击粒子更新的加号图标(+)并选择 **颜色（Color）> 颜色（Color）** ，从而添加 **颜色（Color）** 模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c589575-a8bf-4936-a4e8-3169d3ee066d/ue5_30-add-color-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c589575-a8bf-4936-a4e8-3169d3ee066d/ue5_30-add-color-module.png)
    
    点击查看大图。
    
13.  点击 **颜色（Color）** 旁边的向下箭头，并选择 **通用（General）> 动态输入（Dynamic Inputs）> 来自曲线的颜色（Color from Curve）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61cc55cc-c116-42df-bbbf-d05d669b948d/ue5_31-add-color-from-curve.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61cc55cc-c116-42df-bbbf-d05d669b948d/ue5_31-add-color-from-curve.png)
    
    点击查看大图。
    
14.  你可以点击彩色条上方的空白处，将颜色结点添加到曲线，并且你可以双击结点打开取色器来更改颜色。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d72b3881-263b-4631-a0cd-6e9118430c61/ue5_32-color-picker.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d72b3881-263b-4631-a0cd-6e9118430c61/ue5_32-color-picker.png)
    
    点击查看大图。
    
15.  要设置不透明度结点，请点击条下面的空白处。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e977849-b21c-40e6-98a6-acfb21311a40/ue5_33-set-an-opacity.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e977849-b21c-40e6-98a6-acfb21311a40/ue5_33-set-an-opacity.png)
    
    点击查看大图。
    
16.  要设置时间，请点击条下面的空白处。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/286c4126-b2f0-4e19-a82b-9aabf0fba6ad/ue5_34-set-the-time.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/286c4126-b2f0-4e19-a82b-9aabf0fba6ad/ue5_34-set-the-time.png)
    
    点击查看大图。
    
17.  如下所示，设置颜色和不透明度。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db9f47ae-b038-4cbd-81c4-35cae9a15fc8/ue5_35-set-color-and-opacity-stops.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db9f47ae-b038-4cbd-81c4-35cae9a15fc8/ue5_35-set-color-and-opacity-stops.png)
    
    点击查看大图。
    
    颜色或不透明度结点
    
    时间
    
    值
    
    颜色
    
     
    
     
    
    **结点1**
    
    0.0
    
    R: 1、G: 0、B: 1
    
    **结点2**
    
    .35
    
    R: .08、G: 0、B: 1
    
    **结点3**
    
    ..60
    
    R: .2、G: 1、B: .8
    
    **结点4**
    
    .8
    
    R: 1、G: .96、B: .3
    
    不透明度
    
     
    
     
    
    **结点1**
    
    0
    
    1
    
    **结点2**
    
    .7
    
    1
    
    **结点3**
    
    1
    
    0
    
     
    
     
    
     
    

## 最终结果

祝贺你！你已经创建了使用GPU而不是CPU的精彩Sprite效果。

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建系统和发射器](/documentation/zh-cn/unreal-engine/how-to-create-a-gpu-sprite-effect-in-niagara-for-unreal-engine#%E5%88%9B%E5%BB%BA%E7%B3%BB%E7%BB%9F%E5%92%8C%E5%8F%91%E5%B0%84%E5%99%A8)
-   [发射器设置 - 发射器属性](/documentation/zh-cn/unreal-engine/how-to-create-a-gpu-sprite-effect-in-niagara-for-unreal-engine#%E5%8F%91%E5%B0%84%E5%99%A8%E8%AE%BE%E7%BD%AE-%E5%8F%91%E5%B0%84%E5%99%A8%E5%B1%9E%E6%80%A7)
-   [发射器更新组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-gpu-sprite-effect-in-niagara-for-unreal-engine#%E5%8F%91%E5%B0%84%E5%99%A8%E6%9B%B4%E6%96%B0%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [粒子生成组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-gpu-sprite-effect-in-niagara-for-unreal-engine#%E7%B2%92%E5%AD%90%E7%94%9F%E6%88%90%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [粒子更新组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-gpu-sprite-effect-in-niagara-for-unreal-engine#%E7%B2%92%E5%AD%90%E6%9B%B4%E6%96%B0%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/how-to-create-a-gpu-sprite-effect-in-niagara-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)