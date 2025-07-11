# Creating Levels of Detail in Blueprints and Python in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/creating-levels-of-detail-in-blueprints-and-python-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:36:46.399Z

---

目录

![在蓝图和Python中创建LOD](https://dev.epicgames.com/community/api/documentation/image/424d91cc-9294-4e4f-b6fe-6d95245b786f?resizing_type=fill&width=1920&height=335)

为你的网格体创建细节层级（LOD）可以在不牺牲视觉质量的前提下提高游戏的性能和帧率。

一般来说，网格体中三角形越多，屏幕上三角形越小，GPU渲染它们就越困难。同时渲染太多的细节网格体会降低你的帧率。然而，通常不必将场景中的每一个网格体都以同样的保真度进行渲染：网格体若离得很远，通常可以换成不太详细的网格体，减少所包含的三角形，而不会在视觉质量上造成明显的差异。

虚幻引擎4提供了一个内置的LOD管理系统，可以根据网格体当前在每个帧中占据的屏幕空间大小，自动选择要在运行时显示的网格体的最合适版本。此系统依赖于你提前在编辑器中设置这些网格体的不同替代版本。

通过逐步将网格体简化为你指定的阈值，编辑器可以为静态网格体资源自动生成这些细节层级。有关此系统如何工作以及如何在静态网格体编辑器中设置的更多信息，请参阅[自动LOD生成](/documentation/zh-cn/unreal-engine/static-mesh-automatic-lod-generation-in-unreal-engine)。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2cd9caa-81f0-415a-b921-cc500c145582/01-lod-settings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f2cd9caa-81f0-415a-b921-cc500c145582/01-lod-settings.png)

Click image for full size.

然而，即使编辑器可以自动生成这些LOD，你也不可能逐个打开项目中的静态网格体资源来设置。你可以批量编辑资源，但是如果你想根据不同的静态网格体资源的特性对它们应用不同的设置，那么这就没有帮助了。例如，你可能希望根据网格体中现有三角形的数量或根据资源命名惯例应用不同的简化设置。如果你希望在你编写了脚本的较大自定义资源管道中将LOD创建为子步骤，那么它也没有帮助。对于这类情况，可以使用蓝图或Python编写自动LOD创建系统的脚本。

**先决条件：**如果你尚未进行此操作，则需要安装 **编辑器脚本工具插件（Editor Scripting Utilities Plugin）**。详情参阅[编写脚本和自动执行编辑器](/documentation/zh-cn/unreal-engine/scripting-and-automating-the-unreal-editor)。

## 新建LOD

选择实现方法：

Blueprints Python

你将在 **编辑器脚本（Editor Scripting）> 静态网格体（Static Mesh）** 类别下找到管理LOD所需的节点。

要使用这些节点，你的蓝图类必须派生自仅编辑器类，例如 **PlacedEditorUtilityBase** 类。详情请参阅[使用蓝图编写编辑器脚本](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-blueprints)。

-   关键节点是 **Set Lods**，它自动为传入的静态网格体资源创建细节层级。要使用此节点，你需要为其提供一组简化设置，这些设置为你想要创建的每个细节层级定义屏幕大小阈值和相对三角形百分比。见下例。
    
    你传递给 **EditorScriptingMeshReductionOptions** 节点的 **简化设置（Reduction Settings）** 输入的第一个 **EditorScriptingMeshReductionSettings** 项目不起作用。LOD 0总是包含网格体中的所有三角形。
    
-   你可以使用 **获取LOD数量（Get Lod Count）** 和 **获取LOD屏幕大小（Get Lod Screen Sizes）** 获取关于当前为静态网格体设置的细节层级的信息。
-   你也可以使用 **移除LOD（Remove Lods）** 移除所有现有LOD（除了LOD 0，它始终包含网格体中的所有三角形）。
-   设置LOD将修改静态网格体资源。假设希望保留所做的更改，之后还需要使用 **保存资源（Save Asset）** 或 **保存加载的资源（Save Loaded Asset）** 之类的节点。

下面的示例依次在输入路径中加载每个静态网格体资源。每当它发现顶点数大于最小阈值的资源时，它就为静态网格体设置三个额外的LOD，然后保存。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd317c67-e69e-4fc2-a3b8-94a1982b45db/02-set-lods.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/dd317c67-e69e-4fc2-a3b8-94a1982b45db/02-set-lods.png)

