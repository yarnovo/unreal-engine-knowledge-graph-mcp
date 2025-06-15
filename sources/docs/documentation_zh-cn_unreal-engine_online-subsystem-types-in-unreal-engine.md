# 虚幻引擎Online Subsystem类型 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:24.309Z

---

目录

![在线子系统类型](https://dev.epicgames.com/community/api/documentation/image/f0a24fa3-ee7f-42eb-843c-6d740be613c6?resizing_type=fill&width=1920&height=335)

此文档用于定义在线子系统中使用的各种数据结构。

### IOnlinePlatformData

**IOnlinePlatformData** 是任意不透明类容的基类，以便数据能四处传递，而不考虑其所包含的数据。 通过 **ToString()** 函数可获取到数据的可读版本；否则，除平台代码应没有内容尝试在数据上直接进行操作。

诸多结构体通常有平台特定的表达，而它们需要被游戏处理，不需要被公开细节。这需要游戏抓牢数据，并将其复制到其他机器（而无需理解其详情）。

派生自IOnlinePlatformData的类：

-   [FUniqueNetId](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#funiquenetid)
-   [FSharedContentHandle](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#fsharedcontenthandle)
-   [FSessionInfo](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#fsessioninfo)

#### 函数

```cpp
	/**
	 * 获取此不透明数据的原始字节表达
	 * 此数据拥有平台依赖性，不应被直接操纵
	 * @返回大小GetSize()字节数据
	 */
	virtual const uint8* GetBytes() const = 0;

	/**
	 * 获取不透明数据的大小
	 * @返回数据表达的大小（按字节计）
	 */
	virtual int32 GetSize() const = 0;

	/**
	 * 检查不透明数据的有效性
	 * @如这是完整的数据，则返回true；否则返回false
	 */
	virtual bool IsValid() const = 0;

	/**
	 * 获取不透明数据的可读表达
	 * 不应用于日志记录/调试之外的其他操作
	 * @以字符串形式返回数据
	 */
	virtual FString ToString() const = 0;
```

### FUniqueNetId

**FUniqueNetId** 包含一个档案服务在线ID，可代表单个玩家、好友或会话。

### FSharedContentHandle

**FSharedContentHandle** 包含一个档案服务共享文件柄。此柄可四处传递，用于访问来自任意处的共享内容，给出正确的许可。

### FSessionInfo

**FSessionInfo** 包含会话的平台特定消息。在多数情况下，这是会话辨识符、主机地址之类的信息，或识别和连接到已创建会话的其他方式。

参见：[会话接口](/documentation/zh-cn/unreal-engine/online-subsystem-session-interface-in-unreal-engine)

### FEmsFile

**FEmsFile** 是关于一个给定可下载文件的元数据。从给定服务列举出可用数据时将使用此结构。

包含以下元素：

-   散列——给定文件内容的散列值。
-   文件名——下载时的文件名。
-   逻辑命名——映射到下载文件名的命名。
-   文件大小——文件的大小。

### FTitleFile

**FTitleFile** 是内部结构，保存用于从在线服务异步下载文件的数据。

包含以下元素：

-   文件名——下载时的文件名。
-   异步状态——下载文件的状态。（参见：[异步状态](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#eonlineasynctaskstate)）
-   数据——包含文件内容的缓冲。

### EOnlineAsyncTaskState

**EOnlineAsyncTaskState** 是一个简单列举，代表异步操作可能的状态。

```cpp
		/** 任务尚未开始 */
		NotStarted,
		/** 任务当前当前正在处理 */
		InProgress,
		/** 任务已成功完成 */
		Done,
		/** 任务未能完成 */
		Failed
```

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [IOnlinePlatformData](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#ionlineplatformdata)
-   [函数](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [FUniqueNetId](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#funiquenetid)
-   [FSharedContentHandle](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#fsharedcontenthandle)
-   [FSessionInfo](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#fsessioninfo)
-   [FEmsFile](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#femsfile)
-   [FTitleFile](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#ftitlefile)
-   [EOnlineAsyncTaskState](/documentation/zh-cn/unreal-engine/online-subsystem-types-in-unreal-engine#eonlineasynctaskstate)