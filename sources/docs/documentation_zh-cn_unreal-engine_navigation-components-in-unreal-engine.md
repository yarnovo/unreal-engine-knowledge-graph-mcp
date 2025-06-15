# 虚幻引擎中的寻路组件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/navigation-components-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:43:26.522Z

---

目录

![寻路组件](https://dev.epicgames.com/community/api/documentation/image/d4f1a0b3-d2a8-4ab3-891b-b537de8cbb72?resizing_type=fill&width=1920&height=335)

寻路组件是一种可以在虚幻引擎中修改或扩展 **NavMesh** 寻路系统的组件。

## 寻路修改器组件

**寻路修改器组件（Nav Modifier Component）** 本身没有任何功能。不过，假如你有一个Actor，并且用一个基本形状作为它的根节点，根组件的体积会根据寻路修改器组件的 **Area Class** 属性来修改 NavMesh 的生成效果。每个 Actor 只能带有一个寻路修改器组件，因为多个修改器组件是无效的。此外，这些（多余的）组件将出现在"组件"选项卡的层级结构之外，不能作为其他组件的父组件，也不能包含任何子组件。

这些区域类（Area Class）可定义一些基本设置，例如进入某个区域的 **成本（Cost）**，或者一些高级设置，例如蹲伏角色可移动的区域。

成本是 NavMesh 系统中的一个重要概念。简单来说，在 NavMesh 中，从一个点移到另一个点的总成本等于路径经过的所有的区域成本总和（单个区域的大小在项目的偏好设置中定义）。解算器会始终寻找成本最低的路径，因此，你可通过增加通过该区域的成本来让它避免某些区域（比如湿滑或崎岖不平的区域）。不过要注意，假如某个区域成本很高，但只要属于成本最低的路径，解算器仍然会通过它。

例如，通过红色区域的成本非常高，但是 Pawn 没有其他选择，只能从中通过：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26d8e480-1813-418a-a19b-1433276bdd69/aroundthered.jpg)

但是，如果你移除了墙壁：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81b70a47-6295-4eb3-9c7e-34f7f4a5530b/throughthered.jpg)

Pawn 将避免经过红色区域，即使它要绕更长的路线。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [寻路修改器组件](/documentation/zh-cn/unreal-engine/navigation-components-in-unreal-engine#%E5%AF%BB%E8%B7%AF%E4%BF%AE%E6%94%B9%E5%99%A8%E7%BB%84%E4%BB%B6)

相关文档

[

内容示例

![内容示例](https://dev.epicgames.com/community/api/documentation/image/87759153-fcb5-4532-8861-ff747c395c30?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine)

[

人工智能

![人工智能](https://dev.epicgames.com/community/api/documentation/image/1a4dc47b-52b9-4e06-b61d-512591255b60?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/artificial-intelligence-in-unreal-engine)