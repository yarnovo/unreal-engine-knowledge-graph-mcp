# 在虚幻引擎中播放图像序列 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/play-an-image-sequence-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:24:39.052Z

---

目录

![播放图像序列](https://dev.epicgames.com/community/api/documentation/image/5b632420-f027-4cd9-8dcc-94125ae8719b?resizing_type=fill&width=1920&height=335)

作为媒体框架工具的一部分，**图像媒体源（Image Media Source）** 资源提供了一种在虚幻引擎5（UE5）中播放图像序列的方法。 图像媒体源（Image Media Source）类似于[文件媒体源（File Media Source）](/documentation/zh-cn/unreal-engine/play-a-video-file-in-unreal-engine)，你可以指定图像序列文件的路径以便进行播放，而不是指向视频的链接。 命名约定十分重要，建议你按图像顺序进行命名，如\_Image\_01*、\_Image\_02*、*Image\_03*，确保它们按正确顺序播放。

在本操作指南中，我们将应用并使用图像媒体源（Image Media Source），以在关卡中的静态网格体上播放图像序列。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edece706-1caa-448d-b0fd-1db2f0374907/imagemediahero_1.png)

**Electra媒体播放器** 目前还不支持图像序列播放。

本教程介绍了图像序列的手动工作流程。5.1的用户也可以使用[媒体板Actor](/documentation/zh-cn/unreal-engine/the-media-plate-actor-in-unreal-engine)。后者提供了拖放媒体源的额外功能，并优化了对预构建网格体的流送。

## 步骤

在本操作指南中，我们使用启用了 **初学者内容包** 的 **蓝图第三人称模板（Blueprint Third Person Template）** 项目。 你还需要一个图像序列，如果你没有，可以单击右键并下载本教程中使用的[样本图像序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/3e5fb700-3b09-4101-85c8-7fc38734ebc7/ue5_images.zip)。

1.  在 **内容浏览器** 中，展开 **源（Sources）** 面板，然后在 **内容（Content）** 下面，创建一个新文件夹 **电影（Movies）**。
    
    ![New Folder Movies](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4cce197-d6d2-4510-9cc5-7d38bac3955d/01-new-folder-movies.png)
2.  右键单击 **电影（Movies）** 文件夹，然后选择 **在资源管理器中显示（Show in Explorer）**。
    
    ![Show in Explorer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e2a9cbe-1cac-4ec0-90d7-9978749a31a8/02-show-in-explorer.png)
    
    虽然不是强制性要求，但为了正确打包项目并部署媒体文件，建议你将媒体文件放在 **Content/Movies** 文件夹中。
    
3.  将图像序列的图像放在 **Content/Movies** 文件夹中。
    
    ![Images inside Movies Folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdb117cc-9cce-494f-98b9-8c9ea377e6c8/03-place-the-images.png)
    
    在上图中，我们在 **Content/Movies** 中创建了一个新文件夹，名为 **UE5\_Images**，并在其中放置了JPG图像。 我们还创建了另一个文件夹，名为 **lowres**，其中包含序列中图像的较低分辨率版本。 媒体框架工具为你提供了一种方法，供你在开发期间通过媒体源代理处理（通常）较低分辨率版本的图像。 这样效率更高，并可以尽量减少在处理较大图像序列和文件大小时的性能问题。
    
