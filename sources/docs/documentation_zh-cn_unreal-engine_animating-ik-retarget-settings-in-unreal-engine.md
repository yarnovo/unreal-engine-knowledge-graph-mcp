# 在虚幻引擎中对IK重定向设置制作动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animating-ik-retarget-settings-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:14.895Z

---

目录

![使用重定向配置文件](https://dev.epicgames.com/community/api/documentation/image/f4d0478a-fb87-4a1d-b376-130f22a775fb?resizing_type=fill&width=1920&height=335)

除了在运行时期间对角色进行 **IK重定向（IK Retargeting）** ，你还可以使用 **重定向配置文件（Retarget Profiles）** 动态修改 **全局（Global）** 、 **根（Root）** 和 **链（Chain）** 设置。重定向配置文件是 **Retarget Pose From Mesh** 动画蓝图节点的额外功能，可用于更改这些设置或为其制作动画。这很适合用于在整个动画中的不同点更改或应用不同的重定向设置。

本文档介绍如何设置重定向配置文件以及各种修改方式。

#### 先决条件

-   你将角色设置为在运行时使用 **Retarget Pose From Mesh** 动态重定向。有关操作说明，请参阅[运行时IK重定向](/documentation/zh-cn/unreal-engine/runtime-ik-retargeting-in-unreal-engine)页面。
-   你熟悉[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)的用法。
-   你熟悉如何创建和使用[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)。

## 访问重定向配置文件

你可以找到[运行时IK重定向](/documentation/zh-cn/unreal-engine/runtime-ik-retargeting-in-unreal-engine)先决条件步骤中创建的目标角色动画蓝图，从其中的 **Retarget Pose From Mesh** 节点访问重定向配置文件。选择 **Retarget Pose From Mesh** 并找到 **细节（Details）** 面板中的 **自定义重定向配置文件（Custom Retarget Profile）** 属性。

![重定向配置文件细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/018d86c8-9ee9-4a7f-aba2-9c511c32cc79/access1.png)

## 静态覆盖

默认情况下，你在分配的IK重定向器资产中设置的设置由 **Retarget Pose From Mesh** 节点使用。你可以修改节点上的 **自定义重定向配置文件（Custom Retarget Profile）** 属性，从而静态覆盖这些设置：

名称

说明

**应用目标重定向姿势（Apply Target Retarget Pose）**

启用此项会覆盖用于目标角色的[重定向姿势](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E5%A7%BF%E5%8A%BF)。

**目标重定向姿势名称（Target Retarget Pose Name）**

如果启用了 **应用目标重定向姿势（Apply Target Retarget Pose）** ，此设置会指定要改用的新重定向姿势名称。

**应用源重定向姿势（Apply Source Retarget Pose）**

启用此项会覆盖用于源角色的[重定向姿势](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E5%A7%BF%E5%8A%BF)。

**源重定向姿势名称（Source Retarget Pose Name）**

如果启用了 **应用源重定向姿势（Apply Source Retarget Pose）** ，此设置会指定要改用的新重定向姿势名称。

**应用链设置（Apply Chain Settings）**

启用此项会使用下面在 **链设置（Chain Settings）** 中指定的新设置覆盖IK重定向器资产中使用的[链设置](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E9%93%BE%E8%AE%BE%E7%BD%AE)。

**链设置（Chain Settings）**

用于添加链以使用新链设置覆盖的数组。点击 **添加（Add (+)）** 添加新链，并设置名称以匹配IK重定向器资产中的某个重定向链。展开 **FK** 、 **IK** 或 **快速栽植（Speed Planting）** 类别以修改其中的设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/739f2a49-5df2-49d8-96e3-e889036ce014/access2.png)

**应用根设置（Apply Root Settings）**

启用此项会使用下面在 **根设置（Root Settings）** 中指定的新设置覆盖IK重定向器资产中使用的[根设置](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E6%A0%B9%E8%AE%BE%E7%BD%AE)。

**根设置（Root Settings）**

