# 使用虚幻引擎中的交换导入资产 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:01:18.907Z

---

目录

![使用交换导入资产](https://dev.epicgames.com/community/api/documentation/image/d39b50d8-561a-4f3e-af0f-f63bfce49e67?resizing_type=fill&width=1920&height=335)

**交换框架（Interchange Framework）** 是虚幻引擎的导入和导出框架。它与文件格式无关，异步，可自定义，可在运行时使用。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3209215-1cc2-480c-a001-3a57278e7842/interchange-interface.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3209215-1cc2-480c-a001-3a57278e7842/interchange-interface.png)

交换导入接口

交换使用可扩展的代码库，并提供可自定义的管线堆栈。这样你就可以根据项目的需求自由地使用蓝图或Python编辑导入管线。

## 重要概念和术语

-   **管线（Pipeline）** ：处理所导入数据的操作的集合。管线公开了用于自定义导入过程的选项。
-   **管线堆栈（Pipeline Stack）** ：处理所导入文件的管线的有序列表。管线在堆栈中组合并指定为特定文件格式。管线堆栈位于 **项目设置（Project Settings）> 交换（Interchange）** 中。
-   **工厂（Factory）** ：从导入的数据生成资产的操作。

## 启用交换插件

交换框架需要 **交换编辑器（Interchange Editor）** 和 **交换框架（Interchange Framework）** 插件，这些插件默认启用。如果在你的项目中没有启用，请在项目的项目设置中将其启用。如需详细了解如何启用插件，请参阅[使用插件](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine)。

## 导入资产

在虚幻引擎中，导入资产的方法有很多种。你可以使用内容侧滑菜单或内容浏览器导入资产，也可以从主菜单选择 **文件（File）> 导入到关卡中（Import Into Level）** 来导入资产。如需详细了解如何导入文件，请参阅[直接导入资产](/documentation/zh-cn/unreal-engine/importing-assets-directly-into-unreal-engine)。

**导入到关卡中（Import Into Level）** 目前适用于[glTF](/documentation/zh-cn/unreal-engine/the-gl-transmission-format-gltf-in-unreal-engine)和 **MaterialX** 文件格式。

## 导入过程

这些方法会触发导入过程。

1.  使用上面列出的方法之一开始导入过程。
2.  这会打开 **交换管线（Interchange Pipeline）** 配置窗口。
3.  从 **选择管线堆栈（Choose Pipeline Stack）** 下拉菜单选择要使用的管线堆栈。
4.  配置你的设置，并按 **导入（Import）** 完成该过程。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26f7c8dc-b8af-41e0-ac3d-5a9b33669d46/click-import.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26f7c8dc-b8af-41e0-ac3d-5a9b33669d46/click-import.png)

使用该接口选择你的导入设置并点击"导入（Import）"继续。

对于每种方法，引擎都会检查文件格式是否受交换框架支持。如果支持，交换会使用适合你的格式的导入管线堆栈，并经历以下过程：

1.  交换会将导入的数据转化为虚幻引擎中的中间节点结构。
2.  交换会遍历管线堆栈，并按照导入说明操作。
3.  使用工厂从结果生成资产。

如果文件格式不受交换支持，虚幻引擎将使用旧版框架导入文件。

## 使用交换重新导入资产

当你重新导入之前使用交换导入的资产时，虚幻引擎会记住使用的管线堆栈和选项，并显示这些选项。

## 使用蓝图导入资产

你可以使用蓝图通过交换框架将资产导入到虚幻引擎中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa783594-bf1a-4820-bb80-e714ee007b48/blueprint-interchange.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa783594-bf1a-4820-bb80-e714ee007b48/blueprint-interchange.png)

蓝图示例会创建一个在运行时使用交换导入文件的对象。

例如，你可以使用此功能，在基于虚幻引擎的应用程序中在运行时使用交换来导入文件。上面的示例创建了一个函数，它会使用默认纹理管线堆栈将纹理文件导入指定文件位置。这种导入方法目前不支持骨骼网格体或动画数据。

### 创建新的蓝图类

要重新创建示例，请执行以下步骤：

