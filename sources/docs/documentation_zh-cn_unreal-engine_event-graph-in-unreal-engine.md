# Event Graph in Unreal Engine | Unreal Engine 5.6 Documentation | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/event-graph-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:35:07.628Z

---

目录

![EventGraph](https://dev.epicgames.com/community/api/documentation/image/483c2450-cf74-4e87-bd02-ad62ad39f8d8?resizing_type=fill&width=1920&height=335)

此页面无法以你选择的语言显示。将默认显示为**English**。如果你想以不同的语言查看，可以尝试选择另一种语言。

![Graph Panel](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39ae3438-0598-475e-8591-c013f977365a/k2_graphview.png)

The **EventGraph** of a Blueprint contains a node graph that uses events and function calls to perform actions in response to gameplay events associated with the Blueprint. This is used to add functionality that is common to all instances of a Blueprint. This is where interactivity and dynamic responses are setup. For example, a light Blueprint could respond to a damage event by turning off its `LightComponent` and changing the material used by its mesh. This would automatically provide this behavior to all instances of the light Blueprint.

The **EventGraph** of a Level Blueprint contains a node graph that uses events and function calls to perform actions in response to gameplay events. This is used to handle events for the level as a whole and to add functionality for specific instances of Actors and Blueprints within the world.

In either case, an **EventGraph** is used by adding one or more events to act as entry points and then connecting Function Calls, Flow Control nodes, and Variables to perform the desired actions.

## Working with Graphs

The **Graph** tab displays the visual representation of a particular graph of nodes as it shows all of the nodes contained in the graph as well as the connections between them. It provides editing capabilities for adding and removing nodes, arranging nodes, and creating links between nodes. Breakpoints can also be set in the **Graph** tab to aid in debugging Blueprints.

See the [Blueprint Editor Graph Editor](/documentation/en-us/unreal-engine/graph-editor-for-the-blueprints-visual-scripting-editor-in-unreal-engine) for a detailed guide to working with the **EventGraph** and other **Graphs** with Blueprints.

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [blueprint](https://dev.epicgames.com/community/search?query=blueprint)
-   [graphs](https://dev.epicgames.com/community/search?query=graphs)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Working with Graphs](/documentation/zh-cn/unreal-engine/event-graph-in-unreal-engine#workingwithgraphs)