# 虚幻引擎SEO-Title: Basic Scripting with Blueprints in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/basic-scripting-with-blueprints-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:34:16.485Z

---

目录

![蓝图脚本编写基础](https://dev.epicgames.com/community/api/documentation/image/f4c80fd6-119b-446d-b4fe-63630d679770?resizing_type=fill&width=1920&height=335)

蓝图为脚本语言提供了一种可视化的方法。就其本身而言，此系统与标准书面脚本语言有许多细微差别，例如数据类型化变量、数组、结构体等等。执行流的工作方式与在典型脚本语言中一样，但蓝图要求每个节点的显式线性执行。以下各页将更详细地介绍不同的变量类型、如何处理这些变量以及图表中节点的执行。

## 变量

变量可以采用各种不同的类型创建，包括布尔型、整数型和浮点型等数据类型。它们采用颜色编码，便于在您的蓝图中识别。蓝图变量还可以是用于保存对象、Actor和类等内容的引用类型。

## 执行流

在蓝图中，要执行的第一个节点是一个事件，然后是从左至右通过白色执行线的执行流。游戏运行时，您可以在编辑器中可视化执行流，这有助于调试。数据还流经采用匹配变量类型的彩色导线。当节点执行时，将对输入引脚进行评估，反向从右至左跟踪数据线，直到计算出最终结果并将其提供给节点。

带有执行引脚（非纯节点）的节点在执行时存储其输出引脚的值，而不带执行引脚（纯节点）的节点则在每次与其输出相连的节点执行时重新计算其输出。

[

![连接节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f4c0c19-4eeb-4d95-b3d2-079198fda7b8/placeholder_topic.png)

连接节点

蓝图中节点连接方式的范例。





](/documentation/zh-cn/unreal-engine/connecting-nodes-in-unreal-engine)[

![事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c113e8b3-1e5d-4e8c-9bfb-c12e83a9a329/events.png)

事件

从游戏性代码中调用的节点，在 EventGraph 中开始执行个体网络。





](/documentation/zh-cn/unreal-engine/events-in-unreal-engine)[

![流程控制](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/725d366b-e763-48c6-b4b0-15b75e9cff88/flowcontrol.jpg)

流程控制

用于根据情况控制执行流程的节点。





](/documentation/zh-cn/unreal-engine/flow-control-in-unreal-engine)[

![节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11ceedf8-d9e6-4cc5-b94b-e8f2bb2e63c6/placeholder_topic.png)

节点

节点图表通过使用事件和函数调用来执行动作，从而对和该蓝图相关的游戏性元素作出反应。





](/documentation/zh-cn/unreal-engine/nodes-in-unreal-engine)[

![自定义事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b3211ca-6779-4e1d-b4c7-c3559077d8da/customevents.png)

自定义事件

用户创建的自定义事件，可以在图表中进行触发。





](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint related topic](https://dev.epicgames.com/community/search?query=blueprint%20related%20topic)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [变量](/documentation/zh-cn/unreal-engine/basic-scripting-with-blueprints-in-unreal-engine#%E5%8F%98%E9%87%8F)
-   [执行流](/documentation/zh-cn/unreal-engine/basic-scripting-with-blueprints-in-unreal-engine#%E6%89%A7%E8%A1%8C%E6%B5%81)