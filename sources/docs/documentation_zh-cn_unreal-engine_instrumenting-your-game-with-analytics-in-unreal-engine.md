# 使用虚幻引擎中的分析功能检测游戏 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/instrumenting-your-game-with-analytics-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:47.562Z

---

目录

![检测游戏](https://dev.epicgames.com/community/api/documentation/image/bc1c3432-5937-44d9-866f-70d87ba96976?resizing_type=fill&width=1920&height=335)

下文的介绍主要针对早期版本的虚幻引擎。在虚幻引擎5中，iOS Apsalar不再可用。但这些介绍仍适用于其他分析框架。

捕获玩家滞留数据的第一步是为游戏注册分析服务商。这可通过项目的 `DefaultEngine.ini`文件完成。你必须注册一个默认服务商。或者，你也可以针对游戏的不同构建类型（开发、测试和生产）注册不同的服务商和帐户详情。下面是配置Apsalar插件的示例：

```cpp
	[Analytics]
	ProviderModuleName=IOSApsalar
	ApiKey=YourAnalyticsKey1
	ApiSecret=YourAnalyticsSecret1
	SendInterval=60

	[AnalyticsDevelopment]
	ApiKey=YourAnalyticsKey2
	ApiSecret=YourAnalyticsSecret2
	SendInterval=60

	[AnalyticsTest]
	ApiKey=YourAnalyticsKey3
	ApiSecret=YourAnalyticsSecret4
	SendInterval=60
```

`[Analytics]`部分是使用的默认项，你应在这里设置默认服务商模块的名称。在以上示例中，它被设置为属于4.5版本一部分的IOSApsalar插件。`ApiKey` 和 `ApiSecret` 字段来自Apsalar网站。创建帐户后，他们会向你提供密钥和使用秘诀。

项目配置完成后，你就可以开始记录分析事件。要仅获取基本玩家滞留数据，你需要在游戏启动时创建会话，并且在会话不再出现在前台时将其终止。可以使用以下所示的代码行或4.5及更高版本中提供的[蓝图分析插件](/documentation/404)完成此操作：

```cpp
	FAnalytics::Get().GetDefaultConfiguredProvider()->StartSession();
	FAnalytics::Get().GetDefaultConfiguredProvider()->EndSession();
```

由于这些调用属于游戏的一部分，你将自动开始收集玩家滞留数据。获得基本玩家滞留数据后，你可以开始添加更多事件，以便进一步了解游戏中玩家的行为。

-   [analytics](https://dev.epicgames.com/community/search?query=analytics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)