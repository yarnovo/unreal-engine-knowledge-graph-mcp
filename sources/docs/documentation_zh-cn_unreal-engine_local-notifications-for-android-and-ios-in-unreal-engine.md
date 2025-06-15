# 虚幻引擎Android和iOS项目中的本地通知 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/local-notifications-for-android-and-ios-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:59:31.987Z

---

目录

![Android和iOS的本地通知](https://dev.epicgames.com/community/api/documentation/image/d0588337-3074-4c38-89c9-463d2c0f7836?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

本地通知是可在虚幻引擎4（UE4）应用程序之外显示的消息，用于告知用户已进行的更改或更新。在以下操作指南中，我们将介绍如何设置在Android和iOS设备上都有效的本地通知。

适用于Android和iOS的本地通知的当前实现设置和执行起来都极其简单。本系统也仅适用于本地通知，不适用于通过远程服务器发送的通知。

选择移动平台

Android iOS

## 步骤

1.  首先，新建具有下列选项集的基于 **蓝图** 的项目：
    
    -   选择 **蓝图（Blueprint）**
    -   选择 **手机** / **平板电脑（Mobile/Tablet）**
    -   选择 **可伸缩3D或2D（Scalable 3D or 2D）**
    -   选择 **不带含初学者内容包（No Starter Content）**
2.  项目打开之后，打开 **关卡蓝图**，方法是单击 **主工具栏** 上的 **蓝图（Blueprints）** 按钮，然后从显示的列表中选择 **打开关卡蓝图（Open Level Blueprint）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4861e72f-1469-4d6b-b926-40887d1d6bfa/android-20oslocalnotification_openlevelblueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4861e72f-1469-4d6b-b926-40887d1d6bfa/android-20oslocalnotification_openlevelblueprint.png)
    
    点击查看大图。
    
    为了便于你按照本操作指南所述进行操作，我们使用了关卡蓝图来设置和调用所需的本地通知蓝图节点。尽管可以在关卡蓝图中设置本地通知，但是你应考虑将该逻辑添加在对你的项目来说最为合理的位置。
    
3.  在 **变量（Variables）** 部分中，创建下列三个 **文本变量**，以便在本地通知显示时我们可以向用户显示消息：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ec724cc-3647-48db-81e1-0bd3419f2f86/localnotifications_stingvariables.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8ec724cc-3647-48db-81e1-0bd3419f2f86/localnotifications_stingvariables.png)
    
    点击查看大图。
    
    变量名称
    
    值
    
    **标题（Title）**
    
    Title:This is the Title!
    
    **正文（Body）**
    
    Body:This is the body!
    
    **操作（Action）**
    
    Action:I am taking this Action!
    
4.  为确保在本地通知被调用（以显示）时用户能够看到本地通知，向 **事件图表** 中添加 **Event Begin Play** 和 **Register for Remote Notifications** 节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/435c8f1b-d3b5-438c-bd2c-56e4437d7bc1/localnotifications_beginplayregisterremotenot-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/435c8f1b-d3b5-438c-bd2c-56e4437d7bc1/localnotifications_beginplayregisterremotenot-1.png)
    
    点击查看大图。
    
    向UE4项目中添加它时，请确保在项目首次加载时就调用"Register for Remote Notifications"节点。这样，你就不必在尝试显示通知时再次调用它。
    
5.  为确保在通知触发时用户能够看到通知，你需要将 **Event Begin Play** 的 **输出** 与 **Register for Remote Notifications** 的输入相连接。此设置可确保用户授予操作系统（OS）显示通知的权限。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44d3824d-fc4c-4dea-9bb7-256bd3f0c9fd/localnotifications_connectbeginplayregisterremotenot.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44d3824d-fc4c-4dea-9bb7-256bd3f0c9fd/localnotifications_connectbeginplayregisterremotenot.png)
    
    点击查看大图。
    
6.  我们已授予OS显示通知的权限，接下来，我们需要设置当用户单击通知时发生的事件。为处理此类型的交互，向 **事件图表** 中添加 **Get Launch Notification**、**Print String** 和 **Branch** 节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8381b463-00d5-4eca-b0f4-86253f603ca2/localnotifications_laucnbrankprintnodes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8381b463-00d5-4eca-b0f4-86253f603ca2/localnotifications_laucnbrankprintnodes.png)
    
    点击查看大图。
    
7.  将 **Get Launch Notification** 节点的输出与 **Branch** 节点的输入相连接，然后将"Branch"节点的 **True** 输出与 **Print String** 节点的输入相连接。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a397c03b-8c25-4744-bed1-6503d03e862b/localnotifications_connectgetlaunchtoprintandbranch-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a397c03b-8c25-4744-bed1-6503d03e862b/localnotifications_connectgetlaunchtoprintandbranch-2.png)
    
    点击查看大图。
    
