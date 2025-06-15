# 虚幻引擎中的蓝图调试示例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-debugging-example-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:48.387Z

---

目录

![蓝图调试示例](https://dev.epicgames.com/community/api/documentation/image/f283aa03-3c54-429d-94a2-af2dcb03ceb6?resizing_type=fill&width=1920&height=335)

蓝图调试（Blueprint debugging）是一项强大的功能，提供了在"在编辑器中运行"（Play In Editor，**PIE**）模式或"在编辑器中模拟"（Simulate In Editor，**SIE**）模式下暂停游戏执行的功能。调试期间，可通过使用断点来单步调试任何蓝图或关卡蓝图的图表。

## 调试功能按钮

蓝图调试器（Blueprint Debugger）可在PIE和SIE会话期间控制游戏的执行。游戏运行时，[工具栏](/documentation/zh-cn/unreal-engine/toolbar-in-the-blueprints-visual-scripting-editor-for-unreal-engine)中的功能按钮将启用。根据当前调试的蓝图类型和调试会话的当前状态，所出现的调试功能按钮会有所不同。某些功能按钮仅在需要时才启用，例如运行到 **断点** 时。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fe2b2a5-9333-474c-bf90-f31b70bea174/debugging_editor.png)

在PIE或SIE模式处于激活状态时，调试（Debug） 选项卡（可从 蓝图编辑器（Blueprint Editor） 窗口菜单打开）以及 蓝图调试器（Blueprint Debugger） 都会显示上下文相关的调试按钮。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/722a4a74-abc0-4990-a687-232de01d992d/blueprint_debugger.png)

## 启用调试

要启用蓝图调试，必须首先指定要在关卡中调试的蓝图实例。

在蓝图中，单击 **调试对象（Debug Object）** 下拉菜单，然后选择你希望在调试器中看到的实例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1291d53f-98fd-4e71-9cb3-1eab7e696be6/debughowto1.png)

选择对象后，你可以通过单击放大镜图标跳转到关卡中的该对象。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7320e496-9bfe-4b65-94c7-0b6446907087/debughowto2.png)

在编辑器中运行时，蓝图会在另一个窗口中打开，你会在脚本执行时看到搏动的"激活线"。

![](pulse.gif)

在上面的示例中，有两个输入轴事件（Input Axis Event）调用了蓝图中的某个函数，向Pawn的控制器添加了运动。你可以在左侧窗口中看到，脚本在游戏启动时执行（因为搏动线从红色的InputAxis事件节点转向Add Controller输入节点）

## 断点

**断点（Breakpoints）** 是可放置在蓝图图表节点上的标识。PIE或SIE模式下，在将要执行带有断点的节点时，游戏将暂停，开发者将被带到蓝图编辑器图表视图中的节点。这为在蓝图中观察变量值以及检查或单步调试执行流程提供了条件。给定蓝图的所有断点都显示在 **调试（Debug）选项卡** 中，选中时可在蓝图的图表中查看。要在节点上放置断点，可以右键单击该节点并从上下文菜单中选择 **添加断点（Add Breakpoint）**，此时节点的左上角将出现一个实心的红色八边形。要删除断点，可以再次右键单击该节点，或者右键单击调试（Debug）选项卡中的断点条目，然后选择 **删除断点（Remove Breakpoint）** 命令。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/458a503b-5be2-4f7d-b836-185a3c1efa60/activebreakpoint.png "ActiveBreakpoint.png")

当执行Jump节点时，此断点将中断游戏。

要暂时禁用某个断点而不完全删除，可以右键单击该蓝图节点或调试（Debug）选项卡中的断点条目，然后从上下文菜单中选择 **禁用断点（Disable Breakpoint）**。禁用的断点将显示为空心的红色八边形。禁用的断点不会执行，但可以轻松地再次启用。这个过程比反复销毁再重新制作断点更方便，不易出现人为错误。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1de05e8-2978-4306-8f38-17f7ae5ef0ce/inactivebreakpoint.png "InactiveBreakpoint.png")

此断点已禁用，目前不起作用，但如果需要，可以轻松地再次启用该断点。

要启用禁用的断点，**右键单击** 该节点并选择 **启用断点（Enable Breakpoint）** 或单击 **调试（Debug）** 选项卡中断点旁边的图标。这也可以通过在 **调试（Debug）** 选项卡中 **右键单击** 该断点并选择 **启用断点（Enable Breakpoint）** 来完成。断点可随时创建、禁用、启用或销毁，包括在调试会话期间。断点保存在项目.ini文件中，因此它们将在编辑器会话之间继续保持。

如果断点放置在无效位置，它可能会显示为黄色并带有感叹号。在某些情况下，编译蓝图可以解决此问题。如果无法解决，可通过将鼠标光标悬停在断点图标上来查看解释。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aadd91af-f0f9-41bd-8382-5693b6a7b79c/warningbreakpoint.png "WarningBreakpoint.png")

这个断点是无效的，永远不会被命中。在某些情况下，重新编译蓝图可以解决此问题。

使用断点暂停执行时，编辑器将突出显示并聚焦该节点，并在其上放置一个大的红色箭头。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e470234b-9e38-478f-b763-3ac7a4ff2452/breakingonbreakpoint.png "BreakingOnBreakpoint.png")

这个断点被命中，暂停执行。

## 查看

**查看（Watch）** 追踪蓝图节点引脚的值，用于在调试会话期间快速参考。引脚保存在包含该引脚的节点最近一次执行时计算的值。要将查看放置在引脚上，请在蓝图图表中右键单击引脚的名称，然后从上下文菜单中选择 **查看此值（Watch this value）**。在上下文菜单中，针对正在查看的引脚会显示 **停止查看此值（Stop watch this value）**，而不是 **查看此值（Watch this value）**。

