# 使用虚幻引擎中的代理几何体工具填充间隙 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/filling-gaps-using-the-proxy-geometry-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:02:12.074Z

---

目录

![使用代理几何体工具填充间隙](https://dev.epicgames.com/community/api/documentation/image/975af052-05a2-47f2-aa30-cfc9a6ce442b?resizing_type=fill&width=1920&height=335)

对于防水的几何体，代理几何体工具将自动废弃不可访问的结构，例如内部墙壁、家具以及封闭结构中的内容。为实现理想的结果，构造源几何体时应该注意这一点，但由于游戏制作约束，这并非总是可行。为了方便根据几乎防水的源几何体生成高效的代理LOD，ProxyLOD工具现在可以选择使用基于关卡集的膨胀和侵蚀技术来闭合间隙。预期用例主要是远处建筑物的门窗，在以下操作指南中，我们会考察如何设置代理几何体工具来自动闭合生成的几何体可能存在的间隙。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ebf83f69-8e27-4aa6-9a82-a20bc306c3fc/gapfilling_10.png)

## 步骤

在以下分段中，我们会考察如何确保在代理几何体工具生成的静态网格体上闭合开放的几何体。

1.  首先找到你想闭合的开口所在的结构或对象。本示例使用了下面的小房子，它仅使用初学者内容包中提供的静态网格体构造。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/981f5376-9a69-4675-b70b-33d1e2e6b443/gapfilling_01.png "GapFilling_01.png")
2.  接下来，转至 **窗口（Window）> 开发人员工具（Developer Tools）> 合并Actor（Merge Actors）** ，打开 **合并Actor（Merge Actors）** 工具。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b97297a3-1dd1-4b5b-925c-79349b7161c9/gapfilling_02.png "GapFilling_02.png")
3.  在关卡内部，选择所有必要的静态网格体Actor，以便构成对象，进而为其生成新几何体。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/525bb04b-8692-4b98-8608-1d6ec0eac849/gapfilling_03.png "GapFilling_03.png")
4.  在合并Actor工具中，点击 **第二个图标** 访问代理几何体工具，然后展开 **代理设置（Proxy Settings）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/488dda9f-2adb-48c0-8116-8682d0d01d6a/gapfilling_04.png "GapFilling_04.png")
5.  在代理设置中，将 **合并距离（Merge Distance）** 值设为 **120** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/538781c6-987b-4b20-9c11-aaa0a1bed249/gapfilling_05.png "GapFilling_05.png")
    
    合并距离参数将指明代理几何体工具应该闭合的间隙距离。数字越小，闭合的间隙就越小，数字越大，填充的间隙就越大。
    
6.  接下来，点击 **合并Actor（Merge Actors）** 按钮，并在 **内容浏览器（Content Browser）** 中为新创建的静态网格体输入名称和位置。然后点击 **保存（Save）** 按钮，开始合并过程。 
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/617f0374-6017-4a3c-8332-b27fac80d92c/gapfilling_06.png "GapFilling_06.png")
7.  合并完成后，找到内容浏览器中新创建的静态网格体，双击它以在 **静态网格体编辑器（Static Mesh Editor）** 中打开。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f790965f-693d-4b40-9d68-a7f19752bd0f/gapfilling_07.png "GapFilling_07.png")
8.  根据你选择的对象，代理几何体工具创建的新几何体的延伸距离超出预期时（如下图所示），可能造成一些问题：
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07017308-975b-47c6-b45d-a5ed8ff7ea75/gapfilling_08.png "GapFilling_08.png")
9.  要修复这类问题，请首先重新选择构成你的对象的所有静态网格体。然后在合并Actor工具中，将 **合并距离（Merge Distance）** 增加到值 **175** 。然后启用 **传输距离覆盖（Transfer Distance Override）** 并将其设为值 **100** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcae2498-6537-49ae-a7a2-84d1c8c76252/gapfilling_06.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fcae2498-6537-49ae-a7a2-84d1c8c76252/gapfilling_06.png)
    
    要更好地了解你应该使用什么值，请查看输出日志。输出日志将表明什么值用于 **空间取样近距离（Spatial Sampling Distance）** （用于重新网格化的体素大小）和 **传输距离覆盖（Transfer Distance Override）** （材质距离）。了解使用什么值之后，你可以根据自己所需的结果，增加或减小这些值。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0d4cb6c-ddf1-40b3-a7de-5f65a6e411f6/samplingscalematdistance.png "SamplingScaleMatDistance.png")
    
10.  完成该操作后，点击"合并Actor（Merge Actors）"按钮，再次开始该过程。代理几何体生成完成后，现在对象如下所示。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d566639d-2990-446e-83b1-012347c05ab0/gapfilling_10.png "GapFilling_10.png")
    
    根据你的几何体的设置方式，你可能需要为合并距离和传输距离覆盖使用不同的值重复上述过程几次，直到你对结果感到满意为止。
    

## 最终结果

获得最佳结果需要一些时间和迭代，因为你为其生成代理几何体的每个对象都需要稍微不同的合并距离和传输距离覆盖。在下图的比较中，你可以看到将合并距离和传输距离覆盖设为值 **0、100、200** 和 **300** 时可以实现的结果。

   ![合并距离和传输距离覆盖都设为值0、100、200和300时的情况示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3eab15a-b997-4374-b7eb-fdc48da33cd4/setto0.png) ![合并距离和传输距离覆盖都设为值0、100、200和300时的情况示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec42c2cb-f93f-4f98-b588-db5948ae1d63/setto100.png) ![合并距离和传输距离覆盖都设为值0、100、200和300时的情况示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b977e03-f3b2-404d-97ff-d9208dc07398/setto200.png) ![合并距离和传输距离覆盖都设为值0、100、200和300时的情况示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2eec5abd-a6f6-4423-b837-672573cc44da/setto300.png)

合并距离和传输距离覆盖都设为值0、100、200和300时的情况示例

-   [](https://dev.epicgames.com/community/search)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/filling-gaps-using-the-proxy-geometry-tool-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/filling-gaps-using-the-proxy-geometry-tool-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)