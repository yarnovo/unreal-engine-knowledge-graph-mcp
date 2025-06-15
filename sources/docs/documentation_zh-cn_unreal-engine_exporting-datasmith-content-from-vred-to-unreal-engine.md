# 从VRED将Datasmith内容导出到虚幻引擎 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-vred-to-unreal-engine
> 
> 生成时间: 2025-06-14T19:05:38.405Z

---

目录

![从VRED导出Datasmith内容](https://dev.epicgames.com/community/api/documentation/image/8d876ffd-bb24-42e8-9802-110ada7a1570?resizing_type=fill&width=1920&height=335)

## 安装导出器插件脚本

需要先安装VRED插件脚本，然后才能开始在虚幻引擎中使用VRED内容。

要了解导出器插件当前支持哪些版本的VRED Professional，请参阅[Datasmith支持的软件和文件类型](/documentation/zh-cn/unreal-engine/datasmith-supported-software-and-file-types)。

请按照以下步骤为计算机上安装的任何受支持的VRED版本安装Datasmith导出器插件脚本。

1.  在虚幻引擎安装文件夹中，找到在 `Engine/Plugins/Enterprise/DatasmithFBXImporter/Resources/VREDPlugin` 文件夹中的 *vrDatasmithExporter.py* 脚本。
    
2.  复制此文件夹及其中所有内容到VRED搜索插件的位置。  
    例如，在Windows平台，该位置可能是 `C:\Users\<username>\Documents\Autodesk\VRED-<internalVersion>\ScriptPlugins`，其中 `<username>` 是Windows用户ID，而 `<InternalVersion>` 表示安装的VRED版本。  
    关于寻找此路径的完整细节，请参阅[VRED文档](http://help.autodesk.com/view/VREDPRODUCTS/2018/ENU/?guid=GUID-C085B3DC-A66C-48EB-8FE4-43E4383AC46E)。
    
    VRED终端窗口也可以帮助寻找此路径。在主菜单中选择 **查看（View）> 终端（Terminal）** 打开终端，然后寻找以 **Looking for script plugins in** 开头的行。例如：  
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6d8538b9-da35-4d43-8a4e-a9664c4019c8/vred-terminal.png "vred-terminal.png")
    
3.  重启VRED。
    

## 导出到Datasmith

在以希望的方式设置好VRED场景并注册好变体之后，将场景导出为FBX：

1.  在VRED主菜单中，选择：
    -   **文件（File） > 导出（Export） > 导出到Datasmith..（Export to Datasmith...）**（适用于VRED 2018）
    -   **文件（File） > 导出场景数据（Export Scene Data） > 导出到Datasmith..（Export to Datasmith...）**（适用于VRED 2019）
        
        ![在VRED中进行的Datasmith导出](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7f95d82-d7da-471a-8983-62787be03889/datasmith-vred-export.png "Datasmith export from VRED")
2.  浏览至文件夹并选择文件名。

导出器将在所选择的位置创建 *.FBX* 文件。

### 最终结果

现在你可以尝试将新的 *.FBX* 文件导入到虚幻编辑器中。请参阅[将Datasmith内容导入到虚幻引擎中](/documentation/zh-cn/unreal-engine/importing-datasmith-content-into-unreal-engine)。

除了 `.FBX` 文件以外，导出器还会创建附加文件，包括：

-   包含场景光源的额外信息的 `.lights` 文件
-   包含注册变体信息的 `.var` 文件。
-   包含动画信息的 `.clips` 文件。
-   包含材质额外信息的 `.mats` 文件。

这些文件中包含Datasmith导入程序所需的信息。如果将 `.FBX` 文件移到新位置，请确保将这些附加文件放在相同的相对路径中。

-   [datasmith](https://dev.epicgames.com/community/search?query=datasmith)
-   [enterprise](https://dev.epicgames.com/community/search?query=enterprise)
-   [vred](https://dev.epicgames.com/community/search?query=vred)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [安装导出器插件脚本](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-vred-to-unreal-engine#%E5%AE%89%E8%A3%85%E5%AF%BC%E5%87%BA%E5%99%A8%E6%8F%92%E4%BB%B6%E8%84%9A%E6%9C%AC)
-   [导出到Datasmith](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-vred-to-unreal-engine#%E5%AF%BC%E5%87%BA%E5%88%B0datasmith)
-   [最终结果](/documentation/zh-cn/unreal-engine/exporting-datasmith-content-from-vred-to-unreal-engine#%E6%9C%80%E7%BB%88%E7%BB%93%E6%9E%9C)