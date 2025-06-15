# 编辑虚幻引擎物理资产的物理对象 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/editing-the-physics-asset-of-a-physics-body-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:51:06.268Z

---

目录

![编辑物理资产的物理对象](https://dev.epicgames.com/community/api/documentation/image/84a03729-c130-476e-bbae-e9d56454d889?resizing_type=fill&width=1920&height=335)

下文介绍了有关在 **物理资产工具（Physics Asset Editor）** 中对 **物理对象（Physics Bodies）** 进行的编辑的几种常见方法。

如果你看不清你要编辑的物理对象，在 **视口（Viewport）** 中，选择 **角色（Character） > 网格体（Mesh） > 线框/无（Wireframe/None）**，调整 **骨架网格体（Skeletal Mesh）** 的可见程度。

![视口中的角色网格体选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c790d24f-5347-4f0e-afb2-2da9bbd9bdbc/mesh-none.png)

## 编辑物理对象

1.  双击 **物理资产（Physics Asset）**，打开物理资产编辑器。
2.  在 **视口（Viewport）** 或 **骨架树（Skeleton Tree）** 面板中选中一个物理对象。
3.  使用 **选择**、 **平移**、**旋转** 和 **缩放** 工具对物理对象进行 **平移、旋转和缩放**，使其与 **骨架网格体骨骼** 相匹配。
    
    ![Select, move, Rotate, and Scale tools](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6dc50b9c-e860-4b0d-b1cd-a085c07b1708/move-rotate-scale.png)
4.  在 **细节** 面板中编辑物理对象的属性。
5.  使用工具栏中的 **启用碰撞（Enable Collision）** 和 **禁用碰撞（Disable Collision）** 工具，可以编辑当前物理对象和物理资产中其他物理对象之间的碰撞效果。所有可以与当前所选物理对象碰撞的对象都会以蓝色显示，否则以灰色显示。
    
    ![启用碰撞和禁用碰撞工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2563f400-58ac-4807-8419-01bc66f88f38/enable-disable-collision.png)
6.  假如多个物理对象需要以一个整体运作，例如组成手腕的所有扭转关节，请使用[焊接](/documentation/zh-cn/unreal-engine/welding-physics-bodies-in-unreal-engine-by-using-the-physics-asset-editor)工具，避免出现不理想的物理模拟效果。焊接后的物理对象会议黄色显示。
7.  记得经常保存。

可在[物理对象参考](/documentation/zh-cn/unreal-engine/physics-bodies-reference-for-unreal-engine)中查阅物理资产编辑器属性的更多内容。

## 复制物理对象

在任一模式中，一个物理对象的属性可被复制到另外的物理对象：

1.  选择需要复制数据的 **物理对象**。
2.  **按下 Ctrl + C**。
3.  选择需要应用数据的 **物理对象**。
4.  **按下 Ctrl + V**。

此操作不会覆盖物理对象的形状。

## 删除物理对象

1.  双击 **物理资产（Physics Asset）**，打开物理资产编辑器。
2.  在 **视口（Viewport）** 或 **骨架树（Skeleton Tree）** 面板中选中一个需要删除的 **物理对象**。
3.  按下 **Delete** 键。

## 物理材质

物理资产中的每个物理对象均可指定 **物理材质**。将物理材质应用到单个物理对象的步骤：

1.  双击 **物理资产（Physics Asset）**，打开物理资产编辑器。
2.  在 **视口（Viewport）** 或 **骨架树（Skeleton Tree）** 面板中选中一个 **物理对象**。
3.  在 **细节** 面板中找到 **简单碰撞物理材质（Simple Collision Physical Material）** 属性并指定一个 **物理材质（Physical Material）**。

![Apply a Physical Material to a single Physics Body](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbc75d6d-6812-4d50-8d0e-13fdce6f7f7a/physical-materials-physics-asset-04.png)

-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [编辑物理对象](/documentation/zh-cn/unreal-engine/editing-the-physics-asset-of-a-physics-body-in-unreal-engine#%E7%BC%96%E8%BE%91%E7%89%A9%E7%90%86%E5%AF%B9%E8%B1%A1)
-   [复制物理对象](/documentation/zh-cn/unreal-engine/editing-the-physics-asset-of-a-physics-body-in-unreal-engine#%E5%A4%8D%E5%88%B6%E7%89%A9%E7%90%86%E5%AF%B9%E8%B1%A1)
-   [删除物理对象](/documentation/zh-cn/unreal-engine/editing-the-physics-asset-of-a-physics-body-in-unreal-engine#%E5%88%A0%E9%99%A4%E7%89%A9%E7%90%86%E5%AF%B9%E8%B1%A1)
-   [物理材质](/documentation/zh-cn/unreal-engine/editing-the-physics-asset-of-a-physics-body-in-unreal-engine#%E7%89%A9%E7%90%86%E6%9D%90%E8%B4%A8)