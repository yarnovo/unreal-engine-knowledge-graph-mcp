# 虚幻引擎第一人称射击游戏教程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/first-person-shooter-tutorial-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:33:36.073Z

---

目录

![第一人称射击游戏教程](https://dev.epicgames.com/community/api/documentation/image/2ee0066e-6495-401f-92f2-7a71c696180c?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ace391da-677f-45ca-ad80-a72903009a2d/fps-final-result.gif)

上图是教程完成后的效果。

如你是虚幻引擎 （UE）新手，建议你先阅读 [编程快速入门](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start)，学习 UE 中的 C++。学习此教程的前提是了解如何创建项目、为项目添加 C++ 代码，以及在虚幻编辑器中配置输入。

如你已可使用 UE 中的 C++，但不确定如何创建 Pawn 类或配置输入，可通过[玩家输入和Pawn](/documentation/zh-cn/unreal-engine/quick-start-guide-to-player-input-in-unreal-engine-cpp) 教程开始学习上手必需的 C++ 概念和技能。

## 目标

此教程旨在说明如何使用 C++ 构建基本的第一人称射击游戏（FPS）。

## 目的

完成教程之后你将学会：

-   设置项目
-   实现角色
-   实现发射物
-   设置角色动画

## 教程目录

-   [建立项目](/documentation/zh-cn/unreal-engine/setting-up-your-project-in-unreal-engine)
-   [2 - 添加角色](/documentation/zh-cn/unreal-engine/implementing-your-character-in-unreal-engine)
-   [3 - 实现发射物](/documentation/zh-cn/unreal-engine/implementing-projectiles-in-unreal-engine)
-   [4 - 添加角色动画](/documentation/zh-cn/unreal-engine/adding-character-animation-in-unreal-engine)

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/first-person-shooter-tutorial-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/first-person-shooter-tutorial-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [教程目录](/documentation/zh-cn/unreal-engine/first-person-shooter-tutorial-in-unreal-engine#%E6%95%99%E7%A8%8B%E7%9B%AE%E5%BD%95)