点击查看大图。

你将在 `unreal.EditorStaticMeshLibrary` 类中找到LOD管理函数。

-   关键函数是 `unreal.EditorStaticMeshLibrary.set_lods()`，它自动为传入的静态网格体资源创建细节层级。要使用此函数，你需要传入一个 `EditorScriptingMeshReductionOptions` 对象，该对象包含一组 `EditorScriptingMeshReductionSettings`，为你想要创建的每个细节层级定义屏幕大小阈值和相对三角形百分比。见下例。
    
    你在 `EditorScriptingMeshReductionOptions.reduction_settings` 数组中设置的第一个 `EditorScriptingMeshReductionSettings` 项目不起作用。LOD 0总是包含网格体中的所有三角形。
    
-   你可以使用 **unreal.EditorStaticMeshLibrary.get\_lod\_count()** 和 **unreal.EditorStaticMeshLibrary.get\_lod\_screen\_sizes** 获取关于当前为静态网格体设置的细节层级的信息。
-   你也可以使用 **unreal.EditorStaticMeshLibrary.remove\_lods()** 来移除所有现有LOD（除了LOD 0，它始终包含网格体中的所有三角形）。
-   设置LOD将修改静态网格体资源。假设你希望保留所做的更改，之后还需要使用 `unreal.EditorAssetLibrary.save_asset()` 或 `unreal.EditorAssetLibrary.save_loaded_asset()` 之类的函数。

下面的示例依次在输入路径中加载每个静态网格体资源。每当它发现顶点数大于最小阈值的资源时，它就为静态网格体设置三个额外的LOD，然后保存。

```cpp
    import unreal
    asset_path = "/Game/studio"
    # 我们定义一个函数，该函数为指定的静态网格体资源生成新的LOD。
    def apply_lods(static_mesh):
        # 检查网格体是否足够复杂。
        number_of_vertices = unreal.EditorStaticMeshLibrary.get_number_verts(static_mesh, 0)
        if number_of_vertices < 10:
            return
        print("treating asset: " + static_mesh.get_name())
        print("existing LOD count: " + str(unreal.EditorStaticMeshLibrary.get_lod_count(static_mesh)))
        # 设置用于自动生成细节层级的选项。
        options = unreal.EditorScriptingMeshReductionOptions()
        # 我们请求三个细节层级。各个细节层级拥有：
        # - 在该LOD层级上，应该保留来自详尽网格体的三角形的百分比
        # - 此细节层级会显示时的屏幕空间阈值。
        options.reduction_settings = [ unreal.EditorScriptingMeshReductionSettings(1.0, 1.0),
            unreal.EditorScriptingMeshReductionSettings(0.8, 0.75),
            unreal.EditorScriptingMeshReductionSettings(0.6, 0.5),
            unreal.EditorScriptingMeshReductionSettings(0.4, 0.25)
        ]
        # 使用上述设置的屏幕空间阈值，而非自动计算。
        options.auto_compute_lod_screen_size = False
        # 在静态网格体资源上设置选项。
        unreal.EditorStaticMeshLibrary.set_lods(static_mesh, options)
        # 保存更改。
        unreal.EditorAssetLibrary.save_loaded_asset(static_mesh)
        print("new LOD count: " + str(unreal.EditorStaticMeshLibrary.get_lod_count(static_mesh)))
    # 获取路径中所有资源的列表。
    all_assets = unreal.EditorAssetLibrary.list_assets(asset_path)
    # 将它们都加载到内存中。
    all_assets_loaded = [unreal.EditorAssetLibrary.load_asset(a) for a in all_assets]
    # 过滤列表以仅包括静态网格体。
    static_mesh_assets = unreal.EditorFilterLibrary.by_class(all_assets_loaded, unreal.StaticMesh)
    # 列表中的每个静态网格体都运行此函数。
    list(map(apply_lods, static_mesh_assets))

```

另一种方法是为每个静态网格体资源设置 **LOD组（LOD Group）** 选项。此选项使网格体使用项目的 **BaseEngine.ini** 文件的 `[StaticMeshLODSettings]` 部分中定义的预设置LOD简化设置之一，如 `LevelArchitecture`、`SmallProp`、`LargeProp` 或 `HighDetail`。

