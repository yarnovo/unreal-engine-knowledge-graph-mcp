# 虚幻引擎智能对象概述 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview
> 
> 生成时间: 2025-06-14T19:43:51.264Z

---

目录

![智能对象概述](https://dev.epicgames.com/community/api/documentation/image/3347defa-e4b8-485f-85a4-8013f0bc90a5?resizing_type=fill&width=1920&height=335)

## 概述

**智能对象（Smart Object）** 是可以放置在关卡中与AI代理和玩家交互的对象。这些对象包含交互所需的所有信息。 智能对象隶属于一个全局数据库，并使用一种空间分区结构。这意味着可以在运行时使用过滤器（例如代理和Gameplay标签周围的搜索区域）来查询智能对象。

总体来说，智能对象表示关卡中的一组活动，并且该活动可以通过保留系统使用。

值得注意的是，智能对象不包含执行逻辑。相反，智能对象向交互对象提供所有必要信息，以便执行交互，具体取决于其实现方法。每个交互对象（代理或玩家）都会针对智能对象自己实现逻辑。

## SmartObject元素

### SmartObject子系统

**智能对象子系统（SmartObject subsystem）** 负责跟踪关卡中可用的所有智能对象。 智能对象会自动注册到子系统以进行访问和跟踪。

当智能对象插件处于激活状态时，会自动在世界中创建这个子系统。

### 智能对象持久集合

**智能对象持久集合（SmartObject Persistent Collection）** 是一个放置在关卡中的Actor，其中包含智能对象的列表，这些智能对象将始终是模拟的一部分，无论在运行时加载还是卸载这些智能对象。

请注意，关卡中可以有多个智能对象持久集合，也可以完全没有。 该集合仅影响智能对象的生命周期，而不会影响系统是否使用它。

### 智能对象容器

**智能对象容器（SmartObject Container）** 可跟踪一组智能对象。 智能对象子系统和智能对象持久集合都使用智能对象容器对自身的智能对象执行特定操作。

一个常见示例是在将持久集合添加到智能对象子系统时合并智能对象组。

### SmartObject组件

可以将 **SmartObject组件** 添加到 **Actor** ，将其标记为关卡中的智能对象。该组件指向智能对象定义资产，后者存储给定智能对象模板的配置。

运行时可以使用 **世界分区（World Partition）** 或 **流送（Streaming）** 加载和卸载包含SmartObject组件的Actor。如果智能对象组件包含在任何已加载的智能对象持久集合中，则会有一个运行时实例将在内存中保持激活状态，并且无论该组件的流送状态如何，这个实例都将被视为模拟的一部分。

如果包含智能对象组件的Actor是在运行时生成的，则在卸载后，此Actor将不会在内存中保持激活状态。 这是因为该组件不属于任何智能对象持久集合。

### 智能对象定义

**智能对象定义** 是一种数据资产，包含多个智能对象运行时实例之间共享的不可变数据。智能对象定义存储用户要求的标签、活动标签、对象激活标签等过滤信息，以及可用于与智能对象交互的默认行为定义集。

智能对象定义将公开一个或多个可用插槽，代理或玩家可以将插槽用于特定智能对象。每个插槽包括相对于父锚点的位置和旋转（从编辑器位置烘焙），以及几个可覆盖属性。可覆盖属性的常见示例包括用户需要的标签和每个插槽的专有行为定义。

### 智能对象行为定义

**智能对象行为定义（Smart Object Behaviors Definitions）** 包含代理或玩家进行给定交互所需的数据。当前提供了以下行为定义类型：

-   **批量实体行为（Mass Entity Behavior）** - 包含的数据用于配置可由批量实体使用的智能对象。
-   **Gameplay行为（Gameplay Behavior）** - 包含的数据用于配置可由Gameplay行为插件使用的智能对象。

## 运行时流程

在本小节中，你将了解代理如何与关卡中的智能对象交互。

### 代理数据

为了搜索智能对象，代理可以使用一个或多个Gameplay标签，并且它还可以使用标签查询（活动要求），该查询包含了对象上的所需标签。在关卡中搜索匹配的智能对象时将使用此信息。

### 智能对象数据

智能对象定义可以包含一个或多个用于描述对象的活动标签。它们还可以包含带有所需标签列表的标签查询。标签查询是一个表达式，用于确定是否允许请求使用智能对象的用户与对象进行交互。

智能对象定义包含将用于所有插槽的默认行为定义的列表。如果插槽具有指定给它的特定行为定义，该特定行为将覆盖默认行为。

### 搜索智能对象

1.  代理以指定的时间间隔搜索附近的智能对象。代理通过调用智能对象子系统中的 **FindSmartObjects** 方法来执行搜索。此方法包含用户标签、活动标签、行为定义类和搜索区域。
    
2.  智能对象子系统将在搜索区域内查找与对象标签匹配的全部智能对象。
    
3.  智能对象子系统会将智能对象结果返回给代理。智能对象结果是结构体数组，包含所有匹配的智能对象ID及其空闲插槽。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e69a34a6-5959-4034-aa30-11cb82ed4416/so-ov-diagram-search.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e69a34a6-5959-4034-aa30-11cb82ed4416/so-ov-diagram-search.png)
    
    ![带有两个空闲插槽的智能对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/39231cc0-b0ab-4af1-b9f7-d5029731db6c/so-ov-search-so.png)
    
    在上图中，你可以看到带有一个空闲插槽（用绿色环表示）的车辆智能对象。
    

### 认领智能对象

1.  代理将选择所需的智能对象结果，并调用智能对象子系统中的 **ClaimSmartObject** 方法。此方法将尝试从智能对象中认领可用插槽。
    
