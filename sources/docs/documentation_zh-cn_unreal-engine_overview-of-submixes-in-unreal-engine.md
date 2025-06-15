# 虚幻引擎Submix | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:23:43.947Z

---

目录

![Submix介绍](https://dev.epicgames.com/community/api/documentation/image/f4d721b5-3a94-4865-aa10-18795e195c94?resizing_type=fill&width=1920&height=335)

**Submix（子混音）** 是一种 **DSP（数字信号处理）图表**，即便没有音频发送，它也始终运行。

作为 **虚幻引擎** 中音频渲染器的基本组件，Submix有两重用途：

-   将单个资源生成的音频混合到单个输出缓冲区中；
    
-   优化数字信号处理（DSP）效果，同时应用于多个声源。
    

可以将Submix想象成一条流淌的河流——声音播放时，它就像水一样倒入Submix河流。一个Submix连接另一个时，相当于一条河汇入另一条河。所有倒在一起的声音汇聚成一条声音的河流，流淌下去。和河流一样，声音流也只朝着一个方向流淌。

每个Submix **端点**（硬件输出）都从单个图表读取内容。例如，主Submix（即单个默认Submix端点）定义单个Submix图表。

**Sound Cue** 和其他 `USoundBase` 一样，可以发送到Submix。

你可以使用 **蓝图** 修改Submix上的属性，更改Submix处理音频的方式。

## 创建Submix

可以直接在内容浏览器中创建Submix，创建方式与其他音效相关资产差不多：右键点击内容浏览器中的资产区域，选择 **音效（Audio）> 混合（Mix）> 音效Submix（Sound Submix）** 。

## Submix图表编辑器

双击Submix资产，打开 **Submix图表编辑器（Submix Graph Editor）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b925948-2611-4bac-93b0-ef3735e8e5b0/02-the-submix-graph-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b925948-2611-4bac-93b0-ef3735e8e5b0/02-the-submix-graph-editor.png)

点击查看大图

你可以将子组合连接到图表结构，并将一个Submix的输出设置为另一个Submix的输入。

![连接Submix](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e978338-b791-43ee-956a-3deefe26cbb0/03-connect-submixes.png "Connect Submixes")

要从图表编辑器中新建Submix，将输出或输入引脚拖到图表中，然后命名该新Submix（名称不可包含空格）。该新Submix将添加到内容浏览器。

![有多个输入的Submix](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d23f0b0f-db2e-417b-9466-8359a33adde2/04-multiple-inputs-sound-submix.png "A Submix with Multiple Inputs")

一个Submix可以有多个输入，但仅有一个输出。

### 主Submix

**主Submix（Master Submix）** 参数可从项目设置（Project Settings）（**编辑（Edit）>项目设置（Project Settings）>引擎（Engine）>音频（Audio）>混合（Mix）**）中设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0d11457-8d6d-4a3d-b10e-de01d5ea7206/05-set-master-submix-parameters.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0d11457-8d6d-4a3d-b10e-de01d5ea7206/05-set-master-submix-parameters.png)

点击查看大图

双击 **Submix（submix）** 图表访问 **主Submix（Master Submix）** 属性。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2318717-777a-4d64-9c04-78efbcb82eff/06-master-submix-default-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2318717-777a-4d64-9c04-78efbcb82eff/06-master-submix-default-properties.png)

点击查看大图

主Submix直接连接到输出端点（例如硬件扬声器）。这是音频混合器的第一个渲染阶段，之后音频会传递到平台音频后端，然后传递到平台使用的音频设备上。

如果Submix输出引脚未连接到任何地方，会将输出发送到主Submix。

### 主混响Submix

主混响Submix在 **音效类（Sound Class）** 中设置。

![主混响Submix设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/720838ec-c7d3-49ab-bf69-9604091162cd/07-master-reverb-submix-settings.png "Master Reverb Submix Settings")

-   **发送到主混响Submix（Send to Master Reverb Submix）** - 将音效发送到主混响。
    
-   **默认2D混响发送量（Default 2DReverb Send Amount）** - 设置2D音效发送到主混响时的发送级别。
    

### 主EQSubmix

**主EQSubmix（Master EQ Submix）** 在 **音效类（Sound Class）** 的 **旧有（Legacy）** 下设置。

![主EQ Submix设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c66d6ea2-ac5d-453b-bbe7-20635a1fb676/08-master-eq-submix-settings.png "Master EQ Submix Settings")

