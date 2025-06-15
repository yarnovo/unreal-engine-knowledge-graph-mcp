# 虚幻引擎中的Bink Video | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:24:14.458Z

---

目录

![虚幻引擎中的Bink Video](https://dev.epicgames.com/community/api/documentation/image/f7a2b9da-6895-4b3a-a976-9da54fbcd9b1?resizing_type=fill&width=1920&height=335)

虚幻引擎4.27+中内置 **Bink Media** 插件。所有虚幻引擎平台都受到支持（包括NDA平台）。

## 安装

1.  在编辑器中选择 **编辑（Edit）> 插件（Plugins）**，搜索 **Bink**，然后启用插件。按需重新启动虚幻引擎。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edf7d599-81c7-4c0f-94a6-20cc1f6df844/ue5_01-enable-bink-plagin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edf7d599-81c7-4c0f-94a6-20cc1f6df844/ue5_01-enable-bink-plagin.png)
    
    点击查看大图
    
2.  将Bink视频文件复制到虚幻引擎项目目录中的 **Contents/Movies** 目录。
    
    你可以使用 `Engine/Binaries/ThirdParty/Bink` 目录（Bink2ForUnreal.exe）中的 **虚幻引擎的Bink 2编码器** 创建Bink文件。 双击可执行文件，然后选择要转换的视频文件，然后点击 **Bink it！**，然后点击 **Bink**。对于大多数用例，自动设置将运行正常。
    
    ![虚幻的Bink 2编码器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4320ca92-1ec5-4d87-ae6c-3195efd44bf7/ue5_02-bink-video.png "The Bink 2 Encoder for Unreal")
    
3.  双击项目的 `.uproject` 文件，界面上会出现警告对话框，询问你是否因为缺少插件而要重新构建项目。确认执行重新构建，虚幻引擎重新启动并加载项目。
    
4.  现在你可以播放Content/Movies目录中的Bink文件。
    

## 虚幻引擎Bink的视频类型

虚幻引擎有两种不同类型的视频：全屏开场视频和游戏内非开场视频。每种类型的使用方式略有不同，如下所述。

### 全屏开场视频设置

首先，你需要禁用所有其他视频播放器插件。否则，所有已启用的MPEG-4播放器都会尝试播放Bink视频文件，但会失败且无提示。

为此，前往 **编辑（Edit）> 插件（Plugins）**：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0482d1e5-1326-4166-b38a-1d4d2b2119e2/ue5_03-disable-media-players.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0482d1e5-1326-4166-b38a-1d4d2b2119e2/ue5_03-disable-media-players.png)

点击查看大图

禁用除Bink Media插件之外的所有视频播放器插件。

其次，你需要配置一些视频，在启动时播放。

前往 **编辑（Edit）> 项目设置（Project Settings）**

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e542955-ad87-4df7-b4d5-e6a8cf470de0/ue5_05-project-settings-movies.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e542955-ad87-4df7-b4d5-e6a8cf470de0/ue5_05-project-settings-movies.png)

点击查看大图

点击 **开场视频（Startup Movies）** 旁边的 **+** 按钮，然后展开列表显示视频。你可以按顺序播放多段视频。然后，点击 **...** 按钮选择要播放的文件。

前往 **编辑（Edit）> 项目设置（Project Settings）> Bink动画（Bink Movies）** 查看Bink特有的选项。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2da6c6cd-75d6-4636-98c2-bb994e240c59/ue5_04-project-settings-bink-movies.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2da6c6cd-75d6-4636-98c2-bb994e240c59/ue5_04-project-settings-bink-movies.png)

点击查看大图

以下是一些Bink专用选项：

1.  **Bink缓冲模式：** 控制你是要从磁盘流送一部分视频，在播放前预加载整段视频，还是在整段视频加载后才开始流送。
    
