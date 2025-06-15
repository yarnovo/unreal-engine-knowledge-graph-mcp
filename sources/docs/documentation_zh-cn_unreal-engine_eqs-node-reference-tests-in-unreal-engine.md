# EQS节点参考：测试 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:44:23.915Z

---

目录

![EQS节点参考：测试](https://dev.epicgames.com/community/api/documentation/image/61b8f1f1-94c6-4be6-97e3-2a1203ccd68a?resizing_type=fill&width=1920&height=335)

在场景查询系统（EQS）中，可以执行 **测试** 来确定在给定的[情境](/documentation/zh-cn/unreal-engine/eqs-node-reference-contexts-in-unreal-engine)（或参考帧）下从[生成器](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine)产生的哪个 **项目（Item）** 是"最佳"选择。引擎中提供了多种测试，可以覆盖很大一部分用例，例如"项目（Item）是否能追踪（看到）另一个位置"，或"项目（Item）与情境之间的距离是否在指定的范围内"。可以对一个生成器添加多个测试，这是缩小结果范围的有效方法，可以提供尽可能好的选择。 

如果默认的引擎测试不能满足需要，可以通过C++代码创建自定义测试。

## 通用测试属性

每种测试类型都有一些特有的属性，可以通过它们定义如何执行测试。但是所有测试都有一些通用的属性，用于定义测试的目的和对结果的处理。举例而言，测试是用于过滤掉一些结果，还是用于对结果评分并加权，或者两者兼有？在EQS编辑器中选择测试后，可以在 **细节（Details）** 面板中定义包括 **测试目的（Test Purpose）** 在内的测试属性。 

**测试属性**

属性

描述

**测试注释（Test Comment）**

关于测试用途的可选注释或说明。这可以在测试目的可能不够明确时，特别是在使用多种同一类型的测试时使用。

**测试目的（Test Purpose）**

定义测试中有哪些可用的附加选项以及测试应该用于什么目的。

-   **仅过滤（Filter Only）**：用于过滤可能的结果。未通过测试的项目（Item）将被移除。
-   **仅计分（Score Only）**：用于对可能的结果计分。返回的项目（Item）会得到一个加权数值。
-   **过滤并计分（Filter and Score）**：用于对结果进行过滤和计分。

**过滤器属性**

下列选项在 **测试目的（Test Purpose）** 设置为 **过滤（Filter）**（或设置为 **过滤并计分（Filter and Score）** ）时可用：

过滤是在计分前完成的，这是为了避免计算过滤掉的项目（Item）的分数。

属性

描述

**布尔匹配（Bool Match）**

这是为了授予计分因子而需要匹配的值（true或false）。执行测试时，如果不匹配此值，将不会改变分数。例如，在 **追踪** 测试中，用true或false判断是否命中了什么。或者对于 **寻路** 测试，判断路径是否存在。 

**\*\*多情境过滤运算（Multiple Context Filter Op）**\*\*

定义当 **Distance To Context** 返回多个项目（Item）时的过滤运算符。**全部通过（All Pass）** 意味着所有情境都必须通过，而 **任意通过（Any Pass）** 表示至少必须有一个情境通过。

**最小浮点值（Float Value Min）**

过滤任何小于或等于此值的数值。 

此选项仅可用于 **距离** 和 **点** 测试。

**最大浮点值（Float Value Max）**

过滤任何大于或等于此值的数值。

此选项仅可用于 **距离** 和 **点** 测试。

**过滤器类型（Filter Type）**

用于更改应用于**最小值** 、 **最大值** 或 **值范围** 的过滤器类型。任何超出 **最小浮点值（Float Value Min）** 和/或 **最大浮点值（Float Value Max）** 属性所指定的范围的数值都将被剔除。 

此选项仅可用于 **距离** 和 **点** 测试。

**计分属性**

下列选项在 **测试目的（Test Purpose）** 设置为 **计分（Score）**（或设置为 **过滤并计分（Filter and Score）**）时可用：

属性

描述

**\*\***多情境过滤运算（Multiple Context Filter Op）**\*\***

定义当 **Distance To Context** 返回多个项目（Item）时的过滤运算符。**全部通过（All Pass）** 意味着所有情境都必须通过，而 **任意通过（Any Pass）** 表示至少必须有一个情境通过。

**\*\*锁定最小值类型（Clamp Min Type）**\*\*

定义在应用计分公式前是否应该使用一个 **指定值** 来规格化原始测试值，或者是否应该使用找到（测试）的 **最低** 值。 

此选项仅可用于 **距离** 和 **点** 测试。

**锁定最大值类型（Clamp Max Type）**

定义在应用计分公式前是否应该使用一个 **指定值** 来规格化原始测试值，或者是否应该使用找到（测试）的 **最高** 值。 

此选项仅可用于 **距离** 和 **点** 测试。

**计分公式（Scoring Equation）**

修改测试的分数，使其符合 **常量** 、 **线性** 、 **平方** 、 **反线性** 或 **平方根** 类型的曲线。 

此选项仅可用于 **距离** 和 **点** 测试。

**计分因子（Scoring Factor）**

在应用计分公式之后，要乘以规格化分数的权重（因子）。此数值可以是负数。 

此选项仅可用于 **距离** 和 **点** 测试。

**规格化类型（Normalization Type）**

指定如何确定用于规格化分数的值范围。**绝对分数（Absolute to Scores）**（使用0作为规格化范围的基础）或 **相对分数（Relative to Scores）**（使用最低项目（Item）分数作为规格化范围的基础）。 

此选项仅可用于 **距离** 和 **点** 测试。

**参考值（Reference Value）**

用于对测试结果进行规格化，使得数值越接近 **参考值**，产生的规格化分数就越高。与 **参考值** 相差最远的值将被规格化为0，而在这两者之间的所有其他值都将按照与 **参考值** 的距离线性规格化。 

此选项仅可用于 **距离** 和 **点** 测试。

## 距离

![距离测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4421cbc-c87a-469b-94ee-1b67e9fe7381/test-distance.png)

**距离** 测试将返回项目（Item）和选择的 **距离（Distance To）** 属性之间的直线距离。如果"距离（Distance To）"是多个位置，它会取所有距离的平均值。 

![距离测试细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3ffe577-fd73-496f-839e-22ec88033642/test-distance-details-2.png)

属性

描述

**测试模式（Test Mode）**

用于测试距离的方法：在3D空间中，在作为XY平面的2D上，沿Z轴或Z（绝对）轴。

**距离（Distance To）**

将用于测量距离的情境。

## 点

![点测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72e0eab2-d39e-41ad-b04c-19d73f059e58/test-dot.png)

**点** 测试计算两个矢量的点积。这些矢量可以是情境旋转，也可以是从一个点到另一个点的矢量。此测试是用于确定是否有某些东西面向其他东西。

![点测试细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f3f682f-79db-4ecf-ad8c-919af7f7150e/test-dot-details.png)

下列属性可用于 **点** 测试： 

属性

描述

**线A模式（Line A Mode）**

用于定义测试使用的 **第一** 条线的方向。可以使用两种方法获取方向： 

-   **旋转（Rotation）**：将用作方向的指定情境。
-   **两点（Two Points）**：从一个情境位置到另一个情境位置的方向。

**线B模式（Line B Mode）**

用于定义测试使用的 **第二** 条线的方向。可以使用两种方法获取方向： 

-   **旋转（Rotation）**：将用作方向的指定情境。
-   **两点（Two Points）**：从一个情境位置到另一个情境位置的方向。

**测试模式（Test Mode）**

测试应该用完整的3D矢量进行计算，还是只用 **线A** 和 **线B** 矢量的方向矢量计算。

**绝对值（Absolute Value）**

这将使测试返回点积的绝对值（点积通常返回-1.0到1.0的值）。

## Gameplay标记

![Gameplay标记测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b29ec311-aeee-4e0d-8d4f-f4a05c3e318b/test-gameplay.png)

**Gameplay标记** 测试可指定一个标记，用于在测试中查询并尝试匹配。 

![Gameplay标记测试细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f46733e-ef6f-4160-bf96-b3aeebaa4c38/test-gameplay-details.png)

属性

描述

**要匹配的标记查询（Tag Query to Match）**

打开Gameplay标签编辑器，可以在其中指定要用于对照验证的标记。

**拒绝不兼容项目（Reject Incompatible Items）**

控制如何处理未实现IGamePlayTgAssetInterface的Actor。如果为true，则将忽略未实现接口的Actor，这意味着不会对它们计分，并且在过滤时不会考虑它们。如果为false，则未实现接口的Actor将包含在过滤和计分操作中，分数为零。

## 重叠

![重叠测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e5ffb9e-7a34-4297-a3de-6a29d05b42ad/test-overlap.png)

**重叠** 测试可用于确定项目（Item）是否处于属性定义的边界内。 

![重叠测试细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34b45c74-a7f3-4a76-bcb5-dc22f910f5d8/test-overlap-details.png)

属性

描述

**范围X（Extent X）**

X轴上的重叠的形状参数。

**范围Y（Extent Y）**

Y轴上的重叠的形状参数。

**范围Z（Extent Z）**

Z轴上的重叠的形状参数。

**形状偏移（Shape Offset）**

以测试重叠的项目（Item）位置为起点的偏移。例如，你可能需要在垂直方向上偏移来避免与平坦的地面重叠。

**重叠通道（Overlap Channel）**

用于重叠的几何体追踪[通道](/documentation/zh-cn/unreal-engine/collision-response-reference-in-unreal-engine)。

**重叠形状（Overlap Shape）**

用于几何体重叠的形状（**盒体（Box）** 、 **球体（Sphere）** 或 **胶囊体（Capsule）**）。

**仅阻挡命中（Only Blocking Hits）**

如果设置此属性，重叠将仅查找[阻挡命中](/documentation/zh-cn/unreal-engine/traces-with-raycasts-in-unreal-engine)。

**重叠复合（Overlap Complex）**

如果设置此属性，重叠将仅在[符合碰撞](/documentation/zh-cn/unreal-engine/simple-versus-complex-collision-in-unreal-engine)上运行。

**跳过重叠查询器（Skip Overlap Querier）**

设置后，重叠将跳过查询器上下文命中。

## 寻路

![寻路测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8883f9a6-c314-4cb1-94b8-29955da2d079/test-path.png)

**寻路** 测试可用于确定是否存在通向情境（或从其通出）的路径，通向（或来自）情境的路径开销有多高，或者路径有多长。 

![寻路测试细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f5acb53-4486-4dbd-860f-29415faad049/test-path-details.png)

属性

描述

**测试模式（Test Mode）**

应用测试的方法：

-   **路径存在（Path Exist）**：是否存在通向（或来自）情境的路径。
-   **路径成本（Path Cost）**：通向（或通出）情境的路径的开销。
-   **路径长度（Path Length）**：通向（或来自）情境的路径有多长。

**情境（Context）**

这是路径通向（或来自）的情境。

**路径从情境通出（Path from Context）**

寻路者应该前往情境（false）还是从情境出发（true）。

**过滤器类（Filter Class）**

要在寻路中使用的可选导航过滤器。

**跳过不可达（Skip Unreachable）**

如果设置此属性，路径失败的项目（Item）将失效。

如果 **测试模式（Test Mode）** 设置为 **路径成本（Path Cost）** 或 **路径长度（Path Length）** ， **细节（Details）** 面板的 **过滤器（Filter）** 和 **计分（Score）** 部分就会改变，提供通常仅可用于 **点** 测试和 **距离** 测试的通用属性的选项。

## 寻路批处理

![寻路测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd989f45-b16d-4e55-bb78-8311c1cb4282/test-path-batch.png)

**寻路** 测试可用于确定是否存在通向情境（或从其通出）的路径，通向（或来自）情境的路径开销有多高，或者路径有多长。系统将会根据定义的 **测试模式** 对处理的每个情境（路径）计分。 

![寻路测试细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efd5c991-4848-4df1-8838-36fa87310f89/test-path-batch-details.png)

属性

描述

**测试模式（Test Mode）**

应用测试的方法：

-   **路径存在（Path Exist）**：是否存在通向（或来自）情境的路径。
-   **路径成本（Path Cost）**：通向（或通出）情境的路径的开销。
-   **路径长度（Path Length）**：通向（或来自）情境的路径有多长。

**情境（Context）**

这是AI应该寻路通向或从其通出的情境。

**路径从情境通出（Path from Context）**

寻路者应该前往情境（false）还是从情境出发（true）。

**过滤器类（Filter Class）**

要在寻路中使用的可选导航过滤器。

**扫描范围乘数（Scan Range Multiplier）**

点和情境之间的最大距离的乘数。

**跳过不可达（Skip Unreachable）**

如果设置此属性，路径失败的项目（Item）将失效。

如果 **测试模式（Test Mode）** 设置为 **路径成本（Path Cost）** 或 **路径长度（Path Length）** ， **细节（Details）** 面板的 **过滤器（Filter）** 和 **计分（Score）** 部分就会改变，提供通常仅可用于 **点** 测试和 **距离** 测试的通用属性的选项。

## 投射

![投射测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f206efb-d464-43cd-9ccb-9a3438c27119/test-project.png)

**投射** 测试可用于将产生的项目（Item）投射到寻路网格体（和要使用的寻路网格体数据集）上。

这将把可能被墙壁围起或阻挡的项目（Item）移动回寻路网格体上，如果网格线恰好在寻路网格体边缘以外，这可能造成聚束。

![投射测试细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63dffee4-c810-4cec-af28-9652a561c1ce/test-project-details.png)

属性

说明

**追踪模式（Trace Mode）**

这是用于几何体追踪的形状：

-   **导航（Navigation）**：是否存在通向（或来自）情境的路径。
-   **按通道划分几何体（Geometry by Channel）**：通过使用通道追踪来确定到上下文去（或从上下文来）的路径的成本。
-   **按配置文件划分几何体（Geometry by Profile）**：通过使用配置文件追踪来确定到上下文去（或从上下文来）的路径的成本。

**导航过滤器（Navigation Filter）**

要使用的（可选）导航过滤器类。

**范围X（Extent X）**

追踪的形状参数。

**向下投射（Project Down）**

搜索高度定义为低于指定点。

**向上投射（Project Up）**

搜索高度定义为高于指定点。

**投射后垂直偏移（Post Projection Vertical Offset）**

此数值将添加到产生的位置的Z轴。 

在导航上投射点的时候这可能很有用，因为寻路网格体只是关卡几何体的近似，项目（Item）最终可能在可碰撞几何体的下方，这种情况会导致可视性检测结果不实等后果。

## 追踪

![追踪测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/619b8536-38d9-4c93-acc7-3de737977fff/test-trace-1.png)

**追踪** 检测将会[追踪](/documentation/zh-cn/unreal-engine/traces-in-unreal-engine---overview)到项目（Item）或情境（或从其出发），然后如果命中或没有命中某些东西又会返回。可以使用 **过滤** 选项 **布尔匹配（Bool Match）** 来反转结果。这类检测的一种典型用例是确定敌人是否能够（或不能）看到关卡中的玩家。 

![追踪测试细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c074ba00-2701-4571-8526-020f371bc79e/test-trace-details-1.png)

属性

描述

**追踪模式（Trace Mode）**

这是用于几何体追踪的形状：

-   **按通道划分几何体（Geometry by Channel）**：通过使用通道追踪来确定到上下文去（或从上下文来）的路径的成本。
-   **按配置文件划分几何体（Geometry by Profile）**：通过使用配置文件追踪来确定到上下文去（或从上下文来）的路径的成本。

**追踪通道（Trace Channel）**

这是用来执行追踪的通道。默认情况下的可用选项是 **可视性（Visibility）** 和 **摄像机（Camera）** ，但可以在 **编辑菜单（Edit Menu）> 项目设置（Project Settings）> 物理（Physics）> 追踪通道（Trace Channels）** 部分添加更多通道。

**追踪形状（Trace Shape）**

用来执行追踪的形状： **线形（Line）** 、 **球体（Sphere）** 、 **盒体（Box）** 或 **胶囊体）Capsule）** 。

**追踪复合体（Trace Complex）**

追踪应该针对网格体（复合体），还是仅针对简单碰撞。

**仅阻挡命中（Only Blocking Hits）**

追踪在结果中使用阻挡追踪还是非阻挡追踪。

**从情境追踪（Trace from Context）**

要从其追踪的情境，例如查询器、项目（Item）或你创建的任意自定义情境。

**情境（Context）**

这是追踪的另一端。

**项目（Item）高度偏移（Item Height Offset）**

将添加以厘米为单位的Z偏移至检测正在追踪到（或从其追踪）的项目（Item）。

**情境高度偏移（Context Height Offset）**

将添加以厘米为单位的Z偏移至检测正在追踪到（或从其追踪）的情境。

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [eqs](https://dev.epicgames.com/community/search?query=eqs)
-   [environmental query system](https://dev.epicgames.com/community/search?query=environmental%20query%20system)
-   [eqs node reference list](https://dev.epicgames.com/community/search?query=eqs%20node%20reference%20list)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [通用测试属性](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine#%E9%80%9A%E7%94%A8%E6%B5%8B%E8%AF%95%E5%B1%9E%E6%80%A7)
-   [距离](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine#%E8%B7%9D%E7%A6%BB)
-   [点](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine#%E7%82%B9)
-   [Gameplay标记](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine#gameplay%E6%A0%87%E8%AE%B0)
-   [重叠](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine#%E9%87%8D%E5%8F%A0)
-   [寻路](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine#%E5%AF%BB%E8%B7%AF)
-   [寻路批处理](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine#%E5%AF%BB%E8%B7%AF%E6%89%B9%E5%A4%84%E7%90%86)
-   [投射](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine#%E6%8A%95%E5%B0%84)
-   [追踪](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine#%E8%BF%BD%E8%B8%AA)