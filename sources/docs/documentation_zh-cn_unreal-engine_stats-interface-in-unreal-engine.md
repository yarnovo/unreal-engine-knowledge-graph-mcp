# 虚幻引擎的统计数据接口 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:54:38.714Z

---

目录

![统计数据接口](https://dev.epicgames.com/community/api/documentation/image/7c8ce2bc-e6c1-44e9-b4d0-0a904f214ee9?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**在线服务统计数据接口（Online Services Stats Interface）** 用于将统计数据上传到在线服务并完成统计数据检索。统计数据接口功能还用于其它依赖于游戏统计数据的接口，比如在线服务的成就和排行榜接口。

## API概览

下表提供了统计数据接口中包含函数的大致描述。

**函数**

**描述**

**更新（Update）**

 

[`UpdateStats`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IStats/UpdateStats)

将统计数据上传到平台

**检索（Query）**

 

[`QueryStats`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IStats/QueryStats)

检索用户的统计数据并将结果缓存在接口中。

[`BatchQueryStats`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IStats/BatchQueryStats)

检索一组用户的统计数据并将结果缓存在接口中。

**获取（Get）**

 

[`GetCachedStats`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IStats/GetCachedStats)

获取QueryStats或者BatchQueryStats调用后缓存的用户统计数据。

**事件监听（Event Listening）**

 

[`OnStatsUpdated`](/documentation/en-us/unreal-engine/API/Plugins/OnlineServicesInterface/Online/IStats/OnStatsUpdated)

事件会在用户统计数据变化后触发。

## 配置

你可以通过对应的平台后端使用统计数据接口，也可以通过 `StatsNull` 实现。要使用统计数据接口，必须先在 `DefaultEngine.ini` 文件中配置统计数据接口：

DefaultEngine.ini

```cpp
[OnlineServices.Stats]
+StatDefinitions=(Name=<STAT_NAME>, Id=<ID_NUMBER>, ModifyMethod=<METHOD>, DefaultValue="<TYPE>:<DEFAULT_VALUE>")
```

**Stat Definitions** 由以下字段组成：

-   `Name` : 统计数据的名称。
    -   这个是 `UpdateStats` 和 `QueryStats` 分别更新和检索统计数据时使用的名称。
-   `Id` : 统计数据的ID。
    -   这个是平台门户中对应的配置的统计数据ID。
-   `ModifyMethod` : 控制统计数据如何更新的方法。
    -   对于非 `StatsNull` 的实现，Modify方法应该在平台门户中配置。
    -   当使用由游戏管理的成就来判断一个成就是否达到了指定的解锁规则时，Modify方法会在全部实现中由成就接口使用。
-   `DefaultValue` ：统计数据的类型和默认值。
    -   这规定了统计数据的初始值。

要用统计数据解锁成就和更新排行榜，你必须在 `DefaultEngine.ini` 的成就和排行榜部分指定对应的统计数据。

### 配置示例

以下为在线服务统计数据接口的配置示例：

DefaultEngine.ini

```cpp
[OnlineServices.Stats]
+StatDefinitions=(Name=Stat_Use_Largest, Id=0, ModifyMethod=Largest, DefaultValue="Int64:0")
+StatDefinitions=(Name=Stat_Use_Smallest, Id=1, ModifyMethod=Smallest, DefaultValue="Int64:999")
+StatDefinitions=(Name=Stat_Use_Set, Id=2, ModifyMethod=Set, DefaultValue="Int64:0")
+StatDefinitions=(Name=Stat_Use_Sum, Id=3, ModifyMethod=Sum, DefaultValue="Int64:0")
+StatDefinitions=(Name=Stat_Type_Bool, Id=4, ModifyMethod=Set, DefaultValue="Bool:True")
+StatDefinitions=(Name=Stat_Type_Double, Id=5, ModifyMethod=Smallest, DefaultValue="Double:9999.999")
```

## 示例

该小节包含各种代码示例，可以帮助你了解如何：

-   [检索统计数据](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E6%A3%80%E7%B4%A2%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [获取缓存的统计数据](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E8%8E%B7%E5%8F%96%E7%BC%93%E5%AD%98%E7%9A%84%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [监听事件](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E7%9B%91%E5%90%AC%E4%BA%8B%E4%BB%B6)
-   [执行控制台指令](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E6%89%A7%E8%A1%8C%E6%8E%A7%E5%88%B6%E5%8F%B0%E6%8C%87%E4%BB%A4)

### 检索统计数据

```cpp
	UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
	UE::Online::IStatsPtr Stats = OnlineServices->GetStatsInterface();

	UE::Online::FQueryStats::Params Params;
	Params.LocalAccountId = LocalAccountId;
	Params.TargetAccountId = TargetAccountId;
	Params.StatNames = {"StatA", "StatB"};

	// See Note below Walkthrough for more information about this OnComplete call
	Stats->QueryStats(MoveTemp(Params)).OnComplete([](const UE::Online::TOnlineResult<FQueryStats>& Result)
	{
	if (Result.IsError())
		{
			const UE::Online::FOnlineError OnlineError = Result.GetErrorValue();
			// Process OnlineError
			return;
		}
		const UE::Online::FQueryStats::Result QueriedStats = Result.GetOkValue();
		// Process QueriedStats
	});
```

#### 详解

1.  不带参数调用 `GetServices` 来使用默认的在线服务：
    
    ```cpp
             UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
    ```
    
2.  访问默认在线服务的统计数据接口：
    
    ```cpp
             UE::Online::IStatsPtr Stats = OnlineServices->GetStatsInterface();
    ```
    
3.  实例化检索 `TargetAccountId` 的 `StatNames` 所需要的参数：
    
    ```cpp
             UE::Online::FQueryStats::Params Params;
             Params.LocalAccountId = LocalAccountId;
             Params.TargetAccountId = TargetAccountId;
             Params.StatNames = {"StatA", "StatB"};
    		
    ```
    
4.  处理 `QueryStats.OnComplete` 回调，处理错误或者检索到的统计数据：
    
    ```cpp
             Stats->QueryStats(MoveTemp(Params)).OnComplete([](const UE::Online::TOnlineResult<FQueryStats>& Result)
             {
                 if (Result.IsError())
                 {
                     const UE::Online::FOnlineError OnlineError = Result.GetErrorValue();
                     // Process OnlineError
                     return;
                 }
                 const UE::Online::FQueryStats::Result QueriedStats = Result.GetOkValue();
                 // Process QueriedStats
             });
    ```
    

要绑定到一个成员函数，总是应该使用由UObject派生的类，或者从 `TSharedFromThis` 派生的类，并且使用

```cpp
	.OnComplete(this, &MyClass::OnQueryStatsComplete)

```

这样会自动选择 `CreateUObject` 、 `CreateThreadSafeSP` 或者 `CreateSP` 。将会使用最安全的委托创建调用。要了解更多详情，请参考在线服务概览页面上的[回调格式](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%9B%9E%E8%B0%83%E6%A0%BC%E5%BC%8F)部分。

### 获取缓存的统计数据

```cpp
	UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
	UE::Online::IStatsPtr Stats = OnlineServices->GetStatsInterface();

	UE::Online::TOnlineResult<FGetCachedStats> CachedStats = Stats->GetCachedStats({});
	if (CachedStats.IsError())
	{
		UE::Online::FOnlineError OnlineError = CachedStats.GetErrorValue();
		// Process OnlineError
		return;
	}

	UE::Online::FGetCachedStats::Result& CachedStatsData = CachedStats.GetOkValue();
	// Process CachedStatsData
```

#### 详解

1.  不带参数调用 `GetServices` 来使用默认的在线服务并访问默认在线服务的统计数据接口：
    
    ```cpp
             UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
             UE::Online::IStatsPtr Stats = OnlineServices->GetStatsInterface();
    		
    ```
    
2.  使用 `Stats->GetCachedStats` 来通过统计数据接口获取缓存的统计数据:
    
    ```cpp
             UE::Online::TOnlineResult<UE::Online::FGetCachedStats> CachedStats = Stats->GetCachedStats({});
    		
    ```
    
3.  处理 `CachedStats` 并处理错误或者缓存的统计数据：
    
    ```cpp
             if (CachedStats.IsError())
             {
                 UE::Online::FOnlineError OnlineError = CachedStats.GetErrorValue();
                 // Process OnlineError
                 return;
    		
             }
             UE::Online::FGetCachedStats::Result& CachedStatsData = CachedStats.GetOkValue();
             // Process CachedStatsData
    		
    ```
    

### 监听事件

事件监听的处理于同步和异步函数不同。`FOnlineEventDelegateHandle` 会创建来处理 `OnStatsUpdated` 事件的结果，然后 `Unbind` 必须在关闭代码中调用来确保正确销毁。

#### 详解

1.  在你的类中为统计数据接口声明一个事件处理器。
    
    ```cpp
             UE::Online::FOnlineEventDelegateHandle StatEventHandle;
    ```
    
2.  在你的init代码中，初始化默认在线服务，访问统计数据接口，然后当事件发生时处理统计数据。
    
    ```cpp
             UE::Online::IOnlineServicesPtr OnlineServices = UE::Online::GetServices();
             UE::Online::IStatsPtr Stats = OnlineServices->GetStatsInterface();
             StatEventHandle = Stats->OnStatsUpdated().Add([](const UE::Online::FStatsUpdated& StatsUpdated)
             {
                 // custom logic inside this lambda
             });
    		
    ```
    
3.  确保在关闭代码中取消绑定事件处理器。
    
    ```cpp
             StatEventHandle.Unbind();
    ```
    

### 执行控制台指令

要了解通用的指令行句法来通过控制台指令运行异步接口，请参考[在线服务概览](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)文档。

#### 示例

要运行 `QueryStats` 函数，执行以下控制台指令：

```cpp
	OnlineServices Index=0 Stats QueryStats 0 0 ["StatA", "StatB"]

```

该指令会从统计数据接口用默认在线服务为第零个本地用户调用 `QueryStats` 。具体地讲，上方的指令会通过默认在线服务检索该用户的 `StatA` 和 `StatB` 。

## 重置统计数据

在开发和测试阶段， `ResetStats` 函数会重置当前游戏中所有提供的玩家统计数据。虽然各个在线服务的政策有所不同，但你不应该期望该函数会在测试环境之外正常运行。在发行版本中确保移除任何使用 `ResetStats` 的代码，或者使用编译时逻辑来将代码遮盖：

```cpp
	#if !UE_BUILD_SHIPPING
	// Code block with call to ResetStats
	#endif

```

## 更多信息

### 头文件

直接参考 `Stats.h` 头文件来了解更多信息。统计数据接口头文件 `Stats.h` 位于以下目录：

```cpp
	UNREAL_ENGINE_ROOT\Engine\Plugins\Online\OnlineServices\Source\OnlineServicesInterface\Public\Online

```

要了解如何获取UE源代码，请参考[下在虚幻引擎源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine)文档。

### 函数参数和返回类型

参考[在线服务概览](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine)页面的[函数](/documentation/zh-cn/unreal-engine/overview-of-online-services-in-unreal-engine#%E5%87%BD%E6%95%B0)部分来详细了解函数参数和返回类型，包括如何传送参数以及函数返回值时如何处理。

-   [social](https://dev.epicgames.com/community/search?query=social)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [achievements](https://dev.epicgames.com/community/search?query=achievements)
-   [leaderboards](https://dev.epicgames.com/community/search?query=leaderboards)
-   [multiplayer](https://dev.epicgames.com/community/search?query=multiplayer)
-   [online services](https://dev.epicgames.com/community/search?query=online%20services)
-   [stats](https://dev.epicgames.com/community/search?query=stats)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [API概览](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#api%E6%A6%82%E8%A7%88)
-   [配置](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E9%85%8D%E7%BD%AE)
-   [配置示例](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E9%85%8D%E7%BD%AE%E7%A4%BA%E4%BE%8B)
-   [示例](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E7%A4%BA%E4%BE%8B)
-   [检索统计数据](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E6%A3%80%E7%B4%A2%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [详解](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E8%AF%A6%E8%A7%A3)
-   [获取缓存的统计数据](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E8%8E%B7%E5%8F%96%E7%BC%93%E5%AD%98%E7%9A%84%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [详解](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E8%AF%A6%E8%A7%A3-2)
-   [监听事件](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E7%9B%91%E5%90%AC%E4%BA%8B%E4%BB%B6)
-   [详解](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E8%AF%A6%E8%A7%A3-3)
-   [执行控制台指令](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E6%89%A7%E8%A1%8C%E6%8E%A7%E5%88%B6%E5%8F%B0%E6%8C%87%E4%BB%A4)
-   [示例](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E7%A4%BA%E4%BE%8B-2)
-   [重置统计数据](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E9%87%8D%E7%BD%AE%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [更多信息](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E6%9B%B4%E5%A4%9A%E4%BF%A1%E6%81%AF)
-   [头文件](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E5%A4%B4%E6%96%87%E4%BB%B6)
-   [函数参数和返回类型](/documentation/zh-cn/unreal-engine/stats-interface-in-unreal-engine#%E5%87%BD%E6%95%B0%E5%8F%82%E6%95%B0%E5%92%8C%E8%BF%94%E5%9B%9E%E7%B1%BB%E5%9E%8B)