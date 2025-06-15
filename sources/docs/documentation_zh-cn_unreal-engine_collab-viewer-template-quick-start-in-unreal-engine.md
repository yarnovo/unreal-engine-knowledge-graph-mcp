# 虚幻引擎协作查看器（Collab Viewer）模板快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:05.961Z

---

目录

![协作查看器（Collab Viewer）模板快速入门](https://dev.epicgames.com/community/api/documentation/image/018f9ed8-41e6-48ef-8f42-a8ebbb218fe7?resizing_type=fill&width=1920&height=335)

本页详细介绍在本地网络上运行协作查看器（Collab Viewer）模板（使用默认内容）的各个步骤。本指南结束时，您将了解如何开启协作查看器（Collab Viewer）模板提供的运行时体验，有哪些方法可以用来在场景中进行互动和移动，以及如何让网络上的多名其他用户加入共享体验。

本文中的流程以AEC的Collab Viewer模板为例，但同样适用于 OEM/Manufacturing 模板。

-   [1 - 打包与发布](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine#1-%E6%89%93%E5%8C%85%E4%B8%8E%E5%8F%91%E5%B8%83)
-   [2 - 一人启动服务器](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine#2-%E4%B8%80%E4%BA%BA%E5%90%AF%E5%8A%A8%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [3 - 其他人加入](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine#3-%E5%85%B6%E4%BB%96%E4%BA%BA%E5%8A%A0%E5%85%A5)
-   [4 - 自行尝试](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine#4-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95)

## 1 - 打包与发布

要利用协作查看器（Collab Viewer）模板的所有功能，首先需要将项目打包成一个 *.exe* 文件。若要多人连接到单个会话，每人都需要用该打包 *.exe* 文件的副本运行应用程序。因此，团队中须有一人从虚幻编辑器打包项目，然后将该 *.exe* 文件发布给需要加入该会话的其他成员。

要打包并共享项目，请执行以下操作：

1.  从协作查看器（Collab Viewer）模板创建新项目（如尚未创建），并在虚幻编辑器中打开。
2.  选择一个模板类目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a008273-179d-4f50-ad9b-ad9f640b2fac/01-create-new-project_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a008273-179d-4f50-ad9b-ad9f640b2fac/01-create-new-project_ue5.png)
    
    Click for full image.
    
3.  选择 **协作查看器** 模板。
4.  选择 **创建项目**。
5.  从主工具栏中，选择 **平台菜单（Platforms Menue）> 窗口（Windows）> 打包项目（Package Project）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/277f5fca-4b7d-45c6-9981-1bc7d9e985ad/02-select-pacage-project.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/277f5fca-4b7d-45c6-9981-1bc7d9e985ad/02-select-pacage-project.png)
    
    Click for full image.
    
6.  用虚幻编辑器浏览至计算机上用于放置项目打包版本的文件夹，并单击 **选择文件夹（Select Folder）**。  
    ![Select a folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa141bcc-bdbb-4e1d-9651-11099df4ba3b/03-select-folder_ue5.png "Select a folder")
    
    虚幻编辑器开始打包进程。
    
    ![Packaging progress](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4dc961e6-8429-4be8-a727-5d6d78cd33fc/04-packaging-project-message_ue5.png "Packaging progress")
7.  打包进程结束时，前往上述步骤3中选择的文件夹。可找到一个名为 **WindowsNoEditor** 的文件夹，内容类似如下：  
    ![Package contents](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6bbb0a22-14e2-4f6c-862e-764987a15691/05-package-project-folder_ue5.png "Package contents")  
    所有要在协作查看器（Collab Viewer）中加入同一会话的用户本地计算机上的此文件夹中需要包含所有这些文件。可选择您认为最合适的方式来实现这一点。  
    例如，可打包此文件夹中的文件，将其放在本地网络的共享位置。然后其他用户可将文件复制到其计算机。

欲详细了解打包以及流程的配置放置，另请参阅[打包项目](/documentation/404)。

每次更改项目中的内容时，**必须** 遵循此打包和分发流程。关卡中的3D模型不会自动在联网用户之间复制；而是会被编译到打包应用程序中。所有人必须使用同一版本的打包应用程序，会话中的所有人才能能看到最新内容。

## 2 - 一人启动服务器

这一步将启动服务器——此服务器是其他人可连接的协作查看器（Collab Viewer）应用程序的特殊实例。

1.  双击打包应用程序的 *.exe* 文件。 下例中，项目名为 **CollabProject**，其打包应用程序随之名为 *CollabProject.exe*。  
    ![Packaged executable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5be658cf-608d-4c39-9293-7faa144b1f2d/06-package-template_ue5.png "Packaged executable")
2.  在欢迎屏幕中为自己设置一个显示名称。此名称显示在化身头部上方，同一会话中的其他人可以看到。 
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e947131e-a7b9-4ba8-8d21-23c7d48f86e9/07-enter-user-name_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e947131e-a7b9-4ba8-8d21-23c7d48f86e9/07-enter-user-name_ue5.png)
    
    Click for full image.
    
    单击箭头转至下一步。
    
3.  下一个设置保留默认值 **创建会话（Host a session）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb919e11-866c-40e9-8e48-7cbe6f3e41cf/08-host-a-session_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb919e11-866c-40e9-8e48-7cbe6f3e41cf/08-host-a-session_ue5.png)
    
    Click for full image.
    
    单击箭头完成服务器设置。
    
    若只想使用协作查看器（Collab Viewer）模板创建单人体验，不含其他联网用户加入的功能，可选择此处的 **单人会话（Single Session）** 选项。它提供与以主机身份启动时完全相同的运行时体验，唯一区别是应用程序对网络中的其他人不可见。
    

