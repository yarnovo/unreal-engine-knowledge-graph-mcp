# Game Objects in Unreal Engine | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/game-objects-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:51:18.838Z

---

目录

![Game Objects in Unreal Engine](https://dev.epicgames.com/community/api/documentation/image/1693ac39-a18a-4a44-a0ce-75ede2c4b273?resizing_type=fill&width=1920&height=335)

## Comparing GameObjects to UObjects and Actors

In Unity, **GameObjects** represent programmable in-game objects. A GameObject does not do much by itself; it acts as a container for **Components**, such as Light and Mesh, that provide specific functionalities. Every GameObject has a Transform component attached to represent position and orientation in the world.

In Unreal Engine (UE), **UObjects** represent programmable objects in your game's world. The UObject class functions as a shared base class for most classes in UE. This approach supports the [Unreal Engine Reflection System](/documentation/zh-cn/unreal-engine/reflection-system-in-unreal-engine), which provides automatic garbage collection and other benefits.

[**Actor**](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine), a subclass of UObject, is a close equivalent to Unity's GameObject. Actors support UE's [Component System](/documentation/zh-cn/unreal-engine/game-objects-in-unreal-engine#comparingcomponentsystems) and transforms (USceneComponent) so you can place them in the world. However, a key difference compared to Unity is you can extend an Actor's functionality directly rather than relying on Components exclusively.

If your object implementation doesn't require the additional functionality of one of UObject's subclasses, you can extend UObject directly for a lighter-weight implementation. See [Objects](/documentation/zh-cn/unreal-engine/objects-in-unreal-engine) for more detailed information on UObjects.

## Comparing Component Systems

Similar to Unity, UE has a Component system you can use to attach reusable functionality to your game objects. You can create your own Components from scratch or by extending one of the many provided with UE. Before you do, it is worth understanding the following core Component types:

-   **Actor Component** - The base Component type that attaches to an Actor. Actor Components do not have transforms, so they do not have a physical location in the world. They are useful for abstract behaviors, such as inventory or attribute management.
    
-   **Scene Component** - A type of Actor Component that adds a transform for world positioning. Scene Components do not have visual representations, so they are suitable for non-visual location-based behaviors, such as physical forces, cameras, or audio.
    
-   **Primitive Component** - A type of Scene Component that adds visual and physical representation. They are suitable for rendering visual elements and collision volumes.
    

In Unity, you can create complex GameObjects with a parent-child relationship. For example, a parent object can have multiple child objects with their own meshes, colliders, or behaviors.

In UE, you can build Actors with a similar hierarchy by using Components instead of child Actors to reduce performance and memory costs.

For more detailed information on UE's Component system, see [Components](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine#components).

## Comparing Update() and Tick()

In Unity, Component updates are primarily driven by `Update()` and `FixedUpdate()` in MonoBehaviour.

In UE, Actors use `Tick()` (enabled by default), and Components optionally use `TickComponent()` (disabled by default).

By default, ticking happens once per frame. You can specify another ticking interval by assigning a tick group, such as `TG_DuringPhysics`. You can also specify a tick dependency to prevent ticks until another specified tick function is completed.

For more detailed information, see the following resources:

-   [Actor Lifecycle](/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle)
-   [Actor Ticking](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine)
-   [Component Ticking](/documentation/zh-cn/unreal-engine/components-in-unreal-engine#updating)

## Gameplay Framework

**Unreal Engine's Gameplay Framework** is a collection of classes, including Actors and Components, that provide you with a modular foundation upon which to build your gameplay experiences.

If you compare implementing gameplay in Unity to using UE's Gameplay Framework, there are more differences than similarities. As such, we recommend you review the [Gameplay Framework section](/documentation/zh-cn/unreal-engine/gameplay-framework-in-unreal-engine) to learn more about how the concepts covered in this document fit into the framework. Additionally, the sections below cover some important framework classes at a high level.

### Important UObject Subclasses

-   [**Level**](/documentation/zh-cn/unreal-engine/levels-in-unreal-engine) - Contains a set of game objects that make up a level in your game. Levels are similar to Scenes in Unity.
-   [**Data Asset**](/documentation/zh-cn/unreal-engine/data-assets-in-unreal-engine) - Used to define assets that store data for your game. Data Assets are similar to ScriptableObjects in Unity.

### Important Actor Subclasses

-   [**Pawn**](/documentation/zh-cn/unreal-engine/pawn-in-unreal-engine) - Acts as an "agent" within the world. A Controller can possess a Pawn to take control of it.
    -   [**Character**](/documentation/zh-cn/unreal-engine/characters-in-unreal-engine) - A type of Pawn that represents a humanoid-style character and provides basic movement and collision functionality.
-   [**Controller**](/documentation/zh-cn/unreal-engine/controllers-in-unreal-engine) - Responsible for directing Pawns after possessing them.
    -   [**PlayerController**](/documentation/zh-cn/unreal-engine/player-controllers-in-unreal-engine) - Used to provide a local human player control of a Pawn.
    -   [**AIController**](/documentation/zh-cn/unreal-engine/ai-controllers-in-unreal-engine) - Used to control a Pawn with artificial intelligence.
-   [**Game Mode**](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine) - A manager Actor that defines and sets up your game.
-   [**Game State**](/documentation/zh-cn/unreal-engine/game-mode-and-game-state-in-unreal-engine) - Contains the game's state information.
    -   **Player State** - Contains a player's state information. The Game State tracks all Player States within an array.

-   [gameplay](https://dev.epicgames.com/community/search?query=gameplay)
-   [unity](https://dev.epicgames.com/community/search?query=unity)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Comparing GameObjects to UObjects and Actors](/documentation/zh-cn/unreal-engine/game-objects-in-unreal-engine#comparinggameobjectstouobjectsandactors)
-   [Comparing Component Systems](/documentation/zh-cn/unreal-engine/game-objects-in-unreal-engine#comparingcomponentsystems)
-   [Comparing Update() and Tick()](/documentation/zh-cn/unreal-engine/game-objects-in-unreal-engine#comparingupdate\(\)andtick\(\))
-   [Gameplay Framework](/documentation/zh-cn/unreal-engine/game-objects-in-unreal-engine#gameplayframework)
-   [Important UObject Subclasses](/documentation/zh-cn/unreal-engine/game-objects-in-unreal-engine#importantuobjectsubclasses)
-   [Important Actor Subclasses](/documentation/zh-cn/unreal-engine/game-objects-in-unreal-engine#importantactorsubclasses)