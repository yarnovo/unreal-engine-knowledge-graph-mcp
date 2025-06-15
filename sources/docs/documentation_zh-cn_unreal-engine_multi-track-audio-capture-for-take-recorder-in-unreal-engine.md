# 虚幻引擎Take Recorder中的多轨道音频捕捉 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/multi-track-audio-capture-for-take-recorder-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:12:36.540Z

---

目录

Take Recorder的多轨道音频捕捉功能 **Take Recorder** 为音频录制提供了多种选项。你可以在Take Recorder中创建多个（最多8个）**麦克风音频** 源，以录制来自多通道音频设备的音频。

![Multi-track audio sources](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c336af97-768f-4566-bb2a-1559a113103b/multi-track_audio_sources.png)

每个 **麦克风音频** 源都有一个相关的 **音频输入设备通道**，指定所选音频设备上的输入通道。通过 **Windows音频会话API**，最多可支持8个通道。注意，音频设备必须有 **Windows WDM多通道支持**，才能应用8个通道。有一些第三方音频设备制造商提供Windows WDM多通道支持。

请参阅[麦克风音频录制器](/documentation/zh-cn/unreal-engine/take-recorder-in-unreal-engine#microphoneaudiorecorder)和[音频输入设备](/documentation/zh-cn/unreal-engine/take-recorder-in-unreal-engine#audioinputdevice)章节了解有关这些音频设置的更多信息。

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [take recorder](https://dev.epicgames.com/community/search?query=take%20recorder)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)