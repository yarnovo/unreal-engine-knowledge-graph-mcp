# 虚幻引擎nDisplay 3D配置编辑器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:27:24.021Z

---

目录

![nDisplay 3D配置编辑器](https://dev.epicgames.com/community/api/documentation/image/5ede93c1-3ffd-464e-a291-2f1b78fa4c63?resizing_type=fill&width=1920&height=335)

你通过单个配置资产定义nDisplay系统的大部分方面，通过 **nDisplay 3D配置编辑器（nDisplay 3D Config Editor）** 定义 **nDisplay配置资产（nDisplay Config Asset）** 。该资产定义了构成你的集群网络的计算机、你希望虚幻引擎在每台计算机上渲染的窗口和视口的特征、显示设备的拓扑和配置、每个视口应该渲染的虚拟世界部分、你希望接受的输入设备类型，等等。

本页面介绍了 **nDisplay 3D配置编辑器（nDisplay 3D Config Editor）** 中可用的所有设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09dd2938-dc5a-4247-8905-976e8cc07435/ndisplay-configuration-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09dd2938-dc5a-4247-8905-976e8cc07435/ndisplay-configuration-editor.png)

点击查看大图

1.  **工具栏（Toolbar）** ，位于编辑器左上角。
    
2.  **组件（Components）** ，位于工具栏下面的左侧。
    
3.  **预览（Preview）** ，位于编辑器中部、组件（Components）面板右侧。
    
4.  **细节（Details）** ，位于编辑器右侧、预览（Preview）面板旁边。
    
5.  **群集（Cluster）** ，位于编辑器左侧、组件（Components）面板下方。
    
6.  **输出映射（Output Mapping）** ，位于编辑器中部、预览（Preview）面板下方。
    
7.  **编译器结果（Compiler Results）** ，位于编辑器右下角、细节（Details）面板下方。
    

## 工具栏

![nDsiplay配置编辑器工具栏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35e568b3-4ad3-4ac8-8bad-30333af829f9/ndisplay-configuration-editor-toolbar.png)

在3D配置编辑器的工具栏中，大部分按钮与蓝图编辑器的工具栏相同。下面是nDisplay 3D配置编辑器独有的两个按钮：

-   **导入（Import）** ：从本地计算机导入nDisplay配置文件（`.ndisplay`、`.cfg`）。
    
-   **导出（Export）** ：将nDisplay设置导出到本地计算机上的配置文件（`.ndisplay`）。
    

请参阅[工具栏](/documentation/zh-cn/unreal-engine/toolbar-in-the-blueprints-visual-scripting-editor-for-unreal-engine)，了解有关其他选项的更多细节。

## 组件

![nDisplay组件面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e4a1001-702d-4ac3-b869-cc72f5ce4075/ndisplay-components-panel.png)

组件（Components）面板将定义nDisplay群集的物理显示、追踪和摄像机内设置。在设计nDisplay网络时，第一步是将组件添加到继承的根组件。你可以从预定义的显示器、变换和默认摄像机Actor列表中选择，或添加额外可用的UE组件。

要通过真实世界追踪系统使用nDisplay，需要将Live Link组件添加到组件（Components）面板。请参阅[Live Link](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)，了解有关如何为你的设置配置它的更多信息。

以下分段介绍了可以添加到你的设置的特定于nDisplay的组件。

### 屏幕

nDisplay **屏幕（Screen）** 组件旨在方便地定义任意大小、形状和分辨率的平面2D显示器。通过引用的视点 **查看原件（View Origin）** 组件，它们定义了一个称为 *视锥（view frustum）* 的体积，用于从摄像机或视点的视角渲染3D场景的一个部分。渲染的像素存储在视口结构中，该结构将显示器、视点和投影策略绑定在一起。上述每个投影屏幕都需要与物理屏幕相同或相似的空间尺寸，以用于渲染它。此设置与大部分投影策略兼容。

屏幕的枢轴点始终在其正中点。

![nDisplay屏幕组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/205b819c-6626-4c6c-a8d8-608e2844bf24/ndisplay-screen-component.png)

### 静态网格体

处理非平面显示器（如曲面LED墙或显示器）时，你可以使用静态网格体组件来取代屏幕组件。这样一来，你可以使用静态网格体完全定义屏幕的形状。此设置与大部分投影策略兼容。

![nDisplay配置编辑器中的静态网格体组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22fbafb8-50aa-49e6-b8ed-9d771630ed91/static-mesh-component.png)

### Xform

