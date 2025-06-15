# 如何在虚幻引擎中创建能够发光的Niagara粒子 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-create-particle-effects-that-emit-light-in-niagara-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:31:43.639Z

---

目录

![粒子光源](https://dev.epicgames.com/community/api/documentation/image/c93341d5-8bf8-434d-b32c-bd985e4f5093?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [启用Niagara插件](/documentation/zh-cn/unreal-engine/how-to-enable-the-niagara-effects-plugin-in-unreal-engine)

如果能让粒子照亮它们周边的场景，你就能为项目的视觉效果增添一层额外的真实感。在本指南中，我们将了解如何设置Niagara发射器以便同时生成粒子和光源。

![Particle Lights Effect Final Result](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07d151fd-c15b-409e-9aac-23823c1ae243/particle-lights-final.gif)

**操作前提（Prerequisite Step）**：本教程使用 **M\_Radial\_Gradient\* 材质，该材质可在** 初学者内容包（Starter Content）\*\* 中找到。你应该新建一个项目（其中包括初学者内容包），或使用已经创建的、包含初学者内容包的项目。

## 创建系统和发射器

Niagara发射器和系统是独立的。当前推荐工作流将从现有发射器或发射器模板创建系统。

1.  首先，在内容浏览器中点击右键以创建Niagara系统，然后从显示菜单中选择 **FX > Niagara系统（FX > Niagara System）**。将显示Niagara发射器（Niagara Emitter）向导。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/309ffd83-8f31-4b6e-aa44-e68d8303ad3a/01-create-niagara-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/309ffd83-8f31-4b6e-aa44-e68d8303ad3a/01-create-niagara-system.png)
    
    点击查看大图。
    
2.  选择 **从所选发射器新建系统（New system from selected emitters）**，然后单击 **下一步（Next）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cb2ddf1-d7f7-49b4-97fa-f5e41b1eea97/02-new-system-from-selected-emitters.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cb2ddf1-d7f7-49b4-97fa-f5e41b1eea97/02-new-system-from-selected-emitters.png)
    
    点击查看大图。
    
3.  在 **模板（Templates）** 中，选择 **喷泉（Fountain）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95691238-56ef-4044-af1b-63341d911f15/03-select-fountain-template.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95691238-56ef-4044-af1b-63341d911f15/03-select-fountain-template.png)
    
    点击查看大图。
    
4.  单击 **加号** 图标（**+**），将发射器添加到发射器列表中，以便之后添加到系统中。单击 **完成（Finish）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cec9103-4e2f-42a1-a40e-e8dd1482345b/04-create-system-with-fountain.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cec9103-4e2f-42a1-a40e-e8dd1482345b/04-create-system-with-fountain.png)
    
    点击查看大图。
    
5.  将新系统命名为 **ParticleLight**。双击以在Niagara编辑器中将其打开。
    
    ![Name System](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14b99f51-db4c-4593-b991-152e4f275338/05-rename-niagara-system.png "Name System")
6.  新系统中发射器实例的默认名称为 **喷泉（Fountain）**。但你可以对其重命名。在 **系统概览（System Overview）** 中单击发射器实例名称，该字段将转变为可编辑状态。将发射器命名为 **FX\_ParticleLight**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43c196a6-53dc-4aef-8574-ede220bb8fd7/06-rename-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43c196a6-53dc-4aef-8574-ede220bb8fd7/06-rename-emitter.png)
    
    点击查看大图。
    
7.  将 **ParticleLight** 拖到关卡中。
    

制作粒子效果时，最好将系统拖到关卡中。这样便可查看每一项更改并在上下文中进行编辑。你对系统所做的任何更改都将自动传播到关卡中的系统实例。

## 编辑发射器更新组设置

首先，你将在发射器更新组中编辑模块。这些是将应用于发射器并更新每一帧的行为。

1.  在 **系统概览（System Overview）** 中，单击 **发射器更新（Emitter Update）** 组，以便在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbb70e98-2b5e-43d9-a57a-d82d03e219d7/07-select-emitter-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbb70e98-2b5e-43d9-a57a-d82d03e219d7/07-select-emitter-update-group.png)
    
    点击查看大图。
    
2.  展开 **发射器状态（Emitter State）** 模块。由于你使用了喷泉模板，因此生命周期模式设置为"自身"。单击下拉菜单，并将生命周期模式设置为"系统"。此操作将使系统能够计算生命周期设置，而这通常可以优化性能。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dff3ad5-09fe-40f9-b2a2-2783e5bf6a64/08-life-cycle-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dff3ad5-09fe-40f9-b2a2-2783e5bf6a64/08-life-cycle-mode.png)
    
    点击查看大图。
    
3.  当发射器处于激活状态时，**生成速率（Spawn Rate）** 模块创建连续粒子流。此模块已经存在于喷泉模板中。将 **生成速率（Spawn Rate）** 设置为 **500**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb3ba3ea-aab2-4f02-bfb0-6bce9bbd9564/09-set-spawn-rate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb3ba3ea-aab2-4f02-bfb0-6bce9bbd9564/09-set-spawn-rate.png)
    
    点击查看大图。
    

