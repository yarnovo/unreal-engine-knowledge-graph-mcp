# Chaos Flesh Quickstart | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart
> 
> 生成时间: 2025-06-14T19:48:52.189Z

---

目录

![Chaos Flesh Quickstart](https://dev.epicgames.com/community/api/documentation/image/4b551aba-a99d-4035-95ce-4e771347c38a?resizing_type=fill&width=1920&height=335)

In this guide, you'll learn how to set up a a Chaos Flesh simulation using a provided starfish asset.

![A picture of the starfish asset.](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fe99eef1-1cf4-4164-ab08-ab571b8b6397/starfish.png)

## File Setup

### Example File Reference

The following information details where to download the example files and where to place them in your project.

### Create Blank Project from Launcher

To use the supplied files, you need to create a blank UE project from the Launcher.

![The Unreal Engine launcher](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8b171836-416b-4221-99a8-4ca52a6eaf7a/launcher.png) ![The Unreal Engine project browser](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06e6879c-cc79-4f77-aecd-58b9c5f6bd6e/blank_project.png)

### Editor Version

Make sure you are using Version **5.5.0-37670630+++UE5+Release-5.5** or later.

![The About Unreal Editor window, which shows the version of Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74888838-2a3d-40c4-9e09-7df3ea6f000d/ue_releaseversion.png)

### Zip File Download

[Download `Fleshtutorials-ExampleContent.7z`](https://d1iv7db44yhgxn.cloudfront.net/post-static-files/Fleshtutorials-ExampleContent.7z).

The file also contains an `.fbx` folder used for the 'Rig Bound Raycasts' section at the end of this guide.

### 'Example Content' Folder

Extract the `Fleshtutorials-ExampleContent'` .zip\` file. Then, manually move the extracted **ExampleContent** folder into your **Content** directory.

If you already have an **ExampleContent** folder from possibly following some prior Cloth examples, just drag the **5\_5\_ChaosFlesh** folder from the `.zip` file into that **ExampleContent** folder.

![The ExampleContent folder](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/19c07711-f43f-4ee7-a900-f9ddfa2550f0/examplecontent_path.png)

## Load Plugins

You will need first activate the **Chaos Flesh** plugin.

![The Chaos Flesh plugin in Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bdb5e3b9-3a62-43ec-ac81-366fcd7392bd/plugin_highlight.png)

Then, load the **ML Deformer Framework** and **ML Deformer Neural Morph Model** plugins.

![The ML plugins in Unreal Engine](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/022c9fed-fb70-4a6c-bcc2-15cc8be6a461/ml_plugins_crop_highlight.png)

## Starfish Start

### Quick Setup

The Flesh system implements a volumetric elastic simulation using a tetrahedral support structure. The tetrahedra are evaluated by the solver and provide supporting forces which try to preserve the volume and prevent the character's surface from collapsing under its own weight. This example describes how to create tetrahedral geometry from a closed static mesh (a simple cube) and then simulate the asset within the Unreal Engine.

### Import Starfish

The Flesh simulation requires tetrahedral meshes created from surface geometries. This example describes how to import geometries from FBX files and create a tetrahedral mesh of the starfish using dataflow nodes.

## Constraints

### Import Flesh Asset and Simple Kinematics

Kinematic constraints allow the artists to control vertices through animation. The kinematics are defined on the vertices of the tetrahedron. When a vertex is defined as kinematic, the mass properties for that vertex will be set to infinite mass, and it will not be simulated. Kinematic vertices can be used as boundary conditions for the dynamics, where free vertices that are connected to them will be driven by the motion of the kinematics. This example describes how to paint and kinematically constrain particles so that they stay fixed in space, relative to the components position.

### Vertex Attribute Transfer

The tetrahedral mesh is susceptible to changes, and painting progress on the tetrahedral mesh becomes invalid after any topology change. This example shows how to paint on the skeletal mesh and transfer vertex attributes (painted attribute and color) onto the tetrahedral mesh.

### Kinematic Skeleton Constraint

Skeleton transforms can also be used to define kinematics. A typical use case involves attaching a Flesh Component to a skeleton. When the Flesh component is co-located within the skeleton's local space, vertices in the tetrahedra that intersect with the skeleton (parent-child line segments) will be kinematically constrained. This example shows how to automatically define kinematic vertices on the starfish asset based on its co-located skeleton.

### Animated Kinematic Constraint

When the kinematic vertices are constrained to an animated skeleton the tetrahedral geometry will be enslaved to the motion of the skeleton. This example shows the setup involved with driving a flesh mesh from an animated transform hierarchy.

### Weak Constraints

Position targets, or weak constraints, are another way we can constrain geometry to a target position. The difference between weak constraints and kinematic constraints is that a weak constraint has a stiffness which allows for a slight slip from the actual target. By introducing weak constraints into an over constrained environment, the simulation can find a reasonable state that can remain smooth and visibly acceptable. This example shows how to bind the flesh asset to kinematic joint targets using weak constraints.

## Collisions

### World Collision

The tetrahedral solver is executed independently from the primary world solver. In a manner similar to the Chaos Cloth solver, any collisions against the tetrahedral geometry will need to be added during the simulation. This demo will illustrate how to add collision bodies at the start of the simulation using a collision manager that is attached to the Flesh solver.

### Streaming Collisions

Collisions against world geometry are currently implemented via a streaming system. The tetrahedral solver can respond to a limited set of collision types which should be loaded and released based on the proximity to the tetrahedral simulation. Collisions against the tetrahedral solver are implemented as vertex-based collisions against the rigid body volume, so as the resolution of the tetrahedron increases so will the computational cost of the collision response.

Currently the solver supports convex and a few analytic types (sphere, cube, plane), and the collision is only one-way, from the rigid body to the tetrahedron. This means that the tetrahedron will not affect the state of the rigid body, and the rigid body is effectively a kinematic, infinite mass, interaction. Typically, the position and velocity of the rigid body will be calculated on the primary rigid body solver, and the flesh will only react to the motion of the rigid bodies.

## Blueprint Asset and Mesh Deformer

Flesh assets can deform embedded skeletal meshes. Use the "GenerateSurfaceBindings" node in the flesh asset dataflow graph to build correspondence data between a skeletal mesh's render surfaces and a tetrahedral mesh. Then use the "DG\_FleshDeformer" on the skeletal mesh to apply the deformation of the tetrahedral mesh to the skeletal mesh.

If the deformer doesn't seem to be working, check the log for more information. One potential issue emerges if the actor has multiple flesh components, and the deformer needs to be told which skeletal mesh is to be deformed by which flesh asset. Disambiguation is accomplished by setting the optional **TransformSelection** or **GeometryGroupGuids** in the **GenerateSurfaceBindings** node. The other thing to check is the flesh asset (rest collection) has bindings to the right skeletal mesh using **GenerateSurfaceBindings**. Of course, if the topology of the render surface or the tetrahedron mesh changes, the bindings need to be regenerated. Render points that have no bindings will be skinned. If the deformer leaves points behind, either they have no binding, or they've been masked out (which currently is only done if there is no binding, but there will be dataflow nodes for masking in the future).

## Per Particle Attribute

Many of the simulation properties used by the tetrahedral solver are per-particle based. For example, the mass can be varied across the mesh, and will be saved on the vertex of the simulated tetrahedron. This can allow tetrahedral meshes with varying uniformity to have a uniform distribution of mass across the volume of the mesh. Mass is just one example of a per-particle property, and it illustrates how every property that is stored on the particle can be configured within the asset's setup. This demo will illustrate the use of fields to set per particle properties on the tetrahedron.

## Spawn and Destroy in Blueprint

Flesh assets can be spawned during blueprint operations as well. The Blueprint Actor will work in a manner like the Skeletal Mesh Actor, where you create a Flesh component and associate it with a Flesh Asset. The Spawn and Destroy Actor blueprint nodes can then be used to dynamically add and remove blueprint actors to the simulation.

## Sampling Simulation Results

While the render display for the Flesh Component shows the result of the entire tetrahedral simulation, sometimes it might be useful to just sample a subset of the deformations from the simulation. For example, the world position offset (WPO) rendering of the Nanite mesh in the Electric Dreams Demo was implemented by sampling positions near the surface of the tire, and mapping that into a texture which displaced the tire geometry on the GPU. This demo will illustrate how to interpolate a sample set from the deformation results that can be accessed during gameplay.

## Caching

### Dataflow Caching and ML Deformer

Flesh simulations can be expensive. While a low resolution asset can be made to perform within a game, in order to achieve results on high resolution geometry, the tetrahedral simulation will not be able to run in real time. The caching system will allow artist to record the results of a simulation and play them back in the dataflow graph. From the cache, we can also generate Geometry Cache as training data in ML Deformer. This example illustrates how to cache the results of the simulation, generate Geometry Cache and train an ML Deformer.

## Caching in the Editor

We can also cache in the editor and view playbacks in a level sequence. This example describes how to cache a simulated flesh asset (or a blueprint) and inspect simulation results in detail.

## Simulation Properties

Simulation properties are set in several places throughout the Chaos Flesh system. The Tetrahedral Solver will have properties that affect the entire simulation system, for example, allowing users to configure time stepping and threading properties, as well as collision controls. While the properties on the Flesh Actor allow for specific configurations of an individual instance of an asset, the Dataflow-based properties configure the asset itself. This demo goes through a few of the more important properties of the simulation and will give you an overview of where you might expect to find specific types of controls.

## Rig Bound Raycasts

See the provided `.fbx` file in the [Zip File Download](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#zipfiledownload) to follow this section of the guide.

Rig bound raycasts allow certain types of objects to interact with static geometry in the environment. The raycast approach is not a general environmental collision setup, but under specific setups will allow a deformable body to respond to scene geometry. For example, this setup was used in the [Electric Dreams Demo](https://www.youtube.com/watch?v=teTroOAGZjM&t=8752s) to allow the tires to react to scene geometry.

There are a few requirements that need to be met for this approach to be useable. The raycast vertices will need to be convex about a transform location in the model, the tetrahedral component will need to be contained in a skeletal mesh blueprint, and the asset needs to be kinematically constrained to a skeleton. Due to the way the collision response is implemented, the raycast origin must originate from an interior point of the model, and the collision response will translate the vertex towards the interior origin, against the direction of the raycast.

## Advanced workflow

See [Chaos Flesh for Muscle Simulation](https://dev.epicgames.com/community/learning/tutorials/W4mV/unreal-engine-chaos-flesh-emil-muscle-tutorial-5-5) to learn how to set up a muscle and fat simulation with Chaos Flesh.

-   [physics](https://dev.epicgames.com/community/search?query=physics)
-   [flesh](https://dev.epicgames.com/community/search?query=flesh)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [File Setup](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#filesetup)
-   [Example File Reference](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#examplefilereference)
-   [Create Blank Project from Launcher](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#createblankprojectfromlauncher)
-   [Editor Version](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#editorversion)
-   [Zip File Download](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#zipfiledownload)
-   ['Example Content' Folder](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#'examplecontent'folder)
-   [Load Plugins](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#loadplugins)
-   [Starfish Start](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#starfishstart)
-   [Quick Setup](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#quicksetup)
-   [Import Starfish](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#importstarfish)
-   [Constraints](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#constraints)
-   [Import Flesh Asset and Simple Kinematics](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#importfleshassetandsimplekinematics)
-   [Vertex Attribute Transfer](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#vertexattributetransfer)
-   [Kinematic Skeleton Constraint](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#kinematicskeletonconstraint)
-   [Animated Kinematic Constraint](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#animatedkinematicconstraint)
-   [Weak Constraints](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#weakconstraints)
-   [Collisions](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#collisions)
-   [World Collision](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#worldcollision)
-   [Streaming Collisions](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#streamingcollisions)
-   [Blueprint Asset and Mesh Deformer](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#blueprintassetandmeshdeformer)
-   [Per Particle Attribute](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#perparticleattribute)
-   [Spawn and Destroy in Blueprint](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#spawnanddestroyinblueprint)
-   [Sampling Simulation Results](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#samplingsimulationresults)
-   [Caching](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#caching)
-   [Dataflow Caching and ML Deformer](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#dataflowcachingandmldeformer)
-   [Caching in the Editor](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#cachingintheeditor)
-   [Simulation Properties](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#simulationproperties)
-   [Rig Bound Raycasts](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#rigboundraycasts)
-   [Advanced workflow](/documentation/zh-cn/unreal-engine/chaos-flesh-quickstart#advancedworkflow)