如果启用了 **应用根设置（Apply Root Settings）** ，这些设置会覆盖IK重定向器资产中使用的根设置。

**应用全局设置（Apply Global Settings）**

启用此项会使用下面在 **全局设置（Global Settings）** 中指定的新设置覆盖IK重定向器资产中使用的[全局设置](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine#%E5%85%A8%E5%B1%80%E8%AE%BE%E7%BD%AE)。

**全局设置（Global Settings）**

如果启用了 **应用全局设置（Apply Global Settings）** ，这些设置会覆盖IK重定向器资产中使用的全局设置。

## 动态覆盖

如果你需要控制重定向设置何时发生更改，则必须创建额外的蓝图逻辑。由于蓝图和动画情境具有任意性，你可以采用许多方式创建逻辑，进而编辑各种重定向情境。

在此示例中，重定向配置文件将用于调整更大角色的手臂，以正确伸到地面，匹配人体模型。

![目标角色不正确](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a845138b-14a6-433e-8108-fb2880577d3e/animate0.gif)

### IK Rig设置

由于此特定重定向情境，你需要修改目标角色的[IK Rig](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine)，以便使用IK目标和解算器。此示例使用[全身IK (FBIK)](/documentation/zh-cn/unreal-engine/ik-rig-solvers-in-unreal-engine#%E5%85%A8%E8%BA%ABik)解算器，但你可以根据角色选择其他种类的[IK Rig解算器](/documentation/zh-cn/unreal-engine/ik-rig-solvers-in-unreal-engine)。必须执行此步骤，才能提供IK手臂链设置供重定向配置文件修改。

打开目标角色的用于重定向的IK Rig资产，并执行以下操作：

1.  在 **层级（Hierarchy）** 面板中右键点击某个手部骨骼，并选择 **新IK目标（New IK Goal）** 。
2.  在下一个提示中，确保 **全身IK（Full Body IK）** 设置为解算器，并点击 **添加解算器（Add Solver）** 。
3.  在 **解算器堆栈（Solver Stack）** 面板中选择 **全身IK解算器（Full Body IK solver）** ，然后右键点击另一手部骨骼，并选择 **新IK目标（New IK Goal）** 。
4.  最后，选择 **全身IK解算器（Full Body IK solver）** ，在层级中右键点击根骨骼（通常是 **骨盆（pelvis）** 或 **臀部（hips）** ），并选择 **在所选解算器设置根骨骼（Set Root Bone on Selected Solver）** 。

![创建FBIK目标和解算器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8849a57e-6913-4a21-aecb-8252dde4d758/ik1.png)

#### FBIK设置

在 **解算器堆栈（Solver Stack）** 中选择 **全身IK（Full Body IK）** ，并在细节面板中将 **根行为（Root Behavior）** 设置为 **固定为输入（Pin to Input）** 。必须这样做，才能在IK目标移动时防止下半身移动。

![固定为输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac882d88-e2ec-4338-88a6-792e1cc5435c/ik2.png)

你还可能需要为FBIK解算器控制的骨骼创建额外的骨骼设置。这将解决FBIK解算可能造成的刚度或关节旋转不正确的问题。要创建骨骼设置，请选择 **全身IK解算器（Full Body IK Solver）** ，然后右键点击你要为其创建设置的骨骼，然后选择 **添加设置到选定骨骼（**Add Settings to Selected Bone）\*\* 。

在此示例中，为了解决脊椎、肩部和手臂骨骼的旋转刚度，使用以下属性为这些骨骼（包括对称骨骼）创建了骨骼设置：

-   **Spine\_01**
    
    -   **旋转和位置刚度（Rotation and Position Stiffness）** ：0.75
-   **Spine\_02**
    
    -   **旋转和位置刚度（Rotation and Position Stiffness）** ：0.75
-   **Spine\_03**
    
    -   **旋转和位置刚度（Rotation and Position Stiffness）** ：0.75
-   **Clavicle\_l**
    
    -   **旋转和位置刚度（Rotation and Position Stiffness）** ：0.8
-   **Lowerarm\_l**
    
    -   **使用偏好角度（Use Preferred Angles）** ：启用
        
    -   **偏好角度（Preferred Angles）** ： 0, 0, 45
        

![fbik骨骼设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6997e7d5-4444-4091-88a5-ab75e566d198/ik3.png)

### 重定向配置文件变量设置

返回到目标动画蓝图，选择 **Retarget Pose From Mesh** 节点。在 **细节（Details）** 面板中，点击 **自定义重定向配置文件（Custom Retarget Profile）** 下拉菜单，并启用 **公开为引脚（Expose As Pin）** ，这样会在该节点上添加"自定义重定向配置文件（Custom Retarget Profile）"引脚。

![公开自定义重定向配置文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01b43bcb-5e44-40b8-a13e-4f854ffe2279/dynamic1.png)

右键点击新创建的引脚，并选择 **提升为变量（Promote to Variable）** 。这样会创建类型为 `重定向配置文件（Retarget Profile）` 的新[结构体变量](/documentation/zh-cn/unreal-engine/blueprint-struct-variables-in-unreal-engine)，并连接到该引脚。该变量也会在 **我的蓝图（My Blueprint）** 面板中显示。

![提升到变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8a8e27e-8263-48b7-a706-a0b0ad356a71/dynamic2.png)

### 创建事件图表逻辑

打开[动画蓝图事件图表](/documentation/zh-cn/unreal-engine/graphing-in-animation-blueprints-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E5%9B%BE%E8%A1%A8)，并引用此处的 **重定向配置文件变量（Retarget Profile variable）** ，然后执行以下操作：

1.  从中拖移并创建 **Get Chain Settings from Retarget Profile** 节点。
2.  将 **目标链名称（Target Chain Name）** 设置为你想为其制作动画的重定向链。在本示例中，它是 `LeftArm` 。
3.  右键点击 **返回值（Return Value）** 并选择 **拆分结构体引脚（Split Struct Pin）** 。

![从重定向配置文件获取链设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63407d07-da5f-4492-b560-3e7b63dce35a/eventgraph1.png)

接下来，从 **返回值IK（Return Value IK）** 拖移并创建 **Set** **members** **in TargetChainIKSettings** 节点。将其选中，并在 **细节（Details）** 面板中启用 **静态偏移（Static Offset）** ，这样会将静态偏移链属性公开为节点上的引脚。

![在目标链ik设置中设置成员](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/854cdeef-44f5-4283-bcf1-6f79cb7621cf/eventgraph2.png)

从 **结构体输出（Struct Out）** 拖移并创建 **Set Chain IKSettings in Retarget Profile** 节点，然后执行以下操作：

1.  将 **目标链名称（Target Chain Name）** 设置为之前使用的相同链名称：`LeftArm` ，
2.  将 **重定向配置文件（Retarget Profile）** 变量连接到 **重定向配置文件（Retarget Profile）** 输入。

![在重定向配置文件中设置链IK设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5f7bad9-4d54-4b7f-9359-e568fec71967/eventgraph3.png)

将 **事件蓝图更新动画（Event Blueprint Update Animation）** 连接到此执行链，然后将 **静态偏移（Static Offset）** 公开为变量，方法是右键点击该引脚并选择 **提升为变量（Promote to Variable）** 。

![更新动画事件并公开静态偏移](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd141e3b-3a4d-4f90-b6ce-b983a991ae0a/eventgraph4.png)

最后，在静态偏移变量的 **细节（Details）** 面板中，启用 **公开到过场动画（Expose to Cinematics）** 和 **实例可编辑（Instance Editable）** ，后者使变量可在外部编辑。

![将变量公开到实例和过场动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a416d17-0718-48a2-9cb4-b61363ebbabf/eventgraph5.png)

### 对重定向设置制作动画

因为你在目标的动画蓝图事件图表中创建了逻辑，并将其链接到了 **事件蓝图更新动画（Event Blueprint Update Animation）** ，所以你可以在Sequencer中对公开的变量制作动画，方法与[对动画实例制作动画](/documentation/zh-cn/unreal-engine/control-animation-blueprint-parameters-from-sequencer-in-unreal-engine)一样。

假定你已经[创建并打开关卡序列](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)，将重定向的角色蓝图添加到该序列和源骨骼网格体组件，然后在源组件上[播放动画](/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine)，观察目标上的重定向效果。

![Sequencer中的运行时重定向](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b93b4a15-bb7e-4ac0-b19c-2a6a513eff2e/animate1.gif)

接下来，添加你之前公开的链设置变量，具体做法是：

1.  在 **蓝图轨道（Blueprint Track）** 上点击 **添加轨道（Add Track (+)）** 并选择 **目标（Target）** 组件，添加目标骨骼网格体组件。
2.  在目标 **组件轨道（Component Track）** 上点击 **添加轨道（Add Track (+)）** 并选择 **动画实例（Anim Instance）** 。
3.  在 **动画实例轨道（Anim Instance Track）** 上选择 **添加轨道（Add Track (+)）** 并选择该变量。

![添加目标动画实例轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/661d21ca-5540-42a2-b9ec-b56a9975c5dc/animate2.gif)

你现在可以将此轨道设为[关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)，实时调整链属性。

![关键帧重定向配置文件设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd450a83-4935-4ac8-ba10-e1a09f1424cc/animate3.gif)

通过对重定向配置文件制作动画以及[运行时重定向](/documentation/zh-cn/unreal-engine/runtime-ik-retargeting-in-unreal-engine)，你可以对运行时重定向结果进行精细微调，而不用创建新动画或更多资产。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/942bbc44-59c0-46ed-b578-5e0941b718b2/rtp_result1.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c809c50-ea7f-48e6-a8d7-fd839c4d3367/rtp_result2.gif)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6158b0b4-4cf1-4143-874d-ed3b757c3722/rtp_result3.gif)