默认情况下，所有对象的父节点是根组件原点：3D世界空间中的一个任意点，其中X、Y和Z轴都有其0点。你还可以在3D空间中配置具体名称的变换，称为Xform，可充当一个或多个组件的父节点。这有助于简化界面、摄像机和其他组件的空间布局。Xform包含可视化网格体，能够对细节（Details）面板中的组件进行缩放。

![nDisplay Xform组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/166ce70e-41f9-4dca-a448-74a288c96128/ndisplay-xform-component.png)

你可以使用UE的标准场景组件来取代Xform，以充当一个或多个组件的父节点，但它们没有可视化网格体，也不能在细节（Details）面板中控制其大小。

### 观察原点

nDisplay设置中的组件，用于定义渲染视口中内容时使用的原点。它们与用于定义显示内容的屏幕或静态网格体组件一起，定义了用于正确渲染3D内容的视锥。你可以在配置文件中包含多个"观察原点（View Origin）"，并将它们绑定到不同的视口和显示器。"观察原点"还包含使用nDisplay的[立体渲染](/documentation/zh-cn/unreal-engine/stereoscopic-rendering-with-ndisplay-in-unreal-engine)的设置。

![nDisplay观察原点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fbcd7a1-7fb4-4fa1-8265-88f80b5867e1/ndisplay-configuration-editor-view-origin.gif)

### ICVFX摄像机

这是你可以引用或链接到关卡或项目中放置的外部摄像机的电影摄像机组件。此组件创建[摄像机内视觉特效处理](/documentation/zh-cn/unreal-engine/in-camera-vfx-in-unreal-engine)项目所需的内视锥。

![nDisplay ICVFX摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7438648-0f28-497f-be91-0f9b8d2305b6/ndisplay-icvfx-camera.gif)

## 群集

![nDisplay群集面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dfc4211-157f-440b-b66f-231068812659/ndisplay-cluster-panel.png)

对于你将在nDisplay网络中使用的虚幻引擎应用程序的每个不同实例，你需要定义一个 **群集节点（Cluster Node）**。每个群集节点表示一个应用程序实例，并定义了将运行该应用程序实例的计算机主机名或IP地址。你可以为每个群集节点设置不同的物理计算机，或者可以具有多个在同一主机上运行的群集节点。

每个群集节点包含一个或多个视口。它们与其关联的显示或静态网格体组件一起，定义了3D世界中的窗口。然后，该窗口用于从任意"查看原件"的视角渲染你的场景。下表介绍了可以添加到群集的元素。

节点

说明

群集（Cluster）

托管构成一个nDisplay群集的一组PC。每个nDisplay配置资产只能创建一个群集。

主机（Host）

表示带有唯一IP地址的一个PC。可以自定义彩色签名以区分不同的PC。该颜色也可以在输出映射（Output Mapping）面板中使用。

节点（应用程序实例）（Node (Application Instance)）

UE的一个实例。通常，每个PC有一个应用程序实例，但允许有更多实例，以用于特定用例。应用程序实例窗口在此节点的细节（Details）面板中进行配置。

视口（Viewports）

定义3D世界中的窗口。投影策略、摄像机和目标显示器的容器。

### 群集配置

要访问群集设置：

1.  在 **群集（Cluster）** 面板中选择 **群集（Cluster）** ，打开其 **细节（Details）** 面板。
    
    ![在群集面板中选择群集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b559e51a-32f8-4ce1-b793-094988ae326a/select-cluster-in-cluster-panel.png)
2.  在 **细节（Details）** 面板中，展开 **配置（Configuration）** 分段。
    
    ![在群集细节中展开配置分段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4df5444-3c32-4d87-83ce-81fdc72c7974/expand-configuration-section-in-cluster-details.png)

在群集设置中，你可以为群集设置端口、网络和同步策略。如需详细了解如何更改端口、网络和同步设置，请参阅[更改nDisplay通信端口](/documentation/zh-cn/unreal-engine/changing-ndisplay-communication-ports-in-unreal-engine)和[nDisplay中的同步](/documentation/zh-cn/unreal-engine/synchronization-in-ndisplay-in-unreal-engine)。

## 输出映射

![nDisplay输出映射面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a84a968-cf8e-4eca-8f7f-1fbfc7975a04/ndisplay-output-mapping-panel.png)

**输出映射（Output Mapping）** 面板实际上将群集（Cluster）面板中定义的视口映射到2D UE应用程序窗口。在输出映射（Output Mapping）面板中，你可以：

