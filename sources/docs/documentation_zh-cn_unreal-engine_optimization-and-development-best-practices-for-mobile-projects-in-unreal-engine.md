# 适用于移动设备的优化技巧和最佳开发实践 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:00:36.889Z

---

目录

![移动端的渲染优化技巧](https://dev.epicgames.com/community/api/documentation/image/da18426a-9321-4869-aa3b-f4b122fdc31e?resizing_type=fill&width=1920&height=335)

此页面提供有关如何优化移动设备性能，同时从移动HDR功能获取最佳保真度的指南和最佳实践。其中包括：

-   有关哪些因素会影响移动设备性能预算的信息
    
-   打包已启用移动HDR功能之项目的最佳实践
    
-   **虚幻引擎** 应用程序中性能瓶颈的测量工具演练
    

以下链接包含有关Android常规性能主题的实用信息：

-   [](https://developer.android.com/topic/performance/vitals/launch-time)
-   [](https://developer.android.com/topic/performance/vitals/render)

## 了解你的性能预算

应用程序的目标设备具有有限的可用资源，可以用于将对象保存在内存中，也可以用于处理对象。构建应用程序时，你必须决定将这些资源用于哪些地方。你应该自行了解设备在速度、线程、CPU和GPU带宽方面的能力，以及设备的内存、图形内存和可用磁盘空间。

你还应该对设备 *进行基准测试*，了解其运行方式以及哪里会遇到性能瓶颈。你可以在设备上运行要求苛刻的应用程序或技术演示，对设备进行基准测试，然后观察性能统计信息。

### 用于显示性能统计信息的控制台命令

你可以使用一系列 **控制台命令** 检查性能统计信息。要在移动设备上打开开发人员控制台，请同时用四根手指点击显示屏。此操作将打开屏幕键盘和提示，你可以输入控制台命令。

![The console window displayed in a mobile application with the onscreen keyboard.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ef3310f-8010-464c-8ca9-3cc5bd9ec92b/image_0.jpg)

移动端应用中的控制台界面。

控制台和四指点击命令仅在开发版本中提供。发行或测试版不可用。

你可以在控制台中输入命令以便在界面显示调试信息。以下表格包括提供性能信息的命令列表：

命令

说明

Stat GPU

显示GPU用于不同进程的时间（以毫秒为单位）。

某些运行Vulkan的设备可能支持stat GPU，但是大多数移动设备不直接支持。

Stat Unit

显示CPU用于不同进程的时间（以毫秒为单位）。还显示游戏线程、渲染线程和GPU时间。

Stat UnitGraph

显示一张图表，图中呈现一段时间内CPU和GPU利用率。这有助于识别峰值。

Stat TextureGroup

显示不同纹理池使用的内存量。

对于你可以用于分析应用程序设备性能的更多控制台命令，请参阅Stat Commands。

## 常见性能因素

现在你已了解在设备上查找性能数据的位置，此部分将让你熟悉通常最影响虚幻引擎移动渲染器性能的因素。了解哪个元素影响应用程序以及如何影响应用程序后，你可以快速识别问题，并使用虚幻引擎的诊断工具解决问题。

### 法线贴图和高顶点网格体

虚幻引擎的移动渲染器在渲染大量顶点上很高效，而移动渲染器上的高质量法线贴图可能存在位深度问题，并且性能成本高于高多边形模型。

在低端硬件上，法线贴图可以极大地提高模型表面上的反射和光照质量。但是，汽车车身面板等细微形状可能会超出通常用于这些贴图的8位增量，从而在最终渲染中产生可见的条带。

你可以使用16位法线贴图进行补偿，但是16位法线的像素成本超过了更高密度网格体的顶点成本。引擎中16位法线未压缩，这意味着大小也是常规法线贴图的八倍。

在下方示例中，我们使用没有法线贴图的高密度车身面板。目标锁定Galaxy Tab S6时，我们的车身面板可合并到约500,000个顶点。

![图像替换文本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34b0a77c-1d96-48ca-b6db-926e94cea04d/image_1.png)

### 高分辨率法线贴图最佳实践

将高分辨率顶点烘焙到低多边形模型的法线贴图的过程可能比较复杂，并且许多因素会使引擎内部的法线贴图纹理质量降低。用于烘焙法线贴图的工具集有很多，但是我们推荐使用 **XNormal**。Xnormal中的使用过程大致如下：

1.  在Xnormal中将法线贴图烘焙为带有4xAA的8k TIFF。
2.  将TIFF导入到photoshop中，然后将其缩减为1k纹理。
3.  应用值为0.35px的高斯模糊。
4.  将图像从16位转换为8位。
5.  将图像导出到24位TGA。
6.  将最终法线贴图导入虚幻。

为确保烘焙过程中使用的表面法线与引擎中呈现的法线相同，你应从虚幻内部导出已优化法线。将烘焙模型导入虚幻，选择创建自己的法线，然后从虚幻导出烘焙模型，在Xnormal中烘焙。这是创建高质量法线贴图时的重要步骤，因为Xnormal需要了解网格体的表面法线，以便应用高分辨率模型的偏移。

最后，有两个选项可以减少渲染 **静态网格物体** 时的伪像：

-   使全精度UV
    
-   使用高精度切线基础
    

**LOD** 下 **细节（Details）** 面板中的 **静态网格体编辑器** 提供这两种设置。

![图像替换文本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36bb7ff6-f385-45ee-a626-19224cfb0839/02_stmesheditor_lodprop.png)

### 绘制调用

绘制调用是指查找资产，发生在每一帧。你的应用程序使用的绘制调用次数，取决于场景中独特网格体的数量，以及每个网格体使用的独特材质ID数量。当前，大量的绘制调用是导致图形性能降低的最大原因，因此应尽可能减少。

例如，高度优化的汽车模型可能仅有五六个单独的网格体，并且其中每个组件可能仅具有一种材质。

优化场景中绘制调用的理想目标大致为Galaxy Tab S6上700次，低端硬件上少于500次。HMI项目倾向于使用非常独特或复杂的材质，Galaxy Tab S6上的理想目标是100次，最好是少于50次。

你可以通过控制台命令 **Stat RHI** 输出绘制调用次数。

请记住绘制调用次数将取决于你处于PIE模式还是在设备上。|

#### 减少网格体数量

要减少绘制调用，最简单的方式是减少场景中独特网格体的数量。你可以使用数字内容创建（DCC）工具集（如Maya、3DSMax或Blender），将尽可能多的对象整合到一个网格体中，然后导入虚幻。

#### 减少材质ID数量

要减少网格体中独特材质的数量，则有多种选择。

最简单的方法是使用 **物质绘制器（Substance Painter）** 等程序，将多种材质集成到同一纹理中。这样你就能够利用多种材质，而且都是非常简单的虚幻材质，然后将其用作具有简单纹理输入的 **材质实例** 的基础。此操作还能减少材质指令数，进一步提升性能。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fa844e0-09a6-4dc4-86de-fe6bfd185aaf/03_usingmatereialexample.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7fa844e0-09a6-4dc4-86de-fe6bfd185aaf/03_usingmatereialexample.png)

点击查看大图

第二种方法将 **遮罩** 用于更程序化的方案。材质可以表示表面的某些特征，例如颜色、粗糙度或金属质量。不用对网格体的不同部分使用单独的材质，你可以将遮罩用于网格体UV的单独部分，并对每个分段应用不同的设置。你可以使用黑白纹理创建基本遮罩，但是使用 **顶点颜色** 更加高效。

![Final Render](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0644e6e-89a2-479e-943a-4e529ec478f4/image_4.png)

![Vertex Color](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d000caa-a77e-49bd-93a4-3e461234512d/image_5.png)

Final Render

Vertex Color

在以下示例中，顶点颜色用于定义不同的材质类型，材质定义单独影响这些组成部分外观的参数。顶点颜色遮罩更加高效，分离更清晰，因为它不依赖纹理分辨率。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80961bc3-41c2-402f-83af-c4600120ed02/image_6.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80961bc3-41c2-402f-83af-c4600120ed02/image_6.png)

A material using vertex colors to separate different material types.

### 材质

**材质复杂度** 可能会提升渲染的像素成本。每个像素的指令越多，渲染计算最终值所需花的时间就越多。不透明材质的价格最实惠，但是基于着色模型或基础着色器代码，情况可能截然不同。

你可以在 **材质编辑器** 内的 **统计（Stats）** 窗口中找到有关材质指令数的读数。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/944b8896-f551-4abf-a11e-5524bfa429d6/07_materialeditorstats.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/944b8896-f551-4abf-a11e-5524bfa429d6/07_materialeditorstats.png)

