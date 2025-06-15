# 面向虚幻引擎的Horde代理 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-agents-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:37:13.700Z

---

目录

![Horde代理](https://dev.epicgames.com/community/api/documentation/image/759d96bd-7d34-4871-bbbe-9248f9011ba4?resizing_type=fill&width=1920&height=335)

## 安装Horde代理

如需了解如何部署新代理，请参阅[Horde > 部署 > 代理](/documentation/zh-cn/unreal-engine/horde-agent-deployment-for-unreal-engine)。

## 池

池是一组可以互换使用的机器，通常是因为这些机器属于特定平台或硬件类。通过允许开发运维工程师配置从代理类型到物理机器的映射，池简化了构建管线的管理。

池在[.globals.json](/documentation/zh-cn/unreal-engine/horde-schema-for-unreal-engine#globals)文件中通过 `pools` 属性定义。代理可以通过Horde操作面板手动添加到池中，也可以在满足特定条件后自动添加到池中。例如，以下配置块定义了一个会自动包括所有Windows机器的池：

```cpp
{
    "name": "WinLargeRam",
    "condition": "Platform == 'Win64' && RAM > 64gb"
}
```

另请参阅：[条件表达式语法](/documentation/zh-cn/unreal-engine/horde-conditions-for-unreal-engine)

## 远程连接到代理

如果你有一组机器需要相同的登录凭证，你可以将UnrealGameSync配置为通过Horde操作面板中的链接打开远程桌面会话。

要启用此功能，请从Windows控制面板打开 **凭证管理器（Credential Manager）** ，然后选择 **Windows凭证（Credentials）** 。点击 **添加新的通用凭证...（Add a new generic credential...）** 链接，以创建一个新条目并将其命名为 `UnrealGameSync:RDP` 。根据需要输入登录用户名和密码。

在Horde中，代理对话框上的 **远程桌面（Remote Desktop）** 按钮将打开一个URL，其格式为 `ugs://rdp?host=[NameOrIP]` 。UnrealGameSync默认配置为处理 `ugs://` 链接，它会拦截这些链接，并在启动远程桌面应用程序之前为指定的 `NameOrIP` 添加一个Windows登录条目。

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [安装Horde代理](/documentation/zh-cn/unreal-engine/horde-agents-for-unreal-engine#%E5%AE%89%E8%A3%85horde%E4%BB%A3%E7%90%86)
-   [池](/documentation/zh-cn/unreal-engine/horde-agents-for-unreal-engine#%E6%B1%A0)
-   [远程连接到代理](/documentation/zh-cn/unreal-engine/horde-agents-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E8%BF%9E%E6%8E%A5%E5%88%B0%E4%BB%A3%E7%90%86)