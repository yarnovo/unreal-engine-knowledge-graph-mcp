# 虚幻引擎中的OpenColorIO颜色管理 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:30:16.472Z

---

目录

![OpenColorIO颜色管理](https://dev.epicgames.com/community/api/documentation/image/6eed827c-cc57-4d9a-81e7-2cf099d35a26?resizing_type=fill&width=1920&height=335)

虚幻引擎5支持OCIO v2。如需详细了解OCIO v2中包含的功能，请参阅[OCIO文档](https://opencolorio.readthedocs.io/en/latest/upgrading_v2/how_to.html)。

[OpenColorIO](http://opencolorio.org/)（ **OCIO** ）是一个主要用于电影和虚拟制片的颜色管理系统。OCIO旨在保证在整个电影制作管线中，所捕获的视频在颜色上保持一致。此管线包括初始摄像机捕捉、需要处理所捕捉媒体的所有合成应用程序，以及最终渲染。

**虚幻引擎** （UE）提供支持，可使用OCIO以多种方式转换线性媒体的颜色：

-   当你在项目中使用所捕捉的剪辑片段或实时内容等媒体源时，你可以应用颜色转换，使这些媒体源与你在UE中的计算机生成元素相匹配。
    
-   你可以使用OCIO将颜色转换应用于你的视口和"在编辑器中播放（PIE）"窗口。这意味着，你在编辑器中的参考帧将与所选颜色空间保持一致。
    
-   你可以将另一种颜色转换重新应用到你从[Composure](/documentation/zh-cn/unreal-engine/real-time-compositing-with-composure-in-unreal-engine)输出的合成内容。这有助于你的CG元素和实时帧更加有效地融合，同时如实保留原始镜头的颜色。
    
-   你可以使用显示和视图，通过相同的OCIO配置将颜色转换应用于多个物理或虚拟显示设备。
    
-   你可以将颜色空间转换应用于显示器和LED墙上的[nDisplay](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine)渲染。
    
-   当你通过[影片渲染队列](/documentation/404)导出视频时，你可以对输出视频或图像序列应用颜色空间转换。
    

引擎中的所有OCIO功能都依赖 **OpenColorIO配置资产** ，你可以使用它来管理你要使用的颜色配置文件。

OpenColorIO配置资产将引用OCIO配置（ `.ocio` ）文件，其中包含有关多个颜色配置文件的详细规范，以及如何在它们之间进行转换。UE目前支持OCIO v2。有关OCIO配置文件的更多详细信息，请参阅[OpenColorIO v2文档](https://opencolorio.readthedocs.io/en/latest/index.html)。

此页面包含有关创建OpenColorIO配置资产和在引擎中应用颜色转换的文档链接。

## 快速入门

此页面将指导你创建OpenColorIO配置资产。

[](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine)

[![OpenColorIO快速入门](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39d8c4b8-fcd0-4a76-b796-8371335a2ff6/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine)

[OpenColorIO快速入门](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine)

[基于OpenColorIO配置文件创建OpenColorIO配置资产。](/documentation/zh-cn/unreal-engine/opencolorio-quick-start-for-unreal-engine)

## 在视口中转换颜色

编辑器支持通过 **视口视图模式（Viewport View Modes）** 将OCIO颜色转换应用于关卡视口，并通过蓝图应用于"在编辑器中播放"模式。此页面将介绍如何将颜色转换应用于关卡视口和"在编辑器中播放"模式。

[](/documentation/zh-cn/unreal-engine/apply-color-conversion-to-the-level-viewport-and-play-in-editor-with-opencolorio-in-unreal-engine)

[![在视口和PIE模式中转换颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f034f3d5-567d-4ed8-9759-900b5c0a999a/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/apply-color-conversion-to-the-level-viewport-and-play-in-editor-with-opencolorio-in-unreal-engine)

[在视口和PIE模式中转换颜色](/documentation/zh-cn/unreal-engine/apply-color-conversion-to-the-level-viewport-and-play-in-editor-with-opencolorio-in-unreal-engine)

[使用虚幻引擎中的OpenColorIO对关卡视口和PIE模式应用颜色转换。](/documentation/zh-cn/unreal-engine/apply-color-conversion-to-the-level-viewport-and-play-in-editor-with-opencolorio-in-unreal-engine)

## 在蓝图中转换颜色

此页面将介绍如何使用 **蓝图（Blueprints）** 应用颜色转换。

[](/documentation/zh-cn/unreal-engine/converting-colors-in-unreal-engine-blueprints)

[![在蓝图中转换颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85aae307-9144-48a2-988c-4263970fdd79/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/converting-colors-in-unreal-engine-blueprints)

[在蓝图中转换颜色](/documentation/zh-cn/unreal-engine/converting-colors-in-unreal-engine-blueprints)

[在虚幻引擎中将蓝图与OpenColorIO搭配使用来应用颜色变换](/documentation/zh-cn/unreal-engine/converting-colors-in-unreal-engine-blueprints)

## 在nDisplay中转换颜色

[nDisplay](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine)支持将OCIO颜色转换应用于整个群集、内部视锥体或单个群集节点的nDisplay渲染。这对于管理特定显示器的颜色空间非常有用。此页面将介绍如何将OCIO与nDisplay结合使用。

[](/documentation/zh-cn/unreal-engine/color-management-in-ndisplay-in-unreal-engine)

[![nDisplay中的颜色管理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39240ca6-da1a-44bf-8c9b-95bf05c5ecb9/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/color-management-in-ndisplay-in-unreal-engine)

[nDisplay中的颜色管理](/documentation/zh-cn/unreal-engine/color-management-in-ndisplay-in-unreal-engine)

[使用nDisplay的颜色管理工具。](/documentation/zh-cn/unreal-engine/color-management-in-ndisplay-in-unreal-engine)

## 在影片渲染队列中转换颜色

[影片渲染队列](/documentation/404)支持将OCIO颜色转换应用于媒体导出。此页将介绍如何在影片渲染队列中设置颜色转换。

[](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine)

[![图像设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1876e1dd-95fe-40d5-b5f2-9a01ddfce65b/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine)

[图像设置](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine)

[使用电影渲染队列的图像设置调整渲染的图片质量](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine)

## 在Composure中转换颜色

[Composure](/documentation/zh-cn/unreal-engine/real-time-compositing-with-composure-in-unreal-engine)支持将OCIO颜色转换应用于输入和输出媒体。此页面将介绍如何将颜色转换应用到Composure。

[](/documentation/zh-cn/unreal-engine/converting-colors-in-composure-with-opencolorio-in-unreal-engine)

[![在Composure中使用OpenColorIO转换颜色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14a50af9-47fc-482e-b398-51df5802a154/placeholder_topic.png)](/documentation/zh-cn/unreal-engine/converting-colors-in-composure-with-opencolorio-in-unreal-engine)

[在Composure中使用OpenColorIO转换颜色](/documentation/zh-cn/unreal-engine/converting-colors-in-composure-with-opencolorio-in-unreal-engine)

[在虚幻引擎中使用OpenColorIO将颜色变换应用至Composure元素和合成输出。](/documentation/zh-cn/unreal-engine/converting-colors-in-composure-with-opencolorio-in-unreal-engine)

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [快速入门](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine#%E5%BF%AB%E9%80%9F%E5%85%A5%E9%97%A8)
-   [在视口中转换颜色](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine#%E5%9C%A8%E8%A7%86%E5%8F%A3%E4%B8%AD%E8%BD%AC%E6%8D%A2%E9%A2%9C%E8%89%B2)
-   [在蓝图中转换颜色](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E8%BD%AC%E6%8D%A2%E9%A2%9C%E8%89%B2)
-   [在nDisplay中转换颜色](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine#%E5%9C%A8ndisplay%E4%B8%AD%E8%BD%AC%E6%8D%A2%E9%A2%9C%E8%89%B2)
-   [在影片渲染队列中转换颜色](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine#%E5%9C%A8%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E9%98%9F%E5%88%97%E4%B8%AD%E8%BD%AC%E6%8D%A2%E9%A2%9C%E8%89%B2)
-   [在Composure中转换颜色](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine#%E5%9C%A8composure%E4%B8%AD%E8%BD%AC%E6%8D%A2%E9%A2%9C%E8%89%B2)