4.  返回到 **编辑器（Editor）**，在虚幻引擎5项目内部，单击 **自动导入（Auto-Import）** 对话框上的 **不导入（Don't Import）** 按钮。
    
    ![Click Don't Import Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89ad4e7b-b8f2-4439-b4ff-81cb484b2b11/04-click-dont-import-button.png)
    
    无需将图像导入到项目中，因为我们可以指向它们在项目目录中的位置。
    
5.  右键单击 **Content/Movies** 文件夹，然后在 **媒体（Media）** 下面，选择 **图像媒体源（Img Media Source）**，并命名为 **MyImageSequence**。
    
    ![Img Media Source](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2452c0f8-acb5-47fd-9f93-d874d9d4fd23/05-select-img-media-source.png)
6.  在新的 **MyImageSequence** 资源中，单击 **序列路径（Sequence Path）** 旁边的 **...** 按钮，并将其指向图像序列中的第一个图像。
    
    ![Sequence Path Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab79ff70-b08b-4648-895c-2d822f8206af/06-sequence-path-button.png)
7.  单击 **高级选项（Advanced Options）** 滑出按钮来展开 **序列（Sequence）** 选项，并在 **代理覆盖（Proxy Override）** 下面输入 **lowres**。
    
    ![Proxy Override](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e09d313-b2e3-488e-a88c-bd4707e462be/07-sequence-path-advanced-options.png)
    
    这里我们指向名为 **lowres** 的文件夹，这个文件夹包含用于开发的较低分辨率图像。 使用较低分辨率图像将减少内存需要，并提供优于完整分辨率文件的体验。
    
    "代理覆盖（Proxy Override）"路径必须指向与完整分辨率图像相同目录结构中的同名文件夹才能找到它。
    
8.  在 **Content/Movies** 文件夹中单击右键，然后在 **媒体（Media）** 下面选择 **媒体播放器（Media Player）**。
    
    ![Media Player](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a997a4f-b410-4ffb-9689-0721fba9cc07/08-media-player.png)
    
    媒体播放器（Media Player）资源将用来播放我们所创建的图像序列。
    
9.  在 **创建媒体播放器（Create Media Player）** 窗口中，启用 **视频输出媒体纹理资源（Video output Media Texture asset）** 选项，然后单击 **确定（OK）** 按钮。
    
    ![Video Output Media Texture Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07828197-11bf-4d03-8a07-a33eb7a82494/09-video-output-asset.png)
    
    这样将创建并自动指定 **媒体纹理（Media Texture）** 资源，这个资源与将用来播放图像序列的这个媒体播放器关联。
    
10.  将 **媒体播放器（Media Player）** 资源命名为 **MyPlayer**（将自动命名媒体纹理）并双击以将其打开。
    
    ![My Player Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94d6b33a-0981-4f10-893d-e2b3b517e6d2/10-my-media-player.png)
11.  在 **媒体编辑器（Media Editor）** 中，在 **细节（Details）** 面板中，启用 **循环（Loop）** 选项。
    
    ![Enable Loop Option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3005296-5b7c-41bf-a809-594e368c43f2/11-enable-loop-option.png)
    
    启用该选项将使媒体播放器持续循环播放图像序列。
    
12.  双击 **MyImageSequence** 资源以开始播放图像序列。
    
    ![Start Playing the Image Sequence](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dc87b4c-4624-46da-bfe5-a34ddb26d99c/12-start-playing-image-sequence.png)
    
    你的图像序列将开始在媒体编辑器中播放，如果你单击 **信息（Info）** 选项卡，将看到有关所播放图像序列的信息。 在我们的示例中，我们可以看到图像序列的 **尺寸（Dimension）** 是 **640 x 360**，因为我们目前使用的是 **lowres** 图像。
    
13.  在 **内容浏览器** 中，打开 **MyImageSequence** 资源，清空 **代理覆盖（Proxy Override）** 部分。
    
    ![Clear Out the Proxy Override Section](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d76d4009-dad0-4df7-8cb4-35609c310da9/13-proxy-override-clear.png)
    
    这样我们就可以切换到完整分辨率图像，如果再次打开媒体播放器资源并播放图像序列，**尺寸（Dimension）** 值就会有所不同。
    
    ![Full Resolution Images](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b6d3594-7524-4311-b543-3aa2fd75dc62/14-full-resolution-image-enable.png)
    
    播放器窗口底部的 **图像缓存（Image Cache）** 进度条反映的是内存中缓存的内容量（绿色表示完全就绪并已加载，黄色表示当前正在加载，灰色表示正在计划加载）。 根据系统硬件，缓存量和颜色可能有所不同。有关更多信息，请参阅[媒体框架概述](/documentation/zh-cn/unreal-engine/media-framework-overview-for-unreal-engine)的"图像媒体"部分。
    
14.  从主编辑器的 **放置Actor（Place Actors）** 面板的 **形状（Shapes）** 选项卡中，将 **平面（Plane）** 拖到关卡中并根据需要调节大小和位置。
    
    ![Plane Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef13dc6e-1de1-4861-8d8a-162b1c759a10/15-shapes-plane.png)
    
    你可以使用[变换工具](/documentation/zh-cn/unreal-engine/transforming-actors-in-unreal-engine)根据需要来移动、旋转或伸缩平面。
    
15.  从 **内容浏览器**，将 **MyPlayer\_Video** 媒体纹理资源拖到关卡中的 **平面（Plane）** 上面。
    
    ![Add My Player Video Media Texture Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1da84681-6826-44c3-a0e4-ab7ebac8bb32/16-add-my-player-video.png)
    
    这样将自动使用该媒体纹理创建 **材质** 并将其应用于关卡中的这个平面上，继而将用来播放我们的图像序列。
    
16.  从主工具栏，单击 **蓝图（Blueprints）** 按钮，然后选择 **打开关卡蓝图（Open Level Blueprint）**。
    
    ![Open Level Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9ce6100-535e-4df1-a863-96e03e4bd82e/17-open-level-blueprint.png)
    
    在开始测试之前，将使用[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)告诉我们的媒体播放器，在游戏开始时打开图像媒体源资源以便开始播放。
    
17.  在 **我的蓝图（MyBlueprint）** 面板中，创建 **媒体播放器引用（Media Player Reference）** 类型的变量并命名为 **MediaPlayer**，然后将 **MyPlayer** 指定为 **媒体播放器（Media Player）**。
    
    ![Variable Media Player](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51c8e501-1e34-4a0c-ae80-c5bf2abc262e/18-variable-media-player.png)
    
    创建变量后，需要单击 **编译（Compile）** 来为 **媒体播放器（Media Player）** 指定 **默认值（Default Value）**。
    
18.  按住 **Ctrl** 键并将 **媒体播放器（MediaPlayer）** 变量拖到图形上，然后单击右键并创建 **事件开始播放（Event Begin Play）** 节点。
    
    ![Drag the Media Player](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd1f8489-2b60-4fed-8543-5c2ead2f1806/19-media-player-blue.png)
19.  从 **媒体播放器（Media Player）** 变量拖出引线，使用 **打开源（Open Source）** 节点，将 **媒体源（Media Source）** 设置为 **MyImageSequence** 并按图所示进行连接。
    
    ![Set Media Source](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55fb640b-c16f-4289-8969-17cf17e4cf84/20-media-source-image-sequence.png)
20.  **编译（Compile）** 并 **保存（Save）**，然后从主编辑器，单击 **播放（Play）** 按钮来在编辑器内部播放。
    

## 最终结果

在编辑器中播放后，图像序列将开始在关卡中的静态网格体播放并循环播放。

该示例使用的是JPG文件，但你可以使用图像媒体源中[支持的文件类型](/documentation/zh-cn/unreal-engine/media-framework-technical-reference-for-unreal-engine)的任何图像文件。

-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [media framework](https://dev.epicgames.com/community/search?query=media%20framework)
-   [video playback](https://dev.epicgames.com/community/search?query=video%20playback)
-   [image sequences](https://dev.epicgames.com/community/search?query=image%20sequences)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/play-an-image-sequence-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/play-an-image-sequence-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)