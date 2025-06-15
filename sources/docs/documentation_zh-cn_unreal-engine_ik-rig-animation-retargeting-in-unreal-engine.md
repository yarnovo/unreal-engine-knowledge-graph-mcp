# 虚幻引擎中的IK Rig动画重定向 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:06:00.965Z

---

目录

![IK Rig重定向](https://dev.epicgames.com/community/api/documentation/image/031f6888-ea55-4a6e-829d-36818c053bc2?resizing_type=fill&width=1920&height=335)

你可以使用 **IK Rig** 在不同的 **骨骼网格体（Skeletal Meshes）** 之间创建动画重定向。这与虚幻引擎的传统[动画重定向](/documentation/zh-cn/unreal-engine/animation-retargeting-in-unreal-engine)功能的不同之处在于，你可以在骨骼数量、骨骼名称和方向不同的骨架之间传输动画，同时使用IK选择性地维持精确的手部或脚部接触点。

所谓动画重定向，就是在多个不同骨架之间共享动画数据，并且无需在虚幻引擎之外创建和管理新动画。

本页面概括介绍了 **IK重定向器（IK Retargeter）** 。

关于虚幻引擎的自动重定向工具的更多使用信息，请参阅[自动重定向](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine)一文。

#### 先决条件

-   你的项目应有两个不同的骨骼网格体来对重定向进程求值。
-   已经创建IK Rig资产并已在其中定义重定向链。有关如何执行此操作的信息，请参阅[使用IK Rig重定向两足角色](/documentation/zh-cn/unreal-engine/retargeting-bipeds-with-ik-rig-in-unreal-engine)页面。

## 创建和概述

要创建IK重定向器，请在内容浏览器中点击 **添加（Add (+)）** ，然后选择 **动画（Animation）> IK Rig > IK重定向器（IK Retargeter）** 。界面上将显示对话框窗口，你必须在其中选择要用于重定向动画的IK Rig。选择之后，命名并打开 **IK重定向器资产（IK Retargeter Asset）** 。

![创建ik重定向器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2c1b0e7-c30f-4bbd-a251-c16053b65d06/create1.png)

IK重定向器包含以下工具和选项：

![ik重定向器编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/face31fe-8554-4f3a-b7ba-7d25d96b39a0/create2.png)

1.  [重定向姿势](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%A7%BF%E5%8A%BF%E7%BC%96%E8%BE%91)，你可以在源或目标角色上编辑、保存和导入基础重定向姿势。
2.  **视口（Viewport）** ，你可以预览和调试已经重定向的源和目标角色。
3.  [细节面板](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E6%A0%87%E5%A4%B4%E5%90%8D%E7%A7%B0)，用于显示所选项的属性，或在其他模式处于活动状态时显示。
4.  [层级](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%B1%82%E7%BA%A7%E6%98%BE%E7%A4%BA)，显示任一角色上骨骼及分配给它的链的可筛选列表。
5.  **重定向输出日志（Retarget Output Log）** ，用于显示调试信息、警告和错误，指示IK重定向器的当前状态。
6.  [链映射](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E9%93%BE)，用于将目标链映射到源链。**资产浏览器（Asset Browser）** 用于[预览和导出](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%A2%84%E8%A7%88%E5%8A%A8%E7%94%BB%E5%B9%B6%E5%AF%BC%E5%87%BA)重定向的动画。

## 重定向链

你必须在源和目标IK Rig上定义要在重定向过程中传输的肢体和其他附属物。这个过程类似于在其他应用程序（如Autodesk MotionBuilder或Maya）中"表征"绑定。主要区别在于是通过 **关节链** 而不是单个骨骼来定义它。这为重定向具有截然不同的骨骼结构的角色提供了灵活性。

例如，如果目标角色拥有比源角色更多的臂关节，重定向行为仍可正常运行，因为你会定义整个手臂链，无论骨骼数量是多少。

![重定向链示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a05d35e3-44c0-4b49-adc5-779898c4474c/chains1.png)

1.  源手臂链。
2.  目标手臂链。

### 链的创建

重定向链可在[IK Rig编辑器](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine)中创建。要创建链，请打开两个角色的IK Rig资产，找到IK重定向面板，然后执行以下操作：

1.  点击 **添加新链（Add New Chain (+)）** 。
    
    ![添加新链](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6f05447-37a6-46c8-aae8-117e484104ca/chains2.png)
    
2.  在 **添加新重定向链（Add New Retarget Chain）** 对话框窗口中，确保 **链名称（Chain Name）** 设置正确，然后点击 **确定（OK）** 。在大部分情况下，IK Rig将使用其[常见链名称](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%93%BE%E5%B1%9E%E6%80%A7%E5%92%8C%E5%90%8D%E7%A7%B0)列表自动指定该值。
    
    ![链名称](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8987423-d6d3-48f7-96a8-0b705c07b8ed/chains3.png)
    
3.  在 **将目标添加到新链（Add Goal to New Chain）** 对话框窗口中，选择 **无目标（No Goal）** 。通常，你不需要添加[IK目标](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine#ik%E7%9B%AE%E6%A0%87)，除非你的重定向需要其他IK调整，例如[快速栽植](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine)、[步幅扭曲](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%85%A8%E5%B1%80%E8%AE%BE%E7%BD%AE)或 **混合到源（Blend to Source）** 。
    
    ![将目标添加到新链](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/337fe3fb-72bd-47d6-bb4a-9daaa4c0a6d7/chains4.png)
    

通过选择意向链中的每个 **骨骼**，在 **层级（Hierarchy）** 面板中右键单击，然后选择 **从所选骨骼新建重定向链（New Retarget Chain from Selected Bones）**，也可以创建链。

![用所选骨骼的新建重定向链](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7bb3c02-b588-4488-a1ba-5a70ca479c2e/chain3.png)

### 链属性和名称

链需要设置以下参数：

名称

说明

**链名称（Chain Name）**

链的名称。它可以是任意名称，但应与另一个IK Rig中的预期重定向链匹配。

匹配链名称过程由[模糊（Fuzzy）](https://en.wikipedia.org/wiki/Approximate_string_matching)字符串匹配确定。因此，尽管每个IK Rig中的 **链名称（Chain Names）** 不必完全匹配，仍应尽力匹配它们。例如，只要没有更准确的名称，链名称 `ArmLeft` 可以匹配 `left_arm`。

**起始骨骼（Start Bone）**

重定向链的起始骨骼。如果要重定向手臂，通常会在此处选择上臂骨骼。

**末端骨骼（End Bone）**

重定向链的末端骨骼。如果要重定向手臂，通常会在此处选择手骨骼。

**IK目标（IK Goal）**

你可以根据需要在此处选择[IK目标](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine#ik%E7%9B%AE%E6%A0%87)来[稳定肢体或链](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E4%BD%BF%E7%94%A8ik%E7%9B%AE%E6%A0%87%E9%87%8D%E5%AE%9A%E5%90%91)，以免无法以良好的准确度重定向。这意味着，你还需要为这些目标创建[解算器](/documentation/zh-cn/unreal-engine/ik-rig-solvers-in-unreal-engine)，解算器将在重定向过程之后执行其解算。

**链名称（Chain Name）** 属性会根据创建链时使用的所选骨骼的名称自动填充。系统会查找使用过的常见骨骼名称，然后选取最符合所选骨骼的名称。此映射列表如下所示：

链名称映射

要搜索的骨骼名称

**头部（Head）**

`head`

**颈部（Neck）**

`neck`

**腿部（Leg）**

`leg` `hip` `thigh` `calf` `knee` `foot` `ankle` `toe`

**手臂（Arm）**

`arm` `clavicle` `shoulder` `elbow` `wrist` `hand`

**脊椎（Spine）**

`spine`

**下颌（Jaw）**

`jaw`

**尾部（Tail）**

`tail` `tentacle`

**拇指（Thumb）**

`thumb`

**食指（Index）**

`index`

**中指（Middle）**

`middle`

**无名指（Ring）**

`ring`

**小指（Pinky）**

`pinky`

**根骨骼（Root）**

`root`

对于对称链，例如手臂和腿部，自动命名功能通过比较链中骨骼的平均位置决定骨骼名称，然后分配前缀 **左（Left）** 或 **右（Right）**。如果所选骨骼大部分位于负X端，则为“左（Left）”，正X为“右（Right）”，如果它们在X轴上相对居中的位置，则被视为“中心（Center）”，而不应用前缀。

如果为使用相似名字的骨骼创建了多个链，将为每个后续链应用数字后缀。例如，如果你重定向有多个头部的生物，则生成的链的名称将为 **Head\_1** 、 **Head\_2** 和 **Head\_3** 。你可以随意手动命名你的链，但此惯例有助于建立标准命名规范并使用其他IK Rig快速重定向。

### 链显示和映射

**链映射（Chain Mapping）** 面板显示源和目标链及其映射关系。你可以使用 **源链（Source Chain）** 的下拉菜单指定不同的链映射或纠正不匹配情况。

![更改源链](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3896a9b1-d5f7-412a-88c0-d9bfaec1df20/retargeter4.png)

链默认在视口中绘制，可以被选中，这会在链映射面板中将链高亮显示。你可以在[细节](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E8%AE%BE%E7%BD%AE)面板中编辑链调试可视化。

![选择链](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2be11b7-728c-4732-9259-7d60294d2d63/chains5.gif)

### 重定向根骨骼

除了定义链，你还必须定义 **重定向根骨骼（Retarget Root）** ，这通常是 **骨盆** 或 **臀部** 骨骼。这样做是为了成比例地定义和传输角色的根骨骼运动。

与链一样，重定向根骨骼在IK Rig编辑器中定义。为此，打开用于两个角色的 **IK Rig资产（IK Rig Asset）** ，找到 **层级（Hierarchy）** 面板，右键点击骨骼，然后选择 **设置重定向根骨骼（Set Retarget Root）** 。

![设置重定向根骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87286d2c-a33e-4bc5-8d1d-d0896a328694/retargetroot1.png)

完成后，重定向根骨骼将在 **层级（Hierarchy）** 和 **IK重定向（IK Retargeting）** 面板中表示选中的骨骼。

![重定向根骨骼指示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cc05125-89ae-4f73-9626-e150d8e8d97e/retargetroot2.png)

## 重定向姿势

根据被重定向的角色的引用姿势，可能需要以基本 **重定向姿势（Retarget Pose）** 的形式编辑姿势。通常，如果目标角色的引用姿势与源不同，例如处于T姿势而不是A姿势，就需要执行此操作。匹配这些重定向姿势将提高重定向的准确。

![重定向姿势比较](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/637deb45-6ddf-471a-8bae-afb91d2589a7/pose1.png)

1.  源角色的引用姿势为A姿势。
2.  目标角色的引用姿势为T姿势。

你可以使用 **层级（Hierarchy）** 面板中的 **重定向姿势（Retarget Pose）** 工具编辑、导入或导出不同姿势，来解决引用姿势差异。

![重定向姿势工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c52fe486-ccf6-46c2-aa6e-30ee12449f43/poseedit1.png)

点击 **源（Source）** 或 **目标（Target）** 会将重定向姿势工具和层级面板的焦点更改为源或目标角色。如果视口中启用了骨骼绘制，则骨架将以彩色高亮来显示当前焦点Rig。

![更改源或目标焦点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1806dd4-a64b-4a00-adea-75453a5bd420/poseedit2.gif)

### 创建和编辑姿势

虽然你可以为任何被重定向的角色编辑 **默认姿势（Default Pose）** ，但我们建议 创建 **新** 重定向姿势，以防需要做出调整。为此，点击 **创建（Create (+)）> 新建（Create New）** ，然后点击 **确定（Ok）** 。

![新建重定向姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a8c80ab-7e99-45c0-9287-7e7700321158/poseedit3.png)

接下来，确保将 **当前重定向姿势（Current Retarget Pose）** 设置为新姿势，然后 **启用编辑模式（enable Edit Mode）** 。现在你可以在视口中选择和修改骨骼并匹配姿势。完成后， **禁用** 编辑模式。

![编辑重定向姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcca4760-6392-428e-84ef-7208ac614ae7/poseedit4.gif)

要额外提高精度，你可以在 **细节（Details）** 面板中以数字方式修改重定向姿势，其中旋转值0, 0, 0会将骨骼返回到其引用姿势。

### 导入和导出姿势

除了手动新建重定向姿势之外，你还可以从[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)或[姿势资产](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine)导入它们。

要从 **动画序列（Animation Sequence）** 导入，请点击 **创建（Create (+)）> 从动画序列导入（Import from Animation Sequence）** 。在对话框窗口中，选择要从中导入的序列并设置以下参数：

-   **序列帧（Sequence Frame）** 定义了动画序列中要作为导入的姿势基础的特定帧。这默认设置为 **0** ，这将使用动画的第一帧。
-   **姿势名称（Pose Name）** 定义导入时重定向姿势的名称。

![从动画导入姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/680d46a7-a505-42f1-8d38-65ddc3e1198e/poseedit5.png)

要从 **姿势资产（Pose Asset）** 导入，请点击 **创建（Create (+)）> 从姿势资产导入（Import from Pose Asset）** 。在对话框窗口中，选择要从中导入的姿势，点击下拉菜单以设置要使用的特定姿势名称，然后选择 **导入重定向姿势（Import Retarget Pose）** 。

![从姿势资产导入姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0238fb02-1668-4a43-99d2-e6225e6490e4/poseedit6.png)

你还可以将重定向姿势导出为 **姿势资产（Pose Asset）** ，与项目中的其他IK重定向资产共享。方法是点击 **创建（Create (+)）> 导出姿势资产（Export Pose Asset）** ，为你的资产设置名称，然后点击 **保存（Save）** 。

![导出重定向姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad4945e6-b585-415b-af67-f94ff9b4a5af/poseedit7.png)

### 杂项工作流程

重定向姿势区域还包含以下杂项工具，可辅助创建和编辑你的重定向姿势：

名称

说明

**当前重定向姿势（Current Retarget Pose）**

显示源或目标角色使用的当前重定向姿势。这里最初只有 **默认姿势（Default Pose）** ，会在你创建新姿势后逐步填充新项目。你可以点击下拉菜单，选择不同的姿势。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/784ff0b1-4d6d-494d-8487-eceaa5552956/posemisc1.png)

**运行重定向器/显示重定向姿势（Run Retargeter / Show Retarget Pose）**

启用后，这会采用重定向器，以便你可以使用动画序列预览当前重定向姿势的结果。禁用此项会切换回重定向姿势模式，你可以在这里继续根据需要进一步优化。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c65a8592-470e-4be2-ae59-e875cb8806b3/posemisc2.gif)

视口将以蓝色轮廓高亮显示，表明重定向姿势模式已启用。

**重定向姿势混合（Retarget Pose Blend）**

在你对重定向姿势做出多项编辑时，预览哪些骨骼上发生了哪些更改可能很有用。为此，你可以编辑重定向姿势混合滑块。将其设置为 **0** 会将姿势改回骨骼网格体默认引用姿势。将其设置为 **1** 会将姿势更改为当前重定向姿势。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54eef6ef-6290-483f-9e6d-0a48c85180dd/posemisc3.gif)

**重置（Reset）**

你可以使用 **重置（Reset）** 菜单，将重定向姿势重置回骨骼网格体默认引用姿势。你可以选择以下选项：

-   **重置所选骨骼（Reset Selected Bones）** ，这只会重置你在视口或层级中选中的骨骼。
-   **重置所选骨骼和子骨骼（Reset Selected and Children Bones）** ，这只会重置你在视口或层级中选择的骨骼及其子项。
-   **重置全部（Reset All）** ，这会重置所有骨骼。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc996a94-5cda-4957-bb3b-9d3d48c3083d/posemisc4.gif)

