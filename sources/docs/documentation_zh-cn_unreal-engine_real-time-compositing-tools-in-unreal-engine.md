# 虚幻引擎实时合成工具 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:28:34.023Z

---

目录

![实时合成工具](https://dev.epicgames.com/community/api/documentation/image/f8f40d6a-6d85-4be2-80e9-17db792344d5?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

在虚幻引擎（UE）中，利用实时合成插件 **Composure** 可处理图像合成过程。使用此插件，在编辑器或游戏中操作时可将如计算机生成（CG）或现实源到图层等不同源中的视觉元素合并为单个无缝混合图像。在影视视觉特效（VFX）行业，针对电影和电视，单帧合成主要为离线处理进程，迄今为止各帧均需花费时间进行渲染。

若开始合成时已考虑预可视化，此插件对导演或其他现场创作人员尤其有用，可使其了解最终渲染效果，甚至可修改表演或镜头设置方式。对于合成人员，预可视化可作为指导，帮助其完成如Nuke、Fusion等其他第三方行业标准软件中的工作。

## 启用Composure插件

要访问Composure合成工具，前往 **编辑（Edit）** 菜单并打开 **插件（Plugins）** 浏览器。在 **合成（Compositing）** 类别下，启用 **Composure** 并重启编辑器，以使更改生效。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68180ab5-eedd-4532-9435-52c08dbb2aa6/1_enablingcomposure.png)

## 合成树面板

Composure插件启用后，在 **窗口（Window）** 菜单中访问 **Composure合成（Composure Compositing）** 面板。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8dfa9aa6-5ff5-42ec-ab82-48de88439d69/2_composurecompositingwindow.png)

使用此面板构建合成 **元素** 的层级。此类元素是负责渲染一段合成场景的对象。例如，上述层级由名为"My\_Composite"的合成构成。其共有三个元素，分别为"FG\_Element"、"BG\_Element"、"Media\_Plate"。各元素包含合成在一起的不同场景部分。FG\_Element和BG\_Element元素是 **CG图层** 元素，同时包含场景中的前景和背景对象。Media\_Plate是 **媒体板** 图层，用于将视频输入到合成管道。

右键点击Composure合成（Composure Compositing）面板时，选择New Comp Shot**.mp Shot**添加自己的合成。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c5ed8d8-8809-4c1c-99bf-9cf60d8009c4/addnewcompshot.png)

右键点击此合成镜头时，通过选择 **添加图层元素（Add Layer Element）** 并在 **选取元素类型（Pick an Element Type）** 选择窗口中选择要添加的元素类型，添加新元素。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a7f9d75-9cb7-40da-95c1-9323f3e45410/addnewlayerelement.png)

元素可以在层级结构中上下嵌套，以决定可在层级树中较高级别的元素中进行跨元素使用的元素。注意：元素即关卡中的Actor，可像其他Actor一样添加。此面板提供此类元素的嵌套方法，进行整理并公开部分控件，以便于使用。

为了在场景中可移植和易用，需确保元素添加到各自的子关卡。由于其为关卡Actor，因而可在能打开的其他关卡中加载合成树。

## Composure合成面板剖析

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9e070ab-437d-4618-b06f-60eef3f64f42/composureanatomy.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b9e070ab-437d-4618-b06f-60eef3f64f42/composureanatomy.png)

1.  **元素行（Element Row）** 由合成镜头构成，而合成镜头则由场景内合成元素组成。启用拥有代表当前加载贴图中各图层的行。
2.  **元素命名（Element Name）** 是给定各各添加图层元素的唯一命名，用于引用合成材质图表中找到的特定元素。
3.  使用 **眼睛（Eye）** 按钮可开启或关闭各合成镜头或图层元素。
4.  **透明度** 框控制选定合成镜头或图层元素的不透明程度。在此文本框中输入值或点击下拉菜单，使用滑块可控制可见性。
5.  **锁** 可切换冻结帧元素。针对流送进入的动画或视频，此功能可暂停元素渲染，同时冻结其位置。
6.  利用 **媒体输出（Media Output）** 开关可开启/关闭选定合成镜头或图层元素的渲染结果。首次开启此开关时，将提示选取（或创建）**媒体输出定义** 资源。提供目标输出的资源细节（例如卡或端口）。
7.  选择合成镜头或图层元素时，可在关卡的 **细节（Details）** 面板中找到此元素的属性和特性。可在 **Composure** 类别下找到合成特定设置。
8.  选择合成镜头或图层元素时，关卡视口中将显示 **元素预览窗格（Element Preview Pane）**，与摄像机Actor（Camera Actors）预览窗格类似。其显示选定元素的渲染，元素处于错误状态时还将显示错误消息。例如，若无信息显示，将显示"空白（Empty）"。
    
    在线性颜色空间中处理元素。预览将默认显示sRGB的线性转换，并显示无色调映射的图像，结果可呈现曝光效果。可选择更改元素的预览方式，如通过自定义材质添加色调映射。
    

