# 虚幻引擎中的Gameplay定时器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:47:48.867Z

---

目录

![Gameplay定时器](https://dev.epicgames.com/community/api/documentation/image/a33cb4b9-b8c8-41bd-9a66-6cbd92ea5d70?resizing_type=fill&width=1920&height=335)

**定时器** 安排在经过一定延迟或一段时间结束后要执行的操作。例如，您可能希望玩家在获取某个能力提升道具后变得无懈可击，然后10秒钟后恢复可受伤害状态。又或者，您可能希望玩家在穿过一间充满毒气的房间时，每秒受到一次伤害。这些操作都可以使用定时器来实现。

## 定时器管理

定时器在全局 **定时器管理器**（`FTimerManager`类型）中管理。全局定时器管理器存在于 **游戏实例** 对象上以及每个 **场景** 中。有两个函数可以使用定时器管理器来设置定时器：`SetTimer`和`SetTimerForNextTick`，它们各自都有一些重载。每个函数都可以连接到任意类型的对象或函数委托，`SetTimer`可以设为根据需要定期重复。请参阅[定时器管理器API页面](/documentation/en-us/unreal-engine/API/Runtime/Engine/FTimerManager)以了解有关这两个函数的更多详细信息。

如果要对其调用定时器的对象（如Actor）在时间结束前被销毁，则相关定时器会自动取消。在此情况下，定时器句柄将变为无效，并且不会调用该函数。

要访问定时器管理器，可以使用`AActor`函数`GetWorldTimerManager`，它会在`UWorld`中调用`GetTimerManager`函数。要访问全局定时器管理器，使用`UGameInstance`函数\`GetTimerManager'。如果场景因为任何原因而没有自己的定时器管理器，也可以退而求其次，使用全局定时器管理器。全局管理器可以用于与任何特定场景的存在没有相关性或依赖性的函数调用。

定时器可以与标准的C++函数指针、[`TFunction`对象](/documentation/en-us/unreal-engine/API/Runtime/Core/GenericPlatform/TFunction)或[委托](/documentation/zh-cn/unreal-engine/delegates-and-lambda-functions-in-unreal-engine)一起使用。

### 设置和清空定时器

`FTimerManager` 的 `SetTimer` 函数将定时器设置为在一段延迟后调用函数或委托，可以设置为不限次重复调用该函数。这些函数将填充 **定时器句柄**（`FTimerHandle`类型），后者可用于暂停（和恢复）倒计时，查询或更改剩余时间，甚至可以取消定时器。可以在定时器调用的函数内部设置定时器，甚至可以重复使用用来调用这个函数的定时器句柄。一种用法是延迟依赖于尚未产生、但预计很快会产生的Actor的Actor的初始化；从属Actor初始化函数可以设置一个定时器，在经过固定时长（如一秒）后再次调用这个初始化函数。或者，该初始化函数可以由在成功时自动清空的循环定时器调用。

定时器还可以设置为在下一帧运行，而不是按固定间隔。实现方法是调用 `SetTimerForNextTick`，但需要注意的是，该函数不填充定时器句柄。

要清空定时器，将 `SetTimer` 期间填充的 `FTimerHandle` 传递到 `FTimerManager` 函数 `ClearTimer` 中。定时器句柄将在此刻失效，并可以再次用于管理新定时器。使用现有定时器句柄调用 `SetTimer` 将清空该定时器句柄引用的定时器，并将它换成新定时器。

最后，与特定对象关联的所有定时器都可以通过调用`ClearAllTimersForObject`来清空。

示例：

```cpp
	void AMyActor::BeginPlay()
	{
		Super::BeginPlay();
		// 从现在开始两秒后，每秒调用一次RepeatingFunction。
		GetWorldTimerManager().SetTimer(MemberTimerHandle, this, &AMyActor::RepeatingFunction, 1.0f, true, 2.0f);
	}

	void AMyActor::RepeatingFunction()
	{
		// 调用该函数达到足够次数后，清空定时器。
		if (--RepeatingCallsRemaining <= 0)
		{
			GetWorldTimerManager().ClearTimer(MemberTimerHandle);
			// MemberTimerHandle现在可以复用于其他任意定时器。
		}
		// 在此进行一些操作...
	}

```

以小于等于0的速率调用`SetTimer`等效于调用`ClearTimer`。

### 暂停和恢复定时器

`FTimerManager`函数`PauseTimer`使用定时器句柄来暂停正在运行的定时器。这样可阻止定时器执行其函数调用，但经过的时间和剩余时间将保持暂停时的状态。`UnPauseTimer`使暂停的定时器恢复运行。

## 定时器信息

除了管理定时器，定时器管理器还提供了用于获取特定定时器信息的函数，如速率、经过的时间和剩余时间等。

### 定时器是否活跃

`FTimerManager`的`IsTimerActive`函数用于确定指定定时器当前是否活跃且未暂停。

示例：

```cpp
	// 这个武器是否正在等待再次射击？
	GetWorldTimerManager().IsTimerActive(this, &AUTWeapon::RefireCheckTimer);

```

### 定时器速率

`FTimerManager`有一个函数`GetTimerRate`，它用于从定时器句柄获取定时器的当前速率（两次激活之间的时间）。定时器速率不能直接更改，但可以使用其定时器句柄调用`SetTimer`来清空定时器并创建新定时器，新定时器除了速率不同，其他保持不变。如果定时器句柄无效，则`GetTimerRate`将返回值`-1`。

示例：

```cpp
	// 该武器的射击速率在预热时变化。当前是否正在等待射击，如果是，两次射击之间的当前间隔是多久？
	GetWorldTimerManager().GetTimerRate(this, &AUTWeapon::RefireCheckTimer);

```

### 经过时间和剩余时间

`FTimermanager`通过`GetTimerElapsed`和`GetTimerRemaining`，针对与所提供的定时器句柄关联的定时器，提供了返回经过时间和剩余时间的功能。与`GetTimerRate`一样，如果定时器句柄无效，则这两个函数将返回`-1`。

示例：

```cpp
	// 该武器准备好再次射击之前将经过多长时间？如果答案为-1，则表示现在已准备就绪。
	GetWorldTimerManager().GetTimerElapsed(this, &AUTWeapon::RefireCheckTimer);

```

定时器的经过时间和剩余时间之和应该等于定时器的速率。

## 已知问题

-   该代码目前并非线程安全，如果从游戏线程外部访问可能会导致断言。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay framework](https://dev.epicgames.com/community/search?query=gameplay%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [定时器管理](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine#%E5%AE%9A%E6%97%B6%E5%99%A8%E7%AE%A1%E7%90%86)
-   [设置和清空定时器](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%92%8C%E6%B8%85%E7%A9%BA%E5%AE%9A%E6%97%B6%E5%99%A8)
-   [暂停和恢复定时器](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine#%E6%9A%82%E5%81%9C%E5%92%8C%E6%81%A2%E5%A4%8D%E5%AE%9A%E6%97%B6%E5%99%A8)
-   [定时器信息](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine#%E5%AE%9A%E6%97%B6%E5%99%A8%E4%BF%A1%E6%81%AF)
-   [定时器是否活跃](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine#%E5%AE%9A%E6%97%B6%E5%99%A8%E6%98%AF%E5%90%A6%E6%B4%BB%E8%B7%83)
-   [定时器速率](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine#%E5%AE%9A%E6%97%B6%E5%99%A8%E9%80%9F%E7%8E%87)
-   [经过时间和剩余时间](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine#%E7%BB%8F%E8%BF%87%E6%97%B6%E9%97%B4%E5%92%8C%E5%89%A9%E4%BD%99%E6%97%B6%E9%97%B4)
-   [已知问题](/documentation/zh-cn/unreal-engine/gameplay-timers-in-unreal-engine#%E5%B7%B2%E7%9F%A5%E9%97%AE%E9%A2%98)

相关文档

[

委托

![委托](https://dev.epicgames.com/community/api/documentation/image/1063932d-f2ec-4c0e-bbf7-c0806a134b0b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/delegates-and-lambda-functions-in-unreal-engine)