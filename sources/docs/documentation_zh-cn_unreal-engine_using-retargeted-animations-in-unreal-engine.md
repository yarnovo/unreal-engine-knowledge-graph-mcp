# 在虚幻引擎中使用重定向动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:09.796Z

---

目录

![使用重定向动画](https://dev.epicgames.com/community/api/documentation/image/7e0919d8-2e82-48a4-a593-39f3f877cc62?resizing_type=fill&width=1920&height=335)

**动画重定位** 是对现有动画稍加修改后用于多个角色的过程，它使你无需创建全新的动画，因为你可以在多个角色间共享动画资源。

存在两种形式的动画重定位，在第一种形式中，你要与之共享动画的角色的骨架使用了与最初为其创建动画的目标角色 **相同的骨架**。 在另一种形式的动画重定位中，需要使用称为 **骨架绑定（Rig）** 的中间对象，它使你能够对来自一个角色的骨架的动画进行重定位，然后将该骨架的骨骼信息传递给 **另一个骨架**（使用这两个骨架共享的骨架绑定）。

请参阅下面的两个链接执行所需类型的动画重定位：

## 使用相同骨架的重定位

此部分介绍如何对 **骨架** 进行设置，以为使用该骨架的所有双足角色使用重定位后的动画。

### 步骤

1.  在 **内容浏览器** 中，打开用于每个角色的 **骨架** 资源。
    
2.  在 **骨架编辑器** 的 **骨架树（Skeleton Tree）** 窗口中，选中 **显示重定位选项（Show Retargeting Options）** 复选框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83608c30-fc2b-408b-b1b4-0e5d39247874/howto1.png)
3.  **右键单击** **骨架树** 中的 **根（Root）** 骨骼，然后选择 **递归地设置平移重定位骨架（Recursively Set Translation Retargeting Skeleton）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbe259d7-fd36-4735-8f2f-e90f41b3fad2/howto2.png)
    
    此设置可以确保所有骨骼都使用该骨架的静态平移（稍后我们将修改特定骨骼以用于重定位）。
    
4.  找到 **骨盆（Pelvis）** 骨骼或与之相当的骨骼，然后单击下拉框并选择 **比例动画（AnimationScaled）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c984b19f-74b5-4ab4-88aa-560e4687d6f0/howto3.png)
    
    此设置可以确保该骨骼位于合适的高度，同时仍能活动。对于你希望平移能够被制成动画和重定位的任何其他骨骼，你也都应使用此设置。
    
5.  找到 **根（Root）** 骨骼、**IK** 骨骼、你可能使用了的 **武器（Weapon）** 骨骼或其他标记式骨骼并将它们设置为 **动画（Animation）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fac1f42-6ab1-41dd-8e1b-5790823efe46/howto4.png)
    
    通过将 **动画（Animation）** 用作"骨骼平移重定位模式（Bone Translation Retargeting Mode）"，骨骼平移就会来自动画数据本身，不会更改。
    
    你可能必须针对不同骨骼尝试不同的方法才能生成你想要的结果。
    
6.  在视口中单击 **场景设置（Scene Setup）** 按钮并选择另一个 **预览网格体（Preview Mesh）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b25c50b0-a775-486a-a067-bb9c20cdeba2/howto5.png)
    
    针对不同的 **骨架网格体** 尝试不同的动画，以确保对于每个动画骨架的设置都正确。
    
7.  在视口中，单击 **显示（Show）** 并选中 **非重定位动画（NonRetarget Animation）**，然后在 **骨骼（Bone）** 下，选择 **所有层级（All Hierarchy）**，以使所有骨骼都显示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a11be5d0-d919-4b45-9c04-6a0a397e80dd/howto6.png)

### 最终结果

现在你应可在骨架上看到与下图所示类似的结果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f86f6a0-75cc-41c0-9bc2-516428d9cf65/basecharacterrunningretargetedbones.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fae788a-3b57-4594-8c8d-e5a6c0846aa8/shortstockyrunningretargetedbones.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5ffc375-29f2-4569-880d-a16da3dee682/tallskinnyrunningretargetedbones.png)

基本角色

矮壮角色

高瘦角色

上图中以米黄色显示的是原骨架，以白色显示的是当前、重定位后的骨架。对角色应用重定位以后，系统就不再考虑它们的比例差异，应用的动画会在不同角色身上正常播放，原骨架（米黄色的骨架）将在矮小角色和高大角色身上的相同位置显示。

## 使用不同骨架的重定位

在此部分中，我们将介绍在使用不同骨架资源的两个角色中，从一个角色向另一个角色重定位动画的过程. 我们还要使用两个可通过 **商城** 免费获取的资源包，它们包含我们可用于重定位的额外骨架和动画。如果你已经准备好了两个可供使用的骨架资源，可以跳过下面的说明，使用这些资源。如果你没有准备好骨架，可以按照下面说明中列出的步骤操作，添加两个包。

在此示例中，我们使用可通过 **商城** 免费下载的下列资源。

-   我们使用的源骨架是 **动画初学者包（Animation Starter Pack）** 中包含的 **UE4\_Mannequin\_Skeleton**。
-   我们使用的目标骨架是 **SK\_Mannequin\_Skeleton**，它包含在 **Infinity Blade:Warriors** 包中。