将从主示例关卡启动。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/050b7b7b-ab59-4709-baef-18384a49bf46/09-inside-project-view_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/050b7b7b-ab59-4709-baef-18384a49bf46/09-inside-project-view_ue5.png)

Click for full image.

使用[桌面功能按钮](/documentation/zh-cn/unreal-engine/interacting-with-the-collab-viewer-in-unreal-engine#%E6%A1%8C%E9%9D%A2%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)或[VR功能按钮](/documentation/zh-cn/unreal-engine/interacting-with-the-collab-viewer-in-unreal-engine#vr%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)在场景中移动并进行交互。

-   可按 **空格** 键（或VR中的摇杆键）打开交互菜单，用其中的选项使选定对象变为透明（**Xray**），传送至预设 **书签** 位置，在3D空间中移动对象，或播放变速器总成在建筑内的预设"爆炸"动画。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0c7a6e6-cc93-4174-9071-7237c77ce78a/10-viewer-menu_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f0c7a6e6-cc93-4174-9071-7237c77ce78a/10-viewer-menu_ue5.png)
    
    Click for full image.
    
-   也可利用右上角菜单在不同移动模式之间切换（飞行、行走、环绕），若已设置兼容的VR头戴设备，可切换至VR模式。
    
    ![Toolbar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e9d2310-8461-4162-bab7-68cf5c29a0b8/11-menu-toolbar_ue5.png "Toolbar")

更多详情请参阅：

-   [与协作查看器进行交互](/documentation/zh-cn/unreal-engine/interacting-with-the-collab-viewer-in-unreal-engine)
-   [在Collab Viewer中进行测量](/documentation/zh-cn/unreal-engine/measuring-in-the-collab-viewer-in-unreal-engine)
-   [在协作查看器（Collab Viewer）中进行注释](/documentation/zh-cn/unreal-engine/annotating-in-the-collab-viewer-in-unreal-engine)
-   [保存和加载会话](/documentation/zh-cn/unreal-engine/saving-and-loading-a-session-in-unreal-engine)

操作时，自己的计算机作为服务器，对网络中的其他计算机可见。其他人加入会话时，会显示各自的化身。

## 3 - 其他人加入

本步骤中，每个加入会话的人都会在其计算机上启动打包应用程序的单独实例，这些单独实例都连接到同一服务器。

所有人都应遵循以下说明加入会话：

1.  双击打包应用程序的 *.exe* 文件。例如，此例中项目名为 **CollabProject**，打包应用程序随之名为 *CollabProject.exe*。  
    ![Packaged executable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e202d7b-78e3-4f8a-940a-133c76dd9814/12-select-collab-template_ue5.png "Packaged executable")
2.  在欢迎屏幕中为自己设置一个显示名称。此名称显示在化身头部上方，同一会话中的其他人可以看到。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/508fb149-eb45-45c0-b370-402b31b6c834/13-enter-your-name_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/508fb149-eb45-45c0-b370-402b31b6c834/13-enter-your-name_ue5.png)
    
    Click for full image.
    
    单击箭头转至下一步。
    
