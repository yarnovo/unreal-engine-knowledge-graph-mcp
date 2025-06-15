# 虚幻引擎中的Live Link Curve Debugger | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/live-link-curve-debugger-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:08:14.639Z

---

目录

![Live Link Curve Debugger](https://dev.epicgames.com/community/api/documentation/image/b6275885-3ff6-43c6-9d94-8d7d10584eb1?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

在使用[Live Link](/documentation/zh-cn/unreal-engine/live-link-in-unreal-engine)插件将内容流送到虚幻引擎时，你可能需要查看各种活跃曲线和值。**Live Link Curve Debugger** 工具让你能够以一种易于调试的方式查看各种Live Link曲线的输出。 

## 启用Live Link Curve Debugger

为了使用Live Link Curve Debugger，你首先需要从 **插件（Plugins）** 菜单启用它：

1.  从 **编辑（Edit）** 菜单，选择 **插件（Plugins）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b9aceb2-d935-4d4f-bf59-c58a186a4af8/01_pluginmenu.png "01_PluginMenu.png")
2.  在 **插件（Plugins）** 菜单的 **动画（Animation）** 下面，启用 **Live Link** 和 **Live Link Curve Debug UI** 选项，并重启编辑器。 
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/42a0156e-3226-4662-a62a-8976eee343e0/02_enablelivelinkoptions.png "02_EnableLiveLinkOptions.png")
3.  从 **窗口（Window）** 选项，在 **开发者工具（Developer Tools）** 下面，选择 **Live Link Curve Debugger**。 
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b21754e8-5b43-4b82-909d-d39a6322b312/03_debuggerwindow.png "03_DebuggerWindow.png")
    
    **Live Link Curve Debugger** 窗口将会打开。 
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ded87f6e-ad76-45a3-91ae-de903d57a66f/04_debuggerwindowopen.png "04_DebuggerWindowOpen.png")

## 使用Live Link Curve Debugger

与[Maya with Live Link](/documentation/404)或[Motion Builder with Live Link](/documentation/zh-cn/unreal-engine/live-link-stream-motionbuilder-to-unreal-engine)连接后，你就可以在UE中访问该应用程序中的内容，包括任何动画曲线。通过Live Link Curve Debugger，你可以查看当前所选 **主题名称** 的所有曲线和曲线值的列表，单击 **Live Link主题名称（Live Link Subject Name）** 下拉菜单并选择"主题（Subject）"可以定义主题名称。 

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9be35c5e-e762-4789-a849-6e38ffc17877/debuggerwindowsubject.png "DebuggerWindowSubject.png")

选择主题后，将在窗口中显示任何曲线及其值。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b48aeb1a-f09e-4adc-9cd4-d7c391b6a245/curvedebugger-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b48aeb1a-f09e-4adc-9cd4-d7c391b6a245/curvedebugger-1.png)

单击查看大图。

如果尚未指定主题名称，当某个主题与部分曲线相连后，调试器将切换到该主题。你可以单击 **Live Link主题名称（Live Link Subject Name）** 下拉菜单（在编辑器或桌面构建中），或在命令行中输入 **LiveLinkDebugger Next** 来循环浏览不同的主题名称（在其他客户端构建上），从而更改该选择

在客户端内部，还可以使用命令行，通过以下命令显示Live Link Debugger：**LiveLinkDebugger Show**

你可以选择在命令行中使用命令 **LiveLinkDebugger Show** *SubjectName*（主题名称）来指定要使用的Live Link主题名称。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [live link](https://dev.epicgames.com/community/search?query=live%20link)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用Live Link Curve Debugger](/documentation/zh-cn/unreal-engine/live-link-curve-debugger-in-unreal-engine#%E5%90%AF%E7%94%A8livelinkcurvedebugger)
-   [使用Live Link Curve Debugger](/documentation/zh-cn/unreal-engine/live-link-curve-debugger-in-unreal-engine#%E4%BD%BF%E7%94%A8livelinkcurvedebugger)