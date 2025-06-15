# 虚幻引擎地形斜坡工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/landscape-ramp-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:12:58.344Z

---

目录

![地形斜坡工具](https://dev.epicgames.com/community/api/documentation/image/4e2c5941-7b77-40a7-a078-c4c8a9611b22?resizing_type=fill&width=1920&height=335)

使用 **斜坡（Ramp）** 工具可在地形上选择两个位置并在两个点之间创建一个平板斜坡，并在侧边指定衰减。

## 使用斜坡工具

1.  在地形工具栏的 **造型（Sculpt）** 标签页中选择 **斜坡（Ramp）** 工具。
    
    ![Ramp Selection](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae47270f-68e7-475b-b95f-76b34e456108/01-ramp-selection.png)
2.  在地形的视口中，**点击左键** 并进行拖动，或在地形的两个不同位置上点击左键即可标出斜坡的开始和结束点。
    
    ![Beginning And End Points Of The Ramp](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9251b1cc-9d59-4334-93d3-2d5c898043c6/02-beginning-and-end-points-of-the-ramp.png)
    
    设置开始和结束点之后，如需放弃创建斜坡，点击 **重置（Reset）** 即可将其清除。
    
3.  选择任意一个标志并调整其位置。在此例中，它在地形表面之上沿 Z 轴移动。
    
    ![Moved Ramp](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f23aa375-f3d0-4a13-90a0-2d1c4d5af792/03-moved-ramp.png)
4.  选择好位置后，点击工具设置中的 **添加斜坡（Add Ramp）** 按钮即可创建斜坡。
    
    ![Add Ramp](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/245664b1-32c3-4e13-9514-d9603e924548/04-add-ramp.png)
    
    现在，你的高度图中便拥有了一个斜坡。
    
    ![Ramp](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d0b7cbb-6b73-4995-9021-09d0c8322232/05-ramp.png)

## 工具设置

![Ramp Tool](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1e27cd1-55e3-4096-848b-b89cad276a49/06-ramp-tool.png)

![Ramp Tool Properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4db11ace-2fea-43a9-9335-31ccc4e83a3a/07-ramp-tool-properties.png)

 

 

**属性**

**描述**

**Ramp Width**

设置斜坡的宽度。

**Side Falloff**

在斜坡的侧边设置边缘衰减，使其融入整体地形。此衰减将为侧边的边缘流增添一些柔度。数值 **0** 意味着不存在衰减，数值 **1** 意味着斜坡不存在平坦表面，全为衰减。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用斜坡工具](/documentation/zh-cn/unreal-engine/landscape-ramp-tool-in-unreal-engine#%E4%BD%BF%E7%94%A8%E6%96%9C%E5%9D%A1%E5%B7%A5%E5%85%B7)
-   [工具设置](/documentation/zh-cn/unreal-engine/landscape-ramp-tool-in-unreal-engine#%E5%B7%A5%E5%85%B7%E8%AE%BE%E7%BD%AE)