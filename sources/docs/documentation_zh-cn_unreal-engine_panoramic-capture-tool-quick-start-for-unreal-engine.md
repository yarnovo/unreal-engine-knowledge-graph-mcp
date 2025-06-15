# 虚幻引擎全景采集工具快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/panoramic-capture-tool-quick-start-for-unreal-engine
> 
> 生成时间: 2025-06-14T20:30:46.785Z

---

目录

![全景采集（Panoramic Capture）工具快速入门](https://dev.epicgames.com/community/api/documentation/image/f7686d0d-6974-4c91-845d-72cac16056ec?resizing_type=fill&width=1920&height=335)

学习使用此**Deprecated**功能，但在发布产品中需要谨慎使用。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f941f6a-fb40-45b5-8ea9-81439dfc2425/spe_header_00.png)

Epic Games不再支持或维护全景采集插件。它只在你希望自行创建解决方案时作为参考存在。该插件可能无法正常工作。

在以下示例中，你将了解如何设置、创建和查看立体全景截屏——以上操作均需在UE4中进行。在完成此项目后，你将创建一张全景图片。

## 1 - 项目设置

在这部分中，我们将新建一个UE4项目并对其进行设置。

### 步骤

1.  用 **游戏（Games）> 第一人称（First Person）** 模板创建一个新项目，并使用以下设置：
    
    -   **蓝图（Blueprint）**
    -   **目标平台台式机（Target Platform Desktop）**
    -   **质量预设最大（Quality Preset Maximum）**
    -   启用 **初学者内容（Starter Content）**
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4feb5d48-64f8-4439-82cd-d9b6e9d0c390/01-project-settings_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4feb5d48-64f8-4439-82cd-d9b6e9d0c390/01-project-settings_ue5.png)
    
    点击查看大图
    
2.  按 **新建（Create）** 按钮加载新项目。
    
    适用于所有项目。以上列出的值只是提供了一个创建项目的起点。
    
3.  项目打开后，从主菜单中选择 **编辑（Edit）** > **插件（Plugins）**。
    
    ![选择插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68974203-0e30-4f77-a56c-cc2da1a57e04/02-edit-plugins_ue5.png "Select Pluguns")
4.  在 **插件（Plugins）** 菜单下的 **影片采集（Movie Capture）** 中启用 **全景采集（Panoramic Capture）** 插件。弹出提示后重启编辑器。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5126aed-b4c1-42ec-b2be-505d9beae569/03-enable-panoramic-plugin_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5126aed-b4c1-42ec-b2be-505d9beae569/03-enable-panoramic-plugin_ue5.png)
    
    点击查看大图
    

## 2 - 截取立体图像

在这步中，你将使用 **全景采集（Panoramic Capture）** 插件和 **BP\_Capture** 蓝图来采集关卡的3D立体图像。

### 步骤

1.  打开 **内容侧滑菜单**，选择 **全景采集内容（PanoramicCapture Content） > 资源（Assets）**。 ![资产文件夹](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c62ddaaa-9f1d-4f72-98f5-2ab9273dbc88/04-bp-capture_ue5.png "Assets Folder")

**内容![Assets Folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8063127-5db8-4090-8218-4c5d62c162fd/04-bp-capture_ue5.png "Assets Folder")** 不会默认显示插件内容。要修改此设置，请选择 **设置（Settings)** 并启用 **显示引擎内容（Show Engine Content）** 和 **显示插件内容（Show Plugin Content）**。

1.  将 **BP\_Capture** 蓝图拖到场景上。
    
2.  点击 **运行（Play）** 开始运行 **BP\_Capture** 蓝图并开始采集进程。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e3405e6-03e7-4246-9ae9-a1113c8cdb49/05-play-button_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e3405e6-03e7-4246-9ae9-a1113c8cdb49/05-play-button_ue5.png)
    
    点击查看大图
    
3.  在采集过程中，编辑器可能失去响应数秒甚至数分钟。这是由于 **全景采集（Panoramic Capture）** 插件存在渲染需求。编辑器重新获得响应后，即可在以下路径中找到截图。
    
    -   **C:\\PanoramicCaptureFrames\[Date & Time\]\\FinalColor\\Frame\_00000\_FinalColor.png**
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81c19781-3617-4904-b783-cf3136327437/06-image-folder_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/81c19781-3617-4904-b783-cf3136327437/06-image-folder_ue5.png)
    
    点击查看大图
    
4.  此处是由 **BP\_Capture** 蓝图生成的立体图像。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8e24c61-2664-42c7-ac0b-17a7e2685742/07-panoramic-frame_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d8e24c61-2664-42c7-ac0b-17a7e2685742/07-panoramic-frame_ue5.png)
    
    点击查看大图
    
    **BP\_Capture** 蓝图的默认输出为8位图像（.png），可在蓝图中选择设置32位图像（.exr）。
    

-   [cinematics](https://dev.epicgames.com/community/search?query=cinematics)
-   [plugins](https://dev.epicgames.com/community/search?query=plugins)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [virtual reality](https://dev.epicgames.com/community/search?query=virtual%20reality)
-   [vr](https://dev.epicgames.com/community/search?query=vr)
-   [deprecated](https://dev.epicgames.com/community/search?query=deprecated)
-   [gearvr](https://dev.epicgames.com/community/search?query=gearvr)
-   [steamvr](https://dev.epicgames.com/community/search?query=steamvr)
-   [google vr](https://dev.epicgames.com/community/search?query=google%20vr)
-   [oculus rift](https://dev.epicgames.com/community/search?query=oculus%20rift)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1 - 项目设置](/documentation/zh-cn/unreal-engine/panoramic-capture-tool-quick-start-for-unreal-engine#1-%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [步骤](/documentation/zh-cn/unreal-engine/panoramic-capture-tool-quick-start-for-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [2 - 截取立体图像](/documentation/zh-cn/unreal-engine/panoramic-capture-tool-quick-start-for-unreal-engine#2-%E6%88%AA%E5%8F%96%E7%AB%8B%E4%BD%93%E5%9B%BE%E5%83%8F)
-   [步骤](/documentation/zh-cn/unreal-engine/panoramic-capture-tool-quick-start-for-unreal-engine#%E6%AD%A5%E9%AA%A4-2)