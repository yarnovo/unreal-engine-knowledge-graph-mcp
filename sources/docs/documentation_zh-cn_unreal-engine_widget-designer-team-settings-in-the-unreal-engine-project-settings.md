# 虚幻引擎项目设置中的控件设计器（Team）设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/widget-designer-team-settings-in-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:55:42.980Z

---

目录

![控件设计器（Team）设置](https://dev.epicgames.com/community/api/documentation/image/2b4ffdbb-4f60-47f1-9db3-db0a6599c1dc?resizing_type=fill&width=1920&height=335)

## 控件设计器（Team）

控件是一种类，表示单个菜单或者屏幕中的元素。你可以在内容浏览器中定义他们并在UMG中构建，既包含一个WYSIWYG设计器也包含一个蓝图图表。

### 编译器

**部分**

**描述**

**允许蓝图Tick（Allow Blueprint Tick）**

如果禁用该项，这些编译器选项所影响的控件不会对 **Event Tick** 事件做出响应。

**允许蓝图绘制（Allow Blueprint Paint）**

如果禁用该项，这些编译器选项所影响的控件不会覆盖 **On Paint** 函数。

**属性绑定规则（Property Binding Rule）**

该设置控制是否让引擎在控件中使用属性绑定。

使用属性绑定可能会大幅影响性能。

你可以选择以下选项：

-   **允许（Allow）:** 允许自由使用属性绑定。
-   **阻止（Prevent）:** 该选项阻止任何新的属性绑定，但是你仍然可以用属性绑定编辑控件。所有没有绑定的现有控件都不会显示按钮。
-   **阻止并告警（Prevent and Warn）:** 该选项会阻止任何新的属性绑定，并且当引擎编译任何已有绑定的时候显示警告。
-   **阻止并报错（Prevent and Error）:** 该选项会阻止任何新的属性绑定，且当引擎编译任何已有绑定的时候报错。

**规则（Rules）**

自定义控件编译器规则类，用C++编写。你可以通过扩展 `UWidgetCompilerRule` 类来进行创建，位于 `WidgetCompilerRule.h` 中。这些类会包含一个 `ExecuteRule` 函数，在编译控件蓝图的时候运行。

你可以使用该规则列表来在控件最终化和编译之前执行一些自定义代码。

**目录编译器选项（Directory Compiler Options）**

允许蓝图Tick、允许蓝图绘制、属性绑定规则以及自定义规则，可以选择在特定项目目录中进行设置。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [控件设计器（Team）](/documentation/zh-cn/unreal-engine/widget-designer-team-settings-in-the-unreal-engine-project-settings#%E6%8E%A7%E4%BB%B6%E8%AE%BE%E8%AE%A1%E5%99%A8%EF%BC%88team%EF%BC%89)
-   [编译器](/documentation/zh-cn/unreal-engine/widget-designer-team-settings-in-the-unreal-engine-project-settings#%E7%BC%96%E8%AF%91%E5%99%A8)