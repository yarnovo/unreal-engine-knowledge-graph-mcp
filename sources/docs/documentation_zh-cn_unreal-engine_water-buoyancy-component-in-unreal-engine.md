# 虚幻引擎中的水浮力组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/water-buoyancy-component-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:18:33.083Z

---

目录

![水浮力组件](https://dev.epicgames.com/community/api/documentation/image/278a7b36-2fab-4a93-840a-024831983362?resizing_type=fill&width=1920&height=335)

水系统包含蓝图 **浮力（Buoyancy）** 组件，它使用球体（浮筒）为旨在与水面交互的物体创建简化的体积近似物。此近似物提供了低成本的解决方案，可以同时创建使用浮力的多个物体。

![拥有多个物体的水浮力](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4579ed0b-9781-4a40-a06f-95f288828c1d/water-buoyancy-many-objects.gif)

## 示例水浮力蓝图

**水（Water）** 插件包含自己的示例内容，可供你使用和浏览。其中含有一个蓝图，你可使用带有立方体静态网格体的浮力组件对其进行设置。为了使立方体能够在水面平衡并直立，蓝图会使用四个浮筒设置。

浮力示例蓝图可在 **引擎（Engine）> 插件（Plugins）> 水内容（Water Content）> 蓝图（Blueprints）** 下找到，并且命名为 **BP\_BuoyancyExample** 。将其拖放到水体表面上方。当你 **播放** 或 **模拟** 时，它将自动落下并沿水面漂浮，如下例所示。

## 在蓝图中设置水浮力

以下步骤说明了如何使用浮力组件设置和使用你自己的蓝图。

1.  在 **内容浏览器（Content Browser）** 中，创建新的 **蓝图类（Blueprint Class）** ，选择 **Actor** 类，然后命名。就本指南而言，我们将使用"BuoyancyExampleBP"名称。
    
    ![创建蓝图Actor。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85fd603d-f226-4f83-982e-8af09b7f6ae1/1-create-actor-bp.png)
2.  打开你的蓝图。在 **组件（Components）** 面板中，点击 **添加（Add +）** 下拉菜单并选择 **静态网格体（Static Mesh）** 。
    
    ![将静态网格体组件添加到你的蓝图。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed39bd3a-a4ad-4112-af4f-929523f9ea9c/2-bp-add-staticmesh-component.png)
3.  选择 **静态网格体（Static Mesh）** 组件。在 **细节（Details）** 面板中，将网格体分配到 **静态网格体（Static Mesh）** 分配插槽。
    
    ![将静态网格体分配到蓝图中的静态网格体组件。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f9e66b4-527b-410f-8a9d-a5c5929e6940/3-bp-assign-staticmesh.png)
    
    如果你想严格按图中所示操作，你可以下载用于本指南的网格体。直接将此网格体拖放到 **内容浏览器（Content Browser）** 中。
    
    [船舶网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/4d5de2bb-74e5-4a08-957b-04d3ea185671/boat-mesh.zip)
    
4.  当你仍在 **细节（Details）** 面板中时，启用 **模拟物理系统（Simulate Physics）** 以及 **物理（Physics）** 类别下的 **质量（千克）（Mass (kg)）** 旁边的复选框。
    
    ![在蓝图的静态网格体组件中启用物理。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9949c76-374c-4591-94bf-2ec70acfa195/4-bp-staticmesh-enable-physics.png)
    
    必须启用 **质量（千克）（Mass (kg)）** ，浮力组件才能正常运行。
    
5.  在 **组件（Components）** 面板中，使用 **添加（Add +）** 下拉菜单添加 **浮力（Buoyancy）** 组件。
    
6.  选择 **浮力（Buoyancy）** 组件。在 **浮力数据（Buoyancy Data）** 下的 **细节（Details）** 面板中，你将添加一些 **浮筒（Pontoons）** ，使网格体能够漂浮在水面上。首先点击 **添加（Add (+)）** 图标，添加一个浮筒。
    
    ![将浮筒添加到蓝图的浮力组件。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d881d3b-6017-40e1-b9cd-57fc9277d2af/6-buoyancy-component-add-pontoons.png)
    
    你应该会看到添加到数组的新浮筒元素，如下所示：
    
    ![蓝图中的浮力组件浮筒设置。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1150be87-3372-4663-860e-af72b42be4cb/6-buoyancy-component-pontoon-settings.png)
7.  再将 **三** 个 **浮筒** 添加到数组，这样总共有四个数组元素。将这些浮筒沿网格体的正面和背面放置，使其在水面稳定，方法是使用 **相对位置（Relative Location）** 将浮筒放置在以下位置：
    
    ![添加到蓝图的浮力组件的四个浮筒的列表。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdcb5cd5-4a1a-4af2-83b6-212d9d1f1668/7-buoyancy-component-pontoon-locations.png)
    
    -   **索引0（背面左侧）** ：660、370、0
    -   **索引1（背面右侧）** ：660、-370、0
    -   **索引2（正面左侧）** ：-220、370、0
    -   **索引3（背面右侧）** ：-220、-370、0
    
    输入浮筒的相对位置时，没有浮筒的视觉显示。但是，你可以使用[静态网格体插槽](/documentation/zh-cn/unreal-engine/using-sockets-with-static-meshes-in-unreal-engine)和 **中心插槽（Center Socket）** 标签放置浮筒，而不输入具体的位置数据，或将 **场景（Scene）** 组件添加到蓝图，并手动将其位置复制到浮筒的相对位置。
    
8.  在蓝图 **组件（Components）** 面板中，点击 **StaticMesh** 组件并将其拖入 **DefaultSceneRoot** ，使其成为新的根组件。
    
    ![使静态网格体组件成为蓝图的根组件。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ae35b3c-292f-47d2-9a05-1de9b15ae83f/8-buoyancy-staticmesh-scene-root.png)
    
    静态网格体 **必须是** 根组件，浮力组件才能正确运行。
    
9.  将你的浮力蓝图拖放到关卡中，并放置在水面上方。 按 **播放** 或 **模拟** ，查看结果。
    

## 浮力组件属性

**浮力（Buoyancy）** 组件有以下属性。这些属性将控制浮筒与水面交互时的物理。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5c447c6-5c31-4c72-8b4a-0e966a4c2213/buoyancy-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5c447c6-5c31-4c72-8b4a-0e966a4c2213/buoyancy-settings.png)