原始动画

对大角色上的重定向配置文件制作动画

对小角色上的重定向配置文件制作动画

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/animating-ik-retarget-settings-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [访问重定向配置文件](/documentation/zh-cn/unreal-engine/animating-ik-retarget-settings-in-unreal-engine#%E8%AE%BF%E9%97%AE%E9%87%8D%E5%AE%9A%E5%90%91%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
-   [静态覆盖](/documentation/zh-cn/unreal-engine/animating-ik-retarget-settings-in-unreal-engine#%E9%9D%99%E6%80%81%E8%A6%86%E7%9B%96)
-   [动态覆盖](/documentation/zh-cn/unreal-engine/animating-ik-retarget-settings-in-unreal-engine#%E5%8A%A8%E6%80%81%E8%A6%86%E7%9B%96)
-   [IK Rig设置](/documentation/zh-cn/unreal-engine/animating-ik-retarget-settings-in-unreal-engine#ikrig%E8%AE%BE%E7%BD%AE)
-   [FBIK设置](/documentation/zh-cn/unreal-engine/animating-ik-retarget-settings-in-unreal-engine#fbik%E8%AE%BE%E7%BD%AE)
-   [重定向配置文件变量设置](/documentation/zh-cn/unreal-engine/animating-ik-retarget-settings-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E5%8F%98%E9%87%8F%E8%AE%BE%E7%BD%AE)
-   [创建事件图表逻辑](/documentation/zh-cn/unreal-engine/animating-ik-retarget-settings-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%BA%8B%E4%BB%B6%E5%9B%BE%E8%A1%A8%E9%80%BB%E8%BE%91)
-   [对重定向设置制作动画](/documentation/zh-cn/unreal-engine/animating-ik-retarget-settings-in-unreal-engine#%E5%AF%B9%E9%87%8D%E5%AE%9A%E5%90%91%E8%AE%BE%E7%BD%AE%E5%88%B6%E4%BD%9C%E5%8A%A8%E7%94%BB)