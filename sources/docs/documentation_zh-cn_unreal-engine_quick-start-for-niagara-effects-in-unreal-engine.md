# 虚幻引擎的Niagara快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:30:05.495Z

---

目录

![Niagara快速入门](https://dev.epicgames.com/community/api/documentation/image/eb9ed96b-fcb9-445a-8adf-d3248609849a?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [新建项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)
-   [启用Niagara插件](/documentation/zh-cn/unreal-engine/how-to-enable-the-niagara-effects-plugin-in-unreal-engine)

## 目标

Niagara快速入门旨在让你了解如何用Niagara在虚幻引擎中创建视觉效果（VFX）。在本文中，你将创建一个烟雾特效，用来模拟角色跑步时的扬尘效果。

## 目的

-   在项目中导入Niagara所需的网格体和材质。
-   使用Niagara系统创建一个基础效果。
-   将Niagara效果附加到角色的跑步动画上。

## 1 - 项目设置

在本指南中，使用的是已启用 **初学者内容包（Starter Content）** 的 **蓝图第三人称模板（Blueprint Third Person Template）** 项目。若你尚未在虚幻引擎中创建过项目，请参见[创建项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)了解如何创建项目。

1.  从 **Epic Games启动器** 启动 **虚幻引擎**。
2.  点击 **游戏（Games）**， 然后选择 **第三人称模板（Third Person Template）**。启用 **初始内容包（Starter Content）**。
3.  如果需要， **浏览（Browse）** 打开一个新的 **项目路径（Project Path）**。
4.  为你的项目设置一个 **项目名称（Project Name）**。
5.  点击 **创建（Create）** 来创建项目。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ce2b269-27d5-4e8f-b2d8-e75fdf301fef/01-new-project-setup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ce2b269-27d5-4e8f-b2d8-e75fdf301fef/01-new-project-setup.png)

点击查看大图。

在创建Niagara效果前，你需要在先项目中设置一些基础材质和资产，以便在接下来的指南中使用。在完成此部分学习后，你将拥有创建Niagara效果所需的一切。

### 创建或导入网格体形状

首先，你需要为效果设置网格体形状。你要创建或者导入的形状为 **云朵（cloud）**。有几种方式在虚幻引擎中添加一个网格体物体：

-   在3D软件中创建你的模型，然后将其作为 **.fbx** 文件导出，这样能够轻易导入虚幻引擎。
-   在网站上（比如 [Sketchfab](https://sketchfab.com/)） 浏览并下载一个免费的云朵模型，然后将其导入虚幻引擎。
-   直接在虚幻引擎中使用[建模模式](/documentation/zh-cn/unreal-engine/getting-started-with-modeling-mode)工具创建模型。

创建或者下载一个和下图类似的云朵模型。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d4de9aa-7316-4c9d-81f7-e0f22eadf7b5/02-cloud-model.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d4de9aa-7316-4c9d-81f7-e0f22eadf7b5/02-cloud-model.png)

点击查看大图。

该教程中使用的云朵模型资产来自[Sketchfab](https://sketchfab.com)。该模型名为 **CLOUD high poly**，由用户 **gaelinix** 创建，著作权归其所有。该模型使用[Creative Commons Attribution license](https://creativecommons.org/licenses/by/4.0/)证书。

你可以[在这里下载模型](https://sketchfab.com/3d-models/cloud-high-poly-7f3c3f525f8e42d3b99dcfe3abbc5e54)。

你也可以制作自己的云朵模型。即使你没有高端3D建模软件，比如3DS Max或者Maya，也可以使用开源的3D模型应用，比如[Blender](http://blender.org)。

创建或者下载好模型后，在 **内容（Content）** 文件夹中创建一个路径来保存该模型，以便管理。

1.  在内容浏览器（Content Browser）中，右键点击并选择 **新建文件夹（New Folder）**，创建一个保存资产的文件夹，命名为 **Cloud**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13e6476e-7dc4-4986-b42f-3a4a9a9094ed/03-create-cloud-folder.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13e6476e-7dc4-4986-b42f-3a4a9a9094ed/03-create-cloud-folder.png)

点击查看大图。

1.  将3D模型拖入内容浏览器，直接导入进项目。

关于将模型导入虚幻引擎的详情，请参阅[导入内容](/documentation/zh-cn/unreal-engine/importing-assets-directly-into-unreal-engine)。

### 创建并配置材质

当你导入云朵模型时，虚幻引擎可能会自动为该模型创建 **材质（Material）**。否则你需要创建你自己的材质。

1.  在内容抽屉中点击右键并选择 **材质（Material）**。如果导入模型时虚幻引擎已经自动导入了材质，可以跳过这一步。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26702e1e-4aa9-4894-b56d-8e47656d7b3a/04-create-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26702e1e-4aa9-4894-b56d-8e47656d7b3a/04-create-material.png)

点击查看大图。

1.  将新材质命名为 **CloudMaterial**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f87daae0-a2a6-46bc-9e35-4d35f9edf5f7/05-rename-cloud-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f87daae0-a2a6-46bc-9e35-4d35f9edf5f7/05-rename-cloud-material.png)