**复制（Duplicate）**

你可以点击 **创建（Create (+)）> 复制当前（Duplicate Current）** 来复制当前重定向姿势，然后为新姿势命名。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f18c0c70-8500-4f11-a803-3c8d79b8d036/posemisc5.png)

**重命名（Rename）**

要重命名当前重定向姿势，请点击 **重命名（Rename）** ，输入新名称，然后点击 **确定（Ok）** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84dc1747-e85c-496d-a8ed-c6ed43e513ac/posemisc6.png)

## 层级显示

层级面板将显示源或目标角色的骨骼层级，具体取决于启用了哪一个。骨骼名称通过高亮显示表明其是否在[重定向链](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E9%93%BE)中被使用，此外重定向链列中也会显示使用该骨骼的链的名称。

![层级面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b89b5081-7cf3-4312-ad23-a605e0441576/hierarchy1.png)

你可以搜索以查找并筛选特定骨骼名称或重定向链。

![层级搜索](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45194732-6303-4003-a5b0-d45ce350ba14/hierarchy2.png)

你还可以点击筛选器下拉菜单，设置以下筛选器：

-   **隐藏不在链中的骨骼（Hide Bones Not in a Chain）** ，这会隐藏未在链中使用的骨骼，无论IK重定向器是否正在使用该链。
-   **隐藏未重定向的骨骼（Hide Bones Not Retargeted）** ，这会隐藏IK重定向器未使用的所有骨骼。
-   **隐藏重定向的骨骼（Hide Retargeted Bones）** ，这会隐藏IK重定向器使用的骨骼

