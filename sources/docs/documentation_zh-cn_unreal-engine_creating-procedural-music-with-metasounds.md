# 使用MetaSound创建程序化音乐 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds
> 
> 生成时间: 2025-06-14T20:22:43.549Z

---

目录

![使用MetaSound创建程序化音乐](https://dev.epicgames.com/community/api/documentation/image/8ed55af7-d9c4-4409-bb0e-667cec0a57a8?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

# 使用MetaSound创建程序化音乐

**MetaSound** 是一种高性能的音频系统，使音频设计师能够完全控制数字信号处理（DSP）图表，以生成声源。

本指南介绍了如何使用 **MetaSound源（MetaSound Source）** 和蓝图创建Gameplay驱动的程序化音乐系统。

## 先决条件

本指南需要一个支持玩家角色移动的项目，例如[第一人称模板](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference)项目。

## 1 - 创建音乐MetaSound

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28b07f2c-a27b-476e-accc-b67d01ae2ba8/ms_graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28b07f2c-a27b-476e-accc-b67d01ae2ba8/ms_graph.png)

点击查看大图。

首先创建播放程序化音乐的MetaSound。执行下面的每个子步骤，逐个分段构建上面的图表。

此过程会公开多个输入参数，以便在未来步骤中从蓝图访问。

### 1.1 - 初始设置

创建支持持久立体声音频的MetaSound源。

1.  创建MetaSound源。
    1.  在 **内容浏览器（Content Browser）** 中，点击 **添加（Add）** 按钮。
    2.  选择 **音频（Audio）> MetaSound源（MetaSound Source）** 。
    3.  为新创建的MetaSound命名，例如 `MSS_Music` 。
2.  双击MetaSound打开 **MetaSound编辑器（MetaSound Editor）** 。
3.  在 **界面（Interfaces）** 面板中，点击 **UE.Source.OneShot** 界面条目旁边的 **删除（回收站）（Remove (Trash Bin)）** 按钮。这会生成 **On Finished Output** 节点，它不在氛围声音或音乐等持久声音上使用。
4.  点击 **MetaSound编辑器工具栏（MetaSound Editor Toolbar）** 上的 **MetaSound** 按钮。
5.  在 **细节（Details）** 面板中，点击 **MetaSound > 输出格式（Output Format）** 下拉菜单并选择 **立体声（Stereo）** 。这会将 **Out Mono Output** 节点替换为 **Out Left** 和 **Out Right Output** 节点。

### 1.2 - 节奏和韵律

![节奏和韵律图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6095ceb7-e38d-4b64-8e54-eed517b3318b/tempo_rhythm.png)

构建"节奏和韵律（Tempo and Rhythm）"分段，使用Trigger节点控制音乐的计时。

1.  找到 **On Play Input** 节点并将引脚拖移到空白区域。在节点搜索中输入"Trigger Repeat"，创建连接的节点。你可以拖动节点，在图表中将其四处移动。
2.  在 **Trigger Repeat** 节点上：
    1.  拖移 **周期（Period）** 引脚并创建 **BPM To Seconds** 节点。
    2.  拖移 **RepeatOut** 引脚并创建 **Trigger Counter** 节点。
3.  在 **BPM to Seconds** 节点上：
    1.  将 **全音划分（Divisions of Whole Note）** 设置为16。
    2.  拖移 **BPM** 引脚并选择 **提升到图表输入（Promote to Graph Input）** 。这会创建名为BPM的 **Float Input** 节点。
4.  选择 **BPM** 节点。
5.  在 **细节（Details）** 面板中，将 **默认值（Default Value）> 范围（Range）** 设置为60.0, 180.0。
6.  在 **Trigger Counter** 节点上，将 **重置计数（Reset Count）** 设置为8。
7.  选择除了 **On Play Input** 节点之外的所有节点，右键点击所选节点之一，然后选择 **从选择内容创建注释（Create Comment From Selection）** 。
8.  将注释框命名为"节奏和韵律（Tempo and Rhythm）"。

你可以在 **细节（Details）** 面板中更改所选注释的颜色。

### 1.3 - 旋律生成

![旋律生成图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7b05003-3098-414e-b845-cfcfaa22e9ac/melody_gen.png)

