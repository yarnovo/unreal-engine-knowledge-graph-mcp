# 虚幻引擎中的虚拟摄像机多用户快速入门指南 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:13:34.334Z

---

目录

![虚拟摄像机多用户快速入门指南](https://dev.epicgames.com/community/api/documentation/image/691565af-a2d4-4632-ae14-5d3323b92077?resizing_type=fill&width=1920&height=335)

你可以使用多个工作站，使用 **多用户** **虚拟摄像机**（ **VCam** ）工作区控制和渲染同一个场景中的Vcams。这可以让多个用户同时在同一个场景中工作。**多用户Vcam** 多用户Actor复制功能目前还在测试阶段。

多用户Vcam只能在虚拟制片项目中使用。

本文档提供了一个示例工作流程，你可以使用它建立一个互联的工作环境，让[多个用户](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)同时操作同一场景中的[VCams](/documentation/zh-cn/unreal-engine/virtual-cameras-in-unreal-engine)。

#### 先决条件

-   启用 **多用户编辑** [插件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine)。在 **菜单栏** 中，找到 **编辑（Edit）** > **插件（Plugins）** ，然后在 **编辑器（Editor）** 分段下找到 **Multi-User Editing** 插件。你也可以使用 **搜索栏**。启用插件后，重新启动编辑器。

![The Plugins window showing the Multi-User Plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/75796a5e-de9c-4169-acd9-42e7c63e2adc/mu-plugin.png)

-   你必须有一个运行正常的 **虚拟制片（Virtual Production）** 项目。如果没有，可以使用[模板](/documentation/zh-cn/unreal-engine/working-with-projects-and-templates-in-unreal-engine)项目。
    
-   你必须有一个 **多用户编辑器服务器（Multi-User Editor Server）** 。请参阅[多用户快速入门指南](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)，了解更多信息。
    
-   你的项目必须具有\[虚拟摄影机（VCam）Actor\]\](animating-characters-and-objects/Sequencer/Cameras/VirtualCamera)。
    

#### 启动MU会话

在虚幻引擎实例间复制虚拟摄像机需使用多用户编辑功能。所有客户端必须位于一个共享的多用户（MU）会话中。关于加入MU会话的更多详情，请参阅[虚幻引擎中的多用户编辑](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)

#### 复制VCam Actor

在将VCam Actor添加到位于MU会话中的场景后，该Actor会出现在每个客户端的编辑器里。这是因为还没有客户端声明它是VCam属性的所有者。

要声明自己对VCam的所有权，请点击VCam左下角的 **多用户（Multi User）** 按钮。这将在其他客户端上禁用输出提供者和修改器堆栈求值，隐藏HUD并确保将由此客户端来决定VCam所使用的值。再次点击该按钮将放弃所有权，在每个客户端上重启输出提供者、HUD和修改器，允许别的客户端声明所有权。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9cf6177-a3e1-4283-a750-865e87c45a2e/mu-vcamhud.png)

#### 远程录制

要在非托管计算机上录制虚拟摄像机，你必须将相应的录制摄像机（即命名的\[VCamActorName\]\_Record）)，而非VCamActor本身添加[镜头试拍录制器](/documentation/zh-cn/unreal-engine/record-gameplay-in-unreal-engine)。

## 旧版MU角色

旧版虚拟摄像机多用户工作流程已被废弃，但在虚幻引擎5.4中仍然可用。

此工作流程不支持新的高频率复制。

本小节提供了一个使用旧版系统在多用户模式中进行受限制的、低频率虚拟摄像机操作的示例工作流程。

#### 先决条件

-   启用 **Switchboard**[插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。在 **菜单栏** 中，找到 **编辑（Edit）** > **插件（Plugins）** ，然后在 **虚拟制片（Virtual Production）** 分段下找到 **Switchboard** 插件。你也可以使用 **搜索栏**。启用插件后，重新启动编辑器。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6b8877f-2278-49f6-8bfe-18536b7f63bc/plugin.png)

成功安装插件后，你可以使用虚幻引擎工具栏中的图标访问Switchboard应用程序。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e72be897-ce2b-4ddc-8a35-b2c908ad587e/icon.png)

-   你必须有一个运行正常的 **虚拟制片（Virtual Production）** 项目。如果没有，可以使用[模板](/documentation/zh-cn/unreal-engine/working-with-projects-and-templates-in-unreal-engine)项目。
    
