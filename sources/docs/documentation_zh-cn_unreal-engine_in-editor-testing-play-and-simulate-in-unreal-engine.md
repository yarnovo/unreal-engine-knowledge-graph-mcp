# 在虚幻引擎编辑器中进行测试(运行&模拟) | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:02.224Z

---

目录

![在编辑器中进行测试(运行&模拟)](https://dev.epicgames.com/community/api/documentation/image/a2cf980b-26ef-4941-a9a3-76b1029e2d1f?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

虚幻编辑器允许你在关卡中的任何位置生成玩家，并且无需保存文件即可在编辑器中预览游戏。编辑器有两种预览模式： **在编辑器中运行** (PIE) 模式可以通过主工具栏的 **运行** 按钮直接启用， 而 **模拟** (SIE) 模式可以通过 **运行** 下拉菜单启用（**Alt+S**）。编辑器的内部预览系统支持在 PIE 和 SIE 会话窗口之间切换，以便你在快速迭代游戏逻辑和游戏资产的同时， 查看游戏的变化效果。

当你启动一个游戏预览会话时，编辑器将快速创建一个你的关卡的副本。所做的修改可以使用"保持模拟修改（Keep Simulation Changes）"命令保存回到该编辑器内的关卡版本中。 这个关卡副本可以保持编辑器中的世界版本安全且不受干扰。

游戏预览包括关卡动态载入， **Outliner(大纲视图)** 将会对应地更新，以便你可以选择及编辑游戏动态载入的Actor。 另外，当你开始使用 "Play In Editor（编辑器中运行）" 或 "Simulate In Editor（模拟）" 会话测试你的游戏时，你所选中的任何Actor都将仍然处于选中状态。 反过来也是成立的，所以在编辑器中进行测试时选中的任何Actor 在你结束测试会话后将仍然处于选中状态。这意味着即时你开始在关卡中很远的地方玩游戏了，但是 **细节** 面板将仍然显示 选中的Actor的属性，由于你想改变它的外观或行为。

## 工具栏

你可以通过使用适当的 **工具条** 按钮或下拉菜单从 **关卡编辑器** 或 **蓝图编辑器** 中启动 "Simulate In Editor（模拟）" 或 "Play In Editor（编辑器中运行）" 会话。

在 **关卡编辑器** 中，你可以点击 **Play（运行）** 按钮。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94926d9c-e039-43cd-a832-d2f54934f357/01-play-in-editor.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/94926d9c-e039-43cd-a832-d2f54934f357/01-play-in-editor.png)

点击查看大图。

这会启动一个PIE会话，这样就可以直接从编辑器中测试游戏内容。你可以在下拉菜单中选择不同的模式和选项，之后点击"播放"按钮时，将会使用前一次会话所用的设置。

点击 **Play（运行）** 下拉菜单按钮可以显示所有 **运行选项**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21a3d344-0106-443e-9cb4-429fd5f3b82a/02-button-play-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/21a3d344-0106-443e-9cb4-429fd5f3b82a/02-button-play-menu.png)

点击查看大图。

你可以修改你的 [在编辑器中运行模式](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E6%A8%A1%E5%BC%8F)，设置基本的[在编辑器中联网运行](/documentation/zh-cn/unreal-engine/play-in-editor-multiplayer-options-in-unreal-engine)选项，或者可以打开[完整的在编辑器中运行设置窗口](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine)。点击 **Simulate（模拟）** 开启 "Simulate In Editor（模拟）" 模式，这将会改变 **工具条** 的测试部分。 当你正在模拟时，你可以暂停或停止游戏，也可以使用 **Possess（拥有）** 按钮切换到 "Play In Editor（编辑器中运行）" 会话。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ade16dab-3252-40ae-883f-c8b1ec30c0d2/03-sie-toolbar.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ade16dab-3252-40ae-883f-c8b1ec30c0d2/03-sie-toolbar.png)

点击查看大图。

## 在编辑器中运行

在工具条上点击 **Play(运行)** 按钮（**Alt + P**）或者在 **视口** 关联菜单中选择 **Play From Here（从这里运行）** 来启动"Play In Editor（编辑器中运行）"会话。 "Play In Editor（编辑器中运行）"功能允许你直接从编辑器中运行当前关卡，以便你可以测试游戏功能，包括玩家控制及由玩家动作触发的关卡事件。

### 模式

使用不同的模式启动游戏预览将会修改使用 **Play（运行）** 按钮激活的默认运行模式。

#### 显示类型

$ Viewport（视口） : 游戏将显示在激活的关卡编辑器视口中。

**点击查看大图:**

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a4491e2-3ddc-4d0a-90df-6e7dd4922e46/pieviewport_windows.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2a4491e2-3ddc-4d0a-90df-6e7dd4922e46/pieviewport_windows.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc1d2927-b1ac-476d-a3f1-4274a3fdd74a/pieviewport_mac.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc1d2927-b1ac-476d-a3f1-4274a3fdd74a/pieviewport_mac.png)