点击查看大图。

选择浮力组件时，以下属性在 **细节（Details）** 面板的 **浮力（Buoyancy）** 分段下可用。

属性

说明

**浮筒（Pontoons）**

添加到组件以近似表示其体积的可用浮筒的数组，这些浮筒的半径可能各不相同。

-   **中心插槽（Center Socket）** ：静态网格体上要将此浮筒居中到的插槽。
-   **相对位置（Relative Location）** ：相对于父Actor位置的浮筒位置。如果指定了中心插槽，它会被中心插槽覆盖。
-   **半径** ：此浮筒的半径大小（以世界单位计）。
-   **FXEnabled** ：此浮筒是否应该在进入水中时视为视觉/音频效果的候选项，用于用户实现的迸发信号？

**COM上的中心浮筒（Center Pontoons on COM）**

启用后，在使用相对位置时会将浮筒在质心附近居中放置。在使用插槽指定浮筒位置时，不会使用该属性。

**浮力系数（Buoyancy Coefficient）**

增加应用到每个浮筒的浮力。

**浮力阻尼（Buoyancy Damp）**

基于Z速度缩放阻尼的阻尼因子。

**浮力阻尼2（Buoyancy Damp 2）**

基于Z速度缩放阻尼的二阶阻尼因子。

**浮力提升最小速度（Buoyancy Ramp Min Velocity）**

开始向浮力应用提升的最小速度。

**浮力提升最大速度（Buoyancy Ramp Max Velocity）**

浮力可以提升到的最大速度。

**浮力提升最大值（Buoyancy Ramp Max）**

浮力可以提升到的最大值（最大速度或更高）。

**最大浮力（Max Buoyant Force）**

向上方向的最大浮力。

**水岸推力因子（Water Shore Push Factor）**

