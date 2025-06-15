# 虚幻引擎中蓝图可视化脚本编辑器的蓝图接口用户界面。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-blueprint-interfaces-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:37:50.963Z

---

目录

![蓝图编辑器蓝图接口UI](https://dev.epicgames.com/community/api/documentation/image/1461def1-284c-45ae-b2b5-7f73c8f4e490?resizing_type=fill&width=1920&height=335)

**蓝图接口（Blueprint Interface）** 是一个或多个函数的集合 - 只有名称，没有实施 -  
可以添加到其他蓝图中。任何添加了该接口的蓝图都保证拥有这些函数。接口的函数 可以在添加它的每个蓝图中提供功能。在本质上，这类似于一般编程中的接口概念， 它允许多个不同类型的对象通过一个公共接口 共享和被访问。简单地说，蓝图接口允许不同的蓝图相互共享和发送数据。

内容创建者可以通过编辑器以与其他蓝图类似的方式创建蓝图接口， 但它们仍有一定的局限性，原因在于以下操作不可执行：

-   添加新变量
-   编辑图表
-   添加组件

## 蓝图接口编辑器UI

首次打开[蓝图接口](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine)时，该UI看起来极其简单，只包含以下部分：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c987f4d7-5cdf-4722-909f-e2ad91200121/interfacenumbered.png)

默认可见的UI组件

"窗口"（Window）菜单中可用的选项

1.  [菜单](/documentation/zh-cn/unreal-engine/menu-for-the-blueprints-visual-scripting-editor-in-unreal-engine)
2.  [工具栏](/documentation/zh-cn/unreal-engine/toolbar-in-the-blueprints-visual-scripting-editor-for-unreal-engine)
3.  [我的蓝图（My Blueprint）](/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine)
4.  [细节（Details）](/documentation/zh-cn/unreal-engine/details-panel-in-the-blueprints-visual-scriting-editor-for-unreal-engine)
5.  [图表编辑器（Graph Editor）](/documentation/zh-cn/unreal-engine/graph-editor-for-the-blueprints-visual-scripting-editor-in-unreal-engine)

-   [调试（Debug）](/documentation/zh-cn/unreal-engine/debug-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine)
-   [编译结果（Compiler Results）](/documentation/zh-cn/unreal-engine/compiler-results-in-the-blueprints-visual-scripting-editor-for-unreal-engine)
-   [查找结果（Find Results）](/documentation/zh-cn/unreal-engine/find-result-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine)

## 使用说明

需要注意的是，此时的图表视图与蓝图编辑器中通常提供的图表编辑器稍有不同。您可能会注意到，它显示为灰色，并且不能浏览，也不能在其中添加任何节点。这是因为它更多的是一种可视化工具，而不是编辑图表的方法。需要记住的是，接口本身不包含任何功能，因此此时无需创建实际能够运行的网络。可以将该视图视为输入和输出效果的预览。

有关创建和使用蓝图接口的更多信息，请参阅[蓝图接口](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine)。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [蓝图接口编辑器UI](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-blueprint-interfaces-in-unreal-engine#%E8%93%9D%E5%9B%BE%E6%8E%A5%E5%8F%A3%E7%BC%96%E8%BE%91%E5%99%A8ui)
-   [使用说明](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-blueprint-interfaces-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E)