# 虚幻引擎中的LiveLinkXR | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:20.501Z

---

目录

![LiveLinkXR](https://dev.epicgames.com/community/api/documentation/image/9044bcf2-c17d-4259-baf8-a1e255305d4c?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**实时链接（Live Link）** 提供了一个公共接口，以将来自外部源的动画数据流送至虚幻引擎（UE）并进行处理。它被设计成可以通过虚幻插件进行扩展，允许第三方开发新的特性，并无需更改引擎和维持这些更改。

**LiveLinkXR** 将此功能扩展至可以用于XR设备。通过使用LiveLinkXR插件，你可以添加XR源，例如用于实时链接工具的Vive追踪器和HMD。

LiveLinkXR当前仅支持OpenXR。目前SteamVR平台支持通过OpenXR进行无标头渲染（在不触发渲染器的情况下运行RP）。要使用Vive追踪器，你必须运行SteamVR并将其设置为你的开放XR运行时：

![The SteamVR Settings window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1c637cf-d845-4f26-ae98-02143e052986/llxr_steamvrsettings.png)

本文将介绍如何设置和配置LiveLinkXR插件，调整工具的各种设置，以及提供可能会用到的故障排除和变通方案步骤。

## 启用LiveLinkXR

1.  点击 **编辑（Edit）** 选项卡将其展开，在 **配置（Configuration）** 标题栏下，点击 **插件（Plugins）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0da5f11-8125-4f86-9da1-c91623039598/llxr_windowsplugin.png)
2.  使用搜索框找到 **LiveLinkXR** 插件，然后点击 **启用（Enabled）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b782ad9e-2845-4d3e-aa86-42efdff58c5e/llxr_locatellxrplugin.png)
3.  在显示的框中，选择 **是（Yes）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15c85cb1-5163-497a-88b0-0da5c71cddeb/llxr_betaoptin.png)
4.  使用搜索框找到Vivetracker插件，并点击 **启用（Enabled）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d0dbf33-4d0c-458a-8b13-0c73a68488f1/llxr_vivetrackerplugin.png)
5.  通过展开 **窗口（Window）** 选项卡并点击 **实时链接（Live Link）**，启动 **实时链接（Live Link）** 工具。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/363b4900-e36b-4e01-9edd-2e366ed83153/llxr_openlivelink.png)
6.  关闭并使用命令行参数 `-xrtrackingonly` 重启引擎。
    
    示例：`D:\Program Files\UE_5.2\Engine\Binaries\Win64\UnrealEditor.exe -xrtrackingonly`
    
    如果不使用此命令行参数，你的追踪器、手柄和头显将只在VR预览模式或VR编辑器模式中可用。
    
7.  展开 **LiveLinkXR源（LiveLinkXR Source）** 选项，查看与其关联的各种设置。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a4511c01-e520-4e27-befc-74047479eec4/llxr_livelinkxrsourcesettings.png)

### 源设置

利用LiveLinkXR源设置，你可以调整数据源并调整本地更新速率。

**设置名称（Setting Name）**

**用途（Purpose）**

**追踪追踪器（Track Trackers）**

追踪OpenXR中的所有Vive追踪器。

**追踪控制器**

追踪所有控制器。

**追踪HMD**

追踪所有HMD。

**本地更新速率（赫兹）（Local Update Rate in Hz）**

读取各个设备的追踪数据时采用的更新速率（以赫兹为单位）。

## 添加LiveLinkXR源

尽管下面的流程是使用带追踪器的Vive HMD制定的，但你应该可以在SteamVR支持的任何VR设备上使用Live Link XR。