## 编辑粒子生成组设置

下一步，你将编辑粒子生成组中的模块。这些模块会对粒子首次生成时的行为产生影响。

1.  在 **系统概览（System Overview）** 中，单击 **粒子生成（Particle Spawn）** 组，在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15581f86-07c5-4bea-af85-af600cf9d67a/10-select-particle-spawn-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15581f86-07c5-4bea-af85-af600cf9d67a/10-select-particle-spawn-group.png)
    
    点击查看大图。
    
2.  展开 **初始化粒子（Initialize Particle）** 模块。此模块将多个相关参数采集到一个模块中，从而最大程度地减少堆栈中的混乱。在 **点属性（Point Attributes）** 下，找到 **生命周期模式（Lifetime Mode）** 参数并设置成 **随机（Random）**。这个参数将决定粒子在消失前会持续显示多长时间。在本效果中，你将使用一个名为 **随机范围浮点（Random Ranged Float）** 的动态输入，以便随机设置粒子的持续显示时间。在喷泉模板中，生命周期参数已经应用了随机范围浮点。请按照下文设置 **最小（Minimum）** 和 **最大（Maximum）** 值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc29ebed-66aa-43ba-bb32-5361f4d7309a/11-set-lifetime.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc29ebed-66aa-43ba-bb32-5361f4d7309a/11-set-lifetime.png)
    
      
    
    点击查看大图。
    
    设置
    
    数值
    
    **生命周期模式（Lifetime Mode）**
    
    随机
    
    **最小值（Minimum）**
    
    1.75
    
    **最大值（Maximum）**
    
    2.5
    
3.  同时，在 **点属性（Point Attributes）** 下，找到 **颜色（Color）** 参数。此参数可设置粒子在其生成时的初始颜色。将 **RGB** 字段设置为以下值。
    

虚幻引擎取色器将把RGB颜色值规范化为0与1之间的整数。但是，若将颜色值设置为大于1，则颜色将变为自发光色。将系统放置在关卡中时，粒子将呈现该颜色。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1d0fd78-70f5-48f4-bb90-c9349ce6c80f/12-set-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1d0fd78-70f5-48f4-bb90-c9349ce6c80f/12-set-color.png)

  

点击查看大图。

设置

数值

**红色（Red）**

0.1

**绿色（Green）**

0 .3

**蓝色（Blue）**

50

1.  在 **Sprite属性（Sprite Attributes）** 下，找到 **Sprite大小（Sprite Size）** 参数并勾选此复选框，以启用它。若要对喷泉粒子大小添加些许随机性，请调整Sprite大小模式。点击下拉菜单并选择"随机化均匀"（Random Uniform）。它可以在值中添加 **最小** 和 **最大** 字段。将 **Sprite大小（Sprite Size）** 的 **最小值（Minimum）** 和 **最大值（Maximum）** 设置如下。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcb448d4-6d6b-4bd2-8ac5-12c7ff9f01ca/13-set-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcb448d4-6d6b-4bd2-8ac5-12c7ff9f01ca/13-set-size.png)
    
      
    
    点击查看大图。
    
    设置
    
    数值
    
    **Sprite尺寸模式（Sprite Size Mode）**
    
    随机标准（Random Uniform）
    
    **最小值（Minimum）**
    
    2.5
    
    **最大值（Maximum）**
    
    8.0
    
2.  **球体位置（Sphere location）** 控制Sprite生成所在位置的形状和原点。你可以通过指定半径来设置球体形状的大小。喷泉模板中包含 **球体位置（Sphere Location）** 模块。将 **球体半径（Sphere Radius）** 设置为 **15**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6d256a2-2d36-4f54-81cd-6f9877f79bc8/14-set-sphere-location-radius.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6d256a2-2d36-4f54-81cd-6f9877f79bc8/14-set-sphere-location-radius.png)
    
      
    
    点击查看大图。
    
3.  喷泉模板还包含 **在椎体中添加速度（Add Velocity in Cone）** 模块。当粒子生成时，此模块会增加粒子的运动。椎体点位于粒子生成点，且你可以设置 **X**、**Y** 和 **Z** 值，以确定椎体的扩展方向。**速度强度（Velocity Strength）** 已应用名为 **随机范围浮点（Random Ranged Float）** 的动态输入。将 **最小值（Minimum）** 和 **最大值（Maximum）** 值设置如下。将其他设置保留为默认值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/889c4800-f054-4f24-88d6-6017bd6d3399/15-set-velocity-in-cone-min-and-max.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/889c4800-f054-4f24-88d6-6017bd6d3399/15-set-velocity-in-cone-min-and-max.png)
    
      
    
    点击查看大图。
    
    设置
    
    数值
    
    **最小值（Minimum）**
    
    300
    
    **最大值（Maximum）**
    
    600
    

## 编辑粒子更新组设置

现在，你需要在粒子更新组中更新模块。这些行为将应用于发射器的粒子并且在每一帧更新。

