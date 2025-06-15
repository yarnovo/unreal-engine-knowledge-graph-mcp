# 虚幻引擎中的Sequencer电影编辑器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine
> 
> 生成时间: 2025-06-14T20:11:10.937Z

---

目录

![Sequencer编辑器](https://dev.epicgames.com/community/api/documentation/image/213b8758-5665-47d2-afd2-5aa954e23e3e?resizing_type=fill&width=1920&height=335)

**Sequencer编辑器** 是可以用于编辑[关卡序列资产](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)的主要接口,让你可以在 **虚幻引擎** 中创建电影内容。

下列文档提供了关于Sequencer编辑器的用户界面、工具和属性的概述。

![sequencer editor overview with highlights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/560e9c41-2abe-45d8-b192-83796a5cb5b8/reference.png)

1.  [工具栏（Toolbar）](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
    
2.  [大纲视图（Outliner）](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE)
    
3.  [时间轴（Timeline）](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%97%B6%E9%97%B4%E8%BD%B4)
    
4.  [播放控制（Playback Controls）](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%92%AD%E6%94%BE%E6%8E%A7%E5%88%B6)
    

## 工具栏

Sequencer编辑器工具栏包括一套工具、选项和设置，你可以用它们来与关卡序列资产进行对接。

![sequencer toolbar overview with highlights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d0f1da1-8f6b-42ba-8736-aade1180bcee/toolbar.png)

名称

图标

描述

[**世界场景（World）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E4%B8%96%E7%95%8C%E5%9C%BA%E6%99%AF)

![sequencer world](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b3d67c6-15bb-4686-acf3-cac4fe3ea4b1/world.png)

列出当前全局上下文、关卡序列Actor和播放领域的信息。它包含各种选项，可以指定是否希望将序列自动绑定到编辑器中运行（PIE）、模拟或其他运行时会话。

**保存（Save）**

![sequencer save](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/943477c3-fab6-4ac6-9248-220626ecfb7c/save.png)

保存当前序列和任何子场景或镜头。

**在内容浏览器中查找（Find in Content Browser）**

![sequencer find](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3732437-9e32-4ce4-82fc-bad6b1e35810/findcb.png)

在内容浏览器中查找当前序列的关卡序列资产。

[**创建摄像机（Create Camera）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%91%84%E5%83%8F%E6%9C%BA)

![sequencer camera](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40c85cb0-d722-4b68-acb9-c1ddfbad9c48/camera.png)

创建新的 **[过场动画摄像机Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)**。还将创建一个新的 **[镜头切换轨道](/documentation/zh-cn/unreal-engine/cinematic-camera-cut-track-in-unreal-engine)** 并将引用此摄像机（如果尚未创建）。

[**渲染（Render）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E6%B8%B2%E6%9F%93)

![sequencer render](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b53d1c4-4fb7-4d91-9e62-2aedc1f35d36/render.png)

如果其插件已启用，打开 **[渲染电影设置](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine)** 设置对话框，或 **[](/documentation/404)**。

[**导演蓝图（Director Blueprint）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E5%AF%BC%E6%BC%94%E8%93%9D%E5%9B%BE)

![sequencer director](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c174d8ad-835d-41d4-a852-a1c20ceccdb5/directorbp.png)

打开此序列的导演蓝图，从中可以访问 **[事件轨道](/documentation/zh-cn/unreal-engine/cinematic-event-track-in-unreal-engine)** 逻辑。

[**操作（Actions）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E6%93%8D%E4%BD%9C)

![sequencer actions](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bf7c152d-2979-49d6-a0fc-fc27ec0c1eca/actions.png)

列出各种序列编辑器操作，如保存、导入/导出、烘焙和选择编辑。

[**视图选项（View Options）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E8%A7%86%E5%9B%BE%E9%80%89%E9%A1%B9)

![sequencer view options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe23cd60-aaa8-4324-83ee-7f83c5609fe8/view.png)

列出各种序列视图选项。

[**播放选项（Playback Options）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E6%92%AD%E6%94%BE%E9%80%89%E9%A1%B9)

![sequencer playback options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3127aad1-93c2-4e25-8740-6082c55cbe49/playback.png)

列出各种播放选项，如播放速率、开始/结束时间和播放头行为。

[**关键帧选项（Keyframe Options）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E5%85%B3%E9%94%AE%E5%B8%A7%E9%80%89%E9%A1%B9)

![sequencer keyframe options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d7f209d9-d6bc-45a4-bb1d-ea5c23502ce9/keying.png)

列出自动关键帧变换关键帧行为的设置，以及创建的默认切线。

[**自动关键帧（Auto Key）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E8%87%AA%E5%8A%A8%E5%85%B3%E9%94%AE%E5%B8%A7)

![sequencer autokey](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5e676cd4-e15c-48ad-87de-b88215cbc4c3/autokey.png)

启用自动关键帧模式，只要属性或变换出现变动，就会自动创建关键帧。

[**编辑选项（Edit Options）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E7%BC%96%E8%BE%91%E9%80%89%E9%A1%B9)

![sequencer edit options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c9f9672-c327-444a-a009-736303e77503/edits.png)

列出Sequencer在使用自动关键帧时如何解释来自细节面板的编辑的设置。

[**对齐（Snapping）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E5%AF%B9%E9%BD%90)

![sequencer snapping](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe36f6dc-a28e-4549-8c05-aab0fbdde549/snapping.png)

启用对齐。旁边的下拉菜单列出了用于设置关键帧、分段和时间轴的对齐规则的选项。

[**每秒帧数（Frames Per Second）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E6%AF%8F%E7%A7%92%E5%B8%A7%E6%95%B0)

![sequencer fps](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff287b6e-c903-4c1e-8e22-d9398f74784a/playbackoptions.png)

列出运行时的各种每秒帧数（FPS）目标的设置。还包含允许运行时锁定到选定帧率的选项。

[**曲线编辑器（Curve Editor）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E6%9B%B2%E7%BA%BF%E7%BC%96%E8%BE%91%E5%99%A8)

![sequencer curve editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/66029e13-98b5-4567-8148-596ed8892683/curveeditor.png)

打开 **[曲线编辑器](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)**，这可用于微调动画关键帧和切线。

[**操作记录（Breadcrumbs）**](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#%E6%93%8D%E4%BD%9C%E8%AE%B0%E5%BD%95)

![sequencer breadcrumbs](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ade7b26f-950a-410e-86b8-6351b5e30853/breadcrumbs.png)

显示当前序列名称，可用于导航主序列和镜头。

**锁定（Lock）**

![sequencer lock](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6b41517-50d9-46ea-b633-8d942176ed0a/lock.png)

锁定整个序列以防止编辑。

关于在Sequencer编辑器工具栏的更多信息，请参阅[Sequence编辑器工具栏](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine)。

## 大纲视图

Sequencer编辑器大纲视图包含一个关卡序列资产的轨道列表，以及添加、筛选和搜索轨道的工具。轨道可以代表附属于你的关卡序列的Actor，如摄像机、角色、音频和特效。

![sequencer outliner overview with highlights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10634864-c798-436d-8c7c-d57979955ade/outlinerarea.png)

请参阅[Sequencer 轨道](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine)，了解有关Sequencer轨道的更多信息。

## 时间轴

Sequencer的时间轴是一个非线性的编辑环境，它代表了你的关卡序列资产的整个可播放区域。时间轴包括每个轨道的水平区域，并可以包括资产、关键帧和时间轴控制。

关卡序列资产的回放范围包含在 **开始**（绿色）和 **结束**（红色）标记内。回放的当前位置由[播放头](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%92%AD%E6%94%BE%E5%A4%B4)指示。

![sequencer overview with highlights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc1ac5a7-7274-4be2-bd60-0827264919ac/timelinearea.png)

### 时间轴导航

想找到Sequencer编辑器中的关卡序列资产,你可以对时间轴进行[平移](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E5%B9%B3%E7%A7%BB)和[缩放](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E7%BC%A9%E6%94%BE)。

#### 平移

你可以通过上下拖动右侧的滚动条，垂直平移你的时间轴视图，以查看更多的轨道区域。

![sequencer vertical pan scroll bar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e244f5b1-b2f6-41a8-a263-b32bb163697f/pan1.png)

你可以使用时间轴底部的 **范围滑条** 水平平移和缩放时间轴视图，以查看回放中的不同内容。

拖动滑块中部可以平移，而拖动滑块的左右边可以缩放视角。

![sequencer时间轴平移](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6ba8081-0880-4e77-9381-fe98546ae303/pan2.gif)

范围滑块默认启用，可以在Sequencer工具栏的 **视图选项（View Options）** 中禁用。

Image

按住鼠标右键并在时间轴上拖动可以水平和垂直平移。

![sequencer freeform pan right click](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7da010c3-1c9f-4400-a854-5eb160a51f6a/pan3.gif)

鼠标滚轮可以上下平移时间轴，按住 **Shift** 并使用鼠标滚轮可以左右平移时间轴。

![sequencer horizontal and vertical shift pan scroll wheel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72ba1298-c59a-43b5-b0d0-72b9dc1ee143/pan4.gif)

#### 缩放

按住 **CTRL** 并滚动鼠标滚轮可以缩放。

![horizontal scrolling](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6a2b1e3-8937-40fe-8989-88b2218c890b/zoom1.gif)

按住 **ALT + Shift** 并左右 **点击拖动鼠标右键** 可以自由缩放。

![horizontal scrolling](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e75e88f-e41d-46a1-924c-8067305b27c6/zoom2.gif)

按住 **CTRL** 并向 **右** 拖动时间块，可以定义一个缩放区域。按住 **CTRL** 并向 **左** 拖动时间块可以将缩放还原为原始大小。

![horizontal scrolling](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/996100e4-d875-4f41-b8ef-9b82946052cf/zoom3.gif)

默认情况下，缩放枢轴是相对于播放头的。你可以通过在 **编辑器偏好设置** 的 **关卡序列编辑器** 部分找到 **缩放位置** 偏好改变设置。

如果你的缩放和时间轴超出了屏幕范围，可以通过 **Home** 键来进行重置，按下此键还会重置范围滑块的边界。

![home button horizontal zoom scrolling](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/919ac78d-7fe1-4d04-a789-4e29970b1af8/zoom4.gif)

### 播放头

播放头表示序列中当前的时间，是时间轴交互的主要控制之一。在播放时，它会按照指定的播放速率在时间轴上移动，并且可以暂停。

![sequencer播放头](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0c43d6c-df72-4818-a08e-c6fb822dd3ab/playhead.png)

可以使用 **鼠标左键（LMB）** 拖动播放头来改变序列当前的时间，并且可以在视口中预览变化。这通常称为 "scrubbing"。

![sequencer scrubbing](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e50d3212-1937-40e2-b4e3-4656a22fe29f/scrubbing.gif)

用 **鼠标中键（MMB）** 拖动可以让播放头移动到指定的位置而不让序列进行运算。这样可以更改时间而不改变属性数值，能够用于快速创建同等数值的关键帧。 如此操作播放头的时候，它会变成 **黄色** 来表示序列没有进行运算。

![sequencer鼠标中键scrubbing](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6152d2c-dc25-45cd-a56f-29d91071fb99/playheadmmb.gif)

播放头的当前时间会在序列大纲视图中显示并且可以修改。按下 **CTRL + T** 来将选择聚焦到该区域，然后输入新的时间数值。

![sequencer当前时间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f562dc7f-6b50-4519-8666-533feab802a0/playheadvalue.png)

右键点击播放头或者时间块的任意位置来显示其它的选项。

![sequencer时间轴菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8ca9d58-4d33-4962-bcd5-e7555e8040a1/playheadmenu.png)

名称

描述

快捷键

**设置开始时间（Set Start Time）**

将序列的开始时间设置到光标当前的位置。如果使用快捷键，将会设置到播放头的位置。

**\[**

**设置结束时间（Set End Time）**

将序列的结束时间设置到光标当前的位置。如果使用快捷键，将会设置到播放头的位置。

**\]**

**设置选中开始时间（Set Selection Start）**

将自定义时间轴选择范围的起始点设为光标所在的位置。

**i**

**设置选中开始时间（Set Selection End）**

将自定义时间轴选择范围的结束点设为光标所在的位置。

**o**

**清除选择范围（Clear Selection Range）**

移除范围选择。

 

**添加标记（Add Mark）**

在播放头的当前位置创建一个自定义时间轴标记（Custom Timeline Mark）。

**m**

**删除所有标记（Delete All Marks）**

从序列中移除所有的自定义标记。

 

**锁定（Locked）**

启用后，所有标记将被锁定，标记将不能被编辑，这让你能自由地拖动时间轴滑条。

 

如果当前时间是在子帧或中间帧，播放头时间指示器会显示 **星号**（\*）。如果[对齐](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine#snapping)被禁用，就会发生这种情况。

![sequencer sub frames asterisk](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/343f183e-9d71-4463-a49f-4ec6e8ae5409/asterix.png)

### 选择范围

在序列中可以自定义选择范围，可用于协助时间轴选择和播放。

要创建选择范围，在时间轴块中右键点击一个点，然后设置 **开始（Start）** 和 **结束选择范围（End Selection Range）**。

![sequencer选择范围](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3883df56-8e17-4544-a0c0-552d05dfc9c7/selectionrange1.png)

选择范围的柄可以像序列的开始和结束时间一样进行调整。

![sequencer选择范围](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1aa6c571-04aa-4680-831d-5e98a7d06e98/selectionrange2.gif)

你还可以将选择范围设为循环播放。

![sequencer选择范围循环](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/720f17d7-ac4e-4072-81ea-a3a7afc274fb/selectionrange3.gif)

选择范围还可以用于选择关键帧以及其中的分区，点击 **动作（Actions）** 工具栏按钮并选择 **选择选择范围内的关键帧（Select Keys in Selection Range）** 或者 **选择选择范围内的分区（Select Sections in Selection Range）**。

![sequencer选择范围菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fbf27630-4cc3-4b6c-9773-863c3f53dde9/selectionrange4.png)

要移除选择范围，右键点击时间块然后选择 **清除选择范围（Clear Selection Range）**。

### 自定义帧标记

自定义帧标记可以用于提起对区域的注意或为序列提供注释的点。

要创建标记，在时间轴块中右键点击然后选择 **添加标记（Add Mark）**。

![sequencer add mark option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f63ff70b-02d6-4400-9306-70de7a7deaaf/marks1.png)

帧标记可以在Sequencer时间轴上选择和多选，以编辑它们的位置。

![sequencer marks manipulation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c005522-f452-4357-ab5e-2265e5d2acdc/marks3.gif)

要编辑一个标记，右击Sequencer时间轴上的标记标志，进入其上下文菜单。你可以在这里定制它的属性，如 **帧号（Frame Number）**、**标签** 和 **颜色**。

![sequencer mark properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/260465c5-01db-4b0c-94d8-2019e7fe9ced/marks2.png)

使用这些属性来在Sequencer编辑器中创建电影片时观察并设置自定义帧标记标表现。

属性

说明

**标记帧（Marked Frame）**

设置或参考标记在你的关卡序列中的 **帧号**。

**标签（Label）**

为自定义标记帧设置一个名称。设置的值将在Sequencer时间轴中的标记标志的顶部可见。

**注释（Comment）**

添加与自定义标记相关的注释。

**颜色（Color）**

为Sequencer时间轴中的标记标志设置一个自定义颜色。

**是否是确定性栅栏？（Is Determinism Fence?）**

当启用时，标记被视为**确定性栅栏**，它确保所有的Sequencer组件在Sequencer时间轴上的标记位置都会经过评估。

确定性栅栏不能用单一评估来越过，迫使评价分成两部分进行，确保对所有现存的Sequencer组件进行准确的评估。

我们建议在关卡序列中的重要帧上添加标记，并启用 **确定性栅栏** 属性，以确保在运行时准确播放。

**添加标记（Add Mark）**

在你的光标所在的时间码处新建一个自定义标记。

每个关卡序列帧只能存在一个自定义标记。

**删除标记（Delete Mark）**

删除当前选中的标记。

**删除所有标记（Delete All Marks）**

删除关卡序列资产中的所有自定义标记。

## 播放控制

播放控制位于Sequencer的左下角，功能与标准的媒体播放应用类似。

这里包括切换播放、暂停以及其它播放相关的功能按钮。

![sequencer add mark option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6edc1d1d-6b16-4f6a-8d37-c46d5fa1fd6b/playbackcontrols.png)

图标

描述

![sequencer record button take recorder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f40c073-f715-4921-bde7-6edf7ff0fc16/recordbutton.png)

使用 **镜头试拍录制器（Take Recorder）**，在Sequencer大纲视图中录制所选Actor的动作。

想要使用这个回放控制，你必须安装镜头试拍录制器插件。更多信息，请参阅[镜头试拍录制器](/documentation/404)文档。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cd40784-6444-4e37-b74e-43edf3dc965a/playbackbracketin.png)

将序列起始位置设置为播放头的当前位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9cccc012-c617-4c84-b5b8-432d9e4c4a30/playbackgotofront.png)

跳转到序列起始位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df7923fb-24db-404b-bcb6-1507b03744f9/playbackprevkey.png)

跳转到所选轨道中的上一个关键帧。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d952f51c-09df-4ef2-a800-a8966aef23e9/playbackstepback.png)

