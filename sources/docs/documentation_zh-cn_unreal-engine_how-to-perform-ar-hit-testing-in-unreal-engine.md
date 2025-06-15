# 如何在虚幻引擎AR项目中进行命中检测 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-perform-ar-hit-testing-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:37.342Z

---

目录

![如何在AR中进行命中检测](https://dev.epicgames.com/community/api/documentation/image/eb9db872-7401-41d2-91ab-342080db78d9?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [手持类AR项目模板快速入门](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/965c0327-46b8-4a8f-9292-51223afa0520/ar_hittesting.png)

对于本指南，我们使用 **手持式AR** 模板。

在下方的方法中，我们将查看由 **手持式AR** 模板创建的示例项目如何演示标准命中测试和跟踪对象命中测试。命中测试（轨迹追踪）对虚幻引擎或蓝图来说并不新鲜。然而，重要的是要认识到，虚幻世界中的命中测试和增强现实中的命中测试需要采用不同的方法。示例项目包含手持式设备上的虚幻世界和增强现实中的标准命中测试模式。 

其他类型的AR设备（例如AR头显）所用方法将与下文中的方法不同。

## 步骤

### 新建手持式AR项目

1.  打开项目浏览器（Project Browser）并新建 **手持式AR** 蓝图项目，或打开现有增强现实项目。  
    如需帮助新建增强现实项目，参见[手持类AR项目模板快速入门](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)文档。
2.  打开 **BP\_ARPawn** 蓝图类。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7be9b2b9-9e07-4fd4-9eab-d3e4675b0231/ar_blueprintarpawnclass.png)
3.  选择 **事件图表（Event Graph）** 选项卡。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63be8205-5a27-4d0e-ab9a-a36853baced9/ar_blueprintarpawneventgraph.png)

### 对被追踪的几何体与世界对象进行命中检测

示例项目演示 **对象轨迹追踪** 和 **轨迹追踪的对象** 在正常工作流程中的用法。**对象轨迹追踪** 将用于检查对虚幻世界对象的命中，而 **轨迹追踪的对象** 将用于检查对被追踪对象的命中（增强现实被追踪的几何体）。轨迹追踪是虚幻引擎的旧有功能，而新功能 **轨迹追踪的对象** 可以检测世界中的其他被追踪的几何体。

如下例所示，我们先查看世界对象。之所以这样做，是因为生成的世界对象通常呈现得更接近轨迹追踪的原点，因此用户将在看到被追踪的几何体之前看到它们。如果我们先测试被追踪的几何体，那么我们会错过我们每次尝试触碰的东西。

  

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f0cd740-fe98-4c01-9c5e-2df30e9a1c56/ar_blueprintbothhittests.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f0cd740-fe98-4c01-9c5e-2df30e9a1c56/ar_blueprintbothhittests.png)

点击查看大图。

  

-   **测试用户是否碰触了世界对象**  
    这是 **对象轨迹追踪** 功能的标准用法（在 **世界命中测试** 中），检查潜在的虚幻世界对象数组，并返回"真"或"假"。在这种情况下，如果返回值为"真"，将调用 **AR命中结果**，更新其中一个 **调试菜单** 项目。如果返回值为"假"，则执行路径将移动至新的增强现实功能 **轨迹追踪的对象**。 
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71c1eab2-66f5-4569-bc84-052559a10a77/ar_blueprinthittests_worldhittest.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71c1eab2-66f5-4569-bc84-052559a10a77/ar_blueprinthittests_worldhittest.png)
    
    点击查看大图。
    
      
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c9b6885-6d4a-4a71-b53c-f9f60d92b5ab/ar_worldhittest.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c9b6885-6d4a-4a71-b53c-f9f60d92b5ab/ar_worldhittest.png)
    
    点击查看大图。
    
-   **测试用户是否碰触了被追踪的几何体、生成的对象**  
    **轨迹追踪的对象** 是一个新的增强现实功能，用于对被追踪对象（增强现实追踪系统发现的几何体）进行轨迹追踪测试。**轨迹追踪的对象** 返回按与摄像机的距离排序的结果列表。在这种情况下，如果返回值 *大于0*（我们命中一个被追踪的对象），则将调用 **AR命中结果**，更新其中一个 **调试菜单** 项目，并调用 **生成可放置 Actor BP**，在命中的"被追踪"位置创建Pawn。如果返回值不包含命中结果（未命中被追踪的对象），将调用 **AR命中结果**，更新其中一个 **调试菜单** 项目。 
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d0a86a8-49cf-460e-bb2a-552ec6253ea4/ar_blueprinthittests_arhittest.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d0a86a8-49cf-460e-bb2a-552ec6253ea4/ar_blueprinthittests_arhittest.png)
    
    点击查看大图。
    

尽管这个项目的很多操作最终都会更新应用程序的 **调试菜单**，但这种情况只特定于这个项目。当然，您可通过任何需要的方式来使用轨迹追踪中的命中数据。这里的不同之处在于，**轨迹追踪的对象** 能够检测增强现实被追踪的几何体，并对其做出反应。

### 探索其他AR功能

探索基于 **手持式AR** 蓝图模板的项目，可让您有机会检查各种增强现实功能在上下文中的实际用法。还有几十个新的增强现实功能，因此请花些时间深入研究一下这个项目，探索实施细节。 

要探索此项目和新的增强现实功能，可以通过以下方式开始：打开 **内容浏览器（Content Browser）**，导航至 **内容\\手持式ARBP\\蓝图\\UI**，然后在 **蓝图编辑器（Blueprint Editor）** 中打开 **BP\_DebugMenu** 资产。

-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [ar](https://dev.epicgames.com/community/search?query=ar)
-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [android](https://dev.epicgames.com/community/search?query=android)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/how-to-perform-ar-hit-testing-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [新建手持式AR项目](/documentation/zh-cn/unreal-engine/how-to-perform-ar-hit-testing-in-unreal-engine#%E6%96%B0%E5%BB%BA%E6%89%8B%E6%8C%81%E5%BC%8Far%E9%A1%B9%E7%9B%AE)
-   [对被追踪的几何体与世界对象进行命中检测](/documentation/zh-cn/unreal-engine/how-to-perform-ar-hit-testing-in-unreal-engine#%E5%AF%B9%E8%A2%AB%E8%BF%BD%E8%B8%AA%E7%9A%84%E5%87%A0%E4%BD%95%E4%BD%93%E4%B8%8E%E4%B8%96%E7%95%8C%E5%AF%B9%E8%B1%A1%E8%BF%9B%E8%A1%8C%E5%91%BD%E4%B8%AD%E6%A3%80%E6%B5%8B)
-   [探索其他AR功能](/documentation/zh-cn/unreal-engine/how-to-perform-ar-hit-testing-in-unreal-engine#%E6%8E%A2%E7%B4%A2%E5%85%B6%E4%BB%96ar%E5%8A%9F%E8%83%BD)