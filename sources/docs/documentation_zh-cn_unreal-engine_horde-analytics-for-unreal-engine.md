# 面向虚幻引擎的Horde分析 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-analytics-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:37:18.281Z

---

目录

![Horde分析](https://dev.epicgames.com/community/api/documentation/image/c81efafe-79bc-4019-8af6-c3fd266eb26b?resizing_type=fill&width=1920&height=335)

Horde实现了HTTP端点，用于收集虚幻引擎编辑器发送的遥测数据。这些数据可以提供关于瓶颈和工作流程问题的深度信息，团队和Horde操作面板可以对这些数据进行汇总和图表展示，以突出显示随着时间推移所取得的改进以及出现的退步情况。

[入门 > 分析](/documentation/zh-cn/unreal-engine/horde-analytics-tutorial-for-unreal-engine)指南介绍了如何配置项目以向Horde发送遥测数据。

## 遥测存储

Horde支持多个正交遥测数据存储，允许你根据需要将不同项目的遥测数据分组。每个遥测数据存储都各自有一组指标，操作面板支持切换上下文，以便使用不同存储中的数据查看相同的图表。

要将数据发送到特定遥测存储，请在项目的 `DefaultEngine.ini` 文件中的 `APIEndpointET` 属性中包含遥测存储名称。例如， `engine` 将存储使用以下URL：

```cpp
APIEndpointET="api/v1/telemetry/engine"
```

## 指标

为了在较长的时间段内高效聚合分析数据，Horde会将遥测事件聚合为每个时间间隔的运行指标。该聚合操作将根据globals.json文件中 `Telemetry.Metrics` 部分所指定的规则来执行（请参阅[MetricConfig](/documentation/zh-cn/unreal-engine/horde-schema-for-unreal-engine#%E6%8C%87%E6%A0%87%E9%85%8D%E7%BD%AE)）。

## 绘制图表

Horde操作面板会提供图表，显示在服务器上收集的各项指标。这些视图将使用globals.json文件中 `Dashboard.Analytics` 部分进行配置（请参阅[TelemetryViewConfig](/documentation/zh-cn/unreal-engine/horde-schema-for-unreal-engine#telemetryviewconfig)）。

## 遥测接收器

Horde可以将原始遥测数据收集到自己的数据库中，也可以将这些数据转发到其他遥测接收器。

你可以通过服务器的[Server.json](/documentation/zh-cn/unreal-engine/horde-settings-for-unreal-engine#%E6%9C%8D%E5%8A%A1%E5%99%A8%E8%AE%BE%E7%BD%AE)文件中的 `Telemetry` 属性，配置遥测接收器。要从聚合数据计算指标，不一定要配置遥测数据接收器。

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [遥测存储](/documentation/zh-cn/unreal-engine/horde-analytics-for-unreal-engine#%E9%81%A5%E6%B5%8B%E5%AD%98%E5%82%A8)
-   [指标](/documentation/zh-cn/unreal-engine/horde-analytics-for-unreal-engine#%E6%8C%87%E6%A0%87)
-   [绘制图表](/documentation/zh-cn/unreal-engine/horde-analytics-for-unreal-engine#%E7%BB%98%E5%88%B6%E5%9B%BE%E8%A1%A8)
-   [遥测接收器](/documentation/zh-cn/unreal-engine/horde-analytics-for-unreal-engine#%E9%81%A5%E6%B5%8B%E6%8E%A5%E6%94%B6%E5%99%A8)