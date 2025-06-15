# 使用虚幻引擎分层动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-layered-animations-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:17.721Z

---

目录

![使用分层动画](https://dev.epicgames.com/community/api/documentation/image/7b933ab3-60bf-42f0-97e1-2d2896c3b736?resizing_type=fill&width=1920&height=335)

作为一个概念，动画混合仅仅意味着在一个角色或骨架网格体上的两个或多个动画之间进行平滑过渡。在虚幻引擎4中，有多种方法可以应用这种混合，要么通过[混合空间](/documentation/zh-cn/unreal-engine/blend-spaces-in-unreal-engine)，或通过实际组合两个基于加权偏差或alpha值的动画的叠加方法，甚至通过应用现有姿势的直接覆盖。

您还可以直接将动画发送到骨架中的特定骨骼及其所有子项。例如，您可以从包含一个正在奔跑的角色的动画开始，然后有选择地向角色上身应用一个射击动画。最终的结果将是一个可以边奔跑边射击的角色，类似于下面的视频。

## 1 - 设置要混合的动画

在此步骤中，我们要更改默认玩家角色，并为我们想要在移动动画上叠加的动画层创建一个动画蒙太奇。

对于本指南，我们使用 **蓝图第三人称模板（Blueprint Third Person Template）** 项目，并将 **动画初学者包（Animation Starter Pack）** 添加到项目中：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0abf04d4-5418-4b86-8a62-cce7548486e8/animationassetpack.png)

您可以从Epic Launcher的 **市场（Marketplace）** 免费下载动画初学者包。

1.  打开项目后，在 **内容浏览器（Content Browser）** 中的 **Content/ThirdPersonBP/Blueprints** 文件夹下，打开 **第三人称游戏模式（ThirdPersonGameMode）** 蓝图。
    
2.  在 **默认Pawn类（Default Pawn Class）** 下，单击下拉菜单并选择 **Ue4ASP\_Character**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e05e98b4-f3e9-49b2-9f42-3aaca6da599f/animations1.png)
3.  **编译（Compile）** 并 **保存（Save）**，然后关闭蓝图。
    
4.  在 **内容浏览器（Content Browser）** 中，打开 **Content/AnimStarterPack** 文件夹。
    
5.  **右键单击** **Fire\_Shotgun\_Ironsights** 动画，选择 **创建（Create）**，然后选择 **创建动画蒙太奇（Create AnimMontage）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f9aa855-def5-409e-876e-236d220b647c/animations2.png)
    
    您可以通过在搜索窗口中输入"Fire"来过滤窗口，如上所示。
    
6.  打开该新动画蒙太奇，单击放大镜图标。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5eb1304-5ceb-4f4b-bc58-1457adadfca4/animations3.png)
    
    这将打开 **动画插槽管理器（Anim Slot Manager）**，我们将使用该管理器创建一个 **插槽**，在按名称调用插槽时，我们可以使用这个 **插槽（Slot）** 进行混合。
    
7.  单击 **添加插槽（Add Slot）** 按钮，然后将插槽命名为 **上身（UpperBody）**，然后单击 **保存（Save）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dbb7b80-c40c-4ae8-8d5b-90da8782c843/animations4.png)
    
    虽然我们在这里选择了名称"上身（UpperBody）"，但我们还没有瞄准上身，而是分配了名称，这样我们就知道瞄准哪里。
    
8.  点击 **蒙太奇组（Montage Group）** 区域内的下拉菜单，将其更改为 **DefaultGroup.UpperBody**，然后关闭窗口。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/915fb06f-8e71-4b6f-8fd2-d488a56afcc5/animations5.png)
    
    现在我们已经将该蒙太奇与 **DefaultGroup.UpperBody** 关联起来，允许在调用插槽时播放。
    

在下一节中，我们将更改默认玩家角色，并做出一些调整，以确定我们何时发射武器。

# 2 - 更新角色蓝图

在这个步骤中，我们在角色蓝图中创建一些脚本，允许我们向动画蓝图发送信号以表明我们正在发射武器。

1.  在 **内容浏览器（Content Browser）** 的 **Content/AnimStarterPack** 下，打开 **Ue4ASP\_Character** 蓝图。
    
2.  找到 **蹲伏（Crouching）** 一节，并删除 **InputAction Crouch** 事件（带有Warning!符号）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7233414-5f83-4355-8112-5db8c5b92748/animations6.png)
    
    该节点上有一个警告，因为我们的项目没有被设置为使用InputAction事件"蹲伏（Crouching）"。
    
