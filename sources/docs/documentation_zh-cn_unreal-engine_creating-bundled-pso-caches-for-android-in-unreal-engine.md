# 在虚幻引擎中为Android创建捆绑的PSO缓存 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-bundled-pso-caches-for-android-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:00:00.069Z

---

目录

![为Android创建捆绑的PSO缓存](https://dev.epicgames.com/community/api/documentation/image/d89a897a-4d97-4bfd-8121-6b4914eef6d0?resizing_type=fill&width=1920&height=335)

[PSO缓存](/documentation/zh-cn/unreal-engine/optimizing-rendering-with-pso-caches-in-unreal-engine)可提前为你的应用创建并存储最常用的管线状态对象数据，以提高渲染性能，尤其是在运行应用程序时减少卡顿。本指南提供了在虚幻引擎（UE）中为Android项目实现PSO缓存的操作说明。

本页面提供了捆绑的PSO缓存方法的说明，该方法是UE 5.2及更早版本中使用的旧版手动PSO缓存系统。我们推荐使用5.3及更新版本中的PSO预缓存系统（如果对你的项目可行）。请参阅[PSO预缓存的文档](/documentation/zh-cn/unreal-engine/pso-precaching-for-unreal-engine)，了解更多详情。

## 必要设置

要学习本指南，你需要以下内容：

-   [以Android为目标平台](/documentation/zh-cn/unreal-engine/setting-up-unreal-engine-projects-for-android-development)设置的虚幻引擎项目。
    
-   兼容你当前虚幻引擎版本的[Android SDK和NDK](/documentation/zh-cn/unreal-engine/advanced-setup-and-troubleshooting-guide-for-using-android-sdk)版本。
    
-   启用了[开发者模式和USB调试](/documentation/zh-cn/unreal-engine/setting-up-your-android-device-for-developing-applications-in-unreal-engine)的兼容Android测试设备。
    

如需详细了解哪些Android设备兼容你的虚幻引擎版本，请参阅[Android开发要求](/documentation/404)

## 为PSO缓存进行项目设置

要配置你的项目设置以支持PSO缓存，请执行以下步骤：

1.  在虚幻编辑器中打开你的项目。
    
2.  打开 **编辑（Edit）** > **项目设置（Project Settings）** 。
    
3.  找到 **项目（Project）** > **封装（Packaging）** ，并确保 **共享材质着色器代码（Share Material Shader Code）** 和 **共享材质原生库（Shared Material Native Libraries）** 都已启用。
    
4.  在下一步中，你需要手动编辑配置文件。因此请先关闭虚幻编辑器，以免你的手动编辑与项目设置冲突。
    
5.  打开项目的 `Config/Android` 文件夹，然后打开 `AndroidEngine.ini` 。添加以下设置：
    
    ```cpp
    		
         [DevOptions.Shaders]
         NeedsShaderStableKeys=true
    		
    ```
    

## 运行你的游戏并收集PSO

现在你的项目设置已兼容PSO缓存，请在启用 `-logPSO` 命令行的情况下运行项目版本。

1.  确保你的测试设备已连接到你的计算机。
    
2.  在虚幻编辑器中打开你的项目。
    
3.  点击 **平台（Platforms）** > **项目启动程序（Project Launcher）** 。
    
4.  在项目启动程序中，点击 **\+ 添加（Add）** > **创建自定义配置文件（Create Custom Profile）** ，创建新的启动配置文件。
    
    ![在项目启动程序中，用户选择](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bbd52f0e-35a3-44d5-8a83-0cd7f6c5bfd6/createcustomprofile.png)
5.  将你的配置文件重命名为 **PSO Caching - ETC2** 。
    
6.  在 **你想如何烘焙内容？（How would you like to cook your content?）** 旁边的下拉菜单中，点击 **按常规烘焙（Cook by the Book）** 。
    
7.  选择 **Android\_ETC2** 作为你的目标平台。
    
    ![在项目启动程序中，](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/097474c9-07a4-4dd8-833d-76c9fe8a7bd1/androidetc2.png)
8.  在 **部署（Deploy）** 下，选择你的移动设备作为目标设备，并将 **变体（Variant）** 设置为 **Android\_ETC2** 。
    
9.  在 **启动（Launch）** 类别下，将 `-logPSO` 命令添加到 **额外命令行参数（Additional Command Line Parameters）** 。
    
    ![-logPSO命令添加到额外命令行参数](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c35d029-2f21-491c-8493-d58ebbd9f07d/logpso.png)
    
    你可以使用 **Android文件服务器（Android File Server (AFS)）** 将 `-logPSO` 命令添加到你设备上的现有应用版本中的 `UECommandLine.txt` 文件。如需更多详情，请参阅[AFS的文档](/documentation/zh-cn/unreal-engine/android-file-server-for-unreal-engine)。
    
10.  启动你的配置文件。UE会编译并打包项目，然后将其部署到你的设备。
    
11.  运行完你的游戏。每当你的游戏记录新PSO时，输出日志都会显示消息。
    

之后再运行PSO收集会话时，你可以复用你在此小节中创建的配置文件。

### 关于收集PSO的提示

你收集的PSO越多，当你打包最终应用时，游戏的启动时间就越长，因为必须加载所有PSO后，用户才能开始运行游戏。因此，我们建议专门在你确信常用并有显著卡顿的位置收集PSO，因为这些位置的PSO缓存能为用户体验提供最多的提升。

只要一个位置发生重大更改，之前为该位置收集的PSO将变得过时。因此，请确保在整个开发过程中经常收集PSO。

## 从你的设备检索已收集的PSO数据

记录你的PSO后，你需要从你的测试设备检索数据并将其整合到新版本中。要检索你的PSO数据，请执行以下步骤：

1.  将你的测试设备与计算机断开，并关闭你的游戏。
    
    如果你尝试从项目启动程序关闭游戏，你的设备可能不会保存它记录的PSO数据。
    
2.  关闭你的项目，并将你的测试设备重新连接到计算机。
    
3.  从以下目录提取PSO：
    
    `Internal Storage/Android/Data/[package name of project]/files/UnrealGame/[project name]/Saved/CollectedPSOs`
    
    你可以使用以下任一方法提取CollectedPSOs目录中的内容：
    
    \* 使用Android文件服务器（AFS）运行以下命令： `UnrealAndroidFileTool -p [package name] -k [security token] pull ^saved/CollectedPSOs [destination path]`
    
    \* 将你的设备连接到计算机，并使用计算机的文件系统找到PSO的位置。
    
4.  将 `.UPIPELINECACHE` 文件复制到你的计算机上可轻松访问的位置。此示例使用了项目目录中名为 `Import/PSOFiles` 的文件夹。
    

## 编译最终PSO缓存数据并将其添加到你的项目

要将你的PSO缓存整合到版本中，请执行以下步骤：

1.  打开你的项目文件夹并找到Saved/Cooked/Android\_ETC2/\[项目名称\]/Metadata/PipelineCaches。将此文件夹中的文件复制到Import/PSOFiles中。
    
2.  打开你的命令行工具并找到你用于开发项目的引擎版本的安装目录，然后找到Engine/Binaries/Win64文件夹。例如：C:/Program FIles/Epic Games/UE\_5.2/Engine/Binaries/Win64。
    
3.  运行以下命令行：
    
    ```cpp
         UnrealEditor-Cmd.exe "YourProjectPath.uproject" -run=ShaderPipelineCacheTools expand C:\PSOfiles*.rec.upipelinecache C:\PSOfiles*.shk C:\PSOfiles\"Alias Name"_"Project Name"_"Used Graphics API".spc
    ```
    
4.  命令行成功运行后，Import/PSOFiles目录应该包含新的PKCS #7证书文件。将其复制到你的项目的Build/Android/PipelineCaches文件夹。
    
5.  重新编译并再次启动你的游戏。新版本就包含了最终PSO缓存数据。
    

## 结果

启动时，你还应该会看到一条日志消息，声称加载了多少PSO。运行你的游戏时，在你收集过PSO的位置上，所有渲染卡顿都应该会得到解决。

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [mobile](https://dev.epicgames.com/community/search?query=mobile)
-   [android](https://dev.epicgames.com/community/search?query=android)
-   [psos](https://dev.epicgames.com/community/search?query=psos)
-   [pso caching](https://dev.epicgames.com/community/search?query=pso%20caching)
-   [rendering optimization](https://dev.epicgames.com/community/search?query=rendering%20optimization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [必要设置](/documentation/zh-cn/unreal-engine/creating-bundled-pso-caches-for-android-in-unreal-engine#%E5%BF%85%E8%A6%81%E8%AE%BE%E7%BD%AE)
-   [为PSO缓存进行项目设置](/documentation/zh-cn/unreal-engine/creating-bundled-pso-caches-for-android-in-unreal-engine#%E4%B8%BApso%E7%BC%93%E5%AD%98%E8%BF%9B%E8%A1%8C%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [运行你的游戏并收集PSO](/documentation/zh-cn/unreal-engine/creating-bundled-pso-caches-for-android-in-unreal-engine#%E8%BF%90%E8%A1%8C%E4%BD%A0%E7%9A%84%E6%B8%B8%E6%88%8F%E5%B9%B6%E6%94%B6%E9%9B%86pso)
-   [关于收集PSO的提示](/documentation/zh-cn/unreal-engine/creating-bundled-pso-caches-for-android-in-unreal-engine#%E5%85%B3%E4%BA%8E%E6%94%B6%E9%9B%86pso%E7%9A%84%E6%8F%90%E7%A4%BA)
-   [从你的设备检索已收集的PSO数据](/documentation/zh-cn/unreal-engine/creating-bundled-pso-caches-for-android-in-unreal-engine#%E4%BB%8E%E4%BD%A0%E7%9A%84%E8%AE%BE%E5%A4%87%E6%A3%80%E7%B4%A2%E5%B7%B2%E6%94%B6%E9%9B%86%E7%9A%84pso%E6%95%B0%E6%8D%AE)
-   [编译最终PSO缓存数据并将其添加到你的项目](/documentation/zh-cn/unreal-engine/creating-bundled-pso-caches-for-android-in-unreal-engine#%E7%BC%96%E8%AF%91%E6%9C%80%E7%BB%88pso%E7%BC%93%E5%AD%98%E6%95%B0%E6%8D%AE%E5%B9%B6%E5%B0%86%E5%85%B6%E6%B7%BB%E5%8A%A0%E5%88%B0%E4%BD%A0%E7%9A%84%E9%A1%B9%E7%9B%AE)
-   [结果](/documentation/zh-cn/unreal-engine/creating-bundled-pso-caches-for-android-in-unreal-engine#%E7%BB%93%E6%9E%9C)

相关文档

[

Android文件服务器

![Android文件服务器](https://dev.epicgames.com/community/api/documentation/image/a7791af7-ae28-4a8e-bdb1-77a5b46ae0a4?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/android-file-server-for-unreal-engine)

[

PSO缓存

![PSO缓存](https://dev.epicgames.com/community/api/documentation/image/ce735ac6-7d55-409a-900d-f5d6a46549fc?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/optimizing-rendering-with-pso-caches-in-unreal-engine)

[

创建捆绑的PSO缓存

![创建捆绑的PSO缓存](https://dev.epicgames.com/community/api/documentation/image/c9dda195-d36e-4be6-8d0c-6ef2accd26f5?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/manually-creating-bundled-pso-caches-in-unreal-engine)