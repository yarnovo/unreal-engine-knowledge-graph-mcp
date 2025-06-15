# 在虚幻引擎中的过场动画摄像机Actor中使用镜头失真 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-lens-distortion-in-a-cine-camera-actor-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:41.275Z

---

目录

![在过场动画摄像机Actor中使用镜头失真](https://dev.epicgames.com/community/api/documentation/image/616a3dca-7709-41b4-97ac-6f13cfc284ee?resizing_type=fill&width=1920&height=335)

1.  在 **大纲视图（Outliner）** 中选择 **过场动画摄像机Actor（CineCamera Actor）** ，并转至 **细节（Details）** 面板。
    
    ![选择过场动画摄像机Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b43312fe-8867-4bf9-a55d-1ae8d41bb8d1/ue5_01-cine-camera-actor.png "Select the CineCamera Actor")
2.  选择 **LiveLink组件控制器组件（LiveLink Component Controller component）** 并向下滚动到 **摄像机角色（Camera Role）** 类别。验证是否已将正确的 **镜头文件（Lens File）** 分配给 **镜头文件（Lens File）** 插槽。在此示例中，使用了[快速入门指南](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine)中的 **LumixLens** 文件。
    
    ![选择Live Link组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63be4bf0-a5a1-46c7-807d-0b5722bb66fa/ue5_02-live-link-controller.png "Select the Live Link Component")
3.  点击 **添加组件（Add Component）** 按钮，然后搜索并选择 **镜头失真（Lens Distortion）** 以添加组件。
    
    ![添加镜头失真组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40a8bde4-532a-4dfa-b2e7-91f45ce85f4e/ue5_04-lens-distortion.png "Add the Lens Distortion component")
4.  向下滚动到 **默认（Default）** 分段并点击 **失真源（Distortion Source）** 旁边的下拉菜单。选择 **LumixLens** 文件并 **启用** **应用失真（Apply Distortion）** 复选框。
    
    ![添加镜头失真源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f283f6cb-7134-4248-8ad3-879e6d7e5a90/ue5_05-distortion-source.png "Add the Lens Distortion Source")
5.  现在你应该会在视口中看到应用于过场动画摄像机Actor的镜头失真。
    

## 阶段成果

在本指南中，你学习了如何从摄像机校准插件将镜头失真效果应用于过场动画摄像机Actor。

-   [camera](https://dev.epicgames.com/community/search?query=camera)
-   [camera lens calibration](https://dev.epicgames.com/community/search?query=camera%20lens%20calibration)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [阶段成果](/documentation/zh-cn/unreal-engine/using-lens-distortion-in-a-cine-camera-actor-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)