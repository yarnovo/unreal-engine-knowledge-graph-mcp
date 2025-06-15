# 虚幻引擎中的关卡快照 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine
> 
> 生成时间: 2025-06-14T20:34:02.893Z

---

目录

![关卡快照](https://dev.epicgames.com/community/api/documentation/image/aa874db9-1a19-4fd8-b775-00a87ebceec8?resizing_type=fill&width=1920&height=335)

**关卡快照（Level Snapshots）** 使你能够在关卡的 **世界大纲视图（World Outliner）** 中保存 **Actors** 的特定配置，并立即将场景恢复到该状态。这样可以大幅简化复杂的设置，并避免对不同场景同一关卡的多个变体进行复制和管理。关卡快照特别适用于虚拟制片，因为它们使用户能够将虚拟环境重置到镜头试拍之间的起始位置，并跟踪拍摄期间可能发生的每个镜头的变化，同时保留关卡的基础起点。

用户还可以灵活选择仅恢复关卡快照的某些Actor或属性，以便满足当前因情况而异的定制需求。例如，你可选择仅恢复关卡快照的光照或单个Actor的位置。有经验的用户可以使用 **蓝图（Blueprint）** 构造自定义筛选器，以便根据最复杂的关卡设置管理Actor/属性的恢复，并自动执行常见的项目特定请求。

## 入门指南

要启用关卡快照功能，你需要安装关卡快照插件。

1.  在虚幻编辑器中，转到主菜单并选择 **项目设置（Project Settings）**。
2.  在 **项目设置（Project Settings）** 窗口中，找到 **插件（Plugins） > 关卡快照（LevelSnapshots）**。
3.  启用 **LevelSnapshots** 插件。
4.  (可选) 启用 **关卡快照nDisplay支持** 插件。
5.  编辑器将提示你重启。

![插件窗口中的关卡快照插件](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/49b5d9e4-0307-4778-8598-5e89887672c4/level-snapshot-plugin.png)

关卡快照中的 **nDisplay** 支持通过单独的插件实现。这对于使用ICVFX很重要。如果你的项目没有使用nDisplay，则无需为关卡快照插件启用nDisplay支持。

引擎重启完成后，你可以拍摄关卡快照，访问 **主工具栏（Main Toolbar）** 中的关卡快照（Level Snapshots）菜单，然后打开 **关卡快照（Level Snapshots）窗口**。

![主工具栏中的关卡快照按钮和菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/017bfaac-0f69-4710-b675-f69f09735f24/level-snapshots-toolbar.png)

## 摆设快照

有三种拍摄关卡快照的方式：

1.  点击主工具栏中的 **关卡快照（Level Snapshot）** 按钮。
    
    ![主工具栏关卡快照按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/05ace196-71a0-4a18-8a00-8dfccd744626/level-snapshot-toolbar-button.png)
2.  点击关卡快照（Level Snapshot）窗口中的 **拍摄快照（Take Snapshot）** 按钮。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fefaf28-508f-4bad-992b-79c9cb1014a3/level-snapshot-window.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/8fefaf28-508f-4bad-992b-79c9cb1014a3/level-snapshot-window.png)
    
    点击查看大图。
    
3.  使用[远程控制Web应用程序](/documentation/zh-cn/unreal-engine/remote-control-web-application-for-unreal-engine)激活 **拍摄快照（Take Snapshot）**。
    

所有这三种方法都将打开 **创建关卡快照（Create Level Snapshot）** 窗口。

默认情况下，创建关卡快照（Create Level Snapshot）窗口中显示的新关卡快照将使用 **<关卡名称>*<用户名>*<时间>** 格式命名，但是你可以按自己的选择重命名关卡快照。你还可以添加描述，提供有关已保存关卡快照用途的更多信息。

![创建关卡快照默认名称](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/2b8f7ea3-e976-4e5e-9840-2c11bed3777e/level-snapshot-default-name.png) ![创建自定义名称的关卡快照并添加描述](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/51bc2329-7c2d-4ef5-bbb4-525140f8f29f/level-snapshot-rename-and-description.png)

关卡快照将作为资产保存在创建关卡快照（Create Level Snapshot）窗口中 **根目录（Root Directory）** 下显示的目录中，默认命名为LevelSnapshots。特定关卡快照的子目录位置将基于拍摄关卡快照的 **地图（关卡）** 名称和 **日期（年-月-日）**。你可以更改特定关卡快照的根目录和子目录。你还可以更改新关卡快照的默认命名模式。