SteamVR必须正在运行才能添加新的LiveLinkXR源。如需了解如何设置SteamVR，请查看[SteamVR故障排除页面](https://support.steampowered.com/kb_article.php?ref=8566-SDZC-9326)。

启用LiveLinkXR插件并已根据需要调整设置后，就可以添加XR源。

1.  启动 **实时链接（Live Link）** 工具，展开 **源（Source）** 窗口，然后在 **LiveLinkXR源（LiveLinkXR Source）** 下，点击 **添加（Add）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/16512bc6-9717-4a00-b52f-ddd141de6172/llxr_livelinkxrsourcesettings.png)
2.  如果所有配置均正确，则点击 **添加（Add）** 之后，应该能够看到已添加到实时链接工具的表中的项。这些项应该对应你在 **数据源（Data Source）** 设置下已经选择的 **数据源（Data Source）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94842442-f082-4a85-b7d9-4667ea2d93cd/llxr_livelinkxrnewsource.png)

如果要使用超过一个追踪器定位器（Tracker Puck），必须在SteamVR中使用SteamVR Vive追踪器设置窗口中设置每个定位器的角色： ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9153d704-8d7c-4e6c-9a9f-b3a2fd54dd67/llxr_vivetrackerssettings.png) 

## 将VR源与蓝图和网格体关联

启用LiveLinkXR插件之后，你的项目将获得LiveLinkXR蓝图和网格体的访问权限。这些宝贵的预制项可以帮助你入门。本节将带领你找到和使用这些项。

1.  导航至 **内容浏览器（Content Browser）**，展开 **视图选项（View Options）** 菜单，然后选择 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/32bd8583-e244-4788-a048-00c74ebf8067/llxr_selectandviewoptions.png)
2.  你应该立刻就能看到新项显示在 **内容浏览器（Content Browser）** 导航窗口中。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cfb2e833-781f-4343-8c83-ddecc8e8fa4c/llxr_newcontent.png)
3.  在 **内容浏览器（Content Browser）** 中，找到 **LiveLinkXR Content** 文件夹并打开其下的 **蓝图（Blueprints）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a5c0797-0ab0-48c4-a588-57652ec50924/llxr_livelinkxrblueprints.png)
4.  将 **BP\_LiveLinkXR\_DataHandler** 拖到你的场景中。
    
    你可以验证通过Toggle Debug Vis（切换调试可视性）选项接收的追踪数据。通过使用 **切换调试可视性（Toggle Debug Vis）** 调试工具执行此操作。
    
    1.  在 **实时链接（Live Link）** 中设置源并将 **BP\_LiveLinkXR\_DataHandler** 拖到你的场景之后，从 **世界大纲（World Outlier）** 中选择处理程序并导航至 **细节（Details）** 面板。
    2.  展开 **默认（Default）** 类别并点击 **切换调试可视性（Toggle Debug Vis）** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/13d4411d-57d8-4169-8ab8-d7fa071c35ef/llxr_datahandlertoggledebugvis.png)
    
    1.  对于已设置的每个 **实时链接源（Live Link Source）**，关卡中都应显示一个 **BP\_LiveLinkXR\_DebugVis** 调试可视化。
    2.  这些项随后应根据其在真实世界的动作来移动。
    
5.  从 **世界大纲（World Outlier）** 中选择 **BP\_LiveLinkXR\_DataHandler** 并导航至 **细节（Details）** 面板。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/270669c9-4a9f-4386-ad18-6fcd1f9d20d5/llxr_datahandlerdetails.png)
6.  要添加新条目，请展开 **细节（Details）** 下的 **默认（Default）** 部分，然后点击 **Subject Name to Attached Actor（@@@）** 旁边的 **+** 按钮。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52cd1785-f921-4771-9d82-30a2e097c1b1/llxr_datahandleraddattachedactor.png)
7.  在新元素旁边的文本框中，输入 **实时链接（Live Link）** 窗口中的 **主题名称（Subject Name）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4a6d1213-1049-44d7-a20f-80258362bfcf/llxr_addsubjectnametodetails.png)
8.  对要追踪的所有源，根据需要重复此流程。
9.  使用元素旁边的 **下拉菜单（dropdown menu）** 将 **追踪数据（tracking data）** 映射至场景中的 **对象（Object）** 或 **Actor**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cea8d839-5752-4dd2-bd65-3f957cb0b1b5/llxr_attachtrackingtotracker.png)

