# 虚幻引擎中的作品文件接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/title-file-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:38.618Z

---

目录

![作品文件接口](https://dev.epicgames.com/community/api/documentation/image/3bae07be-525a-45df-99ac-cfdf5224dca9?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务作品文件接口（Online Services Title File Interface）** 支持你的游戏在运行时从平台的后端在线服务读取文件。

你的游戏可能需要读取没有随作品打包的文件。作品文件接口为你提供了相应工具来读取你已上传到后端在线服务的文件。此类信息的示例可能包括配置文件或当日消息。此接口可帮助你访问和下载这些文件，供在运行时使用。

对于特定于玩家的文件存储，请参阅[用户文件接口](/documentation/zh-cn/unreal-engine/user-file-interface-in-unreal-engine)。

## API概述

### 函数

下表概述了作品文件接口提供的函数：

**函数**

**说明**

[`EnumerateFiles`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ITitleFile/EnumerateFiles)

枚举所有可用文件。

[`GetEnumeratedFiles`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ITitleFile/GetEnumeratedFiles)

检索通过调用 `EnumerateFiles` 枚举的文件的缓存列表。

[`ReadFile`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ITitleFile/ReadFile)

读取文件并返回其内容。

## 流程

要使用作品文件接口从后端在线服务读取文件，请执行以下步骤： 1.`EnumerateFiles` 会异步缓存一个文件列表，列明所有可使用接口从在线服务检索的文件。 1.`GetEnumeratedFiles` 会检索通过 `EnumerateFiles` 使用接口缓存的文件的列表。 1.对于检索的列表中的每个文件， `ReadFile` 会异步读取该文件，并返回其内容，供在你的游戏中使用。

## 更多信息

### 头文件

直接查阅 `TitleFile.h` 头文件，根据需要了解更多信息。作品文件接口头文件 `TitleFile.h` 位于以下目录中：

```cpp
UNREAL_ENGINE_ROOT\Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online
```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [title](https://dev.epicgames.com/community/search?query=title)
-   [file](https://dev.epicgames.com/community/search?query=file)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API概述](/documentation/zh-cn/unreal-engine/title-file-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [函数](/documentation/zh-cn/unreal-engine/title-file-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [流程](/documentation/zh-cn/unreal-engine/title-file-interface-in-unreal-engine#%E6%B5%81%E7%A8%8B)
-   [更多信息](/documentation/zh-cn/unreal-engine/title-file-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/title-file-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/title-file-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)