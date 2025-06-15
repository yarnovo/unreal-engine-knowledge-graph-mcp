# Color Grading Panel in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:22:03.360Z

---

目录

![Color Grading Panel](https://dev.epicgames.com/community/api/documentation/image/98b8d8e7-53bc-445f-b77f-31b50122c0ff?resizing_type=fill&width=1920&height=335)

The **Color Grading** panel is a dedicated interface for manipulating colors in your scenes. It uses actors that can perform [color grading operations](/documentation/zh-cn/unreal-engine/color-grading-and-the-filmic-tonemapper-in-unreal-engine), such as Post Process Volumes and Color Correction Regions.

You can use this pane to configure color grading properties and settings directly, instead of through any individual actor’s Details panel. This should make the configuration more straightforward for artists.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b84a801-1956-479e-a139-d08a97d645be/cg-scene.png)

## Color Grading Panel Interface

You can open the **Color Grading** panel from the main menu of the editor by selecting **Window > Color Grading**. This panel opens at the bottom of the level viewport.

The Color Grading panel interface includes the following:

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7831fe7-e824-4d8b-bc07-903eebfaeef4/cg-panelinterface.png)

1.  Toolbar
2.  Object Mixer Panel
3.  Color Grading Properties

### Toolbar

You can use the **Toolbar** to configure various different elements for your scene.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/69cb6142-ac6f-433e-af6a-a3adb5cfabbc/cg-toolbar.png)

From the toolbar, you can perform the following actions:

-   Add color grading-capable actors to the scene.
-   Filter and search for color grading-capable actors by name.
-   Toggle sync selection between the Outliner and Object Mixer panel for actors.
-   Add folders to organize actors in the Object Mixer.
-   Add and Manage Collections for color grading-capable actors.

### Object Mixer Panel

The **Object Mixer** lists all types of actors within the scene and levels that have color grading controls. Actors within this list can be parented and grouped within folders.The folders mirror how the actors are displayed in the Outliner list.

The following types of actors are supported in the Object Mixer list:

-   [Post Process Volume](/documentation/zh-cn/unreal-engine/post-process-effects-in-unreal-engine)
-   [Cine Camera Actor](/documentation/zh-cn/unreal-engine/cinematic-cameras-in-unreal-engine)
-   [Camera Actor](/documentation/zh-cn/unreal-engine/camera-actors-in-unreal-engine)
-   [nDisplay Root Actor](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine)
-   [Color Correction Region](/documentation/zh-cn/unreal-engine/color-correct-regions-in-unreal-engine)
-   [Color Correction Window](/documentation/zh-cn/unreal-engine/color-correct-regions-in-unreal-engine)

Some actor types only become available when their plugin is enabled for the project. For example, the **nDisplay** plugin must be enabled for the nDisplay Root Actor type to show up in the list. You can enable plugins from the editor’s main menu by selecting **Edit > Plugins**.

From this panel, you can view information and perform the following actions:

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b98ebabb-5bf7-43f9-9c09-a27bee1a9b8f/cg-objectmixer.png)

-   The sorting columns can be arranged in ascending or descending order.
-   Toggle actions for pinning, actor visibility, and isolating actors.
-   Identify objects that have changes that are yet to be saved.
-   Use the settings menu to show / hide list items.

### Color Grading Properties

The primary portion of the Color Grading panel displays the tonal color grading properties and their color wheels with channel values. These settings are often found in the Details panel of any actor that you can perform color grading on. The color grading properties are shown when you select a supported color grading actor type in the Object Mixer panel or the Outliner.

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f98d677-ce8d-4c72-a925-acbccfafc981/cg-colorwheelandproperties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f98d677-ce8d-4c72-a925-acbccfafc981/cg-colorwheelandproperties.png)

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/387f40ad-2c4b-4bbd-940f-0d20b27ffcae/cg-detailsproperties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/387f40ad-2c4b-4bbd-940f-0d20b27ffcae/cg-detailsproperties.png)

Color Grading Panel and additional properties.

Color Grading properties of a Post Process Volume found in the Details panel.

Click images to view full size.

The interface can be broken into two parts:

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9142d29d-53d0-4b63-a79e-24e2db3436f8/cg-propertiesinterface.png)

1.  The Color Grading panel with tonal ranges, color wheels, and value sliders.
2.  Color grading property overrides.

The color grading panel has the following properties:

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/283bf3b5-0597-4e29-b42c-0ebed9c30d3c/cg-colorwheelpropertiesinterface.png)

