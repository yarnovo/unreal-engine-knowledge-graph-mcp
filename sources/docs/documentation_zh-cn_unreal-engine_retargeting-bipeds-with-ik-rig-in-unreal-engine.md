# 使用虚幻引擎中的IK Rig重定向两足角色 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:13.661Z

---

目录

![使用IK Rig重定向两足角色](https://dev.epicgames.com/community/api/documentation/image/d17e69e7-4522-4367-bb5b-443ae7e1b005?resizing_type=fill&width=1920&height=335)

虚幻引擎提供了灵活的工具，用于将动画从一个角色重定向到另一个角色。一种方法是将[IK Rig](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine)与[IK重定向器](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine)结合使用，这样就可以重定向带有迥异的骨架层级和比例的角色。重定向动画可用于在多个不同骨架之间共享动画数据，而无需在虚幻引擎之外创建和管理新动画。

本文档概述了如何使用这些工具在两个不同的两足角色之间重定向动画。

#### 先决条件

-   你的项目包含至少两个不同的两足角色。此示例使用[第三人称模板](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)和[Stack O Bot](https://www.fab.com/listings/b4dfff49-0e7d-4c4b-a6c5-8a0315831c9c)中可用的虚幻引擎人体模型。
-   两个角色应该有不同的骨架资产和骨骼层级，这样你以这种方式重定向的理由足够充分。否则，如果你的角色有相似的比例和层级，可能最好使用[兼容的骨架](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine#%E5%85%BC%E5%AE%B9%E7%9A%84%E9%AA%A8%E6%9E%B6)。

## 源和目标IK Rig设置

使用IK Rig重定向需要 **源** 和 **目标** 骨骼网格体，它们由这两个网格体各自的 **IK Rig资产（IK Rig Asset）** 定义。因此，你必须首先为重定向过程中使用的每个角色创建以 **IK Rig** 。

1.  打开内容浏览器，点击 **添加（Add (+)）> 动画（Animation）> IK Rig > IK Rig** 。
2.  选择你想将Rig添加到的骨骼网格体。
3.  为两个角色执行此操作，然后打开每个IK Rig资产。

![创建ik rig](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8cc822f-57d9-4972-a994-8cc43e4348cd/iksetup1.png)

### 重定向根骨骼

在两种IK Rig资产中，你必须为每个角色定义 **根骨骼** ，这通常是 **骨盆** 或 **臀部** 骨骼。这样做是为了成比例地定义和传输角色的根骨骼运动。

在 **层级（Hierarchy）** 面板中，右键点击骨骼，选择 **设置重定向根骨骼（Set Retarget Root）** 。在两种IK Rig资产中执行此操作。

![设置重定向根骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/766670dc-eb47-4e34-a834-8bcb0b89baaf/iksetup2.png)

完成后，所选骨骼会指示它在 **层级（Hierarchy）** 和 **IK重定向（IK Retargeting）** 面板中的 **重定向根骨骼（Retarget Root）** 中。

![重定向根骨骼指示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bec9aa22-58c9-4787-ba79-60661f6cdc33/iksetup3.png)

### 重定向链

你要在重定向过程中转移的肢体和其他附属物也必须在源和目标IK Rig上定义。这与在其他应用（如Autodesk MotionBuilder或Maya）中的 *表征* Rig类似。主要差异在于按 **关节链** 来定义，而不是按单个骨骼来定义。这为重定向具有截然不同骨骼结构的角色提供了灵活性。

你必须为要重定向的所有主要肢体创建链。你还可以选择为手指等次要肢体创建链。在此示例中，你将在两个IK Rig中创建以下链：

-   脊椎
-   左手臂
-   右手臂
-   颈部
-   头部
-   左腿
-   右腿

![重定向链](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/261b843f-58cf-46e8-8d95-d4b40c177a95/iksetup4.png)

要创建链，请按照以下步骤操作：

1.  在 **层级（Hierarchy）** 面板中选择链的第一个骨骼，然后沿层级向下选择所有骨骼，直至达到链的最后一个骨骼。
2.  右键点击这些骨骼，选择 **所选骨骼的新重定向链（New Retarget Chain from Selected Bones）** 。
3.  在 **添加新重定向链（Add New Retarget Chain）** 对话框窗口中，确保 **链名称（Chain Name）** 已正确设置，然后点击 **确定（OK）** 。在大部分情况下，IK Rig将自动从其[常见链名称](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%93%BE%E5%B1%9E%E6%80%A7%E5%92%8C%E5%90%8D%E7%A7%B0)列表中分配此值。
4.  在 **将目标添加到新链（Add Goal to New Chain）** 对话框窗口中，选择 **无目标（No Goal）** 。通常，你不需要添加[IK目标](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine#ik%E7%9B%AE%E6%A0%87)，除非你的重定向需要其他IK调整，例如[快速栽植](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine)、[步长扭曲](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%85%A8%E5%B1%80%E8%AE%BE%E7%BD%AE)或 **混合到源（Blend to Source）** 。

![创建链](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b76f0dd8-10b9-4831-8e54-e480f2a624b6/iksetup5.gif)

为两个IK Rig资产中的所有主要链重复此步骤。完成后， **IK重定向（IK Retargeting）** 面板应该填充有多个链。

![创建链](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f631c41b-62a0-4243-a9e7-309204296daa/iksetup6.png)

链可以只由单个骨骼组成。在肩部、颈部或头部骨骼等部位，可能会存在这种情况。在这些情况下，你仍可以在 **层级（Hierarchy）** 面板中右键点击单个骨骼，选择 **所选骨骼的新重定向链（New Retarget Chain from Selected Bones）** 。链条目将在 **起始骨骼（Start Bone）** 和 **末端骨骼（End Bone）** 字段中定义相同的骨骼。

## IK重定向

创建必要的骨骼链之后，你可以在 **IK重定向器（IK Retargeter）** 中开始重定向过程。IK重定向器是同时引用源和目标IK Rig的资产。在IK重定向器编辑器中，你可以自定义如何在源和目标之间转移动画。

### 创建和设置IK重定向器

要创建IK重定向器，请执行以下操作：

1.  点击内容浏览器中的 **添加（Add (+)）** ，然后选择 **动画（Animation）> IK重定向器（IK Retargeter）** 。
2.  在显示的对话框窗口中，选择你想重定向其中的动画的IK Rig。
3.  选择Rig后，命名新的IK重定向器资产，然后双击它，以在IK重定向器编辑器中打开。

![创建ik重定向器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5e849d6-766f-462f-b2e1-89cee5c3f0d2/retargeting1.png)

IK重定向器编辑器仅在视口和 **源IKRig资产（Source IKRig Asset）** 属性中显示源骨骼网格体。要添加目标角色，请点击 **目标IKRig资产（Target IKRig Asset）** 下拉菜单并选择目标IK Rig。

![添加目标ik rig](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff4d9e7c-9735-4c94-8342-88a79300e82f/retargeting2.png)

### 重定向之前的核对清单

继续之前，你应该核对一些事项，确保重定向过程准确无误。

-   在 **链映射（Chain Mapping）** 面板中，确保 **目标（Target）** 和 **源链（Source Chains）** 匹配。在大部分情况下，名称应该会正确自动匹配。如果不匹配，你可以点击 **源链（Source Chain）** 下拉菜单，并更改链分配以匹配 **目标链（Target Chain）** 。
    
    ![匹配链](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a7a6f3e-ebb1-42f7-801f-7cc59b062c94/retargeting3.png)
    
-   确保两个角色有匹配的引用姿势。如果这些引用姿势不同，例如一个角色是T姿势而另一个角色是A姿势，则你需要调整其[重定向姿势](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E5%A7%BF%E5%8A%BF)之一，使其匹配。
    
    ![匹配重定向姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b5580fc4-434a-452e-8187-15ae04a21886/retargeting4.png)
    
-   你可以选择在 **细节（Details）** 面板中调整偏移和缩放设置，更轻松地查看源和目标骨架。
    
    ![偏移目标角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a690360-096e-460c-b33f-de4ec1f3eae7/retargeting5.png)
    

### 预览重定向

在 **资产浏览器（Asset Browser）** 面板中，双击不同的动画，在不同的动画序列上预览重定向效果。

![预览重定向](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9581c36-68fd-48d2-a654-cef207db869a/retargeting6.gif)

### 导出重定向结果

对目标角色上的重定向结果感到满意后，你可以将动画导出到兼容该角色的骨架的[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)。为此，在 **资产浏览器（Asset Browser）** 面板中选择你想导出的动画，然后点击 **导出所选动画（Export Selected Animations）** 。

![导出所选动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c9ced98-45af-4d05-a0dc-793c7eb53295/retargeting7.png)

在对话框窗口中指定你的导出路径，并点击 **确定（OK）** 导出动画。重定向的动画现在将在带有后缀 `_Retargeted` 的输出文件夹中可用。

![导出命名](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/728006df-9d6a-473e-94d5-42bf80c88541/retargeting8.png)

## 修饰运动

如果你要将逼真的运动捕获动画重定向到非逼真的角色，生成的动画可能显示不正确或看起来很奇怪。这可能有点主观，但在这些情况下，最好执行额外步骤来修饰或减弱特定角色运动，实现更适合的外观。

例如，预览重定向的机器人角色上的奔跑动画时，你可能希望该角色更有弹性。以下步骤详述了如何实现这一点。

![无弹性地奔跑](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/207f5cfc-6a6b-4db9-8695-646b8dc1449a/embellishoff.gif)

![有弹性地奔跑](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb925fa7-88d3-41a4-b5c0-c4573b0d662f/embellishon.gif)

原始重定向结果

使用调整的设置重定向

### 创建IK目标

第一步是创建IK目标，确保在添加额外弹性时两脚保持在地面站稳。

假定还没有创建IK目标，打开目标角色的IK Rig资产。在 **层级（Hierarchy）** 面板中，右键点击某个脚步骨骼并选择 **新IK目标（New IK Goal）** 。

![创建新IK目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2463b215-15f9-47a4-8002-58d6e0735bf5/embellish1.png)

出现后续提示时，确保将 **肢体IK（Limb IK）** 设置为解算器，并点击 **添加解算器（Add Solver）** ，然后点击 **指定目标（Assign Goal）** 。

![添加解算器并指定目标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6956498f-e97c-4f2d-87e4-233def0ff6b8/embellish2.png)

接下来，确保在 **解算器堆栈（Solver Stack）** 面板中选择新创建的肢体IK解算器，然后右键点击大腿骨骼，选择 **在所选解算器上设置根骨骼（Set Root Bone on Selected Solver）** 。

![在所选解算器上设置根骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb20fcc2-03cc-450b-95f1-d2e78f6a35ff/embellish3.png)

为另一条腿执行上述相同步骤，直至你有两个IK目标和肢体IK解算器。

![肢体ik设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e937b1bd-90c1-42d4-aa55-fc8fd2affd5a/embellish4.png)

### IK重定向器根骨骼设置

接下来，返回IK重定向器资产，通过在视口中选择根骨骼调试可视化器或在 **链映射（Chain Mapping）** 面板中点击 **根骨骼设置（Root Settings）** ，打开根骨骼设置。

![根骨骼设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be495ce1-c8e1-45c7-81b7-9b05cd1a8737/embellish5.png)

你需要编辑的两个属性是 **水平缩放（Scale Horizontal）** 和 **平移偏移Z（Translate Offset Z）** 。

-   **水平缩放（Scale Horizontal）** 会增加重定向根骨骼（在大部分情况下是骨盆或臀部骨骼）上的动画曲线的总体比例，这会增加角色的总体垂直运动，但还会导致角色从地面抬升。
    
-   **平移偏移Z（Translate Offset Z）** 对此进行补偿。如果减小它，会降低重定向根骨骼，但不会影响其总体比例。
    

一起使用这两个属性，你就可以增加重定向角色的向上和向下弹性。属性的增加量或减小量取决于你的角色和动画。

![调整垂直比例和偏移](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71e861e8-2e5e-4512-96e0-72eb84a56c5a/embellish6.gif)

在此示例中，为了实现所需弹性， **平移偏移Z（Translate Offset Z）** 设置为 **\-173** ， **垂直缩放（Scale Vertical）** 设置为 **6** 。

![修饰结果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/665ff6e7-4662-4790-8c63-3079afaddde1/embellish7.gif)

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [源和目标IK Rig设置](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#%E6%BA%90%E5%92%8C%E7%9B%AE%E6%A0%87ikrig%E8%AE%BE%E7%BD%AE)
-   [重定向根骨骼](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E6%A0%B9%E9%AA%A8%E9%AA%BC)
-   [重定向链](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E9%93%BE)
-   [IK重定向](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#ik%E9%87%8D%E5%AE%9A%E5%90%91)
-   [创建和设置IK重定向器](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E8%AE%BE%E7%BD%AEik%E9%87%8D%E5%AE%9A%E5%90%91%E5%99%A8)
-   [重定向之前的核对清单](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E4%B9%8B%E5%89%8D%E7%9A%84%E6%A0%B8%E5%AF%B9%E6%B8%85%E5%8D%95)
-   [预览重定向](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#%E9%A2%84%E8%A7%88%E9%87%8D%E5%AE%9A%E5%90%91)
-   [导出重定向结果](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#%E5%AF%BC%E5%87%BA%E9%87%8D%E5%AE%9A%E5%90%91%E7%BB%93%E6%9E%9C)
-   [修饰运动](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#%E4%BF%AE%E9%A5%B0%E8%BF%90%E5%8A%A8)
-   [创建IK目标](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#%E5%88%9B%E5%BB%BAik%E7%9B%AE%E6%A0%87)
-   [IK重定向器根骨骼设置](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine#ik%E9%87%8D%E5%AE%9A%E5%90%91%E5%99%A8%E6%A0%B9%E9%AA%A8%E9%AA%BC%E8%AE%BE%E7%BD%AE)