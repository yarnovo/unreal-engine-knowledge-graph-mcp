# 在虚幻引擎项目中使用 Google Play Services 排行榜 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-google-play-services-leaderboards-in-unreal-engine-projects
> 
> 生成时间: 2025-06-14T20:01:09.869Z

---

目录

![使用 Google Play Services 排行榜](https://dev.epicgames.com/community/api/documentation/image/61419c9f-b087-493a-87fa-facf529fbfbe?resizing_type=fill&width=1920&height=335)

![Banner Image](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fed03fb-e9df-4875-bf26-6c151b1563d5/android-leaderboard-banner.png "Banner Image")

## 配置

在 [排行榜 | Play Game Services | Google 开发者](https://developers.google.com/games/services/common/concepts/leaderboards) 中可查阅应用程序 Google Play Game Services 设置的内容。

针对虚幻项目进行的操作：

1.  在 **虚幻编辑器** 的 **Edit** 菜单中选择 **Project Settings** 查看项目的配置选项。
    
    ![Open Project Settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/818f609e-7cfe-4098-bcd8-6ff3a29c4ad4/ue5_1-01-open-project-settings.png "Open Project Settings")
2.  选择左边的 **Platforms:Android** 标签。找到 **Google Play Services** 分段，为Google Play服务平台配置项目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1804b085-f07f-4029-a7e4-29a8b875cd42/ue5_1-02-configure-project-for-google-play.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1804b085-f07f-4029-a7e4-29a8b875cd42/ue5_1-02-configure-project-for-google-play.png)
    
    点击查看大图
    
3.  勾选 **Google Play Services** 部分下的 **Enable Google Play Support** 选项。
    
4.  在 **Games App ID** 栏位中输入游戏的 App ID。
    
5.  在 **Google Play License Key** 栏位中输入 Google Play 授权码。
    
6.  添加元素到 **Leaderboard Map**。
    
7.  在 **Leaderboard Map** 中，需要输入仅用于虚幻项目的 **Name** 和在 Google Play Services 中设置的 **Leaderboard ID**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a50c8232-524f-459b-b7e0-2716d86747f3/ue5_1-03-set-options-for-google-play.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a50c8232-524f-459b-b7e0-2716d86747f3/ue5_1-03-set-options-for-google-play.png)
    
    点击查看大图
    
    应用程序和 Game Services 的这些数值保存在 Google Play Developer Console 中。
    

成就映射中的 **Name** 数值只是 Google Play Services **Leaderboard ID** 的一个映射，且 iOS 由它们的 **Leaderboard Reference** 直接引用。如需在安卓和 iOS 两个平台上进行发布，可将来自 iOS Game Center 设置的 Leaderboard Reference 作为 **Name** 输入，之后只需调用一个节点即可（无论哪个平台）。

## 从排行榜读取

**Read Leaderboard Integer** 节点将从平台的游戏服务（当前为 iOS Game Center 或 Google Play Services）请求存储在特定 **Player Controller** 的给定 **Stat Name** 上的数值。

它是 **隐藏** 节点，因此拥有多个执行输出引脚。最上方的是"pass through"，功能与其他执行输出引脚相似。在线服务返回数值（或返回数值失败）后，其他两个引脚（**On Success** 和 **On Failure**）将执行。在成功返回前（或者服务获取反馈失败），**Leaderboard Value** 的数值为 `0`。

**在蓝图中：**

下图取自 Unreal Match 3 示例游戏的 **Global Game Instance** 蓝图。在这几个节点中，我们对 Stat Name（排行榜）"Match3HighScore"上 Player Index 0 处的 Player Controller 调用 **Read Leaderboard Integer** 节点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43a722b2-716f-4bee-aaea-a703cc3bf942/readleaderboard.png)

## 写入排行榜

**Write Leaderboard Integer** 将把给定整数 **Stat Value** 发送到特定 **Player Controller** 的 **Stat Name** 中指定的排行榜。

**在蓝图中：**

下图取自 Unreal Match 3 示例游戏的 **VictoryScreen** 蓝图。胜利（或失败）画面显示时，将会检查加载的 Unreal Match 3 是否可获取高分；如可获取，则将把最新高分提交到排行榜。在执行此检查前会先执行一些额外检查，确定新高分是否高于 app 启动时拉取的高分；即使不存在此高分，iOS 和安卓排行榜也只接受大于当前保存数值的新数值。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2ac70a1-05f7-4237-9bd2-a833bde1c5f2/writeleaderboard.png)

## 显示平台特有的排行榜

**Show Platform Specific Leaderboard Screen** 将在设备上显示由 **Category Name** 指定的排行榜。

**在蓝图中：**

下图取自 Unreal Match 3 示例游戏的 **GameOverButtons** 蓝图控件。按下 **ShowScores** 按钮后，游戏将显示排行榜。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/650b3654-5c0b-4b76-a823-af86af8e36fd/showleaderboard.png)

-   [development](https://dev.epicgames.com/community/search?query=development)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [leaderboards](https://dev.epicgames.com/community/search?query=leaderboards)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置](/documentation/zh-cn/unreal-engine/using-google-play-services-leaderboards-in-unreal-engine-projects#%E9%85%8D%E7%BD%AE)
-   [从排行榜读取](/documentation/zh-cn/unreal-engine/using-google-play-services-leaderboards-in-unreal-engine-projects#%E4%BB%8E%E6%8E%92%E8%A1%8C%E6%A6%9C%E8%AF%BB%E5%8F%96)
-   [写入排行榜](/documentation/zh-cn/unreal-engine/using-google-play-services-leaderboards-in-unreal-engine-projects#%E5%86%99%E5%85%A5%E6%8E%92%E8%A1%8C%E6%A6%9C)
-   [显示平台特有的排行榜](/documentation/zh-cn/unreal-engine/using-google-play-services-leaderboards-in-unreal-engine-projects#%E6%98%BE%E7%A4%BA%E5%B9%B3%E5%8F%B0%E7%89%B9%E6%9C%89%E7%9A%84%E6%8E%92%E8%A1%8C%E6%A6%9C)