1.  Name of the currently selected actor that can be color graded.
2.  A selection of Tonal Ranges with their own color grading properties for Saturation, Contrast, Gamma, Gain, and Offset.
3.  Color model selection to display color values in RGB (Red, Green, Blue) or HSV (Hue, Saturation, Value).
4.  Color wheels and their value sliders.

Each Tonal Range (2) for **Global**, **Shadows**, **Midtones**, and **Highlights** has their own Color Wheels (4) for **Saturation**, **Contrast**, **Gamma**, **Gain**, and **Offset**. Each of these color wheels has their own value sliders and is specific to their tonal range.

When you select a color model (3), the value sliders change to match the selection. You can see an example of this in the table below.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b095b64-96b7-4386-9a9a-324256221170/cg-rgbmodel.png)

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d00a5c97-f3d6-4e3f-9f35-9a58715d793a/cg-hsvmodel.png)

RGB Color Model

HSV Color Model.

To the right of the color wheel and sliders are the general property overrides panel that includes general color grading properties:

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/538655c9-48eb-4bfa-929b-2a3179c92e67/cg-overrideproperties.png)

For more information on these settings and using color grading in your project, see [Color Grading Settings](/documentation/zh-cn/unreal-engine/color-grading-and-the-filmic-tonemapper-in-unreal-engine).

## Managing Color Grading Actors

The Color Grading panel is where you can manage and edit all eligible actors in your scene.

### Filtering Color Grading Actors

Use the **Search Filter** at the top of the Object Mixer to filter actor types that support color grading.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c97d4f91-6593-4bc4-8a39-03def229fa14/cg-searchbar.png)

For large scenes with many color grading-capable actors, you might be able to speed up your workflow by filtering them with search

### Add Color Grading-Capable Actors

You can use the **Add (+)** button to add color grading-capable actors to the scene from this panel.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee4b3602-654c-4907-bf14-889460179f4a/cg-addactors.png)

### Sync Selection

The **Sync Selection** toggle synchronizes selected actors in the Object Mixer panel with the level [Outliner](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine).

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88a0b306-5d80-4a1b-b38c-e31dbc9378f7/cg-syncselection.png)

When **enabled**, the Color Grading panel and the Outliner act as one. This means that selected objects that have color grading properties are selected in both of these panels.

When **disabled**, each panel acts individually of the other by only selecting items within their own panel. Disabling sync selection is useful when you want to keep a color grading-capable actor selected in the Color Grading panel but also want to work within your scene to make other changes separately from color grading.

The Sync Selection toggle has accompanying functionality with the **Alt + Click** hotkey. When enabled, use this hotkey to only select items from the panel in which you are selecting an actor. When disabled, use this hotkey to sync selection in both panels.

### Organizing the Hierarchy

The Object Mixer’s list of actors can be organized with folders, actor parenting, or both.

The **Add Folder** icon in the toolbar creates a new folder for the selected actor in the Object Mixer. This icon will not add empty folders to the Object Mixer panel.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fd611b3d-6ce1-4c47-a856-a54728e477f5/cg-addfolder.png)

You can parent actors in the list by dragging and dropping them onto one another. The Outliner mirrors any parent-child organization.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aa6c0a11-06f9-4bc5-87a9-f0039240e2e7/cg-folders.gif)

When a folder is left empty by moving or reparenting an actor, the folder is removed from the Object Mixer panel but not from the Outliner.

### Actor Visibility

You can toggle the **Visibility** of any color grading-capable actors by clicking the **Eye** icon next to their listed name in the Object Mixer. This sets whether this actor is visible in the scene or is muted. An icon of an open eye indicates that the actor is visible, and an icon of a closed eye indicates that it is muted in the scene. You can use this workflow to inspect particular parts of your scene, without making actual changes to it.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d0d9698-a371-4548-a1b5-d3201b4fe02c/cg-visibility.png)

### Actor Isolation

You can toggle the **Solo** option for any color grading-capable actors by clicking the **Headphones** icon next to their listed name in the Object Mixer.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/305a02a0-7908-4be1-9c13-e4d196df44bb/cg-isolation.png)

Toggling the Solo icon disables visibility of all other color grading actors in the Object Mixer, while leaving only the selected color grading actors visible. You can use this workflow to inspect particular actors on their own in your scene.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9b65c63d-1f30-4a03-8176-79c3b1f6a31b/cg-isolationexample.gif)

### Settings Menu

The **Settings** menu contains configurable options for how actors are displayed in the Object Mixer panel. You can open this menu from the toolbar by clicking on the **Gear** icon.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2316af2a-79e6-4af0-9a00-cfeb6c6b6aef/cg-settingsmenu.png)

The primary features of this menu are:

