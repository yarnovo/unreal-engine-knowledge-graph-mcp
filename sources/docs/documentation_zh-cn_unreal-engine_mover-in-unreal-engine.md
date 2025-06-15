# 虚幻引擎中的Mover | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mover-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:58:34.477Z

---

目录

![Mover](https://dev.epicgames.com/community/api/documentation/image/54d809d9-5877-46f3-a869-48cc19c00eb3?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

**Mover** 是一款虚幻引擎插件。它支持使用 **Network Prediction插件** 或 **Chaos的联网物理** 系统实现具有回滚网络功能的模块化Actor动作。该插件可以帮助Gameplay开发者制作角色动作，而无需网络方面的专业知识。

除了本分段中的文档，你也可以观看[An Introduction to the Mover Plugin | Unreal Fest 2024](https://www.youtube.com/watch?v=P4IKS5k47Wg)教程，详细了解Mover插件。你也可以在虚幻引擎目录：`\Engine\Plugins\Experimental\Mover\` 下的 `README.md` 文件中找到更多详情。

我们希望Mover插件可以成为下一代制作角色动作的方法，并逐渐取代 **角色动作组件（CMC）（Character Movement Component (CMC)）** 系统。但是，Mover插件目前还在实验阶段，还有许多功能有待完善，其API、属性和数据格式还会变更。

即使Move进入生产就绪状态，我们在可以预见到的未来还是会继续支持CMC系统，并会提前就任何可能的停用计划发出充分通知。

## 主题

[

![Mover功能与概念](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a55b3eb5-02a7-4f0b-b297-8dc080860c42/placeholder_topic.png)

Mover功能与概念

了解MoverComponents、移动模式，等等。





](/documentation/zh-cn/unreal-engine/mover-features-and-concepts-in-unreal-engine)[

![对比Mover和角色移动组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28af75f2-a465-4383-9025-19ec524e2f64/placeholder_topic.png)

对比Mover和角色移动组件

了解这两种移动系统的差别。





](/documentation/zh-cn/unreal-engine/comparing-mover-and-character-movement-component-in-unreal-engine)[

![Mover示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/268f2d01-4756-4064-b906-7894e2c6190a/placeholder_topic.png)

Mover示例

\*Mover Examples插件中的示例内容指南。





](/documentation/zh-cn/unreal-engine/mover-examples-in-unreal-engine)[

![Mover调试参考](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21f30f78-6fdb-4f0f-843e-ed2f9d7df08e/placeholder_topic.png)

Mover调试参考

了解如何调试你的Mover项目。





](/documentation/zh-cn/unreal-engine/mover-debugging-reference-for-unreal-engine)

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [character](https://dev.epicgames.com/community/search?query=character)
-   [mover](https://dev.epicgames.com/community/search?query=mover)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [主题](/documentation/zh-cn/unreal-engine/mover-in-unreal-engine#%E4%B8%BB%E9%A2%98)