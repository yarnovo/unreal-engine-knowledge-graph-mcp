# 虚幻引擎中的Iris优先级安排 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:57:25.370Z

---

目录

![优先级安排](https://dev.epicgames.com/community/api/documentation/image/1451bd26-f6cd-4af7-9d66-4310d2a9439a?resizing_type=fill&width=1920&height=335)

学习使用此**Experimental**功能，但在发布产品中需要谨慎使用。

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [Iris简介](/documentation/zh-cn/unreal-engine/introduction-to-iris-in-unreal-engine)

**Iris优先级安排系统（Iris Prioritization System）** 会对要复制的Actor进行优先级安排。由于带宽有限，并不是每个复制的对象或属性都会每帧更新。为了确定哪些对象最需要每帧复制，优先级安排系统会为对象和Actor分配浮点 *复制优先级* ，以对其排序。相比之下，对象的优先级越高，就越有可能被复制。不同的优先级范围对系统是否考虑复制某个对象有不同的影响：

-   0.0到1.0（不含）：此帧不考虑复制对象。
-   1.0及更高：如果对象有更新的已复制属性，此帧考虑复制对象。

复制优先级会随着网络更新而累积，直至该对象被复制并重置其优先级。这意味着，即使是优先级较低的对象，也会逐步达到足够高的优先级，从而被考虑复制。对象的优先级安排将批量完成，这是为了精简代码以及尽量避免数据缓存未命中的情况。

Iris提供了两种类型的优先级安排：

-   [静态](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E9%9D%99%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)
-   [动态](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E5%8A%A8%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)

## 静态优先级安排器

静态优先级安排器会给对象或Actor分配一个常量优先级数字。要将静态优先级分配给对象，请执行以下步骤：

1.  包含必要的Iris文件以便访问所需的Iris功能。
    
    ```cpp
             #if UE_WITH_IRIS
             #include "Net/Iris/ReplicationSystem/ReplicationSystemUtil.h"
             #include "Iris/ReplicationSystem/ReplicationSystem.h"
             #include "Net/Iris/ReplicationSystem/ActorReplicationBridge.h"
             #endif UE_WITH_IRIS
    ```
    
2.  在Gameplay代码中，为你复制的对象检索复制系统和复制桥。
    
    ```cpp
             // 你想要控制筛选的Actor
             AActor* RepActorPtr;
    		
             UReplicationSystem* ReplicationSystem = UE::Net::FReplicationSystemUtil::GetReplicationSystem(RepActorPtr);
             UActorReplicationBridge* ReplicationBridge = UE::Net::FReplicationSystemUtil::GetActorReplicationBridge(RepActorPtr);
    ```
    
3.  检索复制的对象的 `FNetRefHandle` 。Iris会使用此标识符在复制系统中找到你的对象。
    
    ```cpp
             UE::Net::FNetRefHandle RepActorNetRefHandle = ReplicationBridge->GetReplicatedRefHandle(RepActorPtr);
    ```
    
4.  将对象设置为使用静态优先级。
    
    ```cpp
             ReplicationSystem->SetStaticPriority(RepActorNetRefHandle, 1.0f);
    ```
    

## 动态优先级安排器

动态优先级安排器会根据你选择的优先级安排器所定义的逻辑，将可变优先级数字分配给对象或Actor。 虚幻引擎（UE）提供了一些动态优先级安排器来帮助你：

-   `SphereNetObjectPrioritizer`
-   `SphereWithOwnerBoostNetObjectPrioritizer`
-   `NetObjectCountLimiter`

你可以选择内置的动态优先级安排器或自行创建。如需详细了解如何创建自己的动态优先级安排器，请参阅[创建自定义动态优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%A8%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)。

### 指定动态优先级安排器

要为复制的对象分配动态优先级安排器，请执行以下步骤：

1.  包含必要的Iris文件以便访问所需的Iris功能。
    
    ```cpp
             #if UE_WITH_IRIS
             #include "Net/Iris/ReplicationSystem/ReplicationSystemUtil.h"
             #include "Iris/ReplicationSystem/ReplicationSystem.h"
             #include "Net/Iris/ReplicationSystem/ActorReplicationBridge.h"
             #endif UE_WITH_IRIS
    		
             // 你想要控制筛选的Actor
             AActor* RepActorPtr;
    		
             UReplicationSystem* ReplicationSystem = UE::Net::FReplicationSystemUtil::GetReplicationSystem(RepActorPtr);
             UActorReplicationBridge* ReplicationBridge = UE::Net::FReplicationSystemUtil::GetActorReplicationBridge(RepActorPtr);
    ```
    
2.  检索复制的对象的 `FNetRefHandle` 。Iris会使用此标识符在复制系统中找到你的对象。
    
    ```cpp
             UE::Net::FNetRefHandle RepActorNetRefHandle = ReplicationBridge->GetReplicatedRefHandle(RepActorPtr);
    ```
    
3.  检索你想使用的动态优先级安排器的句柄。
    
    ```cpp
             // 如要使用自定义优先级安排器，请将SphereNetObjectPrioritizer替换为你的自定义优先级安排器的名称
             FNetObjectPrioritizerHandle PrioritizerHandle = ReplicationSystem->GetPrioritizerHandle(FName("SphereNetObjectPrioritizer"));
    ```
    
    如果你打算使用自定义动态优先级安排器，确保在 `DefaultEngine.ini` 文件中配置你的优先级安排器。如需更多信息，请参阅[配置自定义动态优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E9%85%8D%E7%BD%AE%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%A8%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)。
    
4.  分配你的对象以使用动态优先级安排器。
    
    ```cpp
             if (!ReplicationSystem->SetPrioritizer(RepActorNetRefHandle, PrioritizerHandle))
             {
                 UE_LOG(LogTemp, Warning, TEXT("Failed to assign dynamic prioritizer."));
    		
                 // 动态优先级安排器分配失败，分配回退静态优先级
                 ReplicationSystem->SetStaticPriority(ObjectHandle, 1.0f);	
             }
    ```
    

### 提供的动态优先级安排器引用

#### 球体优先级安排器

此动态优先级安排器默认用于带有复制的世界位置的所有Actor。你可以将此优先级安排器可视化为半径有限的两个同心球体。

-   内球体之内的对象优先级最高。
-   在内球体之外但又在外球体之内的对象基于所在位置获得动态优先级。
-   外球体之外的对象优先级最低。

![球体优先级安排器可视化](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0d7f961c-d888-4331-9e2f-c5b99b0da68f/sphere-prioritizer-t.gif)

在相对于查看者的空间中，对象的球体优先级安排器的可视化。

下面提供了关于球体优先级安排器工作方式的更多详情。查看者（玩家）位于中心。对象的优先级取决于它与查看者的相对位置。对象位于内球体之内时，其优先级为内球优先级。对象位于外球体之外时，其优先级为球外优先级。若对象位于内球体和外球体之间，它的优先级可变，会随对象和查看者之间距离的平方而衰减。

这些可视化中使用的颜色含义如下：

-   绿色：内球优先级
-   黄色：外球优先级
-   红色：球外优先级

以下梯度曲面图显示，对象的优先级将根据它与原点处查看者的相对位置发生变化：

![优先级曲面图](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ee41111c-c17b-4ff3-a069-5f54bc334bec/priority-graph-t.gif)

在同一个XY平面中，对象的优先级将根据它与查看者的相对位置发生变化。红色对应于球外优先级，黄色对应于外球优先级，绿色对应于内球优先级。

##### 配置球体优先级安排器

你可以在引擎配置文件（如 `DefaultEngine.ini` ）中配置 `SphereNetObjectPrioritizer` ：

```cpp
	[Script/Iris.SphereNetObjectPrioritizerConfig]
	InnerRadius=<INNER_RADIUS>
	OuterRadius=<OUTER_RADIUS>
	InnerPriority=<INNER_PRIORITY>
	OuterPriority=<OUTER_PRIORITY>
	OutsidePriority=<OUTSIDE_PRIORITY>
```

例如，默认配置设置为：

```cpp
	[Script/Iris.SphereNetObjectPrioritizerConfig]
	InnerRadius=1000.0
	OuterRadius=5000.0
	InnerPriority=1.0
	OuterPriority=0.2
	OutsidePriority=0.1
```

#### 带所有者提升优先级安排器的球体

`SphereWithOwnerBoostNetObjectPrioritizer` 与[球体优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E7%90%83%E4%BD%93%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)相同，但为所属连接提供了优先级提升。在这些情况下，优先级安排器会将 `OwnerPriorityBoost` 的值添加到通常由球体优先级安排器计算的优先级。

##### 配置带所有者提升优先级安排器的球体

你可以在引擎配置文件（如 `DefaultEngine.ini` ）中配置 `SphereWithOwnerBoostNetObjectPrioritizer` ：

```cpp
	[Script/Iris.SphereWithOwnerBoostNetObjectPrioritizerConfig]
	InnerRadius=<INNER_RADIUS>
	OuterRadius=<OUTER_RADIUS>
	OwnerPriorityBoost=<OWNER_BOOST_PRIORITY>
	InnerPriority=<INNER_PRIORITY>
	OuterPriority=<OUTER_PRIORITY>
	OutsidePriority=<OUTSIDE_PRIORITY>
```

#### 对象数量限制器

`NetObjectCountLimiter` 限制了每帧考虑复制的对象数。

##### 配置对象数量限制器

你可以在引擎配置文件（如 `DefaultEngine.ini` ）中配置 `NetObjectCountLimiter` ：

```cpp
	[Script/Iris.NetObjectCountLimiterConfig]
	MaxObjectCount=<MAX_COUNT>
	Priority=<PRIORITY>
	OwningConnectionPriority=<OWNER_PRIORITY>
	bEnableOwnedObjectsFastLane=[true | false]
```

例如，默认配置设置为：

```cpp
	[Script/Iris.NetObjectCountLimiterConfig]
	MaxObjectCount=2
	Priority=1.0
	OwningConnectionPriority=1.0
	bEnableOwnedObjectsFastLane=true
```

### 创建自定义动态优先级安排器

你可以通过实现位于以下位置的 `UNetObjectPrioritizer` 接口来创建自定义动态优先级安排器：

-   `..\Engine\Source\Runtime\Experimental\Iris\Core\Public\Iris\ReplicationSystem\Prioritization\NetObjectPrioritizer.h`

#### 配置自定义动态优先级安排器

要向复制系统注册你的自定义优先级安排器，你必须在引擎配置文件层级中（最好是你的项目的`DefaultEngine.ini` 文件中）配置你的优先级安排器：

```cpp
	[/Script/IrisCore.NetObjectPrioritizerDefinitions]
	+NetObjectPrioritizerDefinitions=(PrioritizerName=<PRIORITIZER_NAME>, ClassName=/Script/<MODULE_NAME>.<PRIORITIZER_NAME>, ConfigClassName=/Script/<CONFIG_MODULE_NAME>.<PRIORITIZER_CONFIG_NAME>)
```

其中：

-   `PRIORITIZER_NAME` 是自定义优先级安排器的名称。
-   `MODULE_NAME` 是定义你的优先级安排器所在模块的名称。
-   `CONFIG_MODULE_NAME` 是定义你的优先级安排器的关联配置所在模块的名称。
-   `PRIORITZER_CONFIG_NAME` 是自定义优先级安排器的配置类的名称。

有一个特殊的 `DefaultPrioritizer` ，设置后会自动用于带有有效 `WorldLocation` 的所有对象。

#### 使用自定义动态优先级安排器

要将你的自定义动态优先级安排器用于复制的对象，请执行[指定动态优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E6%8C%87%E5%AE%9A%E5%8A%A8%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)中的步骤，并在第3步中调用 `GetPrioritizerHandle` 时使用你的优先级安排器的名称。

-   [experimental](https://dev.epicgames.com/community/search?query=experimental)
-   [multiplayer](https://dev.epicgames.com/community/search?query=multiplayer)
-   [networking](https://dev.epicgames.com/community/search?query=networking)
-   [iris](https://dev.epicgames.com/community/search?query=iris)
-   [prioritization](https://dev.epicgames.com/community/search?query=prioritization)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [静态优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E9%9D%99%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)
-   [动态优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E5%8A%A8%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)
-   [指定动态优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E6%8C%87%E5%AE%9A%E5%8A%A8%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)
-   [提供的动态优先级安排器引用](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E6%8F%90%E4%BE%9B%E7%9A%84%E5%8A%A8%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8%E5%BC%95%E7%94%A8)
-   [球体优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E7%90%83%E4%BD%93%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)
-   [配置球体优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E9%85%8D%E7%BD%AE%E7%90%83%E4%BD%93%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)
-   [带所有者提升优先级安排器的球体](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E5%B8%A6%E6%89%80%E6%9C%89%E8%80%85%E6%8F%90%E5%8D%87%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8%E7%9A%84%E7%90%83%E4%BD%93)
-   [配置带所有者提升优先级安排器的球体](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E9%85%8D%E7%BD%AE%E5%B8%A6%E6%89%80%E6%9C%89%E8%80%85%E6%8F%90%E5%8D%87%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8%E7%9A%84%E7%90%83%E4%BD%93)
-   [对象数量限制器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E5%AF%B9%E8%B1%A1%E6%95%B0%E9%87%8F%E9%99%90%E5%88%B6%E5%99%A8)
-   [配置对象数量限制器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E9%85%8D%E7%BD%AE%E5%AF%B9%E8%B1%A1%E6%95%B0%E9%87%8F%E9%99%90%E5%88%B6%E5%99%A8)
-   [创建自定义动态优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%A8%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)
-   [配置自定义动态优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E9%85%8D%E7%BD%AE%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%A8%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)
-   [使用自定义动态优先级安排器](/documentation/zh-cn/unreal-engine/iris-prioritization-in-unreal-engine#%E4%BD%BF%E7%94%A8%E8%87%AA%E5%AE%9A%E4%B9%89%E5%8A%A8%E6%80%81%E4%BC%98%E5%85%88%E7%BA%A7%E5%AE%89%E6%8E%92%E5%99%A8)