# 在虚幻引擎中使用事件来驱动UI的更新 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/driving-ui-updates-with-events-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:20:45.664Z

---

目录

![使用事件来驱动UI的更新](https://dev.epicgames.com/community/api/documentation/image/935e37dd-4a6c-4329-b567-50ee42b5321d?resizing_type=fill&width=1920&height=335)

制作UI元素时，建议对内容进行优化，以提高性能并减少低效。例如，根据项目范围，[属性绑定](/documentation/zh-cn/unreal-engine/property-binding-for-umg-in-unreal-engine)可适用于向UI传递信息。但若有更为复杂的UI设置，或需优化项目，建议按需更新UI。

此参考指南中将讲解向HUD传递信息的三种方式。这三种方法均可完成任务。第三个实例未使用tick事件进行更新，而非使用[事件调度器](/documentation/zh-cn/unreal-engine/event-dispatchers-in-unreal-engine)手动更新信息，达到开销和性能最佳平衡。

## 示例1.函数绑定

在此示例中，我将学习使用 **函数绑定（Function Binding）** 更新玩家的生命/能量。

此处已设置基础生命/能量。

![Hierarchy structure of the HUD widget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1efaf179-b1f6-47a3-935b-4a484ea1769a/ue5_1-01-hierarchy.png "Hierarchy structure of the HUD widget")

设置好显示后，为名为 **GetHealth** 和 **GetEnergy** 的进度条 **创建绑定**。此类函数绑定投射到玩家角色蓝图，并指定生命和能量定义的变量。

以下为GetHealth的绑定。为进行调试，已添加 **Print String** 节点将生命变量的值打印到屏幕。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80e82026-d50e-4a5b-8063-2e650b2a107a/ue5_1-02-get-health-bind-script.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80e82026-d50e-4a5b-8063-2e650b2a107a/ue5_1-02-get-health-bind-script.png)

点击查看大图。

在下图中可看到玩家角色的生命和能量值被传递到HUD并在其中反映。同时还可看到，即使未更新生命值时，蓝色调试文本同样表明仍然逐帧检查生命值。

![Gameplay Example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3162f8c8-2e90-4193-9cbc-4dcc586dcac8/ue5_1-03-gameplay-example.png)

本质上，使用此种方法等同于提问："玩家角色蓝图是什么？"而在了解后，逐帧"提供生命和能量值"。对于小而简单的系统，此方法的效果上佳；但使用较复杂系统，且逐帧检查多个属性的更新时，此设置将导致性能降低。

## 示例2.属性绑定

第2种方法是 **属性绑定**，比函数绑定开销更低。

现在使用相同生命/能量设置，了解属性绑定的工作原理。

![Hierarchy structure of the HUD widget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bb23789-a0c3-45ff-b90b-a43e3006903e/ue5_1-01-hierarchy.png "Hierarchy structure of the HUD widget")

在[控件蓝图](/documentation/zh-cn/unreal-engine/widget-blueprints-in-umg-for-unreal-engine)的 **事件图表** 中，使用 **Event Construct** 获取对玩家角色蓝图的引用。

通过使用Event Construct，将投射到角色蓝图一次，并将信息存储为引用，以便脚本无需逐帧调用该信息。

![BP script of the HUD Widget Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3eb6b666-70bf-4f4f-b5fc-1b3b947a31bd/ue5_1-04-hud-widget-bp-script-1.png "BP script of the HUD Widget Blueprint")

之后可将进度条的值直接绑定到角色蓝图中的变量。

![Set bind for percent value](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8ce6815-728d-4dfa-9a60-5ab6d03eb147/ue5_1-05-set-percent-bind.png "Set bind for percent value")

利用此方法，则无需逐帧投射并检查"玩家角色蓝图是什么？"相反，仅逐帧查询生命和能量值。

根据项目规模，此方法更为高效；但若系统更复杂，则使用事件驱动可能更好。

## 示例3.事件驱动

现在将学习仅在事件变更时更新HUD的方法，继续使用相同生命/能量设置。

![Hierarchy structure of the HUD widget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ecbafc6-5aea-44aa-8673-2819602ad765/ue5_1-01-hierarchy.png "Hierarchy structure of the HUD widget")

在角色蓝图中，将 **事件调度器** 节点添加到递减生命的脚本末端。在此范例中，该事件调度器节点为 **Call Update Health**。

为进行测试，将生命设为按下 **F** 键时递减。

![BP Script for causing damage of the Character](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f38d576-a508-433f-acef-5d6796e33966/ue5_1-06-set-causing-damage.png "BP Script for causing damage of the Character")

现在减少生命时，将调用此事件调度器。在HUD控件蓝图的事件图表中，可再次使用Event Construct获取并保存对玩家角色蓝图的引用。还可将自定义事件绑定到该角色蓝图中的事件调度器，调用事件调度器时便调用该自定义事件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b236e19-a473-48af-8fbe-400a778bed97/ue5_1-07-hud-widget-bp-script-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b236e19-a473-48af-8fbe-400a778bed97/ue5_1-07-hud-widget-bp-script-2.png)

点击查看大图。

现在，HUD控件蓝图中的自定义事件将在玩家生命变化时检查并更新其显示，而非无论是否变化固定进行检查。

下图展示将生命和能量整合到同一个Event Construct脚本中的方法。

自定义事件 **UpdateHealth** 和 **UpdateEnergy** 与角色蓝图中的事件调度器绑定，仅在角色生命/能量值变化时调用。在绑定后构造HUD时，还可调用这两个自定义事件初始化显示。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9c8790a-15b0-4496-9c6f-c3cb9f7ced8e/ue5_1-08-hud-widget-bp-script-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9c8790a-15b0-4496-9c6f-c3cb9f7ced8e/ue5_1-08-hud-widget-bp-script-3.png)

点击查看大图。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [示例1.函数绑定](/documentation/zh-cn/unreal-engine/driving-ui-updates-with-events-in-unreal-engine#%E7%A4%BA%E4%BE%8B1%E5%87%BD%E6%95%B0%E7%BB%91%E5%AE%9A)
-   [示例2.属性绑定](/documentation/zh-cn/unreal-engine/driving-ui-updates-with-events-in-unreal-engine#%E7%A4%BA%E4%BE%8B2%E5%B1%9E%E6%80%A7%E7%BB%91%E5%AE%9A)
-   [示例3.事件驱动](/documentation/zh-cn/unreal-engine/driving-ui-updates-with-events-in-unreal-engine#%E7%A4%BA%E4%BE%8B3%E4%BA%8B%E4%BB%B6%E9%A9%B1%E5%8A%A8)

相关文档

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)