必须启用 **输出到主EQSubmix（Output to Master EQ Submix）** 设置，才能使 **音效类混合（Sound Class Mixes）** 上的 **EQ设置（EQ Settings）** 正常工作。

## 发送音频到Submix

有几种方法可以将音效源发送到Submix：

-   在音效源资产中手动设置发送。
    
-   使用衰减（Attenuation）设置。
    
-   在蓝图中动态设置。
    
-   通过音频音量（Audio Volumes）设置。
    

### 手动设置Submix发送

要在Submix上运行音效源，或将其生成的音频发送到Submix，将新的Submix资产分配到音效源上的 **Submix（Submix）** 属性。音效资产上的Submix（Submix）属性被视为该音效的 **基本Submix** ，音频全部发送到该Submix。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c697a35e-84db-4ff9-a913-61c706e8ff3b/09-manually-set-up-a-submix-send.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c697a35e-84db-4ff9-a913-61c706e8ff3b/09-manually-set-up-a-submix-send.png)

点击查看大图。

属性：

-   **Submix发送（Submix Sends）** ：音效资产上的Submix发送数组是音效源会向其发送部分音频的一组后续Submix。可手动或远程完成发送；例如，声音越远，发送到Submix的音频越少。
    
-   **发送级别控制方法（Send Level Control Method）** ：源将其音频发送到指定Submix的方法：
    
-   **手动（Manual）** ：音效直接使用发送级别（Send Level）值发送音频。
    
-   **线性（Linear）** ：音效使用最小和最大发送级别以及最小和最大发送距离之间的线性映射，将音频发送到Submix。
    
-   **自定义曲线（Custom Curve）** ：使用自定义发送级别曲线（Custom Send Level Curve）将音频发送到Submix，而非使用线性映射。
    
-   **发送阶段（Send Stage）** ：确定源发送应该在应用距离衰减之前还是之后执行。
    
-   **音效Submix（Sound Submix）** ：音效源使用此Submix发送条目向其发送音频的Submix。
    
-   **发送级别（Send Level）** ：发送级别控制方法（Send Level Control Method）设置为手动（Manual）时所使用的发送级别。
    
-   **禁用手动发送限制（Disable Manual Send Clamp）** ：使用手动发送级别控制方法时启用或禁用0-1限制。
    
-   **最小发送级别（Min Send Level）：** 使用非手动发送级别控制方法时所使用的最小发送级别。
    
-   **最大发送级别（Max Send Level）：** 应用线性控制方法时所使用的最大发送级别。
    
-   **最小发送距离（Min Send Distance）：** 应用线性控制方法时所使用的最小距离。
    
-   **最大发送距离（Max Send Distance）：** 应用线性控制方法时所使用的最大距离。
    
-   **自定义发送级别曲线（Custom Send Level Curve）：** 用于映射最小和最大发送级别和距离的曲线。
    

### 使用音效衰减发送到Submix

Submix发送也可以通过 **衰减（Attenuation）** 设置进行设置。此方法可以简便地从同一处设置大量资产上的Submix发送。由于Submix发送可以根据距离将音频发送至监听器，因此在定义了距离衰减的情况下，此方法有用。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07120352-562c-424f-b696-02927b7ead39/10-send-to-submixes-with-sound-attenuation.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07120352-562c-424f-b696-02927b7ead39/10-send-to-submixes-with-sound-attenuation.png)

点击查看大图。

有关此方法的更多信息，请参见[音效衰减](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine)。

### 在蓝图中动态发动至Submix

利用此蓝图功能，音频组件可使用你选择的任何方法将音频动态路由至任意Submix。

![在蓝图中动态发动至Submix](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/14ecacaa-1a29-4d5d-88f2-2d312641b148/11-send-to-submixes-in-blueprint.png "Send Dynamically to Submixes in Blueprint")

要设置Submix发送，你将需要：

-   **目标（Target）** - 用于将音频发送到Submix的音频组件。
    
-   **Submix** - 向其发送音频的Submix。
    
-   **发送级别（Send Level）** - 发送的音频量，以总音量的百分占比表示。
    

另请参见本文档稍后的[蓝图API和Submix](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E8%93%9D%E5%9B%BEapi%E5%92%8Csubmix)。

### 使用音频体积发送至Submix