![层级筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9dedddc0-74aa-4a19-8a16-52fda700150e/hierarchy3.png)

## 预览动画并导出

**资产浏览器（Asset Browser）** 面板用于预览并导出不同资产的重定向效果。双击资产即可播放。

![预览动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27b0fab0-8c2f-4dd3-b365-d56dfb228a41/retargeter3.gif)

对目标角色上的重定向结果感到满意后，你可以将动画导出到兼容该角色骨架的[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)。方法是在 **资产浏览器（Asset Browser）** 面板中选择你想导出的动画，然后点击 **导出所选动画（Export Selected Animations）** 。

![导出所选动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/715bf50a-5e18-46cd-b71e-196fd64c7c26/export1.png)

在导出对话框窗口中，选择导出文件夹，然后根据需要指定以下重命名属性：

-   **添加前缀（Add Prefix）** ，这会在新资产名称之前添加文本。
-   **添加后缀（Add Suffix）** ，这会在新资产名称之后添加文本。
-   **搜索（Search for）** 和 **替换为（Replace with）** ，这会在文件名中搜索现有名称，并将其替换为指定的名称。搜索和替换不区分大小写。

点击 **导出（Export）** 可保存重定向的动画序列。

![导出重定向的动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41032e4d-5121-41a2-a0de-cb20b207b1a2/export2.png)

