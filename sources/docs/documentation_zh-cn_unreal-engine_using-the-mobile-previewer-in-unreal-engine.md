# 使用虚幻引擎中的移动端预览器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:58:59.133Z

---

目录

![移动预览器](https://dev.epicgames.com/community/api/documentation/image/a4d9f024-f85d-4f12-af9e-76b02169474a?resizing_type=fill&width=1920&height=335)

![Example of Rendering Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3ee8fe7-ced7-4e35-bc47-5452667e0668/ue5_1-01-rendering-level-example.png "Example of Rendering Level")

1：移动/HTML5 - Open GL ES2，2：着色器模型4.0 - DX10/ OpenGL 3.3+，3：着色器模型5.0 - DX11/ OpenGL 4.3+。

在 **虚幻引擎** 中，你可以使用 **移动预览器（Mobile Previewer）** 直接在UE编辑器视口中预览你的场景在不同移动设备上的显示情况。在启用不同的预览渲染关卡时，场景中的材质将被重新编译，以最大程度上模拟所选择的渲染器预览的外观和特性集。移动预览器使你能够在渲染关卡之间无缝切换，而无需重新启动编辑器。

## 使用移动预览器

**移动预览器（Mobile Previewer）** 使你能够针对当前UE会话在不同渲染器之间快速切换，以便你在编辑器中工作的同时，还能够了解你的游戏在目标设备上的显示情况。要了解如何更改到不同的渲染器预览，请遵循以下步骤：

虽然你不需要重新启动编辑器以使新的预览渲染关卡生效，但是当你第一次更改到某个预览渲染关卡时，编辑器将需要时间重新编译着色器。对以前使用的渲染关卡的后续更改应该几乎是即时的。

1.  从主工具栏中，选择 **设置（Settings）** 按钮以展开列示的菜单项。在 **可扩展性（Scalability）** 部分下，将鼠标悬停在 **预览渲染关卡（Preview Rendering Level）** 以公开可以从中选择的不同渲染关卡选项。
    
    ![Enable Preview Rendering Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c0fd1c3-d5f2-49d2-925e-ce4a7866a11c/ue5_1-02-mobile-preview-rendering.png "Enable Preview Rendering Level")
2.  将鼠标悬停在要预览的部分渲染关卡上，然后单击鼠标左键选择它。  
    将弹出"正在更改预览渲染关卡（Changing Preview Rendering Level）"进度条。等待该进度条完成并重新编译着色器。
    
    ![Changing Preview Rendering Level progress bar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1e0ba9a-d8be-47f8-9c8a-c314d7be72a8/ue5_1-03_change-preview-rendering-level.png "Changing Preview Rendering Level progress bar")
    
    **预览模式（Preview Mode）** 按钮显示在 **设置（Settings）** 按钮旁边，该按钮显示所选预览模式的图标。单击它以禁用移动预览器。 
    
    ![Previewer Icon](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/180113f6-1964-48c3-8068-0ebd5be97ce6/ue5_1-04-previewer-icon.png "Previewer Icon")
3.  一旦选择了渲染关卡，视口中的材质将自动更新，以通过为该目标平台启用或禁用的材质质量，反映新的渲染方法。（有关如何进一步调整这些设置的更多详情，请参阅本页面的[平台材质质量设置](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E5%B9%B3%E5%8F%B0%E6%9D%90%E8%B4%A8%E8%B4%A8%E9%87%8F%E8%AE%BE%E7%BD%AE)部分。）
    
    ![Android Vulkan Preview](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2fccf22-7ac4-480a-9c85-d13413ff2882/ue5_1-05-vulkan-preview.png)
    
    ![Desktop Shader Model 5 (SM5) Preview](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/031b2d04-e93d-4952-a9c8-ea63113b4fd7/ue5_1-06-sm5-preview.png)
    
    Android Vulkan Preview
    
    Desktop Shader Model 5 (SM5) Preview
    

移动预览器旨在尽可能地匹配移动设备，但它也许不一定能预示你的项目在目标设备上的显示情况。你应该始终确保在目标设备上全面测试你的项目，并且仅使用移动预览器来查看你的工作是否朝着正确的方向发展。

### PIE中的移动预览器

你可以使用 **移动预览ES2（PIE）（Mobile Preview ES2 (PIE)）** 选项启动UE移动项目的独立版本，该版本将使用与在移动设备上运行的项目相同的渲染路径。这是一个很好的方法，可以预览你正在进行的更改，而不必经历整个烘焙和部署过程。要在使用移动预览的独立游戏中启动UE项目，你需要执行以下操作：

1.  从 **主工具栏（Main Toolbar）** 中，单击 **运行（Play）** 按钮旁边的下拉按钮，以公开 **修改游戏模式和游戏设置（Change Play Mode and Play Settings）** 的设置。
    
    ![Show Play Mode Options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0a4928ab-105a-4ec4-b674-aefbce9ed050/ue5_1-07-show-play-mode-options.png "Show Play Mode Options")
2.  选择 **移动预览ES2（PIE）（Mobile Preview ES2 (PIE)）** 选项，然后你的项目将在一个新窗口中启动，该窗口模拟你的项目在移动设备上的显示情况。
    
    ![Mobile Preview ES3.1](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a5c9e31-c599-439d-9878-2b523e8c8a87/ue5_1-08_actions-mob-preview.png "Mobile Preview ES3.1")

## 启用Vulkan移动预览

你可以使用 **Vulkan移动预览（PIE）（Vulkan Mobile Preview (PIE)）** 选项，以使用Vulkan渲染启动UE移动项目的独立版本。这是一个很好的方法，可以预览你正在进行的更改，而不必经历整个烘焙和部署过程。要在使用Vulkan移动预览的独立游戏中启动UE项目，你需要执行以下操作：

1.  要启用Vulkan预览器，首先需要打开 **编辑器偏好设置（Editor Preferences）**，方法是转到 **主工具栏（Main Toolbar）** 并单击 **编辑（Edit）**，然后选择 **编辑器偏好设置（Editor Preferences）**。
    
    ![Open the Editor Preferences](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f06267d-bd4f-44cd-951c-32824a567810/ue5_1-09-open-editor-preference.png "Open the Editor Preferences")
2.  在编辑器偏好设置（Editor Preferences）菜单中，找到 **一般（General）** 标题，然后单击 **实验性（Experimental）** 部分。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72360037-ea1e-4ee0-aff4-5dd518654fa9/ue5_1-10-editor-preference-experimental.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72360037-ea1e-4ee0-aff4-5dd518654fa9/ue5_1-10-editor-preference-experimental.png)
    
    单击显示全图。
    
