# 在Windows上将Pix用于虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-pix-on-windows-with-unreal-engine
> 
> 生成时间: 2025-06-14T19:23:05.046Z

---

目录

![在Windows上将Pix用于虚幻引擎](https://dev.epicgames.com/community/api/documentation/image/d3383b87-001c-4dad-855e-c7f916bf5d07?resizing_type=fill&width=1920&height=335)

Pix是一款由微软维护的免费独立式专有图形调试器，你可以使用它对应用程序（比如虚幻引擎）进行单帧捕获。捕获内容会被加载到Pix中，以便通过事件、API调用等信息全面详细地检查GPU上正在发生的情况。

## 安装Pix

你可以通过[Pix on Windows](https://devblogs.microsoft.com/pix/)网站下载和安装Pix。下表列出了Pixiv支持的操作系统和API，这可能与虚幻引擎支持的系统和API有所不同。如需了解最新更新，请参阅[Pix的下载](https://devblogs.microsoft.com/pix/download/)页面。

Pix支持以下操作系统：

1.  Windows 10和11

Pix支持以下图形API：

1.  D3D11（需使用模拟器，相关说明见[下文](/documentation/zh-cn/unreal-engine/using-pix-on-windows-with-unreal-engine#pix%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F)。）
    
2.  D3D12
    
3.  Xbox GDK（本文对此不做介绍。）
    

## 在项目中启用Pix

你需要先在系统中安装Windows on Pix，才能使用它。对于虚幻引擎5.5，你只需要在启动项目时传入 `-AttachPix` 命令行参数即可启用Pix。

将Pix附加到启动流程后，你会在关卡视口的右上角看到Pix的应用程序图标。

![Pix application icon in the Level Viewport](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0c14a9a-dca8-4e91-8b71-537d89330c5d/viewport-bar.png)

更详细的步骤请参阅下面的说明。

## 通过快捷方式属性启用Pix功能

1.  使用编辑器快捷方式启用命令行参数。
    
2.  在快捷方式（Shortcut）选项卡汇总，将以下参数添加到Target行：`-AttachPix`。
    

此方法在你只时偶尔需要运行Pix时比较理想。你也可以在Visual Studio或其他支持在启动时传入命令行参数的IDE中提供此命令参数。

![Pix shortcut properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/27220c29-2c4b-4b21-a69c-4f74ac2d3aa9/shortcut-settings.png)

## 执行帧捕获

以下步骤从宏观角度描述了如何使用集成的Pix插件或直接从Pix应用程序在虚幻引擎项目中执行单帧捕获的操作

关于Pix的更详细功能说明和使用方法，请参阅[Pix文档](https://devblogs.microsoft.com/pix/documentation/)。

## Pix应用程序

以下是使用虚化引擎与独立的Pix可执行文件捕获帧所需的宏观步骤：

1.  配置Pix，使用恰当的命令行参数启动你的游戏或UEEditor.exe。
    
    1.  你可以选择通过PIX启动应用程序，也可以附着到正在运行的进程中。
        
    2.  启动后，你可以按下编辑器内的捕获按钮，或使用Pix的原生捕获按钮捕获单个帧。
        
    
    ![Pix attach options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23fbafc3-8ebc-4211-8778-473e86d4e130/pix-attach-options.png)
    
    如果你使用的是D3D11应用程序，请务必选择"强制D3D11On12（Force D3D11On12）"选项。
    
2.  启动可执行文件。
    
    1.  Pix捕获按钮会自动出现在关卡视口中。
        
    2.  按下捕获按钮，捕获会自动在Pix中打开。
        

关于设置Pix、启动移动程序和执行帧捕获的完整细节，请参阅[Pix Take A Capture Guide](https://devblogs.microsoft.com/pix/taking-a-capture/)。

## **故障排除**

如果你在Pix捕获中无法看到所有事件，请确保禁用了 **在后台使用较少CPU（Use Less CPU in Background）** 编辑器设置。

![Disable Use Less CPU in Background editor setting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6104f1c1-418b-4810-a773-91611033fb40/editor-settings.png)

## **其他说明和资源**

如需进一步了解Pix的使用方法以及帧捕获的分析，请参阅[Pix文档](https://devblogs.microsoft.com/pix/documentation/)。

-   [performance](https://dev.epicgames.com/community/search?query=performance)
-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [bronze](https://dev.epicgames.com/community/search?query=bronze)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [安装Pix](/documentation/zh-cn/unreal-engine/using-pix-on-windows-with-unreal-engine#%E5%AE%89%E8%A3%85pix)
-   [在项目中启用Pix](/documentation/zh-cn/unreal-engine/using-pix-on-windows-with-unreal-engine#%E5%9C%A8%E9%A1%B9%E7%9B%AE%E4%B8%AD%E5%90%AF%E7%94%A8pix)
-   [通过快捷方式属性启用Pix功能](/documentation/zh-cn/unreal-engine/using-pix-on-windows-with-unreal-engine#%E9%80%9A%E8%BF%87%E5%BF%AB%E6%8D%B7%E6%96%B9%E5%BC%8F%E5%B1%9E%E6%80%A7%E5%90%AF%E7%94%A8pix%E5%8A%9F%E8%83%BD)
-   [执行帧捕获](/documentation/zh-cn/unreal-engine/using-pix-on-windows-with-unreal-engine#%E6%89%A7%E8%A1%8C%E5%B8%A7%E6%8D%95%E8%8E%B7)
-   [Pix应用程序](/documentation/zh-cn/unreal-engine/using-pix-on-windows-with-unreal-engine#pix%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F)
-   [故障排除](/documentation/zh-cn/unreal-engine/using-pix-on-windows-with-unreal-engine#%E6%95%85%E9%9A%9C%E6%8E%92%E9%99%A4)
-   [其他说明和资源](/documentation/zh-cn/unreal-engine/using-pix-on-windows-with-unreal-engine#%E5%85%B6%E4%BB%96%E8%AF%B4%E6%98%8E%E5%92%8C%E8%B5%84%E6%BA%90)