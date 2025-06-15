# 虚幻引擎Sequencer电影工具概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview
> 
> 生成时间: 2025-06-14T20:11:18.003Z

---

目录

![Sequencer概述](https://dev.epicgames.com/community/api/documentation/image/6243a693-8c4e-426d-8cf6-409d6b5a23c2?resizing_type=fill&width=1920&height=335)

用户可以使用Sequencer中的多轨道编辑器来创建游戏过场动画。通过创建关卡序列、添加轨道和创建关键帧，你可以为对象、角色和摄像机添加动画。

本页将介绍Sequencer Actor、关卡序列资产和Sequencer的主要功能。

## Sequencer资产和Actor

虚幻引擎中的Sequencer主要有2个部分：**关卡序列资产（Level Sequence Asset）** 和 **关卡序列Actor（Level Sequence Actor）** 。

**关卡序列资产（Level Sequence Asset）** 位于内容浏览器（Content Browser）中，包含Sequencer的数据。这包括轨道、摄像机、关键帧和动画。此资产将分配到 **关卡序列Actor（Level Sequence Actor）** ，以便将其数据绑定到关卡。

![关卡序列资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8894d86d-fa94-42a1-97e1-5d3abf5c2a51/seqasset.png)

**关卡序列Actor（Level Sequence Actor）** 位于关卡中，是 **关卡序列资产（Level Sequence Asset）** 的容器。你可以选择它，以便在 **细节（Details）** 面板中查看其细节。

![关卡序列Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f1e23c33-3ef1-4c19-be49-9bb86429519c/seqactor.png)

名称

说明

**打开关卡序列（Open Level Sequence）**

打开当前绑定关卡序列资产的序列编辑器。

**关卡序列（Level Sequence）**

当前绑定的关卡序列资产。

播放

 

**自动播放（Auto Play）**

创建Actor时，序列将自动播放。

**循环（Loop）**

序列的循环选项。不循环（Don't Loop）将导致序列在播放一次后结束。无限循环（Loop Indefinitely）将导致序列永久循环。精确循环...（Loop Exactly...）将显示次数条目，你可以在其中指定序列的循环次数，达到次数后循环将结束。

**播放速度（Play Rate）**

播放序列的速度。不影响时间膨胀。

**起始偏移（Start Offset）**

序列应该相对于起始时间开始的时间量（以秒为单位）。

**随机开始时间（Random Start Time）**

在开始时间和结束时间之间的随机点开始播放序列。启用此选项将禁用起始偏移。

**恢复状态（Restore State）**

将所有Actor恢复到序列开始之前的状态。

**结束时暂停（Pause at End）**

序列将在结束时暂停，使所有Actor保持在序列的最终位置。

过场动画

 

**禁用运动输入（Disable Movement Input）**

在序列期间禁用来自玩家Pawn的平移输入。

**禁用查看输入（Disable Look At Input）**

在序期间禁用来自玩家Pawn的旋转输入。

**隐藏玩家（Hide Player）**

在序列期间禁用玩家Pawn的可视性。

**隐藏Hud（Hide Hud）**

在序列期间隐藏所有平视显示器（HUD）元素。

**禁用镜头切换（Disable Camera Cuts）**

禁用镜头切换轨道，使序列无法控制摄像机。

### Sequencer创建

你可以通过多种方式创建和指定关卡序列。

最快的方法之一是，点击关卡编辑器（Level Editor）主工具栏中的 **过场动画（Cinematics）** 下拉菜单，然后选择 **添加关卡序列（Add Level Sequence）** 。系统将提示你在内容浏览器（Content Browser）中创建新的 **关卡序列资产（Level Sequence Asset）** 。命名该关卡序列资产，然后点击 **保存（Save）** 。创建后，你的关卡现在将包含 **关卡序列Actor（Level Sequence Actor）** ，并引用新创建的 **关卡序列资产（Level Sequence Asset）** 。

![创建关卡序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05092cae-5a7d-477d-b3d0-513660bc3817/createseq1.png)

创建和指定序列的另一种方法是，点击 **[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)** 中的 **添加/导入（Add/Import）> 动画（Animation）> 关卡序列（Level Sequence）** 。系统还将提示你创建新的 **关卡序列资产（Level Sequence** Asset）。

![创建关卡序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54660817-a68a-491d-a054-e6b99fb69dd0/createseq2.png)

创建序列资产后，找到 **[放置Actor](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)** 面板，并从 **过场动画（Cinematic）** 类别中拖入 **关卡序列Actor（Level Sequence Actor）** 。

![添加序列Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3b8d3a5-df49-4bb0-871f-f5192a2c9e91/addseqactor.png)

然后将资产拖放到关卡序列属性（Level Sequence），将你的关卡序列资产绑定到关卡序列Actor。

![绑定关卡序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/336c906b-a7fc-43e4-8183-75dcb5155cf8/assignseq.png)

## Sequencer编辑器

Sequencer选项卡将包含Sequencer编辑器（Sequencer Editor），它提供了用于创建过场动画内容的用户界面。

![Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e2f0dbf-c172-4ed0-b5f4-ddb44478d4d2/seqwindow.png)

你可以通过多种方式打开此窗口。

一种方法是，点击关卡编辑器（Level Editor）主工具栏中的 **过场动画（Cinematics）** 下拉菜单，然后从列表中选择你的序列。你的序列必须指定给关卡中的关卡序列Actor才能显示在此处。

![打开Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a6b857b-2379-45bb-8dcc-5011b65aaa5d/openseq1.png)

另一种方法是，在 **细节（Details）** 面板中点击关卡序列Actor（Level Sequence Actor）的 **打开关卡序列（Open Level Sequence）** 按钮。

![打开Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e7d65f8-a6cb-42b3-a4d2-f51c75463fa3/openseq21.png)

或者双击 **细节（Details）** 面板中的 **关卡序列** 属性图标。

![打开Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5f5d7a1-17d9-49d1-8bf6-79fc11b7cd27/openseq2.png)

在 **内容浏览器（Content Browser）** 中双击关卡序列资产（Level Sequence Asset）也可以打开它。

![打开Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5edecefc-b3a0-478e-a95c-8e2de011c246/openseq3.png)

从内容浏览器（Content Browser）打开序列时，你当前必须有一个已打开的关卡，并且在该关卡中引用了该序列。否则内容将不会绑定。

最后，找到主菜单栏并点击 **窗口（Window）>过场动画（Cinematics）>Sequencer** 可以打开它。

![打开Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0d0766c-6528-413a-aea5-80afc67f9726/opensec4.png)

访问 **[Sequencer编辑器](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)** 页面，了解有关Sequencer编辑器的更多信息。

[

![Sequencer编辑器](images/static/document_list/empty_thumbnail.svg)

Sequencer编辑器

关于Sequencer编辑器的用户界面、工具和选项的概述。





](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)[

![使用模板序列](images/static/document_list/empty_thumbnail.svg)

使用模板序列

学习如何在摄像机动画中使用模板序列。





](/documentation/zh-cn/unreal-engine/template-sequences-in-unreal-engine)[

![曲线编辑器](images/static/document_list/empty_thumbnail.svg)

曲线编辑器

使用曲线编辑器及其中的工具调整关键帧和曲线。





](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)[

![轨道](images/static/document_list/empty_thumbnail.svg)

轨道

在Sequencer中创建影响Actor的轨道。





](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine)[

![序列、镜头和镜头试拍](images/static/document_list/empty_thumbnail.svg)

序列、镜头和镜头试拍

使用序列、镜头和镜头试拍，在非线性编辑器中编辑过场动画。





](/documentation/zh-cn/unreal-engine/sequences-shots-and-takes-in-unreal-engine)[

![Actor Sequence组件](images/static/document_list/empty_thumbnail.svg)

Actor Sequence组件

说明如何使用 Actor 序列组件在 Actor 蓝图中嵌入序列。





](/documentation/zh-cn/unreal-engine/sequencer-blueprint-component-in-unreal-engine)[

![Take Recorder](images/static/document_list/empty_thumbnail.svg)

Take Recorder

Take Recorder的录制编辑器、Gameplay和Live Link Actor。





](/documentation/zh-cn/unreal-engine/take-recorder-in-unreal-engine)[

![关键帧](images/static/document_list/empty_thumbnail.svg)

关键帧

在Sequencer中为Object、Actor和属性设置关键帧并使用分段，以便添加动画。





](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)[

![编辑器偏好设置和项目设置](images/static/document_list/empty_thumbnail.svg)

编辑器偏好设置和项目设置

使用编辑器和项目设置调整Sequencer的行为。





](/documentation/zh-cn/unreal-engine/cinematic-editor-and-project-settings-in-unreal-engine)[

![渲染电影设置](images/static/document_list/empty_thumbnail.svg)

渲染电影设置

介绍渲染过场动画序列时的可用选项。





](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine)[

![导出和导入FBX文件](images/static/document_list/empty_thumbnail.svg)

导出和导入FBX文件

介绍如何将FBX文件导出和导入Sequencer。





](/documentation/zh-cn/unreal-engine/import-and-export-cinematic-fbx-animations-in-unreal-engine)[

![Sequencer标签和分组](images/static/document_list/empty_thumbnail.svg)

Sequencer标签和分组

在蓝图脚本中，使用标签来引用Sequencer Actor，并使用分组来组织轨道。





](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine)[

![动态绑定](images/static/document_list/empty_thumbnail.svg)

动态绑定

动态绑定提供自定义蓝图逻辑，用于选择在关卡中要持有的对象或要生成的对象。





](/documentation/zh-cn/unreal-engine/dynamic-binding-in-sequencer)[

![可生成对象和可持有对象](images/static/document_list/empty_thumbnail.svg)

可生成对象和可持有对象

使用可生成物在场景中生成临时Actor、光源和其他Object。





](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics)[

![Sequencer播放列表](images/static/document_list/empty_thumbnail.svg)

Sequencer播放列表

在虚拟制片会话期间准备和触发序列。





](/documentation/zh-cn/unreal-engine/sequencer-playlists-in-unreal-engine)[

![Sequencer中的Python脚本](images/static/document_list/empty_thumbnail.svg)

Sequencer中的Python脚本

了解用于Sequencer的常见Python脚本命令和功能。





](/documentation/zh-cn/unreal-engine/python-scripting-in-sequencer-in-unreal-engine)

## Sequencer功能

以下页面详细说明了Sequencer主要的动画和电影制作功能。

[

![Sequencer编辑器](images/static/document_list/empty_thumbnail.svg)

Sequencer编辑器

关于Sequencer编辑器的用户界面、工具和选项的概述。





](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)[

![使用模板序列](images/static/document_list/empty_thumbnail.svg)

使用模板序列

学习如何在摄像机动画中使用模板序列。





](/documentation/zh-cn/unreal-engine/template-sequences-in-unreal-engine)[

![曲线编辑器](images/static/document_list/empty_thumbnail.svg)

曲线编辑器

使用曲线编辑器及其中的工具调整关键帧和曲线。





](/documentation/zh-cn/unreal-engine/animation-curve-editor-in-unreal-engine)[

![轨道](images/static/document_list/empty_thumbnail.svg)

轨道

在Sequencer中创建影响Actor的轨道。





](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine)[

![序列、镜头和镜头试拍](images/static/document_list/empty_thumbnail.svg)

序列、镜头和镜头试拍

使用序列、镜头和镜头试拍，在非线性编辑器中编辑过场动画。





](/documentation/zh-cn/unreal-engine/sequences-shots-and-takes-in-unreal-engine)[

![Actor Sequence组件](images/static/document_list/empty_thumbnail.svg)

Actor Sequence组件

说明如何使用 Actor 序列组件在 Actor 蓝图中嵌入序列。





](/documentation/zh-cn/unreal-engine/sequencer-blueprint-component-in-unreal-engine)[

![Take Recorder](images/static/document_list/empty_thumbnail.svg)

Take Recorder

Take Recorder的录制编辑器、Gameplay和Live Link Actor。





](/documentation/zh-cn/unreal-engine/take-recorder-in-unreal-engine)[

![关键帧](images/static/document_list/empty_thumbnail.svg)

关键帧

在Sequencer中为Object、Actor和属性设置关键帧并使用分段，以便添加动画。





](/documentation/zh-cn/unreal-engine/creating-animation-keyframes-in-unreal-engine)[

![编辑器偏好设置和项目设置](images/static/document_list/empty_thumbnail.svg)

编辑器偏好设置和项目设置

使用编辑器和项目设置调整Sequencer的行为。





](/documentation/zh-cn/unreal-engine/cinematic-editor-and-project-settings-in-unreal-engine)[

![渲染电影设置](images/static/document_list/empty_thumbnail.svg)

渲染电影设置

介绍渲染过场动画序列时的可用选项。





](/documentation/zh-cn/unreal-engine/old-render-movie-in-unreal-engine)[

![导出和导入FBX文件](images/static/document_list/empty_thumbnail.svg)

导出和导入FBX文件

介绍如何将FBX文件导出和导入Sequencer。





](/documentation/zh-cn/unreal-engine/import-and-export-cinematic-fbx-animations-in-unreal-engine)[

![Sequencer标签和分组](images/static/document_list/empty_thumbnail.svg)

Sequencer标签和分组

在蓝图脚本中，使用标签来引用Sequencer Actor，并使用分组来组织轨道。





](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine)[

![动态绑定](images/static/document_list/empty_thumbnail.svg)

动态绑定

动态绑定提供自定义蓝图逻辑，用于选择在关卡中要持有的对象或要生成的对象。





](/documentation/zh-cn/unreal-engine/dynamic-binding-in-sequencer)[

![可生成对象和可持有对象](images/static/document_list/empty_thumbnail.svg)

可生成对象和可持有对象

使用可生成物在场景中生成临时Actor、光源和其他Object。





](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics)[

![Sequencer播放列表](images/static/document_list/empty_thumbnail.svg)

Sequencer播放列表

在虚拟制片会话期间准备和触发序列。





](/documentation/zh-cn/unreal-engine/sequencer-playlists-in-unreal-engine)[

![Sequencer中的Python脚本](images/static/document_list/empty_thumbnail.svg)

Sequencer中的Python脚本

了解用于Sequencer的常见Python脚本命令和功能。





](/documentation/zh-cn/unreal-engine/python-scripting-in-sequencer-in-unreal-engine)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Sequencer资产和Actor](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview#sequencer%E8%B5%84%E4%BA%A7%E5%92%8Cactor)
-   [Sequencer创建](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview#sequencer%E5%88%9B%E5%BB%BA)
-   [Sequencer编辑器](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview#sequencer%E7%BC%96%E8%BE%91%E5%99%A8)
-   [Sequencer功能](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview#sequencer%E5%8A%9F%E8%83%BD)