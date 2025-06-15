# Meerkat Sample Project for Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:49:06.374Z

---

目录

![Meerkat演示](https://dev.epicgames.com/community/api/documentation/image/6d1bfe84-66f4-4cf1-8eb8-e23d85b2ab88?resizing_type=fill&width=1920&height=335)

实时渲染技术是电影制作流程（从预可视化到最终渲染）中的一项工具，它的作用现在已变得越来越重要，因为它让电影制作人能够非常迅速地查看和迭代数字场景和效果。Weta Digital发布的 **Meerkat演示（Meerkat Demo）** 是一部完全在 **虚拟引擎** 中渲染的短影片，专门用于探索最高水平的画质，同时保持尽可能快的渲染速度。如果有合适的显卡，这部Meerkat短片能够实时运行。本文档将引导你独立使用 **影片渲染队列（Movie Render Queue）** 插件完成输出高质量渲染的Meerkat短片的过程。

此示例可用于虚幻引擎5和更高版本。请注意，此示例是一个图形密集度非常高的场景，需要高效的显卡才能以稳定的帧率运行。

## 必要设置

要使用Meerkat示例设置项目，请按照以下步骤操作：

1.  通过 **Fab** 访问[Meerkat示例](https://fab.com/s/094cb6da0970)，点击 **添加到我的库（Add to My Library）**，让项目文件出现在 **Epic Games启动程序** 中。
    1.  或者，你也可以在UE的Fab插件中搜索该示例项目。
2.  在 **Epic Games启动程序** 中，找到 **虚幻引擎 > 库 > Fab库** 以访问项目。
    
    只有在你安装了兼容的引擎版本时，示例项目才会出现在 **Fab库** 中。
    
3.  点击 **创建项目（Create Project）** 并按照屏幕上的提示下载示例并启动新项目。
    1.  关于访问示例内容及虚幻引擎的Fab插件，详见[示例与教程](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)。
4.  在 **虚幻编辑器** 中打开你的新项目。
    
5.  打开 **编辑（Edit）** > **插件（Plugins）** 窗口，然后导航至 **内置（Built-In）** > **渲染（Rendering）** 部分。确保 **影片渲染队列（Movie Render Queue）** 插件已启用，必要时重启编辑器。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0de50db-5d20-4979-8bd6-f70cce680c24/movie-render-queue-plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0de50db-5d20-4979-8bd6-f70cce680c24/movie-render-queue-plugin.png)
    
    启用影片渲染队列插件。点击查看大图。
    

## 查看Meerkat序列

在加载虚幻编辑器并打开Meerkat演示项目之后，请转到 **内容侧滑菜单（Content Drawer）** 并双击 **Master\_SEQ**。

![Master_SEQ location in the content drawer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22d200a4-f1ae-479e-9409-31dea3b3312f/master-seq-location.png)

这将打开 **Sequencer** 并加载Master\_SEQ关卡序列。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/625d7e60-3dd8-41f5-8155-12a8d78599bc/master-seq-sequencer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/625d7e60-3dd8-41f5-8155-12a8d78599bc/master-seq-sequencer.png)

Sequencer选项卡中加载的Master\_SEQ关卡序列。点击查看大图。

你可以通过点击时间轴，拖拉不同镜头中的时间轴。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96d61364-cd17-4471-b696-23dc59aed639/master-seq-timeline.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96d61364-cd17-4471-b696-23dc59aed639/master-seq-timeline.png)

Master\_SEQ关卡序列的时间轴。点击查看大图。

如果你希望能够通过场景中设置的过场动画摄像机查看镜头，那么可以点击 **镜头（Shots）** 旁边的 **摄像机图标（camera icon）**。你的视口随后将通过与时间轴位置对应的摄像机来查看。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8e68d17-a7f9-4ca4-8b94-eebc1bddce74/cinematic-camera-toggle-icon.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8e68d17-a7f9-4ca4-8b94-eebc1bddce74/cinematic-camera-toggle-icon.png)

显示在Sequencer选项卡中的过场动画摄像机模式的切换按钮。点击查看大图。

