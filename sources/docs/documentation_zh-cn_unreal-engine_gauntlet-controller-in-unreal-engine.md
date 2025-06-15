# 虚幻引擎中的Gauntlet控制器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gauntlet-controller-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:41:06.635Z

---

目录

![Gauntlet控制器](https://dev.epicgames.com/community/api/documentation/image/f71d0a17-cf05-4440-9a50-4ba89db088c3?resizing_type=fill&width=1920&height=335)

**Gauntlet控制器（Gauntlet Controller）** 是指各种可在自动化测试框架之外驱动自动化任务的C++对象。它们适用于运行时的功能测试，尤其是涉及网络时。

通常你可以在自定义插件中重新实现 `UGauntletTestController` 类，从而创建Gauntlet控制器。

你可以使用多种方法重新实现 `UGauntletTestController` ，从而控制测试流程，包括：

-   `OnInit()` - 在控制器初始化时调用。
-   `OnPreMapChange()` - 在地图变更前调用。
-   `OnPostMapChange(UWorld* World)` - 在地图变更后调用。`GetCurrentMap()` 返回新地图。
-   `OnTick(float TimeDelta)` - 定期调用，以便控制器检查和控制状态。
-   `OnStateChange(FName OldState, FName NewState)` - 在模块状态发生变化时调用。状态是由游戏驱动的。

测试结束时，调用 `EndTest(ExitCode)` 将其状态传递给游戏实例。虚幻自动化工具（UAT）Gauntlet会获取控制器的结果，并将其推送到测试中。

## Gauntlet角色

要让Gauntlet测试使用Gauntlet控制器，控制器的名称必须附到Gauntlet角色。你可以使用下列代码来实现这一目标，假定名称为 \`UMyControllerName：

```cpp
UnrealTestRole ClientRole = Config.RequireRole(UnrealTargetRole.Client);
ClientRole.Controllers.Add("MyControllerName");
```

多个角色可以有不同的控制器。

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [gauntlet](https://dev.epicgames.com/community/search?query=gauntlet)
-   [automation test framework](https://dev.epicgames.com/community/search?query=automation%20test%20framework)
-   [gauntlet controller](https://dev.epicgames.com/community/search?query=gauntlet%20controller)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Gauntlet角色](/documentation/zh-cn/unreal-engine/gauntlet-controller-in-unreal-engine#gauntlet%E8%A7%92%E8%89%B2)