# 虚幻引擎音频共感 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/audio-synesthesia-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:20:52.853Z

---

目录

![音频共感](https://dev.epicgames.com/community/api/documentation/image/3b2d1716-c49c-44e6-b658-627a8b158504?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**音频共感（Audio Synesthesia）** 插件公开自动解压的音频元数据，可用于gameplay脚本和蓝图。此功能可帮助设计师驱动动画、效果和其他与音效紧密耦合的元素。

## 入门指南

必须激活 **音频共感（Audio Synesthesia）** 插件才能使用此功能。前往 **编辑（Edit）> 插件（Plugins）> 音频（Audio）**，然后勾选 **音频共感（Audio Synesthesia）** 以启用。出现提示时重启引擎。

若添加新的音频共感（Audio Synesthesia）资源，虚幻引擎将自动创建其对的 **音频分析器（Audio Analyzer）**。可添加三种资源：

-   **音频共感（Audio Synesthesia） NRT**：支持 `USoundWave` 非实时（**NRT**）分析的分析器。
-   **音频共感 NRT 设置（Audio Synesthesia NRT Settings）**：音频共感（Audio Synesthesia） NRT的设置，可用于修改设置的默认值。
-   **音频共感设置（Synesthesia Settings）**：用于调整音频共感的默认设置。

![Add a new Audio Synesthesia asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6689f770-1e57-4c05-9417-edaa4dd3b0e5/01-create-synesthesia-asset.png)

新建资源时将显示下拉菜单。选择要执行的分析类型。

![Pick synesthesia class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/acdc4bfe-c99f-4cf5-88b1-5a51ba2bb435/02-pick-synesthesia-class.png)

## 基本概念

`AudioSynesthesiaNRT` 对象的作用：

-   将分析算法设置关联到要分析的声波。
-   将分析结果保留为"uasset"。
-   提供可存取结果的蓝图函数。

使用 `AudioSynesthesiaNRT` 对象的所有音频分析均在编辑器中执行。Gameplay期间，在文件中读取分析结果。此操作将限制 `AudioSynesthesiaNRT` 对象分析游戏中生成的音频，但可避免运行时期间执行高开销的音频分析。

更新设置或在分析器中更新音效属性时将执行分析。

### 分析器使用方式范例

#### 创建并设置LoudnessNRT分析器

1.  添加 `AudioSynesthesiaNRT` 资源。可在 **音频（Audio）> 分析（Analysis） > AudioSynesthesiaNRT** 中找到 `AudioSynesthesiaNRT` 资源。
    
2.  在AudioSynesthesiaNRT分析器的下拉从菜单中选择 **LoudnessNRT**。
    
3.  **可选（Optional）：**通过在下拉菜单中选择 **LoudnessNRTSettings**，可使用 **音频（Audio）> 分析（Analysis） > AudioSynesthesiaNRT** 添加 **AudioSynesthesiaNRTSettings** 对象。
    
4.  将 LoudnessNRT Sound 属性更新为你导入的音效文件。
    

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4230758-cb3a-450d-b8fb-ae0e3088481a/03-loudness-analyzer-details.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4230758-cb3a-450d-b8fb-ae0e3088481a/03-loudness-analyzer-details.png)

使用之前创建的LoudnessNRTSettings更新LoudnessNRT Settings属性。

#### 在蓝图中利用LoudnessNRT

有多种在蓝图中使用LoudnessNRT的方式。以下范例为两个球体根据音频播放的响度变更大小。

1.  新建Actor蓝图，并将其添加到场景。
    
2.  打开蓝图，然后添加AudioComponent和两个球体。在所示范例中，将球体命名为 *LeftSphere* 和 *RightSphere*。
    
    ![Blueprint components](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5a83563-babe-4ba2-9aa1-90d970ab0378/04-blueprint-components.png) ![Blueprint components in the viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc1cba51-7120-4319-a2a1-aedf109a3ba6/05-components-in-the-viewport.png)
3.  添加两个变量：**LoudnessAnalyzer** 和 **Duration**。Duration应为 **浮点（float）**，LoudnessAnalyzer应为 **LoudnessNRT**。
    
    ![Add variables](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67a17915-e797-4a3a-99c9-a681582f0c23/06-add-variables.png)
4.  在构造脚本中：
    
    -   将音频组件的音效设为Loudness Analyzer中使用的音效。
    -   存储音效的总时长。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fac7dd15-f3d5-4cad-b9de-cbfc1a7c85d5/07-get-sound-from-loudness-analyzer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fac7dd15-f3d5-4cad-b9de-cbfc1a7c85d5/07-get-sound-from-loudness-analyzer.png)

点击查看全图。

1.  在事件脚本中：
    -   设置 **AudioPlaybackPercent** 事件，以在每次更新音频播放百分比时触发事件。
    -   启动音频播放。
    -   将音效时长乘以播放百分比，得到播放时间（以秒计）。
    -   获取播放器中当前播放时间（以秒计）的标准化响度值。
    -   基于响度值设置球体的缩放。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d9ad343-9a4e-4930-a514-9dd26741e694/08-create-event-nodes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d9ad343-9a4e-4930-a514-9dd26741e694/08-create-event-nodes.png)

