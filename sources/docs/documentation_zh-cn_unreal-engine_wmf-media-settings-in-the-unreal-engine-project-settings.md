# 虚幻引擎项目设置中的WMF媒体设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/wmf-media-settings-in-the-unreal-engine-project-settings
> 
> 生成时间: 2025-06-14T18:57:20.145Z

---

目录

![WMF媒体](https://dev.epicgames.com/community/api/documentation/image/8bb9ece2-1b20-4336-a7ca-4072c252780d?resizing_type=fill&width=1920&height=335)

## WMF媒体

### 媒体

**设置**

**说明**

**允许非标准编码解码器（Allow Non Standard Codecs）**

定义是否允许加载使用非标准编码解码器的媒体（默认值 = off）。

默认情况下，播放器将尝试检测操作系统并未现成支持的音频和视频编码解码器，但可能需要用户安装其他编码解码器包。

启用此选项以跳过此检查并允许使用非标准编码解码器。

**低延迟（Low Latency）**

在Windows媒体管线中启用低延迟处理（默认值 = off）。

启用此设置后，会使用尽可能最低的延迟生成媒体数据。

对于特定实时应用程序，这可能受欢迎，但它可能对音频和视频质量造成负面影响。

此设置仅在Windows 8或更新版本上受到支持。

**硬件加速视频解码（试验性）（Hardware Accelerated Video Decoding (Experimental)）**

尽可能使用硬件加速视频加速（GPU），否则回退到软件实现（CPU）。仅限Windows和DX11。

### 调试

**设置**

**说明**

**原生音频输出（Native Audio Out）**

通过操作系统的原生混音器播放音轨（默认值 = off）。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [basics](https://dev.epicgames.com/community/search?query=basics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [WMF媒体](/documentation/zh-cn/unreal-engine/wmf-media-settings-in-the-unreal-engine-project-settings#wmf%E5%AA%92%E4%BD%93)
-   [媒体](/documentation/zh-cn/unreal-engine/wmf-media-settings-in-the-unreal-engine-project-settings#%E5%AA%92%E4%BD%93)
-   [调试](/documentation/zh-cn/unreal-engine/wmf-media-settings-in-the-unreal-engine-project-settings#%E8%B0%83%E8%AF%95)