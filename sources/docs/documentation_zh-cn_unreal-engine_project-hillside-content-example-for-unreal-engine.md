# 虚幻引擎的Hillside项目内容示例 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:49:08.612Z

---

目录

![Hillside项目](https://dev.epicgames.com/community/api/documentation/image/1598692c-98a2-4b68-a2f1-ac3442a9fdc1?resizing_type=fill&width=1920&height=335)

尽管虚幻引擎在渲染实时和离线建筑效果图方面已深耕多年，但诸如虚幻5中的Nanite和Lumen等新功能，仍极大拓展了建筑类项目的无限可能，特别是在项目规模和整体品质方面。Hillside是一个与Neoscape合作开发的建筑可视化示例场景，展示了Safdie Architects为加拿大蒙特利尔 **栖息地67号** 社区构思的原始设计。本文简要介绍该项目，并涵盖在建立和渲染这样一个大型建筑可视化项目时涉及到的最重要设置和考虑事项。

像大多数建筑可视化项目一样，Hillside中有大量密集的几何体图形。为了实现帧率稳定并渲染最终动画，我们建议你至少使用RTX A6000，或RTX 3080显卡。

## 设置

使用Hillside示例设置项目的步骤如下：

1.  通过 **Fab** 访问[Hillside示例](https://fab.com/s/c40a1c83a173)，点击 **添加到我的库（Add to My Library）**，让项目文件出现在 **Epic Games启动程序** 中。
    
    1.  或者，你也可以在UE的Fab插件中搜索该示例项目。
2.  在 **Epic Games启动程序** 中，找到 **虚幻引擎 > 库 > Fab库** 以访问项目。
    
    只有在你安装了兼容的引擎版本时，示例项目才会出现在 **Fab库** 中。
    
3.  点击 **创建项目（Create Project）** 并按照屏幕上的提示下载示例并启动新项目。
    

关于访问示例内容及虚幻引擎的Fab插件，详见[示例与教程](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)。

## 建筑模板

Hillside基于UE5中的 **Archvis** 模板创建。该模板十分适合作为建筑类项目的起点，因为它默认启用Datasmith、MRQ和其他建筑类项目常用的插件，并支持硬件加速的光追。

## 项目组织结构

完整的Hillside项目由四个不同的主关卡和相应的关卡序列组成。和大部分建筑可视化项目类似，这些关卡和序列主要用于创建动画以及静态图像。我们将以尽可能少的自定义内容来实现目标。

四个主关卡都位于 **Content> Hillside > Maps** 目录中：

-   **\[1\]LV\_Teaser** 是一段抽象的概念动画，使用了传统可视化动画中的元素和工具，展示了UE在动态图形（Motion Graphic）方面的应用。
    
-   **\[2\]LV\_Exterior** 展示了为1967年蒙特利尔世博会西德馆（Expo 67）设计的原始提案总计划，即Hillside项目。
    
-   **\[3\]LV\_Interior** 展示了摩西·萨夫迪（Moshe Safdie）在Habitat 67中的室内装饰套件，以及Habitat的简单摄影测量网格体。
    
-   **\[4\]LV\_Credits** 展示了品牌标志动画和制作人员名单。
    

四个主序列都位于 **Content> Hillside > Movies** 目录中：

-   **\[1\]LS\_Teaser** 是一段单镜头动画，包含了事先设计好的移动网格体、灯光、风、粒子系统和后期效果。
    
-   **\[2\]LS\_Exterior** 是一组室外镜头，包含了特写细节以及蒙特利尔市城市街景和建筑远景等画面。得益于Sequencer，我们可以控制灯光、现场环境、布景和灯光可视性。该段序列动画展示了Nanite和虚拟阴影贴图（VSM）在处理高精度、大规模建筑外景中的应用。
    
-   **\[3\]LS\_Interior** 是一组室内镜头，展示了Lumen在处理拥有复杂几何体及光照的室内场景时的能力。
    
-   **\[4\]LS\_Credits** 包含一段简单的动态图形（Motion Graphic）动画；该动画使用Datasmith导入UE。
    

### 场景组织结构

每个镜头都是一段单独序列。我们能根据需要控制摄像机动画以及各种参数，包括光圈、景深、材质函数、对象可视性，以及打光等。大多数后期处理效果都由一个覆盖了整个关卡的后期处理体积控制。然而，有些镜头需要一些自定义设置，需要在摄像机的后处理效果中设定好，然后覆盖主后处理体积。例如，在下面的镜头中，我们要让Lumen场景距离（ Lumen Scene Distance）比默认值更远一些，以便全局光照效果能在远景中也能生效。通过这种方法，我们能够为每个镜头单独调整一些可能影响性能或艺术方向的设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd2e67b9-02e3-40aa-b0fc-9ebcb6dcb193/ue5_2-sequence-example.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd2e67b9-02e3-40aa-b0fc-9ebcb6dcb193/ue5_2-sequence-example.png)

Sequencer中的示例序列。点击查看大图。

然后，所有镜头序列都被汇入一个 **摄像机切换（Camera Cut）** 主序列中。接着，我们按季节将镜头分为夏、春、秋三组。这使我们能以一个简单、干净的结构进行编辑和视效管理，例如统一设置某个或某组镜头的雨水、人物和载具的可视性。

## 用MRQ渲染序列

Hillside的最终动画和静态图像都使用 **电影渲染队列** （MRQ）在Sequencer中渲染；我们在Sequencer中管理并制作了所有线性内容。

要在电影渲染队列中加载序列，请遵循以下步骤：

1.  启用影片渲染队列插件。如果你需要更多帮助来完成此任务，请参阅[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。
    
2.  插件启用后，在主菜单中找到 **窗口（Window）> 过场动画（Cinematics） > 电影渲染队列（Movie Render Queue）** 来打开它。
    
3.  要加载序列，请点击 **+Render** 按钮并选择要加载的序列。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86c9f8b1-a134-4316-9f69-6fa52554f398/ue5_2-sequences-in-mrq.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/86c9f8b1-a134-4316-9f69-6fa52554f398/ue5_2-sequences-in-mrq.png)
    

序列加载进MRQ后，你可以为每个序列指定预置渲染设置。你也可以加载一个预存的渲染队列。这样，你就可以对每个镜头或序列的默认渲染设置进行修改，并保留自定义设置，而无需在每次需要渲染时保存多个渲染设置。

在我们的示例中，默认设置保存在 **内容（Content）> 过场动画（Cinematics）** 的 **MRQ\_Hillside\_BaseConfigPreset** 中。类似于那个覆盖了整个开发场景的主后处理体积，这个配置也会默认应用于Hillside中95%的镜头。接着，我们会保存一个渲染队列（Render Queue），并根据用途对其命名。如果我们只想在光栅模式下渲染一些静态画面，我们可以对MRQ的配置做一些自定义更改，例如设置一些控制台参数（CVar）或图像尺寸，然后保存配置。

在一些复杂场景中， **LV\_Teaser** 会因为虚拟阴影而占用更多的内存资源，于是我们添加了 `r.Shadow.Virtual.MaxPhysicalPages 12000` 这个参数。默认情况下，UE将这个值设置为4000；如果你的GPU显存有足够盈余，可以设置更高的值。

该项目提供了适用于动画、静止图像（光栅模式）和静止图像（路径追踪模式）的渲染预设。它们 相当于一个起点，能让你了解我们在这个场景中的设置。凭借预设，你能快速迭代你的设置，以便应对不同品质的各种场景（如测试版、初稿版和最终版）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2036c829-9812-4877-9e0e-75115338caf4/ue5_2-mrq-preset-example.png)

