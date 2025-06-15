# 如何在虚幻引擎Niagara中创建条带效果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-create-a-ribbon-effect-in-niagara-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:32:07.067Z

---

目录

![条带效果](https://dev.epicgames.com/community/api/documentation/image/58e7581f-eb72-40cf-810f-29eadf11f968?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [启用Niagara插件](/documentation/zh-cn/unreal-engine/how-to-enable-the-niagara-effects-plugin-in-unreal-engine)

操作前提：本教程将用到Niagara插件中的"默认条带材质"（DefaultRibbonMaterial）。但是，如果你已完成[创建网格体粒子效果](/documentation/zh-cn/unreal-engine/how-to-use-a-solid-mesh-to-create-a-balloon-effect-in-niagara-for-unreal-engine)教程，则可以使用该教程中使用的M\_Balloon材质。

模拟自然现象是很有挑战性的，特别是当使用基于sprite或网格体的粒子来模拟烟雾或蒸汽轨迹时。**条带发射器（Ribbon Emitters）** 是模拟这些对象的优秀解决方案。在接下来的教程中，你将了解如何设置Niagara发射器以将连续条带状粒子效果发射到世界场景中。最后的效果如下所示。

![条带效果最终效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ec445b0-6b6c-4ac7-8a3f-750d118742cd/ribbon-final.gif)

## 创建系统和发射器

与在Cascade中不同，Niagara发射器和系统是独立的。当前推荐工作流将从现有发射器或发射器模板创建系统。

1.  首先，在内容浏览器中点击右键并选择 **FX > Niagara系统（FX > Niagara System）** ，以创建Niagara系统。将显示Niagara发射器（Niagara Emitter）向导。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8cfcd114-b9c7-4ea6-9fb7-342b9e6ac1ed/01-create-niagara-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8cfcd114-b9c7-4ea6-9fb7-342b9e6ac1ed/01-create-niagara-system.png)
    
    点击查看大图。
    
2.  选择 **从所选发射器新建系统（New system from selected emitters）** 。然后点击 **下一步（Next）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3c7ce30-f866-4cac-8a41-663c873e5b98/02-new-system-from-selected-emitters.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3c7ce30-f866-4cac-8a41-663c873e5b98/02-new-system-from-selected-emitters.png)
    
    点击查看大图。
    
3.  在 **模板（Templates）** 下选择 **简单Sprite迸发（Simple Sprite Burst）** 。
    
    使用模板将在新系统中放置发射器实例，且此发射器实例将没有任何继承。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8aa76cba-3f32-4c1f-bb4b-a6836adff545/03-simple-sprite-burst-template.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8aa76cba-3f32-4c1f-bb4b-a6836adff545/03-simple-sprite-burst-template.png)
    
    点击查看大图。
    
4.  点击 **加号** 图标（**+**），以将所选发射器添加要添加到系统的发射器列表中。然后点击 **完成（Finish）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10b18cb6-d587-40f0-9e48-dd9b700c39d5/04-create-ribbon-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10b18cb6-d587-40f0-9e48-dd9b700c39d5/04-create-ribbon-system.png)
    
    点击查看大图。
    
5.  将新系统命名为 **RibbonSystem** 。
    
    ![Name New System](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d697bc5d-b804-44ea-8a12-eacf6af83d0a/05-rename-ribbon-system.png "Name New System")
6.  将 **RibbonSystem** 拖入关卡。双击在Niagara编辑器中双击打开该系统。
    
    当你创建一个粒子效果时，最好把粒子系统拖入关卡中。这允许你及时查看改动效果。你在粒子系统中做的任何调整，都会即时显示在关卡中。
    
7.  新系统中发射器实例的默认名称为 **SimpleSpriteBurst** ，但你可以对其重命名。在 **系统概览（System Overview）** 中点击发射器实例名称，该字段将转变为可编辑状态。将发射器命名为 **FX\_Ribbon** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a64ad465-d36a-49de-b8f4-b86cbb716344/06-rename-ribbon-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a64ad465-d36a-49de-b8f4-b86cbb716344/06-rename-ribbon-emitter.png)
    
    点击查看大图。
    

## 更改渲染器

