# 从源代码构建虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/building-unreal-engine-from-source
> 
> 生成时间: 2025-06-14T19:39:15.835Z

---

目录

![从源代码构建虚幻引擎](https://dev.epicgames.com/community/api/documentation/image/9270b66d-65b0-45ab-b14c-2eea235dd1b8?resizing_type=fill&width=1920&height=335)

选择操作系统：

Windows macOS Linux

## 从源代码构建虚幻引擎

阅读[](/documentation/404)，确保已安装好 **Microsoft Visual Studio**，然后再从源代码构建 **虚幻引擎（UE）**。此外，根据系统配置，可能需要10-40分钟来编译引擎。

1.  在[下载并调整UE源代码](/documentation/zh-cn/unreal-engine/downloading-source-code-in-unreal-engine#downloadingthesourcecode)的根目录中，运行 `GenerateProjectFiles.bat` 来设置项目文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/47058cf6-bf01-406e-9d2b-3f5d69d68fa4/01_generateprojectfiles.png)
    
    所有项目文件都是中间文件（`[UERoot]\Engine\Intermediate\ProjectFiles`）。每次同步新构建时都必须生成项目文件，以确保它们是最新文件。如果你删除了`Intermediate`文件夹，必须使用 `GenerateProjectFiles` 批处理文件来重新生成项目文件。
    
2.  双击 `UE5.sln` 将项目加载到Visual Studio。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/65d5e467-bb2a-4b78-8621-4a4a48e238bd/02_launchue5vs.png)
3.  将解决方案配置设置为 **开发编辑器（Development Editor）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/89705287-49d1-4eb4-a877-9a8cad8a38ec/03_solutionconfig.png)
4.  将解决方案平台设置为 **Win64**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a89ea18c-9381-43cb-9406-d2f03b3021cb/04_solutionplatform.png)
5.  右键单击UE目标并选择 **构建（Build）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cae708d4-e5e6-4c7c-9062-9c6a84793cd4/05_buildue.png)

阅读 [](/documentation/404), 确保安装了 **XCode** ，然后再从源代码构建 **虚幻引擎（UE）**。此外，根据系统配置，可能需要10-40分钟来编译引擎。

1.  在根目录中，运行 `GenerateProjectFiles.command` 来设置项目文件。
    
2.  双击 `UE4.xcodeproj`， 将项目加载到XCode。
    
3.  要设置构建目标，从标题栏中的 **My Mac** 下选择 **UnrealEditor - Mac**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0c0f16d4-b646-4c81-aae0-381ba6c7e228/settingmactarget.png)
4.  要构建项目，选择 **产品（Product）>构建（Build）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2c5c708-0680-4b35-b1b0-06b9c74b1c57/buildingmaceditor.png)

**虚幻引擎（UE）** 的开发和支持团队目前使用最新版 **Ubuntu**；因此，我们可能无法提供对其他Linux分发版的支持（包括其他版本的Ubuntu）。此外，请阅读[](/documentation/404)，确保系统包含至少100GB磁盘空间，然后 再执行以下步骤。

1.  在根目录中，从终端运行 `Setup.sh` 以设置生成项目文件所需的文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6e10fcc1-bede-44f8-ba3b-62554b1c513c/runsetupshellscript_linux.png)
2.  现在，从终端运行 `GenerateProjectFiles.sh` 以生成项目文件。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0fd5a677-45a0-4b33-9421-0f56aefec530/rungenprjfilesshellscript_linux.png)
3.  要构建项目，从终端运行 **make**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1ca3708b-26e3-4483-b507-15c96cb203b1/runmakefile_linux.png)

根据系统配置，编译引擎可能需要花费十分钟到超过一个小时不等的时间。 如果要缩短从源代码编译引擎花费的时间，我们建议你在内存至少为8GB且处理器至少为8核（包括超线程）的机器上编译源代码。

## 运行编辑器

1.  右键点击 **UE5** 目标并选择 **设置为启动项目（Set as StartUp Project）** 以设置启动项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0da60049-354f-4315-9dfd-30ddf073ecf6/06_setstartupproj.png)
2.  右键点击 **UE5** 项目，选择 **Debug > 启动新实例（Start New Instance）** 以启动编辑器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/70fde722-4a19-4186-a8aa-63ae0ba7caa9/07_startnewinstance.png)
    
    或者，你可以按键盘上的 **F5键** 来启动编辑器的新实例。
    
3.  恭喜！你已经从源代码编译并启动了引擎。
    

1.  选择 **产品（Product）>运行（Run）** 以启动编辑器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c4993e85-237e-4c81-a482-3ea06d539d3b/runningmaceditor.png)
2.  恭喜！你已经从源代码编译并启动了引擎。
    

1.  在终端中输入`cd Engine/Binaries/Linux/`来导航到编辑器的二进制路径。
    
2.  运行 **UnrealEditor** 来启动编辑器。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8025445a-8155-4c3f-8580-dbee93c7c74b/runue4editor_linux.png)
3.  恭喜！你已经通过编译源代码启动了引擎。
    

## 开始虚幻引擎之旅

要了解如何使用虚幻引擎，请参阅[理解基础知识](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine)文档！

如果希望快速上手使用虚幻引擎，请参阅以下教程：

-   [编程快速入门](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start)
-   [关卡设计师快速入门](/documentation/zh-cn/unreal-engine/level-designer-quick-start-in-unreal-engine)

UE的编辑器内帮助功能能够回答你的一些问题。

-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [unreal build system](https://dev.epicgames.com/community/search?query=unreal%20build%20system)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [从源代码构建虚幻引擎](/documentation/zh-cn/unreal-engine/building-unreal-engine-from-source#%E4%BB%8E%E6%BA%90%E4%BB%A3%E7%A0%81%E6%9E%84%E5%BB%BA%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E)
-   [运行编辑器](/documentation/zh-cn/unreal-engine/building-unreal-engine-from-source#%E8%BF%90%E8%A1%8C%E7%BC%96%E8%BE%91%E5%99%A8)
-   [开始虚幻引擎之旅](/documentation/zh-cn/unreal-engine/building-unreal-engine-from-source#%E5%BC%80%E5%A7%8B%E8%99%9A%E5%B9%BB%E5%BC%95%E6%93%8E%E4%B9%8B%E6%97%85)

相关文档

[

理解基础知识

![理解基础知识](https://dev.epicgames.com/community/api/documentation/image/e2813097-11a1-4faa-bead-71ca530b33ad?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/understanding-the-basics-of-unreal-engine)

[

编程快速入门

![编程快速入门](https://dev.epicgames.com/community/api/documentation/image/a2bfce20-0067-47ed-9d7a-4f6ed6935e20?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/unreal-engine-cpp-quick-start)

[

关卡设计师快速入门

![关卡设计师快速入门](https://dev.epicgames.com/community/api/documentation/image/d0e5be04-01f2-401a-93b0-880c7db518c4?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/level-designer-quick-start-in-unreal-engine)

[

用虚幻构建管线

![用虚幻构建管线](https://dev.epicgames.com/community/api/documentation/image/70490326-3d75-4e0b-9241-f9e69785a626?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/using-the-unreal-engine-build-pipeline)