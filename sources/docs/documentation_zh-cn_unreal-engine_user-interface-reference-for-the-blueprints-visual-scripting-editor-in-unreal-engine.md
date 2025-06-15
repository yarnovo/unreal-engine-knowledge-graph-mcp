# 虚幻引擎蓝图可视化脚本编辑器的用户界面参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/user-interface-reference-for-the-blueprints-visual-scripting-editor-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:37:22.101Z

---

目录

![蓝图编辑器参考](https://dev.epicgames.com/community/api/documentation/image/f0c7691a-52ee-46c4-9a7f-f56d76017a87?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb1d224b-0056-4cf2-a6e4-4cd9225d2dd4/blueprint_editor_example.png)

蓝图可视化脚本是虚幻引擎中一个用途广泛的系统。蓝图可以控制关卡中的事件，为游戏 Actor 添加基于脚本的行为，并在高度真实的游戏角色系统中控制复杂动画。在处理不同类型的需求时，蓝图脚本的出现位置和提供的工具会有所不同。这意味着在虚幻引擎中，蓝图编辑器可能会在不同场合和不同时机出现。不过，无论在何种情况下使用，蓝图编辑器都是一种能帮助你创建、编辑强大可视化脚本并控制游戏各种元素的工具。

蓝图编辑器是一种基于节点的图表编辑器。它是创建和编辑可视化脚本节点网络的主要工具，通常简称为蓝图。蓝图编辑器的设计对上下文（context）十分敏感，可在需要时单独访问对象的功能，在需要执行非常规操作时进行灵活处理。

关于蓝图编辑器有以下几个关键点：

-   它包含数个工具和面板工具，用于创建变量、函数、数组等。
    
-   它内置多种调试和分析工具，用于在网络中迅速除错并改进数据流。
    
-   在虚幻引擎中，取决于正在编辑的蓝图网络类型，蓝图编辑器将出现多种不同的独特形态。
    

在深入了解蓝图编辑器之前，应先对蓝图本身有良好理解。如需了解详细内容，请查阅 [蓝图入门](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine) 和 [蓝图总览](/documentation/zh-cn/unreal-engine/overview-of-blueprints-visual-scripting-in-unreal-engine).

## 界面详解

蓝图编辑器的位置和可用工具将随当前编辑的蓝图类型出现细微变化。该文档将助你确定是否需要查看蓝图编辑器特殊形态的 UI 详解，或只需要看到可用功能的顺序列表。

如你未接触过蓝图编辑，或不确定正在使用的是何种蓝图，建议查阅 [蓝图类型](/documentation/zh-cn/unreal-engine/types-of-blueprints-in-unreal-engine)进行了解。

[](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-level-blueprints-in-unreal-engine)

[![蓝图编辑器中的关卡蓝图UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea172faa-1e58-41ae-982f-25721bc92941/level_blueprint_test_image.png)](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-level-blueprints-in-unreal-engine)

[蓝图编辑器中的关卡蓝图UI](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-level-blueprints-in-unreal-engine)

[在使用关卡蓝图时蓝图编辑器上的UI元素详解。](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-level-blueprints-in-unreal-engine)

[

![蓝图编辑器中的蓝图类UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a51dd41-47c3-4f2d-9e69-cdef81e7420b/class_blueprint_test_image.png)

蓝图编辑器中的蓝图类UI

当蓝图编辑器处理类蓝图时所包含的UI元素的详细介绍。





](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-user-interface-for-blueprint-classes-in-unreal-engine)[

![蓝图编辑器蓝图接口UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a55a914d-b362-482a-983b-6a5542cbfd7d/blueprint_interface.png)

蓝图编辑器蓝图接口UI

对使用蓝图接口时看到的蓝图编辑器UI元素的分解介绍。





](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-blueprint-interfaces-in-unreal-engine)[

![蓝图编辑器宏库UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d07d116-94f1-4396-8afe-794d676858c2/macro_blueprint.png)

蓝图编辑器宏库UI

使用蓝图宏库时蓝图编辑器的UI元素解析。





](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-editor-user-interface-for-macro-libraries-in-unreal-engine)[

![动画蓝图编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/564c0cb8-854c-4057-993f-c038ef5fa644/topicimage.png)

动画蓝图编辑器

动画蓝图编辑器及其界面概览





](/documentation/zh-cn/unreal-engine/animation-blueprint-editor-in-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [界面详解](/documentation/zh-cn/unreal-engine/user-interface-reference-for-the-blueprints-visual-scripting-editor-in-unreal-engine#%E7%95%8C%E9%9D%A2%E8%AF%A6%E8%A7%A3)