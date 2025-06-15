# Old Render Movie in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:38.674Z

---

目录

![渲染电影设置](https://dev.epicgames.com/community/api/documentation/image/88778441-059e-4d95-8751-3f0d8620e7bf?resizing_type=fill&width=1920&height=335)

学习使用此**Deprecated**功能，但在发布产品中需要谨慎使用。

借助Sequencer，你可以视频或图像格式渲染过场动画。你可以将场景渲染为可与他人共享的AVI视频格式，或者以BMP、EXR、JPG或PNG文件格式渲染图像。你也可以执行"自定义渲染通道（Custom Render Passes）"来渲染"底色（Base Color）"、场景深度（Scene Depth）、"次表面颜色（Subsurface Color）"等。 

渲染过场动画时，有多个 **渲染电影设置（Render Movie Settings）** 可供你用来定义内容的渲染方式。本页面介绍如何访问"渲染电影设置（Render Movie Settings）"以及在此过程中可供你使用的选项。 

## "渲染电影"选项

要访问 **渲染电影设置（Render Movie Settings）** 并渲染过场动画，首先在序列中单击 **渲染电影（Render Movie）** 选项。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1bcec79-ff06-42fd-904a-aa9b4d4ec163/rendermoviebutton.png "RenderMovieButton.png")

单击此选项之后，**渲染电影设置（Render Movie Settings）** 窗口将打开，你可以在此窗口中定义过场动画的渲染方式。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f082c837-8312-4668-a9a8-bca6ebe55a1f/moviesettingswindow.png "MovieSettingsWindow.png")

单击 **采集电影（Capture Movie）** 按钮之后，你就可以期望的 **图像输出格式（Image Output Format）** 开启渲染过程。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e258903e-6541-4d6e-8367-f9ed45bc7622/renderprocess.png "RenderProcess.png")

你将在编辑器的右下角看到 **正在采集（Capturing）** 状态消息，以及随着内容渲染在整个内容上向前移动的 **电影渲染 - 预览（Movie Render - Preview）**。渲染完成后，你会在编辑器右下角看到 **采集完成（Capture Finished）** 状态消息。单击此状态消息中的 **打开采集文件夹（Open Capture Folder）** 选项来打开你定义为渲染保存位置的文件位置。 

有关渲染电影的逐步示例，请参阅[渲染影片](/documentation/zh-cn/unreal-engine/rendering-out-cinematic-movies-in-unreal-engine)。

## 采集设置

**采集设置（Capture Settings）** 部分是你定义"图像输出格式（Image Output Format）"及"音频输出格式（Audio Output Format）"、"帧率（Frame Rate）"、"分辨率（Resolution）"以及是否应用"烧入（Burn In）"的地方。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff4bb0d0-0675-457f-8d1c-84f8d59cc5a7/capturesettingssection.png "Capture Settings Section")

属性

说明

**图像输出格式（Image Output Format）**

用于图像数据的采集协议类型。你可以渲染 [自定义渲染通道（Custom Render Passes）](/documentation/404)、**图像序列（Image Sequences）**（BMP、EXR、JPG、PNG）或 **视频序列（Video Sequence）**（AVI）。

**音频输出格式（Audio Output Format）**

用于音频数据的采集协议类型。

**帧率（Frame Rate）**

执行采集的帧率。

**分辨率（Resolution）**

执行采集的分辨率。

**使用烧入（Use Burn In）**

是否向采集[应用"烧入（Burn In）"](/documentation/zh-cn/unreal-engine/applying-burn-ins-to-your-movie-in-unreal-engine)内容（例如，场景数据、时间码和镜次号）。

**启用纹理流送（Enable Texture Streaming）**

采集时是否应启用纹理流送（Texture Streaming）。

关闭纹理流送（Texture Streaming）可能会导致使用的内存剧增，但是也将降低采集的视频中出现模糊纹理的概率。

### 音频输出格式

由于依赖试验性的"混音器（Audio Mixer）"功能，在渲染过程中导出音频这一功能目前为试验性功能。

