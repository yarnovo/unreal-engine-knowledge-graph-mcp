# 为静态网格体添加一个 K-DOP 碰撞凸包 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/add-a-k-dop-collision-hull-to-a-static-mesh-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:49:22.573Z

---

目录

![为静态网格体添加一个 K-DOP 碰撞凸包](https://dev.epicgames.com/community/api/documentation/image/7c64e961-d12b-4c59-beca-47f909c1e46b?resizing_type=fill&width=1920&height=335)

### 步骤

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f39c309-7080-4450-8317-dbd849921e48/colref_collisionmenu_kdop.png)

**Static Mesh Editor** 的 **Collision** 菜单下有一系列选项，名为 *##DOP*，它们是 **K-DOP** 简单碰撞生成器。**K-DOP** 是包围体的一种，是 *K 离散导向多面体（K discrete oriented polytope）* 的缩写（K 是轴对齐平面的数字）。它抓取轴对齐的平面，将其尽力推向离网格体最近的位置。结果形态用作碰撞凸包。在 **Static Mesh Editor** 中，K 可为：

-   **10** - 方块有 4 条边形成斜角 - 可选择 X、Y 或 Z 轴对齐的边。
-   **18** -方块中所有边均形成斜角。
-   **26** - 方块中所有边和角均形成斜角。

请参考下图实例。此工具操作装满管状物、圆柱体和栏杆的包裹时十分实用。

![kdop_sizes.jpg](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0065c78-2480-4789-ad9e-6433cf696cb1/kdop_sizes.jpg)

-   [collision](https://dev.epicgames.com/community/search?query=collision)
-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/add-a-k-dop-collision-hull-to-a-static-mesh-in-unreal-engine#%E6%AD%A5%E9%AA%A4)