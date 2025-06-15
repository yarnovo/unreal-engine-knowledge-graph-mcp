# 使用虚幻引擎使用动画蓝图链接 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-animation-blueprint-linking-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:10.237Z

---

目录

![使用动画蓝图链接](https://dev.epicgames.com/community/api/documentation/image/ca2e7ee2-f0ce-4f6c-8f68-7cc6c8a271f5?resizing_type=fill&width=1920&height=335)

**动画蓝图链接** 系统是[子动画实例](/documentation/zh-cn/unreal-engine/using-sub-anim-instances-in-unreal-engine)的扩展。它支持在动画图表上动态切换子部分，因而支持多用户协作，而且由于动画蓝图不再加载未使用的动画，因而还可节约内存。

在本教程中，我们将创建动画蓝图，通过 **动画图层接口** 方式获取链接动画蓝图中包含的动画姿势。

**Epic Games Launcher** 的 **学习（Learn）标签** 上的 **内容示例（Content Examples）** 项目还包含 **动画（Animation）** 贴图中的动画蓝图链接示例。

## 步骤

在本指南中，我们将使用已启用 **初学者内容（Starter Content）** 的 **蓝图第一人称（Blueprint First Person）** 模板。我们还添加了 **动画初学者包（Animation Starter Pack）**，**Epic Games Launcher** 上的 **市场（Marketplace）** 中免费提供此包。

1.  在项目中，在 **内容（Content）> AnimStarterPack** 下，将 **Ue4ASP\_Character** 添加到关卡中。在 **详细信息（Details）** 面板中，将 **自动拥有玩家（Auto Possess Player）** 设为 **玩家0（Player 0）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1bd2b8d7-279a-4fad-94c3-bb4dd4f240c0/animationlayer_01.png)
    
    因此，在编辑器中运行时可控制此角色。
    
2.  双击 **内容浏览器**。在 **动画（Animation）** 下，创建名为 **MyLayerInterface** 的 **动画图层接口（Animation Layer Interface）** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e04c770-4b37-42e5-9a2f-cd93b2af91ec/animationlayer_02.png)
    
    此类资源类似于[蓝图接口](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine)，可用来定义图层数量、名称、所属组以及任何输入。
    
3.  在 **MyLayerInterface** 资源中，将图层命名为 **ExampleLayer**。在 **详细信息（Details）** 面板中， 单击 **+**（加号）符号以添加 **输入（Input）**，然后单击 **编译（Compile）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a488759b-293a-4e8f-aaba-faf94bc584f2/animationlayer_03.png)
    
    动画图层可公开子图表中的多个输入姿势，以及可用于混合或其他基于逻辑的实现目的的输入参数。
    
4.  用 **UE4\_Mannequin\_Skeleton**（来自Animation Starter Pack文件夹）创建动画蓝图，并将其命名为 **HitReact\_AnimBP**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/729ac868-a970-462d-9fa2-59e2358ef34d/animationlayer_04.png)
    
    这就是动画蓝图，我们要将它链接到本指南前面在关卡中放置的角色所使用的现有动画蓝图。
    
5.  在工具栏上的 **HitReact\_AnimBP** 中，单击 **类设置（Class Settings）** 按钮，然后在 **详细信息（Details）** 面板下的 **接口（Interfaces）** 下，添加 **MyLayerInterface**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29d18887-1917-472b-9c7a-212677d72b1f/animationlayer_05.png)
6.  在 **示例图层（Example Layer）** 中，将 **Hit\_React\_1** 动画从 **资源浏览器（Asset Browser）** 添加到图表，并连接到 **输出姿势（Output Pose）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60532e2d-abc4-4da6-84a7-140f2862c125/animationlayer_06.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60532e2d-abc4-4da6-84a7-140f2862c125/animationlayer_06.png)
    
    来自图层接口的 **输入姿势（Input Pose）** 可以导入姿势数据，并可用于与该图层中定义的任何逻辑或其他姿势数据混合。
    
7.  在 **内容（Content）> AnimStarterPack** 文件夹中，打开 **UE4ASP\_HeroTPP\_AnimBlueprint**，然后从 **类设置（Class Settings）** 添加 **MyLayerInterface**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7fcbb52-6d07-4687-a007-327478f57fc3/animationlayer_07.png)
8.  在 **示例图层（Example Layer）** 中，将 **输入姿势（Input Pose）** 连接到 **输出姿势（Output Pose）**，如下图所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48d3627f-0eb3-49ce-8ae2-d43b39bc7e8a/animationlayer_08.png)
    
    在本例中，输入姿势（Input Pose）来自 **链接动画蓝图（Linked Anim BP）**（我们在其中放置了Hit React动画）。在本例中，我们将直接从链接的动画蓝图（Linked Animation Blueprint）获取姿势并切换到此姿势。
    
