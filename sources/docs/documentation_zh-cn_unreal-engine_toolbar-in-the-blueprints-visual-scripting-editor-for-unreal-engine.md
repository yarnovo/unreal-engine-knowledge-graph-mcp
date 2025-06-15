# 虚幻引擎蓝图可视化脚本编辑器中的工具栏 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/toolbar-in-the-blueprints-visual-scripting-editor-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:38:23.841Z

---

目录

![蓝图编辑器工具栏](https://dev.epicgames.com/community/api/documentation/image/ea95c35d-c449-4fe6-9dde-eb8968b84172?resizing_type=fill&width=1920&height=335)

**工具栏** 默认显示在蓝图编辑器的左上方。通过蓝图编辑器工具栏按钮可轻松访问编辑蓝图时所需的常用命令。工具栏上的按钮根据开启的模式和当前编辑的蓝图类型而有所不同。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a7700a7-c10d-4ee2-b152-2cbb3e91d356/toolbarbp.png)

工具栏包含两个部分：

-   **工具栏选项** \- 用于处理蓝图的工具。
    
-   **模式按钮** - 可用于切换蓝图所处模式的按钮。
    

## 工具栏按钮

  

按钮

说明

![Compile Successful Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38be9999-0896-46cc-8fba-64863201f3b5/bp_compile_successful.png)

编译成功。单击此按钮可编译进行编辑的蓝图。编译过程的输出显示在消息日志的蓝图日志中。此按钮在调试过程中不可用。

![Compile Needed Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c6b50a1-724b-4a37-8f99-c24cceef97f6/bp_needs_compile.png)

须对 *蓝图* 进行重新编译。单击此按钮可编译进行编辑的蓝图。编译过程的输出显示在消息日志的蓝图日志中。此按钮在调试过程中不可用。

![Compile Warning Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/daf514cd-ffc9-4f77-8d86-0490339c4ef5/compile_warning.png)

编译过程中出现警告。单击此按钮可编译进行编辑的蓝图。编译过程的输出显示在消息日志的蓝图日志中。此按钮在调试过程中不可用。

![Compile Failed Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db417ed5-2ff4-4bac-9c5b-0cca206f7e27/compile_failed.png)

编译失败。单击此按钮可编译进行编辑的蓝图。编译过程的输出显示在消息日志的蓝图日志中。此按钮在调试过程中不可用。

![Save Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/85025313-4eeb-49d0-8b93-58f2c49d80c6/bp_save.png)

保存当前蓝图。

![Find in Content Browser Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7014729c-d950-406e-a1fd-da93aa5e818b/bp_find_in_cb.png)

呼出 **内容浏览器** 并导航到此资源。

![Search Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1c043d49-2ec4-4239-9b2e-38377de173a1/bp_search.png)

查找当前蓝图中对函数、事件、变量和引脚的引用。

![Blueprint Properties Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7c7f3c16-66ed-4c1e-8c4f-7af61a61057c/bp_properties.png)

打开 **详情（Details）** 面板中的蓝图属性。

![Blueprint Properties Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3a4d3a93-e8a4-4320-9701-d45ae25f1472/defaults.png)

显示详情（Details）选项卡中的类默认值（Class Defaults）面板

![Simulate Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/803b9090-1a13-4328-b82c-770ca2594dd4/bp_simulate.png)

以模拟模式启动游戏。请参阅[在编辑器中模拟](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E6%A8%A1%E6%8B%9F)部分以了解更多信息。

![Play In Editor Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d32c96e6-7567-4713-acc8-fe7643b3812c/bp_play_in.png)

以正常播放模式启动游戏。单击此箭头可显示 **运行选项（Play Options）** 菜单。请参阅[在编辑器中运行](/documentation/zh-cn/unreal-engine/in-editor-testing-play-and-simulate-in-unreal-engine#%E5%9C%A8%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E8%BF%90%E8%A1%8C)部分以了解更多信息。

![Pause Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8e44fc75-341a-4c46-b442-0fc3f1a9273a/bp_pause.png)

暂停模拟。模拟暂停后，工具栏上将出现 **继续（Resume）** 和 **帧跳跃（Frame Skip）** 按钮。

![Resume Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ef52806-7136-4fa7-96bd-f5cf55bcf823/bp_resume.png)

命中断点或按下Pause按钮后继续执行。

![Frame Skip Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3859771b-f598-477a-8fb1-26d1a3d72465/bp_frameskip.png)

前进一帧或一个tick。模拟暂停或命中断点时出现此按钮。

![Stop Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41c924bd-93ea-4937-aa12-fc87d0ec791a/bp_stop.png)

停止游戏执行并退出在编辑器中模拟模式。

![Possess Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c245b7c5-f847-4c3d-b56e-b1bd4f159879/bp_possess.png)

从在编辑器中模拟模式切换到在编辑器中运行模式。附加到玩家控制器，实现普通游戏功能按钮。与 **Eject** 进行切换。

![Eject Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d3239628-f5cf-4464-9628-32cf54d6e91b/bp_eject.png)

从在编辑器中运行模式切换到在编辑器中模拟模式。从玩家控制器解绑，实现普通游戏功能按钮。与 **Possess** 进行切换。

![Step Button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/20074184-a72b-48a1-b844-b8845f7c19e7/bp_step.png)

一次一个节点逐步执行图表。模拟时命中断点后出现此按钮。

![Debug Dropdown](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0ff47176-e66f-493a-9462-e47e002b878e/bp_debug_dropdown.png)

如关卡中拥有一个或多个 *蓝图* 实例，可通过此下拉菜单选择进行调试的实例。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [工具栏按钮](/documentation/zh-cn/unreal-engine/toolbar-in-the-blueprints-visual-scripting-editor-for-unreal-engine#%E5%B7%A5%E5%85%B7%E6%A0%8F%E6%8C%89%E9%92%AE)