我们用于MRQ中基本配置预设的CVar列表。

如需详细了解MRQ及其用法，请参阅虚幻引擎文档的[影片渲染队列](/documentation/404)部分。

要渲染一个序列，在所有内容加载完毕后，可以使用 **电影渲染队列（Movie Render Queue）** 窗口中的下列选项之一：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1632d398-7155-4c47-8357-9bb314b73916/ue5_2-mrq-render-options.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1632d398-7155-4c47-8357-9bb314b73916/ue5_2-mrq-render-options.png)

-   如果你想在引擎运行时进行渲染，请点击 **渲染（本地）（Render (Local)）** 。
-   如果你想开启引擎的无界面实例来运行渲染作业，请点击 **渲染（远程）（Render (Remote)）** 。当使用的GPU可能没有足够的VRAM来处理同时打开的引擎时，此选项会很有用。

## 使用MRQ渲染静止图像

所有静止的摄像机关卡序列都是用[静态图像](/documentation/zh-cn/unreal-engine/render-multiple-camera-angle-stills-in-unreal-engine)创建的，后者位于 **引擎（Engine）> 插件（Plugins）> 电影渲染队列内容（MovieRender Queue Content）> 编辑器（Editor）> 静止图像（Stills）** 中。当你放置了摄像机后，就可以运行这个控件，它将自动生成适当的序列，供你批量渲染图像。对于每个序列，你还可以自定义Actor的可视性，以便进行布景，改变光照，编辑例如雾的环境特征，以及后处理设置等等。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/995693d2-ad90-48fc-901f-566f485d8cf3/ue5_2-sequencer-still-setup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/995693d2-ad90-48fc-901f-566f485d8cf3/ue5_2-sequencer-still-setup.png)

和动画序列一样，你所要做的就是把这些加载到电影渲染队列中，确保你使用的是位于 **内容（Content）> 过场动画（Cinematics）** 中的正确渲染预设，用于光栅或路径追踪，然后点击 **渲染（Render）** 。你可以在 **内容（Content）> Hillside > 渲染（Renders）** 中找到我们渲染的所有静态序列。

对于极高分辨率的图像，你可以使用MRQ中的[高分辨率](/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine)功能，它会将图像分成较小的区块来节省内存。我们的 **MRQ\_Hillside\_Ext\_StillRaster** 预设使用了2个图块，以安全地容纳6000x6000的渲染，且不会在目标GPU上耗尽VRAM。

## Lumen与路径追踪器

Lumen的一大优势是其速度和准确性。我们在项目中保留了一些路径追踪图片，其中的材质、光照、摄像机参数都一摸一样，唯一不同是MRQ中的渲染模式从光栅改为了路径追踪，目的是了解两者的区别。在实际渲染中，你必须自己决定渲染方式，这很大程度上取决于硬件和场景的复杂性。在这个项目中，我们只选择了光栅模式，因为它渲染速度更快，并且仍然能达到非常高的保真度。

下方是分别使用路径追踪器和Lumen渲染的室外镜头：

![路径追踪器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4cafe811-5a84-4179-bd0e-37fd47dc9554/ext-path-tracer.jpeg)

![Lumen](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17504751-fc7e-43b8-a07f-ad537d4b1a03/ext-lumen.jpeg)

路径追踪器

Lumen

