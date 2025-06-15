# 在虚幻引擎中渲染过场动画 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/rendering-out-cinematic-movies-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:14:05.780Z

---

目录

![渲染过场动画](https://dev.epicgames.com/community/api/documentation/image/fb50cc7c-6dbd-4025-b7ee-4aea253b124d?resizing_type=fill&width=1920&height=335)

学习使用此**Deprecated**功能，但在发布产品中需要谨慎使用。

从虚幻引擎5.0开始，Renderer Movie已被废弃。相反，请使用 **[](/documentation/404)**。

在创建好过场动画之后，甚或在制作过程中作为日常审核工作的一部分，你可能想要将其渲染成可与其他人共享的电影文件。Sequencer中的 **渲染影片（Render Movie）** 选项使你能够通过可用大部分媒体播放器播放的AVI文件与其他人共享电影。

除渲染为电影文件以外，还可以将过场动画渲染为图像序列或渲染可在外部应用程序中使用的 [自定义渲染通道](/documentation/404) 来完成场景。选择渲染电影按钮将显示[渲染电影设置](/documentation/404)窗口，你可以用它定义如何渲染场景。 

在以下示例中，我们将渲染一个样本场景并展示渲染过程中涉及到的部分选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51399888-3350-4441-ba5f-b1292dfeeb1a/heroimage.png)

## 步骤

在本指南中，我们将使用 **蓝图第三人称模板（Blueprint Third Person Template）**，并且会用到 **初学者内容包（Starter Content）**。

1.  在项目中，从 **主工具栏** 单击 **过场动画（Cinematics）** 按钮，然后选择 **添加关卡序列（Add Level Sequence）**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d068d388-3caa-4595-a21c-732e1be47052/rendermovie_01.png)
    
2.  在 **资产另存为（Save Asset As）** 窗口中，为序列输入名称，然后单击 **保存（Save）**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48d86079-efe6-4524-bdac-b3404891131e/rendermovie_02.png)
    
3.  在 **Sequencer编辑器** 中，单击 **添加摄像机（Add Camera）** 按钮。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f74434a-03fd-4434-a869-bc804e070ee0/rendermovie_03.png)
    
4.  在视口中，将摄像机面向角色放置在关卡中的任意位置，然后按 **S** 键来添加关键帧。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54682594-d026-4ca3-ade4-9d551c9ff68b/rendermovie_04.png)  
    我们将拍摄一个样本场景，其中，我们将把摄像机向关卡中的角色推进，拍摄特写镜头。
    
5.  在 **Sequencer**中，移动到帧 **150**，然后将关卡中的摄像机移动到新位置并按 **S** 键来添加关键帧。 摄像机现在将从第一个关键帧移动到第二个关键帧，向角色推进。
    
6.  在 **Sequencer** 中，单击 **渲染电影（Render Movie）** 按钮。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01b3072a-40f5-4efb-b898-33eee7731a07/rendermovie_06.png)  
    此时 **渲染电影设置（Render Movie Settings）**窗口将打开。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8bcfd515-caf6-4b6f-8b2b-0c8a656d954c/rendermoviesettings.png "RenderMovieSettings.png")  
    在 **捕捉设置（Capture Settings）** 下，单击 **输出格式（Output Format）** 选项来查看可用选项，然后选择 **视频序列（Video Sequence）**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bedb9a6-832c-4a03-a23e-d01bd085bb8b/rendermoviesettings_options.png "RenderMovieSettings_Options.png")  
    除了将序列渲染为电影以外，还可以将它渲染为图像序列或使用[自定义渲染通道](/documentation/404)。
    
7.  在 **常规（General）** 下，选择保存过场动画的 **输出目录（Output Directory）**，然后单击 **捕捉电影（Capture Movie）**。  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6f24a2b7-efee-4b6b-9fa3-146cf89e107c/rendermoviesettings_output-1.png "RenderMovieSettings_Output-1.png")  
    在渲染过程进行时，将显示预览窗口。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7125f4d-3729-4b6a-8989-fb01aad8de83/rendermovie_10.png)
    
    如果弹出 **保存** 提示，请单击 **保存（Save）** 或 **不保存（Don't Save）** 以继续，因为选择 **取消（Cancel）** 将使渲染过程异常中止。
    

## 最终结果

在捕捉过程完成之后，你将得到过场动画序列的视频文件（下面是我们渲染的过场动画）。

在渲染出视频序列时，还有其他选项可供使用。在制作过程中，有一个选项可能非常有用，那就是给视频添加[烧入](/documentation/zh-cn/unreal-engine/applying-burn-ins-to-your-movie-in-unreal-engine)的功能。**烧入** 是视频中嵌入的叠加内容，通常用于提供有关显示的帧的内部信息。

你可以向视频中添加默认烧入，或自己创建的 [自定义烧入](/documentation/zh-cn/unreal-engine/applying-burn-ins-to-your-movie-in-unreal-engine)，方法是启用 **使用烧入（Use Burn In）** 选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22bd8634-875f-4689-853a-c4820b828694/rendermoviesettings_burnin.png "RenderMovieSettings_Burnin.png")

在进行过场动画审核时，该功能非常有用，因为它将显示时间码信息、镜头名称和希望提供的任何其他自定义信息。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c60ab2d2-2688-456d-88ea-446fc42cc627/burninsapplied.png)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [deprecated](https://dev.epicgames.com/community/search?query=deprecated)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/rendering-out-cinematic-movies-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/rendering-out-cinematic-movies-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)