统计窗口显示指令数。点击查看大图。

指令数也会根据材质中数学函数的数量而增加。节点越多，材质的渲染成本就越高。某些特定操作的成本也会较高。尽量限制在构建更复杂材质时的指令数。

**半透明** 和 **不透明** 材质属于成本最高的材质类型。单独的半透明层的每像素成本较高，当多个半透明层堆叠和渲染时，成本要高得多。这称为 **过度绘制**。

车辆的前灯和尾灯是透明度问题区域的典型示例。在很多情况下，我们使用手绘纹理贴图降低材质复杂性。即使纹理平坦，也可以很好地表明复杂的形状和深度。

![图像替换文本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9481aef9-dca1-4587-ab13-bf455ba18771/image_8.png)

### 优化纹理分辨率

高分辨率纹理需要大量存储空间，无论是在设备上还是在设备的纹理内存中，而较大的纹理则需要更多像素才能进行渲染和处理。虽然高分辨率纹理可以提高保真度，但考虑到设备的屏幕分辨率和纹理的视角，纹理大小带来的收益会减少。使用尽可能小的纹理获取所需的保真度至关重要。

要确定纹理需求，首先要确定 **摄像机位置** 和查看模型的 **视场（FOV）**。这将有助于确定所有网格体和材质的界面空间。

