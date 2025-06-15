# 虚幻引擎UI中的UMG锚点 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/umg-anchors-in-unreal-engine-ui
> 
> 生成时间: 2025-06-14T20:17:54.147Z

---

目录

![锚点](https://dev.epicgames.com/community/api/documentation/image/b41dda68-e6b5-486e-8cf0-7c9289a09f79?resizing_type=fill&width=1920&height=335)

你可以使用 **锚点（Anchor）** 可以在 **画布面板** 上设置UI控件的位置。锚点支持根据不同屏幕尺寸和宽高比进行设置。

**最小(X,Y)** 和 **最大(X,Y)** 锚点参数以及偏移参数决定了每个控件的位置。

可以从多个锚点预设中进行选择，或通过最小(X,Y)和最大(X,Y)参数进行手动设置（其中 **最小(0,0)** 和 **最大(0,0)** 确定画布面板的左上角位置；**最小(1,1)** 和 **最大(1,1)** 确定画布面板的右下角位置）。锚点预设的偏移参数集会有所不同。

## 锚点的工作原理

**锚点图标（Anchor Medallion）** 可显示出画布面板中的锚点位置。它由下图中的黄框进行标记。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/510a6001-1f45-4087-803a-dac029ae5530/anchormedallion.png)

下图显示了放置在画布面板上的 **图像控件**。为此，应将 **图像（Image）** 从 **控制板面板** 拖到 **画布面板** 上。只需使用锚点的默认设置（左上角位置）。

水平黄线是X轴按钮偏移。它决定了从锚点图标到图像之间在X方向上的距离（使用Slate单位）。

垂直黄线是Y轴按钮偏移。它决定了从锚点图标到图像之间在Y方向上的距离（使用Slate单位）。

偏移参数基于画布面板尺寸并会适应尺寸变化。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5a38120-9da2-43b5-8f2a-a0c2a22895e7/button1.png)

单击图表中的 **屏幕尺寸（Screen Size）** 按钮可更改当前使用的尺寸。测试具有不同屏幕尺寸或宽高比的UI控件布局并进行相应调整会很有用。

在设置控件的锚点和偏移参数时，请务必考虑设备屏幕尺寸和宽高比的差异。应避免将控件移出视口。如果某些屏幕尺寸的锚点设置不当，则可能会发生移出视口的情况。

下图便显示了这种情况。黄框标记了锚点的位置。图像已移出视口。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da79d530-9083-489b-915c-be13ef78cbaf/ingamebutton1.png)

将锚点位置设置到右下角。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c9c9b52-e6a9-4ef8-b741-ccdf44fc7071/button2.png)

通过这些设置可以避免裁剪屏幕，并确保图像在视口内移动。下图便显示了这种情况。黄框标记了锚点的位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b01ac28f-1891-4e70-abba-703dbfd79343/ingamebutton2.png)

此示例显示了锚点对视口内控件位置的影响，具体影响将取决于宽高比。还可以将锚点图标拆分为多个分量。这样一来，可以设置更多偏移选项来定义如何显示具有不同屏幕尺寸和宽高比的控件（有关更多信息，请参阅[手动锚点](/documentation/zh-cn/unreal-engine/umg-anchors-in-unreal-engine-ui#%E6%89%8B%E5%8A%A8%E9%94%9A%E7%82%B9)小节）。

## 预设锚点

预设锚点是最常用的控件锚点设置方法。预设锚点可以满足你在设置UI控件位置方面的大部分需求。

从 **细节（Details）** 面板的 **锚点（Anchors）** 下拉窗口中选择预设。每个预设决定了相应的锚点位置。此位置由银框进行标记。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bc70357-76fd-46a3-b1b2-fecda7e6bab3/presetanchor.png)

例如，可为所需的控件选择"Center/Center（中心/中心）"预设锚点选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/470a4536-600a-481d-b74e-9c62954aeb28/centercenter.png)

当锚点图标拆分为多个分量时，锚点图标还有预设的拉伸方法。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea0c65cb-c4b9-47df-aba0-b85c423c6dc8/horizontalstretch.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/449c0d3f-7567-41d1-9cca-3960b7ce5821/verticalstretch.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e536f21-a8c2-4b96-a01e-cee91cd116f0/stretchboth.png)

水平拉伸

垂直拉伸

水平和垂直拉伸

因此，可以将控件设置为根据屏幕尺寸随视口一起拉伸。

