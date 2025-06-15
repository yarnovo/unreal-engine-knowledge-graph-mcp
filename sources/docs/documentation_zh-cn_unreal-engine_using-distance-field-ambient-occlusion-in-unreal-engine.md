# 在虚幻引擎中使用距离场环境光遮蔽 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-distance-field-ambient-occlusion-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:16:24.173Z

---

目录

![使用距离场环境光遮蔽](https://dev.epicgames.com/community/api/documentation/image/dc5d382c-44ce-4667-9144-35e71aa2fbde?resizing_type=fill&width=1920&height=335)

开发游戏时，你可能主要依赖屏幕空间方法来提供动态环境光遮蔽（AO）乃至预计算照明，以使世界场景中的对象看起来更加真实。这些方法虽然有用但却存在局限性。[屏幕空间环境光遮蔽（Screen Space Ambient Occlusion）](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)(SSAO)仅限于使用场景深度的情况而且仅在可见屏幕空间中有效。预计算方法仅对世界场景中的静态对象有效，这意味着它们无法实时更新。[距离场环境光遮蔽（Distance Field Ambient Occlusion）](/documentation/zh-cn/unreal-engine/distance-field-ambient-occlusion-in-unreal-engine)(DFAO)是一种全动态AO方法，它将[网格体距离场（Mesh Distance Field）](/documentation/zh-cn/unreal-engine/mesh-distance-fields-in-unreal-engine)用于可移动静态网格体。它不仅可在动态照明的世界场景中使用，也可用于预计算照明。

在本指南中，你将学习如何为使用天空光照（Sky Light）的场景启用DFAO并了解可以调整的设置。

## 步骤

该功能要求你在 **项目设置（Project Settings）** 的 **渲染（Rendering）** 部分中启用 **生成网格体距离场（Generate Mesh Distance Fields）**。请在此处查看如何[启用网格体距离场（Mesh Distance Field）](/documentation/zh-cn/unreal-engine/mesh-distance-fields-in-unreal-engine#%E5%90%AF%E7%94%A8%E8%B7%9D%E7%A6%BB%E5%9C%BA) （如果尚未启用）。

1.  首先，导航至 **放置Actor（Place Actors）** 面板，在 **光源（Lights）** 选项卡中，选中并将 **天空光照（Sky Light）** 拖动到关卡视口中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d9dc760-1551-4402-a5aa-496f5db11901/addskylight.png)
2.  选择好天空光照（Sky Light）之后，导航至其 **细节（Details）** 面板并将其 **可移动性（Mobility）** 设置为 **可移动（Movable）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/239fbee6-cd39-4db8-9a8f-953e8ada5dd6/transformmobility.png)

## 最终结果

在将天空光照（Sky Light）设置为"可移动（Movable）"之后，将自动为关卡启用"距离场环境光遮蔽（Distance Field Ambient Occlusion）"。

![天空光照（Sky Light） | （不使用 | 距离场环境光遮蔽（Distance Field Ambient Occlusion））](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2acf179-524d-4dcd-81ed-79f9f7b7a191/nodfaoscene.png)

![天空光照（Sky Light） | （使用 | 距离场环境光遮蔽（Distance Field Ambient Occlusion））](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84a33d5e-743b-471e-8ed6-eb05bb29a7aa/dfaoenabledscene.png)

天空光照（Sky Light） | （不使用 | 距离场环境光遮蔽（Distance Field Ambient Occlusion））

天空光照（Sky Light） | （使用 | 距离场环境光遮蔽（Distance Field Ambient Occlusion））

你可以从该比较示例中看出在启用"距离场环境光遮蔽（Distance Field Ambient Occlusion）"的情况下为场景添加"天空光照（Sky Light）"带来的影响。

## 其他天空光照（Sky Light）设置

请参阅[距离场参考](/documentation/zh-cn/unreal-engine/mesh-distance-fields-properties-in-unreal-engine#%E5%A4%A9%E7%A9%BA%E5%85%89%E7%85%A7)来了解[距离场环境光遮蔽](/documentation/zh-cn/unreal-engine/distance-field-ambient-occlusion-in-unreal-engine)设置（特定于"天空光照（Sky Light）"）。这些设置使你能够对场景进行艺术控制，例如控制遮蔽的精确性、其色调和对比度等等。

-   [static mesh](https://dev.epicgames.com/community/search?query=static%20mesh)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [shadows](https://dev.epicgames.com/community/search?query=shadows)
-   [distance fields](https://dev.epicgames.com/community/search?query=distance%20fields)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-distance-field-ambient-occlusion-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-distance-field-ambient-occlusion-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)
-   [其他天空光照（Sky Light）设置](/documentation/zh-cn/unreal-engine/using-distance-field-ambient-occlusion-in-unreal-engine#%E5%85%B6%E4%BB%96%E5%A4%A9%E7%A9%BA%E5%85%89%E7%85%A7%EF%BC%88skylight%EF%BC%89%E8%AE%BE%E7%BD%AE)