-   Settings to expand and collapse the Object Mixer hierarchy.
-   Show / Hide options for actors in the Object Mixer panel.
-   Whether to show folders in the Object Mixer panel.
-   Selection options for different worlds (levels) to display only actors from those levels when using World Partition.

## Working with Color Grading Collections

[Collections](/documentation/zh-cn/unreal-engine/filters-and-collections-in-unreal-engine) serve as a way to organize your assets into groups of user-defined sets. In the Object Mixer panel, you can add similar or frequently edited actors to groups for quicker access to their properties. For editing purposes, you can group Actors in the Object Mixer into individual or multiple collections.

All color actors that are eligible for color-grading listed in the Object Mixer belong to a default collection called **All**. This collection category doesn’t appear until a custom one is created, and it cannot be edited or removed.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0f3117f8-698f-4faf-b252-95b5290e9989/cg-collectionsbar.png)

### Creating a Color Grading Collection

To create a collection:

1.  Select one or more actors listed in the Object Mixer panel.
2.  Right-click the actors you want to create a collection for, and hover the mouse over **Select or Add Collection** in the context menu.
3.  In the text field, enter a name for this collection.
4.  Press **Enter** to create the collection.

Newly created collections appear below the search filter in the toolbar and just above the Object Mixer sorting columns. There is no limit to the number of collections you can create.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/58e2ac25-a45e-4e24-8efd-a29738b24af0/cg-addcollection.gif)

### Viewing a Color Grading Collection

To view a collection, click on its name in the Collections area of the toolbar. When you select the collection, only the color grading-capable actors in the collection appear. The **All** collection restores all actors to the Object Mixer list.

### Adding and Removing Actors from a Color Grading Collection

You can add and remove eligible actors to a collection using the right-click Context Menu.

1.  Select one or more actors listed in the Object Mixer panel.
2.  Right-click the actors, and hover the mouse over **Select or Add Collection** in the context menu.
3.  In the list of collections, you can:
    
    ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/380ade5e-df07-4ef8-85d0-5146c8c86308/cg-addremovecollections.png)
    -   **Add** an actor to a collection by placing a checkmark in the box next to the named collection.
    -   **Remove** an actor from a collection by unchecking the box next to a named collection.

Actors are not exclusive to a single collection and can be added from any number of collections.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a9bf52c0-2099-4ab3-8854-1b1d42abd87b/cg-addremovecollections.gif)

### Deleting, Duplicating, and Renaming a Color Grading Collection

In the toolbar where all the Collections are listed, right-click on any collection to open its context menu. The options to **Delete**, **Duplicate**, or **Rename** the collection appear.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/54fee70c-d081-483a-bcba-74697fd8df8a/cg-collectionactions.png)

The **All** collection is the only one that cannot be deleted, duplicated, or renamed. Right-clicking it does not show any options.

### Reordering Color Grading Collections

You can reorder any listed collection by left-clicking on it and dragging it to a new position within the collection row. The **All** collection cannot be moved.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/985b3e58-012b-417e-9fa9-c2aec5b264b6/cg-collectionplacement.gif)

## nDisplay with Color Grading

There are additional color grading capabilities for [nDisplay](/documentation/zh-cn/unreal-engine/rendering-to-multiple-displays-with-ndisplay-in-unreal-engine) content when used with the Color Grading panel.

These options only become available when the **nDisplay** plugin is enabled for the project. You can enable it in the **Plugins** browser. Open it from the editor main menu under **Edit > Plugins**.

Alternatively, if you want to see a project already set up using nDisplay and ICVFX with the Color Grading panel, you can create an **InCameraVFX** template project from the project browser under the **Film / Video & Live Events** tab.

### Per-Viewport and Per-Node Color Grading

You can apply color grading separately to both the Outer Viewports and the In-Camera VFX (ICVFX) Camera. Color grading is additively layered with per-viewport and per-node groupings with nDisplay.

When you select content that supports nDisplay in the Object Mixer, the color grading panel includes additional options in the top-left above the color wheels.

#### Per-Viewport Grouping

When you select the **Display Cluster Root Actor** (DCRA) in the Object Mixer panel, an additional option becomes available at the top of the color grading panel with the **Entire Cluster** button, checkbox, and dropdown viewport selection.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a54cfee-c311-4704-9944-6b9f1d825cc9/cg-ndisplayclusters.png)

You can use the **Add (+)** icon to create a new per-viewport grouping. A Per-Viewport Settings category becomes available on the right side of the color grading panel.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b3d1d58b-9dee-4247-b7e3-528dbe3509d7/cg-viewportgrouping.png)

With the added per-viewport grouping, you can use the viewports dropdown to select from available viewports for this group to use. You can choose one or more viewports in the list by placing a check by their names.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/afc5fd7a-8991-4dba-b1c1-9c517730b24a/cg-viewportselectionforgroup.png)