3.  **右键单击** 图表并添加一个 **C** 按键事件并连接，如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b463777-3c6f-463f-b858-e5b5746e2448/animations7.png)
    
    我们刚刚将蹲伏与按 **C** 键相关联，您可以将该输入更改为您想要的任何键。
    
4.  在 **我的蓝图（MyBlueprint）** 窗口中，单击 **添加变量（Add Variable）** 按钮以创建一个 **布尔** 变量并称其为 **Fire Button Down**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee8d5d22-9a02-486e-aca2-536ded066fbd/animations8.png)
5.  在图表中 **单击右键** 并添加 **Left Mouse Button（鼠标左键）** 按键事件。
    
6.  按住 **Alt**，拖动图表中的 **Fire Button Down** 变量以创建 **Set** 节点。
    
7.  重复上一个步骤（或复制 **Set** 节点）并连接，如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14334270-b81a-491d-a1ed-03a330e4ab43/animations9.png)
    
    确保 **按下（Pressed）** **Left Mouse Button（鼠标左键）** 时，**Fire Button Down** 为 **True**，**释放（Released）** 时为 **False**。
    
8.  在 **组件（Components）** 窗口中选择 **CapsuleComponent**，然后在 **详情（Details）** 面板中选中 **在游戏中隐藏（Hidden in Game）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c9f9d68-6ad5-4658-8005-387b0eba91fd/hidecapsule.png)
    
    这将关闭胶囊体碰撞的调试显示。
    
9.  **编译（Compile）** 并 **保存（Save）**，然后关闭蓝图。
    

当我们蹲伏或发射武器时，我们的角色现在可以向我们的动画蓝图发送信号。下一步，我们将在动画蓝图中设置动画图表，处理动画蒙太奇与普通移动动画的混合，这样我们就可以混合这两者。

## 3 - 设置动画图表

在这一步中，我们设置动画图表来处理动画蒙太奇和状态机中的移动姿势的混合。

1.  在 **Content（内容）/AnimStarterPack（动画初学者包）** 中，打开 **UE4ASP\_HeroTPP\_AnimBlueprint** 动画蓝图。
    
2.  在 **我的蓝图（MyBlueprint）** 窗口中，打开 **动画图表（AnimGraph）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0860a24a-3a18-4acb-bdbd-71d5c7a72344/animations9b.png)
3.  拖出 **Locomotion** 状态机，搜索和添加 **新保存的缓存姿势（New Save cached pose）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ead7efb4-b349-4f60-835b-bb9654ee7941/animations10.png)
    
    在这里，我们从Locomotion状态机获取结果姿势，并将其存储在缓存姿势中，以便在其他地方使用。
    
4.  通过在节点上按 **F2** 为缓存姿势指定一个名称，例如 **LocomotionCache**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b71d845-8fa1-42ee-9707-e8a35b579d6e/animations11.png)
5.  在图表中 **右键单击** 并添加 **使用缓存姿势"LocomotionCache"（Use cached pose 'LocomotionCache'）**（或是您给缓存姿势取的名称）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4ed7b76-9c78-4ecb-a521-1cdd123f6149/animations12.png)
6.  拖出 **Use cached pose** 节点，搜索并添加 **Layered blend per bone** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/693d0980-12a0-4fc3-9b4b-7cee1e4a132d/animations13.png)
    
    **Layered Blend Per Bone** 节点将允许我们将骨架上的指定骨骼的动画混合在一起。
    
7.  复制/粘贴 **Use cached pose 'LocomotionCache'** 节点，然后拖出它，并添加 **Slot 'DefaultSlot'** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94891f32-8fa6-4c6b-a4d7-551397cdbc82/animations14.png)
8.  在 **Slot** 节点的 **设置（Settings）** 中，单击下拉菜单并选择 **DefaultGroup.UpperBody**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d46f9e2d-53b0-42a8-9333-e90e7abd5595/animations15.png)
    
    当使用此插槽的动画蒙太奇被调用以播放时，它现在将在动画图表中被调用。
    
9.  将 **Slot** 节点连接到 **Layered blend per bone** 节点上的 **Blend Poses 0** 引脚，然后将输出连接到 **Result** 和 **Compile**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70aacbd0-938f-4d70-9fa9-9b1e92f86b56/animations16.png)

我们的动画图表已经完成了，但是我们仍然需要修改 **Layered blend per bone** 节点上的一些设置，以便完成我们接下来要做的事情。

## 4 - 完成混合设置

在最后一个步骤中，我们定义了对混合动画进行分层的方法，以及从哪块骨骼开始混合。

