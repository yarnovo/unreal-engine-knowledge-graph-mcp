# 虚幻引擎事件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/events-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:41.329Z

---

目录

![事件](https://dev.epicgames.com/community/api/documentation/image/96e2e1f2-faf2-467e-98cc-297a6ceda13b?resizing_type=fill&width=1920&height=335)

**事件（Events）** 是从游戏性代码中调用的节点， 在 **事件图表（EventGraph）** 中开始执行个体网络。 它们使蓝图执行一系列操作，对游戏中发生的特定事件（如游戏开始、关卡重置、受到伤害等）进行回应。

这些事件可在蓝图中访问，以便实现新功能，或覆盖/扩充默认功能。任意数量的 **Events** 均可在单一 **EventGraph** 中使用，但每种类型只能使用一个。

一个事件只能执行一个目标。如果想要从一个事件触发多个操作，需要将它们线性串联起来。

![Blueprint Class Events Expanded](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19431761-490b-4e71-87a0-2bebce9d8911/eventsexpanded.png) ![Level Blueprint Events Expanded](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbc9ba7c-7781-4812-8ad0-8ccd3b07c8e0/levelbpeventsexpanded.png)

## Event Level Reset

此蓝图事件节点仅在关卡蓝图中可用。

![LevelReset.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78981934-68ca-420f-bc3e-62f8199203d3/levelreset.png)

**Level Reset** 事件在关卡重启时发出执行信号。 它在关卡重新加载后进行某项触发时非常实用。 如玩家角色已死亡，但关卡无需重新加载时。

![LevelReset_Example.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09c0e57a-a90b-4f28-9d47-c3bace66813e/levelreset_example.png)

## Event Actor Begin Overlap

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31e32892-862d-4255-bcd5-078fcc33e55d/beginoverlap.png)

多项条件同时满足时，将执行该事件：

-   Actor 之间的碰撞响应必须允许重叠。
-   执行事件的两个 Actor 的 **Generate Overlap Events** 均设为 true。
-   最后，两个 Actor 的碰撞开始重叠；两者移到一起或其中一个创建时与另一个重叠。

关于碰撞详细信息，请查阅：[碰撞响应](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f77df39c-a528-4b7c-b1f4-e7b95f491594/beginoverlapex.png)

此蓝图 Actor 和保存在 Player Actor 变量中的 Actor 重叠时，它将增加 Counter 整数变量。

项目

描述

输出引脚

 

**Other Actor**

Actor - 这是与此蓝图发生重叠的 Actor。

## Event Actor End Overlap

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a8658bf-2e9d-40f4-9b70-ceb30d7fe622/endoverlap.png)

多项条件同时满足时，将执行该事件：

-   Actor 之间的碰撞响应必须允许重叠。
-   执行事件的两个 Actor 的 **Generate Overlap Events** 均设为 true。
-   最后，两个 Actor 的碰撞停止重叠；它们将分离，或在其中一个将被销毁。

关于碰撞详细信息，请查阅：[碰撞响应](/documentation/zh-cn/unreal-engine/collision-in-unreal-engine)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/503057e3-dbdf-4960-8edc-9970813c34c1/endoverlapex.png)

当此蓝图 Actor 不与其他 Actor 发生重叠时（保存在 Player Actor 变量中的 Actor 除外），它将销毁重叠的 Actor。

项目

描述

输出引脚

 

**Other Actor**

Actor - 这是与此蓝图发生重叠的 Actor。

## Event Hit

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8db047af-2a38-4346-8ed4-4467591e04c8/eventhit.png)

只要其中一个相关 Actor 的碰撞设置中 **Simulation Generates Hit Events** 设为 true，该事件便会执行。

如您使用 Sweeps 创建运动，即使未选中标记也将获得此事件。只要 Sweep 阻止您移过阻挡物体，这便会发生。

项目

描述

输出引脚

 

**My Comp**

原始组件 - 被命中的执行 Actor 上的组件。

**Other**

Actor - 参与碰撞的其他 Actor。

**Other Comp**

原始组件 - 参与碰撞，被命中的其他 Actor 上的组件。

**Self Moved**

布尔型 - 接受来自另一个物体运动的命中时使用（如为 false），对 Hit Normal 和 Hit Impact Normal 的方向进行调整，以便表现其他物体对被命中物体施加的力。

**Hit Location**

矢量 - 两个碰撞 Actor 之间的接触位置。

**Hit Normal**

矢量 - 碰撞方向。

