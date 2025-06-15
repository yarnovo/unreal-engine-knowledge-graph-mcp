# 如何使用虚幻引擎Niagara中的Sprite粒子创建烟雾特效 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:31:46.809Z

---

目录

![Sprite烟雾效果](https://dev.epicgames.com/community/api/documentation/image/dad217fd-3257-4931-99ad-40e59b0819ef?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [启用Niagara插件](/documentation/zh-cn/unreal-engine/how-to-enable-the-niagara-effects-plugin-in-unreal-engine)

常用的视觉手段是在始终朝向摄像机的2D平面上渲染纹理和材质。这些平面称被为 *Sprite* 。在以下教程中，你将在Niagara发射器中使用Sprite，然后将包含Niagara发射器的Niagara系统放置在关卡中，就能看到关卡中的特效。

**先决条件：**

本入门指南使用了 **初学者内容包** 中的 **M\_smoke\_subUV** 材质。请确保你已将该材质或初学者内容包添加到项目中。

## 项目设置

1.  首先，在内容浏览器（Content Browser）中创建新文件夹，用于保存效果的资产。确保你位于顶层（内容），然后右键点击 **内容浏览器（Content Browser）**，并选择 **新建文件夹（New Folder）** 。将文件夹命名为诸如 **SpriteEffect** 之类的名称。
    
    如果你要在项目中创建多个Niagara效果，你可能希望创建名为NiagaraFX（或类似内容）的文件夹，然后为Sprite效果创建子文件夹。
    
2.  你需要先创建或找到一种材质用于发射器中的Sprite，然后才能创建该效果。对于本示例，你将使用初学者内容包中的材质。你可以拉取该材质，不必去找它或移动它的位置，但在某些情况下，你可能希望创建原始材质的副本，然后将其放在效果的文件夹中，或者你之前创建的单独的"材质（Materials）"文件夹中。为此，请按照下列步骤操作：
    
    1.  在内容浏览器（Content Browser）的搜索栏中输入 `m_smoke` 。你应该会在搜索结果中看到 **M\_smoke\_subuv** 材质。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48530180-e1ec-4d0f-8dc9-6b1ede30a7d4/01-search-for-smoke-texture.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48530180-e1ec-4d0f-8dc9-6b1ede30a7d4/01-search-for-smoke-texture.png)
        
        点击查看大图。
        
    2.  要将其副本放入另一个文件夹中，只需点击该材质并拖入所需的文件夹，然后在弹出菜单中选择 **移到此处（Move Here）** 或 **复制到此处（Copy Here）** 。**移动** 它会删除之前位置的原始材质，并将其移到新位置。**复制** 它会在新位置创建副本，同时保留原始位置的原始材质。如果你希望为Sprite创建自己的材质，请参阅我们文档的 **材质（Materials）** 小节中的页面。
        

## 创建系统和发射器

接下来，你将创建Niagara系统并在其中创建发射器。该系统是一个容器，你可以在其中放入一个或多个发射器。发射器是生成的新粒子的源。

1.  首先，右键点击内容浏览器（Content Browser），在显示菜单中选择 **FX > Niagara系统（Niagara System）** ，从而创建 **Niagara系统（Niagara System）** 。界面上将显示Niagara系统向导。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d5289bd-2f70-4745-b621-6d74ac1b6ae4/02-create-niagara-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d5289bd-2f70-4745-b621-6d74ac1b6ae4/02-create-niagara-system.png)
    
    点击查看大图。
    
2.  选择 **基于所选发射器的新系统（New system from selected emitters）**。然后点击 **下一步（Next）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f55769c-a511-425e-bc40-3470821f66bc/03-new-system-from-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f55769c-a511-425e-bc40-3470821f66bc/03-new-system-from-emitter.png)
    
    点击查看大图。
    
3.  在 **模板（Template）** 下，选择 **简易Sprite迸发（Simple Sprite Burst）** 。点击 **加号** 图标(**+**)，将该发射器添加到待添加到系统的发射器列表中。然后点击 **完成（Finish）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c4411de-dfb1-4d3d-8567-85c6cf4dfc6d/04-select-emitters-to-add.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c4411de-dfb1-4d3d-8567-85c6cf4dfc6d/04-select-emitters-to-add.png)
    
    点击查看大图。
    