**音频输出格式（Audio Output Format）** 使用试验性的音频采集实现，该实现从Master Submix（@@@）采集最终输出。这要求使用新"混音器（Audio Mixer）"（通过命令行参数`-audiomixer`启动），而且要求序列能够实时播放（禁用渲染时）。如果序列求值卡顿，音频将变得不同步，因为实时的时间流逝（平台时间）要多于序列本身。

选择使用此试验性的音频烘焙功能渲染过场动画时，将执行单独的通道，专门用于采集音频。采集音频时，预览窗口中不会显示视频。

## 视频设置

选择渲染"视频序列（Video Sequence）"时，可用的 **视频设置（Video Settings）** 属性包括以下这些。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b36240cb-11e7-43c4-8d98-214d84000256/videosettings.png "VideoSettings.png")

属性

说明

**使用压缩（Use Compression）**

渲染未压缩的视频还是应用压缩以缩小文件大小。

**压缩质量（Compression Quality）**

要应用的压缩级别，介于1（质量最差，压缩比最大）和100（质量最好，压缩比最小）之间。

**视频编码解码器（Video Codec）**

使你能够指定渲染过场动画时使用的特定视频编码解码器。

## 合成图选项

将 **自定义渲染通道（Custom Render Passes）** 作为 **图像输出格式（Image Output Format）** 时的可用选项如下。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54ebcefb-6089-4f19-84c0-b0bd59acf674/compositiongraphoptions.png "CompositionGraphOptions.png")

属性

说明

**包含渲染通道（Include Render Passes）**

要包含在采集中的渲染通道列表。将此字段保留为空将导出所有可用通道。

**以HDR格式采集帧（Capture Frames in HDR）**

是否以HDR纹理格式（\*.exr格式）采集帧。

**HDR压缩质量（HDRCompression Quality）**

当启用 **以HDR格式采集帧（Capture Frames in HDR）** 时HDR帧的压缩质量（0代表不压缩，1代表默认压缩（可能会很慢））*\*\**。

**采集色域（Capture Gamut）**

存储HDR采集数据而且启用 **以HDR格式采集帧（Capture Frames in HDR）** 时使用的颜色色域。 

色域取决于 **HDR压缩质量（HDRCompression Quality）** 是否启用。

**材质后期处理（Post Processing Material）**

是否将自定义[材质后期处理](/documentation/zh-cn/unreal-engine/post-process-materials-in-unreal-engine)用于渲染。

**禁用屏幕百分比（Disable Screen Percentage）**

是否在渲染过程中禁用[屏幕百分比](/documentation/zh-cn/unreal-engine/screen-percentage-with-temporal-upscale-in-unreal-engine)。

### 包含渲染通道

渲染"自定义渲染通道（Custom Render Passes）"时，你可以渲染所有可用通道或者选择要渲染的通道。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5295b340-4eff-4ad0-b495-67d8ee2d3429/includerenderpasses.png "IncludeRenderPasses.png")

你可以为渲染添加多个通道，每个通道都将在菜单中显示。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4589c192-2c39-47a8-aba3-d7261683eb61/addedrenderpasses.png "AddedRenderPasses.png")

单击 **减号（−）** 可移除任何之前添加的通道。 

## 图像设置

当以 **图像输出格式（Image Output Format）** 渲染 **图像序列** 时，**图像设置（Image Settings）** 将变得可用。 

**图像序列（EXR）**

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f0d3e31-f387-4196-b9ae-8139fa8fe3e7/imagesettings_exr.png "ImageSettings_EXR.png")

属性

说明

**压缩（Compressed）**

写出压缩还是未压缩的EXR。

**采集色域（Capture Gamut）**

存储HDR采集的数据时使用的颜色色域。

**图像序列**（**JPG** 或 **PNG**）

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07de1173-c4b1-4a1b-97cf-287012aa5226/imagecompressiononly.png "ImageCompressionOnly.png")

