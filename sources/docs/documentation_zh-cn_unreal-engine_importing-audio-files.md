# 导入音频文件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-audio-files
> 
> 生成时间: 2025-06-14T20:22:40.336Z

---

目录

![导入音频文件](https://dev.epicgames.com/community/api/documentation/image/a7b15dad-44e5-4383-a62e-ead31860f100?resizing_type=fill&width=1920&height=335)

虚幻引擎提供了多种功能，供你为项目创建所需的音频。**声波（Sound Wave）** 资产表示音频文件，是其中许多功能需要用到的基本构建块之一。将音频文件导入虚幻编辑器可创建声波。

### 支持的音频文件

**格式（Format）**

`.wav` 、 `.ogg` 、 `.flac` 、 `.aif`

**位深度（Bit Depth）**

16、24（Windows）

**采样率（Sample Rate）**

任意

**扬声器信道（Speaker Channels）**

Mono、Stereo、4.0、5.1、7.1

所有导入的音频文件会在内部转换为16位 `.wav` 文件。因此，导出操作（右键点击声波，选择 **资产操作（Asset Actions） > 导出（Export...）** ）将生成转换后的文件，而不是原先导入的文件。此外，24位文件在转换期间不会发生抖色，因此推荐导入16位文件。

### 如何导入音频文件

1.  在内容浏览器中，点击 **导入（Import）** 按钮。
    
    ![内容浏览器导入按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/297a933f-5310-4e9f-a7e4-31f7b59903d0/content_browser_import.png)
2.  使用 **文件资源管理器（File Explorer）** 选择你想导入的文件。
    
3.  找到新创建的 **声波（Sound Wave）** 资产。
    
    ![内容浏览器导入的声波](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0021381-7469-44e1-8fe7-3888108bba0b/content_browser_imported.png)
4.  要预览声波，请将鼠标悬停在其上方，直至显示 **播放/停止（Play/Stop）** 切换按钮，然后点击该按钮。
    
    ![播放声波](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8eaa8d12-805a-4f2d-b1de-70c25bdd9040/play_sound_wave.png) ![停止声波](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13636b73-8e9e-43eb-bdd2-b48ca3aa488f/stop_sound_wave.png)
    
5.  双击该声波打开 **细节（Details）** 面板。你可以在此处查看和编辑资产的属性。
    
    ![声波细节面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c650eb9-f2b6-4454-9c2b-bd2b95a1fb07/details_panel.png)

将音频文件从Windows资源管理器直接拖入 **内容浏览器（Content Browser）** ，也可以导入音频文件。

虚幻引擎还支持导入一阶环境立体声文件。请参阅[原生声场环境立体声渲染](/documentation/zh-cn/unreal-engine/native-soundfield-ambisonics-rendering-in-unreal-engine)，了解有关导入和使用环境立体声资产的信息。

### 压缩

所有音频资产都使用 **项目设置（Project Settings）** 中指定的 **默认音频压缩类型（Default Audio Compression Type）** 进行压缩。你可以根据项目的需要更改此值。

-   **Bink音频（Bink Audio）** ：一种基于感知的编码解码器，支持所有平台中的所有功能。这是默认选项。
-   **ADPCM** ：一种时域编码解码器，具有固定大小的质量和大约4倍的压缩率，但解码成本相对较低。
-   **PCM** ：使用未压缩音频，会造成更高的内存使用率，因为流式处理的数据块每块包含更少的音频，但解码成本极低，并支持所有功能。
-   **特定于平台（latform Specific）** ：以特定于平台的格式对资产编码。不支持搜索。

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound sources](https://dev.epicgames.com/community/search?query=sound%20sources)
-   [sound waves](https://dev.epicgames.com/community/search?query=sound%20waves)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [支持的音频文件](/documentation/zh-cn/unreal-engine/importing-audio-files#%E6%94%AF%E6%8C%81%E7%9A%84%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B6)
-   [如何导入音频文件](/documentation/zh-cn/unreal-engine/importing-audio-files#%E5%A6%82%E4%BD%95%E5%AF%BC%E5%85%A5%E9%9F%B3%E9%A2%91%E6%96%87%E4%BB%B6)
-   [压缩](/documentation/zh-cn/unreal-engine/importing-audio-files#%E5%8E%8B%E7%BC%A9)