4.  将新系统命名为 **SmokeSystem**。双击以在Niagara编辑器中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/601c7a24-5f9c-42dd-9a30-abb68e9d19eb/05-rename-smoke-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/601c7a24-5f9c-42dd-9a30-abb68e9d19eb/05-rename-smoke-system.png)
    
5.  新系统中发射器实例的默认名称为 **SimpleSpriteBurst**。但是，你可以将其重命名。在"系统概述（System Overview）"中点击发射器实例的名称，相应字段将变为可编辑。将发射器命名为 **FX\_Smoke** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53f62e66-4ce9-4d6f-85fd-1fbf2aed6085/06-rename-smoke-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53f62e66-4ce9-4d6f-85fd-1fbf2aed6085/06-rename-smoke-emitter.png)
    
    点击查看大图。
    

## 更改渲染器设置

1.  在本指南中，你将遍历堆栈中出现的发射器模块组。但是，在渲染器中设置材质之前，你在预览或关卡中看不到内容。因此，首先在 **系统概述（System Overview）** 中选择 **Sprite渲染器（Sprite Renderer）** 以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ef701cc-fe53-45bc-8a24-c415bab400c8/07-open-render-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ef701cc-fe53-45bc-8a24-c415bab400c8/07-open-render-group.png)
    
    点击查看大图。
    
2.  你将在此处选择效果的材质。由于该材质是SubUV材质，你需要向渲染器指明图像网格中有多少张图像。将以下属性设置为以下值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f4aa45c-4287-439d-9c04-e0d1fce1f55d/08-set-sprite-renderer-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f4aa45c-4287-439d-9c04-e0d1fce1f55d/08-set-sprite-renderer-settings.png)
    
    点击查看大图。
    
      
    
    属性名称
    
    值
    
    **材质（Material）**
    
    M\_smoke\_subUV
    
    **子图像大小（Sub Image Size）**
    
    X: 8.0，Y: 8.0
    
    **子UV混合已启用（Sub UV Blending Enabled）**
    
    选中
    
3.  将 **SmokeSystem** 拖动到关卡中。
    
    制作粒子效果时，最好将系统拖入关卡。这样可查看每项更改并在上下文中编辑。你对系统所做的所有更改会自动传播到关卡中系统的实例。
    

## 编辑发射器更新组设置

首先，在发射器更新（Emitter Update）组中编辑模块。这些行为应用于发射器并会更新每个帧。

1.  在 **系统概述（System Overview）** 中，点击 **发射器更新（Emitter Update）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d7ec8fd-a3c3-4bd7-9106-93ad020fe236/09-open-emitter-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d7ec8fd-a3c3-4bd7-9106-93ad020fe236/09-open-emitter-update-group.png)
    
    点击查看大图。
    
2.  你希望创建恒定的烟柱，而不是一阵烟雾。点击 **垃圾桶** 图标，删除 **生成即时爆炸（Spawn Burst Instantaneous）** 模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6fc4695-2c06-4972-b1de-281a217f2130/10-delete-spawn-burst-instantaneous-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6fc4695-2c06-4972-b1de-281a217f2130/10-delete-spawn-burst-instantaneous-module.png)
    
    点击查看大图。
    
3.  点击 **加号** 图标(**+**)并选择 **生成速率（Spawn Rate）** ，以将 **生成速率（Spawn Rate）** 模块添加到 **发射器更新（Emitter Update）** 组。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb07cd8d-753d-4835-8e20-3ee7ad35e558/11-add-spawn-rate-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb07cd8d-753d-4835-8e20-3ee7ad35e558/11-add-spawn-rate-module.png)
    
    点击查看大图。
    
4.  在 **生成速率（Spawn Rate）** 模块中，将生成速率设置为 **50** 。这样可得到由烟雾构成的大小合适的蓬松形状。这是制作效果的良好开端。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba770dfd-8ad1-4296-a330-9581045cd13c/12-set-spawn-rate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba770dfd-8ad1-4296-a330-9581045cd13c/12-set-spawn-rate.png)
    
    点击查看大图。
    
