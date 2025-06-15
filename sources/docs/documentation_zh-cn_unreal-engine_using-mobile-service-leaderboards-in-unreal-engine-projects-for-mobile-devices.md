# 在虚幻引擎项目中使用移动服务排行榜 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-mobile-service-leaderboards-in-unreal-engine-projects-for-mobile-devices
> 
> 生成时间: 2025-06-14T19:59:36.352Z

---

目录

![使用移动服务排行榜](https://dev.epicgames.com/community/api/documentation/image/06bde33e-19ea-453a-b1d2-865f77372261?resizing_type=fill&width=1920&height=335)

通过排行榜可追踪并显示平台上玩家的高分。排行榜将会形成玩家之间的竞争，有助于社区的构建。

![iOS Game Center](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc81a339-e3d0-461c-80bf-dd8d15d8bedc/iosleaderboard.png)

![Google Play](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f0b53ae-1f27-4bb9-ac28-e24253376ec9/androidleaderboard.png)

iOS Game Center

Google Play

## 配置

在下方页面中查看在每个平台上进行排行榜配置的详细内容：

-   [使用 Google Play Services 排行榜](/documentation/zh-cn/unreal-engine/using-google-play-services-leaderboards-in-unreal-engine-projects)

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

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [leaderboards](https://dev.epicgames.com/community/search?query=leaderboards)
-   [services](https://dev.epicgames.com/community/search?query=services)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置](/documentation/zh-cn/unreal-engine/using-mobile-service-leaderboards-in-unreal-engine-projects-for-mobile-devices#%E9%85%8D%E7%BD%AE)
-   [从排行榜读取](/documentation/zh-cn/unreal-engine/using-mobile-service-leaderboards-in-unreal-engine-projects-for-mobile-devices#%E4%BB%8E%E6%8E%92%E8%A1%8C%E6%A6%9C%E8%AF%BB%E5%8F%96)
-   [写入排行榜](/documentation/zh-cn/unreal-engine/using-mobile-service-leaderboards-in-unreal-engine-projects-for-mobile-devices#%E5%86%99%E5%85%A5%E6%8E%92%E8%A1%8C%E6%A6%9C)
-   [显示平台特有的排行榜](/documentation/zh-cn/unreal-engine/using-mobile-service-leaderboards-in-unreal-engine-projects-for-mobile-devices#%E6%98%BE%E7%A4%BA%E5%B9%B3%E5%8F%B0%E7%89%B9%E6%9C%89%E7%9A%84%E6%8E%92%E8%A1%8C%E6%A6%9C)