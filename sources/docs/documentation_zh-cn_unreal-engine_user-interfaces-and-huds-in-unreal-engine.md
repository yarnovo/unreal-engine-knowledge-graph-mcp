# 虚幻引擎用户界面和HUD | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/user-interfaces-and-huds-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:47:49.359Z

---

目录

![用户界面和HUD](https://dev.epicgames.com/community/api/documentation/image/c932fd51-8760-4c09-9110-06d7ecb55d05?resizing_type=fill&width=1920&height=335)

游戏与玩家通信和互动的方式极其重要。**用户界面**（UI）和 **头显**（HUD）是游戏向玩家提供游戏信息以及在某些情况下允许玩家与游戏互动的方式。

虚幻引擎4提供了创建UI和HUD的多种方式。`画布` 类可以用于在低级别直接在屏幕上绘图，覆盖在场景之上。

游戏界面用于将信息传达给玩家，并提供了用于提示用户直接输入的方法。 游戏界面通常包含两个主要元素：头显（HUD）和菜单或用户界面（UI）。

HUD指的是游戏期间在屏幕上覆盖的状态和信息。HUD的目的是 告知玩家当前游戏状态，即分数、生命值、游戏剩余时间等。 HUD通常是不可互动的，意味着玩家不能单击HUD的元素，因此 在HUD和用户界面难以分离的某些类型游戏中，这些元素会显示为灰色区域。

**用户界面** 指的是菜单和其他互动元素。这些元素通常是在屏幕上覆盖绘制的， 就像HUD一样，但在某些情况下，它们会成为游戏世界本身的一部分， 在场景中的一个表面上渲染出来。最明显的UI示例是游戏启动时显示的主菜单， 或玩家暂停游戏时显示的暂停菜单。但是，游戏期间可能会显示其他UI。这些 可以用于显示游戏中不同角色之间的对话，或在更复杂的情况下，如RTS或RPG， 它们可能成为游戏本身不可或缺的一部分，让玩家可以选择武器、盔甲、建筑单位等等。

## HUD

**HUD** 是显示屏幕上覆盖的元素的基本对象。游戏中每个由人类控制的玩家 都有自己的 `AHUD` 类实例，这个实例会绘制到个人视口上。如果是分屏多人游戏， 多个视口会共享同一个屏幕，但每个HUD仍会绘制到其自己的视口上。要使用的HUD的 类型或类由正在使用的游戏类型指定。

## 画布

**画布** 是可以在HUD渲染循环中使用的对象，用于在屏幕上绘制各种元素，如文本、纹理和 材质图块、任意三角形和简单的Primitive形状。除非您使用部分 专用的备选方法，否则使用画布绘制是用于在用虚幻引擎制作的游戏中 创建HUD和UI的方法。

## Slate

**Slate** 是一种自定义、平台无关的用户界面框架，可用于创建各种工具和应用的用户界面，比如虚幻编辑器。上手快，不枯燥。它采用声明式语法，能够快速设计、布局组件的样式，允许你创建和迭代用户界面。

[参阅Slate UI框架](/documentation/zh-cn/unreal-engine/slate-user-interface-programming-framework-for-unreal-engine)。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [HUD](/documentation/zh-cn/unreal-engine/user-interfaces-and-huds-in-unreal-engine#hud)
-   [画布](/documentation/zh-cn/unreal-engine/user-interfaces-and-huds-in-unreal-engine#%E7%94%BB%E5%B8%83)
-   [Slate](/documentation/zh-cn/unreal-engine/user-interfaces-and-huds-in-unreal-engine#slate)