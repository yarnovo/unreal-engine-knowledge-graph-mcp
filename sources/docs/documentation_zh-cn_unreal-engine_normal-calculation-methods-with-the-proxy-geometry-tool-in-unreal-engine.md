# 虚幻引擎中使用代理几何工具的法线计算方法 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/normal-calculation-methods-with-the-proxy-geometry-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:02:15.967Z

---

目录

![常规计算方法](https://dev.epicgames.com/community/api/documentation/image/7d0cc5be-2527-4afa-8e9d-f2cc6d947444?resizing_type=fill&width=1920&height=335)

代理几何工具可以让你指定在计算给定的静态网格体的顶点法线时应该使用哪种方法。在下面的教程中，我们将了解如何改变顶点法线的计算方法，以及对生成的静态网格体的影响。

## 步骤

在下面的部分，我们将了解如何调整用于计算静态网格体的法线的方法。

1.  首先，找到你想生成新几何体的静态网格体或静态网格组，并在视口中选择该网格体或网格组。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18cfa460-96a1-4563-8b3e-527334fa6482/normalcalculationmethod_02.png "NormalCalculationMethod_02.png")
2.  接下来，进入 **窗口>开发工具>Merge Actor** ，打开 **Merge Actor** 工具。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04244fba-68db-4291-a280-b0a1caad8917/gapfilling_02.png "GapFilling_02.png")
3.  在Merge Actor工具中，点击 **第二个图标** ，进入 **代理几何** 工具，然后展开 **代理设置** 。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9340d530-f3a3-46f9-ab41-e75e8a628116/normalcalculationmethod_03.png "NormalCalculationMethod_03.png")
    
4.  将 **屏幕尺寸** 值设为 **50** ，并确保将 **法线计算方法** 设为 **角度加权** 。 ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b4823b2-239a-4048-8635-3765aca68f5d/normalcalculationmethod_04.png "NormalCalculationMethod_04.png")
    
    通过设置屏幕尺寸为50，我们告诉代理几何工具减少所选静态网格体中的三角形数量。
    
5.  接下来，点击 **Merge Actor** 按钮，在 **内容浏览器** 中为新创建的静态网格体输入一个名称和位置。然后点击 **保存** 按钮开始合并。 
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1ad173f-813b-4cb7-bf52-8be947aad08b/gapfilling_06.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1ad173f-813b-4cb7-bf52-8be947aad08b/gapfilling_06.png)
    
6.  完成后，你可以双击静态网格体，在 **静态网格体编辑器** 中打开它，查看结果。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2378c2e3-1149-4ef3-a68f-aa4cf2fec403/normalcalculationmethod_05.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2378c2e3-1149-4ef3-a68f-aa4cf2fec403/normalcalculationmethod_05.png)

## 最终结果

想得到最好的结果需要一些时间和迭代，因为每个物体可能需要不同的法线计算方法来达到理想的效果。根据你所使用的对象的类型，其结果也可能非常微妙。 下面的图片比对显示了本例中使用的静态网格体在法线计算方法被设置为角度加权、面积加权和等值加权时的情况。

  ![下面的图片显示了三种法线计算方法各自可以达到的结果。首先你会看到角度加权法，然后是面积加权法，最后是等量加权法。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17c1b55f-bdff-4144-9aec-cce7490beeeb/angleweighted.png) ![下面的图片显示了三种法线计算方法各自可以达到的结果。首先你会看到角度加权法，然后是面积加权法，最后是等量加权法。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a18b87e9-36c7-4022-9be6-9d1a48459f95/areaweighted.png) ![下面的图片显示了三种法线计算方法各自可以达到的结果。首先你会看到角度加权法，然后是面积加权法，最后是等量加权法。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33991092-bf61-47a2-9aee-ad0f6c3afe8f/equalweighted.png)

下面的图片显示了三种法线计算方法各自可以达到的结果。首先你会看到角度加权法，然后是面积加权法，最后是等量加权法。

-   [](https://dev.epicgames.com/community/search)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/normal-calculation-methods-with-the-proxy-geometry-tool-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/normal-calculation-methods-with-the-proxy-geometry-tool-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)