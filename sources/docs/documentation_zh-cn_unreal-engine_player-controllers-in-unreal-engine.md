# 虚幻引擎中的玩家控制器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/player-controllers-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:47:45.318Z

---

目录

![玩家控制器](https://dev.epicgames.com/community/api/documentation/image/31762d60-db7f-4e50-857d-82a3aa11cdc9?resizing_type=fill&width=1920&height=335)

**PlayerController（玩家控制器）** 是Pawn和控制它的人类玩家间的接口。PlayerController本质上代表了人类玩家的意愿。

当您设置PlayerController时，您需要考虑的一个事情就是您想在PlayerController中包含哪些功能及内容。您可以在 **Pawn** 中处理所有输入， 尤其是不太复杂的情况下。但是，如果您的需求非常复杂，比如在一个游戏客户端上的多玩家、或实时地动态修改角色的功能，那么最好 PlayerController中处理输入。在这种情况中，PlayerController决定要干什么，然后将命令（比如"开始蹲伏"、"跳跃"）发布给Pawn。

同时，某些情况下，则必须把输入处理或其他功能放到PlayerController中。PlayerController在整个游戏在过程中都是一直存在的，但是Pawn可能是临时存在的。 比如，在死亡竞技模式的游戏中，您可能死了又重生，所以您将获得一个新的Pawn，但是您的PlayerController都是一样的。在这个示例中，如果您将分数保存到您的Pawn上， 那么分数将会重置，但是如果您将分数保存到PlayerController上，它将不会重置。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay framework](https://dev.epicgames.com/community/search?query=gameplay%20framework)
-   [controller](https://dev.epicgames.com/community/search?query=controller)
-   [playercontroller](https://dev.epicgames.com/community/search?query=playercontroller)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)