确定摄像机位置后，你可以使用特殊的调试纹理确定用于各种材质的纹理分辨率。此纹理使用 **mipmap** 行为确定不同组件需要的分辨率，在每个mipmap中应用不同颜色。这样你可以很轻松地识别出材质正在使用哪个mip，以及应该使用哪种纹理分辨率。

将随附的纹理插入无光照材质的自发光信道，然后将该材质应用于你的网格体。从合适摄像机距离查看网格体时，颜色编码将指示引擎用于渲染的mip级别。观察到的最高级别应该是法线和环境光遮蔽贴图的原生纹理大小。

![图像替换文本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6521772e-af69-499a-a063-bac5eba74e58/image_9.png)

## 打包尺寸和启动时间

在打包应用程序及其资产时，需要在磁盘上的包大小与运行时启动性能之间权衡。

启用 **Zlib压缩** 时，应用程序的包会更小。然而，这需要更多的CPU时间加载应用程序，可能会减慢启动速度。为优化启动时间，你可以禁用压缩。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ea32c0a-5bec-480a-a2fb-eda4f70dc86b/10_zlibcompressionprojectsettings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ea32c0a-5bec-480a-a2fb-eda4f70dc86b/10_zlibcompressionprojectsettings.png)

你可以在 "项目设置（Project Settings）" > "打包（Packaging）" 中找到 Zlib 压缩设置。点击查看大图。

### 推荐的流送设置

`DefaultEngine.ini` 中推荐了以下流送设置。这样在应用程序启动时为异步加载资产提供了更多时间，可以改善启动时间。

```cpp
	[/Script/Engine.StreamingSettings]
	s.PriorityAsyncLoadingExtraTime=275.0
	s.LevelStreamingActorsUpdateTimeLimit=250.0
	s.PriorityLevelStreamingActorsUpdateExtraTime=250.0
```

