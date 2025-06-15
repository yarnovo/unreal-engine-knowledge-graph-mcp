# 如何在虚幻引擎中构建双横臂悬架载具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:53:14.339Z

---

目录

![如何构建双横臂悬架载具](https://dev.epicgames.com/community/api/documentation/image/656d4672-7912-4d54-a40e-8a8c0e11b2a0?resizing_type=fill&width=1920&height=335)

本教程将详细介绍 **高级载具（Advanced Vehicle）** 模板。完成本教程后，你应该会对该模板的原理有着良好的理解并学会如何构建和配置类似的载具。我们的重点将放在悬架上。

该载具模板中用到的所有FBX资产均可 **[在此处下载](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/7ee522b0-b908-43fa-abfb-bef9c0b6025c/doublewishbonevehicle_files.zip)**。在任何可以读取和写入FBX文件的建模包中，你可以分析原始版本并尝试自己的设计。这些FBX文件应与虚幻引擎中提供的 **高级载具（Advanced Vehicle）** 项目模板结合使用。

在开始之前，你应该知道双横臂悬架的设置比标准的虚幻引擎载具要复杂得多，因此如果你之前没有成功设置过任何载具，我们强烈建议你先设置一次。请参阅[如何设置载具](/documentation/404)文档，了解更多相关信息。

阅读完该文档并成功设置基础载具之后，你便可以开始学习本教程介绍的双横臂设计。我们将从一些基本理论开始。

## 模拟轮子与真实悬架连杆

当我们设置载具移动组件并为其指定轮子时，轮子的竖直移动通常由载具动画蓝图中的WheelHandler节点进行更新。在每一帧上，该处理器将沿局部Z轴上下移动轮子以模拟悬架，确保轮子尽可能接触地面。

此外，**WheelHandler** 还会应用旋转来使轮子围绕Y轴旋转（由模拟电机和变速箱的转速驱动）。除此之外，它会在当前转向角的驱动下使轮子围绕Z轴转动。

默认的竖直悬架移动由 **载具轮子派生（VehicleWheel-derived）** 类中的 **悬架最大升高（Suspension Max Raise）** 和 **悬架最大升高下降（Suspension Max Drop）** 设置进行限制。这完全是直线移动，如下图所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/710244d9-288f-4a85-9fcb-0cef31cc86c2/simwheeldefaultmovement.gif)

WheelHandler产生的标准竖直移动。

虽然并不完全真实，但这种类型的悬架模拟实际上对于大多数载具来说都非常合适，因为你通常看不到悬架臂或其他组件（例如弹簧和减震器）。任何拥有完整车身的汽车模型通常都可以采用这种悬架模拟。

但是，对于越野车或F1赛车等活动部件清晰可见的开放式载具，这种移动就存在问题了，因为现实世界没有任何悬架设计能够产生这种移动。

为了获得更真实的结果，我们需要可以围绕车身上某个固定枢轴点旋转的运动方式：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e93b47ae-8b97-48a8-9388-c50cbcf455b1/realwheelmovement.gif)

理想的竖直和横向移动。

为了解决这个小难题，我们可以首先假设轮子的管理分为两类：一类是由WheelHandler控制的模拟轮子节点，另一类是在汽车行驶过程中对可以看到的轮子加以渲染。然后，我们可以将WheelHandler提供给我们的数据馈送给悬架设置的其余部分，从而获得期待的结果。

简而言之，可见轮子和模拟轮子实际上可能是两个完全不同的对象，模拟轮子甚至根本不必是可见对象。

我们在VehicleWheel类中定义的轮子参数可以显式指定 **碰撞网格体**、**半径** 和 **宽度**。这些规格不一定要与载具骨骼网格体中的任何真实几何体相对应，因此网格体中的模拟轮子节点也不需要连接任何真实的几何体。此外，我们可以在载具蓝图的轮子设置部分中指定额外的轮子偏移，因此轮子的枢轴点不必与可见轮子网格体的几何中心对齐。

这些便是我们构建在机械层面具有真实感的悬架所需要的基本洞察。

## 骨骼节点的作用

在继续之前，我们需要了解一下对我们的设置特别有用的两个动画蓝图节点。上文已经介绍了不可或缺的WheelHandler节点，但还有其他强大的工具对这类绑定至关重要：**CopyBone** 和 **LookAt** 节点。这两个节点都可以在动画蓝图编辑器的"骨骼控制（Skeletal Control）"类目中找到，而它们执行的任务与Maya等应用程序中标准位置、旋转和目标约束的任务基本相同。

### Copy Bone

