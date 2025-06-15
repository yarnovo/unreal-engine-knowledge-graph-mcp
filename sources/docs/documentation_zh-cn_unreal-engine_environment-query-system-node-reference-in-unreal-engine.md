# 场景查询系统节点参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/environment-query-system-node-reference-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:44:21.713Z

---

目录

![场景查询系统节点参考](https://dev.epicgames.com/community/api/documentation/image/95c42810-49e1-4fe4-8a93-1712a35af2f5?resizing_type=fill&width=1920&height=335)

**场景查询** 实际上由许多不同的部分组成。您必须从 [行为树](/documentation/zh-cn/unreal-engine/behavior-trees-in-unreal-engine) 调用场景查询，然后实际的场景查询将使用它的 **生成器**，引用它的 **情境**，并使用它的 **测试**，为行为树提供权重最高的结果。

节点类型

描述

**生成器（Generator）**

生成位置或Actor，其被称为 **项目（Item）**、实际上将被测试和加权。

**情境（Contexts）**

为各种测试和生成器提供引用的框架。

**测试（Tests）**

确定环境查询如何决定来自生成器的哪个项目是最佳选择。

欲知各类节点的更多信息，请参阅以下链接。 

[](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine)

[![EQS节点参考：生成器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b6c9aec-2c21-4939-a180-ded34d95ebef/generator-topic.png)](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine)

[EQS节点参考：生成器](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine)

[讲述如何在EQS系统中使用生成器。](/documentation/zh-cn/unreal-engine/eqs-node-reference-generators-in-unreal-engine)

[

![EQS节点参考：情境](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0be82606-d421-4bcc-a1cb-72d1ae74bbd8/context-topic.png)

EQS节点参考：情境

讲述在EQS系统中情境如何用于测试和生成器。





](/documentation/zh-cn/unreal-engine/eqs-node-reference-contexts-in-unreal-engine)[

![EQS节点参考：测试](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d71d5eb-4235-4b4d-a1da-3313920fb273/tests-topic.png)

EQS节点参考：测试

描述如何在EQS中使用测试来生成





](/documentation/zh-cn/unreal-engine/eqs-node-reference-tests-in-unreal-engine)

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [eqs](https://dev.epicgames.com/community/search?query=eqs)
-   [environment query system](https://dev.epicgames.com/community/search?query=environment%20query%20system)
-   [eqs essentials](https://dev.epicgames.com/community/search?query=eqs%20essentials)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)