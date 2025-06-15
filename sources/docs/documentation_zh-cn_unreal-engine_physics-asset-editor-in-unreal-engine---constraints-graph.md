# 虚幻引擎物理资产编辑器 - 约束图 | 虚幻引擎 5.6 文档 | Epic Developer Community

> 原文链接: https://dev.epicgames.com/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---constraints-graph
> 
> 生成时间: 2025-06-14T19:50:41.597Z

---

目录

![物理资产编辑器 - 约束图](https://dev.epicgames.com/community/api/documentation/image/0238a17e-c318-48d4-8137-09e6b4b71123?resizing_type=fill&width=1920&height=335)

![The Constraints Graph shows the linkages for constraints between the selected bodies in the Physics Asset](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/71f81f05-0488-4079-a606-0deb6fbac705/graph.png)

**约束图** 显示物理资产中所选形体间的约束的连接。在其中，你可以执行以下操作：

-   选择并查看骨骼层级中的形体和约束。
-   使用[右击快捷菜单](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---skeleton-tree#%E9%80%89%E6%8B%A9%E5%BF%AB%E6%8D%B7%E8%8F%9C%E5%8D%95)创建和编辑形体和约束。
-   使用引脚拖动选项创建约束连接。
-   为物理动画和约束指定/取消指定配置文件。

## 约束图中显示的骨骼层级选项

当在[骨架树](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---skeleton-tree)中选中形体或约束时，约束图中会显示当前选中的形体或约束及其连接。

![The graph will display the currently selected ones and their connections](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/c90a37ab-1785-4c6f-9eea-bda133f916e4/graph-with-skel-selection.png)

在骨架树中选中了形体"spine\_03"，约束图中显示了它们连接到的约束和形体。

### 形体

选中[形体](/documentation/zh-cn/unreal-engine/physics-bodies-in-unreal-engine)时，约束图中会显示以下信息：

-   骨骼名称
-   使用的基本形状的数量

![The Graph will display the following information](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/5d2dc24b-211f-4e25-bf7e-545ab08eedd2/body-info.png)

在本示例中，骨骼名称是 **hand\_l**，只有一个基本形状。

你可以双击最右端的任何形体节点，从而在层级列表中移动到该形体及其约束。

#### 约束图引脚拖动连接

约束图中基于节点的显示方法使你能够从主形体（最左端 **hand\_l**）的输出引脚拖出引线并使用选择菜单来选择形体以创建约束。 也可以通过[骨架树](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---skeleton-tree#%E9%80%89%E6%8B%A9%E5%BF%AB%E6%8D%B7%E8%8F%9C%E5%8D%95)中的右击情境菜单来实现相同的工作流。

![The node-based display in the graph enables you to drag from the output pin of the main Body and use the selection menu to select a body to create a constraint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/7e0b7d1b-72b6-4d78-b55a-1570995641f7/pin-dragging-01.png)

![The resulting Constraint](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/1fba439e-ff9f-4694-9c66-0e6a714efecd/pin-dragging-02.png)

从形体输出引脚拖出引线并从列表中选择一个形体。

产生的约束。

如果在创建或删除约束后约束图没有更新，请单击其他地方，然后再回到原处以查看更新。

### 约束

选中[约束](/documentation/zh-cn/unreal-engine/physics-constraint-reference-in-unreal-engine)时，约束图中会显示以下信息：

-   连接的骨骼名称

![The Graph will display the following information](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/f29cce11-baa6-4984-b756-1bf565829497/constraint-info.png)

在本示例中，名称为 **lowerarm\_l** 的骨骼约束到了 **hand\_l**。

## 配置文件指定

在约束图中，你将能够查看为选中的形体和约束指定的[配置文件](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---tools-and-profiles#%E5%BD%93%E5%89%8D%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E6%8C%87%E5%AE%9A)。

可以创建和指定两种类型的配置文件：可指定给形体的 **物理动画** 配置文件和可指定给约束的约束配置文件。配置文件包含一系列形体和约束属性的默认值。如果在 **配置文件（Profiles）** 选项卡中设置了 **当前配置文件（Current Profile）**，约束图中的节点会指示显示的形体和约束的配置文件指定状态。

节点可处于两种状态中（通过其颜色指示）：

-   **指定了** 配置文件
-   **未指定** 配置文件或未选择

如果将 **当前配置文件（Current Profile）** 指定给选中的形体或约束，或未选择配置文件，会使用节点填充颜色（形体为绿色，约束为米黄色）。如果所选形体或约束未指定到当前配置文件（Current Profile）未指定，节点将会变暗。

![When the Current Profile is assigned to the selected body or constraint the node's fill color is used](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/a74edc3b-3e0b-42a2-89a1-65b8cd7353e4/profile-assignment.png)

在本示例中，为形体 **lowerarm\_l** 和 **middle\_01\_l** 指定了配置文件 **MyPhysicalAnimation\_Profile**， 但没有为其余的形体节点指定该特定配置文件，从其颜色为深色可以看出来。

![The bodies for lowerarml and middle01l have been assigned the profile MyPhysicalAnimationProfile](https://d1iv7db44yhgxn.cloudfront.net/documentation/images/61848130-4751-48d5-a3a7-8148e4d44478/profile-assignment-none.png)

对于约束，由于其"当前配置文件（Current Profile）"设置为 **None**，在任何选中的约束指定所选配置文件前，填充颜色不会变暗。

有关使用配置文件和将它们指定给形体和约束的更多信息，请参阅[工具（Tools）和配置文件（Profiles）](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---tools-and-profiles#%E5%BD%93%E5%89%8D%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E6%8C%87%E5%AE%9A)页面。

-   [animation](https://dev.epicgames.com/community/search?query=animation)
-   [physics](https://dev.epicgames.com/community/search?query=physics)

* * *

提问并帮助你的同行 [开发者论坛](https://forums.unrealengine.com/categories?tag=unreal-engine)

编写你自己的教程或阅读其他人的教程 [学习库](https://dev.epicgames.com/community/unreal-engine/learning)

-   [约束图中显示的骨骼层级选项](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---constraints-graph#%E7%BA%A6%E6%9D%9F%E5%9B%BE%E4%B8%AD%E6%98%BE%E7%A4%BA%E7%9A%84%E9%AA%A8%E9%AA%BC%E5%B1%82%E7%BA%A7%E9%80%89%E9%A1%B9)
-   [形体](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---constraints-graph#%E5%BD%A2%E4%BD%93)
-   [约束图引脚拖动连接](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---constraints-graph#%E7%BA%A6%E6%9D%9F%E5%9B%BE%E5%BC%95%E8%84%9A%E6%8B%96%E5%8A%A8%E8%BF%9E%E6%8E%A5)
-   [约束](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---constraints-graph#%E7%BA%A6%E6%9D%9F)
-   [配置文件指定](/documentation/zh-cn/unreal-engine/physics-asset-editor-in-unreal-engine---constraints-graph#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6%E6%8C%87%E5%AE%9A)