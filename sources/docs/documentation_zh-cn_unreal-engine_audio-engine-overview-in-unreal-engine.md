# 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:21:19.754Z

---

目录

![音频引擎概述](https://dev.epicgames.com/community/api/documentation/image/d7eb214f-3e98-4a43-b39f-eb83aaaaa0e5?resizing_type=fill&width=1920&height=335)

**虚幻音频引擎** 是一款功能强大的音频引擎，它包含多种功能，并且支持 **虚幻引擎（UE4）** 所支持的所有平台。

这款音频引擎集成了蓝图以及全新的多平台[音频混合器](/documentation/zh-cn/unreal-engine/audio-mixer-overview-in-unreal-engine)，包含了音频数字信号处理（DSP）、程序化合成、可自定义子混音图，以及灵活的C++ API，因此它完全可以在任何项目上交付任何规模的高质量音频。

本文对它的各种子系统和功能作了简单介绍，可帮助你定位并解决音频问题。

## 源资产管理

资产管理整体上来说非常简单。UE4资产管理的指导原则是尽可能直接执行操作，并在可能的情况下自动处理。

### 导入资产

虚幻引擎支持通过文件导入对话框或直接拖拽音频资产的方式，直接将音频资产从桌面导入到内容浏览器中。

你可以导入各种资产类型和通道格式（请参阅[如何导入音频](/documentation/zh-cn/unreal-engine/importing-audio-files))。

在内部，虚幻引擎以16位未压缩的 `.wav` 格式存储导入的音频文件。

数据导入后所在的 `UAsset` 被称为 `USoundWave`，所有虚幻引擎音频Gameplay API都可以直接播放它们。也可以在内容浏览器中预览导入的资产，方法是点击资产上的播放（Play）按钮，或在选中资产后按空格键。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/626cbce8-1775-4ad4-a94f-bffe5538d76e/contentbrowser.png)

将音频资产导入到内容浏览器时，引擎将以16位未压缩的 .wav 格式存储它。

## 资产管理工具

除了结构清晰的内容浏览器目录、精心设计的书签功能、实用的内容浏览器工具，音频资产还能利用 **属性矩阵** 工具。要对虚幻引擎中的音频资产进行批量编辑，请选择你要编辑的资产，然后打开"属性矩阵"工具，你可以同时对多达数百个资产进行调整。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf5c2294-2110-4338-81fe-858ce0b317da/propertymatrix.png)

可以使用属性矩阵工具同时对资产进行批量更改。

## Sound Cue

在虚幻音频引擎中，有一种资产会将多个音频资产概念性地合并成一个抽象的音效对象，那个资产就是 **Sound Cue**。它实际上并不是声音本身，而是 *声音的抽象概念*。

Sound Cue会在运行时计算，它是多个非确切声音的集合。换句话说，每次播放Sound Cue时，声音都可能会有所不同，具体取决于它的使用背景。

Sound Cue是虚幻引擎中最早的工具之一。Sound Cue编辑器使音效设计师能够创建自己的声音设计拓扑，可以将简单的播放音效事件转换为任意的复杂音效设计事件。

总体上说，Sound Cue支持资产随机化、Gameplay驱动的参数映射、用于实现距离衰减的自定义逻辑、体积衰减，音高变化以及许多其他功能。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d2d791a-d811-44e9-bdd6-14bdd1dc3438/soundcueeditor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d2d791a-d811-44e9-bdd6-14bdd1dc3438/soundcueeditor.png)

Sound Cue编辑器可以将简单的播放音效事件转换为复杂的音效设计事件。

你也可以使用 **Sound Cue模板** 插件创建Sound Cue，该插件是一个简单的C++接口，音效设计人员可以使用该接口，通过矩阵属性编辑器和内容浏览器，命名特定的Sound Cue、设计图表拓扑，让逻辑自动构建。这样一来，音效设计师就可以定义通用的Sound Cue图表，并借此优化工作流。

有关更多信息，请参见[Sound Cue编辑器](/documentation/zh-cn/unreal-engine/sound-cue-editor-in-unreal-engine)。

## 空间化和衰减

空间化和衰减在游戏中很重要。在虚幻音频引擎中，你可以自定义空间化和衰减行为。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93239dba-b9cf-4c4a-802e-fc036deb8d30/spatialization.png)

自定义空间化和衰减可以通过多种方式实现。

通常，音效和衰减设置使用 **音效衰减设置（Sound Attenuation Settings）** 资产定义，并且由音效设计师将其 *挂载（hook up）* 到音效。有很多可以挂载音效衰减的位置：

