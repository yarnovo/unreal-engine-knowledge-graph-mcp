# Convert Mesh Actor to Skeletal Mesh Asset in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:10:31.193Z

---

目录

![Convert Mesh Actor to Skeletal Mesh Asset](https://dev.epicgames.com/community/api/documentation/image/5ffa73a4-4840-4fa7-a5bc-e2f58575fecb?resizing_type=fill&width=1920&height=335)

学习使用此**Beta**功能，但在发布产品中需要谨慎使用。

A common animation workflow is to bind rigid geometry to a skeletal character or prop. Using geometry scripting and action utilities in Unreal Engine, you can create a workflow to optimize this process for artists.

For this workflow, you will run a tool from the right-click context menu to create a new skeletal mesh asset from a given static and skeletal mesh actor. Your new asset contains the geometry from the selected static mesh and skeletal data from the chosen skeletal mesh for binding.

This guide shows you how to:

-   Use Geometry Scripting to copy over mesh data and create a new asset.
    
-   Convert a static and skeletal mesh to a dynamic mesh.
    
-   Copy the bones of a mesh to another mesh.
    
-   Bind a static mesh to a skeletal mesh.
    

### Prerequisites

To understand and use the content on this page, you must:

-   Enable the **Geometry Script** plugin. To learn more, see [Working with Plugins](/documentation/zh-cn/unreal-engine/working-with-plugins-in-unreal-engine).
    
-   Have a skeletal mesh in your project, or download the [Tutorial Assets](/documentation/404) file to follow along.
    
-   Have a fundamental understanding of [Blueprints](/documentation/zh-cn/unreal-engine/introduction-to-blueprints-visual-scripting-in-unreal-engine), [action utilities](/documentation/zh-cn/unreal-engine/scripted-actions-in-unreal-engine), and [Geometry Scripting](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine).
    
-   Understand the use of a [skeletal mesh](/documentation/zh-cn/unreal-engine/skeletal-mesh-assets-in-unreal-engine) and the [animation editors](/documentation/zh-cn/unreal-engine/animation-editors-in-unreal-engine).
    

For a base guide on using Geometry Scripting with actor actions, see [Create Action Utilities With Geometry Scripting](/documentation/zh-cn/unreal-engine/create-action-utilities-with-geometry-scripting--in-unreal-engine).

## Blueprint and Function Setup

To start, you must have the correct Blueprint class. Since the goal is a workflow to create a new skeletal mesh asset from a given static and skeletal mesh through a right-click menu option, use the **ActorActionEditorUtility** class. You will use this to create a function that appears in the context menu.

To create the utility class and function, follow these steps:

1.  Right-click inside the **Content Drawer** then select **Blueprint Class** from the context menu.
    
2.  Search for and select **ActorActionEditorUtility**.
    

![Actor Action Editor Utility](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f96fe9f-b44c-4539-914e-9cdb15920e3d/actor-action-editor-utility.png)

1.  Name the Blueprint `BP_StaticMeshtoSkeletalMesh_ActorAction`, then double-click the asset to open it.
    
2.  In the **My Blueprint** panel, create a function by clicking the plus icon next to **Functions**.
    
3.  Name the function **StaticMeshToSkeletalMesh**. This name is what will appear in the context menu.
    

![UE Static Mesh to Skeletal Mesh Function](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4389516a-2b79-4111-8743-bb196dbf11a6/ue-static-mesh-to-skeletal-mesh-function.png)

1.  To constrain the action to only show when a static or skeletal mesh actor is selected, click **Class Defaults**.
    
    1.  In the **Details** panel, click the plus icon under the **Assets** category, then search for and add the two actor types.
2.  **Compile** (Ctrl + Alt) and **save** (Ctrl + S).
    

## Dynamic Mesh Conversion

The purpose of the first part of the script is to get the selection of a skeletal and static mesh and convert them to dynamic meshes. The dynamic mesh acts as a temporary mesh you can perform your operations on before applying them to your static mesh.

This process consists of two similar node networks. You then apply the transforms of the actors to capture any transformations the user applies.

To view the available Geometry Scripting functions, see [Blueprint API Reference](/documentation/en-us/unreal-engine/BlueprintAPI/GeometryScript).

  

### Skeletal Mesh

To convert a skeletal mesh actor to a dynamic mesh, follow these steps:

1.  In the **StaticMeshToSkeletalMesh** function, drag off the execution pin, then search for and select **Sequence**. The Sequence node will step through the two conversion processes for a static and skeletal mesh.
    
2.  Drag off the Sequence node's **Then 0** execution pin, then search for and select **Get Selection Set**.
    
3.  Drag off the **Return Value** pin, then search for and select **Get (a copy)**. Select the first index to choose the first item in the selection set.
    
4.  Drag off the output pin, then search for and select **Cast to SkeletalMeshActor**. Connect the input execution pin to **Get Selection Set**.
    
    ![UE Get Skeletal Mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fb5c151d-065a-4c94-8dbc-6e5f851b4286/ue-get-skeletal-mesh.png)
5.  To create the dynamic mesh, you must access the actor's asset. Drag off the **As Skeletal Mesh Actor** pin, then search for and select **Get Skeletal Mesh Component**.
    
6.  Drag off the **Skeletal Mesh Component** pin, then search for and select **Get Skeletal Mesh Asset**.
    
7.  From the **Cast to SkeletalMeshActor**, drag off the execution pin, then search for and select **Construct Object from Class**.
    
    1.  From the **Class** dropdown, search for and select **Dynamic Mesh** (UDynamicMesh).
8.  Drag off the **Return Value** pin, then search for and select **Copy Mesh from Skeletal Mesh**. Connect the execution pins.
    
9.  Connect the **Skeletal Mesh Asset** output pin to the **From Skeletal Mesh Asset** input.
    

### Static Mesh

To convert the static mesh actor to a dynamic mesh, follow these steps:

1.  Repeat the skeleton mesh conversion steps described previously starting from the **Then 1** execution pin.
    
2.  Replace the following nodes and make sure you change the selection index to 1 to indicate you want the second element in the selection set.
    
    1.  **Cast to SkeletalMeshActor** with **Cast to StaticMeshActor**.
        
    2.  **Copy Mesh from Skeletal Mesh** with **Copy Mesh from Static Mesh with Section Materials**.
        
    3.  **Skeletal Mesh Component** with **Static Mesh Component** and **Get Skeletal Mesh Asset** with **Get Static Mesh**.
        

![UE Base Actor Action Function](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/cd402e40-0e7b-4102-9eaf-ae4379011813/ue-base-function.png)

### Apply Relative Transform Mesh

Next, apply the transform of the actors to the target mesh. The transformation of a skeletal mesh's bones is relative to the root of the skeleton. This relativity means the static mesh actor's transforms must align to the skeleton root. Since you won't know where users place their actors, or other transforms they may apply, you must capture the relative transform and apply it to the dynamic mesh.

As constructed, the **Then 0** sequence runs first, followed by the **Then 1** sequence. You are going to add the transform logic to the second branch since you have both the skeletal and static meshes at this point.

To apply the relative transform to the dynamic mesh, follow these steps:

1.  From the **Copy Mesh from Static Mesh with Section Materials** node, drag off the **Success** execution pin, then search for and select **Transform Mesh**. The Transform Mesh node applies the provided transform values to the vertices of the dynamic mesh.
    
2.  Connect the **Dynamic Mesh** output to the **Target Mesh** input.
    
3.  From the **Cast to SkeletalMeshActor** node, drag off the **As Skeletal Mesh Actor** pin, then search for and select **Get Actor Transform**.
    
4.  From the **Cast to StaticMeshActor** node, drag off the **As Static Mesh Actor** pin, then search for and select **Get Actor Transform**.
    
5.  Drag off the **Return Value** pin, then search for and select **Make Relative Transform**. This node outputs the relative transform value of the static mesh compared to the skeletal mesh.
    
6.  Connect the **Return Value** output of the skeletal mesh actor transform to the **Relative To** input.
    
7.  Connect the **Return Value** pin to the **Transform** input of the **Transform Mesh** node.
    
8.  **Compile** (Ctrl + Alt) and **save** (Ctrl + S).
    

![UE Relative Transform](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/31f3d1ef-8282-4052-8384-949e254ef9d0/ue-relative-transform.png)

## Copy Skeletal Data and Add Bone Weights

Static meshes have no skeletal data or bone weights (skin weights). This means the dynamic mesh you convert to won't have that data either.

To add the skeletal data, you first copy over the bone names and hierarchy information from the skeletal mesh. You can then create a bone weight attribute which you populate with the skinning data. With the bone data, you can convert the static mesh to a skeletal mesh asset, and then bind it to the source skeletal mesh.

The next process shows you how to bind the target skeletal mesh to a single bone, that is, to transfer skeletal information and populate the skinning data in such a way that all vertices are bound exclusively to the bone you select. You can modify this procedure to bind vertices to different combinations of bones, using the collection of bone weight geometry script nodes.

To copy the skeletal data and populate bone weights, follow these steps:

1.  From the **Transform Mesh** node, drag off the execution pin, then search for and select **Copy Bones from Mesh**. This node copies the skeletal data (bone names and hierarchy information) to the target dynamic mesh.
    
2.  Connect the **Target Mesh** output to the **Target Mesh** input.
    
3.  From the **Copy Mesh from Skeletal Mesh**, connect the **Dynamic Mesh** output to the **Source Mesh** input.
    
4.  From the **Copy Bones from Mesh** node, drag off the execution pin, then search for and select **Mesh Create Bone Weights**. This node creates a bone weight attribute to the target mesh.
    
5.  Get the index of the bone the target mesh binds to using its name. From the **Mesh Create Bone Weights** node, drag off the execution pin, then search for and select **Get Bone Index**.
    
6.  In the **Bone Name** field, type "head" to bind the hat to the head bone. You can look up the names of the bones using the [Skeletal Mesh Editor](/documentation/zh-cn/unreal-engine/skeleton-editor-in-unreal-engine).
    

![UE Copy Bone Data Nodes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e81656c-d75a-4b86-bccd-feccdfc87c16/ue-copy-bone-data-nodes.png)

1.  Drag off the **Bone Index** output pin, then search for and select the **Make Bone Weights** struct. Set the **Weight** field to 1.
    
2.  Drag off the output pin, then search for and select **Make Array**.
    
3.  Set all vertices of the target mesh to the corresponding bone weight value. From the **Array** pin, search for and select **Set All Vertex Bone Weights**. This node rigidly binds the mesh to the selected bone, in this case the head joint. The binding means that the new skeletal mesh only follows the transformation of the head joint.
    
4.  Between the **Bone Index** and **Set All Vertex Bone Weights** nodes, connect the execution and Target Mesh pins.
    

![UE Bone Weights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c8b48d2a-3887-4be5-81ca-a58ac63e7699/ue-bone-weights.png)

## Save the Dynamic Mesh as a New Skeletal Mesh Asset

Using the target mesh containing the geometry of the source static mesh and skeleton data from the source skeletal mesh, you can convert the dynamic mesh to a new skeletal mesh asset.

1.  From **Set All Vertex Bone Weights** node, drag off the execution pin, then search for and select **Create New Skeletal Mesh Asset from Mesh**. This node saves the dynamic mesh containing the skeletal data and bone weights as a new skeletal mesh asset.
    
2.  In the **In Skeleton** field, choose the skeleton from which you copied the bone data.
    
3.  Connect the **From Dynamic Mesh** input to the **Target Mesh** output.
    
4.  In the **Asset Path and Name** field, set the location to save the mesh and add the new name to the end. To copy a path, right-click the desired location and choose **Copy Path**.
    
5.  **Compile** (Ctrl + Alt) and **save** (Ctrl + S).
    

![UE Create New Skeletal Mesh Asset From Mesh](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4fa01bd2-9d4b-4927-bbed-8ac9e0e15e33/ue-create-new-skeletal-mesh-asset-from-mesh.png)

For a better user experience, convert the **Bone Name**, **In Skeleton**, and **Asset Path and Name** fields into public variables for artists to adjust. This feature prevents artists from needing to open the Blueprint to change the variables.

Set the default value of **Asset Path and Name** to `/Game/NewAsset` to ensure a folder is set and to help users understand the path syntax.

Your action utility is complete and ready to run. Below is the snippet of the utility function.

![image alt text](image_9.png)

## Run the Action Utility

To run the action utility, follow these steps:

1.  Place the skeletal mesh and the sample SM\_Hat mesh (or any other static mesh) in the viewport.
    
2.  Position the hat on the head of the skeletal mesh body.
    
    The sample hat mesh was created with in-engine modeling tools, to learn more see [Modeling Mode Overview](/documentation/zh-cn/unreal-engine/modeling-mode-in-unreal-engine).
    
3.  Click the skeletal mesh first, and then **Shift + click** the static mesh, to select both.
    
4.  Right-click the actors and choose **Scripted Actor Actions > StaticMeshToSkeletalMesh** (the name you use for the function).
    
5.  Fill out the prompt.
    

![UE Static Mesh to Skeletal Mesh Utility](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/29933f2c-de7a-4669-8b64-837c625feee5/ue-static-mesh-to-skeletal-mesh-utility.png)

The utility converts a static mesh to a skeletal mesh asset with bones related to the source skeletal mesh. The asset should appear in the folder you have chosen.

![UE New Skeletal Mesh Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b2786b95-e380-43cd-9759-4dc779186cad/ue-new-skeletal-mesh-asset.png)

After conversion, you can tweak the geometry and skeletal data of the new mesh using the [Editing Tools](/documentation/zh-cn/unreal-engine/skeleton-editing-in-unreal-engine) inside the **Skeletal Mesh Editor**. You can also test binding using the Skeleton Editor.

## Next Step

Expand the actor action utility with a function to transfer skin weights to dynamic assets like clothing. In addition, learn how to apply the materials from the static mesh to the target mesh.

[](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine)

[![Create an Action Utility for Transferring Skin Weights](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/103c0356-736f-4942-88e1-78e06e1d0ea7/topic-image.png)](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine)

[Create an Action Utility for Transferring Skin Weights](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine)

[Learn to use Geometry Scripting to create an action utility that converts a static mesh to skeletal mesh for mesh binding.](/documentation/zh-cn/unreal-engine/create-an-action-utility-for-transferring-skin-weights-in-unreal-engine)

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [modeling](https://dev.epicgames.com/community/search?query=modeling)
-   [beta](https://dev.epicgames.com/community/search?query=beta)
-   [skin weights](https://dev.epicgames.com/community/search?query=skin%20weights)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Prerequisites](/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine#prerequisites)
-   [Blueprint and Function Setup](/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine#blueprintandfunctionsetup)
-   [Dynamic Mesh Conversion](/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine#dynamicmeshconversion)
-   [Skeletal Mesh](/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine#skeletalmesh)
-   [Static Mesh](/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine#staticmesh)
-   [Apply Relative Transform Mesh](/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine#applyrelativetransformmesh)
-   [Copy Skeletal Data and Add Bone Weights](/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine#copyskeletaldataandaddboneweights)
-   [Save the Dynamic Mesh as a New Skeletal Mesh Asset](/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine#savethedynamicmeshasanewskeletalmeshasset)
-   [Run the Action Utility](/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine#runtheactionutility)
-   [Next Step](/documentation/zh-cn/unreal-engine/convert-mesh-actor-to-skeletal-mesh-asset-in-unreal-engine#nextstep)

相关文档

[

几何体脚本用户指南

![几何体脚本用户指南](https://dev.epicgames.com/community/api/documentation/image/129bec37-bbf7-40e1-89da-701842549d8d?resizing_type=fit&width=160&height=92)

](/documentation/zh-cn/unreal-engine/geometry-scripting-users-guide-in-unreal-engine)