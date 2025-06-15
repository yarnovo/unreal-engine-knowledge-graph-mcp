# 编辑器中的像素流送 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor
> 
> 生成时间: 2025-06-14T20:46:52.461Z

---

目录

![编辑器中的像素流送](https://dev.epicgames.com/community/api/documentation/image/7b160654-086c-4768-bb59-c0bbcc30e92e?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

## 像素流送工具栏

像素流送工具栏是用于在编辑器中控制像素流送的主要手段。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d71bf5b3-f1c9-47e6-b9ba-fe79b3b9572a/pstoolbarexpandedfull.jpg)

要访问像素流送工具栏，请确保你启用了像素流送插件。

#### 使用远程信令服务器

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3fb4e06c-0a15-47e0-9e8a-25bca8e7fa36/remotesignalling.jpg)

切换此选项会阻止编辑器在你使用关卡和完整编辑器流送选项时创建嵌入式信令服务器。你必须手动启动编辑器外部的信令服务器，并指定其URL。不过，在大部分用例中，使用默认值即可。

#### 嵌入式信令服务器选项

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b253a35f-9962-4518-9882-5585cb2bc8d2/ssembedoptions.jpg)

这些值将指定在你使用编辑器流送功能时创建的嵌入式信令服务器的端口。除非你明确需要更改这些值，否则默认值应该能满足大部分用例的需求。

由于虚幻编辑器在Linux上不作为sudo运行，因为无法创建创建1000以下的端口绑定。由于端口80是用于流送的默认查看器端口，我们已在Linux上将默认编辑器流送查看器端口更改为8080。连接到流时，你必须在浏览器URL中指定此端口。

这仅适用于嵌入式信令服务器。外部信令服务器仍将使用端口80，这不需要在浏览器中指定。

#### 虚拟摄像机

虚拟摄像机是添加到像素流送的试验性的新功能。如需详细了解如何使用此功能，请参阅[虚拟摄像机](/documentation/zh-cn/unreal-engine/experimental-pixel-streaming-features)页面。

#### 编码解码器

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe77f881-f47f-4760-a30a-a1845ced121b/codecs.jpg)

这些选项将指定你的流将使用的编码器。如需详细了解每个编码解码器以及比较情况，请参阅[支持的编码解码器](/documentation/zh-cn/unreal-engine/unreal-engine-pixel-streaming-reference#%E6%94%AF%E6%8C%81%E7%9A%84%E7%BC%96%E7%A0%81%E8%A7%A3%E7%A0%81%E5%99%A8)页面。

## 编辑器流送

利用编辑器流送，你可以将虚幻引擎编辑器流送到网络浏览器，包括移动设备上的浏览器。这就带来了与编辑器远程交互的新潜力，还可提供安全优势，并为用户带来新的协作方式。此外，由于不必在本地硬件上运行应用，新的高效工作管线随之浮现。

编辑器流送利用基础像素流送模块，这意味着熟悉像素流送及其应用程序的用户能够很好地适应编辑器流送。

### 如何使用？

编辑器流送的设计宗旨是尽可能轻松地使用。要开始编辑器流送，请执行以下操作：

1.  确保你启用了像素流送插件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/34e5db6e-6101-4031-99b8-604bfc7c9c3d/pspluginenabled.jpg)
2.  编辑器重启后，你会注意到工具栏上有一个新的"像素流送（Pixel Streaming）"菜单。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c02979ab-092f-43db-bf02-0143c9b7b7f7/pstoolbarexpandedfull.jpg)
3.  打开像素流菜单并点击"流送完整编辑器（Stream Full Editor）"。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/015316f3-9e59-4855-adeb-35ff23187ed0/streamfulleditor.jpg)
4.  好了！现在你的编辑器正在流送。打开浏览器并找到你的公共IP（127.0.0.1适合测试本地流）
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a0d6977b-7c59-4603-b265-ab603806da04/fullbrowserstream.jpg)
5.  再次打开工具栏，你会发现几个IP，可供你从中访问你的流（网络配置允许的情况下）
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d92da379-0754-4879-813c-78205b893e65/connectoptions.jpg)