### 校准

你可以使用 **切换调试可视性（Toggle Debug Vis）** 旁边的 **校准（Calibrate）** 按钮，设置与世界中任意actor相关的新追踪源。在点击按钮之后，将使用LiveLink主题 **校准主题名称（Calibration Subject Name）** 中的转换来计算相对于 **校准目标Actor（Calibration Target Actor）** 转换的新世界原点转换。

1.  要充分利用校准功能，请首先从 **世界大纲（World Outliner）** 中选择 **BP\_LiveLinkXR\_DataHandler**。 在 **细节（Details）** 面板中，从 **校准目标Actor（Calibration Target Actor）** 旁边的下拉菜单中选择你关卡中的一个Actor。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/73254224-0740-4f79-b974-40d51f5a73e2/llxr_caliratepickactor.png)
2.  选择目标actor之后，在提供的框中输入 **校准主题名称（Calibration Subject Name）**。这应该与要追踪的LiveLink主题名称之一匹配。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0155a8e4-98c9-49ec-a627-07ff6bf28c5d/llxr_calirateentersubject.png)
3.  调整设置之后，点击 **切换调试可视性（Toggle Debug Vis）** 旁边的 **校准（Calibrate）** 按钮。
4.  请注意，设备的相对追踪原点现在相对于你的新校准。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/83a810f4-1f39-4eaa-ba56-a62e5028c14a/llxr_datahandlerpostcalibration_raw.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4835aaa2-fb9e-4190-b2d5-5824b8638ef2/llxr_datahandlerprecalibration_raw.png)

左侧是BP\_LiveLinkXR\_DataHandler actor最初被拖动到关卡中时的位置信息。右侧是校准之后相对于关卡中另一个actor的位置信息。

## 使用不带HMD的Vive追踪器

默认情况下，无法使用不带HMD的Vive追踪器。本节简要介绍允许你在UE中使用不带HMD的追踪器的可能变通方案。

本流程是可能的变通方案之一，不受Valve、HTC或Epic支持。它有可能意外停止工作，或导致SteamVR出现意外问题。除非你是SteamVR故障排除方面的专家，否则不建议尝试此变通方案。

1.  首先，完全关闭Steam和SteamVR。
    
    关闭主程序之后，查看任务管理器中是否有任何仍在运行的Steam进程，确保完全关闭。
    
2.  在你的计算机上找到以下文件：`<Steam Install Directory> /steamapps/common/SteamVR/drivers/null/resources/settings/default.vrsettings`。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2510e21e-987e-4ced-a75d-5101dcacbeab/llxr_workaroundsteamvrsettings_raw.png)
3.  复制文件并将"\_BACKUP"添加到文件扩展名末尾。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9d69b298-7114-4f43-8ee6-434876db595d/llxr_workaroundsteamvrsettingsbackup.png)
4.  有几种方法可以备份此流程中介绍的文件。下面展示的方法是复制原始文件并更改文件扩展名。
    
5.  在文本编辑器中打开原始 `default.vrsettings` 文件。
    
6.  在 `driver_null` 对象中，将 `enable` 属性值从 `false` 更改为 `true`。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ee44aa3-a51a-4f58-b9c5-4441fd590c08/llxr_workaroundsteamvrsettingsnullenable_raw.png)
    
    如果使用的是nDisplay，请将 `windowWidth`、`windowHeight`、`renderWidth`和 `renderHeight` 设置为 **0** （零）。这有助于避免在屏幕中间出现无法最小化的VR编译器窗口。
    
7.  保存并关闭。
8.  找到以下文件：`<Steam Install Directory>/steamapps/common/SteamVR/resources/settings/default.vrsettings`。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bd9363a2-aa35-4509-8ff7-b30fb7af7b8a/llxr_workaroundsteamvrsettingssecondfile.png)
    
    文件的名称相似，但它们位于不同的文件夹中。
    
