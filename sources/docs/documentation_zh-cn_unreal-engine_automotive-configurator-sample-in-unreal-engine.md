# 虚幻引擎中的汽车配置器示例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:48:28.266Z

---

目录

![汽车配置器示例](https://dev.epicgames.com/community/api/documentation/image/c150f7a4-f724-49a0-827b-248290f62b51?resizing_type=fill&width=1920&height=335)

如今，越来越多的车企开始转用实时解决方案——如虚幻引擎（UE）——来推动它们的可视化商业项目。汽车配置器示例正是这样一个为汽车行业3D可视化美术师量身定做的案例，蕴含了Epic Games在汽车配置器的创建上所积聚的各种心得实践。

汽车配置器示例演示了以下功能：

-   [变体管理器](/documentation/zh-cn/unreal-engine/variant-manager-template-overview)
-   [Lumen](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine)
-   [路径追踪](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)
-   [体积云](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)
-   [Chaos布料解算器](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine)
-   [控制绑定](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)
-   [Sequencer](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)
-   [影片渲染队列](/documentation/404)

## 如何使用汽车配置器

### 下载示例

要使用汽车配置器示例创建项目，请按以下步骤操作：

1.  通过 **Fab** 访问[汽车配置器](https://fab.com/s/f54cb8fd6f65)，点击 **添加到我的库（Add to My Library）**，让项目文件出现在 **Epic Games启动程序** 中。
    1.  或者，你也可以在UE的Fab插件中搜索该示例项目。
2.  在 **Epic Games启动程序** 中，找到 **虚幻引擎 > 库 > Fab库** 以访问项目。
    
    只有在你安装了兼容的引擎版本时，示例项目才会出现在 **Fab库** 中。
    
3.  点击 **创建项目（Create Project）** 并按照屏幕上的提示下载示例并启动新项目。
    
4.  从Fab下载[汽车材质](https://fab.com/s/da380b9a6082)和[汽车盐滩](https://fab.com/s/db62e7a8704a)资产。

关于访问示例内容及虚幻引擎的Fab插件，详见[示例与教程](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)。

项目需要用到以下插件（默认启用）：

-   **影片渲染队列（Movie Render Queue）**
-   **颜色校正区域（Color Correct Regions）**
-   **控制绑定（Control Rig）**
-   **变体管理器（Variant Manager）**

可能需要你重启编辑器才能生效。

### 用户界面导航

汽车配置器是在[产品配置器](/documentation/zh-cn/unreal-engine/product-configurator-template-in-unreal-engine)模板的基础上打造的，并且用到了[变体管理器](/documentation/zh-cn/unreal-engine/variant-manager-template-overview)。你可以从各种已有的静态网格体配置（即 **变体**）中选出你想要的网格体，然后定制出一辆奥迪A5。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/185f3b21-924c-44dd-84be-e383e09cf15e/variant-manager-interface.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/185f3b21-924c-44dd-84be-e383e09cf15e/variant-manager-interface.png)

你可以使用屏幕底部的界面按钮来控制配置器。

**数字**

**介绍**

**1**

配置器模式

**2**

商业展台模式

**3**

汽车涂层颜色

**4**

车轮风格

**5**

内饰颜色

**6**

皮革颜色

**7**

座椅面料风格

**8**

开关路径追踪

**9**

截图

**10**

静音/取消静音

**11**

摄像机视角

汽车配置器还包含一些由蓝色闪烁圆圈表示的聚焦点。这些聚焦点的动画效果由虚幻引擎的基于蓝图的动画控制系统——[控制绑定](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)——进行制作。

-   **打开/关闭车门（Open/Close Doors）**：打开和关闭驾驶员/乘客侧的车门。
-   **打开/关闭敞篷软顶（Open/Close Convertible Soft Top）**：车内视角下，通过点击位于后视镜旁的车顶控制开关，打开和关闭敞篷车顶。
-   **打开/关闭后备箱（Open/Close Trunk）**：打开和关闭后备箱盖。
-   **喇叭（Horn）**：按下喇叭。
-   **启动/停止汽车引擎（Start/Stop the Engine）**：点击发动机启动按钮将启动或停止发动机。启动引擎后，仪表盘和奥迪虚拟驾驶舱（Audi Virtual Cockpit）将会亮起，同时前灯和尾灯也会亮起。

### 渲染商业级画面

点击"配置器"中的 **播放** 按钮，把你的定制汽车切换进商业模式。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d06421a7-55b0-4f52-89ba-64dd52f1498a/commercial-ui.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d06421a7-55b0-4f52-89ba-64dd52f1498a/commercial-ui.png)

在商业展台模式下，你的汽车将成为媒体聚光灯下的闪耀明星。在此模式下，你的汽车会像汽车广告中那般被从多个角度拍摄。可以用以下按钮控制拍摄效果。

**数字**

**介绍**

**1**

结束

**2**

播放

**3**

暂停

**4**

渲染视频

在[Sequencer](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)的支持下，摄像机会在盐湖滩上快速疾驰，同时凸显车轮和内饰的效果。商业模式在处理实时光照和阴影时用到了[光线追踪](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine)。得益于[影片渲染队列](/documentation/404)，你可以将动画视频保存到电脑上。

## 变体管理器

汽车配置器建立在产品配置器模板的基础上，并使用变体管理器来保存用于定制汽车的各种资产配置。

  ![移动滑条来查看各类内饰变体（Trim variants）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/175fdcec-355e-4102-b3c7-36d2923f073f/variant-manager-walnut.png "Walnut trim") ![移动滑条来查看各类内饰变体（Trim variants）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcc4f5ba-3143-4c64-a3e8-0f440aa52d04/variant-manager-grey.png "Gray trim") ![移动滑条来查看各类内饰变体（Trim variants）](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5018d2ba-cbfc-4061-937e-987d34c6d1eb/variant-manager-carbon.png "Carbon fiber trim")

**移动滑条来查看各类内饰变体（Trim variants）**

每个配置选项都存储在一个名为 **变体（Variant）** 的条目中。每个变体都指向Actor上的一个属性；当变体激活后，属性就会相应改变。变体被排列成变体集，而数据则在经过 **BP\_Configurator** 蓝图的处理后用于填充用户界面选项。在上图中可以看到，当你更改内饰选项后，变体管理器会将该效果用于汽车Actor上的不同静态网格体组件上。

关于变体管理器的更多信息，请参阅我们的[变体管理器](/documentation/zh-cn/unreal-engine/variant-manager-template-overview)文档。

## Lumen全局光照和反射

虚幻引擎使用 [Lumen全局光照和反射](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine) 系统来创建动态的全局光照和阴影。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2663c015-7d9c-433d-8f3c-9ba30fa010b6/lumen_skylight.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2663c015-7d9c-433d-8f3c-9ba30fa010b6/lumen_skylight.png)

