# 在虚幻引擎中测试物理资产 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/testing-physics-assets-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:15.263Z

---

目录

![测试物理资产](https://dev.epicgames.com/community/api/documentation/image/0259c91b-e380-4e41-b971-7d5266973476?resizing_type=fill&width=1920&height=335)

本页面将介绍在 **物理资产工具** 中对 **物理资产** 进行测试的基础知识。

## 测试

![Testing](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/828594e5-ec37-462d-8ae7-2ae117152b35/simulate-options.png)

从工具栏 **箭头图标** 下方的下拉菜单中选择 **模拟（Simulation）** 即可测试物理资产。

![Selecting Simulation from the dropdown menu under the toolbar arrow icon will allow you to test your Physics Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d564529a-28ba-4695-b1de-2163c337461d/simulation-physics-asset.png)

-   启用 **无重力（No Gravity）** 选项后，整个物理资产均进入模拟状态，但未打开重力，所以你可以在零重力环境中采用ctrl+点击的方法轻戳 **物理形体**。这对于发现相互穿透的物理形体或已经超出其限制的 **有限的物理约束** 非常有用。
    
-   切换 **选定的模拟（Selected Simulation）** 可模拟关节链。此选项仅会模拟你选定的物理形体（可以选择多个）和那些来自选定物理形体层级的物理形体。例如，如果你选择肩膀，整个手臂都会被模拟。
    

-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [测试](/documentation/zh-cn/unreal-engine/testing-physics-assets-in-unreal-engine#%E6%B5%8B%E8%AF%95)