尚未执行的节点的引脚没有可用的调试信息，将显示一条消息说明这一情况，而不会显示数据值。这是因为引脚的值只会在节点执行其底层代码时更新，因此在节点至少执行一次之前无效。蓝图变量节点也需要执行代码来检索变量的值，但只会在另一个节点尝试访问其输出值时才会执行。

## 调试窗口和蓝图调试器

**调试（Debug）** 窗口显示断点、查看和当前代码执行的追踪堆栈。此窗口还具有执行功能按钮，因此你可以在使用断点时停止、恢复或单步调试你的代码。对特定的蓝图实例，你可以使用选项卡在完整执行调用堆栈与断点、查看和调用堆栈信息之间切换。

### 查看窗口

**蓝图查看窗口（Blueprint Watch Window）** 用于访问想要查看的数据，从而加快调试速度。你可以查看编辑器中打开的蓝图类，它们是当前调用堆栈的一部分。当执行暂停时，你可以看到一个合并的调用堆栈，其中填充了当前数据。你可以轻松地在蓝图之间跳转并检查属性值和节点输出。此视图支持数组、集合、映射和其他数据结构的扩展，可以快速方便地深入检查它们包含的任何数据。你还可以单击 **节点名称（Node Name）** 列中的条目以转到任何蓝图类中的该节点，或选择 **对象名称（Object Name）** 列中的条目以选择该特定实例。

### 调用堆栈

在调试会话期间可用的 **调用堆栈（Call Stack）** 在概念上与大多数C++开发环境中的调用堆栈相似。它揭示了蓝图可视化脚本函数和原生（C++）代码函数之间的执行流程。当前执行的蓝图可视化脚本函数位于堆栈顶部。

蓝图宏（Blueprint Macro）不会显示在调用堆栈中，而是作为调用它们的函数的一部分出现。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddbfcbc8-d133-45f6-8278-a28a26bd2031/activebreakpoint.png "ActiveBreakpoint.png")

上面的蓝图函数获取某个类的所有Actor并停用它的组件。在函数的末尾设置了断点。

当断点命中时，调用堆栈会列出当前正在运行的函数，从顶部的当前函数开始，然后向下直到调用函数。这意味着每个行条目都包含一个函数的名称，该函数由其下一行所列的函数调用。在递归（自调用）函数中，相同的函数名称可能会连续出现多次。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd1e1c41-2225-4b8e-97ab-6a16a0acf9b4/callstack.png "CallStack.png")

此调用堆栈显示当玩家按下自定义函数"FindActorPressed"时对第三人称角色（Third Person Character）的事件图表（Event Graph）的调用，如上所示。这最初是从Actor的蓝图事件图表（Blueprint Event Graph）调用的，而后者又响应从原生代码中的玩家输入组件（Player Input Component）调用的 FindActorPressed Action映射事件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7f9a7c6-8f9c-4312-b7fc-7f79b9a604e2/bpcallstack.png "BpCallStack.png")

要查看（或隐藏）调用堆栈，请右键单击 蓝图调试器（Blueprint Debugger） 窗口，然后从下拉列表中选择 调用堆栈（Call Stack）。

从C++调用堆栈中查看蓝图调用堆栈可能比较麻烦。要在你的IDE中获取蓝图调用堆栈的快照，请在调试时停在断点处，并在即时（Immediate）窗口中调用 `{,,UnrealEditor-Core}::PrintScriptCallstack()`。此操作只在编辑器构建中有效。

### 执行追踪

**执行追踪（Execution Trace）** 堆栈显示了执行的节点列表，最近执行的节点位于顶部。

![蓝图调试 - 执行追踪堆栈](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7f8b3e8-03d1-4fbf-8463-9a316850c76d/k2_debug_exectrace.png)

在调试过程中单步调试图表时，此列表会更新。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [调试功能按钮](/documentation/zh-cn/unreal-engine/blueprint-debugging-example-in-unreal-engine#%E8%B0%83%E8%AF%95%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [启用调试](/documentation/zh-cn/unreal-engine/blueprint-debugging-example-in-unreal-engine#%E5%90%AF%E7%94%A8%E8%B0%83%E8%AF%95)
-   [断点](/documentation/zh-cn/unreal-engine/blueprint-debugging-example-in-unreal-engine#%E6%96%AD%E7%82%B9)
-   [查看](/documentation/zh-cn/unreal-engine/blueprint-debugging-example-in-unreal-engine#%E6%9F%A5%E7%9C%8B)
-   [调试窗口和蓝图调试器](/documentation/zh-cn/unreal-engine/blueprint-debugging-example-in-unreal-engine#%E8%B0%83%E8%AF%95%E7%AA%97%E5%8F%A3%E5%92%8C%E8%93%9D%E5%9B%BE%E8%B0%83%E8%AF%95%E5%99%A8)
-   [查看窗口](/documentation/zh-cn/unreal-engine/blueprint-debugging-example-in-unreal-engine#%E6%9F%A5%E7%9C%8B%E7%AA%97%E5%8F%A3)
-   [调用堆栈](/documentation/zh-cn/unreal-engine/blueprint-debugging-example-in-unreal-engine#%E8%B0%83%E7%94%A8%E5%A0%86%E6%A0%88)
-   [执行追踪](/documentation/zh-cn/unreal-engine/blueprint-debugging-example-in-unreal-engine#%E6%89%A7%E8%A1%8C%E8%BF%BD%E8%B8%AA)

相关文档

[

蓝图调试器

![蓝图调试器](https://dev.epicgames.com/community/api/documentation/image/62893c3e-e96c-4f83-ab44-cf918c093ad0?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprint-debugger-in-unreal-engine)

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)