顾名思义，CopyBone节点可以将变换数据从一个骨骼（源）复制到另一个骨骼（目标）：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93eb6b86-b2c5-4989-bc1b-089020bc8aee/node_copybone.png)

CopyBone动画蓝图节点及其默认设置。

这意味着在WheelHandler更新模拟轮子的变换数据后，我们（举例来说）可以只抓取它产生的旋转值并应用到可见的轮子上。这个基本步骤将实现我们抓取旋转值的目的，也就是控制轮子的旋转和转向，同时又会避免获取我们不需要的平移（位置）数据。

### Look At

LookAt节点可以旋转任何给定的骨骼，使该骨骼的一个基轴最终对准另一个骨骼：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5559f39-4da1-4c61-a6b0-52cfe8b04146/node_lookat.png)

LookAt动画蓝图节点及其默认设置。

这对我们的设置很有用，因为它为我们提供了一种方法来确保悬架机构的所有组件不断更新以指向正确的方向，一切都由模拟轮子的当前位置直接或间接驱动。我们只需要确保存在可供LookAt节点对准的骨骼。这将用于我们动画蓝图中的多个骨骼。

## 实现概述

回顾一下：对于四个轮子中的每一个，我们将由WheelHandler管理一个不可见的轮子，同时在游戏中实际渲染一个可见的轮子。前者只是一个单一的骨骼/关节，没有任何带权重的网格体部分，而后者是我们在建模包中构建并添加到载具模型再导入到UE中进行最终设置的任何轮状网格体。

为了让一切正常运行，悬架的关键部分将从其他骨骼复制它们需要的变换数据，或者通过对准我们在模型中设置的目标来调整它们的方向。

## 构建模型

了解理论之后，我们就可以开始探讨这个演示载具的构建方式了。在主建模应用程序中打开 `Assets/FBX/vehicle_proto_S2.9.fbx`，就可以查看所有组件如何组合在一起。

为本教程创建的载具原型的悬架绑定如下所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9af23ca-34dd-4488-8eac-f97d7cc40f8a/keycomponents.png)

原型载具右前悬架详图。为方便辨认，此图中添加了颜色，但这些颜色并未实际指定给FBX文件中的材质。

此处的重要组件是上下臂（黄色）、主销（红色）和轮毂（蓝色）。两个臂围绕各自的六角螺栓（如该图最右侧所示）旋转。

聚集所有组件的中心点靠近下臂上的绿色螺栓。此处是模拟轮子关节 `PhysWheel_[loc]` 最初所在的位置。主销、轮毂和可见轮子的枢轴点也位于完全相同的位置。

每一个组件都有着非常严格的职责和变换范围。上下臂仅围绕它们的前轴旋转。主销跟随下臂顶部的位置，但始终保持竖直，绝不会相对于载具旋转。轮毂仅围绕其竖直轴旋转以满足转向需求。可见轮子从模拟轮子复制其旋转，但从下臂顶部获取其位置。所有组件都紧密组合在一起。

在比较复杂的绑定中，牢记层级结构和更新顺序非常重要。在这个示例中：下臂旋转时必须携带一个子网格体（下方的绿色螺栓），主销随后才可以使用CopyBone节点通过这个子网格体来正确定位自身。接下来，上臂需要获取主销的子网格体（靠近上方绿色螺栓）的更新位置，才能使用LookAt节点对准目标。如你所见，必须确保以正确的顺序更新不同的组件，否则悬架的某些部分的移动可能会滞后于其他部分。

所有这些逐帧的更新都由动画蓝图进行处理。

在DCC（数字内容创作）应用程序中构建模型时，我们其实只需要注意层级结构以及组件枢轴点的准确位置和方向。对于将通过LookAt节点更新自身旋转的组件，明确的方向尤其重要。

在设计这种机制时，使用建模包提供的约束一般会很有帮助。这些约束不会在导入时跟随FBX进入UE，但有时为了确保不同的组件能够以期待的方式移动而不会相互交叉，在构建模型时进行一些基本移动会更容易明确需要执行什么操作。但是，应避免使用无法在动画蓝图中重新创建的任何约束。

## 虚幻引擎中的设置

现在让我们了解一下此演示在虚幻引擎中的设置。先在编辑器中加载项目文件，然后打开载具的动画蓝图。请注意，大多数操作会应用四次，每个轮子一次。

载具行驶时，动画蓝图中会发生以下情况：

首先，WheelHandler会更新模拟轮子（`PhysWheel` 骨骼）的位置和旋转。可见轮子（`VisWheel` 骨骼）随后通过复制来自 `PhysWheels` 的旋转来更新自己的旋转：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f2f0f05-8bde-4774-91f7-de169a10b2f4/animbp_1.png)

