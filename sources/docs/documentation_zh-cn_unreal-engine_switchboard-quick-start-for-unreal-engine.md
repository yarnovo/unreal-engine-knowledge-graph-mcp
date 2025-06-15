# 虚幻引擎Switchboard快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/switchboard-quick-start-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:29:53.812Z

---

目录

![Switchboard快速入门](https://dev.epicgames.com/community/api/documentation/image/39219a6e-b22f-4bc7-a252-9498c43967e6?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

本页面上的说明提供了Switchboard入门的分步指南。在本教程结束时，你将了解如何设置Switchboard以连接到多个设备。

## 先决条件

你必须先设置好以下事项，然后再完成后续步骤：

-   启用 **Switchboard** 插件。添加插件并重新启动引擎后，工具栏中将显示Switchboard和SwitchboardListener选项。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21351ee1-38dc-4844-87d1-c9d965984bfb/00-enable-plugin_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21351ee1-38dc-4844-87d1-c9d965984bfb/00-enable-plugin_ue5.png)
    
    点击查看大图
    
-   安装依赖性在主菜单中，选择 **编辑（Edit）> 编辑器偏好设置（Editor Preferences）> 插件（Plugins）> Switchboard** ，然后点击 **安装依赖性（Install Dependencies）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4351542e-04c7-40cf-9d90-95246588da25/01-switchboard-dependencies_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4351542e-04c7-40cf-9d90-95246588da25/01-switchboard-dependencies_ue5.png)
    
    点击查看大图
    
-   （可选）如果你使用的操作系统是Windows，可以选择为Switchboard安装桌面快捷方式。在主菜单中，选择 **编辑（Edit）> 项目设置（Project Settings）> 插件（Plugins）> Switchboard** ，然后点击 **添加快捷方式（Add Shortcut）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8d22085-2665-4533-9acd-a9508107d253/02-add-shortcuts_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8d22085-2665-4533-9acd-a9508107d253/02-add-shortcuts_ue5.png)
    
    点击查看大图
    
-   如果你根据源编译了引擎，将需要单独编译 **SwitchboardListener** 。你可以在Visual Studio中构建项目，或在引擎源代码的根目录中运行以下命令： `Engine\Binaries\DotNET\UnrealBuildTool.exe Win64 Development SwitchboardListener` 。
    

## 第1步 - 启动Switchboard Listener

每个要连接到Switchboard的设备上都需要启动SwitchboardListener。在工具栏中，选择 **Switchboard选项（Switchboard Options）> 启动Switchboard Listener（Launch Switchboard Listener）** ，这会使用默认地址0.0.0.0:2980或你在 **编辑器偏好设置（Editor Preferences）** 中为 **侦听程序命令行参数（Listener Commandline Arguments）** 指定的地址，在本地机器上启动侦听程序。

![启动Switchboard Listener](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74af72d9-e5f4-43c7-801c-3a487d9b4d63/launch-switchboard-listener.png)

侦听程序会在启动时自动最小化其窗口，避免nDisplay设备发生问题。可以在操作系统的任务栏中找到该应用程序。

![Switchboard Listener application](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40c6d3ad-7d2d-42c2-bd31-edf0a569bdf7/04-switchboard-listener_ue5.png)

你还可以选择 **登录时启动Switchboard Listener（Launch Switchboard Listener on Login）** ，这会在你每次登录到计算机时在本地机器上启动侦听程序。

## 第2步 - 启动Switchboard

有多种方法可启动Switchboard：

1.  在虚幻编辑器中打开项目，并从工具栏选择 **启动Switchboard（Launch Switchboard）** 。
    
    ![Launch Switchboard from Unreal Editor Toolbar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad6bfdd3-6d9a-42e3-a3e2-d90d71e13d69/05-swithchboard-icon_ue5.png)
2.  使用桌面快捷方式（如果已安装在计算机上）。请参阅Switchboard先决条件，了解安装此快捷方式的步骤。
    
3.  运行 **Engine\\Plugins\\VirtualProduction\\Switchboard\\Source\\Switchboard\\Switchboard.bat** 。
    

首次启动Switchboard时，将显示 **添加新Switchboard配置（Add New Switchboard Configuration）** 窗口。你可以填写字段并选择 **确定（OK）** ，或选择 **取消（Cancel）** 并在以后在Switchboard设置中进行更新。两个选项都会在一个窗口中打开Switchboard。

![添加新Switchboard配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddefe0f7-c539-417b-9cb0-e9d950a948aa/add-new-switchboard-configuration.png)

Switchboard配置参数：

参数

说明

Name

你要用于标识Switchboard项目的名称。

