# 数据流图表 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dataflow-graph
> 
> 生成时间: 2025-06-14T19:52:01.705Z

---

目录

![数据流图表](https://dev.epicgames.com/community/api/documentation/image/9d3c1b34-411a-4698-9175-2a340ba1235f?resizing_type=fill&width=1920&height=335)

**数据流图表（Dataflow Graph）** 系统是虚幻引擎编辑器内的一套 **基于节点的程序化资产生成环境** 。

创建数据流是为了在引擎中创建某些资产类型时 **优化迭代时间** 而生的。同一数据流图表可 **被多个资产使用** ，而且图表本身可根据源资产提供的输入而产出不同的结果。

数据流是一套 **通用系统** ，可适配各种物理资产类型，如 **Chaos布料** 、 **Chaos血肉** 和 **几何集合破裂** 等。该系统 **被设计为可由C++开发者扩展** 。开发者可以根据具体需求进一步调整系统。

阅读如下文档即可详细了解数据流：

[

![数据流概览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03fbbb0b-acda-4bcc-ae06-11d8876e71c7/dataflow-topic.png)

数据流概览

虚幻引擎中数据流图表系统的概览。





](/documentation/zh-cn/unreal-engine/dataflow-overview)[

![破坏系统数据流快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89ead2cf-d813-439b-9801-8a83476ca5a7/dataflow-topic.png)

破坏系统数据流快速入门

了解如何配合Chaos破坏系统使用数据流图表。





](/documentation/zh-cn/unreal-engine/dataflow-for-destruction-quickstart)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)