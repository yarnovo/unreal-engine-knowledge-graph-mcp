# 虚幻引擎中的骨架 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:09.432Z

---

目录

![骨架](https://dev.epicgames.com/community/api/documentation/image/0968f33c-d4f8-41c8-a743-6beab9c0e27c?resizing_type=fill&width=1920&height=335)

**骨架（Skeleton）** 本质上是一种层级结构，用于定义[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine)中的 **骨骼（Bones）** （有时也称作 **关节（joints）**）。就骨骼的位置及其对角色动作的控制而言，这些骨骼和生物学意义上的骨骼并无二致。

在虚幻引擎中，骨架负责保存动画数据、骨骼层级以及[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)并设置它们的关联。骨架资产还可以通过多种方式进行共享，从而让动画/数据在不同骨架间共享。

本文将介绍如何创建并使用骨架。

#### 先决条件

-   你的项目需要包含一个[骨骼网格体Actor](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)，或者你有一个能够导入虚幻引擎的带蒙皮的FBX角色。

## 创建骨架

创建骨架主要方式是[导入](/documentation/zh-cn/unreal-engine/importing-skeletal-meshes-using-fbx-in-unreal-engine)一个带蒙皮的FBX角色，它会转换成一个虚幻引擎的 **骨骼网格体（Skeletal Mesh）**。导入骨骼网格体时，在[FBX导入选项](/documentation/zh-cn/unreal-engine/fbx-import-options-reference-in-unreal-engine#skeletalmeshoptions)窗口中的 **骨架（Skeleton）** 字段留空，这样会基于正在导入的角色自动创建一个骨架资源。

![导入骨架网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08140ec8-5b71-485d-8b16-ca78c9f51d0b/create1.png)

完成导入角色后，**骨架资产（Skeleton Asset）** 会随其它骨骼网格体资产一同创建。

![龟甲资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de209543-ef6e-4058-b003-6d75185535fe/create2.png)

你还可以从任何骨骼网格体创建一个骨架副本，在 **内容浏览器（Content Browser）** 中右键点击它，然后选择 **骨架（Skeleton） > 创建骨架（Create Skeleton）**。这样会创建一个与现有骨骼网格体关联的骨架。如果该网格体已经有了另一个与它关联的骨架，它会重新链接至新的骨架并且将已有的动画也关联到新的骨架上。

![创建骨架副本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/004c814e-ef7f-4b0a-8319-49694c413b35/create4.png)

双击骨架资产将打开[骨架编辑器](/documentation/zh-cn/unreal-engine/skeleton-editor-in-unreal-engine)。

![骨架编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5ad4b2b-6965-41ba-8f4e-7db917327bf1/create3.png)

## 骨架树信息

[骨架树](/documentation/zh-cn/unreal-engine/skeleton-editor-in-unreal-engine#skeletontree)中显示的骨骼和其它物品会根据一些情况不同地显示。

图标

描述

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e6e7f90-91de-404b-94c5-5cb2d90fc259/iconbone1.png)

一个普通的骨骼，能够影响骨骼网格体上的顶点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ef2690d-b198-4fe1-b8d3-a3d8ddddd16b/iconbone2.png)

当前骨架中的骨骼，不影响骨骼网格体上的顶点。这些骨骼通常是额外的，比如附加的武器和物品，但是作为骨骼仍然能够添加动画。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdac080b-bb1b-4db8-a1af-29223a6fd9b9/iconsocket.png)

[插槽](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine)，这是一种静态的点，可以为用作一个偏移于骨骼的附加点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f94ca18-207d-4571-83d0-ff1b03946984/iconvirtual.png)

[虚拟骨骼](/documentation/zh-cn/unreal-engine/virtual-bones-in-unreal-engine)，这种骨骼会跟随另一个骨骼的变换而变换，但是位于另一个骨骼空间内。这种骨骼可以用于锁定不需要的关节动作，与[IK](/documentation/zh-cn/unreal-engine/animation-blueprint-two-bone-ik-in-unreal-engine)共同使用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81e9650a-8de5-4cc2-94df-e3fc3ca36b36/iconnobone.png)

