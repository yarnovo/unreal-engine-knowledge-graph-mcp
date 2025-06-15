# 虚幻引擎中的可脚本化工具系统。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:35:21.579Z

---

目录

![可脚本化工具系统](https://dev.epicgames.com/community/api/documentation/image/c413553a-9ebb-4d86-8930-0ed9e9aae152?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**可脚本化工具** 系统提供用于创建自定义互动式工具的函数和编辑器模式。该系统旨在让非C++程序员能够在虚幻引擎中编译交互式工具。

交互式工具的主要参考标准是[建模编辑器模式](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine)。但可脚本化工具系统与建模模式或几何体脚本编写没有直接联系。

可脚本化工具系统插件可将 **交互式工具框架（Interactive Tools Framework）** 公开给[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)（BP），让创作者和技术美术师可以设计出作用类似于建模模式的工具。

建议先了解蓝图的基础知识，然后再开始使用可脚本化工具。如需更多信息，请参阅[蓝图简介](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine)。

通过创建基类的蓝图（BP）子类，你可以将自定义的工具添加到 **可脚本化工具** 编辑器模式中。美术师可使用编辑器模式快速访问项目的自定义工具。

## 可脚本化工具的用途

可脚本化工具的用途如下：

-   在工具设置和关闭以及在函数更新时，运行任意蓝图（BP）图表。
-   绘制基本的3D几何体（例如线和点）以及2D HUD几何体（例如3D投影位置的文本）。
-   将属性集添加到工具中，通过蓝图定义，作为对用户可见的工具设置项。
-   监听并响应这些属性集参数的变化。
-   创建一个或多个3D小工具，控制它们的位置并响应变换变化。
-   向用户提供反馈信息。
-   添加输入设备行为，如鼠标点击、鼠标悬停和键盘监视器，并在发生关键事件时运行蓝图图表。
-   与[蓝图Slate控件](/documentation/zh-cn/unreal-engine/creating-user-interfaces-with-umg-and-slate-in-unreal-engine)（UMG）相集成，以提供作为视口控件的自定义用户界面（UI）。
-   根据选择的当前场景自定义工具的启动条件。

你可以将可脚本化工具与引擎的其他功能搭配使用，如[程序化内容生成](/documentation/zh-cn/unreal-engine/procedural-content-generation--framework-in-unreal-engine)（PCG）和[动态设计](/documentation/zh-cn/unreal-engine/motion-design-in-unreal-engine)等。

关于该系统的概述以及开发者该如何用它和其他功能构建地下城，请观看视频[几何体脚本编写与可脚本化工具 | Unreal Fest 2024](https://youtu.be/gNKVGbwfX4c?feature=shared)。

## 访问可脚本化工具编辑器模式和节点

### 启用插件

要使用可脚本化工具的编辑器模式并访问节点，你必须先启用相关插件。

要启用该插件或验证插件是否已启用，请按照以下步骤操作：

1.  在 **菜单栏**中，选择编辑（Edit） > 插件（Plugins）。
    
2.  在 **搜索栏** 中输入"scriptable tools"。
    
3.  启用 **可脚本化工具编辑器模式（Scriptable Tools Editor Mode）** 插件，并在弹出的对话框中选择 **是（Yes）**。
    

你无需启用可脚本化工具框架模块。编辑器模式会自动将其包含在内。

![可脚本化工具插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cf48366-641c-43f7-9378-26790c0880c0/scriptable-tool-plugin.png)

### 编辑器模式

你可以通过 **可脚本化工具** 编辑器模式访问所有可脚本化工具。在关卡编辑器中点击 **选择模式（Selection Mode）** 下拉菜单即可打开该编辑器模式。

![可脚本化工具编辑器模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28d351c2-5af4-4efa-b4a2-ba7f0b0a7b60/scriptable-tool-mode-ui.png)

在该编辑器模式下，所有工具都显示在自动管理的工具控制板中，而活动工具的属性集则显示在标准编辑器模式的设置面板中。如需详细了解各种编辑器模式，请参阅[关卡编辑器模式](/documentation/zh-cn/unreal-engine/level-editor-modes-in-unreal-engine)。

工具控制板提供过滤选项，可根据群组标签显示工具。该功能可对工具进行分组，并选择在编辑器模式下加载的工具组。分组有助于组织包含大量工具的项目，从而减轻查看所有工具的认知负担。

![可脚本化工具过滤标签](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0d58211-4eb2-4e8b-89e1-58924e155848/scriptable-tools-filter-tags.png)

### 蓝图节点

要创建在编辑器模式下显示的工具，你可以使用蓝图中公开的可脚本化工具函数。你可以使用蓝图类（Blueprint Class）或编辑器工具蓝图（Editor Utility Blueprint）来访问可脚本化工具的基类。如需详细了解各基类和子类，请参阅本页面的[可脚本化工具类](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%8F%AF%E8%84%9A%E6%9C%AC%E5%8C%96%E5%B7%A5%E5%85%B7%E7%B1%BB)小节。

在蓝图编辑器中，所有可脚本化工具的节点都位于可脚本化工具（Scriptable Tool）子菜单中。

![可脚本化工具子菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/256dd05d-793e-4e0d-b4ec-1a1886525d88/scriptable-tools-input-behaviors.png)

蓝图编辑器中的可脚本化工具子菜单。

完整的函数列表见[蓝图](/documentation/zh-cb/unreal-engine/BlueprintAPI/ScriptableTool)和[Python](/documentation/en-us/unreal-engine/python-api/class/ScriptableInteractiveTool?application_version=5.5)API文档。

## 可脚本化工具和编辑器工具控件的差别

编辑器工具控件（EUW）是一个非模态对话框窗口，包含通过可视化GUI编译器编译的自定义UI，你可以在其中执行任何类型的编辑器脚本处理。这是一个非常强大的工具，但作为非模态对话框，它存在各种限制。

交互式工具（可脚本化工具的基础）是 **模态** 的。这意味着当该工具激活时，其他工具都不能激活，并且编辑器状态受到更严格的管理。例如，该工具会在保存、更改关卡或启动在编辑器中运行（PIE）之前自动关闭，并且自动保存会推迟到你退出该工具之后。该功能意味着很多事情用工具做要比其他方式更安全。例如，如果你在关卡中创建了临时Actor，并在工具关闭时将其销毁，那么临时Actor就不会被意外保存。

同样，作为模态状态，工具可以更有效地捕获鼠标的动作。

在UI方面，可脚本化工具比EUW更加结构化。你可以将属性集定义为具有公共变量的单独蓝图对象。然后，这些公共变量将显示在标准的编辑器模式设置面板中。

可脚本化工具在运行时也可用，但必须设置好一些额外的架构才能在虚幻引擎项目中加以使用。

此外，可脚本化工具为发现和访问项目中的所有工具提供了更集中的位置，而EUW则主要通过内容浏览器进行访问，将它们的易找性和组织工作转嫁给了用户。

## 可脚本化工具的类

`UScriptableInteractiveTool` 是所有可脚本化工具的基类。它还包括各种子类，如事件、工具名称等常规设置、渲染选项、小工具、消息、工具关闭选项等。你可以使用它的编辑器变体 `UEditorScriptableInteractiveTool` 来访问只适用于编辑器的蓝图函数。

`UScriptableModularBehaviorTool` 和 `UEditorScriptableModularBehaviorTool` 则是支持工具内鼠标和键盘交互的子类。这两类是常用类，除非你不需要鼠标和键盘行为。

![可脚本化工具的类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffa6785e-544e-4bae-8bd3-ede3ac03fbdc/scriptable-tools-classes.png)

`UScriptableClickDragTool` 已被废弃。但在之前通过该类创建的工具仍可在最新版本的编辑器中使用。

创建蓝图类或工具控件蓝图时，必须选择上述类之一才能访问可脚本化工具的节点。如需详细了解这些类，请参阅本页的[模块化基础工具](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E6%A8%A1%E5%9D%97%E5%8C%96%E5%9F%BA%E7%A1%80%E5%B7%A5%E5%85%B7)小节。

### 可脚本化工具设置

基类将公开各种设置，主要用于可脚本化工具编辑器模式UI，也可控制工具行为。打开蓝图时，工具的细节（Details）面板包含以下选项。

![可脚本化工具设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fc21c3b-9d32-42c8-a033-1b4d43047a8f/scriptable-tool-settings.png)

节点

说明

**工具名称（Tool Name）**

工具简称。这是编辑模式中当前在工具图标下显示的内容。

**长名称（Long Name）**

显示在其他地方，例如工具完成按钮旁边。

**类别（Category）**

确定工具将放置在哪个工具控制板分段中。

**提示文本（Tooltip）**

图标悬停文本，可以提供有关该工具含义的信息。

**自定义图标路径（Custom Icon Path）**

链接到显示工具图标的图像格式路径（.png 或 .sv）。

**在编辑器中可见（Visible in Editor）**

确定是否在编辑器模式的UI中显示此工具类。这对于隐藏正在开发的工具或计划子类化的工具BP基础案例很有用。

**关闭类型（Shutdown Type）**

确定该工具的确认面板中的选项是 **接受/取消**，还是 **完成**。此选项会影响工具的功能。

**工具启动要求（Tool Startup Requirements）**

决定工具的启动条件。

包括以下选项：

-   **无（None）** ：工具可在任何条件下启动。
-   **ToolTarget** ：工具与当前选择的一组工具目标接口相匹配。点击工具编译器类（Tool Builder Class）中的+图标即可添加蓝图条件。你可以设置与建模工具类似的目标要求，如静态网格体和动态网格体。
-   **自定义（Custom）** ：用户提供一个UCustomScriptableToolBuilder实例来决定是否满足条件。点击 **工具编译器类（Tool Builder Class）** 中的 **+** 图标即可添加蓝图条件。

**群组标签（Group Tags）**

列出工具所属群组的所有群组标签。由相应模式使用，用于筛选哪些工具应由该模式加载并供用户运行。

### 可脚本化工具事件

可脚本化工具类提供了一组标准事件，以便工具在不同时间执行不同的操作。每个工具类都有其标准事件，并且在基础工具（Base tools）中提供了各种附加函数。

-   **脚本设置事件（Event On Script Setup）** ：在工具启动时运行一次。通常发生在你添加属性集、创建预览对象等活动的时候。
    
-   **脚本函数更新事件（Event On Script Tick）** ：每次编辑器函数更新时运行，就像其他函数更新一样。
    
-   **脚本关闭事件（Event On Script Shutdown）** ：在工具关闭时运行。例如，当用户明确关闭该工具时，该模式强制其关闭，或者该工具自行关闭
    
-   **脚本绘制HUD事件（Event On Script Draw HUD）** ：每帧运行，并且工具可以从 **HUD API** 对象绘制2D HUD。如需更多信息，请参阅下面的小节。
    

![可脚本化工具事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33096f2b-7c40-427d-be0d-f842f6dd112f/scriptable-tool-events.png)

**脚本渲染事件（Event On Script Render）** 是一种旧版绘制方法。该事件每帧运行，并允许工具绘制简单的3D几何体，如线条和点。你可以使用旧版功能，但需注意：

-   事件是实时的，因此每当渲染被调用时，都会重新绘制线条。
    
-   没有对几何体的持久引用，因此你必须在蓝图中管理图元的操作。
    

### 自定义条件

你可以根据当前场景选择来添加启动工具的自定义条件。要自定义条件，请前往 **类默认设置（Class Defaults） > 细节面板（Details panel） > 可脚本化工具设置（Scriptable Tool Settings） > 工具设置要求（Tool Setup Requirements） > 自定义（Custom）**。

自定义被包含以下函数：

-   **OnCanBuildTool**：需要在函数更新时运行。
    
-   **OnSetupTool**：在用户点击后，工具运行前运行。
    

每当函数更新时，工具编译器图表都会运行，因此复杂条件可能会拖慢编辑器。

### 工具渲染

要在工具中提供视觉反馈是很常见的需求。定义此类反馈的方法之一是生成临时Actor来完成。例如，使用由几何体脚本程序化生成的网格体生成临时动态网格体Actor。然而，通常线条或文本标签会更有效。

可校本化工具通过提供具有一组 `Ufunction` 节点的API对象来支持这种渲染。

#### 渲染选项

![可脚本化工具渲染选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff65da76-0998-4ebe-b48d-7b3f92974480/scriptable-tools-render-options.png)

可脚本化工具的 **绘制（Drawing）** API包含用于线条、点和三角形的渲染选项组。每组的绘制（Drawing）类别中还包含额外的相关选项。

这些绘制选项由工具分配，包含几何体。有了这些选项组，你就可以在工具生命周期的任意时间点分别添加和移除几何体，并根据需要更新它们。

**添加三角形组（Add Triangle Set）** 节点包含四边形选项。

![可脚本化工具四边形绘制选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7630ce9c-fce6-4c81-ae04-be53cbd708d8/scriptable-tools-quad-render-options.png)

#### 旧版选项

你需要在 **Event On Script Render** 事件节点中执行旧版渲染命令。

正如前文所说，该事件：

-   可以使用渲染API重载。
    
-   可绘制线条和点。
    
-   在函数更新时运行，并在下一次更新时结束。
    
-   不持久。
    

2D绘制HUD和3D渲染事件分别通过 `DrawHUDAPI` 和 `RenderAPI` 对象调用。该工具在内部创建并管理这些API对象。你只能通过这些事件访问API对象，因为它们依赖工具提供的每帧临时状态信息。

BP中还有一个标准的调试绘制（Debug Draw）函数库。它们可以被用作DrawHUD和Render函数的替代方案，并且可以随时调用。但是，这些函数仅用于开发，工具Render API最终将提供更多功能。\_

### 小工具

可脚本化工具基类的另一个功能是能够创建多个3D变换小工具。这控件不是标准编辑器小工具，更接近[建模模式的小工具](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)。系统提供了一组函数来开发和管理小工具，以及一个事件来响应小工具变化。

小工具对象不会直接公开给蓝图。而是使用字符串 **标识符** 生成小工具，并通过该标识符运行各种小工具函数和事件。

![小工具节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cb98770-97b6-4148-9c17-c5b197898d51/gizmos.png)

节点

说明

**CreateTRSGizmo**

使用给定的 **标识符** 和 **小工具选项** 创建TRS（平移、旋转和缩放）小工具。如需关于选项更多信息，请参阅表格后的内容。

**DestoryTRSGizmo**

按名称销毁现有小工具。在工具上下文中创建的所有小工具都会在工具关闭时销毁。

**Get Gizmo Transform**

按名称获取小工具的当前变换。

**Set Gizmo Transform**

按名称更新小工具的当前变换。

**Set Gizmo Visible**

按名称隐藏或显示小工具。

**Event On Gizmo Transform Changed**

在激活的小工具发生变换时触发。使用标识符来辨别哪个小工具被修改。

基本TRS小工具结合了所有轴的平移、旋转和缩放元素。但是，你可以通过自定义 **小工具选项** ，为特定任务创建更简单的小工具。例如，通过禁用其他小工具子元素，仅启用XY平面中的平移和旋转。

![小工具选项节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e1168f6-c9fd-48f3-b551-78c760e5ae5e/gizmo-options-node.png)

### 工具消息

标准可脚本化工具BP API提供了用于向用户发送消息的各种函数。

-   **显示用户帮助消息（Display User Help Message）**：可更新编辑器UI底部的帮助字符串。
    
    ![显示用户帮助消息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74bb68cb-bab8-4113-a8d8-806b051773d2/display-user-help-message.png)
-   **显示用户警告消息（Display User Warning Message）**：可更新工具设置面板中的字符串。
    
    ![显示用户警告消息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82d77e3f-6bab-4138-84ff-b11b26727099/display-user-warning-message.png)
-   **清除用户消息（Clear User Messages）**：可用于清除当前的帮助或警告消息。
-   **添加日志消息（Add Log Message）**：当前将消息打印到编辑器的日志中。

上述消息是FText字符串，因此可本地化。当前只能显示单个警告，将来可能会有所改进。\_

### 杂项

可脚本化工具始终在当前世界的上下文中运行。例如，在关卡编辑器中，它是标准关卡世界。你可以使用 **Get Tool World** 函数在工具上下文中访问此世界。

### 工具关闭

退出可脚本化工具的标准流程是单击UI中显示的 **接受（Accept）**、**取消（Cancel）** 或 **完成（Complete）** 按钮。但是，你也可以通过 **Request tool Shutdown** 函数明确关闭可脚本化工具，工具也可以自行调用该函数。此函数采用仅与含接受/取消关闭选项，以及可选的用户弹出消息的的工具相关的 **bAccept** 标记。

## 工具属性集

可脚本化工具可以通过 **属性集** UObjects向用户公开UI控件，这些控件显示在标准工具设置面板中。目前无法在蓝图中自定义此UI，因此仅标准属性设置（类似于可以对Actor BP中的参数执行的操作）可用。

要创建属性集，首先要创建 **ScriptableInteractivetoolPropertySet** 类型的BP子类，如下所示。

![工具属性集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23dbe126-c28b-44e2-9dcc-20ec625f3e15/tool-property-sets.png)

然后，你可以打开属性集子类BP进行编辑，并添加公共成员变量。下面添加了布尔、整型和枚举类型。

![属性集变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69db03b9-9789-4b6a-834c-c72680fdc181/property-set-variables.png)

要在特定的可脚本化工具中创建属性集，请使用函数 **Add Property Set of Type**。该函数一般用于 **脚本设置事件（Event On Script Setup）**，但也可以在任何时候使用。

你必须为 **属性集类型（Property Set Type）** 参数选择正确的类类型，即选择你上面创建的BP子类的类型名称。此外，你必须为每个属性集设置唯一的 **标识符** （你可以在单个工具中组合多个属性集）。由于你稍后可能需要访问此属性集对象，因此我们建议将 **添加类型属性集（Add Property Set Of Type）** 的输出转换为你的BP子类类型，并将其存储在本地变量中。

![添加类型属性集脚本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81afb8bd-0186-488b-8ed7-e10bcb778bd0/add-propertyt-set-of-type-script.png)

当用户创建可脚本化工具的实例时，属性集的公共成员变量将显示在左侧的 **可脚本化工具（Scriptable Tools）** 设置面板中，位于工具控制板旁边。

![可脚本化工具设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ecb0c3f8-2c26-4b37-9a68-5fd57b5ef1fb/scriptable-tools-settings.png)

可脚本化工具类具有各种用于处理属性集的辅助函数。你可以使用 **按名称删除属性集（Remove Property Set by Name）** 来删除属性集，但请注意，大多数情况下没有必要这样做。如果你只是想根据某些标准或其他参数变化隐藏或显示属性集，请使用 **按名称将属性集设置为可见（Set Property Set Visible by Name）** 。

此外，你可以在工具关闭时使用 **保存属性集设置（Save Property Set Settings）** 存储属性集的当前值，而 **恢复属性集设置（Restore Property Set Settings）** 可以恢复在设置工具时保存的值。默认情况下，在任何工具中使用属性集类都会恢复相同的值。但是，可以提供可选的 **保存键（Save Key）** 来在不同的工具中或者甚至在同一个工具中保存或恢复不同的值。

![属性集节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e65a1690-212c-4c6d-a324-f6cd363be163/property-set-nodes.png)

### 属性监视器(w:800)

属性集的最常见用途可能就是响应属性值的变化。唯一完全可靠的解决方案是轮询更新函数中的值变化。但是，由于这是一种常见模式，因此可脚本化工具系统提供了工具属性监视器函数，可以自动执行这种轮询。

你可以在可脚本化工具中使用下面的函数监视属性集特定属性的变化，并在该值被修改时调用事件。

在BP中，目前无法从变量引用中自动检测UProperty类型。要设置检测，需要满足以下条件：

-   确保使用与属性集中的公共变量类型匹配的函数
-   传递正确的 **属性名称** （属性集中公共变量的名称）。

如果类型不是简单类型（Int、Float、Bool、String、FName、Enum或Object Property），请使用通用的 **监视属性（Watch Property）** 版本，但其回调事件更受限制。

![属性监视器节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d62edbe5-7222-4f47-9a5a-78aa3bc5ec73/property-watcher-nodes.png)

下面是 **Watch Enum Property** 函数的示例。这是简单类型中最复杂的，因为枚举类型未知。传递给回调事件的 **新值（New Value）** 参数是uint8，并且必须明确转换为正确的UEnum类型（在本例中为 **EGeometryScriptAxis** ）。目前无法在此进行错误检查。编辑器会将该函数将转换为任何枚举类型。

![监视枚举属性脚本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e563281c-44ff-48e0-aba2-bed6775b5900/watch-enum-property-script.png)

对于更复杂的参数（例如，像FVector成员变量一样的嵌套UStruct），你可以使用 **Watch Property** 函数。该函数几乎可以检测任何UProperty变量的变化。但是，回调事件不会像其他字段一样接收 **新值（New Value）** 参数。如果你在工具中为属性集创建了成员变量，则可以直接在事件中获取属性值。这种类型的监视器的计算开销也更高，因此只应在必要时使用。

![监视属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53735aae-f50b-4fa4-904f-e2eefbec3905/watch-property.png)

## 模块化基础工具

基础工具是可脚本化交互式工具框架的C++子类，提供额外的内置功能来处理常见情况和或公开其他功能，如输入设备处理和捕获。你可以基于想要创建的工具类型来选择基础工具。基础工具的编辑器版本可以访问仅限编辑器的BP函数。

**可脚本化模块化行为工具（Scriptable Modular Behavior Tool）** 类及其编辑器实例可以访问行为函数，后者由回调函数列表参数化。该系统取代了内置事件，提供了混合及匹配（甚至可能是复制）行为的方法。这次替换非常有帮助，因为你可以在一个工具中创建多个点击行为，从而触发不调条件。例如一个鼠标左键单击行为，一个鼠标单击行为，以及一个鼠标左键+Ctrl键行为。

公开的行为包括：

-   点击并拖曳
-   悬停
-   鼠标滚轮
-   多次点击
-   点击或拖曳
-   单键及多键键盘输入

![可脚本化工具输入行为](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7c2ad5b-32d0-4dd2-b304-5f9d3fdb3b82/scriptable-tools-input-behaviors.png)

可本化工具行为输入。

## 启用仅限编辑器插件

你可以在虚幻引擎中，为项目模块和插件定义插件依赖关系。

在`.uproject` and `.uplugin` 文件中，将 `TargetAllowList` 分段配置为 `Editor`。这些文件需要 `UScriptabletoolsFramework` 或 `UScriptabletoolsEditorMode` 才能在编辑器中使用。 如需详细了解插件和文件配置，请参阅[插件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine)。

```cpp
		{

			"Name": "ScriptabletoolsEditorMode",

			"Enabled": true,

			"TargetAllowList": [

				"Editor"

			]

		},	
```

## 后续步骤

在基本了解了可脚本化工具系统后，你可以阅读[创建可脚本化工具](/documentation/zh-cn/unreal-engine/creating-a-scriptable-tool-in-unreal-engine)教程，开始创建自己的工具。

[](/documentation/zh-cn/unreal-engine/creating-a-scriptable-tool-in-unreal-engine)

[![Creating a Scriptable Tool](images/static/document_list/empty_thumbnail.svg)](/documentation/zh-cn/unreal-engine/creating-a-scriptable-tool-in-unreal-engine)

[Creating a Scriptable Tool](/documentation/zh-cn/unreal-engine/creating-a-scriptable-tool-in-unreal-engine)

[A guide to using the Scriptable Tools system to create custom interactive tools.](/documentation/zh-cn/unreal-engine/creating-a-scriptable-tool-in-unreal-engine)

-   [modeling](https://dev.epicgames.com/community/search?query=modeling)
-   [geometry](https://dev.epicgames.com/community/search?query=geometry)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [custom tools](https://dev.epicgames.com/community/search?query=custom%20tools)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [可脚本化工具的用途](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%8F%AF%E8%84%9A%E6%9C%AC%E5%8C%96%E5%B7%A5%E5%85%B7%E7%9A%84%E7%94%A8%E9%80%94)
-   [访问可脚本化工具编辑器模式和节点](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%8F%AF%E8%84%9A%E6%9C%AC%E5%8C%96%E5%B7%A5%E5%85%B7%E7%BC%96%E8%BE%91%E5%99%A8%E6%A8%A1%E5%BC%8F%E5%92%8C%E8%8A%82%E7%82%B9)
-   [启用插件](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%8F%92%E4%BB%B6)
-   [编辑器模式](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E6%A8%A1%E5%BC%8F)
-   [蓝图节点](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E8%93%9D%E5%9B%BE%E8%8A%82%E7%82%B9)
-   [可脚本化工具和编辑器工具控件的差别](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%8F%AF%E8%84%9A%E6%9C%AC%E5%8C%96%E5%B7%A5%E5%85%B7%E5%92%8C%E7%BC%96%E8%BE%91%E5%99%A8%E5%B7%A5%E5%85%B7%E6%8E%A7%E4%BB%B6%E7%9A%84%E5%B7%AE%E5%88%AB)
-   [可脚本化工具的类](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%8F%AF%E8%84%9A%E6%9C%AC%E5%8C%96%E5%B7%A5%E5%85%B7%E7%9A%84%E7%B1%BB)
-   [可脚本化工具设置](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%8F%AF%E8%84%9A%E6%9C%AC%E5%8C%96%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)
-   [可脚本化工具事件](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%8F%AF%E8%84%9A%E6%9C%AC%E5%8C%96%E5%B7%A5%E5%85%B7%E4%BA%8B%E4%BB%B6)
-   [自定义条件](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9D%A1%E4%BB%B6)
-   [工具渲染](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%B8%B2%E6%9F%93)
-   [渲染选项](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E6%B8%B2%E6%9F%93%E9%80%89%E9%A1%B9)
-   [旧版选项](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E6%97%A7%E7%89%88%E9%80%89%E9%A1%B9)
-   [小工具](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%B0%8F%E5%B7%A5%E5%85%B7)
-   [工具消息](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%B6%88%E6%81%AF)
-   [杂项](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E6%9D%82%E9%A1%B9)
-   [工具关闭](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%B7%A5%E5%85%B7%E5%85%B3%E9%97%AD)
-   [工具属性集](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%B7%A5%E5%85%B7%E5%B1%9E%E6%80%A7%E9%9B%86)
-   [属性监视器(w:800)](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%B1%9E%E6%80%A7%E7%9B%91%E8%A7%86%E5%99%A8\(w:800\))
-   [模块化基础工具](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E6%A8%A1%E5%9D%97%E5%8C%96%E5%9F%BA%E7%A1%80%E5%B7%A5%E5%85%B7)
-   [启用仅限编辑器插件](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%90%AF%E7%94%A8%E4%BB%85%E9%99%90%E7%BC%96%E8%BE%91%E5%99%A8%E6%8F%92%E4%BB%B6)
-   [后续步骤](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine#%E5%90%8E%E7%BB%AD%E6%AD%A5%E9%AA%A4)

相关文档

[

几何体脚本编写简介

![几何体脚本编写简介](https://dev.epicgames.com/community/api/documentation/image/2347962d-283c-469d-be3f-b2aa62ad1657?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/introduction-to-geometry-scripting-in-unreal-engine)

[

建模模式入门指南

![建模模式入门指南](https://dev.epicgames.com/community/api/documentation/image/489f6edb-4469-4fd7-ab43-2a5eabecd191?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/getting-started-with-modeling-mode)

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)