# 将LiveLink用于虚幻引擎中的USD导入器 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:07:09.546Z

---

目录

![将Live Link用于USD](https://dev.epicgames.com/community/api/documentation/image/b6fbc8c7-69a5-4356-98fd-43cdabaa2596?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

[Live Link](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)插件可在 **虚幻编辑器（Unreal Editor）** 和外部 *数字内容创建* （DCC）工具（例如Maya或Houdini）之间同步动画资产，以便资产在引擎中出现时快速预览。**虚幻引擎（Unreal Engine）** 可以使用 **通用场景描述（USD）** 文件作为Live Link连接的一部分，并在项目过程中进行维护，使此工作流程更加便捷。本教程将详细说明如何使用USD文件在虚幻引擎中设置Live Link连接，并概述在使用Live Link时USD格式的优势。

## 概述

当你使用 **USD舞台（USD Stage）** 设置Live Link连接时，它会随描述该连接的属性将自定义Live Link模式添加到USD图元。只要此信息保持在USD文件中，并且你的DCC和虚幻引擎都有Live Link连接，资产的连接就可以重新建立。如果任一应用程序重启，或文件关闭并在DCC中重新打开，Live Link连接将需要重新建立。

## 学习本指南

本指南中的示例使用Autodesk Maya和[Unreal Live Link V2](https://apps.autodesk.com/MAYA/zh/Detail/Index?id=3726213941804942083&appLang=en&os=Win64)插件，但集成了Live Link的所有DCC工具集都应该能够建立与虚幻引擎的连接。查看你的DCC的Live Link集成的说明，了解与此处演示的工作流程有何不同。

如果你要使用Unreal Live Link V2插件，安装程序还会为虚幻引擎设置 **Maya Live Link** 插件。如果你要使用Maya，请使用此项，而不是标准Live Link插件。

## 1\. 必要设置

要学习本指南，你需要满足以下先决条件：

-   同时为虚幻引擎和你的DCC启用Live Link插件。
    
    -   如果你要使用Autodesk Maya，请改用Maya Live Link插件。
-   在虚幻引擎中启用 **USD导入器（USD Importer）** 插件。
    

要在虚幻引擎中设置插件，请点击 **编辑（Edit）** > **插件（Plugins）** 打开 **插件（Plugins）** 菜单，然后找到插件并将其启用。请参阅你的DCC的Live Link集成的说明，或其关于使用插件的指南，了解如何将其激活。

本指南还使用了通过 **第三人称模板（Third-Person Template）** 创建的新项目。这包括虚幻引擎人体模型及其动画。这些在 **内容浏览器（Content Browser）** 中的 `Content/Mannequins` 文件夹中可用。本指南在举例时会用到这些资产，但是你在遵照指示时不一定要使用这些资产，你可以采用任意骨骼网格体进行操作。

## 2\. 建立Live Link连接

1.  打开你的DCC和虚幻编辑器。
    
2.  设置你的DCC的Live Link集成。
    
    -   对于Maya，下载并安装Unreal Live Link插件。你可以在[此处](https://apps.autodesk.com/MAYA/zh/Detail/Index?id=3726213941804942083)下载安装程序，安装之后，你可以点击 **文件（File）** > **Unreal Live Link** 将其打开。
3.  在虚幻编辑器中，点击 **窗口（Window）** > **虚拟制片（Virtual Production）** > **Live Link** ，打开 **Live Link** 窗口。
    
    ![打开Live Link窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23d61193-fc69-4581-8760-b18b33cdd9f6/livelinkwindow.png)
4.  点击 **Live Link** 窗口中的 **\+ 源（Source）** 按钮。高亮显示 **消息总线源（Message Bus Source）** 并选择你的DCC的 **Live Link连接（Live Link connection）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e58772f-6531-46e7-9e0e-04bb8a813bef/bussource.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1e58772f-6531-46e7-9e0e-04bb8a813bef/bussource.png)
    
    点击查看大图。
    
    你的DCC和虚幻引擎将使用Live Link连接和同步。但是，由于没有同步资产，你还不会看到更改。
    

## 3\. 导出USD文件并用于同步资产

现在你已打开Live Link连接，请导出USD文件并用于同步资产。

1.  在内容浏览器中找到 `MM_Run_Fwd` 动画。你可以在 Content/Characters/Mannequins/Animations/Manny\` 中找到它。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7c9ca97-8bef-4951-998e-89b3bb8312c3/run_fwd_anim.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c7c9ca97-8bef-4951-998e-89b3bb8312c3/run_fwd_anim.png)
    
    点击查看大图。
    
2.  右键点击 `MM_Run_Fwd` 。点击 **资产操作（Asset Actions）** > **导出（Export）** 。
    
    ![从](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8c91aaa4-ccfb-46a8-9d81-d85ad7340531/exportasset.png)
3.  使用 `.usda` 文件格式导出资产。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f6296d8-98df-4b30-9318-249f028ab318/exportusda.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8f6296d8-98df-4b30-9318-249f028ab318/exportusda.png)
    
    点击查看大图。
    
    你需要将文件导出为 `.usda` 文件才能使用USD舞台，你还需要将其导出为 `.fbx` 文件以用于导入Maya中。
    
4.  在 **USD导出选项（USD Export Options）** 对话框中，确保选中了 **导出预览网格体（Export Preview Mesh）** ，然后点击 **导出（Export）** 。
    
    ![在USD选项对话框中启用导出预览网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2e7033b-d61a-4e27-bddc-07ee6b62b338/usdoptions.png)
5.  打开你的DCC并导入 `.usda` 文件。
    
    1.  在Maya中，点击 **文件（File）> 导入（Import）** ，然后选择 **USD导入（USD Import）** ，并选择 `.usda` 文件。将其沿X轴旋转-90度，使其面朝上。
6.  选择 **根骨骼** ，然后将选择内容添加到Live Link。
    
    1.  在Maya中，点击 **文件（File）** > **Unreal Live Link** 打开 **Unreal Live Link** 窗口。
        
        ![在Maya中打开Unreal Live Link菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd9d5f3e-e5e1-49f6-a303-cb055fe080f9/unreallivelinkwindow.png)
    2.  在层级中选择你的网格体的 **根骨骼** ，然后点击Live Link窗口中的 **添加选择内容（Add Selection）** ，将其添加到你的Live Link主题列表中。
        
        ![在Maya中选择根骨骼](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0226ac3f-ade7-4f57-b91e-34c45f64cd95/selectrootbone.png)
    3.  点击选择内容的 **类型（Type）** 下拉菜单，然后选择 **完整层级（Full Hierarchy）** 。
        
        ![选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/594ea1c2-2a8a-49ba-a764-e036e02f172f/fullhierarchy.png)
    
    在后续步骤中，当你在虚幻编辑器中选择你的主题名称时，你将需要你的对象名称。
    
7.  点击 **窗口（Window）** > **虚拟制片（Virtual Production）** > **USD舞台（USD Stage）** ，打开 **USD舞台（USD Stage）** 窗口。
    
    ![打开USD舞台](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e5b8e87e-d629-4487-b55f-44e990a8c27a/usdstagewindow.png)
8.  在 **USD舞台（USD Stage）** 中，点击 **文件（File）** > **打开（Open）** ，然后选择 `MM_Run_Fwd.usda` 文件。
    
    ![在USD舞台中打开你的动画](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5cda9834-5581-4d25-b6bc-0395bb7d16be/openusda.png)
9.  在 **USD舞台（USD Stage）** 中，右键点击你的模型的 **SkelRoot** ，然后点击 **设置Live Link（Set Up Live Link）** 。
    
    ![为你的动画设置Live Link](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5876c41f-ed58-4f62-bbab-dee4c275ec8a/setuplivelink.png)
    
    **Live Link集成（Live Link integrations）** 面板将显示，并将 **DefaultLiveLinkAnimBP** 显示为你的动画蓝图。
    
    ![带有默认设置的Live Link集成面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b39f6e0-7e6d-45ee-bba2-0b7b01975bae/integrationspanel.png)
10.  点击 **Live Link主题名称（Live Link Subject Name）** 下拉菜单，并选择对应于你在DCC中选择的对象名称的值。这些值需要匹配，Live Link连接才能正常运行。
    

## 结果

如果你在DCC中推移你的资产的动画，动画将在虚幻引擎中同步。

## 配置

USD舞台中提供了以下选项，用于配置你的Live Link设置。

### 启用和禁用Live Link连接

你可以在USD舞台中使用 **启用Live Link连接（Enable Live Link Connection）** 设置启用和禁用USD舞台中的Live Link连接。

![启用或禁用Live Link连接](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/992c1659-0410-43d5-b17b-fdf64e94a678/enablelivelink.png)

这样你可以在查看使用Live Link提供的动画与查看USD舞台上存在的原始动画之间快速切换。

### 自定义动画蓝图

默认情况下，当你使用USD舞台设置Live Link时，骨骼网格体会使用DefaultLiveLinkAnimBP资产。此动画蓝图使用 **Live Link Pose** 节点监听你的DCC提供的姿势。

![动画图表编辑器中的Live Link Pose节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/644610de-88b0-4ab7-bdd5-4247b167affb/livelinkposenode.png)

你可以通过更改集成面板中的 **动画蓝图资产（Anim Blueprint Asset）** 字段，改用自定义动画蓝图。在你的自定义动画蓝图中，使用Live Link Pose节点提供与Live Link的兼容性。

### 选择Live Link主题

**Live Link主题名称（Live Link Subject Name）** 将选择要与此特定图元同步的特定Live Link主题。这必须与添加到你的DCC的Live Link管理器的某个对象的 **对象名称（Object Name）** 值匹配。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animations](https://dev.epicgames.com/community/search?query=animations)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [usd](https://dev.epicgames.com/community/search?query=usd)
-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [学习本指南](/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine#%E5%AD%A6%E4%B9%A0%E6%9C%AC%E6%8C%87%E5%8D%97)
-   [1\. 必要设置](/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine#1%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [2\. 建立Live Link连接](/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine#2%E5%BB%BA%E7%AB%8Blivelink%E8%BF%9E%E6%8E%A5)
-   [3\. 导出USD文件并用于同步资产](/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine#3%E5%AF%BC%E5%87%BAusd%E6%96%87%E4%BB%B6%E5%B9%B6%E7%94%A8%E4%BA%8E%E5%90%8C%E6%AD%A5%E8%B5%84%E4%BA%A7)
-   [结果](/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine#%E7%BB%93%E6%9E%9C)
-   [配置](/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine#%E9%85%8D%E7%BD%AE)
-   [启用和禁用Live Link连接](/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine#%E5%90%AF%E7%94%A8%E5%92%8C%E7%A6%81%E7%94%A8livelink%E8%BF%9E%E6%8E%A5)
-   [自定义动画蓝图](/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%A8%E7%94%BB%E8%93%9D%E5%9B%BE)
-   [选择Live Link主题](/documentation/zh-cn/unreal-engine/using-livelink-with-the-usd-importer-in-unreal-engine#%E9%80%89%E6%8B%A9livelink%E4%B8%BB%E9%A2%98)

相关文档

[

虚幻引擎中的通用场景描述

![虚幻引擎中的通用场景描述](https://dev.epicgames.com/community/api/documentation/image/4c1b6840-3bd6-4c40-8621-356d49074d1c?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/universal-scene-description-in-unreal-engine)