# 在虚幻引擎中自定义虚拟堪景 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:20:22.241Z

---

目录

你可以用[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)来扩展XR创意框架定义的类和Actor，从而自定义虚拟堪景工具。

XR创意框架可与虚幻引擎Gameplay框架共享设计模式。如需详细信息，请参阅[Gameplay框架](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine)。

![XR创意框架类流程图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/091dbaec-c54d-4402-b2f0-0912570e8f13/xr-creative-framework.png)

XR创意框架类流程图

## 创建新的XR创意模式和工具集

### 创建新的XR创意模式

XR创意体验的核心类是 `XRCreativeMode` 和 `XRCreativeToolset` 。`XRCreativeMode` 包含一套工具集和重载事件。你可以创建自定义工具集以添加、删除或重组现有工具，并添加新的自定义工具。

要创建新模式，请执行以下步骤：

1.  打开内容浏览器，点击 **添加 +（Add +）** > **新蓝图（New Blueprint）** 。
2.  搜索"XR模式（XR mode）"，然后点击 **XRCreativeVREditorMode** 。

![XRCreativeVREditorMode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b68a4363-5c91-4555-857f-30b81e86a766/xr-creative-mode.png)

XR创意模式包含以下可覆盖事件：

-   `EventOnEnter`
-   `EventOnExit`
-   `EventTick`

### 创建新的XR创意工具集

XR创意模式包含`Toolset Class` 。该变量需要 `XRCreative Toolset` 类的数据资产。

![带空工具集类的XR创意模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8992251-d779-435f-ad3e-ebda94cdf754/xr-creative-toolset.png)

要创建新的工具集，请执行以下步骤：

1.  打开内容浏览器，点击 **添加 +（Add +）** > **杂项（Miscellaneous）** > **数据资产（Data Asset）** 。
2.  搜索"XR工具集（XR toolset）"然后点击 **XR创意工具集（XR Creative Toolset）** 。

工具集数据资产包含指向以下类的指针，你可以在VREditor模式和 `XRCreativeGameMode` 中访问这些类：

-   **游戏化身（Avatar）**：`XRCreativeAvatar` 类的Pawn。启动VREditor模式时，关卡中就会生成游戏化身（Avatar）。Avatar是瞬时生成的，因此无法在关卡中保存，同一个多用户会话中的其他用户也看不到它。
-   **右手输入映射上下文**：游戏化身的输入操作的数据资产。
-   **左手输入映射上下文**：惯用手为左时，游戏化身的输入操作的数据资产。
-   `XRBlueprintableToolActor` Actor的数组
-   **控制板**：虚幻运动图形用户界面设计器（UMG）的控件，属于 `XRCreativePalette` 类。包含虚拟堪景所需的所有菜单和世界内用户界面。

虚拟堪景有两套默认工具集：`Scouting_Default` 和 `Scouting_Basic` 。两者都包括主菜单和游戏化身，但 `Scouting_Basic` 内的工具较少。

## 创建新工具

### 工具对象

工具对象是创建工具所需的所有其他类的容器。它包含以下必要属性的字段：

-   **显示名称（Display Name）**
-   **工具Actor（Tool Actor）**
-   **工具Viewmodel（Tool Viewmodel）**
-   **控制板（Palette）** （针对工具设置的UMG控件）

### 创建工具Actor

工具Actor被生成到世界中，通过对世界中的其他Actor进行操作来提供一系列功能，并将在你切换到另一个工具时被销毁。

要创建新工具，请执行以下步骤：

1.  打开内容浏览器，点击 **添加 +（Add +）** > **新蓝图（New Blueprint）** 。
2.  搜索"tool actor"然后点击 **XRCreativeToolActor** 。

**XRCreativeToolActor** 提供的工具只能在运行时工作。要制作仅在编辑器中生效的工具，请选择 **XRCreativeEditorUtilityToolActor** 。

#### 创建对编辑器和运行时通用的工具

虚幻引擎为蓝图Actor提供了两种资产工厂：普通Actor和编辑器工具Actor。编辑器工具Actor可以访问提供编辑器脚本编写功能的编辑器子系统。普通Actor则不能。编辑器工具的Actor不能被打包到游戏中，因为它们引用的是编辑器专用模块，而打包的游戏无法使用这些模块。详情请参阅[使用蓝图编写编辑器脚本](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints)。

但你可以创建对运行时打包和编辑器内工作流程通用的工具。虚拟堪景Sequencer工具就是一个例子。它包括工具Actor中的以下组件：

-   **BP\_SequenceControl** - 常规的蓝图Actor组件
-   **EUC\_SequenceControl** - 编辑器工具Actor组件

![工具Actor组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cda5aeac-4e9b-400b-9544-0d4ff1691757/tool-actor-components.png)

这两个组件都实现了通用接口 `BPI_SequencerControls` 。

