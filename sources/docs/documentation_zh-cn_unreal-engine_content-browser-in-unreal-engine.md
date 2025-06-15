# 虚幻引擎中的内容浏览器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:52:14.463Z

---

目录

![内容浏览器](https://dev.epicgames.com/community/api/documentation/image/8bb56cc1-def9-4bf6-9cb0-638693152c51?resizing_type=fill&width=1920&height=335)

**内容浏览器（Content Browser）** 是虚幻编辑器的主要区域，用于在虚幻项目中创建、导入、整理、查看和修改内容资产。你还可以使用它管理内容文件夹，并执行专有资产操作，例如：

-   前往浏览项目中的所有资产并与之交互。
    
-   使用文本筛选器查找资产，你可以选择将其与更高级的筛选功能结合使用。
    
-   将资产整理到私有、本地或共享集合中。
    
-   识别可能存在问题的资产。
    
-   在内容文件夹之间迁移资产，或迁移到不同的项目。
    

要了解有关每项操作的更多信息，请参阅此页面上的内容浏览器主题（Content Browser Topics）小节。

## 访问内容浏览器

可以通过以下三种方式打开内容浏览器：

1.  使用顶部菜单栏中的 **窗口（Window）** 菜单。
    
    ![从Windows菜单打开内容浏览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92a3aa8c-2db4-4eec-8f77-5aca955258f5/content-browser-windows-menu.png)
2.  使用主工具栏（Main Toolbar）上的 **创建（Create）** 菜单。
    
    ![从内容菜单打开内容浏览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4966caf-d41f-4fbb-b549-941accd099a3/content-browser-content-menu.png)
3.  点击编辑器底部工具栏上的 **内容侧滑菜单（Content Drawer）** 按钮。这会打开临时的内容浏览器（Content Browser），然后你可以停靠到编辑器窗口。要了解更多信息，请参阅此页面上的内容侧滑菜单（Content Drawer）小节。
    
    ![打开内容侧滑菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d49094b-4b35-45f6-a14f-c3a340955971/content-drawer-button.png)

你可以同时打开最多四个内容浏览器实例。例如，如果你要执行以下操作，这很有用：

-   在不同的内容浏览器（Content Browser）中筛选不同的资产类型，例如一个只显示静态网格体，另一个只显示材质。
    
-   在项目的不同文件夹之间迁移资产。
    

默认情况下， **内容浏览器（Content Browser）** 停放在虚幻编辑器（Unreal Editor）窗口的底部。你可以点击并拖动，将其重新停靠在编辑器中的任何位置，或使其成为浮动窗口。你还可以右键点击内容浏览器（Content Browser）选项卡，并选择 **移至侧边栏（Move to Sidebar）** ，这样内容浏览器（Content Browser）会折叠到虚幻编辑器（Unreal Editor）窗口左侧边栏中的可点击选项卡。

## 内容侧滑菜单

**内容侧滑菜单（Content Drawer）** 是内容浏览器的特殊实例，其行为略有不同。要打开它，请执行以下任一操作：

-   点击编辑器底部栏上的 **内容侧滑菜单（Content Drawer）** 按钮。
    
-   使用键盘快捷键 **Ctrl + 空格键（Ctrl + Space Bar）** （Windows）或 **Cmd + 空格键（Cmd + Space Bar）**（macOS）。
    

内容侧滑菜单（Content Drawer）在失焦（即，当你点击离开它时）时会自动最小化。要使其保持打开状态，请点击 **停靠在布局中（Dock in Layout）** 按钮。这会创建内容浏览器的新实例，但你仍然可以打开新的内容侧滑菜单（Content Drawer）。

![内容侧滑菜单上的停靠在布局中按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5e1e269-a72e-4fc7-95e8-00e6f7a9c483/dock-in-layout-button.png)

内容侧滑菜单（Content Drawer）中的 停放在布局中（Dock in Layout） 按钮。

## 内容浏览器主题

请查阅下文，进一步了解内容浏览器。

[](/documentation/zh-cn/unreal-engine/content-browser-interface-in-unreal-engine)

[![内容浏览器界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97160233-5e7c-450f-aa4e-444c5c65824a/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/content-browser-interface-in-unreal-engine)

[内容浏览器界面](/documentation/zh-cn/unreal-engine/content-browser-interface-in-unreal-engine)

[介绍内容浏览器界面和功能。](/documentation/zh-cn/unreal-engine/content-browser-interface-in-unreal-engine)

[

![源面板参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f22f3aa3-9e0e-4382-b3c6-7e4946aef08c/placeholder_topic.png)

源面板参考

在内容浏览器中使用源面板的参考





](/documentation/zh-cn/unreal-engine/sources-panel-reference-in-unreal-engine)[

![内容浏览器设置参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12882f6a-d1f3-44e2-8afe-cf46eb4faa1d/placeholder_topic.png)

内容浏览器设置参考

调整内容浏览器的缩略图显示、资产筛选以及其他方面。





](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine)[

![筛选器和集合](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d05d346-4fe0-4d3d-a1fc-14311ccca26b/placeholder_topic.png)

筛选器和集合

使用筛选器和集合在内容浏览器中对资产进行排序和分组。





](/documentation/zh-cn/unreal-engine/filters-and-collections-in-unreal-engine)[

![高级搜索语法](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/649e4267-b0ab-4241-9c4e-8df692e1922a/advanced-search-content-browser.png)

高级搜索语法

介绍在内容浏览器中可以使用的高级搜索运算符。





](/documentation/zh-cn/unreal-engine/advanced-search-syntax-in-unreal-engine)

-   [content browser](https://dev.epicgames.com/community/search?query=content%20browser)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine#%E8%AE%BF%E9%97%AE%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [内容侧滑菜单](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine#%E5%86%85%E5%AE%B9%E4%BE%A7%E6%BB%91%E8%8F%9C%E5%8D%95)
-   [内容浏览器主题](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine#%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8%E4%B8%BB%E9%A2%98)