下图所示的预设将沿着画布面板的底边拉伸控件的锚点。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3404a76e-b4d8-4a50-afd3-6ad54573a340/progressbar3.png)

在这种情况下，锚点图标的拉伸意味着将其分成两部分。

可以通过拖动其中一个引脚来拆分锚点图标。

前面介绍过的包含锚点设置的进度条在游戏过程中如下所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1ce538b-7318-46df-82dc-b9082e9fa8fa/progressbar4.png)

如果使用视口的其他宽高比，则如下所示：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a8c7cd5-29e6-4d35-930c-5f3464d3a33b/progressbar5.png)

## 手动锚点

在某些情况下，需要手动设置锚点。例如，在需要将多个控件彼此锚定时，便可使用手动锚点。

下图显示了图像控件位于进度条控件旁边。这两个控件都在画布面板内，而这个画布面板放置在另一个画布面板上。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47699cff-8b7b-4664-be3b-889b3011d4f6/manual1.png)

进度条控件和图像控件的锚点位于画布面板的左上角。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63f4606f-6212-47e8-b074-6fb98280e70f/manual2.png)

下面显示了画布面板、控件以及它们位置之间的尺寸比例相关性的调整过程。

将进度条设置为沿着画布面板的纵边拉伸，并确保与右边的距离始终固定。为实现此目的，应进行如下锚点设置：将进度条的锚点图标移到进度条左边的中心位置，然后通过拖动左侧中心引脚来拆分锚点图标。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d910537-09d0-47a6-bc8d-274fd8ec35f9/manual3.png)

进行这些设置后，画布面板和进度条之间在水平方向上存在比例相关性。此外，二者的右边之间保持固定的距离。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9ceb3e7-b9f7-4fe5-81a1-30b1be3c753a/manual4.png)

下一步是在画布面板中固定图像控件的位置，并固定图像控件和进度条控件之间的距离。

将图像的锚点图标移动到进度条的左上角。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5925c60-fb87-4bbb-9d25-4f956cc07a3b/manual5.png)

进行这些设置后，图像会随着画布面板的尺寸调整而移动。图像和进度条之间的距离保持固定。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86377c40-f551-4e2f-869a-514958180bb0/manual6.png)

设置图像和画布面板右边之间的固定距离。借助此设置可以避免在画布面板调整尺寸时裁剪图像。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89a39bf9-1f24-4429-839b-3ff96c121014/manual7.png)

如下图所示移动并拆分图像的锚点图标。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08803073-9bae-4023-a5f8-4b8387cd2adc/manual8.png)

进行这些设置后，图像位置将在水平方向上保持固定。同样，画布面板和图像之间在水平方向上存在比例相关性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d677eb22-d317-4428-b065-8671deee1ced/manual9.png)

下一步是固定图像控件在垂直方向上的位置。借助此设置可以避免图像相对于进度条发生位移。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ead2390e-df54-4766-9bb5-b10340999e69/manual9b.png)

如图所示设置锚点图标，根据X和Y方向的进度条位置将图像位置固定。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afefdb7c-78db-4e74-b982-b66b21a7780b/manual10.png)

完成此设置后，画布面板、进度条和图像之间在所有方向上都存在尺寸比例相关性。此外，每一项都有固定的位置。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [umg ui designer](https://dev.epicgames.com/community/search?query=umg%20ui%20designer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [锚点的工作原理](/documentation/zh-cn/unreal-engine/umg-anchors-in-unreal-engine-ui#%E9%94%9A%E7%82%B9%E7%9A%84%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86)
-   [预设锚点](/documentation/zh-cn/unreal-engine/umg-anchors-in-unreal-engine-ui#%E9%A2%84%E8%AE%BE%E9%94%9A%E7%82%B9)
-   [手动锚点](/documentation/zh-cn/unreal-engine/umg-anchors-in-unreal-engine-ui#%E6%89%8B%E5%8A%A8%E9%94%9A%E7%82%B9)

相关文档

[

UMG编辑器参考

![UMG编辑器参考](https://dev.epicgames.com/community/api/documentation/image/64dca8fc-2c19-497d-b0b2-5f4d9fd591ec?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)

[

蓝图可视化脚本

![蓝图可视化脚本](https://dev.epicgames.com/community/api/documentation/image/a7cce2f7-f09a-4340-b3f4-2a5d4823bc46?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)