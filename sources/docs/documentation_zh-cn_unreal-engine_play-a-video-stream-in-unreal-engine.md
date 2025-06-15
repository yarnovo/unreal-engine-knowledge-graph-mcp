# 在虚幻引擎中播放视频流 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/play-a-video-stream-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:00.169Z

---

目录

![播放视频流](https://dev.epicgames.com/community/api/documentation/image/3fe0a60a-185f-44d6-a242-3b3659ac1483?resizing_type=fill&width=1920&height=335)

**流媒体源（Stream Media Source）** 是一种资源，允许你在虚幻引擎5（UE5）中流送[支持的 URL](/documentation/zh-cn/unreal-engine/media-framework-technical-reference-for-unreal-engine)格式视频。 定义流后，你可以将其加载并使用 **媒体播放器** 资源在UE4中播放，并可（通过关联的 **媒体纹理**）将其分配给关卡的各个方面。

流可以作为UI元素的一部分加载和播放，并且可以全屏播放，甚至在静态网格体（例如电视）中播放，在关卡中播放。

在本操作指南中，我们将使用[虚幻示意图形](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)（UMG）创建一个全屏播放流式视频的UI元素。

本入门指南中无需编写C++代码。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c6fbd8d-eea1-4abe-8de1-1a31cec1a2ce/00-hero-stream_ue5.png)

## 推荐步骤

在本操作指南中，我们使用启用了 **初学者内容包** 的 **蓝图第三人称模板（Blueprint Third Person Template）** 项目。

## 1\. 创建流送媒体源和纹理

1.  在 **内容浏览器** 中展开 **源面板（Sources Panel）**，然后在 **内容（Content）** 文件夹下创建名为 **媒体（Media）** 的新文件夹。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45f41ca6-0404-4356-bc60-e47befb5553b/01-media-folder_ue5.png)
2.  在空的"媒体"文件夹中右键单击，然后在 **媒体（Media）** 下选择 **流媒体源（Stream Media Source）** 并将资源命名为 **MediaStream**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f854617a-31a1-46f9-9f23-cf420fc93c00/02-stream-media-source_ue5.png)
3.  打开 **MediaStream**，然后输入想用的 **流URL（Stream URL）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12fcf676-2d6b-4ae2-ae9a-c2da11b0fc88/03-stream-url_ue5.png)
    
    如果你没有要链接的URL文件，右键单击此[示例视频](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/c08cf0c4-f2c6-4da3-8770-e87bdef17cf1/samplevideo.mp4)，复制链接地址，然后将其粘贴到"流URL"字段中。
    
    流URL必须直接链接到支持的格式才能播放视频。 例如，PS4Media（PS4）在最新版引擎中仅支持基于HLS的MP4，而WmfMedia（Windows）可支持许多不同的流源。 有关平台/播放器插件所支持格式的更多信息，请参阅[媒体框架技术参考](/documentation/zh-cn/unreal-engine/media-framework-technical-reference-for-unreal-engine)页面。
    
4.  在"媒体（Media）"文件夹中右键单击，然后选择 **媒体（Media）** 下的 **媒体播放器（Media Player）** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d27141f-5e80-40b8-83d7-83a4352762ba/04-add-media-player_ue5.png)
5.  在 **创建媒体播放器（Create Media Player）** 窗口中，启用 **视频输出媒体纹理资源（Video output Media Texture asset）**，然后单击 **确定（Ok）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/334e264c-f5a6-4165-a121-b2b444c6e572/05-video-output-asset_ue5.png)
    
    这将自动创建并关联链接到此 **媒体播放器** 资源的媒体纹理资源以进行播放。
    
6.  将新的媒体播放器资源命名为 **MyPlayer**，它将自动应用于创建的 **媒体纹理** 资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d72a190-0b90-4888-af44-14870ffcea7d/06-media-player_ue5.png)
    
    假如你在使用 **Electra媒体播放器**，请在编辑器中打开你新建的媒体纹理资产。在细节面板中：
    
    -   启用 **启用新样式输出（Enable new style output）**。
    -   将 **输出格式（新样式）（Output format (new style)）** 设置成 **默认（sRGB）（Default (sRGB)）**.
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1bb8f6d4-a425-48fc-884a-6094f771378a/07-enable-new-style-output_ue5.png)
    

## 2\. 将媒体源与材质关联

