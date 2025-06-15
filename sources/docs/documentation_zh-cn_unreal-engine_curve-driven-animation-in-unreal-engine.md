# 虚幻引擎曲线驱动动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/curve-driven-animation-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:09:46.784Z

---

目录

![曲线驱动动画](https://dev.epicgames.com/community/api/documentation/image/9d6bf9f8-5402-4455-80b4-b57e80d9828b?resizing_type=fill&width=1920&height=335)

在此指南中，我们新建了一个行走动画，它完全依赖于曲线数据驱动。 使用基于现有 **动画序列（Animation Sequence）** 的 **姿势资产（Pose Asset）**，从动画中抓取两个动作，在两者之间进行混合，创建全新的行走动作。 虽然这是一个用于创建运动的 **Full Body** 示例，但也可采用这些相同概念并将它们应用到面部动画中，创建由曲线数据驱动的 **叠加** 面部动画。

此指南中我们使用的是 **Blueprint Thirdperson Template** 项目。

1.  在 **Content Browser** 中的 **Content/Mannequin/Animations** 文件夹下，**右键点击** **ThirdPersonWalk** 并选择 **Create PoseAsset**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3e2e883-5bf0-40f1-bca8-d78a8c1dbb22/createposeasset_01.png)
2.  使用新 **姿势资产** 的默认命名，然后 **双击** 将其打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98b29057-2cae-46d1-97a3-8b28f4bb9136/createposeasset_2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98b29057-2cae-46d1-97a3-8b28f4bb9136/createposeasset_2.png)
    
    *点击查看全图。*
    
    创建 **姿势资产** 时，**动作命名** 将默认自动生成（只要曲线存在于动画中）。 将在 **姿势资产** 所创建的动画中对每帧创建动作。 可调整每个动作的曲线权重，在应用权重影响时查看最终的动作。 例如在上图中我们对 **Pose\_6** 的权重进行了调整，角色向前移动右脚。
    
    所有 **姿势资产** 均默认设为 **Full Body** 且不为 **Additive**，意味着加权值为 0（无影响）或 1（全影响）。 因此，在此将加权值设为 0.2 或设为 1 均无区别。 为得到更大的粒度，可将 **姿势资产** 设为 **Additive**。然而，对应用到角色全身的动画执行此操作可能导致角色意外出现缩小或比例失调。
    
3.  **右键点击** **Pose\_6** 并将其 **重命名** 为 **r\_foot\_fwd**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b65b1e9e-85d4-446f-97d8-56fe105fd271/createposeasset_3.png)
4.  **右键点击** **Pose\_24** 并将其 **重命名** 为 **l\_foot\_fwd**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d78a603c-00b9-4d57-80f5-a94bdef1b4e1/createposeasset_add01.png)
5.  在 **主工具栏** 中点击 **Create Asset** 并选择 **Create Animation** / **From Reference Pose**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81a37473-b26a-4b27-b182-82839bb64355/createposeasset_4.png)
6.  选择保存路径和保存命名（此例命名为 **CurveWalk**）。
    
7.  在新动画中 **右键点击** 时间轴，选择 **Append at the End** 并添加 **30** 帧。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41c12e97-1d6a-4c06-bd88-77f78e5f707f/createposeasset_5.png)
8.  点击 **Curves** 下的 **Add** 按钮，然后在 **Add Variable Curve..** 下选择 **l\_foot\_fwd** 进行添加，然后再添加 **r\_foot\_fwd**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d20f0667-4539-42e3-8fd5-7c44eedc2215/addleftcurve.png)
    
    我们现在便拥有了两个需要用曲线数据驱动的动作。
    
9.  点击 **l\_foot\_fwd** 和 **r\_foot\_fwd** 曲线的 **Expand Window** 复选框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b287396-d45b-4723-a0c0-ce1ac863279e/checkboxes.png)
10.  将时间轴移至 **0**，然后在 **l\_foot\_fwd** 曲线中按住 **Shift + 左键** 创建一个键并将 **Time** 和 **Value** 设为 **0**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e9d27f6-053d-408c-a3fa-bd085c2c8290/1stkey.png)
11.  按住 **Shift + 左键** 并添加分别为 **Time 0.5** 和 **Value 1.0**、**Time 1.0** 和 **Value 0.0** 的键。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09c20344-5fba-4833-8cdc-e3535ddd27e3/2ndkey.png)
    
    这样的设置将使角色的左脚在动画中向前迈出半步。
    
12.  在 **r\_foot\_fwd** 曲线中按住 **Shift + 左键** 并数值如下的键：（**Time 0、Value 1**）、（**Time 0.5、Value 0**），和（**Time 1、Value 1**）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aea372f-9aa8-4bbd-a504-187c315b38fd/3rdkey.png)
    
    在动画的开头，角色的右脚将向前迈出半步，然后切换至左脚向前。 动画接近结束时，我们使用曲线数据再次驱动右脚向前动作，循环即可生成行走动作循环。
    
13.  如需预览带姿势资产的动画，在 **Asset Details** 面板中将当前的 **Preview Pose Asset** 设为使用 **ThirdPersonWalk\_PoseAsset** 即可。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb60e91b-1905-4b56-b148-53aef3c79aac/createposeasset_7.png)

## 最终结果

现在即可播放动画，查看由曲线数据混合的两个动作。

如需在运行时播放动画，需要在动画蓝图中使用一个 [动作混合节点](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine)。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animation blueprint](https://dev.epicgames.com/community/search?query=animation%20blueprint)
-   [skeletal controls](https://dev.epicgames.com/community/search?query=skeletal%20controls)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [最终结果](/documentation/zh-cn/unreal-engine/curve-driven-animation-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)