如果你在保存之前重命名关卡快照，请注意不要用另一个关卡快照覆盖它，因为修改后的名称将成为新的默认名称，除非你更改或还原它。

## 使用关卡快照

关卡快照包含世界大纲视图中所有Actor的记录，以及拍摄关卡快照时其组件和属性的状态。拍摄关卡快照时，所有Actor均被记录，无论它们当前在世界大纲视图中是否可见，因此在使用关卡快照在关卡中设置场景时，你可能需要检查Actor的可见性。同样，资产（例如材质）状态不会被记录，因此资产的所有更改都需要使用[源控制](/documentation/zh-cn/unreal-engine/collaboration-and-version-control-in-unreal-engine)独立跟踪。

创建一个或多个关卡快照后，你可以选择关卡快照并点击 **恢复关卡快照（Restore Level Snapshot）** 按钮，将所有Actor重置为已保存的状态。

当你恢复关卡快照时，自拍摄关卡快照起对Actor所做的更改都将恢复为保存在关卡快照中的状态。

-   拍摄快照后添加的新Actor将从关卡中移除。
-   拍摄快照后移除的Actor将重新添加到关卡中。
-   所有Actor变换都将恢复为已保存的状态。
-   对Actor属性的更改都将恢复为已保存的状态。

[![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38e4a676-bf3d-4e65-9d70-ab8ed2802fc0/restore-level-snapshot.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/38e4a676-bf3d-4e65-9d70-ab8ed2802fc0/restore-level-snapshot.png)

点击查看大图。

你可以撤消还原关卡快照操作。

当你点击关卡快照时，关卡快照窗口的右侧将显示所有Actor及其组件和属性的列表，这些组件和属性将恢复为关卡快照中保存的状态。

你可以使用复选框手动应用或忽略特定更改，或使用自定义筛选器指定应用或忽略哪些更改；请参阅[创建自定义筛选器](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#creatingcustomfilters)，了解有关自定义筛选器的更多信息。

如果你的项目中有多个关卡，则仅与当前打开的关卡关联的关卡快照才会在关卡快照窗口中可见。仅在编辑器中打开这些关卡时，才会显示与其他关卡关联的关卡快照。

### 已知限制

本小节介绍使用关卡快照时的已知限制。

-   以下Actor和Actor组件不会被关卡快照跟踪。如果你想在关卡中使用它们，你需要手动跟踪它们。
    -   地形
    -   USD actors
    -   控制台变量
-   如果你在创建关卡快照后重命名子关卡，关卡快照系统会将重命名的子关卡中的所有Actor视为新Actor，而不是现有的已更改Actor。你将看到关卡快照系统建议移除Actor以恢复到原始状态。

## 创建自定义筛选器

关卡快照窗口的中间区域包含自定义筛选器。你可以使用单个筛选器，或使用筛选器组来创建更复杂的筛选器，包括AND和OR布尔运算符。你可以收藏筛选器，还可以保存和加载筛选器以备后用。

将鼠标悬停在筛选器上时，你会在左侧看到绿色或红色栏、复选框和垃圾桶。

-   点击绿色栏会使其变为红色，这将否定筛选器，变换其功能。例如，你的筛选器只包含具有特定标签的Actor，点击它会导致这些Actor被排除在外，同时其他所有内容都会包含在内。相反，点击红色条会使其变为绿色，从而使筛选器返回其原始功能。请参阅[否定关卡快照筛选器](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#negatinglevelsnapshotfilters)，了解更多信息。
-   点击复选框将禁用筛选器，并将其灰显，表明它未在使用中。
-   点击垃圾桶图标将删除筛选器。

![关卡快照筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/566c72f1-023e-4d00-93c2-dad9334b0a97/filter-close-up.png)

你还可以否定筛选器、撤消否定以及从筛选器属性启用或禁用筛选器。请参阅[关卡快照筛选器参考](/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine)，了解更多信息。

### 自定义筛选器基础知识

要创建基本的自定义筛选器，请遵循以下步骤：

1.  首先点击 **+筛选器组（+Filter Group）** 按钮，添加新的 **筛选器组（Filter Group）**。
    
    ![添加筛选器组按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/eb4c1924-2457-47a2-a9c1-59fd266c1fbd/add-filter-group.png)
2.  点击 **添加筛选器（Add Filter）** 下拉菜单，然后选择一种常用筛选器，或展开 **C++筛选器（C++ Filters）** 子菜单以选择筛选器。如果你已经创建[使用蓝图的自定义筛选器](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#creatingblueprintfilters)，你可以从 **蓝图筛选器（Blueprint Filters）** 子菜单中选择它。你还可以使用 **搜索（Search）** 文本框查找要添加的特定筛选器。
    
    -   你可以收藏特定的筛选器，以便快速拖入筛选器组。
        
        ![收藏的筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/b0a4ec03-0f3a-4283-9fe2-addbb0aeef0b/favorite-filters.png)
    -   最常用的筛选器包含在标题 **常用筛选器（Common Filters）** 下的菜单中。其中包括 **Actor Changed Transform**、**Actor Has Tag** 和 **Property Has Name**.
        
        ![添加筛选器菜单中的常用筛选器](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/556324d9-7743-4f84-9179-c7594d905f1a/add-filter.png)
3.  添加筛选器后，选择它，修改其属性。大多数筛选器至少有一个属性，你需要在它运行之前设置这些属性。例如，Actor Has Tag Filter 需要你提供Actor标签，用于筛选关卡快照。请参阅"关卡快照筛选器参考"，了解更多信息。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/166f9033-4d77-499b-821e-5b8176fd3738/filter-properties.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/166f9033-4d77-499b-821e-5b8176fd3738/filter-properties.png)
    
    点击查看大图。
    
4.  选择已保存的关卡快照，然后点击 **刷新结果（Refresh Results）**。现在将根据你配置的筛选器筛选关卡快照中保存的Actor。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bed2bad7-9a10-4d03-93b9-9ce9844dd468/filtered-result.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/bed2bad7-9a10-4d03-93b9-9ce9844dd468/filtered-result.png)
    
    点击查看大图。
    
5.  要保存新筛选器，请打开 **加载/保存筛选器（Load/Save Filter）** 下拉菜单，然后选择 **另存为（Save As）**。系统将打开一个新窗口，你可以在其中命名筛选器，并选择目录以将筛选器作为资产保存。
    
    ![Load and save filter menu](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5a301159-bf55-4040-bd7f-73443251bd03/save-filter-as.png)
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bfc51b3-2032-486e-9330-a04810ee1ad4/save-filter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/0bfc51b3-2032-486e-9330-a04810ee1ad4/save-filter.png)
    
    点击查看大图。
    
6.  你还可以打开 **加载/保存筛选器（Load/Save Filter）** 下拉菜单，从显示的列表中选择要加载的筛选器资产，然后点击 **加载筛选器（Load filter）** 来加载保存的筛选器。如果你已经保存了大量的筛选器，你可以使用 **搜索（Search）** 栏来查找特定的筛选器。
    

### 高级自定义筛选器

关卡快照筛选器具有高级功能，用户可以通过复杂的筛选器组合来实现特定的结果。当你处理包含多个Actor和多个已保存关卡快照的大型关卡时，此功能很有帮助。

-   你可以将多个筛选器添加到同一个筛选器组，并使用AND运算符（用&表示）组合它们。这意味着两个筛选器都将应用于关卡快照，并且只有满足所有筛选条件的Actor才会显示。
    
-   使用 **\+ 筛选器组（+ Filter Group）** 按钮添加其他筛选器组，你可以使用OR运算符组合筛选器。这意味着将显示符合任一筛选器组标准的Actor。
    
    -   若要忽略筛选器组，你可以点击复选框将其禁用，若要包含被忽略的筛选器组，你可以点击复选框将其启用。
    -   你可以点击垃圾桶图标删除筛选器组。
    
    ![用于关卡快照的布尔运算符](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/44212bfc-d87b-4d96-bb47-63afb92def35/filter-operators.png)
-   大多数筛选器使用 **默认结果（Default Result）** 筛选器属性，属性可以设置为：
    
    -   **包含（Include）**，其中包含筛选器的结果并排除其他所有内容。
    -   **排除（Exclude）**，排除筛选器的结果并包括其他所有内容。
    -   **无所谓（Do Not Care）**，包括或排除根据否定设置直接受筛选器影响的Actor，但所有其他Actor的状态无所谓。
    
    请参阅[关卡快照筛选器参考](/documentation/zh-cn/unreal-engine/level-snapshot-filter-reference-for-unreal-engine)，了解更多信息。
    
    ![默认结果属性下拉菜单](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/e493a628-2767-4f95-8ffd-5995d32e2162/filter-default-result-dropdown.png)

若否定默认结果属性中设置为排除的筛选器，实际上将包含筛选器的结果。注意尽量使用定义明确的逻辑，以免混淆筛选器的功能。请参阅[否定关卡快照筛选器](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#negatinglevelsnapshotfilters)，了解更多信息。

由于筛选器之间可能存在复杂的交互，我们强烈建议你仔细命名筛选器以便识别其功能，尤其是当其他用户将使用你创建的筛选器时。

### 关卡快照筛选器逻辑

使用C++创建的所有默认筛选器和使用蓝图创建的所有自定义筛选器基本上都基于以下四种验证检查之一：

-   Is Actor Valid: 确定是否可以恢复Actor。
-   Is Property Valid: 确定是否可以恢复属性。
-   Is Deleted Actor Valid: 确定是否应该重新生成已从关卡中删除的Actor（因为拍摄了关卡快照）。
-   Is Added Actor Valid: 确定是否应该取消生成已添加到关卡的Actor（因为拍摄了关卡快照）。

在大多数情况下，我们不建议同时使用Is Actor Valid和Is Property Valid筛选器，因为结果通常没有用。特别注意：

-   不要在关卡快照（Level Snapshot）窗口中的同一个筛选器组中混合两者。
-   创建筛选器时不要实现多个函数（IsActorValid 等）。

在某些特定用例中，你可能希望使用多个筛选器组中的C++筛选器仔细构造此类筛选器，或用作自定义蓝图筛选器。这将允许使用筛选器应用一个关卡快照的某些设置，同时还可以使用另一个筛选器应用另一个关卡快照的不同设置。

例如，假设现有两个光源选项和两个布景选项的虚拟制片设置。有人可能要求光源采用选项1，布景采用选项2。借助关卡快照筛选器蓝图，你可以创建界面，从不同的关卡快照中获取并应用适当的设置。此设置所需的完整逻辑无法仅使用应用快照到世界（Apply Snapshot to World）按钮进行配置，因此在这种情况下，你需要构造复杂的筛选器。

### 关卡快照否定筛选器

使用关卡快照筛选器时，有一个比较实用的方法可以使筛选器具有多种用途，那就是否定筛选器。通常，否定筛选器具有以下效果：

-   包含变为排除。
-   排除变为包含。
-   无所谓仍为无所谓。

例如，假设你使用ActorHasTag筛选器仅恢复带有 "RestoreMe" 标签的Actor。该筛选器的IsActorValid函数为带有该标签的Actor返回包含（Include），为没有该标签的Actor返回排除（Exclude）。如果你在UI中否定筛选器，则行为相反：现在将排除带有"RestoreMe"标签的Actor，并包含所有其他Actor。

某些默认C++筛选器具有其他属性，这些属性也会影响筛选器的功能。对这些筛选器使用否定时要小心，确保在将筛选器应用于关卡快照时达到预期结果。

### 创建蓝图筛选器

本小节假定你已经熟悉蓝图。请参阅[蓝图](/documentation/zh-cn/unreal-engine/blueprints-visual-scripting-in-unreal-engine)文档，了解更多信息。

要创建新的关卡快照蓝图筛选器，请执行以下步骤：

1.  使用关卡快照蓝图筛选器基类创建新蓝图。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3450a177-6437-4f5f-a51d-57568577a5d2/level-snapshot-blueprint-filter.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3450a177-6437-4f5f-a51d-57568577a5d2/level-snapshot-blueprint-filter.png)
    
    点击查看大图。
    
2.  从可用选项中选择覆盖函数：
    
    -   Is Actor Valid: 确定是否可以恢复Actor。
    -   Is Added Actor Valid: 确定是否应该取消生成已添加到关卡的Actor（因为拍摄了关卡快照）。
    -   Is Deleted Actor Valid: 确定是否应该重新生成已从关卡中删除的Actor（因为拍摄了关卡快照）。
    -   Is Property Valid: 确定是否可以恢复属性。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cdb627a-4416-44d5-9110-50dd88ffb4f9/level-snapshot-filter-blueprint-1.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6cdb627a-4416-44d5-9110-50dd88ffb4f9/level-snapshot-filter-blueprint-1.png)
    
    点击查看大图。
    
