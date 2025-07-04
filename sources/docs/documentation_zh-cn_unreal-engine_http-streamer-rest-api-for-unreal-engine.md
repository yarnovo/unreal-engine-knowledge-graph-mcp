# 虚幻引擎HTTP流送器REST API | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:57:26.245Z

---

目录

![HTTP流送器REST API](https://dev.epicgames.com/community/api/documentation/image/a2be6399-6f93-47ad-9fa2-4aeda18d4031?resizing_type=fill&width=1920&height=335)

以下请求由 **HTTP流送器** 提出，必须由回放服务器进行处理。多数情况下，录制特定位置的给定信息，或根据请求为查看器返回信息即可。注意：回放通常不会被存储为一个单独的文件。回放的每个单独数据块通常会占用其自身的文件。事件数据为单独保存（即使其与回放相关），因为无需知晓事件所属的回放即可对其进行搜索。事件群组也应保存为单独文件，其中包含所有属于该群组的事件（来自各个回放）。

HTTP 流送器 REST API 的功能是将回放从游戏服务器流送到回放服务器（上传）；进行从回放服务器到游戏、查看器、服务器的流送实时回放或预录制回放（下载）；或进行服务器上回放的相关信息查询（搜索）。要实现自有的回放服务器，需要响应以下 HTTP 请求，以及游戏特定的其他额外请求。

## 上传请求

### 开始流送

发送请求，开始上传回放流送。

#### 语法

```cpp
	<Server URL>replay/<Session Name Override>?app=<Replay Version AppString>&version=<Replay Network Version>&cl=<Replay CL>&friendlyName=<Platform Friendly Name>

```

#### 详情

项目

值

请求方法

POST

内容类型

应用程序/json

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Session Name Override

（任选，包括前面的"/"。）回放的任意命名。通常包含一个 GUID。

但回放被请求时，回放服务器需要识别此命名。它应该作为会话命名返回，但是它可被无视（流送器将采纳返回的命名）。

Replay Version AppString

用户定义的字符串，用于描述播放的游戏。

HTTP 流送器请求回放列表时，此值可用于过滤。

Replay Network Version

用户定义的字符串，用于描述播放中游戏的版本。

此值也用于过滤回放列表，因此应该和回放数据保存在一起。

Replay CL

播放中版本的变更列表。

此值用于过滤回放列表。

Platform Friendly Name

游戏播放的平台。

此值可能对用户显示，并应在请求回放列表时被返回。然而它不会和回放列表的请求一同被发送至游戏服务器，因此无法用作过滤器。

#### 响应

响应为 `FNetworkReplayStartUploadingResponse` 类型，包含 JSON 数据（已定义字符串"sessionId"）。此值将在之后来自 HTTP 流送器的通信中被用作 **Session Name**。如提供了任选的 `<Session Name Override>`，返回的"sessionId"和最终的 `<Session Name>` 值应相同。这是游戏请求会话名的方式。

名称

类型

内容

用户

字符串阵列

出现在游戏中的用户列表。应被存储为回放上的标签。

### 上传标头

发送请求上传构成档案标头的二进制数据。数据应被录制到与 **Session Name** 关联的头文件中。

#### 语法

```cpp
	<Server URL>replay/<Session Name>/file/replay.header?numChunks=<Stream Chunk Index>&time=<Total Demo Time In MS>

```

#### 详情

项目

值

请求方法

POST

内容类型

应用程序/八位字节流送

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Session Name

被上传的回放名称。

此名称将匹配回放服务器提供的值，以响应最初的上传请求。

Stream Chunk Index

当前被发送回放数据块的索引。

流送数据块的大小并不统一，但会严格按此值进行排序。

Total Demo Time In MS

截止当前流送数据块结束的 demo 总运行时间。

说明已上传的回放数据量（以毫秒为单位），无需解译二进制回放数据。

#### 清空流送

发送清空流送的请求。内容为二进制回放数据，可对其进行压缩。此数据代表 **Stream Chunk Index** 指出的数据块。数据块的数据大小和其包含的时间长度有所不同，因此建议将每个数据块保存在单独的文件中。HTTP 流送器每 10 秒将尝试通过此系统清空其当前的流送数据。修改控制台变量 `httpReplay.ChunkUploadDelayInSeconds` 即可调整清空操作的间隔。

如要启用压缩，必须在 `FHttpNetworkReplayStreamer` 的子类中覆盖 3 个函数：

-   `SupportsCompression` 必须返回 `true`。
-   `CompressBuffer` 必须执行压缩并返回 `true`，除非出现错误。
-   `DecompressBuffer` 必须执行解压缩并返回 `true`，除非出现错误。

#### 语法

```cpp
	<Server URL>replay/<Session Name>/file/stream.<Stream Chunk Index>?numChunks=<Total Chunks>&time=<Total Demo Time In MS>&mTime1=<Start Time In MS>&mTime2=<End Time In MS>&absSize=<Total Uploaded Bytes>

```

#### 详情

项目

值

请求方法

POST

内容类型

应用程序/八位字节流送

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Session Name

被上传的回放名称。

此名称将匹配回放服务器提供的值，以响应最初的上传请求。

Stream Chunk Index

被请求的回放当前数据块的索引。

流送数据块的大小并不统一，但会严格按此值进行排序。

Total Chunks

已发送数据块的总数。

这将固定比 **Stream Chunk Index** 多 1。

Total Demo Time In MS

截止当前流送数据块结束的 demo 总运行时间。

说明已上传的回放数据量（以秒为单位），无需解译二进制回放数据。

Start Time In MS

自此流送数据块开始的总运行时间。

时间以毫秒为单位。可用于确认查看器在流送回放中需要跳至的数据块。

End Time In MS

自此流送数据块结束的总运行时间。

时间以毫秒为单位。可用于确认查看器在流送回放中需要跳至的数据块。

Total Uploaded Bytes

截止当前流送数据块结束的 demo 总大小。

说明当前已上传的回放数据量（以字节为单位）。

### 添加/更新事件

发送请求添加或更新回放事件。内容包含需要被记录的二进制事件数据。此数据可通过 DemoNetDriver 发送，用户可对其进行定义。此 HTTP 请求的第二个版本可用于修改或更新现有的事件，而第一个版本则用于创建新事件。

注意：事件将在回放外单独保存，因此事件名使用 GUID。每个事件均了解其所属的回放，因此事件并未嵌入回放。

#### 语法

```cpp
	<Server URL>replay/<Session Name>/event?group=<Group Name>&time1=<Event Time In MS>&time2=<Event Time In MS>&meta=<Meta Tag>&incrementSize=false

	<Server URL>replay/<Session Name>/event/<Session Name>_<Event Name>?group=<Group Name>&time1=<Event Time In MS>&time2=<Event Time In MS>&meta=<Meta Tag>&incrementSize=false
```

#### 详情

项目

值

请求方法

POST

内容类型

应用程序/八位字节流送

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Session Name

被上传的回放名称。

此名称将匹配回放服务器提供的值，以响应最初的上传请求。

Group Name

包含此事件的事件组名称。

事件可被放入组中以便进行列表过滤（如将体育游戏中的所有判罚分组）。

Event Name

被添加或更新的事件 GUID。

（任选。）查看器可请求的特定命名事件的相关信息。如未指定，列出事件群组中的事件后仍然可以找到此事件。

Event Time In MS

此事件发生时回放中的时间。

时间以毫秒为单位。虽然"time1"和"time2"可分别用作开始时间和结束时间，但在默认的 HTTP 流送器中它们的值固定相同。

Meta Tag

与此事件相关的元标签。

如请求进行了指定，则可通过元标签过滤回放列表。**Meta Tag** 在传输中将由 HTTP 流送器进行 URL 编码。

### 停止流送

发送请求说明回放上传已完成。

#### 语法

```cpp
	<Server URL>replay/<Session Name>/stopUploading?numChunks=<Total Num Chunks>&time=<Total Time In MS>&absSize=<Total Bytes Uploaded>
```

#### 详情

项目

值

请求方法

POST

内容类型

应用程序/八位字节流送（无发送内容）

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Session Name

被上传的回放名称。

此名称将匹配回放服务器提供的值，以响应最初的上传请求。

Total Num Chunks

完成回放中的数据块数量。

 

Total Time In MS

回放的总运行时间（以毫秒为单位）。

 

Total Bytes Uploaded

回放的总大小（以字节为单位）。

 

## 下载请求

### 请求开始下载

此请求将基于用户名建立连接，从回放服务器开始下载回放。此请求成功送达后，HTTP 流送器将立即发送请求下载回放的标头，然后再发送另一个请求列举回放中的所有检查点。

#### 语法

```cpp
	<Server URL>replay/<Session Name>/startDownloading?user=<User Name>
```

#### 详情

项目

值

请求方法

POST

内容类型

无

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Session Name

被下载的回放名称。

此名称将匹配回放最初上传时服务器提供的值。

User Name

专有网络 ID（GUID）

登录到客户端机器中的首选网络 GUID。此值来自引擎，并未规定为用户提供。

#### 响应

对此请求的预期响应为 `FNetworkReplayStartDownloadingResponse` 类型（包含 JSON 数据）。

名称

类型

内容

State

字符串

单词"Live"，说明正在观看实时进行中的游戏。否则回放将被假定为预录制。

NumChunks

整数

这应为非零，可随流送进行更新（用于实时回放）。

Time

整数

回放的总时间（以毫秒为单位）。如 **State** 指出这是实时流送，则会发生改变。

ViewerId

字符串

回放服务器指定的独有命名，请求更多回放数据块时游戏服务器将使用此命名。在此文档中常被称作 **Viewer Name**。

### 请求标头

#### 语法

```cpp
	<Server URL>replay/<Session Name>/file/replay.header
```

#### 详情

项目

值

请求方法

GET

内容类型

无

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Session Name

被下载的回放名称。

此名称将匹配回放最初上传时回放服务器提供的值。

#### 响应

响应为内容部分中回放的标头（为二进制数据）。

### 请求检查点数据

#### 语法

```cpp
	<Server URL>replay/<Session Name>/event?group=checkpoint
```

#### 详情

项目

值

请求方法

GET

内容类型

无

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Session Name

被下载的回放名称。

此名称将匹配回放最初上传时回放服务器提供的值。

#### 响应

响应为包含检查点数据的 `FHttpResponsePtr` 类型（为 JSON 格式的字符串）。

名称

类型

内容

events

阵列

包含各个阵列条目，由此表中所有其他的域组成。

id

字符串

检查点的命名（GUID）。

group

字符串

事件所属的群组（如有）。

meta

字符串

与此事件相关的元标签（如有）。

time1

整数

事件的开始时间（以毫秒为单位）。

time2

整数

事件的结束时间（以毫秒为单位）。通常与开始时间相同。

注意：从技术上而言这是事件群组的一个泛型请求。"检查点"在此显式指定后，回放服务器应能够处理"群组"的其他数值并报告任意特定群组的全部事件。

### 请求流送数据块

这是针对特定流送数据块的请求，由查看器进行命名。已有数据块下载时将不会发送此请求。

#### 语法

```cpp
	<Server URL>replay/<Session Name>/file/stream.<Stream Chunk Index>
```

#### 详情

项目

值

请求方法

GET

内容类型

无

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Session Name

被下载的回放名称。

此名称将匹配回放最初上传时回放服务器提供的值。

Stream Chunk Index

被请求的回放当前数据块的索引。

流送数据块的大小并不统一，但会严格按此值进行排序。

#### 响应

预期响应为包含数据块相关信息的一个标头，其内容为回放数据的一个二进制数据块。如支持压缩，可对二进制数据进行压缩。标头中有以下域：

标头域名称

描述

NumChunks

流送中的数据块总数。这在流送游戏时十分实用，因为它能让用户在观看时了解新建的数据块。

Time

回放的总长度（以毫秒为单位）。和 NumChunks 一样，此值可在查看会话中进行修改（如回放实时进行）。

State

此变量拥有一个确认值"Live"。如此变量缺失，或为一个不同的值，流送器将切换至非实时流送模式。

MTime1

流送的开始时间（以毫秒为单位）。在实时回放流送中可为零。只有在数据块被发送后（流送器下载的第一个数据块，或流送为实时进行）才会检查此变量。

MTime2

流送的结束时间（以毫秒为单位）。更多数据块传入后，它将发生变化。如数据块被发送或回放为实时进行，此变量将固定被检查。

如要启用压缩，必须在 `FHttpNetworkReplayStreamer` 的子类中覆盖 3 个函数：

-   `SupportsCompression` 必须返回 `true`。
-   `CompressBuffer` 必须执行压缩并返回 `true`，除非出现错误。
-   `DecompressBuffer` 必须执行解压缩并返回 `true`，除非出现错误。

### 列举回放事件

可从 DemoNetDriver 直接调用，意味着游戏项目可随时进行此操作。此请求要求回放服务器发送包含特定回放（由 **Session Name** 确认）的所有事件列表，并通过特定事件群组进行过滤。建议支持空群组名和空"群组"参数。

#### 语法

```cpp
	<Server URL>replay/<Session Name>/event?group=<Group Name>"
```

#### 详情

项目

值

请求方法

GET

内容类型

无

#### 响应

此请求响应接收的内容为一条 JSON 格式字符串，和 `FReplayEventList` 以及 `FReplayEventListItem` 相一致。

名称

类型

内容

events

阵列

包含各个元素，由此表中所有其他的域组成。

id

字符串

检查点的命名（GUID）。

group

字符串

事件所属的群组（如有）。

meta

字符串

与此事件相关的元标签（如有）。

time1

整数

事件的开始时间（以毫秒为单位）。

time2

整数

事件的结束时间（以毫秒为单位）。通常与开始时间相同。

### 刷新查看器

该请求是一个 heartbeat，每 10 秒钟发送。此频率在当前版本中为硬编码，但在未来的版本中用户可对其进行配置（无需修改代码）。如查看器长时间未发送此请求（如一分钟），则查看器连接很可能已经意外断开，将其断开较为合理。如"final=true"版本已发送，则意味着用户说明这是最终的 heartbeat，用户已停止观看回放。

#### 语法

```cpp
	<Server URL>replay/<Session Name>/viewer/<Viewer Name>

	<Server URL>replay/<Session Name>/viewer/<Viewer Name>?final=<Final Heartbeat>

```

#### 详情

项目

值

请求方法

POST

内容类型

无

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Final Heartbeat

"true"或"false"

"final"不会默认发送，除非 **Final Heartbeat** 为 true。如为 true，则查看器已停止观看，不需要再发送数据。

## 搜索请求

### 搜索回放

请求回放服务器能发送的所有回放的列表。这些回放应该由 URL 中用户的标准进行预过滤。回放服务器应该能够处理部分过滤域为空或缺失。

#### 语法

```cpp
	<Server URL>replay?app=<Replay Version AppString>&cl=<Replay CL>&version=<Replay Network Version>&meta=<Meta Tag>&user=<User Name>&recent=<In Recent Viewer>"

```

#### 详情

项目

值

请求方法

GET

内容类型

无

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Replay Version AppString

用户定义的字符串，用于描述播放的游戏。

此值在用户开始上传回放时发送，现在用于过滤发送到潜在查看器的回放列表。

Replay CL

播放中版本的变更列表。

此值用于过滤回放列表。

Replay Network Version

用户定义的字符串，用于描述播放中游戏的版本。

此值应反映游戏数据格式的变化（因为会影响回放）。此值也用于过滤回放列表。

Meta

应用到此回放的标签。

用户应用的元标签可用于过滤拥有特定功能的游戏。这些游戏可以是"夺旗游戏"或"进入双重加时的游戏"。

User

专有网络 ID（GUID）

用于过滤包含特定玩家的游戏。

Recent

"true"或"false"

如为 true，则只会显示最近上传的回放。而回放服务器将对"最近"进行定义。

#### 响应

响应内容为 JSON 格式的字符串。

名称

类型

内容

replays

阵列

包含各个元素，由此表中所有其他的域组成。

AppName

字符串

上传回放时发送的 **Replay Version AppString**。应与随请求发送的参数相匹配。

SessionName

字符串

回放的命名（GUID）。

FriendlyName

字符串

上传回放时提供的 `<Platform Friendly Name>`。

Timestamp

日期时间

回放相关的时间和日期（即游戏何时进行）。

SizeInBytes

整数

回放的总大小（以字节为单位）。

DemoTimeInMs

整数

回放的运行长度（以毫秒为单位）。

NumViewers

整数

当前观看此回放的用户数量。

bIsLive

布尔

如回放中的游戏仍在进行中，则为 True。

Changelist

整数

此回放被录制时运行游戏的引擎的变更列表（CL）。和上传回放时的 **Replay CL** 参数相同。应与随请求发送的参数相匹配。

shouldKeep

布尔

如"shouldKeep"调试请求发出，则为 True。

### 按事件搜索回放

发送从服务器获取回放列表的请求。这些回放将被预过滤，只包括在命名 **Event Group** 中拥有至少一个事件的回放。

#### 语法

```cpp
	<ServerURL>event?group=<Event Group>

```

#### 详情

项目

值

请求方法

GET

内容类型

无

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Event Group

包含此事件的事件组名称。

事件可被放入组中以便进行列表过滤（如将体育游戏中的所有判罚分组）。

#### 响应

响应内容为 JSON 格式字符串，包含从服务器获取的回放列表。

名称

类型

内容

replays

阵列

包含各个元素，由此表中所有其他的域组成。

AppName

字符串

上传回放时发送的 **Replay Version AppString**。

SessionName

字符串

回放的命名（GUID）。

FriendlyName

字符串

上传回放时提供的 `<Platform Friendly Name>`。

Timestamp

日期时间

回放相关的时间和日期（即游戏何时进行）。

SizeInBytes

整数

回放的总大小（以字节为单位）。

DemoTimeInMs

整数

回放的运行长度（以毫秒为单位）。

NumViewers

整数

当前观看此回放的用户数量。

bIsLive

布尔

如回放中的游戏仍在进行中，则为 True。

Changelist

整数

此回放被录制时运行游戏的引擎的变更列表（CL）。和上传回放时的 **Replay CL** 参数相同。

shouldKeep

布尔

如"shouldKeep"调试请求发出，则为 True。

### 请求回放

这将从 DemoNetDriver 直接调用，因此可随时在游戏项目中执行。但通常会在查看回放 （回放中的 **Event Name** 从之前请求提供的列表中获取）时调用。

#### 语法

```cpp
	<Server URL>event/<Event Name>

```

#### 详情

项目

值

请求方法

GET

内容类型

无

#### 参数

元素

值

预计用途 / 注释

Server URL

回放服务器 URL。从 `DefaultEngine.ini` 进行绘制，未修改。

必须包含 URL 最后的"/"，因为它不会自动添加。

Event Name

所请求事件的 GUID。

事件由 GUID 识别，因此其可来自任意归档的回放。请求的事件必须来自当前观看回放所包含的事件列表。

#### 响应

响应内容应为来自回放服务器的二进制流送。

-   [replays](https://dev.epicgames.com/community/search?query=replays)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [上传请求](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E4%B8%8A%E4%BC%A0%E8%AF%B7%E6%B1%82)
-   [开始流送](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%BC%80%E5%A7%8B%E6%B5%81%E9%80%81)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0)
-   [响应](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%93%8D%E5%BA%94)
-   [上传标头](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E4%B8%8A%E4%BC%A0%E6%A0%87%E5%A4%B4)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-2)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-2)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-2)
-   [清空流送](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E6%B8%85%E7%A9%BA%E6%B5%81%E9%80%81)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-3)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-3)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-3)
-   [添加/更新事件](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E6%B7%BB%E5%8A%A0/%E6%9B%B4%E6%96%B0%E4%BA%8B%E4%BB%B6)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-4)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-4)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-4)
-   [停止流送](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%81%9C%E6%AD%A2%E6%B5%81%E9%80%81)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-5)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-5)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-5)
-   [下载请求](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E4%B8%8B%E8%BD%BD%E8%AF%B7%E6%B1%82)
-   [请求开始下载](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%B7%E6%B1%82%E5%BC%80%E5%A7%8B%E4%B8%8B%E8%BD%BD)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-6)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-6)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-6)
-   [响应](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%93%8D%E5%BA%94-2)
-   [请求标头](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%B7%E6%B1%82%E6%A0%87%E5%A4%B4)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-7)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-7)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-7)
-   [响应](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%93%8D%E5%BA%94-3)
-   [请求检查点数据](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%B7%E6%B1%82%E6%A3%80%E6%9F%A5%E7%82%B9%E6%95%B0%E6%8D%AE)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-8)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-8)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-8)
-   [响应](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%93%8D%E5%BA%94-4)
-   [请求流送数据块](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%B7%E6%B1%82%E6%B5%81%E9%80%81%E6%95%B0%E6%8D%AE%E5%9D%97)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-9)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-9)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-9)
-   [响应](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%93%8D%E5%BA%94-5)
-   [列举回放事件](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%88%97%E4%B8%BE%E5%9B%9E%E6%94%BE%E4%BA%8B%E4%BB%B6)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-10)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-10)
-   [响应](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%93%8D%E5%BA%94-6)
-   [刷新查看器](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%88%B7%E6%96%B0%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-11)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-11)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-10)
-   [搜索请求](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E6%90%9C%E7%B4%A2%E8%AF%B7%E6%B1%82)
-   [搜索回放](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E6%90%9C%E7%B4%A2%E5%9B%9E%E6%94%BE)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-12)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-12)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-11)
-   [响应](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%93%8D%E5%BA%94-7)
-   [按事件搜索回放](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E6%8C%89%E4%BA%8B%E4%BB%B6%E6%90%9C%E7%B4%A2%E5%9B%9E%E6%94%BE)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-13)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-13)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-12)
-   [响应](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%93%8D%E5%BA%94-8)
-   [请求回放](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%B7%E6%B1%82%E5%9B%9E%E6%94%BE)
-   [语法](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%AD%E6%B3%95-14)
-   [详情](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E8%AF%A6%E6%83%85-14)
-   [参数](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%8F%82%E6%95%B0-13)
-   [响应](/documentation/zh-cn/unreal-engine/http-streamer-rest-api-for-unreal-engine#%E5%93%8D%E5%BA%94-9)