构建"旋律生成（Melody Generation）"分段，按指定音阶生成随机旋律。

1.  在"节奏和韵律（Tempo and Rhythm）"分段中的 **Trigger Counter** 节点上：
    1.  拖移 **触发时（On Trigger）** 引脚并创建 **Random Get (Float:Array)** 节点。
    2.  拖移 **重置时（On Reset）** 引脚并将其连接到 **Random Get (Float:Array)** 节点上的 **重置（Reset）** 。
2.  在 **Random Get (Float:Array)** 节点上：
    1.  拖移 **数组中（In Array）** 引脚并创建 **Scale to Note Array** 节点。
    2.  拖移 **种子（Seed）** 引脚并创建 **Random (Int)** 节点。
    3.  拖移 **数值（Value）** 引脚并创建 **Add (Float)** 节点。
3.  在 **Scale to Note Array** 节点上，拖移 **音级（Scale Degrees）** 引脚并选择 **提升到图表输入（Promote to Graph Input）** 。这会创建名为Scale Degrees的 **Enum Input** 节点。
4.  选择Scale Degrees节点。
5.  在 **细节（Details）** 面板中：
    1.  将 **通用（General）> 输入（Input）** 设置为"Scale"以重命名输入。
    2.  （可选）将 **默认值（Default Value）> 默认（Default）** 设置为你想使用的音阶。这会默认为大音阶。
6.  在 **Random (Int)** 节点上：
    1.  将 **最大值（Max）** 设置为100000。
    2.  拖移 **下一个（Next）** 引脚并选择 **提升到图表输入（Promote to Graph Input）** 。这会创建名为Next的 **Trigger Input** 节点。
7.  选择Next节点。
8.  在 **细节（Details）** 面板中，将 **通用（General）> 输入（Input）** 设置为"NewMelody"以重命名输入。
9.  在 **Add (Float)** 节点上，将底部加数设置为48.0。这是四个八度音的偏移。
10.  将新节点封装在名为"旋律生成（Melody Generation）"的注释框中。

### 1.4 - 合成（正弦）

![合成（正弦）图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/231cfc2c-73db-407d-9b4a-837da77f337b/synth_sine.png)

构建"合成（正弦）（Synthesis (Sine)）"分段，按输入音符的频率生成正弦波。

1.  在"旋律生成（Melody Generation）"分段中的 **Add (Float)** 节点上：
    1.  拖移输出引脚并创建 **MIDI To Frequency (Float)** 节点。
    2.  再次拖移输出引脚并创建另一个 **Add (Float)** 节点。
2.  在新的 **Add (Float)** 节点上：
    1.  拖移输出引脚并创建另一个 **MIDI To Frequency (Float)** 节点。
    2.  拖移底部加数引脚并选择 **提升到图表输入（Promote to Graph Input）** 。这会创建名为AdditionalOperands的 **Float Input** 节点。
3.  选择AdditionalOperands节点。
4.  在 **细节（Details）** 面板中：
    1.  将 **通用（General）> 输入（Input）** 设置为"Detune"以重命名输入。
    2.  将 **默认值（Default Value）> 默认（Default）** 设置为12.0。
    3.  将 **默认值（Default Value）> 范围（Range）** 设置为0.0, 12.0。
5.  在每个 **MIDI To Frequency (Float)** 节点上，拖移 **输出频率（Out Frequency）** 引脚并创建 **Sine** 节点。
6.  在第一个 **Sine** 节点上，拖移 **音频（Audio）** 引脚并创建 **Add (Audio)** 节点。
7.  在第二个 **Sine** 节点上，将 **音频（Audio）** 引脚连接到 **Add (Audio)** 节点的底部加数。
8.  将新节点封装在名为"合成（正弦）（Synthesis (Sine)）"的注释框中。

### 1.5 - 合成（锯齿）

![合成（锯齿）图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6333ffa-f552-4847-856e-aebd2b399881/synth_saw.png)

构建"合成（锯齿）（Synthesis (Saw)）"分段，按输入音符的频率生成锯齿波。