-   你必须有一个 **多用户编辑器服务器（Multi-User Editor Server）**。请参阅[多用户快速入门指南](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)，了解更多信息。
    
-   你的项目必须具有\[虚拟摄影机（VCam）Actor\]\](animating-characters-and-objects/Sequencer/Cameras/VirtualCamera)。
    

## 声明虚拟制片角色

**Switchboard** 应用程序要求每个用户都担任一个 **VP角色（VP Role）**（如 **Editor** 或 **Render**），以区分和识别哪个用户与哪个[VCam Actor](/documentation/zh-cn/unreal-engine/virtual-cameras-in-unreal-engine)相关联。

1.  在虚幻编辑器（Unreal Editor）中的主工作站上，找到工具栏并选择的 **VP角色（VP Roles）**，然后从下拉菜单中选择（ **+** ） **添加角色（Add Role）**。为新角色命名。在本示例工作流程中，主工作站被命名为Editor。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e6e03f2c-4c22-4dfb-9bba-d46620f1cca4/addnewrole.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e5abc2a-c380-475f-acec-16e737c4957f/editorprodrole.png)
2.  使用相同的步骤添加第二个 **角色（Role）** ，由第二台设备担任。在本示例工作流程中，第二台工作站被命名为Render。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e6b0f11-2ae0-46a6-b3d1-b710bb72fec1/renderprodrole.png)
3.  在 **菜单栏（Menu Bar）** 中，找到 **编辑（Edit）** > **项目设置（Project Settings）** ，在 **多用户编辑（Multi-User Editing）** 分段下，使用下拉菜单将 **验证模式（Validation Mode）** 属性设置为 **软（Soft）** 。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15244b16-b2f4-44fc-bb9f-ab0b956f74f1/softauto.png)

如果你的项目包含任何脏污（dirty）包体，则在加入多用户会话时，系统会弹出错误提示。然后，你可以取消连接或修复存在的问题。如果你选择继续，系统将删除所有脏污包体。

现在，你的项目可以使用Switchboard连接到其他设备，以便多个用户在同一场景中同时操作多台VCam了。

请参阅[Switchboard](/documentation/zh-cn/unreal-engine/switchboard-in-unreal-engine)和[Switchboard快速入门指南](/documentation/zh-cn/unreal-engine/switchboard-quick-start-for-unreal-engine)文档，了解有关使用 **Switchboard** 插件连接多个用户的详细信息。

## 连接你的设备

在虚幻编辑器（Unreal Editor）中创建VP角色后，使用Switchboard应用程序将你的设备连接到多用户会话。

1.  使用工具栏中点击Switchboard按钮旁的选项菜单，并选择 **启动Switchboard Listener**。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb31e26b-ebb1-4e29-81c9-1eade695cbea/listener.png)
2.  在工具栏中启动 **Switchboard应用程序** 。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d6e5857-c748-44e3-bc93-b314f1a0c003/launch.png)
3.  在 **添加设备（Add Device）** 下拉菜单中选择 **虚幻（Unreal）** ，创建一个代表主工作站的新Switchboard设备。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88cf852f-f6cc-44ea-b21d-0e8891cfbd3f/mu-switchboard-createdevice.png)
4.  在提供的字段中设置 **名称（Name）** ，以及主工作站的 **IP地址（IP Address）** 。名称设置应与虚幻引擎中主工作站角色设置中的名称相同。在本示例工作流程中，使用的是 **Editor** 。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f96c1e5e-8426-4887-9c30-25130cc534ff/mu-switchboard-createdevice2.png)
5.  重复1-3步，创建第二个Switchboard设备。对于第二个设备，使用与第二个工作站的角色相同的名称。现在，这两个设备都应出现在了Switchboard应用程序的 **虚幻设备（Unreal Devices）** 列表中。在本示例工作流程中，使用的是 **Render** 。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a0564ce-bf5d-4f0b-a089-6a95cf28a81c/enableindividual.png)
6.  要自动打开网络连接并将设备连接到多用户编辑器（Multi-User Editor）会话，请在 **虚幻设备（Unreal Devices）** 列表中为每个设备选择 **自动加入** 和 **网络连接** 图标。设备成功连接到网络后， **连接指示灯（Connection Indicator）** 将显示为蓝色。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9437ee85-24eb-4e2c-a14c-1799091796bb/greenconec.png)
7.  为连接的每个设备指定一个 **VP角色（VP Role）** 。在Switchboard面板的 **菜单栏** 中，找到 **设置（Settings）** > **设置（Settings）** 并向下滚动至连接的每个设备的分段。在 **角色（Roles）** 属性中，使用下拉菜单为每个设备选择一个虚幻引擎 **VP角色（VP Roles）** 。
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54163609-0127-4006-8b3b-8852121a0c86/settingssettings.png)

