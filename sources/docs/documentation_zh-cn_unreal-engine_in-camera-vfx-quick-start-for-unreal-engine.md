# 虚幻引擎的ICVFX快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:12.064Z

---

目录

![ICVFX快速入门](https://dev.epicgames.com/community/api/documentation/image/7d2c7839-b34b-4f54-8c93-55d053b254e7?resizing_type=fill&width=1920&height=335)

此快速入门页面将介绍在虚幻引擎中设置项目的流程，以便配合摄像机内视觉特效处理使用。在本指南的最后，你将：

-   获得nDisplay节点的同步群集。
    
-   获得摄像机内视觉特效处理的内外视锥体。
    
-   获得通过Live Link整合的实时摄像机追踪系统。
    
-   获得一个带有可开启色键标识功能的绿幕内视锥体。
    
-   可以启动所有集群节点并当场测试。
    

## 第1步 - 为摄像机内视觉特效处理设置项目

设置摄像机内视觉特效处理项目最简单的方法是，使用摄像机内视觉特效处理示例项目。

1.  打开 **Epic Games启动程序（Epic Games Launcher）** 。
    
2.  在 **示例（Samples）** 选项卡中，找到[摄像机内VFX示例](https://www.fab.com/listings/1ccaf0a1-acce-4a3b-831e-a9cf4af35f6d)项目。
    
3.  在该项目页面上，单击 **免费（Free）** 。
    
4.  点击 **创建工程（Create Project）** 。
    
5.  在你的设备上指定位置，以保存该项目并选择 **创建（Create）** 。
    
6.  启动 **虚幻引擎（Unreal Engine）** 并打开 **摄像机内VFX示例（In-Camera VFX Example）** 项目。
    

在示例项目中的 **内容（Content）> 贴图（Maps）** 中，你可以看到 **主（Main）** 关卡。想通过虚幻引擎了解关于摄像机内视觉特效处理的内容，请打开 **主（Main）** 关卡。示例项目和关卡会自动启用必要的插件，提供辅助用的蓝图，配置其他设置，并将示例配置文件包含在内。

### 插件

-   **Aja或Blackmagic Media Player：**为SDI采集卡提供支持。
    
-   **摄像机校准（Camera Calibration）** 用于创建镜头失真配置文件和节点偏移的工具。
    
-   **颜色校正区域（Color Correct Regions）：**颜色校正和阴影限制在体积内。
    
-   **ICVFX：**一款插件，可启用一套基础的摄像机内视觉特效处理插件。
    
-   **关卡快照（Level Snapshots）：**为具有筛选功能的当前关卡存储替代布局，以便提供方便、非破坏性的变体。
    
-   **Live Link：**采集实时数据（如动作捕捉和相机追踪）的虚幻引擎API。
    
-   **Live Link Over nDisplay：**主节点接收Live Link数据，并以一种高效且同步的方式重新分发追踪数据。
    
-   **Live Link XR：**从XR设备（如Vive Tracker）采集实时数据的虚幻引擎API。
    
-   **Multi-User Editing：**可在共享会话中使用多个编辑器。
    
-   **媒体框架实用工具（Media Framework Utilities）：**与实时视频、时间代码和SDI采集卡上同步锁定相关的实用插件。
    
-   **nDisplay：**用于实现多屏渲染的虚幻引擎技术。
    
-   **关卡快照的nDisplay支持（nDisplay Support for Level Snapshots）：**支持使用关卡快照保存和恢复nDisplay根Actor属性。
    
-   **OpenColorIO (OCIO)：**提供OpenColorIO支持。
    
-   **OSC：**提供在远程客户端或应用程序之间发送和接收OSC消息的功能。
    
-   **远程控制API（Remote Control API）：**一套通过REST API、WebSocket和C++远程控制引擎的工具。
    
-   **远程控制Web界面（Remote Control Web Interface）：**提供远程Web界面和UI构建器，用于远程控制编辑器。
    
-   **Switchboard：**一款用于在多用户会话中启动虚幻引擎、nDisplay节点和其他虚拟制片设备实例的应用程序。
    
-   **计时数据监视器（Timed Data Monitor）：**用于监视可以进行时间同步的输入的实用工具。
    
-   **虚拟制片实用工具（Virtual Production Utilities）：**用于虚拟制片的实用插件。
    

### nDisplay根Actor

[nDisplay配置资产](/documentation/zh-cn/unreal-engine/ndisplay-3d-config-editor-in-unreal-engine)定义了nDisplay群集中的计算机与LED体积拓扑之间的关系。nDisplay根Actor是关卡中nDisplay配置资产的的实例，通过将nDisplay配置资产拖入关卡来创建。

示例项目中包含示例nDisplay配置资产。你可以在内容浏览器（Content Browser）的nDisplayConfigs下面找到。如需详细了解nDisplay根Actor中公开的设置，请参阅[nDisplay根Actor参考](/documentation/zh-cn/unreal-engine/ndisplay-root-actor-reference-for-unreal-engine)。

## 第2步 - 创建LED面板几何体

本小节提供了如何创建曲面LED墙表示的示例。各LED体积可能不同，因此请修改这些步骤，以便匹配你的显示器的尺寸和布局。

这些步骤展示了如何创建几何体，以代表真实世界的LED面板。

在此示例中，曲面墙由两个网格体组成。每个网格体映射到nDisplay视口。有几个因素决定了如何将LED舞台分成网格体：

1.  **角度：**每个网格体的最大理想曲率角应为90度。每网格体大于90度的曲线会导致视觉效果降级。此外，没有单个视口（以及网格体）可以覆盖179度以上。
    
2.  **分辨率：**UHD（3840 x 2160）是在单个GPU nDisplay视口上渲染的合理上限。对于有多个GPU的机器，你可以有多个视口，跨越更大的显示分辨率。 无论哪种方式，根据LED面板的分辨率，以你希望每台机器和视口渲染的最大分辨率为增量，分离你的舞台网格体。有关逐面板分辨率的详细信息，请咨询你的LED制造商。
    
3.  **控制点：**如果你仅将天花板面板用于光照和反射，并且它们从不出现在摄像机中，则你可能要将天花板和侧壁之间的控制点分开。如果LED面板的型号不同，并且需要不同的颜色管理，则尤其如此。 颜色管理为逐视口控制，因此你必须将这些不同的面板分解为各自的网格体。
    

这些是关于如何将拓扑分离为网格体（以及视口）的考虑因素。单台机器渲染多个视口很常见，比如天花板和墙壁。重要的是，它们是单个节点上的单独视口。

每个网格体应有两个按特定顺序排列的UV集。第一个UV集用于计算nDisplay的PICP\_Mesh投影策略投影。第二个UV集用于确保色键追踪标识跨两个视口之间的接缝正确移动。

此示例网格体上的每个方块代表500毫米 x 500毫米的LED面板，像素间距为2.6毫米。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfb5744d-b493-4df7-9fbb-54f0c04b6368/led-example-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfb5744d-b493-4df7-9fbb-54f0c04b6368/led-example-mesh.png)

曲面LED墙的网格体表现形式。点击查看大图。

网格体的建模位置和方向应与真实世界的LED面板匹配。在此示例中，它们以直立的方式建模。几何体应该以厘米为单位缩放。

创建具有下列规格的UV集：

-   首个UV集应缩放以覆盖范围0-1内的整个UV空间。此UV集应尽量均匀展开，避免拉伸。缩放可以不具统一性。确保UV边缘周围没有填充，且该UV不得超过0-1的范围。
    
    ![网格体的第一个UV集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e882f29-ef9a-4428-990d-b6f1feefa076/led-mesh-uv1.png "First UV set for the mesh")
-   第二个UV集应该让UV对齐，使其在相同的接缝处作为实际硬件配置匹配。它们的长宽比也应该与网格体一致。
    
    ![网格体的第二个UV集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39c81f8c-b04b-4a52-a93b-518a41ccfc33/led-mesh-uv2.png "Second UV set for the mesh")

创建网格体后，将几何体从3D建模软件中导出，然后将其导入至虚幻项目。[下载此示例网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/669b7dbf-d8a5-495b-b5f2-002e75aeb605/examplecurvedwallmesh_ndisplay.fbx)，并将文件拖到 **内容浏览器（Content Browser）** 的 **Content/nDisplayConfigs/Meshes** 文件夹中，按照下一小节中的步骤操作。

将网格体导入虚幻项目后，在每个网格体上启用 **使用全精度UV（Use Full Precision Uvs）** ，防止出现UV瑕疵。对导入的每个网格体执行以下操作步骤：

1.  双击导入的网格体，在静态网格体编辑器中打开。
2.  在 **细节（Details）** 面板的 **LOD 0** 下，展开 **构建设置（Build Settings）** ，并启用 **使用全精度UV（Use Full Precision UVs）** 。
    
    ![在细节面板中启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3f9e101-61d8-441a-9395-e3eef507f3c1/use-full-precision-uvs.png "Enable Use Full Precision UVs in the Details panel")
3.  点击 **应用更改（Apply Changes）** 按钮。
    
    ![应用更改](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c6e50998-8712-452d-8543-c3d1bcca7221/apply-changes.png "Apply Changes")
4.  点击 **保存（Save）** 。
5.  关闭静态网格体编辑器。

## 第3步 - 定义你的项目中的LED屏幕

你需要自定义项目中屏幕的页面布局和几何体，反映你当前场景所含的内容。这些网格体应该与真实世界中与你的追踪系统相关联LED墙的实体位置和尺寸保持一致。场景所用的追踪系统有零点。这些网格体应该置于相同的真实世界坐标中，因为其与追踪系统相关联。配合你的追踪设备找到零点位置，并相对于此零点测量偏移情况。

这些示例不使用回环地址127.0.0.1，因为它不能与其他非回环地址（例如属于其他机器的地址）在同一Switchboard配置中结合使用。你可以使用回环，但只能在简单的配置中使用，其中它是唯一使用的地址，并且每台设备对于运行Switchboard的机器而言都是本地设备。若在多机器设置中混合回环和非回环地址，会导致连接错误。

执行以下步骤，修改和自定义引擎中的页面布局和几何体：

1.  在 **内容浏览器（Content Browser）** 中，找到 **nDisplayConfigs** 文件夹。
    
2.  在文件夹中右键点击，打开创建资产（Create Asset）菜单，并选择 **nDisplay>nDisplay配置（nDisplay Config）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f910bb5-e3d5-4481-a7b7-06842ab6d6f0/ndisplay-config.png "nDisplay Config in the Create Asset menu")
3.  在出现的 **为nDisplay配置选择起始点（Pick a starting point for your nDisplay Config）** 的窗口中，选择 **新建配置（Create New Config）** ，并点击 **完成（Finish）** 。
    
    ![新建配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e325168-82a5-4f0e-986c-414196e09cbf/create-new-config.png "Create New Config")
