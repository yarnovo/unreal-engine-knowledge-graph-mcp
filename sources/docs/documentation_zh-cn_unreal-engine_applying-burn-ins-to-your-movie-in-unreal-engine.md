# 在虚幻引擎中为动画添加烧入内容 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/applying-burn-ins-to-your-movie-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:34.403Z

---

目录

![应用烧入内容](https://dev.epicgames.com/community/api/documentation/image/8094adbc-6129-44e0-afca-f66a274b2bff?resizing_type=fill&width=1920&height=335)

创建并渲染过场动画时，可能需要包含正在查看的场景信息的覆层，如镜头名称、日期，时间或帧信息。这些覆层被称为 **烧入内容**，将在渲染时被烧入影片中。这在真实的电影制作中为导演、剪辑师或查看片段的人士提供片段的相关信息（一些片段甚至带有版权信息的水印）。

利用 **Sequencer** 可将烧入内容应用到渲出的影片，此外还提供包含镜头总体信息的默认烧入选项。在此指南中，我们将学习如何在渲出过场动画时启用默认烧入选项。

此指南中，我们使用 **蓝图第三人称模板（Blueprint Third Person Template）** 创建了一个小型过场动画范例。

## 步骤

1.  准备好渲染 **关卡序列** 后，在 **关卡序列** 中点击 **渲染影片** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1cee872d-8859-40fa-94ca-7bca0a4cc107/overlay01.png)
2.  在 **Render Movie Settings** 窗口中点击 **Show Advanced** 展开按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32dcd12a-e3c5-4268-a1e4-1f6a94b97c61/overlay02.png)
3.  在 **Burn in Options** 下点击 **Burn in Class** 下拉菜单并选择 **DefaultBurnIn**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbd1966f-49ef-4c40-a1d5-35985e4629e8/overlay03.png)
    
    进行此操作后，即可定义烧入设置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3541d51d-f3c5-4e01-aa26-f776227919c8/overlay04.png)
4.  沿用默认选项，点击 **Capture Movie**。
    

## 最终结果

影片采集完成后，进行播放时便会发现相似的覆层已应用到过场。默认烧入在画面上方居中显示关卡序列的名称和当前日期。当前镜头名称显示在画面上面居左位置（如未使用镜头，则显示关卡序列名称）。画面下方居中显示 Master 序列的时间和帧数，画面右下显示当前镜头的帧。

在 **Burn in Options** 中的 **Settings** 部分中即可对每个选项进行修改，显示自定义文本。此外，还可在默认烧入选项中添加水印或修改字体。

全屏或在 YouTube 上查看以上视频可更清晰地观察覆层。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/applying-burn-ins-to-your-movie-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/applying-burn-ins-to-your-movie-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)