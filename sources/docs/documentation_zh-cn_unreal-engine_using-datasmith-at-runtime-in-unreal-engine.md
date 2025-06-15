# 运行时使用虚幻引擎中的Datasmith | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:04:42.590Z

---

目录

![运行时使用Datasmith](https://dev.epicgames.com/community/api/documentation/image/f2bebd19-9b3a-4078-88dd-d2a422ae7d7f?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

## 什么是Datasmith运行时

**Datasmith运行时（Datasmith Runtime）** 是一组在基于虚幻引擎的应用程序中运行时（与编辑器中的工作流相对）可用的Datasmith功能。你可以使用这些功能创建可以导入 `.udatasmith` 文件并使用蓝图操作它们的应用程序。

![协作查看器直接链接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b4a47b5-ea85-4653-8f09-bfb696e55c85/collabviewer_directlink.png "Direct Link in the Collab Viewer Template")

在使用Datasmith运行时和蓝图的基于虚幻引擎的烘焙应用程序中，可以访问Datasmith直接链接。

你可以使用Datasmith运行时创建利用[Datasmith Direct Link](/documentation/zh-cn/unreal-engine/using-datasmith-direct-link-in-unreal-engine)的自定义应用程序，或者将Datasmith数据作为迭代3D工作流程的一部分按需可视化。

在你的项目中启用以下插件，以使用Datasmith运行时：

-   Datasmith内容（Datasmith Content）
-   Datasmith导入器（Datasmith Importer）
-   Datasmith运行时（Datasmith Runtime）

使用Windows和MacOS的虚幻引擎4和虚幻引擎5正式支持Datasmith运行时。虽然Datasmith运行时可以用于Linux，但是目前处于试验性阶段，你可能会遇到运行不稳定和性能方面的问题。

## 将Datasmith运行时与蓝图结合使用

Datasmith运行时将使用多个蓝图节点公开各种Datasmith功能和导入选项。下面列出的是最常见的部分：

![运行时节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/236f5b76-4634-4be3-ae89-5d16d4a83931/runtime-nodes.png "The most common Datasmith Runtime Blueprint nodes")

最常见的Datasmith运行时蓝图节点。

### 构造Datasmith运行时导入选项

公开几个导入参数，并将其转换为数据结构：

![构造Datasmith运行时导入选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8138bf33-0726-4ee2-994f-23fd2daec62a/5-0-020-datasmith-runtime-options-node.png "The Make Datasmith Runtime Import Options node")

**输入**

**说明**

**构建层级（Build Hierarchy）**

确定是否构建了Actor的层级。选择细节更丰富的层级会增加加载和渲染时间。

-   **无（None）** ：使用存储在Datasmith运行时Actor中的层级导入源内容。你的内容将不会呈现在世界大纲视图中。
-   **简化（Simplified）** ：导入源内容，同时最大程度地减少创建的Actor的数量。允许公开对象，以便应用程序可以修改它们的属性，同时限制由于场景中Actor较多导致的绘制调用数量。
-   **未筛选（Unfiltered）** ：导入具有完整层级的源内容。

**构建碰撞（Build Collision）**

确定用于组件的碰撞类型。

-   **无碰撞（No Collision）** ：在物理引擎中没有任何呈现。提供最佳性能。
-   **仅查询（无物理碰撞）（Query Only（No Physical Collision））** ：仅使用空间查询。适用于不需要物理模拟的对象，例如Pawn导航。改进性能。
-   **仅物理（无查询碰撞）（Physics Only（No Query Collision））** ：仅使用物理仿真。适用于不需要空间查询的对象。改进性能。
-   **启用碰撞（查询和物理）（Collision Enabled（Query and Physics））** ：同时使用空间查询和物理模拟。

**碰撞类型（Collision Type）**

确定用于静态网格体的碰撞类型。

-   **项目默认值（Project Default）** ：使用项目的物理设置。
-   **简单和复杂（Simple and Complex）** ：同时使用简单和复杂的形状。简单的形状用于常规场景查询和碰撞。复杂的（逐个精度）形状用于复杂的场景查询。
-   **将简单碰撞形状用作复杂形状（Use Simple Collision as Complex）** ：对所有场景查询和碰撞测试仅使用简单形状。
-   **将复杂碰撞形状用作简单形状（Use Complex Collision as Simple）** ：对所有场景查询和碰撞测试使用复杂的（逐个精度）形状。仅用于静态形状的模拟。如果在导航场景时需要精确碰撞，则可能必要。

**导入元数据（Import Metadata）**

读取并导入Actor的元数据。增加加载时间。

当前未启用 **曲面细分（Tesselation Options）** 输入。

### 设置导入选项

使用 **Datasmith运行时Actor（Datasmith Runtime Actor）** 为Datasmith内容设置所选导入选项的值。将Datasmith运行时Actor作为 **目标（Target）** 和 **Datasmith运行时导入选项（Datasmith Runtime Import Options）** ，如同其值一样。

![Set Import Options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4102e507-c172-4c56-87c4-ea22df4b14dd/5-0-030-datasmith-import-options-node.png "The Set Import Options node")

### 加载文件（Load File）

加载位于指定文件路径的 `.udatasmith` 文件。需要 **文件路径（File Path）** 和 **Datasmith运行时Actor（Datasmith Runtime Actor）** 作为输入。

![加载文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/64cdfa72-17d0-450b-9bea-a5a53d01ec5d/5-0-040-datasmith-load-file-node.png "The Load File node")

### 从浏览器加载文件

打开文件浏览器窗口，以便你可以浏览到某个位置，并选择 `.udatasmith` 文件。需要 **Datasmith运行时Actor（Datasmith Runtime Actor）** 作为输入。**默认文件路径（Default File Path）** 是可选项。

![从浏览器加载文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35e534f3-5ea9-4e8b-8dd2-ea8ebdfd4702/5-0-050-datasmith-load-file-from-explorer-node.png "The Load File from Explorer")

虽然在编辑器中运行（PIE）时，它适用于Windows和Mac操作系统，但是从浏览器加载文件运行时，仅适用于Windows。

### 获取直接链接代理

将接口返回到称为直接链接代理（Direct Link Proxy）的 **直接链接（Direct Link）** 连接。这是创建 **Datasmith直接链接（Datasmith Direct Link）** 连接的第一步。

!\[[获取直接链接代理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45edaef4-725d-4269-a73d-92ac5a387ecd/5-0-060-datasmith-get-direct-link-proxy-node.png "The Get Direct Link Proxy node")

### 获取源列表

获取Datasmith直接链接源列表。需要 **直接链接代理（Direct Link Proxy）** 作为输入。

![直接链接获取源列表](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d481bd20-3716-4349-9dc1-87f98db5a22b/5-0-070-datasmith-get-list-of-sources-node.png "The Get List of Sources node")

### 通过索引打开连接

通过位于指定索引值的源打开直接链接连接。需要 **Datasmith运行时Actor（Datasmith Runtime Actor）** 和 **源索引（Source Index）** 作为输入。

![通过索引打开连接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8dffc795-6951-4b59-8da2-bb778ce772f2/5-0-080-datasmith-open-connection-with-index-node.png "The Open Connection with Index node")

### 关闭连接

关闭与指定 **Datasmith运行时Actor（Datasmith Runtime Actor）** 关联的已打开直接链接连接。

![关闭连接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dfa24bf2-af1d-4436-967f-6af6d8eabc83/5-0-090-datasmith-close-connection-node.png "The Close Connection node")

## 运行时加载Datasmith内容

使用Datasmith运行时，你可以在烘焙的应用程序中加载Datasmith内容，同时可以访问层级和Actor属性。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e4dd9ee-d58b-4984-b08d-ac2a1808b4ff/5-0-100-spawn-datasmith-runtime-object-graph.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0e4dd9ee-d58b-4984-b08d-ac2a1808b4ff/5-0-100-spawn-datasmith-runtime-object-graph.png)

点击查看大图。

使用蓝图加载Datasmith内容：

1.  创建新的 **Actor蓝图（Actor Blueprint）** ，以便包含Datasmith内容的锚点。右键点击 **内容浏览器（Content Browser）** ，并从上下文菜单中选择 **蓝图类（Blueprint Class）** 即可创建。在 **选取父类（Pick Parent Class）** 窗口中，选择 **Actor** ，并将新的蓝图类命名为 **DatasmithActor** 。双击该新蓝图，打开编辑器。
    
    ![选取父类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d244dfee-defa-4e11-b475-0d4f5b5ef334/5-0-110-create-actor.png "Pick Parent Class menu")
    
    该锚点将作为导入的Datasmith内容的原点。如果你的内容与源应用程序中的原点存在偏移，则虚幻引擎将在导入内容时保持与锚点的偏移。
    
2.  选择 **事件图表（Event Graph）** 选项卡，并删除事件 **BeginPlay** 之外的所有事件。从事件BeginPlay（Event BeginPlay）中拖出连接，并添加 **Spawn Actor From Class** 节点。打开 **类（Class）** 下拉菜单，并选择 **DatasmithRuntimeActor** 。将 **返回值（Return Value）** 提升为变量，并将其命名为 **Anchor** 。
    
    ![运行时生成Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d07951e0-31bc-437e-8e64-de85a54726b8/5-0-120-spawn-datasmith-actor.png "Using Spawn Actor From Class to spawn the Anchor at Runtime")
3.  **生成Actor（Spawn Actor）** 需要变换来生成锚点。右键点击Spawn Actor的左侧，添加 **Make Transform** 节点。将Make Transform的输出连接到Spawn Actor上的 **生成变换（Spawn Transform）** 引脚。
    
    ![构造变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4782ebb-a076-42c1-ab1d-311e295fc940/5-0-130-add-make-transform-node.png "Adding the Make Transform node")
4.  要完成蓝图，请点击 **Set** 节点的执行引脚并拖动，然后添加 **Load File from Explorer** 节点。将 **锚点（Anchor）** 变量的引用连接到 **Datasmith运行时Actor（Datasmith Runtime Actor）** 输入。
    
    ![运行时加载Datasmith](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74b02f02-e80d-4c9b-a379-bbaa0133d78b/5-0-140-add-load-file-from-explorer.png "Finishing the Blueprint with the Load File From Explorer node.")
5.  **保存（Save）** 并 **编译（Compile）** 蓝图。将锚点蓝图（Anchor Blueprint）的副本添加到关卡中，然后按 **播放（Play）** 进行测试。
    

虚幻引擎将打开文件资源管理器（File Explorer）窗口，并要求你选择文件。

## 使用蓝图创建Datasmith直接链接

你还可以在运行时使用Datasmith运行时打开位于一个或多个源应用程序与虚幻引擎项目之间的Datasmith直接链接。

1.  首先，创建新的 **Actor** 蓝图（Blueprint），以便包含Datasmith内容的锚点。双击该新蓝图，打开编辑器。
2.  与前面的示例类似，选择 **事件图表（Event Graph）** 的选项卡，并删除 **事件BeginPlay（Event BeginPlay）** 之外的所有事件。从事件BeginPlay（Event BeginPlay）中拖移连接，并添加 **Spawn Actor From Class** 节点。打开 **类（Class）** 下拉菜单，并选择 **DatasmithRuntimeActor** 。
3.  需要变换才能生成锚点。右键点击Spawn Actor的左侧，添加 **Make Transform** 节点。将Make Transform的输出连接到Spawn Actor上的 **生成变换（Spawn Transform）** 引脚。
    
    ![构造变换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/702ebb01-401f-4239-96c1-dfbdaf8314bb/5-0-150-spawn-datasmith-actor-and-attach-transform.png "Adding the Make Transform node")
4.  然后，你需要将 **直接链接代理（Direct Link Proxy）** 作为你的应用程序和源应用程序之间的连接点。从 **Set** 节点拖动连接，并创建 **Get Direct Link Proxy**。将输出提升为变量，并将其命名为 **Direct Link Sources Proxy** 。将其设置为公开（Public）。
    
    ![Load Direct Link Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b77d3fa-c025-4518-812c-60e15e6ec720/5-0-160-get-direct-link-proxy-blueprint.png "Adding the Direct Link Proxy node.")
5.  点击 **我的蓝图（My Blueprints）** 面板的 **函数（Functions）** 分段中的 **+** 按钮，创建新函数。将其命名为 **DirectLinkUpdate** 。你将使用此新函数在运行时触发直接链接连接。
    
    ![创建新蓝图函数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d8ca740-a504-49ca-acb6-1e797950959b/5-0-170-create-direct-link-update-function.png "Creating a new Blueprint Function")
6.  首先，获取 **直接链接代理（Direct Link Proxy）** 变量的副本。从变量拖出一条线，并创建 **Get List of Sources** 节点。将输出提升到变量，保存直接链接源的列表，并将此变量设为公开。
    
    ![Get List of Sources](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b3da9a2-280f-4a58-a59f-7a8e789b4683/5-0-180-direct-link-get-sources.png "Adding Get List of Sources node.")
7.  从 **Set** 拖出一条线，并创建 **Set Import Options** 节点。在连接到直接链接源之前，使用此节点设置一些导入选项。它需要Datasmith运行时导入选项和锚点作为输入。
    
    ![Set Import Options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21c140c8-ad1f-4ccb-8ed2-a0db90ef33a8/5-0-190-direct-link-set-import-options.png "Adding the Set Import Options node.")
8.  右键点击并创建 **Make Datasmith Runtime Import Options** 节点，然后将连接从输出拖到 **导入选项（Import Options）** 输入。
    
    ![Make Import Options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad0b36d4-df17-47ad-b49a-ec2420f08131/5-0-200-direct-link-make-datasmith-runtime-import-options.png "Making the import options used by the Direct Link connection.")
9.  从Set Import Options节点中拖出一条线，并创建 **Open Connection with Index** 节点来完成该函数。这需要锚点和 **源索引（Source Index）** 作为输入。将锚点的引用连接到目标输入。
    
    ![通过索引打开连接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48139077-464b-4703-a138-ec0a784cbee9/5-0-210-direct-link-open-connection-with-index.png "Using the Open Connection with Index node.")
10.  单击"变量（Variables）"旁边的加号 **(+)** 以创建一个新变量。将该变量命名为 **SourceIndex**，并使其类型为整型。
    
    ![Adding a Source Index](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8f85b24-04d6-4680-b708-10392bf036c6/5-0-215-add-source-index-variable.png "Adding a Source Index")
11.  将这个新变量连接到 **通过索引打开连接（Open Connection with Index）** 节点上的 **源索引（Source Index）** 输入。索引值为0时将连接到列表中的第一个源。
    
    ![Connecting the Source Index](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbb7f0cb-49e8-433a-9101-5b9e8406832b/5-0-220-direct-link-set-source-index.png "Connecting the Source Index")
12.  最后，点击我的蓝图（My Blueprints）中的 **DirectLinkUpdate** 函数，并启用 **细节（Details）** 面板中的 **在编辑器中调用（Call In Editor）** 。此选项使运行时可用的函数在锚点对象的细节（Details）中可用。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83bb0e4d-a792-47f7-a43d-c46d35b9d30b/5-0-230-direct-link-call-in-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83bb0e4d-a792-47f7-a43d-c46d35b9d30b/5-0-230-direct-link-call-in-editor.png)
    
    点击查看大图。
    
