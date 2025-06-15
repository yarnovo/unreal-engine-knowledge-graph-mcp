# 使用虚幻引擎Android Vulkan移动渲染器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-android-vulkan-mobile-renderer-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:01:26.601Z

---

目录

![Android Vulkan移动渲染器](https://dev.epicgames.com/community/api/documentation/image/682af7d9-42df-4a27-83a6-df53c428183a?resizing_type=fill&width=1920&height=335)

**虚幻引擎(UE)** 已内置对 **Vulkan** 图形API的支持。Vulkan是一个低系统占用、跨平台的3D图形库，它为开发人员提供了对GPU的更多控制，并降低了基于Android的移动项目的CPU使用率。在下面的文档中，我们将介绍如何在UE Android项目中启用和使用Vulkan。

## 用于PC开发的Vulkan视频驱动程序

为了确保您可以可视化Vulkan在您的开发PC上提供的渲染选项，您需要确保为显卡下载并安装了最新版本的显卡驱动程序。下面，您将找到为了能够在您的开发PC上预览Vulkan的显示效果而需要使用的最低驱动程序版本。

-   [NVIDIA](http://www.nvidia.com/Download/index.aspx): 390.0或更高版本
-   [AMD](https://www.amd.com/zh-hans/support): 17或更高版本

## 检查Vulkan设备兼容性

要确定智能手机是否支持Vulkan渲染API比较困难，因为市场上的Android智能手机非常多样化。为了帮助您快速确认自己的智能手机是否支持Vulkan API，我们推荐安装来自Google Play商店的以下程序：[Vulkan硬件性能查看器（Hardware Caps Viewer for Vulkan）](https://play.google.com/store/apps/details)。

Vulkan硬件性能查看器（Hardware Caps Viewer for Vulkan）是一款客户端工具，可以根据开发者的需要，从支持新的Vulkan图形API的设备收集硬件实现的详细信息。

## 支持的Vulkan设备

以下设备除了支持非Vulkan配置文件，还支持Vulkan特定的配置文件。

-   Adreno 6xx
-   Mali G72
-   Mali G76
-   Mali G77
-   PowerVR GM9xxx
-   三星 XClipse 系列

如果你的设备使用Android 9或更高版本的Android系统，并且你的项目启用了Vulkan功能级别，它将使用这些GPU的设备配置文件的Vulkan功能版本。

请注意，使用Vulkan API的能力取决于您的移动运营商是否为您的特定设备变体发布了Vulkain更新。要查看此支持是否已推送到您的移动设备，您需要联系您的移动运营商。

## 为Vulkan构建

要构建支持Vulkan API的UE4项目，您需要执行以下操作：

1.  开始前，请确保您的Android智能手机已通过USB连接到您的开发PC上，并且您的Android智能手机已启用开发人员模式。
    
2.  启动UE4编辑器，使用 **游戏 > 空白** 模板并使用以下设置创建一个新项目：
    
    -   启用 **蓝图项目（Blueprint Project）**
    -   启用 **手机/平板电脑（Mobile / Tablet）**
    -   启用 **最高质量（Maximum Quality）**
    -   启用 **无初学者内容包（No Starter Content）**
    
    完成后，按下 **创建项目（Create Project）** 按钮以创建并加载新项目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a99a3961-cdc1-4ced-b5f1-090179eff0b6/ue5_1-01-creating-project-setup.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a99a3961-cdc1-4ced-b5f1-090179eff0b6/ue5_1-01-creating-project-setup.png)
    
    点击查看大图。
    
3.  项目加载完成后，前往 **编辑（Edit）> 项目设置（Project Settings）** ，然后，在 **引擎（Engine）** 下，前往 **渲染（Rendering）** 分段，确保 **VR** 下已启用 **移动HDR（Mobile HDR）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f9431a8-996b-4a2c-8e3f-be57810f2205/ue5_1-02-mobile-hdr.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2f9431a8-996b-4a2c-8e3f-be57810f2205/ue5_1-02-mobile-hdr.png)
    
    点击查看大图。
    
4.  在 **项目设置（Project Settings）** 中，找到 **平台（Platforms）** ，前往 **Android** 分段，确保在 **构建（Build）** 下启用以下选项：
    
    -   **支持OpenGL ES3.2（Support OpenGL ES3.2）**
    -   **支持Vulkan（Support Vulkan）**
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6bd415cd-6731-471a-ba91-54727bf0c107/ue5_1-03-set-build-options.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6bd415cd-6731-471a-ba91-54727bf0c107/ue5_1-03-set-build-options.png)
    
    点击查看大图。
    
5.  在菜单栏中，点击 **平台（Platform）** 按钮，前往 **Android** ，确保选中 **Android(ASTC)** 选项，并点击 **数据包项目（Package Project）** 。
    
    ![启动打包项目流程](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9e244eb-6502-4a83-9ae7-af18cd3edd22/ue5_1-04-launch-packaging-project.png "Launch packaging project process")
6.  选择UE位置，保存Android构建版本，然后按 **选择文件夹（Select Folder）** 按钮，启动打包流程。
    
    ![设置打包项目文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/60413a26-12f7-480b-a641-be77d2bf057f/ue5_1-05-save-build-location.png "Set packaging project folder")
7.  打包流程完成后，打开放置已打包构建版本的文件夹。在此文件夹中，你会看到两个 `BAT` 文件。找到名称中带有 **Install** 字样的 `BAT` 文件，双击该文件，将其安装到你的设备上。
    
    ![启动安装到设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05e94bcd-2c21-4c8e-87ac-1bf3ac925474/ue5_1-06-launch-installation.png "Launch installation to device")
8.  在设备上完成安装后，按下方有你项目名称的UE图标，在设备上启动项目。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c31652e0-24f7-4dbe-9e1e-bc4c2145aa2f/ue5_1-07-project-on-device.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c31652e0-24f7-4dbe-9e1e-bc4c2145aa2f/ue5_1-07-project-on-device.png)
    
    点击查看大图。
    

