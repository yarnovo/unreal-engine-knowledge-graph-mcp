# 制片注意事项 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/production-considerations
> 
> 生成时间: 2025-06-14T19:31:42.790Z

---

目录

![制片注意事项](https://dev.epicgames.com/community/api/documentation/image/b2e3a38f-25cd-4a93-837e-035c42fa0e60?resizing_type=fill&width=1920&height=335)

## 制片注意事项

大部分情况下你都不会孤立地开展工作。其他美术师需要签出你正在使用的文件。这可能会导致工作中断，因为你需要等待所需的文件释放给你。

你可以采取几种方法来让团队同时开展工作：

-   为每个镜头添加基于各分项的关卡序列。
-   为每个基于持久/序列的关卡添加基于各分项的子关卡。

根据你的团队规模，你可能想要进一步细分，即按美术师和/或镜头添加关卡序列和子关卡。

![单独的序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9a7b123-972d-4d0d-80b3-34e7d3cada70/shotsetup1.png)

你还可以采用另一种方法，即使用 **可生成** Actor，而不是 **可持有** Actor。

可生成Actor由Sequencer创建。它并不存在于关卡中，直到你打开生成它的关卡序列。因而，你无需访问持久关卡来添加或修改Actor。

你可通过以下任意一种方式创建可生成Actor：

-   将可持有Actor转换为可生成Actor。
-   将内容浏览器中的资产直接拖至Sequencer中。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [制片注意事项](/documentation/zh-cn/unreal-engine/production-considerations#%E5%88%B6%E7%89%87%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9)