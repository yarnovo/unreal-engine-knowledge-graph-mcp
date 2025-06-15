# 虚幻引擎原生声场环境立体声渲染 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/native-soundfield-ambisonics-rendering-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:23:38.959Z

---

目录

![原生声场环境立体声渲染](https://dev.epicgames.com/community/api/documentation/image/5938a223-53c0-4fc3-80b1-0dab2797f3bd?resizing_type=fill&width=1920&height=335)

**声场** 是真实或虚拟空间区域的音频呈现形式。在现实世界和虚拟音频中，最具挑战性的问题之一在于如何以最佳方式采集和呈现声场。

## 采集和呈现声场的挑战

如果您曾经将麦克风带到海滩、森林或其他想要采集声景的地方，那么您便对可能遇到的困难有所体会。举例而言，假设您将一个心形麦克风带到森林中，当一只小鸟从您的右边飞到左边时，您就能录制到不错的鸟鸣音频。前提条件是您的麦克风在各个方向上的敏感性相同，并且小鸟不断以相同的音量鸣叫。您可以在家庭扬声器设置的左右声道中以相同音量播放该录音：

![Soundfield Mono Setup](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44919994-fcae-46ef-b89c-080131dad115/01-single-microphone-recording-setup.png "Mono Soundfield")

飞过麦克风的小鸟发出的鸣叫在两个扬声器中的原生音量相同。

由于此录制设置存在局限性，因此您录制的鸟鸣无法让听众了解小鸟相对于听众的位置或小鸟飞行的方向。当小鸟靠近麦克风时，两个扬声器的录音声音都将变大；而当小鸟飞远时，两个扬声器的录音声音将变小。

如果您能够用两个相隔一定距离的麦克风录制鸟鸣，播放声音的每个扬声器都配备一个麦克风，那么您将拥有更多的信息：

![Soundfield Stereo Setup](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19cfb9e2-7f79-44dd-bf46-7d0f3b162d8c/02-stereo-recording-setup.png "Stereo Soundfield")

使用双麦克风时，第一个麦克风的鸟鸣声会较大，第二个麦克风的鸟鸣声会较小；之后随着第一个麦克风的声音变小，第二个麦克风的声音会变大。

随着小鸟从右向左移动，左麦克风的声音变大，右麦克风的声音变小。

使用两个麦克风录制立体声音频资产，我们便能从进入音频流的声场采集到重要空间信息：即小鸟当前距麦克风的左侧或右侧有多远。如果我们添加更多的麦克风，就可以采集更多有关小鸟位置和空间动态的空间信息。例如小鸟是在我们的麦克风数组后面，而不是在其前面飞行，甚至是小鸟在麦克风数组上方多高的距离。

**下混** 是获取音频源并将其渲染为多个扬声器输出的过程。如果您熟悉游戏中的下混方式，您可能会注意到，这类似于上图中描述的麦克风数组。

通常每个扬声器播放一个音频源，并且响度与该音频源距该扬声器相对于其他扬声器在游戏世界中所处位置的距离成正比。

典型的平移系统类似于在游戏世界中放置扬声器的地方放置全向麦克风。当我们将游戏下混为立体声时，我们会保留有关音频源离播放器左侧或右侧多远的信息。

将音频下混到5.1或7.1，可根据对比前左和前右声道、左环绕声和右环绕声声道中声源声音大小，提供声源在播放器前面或后面的更多信息。

对于许多应用程序而言，此信息足够供播放器定位音频源。但对于许多用例来说，同时提供海拔信息方为最佳。**编码** （采集）声场呈现信息时，有许多方法可以保留音频源的3D位置，以便对需要的扬声器配置进行轻松 **解码** （播放）。这些方法提供了丰富的空间音频体验。

在下混音频源时，为了保留音频的海拔和方位信息，最流行的声场表示形式之一称为 **环境立体声**。

## 虚幻引擎中的环境立体声

**环境立体声** 是一种特定的声场表现形式，使用 **球谐函数** 将位置音频投射到球体上。您可以从电子游戏的光照使用中识别出球谐函数，环境立体声就相当于声音。使用的环境立体声的 **阶数** 越高，环境立体声音频流的 **空间分辨率** 就越高，将环境立体声音视频流解码到扬声器位置时就更容易定位音频。

可用的麦克风数组有很多，甚至可以直接录制到环境立体声音频文件中。因为您可以根据需求旋转环境立体声编码的音频，所以环境立体声是 **环境音频床** （背景音效）的绝佳选择。当虚幻引擎播放环境立体声源时，可以在玩家环顾四周时动态旋转环境立体声音频床，让玩家觉得环境音频确实来自游戏世界中的固定方向。

## 导入和播放环境立体声音频资产

虚幻引擎仅支持 **一阶环境立体声资产**。

一阶环境立体声资产使用四个通道： **全向组件**, （或称 **W通道**）。以及 **矢量组件**，（或称 **X**、**Y**和**Z通道**）。

虚幻引擎支持两个通道阶：**FuMa（Furse-Malham）** 和 **ACN（环境立体声通道号码）**。

**FuMa通道阶** 会将立体声音频组件按W,Y,Z,X的顺序排序。

**ACN通道阶** 则使用W,X,Y,Z。

由于一阶环境立体声音频使用四个通道，若导入的文件不为四通道，则都将被视为普通的非环境立体声音频资产。

要将环境立体声 `.wav` 文件导入内容浏览器中，资产名称应以下面任一项结尾：

\* `_fuma.wav`（环境立体声文件采用 **FuMa** 通道排序时），或者

\* `_ambix.wav`（环境立体声文件采用 **ACN** 通道排序时）。

这将告知引擎原始环境立体声资产的通道阶数。将文件拖入内容浏览器中之后，打开声波（Sound Wave）资产，将看到声波（Sound Wave）查看器面板中的 **为环境立体声（Is Ambisonics）** 勾选框已选中：

![Is Ambisonics Enabled](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60054f23-4a0a-45ca-9a79-7ebceddd5f9a/03-is-ambisonics-checked.png)

如果在导入 `.wav` 文件之前忘记将文件名以 `_ambix` 或 `_fuma` 结尾，仍然可以自行选中此框。如果这样做，引擎将假定导入的原始文件采用 **ACN** 通道排序。

导入环境立体声文件后，可以像引擎中的任何其他声波一样处理，但需要注意的是 **旋转很重要**。通过世界中的音频组件播放环境立体声声波时，引擎将根据正在播放的音频组件的当前旋转与游戏世界中玩家的当前旋转这二者之间的旋转来旋转环境立体声床。

## 声场副路混合

除了像播放其他声波一样播放环境立体声声波外，还可以在副路混合图表中直接使用环境立体声。为此需要创建 **声场副路混合（Soundfield Submix）**：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66cd71b9-5c85-490d-808b-42555907155d/create_soundfield_submix.png)

