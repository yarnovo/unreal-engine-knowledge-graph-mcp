# 仅使用蓝图的示例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprints-only-example
> 
> 生成时间: 2025-06-14T19:46:22.589Z

---

目录

![仅使用蓝图](https://dev.epicgames.com/community/api/documentation/image/2239ca77-c367-4493-aa78-4328f2bce96b?resizing_type=fill&width=1920&height=335)

[蓝图类](/documentation/zh-cn/unreal-engine/blueprint-class-assets-in-unreal-engine)允许你使用 [蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine) 系统设置新类。[创建新蓝图类](/documentation/zh-cn/unreal-engine/creating-blueprint-classes-in-unreal-engine) 后，你可以添加组件，借助可视化脚本设置函数和其他Gameplay或设计行为，及设置类变量的默认值。仅使用蓝图设置的LightSwitch类名为**LightSwitch\_BPOnly**，我们将在下面对它进行说明。

## 类设置

我们在 **内容浏览器** 中创建了LightSwitch\_BPOnly类，并选择 **Actor** 作为父类。

向蓝图中添加组件的方法有两种——可在 **蓝图编辑器** 的[组件（Components）](/documentation/zh-cn/unreal-engine/components-window-in-unreal-engine)选项卡中添加（静态），或者在[图表编辑器](/documentation/zh-cn/unreal-engine/graph-editor-for-the-blueprints-visual-scripting-editor-in-unreal-engine)中通过可视化脚本添加（动态）。由于LightSwitch类将始终具有PointLightComponent和SphereComponent，我们在 **组件（Components）** 选项卡中静态地添加了这些组件。

使用 **组件（Components）** 选项卡添加PointLightComponent，将其命名为PointLight1，作为根组件，然后添加SphereComponent，将其命名为Sphere1，附着在PointLightComponent上。 在 **蓝图编辑器** 中添加到类上的组件具有淡蓝色图标，而从父类继承的组件则具有深蓝色图标。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcf81a1d-8c0e-4d91-a149-540b9a99ecc8/bp_only_componentlist.png)

在 **蓝图编辑器** 的 [蓝图编辑器"我的蓝图"面板](/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine) 选项卡中，你可以添加新的[变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine)、[函数](/documentation/zh-cn/unreal-engine/functions-in-unreal-engine)和[宏](/documentation/zh-cn/unreal-engine/macros-in-unreal-engine)。你还可以访问蓝图类中包含的所有[图表](/documentation/zh-cn/unreal-engine/graphs-in-unreal-engine) 。在图表中，[节点](/documentation/zh-cn/unreal-engine/nodes-in-unreal-engine)通过引线连接在一起，以创建可由类变量、游戏性事件、甚至Actor的周围环境驱动的设计时和游戏性功能。

使用 **我的蓝图（My Blueprint）** 选项卡将浮点变量 **DesiredIntensity** 添加到LightSwitch\_BPOnly类。**我的蓝图（My Blueprint）** 选项卡也会显示在 **"组件（Components）"窗口** 中添加的组件，这样，可在需要时在图表中访问它们。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51235d12-dcb5-4e90-9372-f5dce045752a/bp_only_myblueprint.png)

我们使用了两个图表来设置LightSwitch\_BPOnly类行为。第一个图表是 [构造脚本](/documentation/zh-cn/unreal-engine/construction-script-in-unreal-engine) 函数图表，它包含 **构造脚本（Construction Script）** 函数输入节点。当某个Actor被添加到关卡时，或某个现有Actor在关卡中被移动时，此事件将执行。在 LightSwitch\_BPOnly 类中，**构造脚本（Construction Script）** 事件与 **设置强度（Set Intensity）** 节点相连接，这样，当该Actor被添加到关卡中或在关卡中被移动时，**Point Light 1**（PointLightComponent）的强度会被设置为 **DesiredIntensity** 的数值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3271f2c0-7296-4ace-b99d-c535eb7567c1/bp_only_constructionscript.png)

在 LightSwitch\_BPOnly 类中设置的另一个图表是 [EventGraph](/documentation/en-us/unreal-engine/event-graph-in-unreal-engine)。在事件图表中，执行从 **OnComponentBeginOverlap** 和**OnComponentEndOverlap** 等事件开始。这些事件在关卡中的某些其他Actor与SphereComponent重叠或离开它时执行。两个事件都与 **切换可视性（Toggle Visibility）** 节点相连接，这样，当这些事件执行时，PointLightComponent的可视性将被切换。有关事件和使用图表的更多信息，请参阅 [事件](/documentation/zh-cn/unreal-engine/events-in-unreal-engine)、[EventGraph](/documentation/en-us/unreal-engine/event-graph-in-unreal-engine)和[图表编辑器](/documentation/zh-cn/unreal-engine/graph-editor-for-the-blueprints-visual-scripting-editor-in-unreal-engine)文档。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/916bfb05-33ec-47c5-86c9-9fe36e773444/bp_only_eventgraph.png)

如果找不到"切换可视性（Toggle Visibility）"，在 **右键单击** 菜单中取消选中"情境相关（Context Sensitive）"，或尝试在"查找节点（Find a Node）"菜单中搜索它。你也可以通过从点光源变量节点拖出引线，然后搜索"Toggle Visibility"的方法取得相同的结果。

如果找不到Sphere1的OnComponentEndOverlap，确保选中该球体变量，然后使用位于"事件（Event）"->"添加事件（Add Event）"中的"添加事件（Add Event）"，或者从 **右键单击** 菜单中依次转至"添加事件（Add Event）"->"碰撞（Collision）"->查看 **OnComponentBeginOverlap / OnComponentEndOverlap**（View **OnComponentBeginOverlap / OnComponentEndOverlap**）。

在 **DesiredIntensity** 变量的变量设置中，它被设置为 **可编辑（Editable）**，因此在 **蓝图编辑器** 的 **类默认值（Class Defaults）** 中它可见并且可被编辑。这也意味着可针对该类的每个实例修改该变量，以使每个Actor都可以拥有其自己的 **DesiredIntensity**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae2e65cb-2d89-4f42-9211-8b2745d12876/bp_only_defaults.png)

可以通过两种方法使用其他蓝图类扩展蓝图类——使用 **类查看器（Class Viewer）** 中类旁的下拉按钮创建新蓝图，或者，**右键单击** 蓝图并选择 **基于此蓝图创建新蓝图（Create New Blueprint Based on This）**。

LightSwitch\_BPOnly蓝图类位于 [内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine) 中，你可以将它从该位置拖到关卡中。它也位于 [类查看器](/documentation/zh-cn/unreal-engine/class-viewer-in-unreal-engine) 中。有关使用 **内容浏览器** 或 **类查看器（Class Viewer）** 在关卡中放置Actor的更多信息，请参阅 [放置Actor](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine) 文档。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [类设置](/documentation/zh-cn/unreal-engine/blueprints-only-example#%E7%B1%BB%E8%AE%BE%E7%BD%AE)