# 虚幻引擎中的控制台Slate调试器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/console-slate-debugger-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:19:50.349Z

---

目录

![控制台Slate调试器](https://dev.epicgames.com/community/api/documentation/image/ef2173b0-f145-482c-a657-9bcf56ecf135?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [运行和模拟](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine)

在为应用程序开发用户界面（UI）时，UI开发人员有时需要调试Slate，**控制台Slate调试器** 可以为你提供帮助。控制台Slate调试器挂接到[FSlateDebugging](/documentation/en-us/unreal-engine/API/Runtime/SlateCore/Debugging/FSlateDebugging)中的可用系统，以便打印内部Slate数据。此外，随着UI焦点更改（或尝试更改），开发人员将需要知道哪个系统正在处理这类焦点更新。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b838083d-70fc-475b-9705-fe85c474cb60/slateconsole.png)

控制台Slate调试器

在4.26中，控制台Slate调试器的扩展现在包括以下内容：

-   GlobalInvalidation，有助于识别负责处理高成本帧的控件。
-   绘制选项，显示在给定帧中绘制的控件。
-   附加路由选项，用于查看系统如何选择控件作为事件处理程序。
-   其他过滤器和事件控制台命令。

本页的屏幕截图取自Lyra示例游戏项目。要在Lyra中测试SlateDebugger命令，请使用命令 `Slate.EnableGlobalInvalidation 1` 启用[全局无效（Global Invalidation）](/documentation/zh-cn/unreal-engine/invalidation-in-slate-and-umg-for-unreal-engine)，因为它在默认情况下未激活。

## SlateDebugger

在PIE模式下运行项目时，按波浪号（〜）键打开PIE控制台，然后键入 `SlateDebugger`。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2c5c2fd-3bed-45c4-8e5e-0f3dfef5d83c/slatedebuggerconsole.gif)

SlateDebugger日志通常被写入到 `[ProjectName]/Saved/Logs` 下的 `[ProjectName].txt` 日志文件中。

### 事件命令

Slate调试器提供了许多不同的命令以精确定位特定信息，例如启用或禁用特定日志以及过滤事件。如果需要更多信息，CaptureStack还可以提供触发事件的调用堆栈。

SlateDebugger.Event

命令说明

**Start**

`SlateDebugger.Event.Start` 的别名，用于启动Slate控制台调试器。

**Stop**

`SlateDebugger.Event.Stop` 的别名，用于停止Slate控制台调试器。

**SetInputFilter**

启用或禁用特定的输入过滤器。

**SetFocusFilter**

启用或禁用特定的焦点过滤器。

**LogWarning**

记录警告事件。

**LogInputEvent**

记录输入事件。

**LogFocusEvent**

记录焦点事件。

**LogExecuteNavigationEvent**

记录执行导航事件。

**LogCaptureStateChangeEvent**

记录光标状态更改事件。

**LogCursorChangeEvent**

记录光标更改事件。

**LogAttemptNavigationEvent**

记录尝试导航事件。

**InputRoutingModeEnabled**

如果启用，则输出输入事件采用的路由。

**EnableAllInputFilters**

启用所有输入过滤器。

**DisableAllInputFilters**

禁用所有输入过滤器。

**EnableAllFocusFilters**

启用所有焦点过滤器。

**DisableAllFocusFilters**

禁用所有焦点过滤器。

**CaptureStack**

如果启用，则在发生事件时捕获堆栈。

### 无效命令

这些命令使你可以使用Invalidate命令显示无效的界面控件。每个失效的控件将根据失效类型以不同的颜色突出显示。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86e73c16-3a48-47c9-b123-2cefd75d9de9/debuggerinvalidate.png)

SlateDebugger.Invalidate在失效过程中显示每个控件的状态。

SlateDebugger.Invalidate

命令说明

**Enable**

启动无效控件（Invalidation Widget）调试工具，在控件使无效控件调试工具失效或停止时显示，取决于当前状态。

**Start**

启动无效控件调试工具，在控件失效时显示。

**Stop**

停止无效控件调试工具。

**SetInvalidateRootReasonFilter**