8.  现在，将 **Notification Launched App** 与"Branch"节点的 **Condition** 输入相连接，然后将 **Activation Event** 与 **Print String** 节点的 **In String** 相连接。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9bc4ceb-393d-4c1c-91d1-8bbbebf33620/localnotifications_connectlaunchtobranch.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9bc4ceb-393d-4c1c-91d1-8bbbebf33620/localnotifications_connectlaunchtobranch.png)
    
    点击查看大图。
    
    将它添加到项目中时可以省略 **Print String** 节点。添加它的目的是确保使用的Activation Event正确。
    
9.  现在，我们需要设置通知内容以及通知应在多长时间之后显示。要做到这一点，我们首先需要向事件图表中添加下列蓝图节点：
    
    -   **Schedule Local Notifications from Now**
    -   **Delay**
    -   **标题（Title）、正文（Body）和操作（Action）文本变量**
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11a3eca4-dae2-4718-ad53-f6579fb5bded/20oslocalnotification_delayvarsschedule.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11a3eca4-dae2-4718-ad53-f6579fb5bded/20oslocalnotification_delayvarsschedule.png)
    
    点击查看大图。
    

10.在向事件图表中添加所需的节点之后，将"Delay"节点的 **Completed** 输出与 **Schedule Local Notifications from Now** 的输入相连接，然后分别将每个 **文本** 变量与它们在 **Schedule Local Notifications from Now** 节点上的相应输入相连接。完成后，事件图表应该如下图所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3102a480-3b7c-4f77-9a86-271c71ebbdc9/localnotifications_delayvarsetup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3102a480-3b7c-4f77-9a86-271c71ebbdc9/localnotifications_delayvarsetup.png)

点击查看大图。

11.将"Delay"节点上的 **时长（Duration）** 设置为 **五（5）** 秒。这有助于确保在本地通知被调用和显示之前，用户有足够的时间关闭应用程序或使应用程序在后台中运行。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8d38766-1ed8-4282-af18-f240b5f44e79/localnotifications_delaynodesetup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8d38766-1ed8-4282-af18-f240b5f44e79/localnotifications_delaynodesetup.png)

点击查看大图。

添加 **Delay** 节点的目的只是为了确保在通知被触发之前有足够的时间可用来关闭应用程序或使它在后台运行。将它添加到项目时不必使用 **Delay** 节点。

12.接下来，将"Schedule Local Notifications from Now"节点的 **Seconds from Now** 输入设置为 **30** 秒。此设置将使通知在此代码运行完的30秒之后显示。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41de4db8-987e-488f-9ebe-38b6c3f8d553/localnotifications_setschedualetime.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41de4db8-987e-488f-9ebe-38b6c3f8d553/localnotifications_setschedualetime.png)

点击查看大图。

13.将"Schedule Local Notifications from Now"的 **Activation Event** 的值设置为 **42**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38826d1e-4bc3-4809-9978-8328fefbde3b/localnotifications_setactivationevent.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38826d1e-4bc3-4809-9978-8328fefbde3b/localnotifications_setactivationevent.png)

点击查看大图。

借助Activation Event输入，你可以关联可用于调用特定通知的字符串值。它使你可以设置并使用在满足特定条件时可以被显示的不同通知。

14.在使本地通知能够奏效所需的所有节点都已添加到事件图表中之后，需要做的最后一件事情是将 **Branch** 节点的 **False** 输出与 **Delay** 节点的输入相连接。完成后，事件图表应该如下图所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69db6ea9-d808-4f9b-9907-c361b7dbd447/localnotifications_connectfalsetodelay.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69db6ea9-d808-4f9b-9907-c361b7dbd447/localnotifications_connectfalsetodelay.png)

点击查看大图。

15.按"编译（Compile）"按钮编译关卡蓝图，然后按"保存（Save）"按钮保存关卡。 16.最后，在 **主工具栏** 上，单击 **启动（Launch）** 图标旁的 **高级选项（Advanced Options）** 下拉菜单，然后选择要在其上进行测试的设备。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c685f490-b5b7-438a-8218-5f4a5e86ed9a/localnotifications_launchonedevice.png "LocalNotifications_LaunchOneDevice.png")

iOS项目的本地通知目前只能通过源代码版本获得。

