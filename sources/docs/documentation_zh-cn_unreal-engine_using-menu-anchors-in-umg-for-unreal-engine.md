# 在虚幻引擎的UMG中使用菜单锚点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-menu-anchors-in-umg-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:20:25.472Z

---

目录

![菜单锚点](https://dev.epicgames.com/community/api/documentation/image/a21967d6-b1ba-4581-b99b-b1cdf5ad0578?resizing_type=fill&width=1920&height=335)

**菜单锚点（Menu Anchor）** 控件可以添加到UI布局中，用来调整弹出菜单在屏幕中的位置。

本文介绍了如何在UI布局中使用和调整菜单锚点控件，还帮你熟悉使用 **虚幻示意图形界面设计器（Unreal Motion Graphics UI Designer (UMG)）** 来使用并调整菜单锚点控件的示例。

## 菜单锚点属性

### 细节面板选项

在已放置的 **菜单锚点（Menu Anchor）** 的 **细节（Details）** 面板中，可以设置几个控件相关的选项：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96f737b9-f7a8-44cf-9199-c866d7a41456/detailspanel.png)

选项

说明

**菜单类（Menu Class）**

调用菜单时要生成的控件蓝图（弹窗）。每次都创建新的控件。

**放置位置（Placement）**

几个放置选项来决定创建的控件的位置。

**适应到窗口（Fit in Window）**

如果设为true，那么窗口锚点会试图将菜单全部放入窗口中。

**应在窗口后推迟绘图（Should Defer Painting After Window）**

可以在窗口内容之后调整是否推迟绘图。

**使用应用菜单堆栈（Use Aplication Menu Stack）**

如果设为false，你自己可以控制菜单的寿命。

**OnGetMenuContent**

通过将功能或属性绑定到 **OnGetMenuContent** 事件（调出弹出窗口时会调用该事件），实现对弹出窗口的自定义（请参阅下文）。

**OnGetUserMenuContent**

通过将功能或属性绑定到 **OnGetUserMenuContent** 事件（请求菜单内容时会调用该事件），实现对弹出窗口的自定义（请参阅下文）。

**OnMenuOpenChanged**

通过将功能或属性绑定到 **OnMenuOpenChanged** 事件（菜单的打开状态发生变化时调用该事件），实现对弹出窗口的自定义。

对于 **OnGetMenuContent** 和 **OnGetUserMenuContent** 事件，你可以直接从 **详情（Details）** 面板创建并绑定功能。调用菜单锚点时就会调用该面板。这用于为弹出菜单的创建过程提供额外的功能。例如，下图我们运行了一项检查来确定玩家是否 "正在战斗"，如果没有，则允许他们访问弹出菜单。如果正在战斗，则不允许他们访问弹出菜单。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/417ba4c6-25a6-423c-9ead-542d04071757/examplegetmenu.png)

### 蓝图函数

菜单锚控件拥有一些控件特有的函数，这些函数可以通过脚本进行调用，下文进行介绍。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72b97630-a951-4b7c-84b2-5f09b7eb1202/menuanchornodes.png)

选项

描述

**关闭（Close）**

如果菜单当前打开的话，关闭菜单。

**窗口内适应（Fit in Window）**

设置锚点菜单在窗口中的适应大小。

**获取菜单位置（Get Menu Position）**

返回菜单在世界空间中的位置。

**有打开的子菜单（Has Open Sub Menus）**

检查菜单是否有打开的子菜单。

**是否打开（Is Open）**

检查目标菜单锚点当前是否打开并返回一个布尔值。

**打开（Open）**

如果菜单当前关闭的话，打开菜单。

**设置位置（Set Placement）**

设置放置选项来决定创建的控件的位置。

**应在点击时打开（Should Open Due to Click）**

返回是否能够通过点击来打开菜单。

**切换打开（Toggle Open）**

切换菜单的打开状态，可以代替打开/关闭选项来使用。

## 使用示例

如果你想要创建库存菜单并在玩家点击物品时显示弹出菜单，请参阅以下示例。

首先要创建弹出菜单的外观。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/875e17cf-7a4f-427c-93a6-2da84a05b6f3/popupdesigner.png)

上图我们创建了一个简单的 **控件蓝图（Widget Blueprint）**，名为 **MenuPopUp**，它由垂直框以及其中的三个按钮组成。

