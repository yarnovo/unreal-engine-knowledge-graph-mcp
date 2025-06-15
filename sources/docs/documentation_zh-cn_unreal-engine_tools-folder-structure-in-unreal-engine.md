# 虚幻引擎中的工具文件夹结构 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/tools-folder-structure-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:08.088Z

---

目录

![工具文件夹结构](https://dev.epicgames.com/community/api/documentation/image/8455f812-4dc6-4900-a220-ff2da256ed28?resizing_type=fill&width=1920&height=335)

![内容浏览器中推荐的工具文件夹结构](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59641ab1-b701-47c6-b593-bd6a84f0f5ed/cb_tools.png)

**工具（Tools）** 文件夹包含自定义[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)和控件、[关卡快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine)筛选器和预设以及[远程控制](/documentation/zh-cn/unreal-engine/remote-control-for-unreal-engine)预设。以下列表描述各个工具。

-   蓝图工具A：每个使用的舞台蓝图有单独的文件夹，包含其源：
    
    -   BP\_Tool *或* WBP\_WidgetTool - 主蓝图。
        
    -   Enums - 蓝图中使用的相关枚举。
        
        -   E\_(Description)
    -   Structs - 蓝图中使用的相关结构体。
        
        -   F\_(Description)
    -   SubBlueprints - 仅当使用子蓝图时存在。
        
        -   BP\_(Description)
    -   SubWidgets - 仅当使用子控件蓝图时存在。
        
        -   WBP\_(Description)
-   Remote Control：使用的远程控制预设
    
    -   RCP\_(Description)
-   Common
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/faa858f5-6b5e-4bf8-b81e-338c537ca462/tools-chart.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/faa858f5-6b5e-4bf8-b81e-338c537ca462/tools-chart.png)

该图在内容浏览器中显示项目的推荐工具文件夹结构。

-   [content browser](https://dev.epicgames.com/community/search?query=content%20browser)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [level snapshots](https://dev.epicgames.com/community/search?query=level%20snapshots)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)