属性

说明

**压缩质量（Compression Quality）**

要应用给图像的压缩级别，介于1（质量最差，压缩比最大）和100（质量最好，压缩比最小）之间。

## "通用"设置

无论渲染输出的类型为何，以下选项都可用（位于 **通用（General）** 部分下）。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/344ac616-d250-4e0a-b996-af619e8ec7d2/generalsettings-1-1.png "GeneralSettings-1-1.png")

属性

说明

**输出目录（Output Directory）**

将采集的文件输出至其中的目录。

**文件名格式（Filename Format）**

用于采集的文件的文件名的格式。将自动添加扩展名。都将使用相应的数值替换掉任何格式为{token}的令牌。

**游戏模式覆盖（Game Mode Override）**

要覆盖地图的默认游戏模式的"可选游戏模式（Optional Game Mode）"。如果游戏的常规模式显示你不希望采集的UI元素或者加载屏幕，这个属性非常有用。

**覆盖现有（Overwrite Existing）**

是否覆盖现有文件。

**使用相对帧号（Use Relative Frame Numbers）**

输出文件中的帧号是否应相对于零，而非原始动画内容中的实际帧号。

**零填充帧号（Zero Pad Frame Numbers）**

在文件名上要用零填充帧号的位数（如果为4，则填充在文件名前的为0000）。

**使用单独进程（Use Separate Process）**

是否在单独进程中采集电影，如是，将打开一个单独的编辑器版本来处理采集。

**采集开始时关闭编辑器（Close Editor when Capture Starts）**

启用时，编辑器将在采集开始时关闭。

要使用此选项，**使用单独进程（Use Separate Process）** 必须处于启用状态。

**附加命令行参数（Additional Command Line Arguments）**

采集时传递给外部进程的附加命令行参数。 

要使用此选项，**使用单独进程（Use Separate Process）** 必须处于启用状态。

**继承的命令行参数（Inherited Command Line Arguments）**

从此进程继承的命令行参数。 

要使用此选项，**使用单独进程（Use Separate Process）** 必须处于启用状态。

### 文件名格式令牌

可以向 **文件名格式（Filename Format）** 选项添加下列令牌来处理文件的命名规范： 

令牌

说明

**{fps}**

采集的帧率。

**{frame}**

当前帧号（只与图像序列相关）。

**{width}**

采集的帧的宽度。

**{height}**

采集的帧的高度。

**{world}**

当前世界场景的名称。

**{quality}**

图像压缩质量设置。

**{material}**

材质/渲染通道。

**{shot}**

播放的关卡序列资产镜头的名称。

**{camera}**

当前摄像机的名称。

## "序列"设置

**序列（Sequence）** 部分为渲染过程提供以下选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc0d40f2-945e-41d5-b82d-d6598d5ab9b6/sequencesection.png "SequenceSection.png")

属性

说明

**写入编辑决策列表（Write Edit Decision List）**

如果序列包含镜头，是否写入编辑决策列表（EDL）。

请参阅 [导入和导出编辑决策列表](/documentation/zh-cn/unreal-engine/import-and-export-edl-in-unreal-engine) 页面获取更多信息。

**写入Final Cut Pro XML（Write Final Cut Pro XML）**

如果序列包含镜头，是否写入Final Cut Pro XML文件（XML）。

**处理帧（Handle Frames）**

要为每个镜头包含的"帧余量（Frame Handles）"。这些额外帧填充每个镜头，由EDL（或XML）文件插入和抠去，此类文件可在外部视频编辑软件包中用来调整镜头之间的切换。

## "过场动画"设置

可使用下列设置来定义采集时过场动画的播放方式。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bfdc34b0-30c2-4d58-87da-6b569cdd8057/cinematicsettings.png "CinematicSettings.png")

属性

说明

**过场动画引擎可延展性（Cinematic Engine Scalability）**

是否启用"过场动画引擎可延展性"设置。

**过场动画模式（Cinematic Mode）**