1.  在 **UE4ASP\_HeroTPP\_AnimBlueprint** 的 **动画图表（AnimGraph）** 中，单击 **Layered blend per bone** 节点，然后展开 **图层设置（Layer Setup）** 部分并单击 **+** 号。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b27b7cb6-8248-449f-a66b-841b0bcdeae9/animations17.png)
2.  在 **骨骼名称（Bone Name）** 下，输入 **spine\_01**，然后将 **混合深度（Blend Depth）** 设置为 **1**，并选中 **网格体空间旋转混合（Mesh Space Rotation Blend）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf6d573a-7fd5-49b3-82ac-cb24013c7950/animations18.png)
    
    利用这些设置，我们可以将拍摄动画蒙太奇混合到我们的骨架上，从 **spine\_01** 骨骼开始。
    
3.  在 **我的蓝图（MyBlueprint）** 窗口中，打开 **事件图表（EventGraph）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39ff897c-b014-4766-a6c8-90604c06c040/animations18b.png)
4.  拖出 **Cast To Ue4ASP\_Character** 节点的 **As Ue4ASP Character** 引脚，并添加 **Get Fire Button Down** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16fb40cb-93a0-43a3-b81c-566417f01bce/animations19.png)
    
    这将告诉我们玩家是否按下了发射按钮。
    
5.  按住 **B** 并在图表中 **左键单击**，以创建一个 **Branch** 节点，并在连接 **Set Crouching** 后连接该节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffa42b6d-7fc0-409d-83a4-af5aa8e43995/animations20.png)
    
    对于 **条件（Condition）**，插入 **FireButtonDown** 引脚。
    
6.  在图表中 **右键单击**，并添加 **Montage Is Playing** 节点，然后分配 **Fire\_Shotgun\_Ironsights\_Montage**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a01f013-2789-416a-95f4-f41032b0e807/animations22.png)
7.  离开 **Montage Is Playing** 节点的 **Return Value**，添加一个 **Branch** 节点。
    
8.  将步骤5中的 **Branch** 节点连接到新的 **Branch** 节点，如下所示，并添加一个 **Montage Play** 节点，其中 **Montage to Play** 设置为您的蒙太奇。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09fa92ae-5ad8-4489-99dc-00b64b8c3491/animations23.png)
    
    这将检查蒙太奇是否正在播放，如果是，不要播放（如果不是，播放蒙太奇）。
    
9.  **编译（Compile）** 并 **保存（Save）**，关闭 **蓝图（Blueprint）** 并删除关卡中现有的 **第三人称角色（ThirdPersonCharacter）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4178d270-82cb-4d75-963b-0ef5610eebbc/animations24.png)
    
    这将允许我们使用在游戏模式中定义的所选角色，而不是关卡中的角色。
    
10.  在编辑器中 **运行（Play）**。
    

### 最终结果

您将看到，当您按下 **鼠标左键（Left Mouse Button）** 时，角色将播放射击动画蒙太奇。您可以边走边射击，甚至可以蹲下来（按住 **C**）并射击。您可以使用该相同指南来播放近战攻击、重装弹药动画或任何您想要在移动时做到的其他动画。

我们在动画蒙太奇中创建和分配的 **上身（UpperBody）** 插槽也可以在其他动画蒙太奇中分配。由于我们的动画图表已经分配了Slot节点，每当我们调用并播放一个已分配该插槽的动画蒙太奇时，它就会按照我们定义的设置来播放。

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 设置要混合的动画](/documentation/zh-cn/unreal-engine/using-layered-animations-in-unreal-engine#1-%E8%AE%BE%E7%BD%AE%E8%A6%81%E6%B7%B7%E5%90%88%E7%9A%84%E5%8A%A8%E7%94%BB)
-   [2 - 更新角色蓝图](/documentation/zh-cn/unreal-engine/using-layered-animations-in-unreal-engine#2-%E6%9B%B4%E6%96%B0%E8%A7%92%E8%89%B2%E8%93%9D%E5%9B%BE)
-   [3 - 设置动画图表](/documentation/zh-cn/unreal-engine/using-layered-animations-in-unreal-engine#3-%E8%AE%BE%E7%BD%AE%E5%8A%A8%E7%94%BB%E5%9B%BE%E8%A1%A8)
-   [4 - 完成混合设置](/documentation/zh-cn/unreal-engine/using-layered-animations-in-unreal-engine#4-%E5%AE%8C%E6%88%90%E6%B7%B7%E5%90%88%E8%AE%BE%E7%BD%AE)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-layered-animations-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)