下面是分别使用路径追踪器和Lumen渲染的室内镜头：

![路径追踪器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6e2759a-6116-4be9-82fa-e4a11ad49350/int-path-tracer.jpeg)

![Lumen](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52f210eb-6caf-4409-b72a-2d32af2073f8/int-lumen.jpeg)

路径追踪器

Lumen

## 光照与关卡管理

### 子关卡

在Hillside动画中，出现了不同的光照和天气，以及不同的季节和时间段。为了更好地控制这些因素并在它们之间切换，我们先创建了一个简单关卡，只包含[太阳和天空](/documentation/zh-cn/unreal-engine/sun-and-sky-actor-in-unreal-engine)、[体积云](/documentation/zh-cn/unreal-engine/volumetric-fog-in-unreal-engine)和指数高度雾。以这个默认关卡为基础，我们衍生出拥有不同时间、大气颜色、光照强度、云雾变化的场景变种（可在主关卡中加载和控制）。

所有的光照子关卡（sublevel）都在 **LV\_Exterior** 持久关卡中，但在关卡面板或Sequencer中，同时只会显示其中一个关卡。理论上，你可以直接在Sequencer中管理所有的光源和各个Actor的外观，但子关卡的存在让你能够复用各种参数设置，避免了在不同镜头中反复设置参数的麻烦。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b65d8b43-484d-47e1-9f33-499dba8d81cc/ue5_2-lighting-levels.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b65d8b43-484d-47e1-9f33-499dba8d81cc/ue5_2-lighting-levels.png)

光照关卡可视性。请注意，只有光照关卡被设置为可见，其他的都隐藏了。点击查看大图。

Lumen（与Path Tracer不同）同时只支持256个灯光，而我们在夜景拍摄中可以看到大量的人工光源，如路灯。为了克服这一限制，我们将所有的人工照明分为局部组别，每次拍摄都可以从Sequencer中加载，就像加载和卸载不同环境光照条件一样。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1433ae30-a360-47b4-9c71-9d72ad220667/ue5_2-night-lights.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1433ae30-a360-47b4-9c71-9d72ad220667/ue5_2-night-lights.png)

夜间光源可视性。点击查看大图。

### 关卡实例

我们大量使用了[关卡实例](/documentation/zh-cn/unreal-engine/level-instancing-in-unreal-engine)，将项目分割成不同部分。这样就能让不同美术师在各自的模型或任务上工作，保证了主场景在外观设计阶段，版本控制不受影响或冲突。

下面展示了这些关卡实例的结构，以及我们对它们的分组方式。

这个工作流程的另一个好处是，你可以通过点击 **编辑（Edit）** 按钮快速修改或调整你的关卡实例；或者直接进入关卡，打开它进行调整，而不用处理主关卡的视觉噪音。

每个关卡都包含ISM和/或HISM（如下所示），它们能最大限度地减少绘制调用并提高性能。

  ![使用滑块在图片间切换。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4bc3f0a-8f86-4f90-9d3f-b48c95905c66/ue5_2-level-instancing-1.png) ![使用滑块在图片间切换。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ddca2c8-b1fb-44c7-a68e-3befdf8529a6/ue5_2-level-instancing-2.png) ![使用滑块在图片间切换。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18a96460-a659-4888-9257-db234d989a60/ue5_2-level-instancing-3.png)

使用滑块在图片间切换。

## 使用CAD数据

### 创建和导入模型

Safdie Architects在Rhino中设计了Hillside模型，并尽可能让分组、命名以及metadata清晰有序。后期阶段，当你需要为最终渲染做准备，清理场景，自动优化或准备data prep时，清晰的内容结构能提供最大程度的帮助和灵活性。

该模型从Rhino导出，并由[Datasmith](/documentation/zh-cn/unreal-engine/datasmith-plugins-for-unreal-engine)导入虚幻引擎，它保留了原始场景的完整结构，并同步导入了原有的基本材质和元数据。

默认场景运行良好，但它的模块化设计是由数以万计的小块组成的，比如成千上万的窗户，每个窗户都由几个网格组成。

为了优化性能，我们的目标是减少绘制调用的数量。我们最终得到的模块化构件将被进一步优化，由另一个脚本转换为"实例化静态网格体"（ISM）和"层级实例化静态网格体"（HISM），以尽可能地简化渲染过程。我们建立了一套定制的脚本，将建筑模型折叠和浓缩成更大的区块，最终使我们的内容浏览器（Content Browser）更干净，大纲视图（Outliner）更精简，合理地减少绘制调用。Nanite大大改善了绘制调用和渲染网格体的成本。这样组织模型的另一个好处是可以为那些只能渲染回退网格体的平台和设备优化性能。

为了提高视觉保真度，我们在优化完成后还做了一些额外的建模工作。模块化构件从编辑器中导出，并在3ds Max中添加了额外的倒角和细节，这些细节在原始CAD绘图中无法全部体现。修改过的元素随后被重新原路导入。修改过的元素随后被重新原路导入。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e7c1ed2-09fd-48d3-bd4d-0d6200758ec3/ue5_2-cad-data.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e7c1ed2-09fd-48d3-bd4d-0d6200758ec3/ue5_2-cad-data.png)

上述的优化过程将建筑的这一部分从579个静态网格体减少到18个。点击查看大图。

### 编辑器脚本

#### 合并和管理层级

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ce66ba0-5e07-4af0-8fc4-df8b7c4c0a5a/ue5_2-hillside-utility-widget.png)

Hillside工具控件