虽然 **渲染** 组是堆栈中的最后一项，但你需要更改部分内容，以便效果按预期方式显示。原始模板使用了Sprite渲染器，但此效果需要条带渲染器。

1.  在 **系统概览（System Overview）** 中，点击 **渲染（Render）** ，以便在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3eb90a1d-96ba-4c7b-836b-409ef5785abd/07-select-render-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3eb90a1d-96ba-4c7b-836b-409ef5785abd/07-select-render-group.png)
    
    点击查看大图。
    
2.  若要创建条带效果，你需要 **条带渲染器（Ribbon Renderer）** 模块。但该模板具有 **Sprite渲染器** 模块。点击 **垃圾桶（Trashcan）** 图标，以删除Sprite渲染器。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/107b00fc-92c0-426b-ab6b-3a0624fcb9e4/08-delete-sprite-renderer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/107b00fc-92c0-426b-ab6b-3a0624fcb9e4/08-delete-sprite-renderer.png)
    
    点击查看大图。
    
3.  点击 **渲染器（Render）** 的 **加号** 图标(**+**)，并选择 **条带渲染器（Ribbon Renderer）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8c08c5f-30a2-4ea4-9500-1615ba680790/09-add-ribbon-renderer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8c08c5f-30a2-4ea4-9500-1615ba680790/09-add-ribbon-renderer.png)
    
    点击查看大图。
    
4.  在默认情况下，此所需材质不显示。点击 **材质（Material）** 下拉列表，并点击 **查看选项（View Options）** 以打开选项列表。勾选 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）** 的复选框。现在，你将能够看到此材质。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f42b0f8-d539-49c0-a852-117cc0fc40dd/10-show-engine-content.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f42b0f8-d539-49c0-a852-117cc0fc40dd/10-show-engine-content.png)
    
    点击查看大图。
    
5.  点击 **材质（Material）** 下拉列表，并选择 **\*DefaultRibbonMaterial** 。
    
    如果你完成了[创建网格体粒子效果](/documentation/zh-cn/unreal-engine/how-to-use-a-solid-mesh-to-create-a-balloon-effect-in-niagara-for-unreal-engine)课程，则可以选择 **M\_Balloon** 材质。你可以借此获得不透明条带，而不是由"DefaultRibbonMaterial"创建的半透明条带。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c4e1497-f18e-479a-acdf-bb3a7e82e4de/11-select-ribbon-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c4e1497-f18e-479a-acdf-bb3a7e82e4de/11-select-ribbon-material.png)
    
    点击查看大图。
    

## 编辑发射器更新组设置

首先，你将在 **发射器更新（Emitter Update）** 组中编辑模块。这些是将应用于发射器并更新每一帧的行为。

即使是添加Ribbon渲染器并在发射器更新组中编辑设置后，你也不会看到条带出现。这属于正常情况！当你转到本文的"粒子生成"部分后，你将开始看到实际条带。

1.  在 **系统概览（System Overview）** 中，点击 **发射器更新（Emitter Update）** 组，以便在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b053ca7-cc51-472a-8dd1-78f828d5cb5b/12-select-emitter-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b053ca7-cc51-472a-8dd1-78f828d5cb5b/12-select-emitter-update-group.png)
    
    点击查看大图。
    
2.  展开 **发射器状态（Emitter State）** 模块。此模块控制此发射器的时间和可延展性。由于你使用了 **简单Sprite迸发（Simple Sprite Burst）** 模板，因此 **生命周期模式（Life Cycle Mode）** 设置为 **自身（Self）**。通常，该模式用于为此特定发射器完全定制发射器生命周期逻辑，但此效果并不需要它。点击下拉列表，并将 **生命周期模式（Life Cycle Mode）** 设置为 **系统（System）**。此操作将使系统能够计算生命周期设置，而这通常可以优化性能。在默认情况下，系统以5秒的间隔无限循环。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dee0cfd-0466-45c5-bf31-ae9f1790bd69/13-life-cycle-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dee0cfd-0466-45c5-bf31-ae9f1790bd69/13-life-cycle-mode.png)
    
    点击查看大图。
    