你还可以将视口模式从视角（Perspective）更改为 **过场动画视口（Cinematic Viewport）**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e1a1663-2583-4fd4-b61c-dc2881432b2c/cinematic-viewport-mode.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e1a1663-2583-4fd4-b61c-dc2881432b2c/cinematic-viewport-mode.png)

使用视口功能按钮更改为过场动画视口模式。点击查看大图。

如需有关使用Sequencer的更多信息，请参见[Sequencer编辑器](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine)部分。

## 优化设置

为了提高性能，Meerkat演示默认使用低分辨率设置。如果需要最高质量视觉效果，你可以编辑几种优化设置。

### 切换高分辨率环境网格体

在 **大纲视图（Outliner）** 中，点击 **VisualSettings\_BP** 蓝图。在 **细节（Details）** 选项卡中，在 **默认（Default）** 下，你将找到 **高分辨率环境网格体（Highres Env Meshes）** 设置。开启设置之后，你的场景将具有更高的保真度，但在关闭后将运行得稍微快一些。

![高分辨率网格体关闭](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9849b08c-7f65-4609-92c5-dd1a13381c2b/meerkat-comparison-1.png)

![高分辨率网格体开启](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19ea9913-3620-42bc-a065-2f80417ac9a8/meerkat-comparison-2.png)

高分辨率网格体关闭

高分辨率网格体开启

移动滑块以比较已开启和未开启高分辨率环境网格体时的场景。

### 更改鹰的Groom分辨率

Meerkat演示中的 **鹰（Eagle）** 使用 **Groom** 毛发资产来表示它的羽毛。默认情况下，它使用低分辨率groom来提高性能，但是你可以将其更改为高分辨率资产。

1.  在 **大纲视图（Outliner）** 中，点击 **角色（Characters）** 组，然后选择 **amlEagle\_BP** 并查看器 **细节（Details）** 选项卡。
    
2.  选择 **Groom** 属性，该属性列示在 **细节（Details）** 选项卡中的 **amlEagle\_BP(self)** 下。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/264d672d-a9c5-4991-8d09-814cb50bfda7/eagle-groom-asset.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/264d672d-a9c5-4991-8d09-814cb50bfda7/eagle-groom-asset.png)
    
    可以从"细节"选项卡访问Groom属性。点击查看大图。
    
3.  此处具有 **Groom资产（Groom Asset）** 和 **绑定资产（Binding Asset）**，每种资产的图标右侧都有一个下拉菜单。
    
    1.  点击 **Groom资产（Groom Asset）** 菜单，然后将groom从amlEagle\_groomLowRes\_r036\_GRO更改为 **amlEagle\_highRes\_GRO**。
    2.  点击 **绑定资产（Binding Asset）**，然后将其从amlEagle\_groomLowRes\_r036\_GRB更改为 **amlEagle\_highRes\_GRB**。

![低分辨率Groom资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3182709-cc8a-42b1-913f-5d7f4d20ddea/eagle-comparison-1.png)

![高分辨率Groom资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28d96fb3-e21d-4a36-b235-0e8fa3c96f52/eagle-comparison-2.png)

低分辨率Groom资产

高分辨率Groom资产

移动滑块以比较采用低分辨率资产和采用高分辨率资产的鹰。注意羽毛上更精细的细节。

如需有关使用Groom资产的更多信息，请参见[Groom资产编辑器用户指南](/documentation/zh-cn/unreal-engine/groom-asset-editor-user-guide-in-unreal-engine)。

## 使用影片渲染队列渲染Meerkat演示

要渲染Meerkat演示，你需要使用[影片渲染队列](/documentation/404)输出高质量渲染的Sequencer影片。请查看[必要设置](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine#requiredsetup)中的步骤，以确保你启用了影片渲染队列插件，然后按照下面的步骤设置渲染任务：

1.  通过选择 **窗口（Window）** > **过场动画（Cinematics）** > **影片渲染队列（Movie Render Queue）** 启动影片渲染队列。
    
    ![访问影片渲染队列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/53fcf1dc-a011-44d6-a840-469579cfdcc2/movie-render-queue-location.png)
2.  在 **影片渲染队列窗口（Movie Render Queue window）** 的左上角，点击 **+渲染（+ Render）** 按钮。从下拉菜单中选择 **Master\_SEQ**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/535e7ff1-c0d3-4ebc-be02-df61932d9bd8/master-seq-dropdown.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/535e7ff1-c0d3-4ebc-be02-df61932d9bd8/master-seq-dropdown.png)
    
    从"+渲染"下拉菜单访问Master\_SEQ。点击查看大图。
    
    这会将条目添加到影片渲染队列的 **任务（jobs）** 列表进行渲染。
    
