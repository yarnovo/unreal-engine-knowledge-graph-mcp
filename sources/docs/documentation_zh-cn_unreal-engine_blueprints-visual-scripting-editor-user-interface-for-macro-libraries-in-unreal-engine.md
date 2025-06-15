# 虚幻引擎蓝图可视化脚本编辑器中的宏库UI | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-macro-libraries-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:37:50.726Z

---

目录

![蓝图编辑器宏库UI](https://dev.epicgames.com/community/api/documentation/image/e66c24dd-8784-4426-814d-fdb55699432c?resizing_type=fill&width=1920&height=335)

**蓝图宏库（Blueprint Macro Library）** 是一个容器，它包含一组 **宏** 或自包含的图表，这些图表可以 作为节点放置在其他蓝图中。它们可以节省时间，因为它们可以存储常用的节点序列， 包括执行和数据传输所需的输入和输出。

宏在引用它们的所有图表之间共享，但是它们会自动扩展到图表中， 就像它们在编译期间是一个折叠节点那样。这意味着蓝图宏库不需要编译。但是， 对宏的更改仅反映在重新编译包含这些图表的蓝图时 引用该宏的图表中。

如需了解宏库的更多内容和使用方法，请查阅 \[\]programming-and-scripting/blueprints-visual-scripting/UserGuide/Types/MacroLibrary) 文档。

## 界面

和蓝图界面相同，打开宏库的蓝图编辑器后可看到一个不带图表的简化UI：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bb8feab-2c96-4902-932c-6df687f37f22/macrolibraryuiclean.png)

默认可见UI组件

窗口菜单中可选

1.  [菜单](/documentation/zh-cn/unreal-engine/menu-for-the-blueprints-visual-scripting-editor-in-unreal-engine)
2.  [工具栏](/documentation/zh-cn/unreal-engine/toolbar-in-the-blueprints-visual-scripting-editor-for-unreal-engine)
3.  [我的蓝图](/documentation/zh-cn/unreal-engine/my-blueprint-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine)
4.  [细节](/documentation/zh-cn/unreal-engine/details-panel-in-the-blueprints-visual-scriting-editor-for-unreal-engine)
5.  [图表编辑器](/documentation/zh-cn/unreal-engine/graph-editor-for-the-blueprints-visual-scripting-editor-in-unreal-engine)

-   [调试](/documentation/zh-cn/unreal-engine/debug-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine)
-   [搜索运算结果](/documentation/zh-cn/unreal-engine/find-result-panel-in-the-blueprints-visual-scripting-editor-for-unreal-engine)
-   [面板](/documentation/zh-cn/unreal-engine/palette-in-the-bleprints-visual-scripting-editor-for-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [界面](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-macro-libraries-in-unreal-engine#%E7%95%8C%E9%9D%A2)