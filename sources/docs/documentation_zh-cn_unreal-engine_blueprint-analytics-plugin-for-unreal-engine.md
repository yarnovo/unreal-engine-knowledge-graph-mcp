# 虚幻引擎的蓝图分析插件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:55:52.594Z

---

目录

![蓝图分析插件](https://dev.epicgames.com/community/api/documentation/image/14431bb2-f58e-4934-a533-7aeb3e56837f?resizing_type=fill&width=1920&height=335)

引擎中的分析API专为不依赖UObject而设计。因此，你需要将蓝图转换到C++代码的转换层。我们已蓝图库插件的形式提供此转换层。启用该插件后，你可以开始从蓝图执行分析API调用。该插件会转换调用并将其发送到你为项目注册的默认分析服务商。如果未注册默认服务商，你将在项目的日志文件中看到警告消息。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/adc48fd6-a114-425e-936d-009b1b6f42d0/analytics_blueprint_plugin.png)

## 开始会话

该操作将为当前玩家开启新的分析会话。每个游戏会话应被视作唯一会话，以便你的分析数据捕获用户玩游戏的频率和时长。如果上一个会话还在进行中，则大部分服务商将自动关闭上一个会话并开始新的会话。

输出

说明

**Return Value**

默认分析服务商是否可以创建新会话。

## 停止会话

该操作将停止记录指定会话的事件。某些服务商会将数据输出到收集器中。

## 记录会话

要记录不含相关属性的事件，请使用 **Record Event** 节点。此类事件通常用于计算用户执行特定选项的次数。

输入

说明

**Event Name**

正在递增的事件的名称。

## 记录含单一属性的会话

该操作将按含单一属性的名称记录事件，以便你在唯一属性中比较该事件的频率。例如，下方的Item.Equipped事件将记录玩家在游戏中装备武器的频率，并将显示游戏中最受玩家欢迎的道具。

输入

说明

**Event Name**

正在递增的事件的名称。

**Attribute Name**

自定义该事件的属性的名称。

**Attribute Value**

自定义该事件的唯一部分所用的值。

## 记录含多个属性的会话

要提供有关事件的更多详细信息，你可以使用 **Record Event with Attributes**。当你想将多个属性作为事件的上下文时，可以使用该操作。在以下示例中，属性描述合成的道具、使用的材料以及玩家首选的伤害修正值。此示例显示玩家合成道具的偏好并揭示潜在的平衡问题。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5714f833-0019-4b7e-9757-f21e0190141c/record_event_with_attributes.png)

输入

说明

**Event Name**

正在递增的事件的名称。

**Attributes**

针对用户操作提供更多上下文的属性列表

## 创建AnalyticsEventAttr

该操作轻松简便，取两个字符串，然后将其转换成分析API所需的结构。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffd5db8a-ed13-4c20-9416-d250935cc171/make_analyticseventattr.png)

输入

说明

**Attribute Name**

正在创建的属性的名称。

**Attribute Value**

正在创建的属性的值。

## 输出事件

某些服务商会在本地缓存收集的分析数据，直到达到阀值或会话结束。该调用将指示服务商提交其本地缓存的所有数据。

\## 记录道具购买

该操作将记录使用游戏货币购买的游戏道具。这不是指现金交易。但是，该操作可跟踪使用游戏货币购买的道具。此游戏货币可通过游戏渐渐获取或用现金直接购买。要跟踪现金购买的游戏货币，请使用[记录货币购买](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine#%E8%AE%B0%E5%BD%95%E8%B4%A7%E5%B8%81%E8%B4%AD%E4%B9%B0) 节点。

输入

说明

**Item Id**

用于确定购买归属的唯一道具描述符。查看有关特定物品受欢迎程度的报告时使用此 ID。

**Currency**

描述购买道具所使用的游戏货币的字符串（金币、筹码、宝石等）

**Per Item Cost**

表示购买道具所花费的游戏货币。

**Item Quantity**

玩家购买的道具数量。

## 记录所提供货币

此操作记录游戏何时向玩家提供游戏货币。这可能是在完成任务、卖出道具、打开箱子等时候记录该数据十分重要，有助于你了解游戏经济的整体运行情况。

输入

说明

**Game Currency Type**

描述用于奖励给玩家的游戏货币的字符串（金币、筹码、宝石等）

**Game Currency Amount**

给予玩家的货币数量。

## 记录货币购买

该操作记录使用现金支付的游戏货币购买，也称为应用内购买。某些服务商将自动捕获该信息，如 Apsalar。通常，该行为可配置为打开/关闭，具体取决于你是否想要手动捕获此信息。

输入

说明

**Game Currency Type**

描述玩家购买的游戏货币的字符串（金币、筹码、宝石等）

**Game Currency Amount**

给予玩家的货币数量。

**Real Currency Type**

这是用于购买游戏货币的实际货币的 ISO 4217 3 字母缩写。有关详细信息，请参阅[ISO 指南](http://www.iso.org/iso/home/standards/currency_codes.htm) 。

**Real Money Cost**

用于购买游戏货币的现金数量。

**Payment Provider**

履行购买服务的服务商（Apple、Google、PayPal、Steam 等）

-   [analytics](https://dev.epicgames.com/community/search?query=analytics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始会话](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine#%E5%BC%80%E5%A7%8B%E4%BC%9A%E8%AF%9D)
-   [停止会话](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine#%E5%81%9C%E6%AD%A2%E4%BC%9A%E8%AF%9D)
-   [记录会话](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine#%E8%AE%B0%E5%BD%95%E4%BC%9A%E8%AF%9D)
-   [记录含单一属性的会话](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine#%E8%AE%B0%E5%BD%95%E5%90%AB%E5%8D%95%E4%B8%80%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%9A%E8%AF%9D)
-   [记录含多个属性的会话](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine#%E8%AE%B0%E5%BD%95%E5%90%AB%E5%A4%9A%E4%B8%AA%E5%B1%9E%E6%80%A7%E7%9A%84%E4%BC%9A%E8%AF%9D)
-   [创建AnalyticsEventAttr](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine#%E5%88%9B%E5%BB%BAanalyticseventattr)
-   [输出事件](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine#%E8%BE%93%E5%87%BA%E4%BA%8B%E4%BB%B6)
-   [记录所提供货币](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine#%E8%AE%B0%E5%BD%95%E6%89%80%E6%8F%90%E4%BE%9B%E8%B4%A7%E5%B8%81)
-   [记录货币购买](/documentation/zh-cn/unreal-engine/blueprint-analytics-plugin-for-unreal-engine#%E8%AE%B0%E5%BD%95%E8%B4%A7%E5%B8%81%E8%B4%AD%E4%B9%B0)