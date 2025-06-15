# 虚幻引擎中的过场动画和动画制作 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:17.862Z

---

目录

![过场动画和Sequencer](https://dev.epicgames.com/community/api/documentation/image/4d055422-5f06-40fe-afd0-0882c40c514c?resizing_type=fill&width=1920&height=335)

虚幻引擎包含许多强大的过场动画工具，允许你创建动画和动画序列。你可以让摄像机一边飞越关卡一边拍摄，对光源进行动画处理，移动对象，对角色进行动画处理，渲染输出序列等等。所有这些流程的核心都是 **Sequencer**，一个强大的非线性编辑工具。Sequencer是你在虚幻引擎中创建过场动画内容时使用的主要工具。

本文罗列了虚幻引擎过场动画工具相关的文档链接，以相关实际使用案例。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/051afffa-e843-4606-accf-9f89e909913b/main.png)

## 开始

如果你刚开始学习过场动画工具和虚幻引擎，请参考下述页面，它们涵盖了Sequencer编辑器的基础知识。我们提供了各种简单的指南，帮助你了解创建过场动画时可能需要执行的常见操作。

[](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)

[![Sequencer基础](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7918261-4aee-4df3-b3b3-a5945f0891a3/topicimage.png)](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)

[Sequencer基础](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)

[使用Sequencer创建过场动画的指南。](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)

[

![创建摄像机动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f5de74f-0824-4527-b04a-814246017ec0/placeholder_topic.png)

创建摄像机动画

关于如何在Sequencer中创建摄像机动画的入门探索。





](/documentation/zh-cn/unreal-engine/how-to-animate-cinematic-cameras-in-unreal-engine)[

![将动画应用到角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59dc5111-53e4-4913-9d7a-01affe62a758/placeholder_topic.png)

将动画应用到角色

关于如何在Sequencer中添加角色动画的入门探索。





](/documentation/zh-cn/unreal-engine/how-to-add-cinematic-animation-to-a-character-in-unreal-engine)[

![制作光源动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c14482f-b589-4344-b4b2-9e7a14fdfc9a/placeholder_topic.png)

制作光源动画

关于如何在Sequencer中制作光源动画的入门探索。





](/documentation/zh-cn/unreal-engine/how-to-animate-lights-in-unreal-engine)[

![启用粒子](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d47d45b9-a601-433a-b344-3b8083265b71/topicimage.png)

启用粒子

关于如何在Sequencer中启用不同类型的粒子的入门探索。





](/documentation/zh-cn/unreal-engine/how-to-trigger-cinematic-particle-effects-in-unreal-engine)

## Sequencer编辑器

下述页面介绍了Sequencer编辑器中的相关工具、功能和流程，以及与Sequencer相关的工具。

[](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)

[![Sequencer概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fdcd8ea8-154a-49b4-a9e5-0796ef69e614/topicimage.png)](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)

[Sequencer概述](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)

[了解关卡序列和Sequencer编辑器的主要功能。](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)

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

## 摄像机

下述页面介绍了在过场动画中如何设置和使用摄像机的信息。

[](/documentation/zh-cn/unreal-engine/movie-and-cinematic-cameras-in-unreal-engine)

[![Sequencer中的摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6d04816-6a1e-4867-8d95-27479a08d909/topicimage.png)](/documentation/zh-cn/unreal-engine/movie-and-cinematic-cameras-in-unreal-engine)

[Sequencer中的摄像机](/documentation/zh-cn/unreal-engine/movie-and-cinematic-cameras-in-unreal-engine)

[了解如何在你的过场动画中使用摄像机及其功能。](/documentation/zh-cn/unreal-engine/movie-and-cinematic-cameras-in-unreal-engine)

