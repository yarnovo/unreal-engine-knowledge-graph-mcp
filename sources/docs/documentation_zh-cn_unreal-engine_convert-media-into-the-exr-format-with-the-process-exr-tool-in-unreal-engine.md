# 使用虚幻引擎中的处理EXR工具将媒体转换为EXR格式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/convert-media-into-the-exr-format-with-the-process-exr-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:24:16.712Z

---

目录

![将媒体转换为EXR格式](https://dev.epicgames.com/community/api/documentation/image/34de5a62-4ea7-4b26-9459-7639ab82e35e?resizing_type=fill&width=1920&height=335)

![处理EXR窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65fd2c2f-ade2-40fa-ae0a-10e0e25f8726/process-exr-window.png)

对于EXR视频和序列，虚幻引擎支持EXR图块和mip。当你使用[媒体板Actor](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine)来播放你的EXR序列时，Actor的球体和平面网格体会自动优化性能，在给定时间只流动对摄像机可见的图块，并为这些图块选择合适的mip级别。这项技术与群集渲染兼容，因此对于给定显示量，PC数量越多，每台PC的性能改善幅度就越大。

通过使用处理EXR（Process EXR）工具，你可以将现有经纬度360视频和2D板转换为EXR格式。该工具会将EXR图像划分成多个小块区域，这些区域由内含mip的图块组成。

要将媒体源转换为虚幻引擎EXR格式：

-   转到 **内容浏览器（Content Browser）** > **ImgMedia** > **处理EXR（Process EXR）** 。此操作会打开处理EXR（Process EXR）窗口，你可以在其中配置自己的 `.exr` 文件。

如果你想在虚幻引擎之外转换自己的媒体，可以使用离线工具oiiotool。如果你想使用该工具，必须禁用压缩。以下命令行是转换媒体的示例： `oiiotool source.exr --ch R,G,B --compression none --tile 256 256 -otex result.exr`

## 处理EXR窗口

处理EXR（Process EXR）窗口包含以下可供你配置的选项：

### 序列

属性

说明

输入路径（Input Path）

你想转换为EXR格式的文件的源文件夹。

输出路径（Output Path）

你想用来存储转换后的 `.exr` 文件的目标文件夹。

启用mip映射（Enable Mip Mapping）

启用EXR图块mipmap链的计算和处理。默认情况下启用。

### 图块

属性

说明

启用平铺（Enable Tiling）

在可以确定网格细分处启用图块拆分。默认情况下启用。

当你设置图块和mip的数量时，有一个潜在的取舍：如果你的微小图块过多，你的计算成本会增加。如果你的图块过大，流送成本会增加。默认值为256。

X轴图块大小（Tile Size X）

沿X轴的每个图块的大小。

Y轴图块大小（Tile Size Y）

沿Y轴的每个图块的大小。

X轴图块数量（Num Tiles X）

X轴上的图块数量。

Y轴图块数量（Num Tiles Y）

Y轴上的图块数量。

### 处理

属性

说明

线程数量（Num Threads）

指定你的系统中将使用的并发进程线程的数量。

使用播放器（Use Player）

使用播放器进行解码。此属性上限为每帧1个图像。

对于大型图像，这是速度更快的选项。对于较小图像，上限会使它成为速度较慢的选项。

|

### 调试

属性

说明

启用mip级别色调（Enable Mip Level Tint）

将mipmap着色烘焙到 `.exr` 文件中，以用于调试目的。

Mip级别色调（Mip Level Tints）

选择你想烘焙到mip中的色调。

-   [exr media](https://dev.epicgames.com/community/search?query=exr%20media)
-   [convert images to exr](https://dev.epicgames.com/community/search?query=convert%20images%20to%20exr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [处理EXR窗口](/documentation/zh-cn/unreal-engine/convert-media-into-the-exr-format-with-the-process-exr-tool-in-unreal-engine#%E5%A4%84%E7%90%86exr%E7%AA%97%E5%8F%A3)
-   [序列](/documentation/zh-cn/unreal-engine/convert-media-into-the-exr-format-with-the-process-exr-tool-in-unreal-engine#%E5%BA%8F%E5%88%97)
-   [图块](/documentation/zh-cn/unreal-engine/convert-media-into-the-exr-format-with-the-process-exr-tool-in-unreal-engine#%E5%9B%BE%E5%9D%97)
-   [处理](/documentation/zh-cn/unreal-engine/convert-media-into-the-exr-format-with-the-process-exr-tool-in-unreal-engine#%E5%A4%84%E7%90%86)
-   [调试](/documentation/zh-cn/unreal-engine/convert-media-into-the-exr-format-with-the-process-exr-tool-in-unreal-engine#%E8%B0%83%E8%AF%95)