## 批量重定向

大部分[动画资产](/documentation/zh-cn/unreal-engine/animation-assets-and-features-in-unreal-engine)，例如动画序列、混合空间或动画蓝图，都可以使用 **批量重定向** 从[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)快速重定向。

在 **内容浏览器（Content Browser）** 中，选择你想重定向的动画资产，然后右键点击它们并选择 **重定向动画资产（Retarget Animation Assets）> 复制并重定向动画资产（Duplicate and Retarget Animation Assets）** 。

![批量重定向动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ff4546c-b36f-4e0c-9c39-f214730163c8/batch1.png)

批量重定向器窗口弹出后，你可以在其中自定义重定向行为和结果，然后再开始批量处理。

![批量重定向概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8703fb51-a795-43f3-a20d-e86884acf8cd/batch2.png)

1.  源和目标骨骼网格体预览。这些面板只有在你指定 **IK重定向器（IK Retargeter）** 之后才会处于活动状态。处于活动状态之后，如果你想更改要重定向到的角色，你可以更改目标骨骼网格体。
    
    若将目标更改为与IK重定向器中所定义的骨架完全不同的骨架，可能会生成不正确的结果。
    
2.  IK重定向器资产，用于告知源和目标骨骼网格体以及重定向批量处理。
3.  文本字段，你可以在其中指定输出资产名称的新前缀和后缀修饰符，以及搜索和替换文本。**旧名称** 和 **新名称** 字段将显示你输入的文本内容的预览。
4.  重定向的资产将保存到的输出文件夹。
5.  重新映射引用资产将允许引用了其他重定向的资产的资产（例如引用动画序列的混合空间）重新映射到新创建的重定向结果。
    
    -   禁用此项将保持原始引用，并可能在资产引用的动画不再兼容新骨架时导致问题。
    -   启用此项后，如果你不重定向引用的所有资产，可能会导致引用问题。
    