1.  在 **系统概览（System Overview）** 中，单击 **粒子更新（Particle Update）** 组，以便在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3728cd1-eb9d-44da-934f-1506b20069a3/16-select-particle-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3728cd1-eb9d-44da-934f-1506b20069a3/16-select-particle-update-group.png)
    
      
    
    点击查看大图。
    
2.  **重力（Gravity Force）** 模块模拟重力如何影响对象。\*阻力（Drag）\*\* 模块将阻力应用于粒子，这样将减慢粒子的速度。重力和阻力的默认设置适用于此效果，因此你可以通过该方式保留默认设置。
    
3.  若不设置碰撞，效果中的粒子将掉落到地板或关卡中的其他固体对象上。若要添加 **碰撞（Collision）** 模块，请单击 **粒子更新（Particle Update）** 的 **加号（Plus sign）**（**+**）图标，然后选择 **碰撞 > 碰撞（Collision > Collision）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96049d19-594b-4281-8d75-bfe545e3b3a1/17-add-collision-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96049d19-594b-4281-8d75-bfe545e3b3a1/17-add-collision-module.png)
    
      
    
    点击查看大图。
    
4.  **碰撞（Collision）** 模块插入到堆栈的底部，位于 **解算力和速度（Solve Forces and Velocity）** 模块之后。这会导致错误。单击 **修复问题（Fix Issue）** 以移动碰撞模块并解决错误。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e4d61f7-c2dd-4896-ba5f-cf4df9d1d451/18-fix-issue.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e4d61f7-c2dd-4896-ba5f-cf4df9d1d451/18-fix-issue.png)
    
      
    
    点击查看大图。
    
5.  将 **碰撞（Collision）** 模块的默认设置保留在原位。
    

## 添加光源渲染器

现在，你将把光源渲染器添加到喷泉效果中。

1.  在 **系统概览（System Overview）** 中，单击 **渲染器（Render）** 组，以在 **选择（Selection）** 面板中将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/359beeba-fbf0-4aa8-94c2-6abd7b4c0ac5/19-select-render-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/359beeba-fbf0-4aa8-94c2-6abd7b4c0ac5/19-select-render-group.png)
    
      
    
    点击查看大图。
    
2.  单击 **渲染器（Render）** 的 **加号（Plus sign）**（**+**）图标，然后选择 **光源渲染器（Light Renderer）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ca9c39d-a136-4363-b2f0-3abaa4b88437/20-add-light-renderer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ca9c39d-a136-4363-b2f0-3abaa4b88437/20-add-light-renderer.png)
    
      
    
    点击查看大图。
    
3.  将 **半径比例（Radius Scale）** 设置为 **5.0**。这样可以确定光源与粒子生成点之间的传播距离。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da707796-100d-4a95-95b6-a92c9e6b4a0e/21-set-light-renderer-values.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da707796-100d-4a95-95b6-a92c9e6b4a0e/21-set-light-renderer-values.png)
    
      
    
    点击查看大图。
    
4.  你可以通过 **颜色添加（Color Add）** 值来更改效果所发射光的颜色。这些值分别用 **X**、**Y** 和 **Z** 标记；要说明的是，它们分别对应RGB值，其中 **X=红色（X=Red）**，**Y=绿色（Y=Green）**，**Z=蓝色（Z=Blue）**。要将光源颜色与颗粒颜色匹配，请将值设置如下。
    
    设置
    
    数值
    
    **红色（Red）**
    
    0
    
    **绿色（Green）**
    
    0
    
    **蓝色（Blue）**
    
    15
    

## 最终结果

祝贺你！你成功创建了一个包含粒子光源、能在场景中发光的效果。

![Particle Lights Effect Final Result](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afedd254-dde1-4364-9d38-9e373faf95b7/particle-lights-final.gif)

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建系统和发射器](/documentation/zh-cn/unreal-engine/how-to-create-particle-effects-that-emit-light-in-niagara-for-unreal-engine#%E5%88%9B%E5%BB%BA%E7%B3%BB%E7%BB%9F%E5%92%8C%E5%8F%91%E5%B0%84%E5%99%A8)
-   [编辑发射器更新组设置](/documentation/zh-cn/unreal-engine/how-to-create-particle-effects-that-emit-light-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E5%8F%91%E5%B0%84%E5%99%A8%E6%9B%B4%E6%96%B0%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [编辑粒子生成组设置](/documentation/zh-cn/unreal-engine/how-to-create-particle-effects-that-emit-light-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E7%94%9F%E6%88%90%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [编辑粒子更新组设置](/documentation/zh-cn/unreal-engine/how-to-create-particle-effects-that-emit-light-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E7%B2%92%E5%AD%90%E6%9B%B4%E6%96%B0%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [添加光源渲染器](/documentation/zh-cn/unreal-engine/how-to-create-particle-effects-that-emit-light-in-niagara-for-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%85%89%E6%BA%90%E6%B8%B2%E6%9F%93%E5%99%A8)
-   [最终结果](/documentation/zh-cn/unreal-engine/how-to-create-particle-effects-that-emit-light-in-niagara-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)