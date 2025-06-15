# 虚幻引擎蓝图通信用法 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:37:16.118Z

---

目录

![蓝图通信用法](https://dev.epicgames.com/community/api/documentation/image/f17b5955-0255-461b-aa18-d50070c45ac9?resizing_type=fill&width=1920&height=335)

使用蓝图时，如需在蓝图之间传递或共享信息，需要使用一种形式的 **蓝图通信**。可根据需求使用数种不同类型的通信。此页面讲述最常用的方法并提供帮助链接和使用情况范例。

## 直接蓝图通信

Actor直接通信是在关卡Actor中传递信息的最常见方法。该方法中，你需要获取目标Actor的引用，以便让你的当前Actor获取目标Actor的信息。该通信方法是目标Actor与当前Actor之间的一对一通信方法。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f321ad4-4f9e-453f-b0ab-a4987a4f08bd/2_9.png)

### 何时使用

以下范例讲述何时使用 **直接蓝图通信**：

-   **关卡中存在两个 Actors，需要进行相互之间的通信。**
    -   与关卡中的一个开关进行互动后打开特定的门或开启特定的灯（每个均为单独的蓝图）。

在 [设置直接蓝图交流](/documentation/zh-cn/unreal-engine/actor-communication-in-unreal-engine)中可查阅设置流程。

## 事件分配器

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e54390cb-a6bb-466f-8697-5e335ec832e6/opendooreventdispatch.png)

**事件分配器** 适用于告知其他"正在倾听的"蓝图已发生事件。事件发生时，正在倾听的蓝图便会作出反应，并相互独立地执行预期的操作。

例如，游戏中有一个 Boss，它被消灭时将会调用"OnDied"事件分配器。可将"OnDied"事件 [绑定](/documentation/zh-cn/unreal-engine/binding-and-unbinding-events-in-unreal-engine)在任意数量的其他蓝图中，如角色（作出庆祝动作）、关卡中的门（会打开）或 HUD（显示 UI 信息）。所有这些蓝图均在收到 Boss 被消灭的"OnDied"通知后执行。

可在[事件分发器](/documentation/zh-cn/unreal-engine/event-dispatchers-in-unreal-engine)中查阅详细内容。

### 何时使用

**事件分配器** 使用时机的例子：

-   **需要从角色蓝图到关卡蓝图进行通信。**
    -   玩家角色升级，需要开放之前锁定的区域。
    -   玩家角色按下行动按钮，对关卡执行某种操作。
-   **生成的 Actor 执行某种操作时触发事件。**
    -   生成一个 Boss，Boss 被消灭时触发事件，在世界场景中生成一个奖励。
    -   在关卡中生成一个道具（武器、回复剂等）并在道具被拾起时告知道具和角色。

## 蓝图接口

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f37352dc-5cb9-4c23-9f7d-ec61dafd6375/interfacenodes.png)

通过 **蓝图接口**（简称 **接口**）可实现与多种类型对象（均共享特定功能）形成互动的一般方法。 例如汽车和树是完全不同的两种对象，但拥有一个共同点 - 它们均可被武器开火击中并遭到破坏。

创建一个包含 **OnTakeWeaponFire** 函数的蓝图接口，让汽车和树应用此蓝图接口后即可将二者视为相同的对象； 在任意一个对象被击中时调用 **OnTakeWeaponFire** 函数，并使它们出现不同反应。

理解蓝图接口的最佳方式是将其视为一种合约。合约的内容为："如应用此接口，则须承诺应用这些特定的函数，并在调用时形成反应。" 多个蓝图可应用一个接口，但并非所有蓝图均会形成反应（部分蓝图将无视调用）。回到之前武器开火的例子中，墙壁不需要对破坏作出反应，因此它们不会应用带 **OnTakeWeaponFire** 函数的接口，并无视调用。

可在 [在蓝图中实现接口](/documentation/zh-cn/unreal-engine/implementing-blueprint-interfaces-in-unreal-engine)中查阅详细内容。

### 何时使用

在以下情况实例中，**蓝图接口** 非常适合于通信：

-   **数个蓝图中存在一些相似功能，但在调用后执行不同的效果。**
    -   玩家拥有一个火焰喷射器，使用时将触发一个名为 **ElementalDamage** 的事件。树木蓝图接受 ElementalDamage 调用并将树木烧毁，而雪人蓝图将把雪人融化。
    -   玩家拥有一个"use"按钮，按下按钮可执行开门、关灯、拾起道具等操作。
    -   敌人拥有特殊能力，可基于玩家的体力值完成变化，执行不同操作。

## 蓝图转换

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac872fae-e6ef-4811-8e9d-b46642e3524d/event6.png)

蓝图通信的另一种常见形式是使用 **Cast** 节点。使用 Cast 节点时，便是在询问对象"你是否为该对象的特殊版本"。如果是，则进行访问；如否，则忽略请求。

例如，您创建了一个名为"Flying Character 蓝图"的特殊角色蓝图，此蓝图可使玩家角色在游戏中飞行。您可使用 **Get Player Character** 节点访问玩家角色的移动组件并在通过常规方法对玩家产生影响，如设置其位置、旋转等。您无法获得飞行能力，因为 Character 蓝图并不了解飞行。只有"Flying Character 蓝图"了解飞行。在此例中，您需要获取玩家角色和 Cast To Flying 蓝图，之后才可访问 flying 函数。

如玩家角色未使用 Flying Character 蓝图而完全使用不同类型的 Character 蓝图，则执行 Cast To Flying 蓝图时会失败，因为并未使用 Flying 蓝图，所以无法访问并执行飞行命令。

### 何时使用

以下是 **蓝图转换** 使用时机的几个例子：

-   **需要访问另一个蓝图的特殊版本。**
    -   角色走进火焰中，导致体力值耗尽。
        -   转换到特殊的角色蓝图，以便访问并变更体力值。
    -   角色死亡，需要重新生成。
        -   转换到特殊的游戏模式蓝图，执行重新生成脚本。
-   **需要访问相同类的多个蓝图，并以相同方法进行修改。**
    -   场景中拥有数盏灯，事件发生时需将它们开启或关闭。
        -   转换到灯蓝图并执行函数将灯关闭。
-   **需要访问一个特殊的子蓝图。**
    -   存在基于一个动物蓝图（猫、狗、鸟）的数个蓝图，需要访问其中一个动物。
        -   转换到猫、狗和鸟，访问其相应的蓝图和特有功能。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [直接蓝图通信](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine#%E7%9B%B4%E6%8E%A5%E8%93%9D%E5%9B%BE%E9%80%9A%E4%BF%A1)
-   [何时使用](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8)
-   [事件分配器](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E5%88%86%E9%85%8D%E5%99%A8)
-   [何时使用](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8-2)
-   [蓝图接口](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine#%E8%93%9D%E5%9B%BE%E6%8E%A5%E5%8F%A3)
-   [何时使用](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8-3)
-   [蓝图转换](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine#%E8%93%9D%E5%9B%BE%E8%BD%AC%E6%8D%A2)
-   [何时使用](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8-4)