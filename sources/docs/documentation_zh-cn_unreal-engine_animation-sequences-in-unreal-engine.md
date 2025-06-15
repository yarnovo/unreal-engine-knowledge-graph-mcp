# 虚幻引擎中的动画序列 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:05.274Z

---

目录

![动画序列](https://dev.epicgames.com/community/api/documentation/image/dfa7c479-12ce-4366-88a0-a48c2695a762?resizing_type=fill&width=1920&height=335)

## 概览

动画序列（Animation Sequence）是一种可以在[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)上播放的动画资产。一个动画序列包含许多个关键帧，这些关键帧规定了骨骼网格体中[骨骼](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)在特定时间点的位置、旋转和缩放信息。通过按照顺序混合这些关键帧，就能在骨骼网格体上播放骨骼动画了。

![动画序列示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6bddce69-9cfb-4d93-b268-49e26bf3da62/sequencedemo.gif)

动画序列资产需要绑定到骨骼上使用。你可以在使用同一个骨架的多个骨骼网格体之间共享动画。

![在使用同一骨骼的不同网格体上播放动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23d6e388-6d46-4d5d-9659-e96f647acd3b/mannyquinnanimdemo.gif)

## 创建动画

动画序列大多在另外的动画和建模软件中创建，包含在一个FBX文件中。你可以在FBX导入过程中将其导入虚幻引擎来在你的项目中使用它。

### 导入动画

要导入动画，请在 **内容浏览器（Content Browser）** 中点击 **导入（Import）**。

![内容浏览器导入按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/343a2ea6-8435-4704-92ba-286de0c834b9/import.png)

在你电脑的文件资产管理器窗口中找到并选择包含了要导入的动画的FBX文件。

然后会弹出 **FBX导入选项（FBX Import Options）** 窗口。你在这里可以调整动画的导入方式。

![fbx导入选项窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ab82bd3-e89a-4dd3-b80f-8f8885805cdb/imortsettings.png)

**FBX导入选项（FBX Import Options）** 窗口包含以下可以调整的属性：

属性

描述

**导入动画（Import Animation）**

导入包含动画的FBX文件时，启用该属性来将动画作为动画序列资产导入。

**动画长度（Animation Length）**

**导出时间（Exported Time）**: 基于时间根据导出长度导入动画。 **高级时间（Advanced Time）**: 导入动画中有动画数据的时间段。 **设置范围（Set Range）**: 根据在 **帧导入范围（Frame Import Range）** 属性中定义的帧范围来导入动画。

**覆盖动画名称（Override Animation Name）**

选用该选项时，该属性会用指定的名称替换导入的动画的名称。默认情况下动画会使用FBX文件的名称。

**在骨骼层级中导入网格体（Import Meshes in Bone Hierarchy）**

如果选中此选项，嵌套在骨骼层级中的网格体将被导入而不是转换为骨骼。

**帧导入范围（Frame Import Range）**

在 **动画长度（Animation Length）** 中使用 **设置范围（Set Range）** 时使用的帧范围。

**默认采样速率（Default Sample Rate）**

将所有的动画曲线的采用速率设置为30 fps。

**自定义采样速率（Custom Sample Rate）**

定义一个自定的采样速率来导入动画数据。如果设为0，虚幻引擎会自动找出最佳采样速率。

**导入自定义属性（Import Custom Attribute）**

启用后，会将FBX属性导入为[曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)，或导入为[动画属性](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine)。

**删除现有自定义属性曲线（Delete Existing Custom Attribute Curves）**

如果在重新导入的时候启用，任何现有的自定义属性曲线都会被删除。

**删除现有非曲线自定义属性（Delete Existing Non Curve Custom Attributes）**

如果在重新导入的时候启用，任何现有的非曲线自定义属性都会被删除。

**导入骨骼轨道（Import Bone Tracks）**

启用后，将会导入骨骼变换轨道。如果禁用，所有的骨骼变换轨道都会被舍弃。在使用仅曲线的动画时删除骨骼变换曲线会很有用。

**设置材质曲线类型（Set Material Curve Type）**

启用后，会为存在的所有自定义属性设置材质曲线类型。

**材质曲线后缀（Material Curve Suffixes）**

在这里可以为具有以下后缀的自定义属性设置材质曲线类型。这与 **设置材质曲线类型（Set Material Curve Type）**是否启用无关。

**移除冗余关键帧（Remove Redundant Keys）**

将自定义属性作为曲线导入时，移除冗余关键帧。

**删除现有变形目标曲线（Delete Existing Morph Target Curves）**

启用后，将在导入时从FBX删除所有 **变形目标曲线（Morph Target Curves）**。

**不导入值仅为0的曲线（Do not import curves with only 0 values））**

启用后，将自定义属性或变形目标作为曲线导入时，如果值为0，则不导入。这可以避免添加额外曲线进行求值。

**保留局部变换（Preserve Local Transform）**

启用后，将会导入动画中所有的曲线。

通过 **导入设置（Import Settings）** 窗口中的 **骨骼（Skeleton）** 属性，可以选择驱动导入的动画的骨骼。不填写该属性时会直接将FBX文件中的骨骼结构作为新的骨骼导入

![导入FBX文件时选择骨骼选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/523667fd-9506-42e1-a7dc-e15de2bcfd1c/skeletonselection.png)

要使用已有的骨骼来驱动任何导入的动画，动画必须使用类似的骨骼。虚幻引擎会使用[骨骼树](/documentation/zh-cn/unreal-engine/skeleton-editor-in-unreal-engine#skeletontree)中的骨骼 **名称（names）** 和 **层级（hierarchy）** 自动将动画中的骨骼与已有的骨骼匹配。

确保 **导入动画（Import Animation）** 选项以启用并选择 **导入（Import）**。

![启用导入动画并点击导入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04db2b74-dd14-400c-8ee6-972be1dc3426/importanimations.png)

同时导入多个FBX时，你可以使用 **导入全部（Import All）** 来用同样的 **FBX导入选项（FBX Import Options）**导入全部选中的FBX文件。

完成导入后，你的动画会作为动画序列资产显示在内容浏览器中。

如果动画的结束帧的不是整数值，动画可能无法正确导入虚幻引擎。

![maya timeline showing an animation ending frame value of a decimal error importing animation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47aa8646-22c5-4637-abb6-1fddf292562c/endingframe.png)

你可以将动画序列导入到外部DCC中，然后将结束帧编辑为整数值，或者将FBX导入选项中的 **动画长度（Animation Length）** 属性设置为 **帧范围（Frame Range）**，并手动设置高级部分中的 **帧导入范围（Frame Import Range）** 属性来修复该错误。

更多关于向虚幻引擎中导入动画的信息，请参考[FBX动画流程](/documentation/zh-cn/unreal-engine/fbx-animation-pipeline-in-unreal-engine)和[如何导入动画](/documentation/zh-cn/unreal-engine/importing-animations-using-fbx-in-unreal-engine)。

### Sequencer

[Sequencer](/documentation/zh-cn/unreal-engine/fk-control-rig-in-unreal-engine)可以用于在虚幻引擎中只使用骨骼网格体创建动画。在使用[动画轨道](/documentation/zh-cn/unreal-engine/cinematic-animation-track-in-unreal-engine)或者用[Control Rig](/documentation/zh-cn/unreal-engine/animating-with-control-rig-in-unreal-engine)创建动画时，如果想要将动画作为新的动画序列保存，该工具会非常有用。

要用在 **Sequencer** 中创建的动画来创建新的动画序列，**右键点击** 骨骼网格体Actor轨道然后选择 **烘焙动画序列（Bake Animation Sequence）**。

![在Control Rig中将动画烘焙成新的动画序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74fdf49a-f494-4b3c-8af6-a84e78cc8b9d/bakeanimincontrolrig.png)

你还可以通过FK Control Rig编辑现有的动画，以此来创建动画序列的不同变种和修改过的版本。

关于Control Rig的更多信息，以及如何使用Control Rig来在虚幻引擎中为角色添加动画，参考[Control Rig](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)文档。

## 编辑动画序列

使用动画序列时，可以使用[动画序列编辑器](/documentation/zh-cn/unreal-engine/animation-sequence-editor-in-unreal-engine)向已有的动画添加编辑并进行调整。在动画序列编辑器中可以预览播放，用多个图层调整动画以及添加动画通知和曲线。

![动画序列编辑器窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/184af3e6-968f-4cf4-947f-95143bfc705a/animationsequenceeditor.png)

以下是编辑和修改你项目中已有的动画的几种方式。

### 叠加动画轨道

你可以使用 **骨骼操作（Bone Manipulation）** 工具来调整动画序列中角色骨骼的位置。在视口或者骨骼树面板中选中一个骨骼，使用移动工具操作骨骼的位置和旋转。

![用移动工具在视口中挑中选中骨骼的位置和旋转](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47540cd4-51ce-4f0f-b568-8322239bb351/bonemanipulation.png)

操作完骨骼后，在 **工具栏（Toolbar）** 中点击 **添加关键帧（Add Key）** 来在 **叠加动画轨道（additive animation track）** 中保存移动数据，它将会出现在序列时间轴上。

![操作完骨骼后点击添加关键帧在叠加轨道上添加动作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10d1e66f-af79-454a-80e3-e126d79ca3ae/addkey.png)

叠加轨道会混合骨骼的位置来使其在添加的关键帧上与操作过的位置匹配。

更多关于骨骼操作的信息，参考骨骼编辑器文档的[骨骼操作](/documentation/zh-cn/unreal-engine/skeleton-editor-in-unreal-engine#bonemanipulation)小节。

### 录制功能

编辑动画序列时，可以使用 **录制按钮（Record Button）** 实时录制操作的动作并将动画保存为新的序列。

![使用录制按钮录制新的动画序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a731529-436c-43b5-bffb-9debb4fee915/recordinganimation.gif)

产出的动画可以作为单独的动画序列资产使用。

![录制动画来生成新的动画序列示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f3b3d75-8fc6-486d-9e74-91bbee5f1965/newanimationfromrecording.gif)

你还可以使用录制功能从混合的动画来创建动画资产。

![在动画蓝图中录制混合的动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5df22e86-522a-4759-b17f-561963fcc20e/blendanimrecording.gif)

### 共享动画

如果你的项目使用了不同的骨架和骨骼网格体，你可以让这些资产共用动画序列。你可以根据项目的需要，用多种方式共享动画，或者重定向骨骼。

![IK rig重定向示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f549f59-0208-4d1d-9a0d-b8e7fec0c580/retargeter3.gif)

对于不使用同一个骨架但是有着 **同样骨骼结构** 的骨骼网格体，你可以将它们的骨骼定义为 **可兼容（Compatible）**，以便共用动画序列。请参考 **骨架（Skeleton）** 文档中的[可兼容骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%8F%AF%E5%85%BC%E5%AE%B9%E9%AA%A8%E6%9E%B6)部分来获取更详细的信息。

[](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)

[![骨架](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1636a359-beba-4cb9-b789-60fb999713f1/topicimage.png)](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)

[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)

[了解虚幻引擎中的骨架、骨骼以及动画数据管理方式。](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)

对于使用相同骨架但是有着 **不同网格体比例** 的骨骼网格体，如想要共享动画序列，你可以使用动画重定向。请参考[动画重定向](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine)文档来获取更多信息。

[](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine)

[![动画重定位](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/303523dc-2832-4bce-aa8a-82e28811b536/animationgretargeting_topic.png)](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine)

[动画重定位](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine)

[描述如何在多个骨架网格体中使用重定位动画以便共享动画，](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine)

你可以通过IK Rig重定向，让某个骨骼网格体的动画序列来为另一个使用不同骨骼的骨骼网格体创建 **新的动画序列**。参考[IK Rig 重定向](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine)文档来获取更多信息。

[](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine)

[![IK Rig重定向](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7afd3aaf-44f9-4f78-af60-b550c91251c1/topicimage.png)](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine)

[IK Rig重定向](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine)

[使用IK Rig和IK重定向在任意大小的角色之间共享和传输动画。](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine)

## 动画压缩

压缩设置是可以定义的数据资产。它会压缩动画资产。压缩时会移除动画数据，减少动画的内存占用来改善项目的性能。有较少动作的动画受压缩影响会更小，而包含细节动作的动画会明显受到更大的影响。

要创建压缩设置资产，在内容浏览器中点击 **添加（Add (+)）**；然后选择 **动画（Animation > 骨骼压缩设置（Bone Compression Settings）** 或者 **曲线压缩设置（Curve Compression Settings）**。

![在内容浏览器中添加压缩资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/436538c6-8055-4963-b39a-fbfd0b02893e/addcompression.png)

创建好压缩资产后，可以在 **内容浏览器（Content Browser）** 中 **双击** 它来打开它的 **细节（Details）** 面板。

### 骨骼压缩设置

骨骼压缩设置资产用于向动画序列的骨骼数据定义并应用压缩方式。骨骼压缩会基于在骨骼压缩设置的属性中定义的编解码器方式移除不必要或者任意的骨骼运动数据。

![骨骼压缩设置资产设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/476686ec-499d-4b90-b207-2de255162d87/bonecompressionsettings.png)

骨骼压缩设置资产有以下可调整的属性：

属性

描述

**编解码器（Codecs）**

在这里可以在列表中定义多个动画骨骼压缩编解码器来在压缩动画序列中骨骼数据的时候试用。可以使用以下编解码器：

**动画压缩仅按位压缩（Anim Compress Bitwise Compress Only）**: 仅按位的动画压缩；不减少关键帧。 **动画压缩无损（Anim Compress Least Destructive）**: 还原所有动画压缩，将动画还原为原始数据。 **动画压缩每个轨道压缩（Anim Compress Per Track Compression）**: 主要按照每个轨道进行压缩，单独压缩每个轨道。 **动画压缩隔帧移除（Anim Compress Remove Every Second Key）**: 隔帧移除动画中的关键帧。 **动画压缩线性帧移除（Anim Compress Remove Linear Keys）**: 移除与周围帧相同的帧。 **动画压缩移除琐碎帧（Anim Compress Remove Trivial Keys）**: 移除资产的位置和方向保持不变的不重要的帧。

列表中的空项会在压缩时被忽略。然而，列表中必须包含至少一个编解码器来压缩骨骼数据。

**误差阈值（Error Threshold）**

启用并压缩中触发时，该属性会使用低于该阈值的最佳的编解码器。默认阈值为0.1。

**强制低于阈值（Force Below Threshold）**

启用后，任何有较低误差阈值的编解码器都会被使用，直到误差低于阈值。

你可以在动画序列的 **资产详情（Asset Details）** 面板中应用骨骼压缩设置，位于 **骨骼压缩设置(Bone Compression Settings）** 属性之下。

![添加骨骼压缩资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26c13514-b6da-45e4-8e67-4c9dc9d77ea4/addbonecompressionasset.png)

### 曲线压缩设置

使用曲线来驱动动画序列属性时，曲线压缩可以很好地保存项目的性能。

![曲线压缩设置资产设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c131818-f29a-4da9-8b9b-64af3fd73dd4/curvecompressionsettings.png)

曲线压缩设置资产有以下几个可调整的属性：

属性

描述

**编解码器（Codec）**

定义动画曲线压缩编解码器。可以使用以下几种编解码器类型：

**压缩丰富曲线（Compressed Rich Curves）**: 仅针对丰富曲线进行压缩。 **统一可索引（Uniform Indexable）**: 压缩曲线时使曲线上的点对于其它功能可用。 **统一采样（Uniformly Sampled）**: 压缩后，任何曲线都会采用统一的采样率。

**最大曲线误差（Max Curve Error）**

压缩丰富曲线时所允许的最大误差阈值。默认值为0。

**使用动画序列采样率（Use Anim Sequence Sample Rate）**

启用后，可以使用明确的动画序列采样率数值。

**误差采样率（Error sample rate）**

启用使用动画序列采样率（Use Anim Sequence Sample Rate）时，动画序列会在测量曲线误差时将定义的值作为采样率来使用。默认数值为60。

你可以在动画序列的资产详情面板中应用曲线压缩设置，位于曲线压缩设置属性之下。

![添加曲线压缩设置资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66decd5c-eb68-4b88-85e6-14d246b390a1/addcurvecompressasset.png)

## 动画序列功能

以下可以找到相关的动画序列功能，可用于项目中的动画序列。

[

![动画属性](images/static/document_list/empty_thumbnail.svg)

动画属性

在动画序列中导入并使用自定义动画FBX属性。





](/documentation/zh-cn/unreal-engine/fbx-attributes-in-unreal-engine)[

![动画曲线](images/static/document_list/empty_thumbnail.svg)

动画曲线

使用动画曲线为材质参数、变形目标和同步到动画的其他属性制作动画。





](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)[

![重定向管理器](images/static/document_list/empty_thumbnail.svg)

重定向管理器

详解骨架编辑器中的重定向管理器选项。





](/documentation/zh-cn/unreal-engine/retarget-manager-in-unreal-engine)[

![动画通知](images/static/document_list/empty_thumbnail.svg)

动画通知

使用动画通知来发送和接收同步到动画序列的事件。





](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blending](https://dev.epicgames.com/community/search?query=animation%20blending)
-   [animation assets](https://dev.epicgames.com/community/search?query=animation%20assets)
-   [animation montage](https://dev.epicgames.com/community/search?query=animation%20montage)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概览](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E6%A6%82%E8%A7%88)
-   [创建动画](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%8A%A8%E7%94%BB)
-   [导入动画](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%8A%A8%E7%94%BB)
-   [Sequencer](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#sequencer)
-   [编辑动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%8A%A8%E7%94%BB%E5%BA%8F%E5%88%97)
-   [叠加动画轨道](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E5%8F%A0%E5%8A%A0%E5%8A%A8%E7%94%BB%E8%BD%A8%E9%81%93)
-   [录制功能](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E5%BD%95%E5%88%B6%E5%8A%9F%E8%83%BD)
-   [共享动画](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E5%85%B1%E4%BA%AB%E5%8A%A8%E7%94%BB)
-   [动画压缩](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%8E%8B%E7%BC%A9)
-   [骨骼压缩设置](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E9%AA%A8%E9%AA%BC%E5%8E%8B%E7%BC%A9%E8%AE%BE%E7%BD%AE)
-   [曲线压缩设置](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E6%9B%B2%E7%BA%BF%E5%8E%8B%E7%BC%A9%E8%AE%BE%E7%BD%AE)
-   [动画序列功能](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%BA%8F%E5%88%97%E5%8A%9F%E8%83%BD)