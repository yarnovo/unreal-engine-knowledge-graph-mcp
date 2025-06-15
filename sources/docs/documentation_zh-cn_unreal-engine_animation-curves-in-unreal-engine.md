# 虚幻引擎中的动画曲线 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:08.180Z

---

目录

![动画曲线](https://dev.epicgames.com/community/api/documentation/image/4695d632-bc98-4bca-b8f1-5c7edf018d16?resizing_type=fill&width=1920&height=335)

你在 **骨骼网格体** 上播放[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)时，需要对同步到该动画的额外属性和值制作动画。你可以使用 **动画曲线** （也称为 **anim曲线** 或 **曲线** ）完成此操作，这些曲线是你可以在动画序列中添加和设为关键帧的浮点类型值。曲线很适合通过具有动画动作的额外属性增强你的动画，例如对[材质参数](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)、[变形目标](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine)和其他属性制作动画。

本文档提供了关于动画曲线及其各种用法的概述。

#### 先决条件

-   你的项目包含[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)和[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)。
-   如果你使用动画曲线来影响 **材质参数** ，你需要对[材质实例化](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine)有基本的了解。
-   如果你使用动画曲线来影响 **变形目标** ，你需要对如何在骨骼网格体上设置[变形目标](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine)有基本的了解。

## 创建动画曲线

动画曲线可以按以下方式创建：

1.  在[动画序列编辑器](/documentation/zh-cn/unreal-engine/animation-sequence-editor-in-unreal-engine)中查看 **动画序列** 时，点击 **曲线（Curves）** 轨道下拉菜单并选择 **添加曲线…（Add Curve…）> 创建曲线（Create Curve）** 。输入新曲线的名称并按 **Enter** 键来创建曲线。
    
    ![创建曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e642192f-c4be-43ba-950c-5800a0f5013e/create1.png)
    
2.  在[动画曲线面板](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%9B%B2%E7%BA%BF%E9%9D%A2%E6%9D%BF)，右键点击 **曲线列表区域** 并选择 **添加曲线（Add Curve）** 。输入新曲线的名称并按 **Enter** 键来创建曲线。
    
    ![动画曲线面板添加曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71bdaac1-96f4-457b-aa59-74a422f12e2e/create2.png)
    
3.  如果你的骨架已有曲线，你可以从 **曲线（Curves）> 添加曲线…（Add Curve…）** 下拉菜单选择曲线。
    
    ![添加现有曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac6bec47-3b67-4b88-b841-a691a5c9865f/create3.png)
    

动画曲线存储在 **骨架资产（Skeleton Asset）** 上。因此，当你创建曲线时，你还会编辑[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)，这需要你进行保存。

### 导入动画曲线

你也可以在Autodesk Maya等外部动画软件中创建自定义属性，再将其作为曲线，与动画序列一起导入。

具体方法是先在你的骨架中的任何骨骼上[创建一个自定义属性](https://knowledge.autodesk.com/support/maya/learn-explore/caas/CloudHelp/cloudhelp/2019/ENU/Maya-Basics/files/GUID-C7385EC4-74E1-4F6E-8C9D-60F5CCDA7994-htm.html)并为其设置关键帧。你必须确保其为浮点类型属性，因为这是曲线唯一兼容的数据类型。完成后，导出你的动画。

![创建骨骼属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e725c679-5963-4a16-b537-4ad31152f52b/attribute1.png)

你必须按顺序为自定义属性设置关键帧，才能正确导入曲线数据。

接下来，[导入含有自定义属性的动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)。在导入FBX文件时，却确保启用了 **导入自定义属性（Import Custom Attribute）**。

![导入动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/602b59b6-45f7-46d6-8b4a-8ee6a478ecaa/attribute2.png)

导入后，你的曲线将出现在动画序列中。在本例中，我们在不同的骨骼上创建了两个属性，并将其导入。

![属性到曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba023c59-eb5b-431b-8124-29a7eb91f2f3/attribute3.png)

## 创建曲线动画

创建动画曲线并将其添加到动画序列后，可以对其值制作动画。选择动画曲线轨道上的 **曲线（Curve）** 下拉菜单并点击 **编辑曲线（Edit Curve）** 。这将打开[曲线编辑器](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)。

![编辑曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b26d795-fffa-4a80-94fd-4aec4e9ab604/animate1.png)

你还可以双击特定曲线轨道的 **时间轴区域** 来打开曲线编辑器。

![双击以编辑曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48843383-d88d-43f7-a3c5-b42c200897fe/animate2.gif)

曲线编辑器打开后，你可以按 **Enter** 键创建关键帧。这将在 **播放头** 位置创建关键帧，拖动该位置可移动，将关键帧设置在序列上的其他时间。你可以点击并拖动关键帧来更改其时间和值。

![在曲线编辑器中编辑曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ccffd5d-190c-4010-9ff8-e545d9e6d3fa/animate3.gif)

请参阅[曲线编辑器](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)页面，详细了解导航、关键帧以及使用曲线编辑器进行切线编辑。

[](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)

[![曲线编辑器](images/static/document_list/empty_thumbnail.svg)](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)

[曲线编辑器](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)

[使用曲线编辑器及其中的工具调整关键帧和曲线。](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)

## 动画曲线面板

你创建和存储的曲线可以在 **动画曲线（Anim Curves）** 面板中查看和管理。要查看此面板，请找到编辑器主菜单并启用 **窗口（Window）> 动画曲线（Anim Curves）** 。动画曲线（Anim Curve）面板只能从[骨架编辑器](/documentation/zh-cn/unreal-engine/skeleton-editor-in-unreal-engine)、[动画序列编辑器](/documentation/zh-cn/unreal-engine/animation-sequence-editor-in-unreal-engine)或[动画蓝图编辑器](/documentation/zh-cn/unreal-engine/animation-blueprint-editor-in-unreal-engine)查看。

![动画曲线面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44e66099-be4a-4df9-8342-d02d6f162b34/panel1.png)

### 曲线管理

你可以在动画曲线（Anim Curve）面板中的曲线条目上调整多个设置和功能。

![曲线设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03e2a0be-ccd7-436a-bfb0-1f8da4fcb0d2/panel2.png)

名称

说明

**曲线名称（Curve Name）**

曲线的名称。你可以右键点击动画曲线（Anim Curve）面板并选择 **重命名曲线（Rename Curve）** 来重命名曲线。

![重命名曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/884bee22-9c89-4cbe-a442-a30ba636f6ce/panel3.png)

**类型（Type）**

允许将此曲线用于[变形目标](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E5%8F%98%E5%BD%A2%E7%9B%AE%E6%A0%87)或[材质](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E6%9D%90%E8%B4%A8)。

**权重（Weight）**

曲线的当前值。

**自动（Auto）**

启用此项将在此序列中制作曲线动画时导致 **权重（Weight）** 值根据其设为关键帧的值自动更改。如果禁用此项，将忽略其动画值。禁用此项很适合测试曲线值如何影响角色，而不用将其设为关键帧。

![自动设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1a94595-1629-442d-aec3-0ed585c1536a/panel4.gif)

**骨骼（Bones）**

[连接](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E6%9B%B2%E7%BA%BF%E7%BB%86%E8%8A%82)到此曲线的骨骼数量。

### 曲线筛选

你可以在动画曲线（Anim Curves）面板中筛选曲线列表，以仅显示常用的曲线，或者仅显示特定类型的曲线。

-   禁用 **所有曲线（All Curves）** 将导致仅显示此动画序列当前使用的曲线。
-   禁用 **变形目标（Morph Target）** 、 **属性（Attribute）** 和 **材质（Material）** 曲线将禁止显示这些曲线类型。

![曲线筛选](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db9b865e-c313-4677-9f37-8f8fae6dc784/panel5.gif)

### 曲线细节

选择曲线将在 **细节（Details）** 面板中显示以下属性。

![曲线细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78a037ca-8236-4d7d-9dd7-73b291924a46/panel6.png)

名称

说明

**曲线名称（Curve Name）**

曲线的名称。

**连接的骨骼（Connected Bones）**

你可以连接到此曲线一组骨骼。如果你希望根据骨骼是否被使用而激活特定曲线，这会很有用。你可以根据是否[合并不同的骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%AF%BC%E5%85%A5%E6%9C%9F%E9%97%B4%E5%90%88%E5%B9%B6)或者是否针对不同的LOD[减少](/documentation/zh-cn/unreal-engine/skeletal-mesh-lods-in-unreal-engine#%E5%87%8F%E5%B0%91%E9%AA%A8%E9%AA%BC)骨骼来激活或不激活骨骼。

**最大LOD（Max LOD）**

此曲线可使用的最大[LOD](/documentation/zh-cn/unreal-engine/skeletal-mesh-lods-in-unreal-engine)，超过此限后将不再求值。例如，将此值设置为 **1** 会导致此曲线针对LOD 0和1求值，但针对2及更高的值不求值。

## 使用动画曲线

创建曲线并对其制作动画后，你可以通过各种方式使用该曲线来影响角色。

### 材质

你可以使用动画曲线自动影响[标量材质参数](/documentation/zh-cn/unreal-engine/instanced-materials-in-unreal-engine#%E6%A0%87%E9%87%8F%E5%8F%82%E6%95%B0)。这需要你执行以下操作：

1.  将曲线名称与材质中材质参数的名称相匹配。
    
    ![曲线名称匹配材质参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a0c6105-bec5-46cc-9f92-b0dd4f215435/material1.png)
    
2.  在 **动画曲线（Anim Curves）** 面板中启用材质（Material）曲线类型。
    
    ![启用动画曲线上的材质类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb8350c1-1e3d-46b8-9b0a-af524afaa7ee/material2.png)
    

完成此操作后，曲线值开始影响材质参数。

![曲线影响材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69190804-9924-4ec5-8376-df2a7719e838/material3.gif)

材质动画曲线会影响分配给骨骼网格体的所有材质（及其参数）。因此，如果你希望动画曲线仅影响单个材质中的参数，你可能需要相应调整内容。如果骨骼网格体有多个分配的材质派生自单个父材质，这将导致所有分配的材质采用相同的参数名称，从而发生这种情况。

![多个材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da59c7fa-7c81-422f-a581-8f439ff86f6a/multiplemats.png)

### 变形目标

你可以像使用材质一样使用动画曲线自动影响骨骼网格体上的[变形目标](/documentation/zh-cn/unreal-engine/fbx-morph-target-pipeline-in-unreal-engine)。这需要你执行以下操作：

1.  将曲线名称与[变形目标预览器](/documentation/zh-cn/unreal-engine/morph-target-previewer)中变形目标的名称相匹配
    
    ![将动画曲线名称与变形目标相匹配](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba551ff8-986c-4497-aa04-451eff4c68de/morph1.png)
    
2.  在 **动画曲线（Anim Curves）** 面板中启用变形目标（Morph Target）曲线类型。
    
    ![启用动画曲线上的变形目标类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b0cbccb-d601-4223-916f-6330ddcc7988/morph2.png)
    

完成此操作后，曲线值开始影响变形目标。

![曲线影响变形目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e21c928b-a1be-45cd-be94-f47cbeb0a41f/morph3.gif)

### 动画蓝图

你可以使用动画曲线影响[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中的任意值。在大部分情况下，你可以使用它们来影响特定动画图表节点的alpha值，例如例如IK，以便在播放动画期间更改IK状态。

![动画蓝图中的曲线值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2be697b-d588-40b5-9a50-0fc80977ca5f/animbp1.png)

以下与曲线相关的函数在动画蓝图动画图表和事件图表中均可用：

名称

图像

说明

**Get Active Curve Names**

![get active curve names](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a2c6667-d52b-410c-89e2-262cf2248b4e/animbp2.png)

这会以动画实例为目标，并返回指定曲线类型的激活曲线名称的上次更新列表。

**Get All Curve Names**

![get all curve names](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f447dec-cd9f-4954-be6a-835d5cbe7e6c/animbp3.png)

这会以动画实例为目标，并将所有曲线名称返回到字符串数组中。

**Get Curve Value**

![get curve value](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da09d5a4-4561-4020-bd91-52a425518778/animbp4.png)

这会以动画实例为目标，并返回指定曲线名称的值。

## 元数据曲线

元数据曲线是在添加到动画序列时输出静态曲线值 **1.0** 的动画曲线。它们可以按照与普通动画曲线相反的方式运作，后者在默认情况下（没有关键帧）输出静态曲线值 **0.0** 。如果没有将曲线添加到序列，动画曲线值也将回退为值 **0.0** 。

此行为在包含许多动画序列的较大项目中很有用。在这些项目中，许多动画可能自始至终需要常量 **1.0** 曲线值。因此，你可以使用 **元数据曲线（Metadata Curves）** 加快此过程，而不是手动添加普通曲线并采用 **1.0** 将其设为关键帧。换句话说，大项目在使用动画曲线时，可以按以下方式组织其在动画序列中的用法：

-   少数动画序列可能需要有显式曲线动画。因此，将 **动画曲线** 添加到这些动画，并相应将其 **设为关键帧** 。
-   更多的动画序列可能需要恒定设为 **1.0** 的曲线值，以便维持属性值。因此，将 **元数据曲线** 添加到这些动画。
-   其余所有动画序列可能不需要考虑曲线值，或者需要恒定设为 **0.0** 的曲线值。不需要执行操作。

要创建元数据曲线，请点击 **曲线（Curves）** 轨道下拉菜单并选择 **添加曲线…（Add Curve…）> 创建曲线（Create Curve）** 。你可以选择现有曲线，或点击 **新建（Create New）** 来创建新曲线。

![创建元数据曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7f7047e-1b42-456d-8822-ea08578562d7/meta1.png)

你也可以将现有动画曲线转换为元数据曲线，方法是点击曲线轨道上的 **曲线（Curve）** 下拉菜单并选择 **转换为元数据（Convert To Metadata）** 。

![转换为元数据曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d06f19d-c601-4041-a5e0-70abdb0d71e5/meta2.png)

元数据曲线在创建之后是只读的，并输出常量曲线值 **1.0** 。

![元数据曲线](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37e29d45-d69f-4b1c-acca-8019a358debb/meta3.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8A%A8%E7%94%BB%E6%9B%B2%E7%BA%BF)
-   [导入动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%8A%A8%E7%94%BB%E6%9B%B2%E7%BA%BF)
-   [创建曲线动画](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%9B%B2%E7%BA%BF%E5%8A%A8%E7%94%BB)
-   [动画曲线面板](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%9B%B2%E7%BA%BF%E9%9D%A2%E6%9D%BF)
-   [曲线管理](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E6%9B%B2%E7%BA%BF%E7%AE%A1%E7%90%86)
-   [曲线筛选](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E6%9B%B2%E7%BA%BF%E7%AD%9B%E9%80%89)
-   [曲线细节](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E6%9B%B2%E7%BA%BF%E7%BB%86%E8%8A%82)
-   [使用动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8A%A8%E7%94%BB%E6%9B%B2%E7%BA%BF)
-   [材质](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E6%9D%90%E8%B4%A8)
-   [变形目标](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E5%8F%98%E5%BD%A2%E7%9B%AE%E6%A0%87)
-   [动画蓝图](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE)
-   [元数据曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine#%E5%85%83%E6%95%B0%E6%8D%AE%E6%9B%B2%E7%BA%BF)