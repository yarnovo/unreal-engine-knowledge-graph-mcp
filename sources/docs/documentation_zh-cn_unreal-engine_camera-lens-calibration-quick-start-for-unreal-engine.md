# 摄像机镜头校准快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:25:36.316Z

---

目录

![摄像机镜头校准快速入门指南](https://dev.epicgames.com/community/api/documentation/image/4ea722ae-9721-4cd2-9eac-2effc7579e71?resizing_type=fill&width=1920&height=335)

## 目标

在本快速入门指南中，你将使用"摄像机校准"插件，一步步视频内容的连接和校准。

## 目的

-   将摄像机连接到虚幻引擎，以便提供实时内容。
    
-   使用"摄像机校准"插件校准摄像机。
    

## 1 - 必要设置

在本指南中，我们将使用Blackmagic Ultra HD摄像机、Panasonic Lumix镜头和HTC Vive Tracker 3来控制场景中的电影摄像机Actor。

虚幻引擎目前仅支持有限的超级广角摄像机镜头。

1.  创建新的虚幻引擎项目。选择 **电影、电视和现场活动（Film, Television, and Lived Events）** 类别，然后点击 **下一步（Next）** 按钮。
    
    ![选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b80ccc7b-72f8-4c5b-ae95-9c2f96564980/cc-newproject1.png)
2.  选择 **虚拟制片（Virtual Production）** 模板，然后点击 **下一步（Next）** 按钮。
    
    ![选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f85a6ccb-07ac-4e1e-bf60-e6db61801a37/cc-newproject2.png)
3.  输入文件位置和项目名称，然后点击 **创建项目（Create Project）** 按钮。
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c1ca92be-7369-479a-8350-4ffdfdf1f010/cc-newproject3.png)
4.  编辑器加载之后，点击 **设置（Settings）> 插件（Plugins）**，打开 **插件菜单（Plugins Menu）**。
    
    ![打开插件菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f177f36e-d43a-4ca5-a3a2-90b91c09f231/cc-pluginmenu1.png)
5.  选择 **虚拟制片（Virtual Production）** 类别，然后 **启用** **摄像机校准（Camera Calibration）** 和 **LiveLinkXR** 插件。在弹出框上选择 **是（Yes）**，然后点击 **立即重启（Restart Now）** 按钮，以重启编辑器。
    
    ![启用](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d91e65e1-c00c-4767-bf39-82f570465f76/cc-pluginmenu2.png) ![启用LiveLinkXR插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bda9e007-1780-48e1-b4b6-22baf4134ae5/cc-pluginmenu3.png) ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6739cc21-c84c-4311-a9e4-5d1d3c510959/cc-pluginmenu4.png)

#### 阶段成果

你启用了"摄像机校准"和LiveLinkXR插件，并重启了编辑器。现在你已准备好校准摄像机。

## 2 - 设置场景

1.  转到 **放置Actor（Place Actors）** 面板，然后搜索 **电影摄像机（CineCamera）** **Actor**。将Actor拖入关卡中。
    
    ![将电影摄像机Actor放入关卡中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a196ec1-1b7c-48c0-871d-65860cc4e659/cc-placecamera.png)
2.  在 **放置Actor（Place Actors）** 面板中，搜索 **摄像机校准棋盘格（Camera Calibration Checkerboard）**。将Actor拖入关卡中。
    
    ![将摄像机校准棋盘格Actor放入关卡中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/902e52b8-32ae-40fc-937e-a191ec510afd/cc-placecheckerboard.png)
3.  在 **内容浏览器（Content Browser）** 中，点击 **查看选项（View Options）** 按钮，然后选择 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）** 选项。
    
    ![显示插件内容](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/819484ce-5bb3-4a95-abcc-4c6870fe02d8/cc-showcontent.png)
4.  在 **内容浏览器（Content Browser）** 中，找到 **摄像机校准内容（CameraCalibration Content）> 设备（Devices）> 追踪器（Tracker）**。将 **BP\_UE\_Tracker3** 蓝图拖入关卡中。
    
    ![找到追踪器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f40f85ad-03d1-4b9c-b1ff-ea970decc16f/cc-vivetracker1.png)