1.  在你的项目中创建新的Actor蓝图类，以包含该函数。右键点击 **内容浏览器（Content Browser）** 并从上下文菜单选择 **蓝图类（Blueprint Class）** 。
2.  在 **选择父类（Pick Parent Class）** 窗口中，选择 **Actor** 并将新蓝图类命名为 **InterchangeActor** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6be5c227-a2f0-49a7-97e6-abcf514a7f53/parent-class.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6be5c227-a2f0-49a7-97e6-abcf514a7f53/parent-class.png)
    
    选择新蓝图的父类。
    

### 添加函数

1.  双击该新蓝图，打开编辑器。
2.  在 **我的蓝图（My Blueprint）** 面板中，点击 **函数（Functions）** 分段中的 **+** 按钮，并将新函数命名为 **InterchangeImport** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92795333-3f5f-4247-a049-e18072a3c68b/add-function.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/92795333-3f5f-4247-a049-e18072a3c68b/add-function.png)
    
    创建新函数
    

### 添加和连接节点

1.  添加 **Sequence** 节点并将其连接到函数的输出。
2.  拖移 **Then 0** 输出并创建 **Create Source Data** 节点，以引用将导入的现有文件。
3.  拖移 **Create Source Data** 上的 **输入文件名（In File Name）** 输入，并从上下文菜单选择 **提升到变量（Promote to Variable）** 。
4.  将新的字符串变量命名为 **FilePath** 。这会保存将导入的文件的位置。
5.  在蓝图中，选择新变量并选中 **实例可编辑（Instance Editable）** 复选框。这样可按蓝图实例编辑该变量。
6.  将 **Create Source Data** 节点的输出提升到名为 **SourceData** 的新变量。
7.  拖移Sequence上的 **Then 1** 输出，并创建 **Get Interchange Manager Scripted** 节点。这会创建要在下一步中使用的交换管理器的指针。
8.  拖移 **Get Interchange Manager Scripted** 的输出并创建 **Import Asset** 节点。将 **Get Interchange Manager Scripted** 的返回值连接到 **Import Asset** 上的 **目标输入（Target input）** 。
9.  拖移 **内容路径（Content Path）** 输入并将其提升到名为 **SavePath** 的新变量。这会保存新导入的文件的位置。
10.  在蓝图中，选择新变量并选中 **实例可编辑（Instance Editable）** 复选框。
11.  获取"源数据（Source Data）"变量的引用，并将其连接到 **Import Asset** 上的"源数据（Source Data）"输入。
12.  拖移 **导入资产参数（Import Asset Parameters）** 输入并创建 **Make Input Asset Parameters** 节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f53f61c7-c1ae-4a4b-bdec-f6704e8c1bbe/blueprint-interchange.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f53f61c7-c1ae-4a4b-bdec-f6704e8c1bbe/blueprint-interchange.png)
    
    点击查看大图。
    

### 使函数在运行时可用

1.  在 **我的蓝图（My Blueprints）** 面板中，点击 **InterchangeImport** 函数并在 **细节（Details）** 面板中选中 **在编辑器中调用（Call In Editor）** 旁边的复选框。此选项将使函数在运行时在 **InterchangeActor** 对象的 **细节（Details）** 中可用。
2.  **保存（Save）** 并 **编译（Compile）** 你的蓝图。

### 使用你的新蓝图

1.  将InterchangeActor蓝图的副本拖入关卡中。
2.  点击 **播放（Play）** 。
3.  选择 **大纲视图（Outliner）** 中的 **InterchangeActor** 。
4.  填写 **细节（Details）** 面板中的 **FilePath** 和 **SavePath** 。
5.  点击 **交换导入（Interchange Import）** 按钮导入你的文件。

使用上面的蓝图示例添加 **Import Scene** 节点会将资产直接生成到场景中。

### 在烘焙的应用程序中使用交换

如果你计划在运行时在烘焙的应用程序中使用交换框架，请将 **Interchange** 文件夹添加到[项目设置](/documentation/zh-cn/unreal-engine/project-settings-in-unreal-engine)的 **项目 - 打包（Project - Packaging）** 分段中的 **要烘焙的其他资产目录（Additional Asset Directories to Cook）** 。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39349a4e-5c33-4d33-b65d-a364c2289e89/add-cook-directory.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39349a4e-5c33-4d33-b65d-a364c2289e89/add-cook-directory.png)

