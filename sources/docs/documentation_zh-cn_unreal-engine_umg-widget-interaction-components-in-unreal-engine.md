# 虚幻引擎UMG控件交互组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/umg-widget-interaction-components-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:17:53.159Z

---

目录

![控件交互组件](https://dev.epicgames.com/community/api/documentation/image/85361090-e563-4632-96ab-6831f55ccaeb?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc47d63c-8ffd-4e0f-b74a-74a3ae1a0806/widgetinteractionbanner.png)

如您使用 [控件组件](/documentation/zh-cn/unreal-engine/building-your-ui-in-unreal-engine) 显示以 3D 形式存在于游戏世界中的 UI，还需要玩家与此控件进行交互，可通过 **控件交互（Widget Interaction）** 组件来实现交互。

控件交互组件执行 [光线投射](/documentation/zh-cn/unreal-engine/traces-tutorials-in-unreal-engine)，确定它是否命中世界场景中的控件组件。如命中，可设置规则确定与其交互的方式。 交互通过模拟定义的按键来执行。例如一个按钮可通过鼠标左键点击，即可告知其他形式的输入模拟一次鼠标左键点击（控制器按钮按下、运动控制器扳机键按下等）。

如要了解详细范例，请查阅 [](/documentation/404)。

## 添加控件交互组件

通常需要将控件交互组件添加到玩家 [Pawn](/documentation/zh-cn/unreal-engine/pawn-in-unreal-engine) 或来自 [组件窗口](/documentation/zh-cn/unreal-engine/components-window-in-unreal-engine) 的 [角色](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine) 类。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4efac2d4-6e63-436a-a5a9-7a0bdebb07d5/widgetinteractioncomponent.png)

我们将其添加并附加到角色手持的一把枪上，因此枪指向的方向就是控件交互组件的朝向。

## 控件交互属性参考

添加控件交互组件后，可调整 **Details** 面板中的数个属性来定义其功能。 除常见的组件属性外（如 **Transform**、**Rendering**，或 **Sockets**），以下属性为控件交互组件专用。

选项

描述

**交互**

 

**Virtual User Index**

代表虚拟用户索引。控件交互组件通过虚拟用户索引产生作用，此索引将单独捕捉并处理聚焦状态。每个虚拟用户应由一个不同的索引所代表，确保它们保持单独的捕捉和聚焦状态。每个控件交互组件上线后，它将告知虚拟用户索引的 Slate 它已被指定、可作为真实 Slate 用户发送时间。

**Pointer Index**

每个用户的模拟虚拟控制器或虚拟指端应使用不同的指针索引。

**Interaction Distance**

组件能够和控件组件形成交互的距离（以游戏单位计）。

**Interaction Source**

确定从何处开始投射并开始追踪（世界场景、鼠标、屏幕中心或自定义）。如将此设为自定义，则需要调用 `SetCustomHitResult()` 并提供自定义命中测试（在需要的任意位置执行）的结果。

**Enable Hit Testing**

确定交互组件是否应该执行命中测试（自动或自定义）并尝试模拟悬停。如需要模拟键盘而虚拟键盘和虚拟指针设备为分离状态，应将此选项关闭并将另一个交互组件用于指针设备。

调试

 

**Show Debug**

显示调试线和命中球体，以便调试交互。

**Debug Color**

确定 **Show Debug** 启用时调试线的颜色。

事件

 

**On Hovered Widget Changed**

悬停控件组件改变时调用。Slate 层的交互组件函数 — 因此它无法针对命中结果下的控件进行报告。

## 控件交互蓝图节点参考

控件交互组件可模拟不同类型的输入方法（如按下、松开，或按下 + 松开），在蓝图快捷菜单的 **Interaction** 部分可找到这部分内容。 还可获得其他信息，如控件交互组件注册的"命中"位置，或世界场景中的控件组件当前是否被悬停。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9477d90d-6bc4-42f1-9bcb-6c3d9cb10e58/widgetinteractionblueprint.png)

节点

描述

**Get Hovered Widget Component**

获取当前悬停的控件组件。

**Get Last Hit Result**

获取组件生成的上一个命中结果。设置后将返回自定义命中结果。

**Is Over Focusable Widget**

如命中结果下的控件为可聚焦，则返回 true。为 `SupportsKeyboardFocus()` 返回 true 的 Slate 控件。

**Is Over Hit Test Visible Widget**

如命中结果下的控件的可视性设置使命中测试为可见状态，则返回 true。为 `GetVisibility().IsHitTestVisible()` 返回 true 的 Slate 控件。

**Is Over Interactable Widget**

如命中结果下的控件为交互式，则返回 true。为 `IsInteractble()` 返回 true 的 Slate 控件。

**Press and Release Key**

按下和松开虚拟键盘键。

**Press Key**

按下虚拟键盘键。不要将此项用于 `a-z\|A-Z`，因为 Slate 中的可编辑文本框之类的资源将在 **OnKeyChar** 被调用后发出通知，说明特定字符正发送到控件。在这些情况下使用 **SendKeyChar** 代替。

**Press Pointer Key**

模拟在鼠标/指针上按下键。多数情况下应用的键是鼠标按键，但也可以使用任意键。支持高级的使用情况，如发送其他键通知控件执行特殊操作。

**Release Key**

松开键盘上已松开的键。

**Release Pointer Key**

模拟在鼠标/指针上松开键，与 Press Pointer Key 相似。多数情况下应用的键是鼠标按键，但也可以使用任意键。

**Scroll Wheel**

对上一个命中结果下的控件发送一个滚轮事件。

**Send Key Char**

为字符串中列出的每个键模拟一个 OnKeyChar 事件，将列表中的字符传输到控件。

**Set Custom Hit Result**

设置自定义命中结果。如交互源设为自定义，这是唯一需要考虑的一点。

控件交互组件的属性也能以 getter 形式被获取，或通过 setter 节点进行设置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46f3f3bc-42d3-45e0-ac27-5f9fe5422801/widgetinteractionvariables.png)

-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [添加控件交互组件](/documentation/zh-cn/unreal-engine/umg-widget-interaction-components-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E6%8E%A7%E4%BB%B6%E4%BA%A4%E4%BA%92%E7%BB%84%E4%BB%B6)
-   [控件交互属性参考](/documentation/zh-cn/unreal-engine/umg-widget-interaction-components-in-unreal-engine#%E6%8E%A7%E4%BB%B6%E4%BA%A4%E4%BA%92%E5%B1%9E%E6%80%A7%E5%8F%82%E8%80%83)
-   [控件交互蓝图节点参考](/documentation/zh-cn/unreal-engine/umg-widget-interaction-components-in-unreal-engine#%E6%8E%A7%E4%BB%B6%E4%BA%A4%E4%BA%92%E8%93%9D%E5%9B%BE%E8%8A%82%E7%82%B9%E5%8F%82%E8%80%83)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)

[

构建你的UI

![构建你的UI](https://dev.epicgames.com/community/api/documentation/image/bfff3322-753d-44c0-bf75-87fb5eaf302a?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/building-your-ui-in-unreal-engine)