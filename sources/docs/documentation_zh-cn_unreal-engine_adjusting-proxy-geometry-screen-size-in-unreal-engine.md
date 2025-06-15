# 在虚幻引擎中调整代理几何体的屏幕大小 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/adjusting-proxy-geometry-screen-size-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:01:46.293Z

---

目录

![调整代理几何体的屏幕大小](https://dev.epicgames.com/community/api/documentation/image/0311691d-cda9-4b2b-8471-e917b73025cd?resizing_type=fill&width=1920&height=335)

在下面的教程中，我们将了解如何修改 **空间采样距离（Spatial Sampling Distance）** 参数，来手动调整系统对所有对象重新进行网格划分时（在执行简化之前），所采集的最小特征大小。 

## 步骤

1.  首先，在虚幻引擎5（UE5）关卡中，选择一些要使用的静态网格体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21380ac2-3033-4b0d-94e4-5191d46c0c5d/01-a-few-static-meshes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21380ac2-3033-4b0d-94e4-5191d46c0c5d/01-a-few-static-meshes.png)
    
    点击查看大图。
    
2.  在静态网格体仍处于选中状态的情况下，转至 **工具（Tools）**， 打开 **合并Actor（Merge Actors）** 工具。  然后，从显示的列表中，选择 **合并Actor（Merge Actors）** 工具。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4210766-b2f0-402b-abe7-80acd9a0ad95/02-merge-actors-tool.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4210766-b2f0-402b-abe7-80acd9a0ad95/02-merge-actors-tool.png)
    
    点击查看大图。
    
3.  "合并Actor"工具打开时，点击 **第二个** 图标以访问 **代理几何体（Proxy Geometry）** 工具。然后，在 **代理设置（Proxy Settings）** 下，展开 **材质设置（Material Settings）** 分段。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a79a9488-2cc6-4f34-981c-b14108ff4f47/03-simplify.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a79a9488-2cc6-4f34-981c-b14108ff4f47/03-simplify.png)
    
    点击查看大图。
    
4.  找到 **覆盖空间采样距离（Override Spatial Sampling Distance）** 参数，点击名称旁边的复选框，将其启用。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b26d3504-ffbd-46b5-aeac-188eb1ad6740/04-override-spatial-sampling-distance.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b26d3504-ffbd-46b5-aeac-188eb1ad6740/04-override-spatial-sampling-distance.png)
    
    点击查看大图。
    
5.  将覆盖空间采样距离的值设置为100，然后按 **合并Actor（Merge Actors）** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1e667ea-2fee-4643-b6a0-fa13df7cee14/05-merge-actors.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1e667ea-2fee-4643-b6a0-fa13df7cee14/05-merge-actors.png)
    
    点击查看大图。
    
    默认情况下，系统会根据几何体的边框和请求的 **屏幕大小（Screen Size）** 估算此大小。如果你在 **窗口（Window）> 开发人员工具（Developer Tool）> 输出日志（Output Log）** 中查看，就会发现其中写出了系统使用的实际数字。此数字越大，简化效果就越简单。此数字越小，简化就越厉害。
    
6.  为新创建的静态网格体指定名称和位置，然后按 **保存（Save）** 按钮，开始创建代理几何体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cac222a-a3ea-47db-a0fe-da75f2ddf7d7/06-newly-created-static-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cac222a-a3ea-47db-a0fe-da75f2ddf7d7/06-newly-created-static-mesh.png)
    
    点击查看大图。
    

## 最终结果

完成后，系统将为你在第一步中选中的所有静态网格体生成新的静态网格体、材质和纹理。下面各图演示了将"覆盖空间采样距离（Override Spatial Sampling Distance）"设置为不同值时，对静态网格体产生的影响。

    ![空间采样距离 = 0.5 | 空间取样距离 = 1 | 空间取样距离 = 10 | 空间取样距离 = 100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d1e96e2-5411-49a6-ad8f-81c912e17f25/07-override-spatial-sampling-distance-original.png "Override Spatial Sampling Distance Original") ![空间采样距离 = 0.5 | 空间取样距离 = 1 | 空间取样距离 = 10 | 空间取样距离 = 100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/094277d9-d50a-4614-bc0c-a214e246dd47/08-override-spatial-sampling-distance-0-5.png "Override Spatial Sampling Distance = 0.5") ![空间采样距离 = 0.5 | 空间取样距离 = 1 | 空间取样距离 = 10 | 空间取样距离 = 100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8e4df43-8bae-4074-883e-db3b09e12853/09-override-spatial-sampling-distance-1.png "Override Spatial Sampling Distance = 1") ![空间采样距离 = 0.5 | 空间取样距离 = 1 | 空间取样距离 = 10 | 空间取样距离 = 100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dd3f24d-f912-4e9a-910d-93a6c613c433/10-override-spatial-sampling-distance-10.png "Override Spatial Sampling Distance = 10") ![空间采样距离 = 0.5 | 空间取样距离 = 1 | 空间取样距离 = 10 | 空间取样距离 = 100](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/183c3986-fe1b-43d3-91eb-6ca675a370e3/11-override-spatial-sampling-distance-100.png "Override Spatial Sampling Distance = 100")

空间采样距离 = 0.5 | 空间取样距离 = 1 | 空间取样距离 = 10 | 空间取样距离 = 100

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [proxygeometrytool](https://dev.epicgames.com/community/search?query=proxygeometrytool)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/adjusting-proxy-geometry-screen-size-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/adjusting-proxy-geometry-screen-size-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)