音频音量功能支持将音频发送至Submix，具体设置方法类似于直接在音效源上设置发送的方法。主要的区别是，Submix发送基于与音频音量几何体的相对位置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98a9761a-3fb7-4648-b43e-77fa1c29f78d/12-send-to-submixes-using-audio-volume.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98a9761a-3fb7-4648-b43e-77fa1c29f78d/12-send-to-submixes-using-audio-volume.png)

点击查看大图

Submix发送数组中的属性与直接在音效源自身上设置的属性相同。

![设置Submix发送设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09dd7692-2e1f-4f2b-88a0-cb4736b260c6/13-audio-volume-submix-send-array.png "Set Submix Send Settings")

音效源将根据 **监听器位置状态（Listener Location State）** 显示监听器在音量范围内还是在音量范围外，将音频发送到给定Submix发送数组。

音频音量还支持 **Submix重载（Submix Override）** ，具体取决于监听器位置状态。Submix被指定效果链重载，具体取决于监听器在音量范围内还是音量范围外。

## Submix属性

在 **图表编辑器（Graph Editor）** 中，Submix图表中会显示选定Submix的 **属性细节（Property Details）** 面板。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5bb9066-0075-45f0-b8ec-5c1d585b4673/14-master-submix-default-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5bb9066-0075-45f0-b8ec-5c1d585b4673/14-master-submix-default-properties.png)

点击查看大图

属性：

-   **后台运行时静音（Mute when Backgrounded）** - 应用程序在后台运行时，允许Submix通过在其输出上应用 **0.0** 的音量缩放器自动将自己静音。此功能默认允许游戏在后台继续播放音频，但仅适用于部分音频，不是全部。
    
-   **Submix效果链（Submix Effect Chain）** - 这是一组Submix效果，通过它馈送混合的Submix音频。这些效果使用 **合成和DSP效果（Synthesis and DSP Effects）** 插件实现。其他虚幻引擎插件也可以扩展可用Submix效果的列表。
    
-   **环境立体声插件设置（Ambisonics Plugin Settings）** - 通过此属性，插件可以选择性地允许Submix将发送给它的音频源编码为环境立体声声场。这些设置定义声场编码属性。
    

此属性唯一接受的设置类型是Oculus环境立体声设置（启用Oculus插件后）。有关声场的更多信息，请参见[原生声场环境立体声渲染](/documentation/zh-cn/unreal-engine/native-soundfield-ambisonics-rendering-in-unreal-engine)。

-   **父Submix（Parent Submix）** - 选定的Submix的父项。父Submix会将已渲染的输出作为输入来接收。
    
-   **子Submix（Child Submixes）** - 一组将音频作为输入馈送到选定Submix的子Submix。
    
-   **包络跟踪器（Envelope Follower）** - 这是一种DSP算法，将输出已经过平滑处理的音频信号在一段时间内的振幅。启动时间（Attack Time）值定义了算法对振幅增加（**启动**）和振幅减少（**释放**）的反应速度。
    

使用包络跟踪器推导音频信号的振幅要比使用原始音频数据有效得多，因为音频信号的速度（比如每秒48,000个样本）要比游戏帧（例如每秒60帧）快得多。

Submix还有[蓝图API](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E8%93%9D%E5%9B%BEapi%E5%92%8Csubmix)，允许蓝图接收在Submix中渲染的音频的振幅包络体。以下属性定义包络跟踪器的行为方式。

-   **Submix水平（Submix Level）** - 控制Submix的整体音量水平。可以选择将这一类的值设置为显示线性体积增益（例如 **0.0** 到 **1.0**），或分贝数（**\-120 dB** 到 **0 dB**）。分贝是一种常见的音量度量方法，它揭示了一个事实，即音量是以对数方式感知的。
    
-   **输出音量（Output Volume）** - 同时在干通道和湿通道控制整个Submix的整体输出音量。不建议使用此属性混合游戏音量，但可用其调整Submix中的音量。
    
-   **湿度（Wet Level）** - 通过Submix效果链馈送的音频输出音量。此值默认设为 **1.0** ，因为假定大部分人使用Submix时都想要全湿，且所有音频通过效果发送。
    
-   **干度（Dry Level）** - 不是通过Submix效果链馈送的音频输出音量。此值默认设为0.0，因为假定大部分人使用Submix时都想要全湿（所有音频通过效应发送）。
    