**Hillside \_Utilities\_v5** [编辑器工具控件](/documentation/zh-cn/unreal-engine/editor-utility-widgets-in-unreal-engine)位于 **内容（Content）> Hillside > 蓝图（Blueprints）** 中，是为了加快所导入几何体的优化而开发的自定义工具包。此工具专为配合Rhino模型的"图块"范式而设计，该范式使用许多嵌套网格体创建结构的每个模块化构件。使用此工具还可以轻松合并组并在整个场景中重新实例化新的网格体，从而改进大纲视图组织结构以及性能。

#### HISM

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2fb2369e-412e-42f5-9859-92d98693c40e/ue5_2-mesh-to-hism.png)

HISM网格体工具

**Mesh to HISM** 工具是一个多用途的自定义编辑器工具控件，用于管理Hillside中大量的静态网格体实例。选择静态网格可以自动压缩成实例组件（ISM或HISM），以减少编辑器的开销并提高渲染性能。

我们使用子对象数据子系统来处理动态创建和修改的编辑器中Actor组件。在实例化工具的基础上，我们添加了几个方便的按钮，用于修复所有选定Actor的负缩放，并根据需要随机设置旋转和缩放，为植被和布景增添自然的外观和变化。此外，我们为Nanite增加了分割静态网格体资产的功能，将Nanite不支持的带有不透明或遮蔽材质的三角形与带有半透明材质的三角形分开。

![使用HISM网格体工具之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37dc574f-e564-43dd-ba12-2c087245b46f/uw5_2-mesh-to-hism-1.png)

![使用HISM网格体工具之后](uw5_2-mesh-to-hism-2.png)

使用HISM网格体工具之前

使用HISM网格体工具之后

## 渲染优化

### Nanite优化

除了水体、地貌和半透材质的表面，项目中每一个符合条件的静态网格体都启用了Nanite技术。即使单个资产没有高的多边形数量或材质数量，Nanite的集群渲染方法及其对虚拟阴影贴图和Lumen的完全支持也能全面提高性能。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4c6e9d7-4571-4aac-af25-04d0113e73e5/ue5_2-nanite-visualisation.png)

检查视图模式 - Nanite可视化 | 遮罩 ； 绿色 = Nanite， 红色 = 非Nanite

### Nanite+世界位置偏移（WPO）

整个Hillside的植被资产在其材质中使用了全局位置偏移，可以随风飘荡并让场景看起来生机勃勃。为了优化Nanite和VSM的性能，我们仔细考虑了WPO在场景中的使用方式。

控制台变量 `r.OptimizedWPO=1` 在 `DefaultEngine.ini` 配置文件中启用并存储。这样我们就可以为其"细节（Details）"面板中没有启用"计算全局位置偏移（Evaluate World Position Offset）"选项的Nanite网格体关闭WPO计算。为了在编辑器中节省性能，植被已关闭该功能。

对于最终电影渲染，电影渲染队列中禁用了 `OptimizedWPO` 变量，以在植被中展示出被风吹拂的WPO效果。此外，我们使用 `World Position Offset Disable Distance` 为植被资产的WPO计算提供了合理剔除距离，只让最靠近摄像机的资产使用该效果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19eb8c29-e18b-419e-b99f-c7eebc4242c2/ue5_2-nanite-animated.gif)

检查视图模式 - Nanite可视化 | 计算WPO ； 红色 = WPO关闭 | 绿色 = WPO打开

### Actor移动性和VSM

