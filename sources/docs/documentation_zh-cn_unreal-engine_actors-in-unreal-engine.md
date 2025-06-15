# Unreal Engine Actors | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/actors-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:46:27.676Z

---

目录

![Actors](https://dev.epicgames.com/community/api/documentation/image/e8ad140a-4ad3-45cb-b3d6-7a0e7c3f4cb3?resizing_type=fill&width=1920&height=335)

所有可以放入关卡的对象都是 **Actor**，比如摄像机、静态网格体、玩家起始位置。Actor支持三维变换，例如平移、旋转和缩放。你可以通过游戏逻辑代码（C++或蓝图）创建（生成）或销毁Actor。

在C++中，AActor是所有Actor的基类。

注意：Actor不直接保存变换（位置、旋转和缩放）数据；如Actor的根组件存在，则使用它的变换数据。

## 创建Actor

创建 `AActor` 类的新实例被称为 **生成**。可使用泛型 `SpawnActor()` 函数或它的一个特殊模板化版本进行操作。

在 [生成和销毁Actor](/documentation/zh-cn/unreal-engine/spawning-and-destroying-unreal-engine-actors) 中可查阅gameplay `AActor` 类实例诸多创建方法的详细信息。

## 组件

在某种意义上，**Actor** 可被视为包含特殊类型 **对象**（称作[组件](/documentation/zh-cn/unreal-engine/components-in-unreal-engine)）的容器。 不同类型的组件可用于控制Actor移动的方式及其被渲染的方式，等等。Actor的其他主要功能是在游戏进程中在网络上进行属性[复制](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine#replication) 和函数调用。

组件被创建时与其包含的Actor相关联。

组件的主要类型有：

$ UActorComponent：这是基础组件。其可作为Actor的一部分被包含。如果需要，其可进行[Tick](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine#ticking)。ActorComponents与特定的Actor相关联，但不存在于场景中的任意特定位置。它们通常用于概念上的功能，如AI或解译玩家输入。

$ USceneComponent：SceneComponents是拥有变换的ActorComponents。变换是场景中的位置，由位置、旋转和缩放定义。SceneComponents能以层级的方式相互附加。Actor的位置、旋转和缩放取自位于层级根部的SceneComponent。

$ UPrimitiveComponent：PrimitiveComponent是拥有一类图像表达（如网格体或粒子系统）的SceneComponent。诸多有趣的物理和碰撞设置均在此处。

Actor支持拥有一个SceneComponent的层级。每个Actor也拥有一个 `RootComponent` 属性，将指定作为Actor根的组件。Actor自身不含变换，因此不带位置、旋转，或缩放。 它们依赖于其组件的变换，具体来说是其根组件的变换。如果此组件是一个 **SceneComponent**，其将提供Actor的变换信息。 否则Actor将不带变换。其他附加的组件拥有相对于其附加到的组件的变换。

Actor和层级的范例应类似于此：

GoldPickup Actor

层级

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/26f8575c-53c8-4071-9791-1bcc9dd0dd0f/goldpickupexampleactor.png)

-   **根 - SceneComponent**：在场景中设置Actor基础位置的基础场景组件。
    
    -   **StaticMeshComponent**：代表金矿石的网格体。
        
        -   **ParticleSystemComponent**：附加到金矿石的闪烁粒子发射器。
        -   **AudioComponent**：循环附加到金矿石的金属声发射器。
        -   **BoxComponent**：碰撞盒体，用作拾取黄金重叠事件的触发器。

## Ticking

[Ticking](/documentation/zh-cn/unreal-engine/actor-ticking-in-unreal-engine)代表Actor在虚幻引擎中的更新方式。所有Actor均能每帧tick，或以用户定义的最小间隔进行tick，以便执行必要的更新计算或操作。

所有Actor均可通过 `Tick()` 函数默认被tick。

**ActorComponents** 能够默认被更新，但其使用的是 `TickComponent()` 函数进行操作。 参见组件页面的[更新部分](/documentation/zh-cn/unreal-engine/components-in-unreal-engine#updating)了解详情。

## 生命周期

查看[Actor生命周期](/documentation/zh-cn/unreal-engine/unreal-engine-actor-lifecycle)文档，了解如何在游戏中创建和移除Actor的更多信息。

## 复制

**复制** 用于在处理联网多人游戏时对场景中的Actor进行同步。属性值和函数调用均可被复制， 以便对客户端上游戏的状态进行完整控制。

## 销毁Actor

Actor通常不会被垃圾回收，因为场景对象保存一个Actor引用的列表。调用 `Destroy()` 即可显式销毁Actor。 这会将其从关卡中移除，并将其标记为"待销毁"，这说明其在下次垃圾回收中被清理之前都将存在。

-   [actors](https://dev.epicgames.com/community/search?query=actors)
-   [architecture](https://dev.epicgames.com/community/search?query=architecture)
-   [programming](https://dev.epicgames.com/community/search?query=programming)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [创建Actor](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine#%E5%88%9B%E5%BB%BAactor)
-   [组件](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine#%E7%BB%84%E4%BB%B6)
-   [Ticking](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine#ticking)
-   [生命周期](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F)
-   [复制](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine#%E5%A4%8D%E5%88%B6)
-   [销毁Actor](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine#%E9%94%80%E6%AF%81actor)