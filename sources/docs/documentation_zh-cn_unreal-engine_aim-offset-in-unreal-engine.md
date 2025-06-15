# 虚幻引擎中的瞄准偏移 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:35.857Z

---

目录

![瞄准偏移](https://dev.epicgames.com/community/api/documentation/image/211e5aea-95de-44bd-b06e-efd65ee58f14?resizing_type=fill&width=1920&height=335)

**瞄准偏移（Aim Offset）** 是一种[混合空间（Blend Space）](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine)，其中 **叠加** 了多个动画。一般来说，瞄准偏移用于创建多方向武器瞄准混合结构，然后叠加应用到默认的瞄准姿势。

#### 先决条件

-   你的项目包含一个骨骼网格体角色，并且包含所需的导入动画和姿势，可用作瞄准偏移（Aim Offset）图表中的示例。
-   你已了解[混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine)。本文中的瞄准偏移（Aim Offset）也是一种混合空间。

## 概述

瞄准偏移的主要设计理念是，让动画叠加在现有的某个"基础动画"上。以瞄准武器为例，这种"基础动画"通常就是"向前瞄准"动画。

![瞄准偏移基础动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1562760b-145c-4cd3-826d-a8d1e52aee95/aimbase.gif)

然后在此基础上，你可以在瞄准偏移（Aim Offset）图表中实现各种叠加姿势。所需姿势的数量取决于角色需要的动作。通常，瞄准空间示例系统如下所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1cbea2b-f3c5-4142-9afa-c384ce757a2a/aim_uprightbehind.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c06edaa2-4761-4270-9648-5a686c5e6ac1/aim_upright.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa75fdd3-6009-4e05-ad02-68f7462ac835/aim_up.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb856f8c-8956-40c6-a51a-92af0de88d16/aim_upleft.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb1b04df-d54c-4191-9273-a69ff26057d1/aim_upleftbehind.png)

上右后

上右

上

上左

上左后

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28355590-748e-4d28-99cc-51f502c72fda/aim_rightbehind.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ceaf1e51-3aa6-458a-8152-806e60c6092a/aim_right.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/420637ff-2fe7-4d7b-89ae-daa617f9cd30/aim_base.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60bc1467-56ae-4352-ad5e-bed0f87d408a/aim_left.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7a6c83f-85bf-42a4-825a-d7314eb20859/aim_leftbehind.png)

右后

右

基础

左

左后

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea4d2789-dcf7-428b-90ad-929fbda1c988/aim_downrightbehind.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1904205-5010-4126-9c92-c9f04b85482e/aim_downright.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f540ad3-bb7f-49db-9b2b-cc1d2a16b7a2/aim_down.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a92e6c63-5a7c-4ddc-b686-0a162bb6e378/aim_downleft.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/effe6c82-f527-4d63-a5af-984516aab409/aim_downleftbehind.png)

下右后

下右

下

下左

下左后

## 创建和设置

