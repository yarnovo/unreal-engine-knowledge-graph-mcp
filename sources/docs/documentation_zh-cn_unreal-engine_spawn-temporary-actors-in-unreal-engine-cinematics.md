# 在虚幻引擎中生成临时Actor | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics
> 
> 生成时间: 2025-06-14T20:12:59.467Z

---

目录

![可生成对象和可持有对象](https://dev.epicgames.com/community/api/documentation/image/1bdefc61-e1ee-423a-b458-54f4cd58f25c?resizing_type=fill&width=1920&height=335)

在Sequencer中，你可以选择引用场景中已存在的Actor（称为 **可持有物**），或生成新的Actor（称为 **可生成物**）。本文档概述了这些概念，以及如何在场景中使用它们。

#### 先决条件

-   你对 **[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)** 及其 **[界面](/documentation/zh-cn/unreal-engine/sequencer-cinematic-toolbar-in-unreal-engine)** 已有所了解。
    
-   你已了解如何创建和使用 **[轨道](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine)**。
    

## 可持有和可生产对象

### 可持有对象

将关卡中已有的Actor添加到序列即可持有Actor。形成的关联属于[软对象路径](/documentation/en-us/unreal-engine/API/Runtime/CoreUObject/UObject/FSoftObjectPath)。在大部分情况下，这都是可接受甚至是推荐的工作流程。如果你的场景需要与 **关卡序列** 中的现有Actor进行高度的互动，那么对于被引用的Actor来说，持有可能是最好的选择。

你可将任意Actor添加到序列，方法是在 **添加Actor到Sequencer（Add Actor to Sequencer）** 列表中选中或抓取Actor。你也可以将Actor从 **大纲视图** 拖入 **Sequencer** 中的空白区域。

![Actor to sequencer possessable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e1aa60a3-b558-4df1-b390-5e47b2c16b4f/add_actor_to_sequencer.png)

### 可生成对象

如果你的场景需要一个在场景的持续时间内可能是临时的Actor，则可以使用Sequencer的 **可生成对象** 功能来创建临时Actor。默认情况下，含可生成Actor的序列开始时将生成该Actor。序列结束后，该Actor将被销毁并移除。你还可以通过生产轨道显式地控制Actor生成和销毁的帧。

#### 创建可生成对象

生成Actor的方式有两种：拖曳Actor和添加Actor。

如果你在 **Sequencer** 之外已有一个Actor，并希望将其转为 **可生成对象**。请将其作为 **可持有对象** 添加到 **Sequencer**，然后将Actor转为 **可生成对象**。

你可以通过将其拖入Sequencer的方式来创建 **可生成对象**。方法是将将Actor从 **[内容浏览器](/documentation/zh-cn/unreal-engine/content-browser-in-unreal-engine)**、**[大纲视图](/documentation/zh-cn/unreal-engine/outliner-in-unreal-engine)** 或 **[放置Actors](/documentation/zh-cn/unreal-engine/placing-actors-in-unreal-engine)** 面板拖入Sequencer大纲视图的空白区域。

![Drag actor from Content Browser to Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c2803190-b368-40b7-975a-de2e2472a2f1/drag_actor_from_content_browser_to_sequencer.gif)

将Actor从内容浏览器拖入Sequencer

![Drag actor from Place Actors to Sequencer](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0661fa9-a3ed-42a2-b4a4-71174c427d51/drag_actor_from_place_actors_to_sequencer.gif)

将Actor从放置Actors面板拖入Sequencer

要将 **可持有对象** 转为 **可生成对象**，请按以下步骤操作：

1.  在视口或大纲视图中选中要生成的Actor.
    
2.  在Sequencer中点击 **轨道（Track） > 添加Actor至Sequencer（Add Actor to Sequencer） > 添加 '{所选Actor名称}'**。此操作会将Actor添加到Sequencer，但它此时还不是可生成对象
    
3.  右键点击Sequencer中的Actor，选择 **换为可生成对象（Convert to Spawnable）**。
    

可生成Actor也可以被转回可持有Actor。如果出现这种情况，将在你的关卡中重新创建Actor，并将轨道绑定到该Actor，删除可生成Actor。

#### 识别Sequencer中的可生成对象

在生成一个Actor后，Sequencer和 **大纲视图** 中的Actor上会出现一个 **闪电覆层**。

![Possessable and Spawnable](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db79e02d-2452-4caa-8bb7-1256145f8c25/possessable_and_spawnable.png)

可持有Actor 可生成Actor

![Spawned actors in Outliner](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2e8726ad-794a-44b5-8ba9-45f87f070c0a/spawned_actors_in_outliner.png)

大纲视图中生成的Actor

## 可生成对象属性

可生成Actor拥有各种属性，可以控制其行为以及与Sequencer的交互。右键点击可生成绑定轨道并定位 **可生成物** 类别以访问这些属性。

属性名称

描述

**生成对象的持有者（Spawned Object Owner）**

指定Actor所属的关卡序列，这也决定了自动生成行为。

-   **此序列** 是默认设置，仅在当前序列的持续时间内让Actor生成和销毁。
-   **根序列** 使Actor在主序列的持续时间内生成和取消生成（如果正在使用）。这会导致Actor在当前序列的边界之外生成和销毁。
-   **外部** 导致Actor在序列开始时生成，但在序列结束时不会被销毁。相反，你可以使用 **[Sequencer标签和分组](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine)** 通过蓝图来销毁Actor。

**可生成关卡（Spawnable Level）**

指定Actor将生成到哪个关卡。此列表由 **[关卡](/documentation/zh-cn/unreal-engine/levels-in-unreal-engine)** 窗口中存在的关卡决定。

你不能指定世界分区或数据层。

**变更类（Change Class）**

此选项提供了一种变更生成的类的方法，同时保留已添加到此可生成对象的Sequencer轨道。这不会保留任何非Sequencer数据，如对象属性。

**持续重新生成（Continuously Respawn）**

启用后，将在每次tick时检查Actor，确保其仍然存在（基于生成轨道的状态）。Actor会在事件中重新生成，外部销毁事件不会将其销毁。

**未生成时依然计算轨道（Evaluate Tracks When Not Spawned）**

启用后，将会计算Actor的所有轨道，即使不生成该Actor也同样如此。如果Actor在生成之前需要任何预处理，这将会非常实用。

**可网络寻址（Net Addressable）**

启用后，将使用可由服务器和客户端引用的唯一名称来生成这个可生成Actor。

**保存默认状态（Save Default State）**

保存此可生成Actor的当前状态。通常你不需要点击此按钮，因为虚幻引擎会尝试自动保存对可生成Actor进行的任何更改。

**转换为可持有物（Convert to Possessable）**

将Actor转换为可持有Actor。如果出现这种情况，将在你的关卡中重新创建Actor，并将Actor轨道绑定到该Actor，删除可生成Actor。

## 工作流

可生成Actor可以帮助你创建在内容组织和管理上更有条理的场景。

### 光照场景

不必在关卡中放置多个必须为每个镜头手动启用或禁用的光源，只需将所需的光源作为可生成Actor添加到镜头即可。它们仅为该镜头而存在，关卡不会被不必要的光源弄糟。

![Lighting scenes](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/06900546-473f-412f-a852-4350f7ddbb05/lighting_scenes.png)

此工作流也可用于任何临时Actor，例如粒子，使其能够创建自身的实例。

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [spawnable](https://dev.epicgames.com/community/search?query=spawnable)
-   [possessable](https://dev.epicgames.com/community/search?query=possessable)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [可持有和可生产对象](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics#%E5%8F%AF%E6%8C%81%E6%9C%89%E5%92%8C%E5%8F%AF%E7%94%9F%E4%BA%A7%E5%AF%B9%E8%B1%A1)
-   [可持有对象](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics#%E5%8F%AF%E6%8C%81%E6%9C%89%E5%AF%B9%E8%B1%A1)
-   [可生成对象](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics#%E5%8F%AF%E7%94%9F%E6%88%90%E5%AF%B9%E8%B1%A1)
-   [创建可生成对象](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics#%E5%88%9B%E5%BB%BA%E5%8F%AF%E7%94%9F%E6%88%90%E5%AF%B9%E8%B1%A1)
-   [识别Sequencer中的可生成对象](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics#%E8%AF%86%E5%88%ABsequencer%E4%B8%AD%E7%9A%84%E5%8F%AF%E7%94%9F%E6%88%90%E5%AF%B9%E8%B1%A1)
-   [可生成对象属性](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics#%E5%8F%AF%E7%94%9F%E6%88%90%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7)
-   [工作流](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics#%E5%B7%A5%E4%BD%9C%E6%B5%81)
-   [光照场景](/documentation/zh-cn/unreal-engine/spawn-temporary-actors-in-unreal-engine-cinematics#%E5%85%89%E7%85%A7%E5%9C%BA%E6%99%AF)