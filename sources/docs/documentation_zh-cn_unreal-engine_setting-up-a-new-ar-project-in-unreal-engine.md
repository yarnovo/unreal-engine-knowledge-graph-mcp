# 在虚幻引擎中设置新的AR项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-a-new-ar-project-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:43:30.356Z

---

目录

![设置新的AR项目](https://dev.epicgames.com/community/api/documentation/image/4afff5b8-2280-4f2d-9814-ba6994ad68da?resizing_type=fill&width=1920&height=335)

本指南介绍如何在虚幻引擎中创建新的空白项目，并添加必要的蓝图和配置，将其转变成AR体验。

如果要使用已设置的AR项目进行启动，请参阅下面的AR模板：

-   [适用于iOS和Android的手持AR模板](/documentation/zh-cn/unreal-engine/handheld-ar-template-quickstart-in-unreal-engine)

## 设置空白项目

按照以下步骤创建新的虚幻引擎项目和关卡，并启用最少的渲染功能。空白项目将会打开，其中带有默认关卡，包含天空球体和大气雾对象。这些对象将持久地覆盖AR中的所有内容，因此在创建AR体验时启动空白关卡将很有用，可以控制将显示哪些内容。

1.  从[Epic Games启动程序](https://www.epicgames.com/store/en-US/download)启动 **虚幻引擎（Unreal Engine）** 。
    
2.  在 **虚幻项目浏览器（Unreal Project Browser）** 窗口中，选择 **游戏（Games）**，然后点击 **下一步（Next）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbd37da9-8269-4535-8214-6aeebf7ea2d0/01-select-games-ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cbd37da9-8269-4535-8214-6aeebf7ea2d0/01-select-games-ue5.png)
    
    点击查看大图。
    
3.  选择 **空白（Blank）** 模板，然后点击 **下一步（Next）**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/132e9b1b-7b43-41fe-a49f-bf827d2f38f1/02-select-blank_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/132e9b1b-7b43-41fe-a49f-bf827d2f38f1/02-select-blank_ue5.png)
    
    点击查看大图。
    
4.  对于 **项目设置**，进行如下选择：
    
    -   蓝图
        
    -   可扩展3D或2D
        
    -   禁用光线追踪
        
    -   手机/平板电脑
        
    -   无初学者内容包
        
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93fb22ac-447e-4d7c-8b24-d0986ff6afa0/03-project-defaults_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93fb22ac-447e-4d7c-8b24-d0986ff6afa0/03-project-defaults_ue5.png)
    
    点击查看大图。
    
5.  在编辑器中选择 **文件（File） > 新关卡…（New Level…）**，然后选择 **空白关卡（Empty Level）**。命名关卡之后保存。在此示例中，将关卡命名为 **Main**。
    
    ![Adding an empty level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad4aa21f-931b-4389-a920-9869936e1647/04-select-empty-level_ue5.png)
6.  在主导航中，选择 **编辑（Edit）> 项目设置（Project Settings）**。
    
7.  在项目设置（Project Settings）窗口中，在 **项目（Project）** 部分下选择 **地图和模式（Maps & Modes）**。将 **编辑器启动地图（Editor Startup Map）** 和 **游戏默认地图（Game Default Map）** 设置为新关卡 **Main**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6640d892-416d-41f0-bbc6-dd95d8cbaa98/05-set-new-level-main_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6640d892-416d-41f0-bbc6-dd95d8cbaa98/05-set-new-level-main_ue5.png)
    
    点击查看大图。
    

## 添加Pawn和游戏模式

在虚幻引擎中，[pawn](/documentation/zh-cn/unreal-engine/pawn-in-unreal-engine)是用户的物理呈现，将定义用户如何与世界交互。[游戏模式](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine) 对象定义体验规则，例如要使用哪个Pawn对象。为了构建新的AR项目，你需要设置Pawn以便在运行应用时与环境进行交互。

按照下面的步骤进行操作，为你的AR项目创建Pawn和游戏模式。

1.  在 **内容浏览器（Content Browser）** 中单击右键，从列表中选择蓝图类（Blueprint Class）。在 **选择父类（Pick Parent Class）** 窗口中，选择 **Pawn**。将资产命名为 **ARPawn**。
    
    ![Create Blueprint class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afce32d6-d91b-4ca1-8d10-8d3c44bc81c7/06-create-blueprint-class_ue5.png) ![Pick Parent class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4ccf2f08-3026-4e54-87d9-dad515a5e7f2/07-actor-parent-class_ue5.png)
2.  在 **内容浏览器（Content Browser）** 中，双击 **ARPawn** 对象，在 **蓝图编辑器（Blueprint Editor）** 中打开。在蓝图编辑器中，选择 **添加组件（Add Component）** 并搜索 **摄像机（Camera）**。
    
    ![Adding camera component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e684447-dbe5-4c30-b32c-4f7ffc05f234/08-add-new-component_ue5.png)
3.  **摄像机（Camera）** 组件的父项必须是 **DefaultSceneRoot**。
    
    ![Camera default scene root](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/195217c2-d1e5-45a0-96b4-1c34c74bd8cb/09-camera-component_ue5.png)