1.  首先，下载并编译虚幻引擎的源代码。关于如何从GitHub下载源代码，你可以参阅[GitHub上的UE4](https://www.unrealengine.com/en-US/ue4-on-github)，以及[下载虚幻引擎源代码](/documentation/404)指南。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4815de97-c07e-4af3-b03b-650d7230ae29/localnotifications_githubsourceios.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4815de97-c07e-4af3-b03b-650d7230ae29/localnotifications_githubsourceios.png)
    
    点击查看全图
    
2.  编译完编辑器后，将其打开并选择 **游戏（Games）> 空白（Blank）** 模板，使用以下设置新建一个项目：
    
    -   选择 **C++**
    -   选择 **手机** / **平板电脑（Mobile/Tablet）**
    -   选择 **可伸缩3D或2D（Scalable 3D or 2D）**
    -   选择 **不带初学者内容包（No Starter Content）**
3.  项目打开之后，转至 **编辑（Edit）**，然后选择 **项目设置（Project Settings）**。
4.  在 **项目设置（Project Settings）** 菜单中，单击 **全部设置（All Settings）**，然后在搜索框中输入 **Enable Remote Notifications Support**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3da72939-795a-4a9e-b9ab-99363c78916f/localnotification_enableremotenotios-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3da72939-795a-4a9e-b9ab-99363c78916f/localnotification_enableremotenotios-1.png)
    
    点击查看大图。
    
    "Enable Remote Notifications Support"仅在使用基于C++的项目时可用。如果使用基于蓝图的项目，该选项将显示为灰色。
    
5.  项目打开之后，打开 **关卡蓝图**，方法是单击 **主工具栏** 上的 **蓝图（Blueprints）** 按钮，然后从显示的列表中选择 **打开关卡蓝图（Open Level Blueprint）** 选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93b6d137-7e1d-4136-a470-5a61c593045c/android-20oslocalnotification_openlevelblueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93b6d137-7e1d-4136-a470-5a61c593045c/android-20oslocalnotification_openlevelblueprint.png)
    
    点击查看大图。
    
    为了便于你按照本操作指南所述进行操作，我们使用了关卡蓝图来设置和调用所需的本地通知蓝图节点。尽管可以在关卡蓝图中设置本地通知，但是你应考虑将该逻辑添加在对你的项目来说最为合理的位置。
    
6.  在 **变量（Variables）** 部分中，创建下列三个 **文本变量**，以便在本地通知显示时我们可以向用户显示消息：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/953d6bf5-cd0f-4c53-93c5-80e712d1d076/localnotifications_stingvariables.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/953d6bf5-cd0f-4c53-93c5-80e712d1d076/localnotifications_stingvariables.png)
    
    点击查看大图。
    
    变量名称
    
    值
    
    **标题（Title）**
    
    Title:This is the Title!
    
    **正文（Body）**
    
    Body:This is the body!
    
    **操作（Action）**
    
    Action:I am taking this Action!
    
7.  为确保在本地通知被调用（以显示）时用户能够看到本地通知，向 **事件图表** 中添加 **Event Begin Play** 和 **Register for Remote Notifications** 节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d20c0471-08ce-4773-ad98-6d2b256b1365/localnotifications_beginplayregisterremotenot-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d20c0471-08ce-4773-ad98-6d2b256b1365/localnotifications_beginplayregisterremotenot-1.png)
    
    点击查看大图。
    
    向UE4项目中添加它时，请确保在项目首次加载时就调用"Register for Remote Notifications"节点。这样，你就不必在尝试显示通知时再次调用它。
    
8.  为确保在通知触发时用户能够看到通知，你需要将 **Event Begin Play** 的 **输出** 与 **Register for Remote Notifications** 的输入相连接。此设置可确保用户授予操作系统（OS）显示通知的权限。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dc098d0-5f4e-4831-bb70-0bcb0d5b71f0/localnotifications_connectbeginplayregisterremotenot.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5dc098d0-5f4e-4831-bb70-0bcb0d5b71f0/localnotifications_connectbeginplayregisterremotenot.png)
    
    点击查看大图。
    
9.  我们已授予OS显示通知的权限，接下来，我们需要设置当用户单击通知时发生的事件。为处理此类型的交互，向 **事件图表** 中添加 **Get Launch Notification**、**Print String** 和 **Branch** 节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a69898d3-f6e1-4f89-912c-80eb4ccf8c12/localnotifications_laucnbrankprintnodes.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a69898d3-f6e1-4f89-912c-80eb4ccf8c12/localnotifications_laucnbrankprintnodes.png)
    
    点击查看大图。
    

10.将 **Get Launch Notification** 节点的输出与 **Branch** 节点的输入相连接，然后将"Branch"节点的 **True** 输出与 **Print String** 节点的输入相连接。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/015c916d-de68-482a-a9c3-7bc3dc9507a4/localnotifications_connectgetlaunchtoprintandbranch-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/015c916d-de68-482a-a9c3-7bc3dc9507a4/localnotifications_connectgetlaunchtoprintandbranch-2.png)

