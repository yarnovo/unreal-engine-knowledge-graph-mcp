# 虚幻引擎中的MetaSound函数节点参考指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:23:12.952Z

---

目录

![MetaSound函数节点参考指南](https://dev.epicgames.com/community/api/documentation/image/e84da5a9-be06-430b-b3ac-ce0e73ebee2e?resizing_type=fill&width=1920&height=335)

MetaSound **函数** 节点有许多不同类型，提供了播放音频文件、混合声音、应用滤波器和效果等所需的功能。本文档含有函数节点列表及每个函数节点的详细信息。

如需详细了解MetaSound中可用的功能，请参阅[MetaSound参考指南](/documentation/zh-cn/unreal-engine/metasounds-reference-guide-in-unreal-engine)。

## 通用

### BPM To Seconds

![BPM To Seconds](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12c0917e-f77e-400a-b35b-96e145457356/general_bpm_to_seconds.png)

**BPM To Seconds** 节点根据给定的每分钟拍子数（BPM）、拍子乘数和全音划分来计算拍子时间，以秒为单位。

#### BPM To Seconds输入

输入

说明

**BPM**

输入目标BPM。

**拍子乘数（Beat Multiplier）**

要应用于BPM的乘数值。

**全音划分（Division of Whole Note）**

全音的划分。

#### BPM To Seconds输出

输出

说明

**秒（Seconds）**

输出拍子时间，以秒为单位。

### Envelope Follower

![Envelope Follower](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10efdd70-a2c7-4ff7-9ce8-813300356e84/general_envelope_follower.png)

**Envelope Follower** 节点从输入音频信号输出波封。

#### Envelope Follower输入

输入

说明

**输入（In）**

输入音频信号。

**起音时间（Attack Time）**

起音时间（以秒为单位）。

**释音时间（Release Time）**

释音时间（以秒为单位）。

**峰值模式（Peak Mode）**

波封跟踪器的跟踪方法：

-   **MS** ：波封跟踪音频信号的流水式均方。
-   **RMS** ：波封跟踪音频信号的流水式均方根。
-   **峰值（Peak）** ：波封跟踪音频信号中的峰值。

#### Envelope Follower输出

输出

说明

**波封（Envelope）**

输出波封值（区块速率）。

**音频波封（Audio Envelope）**

输出波封值（音频速率）。

### Flanger

![Flanger](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aecc5cc2-989d-476d-a3b8-3b320f335d28/general_flanger.png)

**Flanger** 节点将镶边器效果应用于输入音频。

#### Flanger输入

输入

说明

**输入音频（In Audio）**

要将镶边器效果应用到的输入音频信号。

**调制速率（Modulation Rate）**

变化延迟时间的低频振荡器（LFO）速率（以赫兹为单位）。该值限制为区块速率。

**调制深度（Modulation Depth）**

缩放延迟时间的LFO振幅（强度）。

**中心延迟（Center Delay）**

中心延迟量（以毫秒为单位）。

**混音级别（Mix Level）**

原始和延迟信号之间的平衡。值应该介于0到1.0之间。例如，值为0.5时将使用同等数量的每种信号，值大于0.5时使用的延迟信号多于非延迟信号。

#### Flanger输出

输出

说明

**输出音频（Out Audio）**

应用镶边器效果的输出音频信号。

### Get WaveTable From Bank

![Get WaveTable From Bank](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3924b903-b97e-405d-bce1-f934d93c7deb/general_get_wavetable_from_bank.png)

**Get WaveTable From Bank** 节点从给定的波表库资产检索（或生成内插）波表。

#### Get WaveTable From Bank输入

输入

说明

**WaveTableBank**

作为内插波表检索或生成来源的波表库资产。

**TableIndex**

要检索的波表的索引。如果设置在两个整数值之间，则位于两个最近索引处的波表会混合在一起。如果设置的数值超出波表库的范围，则将调整该数值以进行循环。例如，如果波表库有3个索引，则数值3.0将检索索引0处的波表。

#### Get WaveTable From Bank输出

输出

说明

**Out**

检索的波表。

### InterpTo

![InterpTo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b18ed931-b06f-4ff8-a009-e0671bd24ff2/general_interpto.png)

**InterpTo** 节点在指定时间内的当前值和目标值之间插值。

#### InterpTo输入

输入

说明

**插值时间（Interp Time）**

要从当前值插值到目标值的时间。

**目标（Target）**

要插值到的值。

#### InterpTo输出

输出

说明

**值（Value）**

当前值。

### RingMod

![RingMod](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d1e77c7-4d92-4da3-acd8-7c84dd7afe88/general_ringmod.png)

**RingMod** 节点使用载波信号和调制器信号执行环形调制。

#### RingMod输入

输入

说明

**载波输入（In Carrier）**

载波音频信号。

**调制器输入（In Modulator）**

调制器音频信号。

#### RingMod输出

输出

说明

**音频输出（Out Audio）**

调制音频信号。

### Wave Player

![Wave Player](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9d80fc3-bc72-4e8a-a543-c3da1cd6471b/general_wave_player.png)

**Wave Player** 节点用于播放声波资产。此节点有多个版本，用于支持多个不同的通道配置，如单声道、立体声、四声道（4.0）、5.1和7.1。

#### Wave Player输入

输入

说明

**播放/停止（Play/Stop）**

播放和停止触发器按精确到采样的时刻开始和停止Wave Player播放。

**波形资产（Wave Asset）**

Wave Player在播放期间播放的声波资产。此资产使用与虚幻引擎中所有其他声源相同的实时解码器。

**开始时间（Start Time）**

声波资产中开始播放音频文件的时间。这也称为寻道时间。

**音高位移（Pitch Shift）**

要用于Wave Player的音高变化。这以半音为单位定义，以适应频率缩放的非线性性质。

**循环（Loop）**

Wave Player是循环播放音频文件还是在完成时停止。这可以在播放期间随时通过图表切换。

**循环起点（Loop Start）**

循环起点指示Wave Player循环播放音频文件的时间点。

**循环时长（Loop Duration）**

循环时长代表循环播放的总时间。除-1外的值会将循环的终点设置为循环起始和循环时长值的总和，而使用值-1时将循环播放整个音频文件。

#### Wave Player输出

输出

说明

**播放时（On Play）**

在Wave Player的输入播放引脚触发时触发。

**完成时（On Finished）**

在Wave Player完成音频文件播放时触发。音频文件完成播放时，此引脚将在同一取样点触发。

**接近完成时（On Nearly Finished）**

在音频文件即将完成播放之前，在音频渲染区块上触发。这通常用于循环播放并为Wave Player选择新的音频文件变体。

**循环时（On Looped）**

在声音基于循环设置循环的取样上触发。

**出现提示点时（On Cue Point）**

在Wave Player中解析提示点时触发。提示点是在导入时嵌入到音频波形文件中的元数据。

音效设计师通常使用提示点在确切的时间点触发音频中的事件或循环点。借助此功能，音效设计师可以根据导入音频波形文件中的嵌入数据以程序化方式触发MetaSound行为。

此引脚在执行时准确到采样级别，但与提示点关联的整型和标签按区块速率读取。音频波形文件中比MetaSound的区块速率更近的提示点将仅在该区块中的最后一个提示点上触发。

**提示点ID（Cue Point ID）**

从导入的音频波形文件解析的提示点ID。

**提示点标签（Cue Point Label）**

从导入的音频波形文件解析的提示点标签。

**循环百分比（Loop Percent）**

给定循环区域中音频波形文件中的当前位置。

**播放位置（Playback Location）**

音频波形文件中占音频波形文件总长度一部分的当前位置。

**输出X（Out X）**

输入声波资产文件的X声道输出。

对于单声道文件播放，左右声道中的音频使用单声道复制进行上混。

### WaveShaper

![WaveShaper](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a6915b6-82b6-4714-87f5-64b7a645a152/general_waveshaper.png)

**WaveShaper** 节点将非线性塑形应用于输入音频信号。

#### WaveShaper输入

输入

说明

**输入（In）**

要将非线性塑形应用到的输入音频信号。

**数量（Amount）**

要应用的非线性波形塑形数量。

**偏差（Bias）**

要在波形塑形之前应用的DC偏移。

**OutputGain**

要在处理之后应用的增益数量。

**类型（Type）**

要用于处理音频的算法类型：**Sine** 、 **Inverse Tangent** 、 **Hyperbolic Tangent** 、 **Cubic Polynomial** 或 **Hard Clip**

#### WaveShaper输出

输出

说明

**输出（Out）**

应用非线性塑形的输出音频信号。

## 数组

**数组（Array）** 函数提供了在MetaSound中操控数组的选项。其中每个函数有不同的版本，允许它们支持多种常见数据类型的数组，包括：布尔、浮点、Int32、字符串、时间、传输:地址、AudioBusAsset、WaveTableBankAsset和WaveAsset。

### Concatenate

![Concatenate](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8e2c70b-de6a-48b4-9ac2-4f7bba6ff4d6/array_concatenate.png)

**Concatenate** 节点连接给定触发器上的两个数组。

#### Concatenate输入

输入

说明

**触发器（Trigger）**

在其上连接输入数组的触发器。

**左/右数组（Left / Right Array）**

输入数组。

#### Concatenate输出

输出

说明

**数组（Array）**

连接的数组。

### Get

![Get](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c99fd68-32a1-418e-998b-d7ad5ac67a4d/array_get.png)

**Get** 节点从数组按给定索引检索元素。

你可以改用 **Get Last Index** 节点访问数组的最后一个索引。

#### Get输入

输入

说明

**触发器（Trigger）**

在其上检索指定数组元素的触发器。

**数组（Array）**

从中检索元素的数组。

**索引（Index）**

要检索的元素的索引。

#### Get输出

输出

说明

**元素（Element）**

检索的元素的值。

### Num

![Num](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bb8e92c-93cf-463e-835b-8fde1768ab0e/array_num.png)

**Num** 节点返回给定数组中的元素数量。

#### Num输入

输入

说明

**数组（Array）**

将计算其元素数量的数组。

#### Num输出

输出

说明

**数量（Num）**

给定数组中元素的数量。

### Random Get

![Random Get](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a4ae60b-f5f0-4f6e-b805-5e4831334432/array_random_get.png)

**Random Get** 节点从输入数组随机检索元素。可以选择提供权重数组来调整随机性。

#### Random Get输入

输入

说明

**下一个（Next）**

在其上获取数组中下一个随机值的触发器。

**重置（Reset）**

在其上重置数组的随机化种子的触发器。

**输入数组（In Array）**

要从中随机检索元素的输入数组。

**权重（Weights）**

（可选）用于定义每个条目被检索到的概率的权重输入数组。如果不提供，将为所有元素采用均等的概率。如果此数组短于输入数组，它将重复，直至匹配大小。

**种子（Seed）**

用于随机打乱的种子。使用默认值-1时将使用当前时间。

**无重复（No Repeats）**

要追踪以避免连续重复的元素数量。例如，使用值2时，可防止此节点重复最后两个所选元素。

**启用共享状态（Enabled Shared State）**

启用后，此节点的状态将在此MetaSound的实例之间共享，避免同时播放完全相同的变体。

#### Random Get输出

输出

说明

**下一个时（On Next）**

在触发"下一个（Next）"输入时触发。

**重置时（On Reset）**

在触发"打乱（Shuffle）"输入时或数组自动打乱时触发。

**值（Value）**

从输入数组随机选择的值。

### Set

![Set](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cc6a2bf-66d2-42c7-a483-22dd348e8058/array_set.png)

**Set** 节点在给定数组中设置指定索引的值。

#### Set输入

输入

说明

**触发器（Trigger）**

在其上设置数组中的值的触发器。

**数组（Array）**

将在其中设置值的数组。

**索引（Index）**

要在目标数组中设置的索引。

**值（Value）**

要将所选索引设置为的值。

#### Set输出

输出

说明

**数组（Array）**

完成设置操作之后的数组。

### Shuffle

![Shuffle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/311d4405-1184-4627-af3e-a54a274fa2f5/array_shuffle.png)

**Shuffle** 节点输出打乱的数组中的元素。

#### Shuffle输入

输入

说明

**下一个（Next）**

在其上获取打乱的数组中下一个值的触发器。

**打乱（Shuffle）**

在其上手动打乱数组的触发器。

**重置种子（Reset Seed）**

在其上重置随机种子流的触发器。

**输入数组（In Array）**

从中打乱和输出元素的数组。

**种子（Seed）**

用于随机打乱的种子。使用默认值-1时将使用当前时间。

**自动打乱（Auto Shuffle）**

启用后，将在数组已被完全读取时自动打乱。

**启用共享状态（Enabled Shared State）**

启用后，该状态将在此MetaSound的实例之间共享。

#### Shuffle输出

输出

说明

**下一个时（On Next）**

在触发"下一个（Next）"输入时触发。

**打乱时（On Shuffle）**

在触发"打乱（Shuffle）"输入时或数组自动打乱时触发。

**重置种子时（On Reset Seed）**

在触发"重置种子（Reset Seed）"输入时触发。

**值（Value）**

当前所选元素的值。

### Subset

![Subset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85213e32-c8a6-473d-af41-c8c224e6f035/array_subset.png)

**Subset** 节点返回输入数组的子集。

#### Subset输入

输入

说明

**触发器（Trigger）**

在其上生成子集的触发器。

**数组（Array）**

要从中获取子集的输入数组。

**开始/结束索引（Start / End Index）**

要包含在子集内的第一个和最后一个索引。

#### Subset输出

输出

说明

**数组（Array）**

输入数组的子集。

## 调试

### Get Wave Info

**Get Wave Info** 节点返回声波资产的信息。

#### Get Wave Info输入

输入

说明

**波形（Wave）**

输入声波资产。

#### Get Wave Info输出

输出

说明

**时长（Duration）**

声波资产的时长（以秒为单位）。

**名称（Name）**

声波资产的名称。

**路径（Path）**

声波资产的完整路径。

### Print Log

![Print Log](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/885f3e79-6d87-4846-92bf-1a98237b2663/debug_print_log.png)

**Print Log** 节点用于将值记录到给定触发器上的输出日志，用于调试。此节点有多个版本，以便支持多种常见数据类型，包括：布尔、浮点、Int32和字符串。

#### Print Log输入

输入

说明

**触发器（Trigger）**

在其上将设置值写入日志的触发器。

**标签（Label）**

要附加到所记录值的标签。

**要记录的值（Value To Log）**

触发时要记录到日志的值。

## 延迟

### Delay

![Delay](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1bb92d34-8f20-4e97-bf96-8f5ff7f463e1/delays_delay.png)

**Delay** 节点提供支持干度、湿度和反馈的单声道缓冲区延迟。对于多声道缓冲区延迟，请使用 **Stereo Delay** 节点。

#### Delay输入

输入

说明

**输入（In）**

要应用延迟的音频信号。

**延迟时间（Delay Time）**

延迟音频的时间长度（以秒为单位）。

**干度（Dry Level）**

未处理（干）信号的程度

**湿度（Wet Level）**

已处理（湿）信号的程度。

**反馈（Feedback）**

要使用的反馈数量。

**最长延迟时间（Max Delay Time）**

要使用的反馈量。

#### Delay输出

输出

说明

**输出（Out）**

延迟的音频信号。

### Delay Pitch Shift

![Delay Pitch Shift](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cfa27e0-4cca-4872-8df0-02881b9b94f0/delays_delay_pitch_shift.png)

**Delay Pitch Shift** 节点使用基于延迟的多普勒频移方法对音频缓冲区进行音高移位。这样便可使用内部延迟缓冲区在不改变音频文件长度的情况下进行音高移位。音高会移位，但声音不会加快或减慢。

#### Delay Pitch Shift输入

输入

说明

**输入（In）**

要处理的音频缓冲区。

**音高移位（Pitch Shift）**

要应用的音高移位量（以半音为单位）。

**延迟长度（Delay Length）**

要应用的延迟量（介于10和100毫秒之间）。更改此值可以减少某些音高移位区域中的瑕疵。

#### Delay Pitch Shift输出

输出

说明

**输出（Out）**

已处理的音频缓冲区。

### Diffuser

![Diffuser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8e0f719-b3a8-49f8-9a0d-7b76c8f4ec5a/delays_diffuser.png)

**Diffuser** 节点将漫反射应用于传入音频。

#### Diffuser输入

输入

说明

**输入音频（Input Audio）**

要应用扩散的音频。

**深度（Depth）**

要用于扩散音频的滤波器数量（1到5之间）。这不会在运行期间更新。

**反馈（Feedback）**

要用于每个扩散器的反馈数量（0到1之间）。

#### Diffuser输出

输出

说明

**输出音频（Output Audio）**

扩散的音频。

### Grain Delay

![Grain Delay](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26d11686-be97-4650-bc20-e89c166eaffb/delays_grain_delay.png)

**Grain Delay** 节点可对给定音频缓冲区进行"颗粒"采样，并在设置的延迟后播放它们，从而执行延迟的音频颗粒化。

#### Grain Delay输入

输入

说明

**音频输入（In Audio）**

要进行粒度延迟的音频缓冲区。

**颗粒生成（Grain Spawn）**

要在其上生成新音频颗粒的触发器。

**颗粒延迟（Grain Delay）**

生成下一个颗粒的延迟（以毫秒为单位，介于0和2000之间）。

**颗粒延迟范围（Grain Delay Range）**

用于相对于中心颗粒延迟数值随机化延迟的范围增量（以毫秒为单位）。

**颗粒时长（Grain Duration）**

生成的下一个颗粒的时长（以毫秒为单位）。

**颗粒时长范围（Grain Duration Range）**

用于相对于中心颗粒时长数值随机化时长的范围增量（以毫秒为单位）。

**音高移位（Pitch Shift）**

用于更改所有渲染颗粒的颗粒音高的音高数值（以半音为单位）。

**音高移位范围（Pitch Shift Range）**

用于相对于中心音高移位数值随机化音高移位的音高移位增量（以半音为单位）。

**颗粒波封（Grain Envelope）**

用于颗粒的波封类型：**高斯（Gaussian）** 、 **三角形（Triangle）** 、 **倒三角形（Downward Triangle）** 、 **正三角形（Upward Triangle）** 、 **指数式衰减（Exponential Decay）** 或 **指数式起音（Exponential Attack）**

**最大颗粒数（Max Grain Count）**

一次最多渲染的颗粒数（介于1和100之间）。

**反馈量（Feedback Amount）**

每个颗粒的反馈量。如果应用反馈，则颗粒延迟会将其音频输出反馈回其自身。

**最大颗粒数（Max Grain Count）** 输入会耗费CPU资源，因此将其设置为高数值会降低性能并引入削波。

#### Grain Delay输出

输出

说明

**音频输出（Out Audio）**

颗粒延迟音频缓冲区。

### Stereo Delay

![Stereo Delay](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51af0700-b8c5-4679-8bb9-f609c043fbc5/delays_stereo_delay.png)

**Stereo Delay** 节点提供多声道缓冲区延迟。与提供单声道缓冲区延迟的 **Delay** 节点一样，此节点支持干度、湿度和反馈，但也支持其他延迟模式。

#### Stereo Delay输入

输入

说明

**左入/右入（In Left / Right）**

要应用延迟的输入音频信号（左声道/右声道）。

**延迟模式（Delay Mode）**

要使用的延迟方法：

-   **正常（Normal）** ：左声道输入与左声道延迟输出混合，并反馈到左声道输出。
-   **交叉（Cross）** ：左声道输入与右声道延迟输出混合，并反馈到右声道输出。
-   **乒乓效应（Ping Pong）** ：左声道输入与左声道延迟输出混合，并反馈到右声道输出。

**延迟时间（Delay Time）**

延迟音频的时间长度（以秒为单位）。

**延迟率（Delay Ratio）**

要应用于左右声道的延迟率。这意味着声道可以有不同的延迟量。例如，值为-1时不会向左声道应用延迟，同时完全延迟右声道，这对于立体声声道的去相关很有用。

**干度（Dry Level）**

未处理（干）信号的程度

**湿度（Wet Level）**

已处理（湿）信号的程度。

**反馈（Feedback）**

要使用的反馈数量。

#### Stereo Delay输出

输出

说明

**左出/右出（Out Left / Right）**

输出音频信号（左声道/右声道）。

## 动态范围

### Compressor

![Compressor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c3b17a7-f7b5-4eee-9a0a-466286b9eb9b/dynamics_compressor.png)

**Compressor** 节点降低输入音频信号的动态范围。

#### Compressor输入

输入

说明

**音频（Audio）**

要压缩的音频信号。

**比率（Ratio）**

要应用的增益缩减比率。例如，值为1时不产生增益缩减，值大于1时产生增益缩减。

**阈值dB（Threshold dB）**

振幅阈值（以分贝为单位），高于阈值将缩减增益。

**起音时间（Attack Time）**

高于阈值（dB）的音频达到压缩音量水平所需的时间长度。

**释音时间（Release Time）**

低于阈值（dB）的音频恢复原始音量水平所需的时间长度。

**先行时间（Lookahead Time）**

在分析的输入信号之后延迟压缩信号所需的时间长度。

**拐点（Knee）**

确定增益缩减混合的软硬程度的分贝值。值为0 dB时没有混合。

**侧链（Sidechain）**

（可选）用于控制压缩器的外部音频信号。如果未设置，将使用输入音频信号。

**波封模式（Envelope Mode）**

压缩器将用于增益检测的波封跟踪方法：

-   **MS** ：波封跟踪音频信号的流水式均方。
-   **RMS** ：波封跟踪音频信号的流水式均方根。
-   **峰值（Peak）** ：波封跟踪音频信号中的峰值。

**模拟模式（Analog Mode）**

启用后，则将模拟模式用于压缩器的波封跟踪器。

**向上模式（Upwards Mode）**

启用后，将使用向上压缩器，而不是标准的向下压缩器。

**湿/干（Wet/Dry）**

已处理（湿）和未处理（干）信号之间的比率。例如，值为0表示全干，值为1表示全湿。

#### Compressor输出

输出

说明

**音频（Audio）**

应用压缩器效果的输出音频信号。

**增益波封（Gain Envelope）**

应用于信号的增益数量。

### Decibels to Linear Gain

![Decibels to Linear Gain](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc1e44f6-c38d-4cff-8b4c-87fe37722503/dynamics_decibels_to_linear_gain.png)

**Decibels to Linear Gain** 节点将对数（dB）增益值转换为线性增益值。

#### Decibels to Linear Gain输入

输入

说明

**分贝（Decibels）**

输入对数（dB）增益值。

#### Decibels to Linear Gain输出

输出

说明

**线性增益（Linear Gain）**

输出线性增益值。

### Limiter

![Limiter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/46acb9fc-4396-4957-921b-39134c56321b/dynamics_limiter.png)

**Limiter** 节点防止信号超出给定阈值。

#### Limiter输入

输入

说明

**音频（Audio）**

要限制的输入音频信号。

**输入增益dB（Input Gain dB）**

要在达到限制之前应用于输入的增益数量（以分贝为单位）。

**阈值dB（Threshold dB）**

振幅阈值（以分贝为单位），高于阈值将缩减增益。

**释音时间（Release Time）**

低于阈值的音频恢复原始音量水平所需的时间。

**拐点（Knee）**

拐点模式确定增益缩减混合是 **硬** 还是 **软** 。

#### Limiter输出

输出

说明

**音频（Audio）**

受限的音频信号。

### Linear Gain to Decibels

![Linear Gain to Decibels](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a59ef058-b0cd-4060-8caf-fcbb93b85660/dynamics_linear_gain_to_decibels.png)

**Linear Gain to Decibels** 节点将线性增益值转换为对数（dB）增益值。

#### Linear Gain to Decibels输入

输入

说明

**线性增益（Linear Gain）**

输入线性增益值。

#### Linear Gain to Decibels输出

输出

说明

**分贝（Decibels）**

输出对数（dB）增益值。

## Envelope

MetaSound提供了 **Envelope** 节点，这样音频设计师可以随时间推移更改音效的各个方面。除 **WaveTable Envelope** 和 **Evaluate WaveTable** 节点外，每种类型的波封节点都有两个不同的版本，用于支持音频（音频速率）和浮点（区块速率）数据类型。

音频设计师可以使用节点中包含的各种曲线值自定义其曲线值。对于起音时间值，小于1.0的曲线值是对数曲线（开始上升很快，在结束时放缓），大于1.0的值是指数曲线（开始时上升很慢，在接近结束时加快）。衰减和释音曲线的行为相反。这些曲线在值为1.0时是线性曲线。

### AD Envelope

![AD Envelope](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b6657fc-3875-4931-8c8d-c323c7f80299/envelopes_ad_envelope.png)

**AD Envelope** 节点在触发时生成起音衰减波封值输出。

该节点提供了额外的选项，用于循环起音-衰减曲线，方式与低频振荡器（LFO）或波形发生器相似。与 **Map Range** 节点配对时，这可在各种应用中带来极好的效果。

#### AD Envelope输入

输入

说明

**触发器（Trigger）**

在其上开始波封发生器的起音阶段的触发器。

**起音时间（Attack Time）**

达到最大波封值（1.0）的时间长度（以秒为单位）。

**延迟时间（Delay Time）**

达到最小波封值（0.0）的时间长度（以秒为单位）。

**起音曲线（Attack Curve）**

起音阶段的指数曲线因子。例如，值为1.0时产生线性增长，值小于1.0时产生对数增长，值大于1.0时产生指数增长。

**衰减曲线（Decay Curve）**

衰减阶段的指数曲线因子。例如，值为1.0时产生线性衰减，值大于1.0时产生对数衰减，值小于1.0时产生指数衰减。

**循环（Looping）**

启用后，波封将循环。

#### AD Envelope输出

输出

说明

**触发时（On Trigger）**

在波封被触发时触发。

**完成时（On Done）**

当触发波封完成或向后循环（如果启用了循环）时触发。

**输出波封（Out Envelope）**

波封的输出值。

### ADSR Envelope

![ADSR Envelope](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1bb2074-b687-45cb-8eb7-7efbec011bc8/envelopes_adsr_envelope.png)

**ADSR Envelope** 节点在触发时生成"起音-衰减-延持-释音"波封值输出。该节点与 **AD Envelope** 节点相似，但需要单独的释音触发器，波封的释音阶段才能开始。

#### ADSR Envelope输入

输入

说明

**触发器起音（Trigger Attack）**

在其上开始波封发生器的起音阶段的触发器。

**触发器释音（Trigger Release）**

在其上开始波封发生器的释音阶段的触发器。

**起音时间（Attack Time）**

达到最大波封值（1.0）的时间长度（以秒为单位）。

**延迟时间（Delay Time）**

达到最小波封值（0.0）的时间长度（以秒为单位）。

**延持水平（Sustain Level）**

波封的延持水平。

**释音时间（Release Time）**

波封的释音时间。

**起音曲线（Attack Curve）**

起音阶段的指数曲线因子。例如，值为1.0时产生线性增长，值小于1.0时产生对数增长，值大于1.0时产生指数增长。

**衰减曲线（Decay Curve）**

衰减阶段的指数曲线因子。例如，值为1.0时产生线性衰减，值大于1.0时产生对数衰减，值小于1.0时产生指数衰减。

**释音曲线（Release Curve）**

释音阶段的指数曲线因子。例如，值为1.0时产生线性释音，值大于1.0时产生对数释音，值小于1.0时产生指数释音。

#### ADSR Envelope输出

输出

说明

**触发起音时（On Attack Triggered）**

在触发波封起音阶段时触发。

**触发衰减时（On Decay Triggered）**

在触发波封衰减阶段时触发。

**触发延持时（On Sustain Triggered）**

在触发波封延持阶段时触发。

**触发释音时（On Release Triggered）**

在触发波封释音阶段时触发。

**完成时（On Done）**

在波封完成时触发。

**输出波封（Out Envelope）**

波封的输出值。

### Crossfade

![Crossfade](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0f2acac-b265-46c6-a6cf-3cc740457c4d/envelopes_crossfade.png)

**Crossfade** 节点使用提供的区块速率浮点参数在输入之间线性混合。该节点有多个版本，可支持不同的输入数量（2到8之间）。

#### Crossfade输入

输入

说明

**交叉过渡值（Crossfade Value）**

表示提供的输入之间的当前混合的值。例如，值为0.5时，输入值2和4将产生输出3。

**输入X（In X）**

与位置X对应的输入。

#### Crossfade输出

输出

说明

**输出（Out）**

从交叉过渡生成的值。

### Evaluate WaveTable

![Evaluate  WaveTable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/985b2a8f-9c9a-43fc-866f-0672b63b3741/envelopes_evaluate_wavetable.png)

**Evaluate WaveTable** 节点在给定的输入相位输出波表的值，从而让你能将波表用作图表中的曲线。

#### Evaluate WaveTable输入

输入

说明

**波表（WaveTable）**

需要求值的波表。

**输入（Input）**

用于求值波表的输入。此值限制为0.0到1.0的范围。

**插值（Interpolation）**

在波表值之间插值的方法，分为：**无（步骤）（None (Step)）** 、 **线性（Linear）** 或 **三次（Cubic）**

#### Evaluate WaveTable输出

输出

说明

**输出（Output ）**

当前的插值。

### WaveTable Envelope

![WaveTable Envelope](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/552db6dc-11b1-4eb5-a104-719e9bd19c07/envelopes_wavetable_envelope.png)

**WaveTable Envelope** 节点在给定时长内通读给定的波表。

#### WaveTable Envelope输入

输入

说明

**波表（WaveTable）**

要读取的波表。

**播放（Play）**

播放波封所用的触发器。

**停止（Stop）**

停止波封所用的触发器。

**暂停（Pause）**

暂停波封所用的触发器。

**时长（Duration）**

时长（以秒为单位）。

**模式（Mode）**

确定波封在哪个值上完成以及是否循环：

-   **循环（Loop）** ：内插波表中的最后一个数值和第一个数值，并在完成时重新开始波封的内插。
-   **保留（Hold）** ：如果播放时间超过波表的长度，则保留表中的最后一个值。
-   **单元测试（Unit）** ：如果播放时间超过波表的长度，则用1.0内插表中的最后一个值。
-   **归零（Zero）** ：如果播放时间超过波表的长度，则用0.0内插表中的最后一个值。

**插值（Interpolation）**

确定波封如何在波表数值之间内插：

-   **无（步骤）** ：不在数值之间进行内插。使用最小值。
-   **线性（Linear）** ：在数值之间进行线性内插。
-   **三次（Cubic）** ：在数值之间进行三次内插。

#### WaveTable Envelope输出

输出

说明

**完成时（OnFinished）**

波封完成时触发。

**输出（Out）**

输出数值。

## 外部IO

### Audio Bus Reader

![Audio Bus Reader](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/764b0bb3-7741-4ba2-86ad-ffc8c375719d/external_io_audio_bus_reader.png)

**Audio Bus Reader** 节点从音频总线资产输出音频数据。此节点有两个版本，用于支持不同的通道数量（1或2）。

#### Audio Bus Reader输入

输入

说明

**音频总线（Audio Bus）**

作为数据读取来源的音频总线资产。

#### Audio Bus Reader输出

输出

说明

**X输出（Out X）**

通道X的音频输出。

### Wave Writer

![Wave Writer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3562345d-15b7-403f-ae62-d34d0167f05d/external_io_wave_writer.png)

**Wave Writer** 节点将音频信号写入磁盘。该节点有多个版本，可支持不同的声道数量（1到8之间）。

文件按48,000 Hz渲染，并保存到 **Saved> AudioCaptures** 文件夹。

#### Wave Writer输入

输入

说明

**文件名前缀（Filename Prefix）**

用于输出文件的文件名前缀。

**启用（Enabled）**

启用后，该节点将音频信号写入磁盘。

**输入X（In X）**

与声道X对应的音频输入。

## 滤波器

### Biquad Filter

![Biquad Filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98974dfb-9ab9-4d79-af04-3b15d4140c5f/filters_biquad_filter.png)

**Biquad Filter** 节点提供了简单的双极双二阶滤波器，支持各种配置。

#### Biquad Filter输入

输入

说明

**输入（In）**

要进行双二阶滤波处理的音频。

**截止频率（Cutoff Frequency）**

截止频率的值。

**带宽（Bandwidth）**

适用时，控制当前滤波器类型的带宽。

**增益（Gain (dB)）**

参数化模式下应用于频带的增益（以分贝为单位）。

**类型（Type）**

要使用的双二阶滤波器类型。

#### Biquad Filter输出

输出

说明

**输出（Out）**

经过了双二阶滤波处理的音频。

### Bitcrusher

![Bitcrusher](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/053935f7-8cdc-4842-9f89-88083f8eaa5d/filters_bitcrusher.png)

**Bitcrusher** 节点进行下采样，并降低传入音频信号的位深度。

#### Bitcrusher输入

输入

说明

**音频（Audio）**

要进行降比特的音频信号。

**采样速率（Sample Rate）**

要将音频下采样到的采样频率。

**位深度（Bit Depth）**

要将音频缩减到的位分辨率。

#### Bitcrusher输出

输出

说明

**音频（Audio）**

经过了降比特处理的音频信号。

### Dynamic Filter

![Dynamic Filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b36efa8d-4b43-4e8c-90b1-f4407696555c/filters_dynamic_filter.png)

**Dynamic Filter** 节点基于输入信号的强度对音频频带进行滤波。

#### Dynamic Filter输入

输入

说明

**音频（Audio）**

要进行滤波的音频信号。

**侧链（Sidechain）**

（可选）用于控制滤波器的外部音频信号。如果未设置，将使用输入音频信号。

**滤波器类型（FilterType）**

要使用的滤波器形状，分为：**钟型（Bell）** 、 **低搁架（Low Shelf）** 或 **高搁架（High Shelf）**

**频率（Frequency）**

滤波器的中心频率。

**Q**

滤波器的Q或谐振，用于控制滤波器的陡度。

**阈值dB（Threshold dB）**

振幅阈值（dB），高于阈值将缩减增益。

**比率（Ratio）**

要应用的增益缩减量。值为1时不应用缩减，值越高，提供的缩减越多。

**拐点（Knee）**

确定增益缩减混合的软硬程度的分贝值。值为0 dB时没有混合。

**范围（Range）**

允许的最大增益缩减（以分贝为单位）。使用负值时应用压缩，使用正值时会翻转为扩展器。

**增益（Gain (dB)）**

要应用的修饰增益数量（以分贝为单位）。

**起音时间（AttackTime）**

高于阈值的音频达到压缩音量水平所需的时间长度（以秒为单位）。

**释音时间（ReleaseTime）**

低于阈值的音频恢复原始音量水平所需的时间（以秒为单位）。

**波封模式（EnvelopeMode）**

压缩器用于增益检测的波封跟踪方法。

**模拟模式（AnalogMode）**

启用后，则将模拟模式用于压缩器的波封跟踪器。

#### Dynamic Filter输出

输出

说明

**音频（Audio）**

经过了滤波处理的音频信号。

### Ladder Filter

![Ladder Filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/503826d7-1384-4103-bae1-c9f8e63e0926/filters_ladder_filter.png)

**Ladder Filter** 节点提供了虚拟模拟滤波器，其中包含悦耳且经典的滚降和谐振。

#### Ladder Filter输入

输入

说明

**输入（In）**

要由梯形滤波器处理的音频。

**截止频率（Cutoff Frequency）**

截止频率的值。

**谐振（Resonance）**

滤波器谐振的值。

#### Ladder Filter输出

输出

说明

**输出（Out）**

经过了梯形滤波处理的音频。

### Mono Band Splitter

![Mono Band Splitter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ea0b557-5578-493e-8ae8-ec8945364430/filters_mono_band_splitter.png)

**Mono Band Splitter** 节点将传入音频拆分为单独的频带。该节点有多个版本，可支持不同的输入和输出数量（2到5之间）。

#### Mono Band Splitter输入

输入

说明

**输入（In）**

基础音频输入声道。

**滤波器顺序（Filter Order）**

交叠滤波器的陡度，分为：**两极（Two Pole）** 、 **四极（Four Pole）** 、 **六极（Six Pole）** 或 **八极（Eight Pole）**

**相位补偿（Phase Compensate）**

启用后，每个频带会进行相位补偿，这样就可以正确地将其加总回来。

**交叠X（Crossover X）**

交叠滤波器从 **波段X（Band X）** 到下一个波段的频率。

#### Mono Band Splitter输出

输出

说明

**频带X输出（Band X Out）**

与声道X对应的音频输出。

### One-Pole High Pass Filter

![One-Pole High Pass Filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/272e0d0e-3ff1-44fc-b797-bf003db0f03a/filters_one-pole_high_pass_filter.png)

**One-Pole High Pass Filter** 节点是一种所需计算资源很少的滤波器，很适合多种简单的应用，例如模拟遮挡。

#### One-Pole High Pass Filter输入

输入

说明

**输入（In）**

要进行滤波处理的音频信号。

**截止频率（Cutoff Frequency）**

截止频率的值。

#### One-Pole High Pass Filter输出

输出

说明

**输出（Out）**

经过了滤波处理的音频信号。

### One-Pole Low Pass Filter

![One-Pole Low Pass Filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bce92f0-de2f-47ae-97ac-a3886fce8522/filters_one-pole_low_pass_filter.png)

**One-Pole Low Pass Filter** 节点是一种所需计算资源很少的滤波器，很适合多种简单的应用，例如模拟空气吸收

#### One-Pole Low Pass Filter输入

输入

说明

**输入（In）**

要进行滤波处理的音频信号。

**截止频率（Cutoff Frequency）**

截止频率的值。

#### One-Pole Low Pass Filter输出

输出

说明

**输出（Out）**

经过了滤波处理的音频信号。

### Sample And Hold

![Sample and Hold](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f6b06fd-c26b-4dfd-a862-cb9f0bd649d8/filters_sample_and_hold.png)

**Sample And Hold** 节点在触发时将输入音频信号的单个值输出。

#### Sample And Hold输入

输入

说明

**采样并保留（Sample And Hold）**

在其上采样并保留输入音频的触发器。

**输入（In）**

要进行采样的音频信号。

#### Sample And Hold输出

输出

说明

**在采样并保留时（On Sample And Hold）**

在触发"采样并保留（Sample and Hold）"输入时触发。

**输出（Out）**

进行了采样的音频信号。

### State Variable Filter

![State Variable Filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11752e83-dd41-4f74-9007-8552f1dc0125/filters_state_variable_filter.png)

**State Variable Filter** 节点提供了许多合成应用中使用的虚拟模拟滤波器。

#### State Variable Filter输入

输入

说明

**输入（In）**

要由滤波器处理的音频。

**截止频率（Cutoff Frequency）**

截止频率的值。

**谐振（Resonance）**

滤波器谐振的值。

**带阻控制（Band Stop Control）**

应用于带阻输出的控制值。

#### State Variable Filter输出

输出

说明

**低通滤波器（Low Pass Filter）**

低通滤波器输出。

**高通滤波器（High Pass Filter）**

高通滤波器输出。

**带通（Band Pass）**

带通滤波器输出。

**带阻（Band Stop）**

带阻滤波器输出。

### Stereo Band Splitter

![Stereo Band Splitter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea5071f3-6611-430e-ad5d-297d74d73b0d/filters_stereo_band_splitter.png)

**Stereo Band Splitter** 节点将传入音频拆分为单独的频带。该节点有多个版本，可支持不同的输入和输出数量（2到5之间）。

#### Stereo Band Splitter输入

输入

说明

**左入/右入（In L / R）**

基础音频输入声道。

**滤波器顺序（Filter Order）**

交叠滤波器的陡度，分为：**两极（Two Pole）** 、 **四极（Four Pole）** 、 **六极（Six Pole）** 、 **八极（Eight Pole）**

**相位补偿（Phase Compensate）**

启用后，每个频带会进行相位补偿，这样就可以正确地将其加总回来。

**交叠X（Crossover X）**

交叠滤波器从 **波段X（Band X）** 到下一个波段的频率。

#### Stereo Band Splitter输出

输出

说明

**频带X左/右（Band X L / R）**

与声道X对应的音频输出（在左声道/右声道中）。

## 发生器

MetaSound有多种音频速率发生器，可提供频率调制选项。

除了 **Noise** 节点之外，所有这些节点都支持同步触发，这会重置其相位。与音频速率触发器重复或阈值触发器结合使用时，这可以创建许多独特的合成效果。

### Additive Synth

![Additive Synth](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6392d623-d12c-4869-9ed3-8b412b54aec4/generators_additive_synth.png)

**Additive Synth** 节点通过将给定正弦波相叠加来合成音频。

#### Additive Synth输入

输入

说明

**基础频率（Base Frequency）**

和声所基于的正弦波频率。该值限制为从0.0到Nyquist频率。

**HarmonicMultipliers**

应用于基础频率的和声乘数数组。使用的正弦波数量取决于此数组的大小。该值被限制为从0.0到某个最大值，以便生成的频率不会高于Nyquist频率。

**振幅（Amplitudes）**

正弦波振幅的数组。值限制为0.0到1.0的范围

**相位（Phases）**

正弦波相位（以度为单位）的数组。值限制为0.0到360的范围。

**声场定位数量（Pan Amounts）**

声场定位数量（使用等功率法则）的数组。例如，值为-1.0表示全左，值为1.0表示全右。

#### Additive Synth输出

输出

说明

**左出/右出音频（Out Left / Right Audio）**

合成的音频输出（左声道/右声道）。

### Low Frequency Noise

![Low Frequency Noise](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2119e51f-9e49-4770-be5f-c700e8e1beef/generators_low_frequency_noise.png)

**Low Frequency Noise** 节点以设定的频率产生随机值，并在其中平滑地内插，以增加信号的周期变化。

#### Low Frequency Noise输入

输入

说明

**速率（Rate）**

每个新值的速率（赫兹）。该值受区块速率限制。

**种子（Seed）**

用于随机打乱的种子。使用默认值-1时将使用当前时间。

**重置种子（Reset Seed）**

重置种子的触发器。

**同步（Sync）**

重置发生器相位的触发器。

**插值（Interpolation）**

在值之间使用的插值方法，分为：**无（None）** 、 **线性（Linear）** 或 **三次（Cubic）**

**抖动速率（Rate Jitter）**

用于随机修改（+/-） **速率** 的百分比。值限制为0.0到1.0之间。

**步骤限制（Step Limit）**

用于限制序列中下一个随机数的百分比。值限制为0.0到1.0之间。

**最小值（Min Value）**

最小输出值。

**最大值（Max Value）**

最大输出值。

#### Low Frequency Noise输出

输出

说明

**输出（Out）**

根据 **最小值** 和 **最大值** 确定缩放后的输出。

**规格化（Normalized）**

规格化的输出。

### Low-Frequency Oscillator（LFO）

![LFO](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec846d09-16e3-45af-8c4d-117ff9f24155/generators_lfo.png)

**LFO** 节点提供了低频振荡器，可用于创建各种音频效果，例如移相、颤音和震音。

#### LFO输入

输入

说明

**频率（Frequency）**

LFO的频率（赫兹）（限制为区块速率）。

**形状（Shape）**

LFO的波形形状，分为：**正弦（Sine）** 、 **锯齿状（Saw）** 、 **三角形（Triangle）** 或 **正方形（Square）**

**最小/最大值（Min / Max Value）**

最小/最大输出值。

**同步（Sync）**

重置发生器的相位。你可以将其与其他节点结合使用，获取音频速率相位同步的发生器。

**相位偏移（Phase Offset）**

相位偏移（以度为单位，0到360之间）。

**脉冲宽度（Pulse Width）**

脉冲宽度（0到1之间）。

#### LFO输出

输出

说明

**输出（Out）**

LFO的输出值（限制为区块速率）。

### Noise

![Noise](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ec2f527-9180-4087-b1a1-72335ce68e36/generators_noise.png)

**Noise** 节点生成粉色或白色噪点。

#### Noise输入

输入

说明

**种子（Seed）**

随机数发生器的种子。使用默认值-1时将使用当前时间。

**类型（Type）**

要生成的噪点类型，分为：**粉色噪点（Pink Noise）** 或 **白色噪点（White Noise）**

#### Noise输出

输出

说明

**音频（Audio）**

生成的噪声输出。

### Perlin Noise

![Perlin Noise](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/655b7813-c1dc-4643-8ba4-3f0ed7a20814/generators_perlin_noise.png)

**Perlin Noise** 节点将对一维的Perlin值噪声求值，用于为信号添加自然粗糙度。该节点有两个版本，可以支持不同的数据类型（音频或浮点）。

#### Perlin Noise输入

输入

说明

**X**

Perlin函数的输入值。默认情况下，将使用内部时钟（以秒为单位）。

**层（Layers）**

噪声的倍频数目之和。

**种子（Seed）**

用于随机打乱的种子。使用默认值-1时将使用当前时间。

**最小值（Min Value）**

最小输出值。

**最大值（Max Value）**

最大输出值。

#### Perlin Noise输出

输出

说明

**输出（Output）**

根据 **最小值** 和 **最大值** 缩放后的输出。

**规格化（Normalized）**

规格化的输出。

### Saw

![Saw](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6bf9392-8dbb-4194-9c63-3fd45f528625/generators_saw.png)

**Saw** 节点发射带有给定属性的锯齿波的音频信号。

#### Saw输入

输入

说明

**启用（Enabled）**

启用后，振荡器将生成信号。

**双极（Bi Polar）**

启用后，输出将是双极的(-1, 1)。否则，输出将是单极的(0, 1)。

**频率（Frequency）**

振荡器的基础频率（以赫兹为单位）。

**调制（Modulation）**

用于调制基础频率的音频速率输入。

**同步（Sync）**

重置发生器的相位。你可以将其与其他节点结合使用，获取音频速率相位同步的发生器。

**相位偏移（Phase Offset）**

相位偏移（以度为单位，0到360之间）。

**滑音（Glide）**

更改频率时使用的滑音数量（随时间推移的平滑插值）。例如，值为0.0时不产生滑音，值为1.0时产生大量滑音。

**类型（Type）**

用于创建锯齿波的发生器类型：

-   **聚平滑（Poly Smooth）** ：生成锯齿波的平滑版本。
-   **细微（Trivial）** ：使用基本实现来生成锯齿波。

#### Saw输出

输出

说明

**音频（Audio）**

锯齿波音频信号。

### Sine

![Sine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7dcdc839-8526-4876-8f6e-717753653448/generators_sine.png)

**Sine** 节点发射带有给定属性的正弦波的音频信号。

#### Sine输入

输入

说明

**启用（Enabled）**

启用后，振荡器将生成信号。

**双极（Bi Polar）**

启用后，输出将是双极的(-1, 1)。否则，输出将是单极的(0, 1)。

**频率（Frequency）**

振荡器的基础频率（以赫兹为单位）。

**调制（Modulation）**

用于调制基础频率的音频速率输入。

**同步（Sync）**

重置发生器的相位。你可以将其与其他节点结合使用，获取音频速率相位同步的发生器。

**相位偏移（Phase Offset）**

相位偏移（以度为单位，0到360之间）。

**滑音（Glide）**

更改频率时使用的滑音数量（随时间推移的平滑插值）。例如，值为0.0时不产生滑音，值为1.0时产生大量滑音。

**类型（Type）**

用于创建正弦波的发生器类型：

-   **2D旋转（2D Rotation）** ：围绕单位圆圈旋转，生成正弦波。
-   **纯数学（Pure Math）** ：使用标准数学库生成正弦波（成本最高的方法）。
-   **婆什迦罗** ：使用婆什迦罗方法法粗略估计正弦波。
-   **波表（Wave Table）** ：使用波表来生成正弦波。

#### Sine输出

输出

说明

**音频（Audio）**

正弦波音频信号。

### Square

![Square](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/345caebc-3f42-4da9-8cdd-bfea11384a85/generators_square.png)

**Square** 节点发射带有给定属性的方形波的音频信号。

#### Square输入

输入

说明

**启用（Enabled）**

启用后，振荡器将生成信号。

**双极（Bi Polar）**

启用后，输出将是双极的(-1, 1)。否则，输出将是单极的(0, 1)。

**频率（Frequency）**

振荡器的基础频率（以赫兹为单位）。

**调制（Modulation）**

用于调制基础频率的音频速率输入。

**同步（Sync）**

重置发生器的相位。你可以将其与其他节点结合使用，获取音频速率相位同步的发生器。

**相位偏移（Phase Offset）**

相位偏移（以度为单位，0到360之间）。

**滑音（Glide）**

更改频率时使用的滑音数量（随时间推移的平滑插值）。例如，值为0.0时不产生滑音，值为1.0时产生大量滑音。

**类型（Type）**

用于创建方形波的发生器类型：

-   **聚平滑（Poly Smooth）** ：生成方形波的平滑版本。
-   **细微（Trivial）** ：使用基本实现来生成方形波。

**脉冲宽度（Pulse Width）**

方形波的相对脉冲宽度。

#### Square输出

输出

说明

**音频（Audio）**

方形波音频信号。

### SuperOscillator

![SuperOscillator](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a9087b4-39db-4523-9169-a04251854c54/generators_superoscillator.png)

**SuperOscillator** 节点利用多个内部振荡器产生音频。你可以使用 **失谐（Detune）** 和 **熵（Entropy）** 参数对每个内部振荡器进行均匀或随机的失谐。该节点支持基础振荡器节点的所有功能，并增加了一个内置的限制器，以便在有更多的声音时限制振幅。该节点有两个版本，可以支持不同的通道配置（立体声或单声道）。

#### SuperOscillator输入

输入

说明

**启用（Enabled）**

启用后，振荡器将生成信号。

**限制输出（Limit Output）**

启用后，输出音量将会受到限制。

**声音（Voices）**

要使用的振荡器数量。值限制为1到16之间。

**频率（Frequency）**

振荡器的基准频率（赫兹）。

**调制（Modulation）**

调制频率。

**失谐（Detune）**

最大音高偏移（以半音为单位）。只有超过2级的振荡器才会被失谐。

**熵（Entropy）**

该值可控制声音在音高上的分布均匀程度。值限制为0.0到1.0之间。

**混合（Blend）**

失谐的声音相对于主音的音量（dB）。

**滑音（Glide）**

更改频率时使用的滑音数量（随时间推移的平滑插值）。例如，值为0.0时不产生滑音，值为1.0时产生大量滑音。

**脉冲宽度（Pulse Width）**

方形段的波宽。仅适用于 **正方形（Square）** 波。

**宽度（Width）**

振荡器的立体声宽度。值限制为0.0到1.0之间。

**类型（Type）**

振荡器的形状，分为：**正弦（Sine）** 、 **锯齿状（Saw）** 、 **三角形（Triangle）** 或 **正方形（Square）**

#### SuperOscillator输出

输出

说明

**音频（Audio）**

输出音频信号。

### Triangle

![Triangle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff4d4b90-e5d1-49fe-9b12-4183ceec5ff4/generators_triangle.png)

**Triangle** 节点发射带有给定属性的三角波的音频信号。

#### Triangle输入

输入

说明

**启用（Enabled）**

启用后，振荡器将生成信号。

**双极（Bi Polar）**

启用后，输出将是双极的(-1, 1)。否则，输出将是单极的(0, 1)。

**频率（Frequency）**

振荡器的基础频率（以赫兹为单位）。

**调制（Modulation）**

用于调制基础频率的音频速率输入。

**同步（Sync）**

重置发生器的相位。你可以将其与其他节点结合使用，获取音频速率相位同步的发生器。

**相位偏移（Phase Offset）**

相位偏移（以度为单位，0到360之间）。

**滑音（Glide）**

更改频率时使用的滑音数量（随时间推移的平滑插值）。例如，值为0.0时不产生滑音，值为1.0时产生大量滑音。

**类型（Type）**

用于创建三角波的发生器类型：

-   **聚平滑（Poly Smooth）** ：生成三角波的平滑版本。
-   **细微（Trivial）** ：使用基本实现来生成三角波。

#### Triangle输出

输出

说明

**音频（Audio）**

三角波音频信号。

### WaveTable Oscillator

![WaveTable Oscillator](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85107139-ee5e-4964-afa0-aae7bf0c8722/generators_wavetable_oscillator.png)

**WaveTable Oscillator** 节点按给定频率通读给定的波表。

#### WaveTable Oscillator输入

输入

说明

**播放（Play）**

播放振荡器所用的触发器（区块速率）。

**停止（Stop）**

停止振荡器所用的触发器（区块速率）。

**波表（WaveTable）**

要读取的波表。

**频率（Freq）**

每秒对波表的一个周期进行采样的次数。该频率应设置在-20000 Hz和20000 Hz之间。

**同步（Sync）**

在触发器边界（采样率）上重新开始播放波表所用的触发器。

**相位调制器（Phase Modulator）**

用于调制所提供波表的振荡相位的音频源。数值为0时不产生相位调制，数值为1时产生全表长度（360度）相移。

#### WaveTable Oscillator输出

输出

说明

**输出（Out）**

输出音频缓冲区。

### WaveTable Player

![WaveTable Player](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26bbc7cb-28d4-40d9-9540-f73575743465/generators_wavetable_player.png)

**WaveTable Player** 节点会从给定索引处的波表库条目中读取信息。

#### WaveTable Player输入

输入

说明

**播放（Play）**

播放振荡器所用的触发器（区块速率）。

**停止（Stop）**

停止振荡器所用的触发器（区块速率）。

**同步（Sync）**

在触发器边界（采样率）上重新开始播放波表所用的触发器。

**库（Bank）**

播放所用的波表库。

**索引（Index）**

要播放的波表库的索引。

**音高位移（Pitch Shift）**

给定波表的音高位移程度。

**循环（Loop）**

启用后，波表将循环。

#### WaveTable Player输出

输出

说明

**单声道输出（MonoOut）**

输出音频缓冲区（单声道）。

**完成时（On Finished）**

波表播放器完成播放波表后触发。

## 数学

MetaSounds具有各种基于给定输入执行基本数学运算的节点。

对音频数据类型的运算逐个采样执行。

### Abs

![Abs](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d0db2a2-7ac0-4838-94e8-736a293ff61c/math_abs.png)

**Abs** 节点将返回给定输入的绝对值。例如，如果输入数值为-2.0，将输出2.0。该节点有不同的版本，支持多种常见数据类型，包括：音频、浮点、Int32和时间。

### Add

![Add](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b38ff95c-c633-4df1-8856-ba7c691c4ae6/math_add.png)

**Add** 节点对提供的输入执行加法运算。该节点有不同的版本，支持多种常见数据类型，包括：音频、浮点到音频、浮点、Int32和时间。

### Clamp

![Clamp](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/411ae8bc-0a62-437b-83c7-4ded9b2e8ee3/math_clamp.png)

**Clamp** 节点返回位于给定值范围内的受限输入值。该节点有不同的版本，支持多种常见数据类型，包括：音频、浮点和Int32。

#### Clamp输入

输入

说明

**输入（In）**

要限制的输入值。

**最小/最大值（Min / Max）**

要将输入值限制到的最小/最大值。

#### Clamp输出

输出

说明

**值（Value）**

受限的值。

### Divide

![Divide](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac4723d4-a2d2-44a5-99c7-2855081db3f2/math_divide.png)

**Divide** 节点对提供的输入执行除法运算。该节点有不同的版本，支持多种常见数据类型，包括：浮点、Int32和浮点时间。

### Filter Q To Bandwidth

![Filter Q To Bandwidth](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96ee763c-d91b-49b4-9e63-0adc946feace/math_filter_q_to_bandwidth.png)

**Filter Q To Bandwidth** 节点会将用于滤波器控制的给定Q（品质因子）参数转换为带宽数值。

### Linear To Log Frequency

![Linear To Log Frequency](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/747daed3-3ca0-4702-8791-bb6dcf8eac18/math_linear_to_log_frequency.png)

**Linear To Log Frequency** 节点将线性空间输入值转换为对数频率输出。

#### Linear To Log Frequency输入

输入

说明

**值（Value）**

要映射到对数频率输出的线性输入值。

**最小/最大域（Min / Max Domain）**

输入值的最小/最大域。输入和输出值限制为该域。

**最小/最大范围（Min / Max Range）**

输出频率（赫兹）值的最小/最大正数范围。输入和输出值限制为该范围。

#### Linear To Log Frequency输出

输出

说明

**频率（Frequency）**

以输入值的对数频率表示的输出频率（赫兹）。

### 日志

![Log](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/525019de-04cc-4c35-9b69-e5940de15515/math_log.png)

**Log** 节点计算一个浮点的以另一个浮点为底的对数。

### Map Range

![Map Range](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f182250-ac03-45fa-9c3e-1a41a1dd362c/math_map_range.png)

**Map Range** 节点将给定输入范围中的输入值映射到给定输出范围。此结果也可以进行限制。该节点有不同的版本，支持多种常见数据类型，包括：音频、浮点和Int32。这些节点与 **Blueprint Map Range** 节点相似。

该节点的音频版本执行逐个采样的映射。将音频速率信号映射到音频速率调制参数（例如FM合成中的频率调制器）时，此节点很有用。

#### Map Range输入

输入

说明

**输入（In）**

要映射的输入值。

**输入范围A/B（In Range A / B）**

最小和最大输入值范围。

**输出范围A/B（Out Range A / B）**

最小和最大输出值范围。

**限制（Clamped）**

启用后，输入将被限制在指定输入范围内。

#### Map Range输出

输出

说明

**输出值（Out Value）**

映射的输出值。

### Max

![Max](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/862fdf55-299b-43a2-b0db-95e9188f75e9/math_max.png)

**Max** 节点返回A和B中的较大者（最大值）。该节点有不同版本，可支持多种常见数据类型，包括：音频、浮点和Int32。

#### Max输入

输入

说明

**A / B**

要比较的输入值。

#### Max输出

输出

说明

**值（Value）**

A和B中的较大者（最大值）。

### Min

![Min](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c0c0c0f-3aa1-494f-b35b-4205c56c73ef/math_min.png)

**Min** 节点返回A和B中的较小者（最小值）。该节点有不同版本，可支持多种常见数据类型，包括：音频、浮点和Int32。

#### Min输入

输入

说明

**A / B**

要比较的输入值。

#### Min输出

输出

说明

**值（Value）**

A和B中的较小者（最小值）。

### Modulo

![Modulo](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/043aba11-b0a8-4016-a0ca-e4eb14bde0b4/math_modulo.png)

**Modulo** 节点返回两个给定Int32值进行除法运算后的余数。

### Multiply

![Multiply](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f004421-c3bf-45c1-aaaa-a22844b49b0c/math_multiply.png)

**Multiply** 节点对提供的输入执行乘法运算。该节点有不同的版本，支持多种常见数据类型，包括：浮点音频、音频、浮点、Int32和浮点时间。

该节点可用于提供环形调制类型效果和音频速率振幅调制。

### Power

![Power](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a480ae7-c9ac-4af6-b6be-ec06967e4902/math_power.png)

**Power** 节点计算给定浮点的另一个浮点次方。

### Subtract

![Subtract](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d80c907-7f49-4a1b-958a-a6bb0ee0c440/math_subtract.png)

**Subtract** 节点对提供的输入执行减法运算。该节点有不同的版本，支持多种常见数据类型，包括：音频、浮点、Int32和时间。

## 混合

MetaSound提供了两种节点类型来创建音频混合，即 **Mono Mixer** 节点和 **Stereo Mixer** 节点。这些节点有不同的版本，支持2到8个输入音频缓冲区，它们通过使用输入声道的对应增益值并加总起来，合并为单个缓冲区。

增益值不受限制，因此可用于衰减和反转音频信号。

这些节点适合用于将音频速率缓冲区映射到不同的范围，调制各种支持音频速率的参数。

### Mono Mixer

![Mono Mixer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee7a428e-ba40-4e19-848c-5c74cc04090a/mix_mono_mixer.png)

### Stereo Mixer

![Stereo Mixer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3cce8999-87f6-4acd-9cc8-51dd9d76d036/mix_stereo_mixer.png)

## 音乐

### Frequency To MIDI

![Frequency To MIDI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13e38bed-4059-411f-ad3b-b7d89dac2920/music_frequency_to_midi.png)

**Frequency To MIDI** 节点将频率值（以赫兹为单位）转换为标准MIDI音阶音符值（其中中央C音是60）。

#### Frequency To MIDI输入

输入

说明

**输入频率（Frequency In）**

输入频率值（以赫兹为单位）。

#### Frequency To MIDI输出

输出

说明

**输出MIDI（Out MIDI）**

输出MIDI音符值。

### MIDI Note Quantizer

![MIDI Note Quantizer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62fe66ab-bf67-4f56-9dd7-33edb6779485/music_midi_note_quantizer.png)

**MIDI Note Quantizer** 节点将MIDI音符量化到与提供的条件相匹配的最接近音符。

#### MIDI Note Quantizer输入

输入

说明

**输入音符（Note In）**

要量化的MIDI音符。

**根音（Root Note）**

要视为根音的MIDI音符。例如，值0相当于C，值1相于C#/Db，以此类推。倍频不重要。此外，所有小于0的值都限制为0。

**音级（Scale Degrees）**

包含表示半音的一组音符（按升序排列）的数组。数组必须从表示根音的0.0开始，数组中的最高值必须表示更高倍频中的根音，例如用于单倍频范围的12.0，或用于两倍频范围的24.0。

#### MIDI Note Quantizer输出

输出

说明

**输出音符（Note Out）**

量化的音符。

### MIDI To Frequency

![MIDI To Frequency](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/473f9fed-22de-41b2-afd8-e45cc4470e88/music_midi_to_frequency.png)

**Frequency to MIDI** 节点将标准MIDI音阶音符值（其中中央C音是60）转换为频率值（以赫兹为单位）。该节点有两个不同的版本，分别支持浮点和Int32数据类型。

你可以使用此节点，以音乐方式控制以频率（赫兹）为输入的发生器。此外，浮点版本可以采用分数MIDI音符值，这对于微分音和自定义调音很有用。

#### MIDI To Frequency输入

输入

说明

**输入MIDI（MIDI In）**

表示MIDI音符值的输入值。

#### MIDI To Frequency输出

输出

说明

**输出频率（Out Frequency）**

输出频率值（以赫兹为单位）。

### Scale to Note Array

![Scale to Note Array](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ca894d4-c457-4693-93ff-4f32121cd126/music_scale_to_note_array.png)

**Scale to Note Array** 节点返回一个浮点数数组，以表示所选音阶的音符。

该节点很适合使用 **仅和弦音（Chord Tones Only）** 切换开关在全音阶与和弦音之间切换，创建程序化音乐。

#### Scale to Note Array输入

输入

说明

**音级（Scale Degrees）**

要获取其音符的预设音阶。

**仅和弦音（Chord Tones Only）**

启用后，将返回表示和弦音的音阶子集。例如，音级1、3、5和7。

#### Scale to Note Array输出

输出

说明

**输出音阶数组（Scale Array Out）**

以根音上方的半音表示的音阶数组表示。该集含两端的值（开始于0.0f，结束于12.0f）。

## Random

![Random](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bceac4b1-ffbb-4711-8f4c-e966b4096164/random_random.png)

MetaSound提供了几个 **Random** 节点，按输出值类型分类，包括布尔、浮点、整型和时间。这些节点从其输入类型和种子输出随机值。

将重置触发器用于完全相同的种子会产生相同结果。这很适合获取随机化重复。

#### Random输入

输入

说明

**下一个（Next）**

在其上生成下一个随机值的触发器。

**重置（Reset）**

在其上使用提供的种子重置随机序列的触发器。

**种子（Seed）**

要用于随机化的种子值。使用默认值-1时将使用随机种子。

**最小/最大值（Min / Max）**

随机值的闭区间。

#### Random输出

输出

说明

**下一个时（On Next）**

在触发"下一个（Next）"输入时触发。

**重置时（On Reset）**

在触发"重置（Reset）"输入时触发。

**值（Value）**

随机生成的值。

## 空间化

### ITD Panner

![ITD Panner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/348eb2ab-7c65-4682-9792-f1a03956004b/spatialization_itd_panner.png)

**ITD Panner** 节点使用耳间时间延迟方法对输入音频信号进行声场定位。

#### ITD Panner输入

输入

说明

**输入（In）**

要空间化的输入音频。

**角度（Angle）**

声源角度（以度为单位）。值90度表示前方，0度表示右方，270度表示后方，180度表示左方。

**距离因子（Distance Factor）**

要用于双耳声级差（ILD）计算的规格化距离因子（0.0到1.0）。值为0.0表示近，值为1.0表示远。输入音频越远，双耳之间的声级差（增益）越小。

**头部宽度（Head Width）**

聆听者头部的宽度（以厘米为单位）。

#### ITD Panner输出

输出

说明

**左出/右出（Out Left / Right ）**

音频输出（左声道/右声道）。

### Mid-Side Decode

![Mid-Side Decode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbcc5520-5b22-427f-8e8a-c3ea6079fe4b/spatialization_mid-side_decode.png)

**Mid-Side Decode** 节点将带有中央和侧声道的立体声信号转换为左右声道。

#### Mid-Side Decode输入

输入

说明

**输入中央/侧（In Mid / Side）**

要转换的音频声道。

**扩频数量（Spread Amount）**

立体声扩频量。值0.0表示无扩频，值0.5表示原始信号，值1.0表示全宽。

**等功率（Equal Power）**

启用后，将维持输入音频声道之间的等功率关系。

#### Mid-Side Decode输出

输出

说明

**左出/右出（Out Left / Right）**

输出音频声道。

### Mid-Side Encode

![Mid-Side Encode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f60e51c1-b906-40ef-af2e-119d90c70824/spatialization_mid-side_encode.png)

**Mid-Side Encode** 节点将带有左右声道的立体声信号转换为中央和侧声道。

#### Mid-Side Encode输入

输入

说明

**左入/右入（In Left / Right）**

要转换的音频声道。

**扩频数量（Spread Amount）**

立体声扩频量。值0.0表示无扩频，值0.5表示原始信号，值1.0表示全宽。

**等功率（Equal Power）**

启用后，将维持输入音频声道之间的等功率关系。

#### Mid-Side Encode输出

输出

说明

**输出中央/侧（Out Mid / Side）**

输出音频声道。

### Stereo Panner

![Stereo Panner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ece0c41-b2b5-43cf-8e5d-f0df728ee34a/spatialization_stereo_panner.png)

**Stereo Panner** 节点将输入音频信号平移到左右输出。

#### Stereo Panner输入

输入

说明

**输入（In）**

要进行平移的输入音频信号。

**平移量（Pan Amount）**

音频信号的平移量（-1.0表示全左，1.0表示全右）。

**平移法则（Panning Law）**

要使用的平移法则：

-   **等功率（Equal Power）** ：音频信号的功率在平移时保持恒定。
-   **线性（Linear）** ：音频信号的振幅在平移时保持恒定。

#### Stereo Panner输出

输出

说明

**左出/右出（Out Left / Right）**

输出音频信号（左声道/右声道）。

## 触发器

### Trigger Accumulate

![Trigger Accumulate](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc46d409-7953-4294-bc20-fc22b75fbe0f/triggers_trigger_accumulate.png)

**Trigger Accumulate** 节点在所有连接的输入触发器至少触发一次后触发。该节点有多个版本，可支持不同的输入数量（1到8之间）。

该节点可用于检测多个 **Wave Player** 节点何时完成，然后触发On Finished输出触发器。

#### Trigger Accumulate输入

输入

说明

**输入X（In X）**

触发器输入。

**自动重置（Auto Reset）**

在其上重置此节点上的累积的触发器。

#### Trigger Accumulate输出

输出

说明

**输出（Out）**

在所有输入触发器都已累积时触发。

### Trigger Any

![Trigger Any](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41157dbb-d1e9-42d3-8856-e1798deff29c/triggers_trigger_any.png)

**Trigger Any** 节点在任意已连接输入触发器激活时触发。该节点有不同的版本，可支持不同的输入数量（2到8之间）。

如果你想让许多不同的触发器来源执行另一个节点的输入，该节点很有用。

#### Trigger Any输入

输入

说明

**输入X（In X）**

触发器输入。

#### Trigger Any输出

输出

说明

**输出（Out）**

在任意输入触发器触发时触发。

### Trigger Compare

![Trigger Compare](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92295fce-693a-4b9d-8640-7a472e277100/triggers_trigger_compare.png)

**Trigger Compare** 节点基于已连接输入的比较触发true或false。该节点有不同的版本，支持多种常见数据类型，包括：布尔、浮点和Int32。

#### Trigger Compare输入

输入

说明

**比较（Compare）**

在其上比较A和B的触发器。

**A / B**

要比较的值。

**类型（Type）**

要比较的类型：**等于** 、 **不等于** 、 **小于** 、 **大于** 、 **小于或等于** 、 **大于或等于**

#### Trigger Compare输出

输出

说明

**True / False**

在做出比较之后使用生成的触发器触发。

### Trigger Control

![Trigger Control](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a0aac0f-e6d7-42ed-8881-1e82baf6821b/triggers_trigger_control.png)

**Trigger Control** 节点用于控制是允许还是阻止触发器信号传递到输出。

#### Trigger Control输入

输入

说明

**输入触发器（Trigger In）**

要控制的输入触发器。

**打开（Open）**

在其上允许输入触发器通过的触发器。

**关闭（Close）**

在其上阻止输入触发器通过的触发器。

**切换（Toggle）**

在其上切换该节点的打开/关闭状态的触发器。

**开始关闭（Start Closed）**

启用后，该节点将以关闭状态开始。

#### Trigger Control输出

输出

说明

**输出触发器（Trigger Out）**

节点打开时通过的输出触发器。

### Trigger Counter

![Trigger Counter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18d93c0e-c03b-4fa4-b60b-6420a23c3830/triggers_trigger_counter.png)

**Trigger Counter** 节点计算已连接输入触发器激活的数量。

该节点很适合按顺序进行的数组输入和大量其他流程性用例。

#### Trigger Counter输入

输入

说明

**输入（In）**

要为其计算激活数量的输入触发器。

**重置（Reset）**

在其上将计数器重置为零并将值重置回开始值的触发器。

**开始值（Start Value）**

在初始化时和重置时的开始值。

**步进大小（Step Size）**

要添加到每个输入触发器的当前值的值。这可以是负数。

**重置数量（Reset Count）**

要在自动重置之前计算的输入触发器数量。如果值设置为0，该节点不会自动重置。

#### Trigger Counter输出

输出

说明

**触发时（On Trigger）**

在触发输入触发器并更新数量时触发。

**重置时（On Reset）**

在触发输入重置时或计数器自动重置时触发。

**数量（Count）**

当前触发器数量。

**值（Value）**

当前值。

### Trigger Delay

![Trigger Delay](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/af3697f5-9e89-49d8-87d2-7c22e155ffda/triggers_trigger_delay.png)

**Trigger Delay** 节点在与输入触发器最近一次执行间隔给定的延迟时间后，再执行触发器。

该节点与 **Trigger Pipe** 节点相似，但不同之处在于，仅考虑最近一次触发器执行。这意味着，延迟时间内发生的额外触发器将重置定时器，并导致输出触发器再次延迟。

#### Trigger Delay输入

输入

说明

**输入（In）**

要延迟的输入触发器。

**重置（Reset）**

在其上重置延迟并清除执行任务（如果该任务待处理）的触发器。

**延迟时间（Delay Time）**

延迟触发器的时间长度（以秒为单位）。

#### Trigger Delay输出

输出

说明

**输出（Out）**

延迟的输出触发器。

### Trigger Filter

![Trigger Filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7887be7f-1f5e-4885-afdc-a205b2855df6/triggers_trigger_filter.png)

**Trigger Filter** 节点通过随机激活两个输出触发器之一来响应触发器。

#### Trigger Filter输入

输入

说明

**触发器（Trigger）**

在其上随机激活输出触发器的触发器。

**重置（Reset）**

在其上使用提供的种子重置随机序列的触发器。

**种子（Seed）**

要用于随机化的种子值。值为-1时，将使用随机种子。

**概率（Probability）**

特定输出触发器将激活的概率。例如，值0.0表示总是头部，值1.0表示总是尾部，0.5表示几率均等。

#### Trigger Filter输出

输出

说明

**正面/反面（Heads / Tails）**

可能的输出触发器。

### Trigger On Threshold

![Trigger On Threshold](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4cb54ef-51cc-4fdb-9c5e-2aa7e5149000/triggers_trigger_on_threshold.png)

**Trigger On Threshold** 节点作为边缘检测器运作，并在输入音频沿指定方向移动并跨越给定阈值时触发。该节点有不同的版本，支持多种常见数据类型，包括：音频、浮点和Int32。

如果设置为"上升边缘（Rising Edge）"，将在信号以正斜率跨越阈值时输出触发器。这很适合与发生器节点配对并连接到另一个发生器的同步触发器输入。

#### Trigger On Threshold输入

输入

说明

**输入（In）**

输入音频信号。

**阈值（Threshold）**

触发输出的阈值。

**类型（Type）**

触发器阈值的类型，分为：**上升边缘（Rising Edge）** 、 **下降边缘（Falling Edge）** 或 **绝对阈值（Abs Threshold）**

#### Trigger On Threshold输出

输出

说明

**输出（Out）**

输出阈值触发器。

### Trigger On Value Change

![Trigger On Value Change](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21735151-1a44-49b2-9e23-12e166ee8d50/triggers_trigger_on_value_change.png)

**Trigger On Value Change** 节点在给定值更改时触发。该节点有不同的版本，支持多种常见数据类型，包括：布尔、浮点和Int32。

#### Trigger On Value Change输入

输入

说明

**值（Value）**

要观察的输入值。

#### Trigger On Value Change输出

输出

说明

**触发器（Trigger）**

输出触发器。

### Trigger Once

![Trigger Once](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/621a1531-d8fa-42ab-bc81-f352884004d1/triggers_trigger_once.png)

**Trigger Once** 节点在输入触发器首次激活时触发，并忽略所有其他发生情况，除非被重置。

#### Trigger Once输入

输入

说明

**输入触发器（Trigger In）**

输入触发器。

**重置（Reset）**

在其上打开节点并允许另一个触发器通过的触发器。

**开始关闭（Start Closed）**

启用后，该节点将在播放开始时关闭。

#### Trigger Once输出

输出

说明

**输出触发器（Trigger Out）**

输出触发器。

### Trigger Pipe

![Trigger Pipe](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b3aed2d-4676-4d3a-bef4-3b21e45cf41c/triggers_trigger_pipe.png)

**Trigger Pipe** 节点将使所有输入触发器信号的执行延迟给定延迟时间。

该节点与 **Trigger Delay** 节点相似，但在收到更多触发器时不会重置定时器。

#### Trigger Pipe输入

输入

说明

**输入（In）**

要延迟的输入触发器。

**重置（Reset）**

在其上重置触发器延迟并清除所有待处理执行任务的触发器。

**延迟时间（Delay Time）**

延迟输入触发器的时间（以秒为单位）。

#### Trigger Pipe输出

输出

说明

**输出（Out）**

延迟的输出触发器。

### Trigger Repeat

![Trigger Repeat](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed8dff1f-fc07-4ef2-840e-a2573417402c/triggers_trigger_repeat.png)

**Trigger Repeat** 节点按给定的样本精度和任意精确率定期发射触发器。

#### Trigger Repeat输入

输入

说明

**开始/停止（Start / Stop）**

在其上开始或停止执行定期输出触发器的触发器。

**周期（Period）**

要触发的周期（以秒为单位）。

#### Trigger Repeat输出

输出

说明

**RepeatOut**

定期生成的输出触发器。

### Trigger Route

![Trigger Route](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc44b380-173f-464c-9a45-ca7bcf6b6ed1/triggers_trigger_route.png)

**Trigger Route** 节点将不同的输入值路由到单个输出值。该节点有多个版本，用于不同的输入数量（2到8之间）和每种支持的数据类型，包括：音频、布尔、浮点、Int32和时间。

#### Trigger Route输入

输入

说明

**设置X（Set X）**

初始化路由的输入触发器。默认选项为0。

**值X（Value X）**

由对应触发器触发时要路由到输出的输入值。

#### Trigger Route输出

输出

说明

**设置时（On Set）**

在设置任意输入触发器时触发。

**值（Value）**

激活的输入触发器设置的输出值。

### Trigger Select

![Trigger Select](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d23b794-39be-4a26-93f6-c769612d1f1b/triggers_trigger_select.png)

**Trigger Select** 节点会将触发器传递到当前选定的输出触发器。此节点具有多个版本，用于不同的输入数量（2到8之间）。

#### Trigger Select输入

输入

说明

**输入（In）**

要传递的触发器。

**索引（Index）**

要触发的输出索引。如果提供的数值超出范围，将予以忽略。

#### Trigger Select输出

输出

说明

**X输出（Out X）**

索引X处的输出触发器。

### Trigger Sequence

![Trigger Sequence](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5cd6ae0-9fdc-4b7a-93d9-1583c8f8bbde/triggers_trigger_sequence.png)

**Trigger Sequence** 节点通过发送序列中的下一个输出触发器来响应输入触发器。该节点有不同的版本，可提供不同数量的输出触发器（2到8之间）。

#### Trigger Sequence输入

输入

说明

**输入（In）**

输入触发器。

**重置（Reset）**

在其上将序列重置回0的触发器。

**循环（Loop）**

启用后，序列会在所有触发器激活后自动循环回0。

#### Trigger Sequence输出

输出

说明

**输出X（Out X）**

序列中的触发器输出。

### Trigger Toggle

![Trigger Toggle](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10ac1e00-9e5d-4576-8f6f-17fa26d9a59f/triggers_trigger_toggle.png)

**Trigger Toggle** 节点将布尔值切换为开或关。

#### Trigger Toggle输入

输入

说明

**开/关（On / Off）**

在其上将布尔输出切换为开或关的触发器。

**初始（Init）**

布尔的初始状态。

#### Trigger Toggle输出

输出

说明

**输出（Out）**

在切换布尔时触发。

**值（Value）**

当前布尔值。

## Value

![Value](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d596d98-d9f8-4428-af06-73bf7ea6d4d0/value_value.png)

**Value** 节点在触发器上设置变量值。该节点有不同的版本，用于每种支持的数据类型，包括：布尔、浮点、Int32和字符串。

#### Value输入

输入

说明

**设置（Set）**

在其上将设置值写入输出的触发器。

**重置（Reset）**

在其上将值重置为初始值的触发器。

**初始值（Init Value）**

要将输出值初始化为的值。

**目标值（Target Value）**

要在触发时将输出设置为的值。

#### Value输出

输出

说明

**设置时（On Set）**

在设置值时触发。

**重置时（On Reset）**

在重置值时触发。

**输出值（Output Value）**

当前输出值。

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound sources](https://dev.epicgames.com/community/search?query=sound%20sources)
-   [metasound](https://dev.epicgames.com/community/search?query=metasound)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [通用](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E9%80%9A%E7%94%A8)
-   [BPM To Seconds](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#bpmtoseconds)
-   [BPM To Seconds输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#bpmtoseconds%E8%BE%93%E5%85%A5)
-   [BPM To Seconds输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#bpmtoseconds%E8%BE%93%E5%87%BA)
-   [Envelope Follower](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#envelopefollower)
-   [Envelope Follower输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#envelopefollower%E8%BE%93%E5%85%A5)
-   [Envelope Follower输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#envelopefollower%E8%BE%93%E5%87%BA)
-   [Flanger](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#flanger)
-   [Flanger输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#flanger%E8%BE%93%E5%85%A5)
-   [Flanger输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#flanger%E8%BE%93%E5%87%BA)
-   [Get WaveTable From Bank](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#getwavetablefrombank)
-   [Get WaveTable From Bank输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#getwavetablefrombank%E8%BE%93%E5%85%A5)
-   [Get WaveTable From Bank输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#getwavetablefrombank%E8%BE%93%E5%87%BA)
-   [InterpTo](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#interpto)
-   [InterpTo输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#interpto%E8%BE%93%E5%85%A5)
-   [InterpTo输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#interpto%E8%BE%93%E5%87%BA)
-   [RingMod](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#ringmod)
-   [RingMod输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#ringmod%E8%BE%93%E5%85%A5)
-   [RingMod输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#ringmod%E8%BE%93%E5%87%BA)
-   [Wave Player](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#waveplayer)
-   [Wave Player输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#waveplayer%E8%BE%93%E5%85%A5)
-   [Wave Player输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#waveplayer%E8%BE%93%E5%87%BA)
-   [WaveShaper](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#waveshaper)
-   [WaveShaper输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#waveshaper%E8%BE%93%E5%85%A5)
-   [WaveShaper输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#waveshaper%E8%BE%93%E5%87%BA)
-   [数组](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E6%95%B0%E7%BB%84)
-   [Concatenate](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#concatenate)
-   [Concatenate输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#concatenate%E8%BE%93%E5%85%A5)
-   [Concatenate输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#concatenate%E8%BE%93%E5%87%BA)
-   [Get](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#get)
-   [Get输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#get%E8%BE%93%E5%85%A5)
-   [Get输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#get%E8%BE%93%E5%87%BA)
-   [Num](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#num)
-   [Num输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#num%E8%BE%93%E5%85%A5)
-   [Num输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#num%E8%BE%93%E5%87%BA)
-   [Random Get](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#randomget)
-   [Random Get输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#randomget%E8%BE%93%E5%85%A5)
-   [Random Get输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#randomget%E8%BE%93%E5%87%BA)
-   [Set](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#set)
-   [Set输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#set%E8%BE%93%E5%85%A5)
-   [Set输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#set%E8%BE%93%E5%87%BA)
-   [Shuffle](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#shuffle)
-   [Shuffle输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#shuffle%E8%BE%93%E5%85%A5)
-   [Shuffle输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#shuffle%E8%BE%93%E5%87%BA)
-   [Subset](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#subset)
-   [Subset输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#subset%E8%BE%93%E5%85%A5)
-   [Subset输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#subset%E8%BE%93%E5%87%BA)
-   [调试](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E8%B0%83%E8%AF%95)
-   [Get Wave Info](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#getwaveinfo)
-   [Get Wave Info输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#getwaveinfo%E8%BE%93%E5%85%A5)
-   [Get Wave Info输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#getwaveinfo%E8%BE%93%E5%87%BA)
-   [Print Log](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#printlog)
-   [Print Log输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#printlog%E8%BE%93%E5%85%A5)
-   [延迟](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E5%BB%B6%E8%BF%9F)
-   [Delay](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#delay)
-   [Delay输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#delay%E8%BE%93%E5%85%A5)
-   [Delay输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#delay%E8%BE%93%E5%87%BA)
-   [Delay Pitch Shift](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#delaypitchshift)
-   [Delay Pitch Shift输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#delaypitchshift%E8%BE%93%E5%85%A5)
-   [Delay Pitch Shift输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#delaypitchshift%E8%BE%93%E5%87%BA)
-   [Diffuser](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#diffuser)
-   [Diffuser输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#diffuser%E8%BE%93%E5%85%A5)
-   [Diffuser输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#diffuser%E8%BE%93%E5%87%BA)
-   [Grain Delay](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#graindelay)
-   [Grain Delay输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#graindelay%E8%BE%93%E5%85%A5)
-   [Grain Delay输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#graindelay%E8%BE%93%E5%87%BA)
-   [Stereo Delay](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#stereodelay)
-   [Stereo Delay输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#stereodelay%E8%BE%93%E5%85%A5)
-   [Stereo Delay输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#stereodelay%E8%BE%93%E5%87%BA)
-   [动态范围](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E5%8A%A8%E6%80%81%E8%8C%83%E5%9B%B4)
-   [Compressor](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#compressor)
-   [Compressor输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#compressor%E8%BE%93%E5%85%A5)
-   [Compressor输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#compressor%E8%BE%93%E5%87%BA)
-   [Decibels to Linear Gain](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#decibelstolineargain)
-   [Decibels to Linear Gain输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#decibelstolineargain%E8%BE%93%E5%85%A5)
-   [Decibels to Linear Gain输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#decibelstolineargain%E8%BE%93%E5%87%BA)
-   [Limiter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#limiter)
-   [Limiter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#limiter%E8%BE%93%E5%85%A5)
-   [Limiter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#limiter%E8%BE%93%E5%87%BA)
-   [Linear Gain to Decibels](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lineargaintodecibels)
-   [Linear Gain to Decibels输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lineargaintodecibels%E8%BE%93%E5%85%A5)
-   [Linear Gain to Decibels输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lineargaintodecibels%E8%BE%93%E5%87%BA)
-   [Envelope](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#envelope)
-   [AD Envelope](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#adenvelope)
-   [AD Envelope输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#adenvelope%E8%BE%93%E5%85%A5)
-   [AD Envelope输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#adenvelope%E8%BE%93%E5%87%BA)
-   [ADSR Envelope](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#adsrenvelope)
-   [ADSR Envelope输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#adsrenvelope%E8%BE%93%E5%85%A5)
-   [ADSR Envelope输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#adsrenvelope%E8%BE%93%E5%87%BA)
-   [Crossfade](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#crossfade)
-   [Crossfade输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#crossfade%E8%BE%93%E5%85%A5)
-   [Crossfade输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#crossfade%E8%BE%93%E5%87%BA)
-   [Evaluate WaveTable](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#evaluatewavetable)
-   [Evaluate WaveTable输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#evaluatewavetable%E8%BE%93%E5%85%A5)
-   [Evaluate WaveTable输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#evaluatewavetable%E8%BE%93%E5%87%BA)
-   [WaveTable Envelope](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavetableenvelope)
-   [WaveTable Envelope输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavetableenvelope%E8%BE%93%E5%85%A5)
-   [WaveTable Envelope输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavetableenvelope%E8%BE%93%E5%87%BA)
-   [外部IO](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E5%A4%96%E9%83%A8io)
-   [Audio Bus Reader](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#audiobusreader)
-   [Audio Bus Reader输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#audiobusreader%E8%BE%93%E5%85%A5)
-   [Audio Bus Reader输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#audiobusreader%E8%BE%93%E5%87%BA)
-   [Wave Writer](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavewriter)
-   [Wave Writer输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavewriter%E8%BE%93%E5%85%A5)
-   [滤波器](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E6%BB%A4%E6%B3%A2%E5%99%A8)
-   [Biquad Filter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#biquadfilter)
-   [Biquad Filter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#biquadfilter%E8%BE%93%E5%85%A5)
-   [Biquad Filter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#biquadfilter%E8%BE%93%E5%87%BA)
-   [Bitcrusher](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#bitcrusher)
-   [Bitcrusher输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#bitcrusher%E8%BE%93%E5%85%A5)
-   [Bitcrusher输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#bitcrusher%E8%BE%93%E5%87%BA)
-   [Dynamic Filter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#dynamicfilter)
-   [Dynamic Filter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#dynamicfilter%E8%BE%93%E5%85%A5)
-   [Dynamic Filter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#dynamicfilter%E8%BE%93%E5%87%BA)
-   [Ladder Filter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#ladderfilter)
-   [Ladder Filter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#ladderfilter%E8%BE%93%E5%85%A5)
-   [Ladder Filter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#ladderfilter%E8%BE%93%E5%87%BA)
-   [Mono Band Splitter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#monobandsplitter)
-   [Mono Band Splitter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#monobandsplitter%E8%BE%93%E5%85%A5)
-   [Mono Band Splitter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#monobandsplitter%E8%BE%93%E5%87%BA)
-   [One-Pole High Pass Filter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#one-polehighpassfilter)
-   [One-Pole High Pass Filter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#one-polehighpassfilter%E8%BE%93%E5%85%A5)
-   [One-Pole High Pass Filter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#one-polehighpassfilter%E8%BE%93%E5%87%BA)
-   [One-Pole Low Pass Filter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#one-polelowpassfilter)
-   [One-Pole Low Pass Filter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#one-polelowpassfilter%E8%BE%93%E5%85%A5)
-   [One-Pole Low Pass Filter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#one-polelowpassfilter%E8%BE%93%E5%87%BA)
-   [Sample And Hold](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#sampleandhold)
-   [Sample And Hold输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#sampleandhold%E8%BE%93%E5%85%A5)
-   [Sample And Hold输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#sampleandhold%E8%BE%93%E5%87%BA)
-   [State Variable Filter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#statevariablefilter)
-   [State Variable Filter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#statevariablefilter%E8%BE%93%E5%85%A5)
-   [State Variable Filter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#statevariablefilter%E8%BE%93%E5%87%BA)
-   [Stereo Band Splitter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#stereobandsplitter)
-   [Stereo Band Splitter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#stereobandsplitter%E8%BE%93%E5%85%A5)
-   [Stereo Band Splitter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#stereobandsplitter%E8%BE%93%E5%87%BA)
-   [发生器](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E5%8F%91%E7%94%9F%E5%99%A8)
-   [Additive Synth](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#additivesynth)
-   [Additive Synth输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#additivesynth%E8%BE%93%E5%85%A5)
-   [Additive Synth输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#additivesynth%E8%BE%93%E5%87%BA)
-   [Low Frequency Noise](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lowfrequencynoise)
-   [Low Frequency Noise输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lowfrequencynoise%E8%BE%93%E5%85%A5)
-   [Low Frequency Noise输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lowfrequencynoise%E8%BE%93%E5%87%BA)
-   [Low-Frequency Oscillator（LFO）](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#low-frequencyoscillator%EF%BC%88lfo%EF%BC%89)
-   [LFO输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lfo%E8%BE%93%E5%85%A5)
-   [LFO输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lfo%E8%BE%93%E5%87%BA)
-   [Noise](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#noise)
-   [Noise输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#noise%E8%BE%93%E5%85%A5)
-   [Noise输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#noise%E8%BE%93%E5%87%BA)
-   [Perlin Noise](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#perlinnoise)
-   [Perlin Noise输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#perlinnoise%E8%BE%93%E5%85%A5)
-   [Perlin Noise输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#perlinnoise%E8%BE%93%E5%87%BA)
-   [Saw](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#saw)
-   [Saw输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#saw%E8%BE%93%E5%85%A5)
-   [Saw输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#saw%E8%BE%93%E5%87%BA)
-   [Sine](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#sine)
-   [Sine输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#sine%E8%BE%93%E5%85%A5)
-   [Sine输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#sine%E8%BE%93%E5%87%BA)
-   [Square](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#square)
-   [Square输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#square%E8%BE%93%E5%85%A5)
-   [Square输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#square%E8%BE%93%E5%87%BA)
-   [SuperOscillator](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#superoscillator)
-   [SuperOscillator输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#superoscillator%E8%BE%93%E5%85%A5)
-   [SuperOscillator输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#superoscillator%E8%BE%93%E5%87%BA)
-   [Triangle](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triangle)
-   [Triangle输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triangle%E8%BE%93%E5%85%A5)
-   [Triangle输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triangle%E8%BE%93%E5%87%BA)
-   [WaveTable Oscillator](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavetableoscillator)
-   [WaveTable Oscillator输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavetableoscillator%E8%BE%93%E5%85%A5)
-   [WaveTable Oscillator输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavetableoscillator%E8%BE%93%E5%87%BA)
-   [WaveTable Player](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavetableplayer)
-   [WaveTable Player输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavetableplayer%E8%BE%93%E5%85%A5)
-   [WaveTable Player输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#wavetableplayer%E8%BE%93%E5%87%BA)
-   [数学](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E6%95%B0%E5%AD%A6)
-   [Abs](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#abs)
-   [Add](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#add)
-   [Clamp](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#clamp)
-   [Clamp输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#clamp%E8%BE%93%E5%85%A5)
-   [Clamp输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#clamp%E8%BE%93%E5%87%BA)
-   [Divide](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#divide)
-   [Filter Q To Bandwidth](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#filterqtobandwidth)
-   [Linear To Log Frequency](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lineartologfrequency)
-   [Linear To Log Frequency输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lineartologfrequency%E8%BE%93%E5%85%A5)
-   [Linear To Log Frequency输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#lineartologfrequency%E8%BE%93%E5%87%BA)
-   [日志](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E6%97%A5%E5%BF%97)
-   [Map Range](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#maprange)
-   [Map Range输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#maprange%E8%BE%93%E5%85%A5)
-   [Map Range输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#maprange%E8%BE%93%E5%87%BA)
-   [Max](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#max)
-   [Max输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#max%E8%BE%93%E5%85%A5)
-   [Max输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#max%E8%BE%93%E5%87%BA)
-   [Min](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#min)
-   [Min输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#min%E8%BE%93%E5%85%A5)
-   [Min输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#min%E8%BE%93%E5%87%BA)
-   [Modulo](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#modulo)
-   [Multiply](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#multiply)
-   [Power](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#power)
-   [Subtract](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#subtract)
-   [混合](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E6%B7%B7%E5%90%88)
-   [Mono Mixer](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#monomixer)
-   [Stereo Mixer](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#stereomixer)
-   [音乐](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E9%9F%B3%E4%B9%90)
-   [Frequency To MIDI](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#frequencytomidi)
-   [Frequency To MIDI输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#frequencytomidi%E8%BE%93%E5%85%A5)
-   [Frequency To MIDI输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#frequencytomidi%E8%BE%93%E5%87%BA)
-   [MIDI Note Quantizer](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#midinotequantizer)
-   [MIDI Note Quantizer输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#midinotequantizer%E8%BE%93%E5%85%A5)
-   [MIDI Note Quantizer输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#midinotequantizer%E8%BE%93%E5%87%BA)
-   [MIDI To Frequency](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#miditofrequency)
-   [MIDI To Frequency输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#miditofrequency%E8%BE%93%E5%85%A5)
-   [MIDI To Frequency输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#miditofrequency%E8%BE%93%E5%87%BA)
-   [Scale to Note Array](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#scaletonotearray)
-   [Scale to Note Array输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#scaletonotearray%E8%BE%93%E5%85%A5)
-   [Scale to Note Array输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#scaletonotearray%E8%BE%93%E5%87%BA)
-   [Random](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#random)
-   [Random输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#random%E8%BE%93%E5%85%A5)
-   [Random输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#random%E8%BE%93%E5%87%BA)
-   [空间化](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E7%A9%BA%E9%97%B4%E5%8C%96)
-   [ITD Panner](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#itdpanner)
-   [ITD Panner输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#itdpanner%E8%BE%93%E5%85%A5)
-   [ITD Panner输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#itdpanner%E8%BE%93%E5%87%BA)
-   [Mid-Side Decode](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#mid-sidedecode)
-   [Mid-Side Decode输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#mid-sidedecode%E8%BE%93%E5%85%A5)
-   [Mid-Side Decode输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#mid-sidedecode%E8%BE%93%E5%87%BA)
-   [Mid-Side Encode](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#mid-sideencode)
-   [Mid-Side Encode输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#mid-sideencode%E8%BE%93%E5%85%A5)
-   [Mid-Side Encode输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#mid-sideencode%E8%BE%93%E5%87%BA)
-   [Stereo Panner](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#stereopanner)
-   [Stereo Panner输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#stereopanner%E8%BE%93%E5%85%A5)
-   [Stereo Panner输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#stereopanner%E8%BE%93%E5%87%BA)
-   [触发器](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#%E8%A7%A6%E5%8F%91%E5%99%A8)
-   [Trigger Accumulate](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeraccumulate)
-   [Trigger Accumulate输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeraccumulate%E8%BE%93%E5%85%A5)
-   [Trigger Accumulate输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeraccumulate%E8%BE%93%E5%87%BA)
-   [Trigger Any](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerany)
-   [Trigger Any输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerany%E8%BE%93%E5%85%A5)
-   [Trigger Any输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerany%E8%BE%93%E5%87%BA)
-   [Trigger Compare](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggercompare)
-   [Trigger Compare输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggercompare%E8%BE%93%E5%85%A5)
-   [Trigger Compare输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggercompare%E8%BE%93%E5%87%BA)
-   [Trigger Control](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggercontrol)
-   [Trigger Control输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggercontrol%E8%BE%93%E5%85%A5)
-   [Trigger Control输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggercontrol%E8%BE%93%E5%87%BA)
-   [Trigger Counter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggercounter)
-   [Trigger Counter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggercounter%E8%BE%93%E5%85%A5)
-   [Trigger Counter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggercounter%E8%BE%93%E5%87%BA)
-   [Trigger Delay](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerdelay)
-   [Trigger Delay输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerdelay%E8%BE%93%E5%85%A5)
-   [Trigger Delay输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerdelay%E8%BE%93%E5%87%BA)
-   [Trigger Filter](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerfilter)
-   [Trigger Filter输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerfilter%E8%BE%93%E5%85%A5)
-   [Trigger Filter输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerfilter%E8%BE%93%E5%87%BA)
-   [Trigger On Threshold](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeronthreshold)
-   [Trigger On Threshold输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeronthreshold%E8%BE%93%E5%85%A5)
-   [Trigger On Threshold输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeronthreshold%E8%BE%93%E5%87%BA)
-   [Trigger On Value Change](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeronvaluechange)
-   [Trigger On Value Change输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeronvaluechange%E8%BE%93%E5%85%A5)
-   [Trigger On Value Change输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeronvaluechange%E8%BE%93%E5%87%BA)
-   [Trigger Once](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeronce)
-   [Trigger Once输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeronce%E8%BE%93%E5%85%A5)
-   [Trigger Once输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggeronce%E8%BE%93%E5%87%BA)
-   [Trigger Pipe](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerpipe)
-   [Trigger Pipe输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerpipe%E8%BE%93%E5%85%A5)
-   [Trigger Pipe输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerpipe%E8%BE%93%E5%87%BA)
-   [Trigger Repeat](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerrepeat)
-   [Trigger Repeat输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerrepeat%E8%BE%93%E5%85%A5)
-   [Trigger Repeat输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerrepeat%E8%BE%93%E5%87%BA)
-   [Trigger Route](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerroute)
-   [Trigger Route输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerroute%E8%BE%93%E5%85%A5)
-   [Trigger Route输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerroute%E8%BE%93%E5%87%BA)
-   [Trigger Select](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerselect)
-   [Trigger Select输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerselect%E8%BE%93%E5%85%A5)
-   [Trigger Select输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggerselect%E8%BE%93%E5%87%BA)
-   [Trigger Sequence](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggersequence)
-   [Trigger Sequence输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggersequence%E8%BE%93%E5%85%A5)
-   [Trigger Sequence输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggersequence%E8%BE%93%E5%87%BA)
-   [Trigger Toggle](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggertoggle)
-   [Trigger Toggle输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggertoggle%E8%BE%93%E5%85%A5)
-   [Trigger Toggle输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#triggertoggle%E8%BE%93%E5%87%BA)
-   [Value](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#value)
-   [Value输入](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#value%E8%BE%93%E5%85%A5)
-   [Value输出](/documentation/zh-cn/unreal-engine/metasound-function-nodes-reference-guide-in-unreal-engine#value%E8%BE%93%E5%87%BA)