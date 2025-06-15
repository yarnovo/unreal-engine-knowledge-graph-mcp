# 虚幻编辑器的脚本与自动化 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/scripting-and-automating-the-unreal-editor
> 
> 生成时间: 2025-06-14T20:34:58.628Z

---

目录

![编辑器的脚本与自动化](https://dev.epicgames.com/community/api/documentation/image/64e83938-fe5a-4f24-8417-27c1829cee70?resizing_type=fill&width=1920&height=335)

在虚幻编辑器用户界面中，可以使用各种各样的可视化工具来设置项目，设计和构建关卡，创建游戏性交互等等。但有些时候，当你确定了需要编辑器执行的操作后，可能想要通过编程方式调用它的工具和命令——以可重复使用的脚本或是自行构建接口来驱动编辑器的方式。

这有助于：

-   减少或消除再三重复执行相同系列的任务的需求，
-   自动化或随机化在关卡中放置、布局和设置Actor的过程，
-   创建你自己的资源导入和管理流程，
-   与其他第三方应用程序和流程脚本互操作，
-   扩展编辑器，增加为满足项目或内容需求专门定制的额外工具甚至UI。

本部分的页面向你展示如何使用[蓝图](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints)、[Python](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python)和[远程控制HTTP](/documentation/zh-cn/unreal-engine/remote-control-for-unreal-engine)运行这些种类的编辑器内脚本。

## 安装编辑器脚本实用程序（Editor Scripting Utilities）插件

无论你计划使用什么语言或系统来进行编辑器自动化，几乎肯定需要安装 **编辑器脚本实用程序（Editor Scripting Utilities）** 插件。该插件简化了许多需要在编辑器中执行的最常见的操作，也可以处理一些不常见的极端情况，使你无需了解编辑器工作原理的所有内部细节就可以执行一些从概念上来说很简单的任务。

要安装该插件：

1.  在主菜单中，选择 **编辑器（Editor） > 插件（Plugins）** 来打开 **插件（Plugins）** 窗口。
    
    ![Open Plugins window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c85ff41-e594-4f43-a50d-893ca315baca/01-edit-plugins_ue5.png "Open Plugins window")
2.  在 **脚本（Scripting）** 类别下，找到 **编辑器脚本实用程序（Editor Scripting Utilities）** 条目并选中其 **启用（Enabled）** 框。
    
    ![Enable the Editor Scripting Utilities plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/316f1866-bddb-41af-b6df-90c8a65a205f/02-enable-editor-scripting-plugin_ue5.png "Enable the Editor Scripting Utilities plugin")
3.  如果希望使用 Python，也可以在该窗口中选中Python插件的 **启用（Enabled）** 框。有关更多信息，请参阅[使用Python脚本化编辑器](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python)。
4.  重启编辑器并重新加载项目。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [python](https://dev.epicgames.com/community/search?query=python)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [scripting](https://dev.epicgames.com/community/search?query=scripting)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [安装编辑器脚本实用程序（Editor Scripting Utilities）插件](/documentation/zh-cn/unreal-engine/scripting-and-automating-the-unreal-editor#%E5%AE%89%E8%A3%85%E7%BC%96%E8%BE%91%E5%99%A8%E8%84%9A%E6%9C%AC%E5%AE%9E%E7%94%A8%E7%A8%8B%E5%BA%8F%EF%BC%88editorscriptingutilities%EF%BC%89%E6%8F%92%E4%BB%B6)