点击 **重定向（Retarget）** 开始批量重定向处理。

![导出批量资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91a703eb-8c63-4212-bcaa-7933d86050cc/batch3.png)

## 重定向器属性和设置

### 编辑器设置

IK重定向器的 **细节（Details）** 面板在未选择内容时包含以下属性。

![编辑器设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81090ad8-93cd-4c04-9568-586d34605602/details1.png)

名称

说明

**源IKRig资产（Source IKRig Asset）**

要从中复制动画的源IK Rig。

**源预览网格体（Source Preview Mesh）**

源骨骼网格体。你可以更改此项，IK重定向系统将使用名称匹配，尝试使IK Rig兼容不同的网格体和骨架。

**目标IKRig资产（Target IKRig Asset）**

要将动画复制到的目标IK Rig。

**目标预览网格体（Target Preview Mesh）**

目标骨骼网格体。你可以更改此项，IK重定向系统将使用名称匹配，尝试使IK Rig适应提供的骨架和比例。不兼容情况会在 **重定向输出日志（Retarget Output Log）** 中被打印为警告或错误。

**目标网格体偏移（Target Mesh Offset）**

可以应用于目标骨骼网格体，将其从源网格体位置移开。这有助于帮助预览两个角色，在目标角色非常大，需要更大偏移量时也非常有用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b309021-5a65-45c3-a8a2-a2baef8a1c2f/details2.gif)