-   查看主机计算机、群集节点（UE应用程序实例）和视口之间的关系。
    
-   在应用程序实例窗口中可视化、编辑和映射2D视口。
    
-   平移和旋转视口。
    

按从左到右的顺序使用位于 **输出映射（Output Mapping）** 面板左上角的以下工具，修改nDisplay群集的窗口和视口：

![nDisplay配置编辑器的输出映射面板中的工具](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5a968d7-9918-40db-9dc3-28e1f27d2b58/ndisplay-output-mapping-panel-tools.png)

按钮

快捷键

说明

汉堡菜单（Hamburger Menu）

 

你可以启用或禁用以下选项：

-   给选定的视口着色（Tint Selected Viewports）
-   重叠和边界（Overlap and Bounds）
-   主机布局（Host Arrangement）

信息栏（Info Bar）

W

启用此选项会显示窗口信息，例如分辨率和IP地址。

显示窗口之外的视口（Show Viewports Outside Window）

R

启用此选项会显示应用程序窗口之外的所有视口。

缩放以适配（Zoom to Fit）

Z

自动缩放以适配面板视图。

查看比例（View Scale）

 

设置窗口和视口的比例。

变换操作（Transform Operations）

 

将变换应用于视口的选项：

-   逆时针旋转90度（Rotate 90 degrees counterclockwise）。
-   顺时针旋转90度（Rotate 90 degrees clockwise）。
-   旋转180度（Rotate 90 degrees clockwise）。
-   水平翻转（Flip horizontal）。
-   垂直翻转（Flip vertical）。
-   重置变换（Reset transform）。

定位设置（Positioning Settings）

 

与节点定位方式有关的设置。你可以启用或禁用以下选项：

-   允许群集项重叠（Allow Cluster Item Overlap）
-   将群集节点保留在主机中（Keep Cluster Nodes inside Hosts）
-   将群集节点锁定（Lock Cluster Nodes in place）
-   将视口锁定（Lock Viewports in place）

节点对齐（Node Snapping）

 

与将节点对齐到一起的方式有关的选项。你可以启用或禁用以下选项：

-   切换相邻边缘对齐（Toggle Adjacent Edge Snapping）
-   相邻边缘填充（Adjacent Edge Padding）
-   切换相同边缘对齐（Toggle Same Edge Snapping）
-   对齐距离（Snap Proximity）

### 窗口配置

每个窗口配置都为你的虚幻引擎应用程序的实例主窗口定义一组属性。它用于配置细节，例如在nDisplay启动应用程序时配置窗口的启动大小和位置，以及窗口是否应该占据全屏。

此外，你还可以提供一个或多个视口配置，用于标识nDisplay将通过场景渲染来填充的主应用程序窗口中的特定区域。

在 **nDisplay 3D配置编辑器（nDisplay 3D Config Editor）** 中，你可以配置窗口，具体做法是选择输出映射（Output Mapping）面板中的群集节点并修改其大小，或更改群集节点的 **细节（Details）** 面板的 **窗口（Window）** 分段中的设置。

#### 输出重新映射

通过输出重新映射，你可以按应用程序窗口中的位置和比例指定视口的渲染方式。输出重新映射通过允许提供的网格体的UV通道中定义的自定义变换（如旋转）来扩展此功能。

例如，可平移、旋转、缩放输出图像的各部分，使其在应用程序窗口的不同区域显示。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b64cdca-c40e-4250-a0a5-42d6b3979494/output-remap.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b64cdca-c40e-4250-a0a5-42d6b3979494/output-remap.png)

点击查看大图

有三种方式可启用此功能：

-   分配一个静态网格体，其中包含带有自定义UV映射的平面几何体。
    
-   分配一个外部.obj文件，其中包含带有自定义UV映射的平面几何体。
    
-   在输出映射（Output Mapping）面板中选择一个视口，并选择 **变换操作（Transform Operation）** 。
    

##### 使用静态网格体或外部文件的输出重新映射

要应用输出重新映射，你可以提供静态网格体或外部.obj文件，其中包含设置了自定义UV映射的平面几何体。nDisplay将使用为你的平面设置的UV通道来确定输出图像如何映射到应用程序窗口的每个部分。

输入网格体可以是单元大小，并将应用于整个应用程序窗口。这是因为，nDisplay将最终渲染缓冲区作为输入GPU纹理取样器，以用于最终后期处理着色器，而该着色器则被应用于带有任意UV空间的网格体。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7ca2dbd-e2bb-4e84-919b-86d45f434852/ndisplay-output-remapping-with-mesh.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7ca2dbd-e2bb-4e84-919b-86d45f434852/ndisplay-output-remapping-with-mesh.jpg)

