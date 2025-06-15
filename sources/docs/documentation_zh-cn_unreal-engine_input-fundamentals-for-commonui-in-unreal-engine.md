# 虚幻引擎中CommonUI的输入基础知识 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:20:17.080Z

---

目录

![输入基础知识](https://dev.epicgames.com/community/api/documentation/image/b8317a63-baab-45e1-a9b1-02c18c450dfb?resizing_type=fill&width=1920&height=335)

[CommonUI](/documentation/zh-cn/unreal-engine/common-ui-plugin-for-advanced-user-interfaces-in-unreal-engine)是[Slate/UMG](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)框架的扩展。CommonUI实现了路由输入的方法，但仍依赖Slate的现有输入系统的底层逻辑。

本指南的每个小节都包含一些提示或方法，可以用于修改CommonUI的各个部分如何与基础Slate/UMG输入系统交互。

## 使用输入配置更改你的应用程序的UI输入处理

有时你可能需要基于哪个控件当前处于活动状态，更改你的应用程序处理输入的方式。例如，你可能需要在社交侧边栏或暂停菜单打开时防止玩家在游戏世界中移动。为了处理这种情况， **CommonUI** 针对 **可激活控件（Activatable Widgets）** 支持可选的 **输入配置（Input Configs）** 。

你不需要在应用程序中使用输入配置，并且可以利用CommonUI的其他功能，无论你是否使用它们。

### 在你的控件中使用输入配置

输入配置使用 `UIActionBindingHandle.h` 中的 `FUIInputConfig` 结构体表示。每个输入配置将跟踪多个输入方法的状态，包括鼠标捕获选项、移动轴和查看轴的处理，以及CommonUI使用的总体输入模式。

当你激活可激活控件时，它会使用 `UCommonActivatableWidget::GetDesiredInputConfig` 获取输入配置。此函数将默认返回null输入配置，但你可以将其覆盖为你想使用的任意逻辑。每当函数返回null输入配置时，CommonUI将回退为它上次使用的有效输入配置。

默认情况下，如果不存在可激活控件指定的输入配置，CommonUI会将默认输入配置应用为回退。但是，你可以使用位于 `UCommonInputSettings` 类中的 `bEnableDefaultInputConfig` 变量禁用此行为。

控件停用时，CommonUI将恢复它之前使用的输入配置，避免在没有合适输入配置选项来支持当前控件时卡住。你可以在 `FActivatableTreeRoot::ApplyLeafmostNodeConfig` 函数中找到此实现逻辑。

如果你停用UI中的所有控件，CommonUI将默认为上次停用的控件的输入配置。如果你有用例需要停用UI中每个控件，请确保上次停用的控件重新应用合理的输入处理，以避免软锁定。

### 推荐用法

如果你要使用输入配置， **你应该避免在UI中使用标准输入配置方法。**虚拟函数 `UCommonUIActionRouterBase::ApplyInputConfig` 的默认实现会在设置过程中调用以下标准UE配置方法：

-   `APlayerController::SetIgnoreMoveInput`
    
-   `UGameViewportClient::SetMouseCaptureMode`
    
-   `UGameViewportClient::SetHideCursorDuringCapture`
    

因此，若将CommonUI的输入配置与这些函数的其他调用混合，可能会导致它们彼此覆盖，在管理输入状态时造成混淆。

要简化输入配置的管理，你可以创建一个默认实现，基于控件中的枚举值分配常用的输入配置。如需示例，请参阅[Lyra示例项目](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)。它提供的实现方案很适合每个控件只需要几个固定非动态输入配置的应用程序。

### 输入处理状态参考

`FUIInputConfig` 同时跟踪多个输入状态。在 `UCommonActivatableWidget::GetDesiredInputConfig` 中设置输入配置后，应该会有一个完整的配置来设定你希望在控件获得焦点时输入如何运作。这些状态使用以下变量进行跟踪：

**参数**

**类型**

**说明**

`InputMode`

枚举 / `ECommonInputMode`

设置CommonUI的内部输入模式。

`MouseCaptureMode`

枚举 / `EMouseCaptureMode`

设置CommonUI的鼠标捕获模式。

`bHideCursorDuringViewportCapture`

布尔

如果为true，视口将在鼠标捕获期间隐藏鼠标光标。

`bIgnoreMoveInput`

布尔

如果为true，玩家控制器将忽略移动输入。

`bIgnoreLookInput`

布尔

如果为true，玩家控制器将忽略外观输入。

下表总结了可用于配置InputMode（ `ECommonInputMode` ）的模式：

**输入模式**

**说明**

菜单

输入仅由UI接收。

游戏

输入仅由游戏接收。

全部

输入由UI和游戏接收。

下表总结了可用于配置MouseCaptureMode（ `EMouseCaptureMode` ）的模式：

**鼠标捕获模式**

**说明**

无捕获

完全不捕获鼠标。

CapturePermanently

点击视口时永久捕获鼠标，并消耗导致捕获的初始鼠标按下，使其不会被玩家输入处理。

CapturePermanently\_IncludingInitialMouseDown

与CapturePermanently相同，只是玩家输入会处理导致捕获的初始鼠标按下。

CaptureDuringMouseDown

在按下鼠标按键时捕获鼠标，然后在松开鼠标按键时释放。

CaptureDuringRightMouseDown

仅当按下鼠标右键而非其他鼠标按键时捕获。

## 使用FReply更改控件如何响应输入

`FReply` 将跟踪输入事件的已处理/未处理状态。Slate中的大部分输入处理程序会返回结果 `FReply::Handled` 或 `FReply::Unhandled` 。

-   `FReply::Handled` 表示输入通常 **不应转发** 到其他控件或输入系统。
-   `FReply::Unhandled` 表示即使输入以某种方式被使用， **仍不应将其转发** 到其他控件或输入系统进行额外处理。

下面是一些常用的 `Swidget` 输入事件：

-   `FReply OnKeyUp(const FGeometry& MyGeometry, const FKeyEvent& InKeyEvent);`
-   `FReply OnAnalogValueChanged(const FGeometry& MyGeometry, const FAnalogInputEvent& InAnalogInputEvent);`
-   `FReply OnMouseMove(const FGeometry& MyGeometry, const FPointerEvent& MouseEvent);`
-   `void OnMouseEnter(const FGeometry& MyGeometry, const FPointerEvent& MouseEvent);`

其中许多函数（但并非全部）会返回 `FReply` 。这些回复可以在蓝图中设置或覆盖，因此如果你需要停止或允许特定类型输入的处理，你可以尝试返回特定 `FReply` 以获取所需结果。但是，大多数时候，对于一个或一组设计良好的控件，默认 `FReply` 结果应该足够。在使用Slate中的控件时，处理自定义 `FReply` 更容易出现问题。

![演示FReply输入路由流的图表。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e4709fe-bfb0-4f5a-a336-50296bfffa7a/input_chart.png)

演示FReply输入路由流的图表。输入从平台自己的输入事件开始，然后转发到Slate应用程序。Slate应用程序会接着将其发送到控件，控件使用FReply确定输入是已处理还是未处理。上述操作会重复，直至输入已处理或直至所有控件都已检查。

### FReply设置

`FReply` 将跟踪输入事件的已处理/未处理状态，但你还可以跟踪 `FReply` 中的额外数据，例如使用以下成员：

**参数**

**说明**

**CaptureMouse**

请求系统将所有鼠标事件转发到特定控件。

**ClearUserFocus**

请求系统清除用户焦点。

**ReleaseMouseCapture**

请求系统释放鼠标捕获。

**SetUserFocus**

请求系统将用户的焦点设置为提供的控件。

**SetNavigation**

请求系统尝试前往指定目标

上述列表并不详尽，仅用于演示你会看到哪些方法。请参阅[官方C++ API](https://docs.unrealengine.com/4.27/en-US/API/Runtime/SlateCore/Input/FReply)，了解 `FReply` 的完整列表。

其中一些事件，如 `FReply::CaptureMouse` 和 `FReply::SetUserFocus` ，接受额外的参数，包括目标控件。

如果你熟悉UMG或Slate，可能会觉得这些方法眼熟。 但是，它们在 `FReply` 名称空间中，这意味着你可以修改Slate处理你的 `FReply` 时发生的行为。在 `FReply` 中调用这些方法可以产生稍有不同的行为，这可能无法通过调用 `FReply` 外部的等效方法来轻松复制。

### 何时设置FReply？

我们来举例说明该在何时使用 `FReply` ，假设你需要在按键时设置或清除控件焦点。正常情况下，你可以尝试直接在按键处理程序中的 `FSlateApplication` 上调用相关函数，从而改变控件焦点。

此方法可能不适合所有情况，尤其是使用输入路由时，因为你尝试更改或清除焦点时， **输入仍在当前控件上处理** 。此输入流可能导致意外的行为。

我们推荐你改用Slate完整处理输入，然后使用输入事件回复或 `FReply` 处理类似的更改。

最初， `FReply` API中控制或公开的状态只能使用 `FReply` 设置。事实证明这样做过于局限，所以我们进行了更改，因此该工作流程更像是推荐指南。但是，我们强烈推荐它，因为这是首选的工作流程。

## 在你的UI中自定义浏览

本小节介绍在CommonUI中自定义浏览的指南和选项。

### 浏览配置

浏览配置并不直接与CommonUI相关，但理解它们有助于理解输入处理。

Slate支持基本浏览，无论是否启用CommonUI。使用 **浏览配置（Navigation Configs）** 或 `FNavigationConfig` 将确定哪些键映射到基本方向：

-   左
-   右
-   上
-   下
-   下一个
-   上一个

不需要手动浏览配置，Slate即可使用基本浏览。

要设置浏览配置，请调用 `FSlateApplication::SetNavigationConfig` 。通常，你会使用从 `FNavigationConfig` 派生的自定义浏览配置调用此函数。例如，如果你希望用户使用WASD键与你的UI交互，从此处开始会比较理想。

你还可以调用 `FSlateUser::SetUserNavigationConfig` ，按用户设置浏览配置。

### 手动控制浏览

要手动设置发生浏览事件时会怎样，请在UMG中选择控件，然后找到 **细节面板（Details panel）** 中的 **浏览（Navigation）** 分段。此分段包含每个基本方向的选项。

![在细节面板中手动设置浏览事件的示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb2b4411-f77c-4a71-a99c-0fa77a43ff21/nav_example.png)

选项的详细说明见下表：

**浏览控制选项**

**说明**

**逃逸（Escape）**

允许沿该方向继续移动，自动查找下一个可浏览的控件。

**显式（Explicit）**

移至特定控件。

**封装（Wrap）**

将移动封装在此容器中，在浏览尝试本来会逃逸的情况下，导致移动从另一侧循环。

**停止（Stop）**

停止此方向的移动。

**自定义（Custom）**

通过用户代码处理的自定义浏览。

**CustomBoundary**

到达边界时，通过用户代码处理的自定义浏览。

例如，在下面的用例中， **显式（Explicit）** 选项可能很有用：

![偏移后导致自动浏览可能不直观的按钮示例。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d890bfc-29d0-4eaf-9e72-f45a9cf1d5f0/nav_dir_example.png)

在此示例中，顶部和底部按钮没有与左侧聚焦的按钮垂直重叠。由于没有重叠，如果我们选择向右箭头来浏览，虚幻引擎将聚焦最右侧的按钮。如果我们希望按下向右箭头后浏览到顶部按钮，可以配置浏览设置来这样做。

![在细节面板中设置为](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f01e58eb-fb15-4e51-a4dc-8a2d3d56f2ff/nav_explicit_example.png)

通过将"显式"浏览设置为 **TopButton** 控件，每当用户按向右箭头时，都将改为聚焦该控件。

要将控件设置为"显式"浏览目标，必须手动指定它。这可确保长期维持浏览行为。

## 可激活控件和操作绑定

此小节介绍如何自定义可激活控件和绑定输入操作对于UI的行为。

### 设置可激活控件在激活时的焦点

每当你激活可激活控件时，它会调用 `UCommonActivatableWidget::GetDesiredFocusTarget` 函数，以选择CommonUI应该将用户的输入聚焦在哪个控件上。

如果你不实现 `GetDesiredFocusTarget` 的自定义版本，CommonUI可能很难知道在控件激活和停用时聚焦到何处。为此， **我们强烈推荐你总是在可激活控件中实现此函数。**

在[Lyra示例项目](/documentation/zh-cn/unreal-engine/lyra-sample-game-in-unreal-engine)中，每个可激活控件类都有一个自定义的枚举类型，用于确定使用什么方法获取所需焦点目标。对于使用固定非动态方法来确定默认焦点的大部分菜单，我们推荐采用类似的实现方案。

### 更改你的触发输入操作何时触发

为操作绑定创建 `FBindUIActionArgs` 时，将 `FBindUIActionArgs::KeyEvent` 设置为应该触发事件的操作类型，例如 `IE_Released` 。

## CommonUI控制台变量参考

你可以使用下表中的控制台变量来配置CommonUI如何运作以及获取调试信息：

**CVar**

**说明**

CommonUI.bDumpInputTypeChangeCallstack

如果为true，CommonUI将在输入类型更改时转储调用堆栈。当输入类型快速变化时，这很适合用于调试。

CommonInput.ShowKeys

切换是否为当前输入设备显示键。

CommonInput.EnableGamepadPlatformCursor

切换是否应该在游戏手柄输入期间启用光标。

UseTransparentButtonStyleAsDefault

如果为true， **CommonButtonBase** 中的 `SButton` 的默认 **按钮样式（Button Style）** 将设置为 **无边框（NoBorder）** ，即背景透明且无填充。

Mobile.EnableUITextScaling

启用移动UI文本缩放。

ActionBar.IgnoreOptOut

如果为true， **绑定操作栏（Bound Action Bar）** 将显示绑定，无论它们是否已配置。

CommonUI.AlwaysShowCursor

如果为true，CommonUI将总是显示鼠标光标，无论当前输入配置如何。

CommonUI.VideoPlayer.PreviewStepSize

CommonVideoPlayer的时间步长。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [user interface](https://dev.epicgames.com/community/search?query=user%20interface)
-   [plugin](https://dev.epicgames.com/community/search?query=plugin)
-   [umg](https://dev.epicgames.com/community/search?query=umg)
-   [menus](https://dev.epicgames.com/community/search?query=menus)
-   [gamepad](https://dev.epicgames.com/community/search?query=gamepad)
-   [common ui](https://dev.epicgames.com/community/search?query=common%20ui)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用输入配置更改你的应用程序的UI输入处理](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BE%93%E5%85%A5%E9%85%8D%E7%BD%AE%E6%9B%B4%E6%94%B9%E4%BD%A0%E7%9A%84%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E7%9A%84ui%E8%BE%93%E5%85%A5%E5%A4%84%E7%90%86)
-   [在你的控件中使用输入配置](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E5%9C%A8%E4%BD%A0%E7%9A%84%E6%8E%A7%E4%BB%B6%E4%B8%AD%E4%BD%BF%E7%94%A8%E8%BE%93%E5%85%A5%E9%85%8D%E7%BD%AE)
-   [推荐用法](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E6%8E%A8%E8%8D%90%E7%94%A8%E6%B3%95)
-   [输入处理状态参考](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E8%BE%93%E5%85%A5%E5%A4%84%E7%90%86%E7%8A%B6%E6%80%81%E5%8F%82%E8%80%83)
-   [使用FReply更改控件如何响应输入](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E4%BD%BF%E7%94%A8freply%E6%9B%B4%E6%94%B9%E6%8E%A7%E4%BB%B6%E5%A6%82%E4%BD%95%E5%93%8D%E5%BA%94%E8%BE%93%E5%85%A5)
-   [FReply设置](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#freply%E8%AE%BE%E7%BD%AE)
-   [何时设置FReply？](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E4%BD%95%E6%97%B6%E8%AE%BE%E7%BD%AEfreply%EF%BC%9F)
-   [在你的UI中自定义浏览](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E5%9C%A8%E4%BD%A0%E7%9A%84ui%E4%B8%AD%E8%87%AA%E5%AE%9A%E4%B9%89%E6%B5%8F%E8%A7%88)
-   [浏览配置](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E6%B5%8F%E8%A7%88%E9%85%8D%E7%BD%AE)
-   [手动控制浏览](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E6%89%8B%E5%8A%A8%E6%8E%A7%E5%88%B6%E6%B5%8F%E8%A7%88)
-   [可激活控件和操作绑定](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E5%8F%AF%E6%BF%80%E6%B4%BB%E6%8E%A7%E4%BB%B6%E5%92%8C%E6%93%8D%E4%BD%9C%E7%BB%91%E5%AE%9A)
-   [设置可激活控件在激活时的焦点](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%8F%AF%E6%BF%80%E6%B4%BB%E6%8E%A7%E4%BB%B6%E5%9C%A8%E6%BF%80%E6%B4%BB%E6%97%B6%E7%9A%84%E7%84%A6%E7%82%B9)
-   [更改你的触发输入操作何时触发](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#%E6%9B%B4%E6%94%B9%E4%BD%A0%E7%9A%84%E8%A7%A6%E5%8F%91%E8%BE%93%E5%85%A5%E6%93%8D%E4%BD%9C%E4%BD%95%E6%97%B6%E8%A7%A6%E5%8F%91)
-   [CommonUI控制台变量参考](/documentation/zh-cn/unreal-engine/input-fundamentals-for-commonui-in-unreal-engine#commonui%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F%E5%8F%82%E8%80%83)