5.  选择关卡中的 **电影摄像机Actor（CineCamera Actor）**，然后找到 **细节（Details）** 面板。向下滚动到 **成像区域尺寸（Filmback）** 分段，然后为你的物理摄像机输入匹配的 **传感器宽度（Sensor Width）** 和 **传感器高度（Sensor Height）** 值。
    
    ![输入传感器宽度和高度](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f8db0b7-cce8-46a8-ad57-130551895169/cc-cinecamera-sensorinput.png)
6.  选择 **电影摄像机Actor（CineCamera Actor）** 后，转到 **细节（Details）** 面板，然后点击 **添加组件（Add Component）** 按钮。搜索并选择 **Live Link控制器（Live Link Controller）**。
    
    ![添加Live Link控制器组件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d4750a0a-04d2-424b-8a3e-81980b4437cf/cc-cinecamera-livelink1.png)
7.  转至 **窗口（Window） > Live Link** 以打开 **Live Link** 窗口。
    
    ![打开Live Link窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a60dae9e-8a39-472c-8ed9-d270f9ef22ac/cc-livelink1.png)
8.  转到 **源（Source）> LiveLinkXR源（LiveLinkXR Source）**，然后点击 **添加（Add）** 按钮以添加连接的Vive追踪器。现在你应该会看到正在使用Live Link连接的追踪器。
    
    你可以阅读[SteamVR开发文档](/documentation/404)，了解如何针对HTC Vive和SteamVR设备进行开发。
    
    ![将追踪器添加为源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aee8702f-a17a-417c-8c0c-8c8175e4f6dc/cc-livelink2.png) ![接收追踪信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/48c874ce-0f5d-4100-94d2-247ec06f72a0/cc-livelink3.png)
9.  由于我们不会使用实际的FIZ源，因此需要使用 **LiveLink蓝图虚拟主题（LiveLink Blueprint Virtual Subjects）** 创建虚拟源。右键点击 **内容浏览器（Content Browser）**，然后选择 **LiveLink > 蓝图虚拟主题（Blueprint Virtual Subject）**。点击下拉菜单，选择 **LiveLinkCameraRole**，然后点击 **确定（OK）** 按钮。将蓝图命名为 **VirtualPrestonFIZ**。
    
    ![创建新的虚拟主题](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/019a3505-afae-4108-a67a-405dc09dfbd2/cc-vs-create.png) ![选择LikeLink摄像机角色](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42397b53-3f29-4d67-8f97-1d654fe14a7c/cc-vs-create2.png)
10.  双击打开 **VirtualPrestonFIZ** 蓝图。点击 **\+ 变量（+ Variable）** 按钮以添加新变量。将变量命名为 **Focus**。转到 **细节（Details）** 面板，将 **变量类型（Variable Type）** 设置为 **浮点（Float）**。**启用** **实例可编辑（Instance Editable）** 复选框。
    
    ![添加新变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41b365fc-df28-48a6-bb4d-9cf84480d006/cc-vs-addvariables1.png) ![将其命名为Focus并设置为浮点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0d864cb-9a0e-4537-8f5a-efb750fc3408/cc-vs-addvariables2.png)
11.  重复上述步骤，创建名为 **Zoom** 和 **Iris** 的两个额外的浮点变量。
    
    ![创建Zoom和Iris](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a9ecac6-0a8e-4ed2-b4b7-1a3a3cb6187d/cc-vs-addvariables3.png)
12.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **Update Virtual Subject Static Data**。将 **Update Virtual Subject Static Data** 节点连接到 **Event On Initialize** 节点。右键点击 **Update Virtual Subject Static Data** 节点中的 **静态数据（Static Data）** 引脚，然后选择 **分割结构体引脚（Split Struct Pin）**。
    
    ![添加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61068c03-4f0e-4842-ae8c-fb41b80eab15/cc-vs-addupdateframedata1.png) ![右键点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be72e8a2-cb3b-45f3-8292-28111f0e47ed/cc-vs-addupdateframedata2.png)
