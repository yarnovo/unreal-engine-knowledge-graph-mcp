# 音频Gameplay体积快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/audio-gameplay-volumes-quick-start
> 
> 生成时间: 2025-06-14T20:21:14.587Z

---

目录

![音频Gameplay体积快速入门](https://dev.epicgames.com/community/api/documentation/image/73ca51ec-803c-42c8-a6e4-4c5c6adfe113?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

使用 **音频Gameplay体积（Audio Gameplay Volumes）** 可定义一些相对于听者位置的物理区域以便应用音效。

在本指南中，你将学习如何使用 **混响（Reverb）** 组件来设置基本的音频Gameplay体积，从而模拟空间内反弹的声波。

## 先决条件

-   使用[第一人称模板（First Person Template）](/documentation/zh-cn/unreal-engine/unreal-engine-templates-reference)创建一个全新项目。
    
    ![Project Template](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ac80d5bc-9d04-4f88-8653-1cd41903df41/project_template.png)
-   默认情况下，音频Gameplay体积（Audio Gameplay Volumes）插件处于禁用状态。 要启用该插件，请通过选择 **编辑（Edit）> Plugins（插件）** 打开 **插件（Plugin）** 面板，使用搜索栏找到该插件，然后点击相应的复选框。
    
    ![Plugin](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e9402ceb-ac38-42c9-a7de-6569b37f530f/plugin.png)

## 1 - 设置音效类

为了使用音频Gameplay体积，需要在正确设置的 **音效类（Sound Class）** 中包含 **声波（Sound Wave）** 资产。

有关音效类的更多信息，请参阅[音效类](/documentation/zh-cn/unreal-engine/sound-classes-in-unreal-engine)。

1.  第一人称模板（First Person Template）有一个声波资产会在武器射击时进行播放。 使用 **内容浏览器（Content Browser）** 前往 **Content/FPWeapon/Audio**。
2.  双击 **FirstPersonTemplateWeaponFire02** 声波以打开 **声波"细节"（Details）** 面板。
    
    ![Sound Wave in Content Browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70249a5a-2bc0-4af9-aca6-68f7c5d9a02a/sound_wave_in_browser.png)
3.  点击 **音效（Sound）> 类（Class）** 下拉列表。
    
    ![Sound Wave Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4266f315-1aff-4802-95ce-87f478b8e34c/sound_wave_details0.png)
4.  在上下文菜单中选择 **音效类（Sound Class）** 以创建新的资产。
    
    ![Create New Sound Class](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a2ce098-0aeb-4fa5-bf6e-5ae0dd0cec6a/create_new_sound_class.png)
5.  输入新音效类的名称，并将其保存到 **内容（Content）** 文件夹中。
6.  双击这个新的 **音效类** 以打开 **音效类"细节（Details）"** 面板。
    
    ![Sound Wave Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3d9400ca-e458-443d-86f1-d4178d460d24/sound_wave_details1.png)
7.  启用 **路由（Routing）> 应用环境体积（Apply Ambient Volumes）** 以便可以在音频Gameplay体积中使用与此音效类关联的声音。
8.  在 **子混合（Submix）> 默认2D混响发送量（Default 2DReverb Send Amount）** 中输入1.0，以便将音效类中100%比例的声音发送到 **主混响子混合（Master Reverb Submix）**。
    
    ![Sound Class Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/445cd941-aba1-458f-8ff5-0c150aaaf214/sound_class_details.png)
9.  保存音效类和声波资产。

## 2 - 放置音频Gameplay体积

1.  通过使用 **放置Actor（Place Actors）** 面板，或通过点击 **关卡编辑器工具栏（Level Editor Toolbar）** 中的 **快速添加（Quick Add）** 并选择 **体积（Volumes）> AudioGameplayVolume**，在关卡中放置 **AudioGameplayVolume**。
    
    ![Place Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5c4caf6f-e8e8-4603-b4b5-4f7427d77b74/place_actor.png)
2.  将该体积放置在关卡中，以便角色可以进出该体积，例如直接放置在 `BP_Pickup_Rifle` 上方。
    
    ![Volume In Level](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d6843119-7082-4d5a-a1b5-ff4d98532f82/volume_in_level.png)

## 3 - 添加混响组件

音频Gameplay体积功能由组件进行驱动。 每个体积可能具有任意数量的这些组件，这些组件会影响该体积内部或外部相对于听者位置的声音。 对于此示例，请在体积中添加"混响（Reverb）"组件，使武器射击声音在玩家位于该体积内时回荡。

1.  选择 **音频Gameplay体积（Audio Gameplay Volume）** 后，点击 **细节（Details）** 面板中的 **添加组件（Add Component）** 按钮。
    
    ![New Volume Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb85d3cb-73f0-4f9a-b05c-8bfc680c60d6/volume_details.png)
2.  在上下文菜单的 **音频Gameplay体积（Audio Gameplay Volume）** 分段下选择 **混响（Reverb）** 组件。
    
    ![Add Reverb Component](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/426bac76-c678-4608-a4cc-26d5e2945389/add_reverb_component.png)
3.  在 **混响（Reverb）> 音量（Volume）** 中输入1.0以增加效果的响度。
4.  在 **混响（Reverb）> 淡入淡出时间（Fade Time）** 中输入0.0以便在进入该体积时立即应用效果。
    
    ![Reverb Component Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7bec326d-8e7c-4ed6-8c44-a95a71bafddc/reverb_component_details0.png)

## 4 - 设置混响效果

"Reverb（混响）"组件使用 **混响效果（Reverb Effect）** 资产应用其效果，因此你需要创建一个混响效果资产。

1.  选择新的 **混响（Reverb）** 组件后，点击 **混响（Reverb）> 混响效果（Reverb Effect）** 的下拉列表。
    
    ![Reverb Component Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0224d118-4728-46e7-957c-770be4138118/reverb_component_details1.png)
2.  在上下文菜单中选择 **混响效果（Reverb Effect）** 以创建新的资产。
    
    ![Create New Reverb Effect](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2cddeb1-9366-4056-a04c-476158781283/create_new_reverb_effect.png)
3.  输入新混响效果的名称，并将其保存到 **内容（Content）** 文件夹中。
4.  双击这个新的 **混响效果** 以打开 **混响效果"细节（Details）"** 面板。
    
    ![Reverb Component Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3b8a4548-4905-4b1a-abf4-5bd50e75f595/reverb_component_details2.png)
5.  在 **迟反射（Late Reflections）> 增益（Gain）** 中输入1.0以放大信号，使效果更容易被听到。
    
    ![Reverb Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eaf5d353-defc-4dae-bc9c-5fe49ee87637/reverb_details.png)
6.  保存该混响效果资产。

## 5 - 运行

1.  点击 **关卡编辑器工具栏（Level Editor Toolbar）** 中的 **运行关卡（Play Level）** 按钮。
2.  将角色移入 `BP_Pickup_Rifle` 以拿起武器。
3.  在体积内部或外部进行左键点击操作进行射击，并聆听声音的差异。

## 6 - 独立操作！

现在你已经完成了基本音频Gameplay体积的创建过程，接下来请考虑更进一步的操作。

尝试在新体积或现有体积中添加以下其他一些音频Gameplay体积组件类型：

-   **子混合覆盖（Submix Override）**：为 **音效子混合（Sound Submix）** 添加 **子混合效果链（Submix Effect Chain）**。 当听者进入体积时，此效果会应用于所有声音，无论是在体积内部还是外部。
-   **子混合发送（Submix Send）**：将音频发送到 **音效子混合（Sound Submix）**。 此效果会应用于体积内的声音，并且可以配置为在听者处于体积外部或内部时应用。
-   **衰减（Attenuation）**：将音频的当前音量（响度）插值为目标音量（响度）。 此效果可以配置为在听者位于体积外部时应用于体积内的声音，或者相反。
-   **滤波器（Filter）**：对音频应用低通滤波器。 此效果可以配置为在听者位于体积外部时应用于体积内的声音，或者相反。

需要至少一个远离玩家的声音才能听到某些组件类型（例如 **衰减（Attenuation）** 和 **滤波器（Filter）**）的效果。 默认情况下，第一人称模板（First Person Template）不附带任何以这种方式设置的声音，因此需要一些额外的工作。

有很多方法可以做到这一点，但一个简单的做法是尝试将环境声音文件导入为 **声波（Sound Wave）** 资产，然后将其放置在关卡中的体积内部或外部。 请参阅[导入音频文件](/documentation/zh-cn/unreal-engine/importing-audio-files)了解如何导入音频文件。

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [audio gameplay volumes](https://dev.epicgames.com/community/search?query=audio%20gameplay%20volumes)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/audio-gameplay-volumes-quick-start#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [1 - 设置音效类](/documentation/zh-cn/unreal-engine/audio-gameplay-volumes-quick-start#1-%E8%AE%BE%E7%BD%AE%E9%9F%B3%E6%95%88%E7%B1%BB)
-   [2 - 放置音频Gameplay体积](/documentation/zh-cn/unreal-engine/audio-gameplay-volumes-quick-start#2-%E6%94%BE%E7%BD%AE%E9%9F%B3%E9%A2%91gameplay%E4%BD%93%E7%A7%AF)
-   [3 - 添加混响组件](/documentation/zh-cn/unreal-engine/audio-gameplay-volumes-quick-start#3-%E6%B7%BB%E5%8A%A0%E6%B7%B7%E5%93%8D%E7%BB%84%E4%BB%B6)
-   [4 - 设置混响效果](/documentation/zh-cn/unreal-engine/audio-gameplay-volumes-quick-start#4-%E8%AE%BE%E7%BD%AE%E6%B7%B7%E5%93%8D%E6%95%88%E6%9E%9C)
-   [5 - 运行](/documentation/zh-cn/unreal-engine/audio-gameplay-volumes-quick-start#5-%E8%BF%90%E8%A1%8C)
-   [6 - 独立操作！](/documentation/zh-cn/unreal-engine/audio-gameplay-volumes-quick-start#6-%E7%8B%AC%E7%AB%8B%E6%93%8D%E4%BD%9C%EF%BC%81)