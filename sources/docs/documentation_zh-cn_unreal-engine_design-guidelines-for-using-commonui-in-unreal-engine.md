# 在虚幻引擎中使用CommonUI的设计指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/design-guidelines-for-using-commonui-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:19:55.064Z

---

目录

![设计指南](https://dev.epicgames.com/community/api/documentation/image/b1e22e55-fba8-4701-af6d-b4db5cae1963?resizing_type=fill&width=1920&height=335)

[CommonUI](/documentation/zh-cn/unreal-engine/common-ui-plugin-for-advanced-user-interfaces-in-unreal-engine)是对[UMG](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)的广泛补充，包含各种各样的系统和帮助理解的工具。本页面包含一系列指南和常见问题解答，可帮助你了解实现它的最佳实践。

## CommonUI是否适合你的项目？

虽然CommonUI有许多有益功能，但它使用两个主要用例构建而成：

-   复杂的多层界面。
    
-   跨平台支持。
    

如果你预期你的项目不会使用其中任一用例，可能没有必要使用CommonUI。 除了这些用例之外，我们推荐你考虑你使用CommonUI是为了获得哪些好处，以及这些好处是否值得花时间精力学习UI创建和交互的新范例。

例如，设计仅限PC的实时策略（RTS）游戏时，CommonUI可能不适用，因为此类型的游戏通常使用不需要复杂基本浏览的单层UI，因此使用CommonUI的输入路由或绑定操作系统不大可能获益。

此外，不推荐将CommonUI用于使用WidgetComponents放置的控件。由于CommonUI依赖光标焦点浏览、激活顺序和绘制顺序/层ID，CommonUI仍可以处理你的2D游戏HUD，但不适用于游戏世界中放置的控件。

### 迁移到CommonUI

如果你有现有UI，可以考虑迁移到CommonUI。做出此决定时，考虑你的UI是否接近完成，以及未来是否有可以从使用CommonUI中获益的UI开发计划。

此外，考虑是否可以使用CommonUI创建新控件，同时与旧UI交互，或者是否需要刷新整个UI以迁移到CommonUI。

## 我应该使用CommonActivatableWidget还是CommonUserWidget？

并非每个CommonUI控件都应该是可激活控件。仅当控件需要根据开或关来影响输入路由时，该控件才应该是可激活控件。

如果你要创建的控件仅需要与CommonUI的输入路由系统交互来自行处理输入，请考虑创建CommonUserWidget或常规用户控件。CommonUserWidget构成了CommonUI的许多类的基础，包括 `UCommonButtonBase` 和 `UCommonTabListWidgetBase` 。有时可激活控件可能会适得其反，提示文本就是一个很好的例子，因为提示文本往往会快速显示和消失，不需要将输入转发到子控件，并且不需要提取UI其余部分中的输入。

如果你要创建的控件有多个可交互子项，或需要阻止来自UI其余部分的输入处理，最好使用可激活控件。弹出窗口和模式菜单就是很好的例子。

## 我该如何处理同时键盘和鼠标浏览？

CommonUI可轻松支持游戏手柄浏览以及传统鼠标和键盘浏览。常见陷阱是想要 **同时** 支持键盘和鼠标浏览。CommonUI **不** 支持在使用鼠标浏览的同时把键盘当作游戏手柄来完成浏操作览。CommonUI。

对于这个特殊的浏览输入组合，考虑以下情况：如果鼠标可以自由浏览，并有自己独立于键盘的悬停/焦点，当键盘浏览到鼠标当前未悬停/聚焦的元素时会怎么样？你的UI会显示为单个玩家悬停在两个不同元素上的状态。此状态在视觉上令人困惑，很难在游戏中的所有UI之间支持它。

虽然CommonUI并不直接支持同时键盘和鼠标浏览，但你完全可以创建专门的控件，使用键盘浏览表现出正确的行为。同样，在使用鼠标浏览与将键盘用作游戏手柄进行浏览之间 *切换* 时，不会出现设计问题，因为切换时会始终维持聚焦于一个控件。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [commonui](https://dev.epicgames.com/community/search?query=commonui)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [CommonUI是否适合你的项目？](/documentation/zh-cn/unreal-engine/design-guidelines-for-using-commonui-in-unreal-engine#commonui%E6%98%AF%E5%90%A6%E9%80%82%E5%90%88%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE%EF%BC%9F)
-   [迁移到CommonUI](/documentation/zh-cn/unreal-engine/design-guidelines-for-using-commonui-in-unreal-engine#%E8%BF%81%E7%A7%BB%E5%88%B0commonui)
-   [我应该使用CommonActivatableWidget还是CommonUserWidget？](/documentation/zh-cn/unreal-engine/design-guidelines-for-using-commonui-in-unreal-engine#%E6%88%91%E5%BA%94%E8%AF%A5%E4%BD%BF%E7%94%A8commonactivatablewidget%E8%BF%98%E6%98%AFcommonuserwidget%EF%BC%9F)
-   [我该如何处理同时键盘和鼠标浏览？](/documentation/zh-cn/unreal-engine/design-guidelines-for-using-commonui-in-unreal-engine#%E6%88%91%E8%AF%A5%E5%A6%82%E4%BD%95%E5%A4%84%E7%90%86%E5%90%8C%E6%97%B6%E9%94%AE%E7%9B%98%E5%92%8C%E9%BC%A0%E6%A0%87%E6%B5%8F%E8%A7%88%EF%BC%9F)