13.  **保存（Save）** 并 **编译（Compile）** 。最终的蓝图看起来应该类似于下方示例：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/520dd707-1990-4b96-b0a0-ea2424fdabdb/5-0-240-direct-link-function-blueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/520dd707-1990-4b96-b0a0-ea2424fdabdb/5-0-240-direct-link-function-blueprint.png)

点击查看大图。

启动你的源应用程序，并点击 **运行（Play）** 按钮运行项目。在 **世界大纲视图（World Outliner）** 中选择你的锚点，然后点击 **细节（Details）** 面板中的 **直接链接更新（Direct Link Update）** 按钮。然后，点击源应用程序中的 **与直接链接同步（Synchronize with Direct Link）** 按钮。使用蓝图中指定的导入选项，你将看到你的Datasmith内容出现在你的关卡中。

禁用 **在后台使用更少的CPU（Use Less CPU when in Background）** 选项，使引擎能够在虚幻引擎窗口未聚焦且未拥有关卡中的Pawn时更新3D视口。此选项位于 **通用（General）>性能（Performance）** 下的 **编辑器偏好设置（Editor Preferences）中** 。

-   [importing](https://dev.epicgames.com/community/search?query=importing)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [datasmith runtime](https://dev.epicgames.com/community/search?query=datasmith%20runtime)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是Datasmith运行时](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AFdatasmith%E8%BF%90%E8%A1%8C%E6%97%B6)
-   [将Datasmith运行时与蓝图结合使用](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E5%B0%86datasmith%E8%BF%90%E8%A1%8C%E6%97%B6%E4%B8%8E%E8%93%9D%E5%9B%BE%E7%BB%93%E5%90%88%E4%BD%BF%E7%94%A8)
-   [构造Datasmith运行时导入选项](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E6%9E%84%E9%80%A0datasmith%E8%BF%90%E8%A1%8C%E6%97%B6%E5%AF%BC%E5%85%A5%E9%80%89%E9%A1%B9)
-   [设置导入选项](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E5%AF%BC%E5%85%A5%E9%80%89%E9%A1%B9)
-   [加载文件（Load File）](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E5%8A%A0%E8%BD%BD%E6%96%87%E4%BB%B6%EF%BC%88loadfile%EF%BC%89)
-   [从浏览器加载文件](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E4%BB%8E%E6%B5%8F%E8%A7%88%E5%99%A8%E5%8A%A0%E8%BD%BD%E6%96%87%E4%BB%B6)
-   [获取直接链接代理](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E8%8E%B7%E5%8F%96%E7%9B%B4%E6%8E%A5%E9%93%BE%E6%8E%A5%E4%BB%A3%E7%90%86)
-   [获取源列表](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E8%8E%B7%E5%8F%96%E6%BA%90%E5%88%97%E8%A1%A8)
-   [通过索引打开连接](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E9%80%9A%E8%BF%87%E7%B4%A2%E5%BC%95%E6%89%93%E5%BC%80%E8%BF%9E%E6%8E%A5)
-   [关闭连接](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E5%85%B3%E9%97%AD%E8%BF%9E%E6%8E%A5)
-   [运行时加载Datasmith内容](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%97%B6%E5%8A%A0%E8%BD%BDdatasmith%E5%86%85%E5%AE%B9)
-   [使用蓝图创建Datasmith直接链接](/documentation/zh-cn/unreal-engine/using-datasmith-at-runtime-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%93%9D%E5%9B%BE%E5%88%9B%E5%BB%BAdatasmith%E7%9B%B4%E6%8E%A5%E9%93%BE%E6%8E%A5)