跳转到上一帧。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c3f8729-98cc-4723-8c5a-4ea5d4e775b5/playbackreverse.png)

从播放头位置反向播放或暂停关卡序列。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b3d829a-6b67-46a1-aa49-7a69d17bd74d/playbackplay.png)

从播放头位置播放或暂停关卡序列。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca907a42-0a14-41c2-b670-cd3146d735e6/playbackstepforward.png)

向前跳一帧。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b08668a4-9a42-46c5-9e33-6acc08f73abf/playbacknextkey.png)

跳转到所选轨道中的下一个关键帧。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e59383cf-462a-4718-b277-db60a717ea25/playbackgotoend.png)

跳转到序列结束位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1010515d-be04-4174-be8c-533af5ff8b29/playbackbracketout.png)

将序列结束位置设置为播放头的当前位置。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa222a1a-fc9d-436c-b28a-cc5abdedde64/playbackloop.png)

切换是否循环。如果时间轴中使用了选择范围，那么会加入选择范围循环。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工具栏](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [大纲视图](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE)
-   [时间轴](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%97%B6%E9%97%B4%E8%BD%B4)
-   [时间轴导航](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%97%B6%E9%97%B4%E8%BD%B4%E5%AF%BC%E8%88%AA)
-   [平移](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E5%B9%B3%E7%A7%BB)
-   [缩放](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E7%BC%A9%E6%94%BE)
-   [播放头](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%92%AD%E6%94%BE%E5%A4%B4)
-   [选择范围](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E9%80%89%E6%8B%A9%E8%8C%83%E5%9B%B4)
-   [自定义帧标记](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%B8%A7%E6%A0%87%E8%AE%B0)
-   [播放控制](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine#%E6%92%AD%E6%94%BE%E6%8E%A7%E5%88%B6)