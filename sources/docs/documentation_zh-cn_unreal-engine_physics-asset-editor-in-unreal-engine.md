# 虚幻引擎物理资产编辑器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:50:43.890Z

---

目录

![物理资产编辑器](https://dev.epicgames.com/community/api/documentation/image/5acf1e03-3ec4-4b5a-b5f0-889e71995744?resizing_type=fill&width=1920&height=335)

![为操作骨架网格体的物理资产而设计的物理资产编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d095ef03-4afa-4b57-8b37-ae9f881d355a/physics-asset-editor.png)

**物理资产编辑器** 是一个集成编辑器，它是虚幻引擎中[动画编辑器](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine)的一部分。它专门设计用于操纵 **骨架网格体** 的 **物理资产**。

![用于定义骨架网格体所使用的物理和碰撞的物理资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1b2e454-24df-4459-aeb6-37b90b81bca5/physics-asset-content-drawer.png)

**物理资产** 用于定义骨架网格体使用的物理和碰撞。它们包含一组刚体和约束，这些构成一个布偶，而布偶并不 局限于人形布偶。它们可以用于任何使用形体和约束的物理模拟。因为一个骨架网格体只允许一个物理资产， 所以可以为许多骨架网格体打开或关闭它们。

![人型角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6111e286-1e88-4bb5-b79a-c5c355bb30ff/humanoid-physics-asset.png)

![演示中的越野车](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3781d0dc-6dc7-4338-8ae4-437ea55a1aad/vehicle-physics-asset.png)

角色物理资产

载具物理资产

可以为任何骨架网格体设置物理资产进行模拟。上面是使用它们的两个示例；一个是人形角色，另一个是Epic的演示版载具游戏的车辆。

## 创建物理资产

为骨架网格体创建物理资产的方法有两种：

-   在导入时启用 **创建物理资产（Create Physics Asset）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cf9fcc2-8073-454a-b745-f47375ef9524/import.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cf9fcc2-8073-454a-b745-f47375ef9524/import.png)
    
    点击查看大图
    
-   使用 **内容侧滑菜单** 创建物理资产并选择要使用的骨架网格体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/091aa9d2-0484-47d3-b2c6-8fbfaf5f6641/create-physics-asset-content-drawer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/091aa9d2-0484-47d3-b2c6-8fbfaf5f6641/create-physics-asset-content-drawer.png)
    
    点击查看大图
    
    第一次选择物理资产时，将打开一个窗口来设置应该如何生成形体和约束：
    
    ![用于设置如何生成形体和约束的窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44068044-28f9-40ef-a025-9edae1935c51/physics-asset-generation-properties.png)

## 打开物理资产编辑器

可以使用几种不同的方式打开 **物理资产编辑器**：

-   双击 **内容侧滑菜单** 中的 **物理资产**。
    
    ![双击内容侧滑菜单中的物理资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43989e18-d648-462e-a076-db2d0819b3ac/open-from-content-drawer.png)
-   使用右键快捷菜单并选择 **编辑...（Edit...）**。
    
    ![使用右键快捷菜单并选择编辑](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20fbd778-62b3-46d7-a866-9d4b48296c68/right-click-open.png)
-   或者，在[动画编辑器](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine)选择选项卡中选中 **物理（Physics）** 选项卡。
    
    ![在动画编辑器选项卡中选择物理选项卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/163d6129-a077-4c26-bcfb-2b809ff44889/physics-asset-editor-tab.png)
    
    可以使用 **物理（Physics）** 选项卡旁边的下拉菜单，从 **内容侧滑菜单** 中选择正在使用当前已打开骨架网格体的物理资产。
    
    ![下拉菜单可用于选择任何物理资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee334e12-8090-4164-8eb5-0330b64cdc2b/physics-asset-selection-drop-down.png)

## 基础

[](/documentation/zh-cn/unreal-engine/physics-bodies-in-unreal-engine)

[![物理对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c83e8a3-8b2a-44ed-9c19-c752db82a6a7/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/physics-bodies-in-unreal-engine)

[物理对象](/documentation/zh-cn/unreal-engine/physics-bodies-in-unreal-engine)

[介绍如何使用物理对象(Body Instance)进行物理模拟。](/documentation/zh-cn/unreal-engine/physics-bodies-in-unreal-engine)

[

![物理约束](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa231ef2-56be-45c9-845f-859ef696038d/physics-topic-image.png)

物理约束

在物理对象相互之间和世界场景之间设置约束





](/documentation/zh-cn/unreal-engine/physics-constraints-in-unreal-engine)

## 教程

[](/documentation/zh-cn/unreal-engine/physics-asset-editor-tutorial-directory-for-unreal-engine)

[![物理资产编辑器教程](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48626705-efaf-4dee-bf84-6e33c8f010b4/physics-topic-image.png)](/documentation/zh-cn/unreal-engine/physics-asset-editor-tutorial-directory-for-unreal-engine)

[物理资产编辑器教程](/documentation/zh-cn/unreal-engine/physics-asset-editor-tutorial-directory-for-unreal-engine)

[物理资产工具操作指南汇总页面。](/documentation/zh-cn/unreal-engine/physics-asset-editor-tutorial-directory-for-unreal-engine)

-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建物理资产](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%89%A9%E7%90%86%E8%B5%84%E4%BA%A7)
-   [打开物理资产编辑器](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine#%E6%89%93%E5%BC%80%E7%89%A9%E7%90%86%E8%B5%84%E4%BA%A7%E7%BC%96%E8%BE%91%E5%99%A8)
-   [基础](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine#%E5%9F%BA%E7%A1%80)
-   [教程](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine#%E6%95%99%E7%A8%8B)