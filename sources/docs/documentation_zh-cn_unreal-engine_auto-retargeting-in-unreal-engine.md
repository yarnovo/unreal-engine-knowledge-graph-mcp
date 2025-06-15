# 虚幻引擎中的自动重定向 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:06:02.203Z

---

目录

将角色的动画重定向到新的角色骨架时，可能需要频繁地手动操作。当选择两个采用不同骨架资产的动画序列资产时，你可以使用 **重定向动画资产（Retarget Animation Assets）** 快捷菜单中的选项，直接从 **内容浏览器（Content Browser）** 重定向动画。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/de2de094-6864-422b-8571-1d7c4224fb0a/editorwindow.png)

此外，使用IK（逆向运动学）绑定资产编辑器中的 **自动重定向链（Auto Retarget Chains）** 工具，你可以为骨骼网格体角色自动生成重定向链。生成或手动设置重定向链后，你可以使用IK重定向器资产编辑器中的 **自动对齐（Auto Align）** 工具，基于IK 控制绑定链为整个骨架或单根骨骼自动对齐角色姿势。

### 自动重定向动画

你可以直接通过内容浏览器从一个骨骼网格体重定向动画，以便在另一个骨骼网格体资产上播放。

#### 先决条件

-   你的项目包含两个具有不同骨架的骨骼网格体资产。
    
-   至少有一个骨骼网格体资产具有你要重定向的动画序列。
    

### 重定向动画

你可以在内容浏览器中直接重定向动画。要重定向动画序列，请 **右键点击** 资产，并在快捷菜单中选择 **重定向动画资产（Retarget Animation Assets）** 选项。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e2f4d9b1-92d6-47b9-9540-a73f093d220c/retargetanimationsoption.png)

然后将目标预览网格体（Target Preview Mesh）属性设置为你要重定向动画序列的骨骼网格体资产。![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ffef8316-3831-409d-b7b3-0e7f59f56a63/image_2.png)

在自动重定向（Auto Retarget）窗口中打开源和目标网格体后，使用 **Shift**\+ **点击** 或 **Ctrl** + **点击**，在资产浏览器面板中选择你要重定向的动画资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0abbcbeb-1439-41eb-b787-baaf9e8d0dcc/image_3.gif)

选择完成后，使用 **导出动画（Export Animations）** 按钮打开导出选项。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5cf7525-76de-4833-a94a-ca9eb7c25b4c/image_4.png)

如果你使用预配置IK重定向器资产，则不会显示导出选项。

通过 **导出动画（Export Animations）** 窗口，选择你要保存重定向动画的文件目标位置，并使用 **导出（Export）** 按钮。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2208246e-348f-4222-97da-084a0ff0f6a6/image_5.png)

你还可以设置命名属性，如 **添加前缀（Add Prefix）** 、 **添加后缀（Add Suffix）** ，或者查找和替换文字或字符，在导出过程中使用 **重命名新资产（Rename New Assets）** 属性重命名重定向动画。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/93a794fd-5291-425a-9abe-12b4c08f3f8f/image_6.png)

现在你可以将重定向动画用于目标骨骼网格体。

导出多个重定向动画资产时，会显示 **批量导出选项（Batch Export Options）** 窗口。你可以参考下面的可用选项及其功能说明：

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ea64b58-295e-4f61-84f8-4d7a2f2294f1/image_7.png)

属性

说明

**覆盖现有文件（Overwrite Existing Files）**

名称相同的文件都将被覆盖，而非创建带有数字后缀的新文件。此属性在迭代批处理时很有用。

**包含引用资产（Include Referenced Assets）**

复制并重定向输入资产引用的动画资产。例如，动画蓝图或混合空间中的序列。

此外，你可以使用导出重定向资产（Export Retarget Assets）按钮导出生成的IK绑定和IK重定向器资产。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72003284-f190-4827-938b-5ab4b195bccf/image_8.png)

## 重定向动画窗口

下面是重定向动画窗口的概览：

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70d1e0d6-3497-430f-b6f8-0ee41afd0c3f/editorcallout.png)

1.  **视口** ：你可以在此处看到已选择用于重定向动画的两个骨骼网格体资产。左侧网格体为源网格体，右侧网格体为目标网格体。
    
2.  **重定向输出日志** ：你可以在此处查看关于重定向过程的消息，例如，如果重定向过程不成功，将会提供详细信息。
    
3.  [细节面板](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)
    
4.  **资产浏览器** ：你可以在此处查看源网格体中可用于重定向的动画资产。在面板中双击资产可以在视口中预览播放。使用每个动画资产左侧的复选框，可将其设置为待重定向。
    
5.  **重定向动画按钮** ：使用此按钮可开始将资产浏览器中的选定动画从源网格体重定向到目标网格体。
    

#### 细节面板

你可以参考下面能用于设置动画重定向过程的选项列表：

属性

说明

**源预览网格体（Source Preview Mesh）**

你可以在此处查看或更改你将用于重定向动画的 **源** 骨骼网格体。

**目标预览网格体（Source Preview Mesh）**

