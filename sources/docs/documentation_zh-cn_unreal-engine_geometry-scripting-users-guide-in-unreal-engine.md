# 虚幻引擎中的几何体脚本用户指南。 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:09:30.984Z

---

目录

![几何体脚本用户指南](https://dev.epicgames.com/community/api/documentation/image/7cd1cf43-910c-4fe1-b460-e780e3574cde?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

## 什么是几何体脚本？

**几何体脚本（Geometry Scripting）** 是虚幻引擎插件，包含一组函数库，可以通过蓝图（BP）和Python生成并编辑网格体几何体。要查看所有可用函数，请参阅[几何体脚本参考](/documentation/404)。

几何体脚本 `UFunctions` 和蓝图节点对 `UDynamicMesh` 对象进行操作，这些是使用 `FDynamicMesh3` C++三角形网格体数据结构创建的对象。这是 **几何体处理（Geometry Processing）** 插件和 **建模（Modeling）** 编辑器模式使用的相同数据结构。

你可以在 **编辑器工具控件（Editor Utility Widgets）** 和 **资产操作（Asset Actions）** 中使用几何体脚本创建自定义网格体分析、处理和编辑工具。你还可以在 **Actor蓝图（Actor Blueprints）** 中使用它来创建程序化对象并实现复杂的结合体查询。

几何体脚本有各种潜在用法：

-   对第三方网格体导入程序进行测试和质量分析。
-   分析网格体UV以识别存在纹理空间浪费的资产。
-   使用脚本合并网格体资产以用于制片工作流程。
-   程序化网格体Actor，例如[Lyra示例游戏](/documentation/zh-cn/unreal-engine/lyra-geometry-tools-in-unreal-engine)中使用的关卡设计工具。

## 启用插件

使用几何体脚本需要启用关联的插件。

要启用插件或验证它是否已启用，请执行以下操作：

1.  在 **[菜单栏](/documentation/zh-cn/unreal-engine/level-editor-in-unreal-engine#%E8%8F%9C%E5%8D%95%E6%A0%8F)** 中，选择 **编辑（Edit）** > **插件（Plugins）** 。
    
2.  在搜索栏中输入"geometry script"。
    
    ![启用几何体脚本插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/be823bbd-7e50-4597-a978-089737ef817b/enable-plugin.png)
3.  启用 **几何体脚本（Geometry Script）** 插件，并在弹出对话框中选择 **是（Yes）** 。
4.  重启引擎。

## 动态网格体对象

几何体脚本对多种新的对象类型操作：

-   `UDynamicMesh`
-   `UDynamicMeshComponent`
-   `ADynamicMeshActor`

类似于静态网格体、静态网格体组件和静态网格体Actor架构，这些类并不专属于几何体脚本插件。它们位于 **几何体框架（Geometry Framework）** 引擎模块中，可以独立于几何体脚本使用。

### 动态网格体

启用几何体脚本的核心组件是 `UDynamicMesh` 对象。此 `UObject` 是未绑定到特定组件的网格体数据结构的容器。这与 `UProceduralMeshComponent` 等之前的虚幻引擎方法不同之处在于，网格体几何体可以在没有显式场景呈现的情况下进行创建和操控。

例如， `UDynamicMesh` 可以基于 `UStaticMesh` 初始化，进行编辑，然后存回资产。此方法与编辑器工具控件一起提供用户界面，使技术美术师能够在蓝图中自行创建拥有特定用途的自定义网格体编辑工具，或通过Python为网格体资产的查询和编辑操作编写脚本。

你还可以将各种Actor几何体类型转换为 `UDynamicMesh` 或反向转换，例如Gameplay体积。

### 动态网格体组件

除了 `UDynamicMesh` 之外， `UDynamicMeshComponent` 也已提升为"真实"（非临时、可序列化）的组件。此组件类似于 `UProceduralMeshComponent` ；但是，它受 `UDynamicMesh` 支持，你可以通过几何体脚本进行操控。

`UDynamicMeshComponent` 在过去几年一直作为网格体建模工具集的一部分进行开发，提供了网格体编辑的实时预览。类似于 `UProceduralMeshComponent` ，它支持更新网格体几何体，以更新顶点属性，创建并修改整个网格体拓扑。你可以在编辑器中以及在运行时执行这些更新。

支持光线追踪；但不支持Nanite和Lumen。

### 动态网格体Actor

`ADynamicMeshActor` 类似于 `AStaticMeshActor` 之处在于，它基本上是 `UDynamicMeshComponent` 的容器。但是，动态网格体Actor为想要基于 `UDynamicMesh` 实现程序化网格体生成的Actor蓝图提供了明确支持。

利用动态网格体Actor，几何体脚本和建模模式工具可以创建和编辑任一类型的网格体Actor以及体积。

### 生成的动态网格体Actor

`AGeneratedDynamicMeshActor` 是 `ADynamicMeshActor` 的子类，提供了实现基于蓝图的程序化网格体Actor的额外支持。具体来说，此类提供函数 **On Rebuild Generated Mesh** ，该函数可以在BP子类中实现以生成网格体，而不必在 **构造脚本（Construction Script）** 中实现。该函数可提供更好的编辑器中交互性能，并为将来更细致地管理大规模程序化几何体的生成操作留下了空间。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1153921-e626-482a-9d7b-314eba8170d1/rebuild-generated-mesh.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a1153921-e626-482a-9d7b-314eba8170d1/rebuild-generated-mesh.png)

*Event On Rebuild Generated Mesh* 仅存在于从GeneratedDynamicMeshActor类派生的Actor蓝图。此外， **Generated Dynamic Mesh Actor** 函数目前仅限用于编辑器。

### UStaticMesh和UDynamicMesh的主要差别

不同于 `UStaticMesh` ， `UDynamicMesh` 不是资产。`UDynamicMeshComponent` 拥有其 `UDynamicMesh` ；而不是像 `UStaticMesh` 那样在多个组件之间共享。 此差异意味着，实例化渲染不可用，等等。

动态网格体只存储在关卡中，而不是在单独的资产文件中。复制 `UDynamicMeshComponent` 会创建网格体的副本（创建新网格体而不是实例）。在关卡或项目之间传输必须通过复制和粘贴操作完成。

在许多方面， `UDynamicMeshComponent` 的行为更像Autodesk 3ds Max、Autodesk Maya或Blender等数字内容创建（DCC）工具中的网格体对象。此处理确实会带来潜在的问题，因为巨大的网格会显著增加关卡文件的大小。但是，通过[一个Actor一个文件](/documentation/zh-cn/unreal-engine/one-file-per-actor-in-unreal-engine)，网格体数据将存储在OFPA Actor文件中而不是在关卡中（所以，数据仍有可能很大，但会在单独的文件中）。

## 函数模式

大部分几何体脚本函数遵循标准模式，类似于下面所示的 **Apply Mesh Plane Cut** 节点。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6163b0e8-f6aa-40e6-ab25-9cb2e47b4fcb/geometry-script-node-pattern.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6163b0e8-f6aa-40e6-ab25-9cb2e47b4fcb/geometry-script-node-pattern.png)