可以使用声场副路混合，并将其连接到副路混合图表中的其他副路混合，还能够使用引擎中当前实现、或由当前启用插件实现的任何声场表现形式。

打开新建的声场副路混合（Soundfield Submix）并观察查看器面板，您将看到 **声场编码格式（Soundfield Encoding Format）** 的下拉菜单，其中包括选项 **虚幻环境立体声（Unreal Ambisonics）**：

![Select Unreal Ambisonics Format](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf1e2847-4ab0-4618-ba3d-45264836db7c/05-select-unreal-ambisonics-format.png "Select Unreal Ambisonics")

选择 **虚幻环境立体声（Unreal Ambisonics）** 后，可以将音频源发送到副路混合（无论是否为环境立体声源），将其编码或下混至单个环境立体声流。如果要将带有旋转的环境立体声源发送到环境立体声流，也无需担心，引擎将在向下混合前基于源旋转来旋转环境立体声源音频。

如果已启用 **Google Resonance** 或 **Oculus Audio** 插件，则可能会在 **声场编码格式（Soundfield Encoding Format）** 菜单中看到一些其他条目。这样一来，您就可以将非环境立体声源和环境立体声源以及其他副路混合直接发送到副路混合图表中的Resonance或Oculus。

假设您要获取环境立体声副路混合的输出，然后使用Google Resonance将其渲染为双声道音频。为此，创建另一个声场副路混合，将其拖放到副路混合图表中，然后选择 **Resonance双声道空间化（Resonance Binaural Spatialization）** 作为其 **声场编码格式（Soundfield Encoding Format）**：