1.  选择"合成（锯齿）（Synthesis (Saw)）"分段中的所有节点，右键点击所选节点之一，然后选择 **复制（Duplicate）** 。
2.  确保 **Add (Float)** 和 **MIDI to Frequency (Float)** 节点的输入引脚连接到"旋律生成（Melody Generation）"分段中 **Add (Float)** 节点的输出引脚。
3.  删除两个 **Sine** 节点并将其替换为 **Saw** 节点。
4.  将新节点封装在名为"合成（锯齿）（Synthesis (Saw)）"的注释框中。

### 1.6 - 交叉过渡

![交叉过渡图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c546cea7-bd32-4433-9c40-3c1b94e7a39a/crossfade.png)

构建"交叉过渡（Crossfade）"分段，控制正弦和锯齿合成的比率。

1.  在"合成（正弦）（Synthesis (Sine)）"分段中的 **Add (Audio)** 上，拖移输出引脚并创建 **Crossfade (Audio, 2)** 节点。
2.  在 **Crossfade (Audio, 2)** 节点上：
    1.  将 **输入1（In 1）** 引脚连接到"合成（锯齿）（Synthesis (Saw)）"分段中的 **Add (Audio)** 节点上的输出引脚。
    2.  拖移 **交叉过渡值（Crossfade Value）** 引脚并选择 **提升到图表输入（Promote to Graph Input）** 。这会创建名为Crossfade Value的 **Float Input** 节点。
3.  选择Crossfade Value。
4.  在 **细节（Details）** 面板中，将 **通用（General）> 输入（Input）** 设置为"Crossfade"以重命名输入。
5.  将新节点封装在名为"合成（交叉过渡）（Synthesis (Crossfade)）"的注释框中。

### 1.7 - 滤波

![滤波图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42de49f5-fce5-46fa-bd39-294680785f0d/filtering.png)

构建"滤波（Filtering）"分段，平滑声音。

1.  在"交叉过渡（Crossfade）"分段中的 **Crossfade (Audio, 2)** 节点上，拖移 **输出（Out）** 引脚并创建 **Ladder Filter** 节点。
2.  在 **Ladder Filter** 节点上：
    1.  将 **谐振（Resonance）** 设置为6.0。
    2.  拖移 **截止频率（Cutoff Frequency）** 引脚并创建 **LFO** 节点。
3.  在 **LFO** 节点上：
    1.  将 **频率（Frequency）** 设置为0.5。
    2.  将 **最小值（Min Value）** 设置为500.0。
    3.  将 **最大值（Max Value）** 设置为5000.0。
4.  将新节点封装在名为"滤波（Filtering）"的注释框中。

### 1.8 - 波封

![波封图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0c6218e-1050-43b0-bcb8-53d70332e571/enveloping.png)

构建"波封（Enveloping）"分段，使用起音衰减波封去除旋律中音符的延持。

1.  在"旋律生成（Melody Generation）"分段中的 **Random Get (Float:Array)** 节点上，拖移 **下一个时（On Next）** 引脚并创建 **AD Envelope (Audio)** 节点。
2.  在 **AD Envelope (Audio)** 节点上，将 **衰减时间（Decay Time）** 设置为0.1。
3.  将新节点封装在名为"波封（Enveloping）"的注释框中。

### 1.9 - 效果处理

![效果处理图表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e689e733-704b-4436-8953-30ba29f5bdf1/effects_processing.png)

构建"效果处理（Effects Processing）"分段，生成立体声范围扩大效果。衰减会带来单声道信号就是立体声信号的错觉。

1.  在"波封（Enveloping）"分段中的 **AD Envelope (Audio)** 节点上，拖移 **输出波封（Out Envelope）** 引脚并创建 **Multiply (Audio)** 节点。
2.  在 **Multiply (Audio)** 节点上：
    1.  将底部乘数引脚连接到"滤波（Filtering）"分段中的 **Ladder Filter** 节点上的 **输出（Out）** 引脚。
    2.  拖移输出引脚并创建 **Delay** 节点。
3.  在 **Delay** 节点上：
    1.  将 **衰减时间（Delay Time）** 设置为0.02。
    2.  拖移 **输出（Out）** 引脚并创建 **Stereo Delay** 节点。