13.  **启用** **焦距（Focal Length）**、**光圈（Aperture）** 和 **对焦距离（Focus Distance）** 复选框**，**如下所示。
    
    ![启用焦距、光圈和对焦距离](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b57ee0be-2bb6-4676-8600-e133c322fda5/cc-vs-addupdatestaticdata3.png)
14.  右键点击 **事件图表（Event Graph）**，然后搜索并选择 **更新虚拟主题帧数据（Update Virtual Subject Frame Data）**。将 **Update Virtual Subject Frame Data** 节点连接到 **Event On Update** 节点。右键点击 **Update Virtual Subject Frame Data** 节点中的 **帧数据（Frame Data）** 引脚，然后选择 **分割结构体引脚（Split Struct Pin）**。此事件将在每个更新函数上触发，并且将用于更新可用于每个帧的FIZ数据。
    
    ![添加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96a2a7e7-ce6d-445b-90cf-cdffa6b87400/cc-vs-addupdateframedata1.png) ![右键点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db14a861-5867-45b7-9912-77548b67913e/cc-vs-addupdateframedata2.png)
15.  将 **Zoom** 变量连接到 **焦距（Focal Length）** 引脚。将 **Iris** 变量连接到 **光圈（Aperture）** 引脚。将 **Focus** 变量连接到 **对焦距离（Focus Distance）** 引脚。**编译（Compile）** 并 **保存（Save）** 蓝图。
    
    ![添加](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca9244c3-bd15-432b-ab7d-7b3bdd717724/cc-vs-addupdateframedata3.png)
16.  转到 **源（Source）> 添加虚拟主题（Add Virtual Subject）**，以打开 **虚拟主题（Virtual Subject）** 窗口。选择 **VirtualPrestonFIZ** 主题，然后点击 **添加（Add）** 按钮。
    
    ![将追踪器添加为源](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79336e9a-0f21-442e-9161-14092ff3cc4c/cc-livelink4.png) ![选择虚拟Preston FIZ主题](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31bd1131-f6b9-405a-9b2a-7f33198067f9/cc-livelink5.png) ![虚拟主题现已设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8508d286-b14c-4ba7-ba98-383e3ce06640/cc-livelink6.png)
17.  右键点击 **内容浏览器（Content Browser）**，然后选择 **杂项（Miscellaneous）> 镜头文件（Lens File）**，以创建"镜头文件"资产。将资产命名为 **LumixLens**。
    
    ![创建](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb5b06d0-3b1f-4c9c-8d56-09f3054a7c80/cc-create-lensfile.png)
18.  选择 **电影摄像机Actor（CineCamera Actor）**，然后转到 **细节（Details）** 面板。向下滚动到 **Live Link** 分段，然后点击 **主题表示（Subject Representation）** 旁边的 **下拉菜单**。从列表中选择追踪器。
    
    ![将追踪器添加到电影摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9f9da220-d543-40af-90ca-8a2786eeb664/cc-cinecamera-livelink2.png)
19.  选择 **电影摄像机Actor（CineCamera Actor）** 后，转到 **细节（Details）** 面板，然后点击 **添加组件（Add Component）** 按钮。搜索并选择 **Live Link控制器（Live Link Controller）**，以添加另一个组件。向下滚动到 **Live Link** 分段，然后点击 **主题表示（Subject Representation）** 旁边的 **下拉菜单**。从列表中选择虚拟主题。
    
    ![将虚拟主题添加到电影摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db4fd20c-e1ac-4fce-95b8-471711ca6b3a/cc-cinecamera-livelink3.png)
20.  在 **细节（Details）** 面板中，向下滚动到 **摄像机角色（Camera Role）** 分段，然后点击 **镜头文件（Lens File）** 旁边的下拉菜单。搜索并选择 **LumixLens**。
    
    ![将镜头文件添加到电影摄像机](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/84ec1a5c-9cf0-44f6-b2f3-1053defff9a0/cc-cinecamera-livelink4.png)
21.  选择 **BP\_UE\_Tracker3** 蓝图，然后转到 **细节（Details）** 面板。选择 **LiveLink组件控制器（LiveLink Component Controller）**，然后向下滚动到 **Live Link** 分段。点击 **主题表示（Subject Representation）** 旁边的下拉菜单，然后选择你的追踪器。
    
    ![将主题添加到追踪器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/859b2921-94e0-48de-b9ad-6bc668ced95a/cc-tracker-livelink.png)