uProject

你要通过Switchboard控制的uProject的本地路径。

Engine Dir

你要使用的引擎的引擎目录的本地路径。可以指定你根据源编译的引擎的路径，或者安装的引擎版本的路径。示例："C:\\Program Files\\Epic Games\\UE\_5.00\\Engine"

Perforce

选中此复选框即可使用Perforce作为你的源元库。

P4 Project Path

包含上面指定的uProject文件的目录的库路径。

P4 Engine Path

包含上面指定的引擎目录的库路径。如果你不打算根据源编译引擎，则可以省略。

Workspace Name

映射了uProject目录的本地可用Perforce工作区的名称。

## 第3步 - 在Switchboard中添加设备

Switchboard支持多种类型的设备。这些设备作为Switchboard的插件进行实施。请参阅[Switchboard设置](/documentation/zh-cn/unreal-engine/switchboard-settings-reference-for-unreal-engine)，了解默认可用的设备插件列表以及关于如何创建你自己的设备插件的步骤。

以下例子显示了如何添加虚幻设备：

1.  在Switchboard中，选择 **添加设备（Add Device）> 虚幻（Unreal）** 以打开 **添加虚幻设备（Add Unreal Device）** 窗口。
    
    ![在Switchboard中添加虚幻设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3be044aa-cbd9-42af-a0f2-6dbc9d1044e3/add-unreal-device-switchboard.png)
2.  在"添加虚幻设备（Add Unreal Device）"窗口中，将名称分配给运行虚幻引擎的机器和计算机的IP地址。选择 **确定（OK）** 。设备已添加到Switchboard中的虚幻设备列表。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee4853bd-030a-4467-be48-dc3134802731/add-unreal-device-window.jpg)

你还可以在添加设备后更改其IP地址和名称。

1.  点击 **连接到侦听程序（Connect to listener）** 以连接到远程机器上运行的SwitchboardListener应用程序。设备连接时，状态图标会变成蓝色。
    
    ![连接到Switchboard Listener](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e7f08e81-66f0-48ed-92d6-caca43d3b2e5/connect-to-switchboard-listener.png)
2.  点击 **启动虚幻（Start Unreal）** 以在远程机器上启动虚幻编辑器的实例。
    
    ![远程启动虚幻实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/15b8884b-7d47-4894-bf16-28906a34b70d/start-unreal.png)
3.  虚幻实例启动之后，左侧的状态图标会变成橙色或绿色。
    
    -   绿色状态表示虚幻实例是通过OSC连接的，因此可以从Switchboard使用镜头试拍录制器。
        
    -   橙色状态表示不是通过OSC连接的。
        
    
    ![橙色状态示例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d801f6b-21d4-4736-93d5-51dc81d86eb7/orange-status-example.png)
4.  点击 **停止虚幻（Stop Unreal）** 以在远程机器上关闭虚幻编辑器。
    
    ![远程停止虚幻实例](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f20ffcc1-a8f1-4775-a93a-5d13525e0bd4/stop-unreal.png)

## 第4步 - 自行尝试

此快速入门介绍如何启动Switchboard和SwitchboardListener，连接到远程设备，以及从Switchboard控制它们。请参阅[Switchboard设置参考](/documentation/zh-cn/unreal-engine/switchboard-settings-reference-for-unreal-engine)，了解你可以在Switchboard中修改的选项完整列表。了解以下需要在你的项目中使用的功能：

-   远程同步和编译你的项目和引擎。
    
-   从Switchboard中远程录制镜头试拍。
    
-   启动和监控你的nDisplay群集。
    

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/switchboard-quick-start-for-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [第1步 - 启动Switchboard Listener](/documentation/zh-cn/unreal-engine/switchboard-quick-start-for-unreal-engine#%E7%AC%AC1%E6%AD%A5-%E5%90%AF%E5%8A%A8switchboardlistener)
-   [第2步 - 启动Switchboard](/documentation/zh-cn/unreal-engine/switchboard-quick-start-for-unreal-engine#%E7%AC%AC2%E6%AD%A5-%E5%90%AF%E5%8A%A8switchboard)
-   [第3步 - 在Switchboard中添加设备](/documentation/zh-cn/unreal-engine/switchboard-quick-start-for-unreal-engine#%E7%AC%AC3%E6%AD%A5-%E5%9C%A8switchboard%E4%B8%AD%E6%B7%BB%E5%8A%A0%E8%AE%BE%E5%A4%87)
-   [第4步 - 自行尝试](/documentation/zh-cn/unreal-engine/switchboard-quick-start-for-unreal-engine#%E7%AC%AC4%E6%AD%A5-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95)