**目标网格体比例（Target Mesh Scale）**

预览比例修改器，可用于增加或减少目标角色的比例。如果你的目标相对于源非常小或非常大，此功能很有用，更改此值可以更方便地调整目标的大小。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d77b8b2f-da94-45cb-8569-84538bd497e4/details3.gif)

**源网格体偏移（Source Mesh Offset）**

类似于 **目标网格体偏移（Target Mesh Offset）** ，这是可以应用于源骨骼网格体的位置偏移，以将其从目标网格体位置移开。

**调试绘制（Debug Draw）**

在视口中为目标角色启用绘制链和根骨骼调试视觉效果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b75b066-2f34-4f2b-9090-86bea1ec9acf/details4.gif)

**绘制最终目标（Draw Final Goals）**

为目标角色启用链使用的绘制IK目标。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/527a532c-b9d0-4ca7-a285-9e59457e8718/details5.gif)

**绘制源位置（Draw Source Locations）**

启用源角色使用的绘制IK目标。

**链绘制大小（Chain Draw Size）**

控制视口中绘制的链和IK目标的大小。

**链绘制厚度（Chain Draw Thickness）**

控制视口中绘制的链和IK目标的线条粗细。

### 全局设置

在 **链映射（Chain Mapping）** 面板中点击 **全局设置（Global Settings）** ，会显示IK重定向器的更多设置，包括 **步幅扭曲（Stride Warping）** 功能。

![全局设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/823db42c-5012-4f7a-af39-fa65d5d07546/globalsettings1.png)

名称

说明

**启用根骨骼（Enable Root）**

启用目标IK Rig中定义的根骨骼的平移移动。除非你要调试根骨骼的重定向行为，否则不要禁用此项。

**启用FK（Enable FK）**

启用所有骨骼链的重定向。除非你要调试骨骼链的重定向行为，否则不要禁用此项。

**启用IK（Enable IK）**

如果你要在重定向链中使用IK目标，请启用IK重定向通道。除非你要调试IK重定向行为，否则不要禁用此项。

**步幅扭曲（Stride Warping）**

启用 **步幅扭曲（Stride Warping）** 功能，这允许操控重定向的动画的步幅长度、宽度和外翻度。步幅扭曲要求你使用重定向的IK目标来设置角色。

**前进方向（Forward Direction）**

你的角色的世界空间朝向。大部分情况下是 **Y** 。

**方向源（Direction Source）**

用于确定“最适合”的全局旋转的源，以模拟角色随时间变化的朝向。你可以从以下选项中进行选择：

-   **目标（Goals）** ：使用IK目标的位置模拟朝向。此选项最适合有垂直脊椎的角色，如两足角色。
-   **链（Chain）** ：使用重定向链中骨骼的位置模拟朝向。这最适合有水平脊椎的角色，如四足角色。

**方向链（Direction Chain）**

如果你将 **方向源（Direction Source）** 设置为 **链（Chain）** ，此属性用于指定要使用哪个链来帮助定义角色的前进方向。

**扭曲向前（Warp Forwards）**

沿向前进向扭曲IK目标。值低于 **1** 时步幅较小，高于 **1** 时步幅长度会增加。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be261ade-2a11-4a71-9c63-507df3dd1653/globalsettings2.gif)

**扭曲外翻（Warp Splay）**

扭曲角色的整体站姿。值低于 **1** 会将IK目标整体拉向平均位置，值高于 **1** 会将其推开。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0f011b0-ceab-4ae2-8abf-b68b3450426e/globalsettings3.gif)

**侧向偏移（Sideways Offset）**

扭曲角色的侧向站姿。值低于 **0** 会将IK目标整体拉向垂直于前进方向的位置，值高于 **0** 会将其推开。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/beadcb9a-b12b-4574-93cf-c1ccc40c6f5a/globalsettings4.gif)