[

![过场动画摄像机Actor](images/static/document_list/empty_thumbnail.svg)

过场动画摄像机Actor

过场动画摄像机Actor用作在虚幻引擎中拍摄过场动画内容的主要摄像机类型。





](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)[

![虚拟摄像机](images/static/document_list/empty_thumbnail.svg)

虚拟摄像机

控制虚幻引擎中的摄像机并通过模块化组件系统来操控和输出摄像机数据。





](/documentation/zh-cn/unreal-engine/virtual-cameras-in-unreal-engine)[

![摄像机绑定](images/static/document_list/empty_thumbnail.svg)

摄像机绑定

通过摄像机绑定在虚幻引擎中使用真实世界技术进行拍摄。





](/documentation/zh-cn/unreal-engine/camera-jibs-and-dollies-in-unreal-engine)[

![摄像机晃动](images/static/document_list/empty_thumbnail.svg)

摄像机晃动

在虚幻引擎中创建摄像机晃动效果。





](/documentation/zh-cn/unreal-engine/camera-shakes-in-unreal-engine)[

![过场动画视口](images/static/document_list/empty_thumbnail.svg)

过场动画视口

使用过场动画视口在视口中添加电影制作控制选项。





](/documentation/zh-cn/unreal-engine/cinematic-viewport-controls-in-unreal-engine)[

![图像板](images/static/document_list/empty_thumbnail.svg)

图像板

使用图像板在摄像机上播放全屏视频和图像序列。





](/documentation/zh-cn/unreal-engine/full-screen-movies-in-unreal-engine)

## 渲染

虚幻引擎的动画渲染队列（Movie Render Queue）允许你将过场动画输出为图像序列。下述页面介绍了如何使用此工具。

%animating-characters-and-objects/Sequencer/movie-render-pipeline:topic%

[

![从影片渲染队列过渡到影片渲染图表](images/static/document_list/empty_thumbnail.svg)

从影片渲染队列过渡到影片渲染图表

了解虚幻引擎的影片渲染图表功能。





](/documentation/zh-cn/unreal-engine/transitioning-to-the-movie-render-graph-from-movie-render-queue-in-unreal-engine)[

![在影片渲染图表中进行渲染编程](images/static/document_list/empty_thumbnail.svg)

在影片渲染图表中进行渲染编程

影片渲染图表脚本编写和概念讨论。





](/documentation/zh-cn/unreal-engine/programming-a-render-in-mrg-in-unreal-engine)[

![回调脚本](images/static/document_list/empty_thumbnail.svg)

回调脚本

介绍向影片渲染图表添加回调的新方法。





](/documentation/zh-cn/unreal-engine/movie-render-graph-callback-scripts-in-unreal-engine)[

![渲染通道](images/static/document_list/empty_thumbnail.svg)

渲染通道

了解电影渲染队列中的不同渲染通道层。





](/documentation/zh-cn/unreal-engine/cinematic-render-passes-in-unreal-engine)[

![静止图像渲染](images/static/document_list/empty_thumbnail.svg)

静止图像渲染

使用静止图像渲染工具将多个摄像机角度快速渲染到MRQ中的单个图像。





](/documentation/zh-cn/unreal-engine/render-multiple-camera-angle-stills-in-unreal-engine)[

![使用命令行渲染操作MRQ](images/static/document_list/empty_thumbnail.svg)

使用命令行渲染操作MRQ

关于将命令行渲染用于电影渲染队列的概述。





](/documentation/zh-cn/unreal-engine/using-command-line-rendering-with-move-render-queue-in-unreal-engine)[

![运行时构建中的电影渲染队列](images/static/document_list/empty_thumbnail.svg)

运行时构建中的电影渲染队列

如何在分布式构建中使用电影渲染队列，以便在最终用户的设备上创建视频





](/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine)[

![渲染设置与格式](images/static/document_list/empty_thumbnail.svg)

渲染设置与格式

使用MRQ和MRG的渲染设置和格式来自定义输出格式和视觉效果





](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine)

## 流程指南和案例

下列指南将指导你如何创建特定的过场动画内容示例。