上述步骤将启动虚幻编辑器中嵌入的信令服务器。如果你更熟悉的工作流程是启动 **PixelStreamingInfrastructure** 仓库（可在此处找到）中的信令服务器，只需选中 **使用远程信令服务器（Use Remote Signaling Server）** 复选框，并输入此信令服务器的IP地址，然后开始流送即可。

### 如何在云中流送我的编辑器？

从云实例流送编辑器的实现方式与流送常规像素流送应用程序大体相同，不过存在一些轻微修改：

-   如果你的应用程序启动参数包含： `-res=1920x1080` 或类似内容，你需要将其替换为 `-EditorPixelStreamingRes=1920x1080`
-   如果你的应用程序启动参数包含： `-resx=1920 -resy=1080` 或类似内容，你需要将其替换为 `-EditorPixelStreamingResX=1920 -EditorPixelStreamingResY=1080`
-   如果你的应用程序启动参数包含： `-Renderoffscreen` ，你需要添加 -EditorPixelStreamingStartOnLaunch=true\` 以开始流送，而无需与工具栏交互
-   如果你想使用引擎中嵌入的服务器之外的信令服务器，你需要添加 `-EditorPixelStreamingUseRemoteSignallingServer=true`
-   最终命令类似于以下示例： `Engine\Binaries\Win64\UnrealEditor-Cmd.exe -project Path\To\Your\Project.uproject -RenderOffscreen -EditorPixelStreamingRes=1920x1080 -EditorPixelStreamingStartOnLaunch=true -PixelStreamingURL=ws://127.0.0.1:8888`

在屏幕外渲染时的编辑器流送当前是试验性的，可能不稳定。

### 流送关卡编辑器

除了完整编辑器流送，我们还添加了专门流送编辑器关卡视口的选项。仅流送关卡视口时，连接的对等端不会看到周围元素，包括但不限于大纲视图、内容浏览器和一切弹出菜单。

要使用关卡流送，只需从工具栏选项选择 **流送关卡编辑器（Stream Level Editor）** 而不是 **流送完整编辑器（Stream Full Editor）**。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c299fa02-e480-4212-a0b3-6d289f45517c/streamleveleditor.jpg)

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [guide](https://dev.epicgames.com/community/search?query=guide)
-   [pixel streaming](https://dev.epicgames.com/community/search?query=pixel%20streaming)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [像素流送工具栏](/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor#%E5%83%8F%E7%B4%A0%E6%B5%81%E9%80%81%E5%B7%A5%E5%85%B7%E6%A0%8F)
-   [使用远程信令服务器](/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor#%E4%BD%BF%E7%94%A8%E8%BF%9C%E7%A8%8B%E4%BF%A1%E4%BB%A4%E6%9C%8D%E5%8A%A1%E5%99%A8)
-   [嵌入式信令服务器选项](/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor#%E5%B5%8C%E5%85%A5%E5%BC%8F%E4%BF%A1%E4%BB%A4%E6%9C%8D%E5%8A%A1%E5%99%A8%E9%80%89%E9%A1%B9)
-   [虚拟摄像机](/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor#%E8%99%9A%E6%8B%9F%E6%91%84%E5%83%8F%E6%9C%BA)
-   [编码解码器](/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor#%E7%BC%96%E7%A0%81%E8%A7%A3%E7%A0%81%E5%99%A8)
-   [编辑器流送](/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor#%E7%BC%96%E8%BE%91%E5%99%A8%E6%B5%81%E9%80%81)
-   [如何使用？](/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%EF%BC%9F)
-   [如何在云中流送我的编辑器？](/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor#%E5%A6%82%E4%BD%95%E5%9C%A8%E4%BA%91%E4%B8%AD%E6%B5%81%E9%80%81%E6%88%91%E7%9A%84%E7%BC%96%E8%BE%91%E5%99%A8%EF%BC%9F)
-   [流送关卡编辑器](/documentation/zh-cn/unreal-engine/pixel-streaming-in-editor#%E6%B5%81%E9%80%81%E5%85%B3%E5%8D%A1%E7%BC%96%E8%BE%91%E5%99%A8)