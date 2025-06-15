# 如何在虚幻引擎中显示世界原点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/how-to-show-the-world-origin-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:42:27.416Z

---

目录

![如何显示世界原点](https://dev.epicgames.com/community/api/documentation/image/07849720-466e-4745-95ca-81019b334251?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce3c0e08-1cb5-46af-8bad-529632694268/ar_worldorigingraphic.png)

对于本指南，我们使用 **手持式AR** 模板。

在下列方法中，我们将看一下由 **手持式AR** 模板创建的示例项目如何演示世界原点的绘制。了解增强现实系统（ARKit/ARCore）将世界原点放在何处，这一信息在进行故障排除时非常有用。设备通常根据不可预测的因素来决定它们所认为的世界位置0,0,0（世界原点），因此当内容的位置、移动或生成出现问题，而该内容未参考被追踪的几何体变换信息时，调试这些问题就会变得困难。当使用烘焙照明时，问题会变得更严重，因为静态内容期望世界原点位于一个特定的地点。

## 步骤

### 打开AR项目

1.  打开 **项目浏览器（Project Browser）** 并新建 **手持式AR** 蓝图项目，或打开现有增强现实项目。  
    若在新建增强现实项目时需要协助，请参见[手持类AR项目模板快速入门](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine) 文档。
    
2.  打开 **在蓝图中寻找** 菜单项
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ce28e2b-583b-4fb7-91ec-1c478528a112/ar_findinblueprintsmenu.png)
3.  搜索 **调试绘制世界原点**。在结果中，双击 **调试绘制世界原点** 功能。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/886f5ca5-1478-4a61-8367-e70fad2c8302/ar_blueprintsearch_debugdrawworldorigin.png)

### 显示世界原点

示例项目演示了绘制世界原点的一种简单方法。绘制世界原点是一种实用的调试练习，有助于确定增强现实系统将哪个位置确定为世界原点。如下所示，世界原点始终从 **0.0, 0.0, 0.0** 开始。 

#### 调试绘制世界原点

-   **绘制调试字符串** - 此函数将文本字符串"WORLD ORIGIN"放在世界原点(0.0, 0.0, 0.0)的位置。
    
-   **绘制调试箭头** - 这些函数从世界原点(0.0, 0,0, 0,0)开始，分别沿着X、Y和Z轴绘制短箭头。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13d6b54d-c498-4935-89d5-8304c1d91c52/ar_debugdrawworldoriginfunction.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13d6b54d-c498-4935-89d5-8304c1d91c52/ar_debugdrawworldoriginfunction.png)

### 探索其他AR功能

探索基于 **手持式AR** 蓝图模板的项目，可让您有机会检验各种增强现实功能在上下文中的实际用法。还有几十个新的增强现实功能，花些时间深入研究新项目，探索演示的实施细节。

要探索此项目和新的增强现实功能，可以通过以下方式开始：打开 **内容浏览器（Content Browser）**，导航至 **内容\\手持式ARBP\\蓝图\\UI**，然后在 **蓝图编辑器（Blueprint Editor）** 中打开 **BP\_DebugMenu** 资源。

-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [ar](https://dev.epicgames.com/community/search?query=ar)
-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [android](https://dev.epicgames.com/community/search?query=android)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/how-to-show-the-world-origin-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [打开AR项目](/documentation/zh-cn/unreal-engine/how-to-show-the-world-origin-in-unreal-engine#%E6%89%93%E5%BC%80ar%E9%A1%B9%E7%9B%AE)
-   [显示世界原点](/documentation/zh-cn/unreal-engine/how-to-show-the-world-origin-in-unreal-engine#%E6%98%BE%E7%A4%BA%E4%B8%96%E7%95%8C%E5%8E%9F%E7%82%B9)
-   [调试绘制世界原点](/documentation/zh-cn/unreal-engine/how-to-show-the-world-origin-in-unreal-engine#%E8%B0%83%E8%AF%95%E7%BB%98%E5%88%B6%E4%B8%96%E7%95%8C%E5%8E%9F%E7%82%B9)
-   [探索其他AR功能](/documentation/zh-cn/unreal-engine/how-to-show-the-world-origin-in-unreal-engine#%E6%8E%A2%E7%B4%A2%E5%85%B6%E4%BB%96ar%E5%8A%9F%E8%83%BD)

相关文档

[

手持类AR项目模板快速入门

![手持类AR项目模板快速入门](https://dev.epicgames.com/community/api/documentation/image/2ecea164-d82f-4e6c-999b-4577fcb65897?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)