点击查看大图

将旋转应用于使用外部文件的nDisplay渲染时，你必须手动调整应用程序窗口分辨率，以适应旋转，否则渲染看起来会像是被拉伸的状态。

要在项目中启用输出重新映射：

1.  在 **群集（Cluster）** 面板中，选择 **节点（Node）** 以打开其 **细节（Details）** 面板。
    
2.  在 **细节（Details）** 面板中，展开 **输出重新映射（Output Remapping）** 分段。
    
    ![展开节点的细节面板中的输出重新映射分段](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df5397f0-dd70-40c1-bf0a-ace66d5d09b8/expand-output-remapping-section.png)
3.  启用 **输出重新映射（Output Remapping）** 。
    
    ![启用输出重新映射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c8bbd29-a61d-46b5-8058-ef0ace98f860/enable-output-remapping-on-node.png)
4.  选择你想使用的 **数据源（Data Source）** ： **静态网格体（Static Mesh）** 或 **外部文件（External File）** 。
    
    1.  **对于静态网格体** ：浏览到项目中的 **静态网格体（Static Mesh）** 。
    
    ![静态网格体输出重新映射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1014d8e8-040c-4483-94fa-aaacf7442219/static-mesh-output-remapping.png)
    
    1.  **对于外部文件** ：输入.obj文件的磁盘上路径。
    
    ![外部文件输出重新映射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6e7b246-da6b-41c4-88b2-d7ab6f63249b/external-file-output-remapping.png)

为了将静态网格体用于输出重新映射，必须为该静态网格体启用 **允许CPUAccess（Allow CPUAccess）** 。为此，请执行以下操作：

1.  在 **内容浏览器（Content Browser）** 中双击该静态网格体以在 **静态网格体编辑器（Static Mesh Editor）** 中将其打开。
    
2.  在 **细节（Details）** 面板中，展开 **一般设置（General Settings）> 高级（Advanced）** 。
    
3.  启用 **允许CPUAccess（Allow CPUAccess）** 。
    
4.  保存静态网格体资产以保留你的更改。
    
    ![允许静态网格体访问CPU](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d06a35be-3218-464d-9f71-8dc3f1563787/allow-cpu-access-for-static-mesh.png)

##### 使用变换操作的输出重新映射

你可以在输出映射（Output Mapping）面板中变换视口，以修改它们将在应用程序窗口中渲染的方式。

![使用变换操作工具的输出重新映射](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/95de9779-4919-4d20-a581-3680412c253d/output-remapping-transform-operations.png)

左侧两个视口顺时针旋转了90度，并缩小以适配该空间。

要将旋转或翻转变换快速应用于项目中的视口：

1.  在群集（Cluster）面板或输出映射（Output Mapping）面板中选择该视口。
    
2.  在输出映射（Output Mapping）面板中，选择 **变换（Transform）** 并选择你想应用的操作。
    
    或者，右键点击视口以打开上下文菜单，并选择所需的 **变换（Transform）** 。
    
    ![输出重新映射变换操作的选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dba939de-d013-4ffc-a714-c9ce515f8646/output-remapping-transform-operations-options.png)

### 视口配置

每个窗口配置指的是一个或多个视口配置，每个视口配置定义了窗口中nDisplay应该使用场景的渲染视图进行填充的一个矩形区域。通常情况下，视口从应用程序窗口的左上角开始，并且其宽度和高度设置为可以填满父窗口。

在一些情况下，你可能需要在视口的父应用程序窗口内偏移、缩放或旋转视口。例如，LED处理器有时以编程方式将自定义2D映射包含在更大的画布上。使用nDisplay输出映射（Output Mapping）面板，你可以放置或旋转视口，使其适配显示设备或处理器预期的区域。你可以针对每个应用程序窗口加载一个自定义背景图像，以帮助放置视口。

如果你使用操作系统配置来旋转或平移显示内容，还可以使用输出映射工具来匹配这种任意旋转和位置。

上述每个视口配置指的是一种投影策略，它负责定义图像在视口中如何渲染。虚幻引擎会自动将整个群集连接到当前摄像机的位置，这样就能够制作烘焙的或交互式摄像机动画。你可以根据需要禁用摄像机。