The properties panel on the right-side of the color grading panel now includes a **Per-Viewport Settings** category. You can opt in or out of including **All Nodes** properties from the Outer Viewports, since the ICVFX Camera displays on top of them at all times.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2072c3c1-77b3-4267-8422-f4fe2d1f902d/cg-perviewportsettings.png)

#### Per-Node Grouping

When you select an **ICVFX Camera** component in the Object Mixer panel, an additional option becomes available at the top of the color grading panel with the **All Nodes Color Grading** button, checkbox, and dropdown node selection.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/635baf5c-08a5-4337-a6bc-39604ca22851/cg-icvfxnodes.png)

You can use the **Add (+)** icon to create a new per-node grouping and a Per-Node Settings category becomes available on the right side of the color grading panel.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/912e5206-597b-4ee0-8eed-2061d2e85c32/cg-nodessettings.png)

With the added per-node grouping, you can use the nodes dropdown to select from available nodes for this group to use. You can choose one or more nodes in the list by placing a check by their names.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eee7ac1f-c601-4641-9e3f-d8f2b12f418e/cg-nodeselectiongroups.png)

The properties panel on the right-side of the color grading panel now includes a **Per-Node Settings** category. You can opt in or out of including **All Nodes** properties.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f7379c54-7849-4e1f-8a2c-736c30aabd2c/cg-pernodesettings.png)

### In-Camera VFX Editor

Since color grading is an integral part of the stage workflow for [In-Camera VFX](/documentation/zh-cn/unreal-engine/in-camera-vfx-in-unreal-engine) (ICVFX) virtual production, the color grading panel is present in the ICVFX Editor as a drawer that can be summoned and dismissed using the hotkey **CTRL + Spacebar** or by clicking the **Color Grading** tab at the bottom of the editor.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6de605e9-f5a7-4857-a294-b5bd9af3f045/cg-embeddedpanel.gif)

The color grading panel is a dockable panel in the ICVFX editor. You can click **Dock in Layout** in the top-right of the panel to have it automatically dock below the viewport.

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b8a4adda-5d05-4350-9104-3c0a280762fd/cg-dockinlayoutbutton.png) ![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ddb7b668-7d65-471a-8055-02cd8177ac37/cg-dockinviewportaction.gif) 

-   [rendering](https://dev.epicgames.com/community/search?query=rendering)
-   [lighting](https://dev.epicgames.com/community/search?query=lighting)
-   [post process](https://dev.epicgames.com/community/search?query=post%20process)
-   [color grading](https://dev.epicgames.com/community/search?query=color%20grading)
-   [tonemapping](https://dev.epicgames.com/community/search?query=tonemapping)
-   [panels](https://dev.epicgames.com/community/search?query=panels)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Color Grading Panel Interface](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#colorgradingpanelinterface)
-   [Toolbar](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#toolbar)
-   [Object Mixer Panel](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#objectmixerpanel)
-   [Color Grading Properties](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#colorgradingproperties)
-   [Managing Color Grading Actors](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#managingcolorgradingactors)
-   [Filtering Color Grading Actors](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#filteringcolorgradingactors)
-   [Add Color Grading-Capable Actors](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#addcolorgrading-capableactors)
-   [Sync Selection](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#syncselection)
-   [Organizing the Hierarchy](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#organizingthehierarchy)
-   [Actor Visibility](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#actorvisibility)
-   [Actor Isolation](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#actorisolation)
-   [Settings Menu](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#settingsmenu)
-   [Working with Color Grading Collections](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#workingwithcolorgradingcollections)
-   [Creating a Color Grading Collection](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#creatingacolorgradingcollection)
-   [Viewing a Color Grading Collection](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#viewingacolorgradingcollection)
-   [Adding and Removing Actors from a Color Grading Collection](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#addingandremovingactorsfromacolorgradingcollection)
-   [Deleting, Duplicating, and Renaming a Color Grading Collection](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#deleting,duplicating,andrenamingacolorgradingcollection)
-   [Reordering Color Grading Collections](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#reorderingcolorgradingcollections)
-   [nDisplay with Color Grading](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#ndisplaywithcolorgrading)
-   [Per-Viewport and Per-Node Color Grading](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#per-viewportandper-nodecolorgrading)
-   [Per-Viewport Grouping](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#per-viewportgrouping)
-   [Per-Node Grouping](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#per-nodegrouping)
-   [In-Camera VFX Editor](/documentation/zh-cn/unreal-engine/color-grading-panel-in-unreal-engine#in-cameravfxeditor)