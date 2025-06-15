# 虚幻引擎的影片渲染管线 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:10:42.552Z

---

目录

![影片渲染管线](https://dev.epicgames.com/community/api/documentation/image/cf60c407-eecb-4100-ad7d-070f6a6c2d7f?resizing_type=fill&width=1920&height=335)

**影片渲染管线（Movie Render Pipeline）**是虚幻引擎的离线图像序列和影片渲染解决方案。 在你使用虚幻引擎的3D渲染和光照功能创建线性内容时，你可以使用影片渲染管线来获得比传统实时渲染质量更高的结果。 使用影片渲染管线进行离线渲染让你有机会使用一些设置项和命令，从而大幅提高光线追踪全局光照和光线追踪反射等功能的质量、精度和外观。 凭借离线渲染，你还可以获得更好的动态模糊效果，并消除不必要的抗锯齿瑕疵。

你可以使用三种工具与影片渲染管线交互，以此渲染你的项目。每种工具都有不同的功能，以满足项目需求。

-   **[影片渲染图表](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#movie-render-graph)**（MRG）****：基于图形的界面，可用于编译渲染操作的执行逻辑。
    
-   **[影片渲染队列](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#movie-render-queue)（MRQ）**：你可以使用该工具创建预设和脚本，从而安排渲染进程，并在随后导出高质量图像。
    
-   [快速渲染](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#quick-render)：你可以使用该工具准备自定义设置并一键快速渲染项目。
    

## 影片渲染图表

**影片渲染图表**（**MRG**）是一种基于图形的工具，你可以用它来编译逻辑来与影片渲染管线交互，从而导出对内容的高质量渲染。 你可以用该图表指定待渲染帧、渲染设置以及导出文件的类型等。 你可以按需调整这些基于节点的图表的复杂程度，从而同时满足小型团队和大型团队的需求。

你也可以将图表设置为渲染单个镜头，或设计为在复杂的多镜头工作流程中扩展。 你还可以修改和保存这些图表，将其作为可重复使用的资产，从而强化制片管线的灵活性。

MRQ的旧版预设系统和新版MRG可以互换使用。 如需详细了解MRQ渲染设置，请参阅以下文档：

[

![渲染设置与格式](https://dev.epicgames.com/community/api/documentation/image/276c8352-e75a-48b8-a099-21a743d594b6?resizing_type=fit&width=640&height=640)

渲染设置与格式

使用MRQ和MRG的渲染设置和格式来自定义输出格式和视觉效果





](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine)

### 先决条件

-   在使用MRG之前，建议先熟悉[MRQ](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine?application_version=5.5)以及[渲染设置与格式](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine)。
    
-   你需要准备一个内含可渲染关卡序列的项目。 如果你的项目内不含可渲染的关卡序列，可以使用[Meerkat演示](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine)内含的**Main\_Seq**关卡序列作为示例。
    

[![内容浏览器显示关卡序列](https://dev.epicgames.com/community/api/documentation/image/a3d98923-219f-4893-993d-d7e5b127ea27?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a3d98923-219f-4893-993d-d7e5b127ea27?resizing_type=fit)

-   启用**影片渲染队列**[插件](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine)。 在**菜单栏**中找到**编辑（Edit）** > **插件（Plugins）**并在**渲染（Rendering）**分段下找到**影片渲染队列（Movie Render Queue）**插件，或使用搜索栏。 **启用**该插件并重启编辑器。
    

[![启用影片渲染队列插件](https://dev.epicgames.com/community/api/documentation/image/4eef0cb2-bc43-4049-96f8-f184fa2d9f9c?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/4eef0cb2-bc43-4049-96f8-f184fa2d9f9c?resizing_type=fit)

### 在项目设置中启用Alpha通道支持

以前，要想启用"Alpha输出支持"，你需要在项目设置中为**在后期处理中启用Alpha通道支持（试验性）（Enable Alpha Channel Support in Post-Processing (Experimental)）**属性在三个值中任选其一。 虚幻引擎5.5简化了这一过程，如今只用一个"Alpha输出（Alpha Output）"复选框。 Alpha输出复选框默认**关闭（Off）**，但某些模板会将其自动打开（如电影/电视/虚拟制片的模板）。 如需禁用Alpha输出，请在项目设置中操作。 在菜单栏中点击**编辑（Edit） > 项目设置（Project Settings）**，然后选择**引擎（Engine）** > **渲染（Rendering）**。 在之前的版本中，Alpha设置位于**后期处理（Post-Processing）**分段中，现在则位于**默认设置（Default Settings）**分段中。 点击选框以禁用**Alpha输出**。

[![项目设置中的Alpha输出设置](https://dev.epicgames.com/community/api/documentation/image/b9866665-c44a-47ca-958d-f1e5301c6ac6?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b9866665-c44a-47ca-958d-f1e5301c6ac6?resizing_type=fit)

项目设置中还新增了一个名为**支持图元Alpha维持（延迟）（Support Primitive Alpha Holdout (Deferred)）**的选项，必须启用此选项才能在延迟渲染器中启用维持。 电影/电视模板和示例将默认将其设为**开启（On）**，但如果游戏项目未使用维持（Holdout），则可以将其禁用，以避免对性能造成影响。 如果该项目设置被禁用，那么修饰符中设置维持（Holdout）时，MRG将通知用户。

### 打开影片渲染图表

你可通过影片渲染队列访问影片渲染图表。 要打开影片渲染队列，请执行以下步骤。

1.  在菜单栏中，点击**窗口（Window） > 过场动画（Cinematics）> 影片渲染队列（Movie Render Queue）**。 这将打开影片渲染队列窗口。
    
    [![打开影片渲染队列](https://dev.epicgames.com/community/api/documentation/image/aceffb31-3743-47e7-86b5-5a67391aa749?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/aceffb31-3743-47e7-86b5-5a67391aa749?resizing_type=fit)
    
    你也可以在Sequencer选项卡中访问影片渲染队列。点击**渲染影片（Render Movie）**按钮旁的省略号，即可展开**渲染影片选项（Render Movie Options）**。 选择**影片渲染队列（Movie Render Queue）**选项，然后点击**渲染影片（Render Movie）**按钮即可。
    
2.  点击**渲染（Render）**按钮并选择关卡序列。
    
    [![影片渲染队列窗口](https://dev.epicgames.com/community/api/documentation/image/70d9e741-28a4-42af-a7df-a26c4509aca7?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/70d9e741-28a4-42af-a7df-a26c4509aca7?resizing_type=fit)
    
3.  在**设置（Settings）**列中，点击**未保存配置（Unsaved Config）**旁的箭头，选择**用图表替换（Replace with Graph）（测试版）**。 在设置列中，这时设置列会显示**DefaultRenderGraph**。
    
    [![用图表替换未保存的配置](https://dev.epicgames.com/community/api/documentation/image/17cdb1d8-693a-4a61-9f99-97ae372ab376?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/17cdb1d8-693a-4a61-9f99-97ae372ab376?resizing_type=fit)
    
4.  点击DefaultRenderGraph旁边的箭头，选择**新图表（New Graph）**。 这将打开**保存资产（Save Asset）**窗口。
    
    [![使用新图表替换DefaultRenderGraph](https://dev.epicgames.com/community/api/documentation/image/bc8a3bed-f8d5-475c-b546-1cdfcd4426b4?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/bc8a3bed-f8d5-475c-b546-1cdfcd4426b4?resizing_type=fit)
    
5.  为图表命名并点击**保存（Save）**。 这时，你新建的影片渲染图表配置资产将出现在影片渲染队列设置（Movie Render Queue Settings）栏中，并被列为预设资产。
    
    [![你新建的MRG配置资产](https://dev.epicgames.com/community/api/documentation/image/91eca2db-41f4-43d6-b78f-90d2aa1ebf3f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/91eca2db-41f4-43d6-b78f-90d2aa1ebf3f?resizing_type=fit)
    
6.  点击设置（Settings）列中的MRG配置（MRG Config）资产，将其开以供编辑。
    
    [![影片渲染图表编辑器](https://dev.epicgames.com/community/api/documentation/image/eb9c42a0-bade-4f67-a00d-cabf76c0d511?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/eb9c42a0-bade-4f67-a00d-cabf76c0d511?resizing_type=fit)
    

## 影片渲染队列

**影片渲染队列**（**MRQ**）是一款工具，你可以在虚幻引擎中用该工具在影片渲染管线中批量排队和处理内容。 它专为高质量渲染图像、简化的生产管线集成以及用户可扩展性而构建。 通过设置、预设和脚本的组合，你可以使用MRQ手动导出内容的高质量图像和视频文件，或者自动执行渲染流程。

电影渲染队列支持多种用于生成高质量渲染的功能，例如它的时间子采样功能，使你能够生成高质量的径向动态模糊。 你还可以导出包含半透明像素值的图像（使用适当的项目/场景设置），生成具有线性数据的16位HDR图像，并将渲染配置保存到你可以重复使用和共享的资产中。 你可以使用渲染队列同时管理多个作业及其设置，同时渲染队列还支持批量运行渲染作业。

### 先决条件

-   你已经创建一个带有关卡序列的项目供你渲染。 如果你尚未创建项目，还可以使用**[Meerkat演示](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/meerkat-sample-project-for-unreal-engine)**。该演示是一个预制的内容示例。
    

### 打开影片渲染队列

你可以用两种不同的方式打开电影渲染队列（Movie Render Queue）窗口

1.  从虚幻引擎的主菜单栏前往**窗口（Window） > 过场动画（Cinematics）> 影片渲染队列（Movie Render Queue）**。
    
2.  在**Sequencer**中，点击工具栏中**渲染影片（Render Movie）**按钮旁的垂直省略号，然后从下拉菜单中选择**影片渲染队列（Movie Render Queue）**，再点击**渲染影片（Render Movie）**按钮。
    
    [![打开影片渲染队列](https://dev.epicgames.com/community/api/documentation/image/24c49732-926d-4031-ac0c-05b502e5928a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/24c49732-926d-4031-ac0c-05b502e5928a?resizing_type=fit)
    

按上述两种方式之一操作后，电影渲染队列（Movie Render Queue）窗口将打开。

[![影片渲染队列窗口](https://dev.epicgames.com/community/api/documentation/image/f07145c4-6471-4ee4-8d0a-afc01375cb3d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/f07145c4-6471-4ee4-8d0a-afc01375cb3d?resizing_type=fit)

*点击图像查看大图。*

### 界面概览

电影渲染队列界面由四个主要区域组成：

[![影片渲染队列界面](https://dev.epicgames.com/community/api/documentation/image/c686c2d3-216e-4944-9601-de73f0ed7921?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c686c2d3-216e-4944-9601-de73f0ed7921?resizing_type=fit)

1.  [工具栏](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine?application_version=5.5#toolbar)：包含用于添加或删除渲染作业以及加载或保存当前作业列表的菜单。
    
2.  [作业](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine?application_version=5.5#jobs)：按排队顺序显示要渲染的序列。 列表中的每个顶层项目都被视为作业。 这些项目还包含每个作业的配置设置。
    
3.  [作业细节](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine?application_version=5.5)：所选作业的细节。 列出名称、关卡序列资产、作业期间要运行的关卡以及此作业的作者。
    
4.  [开始渲染](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine?application_version=5.5)：在你的机器上本地启动渲染，或在你机器上的单独进程中启动渲染。
    

#### 工具栏

工具栏包含用于添加和删除作业的菜单。 要将新序列添加到渲染队列，请点击**\+ 渲染（+ Render）**按钮并选择一项**关卡序列（Level Sequence）资产**。 将序列从内容浏览器拖到作业区域，也可以将序列添加到你的作业列表中。

[![添加渲染作业](https://dev.epicgames.com/community/api/documentation/image/a68f16f7-80c7-446f-897e-6bffce25ecc8?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/a68f16f7-80c7-446f-897e-6bffce25ecc8?resizing_type=fit)

要从作业列表中删除序列，请选择一项作业并点击工具栏上的 **\-** 按钮，或按键盘上的Delete键

你还可以在工具栏中将当前作业列表保存为**队列预设（Queue Preset）**资产。 点击**未保存队列（Unsaved Queue）**按钮，然后选择**将队列另存为（Save Queue As）**。 然后，系统将提示你为**影片管线队列（Movie Pipeline Queue）**资产命名，并将其保存在项目中的某处。

[![保存渲染队列预设](https://dev.epicgames.com/community/api/documentation/image/69ff1d10-cf74-4ae5-9bdf-37bfa82bd74d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/69ff1d10-cf74-4ae5-9bdf-37bfa82bd74d?resizing_type=fit)

此时，**未保存队列**按钮的文本将更变为你的影片管线队列资产的名称。

你所创建的所有影片管线队列资产都会列在此菜单下。 选择队列资产即可让作业列表匹配已保存的预设。 这会将队列的副本导入作业区。 对作业列表所做的更改不会影响资产，除非你在此菜单中选择**保存队列（Save Queue）**对其进行保存。

[![保存渲染队列重载项](https://dev.epicgames.com/community/api/documentation/image/b3b85a13-6205-4668-810c-dff15a670009?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/b3b85a13-6205-4668-810c-dff15a670009?resizing_type=fit)

#### 作业

作业区域包含将渲染的关卡序列列表，以及它们的渲染设置和输出目录。

点击作业的**设置（Settings）**条目即可打开设置窗口，你可以在其中指定渲染设置、输出目录以及导出格式。

[![影片渲染设置](https://dev.epicgames.com/community/api/documentation/image/cfe80715-b6db-4734-bf75-90a6247045ae?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cfe80715-b6db-4734-bf75-90a6247045ae?resizing_type=fit)

在该窗口的主工具栏中，点击**+设置（+ Setting）**按钮即可打开设置列表。 点击某个设置即可打开或关闭该渲染配置。 然后你就可以进一步配置该设置。

点击**未保存配置（Unsaved Config）**按钮并选择一项预设，即可为你的作业应用已保存的预设。

作业的**输出（Output）**条目是一个链接，指向你的图像或视频将要渲染到的文件夹，即输出设置所规定的位置。 点击此处即可打开一个以该文件夹为目标的**文件资源管理器（File Explorer）**窗口。

[![渲染目录浏览器](https://dev.epicgames.com/community/api/documentation/image/94a5443f-4a81-4d6a-b117-04fd4f2234c1?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/94a5443f-4a81-4d6a-b117-04fd4f2234c1?resizing_type=fit)

如需了解如何定制渲染，请访问**[渲染设置与格式](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-render-settings-and-formats-in-unreal-engine)**页面。

#### 作业细节

选择作业后，你可以在作业细节区域查看其细节。

[![渲染作业细节](https://dev.epicgames.com/community/api/documentation/image/e94bfd97-a066-45e8-ab1f-89497822fb37?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e94bfd97-a066-45e8-ab1f-89497822fb37?resizing_type=fit)

此区域列出了所选作业的以下字段：

名称

说明

**作业名称（Job Name）**

作业的名称。 默认设置为关卡序列资产的名称，但可以修改。 默认的**烧入（Burn In）**覆层中也会显示**作业名称**字段。

**序列（Sequence）**

序列资产引用。 如果要为作业指定不同的序列，你可以在此处更改引用序列的顺序。

**地图（Map）**

渲染时要运行的关卡。 如果你的序列使用了**[可生成对象](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics)**，那么你将可以在不同的关卡中渲染同一个场景。

**作者（Author）**

作业作者。 此字段会使用你的操作系统用户名自动填充。

**注释（Comment）**

可选的注释字段。 此字段会使用你的操作系统用户名自动填充。

#### 开始渲染

你可以点击两个按钮开始渲染：

-   点击**渲染（本地）（Render (Local)）**，使用与虚幻引擎相同的进程渲染，并启动[在编辑器中运行](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine)会话进行渲染。 执行本地渲染时，你无需保存更改。
    
-   点击**渲染（远程）（Render (Remote)）**，启动一个单独的进程来渲染你的作业。 你必须将更改保存在项目中，外部进程才可以从磁盘读取保存的文件。
    

**远程（Remote）**选项可用于实现远程渲染农场。 渲染选项的默认行为由**[项目设置](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/project-settings-in-unreal-engine)**决定，并且可以调整以运行你自己的代码，而这对你使用第三方渲染农场管理软件能有所帮助。 此外，用于启动远程渲染过程的命令将写入输出日志，在构建你自己的自动渲染农场时，这可以用作参考。

因为你在**作业细节**中指定了要渲染的**关卡**资产，所以渲染时不需要打开同一个关卡。 运行渲染作业时，影片渲染队列将自动打开指定的关卡。

### 渲染预览

当渲染作业运行时，电影渲染队列将显示渲染预览窗口，向你展示渲染的当前视觉效果状态以及相关信息。 渲染完成后预览窗口将自动关闭。

[![渲染预览](https://dev.epicgames.com/community/api/documentation/image/81ea180b-c795-40b1-ab7c-dc4dd620b7ec?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/81ea180b-c795-40b1-ab7c-dc4dd620b7ec?resizing_type=fit)

1.  **渲染预览（Render Preview）**：此视图将显示渲染的当前视觉效果状态。 由于每一帧都显示在此处，它们也将保存到你的输出目录中。 此处的预览基于你的GPU的最新示例数据，并且可能以低于最终渲染的质量显示。 如果你为渲染启用了平铺（Tiling），则预览将仅显示右下角平铺。
    
2.  **整体渲染进度（Overall Render Progress）**：这些细节将显示被渲染的当前序列、整体进度、耗时和预估剩余时间。
    
3.  **当前镜头切换进度（Current Camera Cut Progress）**：这些细节将显示当前被渲染的摄像机，以及当前镜头切换的进度。
    

### 创建基本渲染

你可以按照以下步骤创建电影序列的基本渲染。

#### 作业设置

1.  打开影片渲染队列工具。 从主菜单栏前往**窗口（Window）> 过场动画（Cinematics）> 影片渲染队列（Movie Render Queue）**。
    
2.  点击**+渲染（+ Render）**按钮并选择你的序列，将你的序列资产添加到作业列表中。
    
    [![添加渲染作业](https://dev.epicgames.com/community/api/documentation/image/33402680-1ec3-442b-84bd-4f24a425753d?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/33402680-1ec3-442b-84bd-4f24a425753d?resizing_type=fit)
    
3.  请确保在**地图（Map）**属性中设置了正确的关卡。
    
    [![地图设置渲染](https://dev.epicgames.com/community/api/documentation/image/9f0299af-4be5-44e6-81dd-bb926d20df34?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/9f0299af-4be5-44e6-81dd-bb926d20df34?resizing_type=fit)
    

#### 输出设置

添加序列后，你可能需要调整一些输出设置，例如目标文件夹、分辨率和文件类型。

在**设置（Settings）**列中，点击**未保存配置（Unsaved Config）**，打开该作业的**渲染设置（Render Settings）**窗口。

[![打开影片渲染队列设置](https://dev.epicgames.com/community/api/documentation/image/1ca8d9b6-6806-44f4-86d3-08c1d09de0e3?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1ca8d9b6-6806-44f4-86d3-08c1d09de0e3?resizing_type=fit)

默认情况下，电影渲染队列将渲染为一系列.jpg图像。 如需更改此设置，请删除**jpg Sequence \[8bit\]**条目，然后点击**+设置（+ Setting）**按钮，选择不同的输出格式。

选择**.jpg Sequence 8bit\]**条目并按**删除（Delete）**，然后点击**+设置（+ Setting）**按钮并选择**.png Sequence \[8bit\]**。

[![影片渲染队列PNG序列](https://dev.epicgames.com/community/api/documentation/image/e461f772-fdb1-4836-9816-140825b2dc9b?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/e461f772-fdb1-4836-9816-140825b2dc9b?resizing_type=fit)

**延迟渲染（Deferred Rendering）**条目会让输出渲染你在视口中看到的确切图像。 对这样的基本渲染，你可以按原样保留设置，但它**必须**在此处存在，这样你的图像才能被渲染。

[![延迟渲染](https://dev.epicgames.com/community/api/documentation/image/27f6fd95-ec1f-40fb-aa72-1d0353731200?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/27f6fd95-ec1f-40fb-aa72-1d0353731200?resizing_type=fit)

点击**输出（Output）**即可显示典型的输出相关设置，例如文件名、目录和分辨率等。

要更改输出目录（Output Directory）字段，请点击条目旁边的**…** 按钮，找到新文件夹，然后按**选择文件夹（Select Folder）**。 你的图像序列现在将在此处输出。

[![渲染输出设置](https://dev.epicgames.com/community/api/documentation/image/c45a4ea1-8978-4a0b-93df-5171a8a8f078?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/c45a4ea1-8978-4a0b-93df-5171a8a8f078?resizing_type=fit)

完成更改后，关闭**渲染设置（Render Settings）**窗口。

#### 渲染

现在你可以渲染你的序列。

点击**渲染（本地）（Render (Local)）**开始序列的渲染作业。 **[渲染预览](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine?application_version=5.5#render-preview)**窗口将显示当前渲染进度。

[![本地移动渲染](https://dev.epicgames.com/community/api/documentation/image/910d33eb-0210-4543-9204-23914665664f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/910d33eb-0210-4543-9204-23914665664f?resizing_type=fit)

渲染完成后，预览窗口将关闭。 现在点击作业的链接输出文本，你可以找到输出文件夹并查看输出图像序列。

### 蓝图中的应用

你可以使用**影片渲染队列（Movie Render Queue）**在运行时构建中渲染影片，并使用**蓝图（Blueprints）**将文件输出到用户的计算机。 访问**[运行时构建中的电影渲染队列](https://dev.epicgames.com/documentation/zh-cn/unreal-engine/movie-render-queue-in-runtime-in-unreal-engine)**以了解详情。

## 快速渲染

**快速渲染**工具可快速导出项目的实时渲染，以便直观地查看和审查你的工作。 快速渲染适用于不需要对渲染设置进行大量调整的工作流程，例如动画和建筑可视化等。

要激活快速渲染工具，请执行以下步骤：

1.  在主工具栏中，点击茶壶按钮旁的三点号（⋮）。
    
2.  选择快速渲染模式。
    

[![下拉菜单中的快速渲染选项](https://dev.epicgames.com/community/api/documentation/image/57999be0-8282-41b8-b7b2-1d329ff3f53a?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/57999be0-8282-41b8-b7b2-1d329ff3f53a?resizing_type=fit)

这时只要你点击**茶壶（Teapot）**按钮时，快速渲染工具就会生成项目的渲染图。 更改渲染类型，只需点击**三点号（⋮）**按钮并选择以下渲染选项之一：

-   **当前序列（Current Sequence）：**渲染当前关卡序列。此选项要求打开Sequencer并加载一项关卡序列。
    
-   **当前视口（Current Viewport）**：渲染一张编辑器视口中当前视图的静态图像。
    
-   **所选摄像机（Selected Camera(s)）**：渲染一个或多个所选摄像机的静态图像。此选项要求你在大纲视图中选择一个或多个摄像机。
    
-   **在序列中使用视口摄像机（Use Viewport Camera in Sequence）**：使用编辑器视口中的视图作为摄像机，渲染在Sequencer中打开的关卡序列。 此选项要求打开Sequencer并加载一项关卡序列。
    

### 快速渲染设置

你可以更改快速渲染的设置，同时每个渲染选项都可以使用单独的设置。

要打开快速渲染的设置项，请执行以下步骤：

1.  在主工具栏中，点击**茶壶（Teapot）**按钮旁的**三点号（⋮）**按钮。
    
2.  点击**快速渲染设置（Quick Render Settings）**。
    

[![菜单中的快速渲染设置选项。](https://dev.epicgames.com/community/api/documentation/image/8ecf9075-c3c3-46d3-bbb2-1e6494ce861f?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/8ecf9075-c3c3-46d3-bbb2-1e6494ce861f?resizing_type=fit)

快速渲染设置窗口顶部有一个下拉菜单，可让你选择要配置的渲染选项。点击蓝色的**快速渲染（Quick Render）**按钮即可开始渲染，并将所选的渲染选项记为**主工具栏**中的选定选项。

[![快速渲染设置窗口](https://dev.epicgames.com/community/api/documentation/image/7730f32b-d315-4c64-a02c-f7650b486c43?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/7730f32b-d315-4c64-a02c-f7650b486c43?resizing_type=fit)

你可以在影片管线的项目设置中更改影片渲染图表的默认配置。 你在快速渲染设置中选择的选项将优先于图形配置所设的选项。 如果图形配置公开了变量，那么这些变量会出现在设置列表的**主要图表变量（Primary Graph Variables）**类别中。 你还可以在使用快速渲染时重载这些变量。

**渲染后（After Render）**设置项给出了三个选项：

-   **播放渲染输出（Play Render Output）：**请参阅"播放渲染输出"小节。
    
-   **打开输出目录（Open Output Directory）**：自动打开输出目录，让用户可以轻松访问磁盘上的渲染输出。
    
-   **无操作（Do Nothing）**：什么也不做，停留在虚幻引擎编辑器中。
    

启用**应用视口外观（Apply Viewport Look）**后，你可以在快速渲染中看到以下编辑器设置项：

-   **OCIO（OpenColorIO）：**在编辑器视口中设置后，OCIO将以与编辑器视口相同的设置被添加到图表配置中的所有输出类型节点中。
    
-   **显示标记（Show Flags）**：任何已启用的显示标记都将在最终的快速渲染输出中启用。
    
-   **视图模式（View Mode）**：任何已启用的视图模式都将在最终的快速渲染输出中启用。
    
-   **可视性（Visibility）**：编辑器中可见的内容将始终出现在最终的快速渲染输出中，具体包括以下内容：
    
    -   即使启用了"在游戏中隐藏Actor（Actor Hidden in Game）"，编辑器中可见的Actor也会在渲染中出现。
        
    -   不论流送方式是什么，在编辑器中可见的关卡都会被加载到渲染中。
        
    -   只要Sequencer处于打开状态，在编辑器中可见的可生成对象Actor就会出现。 这主要适用于不需要使用序列的**当前视口（Current Viewport）**和**选定摄像机（Selected Camera(s)）**选项。
        
    -   只要动画模式中未启用**隐藏控制形状（Hide Control Shapes）**，在编辑器中可见的**控制绑定**小工具就会出现。
        
        [![隐藏控制形状选项](https://dev.epicgames.com/community/api/documentation/image/cbf3244e-9ced-49d0-8ab6-4f8f4e16d2b2?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/cbf3244e-9ced-49d0-8ab6-4f8f4e16d2b2?resizing_type=fit)
        
-   **显示纯编辑器Actor（Show Editor-Only Actors）**：为动画审查进行渲染时，有时也需要显示通常而言仅限在编辑器中查看的内容。 启用后，将显示以下内容：
    
    -   公告板
        
    -   摄像机
        
    -   摄像机摇臂
        
    -   摄像机绑定导轨
        
    -   摄像机视锥体（要求启用**摄像机视锥体的显示标记（Show Flag for Camera Frustums）**）
        
        [![编辑器视口中显示的摄像机视锥体](https://dev.epicgames.com/community/api/documentation/image/67fd5212-0b96-4a74-a92d-5b2d274ee576?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/67fd5212-0b96-4a74-a92d-5b2d274ee576?resizing_type=fit)
        

快速渲染还提供三个选项，用于在使用关卡序列（而不是静态图像）时决定要渲染的帧范围：

-   **播放范围（Playback Range）**：Sequencer中关卡序列的整体播放范围。
    
-   **选择范围（Selection Range）**：Sequencer中的当前选择范围。 如果已在子序列中设置，那么快速渲染会将其映射到父序列。
    
-   **自定义（Custom）**：使用影片渲染图表配置中定义的**帧范围变量**，用自定义值重载开始帧和结束帧。
    

#### 播放渲染输出

**播放渲染输出（Play Render Output）**设置会在你所选的查看程序中自动播放渲染后的媒体。 具体选择位置见**编辑器偏好设置（Editor Preferences）** > **插件：影片渲染图表（Plugin: Movie Render Graph）**，可以按用户设置。

要打开影片渲染图表插件的设置项，请点击**快速渲染设置（Quick Render Settings）**窗口中**渲染后（After Render）**下拉菜单旁的按钮。

[![快速渲染设置中可打开编辑器偏好设置的按钮](https://dev.epicgames.com/community/api/documentation/image/1828fe67-6d26-4a15-b08f-8be16d3a42eb?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/1828fe67-6d26-4a15-b08f-8be16d3a42eb?resizing_type=fit)

播放渲染输出（Play Render Output）的设置项包括了一个**输出类型优先顺序（Output Type Priority Order）**的数组。 当存在多个渲染输出类型时，你可以定义输出类型的播放层级，从而防止相同的内容出现多次。 你可以使用拖放功能重新排列输出类型，还可以添加其他格式，比如命令行编码器生成的格式。

[![播放渲染输出设置项](https://dev.epicgames.com/community/api/documentation/image/2f35ae82-a697-45c6-a032-db907f9807bc?resizing_type=fit)](https://dev.epicgames.com/community/api/documentation/image/2f35ae82-a697-45c6-a032-db907f9807bc?resizing_type=fit)

默认情况下，**输出类型播放（Output Type Playback）**将被设为**使用优先顺序（Use Priority Order）**，但如果你需要播放所有渲染输出，你也可以将其切换为**播放所有输出类型（Play All Output Types）**。

由于虚幻引擎没有原生的图像查看工具，因此你必须使用外部的查看程序。**播放方法（Playback Method）**使用**操作系统（Operating System）**作为默认设置，并执行相当于从磁盘打开文件的操作。 你可以提供播放器可执行文件的路径（无论具体安装位置在哪里），将**播放方法**设置为**自定义查看器（Custom Viewer）**。 用户可以根据自己所选的自定义查看器设置**额外的命令行参数**。 不同的查看程序可能会使用不同的帧号语法，而系统对此进行了相应的处理，即通过**帧号标注（Frame Number Notation）**属性提供了以下选项：

-   **有开始帧/结束帧的编号（# with Start/End Frame）**：针对RV和xStudio使用此项。
    
-   **无开始帧/结束帧的编号（# without Start/End Frame）**：针对DJV和HieroPlayer使用此项。
    
-   **$F**：针对mPlay使用此项。
    
-   **开始帧（Start Frame）**：针对mrViewer和Cinesync使用此项。
    

由于操作系统的图像序列播放能力有限，因此我们还提供了三个额外的设置，供你更改操作系统或自定义查看器可以播放的内容：

-   **播放范围（Playback Range）**：若设为**操作系统（Operating System）**，则系统将只能使用**第一帧**，但**自定义查看器**也可以播放图像序列的**全部范围**。
    
-   **作业播放（Job Playback）**：当渲染中存在多个作业时，操作系统只能播放**第一个作业**的内容，但**自定义查看器**可以播放**所有作业**。
    
-   **渲染层播放（Render Layer Playback）**：当渲染中存在多个渲染层时，操作系统只能播放**第一个渲染层**的内容，但**自定义查看器**可以播放**所有渲染层**。
    

为处理编码解码器支持和命令行参数自定义选项方面的差异，"播放渲染输出（Play Render Output）设置项"允许你为图像序列和影片分别配置不同的查看程序。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [movie render queue](https://dev.epicgames.com/community/search?query=movie%20render%20queue)
-   [render](https://dev.epicgames.com/community/search?query=render)
-   [movie render graph](https://dev.epicgames.com/community/search?query=movie%20render%20graph)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [影片渲染图表](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#movie-render-graph)
-   [先决条件](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#prerequisites)
-   [在项目设置中启用Alpha通道支持](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#enabling-alpha-channel-support-in-project-settings)
-   [打开影片渲染图表](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#opening-the-movie-render-graph)
-   [影片渲染队列](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#movie-render-queue)
-   [先决条件](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#prerequisites)
-   [打开影片渲染队列](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#opening-movie-render-queue)
-   [界面概览](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#interface-overview)
-   [工具栏](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#toolbar)
-   [作业](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#jobs)
-   [作业细节](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#job-details)
-   [开始渲染](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#start-render)
-   [渲染预览](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#render-preview)
-   [创建基本渲染](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#creating-a-basic-render)
-   [作业设置](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#job-setup)
-   [输出设置](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#output-settings)
-   [渲染](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#render)
-   [蓝图中的应用](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#usage-in-blueprints)
-   [快速渲染](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#quick-render)
-   [快速渲染设置](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#%E5%BF%AB%E9%80%9F%E6%B8%B2%E6%9F%93%E8%AE%BE%E7%BD%AE)
-   [播放渲染输出](/documentation/zh-cn/unreal-engine/movie-render-pipeline-in-unreal-engine#%E6%92%AD%E6%94%BE%E6%B8%B2%E6%9F%93%E8%BE%93%E5%87%BA)