你可以在此处查看或更改你将重定向动画的 **目标** 骨骼网格体。

**自动生成重定向器（Auto Generate Retargeter）**

若 **启用** ，重定向动画窗口将自动重定向选定动画，方法是为源和目标骨骼网格体创建 **IK绑定（IK Rig）** 资产和 **IK重定向器（IK Retargeter）** 资产。若 **未启用** ，你可以设置自定义IK重定向器资产，以使用 **IK重定向器资产（IK Retargeter Asset）** 属性设置重定向过程的属性。

默认情况下，会禁用此属性。

**IKRetargeter资产（IKRetargeter Asset）**

**未启用** **自动重定向（Auto Retarget）** 属性时，你可以设置一个IK重定向器资产，该资产将被用于将动画从源骨骼网格体重定向到目标骨骼网格体。

## 自动重定向链

使用IK绑定资产编辑器中的自动重定向链工具，可以为骨骼网格体角色自动生成重定向链。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72d077fa-6369-4618-911d-ffab64c53527/image_10.png)

#### 先决条件

-   你的项目包含具有 **IK绑定** 资产的骨骼网格体角色。如需详细了解如何设置IK绑定资产，请参阅IK绑定编辑器文档的[创建IK绑定小节](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine#%E5%88%9B%E5%BB%BAik%E7%BB%91%E5%AE%9A)。

### 生成重定向链

为你的骨骼网格体创建IK绑定资产后，在 **内容浏览器（Content Browser）** 中 **双击** 资产，打开IK绑定资产编辑器。然后，你可以使用工具栏中的 **自动重定向链（Auto Retarget Chains）** 工具来启动自动重定向链生成。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a1e0434-14fc-4c83-ae17-c1a0deecdbe3/image_11.gif)

此过程将分析骨骼网格体骨架的层级，并尝试基于骨骼名称将骨骼链与预配置模板进行匹配。

骨架层级的命名规范是影响自动重定向链工具运行效果的一个因素，但不要求名称完全匹配。例如，如果你的骨架具有一系列组成脊柱 `spineBone_{}` 的骨骼，这些骨骼将与两足角色模板的 `Spine_{}` 骨骼相匹配。

脊柱和颈部链等结构可以包含比模板更多或更少的骨骼，并且链会进行调整、增加或缩减，以容纳角色的所有骨骼。生成过程完成后，你将在IK绑定资产编辑器的IK重定向面板中看到新链，并且编辑器窗口的右下角会出现通知窗口。

IK绑定会尝试将角色的骨架与预配置模板进行匹配，以便为IK绑定资产生成重定向链。若找不到完全匹配，通知窗口将显示一条警告，其中包含有关如何改善结果的详细信息。若IK绑定资产编辑器无法将角色的骨架与模板匹配，通知窗口将显示错误消息。

如需详细了解自动生成链工具可以引用的骨架类型，请参阅本文档的[模板小节](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E6%A8%A1%E6%9D%BF)。

## 自动创建FBIK

你可以使用 **自动创建IK（Auto Create IK）** 工具为骨骼网格体角色自动生成 **FBIK** （全身逆向运动学）解算器，以及适合首选角度的FBIK解算器设置、目标和骨骼设置。

#### 先决条件

-   你的项目包含具有 **IK绑定** 资产的骨骼网格资产。如需详细了解如何设置IK绑定资产，请参阅IK绑定编辑器文档的[创建IK绑定小节](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine#%E5%88%9B%E5%BB%BAik%E7%BB%91%E5%AE%9A)。

要使用 **自动创建IK（Auto Create IK）** 工具，请在 **内容浏览器（Content Browser）** 中 **双击** 资产，以在IK绑定资产编辑器中打开IK绑定资产。然后，使用工具栏中的 **自动创建IK（Auto Create IK）** 工具。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bcaadf48-a67f-4784-a66e-6627199d8a72/image_12.png)

自动创建FBIK工具可生成FBIK解算器，因为它会分析骨骼网格体的骨架，并尝试匹配骨骼层级以与一组预配置模板匹配。这些模板包含经过调整的FBIK解算器，这些解算器用于常见骨架层级，自动创建FBIK工具可将这些解算器应用于骨骼网格体。该过程涉及分析骨骼名称。

如需详细了解自动创建FBIK工具可引用骨架类型，请参阅本文档的[模板小节](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E6%A8%A1%E6%9D%BF)。

虽然骨骼网格体使用的命名规范是影响该过程运行效果的一个因素，但并不要求骨骼名称完全匹配。

## 模板

下面是供你参考的预配置模板列表，IK绑定资产编辑器可以使用这些预配置模板为你的骨骼网格体角色自动生成重定向链：

网格体类型

骨架示例

**常见两足角色骨架**

两足角色是指用两只脚站立的类人角色。

-   UE4和UE5人体模型
-   Metahuman
-   Stack O Bot