这是唯一允许通过使用 **Possess（拥有）** 和 **Eject（弹出）** 按钮在 "Play In Editor（编辑器中运行）" 和 "Simulate In Editor（模拟）" 间切换的显示类型。 在 **Viewport（视口）** 模式中，你也可以使用 **Pause（暂停）** 和 **Stop（停止）** 按钮来中断游戏。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/96e19b12-1f32-49fe-a934-82e7382b8f5d/pie_toolbar.png)

默认情况下，预览视口不会自动地控制鼠标光标。 你可以在预览视口中点击鼠标来将鼠标光标控制转向游戏。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65fb1ea5-d99f-4f4e-8316-46c90e95e45e/mouse_control_label.png)

要想再次获得鼠标光标，请按下 **Shift+F1** 。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aaf6e56d-de61-405e-bc9f-0712fb7157c0/mouse_regain_label.png)

当你切换鼠标控制时将会在预览视口中出现一个小标签。 要想修改鼠标控制的选项或者修改鼠标控制标签的显示方式，那么请使用 ["在编辑器中运行"设置窗口](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#playineditor)。

$ New Window（新窗口） : 游戏将会显示在新窗口中。要想改变默认的新窗口的大小，请使用 ["在编辑器中运行"功能设置窗口](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#playinnewwindow)

**点击查看大图:**

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58195c9b-acf4-4414-9813-f455bdd8f4f1/newwindow_windows.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58195c9b-acf4-4414-9813-f455bdd8f4f1/newwindow_windows.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc863699-f0de-49ef-902a-79a3e494aae0/newwindows_mac.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc863699-f0de-49ef-902a-79a3e494aae0/newwindows_mac.png)

当在一个新窗口中播放游戏预览时，你不能切换到 "Simulate In Editor（模拟）" 会话。 然而，你仍然可以使用工具条按钮来暂停及停止游戏。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c3b4c540-47b6-4ba5-bd2e-b75d2c960e08/pause_stop_only.png)

默认情况下，在新窗口中运行将会自动地将鼠标控制交给游戏。 你可以按下 **Shift+F1** 键来再次获得你的鼠标光标控制。

$ Standalone Game（独立游戏） : 游戏将会显示在以其自己的进程运行的新窗口中。要想默认独立游戏的窗口大小，请使用["在编辑器中运行"功能设置窗口](/documentation/zh-cn/unreal-engine/content-browser-settings-in-unreal-engine#playinstandalonegame)。

**点击查看大图：**

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72d3d170-8b4f-42cf-a5bf-894169abd7ba/standalone_windows.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/72d3d170-8b4f-42cf-a5bf-894169abd7ba/standalone_windows.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc53566a-3f37-496f-b6d9-edc89ac7db93/standalone_mac.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dc53566a-3f37-496f-b6d9-edc89ac7db93/standalone_mac.png)

由于这种显示类型使得游戏以其自己的的进程运行，所以你不能暂停或停止该游戏。你也不能切换到 "Simulate In Editor（模拟）" 会话。 因此，当你运行独立游戏预览时，工具条按钮不会改变。

默认情况下，在独立窗口中运行将会自动地将鼠标控制交给游戏。 你可以按下 **Shift+F1** 键来再次获得你的鼠标光标控制。

#### 起始位置

$ 相机位置 : 游戏以当前的相机位置开始运行。

$ 默认玩家起点: 游戏以当前的玩家起点位置开始运行。

如果你的游戏使用了导航网格物体进行玩家控制的运动或AI控制的运动，那么使用 **相机位置** 作为你的 "编辑器中运行" 功能的起始位置将会导致 将你生成在一个中断路径的位置处。 在这种情况下，推荐从 **Default Player Start（默认玩家起点）** 启动 "Play In Editor（编辑器中运行）" 会话。

### 从这里运行

还有一个额外的 "Play In Editor（编辑器中运行）" 模式，可以通过在 **视口** 中 **右击** 并选择 **Play From Here（从这里运行）** 来访问。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/452ada99-a2a9-4e29-a7ae-8a642278751d/04-play-from-here.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/452ada99-a2a9-4e29-a7ae-8a642278751d/04-play-from-here.png)

点击查看大图。

**Play From Here(从这里运行)** 功能从你点击的位置处开始游戏，就像你将 **显示类型** 设置为 **Level Viewport（关卡视口）** 一样。

### 切换到"在编辑器中模拟"

当位于视口中的 "编辑器中运行" 会话中时，按下 **Shift+F1** 可以重新获得鼠标控制。然后，点击 **工具条** 上的 **Eject(弹出)** 按钮来切换到 "Simulate In Editor（模拟）" 会话。 你将会脱离该玩家控制器，并从你的当前位置启动一个 "Simulate In Editor（模拟）" 会话。

你也可以按下 **Eject（弹出）** 功能的快捷键来从 "Play In Editor（编辑器中运行）" 切换到 "Simulate In Editor（模拟）"。（**F10**）

