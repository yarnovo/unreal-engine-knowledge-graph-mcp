# 在虚幻引擎中将Control Rig用于USD文件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-control-rig-with-usd-files-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:07:10.558Z

---

目录

![将Control Rig用于USD动画](https://dev.epicgames.com/community/api/documentation/image/5b42557c-29bb-40a9-8552-51ab707cbaf5?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

**USD导入器（USD Importer）** 可以使用 **Control Rig** 从打开的USD舞台烘焙并直接操控骨骼动画。接着，它可以在USD文件中保存并维护对动画的更改。本指南详细介绍了该工作流程，并提供了其中一些配置选项的参考。

## 概述

当你在 **USD舞台（USD Stage）** 窗口中将Control Rig绑定到SkelRoot图元时，USD导入器会自动执行以下过程：

-   将Control Rig轨道添加到 **Sequencer** 。
-   从头到尾运行整个动画，针对每帧动画将关键帧添加到Control Rig。
-   禁用骨骼动画分段。

因此，Control Rig针对每一帧动画有一个关键帧，并且实际上控制着动画。更改可以保存到USD文件，该文件在会话之间保留动画数据。这可减少在引擎内快速编辑动画所需的繁琐工作量。

如需了解如何减少此过程中自动生成的关键帧数量，请参阅下面有关[减少关键帧](/documentation/zh-cn/unreal-engine/using-control-rig-with-usd-files-in-unreal-engine#%E5%87%8F%E5%B0%91%E5%85%B3%E9%94%AE%E5%B8%A7)的小节。

## 1\. 必要设置

要使用USD导入器，你需要在 **编辑（Edit）** > **插件（Plugins）** 菜单中启用 **USD导入器（USD Importer）** 插件，并在启用插件后重启编辑器。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58d23d76-38f5-4ff0-a2ea-ad397033001e/usd-importer-plugin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58d23d76-38f5-4ff0-a2ea-ad397033001e/usd-importer-plugin.png)

点击查看大图。

本指南使用通过 **第三人称模板（Third-Person template）** 创建的新项目。这包括虚幻引擎人体模型和 `CR_Mannequin_Body` Control Rig。这两者都可在 **内容浏览器（Content Browser）** 中的 `Content/Mannequins` 文件夹中找到。

本指南使用这些资产作为演示，但是你在按指南操作时不一定要使用这些资产。你可以采用任意骨骼网格体，只要你已经为该网格体创建了Control Rig即可。如需详细了解如何使用Control Rig，请参阅[Control Rig](/documentation/zh-cn/unreal-engine/control-rig-in-unreal-engine)文档。

## 2\. 导出USD文件

要利用USD舞台中的功能设置Control Rig，你需要导出想要编辑的动画的USD。

1.  选择动画资产和该资产的骨骼网格体对应的Control Rig。本示例使用的是第三人称模板中的以下资产：
    
    -   动画资产： Content/Characters/Mannequins/Animations/Manny/MM\_Walk\_InPlace
    -   Control Rig： Content/Characters/Mannequins/Rigs/CR\_Mannequin\_Body
2.  在 **内容浏览器（Content Browser）** 中右键点击 **动画** ，然后点击 **资产操作（Asset Actions）** > **导出（Export）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edacefcb-3ea4-47c9-93dc-7671fc0e1046/asset-actions-export.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edacefcb-3ea4-47c9-93dc-7671fc0e1046/asset-actions-export.png)
    
    点击查看大图。
    
3.  在导出对话框中，选择 **通用场景描述文件（Universal Scene Description file (\*.usda)）** 作为文件类型，然后点击 **保存（Save）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63f3d5d2-f71b-4f71-98c2-abb31f2d03eb/saving-a-usda.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/63f3d5d2-f71b-4f71-98c2-abb31f2d03eb/saving-a-usda.png)
    
    点击查看大图。
    
4.  在 **USD导出选项（USD Export Options）** 对话框中，点击 **导出（Export）** 。
    
    ![配置USD导出选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7ca8d611-dd16-46d7-bdd1-f92d9fe56f3d/usd-export-options.png)

## 3\. 在USD舞台中设置Control Rig

现在你已拥有动画的USD文件，可以使用USD舞台编辑器将其打开，并使用Control Rig进行设置了。

1.  点击 **窗口（Window）** > **虚拟制片（Virtual Production）** > **USD舞台（USD Stage)** ，打开 **USD舞台（USD Stage）** 编辑器。
    
    ![从“窗口 > 虚拟制片”打开USD舞台窗口](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1efd1eb1-b38e-491b-b6c7-81ca201fa59c/usd-stage-window.png)
2.  在USD舞台窗口中，点击 **文件（File）** > **打开（Open）** ，然后选择你的动画的 `.usda` 文件，并在打开的文件对话框中点击 **打开（Open）** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dc8d6c9-3227-4f0e-831f-cf0eb0ea6ce7/open-usd-stage.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dc8d6c9-3227-4f0e-831f-cf0eb0ea6ce7/open-usd-stage.png)
    
    点击查看大图。
    
    模型将显示在世界的原点处。
    