3.  将下一设置更改为 **加入会话（Join a session）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6a32256-19a0-420b-9035-98ee2b49cf58/14-join-a-session_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6a32256-19a0-420b-9035-98ee2b49cf58/14-join-a-session_ue5.png)
    
    Click for full image.
    
    单击箭头转至下一步。
    
4.  应用程序扫描网络，并列出所有可用服务器。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04bff77e-5762-4a46-8d28-4e74e379c1b2/15-choose-session_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/04bff77e-5762-4a46-8d28-4e74e379c1b2/15-choose-session_ue5.png)
    
    Click for full image.
    
    -   若在列表中看到所需服务器，点击名称加入会话。
        
        ![Click the server name](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/03f64bff-2c48-437d-b394-c50f81c3fb99/16-server-list_ue5.png "Click the server name")
    -   若未找到所需服务器，尝试按 **刷新（Refresh）** 按钮重新扫描网络寻找服务器。
        
        ![Refresh the list of servers](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5637bbfd-f615-4808-8f84-1576e783722a/16-1-refresh-button_ue5.png "Refresh the list of servers")
    -   如应用程序找不到该服务器，但已知其IP地址，可开启 **手动指定IP地址（Manually specify an IP Address）** 开关。
        
        ![Switch to manual IP mode](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3f6c8ca6-93ef-414f-a838-1d533e4580e4/17-specify-ip-address_ue5.png "Switch to manual IP mode")
        
        在提供的域中输入IP地址，单击 **加入（Join）**。
        
        [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5334f71-9019-4b13-bcf2-d407d6c7e715/18-join-session_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5334f71-9019-4b13-bcf2-d407d6c7e715/18-join-session_ue5.png)
        
        Click for full image.
        

将从主关卡启动。可看到服务器运行者的化身，以及所有加入会话的人员各自的化身：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36a77ffc-d494-4e40-abc0-12a0198971a6/collabviewer-client-joined.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36a77ffc-d494-4e40-abc0-12a0198971a6/collabviewer-client-joined.png)

Click for full image.

各用户的化身略有不同：

-   每个化身都伴有用户在欢迎菜单中输入的显示名称。
    
-   每个化身将随机指定一种颜色。
    
-   行走或VR模式中的用户化身类似于上图右侧的人形。其他导航模式下的用户由上图左侧的摄像机表示。
    
-   用户移动并环顾四周时，所有对应化身都会在场景中移动和旋转，可了解其他用户在关注何处。
    

使用[桌面功能按钮](/documentation/zh-cn/unreal-engine/interacting-with-the-collab-viewer-in-unreal-engine#%E6%A1%8C%E9%9D%A2%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)或[VR功能按钮](/documentation/zh-cn/unreal-engine/interacting-with-the-collab-viewer-in-unreal-engine#vr%E5%8A%9F%E8%83%BD%E6%8C%89%E9%92%AE)在场景中移动并进行交互。

## 4 - 自行尝试

了解运行协作查看器（Collab Viewer）模板以及与其他人互连的方式后，变可以开始使用同样的运行时体验来查阅自己的内容了。若要了解如何将自定义内容添加到项目以及如何设置自定义内容以获取相同的运行时体验，请继续阅读[向协作查看器（Collab Viewer）模板添加自定义内容](/documentation/zh-cn/unreal-engine/adding-your-own-content-to-the-collab-viewer-in-unreal-engine)指南。

-   [collaboration](https://dev.epicgames.com/community/search?query=collaboration)
-   [templates](https://dev.epicgames.com/community/search?query=templates)
-   [collab viewer](https://dev.epicgames.com/community/search?query=collab%20viewer)
-   [design review](https://dev.epicgames.com/community/search?query=design%20review)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 打包与发布](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine#1-%E6%89%93%E5%8C%85%E4%B8%8E%E5%8F%91%E5%B8%83)
-   [2 - 一人启动服务器](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine#2-%E4%B8%80%E4%BA%BA%E5%90%AF%E5%8A%A8%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [3 - 其他人加入](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine#3-%E5%85%B6%E4%BB%96%E4%BA%BA%E5%8A%A0%E5%85%A5)
-   [4 - 自行尝试](/documentation/zh-cn/unreal-engine/collab-viewer-template-quick-start-in-unreal-engine#4-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95)