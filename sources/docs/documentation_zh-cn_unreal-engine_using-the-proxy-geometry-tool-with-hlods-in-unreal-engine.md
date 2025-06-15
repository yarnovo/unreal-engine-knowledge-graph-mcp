# 在虚幻引擎中使用HLOD与代理几何体工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-proxy-geometry-tool-with-hlods-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:02:36.142Z

---

目录

![使用HLOD与代理几何体工具](https://dev.epicgames.com/community/api/documentation/image/2557e9be-8275-433b-a560-8fc15950d54d?resizing_type=fill&width=1920&height=335)

在下面的教程中，我们将了解如何结合[层级关卡细节](/documentation/zh-cn/unreal-engine/hierarchical-level-of-detail-in-unreal-engine)(HLOD)系统使用代理几何体工具。将这两个工具结合在一起使用，将通过减少绘制调用次数和每帧绘制到屏幕的三角形数量，帮助提高虚幻引擎4 (UE4)项目的渲染性能。

## 步骤

1.  转到项目的[世界设置](/documentation/en-us/unreal-engine/world-settings-in-unreal-engine)，并显示 **LOD系统（LODSystem）** 菜单选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/039fc04a-1037-4f53-958b-0013fd12f3ee/proxy_geo_ht_whlod_01.png)
2.  在LOD系统（LODSystem）菜单中，启用以下两个选项： 
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d26fedde-6233-44a5-879d-64f193a87761/proxy_geo_ht_whlod_02.png)
    
    **属性名称**
    
    **说明**
    
    **启用层级LOD系统（Enable Hierarchical LOD System）**
    
    启用与该层级一起使用的HLOD。
    
    **简化网格体（Simplify Mesh）**
    
    启用代理几何体静态网格体（Proxy Geometry Static Mesh）简化。
    
3.  通过转到 **窗口（Window）> 层级LOD大纲视图（Hierarchical LOD Outliner）**，打开 **层级LOD大纲视图（Hierarchical LOD Outliner）** 工具。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9fb927a6-77b0-4b72-9c27-313bdd143db3/proxy_geo_ht_whlod_03.png "Proxy_Geo_HT_WHLOD_03.png")
4.  按 **层级LOD大纲视图（Hierarchical LOD Outliner）** 上的 **生成群集（Generate Clusters）** 按钮，完成后，按 **生成代理网格体（Generate Proxy Meshes）** 按钮，以启动HLOD和代理几何体创建过程。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa949cf1-8639-42cb-9534-e559ee62b947/proxy_geo_ht_whlod_04.png "Proxy_Geo_HT_WHLOD_04.png")

## 最终结果

当层级LOD工具完成处理后，您可以看到删除的三角形数量，并通过前后移动滑块将结果与原始情况进行比较。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/763e5a80-62e1-4e38-b77f-7495465835d3/proxy_geo_ht_whlod_05.png "Proxy_Geo_HT_WHLOD_05.png")

下面的图像比较滑块显示了一个示例，该示例说明当您启用了 **简化网格体（Simplify Mesh）** 且仅使用默认设置时可获得的结果类型。

![Before Running HLOD & Proxy Geo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0db32c6b-9585-4a03-84aa-99eb6e5c3d58/proxy_geo_ht_whlod_before.png)

![After Running HLOD & Proxy Geo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a316f0d4-0a30-464e-817f-33f43b8ce665/proxy_geo_ht_whlod_after.png)

Before Running HLOD & Proxy Geo

After Running HLOD & Proxy Geo

-   [hlod](https://dev.epicgames.com/community/search?query=hlod)
-   [proxygeometry](https://dev.epicgames.com/community/search?query=proxygeometry)
-   [optmization](https://dev.epicgames.com/community/search?query=optmization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/using-the-proxy-geometry-tool-with-hlods-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/using-the-proxy-geometry-tool-with-hlods-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)