4.  在 **Stereo Delay** 节点上：
    1.  将 **输入右（In Right）** 引脚连接到 **Multiply (Audio)** 节点上的输出引脚。
    2.  将 **衰减模式（Delay Mode）** 设置为 "乒乓效应（Ping Pong）"。
    3.  将 **衰减时间（Delay Time）** 设置为0.2。
    4.  将 **衰减比率（Delay Ratio）** 设置为0.2。
    5.  将 **干度（Dry Level）** 设置为0.7。
    6.  将 **湿度（Wet Level）** 设置为0.2。
    7.  将 **反馈（Feedback）** 设置为0.4。
    8.  将 **输出左（Out Left）** 引脚连接到 **Out Left Output** 节点。
    9.  将 **输出右（Out Right）** 引脚连接到 **Out Right Output** 节点。
5.  将 **Delay** 和 **Stereo Delay** 节点封装在名为"效果处理（Effects Processing）"的注释框中。

### 1.11 - 播放MetaSound

MetaSound现已准备好播放。

1.  保存MetaSound。
2.  点击 **MetaSound编辑器工具栏（MetaSound Editor Toolbar）** 上的 **播放（Play）** 按钮，播放MetaSound。
3.  使用控件或 **细节（Details）** 面板调整输入值并实时监听更改。

## 2 - 构建蓝图Actor

![蓝图Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be1f4ebe-0a0a-47fd-9b09-f960ebd94945/bp_actor.png)

使用 **盒体碰撞物（Box Colliders）** 创建 **蓝图Actor（Blueprint Actor）** ，以在运行时期间触发MetaSound中的更改。

### 2.1 - 创建蓝图类

1.  在 **内容浏览器（Content Browser）** 中，点击 **添加（Add）** 按钮。
2.  选择 **蓝图类（Blueprint Class）** 。
3.  从 **选择父类（Pick Parent Class）** 窗口中，选择 **Actor** 。
4.  为新创建的蓝图Actor命名，例如 `BP_MusicPlayer` 。

### 2.2 - 添加组件

将组件添加到Actor，以创建三个单独的触发区域，这些区域在玩家移入和移出时会做出响应。

1.  双击蓝图Actor打开 **蓝图编辑器（Blueprint Editor）** 。
2.  添加盒体碰撞组件。
    1.  在 **组件（Components）** 面板中：
        1.  点击 **添加（Add）** 按钮。
        2.  在搜索栏中输入"Box Collision"并按Enter键。
    2.  在 **细节（Details）** 面板中：
        1.  将 **变换（Transform）> 缩放（Scale）** 设置为5.0、5.0、1.0。
        2.  禁用 **渲染（Rendering）> 在游戏中隐藏（Hidden In Game）** 。
3.  将文本渲染组件添加到盒体碰撞组件。
    1.  在 **组件（Components）** 面板中：
        1.  选择盒体碰撞组件。
        2.  点击 **添加（Add）** 按钮。
        3.  在搜索栏中输入"Text Render"并按Enter键。
    2.  在 **细节（Details）** 面板中：
        1.  将 **变换（Transform）> 位置（Location）** 设置为0.0、0.0、150.0。
        2.  将 **文本（Text）> 水平对齐（Horizontal Alignment）** 设置为"居中（Center）"。
        3.  将 **文本（Text）> 世界大小（World Size）** 设置为64.0。
4.  创建组件的两个额外副本。执行以下操作两次：
    1.  在 **组件（Components）** 面板中，按住Ctrl键的同时点击，选择盒体碰撞组件和文本渲染组件。
    2.  右键点击并选择 **复制（Duplicate）** 。
5.  自定义BPM触发器。
    1.  在 **组件（Components）** 面板中，右键点击第一个盒体碰撞组件，选择 **重命名（Rename）** ，并将其命名为 `Trigger_BPM` 。
    2.  在 **细节（Details）** 面板中，将 **变换（Transform ）> 位置（Location）** 设置为0.0、350.0、0.0。
    3.  在 **组件（Components）** 面板中，选择子文本渲染组件。
    4.  在 **细节（Details）** 面板中，将 **文本（Text）> 文本（Text）** 设置为BPM。