所有静态网格体Actor的移动性都基于其在项目中的职能得到了仔细设置，以避免[VSM失效](/documentation/zh-cn/unreal-engine/virtual-shadow-maps-in-unreal-engine#%E7%BC%93%E5%AD%98)。几乎所有内容都已设置为静态。

可扩展性设置

与所有项目一样，在Hillside中，要想实现最高质量和稳定性能，需要平衡各个方面。目标输出主要是一个线性视频，但开发人员仍需要舒适地浏览场景。对渲染设置的周密控制还为备选输出方案带来了新的可能性。

下面是我们对项目的[DefaultScalability.ini](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine)文件所做的一些调整，这将帮助我们在目标计算机上实现最高30 FPS的帧率。

**植被剔除距离（Foliage Cull Distance）** `（foliage.CullDistanceScale）` 充当植被类型资产上设置的最小/最大剔除距离的乘数。项目中有大量草地和植被仅在最终过场动画期间才值得完全渲染，所以我们根据需要调整了此变量：

-   低 - `foliage.CullDistanceScale=0.05`
    
-   中 - `foliage.CullDistanceScale=0.2`
    
-   高 - `foliage.CullDistanceScale=0.3`
    
-   极高 - `foliage.CullDistanceScale=0.5`
    
-   过场动画 - `foliage.CullDistanceScale=1.0`
    

这些植被实例还在阴影深度上产生了很高的开销，所以我们在"极高"可延展性等级中降低了 **虚拟阴影贴图分辨率** 。

-   原始： `r.Shadow.Virtual.ResolutionLodBiasDirectional=-1.5`
    
-   Hillside：`r.Shadow.Virtual.ResolutionLodBiasDirectional=-0.5`
    

每帧的渲染开销极大程度上取决于屏幕分辨率，特别是当你使用Lumen全局光照和Lumen反射时。为了优化性能，我们决定降低默认的屏幕百分比值，并通过[时序超分辨率](/documentation/zh-cn/unreal-engine/anti-aliasing-and-upscaling-in-unreal-engine#%E6%97%B6%E5%BA%8F%E8%B6%85%E5%88%86%E8%BE%A8%E7%8E%87)来弥补画面品质上的降低。

-   原始 - `PerfIndexValues_ResolutionQuality="50 71 87 100 100"`
    
    -   低 - 50%
        
    -   中 - 71%
        
    -   高 - 87%
        
    -   极高 - 100%
        
    -   过场动画 - 100%
        
-   Hillside - `PerfIndexValues_ResolutionQuality="50 60 68 75 100"`
    
    -   低 - 50%
        
    -   中 - 60%
        
    -   高 - 68%
        
    -   极高 - 75%
        
    -   过场动画 - 100%
        

我们还在所有主材质中添加了[材质质量开关](/documentation/zh-cn/unreal-engine/scalability-reference-for-unreal-engine#%E6%9D%90%E8%B4%A8%E8%B4%A8%E9%87%8F%E7%BA%A7%E5%88%AB)，基于所选的可延展性等级禁用了性能开销较高的功能。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a908a40f-16b9-446b-bdf6-b8334b6e9de6/ue5_2-material-quality-switches.png)

## 高级材质技术

#### 体积云

为了在各种季节、当日时间和摄像机角度下创建美观、真实可信的天空，我们对[体积云](/documentation/zh-cn/unreal-engine/volumetric-cloud-component-in-unreal-engine)中使用的标准材质进行了重大改进。天空没有使用HDRI。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1f38762-a902-4974-b968-2a5b40a6d14e/art-beautiful-skies.gif)

自定义体积云材质通过压缩的纹理贴图为4种不同的云层提供了易于根据美术指导进行调整的设置（R=层积云，G=高层云，B=卷层云，A=雨层云）。对于 **WindVector** 、 **Stormy** 以及用于旋转整个天空、遮蔽区域和微调覆盖范围的其他许多选项，有一些简单的参数。你甚至可以在云中为暴风雨天气启用闪电。它还可利用 **Hillside\_MaterialParameters** [材质参数集合](/documentation/zh-cn/unreal-engine/using-material-parameter-collections-in-unreal-engine)在不同镜头中全局修改天空和其他材质。

此材质可以迁移到你自己的项目中并进行自定义。它位于 **内容（Content）** > **Hillside** > **效果（Effects）** > **云（Clouds）** > **材质（Materials）** > **M\_VolumetricCloud\_Hillside** 下。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2e4c228-7d3b-4bbd-a3fb-3d4266da6861/ue5_2-cloud-scale.gif)

轻松设置布局纹理的总体比例（以世界单位计）。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95b12db1-63c3-4460-992f-7faa722364a3/ue5_2-cloud-coverage-density.gif)

影响体积着色器的覆盖范围和密度。

#### 带有视差遮蔽映射的木质露天平台地面

户外露天平台所用的材质会使用伪随机遮罩生成技术和每个实例化静态网格体的随机值在所有木板中创建自然的变化。使用此二者决定每块木板和每个实例的色调、色调偏移、饱和度及其他效果时，可以减少平铺的样式的重复性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/767875fb-a865-4430-ba58-8ceb161a4516/ue5_2-wooden-deck-flooring.gif)

它还使用视差遮蔽映射（POM）在木板之间提供了额外的深度和遮蔽。尘土、污垢、水坑和树叶图层有助于实现理想的外观。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c88c676c-5bf5-470a-bf80-d8aec01eaa48/ue5_2-wooden-deck-layers.gif)

#### 混凝土

栖息地67号由大量混凝土建成，所以我们做了特别的努力，创建了用途广泛的混凝土着色器。我们使用了三平面UV和自定义纹理爆炸材质函数，从所有角度投射并控制平铺。"Per Instance Random（逐个实例随机）"用于注入颜色和粗糙度的变化，并且项目包含大量功能，你可以根据情况启用它们以获得所需外观。墙壁可以附着水滴和尘土，海岸线附近可以出现潮湿和海藻，露台可以铺上鹅卵石，还可以有裂纹、微小细节和落叶等等。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e88381f5-f008-4e72-bcff-400c9fc5d07b/feature-concrete.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e88381f5-f008-4e72-bcff-400c9fc5d07b/feature-concrete.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bcda44e-5fb1-47c3-9bd5-d403018abde5/feature-shoreline.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bcda44e-5fb1-47c3-9bd5-d403018abde5/feature-shoreline.png)

沿水线添加海藻、水滴和裂纹的水岸线功能。点击查看大图。

#### 草地

为了支持大片草地，我们使用了纹理爆炸技术，避免平铺。各种大小变化与碎石及落叶一起，增加了丰富程度，并进一步打破了平铺的单调性。此外，我们精心通过高光度和粗糙度的变化提升了逼真度，并在粗糙度贴图中利用纹理合成随距离的变化调节强度。我们还使用绒毛技术，削弱切线角上的对比度。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfeea1b0-9034-4042-9691-ae38218b20ab/feature-grass.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfeea1b0-9034-4042-9691-ae38218b20ab/feature-grass.png)

为了将草地与树木护根混合在一起，我们使用了高度混合技术，仔细地混合了草叶和尘土。我们使用距离场创建了遮罩，以加深最终混合效果，并为每处护根增添变化。护根上的落叶是这片假象的收尾一笔。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a8925d8-0afd-4c56-bf6a-7c353caf8d83/feature-grass-blending.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a8925d8-0afd-4c56-bf6a-7c353caf8d83/feature-grass-blending.png)

