# 虚幻引擎中的Live Link插件开发 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/live-link-plugin-development-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:24.215Z

---

目录

![Live Link插件的开发](https://dev.epicgames.com/community/api/documentation/image/d0315fcb-0d2a-4276-bcb7-8d8d7f069d18?resizing_type=fill&width=1920&height=335)

Live Link中有两种集成方式：

-   构建一个虚幻引擎插件并将一个新源公开到Live Link。

如果已有自己的流协议，建议使用此方法。

-   将一个消息总线（Message Bus）端点集成到第三方软件中，允许其作为内置消息总线源的数据发送器。

针对我们的Maya和Motionbuilder插件，我们采用了此方法。

如果您的机器中不止一张网卡，且想要指定用来接受数据的网卡，就需要在项目设置中指定[**单播断点**](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine#udp%E4%BF%A1%E6%81%AF)。

## Live Link源

Live Link源将动画数据提供给Live Link客户端。源插件需要提供以下项目：

-   源工厂 `基类ULiveLinkSourceFactory`

这是Live Link了解其可使用的源的方式。源工厂必须是一个UObject，并派生自ULiveLinkSourceFactory。此工厂提供各个函数以创建源，并创建自定义编辑器UI以供创建源。源工厂由客户端自动挑选（没有手动注册流程）。

您的源工厂必须覆盖以下函数：

-   `GetSourceDisplayName` - 返回源名称的本地化字符串
-   `GetSourceTooltip` - 返回源UI提示文本的本地化字符串
-   `CreateSourceCreationPanel` - 返回要用于创建源的slate控件的参考。
-   `OnSourceCreationPanelClosed` - 当客户端完成源创建控件时调用此函数。bCreateSource参数告知源工厂是否应使用UI的内容创建源。
    
-   源对象（基类ILiveLinkSource）

这是管理从外部世界到客户端的数据传输的对象。源必须派生自ILiveLinkSource。它由源工厂创建，负责将动画数据传递到客户端并管理其数据连接生命周期。

您的源必须覆盖以下函数：

-   `ReceiveClient` - 创建源时调用。
-   `IsSourceStillValid`
-   `RequestSourceShutdown` - 调用此函数以要求源关闭。连接清理操作通常发生在此处。如果需要更多时间完全关闭连接，会返回false

以下函数由客户端UI使用：

-   `GetSourceType` - 返回代表源类型的本地化字符串
-   `GetSourceMachineName` - 返回代表源身份的字符串（MachineName、IP地址等）。
-   `GetSourceStatus` - 返回源状态的本地化字符串

## 消息总线源

有关新建源所需条件的示例可在编辑器中找到，方法是在/Engine/Plugins/Animation/LiveLink/Source/LiveLink中查找以下类别：

-   `FLiveLinkMessageBusSource`
-   `ULiveLinkMessageBusSourceFactory`
-   `SLiveLinkMessageBusSourceEditor`

这些类别组成了Live Link插件中内置的消息总线Live Link源。此消息总线源使用一个自定义消息总线协议，允许第三方应用程序将动画数据传输到引擎。

### 使用Live Link消息总线框架

利用Live Link消息总线框架（像Maya和MotionBuilder插件，软件需要包括虚幻引擎的核心库并创建一个LiveLinkProvider）。

```cpp
	TSharedPtr<ILiveLinkProvider> LiveLinkProvider;
	LiveLinkProvider = ILiveLinkProvider::CreateLiveLinkProvider(TEXT("Maya"));

```

这会自动处理与一个或多个虚幻引擎实例的通信。然后软件所要做的就只是使用以下两个函数告知提供程序已流送的数据：

-   `UpdateSubject` - 向Live Link提供主题的说明（名称和关节层级）。
-   `UpdateSubjectFrame` - 向Live Link提供有关该主题的数据帧（当前变换、任何我们想要关联的指定浮点参数以及一个时间/帧编号）。

此方法的一个示例可在 `Engine\Source\Programs\MayaLiveLinkPlugin\` 中找到。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [live link](https://dev.epicgames.com/community/search?query=live%20link)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Live Link源](/documentation/zh-cn/unreal-engine/live-link-plugin-development-in-unreal-engine#livelink%E6%BA%90)
-   [消息总线源](/documentation/zh-cn/unreal-engine/live-link-plugin-development-in-unreal-engine#%E6%B6%88%E6%81%AF%E6%80%BB%E7%BA%BF%E6%BA%90)
-   [使用Live Link消息总线框架](/documentation/zh-cn/unreal-engine/live-link-plugin-development-in-unreal-engine#%E4%BD%BF%E7%94%A8livelink%E6%B6%88%E6%81%AF%E6%80%BB%E7%BA%BF%E6%A1%86%E6%9E%B6)