汽车配置器示例使用Lumen来提供扩散的互相反射以及间接的高光反射，以此准确表示轮毂和车身的周边环境，从而最大化地利用汽车材质包中的 Clear Coat属性。

要了解更多在关卡中使用Lumen的相关信息，参考 [Lumen](/documentation/zh-cn/unreal-engine/lumen-global-illumination-and-reflections-in-unreal-engine) 文档。

## 路径追踪器

[路径追踪器](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine) 是虚幻引擎的渐进式的硬件加速渲染模式。它用于生成物理准确的全局光照和材质的反射与折射，无需额外设置就能够让路径追踪器为你提供照片般真实的渲染。

![采用Lumen光照的奥迪A5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/011f9d59-4774-4230-bf63-23718a18c751/lumen-sample.png)

![采用路径追踪器光照的奥迪A5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aea6c9d0-7e54-441a-97e0-a43bbe160470/path-tracer-sample.png)

采用Lumen光照的奥迪A5

采用路径追踪器光照的奥迪A5

路径追踪器完全整合了[Sequencer](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)和[影视渲染队列](/documentation/404)，使其能够胜任高质量影视渲染输出。

在汽车配置器示例中，你可以在界面中选择是否启用路径追踪功能，以便输出拥有照片级真实度的屏幕捕捉画面，或者用作商业渲染画面。

有关路径追踪器的更多信息，请参见[路径追踪器](/documentation/zh-cn/unreal-engine/path-tracer-in-unreal-engine)文档。

## 体积云

示例中的[体积云](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)使用了基于物理和材质的云渲染系统，以便创建岩滩上的云层。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1c33107-b2fe-4d2a-8f1b-e787b19d004b/car-configurator-sample.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1c33107-b2fe-4d2a-8f1b-e787b19d004b/car-configurator-sample.png)

Epic Games团队之所以采用体积云，除了能为盐滩增添美感外，还因为这能让反弹的光线反射到汽车漆面上。体积云组件使用了默认的云材质的材质实例来实现这些效果。

有关体积云系统的更多信息，请参阅我们的[体积云](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)文档。

## Chaos布料解算器

汽车配置器示例使用了 [Chaos布料解算器](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine) 来模拟敞篷车布料车顶的物理交互。

![奥迪A5软质车顶布料模拟](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61b99575-8880-498c-9a5f-bfd880c649b1/cloth-sim.gif)

通过直接在引擎中使用布料绘制，Epic Games团队得以指定各种属性，比如摩擦、限制、阻力以及僵硬度，以此来模拟奥迪A5的帆布软质车顶。

