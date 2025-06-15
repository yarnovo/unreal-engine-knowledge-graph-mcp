# 虚幻引擎蓝图可视化脚本编辑器中的搜索结果面板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/find-result-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:38:22.374Z

---

目录

![蓝图编辑器搜索结果面板](https://dev.epicgames.com/community/api/documentation/image/75baa367-1095-4700-bfe1-e93c83b32e61?resizing_type=fill&width=1920&height=335)

**Find Results（搜索结果）** 面板是蓝图编辑器中的一个强大的搜索工具，允许您快速地基于以下条件来追踪各种对象：

-   Node name（节点名称）
-   Pin name（引脚名称）
-   Node Comment（节点注释）
-   Property name（属性名称）
-   Property value（属性值）

当 **搜索结果** 面板跟踪搜索匹配项时，它将会显示一个结果列表，每项结果就像一个超链接，可以让图表视图跳转到对应的节点上。当需要跟踪可能深埋于复杂的蓝图脚本节点网络中的特定节点或一段信息时，这是一种非常好的方法。

和在网页浏览器中搜索类似，当在蓝图编辑器中工作时，按下 **Ctrl-F** 可以调出 **搜素结果** 面板。默认情况下，该面板出现在 **图表** 面板的底部。如果 **Compiler Results(编译结果)** 面板正在显示中，那么 **搜索结果** 面板将停靠在它的旁边。

和虚幻引擎4中的很多搜索文本框不同，当您输入文本时，搜索结果面板不会动态地过滤结果，因为这可能会出现大量的结果。一旦您按下 *回车* 键后，搜索结果列表将会出现。

## 界面

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acdb3ea9-5fdb-44fb-9e57-56bc7bec8f91/findresults.png)

1.  **Results list(结果列表)** -这里列出了和搜索条件匹配的所有节点、引脚、属性名称、注释及属性值。
2.  **Search filter（搜索过滤器）** - 这是您输入您要查找的信息的地方。
3.  **Property values（属性值）** - 明确设置的属性值出现在结果中间位置处的圆括号内。
4.  **Comments（注释）** - 如果存在节点注释，那么它们以黄色文本的形式出现在面板的右侧。
5.  **Find in Current Blueprint Only（仅在当前蓝图中搜索）** - 当启用该项时，搜索仅限于当前蓝图。当禁用该项时，搜索时会查找项目中的所有蓝图。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [界面](/documentation/zh-cn/unreal-engine/find-result-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine#%E7%95%8C%E9%9D%A2)