当前骨架中的骨骼，但是不被骨骼网格体所使用。如果你[合并](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#mergingduringimporting)了骨架，或者当前预览的骨架LOD不使用特定的骨骼，那么就会出现这种骨骼。

## 动画数据储存

除了控制动画以外，虚幻引擎中的骨架还用于储存用于动画的数据。当数据从那些资源创建时，比如在动画序列中创建一个[动画通知](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine)，它会作为共享的数据添加到骨架上。

骨架可以储存以下几中动画数据：

-   [动画通知](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine).
-   [动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine).
-   [插槽](/documentation/zh-cn/unreal-engine/animation-slots-in-unreal-engine).
-   [重定向源](/documentation/zh-cn/unreal-engine/retarget-manager-in-unreal-engine).
-   [混合配置文件和混合蒙板](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine).

该数据可以在专门的工具面板中查看，点击骨架编辑器菜单中的 **窗口（Window）**，然后选择启用一个或者多个面板。

![动画数据面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a45125e5-cd8d-4aa4-8c0e-6befad0a1ef3/data1.png)

## 共享骨架

骨架资产的一个重要特性是单个的骨架资产可以由多个骨骼网格体使用，只要其需要拥有相同的整体rig层级。这意味着骨骼命名和骨骼的层级排序必须一致，才能够正确地共享。

举个例子，一个骨骼网格体中的一个肢拥有3块骨骼，分别命名为 **1**、**2** 和 **3**：

![共享骨架示例1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84be16f1-30c9-4f48-859b-c4f31a30eedc/shareexample1.png)

如果有另一个需要使用相同骨架资源的骨架网格体，则需要保证这些骨骼的命名和排序相同。 然而第二个骨骼网格体可以添加额外或者层级外部的骨骼。如果接收到的动画数据是用于骨骼网格体之外的骨骼，那么该数据会被忽略。

在这种情况下，你的新层级应该如下所示。在这里，第二个骨骼网格体有着额外的骨骼，但是并没有改变第一个骨架的层级结构，也没有造成冲突。

![共享骨架示例2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/320f0841-f6ec-4cd9-9706-5ed183d990e5/shareexample2.png)

然而，为使两个骨架网格体使用相同的骨架资源，无法对层级进行重新排序，也无法重命名骨骼。如果第二个骨骼网格体要使用不同的骨骼层级和命名结构，那么需要重新创建一个新的骨骼资产。

![共享骨架示例3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab19ff58-185a-4754-81b8-771acb055414/shareexample3.png)

如果你在不改变顺序的情况下插入一个骨骼，那么能够正常共享。然而大部分情况下，额外的骨骼可能会导致骨架产生意料之外的变形偏移。我们建议尽量避免这样做。

![共享骨架示例4](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/067b403e-78f3-4c05-84ac-d4ac54ea41e6/shareexample4.png)

结合这些共享规则，再虚幻引擎中有几种方式来在骨骼网格体之间共享骨架。以下是一些细节。

### 导入期间合并

第一种共享骨架的方式是在FBX导入过程期间进行的。导入你的新骨骼网格体时，（包含额外的和外部的骨骼，遵循上述的共享规则），你可以从项目中已有的骨骼网格体中选择一个骨架。虚幻引擎将会将这些骨架合并，并且将全部新骨骼添加到层级中。除此以外，你的骨架的比例会由创建它的原始骨骼网格体来定义。

![合并共享](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29047f34-18bd-406c-a66b-aa3efa4f5a80/share1.png)

如果你要导入的骨架与将要合并的骨架大不相同，并且不符合了共享规则，那么会看到一个错误信息：

![合并骨骼失败](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df825627-1a77-4aed-ae53-3767c84062f7/share2.png)

在这种情况下，你可能需要为导入的骨骼网格体创建一个新的骨架资产，而不是与一个现有的进行合并。

查看合并后的骨架时，层级中会有一些额外的骨骼，但是它们只有在用于对应的骨骼网格体时才可见并激活。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/617197c1-cbca-4a3c-8348-f3ef047879e9/sharevar1.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b17027b-ffd2-43a6-91b9-df4a0299a313/sharevar2.png)

骨骼网格体1

骨骼网格体2

### 可兼容的骨架

除此以外，还可以通过将其它骨架定义为可兼容，从而在不同骨架之间非破坏性地共享动画资产。可兼容的骨架能够共享[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)、[蒙太奇](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine)、[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)等等。