## 合成元素

**元素** 是用于构建合成图像的单个构建块，其可为合成镜头或单个图层元素。各元素共同组成合成图像，合成图像又由图层或关卡Actor构成，分别负责渲染一段合成场景。图层Actor分别负责渲染一段合成场景。

### 内部通道

各元素均拥有其执行的内部通道集。此类通道是该元素类型特有的连续步集。在渲染合成中的元素时，各通道均为独立的步。无通道的元素不进行操作。可用的通道类型众多，某些元素原型还附带自己的预定义通道。例如，媒体板元素已内置色度镶迭和防溢出通道。

### 元素剖析

在Composure合成树（Composure Compositing Tree）窗口中选择元素时，关卡中的 **细节（Details）** 面板将显示此选定元素的信息和属性。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37075c83-1ea5-49a4-8d3b-d66616158cf0/elementantomy.png)

1.  利用 **输入（Inputs）** 属性，有些元素可访问合成系统之外的资源，例如使用视频输入的媒体纹理。此类资源提供将依赖项传到元素的方法，同时充当特殊通道，供其他后续通道和部分带有预定义输入的元素类型引用。
2.  利用 **目标摄像机Actor**，部分需要视点进行参考的元素类型可在关卡中使用摄像机Actor。若未定义，元素将搜索关卡，并指定找到的首个摄像机Actor。可为单个元素覆盖此项，或从根元素进行继承。
3.  **变换（Transforms）** 是一类通道，其会获取某类输入并将其修改，或将其用于生成新内容。例如，颜色变换获取一个颜色空间的图像，并将其放入另一颜色空间。此列表中的最后变换将产生元素最终渲染结果。
4.  **通道** 的类型众多，例如色度镶迭、防溢出，甚至是可添加的自定义通道。此类通道通常共享部分属性，但有的通道也可能具有有独特属性。
    1.  **启用（Enabled）** 标签可开启/关闭通道。禁用后，通道将不执行通道自身操作。
    2.  **通道命名（Pass Name）** 提供后续通道可引用的命名。
        
        若要在材质中引用通道，其必须使用唯一命名。
        
    3.  **中级（Intermediate）** 标签控制后续通道是否使用此通道。通常默认仅下一通道需要进行使用。之后，将释放其渲染目标，供其他通道使用。若需延长通道结果的访问时间，则禁用此标签。
        
        元素和通道的渲染共用一个渲染目标池。所有目标每帧均返回到此池并重新分配。此池中未使用的目标将被清空。
        
5.  **输出（Outputs）** 是另一种形式的通道，其对元素的渲染结果无贡献。相反，其会将通道的结果路由到他处，如视频采集卡或玩家视口。
6.  **渲染分辨率（Render Resolution）** 定义元素的分辨率输出。其可被覆盖，或自父项继承，而部分通道可覆盖或扩展此设置。
7.  在 **预览变换（Preview Transforms）** 中，元素于其线性颜色空间中处理。预览元素时默认无色调映射，因此其颜色将发生曝光。利用元素上的可选变换，可调节编辑器中预览图像的方式。
8.  **自动运行（Auto Run）** 标签可切换元素状态，防止其运行（或渲染）。Composure合成面板树视图中的眼睛图标同样会反映此标记状态。

## 合成材质

以下章节对UE中合成流程各部分的工作原理和合并方式进行了详细讲解。

欲了解使用Composure创建基本合成的分步指南，参见[Composure快速入门](/documentation/zh-cn/unreal-engine/real-time-compositing-quick-start-for-unreal-engine)。

### 嵌套元素