4.  将新nDisplay配置资产命名为 **NDC\_ICVFXQuickStart** 。
    
    ![命名新nDisplay配置资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d79d4e9-694b-435e-86f4-7d837ba77b39/quickstart-config-asset.png "Name the new nDisplay Config Asset")
5.  双击 **NDC\_ICVFXQuickStart** 资产，在 **nDisplay3D配置编辑器（nDisplay 3D Config Editor）** 中打开。
    
    ![在nDisplay 3D配置编辑器中打开新资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4914a94f-dab3-463f-8218-0c49a62f29b5/quickstart-config-editor.png "Open the new Asset in the nDisplay 3D Config Editor")
6.  在 **组件（Components）** 面板中，右键点击 **nDisplayScreen** 组件并选择 **删除（Delete）** ，从列表选择该组件。
    
    ![删除nDisplay屏幕组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0605dca-ab9f-46a8-976c-2469b0ead006/delete-ndisplay-screen.png "Delete nDisplay Screen Component")
7.  点击 **添加组件（Add Component）** ，并将两个 **静态网格体（Static Mesh）** 组件添加到组件（Components）面板。
    
    ![添加两个静态网格体组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39a113d3-911d-429f-8975-3a7bd11971c9/add-static-mesh-component.png "Add two Static Mesh Components")
8.  将其中一个静态网格体命名为 **CurvedWall\_Left** ，并在其 **细节（Details）** 面板中，将 **ExampleCurvedWallMesh\_nDisplay\_WallLeft** 指定为其 **静态网格体（Static Mesh）** 参数。将另一个命名为 **CurvedWall\_Right** ，并将 **ExampleCurvedWallMesh\_nDisplay\_WallRight** 指定为其 **静态网格体（Static Mesh）** 参数。
    
    ![命名静态网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/458f1388-65db-4324-af6a-4825f1cda70e/curved-wall-left-right.png "Name the Static Meshes")
