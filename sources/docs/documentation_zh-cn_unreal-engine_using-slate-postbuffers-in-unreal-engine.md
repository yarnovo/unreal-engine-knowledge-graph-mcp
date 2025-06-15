# 在虚幻引擎中使用Slate后缓冲区 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:17:55.813Z

---

目录

![Slate后缓冲区](https://dev.epicgames.com/community/api/documentation/image/6e284e7d-2d92-4870-962d-79a1a9b9a13c?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

![Slate后缓冲区产生录像带模糊效果的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/37193ba3-a0be-47d4-a7b4-2245325971c9/heroimage.gif)

**Slate后缓冲区** 对游戏场景进行取样以用于UI材质，类似于SceneColor在后期处理材质中的使用。这使得你可以创建同时适用于游戏世界和用户界面的视觉效果。Slate后缓冲区还可以应用 **Slate后期处理** 类来处理广泛的后期处理，例如模糊效果。

Slate后缓冲区的一些用例包括：

-   使透明弹出消息后面的场景变得模糊。
-   用来显示损伤或黑暗的渐晕效果。
-   全屏模糊效果，会选择性地遮挡控件以及游戏世界。
-   效果类似磨损录像带的失真滤镜。

上述每个示例均可在[内容示例](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine)项目的 **UI\_SlatePostBuffer** 关卡中找到。

本页面提供以下内容：

-   关于使用Slate后缓冲区的工作流程概述。
-   关于Slate后缓冲区如何运作及其局限性的技术信息。
-   关于如何进行以下操作的说明：
    -   启用Slate后缓冲区。
    -   配置你的Slate后缓冲区。
    -   创建新的Slate后处理器类。
    -   将Slate后缓冲区集成到材质中，并将其应用于UI元素。

## 概述

Slate后缓冲区和后处理器类是全局资源，因此你应该与整个团队沟通，以确定项目该如何使用它们。

UE支持最多5个Slate后缓冲区，每个缓冲区都会对游戏场景进行取样以用于UI材质。你可以为每个后缓冲区设置一个Slate后处理器类，以便你在UI材质中使用该缓冲区之前，对该缓冲区应用广泛的后期处理。如果没有后处理器，则只会对游戏场景的副本进行取样。

![项目设置中的Slate RHI设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d35652e4-b7fd-4188-a4a4-5ebbde6bba8c/slaterhisettings.png)

UI材质可以使用 **GetSlatePost** 函数对后缓冲区进行取样。例如，`GetSlatePost0` 对Slate后缓冲区0进行取样，而 `GetSlatePost4` 对Slate后缓冲区4进行取样。UI材质可以使用Slate后缓冲区，类似于后期处理材质使用SceneColor对场景进行取样。

![GetSlatePost节点使用示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/78d6c000-da18-4de9-bc90-d4d0e0ba78be/getslatepost.png)

当你对控件应用UI材质应时，它将使用该控件将材质的后期处理应用到控件后面的屏幕部分。以下示例使用反转的Y轴UV坐标，将方形控件内的视口部分完全翻转。

![内容示例项目中具有反转UV坐标的画中画示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/faf87820-e4ac-407d-9ff2-de4c45886a01/contentsample3.png)

举一个更复杂的例子，下面的屏幕截图显示了一个使屏幕失真的控件，使其看起来像磨损的录像带。应用录像带失真材质的控件占据了整个屏幕，并位于UI内其他控件的顶部。这使得UE可以同时处理UI和游戏场景，因此你可以使用UMG蓝图中的文本控件控制日期和时间码等元素。

![Slate后缓冲区产生录像带模糊效果的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61e36e3a-c886-46dd-b866-6198f0a91112/heroimage.png)

默认情况下，GetPostBuffer节点直接在UI控件后面进行取样。要了解如何重载它们，请参阅下面有关在UI材质中使用后缓冲区的技巧小节。

## 启用Slate后缓冲区

要启用Slate后缓冲区，请将以下控制台变量添加到项目的 \*Engine.ini文件中：

DefaultEngine.ini

```cpp
	[ConsoleVariables]
	Slate.CopyBackbufferToSlatePostRenderTargets=1
```

或者，你可以使用以下控制台命令来启用此控制台变量：

控制台

```cpp
	-dpcvars=Slate.CopyBackbufferToSlatePostRenderTargets=1
```

## 在项目设置中配置Slate后缓冲区

要配置你的后缓冲区，请执行以下操作：

1.  打开你的 **项目设置（Project Settings）**。
    
2.  找到 **游戏（Game）** > **Slate RHIRenderer设置（Slate RHIRenderer Settings）** > **后期处理（Post Processing）**。
    
3.  展开你要配置的缓冲区的下拉菜单。你可以根据需要启用或禁用每个缓冲区。
    
    ![在项目设置中启用后缓冲区。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22ee013e-780e-4657-b204-a25856ad42e6/enablepostbuffer.png)
4.  如果你想向Slate后缓冲区添加特定的后期处理，请为其选择一个 **后处理器类（Post Processor Class）**。
    
    ![将后处理器类与后缓冲区设置一起设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1018e1fe-4804-4d58-9f14-03cfbbcc6a15/setpostbufferclass.png)

## 创建并使用Slate后处理器类

要创建新的Slate后处理器类，请执行以下操作：

1.  创建从 **USlateRHIPostBufferProcessor** 或其子类之一派生的 **新蓝图类** 。本教程以USlatePostBufferBlur为例。
    
    ![将Slate后缓冲区模糊类用作新蓝图的基类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ab07e64a-ae8c-4181-8a91-979b8a2e1249/inheritslatepostbufferblur.png)
2.  打开新后处理器的蓝图，然后编辑类默认值。将 **高斯模糊强度（Gaussian Blur Strength）** 的默认设置更改为除从父类继承的默认值以外的值。在本例中，高斯模糊强度设置为10.0。
    
    ![设置派生的后缓冲区模糊类的模糊强度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f29a0bca-5527-4e87-8b09-8915e7ceb2a5/setblurstrength.png)
3.  打开 **项目设置（Project Settings）** > **Slate渲染器设置（Slate Renderer Settings）** > **后期处理（Post Processing）**，展开其中一个后缓冲区的下拉菜单，并将 **后处理器类（Post Processor Class）** 设置为你的新后处理器。
    
    ![在其中一个后缓冲区上设置模糊效果后处理器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bdf24de-61e1-4680-9851-74e96aa10f76/setblurprocessor.png)

现在，UE将使用你的后处理器在控件复制后缓冲区之前对其进行处理。在本示例中，是添加高斯模糊效果。

你还可以从 `USlateRHIPostBufferProcessor` 派生出一个新的C++类，从而实现你自己的后处理器。

### 在运行时修改Slate后处理器

你可以使用 **Slate FX子系统（Slate FX Subsystem）** 在运行时修改Slate后处理器的值。

1.  创建 **Slate FX Subsystem** 节点。
    
2.  调用 **Get Slate Post Processor** 从你的一个后缓冲区中获取后处理器。
    
3.  将后处理器转换为适当的类。
    
4.  从转换的后处理器对象访问后处理器的参数。
    
    ![运行时在蓝图中修改模糊效果后处理器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3f8c752-e516-4f00-a5fc-bfb05d48393c/modifyblurexample.png)
    
    上图只是运行时修改后处理器的一个示例。我们不建议如图中所示那样在更新函数时执行此操作。
    

因为Slate后缓冲区和后处理器属于全局资源，如果你像上面的示例一样修改Slate后处理器的值，将全局改变该值。因此，所有使用此后期处理的Slate控件或UI材质的实例，都将体现该变化。在运行时修改Slate后期处理值之前，请谨慎操作并与整个团队沟通。

## 在UI材质中使用后处理器

要创建对后缓冲区进行取样的UI材质，请执行以下操作：

1.  创建新 **材质** 。
    
2.  将材质的 **材质域（Material Domain）** 设置为 **用户界面（User Interface）** 。
    
    ![将材质域设置为用户界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f667aeb3-dc87-4495-99c7-68eff4384b52/uimaterialdomain.png)
3.  要对缓冲区进行取样，请调用与你要使用的后缓冲区相对应的 **GetSlatePost** 函数。例如， `GetSlatePost0` 将获取Slate后缓冲区0。
    
    ![使用GetSlatePost节点获取后缓冲区](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/706b84d4-ea8d-4ef1-8a39-8d3a01cc2418/getslatepost.png)

### 在UI材质中使用后缓冲区的技巧

以下是在UI材质中使用后缓冲区的一些技巧：

-   默认情况下，GetSlatePost节点仅对当前控件后面的像素进行取样，但你可以使用 **UV** 输入对此进行修改。
-   使用 **LinearRGB** 可获取后缓冲区的伽马校正取样。
-   **RGB** 对于正确的颜色反转等效果很有用。

下图是一个材质示例，该材质使用后缓冲区创建旋转的UE徽标，并反转徽标背后世界的颜色。它将UE徽标纹理馈送到不透明度（Opacity）输出，而最终颜色（Final Color）反转GetSlatePost0的RGB输出。

![一种能反转和模糊部分缓冲区的材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b4946fc-47f5-4664-a85e-98cd9304468f/invertblurexample.png)

下图中使用的就是此材质。请注意，尽管没有对 `GetSlatePost0` 的进行UV输入，但材质会直接对控件后面的场景进行取样。

![帧内UE徽标上所使用的先前材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1d272578-2762-4682-9517-16699df25edf/invertexample.png)

### 在后缓冲区中捕获UI控件

默认情况下，只有场景会被GetSlatePost节点捕获。但是，你可以使用 **后缓冲区更新控件（Post Buffer Update Widget）** 同时捕获场景和其他UI控件，以指示Slate何时捕获UI。要在后缓冲区中捕获UI，请执行以下操作：

1.  在UMG设计器的调色板中找到 **后缓冲区更新控件（Post Buffer Update Widget）** 。
    
    ![调色板中的后缓冲区更新控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23b6b32b-1a80-47dd-93d8-fdcbaa6bc2d8/postbufferupdatewidget.png)
2.  在你想要当前UI更新的位置添加控件。无论此控件在哪里，Slate后缓冲区都会更新。
    
    ![放于层级中的更新控件的示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04802c8e-c728-4eba-9213-9f8733c3d4e2/addwidgetupdate.png)
    
    我们建议将更新控件作为层级中的最后一个元素，以确保在你想要取样的控件之后（或之上）绘制它。
    
3.  在细节面板中配置后缓冲区更新控件。
    
    ![配置后缓冲区更新控件的细节](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7d4d5a6-c0ac-4c07-89eb-4d5f55cb44c1/configuredetails.png)

后缓冲区更新控件具有以下参数：

**参数**

**说明**

**执行默认后缓冲区更新（Perform Default Post Buffer Update）**

若为true，则将发生默认的、仅限场景的复制/Slate后期处理。否则不会发生默认的复制/处理。如果没有"绘制"后缓冲区更新，并且此设置处于关闭状态，则当控件尝试对Slate后缓冲区进行取样时，则行为将处于未定义状态。（结果可能是最后一帧或为黑/白 - 请避免这种情况。）

**要更新的缓冲区（Buffers to Update）**

此控件应为其触发UI+场景取样的缓冲区数组。应与UI中此时GetSlatePost节点的预期使用情况相对应。

一旦你配置了后缓冲区更新控件，未来的控件就可以使用应用到你选择更新的缓冲区的后期FX，自由地对场景和UI进行取样。

### 后缓冲区和绘制顺序

为了使后缓冲区更新正常运行，Slate必须在后缓冲区可以取样 *之前* 绘制后缓冲区将取样的所有UI元素。由于绘制顺序混乱，若将后缓冲区放在垂直/水平/网格框内的覆层中，可能无法保证这一点。指引：

-   层级的底层应该是你要显示受后缓冲区影响的视觉效果的控件。
-   中间层应该包含后缓冲区控件。
-   顶层应该是对后缓冲区进行取样并将效果应用于底层的材质。

下图展示了有效的绘制顺序：

![层级示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/02fecb6d-e0c1-4409-9714-868300ab19c6/examplehierarchy.png)

下图展示了应用于水平框中图像的材质：

![将水平框内部变模糊的材质示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9eff32b2-ceb6-4197-98b0-cb2a0ecb7480/materialexample.png)

## 技术信息和限制

以下是有关Slate后缓冲区行为方式的一些技术信息和限制。

### 取样

GetSlatePost节点会对场景后缓冲区的每帧处理一次的副本进行取样，以供控件取样。这些缓冲区是全局的，因此你需要在团队内规划如何使用缓冲区。由于材质会对后缓冲区的副本进行取样，因此，除非你使用后缓冲区更新控件，否则绘制在顶部的控件不会对更低的控件进行取样。

### 性能和模糊后期处理

预计模糊后期处理的性能开销会随着你使用的模糊量成比例增加。换句话说，32像素的模糊效果的性能开销会高于16像的素模糊效果。下表显示了渲染一帧游戏场景的性能测量结果。这是在UE 5.4中使用Renderdoc在RTX 3080上进行的测量。

**模糊强度（像素）**

**核大小**

**模糊时间（微秒）**

**GPU帧总时间**

**模糊效果使用的GPU** **百分比**

72

28x28

93 us

8272

1.1%

256

97x97

212 us

8254

2.5%

上面的数据主要是为了让你了解模糊尺寸之间的相对性能差异。数据并不一定反映虚幻引擎或当前一代硬件的当前性能。

#### 多个后处理器

当你使用多个带有后期处理的后缓冲区时，你只需承担屏幕上实际可见的后期处理的性能开销。例如，如果你有两个后缓冲区，每个后缓冲区都使用具有不同值的模糊后处理：

-   如果只有其中一个后缓冲区可见，则你只需承担那一个后缓冲区的性能开销。
    
-   如果两个后缓冲区都可见，则你需要同时承担两个后缓冲区的性能开销。
    

### 最小化缓冲区使用量

只有绘制使用缓冲区的控件时，才会复制/填充每个缓冲区。当缓冲区未被用于两帧时，其会在GPU上被调整为1x1。

### HDR支持

Slate后缓冲区支持 **HDR** 。但是，当使用HDR时，材质应 **从RGB取样**，而不是从LinearRGB取样。此外，HDR支持仅在关闭HDR复合（HDR Composite）时才能立即生效。如果你要使用HDR复合，则可能需要在使用过程中校正伽马值。

### 已缓存缓冲区使用量

在材质/纹理创建和资源更新时，控件材质会缓存后缓冲区使用量，但不会在每次绘制时更新此缓存值。

由于此缓存的原因，如果你在全局控制台变量Slate.CopyBackbufferToSlatePostRenderTargets关闭的情况下运行，你可能会遇到材质显示未使用的情况。在这种情况下，尝试使用后缓冲区的材质可能仅进行黑/白取样。如果发生这种情况，你可能需要重新启动才能清除使用缓存并获得正确的结果。我们建议在 \*Engine.ini中或在测试早期启用Slate.CopyBackbufferToSlatePostRenderTargets。

当使用后缓冲区更新控件在PIE中调整大小时，取样结果在调整大小期间可能会暂时显示未黑/白。出现此问题是因为在检查大小时，我们对后缓冲区更新控件更加保守。这仅发生在PIE中，因为要绘制编辑器的缘故，PIE在调整大小期间会更主动地绘制。这不会在独立构建或发售构建中发生。

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [post-processing](https://dev.epicgames.com/community/search?query=post-processing)
-   [ui vfx](https://dev.epicgames.com/community/search?query=ui%20vfx)
-   [slate vfx](https://dev.epicgames.com/community/search?query=slate%20vfx)
-   [slate postbuffer](https://dev.epicgames.com/community/search?query=slate%20postbuffer)
-   [ui post-processing](https://dev.epicgames.com/community/search?query=ui%20post-processing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [启用Slate后缓冲区](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%90%AF%E7%94%A8slate%E5%90%8E%E7%BC%93%E5%86%B2%E5%8C%BA)
-   [在项目设置中配置Slate后缓冲区](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%9C%A8%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE%E4%B8%AD%E9%85%8D%E7%BD%AEslate%E5%90%8E%E7%BC%93%E5%86%B2%E5%8C%BA)
-   [创建并使用Slate后处理器类](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%88%9B%E5%BB%BA%E5%B9%B6%E4%BD%BF%E7%94%A8slate%E5%90%8E%E5%A4%84%E7%90%86%E5%99%A8%E7%B1%BB)
-   [在运行时修改Slate后处理器](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E4%BF%AE%E6%94%B9slate%E5%90%8E%E5%A4%84%E7%90%86%E5%99%A8)
-   [在UI材质中使用后处理器](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%9C%A8ui%E6%9D%90%E8%B4%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%90%8E%E5%A4%84%E7%90%86%E5%99%A8)
-   [在UI材质中使用后缓冲区的技巧](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%9C%A8ui%E6%9D%90%E8%B4%A8%E4%B8%AD%E4%BD%BF%E7%94%A8%E5%90%8E%E7%BC%93%E5%86%B2%E5%8C%BA%E7%9A%84%E6%8A%80%E5%B7%A7)
-   [在后缓冲区中捕获UI控件](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%9C%A8%E5%90%8E%E7%BC%93%E5%86%B2%E5%8C%BA%E4%B8%AD%E6%8D%95%E8%8E%B7ui%E6%8E%A7%E4%BB%B6)
-   [后缓冲区和绘制顺序](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%90%8E%E7%BC%93%E5%86%B2%E5%8C%BA%E5%92%8C%E7%BB%98%E5%88%B6%E9%A1%BA%E5%BA%8F)
-   [技术信息和限制](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E6%8A%80%E6%9C%AF%E4%BF%A1%E6%81%AF%E5%92%8C%E9%99%90%E5%88%B6)
-   [取样](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%8F%96%E6%A0%B7)
-   [性能和模糊后期处理](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E6%80%A7%E8%83%BD%E5%92%8C%E6%A8%A1%E7%B3%8A%E5%90%8E%E6%9C%9F%E5%A4%84%E7%90%86)
-   [多个后处理器](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%A4%9A%E4%B8%AA%E5%90%8E%E5%A4%84%E7%90%86%E5%99%A8)
-   [最小化缓冲区使用量](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E6%9C%80%E5%B0%8F%E5%8C%96%E7%BC%93%E5%86%B2%E5%8C%BA%E4%BD%BF%E7%94%A8%E9%87%8F)
-   [HDR支持](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#hdr%E6%94%AF%E6%8C%81)
-   [已缓存缓冲区使用量](/documentation/zh-cn/unreal-engine/using-slate-postbuffers-in-unreal-engine#%E5%B7%B2%E7%BC%93%E5%AD%98%E7%BC%93%E5%86%B2%E5%8C%BA%E4%BD%BF%E7%94%A8%E9%87%8F)

相关文档

[

内容示例

![内容示例](https://dev.epicgames.com/community/api/documentation/image/87759153-fcb5-4532-8861-ff747c395c30?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/content-examples-sample-project-for-unreal-engine)