-   **音频链接设置（Audio Link Settings）** ：可选的音频链接设置对象。
    
-   **自动禁用（Auto Disable）** ：这将自动启用或禁用Submix，无论是静音还是可以听到。这很适合用于CPU优化。
    
-   **自动禁用时间（Auto Disable Time）** ：这是禁用Submix前要等待的时间长度。
    

## Submix效果

使用 **合成和DSP效果（Synthesis and DSP Effects）** 插件可以实现许多Submix效果。此插件由Epic制作，经常会添加新的合成、源效果和Submix效果。第三方插件制作商也可以轻松添加新的可用Submix效果。

非声场Submix效果的一般要求是能够处理多个音频通道（最多8个通道）。

### 制作Submix效果预设

**Submix效果预设（Submix Effect Preset）** 是一种存在于内容浏览器中的资产，它挂接到Submix效果链。要创建Submix效果预设，在内容浏览器中点击右键，选择 **音效（Audio）>效果（Effects）>Submix效果预设（SubmixEffectPreset）** 。系统会提供类选取器，供你选择要创建预设资产的效果。

![选取Submix效果类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51c43eec-bcb1-4c59-92b3-3a8222f4a8c8/16-pick-submix-effect-class.png "Pick a Submix Effect Class")

插件将自动扩展 **选取Submix效果类（Pick Submix Effect Class）** 列表中的可用选项。

## 蓝图API和Submix

Submix在 **蓝图** 中很有用。例如，可以创建 **音效Submix变量（Sound Submix Variable）** 引用来引用蓝图中的Submix。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38138b70-94b4-4465-a92a-e3dc1533421b/17-reference-a-submix-in-a-blueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38138b70-94b4-4465-a92a-e3dc1533421b/17-reference-a-submix-in-a-blueprint.png)

点击查看大图

## 在蓝图中录制Submix音频

Submix支持将Submix的音频输出录制到输出到磁盘的PCM（脉冲编码调制）.wav文件，或录制到声波资产。每个Submix同一时间仅可激活一个录制。

-   保存的 **.wav文件** 的默认路径是 `Saved\BouncedWavFiles` 。
    
-   **声波（Sound Waves）** 保存到内容浏览器的根目录。
    

你可以在设置 **完成录制输出（Finish Recording Output）** （见下文）时更改任一路径。

![开始录制Submix输出](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2035f3be-a4a1-4647-a070-e31df712b4a0/18-start-recording-output.png "Start Recording Submix Output")

**开始录制输出（Start Recording Output）** 属性：

-   **预期时长（Expected Duration）** - 可选的高级参数，用于预分配预期时长内的内部音频缓冲区（以秒为单位）。
    
-   **要录制的Submix（Submix to Record）** - 要录制的Submix。
    

**暂停录制输出（Pause Recording Output）** 暂停录制。

![暂停录制Submix输出](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3088f306-627a-4668-b30c-8d7d4397fc73/19-pause-recording-output.png "Pause Recording Submix Output")

**恢复录制输出（Resume Recording Output）** 恢复录制。

![恢复录制Submix输出](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aad94c47-697b-40d9-b0e3-1fe04ac1455a/20-resume-recording-output.png "Resume Recording Submix Output")

**完成录制输出（Finish Recording Output）** 结束录制并保存。

![完成录制Submix输出](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/caaa1db4-af74-485e-874e-6f8f355e21a2/21-finish-recording-output.png "Finish Recording Submix Output")

属性：

-   **导出类型（Export Type）** ：将Submix录制导出（或另存）为.wav文件还是声波(UAsset)。
    
-   **名称（Name）** ：资产的名称。
    
-   **路径（Path）** ：导出资产的路径。如果留空，则保存到该导出类型的默认路径。
    
-   **要录制的Submix（Submix to Record）** ：录制的Submix。
    
-   **要重载的现有声波（Existing Sound Wave to Overwrite）** - 若另存为声波，则可选择重载之前的资产。
    

## 蓝图中的实时分析

Submix支持通过 **包络跟踪** 或 **频谱分析** 在蓝图中检索实时分析，例如快速傅里叶变换（FFT）。

### 包络跟踪分析

当Submix上有新的包络数据可用时，将调用 **添加包络跟踪器委托（Add Envelope Follower Delegate）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a6e2df6-2c63-4c38-99b6-7a766fdb9cd0/22-add-envelope-follower-delegate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a6e2df6-2c63-4c38-99b6-7a766fdb9cd0/22-add-envelope-follower-delegate.png)

