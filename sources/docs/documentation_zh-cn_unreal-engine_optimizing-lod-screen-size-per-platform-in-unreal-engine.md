# 在虚幻引擎中为不同平台优化LOD屏幕大小 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/optimizing-lod-screen-size-per-platform-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:03:03.184Z

---

目录

![为不同平台优化LOD屏幕大小](https://dev.epicgames.com/community/api/documentation/image/70b437d0-3ef2-4b3b-8685-fcd6e2104e7b?resizing_type=fill&width=1920&height=335)

虚幻引擎5（UE5）通过判定静态网格体在屏幕中的大小，来判断静态网格体何时从一个LOD切换到另一个LOD。虽然这种方法很好用，但缺点是，在不同平台上的判断标准会不一样。以下教程介绍了如何设置LOD切换时的屏幕尺寸阈值，以便你的UE5项目能够移植到不同平台上。

## 步骤

以下小节讲解了如何在平台上定义LOD切换标准。

1.  首先，在 **内容浏览器（Content Browser）** 中，找到有几个LOD要处理的 **静态网格体（Static Mesh）** 并在 **静态网格体编辑器（Static Mesh Editor）** 中将其打开。本示例中，静态网格体有四种LOD。不过，你可以根据需要拥有更多LOD级别的网格体。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9712d973-ad3b-4d68-8258-a6b852e8e8fc/01-pplatform-size-01.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9712d973-ad3b-4d68-8258-a6b852e8e8fc/01-pplatform-size-01.png)
    
    点击查看大图。
    
2.  在静态网格体编辑器中打开静态网格体之后，转至 **细节（Details）面板** ，并展开 **LOD设置（LOD Settings）** 类别。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c30eea5-ebf4-4656-8e14-122ce86ee479/02-pplatform-size-02.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c30eea5-ebf4-4656-8e14-122ce86ee479/02-pplatform-size-02.png)
    
    点击查看大图。
    
3.  禁用 **自动计算LOD距离（Auto Compute LOD Distances）** 旁边的复选框，以便我们可以手动设置应该发生LOD过渡的距离。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c4a9ae3-86b9-4d52-80cb-df77efc4028f/03-pplatform-size-03.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c4a9ae3-86b9-4d52-80cb-df77efc4028f/03-pplatform-size-03.png)
    
    点击查看大图。
    
4.  接下来，转至 **LOD选取器（LOD Picker）** 分段，点击 **自定义（Custom）** 选项旁边的复选框将其启用。这样一来，你可以在静态网格体编辑器中同时查看所有LOD。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f649422-903d-45e4-b3a5-fa9e04953ffa/04-pplatform-size-04.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f649422-903d-45e4-b3a5-fa9e04953ffa/04-pplatform-size-04.png)
    
    点击查看大图。
    
5.  展开 **LOD1** 分段，点击 **屏幕大小（Screen Size）** 选项旁边的 **白色小三角形** ，显示出该选项，以添加每个平台的LOD覆盖。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19873a24-9526-4d58-8a1a-78a714c3d207/05-pplatform-size-05.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19873a24-9526-4d58-8a1a-78a714c3d207/05-pplatform-size-05.png)
    
    点击查看大图。
    
6.  从显示的逐个平台覆盖列表中，选择 **为移动平台添加覆盖（Add Override for Mobile）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d4e6753-df3c-4988-af67-3ecab548a9e7/06-pplatform-size-06.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d4e6753-df3c-4988-af67-3ecab548a9e7/06-pplatform-size-06.png)
    
    点击查看大图。
    
7.  为 **LOD 2** 和 **LOD 3** 重复上述步骤，完成后，你的"细节（Details）"面板应该类似于下图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9545859-cd87-40a7-91bc-8fcde0f167ea/07-pplatform-size-07.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9545859-cd87-40a7-91bc-8fcde0f167ea/07-pplatform-size-07.png)
    
    点击查看大图。
    
8.  现在你可以在 **移动（Mobile）** 选项下的框中输入新数字来调整移动屏幕大小。要了解应该将什么样的屏幕大小用于哪个LOD，静态网格体编辑器中的 **视口（Viewport）** 会显示 **当前屏幕大小（Current Screen Size）** 。 
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9aab8de8-be23-4bd2-bae6-c19cb22eb2a7/08-pplatform-size-08.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9aab8de8-be23-4bd2-bae6-c19cb22eb2a7/08-pplatform-size-08.png)
    
    点击查看大图。
    

## 最终结果

现在，你已经为移动设备设置了LOD过渡时的距离，你可以设用相同的步骤，为主机和PC设置过渡距离。最后的界面如下图所示。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95fbd580-f88f-402e-979a-e9297056accb/09-pplatform-size-09.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95fbd580-f88f-402e-979a-e9297056accb/09-pplatform-size-09.png)

点击查看大图。

-   [import](https://dev.epicgames.com/community/search?query=import)
-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [static meshes](https://dev.epicgames.com/community/search?query=static%20meshes)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/optimizing-lod-screen-size-per-platform-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/optimizing-lod-screen-size-per-platform-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)