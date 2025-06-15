# 虚幻引擎在线子系统成就接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/online-subsystem-achievements-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:52.257Z

---

目录

![在线子系统成就接口](https://dev.epicgames.com/community/api/documentation/image/addb488e-1aee-4648-92f0-977dcede5f90?resizing_type=fill&width=1920&height=335)

开发者可以借助成就系统来激励玩家、提供奖励和挑战、使玩家深度挖掘游戏可玩性、增加重复游戏的价值，甚至在玩家和好友之间形成竞争。 诸多在线服务均拥有成就系统，在线子系统（Online Subsystem）则提供 **成就接口** 来支持此功能。

并非所有在线服务都使用"成就"一词，但虚幻引擎均使用该词来描述此概念和支持系统。

在线子系统提供了在游戏中使用成就系统的功能，但并不负责处理创建、删除或修改成就的功能。 每种在线服务均通过自身的后台系统来支持成就管理。

## 采集成就数据

成就数据包含特定玩家的数据（即为哪些成就已被玩家解锁/部分解锁）与通用数据（如成就名称及图标）。

### 获取成就数据

对在线服务进行异步调用即可请求到成就数据。 然而此数据将被拆分为两块：成就ID与特定玩家的完成百分率，以及成就的描述（其与成就自身相关，因此是所有玩家共用）。 如需获取可用成就的列表，调用 `QueryAchievements` 即可（带特定玩家的 `FUniqueNetId`）。 委托（类型为 `FOnQueryAchievementsCompleteDelegate`）被调用并成功获得结果后，成就ID和（该玩家的）完成百分率将被缓存。 在这些成就的信息能够被显示或有效使用之前，还需要它们的完整描述。 可通过 `FOnQueryAchievementsCompleteDelegate` 来请求描述，完成时将调用一个类型为 `FOnQueryAchievementsCompleteDelegate` 的委托。

### 检查成就数据

数据被缓存后，即可通过几个函数调用对其进行检查。 `GetCachedAchievements` 是最佳的上手方法，因为其将返回一个包含所有已知成就ID的数组。 之后这些ID可用于调用 `GetCachedAchievement`（带特定玩家的 `FUniqueNetId`），以便检查此玩家在该成就上的完成百分比；或者作为一个参数来 `GetCachedAchievementDescription`，其将返回完整的成就描述（类型为[`FOnlineAchievementDesc`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/Interfaces/FOnlineAchievementDesc)）。

## 设置成就数据

给定用户能够完整解锁或部分解锁成就。 举例而言，通关游戏的玩家可以获得一个"游戏通关"成就，而完成一个特殊技巧的玩家则可以完成成就"完成此技巧1000次"千分之一的进度。 此外，在测试中多数在线服务均支持重置游戏的玩家成就，测试员要从最初开始测试游戏时便无需再新建账户。

### 写入成就数据

`WriteAchievements` 函数可接受一个或更多成就更新，并将其发送到在线服务，以便在完成时对提供的委托（类型为 `FOnAchievementsWrittenDelegate`）进行调用。 每个更新均是包含一个单一 `FOnlineAchievementsWrite` 的引用类型，其用作[`FOnlineStats`](/documentation/en-us/unreal-engine/API/Plugins/OnlineSubsystem/FOnlineStats)对象周围的包装。 通过 `Properties` 域发送的键值对应包含匹配成就ID的键，以及包含完成百分率的一个 `float` 值（范围从0.0%到100.0%）。 多数在线服务均不支持将玩家的成就完成百分率改为小于或等于已记录的数值。因此，发送更新前必须检查当前的完成百分率。

### 重置成就数据

在开发和测试中，`ResetAchievements` 函数将重置当前游戏中所有玩家的成就。 不同在线服务的政策略有不同，且此函数无法在测试环境之外使用。

发布版本中没有此函数，因此必须移除调用它的所有代码，或使用编译时逻辑来遮挡代码，如下所示：

```cpp
 #if !UE_BUILD_SHIPPING
 // Call to ResetAchievements
 #endif
```

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [online subsystem](https://dev.epicgames.com/community/search?query=online%20subsystem)
-   [achievements](https://dev.epicgames.com/community/search?query=achievements)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [采集成就数据](/documentation/zh-cn/unreal-engine/online-subsystem-achievements-interface-in-unreal-engine#%E9%87%87%E9%9B%86%E6%88%90%E5%B0%B1%E6%95%B0%E6%8D%AE)
-   [获取成就数据](/documentation/zh-cn/unreal-engine/online-subsystem-achievements-interface-in-unreal-engine#%E8%8E%B7%E5%8F%96%E6%88%90%E5%B0%B1%E6%95%B0%E6%8D%AE)
-   [检查成就数据](/documentation/zh-cn/unreal-engine/online-subsystem-achievements-interface-in-unreal-engine#%E6%A3%80%E6%9F%A5%E6%88%90%E5%B0%B1%E6%95%B0%E6%8D%AE)
-   [设置成就数据](/documentation/zh-cn/unreal-engine/online-subsystem-achievements-interface-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E6%88%90%E5%B0%B1%E6%95%B0%E6%8D%AE)
-   [写入成就数据](/documentation/zh-cn/unreal-engine/online-subsystem-achievements-interface-in-unreal-engine#%E5%86%99%E5%85%A5%E6%88%90%E5%B0%B1%E6%95%B0%E6%8D%AE)
-   [重置成就数据](/documentation/zh-cn/unreal-engine/online-subsystem-achievements-interface-in-unreal-engine#%E9%87%8D%E7%BD%AE%E6%88%90%E5%B0%B1%E6%95%B0%E6%8D%AE)