#### 天气管理器系统

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/835d72a5-1f48-455d-9758-bca1f8e3ca83/ue5_2-weather-management.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/835d72a5-1f48-455d-9758-bca1f8e3ca83/ue5_2-weather-management.png)

Hillside中的天气和季节效果将影响许多不同的材质和系统，所以我们创建了自定义[编辑器工具](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints)，从同一个地方管理全部内容。要打开此工具，请双击 **内容（Content）> Hillside > WeatherManager** 中的 **WeatherControl\_Editor** 蓝图。

要使用此蓝图，你需要将其添加到 **LV\_Exterior** 关卡。你可以直接在编辑器中通过其 **细节（Details）** 面板编辑参数，也可以在"在编辑器中运行（PIE）"模式中使用它创建的自定义控件预览设置。

WeatherControl\_Editor蓝图使用以下参数：

-   **秋季比例** ：在附近长有叶子的树上更新颜色并添加落叶粒子系统（落叶粒子系统仅在PIE模式下有效）。
    
-   **云参数** ：使用多个功能按钮更新云层的视觉效果方面。
    
-   **湿表面比例** ：更新一些表面（沥青、混凝土）上的湿度。
    
-   **太阳天空（当日时间）** ：更新当日时间、月份、日期和太阳时。
    
-   **室内映射** ：切换是否通过窗户映射室内。
    
-   **启用风** ：切换是否在植被材质中启用吹拂（会影响实时性能）。
    

#### 窗户上的雨水

对于雨水，我们使用了一种技术，在渲染目标中以程序化方式生成雨滴和水滴，以在玻璃材质内使用。这样，我们可以根据情况调整雨水，增加或减少雨滴，并合并小水滴。我们在水滴上添加了折射，这会创建颠倒效果，实现更真实可信的外观。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb732dcd-b031-494a-a6e5-b42e915a26b4/ue5_2-rain-on-windows.gif)

#### 水坑和池塘

使用[单层水](/documentation/zh-cn/unreal-engine/single-layer-water-shading-model-in-unreal-engine)着色模型可以避开计算吸收、散射和各向异性的复杂性，让我们可以轻松创建逼真的水体。除了吸收和散射之外，我们的材质还支持阵风、折射、漂浮叶子和焦散。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b561a9d-7337-445f-a548-c4755266f199/feature-water.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b561a9d-7337-445f-a548-c4755266f199/feature-water.png)

从UE5.1开始，单层水着色模型支持路径追踪。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8db906e2-c2d9-4fb2-8736-a4b5be92e2be/feature-water-path-traced.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8db906e2-c2d9-4fb2-8736-a4b5be92e2be/feature-water-path-traced.png)

#### 河流

我们使用[水体插件](/documentation/zh-cn/unreal-engine/water-system-in-unreal-engine)创建了圣劳伦斯河。我们首先以河流材质作为基础，创建了自定义着色器，它提供一小组盖斯特纳波和多个对美术师友好的参数。一个基于样条线的大型水体定义了主要河流区域和总体水流，岛屿周围放置了其他基于样条线的水体，以根据需要定义不同的水流方向、流速和材质变体。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d7df99b-3ba2-44cc-b994-eb5cafe55e3b/feature-st-lawrence-river.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d7df99b-3ba2-44cc-b994-eb5cafe55e3b/feature-st-lawrence-river.png)

##### 通过样条线影响水流

我们使用一个小型[运行时虚拟纹理](/documentation/zh-cn/unreal-engine/runtime-virtual-texturing-in-unreal-engine)体现水体深度，这样我们就可以快速迭代贴图以驱动波幅，使用图元伪造深度而不影响地形的实际深度。这会造成一种错觉：长堤周围的水看起来更平静，而河流中心的水看起来有更多风浪翻腾。我们还使用距离场技术添加了海岸线周围的泡沫。

要在路径追踪模式下使用WPO渲染水体，你需要设置 `r.RayTracing.Geometry.Water 1` 来启用"在水体上开启光线追踪（Water on Ray Tracing）"。

#### 岩石和海岸线

为了营造海岸线上的潮湿错觉，我们使用世界空间混合创建了潮湿岩石材质，它支持三种状态：干、湿和海藻。接着我们可以指定海岸线高度和混合衰减，获得所需外观。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7699ef2d-2162-475a-a82b-c0bb0c53f8e8/feature-rocks-and-shoreline.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7699ef2d-2162-475a-a82b-c0bb0c53f8e8/feature-rocks-and-shoreline.png)

#### 伪造内饰

