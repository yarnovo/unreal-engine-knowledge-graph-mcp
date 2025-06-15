# 虚幻引擎蓝图可视化脚本技术指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/technical-guide-for-blueprints-visual-scripting-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:09.684Z

---

目录

![蓝图技术指南](https://dev.epicgames.com/community/api/documentation/image/ce33a4e9-cc50-4201-b83f-96c37eaccd39?resizing_type=fill&width=1920&height=335)

**蓝图** 是虚幻引擎4中引入的一个强大的新功能。蓝图是创建新的[UClasses](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/UClass)的一种方法，通过这种方法，您不需要书写或编译任何代码。 当您创建一个蓝图时，您可以选择扩展C++类或者另一个蓝图类。 然后，您可以添加、排列及自定义[组件](/documentation/zh-cn/unreal-engine/components-in-unreal-engine)，使用可视化的脚本语言实现自定义的逻辑，对[事件](/documentation/zh-cn/unreal-engine/events-in-unreal-engine)及交互做出反应，定义自定义[变量](/documentation/zh-cn/unreal-engine/blueprint-variables-in-unreal-engine)，处理[输入](/documentation/zh-cn/unreal-engine/input-in-unreal-engine)，及创建一种完全自定义的对象类型。

每个蓝图都具有一个[构建脚本](/documentation/zh-cn/unreal-engine/construction-script-in-unreal-engine)，和C++中的构造函数类似，当创建对象时会运行它。 该脚本可以动态地基于多个因素构建Actor实例，比如，一个可以自动调整大小来填充建筑物间空隙的篱笆。从这个角度来说，蓝图也可以看成是一个非常强大的预制系统。

[

![蓝图函数库](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/511968b7-2095-4d4d-a159-79d14bb1f8ad/placeholder_topic.png)

蓝图函数库

关于虚幻引擎中C++的蓝图函数库的信息。





](/documentation/zh-cn/unreal-engine/blueprint-function-libraries-in-unreal-engine)[

![蓝图编译器概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d18a13e9-29b7-494e-8b6a-37aa536a1bf5/placeholder_topic.png)

蓝图编译器概述

蓝图编译过程的步骤





](/documentation/zh-cn/unreal-engine/compiler-overview-for-blueprints-visual-scripting-in-unreal-engine)[

![向蓝图公开游戏逻辑内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd65f703-1546-4563-9c61-d527aaf48f35/placeholder_topic.png)

向蓝图公开游戏逻辑内容

关于游戏逻辑程序员如何在蓝图中公布游戏逻辑内容的技术指南。





](/documentation/zh-cn/unreal-engine/exposing-gameplay-elements-to-blueprints-visual-scripting-in-unreal-engine)[

![将C++暴露给蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df4c76ea-6ee6-4a38-a13b-3cda4e23ccbd/placeholder_topic.png)

将C++暴露给蓝图

如何在虚幻引擎中将C++暴露给蓝图





](/documentation/zh-cn/unreal-engine/exposing-cplusplus-to-blueprints-visual-scripting-in-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)