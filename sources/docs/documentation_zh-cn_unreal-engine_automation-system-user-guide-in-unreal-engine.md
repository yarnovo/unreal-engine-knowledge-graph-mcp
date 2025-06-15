# 虚幻引擎自动化系统用户指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/automation-system-user-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:41:08.203Z

---

目录

![自动化系统用户指南](https://dev.epicgames.com/community/api/documentation/image/39c6b261-197b-4070-893a-961aa3ad1f00?resizing_type=fill&width=1920&height=335)

![横幅图像](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d08a1363-78a7-4872-b7d9-982c6cef8866/automation-banner.png "Banner Image")

焦点位于"自动化（Automation）"选项卡的"会话前端（Session Frontend）"窗口。

**自动化（Automation）** 选项卡位于 **虚幻引擎** 的 **虚幻（会话）前端（Unreal (Session) Frontend）** 窗口中。只要其他设备连接了你的机器，或者其他设备位于你的本地网络中，你就可以使用此选项卡在该设备上运行自动化测试。

你可通过两种方式访问前端套件：

-   **会话前端（Session Frontend）** - 将本地编辑器作为自动化辅助应用程序打开，以在外部设备上运行自动化。
    
    -   找到 **工具（Tools）>会话前端（Session Frontend）**
-   **虚幻前端（Unreal Frontend）** - 打开包含 **会话前端（Session Frontend）** 、 **设备管理器（Device Manager）** 和 **项目启动程序（Project Launcher）** 的独立版前端。
    
    -   找到 **\[虚幻引擎根目录\]** > **Engine** > **Binaries** > **Win64** > **UnrealFrontend.exe**

## 启动插件

在最新版本的虚幻引擎中，所有 **自动化测试** 都已从 **Engine Content** 文件夹移到了插件中，必须先启用插件才能在 **自动化（Automation）** 选项卡中看到。

![Open Plugins](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fcfa907-36d6-4ee1-84b5-8ccf9f666903/ue5_1-01-open-plugins.png "Open Plugins")

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc706f9e-01e9-4f7f-8984-aa2cb90fec9a/ue5_1-02-enable-plugins.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc706f9e-01e9-4f7f-8984-aa2cb90fec9a/ue5_1-02-enable-plugins.png)

要启用插件，请选择 **编辑（Edit）>插件（Plugins）>测试（Testing）** 。

包含自动化测试的插件浏览器

如果使用独立版 **虚幻前端（Unreal Frontend）** ，无需额外的启用步骤就可访问所有自动化测试。

## 用户界面

打开 **会话前端（Session Frontend）** 后，你可以访问 **控制台（Console）** 、 **自动化（Automation）** 、 **屏幕截图比较（Screenshot Comparison）** 和 **分析器（Profiler）** 等选项卡。为满足你的所有自动化测试需求， **自动化（Automation）** 选项卡中将包含你所需的所有功能，而且[屏幕截图比较（Screenshot Comparison）](/documentation/zh-cn/unreal-engine/screenshot-comparison-tool-in-unreal-engine)选项卡下还有一些的额外功能，用于提供功能对比。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9b5a621-a8a7-4635-bb31-041afcace8b6/ue5_1-03-automation-tab.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9b5a621-a8a7-4635-bb31-041afcace8b6/ue5_1-03-automation-tab.png)

点击查看大图。

如果 **自动化（Automation）** 选项卡窗口中未列出内容，请从左侧的 **会话浏览器（Session Browse）** 中选择一个活动会话。例如，在 **此应用程序（This Application）** 下面，名称为 **PC-xxx** 的机器处于选中状态。

### 会话浏览器

借助 **会话浏览器（Session Browse）** ，你可以连接到编辑器的特定实例。选择会话之后，你才能在"自动化（Automation）"窗口中看到可用自动化测试。

![会话浏览器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd84309f-a666-4cae-9350-ec7c5ee99cf8/ue5_1-04-session-browser.png "Sessions Browser")

### 工具栏

借助 **自动化（Automation）** 选项卡中的 **工具栏** ，你可以控制自动化测试如何启动、刷新以及过滤错误和警告。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/913f7537-b2fb-4a0e-8733-d6796fdde75c/ue5_1-05-automation-toolbar.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/913f7537-b2fb-4a0e-8733-d6796fdde75c/ue5_1-05-automation-toolbar.png)

点击查看大图。

图标

名称

说明

![启动测试按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/215a7e87-39f3-4961-b360-5702c806ecb9/ue5_1-06-start-test-button.png "Start Test button")

**启动测试（Start Tests）**

启动或停止已启用且当前已选择的自动化测试。在此按钮下还会显示即将运行的测试数量，供你参考。

![运行关卡测试按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/078987cd-3f5c-442a-8cb7-328894969257/ue5_1-07-run-level-test-button.png "Run Level Test button")

**运行关卡测试（Run Level Test）**

如果当前加载的关卡是测试地图，你可以单击此按钮来选择测试并立即运行它。

![刷新测试按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0058ebd-0415-4029-92e8-148ecf38989f/ue5_1-08-refresh-tests-button.png "Refresh Test button")

**刷新测试（Refresh Tests）**

单击此按钮可为添加到项目中的所有测试刷新测试名称列表。

![寻找辅助应用程序按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/241ad7d4-673e-420f-af45-17ebef154ba5/ue5_1-09-find-workers-button.png "Find Workers button")

**寻找辅助应用程序（Find Workers）**

单击此按钮可查找可用于执行测试的本地辅助应用程序。