3.  所选覆盖函数（下例中为Is Actor Valid）在带有一些默认节点的新图表中打开。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c91f9f1-74cb-49ae-a209-09a72f021ad1/level-snapshot-filter-blueprint-2.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3c91f9f1-74cb-49ae-a209-09a72f021ad1/level-snapshot-filter-blueprint-2.png)
    
    点击查看大图。
    
4.  拖移 **Is Actor Valid** 节点的 **参数（Parameters）** 输出引脚，并添加 **Break** 节点。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74c1bf86-10ae-439c-a826-43272c592158/level-snapshot-filter-blueprint-3.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/74c1bf86-10ae-439c-a826-43272c592158/level-snapshot-filter-blueprint-3.png)
    
    点击查看大图。
    
    从现在开始，你可以为从快照Actor输出或关卡Actor输出分支出来的新筛选器定义逻辑。这将确定根据筛选器的条件验证哪一个。 在本示例的其余部分，我们将创建筛选器，用于检查快照Actor是否为天空光照。
    
5.  删除默认父节点，然后添加适合验证的节点并将其连接到Break节点。在下面的示例中，我们选择了 **Cast to Skylight** 节点并将其 **Object** 输入引脚连接到 **Break** 节点的 **Snapshot Actor** 输出引脚。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1249bb72-a1fe-439f-a57d-e41b5c03ece4/level-snapshot-filter-blueprint-4.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1249bb72-a1fe-439f-a57d-e41b5c03ece4/level-snapshot-filter-blueprint-4.png)
    
    点击查看大图。
    
