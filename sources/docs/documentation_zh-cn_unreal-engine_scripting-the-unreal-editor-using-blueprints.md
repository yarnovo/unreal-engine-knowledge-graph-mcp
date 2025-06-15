# 使用蓝图编写编辑器脚本 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints
> 
> 生成时间: 2025-06-14T20:35:21.154Z

---

目录

![使用蓝图编写编辑器脚本](https://dev.epicgames.com/community/api/documentation/image/b27e14d7-31e2-48a0-98b8-a132f81a8030?resizing_type=fill&width=1920&height=335)

蓝图可以为项目创建运行时Gameplay，还可以用于开发与项目内容交互的操作和工具。你可以在编辑器中按需运行蓝图图表，以处理资产，在关卡中布局内容，在编辑器用户界面UI中触发操作，或使用自定义UI面板扩展编辑器。

本页将介绍使用蓝图进行虚幻编辑器脚本编写和自动化的相关基础知识。

## 在编辑器中运行蓝图的选项

你可以使用一些技巧来设置和触发蓝图代码。

### 编辑器工具控件

编辑器工具控件是UMG控件，可在编辑器UI内的其他所有工具所用的同种可停靠面板中渲染此类控件。此方法最适用于打造功能丰富的UI来控制蓝图。可将UMG所有显示风格选项，与蓝图丰富的脚本编写控制结合使用。这是最灵活和最强大的选项，同时入门简单，推荐用于多数编辑器脚本编写工作。

欲了解创建编辑器工具控件并在编辑器中打开的方法详情，参阅[编辑器工具控件](/documentation/zh-cn/unreal-engine/editor-utility-widgets-in-unreal-engine).

[](/documentation/zh-cn/unreal-engine/editor-utility-widgets-in-unreal-engine)

[![编辑器工具控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34aed3d6-d4ca-49ba-acbd-bf2407d459f9/ue5_1-editor-utility-topic.png)](/documentation/zh-cn/unreal-engine/editor-utility-widgets-in-unreal-engine)

[编辑器工具控件](/documentation/zh-cn/unreal-engine/editor-utility-widgets-in-unreal-engine)

[介绍编辑器工具控件，以及如何创建它们。](/documentation/zh-cn/unreal-engine/editor-utility-widgets-in-unreal-engine)

### 编辑器工具蓝图

编辑器工具蓝图是一种特殊类，专门用于符合以下条件的逻辑：仅在虚幻编辑器中运行，不在运行时运行，且无需自定义UI。

这些类的一个内置用例是支持 *脚本化操作*。脚本化操作即在关卡中右键点击Actor或在内容浏览器中右键点击资源时，在快捷菜单中触发的图表。

欲了解详情，请参阅[脚本化操作](/documentation/zh-cn/unreal-engine/scripted-actions-in-unreal-engine)。

[](/documentation/zh-cn/unreal-engine/scripted-actions-in-unreal-engine)

[![脚本化操作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de57209a-eff3-407e-b5a5-f76c858dac4f/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/scripted-actions-in-unreal-engine)

[脚本化操作](/documentation/zh-cn/unreal-engine/scripted-actions-in-unreal-engine)

[创建可通过右键点击内容浏览器中的资产或关卡中的Actor来调用的蓝图。](/documentation/zh-cn/unreal-engine/scripted-actions-in-unreal-engine)

### 在编辑器中调用

在蓝图类中创建自定义事件或函数时，可在编辑器中将该事件或函数标记为可调用。若将该蓝图类的实例放置在关卡中并选中，可在 **细节（Details）** 面板中触发自定义事件或函数。此方法最适用于需同时在运行时和蓝图中处理蓝图。

欲了解详情，请参阅[在编辑器中调用蓝图](/documentation/zh-cn/unreal-engine/calling-blueprints-in-the-unreal-editor)。

[](/documentation/zh-cn/unreal-engine/calling-blueprints-in-the-unreal-editor)

[![在编辑器中调用蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/341d659d-9cd8-4918-9d73-34d2a6169077/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/calling-blueprints-in-the-unreal-editor)

[在编辑器中调用蓝图](/documentation/zh-cn/unreal-engine/calling-blueprints-in-the-unreal-editor)

[对在编辑器中使用时调用Actor上的蓝图事件和函数的方法进行讲解。](/documentation/zh-cn/unreal-engine/calling-blueprints-in-the-unreal-editor)

### 启动对象

可将项目中的特定编辑器工具控件类和编辑器工具蓝图类辨识为启动对象。编辑器加载项目时将自动创建各启动对象的实例并调用预定义函数。此选项适用于加载项目后利用蓝图类固定执行某些操作，或将蓝图逻辑固定绑定到编辑器中处理项目内容时发生的事件。

欲了解详情，请参阅[在编辑器启动时运行蓝图](/documentation/zh-cn/unreal-engine/running-blueprints-at-unreal-editor-startup)。

[](/documentation/zh-cn/unreal-engine/running-blueprints-at-unreal-editor-startup)

[![在编辑器启动时执行蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c404b1b-47f4-4d11-9da6-01003dc9388e/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/running-blueprints-at-unreal-editor-startup)

[在编辑器启动时执行蓝图](/documentation/zh-cn/unreal-engine/running-blueprints-at-unreal-editor-startup)

[对定义编辑器启动时调用的蓝图函数的方法进行讲解。](/documentation/zh-cn/unreal-engine/running-blueprints-at-unreal-editor-startup)

## 访问纯编辑器蓝图节点

在允许时，涉及修改资源文件或使用虚幻编辑器UI的多数操作无法在游戏中运行。因此，只能在同为纯编辑器的蓝图类中访问此类纯编辑器功能，即在模块中定义且类型设为 `Editor` 的函数。

例如，若利用派生自可在运行时使用的父类（如基础 **Actor** 类）的蓝图类，蓝图编辑器的 **编辑器脚本编写（Editor Scripting）** 类别下将列出有限的函数集。但若创建派生自纯编辑器父类的编辑器工具蓝图、编辑器工具控件或普通蓝图类，将显示更多、更全面的可用函数集：

 

 

![Actor类的编辑器脚本编写节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1a3af1f-0f81-47f4-8ca8-019206e3722e/01_bp_nonutility.png "Editor Scripting nodes for the Actor class")

![Editor Scripting nodes for the EditorUtilityActor class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/778ff1de-9abd-454f-ac77-d5bde6b58e3f/02_bp_utility.png "Editor Scripting nodes for the EditorUtilityActor class")

Actor类

EditorUtilityActor类

若已安装编辑器脚本编写插件，可在此处找到该插件公开函数，用于使用静态网格和其他资源类型。参阅[编辑器脚本编写和自动化](/documentation/zh-cn/unreal-engine/scripting-and-automating-the-unreal-editor)。

## 编辑器工具子系统

启动时，虚幻编辑器将初始化专门用于管理编辑器脚本编写功能行为的子系统。例如，此子系统处理生成和清理如[启动对象](/documentation/zh-cn/unreal-engine/running-blueprints-at-unreal-editor-startup)等操作，并处理[编辑器工具控件](/documentation/zh-cn/unreal-engine/editor-utility-widgets-in-unreal-engine)的新编辑器面板的创建和销毁。

你也可以在自己的C++或蓝图代码中使用编辑器工具子系统。例如，可获取编辑器工具子系统，并调用其 `SpawnAndRegisterTab()` 方法，以在编辑器UI中程序化打开新面板，此面板包含项目中编辑器工具控件类的实例。

欲了解子系统及在C++、蓝图和Python中访问和使用的方法详情，参阅[编程子系统](/documentation/zh-cn/unreal-engine/programming-subsystems-in-unreal-engine)。

## 可脚本化工具系统

**可脚本化工具（Scriptable Tools）** 系统提供了创建自定义交互式工具所需的函数和编辑器模式。可脚本化工具插件向蓝图公开了 **交互式工具框架（Interactive Tools Framework）**，为创作者和技术美术提供了设计工具的方法。

更多详情，请参阅[可脚本化工具系统](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine)。

[](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine)

[![可脚本化工具系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2a9d22a-f6c3-4e69-b384-ae09a5f111c7/scriptable-tool-topic.png)](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine)

[可脚本化工具系统](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine)

[关于使用可脚本化工具系统和编辑器模式创建自定义交互式工具的概述。](/documentation/zh-cn/unreal-engine/scriptable-tools-system-in-unreal-engine)

-   [editor](https://dev.epicgames.com/community/search?query=editor)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [scripting](https://dev.epicgames.com/community/search?query=scripting)
-   [blueprint utilities](https://dev.epicgames.com/community/search?query=blueprint%20utilities)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在编辑器中运行蓝图的选项](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%90%E8%A1%8C%E8%93%9D%E5%9B%BE%E7%9A%84%E9%80%89%E9%A1%B9)
-   [编辑器工具控件](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints#%E7%BC%96%E8%BE%91%E5%99%A8%E5%B7%A5%E5%85%B7%E6%8E%A7%E4%BB%B6)
-   [编辑器工具蓝图](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints#%E7%BC%96%E8%BE%91%E5%99%A8%E5%B7%A5%E5%85%B7%E8%93%9D%E5%9B%BE)
-   [在编辑器中调用](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%B0%83%E7%94%A8)
-   [启动对象](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints#%E5%90%AF%E5%8A%A8%E5%AF%B9%E8%B1%A1)
-   [访问纯编辑器蓝图节点](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints#%E8%AE%BF%E9%97%AE%E7%BA%AF%E7%BC%96%E8%BE%91%E5%99%A8%E8%93%9D%E5%9B%BE%E8%8A%82%E7%82%B9)
-   [编辑器工具子系统](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints#%E7%BC%96%E8%BE%91%E5%99%A8%E5%B7%A5%E5%85%B7%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [可脚本化工具系统](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints#%E5%8F%AF%E8%84%9A%E6%9C%AC%E5%8C%96%E5%B7%A5%E5%85%B7%E7%B3%BB%E7%BB%9F)