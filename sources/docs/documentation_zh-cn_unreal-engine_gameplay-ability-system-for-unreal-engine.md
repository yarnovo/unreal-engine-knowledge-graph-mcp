# 虚幻引擎的Gameplay技能系统 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/gameplay-ability-system-for-unreal-engine
> 
> 生成时间: 2025-06-14T19:44:48.363Z

---

目录

![Gameplay技能系统](https://dev.epicgames.com/community/api/documentation/image/49d93bc7-f13a-481a-a31f-9681e5dd1e17?resizing_type=fill&width=1920&height=335)

**Gameplay技能系统（Gameplay Ability System）** 是一种框架，用于编译[Actor](/documentation/zh-cn/unreal-engine/actors-in-unreal-engine)可以拥有和触发的属性、技能和交互。该系统可适应各种各样的[Gameplay驱动型](/documentation/zh-cn/unreal-engine/data-driven-gameplay-elements-in-unreal-engine)项目，例如 **角色扮演游戏** （RPG）、 **动作冒险（Action-Adventure）** 游戏和 **多玩家在线战术竞技** 游戏（MOBA）。

使用Gameplay技能系统，你可以：

-   使用[技能系统组件](/documentation/zh-cn/unreal-engine/gameplay-ability-system-component-and-gameplay-attributes-in-unreal-engine)。技能系统组件包括[Actor组件](/documentation/zh-cn/unreal-engine/components-in-unreal-engine)实现的所有基础功能。
    
-   技能系统组件实现了自己的[接口](/documentation/zh-cn/unreal-engine/interfaces-in-unreal-engine)，以访问Gameplay技能系统的框架并与之交互。
    
-   为Actor创建主动或被动[Gameplay技能](/documentation/zh-cn/unreal-engine/gameplay-ability-system-for-unreal-engine)，使之与项目的Gameplay机制、[视觉效果](/documentation/zh-cn/unreal-engine/creating-visual-effects-in-niagara-for-unreal-engine)、[动画](/documentation/zh-cn/unreal-engine/animating-characters-and-objects-in-unreal-engine)、[声音](/documentation/zh-cn/unreal-engine/working-with-audio-in-unreal-engine)和其他数据驱动型元素进行协作。
    
-   使用[属性和属性集](/documentation/zh-cn/unreal-engine/gameplay-attributes-and-attribute-sets-for-the-gameplay-ability-system-in-unreal-engine)，在它们与Gameplay技能系统交互时存储、计算和修改Gameplay相关值。
    
-   使用[Gameplay效果](/documentation/zh-cn/unreal-engine/gameplay-systems-in-unreal-engine)更改属性，通过项目的设计直接修改属性值。Gameplay效果包含可确定Gameplay效果行为的Gameplay效果组件。
    
-   [技能任务](/documentation/zh-cn/unreal-engine/gameplay-ability-tasks-in-unreal-engine)（ `UAbilityTask` ）是处理Gameplay技能的一种专门形式的Gameplay任务类。使用Gameplay技能系统的游戏通常包括各种各样的自定义技能任务，它们实现了独特的Gameplay功能。它们在Gameplay技能执行期间执行异步工作，并能够在原生C++代码中调用委托或像[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)那样在一个或多个输出执行引脚中移动来影响执行流程。
    

使用此系统，你可以创建单次攻击之类的技能，或添加更复杂的技能，例如根据来自用户和目标的数据触发许多状态效果的咒语。

## 《遗迹峡谷》示例

Echo的冲锋和攻击动画及其行走动画是Gameplay技能的示例。

请参阅[遗迹峡谷示例](/documentation/zh-cn/unreal-engine/valley-of-the-ancient-sample-game-for-unreal-engine)，了解更多功能。

### 行走动画示例

### 冲锋攻击示例

## 主题目录

[

![技能系统组件与属性](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/88c0007f-f4b6-46c0-a6ba-ab041b812a87/placeholder_topic.png)

技能系统组件与属性

使用技能系统组件配合游戏玩法属性与属性集





](/documentation/zh-cn/unreal-engine/gameplay-ability-system-component-and-gameplay-attributes-in-unreal-engine)[

![Gameplay Ability](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/114382a6-02d7-4f17-b0f1-60dcd943c5c2/placeholder_topic.png)

Gameplay Ability

Gameplay Ability类概览。





](/documentation/zh-cn/unreal-engine/using-gameplay-abilities-in-unreal-engine)[

![Gameplay属性和属性集](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6a48ca18-0e7e-4662-9d4d-b3f708ec9132/placeholder_topic.png)

Gameplay属性和属性集

使用游戏玩法属性和属性集





](/documentation/zh-cn/unreal-engine/gameplay-attributes-and-attribute-sets-for-the-gameplay-ability-system-in-unreal-engine)[

![Gameplay技能系统概述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d0d8c819-8dfe-427a-b124-b538fe0109ba/placeholder_topic.png)

Gameplay技能系统概述

剖析什么是Gameplay技能系统，及其各个组件类的作用。





](/documentation/zh-cn/unreal-engine/understanding-the-unreal-engine-gameplay-ability-system)[

![Gameplay效果](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5b6ca8a7-5526-448a-802d-c8d08ab5562a/placeholder_topic.png)

Gameplay效果

关于Gameplay技能系统中Gameplay效果的概述。





](/documentation/zh-cn/unreal-engine/gameplay-effects-for-the-gameplay-ability-system-in-unreal-engine)[

![技能任务](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f469c6e7-693b-4c86-b779-37386b0f7994/placeholder_topic.png)

技能任务

技能任务类概览。





](/documentation/zh-cn/unreal-engine/gameplay-ability-tasks-in-unreal-engine)

-   [blueprints](https://dev.epicgames.com/community/search?query=blueprints)
-   [programming](https://dev.epicgames.com/community/search?query=programming)
-   [gameplay ability system](https://dev.epicgames.com/community/search?query=gameplay%20ability%20system)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [《遗迹峡谷》示例](/documentation/zh-cn/unreal-engine/gameplay-ability-system-for-unreal-engine#%E3%80%8A%E9%81%97%E8%BF%B9%E5%B3%A1%E8%B0%B7%E3%80%8B%E7%A4%BA%E4%BE%8B)
-   [行走动画示例](/documentation/zh-cn/unreal-engine/gameplay-ability-system-for-unreal-engine#%E8%A1%8C%E8%B5%B0%E5%8A%A8%E7%94%BB%E7%A4%BA%E4%BE%8B)
-   [冲锋攻击示例](/documentation/zh-cn/unreal-engine/gameplay-ability-system-for-unreal-engine#%E5%86%B2%E9%94%8B%E6%94%BB%E5%87%BB%E7%A4%BA%E4%BE%8B)
-   [主题目录](/documentation/zh-cn/unreal-engine/gameplay-ability-system-for-unreal-engine#%E4%B8%BB%E9%A2%98%E7%9B%AE%E5%BD%95)