# 虚幻引擎中的文本转语音快速入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/text-to-speech-quickstart-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:19:20.202Z

---

目录

![文本转语音快速入门](https://dev.epicgames.com/community/api/documentation/image/d7f0fe95-4f52-4d1e-bff2-7fe1e7f46e5c?resizing_type=fill&width=1920&height=335)

本指南介绍了如何使用两个按钮创建和启用简单的 **文本转语音（Text To Speech）** 控件。每个按钮在用户点击时念出文本字符串。

## 需要的知识和设置

若要完成本页概括的步骤，请先执行以下操作：

1.  确保你熟悉虚幻示意图形（UMG）界面编辑器的基本原则。
    
2.  创建新的虚幻引擎项目。你可以根据自己的喜爱使用任意模板。
    
3.  为你的项目启用文本转语音插件。如果需要更多帮助来完成该步骤，请参阅[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)页面。
    

## 创建新控件蓝图

在该步骤中，你将创建在屏幕上显示的控件。

1.  在 **内容浏览器（Content Browser）** 或 **内容侧滑菜单（Content Drawer）** 中，右键点击空白区域。在 **上下文菜单** 中，选择 **用户界面（User Interface） > 控件蓝图（Widget Blueprint）** 。
    
    ![创建新控件蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/223817c6-79a7-4098-93eb-2662a4d65226/1-create-widget-blueprint.png)
2.  选择 **用户控件（User Widget）** 类，然后点击 **选择（Select）** ，创建你的控件。
    
    ![选择控件类](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/690f158f-c942-4f98-9f60-58da90bb50e7/2-select-widget-class.png)
3.  将新控件命名为 **MyWidget** 。
    
4.  双击 **控件蓝图（Widget Blueprint）** ，在 **控件编辑器（Widget Editor）** 中打开，然后使用两个按钮创建简单的布局，如下所示。对本教程而言，按钮的大小和位置不重要，只要你可以轻松点击按钮即可。
    
    ![示例控件布局](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54035922-0294-41dc-9f37-52cdefd5cac3/3-example-widget-layout.png)
5.  **编译（Compile）** 和 **保存（Save）** 控件，然后最小化控件编辑器。
    

## 将控件添加到关卡蓝图

接下来，将控件添加到关卡蓝图，这样当游戏开始时，它将在屏幕上绘制。

1.  从 **主工具栏（Main Toolbar）** 打开 **关卡蓝图（Level Blueprint）** 。
    
    ![打开关卡蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8d83b7a-a33d-4d2a-b15f-cc7e06fe8499/4-open-the-level-blueprint.png)
2.  在 **关卡蓝图（Level Blueprint）** 中，从 **Event BeginPlay** 节点的执行引脚拖出。搜索并选择 **Create Widget** ，然后按 **Enter** 键，创建节点。
    
    ![创建新控件节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7cd4b133-b006-4124-9d7b-8cdcd971dbe3/4-create-widget-node-1.png) ![创建新控件节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d03e3e5-42d3-4387-afae-e9ae27d995e1/5-create-widget-node-2.png)
3.  从 **Create Widget** 节点的引脚拖出，并创建 **Add to Viewport** 节点。
    
    ![创建新的Add to Viewport节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/edcf226c-630f-4349-b5bc-2b1f0986424c/6-add-to-viewport.png)
4.  从 **Add to Viewport** 节点的执行引脚拖出，并创建 **Set Input Mode UI Only** 节点。
    
    ![创建Set Input Mode UI Only节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7245e5ee-9040-46df-ada6-f705c4e8ee3f/7-set-input-mode-ui-only.png)
    
    该节点将向你的控件表明，响应玩家输入的唯一游戏元素是UI。用户的所有其他输入都不会转化为Gameplay操作，即使有操作绑定到该功能按钮也不例外。
    
5.  右键点击 **蓝图编辑器（Blueprint Editor）** 的空闲区域，并创建 **Get Player Controller** 节点。
    
    ![创建Get Player Controller节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/487ae47f-3de9-4657-bdc7-0f14ae94030b/8-create-get-player-controller-node.png)
6.  将你在步骤2中创建的 **Construct Widget** 节点的 **返回值（Return Value）** 引脚连接到以下引脚：
    
    -   **Add to Viewport** 节点上的 **目标（Target）** 。
    -   **Set Input Mode UI Only** 节点上的 **在要聚焦的控件中（In Widget to Focus）** 。
7.  将你在步骤5中创建的 **Get Player Controller** 节点的 **返回值（Return Value）** 引脚连接到 **Set Input Mode UI Only** 节点的 **玩家控制器（Player Controller）** 引脚。
    
    在该阶段，你的关卡蓝图看起来应该类似于下图。
    
    ![部分关卡蓝图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85255127-ff3a-4261-9249-e3ff37a0843b/9-partial-level-blueprint.png)
8.  从 **Get Player Controller** 节点的 **返回值（Return Value）** 引脚拖出，并创建 **Set Show Mouse Cursor** 节点。启用该节点的 **显示鼠标光标（Show Mouse Cursor）** 复选框。
    
9.  将 **Set Input Mode UI Only** 节点输出引脚连接到 **Set Show Mouse Cursor** 节点输入引脚。
    
    ![连接Set Show Mouse Cursor节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41507cfd-7889-4e03-8d6b-75a9488d3c3f/10-set-show-mouse-cursor-node.png)
10.  将 **Create Widget** 节点的 **类（Class）** 值设置为你在之前分段中创建的 **MyWidget** 控件。
    
    ![将控件类设置为MyWidget](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/97fe2e42-eed8-4a41-8e73-d8ae858bad78/11-set-widget-class.png)
11.  **编译（Compile）** 并 **保存（Save）** 你的蓝图。
    

完成的关卡蓝图应如下所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/601453e8-8ba0-4469-8e9f-77633b3b52ab/12-finished-level-blueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/601453e8-8ba0-4469-8e9f-77633b3b52ab/12-finished-level-blueprint.png)