例如：

```cpp
    import unreal
    asset_path = "/Game/studio/"
    def set_high_detail(static_mesh):
        # 设置LOD组。
        static_mesh.set_editor_property("lod_group", "HighDetail")
        # 保存资源。
        unreal.EditorAssetLibrary.save_loaded_asset(static_mesh)
    # 获取路径中所有资源的列表。
    all_assets = unreal.EditorAssetLibrary.list_assets(asset_path)
    # 将它们都加载到内存中。
    all_assets_loaded = [unreal.EditorAssetLibrary.load_asset(a) for a in all_assets]
    # 过滤列表以仅包括静态网格体。
    static_mesh_assets = unreal.EditorFilterLibrary.by_class(all_assets_loaded, unreal.StaticMesh)
    # 对列表中的各个静态网格体运行此函数。
    list(map(set_high_detail, static_mesh_assets))

```

有关此系统如何工作以及如何在编辑器中使用它的更多信息，请参阅[自动LOD生成](/documentation/zh-cn/unreal-engine/static-mesh-automatic-lod-generation-in-unreal-engine#usinglodgroups)。

## 重用来自另一个静态网格体的LOD

作为使用上述过程自动生成静态网格体LOD的替代方法，你可以使用静态网格体中已经存在的LOD（称为 *源* 静态网格体），并将其作为另一个静态网格体（称为 *目标* 静态网格体）的LOD重复使用。

选择实现方法：

Blueprints Python

要在蓝图脚本中重复使用现有的LOD，请使用 **编辑器脚本（Editor Scripting）> 静态网格体（Static Mesh）> 从静态网格体设置LOD（Set Lod From Static Mesh）** 节点。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bc570cb-2f41-4410-9dbf-0abb65f7e7c2/03-set-lod-from-static-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bc570cb-2f41-4410-9dbf-0abb65f7e7c2/03-set-lod-from-static-mesh.png)

Click image for full size.

该节点需要以下输入：

-   目标引用。要求是静态网格体编辑器子系统对象。
-   目标静态网格体的引用。这是要为其创建新LOD的静态网格体。你需要首先加载该资源，使用 **编辑器脚本（Editor Scripting）> 资源（Asset）> 加载资源（Load Asset）** 节点。
-   要为目标静态网格体创建的LOD索引。
    
    如果目标静态网格体已经具有具有相同索引的LOD，则会覆盖它。
    
-   指向源静态网格体的引用。这是一个静态网格体，它有一个你希望从目标静态网格体指向的现有LOD。同上，你需要首先加载该资源，使用 **编辑器脚本（Editor Scripting）> 资源（Asset）> 加载资源（Load Asset）** 节点。
-   要用于目标静态网格体的源静态网格体中LOD的索引。
-   一个布尔参数，它决定是否要尝试将源LOD中的材质插槽与目标静态网格体中已经存在的插槽合并。如果启用此设置，则函数将查找源几何体中与目标网格体中的部分分配相同材质的任何部分。如果找到任何部分，它将尝试重新映射LOD中的部分，以匹配目标静态网格体中的现有部分。这可以在两个静态网格体使用相同材质的情况下节省一些内存。如果禁用此设置，则源LOD中的所有网格体部分都将附加到目标静态网格体。

设置LOD将修改目标静态网格体资源。假设希望保留所做的更改，之后还需要使用 **保存资源（Save Asset）** 或 **保存加载的资源（Save Loaded Asset）** 之类的节点。

例如，下面的脚本从源静态网格体中取指定的LOD，并在目标静态网格体中以不同的指定LOD索引重复使用该几何体：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9780eb45-9ede-4a55-896f-056f4069aac3/04-set-lod-from-static-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9780eb45-9ede-4a55-896f-056f4069aac3/04-set-lod-from-static-mesh.png)

Click image for full size.

当运行来自静态网格体的 **Set Lod from Static Mesh** 节点时，将源静态网格体的LOD副本添加到目标静态网格体中。静态网格体资源之间没有正在进行的连接，因此从现在开始对源静态网格体所做的任何更改都不会自动影响目标静态网格体。