2.  **Bink音轨：** 决定了你要如何播放声音。选项有多个：
    
    1.  **SndNone：** 不在此Bink中播放声音。
        
    2.  **Snd Simple：** 默认值。此选项会尝试根据Bink文件的文件名找出你想要的内容。
        
        -   如果文件名以 `_51` 结尾，则使用 **Snd 51** 选项。
            
        -   如果文件名以 `_51L` 结尾，则使用 **Snd 51语言覆盖（Snd 51 Language Override）** 选项。
            
        -   如果文件名以 `_71` 结尾，则使用 **Snd 71** 选项。
            
        -   如果文件名以 `_71L` 结尾，则使用 **Snd 71语言覆盖（Snd 71 Language Override）** 选项。
            
        
        否则，它会播放由 **音轨起始（Sound Track Start）** 值指定的Bink轨道（默认是轨道0）
        
    3.  **Snd语言覆盖**：此选项将播放两个轨道。
        
        -   轨道0中的音频，通常是背景音乐/效果。
            
        -   **音轨起始（Sound Track Start）** 值指定的轨道，通常是语言轨道。
            
    4.  **Snd 51**：此选项将从 **音轨偏移（Sound Track Offset）** 值（默认为0）指定的轨道开始播放六个单声道轨道到系统中。因此，如果你已经完全本地化四种语言的5.1轨道，你将混合二十四个Bink轨道，并使用 **音轨偏移（Sound Track Offset）** 设置来指定要播放的正确音轨范围。
        
    5.  **Snd 51语言覆盖**：此选项将从偏移量0开始播放六个单声道背景/效果轨道，然后由 **音轨起始（Sound Track Start）** 值指定的一个单声道轨道作为语言轨道进入中央声道。因此，对于此处的四种语言，你将有十个音轨、5.1 背景音乐/效果轨道以及四个不同的中心语言轨道。
        
    6.  **Snd 71**：此选项将从 **音轨偏移（Sound Track Offset）** 值（默认为0）指定的轨道开始播放八个单声道轨道到系统中。因此，如果你已经完全本地化四种语言的7.1轨道，你将混合二十八个Bink轨道，并使用 **音轨偏移（Sound Track Offset）** 设置来指定要播放的正确音轨范围。
        
    7.  **Snd 71语言覆盖：** 此选项将从偏移量0开始播放八个单声道背景/效果轨道，然后由 **音轨起始（Sound Track Start）** 值指定的一个单声道轨道作为语言轨道进入中央声道。因此，对于此处的四种语言，你将有十二个音轨、7.1 背景音乐/效果轨道以及四个不同的中心语言轨道。
        
3.  **Bink音轨起始：** 一段Bink视频可以包含多个不同的音轨。你可以使用此选项指定要播放的音轨。
    
4.  **Bink目的地左上/右下** 可指定视频要渲染到的矩形。例如，你可以使用它来强制使用上下黑边。
    

# 游戏内（非开场）视频设置

你还可以在游戏关卡本身期间渲染视频。你可以直接渲染到纹理，然后在游戏中使用该纹理，你也可以直接渲染到屏幕。Bink在所有图形之后UI之前渲染，因此你可以在视频画面上绘制字幕。

为此，请右键点击 **内容浏览器（Content Browser）**，然后在 **杂项（Miscellaneous）** 分段下添加新的 **Bink Media播放器（Bink Media Player）**。

![创建新的Bink Media播放器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26f32d8b-33b4-4b9a-92d6-f3e57203e068/ue5_06-create-bink-media-player.png "Create a new Bink Media Player")

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b56ddb5a-2288-4fe3-a99c-eeb489bab91a/ue5_07-bink-media-player.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b56ddb5a-2288-4fe3-a99c-eeb489bab91a/ue5_07-bink-media-player.png)

点击查看大图

Bink的专用配置选项是：

1.  **Bink缓冲模式** 可控制你是要从磁盘流送一部分视频，在播放前预加载整段视频，还是在整段视频加载完前不停止流送。
    
2.  **Bink音轨** 决定了你要如何播放声音。从简单的立体声到7.1环绕声，选择多种多样。
    
3.  **Bink音轨起始** 一段Bink视频可以包含多个不同的音轨。你可以使用此选项指定要播放的音轨。
    
4.  **Bink绘制风格** 你可以用来覆盖渲染到纹理的默认UE5功能，而不是绕过UE4渲染直接渲染到屏幕。
    
5.  **Bink目的地左上/右下** 可指定视频要渲染到的矩形。例如，你可以使用它来强制使用上下黑边。
    
6.  **Bink图层深度（Bink Layer Depth）** 允许你同时渲染多个视频，并设置深度，控制视频的绘制顺序。
    

Bink视频文件(`*.bk2`)应该放在(ProjectName)/Content/Movies文件夹中，其中(ProjectName)是项目名称。这样可确保在所有配置中正确地将视频复制到最终的构建中。