该工具使用 `GetControlComponent` 函数，根据函数调用的上下文选择必须使用的组件。如果函数检测到有效的 `GameInstance` ，则使用常规的蓝图Actor。如果不存在有效的 `GameInstance` ，则使用编辑器工具Actor。有效的 `GameInstance` 只能在 PIE、-Game和打包的游戏中使用。

![实现GetControlComponent函数的蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/434363fc-bcb1-4bfc-ac6a-af244127b1cf/getcontrolcomponent.png)

### 输入操作和输入映射上下文

你可以创建新输入操作，并将其与你想要的输入绑定一起添加到 **输入映射上下文（Input Mapping Contexts）** 中。你可以向工具Actor和XRCreativeAvatar中添加并使用 `Input_Actions` 。这两个类都在创建时预先登记了输入。

如需详细信息，请参阅[增强输入](/documentation/zh-cn/unreal-engine/enhanced-input-in-unreal-engine)。

### 创建工具Viewmodel

XR创意使用UMG[Viewmodels](/documentation/zh-cn/unreal-engine/umg-viewmodel-for-unreal-engine)作为在世界内对象（如工具Actor）和UMG控制板菜单之间传递数据的手段。Viewmodels具有以下功能：

-   定义工具当前状态的所有变量的通用类。
-   字段通知系统。UMG MVVM的功能让你可以绑定（订阅）随变量更新而触发的事件。这让你可以将变量更新转变为基于事件的、可绑定的委托，从而避免在构成工具的类之间使用投射或接口来交流和共享数据。

你可以用XRCreativeSubsystem访问Viewmodel的集合。在虚拟堪景中，各工具的Viewmodel都以该工具命名。

如果你创建的工具仅供编辑器使用，可在Viewmodel中添加一个名为"bRequiredBinding"的布尔值，并将其设置为字段通知。这将用于确保你的控件在VREditor模式下被绑定到Viewmodel。如果你创建的新工具仅供运行时使用，则不需要这样做。

![bRequiredBinding布尔值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16209170-1fdb-4d91-95f4-d09a60c743a2/brequiredbinding.png)

### 创建Viewmodel解析器

要在编辑器中使用带有控制板UMG控件的viewmodel，你必须创建一个解析器类。

要创建解析器，请执行以下步骤：

1.  打开内容浏览器，点击 **添加 +（Add +）** > **新蓝图（New Blueprint）** 。
2.  搜索"MVVM"并点击 **MVVMViewmodelResolver\_Base** 。
    
    ![MVVMViewModelContextResolver](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e21c0b4-d66d-4057-8958-4a771ed09d24/mvvm.png)
3.  在Viewmodel蓝图中，按下方截图所示设置可重载事件 **创建实例（Create Instance）** 。这段代码将从XR创意Viewmodel集合中检索该Viewmodel。
    
    ![Viewmodel蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c25685f-50a1-4e24-b890-ca80b465c42c/viewmodel-blueprint.png)

### 创建控制板

每个工具都需要对应的控制板，控制板属于UMG控件，决定了工具在主菜单中的用户界面。Viewmodel解析器可让控制板与Viewmodel和工具Actor进行通信。

要创建控制板控件并将其与Viewmodel绑定，请执行以下步骤：

1.  打开内容浏览器，点击 **添加 +（Add +）** > **用户界面（User Interface）** > **控件蓝图（Widget Blueprint）** 。
2.  搜索"XR tab"然后点击 **XRCreativePaletteToolTab** 。
3.  打开类设置，将 `bCanCallInitializedWithoutPlayerContext` 设为 `true` 。
    
    ![bCanCallInitializedWithoutPlayerContext布尔值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0300e11-07de-4dff-a0d6-78e6183dde26/bind-viewmodel.png)
4.  创建一个名为 `bRequiredVMBinding` 的布尔变量。
    
    ![bRequiredVMBinding布尔值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4648a67b-c159-4026-b090-703164c4467d/brequiredvmbinding.png)
5.  打开 **视图绑定（View Bindings）** 选项卡，点击控件旁边的 **添加（+）** 按钮。
6.  在控件中的变量 `bRequiredVMBinding` 和Viewmodel类中的变量 `bRequiredVMBinding` 之间设置新的绑定。
7.  将该绑定设为 **控件单向绑定（One Way to Widget）** 。
    
    ![控件单向绑定](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/514488a6-ff35-4277-8a8d-8e5351d5a88f/set-widget-binding.png)
8.  打开 **Viewmodels** 选项卡，点击你的Viewmodel类。
9.  打开 **细节（Details）** 面板，将 **创建类型（Creation Type）** 设为 **解析器（Resolver）** ，并将 **解析器** 设为你的Viewmodel解析器。
    
    ![Viewmodel的细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78f682bb-dd5d-4338-914d-3fb86952d153/set-resolver.png)

在工具Actor和任何使用Viewmodel的控件中，都可以绑定到字段通知委托，如下图所示。