你可以打开一个 **网络连接（Network Connection）** ，并使用虚幻设备列表标题中的 **自动加入** 和 **网络连接** 图标为列表中的每个设备启用 **自动加入** 。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e3db4eb-f2af-4816-ba20-3593bf6a933d/enableall.png)

连接工作站并为其指定角色后，你现在可以启动每个设备，并开始在多用户环境中操作VCam了。

## 多用户虚拟摄像机操作

1.  要将你的主工作站连接到多用户会话，请打开Switchboard应用程序，找到 **虚幻设备（Unreal Devices）** 列表，找到主 **Editor** 设备并点击 **启动（Launch）**。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ec868822-cde4-4291-8b18-59fecbf7108c/connect.png)

项目启动后，你可以在 **多用户浏览器（Multi-User Browser）** 窗口中验证Editor是否连接到了多用户会话。你可以在菜单栏中找到 **窗口（Window）** > **多用户浏览器（Multi-User Browser）** ，打开多用户浏览器（Multi-User Browser）。

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7a905e6f-48ac-4475-b270-3add55348208/connected.png)

1.  在 **世界大纲视图（World Outliner）** 中，选择 **VCamActor** 。
    
2.  在VCam Actor的 **细节（Details）** 面板中，选择 **VCam组件（VCam component）** 。
    
3.  在 **虚拟摄像机（Virtual Camera）** 属性分段，将 **角色（Role）** 属性设置为 **编辑（Edit）** ，并从下拉菜单中选择 **Editor** VP角色。
    

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70111a51-cba8-4848-ae1f-907259545f0e/editvcamsettings.png)

1.  通过打开 **已启用（Enabled）** 属性启用虚拟摄像机。
    
2.  在Switchboard应用程序中，点击 **启动** 图标启动 **Render** 设备。按照上述步骤，使用 **多用户浏览器（Multi-User Browser）** 窗口验证第二台 **Render** 设备是否也连接到了多用户会话。
    
3.  现在两个编辑器实例都已打开，在主 **Editor** 设备上移动 **虚拟摄像机（Virtual Camera）** ，就能看到该改动已被实时复制到第二台 **Render** 设备上。在以下示例中， **Editor** 设备（ **左** ）正在操作 **VCam Actor** ， **Render** 设备（ **右** ）正在接收更改并渲染场景。
    

![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58af1df5-d138-4481-9eb5-b73881eb4607/mu-vcam-demo.gif)

-   [getting started](https://dev.epicgames.com/community/search?query=getting%20started)
-   [virtual camera](https://dev.epicgames.com/community/search?query=virtual%20camera)
-   [switchboard](https://dev.epicgames.com/community/search?query=switchboard)
-   [working with media](https://dev.epicgames.com/community/search?query=working%20with%20media)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [启动MU会话](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine#%E5%90%AF%E5%8A%A8mu%E4%BC%9A%E8%AF%9D)
-   [复制VCam Actor](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine#%E5%A4%8D%E5%88%B6vcamactor)
-   [远程录制](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine#%E8%BF%9C%E7%A8%8B%E5%BD%95%E5%88%B6)
-   [旧版MU角色](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine#%E6%97%A7%E7%89%88mu%E8%A7%92%E8%89%B2)
-   [先决条件](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6-2)
-   [声明虚拟制片角色](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine#%E5%A3%B0%E6%98%8E%E8%99%9A%E6%8B%9F%E5%88%B6%E7%89%87%E8%A7%92%E8%89%B2)
-   [连接你的设备](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine#%E8%BF%9E%E6%8E%A5%E4%BD%A0%E7%9A%84%E8%AE%BE%E5%A4%87)
-   [多用户虚拟摄像机操作](/documentation/zh-cn/unreal-engine/virtual-camera-multi-user-quick-start-guide-in-unreal-engine#%E5%A4%9A%E7%94%A8%E6%88%B7%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA%E6%93%8D%E4%BD%9C)

相关文档

[

虚幻引擎多用户编辑

![虚幻引擎多用户编辑](https://dev.epicgames.com/community/api/documentation/image/d972b58a-d8bc-4407-a8d1-f7f34989690b?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/multi-user-editing-in-unreal-engine)