9.  选择两个 *\*静态网格体* 组件并旋转，使其向视图原点组件（View Origin Component）弯曲。在后续步骤中设置投影策略之前，你不会在网格体上看到投影预览。
    
    ![放置并旋转静态网格体组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd799cd9-6b28-4662-91b2-c284871a2cad/place-static-mesh-components.png "Place and rotate the Static Mesh Components")
10.  在 **群集（Cluster）** 面板中，点击 **新增（Add New）** 按钮并选择 **添加新群集节点（Add New Cluster Node）** 。
    
    ![添加新群集节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f841390a-7584-4306-b5b6-e6bd383758f0/add-new-cluster-node.png "Add New Cluster Node")
    
    如果你要将NVIDIA Quadro Sync II与NVIDIA Quadro GPU配合使用，请选择 **群集（Cluster）** 面板中的 **群集（Cluster）** 项目，然后将 **类型（Type）** 设置为 **Nvidia (2)** 。
    
    ![将群集类型设置为Nvidia 2](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b63208c-a1f5-462c-9653-1c607ab29c33/cluster-type-nvidia2.png "Set Cluster Type to Nvidia 2")
    
11.  **群集节点（Cluster Node）** 表示主机计算机。在出现的 **新增群集节点（Add New Cluster Node）** 窗口中：
    
    1.  将 **主机IP地址（Host IP Address）** 设置为你的计算机的外部IP地址。如果后续要向nDisplay群集添加更多计算机，你必须使用计算机的外部IP地址，而不是默认的本地主机IP地址127.0.0.1，因为在多机设置中，你无法同时使用回环和非回环地址。这些步骤以IP地址192.0.2.0为例。
    2.  启用 **全屏（Fullscreen）** ，实现同步和同步锁定。
    3.  点击 **添加（Add）** 。
        
        ![设置主机IP地址](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8658f08-bdd6-4874-ac4b-614e0a3f5817/save-host-ip-address.png "Setting the Host IP Address")
12.  创建 **群集节点** ，并为该节点分配新视口。在 **群集（Cluster）** 面板中选择该视口，打开其 **细节（Details）** 面板。
    
    ![在群集面板中选择视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07998115-1189-44ee-b555-5017d5d8fa7d/cluster-node-vp.png "Select the viewport in the Cluster panel")
13.  在 **细节（Details）** 面板中，将 **视图原点（View Origin）** 设置为 **DefaultViewPoint** 。这样一来，关联的组件就可以控制外视锥的投影点。
    
    ![将视图原点设置为默认视点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f17c4963-3087-4389-9d46-d2c8ccd323f6/view-origin-default-vp.png "Set View Origin to Default View Point")
14.  在视口 **细节（Details）** 面板的 **投影策略（Projection Policy）** 分段下，将 **类型（Type）** 设置为 **网格体（Mesh）** ，并从列表中选择你的 **CurvedWall\_Left** 网格体。仅添加到组件（Components）面板的静态网格体组件才会显示在网格体列表中。
    
    ![将投影策略类型设置为网格体并选择网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/194f2ce6-2fd1-4d77-bd27-31f8ba45babf/proj-pol-type-mesh.png "Set Projection Policy Type to Mesh and select a mesh")
15.  在视口和 **输出映射（Output Mapping）** 面板中查看出现在网格体上的测试场景。
    
    ![设置测试场景](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5d2e363-4f01-4cee-bcc1-f5091d6855c5/test-scene-mesh.png "Set the test scene")
16.  为另一个墙网格体创建视口。右键点击 **群集节点（Cluster Node）** ，然后选择 **新增视口（Add New Viewport）** 。
    
    ![新增视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12aae84e-a74d-427c-bc8d-76bbc89a97c7/node-add-new-vp.png "Add a new viewport")
17.  在出现的 **新增视口（Add New Viewport）** 窗口中：
    
    1.  将 **视图原点（View Origin）** 设置为 **DefaultViewPoint** 。
    2.  在 **投影策略（Projection Policy）** 下，将 **类型（Type）** 设置为 **网格体（Mesh）** 。
    3.  在 **投影策略（Projection Policy）** 下，将 **网格体（Mesh）** 设置为 **CurvedWall\_Right** 。
    4.  点击 **添加（Add）** 。
    
    ![设置另一个墙壁网格体视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad380b04-5983-4814-a27d-74b631960cbe/mesh-curved-wall-right.png "Setting up the other wall mesh viewport")
18.  创建第二个视口，测试场景出现在视口和输出映射（Output Mapping）面板中的墙壁网格体上。
    
    ![第二个视口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7aea47b9-be9d-4fd4-97eb-033942c69204/2nd-viewport.png "The second viewport")
19.  在 **组件（Components）** 面板中，添加 **ICVFXCamera** 组件。该组件将为你提供内视锥体功能按钮和功能。
    
    ![添加摄像机内视觉特效处理摄像机组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c106302c-0a7b-426f-9ff0-2ba4f6700174/add-icvfx-camera.png "Add an in-camera VFX camera component")
20.  选择创建的 **ICVFXCamera** 组件，并在 **预览视口（Preview Viewport）** 中操作它。你将在投影网格体上看到内视锥体投影预览。
    
    ![内视锥体投影预览](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a402fd2d-b914-46df-b193-1d990d2b0e4b/projection-preview.png "The inner-frustum projection preview")
21.  **编译（Compile）** 并 **保存（Save）** 资产。
22.  将 **NDC\_ICVFXQuickStart** 资产拖入关卡中，创建[nDisplay根Actor](/documentation/zh-cn/unreal-engine/ndisplay-root-actor-reference-for-unreal-engine)，并在群集中预览关卡。
    
    ![创建nDisplay根Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/80075bbf-7c74-42f0-a6a2-a4ba6de49891/create-ndisplay-root-actor_smaller.gif)
23.  **保存（Save）** 项目。

本小节介绍了如何创建你自己的nDisplay配置资产，并使用此前创建的网格体设置它。示例nDisplay配置资产已经包含在具有四边形网格体布局的项目中。你可以在 **内容浏览器（Content Browser）** 的 **nDisplayConfigs/nDisplayBasicExample** 中找到此资产。

## 第4步 - 使用Switchboard启动你的项目

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a340fc74-2eb8-4391-a605-cbd6338467f3/ndisplay-network-and-devices.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a340fc74-2eb8-4391-a605-cbd6338467f3/ndisplay-network-and-devices.png)

图表中说明了nDisplay如何与用于摄像机内视觉特效处理的网络和显示设备配合使用。点击查看大图。