### 根骨骼设置

在链映射（Chain Mapping）面板中，点击 **根骨骼设置（Root Settings）** ，或在视口中选择根骨骼，会显示IK重定向器的[重定向根骨骼](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E6%A0%B9%E9%AA%A8%E9%AA%BC)设置。

![根骨骼设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/676f4809-b9aa-4961-8bed-a78ebcd0dd8f/rootsettings1.png)

名称

说明

**旋转/平移Alpha（Rotation / Translation Alpha）**

在重定向姿势（ **0** ）和传入的重定向源（ **1** ）之间混合重定向根骨骼上的动画。

**平移偏移（Translation Offset）**

将组件空间平移偏移应用到重定向根骨骼上。

**旋转偏移（Rotation Offset）**

将本地空间旋转偏移应用到重定向根骨骼上。

**水平/垂直缩放（Scale Horizontal / Vertical）**

缩放重定向根骨骼在水平或垂直方向的运动。你可以将此项与 **IK目标（IK Goals）** 和 **平移偏移（Translation Offset）** 一起使用，在你的重定向角色上创建经过强化或弱化的动作。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92b0eaef-05f6-4d26-839a-25702bfe6ac2/rootsettings2.gif)

**混合到源（Blend to Source）**

在重定向的位置（ **0** ）和确切源位置（ **1** ）之间混合重定向根骨骼的平移。此属性类似于其他重定向工具中所见的“reach”。

**混合到源权重（Blend to Source Weights）**

**混合到源（Blend to Source）** 的每混合控制乘数。

**水平/垂直影响IK（Affect IK Horizontal / Vertical）**

如果你要使用 **IK目标（IK Goals）** ，这些滑块可控制在沿水平或垂直轴修改根骨骼时，所有IK目标是否都应该随根骨骼一起移动。调到 **0** 时，IK目标会停留在其重定向的位置，调到 **1** 时，它们将相对于修改的根骨骼变换而移动。

### 链设置

选择 **IK目标（IK Goals）** 或 **链（Chains）** 会在细节面板中显示链的特有属性：

![链设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1cb1092-d8fd-4727-9787-a821fc8972bd/chainsettings.png)

名称

说明

**源链（Source Chain）**

分配给此IK目标的源链。更改此项与在 **链映射（Chain Mapping）** 面板中更改 **源链（Source Chain）** 的效果相同。

**FK**

允许使用旋转和平移从源角色复制链的形状。

**旋转模式（Rotation Mode）**

确定如何将旋转从源链复制到目标链，有以下选项供你选择：

-   **内插（Interpolated）** ：将源和目标链按长度归一，然后找到源链上同等归一距离处的旋转，将其应用于目标，以生成每个目标骨骼旋转。这通常可为链中有不同骨骼数量或有不同比例的目标提供最佳结果。
-   **一对一（One to One）** ：从链根骨骼开始，按照骨骼顺序将源链中的每个骨骼将复制到目标链中的对等骨骼上。如果目标链的骨骼比源链多，额外骨骼将保持其引用姿势。建议在目标和源链的骨骼数量相同时选择此项，它通常是 **手指链** 的最佳选择。
-   **逆向一对一（One to One Reversed）** ：此项的操作方式类似于 **一对一（One to One）** ，但复制顺序从链中的末端骨骼开始，而不是从根骨骼开始。
-   **无（None）** ：不发生旋转复制，使骨骼旋转保持其引用姿势。

**旋转Alpha（Rotation Alpha）**

混合FK旋转复制的量。

**平移模式（Translation Mode）**

确定如何将平移从源链复制到目标链中的所有骨骼，有以下选项供你选择：

-   **无（None）** ：不发生平移复制，使骨骼平移保持其引用姿势。在大部分情况下，这是最佳选项。
-   **全局缩放（Globally Scaled）** ：将目标骨骼的平移设置为源骨骼的位置乘以目标骨架的相对全局比例。
-   **绝对（Absolute）** ：将目标骨骼平移设置为源骨骼的绝对位置。

**平移Alpha（Translation Alpha）**

混合FK平移复制的量。

**极矢量匹配（Pole Vector Matching）**

将目标链的旋转角度混合到源链，方法是沿长度扭曲链。这不会改变末端骨骼的位置。

**极矢量偏移（Pole Vector Offset）**