1.  在媒体文件夹中，新建一个 **材质（Material）**，然后命名为 **MyPlayer\_Material**。
    
    ![用于流送媒体源的新材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b380b5f-131c-41e0-9b0c-6d291b5322d0/07-my-player-material_ue5.png)
2.  打开 **MyPlayer\_Material** 并将其 **材质域（Material Domain）** 改为 **用户界面（User Interface）**。这会更改结果节点，使其能够使用用户界面输出。
    
    ![将材质域设置为用户界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94c31006-0e7e-4eae-9c38-7103c41b785d/08-material-domain_ue5.png)
3.  点击并将内容浏览器中的 **MyPlayer\_Video** 拖进 **MyPlayer\_Material** 的图表。这样会创建一个 **纹理取样（Texture Sample）** 节点，并将MyPlayer\_Video设置为源。
    
4.  将 **RGB** 引脚连到材质的 **最终颜色（Final Color）** 输入。
    
    ![使用流送媒体源的最终材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87ffbc83-e906-47df-abcc-a8c4a885fa64/09-add-texture-sample_ue5.png)
    
    如果你在使用Electra媒体播放器使用纹理取样或纹理对象，你需要将 **取样器类型（Sampler Type）** 设置为 **颜色（Color）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ea108d81-0214-4e57-9ff6-e7ade82c32f5/10-sampler-type-color_ue5.png)
    

## 3\. 将媒体源添加给用户界面控件

1.  在"媒体"文件夹中右键单击，然后在 **用户界面（User Interface）** 下选择 **小部件蓝图（Widget Blueprint）** 并将其命名为 **HUD**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9347987-da22-4969-b3e5-418c2205eccd/11-widget-blueprint_ue5.png)
    
    **小部件蓝图** 是与([UMG](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine))一起使用的资源，用于在虚幻引擎中创建将应用流式视频的UI元素。
    
2.  在 **HUD** 小部件蓝图中，从 **选用板（Palette）** 窗口将 **图像** 拖到图中，并将其拉伸以适合网格的宽高比。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05bbb068-d9c5-4c62-9c2f-b4e69b7d07bb/12-add-canvas-panel_ue5.png)
    
    将媒体纹理应用于此图像。在玩游戏时，图像将在玩家的视口上最大化（创建全屏播放视频）。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dddb996d-9d98-4ee2-8dba-b9aff5e40e50/13-add-image-canvas_ue5.png)
    
    我们将把媒体纹理应用到这张图片上。玩家运行游戏时，该图片将填充玩家的视口（即创建一个能全屏播放的动画视频）。
    
3.  在 **图像** 的 **细节（Details）** 面板中，展开 **外观（Appearance）** 下的 **笔刷（Brush）**，并将 **图像** 设置为 **MyPlayer\_Material**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/211dc5f9-1a07-43f1-9cfa-cdaf164bbe6c/14-image-my-player-material_ue5.png)
4.  在 **图像** 的 **细节（Details）** 面板中，单击 **插槽（Slot）** 下的 **锚点（Anchors）** 下拉列表，然后选择"固定在中心（anchor middle）"选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c23d829-b525-44a7-baeb-116920aafb82/15-add-anchors_ue5.png)
    
    这将保证无论视口大小如何，图像都固定在视口的中心。
    

## 4\. 播放媒体源

1.  关闭 **HUD** 小部件蓝图，然后在关卡编辑器工具栏中选择 **蓝图（Blueprints）** 和 **打开关卡蓝图（Open Level Blueprint）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/390861a5-c12d-44d8-ae42-a2e4e30605cc/16-open-level-blueprint_ue5.png)
2.  创建一个名为 **MediaPlayer** 的变量，类型为 **媒体播放器参考（Media Player Reference）**，并将 **默认值（Default Value）** 设置为 **MyPlayer** 媒体播放器资源。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c58ddd7-30f3-4e9b-9164-9569494f5e4c/17-variables-media-player_ue5.png)
    
    你可能需要单击 **编译（Compile）** 才能查看 **MediaPlayer** 变量的默认值。
    
3.  按住 **Ctrl** 键并将 **MediaPlayer** 变量拖到图上，创建此变量的 **获取（Get）** 节点，然后右键单击并添加 **事件开始播放（Event Begin Play）** 节点。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb11d576-3179-46a7-bbcc-297b696ecaf1/18-add-media-player-blueprint_ue5.png)
    
    当游戏开始时，我们将创建和显示 **HUD**，为流设置声音，然后打开流并播放。
    