要为角色将另一个骨架定义为可兼容，在[骨架编辑器](/documentation/zh-cn/unreal-engine/skeleton-editor-in-unreal-engine)中将角色的骨架资产打开，然后点击 **工具栏** 中的按钮打开 **重定向管理器（Retarget Manager）**。

![compatible skeletons](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/258a4309-29e0-4749-85dd-62f2bca43175/retargetman.png)

在 **重定向管理器（Retarget Manager）** 中，找到 **重定向源（Retarget Sources）** 面板的 **管理可兼容骨架（Manage Compatible Skeletons）** 部分，然后点击 **添加骨架（Add Skeleton）** 来在你的项目中选择另一个骨架资产。

![add compatible skeleton](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca4748f3-9646-41cc-a2f5-ff71a46d44a5/selectcompatibleskel.png)

现在，动画就可以从 **管理可兼容源（Manage Compatible Sources）** 列表中的骨架上分享。

![可兼容骨架](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92bd7673-f7ba-4aa7-86d7-8c781acc4b3b/compat3.gif)

骨架可兼容性并不是双向的。如果你将 骨架1 设为与 骨架2 兼容，这并不意味着骨架2与骨架1兼容。如果要让共享完全双向，你还需要将 骨架2 设为与 骨架1 兼容。

创建并管理一个系统的可兼容骨架可以有效地优化你项目中用来驱动角色的动画资产数量。然而，要使用可兼容骨架系统，所有的角色都必须使用几乎一致的骨架层级结构和命名规则。除此以外，所有角色都必须拥有相似的网格体比例来达到理想的结果。

如果要共享动画的角色有着相同的骨架结构但是比例不同，请参考[动画重定向](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine)文档。

要重新构建动画序列来使其在不同的骨架结构上运行，请参考[IK Rig重定向](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine)文档。

## 骨架功能

虚幻引擎中的骨架支持各种功能，包括附加、混合以及其它设置。参考以下页面来了解这些功能：

[

![动画重定位](images/static/document_list/empty_thumbnail.svg)

动画重定位

描述如何在多个骨架网格体中使用重定位动画以便共享动画，





](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine)[

![混合遮罩和混合描述](images/static/document_list/empty_thumbnail.svg)

混合遮罩和混合描述

使用混合遮罩和混合描述来屏蔽骨骼或者改变单个骨骼的混合速度。





](/documentation/zh-cn/unreal-engine/blend-masks-and-blend-profiles-in-unreal-engine)[

![骨骼网格体LOD](images/static/document_list/empty_thumbnail.svg)

骨骼网格体LOD

使用骨骼网格体缩减工具生成和修改骨骼网格体的LOD





](/documentation/zh-cn/unreal-engine/skeletal-mesh-lods-in-unreal-engine)[

![骨骼网格体插槽](images/static/document_list/empty_thumbnail.svg)

骨骼网格体插槽

使用插槽在骨骼网格体中创建附加点。





](/documentation/zh-cn/unreal-engine/skeletal-mesh-sockets-in-unreal-engine)[

![虚拟骨骼](images/static/document_list/empty_thumbnail.svg)

虚拟骨骼

使用虚拟骨骼和IK来解决分层动画问题。





](/documentation/zh-cn/unreal-engine/virtual-bones-in-unreal-engine)[

![骨架编辑](images/static/document_list/empty_thumbnail.svg)

骨架编辑

使用骨架编辑工具创建和编辑骨架资产。





](/documentation/zh-cn/unreal-engine/skeleton-editing-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [skeleton](https://dev.epicgames.com/community/search?query=skeleton)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%88%9B%E5%BB%BA%E9%AA%A8%E6%9E%B6)
-   [骨架树信息](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E6%A0%91%E4%BF%A1%E6%81%AF)
-   [动画数据储存](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%95%B0%E6%8D%AE%E5%82%A8%E5%AD%98)
-   [共享骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%85%B1%E4%BA%AB%E9%AA%A8%E6%9E%B6)
-   [导入期间合并](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%AF%BC%E5%85%A5%E6%9C%9F%E9%97%B4%E5%90%88%E5%B9%B6)
-   [可兼容的骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%8F%AF%E5%85%BC%E5%AE%B9%E7%9A%84%E9%AA%A8%E6%9E%B6)
-   [骨架功能](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E5%8A%9F%E8%83%BD)