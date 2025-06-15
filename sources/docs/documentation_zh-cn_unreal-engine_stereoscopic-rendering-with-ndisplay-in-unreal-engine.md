# 虚幻引擎nDisplay中的立体渲染 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/stereoscopic-rendering-with-ndisplay-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:20.339Z

---

目录

![nDisplay中的立体渲染](https://dev.epicgames.com/community/api/documentation/image/ab5c541f-13b9-4308-8d61-374686e0fba2?resizing_type=fill&width=1920&height=335)

在立体渲染中，每个nDisplay群集节点都为左眼以及右眼生成图像，并使用你选择的标准立体图像格式对输出图像进行编码。在本例中，你负责设置显卡、显示驱动程序或硬件，以解译由nDisplay生成的立体图像并对它们进行相应传送。

## 调整立体渲染

如需调整立体渲染：

-   在"nDisplay 3D配置编辑器"中打开你的nDisplay配置资产。
-   在 **组件** 面板中，选择 **视图原点（View Origin）** 组件，打开它的 **细节** 面板。
-   在 **细节** 面板中，你需要定义左右眼之间的瞳孔间距离。将 **瞳距** 字段设置为你想要的距离，单位是厘米。 如果你需要翻转左右眼看到的内容，以便图像在显示设备上正确显示，你也可以启用 **交换眼睛（Swap Eyes）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dee64071-4a03-4550-99a2-24748c594fd1/01-default-view-point-details.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dee64071-4a03-4550-99a2-24748c594fd1/01-default-view-point-details.png)
    
    点击查看大图
    
-   打开[Switchboard](/documentation/zh-cn/unreal-engine/switchboard-in-unreal-engine)，打开 **设置**。
-   在Switchboard设置窗口中，找到 **nDisplay设置（nDisplay Settings）** 分段，将渲染模式设置为以下一种立体模式： **并排（Side-by-Side）** 或 **垂直排列（Top-bottom）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a816b102-951e-4f7b-91ad-5415ecdebbe3/02-switchboard-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a816b102-951e-4f7b-91ad-5415ecdebbe3/02-switchboard-settings.png)
    
    点击查看大图
    
    有关可用设置的详情，请参见下列[立体渲染格式](/documentation/zh-cn/unreal-engine/stereoscopic-rendering-with-ndisplay-in-unreal-engine#stereoscopicrenderingformats)部分。
    

### 立体渲染格式

nDisplay可通过下列任意标准格式渲染立体图像。

渲染模式

说明

**帧顺序（Frame sequential）**

此模式会为引擎主循环中的每一帧生成连续的成对立体图像。例如，它首先为第1帧渲染左眼视图，接着为第1帧渲染右眼视图，接着为第2帧渲染左眼视图，为第2帧渲染右眼视图，接着为第3帧渲染左眼视图，以此类推。大多数情况下，此选项需要GPU专门支持立体渲染。

此格式在OpenGL中称为 *四缓冲区（quad buffer）*。

**并排（Side by side）**

此模式下，为引擎主循环的每一帧生成的图像分为两部分。图像左半部分包含来自左眼位置的视图，右半部分包含来自右眼位置的视图。此模式有两大优点。首先，由于每个图像的渲染时间更短，它可以产生更高的帧率。其次，你可以在任何GPU上使用此模式。另一方面，其缺点是图像质量较差。

**垂直排列（Top-bottom）**

此模式几乎与上述 **并排（Side by side）** 选项相同。唯一的区别是每一帧的图像是水平分成两半，而不是垂直分成两半。图像上半部分显示来自左眼的视图，下半部分显示来自右眼的视图。

## 带立体偏移的单视场渲染

在此方法中，让一个视口从左眼视角渲染场景的单视场视图，并让另一个视口从右眼视角渲染场景的另一单视场视图。此类视口可位于同一台计算机上，也可完全位于不同计算机上。此方法还能提升渲染速度（原理等同多GPU硬件）。

为此，你需要在根组件上绑定两个不同的视图原点，一个用于左眼，另一个用于右眼。

1.  在[nDisplay 3D配置编辑器](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine)中打开nDisplay配置资产。
2.  在 **组件** 面板中，点击 **添加组件**，添加第二个 **视图原点（View Origin）** 组件。它的位置应该与默认的视图原点相同。
    
    ![Add a second View Origin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a16446b5-ce8e-4108-91ca-37a01f2213ce/03-ndisplay-view-origin.png)
3.  在 **细节（Details）** 面板中，将其中一个 **视图原点的** 立体偏移（Stereo Offset） **设置为** 左眼**，将另一个的** 立体偏移（Stereo Offset） **设置为** 右眼\*\*。
4.  将一个视口绑定到第一个 **视图原点（View Origin）**，另一个绑定到第二个 **视图原点（View Origin）**。

每个"视图原点（View Origin）"的偏移量，都等于左眼或右眼瞳距的一半，具体取决于该视图原点的立体偏移设置。结果就是，你将得到一个由不同渲染源生成的 立体像对（Stereopair）。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [graphics](https://dev.epicgames.com/community/search?query=graphics)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [调整立体渲染](/documentation/zh-cn/unreal-engine/stereoscopic-rendering-with-ndisplay-in-unreal-engine#%E8%B0%83%E6%95%B4%E7%AB%8B%E4%BD%93%E6%B8%B2%E6%9F%93)
-   [立体渲染格式](/documentation/zh-cn/unreal-engine/stereoscopic-rendering-with-ndisplay-in-unreal-engine#%E7%AB%8B%E4%BD%93%E6%B8%B2%E6%9F%93%E6%A0%BC%E5%BC%8F)
-   [带立体偏移的单视场渲染](/documentation/zh-cn/unreal-engine/stereoscopic-rendering-with-ndisplay-in-unreal-engine#%E5%B8%A6%E7%AB%8B%E4%BD%93%E5%81%8F%E7%A7%BB%E7%9A%84%E5%8D%95%E8%A7%86%E5%9C%BA%E6%B8%B2%E6%9F%93)