第一个参数 **目标网格体（Target Mesh）** 是该操作编辑的 `UDynamicMesh` 。一般来说，几何体脚本操作会修改输入网格体，而不是创建新网格体，以避免创建多个临时网格体对象。输入 `UDynamicMesh` 总是作为输出返回，也称为 **目标网格体（Target Mesh）** （ `相同名称 == 相同对象` ）。利用此设置，可以轻松将多个操作串连起来。

几何体脚本节点有许多参数和设置。我们将最常用的选项公开为参数，但你可以在特定于操作的 **选项（Options）** 结构中找到其他选项。要创建恰当选项结构，最常见的方式是拖移空的 **选项（Options）** 引脚。此外，你可以右键点击 **选项（Options）** 引脚，然后使用 **拆分结构体引脚（Split Struct Pin）** 上下文菜单项直接展开节点中的选项结构，如下所示。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3d6cb4b-fc64-4338-a388-2520784384f7/node-options.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3d6cb4b-fc64-4338-a388-2520784384f7/node-options.png)

大部分节点还有一个 **调试（Debug）** 引脚，用于为网格体生成器提供几何体调试支持。这在目前尚未加以利用，只是未来功能的占位符。

## 使用UDynamicMesh池

在网格体生成器中创建临时网格体是很常见的做法，例如使用要从主网格体中去掉的图元网格体。为此，需要临时的 `UDynamicMesh` 。虽然你可以使用 **Construct Object From Class** 函数创建一个，但你必须在使用之后对网格体进行垃圾回收。不过，如果你会频繁运行生成器，在多次运行之间复用网格体会更高效。

动态网格体Actor使用 `UDynamicMeshPool` 对这种情况提供了内置支持。要使用此设置，你可以调用 **Request and Release Mesh** 获取临时网格体，并通过 **With Mesh** 执行引脚使用它。临时网格体会在执行继续前，通过 **After Release** 引脚被自动释放。每个临时网格体可以使用 **Release Compute Mesh** 或 **Release All Compute Meshes** 来显式释放，后者会返回当前从池中分配的所有临时网格体。

在编辑器工具控件中，没有默认动态网格体池实例用于分配其中的网格体。但是，你可以使用 **Create Dynamic Mesh Pool** 创建一个（例如，作为编辑器工具控件或工具蓝图中的变量）。