22.  选择 **CameraCalibrationCheckerboard** Actor，然后转到 **细节（Details）** 面板。向下滚动到 **校准（Calibration）** 分段，然后输入 **行** 和 **列** 的数量以及 **正方形边长（Square Side Length）**。在本示例中，我们使用下图进行测量。
    
    ![棋盘格示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2081e791-6fe6-48b7-81cf-f69952a33991/cc-checkerboard-example.png) ![输入校准信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b641d138-7d54-4011-985e-12e078c87f43/cc-checkerboard-calibration.png)
23.  将材质添加到 **奇数立方体材质（Odd Cube Material）** 和 **偶数立方体材质（Even Cube Material）** 插槽，以提高可视性。
    
    ![添加材质](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf7c8adb-8e27-45d2-9942-d2c704fcd57e/cc-checkerboard-materials1.png) ![添加材质后生成的棋盘格](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87da6532-1a11-4d61-96e1-96848d411f93/cc-checkerboard-materials2.png)

### 阶段成果

在本分段中，你已将 **电影摄像机（CineCamera）** Actor、**摄像机校准棋盘格（Camera Calibration Checkerboard）** Actor和 **BP\_UE\_Tracker3** 蓝图添加到关卡中。你使用Live Link连接了追踪器，并正确配置了Actor。现在你已准备好校准镜头。

## 3 - 校准镜头

1.  在 **内容浏览器（Content Browser）** 中，双击打开 **LumixLens** 资产。点击 **校准步骤（Calibration Steps）** 面板，然后选择 **镜头信息（Lens Information）** 选项卡。转到 **镜头信息（Lens Info）** 分段，输入镜头信息，然后点击 **保存镜头信息（Save Lens Information）** 按钮。
    
    ![选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a373fb73-a73d-49b8-a5b5-3fe2b87ef3e2/cc-lensfile-lensinfotab.png) ![输入镜头信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/82d7abba-34c7-40b6-8c35-7e3537710652/cc-lensfile-lensinfo.png)
2.  点击 **镜头文件面板（Lens File Panel）**，然后选择 **聚焦（Focus）**。
    
    ![选择聚焦](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d5fff20-02ee-4bb7-93aa-712e2d633f01/cc-lensfile-lensfilepanel-focus1.png)
3.  点击 **+** 按钮，然后为 **输入聚焦（Input Focus）** 输入值0。为 **编码器映射（Encoder Mapping）** 输入值100。点击 **添加（Add）** 按钮，将此数据点添加到图表。重复此步骤，为 **编码器映射（Encoder Mapping）** 输入值1000，为 **输入聚焦（Input Focus）** 输入值1。
    
    ![输入值0的聚焦信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d18b4f67-9009-4da8-9ceb-9b63e603ef87/cc-lensfile-lensfilepanel-focus2.png) ![输入值1的聚焦信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d6f5ddf-a88b-420f-91b8-2bb09ee4f52e/cc-lensfile-lensfilepanel-focus3.png)
4.  选择 **Iris** 并为 **编码器映射（Encoder Mapping）** 输入值1.8，为 **输入聚焦（Input Focus）** 输入值0。点击 **添加（Add）** 按钮，将该数据点添加到图表。重复此步骤，为 **编码器映射（Encoder Mapping）** 输入值4.5，为 **输入光圈（Input Iris）** 输入值1。
    
    ![输入值0的光圈信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/681cf27e-e85d-4544-a0f7-089177f1a2d3/cc-lensfile-lensfilepanel-iris1.png) ![输入值1的光圈信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ec8622d-61b0-4cfb-8499-3fb8a9c5d029/cc-lensfile-lensfilepanel-iris2.png)
