# Unity转虚幻引擎常见问题解答（FAQ） | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq
> 
> 生成时间: 2025-06-14T18:51:39.407Z

---

目录

![常见问题解答](https://dev.epicgames.com/community/api/documentation/image/abb4fd6e-bb5b-4d37-b1d7-9a1bb5ecf3db?resizing_type=fill&width=1920&height=335)

### 如何自动加载上一个项目？

你可以将虚幻引擎配置为在启动时自动加载你之前处理的最后一个项目。从Epic启动程序打开项目时，在虚幻引擎启动屏幕上启用 **在启动时总是加载最后一个项目（Always Load Last Project on Startup）** 选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5856181d-a058-48b3-8d9b-31231ad1c215/always-load-last-project-at-startup.png)

### 哪里可以设置游戏的输入绑定？

在Unity中，你使用项目的输入管理器设置来设置默认绑定。

在虚幻引擎中，你从 **项目设置（Project Settings）** 窗口中的 **输入（Input）** 类别配置输入绑定。在此窗口中，你可以添加各种按钮（操作）和模拟功能按钮（轴）。为每个功能按钮提供名称和默认绑定。这样做之后，你就可以在触发输入事件时获得对游戏的Pawn的回调。

如需详细了解如何设置虚幻引擎项目的输入，请参阅[输入](/documentation/zh-cn/unreal-engine/input-in-unreal-engine)页面。

如果你的项目需要更多高级输入功能，如复杂输入处理或运行时控制重映射，请考虑使用 **Enhanced Input** 插件。更多详情请参阅[增强输入](/documentation/zh-cn/unreal-engine/enhanced-input-in-unreal-engine)。

### 如何更改项目的初始场景？

默认情况下，虚幻引擎会在你打开项目时加载默认关卡。你可以在 **编辑器偏好设置（Editor Preferences）** 窗口（主菜单： **编辑（Edit） > 编辑器偏好设置（Editor Preferences）** ）的 **通用（General）> 加载和保存（Loading & Saving）** 类别中更改此行为。

### 如何运行游戏？

有多种方式可试玩（运行）你的游戏：

-   直接在虚幻编辑器中运行，方法是点击 **主工具栏** 上的 **运行（Play）** 按钮。
    
-   作为独立的程序运行，方法是点击 **主工具栏** 上的 **平台（Platforms）** 按钮，然后从下拉列表中选择你的机器。请注意，这会首先为你的平台编译一个可执行文件；例如，如果你在Windows机器上工作，这将构建Windows可执行文件。
    
-   在不同的平台（例如，移动设备或Web浏览器）上运行，方法是点击 **主工具栏（Main Toolbar）** 上的 **平台（Platforms）** 按钮，然后选择你想运行游戏的平台。请注意，你需要首先安装所有必需的软件。
    

如需详细了解如何在不同的平台上运行虚幻引擎游戏，请参阅以下页面：

-   [运行和模拟](/documentation/zh-cn/unreal-engine/playing-and-simulating-in-unreal-engine)
    
-   [在虚幻编辑器中管理平台](/documentation/zh-cn/unreal-engine/using-the-platforms-dropdown-in-unreal-editor)
    

### 虚幻引擎使用什么测量单位？

在Unity中，主要的测量单位是一米。在虚幻引擎中，主要测量单位是一厘米。

因此，在Unity中移动一个单位（米）相当于在虚幻引擎中移动100个单位（厘米）。

如果你想在Unity中移动2英尺，那就是0.61个单位（米）。在虚幻引擎中，这相当于61个单位（厘米）。

### 在虚幻引擎的坐标系中，哪个方向是上？

Unity和虚幻引擎都使用左手坐标系，但坐标轴的命名方式不同。在虚幻引擎中，X的正方向是"前"，Y的正方向是"右"，Z的正方向是"上"。

更多详情请参阅[坐标体系与空间](/documentation/zh-cn/unreal-engine/coordinate-system-and-spaces-in-unreal-engine)。

### 如何查看游戏的输出日志？

点击 **底部工具栏** 中的 **输出日志（Output Log）** 按钮。

### 如何抛出异常？

不同于Unity，虚幻引擎并不处理异常。请改用 `check()` 函数来触发严重的断言错误。你可以传入错误信息提示。如果你想报告错误，但不希望打断程序，请改用 `ensure()`。这将记录一个带有完整调用堆栈的错误信息，但程序会继续执行。如果你附加了调试器，那么这两个函数都会中断并进入调试器。

