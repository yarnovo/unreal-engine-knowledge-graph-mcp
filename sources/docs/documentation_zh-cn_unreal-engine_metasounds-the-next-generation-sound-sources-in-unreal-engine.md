# MetaSounds：次世代声源系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:22:42.435Z

---

目录

![MetaSounds：次世代声源系统](https://dev.epicgames.com/community/api/documentation/image/938d0cd9-79ef-4092-9648-8bb068093d4c?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

## MetaSounds简介

虚幻引擎5中采用了 **MetaSounds** ，这是一个高性能的音频系统，能够让音频设计师全面控制数字信号处理（DSP）图表，从而构建下一代声源。

MetaSounds支持进行用户自定义、第三方可扩展、图表重复利用，并提供了可以在编辑器中进行声音设计的强大工具。

## 完全流程性的音频引擎

MetaSounds不同于Sound Cues，基本上就是一个数字信号处理（DSP）渲染图表。这让音频设计师可以构建强大的流程性音频系统，从而实现"准确到采样级别"的计时和在音频缓冲区层次进行控制。

利用MetaSounds，音频设计师可以在运行时同步生成音频，并将按流程生成的声音与其他音频源进行混合和匹配。

MetaSounds还设计为能够与游戏数据和玩家交互进行轻松集成，从而创造出根据gameplay事件触发的沉浸式体验。

## 音频设计师可以进行更多控制

每个Metasound都是它自己的音频渲染引擎。它们并行渲染，具有基本上独立的渲染格式（例如采样率、缓冲区大小、信道数量）。

Metasound是在新的 **Metasound编辑器（MetaSound Editor）** 中创建的，即使没有编程经验的音频设计师也可以使用基于节点的界面来创建流程化声音。编辑器支持实时预览所有音频输入参数，并且包含多个随时可用的节点，能够为整个音频渲染流水线提供详细的控制选项。

Metasound编辑器在输出、图表内控件上配备了实时仪表，可以控制和可视化参数（旋钮和滑块），并提供了按钮来实时地与事件进行交互。

## 对音频进行准确到采样级别的控制

Metasound对音频源提供准确到采样级别的控制。"准确到采样级别"指的是能够按照单个音频采样的顺序来进行计时。换而言之，如果采样率为每秒48,000个采样，那么准确到采样级别的事件将具有1/48,000秒（或者0.02毫秒）计时分辨率。

Metasound通过集中不同的方式来支持准确到采样级别的控制。Metasound触发器在图表中执行准确到采样级别的事件。触发器可以来自gameplay事件、Metasound节点或图表本身。

MetaSound Wave Player节点提供准确到采样级别的串联。这意味着，当完成声波的播放时，将会无缝播放下一个排队的声波，而不会出现声音卡顿或中断。

很多Metasound节点参数都可以通过音频缓冲区来进行调谐，从而实现"音频-速率"参数式调谐。这样可以使用强大的合成和声音设计技术。

## 优化了工作流

对于Metasound，可以通过预设来重复使用和引用其图表。预设引用现有的Metasound图表，而你可以重载图表的输入。

这样可以显著提升生产力，因为现在可以在单个图表中具有不同的预设，而每个预设又引用一个基本图表。这些预设将包含相同基本图表的特有不同之处。如果没有预设，则可能必须为不同的变体管理数百个可能相似的图表。

使用预设的另一个优势在于，能够更新基本图表，将更改自动传播到引用该图表的任何预设。这同样可以显著提升整个开发流程的生产力。

除了预设，Metasound还提供了图表复合功能，能够在其他Metasound图表中直接使用Metasound。此外，还可以在任何其他Metasound图表中创建和使用自定义Metasound节点。这些自定义节点可以定义其输入和输出，并提供提示文本和版本变动信息。

通过这种方式，可以构建通用功能节点的存储库，并在多个图表中重复使用。与预设相似，自定义Metasound节点可以将其更改自动传播到引用这些节点的任何Metasound中，进一步在复杂和多变的项目中提高生产力。

## 性能更高

Metasound异步渲染到主音频混音器，而所使用的架构和任务与用于异步解码声音源的架构和任务相同。

每个Metasound DSP图表都自动转换成经过优化的静态非虚拟C++ object，数据在节点之间通过引用进行传递，而不是通过复制。这可以避免此类系统的常见缺点，例如解译的位码运行时、昂贵的虚拟功能开支以及数据复制。

## 可以成长的节点库

Metasound随附了可以成长的Metasound节点库，其中提供了数量众多的强大选项，可以处理流程性声音设计和音乐。

库中提供了具有多种功能的Wave Player节点，支持搜索、循环点、准确到采样级别的串联、音高比例调谐和从音频文件中的提示点进行读取。

其他节点包含各种各样的库，例如触发器工具、DSP数学运算、DSP筛选器、动态处理、空间化、实时合成生成器等。

## 可移动并且可扩展

可以使用Metasound的C++节点API，通过第三方插件来扩展Metasound。

为Metasound编辑器创建新节点时，需要创建C++类，编程人员可以在其中定义节点的输入和输出，以及执行回调。此类还包含实际音频渲染代码和逻辑。可以在单个".cpp"文件中编写，只需要几百行代码。

## 丰富的Gameplay交互

Metasound接受自定义用户输入参数，类似于材质和Niagara视觉特效处理系统中使用的输入参数。这些参数可以通过音频组件参数界面连接到Gameplay系统，或者直接在蓝图宏，或者在Gameplay C++代码中。

此外，Metasound已经与参数调谐插件集成，该插件是可选的，所提供的系统可以从任何调谐源（包括从蓝图）写入到调谐总线资产中。 Metasound现在可以从参数总线进行读取，这意味着可以使用它们来对任何Metasound系统进行调谐。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound](https://dev.epicgames.com/community/search?query=sound)
-   [metasounds](https://dev.epicgames.com/community/search?query=metasounds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [MetaSounds简介](/documentation/zh-cn/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine#metasounds%E7%AE%80%E4%BB%8B)
-   [完全流程性的音频引擎](/documentation/zh-cn/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine#%E5%AE%8C%E5%85%A8%E6%B5%81%E7%A8%8B%E6%80%A7%E7%9A%84%E9%9F%B3%E9%A2%91%E5%BC%95%E6%93%8E)
-   [音频设计师可以进行更多控制](/documentation/zh-cn/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine#%E9%9F%B3%E9%A2%91%E8%AE%BE%E8%AE%A1%E5%B8%88%E5%8F%AF%E4%BB%A5%E8%BF%9B%E8%A1%8C%E6%9B%B4%E5%A4%9A%E6%8E%A7%E5%88%B6)
-   [对音频进行准确到采样级别的控制](/documentation/zh-cn/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine#%E5%AF%B9%E9%9F%B3%E9%A2%91%E8%BF%9B%E8%A1%8C%E5%87%86%E7%A1%AE%E5%88%B0%E9%87%87%E6%A0%B7%E7%BA%A7%E5%88%AB%E7%9A%84%E6%8E%A7%E5%88%B6)
-   [优化了工作流](/documentation/zh-cn/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine#%E4%BC%98%E5%8C%96%E4%BA%86%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [性能更高](/documentation/zh-cn/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine#%E6%80%A7%E8%83%BD%E6%9B%B4%E9%AB%98)
-   [可以成长的节点库](/documentation/zh-cn/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine#%E5%8F%AF%E4%BB%A5%E6%88%90%E9%95%BF%E7%9A%84%E8%8A%82%E7%82%B9%E5%BA%93)
-   [可移动并且可扩展](/documentation/zh-cn/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine#%E5%8F%AF%E7%A7%BB%E5%8A%A8%E5%B9%B6%E4%B8%94%E5%8F%AF%E6%89%A9%E5%B1%95)
-   [丰富的Gameplay交互](/documentation/zh-cn/unreal-engine/metasounds-the-next-generation-sound-sources-in-unreal-engine#%E4%B8%B0%E5%AF%8C%E7%9A%84gameplay%E4%BA%A4%E4%BA%92)