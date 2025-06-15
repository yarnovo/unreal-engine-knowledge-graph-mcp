# Gameplay Targeting System Debugging in Unreal Engine | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gameplay-targeting-system-debugging-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:45:53.402Z

---

目录

![Gameplay Targeting System Debugging](https://dev.epicgames.com/community/api/documentation/image/2bf0a420-054d-423c-a5d6-069dab5fa335?resizing_type=fill&width=1920&height=335)

此页面无法以你选择的语言显示。将默认显示为**English**。如果你想以不同的语言查看，可以尝试选择另一种语言。

## Debugging and Troubleshooting

You can enable debugging from the Editor by pressing the tilde (~) key. See the table below for a complete list of Console Commands.

Currently debug visualizations only run on targeting requests on the client.

Console Command

Description

`ts.debug.EnableTargetingDebugging false/true`

Toggles whether the targeting system is actively in debugging mode.

`ts.debug.PrintTargetingDebugToLog false/true`

Toggles whether to print the targeting debug text to the log.

`ts.debug.TotalDebugRecentRequestsTracked #`

Sets the total number of targeting requests that will be tracked upon starting. The default amount is 5.

`ts.debug.ClearTrackedTargetRequests`

Clears all tracked targeting handles when in debug mode.

`ShowDebug TargetingSystem`

Brings up the visualization of the targeting tasks when `ts.debug.EnableTargetingDebugging` is enabled.

## Developer Reference

For an in-depth Engineering reference guide, see the [Gameplay Targeting Plugin Reference](/documentation/en-us/unreal-engine/gameplay-targeting-system-reference-in-unreal-engine) documentation.

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Debugging and Troubleshooting](/documentation/zh-cn/unreal-engine/gameplay-targeting-system-debugging-in-unreal-engine#debuggingandtroubleshooting)
-   [Developer Reference](/documentation/zh-cn/unreal-engine/gameplay-targeting-system-debugging-in-unreal-engine#developerreference)