3.  当发射器处于活动状态时，**生成速率（Spawn Rate）** 模块创建连续粒子流。点击 **发射器更新（Emitter Update）** 的 **加号** 图标 （**+**），选择 **生成 > 生成速率（Spawning > Spawn Rate）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d619a322-06b5-4f3b-a4f0-b2966e5e70f4/14-add-spawn-rate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d619a322-06b5-4f3b-a4f0-b2966e5e70f4/14-add-spawn-rate.png)
    
    点击查看大图。
    
4.  将 **生成速率（Spawn Rate）** 设置成 **100** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fadad0e6-46c4-4936-9f99-99d0df5d177a/15-set-spawn-rate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fadad0e6-46c4-4936-9f99-99d0df5d177a/15-set-spawn-rate.png)
    
    点击查看大图。
    

## 编辑粒子生成组设置

下一步，你将在 **粒子生成（Particle Spawn）** 组中编辑模块。这些是粒子首次生成时将应用于粒子的行为。

1.  在 **系统概览（System Overview）** 中，点击 **粒子生成（Particle Spawn）** 组，以便在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2baea140-0880-4759-941e-d5f0f7ef0cb8/16-select-particle-spawn-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2baea140-0880-4759-941e-d5f0f7ef0cb8/16-select-particle-spawn-group.png)
    
    点击查看大图。
    
2.  在 **点属性（Point Attributes）** 下，找到 **生命周期（Lifetime）** 参数。此参数确定了粒子在消失之前将显示多久。将 **生命周期（Lifetime）** 设置为 **5** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75184dbe-97b0-487b-9c4f-77aa7029966f/17-set-lifetime.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75184dbe-97b0-487b-9c4f-77aa7029966f/17-set-lifetime.png)
    
    点击查看大图。
    
3.  关于 **颜色** 参数，选择你喜欢的颜色。你可以直接输入RGB值，也可以用色盘的取色器来设置。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a22361e1-774b-4abd-84ae-b0dbdcbcdf49/18-set-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a22361e1-774b-4abd-84ae-b0dbdcbcdf49/18-set-color.png)
    
    点击查看大图。
    
4.  将 **质量（Mass）** 参数设置为 **10** 。这会影响条带向外扩散的方式及其下降的速度。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa2cca82-4d2b-4774-87ed-1505ac745e01/19-set-mass.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa2cca82-4d2b-4774-87ed-1505ac745e01/19-set-mass.png)
    
    点击查看大图。
    
5.  在 **条带属性（Ribbon Attributes）** 下，将 **条带宽度（Ribbon Width）** 设置为 **10** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6b84a98-925e-4983-bbd2-8f4b645b3749/20-set-ribbon-width.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6b84a98-925e-4983-bbd2-8f4b645b3749/20-set-ribbon-width.png)
    
    点击查看大图。
    
6.  若要使条带以螺旋方式旋转，你可以添加 **形状位置（Shape Location）** 模块。位置模块会影响粒子生成时所在位置的形状。点击 **粒子生成（Particle Spawn）** 的 **加号** 图标(**+**)，然后选择 **位置 > 形状位置（Location > Shape Location）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfba4dd4-d01b-4223-b303-ac6ba487d450/21-add-shape-location-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfba4dd4-d01b-4223-b303-ac6ba487d450/21-add-shape-location-module.png)
    
    点击查看大图。
    
7.  在 **形状（Shape）** 下，点击 **形状图元（Shape Primitive）** 的下拉菜单并选择 **圆环/圆盘（Ring / Disk）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8124e444-93fb-43f8-8ede-60d9b31a1fdc/22-select-ring-shape.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8124e444-93fb-43f8-8ede-60d9b31a1fdc/22-select-ring-shape.png)
    
    点击查看大图。
    
8.  将 **圆环半径（Ring Radius）** 设置为 **50** 。圆环半径将决定主圆环形状有多大。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81867f07-2d02-4736-8a10-ff0a1d7d18b9/23-set-ring-radius.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81867f07-2d02-4736-8a10-ff0a1d7d18b9/23-set-ring-radius.png)
    
    点击查看大图。
    
9.  在 **分布（Distribution）** 下，点击 **圆环分布模式（Ring Distribution Mode）** 的下拉菜单，并选择 **直接（Direct）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4c9f5a0-380b-4ef8-add3-cc26adc4ad48/24-set-ring-distribution-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4c9f5a0-380b-4ef8-add3-cc26adc4ad48/24-set-ring-distribution-mode.png)
    
    点击查看大图。
    