5.  返回 **校准步骤（Calibration Steps）** 面板，然后选择 **镜头失真（Lens Distortion）** 选项卡。全屏打开棋盘格图像，并将摄像机对准该图像。在看得到棋盘格整体的情况下，点击视口以捕获图像。重复此步骤多次以捕获多个图像。
    
    在多个变焦级别和聚焦值重复此过程，尽可能实现最佳校准。
    
    ![将摄像机对准棋盘格](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12c3ead6-763d-4364-ac1a-1ce807d96fdb/cc-lensfile-lensdistortion-checkerboard1.png)
6.  从不同的角度拍摄多个图像后，点击 **添加到镜头失真校准（Add To Lens Distortion Calibration）** 按钮。点击弹出窗口上的 **确定（OK）**，以接受校准数据。
    
    ![添加图像进行校准](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b0f9f1a-7010-4e5c-a2de-dbea01f30736/cc-lensfile-lensdistortion-addimages.png)
7.  选择 **节点偏移（Nodal Offset）** 选项卡，然后在 **节点偏移（Nodal Offset）** 分段下点击 **节点偏移算法（Nodal Offset Algo）** 下拉菜单。选择 **节点偏移棋盘格（Nodal Offset Checkerboard）**。
    
    ![选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/078ec7d3-0285-43fc-9d07-5a96cc03b9f2/cc-lensfile-nodaloffset-algo.png)
8.  将摄像机再次对准屏幕上的棋盘格，然后点击视口。这将检测到图像的各个边角。点击 **应用于校准器（Apply to Calibrator）** 按钮，将 **摄像机校准棋盘格（Camera Calibration Checkerboard）** Actor与屏幕上的棋盘格对齐：
    
    ![点击](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6420acde-6419-4780-a8f2-49489d6f665f/cc-lensfile-nodaloffset-apply1.png) ![棋盘格现已在屏幕上对齐](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3df3454-dff7-4af8-b005-1f2e90def317/cc-checkboard-aligned.gif)
9.  现在你可以校准虚拟摄像机的节点偏移。将 **节点偏移算法（Nodal Offset Algo）** 设置为 **节点偏移点方法（Nodal Offset Points Method）\*，并将** 校准器（Calibrator） **设置为你的追踪器。将** 校准点（Calibration Point） **设置为** PointLed\*\*。
    
    ![输入节点偏移信息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1851af58-a090-4273-b956-69e4e4722828/cc-lensfile-nodaloffset-setup.png)
10.  使追踪器的光源朝向摄像机，然后在视口中点击该光源。重复此步骤多次以创建多个数据点。点击 **添加到节点偏移校准（Add To Nodal Offset Calibration）** 按钮。
    
    ![点击光源多次以创建点。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85761e9a-e08c-4a85-941d-6a71bb58c775/cc-lensfile-nodaloffset-setup2.png)
    
    如果追踪不如预期那么准确，你可以使用更多的点重复此过程。
    
    ![追踪器现已对齐](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/440643ea-bba4-4b73-ba2f-6e2c4dba4860/cc-trackers-aligned.gif)
11.  关闭"镜头文件（Lens File）"窗口，并验证电影摄像机Actor现在是否在你移动追踪器时正确地移动。 ![追踪器已正确设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cf8abbe5-82fe-46fc-8b58-120a060f4550/cc_final-demo.gif)
    

#### 阶段成果

在本章节中，你通过镜头文件输入了镜头信息，校准了镜头畸变，并添加了正确的网络偏移。现在你的电影摄像机Actor能够模拟现实摄像机的位置、旋转和镜头畸变效果。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [目标](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine#%E7%9B%AE%E6%A0%87)
-   [目的](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine#%E7%9B%AE%E7%9A%84)
-   [1 - 必要设置](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine#1-%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [阶段成果](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C)
-   [2 - 设置场景](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine#2-%E8%AE%BE%E7%BD%AE%E5%9C%BA%E6%99%AF)
-   [阶段成果](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-2)
-   [3 - 校准镜头](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine#3-%E6%A0%A1%E5%87%86%E9%95%9C%E5%A4%B4)
-   [阶段成果](/documentation/zh-cn/unreal-engine/camera-lens-calibration-quick-start-for-unreal-engine#%E9%98%B6%E6%AE%B5%E6%88%90%E6%9E%9C-3)