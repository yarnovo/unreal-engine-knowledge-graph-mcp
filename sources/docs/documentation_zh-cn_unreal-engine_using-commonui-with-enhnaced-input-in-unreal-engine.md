# 在虚幻引擎中将CommonUI与增强输入结合使用 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-commonui-with-enhnaced-input-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:20:19.566Z

---

目录

![将CommonUI与增强输入结合使用](https://dev.epicgames.com/community/api/documentation/image/7c0e528d-2dcf-4158-b908-9f87292a00f2?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [Common UI概览](/documentation/zh-cn/unreal-engine/overview-of-advanced-multiplatform-user-interfaces-with-common-ui-for-unreal-engine)

**CommonUI插件** 为[增强输入](/documentation/zh-cn/unreal-engine/enhanced-input-in-unreal-engine)操作提供的支持有限。

从UE 5.2开始，对增强输入（Enhanced Input）支持的测试不如CommonUI中其他功能那样全面。我们不建议你尝试在此时发布具有此功能的作品。

## 1\. 必要设置

本页面假定你已对CommonUI执行了以下设置步骤：

-   将CommonUI和增强输入（Enhanced Input）插件均启用。
-   将视口类设置为CommonGameViewportClient。
-   设置你的接受（Accept）/返回（Back）操作的InputData。

## 2\. 在CommonUI中启用增强输入（Enhanced Input）

启用CommonUI和增强输入（Enhanced Input）插件后，打开 **项目设置（Project Settings）** 。 找到 **游戏（Game）** > **常见输入设置（Common Input Settings）** ，将 **启用增强输入支持（Enable Enhanced Input Support）** 设置为 **true** 。这样就可以支持这两个插件进行通信。

![在项目设置中启用增强输入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40f5b35a-e8cb-423f-9dce-d70dd3ba026b/enableenhancedinput.png)

## 3\. 为CommonUI设置增强输入操作

增强输入操作可以在任意位置绑定输入事件，包括 *进行中* 和 *已触发* 事件等专门变体。但全局绑定大多数UI操作绑定（诸如 *FaceButtonTop* 、 *Accept* 或 *Back* ）是不可取的做法，会引发混乱，因为如果这样做，可能会因用户在意外的时间输入而导致意想不到的事件。CommonUI通过 *泛型操作* 解决这个问题。 泛型操作绑定到UI元素，但不会在CommonUI中触发增强输入事件。

如需在CommonUI内设置增强输入操作，请执行以下步骤：

1.  在内容浏览器中创建泛型 **输入操作（Input Action）** 。将其命名为 `IA_UI_GenericAccept` 。
    
    ![选择输入操作资产类型](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f4be18a-c2f0-4ead-86a3-3775a3d7281b/selectinputaction.png)
2.  为你的输入操作（Input Action）添加 **PlayerMappableKeySettings** 。
    
3.  在 **PlayerMappableKeySettings** 的 **设置（Settings）** 中，将 **Metadata（元数据）** 字段设置为实现IComonMappingContextMetadataInterface的对象。
    
    ![玩家可映射键配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e863d025-429d-4733-8545-30937f751b39/mappingmetadata.png)
    
    你可能需要将输入操作元数据用于CommonUI以外的其他内容。因此，我们建议使用实现 `IComonMappingContextMetadataInterface` 的类来确保灵活性。
    
4.  在内容浏览器中右键点击，然后点击 **杂项（Miscellaneous）** > **数据资产（Data Asset）** 以创建数据资产。
    
5.  选择实现 `IComonMappingContextMetadataInterface` 的元数据类作为你的数据资产类。将你的元数据命名为UI\_IA\_GenericMetadata。你可以使用UCommonMappingContextMetadata作为默认值，也可以使用自定义资产类。
    
    ![通用映射上下文](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8acaa744-3020-48c5-9550-3297f475a427/commonmappingcontext.png)
6.  打开UI\_IA\_GenericMetadata，然后按如下步骤编辑其设置：
    
    -   **是泛型输入操作（Is Generic Input Action）：**True
        
    -   **每个操作的增强输入元数据（Per Action Enhanced Input Metadata）：** IA\_UI\_GenericAccept
        
    -   **导航栏优先级（Nav Bar Priority）：**10
        
    
    ![image alt text](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2bf530c-e79c-49f4-b88d-f4512fbe2786/commoninputsettings.png)
    
    选中 **是泛型输入操作（Is Generic Input Action）** 以防止CommonUI广播输入操作。
    
    此数据资产提供一个元数据对象，你可以在其中设置CommonUI操作数据。如果你已熟悉CommonUI，或许你能在CommonUI的数据表中发现导航栏优先级（Nav Bar Priority）设置。你还可以通过从 *UCommonInputMetadata* 继承来使用其他元数据扩展输入操作。
    
    你可以使用 **每个操作的增强输入元数据（Per Action Enhanced Input Metadata）** 在单个资产中处理多个操作的元数据，而不是为每个操作创建一个资产。
    
7.  重复第5步至第6步，但这次不选中"是泛型输入操作（Is Generic Input Action）"。将此元数据命名为 `UI_IA_SpecificMetadata` 。这会产生一个元数据类，你可以在非泛型输入操作上使用它。
    
8.  打开你的输入操作。将元数据（Metadata）设置为UI\_IA\_GenericMetadata。输入操作现已获得搭配CommonUI使用所需的全部信息。
    
    ![泛型输入操作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8db1730a-b48a-4a7b-a383-0c2fefc65c60/genericmetadata.png)
9.  若输入操作的元数据未启用"是泛型输入操作（Is Generic Input Action）"，你可以像其他输入操作那样将输入绑定到事件。
    
    ![非泛型输入操作](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e271861-a657-4529-a95f-3d5f8f71664c/specificwidgetaction.png)

## 4\. 为CommonUI创建输入映射上下文（IMC）

CommonUI的输入映射上下文（IMC）的行为与其他IMC相同。 要创建输入映射上下文，请在内容浏览器中右键点击，然后点击 **输入（Input）** > **输入映射上下文（Input Mapping Context）** 。下图举例说明了与CommonUI结合使用的IMC的可能外观：

![输入映射上下文](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7d384c43-f8cf-4ecb-8794-77ef7ab80b93/inputmappingcontext.png)

为了明确你的IMC用于你的UI，我们建议将其命名为 `IMC_UI_GenericActions` 或类似的名称。

## 5.在CommonUI中使用输入操作和输入映射上下文

你可以在以前使用的 **DataTableRows** 中的任意位置使用输入操作来指定输入信息。以下是典型示例：

-   CommonButtonBase。
    
    ![通用按钮基础](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c3908a5-c57c-4b26-8cc8-bb0449281f39/specificwidgetactionobj.png)
-   CommonActionWidget。这可以显示非UI输入操作的键。
    
    ![通用操作控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c548fa1d-e959-48cd-8a76-0d5017823171/iagrenade.png)
-   通用UI输入数据（Common UI Input Data）。此处定义默认导航操作。
    
    ![通用UI输入数据](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d40a428b-d408-4680-92a4-2dfbc7dd3e98/genericacceptback.png)

如果未出现这些设置，请检查确认[在CommonUI中启用增强输入](/documentation/zh-cn/unreal-engine/using-commonui-with-enhnaced-input-in-unreal-engine#enableenhanced)设置设为true。

在可激活控件（Activatable Widgets）中，你可以指定在激活和停用时要应用和移除的IMC。为改善条理性，我们建议在你应用其他顶层游戏IMC的位置应用泛型UI IMC。

![在可激活控件中指定的IMC](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca73495a-defc-4ea5-9fe3-5e508e509d64/imc_uispecific.png)

-   [ui](https://dev.epicgames.com/community/search?query=ui)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [input](https://dev.epicgames.com/community/search?query=input)
-   [commonui](https://dev.epicgames.com/community/search?query=commonui)
-   [enhanced input](https://dev.epicgames.com/community/search?query=enhanced%20input)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 必要设置](/documentation/zh-cn/unreal-engine/using-commonui-with-enhnaced-input-in-unreal-engine#1%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [2\. 在CommonUI中启用增强输入（Enhanced Input）](/documentation/zh-cn/unreal-engine/using-commonui-with-enhnaced-input-in-unreal-engine#2%E5%9C%A8commonui%E4%B8%AD%E5%90%AF%E7%94%A8%E5%A2%9E%E5%BC%BA%E8%BE%93%E5%85%A5%EF%BC%88enhancedinput%EF%BC%89)
-   [3\. 为CommonUI设置增强输入操作](/documentation/zh-cn/unreal-engine/using-commonui-with-enhnaced-input-in-unreal-engine#3%E4%B8%BAcommonui%E8%AE%BE%E7%BD%AE%E5%A2%9E%E5%BC%BA%E8%BE%93%E5%85%A5%E6%93%8D%E4%BD%9C)
-   [4\. 为CommonUI创建输入映射上下文（IMC）](/documentation/zh-cn/unreal-engine/using-commonui-with-enhnaced-input-in-unreal-engine#4%E4%B8%BAcommonui%E5%88%9B%E5%BB%BA%E8%BE%93%E5%85%A5%E6%98%A0%E5%B0%84%E4%B8%8A%E4%B8%8B%E6%96%87%EF%BC%88imc%EF%BC%89)
-   [5.在CommonUI中使用输入操作和输入映射上下文](/documentation/zh-cn/unreal-engine/using-commonui-with-enhnaced-input-in-unreal-engine#5%E5%9C%A8commonui%E4%B8%AD%E4%BD%BF%E7%94%A8%E8%BE%93%E5%85%A5%E6%93%8D%E4%BD%9C%E5%92%8C%E8%BE%93%E5%85%A5%E6%98%A0%E5%B0%84%E4%B8%8A%E4%B8%8B%E6%96%87)

相关文档

[

Common UI概览

![Common UI概览](https://dev.epicgames.com/community/api/documentation/image/cb3a6d24-0db8-4639-b1b1-9a5285d081b2?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/overview-of-advanced-multiplatform-user-interfaces-with-common-ui-for-unreal-engine)