要重复使用Python脚本中的某个LOD，调用 `unreal.EditorStaticMeshLibrary.set_lod_from_static_mesh()` 函数。你需要传递此函数：

-   目标静态网格体：这是要为其创建新LOD的静态网格体。你需要先加载此资源，使用 `unreal.EditorAssetLibrary.load_asset()` 函数。
-   要为目标静态网格体创建的LOD索引。此值必须大于0。不能在目标静态网格体中替换LOD 0。
    
    如果目标静态网格体已经具有具有相同索引的LOD，则会覆盖它。
    
-   源静态网格体。这是一个静态网格体，它有一个你希望从目标静态网格体指向的现有LOD。同上，你需要先加载此资源，使用 `unreal.EditorAssetLibrary.load_asset()` 函数。
-   要用于目标静态网格体的源静态网格体中LOD的索引。
-   一个布尔参数，它决定是否要努力合并目标静态网格体中的材质插槽。如果将此参数设置为 `True`，则函数将查找源几何体中与目标网格体中的部分分配相同材质的任何部分。如果找到任何部分，它将尝试重新映射LOD中的部分，以匹配目标静态网格体中的现有部分。如果将此参数设置为 `False`，则源LOD中的所有网格体部分都将附加到目标静态网格体。

设置此LOD将修改静态网格体资源。假设你希望保留所做的更改，之后还需要使用 `unreal.EditorAssetLibrary.save_asset()` 或 `unreal.EditorAssetLibrary.save_loaded_asset()` 之类的函数。

例如，以下脚本从简化的源静态网格体中获取LOD 0，并在更复杂的目标静态网格体中将该几何体重复使用为LOD 1：

```cpp
    import unreal
    destination_name = "/Game/MyGeometries/Accumulator_case"
    source_name = "/Game/MyGeometries/Simplified_box"
    def set_mesh_as_lod(destination_name, source_name):
        destination_mesh = unreal.EditorAssetLibrary.load_asset(destination_name)
        source_mesh = unreal.EditorAssetLibrary.load_asset(source_name)
        lod_count = unreal.EditorStaticMeshLibrary.get_lod_count(destination_mesh)
        print("Current LOD count: " + str(lod_count))
        slot_replaced = unreal.EditorStaticMeshLibrary.set_lod_from_static_mesh(destination_mesh, 1, source_mesh, 0, True)
        if slot_replaced > 0:
            print("Added mesh as LOD for slot " + str(slot_replaced))
            lod_count = unreal.EditorStaticMeshLibrary.get_lod_count(destination_mesh)
            print("New LOD count: " + str(lod_count))
            unreal.EditorAssetLibrary.save_loaded_asset(destination_mesh)
        else
            unreal.log_error("Unable to add mesh as LOD!")
    set_mesh_as_lod(destination_name, source_name)

```

当 `unreal.EditorStaticMeshLibrary.set_lod_from_static_mesh()` 函数运行时，将源静态网格体的LOD副本添加到目标静态网格体中。静态网格体资源之间没有正在进行的连接，因此从现在开始对源静态网格体所做的任何更改都不会自动影响目标静态网格体。

-   [editor](https://dev.epicgames.com/community/search?query=editor)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [python](https://dev.epicgames.com/community/search?query=python)
-   [how-to](https://dev.epicgames.com/community/search?query=how-to)
-   [scripting](https://dev.epicgames.com/community/search?query=scripting)
-   [lods](https://dev.epicgames.com/community/search?query=lods)
-   [levels of detail](https://dev.epicgames.com/community/search?query=levels%20of%20detail)
-   [variant manager](https://dev.epicgames.com/community/search?query=variant%20manager)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [新建LOD](/documentation/zh-cn/unreal-engine/creating-levels-of-detail-in-blueprints-and-python-in-unreal-engine#%E6%96%B0%E5%BB%BAlod)
-   [重用来自另一个静态网格体的LOD](/documentation/zh-cn/unreal-engine/creating-levels-of-detail-in-blueprints-and-python-in-unreal-engine#%E9%87%8D%E7%94%A8%E6%9D%A5%E8%87%AA%E5%8F%A6%E4%B8%80%E4%B8%AA%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E7%9A%84lod)