# 使用Aruco将LED墙对齐到摄像机追踪 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/aligning-the-led-wall-to-camera-tracking-using-arucos-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:26:07.891Z

---

目录

![使用Aruco将LED墙对齐到摄像机追踪](https://dev.epicgames.com/community/api/documentation/image/48b56fb5-e115-42b5-aba3-dc37c27d5718?resizing_type=fill&width=1920&height=335)

## 目标

在本快速入门指南中，你会遍历使用Aruco标识将LED墙对齐到摄像机追踪的步骤。

## 目的

-   为你的LED墙生成Aruco标识。
    
-   在编辑器视口和舞台LED屏幕中预览Aruco标识。
    
-   使用Aruco标识校准你的LED墙。
    

## 1 - 必要设置

对于本指南，你将使用制片摄像机、光学摄像机追踪系统和AJA Kona 5作为源视频输入。此外，你将需要现有LED墙配置以及与你的舞台LED墙配置匹配的nDisplay蓝图。按照[利用nDisplay渲染到多个显示器](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine)文档操作，了解如何创建你的nDisplay蓝图。

继续之前，请按照[针对制片的摄像机校准](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine)指南操作，确保你的摄像机的镜头失真和节点偏移得到校准。这将创建"镜头文件资产"，以在LED墙与摄像机追踪对齐时使用。

本指南中的示例基于Epic LA RnD舞台LED墙设置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c033a74-87fa-46fb-b818-59bb8d8635c1/lwc-epicstage.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c033a74-87fa-46fb-b818-59bb8d8635c1/lwc-epicstage.png)

点击查看大图。

## 2 - 生成Aruco标识

1.  点击 **设置（Settings）> 插件（Plugins）**，打开 **插件菜单（Plugins Menu）**。
    
    ![打开插件菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ce61f01-9ab9-4566-ada3-442b11575d58/lwc-plugins1.png)
2.  搜索 **LED墙校准（LED Wall Calibration）** 和 **Live Link Over nDisplay** 插件并启用。重启编辑器。
    
    ![启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a20e0fb3-3b0e-4be1-a372-0f563ed359ab/lwc-plugins2.png) ![启用Live Link Over nDisplay插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f716e71-e1b5-410e-89d7-559810ebc1e4/lwc-plugins3.png)
3.  在 **内容浏览器（Content Browser）** 中，搜索并双击打开你的 **nDisplay舞台（nDisplay stage）**Actor蓝图。
    
    ![双击nDisplay舞台Actor蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce92ffab-4c09-4aee-b69a-f1bbf6d261f7/lwc-stage0.png)
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04fb9286-848d-43f4-9284-120754092ad9/lwc-stage0a.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04fb9286-848d-43f4-9284-120754092ad9/lwc-stage0a.png)
    
    点击查看大图。
    
4.  从 **组件（Components）** 面板选择你的第一个 **墙壁网格体**，并从 **群集（Cluster）** 面板双击对应的 **群集**。这样你将获得所选显示器的分辨率。
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db5cd0f2-6848-4c5a-a6bb-2bf42cbaa604/lwc-stage1.png)
5.  选择墙壁网格体后，点击 **\+ 添加组件（+ Add Component）**，然后搜索并选择 **校准点（Calibration Point）**。这会将"校准点"组件添加为你的墙壁网格体的子项。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c41b147e-3ef1-49ba-b8bf-653c7813a860/lwc-stage1a.png)
6.  将校准点重命名为 **ArucoW1**。
    
    ![将校准点重命名为ArucoW1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81f6b0d5-3d2f-473c-ab78-5593ddc0bb13/lwc-stage2.png)
7.  选择校准点后，转到 **细节（Details）** 面板，然后向下滚动到 **校准（Calibration）** 分段。点击 **创建Aruco（Create Arucos）**。
    
    ![添加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ed5e4a7-4b00-4713-9de8-be52bb59dc56/lwc-stage3.png)