9.  创建 `default.vrsettings` 文件的备份。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6c5bd10-a064-4934-be03-036bcff7e66d/llxr_workaroundsteamvrsettingssecondbackup.png)
10.  在 `steamvr` 标题栏下，将 `requireHmd` 设置更改为 `false`。
11.  在 `steamvr` 标题栏下，将 `forcedDriver` 设置更改为 `"null"`。
12.  在 `steamvr` 标题栏下，将 `activateMultipleDrivers` 设置更改为 `true`。
13.  更新正确的设置之后，文件应如下所示：
    
    ```cpp
         "steamvr": {
         "requireHmd": false,
         "forcedDriver": "null",
         "forcedHmd": "",
         "displayDebug": false,
         "debugProcessPipe": "",
         "enableDistortion": true,
         "displayDebugX": 0,
         "displayDebugY": 0,
         "allowDisplayLockedMode": false,
         "sendSystemButtonToAllApps": false,
         "loglevel": 3,
         "ipd": 0.063,
         "ipdOffset": 0.0,
         "background": "",
         "backgroundUseDomeProjection": false,
         "backgroundCameraHeight": 1.6,
         "backgroundDomeRadius": 0.0,
         "environment": "",
         "hdcp14legacyCompatibility": false,
         "gridColor": "",
         "playAreaColor": "",
         "showStage": false,
         "activateMultipleDrivers": true,
    ```
    
14.  保存并关闭 `default.vrsettings` 文件。
15.  启动 **Steam** 和 **SteamVR**。
16.  由于你更改了SteamVR设置，可能需要重新运行 **空间校准（Room Calibration）**。
17.  在完成空间校准之后，重新启动 **SteamVR**，你应该无需HMD便可追踪设备。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8aaf9236-b0e5-4043-bb48-60a93f25ff64/llxr_workaroundsteamvrfinal_raw.png)
18.  准备好重新使用HMD之后，关闭 **SteamVR**，恢复 **备份中的已编辑文件（edited files from the backups）**，然后重新启动 **SteamVR**。

## 故障排除

### SteamVR问题

如果你的HMD、控制器或追踪器未显示在SteamVR中，则他们不会显示在UE中。如果你在设置VR设备方面有任何问题，建议查看[Steam VR故障排除](https://support.steampowered.com/kb_article.php?ref=8566-SDZC-9326)指南寻求帮助。

-   [beta](https://dev.epicgames.com/community/search?query=beta)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用LiveLinkXR](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine#%E5%90%AF%E7%94%A8livelinkxr)
-   [源设置](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine#%E6%BA%90%E8%AE%BE%E7%BD%AE)
-   [添加LiveLinkXR源](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine#%E6%B7%BB%E5%8A%A0livelinkxr%E6%BA%90)
-   [将VR源与蓝图和网格体关联](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine#%E5%B0%86vr%E6%BA%90%E4%B8%8E%E8%93%9D%E5%9B%BE%E5%92%8C%E7%BD%91%E6%A0%BC%E4%BD%93%E5%85%B3%E8%81%94)
-   [校准](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine#%E6%A0%A1%E5%87%86)
-   [使用不带HMD的Vive追踪器](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%B8%8D%E5%B8%A6hmd%E7%9A%84vive%E8%BF%BD%E8%B8%AA%E5%99%A8)
-   [故障排除](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)
-   [SteamVR问题](/documentation/zh-cn/unreal-engine/livelinkxr-in-unreal-engine#steamvr%E9%97%AE%E9%A2%98)

相关文档

[

SteamVR开发

![SteamVR开发](https://dev.epicgames.com/community/api/documentation/image/8d22f6f5-84d8-4acf-a359-62db43bea632?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/developing-for-steamvr-in-unreal-engine)