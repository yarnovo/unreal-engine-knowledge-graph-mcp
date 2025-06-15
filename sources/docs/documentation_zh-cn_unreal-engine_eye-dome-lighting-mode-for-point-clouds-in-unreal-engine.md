# 虚幻引擎中的点云Eye-Dome光照模式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/eye-dome-lighting-mode-for-point-clouds-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:07:28.289Z

---

目录

![启用Eye-Dome光照模式](https://dev.epicgames.com/community/api/documentation/image/09cf53e5-a4b1-4da1-8008-80ce6e0900c0?resizing_type=fill&width=1920&height=335)

**Eye-Dome光照（EDL）** 是一种光照模型，可将紧密相连的对象分组、为轮廓着色并增强深度感，从而突出点云中对象的形状。EDL用作后期处理材质，需要后期处理体积才能使用。无需使用引擎光源，可与无光照渲染方法配合使用。

EDL可配合环境光遮蔽使用，但生成的图像可能色调过于偏暗。

## 步骤

1.  在你的关卡中添加一个后处理体积。在 **放置Actor** 面板中搜索 **后处理体积**，将其拖入关卡。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7552b99-8347-4b91-b0b9-43b53c5cfbe6/ue5_01-post-process-volume-into-level.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a7552b99-8347-4b91-b0b9-43b53c5cfbe6/ue5_01-post-process-volume-into-level.png)
    
    点击查看大图
    
2.  选中后处理体积，在其 **细节** 面板中，滚动到 **渲染功能** 类别。
    
3.  展开 **后处理材质**，点击 **添加（+）** 图标，在数组中添加一个新材质。
    
4.  在新材质的下拉菜单中，选择 **资产引用（Asset reference）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5035d24-ecb9-4db0-ac78-f4002140cc55/ue5_02-select-asset-reference.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5035d24-ecb9-4db0-ac78-f4002140cc55/ue5_02-select-asset-reference.png)
    
    点击查看大图
    
5.  点击 **无（None）** 下拉菜单。然后启用 **引擎内容（Engine Content）** 和 **插件内容（Plugin Content）** 使其可见。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ffd4ee6-c5f5-4383-81bf-57afffd95409/ue5_03-enable-engine-content-and-plugin-content.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ffd4ee6-c5f5-4383-81bf-57afffd95409/ue5_03-enable-engine-content-and-plugin-content.png)
    
    点击查看大图
    
6.  再次点击 **无** 下拉菜单。然后，在以下两个选项中选择一个：
    
    -   **M\_PP\_EDL\_MainPass** - 将EDL应用到关卡中的所有对象，而不仅仅是点云。如果你只显示点云元素，推荐采用此选项。
    -   **M\_PP\_EDL\_CustomPass** \- 只对使用 **自定义深度通道（Custom Depth Pass）** 的对象应用EDL。如果你想选择性地应用EDL，推荐此选项。
    
    启用自定义深度传递将增加性能成本。
    
7.  如需将EDL应用于整个关卡，请在后处理体积上启用 **无限范围（Unbound）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c90c275-ebae-4d82-a252-34679693cf9e/ue5_04-enable-the-infinite-extent-option.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c90c275-ebae-4d82-a252-34679693cf9e/ue5_04-enable-the-infinite-extent-option.png)
    
    点击查看大图
    

## 结果

EDL已应用到该关卡。请注意观察关卡中对象边缘的变化，以及此操作对深度感的增强。

![应用EDL前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e96ef7f-c4e0-4e99-a132-3254f0eb02a5/ue5_05-before-applying-edl.png)

![应用EDL后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee0f69fc-91e3-49fb-bd7d-e6d1ed139446/ue5_06-after-applying-edl.png)

应用EDL前

应用EDL后

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [lidar](https://dev.epicgames.com/community/search?query=lidar)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/eye-dome-lighting-mode-for-point-clouds-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [结果](/documentation/zh-cn/unreal-engine/eye-dome-lighting-mode-for-point-clouds-in-unreal-engine#%E7%BB%93%E6%9E%9C)