# 虚幻引擎过场动画几何体缓存轨道 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-geometry-cache-track-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:46.760Z

---

目录

![几何体缓存轨道](https://dev.epicgames.com/community/api/documentation/image/6564eb50-d3ba-42c1-b6e9-45251eafe615?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

**几何体缓存轨迹（Geometry Cache Track）** 使您可以拉动播放 **几何体缓存** 并以帧精度将其渲染出来。将Alembic文件导入虚幻引擎并添加到关卡后，可以将其添加到 **关卡序列** 并添加 **几何体缓存轨迹** 来播放内容。

## 步骤

在本操作指南中，我们使用 **蓝图第三人称** 模板项目。您还需要一个Alembic文件来导入到引擎中。如果您没有自己的资源，下载该[样本文件](https://epicgames.box.com/s/l74nagy14ttaium5j41gu61ljz4v5rul)。

1.  将Alembic文件作为[几何体缓存](/documentation/zh-cn/unreal-engine/alembic-file-importer-in-unreal-engine#%E5%AF%BC%E5%85%A5%E4%B8%BA%E5%87%A0%E4%BD%95%E4%BD%93%E7%BC%93%E5%AD%98)导入虚幻引擎，并定义您所需的设置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcd8fc54-b837-46c9-b653-5cb4784c81e0/usinggeometrycache_importwindow.png "UsingGeometryCache_ImportWindow.png")
2.  将 **几何体缓存** 放入关卡，然后创建 **关卡序列**，并使用 **添加轨迹（+ Track）** 按钮将其添加到 **Sequencer**。 
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71754f9a-f074-4833-9595-a30e7bff71f8/geocache_02.png "GeoCache_02.png")
3.  单击新建轨迹的 **添加轨迹（+ Track）** 按钮，然后从 **轨迹（Tracks）** 菜单中选择 **几何体缓存（Geometry Cache）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ef6f063-a9c9-4c66-a584-a0d72f1b1782/geocache_03.png "GeoCache_03.png")
4.  拉动 **时间轴（Timeline）** 以查看播放效果。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2ad6cca8-0343-4315-8bb3-75ce36eeede1/geometrycache_example.png "GeometryCache_Example.png")
    
    在关卡中选择"播放"（Play）之前，还可以将 **关卡序列** 设置为 **自动播放（Auto Play）**。
    

## 最终结果

设置 **几何体缓存轨道** 后，可以拉动播放内容，内容也会在关卡序列播放时自动播放。 

在 **轨迹（Tracks）窗口** 中右键单击轨迹，可以访问几何体缓存的属性。从属性菜单，更改当前使用的 **几何体缓存** 资源，添加 **起点偏移（Start Offset）** 或 **终点偏移** **（End Offset）**，或者调整 **播放速度（Play Rate）**。现在有调整 **分段（Section）** 本身的选项以及是否在 **反向（Reverse）** 播放动画。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6997ed14-f51a-4069-ad58-914f5d88b195/geocache_04.png "GeoCache_04.png")

右键单击快捷菜单中的 **属性（Properties）** 下面，提供几何体缓存轨迹的下列属性： 

  

属性

说明

**几何体缓存（Geometry Cache）**

指定要播放的几何体缓存资源。

**起点偏移（Start Offset）**

动画剪辑起始位置的偏移帧数。

**终点偏移（End Offset）**

动画剪辑终点位置的偏移帧数。

**播放速度（Play Rate）**

定义动画剪辑的播放速度（小值降速，大值加速）。

-   [landing page](https://dev.epicgames.com/community/search?query=landing%20page)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [alembic](https://dev.epicgames.com/community/search?query=alembic)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [geometry cache](https://dev.epicgames.com/community/search?query=geometry%20cache)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/cinematic-geometry-cache-track-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/cinematic-geometry-cache-track-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)