6.  自定义交叉过渡触发器。
    1.  在 **组件（Components）** 面板中，右键点击第二个盒体碰撞组件，选择 **重命名（Rename）** ，并将其命名为 `Trigger_Crossfade` 。
    2.  选择子文本渲染组件。
    3.  在 **细节（Details）** 面板中，将 **文本（Text）> 文本（Text）** 设置为"交叉过渡（Crossfade）"。
7.  自定义旋律触发器。
    1.  在 **组件（Components）** 面板中，右键点击第三个盒体碰撞组件，选择 **重命名（Rename）** ，并将其命名为 `Trigger_Melody` 。
    2.  在 **细节（Details）** 面板中，将 **变换（Transform ）> 位置（Location）** 设置为0.0、-350.0、0.0。
    3.  在 **组件（Components）** 面板中，选择子文本渲染组件。
    4.  在 **细节（Details）** 面板中，将 **文本（Text）> 文本（Text）** 设置为"旋律（Melody）"。
8.  添加MetaSound的音频组件。
    1.  在 **组件（Components）** 面板中：
        1.  点击 **添加（Add）** 按钮。
        2.  在搜索栏中输入"Audio"并按Enter键。
        3.  在 **细节（Details）** 面板中，将 **声音（Sound）> 声音（Sound）** 设置为音乐MetaSound。

### 2.3 - 添加触发器事件

为每个区域添加碰撞响应事件。

1.  在 **组件（Components）** 面板中，选择Trigger\_BPM。
2.  在 **细节（Details）** 面板中：
    1.  选择 **事件（Events）> 在组件开始重叠时（On Component Begin Overlap）** 旁边的 **添加（Add (+)）** 按钮。
    2.  选择 **事件（Events）> 在组件结束重叠时（On Component End Overlap）** 旁边的 **添加（Add (+)）** 按钮。
3.  在 **组件（Components）** 面板中，选择Trigger\_Crossfade。
4.  在 **细节（Details）** 面板中：
    1.  选择 **事件（Events）> 在组件开始重叠时（On Component Begin Overlap）** 旁边的 **添加（Add (+)）** 按钮。
    2.  选择 **事件（Events）> 在组件结束重叠时（On Component End Overlap）** 旁边的 **添加（Add (+)）** 按钮。
5.  在 **组件（Components）** 面板中，选择Trigger\_Melody。
6.  在 **细节（Details）** 面板中，选择 **事件（Events）> 在组件开始重叠时（On Component Begin Overlap）** 旁边的 **添加（Add (+)）** 按钮。

### 2.4 - 构建触发器事件

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52b81eb1-f48f-484a-a377-d831ac4463ae/bp_graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52b81eb1-f48f-484a-a377-d831ac4463ae/bp_graph.png)

点击查看大图。

将节点附加到每个事件以控制音乐。

你可能需要关闭位于搜索上下文菜单右上角的 **上下文相关（Context Sensitive）** 筛选器，才能找到下面使用的 **Set Float Parameter (Audio)** 和 **Execute Trigger Parameter** 节点。

1.  在 **On Component Begin Overlap (Trigger\_BPM)** 节点上，拖移 **Exec Output (>)** 引脚，并创建 **Set Float Parameter (Audio)** 节点。
2.  在 **Set Float Parameter** 节点上：
    1.  将 **输入名称（In Name）** 设置为BPM。
    2.  将 **输入浮点（In Float）** 设置为120.0。
3.  在 **On Component End Overlap (Trigger\_BPM)** 节点上，拖移 **Exec Output (>)** 引脚，并创建另一个 **Set Float Parameter (Audio)** 节点。
4.  在新的 **Set Float Parameter** 节点上：
    1.  将 **输入名称（In Name）** 设置为BPM。
    2.  将 **输入浮点（In Float）** 设置为90.0。
5.  在 **On Component Begin Overlap (Trigger\_Crossfade)** 节点上，拖移 **Exec Output (>)** 引脚，并创建另一个 **Set Float Parameter (Audio)** 节点。
6.  在新的 **Set Float Parameter** 节点上：
    1.  将 **输入名称（In Name）** 设置为Crossfade。
    2.  将 **输入浮点（In Float）** 设置为1.0。
