# 设置显示率 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-your-display-rate
> 
> 生成时间: 2025-06-14T19:31:37.422Z

---

目录

![设置显示率](https://dev.epicgames.com/community/api/documentation/image/5d16ec89-2420-4947-8e3c-18670296f67d?resizing_type=fill&width=1920&height=335)

## 引擎刷新与Sequencer FPS

虚幻引擎会尽可能快地渲染帧。在大多数实时应用中，这都符合你的需要，因为这可以让玩家体验尽可能地流畅。

而对于线性内容，我们通常基于所编辑的媒体使用特定帧率：30FPS和24FPS是最常见的帧率。

Sequencer允许指定帧率。但这会指定特定事件相对于镜头时长应发生的时间。这并不一定会将引擎刷新率限制到所需的每秒帧数。

如果是处理曲线上的动画或关键帧，这通常没什么问题，且在实时应用中触发序列时，效果非常好。但是，如果正在处理的模拟需要可预测且一致的时间步长，这可能会导致意外行为。

在以下视频中，右下角添加了一个 **单一Sprite** ，它显示了Niagara看到的 **引擎增量时间** 。你会发现，系统正在尽可能快地刷新。此刷新率将随着关卡中的其他元素发生变化。如果其他元素要占用资源，则刷新率将下降，而模拟中的时间步长将增大。因此，当你向镜头添加越来越多的元素时，模拟看起来会有所不同。

## 在运行时锁定为显示率

Sequencer可以选择强制引擎以你指定的帧率刷新。即便引擎有可能运行得更快，Sequencer也会限制速度。通过保持刷新率与帧率同步，你的模拟将更加一致地发生变化，同时更紧密地匹配影片渲染队列（MRQ）的输出。

当MRQ在编辑器中运行和播放时，将应用"在运行时锁定为显示率（Lock to Display Rate at Runtime）"。如果你定义了时间子步长，这会对子步长造成干扰。后续将详细介绍本主题。

## 固定刷新增量时间

每个Niagara系统都可以选择固定其时间步长。无论引擎刷新能达到何种速率，Niagara都将强制系统以指定速率刷新。使用该选项，你可以强制模拟以可预测的速率刷新。

该方法的缺点是，即使场景复杂，Niagara也会强制执行该刷新率，哪怕引擎刷新无法真正支持。如果强制复杂的模拟以非常小的增量时间刷新，就会影响编辑器的交互性。

如果能够在编辑器中准确地预览，那是非常有价值的，但也存在局限性。模拟越是复杂，引擎刷新率就越低。一旦低于所需帧率，将无法再准确地预览。此时，通过MRQ迭代才是最可靠的方法。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [引擎刷新与Sequencer FPS](/documentation/zh-cn/unreal-engine/setting-your-display-rate#%E5%BC%95%E6%93%8E%E5%88%B7%E6%96%B0%E4%B8%8Esequencerfps)
-   [在运行时锁定为显示率](/documentation/zh-cn/unreal-engine/setting-your-display-rate#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E9%94%81%E5%AE%9A%E4%B8%BA%E6%98%BE%E7%A4%BA%E7%8E%87)
-   [固定刷新增量时间](/documentation/zh-cn/unreal-engine/setting-your-display-rate#%E5%9B%BA%E5%AE%9A%E5%88%B7%E6%96%B0%E5%A2%9E%E9%87%8F%E6%97%B6%E9%97%B4)