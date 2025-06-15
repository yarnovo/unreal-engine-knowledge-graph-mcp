# 虚幻引擎控制绑定中的控制点、骨骼和Null | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:15:11.625Z

---

目录

![控制点、骨骼和Null](https://dev.epicgames.com/community/api/documentation/image/c646e375-19de-475d-8d04-dda78d7ba949?resizing_type=fill&width=1920&height=335)

在控制绑定中创建可靠的绑定效果时，离不开 **控制点（Controls）** 、**骨骼（Bones）** 和 **Null** 这三个主要绑定元素。它们每个都拥有十分广泛的应用，搭配后可以创建完整的骨骼绑定。

本文介绍了控制点、骨骼和Null，并提供了使用简单的工作流程示例。

#### 先决条件

-   你已创建并打开骨骼网格体的[控制绑定](/documentation/zh-cn/unreal-engine/rigging-with-control-rig-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%E8%B5%84%E4%BA%A7)。

## 元素介绍

控制点、骨骼和Null的创建方式是在 **绑定层级（Rig Hierarchy）** 面板中右键点击，然后在 **新建（New）** 菜单中选择对应的选项。

![新建骨骼新建控制点新建null](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dca45bc-0308-404f-aecd-528be8cb6245/creation1.png)

默认情况下，新建元素位于视口原点(0,0,0)。如果创建前，你在"绑定层级（Rig Hierarchy）"面板中选中了某个元素，则会在该元素位置创建，并以该元素为父节点。这样有助于不同元素彼此排列整齐。

![创建控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd38c03c-615b-42ae-82ed-c8314232c526/creation2.gif)

### 组织

你可以在 **绑定层级（Rig Hierarchy）** 中右键点击元素并选择 **重命名（Rename）** ，或者按 **F2** 来重命名元素。

![重命名控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3d395d7-bc0c-4075-9a91-24a24994e8d8/rename.png)

你可以在 **绑定层级（Rig Hierarchy）** 中拖动元素来重新组织结构。

-   将一个元素拖到另一个元素上，会使前者成为子节点，后者成为父节点。
-   将一个元素拖到空区域会取消父子关系。
-   按 **Shift+P** 也会取消所选元素的父子关系。

![控制点拖放重设父子关系](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b1c3b0e-3ef7-4372-a858-ae96f8bb2eb6/reparenting.gif)

## 控制点

**控制点（Controls）** 是实现控制绑定交互的主要元素。它们用于驱动骨骼链，在 **Sequencer** 中制作动画，并提供更多自定义属性。你还可以让控制点以使用自定义的[形状和颜色](/documentation/zh-cn/unreal-engine/control-shapes-and-control-shape-library-in-unreal-engine)、属性类型和变换限值。

### 创建上下文

当你为于某个骨骼创建控制点时，控制点会自动继承该骨骼的名称，并添加 `_ctrl` 作为后缀。

![创建控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e96d58a9-0d9c-4c74-9bc7-35798db77560/controlcreation1.gif)

#### 创建多个控制点

除了一般创建方法之外，你还可以在选中多个骨骼时，使用提供的[Python脚本](/documentation/zh-cn/unreal-engine/control-rig-python-scripting-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E5%90%AF%E5%8A%A8)创建控制点。在[Rig层级](/documentation/zh-cn/unreal-engine/control-rig-editor-in-unreal-engine#%E7%BB%91%E5%AE%9A%E5%B1%82%E7%BA%A7)中，选择多个骨骼，然后右键点击，选择 **新建（New）> 为所选内容添加控制点（Add Controls For Selected）** 。这将为所有所选骨骼创建控制点，使用后缀 `_ctrl` 匹配其名称，并匹配层级结构。

![为所选内容添加控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3b7ae86-7011-4caf-99cf-bf360ad784f2/addcontrolsselected.gif)

你可以按住 **Alt** 并点击 **新建（New）> 为所选内容添加控制点（Add Controls For Selected）** 来自定义此创建方法。这会打开对话框窗口，你可以在其中自定义以下设置：

![为所选内容添加控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/542e3e03-9353-4746-875d-6ed16032aae2/addcontrols2.png)

名称

说明

**输出格式（Output Format）**

在创建控制点之后如何编排。你可以选择以下选项：

-   **层级（Hierarchy）** ：复制与所选骨骼相同的层级，并取消最顶层的控制点与骨骼层级的父子关系。
-   **列表（List）** ：将所有创建的控制点取消父子关系，使其作为平面列表显示在绑定层级的根节点。
-   **子节点（Child）** ：将所有创建的控制点放在关联的骨骼下面作为子节点。

**后缀（Suffix）**

要在控制点名称后应用的文本，该名称是从骨骼名称复制的。

**前缀（Prefix）**

要在控制点名称前应用的文本，该名称是从骨骼名称复制的。

### 控制点和值类型

你可以为控制点指定各种控制点类型，这些类型会指定替代属性或限制性更强的属性。如果你想要创建基于属性的控制、代理控制或者回馈控制，该设置十分有用。

你可以在"细节（Details）"面板中点击所选控制点的 **控制点类型（Control Type）** 下拉菜单来指定控制点的类型。可以选择以下控制点类型：

![控制点类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4142a2e6-eed3-4f45-bfd1-72266458b5cf/controltype1.png)

控制点类型

描述

**动画控制（Animation Control）**

默认控制点类型，提供普通的可视动画控制。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17409c1e-49dc-4267-a388-e40827fa93e0/controltype2.png)

**动画通道（Animation Channel）**

用于提供动画通道或者自定义属性的控制点。如果启用了 **通道组（Group Channel）**，那么该属性可以在父级控制点上访问，和其它属性一起加入动画。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e99cfa82-e93d-42bb-90fe-2c1045e8385e/controltype3.png)

