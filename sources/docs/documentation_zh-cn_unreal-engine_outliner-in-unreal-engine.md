# 虚幻引擎中的大纲视图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:55.582Z

---

目录

![大纲视图](https://dev.epicgames.com/community/api/documentation/image/84bab695-3833-4420-bd98-0ec0e0053e64?resizing_type=fill&width=1920&height=335)

**大纲视图（Outliner）** 面板用层级树形视图显示场景中的所有Actor。使用大纲视图，你可以：

-   选择和修改Actor。
-   按名称、类型和其他特征搜索和筛选Actor。
-   使用高级搜索运算符进一步优化Actor搜索。
-   自定义要显示哪些Actor信息。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8beb10fb-aaa5-41c6-b6d3-b4f7f78642cf/ue5_1-outliner-in-context.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8beb10fb-aaa5-41c6-b6d3-b4f7f78642cf/ue5_1-outliner-in-context.png)

默认情况下， 大纲视图（Outliner） 位于虚幻编辑器（Unreal Editor）窗口的右侧。点击查看大图。

你最多可以拥有四个大纲视图实例，可以单独为每个实例自定义设置。要在不同大纲视图实例之间切换，请右键点击"大纲视图（Outliner）"选项卡并选择不同的大纲视图，或从虚幻引擎的主菜单转至 **窗口（Window） > 大纲视图（Outliner）** 进行切换。

![多个大纲视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d85554ac-3338-4a7f-90e3-a7a22f4412a4/ue5_1-multiple-outliners.png)

在不同的大纲视图实例之间切换。

## 大纲视图操作

你可以在大纲视图中对Actor执行以下操作：

**操作**

**说明**

**左键单击**

选择该Actor。

**右键单击**

显示在视口中右键点击Actor所弹出的相同上下文菜单。用于快速修改Actor，而不必在视口中寻找该Actor。

**左键单击并拖动**

将所拖动的Actor附加到另一个Actor。

**F** 键盘快捷方式

在大纲视图中选择Actor后：在视口中聚焦该Actor。 在视口中选择Actor后：在大纲视图中将Actor列表滚动到所选Actor。

## 在大纲视图中搜索和筛选

使用大纲视图中的 **搜索** 框搜索并快速筛选场景中的Actor列表。默认情况下，搜索会显示与搜索词部分匹配的所有Actor。如果你使用多个搜索词，只有匹配所有词的Actor才会显示。

在大纲视图中搜索时，你可以使用所有[高级搜索语法](/documentation/zh-cn/unreal-engine/advanced-search-syntax-in-unreal-engine)运算符。

最常见的一些运算符有：

运算符

操作

示例

`-`

排除与特定词匹配的Actor。

`-Sky`

`+`

强制词完全匹配，而不是部分匹配。

`+Sky` 将匹配 `Sky`，但排除 `Skylight`

你可以将搜索保存为 **自定义筛选器** ，并从 **筛选器（Filter）** 下拉菜单的 **自定义筛选器（Custom Filters）** 类别访问自定义筛选器。每个用户的自定义筛选器将全局保存，这意味着，用户只要创建了自定义筛选器，就可以在所有目录和项目中使用。

![大纲视图中的筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/843eab46-38c6-44b2-a427-9785542ec044/ue5_1-custom-filters-outliner.png)

大纲视图中的筛选器菜单。

在大纲视图中 **筛选（Filtering）** Actor的方式与在内容浏览器中[筛选资产](/documentation/zh-cn/unreal-engine/filters-and-collections-in-unreal-engine)的方式相同。

## 自定义大纲视图

**右键点击** 列标题弹出上下文菜单，启用或禁用列名称旁边的复选框，即可选择要在大纲视图中显示或隐藏的列。

![显示和隐藏大纲视图列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6720a908-336d-4ca3-a6a2-46309d37cc57/ue5_1-show-hide-outliner-columns.png)

显示和隐藏大纲视图列。

搜索会匹配大纲视图中所有列中的词，无论它们是否可见。

**左键单击并拖动** 列标题边缘，可调整该列的大小。

当你在视口中选择Actor时，大纲视图总是会滚动到该Actor。从大纲视图的 **设置（Settings）** 菜单切换 **总是帧选择（Always Frame Selection）** ，可禁用该行为。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43faf42b-00bb-4973-a5b5-91922f6d27eb/ue5_1-center-actor.gif)

"总是帧选择（Always Frame Selection）"选项在切换为开或关时的动画演示。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [building virtual worlds](https://dev.epicgames.com/community/search?query=building%20virtual%20worlds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [大纲视图操作](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine#%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE%E6%93%8D%E4%BD%9C)
-   [在大纲视图中搜索和筛选](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine#%E5%9C%A8%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE%E4%B8%AD%E6%90%9C%E7%B4%A2%E5%92%8C%E7%AD%9B%E9%80%89)
-   [自定义大纲视图](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE)