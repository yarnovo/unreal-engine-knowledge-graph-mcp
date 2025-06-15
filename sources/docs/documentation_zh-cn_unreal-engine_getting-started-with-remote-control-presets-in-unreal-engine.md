# 虚幻引擎中的远程控制预设入门 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/getting-started-with-remote-control-presets-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:35:47.141Z

---

目录

![远程控制预设入门](https://dev.epicgames.com/community/api/documentation/image/3e48a648-4c48-440f-b5dd-4f3fee9e0bdf?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

你可以利用 **远程控制预设（Remote Control Preset）** 收集UI参数或函数并整理到单个面板中，然后向远程控制API公开。这些参数和函数可以连接到 **远程控制Web界面（Remote Control Web Interface）** 插件提供的伙伴Web应用程序中的控件，从而远程控制引擎。

![实际使用中的远程控制面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35d3b635-5d9d-4fc1-828a-fb904329a951/rem-con.gif)

本页面将介绍如何将属性和函数从虚幻编辑器公开给远程控制API。如需详细了解远程控制面板中的所有设置，请参考[远程控制面板参考](/documentation/zh-cn/unreal-engine/remote-control-panel-reference-for-unreal-engine)。

## 先决条件

**远程控制API（Remote Control API）** 插件提供了网络服务器，能够为 **远程控制预设（Remote Control Preset）** 托管数据和websocket连接。

按照下面的步骤为你的项目启用插件。

1.  在虚幻编辑器中打开你的项目。
    
2.  在编辑器的主菜单中，选择 **编辑（Edit） > 插件（Plugins）** 以打开 **插件（Plugins）** 窗口。
    
3.  在 **插件（Plugins）** 窗口中，在 **消息传递（Messaging）** 类别下找到 **远程控制API（Remote Control API）** 插件。勾选 **启用（Enabled）** 复选框。
    
    ![远程控制API插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/958b9e37-3178-441c-a1bb-55eedba3359d/rm-cn-pl.png)
4.  重启引擎。
    

## 将属性公开给远程控制面板和远程控制API

在 **虚幻编辑器** 下的 **远程控制面板（Remote Control Panel）** 中，你将关卡中的多个对象的属性收集起来，以便于访问。你还可以将函数添加到面板，然后从面板中调用函数。向 **远程控制面板（Remote Control Panel）** 公开属性和函数的同时，也会向 **远程控制API（Remote Control API）** 公开。这有助于操作者在实时环境中轻松整理需要控制的任何项。

按照下面的步骤添加 **远程控制预设（Remote Control Preset）** ，然后打开 **远程控制面板（Remote Control Panel）** 。

1.  在 **内容侧滑菜单（Content Drawer）** 中按 **添加（Add）** 并找到 **杂项（Miscellaneous）** 分段。选择 **远程控制预设（Remote Control Preset）** 。
    
    ![远程控制预设菜单选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f65684df-4b6d-4b37-917d-4c46e8f3b710/rm-mn-op.png) ![内容浏览器中的远程控制预设](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/28795847-93b0-4a06-912e-3642cd374764/rem-con-cnbr.png)
2.  双击 **远程控制预设资产（Remote Control Preset Asset）** 打开 **远程控制面板（Remote Control Panel）** 。
    
    ![空白远程控制面板](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6fa497f3-5a14-4562-9fe2-7cbfd0aca42e/rm-cnt-pn.png)
3.  勾选 **编辑模式（Edit Mode）** 复选框。
    
    ![编辑模式复选框](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67d00332-8bb0-41c5-b5bf-64bb6286f7b8/ed-md-ch.png)
4.  在 **资产（Assets）** 的 **细节（Details）** 面板中，每个属性现在都有该属性的设置菜单（三个点）。
    
    ![细节面板中的远程控制设置菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/90b7fe96-cc98-4fa7-ba7c-74697482b109/dt-pn-d.png)
5.  左键点击设置菜单，可看到闭上或睁开的眼睛图标。
    
    ![细节面板中的远程控制眼睛图标](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b1cc73b6-4ef9-441f-b680-9524b20a5c80/dt-pn-ye.png)
6.  眼睛图标表示属性是否已添加到 **远程控制面板（Remote Control Panel）** ：
    
    -   **睁开（open）** 的眼睛图标表示属性 **已** 添加到远程控制面板。
    -   **闭上（closed）** 的眼睛图标表示属性 **未** 添加到远程控制面板。
    -   点击睁开的眼睛图标可以让它闭上，点击闭上的眼睛图标可以让它睁开；属性将会相应地从远程控制面板中添加或移除。
7.  当属性在远程控制面板中时，它的界面与 **细节（Details）** 面板中相同。
    
    ![远程控制面板界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ff8d04c4-b7c6-4107-a2e5-56a8e01d6471/rm-pn-in.png) ![细节面板界面](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6d57944-c61e-4cfb-9c2f-05937166c23c/dpni.png)
    
    在远程控制面板（左侧）和细节面板（右侧）中具有RGB值的光源颜色属性。
    
8.  右键点击 **远程控制预设（Remote Control Preset）** 并选择 **保存（Save）** 以保存你的更改。
    

## 通过蓝图库公开属性和函数

此功能还在实验阶段，可能会在下一次发布时发生变化。

你可以使用蓝图库将属性、函数和Actor公开给远程控制API，并自动完成填充远程控制预设的过程。如需详细了解如何使用蓝图公开这些内容，请参考[蓝图API](https://docs.unrealengine.com/BlueprintAPI/)。

在下面的示例蓝图中，函数被设置为公开类 **Light\_BP** 的所有树。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45a97625-cfe7-43d4-a155-448a485e3e68/bp-cl.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45a97625-cfe7-43d4-a155-448a485e3e68/bp-cl.png)

点击查看大图。

在函数运行时，远程控制预设将显示类 **Light\_BP** 的所有树。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19df0b1d-3ec4-47a5-8e16-5d74b978e4be/bp-res.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19df0b1d-3ec4-47a5-8e16-5d74b978e4be/bp-res.png)

点击查看大图。

## 后续步骤

在本指南中，你学习了如何将属性公开给远程控制API，以及如何创建远程控制预设。请参考以下文档，了解如何在实时环境中使用这些公开的属性。

-   [远程控制Web应用程序](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine)
    
-   [远程控制协议](/documentation/zh-cn/unreal-engine/remote-control-protocols-in-unreal-engine)
    

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [remote control](https://dev.epicgames.com/community/search?query=remote%20control)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/getting-started-with-remote-control-presets-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [将属性公开给远程控制面板和远程控制API](/documentation/zh-cn/unreal-engine/getting-started-with-remote-control-presets-in-unreal-engine#%E5%B0%86%E5%B1%9E%E6%80%A7%E5%85%AC%E5%BC%80%E7%BB%99%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6%E9%9D%A2%E6%9D%BF%E5%92%8C%E8%BF%9C%E7%A8%8B%E6%8E%A7%E5%88%B6api)
-   [通过蓝图库公开属性和函数](/documentation/zh-cn/unreal-engine/getting-started-with-remote-control-presets-in-unreal-engine#%E9%80%9A%E8%BF%87%E8%93%9D%E5%9B%BE%E5%BA%93%E5%85%AC%E5%BC%80%E5%B1%9E%E6%80%A7%E5%92%8C%E5%87%BD%E6%95%B0)
-   [后续步骤](/documentation/zh-cn/unreal-engine/getting-started-with-remote-control-presets-in-unreal-engine#%E5%90%8E%E7%BB%AD%E6%AD%A5%E9%AA%A4)