点击查看大图。

## 使用Python导入资产

你可以使用Python脚本通过交换框架将资产导入到虚幻引擎中。

```cpp
import unreal

import_path = "C:/Users/foo/Downloads/Fbx/SkeletalMesh/Animations/Equilibre.fbx"

import_extension = unreal.Paths.get_extension(import_path, False)

is_gltf = import_extension == 'glb' or import_extension == 'gltf'

is_fbx = import_extension == 'fbx'

#如果你想要导入fbx文件，请确保已经启用了交换框架
if is_fbx:
    level_editor_subsystem = unreal.get_editor_subsystem(unreal.LevelEditorSubsystem)
    unreal.SystemLibrary.execute_console_command(level_editor_subsystem.get_world(), 'Interchange.FeatureFlags.Import.FBX true')

editor_asset_subsystem = unreal.get_editor_subsystem(unreal.EditorAssetSubsystem)

transient_path = "/Interchange/Pipelines/Transient/"
transient_pipeline_path = transient_path + "MyAutomationPipeline"

editor_asset_subsystem.delete_directory(transient_path)

#Duplicate the default interchange asset content pipeline, gltf have a special assets
if is_gltf:
    pipeline = editor_asset_subsystem.duplicate_asset("/Interchange/Pipelines/DefaultGLTFAssetsPipeline", transient_pipeline_path)
else:
    pipeline = editor_asset_subsystem.duplicate_asset("/Interchange/Pipelines/DefaultAssetsPipeline", transient_pipeline_path)

#Set any pipelines properties you need for your asset import here

#force static mesh import
pipeline.common_meshes_properties.force_all_mesh_as_type = unreal.InterchangeForceMeshType.IFMT_STATIC_MESH
#combine static mesh
pipeline.mesh_pipeline.combine_static_meshes = True
#Prevent Material import
pipeline.material_pipeline.import_materials = False
#Prevent Texture import
pipeline.material_pipeline.texture_pipeline.import_textures = False

#Create a source data from the filename 
source_data = unreal.InterchangeManager.create_source_data(import_path)
#create the parameters for the interchange import
import_asset_parameters = unreal.ImportAssetParameters()
#Script is normaly an automated import
import_asset_parameters.is_automated = True

#将配置管线添加到导入参数
import_asset_parameters.override_pipelines.append(unreal.SoftObjectPath(transient_pipeline_path + ".MyAutomationPipeline"))
#gltf importer use 2 pipeline add the second one
if is_gltf:
    import_asset_parameters.override_pipelines.append(unreal.SoftObjectPath("/Interchange/Pipelines/DefaultGLTFPipeline"))

interchange_manager = unreal.InterchangeManager.get_interchange_manager_scripted()
#import the asset
interchange_manager.import_asset("/game/AA0A/testpython/",source_data,import_asset_parameters)

editor_asset_subsystem.delete_directory(transient_path)
```

