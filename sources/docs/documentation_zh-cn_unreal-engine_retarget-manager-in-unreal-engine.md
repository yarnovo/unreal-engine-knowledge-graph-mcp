# 虚幻引擎中的重定向管理器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/retarget-manager-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:05:09.233Z

---

目录

![重定向管理器](https://dev.epicgames.com/community/api/documentation/image/63b41b3d-e237-44c6-abc9-b3422d8e3682?resizing_type=fill&width=1920&height=335)

**骨架编辑器** 中的 **重定向管理器（Retarget Manager）**可用来管理重定向源，设置骨架绑定以及定义用于[动画重定向](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine)的重定向后的基本姿势。

## 管理重定向源

因为重定向使用[**骨架**](/documentation/zh-cn/unreal-engine/skeletons-in-unreal-engine)资产，而骨架的原比例是由最初为之创建骨架的骨架网格体定义的，由此得出结论，在大多数情况下可以顺利地实现单向重定向。但是常常会有一些专为变体版本构建的特殊动画。例如，假设你的多个角色共用了同一个骨架资产（一个基本角色、一个矮小角色和一个高大角色）而你仅为角色的高大版本创建了特殊动画。

如果你将这个新的仅包含高大角色的动画导入，仍然需要和以前一样使用从角色的基本版本创建的同一骨架资产。这将导致新动画的比例失真。解决方法就是使用 **重定向管理器（Retarget Manager）** 中的 **管理重定向源（Manage Retarget Source）** 选项，它使你能够将动画序列与为之设计了动画序列的实际骨架网格体关联。通过这种方法，任何特殊动画重定向问题都可以得到解决。

### 添加重定向源

1.  在 **骨架编辑器** 中，从 **工具栏** 中单击 **重定向源管理器（Retarget Source Manager）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d81a7dcf-28c0-42eb-9e19-ee84bab4e48d/retargetmanager.png)
2.  单击 **添加新重定向源（Add New Retarget Source）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df7fa0b8-1466-4b80-b217-e78911f51250/addsource.png)
3.  选择为之创建了特殊动画的 **骨架网格体**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75f5cf6f-3139-4d89-bf87-c99f87cf2884/selectskeletalmesh.png)
    
    现在你可以看到该骨架网格体在 **重定向管理器（Retarget Manager）** 中列出。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d7fcf84-6be8-4dfd-bcc9-df1f5e0dd848/created.png)
4.  打开针对你的特定 **骨架网格体** 的特殊 **动画序列**。
    
5.  在 **资产细节（Asset Details）** 面板中，找到 **动画（Animation）** 类别，然后找到 **重定向源（Retarget Source）** 属性并从下拉菜单中选择你的特定 **骨架网格体**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcd55ff2-8513-44b6-9327-3ab90d11924c/dropdownselection.png)
    
    通过选择此网格体，你就指定了要使用该网格体的比例驱动此动画。
    

## 设置骨架绑定

"重定向管理器（Retarget Manager）"的中间部分允许你为骨架指定 **骨架绑定**，可用它将动画数据传递给使用同一个骨架绑定的不同骨架。

![Set up Rig-1.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/00ad6f96-cb79-4d27-b9af-23b6337d74bb/set20up20rig-1.png "Set up Rig-1.png")

为使用不同骨架资产的角色执行任何动画重定向时，需要用到此流程。

你可以从 **选择骨架绑定（Select Rig）** 下拉选项中选择要使用的骨架绑定，其中包含 **人形（Humanoid）** 选项，你将需要为大多数角色选择它。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dfd0398-7336-4a16-9937-3f66a219b891/humanoidsetup-1.png "HumanoidSetup-1.png")

指定好人形骨架绑定后，你将需要指定骨架中与骨架绑定上的节点对应的相同（或相似）位置的骨骼。你可以使用下拉菜单来选择节点并手动从骨架指定相应的骨骼，或者你可以使用位于菜单顶部的 **自动映射（Auto Mapping）** 功能。此功能将对骨架进行翻查并尝试为骨架绑定上的每个节点找到最匹配的骨骼。

如果你使用的不是双足角色，或者角色骨架的层级无法兼容人形绑定资产，那你可以自己创建绑定资产，方法是右键点击内容浏览器中的角色骨架，选择 **创建（Create） > 创建绑定（Create Rig）**。

**清除映射（Clear Mapping）** 按钮将从相应的节点指定中擦除所有当前已指定的骨骼。你也可以使用 **保存（Save）** 和 **加载（Load）** 按钮来保存当前映射指定或加载 **节点映射容器（Node Mapping Container）** 资产（如下所示）中以前保存的映射指定。

**显示高级（Show Advanced）** 按钮将允许你为手指、IK骨骼或扭转骨骼等指定额外的节点/骨骼关联。在为源骨架（驱动要重定向到另一个角色的动画的骨架资产）设置好骨架绑定后，你将需要前往目标骨架的骨架，并指定相同的骨架绑定及定义新骨架中与骨架绑定上的节点最匹配的骨骼。