7.  在 **On Component End Overlap (Trigger\_Crossfade)** 节点上，拖移 **Exec Output (>)** 引脚，并创建另一个 **Set Float Parameter (Audio)** 节点。
8.  在新的 **Set Float Parameter** 节点上：
    1.  将 **输入名称（In Name）** 设置为Crossfade。
    2.  将 **输入浮点（In Float）** 设置为0.0。
9.  在 **On Component Begin Overlap (Trigger\_Melody)** 节点上，拖移 **Exec Output (>)** 引脚，并创建 **Execute Trigger Parameter** 节点。
10.  在 **Execute Trigger Parameter** 节点上：
    1.  将 **输入名称（In Name）** 设置为NewMelody。
    2.  在 **组件（Components）** 面板中，将音频组件拖到 **目标（Target）** 引脚上。
11.  编译并保存蓝图。

## 3 - 测试关卡

蓝图已准备好进行测试。

1.  将BP\_MusicPlayer从 **内容浏览器（Content Browser）** 拖入 **关卡（Level）** 中来放置它。
2.  使用变换控件放置Actor，以便你的角色可以移入和移出其中。
3.  点击 **关卡编辑器工具栏（Level Editor Toolbar）** 上的 **播放（Play）** 按钮。
4.  移入和移出触发器，观察对音乐的影响。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound sources](https://dev.epicgames.com/community/search?query=sound%20sources)
-   [metasounds](https://dev.epicgames.com/community/search?query=metasounds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用MetaSound创建程序化音乐](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#%E4%BD%BF%E7%94%A8metasound%E5%88%9B%E5%BB%BA%E7%A8%8B%E5%BA%8F%E5%8C%96%E9%9F%B3%E4%B9%90)
-   [先决条件](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [1 - 创建音乐MetaSound](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#1-%E5%88%9B%E5%BB%BA%E9%9F%B3%E4%B9%90metasound)
-   [1.1 - 初始设置](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#11-%E5%88%9D%E5%A7%8B%E8%AE%BE%E7%BD%AE)
-   [1.2 - 节奏和韵律](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#12-%E8%8A%82%E5%A5%8F%E5%92%8C%E9%9F%B5%E5%BE%8B)
-   [1.3 - 旋律生成](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#13-%E6%97%8B%E5%BE%8B%E7%94%9F%E6%88%90)
-   [1.4 - 合成（正弦）](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#14-%E5%90%88%E6%88%90%EF%BC%88%E6%AD%A3%E5%BC%A6%EF%BC%89)
-   [1.5 - 合成（锯齿）](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#15-%E5%90%88%E6%88%90%EF%BC%88%E9%94%AF%E9%BD%BF%EF%BC%89)
-   [1.6 - 交叉过渡](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#16-%E4%BA%A4%E5%8F%89%E8%BF%87%E6%B8%A1)
-   [1.7 - 滤波](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#17-%E6%BB%A4%E6%B3%A2)
-   [1.8 - 波封](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#18-%E6%B3%A2%E5%B0%81)
-   [1.9 - 效果处理](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#19-%E6%95%88%E6%9E%9C%E5%A4%84%E7%90%86)
-   [1.11 - 播放MetaSound](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#111-%E6%92%AD%E6%94%BEmetasound)
-   [2 - 构建蓝图Actor](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#2-%E6%9E%84%E5%BB%BA%E8%93%9D%E5%9B%BEactor)
-   [2.1 - 创建蓝图类](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#21-%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BE%E7%B1%BB)
-   [2.2 - 添加组件](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#22-%E6%B7%BB%E5%8A%A0%E7%BB%84%E4%BB%B6)
-   [2.3 - 添加触发器事件](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#23-%E6%B7%BB%E5%8A%A0%E8%A7%A6%E5%8F%91%E5%99%A8%E4%BA%8B%E4%BB%B6)
-   [2.4 - 构建触发器事件](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#24-%E6%9E%84%E5%BB%BA%E8%A7%A6%E5%8F%91%E5%99%A8%E4%BA%8B%E4%BB%B6)
-   [3 - 测试关卡](/documentation/zh-cn/unreal-engine/creating-procedural-music-with-metasounds#3-%E6%B5%8B%E8%AF%95%E5%85%B3%E5%8D%A1)