当 **极矢量偏移（Pole Vector Offset）** 设置为 **1** 时，你可以使用此属性将角度偏移（以度数为单位）应用于链的旋转角度，从大体上控制链的扭曲。

**IK**

允许使用[IK目标](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine#ik%E7%9B%AE%E6%A0%87)修改此链。要启用此项，你必须将IK目标与IK Rig资产中的链关联。

**混合到源（Blend to Source）**

在重定向的位置（ **0** ）和确切源位置（ **1** ）之间混合IK目标的平移。此属性类似于其他重定向工具中所见的“reach”。

**混合到源权重（Blend to Source Weights）**

**混合到源（Blend to Source）** 的每轴混合乘数。

**静态偏移（Static Offset）**

将世界空间平移偏移应用到IK目标。

**静态本地偏移（Static Local Offset）**

将本地空间平移偏移应用到IK目标。

**静态旋转偏移（Static Rotation Offset）**

将本地空间旋转偏移应用到IK目标。

**扩展（Extension）**

沿链的方向移动IK目标。值越高距离远，值越低越靠近链中的根骨骼。

**受IK扭曲影响（Affected by IK Warping）**

允许此IK目标受[步幅扭曲属性](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%85%A8%E5%B1%80%E8%AE%BE%E7%BD%AE)影响。用于腿部链的IK目标通常都应该启用此项，而其他则都应禁用。

**快速栽植（Speed Planting）**

允许此IK目标使用[快速栽植](/documentation/zh-cn/unreal-engine/fix-foot-sliding-with-ik-retargeter-in-unreal-engine)属性。

**速度曲线名称（Speed Curve Name）**

包含速度曲线数据的[动画曲线](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)的名称。

**速度阈值（Speed Threshold）**

在被快速栽植系统视为未移动的前提下，源骨骼可以移动的最大速度。这可导致目标IK目标在源骨骼速度低于此阈值时不移动。

**离地刚度（Unplant Stiffness）**

弹簧模型在离地之后平滑提拉IK位置的刚度。增加此值意味着增加IK目标到达目标值的速度。

**离地临界阻尼（Unplant Critical Damping）**

将多少阻尼应用于弹簧。值 **0** 表示无阻尼，值 **1** 表示达到临界阻尼，导致没有振荡。

链映射面板将指明设置经过调整的链。

![链编辑指示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15a27651-15ab-4728-99f9-6d32b878180d/chainsetting2.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建和概述](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E6%A6%82%E8%BF%B0)
-   [重定向链](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E9%93%BE)
-   [链的创建](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%93%BE%E7%9A%84%E5%88%9B%E5%BB%BA)
-   [链属性和名称](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%93%BE%E5%B1%9E%E6%80%A7%E5%92%8C%E5%90%8D%E7%A7%B0)
-   [链显示和映射](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%93%BE%E6%98%BE%E7%A4%BA%E5%92%8C%E6%98%A0%E5%B0%84)
-   [重定向根骨骼](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E6%A0%B9%E9%AA%A8%E9%AA%BC)
-   [重定向姿势](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E5%A7%BF%E5%8A%BF)
-   [创建和编辑姿势](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E7%BC%96%E8%BE%91%E5%A7%BF%E5%8A%BF)
-   [导入和导出姿势](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%92%8C%E5%AF%BC%E5%87%BA%E5%A7%BF%E5%8A%BF)
-   [杂项工作流程](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E6%9D%82%E9%A1%B9%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [层级显示](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%B1%82%E7%BA%A7%E6%98%BE%E7%A4%BA)
-   [预览动画并导出](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%A2%84%E8%A7%88%E5%8A%A8%E7%94%BB%E5%B9%B6%E5%AF%BC%E5%87%BA)
-   [批量重定向](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E6%89%B9%E9%87%8F%E9%87%8D%E5%AE%9A%E5%90%91)
-   [重定向器属性和设置](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E5%99%A8%E5%B1%9E%E6%80%A7%E5%92%8C%E8%AE%BE%E7%BD%AE)
-   [编辑器设置](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E8%AE%BE%E7%BD%AE)
-   [全局设置](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%85%A8%E5%B1%80%E8%AE%BE%E7%BD%AE)
-   [根骨骼设置](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E6%A0%B9%E9%AA%A8%E9%AA%BC%E8%AE%BE%E7%BD%AE)
-   [链设置](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%93%BE%E8%AE%BE%E7%BD%AE)