点击查看全图。

## 非实时（NRT）分析器

### LoudnessNRT

LoudnessNRT分析器测量音频的感知响度。由于其和音频振幅相关，同时提供随时间变化的数字，因此其类似于envelope跟随器或分贝计。鉴于人类对音效感知的程度且对特定频率比较敏感，因此其与直线振幅测量不同。例如，口哨的振幅相当较低，但大家仍会觉得较为响亮。与最低的低音对比，该低音振幅可能极高，但众多听众却认为是音量适中。LoudnessNRT考虑了所有此类情况，将口哨标识为响亮，低音标识为中等响度。

**LoudnessNRTSettings** 用于配置LoudnessNRT分析器。LoudnessNRTSettings中最常调节的参数为：

-   **AnalysisPeriod** 控制测量频率。
-   **MinimumFrequency** 和 **MaximumFrequency** 控制目标频率。要完全忽略上端寄存器或下端寄存器中的某些内容，或要对比多个频率范围的响度活动时，此参数将十分有用。
-   **CurveType** 专门控制应利用的感知曲线。此参数通常为高级设置。
-   **NoiseFloorDb** 代表被视为静音的振幅。

### ConstantQNRT

**ConstantQNRT分析器（ConstantQNRT analyzer）** 测量音频中单个波段的强度。其代表给定时间处频率波段的响度，因此其与声谱图类似，不同点为其以感知意义的方式整理波段。使用ConstantQNRT分析器时，此类波段的整理方式与钢琴上的音符或多波段均衡器中的波段相同。

**ConstantQNRTSettings** 用于配置ConstantQNRT分析器。ConstantQNRTSettings中最常调节的参数为：

-   **AnalysisPeriod** 控制测量频率。
-   **StartingFrequency**、**NumBands** 和 **NumBandsPerOctave** 控制波段间距、宽度、位置和数量。
-   **DownMixToMono** 表示应单独处理音频通道，还是处理前先混合到单个音频通道中。

### OnsetNRT

**OnsetNRT分析器（OnsetNRT analyzer）** 探测来自大量源的音频起始事件，包括音符起始、敲击、扬声器爆破音和爆炸。OnsetNRT分析器向音符起始提供其时间戳和强度。

**OnsetNRTSettings** 用于配置OnsetNRT分析器。OnsetNRTSettings中最常调节的参数为：

-   **GranulartiyInSeconds** 决定各起始之间的最小间距。
-   **Sensitivity** 设置探测到起始前，该起始必须达到的响度阈值。
-   **MinimumFrequency** 和 **MaximumFrequency** 控制查找起始的频率范围。要完全忽略上端寄存器或下端寄存器中的某些内容，或要对比多个频率范围的起始活动时，此参数将十分有用。 \* **DownMixToMono** 表示应单独处理音频通道，还是处理前先混合到单个音频通道中。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound](https://dev.epicgames.com/community/search?query=sound)
-   [audio analyzer](https://dev.epicgames.com/community/search?query=audio%20analyzer)
-   [audio synthesis](https://dev.epicgames.com/community/search?query=audio%20synthesis)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/audio-synesthesia-in-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [基本概念](/documentation/zh-cn/unreal-engine/audio-synesthesia-in-unreal-engine#%E5%9F%BA%E6%9C%AC%E6%A6%82%E5%BF%B5)
-   [分析器使用方式范例](/documentation/zh-cn/unreal-engine/audio-synesthesia-in-unreal-engine#%E5%88%86%E6%9E%90%E5%99%A8%E4%BD%BF%E7%94%A8%E6%96%B9%E5%BC%8F%E8%8C%83%E4%BE%8B)
-   [创建并设置LoudnessNRT分析器](/documentation/zh-cn/unreal-engine/audio-synesthesia-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%B9%B6%E8%AE%BE%E7%BD%AEloudnessnrt%E5%88%86%E6%9E%90%E5%99%A8)
-   [在蓝图中利用LoudnessNRT](/documentation/zh-cn/unreal-engine/audio-synesthesia-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E5%88%A9%E7%94%A8loudnessnrt)
-   [非实时（NRT）分析器](/documentation/zh-cn/unreal-engine/audio-synesthesia-in-unreal-engine#%E9%9D%9E%E5%AE%9E%E6%97%B6%EF%BC%88nrt%EF%BC%89%E5%88%86%E6%9E%90%E5%99%A8)
-   [LoudnessNRT](/documentation/zh-cn/unreal-engine/audio-synesthesia-in-unreal-engine#loudnessnrt)
-   [ConstantQNRT](/documentation/zh-cn/unreal-engine/audio-synesthesia-in-unreal-engine#constantqnrt)
-   [OnsetNRT](/documentation/zh-cn/unreal-engine/audio-synesthesia-in-unreal-engine#onsetnrt)