在nDisplay设置中，有 *主* 计算机和其他计算机的 *群集*。主计算机是管理和调度输入信息的集中位置。主计算机还确保了该群集内的所有计算机均处于同步状态，且同时接收输入和数据。有关nDisplay设置的更多信息，请参阅[nDisplay概述](/documentation/zh-cn/unreal-engine/ndisplay-overview-for-unreal-engine)。

[Switchboard](/documentation/zh-cn/unreal-engine/switchboard-in-unreal-engine)是外部应用程序，允许单个操作员控制nDisplay群集。Switchboard具有高级日志记录、系统监控和与外部软件集成等附加功能，可同时触发第三方动作捕获软件使用[镜头试拍录制器](/documentation/zh-cn/unreal-engine/record-gameplay-in-unreal-engine)进行录制。

按照以下步骤使用Switchboard启动nDisplay群集：

1.  在工具栏上，点击 **Switchboard** 按钮。如果这是你第一次启动Switchboard，则会出现命令提示符，并安装所需的依赖项。
    
    ![启动Switchboard](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/186cbfc3-b85d-4c65-9833-39d08835edd7/launch-switch.png "Launch Switchboard")
2.  在工具栏中，点击 **Switchboard** 按钮旁边的三个点，然后在下拉菜单中，选择 **启动SwitchboardListener（Launch SwitchboardListener）** 。该配套应用程序必须在群集中的每台机器上运行才能连接到Switchboard。
    
    ![启动Switchboard监听器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd391243-85ae-4a70-a9c6-c40249849313/launch-sb-listener.png "Launch Switchboard Listener")
3.  为项目新建 **Switchboard配置（Switchboard Configuration）** 。
    1.  如果你是首次运行Switchboard，启动Switchboard时会显示 **新增Switchboard配置（Add New Switchboard Configuration）** 窗口。
    2.  如果不是首次运行，点击该窗口左上角的 **配置 > 新配置（Configs > New Config）** ，打开 **新增Switchboard配置（Add New Switchboard Configuration）** 窗口。
4.  在 **新增Switchboard配置（Add New Switchboard Configuration）** 窗口中：
    
    1.  将 **配置路径（Config Path）** 设置为 **ICVFXQuickStart** 。
    2.  将 **uProject** 设置为计算机上摄像机内视觉特效处理示例项目的位置。
    3.  将 **引擎Dir（Engine Dir）** 设置为虚幻引擎5的位置。
    4.  点击 **确定（OK）** 。
    
    ![新增Switchboard配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bec6d88-896f-4b12-a0e0-e40f575b1053/add-new-sb-config.png "Add a new Switchboard config")
5.  在Switchboard中，将 **关卡（Level）** 设置为 **主（Main）** 。
    
    ![将Switchboard关卡设置为主](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/821860cb-d3a6-4ed1-bf62-b5f7743da0bf/sb-level-main.png "Set Switchboard Level to Main")
6.  点击 **添加设备（Add Device）> nDisplay** ，打开 **添加nDisplay设备（Add nDisplay Device）** 窗口。
    
    ![添加nDisplay设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0fd0589-3f96-4fef-a37f-7d247ff48d1e/add-ndisplay-device.png "Add an nDisplay device")
7.  在 **添加nDisplay设备（Add nDisplay Device）** 窗口中，点击 **填充（Populate）** 按钮，查看项目中的可用nDisplay配置资产列表。选择在之前分段中创建的nDisplay资产 **NDC\_InCameraVFXQuickStart** ，然后点击 **确定（OK）** 。
    
    ![添加QuickStart资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a65e4402-0eee-4e61-8b6c-c08e72e46edf/add-quickstart-asset.png "Add the QuickStart Asset")
8.  群集节点将出现在 **nDisplay设备（nDisplay Devices）** 下。
    1.  点击其 **连接到监听器（Connect to listener）** 按钮，连接到Switchboard监听器（Switchboard Listener）。
        
        ![在新节点上点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12d7488b-296c-472f-b6e5-2848a11141f7/new-ndisplay-node.png "Click Connect to listener on the new node")
    2.  点击其 **启动虚幻（Start Unreal）** 按钮，使用nDisplay渲染器启动虚幻。
        
        ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec47c0c1-a26f-4c3b-aa29-340408642fba/start-unreal.png "Start Unreal button")
9.  nDisplay启动时，计算机上的所有窗口都会最小化，并且显示nDisplay视图。

## 第5步 - 加入多用户会话

多用户编辑系统实现了可靠的协作，支持所有类型的更改。同一多用户会话中的多台运算符设备可以执行不同的任务，并实时修改场景。在nDisplay设置中，多用户负责在群集节点上同步虚幻引擎各种实例之间的更改，确保在拍摄期间对场景的创意更新立即同时出现在LED墙上。

按照以下步骤，通过多用户功能将你的虚幻编辑器连接到nDisplay渲染器。

1.  在Switchboard中，点击nDisplay节点上的 **停止虚幻（Stop Unreal）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50563e18-cf60-4e08-99a8-32349c15db67/stop-unreal.png "Stop Unreal button")
2.  点击 **设置（Settings）** 按钮，打开 **Switchboard设置（Switchboard Settings）** 窗口。
3.  在 **多用户服务器（Multi User Server）** 分段下：
    1.  将 **服务器名称（Server Name）** 设置为 **ICVFXQuickStart\_MU\_Server** 。
    2.  启用 **自动加入（Auto Join）** ，以便所有虚幻实例或nDisplay节点自动尝试连接。
    3.  启用 **自动启动（Auto Launch）** 。此项未启用时， **多用户服务器可执行文件（Multi User Server Executable）** 将不会启动。
        
        ![多用户服务器设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb99fda2-8b71-40f6-b2dd-0f9611de07e5/enable-auto-launch.png "The Multi User Server settings")
4.  关闭 **设置（Settings）** 窗口。
5.  将 **多用户会话（Multiuser Session）** 设置为 **ICFVXQuickStart\_Session\_001** 。
    
    ![设置多用户会话](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29835026-696a-4653-8d99-c92344bce0d1/multi-user-session.png "Set the multi user session")
6.  点击nDisplay节点旁边的 **启动虚幻（Start Unreal）** 按钮重新启动它。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7440e646-1a80-4109-ba81-68f51f61e7a0/start-unreal.png "Start Unreal button")
7.  等待nDisplay节点完成启动，然后再进行下一步。
8.  在编辑器的 **工具栏（Toolbar）** 中，点击 **浏览（Browse）** 按钮，打开 **多用户浏览器（Multi-User Browser）** 。
    
    ![工具栏中的](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cf97338-ae58-43fd-ab24-072f54bc7074/browse-button.png "Browse button in the Toolbar")