9.  在 **动画图表（Anim Graph）** 上，添加 **Linked Anim Layer** 节点（设为 **示例图层（Example Layer）**），然后按如下方式连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c6dca31-b844-4a0c-bf64-9d00b0aaff9b/animationlayer_09.png)
    
    **默认** 状态机将通过链接的动画图层传递姿势，并输出到 **输出姿势（Output Pose）**。调用 **Link Anim Class Layers** 后，将执行底层动画蓝图。
    
    Linked Anim Layer 节点具有可用于指定默认图层覆盖的 **实例类（Instance Class）** 属性。要将逻辑分解成多个动画蓝图时，这是特别实用。例如，若具有频繁更改的IK逻辑，可将其移至单独的动画蓝图中，并在主动画蓝图中将其设为默认运行。
    
10.  在 **内容（Content）> AnimStarterPack** 文件夹中，打开 **Ue4ASP\_Character** 角色蓝图。
    
11.  添加 **H** 按键事件（或任何其他按键互动），拖入 **网格体（Mesh）** 组件，然后将设置的 **Link Anim Class Layers** 和 **Unlink Anim Class Layers** 节点添加到 **HitReact\_AnimBP**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa0e5d52-9be0-4da1-964d-afe87d39eb90/animationlayer_10.png)
    
    按住H时，指定为 **类中（In Class）** 的链接动画蓝图将被设为链接实例并进行执行。释放H时，任何运行指定类的图层节点将被解除链接并重置为默认值。
    
    另外，我们还为蹲伏添加了 **C** 键盘事件来解决警告消息。
    
12.  **编译（Compile）** 并在编辑器中 **运行（Play）**。
    

## 最终结果

下面，动画蓝图正常执行，直至按下H键激活图层节点和底层动画蓝图设置（播放Hit React动画）。

动画图层和链接动画蓝图可提供维护复杂角色内的可延展性和组织的方法。有了图层和链接动画蓝图，逻辑可通过图层在动画蓝图内进行分段，也可在另一个动画蓝图中完全分离开来，并从动画蓝图中进行链接。

### 其他用例

下面显示[Fortnite](https://www.epicgames.com/fortnite/en-US/home)上利用的链接动画图层的简单用例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f702142-25a7-441c-a560-8dd40f914188/fortniteanimbp.png)

上图，我们有两个接口，一个用于武器，另一个用于车辆。可同时激活这两个接口。 也可以一个动画蓝图实现其中一个接口来覆盖图表的多个点（例如，武器覆盖 `WeaponUpperBody` 和 `WeaponAdditive`）

下面是上述设置的一些可能设置：

-   开车时，由车辆接管整个姿势。
-   持枪时，车辆在下半身运行坐姿动画，由武器控制上半身。若用户更换武器，新武器动画蓝图将控制上半身，下半身继续基于车辆运行。
-   武器可覆盖上半身姿势，随即与主图表中的下半身姿势相结合，然后基于武器在整个身体姿势之上运行自定义叠加动画（例如怠速噪音）。

在Fortnite中，武器可覆盖主图表中的许多不同点。例如，针对跳跃、下降、着陆、高空滑缆等状态的运动使用状态机。

此状态机位于主图表中，而不是针对每个武器重复状态机，同时武器动画蓝图具有可覆盖每种状态的图层。

若武器无需覆盖某些状态，则不会将任何内容连接到相应图层的输出姿势。

此外，包含图层的动画蓝图还具有各自的事件图表。因此，若需处理特定车辆的数据，可将其包含在该车辆动画蓝图的事件图表中。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blueprint](https://dev.epicgames.com/community/search?query=animation%20blueprint)
-   [skeletal controls](https://dev.epicgames.com/community/search?query=skeletal%20controls)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-animation-blueprint-linking-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-animation-blueprint-linking-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [其他用例](/documentation/zh-cn/unreal-engine/using-animation-blueprint-linking-in-unreal-engine#%E5%85%B6%E4%BB%96%E7%94%A8%E4%BE%8B)