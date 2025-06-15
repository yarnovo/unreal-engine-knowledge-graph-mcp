# 虚幻引擎EQS节点参考：生成器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:44:27.234Z

---

目录

![EQS节点参考：生成器](https://dev.epicgames.com/community/api/documentation/image/6d75eff0-e595-40d8-bdd6-1827d88cf329?resizing_type=fill&width=1920&height=335)

在场景查询系统（EQS）中，**生成器** 用于产生将要测试和加权的位置或Actor（统称为 **项目（Item）**），权重最高的位置或Actor会返回到[行为树](/documentation/404)。可以使用不同类型的生成器来检索信息，它们可以在蓝图中创建，也可以在C++中创建。 

## Actors of Class

![Actors Of Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f57d7d3-9572-40fc-a5a6-da3b44d6c097/generators-actors-of-class.png)

**Actors of Class** 生成器在 **搜索中心** 周围特定的 **搜索半径** 内查找给定类的所有Actor。返回的Actor可以用作测试中的项目。 

![The Actors of Class Generator finds all of the Actors of a given class within the specified Search Radius around the Search Center](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0c9eee7-86c6-411b-a2bc-6edc7c864154/actors-of-class-details.png)

属性

描述

**搜索的Actor类（Searched Actor Class）**

要查找的Actor类（例如Pawn、角色）。

**仅在半径内生成Actor（Generate Only Actors in Radius）**

如果启用该属性，系统将只在 **搜索半径** 内返回特定 **搜索的Actor类** 的Actor。如果禁用该属性，将返回游戏世界场景中指定 **搜索的Actor类** 的所有Actor。可以选择将用户定义的 **数据绑定** 与此选项一起使用。

**搜索半径（Search Radius）**

查找指定 **搜索的Actor类** 的最大距离。  

零值和负值将不会返回任何结果。

**搜索中心（Search Center）**

作为搜索中心的情境，例如从查询器或其他某些情境开始进行搜索。

**选项名称**

此属性继承自生成器ActorsOfClass的基类。它主要在显示此生成器的名称时（如HUD或输出消息）使用。

**自动排序测试（Auto Sort Tests）**

如果启用该选项，运行查询前将自动对测试排序，以获得最佳性能。

## Composite

![Composite Generator](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2aa8e2a2-f679-4fde-bb87-6783573ca7d2/generators-composite.png)

设置EQS查询时，有时可能希望在一个测试用例中包含多个 **生成器**。通过 **合成（Composite）** 节点即可将多个 **生成器** 添加到一个数组，然后将该数组用于测试。 

![With the Composite node you can add multiple Generators to an array](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0cd0437-24b2-43a8-a6eb-7e9c189208b7/generators-composite-details-1.png)

属性

描述

**生成器（Generators）**

允许添加多个包含在测试中的生成器。

**允许不同项目（Item）类型（Allow Different Item Types）**

允许对有不同项目（Item）类型的生成器执行测试。 

生成器将对原始数据使用 **强制项目（Item）类型（Forced Item Type）**，必须确保子生成器的内存布局正确，因为它们要通过自己的项目（Item）类型写入内存块。例如，当测试通过 **强制项目（Item）类型（Forced Item Type）** 读取项目（Item）位置/属性时，数据必须要能放进 **强制项目（Item）类型（Forced Item Type）** 分配的块中。

**强制项目（Item）类型（Forced Item Type）**

要在测试中使用的项目（Item）类型。例如Actor、方向或点。

**选项名称**

此属性继承自生成器ActorsOfClass的基类。它主要在显示此生成器的名称时（如HUD或输出消息）使用。

**自动排序测试（Auto Sort Tests）**

如果启用该选项，运行查询前将自动对测试排序，以获得最佳性能。

## Current Location

![Current Location](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a258e954-ad7e-4019-940d-49f6ee35af01/generators-location.png)

**Current Location** 生成器可用于获取指定的 **查询情境** 的位置，以实现测试验证的目的。 

![The Current Location Generator can be used to get the location of the specified Query Context for the purposes of validating Tests](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adc200c7-03de-4b43-93a5-4576461df2e4/generators-location-details.png)

属性

描述

**查询情境（Query Context）**

要在测试中使用的情境及其当前位置。

**选项名称**

此属性继承自生成器ActorsOfClass的基类。它主要在显示此生成器的名称时（如HUD或输出消息）使用。

**自动排序测试（Auto Sort Tests）**

如果启用该选项，运行查询前将自动对测试排序，以获得最佳性能。

## 自定义生成器

除引擎提供的生成器类型外，还可以创建类型为 **EnvQueryGenerator\_BlueprintBase** 类的新蓝图来创建自己的自定义生成器。

![Custom Generators](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a553e6c-ac93-4dc1-8e35-963d1c1f405e/custom-generator.png)

在C++中开发的生成器执行速度通常快于通过蓝图开发的生成器。

创建自定义生成器后便可以在场景查询中使用它：

![Your custom Generator will be available within an Environmental Query](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03b0d869-c983-4e15-9c47-ab0ba730552d/add-custom-generator.png)

在自定义生成器内部有一个可以覆盖的函数，名为 **Do Item Generation**：

![There is a function you can override called Do Item Generation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/530aca54-c605-42ec-b653-e1d8dfe43c21/do-item-generation-1.png)

当覆盖此函数时，就会获得从场景查询中传入的情境位置的数组。

![You will get an array of locations that are the Context locations passed in from the Environmental Query](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbbaf3ae-5358-4381-badc-738cf6189825/do-item-generation-2-1.png)

数组可能因情境而异。例如，数组可以只有一个条目，其中包含查询器的位置，或者是关卡中每个体力回复剂的位置。

由于函数只能返回一个值，Do Item Generation函数有两个可以传递回场景查询的数组：**Add Generated Actor** 和 **Add Generated Vector**。

![Add Generated Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2edd48f-a750-4093-95be-e7652429ba40/add-generated-actor.png)

Add Generated Actor节点将向Actor返回数组添加Actor。该节点也可以和 **Add Generated Vector** 节点（下文）配合使用，同时返回位置值。生成器根据从Environment Query节点设置的黑板键来确定实际传递回行为树的数值。 

![Add Generated Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c675da5-a09a-4e4e-90cd-435464d42276/add-generated-vector.png)

## Points:Circle

![Circle Generator](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9889372d-db16-4b64-b5bd-c3d3bf632350/generators-circle.png)

**Points:Circle** 生成器从 **Circle Center** 进行放射性追踪，以项目（Item）形式返回在（生成圆的）半径边缘的命中。 

![Circle Generator radiates traces out from the Circle Center](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55c8d814-aa8a-42c3-bbea-29a964bc5ed8/on-circle-details.png)

属性

描述

**圆半径（Circle Radius）**

将从 **Circle Center** 情境外延的圆的最大半径。

**生成间隔（Spawn Between）**

在圆的外侧边缘上生成的项目（Item）的间隔（以厘米计）。

**点数（Number Of Points）**

要在圆上生成的项目（Item）数量。

**圆弧方向（Arc Direction）**

定义用于确定圆弧方向的模式。可以选择 **两点（Two Points）**（从一个情境位置到另一个情境位置的方向）或 **旋转（Rotation）**（使用情境的旋转作为方向）。

**圆弧角（Arc Angle）**

定义圆弧的角度，按度数计。

**圆心（Circle Center）**

用作圆心的情境。

**生成圆时忽略所有情境Actor（Ignore Any Context Actors when Generating Circle）**

如果启用此属性，则在生成圆时忽略对情境Actor的追踪。

**圆心Z偏移（Circle Center ZOffset）**

应用于情境的Z轴可选偏移。

**追踪数据（Trace Data）**

与如何执行追踪相关的选项。 

-   **追踪模式（Trace Mode）**：用于几何式追踪的形状。
-   **导航过滤器（Navigation Filter）**：用于追踪的导航过滤器。
-   **范围X（Extent X）**：追踪的形状参数。

**投影数据（Projection Data）**

是否应该将生成的项目（Item）投射到寻路网格体上（以及使用哪个寻路网格体数据集）。

**选项名称**

此属性继承自生成器ActorsOfClass的基类。它主要在显示此生成器的名称时（如HUD或输出消息）使用。

**自动排序测试（Auto Sort Tests）**

如果启用该选项，运行查询前将自动对测试排序，以获得最佳性能。

## Points:Cone

![Cone Generator](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a08f7c4f-941f-42ea-bf85-f9e310514baf/generators-cone.png)

**Points:Cone** 从 **中心Actor** 放射出指定 **锥体角度** 的锥体追踪作为项目（Item）。 

![Cone radiates a trace out from the Center Actor in the shape of a cone with the specified Cone Degrees as Items](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2fbe642-6cf1-4573-a245-b4a09ce1ae4c/cone-details.png)

属性

描述

**对齐的点距（Aligned Points Distance）**

同一角度上每个点之间的距离。

**锥体角度（Cone Degrees）**

生成锥体的最大角度。

**角度步幅（Angle Step）**

角度增大的步幅。角度步幅必须大于或等于一。数值越小，生成的项目（Item）越少。

**射程（Range）**

从情境生成锥体的距离。

**中心Actor（Center Actor）**

将会在其面对方向生成锥体的Actor。

**包含情境位置（Include Context Location）**

生成项目（Item）时是否包含 **中心Actor** 位置。 

此选项会跳过 **MinAngledPointsDistance** 参数。

**投射数据（Projection Data）**

是否应该将产生的项目（Item）投射到寻路网格体上（以及使用哪个寻路网格体数据集）。

**选项名称**

此属性继承自生成器ActorsOfClass的基类。它主要在显示此生成器的名称时（如HUD或输出消息）使用。

**自动排序测试（Auto Sort Tests）**

如果启用该选项，运行查询前将自动对测试排序，以获得最佳性能。

## Points: Donut

![Donut Generator](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04ec6fb3-c64c-4106-9f0d-677622951f27/generators-donut.png)

**Points:Donut** 按照用户指定的 **环数** 产生从 **中心** 情境辐射出的基于形状的追踪。 

![Donut Generator, creates a shape based trace with the user specified Number Of Rings radiating from the Center Context](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1be6ad92-e8b0-49dd-9328-2d56a5de0df1/donut-details.png)

属性

描述

**内半径（Inner Radius）**

点和情境之间的最小距离。

**外半径（Outer Radius）**

点和情境之间的最大距离。

**环数（Number Of Rings）**

要生成的环数。

**每环点数（Points Per Rig）**

每个环要生成的点数。

**圆弧方向（Arc Direction）**

定义用于确定圆弧方向的模式。你可以选择 **两点（Two Points）**（从一个情境位置到另一个情境位置的方向）或 **旋转（Rotation）**（使用情境的旋转作为方向）。

**圆弧角（Arc Angle）**

定义圆弧的角度，按度数计。

**使用螺旋模式（Use Spiral Pattern）**

如果启用该选项，圆环将以螺旋模式旋转。如果禁用该选项，则所有环都是零旋转，看起来更像车轮的辐条。

**中心（Center）**

要作为搜索中心的情境，例如从查询器或其他某些情境出发进行搜索。

**投射数据（Projection Data）**

是否应该将产生的项目（Item）投射到寻路网格体上（以及使用哪个寻路网格体数据集）。

**选项名称**

此属性继承自生成器ActorsOfClass的基类。它主要在显示此生成器的名称时（如HUD或输出消息）使用。

**自动排序测试（Auto Sort Tests）**

如果启用该选项，运行查询前将自动对测试排序，以获得最佳性能。

## Points: Grid

![Grid Generator](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48a8651c-02a3-478b-b043-8450df497358/generators-simple-grid.png)

**Points:Grid** 将在 **Generate Around** 下指定的查询器周围生成项目（Item）网格。

![Grid Generator will generate a grid of Items around the specified querier assigned under Generate Around](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd0b2891-3db8-48be-8bca-2302b98148db/simple-grid-details.png)

属性

描述

**网格半大小（GridHalfSize）**

要生成的项目（Item）网格的高度和宽度。

**间隔（Space Between）**

网格项目（Item）的间距。

**生成围绕（Generate Around）**

用于围绕其生成网格的情境。

**投射数据（Projection Data）**

是否应该将产生的项目（Item）投射到寻路网格体上（以及使用哪个寻路网格体数据集）。

这将把可能被墙壁围起或阻挡的项目（Item）移动回寻路网格体上，如果网格线恰好在寻路网格体边缘以外，这可能造成聚束。

**选项名称**

此属性继承自生成器ActorsOfClass的基类。它主要在显示此生成器的名称时（如HUD或输出消息）使用。

**自动排序测试（Auto Sort Tests）**

如果启用该选项，运行查询前将自动对测试排序，以获得最佳性能。

## Points: Pathing Grid

![Pathing Grid](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6e3a55a-29d6-4032-85f8-ebea40536ae8/generators-pathing-grid.png)

可以使用 **Points:Pathing Grid** 围绕给定的情境位置生成网格。

![Pathing Grid to generate a grid around the given Context location](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af82af8b-8200-4228-b733-7229e9be9817/pathing-grid-details.png)

属性

描述

**到项目（Item）的路径（Path to Item）**

寻路方向应该指向项目（Item）（启用）还是远离它（禁用）。

**导航过滤器（Navigation Filter）**

要在寻路过程中使用的导航过滤器。

**网格半大小（GridHalfSize）**

方块范围的一半（边缘距离）。

**间隔（Space Between）**

定义网格上的点的生成密度。

**生成围绕（Generate Around）**

用于围绕其生成网格的情境。

**投射数据（Projection Data）**

是否应该将产生的项目（Item）投射到寻路网格体上（以及使用哪个寻路网格体数据集）。

这将把可能被墙壁围起或阻挡的项目（Item）移动回寻路网格体上，如果网格线恰好在寻路网格体边缘以外，这可能造成聚束。

**选项名称**

此属性继承自生成器ActorsOfClass的基类。它主要在显示此生成器的名称时（如HUD或输出消息）使用。

**自动排序测试（Auto Sort Tests）**

如果启用该选项，运行查询前将自动对测试排序，以获得最佳性能。

**扫描范围乘数（Scan Range Multiplier）**

点和情境之间的最大距离的乘数。

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [eqs](https://dev.epicgames.com/community/search?query=eqs)
-   [environmental query system](https://dev.epicgames.com/community/search?query=environmental%20query%20system)
-   [eqs node reference list](https://dev.epicgames.com/community/search?query=eqs%20node%20reference%20list)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Actors of Class](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine#actorsofclass)
-   [Composite](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine#composite)
-   [Current Location](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine#currentlocation)
-   [自定义生成器](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%94%9F%E6%88%90%E5%99%A8)
-   [Points:Circle](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine#points:circle)
-   [Points:Cone](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine#points:cone)
-   [Points: Donut](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine#points:donut)
-   [Points: Grid](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine#points:grid)
-   [Points: Pathing Grid](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine#points:pathinggrid)