# 虚幻引擎中的排行榜接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:14.419Z

---

目录

![排行榜接口](https://dev.epicgames.com/community/api/documentation/image/c0a2d3f6-89b0-449b-895c-01aea2c4cbee?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**排行榜** 是按游戏内统计数据排名的玩家列表。排行榜记录游戏最高分，鼓励玩家、好友和世界上的其他玩家进行竞技。游戏可以拥有多种奖分的模式。每种模式均可拥有自身的排行榜。

排行榜可以按以下方式为条目排名：

-   **升序** ：低分排在高分前面。 《堡垒之夜》胜利排行榜按降序排列，因为赢得越多越好。
-   **降序** ：高分排在低分前面。
    -   赛车游戏中的圈速排行榜按升序排列，因为圈速越快越好。

**在线服务排行榜接口** 为开发人员提供显示和更新游戏中排行榜的工具。排行榜数据量可能非常庞大，因为每个玩过游戏的用户账号，在游戏支持的每个排行榜中都可能有一个条目。因此，排行榜接口将以数据块的形式检索数据。实现了排行榜接口的游戏能通过各种方式请求排行榜的数据块，详见下方[函数](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)小节所述，如需了解更多详情，请参阅[读取排行榜条目](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E8%AF%BB%E5%8F%96%E6%8E%92%E8%A1%8C%E6%A6%9C%E6%9D%A1%E7%9B%AE)小节。

## API 概述

### 函数

下表简要概述了排行榜接口提供的函数：

**函数**

**说明**

[`ReadEntriesForUsers`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILeaderboards/ReadEntriesForUsers)

读取特定用户的排行榜条目。

[`ReadEntriesAroundRank`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILeaderboards/ReadEntriesAroundRank)

读取关于特定排名索引的排行榜条目。

[`ReadEntriesAroundUser`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/ILeaderboards/ReadEntriesAroundUser)

读取关于特定用户的排行榜条目。

### 主结构体

排行榜接口功能主要通过 `FLeaderboardEntry` 结构体通信：

**成员**

**类型**

**说明**

`AccountId`

`FAccountId`

此排行榜条目的账号ID。

`Rank`

`int32`

此账号在此排行榜中的排名。

`Score`

`int64`

此账号在此排行榜中的分数。

## 配置

要使用统计数据更新排行榜分数，你必须在 `DefaultEngine.ini` 等引擎配置文件中配置排行榜接口。排行榜接口结合[统计数据接口](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine)使用，可跟踪排行榜排名的统计数据。

### 通用语法

DefaultEngine.ini

```cpp
	[OnlineServices.Leaderboards]
	bIsTitleManaged=true
	!LeaderboardDefinitions=ClearDefinitions
	+LeaderboardDefinitions=(Name=<StatName0>, Id=<Id0>, UpdateMethod=[KeepBest | Force], OrderMethod=[Ascending | Descending])
	+LeaderboardDefinitions=(Name=<StatName1>, Id=<Id1>, UpdateMethod=[KeepBest | Force], OrderMethod=[Ascending | Descending])
	...

```

为了让排行榜随着统计数据变更而更新，你必须将 `bIsTitleManaged` 标记设置为 `true`。此标记可配置客户端，以监听在线服务统计数据接口的 `FStatsUpdated` 事件，根据统计数据变更自动更新排行榜。`bIsTitleManaged` 标记的默认值为 `false` 。如果你不将此标记设置为 `true` ，排行榜将不会随着 `DefaultEngine.ini` 中排行榜定义中配置的统计数据变更而自动更新。

以下[排行榜定义](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E6%8E%92%E8%A1%8C%E6%A6%9C%E5%AE%9A%E4%B9%89)表解释了将排行榜定义添加到引擎配置文件的语法。

#### 排行榜定义

**字段**

\*\*类型

**说明**

`名称`

`字符串`

决定排名的统计数据的名称。此名称必须和使用统计数据接口配置的统计数据的名称相同。

`Id`

`int`

关联此排行榜的ID编号。此编号与统计数据接口的统计数据数据ID不相关。

`UpdateMethod`

`KeepBest` 或 `Force`

用于更新此排行榜条目的方法。`KeepBest` 会保留此统计数据已达到的最佳值。`Force` 会将排行榜条目更新至最新统计数据值，无论玩家的排名会因此发生怎样的变化。

`OrderMethod`

`升序` 或 `降序`

决定是低统计数据值排名在前，还是高统计数据值的排名在前。`升序` 意味着低统计数据值的排名在前。`降序` 意味着高统计数据值的排名在前。

### 配置示例

假定你的简易游戏有一个名为"游戏总分"的单一排行榜，由通过统计数据接口配置的同名统计数据跟踪：

DefaultEngine.ini

```cpp
	[OnlineServices.Stats]
	!StatDefinitions=ClearDefinitions
	+StatDefinitions=(Name=Total_Game_Points, Id=0, ModifyMethod=Sum)

	[OnlineServices.Leaderboards]
	bIsTitleManaged=true
	!LeaderboardDefinitions=ClearDefinitions
	+LeaderboardDefinitions=(Name=Total_Game_Points, Id=0, UpdateMethod=KeepBest, OrderMethod=Descending)

```

在此配置中，排行榜：

-   会保留每个玩家 `Total_Game_Points` 统计数据的最佳分数，
-   按降序排列，因为总分越高越好。

## 读取排行榜条目

有三种不同方式可以通过排行榜接口读取排行榜条目。排行榜条目可通过以下方式读取：

-   [对于特定用户](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E5%AF%B9%E4%BA%8E%E7%89%B9%E5%AE%9A%E7%94%A8%E6%88%B7)
-   [关于特定排名](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E5%85%B3%E4%BA%8E%E7%89%B9%E5%AE%9A%E6%8E%92%E5%90%8D)
-   [关于给定用户](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E5%85%B3%E4%BA%8E%E7%BB%99%E5%AE%9A%E7%94%A8%E6%88%B7)

我们在下文直观展示了每种方法使用上文[配置示例](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E9%85%8D%E7%BD%AE%E7%A4%BA%E4%BE%8B)配置的"游戏总分"排行榜检索什么内容。

### 对于特定用户

使用 `ReadEntriesForUsers` 函数检索特定用户的排行榜条目。此函数可获取你要查询其排名的各个用户的用户ID列表。

#### 示例

假定你有下面名为"游戏总分"的排行榜，并用以下参数调用 `ReadEntriesForUsers`：

```cpp
	UE::Online::FReadEntriesForUsers::Params Params;
	Params.LocalAccountId = "LLV54WB-3C678QQ";
	Params.AccountIds = {"9P8H4GQ-HNO5GA4", "3CN9H8E-VNO3G3C", "OHB8RA2-OHSEBSE"};
	Params.BoardName = TEXT("Total Game Points");

```

如果调用成功返回，你可以访问返回的 `TOnlineResult` 中标记为已检索的列：

**游戏总分**

 

 

 

**账号ID**

**排名**

**分数**

**已检索？**

3CN9H8E-VNO3G3C

1

1,901

Y

LLV54WB-3C678QQ

2

151

 

OHB8RA2-OHSEBSE

3

17

Y

9P8H4GQ-HNO5GA4

4

3

Y

9HQGQER-ILASDFH

5

1

 

### 关于特定排名

使用 `ReadEntriesAroundRank` 函数检索关于特定排行榜排名的排行榜条目。此函数可获取：

-   你要开始阅读排行榜条目的排名，
-   要读取条目的数量限制。

#### 示例

假定你有下面名为"游戏总分"的排行榜，并用以下参数调用 `ReadEntriesAroundRank`：

```cpp
	UE::Online::FReadEntriesAroundRank::Params Params;
	Params.LocalAccountId = "LLV54WB-3C678QQ";
	Params.Rank = 2;
	Params.Limit = 2;
	Params.BoardName = TEXT("Total Game Points");

```

如果调用成功返回，你可以访问返回的 `TOnlineResult` 中标记为已检索的列：

**游戏总分**

 

 

 

**账号ID**

**排名**

**分数**

**已检索？**

3CN9H8E-VNO3G3C

1

1,901

 

LLV54WB-3C678QQ

2

151

 

OHB8RA2-OHSEBSE

3

17

Y

9P8H4GQ-HNO5GA4

4

3

Y

9HQGQER-ILASDFH

5

1

 

从编程角度来看，在排行榜中，最上面的排名为0，而非1。因此，要检索第三位条目，需要使用 `Params.Rank = 2` 调用 `ReadEntriesAroundRank`。

### 关于给定用户

使用 `ReadEntriesAroundUser` 函数检索关于特定用户的排行榜条目。此函数可获取：

-   你要读取条目的用户，
-   指示从何处开始读取条目的偏移，
-   要读取条目总数的限值。

偏移可能会超出限值。在此情况下，所提供的用户不会出现在排行榜条目的返回数组中。在将排行榜条目整理到页面中以供查看时，此功能非常有用。

#### 示例

假定你有下面名为"游戏总分"的排行榜，并用以下参数调用 `ReadEntriesAroundUser`：

```cpp
	UE::Online::FReadEntriesAroundUser::Params Params;
	Params.LocalAccountId = "LLV54WB-3C678QQ";
	Params.Offset = -1;
	Params.Limit = 3;
	Params.BoardName = TEXT("Total Game Points");

```

如果调用成功返回，你可以访问返回的 `TOnlineResult` 中标记为已检索的列：

**游戏总分**

 

 

 

**账号ID**

**排名**

**分数**

**已检索？**

3CN9H8E-VNO3G3C

1

1,901

Y

LLV54WB-3C678QQ

2

151

Y

OHB8RA2-OHSEBSE

3

17

Y

9P8H4GQ-HNO5GA4

4

3

 

9HQGQER-ILASDFH

5

1

 

## 更多信息

### 头文件

直接查阅 `Leaderboards.h` 头文件，根据需要了解更多信息。排行榜接口头文件 `Leaderboards.h` 位于以下目录中：

```cpp

	UNREAL_ENGINE_ROOT\Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online

```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [leaderboards](https://dev.epicgames.com/community/search?query=leaderboards)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [stats](https://dev.epicgames.com/community/search?query=stats)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API 概述](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [函数](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [主结构体](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E4%B8%BB%E7%BB%93%E6%9E%84%E4%BD%93)
-   [配置](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E9%85%8D%E7%BD%AE)
-   [通用语法](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E9%80%9A%E7%94%A8%E8%AF%AD%E6%B3%95)
-   [排行榜定义](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E6%8E%92%E8%A1%8C%E6%A6%9C%E5%AE%9A%E4%B9%89)
-   [配置示例](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E9%85%8D%E7%BD%AE%E7%A4%BA%E4%BE%8B)
-   [读取排行榜条目](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E8%AF%BB%E5%8F%96%E6%8E%92%E8%A1%8C%E6%A6%9C%E6%9D%A1%E7%9B%AE)
-   [对于特定用户](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E5%AF%B9%E4%BA%8E%E7%89%B9%E5%AE%9A%E7%94%A8%E6%88%B7)
-   [示例](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [关于特定排名](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E5%85%B3%E4%BA%8E%E7%89%B9%E5%AE%9A%E6%8E%92%E5%90%8D)
-   [示例](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E7%A4%BA%E4%BE%8B-2)
-   [关于给定用户](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E5%85%B3%E4%BA%8E%E7%BB%99%E5%AE%9A%E7%94%A8%E6%88%B7)
-   [示例](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E7%A4%BA%E4%BE%8B-3)
-   [更多信息](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/leaderboards-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)

相关文档

[

在线子系统

![在线子系统](https://dev.epicgames.com/community/api/documentation/image/c34af712-b971-4b54-ae87-0b1a7bdea497?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-in-unreal-engine)

[

排行榜接口

![排行榜接口](https://dev.epicgames.com/community/api/documentation/image/3a2eea2d-6993-4971-8c6b-2ad11241dfbb?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-leaderboard-interface-in-unreal-engine)