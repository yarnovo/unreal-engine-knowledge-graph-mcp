# 虚幻引擎在线子系统排行榜接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-leaderboard-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:13.870Z

---

目录

![排行榜接口](https://dev.epicgames.com/community/api/documentation/image/c8584cd5-e6e2-4105-819f-6e9eecba3cc5?resizing_type=fill&width=1920&height=335)

排行榜记录游戏的最高分，鼓励玩家与好友和其他玩家进行竞争。 游戏可以拥有奖分的多个模式，每个模式均可拥有自身的排行榜。 计分模式可从最高到最低进行排行（传统积分制游戏），或从最低到最高（如计时或竞赛游戏）。 排行榜接口为开发者提供了各种必要工具，以便在游戏中显示和更新排行榜。

## 计分方法

定义排行榜处理积分的方式有3个不同方面，每个方面均在列举类型中定义。

-   [`ELeaderboardSort`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/ELeaderboardSort__Type)指定是否对积分进行排序，如要，则决定升序或降序。
-   [`ELeaderboardFormat`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/ELeaderboardFormat__Type)控制格式调整。 积分可以是原始数（点数）或时间（秒或毫秒）。
-   [`ELeaderboardUpdateMethod`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/ELeaderboardUpdateMethod__Type)说明排行榜是保持玩家最近的分数，还是玩家的最高分数（基于排序方法）。

## 获取排行榜数据

排行榜数据可能非常之大，因为每个已进行游戏的使用者账户所支持的每个排行榜中均可能有一个条目。 因此，获取将以文件块的形式完成，游戏可以几个不同方式来获取排行榜的部分。 获取排行榜数据的所有方法都将接收一个类型为 `FOnlineLeaderboardRead`（参见[`FOnlineLeaderboardRead`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/FOnlineLeaderboardRead)了解相关的数据类型）的参数（保存需要在线服务发送回的表格定义），并调用一个带 `布尔` 的委托（类型为 `FOnLeaderboardReadComplete`），在完成时说明成功或失败。 支持以下查询选项：

函数

查询描述

`ReadLeaderboards`

接收使用者的显式列表（由 `FUniqueId` 进行）并只请求这些使用者的排行榜积分。

`ReadLeaderboardsForFriends`

给定一个本地用户索引，找到该用户每个[好友](/documentation/zh-cn/unreal-engine/online-subsystem-friends-interface-in-unreal-engine)的排行榜积分。

`ReadLeaderboardsAroundRank`

接受一个等级或一个范围，适用于浏览全球排名靠前玩家的列表。请求将根据范围获取该等级上下的排行榜得分。举例而言，如等级为100、范围为50，则将请求排名50到150之间玩家的记录。

`ReadLeaderboardsAroundUser`

与 `ReadLeaderboardsAroundRank` 相似，但会以用户的 `FUniqueNetId` 来替代显式等级，并找到该用户等级指定范围中的记录。此方法无需执行多次调用便可显示一名玩家在全球排行中的位置。

## 上传排行榜数据

如要写入单个玩家的得分，使用 `WriteLeaderboards` 来缓存更新（类型为[`FOnlineLeaderboardWrite`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/FOnlineLeaderboardWrite)），其之后将被传输至在线服务。 每个 `FOnlineLeaderboardWrite` 对象均与一个会话命名和一个玩家（由 `FUniqueNetId` 识别）相关联。 当游戏已准备好将会话数据提交到在线服务的记录时，`FlushLeaderboards` 将发送缓存数据并将其从本地系统中清除，并在完成时调用在线子系统的 `OnLeaderboardFlushComplete` 委托。

`WriteLeaderboards` 一次只能缓存5个更新。 超过此数量的更新将被丢弃，因此必须在此情况发生之前调用 `FlushLeaderboards`。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online subsyste](https://dev.epicgames.com/community/search?query=online%20subsyste)
-   [leaderboards](https://dev.epicgames.com/community/search?query=leaderboards)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [计分方法](/documentation/zh-cn/unreal-engine/online-subsystem-leaderboard-interface-in-unreal-engine#%E8%AE%A1%E5%88%86%E6%96%B9%E6%B3%95)
-   [获取排行榜数据](/documentation/zh-cn/unreal-engine/online-subsystem-leaderboard-interface-in-unreal-engine#%E8%8E%B7%E5%8F%96%E6%8E%92%E8%A1%8C%E6%A6%9C%E6%95%B0%E6%8D%AE)
-   [上传排行榜数据](/documentation/zh-cn/unreal-engine/online-subsystem-leaderboard-interface-in-unreal-engine#%E4%B8%8A%E4%BC%A0%E6%8E%92%E8%A1%8C%E6%A6%9C%E6%95%B0%E6%8D%AE)