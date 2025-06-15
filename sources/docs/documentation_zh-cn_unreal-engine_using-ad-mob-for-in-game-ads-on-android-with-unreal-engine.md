# 在虚幻引擎安卓项目中使用 Ad Mob 游戏内置广告 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-ad-mob-for-in-game-ads-on-android-with-unreal-engine
> 
> 生成时间: 2025-06-14T20:01:03.143Z

---

目录

![在安卓上使用 Ad Mob 游戏内置广告](https://dev.epicgames.com/community/api/documentation/image/3ea19721-4780-448a-905e-f068038afd56?resizing_type=fill&width=1920&height=335)

![Banner Image](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd56624c-9867-4430-8afb-65c62e629759/ads-banner.png "Banner Image")

## 配置

配置安卓项目，使用 AdMob 游戏内置广告系统的步骤：

1.  在 **虚幻编辑器** 的 **Edit** 菜单中选择 **Project Settings** 查看项目的配置选项。
    
    ![Open Project Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77f5d581-1a83-437c-a0eb-4aa62af0fe00/ue5_1-01-open-project-settings.png "Open Project Settings")
2.  选择左边的 **Platforms:Android** 标签。找到 **Google Play服务（Google Play Services）** 分段并为Google Play服务平台配置项目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff72b444-e8c7-464b-bd30-bbb74e6d08ac/ue5_1-02-configure-project-for-google-play.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff72b444-e8c7-464b-bd30-bbb74e6d08ac/ue5_1-02-configure-project-for-google-play.png)
    
    点击查看大图
    
3.  勾选 **Google Play Services** 部分下的 **Enable Google Play Support** 选项。
    
4.  在 **Games App ID** 栏位中输入游戏的 App ID。
    
5.  为每个需要关联的 AdMob ID 的 **Ad Mob Ad Unit Ids** 阵列添加元素，并在文本框中输入 ID。
    
6.  在 **Google Play License Key** 栏位中输入 Google Play 授权码。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88ae49b8-57e7-438c-87f7-691ad09c647d/ue5_1-03-set-options-for-google-play.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88ae49b8-57e7-438c-87f7-691ad09c647d/ue5_1-03-set-options-for-google-play.png)
    
    点击查看大图
    
    这些数值在应用程序和游戏服务的 Google Play Developer Console 中（或在 Google Ad Mob 界面中）可用。
    
7.  最后需要将 **com.android.vending.BILLING** 添加到 **Android** 设置 **Advanced APKPackaging** 部分中的 **Extra Permissions** 阵列：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f684f41d-d4d1-40ef-b38c-0dbbd19d2cfa/ue5_1-04-set-advanced-apk-packaging.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f684f41d-d4d1-40ef-b38c-0dbbd19d2cfa/ue5_1-04-set-advanced-apk-packaging.png)
    
    点击查看大图
    

### C++ 项目

如项目为 C++ 项目，则需要为 Target.cs 文件添加合适的模块，例如：

```cpp
		...
		if (Target.Platform == UnrealTargetPlatform.Android)
		{
			ExtraModuleNames.Add("OnlineSubsystemGooglePlay");
			ExtraModuleNames.Add("OnlineSubsystem");
			ExtraModuleNames.Add("AndroidAdvertising");
		}

```

查看 Unreal Match 3 Target.cs 文件（`Match3\Source\Match3.Target.cs`），了解它如何融入整个文件。

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

-   [配置](/documentation/zh-cn/unreal-engine/using-ad-mob-for-in-game-ads-on-android-with-unreal-engine#%E9%85%8D%E7%BD%AE)
-   [C++ 项目](/documentation/zh-cn/unreal-engine/using-ad-mob-for-in-game-ads-on-android-with-unreal-engine#c++%E9%A1%B9%E7%9B%AE)
-   [展示广告横幅](/documentation/zh-cn/unreal-engine/using-ad-mob-for-in-game-ads-on-android-with-unreal-engine#%E5%B1%95%E7%A4%BA%E5%B9%BF%E5%91%8A%E6%A8%AA%E5%B9%85)
-   [隐藏广告横幅](/documentation/zh-cn/unreal-engine/using-ad-mob-for-in-game-ads-on-android-with-unreal-engine#%E9%9A%90%E8%97%8F%E5%B9%BF%E5%91%8A%E6%A8%AA%E5%B9%85)