点击查看大图

使用 **每通道Submix的包络值（envelope value of the submix per channel）** （左、右、中央、左环绕、右环绕等）调用该委托。

**开始包络跟踪（Start Envelope Following）** 启动给定Submix上的包络跟踪器。如果挂接了委托，则该委托将触发。

![启动Submix包络跟踪器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a094faaf-dbb4-4606-a02f-8bce8ad99ee0/startenvelopefollowing.png) ![启动Submix包络跟踪器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2258aca-b3d3-419e-be4a-893ced6d69a9/23-start-envelope-following.png "Start Submix Envelope Follower") ![停止Submix包络跟踪器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75ff35ee-b644-4dfd-a3f4-490b22900f2b/24-stop-envelope-following.png "Stop Submix Envelope Follower")

### 频谱分析

**添加频谱分析委托（Add Spectral Analysis Delegate）** 提供频谱分析。

![添加频谱分析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3392451d-ac82-4aa0-9650-1724c690646c/25-add-spectral-analysis-delegate.png "Add Spectral Analysis")

属性：

-   **带内设置（In Band Settings）** ：用于定义频谱分析器设置的结构体。
    
-   **频带数量（In Num Bands）** ：要分析的频带数量。
    
-   **最小频率范围（In Minimum Frequency）** ：频谱分析器中要考虑的最小频率范围（单位为Hz）。
    
-   **最大频率范围（In Maximum Frequency）** ：最大频率范围。
    

使用设置中定义的各个频谱带的频谱数据调用委托。

**开始频谱分析（Start Spectral Analysis）** 启动频谱分析器。

![开始频谱分析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b6b7159-e30e-40db-88b7-e8f8c6b11ac2/26-start-spectral-analysis.png "Start Spectral Analysis")

**停止频谱分析（Stop Spectral Analysis）** 停止频谱分析。

![停止频谱分析](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dcfc4fdd-98b7-42f2-9c65-2f4987a8cada/27-stop-spectral-analysis.png "Stop Spectral Analysis")

## 蓝图中的音量控制

也可从蓝图为Submix设置音量控制。

**设置Submix输出音量（Set Submix Output Volume）** 直接设置Submix的输出音量。

![设置Submix输出音量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64443bca-c1f8-4c9a-9a4f-5dfa7e874cd6/28-set-submix-output-volume.png "Set Submix Output Volume")

## 蓝图中的Submix效果控制

**添加Submix效果（Add Submix Effect）** 将Submix效果预设动态地添加到Submix效果链的末尾。

![添加Submix效果预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34972143-ea1d-4aca-b6b4-782d45732eb8/29-add-submix-effect.png "Add Submix Effect Preset")

**移除Submix效果预设（Remove Submix Effect Preset）** 移除Submix的Submix效果链中的Submix效果预设。

![移除Submix效果预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09a9cd6c-00fe-42d7-aa3d-7de7e403b523/30-remove-submix-effect.png "Remove Submix Effect Preset")

**移除索引处的Submix效果预设（Remove Submix Effect Preset At Index）** 类似于移除Submix效果预设，但会在Submix效果链中移除给定索引处的Submix效果预设（如果该索引处存在效果）。

![在索引处添加Submix效果预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dede150-dfaf-479d-9203-2b967a442f96/31-remove-submix-effect-at-index.png "Add Submix Effect Preset at Index")

**替换Submix效果（Replace Submix Effect）** 将给定索引处的Submix效果预设替换为新的效果预设。

![替换Submix效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8e78bfc-7bdf-47f3-9282-9427210d3e2d/32-replace-submix-effect.png "Replace Submix Effect")

**清除Submix效果（Clear Submix Effects）** 清除给定Submix上的Submix效果链。

![清除Submix效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95ee998c-f841-4065-9583-f1d45d0c4dd2/33-clear-submix-effects.png "Clear Submix Effects")

**设置Submix效果链重载（Set Submix Effect Chain Override）** 可以一次性重载整个Submix效果链。

![设置Submix效果链覆盖](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef0e4ccb-060a-49b7-ab65-f2fb8df47081/34-set-submix-effect-chain-override.png "Set Submix Effect Chain Override")

属性：

-   **音效Submix（Sound Submix）** - 要使用Submix效果预设链覆盖的Submix。
    
