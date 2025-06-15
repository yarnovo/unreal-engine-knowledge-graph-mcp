# 虚幻引擎中的缆绳组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:40.960Z

---

目录

![缆绳组件](https://dev.epicgames.com/community/api/documentation/image/e52da8c3-0845-4558-bb17-f7d16e1fe7b1?resizing_type=fill&width=1920&height=335)

假如能以较低的开销添加来回晃荡的缆绳、绳索或链条，仿佛被风吹动一般，那么虚幻引擎的项目会更加栩栩如生。 本文将介绍如何使用 **缆绳组件（Cable Component）** 插件创建、设置和控制缆绳的外观、响应方式，甚至是让它和关卡中的对象发生碰撞。

## 模拟和渲染

在模拟缆绳的实际效果时，我们用到了游戏开发中的一项经典技巧——**韦尔莱积分算法（Verlet Integration）**。 这种算法的理念是用一系列粒子来表示缆绳，且粒子之间有 **距离约束**。 两端的粒子 **固定不动**，只跟随它的绑定对象移动。 中间的粒子则 **自由移动**，随重力下垂。 在每一步（积分）中，每个粒子的速度和位置都会更新，并相应移动以满足约束。 缆绳的 **刚性** 由我们（每步）强制执行约束时采用的迭代次数决定。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51669c15-0875-41e7-ad2b-b61370752ad7/cc_particlerope.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51669c15-0875-41e7-ad2b-b61370752ad7/cc_particlerope.png)

点击图片查看大图。

生成完粒子锁链后，我们需要对它进行渲染。 渲染缆绳时，将创建一个名为 **FCableSceneProxy** 的类来表示缆绳的渲染效果。 粒子的两端的位置（在主线程上的TickComponent中执行）会通过 **SendRenderDynamicData\_Concurrent** 函数传递给此代理。 接下来，更新会在渲染线程锁定，之后将更新索引和顶点缓存，进而生成一个 **管状** 网格体。 管状网格体上的每个顶点都要计算一个位置、一个纹理UV和三个切线基础（Tangent Basis）向量。 执行此操作时，**X轴** 与缆绳的方向相同，**Z轴** 垂直缆绳表面（相当于法线），而 **Y轴** 则与 **X轴** 和 **Z轴** 垂直。 这些属性对组件公开，让用户可以控制面的数量、管状的半径，以及UV沿缆绳进行平铺的次数。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5a51e00-35b6-4c72-9de3-1de1e55018a8/cc_renderinggeo.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5a51e00-35b6-4c72-9de3-1de1e55018a8/cc_renderinggeo.png)

点击图片查看大图。

## 启用插件

缆绳组件插件会默认启用。 如未启用，可在主工具栏中选择 **编辑（Edit）** > **插件（Plugins）**。 然后从插件列表中选择 **渲染（Rendering）**，勾选 **缆绳组件（Cable Component）** 的 **已启用（Enabled）** 复选框。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d75d0a21-2ae2-4989-8705-b5a86f0bc25a/03-enebling-cable-component-plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d75d0a21-2ae2-4989-8705-b5a86f0bc25a/03-enebling-cable-component-plugin.png)

点击图片查看大图。

## 使用缆绳组件

在以下部分，我们将说明为项目关卡添加缆绳的两种不同方法。

### 用放置Actor面板添加缆绳组件

如需使用放置Actor面板添加缆绳组件，请执行以下操作：

1.  在 **主工具栏（Main Toolbar）** 中单击 **创建（Create）** 并选择 **放置Actor（Place Actors）** 面板。
    
    ![Access Place Actors Panel from the Create button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3966b40b-c821-467f-a4b1-7008e7de0ab2/04-adding-place-actors-panel.png)
2.  在搜索框中，输入`Cable`。 然后将 **缆绳Actor（Cable Actor）** 拖入关卡中。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ff2e6c2-a53b-4fd5-9439-4f4794023ad4/05-dragging-cable-actor-into-the-level.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ff2e6c2-a53b-4fd5-9439-4f4794023ad4/05-dragging-cable-actor-into-the-level.png)
    
    点击图片查看大图。
    
3.  现在便可放置、旋转和缩放缆绳Actor，使其满足关卡的需求。
    

### 在蓝图中使用缆绳组件

如需在蓝图中使用缆绳组件，请创建一个新的蓝图类。

1.  在 **内容抽屉（Content Drawer）/内容浏览器（Content Browser）** 中 **右键单击** 并选择 **蓝图类（Blueprint Class）**。
    
    ![Creating new Blueprint Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad0bc30c-84e0-4ef1-b967-432232a8731a/07-creating-new-blueprint.png)
2.  选择 **Actor** 作为新蓝图的父类。
    
    ![Select Actor from the Pick Parent Class Window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0769294d-2f94-4545-aa84-7b063d368ef0/08-select-actor-as-parent-class.png)