**代理控制（Proxy Control）**

代理控制点能够以 **驱动/被驱动** 的关系链接到其它控制点。这通过在 **驱动的控制点（Driven Controls）** 数组中添加要驱动的控制点来完成。代理控制点不能直接添加动画，但是你可以通过 **Get Driven** 和 **Set Driven** 节点来整体驱动其它控制点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38db8fd2-658b-45cf-bb84-76a51d79f367/controltype4.png)

**Visual Cue**

 

除了动画类型以外，你还可以调整 **数值类型（Value Type）**，从而设置控制点的输出数据。从 **数值类型（Value Type）** 下拉菜单中，可以设置以下类型：

名称

说明

**布尔（Bool）**

将控制点设置为 **布尔类型** ，这样你可以在动画中设置 **True / False** 状态。布尔类型的控制点在 **视口（Viewport）** 中不可见。

![控制点类型布尔](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4f423ce-035d-444c-86ca-40478d836e19/typebool.png)

**浮点（Float）**

将控制点设置为 **浮点类型**，这样你可以沿某根位置轴移动控制点。如果 **动画类型（Animation Type）** 设为 **动画控制点（Animation Control）**，那么你可以指定使用的轴，从 **主要轴（Primary Axis）** 属性中进行选择。使用此类型时，控制点可以移动的范围[默认限制](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%8F%98%E6%8D%A2%E9%99%90%E5%80%BC)在 **0 - 100** 之间。如果你想创建滑块型控制点，浮点会很有用。

![控制点类型浮点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff9d9c76-d3c7-4ac6-b50d-b65fa3310435/typefloat.png)

**整型（Integer）**

将控制点设置为 **整型类型**，这样你可以沿某根位置轴移动控制点，以1为增量。 如果 **动画类型（Animation Type）** 设为 **动画控制点（Animation Control）**，那么你可以指定使用的轴，从 **主要轴（Primary Axis）** 属性中进行选择。使用此类型时，控制点可以移动的范围[默认限制](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%8F%98%E6%8D%A2%E9%99%90%E5%80%BC)在 **0 - 100** 之间。你还可以在 **控制点枚举（Control Enum）** 属性中引用 **枚举（Enumeration）**，将此控制点类型转换为枚举。