![显示字段值更改委托的蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a494816-8353-46ee-9cf2-2bef34a70c7b/field-notifications.png)

## 进阶内容

### 创建新的XR创意控制板系统

要创建新的XR创意控制板系统，你必须用以下类创建用户界面：

-   `XRCreativePalette` ：应该使用此类作为所有其他子控件的主容器
-   `XRCreativePaletteTab` ：你要创建的与特定工具相关联的子控件
-   `XRCreativePaletteToolTab` ：与工具相关联的子控件。工具对象将包含对此类的引用。

![XRCreative类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e21d9f8-f1b0-4c95-bb7e-4929b910a4f7/xr-creative-classes.png)

除了这些类，你还可以在控制板和控制板选项卡中使用UMG控件。建议使用CommonUI基类，因为这些基类包含了编译简洁、可维护和交互式用户界面所需的大量模板功能。

### XRCreativeAvatar

`XRCreativeAvatar` 类可用于蓝图，为自定义游戏化身开发提供了一个起点。要查看创建自定义游戏化身的示例，请参阅 `BP_VScoutAvatar` 类。 此类的内容分为以下几类：

-   生命周期管理 - 在进入VR时设置游戏化身，退出VR时移除游戏化身
-   移动、选择和模拟鼠标点击的输入
-   工具生命周期管理
-   指针和装饰物的逐帧更新
-   专用移动组件

### 在VRPie中运行

你可以在VRPreview（VRPie）中运行虚拟堪景工具集。这将带来一些细微差别，而且这条路线尚未完全开发。你可以在VRPie中访问诸如物理和碰撞等运行时模拟系统。

启动VRPie时，必须使用 `BP_VscoutGameMode` 而不是 `VRMode Scouting_Default` 。你也可以从父类 `XRCreativeGameMode` 中创建自己的 `GameMode` 。此类具有 `GameModeBase` 的所有功能，并增加了数据资产变量 `XRCreativeToolset` 用于定义工具和用户界面/用户体验。要为运行时编译，请同时使用 `XRCreativeAvatar` 和 `XRCreativeGameMode` 。

### 打包游戏

你可以按标准的VR开发流程将XR创意体验打包成游戏。前面提到的关于\[编辑器工具Actor和普通Actor\]（#创建工具actor）的注意事项也适用于为运行时进行的打包。

-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [virtual scouting](https://dev.epicgames.com/community/search?query=virtual%20scouting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建新的XR创意模式和工具集](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84xr%E5%88%9B%E6%84%8F%E6%A8%A1%E5%BC%8F%E5%92%8C%E5%B7%A5%E5%85%B7%E9%9B%86)
-   [创建新的XR创意模式](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84xr%E5%88%9B%E6%84%8F%E6%A8%A1%E5%BC%8F)
-   [创建新的XR创意工具集](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84xr%E5%88%9B%E6%84%8F%E5%B7%A5%E5%85%B7%E9%9B%86)
-   [创建新工具](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E5%B7%A5%E5%85%B7)
-   [工具对象](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%B7%A5%E5%85%B7%E5%AF%B9%E8%B1%A1)
-   [创建工具Actor](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%B7%A5%E5%85%B7actor)
-   [创建对编辑器和运行时通用的工具](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%AF%B9%E7%BC%96%E8%BE%91%E5%99%A8%E5%92%8C%E8%BF%90%E8%A1%8C%E6%97%B6%E9%80%9A%E7%94%A8%E7%9A%84%E5%B7%A5%E5%85%B7)
-   [输入操作和输入映射上下文](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E8%BE%93%E5%85%A5%E6%93%8D%E4%BD%9C%E5%92%8C%E8%BE%93%E5%85%A5%E6%98%A0%E5%B0%84%E4%B8%8A%E4%B8%8B%E6%96%87)
-   [创建工具Viewmodel](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%B7%A5%E5%85%B7viewmodel)
-   [创建Viewmodel解析器](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%88%9B%E5%BB%BAviewmodel%E8%A7%A3%E6%9E%90%E5%99%A8)
-   [创建控制板](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%8E%A7%E5%88%B6%E6%9D%BF)
-   [进阶内容](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E8%BF%9B%E9%98%B6%E5%86%85%E5%AE%B9)
-   [创建新的XR创意控制板系统](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84xr%E5%88%9B%E6%84%8F%E6%8E%A7%E5%88%B6%E6%9D%BF%E7%B3%BB%E7%BB%9F)
-   [XRCreativeAvatar](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#xrcreativeavatar)
-   [在VRPie中运行](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E5%9C%A8vrpie%E4%B8%AD%E8%BF%90%E8%A1%8C)
-   [打包游戏](/documentation/zh-cn/unreal-engine/customizing-virtual-scouting-in-unreal-engine#%E6%89%93%E5%8C%85%E6%B8%B8%E6%88%8F)