右键点击 **内容浏览器（Content Browser）** 中的 **BinkMediaPlayer**，然后选择 **创建媒体纹理（Create Media Texture）**，从播放器生成纹理。然后，你可以右键点击 **内容浏览器（Content Browser）** 中的 `BinkMediaPlayer_Tex` 纹理，并选择 **创建材质（Create Material）**，以便使用此纹理创建默认材质。你可以像在虚幻引擎中使用任何其他材质或纹理一样使用此材质和纹理。

## 虚幻中Bink的其他说明

### 多线程解码

虚幻引擎的Bink Media插件本身支持多线程解码。它在解压期间最多可以使用四个线程，具体取决于运行时CPU计数。

默认情况下，虚幻引擎的Bink 2编码器使用四个视频切片，以便获得最佳多线程性能。

### 搜索

你可以直接调用Bink插件函数 `BinkPluginGoto`，从而设置新的播放位置。通常，你会需要跳转到关键帧，否则就要一路解压所有中间帧（Bink插件会在后台为你执行此操作）。你可以使用 `ms_per_process` 参数控制CPU Bink每帧花费多少时间寻找新帧。通常每帧使用30毫秒左右时，搜索会相对较快。

### 视频深度（绘制期间排序）

如果你使用非开场视频选项绘制大量视频覆层，你可以使用 **深度（Depth）** 选项控制覆层的绘制顺序。无论虚幻引擎处理视频的顺序如何，都能让你的视频正确堆叠。

对于渲染目标，**深度（Depth）** 可控制将视频绘制到渲染目标中的顺序，但渲染目标通常由虚幻引擎绘制到场景中。

### 字幕

支持基于[Subrip](https://en.wikipedia.org/wiki/SubRip) .srt 文件格式的字幕。

如需使用srt文件，请将其与 **Bink 2 Video bk2** 文件放在同一目录下。用以下格式命名该文件："`<name of Bink2 video file>_<language<.srt`."。该文件应包含所需语言的字幕。

例如，如果你有一个 "**Movies/example.bk2**" 文件，你需要准备一个 "**Movies/example\_en.srt**" 文件在旁边，其中包含英语字幕。

### 立体视频

Bink的运行速度足以处理3D视频。为此，请使用渲染目标路径，然后绘制到屏幕对齐的四边形。对于每只眼睛，调整四边形，以便用四边形的上半部分或视频的下半部分填充屏幕。

### Bink插件API

Bink插件API也有许多其他功能按钮。当你需要自定义功能按钮（例如搜索、暂停等）时，你可以调用 `binkplugin.h` 中的函数。

-   [video](https://dev.epicgames.com/community/search?query=video)
-   [bink](https://dev.epicgames.com/community/search?query=bink)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [安装](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#%E5%AE%89%E8%A3%85)
-   [虚幻引擎Bink的视频类型](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8Ebink%E7%9A%84%E8%A7%86%E9%A2%91%E7%B1%BB%E5%9E%8B)
-   [全屏开场视频设置](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#%E5%85%A8%E5%B1%8F%E5%BC%80%E5%9C%BA%E8%A7%86%E9%A2%91%E8%AE%BE%E7%BD%AE)
-   [游戏内（非开场）视频设置](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#%E6%B8%B8%E6%88%8F%E5%86%85%EF%BC%88%E9%9D%9E%E5%BC%80%E5%9C%BA%EF%BC%89%E8%A7%86%E9%A2%91%E8%AE%BE%E7%BD%AE)
-   [虚幻中Bink的其他说明](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#%E8%99%9A%E5%B9%BB%E4%B8%ADbink%E7%9A%84%E5%85%B6%E4%BB%96%E8%AF%B4%E6%98%8E)
-   [多线程解码](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#%E5%A4%9A%E7%BA%BF%E7%A8%8B%E8%A7%A3%E7%A0%81)
-   [搜索](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#%E6%90%9C%E7%B4%A2)
-   [视频深度（绘制期间排序）](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#%E8%A7%86%E9%A2%91%E6%B7%B1%E5%BA%A6%EF%BC%88%E7%BB%98%E5%88%B6%E6%9C%9F%E9%97%B4%E6%8E%92%E5%BA%8F%EF%BC%89)
-   [字幕](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#%E5%AD%97%E5%B9%95)
-   [立体视频](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#%E7%AB%8B%E4%BD%93%E8%A7%86%E9%A2%91)
-   [Bink插件API](/documentation/zh-cn/unreal-engine/bink-video-for-unreal-engine#bink%E6%8F%92%E4%BB%B6api)