在大部分常见2D情形中，你将使用 **简单（Simple）** 的投影类型，这会使用显示配置和"查看原件"所定义的视锥渲染虚拟世界。这些渲染的像素实际上由连接的视口存储和定义。

对于更复杂的设置（例如摄像机内视觉特效处理的设置，或在显示器为曲面或任意形状的表面时），你可以使用 **网格体（Mesh）** 或 **MPCDI** 投影策略。

其他特定于行业的投影类型（例如 **EasyBlend** 、 **VIOSO** 和 **DomeProjection** ）会瞄准投影器照亮的显示表面，并使用其他方法来定义或适应视口的渲染内容。它们可能在将图像渲染到矩形视口之前引入更多校正或应用自定义渲染技术。例如，投影可能会挤压、拉伸或扭曲图像，使其在曲面或任意形状的表面上看起来比较自然。它们还可能为连续渲染的图像应用所需的颜色或伽马曲线校正。

如需详细了解投影类型及其配置，请参阅[nDisplay中的投影策略](/documentation/zh-cn/unreal-engine/projection-policies-in-ndisplay-in-unreal-engine)。

#### 纹理共享

你可以利用TextureShare将视口纹理与另一个应用程序共享，或从另一个应用程序接收纹理并将其显示在指定的视口中。

要启用视口的纹理共享：

1.  在 **3D配置编辑器（3D Config Editor）** 中，选择 **视口（viewport）** 以查看其 **细节（Details）** 面板。
    
2.  在 **细节（Details）** 面板中，启用 **共享视口（Share Viewport）** 。
    
    ![启用共享视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da1109ed-1d99-4f76-9fad-9c00021dfe02/enable-share-viewport.png)
3.  现在你可以在外部应用程序中使用该视口来发送或接收纹理。
    

请参阅[纹理共享](/documentation/zh-cn/unreal-engine/texture-share-in-unreal-engine)，详细了解同步设置以及如何设置外部应用程序。

## 3D视口

![nDisplay配置编辑器中的nDisplay 3D视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47fa6179-8347-4124-8838-bf611e18c133/ndisplay-3d-viewport.gif)

你可以利用3D视口直观地看到nDisplay群集的显示、摄像机和追踪设置。该面板是一种3D编辑工具，用于可视化和编辑以下内容：

-   显示拓扑和投影策略。
    
-   追踪的摄像机位置。
    
-   追踪的用户位置。
    

使用此视图以确保：

-   你的显示器已正确设置。
    
-   预览渲染从摄像机优势点看起来正确。
    
-   视口正确映射到屏幕。
    

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [graphics](https://dev.epicgames.com/community/search?query=graphics)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工具栏](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [组件](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E7%BB%84%E4%BB%B6)
-   [屏幕](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E5%B1%8F%E5%B9%95)
-   [静态网格体](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [Xform](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#xform)
-   [观察原点](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E8%A7%82%E5%AF%9F%E5%8E%9F%E7%82%B9)
-   [ICVFX摄像机](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#icvfx%E6%91%84%E5%83%8F%E6%9C%BA)
-   [群集](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E7%BE%A4%E9%9B%86)
-   [群集配置](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E7%BE%A4%E9%9B%86%E9%85%8D%E7%BD%AE)
-   [输出映射](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E8%BE%93%E5%87%BA%E6%98%A0%E5%B0%84)
-   [窗口配置](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E7%AA%97%E5%8F%A3%E9%85%8D%E7%BD%AE)
-   [输出重新映射](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E8%BE%93%E5%87%BA%E9%87%8D%E6%96%B0%E6%98%A0%E5%B0%84)
-   [使用静态网格体或外部文件的输出重新映射](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E4%BD%BF%E7%94%A8%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E6%88%96%E5%A4%96%E9%83%A8%E6%96%87%E4%BB%B6%E7%9A%84%E8%BE%93%E5%87%BA%E9%87%8D%E6%96%B0%E6%98%A0%E5%B0%84)
-   [使用变换操作的输出重新映射](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%8F%98%E6%8D%A2%E6%93%8D%E4%BD%9C%E7%9A%84%E8%BE%93%E5%87%BA%E9%87%8D%E6%96%B0%E6%98%A0%E5%B0%84)
-   [视口配置](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E8%A7%86%E5%8F%A3%E9%85%8D%E7%BD%AE)
-   [纹理共享](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#%E7%BA%B9%E7%90%86%E5%85%B1%E4%BA%AB)
-   [3D视口](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine#3d%E8%A7%86%E5%8F%A3)