3.  将蓝图命名为 **BP\_Cable**。 然后双击该蓝图，在 **蓝图编辑器（Blueprint Editor）** 中将其打开。
    
    ![Rename blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fba85f00-2040-4354-962b-c662dc2eaba8/09-rename-blueprint.png)
4.  在 **组件（Components）** 选项卡中单击 **添加（Add）** 按钮。 在列表中，找到并选择 **缆绳（Cable）** 组件
    
    ![Adding Cable component to the Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/466ccb9a-7043-43d6-a4cd-7809645ac538/10-adding-cable-component-to-blueprint.png)
5.  添加完缆绳组件后，在组件列表中将其选中，以便通过 **细节（Details）** 面板调整其属性。 将其他设置保留为默认值，在关闭编辑器之前，请务必 **编译（Compile）** 并 **保存（Save）** 蓝图。
    
    要使缆绳的任意一头下垂，请通过细节面板禁用 **附加头端（Attach Start）** 或 **附加末端（Attach End）** 选项。 也可以根据效果所需，在游戏运行时切换该选项。
    
    ![Disabling Attach Start and Attach End](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/259b2f00-5e39-482d-950d-0e31f00f7a79/11-cable-properties-details-panel.png)
6.  在内容抽屉中找到 **BP\_Cable**，然后将其拖入关卡。 根据需要对其进行移动和旋转。
    
    ![Dragging Cable Blueprint into the level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3f5ada9-a03e-4f2c-a1d6-c77ef829d853/12-drag-cable-blueprint-into-the-level.png)

## 在缆绳末端附加对象

你可以在缆绳的任意一端附加对象，使其随缆绳摇荡。 要实现此目的，请执行以下操作：

1.  在Actor面板中，将一个 **立方体Actor（Cube Actor）** 拖入关卡中。 将其放在之前添加的 **BP\_Cable** 旁边。
    
    ![Dragging the Cube Actor into the Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f279a8f9-1bbe-4c67-944e-14d4f702400a/13-drag-cube-actor-into-the-level.png)
2.  务必将该立方体的 **移动性（Mobility）** 设置为 **可移动（Movable）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44c0b429-db51-46d3-bd69-00f4856dac02/14-set-mobility-to-movable.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44c0b429-db51-46d3-bd69-00f4856dac02/14-set-mobility-to-movable.png)
    
    点击图片查看大图。
    
3.  在 **世界大纲视图** 中，找到需要附加到缆绳Actor末端的立方体， 然后将其拖至缆绳Actor的上方。 完成此操作后，以下对话框窗口将打开。 ![Drag the cube over the cable actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a8c3374-590f-4e77-98a8-5fbab7eaab04/15-drag-the-cube-over-cable.png)
    
4.  选择 **缆绳末端（Cable End）**，即可在视口中看到该立方体附着到缆绳的末端。
    
    ![Before](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d1a81de-bf58-4775-bb96-310f602617e1/cc_attach_before.png)
    
    ![After](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/354ea87b-5cb4-41a5-9f57-5f7546a677e3/cc_attach_after.png)
    
    Before
    
    After
    
5.  在关卡视口中选中缆绳Actor。 然后在 **细节（Details）** 面板的 **缆绳（Cable）** 部分中，禁用 **附加末端（Attach End）** 选项。  
    ![Disabling the Attach End option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2db8f97e-ba96-49cb-9370-a0bc17f18314/16-disabling-attach-end.png)
    
    **附加头端（Attach Start）** 和 **附加末端（Attach End）** 选项并非将缆绳附加到Actor的唯一方法。 也可指定一个用作附着点的插槽。
    
6.  禁用 **附加末端（Attach End）** 后，缆绳就能在视口中自由摇荡。
    
    可在运行时动态启用或禁用 **附加头端（Attach Start）** 和 **附加末端（Attach End）** 选项，制造出一些有趣的效果。
    

## 碰撞和刚性

启用碰撞（Collision）和刚性（Stiffness）将大幅增加缆绳Actor的开销。 建议仅在以下情况下启用：缆绳需要和世界中的对象碰撞，或需要一些刚性以实现更好的效果。 如无此类需求，最好禁用这些选项以降低开销。

缆绳组件有一个选项可让缆绳与世界发生碰撞，并控制缆绳的刚度。 要启用此功能，请执行以下步骤：

1.  在蓝图编辑器中，转到缆绳组件的细节面板。 找到 **缆绳（Cable）** 部分，展开其 **高级（Advanced）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c422a76f-e3e9-46ec-b52e-c85558e66826/18-expanding-the-advanced-section.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c422a76f-e3e9-46ec-b52e-c85558e66826/18-expanding-the-advanced-section.png)
    
    点击图片查看大图。
    