点击查看大图。

1.  双击新材质，在 **材质编辑器（Material Editor）** 中打开它。
    
2.  选中主材质节点后，在 **细节（Details）** 面板中找到 **材质（Material）** 部分。将 **混合模式（Blend Mode）** 更改为 **半透明（Translucent）**。选中 **双面（Two Sided）** 复选框。将其他设置保留为默认。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc26826a-07aa-4b96-a37e-22b829f75113/06-material-blend-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc26826a-07aa-4b96-a37e-22b829f75113/06-material-blend-mode.png)

点击查看大图。

1.  如果你使用的是导入模型时连带的材质，材质的 **底色（Base Color）** 可能已经连接。将已有的内容删除，因为你需要的是Niagara系统的 **粒子颜色（Particle Color）** 设置来驱动材质的色彩。如果你的 **底色（Base Color）** 没有连接东西，那么可以跳过这一步。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/589f456d-d4e8-4996-92d8-9e351aeefb3a/07-delete-param-node.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/589f456d-d4e8-4996-92d8-9e351aeefb3a/07-delete-param-node.png)

点击查看大图。

1.  右键点击图表，然后在搜索栏中输入 `particle`。选择 **粒子颜色（Particle Color）**，添加Particle Color节点。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51ba0e46-dda3-4f34-8619-ccf0471aedfa/08-create-particle-color-node.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51ba0e46-dda3-4f34-8619-ccf0471aedfa/08-create-particle-color-node.png)

点击查看大图。

1.  将Particle Color节点的顶部输出插入到主材质节点上的 **底色（Base Color）** 输入。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e06f6cf7-9571-4b62-a944-1c4c9fc61016/09-connect-particle-color-to-base-color.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e06f6cf7-9571-4b62-a944-1c4c9fc61016/09-connect-particle-color-to-base-color.png)

点击查看大图。

1.  如果你导入了模型，它可能自动创建并连接了一个 **纹理样本（Texture Sample）** 节点。如果没有的话，可以自行创建一个。按住 **T** 并在节点图表内进行点击即可完成此操作。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/122e6a4e-d5cc-4c0f-bb03-00b555727e4a/10-texture-sample-node.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/122e6a4e-d5cc-4c0f-bb03-00b555727e4a/10-texture-sample-node.png)

点击查看大图。

1.  你需要从 **初始内容包（Starter Content）** 中添加一些噪点来使其看起来像烟雾。选中纹理样本节点后，在 **细节（Details）** 面板中找到 **材质表达式纹理基础（Material Expression Texture Base）** 部分。在 **材质（Material）** 旁边，点击下拉列表，然后在搜索栏中输入 **噪点（Noise）**。选择 **T\_Perlin\_Noise\_M** 纹理。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58787cfa-7b19-4008-88a6-b1cb66cd0cce/11-set-texture-to-noise.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58787cfa-7b19-4008-88a6-b1cb66cd0cce/11-set-texture-to-noise.png)

点击查看大图。

1.  右键点击图表，然后在搜索栏中输入 `dynamic`。选择 **动态参数（Dynamic Parameter）** 以添加该节点。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/815b65a5-0b0d-42e3-9210-011eb26ca64c/12-create-dynamic-parameter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/815b65a5-0b0d-42e3-9210-011eb26ca64c/12-create-dynamic-parameter.png)

点击查看大图。

1.  选中Dynamic Parameter节点后，在 **细节（Details）** 面板中找到 **材质表达式动态参数（Material Expression Dynamic Parameter）** 分段。在 **数组0** 中，将名称更改为 **Erode**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b9ecef1-8247-4230-8cd2-7ec576b48abc/13-dynamic-parameter-erode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b9ecef1-8247-4230-8cd2-7ec576b48abc/13-dynamic-parameter-erode.png)

Click image for full size.

  

1.  右键点击图表，然后在搜索栏中输入 `step`。选择 **值步（Value Step）** 以添加该节点。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39c2a68a-c350-4e34-9e7e-44653b0697d6/14-add-value-step-node.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39c2a68a-c350-4e34-9e7e-44653b0697d6/14-add-value-step-node.png)

Click image for full size.

1.  从纹理样本节点的 **R** 输出连出引线，并将其插入值步节点的 **梯度（Gradient）** 输入。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b4524bb-e84d-4a3b-8eab-531b5b7c31ec/15-connect-texture-to-value-step.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b4524bb-e84d-4a3b-8eab-531b5b7c31ec/15-connect-texture-to-value-step.png)

Click image for full size.

