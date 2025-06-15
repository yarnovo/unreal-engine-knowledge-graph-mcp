# Create an Action Utility for Transferring Skin Weights in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:10:26.487Z

---

目录

![Create an Action Utility for Transferring Skin Weights](https://dev.epicgames.com/community/api/documentation/image/2a286972-ce2d-4a09-92a1-486c865774fc?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

For character garments, you typically model the clothing in an external DCC (digital content creation) application and import it as a static mesh. You then transfer the skin weights from the skeletal mesh to the static mesh instead of manually painting weights. This functionality is available in-engine through the [Panel Cloth Editor](/documentation/zh-cn/unreal-engine/panel-cloth-editor-overview). However, you can create custom workflows using Blueprints.

This guide shows how to create an action utility to transfer skin weights (bone weights) to a static mesh in Unreal Engine. The action utility takes a given skeletal mesh asset (source) and a static mesh asset (target) to create a new skeletal mesh asset. The new asset contains the geometry of the static mesh and skin weights from the source. The action utility consists of Geometry Scripting functions to convert the geometry.

### Prerequisites

The action utility in this guide builds on the utility created in the [Convert Mesh Actor to Skeletal Mesh Asset](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine) tutorial. Use that tutorial to create and understand the concepts of the base script. You can also download the zip file below to continue.

To follow this guide, make sure to:

-   Have the **Geometry Script** plugin enabled. To learn more, see [Working with Plugins](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine).
    
-   Unzip the [Example Content](https://d1iv7db44yhgxn.cloudfront.net/documentation/attachments/6de98edf-9d4e-4fcd-a17e-669bcfb53218/examplecontent.zip) file and place the **ActorActions** folder inside the **Content** folder of your project. To learn more, see [Importing Assets Directly](/documentation/zh-cn/unreal-engine/importing-assets-directly-into-unreal-engine).
    

## Blueprint and Function Setup

Because the goal is to create a new skeletal mesh asset from a given static and skeletal mesh through a right-click menu, you can use the same Blueprint utility from the **Binding Assets to a Skeletal Mesh** tutorial. You then create a function that appears in the context menu.

To create the new actor action function, follow these steps:

1.  From the **Content Drawer**, double-click **BP\_StaticMeshtoSkeletalMesh\_ActorAction** to open it.
    
2.  In the **My Blueprint** panel, create a function by clicking the plus icon next to **Functions**.
    
3.  Name the function **TransferSkinWeights**. The name appears in the context menu.
    
    ![UE Transfer Skin Weights Function](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d476020e-243c-43ff-af75-e6902dcd0153/ue-transfer-skin-weights-function.png)
4.  Copy the script from the **StaticMeshtoSkeletal Mesh** function into the **TransferSkinWeights** function.
    
5.  Delete the nodes for copying the bone index and weights:
    
    1.  The Bone Name variable's **Set** node.
        
    2.  **Copy Bones from Mesh**
        
    3.  **Mesh Create Bone Weights**
        
    4.  **Get Bone Index**
        
    5.  **Make Bone Weights**
        
    6.  **Make Array**
        
    7.  **Set All Vertex Bone Weights**
        
6.  Connect the **TransferSkinWeights** function node to the respective variable sets.
    
    1.  Connect the **Skeleton Reference** output pin to its **Set** node.
        
    2.  From the **TransferSkinWeights** node, connect the execution pin to the Skeleton Reference variable's **Set** node.
        
    3.  Connect the Skeleton Reference variable's **Set** node execution pin to the Asset Path and Name variable's **Set** node.
        
    4.  Connect the **Asset Path and Name** output pin to its **Set** node.
        

The base of the script does the following:

-   Gets the selection of a skeletal and static mesh and converts them to dynamic meshes.
    
-   Captures the relative transformation of the target and source mesh.
    
-   Converts the target dynamic mesh to a new skeletal mesh asset.
    

![UE Base Script Convert to Dynamic Mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/11f9430d-6920-4131-86b9-d8fc5d2a7f17/ue-base-script-convert-to-dynamic-mesh.png)

## Material Map

To apply the materials from the static mesh to the target mesh, you must create a material map. The material map saves to the new skeletal mesh asset, retaining any material information from the static mesh. To capture the material information, set up a material variable.

To create a material variable, follow these steps:

1.  In **My Blueprint > Local Variable**, click the plus icon to create a material variable.
    
2.  Name the variable "Materials" and set the pin type to **Name**.
    
3.  In **Details > Variable Type**, set the container for the type to **Map**, then set the value type to **Material Interface**.
    

![UE Material Map](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/98e47be6-a55a-4883-a96b-91f2681762bb/ue-material-map.png)

To pull the material information from the static mesh and apply it to the target mesh, follow these steps:

1.  From the **Static Mesh Component** node, drag off the output pin, then search for and select **Get Material Slot Name**.
    
2.  Drag off the **Return Value** pin, then search for and select **For Each Loop**.
    
3.  Connect the **Exec** input to the **Success** pin of **Copy Mesh From Static Mesh with Section Materials**.
    
4.  Drag off the **Loop Body** output, then search for and select **Add** (from the Map category).
    
5.  Connect the **Array Element** to the key input (third pin) of the **Add** node.
    

![UE Material Slot Names](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b7ecaad2-6727-4dba-ae44-eef315c376d4/ue-get-material-slot-names.png)

1.  Drag in the **Materials** variable and click **Get Materials**.
    
2.  Connect the **Materials** output to the target map (second input pin) of the **Add** node.
    
3.  From the **Static Mesh Component** node, drag off the output pin, then search for and select **Get Material by Name**.
    
4.  Connect the **Material Slot Name** input pin to the **Array Element** output pin.
    
5.  Connect the **Return Value** output to the value input (third input pin) of the **Add** node.
    
6.  From the **For Each Loop** node, connect the **Completed** output to the execution pin of the **Transform Mesh** node.
    

![UE Material ID](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/36c37bb4-5ec8-4e54-a2cb-253f2b5c796a/ue-material-id-setup.png)

## Transfer Bone Weights

Like the **StaticMeshtoSkeletalMesh** function, a static mesh has no skeletal data or bone weights. Therefore, when you convert it to a dynamic mesh, it still lacks that data.

The difference is, instead of collecting a specific bone index to bind and add weights to, you use only the **Transfer Bone Weights From Mesh** node to copy the skeletal information. The node checks the vertices of the target mesh to the closest points on the source skeletal mesh to copy bone weights. You can use the options to control the behavior of the node.

To copy the bone weights, follow these steps:

1.  From the **Transform Mesh** node, drag off the execution pin, then search for and select **Transfer Bone Weights from Mesh**.
    
2.  Connect the **Target Mesh** input and output pins.
    
3.  From the **Copy Mesh from Skeletal Mesh** node, connect the **Dynamic Mesh** output to the **Source Mesh** input.
    
4.  Drag off the **Options** pin and select **Make Geometry Script Transfer Bone Weights Options**.
    
5.  Set **Transfer Method** to **Inpaint Weights**.
    
6.  **Compile** (Ctrl + Alt) and **save** (Ctrl + S).
    

![UE Transform Bone Weights from Mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06eea7e1-c051-4d5f-86fa-da7f63c8805a/ue-transform-bone-weights-from-mesh.png)

### Inpaint Weights Transfer Method

Inpaint Weights is much better at handling non-skin-tight clothing at the cost of slightly slower execution times. It works in two stages:

1.  Similar to the **Closest Point On Surface** option, for each vertex of the target mesh, it finds the closest point on the source skeletal mesh.
    
2.  Instead of copying the weights over, it validates if it's a good match by checking that the closest point is within a certain distance and that their normals do not deviate too much.
    

To learn more about these options, see the [Panel Cloth Transfer Skin Weights Node](https://dev.epicgames.com/community/learning/tutorials/Dl20/unreal-engine-panel-cloth-transfer-skin-weights-node) guide. The Chaos node is essentially the same as the node in Blueprints. It shares the same underlying code.

## Convert Dynamic Mesh to Skeletal Mesh Asset

As your dynamic mesh now contains the needed information from the source meshes, you can convert it to a new skeletal mesh asset along with the material information.

To convert to a new skeletal mesh asset and apply the material map, follow these steps:

1.  Connect the execution pins of the **Transfer Bone Weights from Mesh** and **Create New Skeletal Mesh Asset from Mesh** nodes together.
    
2.  From the **Create New Skeletal Mesh Asset from Mesh** node, drag off the **Options** pin and select **Make Geometry Script Create New Skeletal Mesh Asset Options**.
    
3.  Click the down arrow to expand the options list.
    
4.  Drag in the **Materials** variable and click **Get Materials**.
    
5.  Connect the variable to the **Materials** input option.
    

![UE Convert Dynamic Mesh to Skeletal Mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f958296a-8102-4a46-bcc9-638d9655d023/ue-convert-dynamic-mesh-to-skeletal-mesh.png)

## Run the Action Utility

Your utility is complete and ready for use. Below is the snippet of the utility function.

![image alt text](image_8.png)

To run the action utility, follow these steps:

1.  Place the source skeletal mesh in the viewport and align one of the shirt assets to the skeletal mesh body.
    
2.  Click the skeletal mesh first, and then **Shift + click** the static mesh, to select both.
    
3.  Right-click the actors and choose **Scripted Actor Actions > Transfer Skin Weights** (your name for the function).
    
4.  Fill out the prompt.
    

![UE Actor Action](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7460e84b-ec8d-4b26-af98-a27ec07ca233/geometry-script-transfer-skin-weights.png)

The utility converts a static mesh to a skeletal mesh asset with skeletal data from the source. The asset should appear in the folder you have chosen.

![UE New Skeletal Mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/944315d0-b7bd-47ef-9c99-e621f471ca9c/geometry-script-actor-action-new-asset.png)

You can test the bone weight transfer in the Skeleton Editor.

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [modeling](https://dev.epicgames.com/community/search?query=modeling)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [bone weights](https://dev.epicgames.com/community/search?query=bone%20weights)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Prerequisites](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine#prerequisites)
-   [Blueprint and Function Setup](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine#blueprintandfunctionsetup)
-   [Material Map](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine#materialmap)
-   [Transfer Bone Weights](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine#transferboneweights)
-   [Inpaint Weights Transfer Method](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine#inpaintweightstransfermethod)
-   [Convert Dynamic Mesh to Skeletal Mesh Asset](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine#convertdynamicmeshtoskeletalmeshasset)
-   [Run the Action Utility](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine#runtheactionutility)

相关文档

[

几何体脚本用户指南

![几何体脚本用户指南](https://dev.epicgames.com/community/api/documentation/image/129bec37-bbf7-40e1-89da-701842549d8d?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine)