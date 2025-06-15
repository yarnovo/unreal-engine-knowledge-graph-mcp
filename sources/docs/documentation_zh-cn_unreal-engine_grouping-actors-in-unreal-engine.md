# 虚幻引擎中的Actor分组 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/grouping-actors-in-unreal-engine
> 
> 生成时间: 2025-06-14T18:58:20.506Z

---

目录

![Actor分组](https://dev.epicgames.com/community/api/documentation/image/b756f809-523e-4718-8de1-e8049b97d0b3?resizing_type=fill&width=1920&height=335)

###### 先修主题

要理解和使用本页的内容，请确保熟悉以下主题：

-   [选择Actor](/documentation/zh-cn/unreal-engine/selecting-actors-in-unreal-engine)

将Actor分成一组，你就可以同时管理多个Actor。利用Actor组，你可以执行以下操作：

-   将分成一组的Actor作为一个整体变换，比如旋转、平移、缩放。多个Actor属于一个组时，单个Actor变换将锁定。
    
-   临时解锁一个组，变换单个Actor，然后重新锁定该组以冻结组中的各个Actor，防止对单个Actor的变换进行更改。
    
-   在组中添加和删除Actor。
    

一个Actor一次只能属于一个组。

要将多个Actor分成一组，你需要首先确保启用了 **允许组选择（Allow Group Selection）**。此选项位于 **主工具栏（Main Toolbar）** 上的 **设置（Settings）** 菜单中。你还可以使用 **Ctrl + Shift + G** 键盘快捷方式切换此选项。

![](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/463ea8ab-761e-4c18-9681-343f7ab3170c/allowgroupselection.png)

设置（Settings） 菜单中的 允许组选择（Allow Group Selection） 选项。

## Actor分组

要将两个或多个Actor分成一组，请选择相应Actor，然后执行以下任一操作：

-   右键点击任一所选Actor，弹出 **上下文菜单（context menu）**，然后选择 **组（Group）**。
    
-   使用 **Ctrl + G** 键盘快捷方式。
    

Actor组通过 **视口（Viewport）** 中的绿色括号定界。

![一个Actor组包含四个静态网格体Actor。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/ca3306e0-1b13-4da3-bd1c-ad501d610fdc/lockedgroup.png)

一个Actor组包含四个静态网格体Actor。只要进行变换，就会同时影响此组中的所有Actor。

处于不同关卡中的Actor不能分成一组。将当前位于组中的Actor从一个关卡移到另一个关卡，就会将其从现有组中删除。但是，你可以在不同关卡之间移动整个组。

将多个Actor分成一组时，你将在 **世界大纲视图（World Outliner）** 中创建 **组Actor（Group Actor）**。要选择该组中的所有Actor，你可以选择组Actor或组中的成员。

![世界大纲视图中的一个组Actor。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/db55ed57-b09b-4a28-b15a-c01fa015182d/le_groupactor.png)

世界大纲视图中的一个组Actor。

有关Actor选择的更多信息，请参阅[选择Actor](/documentation/zh-cn/unreal-engine/selecting-actors-in-unreal-engine)文档。

## 处理Actor组

你在 **视口（Viewport）** 或 **世界大纲视图（World Outliner）** 中右键点击一系列Actor或一个Actor组时，系统会打开 **上下文菜单（context menu）**，你可以在其中的 **组（Group）** 分段中看到Actor组选项。

下面的分段描述了在虚幻引擎中处理组的选项。

### 重新分组

如果你的选择中包含至少一个组和其他未分组的Actor，那么上下文菜单中将提供 **重新分组（Regroup）** 选项。

重新分组会从全部现有组中删除所有选定的Actor，然后将所有选定的Actor创建成一个新组。使用此选项可将你的所有选择快速创建成一个新组，而无需手动解散其他组。

你还可以使用 **Ctrl + G** 键盘快捷方式将Actor重新分组。根据你是否选择了以下选项，此快捷方式的行为会有所不同：

-   **无Actor组（No Actor groups）：**Ctrl + G会创建一个新组，其中包含所有选定的Actor。
    
-   **至少一个Actor组（At least one Actor group）：**Ctrl + G会执行重新分组操作，如上所述。
    

### 取消分组

**取消分组（Ungroup）** 选项会从所选组中删除所有Actor，然后删除这些组。

对于未锁定的组，取消分组操作将从组中删除所选的Actor，而不会尝试将其保留在现有组层级中。

你还可以使用 **Shift + G** 键盘快捷方式将Actor和/或嵌套组取消分组。

### 锁定和解锁组

当你处理现有组时，可以选择 **锁定（Lock）** 和 **解锁（Unlock）** 选项。

默认情况下，新创建的组处于 **已锁定（locked）** 状态。当某个组处于已锁定状态时：

-   如果你选择锁定组中的Actor，将选择整个组。
    
-   变换会影响组中的所有Actor。
    

如果某个组 **未锁定（unlocked）**，你可以执行以下操作：

-   选择和变换属于该组的单个Actor。
    
-   从该组中删除Actor。
    

组周围的括号表示该组当前是已锁定还是未锁定。绿色括号表示该组已锁定。红色括号表示该组未锁定。

![已锁定组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/6ce28a37-8687-4399-bb65-840e34a0498e/lockedgroup.png)

![未锁定组](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/aee7f8bb-921e-4b77-839f-ba24c3e83d1d/unlockedgroup.png)

已锁定组

未锁定组

左：锁定的Actor组。周围的括号为绿色，枢轴点位于该组中心。 右：未锁定的Actor组。最右侧的立方体当前已选择，可以单独变换。

### 添加和删除Actor

仅在你选择一个组和其他未分组的Actor之后，系统才会提供 **添加到组（Add to Group）** 选项。此选项会将未分组的Actor添加到现有组。

仅在你选择未锁定组中的一个或多个Actor之后，系统才会提供 **从组中删除（Remove from Group）** 选项。此选项将从组中删除所选的Actor。如果一个嵌套组从更大的组中删除，它本身仍是一个组。

如果一个组不包含Actor，将会自动删除，并且其组Actor会从 **世界大纲视图（World Outliner）** 中删除。

### 变换Actor和Actor组

Actor组的 **枢轴点** 会自动设置为该组的中心点。锁定该组时，你只能绕该组的枢轴点变换该组内的 **全部** Actor。要将单个Actor绕其自己的枢轴点变换，你必须首先解锁该组。

要设置Actor组的枢轴点，请选择该组，然后按住 **Alt** 键的同时 **中键点击** 你想设置枢轴点的位置。或者，**中键点击并拖动** 该组的变换控件中心处的球体来移动枢轴点。

![更改Actor组的枢轴点。](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/4f742947-2ce7-4b0e-8cc0-fc2ca4cd6bcf/changinggrouppivotpoint.gif)

此GIF演示了如何移动Actor组的枢轴点，并说明了Actor组如何绕新的枢轴点旋转。

-   [actors](https://dev.epicgames.com/community/search?query=actors)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [Actor分组](/documentation/zh-cn/unreal-engine/grouping-actors-in-unreal-engine#actor%E5%88%86%E7%BB%84)
-   [处理Actor组](/documentation/zh-cn/unreal-engine/grouping-actors-in-unreal-engine#%E5%A4%84%E7%90%86actor%E7%BB%84)
-   [重新分组](/documentation/zh-cn/unreal-engine/grouping-actors-in-unreal-engine#%E9%87%8D%E6%96%B0%E5%88%86%E7%BB%84)
-   [取消分组](/documentation/zh-cn/unreal-engine/grouping-actors-in-unreal-engine#%E5%8F%96%E6%B6%88%E5%88%86%E7%BB%84)
-   [锁定和解锁组](/documentation/zh-cn/unreal-engine/grouping-actors-in-unreal-engine#%E9%94%81%E5%AE%9A%E5%92%8C%E8%A7%A3%E9%94%81%E7%BB%84)
-   [添加和删除Actor](/documentation/zh-cn/unreal-engine/grouping-actors-in-unreal-engine#%E6%B7%BB%E5%8A%A0%E5%92%8C%E5%88%A0%E9%99%A4actor)
-   [变换Actor和Actor组](/documentation/zh-cn/unreal-engine/grouping-actors-in-unreal-engine#%E5%8F%98%E6%8D%A2actor%E5%92%8Cactor%E7%BB%84)