9.  在 **多用户浏览器（Multi-User Browser）** 中，双击 **ICVFXQuickStart\_Session\_001** ，将虚幻编辑器连接到使用nDisplay启动的多用户会话。
    
    如果虚幻编辑器显示有关内存更改的消息，并阻止你加入多用户会话，则意味着编辑器中的某些内容可能已更改但未保存，并且你的项目与正在运行nDisplay的项目的当前状态不匹配。加入多用户会话的所有项目都应处于完全相同的状态。要解决此问题，务必要先保存项目，然后再启动nDisplay。
    
10.  多用户浏览器（Multi-User Browser）现在更改为向你展示你当前连接的会话，以及每个用户的激活关卡。客户端（Clients）类别将向你展示连接了哪些节点和编辑器实例。历史记录将列出通过多用户会话进行的操作。细节（Details）将展示有关历史记录（History）类别中当前选定操作的更多信息。
    
11.  你在编辑器中所做的更改现在会传输到nDisplay节点。移动 **NDC\_ICVFXQuickStart** 的 **默认视点（Default View Point）** 组件，查看nDisplay视图随编辑器中的更改如何更新。

## 第6步 - 将Live Link用于摄像机追踪

Live Link是虚幻引擎内摄取实时数据的框架，这些实时数据包括摄像机、光源、变换和基本属性。对于摄像机内视觉特效处理，Live Link在分发被追踪的摄像机信息方面至关重要，并可将其启用，配合nDisplay将追踪信息送至每个群集节点。虚幻引擎通过Live Link实现了对多种摄像机追踪合作伙伴的支持，其中包括Vicon、Stype、Mo-Sys和Ncam，以及多种其他专业追踪解决方案。Live Link还支持XR设备，例如作为Live Link源的Vive追踪器和控制器。

这一步的关键是，你要有一个可用的Live Link源。本指南将介绍如何在你的项目中设置Live Link XR，以便你可以使用VR头戴设备和控制器进行跟踪。你可以使用类似的步骤启用其他Live Link源。请参阅[Live Link XR](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine)，了解更多详情。

要使用nDisplay通过Live Link XR追踪摄像机内视锥，请执行以下操作：

1.  在虚幻编辑器的 **主菜单** 中，选择 **窗口（Window）> 虚拟制片（Virtual Production）> Live Link** ，打开Live Link面板。
    
    ![在窗口下拉菜单中高亮显示了Live Link的编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65053e2e-3d86-4ddc-a762-63fba31da49e/image_15.png "The editor with Live Link highlighted in the Window dropdown")
2.  在Live Link面板中，点击 **添加源（Add Source）** 按钮。在下拉菜单中，选择 **Live Link XR源（Live Link XR Source）** 。
    
3.  在显示的 **连接设置（Connection Settings）** 面板中，启用 **追踪控制器（Track Controllers）** 和 **追踪HMD（Track HMDs）** 并点击 **添加（Add）** 。
    
    ![连接设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/954acaf4-5091-4c50-bf71-6814ea93d51e/live-link-connection-settings.png "The connection settings")
4.  添加Live Link XR源后，连接的XR设备会出现在主题（Subject）面板的XR分段下。
    
    ![连接的XR设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a44aa8c-9f75-4d70-a33c-aed1ea28f7e2/connected-xr-devices.png "Connected XR devices")
5.  在主题面板中，选择你要用于追踪的XR设备，打开其细节面板。在细节面板中，启用 **转播主题（Rebroadcast Subject）** ，与多用户会话中的其他计算机共享追踪数据。
    
6.  点击 **预设（Presets）** ，然后选择 **另存为预设（Save As Preset）** 。
    
7.  在主菜单中，选择 **编辑（Edit）>项目设置（Project Settings）** 。
    
8.  在 **项目设置（Project Settings）** 中的 **插件（Plugins）** 下，选择 **Live Link** 。
    
9.  将Live Link预设添加至 **默认LiveLink预设（Default Live Link Preset）** ，以在项目运行时自动应用预设。
    
    ![设置Live Link预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c69b6d8-747c-43ed-a406-895df81b8f02/default-live-link-preset.png "Set the Default Live Link Preset")
10.  在 **大纲视图（Outliner）** 中，选择 **DemoDisplay3\_innerFrustum** ，打开其 **细节（Details）** 面板。
    
11.  点击 **添加组件（Add Component）** 并选择 **Live Link控制器（Live Link Controller）** ，将 **Live Link组件控制器（Live Link Component Controller）** 添加到过场动画摄像机Actor。
    
12.  在 **DemoDisplay3\_innerFrustum** 的 **组件（Component）** 分段中，选择 **LiveLinkComponentController** 查看其设置。
    
13.  在 **Live Link** 下，将 **主题表示（Subject Representation）** 参数设置为你的Live Link主题。在本例中，Live Link主题是SteamVR控制器（SteamVR Controller）。
    
    ![设置Live Link主题表示](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7574bd1-6094-4c2a-8024-aebb205776d3/live-link-subj-repres.png "Set the Live Link Subject Representation")
14.  选择NDC\_ICVFXQuickStart Actor的ICVFX摄像机组件，打开其细节面板。将过场动画摄像机Actor设置为DemoDisplay3\_innerFrustum。
    
    ![设置过场动画摄像机Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e17caab-fdc7-4ba4-bbe9-ff533e21cab9/set-cine-camera-actor.png "Set the Cine Camera Actor")
15.  移动XR设备时，编辑器中的摄像机会模仿移动。摄像机面向网格体时，内视锥还会显示在nDisplay预览中。
    
16.  保存项目。
    
17.  重启nDisplay群集，在nDisplay渲染器中查看更改。
    

## 第7步 - 启用绿幕和色键

你可以将在虚拟世界的LED面板上显示内视锥体中的内容，变更为在带有色键标识的绿幕上显示。

执行以下步骤让绿幕变得可见，并修改色键标识：

1.  在 **大纲视图（Outliner）** 中，选择 **NDC\_ICVFXQuickStart** 。
    
2.  在 **细节（Details）** 面板中，选择 **ICVFXCamera** 组件查看其设置。
    
3.  在 **细节（Details）** 面板中的 **色键（Chromakey）** 下，启用 **启用内视锥色键（Enable Inner Frustum Chromakey）** 。
    
    ![启用内视锥色键](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/247358e6-365f-4edb-9ce9-8157fa72e921/enable-inner-frustum-chromakey.png "Enable inner frustum chromakey")
