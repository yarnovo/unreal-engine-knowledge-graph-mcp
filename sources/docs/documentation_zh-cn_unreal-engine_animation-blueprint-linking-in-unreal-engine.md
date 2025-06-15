# 虚幻引擎中的动画蓝图链接 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:04:43.533Z

---

目录

![动画蓝图链接](https://dev.epicgames.com/community/api/documentation/image/7fa1f586-63d0-4de8-99f3-c77c91b0caff?resizing_type=fill&width=1920&height=335)

随着你为角色创建的动画蓝图越来越复杂，有时你可能需要将某个动画蓝图的一些部分复用于另一个动画蓝图。实现此操作的方法多种多样，例如链接特定动画蓝图、链接动画层，或使用模板。

本文档概括介绍了将动画蓝图模块化的各种方法。

#### 先决条件

-   你已创建并了解[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)。

## 链接的动画图表

在动画蓝图中，你可以使用 **Linked Anim Graph** 节点引用另一个动画蓝图。

### 创建和概述

要创建此节点，请右键点击 **动画图表（Anim Graph）** ，并从 **链接的动画蓝图（Linked Anim Blueprints）** 类别选择 **链接的动画图表（Linked Anim Graph）** 。你还可以从此列表选择特定动画蓝图引用，以添加该节点并加以引用。

![创建链接的动画图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07f689f8-3858-43bc-bb0b-249964001397/linkedgraph1.png)

该节点包含 **细节（Details）** 面板中的以下属性。这些设置还将应用于 **Linked Anim Layer** 节点：

![链接的动画图表属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3cdde72-79f7-4d5e-958f-4d0a1c80dde4/linkedgraph2.png)

名称

说明

**实例类（Instance Class）**

要用于此链接的动画图表的动画蓝图类。

**从链接的实例接收通知（Receive Notifies from Linked Instances）**

[骨架动画通知](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine#skeletonnotifies)是否将由此链接的实例从其他链接的动画接收。这很适合用于将动画通知处理封装在一个链接的动画实例中，而播放可以在另一个实例中执行。

**将通知传播到链接的实例（Propagate Notifies to Linked Instances）**

骨架动画通知是否将从此链接的实例发送到其他链接的实例。**将通知传播到链接的实例（Propagate Notifies to Linked Instances）** 还必须在目标链接的动画实例上启用，才能成功传播通知。

双击Linked Anim Layer节点将打开链接的动画蓝图资产（如果已分配）。

### 输入姿势

使用链接的动画图表的一种方法是使用Input Pose节点显示动画输入。右键点击链接的蓝图的 **动画图表（Anim Graph）** 并从 **杂项（Misc.）** 类别选择 **输入姿势（Input Pose）** 以创建此节点。然后，你可以将此节点连接到动画节点。

![链接的动画图表输入姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5de8892-13f4-46a3-ad14-03dbbd4dec0c/linkedgraph3.png)

你可以选中输入节点并在 **细节（Details）** 面板中更改 **名称（Name）** 来重命名。

![重命名输入姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4ebd0ef-0c60-452d-87b6-938906b8666e/linkedgraph4.png)

你可以根据需要创建任意数量的输入姿势，它们全部会在Linked Anim Graph节点上显示为输入引脚。

![多个输入姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f69abfc-f364-4bf3-b14f-a3f2b4bea5ff/linkedgraph5.png)

### 输入变量

[变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine)还可以公开给链接的动画图表，过程类似于[将变量设为公共](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine#%E5%85%AC%E5%85%B1%E5%8F%98%E9%87%8F)的蓝图过程。选择变量并启用 **实例可编辑（Instance Editable）** 。这将在链接的动画图表上公开该变量。

![输入变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0eec2476-c784-46df-b4e1-faae2533e5e3/linkedgraph6.png)

## 链接的动画层

通过链接的动画图表，你将链接到特定动画蓝图。通过 **链接的动画层（Linked Anim Layers）** ，你将以更标准化的形式使用链接。链接的动画层要求你创建 **动画层接口（Animation Layer Interface）** ，其中定义了图表的预设动画层。然后，你可以创建主动画蓝图，其中包含这些不同层的主逻辑结构，然后为每个Gameplay差异因子创建不同的动画蓝图。

![链接的动画层示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa9d0f52-8196-4d80-b00f-1f58f62e3477/linking1.png)

在创建高度复杂的动画项目时，例如在其中添加新动画并进行更新的实时服务项目，你通常需要使用链接的动画层。这是因为工作流程所围绕的中心是，为特定Gameplay逻辑新建或删除动画蓝图。

你不必持续更新和管理单个动画蓝图，而可以将逻辑划分到这些层。这样一来就可以进行多用户合作，并节省内存，因为系统将加载正在链接和使用的相关动画蓝图。

你可以将动画蓝图分解为多个资产文件，以使用链接的动画层控制动画内存。包含链接的层的动画蓝图可以根据需要使用虚幻引擎的内存管理系统加载和卸载。因此，如果你想从内存删除已取消链接的动画蓝图，必须设置额外的流送逻辑。

### 动画层接口

要创建链接的动画层系统，必须创建动画层接口资产，你将在其中定义要在动画蓝图中使用的动画层。在 **内容浏览器（Content Browser）** 中，点击 **添加 (+)（Add (+)）** ，然后选择 **动画（Animation）> 动画接口（Animation Interface）** 。

![创建动画层接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4532020e-2f9e-47cd-b020-e80c6d362102/linking2.png)

打开资产以查看动画层接口编辑器。你与此资产交互的主要方式是添加 **动画层（Animation Layers）** ，具体做法是点击 **我的蓝图（My Blueprint）** 面板中的 **添加 (+)（Add (+)）** 。

![将层添加到接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42d8771e-a874-4506-8da3-7a513f0fa7d2/linking3.png)

在同一个非默认 **组** 名下的层会共享相同的动画实例。建议图层界面中，为图层设置一个新的/非默认的共享名称。

对于一些层，你可能还需要公开姿势和属性输入，因为这对于链接的动画结构而言可能很有必要，例如，此层要修改传入姿势。为此，请点击所选层的 **细节（Details）** 面板的 **输入（Inputs）** 分段上的 **添加 (+)（Add (+)）** 。你还可以在 **输入（Inputs）** 属性下添加属性输入。

![动画层接口输入姿势](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/994e0caa-89af-429d-87b2-acdc27929c48/linking4.png)

如需了解示例动画层设置，你可能需要创建一个包含 **全身（Full Body）** 、 **上半身（Upper Body）** 和 **IK** 层的通用系统。这些层为角色提供以下功能：

-   **全身（Full Body）** ：角色的总体基础移动和动画。
-   **上半身（Upper Body）** ：如果角色握持物品或武器，你可以使用包含此逻辑的层。
-   **IK** ：对角色的最终手臂或腿部调整。通常，这将是腿部IK来调整脚部位置，或手臂IK来确保双手正确握持武器。

在本例中，动画层接口可能如下所示：

![动画层接口示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/447fae84-a27b-412d-851f-9473fc495d5d/linking5.png)

动画层接口图表是只读的，仅用于预定义动画蓝图的共享动画层和输入的列表。

### 基础蓝图设置

使用链接的动画层时，你将构造一个"基础"动画蓝图，并将其分配给角色。此基础可能包含链接的动画层的一般结构，但不一定包含其中的逻辑或数据。

首先，你需要将动画层接口绑定到动画蓝图，方法是选择 **类设置（Class Settings）**，然后点击 **接口（Interfaces）** 分段中的 **添加（Add）** 下拉菜单。选择你的 **动画层接口（Animation Layer Interface）** 。

![分配动画层接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba1fcf07-e4c0-47f4-b62e-1d87c46ce806/linking6.png)

现在你将看到预定义层显示在蓝图的动画层（Animation Layers）分段中。将这些层拖入AnimGraph以构建基础逻辑。在此示例中，总体结构顺序为 **全身（Full Body）> 上半身（Upper Body）> IK** 。上半身和IK层都添加了姿势输入，以允许动画通过和修改。

![参考层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d44ad5e-ecff-4050-b588-396238e027fd/linking7.png)

根据你希望设置达到的复杂和模块化程度，你可以选择不在基础动画蓝图中创建特定逻辑。层可以保留为空和默认值，而真正的逻辑来自各种链接的动画蓝图。

![无层逻辑](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f76cfa5-18af-472c-bac8-9c2943d65680/linking8.png)

### 特定蓝图设置

接下来，你需要为角色上的某个动画蓝图状态创建特定逻辑。这需要你创建第二个动画蓝图，并且也将动画层接口绑定到该蓝图。

创建、打开并绑定接口到蓝图后，现在可以在每个链接的层中创建逻辑。继续之前的示例，此动画蓝图将处理配备武器的角色的总体动画和行为。层包含以下逻辑：

-   **上半身（Upper Body）** 包含一个 **Aim Offset** 节点，用于控制角色的武器瞄准行为，特定于该武器。
-   **IK** 包含一个 **IK Rig** 节点，用于控制角色的最终手部位置，特定于该武器。
-   **全身（Full Body）** 包含一个 **状态机（State Machine）** ，用于控制角色的一般移动，特定于该武器或移动集。

![特定动画蓝图逻辑](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66a89768-03ec-4c4d-9b99-9e0a6726f336/linking9.png)

通过这种方式，你会将武器的整个动画蓝图逻辑完全分隔到此蓝图，使不同用户能够处理这些蓝图。你可以根据需要创建任意数量的不同动画蓝图，根据上下文在其中使用不同的逻辑。

对于这些特定于逻辑的动画蓝图，你不需要重新创建基础蓝图中存在的相同动画图表逻辑。相反，你可以将基础蓝图视为"父"蓝图，用于在动画图表中维持该总体逻辑结构。你仅使用这些特定蓝图在每个链接的层中创建逻辑。

## 链接动画层

使用链接的动画层的最后一步是添加 **Link Anim Class Layers** 蓝图节点。你使用此节点将某个特定动画蓝图类的层绑定到动画层系统，使其内部层逻辑覆盖当前逻辑。

![link anim class layers节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82b9e972-2995-4541-8f5e-9f2711966f86/linking10.png)

-   **目标（Target）** 可供你连接骨骼网格体组件。
-   **位于类（In Class）** 可供你指定动画蓝图类。

继续之前的示例，创建 **Link Anim Class Layers** 节点，其中连接了角色网格体，并且 **位于类（In Class）** 输入设置为特定武器动画蓝图。在某些情况下，你可能还需要在层更改后播放[蒙太奇](/documentation/zh-cn/unreal-engine/animation-montage-in-unreal-engine)，以使用动画帮助过渡更改，例如"武器配备"动画。

![链接动画类层示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e4de18b-4a5f-41b2-9bcd-e8b1396743c3/linking11.png)

总结一下此示例：

-   武器Actor蓝图将存储武器动画蓝图层的引用。这意味着，与该特定武器相关的动画仅当游戏中激活该武器时才会加载。
-   然后，你可以为其他武器创建类似的逻辑和资产，例如步枪、弓或火箭发射器。每个武器将存储其关联的动画蓝图层的引用，因此在加载这些武器时仅会加载这些特定动画。

### 更多用例示例

下面显示了《堡垒之夜》上使用的链接的动画层用例。

![《堡垒之夜》示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2abf53fa-6861-4c65-ba9a-1254457b2dcd/fnexample.png)

在此示例中，有两个接口，一个用于武器，一个用于载具。你可以同时激活这两个接口。你还可能让实现其中某个接口的单个动画蓝图覆盖图表的多个点，例如武器覆盖 `WeaponUpperBody` 和 `WeaponAdditive` 。

下面是以上设置的一些可能情况：

-   开车时，载具层将覆盖角色的整个姿势。
-   作为乘客乘车时，载具将覆盖角色下半身的就座动画，而武器控制上半身。如果角色更改武器，新的武器动画蓝图将控制上半身，而下半身继续从载具播放。
-   武器可以覆盖上半身姿势，接着将与主图表中的下半身组合，然后将在全身姿势之上从武器播放自定义叠加动画，例如怠速噪声。

通过这种方式，武器可以覆盖主图表中的多个不同点。例如，将使用移动状态机，其中包含跳跃、坠落、着陆和飞索滑行之类的状态。不必为每个武器复制此状态机，因为状态机将驻留在主图表中，武器动画蓝图有一个可以针对每个状态覆盖的层。

如果武器不需要覆盖一些状态，则你不需要将任何内容连接到对应层中的输出姿势。此外，包含层的动画蓝图有自己的事件图表。因此，如果你需要处理特定载具的数据，可以将其保留在该载具动画蓝图的事件图表中。

## 动画蓝图模板

动画蓝图还可以创建为模板，它们是不引用特定骨架资产或动画的蓝图。这意味着，你可以通过更加模块化的方式复用动画蓝图逻辑。

要创建模板动画蓝图，请执行[常规动画蓝图创建过程](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine#animationblueprintcreation)，但不指定骨架，而是点击 **模板（Template）** ，然后点击 **创建（Create）** 。

![创建动画蓝图模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98096af3-b7ba-4136-903a-cdcd1c6786a1/template1.png)

### 模板用法

动画蓝图模板包含与常规动画蓝图中相同的[接口和编辑器](/documentation/zh-cn/unreal-engine/animation-blueprint-editor-in-unreal-engine)。但是，由于模板不对应于骨架，因此你无法直接引用与特定骨架相关的动画或资产。你可以改为将模板逻辑参数化，并公开另一个蓝图中设置的变量。

例如，你可以在AnimGraph中创建 **Sequence Player** 节点。通常，此节点用于直接播放动画序列，但你可以改为将 **序列（Sequence）** 属性公开为 **变量（Variable）** 。为此，请点击序列播放器的 **细节（Details）** 面板中的 **绑定（Bind）** 下拉菜单，然后选择 **公开为引脚（Expose As Pin）** 。

![创建模板序列播放器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d486a2f8-850c-4452-90d1-1a4193151fc5/template2.png)

接下来，右键点击序列播放器上新公开的 **引脚** ，并选择 **提升到变量（Promote to Variable）** ，以创建变量供动画序列播放。类似于公开链接的动画图表变量，你还必须[将此变量设为公共](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E8%BE%93%E5%85%A5%E5%8F%98%E9%87%8F)。

![提升到变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19120a0b-9ed2-4d16-bf66-4041ddd08368/template3.png)

在动画图表中引用动画蓝图模板的方式是右键点击图表，并从上下文菜单的 **链接的动画蓝图（Linked Anim Blueprints）** 选择模板。

![引用动画蓝图模板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c93c6ed1-d7d8-444d-8e5b-0278a4b3ec86/template4.png)

然后，你可以在此模板上设置公开的变量，以对应你的蓝图要求。

![设置模板变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8cd2c93b-96b9-42ce-a2c2-dcd72c4e9660/template5.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [链接的动画图表](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E9%93%BE%E6%8E%A5%E7%9A%84%E5%8A%A8%E7%94%BB%E5%9B%BE%E8%A1%A8)
-   [创建和概述](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E6%A6%82%E8%BF%B0)
-   [输入姿势](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E8%BE%93%E5%85%A5%E5%A7%BF%E5%8A%BF)
-   [输入变量](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E8%BE%93%E5%85%A5%E5%8F%98%E9%87%8F)
-   [链接的动画层](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E9%93%BE%E6%8E%A5%E7%9A%84%E5%8A%A8%E7%94%BB%E5%B1%82)
-   [动画层接口](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E5%8A%A8%E7%94%BB%E5%B1%82%E6%8E%A5%E5%8F%A3)
-   [基础蓝图设置](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E5%9F%BA%E7%A1%80%E8%93%9D%E5%9B%BE%E8%AE%BE%E7%BD%AE)
-   [特定蓝图设置](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E7%89%B9%E5%AE%9A%E8%93%9D%E5%9B%BE%E8%AE%BE%E7%BD%AE)
-   [链接动画层](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E9%93%BE%E6%8E%A5%E5%8A%A8%E7%94%BB%E5%B1%82)
-   [更多用例示例](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E7%94%A8%E4%BE%8B%E7%A4%BA%E4%BE%8B)
-   [动画蓝图模板](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE%E6%A8%A1%E6%9D%BF)
-   [模板用法](/documentation/zh-cn/unreal-engine/animation-blueprint-linking-in-unreal-engine#%E6%A8%A1%E6%9D%BF%E7%94%A8%E6%B3%95)