请参阅[使用重定向的动画](/documentation/zh-cn/unreal-engine/using-retargeted-animations-in-unreal-engine)"来获取设置骨架绑定以在使用不同骨架的角色间重定向动画的分步指南。

## 管理重定向基本姿势

有时你可能希望将动画重定向到基本姿势与源骨架不太一致的骨架。

以下图右侧的骨架为例尝试重定向动画：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76e6cf43-c0be-4f1e-b7bd-303773429c42/managebasepose1.png)

源骨架（左侧）呈A字姿势，而目标骨架呈T字姿势。如果我们就这样重定向动画，可能会遇到问题：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d29ec09b-19d7-46d8-997d-8b5c849c5a8f/targetanimation.png)![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a816c0e8-09bd-48e3-9f02-8c2fbfa478b3/badbasepose.png)

在左侧的目标动画中，角色手持散弹枪，然而，当我们将动画重定向到右侧的新角色时，（由于它们使用的基本姿势不同）手臂定位不正确。我们可以通过在 **重定向管理器（Retarget Manager）** 中重定向基本姿势来解决这一问题，重定向管理器（Retarget Manager）使我们能够定义基本姿势使其重定向，并使用重定向后的基本姿势来进行动画重定向，而非使用角色正常的基本姿势。

我们可以选中角色的骨骼并旋转它们（在本示例中，旋转左肩和右肩），使角色呈A字姿势，然后单击 **修改姿势（Modify Pose）**：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23f6529e-80a8-4b37-89cc-58730da2fb80/retargetedbasepose.png)

在上下文菜单中，选择 **使用当前姿势（Use Current Pose）**：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bc1e01e-b895-45cb-bf95-55d036b23af7/usecurrentpose.png)

这样就可以把该姿势设置为在执行任何动画重定向时要使用的重定向后的基本姿势。

现在当我们重定向动画时，将会看到经过更新的重定向后的基本姿势：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90e41cd8-6807-4395-bbaf-c016a0a93a79/newbasepose.png)

当我们针对基本姿势相似度更高的骨架重定向动画时，我们将得到效果更好的结果：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/839f7025-26b2-4f39-9f19-de60595efe46/holdingshotgun.png)

### 从姿势资产导入重定向基本姿势

在 **修改（Modify）** 上下文菜单中，你也可以选择从动画[姿势资产](/documentation/zh-cn/unreal-engine/animation-pose-assets-in-unreal-engine)导入姿势以将其用作重定向后的基本姿势。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efee1f7e-316d-4fed-bbb3-df7dbd086dc7/importpose.png)

在上图中，在选择好要使用的姿势资产（1）之后，可用的姿势将显示在选择下拉菜单中（2）。从姿势资产中选择好要使用的姿势之后，单击 **导入（Import）** 按钮（3），系统将会将视口中的网格体更新为使用刚刚选择的姿势作为重定向后的基本姿势。下面（左图）展示了默认的姿势而且（右图）展示了我们从姿势资产中选择的作为重定向后基本姿势的姿势。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48db483b-d091-4587-8829-6b90d7e24a67/defaultpose.png)![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bba3cf14-53de-4ba8-b11c-da3eeae99d92/newretargetpose.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [skeleton](https://dev.epicgames.com/community/search?query=skeleton)
-   [retargeting](https://dev.epicgames.com/community/search?query=retargeting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [管理重定向源](/documentation/zh-cn/unreal-engine/retarget-manager-in-unreal-engine#%E7%AE%A1%E7%90%86%E9%87%8D%E5%AE%9A%E5%90%91%E6%BA%90)
-   [添加重定向源](/documentation/zh-cn/unreal-engine/retarget-manager-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E9%87%8D%E5%AE%9A%E5%90%91%E6%BA%90)
-   [设置骨架绑定](/documentation/zh-cn/unreal-engine/retarget-manager-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E9%AA%A8%E6%9E%B6%E7%BB%91%E5%AE%9A)
-   [管理重定向基本姿势](/documentation/zh-cn/unreal-engine/retarget-manager-in-unreal-engine#%E7%AE%A1%E7%90%86%E9%87%8D%E5%AE%9A%E5%90%91%E5%9F%BA%E6%9C%AC%E5%A7%BF%E5%8A%BF)
-   [从姿势资产导入重定向基本姿势](/documentation/zh-cn/unreal-engine/retarget-manager-in-unreal-engine#%E4%BB%8E%E5%A7%BF%E5%8A%BF%E8%B5%84%E4%BA%A7%E5%AF%BC%E5%85%A5%E9%87%8D%E5%AE%9A%E5%90%91%E5%9F%BA%E6%9C%AC%E5%A7%BF%E5%8A%BF)