4.  内视锥体变为绿色，追踪标识在顶部渲染。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8451a08d-5e13-4d11-9745-9674f3bafd62/inner-frustum-green-tracking-marks.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8451a08d-5e13-4d11-9745-9674f3bafd62/inner-frustum-green-tracking-marks.png)
    
    点击查看大图。
    
5.  更改 **色键（Chromakey）** 分段中的参数，从而修改颜色、标识位置和自定义标识Alpha纹理。如需详细了解设置，请参阅[nDisplay根Actor参考](/documentation/zh-cn/unreal-engine/ndisplay-root-actor-reference-for-unreal-engine)。
    

本小节介绍了如何为内视锥体启用色键。启用了色键的示例nDisplay配置资产已经包含在具有四边形网格体布局的项目中。你可以在 **内容浏览器（Content Browser）** 的 **nDisplayConfigs/nDisplayExample\_Chromakey** 中找到此资产。

## 第8步 - 添加发光板

你可以在nDisplay插件内容中找到发光板。发光板Actor应该生成到单独的层，以便利用nDisplay的发光板控制功能，并作为配置Actor外视锥体视点的父级，以获得最佳效果。

按照下面的步骤将发光板添加到你的项目。

1.  在 **内容浏览器（Content Browser）** 中，点击 **设置（Settings）** ，然后同时启用 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）** 。
    
    ![内容浏览器的视图选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1f024156-b2ee-4a25-93b7-37310f0fc385/content-browser-view-options.png "View Options for the Content Browser")
2.  在 **源（Sources）** 面板中，打开 **nDisplay Content/LightCard** 文件夹。
    
    ![打开nDisplay Content Lightcard文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddb06638-1eb3-4558-9740-c3ba29988794/ndisplay-content-lightcard.png "Open the nDisplay Content Lightcard folder")
3.  将蓝图 **LightCard** 拖入你的关卡中。在 **大纲视图（World Outliner）** 中，将 **LightCard** Actor设为 **NDC\_ICVFXQuickStart** 的子项。
    
    ![将发光板拖入关卡中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1de8db6d-e095-47af-acf3-5fa686ddba2a/lightcard-quickstart.png "Dragging a Lightcard into the level")
    
    样条线能直观地显示发光板的经纬度位置。为了更好地投影到外视锥体，将 **发光板** Actor放置在与nDisplay根Actor中的视图原点组件（View Origin Component）相同的位置。
    
4.  在主菜单中，选择 **窗口（Window）>图层（Layers）** ，打开 **图层（Layers）** 面板。
    
    ![图层面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6dce954-673d-44f2-8933-65e8d554f272/layers-window.png "The Layers panel")
5.  在 **图层（Layers）** 面板中，右键点击并从下拉列表中选择 **创建空图层（Create Empty Layer）** 。将图层命名为 **ICVFXQuickStart\_LightCards** 。
    
    ![创建并命名图层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b510aae3-deb3-46bd-b36d-18b1ad040e42/lightcards-layer.png "Create and name a Layer")
6.  在 **大纲视图（Outliner）** 中，选择 **发光板（Light Card）** 。右键点击 **ICVFXQuickStart\_LightCards** 图层，并选择 **将选定的Actor添加到选定的图层（Add Selected Actors to Selected Layers）** 。
    
    ![将发光板Actor添加到图层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/390b071b-97c6-4e01-a096-9119078bba94/add-lightcard-actor.png "Add Lightcard Actors to the Layer")
7.  在 **大纲视图（Outliner）** 中，选择 **NDC\_ICVFXQuickStart** ，打开其 **细节（Details）** 面板。
8.  在 **细节（Details）** 面板的 **发光板（Light Cards）** 下，将 **数组元素（Array element）** 添加到 **图层（Layers）** 参数。
    
    ![将数组元素添加到图层](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ce41b25-fd22-4a0a-bf05-311140790188/add-array-element.png "Add an Array element to the Layer")
9.  将 **图层数组元素（Layer Array element）** 设置为 **ICVFXQuickStart\_LightCards** 。
    
    ![将图层数组元素设置为你的发光板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8fc200a-5075-4996-878f-6a21990f311f/set-layer-array-element.png "Set the Layer Array element to your Lightcard")

如需详细了解发光板设置，请参阅[nDisplay根Actor参考](/documentation/zh-cn/unreal-engine/ndisplay-root-actor-reference-for-unreal-engine)。

## 第9步 - 多视锥体拍摄

nDisplay配置资产中可以出现多个内视锥体。在这一步中，我们将第二个 **ICVFXCamera** 组件添加到NDC\_ICVFXQuickStart nDisplay配置资产，并就多视锥体拍摄设置它。

按照以下步骤将另一个ICVFX摄像机组件添加到nDisplay配置资产。

1.  停止所有nDisplay节点，然后再执行下一步。
2.  在 **内容浏览器（Content Browser）** 中，双击 **NDC\_ICVFXQuickStart** 资产。当前， **组件（Components）** 面板中已经有 **ICVFXCamera** 组件。
    
    ![打开摄像机组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/223d49d0-1c9e-4af2-bce8-b132063ce620/icvfx-camera-component.png "Open the Camera Component")
3.  点击 **添加组件（Add Component）** 并添加另一个 **ICVFXCamera** 组件。确保两者都是组件（Component）层级中 **根组件（Root Component）** 的子级。按如下所示命名这两个 **ICVFXCamera** 组件：
    
    1.  **ICVFXCamera\_ACam**
    2.  **ICVFXCamera\_BCam**
    
    ![命名摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c50a375c-5c75-4bff-ac77-b85e43483219/icvfx-acam-bcam.png "Naming the cameras")
4.  选择新的 **ICVFXCamera** 组件，并在视口中操作它，查看多个视锥体投影。
    
    ![操作多个视锥体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/012cc44b-e555-4471-b906-44077e29d2f8/multiple-frustums-moving.gif)
5.  **编译（Compile）** 并 **保存（Save）** nDisplay配置资产。
6.  从此资产创建的nDisplay根Actor会随关卡中的第二个摄像机自动更新。
7.  在 **大纲视图（Outliner）** 中，选择 **NDC\_ICVFXQuickStart** ，打开其 **细节（Details）** 面板。在 **细节（Details）** 面板的 **摄像机内视觉特效处理** 下，展开 **内视锥体优先级（Inner Frustum Priority）** ，并更改摄像机的顺序。摄像机重叠时，首先列出的摄像机会在另一个摄像机之上渲染。
    
    ![演示视锥体优先级](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/970849b0-2b1d-4517-9c3a-4f09937d78ea/frustum-priority.gif)
