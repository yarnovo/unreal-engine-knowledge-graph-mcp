# 使用虚幻引擎Sequencer进行实时合成 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/real-time-compositing-with-sequencer-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:31.759Z

---

目录

![用Sequencer进行实时合成](https://dev.epicgames.com/community/api/documentation/image/69cf3f2c-e440-41b5-a005-84c705a0142b?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

[Sequencer](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)是我们引擎中的过场动画编辑器，可与Composure合成系统结合使用。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77b78bf9-4a62-42b0-a810-850304d1a348/composure-sequencer.gif "composure-sequencer.gif")

Sequencer主要可用于： 

1.  控制场景摄像机（由合成系统引用）。
    
2.  渲染合成内容及其贡献部分，包括任意输出值（AOV）。这实用于引擎之外的合成。
    

## 渲染元素和AOV

使用 **渲染影片设置（Render Movie Settings）** 对话框和 **Composure导出（ComposureExport）** 输出格式渲染序列时，可将任意Composure元素添加到序列中，指出其输出应被导出。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1770070f-719d-412c-86d4-92208b8cdaab/ue5_01-render-movie-settings.png "ue5_01-render-movie-settings.png")

当这些元素作为此进程的一部分被渲染时，它们的最终输出将用对话框中指定的文件名格式作为EXR图像来写入磁盘。额外的格式说明符可以包含在 **{element}** 和 **{pass}** 的目录和文件名选项中。

在Sequencer中为 **导出输出** 包含多个元素时，如果名称中不包含 **{element}**，则它们将写入到同一图像文件上。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27380c31-6caf-44b5-a467-db4a8607cc14/ue5_02-output-directory.png "ue5_02-output-directory.png")

在任意CG采集上配置 **要导出的缓冲（Buffers to Export）**，即可在每个元素上指定随每个元素导出的额外AOV。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68045030-252a-4b34-8a5f-5d1f743a4198/buffers-to-export.gif "buffers-to-export.gif")

添加新的缓冲显示材质，并使用以下格式将它们添加 `[Engine.BufferVisualizationMaterials]` 配置部分后，即可实现自定义AOV：

`CustomAOV=(Material="/Game/AOVs/CustomAOV.CustomAOV", Name=LOCTEXT("CustomAOV", "CustomAOV"))`

## 用Sequencer进行合成

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [beta](https://dev.epicgames.com/community/search?query=beta)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [渲染元素和AOV](/documentation/zh-cn/unreal-engine/real-time-compositing-with-sequencer-in-unreal-engine#%E6%B8%B2%E6%9F%93%E5%85%83%E7%B4%A0%E5%92%8Caov)
-   [用Sequencer进行合成](/documentation/zh-cn/unreal-engine/real-time-compositing-with-sequencer-in-unreal-engine#%E7%94%A8sequencer%E8%BF%9B%E8%A1%8C%E5%90%88%E6%88%90)