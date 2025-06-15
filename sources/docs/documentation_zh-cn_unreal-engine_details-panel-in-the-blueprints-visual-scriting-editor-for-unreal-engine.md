# 虚幻引擎蓝图可视化脚本编辑器中的细节面板 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/details-panel-in-the-blueprints-visual-scriting-editor-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:37:55.003Z

---

目录

![蓝图编辑器细节面板](https://dev.epicgames.com/community/api/documentation/image/438bd036-4e2b-4462-8bc2-0ba112a9fea3?resizing_type=fill&width=1920&height=335)

**Details（细节）** 面板是一个情境关联的区域，使得可以在蓝图编辑器中编辑选中项的属性。它包含一个用于快速访问特定属性的搜索条，并且一般还会包含一个或多个可折叠的类目，用于组织其中所包含的属性。

**细节面板** 也是您处理很多蓝图编辑工作的地方，包括：

-   编辑[蓝图变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine)的过程，包括修改名称、类型、及该变量是否是一个数组。
-   点击蓝图属性（Blueprint Props）按钮后，实现[蓝图接口](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine)。
-   为[蓝图函数](/documentation/zh-cn/unreal-engine/functions-in-unreal-engine)添加输入和输出。
-   为选中的[组件](/documentation/zh-cn/unreal-engine/components-window-in-unreal-engine)添加[事件](/documentation/zh-cn/unreal-engine/events-in-unreal-engine)。

## 界面

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e20842a-07ae-41d1-bdd4-829aa73b6875/blueprintdetails2.png)

1.  **Search Filter（搜索过滤器）** - 输入您需要的属性的名称，这些属性就会显示在过滤器的下方。
2.  **Property Matrix（属性矩阵）** - 打开属性矩阵面板，以电子表格的形式编辑可用的属性。
3.  **Visibility Filter（可见性过滤器）** - 这允许您显示或隐藏已修改的属性或高级属性，以及合并或展开所有类目。
4.  **可折叠类目（Collapsible Categories）** - 用于给相关属性分组，可使用名称左边的白色小三角展开及折叠。

所有这些区域都是情境关联的。当这些区域中的其中一个区域不适合当前选中的项时，那个区域将会消失。比如，对于很多蓝图节点来说，看到基本上是空白的细节面板是正常的。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [界面](/documentation/zh-cn/unreal-engine/details-panel-in-the-blueprints-visual-scriting-editor-for-unreal-engine#%E7%95%8C%E9%9D%A2)