6.  将 Is Actor Valid 节点输出引脚连接到 Cast To Skylight 节点输入引脚。复制 Return 节点，并将一个节点连接到 Cast To Skylight 节点的主输出引脚，另一个节点连接到 Cast Failed 输出引脚。
    
7.  为连接到 **Cast To Skylight** 节点的主输出引脚的 **Return** 节点的 **返回值（Return Value）** 选择 **Include**，为连接到 **Cast Failed** 输出引脚的节点的 **返回值（Return Value）** 选择 **Exclude** 。
    
    [![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e1ae2cc-cd91-4720-87e9-59034df1ab0d/level-snapshot-filter-blueprint-5.png)](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4e1ae2cc-cd91-4720-87e9-59034df1ab0d/level-snapshot-filter-blueprint-5.png)
    
    点击查看大图。
    
8.  **保存（Save）** 并 **编译（Compile）** 蓝图。生成的筛选器在关卡快照上使用时，只会在关卡快照中包含天空光照Actor。
    

如果你的蓝图筛选器包含你公开为可编辑实例的变量（在我的蓝图面板中用变量旁边的睁眼图标表示），则在使用时它会出现在该关卡快照筛选器的属性中。

![在蓝图筛选器中添加一个可视变量](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/3e0ac823-10ab-4e29-ace3-03a27bc4f6cf/level-filter-visible-variable.png)

