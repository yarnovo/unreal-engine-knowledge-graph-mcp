# 虚幻引擎中的成就接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:53:42.914Z

---

目录

![在线服务成就接口](https://dev.epicgames.com/community/api/documentation/image/0bcc0f13-bfce-4111-88d4-7caeaf899162?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**成就** 是一种目标或奖品，在游戏环境之外判定，因完成游戏内任务而解锁或奖励。利用成就，你可以激励、挑战和奖励玩家。你可以使用成就执行以下操作：

-   引导玩家完成游戏
-   提高游戏的重玩价值
-   支持玩家之间的较量

**在线服务成就接口（Online Services Achievements Interface）** 向你提供了工具来读取成就定义以及读取和更新玩家的成就状态。成就接口不处理成就的创建、删除或修改。每个在线服务都有自己的后端系统来管理成就的这些方面。

你可以设置以下机制来根据接口的配置解锁成就：

-   **由平台服务管理** ：关联的统计数据达到预定义阈值时，成就会自动由平台服务解锁。
-   **由作品管理（自动）** ：关联的统计数据达到预定义阈值时，成就会自动由作品解锁。请参阅下面的[配置作品自动管理的成就](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E9%85%8D%E7%BD%AE%E4%BD%9C%E5%93%81%E8%87%AA%E5%8A%A8%E7%AE%A1%E7%90%86%E7%9A%84%E6%88%90%E5%B0%B1)小节，了解更多信息。
-   **由作品管理（手动）** ：成就由作品根据作品逻辑和 `UnlockAchievements` 函数手动解锁。

这三个选项具体哪些可用，将根据你使用的在线服务实现/平台而有所不同。请查阅你的特定在线服务实现的文档，了解更多信息。

## API概述

### 函数

下表概述了成就接口提供的函数：

**函数**

**定义**

[`QueryAchievementDefinitions`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/QueryAchievement-)

查询此作品的所有成就定义。

[`GetAchievementIds`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/GetAchievementIds)

检索 `QueryAchievementDefinitions` 缓存的成就的成就ID。

[`GetAchievementDefinition`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/GetAchievementDefinition)

使用 `QueryAchievementDefinitions` 缓存的所提供成就ID检索成就定义。

[`QueryAchievementStates`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/QueryAchievementStates)

为提供的玩家查询所有成就的状态。

[`GetAchievementState`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/GetAchievementState)

按ID为提供的玩家检索成就的状态。

[`UnlockAchievements`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/UnlockAchievements)

手动解锁提供的成就。

[`DisplayAchievementUI`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/DisplayAchievementUI)

为提供的成就启动平台UI。

[`OnAchievementStateUpdated`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/OnAchievementSta-)

玩家的成就状态更改时触发的事件。

### 主结构体

成就接口主要通过三个结构体传达其功能：[`FAchievementDefinition`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/FAchievementDefinition)、[`FAchievementStatDefinition`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/FAchievementStatDefinition)和[`FAchievementState`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/FAchievementState)，以及一些特定于函数的结构体，用于传递参数和返回值。

#### FAchievementDefinition

**成员**

**类型**

**说明**

`AchievementId`

`FString`

唯一的成就ID。

`UnlockedDisplayName`

`FText`

此成就解锁之后使用的本地化显示名称。

`UnlockedDescription`

`FText`

此成就解锁之后使用的本地化说明。

`LockedDisplayName`

`FText`

此成就未解锁时使用的本地化显示名称。

`LockedDescription`

`FText`

此成就未解锁时使用的本地化说明。

`FlavorText`

`FText`

本地化风格文本。

`UnlockedIconUrl`

`FString`

解锁后使用的此成就的图标URL。

`LockedIconUrl`

`FString`

此成就未解锁时使用的图标URL。

`bIsHidden`

`bool`

此成就在解锁之前是否隐藏。

`StatDefinitions`

`TArray<FAchievementStatDefinition>`

与此成就相关的统计数据。

#### FAchievementStatDefinition

**成员**

**类型**

**说明**

`StatId`

`FString`

统计数据的唯一ID。

`UnlockThreshold`

`uint32`

要使成就自动解锁，用户必须使用关联的统计数据满足的阈值。

#### FAchievementState

**成员**

**类型**

**说明**

`AchievementId`

`FString`

与此状态相关的成就。

`Progress`

`float`

解锁此成就的进度，表示为0.0到1.0之间的百分比。小于1.0的值表示成就处于未解锁状态。值1.0表示成就已解锁。

`UnlockTime`

`FDateTime`

如果已解锁，表示此成就解锁的时间。

## 配置作品自动管理的成就

在成就由平台服务管理或由作品管理并手动解锁时，成就接口不需要引擎配置。如果你的成就进度由作品管理，并且你希望成就在一个或多个统计数据达到预定义阈值时自动解锁，你必须配置引擎。

对于自动解锁、由作品管理的成就，成就接口将与[统计数据接口](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine)一起使用。你必须为引擎配置此机制，以设置成就的解锁规则，并基于使用统计数据接口配置定义的统计数据确定条件。

### 一般语法

DefaultEngine.ini

```cpp
	[OnlineServices.Achievements]
	bIsTitleManaged=true
	!UnlockRules=ClearRules
	+UnlockRules=(AchievementId=<AchievementId1>, Conditions=((StatName=<StatName>, UnlockThreshold="<Type>:<Value>"), ...))
	+UnlockRules=(AchievementId=<AchievementId2>, Conditions=((StatName=<StatName>, UnlockThreshold="<Type>:<Value>"), ...))
	...
```

要使自动解锁且由作品管理的成就基于统计数据更改进行更新，你必须将 `bIsTitleManaged` 标记设置为 `true` 。此标记会将客户端配置为侦听在线服务统计数据接口的 `FStatsUpdated` 事件，以根据统计数据更改自动更新成就状态。`bIsTitleManaged` 标记的默认值是 `false` 。如果你不将此标记设置为 `true` ，成就不会基于 `DefaultEngine.ini` 中的成就定义中配置的统计数据变化而自动更新。

`UnlockRules` 中的 `Conditions` 列表包含单独的条件对。成就可能取决于与 `UnlockThreshold` 耦合的一个或多个统计数据。仅当成就的关联 `Conditions` 列表中的每个统计数据都满足或超过预定义阈值之后，成就才会解锁。

#### 解锁规则

**字段**

**类型**

**说明**

`AchievementId`

`String`

与此解锁规则关联的成就的ID。

`Conditions`

`List`

此成就的解锁条件列表。

#### 条件

**字段**

**类型**

**说明**

`StatName`

`String`

要关联此成就的解锁阈值的统计数据名称。

`UnlockThreshold`

冒号分隔的 `Type:Value` 对

形如 `<Type>:<Value>` 的数据对，其中 `Type` 是此统计数据的类型， `Value` 是阈值，满足此条件即可解锁此成就。

### 配置示例

下面是有两个不同成就的成就接口示例配置。第一个成就取决于名为 `Total_Distance` 的单个统计数据，它记录了玩家行进的总距离，以米为单位。第二个成就要解锁则取决于三个不同的统计数据：`Distance_Run` 、 `Distance_Swim` 和 `Distance_Cycle` ，全部以米为单位。

DefaultEngine.ini

```cpp
	[OnlineServices.Stats]
	!StatDefinitions=ClearDefinitions
	+StatDefinitions=(Name=Total_Distance, Id=0, ModifyMethod=Sum)
	+StatDefinitions=(Name=Distance_Run, Id=1, ModifyMethod=Sum)
	+StatDefinitions=(Name=Distance_Swim, Id=2, ModifyMethod=Sum)
	+StatDefinitions=(Name=Distance_Cycle, Id=3, ModifyMethod=Sum)

	[OnlineServices.Achievements]
	bIsTitleManaged=true
	!UnlockRules=ClearRules
	+UnlockRules=(AchievementId=Around_the_World, Conditions=((StatName=Total_Distance, UnlockThreshold="Int32:40075000"))
	+UnlockRules=(AchievementId=Triathlon, Conditions=((StatName=Distance_Run, UnlockThreshold="Int32:10000"),(StatName=Distance_Swim, UnlockThreshold="Int32:1500"), (StatName=Distance_Cycle, UnlockThreshold="Int32:40000"))
```

## 读取

成就接口旨在读取成就定义和状态。下面概括说明了读取定义和状态所涉及的步骤。如需代码示例，使用在线服务接口查询和获取信息时，过程很像[统计数据接口](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine)文档中的查询和获取统计数据的示例。

### 成就定义

成就接口可以通过执行以下步骤，读取平台服务上配置的成就的定义：

1.  [`QueryAchievementDefinitions`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/QueryAchievement-)使用成就定义填充本地接口缓存。
2.  [`GetAchievementIds`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/GetAchievementIds)检索步骤1中缓存的成就的ID列表。
3.  [`GetAchievementDefinition`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/GetAchievementDefinition)获取与步骤2中每个ID关联的完整定义。

[`FAchievementDefintion`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/FAchievementDefinition)结构体表示成就定义。对于由平台服务管理的成就，定义包含与成就关联的统计数据及其解锁阈值，高于阈值后，成就会自动解锁。

### 成就状态

如[成就定义](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E6%88%90%E5%B0%B1%E5%AE%9A%E4%B9%89)小节中所述，查询并检索玩家的成就定义之后，使用 `QueryAchievementStates` 和 `GetAchievementState` 读取玩家成就状态：

1.  [`QueryAchievementStates`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/QueryAchievementStates)使用成就状态信息填充本地接口缓存。
2.  [`GetAchievementState`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IAchievements/GetAchievementState)检索成就的当前解锁进度（如果仍处于未解锁状态）或解锁时间（如果成就已解锁）。

对于由作品管理的成就，进度为二元0.0（未解锁）或1.0（已解锁）。对于由平台服务管理的成就，若解锁规则基于统计数据，则进度可能会准确地反映成就的当前解锁进度，表示为0.0到1.0之间的百分比。

## 更多信息

### 头文件

请直接查验 `Achievements.h` 头文件，根据需要了解更多信息。成就接口头文件 `Achievements.h` 位于以下目录中：

```cpp
Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online
```

如需有关如何获取UE源代码的说明，请参阅关于[下载虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)的文档。

### 函数参数和返回类型

请参阅[在线服务概述](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)小节，了解函数参数和返回类型的说明，包括如何传递参数和处理函数返回时的结果。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [achievements](https://dev.epicgames.com/community/search?query=achievements)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [stats](https://dev.epicgames.com/community/search?query=stats)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API概述](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#api%E6%A6%82%E8%BF%B0)
-   [函数](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E5%87%BD%E6%95%B0)
-   [主结构体](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E4%B8%BB%E7%BB%93%E6%9E%84%E4%BD%93)
-   [FAchievementDefinition](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#fachievementdefinition)
-   [FAchievementStatDefinition](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#fachievementstatdefinition)
-   [FAchievementState](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#fachievementstate)
-   [配置作品自动管理的成就](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E9%85%8D%E7%BD%AE%E4%BD%9C%E5%93%81%E8%87%AA%E5%8A%A8%E7%AE%A1%E7%90%86%E7%9A%84%E6%88%90%E5%B0%B1)
-   [一般语法](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E4%B8%80%E8%88%AC%E8%AF%AD%E6%B3%95)
-   [解锁规则](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E8%A7%A3%E9%94%81%E8%A7%84%E5%88%99)
-   [条件](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E6%9D%A1%E4%BB%B6)
-   [配置示例](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E9%85%8D%E7%BD%AE%E7%A4%BA%E4%BE%8B)
-   [读取](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E8%AF%BB%E5%8F%96)
-   [成就定义](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E6%88%90%E5%B0%B1%E5%AE%9A%E4%B9%89)
-   [成就状态](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E6%88%90%E5%B0%B1%E7%8A%B6%E6%80%81)
-   [更多信息](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/achievements-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)

相关文档

[

在线子系统成就接口

![在线子系统成就接口](https://dev.epicgames.com/community/api/documentation/image/2e514db6-2cac-4fba-ba59-25b3f234db73?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/online-subsystem-achievements-interface-in-unreal-engine)