对于使用动态网格体池的示例，请参阅[通过蓝图编写几何体脚本](/documentation/en-us/unreal-engine/geometry-scripting-through-blueprints-in-unreal-engine)和[使利用几何体脚本创建操作工具](/documentation/zh-cn/unreal-engine/create-action-utilities-with-geometry-scripting--in-unreal-engine)教程。

## 创建程序化网格体

如前所述，几何体脚本的一个用例是使用Actor蓝图创建程序化网格体。下面的示例使用 **生成的动态网格体Actor（Generated Dynamic Mesh Actor）** 的BP子类。**Event On Rebuild Generated Mesh** 将填充 `UDynamicMeshComponent` 的 `UDynamicMesh` 。`UDynamicMesh` 将传递到几何体脚本函数 **Append Box** ，后者基于输入变量创建网格体。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71d24c59-8473-4ae8-882a-c2ac2dbc687a/procedural-box-example-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71d24c59-8473-4ae8-882a-c2ac2dbc687a/procedural-box-example-1.png)

该脚本会使用一些参数创建参数化盒体图元网格体，美术师只需使用几个BP节点即可在编辑器中调整这些参数。通过添加更多节点，你可以直接在蓝图中构建越来越复杂的网格体生成器。要扩展此脚本并继续了解几何体脚本，请参阅[通过蓝图编写的几何体脚本](/documentation/en-us/unreal-engine/geometry-scripting-through-blueprints-in-unreal-engine)。

![使用几何体脚本的程序化网格体](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b59b035b-13c6-4725-a121-e6b52c6e92df/procedural-mesh.gif)

## 附加说明

要检查特定函数是否存在，请参阅[几何体脚本参考](/documentation/404)文档。

一些函数（例如 **Apply PolyGroup Catmull Clark SubD** ）仅限用于编辑器。此设置意味着你只能在编辑器工具Actor/操作/控件或生成的动态网格体Actor BP子类中使用这些函数。

大部分几何体脚本函数仅适用于 `UDynmicMesh` 对象。有一些函数用于将内部网格体表示从静态网格体、骨骼网格体或体积Actor转换为 `UDynamicMesh` ，也有一些函数往相反方向转换。不存在其他几何体类型的函数，例如地形、几何体缓存或集合、Groom和布料。

目前， `UDynamicMeshComponent` 不支持以下功能：

-   Nanite
-   网格体距离场
-   细节级别
-   实例化渲染

Actor蓝图和编辑器工具蓝图总是在游戏线程上执行，因此调用的几何体脚本函数也在游戏线程上运行。一些几何体脚本函数在任务线程上内部执行一部分工作，例如，对ParallelFor、Async或 `UE::Tasks::Launch()` 的C++调用。但是，这仅在单个函数的上下文中发生，并且该函数在所有这些并行工作都完成后才会返回。

-   [modeling](https://dev.epicgames.com/community/search?query=modeling)
-   [geometry](https://dev.epicgames.com/community/search?query=geometry)
-   [beta](https://dev.epicgames.com/community/search?query=beta)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [什么是几何体脚本？](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E4%BB%80%E4%B9%88%E6%98%AF%E5%87%A0%E4%BD%95%E4%BD%93%E8%84%9A%E6%9C%AC%EF%BC%9F)
-   [启用插件](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E5%90%AF%E7%94%A8%E6%8F%92%E4%BB%B6)
-   [动态网格体对象](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E5%8A%A8%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E5%AF%B9%E8%B1%A1)
-   [动态网格体](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E5%8A%A8%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [动态网格体组件](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E5%8A%A8%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93%E7%BB%84%E4%BB%B6)
-   [动态网格体Actor](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E5%8A%A8%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93actor)
-   [生成的动态网格体Actor](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E7%94%9F%E6%88%90%E7%9A%84%E5%8A%A8%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93actor)
-   [UStaticMesh和UDynamicMesh的主要差别](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#ustaticmesh%E5%92%8Cudynamicmesh%E7%9A%84%E4%B8%BB%E8%A6%81%E5%B7%AE%E5%88%AB)
-   [函数模式](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E5%87%BD%E6%95%B0%E6%A8%A1%E5%BC%8F)
-   [使用UDynamicMesh池](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E4%BD%BF%E7%94%A8udynamicmesh%E6%B1%A0)
-   [创建程序化网格体](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E5%88%9B%E5%BB%BA%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [附加说明](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine#%E9%99%84%E5%8A%A0%E8%AF%B4%E6%98%8E)

相关文档

[

建模模式入门指南

![建模模式入门指南](https://dev.epicgames.com/community/api/documentation/image/489f6edb-4469-4fd7-ab43-2a5eabecd191?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/getting-started-with-modeling-mode)