-   **Submix效果预设链（Submix Effect Preset Chain）** ：一组Submix效果预设。
    
-   **消退时间秒（Fade Time Sec）** - Submix效果链的交叉消退时间。这将从当前效果链消退至新效果链重载。
    

还可通过[音频音量](/documentation/zh-cn/unreal-engine/audio-volumes-in-unreal-engine)设置Submix效果链重载。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2596266b-c52c-4ec8-abca-fa962da88dde/35-setting-a-submix-effect-chain-override-via-audio-volumes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2596266b-c52c-4ec8-abca-fa962da88dde/35-setting-a-submix-effect-chain-override-via-audio-volumes.png)

点击查看大图

**清除Submix效果链重载（Clear Submix Effect Chain Override）** 清除已设置的任何Submix效果链重载集。

![清除Submix效果链覆盖](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e59fc72f-0c59-49ba-8f93-e1a5bc109ce7/36-clear-submix-effect-chain-override.png "Clear Submix Effect Chain Override")

属性：

-   **音效Submix（Sound Submix）** - 要清除的Submix。
    
-   **消退时间-秒（Fade Time Sec）** - 从当前Submix效果链重载到默认Submix效果链的交叉消退时间。
    

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [unreal audio engine](https://dev.epicgames.com/community/search?query=unreal%20audio%20engine)
-   [submix](https://dev.epicgames.com/community/search?query=submix)
-   [dsp graph](https://dev.epicgames.com/community/search?query=dsp%20graph)
-   [submix graph editor](https://dev.epicgames.com/community/search?query=submix%20graph%20editor)
-   [master submix](https://dev.epicgames.com/community/search?query=master%20submix)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建Submix](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E5%88%9B%E5%BB%BAsubmix)
-   [Submix图表编辑器](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#submix%E5%9B%BE%E8%A1%A8%E7%BC%96%E8%BE%91%E5%99%A8)
-   [主Submix](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E4%B8%BBsubmix)
-   [主混响Submix](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E4%B8%BB%E6%B7%B7%E5%93%8Dsubmix)
-   [主EQSubmix](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E4%B8%BBeqsubmix)
-   [发送音频到Submix](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E5%8F%91%E9%80%81%E9%9F%B3%E9%A2%91%E5%88%B0submix)
-   [手动设置Submix发送](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AEsubmix%E5%8F%91%E9%80%81)
-   [使用音效衰减发送到Submix](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%9F%B3%E6%95%88%E8%A1%B0%E5%87%8F%E5%8F%91%E9%80%81%E5%88%B0submix)
-   [在蓝图中动态发动至Submix](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E5%8A%A8%E6%80%81%E5%8F%91%E5%8A%A8%E8%87%B3submix)
-   [使用音频体积发送至Submix](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%9F%B3%E9%A2%91%E4%BD%93%E7%A7%AF%E5%8F%91%E9%80%81%E8%87%B3submix)
-   [Submix属性](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#submix%E5%B1%9E%E6%80%A7)
-   [Submix效果](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#submix%E6%95%88%E6%9E%9C)
-   [制作Submix效果预设](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E5%88%B6%E4%BD%9Csubmix%E6%95%88%E6%9E%9C%E9%A2%84%E8%AE%BE)
-   [蓝图API和Submix](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E8%93%9D%E5%9B%BEapi%E5%92%8Csubmix)
-   [在蓝图中录制Submix音频](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E5%BD%95%E5%88%B6submix%E9%9F%B3%E9%A2%91)
-   [蓝图中的实时分析](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E5%AE%9E%E6%97%B6%E5%88%86%E6%9E%90)
-   [包络跟踪分析](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E5%8C%85%E7%BB%9C%E8%B7%9F%E8%B8%AA%E5%88%86%E6%9E%90)
-   [频谱分析](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E9%A2%91%E8%B0%B1%E5%88%86%E6%9E%90)
-   [蓝图中的音量控制](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84%E9%9F%B3%E9%87%8F%E6%8E%A7%E5%88%B6)
-   [蓝图中的Submix效果控制](/documentation/zh-cn/unreal-engine/overview-of-submixes-in-unreal-engine#%E8%93%9D%E5%9B%BE%E4%B8%AD%E7%9A%84submix%E6%95%88%E6%9E%9C%E6%8E%A7%E5%88%B6)