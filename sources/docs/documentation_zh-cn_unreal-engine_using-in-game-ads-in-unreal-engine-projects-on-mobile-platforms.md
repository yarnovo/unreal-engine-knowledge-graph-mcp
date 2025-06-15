# 在虚幻引擎项目中使用移动平台的游戏内置广告U | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-in-game-ads-in-unreal-engine-projects-on-mobile-platforms
> 
> 生成时间: 2025-06-14T19:59:32.383Z

---

目录

![使用游戏内置广告](https://dev.epicgames.com/community/api/documentation/image/0213ccf7-14c6-4a80-8c79-8cd6c898bd85?resizing_type=fill&width=1920&height=335)

内置广告可以让你在移动平台上向游戏玩家展示广告。此方式可实现免费游戏的盈利，同时令其保持完全免费。

![Banner Image](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a385968-8339-4224-84f4-aaecb5e2bf8b/ads-banner.png "Banner Image")

## 配置

在下方页面中查看在每个平台上进行游戏内购配置的详细内容：

-   [在安卓上使用 Ad Mob 游戏内置广告](/documentation/zh-cn/unreal-engine/using-ad-mob-for-in-game-ads-on-android-with-unreal-engine)

## 展示广告横幅

**Show Ad Banner** 函数用于在游戏中显示广告横幅。需要展示广告时（如显示主菜单时）在逻辑中进行调用即可。

**在蓝图中：**

下例取自 Unreal Match 3 示例游戏 - 使用控件蓝图的 **Construct** 事件在胜利/失败画面出现时展示广告横幅。

![Blueprint script for showing ad banner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8de91ffe-779b-4058-bcb7-ad09d5fe3e38/ue5_1-01-bp-script-show-ad.png "Blueprint script for showing ad banner")

如需了解节点的详细内容，请查阅 [展示广告横幅](https://docs.unrealengine.com/BlueprintAPI/Utilities/Platform/ShowAdBanner) 文档。

## 隐藏广告横幅

**Hide Ad Banner** 函数可隐藏广告横幅。无需显示广告时（如退出主菜单时）进行调用即可。

**在蓝图中：**

下例取自 Unreal Match 3 示例游戏 - 使用控件蓝图的 **Destruct** 事件在胜利/失败画面出现时隐藏广告横幅。

![Blueprint script for hiding ad banner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1e458ee-d629-417c-9dde-4b28b6353ce3/ue5_1-02-bp-script-hide-ad.png "Blueprint script for hiding ad banner")

如需了解节点的详细内容，请查阅 [隐藏广告横幅](https://docs.unrealengine.com/BlueprintAPI/Utilities/Platform/HideAdBanner) 文档。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [services](https://dev.epicgames.com/community/search?query=services)
-   [ads](https://dev.epicgames.com/community/search?query=ads)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置](/documentation/zh-cn/unreal-engine/using-in-game-ads-in-unreal-engine-projects-on-mobile-platforms#%E9%85%8D%E7%BD%AE)
-   [展示广告横幅](/documentation/zh-cn/unreal-engine/using-in-game-ads-in-unreal-engine-projects-on-mobile-platforms#%E5%B1%95%E7%A4%BA%E5%B9%BF%E5%91%8A%E6%A8%AA%E5%B9%85)
-   [隐藏广告横幅](/documentation/zh-cn/unreal-engine/using-in-game-ads-in-unreal-engine-projects-on-mobile-platforms#%E9%9A%90%E8%97%8F%E5%B9%BF%E5%91%8A%E6%A8%AA%E5%B9%85)