8.  系统将打开 **Aruco生成选项（Aruco Generation Options）** 窗口。
    
    1.  根据Arucos所应用的墙壁视口，输入对应的 **纹理宽度（Texture Width）** 和 **纹理高度（Texture Height）** 值。
        
    2.  从列表中选择合适的 **Aruco字典（Aruco Dictionary）**。在本示例中，将选择 **DICT\_6x6\_1000** 字典，其中有1000个唯一的Aruco符号。
        
    3.  输入 **标识ID（Marker ID）** 以用作将生成的Aruco标识的起始ID。
        
    4.  输入 **放置模数（Place Modulus）** 值。此值表示在放置Aruco标识时将跳过的LED面板数量。这很适合大型LED墙，如果每个LED面板上都要放置，那么你会使用超过1000个唯一的Aruco符号。默认值为2。若LED墙较小，每个面板上可以显示一个Aruco，请将其更改为1。若使用默认值2，将每隔一个LED面板放置一个Aruco符号。
        
    5.  点击 **确定（OK）**，生成Aruco标识。
        
        ![输入Aruco生成选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed458fcb-eddc-43b6-9bcc-bc73ddb1c057/lwc-stage4.png)
9.  选择保存纹理的位置，然后点击 **确定（OK）**。系统将显示确认窗口，告诉你下一个视口从哪个 **标识ID** 开始。此设置将被UE记住，但可以调整，以防需要更改顺序。点击 **确定（OK）** 以确认。
    
    ![选择纹理的保存目的地](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc7ad7e1-f050-459d-b6a7-30a2db6b506b/lwc-stage5.png) ![保存纹理后的确认消息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0ad6e45-5215-4d39-9d81-60c1990a605a/lwc-stage6.png)
10.  在 **群集（Cluster）** 选项卡中选择要应用此校准点的 **视口（Viewport）**。
    
    ![在](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36923889-297c-43a9-af4a-3f52b487825e/lwc-stage6a.png)
11.  转到右侧的 **细节（Details）** 面板。向下滚动到 **纹理替换（Texture Replacement）** 分段，并将生成的纹理选作 **源纹理（Source Texture）**。启用 **启用视口纹理替换（Enable Viewport Texture Replacement）** 复选框。
    
    ![将生成的纹理添加为源纹理](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f097709b-920a-464c-82a3-62ac89977cf2/lwc-stage7.png)
12.  重复步骤5到10，将Aruco标识添加到剩余的LED视口。
    
13.  在 **内容浏览器（Content Browser）** 中，双击打开 **nDisplay蓝图（nDisplay Blueprint）**。
    
    ![双击nDisplay舞台Actor蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f652245a-8b80-4638-9f96-3a891e43c37f/lwc-stage0.png)
14.  点击 **\+ 变量（+ Variable）** 以创建新的 **布尔** 变量，将其命名为 **Replace\_Viewport\_Textures**。转到 **细节（Details）** 面板，启用 **实例可编辑（Instance Editable）** 复选框。
    
    ![创建新变量并命名为Replace_Viewport_Textures](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de2de0f2-a367-4bd1-8ea2-e7e215e52758/lwc-ndisplay2.png) ![启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/22732de4-a2cf-45b4-9ff8-2c5a50fbf266/lwc-ndisplay3.png)
15.  将 **Replace\_Viewport\_Textures** 拖到 **事件图表（Event Graph）**，并选择 **获取Replace\_Viewport\_Textures（Get Replace\_Viewport\_Textures）** 以创建节点。
    
16.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **为所有视口设置替换纹理标记（Set Replace Texture Flag for All Viewports）**。
    
17.  将 **Event Tick** 节点连接到 **Set Replace Texture Flag for All Viewports** 节点。将 **Replace Viewport Textures** 节点连接到 **Set Replace Texture Flag for All Viewports** 节点的 **替换（Replace）** 引脚。
    
    ![将](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a2edf29b-466c-4775-923a-6ec084f49dd2/lwc-ndisplay4.png)
18.  **编译（Compile）** 并 **保存（Save）** 蓝图。
    