5.  现在，你在构建效果时，需要将模拟设置为在无限循环中运行。这样你就有更多时间来评估设置如何影响效果。在 **发射器状态（Emitter State）** 模块中，点击 **生命周期模式（Life Cycle Mode）** 的下拉菜单，并选择 **自我（Self）** 。然后点击 **循环行为（Loop Behavior）** 的下拉菜单，并选择 **无限（Infinite）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3056cef0-c706-4472-a849-80804dba38ca/13-set-emitter-state-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3056cef0-c706-4472-a849-80804dba38ca/13-set-emitter-state-module.png)
    
    点击查看大图。
    

## 粒子生成组设置

接下来，你需要编辑 **粒子生成（Particle Spawn）** 组中的模块。这些是在粒子首次生成时应用于粒子的行为。

1.  在 **系统概述（System Overview）** 中，点击 **粒子生成（Particle Spawn）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70355005-ae00-4e5e-a3d3-64d52cce5ff0/14-open-particle-spawn-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70355005-ae00-4e5e-a3d3-64d52cce5ff0/14-open-particle-spawn-group.png)
    
    点击查看大图。
    
2.  展开 **初始化粒子（Initialize Particle）** 模块。该模块会将多个相关参数收集到一个模块中，最大限度减少堆栈凌乱。在 **点属性（Point Attributes）** 下，找到 **生命周期（Lifetime）** 参数。该参数将决定粒子会在显示多久后消失。你希望"生命周期（Lifetime）"参数带一点随机性，以更好地模拟真实烟雾。将 **生命周期模式（Lifetime Mode）** 设置为 **随机（Random）** ，将 **生命周期最小值（Lifetime Min）** 设置为 **2** ，并将 **生命周期最大值（Lifetime Max）** 设置为 **3** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/849c2e1e-db83-4938-add0-3bba3f769e36/15-set-lifetime-min-and-max.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/849c2e1e-db83-4938-add0-3bba3f769e36/15-set-lifetime-min-and-max.png)
    
    点击查看大图。
    
    属性名称
    
    值
    
    **生命周期模式（Lifetime Mode）**
    
    随机
    
    **最小值（Minimum）**
    
    2.0
    
    **最大值（Maximum）**
    
    3.0
    
3.  为了让烟雾效果更真实，你需要调整Sprite粒子的大小。原始粒子束非常小，因此你现在需要将其增大。你还将使大小带一点随机性，这样Sprite粒子会重叠并造成更逼真的烟雾效果。 在 **Sprite属性（Sprite Attributes）** 下，找到 **Sprite大小（Sprite Size）** 参数并确保它已启用。将 **Sprite大小模式（Sprite Size Mode）** 设置为 **随机均匀（Random Uniform）**。为 **最小值（Minimum）** 和 **最大值（Maximum）** 输入以下值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54d07e2e-37a1-4e8a-af36-1538f692e2d3/16-set-sprite-size.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54d07e2e-37a1-4e8a-af36-1538f692e2d3/16-set-sprite-size.png)
    
    点击查看大图。
    
    属性名称
    
    值
    
    **Sprite大小模式（Sprite Size Mode）**
    
    随机均匀（Random Uniform）
    
    **均匀Sprite大小最小值（Uniform Sprite Size Min）**
    
    75
    
    **均匀Sprite大小最大值（Uniform Sprite Size Max）**
    
    200
    
4.  现在你的烟雾质量变大了。为增加粒子的形状变化，你需要添加一些旋转。此外，为了增加变化，你需要为旋转添加随机性。将 **Sprite旋转模式（Sprite Rotation Mode）** 旁边的下拉菜单设置为 **直接规格化角度(0-1)（Direct Normalized Angle (0-1)）** 。这意味着，旋转角度计算为0到1之间的数字，而不是度数。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91739e08-9e96-4677-8dac-0b67d27dacb3/17-set-sprite-rotation-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91739e08-9e96-4677-8dac-0b67d27dacb3/17-set-sprite-rotation-mode.png)
    
    点击查看大图。
    
5.  现在点击 **Sprite旋转角度（Sprite Rotation Angle）** 旁边的下拉箭头，并选择 **动态输入（Dynamic Inputs）> 随机范围浮点（Random Range Float）**。这会将 **最小值（Minimum）** 和 **最大值（Maximum）** 字段添加到规格化角度。粒子会在生成时旋转随机的度数。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36db0574-99db-4e02-8da6-f8ae5fcbc947/18-set-angle-to-random-range-float.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36db0574-99db-4e02-8da6-f8ae5fcbc947/18-set-angle-to-random-range-float.png)
    
    点击查看大图。
    