-   直接在音效资产上挂载
-   在Sound Cue中挂载
-   在蓝图中重载

有关更多信息，请参见[音效衰减](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine)。

### 非空间化音效

在音频引擎的语境中，非空间化音效通常称为 **2D音效**。虚幻音频支持通过禁用音效衰减设置资产中的空间化效果，或者通过不提供音效衰减资产来播放2D资产。此类2D音效可用于音乐、UI反馈音效，以及其他听众处于静态位置时的情况。

尽管没有特殊的空间化方法也可以播放音效资产，但是资产可能包含烘焙到其中的空间信息。

-   仅2D播放支持 **多声道声源**（例如四声道、5.1和7.1声源）。这些通常用于音乐床或环境床。
    
-   **立体声声源** 能够以2D播放，但是也可以进行空间化。
    

### 空间化音效

默认情况下，当通过衰减设置启用空间化时，将使用平移对音效进行空间化。

**平移（Panning）** 是根据声音相对于听众方位的角度来改变物理输出扬声器信道中音效振幅的过程。

虚幻音频支持针对多种输出配置（立体声、5.1和7.1）以及单声道和立体声源资产的平移。

对于立体声资产，使用立体声扩散参数定义源左右输入信道之间的虚拟距离。这样，立体声源的左右声道相对于听众以类似方式向单声道源平移。

音效设计师可以配置在项目中使用的两种 **全局平移模式**：线性平移和等功率平移。

-   **线性平移** 在输出信道之间执行简单的线性交叉渐变。
    
-   **等功率平移** 维持输出信道之间的功率（振幅平方）。
    

由于音量感知基于声音功率，因此保持相等的平移功率会产生感知上更恒定的音量平移。线性平移会导致声音在靠近物理扬声器位置时显得更大，而在扬声器位置之间时则变得更安静。

虚幻音频还使用具有强大且灵活的C++ API的第三方插件来支持空间化。第三方插件可以按用户的意愿对音效进行空间化处理，包括双耳/HRTF空间化或环境立体声（声场）编码和解码。插件可以提供自己的资产设置，可以将其挂载到衰减设置资产。

### 距离衰减

**基于距离的音效衰减** 也在音效衰减设置资产中定义。除了为基于距离的音效衰减提供大量预先设计的函数和形状之外，音效设计师还可以设计自己的自定义距离衰减曲线。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f01b004c-8449-47be-85db-b78c748f2b53/attenuationdistance.png)

### 空间化/衰减正交性

虚幻音频空间化和衰减功能的微妙之处在于它们被视为正交属性。这意味着音效设计师可以选择按距离（或源侦听器方向）衰减音效，而不受空间化影响，反之亦然。

空间化和衰减设置在音效衰减设置资产中定义。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/667ce59c-9096-4ec0-b181-83f1dd2dda5a/spatializationattenuation.png)

在此图像中，当听众处于非空间化半径内（由绿色球体表示）时，声音会流到扬声器配置的所有信道。在半径范围之外，声音将按常规进行空间化处理。

### 距离过滤

音效衰减（Sound Attenuation）设置还提供根据距离过滤声音的选项。低通和高通滤波器的单独曲线允许音效设计师模拟空气吸收的效果（低通滤波器），或对与频率相关的距离衰减进行建模（高通滤波器）。

### 遮蔽