![控制点类型整型枚举](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bf42196-4649-45c8-bcd4-ae8ffa8ef832/typeint.png)

**向量2D（Vector 2D）**

将控制点设置为 **向量2D类型**，这样你可以沿两根位置轴移动控制点。如果 **动画类型（Animation Type）** 设为 **动画控制点（Animation Control）**，那么 **主要轴（Primary Axis）** 属性中指定的轴会被排除，而使用剩余的轴来定义2D平面。使用此类型时，控制点可以沿两个轴移动的范围[默认限制](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%8F%98%E6%8D%A2%E9%99%90%E5%80%BC)在 **0 - 100** 之间。

![控制点类型向量2D](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d8186fe-ca4c-429e-83c9-2bf8157fe95b/type2d.png)

**位置（Position）**

将控制点设置为 **位置类型**，你只能调整控制点的位置。

![控制点类型位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d248c5cb-13c3-4b29-961c-9bcf10475b17/typeposition.png)

**缩放（Scale）**

将控制点设置为 **缩放类型**，你只能调整控制点的缩放比例。

![控制点类型缩放](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e3d95402-1a80-412e-bc51-5f6e2864e2ec/typescale.png)

**旋转（Rotator）**

将控制点设置为 **旋转类型**，你只能调整控制点的旋转角度。

![控制点类型旋转体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71618357-1d19-4a13-8eb2-ee770ee04cb0/typerotator.png)

**欧拉变换（Euler Transform）**

将控制点设置为 **变换类型**，你可以自由调整控制点的所有平移、旋转和缩放。这是默认类型。

![控制点类型欧拉变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9343f09b-c9d1-4ab6-a918-489b3340e7ef/typetransform.png)

对于空间类控制点，例如 **欧拉变换（Euler Transform）** 、 **旋转（Rotator）** 、 **缩放（Scale）** 和 **位置（Position）** ，在"细节（Details）"面板中查看 **变换（Transform）** 属性时，会显示一些额外的变换功能：

![控制点变换按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d03cf5a-931d-4c2f-933e-59cf343a2c21/spatialbuttons.png)

1.  **旋转（Rotation）** 下拉菜单可用于选择不同旋转插值模式，如 **欧拉（Euler）** 、 **四元数（Quaternion）** 或 **轴和角度（Axis and Angle）** 。
2.  **本地/世界空间（Local /World Space）** 按钮将在本地和世界空间之间交换所显示的轴信息。按住Shift键并点击将更改所有三个轴。
3.  锁定 **缩放（Scale）**，这会导致在更改缩放时，在每个方向均匀地缩放。

### 变换限值

你可以为空间类控制点指定限定范围，使其只在特定范围内移动。如果你想创建基于滑块或2D的控制点并限制其移动范围，这会很有用。

要为控制点设置限值，请定义其范围最小值和最大值。你可以在 **细节（Details）** 面板中的 **变换（Transform）** 类别下点击 **最小值（Min）** 或 **最大值（Max）** ，找到相关属性。

![控制点限值最小值最大值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d53c1401-ea5f-4de6-92a7-517d1e91a655/limits1.png)

启用任意一个轴通道，以便启用该值的限值，在旁边的区域中定义数值。在本示例中，最小值设为 - **50** ，最大值设为 **50** 。若现在操控控制点，它将在该范围内移动。

![控制点限值最小值最大值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73553515-b1e1-4300-8c13-d9e7cc3429ad/limits2.gif)

启用 **绘制限值（Draw Limits）** ，查看视口中所有控制点的限值。

![绘制限值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c4c1946-5f28-42bb-b51d-6a60f006e32e/limits3.png)

## 骨骼