点击查看大图。

现在你可以关闭关卡蓝图。

## 添加文本转语音字符串

接下来，为每个按钮创建用于"说话"的通道，并输入将念出的文本字符串。

1.  返回到控件的 **控件编辑器（Widget Editor）** 。如果你已将其关闭，请在 **内容浏览器（Content Browser）** 中双击 **MyWidget** 控件，将其再次打开。
    
2.  点击你创建的某个按钮。然后，在右侧的 **细节（Details）** 面板中，向下滚动到 **事件（Events）** ，并点击 **（+）加号**，添加新的 **点击时（On Clicked）** 事件。
    
    ![添加点击时事件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdeda0c3-cf29-4fbf-9215-0702d2b3837d/13-add-on-clicked-event.png)
    
    该操作将打开控件的 **图表（Graph）** ，并为该按钮创建新的 **On Clicked** 节点。
    
3.  在图表中点击右键并创建新的 **Get TextToSpeechEngineSubsystem** 节点。
    
    ![创建Get Text To Speech Engine Subsystem节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36e97032-16a0-45d6-a8da-5717f9b5dbb8/14-create-get-tts-subsystem-node.png)
    
    如果你看不到该节点，请确保已为你的项目启用 **文本转语音** 插件。
    
4.  从**Text to Speech Engine Subsystem** 节点拖出，并创建新的 **Add Default Channel** 节点。将 **点击时（On Clicked）** 事件连接到 **Add Default Channel** 节点的 **输入（input）** 引脚。
    
    ![创建Add Default Channel节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9aef9349-c832-436c-b74a-c171d01fb129/15-create-add-default-channel-node.png)
5.  在 **Add Default Channel** 节点中，右键点击 **新通道ID（New Channel ID）** 属性并选择上下文菜单中的 **提升到变量（Promote to Variable）** 。
    
    ![将新通道ID属性提升到变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e2672da-0f46-45e6-bf7a-15c25613f633/16-promote-to-variable.png)
6.  在右侧的 **细节（Details）** 面板中，使用 **变量名称（Variable Name）** 属性将变量命名为 **Channel One** 。
    
    ![重命名变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a333b8c7-4605-4be0-a041-52363861ff13/17-rename-variable.png)
7.  从**Text to Speech Engine Subsystem** 节点再次拖出，并创建新的 **Activate Channel** 节点。将 **Add Default Channel** 节点输出引脚连接到 **Activate Channel** 节点输入引脚。
    
    ![创建Activate Channel节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/242a2bfc-5bcc-4429-9e94-446df488dcbb/18-create-activate-channel-node.png)
