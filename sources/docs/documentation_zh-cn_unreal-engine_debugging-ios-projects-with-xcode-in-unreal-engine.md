# 在虚幻引擎中使用Xcode调试iOS项目 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:00:02.274Z

---

目录

![使用Xcode调试iOS项目](https://dev.epicgames.com/community/api/documentation/image/3f239f9d-efe7-4197-9288-5f0000f0c46a?resizing_type=fill&width=1920&height=335)

你需要一台运行 **Xcode** 的 **macOS** 设备，才能在iOS、tvOS和iPadOS设备上启动 **虚幻引擎（UE）** 应用程序的调试版本进行测试。但你需要使用虚幻编辑器烘焙内容，以将版本完整打包和敲定。为了满足这些要求，你需要使用专门的工作流程为版本做调试准备，然后再返回Xcode将它启动，而不是一个步骤内完成打包和启动操作。

本页面将说明此工作流程和UE提供的可精简此过程的工具，包括无需先创建编辑器版本即可启动调试版本的方法。

## 1\. 必要设置

iOS的调试工作流程有以下要求：

-   一台安装了Xcode的macOS机器。macOS和Xcode都必须符合最新的iOS[开发要求](/documentation/404)。
    
-   你的应用的 **代码签名证书** 和 **预配配置文件** 。如果不符合这些要求，你的版本将无法部署到iOS设备。如需了解有关此过程的更多信息，请参阅[iOS预配](/documentation/zh-cn/unreal-engine/setting-up-ios-tvos-and-ipados-provisioning-profiles-and-signing-certificates-for-unreal-engine-projects)。
    
-   你的应用的Xcode项目（ `.xcodeproj` ）。如果你还没有Xcode项目，请找到项目的 `.uproject` 文件，右键点击它，然后选择 **生成Xcode项目（Generate Xcode Project）** 。
    
-   如果你想跳过创建编辑器版本，需要将来自另一台计算机的已烘焙数据注入你的版本。这些数据必须包含在你的项目的 **Binaries/iOS** 或 **Binaries/tvOS** 文件夹中。
    

## 2\. 工作流程摘要

iOS、tvOS或iPadOS上的调试工作流程如下：

1.  为iOS/tvOS烘焙内容。你可以直接在macOS计算机上执行此操作，也可以使用另一台计算机。
    
2.  使用 **做调试准备（Prepare for Debugging）** 命令将已烘焙数据注入在构建过程中创建的Xcode负载（.IPA）中。
    
3.  使用Xcode利用.IPA创建一个版本，并从你的macOS计算机启动该版本。
    

## 3\. 为iOS烘焙内容

虽然Xcode可以创建和启动调试版本，但它无法烘焙内容。因此，你需要从另一台计算机导入已烘焙内容，或者构建虚幻编辑器并使用它在你的macOS计算机上烘焙内容。

### 3A. 从另一台计算机导入已烘焙内容

如果已有可用于你的版本的已烘焙内容，则可以跳过构建虚幻编辑器和烘焙内容。如果你的团队共享了构建资源（例如构建场），或者在版本控制系统上托管了项目的二进制文件，则很可能会出现这种情况。这些文件应该位于 **Binaries/iOS** 或 **Binaries/tvOS** 文件夹中。

如果你需要手动将已烘焙文件引入到项目中，请将.IPA文件从另一台计算机复制并粘贴到项目的Binaries/iOS或Binaries/tvOS文件夹中。

### 3B. 在你的macOS计算机上烘焙内容

如需在你的macOS计算机上烘焙内容，请执行以下步骤：

1.  在虚幻编辑器中打开你的项目。如果你使用的是虚幻引擎的源代码版本，则需要从Xcode构建它。
    
2.  使用 **平台（Platforms）** 下拉列表中的以下选项之一：
    
    -   对于iOS和iPadOS：
        
        -   **平台（Platforms）** > **iOS** \> **烘焙内容（Cook Content）**
            
        -   **平台（Platforms）** > **iOS** \> **打包项目（Package Project）**
            
    -   对于tvOS：
        
        -   **平台（Platforms）** > **tvOS** \> **烘焙内容（Cook Content）**
            
        -   **平台（Platforms）** > **tvOS** \> **打包项目（Package Project）**
            

你还可以使用 `RunUAT.command` 脚本从命令行运行 `BuildCookRun` 命令。下面是一个仅烘焙命令的示例：

```cpp
RunUAT.sh BuildCookRun -project=[ProjectName] -platform=iOS -build -cook -stage -pak -package -skipbuild
```

如需了解更多信息，请参阅[构建操作和烘焙内容](/documentation/zh-cn/unreal-engine/build-operations-cooking-packaging-deploying-and-running-projects-in-unreal-engine)。

## 4\. 做调试准备

**做调试准备（Prepare for Debugging）** 命令会将之前烘焙的数据从Xcode注入到版本中，生成一个.IPA文件，你可以使用该文件在目标设备上从Xcode启动版本。此命令对项目的调试管线进行了两方面的精简：

-   做调试准备（Prepare for Debugging）将自动处理调试版本的创建，无需重新配置你的Xcode项目。
    
-   只用于少量Mac计算机的项目可以从其他计算机导入已烘焙数据。这样便可跳过虚幻编辑器的构建或使用，只需从Xcode启动版本即可。
    

如需使用做调试准备（Prepare for Debugging）命令，你可以通过虚幻编辑器（Unreal Editor）中的 **平台（Platforms）** 下拉菜单运行，也可以通过 **虚幻自动化工具（UAT）（Unreal Automation Tool (UAT)）** 中的 **Turnkey命令行** 运行。下文对这两个过程做了详细说明。

"准备调试"设计为用于远程Mac工作流程，在使用备用远程Mac调试时尤其有助于节省时间。请参阅[远程Mac版本](/documentation/zh-cn/unreal-engine/creating-remote-builds-of-unreal-engine-projects-for-ios)，了解更多详情。

### 4A. 使用命令行做调试准备

你可以在Turnkey命令行中使用 `WrangleContentForDebugging` 命令，以你要使用的项目的名称为参数运行做调试准备（Prepare for Debugging）。下方示例说明了命令的格式：

```cpp
RunUAT.command Turnkey -command=WrangleContentForDebugging -project=[你的.uproject文件的名称]
```

### 4B. 使用平台（Platforms）菜单做调试准备

你可以通过在虚幻编辑器中点击以下选项之一来运行做调试准备（Prepare for Debugging）：

-   **平台（Platforms）** > **iOS** \> **做调试准备（Prepare for Debugging）**
    
-   **平台（Platforms）** > **tvOS** \> **做调试准备（Prepare for Debugging）**
    

![工具栏上平台 > iOS下的做调试准备选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e59f797e-1dfa-4ba9-8c8d-eb85d48f13f0/preparefordebugeditor.png)

## 5.在Xcode中启动你的项目

1.  打开你的应用的Xcode项目。
    
2.  将目标设备从 **我的Mac（My Mac）** 更改为目标iOS或tvOS设备。
    
    ![将目标设备更改为你的测试设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dec3dabf-2f03-4c27-b82e-410bb272f2aa/changetargetdevice.png)
3.  点击 **产品（Product）** > **执行操作（Perform Action）** > **运行（Run）** ，或使用键盘快捷键 **Command** \+ **R** 。此操作将创建一个版本，创建过程中会用到你通过"做调试准备（Prepare for Debugging）"创建的.IPA。
    
    ![产品菜单中的运行选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1dee6732-81c3-4b71-abc5-3f8615a1981a/runproject.png)

完成这些步骤后，项目将在你的设备上构建并启动。在项目中，你可以使用断点、日志和LLDB命令来调试项目并在运行时检查信息。

## 6\. 手动重建你的项目以调试

如果你没有访问"做调试准备（Prepare for Debugging）"命令的权限，可以通过以下步骤手动重建项目以从Xcode调试。在使用以下工作流程之前，你仍须烘焙和打包项目。

1.  打开你的应用的Xcode项目。在Xcode的主菜单中选择 **产品（Product）** > **方案（Scheme）** > **编辑方案（Edit Scheme）** 。
    
    ![工具栏中的产品 > 方案 > 编辑方案选项](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67a8c5f2-1bf9-4998-9bb2-f0d443b04ffd/editproductscheme.png)
2.  点击 **运行（Run）** 类别，然后将 **构建配置（Build Configuration）** 更改为 **调试游戏（DebugGame）** 。
    
    ![调试游戏配置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b283224-8e69-4ab8-ba6b-14e1e974e68e/debuggameconfig.png)
    
    如果你使用的是虚幻引擎的源代码版本，则可以使用 **调试（Debug）** 配置来调试引擎代码。
    
3.  将目标设备从 **我的Mac（My Mac）** 更改为你已连接的 **iPhone** 。
    
    ![将目标设备更改为你的测试设备](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2690362a-4294-42f3-aa27-5bfb0dcc76d9/changetargetdevice.png)
4.  点击 **构建并运行（Build and Run）** 按钮，开始从Xcode构建项目，并在设备上启动它。
    
    ![构建并运行按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a808a775-36ac-4aea-aa43-8e95d5c2e5ea/buildandrunbtn.png)

此操作实现的的结果与"做调试准备（Prepare for Debugging）"工作流程相同。

## 7\. Xcode的调试工具和LLDB

如需详细了解Xcode调试功能的用法，请参阅Apple有关[使用Xcode调试](https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/debugging_with_xcode/chapters/debugging_tools.html)的开发人员文档。

如需详细了解LLDB，请参阅Apple文档档案中的[LLDB入门指南](https://developer.apple.com/library/archive/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html)页面。

-   [testing](https://dev.epicgames.com/community/search?query=testing)
-   [debugging](https://dev.epicgames.com/community/search?query=debugging)
-   [ios](https://dev.epicgames.com/community/search?query=ios)
-   [xcode](https://dev.epicgames.com/community/search?query=xcode)
-   [lldb](https://dev.epicgames.com/community/search?query=lldb)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [1\. 必要设置](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#1%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [2\. 工作流程摘要](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#2%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E6%91%98%E8%A6%81)
-   [3\. 为iOS烘焙内容](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#3%E4%B8%BAios%E7%83%98%E7%84%99%E5%86%85%E5%AE%B9)
-   [3A. 从另一台计算机导入已烘焙内容](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#3a%E4%BB%8E%E5%8F%A6%E4%B8%80%E5%8F%B0%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%AF%BC%E5%85%A5%E5%B7%B2%E7%83%98%E7%84%99%E5%86%85%E5%AE%B9)
-   [3B. 在你的macOS计算机上烘焙内容](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#3b%E5%9C%A8%E4%BD%A0%E7%9A%84macos%E8%AE%A1%E7%AE%97%E6%9C%BA%E4%B8%8A%E7%83%98%E7%84%99%E5%86%85%E5%AE%B9)
-   [4\. 做调试准备](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#4%E5%81%9A%E8%B0%83%E8%AF%95%E5%87%86%E5%A4%87)
-   [4A. 使用命令行做调试准备](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#4a%E4%BD%BF%E7%94%A8%E5%91%BD%E4%BB%A4%E8%A1%8C%E5%81%9A%E8%B0%83%E8%AF%95%E5%87%86%E5%A4%87)
-   [4B. 使用平台（Platforms）菜单做调试准备](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#4b%E4%BD%BF%E7%94%A8%E5%B9%B3%E5%8F%B0%EF%BC%88platforms%EF%BC%89%E8%8F%9C%E5%8D%95%E5%81%9A%E8%B0%83%E8%AF%95%E5%87%86%E5%A4%87)
-   [5.在Xcode中启动你的项目](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#5%E5%9C%A8xcode%E4%B8%AD%E5%90%AF%E5%8A%A8%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE)
-   [6\. 手动重建你的项目以调试](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#6%E6%89%8B%E5%8A%A8%E9%87%8D%E5%BB%BA%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE%E4%BB%A5%E8%B0%83%E8%AF%95)
-   [7\. Xcode的调试工具和LLDB](/documentation/zh-cn/unreal-engine/debugging-ios-projects-with-xcode-in-unreal-engine#7xcode%E7%9A%84%E8%B0%83%E8%AF%95%E5%B7%A5%E5%85%B7%E5%92%8Clldb)