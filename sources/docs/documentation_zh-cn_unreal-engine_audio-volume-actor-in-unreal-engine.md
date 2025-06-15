# 虚幻引擎中的音频体积Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/audio-volume-actor-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:58:50.607Z

---

目录

![音频体积Actor](https://dev.epicgames.com/community/api/documentation/image/1f2cbf98-d8ec-4f76-a595-3674a75826ea?resizing_type=fill&width=1920&height=335)

你可以在音频体积的 **细节（Details）** 面板中调整多项属性，以此更好地控制其效果。参数如下：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5be0c089-ed1b-4068-8a61-df8ba6ebd9e3/audiovolume.png)

属性

说明

**优先级（Priority）**

体积重叠时，将使用优先级最高的体积。如果两个或多个重叠体积具有相同的优先级，将不定义顺序。

**应用混响（Apply Reverb）**

确定是否应该使用混响设置。

**混响效果（Reverb Effect）**

这是该体积要使用的混响资源。

**体积（Volume）**

这是混响效果的整体体积级别。

**渐变时间（Fade Time）**

这是从当前混响设置渐变到体积设置所需的时间（以秒为单位）。

**启用（Enabled）**

确定当前是否启用该体积，使其影响或不影响音效。

**环境区域设置（Ambient Zone Settings）** 定义位于相关音频体积中的声音Actor如何根据玩家位置发生改变。可在 **细节（Details）** 面板中调整"环境区域设置（Ambient Zone Settings）"。

属性

说明

**外部音量（Exterior Volume）**

当玩家在该体积内部时，外部声音的最终音量。

**外部淡入淡出时间（Exterior Time）**

淡入淡出到一个新的外部音量所需的时间，以秒为单位。

**外部LPF（Exterior LPF）**

当玩家在环境区域内部时，应用到外部声音的低通滤波器乘数（使用1.0来应用最大的LPF）。

**外部LPFTime（Exterior LPFTime）**

淡入淡出到新的低通滤波器级别所需的时间，以秒为单位。

**内部音量（Interior Volume）**

当玩家在该体积外部时，内部声音的最终音量。

**内部淡入淡出时间（Interior Time）**

淡入淡出到一个新的内部音量所需的时间，以秒为单位。

**内部LPF（Interior LPF）**

当玩家在环境区域外部时，应用到内部声音的低通滤波器乘数（使用1.0来应用最大的LPF）。

**内部LPFTime（Interior LPFTime）**

淡入淡出到新的低通滤波器级别所需的时间，以秒为单位。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)