8.  将你在步骤4中创建的 **Channel One** 变量连接到 **Activate Channel** 节点上的 **通道ID（Channel ID）** 引脚。
    
    在该阶段，你的蓝图看起来应该如下所示：
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dfc58dd-77dc-4c86-8901-5953691b8cf0/19-partial-widget-blueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3dfc58dd-77dc-4c86-8901-5953691b8cf0/19-partial-widget-blueprint.png)
    
    点击查看大图。
    
9.  从**Text to Speech Engine Subsystem** 节点再次拖出，并创建新的 **Speak on Channel** 节点。将 **Activate Channel** 节点输出引脚连接到 **Speak on Channel** 节点输入引脚。
    
    ![创建Speak on Channel节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d694d811-eedd-4f20-b4a4-d1c55202719f/20-create-speak-on-channel-node.png)
10.  将你在步骤4中创建的 **Channel One** 变量连接到 **Activate Channel** 节点上的 **通道ID（Channel ID）** 引脚。
    
11.  从 **Speak on Channel** 节点上的 **要说出的字符串（String to Speak）** 引脚拖出，并创建新的 **To String (Text)** 节点。
    
    ![创建String to Speak节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c0625ec-49e8-478b-b1e9-68346ceabd65/21-string-to-speak.png)
12.  从你在之前步骤中创建的 **to String (Text)** 节点的输入引脚拖出，并创建新的 **Format Text** 节点。
    
    ![创建Format Text节点](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0cd2599-001a-4fa7-99e6-9c086267efc8/22-format-text-node.png)
13.  在 **Format Text** 节点的 **格式（Format）** 框中，输入你希望说出的文本。
    
    ![输入要说出的字符串](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f3fd1fb6-979a-40e7-bd16-c3ad9ae3b1b2/23-enter-string-to-speak.png)
14.  为你创建的第二个按钮重复步骤1-12，根据情况将Channel One更改为Channel Two。
    
    你可以点击并拖移来选择多个蓝图节点，然后进行复制和粘贴。这样可减少手动重复步骤的需要。
    
15.  **编译（Compile）** 并 **保存（Save）** 蓝图。
    

完成的控件蓝图现在应如下所示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/221326c1-d845-4c61-bc41-513852d9c9d0/23-finished-widget-blueprint.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/221326c1-d845-4c61-bc41-513852d9c9d0/23-finished-widget-blueprint.png)

点击查看大图。

## 测试控件

现在可以测试你的控件。

在 **关卡视口（Level Viewport）** 中的 **主工具栏（Main toolbar）** 上，点击 **播放（Play）** 按钮，进入 **在编辑器中播放（Play in Editor）** 模式。

![主工具栏上的播放按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55f4a8f9-685d-4c9d-bb82-1d31e5061ebc/25-play-in-editor.png)

现在你应该会看到你的控件在视口中绘制。点击一个按钮，听其字符串被念出。

![关卡视口中完成的控件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6de442f-590d-4f0c-a79b-87a0ccb08888/26-finished-widget.png)

-   [accessibility](https://dev.epicgames.com/community/search?query=accessibility)
-   [experimnetal](https://dev.epicgames.com/community/search?query=experimnetal)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [需要的知识和设置](/documentation/zh-cn/unreal-engine/text-to-speech-quickstart-in-unreal-engine#%E9%9C%80%E8%A6%81%E7%9A%84%E7%9F%A5%E8%AF%86%E5%92%8C%E8%AE%BE%E7%BD%AE)
-   [创建新控件蓝图](/documentation/zh-cn/unreal-engine/text-to-speech-quickstart-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E6%8E%A7%E4%BB%B6%E8%93%9D%E5%9B%BE)
-   [将控件添加到关卡蓝图](/documentation/zh-cn/unreal-engine/text-to-speech-quickstart-in-unreal-engine#%E5%B0%86%E6%8E%A7%E4%BB%B6%E6%B7%BB%E5%8A%A0%E5%88%B0%E5%85%B3%E5%8D%A1%E8%93%9D%E5%9B%BE)
-   [添加文本转语音字符串](/documentation/zh-cn/unreal-engine/text-to-speech-quickstart-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E6%96%87%E6%9C%AC%E8%BD%AC%E8%AF%AD%E9%9F%B3%E5%AD%97%E7%AC%A6%E4%B8%B2)
-   [测试控件](/documentation/zh-cn/unreal-engine/text-to-speech-quickstart-in-unreal-engine#%E6%B5%8B%E8%AF%95%E6%8E%A7%E4%BB%B6)