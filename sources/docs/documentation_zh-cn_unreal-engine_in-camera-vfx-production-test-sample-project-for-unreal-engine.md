# In-Camera VFX Production Test Sample Project for Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:49:04.093Z

---

目录

![ICVFX制片测试](https://dev.epicgames.com/community/api/documentation/image/953661cb-40dd-4d72-805c-005d18e5655c?resizing_type=fill&width=1920&height=335)

ICVFX制片测试是一个虚拟制片示例，它用到了虚幻引擎和LED摄影棚，涉及移动载具镜头、多像机设置、以及基于多用户设置的镜头间快速切换。本示例是与电影制作人公司\[Bullitt\]联合创建的(https://bullittbranded.com/)。该团队在洛杉矶[Nant Studios](https://www.nantstudios.com/)的LED舞台上，用四天时间在摄像机内制作出最终成品。

短片基于此项目生成。

探究和修改此示例有助于了解以下知识：

-   构建你的虚拟制片项目，使多名美术师可以在制片期间合作，同时对场景进行处理。
    
-   使用GPU Lightmass和多用户设置在一台计算机上烘焙光照，并共享给会话中的所有计算机，更快实现光照变更。
    
-   在多屏幕nDisplay群集上使用mGPU渲染内部视锥体。
    
-   将色彩校正和OCIO配置文件应用至nDisplay渲染，以实现各个场景所需的外观。
    
-   编译远程控制Web应用程序的UI，以满足你的制片需求，并可从平板电脑上对片场进行快速更改。
    
-   应用控制台变量以提高项目性能。
    

本指南介绍制作团队如何在项目中使用虚幻引擎的各项功能来取得最终成果。以此项目为例，设计你自己的制片流程。如需了解摄像机内VFX的基础知识，请参见[摄像机内VFX快速入门](/documentation/zh-cn/unreal-engine/in-camera-vfx-quick-start-for-unreal-engine)。如需此制片过程的幕后花絮，请参见[虚幻引擎聚光灯](https://www.unrealengine.com/en-US/spotlights/taking-unreal-engine-s-latest-in-camera-vfx-toolset-for-a-spin)。

## 舞台设置和硬件

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c064923d-ff6a-48a3-9348-60b20d7551c5/production-test-stage.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c064923d-ff6a-48a3-9348-60b20d7551c5/production-test-stage.jpg)

点击查看大图。

我们使用了四个nDisplay节点渲染以下体积，每个节点分配两个LED面板。

-   **墙壁（Walls）**：**5** 个LED面板，总分辨率 **15312 x 2112**。
    
-   **天花板（Ceiling）**：**3** 个LED面板，总分辨率 **4160 x 5280**。
    

此实际制片示例同时会占用大量CPU和GPU资源，因此它可以在这个大LED体积上以摄像机原本的分辨率渲染。下图显示所有参与制片的设备以及舞台上各个设备之间的连接。要了解各个设备在拍摄期间的具体作用，请参见[摄像机内VFX概述](/documentation/zh-cn/unreal-engine/in-camera-vfx-overview-in-unreal-engine)。要了解推荐的摄像机内VFX拍摄用硬件，请参见[摄像机内VFX推荐硬件](/documentation/zh-cn/unreal-engine/recommended-hardware-for-in-camera-vfx-in-unreal-engine)。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5da29b7-54e5-4c6a-be0b-21d6fa2069ea/production-test-devices.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5da29b7-54e5-4c6a-be0b-21d6fa2069ea/production-test-devices.jpg)

标题：此图显示舞台上所用设备及其相互之间的通信方式。点击查看大图。

## 入门指南

除了代表制片中所用真实舞台的拓扑结构的[nDisplay配置](/documentation/zh-cn/unreal-engine/ndisplay-configuration-file-reference-for-unreal-engine)之外，项目另含一个简单的nDisplay配置，便于你在单个计算机上查看各个场景，而无需LED体积。本节介绍如何使用此简单nDisplay配置在单个计算机上的多用户会话中渲染场景和进行更改。

按照以下步骤，在计算机上的多用户会话中通过nDisplay渲染器启动一个虚幻编辑器实例和一个虚幻引擎实例。

1.  通过 **Fab** 访问[ICVFX制片测试示例](https://fab.com/s/c9a039f679f8)，点击 **添加到我的库（Add to My Library）**，让项目文件出现在 **Epic Games启动程序** 中。
    
2.  在 **Epic Games启动程序** 中，找到 **虚幻引擎 > 库 > Fab库** 以访问项目。
    
    只有在你安装了兼容的引擎版本时，示例项目才会出现在 **Fab库** 中。
    
3.  点击 **创建项目（Create Project）** 并按照屏幕上的提示下载示例并启动新项目。
    1.  关于访问示例内容及虚幻引擎的Fab插件，详见[示例与教程](/documentation/zh-cn/unreal-engine/samples-and-tutorials-for-unreal-engine)。
4.  转到计算机上的虚幻引擎文件夹，在计算机上运行Engine\\Binaries\\Win64\\SwitchboardListener.exe以启动 **SwitchboardListener**。监听器会在启动时自动最小化其窗口，以避免nDisplay设备出现问题。可以在操作系统的任务栏中找到该应用程序。
    
    以下是一个完整路径示例：`C:\Program Files\Epic Games\UE_4.27\Engine\Binaries\Win64\SwitchboardListener.exe`
    
5.  在虚幻引擎文件夹内，运行Engine\\Plugins\\VirtualProduction\\Switchboard\\Source\\Switchboard\\Switchboard.bat以在计算机上启动 **Switchboard**。如果是首次运行Switchboard，则在打开应用程序窗口之前会安装所有必要的依赖项。
    
    以下是一个完整路径示例：`C:\Program Files\Epic Games\UE_4.27\Engine\Plugins\VirtualProduction\Switchboard\Source\Switchboard\Switchboard.bat`
    
6.  新建一个 **Switchboard配置（Switchboard Configuration）**。
    
    -   如果是首次运行Switchboard，启动Switchboard时会显示 **新增Switchboard配置（Add New Switchboard Configuration）** 窗口。
        
    -   如果不是首次运行，点击该窗口左上角的 **配置 > 新配置（Configs > New Config）**，以打开 **新增Switchboard配置（Add New Switchboard Configuration）** 窗口。
        
        ![新增Switchboard配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5379c83-bfeb-46d5-a5b4-f0cfc6826374/switchboard-configs.png)
7.  在 **新增Switchboard配置（Add New Switchboard Configuration）** 窗口中：
    
    1.  将 **配置路径（Config Path）** 设置为要存放Switchboard配置文件的名称和路径。
        
    2.  将 **uProject** 设置为摄像机内VFX制片测试示例项目文件 `TheOrigin.uproject` 的路径。
        
    3.  确保 **引擎目录（Engine Dir）** 指向虚幻引擎的 **Engine** 文件夹。
        
    4.  点击 **确定（OK）** 创建Switchboard配置。
        
        ![新Switchboard配置路径](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/341f09b0-6f30-46bc-a386-b9a4dd9e9711/new-switchboard-config.png)
8.  将 **关卡（Level）** 设置为 **CaveEntrance\_NantStudiosSimple**。
    
    ![在Switchboard中设置关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/079f1459-6f12-4a9e-914d-c450dc82a729/switchboard-set-level.png)
9.  向Switchboard添加nDisplay设备：
    
    1.  点击 **添加设备（Add Device）** 并从下拉菜单中选择 **nDisplay**。
        
        ![添加nDisplay设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a62340c6-e0da-4c75-999d-53f7281439d9/add-ndisplay-device-1.png)
    2.  在 **添加nDisplay设备窗口（Add nDisplay Device window）** 中，点击 **浏览（Browse）**，导航至示例项目文件夹中的Content\\TheOrigin\\Content\\Stages\\NantStudiosSimple\\Config\\NDC\_NantStudiosSimple.u资产。
        
        ![浏览至nDisplay设备.uasset文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d1441799-a2f9-4136-8a22-1ba04c155936/add-ndisplay-device-2.png)
    3.  点击 **确定（OK）** 可看到一个添加到Switchboard的nDisplay设备。
        
        ![添加到Switchboard的nDisplay设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75323864-219d-4632-8ca7-539c6df78aca/ndisplay-added-switchboard.png)
10.  向Switchboard添加虚幻设备：
    
    1.  再次点击 **添加设备（Add Device）** 并从下拉菜单中选择 **虚幻（Unreal）**。
        
        ![添加虚幻设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98807e2f-819f-4b6c-811d-ab02d751ad8c/add-unreal-device.png)
    2.  在 **添加虚幻设备（Add Unreal Device）** 窗口中，将 **IP地址（IP Address）** 设置为本地计算机：**127.0.0.1**。
        
        ![设置虚幻设备本地IP地址](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0027bd29-3e34-4482-872b-701d0e1ce19d/set-ip-address.png)
    3.  点击 **确定（OK）** 可看到一个添加到Switchboard的nDisplay设备。
        
        ![添加到Switchboard的虚幻设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dbb5be70-f75a-4e76-ab47-44aa303e47e2/unreal-added-switchboard.png)
11.  点击nDisplay **Render\_2** 设备的 **连接监听器（Connect to Listener）** 按钮，连接到SwitchboardListener。
    
    ![Switchboard中nDisplay设备的连接监听器按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3db1674c-0e66-4a7e-94b7-2f1f8c33cc08/connect-to-listener.png)
12.  点击nDisplay **Render\_2** 设备的 **启动虚幻（Start Unreal）** 按钮，使用多用户会话中的nDisplay渲染器启动虚幻。
    
    ![Switchboard中nDisplay设备的启动虚幻按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc18ecf1-8d00-4e83-a1b5-69b2b5fa8c44/start-unreal.png)
13.  所有窗口自动最小化，全屏显示nDisplay渲染。视图可能略暗，但可以在后续步骤中更改。
    
14.  打开最小化的Switchboard窗口，点击虚幻设备的 **连接监听器（Connect to listener）** 按钮以连接到SwitchboardListener。
    
    ![Switchboard中虚幻设备的连接监听器按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c1f7685-fd7a-41dd-81be-3e56d4000b08/connect-unreal-device.png)
15.  点击虚幻设备的 **启动虚幻（Start Unreal）** 按钮，在多用户会话中启动虚幻编辑器的一个实例。
    
    ![Switchboard中虚幻设备的启动虚幻按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/25e0f33c-f51e-45a9-84ba-d0a24d5adf94/start-unreal-ud.png)
16.  在编辑器的工具栏上点击 **打开关卡快照编辑器（Open Level Snapshots Editor）**。
    
    ![打开关卡快照编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ebe664b5-d12a-49d3-b479-99d89d532009/open-level-snapshots.png)
17.  在关卡快照编辑器中，双击 **CaveEntrance\_NantStudiosSimple\_SetupA** 关卡快照，然后点击 **恢复关卡快照（Restore Level Snapshot）**。
    
    ![恢复设置A的关卡快照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5067933-7ddb-48d5-a834-9be270a7e4cf/restore-level-snapshot.png)
18.  在虚幻编辑器的 **世界大纲视图面板（World Outliner panel）** 中，选择nDisplay根Actor **NDC\_NantStudios\_Simple** 以查看其更新位置。
    
    ![关卡快照恢复之前](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d568f10-e8e6-48ea-853e-c439555d2352/ndisplay-root-slider-1.png)
    
    ![关卡快照恢复之后](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f8a47776-677e-49a4-9efb-69920833ee93/ndisplay-root-slider-2.png)
    
    关卡快照恢复之前
    
    关卡快照恢复之后
    
19.  nDisplay视图更新你在虚幻编辑器实例中所做的更改。
    
    ![nDisplay视图更新](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/682f03cc-8ea9-4a7c-bc68-9675d6e3a686/view-updates.png)
20.  在nDisplay根Actor下选择 **InnerCamera\_A**，在场景中移动它，会看到内部视锥体在nDisplay视图中移动。
    
    ![在场景中移动InnerCamera A](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60bfd86e-c3a3-4335-88c3-7ed599f55bcd/moving_inner_frustum_updated_look_smaller.gif)

这些步骤显示如何在单个计算机上运行项目。可以使用类似步骤，修改代表真实舞台的nDisplay配置以测试你自己的LED体积。

## mGPU和多屏幕群集

![正在进行的ICVFX制片测试拍摄](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2312d0c3-e515-460d-b76a-317877c42ff9/shoot-in-progress.png)

制片过程利用多GPU提高拍摄期间的性能。它并不仅依赖一个GPU来渲染所有视口，还使用第二个GPU专门渲染摄像机内显示的内容，确保最重要的内容具有最高的保真度。如需了解如何在项目中使用mGPU，请参见[nDisplay概述](/documentation/zh-cn/unreal-engine/ndisplay-overview-for-unreal-engine#%E5%A4%9Agpu%E6%94%AF%E6%8C%81)。

虚幻引擎包括 **舞台监视器（Stage Monitor）** 工具，以便从一个应用程序中的所有nDisplay群集节点中接收与特定事件相关的报告。可以在拍摄时让该工具进入临界状态，方便在出现影响你镜头的事件时提请你注意。欲了解如何使用此工具，请参见[舞台监视器](/documentation/zh-cn/unreal-engine/stage-monitor-with-unreal-engine)。

## 远程控制

利用[远程控制](/documentation/zh-cn/unreal-engine/remote-control-for-unreal-engine)，片场上的制作团队可以从平板电脑上运行的web应用程序动态地控制显示和虚拟环境。项目已公布的功能按钮包括照明、显示的颜色分级，以及修改舞台在虚拟环境中的位置和旋转。

![使用远程控制控制舞台](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f9f47043-0954-470d-bec8-1cf03114ff71/remote-control-stage.png)

### 使用远程控制

在[入门指南](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)一节中，你使用虚幻编辑器实例对场景进行了更改，并立即在nDisplay渲染中看到了更新。本节介绍如何用专为此项目设计的远程控制Web应用程序做到同样的事情。

按以下步骤查看专为此项目设计的远程控制Web应用程序，并远程移动nDisplay根Actor：

1.  在 **内容浏览器（Content Browser）** 中，转到 **原点（TheOrigin）> 内容（Content）> 工具（Tools）> 远程控制（RemoteControl）**，双击 **RCP\_NantStudios** 在 **远程控制面板（Remote Control Panel）** 中打开远程控制预设。
    
    ![在内容浏览器中打开远程控制预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/728bd0c9-2ccf-49f3-993f-4495895364e8/rcp-production-test.png)
2.  远程控制面板显示[远程控制预设](/documentation/zh-cn/unreal-engine/remote-control-presets-and-web-application-for-unreal-engine)中的所有公开参数。点击面板右上角的折角箭头图标，启动web应用程序。
    
    ![从远程控制面板启动web应用程序](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0539a8f-7991-4654-98ec-1944d39ec1ac/rcp-prod-test-launch.png)
    
    如果远程控制面板中没有用于启动web应用程序的选项，确保该web应用程序已正确编译。你可能需要修改项目设置（Project Settings）的远程控制（Remote Control）部分，以在计算机上编译它。在虚幻编辑器中扫描输出日志中的错误。
    
3.  你可能需要重新绑定属性，以使用你已打开的关卡和舞台。
    
    ![在远程控制面板中重新绑定属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/43f9ce27-5a5e-4860-997b-72867c36323b/rebind-properties.png)
4.  切换到远程控制Web应用程序的 **舞台（Stage）** 选项卡。
    
5.  移动摇杆以更改nDisplay根Actor的位置。
    
    ![移动摇杆以更改nDisplay根Actor的位置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/615fb85f-356a-4bef-9d80-ff2ab437fe25/remotecontrol_movestage_smaller.gif)

### 设计Web应用程序

[远程控制Web接口](/documentation/zh-cn/unreal-engine/remote-control-presets-and-web-application-for-unreal-engine)插件为远程控制提供配套的web应用程序。该web应用程序包括一个UI编译器，以供创建和自定义你自己的web应用程序，而无需任何代码。

要切换到远程控制Web应用程序的UI编译器，将 **控制（Control）** 按钮切换到 **设计（Design）**，并修改该项目的UI。保存 **远程控制预设资产（Remote Control Preset Asset）** 以保存对远程控制Web应用程序的UI设计的更改。

![用于修改UI的远程控制设计模式](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/008551d7-fccf-47d1-85f0-278ce4b65739/rcp-ui-design.png)

以下列表列示了专为此制片流程设计的远程控制Web应用程序的各个选项卡中公开的功能按钮。

-   **舞台（Stage）**：包含用于设置关卡内的舞台位置和旋转的功能按钮。
    
    ![舞台功能按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f59f2eff-3e8d-4015-8496-c56237d85ceb/rcp-stage-location.png)
-   **视口设置（Viewport Settings）**：包含用于设置全局视口屏幕百分比和每视口屏幕百分比参数的功能按钮。
    
    ![视口设置功能按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/477243b1-c2b9-4f32-8079-677cfee585ca/rcp-viewport-controls.png)
-   **色彩校正（Color Correction）**：包含用于设置全局色彩校正和每视口色彩校正参数的功能按钮。
    
    ![色彩校正功能按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/700627af-99b4-4dc5-ad60-0a757142be38/rcp-color-correction.png)
-   **发光板（LightCard）**：包含用于设置发光板的功能按钮。
    
    ![发光板功能按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b0c12b5-c0d3-4616-95ce-f606f3d4ac34/rcp-lightcards.png)
-   **快照（Snapshot）**：显示项目中的所有关卡快照，包括用于拍摄和应用关卡快照的功能按钮。详见[关卡快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine)。
    
    ![关卡快照功能按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e76a743-5509-4e38-bba0-0dd11086ad52/rcp-level-snapshot.png)

## 颜色分级和OCIO

为了在整个管线中保持准确而一致的色彩，美术和舞台团队利用[OpenColorIO (OCIO)](/documentation/zh-cn/unreal-engine/color-management-with-opencolorio-in-unreal-engine)将颜色空间转换标准化。这些颜色空间转换导致了监视器、LED面板和制片摄像机之间的显示差异。

示例OCIO配置及其查找表(LUT)包括在OCIO插件中。此项目有一个引用了此OCIO配置的OCIO配置资产示例，并分配到两个nDisplay配置资产。可在 **TheOrigin/Content/OCIO** 中找到该OCIO配置资产。

要了解有关为你的显示创建OCIO配置和颜色空间转换的更多信息，参见[摄像头内VFX摄像头校准](/documentation/zh-cn/unreal-engine/camera-color-calibration-for-in-camera-vfx-in-unreal-engine)。

按以下步骤在项目中使用你自己的OCIO配置：

1.  在 **内容浏览器（Content Browser）** 中，右键点击并选择 **杂项（Miscellaneous）> OpenColorIOConfiguration**，以新建一个 **OpenColorIO配置资产（OpenColorIO Configuration Asset）**。
    
    ![添加OCIO配置资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dfd27ed-d45b-4665-a792-40cbbc20ee6c/add-ocio-asset.png)
2.  双击该新资产打开其编辑器。
    
3.  在资产编辑器的 **配置（Config）** 部分下，将 **配置文件（Configuration File）** 字段设置为你的OCIO配置文件在磁盘上的路径。
    
    ![设置OCIO配置文件的路径](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08b1ae51-6657-42f5-b04f-001c95825709/ocio-config-path.png)
4.  点击 **重新加载并重新编译（Reload and Rebuild）** 以加载OCIO配置。
    
5.  成功加载OCIO配置后，展开 **颜色空间（Color Space）** 部分。
    
6.  添加你要使用的源和目标颜色空间。具体有哪些可用选项取决于你指定的OCIO配置。
    
    ![添加源和目标颜色空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0dc44cff-38f5-4047-9cca-b3194c8c971c/ocio-color-spaces.png)
7.  要将此配置应用到你的nDisplay视口，打开包含 **nDisplay配置资产（nDisplay Config Asset）** 的关卡，在Actor的 **细节面板（Details Panel）** 中搜索 **OCIO**。确保已将 **启用视口OCIO（Enable Viewport OCIO）** 设置为true。
    
8.  展开 **所有视口色彩配置（All Viewports Color Configuration）**：
    
    1.  指定要使用的配置资产。
        
    2.  设置源和目标颜色空间。
        
        ![设置源和目标颜色空间](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98dd6a88-1848-491b-8f75-a4898810fe7a/ocio-set-source-dest.png)

这些步骤演示如何将你自己的OCIO配置添加到项目。也可逐个视口在内部视锥体上单独进行OCIO配置。详见[nDisplay中的色彩管理](/documentation/zh-cn/unreal-engine/color-management-in-ndisplay-in-unreal-engine)。

## GPU Lightmass和多用户

制片团队使用新的[GPU Lightmass](/documentation/zh-cn/unreal-engine/gpu-lightmass-global-illumination-in-unreal-engine)功能烘培场景的光照，从而减少制片时在多GPU和多用户环境下等待光照变化的时间。光照烘培发生在单个多GPU工作站上，然后通过多用户会话分布到网络上。这意味着场景可以快速烘培并重新加载到LED墙壁上，无需关闭和重启群集。

按以下步骤使用GPU Lightmass烘培场景光照：

1.  在 **工具栏（Toolbar）** 中，点击 **编译（Build）** 旁的箭头，并从下拉菜单中选择 **GPU Lightmass**。
    
    ![在编译下拉菜单中选择GPU Lightmass](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b8b7c52-d5fa-4b69-8b6d-b6e4adc64875/build-gpu-lightmass.png)
2.  在 **GPU Lightmass** 窗口中，点击 **编译光照（Build Lighting）** 开始烘培。
    
    ![使用GPU Lightmass编译烘培](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7adcf3ee-7fac-4042-ac99-6673b23b17d3/build-lighting.png)
3.  光照完成编译后，在主菜单中选择 **文件（File）> 全部保存（Save All）**，以将更改传输到多用户会话中的其他计算机。
    
    ![全部保存以传输已烘培的光照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb60599b-16e0-43b9-939d-2c537614136f/lightmass-save-all.png)

你还可选择要传输的更改，而非把所有更改都共享给多用户会话中的其他计算机。

1.  在主菜单中选择 **文件（File）> 选择要保存的文件...（Choose Files to Save…）**
    
    ![选择要保存的文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/208fd731-6136-4e12-88e7-0fc5dd641b53/lightmass-choose-files.png)
2.  仅选择要保存和传输的关卡和编译数据
    
    ![选择要保存和传输的已烘培光照文件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8464c8c3-4fff-4c63-a42a-b982a57766cc/save-selected.png)
3.  点击 **保存选定项（Save Selected）** 以将更改传输给多用户会话中的其他计算机。
    

有关可更改的lightmass烘培设置的更多信息，参见[GPU Lightmass](/documentation/zh-cn/unreal-engine/gpu-lightmass-global-illumination-in-unreal-engine)。

通过多用户会话传输GPU Lightmass烘培目前仅是一个实验性功能。会生成大型BuildData文件的场景在此类传输过程中可能会遇到问题。如果出现问题，可以：

1.  将更新的关卡和BuildData检入到源代码控制。
2.  通过源代码控制将更改同步到渲染节点，以分发更新的光照贴图。

## 关卡快照

制片团队使用 [关卡快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine) 以为每个场景保存Actor在关卡中的配置。一旦创建了关卡快照，团队稍后即可将场景恢复成专门针对特定镜头所做的设置。关卡快照还跟踪对nDisplay根Actor的更改，因此对内部视锥体和颜色分级的修改可以随时保存和应用到nDisplay渲染。

以下各节介绍如何使用项目中所含的筛选器和预设值。要了解如何创建自己的筛选器和工具中的其他功能，参见 [关卡快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine)。

### 使用关卡快照进行筛选

项目中包含一个 **蓝图关卡快照筛选器（Blueprint Level Snapshot Filter）** 示例，可用于按类筛选关卡快照更改中的Actor。可在 **TheOrigin/Content/Tools/LevelSnapshotFilters** 中找到 **LSF\_FilterByClass** 筛选器。本节介绍如何在项目中使用此筛选器。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f224ecf-926b-46d5-bb73-4b67d4f33232/prod-test-lvl-snap-bp.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f224ecf-926b-46d5-bb73-4b67d4f33232/prod-test-lvl-snap-bp.png)

图片显示了用到了哪些设备以及它们在舞台上的通信方法。点击查看大图。

按以下步骤筛选关卡快照更改并将其应用到你的项目：

1.  在虚幻编辑器的 **内容浏览器（Content Browser）** 中，转到 **原点（TheOrigin）> 内容（Content）> StageLevels > NantStudiosSimple > StageLevels**，并双击 **CaveEntrance\_NantStudiosSimple** 打开关卡。
    
2.  在 **工具栏（Toolbar）** 中，点击 **关卡快照（Level Snapshots）** 按钮旁的箭头，并从下拉菜单中选择 **打开关卡快照编辑器（Open Level Snapshots Editor）**。
    
    ![打开关卡快照编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e83876c0-bcff-4256-8da1-6311aa8d873f/open-lvl-snap-editor.png)
3.  关卡CaveEntrance\_NantStudiosSimple已创建了两个关卡快照。双击 **CaveEntrance\_NantStudiosSimple\_SetupA** 看Actor在关卡快照中的保存方式与关卡当前状态有何差异。
    
    ![ICVFX制片测试快照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/87fbaeeb-3ce7-480a-8961-8b3f0b03fc29/prod-test-level-snapshots.png)
4.  点击 **筛选器组（Filter Group）**。
    
    ![选定的设置A关卡快照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/957b3487-74a5-484b-b839-55ee2926985d/prod-test-setupa-lvl-snap.png)
5.  点击 **添加筛选器（Add Filter）**，在下拉菜单中选择 **蓝图筛选器（Blueprint Filters）> LSF按类筛选器（LSF Filter by Class）**。
    
    ![添加LDF按类筛选器蓝图筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bbfd8e9-6d55-44ba-bfc0-2a2e491ef82d/prod-test-setupa-add-filter.png)
6.  点击筛选器组中的 **LSF按类筛选器（LSF Filter by Class）**。
    
    ![点击筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec372917-e1c7-443c-9131-e4737209b4e7/prod-test-lsf-filter.png)
7.  在 **类（Class）** 旁边的 **默认（Default）** 部分中，点击下拉菜单并搜索 **发光板（Light Card）**。
    
    ![搜索发光板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5915f440-f688-4f7f-a124-e31fe44a0aed/prod-test-light-card-filter.png)
8.  点击 **刷新结果（Refresh Results）** 按钮应用筛选器更改。
    
    ![刷新结果以应用筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c7568b5-0c00-4915-b188-ba430aca69d9/refresh-results.png)
9.  现在仅显示对发光板Actor的更改。要关闭筛选器，右键点击该筛选器并选择 **忽略筛选器（Ignore Filter）**。
    
    ![仅显示对发光板Actor的更改](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69f1a962-eded-443b-a280-0aa04f8ca6ae/lvl-snap-only-light-card.png)
10.  点击 **刷新结果（Refresh Results）**，将看到nDisplay根Actor重新显示在列表中。
    
    ![禁用筛选器意味着显示所有Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a53e6c3-ed47-4577-8c03-df3bbf07b4e7/lvl-snap-disable-filter.png)

### 使用预设和关卡快照

利用关卡快照预设，你可以使用蓝图和C++筛选器设置逻辑，并将其另存为预设。未来可以加载该预设，以再次使用此逻辑。项目中包含一个关卡快照预设示例，位于 **TheOrigin/Content/Tools/LevelSnapshotPresets**。

此预设将 **按类筛选（Filter by Class）** 蓝图筛选器与OR布尔值串接起来，因此仅显示与这些类匹配的Actor。预设中使用的类有：LightCards、Stages、Cameras、SyncTestBall、ColorCorrectRegion和PostProcessVolume。

按以下步骤在项目中使用关卡快照预设：

1.  在 **内容浏览器（Content Browser）** 中，转到 **原点（TheOrigin）> 内容（Content）> StageLevels > NantStudiosSimple > StageLevels**，并双击 **CaveEntrance\_NantStudiosSimple** 打开关卡。
    
2.  在 **工具栏（Toolbar）** 中，点击 **关卡快照（Level Snapshots）** 按钮旁的箭头，并从下拉菜单中选择 **打开关卡快照编辑器（Open Level Snapshots Editor）**。
    
    ![打开关卡快照编辑器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bc6ca339-3340-4114-8646-efdd7ae3f556/open-lvl-snap-editor.png)
3.  关卡CaveEntrance\_NantStudiosSimple已创建了两个关卡快照。点击 **加载/保存筛选器（Load/Save Filter）** 并选择 **ExampleStagePreset**。
    
    ![加载示例舞台预设筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f02f28b-7e3a-4087-bb4f-0266bc084147/prod-test-preset-filter.png)
4.  双击 **CaveEntrance\_NantStudiosSimple\_SetupA** 看Actor在关卡快照中的保存方式与关卡当前状态有何差异。
    
    ![加载的预设筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8055cc7-3ce2-438a-8513-461e97b646b7/lvl-snap-filter-loaded.png)
5.  打开关卡快照后，仅显示与从预设中加载的筛选器匹配的Actor。
    
    ![按预设筛选的设置A关卡快照](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81a29213-d841-4d21-a293-e9d106e8f18f/lvl-snap-setupa-filtered.png)

## 项目结构

要查看如何构建虚幻项目来进行虚拟制片，摄像机内VFX制片测试就是一个良好的范例。以下文件夹定义项目内容的整体结构，并将这些内容划分到相关类别。

-   [资产](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E8%B5%84%E4%BA%A7)
    
-   [环境](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E7%8E%AF%E5%A2%83)
    
-   [OCIO](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#ocio)
    
-   [舞台关卡](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E8%88%9E%E5%8F%B0%E5%85%B3%E5%8D%A1)
    
-   [舞台](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E8%88%9E%E5%8F%B0)
    
-   [工具](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E5%B7%A5%E5%85%B7)
    

### 资产

此文件夹通常包含所有用于创建角色、环境和FX的资产，但不包含关卡资产。以下列表显示此示例项目的资产是如何分类的。

-   **图集（Atlases）**
    
-   **贴花（Decals）**
    
-   **FX**
    
-   **IES**
    
-   **地形（Landscape）**
    
-   **材质（Materials）**
    
-   **MS\_Presets**
    
-   **道具（Props）**
    
-   **岩石（Rocks）**
    
-   **散射（Scatter）**
    
-   **天空（Sky）**
    
-   **纹理（Textures）**
    
-   **植被（Vegetation）**
    

### 环境

项目中包含三种拍摄环境：

-   CaveEntrance
    
    ![洞穴入口环境](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d536eac6-395f-4839-a750-fbbf7c7072c5/prod-test-cave-entrance.png)
-   CavePath
    
    ![洞穴路径环境](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2bdf91f7-935b-4e04-a489-d6ce2aa85de1/prod-test-cave-path.png)
-   SpaceJunkyard
    
    ![空间垃圾场环境](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41d5aa54-8689-4265-9465-0a99835c19c3/prod-test-space-junkyard.png)

#### 环境结构

由于源代码控制仅允许专门检出二进制资产（例如 `.umap` 文件），所有同时在处理环境的美术师必须在其自己的关卡中进行处理。这个问题的解决方案是根据环境中Actor的类型将一个环境划分成多个[子关卡](/documentation/zh-cn/unreal-engine/managing-multiple-levels-in-unreal-engine)。

例如，光照美术师可在光照子关卡中工作，而FX美术师则在FX子关卡。常见的还有多个GEO关卡将环境划分成多个区域，每个区域都由专门的美术师处理。所用子关卡的数量和类型应取决于制片需求。

以下是此项目中各个环境所使用的文件夹：

-   **关卡快照（LevelSnapshots）**：与关卡关联的关卡快照资产。
    
-   **子关卡（SubLevels）**：在此项目中，各个关卡都被划分成焦散、FX、Geo和光照子关卡。
    
-   **关卡资产（Level Asset）**：关卡资产采用 {关卡名称}\_{描述符} 结构。后缀 \_P 附加到固定关卡，作为子关卡的容器。打开此关卡资产以查看由所有子关卡组成的完整环境。
    

### OCIO

此文件夹包含OpenColorIO配置资产。此项目有一个资产：ExampleOCIO。具体如何在此项目中使用OCIO，参见本页上的[颜色分级和OCIO](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E9%A2%9C%E8%89%B2%E5%88%86%E7%BA%A7%E5%92%8Cocio)分段。

![OCIO资产示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/348237f3-2dc0-4231-8a75-81185c564769/prod-test-ocio-asset.png)

### 舞台关卡

此文件夹包含所有兼具环境Actor和舞台Actor的关卡资产。需要使用nDisplay进行渲染时，可打开这些资产。舞台关卡按关卡资产中使用的舞台进行分类。此示例项目使用以下结构匹配舞台：

-   NantStudios
    
    -   CaveEntrance\_NantStudios
        
    -   CavePath\_NantStudios
        
    -   SpaceJunkyard\_NantStudios
        
-   NantStudiosSimple
    
    -   CaveEntrance\_NantStudiosSimple
        
    -   CavePath\_NantStudiosSimple
        
    -   SpaceJunkyard\_NantStudiosSimple
        

### 舞台

此文件夹包含描述LED体积的拓扑结构的nDisplay配置。制片时所有镜头都使用了一个舞台：Nant Studios。另外还提供了一个简易版舞台，以便在单个桌面上渲染前墙。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08c13588-e379-433e-ad83-aed930cc2c9e/nantstudios-led-stage.jpg)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08c13588-e379-433e-ad83-aed930cc2c9e/nantstudios-led-stage.jpg)

点击查看大图。

#### NantStudios

-   **配置（Config）**：舞台的nDisplay配置资产，用于定义LED体积的拓扑结构以及如何在其上进行渲染。
    
    ![NantStudios nDisplay配置资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0030638b-ad51-4f40-8002-33f9629fc8f3/nantstudios-config-asset.png)
-   **LEDMeshes**：静态网格体和材质，采用 **nDisplay配置资产（nDisplay Config Asset）** 中使用的LED面板分辨率。
    
    ![NantStudios LED网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5123100-86fa-4402-ac0a-f6fd95389188/nantstudios-led-meshes.png)
-   **LiveLinkPresets**：这些是之前为LiveLink创建的配置，需要在启动时在nDisplay节点上加载LiveLink源。默认预设在 **项目设置（Project Settings）> Live Link > Live Link默认预设（Default Live Link Preset）** 中指定。它们也可用于在编辑器环境下快速重新加载不同的源。
    
-   **NantStudios\_Stage**：仅包含代表舞台的Actor的关卡资产，例如 **nDisplay根Actor（nDisplay Root Actor）**、**ICVFX摄像机（ICVFX Cameras）** 和 **发光板（Light Cards）**。
    

#### Simple Nant Studios

-   **配置（Config）**：舞台的nDisplay配置资产，用于定义LED体积的拓扑结构以及如何在其上进行渲染。拓扑结构看起来与Nant Studios配置相同，但仅两面前墙被设置为渲染。
    
-   **NantStudiosSimple\_Stage**： 仅包含代表舞台的Actor的关卡资产，例如 **nDisplay根Actor（nDisplay Root Actor）**、**ICVFX摄像机（ICVFX Cameras）** 和 **发光板（Light Cards）**。
    

### 工具

此文件夹包含自定义蓝图功能按钮、关卡快照筛选器和预设，以及远程控制预设。以下列表描述各个工具。

-   **CaveMaterialControl**：场景中对象使用的各种材质参数集合的蓝图控制器。包含用于诸如焦散速度、光束强度和全局岩石颜色偏移的功能按钮。
    
-   **HierarchicalInstanceConverter**
    
-   **HolePunch**：用于在洞穴几何体中创建孔洞的球形Actor。它在拍摄当天用于创建额外的光束。
    
-   **InnerFrustumCamera**：带LiveLinkComponent的CineCameraActor。此蓝图不需要用户手动向场景actor添加实例化的LiveLinkComponent，从而简化了摄像机追踪。
    
-   **LevelSnapshotFilters**：关卡快照的自定义蓝图过滤器。
    
-   **LevelSnapshotPresets**：关卡蓝图的过滤器组预设。
    
-   **RemoteControl**：远程控制预设。
    
-   **SyncTestBall**：此工具创建一个用于测试同步的弹跳红球。将此球放置于场景中，使其显示在两面墙之间的接缝上。如果同步功能未正常工作，接缝处就会出现明显的撕裂现象。
    

## 控制台变量

为了在舞台上使用nDisplay进行渲染时提高性能，制片团队使用下表中的控制台变量来调整设置。可以在Switchboard的nDisplay会话期间设置控制台变量，并将它们应用到群集。

要在Switchboard中设置控制台变量：

1.  打开Switchboard。
    
2.  在 **nDisplay监视器（nDisplay Monitor）** 选项卡下的 **控制台：（Console:）** 文本框中，输入cvar和所需值（如果适用）。
    
3.  点击 **Exec**。
    

![nDisplay监视器控制台](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/227e6c50-f72e-4a90-8855-d9c849e86286/prod-test-console.png)

以下值用于摄像机内VFX制片测试。根据项目中的内容和所需外观，你可能需要使用不同的值。

控制台变量

值（Value）

描述（Description）

`r.ExrReadAndProcessOnGPU`

N/A

在CPU和GPU之间切换EXR播放。为GPU启用后，虚幻引擎4可以将大型的未压缩EXR文件直接加载到结构化缓冲区，并在GPU上处理它们。

光线追踪

 

 

`r.RayTracing.ForceAllRayTracingEffects`

0

强制打开或关闭所有光线追踪效果。选项包括：

-   \-1: 不强制（默认）
-   0: 禁用所有光线追踪效果
-   1: 启用所有光线追踪效果

将此控制台变量设为0可关闭默认启用的所有其他光线追踪功能。使用GPU Lightmass（需要用到光线追踪功能）时，你仍可使用基于GPU加速的光照烘焙。此控制台变量也可用于计算启用光线跟踪后所需的性能。

r.RayTracing.Reflections.MaxRoughness

0.2

设置可见光线追踪反射的最大粗糙度（默认值 = -1（后期处理体积驱动的最大粗糙度））。这保证了唯有粗糙度值低于0.2的材料才会发生光线追踪反射。

`r.RayTracing.Reflections.MaxRayDistance`

500

设置光线追踪反射光线的最大光线距离。使用光线缩短功能时，天空盒将不会在RT反射通道中被采样，并将在稍后与本地反射捕获一起合成。设置为负值将关闭此优化（默认值 = -1（无限光线））。 使用 -1 以外的数值有助于减少场景中的光线追踪数量。

`r.RayTracing.Reflections.SortMaterials`

0

确定反射材质在着色之前是否会被排列。 选项：

-   0: 禁用
-   1: 启用，使用追踪（Trace）> 排列（Sort）> 追踪（Trace，默认）

`r.DiffuseIndirect.Denoiser`

2

降噪选项（默认值 = 1）

`r.RayTracing.Reflections`

0

在你的关卡中只关闭光线追踪反射。如果你希望保留光线追踪阴影或其他光线追踪功能，但不希望产生光线追踪反射相关的开销，请使用此选项。 选项：

-   \-1：由后期处理体积驱动的值（默认）
-   0：使用传统的光栅化SSR。
-   1：使用光线追踪反射。

`r.RayTracing.Geometry.Landscape`

0

在光线追踪效果中包含地形（默认值 = 1（在光线追踪中启用地形）） 为了优化使用了光踪反射的关卡，我们禁用了地形光线追踪，因为它不会为最终效果带来明显提升，但禁用它则会让我们获得性能提升。

`r.RayTracing.Reflections.ScreenPercentage`

50

适用于光追反射的屏幕百分比数值（默认值 = 100）。 如果你的场景不包含非常锐利清晰的反射，你可以降低此值以提高一些性能。

超分辨率

 

 

`r.ScreenPercentage`

75

以较低分辨率渲染，然后在放大分辨率，以便获得更加性能（与可混合的后期处理设置结合使用）。 低锯齿低性能情况下，75是一个合适的值，请使用 'show TestImage' 验证。

在百分比中，使用 >0 和 <=100，可能会出现更大的数值（超采样），但可以改善下采样质量。数值 <0 视为 100。

`r.TemporalAA.Algorithm`

1

用于TAA的算法 选项：

-   0：Gen 4 TAAU（默认）
-   1：Gen 5 TAAU（试验性） 这回打开我们全新的Gen5 TAAU，以防需要用到分辨率上推（Resolution Upscaling）。

`r.TemporalAA.Upsampling`

1

是否使用TAA执行主屏幕百分比。 选项：

-   0：独立于TAA执行空间放大（spatial upscale）通道（默认）。
-   1：通过使用屏幕百分比方法，让TAA执行时序放大和空间放大。

SSGI

 

 

`r.SSGI.Enable`

0

禁用或启用SSGI 选项：

-   0：禁用
-   1：启用 关闭SSGI。

`r.SSGI.HalfRes`

1

是否以一半的分辨率执行SSGI。 选项：

-   0：禁用（默认）
-   1：启用

`r.SSGI.Quality`

1

品质相关的选项，调整用SSGI射出的光线数量，范围在1到4之间（默认值为4）。

体积雾

 

 

`r.VolumetricFog.GridPixelSize`

6

体素网格中单元的XY尺寸（单位是像素）。 较低值会提升体积雾品质，但会影响性能。

`r.VolumetricFog.GridSizeZ`

96

Z轴中使用的体积雾单元的数量。 较高值可以提升精度并减少噪点，但会影响性能。

`r.VolumetricFog`

0

是否启用体积雾特性。 选项：

-   0：禁用
-   1：启用 可以用来快速关闭体积雾，并确定它占用的性能开销。

渲染

 

 

`ShowFlag.DirectLighting`

0

可使用此控制台变量快速禁用直接光照，从而查看烘焙内容和未烘培内容，以及它们的性能开销。 选项：

-   0：禁用showflag
-   1：启用showflag
-   2：不要覆盖此showflag（默认）。

`r.SetNearClipPlane`

150

设置近裁剪面（单位是厘米）。 此控制台变量允许你修改"近裁剪面"（Near Clip Plane），以便你快速移除摄像机面前的几何体。

`r.TextureStreaming`

0

设置是否启用纹理流送，可以实时更改。 选项：

-   0：禁用
-   1：启用（默认）

`r.Streaming.PoolSize`

3600

\-1：默认纹理池大小，数值单位为MB。 如果初始值太低，而硬件允许使用较高的值，则可使用此控制台变量在运行时增加纹理池大小，以允许加载更高等级的Mipmap。

`r.DFShadowScatterTileCulling`

1

是否使用光栅化器将对象散布到图块网格上，以便剔除。 选项：

-   0：禁用
-   1：启用

`r.ForceLOD`

5

要使用的LOD等级，-1 表示禁用。 用于检测当场景使用某个LOD等级后，会获得多少性能增益或品质提升。

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [in-camera vfx](https://dev.epicgames.com/community/search?query=in-camera%20vfx)
-   [ndisplay](https://dev.epicgames.com/community/search?query=ndisplay)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [舞台设置和硬件](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E8%88%9E%E5%8F%B0%E8%AE%BE%E7%BD%AE%E5%92%8C%E7%A1%AC%E4%BB%B6)
-   [入门指南](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [mGPU和多屏幕群集](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#mgpu%E5%92%8C%E5%A4%9A%E5%B1%8F%E5%B9%95%E7%BE%A4%E9%9B%86)
-   [远程控制](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6)
-   [使用远程控制](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E4%BD%BF%E7%94%A8%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6)
-   [设计Web应用程序](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E8%AE%BE%E8%AE%A1web%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F)
-   [颜色分级和OCIO](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E9%A2%9C%E8%89%B2%E5%88%86%E7%BA%A7%E5%92%8Cocio)
-   [GPU Lightmass和多用户](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#gpulightmass%E5%92%8C%E5%A4%9A%E7%94%A8%E6%88%B7)
-   [关卡快照](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E5%85%B3%E5%8D%A1%E5%BF%AB%E7%85%A7)
-   [使用关卡快照进行筛选](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E4%BD%BF%E7%94%A8%E5%85%B3%E5%8D%A1%E5%BF%AB%E7%85%A7%E8%BF%9B%E8%A1%8C%E7%AD%9B%E9%80%89)
-   [使用预设和关卡快照](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E4%BD%BF%E7%94%A8%E9%A2%84%E8%AE%BE%E5%92%8C%E5%85%B3%E5%8D%A1%E5%BF%AB%E7%85%A7)
-   [项目结构](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E9%A1%B9%E7%9B%AE%E7%BB%93%E6%9E%84)
-   [资产](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E8%B5%84%E4%BA%A7)
-   [环境](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E7%8E%AF%E5%A2%83)
-   [环境结构](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E7%8E%AF%E5%A2%83%E7%BB%93%E6%9E%84)
-   [OCIO](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#ocio)
-   [舞台关卡](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E8%88%9E%E5%8F%B0%E5%85%B3%E5%8D%A1)
-   [舞台](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E8%88%9E%E5%8F%B0)
-   [NantStudios](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#nantstudios)
-   [Simple Nant Studios](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#simplenantstudios)
-   [工具](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E5%B7%A5%E5%85%B7)
-   [控制台变量](/documentation/zh-cn/unreal-engine/in-camera-vfx-production-test-sample-project-for-unreal-engine#%E6%8E%A7%E5%88%B6%E5%8F%B0%E5%8F%98%E9%87%8F)

相关文档

[

GPU Lightmass全局光照

![GPU Lightmass全局光照](https://dev.epicgames.com/community/api/documentation/image/071e6a57-62c2-4bfb-8ce3-a7b20aace978?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/gpu-lightmass-global-illumination-in-unreal-engine)