启用无效控件原因过滤器。

用法是 `SetInvalidateRootReasonFinder [None][ChildOrder][Root][ScreenPosition][Any]`。

**SetInvalidateWidgetReasonFilter**

INCLUDE:#siwrf\]

**ToggleLegend**

显示颜色图例。

**ToggleLogInvalidateWidget**

将无效控件记录到控制台。

**ToggleWidgetNameList**

显示无效控件的名称。

### 绘制命令

此命令用于突出显示在每个帧中绘制的控件。这适用于识别已绘制的控件（即使它们未更改）。请注意，易变控件每帧都会绘制。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb422e5f-1e34-4ff1-bc6d-b9f01db6eabc/debuggerpaint.png)

SlateDebugger.Paint显示屏幕上正在重新绘制的控件。

SlateDebugger.Paint

命令说明

**Enable**

启动绘制控件调试工具，在控件绘制或停止绘制控件调试工具时显示，取决于当前状态。

**Start**

启动绘制控件调试工具，在控件绘制时显示。

**Stop**

停止绘制控件调试工具。

**LogOnce**

记录上一次更新期间绘制一次的控件

**LogWarningIfWidgetIsPaintedMoreThanOnce**

如果控件在同一帧中绘制多次，则记录警告。

**MaxNumberOfWidgetDisplayedInList**

显示 `DisplayWidgetNameList` 处于激活状态时将显示的最大控件数量。

**ToggleWidgetNameList**

显示绘制的控件名称。

### 更新命令

此命令用于突出显示更新频率超过需求的控件。由于可能在蓝图中覆盖或执行控件更新，因此，如果未正确设计控件代码，通常会导致性能降低。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e47d4329-d2fc-433d-9087-4841ba92c822/debuggerupdate.png)

SlateDebugger.Update使用特定颜色的信息来突出显示哪些控件正在进行更新。此图像设置为仅过滤出使用黄色的Repaint事件。

SlateDebugger.Update

命令说明

**Enable**

启动更新控件调试工具，在控件更新或停止更新控件调试工具时显示，取决于当前状态。

**Start**

启动更新控件调试工具，在控件更新时显示。

**Stop**

停止更新控件调试工具。

**SetInvalidationRootIdFilter**

仅显示属于无效根的控件。

**SetWidgetUpdateFlagsFilter**

如果控件在同一帧中绘制多次，则记录警告。

启用或禁用特定控件更新标记过滤器。用法是 `SetWidgetUpdateFlagsFilter [None][Tick][ActiveTimer][Repaint][VolatilePaint][Any]`。

**ToggleLegend**

显示颜色图例。

**ToggleUpdateFromPaint**

显示不具有更新标记，但仍作为另一控件的副作用而更新的控件。

**ToggleWidgetNameList**

显示更新控件的名称。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [slate](https://dev.epicgames.com/community/search?query=slate)
-   [console slate debugger](https://dev.epicgames.com/community/search?query=console%20slate%20debugger)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [SlateDebugger](/documentation/zh-cn/unreal-engine/console-slate-debugger-in-unreal-engine#slatedebugger)
-   [事件命令](/documentation/zh-cn/unreal-engine/console-slate-debugger-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E5%91%BD%E4%BB%A4)
-   [无效命令](/documentation/zh-cn/unreal-engine/console-slate-debugger-in-unreal-engine#%E6%97%A0%E6%95%88%E5%91%BD%E4%BB%A4)
-   [绘制命令](/documentation/zh-cn/unreal-engine/console-slate-debugger-in-unreal-engine#%E7%BB%98%E5%88%B6%E5%91%BD%E4%BB%A4)
-   [更新命令](/documentation/zh-cn/unreal-engine/console-slate-debugger-in-unreal-engine#%E6%9B%B4%E6%96%B0%E5%91%BD%E4%BB%A4)

相关文档

[

UI无效化

![UI无效化](https://dev.epicgames.com/community/api/documentation/image/7bce77e7-baf2-4d74-a601-d121cce3c64d?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/invalidation-in-slate-and-umg-for-unreal-engine)