### 推荐的打包设置

`DefaultEngine.ini` 中推荐了以下打包设置。这些设置减少了打包资产时使用的压缩量，因为启动时未压缩.pak文件的加载速度明显快于ZLib压缩文件。

```cpp
	[/Script/UnrealEd.ProjectPackagingSettings]
	bCompressed=False
	BuildConfiguration=PPBC_Development
	bShareMaterialShaderCode=True
	bSharedMaterialNativeLibraries=True
	bSkipEditorContent=True
```

## 分析磁盘上的包大小

虚幻引擎有多种实用工具，可以提供资产数据占用空间的深度信息。

### 大小贴图

**大小贴图** 可读取和对比编辑器中的相对资产内存消耗。必须启用 **AssetManagerEditor** 插件才能使用。之后，右键点击内容浏览器（Content Browser）中的文件夹，从上下文菜单中选择 **大小贴图（Size Map）**即可访问。

![图像替换文本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc44c4c9-8a95-46cc-a6ab-d6e2055293a3/11_sizemapopen.png)

大小贴图将显示带有图标的窗口，图标代表文件夹和文件占用的内存量。图标越大，文件消耗的空间越大。

![图像替换文本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e6f1e06-0907-4a93-96e1-422e9d1813ad/12_sizemapwindow.png)

有关使用大小贴图的更多信息，请参阅[烘焙和数据分块](/documentation/zh-cn/unreal-engine/cooking-content-and-creating-chunks-in-unreal-engine)。

大小贴图可读取编辑器中使用的资产空间大小。打包项目后，内存消耗会有所不同。这是因为在烘焙过程中会出现不同类型的压缩。一般来说，大小贴图代表资产可能占用的最大尺寸。

### 统计数据

**统计数据** 工具提供关于 **关卡** 中资产使用的更多详细信息。可以在 **窗口（Window）** 下拉菜单中找到。

![图像替换文本](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2d064b5-dbd5-46ac-8e55-54742caddd46/13_statisticopen.png)

此统计数据窗口将细分关卡文件中的资产数量，可以显示所有关卡，也可以仅显示特定关卡。**Primitive统计数据** 列出关于三角形数量、内存消耗和计数的信息。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/740a5d7a-7333-4e42-98e5-0b1965c2bfb4/14_statisticwindow.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/740a5d7a-7333-4e42-98e5-0b1965c2bfb4/14_statisticwindow.png)

正在显示图元数据的统计窗口。

此列表中显示的其他数据包括纹理使用和静态网格体光照信息。统计数据窗口的列表模式可以快速展示哪些资产消耗的内存最多。**烘焙器统计数据** 也很有帮助，因为其中列出了最后一个打包过程烘焙的所有资产。

### 内存报告

统计数据和大小贴图工具向你展示虚幻引擎中文件的数据占用空间，控制台命令 `Memreport -full` 可以用于安装在目标设备上启动的应用程序。这可以提供文件尺寸的详细且准确的信息，因为它们存在于设备压缩设置中。

应用程序在开发配置中构建并加载到设备后，你可以打开控制台窗口并输入命令。此内存快照保存在设备的项目目录中。目录通常为 `Game/[YourApp]/[YourApp]/Saved/Profiling/Memreports/`，但可能会有变化。

`.Memreport` 文件是可以在大多数文本编辑器中读取的文本文件。文本开头包含一些关于已分配内存和池尺寸的信息，而文本的大部分内容显示已加载关卡、RHI统计数据、渲染目标、场景信息等记录。所有此类信息都很有价值，因为它们代表完成烘焙和打包过程的实际数据。

如果你搜索 **列出所有纹理（Listing all textures）**这个短语，你将在应用程序中找到每种纹理的列表，以及关于纹理类型、分组、尺寸和内存空间的详细信息。列表按内存大小排序，首先显示较大的纹理。这个方法可以快速简便地找出什么纹理消耗内存最多。

