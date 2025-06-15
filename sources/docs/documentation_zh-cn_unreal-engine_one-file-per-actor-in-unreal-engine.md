# 虚幻引擎中的"一Actor一文件" | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/one-file-per-actor-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:17:28.392Z

---

目录

![一Actor一文件](https://dev.epicgames.com/community/api/documentation/image/c41c2681-9ec9-4897-91b0-d32e48593909?resizing_type=fill&width=1920&height=335)

在之前的虚幻引擎版本中，要更改关卡中的一个或多个Actor，必须从源控制中检出文件。在你完成工作之前，其他团队成员访问不了该文件；这样会导致开发流程速度变慢，因为一次只有一个人员可以处理该文件。

**一Actor一文件（One File Per Actor，简称OFPA）** 可以将Actor实例的数据保存到外部文件中，更改Actor时不再需要保存主关卡文件，从而减少用户之间的重叠。

"一Actor一文件"功能仅在编辑器中可用。在烘焙时，所有Actor都嵌入到各自的关卡文件。

## 启用"一Actor一文件"

使用[世界分区](/documentation/zh-cn/unreal-engine/world-partition-in-unreal-engine)时，默认启用"一Actor一文件"。要在非分区世界中启用OFPA，请执行以下操作：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/185d86c9-dfae-4fd2-a9ab-a3d33a67a4ef/ofpa-world-enable.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/185d86c9-dfae-4fd2-a9ab-a3d33a67a4ef/ofpa-world-enable.png)

为一个关卡启用OFPA。

1.  在主菜单中，找到 **窗口（Window）> 世界设置（World Settings）**，打开 \*\*世界设置（World Settings）面板。
2.  在面板中找到 **世界（World）** 分段，点击 **使用外部Actor（Use External Actors）** 旁边的复选框。
3.  引擎将询问你是否要将所有Actor转换为外部打包模式。点击 **是（Yes）** 完成OFPA转换。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c515a041-f8a3-4bf0-b05e-f38622e2b8d5/ofpa-convert-all.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c515a041-f8a3-4bf0-b05e-f38622e2b8d5/ofpa-convert-all.png)
    
    点击"是（Yes）"以转换关卡中的所有Actor。
    
4.  保存关卡。

## 转换子关卡

务必要注意，当你为关卡激活 **使用外部Actor（Use External Actors）** 选项时，只有当前关卡会转换为OFPA。要转换子关卡，你必须将其加载并为其启用 **使用外部Actor（Use External Actors）** ，如上所述。如果你的关卡包含多个子关卡，这样做可能会出现问题，你可以使用Commandlet自动转换关卡及其子关卡。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d924a795-7d07-4614-bb37-501a5da86702/ofpa-commandlet.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d924a795-7d07-4614-bb37-501a5da86702/ofpa-commandlet.png)

Commandlet的详细讲解。

请按照下面的步骤使用此Commandlet：

1.  打开命令提示符窗口。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6de992ed-dbaf-4453-83ce-9ab553654c6a/ofpa-commandlet-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6de992ed-dbaf-4453-83ce-9ab553654c6a/ofpa-commandlet-1.png)
    
2.  在提示符处，找到 **UnrealEditor.exe** 文件的位置。例如：`C:\Builds\Home_UE5_Engine\Engine\Binaries\Win64` 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7dc1b18-5aa8-4d6c-98fe-2504c88b8317/ofpa-commandlet-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7dc1b18-5aa8-4d6c-98fe-2504c88b8317/ofpa-commandlet-2.png)
    
3.  接下来，开始输入命令。先键入将运行该Commandlet的 `.exe` 文件的名称，即 `UnrealEditor.exe` 。
4.  添加Commandlet的名称和以下参数：
    
    -   `-run="ConvertLevelsToExternalActorsCommandlet"` 是Commandlet的名称。
    -   `-nosourcecontrol` 将告知Commandlet不使用源码控制。
    -   `-convertsublevels` 将告知Commandlet转换贴图可能拥有的所有子关卡。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da2e0825-87ca-4ce9-bf30-bffbfc833373/ofpa-commandlet-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/da2e0825-87ca-4ce9-bf30-bffbfc833373/ofpa-commandlet-3.png)
    
5.  使用关卡位置完成命令：`"/Game/Maps/TestMaps/ExternalActors/MasterMap"` 在此示例中， **Game** 是项目名称， **MainMap** 是你希望转换的贴图的名称。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f300b61-6c36-4c02-aa72-4cbeffeeff14/ofpa-commandlet-4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7f300b61-6c36-4c02-aa72-4cbeffeeff14/ofpa-commandlet-4.png)
    
6.  按 **Enter** 键运行Commandlet。它会将关卡和所有子关卡转换为OFPA。

## 将OFPA用于源码控制

在你的源控制应用程序中工作时，你会注意到外部Actor文件名称已编码。要解决此问题，你可以在提交之前使用 **查看变更列表（View Changelist）** 窗口查看和验证变更列表的内容。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/205c26ad-b27e-4131-b672-cbc535fa082c/ofpa-source-control.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/205c26ad-b27e-4131-b672-cbc535fa082c/ofpa-source-control.png)

使用OFPA的关卡的现有变更列表。

此窗口将显示现有更改列表以及列表包含的文件。对于外部Actor，你可以看到Actor名称、关卡路径和资产类型，而不是编码的文件名。

在编辑器中内置变更列表支持的情况下，你可以先验证变更列表的内容，然后再将其提交到源码控制。这是必须执行的操作，因为OFPA给项目带来了更多的复杂性。例如，用户可能检出多个文件，但只提交了其中的一部分，可能会导致出现悬空的引用。

如需详细了解如何在虚幻引擎中使用源码控制，请参阅"编辑器中的源码控制"。

使用OFPA时，内容和Actor文件应该从编辑器中提交到源码控制。

仅当使用Perforce作为源码控制提供程序时，才会提供变更列表支持。

-   [landscape](https://dev.epicgames.com/community/search?query=landscape)
-   [world partition](https://dev.epicgames.com/community/search?query=world%20partition)
-   [one file per actor](https://dev.epicgames.com/community/search?query=one%20file%20per%20actor)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [启用"一Actor一文件"](/documentation/zh-cn/unreal-engine/one-file-per-actor-in-unreal-engine#%E5%90%AF%E7%94%A8%22%E4%B8%80actor%E4%B8%80%E6%96%87%E4%BB%B6%22)
-   [转换子关卡](/documentation/zh-cn/unreal-engine/one-file-per-actor-in-unreal-engine#%E8%BD%AC%E6%8D%A2%E5%AD%90%E5%85%B3%E5%8D%A1)
-   [将OFPA用于源码控制](/documentation/zh-cn/unreal-engine/one-file-per-actor-in-unreal-engine#%E5%B0%86ofpa%E7%94%A8%E4%BA%8E%E6%BA%90%E7%A0%81%E6%8E%A7%E5%88%B6)