要了解更多Chaos布料解算器和引擎内布料工具的相关信息，参考 [布料工具](/documentation/zh-cn/unreal-engine/clothing-tool-in-unreal-engine) 文档。

## 控制绑定

[控制绑定](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)系统是一个基于脚本的节点化绑定系统，相当于在引擎中直接提供了绑定和动画工具。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce103f76-8592-4a29-bb08-8a761b837dc9/control-rig-top.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce103f76-8592-4a29-bb08-8a761b837dc9/control-rig-top.png)

在汽车配置器中，Epic Games团队在两个方面上用到了控制绑定。第一个是为汽车创建了一个扩展性很强的汽车骨架网格体，并为车轮、车门和后备箱创建了动画。第二个是为敞篷车顶创建动画。

在奥迪A5的车身骨架中，每个可移动元素都配有多个枢轴点位置。通过这种方法，汽车的主几何体不需要绑定到汽车上，骨架网格可以快速导入虚幻中。导入后，网格体会添加到蓝图中，然后该蓝图会将其余汽车组件添加到枢轴点位置上，然后将在运行时将骨架绑定到控制绑定上。这样就能让枢轴点位置的更新变得更加容易，同时避免回到DCC应用中重新修改。

考虑到车篷的复杂性，布料材质的车顶敞篷是作为单独部件创建的，拥有自己的骨架和控制绑定。状态机会跟踪该顶篷的打开状态，确保顶篷在配置器应用中被选中时运行正确的过渡动画。

关于使用控制绑定在引擎内制作动画的更多信息，请参阅[控制绑定](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)文档。

## Sequencer

作为商业展台模式的基石，[Sequencer](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)是一个强大的关键帧动画系统，允许用户创建游戏动画。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54568128-4b29-48a8-923b-6f4ffe6b5d37/commercial-view.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54568128-4b29-48a8-923b-6f4ffe6b5d37/commercial-view.png)

在商业展台模式中，我们创建了多个包含摄像机动画的关卡序列，展示了汽车的各种可配置功能。团队随后使用 **影片渲染队列** 来渲染、保存关卡序列，然后使用非线性编辑程序进行组装。之后，编辑好的序列作为一个主序列被导入虚幻引擎，继续添加音频，并对摄像机、动画和整体时长进行改进。序列位于 **CarConfigurator/Commercial/Sequences** 目录中。

有关在项目中使用Sequencer的更多信息，请参见我们的[Sequencer](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)文档。

## 影片渲染队列

[影片渲染队列](/documentation/404)是引擎用于输出最终商业级渲染画面的功能，可以导出高质量媒体文件。结合实时光线追踪后，最终渲染画面可以进一步优化抗锯齿、径向运动模糊，并减少光线追踪中的噪点。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13766464-8f96-4009-9bc4-5032fb602234/movie-render-queue.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13766464-8f96-4009-9bc4-5032fb602234/movie-render-queue.png)

Epic Games使用蓝图在运行时启用影片渲染队列。这样就可以直接从配置器中渲染和保存汽车的商业展台序列动画。

关于使用影片渲染队列功能的更多信息，请参见我们的[Movie Render Queue](/documentation/404)文档。

## 在配置器中添加美术资产

如需向汽车配置器添加新的美术资产，你可以直接向关卡变体集添加新的变体。无论是材质还是静态网格体资产，过程都是差不多的。下面的例子介绍了如何向配置器添加一个新的车漆颜色。

本示例中的奥迪A5使用到了[汽车材质包](https://www.fab.com/listings/5dd132fe-ee32-4e8c-9cd3-7496547dfb29)中的车漆、皮革和内饰。如需在界面中添加额外的颜色，请按照以下步骤进行操作：

1.  创建一个自定义文件夹，用于保存你的新材质和它可能需要的纹理取样。操作方法是：右键点击 **CarConfigurator** 文件夹，选择 **新建目录（New Folder）**。将目录命名为 **Custom**。
2.  如果你要添加的颜色在示例中没有，你可以选择用[汽车材质包](/documentation/zh-cn/unreal-engine/automotive-materials-pack-in-unreal-engine)中的工具来创建车漆，或者自己导入并设置材质。在本示例中，你需要复制一个车漆材质，然后编辑它。有关导入纹理和创建新材质的更多信息，请参阅[材质指南](/documentation/zh-cn/unreal-engine/unreal-engine-materials-tutorials)文档。
3.  接下来，打开 **CarConfigurator/Shared** 文件夹，双击 **CarVariants** 关卡变体集，在变体管理器中打开它。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8eeb0357-d299-45cd-8172-92567982f7ff/level-variant.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8eeb0357-d299-45cd-8172-92567982f7ff/level-variant.png)
    
4.  为了确保你的新建颜色能添加到所有所需的静态网格体上，你可以复制一个现有的变体。打开 **车漆、内饰（Paint, Trim）** 或 **皮革（Leather）** 变体集，右键点击列表中的最后一个变体。在菜单中选择 **复制（Duplicate）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95880cdc-3920-46b8-adba-f646ad4010de/variant-duplicate.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95880cdc-3920-46b8-adba-f646ad4010de/variant-duplicate.png)
    
5.  右键点击你的新变体，选择 **重命名**。创建一个符合该颜色的新名称。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e7a8158-0b24-4c6a-bf7a-9f241b36956b/variant-duplicate-rename.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e7a8158-0b24-4c6a-bf7a-9f241b36956b/variant-duplicate-rename.png)
    
6.  现在，点击 **属性（Properties）** 面板中的 **BP\_AudiA5**，显示该汽车的 **属性（Properties）** 和 **数值（Values）**。然后点击"数值"这一列中的每个值的下拉菜单，选择你的新颜色（**SM\_trunkDetails** 材质除外）。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6646bab-221d-49ea-a122-eb1e373756d6/variant-duplicate-color-change.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6646bab-221d-49ea-a122-eb1e373756d6/variant-duplicate-color-change.png)
    
    更改 **SM\_trunkDetails** 的材质就会更改汽车的拍照材质。
    
7.  最后，设置新变体的缩略图。办法是打开变体，将 **视口（Viewport）** 摄像机放置到能够最佳显示新选项的位置。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/238daf2f-1074-43a2-87aa-bc4050b25340/variant-duplicate-thumbnail.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/238daf2f-1074-43a2-87aa-bc4050b25340/variant-duplicate-thumbnail.png)
    
8.  然后在 **变体管理器（Variant Manager）** 中右键点击变体，选择 **从视口设置（Set from viewport）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/356d6a74-1d58-4db6-9434-30fede65cef5/variant-duplicate-thumbnail-viewport.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/356d6a74-1d58-4db6-9434-30fede65cef5/variant-duplicate-thumbnail-viewport.png)
    
9.  点击编辑器中的 **播放（Play）** 按钮来测试示例。你的新变体应该会出现在用户界面中。

-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [ray tracing](https://dev.epicgames.com/community/search?query=ray%20tracing)
-   [movie render queue](https://dev.epicgames.com/community/search?query=movie%20render%20queue)
-   [variant manager](https://dev.epicgames.com/community/search?query=variant%20manager)
-   [volumetric clouds](https://dev.epicgames.com/community/search?query=volumetric%20clouds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [如何使用汽车配置器](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E6%B1%BD%E8%BD%A6%E9%85%8D%E7%BD%AE%E5%99%A8)
-   [下载示例](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#%E4%B8%8B%E8%BD%BD%E7%A4%BA%E4%BE%8B)
-   [用户界面导航](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2%E5%AF%BC%E8%88%AA)
-   [渲染商业级画面](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#%E6%B8%B2%E6%9F%93%E5%95%86%E4%B8%9A%E7%BA%A7%E7%94%BB%E9%9D%A2)
-   [变体管理器](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#%E5%8F%98%E4%BD%93%E7%AE%A1%E7%90%86%E5%99%A8)
-   [Lumen全局光照和反射](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#lumen%E5%85%A8%E5%B1%80%E5%85%89%E7%85%A7%E5%92%8C%E5%8F%8D%E5%B0%84)
-   [路径追踪器](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8)
-   [体积云](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#%E4%BD%93%E7%A7%AF%E4%BA%91)
-   [Chaos布料解算器](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#chaos%E5%B8%83%E6%96%99%E8%A7%A3%E7%AE%97%E5%99%A8)
-   [控制绑定](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#%E6%8E%A7%E5%88%B6%E7%BB%91%E5%AE%9A)
-   [Sequencer](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#sequencer)
-   [影片渲染队列](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E9%98%9F%E5%88%97)
-   [在配置器中添加美术资产](/documentation/zh-cn/unreal-engine/automotive-configurator-sample-in-unreal-engine#%E5%9C%A8%E9%85%8D%E7%BD%AE%E5%99%A8%E4%B8%AD%E6%B7%BB%E5%8A%A0%E7%BE%8E%E6%9C%AF%E8%B5%84%E4%BA%A7)

相关文档

[

硬件光线追踪和路径追踪功能

![硬件光线追踪和路径追踪功能](https://dev.epicgames.com/community/api/documentation/image/26c2165b-146d-4c3e-8657-c3e0b3a546e9?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/ray-tracing-and-path-tracing-features-in-unreal-engine)

[

体积云组件

![体积云组件](https://dev.epicgames.com/community/api/documentation/image/ea75acb8-2a02-4931-bbf2-d673ce364f61?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)