我们从\[城市示例：建筑(https://www.fab.com/listings/008fe959-5511-428e-93bd-f99b1179f6d5)中提取了立方体贴图内饰材质，并将其简化到刚好满足Hillside需要的程度。为了创建适合Hillside的必要室内房间和家具风格，我们使用通过蓝图创建的自定义系统，捕获了各个3D房间的立方体贴图，然后将家具的颜色和深度作为额外的图层添加进来。我们使用了[从Twinmotion迁移来的](https://www.fab.com/listings/47cd28b9-3a16-43c7-9592-ee51ce48d0dd)资产和材质。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ee03d0c-2163-4d2b-9728-74e46c907690/ue5_2-fake-interiors.gif)

生成的贴图被添加到了纹理数组文件中，而房间和家具陈设通过使用 **Per Instance Random** 节点在窗户材质中随机混合。这样我们就可以向数组添加更多变体，并在所有参数之间带来大量的随机性，例如光照重点、卷帘、窗帘、光源强度、温度，等等。

甚至90度角的窗户也是伪造的内饰。其实现方式是，获取使用立方体贴图捕获工具捕获的黑白遮罩，并在仅影响房间立方体贴图而不影响道具贴图的单独材质实例中设置它们。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3a6e7f7-3642-4c4c-b0f0-0d4a98f0087c/feature-corner-windows.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3a6e7f7-3642-4c4c-b0f0-0d4a98f0087c/feature-corner-windows.jpg)

## 让场景更逼真

#### 高质量半透明反射

Hillside中有大量玻璃和水体，因此必须在这些表面上获得美观的反射。在PostProcessVolume中，我们启用了Lumen设置中的 **高质量半透明反射（High Quality Translucent Reflections）** 。

![默认反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a197952-db0f-49df-bb88-bdccb9a85c34/reflections-lumen-off.png)

![高质量半透明反射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34ca2e26-8082-4024-a87b-830d47d14aac/reflections-lumen-on.png)

默认反射

高质量半透明反射

#### 树和道具

我们使用了整个Epic生态系统中的现有内容，尽可能多地填充世界。树木资产大部分从[Twinmotion](https://www.fab.com/listings/47cd28b9-3a16-43c7-9592-ee51ce48d0dd)中迁移，并通过[Quixel](https://quixel.com/blog/2022/10/17/megascans-trees-european-hornbeam-now-available-on-the-unreal-engine-marketplace)导入，室内和室外场景的各种道具源自Twinmotion，而一些视觉特效和所有载具都取自[城市示例](https://www.fab.com/listings/4898e707-7855-404b-af0e-a505ee690e68)。这些资产收纳在 **Content> ExternalAssets** 文件夹下。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/faa04c6f-d927-4bc5-85f6-b22bb554320b/feature-trees-and-props.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/faa04c6f-d927-4bc5-85f6-b22bb554320b/feature-trees-and-props.png)

一些Twinmotion树木从虚幻引擎导出到了3ds Max中，由[Pivot Painter](/documentation/zh-cn/unreal-engine/pivot-painter-tool-2.0-in-unreal-engine)处理，以便在树枝层级中实现保真度更高的风模拟。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c6e0da3-4eaa-4396-ada2-08f9eddc6ed5/pivot-painter.gif) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab76ca5b-16aa-43c3-9dd0-4c6b0bd54717/pivot-painter-result.gif)

#### Niagara视觉特效处理

技术美术师通过在[Niagara](/documentation/zh-cn/unreal-engine/getting-started-in-niagara-effects-for-unreal-engine)中创建各种特殊效果，向Hillside额外添加了一层真实感和电影画面般的感染力。 所有Niagara系统和随附资产都分组在 **内容（Content） > Hillside > 效果（Effects）** 下。我们在下面展示了一些示例。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6012f24a-adc1-430e-ae61-2a57671e4cd4/feature-cherry-blossoms.gif)

通过Niagara中网格体粒子创建的 樱花 飘落效果。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4765f065-b3db-448d-b7f0-7ea9f87e05f7/feature-coffee-steam.gif)

使用我们的Niagara流体插件创建的 咖啡蒸汽 实时流体模拟。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f498089-c9bc-41e4-a7a3-626b3ed07bba/feature-bubbler-water.gif)

在Houdini中模拟并通过Alembic文件作为几何体缓存导入的 喷水 水景。

#### 车辆

序列动画背景中的载具从[城市示例](https://www.fab.com/listings/2909157b-ddfa-4cef-a925-69dc2467021f)项目迁移而来，其蓝图复杂程度和网格体数量都得到了简化。为了填充道路并使载具自动行驶，我们创建了一个名为 **BP\_SimpleTrafficGenerator** 的自定义蓝图，用于沿给定样条线以给定密度生成载具Actor。载具在运行或模拟期间使用名为 **FollowSplineComponent** 的自定义Actor组件沿样条线行驶。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9a1f08f-3213-4724-bb18-b063b5264de3/ue5_2-follow-spline-component.gif)

由于载具仅在运行期间自行行驶，在Sequencer中很难预览或微调其动画。为了烘焙出可以逐个镜头轻松推移和操控的动画序列，我们使用[镜头试拍录制器](/documentation/404)为大约100辆载具捕获了大约20秒的行驶运行过程，并将其嵌入为[子序列](/documentation/zh-cn/unreal-engine/cinematic-subscequences-track-in-unreal-engine)。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c0e781b4-e8d7-47e4-ba9a-bb64a07f576b/feature-vehicles.gif)

#### 远距离效果

为实现额外的大气和光照控制，我们使用简单的卡片来伪造远处的雾和城市光源的光晕。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59257792-9b45-42d8-92d5-0c10dff9290e/ue5_2-city-lights-card.gif)

远处建筑在夜间的窗户光照基于从城市示例中提取的材质。

为了确保远处对象的反射保持准确并且建筑的远处部分获得高质量阴影，我们将 `r.RayTracing.Culling.Radius 80000` 添加到了 `DefaultEngine.ini` 文件中，这会将反射距离从默认的30,000 cm提高到更高的值。

## 了解更多

