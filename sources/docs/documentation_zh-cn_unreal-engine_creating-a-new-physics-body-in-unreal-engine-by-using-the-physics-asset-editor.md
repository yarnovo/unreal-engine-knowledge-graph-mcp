# 使用物理资产编辑器在虚幻引擎中创建新的物理形体 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-a-new-physics-body-in-unreal-engine-by-using-the-physics-asset-editor
> 
> 生成时间: 2025-06-14T19:51:08.596Z

---

目录

![在物理资产编辑器中创建新的物理形体](https://dev.epicgames.com/community/api/documentation/image/c0b1d45e-a4e6-47b3-9db4-da431f3d47c4?resizing_type=fill&width=1920&height=335)

物理资产工具用于添加或替换物理资产中的 **物理形体（Physics Bodies）** 以及它们连接的骨骼上相关联的 **形状（Shapes）** (**盒体（Boxes）**、**球体（Spheres）**、**胶囊体（Capsules）**、**锥形胶囊体（Tapered Capsules）**等等)。

默认情况下，**物理编辑器骨骼树（Physics Editor Skeleton Tree）** 只显示物理形体。使用骨骼树的 **选项（Options）** 下拉菜单来显示 **骨骼（Bones）** 和 **图元（Primitives）**，这样会让添加和替换物理形体更加容易。

## 将物理形体添加至骨骼

![骨骼的右键菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08caf7f6-b45c-467c-a9e0-eb31487bf745/add_body.png)

1.  在 **骨骼树（Skeleton Tree）** 面板中右键点击一块 **骨骼（Bone）**，然后点击 **右键菜单（Context Menu）** 中的 **添加/替换形体（Add/Replace Body）**。
    
    -   你也可以右键点击 **视口（Viewport）** 中的 **骨骼（Bone）** 来打开这个菜单。
2.  一个新的物理形体会被添加到骨骼上，默认带有胶囊体形状。
    
    -   如果骨骼上已经有了一个物理形体，新的物理形体和胶囊体形状会将其替换。
3.  除此以外，当骨骼上没有物理形体时，可直接选择 **右键菜单（Context Menu）** 中 **添加形状（Add Shape）** 选项下的一个形状。这样会直接用选择的形状为骨骼添加物理形体。
    
4.  右键点击 **物理形体（Physics Body）** 然后选择 **重新生成形体（Regenerate Bodies）**，会创建一个新的默认胶囊体形状的物理形体并且替换每个选中的物理形体。
    

## 将形状添加至物理形体

![物理形体的右键菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cde9649a-4757-4db6-bf5a-51fcf4728464/add_shape.png)

要将形状添加至已有的物理形体，右键点击该形体，在 **右键菜单（Context Menu）** 的 **添加形状（Add Shape）** 下，选中要添加的形状。

-   一个物理形体可以带有多个形状，如果你不想要默认的胶囊体形状，可以将其删除。

## 最终结果

现在应该可以看到对应的形体和形状已经添加到选中的骨骼并且成为其子对象。

-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [将物理形体添加至骨骼](/documentation/zh-cn/unreal-engine/creating-a-new-physics-body-in-unreal-engine-by-using-the-physics-asset-editor#%E5%B0%86%E7%89%A9%E7%90%86%E5%BD%A2%E4%BD%93%E6%B7%BB%E5%8A%A0%E8%87%B3%E9%AA%A8%E9%AA%BC)
-   [将形状添加至物理形体](/documentation/zh-cn/unreal-engine/creating-a-new-physics-body-in-unreal-engine-by-using-the-physics-asset-editor#%E5%B0%86%E5%BD%A2%E7%8A%B6%E6%B7%BB%E5%8A%A0%E8%87%B3%E7%89%A9%E7%90%86%E5%BD%A2%E4%BD%93)
-   [最终结果](/documentation/zh-cn/unreal-engine/creating-a-new-physics-body-in-unreal-engine-by-using-the-physics-asset-editor#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)