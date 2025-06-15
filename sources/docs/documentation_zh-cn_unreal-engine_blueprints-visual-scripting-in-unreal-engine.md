# 蓝图可视化脚本 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:07.710Z

---

目录

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/e076322d-ce7c-439d-891d-63ed1dd9175d?resizing_type=fill&width=1920&height=335)

虚幻引擎中的 **蓝图 - 可视化脚本系统** 是一个完整的游戏脚本系统，其理念是，在虚幻编辑器中，使用基于节点的界面创建游戏可玩性元素。 和其他一些常见的脚本语言一样，蓝图的用法也是通过定义在引擎中的面向对象的类或者对象。 在使用虚幻 4 的过程中，常常会遇到在蓝图中定义的对象，并且这类对象常常也会被直接称为"蓝图（Blueprint）"。

该系统非常灵活且非常强大，因为它为设计人员提供了一般仅供程序员使用的所有概念及工具。 另外，在虚幻引擎的 C++ 实现上也为程序员提供用于蓝图功能的语法标记，通过这些标记，程序员能够很方便的创建一个基础系统，并交给策划进一步在蓝图中对这样的系统进行扩展。

## 新手入门

[](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine)

[![蓝图快速入门指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16d156a3-a246-4d9f-9572-455df1238d0a/quickstart.png)](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine)

[蓝图快速入门指南](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine)

[创建并运行你的第一个蓝图。](/documentation/zh-cn/unreal-engine/quick-start-guide-for-blueprints-visual-scripting-in-unreal-engine)

[

![蓝图可视化脚本概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94126244-4abf-40f8-ba6f-bfdf30ab540b/blueprint_topic.png)

蓝图可视化脚本概述

蓝图总览页面包含蓝图剖析和可用的不同蓝图类型。





](/documentation/zh-cn/unreal-engine/overview-of-blueprints-visual-scripting-in-unreal-engine)

## 常规脚本编写

[](/documentation/zh-cn/unreal-engine/basic-scripting-with-blueprints-in-unreal-engine)

[![蓝图脚本编写基础](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a33c08b-62b8-4cab-8e14-63e279a83adb/using_interface_topic.png)](/documentation/zh-cn/unreal-engine/basic-scripting-with-blueprints-in-unreal-engine)

[蓝图脚本编写基础](/documentation/zh-cn/unreal-engine/basic-scripting-with-blueprints-in-unreal-engine)

[介绍蓝图可视化脚本中的变量和执行流程。](/documentation/zh-cn/unreal-engine/basic-scripting-with-blueprints-in-unreal-engine)

## 编译蓝图

[](/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine)

[![蓝图剖析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ac7ff7d-3b26-42b0-9289-2faeb79fdcc7/anatomy.png)](/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine)

[蓝图剖析](/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine)

[通过此用户指南可学习蓝图的各个部分，以及蓝图图表中可用的节点。](/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine)

[

![专用蓝图节点组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6b3b7c4-657e-4c66-985d-94ae49a24c5f/using_interface_topic.png)

专用蓝图节点组

关于蓝图的各个部分及蓝图图表中可用的节点的用户指南。





](/documentation/zh-cn/unreal-engine/specialized-blueprint-visual-scripting-node-groups-in-unreal-engine)[

![蓝图教程](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58117fa7-a2f9-4812-a4d5-77b6d85b1a9a/bp_howto_topic.png)

蓝图教程

蓝图教程页面包含数个精炼的蓝图使用步骤指南。





](/documentation/zh-cn/unreal-engine/blueprint-workflows-in-unreal-engine)[

![蓝图编辑器速查表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f87faa2b-6d76-4cf2-a7b7-a02cd0ae23ae/blueprintcheatsheet.png)

蓝图编辑器速查表

蓝图相关的快捷方式及有用操作的参考指南。





](/documentation/zh-cn/unreal-engine/blueprint-editor-cheat-sheet-in-unreal-engine)[

![蓝图最佳实践](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7834e6a-b6e8-4489-9444-f1c206849daa/bestpractices_topic.png)

蓝图最佳实践

蓝图的使用时机、最佳设置方法的提示和技巧。





](/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine)

## 蓝图通信

[](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine)

[![蓝图通信用法](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0479d86f-0ced-40a8-9bc6-693632f8ded6/bp_comms_topic.png)](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine)

[蓝图通信用法](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine)

[蓝图通信不同用法的总览。](/documentation/zh-cn/unreal-engine/blueprint-communication-usage-in-unreal-engine)

[

![事件分发器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4085de2-15c4-42d4-b96c-f541c9eae718/event_dispatcher_topic.png)

事件分发器

允许蓝图类向关卡蓝图报告其状态。





](/documentation/zh-cn/unreal-engine/event-dispatchers-in-unreal-engine)[

![蓝图接口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fcc0e47-99e6-4709-9835-42d219d971d5/blueprint_interface.png)

蓝图接口

声明函数以定义蓝图之间接口的蓝图。





](/documentation/zh-cn/unreal-engine/blueprint-interface-in-unreal-engine)

## 话题

[

![蓝图技术指南](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e997699-3097-4c94-8b86-4eae8833e5eb/placeholder_topic.png)

蓝图技术指南

关于程序员应用蓝图的技术指南。





](/documentation/zh-cn/unreal-engine/technical-guide-for-blueprints-visual-scripting-in-unreal-engine)[

![蓝图最佳实践](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7834e6a-b6e8-4489-9444-f1c206849daa/bestpractices_topic.png)

蓝图最佳实践

蓝图的使用时机、最佳设置方法的提示和技巧。





](/documentation/zh-cn/unreal-engine/blueprint-best-practices-in-unreal-engine)[

![蓝图命名空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0f79813-7108-4fa0-afc3-615eb4b15a37/placeholder_topic.png)

蓝图命名空间

蓝图命名空间概述





](/documentation/zh-cn/unreal-engine/blueprint-namespaces-in-unreal-engine)[

![蓝图简介](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3d5253f-e435-423f-b5ed-039cb9b761d0/intro_topic.png)

蓝图简介

蓝图可视化脚本介绍。





](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine)[

![蓝图剖析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ac7ff7d-3b26-42b0-9289-2faeb79fdcc7/anatomy.png)

蓝图剖析

通过此用户指南可学习蓝图的各个部分，以及蓝图图表中可用的节点。





](/documentation/zh-cn/unreal-engine/anatomy-of-a-blueprint-in-unreal-engine)[

![蓝图调试器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62893c3e-e96c-4f83-ab44-cf918c093ad0/placeholder_topic.png)

蓝图调试器

使用断点来暂停蓝图的执行逻辑，以检查图表及其变量值。





](/documentation/zh-cn/unreal-engine/blueprint-debugger-in-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [新手入门](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine#%E6%96%B0%E6%89%8B%E5%85%A5%E9%97%A8)
-   [常规脚本编写](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine#%E5%B8%B8%E8%A7%84%E8%84%9A%E6%9C%AC%E7%BC%96%E5%86%99)
-   [编译蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine#%E7%BC%96%E8%AF%91%E8%93%9D%E5%9B%BE)
-   [蓝图通信](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine#%E8%93%9D%E5%9B%BE%E9%80%9A%E4%BF%A1)
-   [话题](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine#%E8%AF%9D%E9%A2%98)