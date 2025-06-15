# 虚幻引擎中的资产文件夹结构 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/assets-folder-structure-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:47.539Z

---

目录

![资产文件夹结构](https://dev.epicgames.com/community/api/documentation/image/70a896b5-c1b2-42ce-be61-7c3ec4c18bc1?resizing_type=fill&width=1920&height=335)

![内容浏览器中推荐的资产文件夹结构](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03538cc7-1efb-41c3-add1-394279034d17/cb_assets.png)

**资产** 文件夹通常包含用于创建角色、环境和特效 - 网格体的所有资产，例如材质、纹理、蓝图和其他源文件。此处不包含关卡资产。

每个子文件夹都包含该资产的相应源文件。例如，Chr文件夹包含Character Asset子文件夹，每个使用的角色都有一个。每个子文件夹都包含该角色的源资产，即蓝图、骨骼网格体、骨架、动画、材质等。

以下列表是[摄像机内视觉特效处理制片测试](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine)项目的资产分类方式，扩展为包括该项目中未使用的一些资产类型。任一给定的项目都不太可能使用所有可能的资产类型。

-   植被
    
    -   Tree\_A
        
        -   SM\_Tree\_A
            
        -   MI\_Tree\_A
            
        -   T\_Tree\_A\_BaseColor
            
-   岩石
    
    -   Rock\_A
        
        -   BP\_Rock\_A
            
        -   SM\_Rock\_A
            
        -   MI\_Rock\_A
            
        -   T\_Rock\_A\_BaseColor
            
    -   Rock\_B
        
    -   Pebble\_A
        
-   Chr
    
    -   Backpacker\_A
        
        -   BP\_Backpacker\_A
            
        -   SK\_Backpacker\_A
            
        -   SKEL\_Backpacker\_A
            
        -   MI\_Backpacker\_A
            
        -   T\_Backpacker\_A\_BaseColor
            
        -   ABP\_Backpacker\_A\_Livelink
            
        -   ABP\_Backpacker\_A\_Game
            
        -   动画
            
            -   A\_Backpacker\_A\_Run
                
            -   A\_Backpacker\_A\_Idle
                

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/395e6070-db3c-4894-bcc7-2d2e2d24c002/assets-chart-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/395e6070-db3c-4894-bcc7-2d2e2d24c002/assets-chart-1.png)

该图在内容浏览器中显示项目的推荐资产文件夹结构的第一部分。

-   FX
    
    -   Birds\_A
        
        -   BP\_Birds\_A
            
        -   FXS\_Birds\_A\_(DescA)\_A
            
        -   FXS\_Birds\_A\_(DescB)\_A
            
        -   发射器
            
            -   FXE\_Birds\_A\_(DescA)\_A
-   贴花
    
    -   MI\_Caustic\_A\_Decal
        
    -   T\_Caustic\_A\_M
        
-   HDR
    
    -   HDR\_NightSky\_A
        
    -   HDR\_CitySky\_D
        
-   IES
    
    -   TLP\_Arri750Plus\_A
        
    -   TLP\_Arri750Plus\_B
        
-   OCIO
    
    -   （舞台名称）
        
        -   OCIO\_(Stage)\_A
            
        -   OCIO\_(Stage)\_B
            
        -   LUTS
            
            -   (Description).spi1d（仅限文件浏览器）
            
            OpenColorIO `.spi1d` 文件不会显示在内容浏览器中，而是只显示在文件浏览器中。请参阅[OpenColorIO](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine)文档，了解更多信息。
            
-   MasterMaterials
    
    -   Ground\_A
        
        -   M\_Ground\_A
            
        -   T\_Ground\_A\_BaseColor
            
        -   MI\_WetGround\_A
            
    -   纹理
        
-   道具\*
    
-   地形\*
    
-   载具\*
    
-   其他\*
    

\* 不用于摄像内视觉特效处理制片测试。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2382e194-dac6-4076-9fdb-b668256544a6/assets-chart-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2382e194-dac6-4076-9fdb-b668256544a6/assets-chart-2.png)

该图在内容浏览器中显示项目的推荐资产文件夹结构的其余部分。它链接回顶部的第一部分。

-   [content browser](https://dev.epicgames.com/community/search?query=content%20browser)
-   [asset](https://dev.epicgames.com/community/search?query=asset)
-   [icvfx](https://dev.epicgames.com/community/search?query=icvfx)
-   [virtual sets](https://dev.epicgames.com/community/search?query=virtual%20sets)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)