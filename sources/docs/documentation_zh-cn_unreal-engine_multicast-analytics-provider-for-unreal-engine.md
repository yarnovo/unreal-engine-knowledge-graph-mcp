# 虚幻引擎的多播分析服务商 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/multicast-analytics-provider-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:51.079Z

---

目录

![多播分析服务商](https://dev.epicgames.com/community/api/documentation/image/be1ebfa0-76e9-40c0-b5f9-e5780b990dcc?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/625f3006-85c8-4522-b53f-1cd5c4a7a2b3/image00.png)

多播服务商向多个服务商发送分析事件。这可让你轻松使用多个分析服务商，因为它可将调用轮流交给每个注册的分析服务商， 无需你手动执行此分派工作。拥有多个分析服务商是可取的做法，因为每个服务商 拥有不同的优势和劣势。通过使用多个服务商，你可以获取运营应用程序业务所需的所有功能。

## 配置

配置服务商非常直接。只需要知道你要发送数据至的服务商列表即可。此列表的以逗号分隔的列表形式提供， 其中列出了服务商的模块名称。在以下示例中，AnalyticsMulticast服务商被指定为应用程序的默认服务商。之后，它采用上述逗号分隔的列表形式指定 发送数据至的服务商列表。对于所有分析服务商，配置数据将保存到 `DefaultEngine.ini`文件。

\[Analytics\] ProviderModuleName=AnalyticsMulticast ProviderModuleNames=FileLogging,IOSFlurry,IOSApsalar

-   [analytics](https://dev.epicgames.com/community/search?query=analytics)
-   [multicast](https://dev.epicgames.com/community/search?query=multicast)
-   [multicast analytics](https://dev.epicgames.com/community/search?query=multicast%20analytics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置](/documentation/zh-cn/unreal-engine/multicast-analytics-provider-for-unreal-engine#%E9%85%8D%E7%BD%AE)