除了骨架中已有的骨骼，你还可以在控制绑定中新建骨骼。这些骨骼可用于辅助用途，或为特定操作提供额外的骨骼（例如在IK链中创建结束执行器），或以合并方式使"虚拟"骨骼控制点成为"真实"的骨骼。

在控制绑定编辑器中创建的骨骼，其层级图标显示为中空，以便区别于一般骨骼网格体骨骼。

创建新骨骼后，你可以进入 **设置事件（Setup Event）** 模式，在视口中移动它，这样就可以在视口中编辑元素的 **初始姿势（Initial Pose）** 。在工具栏中，点击[解算方向](/documentation/zh-cn/unreal-engine/control-rig-forwards-solve-and-backwards-solve-in-unreal-engine)下拉菜单并选择 **设置事件（Setup Event）** 。

![设置事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed86e64d-044c-4833-bf06-42386e1a023a/setupevent.png)

启用 **设置事件（Setup Event）** 后，你可以在视口中移动骨骼。

![设置事件骨骼操控](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10068407-daf0-445c-8c66-6577248e5167/setuptoe.gif)

默认情况下，只有所选骨骼会显示在视口中。要更改此视图模式，请在视口工具栏中点击 **角色（Character）> 骨骼（Bones）** ，然后选择所需的骨骼绘制设置。

![骨骼显示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a758128-fcb8-46bc-a3b7-dbdd52f8e56f/bonedisplay.png)

### 工作流程示例

在此示例中，控制绑定中创建的骨骼用作手指IK链的结束执行器。

![骨骼控制点示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef5428c7-db64-44aa-924d-2252b8d558f4/fingerik.gif)

## Null

**Null** 是一种容器元素，能以任意方式收集、分组和变换其他绑定元素。在经典的人体模型控制绑定设置中，它们能将对称控制点（例如腿部和手臂）分组，以便镜像这些控制点。Null这个概念类似于Autodesk Maya中的 **组（Groups）** ，旨在管理骨骼绑定的结构。

![新建Null](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4d70f40-97d3-4c8a-8844-152dcbd56645/null.png)

默认情况下，Null在视口中不可见。要查看Null，你可以在视口工具栏启用 **显示Null（Display Nulls）** 。

![显示Null](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ef18167-5580-4898-a6be-b9eed05c12ad/nulldisplay1.png)

类似于骨骼，在[解算方向](/documentation/zh-cn/unreal-engine/control-rig-forwards-solve-and-backwards-solve-in-unreal-engine)下拉菜单中启用 **设置事件（Setup Event）** 后可以编辑Null。启用 **设置事件（Setup Event）** 后，你可以在视口中移动Null。

![设置事件Null移动](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/750d6724-7e66-4611-b493-f6ee4c08b008/null2.gif)

启用 **设置事件（Setup Event）** 还会在视口中的所有Null上启用可视性。

### 工作流程示例

在此示例中，Null用于将左右两侧肢体的控制点分别进行分组。这能让组织、镜像操作和其他操控更轻松。

![Null分组对称控制点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c03a154-a619-4b5a-88d5-a22aa532689b/null3.gif)

## 变换类型

绑定元素的位置、旋转和缩放由多种变换源决定，这些源名为 **初始（Initial）** 、 **当前（Current）** 和 **偏移（Offset）** 。这些变换类型各自在控制绑定的不同执行阶段对绑定元素执行变换。你可以在选中的绑定元素的细节面板中查看这些类型。

![初始当前偏移变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb0963c1-808a-4af1-9804-448ea0a15448/valuetypes1.png)

为控制点指定不同的[控制点类型](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E6%8E%A7%E5%88%B6%E7%82%B9%E7%B1%BB%E5%9E%8B)时，你只能指定 **初始（Initial）** 和 **当前值（Current Values）** 。

![初始当前值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf75b307-815c-4e17-8455-91a65fd12dd4/valuetypes2.png)

