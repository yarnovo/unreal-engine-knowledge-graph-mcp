# 使用虚幻引擎中的代理几何体工具改善法线 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/improving-normals-with-the-proxy-geometry-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:02:12.959Z

---

目录

![改善法线](https://dev.epicgames.com/community/api/documentation/image/1bf460dc-dd51-4888-b603-aa82c1ffc05c?resizing_type=fill&width=1920&height=335)

由于《堡垒之夜》内存使用量存在极端约束，这就需要非常高效地使用细节级别（LOD）网格体。大部分代理会生成非常小的基础颜色纹理，并且不会使用法线贴图。因此，该方法需要代理网格体本身采用最高质量的法线。在以下操作指南中，我们将考察在使用代理几何体工具时如何指定静态网格体法线的计算方式。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/506a5445-c05e-47cf-9293-57058f977f74/hardedgesplit_10.png)

## 步骤

在以下操作小节中，我们将考察如何调整在使用代理几何体工具时计算生成的静态网格体法线的方式。

1.  首先，找到需要为其创建代理静态网格体的对象。本示例使用了下面的小房子，它仅使用初学者内容包中提供的静态网格体构造。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21240574-c8b0-48ae-acfa-1be57fd6606b/gapfilling_01.png "GapFilling_01.png")
2.  接下来，转至 **窗口（Window）> 开发人员工具（Developer Tools）> 合并Actor（Merge Actors）** ，打开 **合并Actor（Merge Actor）** 工具。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0337e8c1-9bee-41a6-8b68-49ec148e8cf2/gapfilling_02.png "GapFilling_02.png")
3.  在关卡内部，选择所有必要的静态网格体Actor，以便构成对象，进而为其生成新几何体。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae31ffba-912c-4890-bb97-46977d316d7b/gapfilling_03.png "GapFilling_03.png")
4.  在合并Actor工具中，点击 **第二个图标** 访问代理几何体工具，然后展开 **代理设置（Proxy Settings）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f15e4b9e-02e4-4b2d-94d5-6e4e040c5870/gapfilling_04.png "GapFilling_04.png")
5.  在"代理设置（Proxy Settings）"下，展开 **材质设置（Material Settings）** 分段，并禁用 **法线贴图（Normal Map）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e8e1c40-8a5e-4a7f-a2c2-602f408610e8/hardedegesplit_01.png "HardEdegeSplit_01.png")
    
    如果不在此处禁用法线，你不会看到正确的结果，因为你将看到法线贴图的法线，而不是生成的静态网格体的法线。
    
6.  接下来，点击 **硬边角度（Hard Edge Angle** 选项旁边的复选框将其禁用。这会禁用生成的静态网格体上的所有法线计算。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e4b5bc8-47a5-4d15-98cc-b3c255bb9153/hardedegesplit_02.png "HardEdegeSplit_02.png")
7.  接下来，点击 **合并Actor（Merge Actors）** 按钮，并在 **内容浏览器（Content Browser）** 中为新创建的静态网格体输入名称和位置。然后点击 **保存（Save）** 按钮，开始合并过程。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5eb19693-ae16-478c-86fc-a64cb2087fc3/gapfilling_06.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5eb19693-ae16-478c-86fc-a64cb2087fc3/gapfilling_06.png)
    
8.  完成所有操作后，打开新创建的静态网格体，它应该类似于下图。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fca4786c-8040-4443-9e68-98089bc50403/hardedegesplit_03.png "HardEdegeSplit_03.png")
9.  上图并不是我们的预期结果；我们想要生成的对象的法线看起来与生成它的对象的法线几乎完全相同。要修复该问题，请转至合并Actor工具，并重新启用硬边角度选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3630c95-779a-468b-b318-e6f16be55c74/hardedegesplit_04.png "HardEdegeSplit_04.png")
10.  重新启用硬边角度后，重新运行合并Actor工具。完成后，你现在应该拥有如下图所示的建筑物：
    

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2ba9676-2c20-4da7-9661-ccc8b880931b/hardedegesplit_05.png "HardEdegeSplit_05.png")

## 最终结果

为获得最佳结果，将需要一些时间和迭代，因为每个对象可能需要稍微不同的设置来获得最佳结果。还请注意，当你指定硬边角度的值时，你可以增加或减小生成的静态网格体中使用的顶点数量。下图的对比显示了将硬边角度（Hard Edge Angle）设为 **0** 、 **5** 、 **10** 、 **50** 、 **80** 、 **130** 、 **180** 时，静态网格体及其顶点的情况。

      ![下图的对比显示了将硬边角度（Hard Edge Angle）设为值0、5、10、50、80、130和180时的不同着色和顶点数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/783d12a5-ea29-4357-a74e-64829ae372a7/hardedgesplit_0.png) ![下图的对比显示了将硬边角度（Hard Edge Angle）设为值0、5、10、50、80、130和180时的不同着色和顶点数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cef82ea9-37ff-4baa-ae78-e4a061ae0865/hardedgesplit_5.png) ![下图的对比显示了将硬边角度（Hard Edge Angle）设为值0、5、10、50、80、130和180时的不同着色和顶点数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/99219fd3-7c6d-46c6-ad07-fab8d0cef293/hardedgesplit_10.png) ![下图的对比显示了将硬边角度（Hard Edge Angle）设为值0、5、10、50、80、130和180时的不同着色和顶点数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/76eb192c-e220-44c4-8220-1587485c8cef/hardedgesplit_50.png) ![下图的对比显示了将硬边角度（Hard Edge Angle）设为值0、5、10、50、80、130和180时的不同着色和顶点数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29f62a6c-f356-4928-8345-60ff04b611ad/hardedgesplit_80.png) ![下图的对比显示了将硬边角度（Hard Edge Angle）设为值0、5、10、50、80、130和180时的不同着色和顶点数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0f8fada-df01-497c-802c-29a29e75a7cc/hardedgesplit_130.png) ![下图的对比显示了将硬边角度（Hard Edge Angle）设为值0、5、10、50、80、130和180时的不同着色和顶点数量。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb58452a-3f3f-4b9e-9bb8-c10aff4183e9/hardedgesplit_180.png)

下图的对比显示了将硬边角度（Hard Edge Angle）设为值0、5、10、50、80、130和180时的不同着色和顶点数量。

-   [](https://dev.epicgames.com/community/search)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/improving-normals-with-the-proxy-geometry-tool-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/improving-normals-with-the-proxy-geometry-tool-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)