点击查看大图。

11.现在，将 **Notification Launched App** 与"Branch"节点的 **Condition** 输入相连接，然后将 **Activation Event** 与 **Print String** 节点的 **In String** 相连接。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e37a3ca0-2bfa-4187-b7d5-2092041069c9/localnotifications_connectlaunchtobranch.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e37a3ca0-2bfa-4187-b7d5-2092041069c9/localnotifications_connectlaunchtobranch.png)

点击查看大图。

将它添加到项目中时可以省略 **Print String** 节点。添加它的目的是确保使用的Activation Event正确。

12.现在，我们需要设置通知内容以及通知应在多长时间之后显示。要做到这一点，我们首先需要向事件图表中添加下列蓝图节点：

***Schedule Local Notifications from Now*** **Delay** \* **标题（Title）、正文（Body）和操作（Action）文本变量**

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bf0c150-7626-4562-8940-db4f6b5b3c51/20oslocalnotification_delayvarsschedule.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4bf0c150-7626-4562-8940-db4f6b5b3c51/20oslocalnotification_delayvarsschedule.png)

点击查看大图。

13.在向事件图表中添加所需的节点之后，将"Delay"节点的 **Completed** 输出与 **Schedule Local Notifications from Now** 的输入相连接，然后分别将每个 **文本** 变量与它们在 **Schedule Local Notifications from Now** 节点上的相应输入相连接。完成后，事件图表应该如下图所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d848726e-1385-4515-af74-8ca0c32fb874/localnotifications_delayvarsetup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d848726e-1385-4515-af74-8ca0c32fb874/localnotifications_delayvarsetup.png)

点击查看大图。

14.将"Delay"节点上的 **时长（Duration）** 设置为 **五（5）** 秒。这有助于确保在本地通知被调用和显示之前，用户有足够的时间关闭应用程序或使应用程序在后台中运行。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5412d4ac-8f9a-4fe4-a870-354c3224abb2/localnotifications_delaynodesetup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5412d4ac-8f9a-4fe4-a870-354c3224abb2/localnotifications_delaynodesetup.png)

点击查看大图。

添加 **Delay** 节点的目的只是为了确保在通知被触发之前有足够的时间可用来关闭应用程序或使它在后台运行。将它添加到项目时不必使用 **Delay** 节点。

15.接下来，将"Schedule Local Notifications from Now"节点的 **Seconds from Now** 输入设置为 **30** 秒。此设置将使通知在此代码运行完的30秒之后显示。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c446959-4f35-49d8-a409-e201ecf68ef0/localnotifications_setschedualetime.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c446959-4f35-49d8-a409-e201ecf68ef0/localnotifications_setschedualetime.png)

点击查看大图。

16.将"Schedule Local Notifications from Now"的 **Activation Event** 的值设置为 **42**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b0ce24e-c735-484e-a817-d07e9099a48a/localnotifications_setactivationevent.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b0ce24e-c735-484e-a817-d07e9099a48a/localnotifications_setactivationevent.png)

点击查看大图。

借助Activation Event输入，你可以关联可用于调用特定通知的字符串值。它使你可以设置并使用在满足特定条件时可以被显示的不同通知。

17.在使本地通知能够奏效所需的所有节点都已添加到事件图表中之后，需要做的最后一件事情是将 **Branch** 节点的 **False** 输出与 **Delay** 节点的输入相连接。完成后，事件图表应该如下图所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a92dc201-bdb4-4ed3-ad11-e3e0f86078fa/localnotifications_connectfalsetodelay.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a92dc201-bdb4-4ed3-ad11-e3e0f86078fa/localnotifications_connectfalsetodelay.png)

点击查看大图。

18.按"编译（Compile）"按钮编译关卡蓝图，然后按"保存（Save）"按钮保存关卡。 19.最后，在 **主工具栏** 上，单击 **启动（Launch）** 图标旁的 **高级选项（Advanced Options）** 下拉菜单，然后选择要在其上进行测试的设备。  
![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2d8c1c4c-c974-42c7-8b21-511e8f561126/localnotifications_launchonios.png "LocalNotifications_LaunchOnIOS.png")

## 最终结果

一旦将项目部署到移动设备，在打开应用程序的五秒之后，你将听到并看到通知弹出，如以下视频所示。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [services](https://dev.epicgames.com/community/search?query=services)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/local-notifications-for-android-and-ios-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/local-notifications-for-android-and-ios-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)