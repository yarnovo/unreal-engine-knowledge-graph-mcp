# 玩家出生点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/player-start-actor-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:58:51.499Z

---

目录

![玩家出生点](https://dev.epicgames.com/community/api/documentation/image/9ef44d01-61ae-4fd8-a088-248e6a80416d?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d77f8e6a-6008-462d-9ef1-0d7d2518b50c/player_start_actor.png)

无论是哪款游戏，能在场景任意位置生成玩家都是一项重要功能。虚幻引擎 4 通过一个特殊 Actor 来实现此功能，称之为 **玩家出生点（Player Start）**。所谓"玩家出生点"，就是指在游戏场景中的玩家初始位置。

## 放置玩家出生点 Actor

你可以在 **Basic（基础）** 类目下的 **Modes（模式）** 面板中找到玩家出生点 Actor。从 **Modes（模式）** 面板中将其拖入游戏世界场景即可。

## 使用玩家出生点 Actor

玩家出生点的使用方法极其简单：在 **Modes（模式）** 面板中选中它，然后拖入世界场景。场景中便会出现出现一个出生点。结合蓝图，你可以在场景任意位置生成玩家角色。

使用玩家出生点生成玩家时，需要考虑其位置和旋转方向。如要使角色在出生时面向某个特定对象，需要将出生点对准该方向。

## 玩家出生点的使用技巧

玩家出生点的使用方法非常简单，了解以下技巧能使开发过程更容易。

**No Player Start（无玩家出生点）：** 如开始游戏时世界场景中不存在玩家出生点，玩家角色在世界场景中出现的坐标将为 0,0,0。正因如此，请务必在世界场景中放置玩家出生点。

**Play From Here（从此处开始）：** 也许有时需要从非玩家出生点的其他位置开始游戏。在编辑器视口中 **单击右键**，选择 **Play From Here（从此处开始）** 选项，即可实现该功能。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e951e5b-cf01-40dc-9afa-b58fb09dbc4d/right_click_play.png)

**Bad Size（尺寸错误）:** 有时玩家出生点的控制器图标可能会变成一个 "BADsize" 字样的图标。出现此情况时，须在世界场景中移动玩家出生点，避免其与场景对象重叠。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [放置玩家出生点 Actor](/documentation/zh-cn/unreal-engine/player-start-actor-in-unreal-engine#%E6%94%BE%E7%BD%AE%E7%8E%A9%E5%AE%B6%E5%87%BA%E7%94%9F%E7%82%B9actor)
-   [使用玩家出生点 Actor](/documentation/zh-cn/unreal-engine/player-start-actor-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%8E%A9%E5%AE%B6%E5%87%BA%E7%94%9F%E7%82%B9actor)
-   [玩家出生点的使用技巧](/documentation/zh-cn/unreal-engine/player-start-actor-in-unreal-engine#%E7%8E%A9%E5%AE%B6%E5%87%BA%E7%94%9F%E7%82%B9%E7%9A%84%E4%BD%BF%E7%94%A8%E6%8A%80%E5%B7%A7)