4.  右键单击并添加 **创建小部件（Create Widget）** 节点，将 **类（Class）** 设置为 **HUD**，然后在 **返回值（Return Value）** 中，使用 **添加到视口（Add to Viewport）** 并按图所示进行连接。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9b87519-28c9-4b30-8c79-e93a7cf3f222/19-create-hud-widget_ue5.png)
5.  在 **添加到视口（Add to Viewport）** 节点后，右键单击并使用 **添加媒体声音组件（Add Media Sound Component）**，然后在 **细节（Details）** 面板中将 **媒体播放器（Media Player）** 设置为 **MyPlayer**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9126810e-4f52-427c-b04e-da78075b965b/20-add-media-sound-component_ue5.png)
    
    要随同视频一起收听音频，你需要使用指向媒体播放器资源的媒体声音组件。 在这里，我们是在运行时动态创建和添加的。但是，你也可以在 **组件（Components）** 面板中将此组件添加到关卡中存在的Actor或添加为蓝图的一部分。
    
6.  在 **添加媒体声音组件（Add Media Sound Component）** 节点后，使用 **媒体播放器（Media Player）** 参考节点中的 **开源（Open Source）**，将 **媒体源（Media Source）** 设置为 **MediaStream** 资源。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d66b70dc-f660-45a3-bc4e-c9c054b2d4fc/21-all-blueprint-chain_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d66b70dc-f660-45a3-bc4e-c9c054b2d4fc/21-all-blueprint-chain_ue5.png)
    
    点击查看大图。
    
    节点网络完成后，将在游戏开始时创建并显示 **HUD**，并在打开和播放媒体流时播放声音。
    
7.  关闭关卡蓝图，然后单击 **播放（Play）** 以在关卡中播放。
    

## 最终结果

在编辑器中播放后，视频将作为 **HUD** 小部件蓝图的一部分再次全屏播放。

与使用[文件媒体源](/documentation/zh-cn/unreal-engine/play-a-video-file-in-unreal-engine)从磁盘播放视频文件相同，如果默认情况下启用的关联 **媒体播放器** 资源设置为 **打开时播放（Play on Open）**，在调用 **开源** 时将自动播放媒体源。 视频播放开始后，你可以向媒体播放器资源发出其他命令，例如暂停、快退、停止等。在拖出媒体播放器参考（Media Player Reference）时，这些命令将显示在 **媒体播放器（Media Player）** 部分中。

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [media framework](https://dev.epicgames.com/community/search?query=media%20framework)
-   [video playback](https://dev.epicgames.com/community/search?query=video%20playback)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [推荐步骤](/documentation/zh-cn/unreal-engine/play-a-video-stream-in-unreal-engine#%E6%8E%A8%E8%8D%90%E6%AD%A5%E9%AA%A4)
-   [1\. 创建流送媒体源和纹理](/documentation/zh-cn/unreal-engine/play-a-video-stream-in-unreal-engine#1%E5%88%9B%E5%BB%BA%E6%B5%81%E9%80%81%E5%AA%92%E4%BD%93%E6%BA%90%E5%92%8C%E7%BA%B9%E7%90%86)
-   [2\. 将媒体源与材质关联](/documentation/zh-cn/unreal-engine/play-a-video-stream-in-unreal-engine#2%E5%B0%86%E5%AA%92%E4%BD%93%E6%BA%90%E4%B8%8E%E6%9D%90%E8%B4%A8%E5%85%B3%E8%81%94)
-   [3\. 将媒体源添加给用户界面控件](/documentation/zh-cn/unreal-engine/play-a-video-stream-in-unreal-engine#3%E5%B0%86%E5%AA%92%E4%BD%93%E6%BA%90%E6%B7%BB%E5%8A%A0%E7%BB%99%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2%E6%8E%A7%E4%BB%B6)
-   [4\. 播放媒体源](/documentation/zh-cn/unreal-engine/play-a-video-stream-in-unreal-engine#4%E6%92%AD%E6%94%BE%E5%AA%92%E4%BD%93%E6%BA%90)
-   [最终结果](/documentation/zh-cn/unreal-engine/play-a-video-stream-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)

相关文档

[

UMG编辑器参考

![UMG编辑器参考](https://dev.epicgames.com/community/api/documentation/image/64dca8fc-2c19-497d-b0b2-5f4d9fd591ec?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/umg-editor-reference-for-unreal-engine)