8.  将新的 **过场动画摄像机Actor（CineCamera Actor）** 添加到你的关卡，从 **ICVFXCamera** 组件引用它。将 **LiveLinkComponentController** 添加到新的 **过场动画摄像机Actor（CineCamera Actor）** ，并将 **Live Link主题（Live Link Subject）** 连接到该组件。

本小节介绍了如何向nDisplay配置资产添加另一个自带内视锥体的摄像机。带有两个摄像机的示例nDisplay配置资产已经包含在具有四边形网格体布局的项目中。你可以在 **内容浏览器（Content Browser）** 的 **nDisplayConfigs/nDisplayExample\_multiFrustum** 中找到此资产。

## 第10步 - 应用OpenColorIO配置

本小节将介绍如何从插件内容OCIO配置文件创建 **OCIO配置资产（OCIO Configuration Asset）** ，并将其指定给 **nDisplay根Actor** 视口。

按以下步骤在项目中使用OCIO配置：

1.  在 **大纲视图（Outliner）** 中，选择 **NDC\_ICVFXQuickStart** ，打开其细节面板。
2.  在 **细节（Details）** 面板的 **OCIO** 中，选中 **启用视口OCIO（Enable Viewport OCIO）** 。
3.  展开 **所有视口颜色配置（All Viewports Color Configuration）** 。
    1.  将 **配置源（Configuration Source）** 设置为 **ExampleOCIO** 。
    2.  将 **源颜色空间（Source Color Space）** 设置为 **实用程序 - 原始（Utility - Raw）** 。
    3.  将 **目标颜色空间（Destination Color Space）** 设置为 **输出 - sRGB监视器（Output -sRGB Monitor）** 。

![设置目标颜色空间设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a6235b0c-bc53-4fa9-b386-0451320bf600/set-destination-color-space.png "Set the destination color space settings")

这些步骤介绍了如何将OCIO配置添加到项目。也可逐视口在内视锥体上单独进行OCIO配置。如需详细了解如何操作，请参阅[nDisplay中的颜色管理](/documentation/zh-cn/unreal-engine/color-management-in-ndisplay-in-unreal-engine)。

## 第11步 - 远程控制场景

**远程控制Web界面（Remote Control Web Interface）** 是使用 **远程控制API（Remote Control API）** 的可定制Web应用程序。本小节将介绍如何创建 **远程控制预设（Remote Control Preset）** ，并从Web浏览器界面更改关卡。

按照以下步骤创建自己的远程控制预设和远程控制Web应用程序。

1.  在 **内容浏览器（Content Browser）** 中，右键点击并选择 **远程控制（Remote Control）> 远程控制预设（Remote Control Preset）** ，新建 **远程控制预设（Remote Control Preset）** 资产。
    
    ![创建新的远程控制预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51c900bf-b4f6-439e-8160-df77d40a159c/create-remote-control-preset.png "Create a new Remote Control Preset")
2.  双击 **远程控制预设（Remote Control Preset）** 资产，打开 **远程控制面板（Remote Control Panel）** 。
    
    ![远程控制面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a624a09-2130-4cca-9988-7545d6f44efc/open-remote-control-panel.png "The Remote Control Panel")
3.  在 **大纲视图（Outliner）** 中，选择Actor **CR\_Mannequin\_Body** ，打开其 **细节（Details）** 面板。
4.  在 **细节（Details）** 面板中的 **变换（Transform）** 分段下，点击 **公开（Expose）** 按钮，向远程控制API公开 **位置（Location）** 和 **旋转（Rotation）** 属性。
    
    ![向远程控制API公开位置和旋转属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f88c7306-9c69-4872-a708-c880ffa452ee/expose-rotation-location.gif)
5.  在 **远程控制面板（Remote Control Panel）** 中，点击 **启动Web应用（Launch Web App）** 按钮，启动将连接到 **远程控制Web应用程序（Remote Control Web Application）** 的Web浏览器。在你的本地计算机上，Web应用可通过 **127.0.0.1:7000** 访问。
    
    ![启动Web浏览器以连接到远程控制Web应用程序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69787f12-14fc-44d4-a010-43f375c3cd82/launch-web-app.png "Launch the web browser to connect to the Remote Control Web Application")
6.  在 **远程控制Web应用程序（Remote Control Web Application）** 中，将 **控制（Control）** 切换到 **设计（Design）** 模式。
    
    ![在控制和设计之间切换](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2ff7229-17c3-4681-b7fa-b307bc20834c/toggle-control-design.gif)
7.  选择 **属性（Properties）** 选项卡。
8.  点击 **相对位置（Relative Location）** ，并将其拖到空画布上。将属性添加到界面后，在 **属性（Properties）** 选项卡中，属性旁边会出现蓝色圆圈。
    
    ![点击并拖动相对位置控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d253092-2121-48ae-9fe0-4f4cc80f1167/drag-relative-location-widget.gif)
9.  点击 **相对旋转（Relative Rotation）** ，并将其拖到相同画布上。
10.  在画布中选择 **相对位置控件（Relative Location Widget）** ，打开其设置。
11.  在 **相对位置（Relative Location）** 的控件设置中，将 **控件（Widget）** 设置为 **摇杆（Joystick）** ，可以更改控件的外观。
    
    ![将控件设置为摇杆](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5417bf29-80e6-40cf-8cdc-212b1a67a35b/set-widget-joystick.png "Set the widget to joystick")
12.  选择 **相对旋转控件（Relative Rotation Widget）** ，打开其设置。
13.  在 **相对旋转（Relative Rotation）** 的控件设置中，将 **控件（Widget）** 设置为 **滑块（Sliders）** 。
14.  从 **设计（Design）** 模式切换到 **控制（Control）** 模式，锁定界面。
15.  在你的编辑器视口可见的情况下，与UI功能按钮交互，可以查看它如何影响你的关卡。
    
    ![操纵远程控制UI来影响你的关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2af2bf68-519d-4779-8bd4-8e31118066ee/widget-effects-on-ui.gif)

## 第12步 - 自行尝试

本指南涵盖了在LED屏幕上设置显示，在多台计算机上启动你的项目，以及将摄像机追踪整合到项目中。其他示例nDisplay配置资产包含在项目的nDisplayConfigs文件夹中，显示如何在其他配置中设置群集，包括多节点和mGPU。

