# 虚幻引擎中的地图检查错误 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:19:58.344Z

---

目录

![地图检查错误](https://dev.epicgames.com/community/api/documentation/image/7e40f444-1159-453a-b4b2-68c8fec31c9d?resizing_type=fill&width=1920&height=335)

虚幻引擎拥有智能机制，存在潜在问题时将以地图检查错误和警告的形式提醒用户，在了解问题诱因和修复方法之前便不需要手动追踪问题。这些错误可自动追踪问题所在，便于开发者进行修复，避免问题对游戏造成严重影响。

## 执行地图检查

执行地图全部编译后将显示地图检查错误和警告，也可使用 [关卡编辑器工具栏](/documentation/zh-cn/unreal-engine/level-editor-toolbar-in-unreal-engine) 中 Build 菜单内的 *Map Check* 选项单独执行。

## 错误

错误是可能导致执行失败的严重问题。继续开发前需要将问题修复。

### 光照

**\[LightActor\] has same light GUID as \[LightActor\] (Duplicate and replace the orig with the new one)**

复制并进行新旧替换。

## 警告

警告不是严重问题，但可能导致游戏功能出现不正常，或性能降低。它们应该被修复，但并非必修问题。

### Actor

**\[Actor\] : Large Actor casts a shadow and will cause an extreme performance hit unless bUseBooleanEnvironmentShadowing is set to true**

一个大型 Actor 被设为投射阴影——这将导致严重的性能问题，需要将 bUseBooleanEnvironmentShadowing 设为 true。

**\[Volume\] causes damage, but has no damagetype defined.**

体量设为输出伤害但伤害类型未定义时，将出现此警告。伤害类型十分重要，因为它将告知游戏代码如何处理 Actor 受到伤害后的反应。前往 Actor 的属性窗口 -> Physics Volume 设置 'DamageType' 属性即可解决。

**\[Actor\] : Brush has non-coplanar polygons**

关卡中的笔刷拥有非共平面多边形时会出现此警告。出现此警告的原因通常是在几何体模式中以极端方式使用笔刷编辑工具，导致关卡出现多边形丢失。删除笔刷然后重建即可消除此警告。

**\[Actor\] in same location as \[Another Actor\]**

一个 Actor 的所在位置和另一个 Actor 完全相同时将出现此警告。出现此警告的原因通常是意外复制或粘贴操作。修复办法：删除其中一个 Actor；如为刻意所为，可直接无视警告。

**\[Actor\] has invalid DrawScale/ DrawScale3D**

DrawScale、DrawScale3D X、DrawScale3D Y 或 DrawScale 3D Z 等于 0 时将出现此警告。意味着 Actor 将不会显示，因为它已经在某根轴上被缩放为 0。将为零的 DrawScale 设为非零即可修复问题：选中 Actor，在主 UnrealEd 窗口底部修改其 drawscale。

**\[Actor\] is obsolete and must be removed!**

关卡中的一个 Actor 实例被标记为弃用后将出现此警告。出现此警告的原因通常是关卡创建后一个 Actor 被标记为弃用，但地图却从未更新。删除 Actor 即可消除警告。

**\[Actor\] bStatic true, but has Physics set to something other than PHYS\_None!**

Actor 的 bStatic 标记被设为 true 但其 Physics 被设为 PHYS\_None 时将出现此警告。因为 bStatic 代表 Actor 将不会移动，而 Physics 设为 PHYS\_None 则构成了矛盾。设置 bStatic 标记的 Actor 也不会被 tick（更新）。前往 Actor 的属性并将 Physics 改为 PHYS\_None 即可修复此问题。

**\[Actor\] : Volume Actor has NULL collision component - please delete**

指定的体量 Actor 拥有一个 NULL 碰撞组件，可能需要删除。

**\[Actor\] : Volume Actor has a collision component with 0 radius - please delete**

指定体量 Actor 的碰撞组件半径为零，可能需要删除。

**\[Actor\] (LOD \[Index\]) has hand-painted vertex colors that no longer match the original StaticMesh \[StaticMesh\]**

实例的顶点颜色被绘制后原始网格体已发生变化——可能需要刷新。

**\[Actor\] has collision enabled but StaticMesh \[StaticMeshName\] has no simple or complex collision.**

需要将 Actor 上的 Collision Enabled 设为 No Collision，或为网格体添加碰撞（方法为添加简单碰撞形体，并/或在分段上启用碰撞）。

**Actor casts dynamic shadows and has a BoundsScale greater than 1! This will have a large performance hit**

这是严重的性能警告……需要将 BoundsScale 缩小为大于等于 1，或移除动态阴影。

**\[ActorName\] has WorldTrace blocked.It will be considered to be world geometry**

### BSP 笔刷

**\[Brush Actor\] : Brush has zero polygons - please delete!**

此警告说明关卡中的笔刷没有与其相关的多边形。此笔刷毫无作用，应被删除。

**Run 'Clean BSP Materials' to clear \[count\] references**

此警告说明笔刷表面存在对 BSP 无帮助的材质引用，应用 Tools-> 'Clean BSP Materials' 操作即可清除这些引用。

**\[Actor\] : Brush has NULL BrushComponent property - please delete!**

笔刷带有"None" ConstraintInstance 组件时将出现此警告。这常见于使用复制创建笔刷的旧地图中，删除引起警告的笔刷并新建即可修复。

**\[Brush\] : Brush is planar**

使用了平面笔刷——注意这可能导致碰撞问题。

### 摄像机

**Camera has AspectRatio=0 - please set this to something non-zero**

### 类

**\[ \]::\[ \] is obsolete and must be removed (Class is abstract)**

**\[ \]::\[ \] is obsolete and must be removed (Class is deprecated)**

### 植物

**Foliage instances for a missing Static Mesh have been removed.**

**Foliage in this map is missing \[MissingCount\] cluster component(s) for Static Mesh \[MeshName\].Opening the Foliage tool will fix this problem.**

### 地形

**\[LandscapeComponent\] : Fixed up deleted layer weightmap**

**\[LandscapeComponent\] : Fixed up incorrect layer weightmap texture index**

**Fixed up shared weightmap texture for layer \[Layer\] in component \[Component\] (shares with \[Name\])**

**Landscape (\[ProxyName\]) has overlapping render components at location (\[X,Y\])**

### 关卡

**Duplicate level info**

存在两个场景信息（WorldInfo）。

**Map should have KillZ set.**

地图的 KillZ 在 WorldInfo 属性中设为默认值时将出现此警告。应该在所有关卡中对 KillZ 进行合理指定，使玩家无法一直下落到可到达的游戏世界边界。

### 光照

**\[Actor\] : Light Actor has NULL LightComponent property - please delete!**

光照 Actor 带有"None" LightComponent 时将出现此警告。这常见于使用复制创建 Actor 的旧地图中，删除引起警告的 Actor 并新建即可修复。

**Maps need lighting rebuilt**

移动或修改光照 Actor 导致光照无效后将出现此警告。这可能引起问题，因为关卡中的渲染灯光未准确表现关卡的当前光照状况。前往 Build 菜单并重建地图光照即可解决此问题。

**Component is a static type but has invalid lightmap settings! Indirect lighting will be black. Common causes are lightmap resolution of 0, LightmapCoordinateIndex out of bounds.**

### 导航

**Paths need to be rebuilt**

### 粒子系统

**\[Actor\] : Emitter Actor has NULL ParticleSystemComponent property - please delete!**

发射器 Actor 带有"None" ParticleSystemComponent 时将出现此警告。这常见于使用复制创建 Actor 的旧地图中，删除引起警告的 Actor 并新建即可修复。

**PSysComp has an empty parameter Actor reference at index \[Index\] (\[Actor\])**

Param.Actor 不应为 NULL。

**PSysComp has an empty parameter material reference at index \[Index\] (\[Actor\])**

Param.Material 不应为 NULL。

### 骨架网格体

**\[Actor\] : SkeletalMeshActor has no PhysicsAsset assigned.**

需要将 PhysicsAsset 指定到骨架网格体的 SkeletalMeshComponent 中，使骨架网格体拥有准确的边界框。如边界框错误或不准确，网格体原点不在画面中时其将消失，或出现分辨率很低的阴影（因为边界框过大）。

**\[Actor\] : Skeletal Mesh Actor has NULL SkeletalMeshComponent property**

指定的骨架网格体 Actor 带有一个 NULL SkeletalMeshComponent 属性。

**\[Actor\] : Skeletal Mesh Actor has NULL SkeletalMesh property**

指定的骨架网格体 Actor 带有一个 NULL SkeletalMesh 属性。

### 声音

**\[Actor\] : Ambient sound Actor has NULL AudioComponent property - please delete!**

环绕声 Actor 带有"None" AudioComponent 时将出现此警告。这常见于使用复制创建 Actor 的旧地图中，删除引起警告的 Actor 并新建即可修复。

**Ambient sound Actor's AudioComponent has a NULL SoundCue property!**

环绕声 Actor 带有一个 NULL SoundCue 属性时将出现此警告。这会导致问题，因为 Actor 实际上并未播放声音。修复方法：首先在通用浏览器中选择一个声音提示，然后前往 Actor 的属性窗口 ->Audio Category->Audio Component 并设置 'SoundCue' 属性。

### 静态网格体

**\[Static Mesh Actor\] : Static Mesh Actor has NULL StaticMesh property**

关卡中的静态网格体 Actor 带有一个 NULL StaticMesh 属性时将出现此警告。这可能会导致问题。因为 Actor 存在并会占用内存，但实际上却没有静态网格体进行绘制。出现此警告的原因通常是在通用浏览器中选择 StaticMesh 之前便先创建了 StaticMesh Actor。修复方法：首先在通用浏览器中选择一个静态网格体，然后前往 StaticMesh Actor 的属性窗口 ->StaticMeshActor Category->StaticMeshComponent->StaticMeshComponent Category 并设置 'StaticMesh' 属性。

**\[Actor\] : Static Mesh Actor has NULL StaticMeshComponent property - please delete!**

静态网格体 Actor 带有"None" StaticMeshComponent 组件时将出现此警告。这常见于使用复制创建 Actor 的旧地图中，删除引起警告的 Actor 并新建即可修复。

**\[StaticMesh\] has simple collision but is being scaled non-uniformly - collision creation will fail**

简单碰撞无法用于非均匀缩放。请修正缩放或碰撞类型。

**More overridden materials \[Count\] on Static Mesh component than are referenced \[Count\] in source mesh \[StaticMesh\]**

**\[Count\] element(s) with zero triangles in Static Mesh \[StaticMesh\]**

### 体积

**LevelGridVolumes are only allowed in the persistent level**

LevelGridVolume 被放置到流送关卡后将出现此警告。这类体积只能放置在固定关卡中。将 LevelGridVolume 移至固定关卡中即可修复此问题。

**LevelStreamingVolume is not in the persistent level - please delete**

关卡流送体积不存在于固定关卡中时将出现此警告。这可能会导致问题，因为检查流送关卡应被加载或卸载时不会考虑到体积。删除关卡流送体积并重建即可修复此问题。

**No levels are associated with streaming volume.**

没有关卡与 LevelStreamingVolume 相关时（其毫无作用）将出现此警告。为此 LevelStreamingVolume 关联流送关卡即可修复此问题。

### 未分类

**Filename \[Filename\] is too long - this may interfere with cooking for consoles. Unreal filenames should be no longer than \[Length\] characters.**

请将文件命名保持在指定长度内。

**\[ObjectName\] : Externally referenced**

## 信息

信息是不需要用户进行修复、但需要了解的问题。

### Actor

**\[Actor\] : Repaired painted vertex colors**

此 Actor 上的绘制顶点颜色已被修复。

-   [map](https://dev.epicgames.com/community/search?query=map)
-   [error](https://dev.epicgames.com/community/search?query=error)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [执行地图检查](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E6%89%A7%E8%A1%8C%E5%9C%B0%E5%9B%BE%E6%A3%80%E6%9F%A5)
-   [错误](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E9%94%99%E8%AF%AF)
-   [光照](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E5%85%89%E7%85%A7)
-   [警告](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E8%AD%A6%E5%91%8A)
-   [Actor](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#actor)
-   [BSP 笔刷](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#bsp%E7%AC%94%E5%88%B7)
-   [摄像机](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E6%91%84%E5%83%8F%E6%9C%BA)
-   [类](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E7%B1%BB)
-   [植物](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E6%A4%8D%E7%89%A9)
-   [地形](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E5%9C%B0%E5%BD%A2)
-   [关卡](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E5%85%B3%E5%8D%A1)
-   [光照](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E5%85%89%E7%85%A7-2)
-   [导航](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E5%AF%BC%E8%88%AA)
-   [粒子系统](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E7%B2%92%E5%AD%90%E7%B3%BB%E7%BB%9F)
-   [骨架网格体](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E9%AA%A8%E6%9E%B6%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [声音](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E5%A3%B0%E9%9F%B3)
-   [静态网格体](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E9%9D%99%E6%80%81%E7%BD%91%E6%A0%BC%E4%BD%93)
-   [体积](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E4%BD%93%E7%A7%AF)
-   [未分类](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E6%9C%AA%E5%88%86%E7%B1%BB)
-   [信息](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#%E4%BF%A1%E6%81%AF)
-   [Actor](/documentation/zh-cn/unreal-engine/map-check-errors-in-unreal-engine#actor-2)