19.  要在nDisplay蓝图的 **预览窗格（Preview Pane）** 中看到更改，请选择nDisplay蓝图并转到 **细节（Details）** 面板。 向下滚动到 **编辑器预览（Editor Preview）** 分段并启用 **替换视口纹理（Replace Viewport Textures）** 和 **启用编辑器预览（Enable Editor Preview）** 复选框。这将显示Aruco标识。
    
    ![选择nDisplay蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/380d37df-f125-4f46-b1be-74fcbb74afb2/lwc-ndisplay4a.png) ![启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/186d3f7c-f671-47e5-960a-55353b82eb9e/lwc-ndisplay4b.png)
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e57ab438-d470-42aa-9011-5df73fcb456d/lwc-ndisplay5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e57ab438-d470-42aa-9011-5df73fcb456d/lwc-ndisplay5.png)
    
    点击查看大图。
    
20.  如果你要使用多个渲染节点，请立即将项目同步到其他计算机。
    
21.  在 **世界大纲视图（World Outliner）** 中，选择 **nDisplay蓝图（nDisplay Blueprint）** 并转到 **细节（Details）** 面板。向下滚动到 **默认（Default）** 选项卡并启用 **替换视口纹理（Replace Viewport Textures）** 复选框。Aruco标识将立即显示在LED墙上。
    
    ![启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f55a393b-a33c-4929-bd47-30d3e779db5b/lwc-ndisplay6.png)
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d253a470-a0be-4c10-84a4-7dda70a754c6/lwc-ndisplay7.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d253a470-a0be-4c10-84a4-7dda70a754c6/lwc-ndisplay7.png)
    
    点击查看大图。
    
22.  要在编辑器视口中查看Aruco标识，请向下滚动到 **编辑器预览（Editor Preview）** 分段并启用 **启用编辑器预览（Enable Editor Preview）** 复选框。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3572362f-42dd-409e-a8f8-04abd80ca2a4/lwc-ndisplay8.png)
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01c3ae39-8861-42f4-8927-1e3755c4b05e/lwc-ndisplay8a.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01c3ae39-8861-42f4-8927-1e3755c4b05e/lwc-ndisplay8a.png)
    
    点击查看大图。
    
23.  要检查LED墙的对齐效果，查看Aruco标识边角处的各个点会很有用。
    
    1.选择在添加Aruco时创建的 **校准点（Calibration Point）**。
    
    1.转到 **细节（Details）** 面板，然后向下滚动到 **校准（Calibration）** 分段。启用 **可视化编辑器中的点（Visualize Points in Editor）** 复选框。
    
    1.**点可视化比例（Point Visualization Scale）** 调整网格体上标识的比例。**可视化形状（Visualization Shape）** 下拉菜单可将标识形状改为 **立方体（Cubes）** 或 **棱锥体（Pyramids）**。请酌情调整这些值。
    
    ![启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a9187a7-9fd9-4b73-9792-1123424ce23d/lwc-visualizepoints1.png)
24.  **编译（Compile）** 并 **保存（Save）** 蓝图。
    
    ![你现在可以看到每个Aruco标识的边角标识](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f83fe15-1e31-4969-bbb6-5c7872fd0832/lwc-visualizepoints2.png)
25.  在 **世界大纲视图（World Outliner）** 窗口中，选择 **nDisplay蓝图（nDisplay Blueprint）** 并转到 **细节（Details）** 面板。向下滚动到 **编辑器预览（Editor Preview）** 分段并启用 **启用编辑器预览（Enable Editor Preview）** 复选框。
    
    这将允许CG Arucos显示在镜头文件中的视口网格体上。应用LED校准之后，CG Aruco将覆盖在摄像机中的实时视频内容上，以在LED墙上显示Aruco。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcb95f51-7339-419e-b174-fbdd7fedc7e8/lwc-ndisplay8.png)
26.  将追踪的制片摄像机和所有其他追踪的对象放在 **追踪节点（Tracking Node）** 下。使 **追踪节点（Tracking Node）** 成为 **nDisplay蓝图（nDisplay Blueprint）** 的子项。
    

### 阶段成果

你生成了Aruco标识，现在可以开始将其用作镜头文件的一部分来校准LED墙。

## 3 - 使用Aruco标识校准你的LED墙