-   [探索虚拟世界中的栖息地67号：Hillside](https://www.unrealengine.com/zh-CN/hillside)
-   [Unpacked: Hillside](https://dev.epicgames.com/community/learning/courses/ZMz/unreal-engine-hillside-sample-project-unpacked/lEKe/unreal-engine-hillside-sample-project-unpacked-overview)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E8%AE%BE%E7%BD%AE)
-   [建筑模板](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E5%BB%BA%E7%AD%91%E6%A8%A1%E6%9D%BF)
-   [项目组织结构](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E9%A1%B9%E7%9B%AE%E7%BB%84%E7%BB%87%E7%BB%93%E6%9E%84)
-   [场景组织结构](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E5%9C%BA%E6%99%AF%E7%BB%84%E7%BB%87%E7%BB%93%E6%9E%84)
-   [用MRQ渲染序列](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E7%94%A8mrq%E6%B8%B2%E6%9F%93%E5%BA%8F%E5%88%97)
-   [使用MRQ渲染静止图像](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E4%BD%BF%E7%94%A8mrq%E6%B8%B2%E6%9F%93%E9%9D%99%E6%AD%A2%E5%9B%BE%E5%83%8F)
-   [Lumen与路径追踪器](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#lumen%E4%B8%8E%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%99%A8)
-   [光照与关卡管理](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E5%85%89%E7%85%A7%E4%B8%8E%E5%85%B3%E5%8D%A1%E7%AE%A1%E7%90%86)
-   [子关卡](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E5%AD%90%E5%85%B3%E5%8D%A1)
-   [关卡实例](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E5%85%B3%E5%8D%A1%E5%AE%9E%E4%BE%8B)
-   [使用CAD数据](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E4%BD%BF%E7%94%A8cad%E6%95%B0%E6%8D%AE)
-   [创建和导入模型](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E5%88%9B%E5%BB%BA%E5%92%8C%E5%AF%BC%E5%85%A5%E6%A8%A1%E5%9E%8B)
-   [编辑器脚本](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E7%BC%96%E8%BE%91%E5%99%A8%E8%84%9A%E6%9C%AC)
-   [合并和管理层级](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E5%90%88%E5%B9%B6%E5%92%8C%E7%AE%A1%E7%90%86%E5%B1%82%E7%BA%A7)
-   [HISM](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#hism)
-   [渲染优化](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E6%B8%B2%E6%9F%93%E4%BC%98%E5%8C%96)
-   [Nanite优化](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#nanite%E4%BC%98%E5%8C%96)
-   [Nanite+世界位置偏移（WPO）](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#nanite+%E4%B8%96%E7%95%8C%E4%BD%8D%E7%BD%AE%E5%81%8F%E7%A7%BB%EF%BC%88wpo%EF%BC%89)
-   [Actor移动性和VSM](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#actor%E7%A7%BB%E5%8A%A8%E6%80%A7%E5%92%8Cvsm)
-   [高级材质技术](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E9%AB%98%E7%BA%A7%E6%9D%90%E8%B4%A8%E6%8A%80%E6%9C%AF)
-   [体积云](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E4%BD%93%E7%A7%AF%E4%BA%91)
-   [带有视差遮蔽映射的木质露天平台地面](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E5%B8%A6%E6%9C%89%E8%A7%86%E5%B7%AE%E9%81%AE%E8%94%BD%E6%98%A0%E5%B0%84%E7%9A%84%E6%9C%A8%E8%B4%A8%E9%9C%B2%E5%A4%A9%E5%B9%B3%E5%8F%B0%E5%9C%B0%E9%9D%A2)
-   [混凝土](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E6%B7%B7%E5%87%9D%E5%9C%9F)
-   [草地](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E8%8D%89%E5%9C%B0)
-   [天气管理器系统](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E5%A4%A9%E6%B0%94%E7%AE%A1%E7%90%86%E5%99%A8%E7%B3%BB%E7%BB%9F)
-   [窗户上的雨水](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E7%AA%97%E6%88%B7%E4%B8%8A%E7%9A%84%E9%9B%A8%E6%B0%B4)
-   [水坑和池塘](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E6%B0%B4%E5%9D%91%E5%92%8C%E6%B1%A0%E5%A1%98)
-   [河流](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E6%B2%B3%E6%B5%81)
-   [通过样条线影响水流](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E9%80%9A%E8%BF%87%E6%A0%B7%E6%9D%A1%E7%BA%BF%E5%BD%B1%E5%93%8D%E6%B0%B4%E6%B5%81)
-   [岩石和海岸线](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E5%B2%A9%E7%9F%B3%E5%92%8C%E6%B5%B7%E5%B2%B8%E7%BA%BF)
-   [伪造内饰](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E4%BC%AA%E9%80%A0%E5%86%85%E9%A5%B0)
-   [让场景更逼真](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E8%AE%A9%E5%9C%BA%E6%99%AF%E6%9B%B4%E9%80%BC%E7%9C%9F)
-   [高质量半透明反射](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E9%AB%98%E8%B4%A8%E9%87%8F%E5%8D%8A%E9%80%8F%E6%98%8E%E5%8F%8D%E5%B0%84)
-   [树和道具](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E6%A0%91%E5%92%8C%E9%81%93%E5%85%B7)
-   [Niagara视觉特效处理](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#niagara%E8%A7%86%E8%A7%89%E7%89%B9%E6%95%88%E5%A4%84%E7%90%86)
-   [车辆](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E8%BD%A6%E8%BE%86)
-   [远距离效果](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E8%BF%9C%E8%B7%9D%E7%A6%BB%E6%95%88%E6%9E%9C)
-   [了解更多](/documentation/zh-cn/unreal-engine/project-hillside-content-example-for-unreal-engine#%E4%BA%86%E8%A7%A3%E6%9B%B4%E5%A4%9A)