# 在虚幻引擎中使用IK重定向器修正滑步 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:14.353Z

---

目录

![使用IK重定向器修正滑步](https://dev.epicgames.com/community/api/documentation/image/68a0c0b1-d883-4988-8b89-43829f1b9ad7?resizing_type=fill&width=1920&height=335)

使用[IK重定向器](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine)在不同角色之间重定向动画时，目标角色可能会出现明显的滑步。如果源角色和目标角色之间的腿长和姿态迥异，造成腿重定向出现瑕疵，就会发生这种情况。要解决此问题，你可以使用 **快速栽植（Speed Planting）** 工作流程，在[IK目标](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine#ik%E7%9B%AE%E6%A0%87)不应移动时将其固定在适当位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37089491-ff35-4360-871c-e70dd5c6f00d/speedplantoff.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00662cac-3347-47f0-890a-eeb14a73754d/speedplanton.gif)

原始重定向结果

使用快速栽植修改后的重定向结果

本文档将介绍如何使用快速栽植（Speed Planting）解决重定向动画中的滑步问题。

#### 先决条件

-   你已使用IK重定向器将动画从一个角色重定向到另一个角色。有关如何执行此操作的信息，请参阅[使用IK Rig重定向两足角色](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine)页面。
-   你熟悉在IK Rig中创建\[全身IK\]（(animating-characters-and-objects/SkeletalMeshAnimation/AssetsFeatures/IKRig/IKEditor/IKSolvers#全身IK)解算器的操作。

## 源动画设置

设置快速栽植（Speed Planting）的第一步是，在源动画中创建[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)，定义整个动画过程中每个足部骨骼的速度。为此，你可以使用[动画数据修饰符](/documentation/zh-cn/unreal-engine/animation-modifiers-in-unreal-engine)生成该曲线，从而快速产生准确运动数据。此步骤是为了使用动画曲线数据来确定足部在动画过程中的踏点。

### 动画数据修饰符

在你的源[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)中，从主菜单转到 **窗口（Window）> 动画数据修饰符（Animation Data Modifiers）** 。

![打开动画数据修饰符](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9efda458-8f87-4fc1-8145-98e1f7c24734/setup1.png)

接下来，点击 **添加修饰符（Add Modifier）> MotionExtractorModifier** 添加运动提取器修饰符。对源动画中的每个足部骨骼执行此操作。在本例中，添加了两个运动提取器修饰符。

![添加运动提取器修饰符](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d6b2261-d4c9-47fc-8de6-be717d7df967/setup2.png)

在两个运动提取器修饰符中，设置以下属性：

-   **骨骼名称（Bone Name）** ：需要留意速度的足部骨骼的名称。本例使用 `ball_r` 和 `ball_l` 骨骼。
-   **运动类型（Motion Type）** ：平移速度。
-   **轴（Axis）** ：XYZ。

![运动提取器修饰符属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/694eaf97-eccb-4609-b39b-07d3f8c317cc/setup3.png)

### 生成速度曲线

设置动画数据修饰符后，点击 **应用所有修饰符（Apply All Modifiers）** 生成指定骨骼的速度曲线。

![应用所有修饰符](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5be6a9e5-22b7-479d-b623-6e6bb0010bcc/setup4.png)

双击曲线轨道打开[曲线编辑器](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)，你可以在其中看到有关它的更多详细信息。选择关键帧或将光标悬停在其上来查看值。该信息可用于确定足部踏地时应使用的速度阈值。大多数情况下，这意味着曲线的下部平坦段是足部静止的时候，而峰值是足部运动的时候。

![检查曲线编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a8bda3c-5aa7-4b77-a088-82f31a740bf7/setup5.png)

因为你修改了该动画序列和[骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)（由于创建了新的曲线），所以现在两个资产都必须要保存。

## IK Rig设置

继续设置，现在你必须为目标角色上的腿部链创建IK目标和解算器。此示例使用了[全身IK（FBIK）](/documentation/zh-cn/unreal-engine/ik-rig-solvers-in-unreal-engine#%E5%85%A8%E8%BA%ABik)解算器，但你可以根据角色选择其他种类的[IK Rig解算器](/documentation/zh-cn/unreal-engine/ik-rig-solvers-in-unreal-engine)。必须执行此步骤，才能在动画期间腿部静止时使用IK固定腿部。

### 创建FBIK

打开用于重定向的目标角色的 **IK Rig资产（IK Rig Asset）** ，找到 **层级（Hierarchy）** 面板，在其中一个腿部重定向链中的末端骨骼上右键点击，然后选择 **新建IK目标（New IK Goal）** 。

![新建IK目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b284361d-94b8-4e4c-bd11-4ec8e7deaf4b/fbik1.png)

出现后续提示时，确保将 **全身IK（Full Body IK）** 设置为解算器，并点击 **添加解算器（Add Solver）** ，然后点击 **指定目标（Assign Goal）** 。

![添加解算器并指定目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/431fced9-7e26-48a2-ade7-4e6c065d509f/fbik2.png)

接下来，确保在 **解算器堆栈（Solver Stack）** 面板中选择了新创建的全身IK解算器，右键点击另一个足部骨骼，选择 **新建IK目标（New IK Goal）** ，然后点击 **指定目标（Assign Goal）** 。

![新建ik目标并指定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b259ad3-3735-4bb9-890f-acee164d470d/fbik3.png)

最后，选择 **全身IK（Full Body IK）** 解算器，然后右键点击层级中的根骨骼并选择 **在所选解算器上设置根骨骼（Set Root Bone on Selected Solver）** 。通常，FBIK解算器的根骨骼是骨盆或臀部。

![在所选解算器上设置根骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/818e1d77-d14a-49b7-a8af-99e5a51dcf4c/fbik4.png)

### FBIK设置

根据你的角色腿部的骨骼结构，你可能还需要为FBIK解算器控制的骨骼创建额外的骨骼设置。这将解决FBIK解算可能造成的刚度或关节旋转不正确的问题。要创建骨骼设置，请选择 **全身IK解算器（Full Body IK Solver）** ，然后右键点击你要创建设置的骨骼，然后选择 **添加设置到选定骨骼（Add Settings to Selected Bone）** 。

![fbik设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55d9bb28-68c0-417a-9322-3ed874b65a52/fbiksettings1.gif)

在本例中，为了解决某些腿部骨骼的旋转刚度，为这些骨骼创建了具有以下属性的骨骼设置：

-   **thigh\_l**
    -   **使用偏好角度（Use Preferred Angles）** ：启用（Enabled）
    -   **偏好角度（Preferred Angles）** ：0、0、-45
-   **calf\_l**
    -   **使用偏好角度（Use Preferred Angles）** ：启用（Enabled）
    -   **偏好角度（Preferred Angles）** ：0、0、45
-   **thigh\_r**
    -   **使用偏好角度（Use Preferred Angles）** ：启用（Enabled）
    -   **偏好角度（Preferred Angles）** ：0、0、-45
-   **calf\_r**
    -   **使用偏好角度（Use Preferred Angles）** ：启用（Enabled）
    -   **偏好角度（Preferred Angles）** ：0、0、45

![fbik偏好角度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc9a5303-4bba-41be-b246-e5da883e7847/fbiksettings2.png)

根据你的角色的需要，可能需要其他骨骼设置来确保你的FBIK解算器正常工作，如 **刚度（Stiffness）** 、 **限制（Limits）** 和 **质量乘数（Mass Multiplier）** 。有关更多信息，请参阅[解算器](/documentation/zh-cn/unreal-engine/ik-rig-solvers-in-unreal-engine)页面的 **全身IK** 小节。

## IK重定向器中的快速栽植

接下来，为你的角色打开 **IK重定向器资产（IK Retargeter Asset）** 。在视口中选择IK目标或链，并在 **细节（Details）** 面板中启用 **快速栽植（Speed Planting）** 。

![启用快速栽植](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05fbc889-0ce0-4887-9d56-3ede4a57be0d/speed1.png)

在 **快速栽植（Speed Planting）** 分段设置以下属性：

-   将 **速度曲线名称（Speed Curve Name）** 设置为先前在源角色上生成的对应腿部曲线的名称。在本例中，它设置为 `ball_l_translation_speed_XYZ` 。
-   根据生成的曲线值，你可能需要将 **速度阈值（Speed Threshold）** 调整为略高于曲线平坦段的数值。如果发现角色的足部仍不当离地，则增加此数字。在本例中，设置为 **30** 。

对目标角色上所有必要的腿部链执行此操作。

![快速栽植属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f710efa8-a10c-4815-950b-720641de8160/speed2.png)

## 最终效果

现在，当你在重定向器中播放动画时，应该会看到目标角色的足部踏地得到改善。你现在可以将重定向后的动画[导出](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine#%E9%A2%84%E8%A7%88%E5%8A%A8%E7%94%BB%E5%92%8C%E5%AF%BC%E5%87%BA)导出到新的动画序列。

![最终效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71d787e3-4a7b-4218-8906-1abfa7dcab10/speed3.gif)

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [源动画设置](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine#%E6%BA%90%E5%8A%A8%E7%94%BB%E8%AE%BE%E7%BD%AE)
-   [动画数据修饰符](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine#%E5%8A%A8%E7%94%BB%E6%95%B0%E6%8D%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)
-   [生成速度曲线](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine#%E7%94%9F%E6%88%90%E9%80%9F%E5%BA%A6%E6%9B%B2%E7%BA%BF)
-   [IK Rig设置](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine#ikrig%E8%AE%BE%E7%BD%AE)
-   [创建FBIK](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine#%E5%88%9B%E5%BB%BAfbik)
-   [FBIK设置](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine#fbik%E8%AE%BE%E7%BD%AE)
-   [IK重定向器中的快速栽植](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine#ik%E9%87%8D%E5%AE%9A%E5%90%91%E5%99%A8%E4%B8%AD%E7%9A%84%E5%BF%AB%E9%80%9F%E6%A0%BD%E6%A4%8D)
-   [最终效果](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine#%E6%9C%80%E7%BB%88%E6%95%88%E6%9E%9C)