[

![使用动态变换创建关卡序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef3057c8-b683-42b5-8baa-2fd49bd7671e/topicimage.png)

使用动态变换创建关卡序列

使用变换原点Actor动态更改Sequencer内容的位置。





](/documentation/zh-cn/unreal-engine/creating-level-sequences-with-dynamic-transforms-in-unreal-engine)[

![混合Gameplay和Sequencer动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65e0d83b-5be0-40db-95e0-d185155447af/placeholder_topic.png)

混合Gameplay和Sequencer动画

使用动画蓝图和插槽将角色和摄像机动画从Sequencer无缝混合到Gameplay。





](/documentation/zh-cn/unreal-engine/blend-gameplay-animation-to-cinematic-animation-in-unreal-engine)[

![切换Sequencer中的Actor材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d7ae5c4-675f-40bd-8518-f7eca39808f3/placeholder_topic.png)

切换Sequencer中的Actor材质

变更序列中Actor材质的方式。





](/documentation/zh-cn/unreal-engine/change-material-in-unreal-engine-cinematic-movie)[

![在Sequencer中引用玩家](images/static/document_list/empty_thumbnail.svg)

在Sequencer中引用玩家

通过使用代理替代项，然后在运行时更改绑定，在Sequencer中引用玩家。





](/documentation/zh-cn/unreal-engine/how-to-reference-the-player-in-unreal-engine-cinematics)[

![渲染过场动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27a8255c-3280-43e0-bb03-40886cc50cbd/placeholder_topic.png)

渲染过场动画

展示如何将过场动画序列渲染成视频文件并保存在电脑上。





](/documentation/zh-cn/unreal-engine/rendering-out-cinematic-movies-in-unreal-engine)[

![从多个摄像机角度渲染](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41642428-6808-4284-8385-f6f03e203206/topicimage.png)

从多个摄像机角度渲染

学习如何不创建额外的镜头或镜头试拍即可在同一序列内从多台过场动画摄像机渲染。





](/documentation/zh-cn/unreal-engine/rendering-from-multiple-camera-angles-in-unreal-engine)[

![通过Sequencer调用事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a068bf93-0084-49c2-a35a-44e2fb1a3c30/placeholder_topic.png)

通过Sequencer调用事件

关于Sequencer的事件轨迹在蓝图中触发事件的方式的范例。





](/documentation/zh-cn/unreal-engine/fire-blueprint-events-during-cinematics-in-unreal-engine)[

![从Sequencer触发关卡蓝图事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ced534cc-6876-4436-9c36-6bcc141d15e2/topicimage.png)

从Sequencer触发关卡蓝图事件

使用蓝图接口可将Sequencer的事件轨道传递到关卡蓝图





](/documentation/zh-cn/unreal-engine/trigger-level-blueprint-events-from-sequencer-in-unreal-engine)[

![使用镜头试拍录制器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bdeeb91-7fd8-4a0b-b840-866a9cbbac9e/placeholder_topic.png)

使用镜头试拍录制器

使用镜头试拍录制器和动作捕捉录制序列。





](/documentation/zh-cn/unreal-engine/record-gameplay-in-unreal-engine)[

![使用Sequencer创建镜头切换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89cc3e41-519e-4f1c-940d-35aafabb016c/placeholder_topic.png)

使用Sequencer创建镜头切换

了解如何在Sequencer中创建镜头切换。





](/documentation/zh-cn/unreal-engine/creating-camera-cuts-using-sequencer-in-unreal-engine)[

![用Sequencer在蓝图中重新绑定Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0b609ea-2420-4ee7-b374-364d5021d053/placeholder_topic.png)

用Sequencer在蓝图中重新绑定Actor

此例说明如何在运行时将序列应用到动态对象（此对象与序列中原始拥有的对象不同）。





](/documentation/zh-cn/unreal-engine/change-cinematic-track-bindings-in-unreal-engine)[

![应用烧入内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72258010-06c9-48da-988d-2942fc309ccc/placeholder_topic.png)

应用烧入内容

说明如何将覆层从 UMG 应用到 Sequencer 渲染影片。





](/documentation/zh-cn/unreal-engine/applying-burn-ins-to-your-movie-in-unreal-engine)[

![使用Sequencer控制动画实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6222fcb6-3fdd-466f-9883-32a4d2c960ab/placeholder_topic.png)

使用Sequencer控制动画实例

展示如何通过可占据项为动画实例上的变量设置动画





](/documentation/zh-cn/unreal-engine/control-animation-blueprint-parameters-from-sequencer-in-unreal-engine)[

![导入和导出编辑决策表（EDL）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ebf15b8e-70ee-4095-8425-d8056a280316/placeholder_topic.png)

导入和导出编辑决策表（EDL）

演示如何导入和导出EDL以用于外部视频编辑软件应用程序。





](/documentation/zh-cn/unreal-engine/import-and-export-edl-in-unreal-engine)[

![在Gameplay中触发序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d1f89a0-0c83-4e0f-9111-46b39f095e5e/placeholder_topic.png)

在Gameplay中触发序列

说明如何在游戏事件中触发序列。





](/documentation/zh-cn/unreal-engine/play-cinematics-from-blueprints-in-unreal-engine)[

![保留或存储通过 Sequencer 进行的修改](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d6d4b42-93b6-4eb4-827c-fd436d53ca33/whenfinishedtopicimage.png)

保留或存储通过 Sequencer 进行的修改

说明如何保存通过 Sequencer 进行的修改，以及如何将修改复原回初始状态。





](/documentation/zh-cn/unreal-engine/what-happens-when-my-cinematic-ends-in-unreal-engine)[

![通过Sequencer混合动画蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df82c4d6-662f-4d67-b442-ec3d7dc449cb/placeholder_topic.png)

通过Sequencer混合动画蓝图

说明如何从动画蓝图获取姿势，并将它与关卡序列中定义的动画混合起来。





](/documentation/zh-cn/unreal-engine/blending-animation-blueprints-with-sequencer-in-unreal-engine)

