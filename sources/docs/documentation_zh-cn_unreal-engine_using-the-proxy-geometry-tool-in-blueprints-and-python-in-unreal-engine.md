# Using the Proxy Geometry Tool in Blueprints and Python in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/using-the-proxy-geometry-tool-in-blueprints-and-python-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:02:13.694Z

---

目录

![Using the Proxy Geometry Tool in Blueprints and Python](https://dev.epicgames.com/community/api/documentation/image/83a4d235-c755-49bc-9a84-06aa9e920083?resizing_type=fill&width=1920&height=335)

You can invoke the Proxy Geometry tool from Blueprint聽and Python scripts. This can help you automate your Asset creation and data preparation pipeline, combining and simplifying Static Mesh Actors and their Materials from scripts that you run inside the Unreal Editor. This can significantly improve rendering performance at the cost of some visual precision.

For example, this wheel assembly contains 147 separate Static Mesh Actors with a total of 900,000 triangles, with a separate聽Material for each mesh. This adds up to hundreds of heavy聽drawcalls on the GPU. After running the Proxy Geometry tool, the Actors are merged into a single model with a single Material, which can be rendered with one drawcall.

![Before: 147 Static Meshes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9a3be48c-0862-4ebf-84cf-d2a891291771/proxygeom-wheel-before-1.png)

![After: 1 Static Mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d091b9a7-4b07-4704-8390-fe21a25b01aa/proxygeom-wheel-after.png)

Before: 147 Static Meshes

After: 1 Static Mesh

The triangle count is also reduced by 97%.聽This has聽caused some deformation, but聽you can adjust the聽settings in your script to find the right balance between simplification and聽visual聽quality.

Because the Proxy Geometry tool involves some relatively complex transformations to your geometry, and offers many settings to control its operation, we recommend getting started with the tool by using it through its UI in the Editor. Move on to invoking it from scripts only when you are confident that you understand the tool, its settings, and have a good idea of the effects you're expecting. See the rest of the guides in this section for more information.

**Prerequisite:** If you haven't already done so, you'll need to install the Editor Scripting Utilities Plugin. For details, see [Scripting and Automating the Editor](/documentation/zh-cn/unreal-engine/scripting-and-automating-the-unreal-editor).

选择实现方法：

Blueprints Python

The Proxy Geometry tool is exposed through the **Editor Level Library > Create Proxy Mesh Actor** node.

![Create Proxy Mesh Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4c5a03d7-b3e5-4929-ac87-75f74e84773e/proxy-scripting-createproxymeshactor.png "Create Proxy Mesh Actor")

You'll need to give this node the following inputs:

-   An Array that contains all Static Mesh Actors that you want to merge. Note that these must be Static Mesh Actors, not Actors that contain Static Mesh Components.
-   An **Editor Scripting Create Proxy Mesh Actor Options** object that contains the settings used by the proxy geometry tool. This object exposes most of the settings that are shown in the Proxy Geometry tool's UI. To get one of these objects, drag to the left from the **Merge Options** input, and choose **Make EditorScriptingCreateProxyMeshActorOptions**.
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68cc213f-d146-41b9-83fa-b1b075922d58/proxygeom-script-makeoptions.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/68cc213f-d146-41b9-83fa-b1b075922d58/proxygeom-script-makeoptions.png)
    
    Click for full image.
    
    Use this object to provide the settings for the Proxy Geometry tool. Many of the detailed settings are provided in another object, which you pass to the **Mesh Proxy Settings** input. To get one of these objects, repeat what you did above: drag left from the **Mesh Proxy Settings** input, and choose **Make MeshProxySettings**.
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b12c920-31f0-4694-8e3d-08ecb39bebfb/proxygeom-script-makemeshsettings.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b12c920-31f0-4694-8e3d-08ecb39bebfb/proxygeom-script-makemeshsettings.png)
    
    Click for full image.
    

For example, the following snippet takes all the Actors that are currently selected in the Level Viewport and World Outliner, merges them together into a proxy mesh, saves the result to an Asset with a specified name and location, and replaces the original Static Mesh Actors in the Level with聽a single instance of the newly generated proxy聽Asset.

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44d33cd9-331a-4312-a245-6f0527669b9d/proxygeom-scripting-example.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44d33cd9-331a-4312-a245-6f0527669b9d/proxygeom-scripting-example.png)

Click for full image.

The Proxy Geometry tool is exposed through the `unreal.EditorLevelLibrary.create_proxy_mesh_actor()` function. You'll聽need to pass this function the following parameters:

-   An Array that contains all of the Static Mesh Actors that you want to merge. Note that these must be Static Mesh Actors, not Actors that contain Static Mesh Components.
-   An `unreal.EditorScriptingCreateProxyMeshActorOptions` object that contains the settings to be聽used by the proxy geometry tool. This object exposes most of the settings that are shown in the Proxy Geometry tool's UI. You'll need to create one of these objects and set up its properties.

For example, the following snippet takes all the Static Mesh Actors in the Level, merges them together into a proxy mesh, saves the result to an Asset called Proxy, and swaps out the original Static Mesh Actors in the Level for a single instance of the Proxy Asset.

import unreal actors = unreal.EditorLevelLibrary.get\_selected\_level\_actors() merge\_options = unreal.EditorScriptingCreateProxyMeshActorOptions() merge\_options.base\_package\_name = "/Game/Proxy" merge\_options.destroy\_source\_actors = False merge\_options.new\_actor\_label = "Proxy" merge\_options.spawn\_merged\_actor = True merge\_options.mesh\_proxy\_settings.set\_editor\_property("allow\_adjacency", False) merge\_options.mesh\_proxy\_settings.set\_editor\_property("allow\_distance\_field", False) merge\_options.mesh\_proxy\_settings.set\_editor\_property("allow\_vertex\_colors", False) merge\_options.mesh\_proxy\_settings.set\_editor\_property("calculate\_correct\_lod\_model", True) merge\_options.mesh\_proxy\_settings.set\_editor\_property("compute\_light\_map\_resolution", True) merge\_options.mesh\_proxy\_settings.set\_editor\_property("create\_collision", False) merge\_options.mesh\_proxy\_settings.set\_editor\_property("generate\_lightmap\_u\_vs", True) merge\_options.mesh\_proxy\_settings.set\_editor\_property("merge\_distance", 1.0) merge\_options.mesh\_proxy\_settings.set\_editor\_property("voxel\_size", 0.1) merged\_actor = unreal.EditorLevelLibrary.create\_proxy\_mesh\_actor(actors, merge\_options)

-   [optimization](https://dev.epicgames.com/community/search?query=optimization)
-   [proxy geometry tool](https://dev.epicgames.com/community/search?query=proxy%20geometry%20tool)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)