将物体推向岸边的系数（主要出于性能原因）。

**水速度强度（Water Velocity Strength）**

在河流水体中应用力的系数。

**最大水力（Max Water Force）**

河流水体可以应用的最大推力。

**在水中应用拖拽力（Apply Drag Forces in Water）**

指定是否向水中移动的物体应用拖拽力。

**拖拽系数（Drag Coefficient）**

基于速度应用线性拖拽的系数。

**拖拽系数2（Drag Coefficient 2）**

基于速度平方应用线性拖拽的系数。

**角拖拽系数（Angular Drag Coefficient）**

应用抵抗物体旋转的角拖拽的系数。

**最大拖拽速度（Max Drag Speed）**

应用拖拽力的最大速度。

**应用河流力（Apply River Forces）**

指定引擎是否应该应用河流力，例如下游推力与河岸推力。

**河流浮筒索引（River Pontoon Index）**

应该用来计算水力的浮筒的列表。用于计算横向推力/拉力，在可能的情况下，利用下游计算结果抓取用于计算主要力的水速度。

**水岸推力因子（Water Shore Push Factor）**

将物体推向河流岸边的系数（出于性能原因）。或者，设置负数以推向河流中心。

**河流遍历路径宽度（River Traversal Path Width）**

物体应该沿河流内部遍历的路径宽度。

**最大岸边推力（Max Shore Push Force）**

河流可以向边缘或中心应用的最大推力。

**水速度强度（Water Velocity Strength）**

在河流中应用推力的系数。

**最大水力（Max Water Force）**

河流可以应用的最大推力。

**总是允许横向推力（Always Allow Lateral Push）**

启用后，允许横向推动物体，无论河流中的向前移动速度如何。

**向上游快速移动时允许水流（Allow Current when Moving Fast Upstream）**

启用后，会在向上游高速移动时应用水流。为载具禁用，以便拥有更大控制权。

**应用下游角旋转（Apply Downstream Angular Rotation）**

启用后，会应用扭矩以沿河流下游方向对齐物体。

**下游旋转轴（Downstream Axis of Rotation）**

下游角旋转应该与之对齐的物体相关的轴。

**下游旋转强度（Downstream Rotation Strength）**

下游角旋转应用的强度。

**下游旋转刚度（Downstream Rotation Stiffness）**

用于沿下游方向对齐物体的弹簧的刚度。

**下游旋转角阻尼（Downstream Rotation Angular Damping）**

用于沿下游方向对齐物体的弹簧的阻尼。

**下游最大加速（Downstream Max Acceleration）**

每次更新时要应用于下游旋转的最大扭矩。

## 调试水浮力

你可以使用控制台命令 `r.Water.DebugBuoyancy 1` 调试与水面的浮力组件交互情况。每个浮筒会受到与水面交互的各个点组成的网格牵引。

下面的示例显示了多个不同形状和船舶网格体，其中用到了不同间距和大小的浮筒。

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [static mesh](https://dev.epicgames.com/community/search?query=static%20mesh)
-   [water](https://dev.epicgames.com/community/search?query=water)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [示例水浮力蓝图](/documentation/zh-cn/unreal-engine/water-buoyancy-component-in-unreal-engine#%E7%A4%BA%E4%BE%8B%E6%B0%B4%E6%B5%AE%E5%8A%9B%E8%93%9D%E5%9B%BE)
-   [在蓝图中设置水浮力](/documentation/zh-cn/unreal-engine/water-buoyancy-component-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E8%AE%BE%E7%BD%AE%E6%B0%B4%E6%B5%AE%E5%8A%9B)
-   [浮力组件属性](/documentation/zh-cn/unreal-engine/water-buoyancy-component-in-unreal-engine#%E6%B5%AE%E5%8A%9B%E7%BB%84%E4%BB%B6%E5%B1%9E%E6%80%A7)
-   [调试水浮力](/documentation/zh-cn/unreal-engine/water-buoyancy-component-in-unreal-engine#%E8%B0%83%E8%AF%95%E6%B0%B4%E6%B5%AE%E5%8A%9B)