## 在编辑器中启用Vulkan预览渲染

在上述步骤在项目中启动了Vulkan后，会自动出现预览渲染选项。在 **主工具栏（Main Toolbar）** 中点击 **设置（Setting）** 按钮，找到 **预览渲染关卡（Preview Rendering Level）** 选项。选择 **Android Vulkan** 选项在UE4视口中启用Vulkan预览。

![设置预览渲染关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f42e7c7d-d8b5-4860-84dc-a8bb70305b58/ue5_1-08-set-preview-rendering-level.png "Set Preview Rendering Level")

视口会在右下角显示 **Feature Level: Android Vulkan ES31** 。

启用Vulkan预览渲染后，编辑器需要重新编译整个着色器缓存以加入必要的Vulkan选项。根据项目的规模和开发用机的性能，此过程可能需要几分钟到一小时，甚至更多时间才能完成。

## 启用Vulkan移动预览渲染器

要启用Vulkan移动预览渲染器，您需要在项目中执行以下操作：

1.  在 **主工具栏（Main Toolbar）** 中，转到 **编辑（Edit）** 选项，然后从主菜单中选择 **编辑器首选项（Editor Preferences）** 选项。
    
    ![打开编辑器偏好设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c4f506c-de1f-45c8-b2c8-22d056e05272/ue5_1-09-open-editor-preferences.png "Open Editor Preferences")
2.  在 **一般（General）** 部分中，在 **实验性（Experimental）** 类别下展开 **PIE** 部分，然后勾选 **允许Vulkan移动预览（Allow Vulkan Mobile Preview）** 旁边的复选框。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c878657-95bf-4cc0-86b5-b1891c81f43b/ue5_1-10-allow-vmp.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c878657-95bf-4cc0-86b5-b1891c81f43b/ue5_1-10-allow-vmp.png)
    
    点击查看大图。
    
3.  在 **主工具栏（Main Toolbar）** 中，点击 **播放（Play）** 面板上的选项按钮，从下拉列表中选择 **Vulkan移动预览（Vulkan Mobile Preview）（PIE）** 。
    
    ![在Vulkan移动预览中运行项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c1c7aa5-ee84-4834-8448-7afc39b34379/ue5_1-11-run-project-in-vmp.png "Run project in Vulkan Mobile Preview")
4.  点击位于 **主工具栏（Main Toolbar）** 上的 **播放（Play）** 按钮，在启用Vulkan渲染器的情况，在新预览窗口中启动UE项目。如果所有内容设置成功，你会看到类似下图的画面。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49631403-80f3-485c-8d1d-1bc956dfdde3/ue5_1-12-vmp-window.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49631403-80f3-485c-8d1d-1bc956dfdde3/ue5_1-12-vmp-window.png)
    
    点击查看大图。
    

如果在预览窗口顶部项目名称的旁边没有看到 **(SF\_VULKAN\_ES31)** ，则意味着项目没有使用Vulkan API。如果出现这种情况，请确认您的视频卡已更新到最新版本。

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [用于PC开发的Vulkan视频驱动程序](/documentation/zh-cn/unreal-engine/using-the-android-vulkan-mobile-renderer-in-unreal-engine#%E7%94%A8%E4%BA%8Epc%E5%BC%80%E5%8F%91%E7%9A%84vulkan%E8%A7%86%E9%A2%91%E9%A9%B1%E5%8A%A8%E7%A8%8B%E5%BA%8F)
-   [检查Vulkan设备兼容性](/documentation/zh-cn/unreal-engine/using-the-android-vulkan-mobile-renderer-in-unreal-engine#%E6%A3%80%E6%9F%A5vulkan%E8%AE%BE%E5%A4%87%E5%85%BC%E5%AE%B9%E6%80%A7)
-   [支持的Vulkan设备](/documentation/zh-cn/unreal-engine/using-the-android-vulkan-mobile-renderer-in-unreal-engine#%E6%94%AF%E6%8C%81%E7%9A%84vulkan%E8%AE%BE%E5%A4%87)
-   [为Vulkan构建](/documentation/zh-cn/unreal-engine/using-the-android-vulkan-mobile-renderer-in-unreal-engine#%E4%B8%BAvulkan%E6%9E%84%E5%BB%BA)
-   [在编辑器中启用Vulkan预览渲染](/documentation/zh-cn/unreal-engine/using-the-android-vulkan-mobile-renderer-in-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E5%90%AF%E7%94%A8vulkan%E9%A2%84%E8%A7%88%E6%B8%B2%E6%9F%93)
-   [启用Vulkan移动预览渲染器](/documentation/zh-cn/unreal-engine/using-the-android-vulkan-mobile-renderer-in-unreal-engine#%E5%90%AF%E7%94%A8vulkan%E7%A7%BB%E5%8A%A8%E9%A2%84%E8%A7%88%E6%B8%B2%E6%9F%93%E5%99%A8)