# 在虚幻引擎中访问iOS和tvOS上的日志和崩溃报告 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/accessing-logs-and-crash-reports-on-ios-and-tvos-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:00:05.564Z

---

目录

![访问iOS和tvOS上的日志和崩溃报告](https://dev.epicgames.com/community/api/documentation/image/568266dd-b1fd-44a6-ad3f-51ae382379f1?resizing_type=fill&width=1920&height=335)

# 访问iOS和tvOS日志和崩溃报告

使用虚幻引擎构建的iOS应用程序会生成崩溃日志，可供开发人员调试项目和修复代码问题。但是，出于安全原因，调试符号不可用于崩溃日志本身。你将看到键和编号，但要以人工可读格式看到函数名称或有关变量的信息，你需要将日志匹配到你的项目的符号数据库。

有几个过程可用于重新符号化你的日志并进行读取，具体取决于你是如何将调试版本交付到设备的。**TestFlight** 是Apple的应用程序，用于将测试版本交付到大量可能设备，它将这些版本中的日志提供给开发人员。你还可以直接通过USB调试获取日志。

你需要Mac和Xcode，才能读取iOS项目的日志。其他操作系统和IDE不适用于此页面上的工作流程。

## 1.直接从设备访问日志

如果你是通过USB或以太网直接调试，请执行以下步骤来查看符号化崩溃日志：

1.  在Xcode中，从主菜单选择 **窗口（Window）** > **设备和模拟器（Devices and Simulators）**。
    
2.  点击你要从中获取崩溃数据的iPhone，然后点击 **查看设备日志（View Device Logs）**。
    
3.  按住Control键的同时点击你想读取的日志，然后点击 **重新符号化并导出日志（Re-Symbolicate and export Log）**。
    

这将提供带有调试符号的人工可读格式日志。

## 2.从TestFlight访问日志

应用程序通过TestFlight崩溃交付时，它会生成包含崩溃信息的 **XCrashPoint** 文件。要读取这些文件，你需要有 `.dSYM` 文件，其中包含你的项目的调试符号，然后你需要提取崩溃报告并将其重新符号化。

有关通过TestFlight部署应用程序并访问日志的具体信息，请参阅[Apple关于TestFlight的文档](https://developer.apple.com/testflight/)。本小节将提供有关如何在获取这些日志后将其符号化的信息。

### 在打包过程中生成.dSYM文件

要在打包项目时生成 `.dSYM` 文件，请执行以下步骤：

1.  打开 **虚幻编辑器（Unreal Editor）**。
    
2.  打开 **项目设置（Project Settings）**，然后找到 **平台（Platforms）**\> **iOS** > **构建（Build）**。
    
3.  启用 **生成dSYM文件以用于代码调试和分析（Generate dSYM file for code debugging and profiling）**。
    
    ![选中](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/57375960-4762-4a88-a432-533f85109f5c/generatedysm.png)
4.  打包项目。
    

项目的 `.dSYM` 文件将出现在项目文件夹中的 `/Binaries/iOS` 下。

`.dSYM` 文件有一个时间戳，显示打包的时间。请记录此信息，以便可以将 `.dSYM` 文件匹配到正确的版本。

### 从命令行生成.dSYSM文件

要使用UAT生成.dSYM文件，请使用 **GenerateDYSM** 命令在命令行中执行RunUAT脚本。 应指定以下参数：

参数

可选

有效值

描述

\-Platform=\[目标平台\]

是

IOS、TVOS、Mac

指定目标平台。 如果未指定，则默认为当前平台。

\-Target=\[项目名称\]

是

项目的名称。

指定要使用的项目。 如果未指定，则默认为当前项目。

\-Config=\[构建配置\]

是

Debug、DebugGame、Development、Test、Shipping

目标构建配置。 如果未指定，则默认为Development。

\-Architecture=\[架构类型\]

否

x64、arm64、x64+arm64

目标设备架构。

\-flat

是

不接受输入。

如果指定，.dSYM将是更易于在计算机或服务器之间复制的平面文件。

例如，以下命令将为使用arm64架构的iOS设备生成.dSYM文件：

`RunUAT.command GenerateDYSM -project=MyProject -platform=Mac -target=EngineTestEditor -config=Test -architecutre=arm64`

### 提取崩溃报告并重新符号化

要获取崩溃报告并将其重新符号化，以便你可以进行读取，请执行以下步骤：

1.  从TestFlight获取 `XCrashPoint` 文件。你可以使用以下命令行输入来执行此操作。
    
    ```cpp
             export PATH="/Applications/Xcode.app/Contents/SharedFrameworks/DVTFoundation.framework/Versions/A/Resources:$PATH"
    ```
    
2.  按住Control键的同时点击 `.XCrashPoint` 文件，然后点击 **提取 `.crash` 文件（Extract `.crash` file）**。你还可以使用以下命令行输入来导出此信息：
    
    ```cpp
             export PATH="/Applications/Xcode.app/Contents/SharedFrameworks/DVTFoundation.framework/Versions/A/Resources:$PATH" 
    ```
    
3.  打开XCode，然后查看 **终端（terminal）**。使用它找到你的Xcode `.package`。
    
4.  运行以下命令行来使用symbolicatecrash工具：
    
    ```cpp
             export DEVELOPER_DIR="/Applications/Xcode.app/Contents/Developer" cp -i /Applications/Xcode.app/Contents/SharedFrameworks/DVTFoundation.framework/Versions/A/Resources/symbolicatecrash ././symbolicatecrash unsymbolicated.crash symbols.dSYM > symbolicated.crash
    ```
    

上述说明使用默认目录。运行这些命令行时，请使用你的 `.crash` 和 `.dSYM` 文件的位置。

然后，Xcode将提供显示了函数名称和变量的崩溃日志。

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)
-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [tvos](https://dev.epicgames.com/community/search?query=tvos)
-   [xcode](https://dev.epicgames.com/community/search?query=xcode)
-   [testflight](https://dev.epicgames.com/community/search?query=testflight)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [访问iOS和tvOS日志和崩溃报告](/documentation/zh-cn/unreal-engine/accessing-logs-and-crash-reports-on-ios-and-tvos-in-unreal-engine#%E8%AE%BF%E9%97%AEios%E5%92%8Ctvos%E6%97%A5%E5%BF%97%E5%92%8C%E5%B4%A9%E6%BA%83%E6%8A%A5%E5%91%8A)
-   [1.直接从设备访问日志](/documentation/zh-cn/unreal-engine/accessing-logs-and-crash-reports-on-ios-and-tvos-in-unreal-engine#1%E7%9B%B4%E6%8E%A5%E4%BB%8E%E8%AE%BE%E5%A4%87%E8%AE%BF%E9%97%AE%E6%97%A5%E5%BF%97)
-   [2.从TestFlight访问日志](/documentation/zh-cn/unreal-engine/accessing-logs-and-crash-reports-on-ios-and-tvos-in-unreal-engine#2%E4%BB%8Etestflight%E8%AE%BF%E9%97%AE%E6%97%A5%E5%BF%97)
-   [在打包过程中生成.dSYM文件](/documentation/zh-cn/unreal-engine/accessing-logs-and-crash-reports-on-ios-and-tvos-in-unreal-engine#%E5%9C%A8%E6%89%93%E5%8C%85%E8%BF%87%E7%A8%8B%E4%B8%AD%E7%94%9F%E6%88%90dsym%E6%96%87%E4%BB%B6)
-   [从命令行生成.dSYSM文件](/documentation/zh-cn/unreal-engine/accessing-logs-and-crash-reports-on-ios-and-tvos-in-unreal-engine#%E4%BB%8E%E5%91%BD%E4%BB%A4%E8%A1%8C%E7%94%9F%E6%88%90dsysm%E6%96%87%E4%BB%B6)
-   [提取崩溃报告并重新符号化](/documentation/zh-cn/unreal-engine/accessing-logs-and-crash-reports-on-ios-and-tvos-in-unreal-engine#%E6%8F%90%E5%8F%96%E5%B4%A9%E6%BA%83%E6%8A%A5%E5%91%8A%E5%B9%B6%E9%87%8D%E6%96%B0%E7%AC%A6%E5%8F%B7%E5%8C%96)