![错误按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc1f7111-6def-4009-9100-430f4afbf1ff/ue5_1-10-errors-button.png "Errors button")

**错误（Errors）**

单击此按钮可为"测试（Test）"窗口切换过滤器，以显示完成过程中所有出现错误的测试。

![警告按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cc24b8c7-2e9f-418a-b6bb-96594e6a8672/ue5_1-11-warnings-button.png "Warnings button")

**警告（Warnings）**

单击此按钮可为"测试（Test）"窗口切换过滤器，以显示完成过程中所有出现警告的测试。

![开发者内容按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afd4558b-238e-439f-9d9d-8b2e3abd512e/ue5_1-12-dev-content-button.png "Dev Content button")

**开发者内容（Dev Content）**

启用后，将在自动化测试中包含开发者目录。

![设备组按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91b761bc-aeb0-4177-a3a6-6317c1c1de5f/ue5_1-14-device-grups-button.png "Device Group button")

**设备组（Device Groups）**

可以按机器名称、平台、操作系统版本等一系列选项对测试进行分组。

![被排除的测试按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db897b46-447f-4550-b112-15dda50519d2/ue5_1-13-excluded-tests-button.png "Excluded Tests button")

**被排除的测试（Excluded Tests）**

切换是否仅显示被排除的测试。

![预设值面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c08a80d2-7e11-41d4-9576-8146eb4909b4/ue5_1-15-presets-panel.png "Presets panel")

**预设值（Preset）**

可以使用已选择的测试和设置添加你自己的自动化测试预设值，以便在以后复用。

### 测试窗口和结果

在 **自动化测试窗口（Automation Tests Window）** 和 **自动化测试结果（Automation Test Results）** 面板中，你可以看到已运行测试的相关信息，例如完成测试的机器、已运行测试的数量以及失败的数量等。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd73e17f-cf32-4403-a596-1aa90f3d5444/ue5_1-16-test-result-panel.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd73e17f-cf32-4403-a596-1aa90f3d5444/ue5_1-16-test-result-panel.png)

点击查看大图。

你可以使用 **设备组（Device Groups）** 按钮来确定开始运行新的自动化测试时，信息在结果面板中的分组方式。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba36e7f3-14b2-49c7-a99b-c24e649125b2/ue5_1-17-device-grups-dropdow.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ba36e7f3-14b2-49c7-a99b-c24e649125b2/ue5_1-17-device-grups-dropdow.png)

点击查看大图。

查看结果时，可使用 **显示（Display）** 选项显示测试的 **名称（Name）** 或完成测试花费的 **时间（Time）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59617372-4b0a-4c7c-9777-b297ae67e8cb/ue5_1-18-display-name-time.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/59617372-4b0a-4c7c-9777-b297ae67e8cb/ue5_1-18-display-name-time.png)

点击查看大图。

### 导出

测试完成后，可通过 **导出（Export）** 下拉菜单将结果导出到 **CSV** 文件中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ff35b85-0297-4022-b9ea-102b7c98bc6c/ue5_1-19-export-tests.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9ff35b85-0297-4022-b9ea-102b7c98bc6c/ue5_1-19-export-tests.png)

点击查看大图。

从可用的过滤器中选择要导出的内容，然后选择 **导出数据（Export Data）** 按钮。

![导出数据按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9865933f-7408-490b-a4ae-7359e3343879/ue5_1-20-export-data.png "Export Data button")

导出数据后，会有弹窗表明导出是否成功以及 **CSV** 文件的保存位置。

![导出数据成功消息](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ebf20cc-8acf-4ddc-b208-54c370bba2de/ue5_1-21-export-data-success-message.png "Export Data success message")

**导出（Export）** 下拉菜单仅在报告生成后才会处于活动状态，而 **导出数据（Export Data）** 按钮仅在有报告满足过滤条件时处于活动状态。

### 复制

测试完成后，你可以选择 **自动化测试结果（Automation Test Results）** 面板中显示的任意多行，单击 **复制（Copy）** 按钮，将这些行复制到剪贴板，然后粘贴到任意位置。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c52ee50-bf93-4026-829a-8b4c2ae7ce45/ue5_1-22-copy-test-result.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c52ee50-bf93-4026-829a-8b4c2ae7ce45/ue5_1-22-copy-test-result.png)

点击查看大图。

-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启动插件](/documentation/zh-cn/unreal-engine/automation-system-user-guide-in-unreal-engine#%E5%90%AF%E5%8A%A8%E6%8F%92%E4%BB%B6)
-   [用户界面](/documentation/zh-cn/unreal-engine/automation-system-user-guide-in-unreal-engine#%E7%94%A8%E6%88%B7%E7%95%8C%E9%9D%A2)
-   [会话浏览器](/documentation/zh-cn/unreal-engine/automation-system-user-guide-in-unreal-engine#%E4%BC%9A%E8%AF%9D%E6%B5%8F%E8%A7%88%E5%99%A8)
-   [工具栏](/documentation/zh-cn/unreal-engine/automation-system-user-guide-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [测试窗口和结果](/documentation/zh-cn/unreal-engine/automation-system-user-guide-in-unreal-engine#%E6%B5%8B%E8%AF%95%E7%AA%97%E5%8F%A3%E5%92%8C%E7%BB%93%E6%9E%9C)
-   [导出](/documentation/zh-cn/unreal-engine/automation-system-user-guide-in-unreal-engine#%E5%AF%BC%E5%87%BA)
-   [复制](/documentation/zh-cn/unreal-engine/automation-system-user-guide-in-unreal-engine#%E5%A4%8D%E5%88%B6)