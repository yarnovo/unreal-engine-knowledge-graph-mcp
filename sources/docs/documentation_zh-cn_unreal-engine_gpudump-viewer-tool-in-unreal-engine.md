# 虚幻引擎的GPU转储文件查看器工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:58.227Z

---

目录

![GPU转储文件查看器工具](https://dev.epicgames.com/community/api/documentation/image/b1500791-abfc-461c-8fc0-233d82325455?resizing_type=fill&width=1920&height=335)

**DumpGPU** 是一个不受平台限制的控制台命令，能够将中间渲染资源二进制文件或采集帧转储到磁盘中。转储文件会保存为.json和.bin文件，可以使用轻量级的网页浏览器查看。

![gpu dump viewer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/877b4155-722b-4a6f-8e79-7020163ec6b5/gpu-dump-viewer.png)

该命令具有多个用途：

-   可供所有版本使用，无需安装第三方GPU调试工具，也无需重启编辑器。
-   可从任意支持平台中转储：
-   Windows D3D11、D3D12、Vulkan
-   Linux Vulkan
-   Mac Metal、AGX
-   PlayStation 4和PlayStation 5
-   XboxOne、Xbox Series X/S
-   Nintendo Switch
-   iOS和Android
-   可从任意支持Chrome和兼容WebGL 2.0 GPU的平台上浏览
-   使用简单，不受平台限制，任何人都能在遭遇瑕疵时进行GPU转储。
-   当美术师在编辑器中遇到预料之外、难以重现的问题时，适合使用该命令。
-   能减少浏览二进制资源所导致的分歧。
-   平台GPU采集通常需要正确的SDK，并需要开发包来分析资源。GPUDump查看器使开发者能够更好地鉴别错误，还能根据问题的背景环境，在任意平台上分析资源。
-   对编写新渲染功能的图形编程员来说，这项工具提供了更快速的迭代工作流程，方便分析可能发生的情况。

## 转储流程

要为某一帧启动GPU转储流程，可以在控制台窗口中输入命令 `DumpGPU`，或者使用键盘快捷键 **CTRL+Shift+/**。

启动该命令后，它需要将中间渲染资源复制到磁盘里。为了进行处理，采集速度会为内存做出牺牲，以限制内存错误产生。这可以确保转储能够稳定地收集罕见或难以重现的瑕疵数据，并且不会导致重现流程崩溃。

转储需要通过持久内存量来确定资源是否已经转储，这一内存量几乎可以忽略不计。

如果转储资源所需的内存量大于系统的可用内存，资源就无法转储，而是会在日志中标注警告。

`DumpGPU` 命令可以在 **调试（Debug）**、**调试游戏（DebugGame）**、**开发（Development）** 和 **测试（Test）** 版本中使用，但也可以通过 `Project.Target.cs` 在 **发布** 版本中启用。

```cpp
	GlobalDefinitions.Add("ALLOW_CONSOLE_IN_SHIPPING=1");
	GlobalDefinitions.Add("ALLOW_DUMPGPU_IN_SHIPPING=1");

```

这应当用于调试仅在发布时出现的测试用渲染问题，**不得** 在实际发布项目时启用。

### GPU转储文件的保存位置

进行GPU转储时，在默认情况下，它会被存储在项目的根目录下的 `Saved/GPUDumps` 中。在桌面平台上，完成转储后，资源管理器会自动打开转储位置窗口。

![gpu dump查看器windows资源管理器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cf2c793-cebf-4f1f-afa8-d9ebe2405e3d/gpu-dump-viewer-file-explorer.png)

对于 **暂存（Staged）** 版本，它们会保存在该暂存的Saved目录下，路径格式为：**\[暂存目录\] / \[平台名称\] / \[项目名称\] / Saved / GPUDumps**。

转储文件都是未经压缩的原始资源，因此可能占据大量磁盘空间。然而，转储文件可以高度压缩成Zip文件。例如，《黑客帝国：觉醒》技术演示的转储文件在未压缩时大约有8Gb，压缩后只有2.2Gb。

在与他人分享数据时，建议对转储文件进行压缩。

#### 移动平台转储文件的保存位置

在移动平台上，GPU转储文件会保存在以下位置：

移动平台

保存位置文件路径

**iOS**

`[应用容器路径]/Documents/[项目名称]/Saved/GPUDumps/`

**Android**

`/storage/emulated/0/UnrealGame/[项目名称]/[项目名称]/Saved/GPUDumps/`

Android OpenGL的模板缓冲区为空白。

### 转储设置

以下命令可根据你的需求，产生量身定制的GPU转储文件：

控制台变量

说明

`r.DumpGPU.Root`

选择一个渲染依赖性图表（RDG）通道子类，根据绘制事件和归属的父类范围进行转储。启用该设置可以大幅加快转储过程，对单独的渲染功能进行迭代时，可以只转储需要的通道。例如，如果你只需要转储后期处理通道，就要输入 `r.DumpGPU.Root="PostProcessing"`。

`r.DumpGPU.Viewer.Visualize`

根据名称，在查看器中自动打开特定资源。你可以输入 `r.DumpGPU.Viewer.Visualize "<资源名称>"`

`r.DumpGPU.Directory`

GPU转储文件可能占用大量磁盘空间。你可以在"ConsoleVariables.ini"配置文件中使用该命令指定目录，将所有GPU转储文件保存在同一个位置下。指定位置的写法为：`r.DumpGPU.Directory="[X:/文件/路径/名称]"`。

### DumpGPU命令如何复制GPU转储文件查看器

GPU转储文件查看器源代码位于引擎源代码中，可以在 `/Engine/Extras/GPUDumpViewer` 下找到。

对于非发布版本，GPU转储文件查看器会在暂存目录下自动复制。在调用DumpGPU以转储该帧时，文件就会从暂存目录中，复制到转储目录下。

如果你拥有发布暂存版本，由于GPU转储文件查看器的HTML源代码在暂存目录中缺失，它可能不会被复制到转储目录下。在这种情况下，你可以将库的 `//Engine/Extras/GPUDumpViewer` 应用复制到转储目录中，以打开转储文件。

## GPU转储文件查看器

GPU转储文件查看器是一个基于网络的HTML应用。你可以在查看器中了解虚幻引擎渲染的运行情况。

首先，在进行GPU转储时，操作系统会打开保存转储文件的文件夹位置。双击 `OpenGPUDumpViewer.bat` 文件可以在Chrome中打开查看器。

![Windows资源管理器gpudumpviewer.bat文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6937822-9142-4262-8aba-7b2f1847a658/gpu-dump-viewer-file-explorer-bat-file.png)

启动后会打开一个新的Chrome窗口，并运行 **GPU转储文件查看器**。

![gpu dump viewer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2064a73a-9de2-4411-8c8c-b546f60896cd/gpu-dump-viewer.png)

Chrome无痕式窗口中打开的GPU转储文件查看器网络应用。

GPU转储文件查看器是一个网络应用，功能和其他浏览器页面或应用相似。以下是使用GPU转储文件查看器的小技巧：

-   所有链接都可以点击，并且可以打开自己的标签页，以便快速访问。
-   使用前进和后退按钮导航，可以在之前浏览过的页面之间往返。
-   如果要和其他人分享采集内容，你可以分享#部分后的链接，让他们通过链接直接访面板和转储部分。例如：`#display_output_resource(96,'0000000067e1bfa0.mip0');`

打开GPU转储文件查看器时，你可以在主查看区域中反复浏览各种建议和技巧。

![GPU转储文件查看器标亮区域](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8b71613-0fc5-4247-8d37-b7d04496955e/gpu-dump-viewer-sections.png)

1.  标题栏和面板 1.通道和资源树 1.查看器

### 标题栏和面板

主标题栏提供了简单的参考信息，包括项目名称、操作系统、RHI和创建转储时所用的版本。其中还包含了可点击的信息面板，能够生成项目的综合信息、使用的控制台变量，以及项目日志副本。

![GPU转储文件查看器标题栏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60a37e10-ccc2-40c6-bffc-0d11a27004d7/gpu-dump-viewer-title-bar.png)

#### 信息面板

**信息** 面板包含了GPU转储文件的摘要信息。你可以找到关于系统、驱动和引擎版本的实用信息，以及后台缓冲区中最终图像的截图。

![GPU转储文件查看器信息面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28b7a5fc-a225-4cb7-af8f-3475b59a97b2/gpu-dump-viewer-infos-panel.png)

#### CVars面板

**CVars** 面板包含了一张可搜索的渲染控制台变量列表（开头为 `.r.*` 或 `.sg.*`，或包含RHI关键词），可以在进行转储前运行。

![GPU转储文件查看器CVars面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60681850-272d-4253-9422-f5e220f54cc1/gpu-dump-viewer-cvars-panel.png)

控制台变量会在该帧开始时采集。因此，如果游戏玩法会在运行时更改CVars，部分变量可能会发生改变。

#### 日志面板

**日志** 面板提供了项目日志的副本，它会在完成转储时，和转储文件一同保存。你也可以在这里检查转储过程中是否发出过警告。

![GPU转储文件查看器日志面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37695c58-1cdd-4d0b-ad2d-01ea795d2ebd/gpu-dump-viewer-log-panel.png)

### 查看器

查看区域会显示选中的各个通道、纹理和缓冲区的信息。

#### 通道查看器

在绘制事件层级中点击一个 **通道** 时，只会显示该通道读取和修改的资源。它会自动打开第一个输出资源，无论该资源是纹理还是缓冲区。

![GPU转储文件查看器通道查看器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5557950b-2e5f-4451-bf83-df7b0c267fd7/gpu-dump-viewer-pass-viewer.png)

在通道名称旁（位于查看器顶部），你可以找到 **通道参数（Pass Parameters）** 按钮。

![GPU转储文件查看器通道参数按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9ff82fe-b7e4-4b91-ab71-1984c1c59065/gpu-dump-viewer-pass-parameters.png)

点击该按钮会显示原始通道参数。通常情况下，通道参数就是着色器参数。例如在使用 `FComputerShaderUtils::AddPass()` 或 `FPixelShaderUtils::AddPass()` 的情况下。

通道参数使你能够进行验证，确保来自CPU的非数实例不会通过着色器参数来影响着色器。

![GPU转储文件查看器通道参数面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/967b81d2-a32f-4640-962a-f5971963dd49/gpu-dump-viewer-pass-parameters-panel.png)

#### 纹理查看器

在通道视图的 **输入资源** 或 **输出资源** 列表中选择一个 **纹理** 时，你就可以在查看器中看到它的像素。

![GPU转储文件查看器纹理查看器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92f5aa54-5059-4afc-9369-7972fd24d516/gpu-dump-viewer-texture-viewer.png)

WebGL 2.0的画布使你能够加载原始二进制资源（RHI已将其复制到转储目录下）以查看纹理，就可以使用更简单的WebGL像素着色器显示。如果是32位UINT纹理等WebGL不支持的格式，则还需在幕后进行更多处理，才能准确地模拟像素格式。

纹理查看器包含了多个按钮，它们位于显示的纹理上方：

![GPU转储文件查看器文理查看器按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/562fb9d8-ee73-45cc-83cc-baa300c34bbc/gpu-dump-viewer-texture-viewer-buttons.png)

-   设置在查看器中显示纹理的大小，或者使其与窗口大小匹配。
-   **复制到粘贴板** 可以将当前显示的纹理和相关资源信息复制到粘贴板上。将其粘贴到文本编辑器或电子邮件中时，你会看到图中所示的情况：
    
    ![复制到粘贴板示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04ed8b85-15fc-4e66-b7a7-8e7b64249268/gpu-dump-viewer-copy-to-clipboard-example.png)
-   有三个按钮可以更改纹理视图模式：**可视化** 是标准的纹理视图模式，而 **NaN**（非数）和 **Inf**（无穷）视图模式可用于甄别相应类型的像素错误。

将鼠标悬停在纹理上可以返回光标纹素位置当前的RGBA值。左键点击鼠标可以采集并保存纹素RGBA位置值。

光标纹素位置和选定纹素位置显示的值包括了更多数位，因此不够精准，无法用于像素格式编码。这是因为网页在javascript中解码纹素时使用的是[双精度浮点格式](https://en.wikipedia.org/wiki/Double-precision_floating-point_format)。

如果你想更仔细地查看纹理的某个部分，可以使用鼠标滚轮缩放纹理。放大纹理时，你可以点击右键并拖动纹理。

![GPU转储文件查看器的纹理查看器的纹素选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e76028ab-5e2c-4148-89a4-2aefa5a6de8c/gpu-dump-viewer-texture-viewer-texels.png)

显示纹理下方的区域提供了纹理的关键信息和渲染方式。

![GPU转储文件查看器的纹理查看器的信息面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1526e48-1c55-475f-a5a6-63aa4275627e/gpu-dump-viewer-texture-viewer-infopanels.png)

1.  纹理描述符
2.  自定义WebGL 2.0可视化着色器
3.  修改资源的通道
4.  读取资源的通道

##### 纹理描述符

**纹理描述符** 展示了当前显示纹理的相关信息。这一个使用的设置是 `FRDGBuilder::CreateTexture()`。

![GPU转储文件查看器纹理描述符](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b92f2560-8167-4ef9-8a4b-0825e915f3e6/gpu-dump-viewer-texture-descriptor.png)

目前，`DumpGPU` 命令只会转储 `FRDGTexture`，并且仅支持非MSAA的Texture2D。这包括了深度、模板和mip水平。Texture2DArray、Texture2DMS、Texture3D、TextureCube、TextureCubeArray是与HTILE类似的元数据，而CMask及cie暂不支持。

##### WebGL 2.0可视化着色器

**WebGL 2.0可视化着色器** 展示了在顶部窗口中显示纹理所编译的代码段。下方的编译日志窗口会显示所有出现的编译错误。

![GPU转储文件查看器WebGL 2.0可视化着色器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9db897a-ac83-4355-a013-891ff628ec8f/gpu-dump-viewer-texture-webgl-glsl.png)

WebGL 2.0画布窗口是一个可编辑的文本框，能够用于编写任意WebGL 2.0 GLSL。它可以通过自定义设置，使图像在每个通道中压缩多个字节的信息时，或者使用不同的色彩空间时，对纹理进行解码和显示。输入此栏的代码会自动重新编译，并显示所有错误。

与虚幻引擎在虚幻着色器格式（.*usf）与虚幻着色器头文件（*.ush）中用于编写内部HLSL渲染代码所用的语法相比，WebGL 2.0着色器使用的语法并不相同。要了解GLSL语法，[WebGL 2.0参考卡片](https://www.khronos.org/files/webgl20-reference-guide.pdf)的链接位于编译窗口底部。

`fetchTexel(uv)` 并不是标准的GLSL。这是一个自定义函数，会自动处理WebGL 2.0通常不支持的像素格式。

##### 修改与读取的通道

在最底部有两个窗口，一个显示了对选定资源进行修改的通道，另一个显示了读取选定资源的通道。在两个通道列表中，点击通道就能使其显示在查看器中。

![GPU转储文件查看器的修改与读取通道面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79cf57d8-99e3-4932-a7b1-95e328cf0d0e/gpu-dump-viewer-texture-pass-modify-read.png)

#### 缓冲区查看器

在通道 **输入资源** 或 **输出资源** 列表中选中要查看的纹理之后，**缓冲区** 视图会列出它的描述符和可视化内容。

![GPU转储文件查看器的缓冲区查看器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0534bfaa-e8f4-4bd5-8f99-4174e50a38d6/gpu-dump-viewer-buffer-viewer.png)

**缓冲区描述符** 列出了选定资源的综合信息，包括名称、大小、说明、使用及其他信息。

![GPU转储文件查看器缓冲区描述符](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8de65ca6-48fe-47da-9b21-45f60171a281/gpu-dump-viewer-buffer-descriptor.png)

**缓冲区可视化** 会使用十进制或0x前缀的十六进制值列出缓冲区中的地址。

![GPU转储文件查看器缓冲区可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8533a754-00be-490b-9b4d-eb1bd74d2d83/gpu-dump-viewer-buffer-visualization-panel.png)

使用 **地址** 文本栏可以跳转到十进制或0x前缀的特定地址。

![GPU转储文件查看器缓冲区可视化地址搜索栏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92c549c7-7db5-44e7-8397-67bb364f3ad0/gpu-dump-viewer-buffer-visualization-panel-address.png)

列表格式可以自定义，并支持以下类型：

-   Float、Half
-   Int、short、字符
-   Uint、ushort、字符
-   Hex()或bin()，分别会以十六进制或二进制显示以上格式。

由于GPU转储文件查看器并不知道数据的解译方式，缓冲区默认对数据可视化使用 `hex(uint)` 格式，除非其带有 `DrawIndirect` 使用标志，此时将改为使用 `Uint` 格式。

模板 `FRDGBufferDesc::Create*()` 函数可以使用着色器参数架构，创建自己的 `FRDGBuffer`，方便你浏览缓冲区的内容。

![GPU转储文件查看器创建缓冲区代码段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8961d4bb-1a0f-454a-820c-c5fe818b511b/gpu-dump-viewer-create-buffer-code-snippet.png) ![GPU转储文件查看器在查看器中创建缓冲区](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6755856e-c870-44fe-a376-5681309e0b69/gpu-dump-viewer-create-buffer-code-snippet-1.png) 

当描述符 `NumElements` 大于1时，缓冲区会自动切换为按列显示成员，而非按行显示。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [graphics](https://dev.epicgames.com/community/search?query=graphics)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [转储流程](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E8%BD%AC%E5%82%A8%E6%B5%81%E7%A8%8B)
-   [GPU转储文件的保存位置](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#gpu%E8%BD%AC%E5%82%A8%E6%96%87%E4%BB%B6%E7%9A%84%E4%BF%9D%E5%AD%98%E4%BD%8D%E7%BD%AE)
-   [移动平台转储文件的保存位置](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E5%B9%B3%E5%8F%B0%E8%BD%AC%E5%82%A8%E6%96%87%E4%BB%B6%E7%9A%84%E4%BF%9D%E5%AD%98%E4%BD%8D%E7%BD%AE)
-   [转储设置](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E8%BD%AC%E5%82%A8%E8%AE%BE%E7%BD%AE)
-   [DumpGPU命令如何复制GPU转储文件查看器](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#dumpgpu%E5%91%BD%E4%BB%A4%E5%A6%82%E4%BD%95%E5%A4%8D%E5%88%B6gpu%E8%BD%AC%E5%82%A8%E6%96%87%E4%BB%B6%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [GPU转储文件查看器](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#gpu%E8%BD%AC%E5%82%A8%E6%96%87%E4%BB%B6%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [标题栏和面板](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E6%A0%87%E9%A2%98%E6%A0%8F%E5%92%8C%E9%9D%A2%E6%9D%BF)
-   [信息面板](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E4%BF%A1%E6%81%AF%E9%9D%A2%E6%9D%BF)
-   [CVars面板](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#cvars%E9%9D%A2%E6%9D%BF)
-   [日志面板](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E6%97%A5%E5%BF%97%E9%9D%A2%E6%9D%BF)
-   [查看器](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [通道查看器](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E9%80%9A%E9%81%93%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [纹理查看器](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E7%BA%B9%E7%90%86%E6%9F%A5%E7%9C%8B%E5%99%A8)
-   [纹理描述符](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E7%BA%B9%E7%90%86%E6%8F%8F%E8%BF%B0%E7%AC%A6)
-   [WebGL 2.0可视化着色器](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#webgl20%E5%8F%AF%E8%A7%86%E5%8C%96%E7%9D%80%E8%89%B2%E5%99%A8)
-   [修改与读取的通道](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E4%BF%AE%E6%94%B9%E4%B8%8E%E8%AF%BB%E5%8F%96%E7%9A%84%E9%80%9A%E9%81%93)
-   [缓冲区查看器](/documentation/zh-cn/unreal-engine/gpudump-viewer-tool-in-unreal-engine#%E7%BC%93%E5%86%B2%E5%8C%BA%E6%9F%A5%E7%9C%8B%E5%99%A8)