3.  在 **USD舞台（USD Stage）** 窗口中，右键点击骨架的 **根骨骼** ，然后点击 **设置Control Rig（Set Up Control Rig）** 。
    
    ![在USD舞台中设置Control Rig](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afa20585-5a20-4424-8eb9-04d7fa82b399/set-up-control-rig.png)
4.  **集成（Integrations）** 面板将显示在舞台层级右侧。将 **Control Rig资产** 设置为骨骼网格体的Control Rig。
    
    ![在集成面板中设置Control Rig资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3ee6876f-c3fe-4a17-9c05-4240e617f11b/set-control-rig-asset.png)
5.  如果你看不到Sequencer窗口，请在你的世界的 **层级（Hierarchy）** 中点击 **USD舞台Actor（USD Stage Actor）** ，然后双击 **细节（Details）** 面板中的 **关卡序列（Level Sequence）** 。
    
    ![USD舞台Actor的细节面板中的Sequencer资产](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7b76900c-09a5-4f65-96b0-51ee03ce990d/usd-stage-actor.png)
6.  在 **Sequencer** 轨道列表中点击新创建的 **Control Rig** 轨道。
    
    -   在本示例中，Control Rig名为称为 `CR_Mannequin_Body` 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe5a5498-636f-480a-9932-af8de249c2e0/control-rig-mannequin.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe5a5498-636f-480a-9932-af8de249c2e0/control-rig-mannequin.png)
    
    点击查看大图。
    

## 结果

Rig的控制点将显示在世界中的网格体上。现在你可以使用Sequencer和Control Rig编辑现有动画或从头创建新的动画了。系统只要检测到更改，就会将其写出到USD舞台，然后可以将其保存到磁盘上的文件。

## 配置

为Control Rig设置SkelRoot图元时，系统将为其提供一些属性，这些属性可以被配置为USD舞台集成面板上的以下选项。

### 正向运动学Control Rig

**使用FKControlRig（Use FKControlRig）** 设置将禁用你选择的Control Rig资产，改为使用默认的正向运动学Rig，使每个骨骼有一个控制点。你可以将其用于尚未创建国Control Rig的骨骼网格体。

### 减少关键帧

要减少自动生成的关键帧数量，请在集成面板中启用 **Control Rig关键帧缩减（Control Rig key reduction）** 设置。这会删除类似于之前关键帧的关键帧，依靠系统在保留的关键帧之间做补间动画。你可以使用 **Control Rig关键帧缩减容差（Control Rig key reduction tolerance）** 设置来更改关键帧缩减的灵敏度。该值越高，减少关键帧的数量就越多。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5c3d353-21fc-43f0-9e35-e42f70860269/key-reduction-options.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d5c3d353-21fc-43f0-9e35-e42f70860269/key-reduction-options.png)

点击查看大图。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [animations](https://dev.epicgames.com/community/search?query=animations)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [usd](https://dev.epicgames.com/community/search?query=usd)
-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [control rig](https://dev.epicgames.com/community/search?query=control%20rig)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/using-control-rig-with-usd-files-in-unreal-engine#%E6%A6%82%E8%BF%B0)
-   [1\. 必要设置](/documentation/zh-cn/unreal-engine/using-control-rig-with-usd-files-in-unreal-engine#1%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [2\. 导出USD文件](/documentation/zh-cn/unreal-engine/using-control-rig-with-usd-files-in-unreal-engine#2%E5%AF%BC%E5%87%BAusd%E6%96%87%E4%BB%B6)
-   [3\. 在USD舞台中设置Control Rig](/documentation/zh-cn/unreal-engine/using-control-rig-with-usd-files-in-unreal-engine#3%E5%9C%A8usd%E8%88%9E%E5%8F%B0%E4%B8%AD%E8%AE%BE%E7%BD%AEcontrolrig)
-   [结果](/documentation/zh-cn/unreal-engine/using-control-rig-with-usd-files-in-unreal-engine#%E7%BB%93%E6%9E%9C)
-   [配置](/documentation/zh-cn/unreal-engine/using-control-rig-with-usd-files-in-unreal-engine#%E9%85%8D%E7%BD%AE)
-   [正向运动学Control Rig](/documentation/zh-cn/unreal-engine/using-control-rig-with-usd-files-in-unreal-engine#%E6%AD%A3%E5%90%91%E8%BF%90%E5%8A%A8%E5%AD%A6controlrig)
-   [减少关键帧](/documentation/zh-cn/unreal-engine/using-control-rig-with-usd-files-in-unreal-engine#%E5%87%8F%E5%B0%91%E5%85%B3%E9%94%AE%E5%B8%A7)

相关文档

[

虚幻引擎中的通用场景描述

![虚幻引擎中的通用场景描述](https://dev.epicgames.com/community/api/documentation/image/4c1b6840-3bd6-4c40-8621-356d49074d1c?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/universal-scene-description-in-unreal-engine)