元素可嵌套在另一元素之下，并可将任意类型的元素放入层级，但应将最终合成放在顶部，图层元素列在下方。要添加新嵌套元素，右键点击所需父元素，并在快捷菜单中选择 **添加层元素（Add Layer Element）**。然后，在窗口中选择要添加的元素类型。

嵌套元素将决定合成中使用的元素渲染顺序。最后渲染父元素，并预先渲染其下内容。父元素可使用其渲染通道中子项的渲染结果。

### 自定义材质通道

**自定义材质通道** 为变换通道，利用其可将用户编写材质添加到合成流程。在此材质中，可按命名引用子元素。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5ee98c9c-f213-40a8-abfb-3463829bfdf8/custommaterialpass.png)

### 在材质中引用元素

在材质中，创建 **纹理参数** 并使用子元素的渲染结果自动填充该参数。以合成树中找到的子元素名，命名参数。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f594acd-f36a-4ed2-b9a6-a267bf955dca/compositematerial.png)

由于输出只需单个颜色，将使用后期处理材质合成此类材质。若需要，可启用后期处理材质的 **输出透明度（Output Alpha）**。

使用细节（Details）面板将此材质插入 **材质** 槽中。若设置全部正确，其应开始在视口预览中工作。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4304d64f-cfa8-478a-ba04-19d64b1e865e/custommaterialapplied.png)

若预览中未显示子元素，重新检查命名是否完全匹配。拼写错误或多余空格可能导致此操作失败。

若子元素已禁用且尚未渲染，将使用透明黑色纹理填充纹理参数。若未找到指定元素，纹理将使用材质中的默认纹理。

#### 使材质可移植

在材质中按命名引用元素十分简单，但会导致材质变得非常专用化；该方式仅适用于拥有特定命名的元素。或者，给定材质纹理参数泛型命名，对对其设置，以引用通道属性中的子元素。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ccc5d0a5-b4f0-4595-bdd0-aa7ab5e4cb86/custommaterialpassinputs.png)

在通道上设置材质后，其将拥有名为 **输入元素（Input Elements）** 的属性部分。**输入元素（Input Elements）** 部分将列出材质中的所有纹理参数，以便设置以引用特定子元素。

### 在材质中引用其他通道

与元素类似，材质可引用已运行的其他通道，这就是在单个元素中进行渐进变换的方式。举例而言，我们可以通过媒体板构成色度镶迭通道，以及使用镶迭结果的防溢出通道。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bc60535-037f-440c-8bbd-a77d7631aec0/custommaterialinputsparameters.png)

若需引用通道（非当前通道之前通道），则需取消勾选此通道的 **中间（Intermediate）** 标签。

#### 特殊参数名PrePass

**PrePass** 为特殊参数名，可解释为\_引用此之前运行的通道\_。在材质中使用可使其可移植性更强，而无需在细节（Details）面板中设置参数映射。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1651d7f0-5f76-45c8-8c4f-5fba0dbacb3f/image20.png)

### 将两个元素合成在一起

项目会默认通过后期处理流程发送透明度数据。为使CG图层正常运行，需将项目设置中的 **启用后期处理中的透明度通道支持（Enable alpha channel support in post processing）** 设为 **仅线性颜色空间（Linear color space only）**。该设置位于渲染（Rendering）> 后期处理（PostProcessing）类别下。

利用以下功能可降低元素在材质中合成的难度：

**Over** 节点获取输入A并将输入B覆盖在其上，同时使用A的不透明度将两者混合。此节点获取flaot4 RGBA向量，并期望RGB通道与其透明度值预乘。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8130f8b9-b5f3-465f-8928-84b984d23554/compositingtwomaterials.png)

在下例中，Over材质表达式正将 `FG_Element` 和 `BG_Element` 进行混合。`FG_Element` 的透明度用于将前景对象和背景板进行混合。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb552c92-7949-4f35-a4d2-f51794476c78/compositematerialsblend2.png)

### 公开材质参数

材质标量和向量参数将自动向 **材质参数（Material Parameters）** 类别下的通道细节（Details）面板公开。如此便可轻松调整、调节和试验合成。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45552a53-dfd0-4dc2-b2eb-ac2ea0fbdd14/matparameter_blend.png)

在此范例材质中，**融合（Blend）** 标量参数将自动向元素的细节（Details）面板公开。在编辑器中操作时，调整此参数的值便于快速编辑或试用设置。