3.  找到 **PIE** 部分，然后单击 **允许Vulkan移动预览（Allow Vulkan Mobile Preview）** 选项以启用它。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9566ec23-8b9b-4947-90f4-8816eeff5bb5/ue5_1-11-vmp-enable.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9566ec23-8b9b-4947-90f4-8816eeff5bb5/ue5_1-11-vmp-enable.png)
    
    单击显示全图。
    
4.  关闭编辑器偏好设置（Editor Preferences）菜单，然后从 **主工具栏（Main Toolbar）** 中，单击 **运行（Play）** 按钮旁边的下拉按钮，以公开 **修改游戏模式和游戏设置（Change Play Mode and Play Settings）** 的设置。
    
    ![Show Play Mode Options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b4987ea-dc6a-47ac-a13f-92431ab0dbb8/ue5_1-07-show-play-mode-options.png "Show Play Mode Options")
5.  选择 **Vulkan移动预览(PIE)（Vulkan Mobile Preview (PIE)）** 选项，然后你的项目将在一个新窗口中启动，该窗口模拟你的项目在移动设备上的显示情况。
    
    ![Select the Vulkan Mobile Preview](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/df3e3866-d276-42d5-b7f8-fab58afc54db/ue5_1-12_vmp-use.png "Select the Vulkan Mobile Preview")

## 平台材质质量设置

在 **项目设置（Project Settings）** 中的 **平台（Platforms）** 类别下，你可以选择不同的平台 **材质质量（Material Quality）** 部分来启用或禁用目标平台的特定功能。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/111e902b-c09f-4a89-a785-5755c219809f/ue5_1-13-platforms.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/111e902b-c09f-4a89-a785-5755c219809f/ue5_1-13-platforms.png)

点击查看大图。

要使这些更改生效，请确保单击 **更新预览着色器（Update Preview Shaders）** 按钮。

![Update Preview Shaders](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed8a3b95-4a78-4c31-9c2b-4fd069f28b90/ue5_1-14-update-preview-shaders-button.png "Update Preview Shaders")

## 预览渲染关卡选择

当你选择预览渲染关卡时，将有几个选项可供你选择。使用下表选择最适合你的目标设备的选项。

目标设备

说明

High-End Mobile / Metal

 

**默认高端移动设备（Default High-End Mobile）**

模拟默认的高端移动材质质量设置，而不使用项目设置（Project Settings）中指定的任何材质质量覆盖。

**Android GLES 3.1**

提供支持的Android OpenGL ES3.1质量设置的预览模拟。材质质量（Material Quality）设置可在 **项目设置（Project Settings）** > **Android材质质量 - ES31（Android Material Quality - ES31）** 部分中设置。

**Android Vulkan**

提供支持的Android Vulkan质量设置的预览模拟。材质质量（Material Quality）设置可在 **项目设置（Project Settings）** > **Android材质质量 - Vulkan（Android Material Quality - Vulkan）** 部分中设置。