6.  将 **最小值（Minimum）** 和 **最大值（Maximum）** 值设置为如下所示的值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e86c2751-d5ff-4145-9687-6e3f50b2a9f6/19-set-sprite-angle-min-and-max.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e86c2751-d5ff-4145-9687-6e3f50b2a9f6/19-set-sprite-angle-min-and-max.png)
    
    点击查看大图。
    
    属性名称
    
    值
    
    **最小值（Minimum）**
    
    0.25
    
    **最大值（Maximum）**
    
    0.5
    
7.  因此，现在你的烟雾云相当大，但它只是在原地打转。你希望烟雾粒子在生成后就开始移动。因此，现在你需要添加一些初始速度。点击 **加号**(**+**)图标并选择 **速度（Velocity）> 添加速度（Add Velocity）**，将 **添加速度（Add Velocity）** 模块添加到"粒子生成（Particle Spawn）"组。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52a1ce5d-65ea-45e4-9d02-8650c6022d6d/20-add-velocity-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52a1ce5d-65ea-45e4-9d02-8650c6022d6d/20-add-velocity-module.png)
    
    点击查看大图。
    
8.  点击 **速度（Velocity）** 旁边的下拉箭头，并选择 **动态输入（Dynamic Inputs）> 随机范围向量（Random Range Vector）** 。这会将 **最小值（Minimum）** 和 **最大值（Maximum）** 字段添加到速度。同样，略微的随机性可增加变化，使效果显得更自然。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8728c91e-403c-482f-b1a4-e2608da16bad/21-set-velocity-to-random-range-vector.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8728c91e-403c-482f-b1a4-e2608da16bad/21-set-velocity-to-random-range-vector.png)
    
    点击查看大图。
    
9.  将速度 **最小值（Minimum）** 和 **最大值（Maximum）** 值设置为如下所示的值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96855a9d-7bd0-48bb-8bed-324e31123204/22-set-velocity-min-and-max.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96855a9d-7bd0-48bb-8bed-324e31123204/22-set-velocity-min-and-max.png)
    
    点击查看大图。
    
    属性名称
    
    值
    
    **最小值（Minimum）**
    
    X: 0，Y: 0，Z: 50
    
    **最大值（Maximum）**
    
    X: 1，Y: 1，Z: 200
    
10.  形状位置将控制Sprite生成的位置的形状和原点。你可以添加 **形状位置（Shape Location）** 模块，从而采用不同的形状图元生成Sprite。点击 **加号**(**+**)图标并选择 **位置（Location）> 形状位置（Shape Location）** ，将 **形状位置（Shape Location）** 模块添加到"粒子生成（Particle Spawn）"组。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b32193a-c8ec-4df8-8f07-b95c372290f2/23-add-shape-location-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b32193a-c8ec-4df8-8f07-b95c372290f2/23-add-shape-location-module.png)
    
    点击查看大图。
    
11.  将 **形状图元（Shape Primitive）** 设为 **球体（Sphere）**。你可以指定半径来设置球体形状的大小。将 **球体半径（Sphere Radius）** 设置为 **64** 。确保 **球体分布（Sphere Distribution）** 设置为 **随机（Random）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/194b0e00-29d3-4486-bed1-6106b23ae83c/24-set-shape-location-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/194b0e00-29d3-4486-bed1-6106b23ae83c/24-set-shape-location-settings.png)
    
    点击查看大图。
    
12.  我们用于该烟雾效果的Sprite材质使用了Sprite表，其中包含多个设计为串在一起并制作了动画的图像。如果不考虑到这种情况，渲染器就只会使用表中的第一个Sprite。你可以添加 **子UV动画（SubUV Animation）** 模块以解决该问题。点击"粒子生成（Particle Spawn）"的 **加号**(**+**)图标并选择 **子UV（Sub UV）> 子UV动画（SubUV Animation）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fce043dd-70e6-4005-b700-e141f2a69061/25-add-sub-uv-animation-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fce043dd-70e6-4005-b700-e141f2a69061/25-add-sub-uv-animation-module.png)
    
    点击查看大图。
    