安装以上两个包之后，你可以在虚幻启动程序中通过 **添加到项目（Add to project）** 按钮将它们添加到项目中。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3494919a-3f9d-459f-8efe-615c86038482/animstarterpack.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edf57b0b-038d-41ea-b3ac-f824543e674a/infinitybladewarriors.png) 

### 步骤

1.  在 **内容浏览器** 中的 **Content/AnimStarterPack/UE4\_Mannequin/Mesh** 文件夹下，打开 **UE4\_Mannequin\_Skeleton** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6450d6d-19c5-4444-baef-38dcc0a10803/retarget1.png)
2.  单击 **重定位管理器（Retarget Manager）** 按钮，然后在 **设置骨架绑定（Set up Rig）** 下，单击 **选择骨架绑定（Select Rig）** 下拉菜单，选择 **选择人形骨架绑定（Select Humanoid Rig）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c09069a-9bd3-4994-9e1d-7a732e868e96/retarget2.png)
3.  在 **内容浏览器** 中的 **Content/InfinityBladeWarriors/Character/CompleteCharacters** 文件夹下，打开 **SK\_Mannequin\_Skeleton** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f85725b-a942-4621-a345-679822829a9a/retarget3.png)
4.  单击 **重定位管理器（Retarget Manager）** 按钮，然后在 **设置骨架绑定（Set up Rig）** 下，单击 **选择骨架绑定（Select Rig）** 下拉菜单，选择 **选择人形骨架绑定（Select Humanoid Rig）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94cc17a8-c2a2-4c8d-84a0-d9b76efb5489/retarget4.png)
5.  指定骨架绑定后，下一步需要使目标的骨骼与骨架绑定上的节点配对。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06f04782-7d62-4ec4-9988-96761c3c16ad/retarget5.png)
    
    由于Infinity Blade:Warriors包使用了相同的命名规范和骨骼层级，将自动检测骨骼并将它们应用给骨架绑定。
    
    如果骨骼命名规范异于Epic骨架，你可能看到系统把"none"应用到骨架绑定中的每个骨骼：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac5fa309-f86e-4c55-8180-628ffbc459e8/retarget6.png)
    
    在这种情况下，你将需要使用 **自动映射（Auto Mapping）** 功能或手动指定骨架中与骨架绑定上的节点最匹配的骨骼。
    
    使用 **自动映射（Auto Mapping）** 功能时，建议你核对哪个骨骼已被指定给了骨架绑定上的哪个节点。 自动映射（Auto Mapping）功能会基于骨骼位置和（或）骨骼命名规范尝试获取最匹配的骨骼并将它们指定给骨架绑定上的骨骼，但是它们可能并非在每种情况下都是可供使用的最佳骨骼。
    
6.  单击 **显示高级（Show Advanced）** 按钮，以在高级（Advanced）/基本（Base）配置间进行切换。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/037b22d0-e298-4766-bd8b-f6b8271e2f2f/advancedconfig.png)
    
    在此部分中，你可以为手指、IK骨骼或扭转/Roll骨骼指定与骨架绑定上的节点对应的骨架中的骨骼。
    
    与"基本（Base）"配置相似，"高级（Advanced）"中的骨骼也可能会被设置为"none"，具体取决于你需要设置的骨架。
    
7.  在 **内容浏览器** 中的 **Content/AnimStarterPack** 下，选择一个要重定位到新骨架的动画。
    
8.  **右键单击** 该动画，然后选择 **重定位动画资源（Retarget Anim Assets） -> 复制动画资源并重定位（Duplicate Anim Assets and Retarget）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c650c7f5-3877-4446-8d44-8f02ba9d6ada/retarget7.png)
9.  在 **选择骨架（Select Skeleton）** 窗口中，你应该可在窗口上部看到目标骨架，选中它并单击 **重定位（Retarget）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75652ee4-db08-4bf5-ac76-04c9b97b07b0/retarget8.png)
    
    这样，你会将动画复制到指定的文件夹位置。你也可以在此窗口中指定"新资源名称（New Asset Name）"。
    
    为确保生成最佳重定位后的动画，**目标** 骨架应具有与源骨架相似的基本姿势。 如上，两个骨架都呈A字姿势，但是，你也可能碰到一个角色呈A字姿势，而另一个角色呈T字姿势的情况。 你可以使用[重定位基本姿势](/documentation/zh-cn/unreal-engine/retarget-manager-in-unreal-engine)在重定位动画前修改姿势。
    

### 最终结果

新的重定位后的动画可供使用以其作为目标重定位动画的骨架资源的任何骨架网格体使用。

尽管此示例是为了展示如何重定位动画，但是针对任何动画资源使用相同的 **右键单击** 方法之后，你都可以应用重定位了。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation retargeting](https://dev.epicgames.com/community/search?query=animation%20retargeting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用相同骨架的重定位](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%9B%B8%E5%90%8C%E9%AA%A8%E6%9E%B6%E7%9A%84%E9%87%8D%E5%AE%9A%E4%BD%8D)
-   [步骤](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [使用不同骨架的重定位](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%90%8C%E9%AA%A8%E6%9E%B6%E7%9A%84%E9%87%8D%E5%AE%9A%E4%BD%8D)
-   [步骤](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine#%E6%AD%A5%E9%AA%A4-2)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C-2)