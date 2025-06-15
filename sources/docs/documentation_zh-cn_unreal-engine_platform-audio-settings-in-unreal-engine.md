# 虚幻引擎平台音频设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/platform-audio-settings-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:21:16.613Z

---

目录

![平台音频设置](https://dev.epicgames.com/community/api/documentation/image/ff2994a4-c16e-467b-b5a6-c4256d589842?resizing_type=fill&width=1920&height=335)

**虚幻引擎（Unreal Engine）** 支持的每个平台都在其 **项目设置（Project Settings）** 菜单中具有一个 **音频（Audio）** 类别。此类别包含平台专用的选项，应用程序利用这些选项来管理音频，包括 **音频混合器（Audio Mixer）** 设置和压缩设置。这些值重载你的全局音频设置。虽然音频设置在每个平台中都会写入到不同的配置文件，但所有平台都可能具有相同的设置。

对于大部分音频设置，如果使用0或更低的值，则该设置将被全局音频设置忽略。

这些设置和所有其他平台专用项目设置都写入到每个平台的 `(PlatformName)Engine.ini` 文件中。

### 配置平台音频设置

点击 **设置（Settings） > 项目设置（Project Settings）** ，打开 **项目设置（Project Settings）** 窗口。转到 **平台（Platforms）** 部分，点击目标平台的名称。滚动到 **音频（Audio）** 类别，展开该类别以显示所有平台专用音频设置。

![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e043df5-56c7-433a-aab9-6e86ba9ca73a/platform-audio-settings-1.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e2c099c-8336-428d-9e25-3db6440ed2c1/platform-audio-settings-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e2c099c-8336-428d-9e25-3db6440ed2c1/platform-audio-settings-2.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49538fba-9271-4d45-9e37-b188898c2195/platform-audio-settings-1.png)

下表汇总了所有这些设置。

设置名称

说明

音频混合器采样率

以何种采样率来运行音频混合器。

回调缓冲区大小

要在每个音频回调块中计算的音频数量。较小的值可以降低音频延迟，但可能增加CPU成本。

要排队的缓冲区数量

要保持排队状态的音频缓冲区数量。更多的缓冲区会增加音频延迟，但可以弥补某些平台上作业池中线程的不同可用性。

最大通道数

此平台的最大音频语音数。在比较此设置和全局设置后，应用程序中将使用两者中的较小值。

源工作器数

可用于计算源音频的工作器数。源在工作器之间平均分布。

压缩重载

将针对选定的平台而重载的音频压缩设置列表。请参考下面的压缩重载表了解详细信息。

烘焙重载

将针对选定的平台而重载的烘焙设置列表。请参考下面的烘焙重载表了解详细信息。

空间化插件

要在此平台使用哪个当前已启用的空间化插件。

混响插件

要在此平台使用哪个当前已启用的混响插件。

遮蔽插件

要在此平台使用哪个当前已启用的遮蔽插件。

Sound Cue烘焙质量

用于烘焙SoundCues的质量级别。如果设置，烘焙器将根据此设置来剥离所有其他关卡。

**压缩重载（Compression Overrides）**

设置名称

说明

重载压缩时间

如果设置为true，将重载音效组，并使用时长阈值来确定是否在初始加载期间完全解压缩音效。

时长阈值

以秒为单位的值。如果启用了"重载压缩时间"，则任何低于该时长值的音效都将在加载时完全解压缩。否则，将在加载时缓存该音效的一小段，而其余部分将实时解压缩。

随机SoundCue节点上的最大分支数

在此平台上，使用随机节点的SoundCues将预先加载此数量的分支并放弃所有其他分支。这可以显著降低内存使用量。

SoundCue的质量系数

使用此系数的指定质量级别来重载用于此平台上的SoundCue的质量设置。

**烘焙重载（Cook Overrides）**

设置名称

说明

每个流送数据块的最大大小 (KB)

在针对此平台进行烘焙时，确定如何将压缩的音频文件分割成数据块。此值越小，文件分割成的数据块越多。

使用流送缓存（试验性）

在烘焙项目时支持使用音频流送缓存，这将改变在内存中管理音频的方式。

流送缓存会分隔来自USoundWave文件的压缩音频数据，而不是将它们放在 `.pak` 文件的末尾，这样将音频加载到内存并在不使用时将其释放的过程就变得相当容易。

这可能会导致音频在加载USoundWave时无法立即播放，但允许使用大量不同的音效，而不必担心超过内存上限。这种方式也让音频工程师能够加载音频数据块，而不必依赖音频引擎的状态，并且可以消除音频延迟。

如需了解流送缓存的更多信息，请参考 **音频流送缓存（Audio Steam Caching）** 文档。

设备的重新采样

设置为True时，根据音波的采样率质量对音波重新进行采样。可以在"重新采样质量"中设置要用于"采样率质量枚举"的每个成员的准确采样率。

压缩质量修饰符

调整此平台的所有质量设置。例如，值0.5将会把所有SoundCue的质量设置降低一半。

流送长度超过此值的所有音波：

如果设置为任何大于0的值，则任何在秒数上超过此值的音波都会直接流送到磁盘以外。

流送缓存

包含最大缓存大小和最大数据块大小重载。请参考下面的流送缓存表了解详细信息。

重新采样质量

此平台上使用的采样率质量级别的采样率完整列表。包括适用于最低、低、中、高和最高级别的值。

**流送缓存（Stream Caching）**

设置名称

说明

最大缓存大小(KB)

设置在任何给定时间用来进行缓存的最大内存数量，以KB为单位。如果是较小的值（低于8MB），则此缓存大小将小于烘焙期间单个音频数据块的大小。

最大数据块大小重载(KB)

重载在将音频分割成数据块以用于流送缓存时使用的默认最大数据块大小。如果为0或更低，此值将被忽略。

-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound](https://dev.epicgames.com/community/search?query=sound)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [配置平台音频设置](/documentation/zh-cn/unreal-engine/platform-audio-settings-in-unreal-engine#%E9%85%8D%E7%BD%AE%E5%B9%B3%E5%8F%B0%E9%9F%B3%E9%A2%91%E8%AE%BE%E7%BD%AE)