# Getting started with Texture Graph in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:25:00.120Z

---

目录

![Getting started with Texture Graph](https://dev.epicgames.com/community/api/documentation/image/24b49ced-2cbb-48b1-9add-6d85466bcfd2?resizing_type=fill&width=1920&height=335)

The **Texture Graph Editor** provides artists a node-based interface to procedurally create and edit textures in Unreal Engine.

## Using the Texture Graph

[Textures](/documentation/zh-cn/unreal-engine/textures-in-unreal-engine) are part of the core process for creating experiences in Unreal Engine. Textures are primarily used in materials and user interfaces (UI). You can apply textures directly as an input, like base color, as a mask, or the RGBA values can be utilized in other calculations. Textures can be unique to an asset or tiled.

[Materials](/documentation/zh-cn/unreal-engine/unreal-engine-materials) may use several textures that are sampled and applied for different purposes. For instance, a simple material may have a Base Color, Specular, and Normal Map textures. In addition, there may be a map for Emissive and Roughness stored in the alpha channels of one or more of these same textures. Packing multiple values in a single texture allows them to be used more readily while saving draw calls for performance and reducing disk space.

Using a node graph similar to the [Material Editor](/documentation/zh-cn/unreal-engine/unreal-engine-material-editor-user-guide), you arrange nodes in the editor to create a texture graph which you then use to output textures. The network of nodes saves as texture graph asset.

You can combine texture graphs with Blueprints, materials, and material functions for unique workflows that are only possible within Unreal Engine. The editor works in conjunction with the [Texture Asset Editor](/documentation/zh-cn/unreal-engine/texture-asset-editor-in-unreal-engine), which provides additional controls for managing the texture asset.

## Loading the Plugin

The Texture Graph Editor is an experimental plugin that is not loaded by default when starting the engine.

To enable the plugin, follow these steps:

1.  In the **menu bar**, select **Edit > Plugins**.
    
2.  In the search bar, type "texture graph".
    
3.  Enable the **TextureGraph** plugin, and select **Yes** in the dialog popup.
    
4.  Restart the engine.
    

## Creating a New Graph

To create a new texture graph, open the **Content Drawer** and do one of the following:

-   Click **Add > Texture > Texture Graph**.
    
-   Right-click an empty space in the content browser and select **Texture > Texture Graph**. This option creates a texture graph asset in the current folder.
    

![Add Texture Graph Asset in Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/679bfde8-e89a-4f86-9c74-a182021d2370/create-texture-graph.png)

## Texture Graph UI

![The Texture Graph UI](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/172d15bd-a315-4f50-9302-56651ac9e46c/texture-graph-ui.png)

The Texture Graph UI

### Main Menu - 1

The main menu bar contains quick access to important graph management items like save, and open. The tool bar also has several graph specific tools.

![Texture Graph Main Menu Bar](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a5bdf205-ad83-4914-8c05-8a60d1463ec4/menu-bar.png)

Texture Graph Main Menu Bar

**Action**

**Description**

**Save**

Saves the current graph.

**Open**

Opens a graph from your content folder.

**Export**

Opens the export window which controls the graphs final texture export. This window provides control to which of the outputs in the graph get exported. You can choose to export just a single output or multiple textures if they exist.

**Update**

When Auto Update is not toggled on, the tool updates the graph thumbnails and output previews. This can be useful for complex graphs where the auto updating can be slow.

**Auto Update**

Turns the graph auto update on or off. Depending on the complexity of the graph you may decide to toggle this option off.

**Palette**

Displays the palette of nodes.

**Node Histogram**

Displays the node histogram, the histogram provides valuable information about the texture distribution of values.

### Node Palette - 2

The **Node Palette** contains all of the available nodes for use inside your texture graph. You can scroll through the library of nodes or use the search bar to find a specific node.

To add a node to the graph window, do one of the following:

-   Drag a node from the library to the main graph window.
    
-   Right-click in the graph window.
    
-   Drag a connection from an existing node's pins. This workflow has the advantage of creating the node connection once the node is placed. The node's connections are made from the initial pin to the first open input pin on the new node.
    

![Node Palette in Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5f45dcc7-e3d7-4a2c-b494-7f6d57c1106f/node-palette.png)

Node Palette

### Main Graph - 3

The main graph window is the primary view for assembling your graph. You can position nodes anywhere on the graph. In general, input and creation nodes are placed on the left, and the flow of the graph proceeds to the right, ending with output nodes that control what textures get written.

You can have a single or multiple outputs from a graph.

![Primary Graph View](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ef4fadc2-44a2-459a-8ef8-63ae540d3773/main-graph-view.png)

Primary Graph View

### Node Preview - 4

The **Node Preview** displays the texture of the selected node. The preview has options for viewing specific channels and adjusting the zoom level of the texture.

You can lock the preview to view a specific node while other nodes are adjusted. For example, locking the view to the final output but adjusting a blend parameter earlier in the graph.

![2D Preview in Texture Graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b21aeffc-4296-4467-b3cd-48b9ff1170cc/2d-preview.png)

2D Preview

![Image Histogram](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a3237fe8-0db4-4595-a21a-c2c478ae2338/image-histogram.png)

Image Histogram

### Details Panel - 5

The **Details** panel contains the properties for the currently selected node.

![Details Panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8a8cdc70-0e3a-462c-848d-c0ce7e2a2511/details-panel.png)

Details Panel

### 3D Viewport - 6

The **3D Preview** viewport displays the selected output map on a standard or user defined 3d mesh. You can define the mesh by dragging the asset directly into the view or by selecting the mesh and applying it with the custom mesh icon (teapot).

The visible map can be selected from the viewport Details panel.

![3D Viewport in Texture Graph Editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ce081d8e-bf41-4ea6-bf94-2f296f66b8fd/3d-viewport.png)

D Viewport

## Nodes

The node design for texture graph provides relevant information in a compact layout. With this layout artists can traverse the graph quickly and evaluate the flow of data easily. The node header shows the name or type of node. Nodes are colored based on type of operation. Below the name, is information about the image format of the node and the current resolution. The node header also contains a thumbnail preview.

![Basic Node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a36a568e-c583-44f7-8f2d-2d6af84c7b77/basic-node.png)

Basic Node

When expanded, all of the attributes of a node are exposed. This may include node specific attributes or only output settings for the node. In general these values are automatically set based on the evaluation of the graph. In some cases you may want to define custom settings instead of the values.

![Advanced Node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7eeeb061-9ac8-4513-81eb-3345cde5a714/advanced-node.png)

Advanced Node

## Materials

![Material Node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/830994b2-28f0-4e63-ba56-dc24d6520282/material-node.png)

Material Node

Unreal Engine has a powerful material system. The texture graph can leverage the material system by evaluating materials to create textures that can be utilized in the graph. A material, such as the standard concrete material can be loaded into a material node. You can then define the rendered attribute.

![Material Node Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6c19e13a-3a83-46bb-b991-9626b730b9f3/material-node-details.png)

Material Node Details

## Material Functions

The Texture Graph Editor can use some material functions directly. The **MaterialFunction** node exposes the input pins and attributes available from the material function. This can be extremely useful, allowing for the development of a graph without the need to recreate complex functions that may already exist. With this functionality, the texture graph leverages the robust material function library and toolset.

For example, the texture bombing material function can quickly be integrated to give more random repeating of a texture when compared to a simple repeat available in transform.

![Material Function Node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71ec04f1-5316-42a4-9a48-7418ded97412/material-function-node.png)

Material Function Node

![Material Function Details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/157d810e-e9db-4538-9df8-45305dc99c58/material-function-details.png)

Material Function Details

## Texture Graph Subgraphs

You can reuse texture graphs as a subgraph through the **TextureGraph** node. This is useful for custom repeated operations. For example, adding some noise to a mask.

The subgraph can contain a series of nodes to create a complex noise pattern with some specific variables controllable through scalar values.

![Texture Graph Subgraph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eaab69af-a8e5-41df-ac8b-483c56203709/texture-graph-subgraph.png)

Texture Graph Subgraph

When you use a **TextureGraph** node, the specified inputs are exposed along with any outputs defined in the subgraph. This provides the means for development and reuse of common operations.

![Texture Graph Node](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/881e7aff-b1c1-4e2b-9789-56dc83e441f5/texture-graph-node.png)

Texture Graph Node

## Texture Graph and Blueprints

You can combine a texture graph with Blueprints for a wide range of pipeline related functions to streamline common tasks.

When you load the Texture Graph plugin, you get additional functions in the \[palette\] of the Blueprint Editor. To learn more about Blueprints, see [Blueprints Visual Scripting](/documentation/en-us/unreal-engine/blueprints-visual-scripting-in-unreal-engine)g and [Blueprint Editor Palette](/documentation/en-us/unreal-engine/palette-in-the-bleprints-visual-scripting-editor-for-unreal-engine).

With these functions an existing graph can be controlled easily. For example, you can have a basic texture graph that creates a common UV checker pattern.

![Blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e684b6e6-e426-4310-b426-2f0c8d2ab3da/blueprint.png)

Blueprint Functions for Texture Graph

For a full list of functions and descriptions, see the [Blueprint API](/documentation/en-us/unreal-engine/BlueprintAPI/TextureGraph).

## Next Steps

With the fundamentals of texture graph, use the following resources to learn more about the nodes and to get started creating textures.

[](/documentation/zh-cn/unreal-engine/making-your-first-texture-graph-in-unreal-engine)

[![Making your First Texture Graph](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61d9dfdb-2010-485c-b833-3a6d7756758a/topic.png)](/documentation/zh-cn/unreal-engine/making-your-first-texture-graph-in-unreal-engine)

[Making your First Texture Graph](/documentation/zh-cn/unreal-engine/making-your-first-texture-graph-in-unreal-engine)

[Procedurally create a UV checker pattern texture with the Texture Graph Editor.](/documentation/zh-cn/unreal-engine/making-your-first-texture-graph-in-unreal-engine)

[

![Texture Graph Node Reference](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0b3dd461-019e-4c3d-8f48-0528a7b8017d/topic.png)

Texture Graph Node Reference

Texture Graph node reference for procedurally creating and editing textures.





](/documentation/zh-cn/unreal-engine/texture-graph-node-reference-in-unreal-engine)

-   [materials](https://dev.epicgames.com/community/search?query=materials)
-   [surfacing](https://dev.epicgames.com/community/search?query=surfacing)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Using the Texture Graph](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#usingthetexturegraph)
-   [Loading the Plugin](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#loadingtheplugin)
-   [Creating a New Graph](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#creatinganewgraph)
-   [Texture Graph UI](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#texturegraphui)
-   [Main Menu - 1](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#mainmenu-1)
-   [Node Palette - 2](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#nodepalette-2)
-   [Main Graph - 3](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#maingraph-3)
-   [Node Preview - 4](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#nodepreview-4)
-   [Details Panel - 5](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#detailspanel-5)
-   [3D Viewport - 6](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#3dviewport-6)
-   [Nodes](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#nodes)
-   [Materials](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#materials)
-   [Material Functions](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#materialfunctions)
-   [Texture Graph Subgraphs](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#texturegraphsubgraphs)
-   [Texture Graph and Blueprints](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#texturegraphandblueprints)
-   [Next Steps](/documentation/zh-cn/unreal-engine/getting-started-with-texture-graph-in-unreal-engine#nextsteps)