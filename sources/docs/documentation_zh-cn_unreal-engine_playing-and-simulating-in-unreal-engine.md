# 虚幻引擎中的运行和模拟 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:59:14.245Z

---

目录

![运行和模拟](https://dev.epicgames.com/community/api/documentation/image/1499a5b7-b7e0-4c27-bfeb-3ef76b3108f5?resizing_type=fill&width=1920&height=335)

你可以随时在虚幻编辑器中预览游戏，无需将其构建为独立的应用程序。这样，你就能快速调整游戏玩法和资产，并了解相应调整带来的后果。

在 **虚幻引擎** 中预览游戏的两种方法：

-   **在编辑器中运行（Play In Editor）** (PIE)，你可以通过 **主工具栏（Main Toolbar）** 上的 **运行（Play）** 按钮访问它。
    
-   **在编辑器中模拟（Simulate In Editor）** (SIE)，你可以从 **运行（Play）** 下拉菜单或使用Windows键盘快捷键上的 **Alt + S**（若是macOS，则使用 **Option + S** 快捷键）访问它。
    

在编辑器中，运行和模拟之间的主要区别在于 **运行** 将始终在玩家出生点（Player Start）位置开始游戏，并让你控制玩家角色。**模拟** 不会移动摄像机，也不会产生玩家角色。

你可以根据需要在在编辑器中运行（Play In Editor）和在编辑器中模拟（Simulate In Editor）会话之间切换。

对于本教程，我们使用 **蓝图第三人称（Blueprint Third Person）** 模板新建项目，并启用了 **初学者内容包（Starter Content）**。如果你之前没有基于模板创建项目，或不确定如何启用初学者内容包（Starter Content），请参阅[新建项目](/documentation/zh-cn/unreal-engine/creating-a-new-project-in-unreal-engine)页面了解如何操作。

## 在编辑器中运行（PIE）

本小节将向你展示如何使用 **在编辑器中运行（Play In Editor）** 来运行游戏。

1.  打开 **蓝图第三人称（Blueprint Third Person）** 模板项目，从 **主工具栏（Main Toolbar）** 点击 **运行（Play）** 按钮。
    
    ![主工具栏中的运行按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/50c26568-87df-480e-a6e0-72ec28edb15c/main-toolbar-play.png)
    
    点击 **运行（Play）** 按钮后，游戏应该开始，并且你应该会在关卡编辑器视口中看到角色。
    
    ![运行模式下的第三人称项目](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9afc7af2-81bf-4726-8aea-22fff90c5d35/play-mode.png)

你还将在关卡视口的左上角看到文本"点击进行鼠标控制（Click for Mouse Control）"短暂闪烁。在关卡视口内运行时，你必须在视口内点击，以便将鼠标控制分配给可操作角色。

1.  在关卡编辑器视口中点击或右键点击。

你将在关卡编辑器视口的左上角看到文本"按Shift+F1使用鼠标光标（Shift+F1 for Mouse Cursor）"。如果你要将鼠标控制交还给编辑器本身，请按 **Shift + F1** （Windows）或 **Shift + fn + F1** （macOS）。

游戏运行时，按 **WASD** 键可移动，按 **空格键** 可跳跃，移动 **鼠标** 可移动摄像机。

1.  在运行（Play）会话期间，**主工具栏（Main Toolbar）** 将更改以便提供额外的功能按钮。
    
    ![PIE期间的主工具栏](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fec23742-5d01-47ac-8a91-e44be218777f/main-toolbar-play-options.png)
    
    从左到右，功能按钮是：
    
    -   **暂停（Pause）** ：暂停游戏。
    -   **跳帧（Frame Skip）** ：游戏在此模式下运行时，这将显示为灰色且不可用。
    -   **停止（Stop）** ：结束运行（Play）会话。
    -   **弹出（Eject）** ：释放对可操作角色的控制，并切换到鼠标光标功能按钮。
    
    你可以在关卡内部点击，并使用鼠标四处移动，你也可以使用编辑器更改你的关卡。
    
2.  游戏仍在PIE模式下运行时，按 **Shift + F1** 可以从关卡视口解锁鼠标光标，然后点击 **暂停（Pause）** 暂停游戏。
    
    你会注意到 **主工具栏（Main Toolbar）** 上的前两个按钮看起来略有不同：
    
    ![PIE暂停时可用的功能按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d7ffb10-769b-4214-9772-d180d809af36/main-toolbar-pause-options.png)
    
    -   **运行（Play）** 按钮已替换为 **恢复（Resume）** 按钮。点击 **恢复（Resume）** 按钮将在关卡视口中恢复游戏模拟。 \* 现在 **跳帧（Frame Skip）** 按钮可用。点击该按钮后，Gameplay前进一帧（如果你有带动画的对象，例如粒子发射器，则可以轻松看到）。
    
    **停止（Stop）** 和 **弹出（Eject）** 按钮具有与上述步骤3中所述的相同功能。
    
3.  游戏仍然暂停时，**点击** **主工具栏（Main Toolbar）** 上的 **弹出（Eject）** 按钮。
    
4.  **左键点击** 关卡视口中的文本将其选中。然后，在 **细节（Details）** 面板中，将其 **文本（Text）** 值更改为其他内容。
    
    ![在PIE期间更改文本Actor的值](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/843bc37c-25e8-42b9-a0d6-eed39b4bab9f/change-text.png)
    
    按 **Enter** 确认新文本。你的更改将立即出现在关卡视口中。
    
5.  在 **主工具栏（Main Toolbar）** 中，点击 **占用（Possess）** 按钮（1），然后点击 **恢复（Resume）** 按钮（2）。
    
    ![占用和恢复按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68840e31-5305-46f5-b143-fa0fc2fce3fc/main-toolbar-possess-resume.png)
6.  请注意，关卡中的文本已从其默认值更改。此方法可用于在Gameplay期间更改和测试关卡中Actor的不同值。
    
    ![New value of the text Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34c32cb0-98bf-47f6-8a5c-7e1ad09dc427/new-text-value.png)
    
    默认情况下，你使用此方法对关卡中的Actor所做的更改 **不** 保存。要了解如何保留这些更改，请按照以下步骤操作。
    
7.  按 **Shift + F1** 重获鼠标控制。然后，从主工具栏中，点击 **弹出（Eject）** 按钮。
    
8.  游戏仍在关卡视口中运行，**右键点击** 文本Actor。然后，从弹出菜单中，选择 **保留模拟更改（Keep Simulation Changes）** 。
    
    ![Keep Simulation Changes menu option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/62c02ae1-96fc-4636-8e7b-9c4f17248ddd/keep-simulation-changes.png)
    
    或者，**左键点击** 文本Actor将其选中，然后按键盘上的 **K** 。
    
9.  按 **Esc** 停止运行会话。请注意，你的更改已保存。
    

### 运行模式

开始PIE会话时，你可以从几种不同的 **运行模式（Play Modes）** 中选择。本小节将介绍有哪些模式以及如何访问。

1.  从 **主工具栏（Main Toolbar）** 中，点击垂直省略号按钮。
    
    ![主工具栏上的运行选项按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a479c935-33d1-40ea-a83b-21d913070ea2/main-toolbar-play-modes-button.png)
    
    这将打开 **运行选项（Play Options）** 按钮。
    
2.  选择以下选项之一：
    
    -   **选定视口（Selected Viewport）** ：在当前选定[视口](/documentation/zh-cn/unreal-engine/editor-viewports-in-unreal-engine)内启动游戏。
    -   **移动预览版ES3.1（Mobile Preview ES3.1）（PIE）** ：在编辑器之外以独立版本启动游戏，并提供用于尽可能接近地模拟设备的附加工具。
    -   **新编辑器窗口（New Editor Window）（PIE）** ：在编辑器中启动游戏；但是，它会创建新的独立窗口，使关卡视口保持不变。
    -   **VR预览（VR Preview）** ：在连接的VR设备上启动游戏预览。
    -   **独立游戏（Standalone Game）** ：在编辑器之外以独立版本启动游戏

默认设置为 **选定视口（Selected Viewport）** 。

### PIE控制台

**PIE 控制台（PIE Console）** 是游戏内控制台，你可以在其中输入命令，以便显示性能数据，启用和禁用虚幻引擎功能等等。

要打开PIE控制台，请在PIE模式下玩游戏时按 **波浪号** （~）键。

![在编辑器控制台中运行](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c4e47f4-810f-4e27-88ab-76fb162767aa/pie-console.png)

再次按 **波浪号** 键展开控制台，第三次按 **波浪号** 会关闭它。

PIE控制台的行为与虚幻编辑器的主控制台相同。当你开始输入时，它会自动尝试完成你尝试输入的控制台命令。

分析项目性能是PIE控制台的不错用例。要了解更多信息，请参阅[统计命令](/documentation/zh-cn/unreal-engine/stat-commands-in-unreal-engine)页面。

## 在编辑器中模拟（SIE）

在本节中，我们将了解 **在编辑器中模拟（Simulate In Editor）** ，以及如何模拟你的游戏。

1.  打开项目后，在 **内容浏览器（Content Browser）** 中打开 **初学者内容包（Starter Content）>道具（Props）** 文件夹。
    
2.  点击并拖动 **材质球体（Material Sphere）** 道具到关卡中，就在楼梯上方。
    
    ![将球体拖入关卡](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e4ea91ec-a25c-499a-af02-365ffc3e3b92/drag-sphere-into-level.png)
    
    要快速找到 **材质球体（Material Sphere）** 道具，请使用内容浏览器（Content Browser）中的 **搜索框（Search Box）** 。
    
3.  点击球体将其选中，然后点击[平移控件](/documentation/zh-cn/unreal-engine/transforming-actors-in-unreal-engine)的箭头，将球体向上移动到楼梯上方，如下面的屏幕截图所示。
    
    ![如图所示定位球体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a2b5510-ae3a-4c2f-991e-9934973047e4/sphere-position.png)
4.  在球体的 **细节（Details）** 面板中，向下滚动到 **物理（Physics）** 分段，并启用 **模拟物理（Simulate Physics）** 复选框。
    
    ![The sphere's Details panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d9668e72-2c8d-415b-8175-725ec211872e/sphere-details-panel.png)

当你开始模拟（或运行）时，球体现在具有物理特性，并且应该落到地面。

1.  按 **Alt + S** （Windows）或 **Options + S** （macOS）在编辑器中进行模拟。
    
    ![启用物理的球体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/18f119af-280b-4d0e-9963-83f3b8887714/sphere-falling.gif)
    
    请注意，虽然关卡中没有玩家角色，但游戏开始并且球体落到地面。
    
2.  按 **Esc** 停止模拟。请注意，**主工具栏（Main Toolbar）** 现在会显示 **模拟（Simulate）** 按钮，而不是 **运行（Play）** 按钮。此按钮将始终显示为此项目运行的最近选择的 **运行（Play）** 或 **模拟（Simulate）** 模式。
    
    ![主工具栏上的模拟按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29822bcd-62fe-4d70-9202-650675203ade/main-toolbar-simulate-button.png)
3.  再次点击 **模拟（Simulate）** 按钮，然后立即点击 **暂停（Pause）** 按钮。
    
4.  从 **主工具栏（Main Toolbar）** 点击 **帧前进（Frame Advance）** 按钮，单步调试模拟。每次点击按钮时，球体都应该向下移动。
    
    ![一次前进一帧模拟](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a740f1ae-7738-4681-a619-fb98880a21b4/sphere-falling-frame.gif)

-   [testing](https://dev.epicgames.com/community/search?query=testing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [在编辑器中运行（PIE）](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%90%E8%A1%8C%EF%BC%88pie%EF%BC%89)
-   [运行模式](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine#%E8%BF%90%E8%A1%8C%E6%A8%A1%E5%BC%8F)
-   [PIE控制台](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine#pie%E6%8E%A7%E5%88%B6%E5%8F%B0)
-   [在编辑器中模拟（SIE）](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%A8%A1%E6%8B%9F%EF%BC%88sie%EF%BC%89)