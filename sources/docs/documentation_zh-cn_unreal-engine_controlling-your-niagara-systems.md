# 控制Niagara系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/controlling-your-niagara-systems
> 
> 生成时间: 2025-06-14T19:31:10.981Z

---

目录

![控制Niagara系统](https://dev.epicgames.com/community/api/documentation/image/508ad781-2774-4caa-a804-2eadb088319e?resizing_type=fill&width=1920&height=335)

## 使用生命周期轨道控制Niagara系统

目前，影片渲染队列（MRQ）仅捕捉摄像机指向的内容。MRQ启动时，将激活Niagara系统。为了能够在特定时间触发系统并通过镜头控制行为，我们需要为系统添加轨道。

请按照以下步骤添加Niagara生命周期轨道：

1.  从 **大纲视图（Outliner）** 窗口选择一个 **Niagara系统** 并将其拖至 **Sequencer面板** 。
2.  将一个 **Niagara组件轨道（Niagara Component track）** 添加到Niagara系统轨迹。
3.  将一个 **Niagara系统生命周期轨道（Niagara System Life Cycle Track）** 添加到Niagara组件轨道。
4.  修改分段范围的开始值/结束值，使红色条处于镜头内的某个位置。
5.  按下 **Play（播放）** 。

## 生命周期轨道模式

系统生命周期轨道的默认模式将控制系统何时处于活动和非活动状态。Sequencer不能决定系统的时长。如果你暂停序列，你会发现，系统只要处于活动状态就会一直发射。

请按以下步骤切换时长更新模式：

1.  在红色 **系统生命周期轨道（System Life Cycle track）** 上单击右键，打开 **轨道属性** 。
2.  在 **Properties（属性）** 部分下，将 **Age Update Mode（时长更新模式）** 切换为 **Desired Age（需要时长）** 。
3.  在生命周期轨道上来回拖动时间轴。

有3种模式可供选择：

**刷新增量时间（Tick Delta Time）** ：允许系统独立于Sequencer以引擎帧率运行。

**需要时长（Desired Age）** ：Sequencer会指定Niagara系统的时长。Niagara系统在生命周期轨道的起始处重置，一直刷新直至当前帧。如果向前拖动时间轴，系统将继续刷新到新时间。如果向后拖动时间轴，系统必须重置，并从生命周期轨道起始处刷新直至当前时间。

**不寻找需要时长（Desired Age No Seek）** : 当向前播放时，此模式与"需要时长（Desired Age）"模式相匹配。向后拖动时间轴时，系统会停止播放，并在播放头再次开始向前时重置。

在几乎所有场景中，"需要时长（Desired Age）"模式都是首选模式。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用生命周期轨道控制Niagara系统](/documentation/zh-cn/unreal-engine/controlling-your-niagara-systems#%E4%BD%BF%E7%94%A8%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%BD%A8%E9%81%93%E6%8E%A7%E5%88%B6niagara%E7%B3%BB%E7%BB%9F)
-   [生命周期轨道模式](/documentation/zh-cn/unreal-engine/controlling-your-niagara-systems#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%BD%A8%E9%81%93%E6%A8%A1%E5%BC%8F)