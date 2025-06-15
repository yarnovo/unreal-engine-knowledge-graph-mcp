# 虚幻引擎过场动画渲染设置与格式 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:08.442Z

---

目录

![渲染设置与格式](https://dev.epicgames.com/community/api/documentation/image/d1c817ae-ae28-4a3e-93e4-daf8e1e0a88f?resizing_type=fill&width=1920&height=335)

影片渲染队列中的渲染设置用于自定义序列的渲染方式。这些设置包含一些额外的渲染处理设定，例如抗锯齿、自定义控制台命令、输出格式、渲染模式等。

本指南将介绍设置界面、可添加的设置列表，以及将设置保存为预设的功能。

#### 先决条件

-   确保你已完成 **[影片渲染队列](/documentation/404)** 页面中的准备工作步骤。

## 打开渲染设置

点击工作的 **设置** 条目，可以打开"渲染设置"窗口。

![render settings window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12bd7354-a7b1-4b0e-8da3-27337e3cbbd7/settingswindow.png)

## 界面概述

"渲染设置"窗口有三个主要区域：

![render settings interface](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e48aedf4-970d-4342-be19-4ca4e18bad6a/settingsinterface.png)

1.  **工具栏**：工具栏包含一个菜单，用于添加其他设置以及加载或保存当前设置列表到预设。
2.  **设置列表**：设置列表显示要应用于工作的当前设置，包括启用或禁用这些设置的切换。每个设置分类为 **导出**、**渲染** 或 **设置**。
3.  **设置细节**：显示 **设置列表** 中选定设置的属性。

## 设置列表

点击 **\+ 设置** 按钮将显示可添加到工作中的不同设置列表。这被分为三组：**设置**、**导出** 和 **渲染**。

![render settings list](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5491fe1-65cd-4966-842d-95b5daa2da0b/settingslist.png)

### 设置

"设置"类别包含渲染质量选项、控制台变量和其他渲染选项的选项。

名称

说明

[**输出**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E8%BE%93%E5%87%BA)

输出设置可控制输出文件的目录、文件名、帧率和输出分辨率。你的文件名和目录路径可以使用 `{token}` 格式字符串进行自定义。输出是必要设置，并且无法从设置窗口中删除。

[**抗锯齿**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF)

抗锯齿可控制用于生成最终渲染的采样数量。有两种类型的采样可产生渲染：**空间（Spatial）** 和 **时间（Temporal）** 。

[**烧入**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E7%83%A7%E5%85%A5)

烧入可以为你的渲染添加自定义水印，其中包含有关渲染和镜头的信息。你可以选择将烧入添加到最终图像中，或是渲染到单独的图层中。

[**摄像机**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA)

摄像机设置包含快门时间设置，你可以指定过扫描百分比来渲染图像边缘周围的额外像素。

[**颜色输出**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E9%A2%9C%E8%89%B2%E8%BE%93%E5%87%BA)

颜色输出设置使用自定义 **[OpenColorIO (OCIO)](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine)** 配置覆盖虚幻引擎的默认颜色空间设置。即使不使用基于OCIO的工作流程，你也可以使用它来禁用后期处理的 **色调曲线（Tone Curve）** 部分。

\[**控制台变量（Console Variables）**\]animating-characters-and-objects/Sequencer/movie-render-pipeline/RenderSettings/Reference#控制台变量)

控制台变量允许在渲染开始时指定控制台命令。若尝试应用的质量设置在编辑器中实时预览时计算开销过高，则此选项很有帮助。变量将在渲染完成后恢复。

[**调试选项（Debug Options）**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E8%B0%83%E8%AF%95%E9%80%89%E9%A1%B9)

调试选项包含用于调试某些渲染行为的选项。除非你正在对渲染中的问题进行故障排除，否则通常情况下你不需要用到这些选项。

[**游戏覆盖（Game Overrides）**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%B8%B8%E6%88%8F%E8%A6%86%E7%9B%96)

游戏覆盖可更改几个常见的游戏相关设置，例如游戏模式（Game Mode）和过场动画质量（Cinematic Quality）设置。如果游戏的正常模式显示了你不想捕获的UI元素或加载屏幕，此功能非常有用。

[**高分辨率（High Resolution）**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E9%AB%98%E5%88%86%E8%BE%A8%E7%8E%87)

高分辨率设置支持使用平铺渲染来生成更大的图像，而不受GPU上的最大纹理大小或内存限制的约束。

请访问 **[图像设置](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine)** 以更全面地了解这些选项。

[

![导出格式](images/static/document_list/empty_thumbnail.svg)

导出格式

使用影片渲染队列中的各种格式输出你的渲染。





](/documentation/zh-cn/unreal-engine/cinematic-rendering-export-formats-in-unreal-engine)[

![图像设置](images/static/document_list/empty_thumbnail.svg)

图像设置

使用电影渲染队列的图像设置调整渲染的图片质量





](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine)[

![MRG配置设置](images/static/document_list/empty_thumbnail.svg)

MRG配置设置

影片渲染图表的高级设置。





](/documentation/zh-cn/unreal-engine/mrg-configuration-settings-in-unreal-engine)[

![影片渲染图表节点](images/static/document_list/empty_thumbnail.svg)

影片渲染图表节点

探索影片渲染图表可用的设置和节点。





](/documentation/zh-cn/unreal-engine/movie-render-graph-nodes-in-unreal-engine)[

![MRG的重载和变量](images/static/document_list/empty_thumbnail.svg)

MRG的重载和变量

了解如何设置参数以及如何在不同级别上将其重载。





](/documentation/zh-cn/unreal-engine/mrg-overrides-and-variables-in-unreal-engine)

### 导出

"导出"类别的控制选项用于设置序列以何种格式输出成图像、音频和视频。

名称

说明

[**命令行编码器（Command Line Encoder）**](/documentation/zh-cn/unreal-engine/cinematic-rendering-export-formats-in-unreal-engine#%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%BC%96%E7%A0%81%E5%99%A8)

命令行编码器可用于从第三方软件（如FFmpeg）创建你自己的输出格式。此设置需要在你的"项目设置"中启用编码器可执行文件和设置。

[**Final Cut Pro XML**](/documentation/zh-cn/unreal-engine/cinematic-rendering-export-formats-in-unreal-engine#finalcutproxml)

Final Cut Pro XML格式将输出XML文件，该文件可由Final Cut Pro和支持此格式的其他视频编辑软件读取。这在发行版本中不受支持。

**.bmp序列\[8位\]（.bmp Sequence \[8bit\]）**

将影片输出为.bmp图像序列。像素值范围为\[0-1\]，这意味着不会保留HDR值。这会应用sRGB编码曲线。

[**EXR序列（EXR Sequence）**](/documentation/zh-cn/unreal-engine/cinematic-rendering-export-formats-in-unreal-engine#exr%E5%BA%8F%E5%88%97)

将影片输出为.exr图像序列。HDR值会保留，但若启用色调曲线（Tone Curve），则线性值将调整到大约\[0-1\]的范围，仅最亮的高光超过1。禁用色调曲线（Tone Curve）会写入\[0-100\]范围或更大范围的线性值，具体取决于光源和其他明亮物体的强度。没有sRGB编码曲线应用于.exr目标。

**.jpg序列\[8位\]（.jpg Sequence \[8bit\]）**

将影片输出为.jpg图像序列。应用sRGB编码曲线。

**.png序列\[8位\]（.png Sequence \[8bit\]）**

将影片输出为.png图像序列。应用sRGB编码曲线。启用"在后期处理中启用Alpha通道支持（Enable Alpha Channel Support in Post Processing）"项目设置，即可支持透明度。

[**WAV音频（WAV Audio）**](/documentation/zh-cn/unreal-engine/cinematic-rendering-export-formats-in-unreal-engine#wav%E9%9F%B3%E9%A2%91)

输出.wav音频文件以及你选择的其他输出格式。

[**Apple ProRes视频编码解码器（Apple ProRes Video Codecs）**](/documentation/zh-cn/unreal-engine/cinematic-rendering-export-formats-in-unreal-engine#appleprores%E8%A7%86%E9%A2%91%E7%BC%96%E7%A0%81%E8%A7%A3%E7%A0%81%E5%99%A8)

使用Apple的高质量有损视频压缩编码解码器Apple ProRes输出.mov文件。这需要启用Apple ProRes Media插件。

[**Avid DNx视频编码解码器（Avid DNx Video Codecs）**](/documentation/zh-cn/unreal-engine/cinematic-rendering-export-formats-in-unreal-engine#aviddnx%E8%A7%86%E9%A2%91%E7%BC%96%E7%A0%81%E8%A7%A3%E7%A0%81%E5%99%A8)

使用高清有损视频编码解码器Avid DNx输出影片文件。这需要启用Avid DNxHR/DNxMXF Media插件。

**预流送录制器（Prestreaming Recorder）**

预流送录制器用于使用 **虚拟纹理（Virtual Textures）** 或 **Nanite** 为过场动画创建渲染缓存。

可以为任何给定序列指定多个导出项。例如，你可以选择将序列导出为 **.jpg图像序列** 和 **.wav音频文件**，以便在视频编辑软件中合并。

请访问 **[导出格式](/documentation/zh-cn/unreal-engine/cinematic-rendering-export-formats-in-unreal-engine)** 页面以更全面地了解这些选项。

[

![导出格式](images/static/document_list/empty_thumbnail.svg)

导出格式

使用影片渲染队列中的各种格式输出你的渲染。





](/documentation/zh-cn/unreal-engine/cinematic-rendering-export-formats-in-unreal-engine)[

![图像设置](images/static/document_list/empty_thumbnail.svg)

图像设置

使用电影渲染队列的图像设置调整渲染的图片质量





](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine)[

![MRG配置设置](images/static/document_list/empty_thumbnail.svg)

MRG配置设置

影片渲染图表的高级设置。





](/documentation/zh-cn/unreal-engine/mrg-configuration-settings-in-unreal-engine)[

![影片渲染图表节点](images/static/document_list/empty_thumbnail.svg)

影片渲染图表节点

探索影片渲染图表可用的设置和节点。





](/documentation/zh-cn/unreal-engine/movie-render-graph-nodes-in-unreal-engine)[

![MRG的重载和变量](images/static/document_list/empty_thumbnail.svg)

MRG的重载和变量

了解如何设置参数以及如何在不同级别上将其重载。





](/documentation/zh-cn/unreal-engine/mrg-overrides-and-variables-in-unreal-engine)

### 渲染

"渲染"类别包含用于输出不同视图模式图像和渲染通道的选项。

名称

说明

**延迟渲染**

输出序列的最终图像，与你在视口中看到的图像相匹配。

**延迟渲染（细节光照）**

使用特殊着色器变体输出，这仅显示与法线贴图结合的光照。可以用于显示关卡的几何体。

**延迟渲染（仅光照）**

与细节光照类似，但没有影响光照的法线贴图。

**路径跟踪器**

显示为每帧计算的路径跟踪数据。当前，路径跟踪器并非支持所有渲染功能。

**延迟渲染（仅反射）**

使用特殊着色器变体输出，使世界中的一切内容都出现反射。

**延迟渲染（无光照）**

使用特殊着色器变体的输出，仅显示基础颜色，无光照信息。

**UI渲染器**

包括添加到输出渲染中的视口的任何UMG小部件。这是一个实验性功能。

**Object ID（有限）**

Object ID渲染输出一幅图像，其中场景中的组件被指定了ID。ID可以单独分组，也可以基于其他因素（如材质、文件夹或Actor名称）分组。需要Movie Render Queue Additional Passes插件才能启用此功能。发行版本不支持Object ID。

请访问 **[](/documentation/404)**页面以全面了解这些选项。

[

![导出格式](images/static/document_list/empty_thumbnail.svg)

导出格式

使用影片渲染队列中的各种格式输出你的渲染。





](/documentation/zh-cn/unreal-engine/cinematic-rendering-export-formats-in-unreal-engine)[

![图像设置](images/static/document_list/empty_thumbnail.svg)

图像设置

使用电影渲染队列的图像设置调整渲染的图片质量





](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine)[

![MRG配置设置](images/static/document_list/empty_thumbnail.svg)

MRG配置设置

影片渲染图表的高级设置。





](/documentation/zh-cn/unreal-engine/mrg-configuration-settings-in-unreal-engine)[

![影片渲染图表节点](images/static/document_list/empty_thumbnail.svg)

影片渲染图表节点

探索影片渲染图表可用的设置和节点。





](/documentation/zh-cn/unreal-engine/movie-render-graph-nodes-in-unreal-engine)[

![MRG的重载和变量](images/static/document_list/empty_thumbnail.svg)

MRG的重载和变量

了解如何设置参数以及如何在不同级别上将其重载。





](/documentation/zh-cn/unreal-engine/mrg-overrides-and-variables-in-unreal-engine)

## 预设

默认情况下，编辑器会话中的渲染设置只会临时保存，会话关闭后将丢失。你可以将设置保存为 **预设**，以便在项目范围内共享或为不同序列使用不同设置。

可以保存和重复使用两种类型的预设：\*主预设（Master） **和** 镜头预设（Shot）\*\*。

### 主预设

主预一般用作基础，其设置会传播给下一级的的镜头切换（camera cut）。

要将当前设置保存为主配置，请点击 **加载/保存预设**，然后选择 **另存为预设**。之后，将提示你保存 **影片流程主配置资产**。

![save render job preset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad164733-60b0-424e-aa27-890a65137227/savemasterpreset.png)

然后，你可以点击设置域中的下拉菜单并选择保存的 **影片流程主配置资产**，将此预设应用于队列中的工作。

![apply render job preset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7739824-e124-42e9-a746-ea6fcf7c5ecf/applymasterpreset.png)

### 镜头预设

镜头预设允许重载渲染中每个摄像机的渲染设置。如果过场动画序列中某些镜头所需的设置与主预设应用的有所不同，则镜头预设将十分实用。

要保存和使用镜头预设，展开渲染队列中的工作以查看其子摄像机。每个摄像机都有可以覆盖的设置域。点击其中一个 **编辑** 域打开该摄像机的设置窗口。

![shot render settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c93d31cc-379a-4f89-927e-dea37b40550d/shotsettings.png)

点击 **+设置** 按钮并从列表中选择一个设置，即可添加设置。

你无法添加 **导出** 类别设置或更改镜头设置的输出目录，因为此关卡的设置不得与主预设中的所需设置冲突。

要将当前设置保存为镜头预设，点击 **加载/保存预设**，然后选择 **另存为预设**。之后，将提示你保存一个 **影片流程镜头配置资产**。

![save render shot preset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d349fe6-7561-4f3b-b277-20a0b5b1a162/saveshotpreset.png)

与应用主预设类似，你可以点击设置域中的下拉菜单并选择保存的 **影片流程镜头配置资产**，将此预设应用于队列中的特定镜头。

![render config preset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50eceac0-a942-43cc-b631-92a6f9f779c5/usingshotpreset.png)

主和镜头配置资产是不同的资产类型，不能互换使用。

### 编辑预设

在"设置"列中指定预设后，它将更改以匹配该预设的名称。如果点击预设，将会进入配置编辑器，你可以在其中编辑配置。**这些编辑不会更改预设资产**，它们只是修改该预设的临时副本。

如果要直接修改预设，有两个选择：

1.  通过影片渲染队列UI打开编辑器，然后选择 **另存为预设** 并覆盖已存在的预设。
    
2.  在内容浏览器中双击预设直接打开并进行编辑。此操作将打开一个编辑器，你可以从中添加设置、编辑其值并使用资产的 **保存** 按钮来保存更改。 ![edit render preset asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08550f50-0a55-45d0-aec2-e6550de294be/presetassetopen.png) 

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [movie render queue](https://dev.epicgames.com/community/search?query=movie%20render%20queue)
-   [render](https://dev.epicgames.com/community/search?query=render)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [打开渲染设置](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E6%89%93%E5%BC%80%E6%B8%B2%E6%9F%93%E8%AE%BE%E7%BD%AE)
-   [界面概述](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E7%95%8C%E9%9D%A2%E6%A6%82%E8%BF%B0)
-   [设置列表](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%88%97%E8%A1%A8)
-   [设置](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [导出](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E5%AF%BC%E5%87%BA)
-   [渲染](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E6%B8%B2%E6%9F%93)
-   [预设](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E9%A2%84%E8%AE%BE)
-   [主预设](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E4%B8%BB%E9%A2%84%E8%AE%BE)
-   [镜头预设](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E9%95%9C%E5%A4%B4%E9%A2%84%E8%AE%BE)
-   [编辑预设](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine#%E7%BC%96%E8%BE%91%E9%A2%84%E8%AE%BE)