1.  从动态参数节点的 **Erode** 连出引线，并将其插入 **值步（Value Step）** 节点的 **遮罩偏移值（Mask Offset Value）** 输入。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb5465e7-0782-491e-8d9f-7a842bb6c428/16-connect-erode-to-mask-offset.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb5465e7-0782-491e-8d9f-7a842bb6c428/16-connect-erode-to-mask-offset.png)

Click image for full size.

1.  从值步节点的 **结果（Results）** 输出连出引线，并将其插入主材质节点的 **不透明度（Opacity）** 输入。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6618e864-3a02-4ec3-9ffb-6c44dc990a01/17-final-material-setup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6618e864-3a02-4ec3-9ffb-6c44dc990a01/17-final-material-setup.png)

Click image for full size.

1.  点击 **应用（Apply）** 和 **保存（Save）**，然后关闭材质编辑器。

#### 阶段成果

现在你已经导入了一个云朵的网格体模型，并且设置好了材质。你现在已具备了创建Niagara效果所需的一切条件。

## 2 - 创建效果

### 创建系统

接下来将创建Niagara系统。

1.  在 **内容浏览器（Content Drawer）** 中右键点击，选择 **Niagara系统（Niagara System）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcf614a4-a961-4cd9-845e-b79c7b35a94e/18-create-niagara-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcf614a4-a961-4cd9-845e-b79c7b35a94e/18-create-niagara-system.png)

Click image for full size.

1.  选择 **来自选定发射器的新系统（New system from selected emitters）**。然后点击 **下一步（Next）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de306cf5-068c-4eb0-8658-70de398d70d1/19-new-system-from-selected-emitters.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de306cf5-068c-4eb0-8658-70de398d70d1/19-new-system-from-selected-emitters.png)

Click image for full size.

  

1.  在模板（Template）中，选择 **简单Sprite喷发（Simple Sprite Burst）**。点击 **加号** 图标（**+**），将发射器添加到要添加到系统的发射器列表中。然后点击 **完成（Finish）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cace37fb-0a25-4478-9d5b-23f8c22066a3/20-add-simple-sprite-burst.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cace37fb-0a25-4478-9d5b-23f8c22066a3/20-add-simple-sprite-burst.png)

Click image for full size.

1.  将系统命名为 **FX\_DustCloud**。双击在Niagara编辑器中打开它。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fea1f65-1f52-40ed-adc3-45ae1d912767/21-rename-niagara-system.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fea1f65-1f52-40ed-adc3-45ae1d912767/21-rename-niagara-system.png)

Click image for full size.

1.  新系统中发射器实例的默认名称为 **SimpleSpriteBurst**。但它可以重命名。在 **系统总览（System Overview）** 中双击发射器实例的名称，其字段将变为可编辑。将发射器命名为 **FX\_DustCloud**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acea04f7-2593-4c1b-b53a-c715d736e0aa/22-rename-dust-cloud-emitter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acea04f7-2593-4c1b-b53a-c715d736e0aa/22-rename-dust-cloud-emitter.png)

Click image for full size.

如果你的Niagara系统仅包含一个发射器，那么也可以不重命名。但是，如果创建的Niagara系统中有多个发射器，那么命名对于管理和保持条理非常重要。

### 配置渲染组

发射器显示为一个垂直的列，并且分为不同的组。发射器内的默认分组为：

-   发射器生成（Emitter Spawn）
-   发射器更新（Emitter Update）
-   粒子生成（Particle Spawn）
-   粒子更新（Particle Update）
-   渲染（Render）

要进一步了解发射器组和它们如何运作，请参见[Niagara 概览](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine)页面。

由于你是使用3D模型来生成特效，你需要先设置渲染器组来看到预览。

1.  在 **系统总览（System Overview）** 中，选择 **渲染器（Render）**，在 **选择（Selection）** 面板中将其打开。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99eaf92e-ffb1-4d35-9199-d267363756a9/23-select-render-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99eaf92e-ffb1-4d35-9199-d267363756a9/23-select-render-group.png)

Click image for full size.

1.  由于你使用的是3D模型，你需要网格体渲染器而不是Sprite渲染器。点击 **垃圾桶** 图标，删除Sprite渲染器。 **选中（Selection）** 面板。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea709f3a-46cb-4df0-91e9-2c472ef9006d/24-delete-sprite-renderer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea709f3a-46cb-4df0-91e9-2c472ef9006d/24-delete-sprite-renderer.png)

Click image for full size.

1.  选中渲染器组，在 **细节（Details）** 面板中点击 **加号** （**+**）图标，然后从列表中选择 **网格体渲染器（Mesh Renderer）** 来将该模组添加到渲染器组。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e035944-614c-4b6f-b700-4b06b183a9f3/25-add-mesh-renderer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e035944-614c-4b6f-b700-4b06b183a9f3/25-add-mesh-renderer.png)
    
    Click image for full size.
    
2.  对于**面向模式（Facing Mode）**，请点击下拉列表，然后选择 **速度（Velocity）**。
    