## 关卡快照插件设置

点击右上角的齿轮图标，可以直接从关卡快照窗口访问关卡快照插件的设置。

![关卡快照窗口的齿轮按钮](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/254e0043-7a31-411c-a7ef-9e7d534f0a91/level-snapshot-settings-access.png)

插件设置窗口将打开，显示关卡快照插件设置。

![关卡快照插件设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/01a5b6fc-8d66-47d8-901c-ebed9566dc0d/level-snapshot-plugin-settings.png)

设置中包括如何使用哈希来改善性能。对于筛选而言，每个Actor都需要装载进内存，但是装在Actor会花费很长时间。关卡快照插件会在拍摄快照时为Actor计算一个哈希，这样在筛选时可以使用世界中的Actor重新计算哈希，以此来解决这个问题。如果两个哈希匹配，便可以跳过读取已保存的Actor数据。

设置

描述

行为

 

跳过类（Skipped Classes）

关卡快照会忽略你在这个列表中指定的类和属性。

浮点对比精度（Float Comparison Precision）

对比浮点属性时，关卡快照会忽略该尾数以外的浮点变动。

双对比精度（Double Comparison Precision）

对比双属性时，关卡快照会忽略该尾数以外的双变动。

性能哈希设置

 

哈希终止秒（Hash Cutoff Seconds）

大多数Actor计算哈希需要大约600毫秒，但是有的Actor可能需要更多时间。对于这些Actor，将保存的Actor载入内存可能会比计算哈希更快。所以如果计算哈希花费的时间比 **哈希终止秒（Hash Cutoff Seconds）** 更久，插件将会不再计算哈希并直接载入Actor数据。

使用哈希装载（Use Hash for Loading）

是否在加载快照的时候对比世界Actor和它保存的哈希。启用该选项将会加强性能。

可以使用CRC（Can Use CRC）