**iOS Metal**

提供支持的iOS Metal质量设置的预览模拟。材质质量（Material Quality）设置可在 **项目设置（Project Settings）** > **iOS材质质量 - Metal（iOS Material Quality - Metal）** 部分中设置。

Mobile / HTML5

 

**默认移动设备/HTML5（Default Mobile/HTML5）**

模拟默认的移动材质质量设置，而不使用 **项目设置（Project Settings）** 中指定的任何材质质量覆盖。

**Android**

提供支持的Android OpenGL ES2质量设置的预览仿真。材质质量（Material Quality）设置可在 **项目设置（Project Settings）** > **Android材质质量 - ES2（Android Material Quality - ES2）** 部分中设置。

在通过项目设置（Project Settings）将一些可用的预览渲染关卡启用作为目标平台（即Android OpenGLES 3.1和Android Vulkan）之前，这些关卡是不可见的。然而，iOS Metal默认为开启，如果其目标平台被禁用，它也将作为一个可用的预览选项被移除。

## 移动设备预览选项

由于手机边框设计多种多样，确保用户界面的某些部分不会被手机边框遮挡有较大的难度。为了确保用户界面不会被设备遮挡，你可以使用 **设备启动（Device Launch）** 选项来覆盖不同的手机边框设计。要在UE项目中使用该选项，你需要做的就是执行以下操作。

1.  首先，打开你的 **编辑器偏好设置（Editor Preferences）**，方法是转到 **主工具栏（Main Toolbar）** 并单击 **编辑（Edit）**，然后选择 **编辑器** **偏好设置（Editor Preferences）**。
    
    ![Open the Editor Preferences](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/33430997-8a39-4238-95d0-4b9b20573030/ue5_1-09-open-editor-preference.png "Open the Editor Preferences")
2.  在 **编辑器偏好设置（Editor Preferences）** 菜单中，找到 **一般（General）** 标题，然后单击 **实验性（Experimental）** 部分。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce015da4-474a-490c-9ebc-ef8ea4251359/ue5_1-10-editor-preference-experimental.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce015da4-474a-490c-9ebc-ef8ea4251359/ue5_1-10-editor-preference-experimental.png)
    
    点击查看大图。
    
3.  找到 **PIE** 部分，然后单击 **使用预览设备启动选项启用移动PIE（Enable mobile PIE with preview device launch options）** 以启用边框覆层。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd2d8330-5635-432c-a6e9-5878fdf6bd18/ue5_1-15-enable-device-preview.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd2d8330-5635-432c-a6e9-5878fdf6bd18/ue5_1-15-enable-device-preview.png)
    
    点击查看大图。
    
4.  关闭编辑器偏好设置（Editor Preferences）菜单，然后从 **主工具栏（Main Toolbar）** 中，单击 **运行（Play）** 按钮旁边的下拉按钮，以公开 **修改游戏模式和游戏设置（Change Play Mode and Play Settings）** 的设置。
    
    ![Show Play Mode Options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/414ea32b-7ac6-4566-b253-cbc2217f1486/ue5_1-07-show-play-mode-options.png "Show Play Mode Options")
5.  从显示的菜单中，转到 **移动预览(PIE)（Mobile Preview (PIE)）** > **Android**，然后从列表中选择你要进行测试的设备。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3386227f-e5d5-4a58-a4fb-b18575942849/ue5_1-16-select-device-previewer.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3386227f-e5d5-4a58-a4fb-b18575942849/ue5_1-16-select-device-previewer.png)
    
    点击查看大图。
    
6.  现在，单击 **启动（Launch）** 按钮启用你的项目。当你的项目加载时，它将使用设备预览，如下图中所示。
    
    ![Device Playing Example](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d9810c2-6bfd-472e-a415-2cfcf5fe6500/ue5_1-17-phone-bezel.png "Device Playing Example")

## 在预览器中复制实体设备的配置

在虚幻引擎（UE5.5）及更新版本中，你可以保存一个用于特定设备的JSon文件，其中包含设备描述文件和控制台变量（CVar）。然后将其加载到UE中，在移动预览器中使用，为所有项目提供与设备上1:1还原的图像设置。本文将概述此流程。

### 先决条件

要按此指南操作，你需要将项目设置为面向Android开发，且需要将一台启用了开发模式的Android设备连接到你的计算器。关于Android项目的基础设置指南，请参阅[Android快速入门指南](/documentation/zh-cn/unreal-engine/setting-up-unreal-engine-projects-for-android-development)。关于准备设备并将其连接到UE的指南，请参阅[设置设备以供开发](/documentation/zh-cn/unreal-engine/setting-up-your-android-device-for-developing-applications-in-unreal-engine)。