多显示设置要求实现软件和硬件层面的同步。使用相同的模拟时间信息，不仅生成的内容要在所有PC上同时准备就绪，而且还需要在正确的时间进行显示交换（将当前图像换成视频卡缓冲区中的下一个图像），以免显示中出现类似撕裂的瑕疵效果。关于在设备上设置显示同步和同步锁定，以便在多个显示器之间创建无缝视图的信息，请参阅[nDisplay中的同步](/documentation/zh-cn/unreal-engine/synchronization-in-ndisplay-in-unreal-engine#%E8%AE%A9%E5%90%8C%E6%AD%A5%E5%BC%80%E5%A7%8B%E5%B7%A5%E4%BD%9C)。

除了同步显示外，引擎的时间码和帧生成需要匹配来自摄像机的输入。如何在所有设备之间同步时间码以及同步锁定引擎的步骤，请参阅[时间码和同步锁定](/documentation/zh-cn/unreal-engine/timecode-and-genlock-in-unreal-engine)。

要在拍摄影片时控制场景和显示，你可以尝试数种摄像机内视觉特效处理方法：

-   通过[多用户编辑](/documentation/zh-cn/unreal-engine/getting-started-with-multi-user-editing-in-unreal-engine)实时修改现场场景
-   通过[Composure](/documentation/zh-cn/unreal-engine/real-time-compositing-quick-start-for-unreal-engine)实时复合
-   使用[颜色校正区域](/documentation/zh-cn/unreal-engine/color-correct-regions-in-unreal-engine)匹配现实世界场景与LED墙上显示的环境之间的光照和阴影。
-   使用[关卡快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine)保存和恢复每个镜头试拍的Actor状态。
-   使用[摄像机内视觉特效处理摄像机校准](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine)指南，为你的摄像机校准LED墙上的内容显示。
-   使用[舞台监视器](/documentation/zh-cn/unreal-engine/stage-monitor-with-unreal-engine)从你网络中的每台机器接收和监视事件。 使用[定时数据监视器](/documentation/zh-cn/unreal-engine/timed-data-monitor-in-unreal-engine)监视、校准和查看传入的定时数据。 使用[nDisplay中的摄像机运动模糊](/documentation/zh-cn/unreal-engine/camera-motion-blur-with-ndisplay-in-unreal-engine)在过程拍摄中有效地运用运动模糊。 使用[nDisplay中的颜色管理](/documentation/zh-cn/unreal-engine/color-management-in-ndisplay-in-unreal-engine)仅对显示器和内视锥体进行颜色校正。

本指南介绍了摄像机内视觉特效处理项目的基础知识。有关真实制片项目的示例，请参阅[摄像机内视觉特效处理制片测试](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine)。

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [virtual scouting](https://dev.epicgames.com/community/search?query=virtual%20scouting)
-   [live link](https://dev.epicgames.com/community/search?query=live%20link)
-   [in-camera vfx](https://dev.epicgames.com/community/search?query=in-camera%20vfx)
-   [composure](https://dev.epicgames.com/community/search?query=composure)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)
-   [multi-user editing](https://dev.epicgames.com/community/search?query=multi-user%20editing)
-   [synchronization](https://dev.epicgames.com/community/search?query=synchronization)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [第1步 - 为摄像机内视觉特效处理设置项目](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC1%E6%AD%A5-%E4%B8%BA%E6%91%84%E5%83%8F%E6%9C%BA%E5%86%85%E8%A7%86%E8%A7%89%E7%89%B9%E6%95%88%E5%A4%84%E7%90%86%E8%AE%BE%E7%BD%AE%E9%A1%B9%E7%9B%AE)
-   [插件](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E6%8F%92%E4%BB%B6)
-   [nDisplay根Actor](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#ndisplay%E6%A0%B9actor)
-   [第2步 - 创建LED面板几何体](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC2%E6%AD%A5-%E5%88%9B%E5%BB%BAled%E9%9D%A2%E6%9D%BF%E5%87%A0%E4%BD%95%E4%BD%93)
-   [第3步 - 定义你的项目中的LED屏幕](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC3%E6%AD%A5-%E5%AE%9A%E4%B9%89%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE%E4%B8%AD%E7%9A%84led%E5%B1%8F%E5%B9%95)
-   [第4步 - 使用Switchboard启动你的项目](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC4%E6%AD%A5-%E4%BD%BF%E7%94%A8switchboard%E5%90%AF%E5%8A%A8%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE)
-   [第5步 - 加入多用户会话](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC5%E6%AD%A5-%E5%8A%A0%E5%85%A5%E5%A4%9A%E7%94%A8%E6%88%B7%E4%BC%9A%E8%AF%9D)
-   [第6步 - 将Live Link用于摄像机追踪](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC6%E6%AD%A5-%E5%B0%86livelink%E7%94%A8%E4%BA%8E%E6%91%84%E5%83%8F%E6%9C%BA%E8%BF%BD%E8%B8%AA)
-   [第7步 - 启用绿幕和色键](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC7%E6%AD%A5-%E5%90%AF%E7%94%A8%E7%BB%BF%E5%B9%95%E5%92%8C%E8%89%B2%E9%94%AE)
-   [第8步 - 添加发光板](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC8%E6%AD%A5-%E6%B7%BB%E5%8A%A0%E5%8F%91%E5%85%89%E6%9D%BF)
-   [第9步 - 多视锥体拍摄](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC9%E6%AD%A5-%E5%A4%9A%E8%A7%86%E9%94%A5%E4%BD%93%E6%8B%8D%E6%91%84)
-   [第10步 - 应用OpenColorIO配置](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC10%E6%AD%A5-%E5%BA%94%E7%94%A8opencolorio%E9%85%8D%E7%BD%AE)
-   [第11步 - 远程控制场景](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC11%E6%AD%A5-%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E5%9C%BA%E6%99%AF)
-   [第12步 - 自行尝试](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine#%E7%AC%AC12%E6%AD%A5-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95)

相关文档

[

虚幻引擎多用户编辑

![虚幻引擎多用户编辑](https://dev.epicgames.com/community/api/documentation/image/d972b58a-d8bc-4407-a8d1-f7f34989690b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)

[

ICVFX制片测试

![ICVFX制片测试](https://dev.epicgames.com/community/api/documentation/image/693904d1-d3bf-445e-98cc-3d2d67eed6ef?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine)