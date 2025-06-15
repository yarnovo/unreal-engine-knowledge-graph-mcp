# 在虚幻引擎蓝图和Python中设置静态网格体碰撞 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/setting-up-collisions-with-static-meshes-in-blueprints-and-python-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:36:44.930Z

---

目录

![在蓝图和Python中设置静态网格体碰撞](https://dev.epicgames.com/community/api/documentation/image/5626633b-c424-45ca-821e-a5c1ab410e8e?resizing_type=fill&width=1920&height=335)

为了使静态网格体成为关卡中物理模拟的一部分，必须为其设置 **碰撞网格体** 。它表示静态网格体对象在物理模拟中的边界。每当物理系统需要检查其他物理对象是否与网格体碰撞，以及执行高性能光线投射来测试对网格体的碰撞时，都会使用该碰撞网格体。可以使用静态网格体的可见几何体作为其碰撞网格体，但是可见几何体通常过于详细了。即使要提供逼真的效果，物理交互通常也不需要具有如此高的准确性，因此可以通过尽量简化碰撞网格体来提升物理系统的性能。

可以在静态网格体编辑器中自动为静态网格体创建简单的碰撞表示：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a97746bf-0200-4450-8f56-d753b02cd167/01-set-collisions-menu.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a97746bf-0200-4450-8f56-d753b02cd167/01-set-collisions-menu.png)

点击查看大图。

有关详细信息，请参阅[设置与静态网格体模型的碰撞](/documentation/zh-cn/unreal-engine/setting-up-collisions-with-static-meshes-in-unreal-engine)。

在某些情况下，可能需要以编程方式创建这些碰撞网格体表示，而非在静态网格体编辑器中手动创建。例如，需要在同一个项目中设置大量静态网格体对象时，将其逐一打开可能并不现实。你可能希望在用于导入和管理内容的较大自动化流程中一步完成这些碰撞设置。

以下部分将展示如何使用蓝图和Python在虚幻编辑器中自动将上述不同类型的碰撞网格体应用给静态网格体资源。

现在还不能使用蓝图或Python来导入另一个静态网格体并将其用作自定义的碰撞网格体。要实现这个目的，可以采用以下任意一种方式：

-   使用静态网格体编辑器用户界面从支持的文件格式导入碰撞网格体。
    
-   同时将碰撞网格体作为可见静态网格体导入，使用特定的命名规则注明其代表想要用于碰撞测试的几何体。具体详情，请参见[FBX静态网格体管线](/documentation/zh-cn/unreal-engine/fbx-static-mesh-pipeline-in-unreal-engine#%E7%A2%B0%E6%92%9E)或[Datasmith概述](/documentation/zh-cn/unreal-engine/datasmith-plugins-overview)。
    

选择实现方法：

Blueprints Python

可在 **编辑器脚本（Editor Scripting） > 静态网格体（Static Mesh）** 类别下找到需要管理静态网格体碰撞的节点。

要使用这些节点，蓝图类必须派生自Editor-only类，例如 **PlacedEditorUtilityBase** 类。有关细节，请参阅[使用蓝图脚本化编辑器](/documentation/zh-cn/unreal-engine/scripting-and-automating-the-unreal-editor)。

设置碰撞会修改静态网格体资源。如果要保留所做的更改，接下来还需使用 **保存资源（Save Asset）** 或 **保存已加载的资源（Save Loaded Asset）** 等节点。

可在`unreal.EditorStaticMeshLibrary`类中找到管理静态网格体碰撞所需的大部分函数。

设置LOD会修改静态网格体资源。如果要保留所做的更改，接下来还需要使用 `unreal.EditorAssetLibrary.save_asset()`或`unreal.EditorAssetLibrary.save_loaded_asset()` 等函数。

## 添加简单碰撞形态

要将新的简化碰撞形状添加到静态网格体，请使用 **Add Simple Collisions** 节点（你需要添加 **静态网格体编辑器子系统（Static Mesh Editor Subsystem）** 作为目标，此节点才能起作用）。使用 **形状类型（Shape Type）** 输入可控制你想添加哪种碰撞形状。这些选项与静态网格体编辑器的 **碰撞（Collision）** 菜单中提供的选项匹配。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/316e4ae9-5b55-422d-af63-c07fe3424798/02-set-collisions-simple-bp.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/316e4ae9-5b55-422d-af63-c07fe3424798/02-set-collisions-simple-bp.png)

点击查看大图。

要为静态网格体添加简单碰撞形态，请使用 `unreal.EditorStaticMeshLibrary.add_simple_collisions()` 函数。传递它：

*要修改的 `unreal.StaticMesh` 对象。* 表示要创建的碰撞Primitive的类型的 `unreal.ScriptingCollisionShapeType` 列举中的项。这些选项与静态网格体编辑器的 **碰撞（Collision）** 菜单中提供的选项匹配。

例如：

import unreal asset\_path = "/Game/ArchVis/Mesh" def add\_box\_collision (static\_mesh): # 可以改为使用.SPHERE、.CAPSULE、.NDOP10\_X、.NDOP10\_Y、.NDOP10\_Z、.NDOP18、.NDOP26 shape\_type = unreal.ScriptingCollisionShapeType.BOX unreal.EditorStaticMeshLibrary.add\_simple\_collisions(static\_mesh, shape\_type) unreal.EditorAssetLibrary.save\_loaded\_asset(static\_mesh) # 获取路径中所有资源的列表。 all\_assets = unreal.EditorAssetLibrary.list\_assets(asset\_path) # 将它们全部装入内存。 all\_assets\_loaded = \[unreal.EditorAssetLibrary.load\_asset(a) for a in all\_assets\] # 过滤该列表，使之只包含静态网格体。 static\_mesh\_assets = unreal.EditorFilterLibrary.by\_class(all\_assets\_loaded, unreal.StaticMesh) # 在列表中的每个静态网格体上运行上面的函数。 list(map(add\_box\_collision, static\_mesh\_assets))

请注意，该操作会为静态网格体的现有的任何其他简单碰撞形态添加新的碰撞形态（如有）。如果要先删除现有的碰撞形态，请参阅下面的 *删除所有简单碰撞* 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/004d6d13-50c8-4e8b-9df3-bd1abc0048e0/03-set-collisions-simple-result.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/004d6d13-50c8-4e8b-9df3-bd1abc0048e0/03-set-collisions-simple-result.png)

点击查看大图。

## 自动生成凸面碰撞

要根据静态网格体的可见几何体为该网格体自动生成凸包碰撞形状，请使用 **Set Convex Decomposition Collisions** 节点（你需要添加 **静态网格体编辑器子系统（Static Mesh Editor Subsystem）** 作为目标，此节点才能起作用）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41111ddb-0a13-4c41-88e6-38e5edea6028/04-set-convex-decomposition-collisions-bp.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/41111ddb-0a13-4c41-88e6-38e5edea6028/04-set-convex-decomposition-collisions-bp.png)

点击查看大图。

该节点中的输入与在静态网格体编辑器用户界面选择 **碰撞（Collisions） > 自动凸面碰撞（Auto Convex Collisions）** 时要求你提供的选项完全匹配。它们控制生成的碰撞网格体的复杂度和保真度。一般情况下，值越大，生成的碰撞网格体越接近于静态网格体的可见几何体，但是运行时模拟它的成本也越高。

要从静态网格体的可见几何体为其自动生成凸面碰撞形态，请使用 `unreal.EditorStaticMeshLibrary.set_convex_decomposition_collisions()` 函数。传递它：

*要修改的 `unreal.StaticMesh` 对象。* 三个定义最大凸包数、每个凸包的最大顶点数和凸包精度的整数。这些参数与在静态网格体编辑器用户界面选择 **碰撞（Collisions） > 自动凸面碰撞（Auto Convex Collisions）** 时要求你提供的选项完全匹配。它们控制生成的碰撞网格体的复杂度和保真度。一般情况下，值越大，生成的碰撞网格体越接近于静态网格体的可见几何体，但是运行时模拟它的成本也越高。

例如：

import unreal asset\_path = "/Game/ArchVis/Mesh" def set\_convex\_collision (static\_mesh): unreal.EditorStaticMeshLibrary.set\_convex\_decomposition\_collisions(static\_mesh, 4, 12, 460000) unreal.EditorAssetLibrary.save\_loaded\_asset(static\_mesh) # 获取路径中所有资源的列表。 all\_assets = unreal.EditorAssetLibrary.list\_assets(asset\_path)# 将它们全部装入内存。 all\_assets\_loaded = \[unreal.EditorAssetLibrary.load\_asset(a) for a in all\_assets\]# 过滤该列表，使之只包含静态网格体。 static\_mesh\_assets = unreal.EditorFilterLibrary.by\_class(all\_assets\_loaded, unreal.StaticMesh)# 在列表中的每个静态网格体上运行上面的函数。 list(map(set\_convex\_collision, static\_mesh\_assets))

在新的网格体生成前，会自动从静态网格体删除所有现有的碰撞网格体。

请注意，相较于使用简单碰撞Primitive，该方法生成的效果比较不容易预测且比较不规则。最好在不规则的网格体上使用，或在可以可视化方式调整生成设置以确保生成的结果足够简单并且非常适合于静态网格体的可见几何体时使用。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4148b9cd-5cdb-4e55-a29f-3726b5f20844/05-set-collisions-convex-result.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4148b9cd-5cdb-4e55-a29f-3726b5f20844/05-set-collisions-convex-result.png)

点击查看大图。

## 删除所有简单碰撞

你可以使用 **Remove Collisions** 节点清除分配到你的静态网格体的所有碰撞网格体（你需要添加 **静态网格体编辑器子系统（Static Mesh Editor Subsystem）** 作为目标，此节点才能起作用）。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7dfa5cb4-890b-4ad5-a102-27a1791d61d9/06-set-collisions-remove-bp.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7dfa5cb4-890b-4ad5-a102-27a1791d61d9/06-set-collisions-remove-bp.png)

点击查看大图。

删除后，任何"简单"物理碰撞测试都无法发现该网格体，但是考虑静态网格体的可见几何体的"详细"测试仍能够发现它。另请参阅[简单和复杂碰撞](/documentation/zh-cn/unreal-engine/simple-versus-complex-collision-in-unreal-engine)。

可使用 `unreal.EditorStaticMeshLibrary.remove_collisions()` 函数清除所有指定给静态网格体的碰撞网格体。

例如：

import unreal asset\_path = "/Game/ArchVis/Mesh" def remove\_collisions (static\_mesh): unreal.EditorStaticMeshLibrary.remove\_collisions(static\_mesh) unreal.EditorAssetLibrary.save\_loaded\_asset(static\_mesh) # 获取路径中所有资源的列表。 all\_assets = unreal.EditorAssetLibrary.list\_assets(asset\_path)# 将它们全部装入内存。 all\_assets\_loaded = \[unreal.EditorAssetLibrary.load\_asset(a) for a in all\_assets\]# 过滤该列表，使之只包含静态网格体。 static\_mesh\_assets = unreal.EditorFilterLibrary.by\_class(all\_assets\_loaded, unreal.StaticMesh)# 在列表中的每个静态网格体上运行上面的函数。 list(map(remove\_collision, static\_mesh\_assets))

删除后，任何"简单"物理碰撞测试都无法发现该网格体，但是考虑静态网格体的可见几何体的"详细"测试仍能够发现它。另请参阅[简单和复杂碰撞](/documentation/zh-cn/unreal-engine/simple-versus-complex-collision-in-unreal-engine)。

\## 在碰撞中使用LOD

如果已为静态网格体设置了细节层次（Levels of Detail）（LOD），可使用其中一个细节较少的LOD作为碰撞网格体。

调用 `set_editor_property()` 函数（在 `unreal.StaticMesh` 对象上），以将 `lod_for_collision` 属性设置为要使用的LOD索引。例如：

import unreal asset\_path = "/Game/ArchVis/Mesh" def use\_lod\_for\_collisions (static\_mesh): static\_mesh.set\_editor\_property("lod\_for\_collision", 3) unreal.EditorAssetLibrary.save\_loaded\_asset(static\_mesh) # 获取路径中所有资源的列表。 all\_assets = unreal.EditorAssetLibrary.list\_assets(asset\_path) # 将它们全部装入内存。 all\_assets\_loaded = \[unreal.EditorAssetLibrary.load\_asset(a) for a in all\_assets\] # 过滤该列表，使之只包含静态网格体。 static\_mesh\_assets = unreal.EditorFilterLibrary.by\_class(all\_assets\_loaded, unreal.StaticMesh) # 在列表中的每个静态网格体上运行上面的函数。 list(map(use\_lod\_for\_collision, static\_mesh\_assets))

另请参阅[如何设置LOD碰撞](/documentation/zh-cn/unreal-engine/creating-and-using-lods-in-unreal-engine)。

尚不可以通过蓝图或Python设置自定义碰撞网格体。要导入自定义网格体并在物理模拟中将它用作静态网格体的碰撞网格体，必须执行以下任一操作：

-   使用静态网格体编辑器用户界面从受支持的文件格式导入碰撞网格体。
-   导入可见静态网格体时将碰撞网格体一起导入，并使用特殊的命名规范来表明它表示的是你要用于碰撞测试的几何体。有关细节，请参阅[FBX静态网格体流程](/documentation/zh-cn/unreal-engine/fbx-static-mesh-pipeline-in-unreal-engine#%E7%A2%B0%E6%92%9E)，或或[Datasmith概述](/documentation/zh-cn/unreal-engine/datasmith-plugins-overview)。

-   [editor](https://dev.epicgames.com/community/search?query=editor)
-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [python](https://dev.epicgames.com/community/search?query=python)
-   [collision](https://dev.epicgames.com/community/search?query=collision)
-   [how-to](https://dev.epicgames.com/community/search?query=how-to)
-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [scripting](https://dev.epicgames.com/community/search?query=scripting)
-   [variant manager](https://dev.epicgames.com/community/search?query=variant%20manager)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [添加简单碰撞形态](/documentation/zh-cn/unreal-engine/setting-up-collisions-with-static-meshes-in-blueprints-and-python-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E7%AE%80%E5%8D%95%E7%A2%B0%E6%92%9E%E5%BD%A2%E6%80%81)
-   [自动生成凸面碰撞](/documentation/zh-cn/unreal-engine/setting-up-collisions-with-static-meshes-in-blueprints-and-python-in-unreal-engine#%E8%87%AA%E5%8A%A8%E7%94%9F%E6%88%90%E5%87%B8%E9%9D%A2%E7%A2%B0%E6%92%9E)
-   [删除所有简单碰撞](/documentation/zh-cn/unreal-engine/setting-up-collisions-with-static-meshes-in-blueprints-and-python-in-unreal-engine#%E5%88%A0%E9%99%A4%E6%89%80%E6%9C%89%E7%AE%80%E5%8D%95%E7%A2%B0%E6%92%9E)