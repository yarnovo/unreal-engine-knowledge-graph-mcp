# 虚幻引擎中的过场动画渲染图像质量设置 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:09.532Z

---

目录

![图像设置](https://dev.epicgames.com/community/api/documentation/image/7c117f5e-7fdc-49f5-bb59-0e1f1009c6df?resizing_type=fill&width=1920&height=335)

你可以将各种设置添加到电影渲染队列中的作业。其中包括其他渲染设置，如抗锯齿、颜色输出调整、控制台命令等。

#### 先决条件

-   你已完成 **[影片渲染管线](/documentation/404)** 页面中的"影片渲染队列"一节的先决条件步骤。

点击电影渲染队列窗口中的 **+设置（+ Setting）** 下拉菜单，并选择 **设置（Settings）** 类别下的项目，可以选择要添加的设置。

![渲染图片设置列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f655a0dc-30c6-43c9-8475-f2f5f6e7ffd6/addsetting.png)

添加后，你可以使用切换开关启用和禁用它们，并且你可以选择它们来自定义其属性。

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

## 输出

输出包含与序列分辨率和文件格式相关的设置。输出是必要设置，并且无法从设置窗口中删除。

![渲染输出设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3a4c375-af3f-41ab-b25e-6d8b9e956d85/outputsetting.png)

属性

说明

**输出目录（Output Directory）**

指定保存导出内容的文件目录。

**文件名称格式（File Name Format）**

确定导出内容的指定文件名格式。你可以使用格式字符串令牌来支持自定义命名。你可以在此处使用斜线（/）指定相对于 **输出目录（Output Directory）** 的子文件夹。

**输出分辨率（Output Resolution）**

确定导出分辨率。

**使用自定义帧率（Use Custom Frame Rate）**

允许使用不同于关卡序列中的自定义帧率。

**输出帧率（Output Frame Rate）**

确定你启用了 **使用自定义帧率（Use Custom Frame Rate）** 时的新帧率。

**覆盖现有输出（Override Existing Output）**

允许自动重写具有相同文件名的文件。如果禁用，将在文件名后附加一个整数，例如1。

**零点填充帧号（Zero Pad Frame Numbers）**

确定填充输出帧号的数字数量。例如，值为2，将输出\_01，值为4，将输出\_0001作为文件名后缀。

**帧号偏移（Frame Number Offset）**

渲染期间写入磁盘时将指定数字添加到帧号。可使用此功能避免有关标签框架负数的问题，大多数软件无法应对此问题。因此，无需将-2、-1、0、1写入磁盘，你可通过将帧编号偏移（Frame Number Offset）设为100来写出98、99、100、101。

**句柄帧计数（Handle Frame Count）**

确定每个镜头要包含的帧句柄的数量。这将按两边的给定帧数扩展每个镜头分段，并渲染它们。

**输出帧步长（Output Frame Step）**

每帧要跳过的帧数。例如，将此值设置为2会设置每隔一帧渲染。对于跳过的帧，游戏仍然会更新，使渲染每帧和每步进帧之间的渲染效果更加一致。你将看到一些图像质量差异（由于存在不同的时间历史记录）。此功能为试验性功能。

**使用自定义播放范围（Use Custom Playback Range）**

允许指定与序列不同的自定义播放范围。

**自定义开始帧（Custom Start Frame）**

确定开始帧（若你启用了自定义播放范围）。超始帧包含在内。

**自定义结束帧（Custom End Frame）**

确定结束帧（若你启用了自定义播放范围）。结束帧不包含在内，因此 **开始时间（Start Time）** 为0，**结束时间（End Time）** 为1时，将仅渲染一帧（第0帧）。

**自动版本（Auto Version）**

如果启用，影片渲染队列将检查输出目录中最后一次渲染中的最新版本号，以1为增量递增，然后将该值用于下一次渲染的版本号。

**版本号（Version Number）**

如果禁用了 **自动版本（Auto Version）**，使用 `{version}` 令牌时，此字段中的值将用作渲染输出的版本号。

### 格式字符串信息

**文件名称格式（File Name Format）** 属性支持使用自定义令牌，称为 **格式字符串（Format Strings）** ，支持自定义文件名格式。若在文件名格式中指定了令牌，在渲染和保存文件时，它将替换为预期名称。

![格式字符串令牌](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cc51064-f114-4281-a9d1-f5cddc56342e/formatstring.png)

你可以使用以下令牌：

令牌名称

说明

**{level\_name}**

正在渲染的关卡的名称。

**{sequence\_name}**

关卡序列资产名称。

**{frame\_rate}**

序列的帧率，或者启用了"使用自定义帧率"（Use Custom Frame Rate）时的覆盖帧率。

**{date}**

今天的日期，格式为{年}.{月}.{日}。

**{year}**

渲染开始的当前年份。

**{month}**

渲染开始的当前月份。

**{day}**

渲染开始的当前日期。

**{time}**

渲染开始的当前时间，格式为{时}.{分}.{秒}.使用24小时制。

**{frame\_number}**

正在渲染序列的帧数。所有视频输出都将剥离此令牌，因为它仅适用于图像序列文件。

**{frame\_number\_shot}**

正在渲染镜头的帧数。所有视频输出都将剥离此令牌，因为它仅适用于图像序列文件。

**{frame\_number\_rel}**

正在渲染序列的帧号，相对于0而言，与起始帧号无关。如果你的序列从负区域开始，则此项很有用。所有视频输出都将剥离此令牌，因为它仅适用于图像序列文件。如果采用时间膨胀，此值也将用于 `{frame_number}` 。

**{frame\_number\_shot\_rel}**

正在渲染镜头的帧号，相对于0而言，与起始帧号无关。如果你的序列从负区域开始，则此项很有用。所有视频输出都将剥离此令牌，因为它仅适用于图像序列文件。如果采用时间膨胀，此值也将用于 `{frame_number_shot}` 。

**{camera\_name}**

Sequencer中当前激活的摄像机Actor名称。

**{shot\_name}**

关卡序列中镜头分段的名称，否则回退到序列资产名称。

**{render\_pass}**

将替换为渲染过程中图像面向的渲染通道的名称。如果渲染多个渲染通道，则自动插入，确保最终图像具有唯一名称。

**{output\_resolution}**

完整的输出分辨率，格式为{宽度}\_{高度}。

**{output\_width}**

输出分辨率的宽度。

**{output\_height}**

输出分辨率的高度。

**{version}**

由 **自动版本（Auto Version）** 或 **版本号（Version Number）** 定义的版本号。

将设置添加到列表中时，即可使用这些令牌。

 

**{ts\_count}**

使用[**抗锯齿**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF)时，抗锯齿设置的 **时间采样（Temporal Sample）** 计数。

**{ss\_count}**

使用[**抗锯齿**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF)时，抗锯齿设置的 **空间采样（Spatial Sample）** 计数。

**{shutter\_timing}**

使用[**摄像机**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA)时，摄像机设置的 **快门时间（Shutter Timing）** 属性。

**{overscan\_percentage}**

使用[**摄像机**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA)时，摄像机设置的 **过扫描（Overscan）** 百分比属性。

**{tile\_count}**

使用[**高分辨率**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E9%AB%98%E5%88%86%E8%BE%A8%E7%8E%87)时，高分辨率设置的 **图块计数（Tile Count）** 属性。

**{overlap\_percent}**

使用[**高分辨率**](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E9%AB%98%E5%88%86%E8%BE%A8%E7%8E%87)时，高分辨率设置的 **重叠率（Overlap Ratio）** 属性。

## 抗锯齿

抗锯齿可控制用于生成最终帧的采样数量。影片渲染队列新增了组合多个渲染一同产生最终帧的功能。这样可显著提升抗锯齿、动态模糊的质量，并可以减少光线追踪产生的噪点。有两种类型的采样可产生最终帧：**时间（Temporal）** 和 **空间（Spatial）** 。

![抗锯齿渲染设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/928f68f9-390f-445f-b8b3-bc812d400f29/aasetting.png)

**时间采样（Temporal sampling）** 获取相机快门打开的时间（基于摄像机/后期处理动态模糊量（Motion Blur Amount）设置），并将帧分割成相应的时间段。然后，引擎在每个时间段的中心求值，同时使用标准引擎动态模糊在每个时间段之间插值。将动态模糊表示为许多小的方向动态模糊，可以实现旋转动态模糊。

由于引擎更新（再则因世界场景中时间流逝），这些就被称为 *时间* 采样。对于每个时间采样，根据 \*空间采样计数（Spatial Sample Count）\*\* 变量累积了很多渲染。使用过多时间采样会导致引擎的增量时间过短，无法处理，并导致在渲染后产生警告。

**空间采样（Spatial sampling）** 获取要渲染的各个采样并多次渲染，每次都抖动一下摄像机。这对于动态模糊持续时间很短的渲染很有用，但仍然需要更多采样来增加抗锯齿或减少噪点。

只要是空间和时间采样组合，就会产生用于抗锯齿的相同偏移模式。由于非移动对象将获得相同的抗锯齿效果，而移动对象将变得模糊，从而隐藏锯齿，这意味着，将采样置于时间采样（而不是空间采样）通常更高效。

    ![增加时间采样计数将使得径向动态模糊更平滑。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ab7420b-fc2e-4baf-b3c3-c4e67ba06a3b/tsseq1.png) ![增加时间采样计数将使得径向动态模糊更平滑。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47c50465-f1ba-44db-9563-06330b35c121/tsseq2.png) ![增加时间采样计数将使得径向动态模糊更平滑。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4da925db-f360-48f1-90f1-aae4e53870da/tsseq3.png) ![增加时间采样计数将使得径向动态模糊更平滑。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb5a0650-a112-4ed1-841c-803ae5bfc92c/tsseq4.png) ![增加时间采样计数将使得径向动态模糊更平滑。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12c0402a-b7eb-490a-82a1-64f228acbdec/tsseq5.png)

**增加时间采样计数将使得径向动态模糊更平滑。**

可将时间和间采样与TAA结合使用来尝试抗锯齿结果，但大多数情况下并不建议这样做。若启用TAA，则用于抗锯齿的独特位置数量选取存在限制。此限制由 **r.TemporalAASamples** 定义，默认为8。如果启用了TAA并且你有8个以上采样，则应启用 **覆盖抗锯齿（Override Anti-Aliasing）** 并将其设置为 **无（None）** 以禁用TAA，或增加 **r.TemporalAASamples** 以便匹配 **空间计数 x 时间计数（Spatial Count x Temporal Count）** 产生的采样数。

若使用的时间采样计数大于1，系统将在帧的任何一侧对序列求值。这意味着，你需要扩展Sequencer中的轨迹以覆盖序列起始部分前一帧的时间，否则将没有可采样的数据。分段将自动扩展以涵盖由第一个时间采样求值的时间跨度。某些轨道类型（如动画或音频）无法自动展开并且会跳过。渲染后，系统将通知你哪些分段需要手动扩展。

名称

说明

**空间采样计数（Spatial Sample Count）**

确定每个时间采样中累积渲染的数量。

**时间采样计数（Temporal Sample Count）**

确定每帧分为多少个时间间隔。

**覆盖抗锯齿（Override Anti-Aliasing）**

允许使用 **抗锯齿方法（Anti-Aliasing Method）** 属性选择不同的抗锯齿方法。

**抗锯齿方法（Anti Aliasing Method）**

启用"覆盖抗锯齿"（Override Anti-Aliasing）时，此字段将选择所需的抗锯齿方法。

-   **无（None）** ：禁用抗锯齿。如果使用的空间/时间采样超过8个，建议使用此方法。
-   **FXAA** ：这会对屏幕空间中的锯齿状像素进行平滑处理，而非使用世界中的3D网格体数据，后者比TAA或MSAA快，但细节不太精确。
-   **TemporalAA** ：使用时间抗锯齿。这是在虚幻引擎中使用的默认动态模糊算法，此算法使用之前帧的信息来消除当前帧的锯齿。可能会导致重影，尤其是当移动对象在嘈杂背景的前方时。
-   **MSAA** ：不支持。

**使用镜头切换进行预热（Use Camera Cut for Warm Up）**

启用后，系统将根据开始时间之前的镜头切换分段确定预热帧的数量。此功能将实现在预热期间对这些帧求值，这使得你可以让角色带着布料从参考姿势动起来，即让粒子/布料看起来像是延续上一个镜头继续移动。

![镜头切换预热](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11b975bd-db60-46ef-8fd1-2fe179dd5e0c/camerawarmup.png)

**渲染预热帧（Render Warm Up Frames）**

启用后，电影渲染队列会将每个引擎预热帧提交给GPU进行渲染。如果你的内容必须渲染才能正确预热，例如GPU粒子或虚拟纹理，此功能很有用。禁用后，引擎预热帧将在游戏线程更新，但不会将渲染提交给GPU。

**渲染预热计数（Render Warm Up Count）**

控制在渲染开始之前用于构建时间历史记录的采样数。进行摄像机切换或拍摄时，会清除TAA使用的时间历史记录，防止出现前一摄像机角度的"重影"。为了在第一帧实现抗锯齿，必须重建该历史记录。同时采集所有采样，无需更新采样间的引擎。无论 **引擎预热计数（Engine Warm Up Count）** 帧是多少或 **渲染预热帧（Render Warm Up Frames）** 是否启用，这都会在渲染开始之前立即进行。

**引擎预热计数（Engine Warm Up Count）**

表示在渲染开始之前运行引擎的帧数。除非启用了 **渲染预热帧（Render Warm Up Frames）** ，否则这些帧不会提交给GPU。通常，当你需要时间让布料物理、粒子或其他动态因素在渲染开始之前停留在合适位置时，预热很有用。

## 烧入

烧入允许将自定义水印添加到渲染，通常这些水印与时间码相关。你可以选择将烧入应用到最终图像中，或渲染到单独的图层

![渲染烧入设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e9b93e3-8865-4408-984b-75a3a89c7322/burnsetting.png)

**烧入（Burn In）** 图像具有以下显示格式：

![烧入图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c31fe51-ad04-4300-a4e9-dceabe5fb974/burninexample.png)

1.  作业名称。
2.  渲染开始的日期和时间。
3.  关卡名称。
4.  渲染作者，由作业细节（Job Details）定义。
5.  进行当前渲染的源代码控制变更列表和分支。
6.  主序列的当前帧和时间。
7.  当前摄像机的焦距、光圈系数和对焦距离（以毫米为单位）。
8.  当前帧和镜头序列的时间。

## 摄像机

镜头设置**摄像机（Camera）** 设置可更改动态模糊的呈现方式并支持过扫描。

![摄像机渲染设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b005b63-1303-40a1-84fa-9a1da62017b2/camerasetting.png)

名称

说明

**快门时间（Shutter Timing）**

快门时间（Shutter Timing）可将动态模糊角度的偏差控制在帧之前、期间或之后。

-   **帧打开（Frame Open）** 代表快门打开，因此所代表的动态模糊是Sequencer中一帧之后的内容。
-   **帧中心（Frame Center）** 在帧打开和关闭之间具有相同的偏差，使得动态模糊在前后帧之间居中。
-   **帧关闭（Frame Close）** 表示快门关闭，因此所表示的动态模糊是Sequencer中帧之前的内容。

**过扫描百分比（Overscan Percentage）**

增加此值可基于与输出分辨率相乘的百分比来渲染超出输出分辨率的额外像素。摄像机视野也会根据该百分比按比例膨胀，以保持非过扫描区域内的原始图像。此属性主要用于EXR输出格式，因为它将区域信息编码为EXR独有的格式。它将适用于其他格式，但最终输出分辨率将大于预期，并且镜头的取景将发生变化。

摄像机Actor现在正式拥有了内置的过扫描属性。如果场景中为一个摄像机设置了过扫描，并在影片渲染队列中渲染它，该值会被传递过去，并被识别为是在MRQ现有的过扫描设置中直接设置的。你仍可以在MRQ中重载摄像机的过扫描值。

**渲染所有摄像机（Render All Cameras）**

启动此项后将分别渲染所有摄像机，[多角度渲染](/documentation/zh-cn/unreal-engine/rendering-from-multiple-camera-angles-in-unreal-engine)此序列或镜头。

## 颜色输出

**颜色输出（Color Output）** 设置使用自定义 **打开颜色IO (OCIO)（Open Color IO (OCIO)）** 配置覆盖默认颜色空间设置。

![颜色ocio设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3e5d308-59f8-4cda-aabb-a0a07981d592/colorsetting.png)

将 **启用（Is Enabled）** 字段设置为 **true** ，启用OCIO颜色转换并自动禁用色调曲线。然后，你可以将 **配置源（Configuration Source）** 设置为在内容浏览器中创建的OCIO配置，并且你可以使用 **源颜色空间（Source** **Color Space）** 和 **目标颜色空间（Destination Color Space）** 设置从一个颜色空间转换到另一个。如果你正在进行后期制作工作（模板层、对象ID等），你将需要使用基于OCIO的工作流程，因为大多数后期制作工作流程都要求你处于线性空间中。当与.exr图像序列结合时，选中 **禁用色调曲线（Disable Tone Curve）** 将使引擎输出在线性空间中。

**禁用色调曲线（Disable Tone Curve）** 设置可手动禁用电影色调曲线，即使你尚未启用OCIO。如果启用（Is Enabled）设为true，则此选项将灰显。禁用色调曲线将可以输出.exr文件，此类文件存储来自后期处理通道的线性数据，同时此通道也不会像通常那样针对显示重新调降到\[0-~1\]范围。

有关OCIO配置的更多信息，请访问 **[OpenColorIO颜色管理](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine)** 页面。

## 控制台变量

**控制台变量（Console Variables）** 设置可更改渲染开始时你指定的任何控制台变量。尝试增加光线追踪采样数量或应用编辑中实时预览开销过大的其他质量设置时，此选项很有帮助。

![渲染控制台变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43cb6035-d4c1-456d-901b-94f63848bfd7/consolesetting.png)

当影片开始渲染时，**控制台变量（Console Variables）** 列表中的任何控制台变量都将设置为你指定的值。保存渲染开始前的原始值，渲染完成后，控制台变量将恢复为原始值。列表中的每个条目都是一个键值对，包含控制台变量名称和想要为该变量设置的值。

**开始控制台命令（Start Console Command）** 和 **结束控制台命令（End Console Commands）** 列表将在渲染开始之前和渲染结束之后执行提供的控制台命令。这可以用于运行不是变量的控制台命令，例如执行 **[自定义事件](/documentation/zh-cn/unreal-engine/custom-events-in-unreal-engine)**。

## 调试选项

包含用于调试某些渲染行为的选项。

![调试渲染设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8afa318c-eeca-4104-a5fb-a6fe285a5a60/debugsetting.png)

名称

说明

**编写全部采样（Write All Samples）**

启用此功能会将GPU生成的每个渲染采样与输出一起写入磁盘，以便你能够检查单个时间或空间子采样渲染的效果而无需累积。

**使用Render Doc捕获帧（Capture Frames with Render Doc）**

启用此选项可在 **捕获帧（Capture Frame）** 属性上指定帧号。需要 **[使用RenderDoc分析虚幻引擎画面](/documentation/zh-cn/unreal-engine/using-renderdoc-with-unreal-engine)** 。

**捕获帧（Capture Frame）**

指定要捕获的序列帧号，它将自动在该帧上触发RenderDoc，并将捕获写入磁盘，你可以在其中检查视觉效果问题。

## 游戏覆盖

这会覆盖几个常见的游戏相关设置，例如游戏模式和过场动画质量设置。若游戏的正常模式显示不想采集的UI元素或加载屏幕，则此选项很有帮助。

![游戏覆盖设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b08a5b3-50f3-46ce-afe4-dc67c948929c/gamesetting.png)

属性

说明

**游戏模式覆盖（Game Mode Override）**

用另一种游戏模式覆盖贴图的默认游戏模式。如果游戏的正常模式显示了你不想捕获的UI或加载屏幕，这很有用。默认情况下，使用空的 **MoviePipelineGameMode** 来隐藏玩家。

**过场动画质量设置（Cinematic Quality Settings）**

自动应用 **引擎可扩展性设置（Engine Scalability Settings）** 中的 **过场动画（Cinematic）** 质量设置。

**纹理流送（Texture Streaming）**

确定应使用哪些方法在每帧中加载纹理。

**使用LODZero（Use LODZero）**

启用网格体和粒子系统的最高质量设置，无论距离如何。

启用此功能后，它还将运行控制台命令 `foliage.ForceLOD 0`。 然而，植被系统对其将绘制的三角形数量设有上限，而其他系统则没有。由于可能有很多植被网格体，这会影响性能，而上限可以就此提供保护。当达到上限时，不会渲染再植被。

你可以通过以下方式解决此问题：

-   使用 `foliage.MaxTrianglesToRender` 提升此上限（默认为100000000）。请注意，这会使渲染时间显著放慢。
    
-   增加 `foliage.LODDistanceScale` 并且不运行 `folige.ForceLOD 0`（在这种情况下，你不会启用 **使用LODZero（Use LODZero）** ）。你可以在电影渲染队列的[控制台变量](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)设置中指定这些命令。
    
    由于 **使用LODZero（Use LODZero）** 也会更改其他系统的LOD，因此你可能还需要运行以下控制台命令以在非植被源上强制LOD0：
    
    ```cpp
    	r.ForceLOD 0
    	r.ParticleLODBias -10
    	foliage.DitheredLOD 0
    	r.SkeletalMeshLODBias -10
    ```
    

**禁用细节级别（Disable HLODs）**

禁用层级细节级别以使用实际网格体，无论距离如何。

**使用高质量阴影（Use High Quality Shadows）**

启用一些常见的阴影相关设置，提高渲染质量。

**阴影距离比例（Shadow Distance Scale）**

乘以对象上可见阴影的距离值越大，意味着可以看到相距越远的对象的阴影。

**阴影半径阈值（Shadow Radius Threshold）**

覆盖对象投射阴影所需的最小屏幕尺寸。值越小，意味着越小的对象会投射阴影。

**覆盖视图距离比例（Override View Distance Scale）**

覆盖对象的视图距离比例。当最大绘制距离设为特定值时，此选项有助于提高游戏内性能。

**视图距离比例（View Distance Scale）**

若你覆盖默认的额视图距离比例，请设置比例的值。

## 高分辨率

可通过 **高分辨率（High Resolution）** 设置使用平铺渲染，以生成比最大纹理大小或GPU内存限制所支持的常规大小图像更大的图像。在高分辨率（High Resolution）中，可调整图块计数（Tile Count）、重叠率（Overlap Ratio）和纹理锐度偏差（Texture Sharpness Bias）。

![高分辨率图块渲染设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9e49a23-110c-4116-98ff-20105d38ab3f/highressetting.png)

属性

说明

**图块计数（Tile Count）**

设置渲染时图像分成的图块数量。使用方形格式，因此输出分辨率为7680x4320且 **图块计数（Tile Count）** 设置为 **2** 时，将总共渲染四（2x2）个图块，每个图块的分辨率为1920x1080。

**纹理清晰度偏差（Texture Sharpness Bias）**

让纹理mip映射偏差以选择比通常情况更高分辨率的纹理。负数越大表示，该偏差更有可能选择比正常情况更详细的mipmap，但若该值太高，则可能导致粒状图像。偏差对已经显示其最高质量mipmap的纹理没有影响。

**重叠率（Overlap Ratio）**

控制每个图块相互重叠的程度。值为0.1时，混合在一起的图像之间有10%的重叠。此功能对于景深尤其有帮助，通常可在图像边缘附近产生不同效果。使用此属性会使渲染更加耗时，但可以减少图块之间的接缝。

**覆盖次表面散射（Override Sub Surface Scattering）**

一些次表面散射方法依赖于图像历史记录的时间抗锯齿。由于高分辨率平铺不支持TAA，因此此选项允许你增加采样数量，克服缺乏图像历史记录的问题。

**Burley采样计数（Burley Sample Count）**

用于Burley次表面散射的采样数。

此示例图像显示了当 **图块计数（Tile Count）** 设置为 **2** 且 **重叠率（Overlap Ratio）** 设置为 **0.25** (25%) 时，如何组合图块来创建最终图像。**重叠率（Overlap Ratio）** 区域在平铺图像上以黄色显示。

![具有25%重叠的2x2图块](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/254dc518-b068-4a5c-b8bc-938d4e57c189/tileseq1.png)

![组合最终图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cc8191b-e772-498d-8681-f52430654a8a/tileseq2.png)

具有25%重叠的2x2图块

组合最终图像

目前，高分辨率不支持时间抗锯齿和依赖于屏幕空间效果的部分渲染功能。其中包括屏幕空间反射、卷积泛光、镜头光斑和极快移动对象上的动态模糊。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [movie render queue](https://dev.epicgames.com/community/search?query=movie%20render%20queue)
-   [anti aliasing](https://dev.epicgames.com/community/search?query=anti%20aliasing)
-   [render](https://dev.epicgames.com/community/search?query=render)
-   [motion blur](https://dev.epicgames.com/community/search?query=motion%20blur)
-   [anti-aliasing](https://dev.epicgames.com/community/search?query=anti-aliasing)
-   [antialiasing](https://dev.epicgames.com/community/search?query=antialiasing)
-   [raytracing](https://dev.epicgames.com/community/search?query=raytracing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [输出](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E8%BE%93%E5%87%BA)
-   [格式字符串信息](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%A0%BC%E5%BC%8F%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%BF%A1%E6%81%AF)
-   [抗锯齿](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%8A%97%E9%94%AF%E9%BD%BF)
-   [烧入](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E7%83%A7%E5%85%A5)
-   [摄像机](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA)
-   [颜色输出](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E9%A2%9C%E8%89%B2%E8%BE%93%E5%87%BA)
-   [控制台变量](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)
-   [调试选项](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E8%B0%83%E8%AF%95%E9%80%89%E9%A1%B9)
-   [游戏覆盖](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E6%B8%B8%E6%88%8F%E8%A6%86%E7%9B%96)
-   [高分辨率](/documentation/zh-cn/unreal-engine/cinematic-rendering-image-quality-settings-in-unreal-engine#%E9%AB%98%E5%88%86%E8%BE%A8%E7%8E%87)