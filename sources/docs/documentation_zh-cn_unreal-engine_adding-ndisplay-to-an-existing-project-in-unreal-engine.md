# 在虚幻引擎中为现有项目添加nDisplay | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/adding-ndisplay-to-an-existing-project-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:27:32.742Z

---

目录

![为现有项目添加nDisplay](https://dev.epicgames.com/community/api/documentation/image/bfb6cf06-314d-4fae-bb7a-18af8c06e09f?resizing_type=fill&width=1920&height=335)

无需使用nDisplay模板项目便可通过nDisplay进行渲染。如拥有已设置内容的项目，可直接调整该项目以使用nDisplay。

要设置现有项目以使用nDisplay：

1.  启用nDisplay插件。  
    在虚幻编辑器中，在主菜单中选择 **编辑（Edit）>插件（Plugins）**。搜索"nDisplay"，并选中 **已启用（Enabled）** 复选框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d30b2d7d-e9a4-4f17-a48b-ebbe34a26d15/01-ndisplay-plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d30b2d7d-e9a4-4f17-a48b-ebbe34a26d15/01-ndisplay-plugin.png)
    
2.  启用项目的nDisplay。  
    在主菜单中选择 **编辑（Edit）>项目设置（Project Settings）**，找到 **插件（Plugins）> nDisplay** 部分。选中 **已启用（Enabled）** 复选框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66f1f8a4-2024-441e-8ee7-e444bda0d7f9/02-ndisplay-enabled.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66f1f8a4-2024-441e-8ee7-e444bda0d7f9/02-ndisplay-enabled.png)
    
3.  重新启动虚幻编辑器并重新打开项目。
    
4.  将生成的配置文件拖入 **内容浏览器**。它会被自动转换为 **UAsset**。或者，添加一个新的 **nDisplay配置** UAsset（位于 **nDisplay** 内容浏览器中的媒体分类中）
    
5.  浏览[快速入门指南](/documentation/zh-cn/unreal-engine/ndisplay-quick-start-for-unreal-engine)，继续学习剩余设置指南。
    

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [graphics](https://dev.epicgames.com/community/search?query=graphics)
-   [guide](https://dev.epicgames.com/community/search?query=guide)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)