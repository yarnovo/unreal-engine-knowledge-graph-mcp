# 创建虚幻引擎姿势资产 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-a-pose-asset-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:45.298Z

---

目录

![创建姿势资产](https://dev.epicgames.com/community/api/documentation/image/bea04d99-7d6f-41b7-9b57-e7c9c71c4917?resizing_type=fill&width=1920&height=335)

虽然您有时能够从动画序列抽取单帧动画，但您得自己设置混合。 通过使用 **姿势资产** 改变了这一行为，实施此类资产是为了支持可由FACS（面部行为编码系统）或视位曲线驱动姿势的面部动画。 但是，您可以使用该系统，通过混合多个姿势来驱动和创建新动画。姿势资产还支持骨骼变换以及混合空间，因此是极为灵活的资产。

本操作指南将为您介绍创建 **姿势资产** 的过程。

## 步骤

1.  要从单一动画创建一系列姿势资产，从内容浏览器中，右键单击 **动画序列（Animation Sequence）**，并根据它创建 **姿势资产（Pose Asset）**：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91c24343-0df9-442d-9576-72f2dd6b2991/poseasset1.png)
2.  创建姿势资产后，默认情况下会自动生成名称。您可以重命名每个姿势，也可以从剪贴板粘贴。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ca8244e-17b8-495c-a162-0efa48a5d66c/poseasset3.png)
3.  然后，在 **面部姿势（FacePose）** 面板中更改权重值即可看到每个姿势的效果。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41914627-3174-412c-bd57-3a19d5112a52/poseasset4.png)

## 结果

现在，您有了新的 **姿势资产** 可以在动画中使用。

要进行预览，确保 **预览姿势资产（Preview Pose Asset）** 设置为您的 **姿势资产**，然后向需要该 **姿势资产** 数据的动画添加 **变量曲线（Variable Curve）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27f52d93-192f-4a28-8bc4-f1c75f04859a/poseasset5.png)

然后，您可以向该变量曲线添加关键帧以驱动姿势权重的值，从而影响动画。

对于在运行时工作的用户，您还需要在[动画蓝图](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine)中包含**姿势资产**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73e1b229-28f8-4517-ac07-3e4e68582387/poseasset6.png)

还需要注意的是，可以在 **动画编辑器** 中创建 **姿势资产** 。您可以使用 **创建资产（Create Asset）**\>**创建姿势资产（Create PoseAsset）**\>**从当前姿势（From Current Pose）** 或 **动画（Animation）** 选项：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ca732e5-abd5-4af5-9b00-7fea00de90f5/poseasset2.png)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [pose assets](https://dev.epicgames.com/community/search?query=pose%20assets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/creating-a-pose-asset-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/creating-a-pose-asset-in-unreal-engine#%E7%BB%93%E6%9E%9C)