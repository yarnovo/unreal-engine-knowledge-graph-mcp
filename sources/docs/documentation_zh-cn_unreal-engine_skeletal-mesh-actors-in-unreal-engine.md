# 虚幻引擎中的骨骼网格体Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:58:45.105Z

---

目录

![骨骼网格体Actor](https://dev.epicgames.com/community/api/documentation/image/4f5c5903-aea5-4620-8cc8-ccf68fae92fb?resizing_type=fill&width=1920&height=335)

**骨骼网格体Actor（Skeletal Mesh Actor）** 显示动画网格体，其几何体可以变形，通常是通过使用动画序列期间的控制点来变形。这些Actor可以从外部3D动画应用程序创建和导出，也可以直接在虚幻引擎中编程来实现。

要详细了解如何将内容导入到虚幻引擎中，请参阅[直接导入资产](/documentation/zh-cn/unreal-engine/importing-assets-directly-into-unreal-engine)页面。

顾名思义，骨骼网格体包含由多个 **骨骼** 组成的 **骨架** 。这些用于动画过程。

骨骼网格体Actor常用于表示玩家角色、NPC、其他动画生物和复杂的机制。[第三人称模板](/documentation/zh-cn/unreal-engine/third-person-template-in-unreal-engine)中显示的虚幻引擎人体模型是骨骼网格体Actor的示例。

## 放置骨骼网格体Actor

要放置骨骼网格体Actor，最快的方式是从[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)将其拖入关卡视口中。接着，你可以使用其变换属性将其放在需要的地方。

![从内容浏览器放置骨骼网格体Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38e3d37f-8609-4cf8-9e2f-22a3af106e57/placing-skeletal-mesh.gif)

要了解放置Actor的其他方法，请参阅[放置Actor](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)页面。

## 制作骨骼网格体Actor的动画

要在虚幻引擎中制作骨骼网格体Actor的动画，有两种基本方法可用：

-   使用[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)播放和混合多个动画。
    
-   使用动画资产一次性或循环播放单个[动画序列](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine)。
    

要详细了解如何制作骨骼网格体的动画，请参阅[骨骼网格体动画系统](/documentation/zh-cn/unreal-engine/skeletal-mesh-animation-system-in-unreal-engine)页面。

## 更改骨骼网格体Actor的材质

你可以单独覆盖骨骼网格体Actor的材质以更改其外观。如果你想在关卡中多次使用同一个静态网格体，但想在它们之间有一些变化，这会很有用。

下面的示例显示了使用虚幻人体模型骨骼网格体的三个骨骼网格体Actor。每个Actor使用不同的材质。

![使用不同材质的虚幻人体模型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d8bf7ad-be10-4655-80c5-f64b12c498ce/mannequins-different-materials.png)

要替换分配给骨骼网格体的材质，请在内容浏览器中找到材质，然后将其拖到关卡视口中的骨骼网格体Actor上，如以下示例所示。

![更改骨骼网格体Actor的材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2017c784-be1b-422c-a46b-50b284d61c0c/changing-skeletal-mesh-material.gif)

要将材质用于骨骼网格体Actor，你需要启用 **用于骨骼网格体（Used with Skeletal Mesh）** 选项。为此，请执行以下操作：

1.  在 **内容浏览器（Content Browser）** 中，双击 **材质（Material）** 在 **材质编辑器（Material Editor）** 中打开。
    
2.  在 **细节（Details）** 面板中，启用 **用于骨骼网格体（Used with Skeletal Mesh）** 选项。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/267f6d79-11f4-4b8e-ba0a-850ffa93b665/material-used-with-skeletal-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/267f6d79-11f4-4b8e-ba0a-850ffa93b665/material-used-with-skeletal-mesh.png)

材质编辑器中的 用于骨骼网格体（Used with Skeletal Mesh） 选项。点击查看大图。

## 骨骼网格体Actor碰撞

法线碰撞创建和检测不适用于骨骼网格体Actor。要让你的骨骼网格体与关卡中的对象碰撞，你的骨骼网格体Actor需要有专门为其创建的 **物理资产（Physics Asset）** 。

要详细了解物理资产及其用法，请参阅[物理资产编辑器](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine)文档。

要创建物理资产并将其分配给骨骼网格体Actor，请执行以下步骤：

1.  在 **内容浏览器（Content Browser）** 中找到 **骨骼网格体（Skeletal Mesh）** 并右键点击它。
    
2.  在 **上下文菜单** 中，选择 **创建（Create）> 物理资产（Physics Asset）> 创建并分配（Create and Assign）** 。
    

![创建物理资产并将其分配给骨骼网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33e659b0-ccdb-473b-9baa-fded4c25620c/creating-physics-asset.png)

创建物理资产并将其分配给骨骼网格体

-   [actors](https://dev.epicgames.com/community/search?query=actors)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [放置骨骼网格体Actor](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine#%E6%94%BE%E7%BD%AE%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93actor)
-   [制作骨骼网格体Actor的动画](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine#%E5%88%B6%E4%BD%9C%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93actor%E7%9A%84%E5%8A%A8%E7%94%BB)
-   [更改骨骼网格体Actor的材质](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine#%E6%9B%B4%E6%94%B9%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93actor%E7%9A%84%E6%9D%90%E8%B4%A8)
-   [骨骼网格体Actor碰撞](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine#%E9%AA%A8%E9%AA%BC%E7%BD%91%E6%A0%BC%E4%BD%93actor%E7%A2%B0%E6%92%9E)

相关文档

[

Actor和几何体

![Actor和几何体](https://dev.epicgames.com/community/api/documentation/image/0edf0358-c25c-4cad-88cf-3019f55118d8?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/actors-and-geometry-in-unreal-engine)