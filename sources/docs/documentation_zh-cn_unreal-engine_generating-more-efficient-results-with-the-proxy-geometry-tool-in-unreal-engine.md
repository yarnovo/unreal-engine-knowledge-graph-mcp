# 使用虚幻引擎中的代理几何体工具生成更高效的结果 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/generating-more-efficient-results-with-the-proxy-geometry-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:02:12.208Z

---

目录

![生成更高效的结果](https://dev.epicgames.com/community/api/documentation/image/4e6b6dfa-460d-4457-9a37-c248579b7a60?resizing_type=fill&width=1920&height=335)

有时添加一点几何体实际上反而会让代理结果更高效。  这是因为，在代理LOD管线中，底层空间取样和重新网格化步骤旨在删除不可访问的几何体。  在以下操作指南中，我们将考察如何在你的虚幻引擎4（UE4）项目中解决这种问题。

## 步骤

1.  首先，找到一组静态网格体，它们以特定方式排列，构成某种类型的房间，其中有如下图所示的开口。
    
    ![Proxy_Geo_HT_GettingMore_01.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed357be0-3870-476a-8457-d239e6f17d37/proxy_geo_ht_gettingmore_01-resize793x274.png "Proxy_Geo_HT_GettingMore_01.png")
2.  选择构成该房间的所有静态网格体以及该房间可能包含的所有项目，然后运行代理几何体工具，以创建新的代理静态网格体。
    
    ![Proxy_Geo_HT_GettingMore_02.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6c057a1-2a9c-47b5-a8cf-793de104dce2/proxy_geo_ht_gettingmore_02-resize784x271.png "Proxy_Geo_HT_GettingMore_02.png")
3.  虽然代理几何体工具能够出色地创建新静态网格体，但房间内部有大量细节可以删除。为了帮助代理几何体工具更好地理解这一点，它应该删除建筑物内部的整个几何体，将一个小的静态网格体添加到关卡中，调整其位置，使其覆盖房间可能存在的所有开口。
    
    ![Proxy_Geo_HT_GettingMore_03.png](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e7fe2fe-45b0-4d27-94a4-b7efd65d060f/proxy_geo_ht_gettingmore_03-resize779x277.png "Proxy_Geo_HT_GettingMore_03.png")
4.  所有开口都由几何体的各个片段覆盖之后，再次运行代理几何体工具。 
    

## 最终结果

代理几何体工具完成后，看一下房间内部。注意，内部几乎每一个三角形都已删除，如下图所示。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c04763b-001c-4fc0-8a8a-b6350c674467/proxy_geo_ht_gettingmore_04.png "Proxy_Geo_HT_GettingMore_04.png")

其原因是，将新的静态网格体添加到此模型以充当阻挡物，代理几何体工具就能够在代理生成早期自动删除房间的所有内部结构。这样一来，制作时间短得多，最终三角形数量更少，纹理空间也得到了更好地利用。  在许多情况下，在添加几何体来封闭复杂立面的背面时，选择关着的门、地板或者只是几个平面，将极大地简化结果。

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [proxygeometrytool](https://dev.epicgames.com/community/search?query=proxygeometrytool)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/generating-more-efficient-results-with-the-proxy-geometry-tool-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/generating-more-efficient-results-with-the-proxy-geometry-tool-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)