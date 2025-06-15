# 在虚幻引擎中对glTF导出编制脚本 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/scripting-gltf-exports-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:06:38.480Z

---

目录

![对glTF导出编制脚本](https://dev.epicgames.com/community/api/documentation/image/651ba476-b6f1-4580-a9ec-6cee9f7dc118?resizing_type=fill&width=1920&height=335)

本文将说明如何使用 **Export to glTF** 函数，通过 **蓝图（Blueprint）** 或 **Python** 从虚幻编辑器导出关卡或支持的资产，以及如何在运行时进行导出。

## Export to glTF函数

Export to GLTF函数接受以下输入：

-   **要导出的对象：** 这可以是任意支持的资产。如需详细了解受支持的资产，请参阅"glTF导出器如何处理虚幻引擎内容"。  
    要导出当前关卡，你可以传递空（null）引用。
-   **所选Actor：** 指定要导出的场景子集。
    -   使用蓝图或Python导出时，你必须提供此集，即使其为空集。
    -   导出关卡时，提供空集以导出关卡中的所有Actor。
-   **目标路径：** 导出的glTF文件的名称、路径和格式（文件扩展名）。可以指定以下格式：
    
    格式
    
    说明
    
    JSON `.gltf`
    
    包含以下元素，在你指定的目录中单独保存：
    
    -   **全场景说明：** 保存为JSON格式化、人工可读的UTF-8文本文件，扩展名为 `.gltf` 。
    -   **纹理文件：** 保存到你指定的格式， `.png` 、 `.jpeg` ，等等。
    -   **二进制数据文件：** 保存的单独文件，文件扩展名为 `.bin` 。
    
    Binary `.glb`
    
    将全场景说明、所有二进制数据和所有纹理合并为单个完全独立的二进制文件。
    
-   导出选项。如需更多信息，请参阅[glTF导出选项参考](/documentation/zh-cn/unreal-engine/exporting-unreal-engine-content-to-gltf#gltf%E5%AF%BC%E5%87%BA%E9%80%89%E9%A1%B9%E5%8F%82%E8%80%83)。

**Export to GLTF** 函数会生成以下输出：

-   **OutMessage：** 导出中的日志消息。
-   **返回值：** 导出成功时返回 `true` ，否则返回 `false` 。

## 使用蓝图导出

你可以从上下文菜单（ **杂项（Miscellaneous）> 导出到GLTF（Export to GLTF）** ）将 **导出到GLTF（Export to GLTF）** 操作添加到蓝图图表。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/40356d3b-0e86-4b3d-a0d4-7569b4ea04b6/ue5_2-bp-export-to-gltf.png)

"导出到glTF"蓝图函数配置为将简单的立方体导出到glTF

输入

说明

**Object**

要导出的对象（支持的类型是UMaterialInterface、UStaticMesh、USkeletalMesh、UWorld、UAnimSequence、ULevelSequence、ULevelVariantSets）。如果为null，将默认为当前处于活动状态的世界。

**文件路径（File Path）**

磁盘上要另存为的文件名。关联的纹理和二进制文件将保存在相同的文件夹中，除非文件扩展名为 `.glb` ，此时会生成完全独立的二进制文件。

**选项（Options）**

导出期间要使用的各种选项。如果为null，将默认为特定于用户的项目编辑器设置。

**所选Actor（Selected Actors）**

要导出的一组Actor。这仅在要导出的对象为UWorld时适用。使用空集将导出所有Actor。

## 使用Python导出

以下代码示例将 `/game/models/` 子文件夹中的所有资产作为单独的glTF文件导出。

```cpp

    import unreal

    assetPath = '/game/models/'
    outputDir = 'c:/Temp/glTFExport/'
    exportOptions = unreal.GLTFExportOptions()
    selectedActors = set()

    staticMestPaths = unreal.EditorAssetLibrary.list_assets(assetPath)
    for smp in staticMestPaths:
        sm = unreal.EditorAssetLibrary.load_asset(smp)
        if unreal.MathLibrary.class_is_child_of(sm.get_class(), unreal.StaticMesh):
            exportPath = outputDir+sm.get_name()+'/'+sm.get_name()+'.gltf'
            unreal.GLTFExporter.export_to_gltf(sm,exportPath,exportOptions,selectedActors)

```

## 在运行时导出

你可以使用Export to GLTF函数在运行时导出glTF文件。但是，[材质烘焙](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%9D%90%E8%B4%A8%E7%83%98%E7%84%99)和[材质表达式匹配](/documentation/zh-cn/unreal-engine/how-the-gltf-exporter-handles-unreal-engine-content#%E6%9D%90%E8%B4%A8%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%8C%B9%E9%85%8D)都无法在运行时实现，因此你需要执行以下某项操作来处理大部分材质：

-   编辑器中的 **预烘焙材质：** ，创建glTF代理材质。glTF导出器会将代理材质用于运行时glTF导出。代理材质会自动随你的应用程序发售，因为它们在你的虚幻引擎材质的用户数据中被引用。如需详细了解如何创建代理材质，请参阅[glTF代理材质](/documentation/zh-cn/unreal-engine/gltf-proxy-materials-in-unreal-engine)。
-   在C++中，在运行时使用 **GLTFBuilder** API修改glTF文件的内容，然后再导出该文件。

-   [gltf](https://dev.epicgames.com/community/search?query=gltf)
-   [gl transmission format](https://dev.epicgames.com/community/search?query=gl%20transmission%20format)
-   [import / export](https://dev.epicgames.com/community/search?query=import%20%2F%20export)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Export to glTF函数](/documentation/zh-cn/unreal-engine/scripting-gltf-exports-in-unreal-engine#exporttogltf%E5%87%BD%E6%95%B0)
-   [使用蓝图导出](/documentation/zh-cn/unreal-engine/scripting-gltf-exports-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%93%9D%E5%9B%BE%E5%AF%BC%E5%87%BA)
-   [使用Python导出](/documentation/zh-cn/unreal-engine/scripting-gltf-exports-in-unreal-engine#%E4%BD%BF%E7%94%A8python%E5%AF%BC%E5%87%BA)
-   [在运行时导出](/documentation/zh-cn/unreal-engine/scripting-gltf-exports-in-unreal-engine#%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E5%AF%BC%E5%87%BA)