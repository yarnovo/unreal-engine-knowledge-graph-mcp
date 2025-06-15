# MetaSound Builder API in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:22:45.552Z

---

目录

![MetaSound Builder API](https://dev.epicgames.com/community/api/documentation/image/f1f2d001-9a83-42d9-ae7d-490e00319f29?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

The **MetaSound Builder API** refers to the public Blueprint and C++ API that enables gameplay developers and designers to author MetaSounds procedurally from gameplay code with variations you can use to support different hardware performance levels. With the Builder API, you can create MetaSounds in memory without using the MetaSound Editor.

Additionally, builder-managed MetaSound Sources provide the following benefits:

-   You can serialize them at edit time.
-   You can play them at edit or runtime.
-   You can audition changes live with the Blueprint API. With this, you can produce audible feedback for multiple MetaSound graphs in real time with buffer crossfade support without pops or clicks due to graph changes.

The Builder API does not currently support variables. Paged inputs and graphs also have limited support and are not authorable by Blueprint nor outside of edit time from the frontend Builder API.

## Builder API Overview

The Builder API refers to a loosely related collection of classes or structs in the MetaSound plugin that enable the authoring and execution of MetaSounds.

The MetaSound Editor, Engine, Frontend, and GraphCore modules each have their a builder in charge of:

-   Managing MetaSound visualization,
-   UObject manipulation and reflection,
-   serialization,
-   execution.

This document covers how to author MetaSounds more broadly, the `BuilderSubsystem` class (in the MetaSound Engine module), and the `FrontendDocumentBuilder` struct (in the Frontend module).

![slide_3](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c36cc62f-047d-49d2-a799-d2d3452f0ccd/slide_3.png)

MetaSound `UObject` asset classes (`UMetaSoundSource` and `UMetaSoundPatch` types) contain a struct called the `MetaSoundFrontendDocument`.

The `MetaSoundFrontendDocument` contains:

-   All graph information necessary to build a `MetaSoundGenerator` instance for playback.
-   Style and display metadata utilized by the graph (including node placement coordinates, graph object display names, and widget display information).

The `MetaSoundFrontendDocumentBuilder` struct manipulates the `MetaSoundFrontendDocument` struct. The Blueprint-friendly classes discussed below wrap the `MetaSoundFrontendDocumentBuilder` struct.

## Introduction to Builder Blueprint UClasses

The following table provides an introduction to the primary Blueprint UClasses used when building MetaSounds.

**Class Name**

**Context**

**Description**

**MetaSound Builder Subsystem**

Editor / Runtime

Entry point to create and access MetaSound Builders.

**MetaSound Editor Subsystem**

Editor Only

Entry point for manipulating editor-only MetaSound data and exporting or serializing MetaSound assets.

**MetaSound Asset Subsystem**

Editor / Runtime

MetaSound-specific asset-loading/unloading related functionality.

**MetaSound Patch**

Editor / Runtime

Encapsulates shareable utility MetaSound graph behavior.

**MetaSound Source**

Editor / Runtime

Encapsulates a graph that outputs audio as a single sound source.

**MetaSound Document Interface**

Editor / Runtime

Base Interface implemented by all MetaSound UObjects as entry point to MetaSound Frontend Document struct.

**MetaSound Patch Builder**

Editor / Runtime

UObject used to mutate or query MetaSound Patch UObjects.

**MetaSound Source Builder**

Editor / Runtime

UObject used to mutate or query MetaSound Source UObjects.

## Builder Graph Handles

The following UStructs are handles to various types of graph data found in a MetaSound Document.

Underlying handle IDs may be changed when versioning content or rebuilding a transient asset. You should never serialize these.

**Handle Name**

**Description**

**MetaSound Node Handle**

Handle to a node in a MetaSound graph.

**MetaSound Node Output Handle**

Handle to a node output in a MetaSound graph.

**MetaSound Node Input Handle**

Handle to a node input in a MetaSound graph.

## Builder Blueprint Functions And Editor Actions

Virtually all functionality in the Blueprint Builder API can be related to executable actions that can be performed in the MetaSound Editor.

The most common actions (paired with their MetaSound Editor equivalents) are listed in the sections below.

### MetaSound Construction

Utilizing the MetaSound Builder Subsystem, the following example shows the construction of a builder that creates a new analogous, internally managed MetaSound as it relates to creating a MetaSound from the Content Browser.

Constructing a Source builder returns the builder and handles the underlying MetaSound graph's inputs and outputs.

![slide_8](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b3fb566-6959-4703-9d6c-eb9be9fbb24a/slide_8.png)

Some handles may be invalid or contextual depending on the options set on the Create Source Builder Blueprint node's input. For example, depending on the Is One Shot Blueprint input options, the returned OnFinished node input handle may or may not be valid.

![slide_9](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a71b22c6-b142-4d69-a2bb-665e8469776f/slide_9.png)

### Adding Or Removing Interfaces

Similar to utilizing the interface MetaSound panel in the MetaSound Editor, the Blueprint API enables adding and removing entire related sets of inputs and outputs using interfaces.

![slide_10](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e11c487b-5b0c-4774-b6c3-560ac89ce365/slide_10.png)

### Adding Nodes

You can add nodes with two functions. The first requires a class name and is for natively-defined node classes such as Mixer, Math, or Generator. The second function requires a reference to an object reference that implements a MetaSound Document Interface (for example, MetaSound Source or MetaSound Patch).

![slide_11](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/725936d5-1962-4126-9424-f957f5028a82/slide_11.png)

You can determine the name of a natively-defined node class without access to the code by holding **Shift** while hovering a node's name in the MetaSound Editor. A tooltip will display debug info for that node, including the full class name.

![slide_12](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44ce8070-c142-4a2f-a71d-3af9722774ef/slide_12.png)

The Blueprint Builder API does not support adding template nodes like reroutes. However, the native Frontend Document Builder API does.

### Accessing MetaSound Node Vertices

You can access individual inputs and outputs on a node with the **Find Node Input/Output** functions.

![slide_13](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e0c7dde5-7a84-4b62-893d-2c35b72c7444/slide_13.png)

Depending on the module / code layer, node connection points may be called pins, vertices, or node inputs and outputs.

### Connecting MetaSound Node Vertices

You can apply connections between nodes by using the **Connect Nodes** function with corresponding input and output handles. This is equivalent to dragging connections between nodes in the MetaSound Editor.

![slide_14](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6b446025-1ae7-4a1e-b62b-e46393a68228/slide_14.png)

Depending on the module / code layer, the associations between vertices may be called connections or edges.

### Accessing Graph Input/Output Nodes

You can retrieve member node handles with the **Find Graph Input/Output** functions.

![slide_15](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb26db27-f865-4b49-9f1c-3be02a01f7e8/slide_15.png)

In the MetaSound Editor, you can hold **Shift** while hovering over a node's pin to display a tooltip with the code name of a given member. Vertices may have display names that differ from the FName.

### Element Removal

You can remove graph elements with the following functions:

-   **Disconnect Node** - Removes the connection between the provided input and output handles.
-   **Remove Node** - Removes the node associated with the given handle and any associated connections.
-   **Remove Graph Input/Output** - Removes the given graph vertex, node, and any associated connections.
-   **Remove Interface** - Removes the given interface and all related inputs, outputs, nodes, and connections.

![slide_16](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b84ace67-8dcb-46c8-bd12-bc4c8ad75f61/slide_16.png)

## Builder Auditioning

One of the MetaSound Source Builder's most powerful features is the ability to audition changes to the underlying MetaSound Source's graph topology in real time.

You can use the **Audition** function on a source builder to play the managed MetaSound Source on the provided AudioComponent. If you set **Live Updated Enabled**, changes to the graph's topology will be instantly reflected.

![slide_17](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/949bc0ef-1a69-40f7-81ff-0f7c1dc1898e/slide_17.png)

As of 5.5, Live Updates is a beta feature.

## MetaSound Editor Subsystem Builder Functions

You can use the **Find Or Begin Building** function to modify an existing MetaSound.

Due to requiring the **MetaSound Editor Subsystem**, you can only modify serialized MetaSound assets in editor builds.

![slide_18](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ed62fc3c-60f1-4bb1-a6fb-af98d58e75ae/slide_18.png)

To set a node's graph position, you can use the **Set Node Location** function on the MetaSound Editor Subsystem at edit time.

![slide_19](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db519a4e-0369-45fd-a2ae-68fc274f7f85/slide_19.png)

The **Build To Asset** function exports the Builder's MetaSound to a serialized asset with the provided name and path.

Use the right-click context menu in the **Content Browser** to get path information quickly.

![slide_20](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/266e1f98-fa03-4b21-a8f1-af7558cf685f/slide_20.png)

-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [audio](https://dev.epicgames.com/community/search?query=audio)
-   [sound sources](https://dev.epicgames.com/community/search?query=sound%20sources)
-   [metasounds](https://dev.epicgames.com/community/search?query=metasounds)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Builder API Overview](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#builderapioverview)
-   [Introduction to Builder Blueprint UClasses](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#introductiontobuilderblueprintuclasses)
-   [Builder Graph Handles](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#buildergraphhandles)
-   [Builder Blueprint Functions And Editor Actions](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#builderblueprintfunctionsandeditoractions)
-   [MetaSound Construction](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#metasoundconstruction)
-   [Adding Or Removing Interfaces](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#addingorremovinginterfaces)
-   [Adding Nodes](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#addingnodes)
-   [Accessing MetaSound Node Vertices](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#accessingmetasoundnodevertices)
-   [Connecting MetaSound Node Vertices](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#connectingmetasoundnodevertices)
-   [Accessing Graph Input/Output Nodes](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#accessinggraphinput/outputnodes)
-   [Element Removal](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#elementremoval)
-   [Builder Auditioning](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#builderauditioning)
-   [MetaSound Editor Subsystem Builder Functions](/documentation/zh-cn/unreal-engine/metasound-builder-api-in-unreal-engine#metasoundeditorsubsystembuilderfunctions)