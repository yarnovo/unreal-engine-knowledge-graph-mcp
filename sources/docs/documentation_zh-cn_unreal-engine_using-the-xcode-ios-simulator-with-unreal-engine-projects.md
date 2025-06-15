# 将Xcode iOS模拟器用于虚幻引擎项目。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-xcode-ios-simulator-with-unreal-engine-projects
> 
> 生成时间: 2025-06-14T20:00:31.038Z

---

目录

![使用Xcode iOS模拟器](https://dev.epicgames.com/community/api/documentation/image/b87399a4-fcd2-4ae3-b2e8-46889048618d?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

Xcode的 **iOS模拟器（iOS Simulator）** 可以在你的Mac台式机上启动一台虚拟iPhone或iPad设备，让你在更大范围的环境上测试应用程序，而无需囤积大量实体测试设备。本文将介绍如何使用iOS模拟器，从Xcode或直接从虚幻编辑器启用 **虚幻引擎（UE）** 项目。

## 先决条件

根据本指南，你必须具备以下条件：

-   一台安装了虚幻引擎以及版本符合要求的Xcode的Apple Silicon Mac（M1/M2/M3）计算机。详情请参阅[iOS开发要求](/documentation/404)一文。
    -   必须用你的Apple开发者账号登录Xcode。
    -   预安装了Xcode模拟器。详情请参阅[Apple开发者文档](https://developer.apple.com/documentation/xcode/installing-additional-simulator-runtimes)。
    -   推荐使用自动代码签名。
-   一个设置为移动平台（Mobile）的UE项目。你可以使用第三或第一人称模板快速创建一个测试用的新项目。
    
-   一台用于初始设置的iOS或iPadOS设备。

关于设置这些先决条件的更多详情，请参阅[在Xcode中调试](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine)一文。

## 虚幻编辑器中的初始设置

在使用iOS模拟器前，请按以下步骤启用必须的设置并准备好项目内容：

1.  打开"项目设置（Project Settings）> 平台（Platforms）> iOS设置（iOS Settings）"。启用以下设置：
    
    -   **构建（Build）** > **启用iOS模拟器支持（Enable iOS Simulator Support）**
        
    -   **构建（Build）** > **支持Apple A8（Support Apple A8）**
        
2.  重启虚幻编辑器，使改动生效。
    

## 在Xcode中使用iOS模拟器。

要在iOS或iPadOS模拟器中从Xcode启动游戏，请按以下步骤操作：

1.  Xcode本身不会烘焙内容，因此你需要使用虚幻编辑器来运行烘焙操作，然后才能在Xcode外启动应用程序。在喜欢编辑器中，点击 **平台（Platforms）** > **iOS** > **烘焙内容（Cook Content）**，为iOS和iPadOS烘焙项目内容。或者，你也可以在实体iOS或iPadOS中快速启动它。
    
2.  启动 **Xcode** 并加载项目 `UE5 (IOS).workspace`。
    
3.  在 **Xcode方案（Xcode scheme）** 下拉菜单中选择合适的 **目标（Target）** （即项目名称）。
    
    -   如 **TP\_FirstPerson**。
4.  点击 **编辑方案（Edit Scheme）**，选择 **诊断（Diagnostics）** > **运行（Run）** 并禁用 **Metal API验证（Metal API Validation）**。
    
5.  点击 **启动目的端（launch destinations）** 下拉菜单并选择一个要启动的模拟器。这与你选择要在其上运行项目的iPhone或平台时使用的是同一个菜单。
    
6.  按下 **运行（Run）** 按钮编译你的项目并在所选的编辑器上启动它。
    

## 从虚幻编辑器启动iOS模拟器（实验性）

由于从编辑器启动iOS模拟器还是实验性功能，不是所有的UE静态库都更新了iOS模拟器切片。

要在iOS或iPadOS模拟器中从虚幻编辑器启动游戏，请按以下步骤操作：

1.  从Xcode启动一个iOS/iPadOS模拟器。虚幻编辑器会在模拟器运行时检测到它，并将其添加为目标设备，以便你在下一步中在其上启动游戏。
    
2.  点击 **平台（Platforms）** 下拉菜单，然后在 **快速启动（Quick Launch）** 分段下找到新的 **模拟器（Simulators）** 分段。你正在运行的所有模拟器都会出现在此处。
    
    ![出现在虚幻编辑器启动下拉菜单中的iPad Mini](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f66085a3-f276-46c5-95c0-a7ff5293122d/launch_editor.png)
3.  选好后，UE会为应用程序创建一个模拟器专用的构件，并将其安装到打开的模拟器上。
    
    ![出现在桌面上的iOS模拟器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d86fe68c-c70b-4b64-88ca-78f16071d99b/simulator_screenshot.png)
4.  在模拟器中选择应用程序并启动它。
    
    ![用户在iOS模拟器中启动其UE应用程序。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/35f9ea85-8b3d-41c6-b1ea-71e6852408ba/simulator_working.gif)

## 升级现有项目以使用iOS模拟器

如果你要向已经编译并烘焙的项目添加iOS模拟器支持，那么在启用iOS模拟器支持的情况下尝试编译时，你可能会由于着色器库的问题而遇到错误。要修复这些错误，请在启用“启用iOS模拟器支持（Enable iOS Simulator Support）”设置后删除你的项目中所有的烘焙内容，然后重新将你的项目启动到你的iOS设备。

相较于实体设备，iOS模拟器需要的着色器库不同，因此UE项目会创建两个金属库：一个是标准库，一个是模拟器的金属模拟（Metal-Sim）。

## 运行多个实例

你最多可以同时为你的应用程序运行六个iOS模拟器。运行多个模拟器适合用于比较不同iOS版本之间的渲染问题。要查看你当前正在使用哪些模拟器，请点击工具栏中的 **窗口（Window）** 按钮。

在同时运行iOS模拟器的三个或更多实例时，你的系统速度会大幅减慢。

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)
-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [ipados](https://dev.epicgames.com/community/search?query=ipados)
-   [xcode](https://dev.epicgames.com/community/search?query=xcode)
-   [iphone](https://dev.epicgames.com/community/search?query=iphone)
-   [ipad](https://dev.epicgames.com/community/search?query=ipad)
-   [ios simulator](https://dev.epicgames.com/community/search?query=ios%20simulator)
-   [ipad simulator](https://dev.epicgames.com/community/search?query=ipad%20simulator)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/using-the-xcode-ios-simulator-with-unreal-engine-projects#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [虚幻编辑器中的初始设置](/documentation/zh-cn/unreal-engine/using-the-xcode-ios-simulator-with-unreal-engine-projects#%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E4%B8%AD%E7%9A%84%E5%88%9D%E5%A7%8B%E8%AE%BE%E7%BD%AE)
-   [在Xcode中使用iOS模拟器。](/documentation/zh-cn/unreal-engine/using-the-xcode-ios-simulator-with-unreal-engine-projects#%E5%9C%A8xcode%E4%B8%AD%E4%BD%BF%E7%94%A8ios%E6%A8%A1%E6%8B%9F%E5%99%A8%E3%80%82)
-   [从虚幻编辑器启动iOS模拟器（实验性）](/documentation/zh-cn/unreal-engine/using-the-xcode-ios-simulator-with-unreal-engine-projects#%E4%BB%8E%E8%99%9A%E5%B9%BB%E7%BC%96%E8%BE%91%E5%99%A8%E5%90%AF%E5%8A%A8ios%E6%A8%A1%E6%8B%9F%E5%99%A8%EF%BC%88%E5%AE%9E%E9%AA%8C%E6%80%A7%EF%BC%89)
-   [升级现有项目以使用iOS模拟器](/documentation/zh-cn/unreal-engine/using-the-xcode-ios-simulator-with-unreal-engine-projects#%E5%8D%87%E7%BA%A7%E7%8E%B0%E6%9C%89%E9%A1%B9%E7%9B%AE%E4%BB%A5%E4%BD%BF%E7%94%A8ios%E6%A8%A1%E6%8B%9F%E5%99%A8)
-   [运行多个实例](/documentation/zh-cn/unreal-engine/using-the-xcode-ios-simulator-with-unreal-engine-projects#%E8%BF%90%E8%A1%8C%E5%A4%9A%E4%B8%AA%E5%AE%9E%E4%BE%8B)