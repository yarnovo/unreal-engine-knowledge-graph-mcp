# DMX Activity and Channel Monitors in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:29:45.412Z

---

目录

![DMX MVR Import and Export](https://dev.epicgames.com/community/api/documentation/image/ea5a1c69-9d0a-42b2-bf05-1e892bb1dfc3?resizing_type=fill&width=1920&height=335)

“In the entertainment industry, the MVR file format allows programs to share data and geometry for a scene. A scene is a set of parametric objects such as fixtures, trusses, video screens, and other objects that are used in the entertainment industry.” (Quote: MVR Standard)

You can import MVR Files into Unreal Engine to use with DMX. Manually importing an MVR file only includes DMX-related fixtures and patching information. To also import static and scene geometry, use [Datasmith](/documentation/404) and the [Datasmith MVR plugin](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#importanmvrfileusingthedatasmithmvrplugin).

## Import an MVR File Manually

To manually import an MVR file into Unreal Engine, follow these steps:

1.  Drag the MVR file from your device into the **Content Browser**. This creates a DMX Library Asset using the data from the MVR file.
2.  Drag the DMX Library Asset into the level to populate the **DMX MVR Scene Actor**. This spawns the DMX-enabled Blueprint Actors at the right location along with their transforms.

It is possible but not recommended to add the same DMX Library to a level more than once. Adding more than one may lead to ambiguous MVR Fixture IDs for the actors, which will cause limitations during MVR export.

### DMX MVR Scene Actor

The DMX MVR Scene Actor contains a list of DMX-enabled Blueprints, automatically chosen to match the attributes of the fixtures described in the MVR file.

![A screenshot of the DMX MVR Scene Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6bb259fd-b3e4-40ef-8ab8-f1d34d19cba2/dmx-mvr-scene-actor.png)

### GDTF To Spawned Actor

This section of the **Details** panel shows a list of fixtures described in the MVR file. Each fixture has a GDTF signature file and a matched DMX-enabled Blueprint.

Use the dropdown menu on the right to match a different Blueprint to the fixture. This replaces all Blueprint nodes for that fixture's GDTF entry.

![A screenshot of the GDTF to Spawned Actor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1b201e2a-94d5-4b6b-89dc-bca6d5dc1220/gdtf-to-spawned-actor.png)

You can only select Blueprints that implement the **MVR Fixture Actor Interface**.

### DMX MVR Fixture Actor Interface

You can implement the MVR Fixture Actor Interface in any actor class in Blueprints or C++.

![A screenshot of the DMX MVR Fixture Actor Interface](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a032524-59f1-47af-8071-cd3ff117b267/fixture-actor.png)

**On MVR Get Supported DMX Attributes** returns the attributes that the Blueprint's actor supports. When an MVR file is imported, each fixture is automatically matched with the Blueprint of the actor with the most matching attributes.

Actors that implement the DMX MVR Fixture Actor Interface need to have exactly one DMX component attached. The component is automatically patched when the actor is spawned in an MVR scene. The engine logs an error if no or many DMX components are used in an Actor that implements the DMX MVR Fixture Actor Interface.

## Import an MVR File Using The Datasmith MVR Plugin

### Export MVR and Datasmith Files from Vectorworks Datasmith

1.  In Datasmith, click **File** > **Export** > **Unreal Datasmith (3D Only)** to export your Vectorworks scene.
2.  Click **File** > **Export** > **MVR** to export the DMX-related data from fixtures, GDTF, and patching information.

Place your MVR file in the same directory and use the same filename as the `.udatasmith` file from step 1.

### Import MVR and Datasmith Files into Unreal Engine

1.  In Unreal Engine, go to the Main Toolbar and click Create > Datasmith > File Import…
    
    ![A screenshot of the File Import menu option](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a24d6bc3-10b7-4237-8993-6390970b0fb4/import-datasmith-file.png)
2.  In the dialog, enable **Import MVR** to import DMX-related fixtures and patching information. If you only require the 3D geometry from the Datasmith file, then you can uncheck this option.
    

Place the MVR file in the same directory location as the `*.datasmith` file.

![A screenshot of the Datasmith Import Options window](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/203ad5fd-380c-4672-9ece-9a75c76d7c97/datasmith-import-options.png)

### Unreal Imported Scene

The following example shows a sample Vectorworks project in Unreal Engine once fully imported through this process.

![A screenshot of a sample Vectorworks project imported into Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2407e1c2-4424-4d01-9dd6-68a3114188ac/unreal-imported-scene.png)

Note the following elements in the editor:

1.  Content Browser
    -   Datasmith Scene
    -   DMX Library
2.  Preview Window
    -   Instanced 3D scene, geometry with textures and materials
    -   Instanced DMX enabled fixture BPs
3.  Datasmith Scene Actor
    -   Actor Scene Geometry actor
    -   DMX MVR Scene Actor
4.  Datasmith settings

#### Datasmith Scene

This asset contains all the mesh, texture, and material references imported from Vectorworks through Datasmith.

![The Details panel for a Datasmith scene](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d416693b-5a69-4a2c-96d0-8b2df38bef1d/datasmith-scene.png)

#### DMX Library

The DMX Library asset contains the following information:

1.  Fixture Types
2.  GDTF signature
3.  Attribute definitions

![A screenshot of a DMX Library](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b6d91433-f421-4860-b00a-1a8124a9b57e/dmx-library.png)

It also includes the DMX patching data imported from Vectorworks using the MVR standard.

![A screenshot of the DMX patching data](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/09443de3-4f77-4b5f-a43f-704fd1214893/dmx-patching-data.png)

#### Datasmith Scene Actor

The instantiated Datasmith Scene Actor in your level contains two actors:

-   Actor Scene Geometry actor: this contains all of the instantiated 3D geometry, materials and texture references. !A screenshot of the Actor Scene Geometry actor\](actor-scene-geometry.png)
-   DMX MVR Scene Actor: This contains all of the DMX-enabled fixture Blueprints. These Blueprints are automatically chosen when you import the MVR file. You can choose to assign different Blueprints in the **GDTF To Spawned Actor** section.
    
    ![A screenshot of the DMX MVR Scene Actor](dmx-mvr-scene-actor2.png)

Use the **Details** panel to access **Update actors from Scene** and **Respawn** options for the **DatasmithSceneActor**. For more information about respawning and updating actors, refer to [Reimporting Datasmith Content](/documentation/zh-cn/unreal-engine/datasmith-reimport-workflow-in-unreal-engine).

![A screenshot of the DatasmithSceneActor options](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7500e64-e7de-4442-95ec-58e0968baf1a/update-actors.png)

MVR and Datasmith scene actors are mutually exclusive in ownership and control. A live sync from Datasmith will not work with an MVR scene actor.

## MVR Exporter

![A promotional graphic of two stylized file icons, an MVR file and a GDTF file.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3b492bc-83e7-442c-bd98-11230b85a5fc/mvr-exporter.png)

You can use the MVR Exporter in Unreal Engine to share DMX Libraries with lighting desks and 3rd party software.

The exported MVR file includes the following information from the DMX Library:

-   Patching information
-   Fixture definitions
-   Fixture GDTF signatures

### Limitations

You can only export DMX Libraries that have associated, unedited GDTF signature files through the MVR format. You can't export your DMX Library as an MVR file if it contains manually-created fixture types that don't have a GDTF signature file, or GDTF-imported Fixture Types that you edited after importing.

### MVR Export Process

To export a DMX Library as an MVR file, open the DMX Library from the **Content Browser** and click **Export**.

![A screenshot of the Export button](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ad10fe46-6adf-4ead-8eba-a9055533fa47/mvr-export-button.png)

Unreal Engine relies on Datasmith to import scene elements. If the DMX Library was created from an MVR file, then it retains the scene elements when the DMX Library is exported as an MVR file.

-   [dmx](https://dev.epicgames.com/community/search?query=dmx)
-   [ar/vr/xr](https://dev.epicgames.com/community/search?query=ar%2Fvr%2Fxr)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Import an MVR File Manually](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#importanmvrfilemanually)
-   [DMX MVR Scene Actor](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#dmxmvrsceneactor)
-   [GDTF To Spawned Actor](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#gdtftospawnedactor)
-   [DMX MVR Fixture Actor Interface](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#dmxmvrfixtureactorinterface)
-   [Import an MVR File Using The Datasmith MVR Plugin](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#importanmvrfileusingthedatasmithmvrplugin)
-   [Export MVR and Datasmith Files from Vectorworks Datasmith](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#exportmvranddatasmithfilesfromvectorworksdatasmith)
-   [Import MVR and Datasmith Files into Unreal Engine](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#importmvranddatasmithfilesintounrealengine)
-   [Unreal Imported Scene](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#unrealimportedscene)
-   [Datasmith Scene](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#datasmithscene)
-   [DMX Library](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#dmxlibrary)
-   [Datasmith Scene Actor](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#datasmithsceneactor)
-   [MVR Exporter](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#mvrexporter)
-   [Limitations](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#limitations)
-   [MVR Export Process](/documentation/zh-cn/unreal-engine/dmx-mvr-import-and-export-in-unreal-engine#mvrexportprocess)