按住 **Shift** 键并点击不同类型，将在"细节（Details）"面板中并排显示它们。

![多个类型显示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ecc27c45-1b7b-42df-859c-231dbbfbf82d/shifttypes.png)

### 初始

**初始（Initial）** 是绑定图表中控制绑定逻辑执行前元素的起始值。它还将指定其操作范围内绑定元素的默认值，并将影响 **当前（Current）** 的默认值。

要编辑初始值，你可以从"细节（Details）"面板编辑，或者启用[设置事件](/documentation/zh-cn/unreal-engine/control-rig-forwards-solve-and-backwards-solve-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E4%BA%8B%E4%BB%B6)并在视口中操控该元素（如果它有变换）。

![初始变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/909720f2-2aed-49d4-992b-b7ddbb1d830d/initial.png)

### 当前

**当前（Current）** 是在 **正向解算（Forwards Solve）** 模式中操作时的元素值。它旨在作为控制点的实时实际变换，并且操控视口中的控制点将编辑当前姿势。在控制绑定编辑器中，当前姿势是临时的，可以通过重新编译或重新打开资产来重置。

![当前变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b4de4d6-96f4-47ae-943e-c139c5f0a889/current.png)

在Sequencer中对控制绑定制作动画时，你会对当前值制作动画。

### 偏移变换

**偏移（Offset）** 仅对 **控制点类型（Control Type）** 设置为 **欧拉变换（Euler Transform）** 的控制点显示。它用于在空间上偏移控制点，而不更改初始值或当前值，并提供更改控制点的"零位置"的能力。在Autodesk Maya等其他操控工具中，偏移类似于 **冻结变换（Freeze Transformations）** 或 **变换偏移父矩阵（Transform Offset Parent Matrix）** 。

![偏移变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/685bca59-4197-49fc-bde1-fa860e6c715d/offset.png)

如果你要从指定了偏移的控制点输出变换值，生成的变换将组合 **偏移（Offset）** 和 **当前（Current）** ，用于其最终计算的变换。若要更改，你可以将 **空间（Space）** 属性设置为 **本地空间（Local Space）** ，这样它会仅输出 **当前（Current）** 。

![变换引脚](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e93931bf-a201-43f6-93f7-a65db20492d3/offset2.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [bone](https://dev.epicgames.com/community/search?query=bone)
-   [null](https://dev.epicgames.com/community/search?query=null)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [元素介绍](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%85%83%E7%B4%A0%E4%BB%8B%E7%BB%8D)
-   [组织](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E7%BB%84%E7%BB%87)
-   [控制点](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E6%8E%A7%E5%88%B6%E7%82%B9)
-   [创建上下文](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%88%9B%E5%BB%BA%E4%B8%8A%E4%B8%8B%E6%96%87)
-   [创建多个控制点](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%A4%9A%E4%B8%AA%E6%8E%A7%E5%88%B6%E7%82%B9)
-   [控制点和值类型](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E6%8E%A7%E5%88%B6%E7%82%B9%E5%92%8C%E5%80%BC%E7%B1%BB%E5%9E%8B)
-   [变换限值](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%8F%98%E6%8D%A2%E9%99%90%E5%80%BC)
-   [骨骼](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E9%AA%A8%E9%AA%BC)
-   [工作流程示例](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E7%A4%BA%E4%BE%8B)
-   [Null](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#null)
-   [工作流程示例](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E7%A4%BA%E4%BE%8B-2)
-   [变换类型](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%8F%98%E6%8D%A2%E7%B1%BB%E5%9E%8B)
-   [初始](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%88%9D%E5%A7%8B)
-   [当前](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%BD%93%E5%89%8D)
-   [偏移变换](/documentation/zh-cn/unreal-engine/controls-bones-and-nulls-in-control-rig-in-unreal-engine#%E5%81%8F%E7%A7%BB%E5%8F%98%E6%8D%A2)