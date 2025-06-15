# 虚幻引擎中的Lyra物品栏和装备 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:50:09.614Z

---

目录

![Lyra物品栏和装备](https://dev.epicgames.com/community/api/documentation/image/9cddd4ca-7d0a-4bf9-ad5c-1efc4698315c?resizing_type=fill&width=1920&height=335)

## Lyra物品栏和装备

**物品栏（Inventory ）** 是你拥有的物品的集合，但物品也可以藏起来，比如隐藏在背包等容器中。

**装备（Equipment ）** 是从该容器或背包中拿出来后手持、穿戴或使用的物品。

例如，考虑给予玩家角色的步枪物品。它最初仅以虚拟方式存在于玩家的物品栏中，包括弹药。按下武器更换按钮，即可配备步枪。这将显示为角色手中的3D网格体，添加了步枪的开火和填弹技能。

下面是物品栏和装备之间的一些重要差异：

**类别**

**物品栏物品**

**装备物品**

可视化

图标用于用户界面（UI）或游戏内拾取。

在使用时生成并常常附加到所有者的可见Actor。

生命周期

只要所有者持有实例，实例就存在，放下后就会将其销毁。

物品配备时会创建实例，取消配备时会将其销毁。

Gameplay

状态使用Gameplay标签堆栈维护。

在配备/取消配备周期之间不会维护状态。可以在配备时授予技能集。

所有权

由InventoryManagerComponent中的控制器拥有。

由EquipmentManagerComponent中的Pawn拥有。

网络复制

仅限服务器和自主代理。

服务器、自主代理和模拟代理。

数据定义

由可扩展的物品栏片段组成。

仅限于数据属性。

关联

物品定义通常指定了关联的装备定义。

装备定义没有引用物品栏定义。

命名规范

以"ID\_"开头（ID\_Rifle）

以"WID\_"开头（WID\_Rifle）

## 物品栏

物品栏物品是可以获取或拾取的对象。通过 **物品栏片段（Inventory Fragments）** 数组影响Gameplay和演示。 片段可以通过[Gameplay标签](/documentation/zh-cn/unreal-engine/using-gameplay-tags-in-unreal-engine)改变所有者的统计数据，显示在物品栏UI中，或让物品变为已配备。

### 物品栏物品片段

Lyra有各种片段，可应用于物品栏物品：

**物品栏物品**

**说明**

InventoryFragment\_PickupIcon

确定可以拾取的物品在世界中的表示。

InventoryFragment\_EquippableItem

将此物品栏物品与所有者配备该物品时使用的装备定义配对

InventoryFragment\_SetStats

在拾取时授予一组基于Gameplay标签的堆栈，例如弹药。

InventoryFragment\_QuickbarIcon

确定用于占据玩家快速栏UI中插槽的物品的HUD图标。

InventoryFragment\_ReticleConfig

指定在配备此物品栏物品时要实例化的替代HUD准星类。

你可以实现新的片段类型，从而自定义Lyra的物品栏片段物品效果。

## 物品拾取

`ALyraWeaponSpawner` 类包含拾取如何与物品栏物品一起运作的示例。这些物品在Lyra射击贴图中用作 `B_WeaponSpawner` （对于武器拾取）和 `B_AbilitySpawner` 实例（对于生命值拾取）。

## 装备

**装备（Equipment）** 是可以配备给玩家的物品，可能会更改其Gameplay视觉效果、UI，或者授予被动或主动[技能](/documentation/zh-cn/unreal-engine/abilities-in-lyra-in-unreal-engine)。通常，配备的物品基于物品栏物品实例化。

不同于物品栏物品，装备物品仅在配备时存在。

## 与UI的关系

### 快速栏

**快速栏（Quick Bar）** 是玩家HUD区域，其中显示可配备的物品栏物品，例如武器。它会使用物品的物品栏片段中的信息来显示，并使用物品栏实例的统计数据标签来表示弹药状态。

当你选择不同的快速栏插槽时，玩家物品栏中的武器会相应配备或取消配备。

请参阅 **W\_QuickBar** 和 **W\_QuickBarSlot** 控件蓝图，了解实现细节。

### 自定义准星

不同的物品在配备时可能导致玩家的HUD发生变化。例如，手枪的准星用于精准射击，而霰弹枪的准星用于广泛显示多个命中位置。

准星从物品的物品栏物品定义中的片段指定。请参阅 **W\_ShooterHUDLayout** 和 **W\_WeaponReticleHost** 控件蓝图。

## 关键物品栏类型

类型

说明

InventoryManagerComponent

-   管理一系列物品栏物品。
    
-   将共享的InventoryItemDefinition转换为InventoryItemInstance。
    
-   重复物品可以通过多个InventoryItemInstance或带有StackCount的单个InventoryItemInstance表示。
    
-   由LyraPlayerController拥有。
    

InventoryItemDefinition（资产）

-   资产示例：ID\_Pistol。
    
-   包含InventoryFragment的数组，它们提供有关物品不同方面的更多信息。
    
-   对于可配备的物品，InventoryItem有一个指定EquipmentDefinition资产的片段
    

InventoryFragment

描述物品某个方面的可选数据块。一个物品通常有多个这样的数据块。

InventoryItemInstance

-   在物品添加到物品栏时创建
    
-   引用其原始InventoryItemDefinition
    
-   表示单个物品，例如步枪，以及统计数据标签的"堆栈"。这些堆栈表示物品的特征，例如剩余弹药和容量。
    
-   没有子类。
    

PickupDefinition（资产）

-   保存有关拾取物品的物品栏物品定义、其演示和重新生成行为的信息的数据资产类型。
    
-   示例：WeaponPickupData\_Heal\_Small。
    

## 关键装备类型

类型

说明

EquipmentManagerComponent

-   管理特定Pawn上配备的物品。
    
-   一个角色一次只能配备一个武器。
    
-   保存配备的实例的簿记。（AppliedEquipmentEntry的数组）
    
-   由Pawn拥有。
    

EquipmentDefinition（资产）

-   定义要对配备它的Pawn执行的操作。
    
-   配备时要生成的Actor的列表。
    
-   要授予的技能的列表。
    

EquipmentInstance

-   在Pawn上配备时创建。
    
-   有OnEquipped/OnUnequipped虚拟和蓝图可实现的函数。
    
-   在FGameplayTagStackContainer中保存标签堆栈。
    
-   保存发起者。（负责配备的对象。对于快速栏，这是InventoryItemInstance。）
    
-   可以访问所属Pawn。
    
-   EquipmentInstance的子类存在。（WeaponInstance、RangedWeaponInstance）
    
-   无法访问从中创建它的EquipmentDefinition。
    

AppliedEquipmentEntry

-   簿记条目，每个配备的物品一个条目。
    
-   将EquipmentInstance与其源EquipmentDefinition配对。
    
-   保存应用于所属Pawn的物品（授予的技能、生成的Actor）。
    

RangedWeaponInstance / WeaponInstance

执行一些特定于类型的内部簿记的EquipmentInstance专业化版本。

## 超越Lyra

虽然Lyra中的物品同时有物品栏和装备表示，但这些系统可以独立运行。

例如，考虑为玩家提供一个能够授予防御性奖励的物品，例如魔法幸运符。该物品可能有物品栏定义指定了HUD图标，而且有新片段类型将保护性Gameplay效果应用于其所有者。 由于这是不需要配备的被动效果，因此不需要装备物品定义。

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [lyra](https://dev.epicgames.com/community/search?query=lyra)
-   [shootercore](https://dev.epicgames.com/community/search?query=shootercore)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Lyra物品栏和装备](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#lyra%E7%89%A9%E5%93%81%E6%A0%8F%E5%92%8C%E8%A3%85%E5%A4%87)
-   [物品栏](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#%E7%89%A9%E5%93%81%E6%A0%8F)
-   [物品栏物品片段](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#%E7%89%A9%E5%93%81%E6%A0%8F%E7%89%A9%E5%93%81%E7%89%87%E6%AE%B5)
-   [物品拾取](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#%E7%89%A9%E5%93%81%E6%8B%BE%E5%8F%96)
-   [装备](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#%E8%A3%85%E5%A4%87)
-   [与UI的关系](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#%E4%B8%8Eui%E7%9A%84%E5%85%B3%E7%B3%BB)
-   [快速栏](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#%E5%BF%AB%E9%80%9F%E6%A0%8F)
-   [自定义准星](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%87%86%E6%98%9F)
-   [关键物品栏类型](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#%E5%85%B3%E9%94%AE%E7%89%A9%E5%93%81%E6%A0%8F%E7%B1%BB%E5%9E%8B)
-   [关键装备类型](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#%E5%85%B3%E9%94%AE%E8%A3%85%E5%A4%87%E7%B1%BB%E5%9E%8B)
-   [超越Lyra](/documentation/zh-cn/unreal-engine/lyra-inventory-and-equipment-in-unreal-engine#%E8%B6%85%E8%B6%8Alyra)