### .NET Framework在哪里？

不同于Unity，虚幻引擎并不使用.NET Framework。虚幻引擎有自己的一套容器类和库。下面列出了常见的容器比较：

.Net Framework

虚幻引擎

String

[FString](https://docs.unrealengine.com/latest/INT/API/API/Runtime/Core/Containers/FString), [FText](https://docs.unrealengine.com/latest/INT/API/API/Runtime/Core/Internationalization/FText)

List

[TArray](https://docs.unrealengine.com/latest/INT/API/API/Runtime/Core/Containers/TArray)

Dictionary

[TMap](https://docs.unrealengine.com/latest/INT/API/API/Runtime/Core/Containers/TMap)

HashSet

[TSet](https://docs.unrealengine.com/latest/INT/API/API/Runtime/Core/Containers/TSet)

你可以在[此处](/documentation/zh-cn/unreal-engine/API/Runtime/Core/Containers)详细了解虚幻引擎的其他容器。

### 代码更改时虚幻引擎是否会自动重新加载？

会！你在编写代码时，可以将编辑器保持开启的状态。完成代码编辑后，从Visual Studio启动编译，编辑器将自动"热重新加载"你的更改。

-   [unity](https://dev.epicgames.com/community/search?query=unity)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [如何自动加载上一个项目？](/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq#%E5%A6%82%E4%BD%95%E8%87%AA%E5%8A%A8%E5%8A%A0%E8%BD%BD%E4%B8%8A%E4%B8%80%E4%B8%AA%E9%A1%B9%E7%9B%AE%EF%BC%9F)
-   [哪里可以设置游戏的输入绑定？](/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq#%E5%93%AA%E9%87%8C%E5%8F%AF%E4%BB%A5%E8%AE%BE%E7%BD%AE%E6%B8%B8%E6%88%8F%E7%9A%84%E8%BE%93%E5%85%A5%E7%BB%91%E5%AE%9A%EF%BC%9F)
-   [如何更改项目的初始场景？](/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq#%E5%A6%82%E4%BD%95%E6%9B%B4%E6%94%B9%E9%A1%B9%E7%9B%AE%E7%9A%84%E5%88%9D%E5%A7%8B%E5%9C%BA%E6%99%AF%EF%BC%9F)
-   [如何运行游戏？](/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq#%E5%A6%82%E4%BD%95%E8%BF%90%E8%A1%8C%E6%B8%B8%E6%88%8F%EF%BC%9F)
-   [虚幻引擎使用什么测量单位？](/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq#%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%BD%BF%E7%94%A8%E4%BB%80%E4%B9%88%E6%B5%8B%E9%87%8F%E5%8D%95%E4%BD%8D%EF%BC%9F)
-   [在虚幻引擎的坐标系中，哪个方向是上？](/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq#%E5%9C%A8%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E7%9A%84%E5%9D%90%E6%A0%87%E7%B3%BB%E4%B8%AD%EF%BC%8C%E5%93%AA%E4%B8%AA%E6%96%B9%E5%90%91%E6%98%AF%E4%B8%8A%EF%BC%9F)
-   [如何查看游戏的输出日志？](/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq#%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E6%B8%B8%E6%88%8F%E7%9A%84%E8%BE%93%E5%87%BA%E6%97%A5%E5%BF%97%EF%BC%9F)
-   [如何抛出异常？](/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq#%E5%A6%82%E4%BD%95%E6%8A%9B%E5%87%BA%E5%BC%82%E5%B8%B8%EF%BC%9F)
-   [.NET Framework在哪里？](/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq#netframework%E5%9C%A8%E5%93%AA%E9%87%8C%EF%BC%9F)
-   [代码更改时虚幻引擎是否会自动重新加载？](/documentation/zh-cn/unreal-engine/unity-to-unreal-engine-frequently-asked-questions-faq#%E4%BB%A3%E7%A0%81%E6%9B%B4%E6%94%B9%E6%97%B6%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E6%98%AF%E5%90%A6%E4%BC%9A%E8%87%AA%E5%8A%A8%E9%87%8D%E6%96%B0%E5%8A%A0%E8%BD%BD%EF%BC%9F)