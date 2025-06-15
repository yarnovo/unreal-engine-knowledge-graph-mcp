# 使用Direct Link同步3ds Max与虚幻 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-direct-link-to-synchronize-3ds-max-and-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:16.102Z

---

目录

![使用Direct Link同步3ds Max与虚幻](https://dev.epicgames.com/community/api/documentation/image/d1976a55-3063-44fe-bffc-35c3de596e05?resizing_type=fill&width=1920&height=335)

用于3ds Max的Datasmith导出插件支持Datasmith Direct Link（请参阅[使用Datasmith Direct Link](/documentation/zh-cn/unreal-engine/using-datasmith-direct-link-in-unreal-engine)）。Direct Link通过将3ds Max场景导出到本地缓存来运作。将3ds Max连接到虚幻引擎或连接到Twinmotion之类其他连接的应用程序，它会从缓存导入场景。

要将3ds Max场景与虚幻引擎同步，你的虚幻引擎项目必须启用Datasmith导入器插件。如果你不启用该插件，在虚幻引擎中就看不到Datasmith选项。有关更多信息，请参阅"启用Datasmith导入器插件"。

要将3ds Max场景与虚幻引擎同步，请执行以下操作：

-   更新Direct Link缓存（请参阅[更新Direct Link缓存](/documentation/zh-cn/unreal-engine/using-direct-link-to-synchronize-3ds-max-and-unreal-engine#%E6%9B%B4%E6%96%B0direct%20link%E7%BC%93%E5%AD%98)）。
-   使用Direct Link将3ds Max场景导入虚幻引擎中（请参阅[使用Direct Link导入3ds Max场景](/documentation/zh-cn/unreal-engine/using-direct-link-to-synchronize-3ds-max-and-unreal-engine#%E4%BD%BF%E7%94%A8directlink%E5%AF%BC%E5%85%A53dsmax%E5%9C%BA%E6%99%AF)）。

如果在更新缓存之前执行Direct Link导入，虚幻引擎将显示错误消息，因为缓存中没有可导入的内容。

## 更新Direct Link缓存

从3ds Max条带，使用Datasmith选项卡的Direct Link面板中的同步选项。

-   **同步（Synchronize）** ：向Direct Link缓存执行一次性推送。虚幻引擎或其他连接的应用程序通过Direct Link连接到3ds Max时，它会导入缓存。
    
    如果你想控制虚幻引擎何时显示对3ds Max场景的更改，可使用此命令。
    
-   **切换自动同步（Toggle Auto Sync）** ：启用后，Datasmith会在你每次做出更改时将3ds Max场景推送到Direct Link缓存。虚幻引擎和其他连接的应用程序会自动重新导入缓存。
    
    如果你希望虚幻引擎在你每次对3ds Max场景做出更改时更新，可使用此命令。
    

## 使用Direct Link导入3ds Max场景

1.  在3ds Max中，打开你想导入虚幻引擎中的场景，并[更新Direct Link缓存](/documentation/zh-cn/unreal-engine/using-direct-link-to-synchronize-3ds-max-and-unreal-engine#%E6%9B%B4%E6%96%B0direct%20link%E7%BC%93%E5%AD%98)。
2.  在虚幻引擎的主工具栏中，打开"创建（Create）"菜单并选择 **Datasmith > Direct Link导入（Direct Link Import）** 。  
    ![Direct Link导入](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ff290f8-5538-41f8-9b2e-e900d5ab2f73/direct-link-import-menu.png)  
    将打开"Direct Link可用源（Direct Link Available Sources）"对话框。
    
    如果你打开了多个3ds Max实例，每个实例将在"Direct Link可用源（Direct Link Available Sources）"对话框中显示为单独的源。
    
3.  选择你想导入虚幻引擎中的3ds Max源，然后点击"选择（Select）"。将打开文件对话框。
4.  选择项目中用于存储导入的内容的位置，然后点击"确定（OK）"。界面上将打开"Datasmith导入选项（Datasmith Import Options）"对话框。
    
    要为你的Datasmith内容创建新的顶级文件夹，请右键点击文件对话框中的空白区域。要创建现有文件夹的子文件夹，请右键点击该文件夹。
    
5.  根据需要设置导入选项，然后点击"导入（Import）"。如需详细了解Datasmith导入选项，请参阅[将Datasmith内容导入虚幻引擎中](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)。

## 更改Direct Link缓存目录

当你使用Direct Link将3ds Max连接到虚幻引擎时，Datasmith将使用缓存目录临时存储你的Datasmith场景的内容。例如，收发的 `.udatasmith` 场景、网格体、纹理，等等。

你可以从[连接状态窗口](/documentation/zh-cn/unreal-engine/the-datasmith-3ds-max-ui-for-exporting-to-unreal-engine#datasmithdirectlink%E8%BF%9E%E6%8E%A5%E8%BF%9E%E6%8E%A5%E7%8A%B6%E6%80%81%E7%AA%97%E5%8F%A3)更改缓存目录：

1.  从3ds Max条带中 **Datasmith** 选项卡的 **Direct Link** 面板，选择 **连接（Connections）**。界面上将打开 **连接状态（Connection Status）** 窗口。
2.  点击"更多选项"按钮（ **⋮** ），显示"缓存目录（Cache Directory）"设置。
3.  点击省略号按钮（ **...** ），打开文件对话框。
4.  找到你想使用的目录，然后点击 **选择文件夹（Select Folder）** 。

下次你打开或创建3ds Max文件并将其与虚幻引擎同步时，缓存位置会更新。

要将缓存重置为默认目录，请点击 **重置（Reset）** 。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [3ds max](https://dev.epicgames.com/community/search?query=3ds%20max)
-   [interop](https://dev.epicgames.com/community/search?query=interop)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [更新Direct Link缓存](/documentation/zh-cn/unreal-engine/using-direct-link-to-synchronize-3ds-max-and-unreal-engine#%E6%9B%B4%E6%96%B0directlink%E7%BC%93%E5%AD%98)
-   [使用Direct Link导入3ds Max场景](/documentation/zh-cn/unreal-engine/using-direct-link-to-synchronize-3ds-max-and-unreal-engine#%E4%BD%BF%E7%94%A8directlink%E5%AF%BC%E5%85%A53dsmax%E5%9C%BA%E6%99%AF)
-   [更改Direct Link缓存目录](/documentation/zh-cn/unreal-engine/using-direct-link-to-synchronize-3ds-max-and-unreal-engine#%E6%9B%B4%E6%94%B9directlink%E7%BC%93%E5%AD%98%E7%9B%AE%E5%BD%95)