3.  点击 **网格体（Meshes）** 旁边的三角形来打开下拉列表，在这里可以向渲染器添加一个或者多个网格体对象。点击数组中 **序数0（Index (0)）** 旁边的下拉菜单，然后选择在 **项目设置（Project Setup）** 部分中导入的网格体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60ffe4d1-19b8-4d08-a409-7438f334f3e2/26-set-mesh-array.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60ffe4d1-19b8-4d08-a409-7438f334f3e2/26-set-mesh-array.png)
    
    Click image for full size.
    
    1.  点击启用 **覆盖材质（Override Materials）**。可以指定向网格体应用的材质。默认值为 **0数组元素**。点击 **加号** （**+**）图标添加 **数组元素**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f3b4e2e-7c0a-4a65-883b-0bf795bec234/27-enable-material-overrides.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f3b4e2e-7c0a-4a65-883b-0bf795bec234/27-enable-material-overrides.png)
    
    Click image for full size.
    
    1.  点击 **显示材质（Explicit Mat）** 旁边的下拉列表，然后选择在 **项目设置（Project Setup）** 部分中创建的材质。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/814b9752-b2ef-40d7-b763-65104ac261c5/28-set-explicit-material.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/814b9752-b2ef-40d7-b763-65104ac261c5/28-set-explicit-material.png)
    
    Click image for full size.
    
    1.  在 **内容浏览器（Content Browser）** 中，将Niagara系统拖入关卡。将其放置在玩家角色的脚部附近，检查效果相对于角色的大小和形状。
    
    制作粒子效果时，最好将系统拖入关卡。这样你就能了解每项更改的效果并在情境中编辑。
    
    #### 阶段成果
    
    完成该部分后，你就拥有了Niagara系统和发射器实例，并且已将系统拖入关卡，以便在玩家角色旁边预览。在下一部分中，你将在Niagara系统中编辑设置，创建尘云效果。
    
    ## 3 - 编辑模块设置
    
    Niagara编辑器会以堆栈形式显示每个发射器，每个发射器都拥有若干组设置。你将逐个编辑各组设置中的模块。
    
    该特效在不包含发射器生成（Emitter Spawn）组中的模块。因此你将跳过这些组。更多不同组及其功能的相关信息，请参考[Niagara 概览](/documentation/zh-cn/unreal-engine/overview-of-niagara-effects-for-unreal-engine)页面。
    
    ### 配置发射器更新组
    
    首先，在发射器更新（Emitter Update）组中编辑模块。位于该组中的模块会随着系统逐帧更新。
    
    1.  在 **系统总览（System Overview）** 中，点击 **发射器更新（Emitter Update）** 组，在 **选择（Selection）** 面板中将其展开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7675ccd4-4fc6-4cb8-b7ce-e1af2f4d8ffb/29-select-emitter-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7675ccd4-4fc6-4cb8-b7ce-e1af2f4d8ffb/29-select-emitter-update-group.png)
    
    Click image for full size.
    
    1.  展开 **发射器状态（Emitter State）** 模块。默认情况下，**生命周期模式（Life Cycle Mode）** 应设为 **自身（Self）**。
        
    2.  将 **发射器状态（Emitter State）** 设置更改为以下值。这样就能让尘云只产生一次然后就消散。
        
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b5e6991-0a53-4ae0-838e-b2a70378dc15/30-life-cycle-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b5e6991-0a53-4ae0-838e-b2a70378dc15/30-life-cycle-settings.png)
    
    Click image for full size.
    
    参数
    
    值
    
    **生命周期模式（Life Cycle Mode）**
    
    自身（Self）
    
    **无效响应（Inactive Response）**
    
    完成（Complete）
    
    **循环行为（Loop Behavior）**
    
    一次（Once）
    
    **循环时长模式（Loop Duration Mode）**
    
    固定（Fixed）
    
    **循环时长（Loop Duration）**
    
    1
    
    1.  展开 **生成瞬时喷发（Spawn Burst Instantaneous）** 模块。将 **生成数量（Spawn Count）** 设置为 **10**。生成数量为10将生成大小合适、足够可见的尘云。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5316b69-0279-41f6-be60-c2526323cf32/31-spawn-count-setting.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5316b69-0279-41f6-be60-c2526323cf32/31-spawn-count-setting.png)
    
    Click image for full size.
    
    ### 配置粒子生成组
    
    然后，在粒子生成（Particle Spawn）组中编辑模块。此为首次生成粒子时应用于粒子的行为。
    
    1.  在 **系统总览（System Overview）** 中，点击 **粒子生成（Particle Spawn）** 组，在 **选择（Selection）** 面板中将其展开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5d2a10c-0f9a-492b-af1a-a0a4cc4eeaee/32-select-particle-spawn-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5d2a10c-0f9a-492b-af1a-a0a4cc4eeaee/32-select-particle-spawn-group.png)
    
    Click image for full size.
    
    1.  展开 **初始化粒子（Initialize Particle）** 模块。在 **点属性（Point Attributes）** 中，找到 **生命周期模式（Lifetime Mode）** 设置。使用下拉菜单并选择 **随机（Random）**。此操作将 **最小值（Minimum）** 和 **最大值（Maximum）** 域添加到生命周期（Lifetime）值。这会让每个粒子的显示时间产生一些随机变化。将 **最小值（Minimum）** 和 **最大值（Maximum）** 域设置如下。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e07eeb96-2af8-4742-94fd-2fd7661ba91a/33-lifetime-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e07eeb96-2af8-4742-94fd-2fd7661ba91a/33-lifetime-settings.png)
    
    点击查看大图。
    
    设置
    
    数值
    
    最小值（Minimum）
    
    .4
    
    最大值（Maximum）
    
    .6
    
      
    
    1.  找到 **颜色（Color）** 设置。在示例中，**颜色（Color）** 看起来类似于灰尘的浅棕色。点击颜色表，使用取色器选择一个颜色。该数值会保存至 **粒子颜色（Particle Color）**，你已经在项目设置那一步将其连接到材质上。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e392b194-4a9f-4d6a-8aec-1df1fb1aebb4/34-color-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e392b194-4a9f-4d6a-8aec-1df1fb1aebb4/34-color-settings.png)
    
    Click image for full size.
    
    1.  你需要对粒子的大小做出一些变化，向网格体大小添加一个随机因素。在 **网格体属性（Mesh Attributes）**，找到 **网格体缩放模式（Mesh Scale Mode）** 下拉菜单。选择 **随机均匀（Random Uniform）**。 将 **网格体统一最小值大小（Mesh Uniform Scale Min）** 和 **网格体统一最大值大小（Mesh Uniform Scale Max）** 设置为以下值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7802b82-8c58-4055-8ed1-71f315564924/35-mesh-scale-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7802b82-8c58-4055-8ed1-71f315564924/35-mesh-scale-settings.png)
    
    Click image for full size.
    
    设置
    
    值
    
    Mesh Uniform Scale Min
    
    1.0
    
    Mesh Uniform Scale Max
    
    2.0
    
    1.  选中 **粒子生成（Particle Spawn）** 组，点击 **加号** （**+**）来向该组中添加新的模块。选择 **朝向（Orientation）>初始网格体朝向（Initial Mesh Orientation）**。其中包含粒子网格体的旋转设置。你需要给形状添加一些旋转效果，避免它们过于雷同。这样会使尘云看起来更自然。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24b242e8-1834-413e-a97f-9e71b8619123/36-add-initial-mesh-orientation-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24b242e8-1834-413e-a97f-9e71b8619123/36-add-initial-mesh-orientation-module.png)
    
    Click image for full size.
    
    1.  在 **旋转（Rotation）** 中点击启用模块中的初始旋转。点击 **旋转（Rotation）** 旁边的向下箭头，然后选择 **动态输入（Dynamic Inputs）>随机范围向量（Random Ranged Vector）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d0bb6b2-52f5-4a7c-9857-34e841b9ddbd/37-set-rotation-to-random-range-vector.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d0bb6b2-52f5-4a7c-9857-34e841b9ddbd/37-set-rotation-to-random-range-vector.png)
    
    Click image for full size.
    
    1.  最小值和最大值会给初始旋转生成一个随机因数。保留默认的 **最小值** 和 **最大值** 不需要改变。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46ac1645-9cc0-4ec4-a346-8517ed26b6b9/38-set-rotation-values.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46ac1645-9cc0-4ec4-a346-8517ed26b6b9/38-set-rotation-values.png)
    
    Click image for full size.
    
    1.  选中 **粒子生成（Particle Spawn）** 组，点击 **加号** （**+**）来添加一个新的模块。选择 **位置（Location）> 形状位置（Shape Location）**。形状位置模块可以让你设置一个区域，并在该区域内生成新的粒子。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d9f9037-9150-4ba7-ae9b-1f3f3b30fe49/39-add-shape-location-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d9f9037-9150-4ba7-ae9b-1f3f3b30fe49/39-add-shape-location-module.png)
    
    Click image for full size.
    
    1.  在该示例中，将 **形状图元（Shape Primitive）** 设置为 **圆柱体（Cylinder）**。取决于你想要的样式，在将来的其它示例中可以尝试不同的形状。现在，需要使尘云靠近地面，请将 **圆柱体高度（Cylinder Height）** 更改为 **1**。若不希望尘云比脚大太多，请将 **圆柱体半径（Cylinder Radius）** 更改为 **10**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28d76977-c7db-4d8f-a935-8aa5c5d2c106/40-set-cylinder-shape.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28d76977-c7db-4d8f-a935-8aa5c5d2c106/40-set-cylinder-shape.png)
    
    Click image for full size.
    
    设置
    
    数值
    
    形状图元
    
    圆柱体
    
    圆柱体高度
    
    1.0
    
    圆柱体半径
    
    10.0
    
    1.  选中 **粒子生成（Particle Spawn）** 组， 点击 **加号** (**+**) 来向该组中添加新的模块。选择 **速度（Velocity） > 添加速度（Add Velocity）**。在粒子生成组中添加速度后，会给刚刚生成的粒子一个初始速度，以指定的速度移动。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83957656-d731-4ec1-a314-365523e37106/41-add-an-add-velocity-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83957656-d731-4ec1-a314-365523e37106/41-add-an-add-velocity-module.png)
    
    Click image for full size.
    
    1.  将 **速度模式（Velocity Mode）** 设置为 **从点（From Point）**。这会从Niagara系统的原点放射性朝外施加速度。将 **速度（Velocity Speed）** 设为 **20**。你不希望让粒子扩散太远，只要能够表现出尘土来自角色的奔跑即可。你可以按需调节该数值来达到你想要的样式。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dac0a0f6-902f-4884-9888-d02d154fea4a/42-set-velocity-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dac0a0f6-902f-4884-9888-d02d154fea4a/42-set-velocity-settings.png)
    
    Click image for full size.
    
    1.  选中 **粒子生成（Particle Spawn）** 组， 点击 **加号** (**+**) 来向该组中添加新的模块。选择 **力（Forces） > 加速力（Acceleration Force）**。要用这个模块来给尘土云施加一个向上的冲量，这样尘埃就能从脚步位置向上散开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83419f3e-1c4d-4899-96e4-9525d153c858/43-add-acceleration-force-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83419f3e-1c4d-4899-96e4-9525d153c858/43-add-acceleration-force-module.png)
    
    Click image for full size.
    
    在你添加速度或力模块后，会显示一个错误，因为添加的模块总是位于组的堆栈的底部。这样会导致它们放在 **解算力和速度（Solve Forces and Velocity）** 模块之后。需要将所有的速度和力模块放在其之前才能正确运算。
    
    1.  点击 **修复问题（Fix Issue）** 来解决该错误。或者你也可以手动将模块拖动至解算力和速度之上。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dc777ef-ab6f-4bdf-ab6a-cf5491979ef9/44-acceleration-force-fix-issue.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dc777ef-ab6f-4bdf-ab6a-cf5491979ef9/44-acceleration-force-fix-issue.png)
    
    Click image for full size.
    
    1.  在加速力模块中，将 **加速度** 设置为 **X：0，Y：0，Z：200**。现在尘埃云会向外和向上扩散，但是向上的动力有点太大了。在粒子更新（Particle Update）步骤中，你将在每一帧上添加阻力，以减慢尘埃粒子的上升动量。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bd9e7dc-886e-40bf-bd3c-bcf0816e4b33/45-set-acceleration.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bd9e7dc-886e-40bf-bd3c-bcf0816e4b33/45-set-acceleration.png)
    
    Click image for full size.
    
    ### 配置粒子更新组
    
    最后，在粒子更新（Particle Update）组中编辑设置。这些行为会应用到粒子上并且每帧更新。
    
    1.  在 **系统总览（System Overview）** 中，点击 **粒子生成（Particle Spawn）** 组来在 **选择（Selection）** 面板中将其展开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24601a05-eb1a-4a7d-bc74-b556e4b37859/46-select-particle-update-group.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24601a05-eb1a-4a7d-bc74-b556e4b37859/46-select-particle-update-group.png)
    
    Click image for full size.
    
    1.  点击 **垃圾桶** 图标，删除 **缩放色阶（Scale Color）** 模块。此效果不需要该模块。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72ddcb58-ff6e-4321-8897-9cf30239d96b/47-delete-scale-color-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72ddcb58-ff6e-4321-8897-9cf30239d96b/47-delete-scale-color-module.png)
    
    Click image for full size.
    
    1.  选中 **粒子生成（Particle Spawn）** 组， 点击 **加号** (**+**) 来向该组中添加新的模块。选择 **材质（Materials）> 动态材质参数（Dynamic Material Parameters）**。这样就可以连接到材质中的Erode动态参数（Erode Dynamic Parameter）。
        
        可以通过拖动来重新排列系统概述中发射器节点内的模块。但无法在选择（Selection）面板中重新排列模块。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/138412f4-7ccb-41b0-99a8-3a2658fcfc6a/48-add-dynamic-material-parameters-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/138412f4-7ccb-41b0-99a8-3a2658fcfc6a/48-add-dynamic-material-parameters-module.png)
        
        Click image for full size.
        
    2.  在 **动态材质参数（Dynamic Material Parameters）** 模块中，你应该会看到我们在材质中设置的 **Erode** 参数。点击Erode的向下箭头，然后选择 **动态输入（Dynamic Inputs）> 来自曲线的浮点（Float from Curve）**。
        
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ea76e80-db21-4eb4-bc0a-fc9d51ab4667/49-set-erode-to-float-from-curve.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ea76e80-db21-4eb4-bc0a-fc9d51ab4667/49-set-erode-to-float-from-curve.png)
    
    Click image for full size.
    
    1.  在曲线编辑器中，点击 **下降（Drop off）** 模板来将其应用到曲线上。这会让材质慢慢消散。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d0eae1a-937a-4b15-b6a6-3e7a78f4dd51/50-set-float-curve-to-drop-off.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d0eae1a-937a-4b15-b6a6-3e7a78f4dd51/50-set-float-curve-to-drop-off.png)
    
    Click image for full size.
    
    1.  选中 **粒子生成（Particle Spawn）** 组， 点击 **加号** (**+**) 来向该组中添加新的模块。选择 **力（Forces）>阻力（Drag）**。
        
        在你添加速度或力模块后，会显示一个错误，因为添加的模块总是位于组的堆栈的底部。这样会导致它们放在 **解算力和速度（Solve Forces and Velocity）** 模块之后。需要将所有的速度和力模块放在其之前才能正确运算。点击 **修复问题（Fix Issue）** 可解决此错误。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c14d3b49-f96b-4439-ba35-004db5cd4ae5/51-add-drag-module.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c14d3b49-f96b-4439-ba35-004db5cd4ae5/51-add-drag-module.png)
        
        Click image for full size.
        
    2.  在阻力模块中，将 **阻力（Drag）** 设为 **8**。**阻力（Drag）** 设置会与加速力相互作用，防止尘云的向上运动看起来不够真实。
        
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94e29eaa-1f27-4de9-8cd4-e988520d6583/52-set-drag.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94e29eaa-1f27-4de9-8cd4-e988520d6583/52-set-drag.png)
    
    Click image for full size.
    
    #### 阶段成果
    
    你已创建了尘土效果，现在你应该能在关卡中的玩家出生点模型旁边的位置看到此效果。若你觉得效果不合适，你可以调整各种模块设置，直到达到满意的效果。
    
    ## 4 - 将Niagara效果附加到角色
    
    现在要将此效果添加到角色的奔跑动画中。在此示例中，你将把效果添加到第三人称模板中的通用 **Quinn** 角色上。不过，你也可以用这些步骤将Niagara效果添加到虚幻引擎中的任意角色身上。
    
    1.  在 **内容浏览器（Content Drawer）** 中，前往 **Content > Characters > Mannequins > Animations > Quinn**。双击 **MF\_Run\_Fwd** 动画，将其在 **动画编辑器（Animtion Editor）** 中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0f11b04-92c3-43a5-8e6b-4652d65c37cc/53-open-run-animation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0f11b04-92c3-43a5-8e6b-4652d65c37cc/53-open-run-animation.png)
    
    Click image for full size.
    
    1.  在 **动画时间轴（Animation timeline）** 中点击 **暂停（Pause）** 可暂停循环动画。使用滑动指针找到角色右脚接触地面的瞬间。你需要在该位置添加尘土效果。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5233380e-2a7c-4477-83b1-34a533f6c1b6/54-pause-and-scrub-animation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5233380e-2a7c-4477-83b1-34a533f6c1b6/54-pause-and-scrub-animation.png)
    
    点击查看大图。
    
    1.  找到 **通知（Notifies）** 分段。借助通知，你可以在动画上的某个位置进行标记，以便播放粒子效果。为了保持时间轴的整洁，创建一个新的轨道来放置Niagara事件。点击 **轨道（Track）**， 然后选择 **添加通知轨道（Add Notify Track）**。将其命名为 **Niagara**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea0a0b95-0427-4e7b-9c76-8f5a025d4e0d/55-add-notify-track.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea0a0b95-0427-4e7b-9c76-8f5a025d4e0d/55-add-notify-track.png)
    
    点击查看大图。
    
    1.  会看到一条位于时间轴拖动条下方的直线。右键点击播放头和Niagara动画通知轨道相交的位置。选择 **添加通知（Add Notify）> 播放Niagara粒子效果（Play Niagara Particle Effect）**。这样就能在动画中的该点位置上放置一个标记，并且带有默认标签PlayNiagaraEffect。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da89e5bc-df3f-4b36-8e66-c2108189f91d/56-add-notify-niagara-effect.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da89e5bc-df3f-4b36-8e66-c2108189f91d/56-add-notify-niagara-effect.png)
    
    Click image for full size.
    
    1.  选中 **PlayNiagaraEffect** 通知，在 **细节（Details）** 面板中找到 **动画通知（Anim Notify）** 部分。在此处选择要添加到动画中的Niagara系统。点击 **Niagara系统（Niagara System）** 旁边的下拉菜单，然后选择在Niagara中创建的 **FX\_DustCloud** 系统。通知上的标签更改为 **FX\_DustCloud**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15396e66-f5ba-47bf-b24c-9e1ec01b00a6/57-set-niagara-system-in-notify.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15396e66-f5ba-47bf-b24c-9e1ec01b00a6/57-set-niagara-system-in-notify.png)
    
    Click image for full size.
    
    1.  对左脚重复上述步骤。你也可以直接在时间轴中复制粘贴动画通知。要更好地优化效果，你可以调整云朵的位置来匹配每只脚接触地面的位置。选中 **动画通知（Anim Notify）**，找到 **位置偏移（Location Offet）** 数值。按照需求调整数值。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5cf1700-f4e4-476b-8a5e-90ae5fcdf6de/60-troubleshooting-cloud-location.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5cf1700-f4e4-476b-8a5e-90ae5fcdf6de/60-troubleshooting-cloud-location.png)
    
    Click image for full size.
    
    1.  点击时间轴上的 **播放** 按钮来预览效果，并且调整各项数值。
        
    2.  关闭动画编辑器。在 **关卡编辑器（Level Editor）** 中，点击 **游玩（Play）** 按钮来预览关卡。在关卡中来回跑动来观看你的特效实际效果。
        
    
    #### 阶段成果
    
    你已成功将Niagara效果添加到角色的奔跑动画中。祝贺你！
    
    ### 优化尘土云的外观
    
    你可能想要继续微调各项数值来取得理想的最终结果。现在场景已经设置好，你可以尝试的以下的一些选项：
    
    -   试着调整 **初始化粒子（Initialize Particle）** 模块中的颜色。
    -   向 **粒子更新（Particle Update）** 组中添加一个 **缩放网格体大小（Scale Mesh Size）** 模块。将 **缩放因数（Scale Factor）** 设置到 **来自曲线的向量（Vector from Curve）**，并且尝试用不同形状的曲线来随着时间改变云朵的大小。
    -   在 **网格体渲染器（Mesh Renderer）** 中微调模型的大小。
    -   在 **动画通知（Anim Notify）** 中微调云朵的位置。
    
    ## 5 -查看最终结果
    
    现在你已经完成了该快速入门中效果的制作。最终结果应该和如下类似。
    
    ## 6 - 自行尝试！
    
    在创建完基础效果并将其添加到角色身上后，你可以接着尝试一些其他的教程，为该角色执行更多操作。你还可以在Niagara中制作更多效果。
    
    -   你可以使用[条带](/documentation/zh-cn/unreal-engine/how-to-create-a-ribbon-effect-in-niagara-for-unreal-engine)来创建角色奔跑时身后的尾迹。
    -   查看[动画教程](/documentation/zh-cn/unreal-engine/animation-workflow-guides-and-examples-in-unreal-engine)，了解如何为角色创建或修改其他动画。
    -   你可以学习如何使用[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)为角色添加更多效果。

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)
-   [quick start](https://dev.epicgames.com/community/search?query=quick%20start)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [1 - 项目设置](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#1-%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [创建或导入网格体形状](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%88%96%E5%AF%BC%E5%85%A5%E7%BD%91%E6%A0%BC%E4%BD%93%E5%BD%A2%E7%8A%B6)
-   [创建并配置材质](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%B9%B6%E9%85%8D%E7%BD%AE%E6%9D%90%E8%B4%A8)
-   [阶段成果](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 创建效果](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#2-%E5%88%9B%E5%BB%BA%E6%95%88%E6%9E%9C)
-   [创建系统](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%B3%BB%E7%BB%9F)
-   [配置渲染组](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E9%85%8D%E7%BD%AE%E6%B8%B2%E6%9F%93%E7%BB%84)
-   [阶段成果](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 编辑模块设置](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#3-%E7%BC%96%E8%BE%91%E6%A8%A1%E5%9D%97%E8%AE%BE%E7%BD%AE)
-   [配置发射器更新组](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E9%85%8D%E7%BD%AE%E5%8F%91%E5%B0%84%E5%99%A8%E6%9B%B4%E6%96%B0%E7%BB%84)
-   [配置粒子生成组](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E9%85%8D%E7%BD%AE%E7%B2%92%E5%AD%90%E7%94%9F%E6%88%90%E7%BB%84)
-   [配置粒子更新组](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E9%85%8D%E7%BD%AE%E7%B2%92%E5%AD%90%E6%9B%B4%E6%96%B0%E7%BB%84)
-   [阶段成果](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)
-   [4 - 将Niagara效果附加到角色](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#4-%E5%B0%86niagara%E6%95%88%E6%9E%9C%E9%99%84%E5%8A%A0%E5%88%B0%E8%A7%92%E8%89%B2)
-   [阶段成果](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-4)
-   [优化尘土云的外观](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#%E4%BC%98%E5%8C%96%E5%B0%98%E5%9C%9F%E4%BA%91%E7%9A%84%E5%A4%96%E8%A7%82)
-   [5 -查看最终结果](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#5-%E6%9F%A5%E7%9C%8B%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [6 - 自行尝试！](/documentation/zh-cn/unreal-engine/quick-start-for-niagara-effects-in-unreal-engine#6-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95%EF%BC%81)