**Normal Impulse**

矢量 - Actor 碰撞的力。

**Hit**

命中结果结构体 - 一次命中中收集到的所有数据，可剥离并"打破"该结果，访问数据的单个位元。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fd740fe-b0d0-4fc6-a4b7-156aef039ba8/eventhitex.png)

在此例中，蓝图执行 Hit 时，它将在冲撞点生成爆炸效果。

## Event Any Damage

此蓝图事件节点仅在服务器上执行。在单人游戏中，本地客户端即视为服务器。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4f335d8-02cb-4887-85d4-56c6000d792d/anydamage.png)

此事件在造成整体伤害时出现。如溺死或环境伤害，并非点伤害或放射伤害。

项目

描述

输出引脚

 

**Damage**

浮点型 - 传入 Actor 的伤害量。

**Damage Type**

伤害类型对象 - 这是在输出伤害上包含额外数据的对象。

**Instigated By**

Controller - 负责伤害的对象的控制器（Controller）。可以是开枪的玩家控制器，或是投手雷造成伤害的 AI控制器。

**Damage Causer**

Actor - 输出伤害的 Actor。这可以是子弹或爆炸。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f034e2cc-f669-4d5c-81ac-3b1fc2f1dfb4/anydamageex.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f034e2cc-f669-4d5c-81ac-3b1fc2f1dfb4/anydamageex.png)

此处，如果对 Actor 造成的伤害来自水，将减少体力值并在屏幕上生成警告。

## Event Point Damage

此蓝图事件节点仅在服务器上执行。在单人游戏中，本地客户端即视为服务器。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1964907-616b-4572-b77f-bccde2257749/pointdamage.png)

**点伤害（Point Damage）** 代表由投射物、扫射武器、甚至近战武器造成的伤害。

项目

描述

输出引脚

 

**Damage**

浮点型 - 传入 Actor 的伤害量。

**Damage Type**

伤害类型对象 - 这是在输出伤害上包含额外数据的对象。

**Hit Location**

矢量 - 应用伤害的位置。

**Hit Normal**

矢量 - 碰撞方向。

**Hit Component**

原始组件 - 被命中的执行 Actor 上的组件。

**Bone Name**

名称 - 命中的骨骼名称。

**Shot from Direction**

矢量 - 伤害来源的方向。

**Instigated By**

Actor - 负责伤害的 Actor。这是开枪或投手雷造成伤害的 Actor。

**Damage Causer**

Actor - 输出伤害的 Actor。这可以是子弹或爆炸。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a964457-9258-4650-911d-1246114ed27b/pointdamageex.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a964457-9258-4650-911d-1246114ed27b/pointdamageex.png)

在此例中，受到任意伤害时均会从 Actor 的体力值减去造成的伤害。但如果 Actor 的头部被击中，则 Actor 的体力值设为 -1。

## Event Radial Damage

此蓝图事件节点仅在服务器上执行。在单人游戏中，本地客户端即视为服务器。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cc961e7-72f6-44d5-b419-202d43fce7f7/radialdamage.png)

**放射伤害（Radial Damage）** 事件在该序列的父 Actor 受到放射伤害时调用。这可用于处理基于爆炸伤害或间接伤害的事件。

项目

描述

输出引脚

 

**Damage Received**

浮点型 - 从事件接收的伤害量。

**Damage Type**

伤害类型对象 - 这是在输出伤害上包含额外数据的对象。

**Origin**

矢量 - 3D 空间中的伤害来源位置。

**Hit Info**

命中结果结构体 - 一次命中中收集到的所有数据，可剥离并"打破"该结果，访问数据的单个位元。

**Instigated By**

控制器 - 发起伤害的控制器（AI 或玩家）。

**Damage Causer**

Actor - 输出伤害的 Actor。可以是子弹、火箭、激光或角色的拳击。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccfa5088-72f0-4544-b018-27c507641bdf/radialdamageex.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccfa5088-72f0-4544-b018-27c507641bdf/radialdamageex.png)

## Event Actor Begin Cursor Over

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66030ce7-c010-481f-9a06-0ea11d04576e/begincursorover.png)

使用鼠标界面时，鼠标光标在 Actor 上悬停时执行的事件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f89a7d00-4b9b-4e5c-8bb4-cf2d0490a257/begincursoroverex.png)

鼠标经过此 Actor 后，它将把动态材质实例上名为 Highlight 的标量参数设为 1.0。