2.  启用 **启用刚性（Enable Stiffness）** 和 **启用碰撞（Enable Collision）** 选项。
    
    ![Enabling Stiffness and Collision](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0c824cd-2c8e-460d-aadb-2c74f11d3d01/19-enabling-stiffness-and-collision.png)
3.  现在，当缆绳Actor和对象相遇时，应该会发生碰撞效果。
    

## 缆绳组件属性参考

本小节包含缆绳组件每个属性的参考信息：

#### 缆绳

![Properties in the Cable Section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfbe906c-b618-41b3-9166-026c04d9a214/21-cable-section-properties.png)

属性名称

描述

**附加头端（Attach Start）**

将头端固定到某处还是不固定。 如为false，组件变换只用于缆绳头端的初始位置。

**附加末端（Attach End）**

将末端固定到某处（使用AttachEndTo和EndLocation）还是不固定。 如为false，AttachEndTo和EndLocation只用于缆绳末端的初始位置。

**将末端附加到（Attach End To）**

定义缆绳末端位置的Actor或组件。

**组件名称（Component Name）**

将缆绳附加到的组件属性的名称。

**将末端附加到的插槽名称（Attach End To Socket Name）**

要附加到的AttachEndTo组件上的插槽名称。

**末端位置（End Location）**

缆绳的末端位置，指定后则相对于AttachEndTo（或AttachEndToSocketName）。 否则将相对于缆绳组件。

**缆绳长度（Cable Length）**

缆绳的静止长度。

**分段数量（Num Segments）**

缆绳拥有的分段数量。

**解算器迭代（Solver Iterations）**

解算器迭代的数量，用于控制缆绳的刚度。

**分步时间（Substep Time）**

控制缆绳的模拟分步时间。

**使用分步（Use Substepping）**

如为false，会先等待 **Substep Time** 过去再进行更新，但只使用所有累积的模拟时间运行一次缆绳模拟。

**启用刚度（Enable Stiffness）**

为缆绳添加刚度约束。

**启用碰撞（Enable Collision）**

在每个分步为每个缆绳粒子执行扫描，避免与世界发生碰撞。 使用组件上的碰撞预置决定碰撞的对象。 这会大幅增加缆绳模拟的开销。

此功能目前为试验性功能。

**碰撞摩擦力（Collision Friction）**

如果启用了 **碰撞（Collision）**，此选项将控制接触到缆绳时应用的滑动摩擦力。

### 缆绳力

![Properties in the Cable Forces Section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cff95ed-492b-49c7-8657-73244786f4d0/22-cable-forces-section-properties.png)

属性名称

描述

**缆绳力（Cable Forces）**

应用到缆绳中所有粒子的力向量（世界空间）。

**缆绳重力比例（Cable Gravity Scale）**

应用到影响此缆绳的世界重力的缩放比例。

### 缆绳渲染

![Properties in the Cable Forces Section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42a79b43-d88c-4615-9802-db7b6a6c0f53/23-cable-rendering-section-properties.png)

属性名称

描述

**缆绳宽度（Cable Width）**

缆绳几何体的宽度。

**面数（Num Sides）**

缆绳几何体的面数。

**重复平铺材质（Tile Material）**

沿缆绳长度方向重复材质的次数。

-   [components](https://dev.epicgames.com/community/search?query=components)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [模拟和渲染](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E6%A8%A1%E6%8B%9F%E5%92%8C%E6%B8%B2%E6%9F%93)
-   [启用插件](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%8F%92%E4%BB%B6)
-   [使用缆绳组件](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%BC%86%E7%BB%B3%E7%BB%84%E4%BB%B6)
-   [用放置Actor面板添加缆绳组件](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E7%94%A8%E6%94%BE%E7%BD%AEactor%E9%9D%A2%E6%9D%BF%E6%B7%BB%E5%8A%A0%E7%BC%86%E7%BB%B3%E7%BB%84%E4%BB%B6)
-   [在蓝图中使用缆绳组件](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E4%BD%BF%E7%94%A8%E7%BC%86%E7%BB%B3%E7%BB%84%E4%BB%B6)
-   [在缆绳末端附加对象](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E5%9C%A8%E7%BC%86%E7%BB%B3%E6%9C%AB%E7%AB%AF%E9%99%84%E5%8A%A0%E5%AF%B9%E8%B1%A1)
-   [碰撞和刚性](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E7%A2%B0%E6%92%9E%E5%92%8C%E5%88%9A%E6%80%A7)
-   [缆绳组件属性参考](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E7%BC%86%E7%BB%B3%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
-   [缆绳](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E7%BC%86%E7%BB%B3)
-   [缆绳力](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E7%BC%86%E7%BB%B3%E5%8A%9B)
-   [缆绳渲染](/documentation/zh-cn/unreal-engine/cable-components-in-unreal-engine#%E7%BC%86%E7%BB%B3%E6%B8%B2%E6%9F%93)