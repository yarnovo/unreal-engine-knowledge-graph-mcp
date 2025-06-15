# 虚幻引擎中的过场动画音轨 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:43.684Z

---

目录

![音轨](https://dev.epicgames.com/community/api/documentation/image/7a8a580c-4687-479d-8428-bc0c1f0fa54a?resizing_type=fill&width=1920&height=335)

你可以在Seqeuncer的 **音轨（Audio Track）** 中添加[声波（Sound Wave）](/documentation/zh-cn/unreal-engine/sound-waves)和[Sound Cue](/documentation/zh-cn/unreal-engine/sound-cues-in-unreal-engine)，从而为虚幻引擎中的过场动画添加声音。和其他电影编辑软件一样，音轨提供了用于调整音量、音高以及声音过渡的功能按钮。

本文将简要介绍音轨的创建和用法。

#### 先决条件

-   你了解[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)及其[界面](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)。
    
-   你基本了解[如何导入音频文件](/documentation/zh-cn/unreal-engine/importing-audio-files)，或者你的项目已经包含音频文件。
    

## 创建音轨

要创建新音轨，请在[Sequencer编辑器](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)中打开 **关卡序列（Level Sequence）** 并使用 **轨道（Track）** （ **+** ）选择 **音轨（Audio Track）** 。

![添加新音轨](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a0dea03-c99b-4fe6-81cd-45114ed2d349/addnewaudiotrack.png)

在关卡序列中创建音轨之后，你可以在[播放头](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%92%AD%E6%94%BE%E5%A4%B4)位置处向轨道添加音频分段，方法是点击轨道上的 **音频（Audio）** （ **+** ）下拉菜单，并选择[声波](/documentation/zh-cn/unreal-engine/sound-waves)和[Sound Cue](/documentation/zh-cn/unreal-engine/sound-cues-in-unreal-engine)资产。

![添加音频资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93e2a294-8693-4015-aa63-35f369e582d1/addaudioasset.png)

你还可以从[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)将 **声波（Sound Waves）** 和 **Sound Cue** 拖入序列中，这将自动创建音轨并添加声音。

![添加音频资产演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d6e2c2f-b719-4a60-9371-e1ec2afae32e/addaudiodemo.gif)

更多音频剪辑分段可以添加到相同音轨进行线性播放。你还可以添加更多音轨进行分层音频播放与混合，每个音轨都有其自己的混合与对象绑定属性。

![使用多个音频资产和轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a2df2b8-b39a-4781-9003-4ead68166d10/multiaudiotracks.png)

## 使用音频分段

类似于大部分[Sequencer分段](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#%E5%88%86%E6%AE%B5)， **音频分段（Audio Sections）** 可以通过在Sequencer编辑器中修剪、循环和移动分段来编辑。音频分段还可以附加到其他[骨骼网格体](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine)和[对象Actor](/documentation/zh-cn/unreal-engine/unreal-engine-actors-reference)，以便创建动态[声源](/documentation/zh-cn/unreal-engine/sound-sources-in-unreal-engine)和[空间音效](/documentation/zh-cn/unreal-engine/spatialization-overview-in-unreal-engine)。

### 编辑音频分段

类似于Sequencer中的大部分分段，音频分段可以按以下方式[编辑](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#%E4%BA%A4%E4%BA%92%E5%92%8C%E6%98%BE%E7%A4%BA)：

-   拖动音频分段的左右边缘将修剪 **开始（Start）** 和 **结束（End）** 时间。
    
-   将结束时间拖到超过剪辑时长会导致声音在修剪的时长内 **循环** 。
    

![修剪音频资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/daa97cd3-5d4b-4ff6-9e6d-28082bfa218d/audiotrimming.gif)

若音频分段的默认长度经过修剪或编辑，可能由于 **特定于平台** 的编码解码器设置而无法正确播放。要修复此问题，你必须确保 **声音资产压缩类型（Sound Asset Compression Type）** 设置为 **Bink音频（Bink Audio）** 或 **PCM** 。此属性位于声波资产中。

![编码解码器设置压缩音频](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a6fe0ef-d92a-45be-a7e6-d7b263d4b856/codecsettings.png)

### 混合音频分段

拖动音频分段的上角边将导致音量在混合的时长内上下混合。

![音频资产过渡控点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c17dda6b-f8a4-45c4-aa4c-5324e17422db/audiofadehandles.gif)

使两个或更多声音分段相交，将导致它们在重叠的时长内交叉过渡。你可以独立点击和拖动每个剪辑片段上的过渡控点，从而调整剪辑片段之间的交叉过渡。

![混合音频资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/872738b9-7338-4d20-8e4e-2e73f7567c33/audioblending.gif)

如需详细了解你可以在音频分段上使用的混合技术和属性，请参阅[关键帧混合](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine#%E6%B7%B7%E5%90%88)文档。

### 附加声音

你可以创建空间音频效果以实现更有身临其境感、更富于动态变化的过场动画音频，例如3D声音和距离衰减，方法是将音轨附加到关卡序列中的角色和对象。要将音轨附加到关卡序列中的源，请在序列编辑器的大纲中展开该音轨，并从 **附加（Attach）** 属性的下拉菜单选择源。

![将音轨附加到对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ff0bf59-633f-4b7e-82e7-64d545fc5609/attachobject.png)

你只能将音轨附加到关卡序列中当前引用的Actor。

附加音轨后，你必须为轨道中的每个音频剪辑片段指定[衰减模式](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine)，驱动其3D音频行为。要指定衰减模式，请右键点击音频分段并找到 **属性（Properties）** 分段。然后从 **衰减（Attenuation）** 模式属性的下拉菜单选择模式，或 **创建新资产（Create New Asset）** 。

如果声波或Sound Cue资产已指定声音衰减，你不需要为音频分段指定声音衰减资产。

![声音衰减](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f88c8376-c50f-4c19-8745-b3d021f60c9a/soundattenuation.png)

如果你不熟悉 **声音衰减（Sound Attenuation）** 资产，[狐獴Sequencer演示](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine)包含一个声音衰减资产，可供你参考和使用。此外，你还可以参考\[声音衰减(working-with-audio\\spatialization-and-sound-attenuation\\attenuation-overview)页面，了解详情。

音轨的附加轨道还可以[设置关键帧](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)，这样你可以在播放期间的任意时间点更改音频源附件。将音轨附加到多个源时，选择 **附加（Attach）** 轨道将在所有附加的源上显示声音图标。音频附加到该源时，声音图标将在播放或推移期间高亮显示为 **绿色** 。

![使用关键帧附加音频资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39b4fb7f-c6c4-4471-b918-0c91e587b7b0/audioattachkeyframe.gif)

你还可以点击Actor的 **轨道(+)（Track (+)）** 下拉菜单，然后从 **音频（Audio）** 菜单选择音频资产，以在添加到Sequencer的Actor下创建专用音轨。这会自动将声源附加到该Actor。

![Actor的专用音轨](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09bbb584-6d31-42fd-88b5-f3e90e6c1492/dedicatedaudiotrack.png)

为Sequencer中的Actor创建专用音轨时，音轨附件无法更改为其他Actor，正因如此，此处没有 **附加（Attach）** 轨道。

![无附加轨道](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffd0f435-2e70-4732-a8ae-9b3aa6f6f503/noattach.png)

### 将声音附加到骨骼

如果你要将音轨附加到带有 **骨骼网格体组件（Skeletal Mesh Component）** 的Actor，你可以将声音附加到特定骨骼，更好地控制音频源。在音轨的附加属性中选择骨骼网格体Actor后，你可以指定骨骼网格体组件以及角色的骨架中的特定骨骼。

![选择要附加音轨的骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/674e1d2c-e499-44ea-b460-0976e7a657e1/selectbone.png)

## 音轨属性

声音资产添加到音频轨道后可以展开，显示以下可设置关键帧的轨道。

![音轨设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db9eb19c-63f8-4a03-ba84-67f478357691/keytracks.png)

名称

说明

**附加（Attach）**

设置关卡序列中要[将声音附加到](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine#%E9%99%84%E5%8A%A0%E5%A3%B0%E9%9F%B3)其中以用于空间音频用途的Actor。

**音高（Pitch）**

设置音频剪辑的音高值。值越高，音高越高，值越低，音高越低。值 `1` 是默认音高。

**音量（Volume）**

设置音频剪辑片段的音量。值越高，音量越高，值越低，音量越低。值 `1` 是默认音量。

### 音频分段属性

右键点击音频分段并前往 **属性（Properties）** 菜单，界面上将显示以下属性。

![音频分段属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a4341dd-dd17-4bc6-9c17-7e5af168ab79/audiosectionsettings.png)

名称

说明

**声音（Sound）**

设置音频分段的[声波](/documentation/zh-cn/unreal-engine/sound-waves)或[Sound Cue](/documentation/zh-cn/unreal-engine/sound-cues-in-unreal-engine)资产。

**开始帧偏移（Start Frame Offset）**

设置要将此音频分段的开始时间偏移的帧数。此值提供了类似于[滑移式编辑](https://support.apple.com/zh-cn/guide/final-cut-pro/ver1632d8e4/mac)的效果，因为它可以调整声音的可播放区域，而不影响时长。

按住 **Shift** 键的同时在剪辑片段上拖动，这是使用鼠标更改此属性的快捷方式。

**循环（Looping）**

切换音频分段是否能够循环。

**禁止字幕（Suppress Subtitles）**

启用后，如果资产上使用了字幕，将禁止显示字幕。

**覆盖衰减（Override Attenuation）**

启用后，将使用 **衰减设置（Attenuation Settings）** 中指定的衰减覆盖声波衰减资产。

**衰减设置（Attenuation Settings）**

设置[声音衰减](/documentation/zh-cn/unreal-engine/sound-attenuation-in-unreal-engine)资产以驱动音频分段的3D音频行为。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [创建音轨](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine#%E5%88%9B%E5%BB%BA%E9%9F%B3%E8%BD%A8)
-   [使用音频分段](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%9F%B3%E9%A2%91%E5%88%86%E6%AE%B5)
-   [编辑音频分段](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine#%E7%BC%96%E8%BE%91%E9%9F%B3%E9%A2%91%E5%88%86%E6%AE%B5)
-   [混合音频分段](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine#%E6%B7%B7%E5%90%88%E9%9F%B3%E9%A2%91%E5%88%86%E6%AE%B5)
-   [附加声音](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine#%E9%99%84%E5%8A%A0%E5%A3%B0%E9%9F%B3)
-   [将声音附加到骨骼](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine#%E5%B0%86%E5%A3%B0%E9%9F%B3%E9%99%84%E5%8A%A0%E5%88%B0%E9%AA%A8%E9%AA%BC)
-   [音轨属性](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine#%E9%9F%B3%E8%BD%A8%E5%B1%9E%E6%80%A7)
-   [音频分段属性](/documentation/zh-cn/unreal-engine/cinematic-audio-track-in-unreal-engine#%E9%9F%B3%E9%A2%91%E5%88%86%E6%AE%B5%E5%B1%9E%E6%80%A7)

相关文档

[

处理音频

![处理音频](https://dev.epicgames.com/community/api/documentation/image/ba42c917-636d-40f2-ad09-d570fa3a81bb?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/working-with-audio-in-unreal-engine)