4.  在 **内容浏览器（Content Browser）** 中单击右键，从列表中选择 **蓝图类（Blueprint Class）**。在 **选择父类（Pick Parent Class）** 窗口中，选择 **游戏模式基础（Game Mode Base）**。将资产命名为 **ARGameMode**。
    
    ![Add game mode class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6794cf14-9f45-4ff4-b087-a0f5fc42f8a7/10-game-mode-base-class_ue5.png)
5.  双击 **ARGameMode** 以编辑设置。将 **默认Pawn类（Default Pawn Class）** 设置为 **ARPawn**。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40a3cefb-31a4-4dd6-977d-572a904ef02e/11-change-default-pawn-class_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40a3cefb-31a4-4dd6-977d-572a904ef02e/11-change-default-pawn-class_ue5.png)
    
    点击查看大图。
    
6.  在主导航中，选择 **编辑（Edit） > 项目设置（Project Settings）** 以打开 **项目设置（Project Settings）** 窗口。
    
7.  在左侧 **项目（Project）** 部分下的 **项目设置（Project Settings）** 窗口中，选择 **地图和模式（Maps & Modes）**。
    
    1.  将 **默认游戏模式（Default GameMode）** 设置为 **ARGameMode**。
        
    2.  将 **默认Pawn类（Default Pawn Class）** 设置为 **ARPawn**。
        
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08268fd2-7714-462d-834b-516fdf5236f3/12-argamemode-arpawn_ue5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/08268fd2-7714-462d-834b-516fdf5236f3/12-argamemode-arpawn_ue5.png)
    
    点击查看大图。
    

### 创建AR会话

函数 **Start AR Session**需要ARSessionConfig对象，该对象定义项目的所有AR特定功能。如需详细了解每个设置分别是什么，请参见[UARSessionConfig](/documentation/en-us/unreal-engine/API/Runtime/AugmentedReality/UARSessionConfig)。

按照下面的步骤将AR会话逻辑添加到你的项目。

1.  在 **内容浏览器（Content Browser）** 中右键单击。选择 **杂项（Miscellaneous） > 数据资产（Data Asset）**，打开 **选择数据资产类（Pick Data Asset Class）** 窗口。
    
    ![Adding a data asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f13aa14e-76ac-47fa-bbcf-52f432c9a4ab/13-create-data-asset_ue5.png)
2.  在 **选择数据资产类（Pick Data Asset Class）** 窗口中，选择 **ARSessionConfig**。将数据资产命名为 **ARSessionConfig**。打开资产，选择 **保存（Save）** 以确认默认AR选项。
    
    ![Opening AR session config](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/12c781ba-69ca-4aa7-a652-0d3f1a39c6c6/14-ar-session-config_ue5.png)
3.  双击 **ARPawn** 资产，在**蓝图编辑器中（Blueprint Editor）** 打开。添加函数 **Set Tracking Origin**。将 **原点数值（Origin value）** 设置为 **底层关卡（Floor Level）**。
    
    ![Blueprint set tracking origing to floor level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9a3f53d-2c20-43c4-94ec-768b2cc8ff7b/15-origin-floor-level_ue5.png)
4.  添加函数 **Start AR Session**。将 **会话配置（Session Config）** 资产设置为 **ARSessionConfig**。
    
    ![Blueprint adding start AR session](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2cb4a90d-fe7b-4222-82a1-6ede3a02f60c/16-session-config-ar-session_ue5.png)
5.  添加函数 **Stop AR Session**。
    
    ![Blueprint adding stop AR session](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad039acf-96cb-4700-a40a-96da79655ece/17-stop-ar-session_ue5.png)

在你的设备上启动项目时，现在可以在你的AR环境中导航。请参见你的AR平台文档，了解在你的设备上启动虚幻项目的详细步骤。

## 第4步 - 自行尝试

在本指南中，你学习了如何创建新的AR项目，以及如何添加必要的蓝图以开始构建AR应用。

-   [template](https://dev.epicgames.com/community/search?query=template)
-   [xr](https://dev.epicgames.com/community/search?query=xr)
-   [ar](https://dev.epicgames.com/community/search?query=ar)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [设置空白项目](/documentation/zh-cn/unreal-engine/setting-up-a-new-ar-project-in-unreal-engine#%E8%AE%BE%E7%BD%AE%E7%A9%BA%E7%99%BD%E9%A1%B9%E7%9B%AE)
-   [添加Pawn和游戏模式](/documentation/zh-cn/unreal-engine/setting-up-a-new-ar-project-in-unreal-engine#%E6%B7%BB%E5%8A%A0pawn%E5%92%8C%E6%B8%B8%E6%88%8F%E6%A8%A1%E5%BC%8F)
-   [创建AR会话](/documentation/zh-cn/unreal-engine/setting-up-a-new-ar-project-in-unreal-engine#%E5%88%9B%E5%BB%BAar%E4%BC%9A%E8%AF%9D)
-   [第4步 - 自行尝试](/documentation/zh-cn/unreal-engine/setting-up-a-new-ar-project-in-unreal-engine#%E7%AC%AC4%E6%AD%A5-%E8%87%AA%E8%A1%8C%E5%B0%9D%E8%AF%95)