如果你使用[在编辑器中联网运行](/documentation/zh-cn/unreal-engine/play-in-editor-multiplayer-options-in-unreal-engine)功能为你的 "编辑器中运行" 测试设置了多个客户端，那么则仅支持第一个会话(视口中的那个会话) 切换到 "Simulate In Editor（模拟）" 模式。即使是单玩家游戏测试，当游戏位于一个新窗口中或者以独立游戏进程运行时， "Play In Editor（编辑器中运行）" 会话都不可以切换到 "Simulate In Editor（模拟）" 。

## 在编辑器中模拟

点击 **模拟** 按钮后，会以当前活跃视口中的内容为基础，开始一个 **在编辑器中模拟（Simulate In Editor）** 会话。在模拟会话中，游戏会开始运行，包括执行那些不依赖玩家与游戏交互的蓝图和C++代码。在模拟过程中，你可以使用所有的编辑器工具，可以修改场景及其内容，甚至可以放置新的Actor。你还可以选择和检查由AI控制的Pawn（在它们执行行动时），并快速调试和调整游戏行为。不过，由于在模拟时你没有使用PlayerController，你无法进入游戏控制状态。你可以使用 **保留模拟变化（Keep Simulation Changes）** 来保存模拟编辑器会话中的修改。

### 切换到"在编辑器中运行"

当处于 "Simulate In Editor（模拟）" 会话时，你可以点击 **工具条** 上的 **Possess（占有）** 按钮来切换到 *Play In Editor（在编辑器中运行)* 会话。 你将会附加到玩家控制器上，并在激活的关卡视口中启动 "Play In Editor（编辑器中运行）" 会话。

你也可以按下 **Possess（拥有）** 功能的快捷键来从 "Simulate In Editor（模拟）" 切换到 "Play In Editor（编辑器中运行）" 。（**F10**）

如果你使用 "Simulate In Editor（模拟）" 会话开始在编辑器中测试游戏，然后使用 **Possess（拥有）** 功能附加到了玩家控制器上，那么你将在  
默认的玩家起始位置开始你的 "Play In Editor（编辑器中运行）" 会话。这等同于从 **Play（运行）** 下拉菜单中选择 **Play（运行）** > **选中的视口（Selected Viewport）** > **Default Player Start（默认玩家起点）** 。 然而，如果你先前从 "Play In Editor（编辑器中运行）" 会话切换到了 "Simulate In Editor（模拟）" 会话，而没有离开在编辑器中测试模式，那么当你点击 **Possess（控制）** 按钮时 你将会重新附加到那个玩家控制器上并继续从你先前点击 **Eject（弹出）** 按钮的位置处继续游戏。

## 测试游戏

### 蓝图

当你进入 "编辑器中运行" 或 "模拟" 模式时，编辑器会编译你的所有蓝图，即使这些蓝图还没有保存也会对其进行编译。当游戏正在运行或模拟时，所有蓝图图表都是只读的，所以你不能添加额外节点或者进行不同的连线。

![Simulating readonly](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/185bcc23-6aa0-4bf3-8163-562923de2ff0/simulating-readonly.png "Simulating readonly")

然而，当预览会话激活时，你可以修改蓝图默认值，并且这些修改将会应用到你正在测试的关卡中的那个蓝图的所有实例上。

### C++

对于包含C++代码的项目，在 **关卡编辑器工具条上** 有一个 **编译** 按钮。 该按钮可以在运行时重新编译及重新加载游戏代码。 如果你在项目的C++文件中 修改了一个属性，那么点击 **编译** 按钮将会重新编译并加载你的游戏模块，以便你的代码修改可以反映在编辑器中。 有些时候，甚至在你使用 "编辑器中运行" 或 "模拟" 功能时，也可以进行编译，你的代码修改将会更新，且你不需要停止游戏或模拟。

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工具栏](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [在编辑器中运行](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%90%E8%A1%8C)
-   [模式](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E6%A8%A1%E5%BC%8F)
-   [显示类型](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E6%98%BE%E7%A4%BA%E7%B1%BB%E5%9E%8B)
-   [起始位置](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E8%B5%B7%E5%A7%8B%E4%BD%8D%E7%BD%AE)
-   [从这里运行](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E4%BB%8E%E8%BF%99%E9%87%8C%E8%BF%90%E8%A1%8C)
-   [切换到"在编辑器中模拟"](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E5%88%87%E6%8D%A2%E5%88%B0%22%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%A8%A1%E6%8B%9F%22)
-   [在编辑器中模拟](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%A8%A1%E6%8B%9F)
-   [切换到"在编辑器中运行"](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E5%88%87%E6%8D%A2%E5%88%B0%22%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%90%E8%A1%8C%22)
-   [测试游戏](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E6%B5%8B%E8%AF%95%E6%B8%B8%E6%88%8F)
-   [蓝图](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E8%93%9D%E5%9B%BE)
-   [C++](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#c++)