### 将设备数据保存到JSon

要将目标设备的数据保存到JSon文件，请按以下步骤操作：

1.  点击虚幻编辑器右上角的 **设置（Settings）** 按钮，找到 **预览平台（Preview Platform）** 并打开所选平台的子菜单。本示例中使用的Android。
    
2.  点击 **生成平台JSon文件（Generate Platform JSon）**，选择要生成JSon文件的测试设备。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3de7700a-c5d0-479f-a03b-746f9382d4a7/platform-json.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3de7700a-c5d0-479f-a03b-746f9382d4a7/platform-json.png)
    
    点击查看大图
    
3.  在弹出的对话框中，选择JSon文件的保存位置。
    

## 加载JSon设备数据

要在虚幻编辑器的移动预览器窗口中加载设备数据，请按以下步骤操作：

1.  打开 **设置（Settings）** > **预览平台（Preview Platform）**，然后打开所选平台的子菜单。本示例中使用的Android。
    
2.  选择 **预览OpenGL（Preview OpenGL）** 或 **预览（Preview Vulkan）**，然后点击 **通过JSon预览（Preview via JSon）**。
    
    请务必在 **预览平台（Preview Platform）** > **Android** 菜单中为设备选择正确的图形API，否则你将无法看到准确的预览。
    
3.  弹出的对话框会提示你打开JSon文件。找到保存的JSon文件并将其打开。
    

虚幻编辑器会从你的目标设备的描述文件中加载所有适用的CVar。在使用移动预览器时，它会1:1还原你在设备屏幕上看到的一切。

### 扩展阅读

关于Vulkan与Android设备兼容性的问题，请参阅[Vulkan移动渲染器](/documentation/zh-cn/unreal-engine/using-the-android-vulkan-mobile-renderer-in-unreal-engine)文档。

关于设备描述文件的详情，请参阅以下文档：

-   [设备描述](/documentation/zh-cn/unreal-engine/setting-up-device-profiles-in-unreal-engine)
    
-   [自定义Android设备描述](/documentation/zh-cn/unreal-engine/customizing-device-profiles-and-scalability-in-unreal-engine-projects-for-android)
    

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [使用移动预览器](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E4%BD%BF%E7%94%A8%E7%A7%BB%E5%8A%A8%E9%A2%84%E8%A7%88%E5%99%A8)
-   [PIE中的移动预览器](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#pie%E4%B8%AD%E7%9A%84%E7%A7%BB%E5%8A%A8%E9%A2%84%E8%A7%88%E5%99%A8)
-   [启用Vulkan移动预览](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E5%90%AF%E7%94%A8vulkan%E7%A7%BB%E5%8A%A8%E9%A2%84%E8%A7%88)
-   [平台材质质量设置](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E5%B9%B3%E5%8F%B0%E6%9D%90%E8%B4%A8%E8%B4%A8%E9%87%8F%E8%AE%BE%E7%BD%AE)
-   [预览渲染关卡选择](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E9%A2%84%E8%A7%88%E6%B8%B2%E6%9F%93%E5%85%B3%E5%8D%A1%E9%80%89%E6%8B%A9)
-   [移动设备预览选项](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E7%A7%BB%E5%8A%A8%E8%AE%BE%E5%A4%87%E9%A2%84%E8%A7%88%E9%80%89%E9%A1%B9)
-   [在预览器中复制实体设备的配置](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E5%9C%A8%E9%A2%84%E8%A7%88%E5%99%A8%E4%B8%AD%E5%A4%8D%E5%88%B6%E5%AE%9E%E4%BD%93%E8%AE%BE%E5%A4%87%E7%9A%84%E9%85%8D%E7%BD%AE)
-   [先决条件](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [将设备数据保存到JSon](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E5%B0%86%E8%AE%BE%E5%A4%87%E6%95%B0%E6%8D%AE%E4%BF%9D%E5%AD%98%E5%88%B0json)
-   [加载JSon设备数据](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E5%8A%A0%E8%BD%BDjson%E8%AE%BE%E5%A4%87%E6%95%B0%E6%8D%AE)
-   [扩展阅读](/documentation/zh-cn/unreal-engine/using-the-mobile-previewer-in-unreal-engine#%E6%89%A9%E5%B1%95%E9%98%85%E8%AF%BB)

相关文档

[

关卡编辑器

![关卡编辑器](https://dev.epicgames.com/community/api/documentation/image/c89e0205-1fca-4667-b907-e793bd53d2b7?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/level-editor-in-unreal-engine)

[

设计视觉、渲染和图形效果

![设计视觉、渲染和图形效果](https://dev.epicgames.com/community/api/documentation/image/c3f84596-e583-408d-89c9-4a797dfa3e0a?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/designing-visuals-rendering-and-graphics-with-unreal-engine)