Copy Rotation跟随WheelHandler到可见轮子。

这样可以为我们提供视觉上正确的旋转和转向，但轮子的位置不会改变。这一问题将在稍后的一个步骤中单独处理。

接下来，下臂（`ArmLower` 骨骼）对准 `PhysWheel` 的位置。载具右臂使用Y作为对准轴，而左臂则使用负Y：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c54d3e66-b401-4fe6-893c-dd5c2eb17d1c/animbp_2.png)

ArmLower骨骼对准PhysWheel位置。

可以在动画蓝图编辑器的3D窗口中轻松预览LookAt节点的结果：所选LookAt节点的当前目标会标示一个红叉。如果预览视口设置为线框模式，会更容易看到此标识。

`ArmLower` 骨骼旋转以匹配其LookAt目标时，会携带一个名为 `POS_Hub` 的子组件。这个子组件将在下一步骤中使用CopyBone节点仅抓取 `POS_Hub` 骨骼的平移数据，从而正确定位主销：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/928c8ea4-27e5-4a86-8a54-09bf7e96cc78/animbp_3.png)

设置主销位置。

轮毂和 `VisWheel` 稍后将使用相同的方法设置到相同的位置。

下一步通过对准各自的目标（`LAT_ArmUp` 骨骼）来调整上臂（`ArmUpper` 骨骼），这些目标已放置在正确位置，因为它们是主销骨骼的子项（在上一步中进行了更新）：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc604e08-a52a-490a-b057-99c0dd2bad9c/animbp_4.png)

上臂定向。

设置轮毂的位置后，只需对前轮毂进行一些额外的工作，以便转向触发绕Z轴的旋转。这将通过LookAt节点处理，而这些节点将对准作为前部PhysWheels子项的 `LAT_Hub` 骨骼：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77676532-a9f7-4350-ba98-4e49d5a74142/animbp_5.png)

设置轮毂位置和转向角。

最后，在设置VisWheel位置以匹配 `POS_Hub` 骨骼后，我们确保减震器的上半部分对准下减震架（`ShockMount_Low`），并且下减震器骨骼会跟随这个减震架（作为上臂的子项）的位置：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ca41e31-f570-4343-847e-5359afe12634/animbp_6.png)

定位可见轮子，并调整减震器组件。

## PhAT

原型的物理资产设置与标准载具模板基本相同，但有一些例外。最明显的区别是天线周围有很多小球体，但更重要的是，主车架周围有一个自定义的碰撞形态。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22b1ae2c-b30b-47f3-9bde-e16e57ad2f61/phat_1.png)

PhAT中的碰撞体。

由于该模型的根组件实际上是一个关节，因此没有几何体可用于创建包含细节的碰撞体积。主体体积是通过导入一个配备UCX网格体（Assets/FBX/vehicle\_collision\_S2.9.fbx）的单独静态网格体创建的。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fae94319-c283-4299-8e4d-684adb568f47/phat_2.png)

单独导入的带碰撞的静态网格体资产。

我们无法完全在PhAT内部进行处理。第一步是在你选择的3D建模包中构建碰撞资产，最好从主体网格体本身开始。然后，将此碰撞模型作为标准静态网格体连同UCX碰撞一起导入UE中。完成该操作后，我们只需将碰撞数据复制到PhAT内的载具根节点。在PhAT的骨架树（Skeleton Tree）面板中 **右键单击** 现有对象时，可以看到此选项。如果目标骨骼尚未指定对象，只需添加一个新对象，该对象将附加一个默认的胶囊体形状图元。然后，在添加自定义碰撞后，移除胶囊体。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd414c47-2775-4265-866a-6108e5a0a41d/phat_3.png)

"复制碰撞（Copy collision）"选项，位于菜单中的"高级（Advanced）"下。

### 天线设置

虽然天线不是双横臂悬架设置的一部分，但它仍然会影响载具的整体操控性。 最简单的解决方案当然是不受物理影响的全刚性天线，但此模板将展示如何设置天线，使得该天线会在载具行驶时移动，但又不会对载具的移动产生负面影响。

在此模板中，从 **Antenna1** 一直到 **Antenna10** 的顶部的每个天线骨骼都设置了一个球体，这个球体的半径与天线网格体本身的半径大致匹配。这些球体已关闭 **启用重力（Enable Gravity）** 以确保天线可以在物理系统最低限度的干涉下保持直立。当我们逐渐接近天线的顶部时，这些球体的质量从底部设置为16的质量标度开始呈指数衰减。后一个球体的质量比例依次为前一个球体的50`%`，因此可以得出从底部到顶部的完整顺序值为16、8、4、2、1、0.5、0.25、0.12、0.06和0.03。由此将产生一个沉重的底部、一个轻巧的顶部，以及这两端之间的平滑梯度。