## Event Actor End Cursor Over

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53058808-571c-4461-960b-87e0c8ae3167/endcursorover.png)

使用鼠标界面时，鼠标光标在 Actor 上移开时执行的事件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1cb1d36-ad7f-42db-b0e2-570d1e07d247/endcursoroverex.png)

它将把保存在 Target Notification 中的 Actor 设为在游戏中隐藏。

## Event Begin Play

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12782169-eb06-4b4e-a643-764db6a5d640/beginplay.png)

游戏开始时将在所有 Actor 上触发此事件。游戏开始后生成的所有 Actor 上均会立即调用此事件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14a1508e-aa31-4d21-b07a-6e3521fca27a/beginplayex.png)

开始游戏时，此 Actor 将把其体力值设为 1000，分数设为 0。

## Event End Play

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e330ffe9-b11e-44eb-8e6e-cbfc37ccbfde/endplay.png)

Actor 不存在于世界场景中时执行此事件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ac66d6e-5ba8-4201-9ce3-d166ae8299a3/endplayex.png)

此 Actor 不存在于世界场景中时，字符串将输出，说明事件被调用的原因。

项目

描述

输出引脚

 

**End Play Reason**

EEndPlayReason 枚举 - 说明 Event End Play 被调用原因的枚举。

## Event Destroyed

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/24818b87-a4b5-4303-a470-7d19067b5032/destroyed.png)

Actor 被销毁时执行此事件。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82ece4be-deba-47dd-83c3-e05de5c2fbaa/destroyedex.png)

此例中，Score 变量设为 Value 加 Score。

Destroyed 事件将在之后的版本中移除！Destroyed 函数的功能已合并到 EndPlay 函数。

## Event Tick

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98c972f9-230b-4a0d-b74a-510ba4850137/tick.png)

游戏进程中每帧调用的简单事件。

项目

描述

输出引脚

 

**Delta Seconds**

浮点型 - 输出帧之间的时间量。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5669db47-ee17-4bf5-bf86-9e494f1a226b/tickex.png)

此例使用 Delta Seconds 构成倒数计时器显示日志，最后的 tick 为"Blast Off!"

## Event Receive Draw HUD

此事件仅限继承自 HUD 类的蓝图类可用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93de4ae1-473f-4eb2-884a-fc5170c6a1e7/drawhud.png)

这是一个特殊事件，使蓝图可绘制到 HUD。此事件须创建 HUD 绘制节点。

项目

描述

输出引脚

 

**Size X**

Int - 渲染窗口的像素宽度。

**Size Y**

Int - 渲染窗口的像素高度。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af95c691-bd52-46c9-883e-d9cafb3e0355/drawhudex.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af95c691-bd52-46c9-883e-d9cafb3e0355/drawhudex.png)

这会在渲染窗口的中央创建一个可点击的 Hit Box，其后有一个红框，便于辨认。

## Custom Event

![Custom Event Node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce26ad86-ddb4-48d4-b132-68223cdbe55a/name_custom_event.png)

Custom Event 节点是拥有自身工作流程的特殊节点，请查阅 [自定义事件节点](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine) 中的更多内容。

扩展阅读：

-   [自定义事件](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine)：创建可以在蓝图序列的任意点上被调用的事件。
-   [通过Sequencer调用事件](/documentation/zh-cn/unreal-engine/fire-blueprint-events-during-cinematics-in-unreal-engine)：创建在播放动画序列时在指定时间触发的事件。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [execution flow](https://dev.epicgames.com/community/search?query=execution%20flow)
-   [special nodes](https://dev.epicgames.com/community/search?query=special%20nodes)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Event Level Reset](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventlevelreset)
-   [Event Actor Begin Overlap](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventactorbeginoverlap)
-   [Event Actor End Overlap](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventactorendoverlap)
-   [Event Hit](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventhit)
-   [Event Any Damage](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventanydamage)
-   [Event Point Damage](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventpointdamage)
-   [Event Radial Damage](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventradialdamage)
-   [Event Actor Begin Cursor Over](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventactorbegincursorover)
-   [Event Actor End Cursor Over](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventactorendcursorover)
-   [Event Begin Play](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventbeginplay)
-   [Event End Play](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventendplay)
-   [Event Destroyed](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventdestroyed)
-   [Event Tick](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventtick)
-   [Event Receive Draw HUD](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#eventreceivedrawhud)
-   [Custom Event](/documentation/zh-cn/unreal-engine/events-in-unreal-engine#customevent)