13.  在 **子UV动画（Sub UV Animation）** 模块中，点击 **子UV动画模式（SubUV Animation Mode）** 的下拉菜单，并选择 **线性（Linear）** 。对于 **开始帧（Start Frame）** ，输入 **0** ；对于 **结束帧（End Frame）** ，输入 **63** 。Sprite表包含8x8网格的图像，因此图像总数是64。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5eb74bd8-3414-4643-875b-5883164195ca/26-set-sub-uv-animation-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5eb74bd8-3414-4643-875b-5883164195ca/26-set-sub-uv-animation-settings.png)
    
    点击查看大图。
    

## 粒子更新组设置

首先，你需要编辑 **粒子更新（Particle Update）** 组中的模块。此类行为将应用于粒子并更新每个帧。

1.  在 **系统概述（System Overview）** 中，点击 **粒子更新（Particle Update）** 组以在 **选择（Selection）** 面板中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/219e2698-11f1-4aca-8b97-9d832cc32025/27-open-particle-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/219e2698-11f1-4aca-8b97-9d832cc32025/27-open-particle-update-group.png)
    
    点击查看大图。
    
2.  你在"粒子生成（Particle Spawn）"中添加的速度会使粒子在初始生成后就开始运动。现在，你希望粒子随着时间推移加快运动，并且你希望烟雾上升。 现在，你需要使粒子随着时间推移加快运动，并使烟雾上升。点击 **粒子更新（Particle Update）** 的 **加号**(**+**)图标并选择 **力（Forces）> 加速力（Acceleration Force）** ，以添加"加速力（Acceleration Force）"模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b3480cf-0714-449c-88b3-1326fe8a7ba1/28-add-acceleration-force-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b3480cf-0714-449c-88b3-1326fe8a7ba1/28-add-acceleration-force-module.png)
    
    点击查看大图。
    
3.  使 **X** 和 **Y** 值保持设置为 **0** ，并使 **Z** 值保持设置为 **500** 。这会使烟雾随时间推移而进行显著的向上运动。你可以调整该设置，甚至删除该模块，具体取决于你想创建的烟雾效果的类型。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ded84ab5-6c52-4d32-a368-84f72fbce714/29-set-acceleration-values.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ded84ab5-6c52-4d32-a368-84f72fbce714/29-set-acceleration-values.png)
    
    点击查看大图。
    
4.  如果你希望能够在系统中复用烟雾发射器，可以将其另存为单独的资产。点击 **齿轮** 图标以打开 **发射器设置（Emitter Settings）** 菜单，并选择 **据此创建资产（Create Assset From This）**。此时你将得到独立的Niagara发射器资产。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a219bb13-3bfd-450c-8a65-0180445d7452/30-create-asset-from-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a219bb13-3bfd-450c-8a65-0180445d7452/30-create-asset-from-emitter.png)
    
    点击查看大图。
    
5.  然后点击 **保存（Save）** 按钮以应用并保存更改。  
    ![保存系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9637b935-9cf3-47f3-84fa-23067c067a29/31-save-file.png)
    

## 最终结果

祝贺你！你已经使用Sprite创建了一个简单的烟雾效果。

![最终效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24c242fb-74d1-4229-adba-b9b77bbf0bfa/final-sprite-effect.gif)

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [项目设置](/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine#%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [创建系统和发射器](/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine#%E5%88%9B%E5%BB%BA%E7%B3%BB%E7%BB%9F%E5%92%8C%E5%8F%91%E5%B0%84%E5%99%A8)
-   [更改渲染器设置](/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine#%E6%9B%B4%E6%94%B9%E6%B8%B2%E6%9F%93%E5%99%A8%E8%AE%BE%E7%BD%AE)
-   [编辑发射器更新组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine#%E7%BC%96%E8%BE%91%E5%8F%91%E5%B0%84%E5%99%A8%E6%9B%B4%E6%96%B0%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [粒子生成组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine#%E7%B2%92%E5%AD%90%E7%94%9F%E6%88%90%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [粒子更新组设置](/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine#%E7%B2%92%E5%AD%90%E6%9B%B4%E6%96%B0%E7%BB%84%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/how-to-create-a-smoke-effect-using-sprite-particles-in-niagara-for-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)