3.  在Master\_SEQ的条目中，点击 **设置（Settings）** 列下的 **未保存的配置（Unsaved Config）** 以打开 **设置窗口（Settings Window）**。
    
    ![Clicking Unsaved Config opens the Settings window.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5766b010-9303-4f70-b1d7-7d2f57d29536/movie-render-queue-unsaved.png)
4.  在"设置"窗口中，点击右上角的 **加载/保存预设（Load/Save Presets）** 下拉菜单，然后选择 **MoviePipelineConfig\_Temporal** 预设。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f46d80d-9403-45f1-afa6-ececc56d00d4/movie-render-queue-presets.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f46d80d-9403-45f1-afa6-ececc56d00d4/movie-render-queue-presets.png)
    
    选择MoviePipelineConfig\_Temporal预设，并将其应用到镜头。点击查看大图。
    

你现在具有了渲染Meerkat演示所需的设置。在"设置"窗口中，你将会在窗口左侧看到一个列表，该列表显示已经明确为此项目设置的项。你可以编辑这些设置，以更改所渲染图像的输出目录，更改将要保存的图像类型，或者编辑后处理设置。点击右下角的 **接受（Accept）** 按钮以关闭窗口。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1789e166-63e0-4c68-a79a-b642bf5c01fd/movie-render-queue-settings-window.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1789e166-63e0-4c68-a79a-b642bf5c01fd/movie-render-queue-settings-window.png)

应用了MoviePipelineConfig\_Temporal中的设置的"设置"窗口。点击查看大图。

注意：上图在 **设置（Settings）** 窗口中显示警告图标。项目中的TAA示例设置为16，但警告仍然会显示。你可以忽略此警告。

要启动渲染，请点击影片渲染队列窗口右下角中的 **渲染（本地）（Render (Local)）** 按钮。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3bd4457-e7b7-420f-8ed6-20ac9e41f1ef/render-local-button.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3bd4457-e7b7-420f-8ed6-20ac9e41f1ef/render-local-button.png)

完成影片渲染队列（Movie Render Queue）窗口中的设置。点击查看大图。

渲染预览（Render Preview）窗口将会出现，显示与渲染有关的信息。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3868a0c8-0f70-45a2-ac42-98310da21090/movie-render-queue-render-preview.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3868a0c8-0f70-45a2-ac42-98310da21090/movie-render-queue-render-preview.png)

影片渲染队列（Movie Render Preview）预览窗口显示与渲染进度有关的信息。点击查看大图。

有关如何使用影片渲染队列的信息，请参考Sequencer工作流指南的\[影片渲染队列部分\]animating-characters-and-objects/Sequencer/movie-render-pipeline#影片渲染队列)。

## 将Meerkat 控制绑定添加到镜头

此项目包括Meerkat的 **控制绑定**，你可以使用它在虚幻编辑器中探索某些关键帧动画。要使用此控制绑定，你需要将 **amlMeerkat\_BP** 添加到Sequencer中的镜头。执行此任务最轻松的方式是创建新的关卡序列。

1.  选择 **过场动画（Cinematics）** > **添加关卡序列（Add Level Sequence）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d55315a-2fc2-441c-8e65-cceae59aafd1/add-level-sequence.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d55315a-2fc2-441c-8e65-cceae59aafd1/add-level-sequence.png)
    
2.  在 **资产另存为（Save Asset As）** 窗口中，导航至 **关卡（Levels）** 文件夹，将关卡序列命名为 **MeerkatAnim\_SEQ**，然后点击 **保存（Save）**。你刚刚保存的关卡序列将成为Sequencer中的激活序列。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/198c8f25-a6f1-4eb2-86fe-44a547ef0bb1/save-meerkat-sequence.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/198c8f25-a6f1-4eb2-86fe-44a547ef0bb1/save-meerkat-sequence.png)
    
    保存要用于Meerkat控制绑定的新序列。点击查看大图。
    
    要返回原始序列，可以在内容侧滑菜单中找到Master\_SEQ并双击它。
    
