# 虚幻引擎Niagara特效添加事件处理器组的参考 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/add-event-handler-group-reference-for-niagara-effects-in-unreal-engine
> 
> 生成时间: 2025-06-14T19:32:47.905Z

---

目录

![添加事件处理器组](https://dev.epicgames.com/community/api/documentation/image/0f51627a-b2bd-4ea8-a486-c33c9003fd12?resizing_type=fill&width=1920&height=335)

**事件处理器（Event Handler）** 可确定发射器对传入事件的响应方式。可为每个事件创建 **事件处理器属性（Event Handler Properties）** 项和 **接收事件（Receive Event）** 项。每个发射器可有多个事件。

事件目前不适用于GPU模拟。事件仅可结合CPU模拟使用。

要使用事件处理器（Event Handler），首先需要在生成事件发射器的粒子更新（Particle Update）组中放置[**事件模块**](/documentation/zh-cn/unreal-engine/particle-update-group-reference-for-niagara-effects-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E6%A8%A1%E5%9D%97)。举例而言，若要使发射器B中的粒子跟随发射器A中的粒子，则可以在发射器A的粒子更新（Particle Update）组中放置 **生成位置事件（Generate Location Event）** 模块。然后需要添加 **事件处理器（Event Handler）** 至发射器B，结合 **接收位置事件（Receive Location Event）** 项目监听该位置事件。

要正确使用事件，必须在正在生成事件的发射器的 **发射器属性（Emitter Properties）** 项中启用 **需要持久ID（Requires Persistent IDs）**。

## 事件处理器属性

参数

说明

**源（Source）**

点击下拉列表可选择源发射器和事件。

**执行模式（Execution Mode）**

此参数可控制运行事件脚本的粒子。可用选项有：

-   **生成的粒子（Spawned Particles）**：事件脚本仅在响应发射器中当前事件时生成的粒子上运行。
-   **每个粒子（Every Particle）**：事件脚本在发射器中的每个现有粒子上运行。
    
    请谨慎使用此模式，因为它可能导致大量的运行时工作。
    

**每帧最大事件数（Max Events Per Frame）**

此参数设置此事件处理器消耗的事件数。如果生成事件数量大于此值，则忽略额外事件。

**生成数量（Spawn Number）**

此参数可控制粒子是否因处理此事件而生成。如果选中 **随机生成数（Random Spawn Number）**，则此参数代表生成的最大粒子数。

**最小生成数（Min Spawn Number）**

如果选中 **随机生成数（Random Spawn Number）**，则此参数表示生成的最小粒子数。

**随机生成数（Random Spawn Number）**

选中此框可随机生成因处理事件而生成的粒子数。

## 接收事件模块

模块名称

说明

**接收碰撞事件（Receive Collision Event）**

侦听生成的碰撞事件（由粒子更新（Particle Update）组中的 **生成碰撞事件（Generate Collision Event）** 模块创建）时需要该模块。另外，可启用继承碰撞速度范围（Inherited Collision Velocity Scale）来确定粒子继承的父速度大小。

**接收消亡事件（Receive Death Event）**

侦听生成消亡事件（由粒子更新（Particle Update）组中的 **生成消亡事件（Generate Death Event）** 模块创建）时需要该模块。另外，可启用继承速度范围（Inherited Velocity Scale）来确定粒子继承的父速度大小。

接收位置事件（Receive Location Event）

侦听生成的位置事件（由粒子更新（Particle Update）组中的 **生成位置事件（Generate Location Event）** 模块创建）时需要该模块。接收位置事件（Receive Location Event）拥有以下设置：

-   **继承速度（Inherited Velocity）**：此设置可确定粒子继承的父速度大小。
-   **使用加速度（Use Acceleration）**：根据传入事件的加速度推断，确定新位置。
-   **继承父规格化年龄（Inherit Parent Normalized Age）**：此设置将发送接收粒子生命周期或父粒子生命周期的最大值。
-   **生成数量（Spawn Count）**：此设置指出因事件而生成的粒子数量。

-   [effects](https://dev.epicgames.com/community/search?query=effects)
-   [module](https://dev.epicgames.com/community/search?query=module)
-   [reference](https://dev.epicgames.com/community/search?query=reference)
-   [vfx](https://dev.epicgames.com/community/search?query=vfx)
-   [event](https://dev.epicgames.com/community/search?query=event)
-   [niagara](https://dev.epicgames.com/community/search?query=niagara)
-   [visual effects](https://dev.epicgames.com/community/search?query=visual%20effects)
-   [particle effects](https://dev.epicgames.com/community/search?query=particle%20effects)
-   [emitter](https://dev.epicgames.com/community/search?query=emitter)
-   [system](https://dev.epicgames.com/community/search?query=system)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [事件处理器属性](/documentation/zh-cn/unreal-engine/add-event-handler-group-reference-for-niagara-effects-in-unreal-engine#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86%E5%99%A8%E5%B1%9E%E6%80%A7)
-   [接收事件模块](/documentation/zh-cn/unreal-engine/add-event-handler-group-reference-for-niagara-effects-in-unreal-engine#%E6%8E%A5%E6%94%B6%E4%BA%8B%E4%BB%B6%E6%A8%A1%E5%9D%97)