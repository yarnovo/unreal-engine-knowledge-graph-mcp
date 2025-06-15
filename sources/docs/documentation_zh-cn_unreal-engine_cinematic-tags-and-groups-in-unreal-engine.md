# Sequencer标签和分组 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:13:04.550Z

---

目录

![Sequencer标签和分组](https://dev.epicgames.com/community/api/documentation/image/c1b28fe2-a395-4ab3-9b36-22b688e4ce10?resizing_type=fill&width=1920&height=335)

使用Sequencer可以以元数据来标记轨道，从而支持其他功能和行为。可以对Actor指定 **标签**，这些标签可以在蓝图中引用，从而更广泛引用Actor和轨道。还可将轨道放入 **分组**，以管理其显示和选择。

本页概述Sequencer中的标签和分组功能。

#### 先决条件

-   确保你已了解 **[Sequencer](/documentation/zh-cn/unreal-engine/how-to-make-movies-in-unreal-engine)**，其 **[界面](/documentation/zh-cn/unreal-engine/sequencer-cinematic-editor-unreal-engine)** 和如何添加 **[轨道](/documentation/zh-cn/unreal-engine/sequencer-track-list-in-unreal-engine)**。
-   确保你已了解 **[蓝图可视化脚本](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)**。

## 标签

标签（Tag）是一种元数据标识，可以指定给Sequencer中的 **[Object绑定轨道](/documentation/zh-cn/unreal-engine/cinematic-actor-tracks-in-unreal-engine)**，并且可以被基于标签的蓝图节点引用。

![sequencer tag blueprint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/d2cbeca9-0dd1-4023-a443-63b599f0ed0d/tagoverview.png)

将标签添加到轨道的最快方法是，右键点击它，导航到 **标签** 菜单，然后在 **添加标签** 域中输入名称。完成后，你可以按 **Enter** 或 **添加 (+)** 按钮创建标签。

![create sequencer tag](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eff24db4-b37f-4684-a9a4-69e39dcd6edb/createtag.png)可以将多个标签指定给一个Actor。 ![multiple tags](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c102fc6f-aded-4442-8478-a64e93c59d99/twotags.png) 

指定标签后，**标签** 上下文菜单现在将显示已添加到轨道的标签列表，可以点击它们来打开和关闭。

![enable disable tag menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e254584c-993e-4643-a88a-b58fdc05c571/toggletags.gif)

### 绑定标签管理器

要在Sequencer中查看和管理标签，可以通过点击标签上下文菜单中的 **打开绑定标签管理器** 打开绑定标签管理器。你也可以从工具栏的[**操作**](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E6%93%8D%E4%BD%9C)菜单打开它。

![sequencer binding tag manager](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1a278bdf-9caa-4327-b759-c576186d8684/opentagmanager.png)

绑定标签管理器有两个主要区域：

![binding tag manager](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9e8d403c-85f4-4d0e-944c-7841adadfda8/tagmanager.png)

1.  第一个区域包含序列中所有对象绑定的列表，包括所有子序列。指定给Actor的标签将显示在其旁边，可以点击标签上的 **删除 (X)** 来取消指定。 右键点击绑定，输入名称，然后按 **Enter** 即可添加新标签。
    
    ![tag manager create tag](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/67eb0feb-5dad-47cc-8a3c-d6a342b28832/createtag2.png)
    
2.  第二个区域列出此序列的所有现有标签。点击 **删除 (X)** 将从所有绑定中取消指定它。

### 在蓝图中引用

从 **关卡序列Actor** 调用其中一个by Tag **绑定** 函数，即可在蓝图中访问绑定标签。你可以使用这些函数获取当前绑定或带标签的Actor绑定、重新绑定这些Actor或重设绑定。

可以右键点击蓝图图表来找到By Tag绑定函数，或从关卡序列Actor引用中连出引线并在 **Sequencer > 播放器 > 绑定** 中查找。

![binding by tag blueprints](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/9c372cfc-3831-4edb-a448-9cd6a5deab24/bindingtagnodes.png)

多数"by Tag"蓝图函数拥有以下输入引脚：

![add binding by tag](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/950f0876-d3d9-4e65-965b-a5096c1f3f89/examplebp.png)

-   **目标**：对关卡序列Actor的引用。
-   **绑定标签**：要查找的标签名称。
-   **Actor**：要绑定、重新绑定或添加绑定的Actor。
-   **允许从资产进行绑定**：禁用此选项将锁定序列，使其无法执行进一步的绑定操作。

## 分组

可将Sequencer中的轨道添加到分组（Group）中，这有助于快速选择和显示过滤。

要创建新分组并向其中添加轨道，右键点击单个或多个轨道，然后选择 **添加到分组 > 新建分组**。此操作将打开 **Sequencer分组管理器**，创建新分组，并将轨道添加到其中。

![sequencer add to group new group](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2c70d20c-9c66-4622-9ed0-2269465fc181/newgroup.png)

创建新分组后，还可以从 **添加到分组** 上下文菜单向该分组添加新轨道。

![add to group](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/deb8a460-c1e7-4a41-990e-d3ddfad3f7f2/addgroup2.png)

你还可以将轨道从Sequencer的大纲视图拖动到Sequencer分组管理器中，以将轨道添加到分组中。

![add group drag and drop](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a8e0409b-633a-4779-a663-51d0d76e00c1/addgroup.gif)

### 分组管理器

Sequencer分组管理器用于管理指定给它们的分组和轨道。如果没有创建新分组，可以点击工具栏[**操作**](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#actions) 菜单中的 **打开Sequencer分组管理器** 来打开该组。

![open sequencer group manager](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f4866810-998f-4dc4-90dd-795ee26db4a7/opengroup.png)

#### 管理

在"分组管理器"窗口中右键点击将显示上下文菜单，你可以在其中创建新分组、重命名分组、删除分组或[**过滤分组**](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#filtering)。

![group manager context menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bb9e964d-4335-4be9-bcd1-82506f54d08d/groupcontext.png)

#### 选择

点击分组标题或单独点击每个分组项目，即可快速选择分组的内容。

![sequencer group selecting](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3bffdbd1-ceec-4f85-aa55-53d88bba23c6/selectgrouptracks.gif)

#### 筛选

点击 **筛选器** 图标将筛选出Sequencer大纲视图中的所有轨道，轨道（及其子轨道）除外。

![sequencer group track filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/77e6f525-44e0-4931-a1e8-5ec7c2cf19cf/filter1.png)

点击Sequencer大纲视图中的 **筛选器** 菜单也将显示启用 **分组筛选器** 控件。

![sequencer group track filter](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/fa322cac-2a2c-43b3-b58b-bd71dcf149f2/filtermenu.png)

-   [sequencer](https://dev.epicgames.com/community/search?query=sequencer)
-   [tag](https://dev.epicgames.com/community/search?query=tag)
-   [group](https://dev.epicgames.com/community/search?query=group)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [先决条件](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E5%85%88%E5%86%B3%E6%9D%A1%E4%BB%B6)
-   [标签](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E6%A0%87%E7%AD%BE)
-   [绑定标签管理器](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E7%BB%91%E5%AE%9A%E6%A0%87%E7%AD%BE%E7%AE%A1%E7%90%86%E5%99%A8)
-   [在蓝图中引用](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E5%9C%A8%E8%93%9D%E5%9B%BE%E4%B8%AD%E5%BC%95%E7%94%A8)
-   [分组](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E5%88%86%E7%BB%84)
-   [分组管理器](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E5%88%86%E7%BB%84%E7%AE%A1%E7%90%86%E5%99%A8)
-   [管理](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E7%AE%A1%E7%90%86)
-   [选择](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E9%80%89%E6%8B%A9)
-   [筛选](/documentation/zh-cn/unreal-engine/cinematic-tags-and-groups-in-unreal-engine#%E7%AD%9B%E9%80%89)