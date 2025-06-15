# 虚幻引擎的文件日志记录分析服务商 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/file-logging-analytics-provider-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:57.649Z

---

目录

![文件日志记录分析服务商](https://dev.epicgames.com/community/api/documentation/image/51f19f71-81f1-469f-8da0-2a55c3d09cc4?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9786b269-3952-453b-992d-6d835203e69d/image00.png)

此服务商可使用JSON格式将分析API调用写入到磁盘。使用此服务商是为了调试分析过程。它会将数据写入到 `Saved/Analytic` 文件夹，为每个文件指定以 `.analytics` 结尾的唯一名称。然后，你可以将此文件中保存的数据与分析服务商操作面板上的事件进行比较， 确保所有数据正在处理中。此服务商没有任何特殊的配置设置。

此服务商会将每个会话的数据写入到磁盘，这将导致发布的游戏或应用中的数据日益增加。我们建议你仅将此服务商用于开发，不要将其包含在发布的产品中。

下图显示的是测试4.8 API添加时创建的文件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/647d475a-c9d4-4a87-a75b-529754cc0134/image01.png)

-   [analytics](https://dev.epicgames.com/community/search?query=analytics)
-   [file logging](https://dev.epicgames.com/community/search?query=file%20logging)
-   [file logging analytics](https://dev.epicgames.com/community/search?query=file%20logging%20analytics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)