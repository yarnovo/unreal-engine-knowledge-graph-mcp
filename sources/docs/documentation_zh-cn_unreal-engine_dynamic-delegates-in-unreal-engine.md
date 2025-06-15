# Dynamic Delegates in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dynamic-delegates-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:41:53.592Z

---

目录

![动态委托](https://dev.epicgames.com/community/api/documentation/image/0f5e33de-2005-4842-9e13-2434538e3ec7?resizing_type=fill&width=1920&height=335)

动态委托可序列化，其函数可按命名查找，但其执行速度比常规委托慢。

## 声明动态委托

动态委托的声明方式与[声明标准委托](/documentation/zh-cn/unreal-engine/delegates-and-lambda-functions-in-unreal-engine)相同，只是前者使用动态委托专属的宏变体。

声明宏

描述

`DECLARE_DYNAMIC_DELEGATE[_RetVal, ...]\( DelegateName \)`

创建一个动态委托。

`DECLARE_DYNAMIC_MULTICAST_DELEGATE[_RetVal, ...]\( DelegateName \)`

创建一个动态组播委托。

## 动态委托绑定

辅助宏

说明

`BindDynamic( UserObject, FuncName )`

用于在动态委托上调用BindDynamic()的辅助宏。自动生成函数命名字符串。

`AddDynamic( UserObject, FuncName )`

用于在动态组播委托上调用AddDynamic()的辅助宏。自动生成函数命名字符串。

`RemoveDynamic( UserObject, FuncName )`

用于在动态组播委托上调用RemoveDynamic()的辅助宏。自动生成函数命名字符串。

## 执行动态委托

通过调用委托的 `Execute()` 函数执行绑定到委托的函数。执行前须检查委托是否已绑定。 此操作是为了使代码更安全，因为有时委托可能含有未初始化且被后续访问的返回值和输出参数。 执行未绑定的委托在某些情况下确实可能导致内存混乱。可调用 `IsBound()` 检查是否可安全执行委托。 同时，对于无返回值的委托，可调用 `ExecuteIfBound()`，但需注意输出参数可能未初始化。

执行函数

描述

`Execute`

不检查其绑定情况即执行一个委托

`ExecuteIfBound`

检查一个委托是否已绑定，如是，则调用Execute

`IsBound`

检查一个委托是否已绑定，经常出现在包含 `Execute` 调用的代码前

参见[多播委托](/documentation/zh-cn/unreal-engine/multicast-delegates-in-unreal-engine)，了解执行多投射委托的相关细节。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [声明动态委托](/documentation/zh-cn/unreal-engine/dynamic-delegates-in-unreal-engine#%E5%A3%B0%E6%98%8E%E5%8A%A8%E6%80%81%E5%A7%94%E6%89%98)
-   [动态委托绑定](/documentation/zh-cn/unreal-engine/dynamic-delegates-in-unreal-engine#%E5%8A%A8%E6%80%81%E5%A7%94%E6%89%98%E7%BB%91%E5%AE%9A)
-   [执行动态委托](/documentation/zh-cn/unreal-engine/dynamic-delegates-in-unreal-engine#%E6%89%A7%E8%A1%8C%E5%8A%A8%E6%80%81%E5%A7%94%E6%89%98)