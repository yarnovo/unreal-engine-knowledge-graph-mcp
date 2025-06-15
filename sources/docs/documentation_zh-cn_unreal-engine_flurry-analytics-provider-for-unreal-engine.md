# 虚幻引擎Flurry分析供应商 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/flurry-analytics-provider-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:48.698Z

---

目录

![Flurry分析供应商](https://dev.epicgames.com/community/api/documentation/image/0f4efcdf-469f-4ede-9a5e-e0e6208b2051?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e2e808f-7c35-4a37-a511-2e99e42382e6/flurry.png)

[Flurry](http://www.flurry.com) 是广泛使用的免费分析服务。由于使用非常广泛，它可以将你的应用程序数据与相同类别的其他应用程序进行比较。这可让你快速了解游戏的表现以及你可能需要关注的领域。要使用此服务，你必须在服务商的网站注册，获得唯一标识你的应用程序的应用程序密钥，然后下载已编译到Flurry插件的库。请查看该插件相应的 `<PlatformAndName>.Build.cs` 文件，以了解应将库和头文件置于何处。

## 配置

完成先决条件并且成功为目标平台编译插件后，你就可以为游戏配置插件。自4.8版本起，只有一个要设置的配置属性：唯一识别你游戏的密钥。以下代码段展示了一个理论上的Flurry配置。与所有分析服务商一样，配置数据将保存到您的 `DefaultEngine.ini` 文件。

```cpp
	[Analytics]
	FlurryApiKey=RANDOM34LETTERS4511
```

-   [analytics](https://dev.epicgames.com/community/search?query=analytics)
-   [flurry](https://dev.epicgames.com/community/search?query=flurry)
-   [flurry analytics](https://dev.epicgames.com/community/search?query=flurry%20analytics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置](/documentation/zh-cn/unreal-engine/flurry-analytics-provider-for-unreal-engine#%E9%85%8D%E7%BD%AE)