## 分析启动时间

影响启动时间的因素包括以下内容：

-   加载和解压初始资产所需的时间
    
-   应用程序的总尺寸
    
-   需要在用户的安装中激活的任何插件
    
-   需要解析的字符串数量
    
-   用户设备上的任何内存分配或分片
    

有数种不同的工具可用于分析应用程序的启动时间，但最推荐使用的是 **Unreal Insights**，因为它可以远程分析目标设备的性能数据。有关此工具集的完整信息，请参阅[Unreal Insights分段](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [mobile hdr](https://dev.epicgames.com/community/search?query=mobile%20hdr)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [了解你的性能预算](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E4%BA%86%E8%A7%A3%E4%BD%A0%E7%9A%84%E6%80%A7%E8%83%BD%E9%A2%84%E7%AE%97)
-   [用于显示性能统计信息的控制台命令](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E7%94%A8%E4%BA%8E%E6%98%BE%E7%A4%BA%E6%80%A7%E8%83%BD%E7%BB%9F%E8%AE%A1%E4%BF%A1%E6%81%AF%E7%9A%84%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%91%BD%E4%BB%A4)
-   [常见性能因素](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E5%B8%B8%E8%A7%81%E6%80%A7%E8%83%BD%E5%9B%A0%E7%B4%A0)
-   [法线贴图和高顶点网格体](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E6%B3%95%E7%BA%BF%E8%B4%B4%E5%9B%BE%E5%92%8C%E9%AB%98%E9%A1%B6%E7%82%B9%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [高分辨率法线贴图最佳实践](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E9%AB%98%E5%88%86%E8%BE%A8%E7%8E%87%E6%B3%95%E7%BA%BF%E8%B4%B4%E5%9B%BE%E6%9C%80%E4%BD%B3%E5%AE%9E%E8%B7%B5)
-   [绘制调用](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E7%BB%98%E5%88%B6%E8%B0%83%E7%94%A8)
-   [减少网格体数量](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E5%87%8F%E5%B0%91%E7%BD%91%E6%A0%BC%E4%BD%93%E6%95%B0%E9%87%8F)
-   [减少材质ID数量](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E5%87%8F%E5%B0%91%E6%9D%90%E8%B4%A8id%E6%95%B0%E9%87%8F)
-   [材质](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E6%9D%90%E8%B4%A8)
-   [优化纹理分辨率](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E4%BC%98%E5%8C%96%E7%BA%B9%E7%90%86%E5%88%86%E8%BE%A8%E7%8E%87)
-   [打包尺寸和启动时间](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E6%89%93%E5%8C%85%E5%B0%BA%E5%AF%B8%E5%92%8C%E5%90%AF%E5%8A%A8%E6%97%B6%E9%97%B4)
-   [推荐的流送设置](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E6%8E%A8%E8%8D%90%E7%9A%84%E6%B5%81%E9%80%81%E8%AE%BE%E7%BD%AE)
-   [推荐的打包设置](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E6%8E%A8%E8%8D%90%E7%9A%84%E6%89%93%E5%8C%85%E8%AE%BE%E7%BD%AE)
-   [分析磁盘上的包大小](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E5%88%86%E6%9E%90%E7%A3%81%E7%9B%98%E4%B8%8A%E7%9A%84%E5%8C%85%E5%A4%A7%E5%B0%8F)
-   [大小贴图](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E5%A4%A7%E5%B0%8F%E8%B4%B4%E5%9B%BE)
-   [统计数据](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E7%BB%9F%E8%AE%A1%E6%95%B0%E6%8D%AE)
-   [内存报告](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E5%86%85%E5%AD%98%E6%8A%A5%E5%91%8A)
-   [分析启动时间](/documentation/zh-cn/unreal-engine/optimization-and-development-best-practices-for-mobile-projects-in-unreal-engine#%E5%88%86%E6%9E%90%E5%90%AF%E5%8A%A8%E6%97%B6%E9%97%B4)