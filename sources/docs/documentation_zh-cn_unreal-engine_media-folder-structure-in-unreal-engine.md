# 虚幻引擎中的媒体文件夹结构 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/media-folder-structure-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:37.481Z

---

目录

![媒体文件夹结构](https://dev.epicgames.com/community/api/documentation/image/a4ee1335-464c-424d-8a25-4be4aff9eab7?resizing_type=fill&width=1920&height=335)

![内容浏览器中推荐的媒体文件夹结构](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57fae627-5e2f-4ef7-a367-aee4b999f1a1/cb_media.png)

**媒体（Media）** 文件夹包括与在制片中使用媒体相关的所有文件。本分段中的某些文件将由[媒体框架](/documentation/zh-cn/unreal-engine/media-framework-in-unreal-engine)插件在内容浏览器的根级别自动填充。这里的文件夹由媒体配置文件在后台使用，但你在几乎所有情况下都不应该直接使用这些文件夹。

-   Bundles - 由媒体框架插件在内容根级别自动填充。
    
-   Proxies - 由媒体框架插件在内容根级别自动填充。
    
-   MediaOutputs
    
-   MediaProfiles
    
    -   MPR\_(Description1)
        
    -   MPR\_(Description2)
        
-   MediaSources - 与媒体内容相关的所有Actor，每个媒体源有单独的文件夹。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d9a90a5-26ea-4178-a85e-66412e6e8260/media-chart.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d9a90a5-26ea-4178-a85e-66412e6e8260/media-chart.png)

该图显示了内容浏览器中推荐使用的媒体目录结构。

-   [content browser](https://dev.epicgames.com/community/search?query=content%20browser)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)