在上面的示例中，Python脚本用于导入 `Equilibre.fbx` 文件。脚本会检查文件格式是 `.gltf` 还是 \`.fbx，然后指定正确的管线。

## 编辑管线堆栈

交换框架的一大优势是，能够选择和自定义管线堆栈，这是一个可自定义的过程堆栈，而这些过程用于处理资产数据。 你可以将管线添加到默认管线堆栈，以添加导入过程中的行为。

虚幻引擎随附以下默认管线：

-   默认资产管线
-   默认材质管线
-   默认纹理管线
-   默认场景资产管线
-   默认场景关卡管线
-   默认图表检查器管线

每个默认管线都包含用于该类型导入的最常见选项。你可以进一步自定义这些管线，满足项目的特定需要。

### 编辑现有管线

每个默认管线都可自定义，以满足项目和团队的需要。

下面是为项目自定义导入选项的方法：

-   在你的 **项目设置（Project Settings）** 中添加、删除、重新排序现有管线堆栈。
-   更改默认使用的管线。
-   修改现有默认管线。
-   创建自定义管线。

### 编辑项目设置

你可以在 **项目设置（Project Settings）** 中的 **引擎（Engine）> 交换（Interchange）** 下找到管线堆栈：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/738be79a-50b2-4731-bf48-04ebdcb80e7b/pipeline-stack.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/738be79a-50b2-4731-bf48-04ebdcb80e7b/pipeline-stack.png)

项目设置中的管线堆栈。

管线堆栈包含以下各项的默认设置：

-   导入内容
-   导入到关卡中
-   编辑器接口
-   通用
-   编辑器通用管线类

#### 导入内容

虚幻引擎会使用这些设置将内容导入到 **内容侧滑菜单** 或 **内容浏览器** 中。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc51a87a-3024-4da4-9537-bbf8fa151b9d/interchange-import-content.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fc51a87a-3024-4da4-9537-bbf8fa151b9d/interchange-import-content.png)

点击查看大图。

你可以为列出的每种内容类型改变设置。你还可以根据需要添加额外的标题。例如，默认配置包含 **资产（Assets）** 、 **材质（Materials）** 和 **纹理（Textures）** 。你可以将一个额外的分段添加到动画的管线堆栈，然后能够添加一个或多个自定义管线来处理传入的动画文件。

#### 导入到关卡中

在编辑器窗口的主菜单中， **文件（File）> 导入到关卡中（Import Into Level）** 选项在将内容导入到引擎中时使用这些设置。默认情况下，这将使用一起工作的两个管线，从文件导入Actor数据，然后在关卡中生成Actor：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a52db9dc-5472-4ab3-8a20-59f3610455de/interchange-import-level.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a52db9dc-5472-4ab3-8a20-59f3610455de/interchange-import-level.png)

点击查看大图。

-   **DefaultSceneAssetPipeline** 基于与DefaultAssetPipeline相同的类，并且设计用于场景导入。
-   **DefaultSceneLevelPipeline** 将在数据通过DefaultSceneAssetPipeline之后在世界中生成Actor。

### 修改现有默认管线

你可以修改默认交换管线的属性，以便更改以下内容：

-   默认值
-   可视性
-   只读状态

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45742186-5f54-41ae-9805-5f44e938ed70/interchange-pipeline-details.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/45742186-5f54-41ae-9805-5f44e938ed70/interchange-pipeline-details.png)

交换管线细节面板。

要更改默认交换管线的设置，请执行下面的步骤：

1.  在内容侧滑菜单或内容浏览器中找到默认管线，然后双击打开一个管线。管线位于 **Engine > Plugins > Interchange Framework Content > Pipelines** 文件夹中。如果你看不到Engine文件夹，请点击 **内容侧滑菜单** 或 **内容浏览器** 右上角的 **设置（Settings）** ，并选中 **显示引擎内容（Show Engine Content）** 复选框。
2.  根据需要编辑以下内容：
    1.  导入和重新导入过程中的可视性。
    2.  默认设置。
    3.  该属性在导入过程中是否为只读。
3.  保存并关闭窗口。

### 创建自定义管线

你可以使用蓝图、C++或Python创建新的交换管线，进一步自定义导入过程。

#### 使用蓝图创建自定义管线

要使用蓝图创建新的交换管线，请执行下面的步骤：

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5162005-1054-49b5-b7e0-4194bc5ad689/interchange-new-blueprint-pipeline.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c5162005-1054-49b5-b7e0-4194bc5ad689/interchange-new-blueprint-pipeline.png)

选择InterchangePipelineBase作为父类。

1.  右键点击 **内容侧滑菜单** 或 **内容浏览器** 并选择 **创建蓝图类（Create Blueprint Class）** 。
2.  在 **选择父类（Pick Parent Class）** 窗口中，展开 **全部类（All Classes）** 类别并选择 **InterchangePipelineBase** 作为其父类。

双击新蓝图打开 **Blueprint Editor** 。使用蓝图创建的自定义管线有以下函数，可以将其覆盖以添加自定义行为。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2b02124-3ff8-482d-b087-57a00e5c2520/interchange-blueprint-overrides.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2b02124-3ff8-482d-b087-57a00e5c2520/interchange-blueprint-overrides.png)

交换蓝图覆盖函数。

**覆盖函数**

**说明**

**Scripted Can Execute on Any Thread**

向交换管理器传达此管线可以在异步模式中执行的信息。

**Scripted Execute Export Pipeline**

在导出过程中执行（功能当前不起作用。

**Scripted Execute Pipeline**

在文件转换之后执行。创建生成资产所需的工厂。

**Scripted Execute Post Factory Pipeline**

在工厂创建资产之后但调用PostEditChange函数之前执行。

**Scripted Execute Post Import Pipeline**

在资产完全导入之后并调用PostEditChange函数之后执行。

**Scripted Set Reimport Source Index**

执行并向管线表明要重新导入哪个源索引。在重新导入可能有多个源的资产时使用此函数。例如，将一个源文件用于几何体并将另一个用于蒙皮信息的骨骼网格体。

#### 使用C++创建自定义管线

要使用C++创建新的交换管线，请创建包含以下内容的头文件：

```cpp
#pragma once
​
#include "CoreMinimal.h"
​
#include "InterchangePipelineBase.h"
#include "InterchangeSourceData.h"
#include "Nodes/InterchangeBaseNodeContainer.h"
​
#include "InterchangeMyPipeline.generated.h"
​
UCLASS(BlueprintType)
class INTERCHANGEPIPELINES_API UInterchangeMyPipeline : public UInterchangePipelineBase
{
	GENERATED_BODY()
​
​
protected:
	virtual void ExecutePipeline(UInterchangeBaseNodeContainer* BaseNodeContainer, const TArray<UInterchangeSourceData*>& SourceDatas) override;
​
	virtual bool CanExecuteOnAnyThread(EInterchangePipelineTask PipelineTask) override
	{
		
		return true;
	}
};