虚幻音频具有支出极低的默认异步追踪功能，旨在执行声音遮蔽检查。音效衰减设置提供允许音效设计师启用遮蔽的选项，并且可以设置各种参数，以便基于声音是否被[遮蔽](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#attenuationocclusion)来进行过滤。利用虚幻音频的遮蔽C++ API在第三方插件中实现更高级的遮蔽解决方案。

### 基于听众的衰减

音效衰减设置还具有一个选项，允许音效设计师根据声音相对于听众的方向编写音量衰减、优先级缩放和其他效果。这样，在进入听众的视听范围内时，声音可能会变得更加"聚焦"或"失焦"。

有关更多信息，请参见[衰减和听众聚焦](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#attenuationlistenerfocus)。

### 基于距离的混响发送

虚幻音频还支持根据距离改变发送到主混响子混音的音频量。该映射的定义与其他基于距离的参数曲线类似。

有关更多信息，请参见[衰减混响发送](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine#attenuationreverbsend)。

## Gameplay音频API

虚幻音频具有简单灵活的GameplayAPI，允许蓝图和C++代码自定义音频引擎的行为。

### PlaySound和SpawnSound蓝图API

有许多蓝图函数供你用于播放蓝图和Gameplay C++代码中的音效，这些函数可以分为两大类：

-   **PlaySound函数：**其中包括PlaySoundAtLocation、PlaySound2D、PlayDialogue2D等。
-   **SpawnSound函数：**其中包括SpawnSoundAtLocation、SpawnSound2D和SpawnSoundAttached。
-   **PlaySound API：**这些函数以即发即弃模式播放指示音效。播放音效后，你将无法从蓝图修改其播放或将其附加到对象。对于不需要动态控制的简单单发型音效，这种播放类型非常有用。
-   **SpawnSound函数：**你可以创建音频组件，以便动态控制音效参数，将音效附加到其他Actor上，以及控制循环音效。音频组件是虚幻引擎中用于音效的有用对象，并且可以用于复杂的交互式音频蓝图系统。

大多数UE4音频系统都有关联的蓝图API，这些API允许通过蓝图进行自定义和控制。例如，每个音源和子混音DSP效果都可以通过蓝图修改和控制，正如音效混音和音效类也可以修改和控制一样。

## 游戏音量混合

游戏混音是游戏音频中挑战性较大的方面之一。虚幻音频为音效设计师提供了许多功能，可用于定义和控制游戏混音。有多种因素会影响整体音量混音。

### 直接音量调整

Sound Cue和声波等单独资产都有提供音量控制的参数。音频组件还允许从蓝图修改音量。PlaySound和SpawnSound音频Gameplay API可让你在播放时选择音量。Sound Cue可以根据动态Gameplay参数或其他Sound Cue图表逻辑修改音量。资产音量也可以通过各种距离衰减选项进行设置，包括根据听众方向衰减。

### 音效类

音效类是一种资产，可以为具有某些相同语意含义的资产提供一整套通用设置。将多个音效归为一个共同分类的主要动机之一是将音效按组进行控制。音效类在单独的音效类图表编辑器中创建和修改。除音量外，[音效类](/documentation/404)可以用于控制类组中音效的其他参数。

### 音效混合

音效混合是一种资产类型，可以将动态音效类音量和音高调节器应用于音效类。音效混合是游戏中执行基于类的音量控制（包括压低音量（ducking））的传统方法。

使用无源混音修改器可以实现 **压低音量（Volume ducking）**。该机制可在音效按给定音效类播放时，间接应用混音。例如，当玩家讲话或枪支射击时，游戏背景环境音量会压低。

### 音效参数调制

音频 **参数调制** 插件提供了一种更新的游戏混音控制方法。该插件概括了通过混音更改音频参数的概念。音效现在可以将其参数作为参数总线的 **调制目标** 进行关联。**参数总线** 是一个对象，它允许任意参数调制源写入总线。例如，调制源可以来自蓝图，可以派生自参数混合、来自某些交互式系统，或来自参数调制振荡器（例如LFO）。

参数调制插件不仅可以控制音效的音量参数，还概括了参数调制概念，并允许相同的范例控制任意数量的输出参数（例如滤波器频率截止和音高调制）。

有关更多信息，请参见[音频调制概述](/documentation/zh-cn/unreal-engine/audio-modulation-in-unreal-engine)。

## 并发管理

游戏混音经常被忽视的问题是管理 **音效并发**，本质上是可以同时播放多少给定类型的音效。若无谨慎的管理，游戏很容易生成大量同一类型的音效，如枪支和其他敌人武器。

虚幻音频引擎为音效设计师提供了通过音效并发资产控制其并发组的工具。此资产定义了组中允许的音效数量的限制，以及达到该限制后该怎么做。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49128e45-fa6b-4d87-99be-3efe78ea65eb/concurrency.png)

音效并发功能可以管理允许同时播放的特定类型音效的数量。

例如，音效设计师可以选择在出现新音效时停止最旧的音效，或者拒绝新音效并继续播放正在播放的音效。

音效并发还允许多个组以链的形式发生，此时需要传递一个 **并发分辨率** 层级，以播放音效。

例如，脚步声可能会以并发的形式存在，这就需要限制脚步声的总数。但以此类推，这种情况也可能存在于一组并发的拟音音效中，一组并发的SFX音效中，等等。

有关更多信息，请参见[设置SoundConcurrencySetting](https://docs.unrealengine.com/en-US/BlueprintAPI/Utilities/Struct/MakeSoundConcurrencySettings/index.html)。

### 全局复音管理和优先级

管理可以在游戏中同时播放的音效数称为 **复音管理** 或 **语音管理**。音频引擎的主要开销是解码和渲染声源，因此降低CPU开销的主要方法之一是限制可以同时播放的音效数。

在虚幻引擎中，此数量在项目设置中设置，你可以根据目标平台进行更改。该数量还可以在游戏运行时动态更改，因此在存在性能瓶颈或资源紧张的情况下，音频引擎可以动态减少要渲染的声源数。

音频引擎一旦达到允许渲染的最大音效数，就需要确定要播放的音效以及拒绝或停止的音效。这是根据音效总音量（计入所有舞台的音效的最终音量）和音效优先级来实施的。有关更多信息，请参见[优先级](/documentation/en-us/unreal-engine/API/Runtime/Engine/Sound/USoundBase/Priority)。

## DSP效果处理与综合

虚幻音频引擎还具有强大的 **数字信号处理（DSP）** 效果处理管线。

单独的音效源可以指定要应用于单独源实例的DSP效果链。这些效果的设置可以在运行时在蓝图中更改，并支持在在编辑器中运行（PIE）会话运行时实现实时预览更改。

虚幻音频还具有子混音图表编辑器，可以让音效设计师应用DSP效果，并对混合声源进行分析。你可以在子混音效果链中构造子混音效果。可以指定声源在任何给定子混音上播放，并将其音频作为 **发送效果** *发送* 到任何其他子混音图表。任何声源都可以将其音频动态路由到蓝图中的任何子混音。此外，音效衰减设置支持根据距离将音频发送到子混音效果。有各种可能性。

虚幻音频引擎非常灵活，足以支持规范的主音效设置，例如Master EQ、Master Compression和Master Reverb，同时还支持实验和探索更多自定义DSP图表和路由方案。

多种源效果和子混音效果已经在合成和DSP效果（Synthesis and DSP Effects）插件中实现，新效果也一直在添加。 凭借信号处理模块中不断增长的DSP C++库，可以轻松通过虚幻音频引擎的DSP和合成C++ API添加新效果。

凭借虚幻引擎中其他强大的工具和技术，依托自动属性反映和热加载DLL，虚幻音频引擎成为了了解如何编写DSP效果的理想之所，也是游戏音频技术前沿实验和研究的理想平台。

## 资产烘焙

在为目标平台烘焙时，资产将使用特定于目标平台和音效所用功能的编解码器进行压缩。例如，虚幻引擎将在支持的平台上自动对硬件加速编解码器进行编码。

封装导入资产的 `USoundWave` 提供一个质量滑块，可根据音效设计师为给定资产设定的目标质量，帮助制定烘焙时间压缩方案。该质量值的解释会随目标平台的特定编解码器而异。目标平台的特定编解码器

### 资产压缩重载：自动降低质量

虚幻引擎提供各种工具，音效设计师和工程师可以使用它们控制任何给定目标平台的自动烘焙时间下采样和质量等级下降。这样一来，项目就可以在尽可能广泛的平台上发布，并可尽量减少平台专用内容的重新设计。

例如，在PC上发布的项目若是面向移动平台，则可自动减少资产内存占用。

## 调试和分析

虚幻音频引擎已与虚幻引擎的其余部分完全集成，因此可以利用到虚幻引擎中用于分析CPU使用率和内存的所有其他现有分析工具。在整个虚幻音频引擎以及 **CSV CPU分析** 中都添加了 **低关卡内存（LLM）追踪** 的挂载。此外，[Unreal Insights工具](/documentation/zh-cn/unreal-engine/unreal-insights-in-unreal-engine)可以访问所有音频CPU使用率。

除了所有虚幻引擎开发人员可以使用的全面CPU和内存分析外，还有各种可用于查看和分析游戏中发生的音频事件的调试工具。例如：

-   要查看所有正在播放的声波实例（正在主动生成音效的对象），请在开发者控制台窗口中输入 **stat soundwave**。
-   要查看正在播放的Sound Cue，请在控制台窗口中输入 **stat soundcues**。
-   要在游戏中可视化正在播放的3D音效，请在控制台窗口中输入 **Audio3DVisualize**。

还可以切换各种控制台变量，以便启用和禁用音频引擎的各个组件、启用静音和音效独奏等等。有关调试的更多信息，请参见[FAudioDevice](/documentation/en-us/unreal-engine/API/Runtime/Engine/FAudioDevice)。

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [unreal audio engine](https://dev.epicgames.com/community/search?query=unreal%20audio%20engine)
-   [audio assets](https://dev.epicgames.com/community/search?query=audio%20assets)
-   [audio mixer](https://dev.epicgames.com/community/search?query=audio%20mixer)
-   [sound cues](https://dev.epicgames.com/community/search?query=sound%20cues)
-   [spatialization](https://dev.epicgames.com/community/search?query=spatialization)
-   [attenuation](https://dev.epicgames.com/community/search?query=attenuation)
-   [sound classes](https://dev.epicgames.com/community/search?query=sound%20classes)
-   [sound mixes](https://dev.epicgames.com/community/search?query=sound%20mixes)
-   [polyphony](https://dev.epicgames.com/community/search?query=polyphony)
-   [dsp processing](https://dev.epicgames.com/community/search?query=dsp%20processing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [源资产管理](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E6%BA%90%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86)
-   [导入资产](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E5%AF%BC%E5%85%A5%E8%B5%84%E4%BA%A7)
-   [资产管理工具](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E8%B5%84%E4%BA%A7%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7)
-   [Sound Cue](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#soundcue)
-   [空间化和衰减](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E7%A9%BA%E9%97%B4%E5%8C%96%E5%92%8C%E8%A1%B0%E5%87%8F)
-   [非空间化音效](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E9%9D%9E%E7%A9%BA%E9%97%B4%E5%8C%96%E9%9F%B3%E6%95%88)
-   [空间化音效](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E7%A9%BA%E9%97%B4%E5%8C%96%E9%9F%B3%E6%95%88)
-   [距离衰减](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E8%B7%9D%E7%A6%BB%E8%A1%B0%E5%87%8F)
-   [空间化/衰减正交性](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E7%A9%BA%E9%97%B4%E5%8C%96/%E8%A1%B0%E5%87%8F%E6%AD%A3%E4%BA%A4%E6%80%A7)
-   [距离过滤](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E8%B7%9D%E7%A6%BB%E8%BF%87%E6%BB%A4)
-   [遮蔽](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E9%81%AE%E8%94%BD)
-   [基于听众的衰减](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E5%9F%BA%E4%BA%8E%E5%90%AC%E4%BC%97%E7%9A%84%E8%A1%B0%E5%87%8F)
-   [基于距离的混响发送](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E5%9F%BA%E4%BA%8E%E8%B7%9D%E7%A6%BB%E7%9A%84%E6%B7%B7%E5%93%8D%E5%8F%91%E9%80%81)
-   [Gameplay音频API](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#gameplay%E9%9F%B3%E9%A2%91api)
-   [PlaySound和SpawnSound蓝图API](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#playsound%E5%92%8Cspawnsound%E8%93%9D%E5%9B%BEapi)
-   [游戏音量混合](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E6%B8%B8%E6%88%8F%E9%9F%B3%E9%87%8F%E6%B7%B7%E5%90%88)
-   [直接音量调整](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E7%9B%B4%E6%8E%A5%E9%9F%B3%E9%87%8F%E8%B0%83%E6%95%B4)
-   [音效类](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E9%9F%B3%E6%95%88%E7%B1%BB)
-   [音效混合](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E9%9F%B3%E6%95%88%E6%B7%B7%E5%90%88)
-   [音效参数调制](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E9%9F%B3%E6%95%88%E5%8F%82%E6%95%B0%E8%B0%83%E5%88%B6)
-   [并发管理](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E5%B9%B6%E5%8F%91%E7%AE%A1%E7%90%86)
-   [全局复音管理和优先级](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E5%85%A8%E5%B1%80%E5%A4%8D%E9%9F%B3%E7%AE%A1%E7%90%86%E5%92%8C%E4%BC%98%E5%85%88%E7%BA%A7)
-   [DSP效果处理与综合](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#dsp%E6%95%88%E6%9E%9C%E5%A4%84%E7%90%86%E4%B8%8E%E7%BB%BC%E5%90%88)
-   [资产烘焙](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E8%B5%84%E4%BA%A7%E7%83%98%E7%84%99)
-   [资产压缩重载：自动降低质量](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E8%B5%84%E4%BA%A7%E5%8E%8B%E7%BC%A9%E9%87%8D%E8%BD%BD%EF%BC%9A%E8%87%AA%E5%8A%A8%E9%99%8D%E4%BD%8E%E8%B4%A8%E9%87%8F)
-   [调试和分析](/documentation/zh-cn/unreal-engine/audio-engine-overview-in-unreal-engine#%E8%B0%83%E8%AF%95%E5%92%8C%E5%88%86%E6%9E%90)