接下来，需要为库存菜单创建另一个控件蓝图，下图中我们将其称为 **HUD**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8ea3fa1-d301-4d4f-8789-0167028eb791/makeinventorymenu.png)

创建了库存菜单后，您还要添加 **菜单锚点（Menu Anchor）** 控件（位于 **基元（Primitive）** 下方）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3960109a-dc85-4e77-94ea-a7b5feb22dd7/addmenuanchor.png)

然后，将菜单锚放置在希望其显示的位置，在本例中，我们将其放置并锚定在右边/中间的位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/804c1f71-ec50-441d-aef5-541fd13752ba/placedanchor.png)

在菜单锚点的 **详情（Details）** 面板中，设置 **菜单类（Menu Class）**（或要生成的控件蓝图）及其布置选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/038e1d14-4857-480b-8011-075c894e3ec2/menuanchordetails.png)

在图表选项卡上，为每个按钮添加 **OnClick** 事件，并拖动到菜单锚点控件中。

拖动菜单锚，可以调用 **打开（Open）** 功能来打开并显示特定的菜单类。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcba90aa-8f7d-4c08-b12c-c577c66a2dbd/hud_graph.png)

选中**打开（Open）** 节点的 **聚焦菜单（Focus Menu）** 选项来给菜单锚点控件应用聚焦。这样会在聚焦点离开菜单时将菜单锚点控件自动关闭（比如点击菜单外任何位置）。这样可以让玩家与菜单外区域互动时关闭菜单。

创建了库存菜单后，需要通过某种方式在游戏中调用该菜单。

可以选择通过 **关卡蓝图（Level Blueprint）** 或（在我们的示例中）通过默认Pawn类（将其设为使用 **MyCharacter** 蓝图）调用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2058eaf-e4ef-4d87-a4b3-0cb39c99b4de/displayinginventorymenu.png)

在上图 **MyCharacter** 蓝图中，当游戏开始时，我们创建HUD控件并将其保存为名为 **HUDWidget** 的变量，这样，我们就可以在以后访问该控件。然后，将 **I** 设置为在 **添加到视口（Add to Viewport）** 和 **从父级移除（Remove from Parent）** 之间切换，从而显示或隐去库存菜单。我们还将 **显示光标（Show Mouse Cursor）** 设为根据是否打开了库存菜单来启用或禁用。

最后，在 **MenuPopUp** 蓝图（你的弹出菜单）中，添加一些脚本，以便在玩家按下弹出菜单中的某个按钮时 **关闭** 菜单锚点。下图中，当构建了弹出菜单后，我们通过 **投射（Casting）** ，然后将其提升为名为 **MyCharacterReference** 的变量，就得到了 **MyCharacter** 蓝图的引用。通过该引用就可以访问HUD。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba7d0cc8-6e27-4fcf-891b-071822d1d2e9/popupmenunetwork.png)

你可能想要为弹出菜单中的每个按钮添加一些功能，在按下按钮时，会调用这些功能（而不是输出到屏幕上）。例如，按下第一个按钮 "使用" 库存中的物品，按下第二个按钮"丢弃"物品，按下第三个按钮"取消"操作并让玩家返回到库存菜单。

这只是一个示例，你也可以更改菜单锚开启的条件。除了按下按钮，也可以使用 **IsHovered** 功能来确定光标是否悬停在某个对象上，然后打开菜单锚和弹出窗口，以便显示工具提示或其他形式的通知。无论是哪种情况，该文档都可以帮助你开始通过脚本来实现使用菜单锚显示/隐去弹出控件。

-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [菜单锚点属性](/documentation/zh-cn/unreal-engine/using-menu-anchors-in-umg-for-unreal-engine#%E8%8F%9C%E5%8D%95%E9%94%9A%E7%82%B9%E5%B1%9E%E6%80%A7)
-   [细节面板选项](/documentation/zh-cn/unreal-engine/using-menu-anchors-in-umg-for-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF%E9%80%89%E9%A1%B9)
-   [蓝图函数](/documentation/zh-cn/unreal-engine/using-menu-anchors-in-umg-for-unreal-engine#%E8%93%9D%E5%9B%BE%E5%87%BD%E6%95%B0)
-   [使用示例](/documentation/zh-cn/unreal-engine/using-menu-anchors-in-umg-for-unreal-engine#%E4%BD%BF%E7%94%A8%E7%A4%BA%E4%BE%8B)