2.  智能对象子系统将尝试从智能对象中认领可用插槽。
    
3.  在智能对象中认领可用插槽，其状态设置为 **已认领（Claimed）** 。
    
4.  智能对象子系统会向代理返回 **认领句柄（Claim Handle）** 。
    
5.  代理会检查认领句柄是否有效。如果有效且认领尝试成功，则可以继续下一步。但是，如果认领句柄无效，代理可能会尝试从智能对象结果中认领另一个智能对象。
    
    被认领的插槽无法被其他代理再认领，除非被占用它的代理释放。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91bdeb11-9d96-4e8b-bd16-ff4749858be5/so-ov-diagram-claim.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/91bdeb11-9d96-4e8b-bd16-ff4749858be5/so-ov-diagram-claim.png)
    
    ![带有两个已认领插槽的智能对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f6907ec2-53af-4960-b7d3-066eb1ab4b1b/so-ov-search-so.png)
    
    在上图中，插槽0已被代理认领。
    

\### 接近智能对象

1.  代理将调用智能对象子系统中的 **GetSlotLocation** 或 **GetSlotTransform** 方法，并传递认领句柄。此方法将返回已认领插槽的位置或变换。  
    
    用户还可以使用以下C++代码来获取插槽变换：
    
    ```cpp
             FSmartObjectSlotView:
             FSmartObjectSlotView View = Subsystem->GetSlotView(ClaimHandle.SlotHandle);
    
             const FSmartObjectSlotTransform& SlotTransform = View.GetStateData<FSmartObjectSlotTransform>();
             FTransform Transform = SlotTransform.GetTransform();
    ```
    
2.  智能对象子系统会将已认领插槽的位置或变换返回给代理。
    
3.  代理现在可以开始寻找关卡中的插槽位置。代理可以使用所需的任意寻路方法到达其目的地。
    
4.  代理到达插槽位置，调用智能对象子系统中的 **UseSlot** 方法，并传递认领句柄。
    
5.  Use方法将触发已认领插槽的状态变化。插槽的状态从 **已认领（Claimed）** 变为 **已占用（Occupied）** 。
    
6.  智能对象子系统会将 **行为定义** 结构体返回给代理。行为定义将包含代理在插槽位置执行其所需行为的所有必要数据。  
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9327d85a-b62d-420a-a263-c87f485c7571/so-ov-diagram-approach.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9327d85a-b62d-420a-a263-c87f485c7571/so-ov-diagram-approach.png)
    
    ![具有已占用插槽和已认领插槽的智能对象](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8d6182ea-b43d-44ac-9b91-45a360ce0d69/so-ov-approach-so.png)
    
    在上图中，代理到达插槽并开始执行所需的行为。插槽现在已被占用，由红色环表示。
    

### 释放智能对象

1.  代理将执行行为定义中描述的所需行为。
    
2.  行为完成或中止后，代理将使用智能对象子系统中的认领句柄调用 **ReleaseSmartObject** 方法。
    
3.  智能对象子系统将插槽状态从 **已占用（Occupied）** 更改为 **空闲（Free）** 。
    
4.  代理现在可以自由执行另一行为，或搜索另一个智能对象。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3de4b7de-1f18-4f3f-943f-c22753922464/so-ov-diagram-release.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3de4b7de-1f18-4f3f-943f-c22753922464/so-ov-diagram-release.png)
    
    代理负责释放它们已认领的插槽。它们的行为一旦完成或中断，就会发生这种情况。
    

### 中止过程

上述过程可以随时被代理或智能对象中断或中止。

如果智能对象的状态发生变化，它将自动释放所有已认领或已占用的插槽，并通过 **OnSlotInvalidatedDelegate** 回调通知相应的代理。常见的示例是智能对象在Gameplay期间被销毁。

代理也可以随时因故中止该过程。在这种情况下，代理负责释放插槽，以便其他代理可以认领它。常见的示例包括代理消亡，或执行优先级更高的任务。

-   [ai](https://dev.epicgames.com/community/search?query=ai)
-   [smart objects](https://dev.epicgames.com/community/search?query=smart%20objects)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [概述](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E6%A6%82%E8%BF%B0)
-   [SmartObject元素](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#smartobject%E5%85%83%E7%B4%A0)
-   [SmartObject子系统](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#smartobject%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [智能对象持久集合](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1%E6%8C%81%E4%B9%85%E9%9B%86%E5%90%88)
-   [智能对象容器](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1%E5%AE%B9%E5%99%A8)
-   [SmartObject组件](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#smartobject%E7%BB%84%E4%BB%B6)
-   [智能对象定义](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1%E5%AE%9A%E4%B9%89)
-   [智能对象行为定义](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1%E8%A1%8C%E4%B8%BA%E5%AE%9A%E4%B9%89)
-   [运行时流程](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E8%BF%90%E8%A1%8C%E6%97%B6%E6%B5%81%E7%A8%8B)
-   [代理数据](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E4%BB%A3%E7%90%86%E6%95%B0%E6%8D%AE)
-   [智能对象数据](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1%E6%95%B0%E6%8D%AE)
-   [搜索智能对象](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E6%90%9C%E7%B4%A2%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1)
-   [认领智能对象](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E8%AE%A4%E9%A2%86%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1)
-   [释放智能对象](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E9%87%8A%E6%94%BE%E6%99%BA%E8%83%BD%E5%AF%B9%E8%B1%A1)
-   [中止过程](/documentation/zh-cn/unreal-engine/smart-objects-in-unreal-engine---overview#%E4%B8%AD%E6%AD%A2%E8%BF%87%E7%A8%8B)