```

接下来，创建包含以下内容的源文件：

```cpp
#include "InterchangeMyPipeline.h"
​
​
void UInterchangeMyPipeline::ExecutePipeline(UInterchangeBaseNodeContainer* NodeContainer, const TArray<UInterchangeSourceData*>& InSourceDatas)
{
	Super::ExecutePipeline(NodeContainer, InSourceDatas);
​	
	// 将你需要的逻辑放在已转换的节点或工厂节点上
}

```

如需详细了解如何在虚幻引擎中使用C++，请参阅[使用C++编程](/documentation/zh-cn/unreal-engine/programming-with-cplusplus-in-unreal-engine)。

#### 使用Python创建自定义管线

要使用Python脚本创建新的交换管线，请创建新的Python脚本，并使用项目设置将其添加到[启动脚本](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python)。如需详细了解如何在虚幻引擎中使用Python脚本，请参阅[使用Python对虚幻编辑器编写脚本](/documentation/zh-cn/unreal-engine/scripting-the-unreal-editor-using-python)。

在下面的示例脚本中，Python脚本用于创建基本资产导入管线。

```python
import unreal
​
@unreal.uclass()
class PythonPipelineTest(unreal.InterchangePythonPipelineBase):
​
	import_static_meshes = unreal.uproperty(bool,meta=dict(Category="StaticMesh"))
	import_skeletal_meshes = unreal.uproperty(bool,meta=dict(Category="SkeletalMesh"))
​
	def cast(self, object_to_cast, object_class):
		try:
			return object_class.cast(object_to_cast)
		except:
			return None
​
	def recursive_set_node_properties(self, base_node_container, node_unique_id):
		node = base_node_container.get_node(node_unique_id)
		# 设置静态网格体工厂节点启用状态
		static_mesh_node = self.cast(node, unreal.InterchangeStaticMeshFactoryNode)
		if static_mesh_node:
			static_mesh_node.set_enabled(self.import_static_meshes)
		# 设置骨骼网格体工厂节点启用状态
		skeletal_mesh_node = self.cast(node, unreal.InterchangeSkeletalMeshFactoryNode)
		if skeletal_mesh_node:
			skeletal_mesh_node.set_enabled(self.import_static_meshes)
		## 对子项迭代
		childrens = base_node_container.get_node_children_uids(node.get_unique_id())
		for child_uid in childrens:
			self.recursive_set_node_properties(base_node_container, child_uid)
​
	@unreal.ufunction(override=True)
	def scripted_execute_pipeline(self, base_node_container, SourceDatas):
		root_nodes = base_node_container.get_roots()
		for node_unique_id in root_nodes:
			self.recursive_set_node_properties(base_node_container, node_unique_id)
		return True
```

-   [import](https://dev.epicgames.com/community/search?query=import)
-   [working with content](https://dev.epicgames.com/community/search?query=working%20with%20content)
-   [export](https://dev.epicgames.com/community/search?query=export)
-   [data pipeline](https://dev.epicgames.com/community/search?query=data%20pipeline)
-   [interchange](https://dev.epicgames.com/community/search?query=interchange)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [重要概念和术语](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E9%87%8D%E8%A6%81%E6%A6%82%E5%BF%B5%E5%92%8C%E6%9C%AF%E8%AF%AD)
-   [启用交换插件](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E5%90%AF%E7%94%A8%E4%BA%A4%E6%8D%A2%E6%8F%92%E4%BB%B6)
-   [导入资产](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E5%AF%BC%E5%85%A5%E8%B5%84%E4%BA%A7)
-   [导入过程](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E5%AF%BC%E5%85%A5%E8%BF%87%E7%A8%8B)
-   [使用交换重新导入资产](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%BA%A4%E6%8D%A2%E9%87%8D%E6%96%B0%E5%AF%BC%E5%85%A5%E8%B5%84%E4%BA%A7)
-   [使用蓝图导入资产](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%93%9D%E5%9B%BE%E5%AF%BC%E5%85%A5%E8%B5%84%E4%BA%A7)
-   [创建新的蓝图类](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E5%88%9B%E5%BB%BA%E6%96%B0%E7%9A%84%E8%93%9D%E5%9B%BE%E7%B1%BB)
-   [添加函数](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%87%BD%E6%95%B0)
-   [添加和连接节点](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%92%8C%E8%BF%9E%E6%8E%A5%E8%8A%82%E7%82%B9)
-   [使函数在运行时可用](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E4%BD%BF%E5%87%BD%E6%95%B0%E5%9C%A8%E8%BF%90%E8%A1%8C%E6%97%B6%E5%8F%AF%E7%94%A8)
-   [使用你的新蓝图](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E4%BD%BF%E7%94%A8%E4%BD%A0%E7%9A%84%E6%96%B0%E8%93%9D%E5%9B%BE)
-   [在烘焙的应用程序中使用交换](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E5%9C%A8%E7%83%98%E7%84%99%E7%9A%84%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F%E4%B8%AD%E4%BD%BF%E7%94%A8%E4%BA%A4%E6%8D%A2)
-   [使用Python导入资产](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E4%BD%BF%E7%94%A8python%E5%AF%BC%E5%85%A5%E8%B5%84%E4%BA%A7)
-   [编辑管线堆栈](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E7%BC%96%E8%BE%91%E7%AE%A1%E7%BA%BF%E5%A0%86%E6%A0%88)
-   [编辑现有管线](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E7%BC%96%E8%BE%91%E7%8E%B0%E6%9C%89%E7%AE%A1%E7%BA%BF)
-   [编辑项目设置](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E7%BC%96%E8%BE%91%E9%A1%B9%E7%9B%AE%E8%AE%BE%E7%BD%AE)
-   [导入内容](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%86%85%E5%AE%B9)
-   [导入到关卡中](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E5%AF%BC%E5%85%A5%E5%88%B0%E5%85%B3%E5%8D%A1%E4%B8%AD)
-   [修改现有默认管线](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E4%BF%AE%E6%94%B9%E7%8E%B0%E6%9C%89%E9%BB%98%E8%AE%A4%E7%AE%A1%E7%BA%BF)
-   [创建自定义管线](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AE%A1%E7%BA%BF)
-   [使用蓝图创建自定义管线](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%93%9D%E5%9B%BE%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AE%A1%E7%BA%BF)
-   [使用C++创建自定义管线](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E4%BD%BF%E7%94%A8c++%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AE%A1%E7%BA%BF)
-   [使用Python创建自定义管线](/documentation/zh-cn/unreal-engine/importing-assets-using-interchange-in-unreal-engine#%E4%BD%BF%E7%94%A8python%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AE%A1%E7%BA%BF)