![Select Resonance Binaural Spatialization](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db1315a4-1c7b-45b7-bc46-29365c869f47/06-select-resonance-binaural-spatialization.png "Select Resonance Binaural Spatialization")

现在，只要将 **环境立体声副路混合（Ambisonics Submix）** 的输出连接到 **Resonance副路混合（Resonance Submix）** 即可。

![Connect the Ambisonics Submix to the Resonance Submix](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/814e88e0-3613-4a15-bcd1-61638e2b3963/07-connect-ambisonics-submix-to-resonance-submix.png "Connect the Ambisonics Submix to the Resonance Submix")

也可以将环境立体声和非环境立体声源发送到Resonance副路混合（Resonance Submix），它们将被渲染为双声道立体声输出。甚至可以将非声场副路混合的输出发送到声场副路混合，且输出将被自动编码为任何副路混合格式。在下图中，我们将获取正常的下混副路混合输出，将其与Oculus Audio双声道音频流混合，然后将输出发送到其他非声场副路混合：

![Send to Non-Soundfield Submix](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6270cd9-c2d4-492b-96c3-6df7bcf81a9b/08-send-to-non-soundfield-submix.png "Send to the Non-Soundfield Submix")

务必记住，一旦将音频源发送到副路混合，它们就会被下混为该副路混合的格式。

举例而言，如果将音频源的输出仅发送到StandardSoundSubmix，则从发送音频源到MyOculusSubmix收到的空间信息都将丢失。

### 声场编码兼容性

并非所有的声场编码格式都兼容。举例而言，不能将使用Oculus Audio声场格式的副路混合连接到Google Resonance声场副路混合，反之亦然：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60159ef8-644a-4a7c-9acc-2a857517245f/09-incompatible-submixes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60159ef8-644a-4a7c-9acc-2a857517245f/09-incompatible-submixes.png)

点击查看大图。

但可以根据需要将音频源的输出发送到项目中的任一声场副路混合。

## 结论

4.25中的原生环境立体声渲染和声场副路混合是重大进步，让开发者可以控制和扩展虚幻引擎中空间音频流程的每个方面。未来将有更多声场格式添加到该系统中。与此同时，如果您想编写自己的声场格式，请参阅 **音频扩展（Audio Extensions）** 模块中的 `ISoundfieldFormat.h` 。

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound](https://dev.epicgames.com/community/search?query=sound)
-   [soundfield](https://dev.epicgames.com/community/search?query=soundfield)
-   [ambisonics](https://dev.epicgames.com/community/search?query=ambisonics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [采集和呈现声场的挑战](/documentation/zh-cn/unreal-engine/native-soundfield-ambisonics-rendering-in-unreal-engine#%E9%87%87%E9%9B%86%E5%92%8C%E5%91%88%E7%8E%B0%E5%A3%B0%E5%9C%BA%E7%9A%84%E6%8C%91%E6%88%98)
-   [虚幻引擎中的环境立体声](/documentation/zh-cn/unreal-engine/native-soundfield-ambisonics-rendering-in-unreal-engine#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B8%AD%E7%9A%84%E7%8E%AF%E5%A2%83%E7%AB%8B%E4%BD%93%E5%A3%B0)
-   [导入和播放环境立体声音频资产](/documentation/zh-cn/unreal-engine/native-soundfield-ambisonics-rendering-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%92%8C%E6%92%AD%E6%94%BE%E7%8E%AF%E5%A2%83%E7%AB%8B%E4%BD%93%E5%A3%B0%E9%9F%B3%E9%A2%91%E8%B5%84%E4%BA%A7)
-   [声场副路混合](/documentation/zh-cn/unreal-engine/native-soundfield-ambisonics-rendering-in-unreal-engine#%E5%A3%B0%E5%9C%BA%E5%89%AF%E8%B7%AF%E6%B7%B7%E5%90%88)
-   [声场编码兼容性](/documentation/zh-cn/unreal-engine/native-soundfield-ambisonics-rendering-in-unreal-engine#%E5%A3%B0%E5%9C%BA%E7%BC%96%E7%A0%81%E5%85%BC%E5%AE%B9%E6%80%A7)
-   [结论](/documentation/zh-cn/unreal-engine/native-soundfield-ambisonics-rendering-in-unreal-engine#%E7%BB%93%E8%AE%BA)