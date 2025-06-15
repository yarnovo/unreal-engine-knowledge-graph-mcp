# 面向虚幻引擎的Horde分析教程 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/horde-analytics-tutorial-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:38:08.973Z

---

目录

![Horde分析教程](https://dev.epicgames.com/community/api/documentation/image/58c31c14-50f6-4045-9251-378a85e644c4?resizing_type=fill&width=1920&height=335)

## 简介

**Horde** 实现了一个遥测收集器，它可以接收和处理虚幻编辑器发送的事件。

Horde将遥测事件聚合为用于离散时间间隔的 **指标** ，然后可以通过Horde操作面板绘制图表，从而提供有关你的团队所遇瓶颈的宝贵见解。

![分析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c221536-a261-4876-b5cd-9d24cf567eaf/analytics-main.png)

## 先决条件

-   Horde服务器安装（参阅[快速入门：安装Horde](/documentation/zh-cn/unreal-engine/horde-installation-tutorial-for-unreal-engine)）。
-   以虚幻引擎5.5或更高版本为目标的虚幻引擎项目。

## 步骤

1.  在虚幻编辑器中，打开你的项目，并前往 `编辑（Edit）> 插件（Plugins）` 菜单。搜索 `Studio Telemetry` 插件并确保启用插件。该插件应该会默认启用。
2.  打开项目的 `DefaultEngine.ini` 文件（在 `.uproject` 文件旁边的 `Config` 文件夹中），并添加以下几行：
    
    ```cpp
         [StudioTelemetry.Provider.HordeAnalytics]
         Name=HordeAnalytics
         ProviderModule=AnalyticsET
         UsageType=EditorAndClient
         APIKeyET=HordeAnalytics.Dev
         APIServerET="http://localhost:13340/"
         APIEndpointET="api/v1/telemetry/engine"
    ```
    
    确保将 `APIServerET` 的值替换为你的Horde服务器的地址。
    
3.  配置遥测存储以聚合遥测事件的指标。Horde安装中包含一些默认指标和图表，将以下代码片段添加到你的[globals.json](/documentation/zh-cn/unreal-engine/horde-orientation-for-unreal-engine)文件即要添加这些指标和图表：
    
    ```cpp
             // 定义"引擎"遥测存储并在其中创建一些标准指标。
             "telemetryStores": [
                 {
                     "id": "engine",
                     "include": [
                         {
                             "path": "$(HordeDir)/Defaults/default-metrics.telemetry.json"
                         }
                     ]
                 }
             ],
    		
             // 配置默认操作面板来渲染它们
             "dashboard": {
                 "include": [
                     {
                         "path": "$(HordeDir)/Defaults/default-analytics.dashboard.json"
                     }
                 ]
             },
    ```
    

## 另请参阅

-   [配置 > 分析](/documentation/zh-cn/unreal-engine/horde-analytics-for-unreal-engine)

-   [horde](https://dev.epicgames.com/community/search?query=horde)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [简介](/documentation/zh-cn/unreal-engine/horde-analytics-tutorial-for-unreal-engine#%E7%AE%80%E4%BB%8B)
-   [先决条件](/documentation/zh-cn/unreal-engine/horde-analytics-tutorial-for-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [步骤](/documentation/zh-cn/unreal-engine/horde-analytics-tutorial-for-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [另请参阅](/documentation/zh-cn/unreal-engine/horde-analytics-tutorial-for-unreal-engine#%E5%8F%A6%E8%AF%B7%E5%8F%82%E9%98%85)