启用后，关卡快照将会在拍摄和分析快照的时候使用CRC32算法计算哈希。禁用该选项后，拍摄快照将会变得更快，因为不再需要计算CRC32，在加载快照时，不可用CRC32来检查Actor是否发生了变化。

可以使用MD5（Can Use MD5）

启用后，关卡快照将会在拍摄和分析快照的时候使用MD5算法计算哈希。禁用该选项后，拍摄快照将会变得更快，因为不再需要计算CRC32，在加载快照时，不可用MD5来检查Actor是否发生了变化。

快照区分算法（Snapshot Diff Algorithm）

CanUseCRC和CanUseMD5决定是否在拍摄快照时计算CRC32和MD5。如果两个都启用，两个都会被计算，而这个设置会决定在区分资产时使用哪一个算法。拍摄快照时，插件会追踪计算CRC32和MD5哈希所花的时间，所以如果选择了 **UseFastest** 选项，插件会检查哪个算法在拍摄快照时更快并且使用快的那一个。

## 关卡快照编辑器插件设置

你还可以在插件设置中自定义关卡编辑器的设置。

![关卡快照编辑器插件设置](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d7c212d-9863-4f99-aaa0-289a6bbbe5e2/level-snapshot-editor-plugin-settings.png)

设置

描述

数据

 

关卡快照保存根目录（Root Level Snapshot Save Dir）

用于保存关卡快照资产的根目录。默认为 **/Game/LevelSnapshots**。

关卡快照保存目录（Level Snapshot Save Dir）

根目录下用于保存关卡快照资产的文件夹。默认格式为 **{地图}/{年}-{月}-{日}**。

默认关卡快照名称（Default Level Snapshot Name）

关卡快照资产的名称。默认格式为 **{地图}\_{用户}\_{时间}**.

编辑器

 

启用关卡快照工具栏按钮（Enable Level Snapshots Toolbar Button）

默认启用。

使用创建表单（Use Creation Form）

默认启用。

点击Actor组选择场景中的Actor（Click Actor Group to Select Actor in Scene）

启用后，点击已修改Actor（Modified Actors）下的Actor组将选择场景中的Actor。此前的选择将取消。默认禁用。

首选创建表单窗口宽度（Preferred Creation Form Window Width）

滑块，默认值为1000。

首选创建表单窗口高度（Preferred Creation Form Window Height）

滑块，默认值为1000。

-   [virtual production](https://dev.epicgames.com/community/search?query=virtual%20production)
-   [level snapshot](https://dev.epicgames.com/community/search?query=level%20snapshot)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [入门指南](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97)
-   [摆设快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E6%91%86%E8%AE%BE%E5%BF%AB%E7%85%A7)
-   [使用关卡快照](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E4%BD%BF%E7%94%A8%E5%85%B3%E5%8D%A1%E5%BF%AB%E7%85%A7)
-   [已知限制](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E5%B7%B2%E7%9F%A5%E9%99%90%E5%88%B6)
-   [创建自定义筛选器](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AD%9B%E9%80%89%E5%99%A8)
-   [自定义筛选器基础知识](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AD%9B%E9%80%89%E5%99%A8%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86)
-   [高级自定义筛选器](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E9%AB%98%E7%BA%A7%E8%87%AA%E5%AE%9A%E4%B9%89%E7%AD%9B%E9%80%89%E5%99%A8)
-   [关卡快照筛选器逻辑](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E5%85%B3%E5%8D%A1%E5%BF%AB%E7%85%A7%E7%AD%9B%E9%80%89%E5%99%A8%E9%80%BB%E8%BE%91)
-   [关卡快照否定筛选器](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E5%85%B3%E5%8D%A1%E5%BF%AB%E7%85%A7%E5%90%A6%E5%AE%9A%E7%AD%9B%E9%80%89%E5%99%A8)
-   [创建蓝图筛选器](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E5%88%9B%E5%BB%BA%E8%93%9D%E5%9B%BE%E7%AD%9B%E9%80%89%E5%99%A8)
-   [关卡快照插件设置](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E5%85%B3%E5%8D%A1%E5%BF%AB%E7%85%A7%E6%8F%92%E4%BB%B6%E8%AE%BE%E7%BD%AE)
-   [关卡快照编辑器插件设置](/documentation/zh-cn/unreal-engine/level-snapshots-in-unreal-engine#%E5%85%B3%E5%8D%A1%E5%BF%AB%E7%85%A7%E7%BC%96%E8%BE%91%E5%99%A8%E6%8F%92%E4%BB%B6%E8%AE%BE%E7%BD%AE)