如需详细了解使用自动重定向工作流程时所支持的骨架结构，请参阅[两足角色自动重定向](https://dev.epicgames.com/community/learning/tutorials/GpL9/unreal-engine-fortnite-auto-retargeting-for-bipeds)视频。

## 自动对齐姿势

你可以使用IK重定向器资产编辑器中的 **自动对齐（Auto Align）** 工具快速重新对齐源网格体姿势，以匹配目标网格体姿势。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f5fa561e-a635-4d5b-801e-746abfbeb36c/image_13.gif)

#### 先决条件

-   你有两个具有 **IK绑定** 资产的骨骼网格体资产。如需详细了解如何设置IK绑定资产，请参阅IK绑定编辑器文档的[创建IK绑定小节](/documentation/zh-cn/unreal-engine/ik-rig-in-unreal-engine#%E5%88%9B%E5%BB%BAik%E7%BB%91%E5%AE%9A)。
    
-   你有一个 **IK重定向器** 资产，其中定义了 **源** 和 **目标IK绑定** 。如需详细了解如何设置IK重定向器资产，请参阅[IK绑定重定向](/documentation/zh-cn/unreal-engine/ik-rig-animation-retargeting-in-unreal-engine)文档。
    

### 自动对齐角色姿势

创建IK重定向器资产并为你的角色定义源和目标IK绑定后，在菜单栏中将编辑器设置为 **编辑重定向姿势（Edit Retarget Pose）** 模式。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38e93f60-5afe-4444-84c5-59eed6951e18/image_14.gif)

现在，你可以使用自动对齐工具快捷菜单中的各种属性，将源IK绑定的姿势复制到目标IK绑定。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65ae4e63-4bf0-4981-9bd4-c3c49dfd3bd5/image_15.gif)

使用自动对齐工具时，你可以使用以下选项：

属性

说明

**对齐所有骨骼（Align All Bones）**

自动对齐目标骨骼网格体的所有骨骼，以匹配源骨骼网格体的位置和旋转。

**对齐选定项（Align Selected）**

仅将目标骨骼网格体的选定骨骼对齐源骨骼网格体层级中对应骨骼的位置和旋转。当你要隔离需要重定向的骨骼时，此选项很有用，例如，你可能只想重定向角色的下半身动画，而不是整个骨架，以重定向行走或跑步动画。

**对齐选定项和子项（Align Selected and Children）**

将选定骨骼和目标骨骼网格体的骨骼链中较低的骨骼对齐源骨骼网格体层级中相应骨骼的位置和旋转。此选项会自动调整链中的所有骨骼（例如肢体），而无需单独选择每根骨骼。

**使用网格体对齐选定项（Align Selected Using Mesh）**

此属性会将与选定骨骼相关的目标骨骼网格体的所有蒙皮顶点与相应的源骨骼网格体对齐。

你必须选择一根骨骼或一系列骨骼才能使用此选项。

**将角色与地面对齐（Snap Character to Ground）**

此属性会将角色网格体的最低点与地面对齐，以便重新对齐骨骼网格体。当自动对齐具有不同比例的角色时，这有助于确保角色不会在最终的重定向动画资产中呈现漂浮状态。

当网格体之间未产生适当的骨骼对齐效果时，例如，当目标骨骼网格体与源骨骼网格体具有截然不同的网格体几何形状时，此属性很有用。

根据IK重定向资产编辑器设置的模式，可使用自动对齐工具将姿势从源网格体复制到目标网格体，或从目标网格体复制到源网格体。

![ImageAltText](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38384a18-56aa-4da0-8c79-679b3ba7a0ab/image_16.gif)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)
-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [自动重定向动画](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E8%87%AA%E5%8A%A8%E9%87%8D%E5%AE%9A%E5%90%91%E5%8A%A8%E7%94%BB)
-   [先决条件](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [重定向动画](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E5%8A%A8%E7%94%BB)
-   [重定向动画窗口](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E9%87%8D%E5%AE%9A%E5%90%91%E5%8A%A8%E7%94%BB%E7%AA%97%E5%8F%A3)
-   [细节面板](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E7%BB%86%E8%8A%82%E9%9D%A2%E6%9D%BF)
-   [自动重定向链](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E8%87%AA%E5%8A%A8%E9%87%8D%E5%AE%9A%E5%90%91%E9%93%BE)
-   [先决条件](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6-2)
-   [生成重定向链](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E7%94%9F%E6%88%90%E9%87%8D%E5%AE%9A%E5%90%91%E9%93%BE)
-   [自动创建FBIK](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E8%87%AA%E5%8A%A8%E5%88%9B%E5%BB%BAfbik)
-   [先决条件](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6-3)
-   [模板](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E6%A8%A1%E6%9D%BF)
-   [自动对齐姿势](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E8%87%AA%E5%8A%A8%E5%AF%B9%E9%BD%90%E5%A7%BF%E5%8A%BF)
-   [先决条件](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6-4)
-   [自动对齐角色姿势](/documentation/zh-cn/unreal-engine/auto-retargeting-in-unreal-engine#%E8%87%AA%E5%8A%A8%E5%AF%B9%E9%BD%90%E8%A7%92%E8%89%B2%E5%A7%BF%E5%8A%BF)