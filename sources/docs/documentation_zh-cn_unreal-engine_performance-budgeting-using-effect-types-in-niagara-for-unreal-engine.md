# 在虚幻引擎的Niagara中使用效果类型来管理性能预算 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/performance-budgeting-using-effect-types-in-niagara-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:31:06.503Z

---

目录

![使用效果类型管理性能预算](https://dev.epicgames.com/community/api/documentation/image/f0a70557-ba78-413f-81c3-0b39f82b9e1c?resizing_type=fill&width=1920&height=335)

### 何时使用性能预算

在开发游戏时，就特效处理流程而言，你可以根据场景构成灵活调整。有时你可能希望更好地管理性能，例如剔除特定范围之外的实例，或剔除超出指定预算的实例。

**效果类型（Effect Type）** 资产允许你一次性配置好各种设置，然后在大量Niagara系统中复用。

### 如何创建创建效果类型资产

要创建效果类型资产，请右键点击 **内容浏览器（Content Browser）** 并选择 **特效处理（FX） >** Niagara效果类型（Niagara Effect Type）\*\* 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04e939d5-8e82-4880-a615-063e53046e6d/01-create-niagara-effect-type.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04e939d5-8e82-4880-a615-063e53046e6d/01-create-niagara-effect-type.png)

点击查看大图。

### 效果类型预算选项

在效果类型资产中，你可以设置多种不同方法来剔除超出预算用量的系统。这些选项都在标题 **预算比例（Budget Scaling）** 下提供。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d867a4ee-cc7b-4891-974f-e9bc81e5cf0c/02-0budget-scaling.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d867a4ee-cc7b-4891-974f-e9bc81e5cf0c/02-0budget-scaling.png)

点击查看大图。

-   **最大全局预算用量（Max Global Budget Usage）** ：该选项允许你设置预算上限，超过此上限的系统将一律剔除。你通常会将其设置为0到1之间的值，这表示0-100%之间的百分比。如果你希望系统更宽松，可以将其设置为1.5。这意味着，只要系统达到预算的这个百分比，就会被剔除。如果你想让性能优先于视觉效果，这是最佳选项。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f481cc93-4ff0-4a30-bcf7-76f21d11e855/03-max-global-budget-usage.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f481cc93-4ff0-4a30-bcf7-76f21d11e855/03-max-global-budget-usage.png)

点击查看大图。

-   **最大距离比例（按全局预算用量）（Max Distance Scale by Global Budget Use）** ：该选项可让你设置一个曲线来定义你剔除系统的距离如何随着预算用量的增加而缩短。例如，如果预算用量非常高，则Niagara仅会渲染附近的系统，而不会渲染很远的系统。
    
-   **最大实例计数比例（按全局预算用量）（Max Instance Count Scale by Global Budget Use）** ：该选项可让你设置一个曲线来定义关卡中的实例数如何随着预算用量的增加而缩减。这会缩减与此效果类型匹配的所有系统的所有实例。
    
-   **最大系统实例计数比例（按全局预算用量）（Max System Instance Count Scale by Global Budget Use）** ：该选项可让你设置一个曲线来定义关卡中的实例数如何随着预算用量的增加而缩减。但是，在该选项中，你不是剔除所有系统中的所有实例，而是剔除每个系统的若干实例数。
    

对于采用开始X、开始Y、结束X、结束Y值的这3个选项中的每个选项，这些值定义了线性插值的曲线。高于该曲线的内容将一律剔除。例如，请参阅下图，了解曲线的外观如何。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f53bf6a-c103-4014-ae97-112b4ca614f3/04-distance-and-instances-by-global-budget-usage.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f53bf6a-c103-4014-ae97-112b4ca614f3/04-distance-and-instances-by-global-budget-usage.png)

点击查看大图。

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [何时使用性能预算](/documentation/zh-cn/unreal-engine/performance-budgeting-using-effect-types-in-niagara-for-unreal-engine#%E4%BD%95%E6%97%B6%E4%BD%BF%E7%94%A8%E6%80%A7%E8%83%BD%E9%A2%84%E7%AE%97)
-   [如何创建创建效果类型资产](/documentation/zh-cn/unreal-engine/performance-budgeting-using-effect-types-in-niagara-for-unreal-engine#%E5%A6%82%E4%BD%95%E5%88%9B%E5%BB%BA%E5%88%9B%E5%BB%BA%E6%95%88%E6%9E%9C%E7%B1%BB%E5%9E%8B%E8%B5%84%E4%BA%A7)
-   [效果类型预算选项](/documentation/zh-cn/unreal-engine/performance-budgeting-using-effect-types-in-niagara-for-unreal-engine#%E6%95%88%E6%9E%9C%E7%B1%BB%E5%9E%8B%E9%A2%84%E7%AE%97%E9%80%89%E9%A1%B9)