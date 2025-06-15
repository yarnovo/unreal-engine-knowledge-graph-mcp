# 虚幻引擎中的全屏动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:13:36.327Z

---

目录

![图像板](https://dev.epicgames.com/community/api/documentation/image/98ffdafa-a56c-4b59-bf7d-9d9f2540f46d?resizing_type=fill&width=1920&height=335)

**图像板Actor（Image Plate Actor）** 支持从连接到 **[过场动画摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)** 视锥体的板播放电影和图像序列。你可以使用这些图像板播放全屏视频和图像序列，还可以将前景元素包含在摄像机的视角中。

#### 先决条件

-   使用前，必须启用图像板。在虚幻引擎菜单中，找到 **编辑（Edit）> 插件（Plugins）**，在 **渲染（Rendering）** 分段中找到 **图像板（Image Plate）** ，并启用它。你可能需要重启编辑器，此更改才能生效。
    
    ![图像板插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9755e381-729b-4101-82bb-1e53a415217d/plugin.png)
    
-   你熟悉 **[如何设置用于播放的视频资产](/documentation/zh-cn/unreal-engine/play-a-video-file-in-unreal-engine)** ，或 **[如何设置用于播放的图像序列](/documentation/zh-cn/unreal-engine/play-an-image-sequence-in-unreal-engine)** 。
-   你熟悉 **[媒体轨道](/documentation/zh-cn/unreal-engine/cinematic-movie-media-track-in-unreal-engine)** 的用法。
-   你熟悉 **[](/documentation/404)**的基本知识。
-   你已了解 **[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)** 及其 **[界面](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)** 。

## 创建

要完全设置图像板Actor，你需要将 **[过场动画摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)** 和 **图像板Actor** 添加到关卡，然后将板附加到过场动画摄像机Actor。

首先，找到 **[放置Actor](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)** 面板中的 **过场动画（Cinematic）** 选项卡，将过场动画摄像机Actor添加到你的关卡，然后找到 **过场动画摄像机Actor（Cine Camera Actor）** 。将其从面板拖到你的视口中。

![创建过场动画摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f39d6df-434c-47e9-bd39-fcf21a895c04/createcam.png)

然后，从 **放置Actor（Place Actors）** 面板拖动 **图像板（Image Plate）** ，将其添加到你的关卡。

![创建图像板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a30ec377-10c8-4d7a-939a-ec432520f678/createplate.png)

将两个Actor添加到你的关卡后，将板拖到 **[大纲视图](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine)** 面板中的摄像机上，即可将其附加到摄像机。完成后，图像板将对齐到摄像机的正面，并调整大小以拟合其视锥体。

![将图像板附加到摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f5d9e5b-f180-4a6a-af95-8f43effcbf35/attachplate.gif)

## 行为

默认情况下，图像板会自动调整其大小以拟合过场动画摄影机Actor的[**传感器维度**](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine#%E5%B1%9E%E6%80%A7)，确保它始终完全在摄影机的视野中。

![图像板传感器尺寸](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea1ab2d1-ca5e-4256-b03f-603803170346/sensorsize.gif)

你还可以将板向靠近和远离摄像机的方向移动，以便控制板和摄像机之间的间距。此间距将使更多的前景元素包含在摄像机的视野中。该板还将动态调整其比例，确保其在视野中完全可见。

![移动图像板前景](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84e55f19-f8e6-4a5a-b17f-334fe3faf865/moveplate.gif)

**导航** 摄像机时，图像板将填满屏幕并拉伸，以便符合摄像机的纵横比。你还需要调整摄像机的对焦距离以匹配板距离，从而确保其保持对焦。

![图像板视口视图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54cbddf5-522c-429e-baca-bc9d2703e73c/pilotview.png)

### 属性

选择图像板Actor将在细节（Details）面板中显示其细节。

![图像板细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4410de9a-2c40-4095-ae4c-da590fb51af1/properties.png)

**填充屏幕（Fill Screen）** 属性支持自动调整板尺寸以拟合摄像机的全视图。禁用此功能后，你可以改为使用 **固定尺寸（Fixed Size）** 属性，以手动设置板的尺寸。

![图像板填充屏幕](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5a413f6-b63f-485b-bca0-48140bd638eb/fillscreen.png)

如果启用了 **填充屏幕（Fill Screen）**，那么你可以使用 **填充屏幕量（Fill Screen Amount）** 属性，将板的尺寸以屏幕的百分比偏移。**X** 控制屏幕 **宽度** 的百分比，**Y** 控制 **高度** 。

![图像板屏幕空间大小](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d671b9bc-e4fd-4a40-9309-9b1b05408f3f/fillamount.png)

### 材质

展开 **图像板细节（Image Plate Details）** 的高级分段，将显示其 **[材质](/documentation/404)** 属性。你可以在此处调整默认材质或纹理。

![图像板材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a88edf32-bfd1-444b-856c-6ef21ba1e6b4/materialproperties.png)

## 材质设置

无论你是在板上显示图像序列还是视频，都需要创建引用了 **媒体纹理（Media Texture）** 的新 **材质（Material）** 。媒体纹理还必须引用 **媒体播放器（Media Player）** 。

### 媒体纹理和播放器

首先，单击 **[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)** 中的 **添加/导出（Add/Import）**，找到 **媒体（Media）** 类别，然后选择 **媒体播放器（Media Player）** 资产，创建 **媒体播放器（Media Player）**。选择后，将出现一个对话窗口。确保启用了 **视频输出MediaTexture资产（Video output MediaTexture asset）**，然后单击 **确定（OK）**。

![创建媒体播放器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f14fedb-d22f-4f90-b132-929627d970eb/createmediaplayer.png)

此操作将确保创建并链接 **媒体纹理（Media Texture）** 和 **媒体播放器（Media Player）** 。

![媒体纹理链接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14fe4811-07cc-464a-a320-1a8923062181/mediatexture.png)

### 材质图表

在内容浏览器中单击添加/导入（Add/Import）并选择 **材质（Material）** ，创建新的 **材质（Material）** 资产。创建并打开资产后，将 **着色模型（Shading Model）** 设置为 **无光照（Unlit）**，并在其细节中启用 **双面（Two Sided）** 属性。此操作是为了使图像板不受关卡中光照的影响。

![图像板材质无光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5bf74ff7-ea00-4fa9-b176-94910091cd0d/materialsetup.png)

将 **媒体纹理（Media Texture）** 资产拖到材质图表中，并将其 **RGB** 引脚连接到材质的 **自发光颜色（Emissive Color）** 输入引脚。

![图像板媒体纹理材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c5f4d8a-0ec0-4387-bee8-79b380cf3bee/materialgraph.png)

最后，你需要将媒体材质指定给图像板Actor的 **材质（Material）** 属性。

![图像板指定材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48333b5d-c4b1-4c28-9ae9-c288c48c1e59/assignmaterial.png)

## 播放

视频和图像序列可以通过Sequencer的 **[媒体轨道](/documentation/zh-cn/unreal-engine/cinematic-movie-media-track-in-unreal-engine)** 在图像板上播放。

### 媒体轨道设置

首先创建新的关卡序列，然后单击 **+轨道（+ Track）** 并选择 **媒体轨道（Media Track）** 。

![图像板媒体轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4977fa34-1ab5-4768-aaea-a2c8accb2c8c/createmedia.png)

然后，单击 **+媒体（+ Media）** 并选择源，选择要播放的 **文件媒体源（File Media Source）**（用于视频）或 **图像媒体源**（用于图像序列）资产。如果你没有这些资产之一，请参阅 **[视频](/documentation/zh-cn/unreal-engine/play-a-video-file-in-unreal-engine)** 或 **[图像](/documentation/zh-cn/unreal-engine/play-an-image-sequence-in-unreal-engine)** 播放文档中的设置说明。

![媒体轨道和媒体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/515ad9ce-830a-4e8d-b1ca-221bb68cb765/mediaselector.png)

右键点击媒体分段，找到其属性类别，然后将你的媒体纹理指定到 **媒体纹理（Media Texture）** 属性。

![指定媒体纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a44da9d8-9a5b-43c8-bdde-d3bcb6e7259b/assignmediatex.png)

### 示例

完成后，你将能够播放序列并预览图像板上显示的视频或图像序列。

![图像板视频](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65a3b716-d375-4a35-ace4-fe6c1bd85b35/videoexample.gif)

视频示例

![图像板图像序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/abd170f9-c2c8-464c-bfd9-b8b806330147/imagesequenceexample.gif)

图像序列示例

-   [cameras](https://dev.epicgames.com/community/search?query=cameras)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [media framework](https://dev.epicgames.com/community/search?query=media%20framework)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E5%88%9B%E5%BB%BA)
-   [行为](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E8%A1%8C%E4%B8%BA)
-   [属性](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E5%B1%9E%E6%80%A7)
-   [材质](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E6%9D%90%E8%B4%A8)
-   [材质设置](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E6%9D%90%E8%B4%A8%E8%AE%BE%E7%BD%AE)
-   [媒体纹理和播放器](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E5%AA%92%E4%BD%93%E7%BA%B9%E7%90%86%E5%92%8C%E6%92%AD%E6%94%BE%E5%99%A8)
-   [材质图表](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E6%9D%90%E8%B4%A8%E5%9B%BE%E8%A1%A8)
-   [播放](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E6%92%AD%E6%94%BE)
-   [媒体轨道设置](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E5%AA%92%E4%BD%93%E8%BD%A8%E9%81%93%E8%AE%BE%E7%BD%AE)
-   [示例](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine#%E7%A4%BA%E4%BE%8B)