![天线物理对象详细信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9bac86db-4f81-472b-b097-28eeac348c71/phat_antenna_1.png)

应用于这些球体的约束在线性和角度方面均完全锁定。由于骨骼链相对较长，因此在响应加速时仍然会发生微小的方向变化，再结合上述质量比例设置，我们可以得到一个稳定的模拟结果，并附带合理的轻微晃动。

为了确保该模拟不会在极端加速期间翻倒，所有天线约束都已选中 **启用预测（Enable Projection）**，使用1.0的 **角度公差（Angular Tolerance）**，并且球体的 **位置解算器迭代计数（Position Solver Iteration Count）** 已增加到16。

![天线约束详细信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6892e585-4f35-4cb5-843d-39b1d5990e54/phat_antenna_2.png)

最后，为防止任何不必要的混乱，天线球体与车身其余部分之间的所有内部碰撞已禁用。为了轻松实现此目标，只需选择"骨架树（Skeleton Tree）"面板中的所有对象，然后单击PhAT主工具栏中的 **禁用碰撞（Disable Collision）** 按钮。

![在](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5abab92-65d4-47c5-89c6-4accecf06f38/phat_antenna_3.png)

## 自行摇摆

你已经了解该设置的原理，现在肯定想开始构建自己的模型来替换这一原型。下面这些提示可以帮助你轻松完成该过程。

首先要保持名称和骨架树（Skeleton Tree）与原型几乎相同。这样做可以确保动画蓝图能够在不同的骨骼网格体上重新指定并重用，无需进行任何更改。这将为你节省大量时间。当然，所有网格体都可以重新建模并移动到不同的位置。只要确保所有网格体都正确对齐即可。向模型中添加更多的网格体节点不是问题，只要添加的节点不干扰关键悬架组件的整体层级结构即可。

载具根节点应放置在全局空间中的0,0,0处，并且不得以任何方式旋转。将根节点设为简单的关节对象可确保FBX导出和导入操作的问题最少，尤其是在使用变形减震器网格体等软边界组件时。

如果建模包允许，请设置为使用Z轴作为向上轴。无论如何，假设X是前轴，即使选择的应用程序认为Y是前轴也是如此。

在建模应用程序中，轮子网格体应接触地板/网格。始终确保模型各个组件的枢轴点位于预期的旋转中心，并且它们的旋转已归零。明显的例外是减震器：将根和顶部关节朝向它们彼此的定向方式会更合理。除非你完全确定自己在执行什么操作，否则切勿使用1,1,1以外的任何缩放比例，并避免冻结变换或等效函数。

## 导入选项

以下是原型使用的导入设置，很适合在导入你自己的自定义模型时作为参考：

![默认FBX文件导入选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b9e82b5-7d97-42bf-b4ff-dea7933245c0/import_options.png)

用于原型载具的导入选项。

……通过上面的介绍，你应该掌握了构建自己的高级载具的方法。祝你好运！

**鸣谢**

本项目和教程基于社区成员Xenome提供的作品，经许可在此发布。

非常感谢Xenome！

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [vehicles](https://dev.epicgames.com/community/search?query=vehicles)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [模拟轮子与真实悬架连杆](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#%E6%A8%A1%E6%8B%9F%E8%BD%AE%E5%AD%90%E4%B8%8E%E7%9C%9F%E5%AE%9E%E6%82%AC%E6%9E%B6%E8%BF%9E%E6%9D%86)
-   [骨骼节点的作用](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#%E9%AA%A8%E9%AA%BC%E8%8A%82%E7%82%B9%E7%9A%84%E4%BD%9C%E7%94%A8)
-   [Copy Bone](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#copybone)
-   [Look At](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#lookat)
-   [实现概述](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#%E5%AE%9E%E7%8E%B0%E6%A6%82%E8%BF%B0)
-   [构建模型](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#%E6%9E%84%E5%BB%BA%E6%A8%A1%E5%9E%8B)
-   [虚幻引擎中的设置](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E7%9A%84%E8%AE%BE%E7%BD%AE)
-   [PhAT](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#phat)
-   [天线设置](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#%E5%A4%A9%E7%BA%BF%E8%AE%BE%E7%BD%AE)
-   [自行摇摆](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#%E8%87%AA%E8%A1%8C%E6%91%87%E6%91%86)
-   [导入选项](/documentation/zh-cn/unreal-engine/how-to-build-a-double-wishbone-suspension-vehicle-in-unreal-engine#%E5%AF%BC%E5%85%A5%E9%80%89%E9%A1%B9)