10.  现在，你将向条带添加一些速度。点击 **粒子生成（Particle Spawn）** 的 **加号** 图标(**+**)并选择 **速度（Velocity）> 添加速度（Add Velocity）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32935180-c013-48d4-8411-62a52d37f3cd/25-add-velocity-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32935180-c013-48d4-8411-62a52d37f3cd/25-add-velocity-module.png)
    
    点击查看大图。
    
11.  点击 **速度模式（Velocity Mode）** 的下拉菜单并选择 **从点（From Point）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f2c32ee-2493-4588-b8ed-e84a12a24749/26-velocity-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f2c32ee-2493-4588-b8ed-e84a12a24749/26-velocity-mode.png)
    
    点击查看大图。
    
12.  将 **速度（Velocity Speed）** 设置为 **50** 。现在，你将看到条带开始呈螺旋形旋转！出现这种情况是因为位置在围绕大半径旋转，速度将条带从原来的圆环位置向外推。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce7b4538-08a2-4788-8969-f14758ab144b/27-set-velocity-speed.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce7b4538-08a2-4788-8969-f14758ab144b/27-set-velocity-speed.png)
    
    点击查看大图。
    

## 编辑粒子更新组设置

现在，你将在 **粒子更新（Particle Update）** 组中编辑模块。这些行为将应用于发射器的粒子并且每一帧都更新。

1.  在 **系统概览（System Overview）** 中，点击 **粒子更新（Particle Update）** 组，以在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11584476-5e08-4563-b0ba-9a0ead3d9b64/28-select-particle-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11584476-5e08-4563-b0ba-9a0ead3d9b64/28-select-particle-update-group.png)
    
    点击查看大图。
    
2.  此效果只有一种颜色，因此无需 **缩放色阶（Scale Color）** 模块。点击 **垃圾桶（Trashcan）** 图标，以将其删除。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05545bff-40f6-4d33-a758-1054b5e8cb73/29-delete-scale-color-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05545bff-40f6-4d33-a758-1054b5e8cb73/29-delete-scale-color-module.png)
    
    点击查看大图。
    
3.  添加 **加速力（Acceleration Force）** 模块。正是它在模拟重力而使螺旋条带掉落。点击 **粒子更新（Particle Update）** 的 **加号** 图标(**+**)，然后选择 **力（Forces）> 加速力（Acceleration Force）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a43a093-caf3-4f55-a806-995a175b0ac9/30-add-acceleration-force.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a43a093-caf3-4f55-a806-995a175b0ac9/30-add-acceleration-force.png)
    
    点击查看大图。
    
4.  将 **加速（Acceleration）** 的 **Z** 值设为 **\-200** 。正Z值会使条带螺旋上升；负Z值会使条带以抛物线形状下降。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cce0098-a0bc-4c35-9c60-6f5442d49c8f/31-set-acceleration.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cce0098-a0bc-4c35-9c60-6f5442d49c8f/31-set-acceleration.png)
    
    点击查看大图。
    

## 最终结果

祝贺你！你已经在Niagara中创建了条带效果。

![条带效果最终效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/402d4efd-fc81-4e5b-92ff-624d95cef436/ribbon-final.gif)

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建系统和发射器](/documentation/zh-cn/unreal-engine/how-to-create-a-ribbon-effect-in-niagara-for-unreal-engine#%E5%88%9B%E5%BB%BA%E7%B3%BB%E7%BB%9F%E5%92%8C%E5%8F%91%E5%B0%84%E5%99%A8)
-   [更改渲染器](/documentation/zh-cn/unreal-engine/how-to-create-a-ribbon-effect-in-niagara-for-unreal-engine#%E6%9B%B4%E6%94%B9%E6%B8%B2%E6%9F%93%E5%99%A8)
-   [编辑发射器更新组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-ribbon-effect-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E5%8F%91%E5%B0%84%E5%99%A8%E6%9B%B4%E6%96%B0%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [编辑粒子生成组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-ribbon-effect-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E7%94%9F%E6%88%90%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [编辑粒子更新组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-ribbon-effect-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E6%9B%B4%E6%96%B0%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/how-to-create-a-ribbon-effect-in-niagara-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)