![公开混合标量值 = 0.0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40587f6e-d204-403c-9414-f7ae6ffbd26f/blendvalue_0.png)

![公开混合标量值 = 0.5](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb24de14-7566-4e64-ae3f-93593c18b166/blendvalue_1.png)

公开混合标量值 = 0.0

公开混合标量值 = 0.5

## 输出合成

**输出** 通道负责将不同元素的最终结果路由到某个外部使用者。各元素均含有供添加输出通道的位置。

点击 **输出（Outputs）** 旁的 **添加（add）** (**+**)按钮，将显示以下选项：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5ff1273-df7d-4adf-ad55-0b02b09bd876/outputcompositeformats.png)

-   媒体采集（Media Capture）
-   图像序列（Image Sequence）(exr)
-   玩家视口（Player Viewport）
-   渲染目标资源（Render Target Asset）

最常见（或主要）的输出是利用 **媒体采集（Media Capture）** 通道输出到采集卡。使用树面板按钮可轻松、快捷地向元素添加媒体采集通道：

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bada8da6-462c-4526-b46f-08cb8407e4ed/togglemediacapture.png)

### 使用Sequencer导出合成

备选工作流是通过[Sequencer](/documentation/zh-cn/unreal-engine/unreal-engine-sequencer-movie-tool-overview)渲染出合成和其他图层或通道。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e767b1d-0e6d-4e5a-b0b6-b8cae379e948/sequenceroutput.png)

欲了解更多信息，参见[使用Sequencer实时合成](/documentation/zh-cn/unreal-engine/real-time-compositing-with-sequencer-in-unreal-engine)。

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [beta](https://dev.epicgames.com/community/search?query=beta)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用Composure插件](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%90%AF%E7%94%A8composure%E6%8F%92%E4%BB%B6)
-   [合成树面板](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%90%88%E6%88%90%E6%A0%91%E9%9D%A2%E6%9D%BF)
-   [Composure合成面板剖析](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#composure%E5%90%88%E6%88%90%E9%9D%A2%E6%9D%BF%E5%89%96%E6%9E%90)
-   [合成元素](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%90%88%E6%88%90%E5%85%83%E7%B4%A0)
-   [内部通道](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%86%85%E9%83%A8%E9%80%9A%E9%81%93)
-   [元素剖析](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%85%83%E7%B4%A0%E5%89%96%E6%9E%90)
-   [合成材质](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%90%88%E6%88%90%E6%9D%90%E8%B4%A8)
-   [嵌套元素](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%B5%8C%E5%A5%97%E5%85%83%E7%B4%A0)
-   [自定义材质通道](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E6%9D%90%E8%B4%A8%E9%80%9A%E9%81%93)
-   [在材质中引用元素](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%9C%A8%E6%9D%90%E8%B4%A8%E4%B8%AD%E5%BC%95%E7%94%A8%E5%85%83%E7%B4%A0)
-   [使材质可移植](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E4%BD%BF%E6%9D%90%E8%B4%A8%E5%8F%AF%E7%A7%BB%E6%A4%8D)
-   [在材质中引用其他通道](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%9C%A8%E6%9D%90%E8%B4%A8%E4%B8%AD%E5%BC%95%E7%94%A8%E5%85%B6%E4%BB%96%E9%80%9A%E9%81%93)
-   [特殊参数名PrePass](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E7%89%B9%E6%AE%8A%E5%8F%82%E6%95%B0%E5%90%8Dprepass)
-   [将两个元素合成在一起](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%B0%86%E4%B8%A4%E4%B8%AA%E5%85%83%E7%B4%A0%E5%90%88%E6%88%90%E5%9C%A8%E4%B8%80%E8%B5%B7)
-   [公开材质参数](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E5%85%AC%E5%BC%80%E6%9D%90%E8%B4%A8%E5%8F%82%E6%95%B0)
-   [输出合成](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E8%BE%93%E5%87%BA%E5%90%88%E6%88%90)
-   [使用Sequencer导出合成](/documentation/zh-cn/unreal-engine/real-time-compositing-tools-in-unreal-engine#%E4%BD%BF%E7%94%A8sequencer%E5%AF%BC%E5%87%BA%E5%90%88%E6%88%90)