## 实用技巧和流程快捷键

本文介绍了一些实用技巧、快捷键和其他高效工作技巧。

[](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine)

[![过场动画快捷方式和提示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/991f3357-92b6-435e-93c7-90730cf9fc34/topicimage.png)](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine)

[过场动画快捷方式和提示](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine)

[过场动画工作流程的提示、技巧和快捷方式。](/documentation/zh-cn/unreal-engine/cinematic-workflow-tips-for-sequencer-in-unreal-engine)

[](/documentation/zh-cn/unreal-engine/sequencer-hotkeys-in-unreal-engine)

[![Sequencer热键](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b48dec8c-9b17-4c16-887e-8f560e9d6977/topicimage.png)](/documentation/zh-cn/unreal-engine/sequencer-hotkeys-in-unreal-engine)

[Sequencer热键](/documentation/zh-cn/unreal-engine/sequencer-hotkeys-in-unreal-engine)

[介绍Sequencer中的主要热键。](/documentation/zh-cn/unreal-engine/sequencer-hotkeys-in-unreal-engine)

## 过场动画示例

你还可以浏览和下载一些现有项目，了解它们是如何用Sequencer制作的。

[

![汽车配置器示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63c673c3-2d54-4e1b-9e69-7f796b9680b5/topic-image.png)

汽车配置器示例

介绍如何上手使用汽车配置器示例项目，如何使用影片渲染队列（Movie Render Queue）渲染商业级宣传片，以及如何用变体管理器（变体管理器）进行编辑。





](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine)[

![Meerkat演示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a845297-30aa-4ce3-affe-eac2dcdd2ab7/meerkat-hero.png)

Meerkat演示

如何设置Meerkat演示，使用影片渲染队列对其进行渲染，以及探索其动画和优化功能





](/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine)[

![Slay](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/526a30fa-126b-47d4-9814-ef43ae056bb2/topicimage.png)

Slay

通过借鉴Slay中的过场动画技巧，学会在虚幻引擎中实现你自己的虚拟制片工作流。





](/documentation/zh-cn/unreal-engine/slay-sample-project-for-unreal-engine)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [开始](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine#%E5%BC%80%E5%A7%8B)
-   [Sequencer编辑器](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine#sequencer%E7%BC%96%E8%BE%91%E5%99%A8)
-   [摄像机](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA)
-   [渲染](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine#%E6%B8%B2%E6%9F%93)
-   [流程指南和案例](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine#%E6%B5%81%E7%A8%8B%E6%8C%87%E5%8D%97%E5%92%8C%E6%A1%88%E4%BE%8B)
-   [实用技巧和流程快捷键](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine#%E5%AE%9E%E7%94%A8%E6%8A%80%E5%B7%A7%E5%92%8C%E6%B5%81%E7%A8%8B%E5%BF%AB%E6%8D%B7%E9%94%AE)
-   [过场动画示例](/documentation/zh-cn/unreal-engine/cinematics-and-movie-making-in-unreal-engine#%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E7%A4%BA%E4%BE%8B)