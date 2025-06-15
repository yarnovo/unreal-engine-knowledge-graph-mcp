# Mirroring Animation in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:07:04.709Z

---

目录

![Mirroring Animation](https://dev.epicgames.com/community/api/documentation/image/5180da8d-7a20-43ae-846f-1c04b56e5d66?resizing_type=fill&width=1920&height=335)

Animation mirroring copies animation from one side of a character to another so you can reuse the same animation in different situations. Using the **Mirror Data Table**, and other mirroring workflows, you can mirror not only your Animation Sequences, but also curves, sync markers, and Notifies. Additionally, mirroring within Unreal Engine provides a way to create mirrored animations without needing to manage a second copy.

This document provides an overview of how to mirror animation using the Mirror Data Table and Animation Blueprints.

#### Prerequisites

-   Your project already contains a [Skeletal Mesh](/documentation/zh-cn/unreal-engine/skeletal-mesh-actors-in-unreal-engine) and [animations](/documentation/zh-cn/unreal-engine/animation-sequences-in-unreal-engine) to mirror.
-   You have an understanding of how to create and use [Animation Blueprints](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine).

## Mirror Data Table

To start mirroring animations, you must first create a **Mirror Data Table** Asset. Mirror Data Tables provide mirroring assignments and instructions for all the elements of a Skeleton you want to mirror.

To create it, click **Add (+)** in the Content Browser and select **Animation > Mirror Data Table**. A dialog window will appear where you must select the Skeleton you want to mirror. Select one and click **Accept**.

![create mirror data table](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4d9fb263-e4a4-472c-b68b-871d80f6ffc1/table1.png)

Open the Mirror Data Table to view the editor with the following primary areas:

![mirror data table editor](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/52693f09-60e7-4a36-8841-256227333b5a/table2.png)

1.  **Data Table**, which contains the list of elements to mirror. This list auto-populates depending on the bone, notify, and other element names, which you can configure in the [Data Table Details](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#datatabledetails).
2.  [**Data Table Details**](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#datatabledetails), which contains configuration settings for the mirroring behavior.
3.  **Row Editor**, which provides settings for the selected entry where you can edit the element name, the mirrored name, and the element type.

### Adding and Editing Entries

To add a new table entry, click the **Add (+)** toolbar button and fill the four properties in the **Row Editor** panel.

-   **Row Name**, which is the name of the entry.
-   **Name**, which is the name of the first bone to mirror.
-   **Mirrored Name**, which is the name of the second bone to mirror. Left or right bones can go in either of these properties, but these properties must contain the symmetrical bones.
-   **Mirror Entry Type**, which is the element type to mirror. You can select the following types:
    -   Bone
    -   [Animation Notify](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine)
    -   [Curve](/documentation/zh-cn/unreal-engine/animation-curves-in-unreal-engine)
    -   [Sync Marker](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine#addsyncmarker.)
    -   Custom, which provides a code foundation for extending the Mirror Data Table in C++ by adding additional types.

![add mirror entry](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d9d3b82-f531-459b-93c2-175a6f2a3066/table3.png)

In order to have a fully mirrored character, it is necessary that the table contains most skinned bones, including central bones like **pelvis**, **spine**, **neck**, and **head**. This is so that the mirroring operation can appropriately flip the rotations of those bones along the mirror axis. For these entries, both the **Name** and **Mirrored Name** should match.

![mirror central bones](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f35e648f-6447-41d2-a8bf-0fe5b34bf478/table4.png)

### Data Table Details

The Data Table Details panel contains configurations and other settings for the mirror behavior:

![data table details](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/23754f7a-0a43-4717-8e25-2f39d5ef1418/table5.png)

Name

Descriptions

**Mirror Find Replace Expressions**

An array of expressions that are used to automatically populate the table with common mirror entries. Refer to the [Find and Replace Expressions](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#findandreplaceexpressions) section for more information.

**Mirror Axis**

The axis of mirroring, which is across the front of the character. In most cases this should be **X**.

![mirror axis](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e8c7cc18-080f-45c1-bc0d-5950093141c5/axis.png)

**Skeleton**

The Skeleton Asset to use for the mirror operation.

**Row Struct**

The structure to use for each row of the table. You must inherit from `FTableRowBase` if you want to extend this.

**Strip from Client Builds**

Enabling this will not cook this Data Table into client builds. Useful if you are making confidential tables that only servers should know about.

### Find and Replace Expressions

**Find** and **Replace Expressions** are array entries you can add to the Data Table Details that automatically search and replace certain string text of elements in the skeleton. These expressions are then used to inform which elements are automatically populated when creating or reimporting the skeleton.

![find and replace expression properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/636766ac-00e5-4c40-bd4d-3157adb1757a/expression1.png)

Each array requires the following expressions:

Name

Description

**Find Expression**

The text to search for. In most cases this will likely be the symmetry modifiers for your element names, such as `_l`, `left_`, or `_left_`.

**Replace Expression**

The text to replace. In most cases this will likely be the symmetry modifiers for your element names, such as `_r`, `right_,` or `_right_`.

**Find Replace Method**

The search method to use when replacing text. You can select from the following options:

-   **Prefix**, which will search for text only at the beginning of the name.
-   **Suffix**, which will search for text only at the end of the name.
-   **Regular Expression**, where you can write a custom expression for finding and replacing names.

When using **Regular Expression** as your method, you can write custom [Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression) for **Find Expression** and **Replace Expression**.

For example, **Index 12** of the default array contains the following expression, searching for common central bone names and assigning to the **Name** and **Mirrored Name** properties:

-   Find Expression: `((?:^[sS]pine|^[rR]oot|^[pP]elvis|^[nN]eck|^[hH]ead|^ik_hand_gun).*)`
-   Replace Expression: `$1`

In cases where your symmetry text modifiers are in the middle of an element name, such as `finger_left_index1`, you can write the following expression to correctly search and replace:

-   Find Expression: `(\S*)_left_(\S*)`
-   Replace Expression: `$1_right_$2`

The array comes pre-populated with common expressions, such as searching and replacing several permutations of symmetry modifiers as pre or postfixes. You can change this default array from the [Project Settings](/documentation/zh-cn/unreal-engine/project-settings-in-unreal-engine). In the main Unreal Engine menu bar, select **Edit > Project Settings**, then navigate to the **Engine > Animation** section and locate the **Mirroring** property section.

![expression project settings](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c94f9731-a068-4f7d-b631-6fd9fb4ab596/projectsettings.png)

## Mirroring Animation

Once you have created and populated your Mirror Data Table, you can now mirror your animations in [Animation Blueprints](/documentation/zh-cn/unreal-engine/animation-blueprints-in-unreal-engine). This is done using the **Mirror** AnimGraph node.

To create it, right-click in the AnimGraph and select your table from the **Mirroring** category.

![mirror animation blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/55dca270-143d-4d42-81b7-271f2c205b2a/mirror1.png)

You can preview the mirroring effect by providing an input pose and bool variable, enabling or disabling the mirroring.

![enable or disable mirroring](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/959a3a20-f3be-4d06-a788-6050d0bda616/mirror2.gif)

The Mirror node contains the following properties:

![mirror properties](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cb466ba8-749c-417f-b990-777653e1c042/mirror3.png)

Name

Description

**Mirror**

Enables or disables the mirror effect. This is exposed as a pin by default.

**Mirror Data Table**

The [Mirror Data Table](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#mirrordatatable) to use for mirroring.

**Blend Time on Mirror State Change**

The length of time to blend between mirror states when **Mirror** is enabled or disabled. Using this also requires you to use an [Intertialization](/documentation/zh-cn/unreal-engine/animation-blueprint-blend-nodes-in-unreal-engine#intertialization) node after the Mirror node.

![blend time on mirror state change](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/10acde51-f667-4309-a019-dae2d14b6106/blendtime.gif)

**Reset Child on Mirror State Change**

Enabling this will reinitialize the source pose when the mirror state changes.

**Bone**

Whether or not to include bone data in the mirroring.

**Curve**

Whether or not to include curve data in the mirroring.

**Attributes**

Whether or not to include notify and sync marker data in the mirroring.

### Detecting Mirrored Animation in Blueprint Notifies

If you are using [Custom Notify States](/documentation/zh-cn/unreal-engine/animation-notifies-in-unreal-engine#customnotifystates), then you may want to change it to have a different behavior based on the mirrored state. You can differentiate between mirrored states in the Notify Blueprint using the **Is Triggered By Mirrored Animation** node.

In this example, it is being used in the **Received Notify Function** to branch the logic, checking if the notify was received from a mirrored animation or not.

![is triggered by mirrored animation](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4b5b2382-73b9-4f8b-b248-871cc1cb0b21/mirror4.png)

-   [](https://dev.epicgames.com/community/search)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Prerequisites](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#prerequisites)
-   [Mirror Data Table](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#mirrordatatable)
-   [Adding and Editing Entries](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#addingandeditingentries)
-   [Data Table Details](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#datatabledetails)
-   [Find and Replace Expressions](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#findandreplaceexpressions)
-   [Mirroring Animation](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#mirroringanimation)
-   [Detecting Mirrored Animation in Blueprint Notifies](/documentation/zh-cn/unreal-engine/mirroring-animation-in-unreal-engine#detectingmirroredanimationinblueprintnotifies)