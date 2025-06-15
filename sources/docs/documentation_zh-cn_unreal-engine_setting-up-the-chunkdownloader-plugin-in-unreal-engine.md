# 设置虚幻引擎中的ChunkDownloader插件 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-the-chunkdownloader-plugin-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:48:08.240Z

---

目录

![设置ChunkDownloader插件](https://dev.epicgames.com/community/api/documentation/image/8337ad5b-523b-4ce5-9a35-a1022d8a0973?resizing_type=fill&width=1920&height=335)

**ChunkDownloader** 补丁系统是 **虚幻引擎** 的一款内置系统，提供了为游戏打补丁的功能。本文将介绍如何为你的虚幻引擎项目设置 **项目设置** 和 **插件**，以便使用ChunkDowloader。

此示例使用了 **C++项目** 类型和 **空白模板**。项目名称为 **PatchingDemo**。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d027c111-042f-4fc1-926e-ff3263a30ded/01_createproject.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d027c111-042f-4fc1-926e-ff3263a30ded/01_createproject.png)

点击查看大图。

此示例使用了 **C++项目** 类型和 **空白模板**。项目名称为 **PatchingDemo**。

## 步骤

1.  打开你的 **项目设置（Project Settings）**，浏览至 **项目（Project）** > **打包（Packaging）**，然后确保 **使用Pak文件（Use Pak File）** 和 **生成文件块（Generate Chunks）** 均已启用。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/79419167-8aeb-43d2-bcae-c71f362c8627/02_projsetenablechunking.png)
2.  打开插件窗口并启用 **Chunk Downloader** 插件。重启编辑器，使你的更改生效。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/17acde20-eb58-4e1f-92d1-46eb7887fa9c/03_chunkdownloaderplugin.png)
3.  在 **Visual Studio** 中，打开你项目的 `[项目名称]Build.cs` 文件。该文件位于 `[项目名称]/Source/[项目名称]`。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ae55a6d0-c5b2-4afd-8e21-857a3d029efb/04_buildfileloc.png)
4.  编辑文件，将 **ChunkDownloader** 作为 `PrivateDependencyModuleNames` 加入你的 `ModuleRules`。在本案例中，在 `ModuleRules` 添加以下内容。
    
    ```cpp
             PrivateDependencyModuleNames.AddRange(new string[] { "ChunkDownloader" } );
    		
    ```
    
5.  将你的更改 **保存（Save）** 到这些文件。
    
6.  右键点击你的 **\[ProjectName\].uproject** 文件，然后点击 **生成项目文件（Generate Project Files）**。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9a05307-6ca5-46c2-b726-931ba702c7b5/05_genvsprojfiles.png)
7.  返回到你在 **Visual Studio** 中的项目解决方案，然后 **构建（build）** 项目。
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2ffbc7c-1514-4689-a8b5-2c832062a362/06_vsbuildproject.png)

## 最终结果

现在，你可以在项目中使用ChunkDownloader了。你可以接着在项目代码中实现它们，以便下载和安装包文件，请参见[为数据划分准备资产](/documentation/zh-cn/unreal-engine/preparing-assets-for-chunking-in-unreal-engine) 。

-   [patching](https://dev.epicgames.com/community/search?query=patching)
-   [chunkdownloader](https://dev.epicgames.com/community/search?query=chunkdownloader)
-   [platform delivery](https://dev.epicgames.com/community/search?query=platform%20delivery)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [步骤](/documentation/zh-cn/unreal-engine/setting-up-the-chunkdownloader-plugin-in-unreal-engine#%E6%AD%A5%E9%AA%A4)
-   [最终结果](/documentation/zh-cn/unreal-engine/setting-up-the-chunkdownloader-plugin-in-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)