3.  在内容侧滑菜单中，打开 **内容（Content）** > **资产（Assets）** > **meerkat** > **蓝图（Blueprints）** 文件夹，然后找到 **amlMeerkat\_BP** 资产。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86433e70-bd2b-4edb-9bcb-b2861e684d8b/meerkat-blueprint-asset.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86433e70-bd2b-4edb-9bcb-b2861e684d8b/meerkat-blueprint-asset.png)
    
    内容侧滑菜单中的Meerkcat控制绑定资产。点击查看大图。
    
4.  点击 **amlMeerkat\_BP** 资产并将其拖动到 **MeerkatAnim\_SEQ**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/956ee925-d156-4669-9c3a-f6c274220e66/meerkat-asset-sequence.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/956ee925-d156-4669-9c3a-f6c274220e66/meerkat-asset-sequence.png)
    
    点击Meerkat控制绑定蓝图并将其拖动到序列中。点击查看大图。
    

你现在具有了Meerkat资产的副本以及可以在关卡序列中使用的控制绑定。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c3f830a-6fd6-4e95-aa6c-79f8fa3705ab/meerkat-control-rig-timeline.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c3f830a-6fd6-4e95-aa6c-79f8fa3705ab/meerkat-control-rig-timeline.png)

在Sequencer时间轴中设置Meerkat控制绑定的关键帧。点击查看大图。

你可以在时间轴中编辑此参数，或者直接在视口中操控控制绑定。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70bbb052-9076-434e-bbdf-264ec3dbcaad/meerkat-control-rig.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70bbb052-9076-434e-bbdf-264ec3dbcaad/meerkat-control-rig.png)

在关卡视口中操控控制绑定。点击查看大图。

如果你尝试使用Meerkat控制绑定但没有高端显卡，那么可以关闭groom组件的可见性以隐藏毛发，这样可以提高性能。

要实现这一目的，在你的视口中点击Meerkat，在细节面板中显示其信息。在SkeletalMeshComponent下，点击"Groom（继承）"，向下滚动到渲染（Rendering），然后关闭Visible（可见）标记。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d96ba79d-291a-4286-9758-1565690ac432/set-groom-not-visible.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d96ba79d-291a-4286-9758-1565690ac432/set-groom-not-visible.png)

Groom组件可见性复选框的位置。点击查看大图。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [hair](https://dev.epicgames.com/community/search?query=hair)
-   [groom](https://dev.epicgames.com/community/search?query=groom)
-   [movie render queue](https://dev.epicgames.com/community/search?query=movie%20render%20queue)
-   [groom asset](https://dev.epicgames.com/community/search?query=groom%20asset)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [必要设置](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine#%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [查看Meerkat序列](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine#%E6%9F%A5%E7%9C%8Bmeerkat%E5%BA%8F%E5%88%97)
-   [优化设置](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine#%E4%BC%98%E5%8C%96%E8%AE%BE%E7%BD%AE)
-   [切换高分辨率环境网格体](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine#%E5%88%87%E6%8D%A2%E9%AB%98%E5%88%86%E8%BE%A8%E7%8E%87%E7%8E%AF%E5%A2%83%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [更改鹰的Groom分辨率](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine#%E6%9B%B4%E6%94%B9%E9%B9%B0%E7%9A%84groom%E5%88%86%E8%BE%A8%E7%8E%87)
-   [使用影片渲染队列渲染Meerkat演示](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine#%E4%BD%BF%E7%94%A8%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E9%98%9F%E5%88%97%E6%B8%B2%E6%9F%93meerkat%E6%BC%94%E7%A4%BA)
-   [将Meerkat 控制绑定添加到镜头](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine#%E5%B0%86meerkat%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A%E6%B7%BB%E5%8A%A0%E5%88%B0%E9%95%9C%E5%A4%B4)