采集时是否启用"过场动画模式（Cinematic Mode）"。

**允许移动（Allow Movement）**

采集时是否允许播放器移动。

要求启用 **过场动画模式（Cinematic Mode）**。

**允许旋转（Allow Turning）**

采集时是否允许播放器旋转。 

要求启用 **过场动画模式（Cinematic Mode）**。

**显示播放器（Show Player）**

采集时是否显示本地播放器。 

要求启用 **过场动画模式（Cinematic Mode）**。

**显示HUD（Show HUD）**

采集时是否显示游戏内HUD。此设置不适用于基于UMG的HUD元素，而且它引用基于HUD类的蓝图。 

要求启用 **过场动画模式（Cinematic Mode）**。

## "动画"设置

下列选项定义采集时使用的 **动画（Animation）** 设置： 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad0fdbed-cc9b-4fcb-a6f6-cf350a51c055/animationsettings.png "AnimationSettings.png")

属性

说明

**使用自定义起始帧（Use Custom Start Frame）**

启用时，"起始帧（Start Frame）"设置将覆盖默认起始帧号。

**起始帧（Start Frame）**

时间字段，格式为时间码、帧和秒。

**使用自定义起始帧（Use Custom Start Frame）** 启用时，使用此值。

**使用自定义结束帧（Use Custom End Frame）**

启用时，"结束帧（End Frame）"设置将覆盖默认结束帧号。

**结束帧（End Frame）**

时间字段，格式为时间码、帧和秒。

**使用自定义结束帧（Use Custom End Frame）** 启用时，使用此值。

**预热帧数（Warm Up Frame Count）**

在序列的"起始帧（Start Frame）"前播放以"预热"动画的额外帧数。如果动画中包含粒子或其他早于采集"起始帧（Start Frame）"生成到场景中的运行时效果，此属性非常有用。

**预热前延迟（Delay Before Warm Up）**

开始播放预热帧前等待的秒数（实时）。

这有助于使后期处理效果在采集动画前稳定下来。

**镜头预热前延迟（Delay Before Shot Warm Up）**

在镜头边界处等待的秒数（实时）。

这有助于使后期处理效果在采集动画前稳定下来。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [render movie settings](https://dev.epicgames.com/community/search?query=render%20movie%20settings)
-   [deprecated](https://dev.epicgames.com/community/search?query=deprecated)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   ["渲染电影"选项](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%22%E6%B8%B2%E6%9F%93%E7%94%B5%E5%BD%B1%22%E9%80%89%E9%A1%B9)
-   [采集设置](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%E9%87%87%E9%9B%86%E8%AE%BE%E7%BD%AE)
-   [音频输出格式](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%E9%9F%B3%E9%A2%91%E8%BE%93%E5%87%BA%E6%A0%BC%E5%BC%8F)
-   [视频设置](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%E8%A7%86%E9%A2%91%E8%AE%BE%E7%BD%AE)
-   [合成图选项](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%E5%90%88%E6%88%90%E5%9B%BE%E9%80%89%E9%A1%B9)
-   [包含渲染通道](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%E5%8C%85%E5%90%AB%E6%B8%B2%E6%9F%93%E9%80%9A%E9%81%93)
-   [图像设置](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%E5%9B%BE%E5%83%8F%E8%AE%BE%E7%BD%AE)
-   ["通用"设置](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%22%E9%80%9A%E7%94%A8%22%E8%AE%BE%E7%BD%AE)
-   [文件名格式令牌](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%E6%96%87%E4%BB%B6%E5%90%8D%E6%A0%BC%E5%BC%8F%E4%BB%A4%E7%89%8C)
-   ["序列"设置](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%22%E5%BA%8F%E5%88%97%22%E8%AE%BE%E7%BD%AE)
-   ["过场动画"设置](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%22%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%22%E8%AE%BE%E7%BD%AE)
-   ["动画"设置](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine#%22%E5%8A%A8%E7%94%BB%22%E8%AE%BE%E7%BD%AE)