要在内容浏览器（Content Browser）中创建瞄准偏移（Aim Offset），请点击 **添加(+)（Add (+)）** ，在上下文菜单中选择 **动画（Animation）> 瞄准偏移（Aim Offset）** 或 [**瞄准偏移1D（Aim Offset 1D）**](/documentation/zh-cn/unreal-engine/blend-spaces-in-animation-blueprints-in-unreal-engine#1d)。创建新瞄准偏移时，你必须指定骨架资产。请务必选择将使用该瞄准偏移资产的骨骼网格体资产。

![创建瞄准资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c8e2e6b-f13b-43c7-bbc1-03d417b7177a/createaim.png)

打开新创建的瞄准偏移，继续设置。

### 基础姿势设置

由于在瞄准偏移中，你需要叠加各种动画，所以你先要设置一个基础动画，才能正确预览叠加效果。为此，请找到[资产细节（Asset Details）](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E8%B5%84%E4%BA%A7%E7%BB%86%E8%8A%82)面板中的 **预览基础姿势（Preview Base Pose）** 属性，指定要播放的动画资产。

![瞄准偏移预览基础姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0e75f42-8b65-41f6-ba98-ecde26a9e031/basepose.png)

### 引用瞄准姿势

和[混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine#%E5%B0%86%E5%8A%A8%E7%94%BB%E6%B7%BB%E5%8A%A0%E5%88%B0%E5%9B%BE%E8%A1%A8)类似，在创建瞄准偏移时，你需要在混合图表中引用动画。最简单的方法是，将动画从 **资产浏览器（Asset Browser）** 面板拖到图表中。

![添加动画瞄准偏移](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3704e81-3bcc-4ec4-8aad-376134661e4b/addanims.png)

创建瞄准偏移系统时，你要注意偏转动作（左右摆动）的动画效果。例如，角色站立不动时，你在[上文](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine#%E6%A6%82%E8%BF%B0)中看到的示例姿势没有问题。但是，如果你让角色在其他动画状态中播放，比如跑步或步行，就可能会出现问题。

为避免这种问题，你可以使用动画蓝图限制用于瞄准偏移的传入数据，以便仅在角色静止时使用左右摆动极值。你也可以更改瞄准偏移，仅上下瞄准角色，通过旋转实际角色来处理左右摆动。

### 网格体空间叠加

如果要让动画用于瞄准偏移，动画必须是叠加型，并且 **叠加动画类型（Additive Anim Type）** 设置为 **网格体空间（Mesh Space）** 。这是必要条件，因为瞄准偏移只接受叠加型动画。

为此，打开你的瞄准偏移中正在使用的所有 **动画序列（Animation Sequences）** 。在它们的 **资产细节（Asset Details）** 面板中，找到并设置以下属性：

-   将 **叠加瞄准类型（Additive Anim Type）** 设置为 **网格体空间（Mesh Space）** 。
-   将 **基础姿势类型（Base Pose Type）** 设置为 **选定动画帧（Selected animation frame）** 。
-   将 **基础姿势动画（Base Pose Animation）** 设为使用与[基础姿势设置](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine#%E5%9F%BA%E7%A1%80%E5%A7%BF%E5%8A%BF%E8%AE%BE%E7%BD%AE)相同的基础动画。
-   将 **参考帧索引（Ref Frame Index）** 设置为 **0** 。

![瞄准偏移叠加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40555853-9008-466d-99db-79fe659221c3/additive.png)

选择 **网格体空间（Mesh Space）** ，而非 **局部空间（Local Space）** 的原因在于，选择网格体空间后，可以在 **骨骼网格体组件（Skeletal Mesh Component）** 的空间中应用其叠加效果。这能确保无论骨骼网格体中前一个骨骼的朝向如何，旋转都朝同一方向移动。这对于瞄准偏移很重要，因为在某些情况下，无论角色的当前基础姿势如何，你可能希望来自混合空间的旋转得到一致的应用。

例如，如果你的角色能够在瞄准时侧身倾斜，这可能导致骨骼的整体局部空间向倾斜方向移动。如果叠加类型设置为 **局部空间（Local Space）** ，则可能导致向上瞄准姿势倾斜，并且不能正确朝上。将 **网格体空间（Mesh Space）** 作为你的叠加类型可纠正此问题，因为你可以按照自己的预期应用来自混合空间的旋转偏移。

![网格体空间局部空间叠加差异](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cb2e80f-8fa5-4c3a-b928-f89263a092bc/additive2.png)

1.  倾斜后的基础姿势。
2.  倾斜和向上瞄准姿势（局部空间叠加）。
3.  倾斜和向上瞄准姿势（网格体空间叠加）。

## 动画蓝图设置

创建瞄准偏移后，你可以在[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中引用它。与混合空间（Blend Spaces）类似，你可以将其作为[播放器](/documentation/zh-cn/unreal-engine/blend-spaces-in-animation-blueprints-in-unreal-engine#%E6%B7%B7%E5%90%88%E7%A9%BA%E9%97%B4%E6%92%AD%E6%94%BE%E5%99%A8)引用，它将直接引用瞄准偏移资产，你也可以将其作为[图表](/documentation/zh-cn/unreal-engine/blend-spaces-in-animation-blueprints-in-unreal-engine#%E6%B7%B7%E5%90%88%E7%A9%BA%E9%97%B4%E6%92%AD%E6%94%BE%E5%99%A8)引用，供你在动画图表中分散逻辑。

要在动画图表中引用瞄准偏移播放器（Aim Offset Player），请在图表中单击鼠标右键，从 **混合空间（Blend Spaces）** 类别中选择你的 **瞄准偏移播放器资产（Aim Offset Player Asset）** 。将输出连接到 **Output Pose** 节点。

![瞄准偏移动画蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b6d081d-6a5a-45e7-ab45-0a36045f80b0/animbp1.png)

你还必须将 **基础姿势（Base Pose）** 连接到Aim Offset节点，通常这是在[早前步骤基础姿势](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6%E5%90%8D%E7%A7%B0)，或使用类似基础姿势的[状态机](/documentation/zh-cn/unreal-engine/state-machines-in-unreal-engine)中定义的相同动画。

![瞄准偏移基础姿势移动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/037572f9-ab62-4be4-b8cd-cbd303647bf0/animbp2.png)

最后，你必须创建逻辑来驱动瞄准偏移的 **偏转（Yaw）** 值和 **俯仰（Pitch）** 值。根据你的播放器功能按钮，此逻辑可以用多种不同的方式创建。例如，你可以使用[属性访问](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine#%E5%B1%9E%E6%80%A7%E8%AE%BF%E9%97%AE)从pawn的基础瞄准旋转输出数据。

![aim offset values](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f96fbfad-a735-48a0-9e7b-839a7ba2cf22/animbp3.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [概述](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [创建和设置](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E8%AE%BE%E7%BD%AE)
-   [基础姿势设置](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine#%E5%9F%BA%E7%A1%80%E5%A7%BF%E5%8A%BF%E8%AE%BE%E7%BD%AE)
-   [引用瞄准姿势](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine#%E5%BC%95%E7%94%A8%E7%9E%84%E5%87%86%E5%A7%BF%E5%8A%BF)
-   [网格体空间叠加](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine#%E7%BD%91%E6%A0%BC%E4%BD%93%E7%A9%BA%E9%97%B4%E5%8F%A0%E5%8A%A0)
-   [动画蓝图设置](/documentation/zh-cn/unreal-engine/aim-offset-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE%E8%AE%BE%E7%BD%AE)