1.  在 **内容浏览器（Content Browser）** 中，双击打开[针对制片的摄像机校准](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine)指南中创建的 **镜头文件（Lens File）**。镜头文件应附加到流送FIZ数据的LiveLinkController下的摄像机。
    
    1.  点击 **节点偏移（Nodal Offset）** 选项卡。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e722a4f-0b7e-4532-91cd-cddd99c38985/lwc-arucos1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e722a4f-0b7e-4532-91cd-cddd99c38985/lwc-arucos1.png)
        
        点击查看大图。
        
    2.  转到 **视口设置（Viewport Settings）**，将 **透明度（Transparency）** 设置为 **0**。这将关闭编辑器中显示的Aruco标识的CG覆层。
        
        ![将透明度设置为0](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/07f99fa5-83b2-46f0-842a-2abceaaeb17d/lwc-arucos2.png)
    3.  转到 **节点偏移（Nodal Offset）** 分段并将 **节点偏移算法（Nodal Offset Algo）** 设置为 **节点偏移Aruco标识（Nodal Offset Aruco markers）**
        
    4.  将 **校准器（Calibrator）** 设置为 **nDisplay蓝图（nDisplay Blueprint）**。在本示例中，它称为 **NDC\_LARD\_2**。
        
    5.  启用 **显示检测（Show Detection）** 复选框**。**这样一来，每次点击 **视口（Viewport）** 时都会捕获一个图像，并用于收集Aruco标识的校准点。
        
        ![调整](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c842d243-49f6-4764-aa45-154065a6c65a/lwc-arucos3.png)
2.  将制片摄像机指向正在显示Aruco标识的LED墙。你现在将收集整个LED墙上的Aruco标识的图像。在视口内点击鼠标以捕获图像。系统将显示已捕获图像的预览效果。点击 **确定（OK）** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e10fe67-0516-4e95-baf9-ff6813976d55/lwc-arucos3a.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e10fe67-0516-4e95-baf9-ff6813976d55/lwc-arucos3a.png)
    
    点击查看大图。
    
3.  重复上一步多次，捕获整个LED墙上的多个图像。你将看到捕获的图像显示在 \*节点偏移（Nodal Offset）\*\* 分段下。
    
4.  捕获整个LED墙上足够的示例后，点击 **应用于摄像机父项（Apply to Camera Parent）** 按钮。这将对之前创建的追踪原点和它下面的追踪制片摄像机进行偏移。
    
5.  要检查LED墙的对齐效果，请将 **透明度（Transparency）** 设置为 **0.5**。这会将显示应用于LED墙网格体的CG Aruco，覆盖物理LED墙上的Aruco。两组Aruco标识现在应该彼此完全重叠。如果不是，虚拟LED网格体与物理LED网格体将不匹配。
    

### 阶段成果

你使用Aruco标识校准了舞台LED墙。

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [in-camera vfx](https://dev.epicgames.com/community/search?query=in-camera%20vfx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/aligning-the-led-wall-to-camera-tracking-using-arucos-in-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/aligning-the-led-wall-to-camera-tracking-using-arucos-in-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/aligning-the-led-wall-to-camera-tracking-using-arucos-in-unreal-engine#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [2 - 生成Aruco标识](/documentation/zh-cn/unreal-engine/aligning-the-led-wall-to-camera-tracking-using-arucos-in-unreal-engine#2-%E7%94%9F%E6%88%90aruco%E6%A0%87%E8%AF%86)
-   [阶段成果](/documentation/zh-cn/unreal-engine/aligning-the-led-wall-to-camera-tracking-using-arucos-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [3 - 使用Aruco标识校准你的LED墙](/documentation/zh-cn/unreal-engine/aligning-the-led-wall-to-camera-tracking-using-arucos-in-unreal-engine#3-%E4%BD%BF%E7%94%A8aruco%E6%A0%87%E8%AF%86%E6%A0%A1%E5%87%86%E4%BD%A0%E7%9A%84led%E5%A2%99)
-   [阶段成果](/documentation/zh-cn/unreal-engine/aligning-the-led-wall-to-camera-tracking-using-arucos-in-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)