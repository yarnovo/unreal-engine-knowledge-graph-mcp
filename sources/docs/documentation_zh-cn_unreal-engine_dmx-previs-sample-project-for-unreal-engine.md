# 虚幻引擎中的DMX Previs示例项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:48:33.716Z

---

目录

![DMX Previs](https://dev.epicgames.com/community/api/documentation/image/87b356ef-5a25-4d92-b5df-9946a83e6e24?resizing_type=fill&width=1920&height=335)

DMX视效预览（DMX Previs）示例是一个完全动画化的数字灯光秀示例，采用了虚幻引擎的[DMX](/documentation/zh-cn/unreal-engine/dmx-overview)插件。此示例由我们与[Moment Factory](https://momentfactory.com/home)合作创建，用于展示现场活动的视效预览效果，同时确保在数字场景中尽可能重现现实中的相关技术。为了利用虚幻引擎的渲染能力，并展示新开发的代理灯具系统，该示例采用了一个照亮整个开放空间的复杂照明装置。

这段视频中的灯光会出现反复闪烁，可能引起不适或导致光敏性癫痫患者的癫痫发作。建议观众谨慎观看。

研究和修改此示例将帮助你了解如何实现以下操作：

-   使用DMX插件Sequencer集成，记录并在外部照明台上播放已编程的整个现场活动。
-   使用可扩展灯具系统为真实硬件设备创建你自己的支持DMX的虚拟灯具。
-   为实时视效预览和高质量媒体导出定制和调整灯具的渲染函数。

此项目会占用大量CPU性能，因为需要在Sequencer中播放DMX轨道，同时也会占用大量GPU性能，因为需要渲染高品质体积光束效果。有关此项目的硬件需求，请参阅"灯具和硬件"小节。

## 入门指南

使用DMX Previs示例项目的步骤如下：

1.  通过 **Fab** 访问[DMX Previs示例](https://fab.com/s/14fbd7034e1b)，点击 **添加到我的库（Add to My Library）**，让项目文件出现在 **Epic Games启动程序** 中。
    1.  或者，你也可以在UE的Fab插件中搜索该示例项目。
2.  在 **Epic Games启动程序** 中，找到 **虚幻引擎 > 库 > Fab库** 以访问项目。
    
    只有在你安装了兼容的引擎版本时，示例项目才会出现在 **Fab库** 中。
    
3.  点击 **创建项目（Create Project）** 并按照屏幕上的提示下载示例并启动新项目。

关于访问示例内容及虚幻引擎的Fab插件，详见[示例与教程](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)。

1.  按下 **播放（Play）** 查看视效预览序列。
    
    ![播放视效预览序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4656e40c-1194-46bb-b2a3-e4a273ab7d6c/image_3.png)

要以最佳性能查看灯光秀，使用 **发布（Shipping）** 选项构建项目。

按以下步骤将项目的构建配置设置为 **发布（Shipping）**：

1.  在编辑器的主菜单中，选择 **文件（File）> 打包项目（Package Project）> 构建配置（Build Configuration）**，然后选择 **发布（Shipping）**。
    
2.  选择 **文件（File）> 打包项目（Package Project）> Windows**，以使用 **发布（Shipping）** 配置将项目打包。
    

![虚幻编辑器菜单中的发布构建配置选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d353d7bd-e73d-439f-9a3a-6b882e2d2dac/image_4.png)

## 从多个角度查看灯光秀

打开项目并按 **在编辑器中运行（Play in the Editor）** 后，序列从影视级摄像机视图开始播放。

要从虚拟观众席的其他角度观看灯光秀，可以用项目的[关卡蓝图](/documentation/zh-cn/unreal-engine/level-blueprint-in-unreal-engine)中定义的播放功能按钮切换摄像机视图，或者禁用 **Sequencer** 中的影视级摄像机。两种方法详见下文。

![观看灯光秀](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/090e9be5-5824-4e5a-b526-3b949469479d/image_5.png)

图像由Moment Factory提供。

### 显示播放功能按钮

启动虚幻会话后，可以使用以下播放功能按钮。

键

说明

**F9**

显示FPS计数器（独立版和发行版）。

**空格键**

暂停或恢复序列和DMX播放。

**T**

在过场动画与自由摄像机之间切换。在自由摄像机模式下，可以移动摄像机来近距离观察灯具，并从其他角度观看灯光秀。

**V**

在预定义的摄像机视图之间循环。

**R**

重新启动序列和DMX播放。

**Escape**

退出会话。

### 禁用过场动画摄像机

可以使用 **T** 切换键在自由摄像机与影视级摄像机之间切换。按 **V** 在预定义的摄像机位置之间切换。按以下步骤在灯光秀期间完全关闭影视级摄像机。

1.  在 **内容浏览器** 中，点击 **内容（Content）> 序列（Sequences）**，在其中打开 **DMXPrevis\_Animations**。
    
    ![内容浏览器中的DMX previs动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/068798fe-7078-48e7-9075-6e08eef70907/image_6.png)
2.  在 **Sequencer** 窗口中，右键点击 **摄像机切换（Camera Cuts）** 轨道并从选项中选择 **静音（Mute）**。
    
    ![Sequencer窗口摄像机切换轨道静音选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6d81720-5154-4b4c-80ad-2a9799f4d02b/image_7.png)
3.  按 **播放（Play）**。你可以自由移动摄像机，从不同角度观看灯光秀。
    

## 实时修改灯光秀

当DMX轨道在Sequencer中播放时，如果能在观看的同时修改其效果，那就再好不过了。本节就将介绍如何更改某些灯具的外观和效果。

项目包含的资产比本节中所述的更多。探索项目中所有的灯具；每种类型都有自己的蓝图和功能。

### 更改点光源距离

按以下步骤修改某些光源的光源距离值。减小此值可以帮助提高播放期间的性能；增大此值可以产生更多的体积光束效果。

1.  在 **世界大纲视图（World Outliner）** 中，在搜索栏中键入 **Spot**，并选择所有筛选出来的资产。
    
    ![按spot一词筛选资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10738a92-977b-4fe2-bb9b-3ce5241a9702/image_8.png)
2.  在 **细节（Details）** 面板中，将 **光源距离最大值（Light Distance Max）** 属性从 **5000.0** 更改为较小的值以改善性能，或更改为较大的值，以提高体积效应。
    
    ![光源距离最大值5000](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23dfd159-78cd-4dea-8739-a34a628b98ae/image_9.png)
    
    ![光源距离最大值1000](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5fc50f74-b506-4cf6-b2aa-72be6846a8d3/image_10.png)
    
    光源距离最大值5000
    
    光源距离最大值1000
    

### 调整光束质量

所有使用的灯具都是专为该项目定制的，并具有自适应质量逻辑，以实时平衡速度和质量。自适应质量逻辑在 **内容（Content）> DMX > 灯具材质（FixtureMaterials）** 中的 **M\_Beam\_Inhibitive\_Master** 材质中定义。

![内容浏览器中的灯具材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/856c0687-4782-4ace-be9c-acd3c35885d7/image_11.png)

此材质将根据实时DMX变焦角度动态调整体积光束着色器示例数。

-   要保持高性能并最大程度降低对视觉效果的影响，光束越宽，示例数越少。
-   要提高光束锐度，光束越窄，示例数越多。

可在 **材质编辑器（Material Editor）** 中调整 **M\_Beam\_inhibitive\_Master** 材质的质量设置。这些设置位于 **参数默认值（Parameter Defaults）** 面板中。

![材质参数默认值面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b93f620-6ce9-4cb0-b22b-8aa37b72d1e8/image_12.png)

-   **低质量级别（Low Quality Level）：** 定义预定义示例数的最低可能倍数。
-   **最高质量级别（Low Quality Level）：** 定义预定义示例数的最高可能倍数。
-   **使用MRQ重载（Use MRQ Override）：**对所有灯具材质和材质实例应用特定乘数，而不考虑设置的最小和最大值。在导出项目的高质量视频或图像序列时，此属性很有用。
-   **基于变焦的强度（Zoom Based Intensity）：**启用后，当变焦较宽时，光源函数会降低强度，但当变焦较窄时，会更接近预期的亮度。这模拟了真实光源的行为，当光束较宽时，任何给定表面上的亮度都较低。

![低质量级别0.3最高质量级别1.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccae0b6c-19d7-4ae4-aaaf-e8493d2021b4/image_13.png)

![低质量级别0.3最高质量级别5.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35ae3d16-2d34-41f8-8883-70c54a93707a/image_14.png)

低质量级别0.3最高质量级别1.0

低质量级别0.3最高质量级别5.0

左图中，最高质量级别（Max Quality Level） 设为 1，这会产生更具颗粒感的光束。右图中，最高质量级别（Max Quality Level） 设为 5，光束看上去更锐利。

**质量级别（Quality Levels）** 设为大于 **1** 的值意味着使用[影片渲染队列](/documentation/404)进行离线渲染。对于本项目，**质量级别（Quality Level）** 的 **低质量级别和最高质量级别** 通常都设为 **2**，以生成画面。

### 更改T形台单元数

按以下步骤更改"T形台"中使用的DMX灯具矩阵的单元数。

1.  在项目的 **内容浏览器** 中，双击 **DMXLib\_v4** 资产打开 **DMX库编辑器（DMX Library Editor）**。
    
    ![内容浏览器中的DMX库资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/efc31b88-cffe-480c-86be-5bb9ad6fd0c1/image_15.png)
2.  在 **灯具类型（Fixture Types）** 选项卡中，选择 **矩阵/像素条（Matrix/Pixel Bar）** 下的 **T形台地带（CatwalkStrip）**。本例将修改 **模式属性（Mode Properties）**。
    
    ![T形台地带模式属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5ba41b2-2a9e-4cb1-aaa5-6e6d63c38919/image_16.png)
3.  在 **模式属性（Mode Properties）** 面板中，将 **Y单元（Y Cells）** 属性值从 **5** 更改为 **20**。
    
    ![更改Y单元属性的值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afd72ba8-d073-48c2-9bef-7520e7350f5c/image_17.png)
4.  在 **世界大纲视图（World Outliner）** 中，选择所有 **T形台地带（CatwalkStrips）** 资产。
    
5.  在 **细节（Details）** 面板的 **DMX矩阵灯具（DMX Matrix Fixture）** 部分下，点击 **生成预览网格体（Generate Preview Mesh）**，以使用在DMX库中所做的更改更新视口中的网格体。
    
    ![细节面板DMX矩阵灯具部分生成预览网格体按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df621864-4ffb-4ef7-8d55-a2783f0ba521/image_18.png)
6.  在视口中，所有 **T形台地带（CatwalkStrips）** 现在都有更多单元。
    
    ![T形台5 Y单元](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f1da4bd-c654-4b2c-b5e0-0c2e3875b7b1/image_19.png)
    
    ![T形台20 Y单元](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2215ebe3-7164-47ce-91ce-31d4b31ad873/image_20.png)
    
    T形台5 Y单元
    
    T形台20 Y单元
    

## 使用影片渲染队列导出媒体

在典型的现场活动视效预览工作流中，设计人员和美术师会为了更快的迭代而采用较低质量级别。它可用于渲染高质量图像序列或Apple ProRes文件，以供审查。

本示例包括[影片渲染队列](/documentation/404)的两个预设值，用于生成高分辨率媒体。这些预设值位于 **内容（Content）> 过场动画（Cinematics）> 电影管线（MoviePipeline）> 预设值（Presets）** 中。两个预设值有不同的分辨率：

-   **UHD**：导出到Apple ProRes 422 HQ的超高清(3840x2160)的预设值。
-   **FHD**：导出到Apple ProRes 422 HQ的全高清(1920x1080)的预设值。

![影片渲染队列预设值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b210a683-d303-42fe-868a-5ca645a6346f/image_21.png)

按以下步骤使用影片渲染队列导出高质量媒体。

1.  在项目的 **世界大纲视图（World Outliner）** 中，选择所有点光源并将其 **光源距离最大值（Light Distance Max）** 属性设置为 **12,000**。
    
    ![点光源光源距离最大值12000](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97bbc6ca-ca45-4e37-bbb0-32db5dfb3a8f/image_22.png)
2.  在项目的 **内容浏览器**中，导航到 **DMX >灯具材质（FixtureMaterials）**。
    
3.  在材质编辑器中打开 **M\_Beam\_Inhibitive\_Master** 材质。
    
4.  在 **材质编辑器** 的 **参数默认值（Parameter Defaults）** 面板中进行以下操作：
    
    1.  将 **低质量级别** 设为 **2.0**。
        
    2.  将 **最高质量级别** 设为 **2.0**。
        
    
    ![质量级别设为2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa1d6f34-fbf4-4e6e-aef4-108f974d7e1d/image_23.png)
5.  关闭材质编辑器。
    
6.  在主编辑器中，选择 **窗口（Window）> 过场动画（Cinematics）> 影片渲染队列（Movie Render Queue）**，打开 **影片渲染队列（Movie Render Queue）** 窗口。
    
    ![打开影片渲染序列窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6d3472a-eb0a-40ff-b890-5b0452b8bde3/image_24.png)
7.  按 **添加渲染（Add Render）** 按钮，选择 **DMXPrevis\_Animations** 关卡序列。
    
    ![选择DMX previs动画关卡序列](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f588710a-52c0-483b-9c78-a7097ee3fe64/image_25.png)
8.  在 **设置（Settings）** 列下，点击下拉箭头并选择所需预设值，即UHD或FHD。
    
    ![在设置列中选择预设值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c9d2abe5-1b32-4b7f-93f0-b33d2c84560a/image_26.png)
9.  点击 **渲染（本地）（Render (Local)）** 以便在本地导出已渲染的帧。
    
    ![点击渲染本地](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a5d01df-5211-4453-a9d6-8153b2d86528/image_27.png)

可将 **M\_B\_Inhibitive\_Master** 中的 **MRQ重载（MRQ Override）** 参数设置为 **1.0**，以重载 **低质量级别** 和 **最高质量级别**。

## 现场活动视效预览项目文件结构

此示例项目包括各种资产，以便使用DMX重新创建观众席和完整的灯光秀。为了帮助你探索项目中的所有内容，请参阅下面所有文件夹的描述。

### 内容浏览器

![内容浏览器层级中的DMX子文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab7f9d89-be2a-4afc-b343-16a05b440956/image_28.png)

**内容** 文件夹包含以下子文件夹：

-   **资产（Assets）：**舞台和观众席的一般项目和关卡资产。
    
-   **音频（Audio）：**灯光秀的音轨。
    
-   **蓝图（Blueprints）：**[游戏模式](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine) 使用旁观者Pawn重载。
    
-   **影片（Cinematics）：**用于超高清（UHD）和全高清（FHD）离线渲染的\[影片渲染队列\]animating-characters-and-objects/Sequencer/movie-render-pipeline#影片渲染队列)设置。
    
-   **DMX：**所有DMX相关内容。
    
    -   **磁盘（Disks）：**特定项目的DMX灯具遮光板，可控制光源的形状和图案。给定的光源在整场灯光秀中可以有多个遮光板，并可以动画化。
        
    -   **效果表（EffectTables）：**定义项目中使用的支持DMX的光源类型的效果。
        
    -   **灯具材质（FixtureMaterials）：**特定项目的已优化DMX灯具材质。这是DMX插件附带的扩展内容。
        
    -   **灯具蓝图（FixturesBP）：**特定项目的照明灯具蓝图。这是DMX插件附带的扩展内容。
        
    -   **遮光板轮（GoboWheel）：**与 **Disks** 文件夹的内容相同，但作为单独的纹理。
        
    -   **插件（Plugins）：**实用的DMX工具和控件。
        
    -   **SpecialFXBP：**特定项目的火焰、激光和烟花灯具资产。它还包含舞台中央DMX受控的球体。
        
    -   **DMXLib\_v4：**项目核心[DMX库](/documentation/zh-cn/unreal-engine/create-a-dmx-library-and-add-fixture-patches-in-unreal-engine)，包含所有灯具定义、域和补丁。
        
-   **效果（Effects）：**
    
    -   **泛光（Bloom）：**特定项目的高质量复杂泛光 **纹理**，无条纹。
        
    -   **烟花（Fireworks）：**特定项目的烟花 **蓝图** 和[Niagara](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)粒子系统。
        
    -   **闪光（Flash）：**观众手机光源和 **Niagara** 粒子系统。
        
    -   **RockLevitation：** 漂浮岩石 **Niagara** 粒子系统。
        
    -   **水材质（WaterMaterials）：**项目的高质量水材质。
        
-   **地图（Maps）：**关卡的不同部分都包含在单独的地图中。
    
    -   **主要（Main）**：包含sequencer轨道、后期处理体积和音轨在内的永久性关卡。
        
    -   **DMXControlled**：此关卡包含所有DMX受控的元素、照明灯具和效果。
        
    -   **地形（Terrain）：**此关卡包含地形和岩层。
        
    -   **现场（Venue）：**此关卡包含现场和结构相关的Actor，例如舞台、观众和灯光架。
        
-   **MegaScans：Quixel MegaScan** 资产，用于地形和环境。
    
-   **影片（Movies）：**包含用于播放影片的[媒体框架](/documentation/zh-cn/unreal-engine/media-framework-in-unreal-engine)资产。
    
    -   **Clock\_LED**：包含用于对围绕T形台的时钟LED进行动画处理的图像序列。
        
    -   **窗帘（Drapes）**：包含窗帘视频投影的图像序列。
        
-   **MSPresets**：MegaScan预设值资产。
    
-   **Sequences**：包含[关卡序列](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)。
    
-   **灯光秀文件（Showfile）**：来自[grandMA2](https://www.malighting.com/downloads/products/grandma2/)照明控制台的灯光秀文件(`.zip`)。你可以解压缩该文件，并在控制台上使用。
    
-   **启动（Splash）**：项目加载到虚幻编辑器中时的启动图像。
    
-   **Tropical\_Jungle\_Pack**：用于环境的资产包。
    

### 世界大纲视图

探索 **世界大纲视图（World Outliner）** 中的所有资产，特别是以下项目和文件夹：

-   **摄像机（Cams）：**Sequencer过场动画和预定义的摄像机位置。
    
-   **DMX\_FX** 和 **DMX\_LX**：DMX受控的灯具和效果。
    
-   **DMXPrevis\_Animations：**驱动灯光秀、音轨和DMX轨道的关卡序列。
    

## 灯具和硬件

此示例旨在使用以下灯具和硬件。

### 灯具

灯具名称

灯具类型

数量

照明灯具

 

 

**观众台条形灯 - 无像素**

自定义LED

50

**观众台洗墙灯-LEDPar灯（Audience Wash LED Par）**

Elation SixPar 300

12

**T台条形灯 - 5像素**

自定义LED

20

**条形灯矩阵 - 5像素**

自定义LED

32

**景观洗墙灯-LEDPar灯（Scenic Wash LED Par）**

Elation SixPar 300

14

**SpotMH1**

Elation Proteus Maximus

64

**SpotMH2**

Robe Megapointe

94

**Strobe RGB**

Elation Protron 3K LED Strobe

122

**舞台条形灯 - 5像素**

自定义LED

24

**条形灯（Sun Strip） - 5像素**

自定义LED

90

**灯光架顶灯（Truss Toner）**

Elation SixPar 300

220

**WashMH1**

Ireos Space Canon

8

**WashMH2**

GLP X4

16

**死亡金属LEDPar灯（Vomitory LED Par）**

Elation SixPar 300

2

**照明灯具总数**

 

768

SFX灯具

 

 

**烟花**

N/A

8

**激光RGB**

N/A

6

**烟火发射器**

N/A

33

**SFX灯具总数**

 

47

### 光照控制台

硬件

数量

**grandMA2光源**

1

**MA照明NPU**

1

### DMX

规格

说明

**通道**

7368

**DMX域（DMX Universes）**

15

**协议**

Art-Net

**唯一提示（Unique Cues）**

144

**时间码同步**

MIDI

## 插件

以下插件提供此示例中所示的核心功能：

-   DMX引擎
-   DMX灯具
-   DMX像素映射
-   DMX协议
-   关卡序列编辑器
-   影片渲染队列

-   [dmx](https://dev.epicgames.com/community/search?query=dmx)
-   [live event](https://dev.epicgames.com/community/search?query=live%20event)
-   [previs](https://dev.epicgames.com/community/search?query=previs)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [从多个角度查看灯光秀](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E4%BB%8E%E5%A4%9A%E4%B8%AA%E8%A7%92%E5%BA%A6%E6%9F%A5%E7%9C%8B%E7%81%AF%E5%85%89%E7%A7%80)
-   [显示播放功能按钮](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E6%98%BE%E7%A4%BA%E6%92%AD%E6%94%BE%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)
-   [禁用过场动画摄像机](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E7%A6%81%E7%94%A8%E8%BF%87%E5%9C%BA%E5%8A%A8%E7%94%BB%E6%91%84%E5%83%8F%E6%9C%BA)
-   [实时修改灯光秀](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E5%AE%9E%E6%97%B6%E4%BF%AE%E6%94%B9%E7%81%AF%E5%85%89%E7%A7%80)
-   [更改点光源距离](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E6%9B%B4%E6%94%B9%E7%82%B9%E5%85%89%E6%BA%90%E8%B7%9D%E7%A6%BB)
-   [调整光束质量](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E8%B0%83%E6%95%B4%E5%85%89%E6%9D%9F%E8%B4%A8%E9%87%8F)
-   [更改T形台单元数](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E6%9B%B4%E6%94%B9t%E5%BD%A2%E5%8F%B0%E5%8D%95%E5%85%83%E6%95%B0)
-   [使用影片渲染队列导出媒体](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E4%BD%BF%E7%94%A8%E5%BD%B1%E7%89%87%E6%B8%B2%E6%9F%93%E9%98%9F%E5%88%97%E5%AF%BC%E5%87%BA%E5%AA%92%E4%BD%93)
-   [现场活动视效预览项目文件结构](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E7%8E%B0%E5%9C%BA%E6%B4%BB%E5%8A%A8%E8%A7%86%E6%95%88%E9%A2%84%E8%A7%88%E9%A1%B9%E7%9B%AE%E6%96%87%E4%BB%B6%E7%BB%93%E6%9E%84)
-   [内容浏览器](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E5%86%85%E5%AE%B9%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [世界大纲视图](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E4%B8%96%E7%95%8C%E5%A4%A7%E7%BA%B2%E8%A7%86%E5%9B%BE)
-   [灯具和硬件](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E7%81%AF%E5%85%B7%E5%92%8C%E7%A1%AC%E4%BB%B6)
-   [灯具](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E7%81%AF%E5%85%B7)
-   [光照控制台](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E5%85%89%E7%85%A7%E6%8E%A7%E5%88%B6%E5%8F%B0)
-   [DMX](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#dmx)
-   [插件](/documentation/zh-cn/unreal-engine/dmx-previs-sample-project-for-unreal-engine#%E6%8F%92%E4%BB%B6)