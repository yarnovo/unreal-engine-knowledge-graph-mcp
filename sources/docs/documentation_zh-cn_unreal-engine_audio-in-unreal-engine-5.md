# 虚幻引擎5中的音频系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/audio-in-unreal-engine-5
> 
> 生成时间: 2025-06-14T20:21:15.293Z

---

目录

![虚幻引擎5中的音频系统](https://dev.epicgames.com/community/api/documentation/image/fa4398c3-66e5-4c0e-b1b7-cce54c8a68de?resizing_type=fill&width=1920&height=335)

**Audio Mixer** 是虚幻引擎的的全功能、多平台的音频渲染器。这款强大的音频引擎在《堡垒之夜》中首次使用，随后被添加到虚幻引擎4.24中。

自推出以来，Audio Mixer一直在不断改善它的原有功能，同时添加次世代音频渲染功能——这为从事实时体验的音频设计师提供了前所未有的掌控和灵活性。

本文介绍了音频引擎的当前功能，以及它在虚幻引擎5中新增的次世代功能。

### 旧版功能

虚幻引擎旧版音频功能的核心是Sound Cues、Sound Classes和Sound Mixes。这些功能在新一代Audio Mixer中同样可以使用，以便于你升级项目。

#### Sound Cues

Sound Cues一直是虚幻引擎中的音频对象。Sound Cues属于一种音频参数图；音效设计师可以用它播放声源并调整各种参数，例如音量和音调。

Sound Cues无法实现采样级别的精准控制，也不支持创建任意类型的数字信号处理算法（DSP）。工作流程大多是手动的，而且需要音效设计师为每个声音创建单独的Sound Cues。

最后，由于无法实现采样级精确的时间/音频调度，导致程序化音效的创建变得更加具有挑战性。

#### Sound Classes和Sound Mixes

Sound Classes表示一组与特定声音相对应的静态参数。

它们用来对声音进行分类，并在项目中应用一套一致参数。由于它们的静态性质，音频设计者往往最终会创建许多类似的Sound Class，以便完全满足大型项目的所有不同需求。调试Sound Class也比较复杂，因为Sound Class中的参数之间的继承性不一致，有些参数优先于其他参数。

Sound Mixes赋予了音频设计者在运行时动态调节音频参数的能力。这对创建动态音效很有用，允许音效对游戏事件和其他条件作出反应。由于音效师可以用单个Sound Mix创建多个实例并与Sound Classes结合，调试Sound Mixes会变得更加复杂。

### UE5中的音频渲染

Audio Mixer的许多开发工作都是对虚幻引擎原有功能的拓展，旨在解决上文中提到的难点。此外，我们还开发了一些新的功能，以便让虚幻引擎具备其他专业音频创作工具的功能。

#### MetaSounds

虚幻引擎5引入了 **MetaSounds**，一个全新的高性能音频系统。它允许音频设计人员完全掌控声源的数字信号处理（DSP）图。MetaSounds除了兼具Sound Cues中的相同功能，还提供了次世代功能，使设计人员能够打造出身临其境的音效体验。

MetaSounds还解决了Sound Cues中的难点，可以作为虚幻引擎默认音频对象的替代方案。与Sound Cues不同，MetaSounds本质上属于数字信号处理（DSP）渲染图。它允许音频设计人员打造任意复杂的程序化音频系统，该系统在音频缓冲区级别上提供了精确的采样时间和控制。

除了运行时的音频渲染能力外，MetaSounds还支持改进音频设计者的工作流程，包括：通过组合（MetaSounds中的MetaSounds）建立MetaSounds，支持模板化，以及动态和静态资产实例化。

与Sound Cues相比，Metasounds对改良了性能，并提供了一个完全可扩展的API，可供第三方插件使用。

#### 音频调制

在虚幻引擎的老版本音频功能集中，Sound Class会定义静态全局参数并将它们应用到声音分组中；Sound Mixes会在运行时动态调整这些参数。这些参数是写死的，这就限制了它们在游戏中的应用。

**音频调制（Audio Modulation）** 对原有这些类进行了改良，它解放了参数控制和调制的概念，转而使用一个通用的"参数总线（parameter bus）"。任何对象都可以是一个调制源或者调制目标（modulation destination）。

参数总线可以有任何数量的调制源，包括蓝图类、调制混合和游戏代码。调制目标就是被调制过的参数，能以多种方式从参数总线上进行本地映射。

音频调制参数总线允许音频设计者定义自己的参数组（Sound Classes）并随意控制它们（Sound Mixes）。

#### Quartz

**Quartz** 是一个功能集，它将"采样级精确"的音频计时引入了蓝图。Quartz能够处理复杂的音频精确播放，并能支持自定义的交互式和程序化音乐系统。Quartz还能将精确的计时事件发送回蓝图，以支持音效与游戏逻辑/视效之间的同步。

#### Audio分析

**Audio分析（Audio Analysis）** 是一套旨在提供非实时和实时音频分析的技术。这些工具能与Niagara和蓝图脚本一起工作，并能集成到虚幻5编辑器中，以便创建UX和调试分析器，以及用于驱动游戏逻辑和图形的运行时音频分析。

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound](https://dev.epicgames.com/community/search?query=sound)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [旧版功能](/documentation/zh-cn/unreal-engine/audio-in-unreal-engine-5#%E6%97%A7%E7%89%88%E5%8A%9F%E8%83%BD)
-   [Sound Cues](/documentation/zh-cn/unreal-engine/audio-in-unreal-engine-5#soundcues)
-   [Sound Classes和Sound Mixes](/documentation/zh-cn/unreal-engine/audio-in-unreal-engine-5#soundclasses%E5%92%8Csoundmixes)
-   [UE5中的音频渲染](/documentation/zh-cn/unreal-engine/audio-in-unreal-engine-5#ue5%E4%B8%AD%E7%9A%84%E9%9F%B3%E9%A2%91%E6%B8%B2%E6%9F%93)
-   [MetaSounds](/documentation/zh-cn/unreal-engine/audio-in-unreal-engine-5#metasounds)
-   [音频调制](/documentation/zh-cn/unreal-engine/audio-in-unreal-engine-5#%E9%9F%B3%E9%A2%91%E8%B0%83%E5%88%B6)
-   [Quartz](/documentation/zh-cn/unreal-engine/audio-in-unreal-engine-5#quartz)
-   [Audio分析](/documentation/zh-cn/unreal-engine/audio-in-unreal-engine-5#audio%E5%88%86%E6%9E%90)