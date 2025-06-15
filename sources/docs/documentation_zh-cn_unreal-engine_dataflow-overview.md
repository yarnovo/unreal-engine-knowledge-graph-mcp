# 数据流概览 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dataflow-overview
> 
> 生成时间: 2025-06-14T19:52:07.981Z

---

目录

![数据流概览](https://dev.epicgames.com/community/api/documentation/image/1f41ca08-fc7f-47cc-9435-83faf770fd91?resizing_type=fill&width=1920&height=335)

## 介绍

![数据流图表系统](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f4362c7-fbae-4c60-847d-e21f6e6647a7/dataflow-system-benefits.png)

**数据流图表（Dataflow Graph）** 系统是虚幻引擎编辑器内的一套 **基于节点的程序化资产生成环境** 。

数据流作为资产被存放在 **内容浏览器** 中，包含一个节点图表，该节点图表被求值后会生成特定的资产。

数据流以 **基于依赖性的节点图表** 的形式实现，更改节点会触发其下游从属项的重新求值。图表中的节点都能够接收一个或多个输入、处理数据并产出一个或多个输出，然后将其传递给下一个从属节点。

## 系统优势

![Roux船长](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40504372-240d-4304-bba9-5e329f57de97/roux-talisman-bridge.jpg)

创建数据流是为了在引擎中创建某些资产类型时 **优化迭代时间** 而生的。同一数据流图表可 **被多个资产使用** ，而且图表本身可根据源资产提供的输入而产出不同的结果。

数据流是一套 **通用系统** ，可适配各种物理资产类型，如 **Chaos布料** 、 **Chaos血肉** 和 **几何集合破裂** 等。

数据流也 **被设计为可由C++开发者扩展** 。开发者可以根据具体需求进一步调整系统。

## 虚幻引擎中数据流和传统工作流程

![数据流的不同之处](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1628ab3d-94fa-4e8c-b2cf-829e48835e0b/dataflow-workflow.png)

数据流图表系统与传统工作流程的差异如下：

**传统工作流程** ：

-   **通常为破坏性的工作流程** ：在创建资产时，一旦更改便永久生效，无法轻易撤消。这会增加迭代时间并限制可探索性。
-   **手动的工作流程** ：开发者必须手动进行同样的流程来生产同一类型的不同资产。

**数据流工作流程** ：

-   **程序化、非破坏性的工作流程** ：数据流节点可以在图表内进行修改，并立即反映结果。如果需要，你可以撤回或跳过图表中的所有步骤。
-   **自动化的工作流程** ：开发者可以自动化工作流程来自动处理数以千计的资产。
-   **模块化的工作流程** ：可将相同的数据流图表用于多个资产，各资产提供不同的输入并生成不同的结果。
-   **灵活的工作流程** ：开发者可以轻松连接和断开不同的节点以应用不同的效果，并立即看到结果。

## 可扩展且经过实战检验

![乐高堡垒之夜](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2b52492-aa75-49f8-bfcb-639fe757835c/lego-fortnite.png)

数据流图表系统在设计之初就 **考虑了可扩展性** 。开发者可以 **使用C++创建自定义数据流节点** 来扩展系统。数据流还可完全自动化创建特定类型的资产，例如布料模拟和几何体集合破裂。

数据流为《Lego Fortnite》而设计，并在其中接受了考验。系统已在生产环境中进行了测试，并将在虚幻引擎的未来版本中继续得到优化。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [介绍](/documentation/zh-cn/unreal-engine/dataflow-overview#%E4%BB%8B%E7%BB%8D)
-   [系统优势](/documentation/zh-cn/unreal-engine/dataflow-overview#%E7%B3%BB%E7%BB%9F%E4%BC%98%E5%8A%BF)
-   [虚幻引擎中数据流和传统工作流程](/documentation/zh-cn/unreal-engine/dataflow-overview#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E6%95%B0%E6%8D%AE%E6%B5%81%E5%92%8C%E4%BC%A0%E7%BB%9F%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B)
-   [可扩展且经过实战检验](/documentation/zh-cn/unreal-engine/dataflow-overview#%E5%8F%AF%E6%89%A9%E5%B1%95%E4%B8%94%E7%BB%8F%E8%BF%87%E5%AE%9E%E6%88%98%E6%A3%80%E9%AA%8C)