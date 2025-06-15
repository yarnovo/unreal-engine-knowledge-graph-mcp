# 虚幻引擎SteamVR入门介绍 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/steamvr-best-practices-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:44:59.565Z

---

目录

![SteamVR最佳实践](https://dev.epicgames.com/community/api/documentation/image/2a6b1b8a-58aa-4f52-9953-23ea27c7e18e?resizing_type=fill&width=1920&height=335)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb397006-5a10-4dc8-bb89-4cfa0e402ac2/t_vive_hmd.png)

SteamVR SDK不同于其他虚幻引擎(UE)的虚拟现实SDK，因为它并不一定要与特定的头戴显示器(HMD)一起使用。因此，为SteamVR开发的UE项目可以与任何支持SteamVR的HMD一起使用。以下指南将帮助重点介绍在为SteamVR和UE开发内容时需要了解的一些信息。

## SteamVR Beta

为了确保您已经安装了最新版本的SteamVR，通过右键单击SteamVR工具进入 **属性（Properties）** > **Beta（Betas）** 确保您选择了SteamVR Beta，然后选择 **beta - SteamVR Beta更新（beta - SteamVR Beta Update）** 选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6651132b-b90a-405a-823d-1ad3e87e715d/steamvrbp_01.png)

## SteamVR HMD目标帧率

下面，您将找到在使用SteamVR时您的UE项目必须满足的帧率。

HMD设备

目标帧率

**HTC Vive**

90 FPS

**Oculus Rift**

90 FPS

## SteamVR健全性检查

如果插入了支持的HMD并且启用了SteamVR插件，虚幻引擎将自动使用SteamVR。如果由于某种原因，SteamVR不能正常工作，那么首先检查一下是否启用了SteamVR插件。您可以在[插件](/documentation/zh-cn/unreal-engine/plugins-in-unreal-engine)菜单的 **虚拟现实（Virtual Reality）** 部分下找到SteamVR插件。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d2f3b66-6c1d-4889-abae-7040e48d29cc/steamvrbp_00.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d2f3b66-6c1d-4889-abae-7040e48d29cc/steamvrbp_00.png)

单击显示全图。

## 使用SteamVR查看工作

SteamVR将无法使用UE编辑器的任何视口或默认的"在编辑器中运行(PIE)"会话。要使用SteamVR查看项目，您需要使用 **VR预览（VR Preview）** 选项。要访问VR预览（VR Preview）选项，您需要在UE编辑器中执行以下操作：

1.  在 **播放（Play）** 部分的主工具栏中，单击播放（Play）按钮旁边的白色小三角形。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c8e2554-3204-4548-9571-8a73583b22a7/rift_preview_00.jpg)
2.  从下拉菜单中，选择 **VR预览（VR Preview）** 选项，然后戴上Rift以在VR中查看项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd3efbfa-2581-4574-bf3b-537b4f5f6d20/rift_preview_01.jpg)
    
    一旦您将播放模式切换到VR预览（VR Preview）选项，您的项目将始终在VR中启动，即使使用像 **ALT + P** 这样的快捷方式也是如此。
    

## SteamVR镜像模式

SteamVR头戴设备镜像让您可以看到用户在HMD中看到的内容。如果您需要记录您在UE项目和SteamVR合成器中所看到的内容，那么启用此模式尤为有用。要启用镜像，需要执行以下操作：

1.  首先，找到SteamVR工具，然后右键单击它们来显示菜单并选择 **显示镜像（Display Mirror）** 选项。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3523f07-4cd8-4b1d-9b86-9b64808cbbac/steamvrbp_02.png)
2.  然后，将在一个名为 **头戴设备镜像（Headset Mirror）** 的新窗口中显示镜像，如下图所示。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dffbcf11-a2df-4930-b32f-353ba12c5c57/steamvrbp_03.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dffbcf11-a2df-4930-b32f-353ba12c5c57/steamvrbp_03.png)
    
    上图准确地显示了用户在HMD中看到的内容。
    

## SteamVR开发者链接

下面是一组链接，它们将提供与SteamVR有关的硬件或软件问题等事项的有用信息。

-   [SteamVR开发者支持](https://support.steampowered.com/kb_article.php?ref=1131-WSFG-3320)
-   [HTC Vive开发者支持](https://developer.viveport.com/us/develop_portal/)

-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [steamvr](https://dev.epicgames.com/community/search?query=steamvr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [SteamVR Beta](/documentation/zh-cn/unreal-engine/steamvr-best-practices-in-unreal-engine#steamvrbeta)
-   [SteamVR HMD目标帧率](/documentation/zh-cn/unreal-engine/steamvr-best-practices-in-unreal-engine#steamvrhmd%E7%9B%AE%E6%A0%87%E5%B8%A7%E7%8E%87)
-   [SteamVR健全性检查](/documentation/zh-cn/unreal-engine/steamvr-best-practices-in-unreal-engine#steamvr%E5%81%A5%E5%85%A8%E6%80%A7%E6%A3%80%E6%9F%A5)
-   [使用SteamVR查看工作](/documentation/zh-cn/unreal-engine/steamvr-best-practices-in-unreal-engine#%E4%BD%BF%E7%94%A8steamvr%E6%9F%A5%E7%9C%8B%E5%B7%A5%E4%BD%9C)
-   [SteamVR镜像模式](/documentation/zh-cn/unreal-engine/steamvr-best-practices-in-unreal-engine#steamvr%E9%95%9C%E5%83%8F%E6%A8%A1%E5%BC%8F)
-   [SteamVR开发者链接](/documentation/zh-cn/unreal-engine/steamvr-best-practices-in-unreal-engine#steamvr%E5%BC%80%E5%8F%91%E8%80%85%E9%93%BE%E6%8E%A5)